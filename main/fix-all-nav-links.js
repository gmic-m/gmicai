const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

/*
 * CORRECTED nav fix.
 *
 * Investigation of the live pages showed:
 *  - The Industries dropdown (desktop 3-column + mobile) is ALREADY complete and
 *    identical on every page (all 11 industries + NEMT), and ALREADY correctly
 *    prefixed per depth (index: bare, depth-1: ../, depth-2: ../../). So the
 *    "add new industries pages / fix industries paths" goals are already done.
 *  - The original block-replacement regexes were unsafe: the desktop one matched
 *    nothing (there is no `dropdown-col-head">Industries`), and the mobile one
 *    would have swallowed the Products + Custom Devices sections (Industries is the
 *    5th mobile-nav-section, not the first).
 *
 * The only real remaining delta is removing the Telalive entry from the Products
 * nav. This script does ONLY that — desktop product card + mobile link — and
 * leaves all other nav (incl. the Telalive hero/slide IMAGES, which are page
 * content, not nav) untouched.
 */

const pages = [
  'index.html',
  'about\\index.html',
  'blog\\index.html',
  'contact\\index.html',
  'products\\index.html',
  'faq\\index.html',
  'implementation\\index.html',
  'process\\index.html',
  'proof\\index.html',
  'custom-devices\\index.html',
  'custom-devices\\odm-oem\\index.html',
  'custom-devices\\private-label\\index.html',
  'custom-devices\\custom-enclosure\\index.html',
  'custom-devices\\3d-prototype\\index.html',
  'custom-devices\\firmware-integration\\index.html',
  'custom-devices\\audio-dsp-tuning\\index.html',
  'custom-devices\\ai-sdk-integration\\index.html',
  'custom-devices\\prototype-validation\\index.html',
  'custom-devices\\evt-dvt-pvt\\index.html',
  'custom-devices\\smt-manufacturing\\index.html',
  'custom-devices\\certification-support\\index.html',
  'custom-devices\\supply-chain\\index.html',
  'industries\\healthcare\\index.html',
  'industries\\enterprise\\index.html',
  'industries\\field-service\\index.html',
  'industries\\logistics\\index.html',
  'industries\\public-safety\\index.html',
  'industries\\sales-intelligence\\index.html',
  'industries\\veterinary\\index.html',
  'industries\\voice-agents\\index.html',
  'products\\mic01\\index.html',
  'products\\mic05\\index.html',
  'products\\mic06\\index.html',
];

pages.forEach((file) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let removed = 0;

  // Desktop Products dropdown card for Telalive (either attribute order).
  html = html.replace(
    /\s*<a[^>]*href="[^"]*telalive[^"]*"[^>]*class="dropdown-product-card"[^>]*>[\s\S]*?<\/a>/gi,
    () => { removed++; return ''; }
  );
  html = html.replace(
    /\s*<a[^>]*class="dropdown-product-card"[^>]*href="[^"]*telalive[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
    () => { removed++; return ''; }
  );

  // Mobile nav Telalive link (either attribute order).
  html = html.replace(
    /\s*<a[^>]*href="[^"]*telalive[^"]*"[^>]*class="mobile-nav-link"[^>]*>[\s\S]*?<\/a>/gi,
    () => { removed++; return ''; }
  );
  html = html.replace(
    /\s*<a[^>]*class="mobile-nav-link"[^>]*href="[^"]*telalive[^"]*"[^>]*>[\s\S]*?<\/a>/gi,
    () => { removed++; return ''; }
  );

  if (removed > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`DONE (removed ${removed} Telalive nav link${removed > 1 ? 's' : ''}): ${file}`);
  } else {
    console.log(`NO CHANGE: ${file}`);
  }
});
