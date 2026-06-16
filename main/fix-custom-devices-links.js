const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

// 每个文件和它的路径前缀
const pages = [
  { file: 'index.html',                                        prefix: './' },
  { file: 'products\\index.html',                              prefix: './' },
  { file: 'about\\index.html',                                 prefix: '../' },
  { file: 'blog\\index.html',                                  prefix: '../' },
  { file: 'contact\\index.html',                               prefix: '../' },
  { file: 'custom-devices\\odm-oem\\index.html',               prefix: '../../' },
  { file: 'custom-devices\\private-label\\index.html',         prefix: '../../' },
  { file: 'custom-devices\\custom-enclosure\\index.html',      prefix: '../../' },
  { file: 'custom-devices\\3d-prototype\\index.html',          prefix: '../../' },
  { file: 'custom-devices\\firmware-integration\\index.html',  prefix: '../../' },
  { file: 'custom-devices\\audio-dsp-tuning\\index.html',      prefix: '../../' },
  { file: 'custom-devices\\ai-sdk-integration\\index.html',    prefix: '../../' },
  { file: 'custom-devices\\prototype-validation\\index.html',  prefix: '../../' },
  { file: 'custom-devices\\evt-dvt-pvt\\index.html',           prefix: '../../' },
  { file: 'custom-devices\\smt-manufacturing\\index.html',     prefix: '../../' },
  { file: 'custom-devices\\certification-support\\index.html', prefix: '../../' },
  { file: 'custom-devices\\supply-chain\\index.html',          prefix: '../../' },
];

// Custom Devices 子页面列表
const customPages = [
  { label: 'ODM / OEM',                 slug: 'odm-oem' },
  { label: 'Private Label',             slug: 'private-label' },
  { label: 'Custom Enclosure',          slug: 'custom-enclosure' },
  { label: '3D Small-batch Prototype',  slug: '3d-prototype' },
  { label: 'Firmware Integration',      slug: 'firmware-integration' },
  { label: 'Audio &amp; DSP Tuning',    slug: 'audio-dsp-tuning' },
  { label: 'Audio & DSP Tuning',        slug: 'audio-dsp-tuning' },
  { label: 'AI SDK Integration',        slug: 'ai-sdk-integration' },
  { label: 'Prototype Validation',      slug: 'prototype-validation' },
  { label: 'EVT / DVT / PVT',          slug: 'evt-dvt-pvt' },
  { label: 'SMT Manufacturing',         slug: 'smt-manufacturing' },
  { label: 'Certification Support',     slug: 'certification-support' },
  { label: 'Supply Chain Management',   slug: 'supply-chain' },
];

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 对每个 custom-devices 子页面，找到包含该 label 文字的 dropdown-link
  // 把它的 href 改为正确的路径
  customPages.forEach(({ label, slug }) => {
    const correctHref = `${prefix}custom-devices/${slug}/index.html`;

    // 匹配 <a href="任意路径" class="dropdown-link...">label</a>
    // 或 <a href="任意路径" class="mobile-nav-link...">label</a>
    const patterns = [
      // 桌面导航 dropdown-link（包含或不含 nav-current）
      new RegExp(`href="[^"]*" class="dropdown-link[^"]*">\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`, 'g'),
      // mobile nav
      new RegExp(`href="[^"]*" class="mobile-nav-link[^"]*">\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<`, 'g'),
    ];

    patterns.forEach(pattern => {
      html = html.replace(pattern, (match) => {
        const fixed = match.replace(/href="[^"]*"/, `href="${correctHref}"`);
        if (fixed !== match) changed = true;
        return fixed;
      });
    });
  });

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
