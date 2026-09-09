import { spawn } from "child_process";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const chrome = spawn(chromePath, [
  "--headless=new",
  "--remote-debugging-port=9226",
  "--disable-gpu",
  "--no-sandbox",
]);

await new Promise((resolve) => setTimeout(resolve, 1500));

try {
  const res = await fetch("http://127.0.0.1:9226/json/list");
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
  await new Promise((resolve) => setTimeout(resolve, 2500));

  console.log("==================== TEST 1: HERO 01 INITIAL STATE (SCROLL = 0) ====================");
  const hero01Init = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const h1Section = document.querySelector("section[aria-label='Hero Opening']");
        const brandTitle = h1Section.querySelector("h1")?.textContent.trim();
        const rotatorWord = h1Section.querySelector("div[class*='text-[#7F1D2D]']")?.textContent.trim();
        const designDiv = h1Section.querySelector("div[class*='z-30']");
        const designComputedOpacity = designDiv ? window.getComputedStyle(designDiv).opacity : null;
        const designComputedTransform = designDiv ? window.getComputedStyle(designDiv).transform : null;

        return {
          brandTitle,
          rotatorWord,
          designOpacity: designComputedOpacity,
          designTransform: designComputedTransform
        };
      })()
    `,
    returnByValue: true
  });
  console.log("Hero 01 at Y=0:", JSON.stringify(hero01Init.result.value, null, 2));

  console.log("\n==================== TEST 2: HERO 01 TRANSITION (SCROLL = 1000) ====================");
  await send("Runtime.evaluate", { expression: "window.scrollTo(0, 1000);" });
  await new Promise(r => setTimeout(r, 100));
  const hero01Trans = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const h1Section = document.querySelector("section[aria-label='Hero Opening']");
        const designDiv = h1Section.querySelector("div[class*='z-30']");
        return {
          designOpacity: designDiv ? window.getComputedStyle(designDiv).opacity : null,
          designTransform: designDiv ? window.getComputedStyle(designDiv).transform : null
        };
      })()
    `,
    returnByValue: true
  });
  console.log("Hero 01 at Y=1000 (Transition):", JSON.stringify(hero01Trans.result.value, null, 2));

  console.log("\n==================== TEST 3: HERO 02 PROGRESS & ACCUMULATION ====================");
  const h2Section = await send("Runtime.evaluate", {
    expression: `
      (() => {
        const s = document.querySelector("#process-section");
        return { offsetTop: s.offsetTop, offsetHeight: s.offsetHeight, viewportH: window.innerHeight };
      })()
    `,
    returnByValue: true
  });
  const { offsetTop: h2Start, offsetHeight: h2H, viewportH } = h2Section.result.value;
  const h2Dist = h2H - viewportH;

  const testPcts = [0.0, 0.20, 0.40, 0.60, 0.80, 1.00];
  for (const pct of testPcts) {
    const y = Math.round(h2Start + pct * h2Dist);
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y});` });
    await new Promise(r => setTimeout(r, 60));

    const check = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const h2 = document.querySelector("#process-section");
          const bgImg = h2.querySelector("img");
          const words = Array.from(h2.querySelectorAll("h2")).map(el => {
            const row = el.closest(".absolute");
            return {
              word: el.textContent.trim(),
              opacity: window.getComputedStyle(row).opacity,
              scale: row.style.transform,
              top: row.style.top
            };
          });
          const visibleWords = words.filter(w => parseFloat(w.opacity) > 0.05);
          return {
            pct: ${pct},
            y: window.scrollY,
            bgImgSrc: bgImg ? bgImg.getAttribute("src") : null,
            visibleCount: visibleWords.length,
            visibleWords: visibleWords.map(w => w.word + " (top:" + w.top + ", " + w.scale + ")")
          };
        })()
      `,
      returnByValue: true
    });

    console.log(`Hero 02 ${(pct * 100).toFixed(0)}%: visible count = ${check.result.value.visibleCount} -> ${check.result.value.visibleWords.join(" | ")}`);
  }

  // Test backward scroll
  console.log("\n==================== TEST 4: BACKWARD SCROLL TEST ====================");
  for (const pct of [0.70, 0.30, 0.0]) {
    const y = Math.round(h2Start + pct * h2Dist);
    await send("Runtime.evaluate", { expression: `window.scrollTo(0, ${y});` });
    await new Promise(r => setTimeout(r, 60));

    const check = await send("Runtime.evaluate", {
      expression: `
        (() => {
          const h2 = document.querySelector("#process-section");
          const words = Array.from(h2.querySelectorAll("h2")).map(el => {
            const row = el.closest(".absolute");
            return {
              word: el.textContent.trim(),
              opacity: window.getComputedStyle(row).opacity,
              scale: row.style.transform
            };
          });
          return {
            visibleWords: words.filter(w => parseFloat(w.opacity) > 0.05).map(w => w.word)
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`Backward to ${(pct * 100).toFixed(0)}%: visible = ${check.result.value.visibleWords.join(", ")}`);
  }

  ws.close();
} catch (err) {
  console.error("Test error:", err);
} finally {
  chrome.kill();
}
