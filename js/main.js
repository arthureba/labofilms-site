/* ══════════════════════════════════════════════
   HOME — index.html
   (cursor, modal e sobre vivem em common.js)
══════════════════════════════════════════════ */

/* ─── Intro → Nav ────────────────────────────── */
const intro = document.getElementById('intro');
const nav   = document.getElementById('nav');

/* Logo desenhando: injeta o SVG inline e anima cada linha (cls-1)
   se desenhando do centro pra fora; depois o fill (cls-2) surge. */
fetch('assets/logo/labof-logo-white.svg')
  .then(r => r.text())
  .then(svgText => {
    const holder = document.getElementById('introLogo');
    holder.innerHTML = svgText;
    const svg = holder.querySelector('svg');
    if (!svg) return;

    const vb = svg.viewBox.baseVal;
    const cx = vb.width / 2, cy = vb.height / 2;
    const lines = Array.from(svg.querySelectorAll('.cls-1'));

    const items = lines.map(p => {
      const len = p.getTotalLength() || 1;
      let dist = 0;
      try { const b = p.getBBox(); dist = Math.hypot((b.x + b.width/2) - cx, (b.y + b.height/2) - cy); } catch (e) {}
      p.style.strokeDasharray  = len;
      p.style.strokeDashoffset = len;
      return { p, dist };
    });
    const maxDist = Math.max(1, ...items.map(i => i.dist));

    items.forEach(({ p, dist }) => {
      const delay = (dist / maxDist) * 750;           // centro → fora
      p.style.transition = `stroke-dashoffset 1000ms cubic-bezier(.16,1,.3,1) ${delay}ms`;
    });

    // dispara o desenho no próximo frame
    requestAnimationFrame(() => requestAnimationFrame(() => {
      items.forEach(({ p }) => { p.style.strokeDashoffset = '0'; });
    }));
    // depois das linhas, o preenchimento surge
    setTimeout(() => svg.classList.add('fill-in'), 1550);
  })
  .catch(() => {});

setTimeout(() => {
  intro.classList.add('out');
  nav.classList.add('show');
  document.querySelector('.hero-ui').classList.add('show');
}, 3600);

/* ─── Blur background (vidro fosco) ──────────────
   Troca o fundo borrado conforme o projeto em foco
══════════════════════════════════════════════ */
const blurA = document.getElementById('blurBgA');
const blurB = document.getElementById('blurBgB');
let blurActive = 'A';
let currentBgSrc = '';

const THUMBS = {
  'havaianas':      'assets/images/thumbnails/havaianas.jpg',
  'outback':        'assets/images/thumbnails/outback.jpg',
  'ford-mustang':   'assets/images/thumbnails/ford-mustang.jpg',
  'centauro-natal': 'assets/images/thumbnails/centauro-natal.jpg',
  'avatim-ivete':   'assets/images/thumbnails/avatim-ivete.jpg',
  'ford-wec':       'assets/images/thumbnails/ford-wec.jpg',
  'ford-darkhorse': 'assets/images/thumbnails/ford-darkhorse.jpg',
  'avatim-snd':     'assets/images/thumbnails/avatim-snd.jpg',
  'ford-employees': 'assets/images/thumbnails/ford-employees.jpg',
  'centauro-pais':  'assets/images/thumbnails/centauro-pais.jpg',
};

function setBlurBg(src) {
  if (!src || src === currentBgSrc) return;
  currentBgSrc = src;
  const incoming = blurActive === 'A' ? blurB : blurA;
  const outgoing = blurActive === 'A' ? blurA : blurB;
  incoming.style.backgroundImage = `url('${src}')`;
  incoming.classList.add('visible');
  setTimeout(() => outgoing.classList.remove('visible'), 80);
  blurActive = blurActive === 'A' ? 'B' : 'A';
}

const bgObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const src = e.target.dataset.id ? THUMBS[e.target.dataset.id] : null;
    if (src) setBlurBg(src);
  });
}, { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' });

document.querySelectorAll('.project').forEach(p => bgObs.observe(p));

/* ─── Hero slideshow ─────────────────────────── */
const slides    = Array.from(document.querySelectorAll('.hero-slide'));
const heroTag   = document.getElementById('heroTag');
const heroTitle = document.getElementById('heroTitle');
const heroSub   = document.getElementById('heroSub');
const heroDots  = document.getElementById('heroDots');
const heroPlayBtn = document.getElementById('heroPlayBtn');
const SLIDE_DUR = 5000;
let currentSlide = 0;
let slideTimer = null;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'hero-dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', `Slide ${i + 1}`);
  d.addEventListener('click', () => goToSlide(i));
  heroDots.appendChild(d);
});

function updateHeroUI(idx) {
  const s = slides[idx];
  heroTag.textContent   = s.dataset.tag   || '';
  heroTitle.textContent = s.dataset.title || '';
  heroSub.textContent   = s.dataset.sub   || '';
  document.querySelectorAll('.hero-dot').forEach((d, i) =>
    d.classList.toggle('active', i === idx));
}

function goToSlide(idx) {
  slides[currentSlide].classList.remove('active');
  currentSlide = (idx + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  updateHeroUI(currentSlide);
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), SLIDE_DUR);
}

updateHeroUI(0);
slideTimer = setInterval(() => goToSlide(currentSlide + 1), SLIDE_DUR);

// Hero abre o projeto correspondente
function goToCurrentSlideProject() {
  const id = slides[currentSlide].dataset.id;
  if (id) window.location.href = `projeto.html?id=${id}`;
}
if (heroPlayBtn) heroPlayBtn.addEventListener('click', goToCurrentSlideProject);
document.getElementById('heroSlides').addEventListener('click', e => {
  if (e.target.closest('.hero-ui')) return;
  goToCurrentSlideProject();
});

/* ─── Scroll reveal ──────────────────────────── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('reveal');
    revealObs.unobserve(e.target);
  });
}, { threshold: 0.07, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.project, .section-label').forEach(el => revealObs.observe(el));

/* ─── Nav active on scroll ───────────────────── */
const sections = Array.from(document.querySelectorAll('.category-section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { threshold: 0.3 });
sections.forEach(s => sectionObs.observe(s));

document.getElementById('navLogo').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── Numeração automática (01, 02, … na ordem das seções) ─── */
document.querySelectorAll('.project-idx').forEach((el, i) => {
  el.textContent = String(i + 1).padStart(2, '0');
});

/* ─── Card → página do projeto ───────────────── */
document.querySelectorAll('.project').forEach(p => {
  p.addEventListener('click', () => {
    const id = p.dataset.id;
    if (id) window.location.href = `projeto.html?id=${id}`;
  });
});

/* ─── Hover preview nos cards ─────────────────────
   Freeze frame P&B (thumb do Vimeo) que vira
   colorido + vídeo rodando ao passar o mouse.
   O vídeo só carrega no hover (lazy).
══════════════════════════════════════════════ */
function isRealVimeo(v) { return v && !v.startsWith('PLACEHOLDER'); }

document.querySelectorAll('.project').forEach(card => {
  const vid   = card.dataset.vimeo;
  const thumb = card.querySelector('.project-thumb');
  if (!isRealVimeo(vid) || !thumb) return;

  // freeze frame (thumbnail do Vimeo)
  const poster = document.createElement('img');
  poster.className = 'thumb-poster';
  poster.loading = 'lazy';
  poster.alt = card.dataset.title || '';
  // usa um poster local se o card definir data-poster, senão pega o frame do Vimeo
  poster.src = card.dataset.poster || `https://vumbnail.com/${vid}.jpg`;
  poster.addEventListener('load', () => card.classList.add('has-poster'));
  poster.addEventListener('error', () => poster.remove());  // offline → mantém placeholder
  thumb.insertBefore(poster, thumb.firstChild);

  // container do vídeo (preenchido no hover)
  const videoWrap = document.createElement('div');
  videoWrap.className = 'thumb-video';
  thumb.insertBefore(videoWrap, thumb.firstChild.nextSibling);

  let timer = null;
  card.addEventListener('mouseenter', () => {
    clearTimeout(timer);
    if (videoWrap.children.length) return;       // já montado
    const f = document.createElement('iframe');
    f.src = `https://player.vimeo.com/video/${vid}?background=1&autoplay=1&loop=1&muted=1&dnt=1`;
    f.setAttribute('frameborder', '0');
    f.setAttribute('allow', 'autoplay');
    f.setAttribute('tabindex', '-1');
    f.setAttribute('aria-hidden', 'true');
    videoWrap.appendChild(f);
  });
  card.addEventListener('mouseleave', () => {
    // pequeno atraso evita recarregar se o mouse só passou de relance
    timer = setTimeout(() => { videoWrap.innerHTML = ''; }, 400);
  });
});
