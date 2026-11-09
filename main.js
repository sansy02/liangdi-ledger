// 两地账本：桌面版入口
const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
const fs = require("fs");

// 自动备份文件夹：文档/两地账本
function backupDir() {
  const dir = path.join(app.getPath("documents"), "两地账本");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 380,
    title: "两地账本",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, "app", "index.html"));
  // 外部链接用系统浏览器打开
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: "deny" }; });
}

// 网页每次改动后发来 Excel 数据，写成自动备份
ipcMain.on("auto-backup", (_e, bytes) => {
  try {
    const dir = backupDir();
    fs.writeFileSync(path.join(dir, "两地账本-自动备份.xlsx"), Buffer.from(bytes));
    // 每天额外留一份，最多保留 30 份
    const day = new Date().toISOString().slice(0, 10);
    const daily = path.join(dir, "每日备份");
    fs.mkdirSync(daily, { recursive: true });
    fs.writeFileSync(path.join(daily, `两地账本-${day}.xlsx`), Buffer.from(bytes));
    const files = fs.readdirSync(daily).filter(f => f.endsWith(".xlsx")).sort();
    while (files.length > 30) fs.unlinkSync(path.join(daily, files.shift()));
  } catch (err) {
    console.error("自动备份失败", err);
  }
});

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});
app.on("window-all-closed", () => { if (process.platform !== "darwin") app.quit(); });
