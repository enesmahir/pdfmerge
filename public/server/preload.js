// preload.js

// Tüm Node.js API'leri preload sürecinde kullanılabilir.
// Bu, bir Chrome eklentisinin sahip olduğu aynı kum havuzuna sahiptir.
window.addEventListener("DOMContentLoaded", () => {
  // replaceText fonksiyonu, belirli bir seçiciye sahip bir HTML öğesinin metnini değiştirir.
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  // Belirli bağımlılıkların sürümlerini belirtilen HTML öğelerine yerleştir.
  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const { contextBridge, ipcRenderer } = require("electron");

// Güvenli API'yi expose etme
contextBridge.exposeInMainWorld("takeData", {
  ipcRenderer: ipcRenderer,
});
