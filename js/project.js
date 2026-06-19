/* ══════════════════════════════════════════════
   PROJECT PAGE — projeto.html
   Lê ?id=… , busca em window.PROJECTS e monta a página.
══════════════════════════════════════════════ */

const root = document.getElementById('projectRoot');
const params = new URLSearchParams(location.search);
const id = params.get('id');
const data = (window.PROJECTS || {})[id];

/* ─── helpers ─────────────────────────────────── */
const hasVid = v => v && !String(v).startsWith('PLACEHOLDER') && String(v).trim() !== '';
const esc = s => (s == null ? '' : String(s));

const PLAY_ICON =
  '<svg viewBox="0 0 18 18" width="16" height="16" fill="none"><path d="M5 3.5L14.5 9L5 14.5V3.5Z" fill="currentColor"/></svg>';

// Card de vídeo. preview=true → roda o preview do Vimeo no fundo.
function videoCard(item, ratio, preview) {
  const card = document.createElement('button');
  card.className = `vcard vcard--${ratio}`;
  if (hasVid(item.vimeo)) {
    card.classList.add('is-live');
    const bg = preview
      ? `<div class="vcard-preview"><iframe src="https://player.vimeo.com/video/${item.vimeo}?background=1&autoplay=1&loop=1&muted=1&dnt=1" frameborder="0" allow="autoplay" tabindex="-1" aria-hidden="true"></iframe></div>`
      : '';
    card.innerHTML = `
      ${bg}
      <span class="vcard-overlay"></span>
      <span class="vcard-play">${PLAY_ICON}</span>
      <span class="vcard-meta">
        <span class="vcard-title">${esc(item.title)}</span>
        ${item.sub ? `<span class="vcard-sub">${esc(item.sub)}</span>` : ''}
      </span>`;
    card.addEventListener('click', () =>
      window.openModal(item.vimeo, data.title + (data.subtitle ? ' — ' + data.subtitle : ''), item.title));
  } else {
    card.classList.add('is-empty');
    card.innerHTML = `
      <span class="vcard-meta">
        <span class="vcard-title">${esc(item.title)}</span>
        <span class="vcard-soon">Em breve</span>
      </span>`;
  }
  return card;
}

// Card de foto.
function photoCard(item) {
  const fig = document.createElement('figure');
  fig.className = 'pcard';
  const img = new Image();
  img.alt = esc(item.alt);
  img.loading = 'lazy';
  img.onerror = () => {
    fig.classList.add('is-empty');
    fig.innerHTML = `<span class="pcard-soon">Foto em breve</span>`;
  };
  img.src = item.src;
  fig.appendChild(img);
  fig.addEventListener('click', () => {
    if (!fig.classList.contains('is-empty')) openLightbox(item.src, item.alt);
  });
  return fig;
}

function blockEl(block) {
  // Só renderiza itens com conteúdo real (sem placeholder "Em breve")
  let items = block.items || [];
  if (block.type === 'photos') items = items.filter(it => it.src);
  else                         items = items.filter(it => hasVid(it.vimeo));
  if (!items.length) return null;   // bloco vazio → não aparece

  const sec = document.createElement('section');
  sec.className = `proj-block proj-block--${block.type}`;
  sec.innerHTML = `<h3 class="block-label">${esc(block.label)}</h3>`;

  const grid = document.createElement('div');
  grid.className = `block-grid block-grid--${block.type}`;

  items.forEach(item => {
    if (block.type === 'photos') {
      grid.appendChild(photoCard(item));
    } else if (block.type === 'film') {
      grid.appendChild(videoCard(item, 'wide', true));   // preview ligado
    } else if (block.type === 'social') {
      grid.appendChild(videoCard(item, 'vert', false));
    } else { // cuts
      grid.appendChild(videoCard(item, 'wide', false));
    }
  });

  sec.appendChild(grid);
  return sec;
}

/* ─── Lightbox (fotos) ────────────────────────── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxBackdrop= document.getElementById('lightboxBackdrop');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
window.closeLightbox = function () {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
};
if (lightboxClose)    lightboxClose.addEventListener('click', window.closeLightbox);
if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', window.closeLightbox);

/* ─── Render ──────────────────────────────────── */
function render() {
  if (!data) {
    root.innerHTML = `
      <div class="proj-404">
        <h1>Projeto não encontrado</h1>
        <a href="index.html" class="proj-back">← Voltar para o início</a>
      </div>`;
    return;
  }

  document.title = `${data.title} — Labof Films`;

  // fundo desfocado com a capa
  const blurA = document.getElementById('blurBgA');
  if (blurA && data.cover) {
    blurA.style.backgroundImage = `url('${data.cover}')`;
    blurA.classList.add('visible');
    const img = new Image();
    img.onerror = () => blurA.classList.remove('visible');
    img.src = data.cover;
  }

  const frag = document.createDocumentFragment();
  const article = document.createElement('article');
  article.className = 'proj';

  // HERO (texto)
  const hero = document.createElement('header');
  hero.className = 'proj-hero';
  hero.innerHTML = `
    <a href="index.html" class="proj-back">← Projetos</a>
    <div class="proj-hero-meta">${esc(data.client)} · ${esc(data.category)} · ${esc(data.year)}</div>
    <h1 class="proj-title">${esc(data.title)}</h1>
    ${data.subtitle ? `<p class="proj-subtitle">${esc(data.subtitle)}</p>` : ''}`;
  article.appendChild(hero);

  // INTRO (resumo)
  const intro = document.createElement('section');
  intro.className = 'proj-intro';
  const summaryHtml = (data.summary || []).map(p => `<p>${esc(p)}</p>`).join('');
  intro.innerHTML = `<div class="proj-summary">${summaryHtml}</div>`;
  article.appendChild(intro);

  // BLOCOS (pula os vazios)
  (data.blocks || []).forEach(b => { const el = blockEl(b); if (el) article.appendChild(el); });

  // PRÓXIMO PROJETO
  const next = data.next && window.PROJECTS[data.next];
  if (next) {
    const nav = document.createElement('a');
    nav.className = 'proj-next';
    nav.href = `projeto.html?id=${data.next}`;
    nav.innerHTML = `
      <span class="proj-next-label">Próximo projeto</span>
      <strong class="proj-next-title">${esc(next.title)}${next.subtitle ? ` — ${esc(next.subtitle)}` : ''}</strong>
      <span class="proj-next-arrow">→</span>`;
    article.appendChild(nav);
  }

  // FOOTER curto
  const footer = document.createElement('footer');
  footer.className = 'proj-footer';
  footer.innerHTML = `
    <a href="mailto:hello@lfilms.com.br" class="footer-contact-link">hello@lfilms.com.br</a>
    <a href="https://www.instagram.com/labof_films/" target="_blank" rel="noopener" class="footer-contact-link">↗ @labof_films</a>
    <span>© 2025 Labof Films</span>`;
  article.appendChild(footer);

  frag.appendChild(article);
  root.appendChild(frag);

  // reveal on scroll
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('reveal');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  article.querySelectorAll('.proj-block, .proj-intro, .proj-next').forEach(el => obs.observe(el));
}

render();
