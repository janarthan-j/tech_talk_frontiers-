/* ===== Beyond the Chat Window — deck engine ===== */
(() => {
  const stage = document.getElementById('stage');
  const slides = [...document.querySelectorAll('.slide')];
  const foot = document.getElementById('foot');
  const prog = document.getElementById('prog');
  const notesPanel = document.getElementById('notesPanel');
  const indexEl = document.getElementById('index');
  let cur = 0;

  const SECS = {
    title:   { n: 'Welcome',          t: '0–10',    c: 'var(--acc)' },
    opening: { n: 'Opening',          t: '0–10',    c: 'var(--acc)' },
    trends:  { n: 'Trends',           t: '10–30',   c: 'var(--acc2)' },
    shift:   { n: 'The Shift',        t: '30–45',   c: 'var(--pink)' },
    agents:  { n: 'Agents Explained', t: '45–65',   c: 'var(--warn)' },
    break:   { n: 'Break',            t: '65–70',   c: 'var(--muted)' },
    build:   { n: 'Build',            t: '70–90',   c: 'var(--acc2)' },
    prod:    { n: 'Production',       t: '90–102',  c: 'var(--bad)' },
    careers: { n: 'Careers',          t: '102–112', c: 'var(--acc)' },
    closing: { n: 'Closing + Q&A',    t: '112–120', c: 'var(--acc2)' },
  };

  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };

  /* ---------- scaling ---------- */
  function fit() {
    const s = Math.min(innerWidth / 1280, innerHeight / 720);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  }
  addEventListener('resize', fit); fit();

  /* ---------- theme ---------- */
  const savedTheme = store.get('deck-theme');
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
  function toggleTheme() {
    const t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = t; store.set('deck-theme', t);
  }

  /* ---------- navigation ---------- */
  const titleOf = (s) => (s.querySelector('h2, h1')?.textContent || '').trim();
  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[cur].classList.remove('active');
    cur = i;
    const s = slides[cur];
    s.classList.add('active');
    history.replaceState(null, '', '#' + (cur + 1));
    const sec = SECS[s.dataset.sec] || SECS.title;
    foot.querySelector('.dot').style.background = sec.c;
    foot.querySelector('.sec-n').textContent = sec.n;
    foot.querySelector('.time').textContent = sec.t + ' min';
    foot.querySelector('.cnt').textContent = (cur + 1) + ' / ' + slides.length;
    foot.style.display = s.classList.contains('no-foot') ? 'none' : 'flex';
    prog.style.width = ((cur + 1) / slides.length * 100) + '%';
    const n = s.querySelector('.notes');
    notesPanel.querySelector('.txt').innerHTML = n ? n.innerHTML : '<i>No notes for this slide.</i>';
    indexEl.querySelectorAll('button').forEach((b) => b.classList.toggle('cur', +b.dataset.i === cur));
  }
  // steppers with data-keys consume → before moving to next slide
  function next() {
    const st = slides[cur].querySelector('[data-stepper][data-keys]');
    if (st && st._step && st._step.canNext()) { st._step.next(); return; }
    go(cur + 1);
  }
  function prev() { go(cur - 1); }

  addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea, select')) return;
    const k = e.key;
    if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(k)) { e.preventDefault(); next(); }
    else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(k)) { e.preventDefault(); prev(); }
    else if (k === 'Home') go(0);
    else if (k === 'End') go(slides.length - 1);
    else if (k === 'n' || k === 'N') notesPanel.classList.toggle('show');
    else if (k === 'o' || k === 'O' || k === 'Escape') indexEl.classList.toggle('show', k === 'Escape' ? false : undefined);
    else if (k === 't' || k === 'T') toggleTheme();
    else if (k === 'f' || k === 'F') { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.(); }
  });
  foot.querySelector('.prev').onclick = prev;
  foot.querySelector('.next').onclick = () => go(cur + 1);
  foot.querySelector('.idx').onclick = () => indexEl.classList.toggle('show');

  // touch swipe
  let tx = null;
  stage.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 60) (dx < 0 ? go(cur + 1) : prev());
  });

  /* ---------- slide index (O) ---------- */
  (function buildIndex() {
    let html = '<h2>Slides <span class="tiny">— click to jump · press O / Esc to close</span></h2>';
    let lastSec = null;
    slides.forEach((s, i) => {
      if (s.dataset.sec !== lastSec) {
        if (lastSec !== null) html += '</div></div>';
        const sec = SECS[s.dataset.sec] || SECS.title;
        html += `<div class="grp"><h4>${sec.n} · ${sec.t} min</h4><div class="items">`;
        lastSec = s.dataset.sec;
      }
      html += `<button data-i="${i}"><i>${i + 1}</i>${titleOf(s)}</button>`;
    });
    html += '</div></div>';
    indexEl.innerHTML = html;
    indexEl.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-i]'); if (!b) return;
      go(+b.dataset.i); indexEl.classList.remove('show');
    });
  })();

  /* ---------- agenda jump ---------- */
  document.querySelectorAll('[data-goto]').forEach((b) => {
    b.addEventListener('click', () => {
      const t = document.getElementById(b.dataset.goto);
      if (t) go(slides.indexOf(t));
    });
  });

  /* ---------- image placeholders ---------- */
  document.querySelectorAll('.ph[data-src]').forEach((ph) => {
    const label = ph.dataset.label || 'Image';
    ph.innerHTML = `<div class="ph-i">🖼</div><b>${label}</b><span>${ph.dataset.src}</span>`;
    const img = new Image();
    img.onload = () => { ph.classList.add('has-img'); ph.innerHTML = ''; ph.appendChild(img); };
    img.alt = label;
    img.src = ph.dataset.src;
  });

  /* ---------- links open in new tab ---------- */
  document.querySelectorAll('a[href^="http"]').forEach((a) => { a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- syntax highlight ---------- */
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const RULES = {
    py: [
      [/#[^\n]*/y, 'c'],
      [/"""[\s\S]*?"""|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'/y, 's'],
      [/@[\w.]+/y, 'd'],
      [/\b(?:def|return|import|from|for|in|if|while|not|and|or|as|with|break|continue|class|else|elif|try|except|raise|lambda|None|True|False|async|await|pass|is)\b/y, 'k'],
      [/\b\d+(?:\.\d+)?\b/y, 'n'],
      [/\b[A-Za-z_]\w*(?=\()/y, 'f'],
    ],
    json: [
      [/\/\/[^\n]*/y, 'c'],
      [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, 'key'],
      [/"(?:[^"\\]|\\.)*"/y, 's'],
      [/\b(?:true|false|null)\b/y, 'k'],
      [/-?\b\d+(?:\.\d+)?\b/y, 'n'],
    ],
    bash: [
      [/#[^\n]*/y, 'c'],
      [/"[^"\n]*"|'[^'\n]*'/y, 's'],
      [/(?<=\s)--?[\w-]+/y, 'k'],
      [/^[\w.-]+/my, 'f'],
    ],
    md: [
      [/^#+ [^\n]*/my, 'k'],
      [/^- /my, 'n'],
      [/`[^`\n]*`/y, 's'],
    ],
  };
  function highlight(text, lang) {
    const rules = RULES[lang]; if (!rules) return esc(text);
    let out = '', i = 0, plain = '';
    while (i < text.length) {
      let hit = null;
      for (const [re, cls] of rules) {
        re.lastIndex = i; const m = re.exec(text);
        if (m && m.index === i && m[0].length) { hit = [m[0], cls]; break; }
      }
      if (hit) { out += esc(plain); plain = ''; out += `<span class="tk-${hit[1]}">${esc(hit[0])}</span>`; i += hit[0].length; }
      else { plain += text[i]; i++; }
    }
    return out + esc(plain);
  }
  document.querySelectorAll('pre.code').forEach((pre) => {
    let lines = pre.textContent.replace(/^\n/, '').replace(/\s+$/, '').split('\n');
    const marked = new Set();
    lines = lines.map((l, i) => { if (l.startsWith('»')) { marked.add(i); return l.slice(1); } return l; });
    const html = highlight(lines.join('\n'), pre.dataset.lang).split('\n')
      .map((l, i) => marked.has(i) ? `<span class="ln-new">${l || ' '}</span>` : l).join('\n');
    pre.innerHTML = html;
  });

  /* ---------- tabs ---------- */
  document.querySelectorAll('[data-tabs]').forEach((box) => {
    const tabs = [...box.querySelectorAll('[data-t]')];
    const panes = [...box.querySelectorAll('[data-p]')];
    const show = (id) => {
      tabs.forEach((t) => t.classList.toggle('on', t.dataset.t === id));
      panes.forEach((p) => p.classList.toggle('on', p.dataset.p === id));
      box.dispatchEvent(new CustomEvent('tab', { detail: id }));
    };
    tabs.forEach((t) => t.addEventListener('click', () => show(t.dataset.t)));
    show(tabs[0]?.dataset.t);
  });

  /* ---------- steppers ---------- */
  document.querySelectorAll('[data-stepper]').forEach((box) => {
    const steps = [...box.querySelectorAll('[data-step]')];
    const slide = box.closest('.slide');
    let i = -1, timer = null;
    const render = () => {
      steps.forEach((s, k) => { s.classList.toggle('shown', k <= i); s.classList.toggle('cur', k === i); });
      slide.dataset.stepAt = i + 1;
      slide.querySelectorAll('[data-node-id]').forEach((n) => n.classList.remove('hot'));
      const node = steps[i]?.dataset.node;
      if (node) node.split(' ').forEach((id) => slide.querySelector(`[data-node-id="${id}"]`)?.classList.add('hot'));
      const ctr = box.querySelector('.step-ctr'); if (ctr) ctr.textContent = `${Math.max(i + 1, 0)} / ${steps.length}`;
      const term = box.querySelector('.term'); if (term) term.scrollTop = term.scrollHeight;
    };
    const api = {
      canNext: () => i < steps.length - 1,
      next: () => { if (api.canNext()) { i++; render(); } if (steps[i]?.dataset.pause !== undefined) stop(); },
      prev: () => { if (i > -1) { i--; render(); } },
      reset: () => { stop(); i = -1; render(); },
    };
    const stop = () => { clearInterval(timer); timer = null; box.querySelector('[data-act="play"]')?.classList.remove('on'); };
    const play = () => {
      if (timer) return stop();
      box.querySelector('[data-act="play"]')?.classList.add('on');
      timer = setInterval(() => { if (!api.canNext()) return stop(); api.next(); }, +(box.dataset.speed || 1100));
    };
    box._step = api;
    box.addEventListener('click', (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      const a = b.dataset.act;
      if (a === 'play') play(); else if (a === 'next') api.next(); else if (a === 'prev') api.prev(); else if (a === 'reset') api.reset();
      else if (a === 'resume') { api.next(); play(); }
    });
    render();
  });

  /* ---------- poll ---------- */
  document.querySelectorAll('[data-poll]').forEach((poll) => {
    const opts = [...poll.querySelectorAll('.opt')];
    const counts = opts.map(() => 0);
    const draw = () => {
      const max = Math.max(1, ...counts);
      opts.forEach((o, k) => { o.querySelector('.bar').style.width = (counts[k] / max * 100) + '%'; o.querySelector('.cnt').textContent = counts[k]; });
    };
    opts.forEach((o, k) => {
      o.addEventListener('click', (e) => { counts[k] += e.shiftKey ? -1 : 1; counts[k] = Math.max(0, counts[k]); draw(); });
      o.addEventListener('contextmenu', (e) => { e.preventDefault(); counts[k] = Math.max(0, counts[k] - 1); draw(); });
    });
    poll.closest('.slide').querySelector('[data-poll-reset]')?.addEventListener('click', () => { counts.fill(0); draw(); });
    poll.closest('.slide').querySelector('[data-poll-five]')?.addEventListener('click', () => { counts.forEach((_, k) => counts[k] += 5); draw(); });
  });

  /* ---------- flip cards & role cards ---------- */
  document.querySelectorAll('.flip').forEach((c) => c.addEventListener('click', () => c.classList.toggle('flipped')));
  document.querySelectorAll('.role').forEach((c) => c.addEventListener('click', () => c.classList.toggle('open')));
  document.querySelectorAll('[data-flip-all]').forEach((b) => b.addEventListener('click', () => {
    const cards = b.closest('.slide').querySelectorAll('.flip');
    const anyClosed = [...cards].some((c) => !c.classList.contains('flipped'));
    cards.forEach((c) => c.classList.toggle('flipped', anyClosed));
  }));

  /* ---------- autonomy slider ---------- */
  const LEVELS = [
    { n: 'Autocomplete', d: 'Suggests the next line or block as you type. You accept or ignore.', ex: 'GitHub Copilot inline suggestions, Cursor Tab', who: 'You, 100%', m: 10 },
    { n: 'Chat', d: 'Answers questions and writes snippets. You copy, paste and adapt.', ex: 'ChatGPT, Claude, Gemini', who: 'You do the work, AI advises', m: 25 },
    { n: 'Edit', d: 'Changes the code you select, across a file or a few files. You review the diff.', ex: 'Cursor / Copilot edit mode, inline chat', who: 'Shared — you choose scope', m: 45 },
    { n: 'Agent', d: 'Plans, edits many files, runs commands and tests, iterates on errors. You approve steps.', ex: 'Claude Code, Copilot agent mode, Cursor agent, Codex CLI', who: 'AI drives, you approve', m: 75 },
    { n: 'Background agent', d: 'Takes a ticket, works alone in the cloud, opens a pull request for review.', ex: 'Codex cloud, Copilot coding agent, Claude Code on the web', who: 'AI owns the task, you review the PR', m: 95 },
  ];
  document.querySelectorAll('[data-autonomy]').forEach((box) => {
    const r = box.querySelector('input'); const lv = box.querySelectorAll('.levels span');
    const upd = () => {
      const L = LEVELS[+r.value];
      box.querySelector('.a-n').textContent = L.n; box.querySelector('.a-d').textContent = L.d;
      box.querySelector('.a-ex').textContent = L.ex; box.querySelector('.a-who').textContent = L.who;
      box.querySelector('.meter i').style.width = L.m + '%';
      lv.forEach((s, k) => s.classList.toggle('on', k === +r.value));
    };
    r.addEventListener('input', upd);
    lv.forEach((s, k) => s.addEventListener('click', () => { r.value = k; upd(); }));
    upd();
  });

  /* ---------- MCP mesh (before/after) ---------- */
  document.querySelectorAll('[data-mesh]').forEach((svg) => {
    const NS = 'http://www.w3.org/2000/svg';
    const apps = ['Claude', 'ChatGPT', 'Cursor', 'VS Code', 'Your app'];
    const svcs = ['GitHub', 'Google Drive', 'Slack', 'Postgres', 'Jira', 'Uni API'];
    const el = (t, a, txt) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (txt) e.textContent = txt; return e; };
    const ay = (i) => 30 + i * 62, sy = (j) => 14 + j * 54;
    const before = el('g', { class: 'mesh-before' }), after = el('g', { class: 'mesh-after' });
    apps.forEach((_, i) => svcs.forEach((_, j) => before.appendChild(el('line', { class: 'ln', x1: 170, y1: ay(i) + 18, x2: 560, y2: sy(j) + 18, style: 'stroke:var(--bad);opacity:.55' }))));
    after.appendChild(el('rect', { class: 'box acc2 fillacc', x: 305, y: 128, width: 120, height: 64, rx: 32 }));
    after.appendChild(el('text', { x: 365, y: 166, 'text-anchor': 'middle', class: 'b' }, 'MCP'));
    apps.forEach((_, i) => after.appendChild(el('line', { class: 'ln acc2', x1: 170, y1: ay(i) + 18, x2: 305, y2: 160 })));
    svcs.forEach((_, j) => after.appendChild(el('line', { class: 'ln acc2', x1: 425, y1: 160, x2: 560, y2: sy(j) + 18 })));
    svg.appendChild(before); svg.appendChild(after);
    apps.forEach((a, i) => { svg.appendChild(el('rect', { class: 'box acc', x: 20, y: ay(i), width: 150, height: 36, rx: 8 })); svg.appendChild(el('text', { x: 95, y: ay(i) + 23, 'text-anchor': 'middle' }, a)); });
    svcs.forEach((s, j) => { svg.appendChild(el('rect', { class: 'box warn', x: 560, y: sy(j), width: 150, height: 36, rx: 8 })); svg.appendChild(el('text', { x: 635, y: sy(j) + 23, 'text-anchor': 'middle' }, s)); });
    const box = svg.closest('.slide');
    const set = (mode) => {
      before.style.display = mode === 'before' ? '' : 'none'; after.style.display = mode === 'after' ? '' : 'none';
      box.querySelectorAll('[data-mesh-btn]').forEach((b) => b.classList.toggle('on', b.dataset.meshBtn === mode));
      box.querySelector('.mesh-count').innerHTML = mode === 'before'
        ? '<span class="bad">5 × 6 = 30</span> custom integrations'
        : '<span class="acc2">5 + 6 = 11</span> pieces, one protocol';
    };
    box.querySelectorAll('[data-mesh-btn]').forEach((b) => b.addEventListener('click', () => set(b.dataset.meshBtn)));
    set('before');
  });

  /* ---------- context budget ---------- */
  document.querySelectorAll('[data-ctx]').forEach((box) => {
    const bar = box.querySelector('.ctxbar'); const win = () => +box.querySelector('select').value;
    let items = [];
    const fmt = (n) => n >= 1000 ? Math.round(n / 1000) + 'K' : n;
    const draw = () => {
      const used = items.reduce((a, b) => a + b.t, 0), W = win();
      bar.innerHTML = items.map((it) => `<div style="width:${Math.min(it.t / W, 1) * 100}%;background:${it.c}" title="${it.l}">${it.t / W > .06 ? it.l : ''}</div>`).join('');
      bar.classList.toggle('over', used > W);
      const pct = used / W * 100;
      box.querySelector('.c-used').textContent = `${fmt(used)} / ${fmt(W)} tokens (${pct.toFixed(0)}%)`;
      box.querySelector('.c-cost').textContent = '$' + (used / 1e6 * 3).toFixed(3) + ' per model call';
      box.querySelector('.c-steps').textContent = '$' + (used / 1e6 * 3 * 10).toFixed(2) + ' for a 10-step agent task';
      const w = [];
      if (pct > 40) w.push('🐢 slower responses');
      if (pct > 40) w.push('💸 every loop step re-sends all of this');
      if (pct > 70) w.push('😵 key facts get "lost in the middle"');
      if (pct > 100) w.push('⛔ OVERFLOW — request fails or old context is dropped');
      box.querySelector('.c-warn').innerHTML = w.length ? w.map((x) => `<div>${x}</div>`).join('') : '<div class="acc2">✅ lean, focused context</div>';
    };
    box.querySelectorAll('[data-add]').forEach((b) => b.addEventListener('click', () => {
      const [l, t, c] = b.dataset.add.split('|'); items.push({ l, t: +t, c }); draw();
    }));
    box.querySelector('[data-ctx-reset]').addEventListener('click', () => { items = []; draw(); });
    box.querySelector('[data-ctx-compact]').addEventListener('click', () => {
      const total = items.reduce((a, b) => a + b.t, 0); if (!total) return;
      items = [{ l: 'summary', t: Math.round(total * 0.15), c: 'var(--acc2)' }]; draw();
    });
    box.querySelector('select').addEventListener('change', draw);
    draw();
  });

  /* ---------- break timer ---------- */
  document.querySelectorAll('[data-timer]').forEach((el) => {
    const total = +el.dataset.timer; let left = total, t = null;
    const show = () => { el.textContent = String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0'); el.classList.toggle('done', left === 0); };
    el.addEventListener('click', () => {
      if (t) { clearInterval(t); t = null; return; }
      if (left === 0) left = total;
      t = setInterval(() => { left = Math.max(0, left - 1); show(); if (!left) { clearInterval(t); t = null; } }, 1000);
    });
    el.closest('.slide').querySelector('[data-timer-reset]')?.addEventListener('click', () => { clearInterval(t); t = null; left = total; show(); });
    show();
  });

  /* ---------- cost calculator ---------- */
  document.querySelectorAll('[data-cost]').forEach((box) => {
    const v = (n) => +box.querySelector(`[name="${n}"]`).value || 0;
    const money = (x) => x >= 100 ? '$' + Math.round(x).toLocaleString() : '$' + x.toFixed(x < 1 ? 4 : 2);
    const calc = () => {
      const tasks = v('users') * v('req');
      const inTok = v('in') * v('steps'), outTok = v('out') * v('steps');
      const perTask = (inTok * v('pin') + outTok * v('pout')) / 1e6;
      box.querySelector('.r-task').textContent = money(perTask);
      box.querySelector('.r-day').textContent = money(perTask * tasks);
      box.querySelector('.r-month').textContent = money(perTask * tasks * 30);
      box.querySelector('.r-tok').textContent = (inTok + outTok).toLocaleString() + ' tokens / task';
      const cached = (inTok * 0.8 * v('pin') * 0.1 + inTok * 0.2 * v('pin') + outTok * v('pout')) / 1e6;
      box.querySelector('.r-cache').textContent = money(cached * tasks * 30);
    };
    box.querySelectorAll('input').forEach((i) => i.addEventListener('input', calc));
    calc();
  });

  /* ---------- checklist ---------- */
  document.querySelectorAll('[data-check]').forEach((box) => {
    const all = box.querySelectorAll('input'); const slide = box.closest('.slide');
    const upd = () => {
      const n = [...all].filter((i) => i.checked).length;
      slide.querySelector('.chk-bar').style.width = (n / all.length * 100) + '%';
      slide.querySelector('.chk-txt').textContent = n === all.length ? '🚀 Production ready!' : `${n} / ${all.length} ready`;
    };
    all.forEach((i) => i.addEventListener('change', upd)); upd();
  });

  /* ---------- start ---------- */
  slides.forEach((s) => s.classList.remove('active'));
  const h = parseInt(location.hash.slice(1), 10);
  cur = 0; slides[0].classList.add('active');
  go(Number.isFinite(h) ? h - 1 : 0);
  addEventListener('hashchange', () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n) && n - 1 !== cur) go(n - 1);
  });
})();
