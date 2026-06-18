const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

const pages = [
  { file: 'index.html',                                        processHref: './process/index.html' },
  { file: 'about\\index.html',                                 processHref: '../process/index.html' },
  { file: 'blog\\index.html',                                  processHref: '../process/index.html' },
  { file: 'contact\\index.html',                               processHref: '../process/index.html' },
  { file: 'products\\index.html',                              processHref: '../process/index.html' },
  { file: 'faq\\index.html',                                   processHref: '../process/index.html' },
  { file: 'implementation\\index.html',                        processHref: '../process/index.html' },
  { file: 'process\\index.html',                               processHref: '../process/index.html' },
  { file: 'proof\\index.html',                                 processHref: '../process/index.html' },
  { file: 'custom-devices\\index.html',                        processHref: '../process/index.html' },
  { file: 'custom-devices\\odm-oem\\index.html',               processHref: '../../process/index.html' },
  { file: 'custom-devices\\private-label\\index.html',         processHref: '../../process/index.html' },
  { file: 'custom-devices\\custom-enclosure\\index.html',      processHref: '../../process/index.html' },
  { file: 'custom-devices\\3d-prototype\\index.html',          processHref: '../../process/index.html' },
  { file: 'custom-devices\\firmware-integration\\index.html',  processHref: '../../process/index.html' },
  { file: 'custom-devices\\audio-dsp-tuning\\index.html',      processHref: '../../process/index.html' },
  { file: 'custom-devices\\ai-sdk-integration\\index.html',    processHref: '../../process/index.html' },
  { file: 'custom-devices\\prototype-validation\\index.html',  processHref: '../../process/index.html' },
  { file: 'custom-devices\\evt-dvt-pvt\\index.html',           processHref: '../../process/index.html' },
  { file: 'custom-devices\\smt-manufacturing\\index.html',     processHref: '../../process/index.html' },
  { file: 'custom-devices\\certification-support\\index.html', processHref: '../../process/index.html' },
  { file: 'custom-devices\\supply-chain\\index.html',          processHref: '../../process/index.html' },
  { file: 'industries\\healthcare\\index.html',                processHref: '../../process/index.html' },
  { file: 'industries\\enterprise\\index.html',                processHref: '../../process/index.html' },
  { file: 'industries\\field-service\\index.html',             processHref: '../../process/index.html' },
  { file: 'industries\\logistics\\index.html',                 processHref: '../../process/index.html' },
  { file: 'industries\\public-safety\\index.html',             processHref: '../../process/index.html' },
  { file: 'industries\\sales-intelligence\\index.html',        processHref: '../../process/index.html' },
  { file: 'industries\\veterinary\\index.html',                processHref: '../../process/index.html' },
  { file: 'industries\\voice-agents\\index.html',              processHref: '../../process/index.html' },
  { file: 'products\\mic01\\index.html',                       processHref: '../../process/index.html' },
  { file: 'products\\mic05\\index.html',                       processHref: '../../process/index.html' },
  { file: 'products\\mic06\\index.html',                       processHref: '../../process/index.html' },
];

const oldPatterns = [
  '#process',
  '../index.html#process',
  '../../index.html#process',
  './index.html#process',
  './process/',
  '../process/',
  '../../process/',
];

pages.forEach(({ file, processHref }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  oldPatterns.forEach(old => {
    const escaped = old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // 只替换紧跟 Process 文字的 <a> 标签
    const pattern = new RegExp(`href="${escaped}"([^>]*)>\\s*Process\\s*<\\/a>`, 'g');
    html = html.replace(pattern, (match) => {
      changed = true;
      return match.replace(`href="${old}"`, `href="${processHref}"`);
    });
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${changed ? 'DONE' : 'NO CHANGE'}: ${file}`);
});
