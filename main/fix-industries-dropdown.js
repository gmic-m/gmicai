const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

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

pages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  const newDropdown = `<div class="dropdown-inner">
            <div class="dropdown-col">
              <p class="dropdown-col-head">Industries</p>
              <a href="${prefix}industries/enterprise/index.html" class="dropdown-link">Enterprise</a>
              <a href="${prefix}industries/field-service/index.html" class="dropdown-link">Field Service</a>
              <a href="${prefix}industries/healthcare/index.html" class="dropdown-link">Healthcare</a>
              <a href="${prefix}industries/logistics/index.html" class="dropdown-link">Logistics</a>
              <a href="${prefix}industries/public-safety/index.html" class="dropdown-link">Public Safety</a>
              <a href="${prefix}industries/sales-intelligence/index.html" class="dropdown-link">Sales Intelligence</a>
              <a href="${prefix}industries/veterinary/index.html" class="dropdown-link">Veterinary</a>
              <a href="${prefix}industries/voice-agents/index.html" class="dropdown-link">Voice Agents</a>
            </div>
          </div>`;

  const newMobile = `<div class="mobile-nav-section">
  <p class="mobile-nav-head">Industries</p>
  <a href="${prefix}industries/enterprise/index.html" class="mobile-nav-link">Enterprise</a>
  <a href="${prefix}industries/field-service/index.html" class="mobile-nav-link">Field Service</a>
  <a href="${prefix}industries/healthcare/index.html" class="mobile-nav-link">Healthcare</a>
  <a href="${prefix}industries/logistics/index.html" class="mobile-nav-link">Logistics</a>
  <a href="${prefix}industries/public-safety/index.html" class="mobile-nav-link">Public Safety</a>
  <a href="${prefix}industries/sales-intelligence/index.html" class="mobile-nav-link">Sales Intelligence</a>
  <a href="${prefix}industries/veterinary/index.html" class="mobile-nav-link">Veterinary</a>
  <a href="${prefix}industries/voice-agents/index.html" class="mobile-nav-link">Voice Agents</a>
</div>`;

  let descReplaced = false;
  html = html.replace(
    /<div class="dropdown-inner">\s*<div class="dropdown-col">\s*<p class="dropdown-col-head">Healthcare & Ops<\/p>[\s\S]*?<\/div>\s*<\/div>/,
    () => { descReplaced = true; return newDropdown; }
  );

  let mobileReplaced = false;
  html = html.replace(
    /<div class="mobile-nav-section">[\s\S]*?<p class="mobile-nav-head">Industries<\/p>[\s\S]*?<\/div>/,
    () => { mobileReplaced = true; return newMobile; }
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}  (desktop:${descReplaced} mobile:${mobileReplaced})`);
});
