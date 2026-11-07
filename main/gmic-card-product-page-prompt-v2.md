# Claude Code Prompt: GMIC.AI CS Series Card-Style AI Voice Recorder — 完整产品页 (V2 — 基于实际产品图修正)

把以下 prompt 复制到 Claude Code 中执行：

---

```
请在 desktop/gmic/main 文件夹中创建 GMIC.AI 的 CS 系列卡片式 AI 录音器完整产品页面（card-product.html）。这是面向海外 B2B 客户的英文产品页，需要包含产品介绍、功能特性、展会使用场景、佩戴/携带方式和使用流程。

## 产品背景

GMIC.AI 的 CS 系列是卡片式 AI 录音器（Card-Style AI Voice Recorder），主要型号为 HA-CS04 和 HA-CS05。核心卖点是：超薄卡片式设计（CS04 仅 3mm 厚、30g），在嘈杂的展会、会议等 B2B 场景中，可以磁吸在手机背面、放入口袋或皮套中随身携带，一键录音并通过 AI 转写、摘要、思维导图等功能回顾沟通内容。

**重要说明：** 产品图片已就位，在 img/products/ 目录下。页面应直接使用真实产品图片。

## 实际产品规格（基于产品详情页核实）

### HA-CS04 — Slim（轻薄款）
- 无屏幕设计，纯录音卡片
- 深灰色铝合金机身，正面有竖条纹散热/音腔设计
- 3 个麦克风：2 个全向麦克风 + 1 个骨传导麦克风
- 控制：1 个电源/录音按钮 + 1 个录音模式拨动开关
- 1 个 RGB LED 指示灯
- 连接：Bluetooth 5.3 (BLE) + Wi-Fi (2.4 GHz, 802.11b/g/n)
- 存储：16GB / 32GB / 64GB（可选）
- 电池：3.7V 400mAh，约 25 小时续航（关闭降噪时）
- 充电：磁吸 Pogo-Pin 充电（约 2 小时充满），充电接口同时支持音频导出
- 振动提醒：支持
- 尺寸：85 × 55 × 3.0 mm
- 重量：30g
- 材质：铝合金 + PCBA
- AI 功能（通过配套 App）：AI 转写、音频回放、AI 摘要、思维导图
- 包装内含：HA-CS04 本体、MagSafe 皮套、用户手册、MagSafe 磁吸环、充电线

### HA-CS05 — Pro（专业款）
- 0.96 英寸 LCD 显示屏（80 × 160 分辨率），显示时间、电量、WiFi/蓝牙状态、录音波形
- 银灰色铝合金机身，更现代的双色设计（深色显示区 + 浅灰色机身）
- 5 个麦克风：4 个全向麦克风 + 1 个骨传导麦克风
- 控制：1 个录音/电源按钮
- 连接：Bluetooth 5.3 + Wi-Fi (2.4 GHz, 802.11b/g/n)
- 存储：16GB / 32GB / 64GB（可选）
- 电池：3.7V 500mAh，约 30 小时续航
- 充电：USB Type-C（约 2.5 小时充满）
- 内置磁吸（无需外接磁吸环即可吸附手机）
- 振动提醒：支持
- 显示屏：0.96 英寸 LCD
- 尺寸：91 × 57 × 4.6 mm（最厚处 5.8mm）
- 重量：53g
- 材质：铝合金
- AI 功能（通过配套 App）：语音转文字、AI 摘要、实时翻译、思维导图
- ODM/OEM 支持

## 产品图片路径说明

所有图片相对于 card-product.html 的路径：
- CS04 主图：img/products/ha-cs04/主图.jpg（带品牌标注的展示图）
- CS04 白底图：img/products/ha-cs04/白底图1.jpg, 白底图2.jpg, 白底图3.jpg
- CS04 额外主图：img/products/ha-cs04/主图1.jpg ~ 主图5.jpg
- CS05 主图：img/products/ha-cs05/主图.jpg（带品牌标注的展示图）
- CS05 白底图：img/products/ha-cs05/白底图1.jpg, 白底图2.jpg, 白底图3.jpg
- CS05 额外主图：img/products/ha-cs05/主图1.jpg ~ 主图7.jpg
- 概览图：img/products/overview/HA-CS04.jpg, img/products/overview/HA-CS05.jpg

注意：图片文件名包含中文字符，在 HTML 中引用时需要正确编码或直接使用中文文件名。推荐使用 encodeURI 处理路径或直接用中文。

## 网站结构（单文件 HTML，内联 CSS 和 JS）

### Section 1: Navigation
- 左侧：GMIC.AI logo 文字（加粗，主色 #0A1628）
- 右侧链接：Products | Use Cases | How It Works | Specs | Contact
- 固定顶部，滚动后毛玻璃效果背景
- 右上角 "Request a Demo" 按钮（强调色 #2563EB，白字，圆角）

### Section 2: Hero
- 左右分栏布局（桌面端），移动端上下堆叠
- 左侧文案：
  - 小标签："CS Series — Card-Style AI Voice Recorder"（浅蓝背景药丸标签）
  - 大标题："Capture Every Conversation. Let AI Do the Rest."
  - 副标题："Ultra-slim card recorder with AI transcription — magnetically attaches to your phone, slips into your pocket, and turns every meeting into structured notes."
  - 两个按钮："See It in Action"（实心蓝）和 "View Specifications"（边框蓝）
  - 下方一行小字带图标：🔋 25-30h Battery · 🎙️ Multi-Mic Array · 📋 AI Summaries · 🧲 MagSafe Mount
- 右侧：产品图展示区
  - 使用 CS05 的白底图1（img/products/ha-cs05/白底图1.jpg）作为主展示图
  - 图片有柔和阴影和浅蓝色背景渐变
  - 下方小图切换条：可点击切换 CS04 和 CS05 的白底图

### Section 3: Product Models（产品型号对比）
- 标题："Choose Your Model"
- 副标题："Two configurations to match your workflow"
- 并排两张产品卡片：

**CS04 卡片：**
- 产品图：img/products/ha-cs04/白底图1.jpg
- 名称："HA-CS04 — Slim"
- 定位："Ultra-thin voice capture for professionals on the go"
- 功能列表（用图标 + 文字）：
  - 3.0mm ultra-slim, 30g lightweight
  - 3-mic array (2 omni + 1 bone-conduction)
  - One-touch recording with mode switch
  - ~25 hours battery life
  - Magnetic pogo-pin charging + audio export
  - Bluetooth 5.3 + Wi-Fi connectivity
  - MagSafe-compatible with included ring
- 底部 "Learn More" 链接

**CS05 卡片：**
- 产品图：img/products/ha-cs05/白底图1.jpg
- 名称："HA-CS05 — Pro"
- 标注 "Most Popular" 徽章（右上角）
- 定位："Full-featured recorder with display and 5-mic array"
- 功能列表：
  - Everything in CS04, plus:
  - 0.96" LCD display (time, battery, recording status)
  - 5-mic array (4 omni + 1 bone-conduction)
  - Real-time translation support
  - USB Type-C charging
  - Built-in magnetic attachment
  - ~30 hours battery life
- 底部 "Learn More" 链接

卡片样式：白底，圆角16px，hover浮起，边框1px #E2E8F0，CS05卡片有蓝色顶部边框高亮

### Section 4: Trade Show Scenario（展会场景 — 核心场景页面）

- 区域标题："Built for the Busiest Trade Show Floors"
- 副标题："From booth to booth, your AI voice recorder captures every conversation so you can focus on building relationships."

**场景故事流（左右交替图文排列，共4个场景块）：**

**场景1：Carry & Go（随身携带）**
- 左侧：使用图片 img/products/ha-cs04/主图1.jpg 或合适的主图（显示产品小巧尺寸）
- 右侧文案：
  - 小标题："Smaller Than a Business Card, Lighter Than Your Keys"
  - 正文："At just 85×55mm and 3mm thin, the CS04 slips into your shirt pocket or magnetically attaches to the back of your phone with MagSafe. The CS05 adds a live LCD display in a still-compact 91×57mm body. Either way, it's the most unobtrusive recording device at the show."
  - 小提示标签："🧲 Magnetically mounts to any MagSafe-compatible phone"

**场景2：Meet & Record（会面录音）**
- 右侧：使用场景图占位区 "[Illustration: Two people talking at a booth, badge visible, recording indicator lit]"（或使用 ha-cs04 的主图2 如果有佩戴场景图）
- 左侧文案：
  - 小标题："One Press to Capture Every Detail"
  - 正文："Walking up to a new supplier? Press the button once to start recording. The multi-microphone array — with bone-conduction technology — cuts through the crowd to capture clear, intelligible audio even on the loudest trade show floors. A gentle vibration confirms you're recording."
  - 小提示标签："🎙️ 3-5 mic array with bone-conduction for 80+ dB environments"

**场景3：Review & Organize（会后回顾）**
- 左侧：使用场景图占位区 "[Illustration: Person reviewing AI-generated meeting notes on phone app, with conversation transcript visible]"
- 右侧文案：
  - 小标题："AI Turns Conversations into Action Items"
  - 正文："Back at your hotel or office, open the companion app. AI automatically transcribes each conversation, generates structured summaries with key points, creates mind maps of discussion topics, and organizes action items — so nothing falls through the cracks. The CS05 even supports real-time translation across languages."
  - 小提示标签："📋 Conversations → Transcripts → Summaries → Mind Maps → To-Dos"

**场景4：Follow Up（跟进）**
- 右侧：使用场景图占位区 "[Illustration: Email being composed with AI-suggested follow-up content]"
- 左侧文案：
  - 小标题："Follow Up While the Context Is Fresh"
  - 正文："Each AI summary includes the discussion context and key talking points. Draft precise follow-up emails, update your CRM, and share structured notes with your team — all grounded in what was actually said, not what you half-remember three days later."
  - 小提示标签："✅ From conversation to closed deal, faster"

每个场景块之间有一条连接线/箭头，暗示流程。

### Section 5: How to Carry（携带方式说明）
产品的携带方式与传统工牌不同，是卡片式设计。

- 标题："Designed to Disappear Into Your Workflow"
- 三列卡片展示携带方式：

1. **MagSafe Phone Mount（磁吸手机挂载）**
   - 使用 CS05 的详情图（显示产品磁吸在手机背面的图）
   - "Magnetically attach it to the back of your phone — works with any MagSafe-compatible case. The CS04 includes a magnetic ring for universal compatibility; the CS05 has magnets built in."

2. **Pocket Carry（口袋携带）**
   - 使用相关的场景图（如 CS05 详情中的口袋佩戴图）
   - "At just 3-4.6mm thin and 30-53g, it slips into any shirt pocket, jacket pocket, or badge holder without adding bulk. Forget it's there until you need it."

3. **Leather Case（皮套挂载）**
   - 使用包装内容图作为参考
   - "The included MagSafe leather case lets you wear the recorder like a card — hang it from a lanyard, clip it to your badge holder, or just keep it in the case for protection."

每张卡片有对应的实物图。

### Section 6: Key Features Grid（功能亮点网格）
- 标题："Everything You Need, Nothing You Don't"
- 2×3 网格卡片：

1. 🎙️ **Multi-Mic Array with Bone Conduction** — "CS04 packs 3 microphones (2 omni + 1 bone-conduction); CS05 has 5 (4 omni + 1 bone-conduction). Bone-conduction captures your voice even in noisy crowds."
2. 🔋 **All-Day+ Battery** — "25 hours on the CS04, 30 hours on the CS05 — enough for multi-day trade shows on a single charge. Quick recharge via magnetic pogo-pin (CS04) or USB-C (CS05)."
3. 🤖 **AI-Powered Intelligence** — "Automatic transcription, AI summaries, mind map generation, and structured action items. CS05 adds real-time translation across 20+ languages."
4. 📱 **0.96" LCD Display (CS05)** — "Live status at a glance — time, battery level, Wi-Fi and Bluetooth status, and recording waveform — all on an 80×160 LCD."
5. 🧲 **MagSafe Magnetic Mount** — "Snap it to any MagSafe phone case. CS04 includes a magnetic ring for universal phones; CS05 has built-in magnets. Also attachable to compatible magnetic accessories."
6. 🔒 **Enterprise-Ready** — "Bluetooth 5.3 + Wi-Fi for flexible data transfer. Configurable data workflows, customer-controlled integration, and flexible deployment options for enterprise needs."

每张卡片：浅色背景，左侧大图标，右侧标题+描述，hover 时左边框变蓝色

### Section 7: Specifications（技术规格表）
用一个干净的表格或两列对比：

| Spec | HA-CS04 Slim | HA-CS05 Pro |
|------|-------------|-------------|
| Display | None | 0.96" LCD (80×160) |
| Microphones | 2 Omni + 1 Bone-Conduction | 4 Omni + 1 Bone-Conduction |
| Battery | 400mAh (~25h) | 500mAh (~30h) |
| Storage | 16 / 32 / 64 GB | 16 / 32 / 64 GB |
| Connectivity | BLE 5.3 + Wi-Fi | BLE 5.3 + Wi-Fi |
| Charging | Magnetic Pogo-Pin | USB Type-C |
| AI Features | Transcription, Summary, Mind Map | + Real-time Translation |
| Magnetic Mount | MagSafe Ring (included) | Built-in Magnets |
| Weight | 30g | 53g |
| Dimensions | 85 × 55 × 3.0 mm | 91 × 57 × 4.6 mm |
| Material | Aluminum Alloy | Aluminum Alloy |
| Vibration | Supported | Supported |
| Controls | 1 Button + 1 Toggle Switch | 1 Button |

底部小字：
- "Specifications are based on current product data and may be updated. Some AI features are delivered through companion software and require the hearit.ai app."
- "ODM/OEM customization available — hardware configuration, firmware, AI workflows, branding, and packaging can be tailored to your project requirements."

### Section 8: Customization & Cooperation（ODM/OEM 合作）
这是 B2B 页面的重要部分，产品详情页明确标注了 ODM/OEM。

- 标题："Flexible Customization from Concept to Production"
- 副标题："Discuss hardware, firmware, AI workflows, data output, branding, and packaging based on your project requirements."
- 四个自定义领域卡片：
  1. **Hardware Configuration** — Appearance design, material options, component configuration
  2. **Firmware & Interaction** — Button functions, interaction logic, feature customization
  3. **AI & Data Workflow** — Data processing, output formats, system integration
  4. **Branding & Product Design** — Logo, packaging, product appearance

- 合作流程（5步流程条）：
  01 Requirement Review → 02 Solution Design → 03 Prototype Validation → 04 Pilot Production → 05 Mass Production

### Section 9: CTA / Contact
- 深色背景（#0A1628）
- 大标题："See the CS Recorder at Your Next Event"
- 副标题："Request a demo unit or schedule a factory visit to see our card-style AI voice recorder in action."
- 两个按钮："Request a Demo"（白底蓝字）和 "Contact Sales"（蓝边框白字）
- 下方：联系邮箱 info@gmic.ai

### Section 10: Footer
- GMIC.AI 品牌
- 链接列：Products | Company | Support | Legal
- 版权 © 2024 GMIC.AI. All rights reserved.
- 底部小字："GMIC.AI is a Shenzhen-based AI hardware company specializing in B2B voice capture and AI communication devices."

## 设计规范

### 色彩系统
- 主色/深底：#0A1628（Dark Navy）
- 强调色：#2563EB（Tech Blue）— 按钮、链接、高亮
- 成功色：#10B981（Green）— 特性标签
- 警告色：#F59E0B（Amber）— "Most Popular" 徽章
- 背景色：#F8FAFC（Light Gray）— 页面大背景
- 卡片白：#FFFFFF
- 主文字：#1E293B
- 次文字：#64748B
- 边框：#E2E8F0

### 字体
- 系统字体栈：-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- Hero 标题：48px/56px 加粗
- Section 标题：36px/44px 加粗
- 卡片标题：20px/28px 600 weight
- 正文：16px/24px regular
- 小字/标签：14px/20px

### 卡片与组件
- 所有卡片圆角 16px
- 默认阴影：0 1px 3px rgba(0,0,0,0.08)
- hover 阴影：0 12px 32px rgba(0,0,0,0.12), 并 translateY(-4px)
- 过渡动画：all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- 按钮圆角 8px，padding 12px 24px
- 对于仍需要占位的场景图（如展会对话场景、APP界面截图等无实物照片的场景），使用占位区：浅蓝渐变背景 linear-gradient(135deg, #EBF5FF, #DBEAFE)，深色文字居中，圆角12px，虚线边框 2px dashed #93C5FD

### 产品图使用策略
- Hero 区：CS05 白底图作为主图展示
- 产品对比卡片：分别使用各自的白底图1
- 携带方式：使用主图系列中展示手持、口袋佩戴的图（如有）
- 规格区：使用白底图作为产品展示
- 所有产品图使用 object-fit: contain（白底产品图不应裁切）
- 场景类占位图保留文字说明，后续替换为实拍场景图

### 场景流布局
- 左右交替排列（odd: 图左文右, even: 文左图右）
- 图片区宽度约 45%，文案区 50%，中间 5% 间距
- 场景之间有竖线+圆点连接（类似 timeline）
- 移动端改为上下堆叠

### 响应式
- Desktop (>1024px)：正常布局
- Tablet (768-1024px)：产品卡片改为上下堆叠，场景图文仍左右但缩小
- Mobile (<768px)：全部单列，图片 100% 宽度

### 动画
- 滚动 fade-in-up（IntersectionObserver）
- 场景连接线随滚动逐段点亮
- Hero 区域文字渐入动画（stagger delay）
- 按钮 hover 微动效
- 平滑滚动到锚点

### 代码要求
- 单文件 card-product.html，所有 CSS 和 JS 内联
- 不使用任何框架或外部依赖
- 代码清晰、有注释，每个 section 有明确的注释分隔
- 语义化 HTML（section, article, nav, footer）
- 确保 W3C 标准兼容
- 所有交互用 vanilla JS
- 页面加载性能优先
- 图片使用 loading="lazy"
```

---

**V2 更新说明（基于实际产品图片修正）：**

以下是与 V1 prompt 相比的主要修正：

1. **CS04 无屏幕**：原 prompt 写的是 E-Paper 显示屏，实际 CS04 没有任何显示屏，是纯录音卡片
2. **CS05 是 LCD 屏**：原 prompt 写的是 E-Paper，实际是 0.96 英寸 LCD 显示屏（80×160）
3. **麦克风数量大幅修正**：
   - CS04：原写 "Single MEMS"，实际是 3 个（2 全向 + 1 骨传导）
   - CS05：原写 "Dual MEMS + ANC"，实际是 5 个（4 全向 + 1 骨传导）
4. **续航大幅提升**：CS04 从 12h → 25h，CS05 从 14h → 30h
5. **尺寸/重量修正**：
   - CS04：85×55×3.0mm, 30g（原 86×54×8mm, 38g）
   - CS05：91×57×4.6mm, 53g（原 86×54×9mm, 42g）
6. **充电方式**：CS04 是磁吸 Pogo-Pin，CS05 是 USB-C（原 prompt 都写的 USB-C）
7. **连接方式**：两者都有 Bluetooth 5.3 + Wi-Fi（原 prompt 写 CS04 只有 USB-C）
8. **携带方式**：产品是卡片式设计，主要是磁吸手机、口袋携带、皮套携带——不是传统工牌/挂绳佩戴
9. **AI 功能细化**：CS05 比 CS04 多了实时翻译功能
10. **新增 ODM/OEM 合作板块**：产品详情页明确标注了 ODM/OEM，这对 B2B 页面很重要
11. **使用真实产品图片**：白底图、主图均有实际路径可引用
12. **品牌说明**：产品本身标注 hearit.ai 品牌，但网页以 GMIC.AI 品牌呈现
