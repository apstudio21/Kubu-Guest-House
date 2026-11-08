(() => {
  'use strict';

  const WA_NUMBER = '6281353710527';

  /* ---------------- Translations (English text lives in the HTML) ---------------- */
  const ID = {
    'title': 'Kubu Sari Guest House, Pemuteran, Bali Utara',
    'skip': 'Langsung ke kamar',
    'nav.room': 'Kamar',
    'nav.gallery': 'Galeri',
    'nav.around': 'Sekitar Pemuteran',
    'nav.location': 'Lokasi',
    'book': 'Pesan',
    'bookWa': 'Pesan via WhatsApp',
    'hero.title': 'Guest house bertaman di&nbsp;Pemuteran, Bali&nbsp;Utara',
    'hero.lead': 'Sarapan di teras pribadi, taman tropis yang tenang, dan terumbu karang Pulau Menjangan tak jauh dari sini.',
    'hero.see': 'Lihat kamar',
    'perks.h': 'Fasilitas',
    'rate.booking': 'Luar biasa di Booking.com',
    'rate.bookingSub': '154 ulasan. Staf 9,7, harga sepadan 9,8',
    'rate.google': 'di Google',
    'rate.googleSub': '50 ulasan',
    'perk.breakfast': 'Termasuk sarapan',
    'perk.wifi': 'Wi-Fi gratis',
    'perk.parking': 'Parkir gratis',
    'perk.massage': 'Pijat sesuai permintaan',
    'perk.bike': 'Sewa sepeda',
    'perk.beach': '14 menit jalan kaki ke pantai',
    'room.all': 'Semua foto',
    'room.h': 'Kamar double dengan pemandangan taman',
    'room.lead': 'Setiap kamar di taman ditata sama: ranjang besar berkelambu, teras pribadi, dan kamar mandi terbuka beratap langit.',
    'room.f1': 'Ranjang double besar dengan kelambu',
    'room.f2': 'Kamar mandi pribadi semi-terbuka dengan shower',
    'room.f3': 'Teras dengan sofa dan kursi santai',
    'room.f4': 'Sudah termasuk sarapan, seprai, dan handuk',
    'room.f5': 'Bebas rokok',
    'garden.h': 'Galeri',
    'garden.p': 'Kamar-kamar, taman dengan jalan setapak batu merah muda, dan terumbu karang di dekatnya.',
    'room.note': 'Kirim tanggal Anda, kami akan membalas dengan harga dan kamar yang tersedia.',
    'around.h': 'Sekitar Pemuteran',
    'around.p': 'Desa nelayan yang tenang di pesisir barat laut Bali, terkenal dengan lautnya yang tenang dan terumbu karang.',
    's1.h': 'Pulau Menjangan',
    's1.p': 'Salah satu perairan paling jernih di Bali untuk snorkeling dan menyelam, di dalam Taman Nasional Bali Barat. Perahu berangkat dari Labuhan Lalang, sekitar 25 menit naik mobil.',
    's2.h': 'Terumbu karang Biorock',
    's2.p': 'Proyek pemulihan terumbu karang yang bisa dinikmati dengan snorkeling langsung dari Pantai Pemuteran, tanpa perahu.',
    's3.h': 'Pura Pulaki',
    's3.p': 'Pura di tepi laut di kaki tebing, 3 km dari sini, dengan kawanan monyet yang tinggal di sekitarnya.',
    's4.h': 'Matahari terbenam di teluk',
    's4.p': 'Perahu nelayan dan hutan bakau dalam cahaya senja, beberapa menit dari Kubu Sari.',
    'v.soon': 'Video segera hadir',
    'v.sunset': 'Matahari terbenam, beberapa menit dari Kubu Sari',
    'v.sunrise': 'Matahari terbit di pesisir utara',
    'loc.h': 'Cara menemukan kami',
    'd1': 'Pantai Pemuteran',
    'd1v': '14 menit jalan kaki',
    'd2': 'Restoran dan toko',
    'd2v': '3 menit naik motor',
    'd3': 'Pura Pulaki',
    'd4': 'Taman Nasional Bali Barat',
    'loc.open': 'Buka di Google Maps',
    'final.h': 'Beri tahu tanggal Anda',
    'final.p': 'Kirim pesan via WhatsApp, kami akan membalas dengan harga dan kamar yang tersedia. Kami berbahasa Inggris dan Indonesia.'
  };

  const MSG = {
    en: { hello: "Hello! I'd like to book a room at Kubu Sari Guest House." },
    id: { hello: 'Halo! Saya ingin memesan kamar di Kubu Sari Guest House.' }
  };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = {};
  nodes.forEach(n => { EN[n.dataset.i18n] = n.innerHTML; });
  EN.title = document.title;

  let lang = 'en';
  const store = {
    get() { try { return localStorage.getItem('ks-lang'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem('ks-lang', v); } catch (e) {} }
  };

  const waLink = text => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

  function setLang(l) {
    lang = l === 'id' ? 'id' : 'en';
    const dict = lang === 'id' ? ID : EN;
    nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
    document.title = dict.title || EN.title;
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    document.querySelectorAll('a.js-wa').forEach(a => { a.href = waLink(MSG[lang].hello); });
    store.set(lang);
  }

  document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  const urlLang = new URLSearchParams(location.search).get('lang');
  setLang(urlLang || store.get() || 'en');

  /* ---------------- Header + floating button ---------------- */
  const top = document.getElementById('top');
  const fab = document.querySelector('.fab');
  const hero = document.querySelector('.hero');
  const final = document.querySelector('.final');
  let finalVisible = false;
  const onScroll = () => {
    const y = window.scrollY;
    top.classList.toggle('is-scrolled', y > 40);
    const pastHero = y > hero.offsetTop + hero.offsetHeight * 0.7;
    fab.classList.toggle('show', pastHero && !finalVisible);
  };
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([e]) => { finalVisible = e.isIntersecting; onScroll(); }).observe(final);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Reveal on scroll ---------------- */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduce) {
    const groups = ['.sec-head', '.room__info', '.ratings .rating', '.perks__list li', '.spot', '.clip', '.loc__txt', '.loc__map'];
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    groups.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('rv');
        el.style.transitionDelay = `${Math.min(i, 5) * 70}ms`;
        io.observe(el);
      });
    });
  }

  /* ---------------- Lightbox ---------------- */
  const full = src => src.replace(/-s\.webp$/, '.webp');
  const ROOM = ['house-front', 'house-terrace', 'bed-1', 'bed-2', 'bed-3', 'bath-1', 'bath-2', 'shower']
    .map(n => ({ src: `assets/img/${n}.webp`, alt: '' }));
  const GALLERY = [...document.querySelectorAll('.masonry img')].map(i => ({ src: full(i.getAttribute('src')), alt: i.alt }));
  const sets = { room: ROOM, gallery: GALLERY };

  const lb = document.getElementById('lb');
  const lbImg = lb.querySelector('img');
  const lbCount = lb.querySelector('.lb__count');
  let set = [], idx = 0, lastFocus = null;

  function show(i, instant) {
    idx = (i + set.length) % set.length;
    const item = set[idx];
    const apply = () => { lbImg.src = item.src; lbImg.alt = item.alt; lbCount.textContent = `${idx + 1} / ${set.length}`; };
    if (instant) { apply(); return; }
    lbImg.classList.add('swap');
    setTimeout(() => { apply(); lbImg.onload = () => lbImg.classList.remove('swap'); if (lbImg.complete) lbImg.classList.remove('swap'); }, 180);
    // preload neighbours
    [idx + 1, idx - 1].forEach(j => { const n = set[(j + set.length) % set.length]; if (n) new Image().src = n.src; });
  }
  function open(group, i) {
    set = sets[group] || []; if (!set.length) return;
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = 'hidden';
    show(i, true);
    requestAnimationFrame(() => lb.classList.add('open'));
    lb.querySelector('.lb__close').focus();
  }
  function close() {
    lb.classList.remove('open'); document.body.style.overflow = '';
    setTimeout(() => { lb.hidden = true; lbImg.src = ''; }, 300);
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.js-open').forEach(b => b.addEventListener('click', () => open(b.dataset.group, +b.dataset.index || 0)));
  lb.querySelector('.lb__close').addEventListener('click', close);
  lb.querySelector('.lb__prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb__next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.classList.contains('lb__fig')) close(); });
  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'Tab') { // keep focus inside
      const f = [...lb.querySelectorAll('button')].filter(b => b.offsetParent);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let sx = null, sy = null;
  lb.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(idx + (dx < 0 ? 1 : -1));
    else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) close();
    sx = sy = null;
  });

  /* ---------------- Videos: load only when near the screen ---------------- */
  const clips = [...document.querySelectorAll('.clip[data-video]')];
  if ('IntersectionObserver' in window && clips.length) {
    const vio = new IntersectionObserver(entries => {
      entries.forEach(({ target: clip, isIntersecting }) => {
        let v = clip.querySelector('video');
        if (isIntersecting && !clip.dataset.tried) {
          clip.dataset.tried = '1';
          v = document.createElement('video');
          Object.assign(v, { muted: true, loop: true, playsInline: true, preload: 'metadata' });
          v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
          if (clip.dataset.poster) v.poster = clip.dataset.poster;
          const wrap = document.createElement('div'); wrap.className = 'clip__media'; wrap.hidden = true;
          wrap.appendChild(v); clip.prepend(wrap);
          v.addEventListener('loadeddata', () => {
            wrap.hidden = false;
            const empty = clip.querySelector('.clip__empty'); if (empty) empty.remove();
            if (!reduce) v.play().catch(() => {});
          }, { once: true });
          v.addEventListener('error', () => wrap.remove(), { once: true });
          v.src = clip.dataset.video;
        } else if (v && v.readyState > 1 && !reduce) {
          isIntersecting ? v.play().catch(() => {}) : v.pause();
        }
      });
    }, { rootMargin: '200px 0px' });
    clips.forEach(c => vio.observe(c));
  }

  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
