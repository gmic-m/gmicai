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

// 所有需要修正的链接：[匹配文字, 旧链接写法列表, 正确链接]
const linkFixes = [
  {
    label: 'Process',
    oldPatterns: [
      '#process',
      '../index.html#process',
      '../../index.html#process',
      '../process/',
      '../../process/',
      '../process/index.html',
    ],
    correct: '../../process/index.html',
  },
  {
    label: 'Proof',
    oldPatterns: [
      '#proof-cases',
      '#proof',
      '../index.html#proof-cases',
      '../../index.html#proof-cases',
      '../proof/',
      '../../proof/',
      '../proof/index.html',
    ],
    correct: '../../proof/index.html',
  },
  {
    label: 'Implementation',
    oldPatterns: [
      '#implementation',
      '../index.html#implementation',
      '../../index.html#implementation',
      '../implementation/',
      '../../implementation/',
      '../implementation/index.html',
    ],
    correct: '../../implementation/index.html',
  },
];

industryPages.forEach((file) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  linkFixes.forEach(({ label, oldPatterns, correct }) => {
    oldPatterns.forEach(old => {
      const escaped = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      // 匹配 nav-link
      const p1 = new RegExp(`href="${escaped}"([^>]*)>\\s*${label}\\s*<\\/a>`, 'g');
      html = html.replace(p1, (match) => {
        changed = true;
        return match.replace(`href="${old}"`, `href="${correct}"`);
      });
    });
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${changed ? 'DONE' : 'NO CHANGE'}: ${file}`);
});
