const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const screen = electron.screen;

let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    autoHideMenuBar: true,

    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL("http://localhost:3001");
  mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "win32") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
