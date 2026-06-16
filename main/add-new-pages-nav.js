const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

// 新增的三个页面和各自的路径前缀
const newPages = [
  { file: 'process\\index.html',                    prefix: '../' },
  { file: 'implementation\\index.html',             prefix: '../' },
  { file: 'industries\\healthcare\\index.html',     prefix: '../../' },
];

// 参考文件：用 about/index.html 作为导航模板（前缀 ../）
const templateFile = path.join(BASE, 'about\\index.html');

if (!fs.existsSync(templateFile)) {
  console.error('Template file not found: about/index.html');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateFile, 'utf8');

// 从模板提取导航 CSS（<style> 块里从开头到 </style>）
const stylePart = templateHtml.match(/<style>([\s\S]*?)<\/style>/)?.[1] || '';

// 从模板提取 <nav>...</nav>
const navPart = templateHtml.match(/<nav[\s\S]*?<\/nav>/)?.[0] || '';

// 从模板提取 mobile nav
const mobileNavPart = templateHtml.match(/<div class="mobile-nav"[\s\S]*?<div class="mobile-nav-overlay"[^>]*><\/div>\s*<\/div>/)?.[0] || '';

// 从模板提取导航 JS（burger、scroll、dropdown filter）
const scriptMatch = templateHtml.match(/<script>([\s\S]*?)<\/script>/g) || [];
const navScript = scriptMatch.find(s => s.includes('navBurger') || s.includes('scrolled') || s.includes('mobileNav')) || '';

newPages.forEach(({ file, prefix }) => {
  const filePath = path.join(BASE, file);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${file}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 1. 替换/插入导航 CSS
  // 把模板里 ../img/ 换成对应前缀
  let css = stylePart.replace(/\.\.\/img\//g, `${prefix}img/`);

  if (html.includes('<style>')) {
    html = html.replace(/<style>([\s\S]*?)<\/style>/, `<style>${css}</style>`);
  } else {
    html = html.replace('</head>', `<style>${css}</style>\n</head>`);
  }

  // 2. 替换 nav HTML，调整路径前缀
  let nav = navPart;
  // 把模板的 ../ 路径换成目标前缀
  nav = nav.replace(/href="\.\.\/img\//g, `href="${prefix}img/`);
  nav = nav.replace(/href="\.\.\/index\.html/g, `href="${prefix}index.html`);
  nav = nav.replace(/href="\.\.\/products\//g, `href="${prefix}products/`);
  nav = nav.replace(/href="\.\.\/custom-devices\//g, `href="${prefix}custom-devices/`);
  nav = nav.replace(/href="\.\.\/about\//g, `href="${prefix}about/`);
  nav = nav.replace(/href="\.\.\/blog\//g, `href="${prefix}blog/`);
  nav = nav.replace(/href="\.\.\/contact\//g, `href="${prefix}contact/`);
  nav = nav.replace(/href="\.\.\/faq\//g, `href="${prefix}faq/`);
  nav = nav.replace(/href="\.\.\/industries\//g, `href="${prefix}industries/`);
  nav = nav.replace(/href="\.\.\/process\//g, `href="${prefix}process/`);
  nav = nav.replace(/href="\.\.\/implementation\//g, `href="${prefix}implementation/`);
  // 去掉 about 页面的 nav-current 高亮
  nav = nav.replace(/class="nav-link nav-company-active"/g, 'class="nav-link"');
  nav = nav.replace(/class="dropdown-link nav-current" aria-current="page"/g, 'class="dropdown-link"');

  if (html.match(/<nav[\s\S]*?<\/nav>/)) {
    html = html.replace(/<nav[\s\S]*?<\/nav>/, nav);
  } else {
    html = html.replace('<body>', '<body>\n' + nav);
  }

  // 3. 替換 mobile nav
  let mobileNav = mobileNavPart;
  mobileNav = mobileNav.replace(/href="\.\.\/products\//g, `href="${prefix}products/`);
  mobileNav = mobileNav.replace(/href="\.\.\/custom-devices\//g, `href="${prefix}custom-devices/`);
  mobileNav = mobileNav.replace(/href="\.\.\/about\//g, `href="${prefix}about/`);
  mobileNav = mobileNav.replace(/href="\.\.\/blog\//g, `href="${prefix}blog/`);
  mobileNav = mobileNav.replace(/href="\.\.\/contact\//g, `href="${prefix}contact/`);
  mobileNav = mobileNav.replace(/href="\.\.\/faq\//g, `href="${prefix}faq/`);
  mobileNav = mobileNav.replace(/href="\.\.\/industries\//g, `href="${prefix}industries/`);
  mobileNav = mobileNav.replace(/href="\.\.\/process\//g, `href="${prefix}process/`);
  mobileNav = mobileNav.replace(/href="\.\.\/implementation\//g, `href="${prefix}implementation/`);
  // 去掉 about 高亮
  mobileNav = mobileNav.replace(/style="color:#2563eb;font-weight:700;" aria-current="page"/g, '');

  if (html.match(/<div class="mobile-nav"/)) {
    html = html.replace(/<div class="mobile-nav"[\s\S]*?<div class="mobile-nav-overlay"[^>]*><\/div>\s*<\/div>/, mobileNav);
  } else {
    html = html.replace('</nav>', '</nav>\n' + mobileNav);
  }

  // 4. 替换导航 JS
  if (navScript) {
    const scripts = html.match(/<script>([\s\S]*?)<\/script>/g) || [];
    const existingNavScript = scripts.find(s => s.includes('navBurger') || s.includes('mobileNav'));
    if (existingNavScript) {
      html = html.replace(existingNavScript, navScript);
    } else {
      html = html.replace('</body>', navScript + '\n</body>');
    }
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`DONE: ${file}`);
});
