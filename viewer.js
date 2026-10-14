const viewer = document.createElement('dialog');
viewer.className = 'viewer';
viewer.innerHTML = '<div class="toolbar"><button type="button" data-action="minus" aria-label="Уменьшить">−</button><output aria-live="polite">100%</output><button type="button" data-action="plus" aria-label="Увеличить">+</button><button type="button" data-action="reset">Сбросить</button><button type="button" data-action="close">Закрыть</button></div><div class="stage"><img alt="Увеличенное превью значка"></div>';
document.body.append(viewer);
const stage = viewer.querySelector('.stage'), picture = stage.querySelector('img'), output = viewer.querySelector('output');
let scale = 1, base = 800;
function zoom(value) { scale = Math.max(.5, Math.min(5, value)); picture.style.width = `${base * scale}px`; output.textContent = `${Math.round(scale * 100)}%`; }
document.querySelectorAll('.views a').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); picture.src = link.href; picture.alt = link.querySelector('img').alt;
  viewer.showModal(); base = Math.min(800, stage.clientWidth - 24); zoom(1); stage.scrollTo(0, 0);
}));
viewer.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.action;
  if (action === 'close') viewer.close();
  if (action === 'reset') zoom(1);
  if (action === 'plus') zoom(scale * 1.4);
  if (action === 'minus') zoom(scale / 1.4);
}));
stage.addEventListener('wheel', event => { event.preventDefault(); zoom(scale * (event.deltaY < 0 ? 1.15 : 1 / 1.15)); }, { passive: false });
