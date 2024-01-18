const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const createWindow = () => {
  const mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    maximizable: true,
    icon: path.join(__dirname, "public", "icon.ico"),
    autoHideMenuBar: true,
    webPreferences: {
      devTools: isDev,
    },
  });

  mainWin.loadURL(
    isDev
      ? "http://localhost:3000"
      : "file://" + path.join(__dirname, "../../build", "index.html")
  );

  mainWin.webContents.on("dom-ready", () => {
    mainWin.webContents.executeJavaScript(`
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Alt') {
          e.preventDefault();
        }
      });
    `);
  });

  mainWin.on("close", () => {
    app.quit();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("ready", () => {
  globalShortcut.register("Control+Shift+I", () => {
    return false;
  });
});
