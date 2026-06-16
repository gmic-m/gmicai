const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'voice-agents', 'index.html');  // base: no chip strip, Process component, new-nav pattern
const outDir = path.join(BASE, 'industries', 'logistics');
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
  '<title>Voice Agent Hardware — Custom AI Agent Devices | GMIC.AI</title>',
  '<title>Transportation & Logistics Voice Solutions — Fleet Hardware | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Transportation and logistics voice hardware from GMIC — fleet voice recording, logistics voice documentation, and transportation AI hardware for drivers and fleet operations." />');
checks.push('meta: ' + (h.includes('fleet voice recording') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/voice-agents/', 'https://gmic.ai/industries/logistics/');

/* ---- NAV: Voice Agents -> plain, add Logistics & Transportation (active) ---- */
rep('nav desktop',
  '<a href="../../industries/voice-agents/index.html" class="dropdown-link nav-current" aria-current="page">Voice Agents</a>',
  '<a href="../../industries/voice-agents/index.html" class="dropdown-link">Voice Agents</a>\n              <a href="../../industries/logistics/index.html" class="dropdown-link nav-current" aria-current="page">Logistics & Transportation</a>');
rep('nav mobile',
  '<a href="../../industries/voice-agents/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Voice Agents</a>',
  '<a href="../../industries/voice-agents/index.html" class="mobile-nav-link">Voice Agents</a>\n      <a href="../../industries/logistics/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Logistics & Transportation</a>');

/* ---- HERO ---- */
rep('hero eyebrow', '/ INDUSTRIES — VOICE AGENTS', '/ INDUSTRIES — LOGISTICS & TRANSPORTATION');
rep('hero h1', '<h1 class="display">Voice Agent Hardware</h1>', '<h1 class="display">Transportation & Logistics Voice Solutions</h1>');
rep('hero lede', '<p class="lede">Custom hardware for voice AI agents and conversational AI systems.</p>', '<p class="lede">Voice hardware for transportation, fleet, and logistics operations.</p>');
rep('hero banner',
  `      <!-- TODO: 换 voice agent 专属 hero 图 -->
      <img src="../../img/cap/MIC06.png" alt="GMIC voice agent hardware">`,
  `      <!-- TODO: 换 logistics 专属 hero 图 -->
      <img src="../../img/platform/02.jpg" alt="GMIC voice hardware for transportation and logistics">`);

/* ---- CHALLENGES ---- */
const chOld = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="cpu"></i></div>
        <h3>AI agents need physical interfaces</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="unplug"></i></div>
        <h3>Existing hardware doesn't match workflows</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="smartphone"></i></div>
        <h3>Consumer devices create limitations</h3>
      </div>`;
const chNew = `      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="keyboard-off"></i></div>
        <h3>Drivers can't type</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="phone-off"></i></div>
        <h3>Mobile phones create safety concerns</h3>
      </div>
      <div class="ind-card">
        <div class="ind-card-ic"><i data-lucide="clipboard-list"></i></div>
        <h3>Documentation requirements</h3>
      </div>`;
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards (4 -> 3) ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 voice agent 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/MIC06.png" alt="GMIC voice agent hardware">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 logistics 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/platform/02.jpg" alt="GMIC voice hardware for fleet and logistics">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Voice Agents Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Logistics & Transportation Solutions</h2>');
const solCardsOld = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="radio"></i></span>
              <h3>Push-to-talk devices</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="badge-check"></i></span>
              <h3>Smart badges</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="monitor"></i></span>
              <h3>Voice-enabled terminals</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="circuit-board"></i></span>
              <h3>Embedded AI hardware</h3>
            </div>
          </div>`;
const solCardsNew = `          <div class="sol-card is-active" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="circle-dot"></i></span>
              <h3>One-touch recording</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="wifi-off"></i></span>
              <h3>Offline operation</h3>
            </div>
          </div>
          <div class="sol-card" tabindex="0">
            <div class="sol-card-head">
              <span class="sol-ic"><i data-lucide="truck"></i></span>
              <h3>Fleet deployment</h3>
            </div>
          </div>`;
rep('solutions cards (4->3)', solCardsOld, solCardsNew);

/* ---- RELATED: swap Sales Intelligence -> Public Safety ---- */
rep('related',
  '<a class="rel-link" href="../sales-intelligence/index.html">Sales Intelligence</a>',
  '<a class="rel-link" href="../public-safety/index.html">Public Safety</a>');

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build voice agent hardware?</h2>',
  '<h2 class="section reveal">Ready to build logistics voice hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('logistics desktop active:', h.includes('industries/logistics/index.html" class="dropdown-link nav-current"'));
console.log('logistics mobile active:', h.includes('industries/logistics/index.html" class="mobile-nav-link active"'));
console.log('voice-agents NOT active (desktop):', !h.includes('industries/voice-agents/index.html" class="dropdown-link nav-current"'));
console.log('solutions card count:', (h.match(/class="sol-card( is-active)?" tabindex/g) || []).length);
console.log('no voice-agents body text:', !h.includes('GMIC Voice Agents Solutions') && !h.includes('Push-to-talk devices'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
