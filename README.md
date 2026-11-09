# 两地账本

记录在中国和马来西亚之间买卖商品的个人记账软件。

- 每个项目是一款商品，买入和卖出都可以用 RMB 或 RM。
- 卖出后自动按「先进先出」计算利润，所有总数统一换算成人民币。
- 用 RM 卖出的算进「马来西亚卖出」，用 RMB 卖出的算进「中国卖出」。
- 每次打开自动联网更新人民币兑马币的历史汇率（欧洲央行每日参考汇率），每笔记录按当天汇率换算；也可以单笔手动填实际换汇汇率。
- 可以导出包含全部详情的 Excel，也可以用导出的 Excel 恢复数据。
- 桌面版每次修改后，会自动在「文档/两地账本」里保存一份 Excel 备份，并按天保留最近 30 份。

## 网页版

用浏览器直接打开：https://sansy02.github.io/liangdi-ledger/

- 网页版的数据存在你用的那个浏览器里。手机、电脑、不同的浏览器各存各的，不会同步，也不和桌面版共用。
- 别人打开这个网址只会看到空账本，看不到你的数据。
- 网页版不会自动备份，清理浏览器数据会把账清掉，请定期在「备份与设置」里导出 Excel。
- 把桌面版的账搬到网页版：在桌面版里导出 Excel，再在网页版的「备份与设置」里点「从 Excel 恢复」。

## 第一次打包成 exe

1. 安装 Node.js（选 LTS 版本）：https://nodejs.org
2. 在这个文件夹里打开命令行（在文件夹地址栏输入 `cmd` 后按回车）。
3. 运行：

   ```
   npm install
   npm run dist
   ```

4. 打包完成后，`dist` 文件夹里的 `两地账本.exe` 就是软件，双击就能用，不用安装。

在国内网络下如果 `npm install` 很慢，可以先运行下面两行再安装：

```
npm config set registry https://registry.npmmirror.com
set ELECTRON_MIRROR=https://npmmirror.com/mirrors/electron/
```

## 不打包，直接运行

```
npm install
npm start
```

## 以后修改了代码

改的是 `app/index.html`。改完后重新运行 `npm run dist`，生成新的 exe。数据不会丢，因为数据存在电脑上，不在 exe 里面。

网页版不用打包，把改动推送到 GitHub，一两分钟后网页就会自动更新：

```
git add -A
git commit -m "这次改了什么"
git push
```

## 数据放在哪里

- 软件数据：Windows 的 `%APPDATA%/两地账本` 文件夹。
- 自动备份：`文档/两地账本/两地账本-自动备份.xlsx`。
- 换电脑时：在旧电脑导出 Excel，在新电脑的「备份与设置」里点「从 Excel 恢复」。

## 文件说明

| 文件 | 作用 |
| --- | --- |
| `app/index.html` | 软件界面和全部功能 |
| `main.js` | 桌面窗口和自动备份 |
| `preload.js` | 让界面可以调用自动备份 |
| `scripts/copy-vendor.js` | 安装时复制 Excel 组件 |
| `package.json` | 依赖和打包设置 |
| `.github/workflows/pages.yml` | 推送后自动把网页版发布到 GitHub Pages |
