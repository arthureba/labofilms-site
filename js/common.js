/* ══════════════════════════════════════════════
   COMMON — compartilhado entre home e página de projeto
   Cursor 8-bit · Modal de vídeo · Overlay Sobre
══════════════════════════════════════════════ */

/* ─── Cursor (anel + ponto, lazy follow) ─────── */
(function cursorInit() {
  const cursor = document.getElementById('cursor');
  const dot    = document.getElementById('cursorDot');
  if (!cursor) return;
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    if (dot) { dot.style.left = mx + 'px'; dot.style.top = my + 'px'; }
  });

  (function tick() {
    cx += (mx - cx) * 0.1;          // anel segue com atraso suave
    cy += (my - cy) * 0.1;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(tick);
  })();

  // expande sobre elementos interativos
  document.querySelectorAll('a, button, .project, .hero-dot, .vcard, .pcard').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('c-expand'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('c-expand'));
  });

  document.addEventListener('mouseleave', () => document.body.classList.add('c-hidden'));
  document.addEventListener('mouseenter', () => document.body.classList.remove('c-hidden'));
})();

/* ─── Video modal (Vimeo) ────────────────────── */
const modal         = document.getElementById('modal');
const modalPlayer   = document.getElementById('modalPlayer');
const modalLabel    = document.getElementById('modalLabel');
const modalClose    = document.getElementById('modalClose');
const modalBackdrop = document.getElementById('modalBackdrop');

window.openModal = function (vimeoId, title, sub) {
  if (!modal || !vimeoId || String(vimeoId).startsWith('PLACEHOLDER')) return;
  modalPlayer.innerHTML = `<iframe
    src="https://player.vimeo.com/video/${vimeoId}?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&dnt=1"
    allow="autoplay; fullscreen; picture-in-picture"
    allowfullscreen></iframe>`;
  modalLabel.textContent = sub ? `${title} — ${sub}` : (title || '');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};
window.closeModal = function () {
  if (!modal) return;
  modal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => { modalPlayer.innerHTML = ''; }, 450);
};

if (modalClose)    modalClose.addEventListener('click', window.closeModal);
if (modalBackdrop) modalBackdrop.addEventListener('click', window.closeModal);

/* ─── Sobre overlay ──────────────────────────── */
const sobreOverlay = document.getElementById('sobreOverlay');
const sobreClose   = document.getElementById('sobreClose');
const navSobre     = document.getElementById('navSobre');

window.closeSobre = function () {
  if (!sobreOverlay) return;
  sobreOverlay.classList.remove('open');
  document.body.style.overflow = '';
};
if (navSobre) navSobre.addEventListener('click', () => {
  sobreOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
});
if (sobreClose) sobreClose.addEventListener('click', window.closeSobre);
if (sobreOverlay) sobreOverlay.addEventListener('click', e => {
  if (e.target === sobreOverlay) window.closeSobre();
});

/* ─── Escape fecha tudo ──────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    window.closeModal();
    window.closeSobre();
    if (window.closeLightbox) window.closeLightbox();
  }
});
