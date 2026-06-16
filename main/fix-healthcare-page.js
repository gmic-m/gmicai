const fs = require('fs');
const p = 'C:\\Users\\meng\\Desktop\\gmic\\main\\industries\\healthcare\\index.html';
let h = fs.readFileSync(p, 'utf8');

/* ---------------------------------------------------------------------------
 * FIX 1: The nav-injection script overwrote this page's custom <style> block
 * with the about page's styles (nav CSS + unused .ab-* page styles). The body
 * uses .ind-*, .sol-*, .intro-*, .measure, .reveal, etc. — none of which were
 * defined, so everything but the nav was unstyled / invisible.
 * Replace the leftover ".ab-* / ABOUT US — page styles" block with the
 * reusable INDUSTRY TEMPLATE styles. Keep the nav CSS above it untouched.
 * ------------------------------------------------------------------------- */
const newCSS = `/* ============================================================
   INDUSTRY PAGE TEMPLATE — page styles
   (reusable across all 7 industry pages; swap text only)
   ============================================================ */
body { background:#fff; color:#0f172a; -webkit-font-smoothing:antialiased; }

/* Active nav highlight for current industry */
.dropdown-link.active, .mobile-nav-link.active { color:#2563eb !important; font-weight:700; }

/* Width helpers — constrain TEXT only, never section backgrounds */
.measure { max-width:680px; }
.measure-wide { max-width:760px; }

/* ---------- Section shells & light/dark alternation ---------- */
.ind-sec { padding:96px 0; }
.ind-sec--light { background:#ffffff; }
.ind-sec--soft  { background:#f8fafc; }
.ind-sec--dark  { background:#0f172a; color:#fff; }
.ind-sec--dark h2.section, .ind-sec--dark h3 { color:#fff; }
.ind-sec--dark p { color:rgba(255,255,255,.72); }

.ind-head { margin-bottom:48px; }
.ind-head .eyebrow { display:block; margin-bottom:16px; }
.ind-head h2.section { margin:0; }

/* ---------- HERO (dark, text block over full-width banner) ---------- */
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

/* ---------- INTRO (left lead / right body, no text wall) ---------- */
.intro-grid { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
.intro-lead { font-size:clamp(1.4rem,2.4vw,1.6rem); line-height:1.35; font-weight:600; color:#0f172a; margin:0; }
.intro-lead em { font-style:italic; color:#2563eb; font-weight:600; }
.intro-body { display:flex; flex-direction:column; gap:16px; padding-top:6px; border-left:1px solid rgba(0,0,0,.06); padding-left:40px; }
.intro-body p { font-size:1rem; line-height:1.75; color:#64748b; margin:0; }

/* ---------- Card grids (Challenges / Use Cases) ---------- */
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

/* ---------- SOLUTIONS — vertical accordion, NO border ---------- */
.sol-list { border-top:1px solid rgba(0,0,0,.06); }
.sol-item { border-bottom:1px solid rgba(0,0,0,.06); }
.sol-summary { display:flex; align-items:center; gap:18px; padding:20px 8px; cursor:pointer; list-style:none; border-radius:10px; transition:background .2s ease; }
.sol-summary::-webkit-details-marker { display:none; }
.sol-summary:hover { background:#f1f5f9; }
.sol-thumb { width:64px; height:64px; border-radius:10px; object-fit:cover; flex-shrink:0; background:#f1f5f9; }
.sol-title { font-size:1.125rem; font-weight:600; color:#0f172a; flex:1; }
.sol-chev { margin-left:auto; width:20px; height:20px; color:#94a3b8; transition:transform .25s ease; }
.sol-item[open] .sol-chev { transform:rotate(180deg); }
.sol-detail { padding:0 8px 24px 100px; }
.sol-detail p { font-size:.95rem; line-height:1.7; color:#475569; margin:0 0 14px; }
.sol-chips { display:flex; flex-wrap:wrap; gap:8px; }
.chip { font-size:.8rem; font-weight:500; color:#2563eb; background:#eff4ff; border-radius:100px; padding:6px 14px; }

/* ---------- WHY HARDWARE (left text + right image) ---------- */
.why-hw-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
.why-hw-lead { font-size:1.0625rem; line-height:1.7; margin:18px 0 24px; color:rgba(255,255,255,.78); }
.check-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:14px; }
.check-list li { display:flex; align-items:center; gap:12px; font-size:1rem; color:#fff; }
.check-list .ck { width:26px; height:26px; border-radius:50%; background:rgba(37,99,235,.20); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.check-list .ck svg { width:15px; height:15px; color:#93c5fd; }
.why-hw-media { border-radius:14px; overflow:hidden; }
.why-hw-media img { display:block; width:100%; height:100%; object-fit:cover; }

/* ---------- CAPABILITIES — two NO-border cards, image-topped ---------- */
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

/* ---------- PROCESS — 6 numbered steps ---------- */
.proc-grid { display:grid; grid-template-columns:repeat(6,1fr); gap:16px; }
.proc-step { padding:24px 18px; border-radius:12px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); }
.proc-num { font-size:1.5rem; font-weight:700; color:#3b82f6; letter-spacing:-.02em; margin-bottom:12px; }
.proc-step h3 { font-size:.95rem; font-weight:600; color:#fff; margin:0; line-height:1.35; }

/* ---------- RELATED INDUSTRIES ---------- */
.rel-row { display:flex; flex-wrap:wrap; gap:10px; }
.rel-link { font-size:.9rem; font-weight:500; color:#475569; background:#fff; border:1px solid rgba(0,0,0,.08); border-radius:100px; padding:9px 18px; text-decoration:none; transition:color .2s ease, border-color .2s ease; }
.rel-link:hover { color:#2563eb; border-color:rgba(37,99,235,.40); }

/* ---------- REVEAL / FADE — SELF-CONTAINED (no main.js on this page) ----------
   style.css defines .reveal{opacity:0} / .fade-section{opacity:0} with the
   visible states named .visible and .in-view. We re-declare the visible states
   here for the class names our inline observer adds (.in / .visible). No
   !important needed: style.css has none and our rules come later in the cascade. */
.reveal { opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
.reveal.in, .reveal.visible { opacity:1; transform:none; }
.fade-section { opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
.fade-section.in, .fade-section.in-view, .fade-section.visible { opacity:1; transform:none; }

/* ---------- Responsive ---------- */
@media (max-width:900px) {
  .grid-4 { grid-template-columns:repeat(2,1fr); }
  .proc-grid { grid-template-columns:repeat(3,1fr); }
  .intro-grid, .why-hw-grid, .cap2-grid { grid-template-columns:1fr; gap:32px; }
  .intro-body { border-left:none; padding-left:0; }
  .why-hw-media { order:2; }
}
@media (max-width:640px) {
  .ind-sec { padding:64px 0; }
  .ind-hero { padding:110px 0 48px; }
  .ind-hero-banner { margin-top:32px; }
  .grid-4 { grid-template-columns:1fr; }
  .proc-grid { grid-template-columns:repeat(2,1fr); }
  .ind-hero .lede { font-size:.95rem; }
  .ind-hero-cta .btn { width:100%; text-align:center; }
  .sol-detail { padding-left:8px; }
  .sol-thumb { width:48px; height:48px; }
}

`;

const aboutPos = h.indexOf('ABOUT US — page styles');
const startIdx = h.lastIndexOf('/* ', aboutPos);
const endIdx = h.indexOf('.nav { border-bottom: none');
if (aboutPos === -1 || startIdx === -1 || endIdx === -1) {
  console.error('FIX 1 FAILED: could not locate the about-styles block.', { aboutPos, startIdx, endIdx });
  process.exit(1);
}
h = h.slice(0, startIdx) + newCSS + h.slice(endIdx);
console.log('FIX 1 OK: replaced leftover about styles with industry template styles.');

/* ---------------------------------------------------------------------------
 * FIX 2: Add active highlight to the desktop dropdown "Healthcare Voice AI"
 * (mobile nav link already carries .active).
 * ------------------------------------------------------------------------- */
const navOld = '<a href="../../industries/healthcare/index.html" class="dropdown-link">Healthcare Voice AI</a>';
const navNew = '<a href="../../industries/healthcare/index.html" class="dropdown-link active" aria-current="page">Healthcare Voice AI</a>';
if (h.includes(navOld)) {
  h = h.replace(navOld, navNew);
  console.log('FIX 2 OK: desktop dropdown Healthcare Voice AI marked active.');
} else if (h.includes(navNew)) {
  console.log('FIX 2 SKIP: desktop dropdown already active.');
} else {
  console.error('FIX 2 FAILED: desktop dropdown link not found.');
}

/* ---------------------------------------------------------------------------
 * FIX 3: This page does NOT load js/main.js, so .reveal/.fade-section elements
 * stay at opacity:0 and lucide icons never render. Inject a self-contained
 * IntersectionObserver reveal script + lucide.createIcons() before </body>.
 * ------------------------------------------------------------------------- */
const revealScript = `<!-- ========== Self-contained reveal + icons (page does NOT load main.js) ========== -->
<script>
  (function () {
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
      // Safety net: force-show anything still hidden 1.2s after load — never hide content.
      window.addEventListener('load', function () {
        setTimeout(function () { els.forEach(function (e) { e.classList.add('in', 'visible'); }); }, 1200);
      });
    }
    if (window.lucide && typeof window.lucide.createIcons === 'function') { window.lucide.createIcons(); }
  })();
</script>
`;

if (h.indexOf('Self-contained reveal + icons') === -1) {
  h = h.replace('</body>', revealScript + '</body>');
  console.log('FIX 3 OK: injected self-contained reveal + lucide.createIcons() before </body>.');
} else {
  console.log('FIX 3 SKIP: reveal script already present.');
}

fs.writeFileSync(p, h, 'utf8');
console.log('DONE: wrote', p);
