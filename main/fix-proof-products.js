const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

// products 子页面，前缀 ../../
const productPages = [
  'products\\mic01\\index.html',
  'products\\mic05\\index.html',
  'products\\mic06\\index.html',
];

productPages.forEach((file) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 替换所有 Proof 相关的旧链接为正确路径
  const oldPatterns = [
    '../index.html#proof-cases',
    '../../index.html#proof-cases',
    './proof/index.html',
    '../proof/index.html',
    '#proof-cases',
    '#proof',
  ];

  oldPatterns.forEach(old => {
    // 只替换紧跟 Proof 文字的 <a> 标签里的 href
    const escaped = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`href="${escaped}"([^>]*)>\\s*Proof\\s*<\\/a>`, 'g');
    const newHtml = html.replace(pattern, (match) => {
      changed = true;
      return match.replace(`href="${old}"`, `href="../../proof/index.html"`);
    });
    html = newHtml;
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${changed ? 'DONE' : 'NO CHANGE'}: ${file}`);
});
