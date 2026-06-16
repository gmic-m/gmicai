const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'enterprise', 'index.html');   // base: enterprise (Process component + chip strip + cut structure)
const outDir = path.join(BASE, 'industries', 'sales-intelligence');
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
  '<title>Enterprise AI Hardware Solutions | GMIC.AI</title>',
  '<title>Sales Intelligence Hardware — Conversation Recording Devices | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Sales intelligence hardware from GMIC — dedicated sales call recording devices and conversation intelligence hardware. A sales AI recorder that captures more customer conversations." />');
checks.push('meta: ' + (h.includes('conversation intelligence hardware') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/enterprise/', 'https://gmic.ai/industries/sales-intelligence/');

/* ---- NAV desktop: Enterprise -> plain, add Sales Intelligence (active) ---- */
rep('nav desktop',
  `              <a href="../../industries/enterprise/index.html" class="dropdown-link nav-current" aria-current="page">Enterprise AI</a>
              <a href="../../industries/field-service/index.html" class="dropdown-link">Field Service</a>`,
  `              <a href="../../industries/enterprise/index.html" class="dropdown-link">Enterprise AI</a>
              <a href="../../industries/sales-intelligence/index.html" class="dropdown-link nav-current" aria-current="page">Sales Intelligence</a>
              <a href="../../industries/field-service/index.html" class="dropdown-link">Field Service</a>`);

/* ---- NAV mobile: Enterprise -> plain, add Sales Intelligence (active) ---- */
rep('nav mobile',
  `      <a href="../../industries/enterprise/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Enterprise AI</a>
      <a href="../../industries/field-service/index.html" class="mobile-nav-link">Field Service</a>`,
  `      <a href="../../industries/enterprise/index.html" class="mobile-nav-link">Enterprise AI</a>
      <a href="../../industries/sales-intelligence/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Sales Intelligence</a>
      <a href="../../industries/field-service/index.html" class="mobile-nav-link">Field Service</a>`);

/* ---- HERO ---- */
rep('hero eyebrow', '/ INDUSTRIES — ENTERPRISE', '/ INDUSTRIES — SALES INTELLIGENCE');
rep('hero h1', '<h1 class="display">Enterprise AI Hardware Solutions</h1>', '<h1 class="display">Sales Intelligence Hardware</h1>');
rep('hero lede', '<p class="lede">Dedicated voice hardware for enterprise AI applications.</p>', '<p class="lede">Capture more customer conversations with dedicated voice hardware.</p>');
rep('hero banner',
  `      <!-- TODO: 换 enterprise 专属 hero 图 -->
      <img src="../../img/indus/enterprise.png" alt="Enterprise team using GMIC voice AI hardware" onerror="this.onerror=null;this.src='../../img/platform/01.jpg'">`,
  `      <!-- TODO: 换 sales 专属 hero 图 -->
      <img src="../../img/cap/mic06-1.png" alt="GMIC voice hardware for sales conversations">`);

/* ---- CHALLENGES ---- */
const chOld = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="bell-off"></i></div>
        <h3>Employees forget to use recording apps</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="shield"></i></div>
        <h3>Enterprise environments require consistency</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="server"></i></div>
        <h3>Organizations need centralized deployment</h3>
      </div>`;
const chNew = `      <div class="ind-card">
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
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 enterprise 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/indus/enterprise.png" alt="GMIC enterprise voice hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 sales 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/mic06-1.png" alt="GMIC voice recording hardware for sales">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Enterprise Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Sales Intelligence Solutions</h2>');
const solCardsOld = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="badge-check"></i></span>
              <h3>Smart badges</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="mic"></i></span>
              <h3>Voice capture devices</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="workflow"></i></span>
              <h3>Enterprise deployment workflows</h3>
            </div>
          </div>`;
const solCardsNew = `          <div class="sol-card is-active" tabindex="0">
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
rep('solutions cards', solCardsOld, solCardsNew);

/* ---- chip strip: INDUSTRIES -> IDEAL FOR ---- */
const chipOld = `      <div class="eyebrow">/ INDUSTRIES</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">Corporate operations</span>
      <span class="chip">Consulting</span>
      <span class="chip">Internal AI assistants</span>
    </div>`;
const chipNew = `      <div class="eyebrow">/ IDEAL FOR</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">Gong</span>
      <span class="chip">Outreach</span>
      <span class="chip">Clari</span>
      <span class="chip">Revenue intelligence platforms</span>
    </div>`;
rep('chip strip', chipOld, chipNew);

/* ---- RELATED: swap Veterinary -> Enterprise AI (don't self-link) ---- */
rep('related',
  `        <a class="rel-link" href="../healthcare/index.html">Healthcare Voice AI</a>
        <a class="rel-link" href="../veterinary/index.html">Veterinary AI</a>
        <a class="rel-link" href="../field-service/index.html">Field Service</a>`,
  `        <a class="rel-link" href="../healthcare/index.html">Healthcare Voice AI</a>
        <a class="rel-link" href="../enterprise/index.html">Enterprise AI</a>
        <a class="rel-link" href="../field-service/index.html">Field Service</a>`);

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build enterprise AI hardware?</h2>',
  '<h2 class="section reveal">Ready to build sales intelligence hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('sales desktop active:', h.includes('industries/sales-intelligence/index.html" class="dropdown-link nav-current"'));
console.log('sales mobile active:', h.includes('industries/sales-intelligence/index.html" class="mobile-nav-link active"'));
console.log('enterprise NOT active (desktop):', !h.includes('industries/enterprise/index.html" class="dropdown-link nav-current"'));
console.log('no enterprise body text left:', !h.includes('GMIC Enterprise Solutions') && !h.includes('Smart badges') && !h.includes('Corporate operations'));
console.log('ideal for chips:', h.includes('/ IDEAL FOR') && h.includes('Revenue intelligence platforms'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
