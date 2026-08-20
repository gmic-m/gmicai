/**
 * fix-book-a-meeting-links.js
 * ---------------------------------------------------------------
 * 把全站预约按钮的链接统一指向站内的 /book-a-meeting/ 页面。
 *
 * 处理两类旧链接：
 *   1. Google Calendar 预约页（两种写法，带和不带 /u/0）
 *   2. 上一版的站内路径 (../)*book-demo/index.html
 *
 * 用法（在 main 目录下）：
 *   node fix-book-a-meeting-links.js --dry    预览，不写文件
 *   node fix-book-a-meeting-links.js          执行（先自动备份）
 *
 * - 相对路径按每个文件所在目录深度计算
 * - 被改动的 <a> 上去掉 target="_blank" / rel="noopener"（站内跳转不新开标签页）
 * - build-*.js / rebuild-*.js 生成器脚本按它们生成的页面层级处理，不动 target/rel
 * - 执行前把所有将被修改的文件、以及整个 book-demo/ 目录原样备份
 * ---------------------------------------------------------------
 */

const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const DRY = process.argv.includes('--dry');

const OLD_URLS = [
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb',
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1Zt7KlkfMyOoHb9-Aydz4eDp3rzzr4Zpzgl3r0aizQHWVL1jbWvGD0xbd24AxJeoyqK-Jn7FDb',
];
// 上一版的站内路径，任意层数的 ../
const OLD_PATH_RE = /(?:\.\.\/)*book-demo\/index\.html/g;

// 生成器脚本 → 它生成的页面层级
const BUILDER_DEPTH = {
  'build-solutions-pages.js': 2,   // solutions/<slug>/index.html
  'rebuild-healthcare-page.js': 2, // industries/healthcare/index.html
  'build-enterprise-page.js': 2,   // industries/enterprise/index.html
  'build-veterinary-page.js': 2,   // industries/veterinary/index.html
  'build-proof-page.js': 1,        // proof/index.html
};

const SKIP_DIRS = new Set(['node_modules', '.git', 'img', 'css', 'book-demo']);
const SKIP_FILES = new Set(['fix-book-demo-links.js', 'fix-book-a-meeting-links.js']);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('_backup-')) continue;
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(name)) continue;
      walk(full, out);
    } else if (/\.(html|js)$/i.test(name)) {
      out.push(full);
    }
  }
  return out;
}

const hrefFor = (d) => (d === 0 ? '' : '../'.repeat(d)) + 'book-a-meeting/index.html';

function cleanAnchors(html, newHref) {
  const esc = newHref.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const tagRe = new RegExp('<a\\b[^>]*href="' + esc + '"[^>]*>', 'gi');
  return html.replace(tagRe, (tag) =>
    tag
      .replace(/\s+target\s*=\s*"(_blank|_self)"/gi, '')
      .replace(/\s+rel\s*=\s*"[^"]*"/gi, '')
      .replace(/\s{2,}/g, ' ')
  );
}

const changed = [];
let hitsUrl = 0, hitsPath = 0;

for (const full of walk(BASE)) {
  const rel = path.relative(BASE, full).split(path.sep).join('/');
  if (rel === 'book-a-meeting/index.html') continue;
  if (SKIP_FILES.has(path.basename(full))) continue;

  const src = fs.readFileSync(full, 'utf8');
  const hasUrl = OLD_URLS.some((u) => src.includes(u));
  const hasPath = /(?:\.\.\/)*book-demo\/index\.html/.test(src);
  if (!hasUrl && !hasPath) continue;

  const isJs = /\.js$/i.test(rel);
  let depth;
  if (isJs) {
    depth = BUILDER_DEPTH[path.basename(full)];
    if (depth === undefined) {
      console.warn('  [跳过] ' + rel + ' —— 未登记的 js，请手动确认它生成的页面层级');
      continue;
    }
  } else {
    depth = rel.split('/').length - 1;
  }

  const newHref = hrefFor(depth);
  let out = src, u = 0, p = 0;
  for (const url of OLD_URLS) {
    const parts = out.split(url);
    u += parts.length - 1;
    out = parts.join(newHref);
  }
  out = out.replace(OLD_PATH_RE, () => { p++; return newHref; });
  if (!isJs) out = cleanAnchors(out, newHref);

  if (out !== src) {
    changed.push({ rel, hits: u + p, u, p, newHref, src, out });
    hitsUrl += u; hitsPath += p;
  }
}

console.log('');
console.log(DRY ? '=== 预览模式（不写文件） ===' : '=== 执行中 ===');
console.log('需要修改：' + changed.length + ' 个文件');
console.log('  Google Calendar 链接：' + hitsUrl + ' 处');
console.log('  旧站内 book-demo 路径：' + hitsPath + ' 处');
console.log('  合计：' + (hitsUrl + hitsPath) + ' 处');
console.log('');

const byHref = {};
for (const c of changed) (byHref[c.newHref] = byHref[c.newHref] || []).push(c);
for (const href of Object.keys(byHref).sort()) {
  console.log('→ ' + href + '   (' + byHref[href].length + ' 个文件)');
  for (const c of byHref[href]) console.log('    ' + String(c.hits).padStart(2) + '  ' + c.rel);
}
console.log('');

if (DRY) { console.log('预览结束。确认后去掉 --dry 再跑。'); process.exit(0); }

// ---- 备份：被改文件 + 整个 book-demo/ ----
const d = new Date();
const stamp = [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds()]
  .map((n, i) => String(n).padStart(i === 0 ? 4 : 2, '0')).join('');
const backupDir = path.join(BASE, '_backup-links-' + stamp);

for (const c of changed) {
  const dest = path.join(backupDir, c.rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, c.src, 'utf8');
}
// book-demo/ 整个目录也备份（下一步会删除它）
const bd = path.join(BASE, 'book-demo');
if (fs.existsSync(bd)) {
  for (const name of fs.readdirSync(bd)) {
    const s = path.join(bd, name);
    if (fs.statSync(s).isFile()) {
      const dest = path.join(backupDir, 'book-demo', name);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(s, dest);
    }
  }
  console.log('已备份 book-demo/ 整个目录');
}
console.log('备份目录：' + path.basename(backupDir));

for (const c of changed) fs.writeFileSync(path.join(BASE, c.rel), c.out, 'utf8');
console.log('完成：' + changed.length + ' 个文件、' + (hitsUrl + hitsPath) + ' 处链接。');
console.log('回滚：把 ' + path.basename(backupDir) + '/ 覆盖回原位置。');
