# Prompt 06 — HA-GLS03 详情页（Hearit.ai SmartGlass Clear）

---

你在 GMIC.AI 官网项目（`main/`）里工作。请新建产品详情页 `products/gls03/index.html`，产品是 **HA-GLS03 · Hearit.ai SmartGlass Clear**：一款日常商务风格的 AI 智能眼镜，不锈钢眉线半框，配透明防蓝光镜片，内置 1080p 第一视角摄像头，支持 AI 问答、会议纪要和语音翻译。

它和 HA-GLS02 是同一硬件平台。**如果 `products/gls02/index.html` 已经生成，就以它为结构基础**，只替换内容；如果还没有生成，就按本 prompt 从 MIC06 模板开始做。两页的模块顺序要保持一致。

## 通用规则（5 个详情页共用）

1. **模板**：以 `products/mic06/index.html` 为唯一模板。完整复用以下内容：`<head>` 结构、顶部导航和 mega menu、页脚（含认证 pill、微信二维码）、`js/voice-widget.js`、`js/products-mega-menu.js`、`js/chat-widget.js`、全部 `m5-` CSS 和 `fade-section` 动效。新页面路径为 `products/gls03/index.html`，资源相对路径保持 `../../`。
2. **样式**：section 背景沿用 `m5-light` / `m5-dark` / `m5-soft` 交替（相邻两个 section 不要同色）。新增模块优先复用已有类。确实需要新样式时，写在本页 `<style>` 里，类名以 `m5-` 开头。不要改全站 CSS/JS。
3. **文案真实性**：参数只用本 prompt 给出的数值。没有给出的（芯片、续航小时数、防水等级、蓝牙版本等）**一律不写、不估算**。规格表里没有的行直接删掉，不要写 "N/A"。
4. **品牌**：页面上不出现 ChatGPT logo，也不出现第三方 App 品牌名。各产品文件夹里的 `XXX 主图.jpg`（带 “AICHAT” 水印）不要使用。
5. **图片处理**：网页用图统一生成到 `img/products/gls03/`，文件名用英文小写加连字符，宽度不超过 1600px，JPG 质量 82。
   - 来源是电商详情切图（`img/products/<SKU>/images/详情_XX.jpg`）时：先打开图片看清楚，再用 Python Pillow **只裁出照片或渲染区域**，去掉烧进图里的标题、说明卡片、图标和 logo。实在裁不出干净区域，就放弃这张，改用 CSS 渐变背景块。
   - Hero 主图：如果 hero 背景不是纯白，用 Pillow 把接近白色的背景（RGB 都大于 245）转成透明，导出 PNG。已有透明 PNG 的产品直接用。
6. **Manufacturer 区块**：复用 `img/products/mic06/Manufacturer-1/2/3.png`。先打开看一下，如果图上出现 MIC06 专属产品，改用 `img/products/mic05/` 下的同名图。文案改成本产品型号。
7. **按钮**：Book a Demo → `../../book-a-meeting/index.html`；Talk to Sales、Explore ODM/OEM 的链接与模板保持一致。
8. **SEO**：`<title>` 格式为 Hearit.ai SmartGlass Clear (HA-GLS03) — AI Smart Glasses | GMIC.AI。meta description 控制在 150–160 字符。og:title、og:description、og:image（用 hero 图）、canonical 都要更新。所有图片写有意义的英文 alt。
9. **验收**：在 375 / 768 / 1440 三个宽度下检查布局。控制台不能有 404。页面上不能残留任何 MIC06 的字样（全局搜索 `MIC06`、`mic06`，只有 Manufacturer 图片路径允许保留）。

## 额外要求
- “Choose your frame” 模块链接到 `../gls02/index.html`。
- 本产品**有** AI 翻译功能，Meeting AI 和 Features 里都要写到。

## 图片资源（源 → 目标，都在 `img/products/` 下）

| 用途 | 源文件 | 目标 `img/products/gls03/` |
|---|---|---|
| Hero 主图 | **已准备好，直接用 `img/products/gls03/hero.png`，不要重新生成或覆盖**（镜片已处理成半透明的高清抠图） | `hero.png` |
| 白底产品图 | `HA-GLS03/主图0.jpg` | `product.jpg` |
| 使用流程 4 张 | `HA-GLS03/images/详情_02.jpg` | `step-1.jpg` … `step-4.jpg` |
| 会议场景 | `HA-GLS03/images/详情_03.jpg`：去掉标注 | `meeting.jpg` |
| 第一视角与防抖 | `HA-GLS03/images/详情_04.jpg`：博物馆 POV，加防抖对比两图 | `pov.jpg`、`stab-off.jpg`、`stab-on.jpg` |
| 办公室人像 | `HA-GLS03/images/详情_06.jpg`：底部卡片以上的部分 | `office.jpg` |
| 场景 4 张 | `HA-GLS03/images/详情_07.jpg` | `use-1.jpg` … `use-4.jpg` |
| 43 g 手持与控制 | `HA-GLS03/images/详情_08.jpg`：去掉大字 | `in-hand.jpg`、`button.jpg`、`touch.jpg` |
| 音频侧脸 | `HA-GLS03/images/详情_09.jpg`：底部卡片以上的部分 | `audio-profile.jpg` |
| 尺寸线图 | `HA-GLS03/images/详情_10.jpg`：只要线图 | `dimensions.jpg` |
| GLS02 对比缩略图 | `img/products/overview/HA-GLS02.jpg` | 直接引用 |

## 页面结构与文案

**1. Hero**
- Eyebrow：`HA-GLS03 · AI Smart Glasses`
- H1：`Looks like eyewear.` 换行 `Works like an assistant.`
- Sub：`SmartGlass Clear pairs a stainless steel browline frame and clear anti-blue-light lenses with a 1080p first-person camera, AI Q&A, meeting notes and speech translation — at just 43 g, ready for the office, the client site and everything in between.`
- Chips：`1080p Camera` · `AI Translation` · `Wi-Fi + BT` · `43 g`

**2. Stats 条**
- `1080p` / First-person video
- `75°` / Wide field of view
- `8GB` / Onboard storage
- `43 g` / All-day wear

**3. Intro（m5-light）**，配 `office.jpg`
- Eyebrow：`Made to move with you`
- H2：`Professional on the outside,` 换行 `AI on the inside.`
- Lead：`A frame your team will actually wear to meetings. Clear lenses keep eye contact natural, while the built-in camera, dual mics and AI turn every conversation and walkthrough into notes, summaries and translations.`

**4. 新增：How it works（m5-soft）**：4 步，用 `step-1…4.jpg`，文案同 GLS02，型号改为 HA-GLS03
1. `Pair` — Connect HA-GLS03 to the companion app.
2. `Wear` — Wear detection wakes the glasses when you put them on.
3. `Press` — The physical button takes photos, records video or audio, or activates AI.
4. `Review` — Media and AI results appear in the app's data center.

**5. 新增：Meeting AI（m5-dark）**：左边 `meeting.jpg`，右边 3 个要点
- `AI Voice Q&A` — Ask questions naturally and get answers instantly.
- `Meeting Notes & Smart Summary` — Conversations become structured notes with key points highlighted.
- `AI Speech Translation` — Understand and be understood across languages.

**6. 新增：First-person capture（m5-light）**：上方 `pov.jpg`，下方并排 `stab-off.jpg` / `stab-on.jpg`
- H2：`Record walkthroughs` 换行 `exactly as you saw them.`
- 要点：`1080p at 25 fps` · `Software image stabilization` · `75° wide angle`

**7. 新增：Frame & lens（m5-dark）**：左边 `in-hand.jpg`，右边两张卡
- `Stainless steel browline frame` — A classic half-rim silhouette that fits in any meeting room.
- `Clear anti-blue-light lenses` — Comfortable for screen-heavy work days, with natural eye contact in conversations.

**8. 新增：Open-ear audio（m5-soft）**：左文右图 `audio-profile.jpg`
- H2：`Hear clearly.` 换行 `Stay aware.`
- Lead：`Dual Hi-Fi triple-magnet speakers deliver clear audio without blocking your ears, and a dual-microphone array picks up your voice for AI and calls.`

**9. Key Features（m5-light）**：6 卡
- `AI Voice Q&A` — Instant answers, hands-free.
- `Notes, Summaries & Translation` — AI processing for every conversation.
- `1080p POV Camera` — Stabilized first-person video and photos.
- `8GB Local Storage` — Photos, video and audio saved on the glasses.
- `Wi-Fi + BT Fast Transfer` — Move files to your phone quickly.
- `Button + Touch Control` — Physical capture button and touch swipe for volume and tracks（配图 `button.jpg` / `touch.jpg`）

**10. The details（m5-dark）**：规格表 + `dimensions.jpg` + `product.jpg`

| Key | Value |
|---|---|
| Product Name | Hearit.ai SmartGlass Clear — AI Smart Glasses |
| Model | HA-GLS03 |
| Video | Up to 1920 × 1080 (1080p), 25 fps |
| Stabilization | Software image stabilization |
| Field of View | 75° wide angle |
| Wireless | Wi-Fi + Bluetooth |
| Storage | 8GB onboard |
| Audio | Dual Hi-Fi triple-magnet speakers |
| Microphones | Dual-microphone array |
| Controls | Physical button + touch |
| Lens | Clear anti-blue-light |
| Frame | Stainless steel |
| Indicators | Tri-color status light / white recording light |
| Wear Detection | Supported |
| Battery | 300 mAh lithium |
| Charging | USB Type-C |
| Dimensions | Front width 156 mm · overall length 168.5 mm · lens 50.5 × 39 mm · bridge 10.5 mm |
| Weight | Approx. 43 g |

**11. Use cases（m5-light）**：4 张图卡，用 `use-1…4.jpg`
- `Work & Meetings` — Notes and summaries without a laptop.
- `Site Visits & Travel` — First-person records of every walkthrough.
- `Learning & Research` — Capture lectures and training sessions.
- `Everyday Operations` — Quick AI answers and task capture on the move.

**12. 新增：Choose your frame（m5-soft）**：与 GLS02 页同一组件、同一内容，只把高亮卡换成 SmartGlass Clear；SmartGlass Tint 链接到 `../gls02/index.html`。

**13. Engineered and built in-house（m5-light）**：沿用模板，型号换成 SmartGlass / HA-GLS03。

**14. Built to plug into your stack（m5-dark）**：沿用模板，节点 `Capture → Transcribe → Structure → Integrate`。

**15. Available customization（m5-soft）**：沿用模板三列，在 Hardware 列加一条 `Frame color & lens options`。

**16. CTA（m5-dark m5-cta）**
- H2：`Smart glasses your team will actually wear.`
- Lead：`Request a SmartGlass sample, schedule a demo, or talk to our engineering team about deployment and customization.`
