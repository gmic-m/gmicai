# Prompt 02 — HA-CS01 详情页（Hearit.ai CardMic）

---

你在 GMIC.AI 官网项目（`main/`）里工作。请新建产品详情页 `products/cs01/index.html`，产品是 **HA-CS01 · Hearit.ai CardMic**：一款卡片式 AI 录音器，厚 4.5 mm，可以磁吸在手机背面。它和 MIC06 同属可穿戴录音器品类，所以页面结构基本沿用 MIC06，只在中间插入“极薄磁吸”和“使用流程”两个模块。

## 通用规则（5 个详情页共用）

1. **模板**：以 `products/mic06/index.html` 为唯一模板。完整复用以下内容：`<head>` 结构、顶部导航和 mega menu、页脚（含认证 pill、微信二维码）、`js/voice-widget.js`、`js/products-mega-menu.js`、`js/chat-widget.js`、全部 `m5-` CSS 和 `fade-section` 动效。新页面路径为 `products/cs01/index.html`，资源相对路径保持 `../../`。
2. **样式**：section 背景沿用 `m5-light` / `m5-dark` / `m5-soft` 交替（相邻两个 section 不要同色）。新增模块优先复用已有类。确实需要新样式时，写在本页 `<style>` 里，类名以 `m5-` 开头。不要改全站 CSS/JS。
3. **文案真实性**：参数只用本 prompt 给出的数值。没有给出的（芯片、续航小时数、防水等级、蓝牙版本等）**一律不写、不估算**。规格表里没有的行直接删掉，不要写 "N/A"。
4. **品牌**：页面上不出现 ChatGPT logo，也不出现第三方 App 品牌名。各产品文件夹里的 `XXX 主图.jpg`（带 “AICHAT” 水印）不要使用。
5. **图片处理**：网页用图统一生成到 `img/products/cs01/`，文件名用英文小写加连字符，宽度不超过 1600px，JPG 质量 82。
   - 来源是电商详情切图（`img/products/<SKU>/images/详情_XX.jpg`）时：先打开图片看清楚，再用 Python Pillow **只裁出照片或渲染区域**，去掉烧进图里的标题、说明卡片、图标和 logo。实在裁不出干净区域，就放弃这张，改用 CSS 渐变背景块。
   - Hero 主图：如果 hero 背景不是纯白，用 Pillow 把接近白色的背景（RGB 都大于 245）转成透明，导出 PNG。已有透明 PNG 的产品直接用。
6. **Manufacturer 区块**：复用 `img/products/mic06/Manufacturer-1/2/3.png`。先打开看一下，如果图上出现 MIC06 专属产品，改用 `img/products/mic05/` 下的同名图。文案改成本产品型号。
7. **按钮**：Book a Demo → `../../book-a-meeting/index.html`；Talk to Sales、Explore ODM/OEM 的链接与模板保持一致。
8. **SEO**：`<title>` 格式为 Hearit.ai CardMic (HA-CS01) — 4.5 mm Card-Style AI Voice Recorder | GMIC.AI。meta description 控制在 150–160 字符。og:title、og:description、og:image（用 hero 图）、canonical 都要更新。所有图片写有意义的英文 alt。
9. **验收**：在 375 / 768 / 1440 三个宽度下检查布局。控制台不能有 404。页面上不能残留任何 MIC06 的字样（全局搜索 `MIC06`、`mic06`，只有 Manufacturer 图片路径允许保留）。

## 图片资源（源 → 目标，都在 `img/products/` 下）

| 用途 | 源文件 | 目标 `img/products/cs01/` |
|---|---|---|
| Hero 主图 | `HA-CS01/主图 1.jpg`（白底正面） | `hero.png`（去白底） |
| 极薄展示 | `HA-CS01/images/详情_06.jpg`：裁出侧面 4.5 mm 渲染图，以及放进口袋的照片 | `thin-profile.jpg`、`pocket.jpg` |
| 使用流程 4 张 | `HA-CS01/images/详情_02.jpg`：四宫格，每格只裁照片，不要下面的说明文字 | `step-1.jpg` … `step-4.jpg` |
| 会议拾音 / 通话拾音 | `HA-CS01/images/详情_07.jpg`：上下两张照片 | `audio-meeting.jpg`、`audio-call.jpg` |
| 桌面场景 | `HA-CS01/images/详情_08.jpg`：只要上面约 75%，不要底部数据栏 | `desk.jpg` |
| 尺寸线图 | `HA-CS01/images/详情_09.jpg`：只要顶部三视图 | `dimensions.jpg` |
| 与手机尺寸对比 | `HA-CS01/images/详情_10.jpg` | `size-compare.jpg` |

`详情_03`（App 截图里有第三方品牌）和 `详情_04`（对比表）不要当图片用。

## 页面结构与文案

**1. Hero**
- Eyebrow：`HA-CS01 · Card-Style AI Voice Recorder`
- H1：`Every conversation, captured —` 换行 `at 4.5 mm thin.`
- Sub：`CardMic snaps magnetically to the back of any phone and turns meetings, calls and on-site conversations into transcripts, summaries and action items. Triple-mic pickup, 32GB of local storage and 55+ hours of recording on a single charge.`
- Chips：`Wi-Fi 6` · `BT 5.3` · `32GB Storage` · `55h Recording`

**2. Stats 条**（4 项）
- `4.5 mm` / Ultra-thin body
- `55+ h` / Continuous recording
- `32GB` / On-device storage
- `3 mics` / 2 omni + 1 bone-conduction

**3. Intro（m5-light）**
- Eyebrow：`Designed for the working day`
- H2：`Snaps to the phone` 换行 `your teams already carry.`
- Lead：`No extra device to clip, charge or forget. CardMic attaches to MagSafe-compatible phones, slips into a shirt pocket at just 60 g, and starts recording with a single press — so client meetings, site visits and phone calls are captured without breaking the conversation.`
- 配图：`thin-profile.jpg` 加 `pocket.jpg`，左右或上下排布

**4. 新增：How it works（m5-soft）**：4 列步骤卡，移动端改成 2×2，用 `step-1…4.jpg`
1. `Pair` — Connect CardMic to the companion app over Bluetooth.
2. `Attach` — Snap it to the back of your phone or carry it in a pocket.
3. `Press to record` — One press starts capture; a short vibration confirms.
4. `Review` — Transcripts, summaries and action items appear in the app.

**5. Key Features（m5-dark）**：6 张卡，沿用模板的图标卡样式，图标用 lucide
- `MagSafe-Compatible Mount` — Snaps securely to the back of compatible phones, so the recorder is always where the conversation is.
- `One-Press Recording` — A single main button starts and stops capture, with vibration feedback so you never have to look.
- `Triple-Mic Pickup + AI Noise Reduction` — Two omnidirectional mics plus a bone-conduction mic keep voices clear in meeting rooms and on noisy streets.
- `Status at a Glance` — A 0.5" monochrome display shows recording status, battery and device info.
- `Structured AI Output` — Transcription, AI summaries, customizable summary templates, mind maps and speaker identification.
- `Local-First Storage` — 32GB of on-device storage keeps recordings secure; Wi-Fi 6 and BT 5.3 sync them when you're ready.

**6. 新增：Audio in the real world（m5-light）**：两栏图文
- 左：`audio-meeting.jpg`，标题 `In the meeting room`，文案 `Captures every voice around the table for accurate, speaker-labelled transcripts.`
- 右：`audio-call.jpg`，标题 `On the call`，文案 `Attached to the phone, CardMic records calls clearly — even on a busy street.`

**7. The details（m5-soft）**：规格表沿用 `m5-spec-k` / `m5-spec-v`，下方并排放 `dimensions.jpg` 和 `size-compare.jpg`

| Key | Value |
|---|---|
| Product Name | Hearit.ai CardMic — Card-Style AI Voice Recorder |
| Model | HA-CS01 |
| Wi-Fi | IEEE 802.11 b/g/n/ax (Wi-Fi 6), 2.4 GHz |
| Bluetooth | 5.3 |
| Frequency / Range | 2.4–2.48 GHz / 10 m |
| Storage | 32GB local |
| Microphones | 2 × omnidirectional silicon mic + 1 × bone-conduction mic, AI noise reduction |
| Display | 0.5" monochrome, 88 × 48 |
| Feedback | Vibration motor |
| Mounting | MagSafe-compatible magnetic attachment |
| Battery | 3.7 V 500 mAh · 55+ hours continuous recording |
| Charging | USB Type-C, 5 V / 1 A, approx. 2 hours |
| Material | Aluminum alloy + glass |
| Dimensions | 88.4 × 57 × 4.5 mm |
| Weight | 60 g |
| Compatibility | iOS / Android companion app |

**8. Industries（m5-dark）**：沿用模板的 tag 云
- H2：`Built for conversation-heavy teams.`
- Tags：Field Service · Sales Teams · Real Estate · Insurance · Consulting · Healthcare · Training & Education · Legal · Property Management · Enterprise Operations

**9. Engineered and built in-house（m5-soft）**：沿用模板，把型号换成 CardMic / HA-CS01。

**10. Built to plug into your stack（m5-light）**：沿用模板的流程图和三张卡，`MIC06` 字样全部换成 `CardMic`。

**11. Available customization（m5-dark）**：沿用模板三列，第一列 Hardware 里的 `Custom housing color` 改为 `Custom housing color & texture`，其余不变。

**12. CTA（m5-dark m5-cta）**
- H2：`Put a recorder on every phone in the field.`
- Lead：`Request a CardMic sample, schedule a demo, or talk to our engineering team about volume and customization.`
