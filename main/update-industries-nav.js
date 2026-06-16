const fs = require('fs');
const path = require('path');

const ROOT = 'C:\\Users\\meng\\Desktop\\gmic\\main';

/* ---- collect live index.html files (skip backups + stray-named files) ---- */
function walk(dir, acc) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const rel = path.relative(ROOT, full).split(path.sep).join('/');
    if (rel.includes('.bak-fixlinks')) continue;          // skip backup trees
    const st = fs.statSync(full);
    if (st.isDirectory()) { walk(full, acc); continue; }
    if (name !== 'index.html') continue;                  // only standard pages
    acc.push(rel);
  }
  return acc;
}
const files = walk(ROOT, []);

/* ---- canonical Industries data ---- */
const COLS = [
  { head: 'Healthcare & Ops', items: [
    ['healthcare', 'Healthcare Voice AI'],
    ['veterinary', 'Veterinary AI'],
    ['hospitality', 'Hospitality AI'],
  ]},
  { head: 'Enterprise & Field', items: [
    ['enterprise', 'Enterprise AI'],
    ['sales-intelligence', 'Sales Intelligence'],
    ['field-service', 'Field Service'],
    ['voice-agents', 'Voice Agents'],
    ['telecom', 'Telecom AI'],
  ]},
  { head: 'Safety & Transport', items: [
    ['public-safety', 'Public Safety'],
    ['logistics', 'Logistics & Transportation'],
    ['smart-retail', 'Smart Retail'],
  ]},
];
const NEMT = 'https://gmic-nemt-demo.vercel.app/';

/* ---- brace-balanced div matcher: returns index just after the matching </div> ---- */
function matchDiv(html, openIdx) {
  const re = /<div\b|<\/div>/g;
  re.lastIndex = openIdx;
  let depth = 0, m;
  while ((m = re.exec(html))) {
    if (m[0] === '</div>') { depth--; if (depth === 0) return re.lastIndex; }
    else depth++;
  }
  return -1;
}

function deskInner(pfx, active) {
  function a(slug, label) {
    const attr = (slug === active)
      ? 'class="dropdown-link nav-current" aria-current="page"'
      : 'class="dropdown-link"';
    return `              <a href="${pfx}industries/${slug}/index.html" ${attr}>${label}</a>`;
  }
  const cols = COLS.map(c => {
    const links = c.items.map(it => a(it[0], it[1]));
    if (c.head === 'Safety & Transport') {
      links.push(`              <a href="${NEMT}" class="dropdown-link dropdown-link--external" target="_blank" rel="noopener">NEMT</a>`);
    }
    return `            <div class="dropdown-col">\n              <p class="dropdown-col-head">${c.head}</p>\n${links.join('\n')}\n            </div>`;
  }).join('\n');
  return `<div class="dropdown-inner">\n${cols}\n          </div>`;
}

function mobileSection(pfx, active) {
  function a(slug, label) {
    const attr = (slug === active)
      ? 'class="mobile-nav-link active" aria-current="page" style="color:#2563eb;font-weight:700;"'
      : 'class="mobile-nav-link"';
    return `      <a href="${pfx}industries/${slug}/index.html" ${attr}>${label}</a>`;
  }
  const links = [];
  COLS.forEach(c => c.items.forEach(it => links.push(a(it[0], it[1]))));
  links.push(`      <a href="${NEMT}" class="mobile-nav-link mobile-nav-link--external" target="_blank" rel="noopener">NEMT ↗</a>`);
  return `<div class="mobile-nav-section">\n      <p class="mobile-nav-head">Industries</p>\n${links.join('\n')}\n    </div>`;
}

const results = [];
for (const rel of files) {
  const full = path.join(ROOT, rel);
  let h = fs.readFileSync(full, 'utf8');
  const depth = rel.split('/').length - 1;          // dirs above the file
  const pfx = '../'.repeat(depth);
  const mInd = rel.match(/^industries\/([^/]+)\/index\.html$/);
  const active = mInd ? mInd[1] : null;
  let didDesk = false, didMob = false;

  // DESKTOP
  const lbl = h.indexOf('Industries <span class="nav-arrow">');
  if (lbl !== -1) {
    const innerStart = h.indexOf('<div class="dropdown-inner">', lbl);
    if (innerStart !== -1) {
      const innerEnd = matchDiv(h, innerStart);
      if (innerEnd !== -1) {
        h = h.slice(0, innerStart) + deskInner(pfx, active) + h.slice(innerEnd);
        didDesk = true;
      }
    }
  }

  // MOBILE
  const head = h.indexOf('<p class="mobile-nav-head">Industries</p>');
  if (head !== -1) {
    const secStart = h.lastIndexOf('<div class="mobile-nav-section">', head);
    if (secStart !== -1) {
      const secEnd = matchDiv(h, secStart);
      if (secEnd !== -1) {
        h = h.slice(0, secStart) + mobileSection(pfx, active) + h.slice(secEnd);
        didMob = true;
      }
    }
  }

  if (didDesk || didMob) fs.writeFileSync(full, h, 'utf8');
  results.push({ rel, pfx: pfx || '(root)', active: active || '-', desk: didDesk, mob: didMob });
}

/* ---- report ---- */
let updated = 0;
results.forEach(r => {
  if (r.desk || r.mob) updated++;
  console.log(`${r.desk ? 'D' : '-'}${r.mob ? 'M' : '-'}  active=${r.active.padEnd(18)} pfx=${String(r.pfx).padEnd(8)} ${r.rel}`);
});
console.log('---');
console.log('files touched:', updated, '/', results.length, 'scanned');
// quick integrity checks across touched files
let hvac = 0, voice = 0, pub = 0, logi = 0, retainTitle = 0;
results.forEach(r => {
  const h = fs.readFileSync(path.join(ROOT, r.rel), 'utf8');
  if (/mobile-nav-head">Industries[\s\S]*?HVAC[\s\S]*?<\/div>/.test(h) && h.includes('>HVAC<')) {
    // HVAC may still appear elsewhere; only count if inside an industries nav list
  }
  if (h.includes('Safety & Transport')) retainTitle++;
  if (h.includes('industries/voice-agents/index.html')) voice++;
  if (h.includes('industries/public-safety/index.html')) pub++;
  if (h.includes('industries/logistics/index.html')) logi++;
});
console.log('have "Safety & Transport" head:', retainTitle);
console.log('reference voice-agents:', voice, '| public-safety:', pub, '| logistics:', logi);
