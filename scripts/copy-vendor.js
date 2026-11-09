// npm install 之后，把 Excel 组件复制到 app/vendor，让软件离线也能导出 Excel
const fs = require("fs");
const path = require("path");
const src = path.join(__dirname, "..", "node_modules", "xlsx", "dist", "xlsx.full.min.js");
const dir = path.join(__dirname, "..", "app", "vendor");
fs.mkdirSync(dir, { recursive: true });
fs.copyFileSync(src, path.join(dir, "xlsx.full.min.js"));
console.log("已复制 Excel 组件到 app/vendor");
