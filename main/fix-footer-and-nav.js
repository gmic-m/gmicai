/* ============================================================
   fix-footer-and-nav.js  (Prompt 0 bug fixes 5, 6, 7)
   - Fix 6: nav label "Custom Devices" -> "Custom AI Hardware" (all pages)
   - Fix 5: footer Solutions/Industries/Company/Resources links -> real routes
            (depth-aware relative paths, scoped to <footer>)
   - Fix 7: hide dead footer links (Careers, Privacy x2, Terms, Cookies)
   Idempotent and non-destructive (dead links hidden, not deleted).
   ============================================================ */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// recursively collect .html files
function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) { if (name === 'node_modules') continue; walk(fp, out); }
    else if (name.endsWith('.html')) out.push(fp);
  }
  return out;
}

// footer link label -> target path (relative to site root)
const FOOTER_LINKS = {
  'Edge AI Hardware': 'solutions/edge-ai-hardware/index.html',
  'Voice AI Hardware': 'solutions/voice-ai-hardware/index.html',
  'AI Wearable Devices': 'solutions/ai-wearable-devices/index.html',
  'AI Hardware ODM': 'custom-devices/odm-oem/index.html',
  'Embedded AI Hardware': 'solutions/embedded-ai-hardware/index.html',
  'Healthcare AI': 'industries/healthcare/index.html',
  'Enterprise AI': 'industries/enterprise/index.html',
  'Field Service AI': 'industries/field-service/index.html',
  'About GMIC': 'about/index.html',
  'Customer Stories': 'proof/index.html',
  'Contact': 'contact/index.html',
};

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const files = walk(ROOT);
const report = [];

for (const fp of files) {
  const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;               // index.html -> 0
  const P = depth === 0 ? '' : '../'.repeat(depth);
  let html = fs.readFileSync(fp, 'utf8');
  const before = html;
  const stats = { nav: 0, links: 0, hidden: 0 };

  // ---- Fix 6: nav label rename (visible trigger + any mobile link) ----
  html = html.replace(/Custom Devices (<span class="nav-arrow">)/g, (m, g1) => { stats.nav++; return 'Custom AI Hardware ' + g1; });
  html = html.replace(/>Custom Devices<\/a>/g, () => { stats.nav++; return '>Custom AI Hardware</a>'; });

  // ---- Fixes 5 & 7: scoped to the <footer> region ----
  html = html.replace(/<footer[\s\S]*?<\/footer>/, (footer) => {
    let f = footer;

    // Fix 5: rewrite hrefs by anchor label (preserve any extra attrs)
    for (const [label, target] of Object.entries(FOOTER_LINKS)) {
      const re = new RegExp('<a href="[^"]*"([^>]*)>' + esc(label) + '</a>', 'g');
      f = f.replace(re, (m, attrs) => { stats.links++; return `<a href="${P}${target}"${attrs}>${label}</a>`; });
    }

    // Fix 7a: bottom-bar dead links (Privacy / Terms / Cookies) — match the block to avoid
    // touching the Company-section Privacy <li>.
    f = f.replace(
      /(<div>\s*)<a href="#">Privacy<\/a>(\s*)<a href="#">Terms<\/a>(\s*)<a href="#">Cookies<\/a>/,
      (m, d, s1, s2) => {
        stats.hidden += 3;
        return `${d}<a href="#" style="display:none">Privacy</a>${s1}<a href="#" style="display:none">Terms</a>${s2}<a href="#" style="display:none">Cookies</a>`;
      }
    );

    // Fix 7b: Company-section dead links (Careers, Privacy) — hide the <li>
    f = f.replace(/<li><a href="#">Careers<\/a><\/li>/, () => { stats.hidden++; return '<li style="display:none"><a href="#">Careers</a></li>'; });
    f = f.replace(/<li><a href="#">Privacy<\/a><\/li>/, () => { stats.hidden++; return '<li style="display:none"><a href="#">Privacy</a></li>'; });

    return f;
  });

  if (html !== before) {
    fs.writeFileSync(fp, html, 'utf8');
    report.push({ rel, ...stats });
  }
}

// summary
let tNav = 0, tLinks = 0, tHidden = 0;
for (const r of report) { tNav += r.nav; tLinks += r.links; tHidden += r.hidden; }
console.log(`Files changed: ${report.length}`);
console.log(`Totals -> nav renames: ${tNav}, footer links rewritten: ${tLinks}, dead links hidden: ${tHidden}`);
console.log('\nPer-file (nav / links / hidden):');
for (const r of report) console.log(`  ${r.rel}: ${r.nav} / ${r.links} / ${r.hidden}`);

// flag any footer page that got 0 link rewrites or 0 hidden (possible variant markup)
const footerFiles = files.filter(fp => fs.readFileSync(fp, 'utf8').includes('class="footer"'));
console.log(`\nFooter pages total: ${footerFiles.length}`);
const byRel = Object.fromEntries(report.map(r => [r.rel, r]));
const anomalies = footerFiles
  .map(fp => path.relative(ROOT, fp).replace(/\\/g, '/'))
  .filter(rel => !byRel[rel] || byRel[rel].links === 0 || byRel[rel].hidden === 0);
if (anomalies.length) { console.log('ANOMALIES (footer page with 0 link or 0 hidden changes):'); anomalies.forEach(a => console.log('  ' + a)); }
else console.log('No anomalies — every footer page received link + hidden fixes.');
