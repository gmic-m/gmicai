const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

const pages = [
  { file: 'index.html',                                        proofHref: './proof/index.html' },
  { file: 'about\\index.html',                                 proofHref: '../proof/index.html' },
  { file: 'blog\\index.html',                                  proofHref: '../proof/index.html' },
  { file: 'contact\\index.html',                               proofHref: '../proof/index.html' },
  { file: 'products\\index.html',                              proofHref: '../proof/index.html' },
  { file: 'faq\\index.html',                                   proofHref: '../proof/index.html' },
  { file: 'implementation\\index.html',                        proofHref: '../proof/index.html' },
  { file: 'process\\index.html',                               proofHref: '../proof/index.html' },
  { file: 'proof\\index.html',                                 proofHref: '../proof/index.html' },
  { file: 'custom-devices\\index.html',                        proofHref: '../proof/index.html' },
  { file: 'custom-devices\\odm-oem\\index.html',               proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\private-label\\index.html',         proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\custom-enclosure\\index.html',      proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\3d-prototype\\index.html',          proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\firmware-integration\\index.html',  proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\audio-dsp-tuning\\index.html',      proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\ai-sdk-integration\\index.html',    proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\prototype-validation\\index.html',  proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\evt-dvt-pvt\\index.html',           proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\smt-manufacturing\\index.html',     proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\certification-support\\index.html', proofHref: '../../proof/index.html' },
  { file: 'custom-devices\\supply-chain\\index.html',          proofHref: '../../proof/index.html' },
  { file: 'industries\\healthcare\\index.html',                proofHref: '../../proof/index.html' },
];

pages.forEach(({ file, proofHref }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 用简单字符串查找替换，覆盖所有可能的写法
  // 找到所有包含 >Proof</a> 的 <a> 标签，替换其 href
  const result = html.replace(/<a\s+href="([^"]*)"\s+class="([^"]*)"[^>]*>\s*Proof\s*<\/a>/g, (match, href, cls) => {
    changed = true;
    return match.replace(`href="${href}"`, `href="${proofHref}"`);
  });

  if (result !== html) {
    changed = true;
    html = result;
  }

  // 兜底：直接字符串替换所有锚点写法
  const anchors = [
    '#proof-cases',
    '../index.html#proof-cases',
    '../../index.html#proof-cases',
    './index.html#proof-cases',
    '#proof',
  ];

  anchors.forEach(anchor => {
    // 只替换在 <a> 标签里紧跟着 Proof 文字的情况
    const anchorPattern = new RegExp(`href="${anchor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"([^>]*)>\\s*Proof\\s*<\\/a>`, 'g');
    const newHtml = html.replace(anchorPattern, (match) => {
      changed = true;
      return match.replace(`href="${anchor}"`, `href="${proofHref}"`);
    });
    html = newHtml;
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${changed ? 'DONE' : 'NO CHANGE'}: ${file}`);
});
