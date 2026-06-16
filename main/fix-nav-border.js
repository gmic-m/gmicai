const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

const pages = [
  { file: 'index.html' },
  { file: 'about\\index.html' },
  { file: 'blog\\index.html' },
  { file: 'contact\\index.html' },
  { file: 'products\\index.html' },
  { file: 'faq\\index.html' },
  { file: 'custom-devices\\index.html' },
  { file: 'custom-devices\\odm-oem\\index.html' },
  { file: 'custom-devices\\private-label\\index.html' },
  { file: 'custom-devices\\custom-enclosure\\index.html' },
  { file: 'custom-devices\\3d-prototype\\index.html' },
  { file: 'custom-devices\\firmware-integration\\index.html' },
  { file: 'custom-devices\\audio-dsp-tuning\\index.html' },
  { file: 'custom-devices\\ai-sdk-integration\\index.html' },
  { file: 'custom-devices\\prototype-validation\\index.html' },
  { file: 'custom-devices\\evt-dvt-pvt\\index.html' },
  { file: 'custom-devices\\smt-manufacturing\\index.html' },
  { file: 'custom-devices\\certification-support\\index.html' },
  { file: 'custom-devices\\supply-chain\\index.html' },
  { file: 'products\\mic06\\index.html' },
  { file: 'products\\mic05\\index.html' },
  { file: 'products\\mic01\\index.html' },
  { file: 'products\\telalive\\index.html' },
];

// 所有可能出现的 border-bottom 写法
const borderPatterns = [
  // CSS 里的 .nav { ... border-bottom: ... }
  /\.nav\s*\{[^}]*border-bottom\s*:[^;]+;/g,
  // CSS 里的 .nav.scrolled { ... border-bottom: ... }
  /\.nav\.scrolled\s*\{[^}]*border-bottom\s*:[^;]+;/g,
  // inline style 里的 border-bottom
  /border-bottom\s*:\s*[^;'"]+;/g,
];

pages.forEach(({ file }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP: ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 只处理 <style> 块里的 .nav 相关 border-bottom
  // 用精准替换，避免误改正文内容的 border-bottom
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
  if (styleMatch) {
    let css = styleMatch[1];

    // 去掉 .nav 规则里的 border-bottom
    css = css.replace(/(\.nav[^{]*\{[^}]*)border-bottom\s*:[^;]+;/g, '$1');

    // 去掉 .nav.scrolled 规则里的 border-bottom
    css = css.replace(/(\.nav\.scrolled[^{]*\{[^}]*)border-bottom\s*:[^;]+;/g, '$1');

    // 额外补一条强制覆盖，确保任何状态下都没有底边
    if (!css.includes('.nav { border-bottom: none !important; }')) {
      css += '\n.nav { border-bottom: none !important; box-shadow: none !important; }\n';
    }

    html = html.replace(/<style>([\s\S]*?)<\/style>/, `<style>${css}</style>`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
