# Prompt 01 — 在 Products Overview 页新增 5 个产品卡片

> 使用顺序：先跑本 prompt（它会准备图片资源），再分别跑 02–06 五个详情页 prompt。

---

你在 GMIC.AI 官网项目里工作（根目录：`main/`）。GMIC.AI 是一家专注 B2B 的 AI 硬件公司，产品线以 **Hearit.ai** 品牌对外展示。请在产品总览页 `products/index.html` 新增 5 个产品卡片，并为它们准备好图片资源。**只做增量修改，不要重构或改动现有卡片、样式和脚本。**

## 第 0 步：准备卡片图片（网页用的文件名不能有中文和空格）

把下面的源图复制（不是移动）到 `img/products/overview/`，按右侧名称重命名。如果原图宽度超过 1000px，就等比缩到 1000px 宽，JPG 质量 85：

| 源文件 | 目标文件 |
|---|---|
| `img/products/HA-BC01-White/白底图1.jpg` | `img/products/overview/HA-BC01-White.jpg` |
| `img/products/HA-CS01/主图 1.jpg` | `img/products/overview/HA-CS01.jpg` |
| `img/products/HA-GLS02/主图0.jpg` | `img/products/overview/HA-GLS02.jpg` |
| `img/products/HA-GLS03/主图0.jpg` | `img/products/overview/HA-GLS03.jpg` |
| `img/products/HA-HSC01/主图0.jpg` | `img/products/overview/HA-HSC01.jpg` |

注意：各文件夹里的 `XXX 主图.jpg` 带有 “AICHAT” 水印和 ChatGPT logo，**不要使用**。

## 第 1 步：新增 5 张卡片

完全复制现有 `.po-card` 的 HTML 结构：`po-card-img`（含 badge）→ `po-card-body` → `po-card-sku` / `po-card-name` / `po-card-desc` / `po-card-tags` / `po-card-cta`。CTA 里的两个按钮都要有：
- Read More：`href="<slug>/index.html" class="btn-read-more"`
- Get a Quote：`href="../book-a-meeting/index.html" class="po-btn-contact"`

每张卡片前面加注释 `<!-- N. SKU -->`，然后把所有卡片的注释编号按新顺序从 1 重新编号。

### 插入位置
- **HA-CS01**：放在 Wearable 组最后一张（HA-MIC02）之后
- **HA-BC01 White**：紧跟在现有 HA-BC01 卡片之后
- **HA-HSC01**：放在 Headset 组最后一张（HA-TWS01）之后
- **HA-GLS02、HA-GLS03**：依次紧跟在 HA-GLS01 卡片之后

### 卡片内容

**① HA-CS01**
- id=`cs01`，data-category=`wearable`，badge 用蓝色 `po-card-badge po-card-badge--blue`，文字 `WiFi + BT`
- img：`../img/products/overview/HA-CS01.jpg`，alt `Hearit.ai CardMic`
- sku：`HA-CS01`；name：`Hearit.ai CardMic`
- desc：`4.5 mm card-style AI voice recorder that snaps magnetically to any phone — 32GB local storage, triple-mic pickup with AI noise reduction, and 55+ hours of recording.`
- tags：`WiFi 6 + BT 5.3` · `32GB Storage` · `MagSafe Compatible` · `55h Recording` · `4.5 mm Thin`
- slug：`cs01`

**② HA-BC01 White**
- id=`bc01-white`，data-category=`headset`，badge 用普通 `po-card-badge`，文字 `Bluetooth`
- img：`../img/products/overview/HA-BC01-White.jpg`，alt `Hearit.ai BoneSonix White`
- sku：`HA-BC01 (White)`；name：`Hearit.ai BoneSonix White`
- desc：`Open-ear bone conduction AI headset with one-touch recording, IP66 protection, and a night safety light — built for capturing conversations on the move.`
- tags：`Bluetooth 5.3` · `Bone Conduction` · `One-Touch Record` · `IP66` · `38 g`
- slug：`bc01-white`

**③ HA-HSC01**
- id=`hsc01`，data-category=`headset`，蓝色 badge，文字 `WiFi + BT`
- img：`../img/products/overview/HA-HSC01.jpg`，alt `Hearit.ai BoneSonix Cam`
- sku：`HA-HSC01`；name：`Hearit.ai BoneSonix Cam`
- desc：`Open-ear AI headset with a built-in 1080p first-person camera, 8GB onboard storage, and AI transcription, summaries and translation — just 35 g.`
- tags：`1080p Camera` · `WiFi + BT` · `8GB Storage` · `Open Ear` · `35 g`
- slug：`hsc01`

**④ HA-GLS02**
- id=`gls02`，data-category=`smart`，蓝色 badge，文字 `WiFi + BT`
- img：`../img/products/overview/HA-GLS02.jpg`，alt `Hearit.ai SmartGlass Tint`
- sku：`HA-GLS02`；name：`Hearit.ai SmartGlass Tint`
- desc：`AI smart glasses with 4-level electrochromic lenses, a 1080p first-person camera, and AI meeting notes, summaries and tasks — 40 g.`
- tags：`Electrochromic Lens` · `1080p Camera` · `WiFi + BT` · `8GB Storage` · `40 g`
- slug：`gls02`

**⑤ HA-GLS03**
- id=`gls03`，data-category=`smart`，蓝色 badge，文字 `WiFi + BT`
- img：`../img/products/overview/HA-GLS03.jpg`，alt `Hearit.ai SmartGlass Clear`
- sku：`HA-GLS03`；name：`Hearit.ai SmartGlass Clear`
- desc：`Everyday-style AI smart glasses with a stainless steel browline frame, clear anti-blue-light lenses, 1080p capture, and AI Q&A, notes and translation.`
- tags：`Anti-Blue-Light Lens` · `1080p Camera` · `WiFi + BT` · `8GB Storage` · `43 g`
- slug：`gls03`

## 第 2 步：检查联动

1. 确认筛选 Tab（Wearable / Headsets / Smart Devices）和搜索框能匹配到新卡片（搜索 SKU 和产品名都要能搜到），All 下一共显示 26 张卡片。
2. 打开 `js/products-mega-menu.js`。如果里面有硬编码的产品列表，就按同样格式把 5 个新产品加到对应分类。如果它只放精选的 4 个产品，就不要动。
3. 如果 `seo/` 目录里有 sitemap 或产品清单，把 5 个新 URL 加进去：`products/cs01/`、`products/bc01-white/`、`products/hsc01/`、`products/gls02/`、`products/gls03/`。
4. 在 375px 和 1440px 两个宽度下检查卡片网格，确认新卡片的图片比例、标签换行和其他卡片保持一致。

## 不要做
- 不要改现有 21 张卡片的文字、顺序和链接。
- 不要新增分类 Tab。
- 不要在页面里使用 ChatGPT 的 logo 图片。

完成后列出你改了哪些文件、各自加了几行。
