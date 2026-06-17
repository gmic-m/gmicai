const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

const industryPages = [
  'industries\\healthcare\\index.html',
  'industries\\enterprise\\index.html',
  'industries\\field-service\\index.html',
  'industries\\logistics\\index.html',
  'industries\\public-safety\\index.html',
  'industries\\sales-intelligence\\index.html',
  'industries\\veterinary\\index.html',
  'industries\\voice-agents\\index.html',
];

const oldPatterns = [
  '../index.html#proof-cases',
  '../../index.html#proof-cases',
  './proof/index.html',
  '../proof/index.html',
  '#proof-cases',
  '#proof',
];

industryPages.forEach((file) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  oldPatterns.forEach(old => {
    const escaped = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`href="${escaped}"([^>]*)>\\s*Proof\\s*<\\/a>`, 'g');
    html = html.replace(pattern, (match) => {
      changed = true;
      return match.replace(`href="${old}"`, `href="../../proof/index.html"`);
    });
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${changed ? 'DONE' : 'NO CHANGE'}: ${file}`);
});
