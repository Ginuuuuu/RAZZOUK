import { spawn } from "child_process";

// Launch headless Chrome with remote debugging
const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chrome = spawn(chromePath, [
  "--headless=new",
  "--remote-debugging-port=9222",
  "--disable-gpu",
  "--no-sandbox",
]);

await new Promise((resolve) => setTimeout(resolve, 1500));

try {
  // Get WebSocket debugger URL
  const res = await fetch("http://127.0.0.1:9222/json/list");
  const targets = await res.json();
  console.log("Targets found:", targets.length);

  const pageTarget = targets.find((t) => t.type === "page") || targets[0];
  const wsUrl = pageTarget.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);
  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

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

  // Wait for page load
  await send("Page.enable");
  await send("Runtime.enable");
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Diagnostic 1: Check document heights, overflow, and section positions
  const diag1 = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const html = document.documentElement;
        const body = document.body;
        const main = document.querySelector("main");
        const sections = Array.from(document.querySelectorAll("section")).map(s => ({
          tag: s.tagName,
          id: s.id,
          ariaLabel: s.getAttribute("aria-label"),
          offsetTop: s.offsetTop,
          offsetHeight: s.offsetHeight,
          classes: s.className,
          stickyChild: Array.from(s.children).find(c => window.getComputedStyle(c).position === "sticky") ? true : false,
          stickyComputed: Array.from(s.children).map(c => window.getComputedStyle(c).position).join(", ")
        }));
        return {
          htmlOverflow: window.getComputedStyle(html).overflow,
          htmlOverflowX: window.getComputedStyle(html).overflowX,
          htmlOverflowY: window.getComputedStyle(html).overflowY,
          bodyOverflow: window.getComputedStyle(body).overflow,
          bodyOverflowX: window.getComputedStyle(body).overflowX,
          bodyOverflowY: window.getComputedStyle(body).overflowY,
          mainOverflow: main ? window.getComputedStyle(main).overflow : null,
          scrollHeight: html.scrollHeight,
          sections
        };
      })()
    `,
    returnByValue: true,
  });

  console.log("=== INITIAL DIAGNOSTICS ===");
  console.log(JSON.stringify(diag1.result.value, null, 2));

  // Diagnostic 2: Scroll through the page and check sticky & transform values!
  const scrollPositions = [0, 1000, 2500, 4000, 6000, 8000, 10000, 12000, 14000, 16000];
  for (const scrollY of scrollPositions) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${scrollY});`,
    });
    await new Promise((resolve) => setTimeout(resolve, 200));

    const check = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const res = {
            scrollY: window.scrollY,
            sections: []
          };
          const hero02 = document.querySelector("#process-section");
          if (hero02) {
            const sticky = hero02.querySelector(".sticky");
            const phrases = Array.from(hero02.querySelectorAll("h2")).map(h => {
              const motionParent = h.closest("[style*='scale'], [style*='opacity'], [style*='transform']") || h.parentElement;
              return {
                text: h.textContent.trim(),
                parentStyle: motionParent ? motionParent.getAttribute("style") : null,
                parentComputedTransform: motionParent ? window.getComputedStyle(motionParent).transform : null,
                parentComputedOpacity: motionParent ? window.getComputedStyle(motionParent).opacity : null,
              };
            });
            res.hero02 = {
              rect: hero02.getBoundingClientRect(),
              stickyTop: sticky ? sticky.getBoundingClientRect().top : null,
              phrases: phrases.slice(0, 3)
            };
          }

          // Hero 03
          const hero03 = document.querySelector("section[aria-label='Colour Tattoos Exhibition']");
          if (hero03) {
            const motionImg = hero03.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
            res.hero03 = {
              rect: hero03.getBoundingClientRect(),
              motionImgStyle: motionImg ? motionImg.getAttribute("style") : null,
              computedTransform: motionImg ? window.getComputedStyle(motionImg).transform : null
            };
          }

          // Hero 04
          const hero04 = document.querySelector("section[aria-label='Private Tattoos Atelier']");
          if (hero04) {
            const motionImg = hero04.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
            res.hero04 = {
              rect: hero04.getBoundingClientRect(),
              motionImgStyle: motionImg ? motionImg.getAttribute("style") : null,
              computedTransform: motionImg ? window.getComputedStyle(motionImg).transform : null
            };
          }

          // Hero 05
          const hero05 = document.querySelector("section[aria-label='Belly Piercing Exhibition']");
          if (hero05) {
            const motionImg = hero05.querySelector(".sticky div[style*='scale'], .sticky div[style*='transform']");
            res.hero05 = {
              rect: hero05.getBoundingClientRect(),
              motionImgStyle: motionImg ? motionImg.getAttribute("style") : null,
              computedTransform: motionImg ? window.getComputedStyle(motionImg).transform : null
            };
          }
          return res;
        })()
      `,
      returnByValue: true,
    });
    console.log(`\n=== SCROLL Y = ${scrollY} ===`);
    console.log(JSON.stringify(check.result.value, null, 2));
  }

  ws.close();
} catch (err) {
  console.error("Diagnostic error:", err);
} finally {
  chrome.kill();
}
