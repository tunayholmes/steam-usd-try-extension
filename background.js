async function fetchRateFromHost() {
    try {
      const r = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=TRY");
      const j = await r.json();
      if (j?.rates?.TRY) return Number(j.rates.TRY);
    } catch (e) {}
    return null;
  }
  
  async function fetchRateFromERAPI() {
    try {
      const r = await fetch("https://open.er-api.com/v6/latest/USD");
      const j = await r.json();
      if (j?.rates?.TRY) return Number(j.rates.TRY);
    } catch (e) {}
    return null;
  }
  
  async function fetchRate() {
    return (await fetchRateFromHost()) ?? (await fetchRateFromERAPI());
  }
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    (async () => {
      if (msg?.type === "GET_AUTO_RATE") {
        const rate = await fetchRate();
        sendResponse({ ok: !!rate, rate: rate ?? null });
      }
    })();
  
    return true;
  });
  