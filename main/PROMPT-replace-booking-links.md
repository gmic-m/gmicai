# Claude Code Prompt — 全站预约链接替换

> 复制 `====` 之间的全部内容，在 `Desktop/gmic/main` 目录下粘贴给 Claude Code。

====

在当前项目（GMIC AI 官网静态站，根目录就是当前目录 `main`）里，把全站所有指向旧的 Google Calendar 预约页的链接，统一改成站内新建的 `/book-demo/` 页面。

## 背景

站上所有 "Start a Project" / "Book a Demo" / "Start Your Project →" 这类按钮，现在都指向一个 Google Calendar appointment schedule 链接。新的预约页面已经做好了，在 `book-demo/index.html`。现在要把全站链接切过去。

## 要替换的旧链接

一共两种写法，**都要替换**：

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb
https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb
```

（第二种只是少了 `/u/0`，schedule ID 完全一样。）

预期规模：**76 个文件、382 处**。如果你扫出来的数字和这个差很多，先停下来告诉我，别直接改。

## 替换规则

### 1. 相对路径按文件层级算

站点用的是相对路径（现有链接都是 `../index.html` 这种写法），所以**不要用 `/book-demo/` 这种根路径**，要按每个文件所在目录的深度算：

| 文件位置 | 替换成 |
|---|---|
| `index.html`（根目录） | `book-demo/index.html` |
| `contact/index.html`、`about/index.html`、`proof/index.html` 等一级目录 | `../book-demo/index.html` |
| `products/mic06/index.html`、`industries/healthcare/index.html`、`seo/*/index.html` 等二级目录 | `../../book-demo/index.html` |

### 2. 去掉 target 和 rel

旧链接长这样：

```html
<a href="https://calendar.google.com/..." target="_blank" rel="noopener" class="btn btn-nav">Start a Project</a>
```

现在是站内跳转，不该新开标签页。改完应该是：

```html
<a href="../book-demo/index.html" class="btn btn-nav">Start a Project</a>
```

只对被改动的这些 `<a>` 标签去掉 `target="_blank"` 和 `rel="noopener"` / `rel="noopener noreferrer"`，**不要碰页面上其它的外链**（比如 `https://nemt.gmic.ai/`、blog 的外链，那些该保留 target）。

### 3. 生成器脚本也要改

根目录下有几个 `build-*.js` / `rebuild-*.js` 生成器脚本，里面也硬编码了这个链接。不改的话，以后重新生成页面会把旧链接写回去。这几个脚本各自生成的页面层级如下，按这个算相对路径：

| 脚本 | 生成到 | 用哪个路径 |
|---|---|---|
| `build-solutions-pages.js` | `solutions/<slug>/index.html` | `../../book-demo/index.html` |
| `rebuild-healthcare-page.js` | `industries/healthcare/index.html` | `../../book-demo/index.html` |
| `build-enterprise-page.js` | `industries/enterprise/index.html` | `../../book-demo/index.html` |
| `build-veterinary-page.js` | `industries/veterinary/index.html` | `../../book-demo/index.html` |
| `build-proof-page.js` | `proof/index.html` | `../book-demo/index.html` |

这几个脚本里链接是存在常量里的（`const CAL = '...'`、`const BOOKING = '...'`）或者直接写在 HTML 模板字符串里，两种都要处理。JS 文件里不用管 target/rel。

### 4. 不要动的文件

- `book-demo/index.html` 本身 —— 它的导航和 footer 里的链接已经改好指向自己了，别再动
- `_backup-*` 开头的任何目录
- `css/`、`img/`、`node_modules/`

## 执行方式

根目录下已经有一个我之前写好的脚本 `fix-book-demo-links.js`，它就是干这件事的，逻辑和上面完全一致，而且会自动备份。你可以：

**方案 A（推荐）**：先跑 `node fix-book-demo-links.js --dry` 看预览，确认文件清单和数量对得上，再跑 `node fix-book-demo-links.js` 执行。它会把所有被改的文件原样备份到 `_backup-links-<时间戳>/`。

**方案 B**：如果你觉得那个脚本有问题，就自己按上面的规则改，但**改之前必须先把要动的文件备份到 `_backup-links-<时间戳>/` 下**（这个项目没有 git，改错了没法回滚）。

## 改完后自己验证

1. 全局搜 `calendar.google.com/calendar` 和 `appointments/schedules`，除了 `_backup-*` 目录和 `fix-book-demo-links.js` 自己，应该**一处都搜不到**。
2. 写个小脚本，遍历所有 `.html`，把每个 `href="..."` 里含 `book-demo` 的路径相对于该文件所在目录解析一次，确认目标文件真实存在。报告「解析成功 N 个 / 断链 N 个」。断链必须是 0。（`book-demo/index.html` 里那个 canonical meta `https://gmic.ai/book-demo/` 是绝对 URL，不算断链，跳过它。）
3. 起个本地服务器 `python -m http.server`，实际点开这三个页面，把右上角 "Start a Project" 按钮的 `href` 属性打印出来核对：
   - `/index.html` → 应该是 `book-demo/index.html`
   - `/contact/index.html` → 应该是 `../book-demo/index.html`
   - `/products/mic06/index.html` → 应该是 `../../book-demo/index.html`
4. 顺便确认这几个页面 footer 里的 "Book a Demo" 也一起改了。
5. 最后输出一份改动清单：文件名 + 每个文件改了几处 + 总计，以及备份目录的名字。

====
