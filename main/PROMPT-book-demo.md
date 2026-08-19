# Claude Code Prompt — GMIC AI「Book a Demo」预约页面

> 用法：把下面 `====` 之间的全部内容复制粘贴给 Claude Code（在 `Desktop/gmic/main` 目录下运行）。

====

在当前项目（GMIC AI 官网静态站，根目录 `Desktop/gmic/main`）中新建一个 Calendly 风格的预约页面。

## 0. 先读现有代码，严格复用风格

开工前必须先读这几个文件，理解现有的设计系统和导航结构：

- `css/style.css` — 全局 design tokens 和组件样式
- `css/grid.css` — 布局与栅格
- `contact/index.html` — 这是最接近的参考页：它的 `<nav>`（含 mega menu）、`.mobile-nav` 抽屉、`<footer class="footer">`、以及页面底部的 nav/burger JS，全部**原样复制**过来，只改两处：
  1. 所有相对路径保持 `../` 前缀（新页面同样在一级子目录下）
  2. 导航右上角按钮从 `Start a Project` 改为高亮当前页的状态（见第 3 节）

**不要重新发明视觉风格。** 必须使用现有 tokens：

```
--black:#0a0a0a      --off-black:#111111    --white:#ffffff
--off-white:#f0f4ff  --blue:#006aff         --blue-dark:#0050c8
--blue-deep:#2563eb  --warm-dark:#0a1628    --border-light:#c7d7f5
--text-muted:#5b6e9a --radius-sm:10px       --radius:14px  --radius-lg:24px
字体：Inter (400/500/600/700/800)，标题 font-weight:800 + letter-spacing:-0.025em
```

主 CTA 用 `--blue-deep (#2563eb)`，hover `#1d4ed8`；深色按钮用 `#0f172a`，hover `#1e293b`。圆角、阴影、间距节奏都跟现有页面一致。页面整体是浅色背景（`#ffffff` / `#f8faff`），不要做深色主题。

## 1. 文件产出

- 新建 `book-demo/index.html` —— **单个自包含 HTML 文件**，CSS 写在 `<style>` 里（页面专属样式），JS 写在 `<head>`/页面底部的 `<script>` 里，不引入任何第三方日历库。外部只依赖已有的 `../css/style.css`、`../css/grid.css`、Google Fonts 的 Inter、以及 lucide 图标（现有页面已在用 `https://unpkg.com/lucide@latest/dist/umd/lucide.min.js`）。
- 全站替换：把所有页面里指向
  `https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7Klk...`
  的链接（导航按钮 "Start a Project"、footer 里的 "Book a Demo"、各页 CTA 区域）统一改成指向新页面 `/book-demo/index.html`（注意各目录层级的相对路径：根目录用 `book-demo/index.html`，一级子目录用 `../book-demo/index.html`，二级子目录如 `industries/healthcare/` 用 `../../book-demo/index.html`）。改完打印一份改动文件清单。
- SEO：`<title>Book a Demo — Talk to a GMIC AI Hardware Engineer | GMIC AI</title>`，配 meta description、og tags、favicon，跟现有页面同样的写法。

## 2. 页面结构总览

整个页面**只有一个功能区**：一个三步的预约流程。没有 hero、没有产品介绍、没有其它 section。导航固定在顶部，footer 在最下面，中间是一张居中的预约卡片。

- 外层容器：`max-width: 1120px; margin: 0 auto; padding: 120px 24px 96px;`（顶部留出 fixed nav 的高度）
- 预约卡片：白底、`border: 1px solid var(--border-light)`、`border-radius: 20px`、`box-shadow: 0 8px 40px rgba(15,23,42,0.06)`、`overflow: hidden`
- 页面背景用极淡的蓝灰 `#f7f9fe`，让白卡片浮起来
- 三步用同一个卡片容器内切换（不刷新页面），切换时给 240ms 的 fade + 8px 上移过渡
- 卡片正上方放一个步骤指示器：`1 Pick a time — 2 Your details — 3 Confirmed`，当前步用 `--blue-deep`，已完成步显示 ✓，未来步灰色。移动端只显示 "Step 2 of 3"。

## 3. 导航特殊处理

- nav 在这个页面上不需要"透明→滚动变白"的效果，直接常驻白底 + `box-shadow:0 1px 0 var(--border-light)`（相当于给 `.nav` 直接加上 `scrolled` class）。
- 右上角原本的 `Start a Project` 按钮在本页改成一个次要样式的 `← Back to site` 或者干脆隐藏（你选更干净的那个，理由写在注释里）。mega menu 的下拉全部保留可用。

## 4. Step 1 — 选时间（左信息 / 右日历）

两栏布局，`display:grid; grid-template-columns: 360px 1fr;` 中间用 `border-right: 1px solid var(--border-light)` 分隔。移动端 `<900px` 改为单列上下堆叠。

### 左栏（信息区，padding: 40px 36px）

从上到下：

1. GMIC logo（复用 nav 里那个 `.nav-logo-svg`，深色版，height 24px）
2. 小字灰色 `GMIC AI`
3. 标题：`Book a Demo`（28px / 800 / -0.025em）
4. 三条元信息，每条一个 lucide 图标 + 文字，图标 16px、颜色 `--text-muted`：
   - `clock` → **30 min**
   - `video` → **Google Meet / Zoom** — link sent after confirmation
   - `globe` → 当前时区（跟右栏时区选择器联动，实时更新）
5. 一段说明文案（15px / line-height 1.6 / `--text-muted`）：
   > A working session with a GMIC hardware engineer — not a sales pitch. Bring your use case, your volume estimate, and any constraints you already know. We'll walk through what's feasible, what it costs, and how fast we can get you to a working prototype.
6. 一条浅分隔线，下面放一个 "What we'll cover" 列表，四项，每项前面一个蓝色 `check` 图标（14px）：
   - Your use case and hardware requirements
   - Reference designs closest to your need
   - Realistic timeline: prototype → pilot → mass production
   - Indicative pricing at your volume
7. 最底部：`Anaheim, CA · Shenzhen, China` 小字，配 `map-pin` 图标
8. **进入 Step 2 / Step 3 后，左栏内容变成"当前预约摘要"**：保留 logo 和标题，把元信息换成已选中的日期时间（大字加粗）+ 时长 + 时区，并在下面显示一个 `← Change time` 的文字按钮，点了回到 Step 1 且保留已填表单。这个联动很重要，别漏。

### 右栏（日历 + 时段，padding: 40px 36px）

- 顶部一行：`Select a Date & Time` 标题（18px/700），右侧是时区选择器。
- **时区选择器**：一个自定义 `<select>`（或按你判断做成带 `globe` 图标的下拉），默认值用 `Intl.DateTimeFormat().resolvedOptions().timeZone` 自动检测访客时区。选项至少包含：
  - 访客自动检测到的时区（置顶，标注 "(detected)"）
  - `America/Los_Angeles` — Pacific Time
  - `America/New_York` — Eastern Time
  - `America/Chicago` — Central Time
  - `Europe/London` — GMT/BST
  - `Europe/Berlin` — Central European Time
  - `Asia/Shanghai` — China Standard Time
  - `Asia/Tokyo` — Japan Standard Time
  - `Asia/Kolkata` — India Standard Time
  - `Australia/Sydney` — Australian Eastern Time
  每个选项后面显示该时区的当前时间（如 `Pacific Time (12:41pm)`）。切换时区时，右侧时段列表**实时重新换算并重绘**，左栏的时区行也同步更新。

- **月历**：手写，不用库。
  - 头部：`‹ August 2026 ›` 月份切换（月名 18px/700），上一月按钮在已经是当月时禁用（灰掉且不可点）
  - 周起始为 Sunday，星期缩写行 `SUN MON TUE WED THU FRI SAT`（12px / 500 / letter-spacing .06em / `--text-muted`）
  - 日期格子 40×40 圆形按钮，居中在 7 列网格里
  - 状态：
    - **可约**：文字 `--blue-deep`、背景 `#eef4ff`、hover 背景 `#dfe9ff` 且轻微放大 `scale(1.06)`
    - **选中**：实心 `--blue-deep` 背景 + 白字
    - **不可约**（过去日期、周末、blackout 列表里的日期）：`--text-muted` 30% 透明、`cursor:default`、无 hover
    - **今天**：日期下方一个 4px 蓝点
  - 键盘可达：日期格子是真 `<button>`，方向键在网格内移动焦点，Enter 选中，有清晰的 `:focus-visible` 蓝色描边

- **时段列表**（日历右侧或下方，桌面端放在日历右边一列 220px 宽、可滚动，`max-height` 跟日历等高；移动端放日历下方）：
  - 未选日期时显示占位空态：一个淡灰 `calendar` 图标 + `Select a date to see available times`
  - 选中日期后，上方显示 `Thursday, August 20`（16px/700），下面是时段按钮列表
  - 每个时段是一个整宽按钮：白底、`1px solid var(--blue-deep)`、蓝字、`border-radius: var(--radius-sm)`、`padding: 12px`、居中、`font-weight:600`
  - hover：淡蓝底
  - 点击某时段 → 该按钮**收缩到左半宽**并变实心蓝，右半宽滑出一个深色 `Next` 按钮（`#0f172a`），这是 Calendly 的经典交互，务必还原。点 `Next` 进入 Step 2。
  - 时段之间 8px 间距

### 时段生成逻辑（纯前端，写成一个清晰可改的 config 对象）

在 `<script>` 顶部写一个 `BOOKING_CONFIG`，所有可调参数集中在这里，加中文注释说明怎么改：

```js
const BOOKING_CONFIG = {
  hostTimeZone: 'America/Los_Angeles', // GMIC 团队所在时区，所有可用时段以此定义
  durationMinutes: 30,
  // 每周可约的工作日 (0=Sun ... 6=Sat)
  availableWeekdays: [1, 2, 3, 4, 5],
  // 主办方本地时间的可约窗口，24 小时制
  dayStartHour: 9,
  dayEndHour: 17,
  // 午休，不生成时段
  lunchBreak: { startHour: 12, endHour: 13 },
  // 最早可约：从现在起至少提前多少小时
  minNoticeHours: 24,
  // 最晚可约：往后多少天
  bookingWindowDays: 60,
  // 手动屏蔽的日期 (YYYY-MM-DD)，比如假期
  blackoutDates: ['2026-11-26', '2026-11-27', '2026-12-24', '2026-12-25', '2027-01-01'],
  // 演示用：让日历看起来真实，部分时段随机显示为已被约满
  simulateBookedSlots: true,
};
```

- 时段按 `durationMinutes` 步长生成，跨过午休。
- 生成的时段是**主办方时区的绝对时刻**，再用 `Intl.DateTimeFormat` 换算成访客选择的时区显示。**不要用字符串拼时间**，必须走真正的时区换算，跨时区跨夏令时要正确。
- `simulateBookedSlots` 为 true 时，用一个基于日期字符串的**确定性伪随机**（不要用 `Math.random()`，否则每次重绘时段都在变）把约 30% 的时段标为不可用，不可用时段直接不渲染。
- 如果某天换算后一个时段都没有，日历上该天显示为不可约。
- 代码里写明：**这是前端模拟数据，将来接真实后端只需要替换 `getAvailableSlots(date)` 这一个函数**，把这句写成显眼的注释。

## 5. Step 2 — 填信息

同样是左信息栏（此时是预约摘要）+ 右表单的两栏布局。右栏 padding 40px 36px。

- 标题 `Enter Details`（18px/700）
- 字段（保持精简，B2B 表单越短转化越高）：
  1. `Full name` — 必填
  2. `Work email` — 必填，前端校验邮箱格式；**并且拒绝常见免费邮箱域名**（gmail/yahoo/hotmail/outlook/qq/163/126），错误提示：`Please use your work email so we can prepare for the call.`
  3. `Company` — 必填
  4. `Phone` — 选填，标注 `(optional)`
  5. `What would you like to cover?` — 多行 textarea，选填，4 行高，placeholder：`Your use case, target volume, timeline — anything that helps us prepare.`
  6. 底部一行小字：`By scheduling, you agree to our Privacy Policy.`（Privacy Policy 链接指向站内对应页面，若不存在就先指向 `../index.html` 并留 TODO 注释）
- 输入框样式：`padding:12px 14px; border:1px solid var(--border-light); border-radius:10px; font-size:15px;` focus 时 `border-color: var(--blue-deep)` + `box-shadow: 0 0 0 3px rgba(37,99,235,0.12)`，无 outline 跳动。label 在输入框上方，13px/600，必填项后面一个红色星号。
- 校验在 blur 和提交时触发，错误信息显示在字段下方（13px、`#dc2626`），对应输入框边框变红。第一个出错的字段自动获得焦点。
- 底部两个按钮：左边 `Back`（ghost 样式，回 Step 1 且保留已选时间），右边主按钮 `Schedule Event`（`--blue-deep` 实心，`padding:13px 28px`，`border-radius:10px`，`font-weight:600`）。
- 提交时按钮进入 loading 态（文字变 `Scheduling…` + 一个旋转的小圈），800ms 后进入 Step 3。所有数据存在内存里的 `bookingState` 对象里。
- 写一个空的 `async function submitBooking(payload)`，里面用 `console.log` 输出 payload，并在上方留一段注释块，说明将来怎么接 Formspree / 自建 API：给出 fetch POST 的示例代码（注释掉的）。**不要用 localStorage。**

## 6. Step 3 — 确认页

这一步**变成单栏**（左信息栏收起），内容居中，`max-width: 560px`，`padding: 56px 40px`。

- 顶部一个 64px 的圆形浅蓝底 `#eef4ff` 内嵌蓝色 `check` 图标，带一个轻微的弹入动画（scale 0.8 → 1，300ms）
- 标题：`You're booked.`（30px/800）
- 副标题（`--text-muted`）：`A calendar invite and a Google Meet link are on their way to <填写的邮箱>.`
- 一张预约详情卡（浅灰底 `#f7f9fe`、圆角 14px、padding 20px），四行，每行 `图标 + label + 值`：
  - `calendar` → `Thursday, August 20, 2026`
  - `clock` → `10:00am – 10:30am (Pacific Time)` — 同时在下面一行灰色小字显示主办方时间 `7:00pm CEST for GMIC Shenzhen` 这类换算（如果访客时区和主办方时区不同才显示）
  - `video` → `Google Meet — link in your invite`
  - `user` → `<姓名> · <公司>`
- **"Add to calendar" 区块**：标题小字 `ADD TO CALENDAR`（eyebrow 样式），下面四个并排的按钮（移动端 2×2），每个是白底 + `1px solid var(--border-light)` + 圆角 10px + 品牌图标 + 文字，hover 时 border 变 `--blue-deep`：
  1. **Google** → 打开 `https://calendar.google.com/calendar/render?action=TEMPLATE&text=...&dates=YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ&details=...&location=...`（UTC 时间格式，参数全部 `encodeURIComponent`），新标签打开
  2. **Outlook** → `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=...&startdt=<ISO8601>&enddt=<ISO8601>&body=...&location=...`，新标签打开。旁边再给一个极小的 `Office 365` 文字链接，指向 `https://outlook.office.com/calendar/0/deeplink/compose?...`（同样参数）
  3. **Apple / iOS** → 触发前端生成的 `.ics` 文件下载
  4. **Other (.ics)** → 同一个 `.ics` 下载
- **.ics 生成**：写一个 `buildICS(booking)` 函数，纯前端拼 iCalendar 字符串，用 `Blob` + `URL.createObjectURL` 下载，文件名 `gmic-ai-demo.ics`。必须包含：`BEGIN:VCALENDAR / VERSION:2.0 / PRODID:-//GMIC AI//Booking//EN / CALSCALE:GREGORIAN / METHOD:PUBLISH`，`VEVENT` 里有 `UID`（用时间戳+随机串）、`DTSTAMP`、`DTSTART`/`DTEND`（UTC，`Z` 结尾）、`SUMMARY:GMIC AI — Demo Call`、`DESCRIPTION`、`LOCATION:Google Meet`、`ORGANIZER;CN=GMIC AI:mailto:hello@gmic.ai`、`STATUS:CONFIRMED`，以及一个提前 15 分钟提醒的 `VALARM`。注意：行尾必须是 `\r\n`，超过 75 字节的行要按 iCalendar 规范折行，`DESCRIPTION` 里的逗号、分号、换行要转义（`\,` `\;` `\n`）。
- 最下面两个次要动作：`Schedule another` 文字按钮（重置状态回 Step 1）和 `← Back to gmic.ai` 链接。

## 7. 通用要求

- **完全响应式**：≥1024px 三栏感（信息栏 / 日历 / 时段），900–1024px 日历和时段上下叠、信息栏仍在左，<900px 全部单列。移动端字号和 padding 相应缩小，日期格子改为等分宽度的方形。
- **无障碍**：步骤切换后把焦点移到新步骤的标题上；日历用 `role="grid"`；时段列表用 `role="listbox"`；所有图标按钮有 `aria-label`；表单错误用 `aria-invalid` + `aria-describedby`；`prefers-reduced-motion` 时关闭所有动画。
- **状态管理**：一个顶层 `const bookingState = { step, timeZone, selectedDate, selectedSlot, name, email, company, phone, notes }`，所有渲染函数从它读，别到处存散状态。
- **不要引入任何构建工具、框架或 npm 依赖**，就是原生 HTML + CSS + vanilla JS，和现有站点保持一致。
- **不要用 `localStorage` / `sessionStorage`。**
- 浏览器兼容到最近两个大版本的 Chrome / Safari / Edge / Firefox，`Intl` API 直接用。
- 代码里关键逻辑（时区换算、时段生成、ICS 拼装）写中文注释，方便后续维护。

## 8. 完成后自查

做完请自己验收并报告结果：

1. 用 python 起一个本地服务器（`python -m http.server`）打开 `/book-demo/`，确认三步流程能完整走通。
2. 切换时区到 `Asia/Shanghai`，确认时段时间正确变化（PT 上午 9 点应该显示为北京时间次日凌晨 0 点 / 1 点，取决于夏令时）。
3. 下载 `.ics` 文件，把内容打印出来检查格式是否合规。
4. 点 Google 和 Outlook 按钮，把生成的 URL 打印出来，检查时间参数是否正确。
5. 在窄视口（375px）截图检查布局没有横向滚动。
6. 列出你替换了 "Book a Demo" 链接的所有文件。

====
