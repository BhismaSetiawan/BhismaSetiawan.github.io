(() => {
  const $ = (s, e = document) => e.querySelector(s);
  const $$ = (s, e = document) => [...e.querySelectorAll(s)];
  const R = document.documentElement;
  const rm = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const EMAIL = 'bhisma.setiawan1@gmail.com';

  const ico = s => s
    ? `<img class="ic" src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${s}/${s}-original.svg" alt="" loading="lazy" onerror="this.outerHTML='<i class=ic>✦</i>'">`
    : '<i class="ic">✦</i>';
  const chip = ([n, s]) => `<span class="chip">${ico(s)}${n}</span>`;

  /* theme */
  const setTheme = d => {
    R.classList.toggle('dark', d);
    try { localStorage.setItem('theme', d ? 'd' : 'l'); } catch (e) {}
  };

  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  setTheme(saved ? saved === 'd' : matchMedia('(prefers-color-scheme:dark)').matches);

  $('#tbtn').onclick = () => setTheme(!R.classList.contains('dark'));
  $('#year').textContent = new Date().getFullYear();

  /* projects */
  const P = [
    {
      g: '数', t: 'Tracer Study', k: 'Full-stack web · Polban', img: 'TracerStudy.png',
      d: 'A dashboard that merges tracer-study data across years and recommends charts using simple rules.',
      f: 'My role: full-stack developer, from the API and database to the Vue interface.',
      s: [['FastAPI', 'fastapi'], ['Vue.js', 'vuejs'], ['PostgreSQL', 'postgresql']],
      r: null
    },
    {
      g: '検', t: 'SipTA', k: 'Quality assurance · 2025', img: 'SipTA.png',
      d: 'A platform that tracks a student’s final project from title submission and consultations to the final assessment.',
      f: 'My role: test-case design, user acceptance testing for every module, and documenting bugs for the developers.',
      s: [['Laravel', 'laravel'], ['PHP', 'php'], ['Docker', 'docker'], ['UAT']],
      r: 'https://github.com/sipta-jtk/sipta'
    },
    {
      g: '劇', t: 'DramaKu', k: 'Full-stack web · 2024', img: 'DramaKu.webp',
      d: 'A movie catalogue with search, filters, ratings, reviews and separate roles for admins and users.',
      f: 'My role: full-stack. Authentication, admin CRUD, reviews, rating verification and Jest unit tests.',
      s: [['Laravel', 'laravel'], ['React', 'react'], ['Tailwind CSS', 'tailwindcss'], ['Docker', 'docker']],
      r: 'https://github.com/raizenway/dramaku'
    },
    {
      g: '戦', t: 'Conflict Zone', k: 'Game development · 2024', img: 'ConflictZone.png',
      d: 'A 3D tower-defense game with enemy waves, upgradeable turrets, several maps and star-based scoring.',
      f: 'My role: all game logic, including waves, enemy paths, upgrades and scoring, plus a few 3D models.',
      s: [['Unity', 'unity'], ['C#', 'csharp'], ['Blender', 'blender']],
      r: 'https://github.com/RezaAziiz/TowerDefenseGame'
    }
  ];

  $('#projects').innerHTML = P.map(p => `
    <article class="proj rv">
      <div class="shot" data-g="${p.g}">
        <figure data-tilt>
          <img src="assets/images/${p.img}" alt="${p.t} screenshot" loading="lazy">
        </figure>
      </div>
      <div>
        <p class="k">${p.k}</p>
        <h3>${p.t}</h3>
        <p>${p.d}</p>
        <p class="role">${p.f}</p>
        <div class="chips">${p.s.map(chip).join('')}</div>
        ${p.r
          ? `<a class="btn ghost" href="${p.r}" target="_blank" rel="noreferrer" data-mag>View repository ↗</a>`
          : '<span class="lock">🔒 Private repository, walkthrough on request</span>'}
      </div>
    </article>
  `).join('');

  $$('[data-tilt]').forEach(f => {
    f.onclick = () => {
      const l = document.createElement('div');
      l.className = 'lb';
      l.innerHTML = `<img src="${$('img', f).src}" alt="">`;
      l.onclick = () => l.remove();
      document.body.append(l);
    };
    if (!fine || rm) return;
    f.onpointermove = e => {
      const b = f.getBoundingClientRect();
      const x = (e.clientX - b.left) / b.width - 0.5;
      const y = (e.clientY - b.top) / b.height - 0.5;
      f.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 10}deg) scale(1.02)`;
    };
    f.onpointerleave = () => f.style.transform = '';
  });

  /* toolkit */
  const LV = ['', 'Learning', 'Working', 'Proficient', 'Advanced'];
  const S = {
    Languages: [['C', 'c', 2], ['C++', 'cplusplus', 2], ['Java', 'java', 2], ['C#', 'csharp', 2], ['PHP', 'php', 2], ['JavaScript', 'javascript', 3], ['Python', 'python', 3], ['HTML', 'html5', 3], ['CSS', 'css3', 3]],
    Frameworks: [['Laravel', 'laravel', 2], ['React', 'react', 3], ['Spring Boot', 'spring', 2], ['Tailwind CSS', 'tailwindcss', 3], ['Bootstrap', 'bootstrap', 3], ['Flask', 'flask', 2]],
    Databases: [['MySQL', 'mysql', 3], ['PostgreSQL', 'postgresql', 3], ['SQLite', 'sqlite', 3], ['Oracle', 'oracle', 3], ['MongoDB', 'mongodb', 3], ['Neo4j', 'neo4j', 1], ['MariaDB', 'mariadb', 1]],
    Tools: [['Git', 'git', 3], ['VS Code', 'vscode', 3], ['Docker', 'docker', 3], ['Blender', 'blender', 3], ['Unity', 'unity', 2], ['Figma', 'figma', 3]]
  };

  const tabs = ['All', ...Object.keys(S)];
  let cur = 'All';

  const drawSk = () => {
    $('#skills').innerHTML = Object.entries(S)
      .filter(([k]) => cur === 'All' || k === cur)
      .flatMap(([, v]) => v)
      .map(([n, s, l], i) => `
        <div class="sk" style="animation-delay:${i * 35}ms">
          ${ico(s)}
          <div>
            <b>${n}</b>
            <small>${LV[l]}</small>
            <div class="pips">${[1, 2, 3, 4].map(x => `<i class="${x <= l ? 'f' : ''}"></i>`).join('')}</div>
          </div>
        </div>
      `).join('');
  };

  const drawTabs = () => {
    $('#tabs').innerHTML = tabs
      .map(t => `<button role="tab" class="${t === cur ? 'on' : ''}" aria-selected="${t === cur}">${t}</button>`)
      .join('');
    $$('#tabs button').forEach(b => b.onclick = () => {
      cur = b.textContent;
      drawTabs();
      drawSk();
    });
  };

  drawTabs();
  drawSk();

  /* reveal, counters, scroll effects */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  }), { threshold: 0.12 });

  $$('.rv').forEach(e => rm ? e.classList.add('in') : io.observe(e));

  $$('[data-n]').forEach(el => {
    const n = +el.dataset.n;
    if (rm) { el.textContent = n; return; }
    let t0;
    const f = t => {
      t0 ??= t;
      const p = Math.min((t - t0 - 900) / 1400, 1);
      el.textContent = Math.round(n * (p < 0 ? 0 : 1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  });

  const secs = $$('main section[id]');
  const links = $$('#nav a');
  const bar = $('#bar');
  let tick = 0;

  const onScroll = () => {
    tick = 0;
    const y = scrollY;
    const h = R.scrollHeight - innerHeight;
    bar.style.width = (y / h * 100) + '%';
    if (!rm && y < innerHeight * 1.2) R.style.setProperty('--sy', y);
    let id = '';
    secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * 0.4) id = s.id; });
    links.forEach(a => a.classList.toggle('on', a.hash === '#' + id));
  };

  addEventListener('scroll', () => { if (!tick) tick = requestAnimationFrame(onScroll); }, { passive: true });
  onScroll();
  setTimeout(() => $('#loader').classList.add('out'), rm ? 0 : 1100);

  /* typewriter */
  const W = ['full-stack web apps.', 'dependable systems.', 'well-tested features.', 'things worth shipping.'];
  const ty = $('#typed');

  if (rm) {
    ty.textContent = W[0];
  } else {
    let w = 0, c = 0, del = false;
    const step = () => {
      const s = W[w];
      c += del ? -1 : 1;
      ty.textContent = s.slice(0, c);
      let d = del ? 35 : 70;
      if (!del && c === s.length) { del = true; d = 1600; }
      else if (del && c === 0) { del = false; w = (w + 1) % W.length; d = 350; }
      setTimeout(step, d);
    };
    setTimeout(step, 1400);
  }

  /* magnetic buttons */
  if (fine && !rm) {
    $$('[data-mag]').forEach(b => {
      b.onpointermove = e => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
      };
      b.onpointerleave = () => b.style.transform = '';
    });
  }

  /* ink brush cursor */
  if (fine && !rm) {
    const cv = $('#ink'), x = cv.getContext('2d');
    let pts = [];
    let mx = 0, my = 0;

    const rs = () => { cv.width = innerWidth; cv.height = innerHeight; };
    rs();
    addEventListener('resize', rs);

    addEventListener('pointermove', e => {
      mx = e.clientX;
      my = e.clientY;
      pts.push({ x: mx, y: my, a: 1 });
    });

    (function loop() {
      x.clearRect(0, 0, cv.width, cv.height);
      pts = pts.filter(p => p.a > 0.02);

      const col = R.classList.contains('dark') ? '234,90,66' : '28,24,20';

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i], q = pts[i - 1];
        x.strokeStyle = `rgba(${col},${p.a * 0.45})`;
        x.lineWidth = p.a * 7;
        x.lineCap = 'round';
        x.beginPath();
        x.moveTo(q.x, q.y);
        x.lineTo(p.x, p.y);
        x.stroke();
      }

      /* dot at the head so it sits exactly on the cursor */
      const head = pts[pts.length - 1];
      if (head) {
        x.fillStyle = `rgba(${col},${head.a * 0.45})`;
        x.beginPath();
        x.arc(head.x, head.y, head.a * 3.5, 0, Math.PI * 2);
        x.fill();
      }

      pts.forEach(p => p.a *= 0.92);
      requestAnimationFrame(loop);
    })();
  }

  /* mobile menu */
  const nav = $('#nav'), mb = $('#mbtn');
  mb.onclick = () => {
    const o = nav.classList.toggle('open');
    mb.setAttribute('aria-expanded', o);
  };
  links.forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    mb.setAttribute('aria-expanded', 'false');
  }));

  /* toast + copy */
  const toast = m => {
    const t = $('#toast');
    t.textContent = m;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  };

  const copy = () => navigator.clipboard.writeText(EMAIL).then(
    () => toast('Email copied to clipboard'),
    () => toast(EMAIL)
  );

  $('#copy').onclick = copy;

  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      $$('.lb').forEach(l => l.remove());
      nav.classList.remove('open');
    }
  });
})();