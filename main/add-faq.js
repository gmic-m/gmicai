const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

const pages = [
  { file: 'index.html',                                        prefix: './' },
  { file: 'about\\index.html',                                 prefix: '../' },
  { file: 'blog\\index.html',                                  prefix: '../' },
  { file: 'contact\\index.html',                               prefix: '../' },
  { file: 'products\\index.html',                              prefix: '../' },
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

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  const contactDropdown = `<a href="${prefix}contact/index.html" class="dropdown-link">Contact</a>`;
  const faqDropdown     = `<a href="${prefix}faq/index.html" class="dropdown-link">FAQ</a>`;
  const contactMobile   = `<a href="${prefix}contact/index.html" class="mobile-nav-link">Contact</a>`;
  const faqMobile       = `<a href="${prefix}faq/index.html" class="mobile-nav-link">FAQ</a>`;

  // 桌面导航：Contact 后加 FAQ（避免重复添加）
  if (html.includes(contactDropdown) && !html.includes(faqDropdown)) {
    html = html.replace(contactDropdown, contactDropdown + '\n              ' + faqDropdown);
  }

  // mobile nav：Contact 后加 FAQ（避免重复添加）
  if (html.includes(contactMobile) && !html.includes(faqMobile)) {
    html = html.replace(contactMobile, contactMobile + '\n      ' + faqMobile);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
