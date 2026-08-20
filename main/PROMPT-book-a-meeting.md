# Claude Code Prompt — 预约页改名为 /book-a-meeting/ + 全站链接切换

> 复制 `====` 之间的全部内容，在 `Desktop/gmic/main` 目录下粘贴给 Claude Code。
> 这一个 prompt 同时做两件事：把预约页的 URL 定为 `/book-a-meeting/`，并把全站所有旧的预约链接指过去。

====

在当前项目（GMIC AI 官网静态站，根目录就是当前目录 `main`）里做两件事：确定预约页的最终 URL，并把全站的预约按钮链接都切过去。

## 背景

这是个纯静态站，URL 由文件夹路径决定，所以 `https://gmic.ai/book-a-meeting/` 对应的就是 `main/book-a-meeting/index.html`。

目录里现在可能同时存在两个文件夹：

- `book-a-meeting/index.html` —— **这是最终要保留的版本**，内容已经做好，`canonical` 和 `og:url` 已经写成 `https://gmic.ai/book-a-meeting/`，页面自己导航和 footer 里的链接也已经指向 `../book-a-meeting/index.html`，不需要改。
- `book-demo/` —— 这是上一版的旧文件夹，内容和新的几乎一样但 URL 是旧的。

第一步：**确认 `book-a-meeting/index.html` 存在且能正常打开**，然后**删掉整个 `book-demo/` 文件夹**。如果 `book-a-meeting/` 不存在而只有 `book-demo/`，就先把文件夹重命名成 `book-a-meeting`，再把里面 `index.html` 的 `canonical`、`og:url`、以及导航/footer 里所有 `book-demo` 字样改成 `book-a-meeting`。

第二步是主要工作：把全站所有指向旧 Google Calendar 预约页的链接，改成指向 `book-a-meeting/index.html`。

## 要替换的旧链接

一共两种写法，**都要替换**：

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb
https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb
```

（第二种只是少了 `/u/0`，schedule ID 完全一样。）

预期规模：**76 个文件、382 处**（其中带 `/u/0/` 的 376 处，不带的 6 处）。如果你扫出来的数字和这个差很多，先停下来告诉我，别直接改。

另外如果站内已经有指向 `book-demo/index.html` 的链接（上一轮如果跑过替换的话可能有），也一并改成 `book-a-meeting/index.html`。

## 替换规则

### 1. 相对路径按文件层级算

站点用的是相对路径（现有链接都是 `../index.html` 这种写法），所以**不要用 `/book-a-meeting/` 这种根路径**，要按每个文件所在目录的深度算：

| 文件位置 | 替换成 |
|---|---|
| `index.html`（根目录） | `book-a-meeting/index.html` |
| `contact/`、`about/`、`proof/`、`faq/`、`blog/`、`process/`、`products/`、`custom-devices/`、`implementation/`、`components/` 等一级目录 | `../book-a-meeting/index.html` |
| `products/mic06/`、`industries/healthcare/`、`solutions/*/`、`seo/*/`、`resources/*/`、`custom-devices/*/` 等二级目录 | `../../book-a-meeting/index.html` |

### 2. 去掉 target 和 rel

旧链接长这样：

```html
<a href="https://calendar.google.com/..." target="_blank" rel="noopener" class="btn btn-nav">Start a Project</a>
```

现在是站内跳转，不该新开标签页。改完应该是：

```html
<a href="../book-a-meeting/index.html" class="btn btn-nav">Start a Project</a>
```

只对被改动的这些 `<a>` 标签去掉 `target="_blank"` 和 `rel="noopener"` / `rel="noopener noreferrer"`，**不要碰页面上其它的外链**（比如 `https://nemt.gmic.ai/`、blog 里的外链，那些该保留 target）。

### 3. 生成器脚本也要改

根目录下有几个 `build-*.js` / `rebuild-*.js` 生成器脚本，里面也硬编码了这个链接。不改的话，以后重新生成页面会把旧链接写回去。这几个脚本各自生成的页面层级如下，按这个算相对路径：

| 脚本 | 生成到 | 用哪个路径 |
|---|---|---|
| `build-solutions-pages.js` | `solutions/<slug>/index.html` | `../../book-a-meeting/index.html` |
| `rebuild-healthcare-page.js` | `industries/healthcare/index.html` | `../../book-a-meeting/index.html` |
| `build-enterprise-page.js` | `industries/enterprise/index.html` | `../../book-a-meeting/index.html` |
| `build-veterinary-page.js` | `industries/veterinary/index.html` | `../../book-a-meeting/index.html` |
| `build-proof-page.js` | `proof/index.html` | `../book-a-meeting/index.html` |

这几个脚本里链接是存在常量里的（`const CAL = '...'`、`const BOOKING = '...'`）或者直接写在 HTML 模板字符串里，两种都要处理。JS 文件里不用管 target/rel。

### 4. sitemap / robots

如果根目录或子目录里有 `sitemap.xml`，加一条 `https://gmic.ai/book-a-meeting/`（如果里面有 `book-demo` 的条目就直接改掉）。没有 sitemap 就跳过。

### 5. 不要动的文件

- `book-a-meeting/index.html` 本身
- `_backup-*` 开头的任何目录
- `css/`、`img/`、`node_modules/`
- 根目录下那两个 `PROMPT-*.md`（是给我看的说明文件）

## 执行前必须备份

**这个项目没有 git，改错了没法回滚。** 动手前先把所有要修改的文件原样复制到 `_backup-links-<时间戳>/<相对路径>` 下（时间戳用 `YYYYMMDDHHmmss`），完成后把备份目录名打印出来。

根目录下有一个我之前写的脚本 `fix-book-demo-links.js`，逻辑和上面基本一致（含自动备份），但它里面写死的是 `book-demo`，**需要先把脚本里的 `book-demo` 改成 `book-a-meeting` 再用**，或者你自己写一个新的。用哪种都行，但备份这一步不能省。

## 改完后自己验证

1. 全局搜 `calendar.google.com/calendar` 和 `appointments/schedules`，除了 `_backup-*` 目录和替换脚本自己，应该**一处都搜不到**。
2. 全局搜 `book-demo`，应该只在 `_backup-*` 目录和 `PROMPT-*.md` 里出现，页面代码里一处都不该有。
3. 写个小脚本，遍历所有 `.html`，把每个 `href="..."` 里含 `book-a-meeting` 的路径相对于该文件所在目录解析一次，确认目标文件真实存在。报告「解析成功 N 个 / 断链 N 个」。**断链必须是 0。**（`book-a-meeting/index.html` 里那个 canonical `https://gmic.ai/book-a-meeting/` 是绝对 URL，跳过它。）
4. 起个本地服务器 `python -m http.server`，实际打开这三个页面，把右上角 "Start a Project" 按钮的 `href` 属性打印出来核对：
   - `/index.html` → `book-a-meeting/index.html`
   - `/contact/index.html` → `../book-a-meeting/index.html`
   - `/products/mic06/index.html` → `../../book-a-meeting/index.html`
   并确认点进去能真的打开预约页、日历能选时间。
5. 顺便确认这几个页面 footer 里的 "Book a Demo" 也一起改了。
6. 最后输出一份改动清单：文件名 + 每个文件改了几处 + 总计，备份目录名，以及 `book-demo/` 是否已删除。

====
