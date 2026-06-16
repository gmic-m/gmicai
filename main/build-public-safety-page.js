const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'field-service', 'index.html');  // base
const outDir = path.join(BASE, 'industries', 'public-safety');
const out = path.join(outDir, 'index.html');

let h = fs.readFileSync(src, 'utf8');
const checks = [];
function rep(label, oldS, newS) {
  if (h.indexOf(oldS) === -1) { checks.push(label + ': NOT FOUND'); return; }
  h = h.split(oldS).join(newS);
  checks.push(label + ': ok');
}

/* ---- HEAD ---- */
rep('title',
  '<title>Field Service Documentation Hardware — Voice Capture for Technicians | GMIC.AI</title>',
  '<title>Public Safety Voice Capture Solutions — Secure Documentation Hardware | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Public safety voice capture hardware from GMIC — secure voice documentation and public safety recording devices for law enforcement voice capture in offline, evidence-grade environments." />');
checks.push('meta: ' + (h.includes('law enforcement voice capture') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/field-service/', 'https://gmic.ai/industries/public-safety/');

/* ---- NAV: Field Service -> plain, add Public Safety (active) ---- */
rep('nav desktop',
  '<a href="../../industries/field-service/index.html" class="dropdown-link nav-current" aria-current="page">Field Service</a>',
  '<a href="../../industries/field-service/index.html" class="dropdown-link">Field Service</a>\n              <a href="../../industries/public-safety/index.html" class="dropdown-link nav-current" aria-current="page">Public Safety</a>');
rep('nav mobile',
  '<a href="../../industries/field-service/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Field Service</a>',
  '<a href="../../industries/field-service/index.html" class="mobile-nav-link">Field Service</a>\n      <a href="../../industries/public-safety/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Public Safety</a>');

/* ---- HERO ---- */
rep('hero eyebrow', '/ INDUSTRIES — FIELD SERVICE', '/ INDUSTRIES — PUBLIC SAFETY');
rep('hero h1', '<h1 class="display">Field Service Documentation Hardware</h1>', '<h1 class="display">Public Safety Voice Capture Solutions</h1>');
rep('hero lede', '<p class="lede">Voice-first documentation tools for technicians and field teams.</p>', '<p class="lede">Secure voice documentation hardware for public safety environments.</p>');
rep('hero banner',
  `      <!-- TODO: 换 field service 专属 hero 图 -->
      <img src="../../img/indus/field.png" alt="Field service technician using GMIC voice AI hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">`,
  `      <!-- TODO: 换 public safety 专属 hero 图 -->
      <img src="../../img/platform/05.jpg" alt="Public safety voice documentation hardware by GMIC">`);

/* ---- CHALLENGES ---- */
const chOld = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="hand"></i></div>
        <h3>Workers wear gloves</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="keyboard-off"></i></div>
        <h3>Typing is impractical</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="smartphone"></i></div>
        <h3>Mobile apps slow down workflows</h3>
      </div>`;
const chNew = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="file-warning"></i></div>
        <h3>Evidence documentation</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="shield-check"></i></div>
        <h3>Security requirements</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="wifi-off"></i></div>
        <h3>Offline environments</h3>
      </div>`;
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 field service 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/indus/field.png" alt="GMIC field service voice hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 public safety 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/platform/05.jpg" alt="GMIC secure voice hardware for public safety">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Field Service Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Public Safety Solutions</h2>');
const solCardsOld = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="watch"></i></span>
              <h3>Wearable devices</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="wifi-off"></i></span>
              <h3>Offline recording</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="upload-cloud"></i></span>
              <h3>Direct upload</h3>
            </div>
          </div>`;
const solCardsNew = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="hard-drive"></i></span>
              <h3>Local storage</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="lock"></i></span>
              <h3>Secure upload</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="server"></i></span>
              <h3>Private deployment</h3>
            </div>
          </div>`;
rep('solutions cards', solCardsOld, solCardsNew);

/* ---- REMOVE chip strip section (this page omits Ideal For / Industries) ---- */
const chipBlock = `<!-- ========== INDUSTRIES (chip strip) ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ INDUSTRIES</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">HVAC</span>
      <span class="chip">Plumbing</span>
      <span class="chip">Construction</span>
      <span class="chip">Utilities</span>
    </div>
  </div>
</section>

`;
rep('remove chip strip', chipBlock, '');

/* ---- RELATED: swap Sales Intelligence -> Field Service ---- */
rep('related',
  '<a class="rel-link" href="../sales-intelligence/index.html">Sales Intelligence</a>',
  '<a class="rel-link" href="../field-service/index.html">Field Service</a>');

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build field service hardware?</h2>',
  '<h2 class="section reveal">Ready to build public safety voice hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('public-safety desktop active:', h.includes('industries/public-safety/index.html" class="dropdown-link nav-current"'));
console.log('public-safety mobile active:', h.includes('industries/public-safety/index.html" class="mobile-nav-link active"'));
console.log('field NOT active (desktop):', !h.includes('industries/field-service/index.html" class="dropdown-link nav-current"'));
console.log('chip strip removed:', !h.includes('chip strip') && !h.includes('>HVAC<'));
console.log('no field body text left:', !h.includes('GMIC Field Service Solutions') && !h.includes('Workers wear gloves'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
