// 只给网页开放一个功能：自动备份
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld("desktop", {
  autoBackup: (bytes) => ipcRenderer.send("auto-backup", bytes)
});
