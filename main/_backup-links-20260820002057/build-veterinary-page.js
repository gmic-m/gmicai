const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'healthcare', 'index.html');
const outDir = path.join(BASE, 'industries', 'veterinary');
const out = path.join(outDir, 'index.html');

let h = fs.readFileSync(src, 'utf8');
const checks = [];
function rep(label, oldS, newS) {
  if (h.indexOf(oldS) === -1) { checks.push(label + ': NOT FOUND'); return; }
  h = h.replace(oldS, newS);
  checks.push(label + ': ok');
}

/* ---- HEAD ---- */
rep('title',
  '<title>Healthcare AI Hardware — Voice Recorders &amp; AI Scribe Devices | GMIC.AI</title>',
  '<title>Veterinary AI Documentation Hardware | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Veterinary AI documentation hardware from GMIC — voice recorders and wearable hardware for veterinary AI platforms, veterinary scribe, and clinical documentation." />');
checks.push('meta: ' + (h.includes('veterinary scribe') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/healthcare/', 'https://gmic.ai/industries/veterinary/');

/* ---- CSS: add grid-3 + case-study card helpers ---- */
rep('css grid-3',
  '.grid-4 { grid-template-columns:repeat(4,1fr); }',
  '.grid-4 { grid-template-columns:repeat(4,1fr); }\n.grid-3 { grid-template-columns:repeat(3,1fr); }\n.cs-card { max-width:360px; }\n.cs-card:hover { transform:none; box-shadow:none; }');
rep('css grid-3 responsive',
  '  .grid-4 { grid-template-columns:repeat(2,1fr); }',
  '  .grid-4 { grid-template-columns:repeat(2,1fr); }\n  .grid-3 { grid-template-columns:1fr; }');

/* ---- NAV: desktop — Healthcare plain + add Veterinary (active) ---- */
rep('nav desktop',
  '              <a href="../../industries/healthcare/index.html" class="dropdown-link nav-current" aria-current="page">Healthcare Voice AI</a>',
  '              <a href="../../industries/healthcare/index.html" class="dropdown-link">Healthcare Voice AI</a>\n              <a href="../../industries/veterinary/index.html" class="dropdown-link nav-current" aria-current="page">Veterinary AI</a>');

/* ---- NAV: mobile — Healthcare plain + add Veterinary (active) ---- */
rep('nav mobile',
  '      <a href="../../industries/healthcare/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Healthcare Voice AI</a>',
  '      <a href="../../industries/healthcare/index.html" class="mobile-nav-link">Healthcare Voice AI</a>\n      <a href="../../industries/veterinary/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Veterinary AI</a>');

/* ---- HERO ---- */
const heroOld = `<header class="ind-hero fade-section">
  <div class="container">
    <div class="ind-hero-top reveal">
      <div class="ind-hero-lead">
        <div class="ind-tag"><i data-lucide="cpu"></i> Powered by MIC06</div>
        <div class="eyebrow dark">/ INDUSTRIES — HEALTHCARE</div>
        <h1 class="display">Voice hardware for <em class="italic">modern healthcare.</em></h1>
      </div>
      <div class="ind-hero-aside">
        <p class="lede">Dedicated AI hardware to capture conversations, cut documentation time, and deploy voice workflows in real clinical environments.</p>
        <div class="ind-hero-cta">
          <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb" target="_blank" rel="noopener" class="btn btn-blue">Start a Project</a>
          <a href="../../products/mic06/index.html" class="btn btn-ghost">View MIC06</a>
        </div>
      </div>
    </div>
    <div class="ind-hero-banner reveal">
      <!-- TODO: 后续替换为 healthcare 专属 hero 图（护士/医生佩戴胸卡式录音设备、与患者对话的宽幅场景） -->
      <img src="../../img/indus/healthcare.png" alt="Healthcare professional using GMIC voice AI hardware">
    </div>
  </div>
</header>`;
const heroNew = `<header class="ind-hero fade-section">
  <div class="container">
    <div class="ind-hero-top reveal">
      <div class="ind-hero-lead">
        <div class="eyebrow dark">/ INDUSTRIES — VETERINARY</div>
        <h1 class="display">Veterinary AI <em class="italic">Documentation</em> Hardware</h1>
      </div>
      <div class="ind-hero-aside">
        <p class="lede">Voice hardware designed for veterinary AI platforms and clinical documentation.</p>
        <div class="ind-hero-cta">
          <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb" target="_blank" rel="noopener" class="btn btn-blue">Start a Project</a>
          <a href="../../index.html#products" class="btn btn-ghost">View Hardware</a>
        </div>
      </div>
    </div>
    <div class="ind-hero-banner reveal">
      <!-- TODO: 换 veterinary 专属 hero 图 -->
      <img src="../../img/indus/healthcare.png" alt="Veterinary professional using GMIC voice AI hardware">
    </div>
  </div>
</header>`;
rep('hero', heroOld, heroNew);

/* ---- INTRO: remove ---- */
const introOld = `<!-- ========== 2) INTRO ========== -->
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

`;
rep('intro remove', introOld, '');

/* ---- CHALLENGES: 3 title-only cards, grid-3, no h2 ---- */
const chOld = `<!-- ========== 3) CHALLENGES ========== -->
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
</section>`;
const chNew = `<!-- ========== CHALLENGES ========== -->
<section class="ind-sec ind-sec--dark fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow dark">/ CHALLENGES</div>
    </div>
    <div class="ind-grid grid-3 reveal">
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="door-open"></i></div>
        <h3>Veterinarians move between rooms</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="hand"></i></div>
        <h3>Hands-free workflow required</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="smartphone"></i></div>
        <h3>Mobile phones create workflow friction</h3>
      </div>
    </div>
  </div>
</section>`;
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: 3 title-only cards, single static image ---- */
const solOld = `    <div class="sol-flip reveal" id="solFlip">
      <!-- Left: equal-height image; two stacked imgs cross-fade with the active card -->
      <div class="sol-media">
        <!-- TODO: 4 张后续换 healthcare 专属图 -->
        <img class="sol-img is-active" data-sol="0" src="../../img/cap/mic06-main.png" alt="AI scribe recording hardware">
        <img class="sol-img" data-sol="1" src="../../img/cap/mic06-1.png" alt="Wearable voice recorder">
        <img class="sol-img" data-sol="2" src="../../img/indus/healthcare.png" alt="Home healthcare documentation">
        <img class="sol-img" data-sol="3" src="../../img/cap/MIC06.png" alt="Senior care documentation device">
      </div>`;
const solNew = `    <div class="sol-flip reveal" id="solFlip">
      <!-- Left: single static image (only one suitable image for this industry; no per-card switch) -->
      <div class="sol-media">
        <!-- TODO: 换 veterinary 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/mic06-main.png" alt="GMIC voice recording hardware">
      </div>`;
rep('solutions media', solOld, solNew);

const solPanelOld = `      <div class="sol-panel">
        <div class="eyebrow">/ SOLUTIONS</div>
        <h2 class="section measure-wide">GMIC Healthcare Solutions</h2>
        <div class="sol-cards">
          <div class="sol-card is-active" data-sol="0" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="stethoscope"></i></span>
              <h3>AI Scribe Hardware</h3>
            </div>
            <div class="sol-card-body">
              <p>Dedicated recording devices for AI-powered clinical documentation.</p>
              <div class="sol-chips">
                <span class="chip">Primary Care</span>
                <span class="chip">Specialty Clinics</span>
                <span class="chip">Urgent Care</span>
                <span class="chip">Telehealth</span>
                <span class="chip">Behavioral Health</span>
              </div>
            </div>
          </div>
          <div class="sol-card" data-sol="1" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="mic"></i></span>
              <h3>Wearable Voice Recorders</h3>
            </div>
            <div class="sol-card-body">
              <p>Hands-free recording for healthcare professionals.</p>
              <div class="sol-chips">
                <span class="chip">One-button recording</span>
                <span class="chip">All-day battery</span>
                <span class="chip">Local storage</span>
                <span class="chip">Wi-Fi upload</span>
                <span class="chip">Noise reduction</span>
              </div>
            </div>
          </div>
          <div class="sol-card" data-sol="2" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="house"></i></span>
              <h3>Home Healthcare Documentation</h3>
            </div>
            <div class="sol-card-body">
              <p>Mobile voice capture for caregivers and field workers.</p>
              <div class="sol-chips">
                <span class="chip">Home Health Agencies</span>
                <span class="chip">Visiting Nurses</span>
                <span class="chip">Mobile Healthcare Teams</span>
              </div>
            </div>
          </div>
          <div class="sol-card" data-sol="3" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="heart-handshake"></i></span>
              <h3>Senior Care &amp; Assisted Living</h3>
            </div>
            <div class="sol-card-body">
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
      </div>`;
const solPanelNew = `      <div class="sol-panel">
        <div class="eyebrow">/ SOLUTIONS</div>
        <h2 class="section measure-wide">GMIC Veterinary Solutions</h2>
        <div class="sol-cards">
          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="mic"></i></span>
              <h3>Wearable recorders</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="battery-full"></i></span>
              <h3>All-day battery life</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="upload-cloud"></i></span>
              <h3>Automatic upload</h3>
            </div>
          </div>
        </div>
      </div>`;
rep('solutions panel', solPanelOld, solPanelNew);

/* ---- USE CASES: replace with CASE STUDY (sits after Solutions, before Why Hardware) ---- */
const ucOld = `<!-- ========== 5) USE CASES ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ USE CASES</div>
      <h2 class="section measure-wide">Common Use Cases</h2>
    </div>
    <div class="ind-grid grid-4 reveal uc-static">
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
</section>`;
const csNew = `<!-- ========== CASE STUDY ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ CASE STUDY</div>
    </div>
    <div class="reveal">
      <div class="ind-card cs-card"><h3>ScribbleVet</h3></div>
    </div>
  </div>
</section>`;
rep('usecases->casestudy', ucOld, csNew);

/* ---- RELATED: add Healthcare link ---- */
rep('related',
  `      <div class="rel-row">
        <a class="rel-link" href="../enterprise/index.html">Enterprise AI</a>`,
  `      <div class="rel-row">
        <a class="rel-link" href="../healthcare/index.html">Healthcare Voice AI</a>
        <a class="rel-link" href="../enterprise/index.html">Enterprise AI</a>`);

/* ---- FINAL CTA: heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build healthcare AI hardware?</h2>',
  '<h2 class="section reveal">Ready to build veterinary AI hardware?</h2>');

/* ---- SOLUTIONS JS: guard image switch so a single static image never disappears ---- */
rep('js guard',
  `  function setActive(i) {
    cards.forEach(function (c, idx) { c.classList.toggle('is-active', idx === i); });
    imgs.forEach(function (im, idx) { im.classList.toggle('is-active', idx === i); });
  }`,
  `  function setActive(i) {
    cards.forEach(function (c, idx) { c.classList.toggle('is-active', idx === i); });
    // Single static image on this page → only cross-fade when there are multiple images.
    if (imgs.length > 1) imgs.forEach(function (im, idx) { im.classList.toggle('is-active', idx === i); });
  }`);

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('veterinary nav desktop active:', h.includes('industries/veterinary/index.html" class="dropdown-link nav-current"'));
console.log('veterinary nav mobile active:', h.includes('industries/veterinary/index.html" class="mobile-nav-link active"'));
console.log('healthcare desktop NOT active:', !h.includes('industries/healthcare/index.html" class="dropdown-link nav-current"'));
console.log('intro removed:', !h.includes('intro-lead'));
console.log('use-cases removed:', !h.includes('Common Use Cases'));
console.log('case study present:', h.includes('/ CASE STUDY') && h.includes('ScribbleVet'));
console.log('still has Why/Cap/Process:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES') && h.includes('IMPLEMENTATION PROCESS'));
