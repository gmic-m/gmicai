const fs = require('fs');
const path = require('path');

const BASE = 'C:\\Users\\meng\\Desktop\\gmic\\main';

// 递归获取所有 html 文件
function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      // 跳过 node_modules 和 .git
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// 同时处理 CSS 和 JS 文件
function getAllTargetFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        results = results.concat(getAllTargetFiles(filePath));
      }
    } else if (
      file.endsWith('.html') ||
      file.endsWith('.css') ||
      file.endsWith('.js')
    ) {
      results.push(filePath);
    }
  });
  return results;
}

const files = getAllTargetFiles(BASE);
let totalChanged = 0;

files.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // 替换所有变体写法
  const replacements = [
    ['img/products/',   'img/products/'],
    ['img\\product\\', 'img\\products\\'],
    ['/img/products/',  '/img/products/'],
  ];

  let changed = false;
  replacements.forEach(([from, to]) => {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    const rel = path.relative(BASE, filePath);
    console.log('DONE: ' + rel);
    totalChanged++;
  }
});

console.log('\n共修改了 ' + totalChanged + ' 个文件');
