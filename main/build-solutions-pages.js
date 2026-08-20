/* ============================================================
   build-solutions-pages.js
   Generates the 6 shared-template Solutions pages under /solutions/.
   Reuses the proven industries-page shell (head <style>, nav, footer,
   FAB, self-contained reveal/FAB scripts) extracted verbatim from
   industries/field-service/index.html, then renders the shared
   6-section Solutions layout from per-page data.
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const REF = fs.readFileSync(path.join(ROOT, 'industries/field-service/index.html'), 'utf8');

// ---- Extract shared chunks verbatim from the reference page ----
const STYLE = REF.slice(REF.indexOf('<style>'), REF.indexOf('</style>') + '</style>'.length);
// nav + mobile-nav + mobile-nav-overlay (ends right before the main.js sentinel comment)
const NAV = REF.slice(REF.indexOf('<nav class="nav" id="nav">'), REF.indexOf('<!-- Sentinel')).trimEnd();
// footer + FAB + popups + all bottom scripts (up to </body>)
let TAIL = REF.slice(REF.indexOf('<footer class="footer"'), REF.indexOf('</body>')).trimEnd();

// Wire the footer "Solutions" column to the real routes (relative to /solutions/<slug>/)
const FOOTER_SOL_OLD = `      <div class="footer-col">
        <h4>Solutions</h4>
        <ul>
          <li><a href="../../index.html#capabilities">Edge AI Hardware</a></li>
          <li><a href="../../index.html#capabilities">Voice AI Hardware</a></li>
          <li><a href="../../index.html#capabilities">AI Wearable Devices</a></li>
          <li><a href="../../index.html#capabilities">AI Hardware ODM</a></li>
          <li><a href="../../index.html#capabilities">Embedded AI Hardware</a></li>
        </ul>
      </div>`;
const FOOTER_SOL_NEW = `      <div class="footer-col">
        <h4>Solutions</h4>
        <ul>
          <li><a href="../voice-ai-hardware/index.html">Voice AI Hardware</a></li>
          <li><a href="../ai-scribe-hardware/index.html">AI Scribe Hardware</a></li>
          <li><a href="../ai-wearable-devices/index.html">AI Wearable Devices</a></li>
          <li><a href="../edge-ai-hardware/index.html">Edge AI Hardware</a></li>
          <li><a href="../embedded-ai-hardware/index.html">Embedded AI Hardware</a></li>
          <li><a href="../field-service-voice-capture/index.html">Field Service Voice Capture</a></li>
          <li><a href="../../custom-devices/odm-oem/index.html">AI Hardware ODM/OEM</a></li>
        </ul>
      </div>`;
if (!TAIL.includes(FOOTER_SOL_OLD)) throw new Error('Footer Solutions block not found — reference markup changed.');
TAIL = TAIL.replace(FOOTER_SOL_OLD, FOOTER_SOL_NEW);

if (!STYLE || !NAV || !TAIL) throw new Error('Failed to extract shared chunks from reference page.');

const CAL = '../../book-a-meeting/index.html';
const ODM = '../../custom-devices/odm-oem/index.html';
const PRODUCTS = '../../products/index.html';
const CONTACT = '../../contact/index.html';

// Supplemental CSS (small additions on top of the reused ind-* toolkit)
const SUPPLEMENT = `<style>
/* ---- Solutions-page supplements (extends the shared ind-* toolkit) ---- */
.ind-hero-trust{margin:18px 0 0;font-size:.8rem;line-height:1.5;color:rgba(255,255,255,.5);display:flex;flex-wrap:wrap;gap:6px 12px;align-items:center}
.ind-hero-trust .dot{width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,.35)}
.sol-link{color:#2563eb;font-weight:600;border-bottom:1px solid transparent;transition:border-color .2s ease}
.sol-link:hover{border-color:#2563eb}
.ind-sec--dark .sol-link{color:#93c5fd}
.ind-sec--dark .sol-link:hover{border-color:#93c5fd}
/* numbered workflow flow */
.sol-flow{display:grid;grid-template-columns:repeat(5,1fr);gap:16px}
.sol-flow-step{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:12px;padding:24px 20px;display:flex;flex-direction:column;gap:12px}
.sol-flow-num{width:32px;height:32px;border-radius:50%;background:#2563eb;color:#fff;font-weight:700;font-size:.9rem;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sol-flow-step h3{font-size:.95rem;font-weight:600;color:#0f172a;margin:0;line-height:1.4}
@media(max-width:900px){.sol-flow{grid-template-columns:1fr}}
.final-cta-actions{display:flex;flex-wrap:wrap;gap:14px;justify-content:center;margin-top:6px}
</style>`;

// ---------- render helpers ----------
const esc = s => s;
const card = c => `        <div class="ind-card">
          <div class="ind-card-ic"><i data-lucide="${c.icon}"></i></div>
          <h3>${c.title}</h3>${c.desc ? `\n          <p>${c.desc}</p>` : ''}
        </div>`;

function renderPage(p) {
  const useCases = p.useCases.map(card).join('\n');
  const formFactors = p.formFactors.map(card).join('\n');
  const gridCls = n => (n % 4 === 0 ? 'grid-4' : 'grid-3');

  const workflow = p.workflow ? `
  <!-- ========== WORKFLOW SCENARIO ========== -->
  <section class="ind-sec ind-sec--soft fade-section">
    <div class="container">
      <div class="ind-head reveal">
        <div class="eyebrow">/ ${p.workflow.eyebrow}</div>
        <h2 class="section measure-wide">${p.workflow.title}</h2>
      </div>
      <div class="sol-flow reveal">
${p.workflow.steps.map((s, i) => `        <div class="sol-flow-step"><span class="sol-flow-num">${i + 1}</span><h3>${s}</h3></div>`).join('\n')}
      </div>
    </div>
  </section>` : '';

  const related = p.related.map(r => `        <a class="rel-link" href="${r.href}">${r.label}</a>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${p.seoTitle}</title>
<meta name="description" content="${p.seoDesc}" />
<link rel="canonical" href="https://gmic.ai/solutions/${p.slug}/" />
<link rel="icon" type="image/png" href="../../img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<link rel="stylesheet" href="../../css/style.css">
<link rel="stylesheet" href="../../css/grid.css">
${STYLE}
${SUPPLEMENT}
</head>
<body>
${NAV}

<!-- Sentinel for ../../js/main.js (reads .hero offsetHeight); hidden, harmless. -->
<div class="hero" aria-hidden="true" style="display:none"></div>

<main id="main">

  <!-- ========== 1) HERO ========== -->
  <header class="ind-hero fade-section">
    <div class="container">
      <div class="ind-hero-top reveal">
        <div class="ind-hero-lead">
          <div class="eyebrow dark">/ SOLUTIONS — ${p.label}</div>
          <h1 class="display">${p.h1}</h1>
        </div>
        <div class="ind-hero-aside">
          <p class="lede">${p.subtitle}</p>
          <div class="ind-hero-cta">
            <a href="${CAL}" target="_blank" rel="noopener" class="btn btn-blue">${p.cta}</a>
            <a href="${PRODUCTS}" class="btn btn-ghost">Explore Hardware Platforms</a>
          </div>
          <p class="ind-hero-trust">${p.trust.map(t => `<span>${t}</span>`).join('<span class="dot" aria-hidden="true"></span>')}</p>
        </div>
      </div>
      <div class="ind-hero-banner reveal">
        <img src="${p.heroImg}" alt="${p.heroAlt}" onerror="this.onerror=null;this.src='https://placehold.co/1200x560?text=GMIC+AI+Hardware'">
      </div>
    </div>
  </header>

  <!-- ========== 2) CORE CONTENT ========== -->
  <section class="ind-sec ind-sec--light fade-section">
    <div class="container">
      <div class="ind-head reveal">
        <div class="eyebrow">/ OVERVIEW</div>
        <h2 class="section measure-wide">${p.coreTitle}</h2>
      </div>
      <div class="intro-grid reveal">
        <p class="intro-lead">${p.coreLead}</p>
        <div class="intro-body">
${p.coreBody.map(b => `          <p>${b}</p>`).join('\n')}
        </div>
      </div>
    </div>
  </section>

  <!-- ========== 3) USE CASES / SCENARIOS ========== -->
  <section class="ind-sec ind-sec--dark fade-section">
    <div class="container">
      <div class="ind-head reveal">
        <div class="eyebrow dark">/ ${p.useCasesEyebrow}</div>
        <h2 class="section measure-wide">${p.useCasesTitle}</h2>
      </div>
      <div class="ind-grid ${gridCls(p.useCases.length)} uc-static reveal">
${useCases}
      </div>
    </div>
  </section>
${workflow}
  <!-- ========== 4) HARDWARE FORM FACTORS ========== -->
  <section class="ind-sec ind-sec--light fade-section">
    <div class="container">
      <div class="ind-head reveal">
        <div class="eyebrow">/ ${p.formEyebrow}</div>
        <h2 class="section measure-wide">${p.formTitle}</h2>
        <p class="measure" style="margin-top:14px;color:#64748b;font-size:1.0625rem;line-height:1.7;">${p.formLead}</p>
      </div>
      <div class="ind-grid ${gridCls(p.formFactors.length)} reveal">
${formFactors}
      </div>
    </div>
  </section>

  <!-- ========== 5) WHY DEDICATED HARDWARE ========== -->
  <section class="ind-sec ind-sec--dark fade-section">
    <div class="container">
      <div class="why-hw-grid">
        <div class="reveal">
          <div class="eyebrow dark">/ WHY HARDWARE</div>
          <h2 class="section measure-wide">${p.whyTitle}</h2>
          <p class="why-hw-lead measure">${p.whyLead}</p>
          <ul class="check-list">
${p.whyList.map(w => `            <li><span class="ck"><i data-lucide="check"></i></span> ${w}</li>`).join('\n')}
          </ul>
        </div>
        <div class="why-hw-media reveal">
          <img src="${p.whyImg}" alt="${p.whyAlt}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/800x600?text=GMIC+Manufacturing'">
        </div>
      </div>
    </div>
  </section>

  <!-- ========== RELATED / CROSS-LINKS ========== -->
  <section class="ind-sec ind-sec--light fade-section" style="padding:56px 0;">
    <div class="container">
      <div class="reveal" style="display:flex;flex-wrap:wrap;align-items:center;gap:18px;justify-content:space-between;">
        <div class="eyebrow">/ RELATED SOLUTIONS</div>
        <div class="rel-row">
${related}
        </div>
      </div>
    </div>
  </section>

  <!-- ========== 6) FINAL CTA ========== -->
  <section class="final-cta fade-section">
    <div class="container">
      <div class="eyebrow reveal">Begin</div>
      <h2 class="section reveal">${p.finalTitle}</h2>
      <p class="reveal measure" style="margin-left:auto;margin-right:auto;">${p.finalDesc}</p>
      <div class="final-cta-actions reveal">
        <a href="${CAL}" target="_blank" rel="noopener" class="btn btn-blue-deep">${p.cta}</a>
        <a href="${CONTACT}" class="btn btn-ghost">Contact Us</a>
      </div>
    </div>
  </section>

</main>
${TAIL}
</body>
</html>
`;
}

// ---------- per-page content ----------
const TRUST = ['From prototype to mass production', 'US + Shenzhen', 'FCC · CE · RoHS'];

// related-link helpers
const REL_ODM = { href: ODM, label: 'AI hardware ODM/OEM services' };
const REL_PRODUCTS = { href: PRODUCTS, label: 'Customizable hardware platforms' };
const rel = (slug, label) => ({ href: `../${slug}/index.html`, label });

const PAGES = [
  {
    slug: 'voice-ai-hardware',
    label: 'VOICE AI HARDWARE',
    seoTitle: 'Voice AI Hardware for Real-World Voice Agents | GMIC AI',
    seoDesc: 'GMIC AI builds custom voice AI hardware for voice agent companies, including earbuds, lapel mics, smart badges, smart glasses, field recorders, and wearable microphones. From prototype to mass production.',
    h1: 'Voice AI Hardware for Real-World Voice Agents',
    subtitle: 'We build the hardware layer that helps voice AI companies capture high-quality real-world audio.',
    cta: 'Start a Voice AI Hardware Project',
    trust: TRUST,
    heroImg: '../../img/about/assembly-line.jpg',
    heroAlt: 'GMIC voice AI hardware assembly line in Shenzhen',
    coreTitle: 'The capture layer for voice AI',
    coreLead: 'Great voice AI starts with great audio. If your models never hear clean speech, no amount of software can fix it.',
    coreBody: [
      'GMIC designs and manufactures dedicated voice capture devices for companies building voice agents, speech-to-text, and voice automation software. Instead of relying on whatever microphone a phone or laptop happens to have, you ship a device tuned for your use case.',
      `We handle real-world voice data capture, low-latency voice input, and multi-mic noise reduction, and deliver an always-ready voice device your users can simply speak to. Firmware, SDK, app, and cloud integration are coordinated as part of our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a>.`,
      `Start from one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a> to reach a pilot quickly, then take the same design from prototype to mass production.`,
    ],
    useCasesEyebrow: 'USE CASES',
    useCasesTitle: 'Where voice AI hardware fits',
    useCases: [
      { icon: 'bot', title: 'Voice agents', desc: 'Always-ready hardware for real-time conversational AI in the field or at the desk.' },
      { icon: 'file-audio', title: 'Speech-to-text', desc: 'Clean, close-mic audio that lifts transcription accuracy in noisy environments.' },
      { icon: 'workflow', title: 'Voice automation', desc: 'Hands-free capture that feeds structured data into downstream AI workflows.' },
      { icon: 'database', title: 'Real-world voice data', desc: 'Purpose-built devices to collect training and evaluation audio at scale.' },
      { icon: 'zap', title: 'Low-latency input', desc: 'On-device buttons and wake behavior for instant, reliable voice input.' },
      { icon: 'waves', title: 'Multi-mic noise reduction', desc: 'Beamforming and DSP tuning that isolate the speaker from background noise.' },
    ],
    formEyebrow: 'HARDWARE WE BUILD',
    formTitle: 'Voice AI hardware form factors',
    formLead: 'Pick the form factor that matches how your users work — we customize and manufacture each one.',
    formFactors: [
      { icon: 'ear', title: 'Earbuds' },
      { icon: 'mic', title: 'Lapel mic' },
      { icon: 'badge', title: 'Smart badge' },
      { icon: 'glasses', title: 'Smart glasses' },
      { icon: 'audio-lines', title: 'Field recorder' },
      { icon: 'mic-vocal', title: 'Wearable microphone' },
    ],
    whyTitle: 'Why dedicated voice hardware?',
    whyLead: 'Many voice AI companies start on phones and laptops. As usage scales, inconsistent microphones and app friction cap accuracy and adoption.',
    whyList: [
      'Consistent, tuned audio on every device',
      'Higher transcription and intent accuracy',
      'Always-ready capture — no app to open',
      'Better adoption in real-world settings',
      'A branded product your customers own',
    ],
    whyImg: '../../img/about/smt-hanwha.jpg',
    whyAlt: 'GMIC SMT line producing voice AI hardware',
    related: [rel('ai-scribe-hardware', 'AI Scribe Hardware'), rel('ai-wearable-devices', 'AI Wearable Devices'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your Voice AI Hardware With GMIC AI',
    finalDesc: 'From concept validation to mass production, GMIC helps voice AI companies launch branded capture hardware without building an internal hardware team.',
  },

  {
    slug: 'ai-scribe-hardware',
    label: 'AI SCRIBE HARDWARE',
    seoTitle: 'AI Scribe Hardware for Clinical Voice Capture | GMIC AI',
    seoDesc: 'GMIC AI builds dedicated AI scribe hardware for healthcare, dental, veterinary, and clinical documentation. Wearable voice capture devices for ambient scribing and AI documentation workflows.',
    h1: 'AI Scribe Hardware for Clinical Voice Capture',
    subtitle: 'For AI scribe companies, the challenge is not only transcription accuracy. It is capturing clear, reliable voice data in real clinical environments.',
    cta: 'Build AI Scribe Hardware',
    trust: TRUST,
    heroImg: '../../img/about/qc-inspection.jpg',
    heroAlt: 'GMIC quality inspection of clinical AI scribe hardware',
    coreTitle: 'Reliable capture for ambient clinical documentation',
    coreLead: 'The hardest part of ambient scribing is not the model — it is capturing a clean doctor–patient conversation in a busy room.',
    coreBody: [
      'GMIC builds dedicated AI scribe hardware for medical, dental, veterinary, and clinical documentation companies. A purpose-built wearable mic for AI scribe workflows captures doctor–patient conversation cleanly, so your documentation model works from the best possible audio.',
      `We design for real clinical constraints: privacy with secure upload and offline storage, long battery life across a full shift, and one-tap recording clinicians will actually use. Device firmware and integration are delivered through our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a>.`,
      `Begin with one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a>, validate in real clinics, and scale to production with consistent, deployable hardware.`,
    ],
    useCasesEyebrow: 'CLINICAL SCENARIOS',
    useCasesTitle: 'Built for real clinical environments',
    useCases: [
      { icon: 'stethoscope', title: 'Clinic room', desc: 'Clear capture of the exam-room conversation for ambient documentation.' },
      { icon: 'hospital', title: 'Hospital', desc: 'Wearable capture that moves with clinicians across wards and rounds.' },
      { icon: 'smile', title: 'Dental office', desc: 'Hands-free notes while gloved and working chairside.' },
      { icon: 'paw-print', title: 'Veterinary exam room', desc: 'Capture procedure notes and owner conversations without typing.' },
      { icon: 'video', title: 'Telehealth', desc: 'Consistent audio for remote and hybrid consultations.' },
      { icon: 'home', title: 'Home care', desc: 'Portable, offline-capable recording for visits without reliable network.' },
    ],
    formEyebrow: 'HARDWARE WE BUILD',
    formTitle: 'AI scribe hardware form factors',
    formLead: 'Comfortable, discreet, clinician-friendly devices designed around your documentation workflow.',
    formFactors: [
      { icon: 'mic', title: 'Wearable clinical mic' },
      { icon: 'badge', title: 'Clip-on badge recorder' },
      { icon: 'circle-dot', title: 'One-tap voice recorder' },
      { icon: 'audio-lines', title: 'Desk / ambient mic' },
    ],
    whyTitle: 'Why dedicated scribe hardware?',
    whyLead: 'Phone-based scribing struggles with room noise, battery, privacy, and adoption. Dedicated hardware removes that friction at the point of care.',
    whyList: [
      'Cleaner doctor–patient audio in real rooms',
      'Privacy-first: secure upload and offline storage',
      'All-shift battery life',
      'One-tap recording clinicians adopt',
      'Consistent capture across every site',
    ],
    whyImg: '../../img/about/aoi-inspection.jpg',
    whyAlt: 'GMIC automated optical inspection of scribe hardware',
    related: [rel('voice-ai-hardware', 'Voice AI Hardware'), rel('field-service-voice-capture', 'Field Service Voice Capture Hardware'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your AI Scribe Hardware With GMIC AI',
    finalDesc: 'Whether you are building a clinical documentation, dental, or veterinary scribe platform, GMIC takes your capture device from concept to deployment.',
  },

  {
    slug: 'ai-wearable-devices',
    label: 'AI WEARABLE DEVICES',
    seoTitle: 'AI Wearable Devices Built for Voice, Data, and Real-World AI Workflows | GMIC AI',
    seoDesc: 'GMIC AI develops custom AI wearable hardware including AI earbuds, AI glasses, AI badges, AI pendants, and body-worn AI devices. ODM/OEM development from prototype to mass production.',
    h1: 'AI Wearable Devices Built for Voice, Data, and Real-World AI Workflows',
    subtitle: 'GMIC AI can develop various AI wearable hardware for startups and enterprises entering the wearable AI market.',
    cta: 'Design Your AI Wearable',
    trust: TRUST,
    heroImg: '../../img/about/assembly-workers.jpg',
    heroAlt: 'GMIC engineers assembling AI wearable devices',
    coreTitle: 'From concept to wearable AI product',
    coreLead: 'A great AI wearable is where industrial design, comfort, battery, and audio all have to work at once.',
    coreBody: [
      'GMIC develops the full range of AI wearable product forms — for teams shipping their first device and for enterprises expanding a wearable AI line. We own wearable form factor and industrial design, comfort, battery, audio capture, connectivity, and sensor integration.',
      `White-label customization lets you launch a branded device fast, backed by our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a> for firmware, tooling, certification, and manufacturing.`,
      `Start from one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a> to compress your timeline from prototype to mass production.`,
    ],
    useCasesEyebrow: 'WHAT MATTERS',
    useCasesTitle: 'The wearable AI design challenge',
    useCases: [
      { icon: 'ruler', title: 'Industrial design', desc: 'Distinctive, manufacturable enclosures that fit your brand and use case.' },
      { icon: 'heart', title: 'Comfort & fit', desc: 'All-day wearability across ears, lapels, wrists, and body-worn forms.' },
      { icon: 'battery-charging', title: 'Battery', desc: 'Power budgets tuned for real usage, charging, and duty cycles.' },
      { icon: 'mic', title: 'Audio capture', desc: 'Microphone placement and DSP tuning for clean voice on the move.' },
      { icon: 'bluetooth', title: 'Connectivity', desc: 'BLE, Wi-Fi, and pairing behavior designed around your app and cloud.' },
      { icon: 'activity', title: 'Sensors', desc: 'Motion, touch, and environmental sensors for richer AI context.' },
    ],
    formEyebrow: 'HARDWARE WE BUILD',
    formTitle: 'AI wearable form factors',
    formLead: 'Choose a form factor — we customize the design, electronics, and production for your product.',
    formFactors: [
      { icon: 'ear', title: 'AI earbuds' },
      { icon: 'glasses', title: 'AI glasses' },
      { icon: 'badge', title: 'AI badge' },
      { icon: 'mic', title: 'AI lapel mic' },
      { icon: 'gem', title: 'AI pendant' },
      { icon: 'watch', title: 'AI wrist / body-worn' },
    ],
    whyTitle: 'Why partner on wearable hardware?',
    whyLead: 'Wearables are unforgiving: mechanics, thermals, radios, and audio all interact. A hardware partner de-risks the path to a shippable product.',
    whyList: [
      'One team across ID, electronics, and firmware',
      'Comfort and reliability proven before scale',
      'White-label branding and packaging',
      'Certification and manufacturing handled',
      'From 2,000-unit pilots to volume production',
    ],
    whyImg: '../../img/about/assembly-line.jpg',
    whyAlt: 'GMIC wearable device assembly line',
    related: [rel('voice-ai-hardware', 'Voice AI Hardware'), rel('edge-ai-hardware', 'Edge AI Hardware'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your AI Wearable With GMIC AI',
    finalDesc: 'Bring your wearable AI concept to GMIC and we will take it from industrial design through firmware, manufacturing, and global shipping.',
  },

  {
    slug: 'edge-ai-hardware',
    label: 'EDGE AI HARDWARE',
    seoTitle: 'Edge AI Hardware for Real-World AI Deployment | GMIC AI',
    seoDesc: 'GMIC AI builds edge AI hardware for on-device processing, local audio processing, edge voice capture, and AI-ready hardware platforms. Lower latency, better privacy, reduced cloud dependency.',
    h1: 'Edge AI Hardware for Real-World AI Deployment',
    subtitle: 'For AI companies that need hardware to process, capture, and transmit AI data at the edge — with lower latency, better privacy, and reduced cloud dependency.',
    cta: 'Build Edge AI Hardware',
    trust: TRUST,
    heroImg: '../../img/about/aoi-inspection.jpg',
    heroAlt: 'GMIC testing and inspection of edge AI hardware',
    coreTitle: 'Move intelligence to the edge',
    coreLead: 'When data has to be processed where it is created, the cloud is not enough — you need capable hardware in the field.',
    coreBody: [
      'GMIC builds edge AI hardware that handles on-device processing and local audio processing, with edge voice capture as the natural entry point. Devices run in offline and low-connectivity environments and sync through a clean device-to-cloud workflow when a network is available.',
      `We architect the sensor, MCU / SoC, and connectivity stack into AI-ready hardware platforms, delivered through our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a>. Edge can span voice, sensor, camera, wearable, and industrial devices — we recommend starting with edge voice hardware.`,
      `Begin from one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a> and scale from field pilot to mass production.`,
    ],
    useCasesEyebrow: 'WHY EDGE MATTERS',
    useCasesTitle: 'What edge processing unlocks',
    useCases: [
      { icon: 'zap', title: 'Lower latency', desc: 'Real-time response without a cloud round-trip.' },
      { icon: 'lock', title: 'Better privacy', desc: 'Sensitive audio and data processed on the device.' },
      { icon: 'cloud-off', title: 'Reduced cloud dependency', desc: 'Keep working when connectivity is limited or costly.' },
      { icon: 'hard-drive', title: 'Local storage', desc: 'Buffer and store on-device, then sync when ready.' },
      { icon: 'gauge', title: 'Real-time response', desc: 'Deterministic behavior for time-sensitive workflows.' },
      { icon: 'map-pin', title: 'Field deployment', desc: 'Rugged, self-sufficient hardware for real-world sites.' },
    ],
    formEyebrow: 'HARDWARE WE BUILD',
    formTitle: 'Edge AI hardware we build',
    formLead: 'Edge-ready building blocks and complete devices, with edge voice capture as the fastest starting point.',
    formFactors: [
      { icon: 'mic', title: 'Edge voice capture module' },
      { icon: 'cpu', title: 'On-device audio processor' },
      { icon: 'circuit-board', title: 'Sensor + MCU / SoC platform' },
      { icon: 'wifi', title: 'Connectivity module' },
      { icon: 'box', title: 'AI-ready hardware platform' },
      { icon: 'map-pin', title: 'Field-deployable device' },
    ],
    whyTitle: 'Why build for the edge?',
    whyLead: 'Cloud-only AI hits limits on latency, privacy, cost, and reliability. Edge hardware puts capability where the work happens.',
    whyList: [
      'Lower latency and real-time response',
      'Privacy by keeping data on-device',
      'Reduced cloud and bandwidth cost',
      'Local storage and offline operation',
      'Reliable performance in the field',
    ],
    whyImg: '../../img/about/smt-machines.jpg',
    whyAlt: 'GMIC SMT machines producing edge AI hardware',
    related: [rel('embedded-ai-hardware', 'Embedded AI Hardware'), rel('voice-ai-hardware', 'Voice AI Hardware'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your Edge AI Hardware With GMIC AI',
    finalDesc: 'From edge voice capture to full AI-ready platforms, GMIC takes your edge deployment from architecture to manufacturing.',
  },

  {
    slug: 'embedded-ai-hardware',
    label: 'EMBEDDED AI HARDWARE',
    seoTitle: 'Embedded AI Hardware Development for AI Devices | GMIC AI',
    seoDesc: 'GMIC AI provides embedded AI hardware development including PCB, firmware, MCU, Bluetooth, Wi-Fi, audio DSP, sensor integration, and power management for AI device companies.',
    h1: 'Embedded AI Hardware Development for AI Devices',
    subtitle: 'We help AI companies turn software intelligence into embedded hardware products.',
    cta: 'Start Embedded Hardware Development',
    trust: TRUST,
    heroImg: '../../img/about/reflow-solder.jpg',
    heroAlt: 'GMIC embedded hardware reflow soldering line',
    coreTitle: 'The embedded engineering behind AI devices',
    coreLead: 'An AI product is only as good as the embedded system inside it — the PCB, firmware, and radios that make it real.',
    coreBody: [
      'GMIC provides embedded system design that turns your AI concept into a manufacturable device. We deliver PCB and firmware, MCU selection, Bluetooth and Wi-Fi, audio DSP, sensor integration, power management, and OTA update support.',
      `Our strength is hardware-software integration — making the device, its firmware, and your platform work as one — delivered through our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a>. This is the layer beneath any wearable, edge, or voice product.`,
      `Start from one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a> and move from schematic to mass production with one team.`,
    ],
    useCasesEyebrow: 'CAPABILITIES',
    useCasesTitle: 'Embedded development capabilities',
    useCases: [
      { icon: 'circuit-board', title: 'PCB & firmware', desc: 'Schematic capture, layout, and embedded firmware for compact devices.' },
      { icon: 'cpu', title: 'MCU / SoC', desc: 'Right-sized processor selection for performance and power.' },
      { icon: 'bluetooth', title: 'Bluetooth / Wi-Fi', desc: 'Connectivity, pairing, and radio behavior tuned to your app.' },
      { icon: 'audio-lines', title: 'Audio DSP', desc: 'Microphone tuning, beamforming, and noise reduction.' },
      { icon: 'activity', title: 'Sensor integration', desc: 'Motion, touch, and environmental sensing built into the system.' },
      { icon: 'battery-charging', title: 'Power management', desc: 'Battery, charging, and power budgets for real duty cycles.' },
    ],
    formEyebrow: 'WHAT WE DELIVER',
    formTitle: 'From board to shippable device',
    formLead: 'The embedded building blocks that become your AI product.',
    formFactors: [
      { icon: 'circuit-board', title: 'Custom PCB / PCBA' },
      { icon: 'terminal', title: 'Embedded firmware' },
      { icon: 'radio', title: 'OTA update system' },
      { icon: 'git-merge', title: 'Hardware-software integration' },
    ],
    whyTitle: 'Why an embedded hardware partner?',
    whyLead: 'Embedded development is where most AI hardware projects stall. A partner who owns PCB, firmware, and integration keeps you shipping.',
    whyList: [
      'One team from schematic to firmware',
      'Radios and audio tuned, not bolted on',
      'Power and thermals designed for real use',
      'OTA and integration built in from day one',
      'A clear path to certification and volume',
    ],
    whyImg: '../../img/about/bv50p.jpg',
    whyAlt: 'GMIC embedded hardware engineering and PCB assembly',
    related: [rel('edge-ai-hardware', 'Edge AI Hardware'), rel('ai-wearable-devices', 'AI Wearable Devices'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your Embedded AI Hardware With GMIC AI',
    finalDesc: 'Bring your AI software to GMIC and we will engineer the embedded hardware — PCB, firmware, radios, and integration — behind it.',
  },

  {
    slug: 'field-service-voice-capture',
    label: 'FIELD SERVICE VOICE CAPTURE',
    seoTitle: 'Field Service Voice Capture Hardware for Technicians and AI Workflows | GMIC AI',
    seoDesc: 'GMIC AI builds field service voice capture hardware for technicians, HVAC, plumbing, home service, and maintenance teams. Hands-free voice recording, offline storage, and AI workflow integration.',
    h1: 'Field Service Voice Capture Hardware for Technicians and AI Workflows',
    subtitle: 'Built for noisy, mobile, real-world service environments.',
    cta: 'Build Field Service Voice Hardware',
    trust: TRUST,
    heroImg: '../../img/industries/field-service/hero.png',
    heroAlt: 'Field service technician using GMIC voice capture hardware',
    coreTitle: 'Voice capture built for the jobsite',
    coreLead: 'Technicians work with their hands, in noise, on the move. Typing notes into an app is the first thing that gets skipped.',
    coreBody: [
      'GMIC builds field service voice capture hardware for technicians across HVAC, plumbing, home service, maintenance, construction, and inspection. Rugged, hands-free devices handle technician voice recording, field notes, jobsite audio, and service call documentation.',
      `Devices support offline recording and automatic upload, then feed your AI workflow integration — all engineered through our <a class="sol-link" href="${ODM}">AI hardware ODM/OEM services</a>.`,
      `Start from one of our <a class="sol-link" href="${PRODUCTS}">customizable hardware platforms</a> and scale from a pilot crew to a full fleet.`,
    ],
    useCasesEyebrow: 'IN THE FIELD',
    useCasesTitle: 'Where field voice capture fits',
    useCases: [
      { icon: 'hand', title: 'Hands-free capture', desc: 'Record while working — no phone, no gloves-off, no typing.' },
      { icon: 'wifi-off', title: 'Offline recording', desc: 'Capture reliably in basements, roofs, and dead zones.' },
      { icon: 'upload-cloud', title: 'Automatic upload', desc: 'Sync recordings the moment a network is available.' },
      { icon: 'clipboard-list', title: 'Service documentation', desc: 'Turn every job into a structured, searchable record.' },
    ],
    formEyebrow: 'HARDWARE WE BUILD',
    formTitle: 'Field service voice hardware',
    formLead: 'Durable, one-tap devices designed for gloves, noise, and long shifts.',
    formFactors: [
      { icon: 'shield', title: 'Rugged wearable recorder' },
      { icon: 'badge', title: 'Badge-style device' },
      { icon: 'mic', title: 'Hands-free clip mic' },
      { icon: 'circle-dot', title: 'One-tap field recorder' },
    ],
    workflow: {
      eyebrow: 'WORKFLOW',
      title: 'From jobsite to AI insight',
      steps: [
        'Technician arrives on site',
        'Taps device to record',
        'Captures customer conversation and repair notes',
        'Uploads to your AI system',
        'AI generates job summary, quote, follow-up, and training insights',
      ],
    },
    whyTitle: 'Why dedicated field hardware?',
    whyLead: 'Phone apps break down in the field — dead batteries, dead zones, and workflows too slow for a busy technician. Dedicated hardware fits how crews actually work.',
    whyList: [
      'Hands-free, glove-friendly operation',
      'Offline recording with automatic upload',
      'Rugged enough for real jobsites',
      'One-tap simplicity technicians adopt',
      'Clean audio that feeds your AI workflow',
    ],
    whyImg: '../../img/about/assembly-line.jpg',
    whyAlt: 'GMIC manufacturing line for field service hardware',
    related: [rel('voice-ai-hardware', 'Voice AI Hardware'), rel('ai-wearable-devices', 'AI Wearable Devices'), REL_ODM, REL_PRODUCTS],
    finalTitle: 'Build Your Field Service Voice Hardware With GMIC AI',
    finalDesc: 'From a pilot crew to a national fleet, GMIC takes your field service capture device from concept to deployment.',
  },
];

// ---------- write files ----------
let count = 0;
for (const p of PAGES) {
  const dir = path.join(ROOT, 'solutions', p.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderPage(p), 'utf8');
  count++;
  console.log('wrote solutions/' + p.slug + '/index.html');
}
console.log('Done. ' + count + ' pages generated.');
