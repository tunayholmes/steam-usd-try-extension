const DEFAULTS = {
    mode: "auto",          // auto | manual
    manualRate: 35.0,
    hideUSD: false,
    tlFormat: "rounded"    // rounded | decimals
  };
  
  let settings = { ...DEFAULTS };
  let currentRate = null;
  
  function debounce(fn, delay = 250) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  }
  
  async function loadSettings() {
    const data = await chrome.storage.sync.get(DEFAULTS);
    settings = { ...DEFAULTS, ...data };
  }
  
  async function getRate() {
    if (settings.mode === "manual") {
      return Number(settings.manualRate) || DEFAULTS.manualRate;
    }
  
    const res = await chrome.runtime.sendMessage({ type: "GET_AUTO_RATE" });
    if (res?.ok && res.rate) return res.rate;
  
    // Auto alınamazsa manuel fallback
    return Number(settings.manualRate) || DEFAULTS.manualRate;
  }
  
  function parseUSD(text) {
    // $9.99 , $ 9.99
    const m = text.match(/\$\s*([0-9]+(?:\.[0-9]{1,2})?)/);
    if (!m) return null;
    return Number(m[1]);
  }
  
  function formatTRY(value) {
    if (settings.tlFormat === "rounded") {
      return Math.round(value).toLocaleString("tr-TR") + " TL";
    }
  
    return value.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + " TL";
  }
  
  function looksLikeSteamPrice(el) {
    if (!el) return false;
    const t = (el.textContent || "").trim();
  
    if (!t.includes("$")) return false;
    if (t.length > 30) return false;
  
    // Bazı yerlerde "$" geçip fiyat olmayan şeyler çıkabiliyor
    const usd = parseUSD(t);
    if (!usd) return false;
  
    return true;
  }
  
  function convertOne(el) {
    // 2 kere dönüştürme bug fix
    if (!el || el.dataset.steamTlDone === "1") return;
  
    const raw = (el.textContent || "").trim();
    const usd = parseUSD(raw);
    if (!usd || !currentRate) return;
  
    const tlValue = usd * currentRate;
    const tlText = formatTRY(tlValue);
  
    // geri almak için
    el.dataset.steamTlOriginal = raw;
  
    const wrap = document.createElement("span");
    wrap.className = "steam-tl-wrap";
  
    // TL
    const tlSpan = document.createElement("span");

    // USD gizliyse TL normal Steam fiyatı gibi dursun
    tlSpan.className = settings.hideUSD
        ? "steam-tl-try steam-tl-try--native"
        : "steam-tl-try";

    tlSpan.textContent = tlText;
    wrap.appendChild(tlSpan);

  
    // USD + ≈ sadece USD görünüyorsa
    if (!settings.hideUSD) {
      const usdSpan = document.createElement("span");
      usdSpan.className = "steam-tl-usd";
      usdSpan.textContent = `≈ ${raw}`;
      wrap.appendChild(usdSpan);
    }
  
    el.textContent = "";
    el.appendChild(wrap);
  
    el.dataset.steamTlDone = "1";
  }
  
  function convertAll() {
    const candidates = [
      ...document.querySelectorAll(".discount_final_price"),
      ...document.querySelectorAll(".discount_original_price"),
      ...document.querySelectorAll(".game_purchase_price"),
      ...document.querySelectorAll(".search_price"),
      ...document.querySelectorAll(".store_original_price"),
      ...document.querySelectorAll(".store_sale_price")
    ];
  
    for (const el of candidates) {
      if (looksLikeSteamPrice(el)) convertOne(el);
    }
  }
  
  function restoreAll() {
    document.querySelectorAll("[data-steam-tl-done='1']").forEach(el => {
      const original = el.dataset.steamTlOriginal;
      if (original) el.textContent = original;
      delete el.dataset.steamTlDone;
    });
  }
  
  async function refreshEverything() {
    await loadSettings();
    currentRate = await getRate();
  
    restoreAll();
    convertAll();
  }
  
  async function init() {
    await refreshEverything();
  
    const run = debounce(convertAll, 250);
    const obs = new MutationObserver(() => run());
    obs.observe(document.documentElement, { childList: true, subtree: true });
  
    chrome.storage.onChanged.addListener(() => {
      refreshEverything();
    });
  }
  
  init();
  