const fs = require('fs');
const p = 'C:\\Users\\meng\\Desktop\\gmic\\main\\industries\\healthcare\\index.html';
let h = fs.readFileSync(p, 'utf8');

const BOOKING = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb';

/* ===== 1. HEAD: title / meta / canonical ===== */
h = h.replace(
  '<title>ODM &amp; OEM AI Hardware Development | GMIC.AI</title>',
  '<title>Healthcare AI Hardware — Voice Recorders &amp; AI Scribe Devices | GMIC.AI</title>'
);
h = h.replace(
  /<meta name="description"[^>]*\/>/,
  '<meta name="description" content="GMIC builds dedicated healthcare AI hardware — AI scribe devices, clinical documentation hardware, and wearable voice recorders for senior care, telehealth, and home health. From concept to deployment." />'
);
h = h.replace(
  'href="https://gmic.ai/custom-devices/odm-oem/"',
  'href="https://gmic.ai/industries/healthcare/"'
);

/* ===== 2. HEAD: append Healthcare template styles before </style> ===== */
const styles = `
/* ============================================================
   INDUSTRY PAGE TEMPLATE — Healthcare (reusable across 7 pages)
   ============================================================ */
body { background:#fff; color:#0f172a; -webkit-font-smoothing:antialiased; }
.mobile-nav-link.active { color:#2563eb !important; font-weight:700; }

/* width helpers — constrain TEXT only, never section backgrounds */
.measure { max-width:680px; }
.measure-wide { max-width:760px; }

/* section shells & light/dark alternation */
.ind-sec { padding:96px 0; }
.ind-sec--light { background:#ffffff; }
.ind-sec--soft  { background:#f8fafc; }
.ind-sec--dark  { background:#0f172a; color:#fff; }
.ind-sec--dark h2.section, .ind-sec--dark h3 { color:#fff; }
.ind-sec--dark p { color:rgba(255,255,255,.72); }
.ind-head { margin-bottom:48px; }
.ind-head .eyebrow { display:block; margin-bottom:16px; }
.ind-head h2.section { margin:0; }

/* HERO */
.ind-hero { background:#0b1220; color:#fff; padding:140px 0 64px; }
.ind-hero .eyebrow.dark { display:block; margin-bottom:20px; }
.ind-hero-copy { max-width:820px; }
.ind-hero h1.display { color:#fff; font-size:clamp(2rem,7vw,3.4rem); line-height:1.05; letter-spacing:-.03em; margin:0 0 18px; }
.ind-hero .lede { font-size:1.0625rem; line-height:1.7; color:rgba(255,255,255,.75); margin:0 0 22px; }
.ind-tag { display:inline-flex; align-items:center; gap:8px; font-size:.78rem; font-weight:600; letter-spacing:.04em; text-transform:uppercase; color:#93c5fd; background:rgba(37,99,235,.14); border:1px solid rgba(147,197,253,.25); padding:7px 14px; border-radius:100px; margin-bottom:28px; }
.ind-tag svg { width:15px; height:15px; }
.ind-hero-cta { display:flex; flex-wrap:wrap; gap:14px; }
.ind-hero-banner { margin-top:48px; border-radius:18px; overflow:hidden; border:1px solid rgba(255,255,255,.08); box-shadow:0 30px 80px rgba(0,0,0,.35); }
.ind-hero-banner img { display:block; width:100%; height:auto; }

/* INTRO */
.intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
.intro-lead { font-size:clamp(1.4rem,2.4vw,1.6rem); line-height:1.35; font-weight:600; color:#0f172a; margin:0; }
.intro-lead em { font-style:italic; color:#2563eb; }
.intro-body { display:flex; flex-direction:column; gap:16px; padding-top:6px; border-left:1px solid rgba(0,0,0,.06); padding-left:40px; }
.intro-body p { font-size:1rem; line-height:1.75; color:#64748b; margin:0; }

/* CARD GRIDS (Challenges / Use Cases) */
.ind-grid { display:grid; gap:20px; }
.grid-4 { grid-template-columns:repeat(4,1fr); }
.ind-card { background:#fff; border:1px solid rgba(0,0,0,.06); border-radius:12px; padding:28px 24px; transition:transform .25s ease, box-shadow .25s ease; }
.ind-card:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(15,23,42,.10); }
.ind-card-ic { width:44px; height:44px; border-radius:10px; background:#eff4ff; display:flex; align-items:center; justify-content:center; margin-bottom:18px; }
.ind-card-ic svg { width:22px; height:22px; color:#2563eb; }
.ind-card h3 { font-size:1.0625rem; font-weight:600; margin:0 0 8px; line-height:1.3; }
.ind-card p { font-size:.9rem; line-height:1.6; color:#64748b; margin:0; }
.ind-sec--dark .ind-card { background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.10); }
.ind-sec--dark .ind-card-ic { background:rgba(37,99,235,.18); }
.ind-sec--dark .ind-card-ic svg { color:#93c5fd; }
.ind-sec--dark .ind-card p { color:rgba(255,255,255,.65); }

/* SOLUTIONS — Square-style scrollytelling: full-height sticky image + active/grey steps, NO border */
.sol-scrolly { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
.sol-stage { position:relative; }
.sol-stage-inner { position:sticky; top:0; height:100vh; overflow:hidden; }
.sol-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity .5s ease; }
.sol-img.is-active { opacity:1; }
.sol-content .eyebrow { display:block; margin-bottom:16px; }
.sol-content h2.section { margin:0 0 8px; }
.sol-steps { display:flex; flex-direction:column; }
.sol-step { min-height:42vh; display:flex; flex-direction:column; justify-content:center; padding:32px 0; opacity:.35; transition:opacity .3s ease; }
.sol-step + .sol-step { border-top:1px solid rgba(0,0,0,.08); }
.sol-step.is-active { opacity:1; }
.sol-step-head { display:flex; align-items:center; gap:12px; margin-bottom:10px; }
.sol-ic { width:40px; height:40px; border-radius:10px; background:#eff4ff; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .25s ease; }
.sol-ic svg { width:20px; height:20px; color:#94a3b8; transition:color .25s ease; }
.sol-step.is-active .sol-ic { background:#2563eb; }
.sol-step.is-active .sol-ic svg { color:#fff; }
.sol-step h3 { font-size:1.125rem; font-weight:600; color:#0f172a; margin:0; }
.sol-step > p { font-size:.95rem; line-height:1.7; color:#475569; margin:0 0 14px; }
/* Fallback (no IntersectionObserver / mobile): every step fully visible — never hidden */
.sol-static .sol-step { opacity:1; }
.sol-static .sol-step .sol-ic { background:#2563eb; }
.sol-static .sol-step .sol-ic svg { color:#fff; }
.sol-chips { display:flex; flex-wrap:wrap; gap:8px; }
.chip { font-size:.8rem; font-weight:500; color:#2563eb; background:#eff4ff; border-radius:100px; padding:6px 14px; }

/* WHY HARDWARE */
.why-hw-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.why-hw-lead { font-size:1.0625rem; line-height:1.7; margin:18px 0 24px; color:rgba(255,255,255,.78); }
.check-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:14px; }
.check-list li { display:flex; align-items:center; gap:12px; font-size:1rem; color:#fff; }
.check-list .ck { width:26px; height:26px; border-radius:50%; background:rgba(37,99,235,.20); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.check-list .ck svg { width:15px; height:15px; color:#93c5fd; }
.why-hw-media { border-radius:14px; overflow:hidden; }
.why-hw-media img { display:block; width:100%; height:100%; object-fit:cover; }

/* CAPABILITIES — two NO-border cards, image-topped */
.cap2-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
.cap-col { background:#fff; border-radius:12px; overflow:hidden; transition:transform .25s ease, box-shadow .25s ease; }
.cap-col:hover { transform:translateY(-4px); box-shadow:0 18px 40px rgba(15,23,42,.10); }
.cap-col-img { display:block; width:100%; height:200px; object-fit:cover; border-radius:12px 12px 0 0; }
.cap-col-body { padding:26px 26px 30px; }
.cap-col-body h3 { display:flex; align-items:center; gap:10px; font-size:1.125rem; font-weight:600; margin:0 0 16px; }
.cap-col-body h3 svg { width:20px; height:20px; color:#2563eb; }
.cap-col-body ul { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
.cap-col-body li { font-size:.95rem; color:#475569; padding-left:18px; position:relative; }
.cap-col-body li::before { content:''; position:absolute; left:0; top:9px; width:6px; height:6px; border-radius:50%; background:#2563eb; }

/* PROCESS */
.proc-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:16px; }
.proc-step { padding:24px 18px; border-radius:12px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
.proc-num { font-size:1.5rem; font-weight:700; color:#3b82f6; letter-spacing:-.02em; margin-bottom:12px; }
.proc-step h3 { font-size:.95rem; font-weight:600; color:#fff; margin:0; line-height:1.35; }

/* RELATED */
.rel-row { display:flex; flex-wrap:wrap; gap:10px; }
.rel-link { font-size:.9rem; font-weight:500; color:#475569; background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:100px; padding:9px 18px; text-decoration:none; transition:color .2s ease, border-color .2s ease; }
.rel-link:hover { color:#2563eb; border-color:rgba(37,99,235,.40); }

/* REVEAL / FADE — self-contained (page may run without main.js) */
.reveal { opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
.reveal.in, .reveal.visible { opacity:1; transform:none; }
.fade-section { opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
.fade-section.in, .fade-section.in-view, .fade-section.visible { opacity:1; transform:none; }

/* RESPONSIVE */
@media (max-width:900px){
  .grid-4 { grid-template-columns:repeat(2,1fr); }
  .proc-grid { grid-template-columns:repeat(3,1fr); }
  .intro-grid, .why-hw-grid, .cap2-grid { grid-template-columns:1fr; gap:32px; }
  .intro-body { border-left:none; padding-left:0; }
  .why-hw-media { order:2; }
  /* Solutions: stack, image on top (normal aspect, not sticky), all steps visible */
  .sol-scrolly { grid-template-columns:1fr; gap:24px; }
  .sol-stage-inner { position:static; height:clamp(220px,55vw,320px); border-radius:12px; }
  .sol-step { min-height:auto; padding:24px 0; opacity:1; }
}
@media (max-width:640px){
  .ind-sec { padding:64px 0; }
  .ind-hero { padding:110px 0 48px; }
  .ind-hero-banner { margin-top:32px; }
  .grid-4 { grid-template-columns:1fr; }
  .proc-grid { grid-template-columns:repeat(2,1fr); }
  .ind-hero .lede { font-size:.95rem; }
  .ind-hero-cta .btn { width:100%; text-align:center; }
}
`;
h = h.replace('</style>', styles + '\n</style>');

/* ===== 3. NAV: remove ODM active, set Healthcare active (desktop + mobile) ===== */
h = h.replace(
  '<a href="../../custom-devices/odm-oem/index.html" class="dropdown-link nav-current" aria-current="page">ODM / OEM</a>',
  '<a href="../../custom-devices/odm-oem/index.html" class="dropdown-link">ODM / OEM</a>'
);
h = h.replace(
  '<a href="../../custom-devices/odm-oem/index.html" class="mobile-nav-link" aria-current="page" style="color:#2563eb;font-weight:700;">ODM / OEM</a>',
  '<a href="../../custom-devices/odm-oem/index.html" class="mobile-nav-link">ODM / OEM</a>'
);
h = h.replace(
  '<a href="../../industries/healthcare/index.html" class="dropdown-link">Healthcare Voice AI</a>',
  '<a href="../../industries/healthcare/index.html" class="dropdown-link nav-current" aria-current="page">Healthcare Voice AI</a>'
);
h = h.replace(
  '<a href="../../industries/healthcare/index.html" class="mobile-nav-link">Healthcare Voice AI</a>',
  '<a href="../../industries/healthcare/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Healthcare Voice AI</a>'
);

/* ===== 4. BODY: replace ODM body (between mobile-nav-overlay and footer) ===== */
const body = `
<!-- Sentinel for ../../js/main.js (reads .hero offsetHeight); hidden, harmless. -->
<div class="hero" aria-hidden="true" style="display:none"></div>

<!-- ========== 1) HERO — text above a full-width banner ========== -->
<header class="ind-hero fade-section">
  <div class="container">
    <div class="ind-hero-copy reveal">
      <div class="eyebrow dark">/ INDUSTRIES — HEALTHCARE</div>
      <h1 class="display">Voice hardware for <em class="italic">modern healthcare.</em></h1>
      <p class="lede measure">Dedicated AI hardware to capture conversations, cut documentation time, and deploy voice workflows in real clinical environments.</p>
      <div class="ind-tag"><i data-lucide="cpu"></i> Powered by MIC06</div>
      <div class="ind-hero-cta">
        <a href="${BOOKING}" target="_blank" rel="noopener" class="btn btn-blue">Start a Project</a>
        <a href="../../products/mic06/index.html" class="btn btn-ghost">View MIC06</a>
      </div>
    </div>
    <div class="ind-hero-banner reveal">
      <!-- TODO: 后续替换为 healthcare 专属 hero 图（护士/医生佩戴胸卡式录音设备、与患者对话的宽幅场景） -->
      <img src="../../img/indus/healthcare.png" alt="Healthcare professional using GMIC voice AI hardware">
    </div>
  </div>
</header>

<!-- ========== 2) INTRO ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="intro-grid reveal">
      <p class="intro-lead measure">Healthcare AI is moving fast — but software still runs on <em>phones and manual workflows.</em></p>
      <div class="intro-body">
        <p>GMIC develops dedicated healthcare AI hardware that bridges the gap between software and real-world clinical deployment.</p>
        <p>From AI scribe platforms to telehealth, home healthcare, and senior care — we bring your product from concept to deployment.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== 3) CHALLENGES ========== -->
<section class="ind-sec ind-sec--dark fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow dark">/ CHALLENGES</div>
      <h2 class="section measure-wide">Healthcare teams face unique operational and compliance requirements.</h2>
    </div>
    <div class="ind-grid grid-4 reveal">
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="smartphone"></i></div>
        <h3>Smartphones Create Workflow Friction</h3>
        <p>Many clinicians prefer not to use personal phones for patient conversations.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="file-text"></i></div>
        <h3>Documentation Takes Time</h3>
        <p>Providers often spend hours completing notes after appointments.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="audio-lines"></i></div>
        <h3>Inconsistent Audio Quality</h3>
        <p>Busy clinics, hospitals, and field environments create recording challenges.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="shield-check"></i></div>
        <h3>Rising Security Requirements</h3>
        <p>Organizations need workflows that align with privacy and compliance expectations.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== 4) SOLUTIONS — Square-style scrollytelling ========== -->
<section class="ind-sec ind-sec--soft fade-section">
  <div class="container">
    <div class="sol-scrolly reveal" id="solScrolly">
      <!-- Left: full-height sticky image stack; cross-fades to the active step's image -->
      <div class="sol-stage">
        <div class="sol-stage-inner">
          <!-- TODO: 4 张后续换 healthcare 专属图 -->
          <img class="sol-img is-active" data-sol="0" src="../../img/cap/mic06-main.png" alt="AI scribe recording hardware">
          <img class="sol-img" data-sol="1" src="../../img/cap/mic06-1.png" alt="Wearable voice recorder">
          <img class="sol-img" data-sol="2" src="../../img/indus/healthcare.png" alt="Home healthcare documentation">
          <img class="sol-img" data-sol="3" src="../../img/cap/MIC06.png" alt="Senior care documentation device">
        </div>
      </div>
      <!-- Right: heading + 4 solution steps (active = bright, others = greyed) -->
      <div class="sol-content">
        <div class="eyebrow">/ SOLUTIONS</div>
        <h2 class="section measure-wide">GMIC Healthcare Solutions</h2>
        <div class="sol-steps">
          <div class="sol-step is-active" data-sol="0">
            <div class="sol-step-head">
              <span class="sol-ic"><i data-lucide="stethoscope"></i></span>
              <h3>AI Scribe Hardware</h3>
            </div>
            <p>Dedicated recording devices for AI-powered clinical documentation.</p>
            <div class="sol-chips">
              <span class="chip">Primary Care</span>
              <span class="chip">Specialty Clinics</span>
              <span class="chip">Urgent Care</span>
              <span class="chip">Telehealth</span>
              <span class="chip">Behavioral Health</span>
            </div>
          </div>
          <div class="sol-step" data-sol="1">
            <div class="sol-step-head">
              <span class="sol-ic"><i data-lucide="mic"></i></span>
              <h3>Wearable Voice Recorders</h3>
            </div>
            <p>Hands-free recording for healthcare professionals.</p>
            <div class="sol-chips">
              <span class="chip">One-button recording</span>
              <span class="chip">All-day battery</span>
              <span class="chip">Local storage</span>
              <span class="chip">Wi-Fi upload</span>
              <span class="chip">Noise reduction</span>
            </div>
          </div>
          <div class="sol-step" data-sol="2">
            <div class="sol-step-head">
              <span class="sol-ic"><i data-lucide="house"></i></span>
              <h3>Home Healthcare Documentation</h3>
            </div>
            <p>Mobile voice capture for caregivers and field workers.</p>
            <div class="sol-chips">
              <span class="chip">Home Health Agencies</span>
              <span class="chip">Visiting Nurses</span>
              <span class="chip">Mobile Healthcare Teams</span>
            </div>
          </div>
          <div class="sol-step" data-sol="3">
            <div class="sol-step-head">
              <span class="sol-ic"><i data-lucide="heart-handshake"></i></span>
              <h3>Senior Care &amp; Assisted Living</h3>
            </div>
            <p>Voice-enabled documentation for caregivers and assisted living staff.</p>
            <div class="sol-chips">
              <span class="chip">Care notes</span>
              <span class="chip">Incident reporting</span>
              <span class="chip">Shift documentation</span>
              <span class="chip">Resident communication</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== 5) USE CASES ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ USE CASES</div>
      <h2 class="section measure-wide">Common Use Cases</h2>
    </div>
    <div class="ind-grid grid-4 reveal">
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="stethoscope"></i></div>
        <h3>Clinical Documentation</h3>
        <p>Capture provider–patient conversations and support AI-generated medical notes.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="activity"></i></div>
        <h3>Healthcare Operations</h3>
        <p>Improve workflow documentation across healthcare teams.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="radio"></i></div>
        <h3>Remote Care</h3>
        <p>Enable voice capture outside traditional clinical environments.</p>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="clipboard-check"></i></div>
        <h3>Compliance Documentation</h3>
        <p>Support structured documentation and audit readiness.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== 6) WHY DEDICATED HARDWARE ========== -->
<section class="ind-sec ind-sec--dark fade-section">
  <div class="container">
    <div class="why-hw-grid">
      <div class="reveal">
        <div class="eyebrow dark">/ WHY HARDWARE</div>
        <h2 class="section measure-wide">Why dedicated hardware?</h2>
        <p class="why-hw-lead measure">Many healthcare AI companies start with mobile apps. As deployments scale, dedicated hardware becomes necessary.</p>
        <ul class="check-list">
          <li><span class="ck"><i data-lucide="check"></i></span> Consistent user experience</li>
          <li><span class="ck"><i data-lucide="check"></i></span> Improved adoption</li>
          <li><span class="ck"><i data-lucide="check"></i></span> Better audio quality</li>
          <li><span class="ck"><i data-lucide="check"></i></span> Reduced workflow friction</li>
          <li><span class="ck"><i data-lucide="check"></i></span> Enterprise deployment support</li>
        </ul>
      </div>
      <div class="why-hw-media reveal">
        <!-- TODO: img/platform/01.jpg 可替换为更贴合 healthcare 的实拍 -->
        <img src="../../img/platform/01.jpg" alt="GMIC hardware engineering and manufacturing">
      </div>
    </div>
  </div>
</section>

<!-- ========== 7) HARDWARE CAPABILITIES ========== -->
<section class="ind-sec ind-sec--soft fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ CAPABILITIES</div>
      <h2 class="section measure-wide">Hardware capabilities</h2>
    </div>
    <div class="cap2-grid reveal">
      <div class="cap-col">
        <!-- TODO: platform 图后续可替换为 healthcare 装配/产线实拍 -->
        <img class="cap-col-img" src="../../img/platform/02.jpg" alt="What GMIC builds">
        <div class="cap-col-body">
          <h3><i data-lucide="package"></i> What we build</h3>
          <ul>
            <li>Wearable recorders</li>
            <li>Badge-style devices</li>
            <li>Voice capture modules</li>
            <li>Custom enclosures</li>
            <li>Private label</li>
            <li>OEM / ODM development</li>
          </ul>
        </div>
      </div>
      <div class="cap-col">
        <!-- TODO: platform 图后续可替换为 healthcare 工程/调试实拍 -->
        <img class="cap-col-img" src="../../img/platform/04.jpg" alt="GMIC engineering support">
        <div class="cap-col-body">
          <h3><i data-lucide="wrench"></i> Engineering support</h3>
          <ul>
            <li>Firmware integration</li>
            <li>Audio DSP tuning</li>
            <li>SDK integration</li>
            <li>Prototype validation</li>
            <li>Manufacturing support</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ========== 8) IMPLEMENTATION PROCESS ========== -->
<section class="ind-sec ind-sec--dark fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow dark">/ PROCESS</div>
      <h2 class="section measure-wide">From workflow to scale.</h2>
    </div>
    <div class="proc-grid reveal">
      <div class="proc-step"><div class="proc-num">01</div><h3>Workflow Discovery</h3></div>
      <div class="proc-step"><div class="proc-num">02</div><h3>Solution Architecture</h3></div>
      <div class="proc-step"><div class="proc-num">03</div><h3>Prototype Development</h3></div>
      <div class="proc-step"><div class="proc-num">04</div><h3>Platform Integration</h3></div>
      <div class="proc-step"><div class="proc-num">05</div><h3>Pilot Deployment</h3></div>
      <div class="proc-step"><div class="proc-num">06</div><h3>Manufacturing &amp; Scaling</h3></div>
    </div>
  </div>
</section>

<!-- ========== 9) RELATED INDUSTRIES ========== -->
<section class="ind-sec ind-sec--light fade-section" style="padding:56px 0;">
  <div class="container">
    <div class="reveal" style="display:flex;flex-wrap:wrap;align-items:center;gap:18px;justify-content:space-between;">
      <div class="eyebrow">/ RELATED INDUSTRIES</div>
      <div class="rel-row">
        <a class="rel-link" href="../enterprise/index.html">Enterprise AI</a>
        <a class="rel-link" href="../field-service/index.html">Field Service</a>
        <a class="rel-link" href="../telecom/index.html">Telecom AI</a>
        <a class="rel-link" href="../smart-retail/index.html">Smart Retail</a>
      </div>
    </div>
  </div>
</section>

<!-- ========== 10) FINAL CTA ========== -->
<section class="final-cta fade-section">
  <div class="container">
    <div class="eyebrow reveal">Begin</div>
    <h2 class="section reveal">Ready to build healthcare AI hardware?</h2>
    <p class="reveal measure" style="margin-left:auto;margin-right:auto;">Whether you're developing an AI scribe platform, clinical documentation solution, or senior care technology, GMIC can take your product from concept to deployment.</p>
    <a href="${BOOKING}" target="_blank" rel="noopener" class="btn btn-blue-deep reveal">Start a Project</a>
  </div>
</section>
`;

const ovl = '<div class="mobile-nav-overlay" id="mobileNavOverlay"></div>';
const ft = '<footer class="footer" id="company">';
const i1 = h.indexOf(ovl);
const i2 = h.indexOf(ft);
if (i1 === -1 || i2 === -1 || i2 < i1) {
  console.error('FAILED to locate body region', { i1, i2 });
  process.exit(1);
}
h = h.slice(0, i1 + ovl.length) + '\n\n' + body + '\n\n' + h.slice(i2);

/* ===== 5. Append self-contained reveal + scrollytelling + lucide before </body> ===== */
const tail = `<!-- ========== Self-contained reveal + Solutions scrollytelling + icons ========== -->
<script>
(function () {
  // Reveal: never let .reveal/.fade-section stay hidden if main.js is absent or fails.
  var els = document.querySelectorAll('.reveal, .fade-section');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in', 'visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in', 'visible'); io.unobserve(en.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (e) { io.observe(e); });
    window.addEventListener('load', function () {
      setTimeout(function () { els.forEach(function (e) { e.classList.add('in', 'visible'); }); }, 1200);
    });
  }
  if (window.lucide && typeof window.lucide.createIcons === 'function') { window.lucide.createIcons(); }
})();

(function () {
  // Solutions scrollytelling: as each step scrolls to center, highlight it + swap the left image.
  var scrolly = document.getElementById('solScrolly');
  if (!scrolly) return;
  var steps = [].slice.call(scrolly.querySelectorAll('.sol-step'));
  var imgs = [].slice.call(scrolly.querySelectorAll('.sol-img'));
  function setActive(i) {
    steps.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
    imgs.forEach(function (im, idx) { im.classList.toggle('is-active', idx === i); });
  }
  // Graceful degradation: small screens or no IO -> all steps bright, image stays on first.
  if (!('IntersectionObserver' in window) || window.innerWidth <= 900) {
    scrolly.classList.add('sol-static');
    return;
  }
  try {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var i = steps.indexOf(en.target);
          if (i >= 0) setActive(i);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (s) { io2.observe(s); });
  } catch (e) {
    scrolly.classList.add('sol-static');
  }
})();
</script>
`;
h = h.replace('</body>', tail + '</body>');

fs.writeFileSync(p, h, 'utf8');
console.log('DONE rebuilt healthcare page');
console.log('title healthcare:', h.includes('Healthcare AI Hardware — Voice Recorders'));
console.log('canonical healthcare:', h.includes('https://gmic.ai/industries/healthcare/'));
console.log('odm body gone (no odm-hero):', !h.includes('class="odm-hero'));
console.log('solScrolly present:', h.includes('id="solScrolly"'));
console.log('healthcare desktop active:', h.includes('class="dropdown-link nav-current" aria-current="page">Healthcare Voice AI'));
console.log('healthcare mobile active:', h.includes('class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Healthcare Voice AI'));
console.log('odm desktop active removed:', !h.includes('class="dropdown-link nav-current" aria-current="page">ODM / OEM'));
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('main.js kept:', h.includes('<script src="../../js/main.js">'));
