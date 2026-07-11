/* ============================================================
   Products Mega Menu
   ------------------------------------------------------------
   Rebuilds the existing .nav-dropdown--products panel into a
   full-width mega menu (left category list → right product cards),
   and adds a "Products" accordion to the mobile drawer.

   Single source of truth for all pages. Injected via a <script>
   tag; derives the correct relative path to /products/ per page
   from the existing "View All" link, so it works at any folder depth.
   ============================================================ */
(function () {
  'use strict';
  if (window.__gmicProductsMegaInit) return;
  window.__gmicProductsMegaInit = true;

  // ---- Product data (slug = dedicated product page, or View-All page + #anchor) ----
  var OV = 'img/products/overview/'; // product thumbnails
  var PV = 'products/index.html#';   // View-All page + anchor (products without a dedicated page)
  var CATEGORIES = [
    { name: 'AI Voice Recorders', badge: 'Popular', products: [
      { name: 'MIC01', slug: 'products/mic01/index.html', img: OV + 'HA-MIC01.png', desc: 'Entry-level pilot device' },
      { name: 'MIC02', slug: PV + 'mic02', img: OV + 'HA-MIC02.png' },
      { name: 'MIC04', slug: PV + 'mic04', img: OV + 'HA-MIC04.jpg' },
      { name: 'MIC05', slug: 'products/mic05/index.html', img: OV + 'HA-MIC05.jpg', desc: 'Button-triggered capture for field notes' },
      { name: 'MIC06A', slug: 'products/mic06/index.html', img: OV + 'HA-MIC06A.jpg', desc: 'Continuous voice capture for shift-based operations' },
      { name: 'MIC06B', slug: PV + 'mic06b', img: OV + 'HA-MIC06B.jpg' }
    ]},
    { name: 'AI Wearables', products: [
      { name: 'Smart Glasses', slug: PV + 'smart-glasses', img: OV + 'HA-GLS01.jpg' },
      { name: 'Earbuds', slug: PV + 'earbuds', img: OV + 'HA-TWS01.jpg' },
      { name: 'Bone Conduction', slug: PV + 'bone-conduction', img: OV + 'HA-BC01.jpg' },
      { name: 'Smart Pen', slug: PV + 'smart-pen', img: OV + 'HA-PEN01.jpg' }
    ]},
    { name: 'AI Communication', products: [
      { name: 'Telalive', slug: 'products/telalive/index.html', img: OV + 'telalive.png', desc: 'AI-powered desk phone & wearable platform' },
      { name: 'VoiceLink', slug: PV + 'voicelink', img: OV + 'HA-TR01.jpg' },
      { name: 'AI Phone Assistant', slug: PV + 'ai-phone-assistant', img: OV + 'HA-TEL02.jpg' }
    ]},
    { name: 'AI Speakers', products: [
      { name: 'SPK01', slug: PV + 'spk01', img: OV + 'HA-SPK01.jpg' },
      { name: 'SPK02', slug: PV + 'spk02', img: OV + 'HA-SPK02.jpg' },
      { name: 'SPK03', slug: PV + 'spk03', img: OV + 'HA-SPK03_Bluetooth.jpg' }
    ]},
    { name: 'AI Companion', products: [
      { name: 'BuddyBear', slug: PV + 'buddybear', img: OV + 'HA-TOY01.jpg' },
      { name: 'BirthdayBird', slug: PV + 'birthdaybird', img: OV + 'HA-TOY02.png' }
    ]},
    { name: 'Developer Kits', products: [
      { name: 'ESP32 Kit', slug: PV + 'esp32-kit', img: OV + 'HA-ESP32-KIT.jpg' }
    ]}
  ];

  var ARROW = '<svg class="pmm-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };

  function injectStyles() {
    if (document.getElementById('pmm-styles')) return;
    var css =
      /* desktop mega menu */
      '.pmm-inner{max-width:1200px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:260px 1fr;gap:36px;align-items:start}' +
      '.pmm-left{display:flex;flex-direction:column;gap:2px;border-right:1px solid rgba(0,0,0,0.06);padding-right:14px}' +
      '.pmm-cat{display:flex;align-items:center;gap:8px;width:100%;white-space:nowrap;text-align:left;background:none;border:none;cursor:pointer;font-family:var(--sans);font-size:0.95rem;font-weight:600;color:#0f172a;padding:11px 12px;border-radius:8px;transition:background .15s ease,color .15s ease}' +
      '.pmm-cat:hover,.pmm-cat.is-active{background:#f3f4f6}' +
      '.pmm-cat.is-active{color:#2563eb}' +
      '.pmm-cat-badge{font-size:10px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#2563eb;background:#eef3ff;border-radius:100px;padding:2px 8px;margin-left:auto}' +
      '.pmm-right{position:relative;min-height:170px}' +
      '.pmm-panel{display:none;grid-template-columns:1fr 1fr;gap:4px 28px}' +
      '.pmm-panel.is-active{display:grid;animation:pmm-fade .22s ease}' +
      '@keyframes pmm-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}' +
      '@media(prefers-reduced-motion:reduce){.pmm-panel.is-active{animation:none}}' +
      '.pmm-prod{display:flex;align-items:center;gap:12px;padding:8px 10px;border-radius:10px;font-family:var(--sans);font-size:0.95rem;line-height:1.3;text-decoration:none;transition:background .15s ease}' +
      'a.pmm-prod:hover{background:#f5f7ff}' +
      '.pmm-thumb{flex:none;width:48px;height:48px;border-radius:10px;object-fit:contain;background:#f3f4f6;padding:5px}' +
      '.pmm-prod-text{flex:1 1 auto;min-width:0;display:flex;flex-direction:column;gap:2px}' +
      '.pmm-prod-name{font-weight:600;color:#0f172a;line-height:1.25}' +
      'a.pmm-prod:hover .pmm-prod-name{color:#2563eb}' +
      '.pmm-prod-desc{font-size:0.8rem;font-weight:400;color:#6b7280;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.pmm-prod .pmm-arrow{flex:none;margin-left:auto;color:#2563eb;opacity:0;transform:translateX(-2px);transition:opacity .15s ease,transform .15s ease}' +
      'a.pmm-prod:hover .pmm-arrow{opacity:1;transform:translateX(0)}' +
      '.pmm-viewall{display:block;max-width:1200px;margin:18px auto 0;padding:16px 40px 0;border-top:1px solid rgba(0,0,0,0.06);font-family:var(--sans);font-size:0.9rem;font-weight:600;color:#2563eb;text-decoration:none;text-align:center}' +
      '.pmm-viewall:hover{color:#1d4ed8}' +
      /* mobile accordion */
      '.pmm-m-top,.pmm-m-cat-btn{display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;background:none;border:none;cursor:pointer;font-family:var(--sans);text-align:left}' +
      '.pmm-m-top{font-size:1rem;font-weight:500;color:#0f172a;padding:8px 0}' +
      '.pmm-m-chev{font-size:13px;color:#9ca3af;transition:transform .2s ease}' +
      '[aria-expanded="true"]>.pmm-m-chev{transform:rotate(90deg)}' +
      '.pmm-m-cats{padding:6px 0 0 2px}' +
      '.pmm-m-cat{border-top:1px solid rgba(0,0,0,0.05)}' +
      '.pmm-m-cat-btn{font-size:0.9rem;font-weight:600;color:#334155;padding:11px 0}' +
      '.pmm-m-badge{font-size:10px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:#2563eb;background:#eef3ff;border-radius:100px;padding:2px 8px;margin-left:8px}' +
      '.pmm-m-list{display:flex;flex-direction:column;gap:2px;padding:2px 0 10px 10px}' +
      '.pmm-m-list a{font-size:0.9rem;color:#0f172a;text-decoration:none;padding:6px 0}' +
      '.pmm-m-list a:hover{color:#2563eb}' +
      '.pmm-m-viewall{display:inline-block;margin:6px 0 2px;font-size:0.9rem;font-weight:600;color:#2563eb;text-decoration:none}';
    var el = document.createElement('style');
    el.id = 'pmm-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  // Derive relative prefix to site root from the existing "View All" link (works at any depth)
  function detectPrefix(panel) {
    var a = panel.querySelector('a[href*="products/index.html"]') || panel.querySelector('a[href*="products/"]');
    if (a) {
      var href = a.getAttribute('href') || '';
      var i = href.indexOf('products/');
      if (i >= 0) return href.slice(0, i);
    }
    return ''; // same-dir fallback
  }

  // ---------- desktop mega menu ----------
  function buildDesktop(panel, prefix) {
    var left = '', right = '';
    CATEGORIES.forEach(function (cat, i) {
      left += '<button type="button" class="pmm-cat' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '">' +
        esc(cat.name) + (cat.badge ? '<span class="pmm-cat-badge">' + esc(cat.badge) + '</span>' : '') + '</button>';
      var rows = cat.products.map(function (p) {
        return '<a class="pmm-prod" href="' + prefix + p.slug + '">' +
          '<img class="pmm-thumb" src="' + prefix + p.img + '" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'">' +
          '<span class="pmm-prod-text"><span class="pmm-prod-name">' + esc(p.name) + '</span>' +
          (p.desc ? '<span class="pmm-prod-desc">' + esc(p.desc) + '</span>' : '') + '</span>' +
          ARROW + '</a>';
      }).join('');
      right += '<div class="pmm-panel' + (i === 0 ? ' is-active' : '') + '" data-i="' + i + '">' + rows + '</div>';
    });
    panel.innerHTML =
      '<div class="pmm"><div class="pmm-inner">' +
        '<div class="pmm-left">' + left + '</div>' +
        '<div class="pmm-right">' + right + '</div>' +
      '</div>' +
      '<a class="pmm-viewall" href="' + prefix + 'products/index.html">View All Products &rarr;</a></div>';

    var cats = [].slice.call(panel.querySelectorAll('.pmm-cat'));
    var panels = [].slice.call(panel.querySelectorAll('.pmm-panel'));
    function activate(i) {
      cats.forEach(function (c, j) { c.classList.toggle('is-active', j === i); });
      panels.forEach(function (p, j) { p.classList.toggle('is-active', j === i); });
    }
    cats.forEach(function (c, i) {
      c.addEventListener('mouseenter', function () { activate(i); });
      c.addEventListener('focus', function () { activate(i); });
      c.addEventListener('click', function (e) { e.preventDefault(); activate(i); });
    });
  }

  // ---------- mobile accordion ----------
  function buildMobile(prefix) {
    var inner = document.querySelector('.mobile-nav .mobile-nav-inner');
    if (!inner || inner.querySelector('.pmm-m')) return;

    var catsHtml = CATEGORIES.map(function (cat, i) {
      var list = cat.products.map(function (p) {
        return '<a href="' + prefix + p.slug + '">' + esc(p.name) + '</a>';
      }).join('');
      return '<div class="pmm-m-cat">' +
        '<button type="button" class="pmm-m-cat-btn" aria-expanded="false">' +
          '<span>' + esc(cat.name) + (cat.badge ? '<span class="pmm-m-badge">' + esc(cat.badge) + '</span>' : '') + '</span>' +
          '<span class="pmm-m-chev">&rsaquo;</span></button>' +
        '<div class="pmm-m-list" hidden>' + list + '</div></div>';
    }).join('');

    var section = document.createElement('div');
    section.className = 'mobile-nav-section pmm-m';
    section.innerHTML =
      '<button type="button" class="pmm-m-top" aria-expanded="false">Products <span class="pmm-m-chev">&rsaquo;</span></button>' +
      '<div class="pmm-m-cats" hidden>' + catsHtml +
        '<a class="pmm-m-viewall" href="' + prefix + 'products/index.html">View All Products &rarr;</a>' +
      '</div>';
    inner.insertBefore(section, inner.firstChild);

    function toggle(btn, box) {
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', open ? 'false' : 'true');
      box.hidden = open;
    }
    var topBtn = section.querySelector('.pmm-m-top');
    var topBox = section.querySelector('.pmm-m-cats');
    topBtn.addEventListener('click', function () { toggle(topBtn, topBox); });
    section.querySelectorAll('.pmm-m-cat').forEach(function (cat) {
      var b = cat.querySelector('.pmm-m-cat-btn');
      var l = cat.querySelector('.pmm-m-list');
      b.addEventListener('click', function () { toggle(b, l); });
    });
  }

  function init() {
    var panel = document.querySelector('.nav-dropdown--products');
    if (!panel) return;
    var prefix = detectPrefix(panel);
    injectStyles();
    buildDesktop(panel, prefix);
    buildMobile(prefix);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
