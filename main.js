const { app, BrowserWindow, screen } = require("electron");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const win = new BrowserWindow({
    width, // width
    height, // height
    minWidth: width, // minimum width
    minHeight: height, // minimum height
    autoHideMenuBar: true, // menghilangkan menu bar
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL("http://localhost:3000");
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "win32") {
    app.quit();
  }
});
