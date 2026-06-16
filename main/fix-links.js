const fs = require('fs');
const path = require('path');

// 每个文件相对于 main/ 的路径，以及它的"深度前缀"
const pages = [
  // 根目录级别（main/index.html, main/products.html）
  { file: 'index.html',                                       prefix: './' },
  { file: 'products.html',                                    prefix: './' },

  // 一级子目录
  { file: 'about/index.html',                                 prefix: '../' },
  { file: 'blog/index.html',                                  prefix: '../' },
  { file: 'contact/index.html',                               prefix: '../' },
  { file: 'product/index.html',                               prefix: '../' },

  // custom-devices 根
  { file: 'custom-devices/index.html',                        prefix: '../' },

  // custom-devices 子页面（两级深）
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

  // products 实际页面（main/product/ 下是扁平 .html 文件，一级深）
  { file: 'product/all.html',                                 prefix: '../' },
  { file: 'product/mic05.html',                               prefix: '../' },
];

// 所有需要替换的绝对路径 → 相对路径映射
// 格式：[ 绝对路径pattern, 相对路径fragment ]
// SAFE SUBSET（+ /products/ 列表页，按要求加入）。
// 仍排除 /products/<子页>/ 与 /industries/*（本地无对应目录），保持其绝对路径不动。
const linkMap = [
  ['/custom-devices/',              'custom-devices/'],
  ['/custom-devices/odm-oem/',      'custom-devices/odm-oem/'],
  ['/custom-devices/private-label/','custom-devices/private-label/'],
  ['/custom-devices/custom-enclosure/','custom-devices/custom-enclosure/'],
  ['/custom-devices/3d-prototype/', 'custom-devices/3d-prototype/'],
  ['/custom-devices/firmware-integration/','custom-devices/firmware-integration/'],
  ['/custom-devices/audio-dsp-tuning/','custom-devices/audio-dsp-tuning/'],
  ['/custom-devices/ai-sdk-integration/','custom-devices/ai-sdk-integration/'],
  ['/custom-devices/prototype-validation/','custom-devices/prototype-validation/'],
  ['/custom-devices/evt-dvt-pvt/','custom-devices/evt-dvt-pvt/'],
  ['/custom-devices/smt-manufacturing/','custom-devices/smt-manufacturing/'],
  ['/custom-devices/certification-support/','custom-devices/certification-support/'],
  ['/custom-devices/supply-chain/', 'custom-devices/supply-chain/'],
  ['/about/',                       'about/'],
  ['/blog/',                        'blog/'],
  ['/contact/',                     'contact/'],
  ['/products/',                    'products/'],
];

const BASE = path.join(__dirname);

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  linkMap.forEach(([abs, rel]) => {
    // 只替换 href="..." 和 src="..." 里的绝对路径
    const escaped = abs.replace(/\//g, '\\/');
    // href="/xxx/" → href="prefix+rel"
    html = html.replace(
      new RegExp(`href="${escaped}"`, 'g'),
      `href="${prefix}${rel}"`
    );
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
