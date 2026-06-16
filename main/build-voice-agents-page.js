const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const src = path.join(BASE, 'industries', 'public-safety', 'index.html');  // base: no chip strip, Process component, new-nav pattern
const outDir = path.join(BASE, 'industries', 'voice-agents');
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
  '<title>Public Safety Voice Capture Solutions — Secure Documentation Hardware | GMIC.AI</title>',
  '<title>Voice Agent Hardware — Custom AI Agent Devices | GMIC.AI</title>');
h = h.replace(/<meta name="description"[^>]*\/>/,
  '<meta name="description" content="Voice agent hardware from GMIC — custom AI agent devices and custom voice AI hardware for voice AI agents and conversational AI systems." />');
checks.push('meta: ' + (h.includes('custom voice AI hardware') ? 'ok' : 'NOT FOUND'));
rep('canonical', 'https://gmic.ai/industries/public-safety/', 'https://gmic.ai/industries/voice-agents/');

/* ---- NAV: Public Safety -> plain, add Voice Agents (active) ---- */
rep('nav desktop',
  '<a href="../../industries/public-safety/index.html" class="dropdown-link nav-current" aria-current="page">Public Safety</a>',
  '<a href="../../industries/public-safety/index.html" class="dropdown-link">Public Safety</a>\n              <a href="../../industries/voice-agents/index.html" class="dropdown-link nav-current" aria-current="page">Voice Agents</a>');
rep('nav mobile',
  '<a href="../../industries/public-safety/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Public Safety</a>',
  '<a href="../../industries/public-safety/index.html" class="mobile-nav-link">Public Safety</a>\n      <a href="../../industries/voice-agents/index.html" class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;">Voice Agents</a>');

/* ---- HERO ---- */
rep('hero eyebrow', '/ INDUSTRIES — PUBLIC SAFETY', '/ INDUSTRIES — VOICE AGENTS');
rep('hero h1', '<h1 class="display">Public Safety Voice Capture Solutions</h1>', '<h1 class="display">Voice Agent Hardware</h1>');
rep('hero lede', '<p class="lede">Secure voice documentation hardware for public safety environments.</p>', '<p class="lede">Custom hardware for voice AI agents and conversational AI systems.</p>');
rep('hero banner',
  `      <!-- TODO: 换 public safety 专属 hero 图 -->
      <img src="../../img/platform/05.jpg" alt="Public safety voice documentation hardware by GMIC">`,
  `      <!-- TODO: 换 voice agent 专属 hero 图 -->
      <img src="../../img/cap/MIC06.png" alt="GMIC voice agent hardware">`);

/* ---- CHALLENGES ---- */
const chOld = `      <div class="ind-card">
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
const chNew = `      <div class="ind-card">
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
rep('challenges', chOld, chNew);

/* ---- SOLUTIONS: image + heading + cards (4 cards) ---- */
rep('solutions image',
  `      <div class="sol-media">
        <!-- TODO: 换 public safety 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/platform/05.jpg" alt="GMIC secure voice hardware for public safety">
      </div>`,
  `      <div class="sol-media">
        <!-- TODO: 换 voice agent 设备/场景图 -->
        <img class="sol-img is-active" src="../../img/cap/MIC06.png" alt="GMIC voice agent hardware">
      </div>`);
rep('solutions heading',
  '<h2 class="section measure-wide">GMIC Public Safety Solutions</h2>',
  '<h2 class="section measure-wide">GMIC Voice Agents Solutions</h2>');
const solCardsOld = `          <div class="sol-card is-active" tabindex="0">
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
const solCardsNew = `          <div class="sol-card is-active" tabindex="0">
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
rep('solutions cards (3->4)', solCardsOld, solCardsNew);

/* ---- RELATED: swap Telecom -> Sales Intelligence ---- */
rep('related',
  '<a class="rel-link" href="../telecom/index.html">Telecom AI</a>',
  '<a class="rel-link" href="../sales-intelligence/index.html">Sales Intelligence</a>');

/* ---- FINAL CTA heading ---- */
rep('cta h2',
  '<h2 class="section reveal">Ready to build public safety voice hardware?</h2>',
  '<h2 class="section reveal">Ready to build voice agent hardware?</h2>');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, h, 'utf8');

console.log('Wrote', out);
checks.forEach(function (c) { console.log('  ' + c); });
console.log('--- sanity ---');
console.log('h1 count:', (h.match(/<h1/g) || []).length);
console.log('voice-agents desktop active:', h.includes('industries/voice-agents/index.html" class="dropdown-link nav-current"'));
console.log('voice-agents mobile active:', h.includes('industries/voice-agents/index.html" class="mobile-nav-link active"'));
console.log('public-safety NOT active (desktop):', !h.includes('industries/public-safety/index.html" class="dropdown-link nav-current"'));
console.log('solutions card count:', (h.match(/class="sol-card( is-active)?" tabindex/g) || []).length);
console.log('no public-safety body text:', !h.includes('GMIC Public Safety Solutions') && !h.includes('Evidence documentation'));
console.log('process component present:', h.includes('id="procFlow"'));
console.log('why+cap present:', h.includes('WHY DEDICATED HARDWARE') && h.includes('HARDWARE CAPABILITIES'));
