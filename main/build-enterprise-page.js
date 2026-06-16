const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'veterinary', 'index.html');   // base: veterinary (has Process component + cut structure)
const outDir = path.join(BASE, 'industries', 'enterprise');
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
  '<title>Veterinary AI Documentation Hardware | GMIC.AI</title>',
  '<title>Enterprise AI Hardware Solutions | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Enterprise AI hardware from GMIC — dedicated enterprise voice recorders, smart badges, and business AI devices for enterprise AI applications and centralized deployment." />');
checks.push('meta: ' + (h.includes('business AI devices') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/veterinary/', 'https://gmic.ai/industries/enterprise/');

/* ---- NAV: Veterinary -> plain, Enterprise -> active (desktop + mobile) ---- */
rep('nav desktop veterinary->plain',
  '<a href="../../industries/veterinary/index.html" class="dropdown-link nav-current" aria-current="page">Veterinary AI</a>',
  '<a href="../../industries/veterinary/index.html" class="dropdown-link">Veterinary AI</a>');
rep('nav desktop enterprise->active',
  '<a href="../../industries/enterprise/index.html" class="dropdown-link">Enterprise AI</a>',
  '<a href="../../industries/enterprise/index.html" class="dropdown-link nav-current" aria-current="page">Enterprise AI</a>');
rep('nav mobile veterinary->plain',
  '<a href="../../industries/veterinary/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Veterinary AI</a>',
  '<a href="../../industries/veterinary/index.html" class="mobile-nav-link">Veterinary AI</a>');
rep('nav mobile enterprise->active',
  '<a href="../../industries/enterprise/index.html" class="mobile-nav-link">Enterprise AI</a>',
  '<a href="../../industries/enterprise/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Enterprise AI</a>');

/* ---- HERO ---- */
const heroOld = `<header class="ind-hero fade-section">
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
const heroNew = `<header class="ind-hero fade-section">
  <div class="container">
    <div class="ind-hero-top reveal">
      <div class="ind-hero-lead">
        <div class="eyebrow dark">/ INDUSTRIES — ENTERPRISE</div>
        <h1 class="display">Enterprise AI Hardware Solutions</h1>
      </div>
      <div class="ind-hero-aside">
        <p class="lede">Dedicated voice hardware for enterprise AI applications.</p>
        <div class="ind-hero-cta">
          <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb" target="_blank" rel="noopener" class="btn btn-blue">Start a Project</a>
          <a href="../../index.html#products" class="btn btn-ghost">Learn More</a>
        </div>
      </div>
    </div>
    <div class="ind-hero-banner reveal">
      <!-- TODO: 换 enterprise 专属 hero 图 -->
      <img src="../../img/indus/enterprise.png" alt="Enterprise team using GMIC voice AI hardware" onerror="this.onerror=null;this.src='../../img/platform/01.jpg'">
    </div>
  </div>
</header>`;
rep('hero', heroOld, heroNew);

/* ---- CHALLENGES (3 title-only cards) ---- */
const chOld = `    <div class="ind-grid grid-3 reveal">
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
    </div>`;
const chNew = `    <div class="ind-grid grid-3 reveal">
      <div class="ind-card">
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
      </div>
    </div>`;
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 veterinary 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/mic06-main.png" alt="GMIC voice recording hardware">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 enterprise 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/indus/enterprise.png" alt="GMIC enterprise voice hardware" onerror="this.onerror=null;this.src='../../img/platform/02.jpg'">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Veterinary Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Enterprise Solutions</h2>');
const solCardsOld = `        <div class="sol-cards">
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
        </div>`;
const solCardsNew = `        <div class="sol-cards">
          <div class="sol-card is-active" tabindex="0">
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
          </div>
        </div>`;
rep('solutions cards', solCardsOld, solCardsNew);

/* ---- CASE STUDY -> INDUSTRIES chip strip ---- */
const csOld = `<!-- ========== CASE STUDY ========== -->
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
const indNew = `<!-- ========== INDUSTRIES (chip strip) ========== -->
<section class="ind-sec ind-sec--light fade-section">
  <div class="container">
    <div class="ind-head reveal">
      <div class="eyebrow">/ INDUSTRIES</div>
    </div>
    <div class="sol-chips reveal">
      <span class="chip">Corporate operations</span>
      <span class="chip">Consulting</span>
      <span class="chip">Internal AI assistants</span>
    </div>
  </div>
</section>`;
rep('casestudy->industries', csOld, indNew);

/* ---- RELATED: drop self (Enterprise), swap in Veterinary ---- */
rep('related',
  `        <a class="rel-link" href="../healthcare/index.html">Healthcare Voice AI</a>
        <a class="rel-link" href="../enterprise/index.html">Enterprise AI</a>
        <a class="rel-link" href="../field-service/index.html">Field Service</a>`,
  `        <a class="rel-link" href="../healthcare/index.html">Healthcare Voice AI</a>
        <a class="rel-link" href="../veterinary/index.html">Veterinary AI</a>
        <a class="rel-link" href="../field-service/index.html">Field Service</a>`);

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build veterinary AI hardware?</h2>',
  '<h2 class="section reveal">Ready to build enterprise AI hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('enterprise desktop active:', h.includes('industries/enterprise/index.html" class="dropdown-link nav-current"'));
console.log('enterprise mobile active:', h.includes('industries/enterprise/index.html" class="mobile-nav-link active"'));
console.log('veterinary NOT active (desktop):', !h.includes('industries/veterinary/index.html" class="dropdown-link nav-current"'));
console.log('no veterinary text left in body:', !h.includes('Veterinary AI Documentation') && !h.includes('ScribbleVet') && !h.includes('GMIC Veterinary Solutions'));
console.log('industries chip strip:', h.includes('/ INDUSTRIES</div>') && h.includes('Internal AI assistants'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
