import { spawn } from "child_process";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chrome = spawn(chromePath, [
  "--headless=new",
  "--remote-debugging-port=9222",
  "--disable-gpu",
  "--no-sandbox",
]);

await new Promise((resolve) => setTimeout(resolve, 1500));

try {
  const res = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await res.json();
  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise((resolve) => { ws.onopen = resolve; });

  let msgId = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      const handler = (event) => {
        const data = JSON.parse(event.data);
        if (data.id === id) {
          ws.removeEventListener("message", handler);
          resolve(data.result);
        }
      };
      ws.addEventListener("message", handler);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Disable smooth scroll on html for testing immediate scroll positions
  await send("Runtime.evaluate", {
    expression: `document.documentElement.style.scrollBehavior = 'auto'; document.body.style.scrollBehavior = 'auto';`
  });

  const testYPositions = [0, 500, 1000, 2000, 2500, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000];

  for (const y of testYPositions) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${y});`
    });
    // Give rAF time to update motion values
    await new Promise((r) => setTimeout(r, 100));

    const data = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const hero02 = document.querySelector("#process-section");
          const hero03 = document.querySelector("section[aria-label='Colour Tattoos Exhibition']");
          const hero04 = document.querySelector("section[aria-label='Private Tattoos Atelier']");
          const hero05 = document.querySelector("section[aria-label='Belly Piercing Exhibition']");

          const h2Sticky = hero02.querySelector(".sticky");
          const h2Phrases = Array.from(hero02.querySelectorAll("h2")).map(el => {
            const motionDiv = el.closest(".absolute.inset-0");
            return {
              word: el.textContent.trim(),
              scale: motionDiv ? motionDiv.style.transform : null,
              opacity: motionDiv ? motionDiv.style.opacity : null,
              filter: motionDiv ? motionDiv.style.filter : null
            };
          });

          const h3Img = hero03.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
          const h4Img = hero04.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
          const h5Img = hero05.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");

          return {
            windowScrollY: window.scrollY,
            hero02: {
              rectTop: hero02.getBoundingClientRect().top,
              stickyTop: h2Sticky.getBoundingClientRect().top,
              phrases: h2Phrases
            },
            hero03: {
              rectTop: hero03.getBoundingClientRect().top,
              scale: h3Img ? h3Img.style.transform : null
            },
            hero04: {
              rectTop: hero04.getBoundingClientRect().top,
              scale: h4Img ? h4Img.style.transform : null
            },
            hero05: {
              rectTop: hero05.getBoundingClientRect().top,
              scale: h5Img ? h5Img.style.transform : null
            }
          };
        })()
      `,
      returnByValue: true
    });

    console.log(`\n--- Scroll Y = ${data.result.value.windowScrollY} ---`);
    console.log("Hero 02 Phrases:", JSON.stringify(data.result.value.hero02.phrases.filter(p => p.opacity !== "0" && p.opacity !== null)));
    console.log("Hero 03 img:", data.result.value.hero03.scale);
    console.log("Hero 04 img:", data.result.value.hero04.scale);
    console.log("Hero 05 img:", data.result.value.hero05.scale);
  }

  ws.close();
} catch (err) {
  console.error("Error:", err);
} finally {
  chrome.kill();
}
