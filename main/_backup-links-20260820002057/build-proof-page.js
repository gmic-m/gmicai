const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const aboutPath = path.join(BASE, 'about', 'index.html');
const outDir = path.join(BASE, 'proof');
const outPath = path.join(outDir, 'index.html');

const BOOKING = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb';

const a = fs.readFileSync(aboutPath, 'utf8');

function between(src, startMarker, endMarker, fromIdx = 0) {
  const s = src.indexOf(startMarker, fromIdx);
  if (s === -1) throw new Error('start marker not found: ' + startMarker);
  const e = src.indexOf(endMarker, s);
  if (e === -1) throw new Error('end marker not found: ' + endMarker);
  return { text: src.slice(s, e + endMarker.length), start: s, end: e + endMarker.length };
}

/* ---- Extract verbatim blocks from about/index.html (same ../ depth) ---- */
const headEnd = a.indexOf('</head>');
let head = a.slice(0, headEnd); // <!DOCTYPE> ... <style>..nav+ab styles..</style>

let nav = between(a, '<nav class="nav" id="nav">', '</nav>').text;
const mobileNav = between(a, '<div class="mobile-nav" id="mobileNav">', '<div class="mobile-nav-overlay" id="mobileNavOverlay"></div>').text;
const news = between(a, '<section class="ab-news">', '</section>').text;
const footerBlock = between(a, '<footer class="footer"', '</footer>').text;
const footEnd = a.indexOf('</footer>') + '</footer>'.length;
const scriptsStart = a.indexOf('<script>', footEnd);
const bodyEnd = a.indexOf('</body>');
const scripts = a.slice(scriptsStart, bodyEnd).trim();

/* ---- Modify head: title + meta + append pf-* styles before </style> ---- */
head = head.replace('<title>About Us — GMIC.AI</title>', '<title>Proof — GMIC.AI</title>');
head = head.replace(
  /<meta name="description"[^>]*>/,
  '<meta name="description" content="Proof of GMIC.AI: real AI-hardware projects — manufacturing scale-up to ~5,000 units, AI co-development, healthcare AI-scribe pilots, field deployment of wearable voice hardware, and enterprise AI evaluation.">'
);

const pfStyles = `
/* ============================================================
   PROOF PAGE — page styles (pf-*) built on the existing tokens.
   Reuses .ab-wrap / .ab-eyebrow(.--dark) from the copied nav/ab block.
   ============================================================ */
/* current-page nav highlight (mirror site's active treatment) */
.nav-link.active{color:var(--blue) !important;font-weight:700;}
.mobile-nav-link.active{color:var(--blue) !important;font-weight:700;}

/* shared dark-section base */
.pf-dark{background:#111;color:#aaa;}
.pf-dark .ab-eyebrow,.pf-dark .ab-eyebrow--dark{color:#aaa;}

.pf-h2{font-family:var(--sans);font-size:clamp(2.125rem,4vw,3.125rem);font-weight:700;letter-spacing:-0.035em;line-height:1.08;color:#111;margin:0;}
.pf-dark .pf-h2{color:#fff;}

.pf-btn{display:inline-block;background:#111;color:#fff;font-family:var(--sans);font-size:0.9rem;font-weight:600;padding:13px 26px;border-radius:100px;text-decoration:none;transition:opacity .15s ease,transform .15s ease;}
.pf-btn:hover{opacity:.88;transform:translateY(-1px);}
.pf-btn--light{background:#fff;color:#111;}

/* ---------- 1. HERO (left-aligned, two-column header + full-width banner) ---------- */
.pf-hero{padding:48px 0 0;background:#fff;border-bottom:1px solid #f0f0f0;}
.pf-hero-top{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:56px;align-items:end;}
.pf-hero .ab-eyebrow{display:block;margin-bottom:18px;}
.pf-hero h1{font-family:var(--sans);font-size:clamp(36px,4.5vw,58px);font-weight:700;letter-spacing:-0.04em;line-height:1.05;color:#111;margin:0;}
.pf-hero h1 .accent{color:var(--blue);}
.pf-hero-lead .pf-btn{margin-top:28px;}
.pf-hero-note{padding-bottom:6px;}
.pf-hero-note p{font-family:var(--sans);font-size:1.0625rem;line-height:1.7;color:#666;max-width:420px;margin:0;}
.pf-hero-banner{margin-top:56px;width:100%;height:clamp(420px,42vw,520px);overflow:hidden;background:#e8eeff;}
.pf-hero-banner img{width:100%;height:100%;object-fit:cover;display:block;}

/* ---------- 2. STATS STRIP (flat row, hairline dividers) ---------- */
.pf-stats-sec{padding:72px 0;background:#fff;border-top:1px solid #f0f0f0;border-bottom:1px solid #f0f0f0;}
.pf-stats{display:grid;grid-template-columns:repeat(4,1fr);}
.pf-stat{padding:0 40px;border-left:1px solid #f0f0f0;}
.pf-stat:first-child{border-left:none;padding-left:0;}
.pf-stat-num{font-family:var(--sans);font-size:clamp(2rem,3vw,2.75rem);font-weight:700;letter-spacing:-0.03em;color:#111;line-height:1.05;}
.pf-stat-cap{font-family:var(--sans);font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#999;margin-top:10px;line-height:1.5;}

/* ---------- 3. CASE STUDIES (alternating image/text rows) ---------- */
.pf-sec{padding:clamp(72px,9vw,120px) 0;background:#fff;}
.pf-sec-head{max-width:760px;margin-bottom:56px;}
.pf-sec-head .ab-eyebrow{display:block;margin-bottom:14px;}
.pf-cases{display:flex;flex-direction:column;}
.pf-row{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:stretch;padding:64px 0;border-top:1px solid #f0f0f0;}
.pf-row:first-child{border-top:none;padding-top:8px;}
.pf-row-media{height:100%;border-radius:12px;overflow:hidden;background:#f0f0f0;}
.pf-row-media img{width:100%;height:100%;object-fit:cover;display:block;}
.pf-row:nth-child(even) .pf-row-media{order:2;}
.pf-row-text{display:flex;flex-direction:column;justify-content:center;}
.pf-row-text .ab-eyebrow{display:block;margin-bottom:14px;}
.pf-row-h{font-family:var(--sans);font-size:clamp(1.5rem,2.4vw,1.75rem);font-weight:700;letter-spacing:-0.02em;line-height:1.18;color:#111;margin:0 0 16px;}
.pf-row-body{font-family:var(--sans);font-size:0.9375rem;line-height:1.75;color:#666;margin:0 0 20px;}
.pf-sub{font-family:var(--sans);font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;color:#999;margin:0 0 10px;}
.pf-checks{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-direction:column;gap:10px;}
.pf-checks li{display:flex;align-items:flex-start;gap:10px;font-family:var(--sans);font-size:0.9375rem;line-height:1.55;color:#111;}
.pf-checks li [data-lucide]{width:18px;height:18px;color:var(--blue);stroke:var(--blue);flex-shrink:0;margin-top:2px;}
.pf-bullets{list-style:none;margin:0 0 20px;padding:0;display:flex;flex-direction:column;gap:8px;}
.pf-bullets li{font-family:var(--sans);font-size:0.9375rem;line-height:1.55;color:#666;padding-left:16px;position:relative;}
.pf-bullets li::before{content:'';position:absolute;left:0;top:9px;width:5px;height:5px;border-radius:50%;background:#cbd5e1;}
.pf-row-muted{font-family:var(--sans);font-size:0.9375rem;font-style:italic;line-height:1.7;color:#999;margin:0;}

/* ---------- 4. WHY THIS MATTERS (dark two-column comparison) ---------- */
.pf-vs{display:grid;grid-template-columns:1fr 1fr;}
.pf-vs-half{padding:0 48px;border-left:1px solid #1e1e1e;}
.pf-vs-half:first-child{padding-left:0;border-left:none;}
.pf-vs-half:last-child{padding-right:0;}
.pf-vs-icon{line-height:0;margin-bottom:18px;}
.pf-vs-icon [data-lucide]{width:26px;height:26px;color:#fff;stroke:#fff;stroke-width:1.8;}
.pf-vs-label{font-family:var(--sans);font-size:1.75rem;font-weight:700;letter-spacing:-0.02em;color:#fff;line-height:1;margin-bottom:14px;}
.pf-vs-line{font-family:var(--sans);font-size:1.0625rem;line-height:1.7;color:#aaa;margin:0;max-width:42ch;}

/* ---------- 5. CTA (dark, centered) ---------- */
.pf-cta{padding:clamp(96px,11vw,140px) 0;text-align:center;}
.pf-cta-inner{max-width:760px;margin:0 auto;}
.pf-cta .ab-eyebrow{display:block;margin-bottom:20px;}
.pf-cta-body{font-family:var(--sans);font-size:1.0625rem;line-height:1.75;color:#aaa;margin:18px auto 0;max-width:600px;}
.pf-cta-actions{margin-top:32px;display:flex;gap:24px;align-items:center;justify-content:center;flex-wrap:wrap;}
.pf-cta-link{font-family:var(--sans);font-size:0.95rem;font-weight:600;color:#fff;text-decoration:none;transition:opacity .15s ease;}
.pf-cta-link:hover{opacity:.7;}

/* ---------- Responsive (<=900px) ---------- */
@media (max-width:900px){
  .pf-hero-top{grid-template-columns:1fr;gap:28px;align-items:start;}
  .pf-hero-note{padding-bottom:0;}
  .pf-hero-note p{max-width:560px;}
  .pf-hero-banner{margin-top:36px;height:clamp(260px,56vw,420px);}
  .pf-stats{grid-template-columns:1fr 1fr;row-gap:40px;}
  .pf-stat{padding:0 24px;}
  .pf-stat:nth-child(odd){border-left:none;padding-left:0;}
  .pf-stat:nth-child(even){border-left:1px solid #f0f0f0;}
  .pf-row{grid-template-columns:1fr;gap:24px;padding:48px 0;}
  .pf-row:nth-child(even) .pf-row-media{order:0;}
  .pf-row-media{height:auto;}
  .pf-row-media img{height:clamp(240px,60vw,300px);}
  .pf-vs{grid-template-columns:1fr;}
  .pf-vs-half{padding:0;}
  .pf-vs-half:last-child{border-left:none;border-top:1px solid #1e1e1e;padding-top:32px;margin-top:32px;}
}
@media (max-width:560px){
  .pf-stats{grid-template-columns:1fr;row-gap:32px;}
  .pf-stat{border-left:none !important;padding-left:0 !important;}
}
`;

head = head.replace('</style>', pfStyles + '\n</style>');

/* ---- Modify nav: Proof link -> ../proof/index.html + active ---- */
nav = nav.replace(
  '<a href="../index.html#proof-cases" class="nav-link">Proof</a>',
  '<a href="../proof/index.html" class="nav-link active" aria-current="page">Proof</a>'
);

const mobileNavOut = mobileNav.replace(
  '<a href="../index.html#proof-cases" class="mobile-nav-link">Proof</a>',
  '<a href="../proof/index.html" class="mobile-nav-link active" aria-current="page">Proof</a>'
);

/* ---------------------------- PROOF BODY ---------------------------- */
const proofBody = `
<!-- ========== 1. HERO (ODM/OEM left-aligned style) ========== -->
<header class="pf-hero">
  <div class="ab-wrap">
    <div class="pf-hero-top">
      <div class="pf-hero-lead">
        <div class="ab-eyebrow">PROOF · CASE EVIDENCE</div>
        <h1>Trusted by AI Companies, <span class="accent">Enterprise Teams</span>, and Product Innovators</h1>
        <a href="${BOOKING}" target="_blank" rel="noopener" class="pf-btn">Start a Project</a>
      </div>
      <div class="pf-hero-note">
        <p>GMIC helps companies move from ideas to deployable hardware. Whether the goal is validating a new workflow, launching a consumer product, or scaling an AI platform into the physical world, our customers rely on GMIC for engineering, prototyping, and manufacturing support.</p>
      </div>
    </div>
  </div>
  <div class="ab-wrap">
    <div class="pf-hero-banner">
      <img src="../img/about/assembly-workers.jpg" alt="GMIC assembly-line workers building hardware at scale">
    </div>
  </div>
</header>

<!-- ========== 2. PROOF STATS STRIP ========== -->
<section class="pf-stats-sec" aria-label="Proof in numbers">
  <div class="ab-wrap">
    <div class="pf-stats">
      <div class="pf-stat">
        <div class="pf-stat-num">~5,000</div>
        <div class="pf-stat-cap">Units sold in 3 months</div>
      </div>
      <div class="pf-stat">
        <div class="pf-stat-num">3rd-Gen</div>
        <div class="pf-stat-cap">Prototype co-developed with an AI software co.</div>
      </div>
      <div class="pf-stat">
        <div class="pf-stat-num">5</div>
        <div class="pf-stat-cap">Healthcare AI-scribe pilot devices delivered</div>
      </div>
      <div class="pf-stat">
        <div class="pf-stat-num">Enterprise</div>
        <div class="pf-stat-cap">Active evaluations with large-scale AI orgs</div>
      </div>
    </div>
  </div>
</section>

<!-- ========== 3. CASE STUDIES (alternating image/text rows) ========== -->
<section class="pf-sec" aria-label="Proven outcomes">
  <div class="ab-wrap">
    <div class="pf-sec-head">
      <div class="ab-eyebrow">PROVEN OUTCOMES</div>
      <h2 class="pf-h2">From idea to deployable hardware.</h2>
    </div>

    <div class="pf-cases">

      <!-- Row 1 — Proof of Manufacturing -->
      <article class="pf-row">
        <div class="pf-row-media">
          <img src="../img/about/assembly-workers.jpg" alt="Workers assembling consumer audio hardware on a GMIC production line">
        </div>
        <div class="pf-row-text">
          <div class="ab-eyebrow">PROOF OF MANUFACTURING</div>
          <h3 class="pf-row-h">5,000 Units Sold in Three Months</h3>
          <p class="pf-row-body">A creator-led consumer-electronics brand partnered with GMIC to launch a bone-conduction audio product. GMIC supported manufacturing, supply-chain coordination, and production scaling.</p>
          <ul class="pf-checks">
            <li><i data-lucide="check"></i><span>Nearly 5,000 units sold within three months</span></li>
            <li><i data-lucide="check"></i><span>Successful product launch</span></li>
            <li><i data-lucide="check"></i><span>Demonstrated manufacturing scalability</span></li>
          </ul>
          <p class="pf-row-muted">This project validates GMIC's ability to support customers beyond prototyping and into commercial production.</p>
        </div>
      </article>

      <!-- Row 2 — Proof of AI Hardware Development -->
      <article class="pf-row">
        <div class="pf-row-media">
          <img src="../img/about/smt-hanwha.jpg" alt="SMT line producing custom AI hardware boards at GMIC">
        </div>
        <div class="pf-row-text">
          <div class="ab-eyebrow">PROOF OF AI HARDWARE DEVELOPMENT</div>
          <h3 class="pf-row-h">Co-Developing Dedicated Hardware with an AI Software Company</h3>
          <p class="pf-row-body">A growing AI software company partnered with GMIC to transform its software workflow into a dedicated hardware experience.</p>
          <p class="pf-sub">GMIC provides</p>
          <ul class="pf-bullets">
            <li>Hardware platform development</li>
            <li>Product customization</li>
            <li>Firmware optimization</li>
            <li>Workflow validation</li>
          </ul>
          <p class="pf-sub">Current status</p>
          <ul class="pf-checks">
            <li><i data-lucide="check"></i><span>Third-generation prototype completed</span></li>
            <li><i data-lucide="check"></i><span>Multiple development iterations completed</span></li>
            <li><i data-lucide="check"></i><span>Ongoing joint product development</span></li>
          </ul>
          <p class="pf-row-muted">This project demonstrates GMIC's ability to work closely with AI companies throughout the hardware development lifecycle.</p>
        </div>
      </article>

      <!-- Row 3 — Proof of AI Scribe Adoption -->
      <article class="pf-row">
        <div class="pf-row-media">
          <img src="../img/about/bv50p.jpg" alt="GMIC voice-hardware device for clinical documentation">
        </div>
        <div class="pf-row-text">
          <div class="ab-eyebrow">PROOF OF AI SCRIBE ADOPTION</div>
          <h3 class="pf-row-h">Supporting Healthcare AI Hardware Pilots</h3>
          <p class="pf-row-body">An AI documentation company engaged GMIC to develop a dedicated voice-hardware solution for clinical documentation workflows.</p>
          <p class="pf-sub">The project included</p>
          <ul class="pf-bullets">
            <li>Custom hardware evaluation</li>
            <li>Workflow validation</li>
            <li>Prototype deployment</li>
          </ul>
          <p class="pf-sub">Results</p>
          <ul class="pf-checks">
            <li><i data-lucide="check"></i><span>Five pilot devices delivered</span></li>
            <li><i data-lucide="check"></i><span>Customer workflow validation completed</span></li>
            <li><i data-lucide="check"></i><span>Hardware evaluation successfully launched</span></li>
          </ul>
          <p class="pf-row-muted">This project highlights the growing demand for dedicated hardware in AI-powered documentation workflows.</p>
        </div>
      </article>

      <!-- Row 4 — Proof of Field Deployment -->
      <article class="pf-row">
        <div class="pf-row-media">
          <img src="../img/about/aoi-inspection.jpg" alt="Automated optical inspection of GMIC wearable voice hardware">
        </div>
        <div class="pf-row-text">
          <div class="ab-eyebrow">PROOF OF FIELD DEPLOYMENT</div>
          <h3 class="pf-row-h">Wearable Voice Hardware for Field Service Teams</h3>
          <p class="pf-row-body">A workflow automation platform selected GMIC's wearable voice hardware for real-world testing with field technicians. Initial pilot feedback showed strong adoption among users, particularly because the wearable form factor reduced workflow friction compared to traditional recording methods.</p>
          <ul class="pf-checks">
            <li><i data-lucide="check"></i><span>Successful field deployment</span></li>
            <li><i data-lucide="check"></i><span>Positive technician feedback</span></li>
            <li><i data-lucide="check"></i><span>Expansion planning underway</span></li>
          </ul>
          <p class="pf-row-muted">Future projections from the customer include significant investment in contractor and home-services adoption over the next several years.</p>
        </div>
      </article>

      <!-- Row 5 — Proof of Enterprise Interest -->
      <article class="pf-row">
        <div class="pf-row-media">
          <img src="../img/about/qc-inspection.jpg" alt="Quality-control inspection of GMIC enterprise-grade voice hardware">
        </div>
        <div class="pf-row-text">
          <div class="ab-eyebrow">PROOF OF ENTERPRISE INTEREST</div>
          <h3 class="pf-row-h">Evaluated by Large-Scale Enterprise AI Organizations</h3>
          <p class="pf-row-body">GMIC is actively engaged with enterprise software and conversation-intelligence organizations exploring dedicated voice hardware. These organizations serve large customer bases and need hardware capable of enterprise-grade deployment, workflow adoption, and long-term scalability.</p>
          <p class="pf-sub">Current activities</p>
          <ul class="pf-checks">
            <li><i data-lucide="check"></i><span>Hardware evaluation</span></li>
            <li><i data-lucide="check"></i><span>Workflow validation</span></li>
            <li><i data-lucide="check"></i><span>Prototype testing</span></li>
            <li><i data-lucide="check"></i><span>Deployment-planning discussions</span></li>
          </ul>
          <p class="pf-row-muted">These engagements reflect growing demand for dedicated hardware within enterprise AI ecosystems.</p>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- ========== 4. WHY THIS MATTERS (dark two-column comparison) ========== -->
<section class="pf-sec pf-dark" aria-label="Why this matters">
  <div class="ab-wrap">
    <div class="pf-sec-head">
      <div class="ab-eyebrow ab-eyebrow--dark">WHY THIS MATTERS</div>
      <h2 class="pf-h2">Most manufacturers can build devices. Few can turn workflows into products.</h2>
    </div>
    <div class="pf-vs">
      <div class="pf-vs-half">
        <div class="pf-vs-icon"><i data-lucide="package" aria-hidden="true"></i></div>
        <div class="pf-vs-label">Most hardware manufacturers</div>
        <p class="pf-vs-line">Can build devices to spec, but stop at the factory door. The software team is left to figure out integration, validation, and deployment alone.</p>
      </div>
      <div class="pf-vs-half">
        <div class="pf-vs-icon"><i data-lucide="rocket" aria-hidden="true"></i></div>
        <div class="pf-vs-label">GMIC</div>
        <p class="pf-vs-line">Combines AI hardware development, firmware engineering, prototype validation, manufacturing support, and deployment planning — so customers move from concept to real-world adoption.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========== 5. CTA (dark) ========== -->
<section class="pf-cta pf-dark" aria-label="From prototype to scale">
  <div class="ab-wrap pf-cta-inner">
    <div class="ab-eyebrow ab-eyebrow--dark">BEGIN</div>
    <h2 class="pf-h2">From prototype to scale.</h2>
    <p class="pf-cta-body">Whether you're building an AI scribe platform, a voice agent, an enterprise workflow solution, or a consumer product, GMIC bridges the gap between software and hardware.</p>
    <div class="pf-cta-actions">
      <a href="${BOOKING}" target="_blank" rel="noopener" class="pf-btn pf-btn--light">Start Your Project</a>
      <a href="https://gmic.ai/our-process/" class="pf-cta-link">Learn our process →</a>
    </div>
  </div>
</section>
`;

/* ---------------------------- ASSEMBLE ---------------------------- */
const out =
  head +
  '</head>\n<body>\n\n' +
  nav + '\n\n' +
  mobileNavOut + '\n\n' +
  proofBody + '\n' +
  news + '\n\n' +
  footerBlock + '\n\n' +
  scripts + '\n\n' +
  '</body>\n</html>\n';

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, out, 'utf8');

console.log('Wrote', outPath);
console.log('verbatim nav bytes:', nav.length, '| mobile:', mobileNavOut.length, '| news:', news.length, '| footer:', footerBlock.length, '| scripts:', scripts.length);
console.log('Proof active in desktop nav:', out.includes('class="nav-link active" aria-current="page">Proof'));
console.log('Proof active in mobile nav:', out.includes('class="mobile-nav-link active" aria-current="page">Proof'));
console.log('lucide.createIcons present:', out.includes('lucide.createIcons'));
console.log('abNewsForm present:', out.includes('id="abNewsForm"'));
