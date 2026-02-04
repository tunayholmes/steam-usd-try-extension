const DEFAULTS = {
    mode: "auto",
    manualRate: 35.0,
    hideUSD: false,
    tlFormat: "rounded"
  };
  
  function $(id) {
    return document.getElementById(id);
  }
  
  async function getAutoRate() {
    const res = await chrome.runtime.sendMessage({ type: "GET_AUTO_RATE" });
    if (res?.ok && res.rate) return res.rate;
    return null;
  }
  
  function setFooter(text) {
    $("footerMsg").textContent = text || "";
  }
  
  async function load() {
    const data = await chrome.storage.sync.get(DEFAULTS);
  
    $("mode").value = data.mode;
    $("manualRate").value = data.manualRate;
    $("hideUSD").checked = data.hideUSD;
    $("tlFormat").value = data.tlFormat;
  
    $("manualRow").style.display = data.mode === "manual" ? "flex" : "none";
  
    // Aktif kur kartı
    if (data.mode === "manual") {
      $("rateValue").textContent = Number(data.manualRate).toFixed(2) + " TL";
      $("rateBadge").textContent = "MANUEL";
    } else {
      $("rateValue").textContent = "Yükleniyor...";
      $("rateBadge").textContent = "AUTO";
  
      const rate = await getAutoRate();
  
      if (rate) {
        $("rateValue").textContent = rate.toFixed(2) + " TL";
        $("rateBadge").textContent = "AUTO";
      } else {
        $("rateValue").textContent = Number(data.manualRate).toFixed(2) + " TL";
        $("rateBadge").textContent = "FALLBACK";
      }
    }
  }
  
  async function save() {
    const mode = $("mode").value;
    const manualRate = Number($("manualRate").value) || DEFAULTS.manualRate;
    const hideUSD = $("hideUSD").checked;
    const tlFormat = $("tlFormat").value;
  
    await chrome.storage.sync.set({ mode, manualRate, hideUSD, tlFormat });
  
    setFooter("Kaydedildi ✓");
    setTimeout(() => setFooter(""), 1200);
  
    await load();
  }
  
  $("mode").addEventListener("change", () => {
    $("manualRow").style.display = $("mode").value === "manual" ? "flex" : "none";
  });
  
  $("save").addEventListener("click", save);
  
  load();
  