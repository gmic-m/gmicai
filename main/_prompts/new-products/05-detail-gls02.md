# Prompt 05 — HA-GLS02 详情页（Hearit.ai SmartGlass Tint）

---

你在 GMIC.AI 官网项目（`main/`）里工作。请新建产品详情页 `products/gls02/index.html`，产品是 **HA-GLS02 · Hearit.ai SmartGlass Tint**：一款 AI 智能眼镜，配 4 档电致变色镜片、1080p 第一视角摄像头和 AI 会议纪要功能。

它和 HA-GLS03 用的是同一个硬件平台，区别只在镜片和镜框。两个页面结构要保持一致，方便对照。和 MIC06 模板相比，本页新增五个模块：“使用流程”、“会议 AI”、“摄像头”、“镜片”、“选择镜框”。

## 通用规则（5 个详情页共用）

1. **模板**：以 `products/mic06/index.html` 为唯一模板。完整复用以下内容：`<head>` 结构、顶部导航和 mega menu、页脚（含认证 pill、微信二维码）、`js/voice-widget.js`、`js/products-mega-menu.js`、`js/chat-widget.js`、全部 `m5-` CSS 和 `fade-section` 动效。新页面路径为 `products/gls02/index.html`，资源相对路径保持 `../../`。
2. **样式**：section 背景沿用 `m5-light` / `m5-dark` / `m5-soft` 交替（相邻两个 section 不要同色）。新增模块优先复用已有类。确实需要新样式时，写在本页 `<style>` 里，类名以 `m5-` 开头。不要改全站 CSS/JS。
3. **文案真实性**：参数只用本 prompt 给出的数值。没有给出的（芯片、续航小时数、防水等级、蓝牙版本等）**一律不写、不估算**。规格表里没有的行直接删掉，不要写 "N/A"。
4. **品牌**：页面上不出现 ChatGPT logo，也不出现第三方 App 品牌名。各产品文件夹里的 `XXX 主图.jpg`（带 “AICHAT” 水印）不要使用。
5. **图片处理**：网页用图统一生成到 `img/products/gls02/`，文件名用英文小写加连字符，宽度不超过 1600px，JPG 质量 82。
   - 来源是电商详情切图（`img/products/<SKU>/images/详情_XX.jpg`）时：先打开图片看清楚，再用 Python Pillow **只裁出照片或渲染区域**，去掉烧进图里的标题、说明卡片、图标和 logo。实在裁不出干净区域，就放弃这张，改用 CSS 渐变背景块。
   - Hero 主图：如果 hero 背景不是纯白，用 Pillow 把接近白色的背景（RGB 都大于 245）转成透明，导出 PNG。已有透明 PNG 的产品直接用。
6. **Manufacturer 区块**：复用 `img/products/mic06/Manufacturer-1/2/3.png`。先打开看一下，如果图上出现 MIC06 专属产品，改用 `img/products/mic05/` 下的同名图。文案改成本产品型号。
7. **按钮**：Book a Demo → `../../book-a-meeting/index.html`；Talk to Sales、Explore ODM/OEM 的链接与模板保持一致。
8. **SEO**：`<title>` 格式为 Hearit.ai SmartGlass Tint (HA-GLS02) — AI Smart Glasses with Electrochromic Lenses | GMIC.AI。meta description 控制在 150–160 字符。og:title、og:description、og:image（用 hero 图）、canonical 都要更新。所有图片写有意义的英文 alt。
9. **验收**：在 375 / 768 / 1440 三个宽度下检查布局。控制台不能有 404。页面上不能残留任何 MIC06 的字样（全局搜索 `MIC06`、`mic06`，只有 Manufacturer 图片路径允许保留）。

## 额外要求
- 原始素材只在 hero 副标题里出现过一次 “translate”，没有任何翻译功能的展示，所以**本页不写翻译功能**。
- “Choose your frame” 模块链接到 `../gls03/index.html`。

## 图片资源（源 → 目标，都在 `img/products/` 下）

| 用途 | 源文件 | 目标 `img/products/gls02/` |
|---|---|---|
| Hero 主图 | `HA-GLS02/主图镂空.png`（已经是透明背景） | `hero.png`（只缩放） |
| 白底产品图 | `HA-GLS02/主图0.jpg` | `product.jpg` |
| 使用流程 4 张 | `HA-GLS02/images/详情_02.jpg` | `step-1.jpg` … `step-4.jpg` |
| 会议场景 | `HA-GLS02/images/详情_03.jpg`：去掉标注 | `meeting.jpg` |
| 第一视角与防抖 | `HA-GLS02/images/详情_04.jpg`：展会 POV，加防抖对比两图 | `pov.jpg`、`stab-off.jpg`、`stab-on.jpg` |
| 桌面产品 | `HA-GLS02/images/详情_06.jpg`：卡片以上的部分 | `desk.jpg` |
| 场景 4 张 | `HA-GLS02/images/详情_07.jpg` | `use-1.jpg` … `use-4.jpg` |
| 40 g 特写与控制 | `HA-GLS02/images/详情_08.jpg`：特写、按键和触控插图，去掉大字 “40g” | `closeup.jpg`、`button.jpg`、`touch.jpg` |
| 变色镜片场景 | `HA-GLS02/images/详情_09.jpg`：公园人物照，不要色块 | `tint-lifestyle.jpg` |
| 尺寸线图 | `HA-GLS02/images/详情_10.jpg`：只要线图 | `dimensions.jpg` |
| GLS03 对比缩略图 | `img/products/overview/HA-GLS03.jpg` | 直接引用 |

## 页面结构与文案

**1. Hero**
- Eyebrow：`HA-GLS02 · AI Smart Glasses`
- H1：`AI that sees, listens` 换行 `and adapts to the light.`
- Sub：`SmartGlass Tint combines a 1080p first-person camera, AI meeting notes and 4-level electrochromic lenses in a 40 g frame — giving teams hands-free capture and instant structured notes, indoors or out.`
- Chips：`1080p Camera` · `Electrochromic Lens` · `Wi-Fi + BT` · `40 g`

**2. Stats 条**
- `4 levels` / Electrochromic tint
- `1080p` / First-person video
- `8GB` / Onboard storage
- `40 g` / Lightweight frame

**3. Intro（m5-light）**，配 `desk.jpg`
- Eyebrow：`Hands-free intelligence`
- H2：`Capture the moment.` 换行 `Get the notes automatically.`
- Lead：`Built for professionals who move between meeting rooms, client sites and the outdoors. Press once to record what you see and hear; AI turns the conversation into transcripts, summaries, structured notes and tasks.`

**4. 新增：How it works（m5-soft）**：4 步，用 `step-1…4.jpg`
1. `Pair` — Connect HA-GLS02 to the companion app.
2. `Wear` — Put them on like regular glasses; wear detection handles the rest.
3. `Press` — The physical button takes photos, records video or activates AI.
4. `Review` — Find media and AI results in the app's data center.

**5. 新增：Meeting AI（m5-dark）**：左边 `meeting.jpg`，右边 4 个要点
- `Transcription` — Speech to text, automatically.
- `Smart Summary` — Key points extracted from every conversation.
- `Structured Notes` — Organized, shareable meeting records.
- `Smart Tasks` — Action items pulled out for follow-up.
- 再加一行小字：`Plus visual mind maps that turn discussions into structured outlines.`

**6. 新增：First-person capture（m5-light）**：上方 `pov.jpg`，下方并排 `stab-off.jpg` / `stab-on.jpg`
- H2：`Document work` 换行 `from your point of view.`
- 要点：`1080p at 25 fps` · `Software image stabilization` · `75° wide angle`

**7. 新增：Electrochromic lenses（m5-dark）**：左边 `tint-lifestyle.jpg`，右边说明，下方用 CSS 画 4 个圆形色块表示透光率
- H2：`One touch from clear` 换行 `to shade.`
- Lead：`Swipe the temple to switch between four tint levels — no need to carry or swap sunglasses when moving between the office and the outdoors.`
- 色块：`10%`、`21%`、`35%`、`48%`，用同一深灰色、不同透明度表示

**8. Key Features（m5-soft）**：6 卡
- `AI Voice Q&A` — Ask questions naturally, get answers instantly.
- `AI Meeting Notes` — Transcripts, summaries, notes and tasks.
- `1080p POV Camera` — Stabilized first-person video and photos.
- `Electrochromic Lenses` — Four tint levels at a touch.
- `Dual Wireless + 8GB` — Wi-Fi + Bluetooth fast transfer; local storage for media.
- `Button + Touch Control` — Physical capture button and touch swipe for volume and tracks; 配图 `button.jpg` / `touch.jpg` 可做 hover 或小插图

**9. The details（m5-light）**：规格表 + `dimensions.jpg` + `product.jpg`

| Key | Value |
|---|---|
| Product Name | Hearit.ai SmartGlass Tint — AI Smart Glasses |
| Model | HA-GLS02 |
| Video | Up to 1920 × 1080 (1080p), 25 fps |
| Stabilization | Software image stabilization |
| Field of View | 75° wide angle |
| Wireless | Wi-Fi + Bluetooth |
| Storage | 8GB onboard |
| Audio | Dual Hi-Fi speakers |
| Microphones | Dual-microphone array |
| Controls | Physical button + touch |
| Lens | Electrochromic, 4 levels (10% / 21% / 35% / 48%) |
| Frame | PC + ABS |
| Indicators | Tri-color status light / white recording light |
| Wear Detection | Supported |
| Battery | 290 mAh lithium |
| Charging | USB Type-C |
| Dimensions | Front width 156 mm · overall length 168.5 mm · lens 50.5 × 39 mm · bridge 10.5 mm |
| Weight | 40 g (device only) |

**10. Use cases（m5-dark）**：4 张图卡，用 `use-1…4.jpg`
- `Meetings & Work` — Record, transcribe and organize.
- `Field & Travel` — Capture site visits and outdoor work, lenses adapting to the light.
- `Daily AI Assistant` — Ask questions and manage tasks hands-free.
- `Visual Mind Maps` — Turn discussions into structured outlines.

**11. 新增：Choose your frame（m5-soft）**：2 列对比卡
- `SmartGlass Tint`（HA-GLS02，本页，高亮）— Full-rim PC + ABS frame · Electrochromic 4-level lens · 290 mAh · 40 g
- `SmartGlass Clear`（HA-GLS03）— Stainless steel browline frame · Clear anti-blue-light lens · 300 mAh · 43 g → `../gls03/index.html`
- 下方一行：`Same platform: 1080p camera, AI notes, Wi-Fi + BT, 8GB, dual mics, dual speakers.`

**12. Engineered and built in-house（m5-light）**：沿用模板，型号换成 SmartGlass / HA-GLS02。

**13. Built to plug into your stack（m5-dark）**：沿用模板，节点 `Capture → Transcribe → Structure → Integrate`。

**14. Available customization（m5-soft）**：沿用模板三列，在 Hardware 列加一条 `Frame color & lens options`。

**15. CTA（m5-dark m5-cta）**
- H2：`Bring AI to every set of eyes on the job.`
- Lead：`Request a SmartGlass sample, schedule a demo, or talk to our engineering team about deployment and customization.`
