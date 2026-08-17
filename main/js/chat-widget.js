/* ============================================================
   GMIC floating chat-bot widget
   ------------------------------------------------------------
   Self-contained, dependency-free launcher for the Telalive
   chat bot. Injects its own styles + DOM, so a single
   <script src=".../js/chat-widget.js"></script> before </body>
   is all any page needs.

   • Collapsed: a 56px circular blue button, bottom-right.
   • Expanded : a 400×600 iframe panel that slides up above it.
   • The iframe is LAZY-LOADED — its src is only set the first
     time the user opens the panel, so it never slows page load.

   Position note: the site's floating action bar lives at
   bottom-CENTER (.fab, z-index 300) and the back-to-top button
   at bottom-right (.back-top, 44px @ right:28px/bottom:28px).
   This widget sits bottom-RIGHT, stacked ABOVE the back-to-top
   button (same right edge, 18px gap) so both stay visible and
   clickable. The panel grows UPWARD from the launcher.
   ============================================================ */
(function () {
  'use strict';

  var IFRAME_SRC = 'https://web-bot.telalive.us/widget/';

  if (window.__gmicChatWidgetInit) return;
  window.__gmicChatWidgetInit = true;

  // Chat-bubble icon (lucide "message-circle"). Uses currentColor so it
  // inverts on hover exactly like the back-to-top arrow.
  var CHAT_SVG =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>' +
    '</svg>';

  function injectStyles() {
    if (document.getElementById('gmic-chat-styles')) return;
    var css =
      // --- launcher button (collapsed state) ---
      // Same SHAPE as the site's .back-top button (44px circle, same shadow &
      // radius) but filled with the primary blue (--blue, as used by the
      // "Start a Project" CTA) with a white icon. Only the icon differs.
      '.gmic-chat-launcher{' +
        // Stacked ABOVE the .back-top button (44px @ bottom:28px, top edge 72px);
        // bottom:90px leaves an 18px gap. right:28px matches back-top's right edge.
        'position:fixed;right:28px;bottom:90px;z-index:900;' +
        'width:44px;height:44px;border-radius:50%;cursor:pointer;padding:0;border:none;' +
        'background:var(--blue,#006aff);' +
        'box-shadow:0 6px 18px rgba(0,0,0,0.12);' +
        'display:flex;align-items:center;justify-content:center;' +
        'color:var(--white,#ffffff);' +
        'transition:background .2s ease,transform .2s ease;' +
      '}' +
      '.gmic-chat-launcher svg{width:18px;height:18px}' +
      '.gmic-chat-launcher:hover{' +
        'background:var(--blue-dark,#0050c8);transform:translateY(-2px);' +
      '}' +
      '.gmic-chat-launcher:focus-visible{outline:3px solid rgba(0,106,255,.4);outline-offset:2px}' +
      '.gmic-chat-launcher.is-open{opacity:0;pointer-events:none}' +

      // --- expanded panel ---
      '.gmic-chat-panel{' +
        // Anchored above the launcher (44px @ bottom:90px, top edge 134px) so it
        // grows UPWARD, with a 10px gap above the button.
        'position:fixed;right:28px;bottom:144px;z-index:901;' +
        'width:400px;height:600px;max-height:calc(100vh - 164px);' +
        'background:#fff;border-radius:12px;overflow:hidden;' +
        'box-shadow:0 12px 48px rgba(0,0,0,.24),0 2px 8px rgba(0,0,0,.10);' +
        'border:1px solid #e2e8f0;' +
        'display:none;flex-direction:column;' +
        'transform:translateY(16px);opacity:0;' +
        'transition:transform .26s cubic-bezier(.2,.8,.2,1),opacity .26s ease;' +
      '}' +
      '.gmic-chat-panel.is-open{display:flex;transform:translateY(0);opacity:1}' +
      '@media(prefers-reduced-motion:reduce){' +
        '.gmic-chat-panel,.gmic-chat-launcher{transition:none}' +
      '}' +

      // close (×) button, top-right of the panel
      '.gmic-chat-close{' +
        'position:absolute;top:8px;right:8px;z-index:2;' +
        'width:30px;height:30px;border-radius:50%;border:none;cursor:pointer;' +
        'background:rgba(15,23,42,.55);color:#fff;' +
        'font-size:18px;line-height:1;' +
        'display:flex;align-items:center;justify-content:center;' +
        'transition:background .15s ease;' +
      '}' +
      '.gmic-chat-close:hover{background:rgba(15,23,42,.8)}' +

      '.gmic-chat-frame{flex:1 1 auto;width:100%;height:100%;border:0;display:block}' +

      // NOTE: the site's .back-top button is intentionally left where it is
      // (right:28px/bottom:28px). The launcher sits above it, so both remain
      // visible and clickable — no override needed.

      // --- mobile: full-width, ~80vh tall, still anchored above the button ---
      '@media(max-width:520px){' +
        '.gmic-chat-panel{' +
          'right:8px;left:8px;width:auto;bottom:144px;' +
          'height:80vh;max-height:calc(100vh - 160px);' +
        '}' +
      '}';
    var el = document.createElement('style');
    el.id = 'gmic-chat-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  function init() {
    injectStyles();

    // launcher (collapsed)
    var launcher = document.createElement('button');
    launcher.type = 'button';
    launcher.className = 'gmic-chat-launcher';
    launcher.setAttribute('aria-label', 'Open chat');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.innerHTML = CHAT_SVG;

    // panel (expanded) — iframe added lazily on first open
    var panel = document.createElement('div');
    panel.className = 'gmic-chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with GMIC');
    panel.innerHTML =
      '<button type="button" class="gmic-chat-close" aria-label="Close chat">&times;</button>';

    var closeBtn = panel.querySelector('.gmic-chat-close');
    var frame = null;      // created on first open
    var isOpen = false;

    function open() {
      if (isOpen) return;
      isOpen = true;
      // Lazy-load the iframe the first time only.
      if (!frame) {
        frame = document.createElement('iframe');
        frame.className = 'gmic-chat-frame';
        frame.title = 'GMIC chat bot';
        frame.setAttribute('loading', 'lazy');
        frame.setAttribute('allow', 'microphone; clipboard-write');
        frame.src = IFRAME_SRC;
        panel.appendChild(frame);
      }
      panel.classList.add('is-open');
      launcher.classList.add('is-open');
      launcher.setAttribute('aria-expanded', 'true');
      launcher.setAttribute('aria-label', 'Close chat');
    }

    function close() {
      if (!isOpen) return;
      isOpen = false;
      panel.classList.remove('is-open');
      launcher.classList.remove('is-open');
      launcher.setAttribute('aria-expanded', 'false');
      launcher.setAttribute('aria-label', 'Open chat');
      launcher.focus();
    }

    launcher.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) close();
    });

    document.body.appendChild(panel);
    document.body.appendChild(launcher);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
