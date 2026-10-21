# Prompt 04 — HA-HSC01 详情页（Hearit.ai BoneSonix Cam）

---

你在 GMIC.AI 官网项目（`main/`）里工作。请新建产品详情页 `products/hsc01/index.html`，产品是 **HA-HSC01 · Hearit.ai BoneSonix Cam**：一款开放式 AI 耳机，右耳位置内置 1080p 第一视角摄像头，重 35 g。

B2B 叙事重点是“看到一线员工看到的东西”：现场记录、巡检、培训和远程协作。和 MIC06 模板相比，本页新增四个模块：“摄像头”、“使用流程”、“隐私与可见性”、“同系列对比”。

## 通用规则（5 个详情页共用）

1. **模板**：以 `products/mic06/index.html` 为唯一模板。完整复用以下内容：`<head>` 结构、顶部导航和 mega menu、页脚（含认证 pill、微信二维码）、`js/voice-widget.js`、`js/products-mega-menu.js`、`js/chat-widget.js`、全部 `m5-` CSS 和 `fade-section` 动效。新页面路径为 `products/hsc01/index.html`，资源相对路径保持 `../../`。
2. **样式**：section 背景沿用 `m5-light` / `m5-dark` / `m5-soft` 交替（相邻两个 section 不要同色）。新增模块优先复用已有类。确实需要新样式时，写在本页 `<style>` 里，类名以 `m5-` 开头。不要改全站 CSS/JS。
3. **文案真实性**：参数只用本 prompt 给出的数值。没有给出的（芯片、续航小时数、防水等级、蓝牙版本等）**一律不写、不估算**。规格表里没有的行直接删掉，不要写 "N/A"。
4. **品牌**：页面上不出现 ChatGPT logo，也不出现第三方 App 品牌名。各产品文件夹里的 `XXX 主图.jpg`（带 “AICHAT” 水印）不要使用。
5. **图片处理**：网页用图统一生成到 `img/products/hsc01/`，文件名用英文小写加连字符，宽度不超过 1600px，JPG 质量 82。
   - 来源是电商详情切图（`img/products/<SKU>/images/详情_XX.jpg`）时：先打开图片看清楚，再用 Python Pillow **只裁出照片或渲染区域**，去掉烧进图里的标题、说明卡片、图标和 logo。实在裁不出干净区域，就放弃这张，改用 CSS 渐变背景块。
   - Hero 主图：如果 hero 背景不是纯白，用 Pillow 把接近白色的背景（RGB 都大于 245）转成透明，导出 PNG。已有透明 PNG 的产品直接用。
6. **Manufacturer 区块**：复用 `img/products/mic06/Manufacturer-1/2/3.png`。先打开看一下，如果图上出现 MIC06 专属产品，改用 `img/products/mic05/` 下的同名图。文案改成本产品型号。
7. **按钮**：Book a Demo → `../../book-a-meeting/index.html`；Talk to Sales、Explore ODM/OEM 的链接与模板保持一致。
8. **SEO**：`<title>` 格式为 Hearit.ai BoneSonix Cam (HA-HSC01) — AI Camera Headset | GMIC.AI。meta description 控制在 150–160 字符。og:title、og:description、og:image（用 hero 图）、canonical 都要更新。所有图片写有意义的英文 alt。
9. **验收**：在 375 / 768 / 1440 三个宽度下检查布局。控制台不能有 404。页面上不能残留任何 MIC06 的字样（全局搜索 `MIC06`、`mic06`，只有 Manufacturer 图片路径允许保留）。

## 额外要求
- 参数表写的是 “Dual Hi-Fi Speakers”，营销图写的是 “bone-conduction audio”，两者不一致。正文里统一写 **open-ear audio**，不要单独宣称“骨传导发声”。产品全名保留官方写法 “AI Bone-Conduction Smart Headset”。
- 在页面底部、CTA 之前加一个 “Compare the family” 模块，链接到 `../bc01/index.html` 和 `../bc01-white/index.html`。

## 图片资源（源 → 目标，都在 `img/products/` 下）

| 用途 | 源文件 | 目标 `img/products/hsc01/` |
|---|---|---|
| Hero 主图 | `HA-HSC01/主图1.jpg`（白底大角度） | `hero.png`（去白底） |
| 白底产品图 | `HA-HSC01/images/详情_10.jpg`：裁出两张白底渲染，不要规格表 | `render-front.jpg`、`render-side.jpg` |
| 摄像头镜头 | `HA-HSC01/images/详情_08.jpg`：裁出镜头爆炸图，以及按键和指示灯特写 | `lens.jpg`、`button.jpg`、`indicator.jpg` |
| 第一视角与防抖 | `HA-HSC01/images/详情_04.jpg`：上半张街景，加防抖对比两图 | `pov.jpg`、`stab-off.jpg`、`stab-on.jpg` |
| 会议场景 | `HA-HSC01/images/详情_03.jpg`：只要人物照片 | `meeting.jpg` |
| 使用流程 4 张 | `HA-HSC01/images/详情_02.jpg` | `step-1.jpg` … `step-4.jpg` |
| 佩戴侧脸 | `HA-HSC01/images/详情_09.jpg`：底部卡片以上的部分 | `profile.jpg` |
| 桌面产品 | `HA-HSC01/images/详情_06.jpg`：底部卡片以上的部分 | `desk.jpg` |
| 场景 4 张 | `HA-HSC01/images/详情_07.jpg` | `use-1.jpg` … `use-4.jpg` |
| Family 对比缩略图 | `img/products/overview/HA-BC01.jpg`、`img/products/overview/HA-BC01-White.jpg` | 直接引用，不复制 |

## 页面结构与文案

**1. Hero**
- Eyebrow：`HA-HSC01 · AI Camera Headset`
- H1：`Hear more. Capture more.` 换行 `Hands-free.`
- Sub：`BoneSonix Cam puts a 1080p first-person camera, open-ear audio and AI transcription in a 35 g headset — so frontline teams can document work, share what they see and keep every conversation on record without picking up a device.`
- Chips：`1080p Camera` · `Wi-Fi + BT` · `8GB Storage` · `35 g`

**2. Stats 条**
- `1080p` / 25 fps video
- `75°` / Wide field of view
- `8GB` / Onboard storage
- `35 g` / All-day wear

**3. Intro（m5-light）**，配 `pov.jpg`
- Eyebrow：`See what your team sees`
- H2：`Point-of-view capture` 换行 `at ear level.`
- Lead：`Inspections, installations, site walks and training sessions are easier to verify when you can see them. BoneSonix Cam records first-person photo and video at the push of a button, while AI turns spoken notes into transcripts and summaries — creating a complete visual and verbal record of the job.`

**4. 新增：The camera（m5-dark）**：左边 `lens.jpg`，右边三条要点；下方并排放 `stab-off.jpg` / `stab-on.jpg`，标签分别为 `Without stabilization` / `With stabilization`
- `1080p first-person video` — 1920 × 1080 at 25 fps, plus still photos.
- `Software image stabilization` — Smoother footage while walking and working.
- `75° wide angle` — Captures the full working area in front of the wearer.

**5. 新增：How it works（m5-soft）**：4 步，用 `step-1…4.jpg`
1. `Pair` — Connect to the companion app.
2. `Wear` — Open-ear hooks keep your surroundings audible.
3. `Press` — The physical button takes photos, records video or activates AI.
4. `Review` — Media, transcripts and AI insights sync to the app.

**6. Key Features（m5-light 或 dark，与相邻 section 错开）**：6 卡
- `First-Person 1080p Capture` — Hands-free photo and video from the wearer's point of view.
- `Open-Ear Audio` — Dual Hi-Fi speakers leave ears free to hear colleagues and surroundings.
- `AI Transcription & Summary` — Conversations become text and key points automatically.
- `AI Translation` — Translate conversations across languages.
- `AI Voice Assistant` — Ask questions and get answers, hands-free.
- `Wi-Fi Fast Transfer + 8GB` — Store media on-device, then offload photos, video and audio quickly over Wi-Fi.

**7. 新增：Visible by design（m5-dark 或 soft）**：左边 `indicator.jpg` + `button.jpg`，右边文案
- H2：`Recording you can see.`
- Lead：`A white recording light and a tri-color status light make capture visible to everyone nearby, and a physical button means recording is always a deliberate action — important for customer sites, healthcare and regulated environments.`

**8. The details**：规格表，配 `render-front.jpg`、`render-side.jpg`

| Key | Value |
|---|---|
| Product Name | Hearit.ai BoneSonix Cam — AI Bone-Conduction Smart Headset |
| Model | HA-HSC01 |
| Video | Up to 1920 × 1080 (1080p), 25 fps |
| Stabilization | Software image stabilization |
| Field of View | 75° wide angle |
| Connectivity | Bluetooth + Wi-Fi |
| Audio | Dual Hi-Fi speakers, open-ear |
| Microphones | Dual-microphone array |
| Controls | Physical button + touch |
| Indicators | Tri-color status light / white recording light |
| Storage | 8GB onboard |
| AI Features | Voice assistant, transcription, smart summary, translation (via companion app) |
| Battery | 220 mAh lithium |
| Charging | Magnetic Pogo-pin |
| Dimensions | 142.5 × 54 mm |
| Weight | 35 g (device only) |

**9. Use cases（m5-light）**：4 张图卡，用 `use-1…4.jpg`。按 B2B 场景重写标题：
- `Meetings & Client Visits` — Record discussions and capture visual context together.
- `Site Visits & Tours` — Document locations and walkthroughs from your point of view.
- `Training & Onboarding` — Record expert demonstrations as first-person how-to videos.
- `Active Field Work` — Stays secure and open-ear while moving, lifting or cycling.

**10. Industries（m5-dark）**：Field Service · Construction · Facility Inspection · Manufacturing · Logistics · Healthcare · Insurance Claims · Training & Education · Hospitality · Enterprise Operations

**11. Engineered and built in-house（m5-soft）**：沿用模板，型号换成 BoneSonix Cam / HA-HSC01。

**12. Built to plug into your stack（m5-light）**：沿用模板，节点文字改为 `Capture → Transcribe → Structure → Integrate`，在描述中补充 “photos and video alongside voice data”。

**13. Available customization（m5-dark）**：沿用模板三列，在 Firmware 列加一条 `Camera & capture button behavior`。

**14. 新增：Compare the family（m5-soft）**：3 列对比卡
- `BoneSonix`（HA-BC01，Black）— Bluetooth · Bone conduction · Voice capture → `../bc01/index.html`
- `BoneSonix White`（HA-BC01 White）— Bluetooth 5.3 · IP66 · One-touch record → `../bc01-white/index.html`
- `BoneSonix Cam`（本页，高亮“You're viewing”）— 1080p camera · Wi-Fi + BT · 8GB

**15. CTA（m5-dark m5-cta）**
- H2：`Give your frontline a point of view.`
- Lead：`Request a BoneSonix Cam sample, schedule a demo, or talk to our engineering team about deployment and customization.`
