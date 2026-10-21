# Prompt 03 — HA-BC01 White 详情页（Hearit.ai BoneSonix White）

---

你在 GMIC.AI 官网项目（`main/`）里工作。请新建产品详情页 `products/bc01-white/index.html`，产品是 **HA-BC01 White · Hearit.ai BoneSonix White**：开放式骨传导 AI 耳机的白色款，面向企业的“边工作边采集语音”场景。

这款产品的官方素材本身就是 B2B 叙事（数据可控、部署灵活、ODM 合作流程），所以页面在 MIC06 结构上增加四个模块：“一键录音流程”、“AI 处理链路”、“数据控制与部署”、“合作流程”。

## 通用规则（5 个详情页共用）

1. **模板**：以 `products/mic06/index.html` 为唯一模板。完整复用以下内容：`<head>` 结构、顶部导航和 mega menu、页脚（含认证 pill、微信二维码）、`js/voice-widget.js`、`js/products-mega-menu.js`、`js/chat-widget.js`、全部 `m5-` CSS 和 `fade-section` 动效。新页面路径为 `products/bc01-white/index.html`，资源相对路径保持 `../../`。
2. **样式**：section 背景沿用 `m5-light` / `m5-dark` / `m5-soft` 交替（相邻两个 section 不要同色）。新增模块优先复用已有类。确实需要新样式时，写在本页 `<style>` 里，类名以 `m5-` 开头。不要改全站 CSS/JS。
3. **文案真实性**：参数只用本 prompt 给出的数值。没有给出的（芯片、续航小时数、防水等级、蓝牙版本等）**一律不写、不估算**。规格表里没有的行直接删掉，不要写 "N/A"。
4. **品牌**：页面上不出现 ChatGPT logo，也不出现第三方 App 品牌名。各产品文件夹里的 `XXX 主图.jpg`（带 “AICHAT” 水印）不要使用。
5. **图片处理**：网页用图统一生成到 `img/products/bc01-white/`，文件名用英文小写加连字符，宽度不超过 1600px，JPG 质量 82。
   - 来源是电商详情切图（`img/products/<SKU>/images/详情_XX.jpg`）时：先打开图片看清楚，再用 Python Pillow **只裁出照片或渲染区域**，去掉烧进图里的标题、说明卡片、图标和 logo。实在裁不出干净区域，就放弃这张，改用 CSS 渐变背景块。
   - Hero 主图：如果 hero 背景不是纯白，用 Pillow 把接近白色的背景（RGB 都大于 245）转成透明，导出 PNG。已有透明 PNG 的产品直接用。
6. **Manufacturer 区块**：复用 `img/products/mic06/Manufacturer-1/2/3.png`。先打开看一下，如果图上出现 MIC06 专属产品，改用 `img/products/mic05/` 下的同名图。文案改成本产品型号。
7. **按钮**：Book a Demo → `../../book-a-meeting/index.html`；Talk to Sales、Explore ODM/OEM 的链接与模板保持一致。
8. **SEO**：`<title>` 格式为 Hearit.ai BoneSonix White (HA-BC01) — AI Bone Conduction Headset | GMIC.AI。meta description 控制在 150–160 字符。og:title、og:description、og:image（用 hero 图）、canonical 都要更新。所有图片写有意义的英文 alt。
9. **验收**：在 375 / 768 / 1440 三个宽度下检查布局。控制台不能有 404。页面上不能残留任何 MIC06 的字样（全局搜索 `MIC06`、`mic06`，只有 Manufacturer 图片路径允许保留）。

## 额外要求：黑白款互链
- 在 Hero 区加一个颜色切换：两个圆形色块 `White`（当前，高亮）和 `Black`，Black 链接到 `../bc01/index.html`。
- **不要修改** `products/bc01/index.html`，只在本页做单向链接。

## 图片资源（源 → 目标，都在 `img/products/` 下）

| 用途 | 源文件 | 目标 `img/products/bc01-white/` |
|---|---|---|
| Hero 主图 | `HA-BC01-White/白底图1.jpg` | `hero.png`（去白底） |
| 产品图库 | `HA-BC01-White/白底图2.jpg` ~ `白底图5.jpg` | `gallery-1.jpg` … `gallery-4.jpg` |
| 展会痛点场景 | `HA-BC01-White/images/详情_02.jpg`：只要右半边照片 | `tradeshow.jpg` |
| 一键录音 | `HA-BC01-White/images/详情_03.jpg`：裁出办公室按键照片和产品标注图 | `one-touch.jpg`、`callouts.jpg` |
| AI 链路 4 张 | `HA-BC01-White/images/详情_04.jpg`：四张场景照，去掉 UI 浮层和文字 | `ai-1.jpg` … `ai-4.jpg` |
| 硬件可靠性 | `HA-BC01-White/images/详情_05.jpg`：裁出湿润表面照片和磁吸充电特写 | `ip66.jpg`、`charging.jpg` |
| 场景 4 张 | `HA-BC01-White/images/详情_07.jpg` | `use-1.jpg` … `use-4.jpg` |
| 规格示意图 | `HA-BC01-White/images/详情_09.jpg`：只要顶部带标注的两视图 | `diagram.jpg` |

`详情_06`（流程图）、`详情_08`（定制卡片）里的信息改用 HTML 重做，不要直接贴图。

## 页面结构与文案

**1. Hero**
- Eyebrow：`HA-BC01 · AI Bone Conduction Headset — White`
- H1：`Open-ear AI capture` 换行 `for connected workflows.`
- Sub：`BoneSonix White keeps your ears open to the world while capturing every conversation — one touch to record, AI to turn voice into searchable transcripts, summaries and structured data your systems can use.`
- Chips：`Bluetooth 5.3` · `IP66` · `38.2 g` · `One-Touch Record`
- Hero 下方加一条可横向滑动的小图库：`gallery-1…4.jpg`

**2. Stats 条**
- `38.2 g` / Lightweight frame
- `IP66` / Dust & water resistant
- `6 h` / Playback
- `~1 h` / Magnetic charge

**3. Intro（m5-light）**，左文右图（`tradeshow.jpg`）
- Eyebrow：`Capture without interrupting work`
- H2：`Hands stay busy.` 换行 `Nothing gets missed.`
- Lead：`On trade show floors, job sites and customer calls, notes get skipped and long recordings never get searched. BoneSonix White records with one touch and turns speech into structured information — without pulling anyone out of the conversation.`

**4. 新增：Start recording in seconds（m5-soft）**：左边 `one-touch.jpg`，右边 3 步，下方放 `callouts.jpg`
1. `Wear` — Flexible open-ear frame sits comfortably for long shifts.
2. `Press` — One physical button on the earpiece starts or stops recording.
3. `Done` — Audio is processed into transcripts and summaries automatically.

**5. Key Features（m5-dark）**：6 卡
- `Open-Ear Bone Conduction` — Hear colleagues, customers and your surroundings while you listen and record.
- `One-Touch Recording` — A dedicated button starts capture instantly — no phone, no app tap.
- `Customizable Buttons` — Volume and power buttons support custom combinations for your workflow.
- `Clear Capture in Noise` — Designed for clear voice pickup on busy floors and in the field.
- `Magnetic Pogo-Pin Charging` — Snap-on contacts, roughly one hour to full.
- `Night Safety Light` — Built-in light keeps wearers visible in low-light work.

**6. 新增：From voice to structured information（m5-light）**：4 张卡横排并用箭头连接，配 `ai-1…4.jpg`
- `AI Speech Recognition` → `AI Transcription`（searchable text） → `AI Summary`（structured key points） → `AI Voice Interaction`（voice commands）

**7. 新增：Reliable hardware（m5-soft）**：左大图 `ip66.jpg`，右边两张小卡
- `IP66 protection` — Dust- and water-resistant for outdoor and warehouse use.
- `Magnetic charging` 配 `charging.jpg` — 3.7 V 180 mAh battery, approx. 1-hour charge, up to 6 hours of playback.

**8. The details（m5-dark 或 soft，跟上一个 section 错开颜色）**：规格表 + `diagram.jpg`

| Key | Value |
|---|---|
| Product Name | Hearit.ai BoneSonix White — AI Bone Conduction Headset |
| Model | HA-BC01 (White) |
| Bluetooth | V5.3 |
| Frequency / Range | 2.4–2.48 GHz / 10 m |
| Frequency Response | 140 Hz – 15 kHz |
| Controls | One-touch record button, multi-function button, volume +/–, power |
| Battery | 3.7 V 180 mAh |
| Playback | Up to 6 hours |
| Charging | Magnetic Pogo-pin, 5 V / 200 mA, approx. 1 hour |
| Waterproof | IP66 |
| Safety | Night safety light |
| Material | Plastic + PCBA |
| Size | 135 × 101 × 45 mm |
| Net Weight | 38.2 g |
| Color | White（同款另有 Black，链接 `../bc01/index.html`） |

**9. Use cases（m5-light）**：4 张图卡，用 `use-1…4.jpg`
- `Customer Communication` — Record client conversations hands-free.
- `Field Service & Warehouse` — Capture instructions and reports on the move.
- `Training & Interviews` — Turn sessions into searchable records.
- `Trade Shows & Events` — Log every booth conversation for follow-up.

**10. 新增：Your data, your environment（m5-dark）**：在模板 “Built to plug into your stack” 的基础上改造，保留流程图组件，节点改为 `Headset → Your Device (PC / Mobile / Tablet) → Your Platform → Enterprise System`，下方 3 张卡：
- `Customer-Controlled Data` — You decide where voice data is stored, processed and integrated.
- `Flexible Deployment` — On-premise, private cloud, or your existing environment.
- `Configurable Workflows` — Match data flows to your operations and compliance policies.

**11. Engineered and built in-house（m5-soft）**：沿用模板，型号换成 BoneSonix / HA-BC01。

**12. Available customization（m5-light 或 dark，与相邻 section 错开）**：改为 4 列（移动端 2×2）
- `Hardware` — Appearance, materials, components
- `Firmware` — Button functions, interaction logic, features
- `AI & Data` — Processing, output format, system integration
- `Branding` — Logo, packaging, product appearance

下方新增 5 步横向流程条（移动端改为竖排）：`Requirement Review → Solution Design → Prototype Validation → Pilot Production → Mass Production`

**13. CTA（m5-dark m5-cta）**
- H2：`Ready to equip your team?`
- Lead：`Request a BoneSonix White sample, schedule a demo, or talk to our engineering team about ODM/OEM customization.`
