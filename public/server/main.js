const { app, BrowserWindow, globalShortcut } = require("electron");
const path = require("node:path");

const isDev = require("electron-is-dev");

const createWindow = () => {
  // Create the browser window.
  const mainWin = new BrowserWindow({
    width: 1200,
    height: 800,
    maximizable: true,
    icon: `${__dirname}/public/icon.ico`,
    autoHideMenuBar: true,
    webPreferences: {
      devTools: false,
      preload: path.join(__dirname, "./preload.js"),
    },
    icon: __dirname + "./icon.png",
  });
  mainWin.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../../build/index.html")}`
  );
  mainWin.webContents.openDevTools(false);
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
