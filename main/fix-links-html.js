const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);

// 所有需要处理的文件
const pages = [
  { file: 'index.html',                                       prefix: './' },
  { file: 'products.html',                                    prefix: './' },
  { file: 'about/index.html',                                 prefix: '../' },
  { file: 'blog/index.html',                                  prefix: '../' },
  { file: 'contact/index.html',                               prefix: '../' },
  { file: 'product/index.html',                               prefix: '../' },
  { file: 'custom-devices/index.html',                        prefix: '../' },
  { file: 'custom-devices/odm-oem/index.html',                prefix: '../../' },
  { file: 'custom-devices/private-label/index.html',          prefix: '../../' },
  { file: 'custom-devices/custom-enclosure/index.html',       prefix: '../../' },
  { file: 'custom-devices/3d-prototype/index.html',           prefix: '../../' },
  { file: 'custom-devices/firmware-integration/index.html',   prefix: '../../' },
  { file: 'custom-devices/audio-dsp-tuning/index.html',       prefix: '../../' },
  { file: 'custom-devices/ai-sdk-integration/index.html',     prefix: '../../' },
  { file: 'custom-devices/prototype-validation/index.html',   prefix: '../../' },
  { file: 'custom-devices/evt-dvt-pvt/index.html',            prefix: '../../' },
  { file: 'custom-devices/smt-manufacturing/index.html',      prefix: '../../' },
  { file: 'custom-devices/certification-support/index.html',  prefix: '../../' },
  { file: 'custom-devices/supply-chain/index.html',           prefix: '../../' },
  { file: 'product/mic06/index.html',                         prefix: '../../' },
  { file: 'product/mic05/index.html',                         prefix: '../../' },
  { file: 'product/mic01/index.html',                         prefix: '../../' },
  { file: 'product/telalive/index.html',                      prefix: '../../' },
];

// 所有页面路径 → 加上 index.html
// 只替换 href="xxx/" 结尾的导航链接，改为 href="xxx/index.html"
const navFolders = [
  'products/',
  'about/',
  'blog/',
  'contact/',
  'custom-devices/',
  'custom-devices/odm-oem/',
  'custom-devices/private-label/',
  'custom-devices/custom-enclosure/',
  'custom-devices/3d-prototype/',
  'custom-devices/firmware-integration/',
  'custom-devices/audio-dsp-tuning/',
  'custom-devices/ai-sdk-integration/',
  'custom-devices/prototype-validation/',
  'custom-devices/evt-dvt-pvt/',
  'custom-devices/smt-manufacturing/',
  'custom-devices/certification-support/',
  'custom-devices/supply-chain/',
  'product/mic06/',
  'product/mic05/',
  'product/mic01/',
  'product/telalive/',
  'industries/healthcare/',
  'industries/hospitality/',
  'industries/hvac/',
  'industries/enterprise/',
  'industries/field-service/',
  'industries/telecom/',
  'industries/smart-retail/',
];

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  navFolders.forEach(folder => {
    // 把 href="../../custom-devices/odm-oem/" 改为 href="../../custom-devices/odm-oem/index.html"
    // 只处理已经是相对路径的（以 prefix 开头的）
    const relPath = prefix + folder;
    const withIndex = prefix + folder + 'index.html';

    // 替换 href="relPath" → href="withIndex"
    // 注意不要重复替换已经有 index.html 的
    html = html.split(`href="${relPath}"`).join(`href="${withIndex}"`);
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
