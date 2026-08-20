/**
 * fix-book-demo-links.js
 * ---------------------------------------------------------------
 * 把全站所有指向 Google Calendar 预约页的链接
 * （"Start a Project" / "Book a Demo" / "Start Your Project" 等按钮）
 * 统一改成站内的 /book-demo/ 页面。
 *
 * 用法（在 main 目录下）：
 *   node fix-book-demo-links.js --dry    先预览，不改任何文件
 *   node fix-book-demo-links.js          真正执行（会先自动备份）
 *
 * 说明：
 * - 会按每个文件所在的目录层级自动算相对路径
 *   （根目录 → book-demo/index.html，一级 → ../book-demo/index.html，依此类推）
 * - 同时去掉这些链接上的 target="_blank" 和 rel="noopener"，
 *   因为现在是站内跳转，不该新开标签页
 * - build-*.js / rebuild-*.js 这些生成器脚本里的链接也一起改，
 *   避免以后重新生成页面时又把旧链接写回去
 * - 执行前会把所有将被修改的文件原样复制到 _backup-links-<时间戳>/ 下
 * ---------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const DRY = process.argv.includes('--dry');

// 要替换掉的旧链接（两种写法都有出现）
const OLD_URLS = [
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb',
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb',
];

// 生成器脚本 → 它生成的页面所在层级（决定相对路径的 ../ 个数）
const BUILDER_DEPTH = {
  'build-solutions-pages.js': 2,   // solutions/<slug>/index.html
  'rebuild-healthcare-page.js': 2, // industries/healthcare/index.html
  'build-enterprise-page.js': 2,   // industries/enterprise/index.html
  'build-veterinary-page.js': 2,   // industries/veterinary/index.html
  'build-proof-page.js': 1,        // proof/index.html
};

const SKIP_DIRS = new Set(['node_modules', '.git', 'img', 'css']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('_backup-links-')) continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, out);
    } else if (/\.(html|js)$/i.test(name)) {
      out.push(full);
    }
  }
  return out;
}

function hrefFor(depth) {
  return (depth === 0 ? '' : '../'.repeat(depth)) + 'book-demo/index.html';
}

// 去掉锚点标签上的 target="_blank" / rel="noopener..."
function cleanAnchors(html, newHref) {
  const escaped = newHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagRe = new RegExp('<a\\b[^>]*href="' + escaped + '"[^>]*>', 'gi');
  return html.replace(tagRe, (tag) =>
    tag
      .replace(/\s+target\s*=\s*"(_blank|_self)"/gi, '')
      .replace(/\s+rel\s*=\s*"[^"]*"/gi, '')
      .replace(/\s{2,}/g, ' ')
  );
}

const files = walk(BASE);
const changed = [];
let totalHits = 0;

for (const full of files) {
  const rel = path.relative(BASE, full).split(path.sep).join('/');
  if (rel === 'book-demo/index.html') continue;          // 预约页自己不用改
  if (path.basename(full) === 'fix-book-demo-links.js') continue;

  let src = fs.readFileSync(full, 'utf8');
  if (!OLD_URLS.some((u) => src.includes(u))) continue;

  const isJs = /\.js$/i.test(rel);
  let depth;
  if (isJs) {
    depth = BUILDER_DEPTH[path.basename(full)];
    if (depth === undefined) {
      console.warn('  [跳过] ' + rel + ' —— 未知的生成器脚本，请手动确认它生成的页面层级');
      continue;
    }
  } else {
    depth = rel.split('/').length - 1;
  }

  const newHref = hrefFor(depth);
  let out = src;
  let hits = 0;
  for (const u of OLD_URLS) {
    const parts = out.split(u);
    hits += parts.length - 1;
    out = parts.join(newHref);
  }
  if (!isJs) out = cleanAnchors(out, newHref);

  if (out !== src) {
    changed.push({ rel, hits, newHref, src, out });
    totalHits += hits;
  }
}

console.log('');
console.log(DRY ? '=== 预览模式（不写文件） ===' : '=== 执行中 ===');
console.log('扫描文件：' + files.length + '，需要修改：' + changed.length + '，链接总数：' + totalHits);
console.log('');

const byHref = {};
for (const c of changed) (byHref[c.newHref] = byHref[c.newHref] || []).push(c);
for (const href of Object.keys(byHref).sort()) {
  console.log('→ ' + href);
  for (const c of byHref[href]) console.log('    ' + c.rel + '  (' + c.hits + ')');
}
console.log('');

if (DRY) {
  console.log('预览结束。确认无误后去掉 --dry 再跑一次。');
  process.exit(0);
}

// 备份
const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
const backupDir = path.join(BASE, '_backup-links-' + stamp);
for (const c of changed) {
  const dest = path.join(backupDir, c.rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, c.src, 'utf8');
}
console.log('原文件已备份到：' + path.basename(backupDir));

// 写入
for (const c of changed) {
  fs.writeFileSync(path.join(BASE, c.rel), c.out, 'utf8');
}
console.log('完成，已修改 ' + changed.length + ' 个文件、' + totalHits + ' 处链接。');
console.log('');
console.log('回滚方法：把 ' + path.basename(backupDir) + '/ 里的文件覆盖回原位置即可。');
