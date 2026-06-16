const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'sales-intelligence', 'index.html');  // base: sales (Process component + chip strip + cut structure)
const outDir = path.join(BASE, 'industries', 'field-service');
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
  '<title>Sales Intelligence Hardware — Conversation Recording Devices | GMIC.AI</title>',
  '<title>Field Service Documentation Hardware — Voice Capture for Technicians | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Field service documentation hardware from GMIC — voice-first field service recording and technician voice capture devices for hands-free, glove-friendly documentation." />');
checks.push('meta: ' + (h.includes('technician voice capture') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/sales-intelligence/', 'https://gmic.ai/industries/field-service/');

/* ---- NAV: Sales -> plain, Field Service -> active (desktop + mobile) ---- */
rep('nav desktop sales->plain',
  '<a href="../../industries/sales-intelligence/index.html" class="dropdown-link nav-current" aria-current="page">Sales Intelligence</a>',
  '<a href="../../industries/sales-intelligence/index.html" class="dropdown-link">Sales Intelligence</a>');
rep('nav desktop field->active',
  '<a href="../../industries/field-service/index.html" class="dropdown-link">Field Service</a>',
  '<a href="../../industries/field-service/index.html" class="dropdown-link nav-current" aria-current="page">Field Service</a>');
rep('nav mobile sales->plain',
  '<a href="../../industries/sales-intelligence/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Sales Intelligence</a>',
  '<a href="../../industries/sales-intelligence/index.html" class="mobile-nav-link">Sales Intelligence</a>');
rep('nav mobile field->active',
  '<a href="../../industries/field-service/index.html" class="mobile-nav-link">Field Service</a>',
  '<a href="../../industries/field-service/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Field Service</a>');

/* ---- HERO ---- */
rep('hero eyebrow', '/ INDUSTRIES — SALES INTELLIGENCE', '/ INDUSTRIES — FIELD SERVICE');
rep('hero h1', '<h1 class="display">Sales Intelligence Hardware</h1>', '<h1 class="display">Field Service Documentation Hardware</h1>');
rep('hero lede', '<p class="lede">Capture more customer conversations with dedicated voice hardware.</p>', '<p class="lede">Voice-first documentation tools for technicians and field teams.</p>');
rep('hero banner',
  `      <!-- TODO: 换 sales 专属 hero 图 -->
      <img src="../../img/cap/mic06-1.png" alt="GMIC voice hardware for sales conversations">`,
  `      <!-- TODO: 换 field service 专属 hero 图 -->
      <img src="../../img/indus/field.png" alt="Field service technician using GMIC voice AI hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">`);

/* ---- CHALLENGES ---- */
const chOld = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="circle-off"></i></div>
        <h3>Reps forget to start recording</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="smartphone"></i></div>
        <h3>Mobile apps create friction</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="video-off"></i></div>
        <h3>Customer interactions happen outside Zoom</h3>
      </div>`;
const chNew = `      <div class="ind-card">
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
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 sales 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/mic06-1.png" alt="GMIC voice recording hardware for sales">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 field service 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/indus/field.png" alt="GMIC field service voice hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Sales Intelligence Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Field Service Solutions</h2>');
const solCardsOld = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="circle-dot"></i></span>
              <h3>One-button wearable recorder</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="upload-cloud"></i></span>
              <h3>Automatic upload</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="database"></i></span>
              <h3>CRM integration workflows</h3>
            </div>
          </div>`;
const solCardsNew = `          <div class="sol-card is-active" tabindex="0">
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
rep('solutions cards', solCardsOld, solCardsNew);

/* ---- chip strip: IDEAL FOR -> INDUSTRIES ---- */
const chipOld = `      <div class="eyebrow">/ IDEAL FOR</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">Gong</span>
      <span class="chip">Outreach</span>
      <span class="chip">Clari</span>
      <span class="chip">Revenue intelligence platforms</span>
    </div>`;
const chipNew = `      <div class="eyebrow">/ INDUSTRIES</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">HVAC</span>
      <span class="chip">Plumbing</span>
      <span class="chip">Construction</span>
      <span class="chip">Utilities</span>
    </div>`;
rep('chip strip', chipOld, chipNew);

/* ---- RELATED: swap self (Field Service) -> Sales Intelligence ---- */
rep('related',
  '<a class="rel-link" href="../field-service/index.html">Field Service</a>',
  '<a class="rel-link" href="../sales-intelligence/index.html">Sales Intelligence</a>');

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build sales intelligence hardware?</h2>',
  '<h2 class="section reveal">Ready to build field service hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('field desktop active:', h.includes('industries/field-service/index.html" class="dropdown-link nav-current"'));
console.log('field mobile active:', h.includes('industries/field-service/index.html" class="mobile-nav-link active"'));
console.log('sales NOT active (desktop):', !h.includes('industries/sales-intelligence/index.html" class="dropdown-link nav-current"'));
console.log('no sales body text left:', !h.includes('GMIC Sales Intelligence Solutions') && !h.includes('CRM integration workflows') && !h.includes('Revenue intelligence platforms'));
console.log('industries chips (field):', h.includes('>HVAC<') && h.includes('>Utilities<'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
