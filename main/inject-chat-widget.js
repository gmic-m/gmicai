/* Injects <script src=".../js/chat-widget.js"> before </body> on EVERY
   .html page. Depth-aware relative path. Idempotent (safe to re-run). */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const st = fs.statSync(fp);
    if (st.isDirectory()) { if (name === 'node_modules' || name === '.git') continue; walk(fp, out); }
    else if (name.endsWith('.html')) out.push(fp);
  }
  return out;
}

let changed = 0, skipped = 0, noBody = 0;
const report = [];
for (const fp of walk(ROOT)) {
  let html = fs.readFileSync(fp, 'utf8');
  if (html.includes('js/chat-widget.js')) { skipped++; continue; }

  const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
  const depth = rel.split('/').length - 1;
  const P = depth === 0 ? '' : '../'.repeat(depth);
  const tag = '<script src="' + P + 'js/chat-widget.js"></script>';

  const idx = html.lastIndexOf('</body>');
  if (idx === -1) { noBody++; report.push(rel + '  (NO </body> — skipped)'); continue; }
  html = html.slice(0, idx) + tag + '\n' + html.slice(idx);
  fs.writeFileSync(fp, html, 'utf8');
  changed++; report.push(rel + '  -> ' + P + 'js/chat-widget.js');
}

console.log('Injected into ' + changed + ' page(s); already had it: ' + skipped + '; no </body>: ' + noBody);
report.forEach(r => console.log('  ' + r));
