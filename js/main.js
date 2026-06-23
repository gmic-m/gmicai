// ---------- Nav scroll transition ----------
(function(){
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const threshold = () => Math.max(80, hero.offsetHeight - 80);
  function onScroll(){
    if(window.scrollY > threshold()){
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
})();

// ---------- Hero scroll-jacking (sticky pin + progress fade + shrink to slot) ----------
(function(){
  const heroEl = document.querySelector('.hero');
  const heroInner = document.querySelector('.hero-inner');
  const heroVideoBg = document.querySelector('.hero-video');
  const heroBgEl = document.querySelector('.hero-bg');
  const heroOvEl = document.querySelector('.hero-ov');
  const mosaicEl = document.querySelector('.hero-mosaic');
  if (!heroEl || !mosaicEl) return;

  // Copy hero video src into the mosaic slot's video
  const mosaicVid = document.querySelector('#mosaic-video-slot video');
  if (mosaicVid && heroVideoBg){
    mosaicVid.src = 'img/hero-video.mp4';
  }

  let videoShrunk = false;
  let hideVideoTimeout = null;

  function shrinkVideoToMosaic(){
    if (!heroVideoBg) return;
    const slot = document.getElementById('mosaic-video-slot');
    if (!slot) return;
    if (hideVideoTimeout){ clearTimeout(hideVideoTimeout); hideVideoTimeout = null; }
    const slotRect = slot.getBoundingClientRect();

    heroVideoBg.style.visibility = 'visible';
    heroVideoBg.style.opacity = '1';
    heroVideoBg.style.pointerEvents = '';
    heroVideoBg.style.transition = 'none';
    heroVideoBg.style.position = 'fixed';
    heroVideoBg.style.top = '0';
    heroVideoBg.style.left = '0';
    heroVideoBg.style.width = '100vw';
    heroVideoBg.style.height = '100vh';
    heroVideoBg.style.borderRadius = '0';
    heroVideoBg.style.zIndex = '6';
    heroVideoBg.style.objectFit = 'cover';
    heroVideoBg.style.inset = 'auto';

    // Force reflow before applying transition
    heroVideoBg.getBoundingClientRect();

    heroVideoBg.style.transition = 'all 0.7s cubic-bezier(.4,0,.2,1)';
    heroVideoBg.style.top = slotRect.top + 'px';
    heroVideoBg.style.left = slotRect.left + 'px';
    heroVideoBg.style.width = slotRect.width + 'px';
    heroVideoBg.style.height = slotRect.height + 'px';
    heroVideoBg.style.borderRadius = '18px';

    // After animation completes, hide the original — slot's own video takes over.
    hideVideoTimeout = setTimeout(() => {
      heroVideoBg.style.opacity = '0';
      heroVideoBg.style.visibility = 'hidden';
      heroVideoBg.style.pointerEvents = 'none';
    }, 700);
  }

  function expandVideoFromMosaic(){
    if (!heroVideoBg) return;
    if (hideVideoTimeout){ clearTimeout(hideVideoTimeout); hideVideoTimeout = null; }
    heroVideoBg.style.visibility = 'visible';
    heroVideoBg.style.opacity = '1';
    heroVideoBg.style.pointerEvents = '';
    heroVideoBg.style.transition = 'all 0.6s cubic-bezier(.4,0,.2,1)';
    heroVideoBg.style.top = '0';
    heroVideoBg.style.left = '0';
    heroVideoBg.style.width = '100vw';
    heroVideoBg.style.height = '100vh';
    heroVideoBg.style.borderRadius = '0';
    setTimeout(() => {
      heroVideoBg.style.position = 'absolute';
      heroVideoBg.style.transition = '';
      heroVideoBg.style.zIndex = '';
      heroVideoBg.style.top = '';
      heroVideoBg.style.left = '';
      heroVideoBg.style.width = '';
      heroVideoBg.style.height = '';
      heroVideoBg.style.borderRadius = '';
      heroVideoBg.style.inset = '';
      heroVideoBg.style.objectFit = '';
    }, 620);
  }

  function updateHero(){
    const scrollY = window.scrollY;
    const heroH = heroEl.offsetHeight;
    const progress = Math.min(Math.max(scrollY / heroH, 0), 1);

    if (progress < 0.3){
      if (videoShrunk){
        videoShrunk = false;
        expandVideoFromMosaic();
      }
      if (heroInner) heroInner.style.opacity = 1 - (progress / 0.3);
      mosaicEl.style.opacity = 0;
      mosaicEl.style.pointerEvents = 'none';
      if (heroBgEl) heroBgEl.style.opacity = 1;
      if (heroOvEl) heroOvEl.style.opacity = 1;
    } else {
      if (!videoShrunk){
        videoShrunk = true;
        shrinkVideoToMosaic();
      }
      if (heroInner) heroInner.style.opacity = 0;
      if (heroBgEl) heroBgEl.style.opacity = 0;
      if (heroOvEl) heroOvEl.style.opacity = 0;
      const mosaicProgress = Math.min((progress - 0.3) / 0.3, 1);
      mosaicEl.style.opacity = mosaicProgress;
      mosaicEl.style.pointerEvents = mosaicProgress > 0.5 ? 'auto' : 'none';
    }
  }

  window.addEventListener('scroll', updateHero, { passive:true });
  updateHero();
})();

// ---------- Why GMIC tiles (hover + auto-rotate) ----------
(function(){
  const tiles = document.querySelectorAll('#whyGrid .why-tile');
  if (!tiles.length) return;

  let whyCurrent = 0;
  let whyAuto = null;

  function setActiveTile(idx){
    whyCurrent = idx;
    tiles.forEach((t, i) => {
      t.classList.toggle('active', i === idx);
    });
  }
  function startWhyAuto(){
    clearInterval(whyAuto);
    whyAuto = setInterval(() => {
      whyCurrent = (whyCurrent + 1) % tiles.length;
      setActiveTile(whyCurrent);
    }, 3000);
  }

  tiles.forEach((tile, idx) => {
    tile.addEventListener('mouseenter', () => {
      setActiveTile(idx);
      clearInterval(whyAuto);
    });
    tile.addEventListener('mouseleave', () => {
      startWhyAuto();
    });
  });

  startWhyAuto();
})();

// ---------- Products carousel (active class + mobile translate) ----------
(function(){
  const cTrack = document.getElementById('cTrack');
  const slides = Array.from(document.querySelectorAll('.c-slide'));
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  if (!slides.length) return;

  let activeIdx = 0;
  let carouselTimer = null;
  const GAP = 0;

  function getSlideWidth(){
    // 取第一张 slide 的实际宽度 + gap（当前无间隙）
    return slides[0].offsetWidth + GAP;
  }

  function getVisibleCount(){
    const viewport = document.querySelector('.carousel-viewport');
    if (!viewport) return 1;
    return Math.max(1, Math.round(viewport.offsetWidth / getSlideWidth()));
  }

  function applyTransform(){
    if (!cTrack) return;
    if (window.innerWidth >= 1200){
      // 大屏：4张卡片完整显示，不滚动
      cTrack.style.transform = 'none';
      return;
    }
    const maxIndex = Math.max(0, slides.length - getVisibleCount());
    const idx = Math.min(activeIdx, maxIndex);
    cTrack.style.transform = `translateX(-${idx * getSlideWidth()}px)`;
  }

  function setActive(idx){
    activeIdx = idx;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === idx));
    applyTransform();
  }

  function startCarousel(){
    clearInterval(carouselTimer);
    carouselTimer = setInterval(() => {
      setActive((activeIdx + 1) % slides.length);
    }, 4000);
  }

  if (prev){
    prev.addEventListener('click', () => {
      clearInterval(carouselTimer);
      setActive(Math.max(0, activeIdx - 1));
      startCarousel();
    });
  }
  if (next){
    next.addEventListener('click', () => {
      clearInterval(carouselTimer);
      setActive(Math.min(slides.length - 1, activeIdx + 1));
      startCarousel();
    });
  }

  slides.forEach((slide, idx) => {
    slide.addEventListener('mouseenter', () => {
      clearInterval(carouselTimer);
      setActive(idx);
    });
    slide.addEventListener('mouseleave', startCarousel);
  });

  window.addEventListener('resize', () => {
    if (!cTrack) return;
    // 窗口尺寸变化时重置位置，避免大屏切换时卡在错误位置
    activeIdx = 0;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === 0));
    cTrack.style.transform = window.innerWidth >= 1200 ? 'none' : 'translateX(0)';
  }, { passive:true });

  setActive(0);
  startCarousel();
})();

// ---------- Industries photo switcher ----------
(function(){
  const rows = document.querySelectorAll('.industries-line[data-photo]');
  const photos = document.querySelectorAll('.industries-photo img[data-photo]');
  if (!rows.length || !photos.length) return;
  rows.forEach(row => {
    row.addEventListener('click', (e) => {
      e.preventDefault();
      const key = row.getAttribute('data-photo');
      rows.forEach(r => r.classList.toggle('active', r === row));
      photos.forEach(p => p.classList.toggle('active', p.getAttribute('data-photo') === key));
    });
  });
})();

// ---------- Back to top ----------
(function(){
  const btn = document.getElementById('backTop');
  if (!btn) return;
  function onScroll(){
    if (window.scrollY > 400) btn.classList.add('visible');
    else btn.classList.remove('visible');
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  btn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
  onScroll();
})();

// ---------- Reveal on scroll ----------
(function(){
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)){
    reveals.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px', threshold: 0.05 });
  reveals.forEach(el => io.observe(el));
})();

// ---------- Fade-section reveal ----------
(function(){
  const fadeEls = document.querySelectorAll('.fade-section');
  if (!fadeEls.length) return;
  if (!('IntersectionObserver' in window)){
    fadeEls.forEach(el => el.classList.add('in-view'));
    return;
  }
  const fadeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.08 });
  fadeEls.forEach(el => fadeObs.observe(el));
})();

// ---------- FAB: WeChat popup + Connect menu outside-click ----------
(function(){
  const wechatBtn = document.getElementById('fabWechat');
  const wechatPopup = document.getElementById('wechat-popup');
  if (wechatBtn && wechatPopup){
    wechatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const r = wechatBtn.getBoundingClientRect();
      wechatPopup.style.bottom = (window.innerHeight - r.top + 12) + 'px';
      wechatPopup.style.left = (r.left + r.width/2 - 120) + 'px';
      wechatPopup.style.display = wechatPopup.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#wechat-popup') && !e.target.closest('.wechat-fab-btn')){
        wechatPopup.style.display = 'none';
      }
    });
  }
  const cm = document.getElementById('connect-menu');
  if (cm){
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#connect-menu') && !e.target.closest('[data-connect]')){
        cm.style.display = 'none';
      }
    });
  }
  // Position the connect menu's right edge near the three-dots fab button.
  const fabConnect = document.getElementById('fabConnect');
  function positionConnectMenu(){
    if (!cm || !fabConnect) return;
    const r = fabConnect.getBoundingClientRect();
    cm.style.bottom = (window.innerHeight - r.top + 12) + 'px';
    cm.style.left = (r.left + r.width/2 - 100) + 'px';
    cm.style.right = 'auto';
    cm.style.transform = 'none';
  }
  if (cm && fabConnect){
    fabConnect.addEventListener('click', positionConnectMenu);
    window.addEventListener('resize', positionConnectMenu, { passive:true });
    positionConnectMenu();
  }
})();

if (typeof lucide !== 'undefined') lucide.createIcons();
