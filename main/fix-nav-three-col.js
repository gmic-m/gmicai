const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';
const BACKUP = 'C:\\Users\\meng\\AppData\\Local\\Temp\\claude\\C--Users-meng\\40c9777a-712f-47bc-b482-a6511b3bbae8\\scratchpad\\navmerge-backup';

const pages = [
  { file: 'index.html',                                        prefix: './' },
  { file: 'about\\index.html',                                 prefix: '../' },
  { file: 'blog\\index.html',                                  prefix: '../' },
  { file: 'contact\\index.html',                               prefix: '../' },
  { file: 'products\\index.html',                              prefix: '../' },
  { file: 'faq\\index.html',                                   prefix: '../' },
  { file: 'implementation\\index.html',                        prefix: '../' },
  { file: 'process\\index.html',                               prefix: '../' },
  { file: 'proof\\index.html',                                 prefix: '../' },
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
  { file: 'industries\\healthcare\\index.html',                prefix: '../../' },
  { file: 'industries\\enterprise\\index.html',                prefix: '../../' },
  { file: 'industries\\field-service\\index.html',             prefix: '../../' },
  { file: 'industries\\logistics\\index.html',                 prefix: '../../' },
  { file: 'industries\\public-safety\\index.html',             prefix: '../../' },
  { file: 'industries\\sales-intelligence\\index.html',        prefix: '../../' },
  { file: 'industries\\veterinary\\index.html',                prefix: '../../' },
  { file: 'industries\\voice-agents\\index.html',              prefix: '../../' },
  { file: 'products\\mic01\\index.html',                       prefix: '../../' },
  { file: 'products\\mic05\\index.html',                       prefix: '../../' },
  { file: 'products\\mic06\\index.html',                       prefix: '../../' },
];

function buildProductsNavItem(P) {
  const hardwareHref = (P === './') ? '#hardware' : P + 'index.html#hardware';
  return `      <!-- Products -->
      <div class="nav-item has-dropdown">
        <a href="${hardwareHref}" class="nav-link">
          Products <span class="nav-arrow">›</span>
        </a>
        <div class="nav-dropdown nav-dropdown--text">
          <div class="dropdown-inner">
            <div class="dropdown-col">
              <p class="dropdown-col-head">Products</p>
              <a href="${P}products/mic06/index.html" class="dropdown-link">MIC06</a>
              <a href="${P}products/mic05/index.html" class="dropdown-link">MIC05</a>
              <a href="${P}products/mic01/index.html" class="dropdown-link">MIC01</a>
            </div>
            <div class="dropdown-col">
              <p class="dropdown-col-head">Industries</p>
              <a href="${P}industries/enterprise/index.html" class="dropdown-link">Enterprise</a>
              <a href="${P}industries/field-service/index.html" class="dropdown-link">Field Service</a>
              <a href="${P}industries/healthcare/index.html" class="dropdown-link">Healthcare</a>
              <a href="${P}industries/logistics/index.html" class="dropdown-link">Logistics</a>
              <a href="${P}industries/public-safety/index.html" class="dropdown-link">Public Safety</a>
              <a href="${P}industries/sales-intelligence/index.html" class="dropdown-link">Sales Intelligence</a>
              <a href="${P}industries/veterinary/index.html" class="dropdown-link">Veterinary</a>
              <a href="${P}industries/voice-agents/index.html" class="dropdown-link">Voice Agents</a>
            </div>
            <div class="dropdown-col">
              <p class="dropdown-col-head">Company</p>
              <a href="${P}about/index.html" class="dropdown-link">About Us</a>
              <a href="${P}blog/index.html" class="dropdown-link">Blog</a>
              <a href="${P}contact/index.html" class="dropdown-link">Contact</a>
              <a href="${P}faq/index.html" class="dropdown-link">FAQ</a>
            </div>
          </div>
        </div>
      </div>`;
}

let ok = 0, problems = [];

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) { console.log(`SKIP (missing): ${file}`); return; }

  let html = fs.readFileSync(filePath, 'utf8');

  // backup first
  const bkp = path.join(BACKUP, file);
  fs.mkdirSync(path.dirname(bkp), { recursive: true });
  fs.writeFileSync(bkp, html, 'utf8');

  const flags = {};

  // 1) Replace the whole Products nav-item with the combined 3-col text dropdown
  const reProducts = /      <!-- Products -->[\s\S]*?\n      <\/div>(?=\n\n      <!-- Custom Devices -->)/;
  flags.products = reProducts.test(html);
  if (flags.products) html = html.replace(reProducts, buildProductsNavItem(prefix));

  // 2) Remove the standalone Industries nav-item (folded into Products)
  const reIndustries = /\n\n      <!-- Industries -->[\s\S]*?\n      <\/div>(?=\n\n      <!-- Process -->)/;
  flags.industries = reIndustries.test(html);
  if (flags.industries) html = html.replace(reIndustries, '');

  // 3) Remove the standalone Company nav-item (folded into Products)
  const reCompany = /\n\n      <!-- Company -->[\s\S]*?\n      <\/div>(?=\n\n    <\/div>)/;
  flags.company = reCompany.test(html);
  if (flags.company) html = html.replace(reCompany, '');

  fs.writeFileSync(filePath, html, 'utf8');

  const allOk = flags.products && flags.industries && flags.company;
  if (allOk) ok++; else problems.push({ file, flags });
  console.log(`${allOk ? 'DONE' : 'WARN'}: ${file}  (products:${flags.products} industries:${flags.industries} company:${flags.company})`);
});

console.log(`\n成功完整修改 ${ok} 个文件`);
if (problems.length) {
  console.log(`\n以下文件有未匹配的部分（已按可匹配部分修改，请检查）：`);
  problems.forEach(p => console.log('  - ' + p.file + ' ' + JSON.stringify(p.flags)));
}
console.log(`\n备份目录: ${BACKUP}`);
