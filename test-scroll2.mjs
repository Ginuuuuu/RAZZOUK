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
  // Set viewport to a realistic desktop size: 1440x900
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send("Page.navigate", { url: "http://localhost:3000" });
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Get exact section offsets
  const secInfo = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const sections = Array.from(document.querySelectorAll("section")).map(s => ({
          label: s.getAttribute("aria-label") || s.id,
          offsetTop: s.offsetTop,
          offsetHeight: s.offsetHeight,
          heightVh: s.style.height || s.className.match(/h-\\[([^\\]]+)\\]/)?.[1]
        }));
        return { innerHeight: window.innerHeight, sections };
      })()
    `,
    returnByValue: true,
  });
  console.log("Section Info:", JSON.stringify(secInfo.result.value, null, 2));

  // Let's test Hero 02: from offsetTop to offsetTop + offsetHeight
  const hero02 = secInfo.result.value.sections.find(s => s.label === "The Creation Process" || s.label === "process-section");
  console.log("\n=== TESTING HERO 02 PROGRESS ===");
  const h2Start = hero02.offsetTop;
  const h2End = hero02.offsetTop + hero02.offsetHeight - 900; // when end end reaches
  
  for (let pct = 0; pct <= 100; pct += 10) {
    const y = Math.round(h2Start + (pct / 100) * (h2End - h2Start));
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y});` });
    await new Promise((r) => setTimeout(r, 100));

    const check = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const h2 = document.querySelector("#process-section");
          const phrases = Array.from(h2.querySelectorAll("h2")).map(el => {
            const motionDiv = el.closest(".absolute.inset-0") || el.parentElement;
            return {
              word: el.textContent.trim(),
              style: motionDiv.getAttribute("style"),
              transform: window.getComputedStyle(motionDiv).transform,
              opacity: window.getComputedStyle(motionDiv).opacity,
              filter: window.getComputedStyle(motionDiv).filter
            };
          });
          const visibleWord = phrases.find(p => parseFloat(p.opacity) > 0.1);
          return {
            scrollY: window.scrollY,
            stickyTop: h2.querySelector(".sticky").getBoundingClientRect().top,
            visibleWord: visibleWord || "NONE VISIBLE",
            allWords: phrases.map(p => ({ word: p.word, op: p.opacity, tf: p.transform }))
          };
        })()
      `,
      returnByValue: true,
    });
    console.log(`Hero02 pct=${pct}% (y=${y}): stickyTop=${check.result.value.stickyTop}, visible=${JSON.stringify(check.result.value.visibleWord)}`);
  }

  // Let's test Hero 03 (Colour Tattoos)
  const hero03 = secInfo.result.value.sections.find(s => s.label === "Colour Tattoos Exhibition");
  console.log("\n=== TESTING HERO 03 PROGRESS ===");
  const h3Start = hero03.offsetTop;
  const h3End = hero03.offsetTop + hero03.offsetHeight - 900;

  for (let pct = 0; pct <= 100; pct += 10) {
    const y = Math.round(h3Start + (pct / 100) * (h3End - h3Start));
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y});` });
    await new Promise((r) => setTimeout(r, 100));

    const check = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const h3 = document.querySelector("section[aria-label='Colour Tattoos Exhibition']");
          const imgMotion = h3.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
          return {
            scrollY: window.scrollY,
            stickyTop: h3.querySelector(".sticky").getBoundingClientRect().top,
            style: imgMotion ? imgMotion.getAttribute("style") : null,
            computedTransform: imgMotion ? window.getComputedStyle(imgMotion).transform : null
          };
        })()
      `,
      returnByValue: true,
    });
    console.log(`Hero03 pct=${pct}% (y=${y}): stickyTop=${check.result.value.stickyTop}, transform=${check.result.value.computedTransform}`);
  }

  ws.close();
} catch (err) {
  console.error("Error:", err);
} finally {
  chrome.kill();
}
