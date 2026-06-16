const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname);

const pages = [
  { file: 'custom-devices/private-label/index.html',         href: '../../custom-devices/private-label/',         label: 'Private Label' },
  { file: 'custom-devices/custom-enclosure/index.html',      href: '../../custom-devices/custom-enclosure/',      label: 'Custom Enclosure' },
  { file: 'custom-devices/3d-prototype/index.html',          href: '../../custom-devices/3d-prototype/',          label: '3D Small-batch Prototype' },
  { file: 'custom-devices/firmware-integration/index.html',  href: '../../custom-devices/firmware-integration/',  label: 'Firmware Integration' },
  { file: 'custom-devices/audio-dsp-tuning/index.html',      href: '../../custom-devices/audio-dsp-tuning/',      label: 'Audio & DSP Tuning' },
  { file: 'custom-devices/ai-sdk-integration/index.html',    href: '../../custom-devices/ai-sdk-integration/',    label: 'AI SDK Integration' },
  { file: 'custom-devices/prototype-validation/index.html',  href: '../../custom-devices/prototype-validation/',  label: 'Prototype Validation' },
  { file: 'custom-devices/evt-dvt-pvt/index.html',           href: '../../custom-devices/evt-dvt-pvt/',           label: 'EVT / DVT / PVT' },
  { file: 'custom-devices/smt-manufacturing/index.html',     href: '../../custom-devices/smt-manufacturing/',     label: 'SMT Manufacturing' },
  { file: 'custom-devices/certification-support/index.html', href: '../../custom-devices/certification-support/', label: 'Certification Support' },
  { file: 'custom-devices/supply-chain/index.html',          href: '../../custom-devices/supply-chain/',          label: 'Supply Chain Management' },
];

const ODM_HREF = '../../custom-devices/odm-oem/';

pages.forEach(({ file, href, label }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. 桌面导航：移除 odm-oem 的 nav-current
  html = html.replace(
    `href="${ODM_HREF}" class="dropdown-link nav-current" aria-current="page"`,
    `href="${ODM_HREF}" class="dropdown-link"`
  );

  // 2. 桌面导航：给当前页加上 nav-current
  html = html.replace(
    `href="${href}" class="dropdown-link"`,
    `href="${href}" class="dropdown-link nav-current" aria-current="page"`
  );

  // 3. mobile nav：移除 odm-oem 的高亮样式
  html = html.replace(
    `href="${ODM_HREF}" class="mobile-nav-link" aria-current="page" style="color:#2563eb;font-weight:700;"`,
    `href="${ODM_HREF}" class="mobile-nav-link"`
  );
  // 也处理属性顺序不同的情况
  html = html.replace(
    `href="${ODM_HREF}" class="mobile-nav-link" style="color:#2563eb;font-weight:700;" aria-current="page"`,
    `href="${ODM_HREF}" class="mobile-nav-link"`
  );

  // 4. mobile nav：给当前页加高亮（先归一化，避免重复应用产生重复属性）
  // 4a. 若当前页链接已带高亮（任意属性顺序），先剥除还原成 plain
  html = html.replace(
    `href="${href}" class="mobile-nav-link" aria-current="page" style="color:#2563eb;font-weight:700;"`,
    `href="${href}" class="mobile-nav-link"`
  );
  html = html.replace(
    `href="${href}" class="mobile-nav-link" style="color:#2563eb;font-weight:700;" aria-current="page"`,
    `href="${href}" class="mobile-nav-link"`
  );
  // 4b. 再统一加上高亮
  html = html.replace(
    `href="${href}" class="mobile-nav-link"`,
    `href="${href}" class="mobile-nav-link" style="color:#2563eb;font-weight:700;" aria-current="page"`
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
