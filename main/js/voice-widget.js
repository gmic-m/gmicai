/* ============================================================
   GMIC "Talk to GMIC" voice widget
   ------------------------------------------------------------
   3-screen flow injected into the existing #voice-panel modal:
     1) Contact info  (name + email, validated)
     2) Voice recording (real MediaRecorder capture)
     3) Confirmation

   Delivery: Web3Forms (https://web3forms.com) — free, no backend,
   supports the audio file as an attachment. The recording + name +
   email + timestamp + page URL are emailed to trigg@gmic.ai, and the
   customer's email is set as reply-to so you can reply directly.

   ┌──────────────────────────────────────────────────────────┐
   │  ⚠ REQUIRED: paste your free Web3Forms access key below.   │
   │  Get one in ~1 min at https://web3forms.com (enter         │
   │  trigg@gmic.ai as the destination). Until this is set,     │
   │  Send falls back to opening the visitor's email client     │
   │  (text only — audio can't be attached via mailto).         │
   └──────────────────────────────────────────────────────────┘
   ============================================================ */
(function () {
  'use strict';

  var WEB3FORMS_ACCESS_KEY = ''; // TODO: paste your Web3Forms access key here, e.g. "a1b2c3d4-...."
  var TO_EMAIL = 'trigg@gmic.ai';
  var WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
  var MAX_SECONDS = 120; // auto-stop long recordings (keeps attachment under Web3Forms' ~5MB limit)

  if (window.__gmicVoiceWidgetInit) return;
  window.__gmicVoiceWidgetInit = true;

  // ---------- shared in-memory + sessionStorage contact (NOT localStorage) ----------
  var state = { name: '', email: '', blob: null, ext: 'webm' };
  function loadContact() {
    try {
      state.name = sessionStorage.getItem('gmic_vw_name') || '';
      state.email = sessionStorage.getItem('gmic_vw_email') || '';
    } catch (e) { /* sessionStorage may be blocked; in-memory state still works */ }
  }
  function saveContact(name, email) {
    state.name = name; state.email = email;
    try {
      sessionStorage.setItem('gmic_vw_name', name);
      sessionStorage.setItem('gmic_vw_email', email);
    } catch (e) {}
  }
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ---------- styles (scoped, self-contained; uses site tokens with fallbacks) ----------
  function injectStyles() {
    if (document.getElementById('vw-styles')) return;
    var css =
      '#voice-panel{width:340px!important;max-width:calc(100vw - 32px)!important}' +
      '.vw-viewport{position:relative;overflow:hidden}' +
      '.vw-screen{display:none}' +
      '.vw-screen.is-active{display:block;animation:vw-in .28s cubic-bezier(.2,.8,.2,1)}' +
      '@keyframes vw-in{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}}' +
      '@media(prefers-reduced-motion:reduce){.vw-screen.is-active{animation:none}}' +
      '.vw-title{font-family:var(--sans,Inter,sans-serif);font-size:15px;font-weight:700;color:#0f172a;margin-bottom:8px;text-align:center}' +
      '.vw-sub{font-family:var(--sans,Inter,sans-serif);font-size:13px;color:#6b7280;margin-bottom:20px;line-height:1.5;text-align:center}' +
      '.vw-form{display:flex;flex-direction:column;gap:14px;text-align:left;margin-bottom:16px}' +
      '.vw-field{display:flex;flex-direction:column;gap:6px}' +
      '.vw-label{font-family:var(--sans,Inter,sans-serif);font-size:12px;font-weight:600;color:#334155}' +
      '.vw-input{font-family:var(--sans,Inter,sans-serif);font-size:14px;color:#0f172a;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:11px 13px;outline:none;transition:border-color .15s,box-shadow .15s;width:100%}' +
      '.vw-input::placeholder{color:#9ca3af}' +
      '.vw-input:focus{border-color:#2563eb;box-shadow:0 0 0 3px rgba(37,99,235,.12)}' +
      '.vw-input.vw-invalid{border-color:#dc2626}' +
      '.vw-input.vw-invalid:focus{box-shadow:0 0 0 3px rgba(220,38,38,.12)}' +
      '.vw-error{font-family:var(--sans,Inter,sans-serif);font-size:11.5px;color:#dc2626;min-height:0;line-height:1.4;opacity:0;max-height:0;overflow:hidden;transition:opacity .15s,max-height .15s}' +
      '.vw-error.show{opacity:1;max-height:32px}' +
      '.vw-btn{font-family:var(--sans,Inter,sans-serif);font-size:14px;font-weight:600;border-radius:100px;padding:12px 18px;cursor:pointer;border:none;transition:background .18s,transform .18s,opacity .18s;width:100%;text-align:center;display:inline-flex;align-items:center;justify-content:center;gap:8px}' +
      '.vw-btn--primary{background:#2563eb;color:#fff}' +
      '.vw-btn--primary:hover{background:#1d4ed8;transform:translateY(-1px)}' +
      '.vw-btn--primary:disabled{opacity:.6;cursor:default;transform:none}' +
      '.vw-btn--ghost{background:transparent;color:#475569;border:1px solid #e2e8f0}' +
      '.vw-btn--ghost:hover{border-color:#cbd5e1;color:#0f172a}' +
      '.vw-alt{font-family:var(--sans,Inter,sans-serif);font-size:12px;color:#9ca3af;text-align:center;margin-top:14px}' +
      '.vw-alt a{color:#2563eb;text-decoration:none}' +
      '.vw-alt a:hover{text-decoration:underline}' +
      '.vw-mic-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;margin-bottom:12px}' +
      '.vw-mic{width:64px;height:64px;border-radius:50%;background:#2563eb;display:flex;align-items:center;justify-content:center;cursor:pointer;border:none;box-shadow:0 4px 20px rgba(37,99,235,.4);animation:vw-pulse 2s ease infinite}' +
      '.vw-mic svg{width:24px;height:24px}' +
      '.vw-mic.is-recording{background:#dc2626;box-shadow:0 4px 20px rgba(220,38,38,.45);animation:vw-pulse-rec 1.2s ease infinite}' +
      '@keyframes vw-pulse{0%{box-shadow:0 0 0 0 rgba(37,99,235,.4)}70%{box-shadow:0 0 0 14px rgba(37,99,235,0)}100%{box-shadow:0 0 0 0 rgba(37,99,235,0)}}' +
      '@keyframes vw-pulse-rec{0%{box-shadow:0 0 0 0 rgba(220,38,38,.5)}70%{box-shadow:0 0 0 14px rgba(220,38,38,0)}100%{box-shadow:0 0 0 0 rgba(220,38,38,0)}}' +
      '.vw-timer{font-family:var(--sans,Inter,sans-serif);font-variant-numeric:tabular-nums;font-size:13px;font-weight:600;color:#dc2626}' +
      '.vw-hint{font-family:var(--sans,Inter,sans-serif);font-size:12px;color:#9ca3af;text-align:center;margin-bottom:10px}' +
      '.vw-hint.vw-hint-error{color:#dc2626}' +
      '.vw-playback{width:100%;margin:6px 0 14px;display:block}' +
      '.vw-actions{display:flex;flex-direction:column;gap:8px;margin-bottom:4px}' +
      '.vw-sendstate{font-family:var(--sans,Inter,sans-serif);font-size:12px;text-align:center;margin-top:8px}' +
      '.vw-sendstate.err{color:#dc2626}' +
      '.vw-spin{width:15px;height:15px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;display:inline-block;animation:vw-spin .7s linear infinite}' +
      '@keyframes vw-spin{to{transform:rotate(360deg)}}' +
      '.vw-checkicon{width:52px;height:52px;border-radius:50%;background:#dcfce7;color:#16a34a;font-size:26px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:4px auto 14px}' +
      '.vw-back{position:absolute;top:11px;left:14px;background:none;border:none;cursor:pointer;color:#6b7280;font-family:var(--sans,Inter,sans-serif);font-size:12.5px;font-weight:500;line-height:1;display:none;align-items:center;gap:5px;z-index:2}' +
      '.vw-back:hover{color:#2563eb}' +
      '.vw-close{position:absolute;top:10px;right:14px;background:none;border:none;font-size:16px;line-height:1;cursor:pointer;color:#aaa;z-index:2}' +
      '.vw-close:hover{color:#0f172a}';
    var el = document.createElement('style');
    el.id = 'vw-styles';
    el.textContent = css;
    document.head.appendChild(el);
  }

  var MIC_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8"/></svg>';

  var PANEL_HTML =
    '<button class="vw-close" type="button" aria-label="Close">&times;</button>' +
    '<button class="vw-back" type="button" aria-label="Back to contact info">&#8592; Back</button>' +
    '<div class="vw-viewport">' +
      // Screen 1 — contact
      '<div class="vw-screen vw-screen--contact is-active" data-screen="contact">' +
        '<div class="vw-title">Talk to GMIC</div>' +
        '<div class="vw-sub">Leave your info so we can get back to you.</div>' +
        '<form class="vw-form" novalidate>' +
          '<div class="vw-field">' +
            '<label class="vw-label" for="vw-name">Name</label>' +
            '<input class="vw-input" id="vw-name" name="name" type="text" autocomplete="name" placeholder="Your name">' +
            '<span class="vw-error" data-for="name"></span>' +
          '</div>' +
          '<div class="vw-field">' +
            '<label class="vw-label" for="vw-email">Email</label>' +
            '<input class="vw-input" id="vw-email" name="email" type="email" autocomplete="email" placeholder="you@company.com">' +
            '<span class="vw-error" data-for="email"></span>' +
          '</div>' +
          '<button class="vw-btn vw-btn--primary" type="submit">Continue</button>' +
        '</form>' +
        '<div class="vw-alt">or <a href="mailto:' + TO_EMAIL + '">email us</a></div>' +
      '</div>' +
      // Screen 2 — record
      '<div class="vw-screen vw-screen--record" data-screen="record">' +
        '<div class="vw-title vw-greeting">Hi! &#128075;</div>' +
        '<div class="vw-sub">Ask about our products, request a sample, or start a demo inquiry.</div>' +
        '<div class="vw-mic-wrap">' +
          '<button class="vw-mic" type="button" aria-label="Start recording">' + MIC_SVG + '</button>' +
          '<div class="vw-timer" hidden>0:00</div>' +
        '</div>' +
        '<div class="vw-hint">Tap the mic to start recording</div>' +
        '<audio class="vw-playback" controls hidden></audio>' +
        '<div class="vw-actions" hidden>' +
          '<button class="vw-btn vw-btn--primary vw-send" type="button">Send message</button>' +
          '<button class="vw-btn vw-btn--ghost vw-rerecord" type="button">Re-record</button>' +
        '</div>' +
        '<div class="vw-sendstate" hidden></div>' +
        '<div class="vw-alt">or <a href="mailto:' + TO_EMAIL + '">email us</a></div>' +
      '</div>' +
      // Screen 3 — done
      '<div class="vw-screen vw-screen--done" data-screen="done">' +
        '<div class="vw-checkicon">&#10003;</div>' +
        '<div class="vw-title vw-thanks">Thanks!</div>' +
        '<div class="vw-sub vw-donemsg">We\'ll listen to your message and reply soon.</div>' +
        '<button class="vw-btn vw-btn--primary vw-done" type="button">Done</button>' +
      '</div>' +
    '</div>';

  function init() {
    var panel = document.getElementById('voice-panel');
    var fabMic = document.getElementById('fabMic');
    if (!panel) return;

    injectStyles();
    loadContact();
    panel.innerHTML = PANEL_HTML;

    // element refs
    var screens = {};
    panel.querySelectorAll('.vw-screen').forEach(function (s) { screens[s.getAttribute('data-screen')] = s; });
    var form = panel.querySelector('.vw-form');
    var nameInput = panel.querySelector('#vw-name');
    var emailInput = panel.querySelector('#vw-email');
    var greeting = panel.querySelector('.vw-greeting');
    var micBtn = panel.querySelector('.vw-mic');
    var timerEl = panel.querySelector('.vw-timer');
    var hintEl = panel.querySelector('.vw-hint');
    var playback = panel.querySelector('.vw-playback');
    var actions = panel.querySelector('.vw-actions');
    var sendBtn = panel.querySelector('.vw-send');
    var rerecordBtn = panel.querySelector('.vw-rerecord');
    var sendState = panel.querySelector('.vw-sendstate');
    var doneMsg = panel.querySelector('.vw-donemsg');
    var thanks = panel.querySelector('.vw-thanks');
    var backBtn = panel.querySelector('.vw-back');

    function show(name) {
      Object.keys(screens).forEach(function (k) { screens[k].classList.toggle('is-active', k === name); });
      // Back navigation only makes sense on the recording screen.
      if (backBtn) backBtn.style.display = (name === 'record') ? 'inline-flex' : 'none';
    }

    // ---------- Screen 1: validation + continue ----------
    function setError(inputEl, key, msg) {
      var errEl = panel.querySelector('.vw-error[data-for="' + key + '"]');
      if (msg) {
        inputEl.classList.add('vw-invalid');
        errEl.textContent = msg; errEl.classList.add('show');
      } else {
        inputEl.classList.remove('vw-invalid');
        errEl.textContent = ''; errEl.classList.remove('show');
      }
    }
    function validate() {
      var ok = true;
      var n = nameInput.value.trim();
      var em = emailInput.value.trim();
      if (!n) { setError(nameInput, 'name', 'Please enter your name.'); ok = false; } else setError(nameInput, 'name', '');
      if (!em) { setError(emailInput, 'email', 'Please enter your email.'); ok = false; }
      else if (!EMAIL_RE.test(em)) { setError(emailInput, 'email', 'Please enter a valid email address.'); ok = false; }
      else setError(emailInput, 'email', '');
      return ok;
    }
    nameInput.addEventListener('input', function () { if (nameInput.classList.contains('vw-invalid')) setError(nameInput, 'name', ''); });
    emailInput.addEventListener('input', function () { if (emailInput.classList.contains('vw-invalid')) setError(emailInput, 'email', ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate()) return;
      saveContact(nameInput.value.trim(), emailInput.value.trim());
      prepRecordScreen();
      show('record');
    });

    function prepRecordScreen() {
      greeting.textContent = 'Hi, ' + state.name + '! 👋';
      resetRecordUI();
    }

    // ---------- Screen 2: recording ----------
    var mediaRecorder = null, chunks = [], stream = null, timerInt = null, seconds = 0;

    function pickMime() {
      var types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/ogg'];
      if (typeof MediaRecorder === 'undefined' || !MediaRecorder.isTypeSupported) return '';
      for (var i = 0; i < types.length; i++) { if (MediaRecorder.isTypeSupported(types[i])) return types[i]; }
      return '';
    }
    function fmt(s) { var m = Math.floor(s / 60); var r = s % 60; return m + ':' + (r < 10 ? '0' : '') + r; }
    function stopStream() { if (stream) { stream.getTracks().forEach(function (t) { t.stop(); }); stream = null; } }

    function resetRecordUI() {
      state.blob = null;
      micBtn.classList.remove('is-recording');
      micBtn.style.display = '';
      micBtn.setAttribute('aria-label', 'Start recording');
      timerEl.hidden = true; timerEl.textContent = '0:00'; seconds = 0;
      hintEl.textContent = 'Tap the mic to start recording'; hintEl.classList.remove('vw-hint-error');
      playback.hidden = true; playback.removeAttribute('src');
      actions.hidden = true;
      sendState.hidden = true; sendState.textContent = ''; sendState.classList.remove('err');
      sendBtn.disabled = false; sendBtn.textContent = 'Send message';
    }

    function unsupported() {
      return (typeof MediaRecorder === 'undefined') || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia;
    }

    async function startRec() {
      if (unsupported()) {
        hintEl.textContent = 'Recording is not supported in this browser — please email us instead.';
        hintEl.classList.add('vw-hint-error');
        return;
      }
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err) {
        hintEl.textContent = 'Microphone access was blocked. Allow the mic, or email us instead.';
        hintEl.classList.add('vw-hint-error');
        return;
      }
      var mime = pickMime();
      state.ext = (mime.indexOf('mp4') >= 0) ? 'm4a' : (mime.indexOf('ogg') >= 0 ? 'ogg' : 'webm');
      try {
        mediaRecorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      } catch (err) { mediaRecorder = new MediaRecorder(stream); }
      chunks = [];
      mediaRecorder.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); };
      mediaRecorder.onstop = function () {
        state.blob = new Blob(chunks, { type: (mediaRecorder && mediaRecorder.mimeType) || 'audio/webm' });
        stopStream();
        playback.src = URL.createObjectURL(state.blob);
        playback.hidden = false;
        actions.hidden = false;
        micBtn.style.display = 'none';
        timerEl.hidden = true;
        hintEl.textContent = 'Review your message, then send it.';
      };
      mediaRecorder.start();
      // UI → recording
      micBtn.classList.add('is-recording');
      micBtn.setAttribute('aria-label', 'Stop recording');
      hintEl.textContent = 'Recording… tap the mic to stop';
      hintEl.classList.remove('vw-hint-error');
      seconds = 0; timerEl.textContent = '0:00'; timerEl.hidden = false;
      timerInt = setInterval(function () {
        seconds++; timerEl.textContent = fmt(seconds);
        if (seconds >= MAX_SECONDS) stopRec();
      }, 1000);
    }
    function stopRec() {
      if (timerInt) { clearInterval(timerInt); timerInt = null; }
      micBtn.classList.remove('is-recording');
      if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
    }
    micBtn.addEventListener('click', function () {
      if (micBtn.classList.contains('is-recording')) stopRec(); else startRec();
    });
    rerecordBtn.addEventListener('click', function () { resetRecordUI(); });

    // ---------- send (Web3Forms) ----------
    function mailtoFallback() {
      var subj = encodeURIComponent('Voice message inquiry from ' + state.name);
      var body = encodeURIComponent(
        'Name: ' + state.name + '\nEmail: ' + state.email +
        '\nPage: ' + location.href + '\nTime: ' + new Date().toISOString() +
        '\n\n(Note: audio recording could not be attached automatically — delivery endpoint not configured.)'
      );
      window.location.href = 'mailto:' + TO_EMAIL + '?subject=' + subj + '&body=' + body;
    }

    async function send() {
      if (!state.blob) return;
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span class="vw-spin"></span> Sending…';
      sendState.hidden = true; sendState.classList.remove('err');

      // No key configured → graceful mailto fallback (text only) so nothing hard-breaks.
      if (!WEB3FORMS_ACCESS_KEY) {
        mailtoFallback();
        goDone();
        return;
      }
      try {
        var stamp = new Date().toISOString();
        var fd = new FormData();
        fd.append('access_key', WEB3FORMS_ACCESS_KEY);
        fd.append('subject', 'New voice message from ' + state.name);
        fd.append('from_name', 'GMIC Voice Widget');
        fd.append('name', state.name);
        fd.append('email', state.email); // Web3Forms sets this as reply-to
        fd.append('page', location.href);
        fd.append('timestamp', stamp);
        fd.append('message',
          'Voice message received via the site widget.\n\n' +
          'Name: ' + state.name + '\nEmail: ' + state.email +
          '\nPage: ' + location.href + '\nTime: ' + stamp +
          '\n\nThe audio recording is attached.');
        fd.append('attachment', state.blob, 'voice-message-' + Date.now() + '.' + state.ext);

        var res = await fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: fd });
        var json = await res.json().catch(function () { return {}; });
        if (!res.ok || !json.success) throw new Error(json.message || 'Send failed');
        goDone();
      } catch (err) {
        sendBtn.disabled = false; sendBtn.textContent = 'Try again';
        sendState.hidden = false; sendState.classList.add('err');
        sendState.textContent = 'Sorry, that didn’t send. Please try again or email us.';
      }
    }
    sendBtn.addEventListener('click', send);

    // ---------- Screen 3 ----------
    function goDone() {
      thanks.textContent = 'Thanks, ' + state.name + '!';
      doneMsg.textContent = 'We’ll listen to your message and reply to ' + state.email + ' soon.';
      show('done');
    }
    panel.querySelector('.vw-done').addEventListener('click', function () { closePanel(); });

    // ---------- open / close ----------
    function openPanel() {
      panel.style.display = 'block';
      loadContact();
      if (state.name && state.email) { prepRecordScreen(); show('record'); }
      else { show('contact'); setTimeout(function () { nameInput.focus(); }, 60); }
    }
    function closePanel() {
      panel.style.display = 'none';
      stopRec(); stopStream(); resetRecordUI();
      // reset to the right entry screen for next open
      if (state.name && state.email) { prepRecordScreen(); show('record'); } else show('contact');
    }
    panel.querySelector('.vw-close').addEventListener('click', closePanel);

    // Back: record screen -> contact screen, keeping name/email filled in for editing.
    backBtn.addEventListener('click', function () {
      stopRec(); stopStream(); resetRecordUI();
      nameInput.value = state.name;
      emailInput.value = state.email;
      setError(nameInput, 'name', ''); setError(emailInput, 'email', '');
      show('contact');
      setTimeout(function () { nameInput.focus(); }, 60);
    });

    // Rewire the FAB mic button (was an inline display toggle)
    if (fabMic) {
      fabMic.onclick = null;
      fabMic.addEventListener('click', function (e) {
        e.preventDefault();
        if (panel.style.display === 'block') closePanel(); else openPanel();
      });
    }

    // start hidden
    panel.style.display = 'none';
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
