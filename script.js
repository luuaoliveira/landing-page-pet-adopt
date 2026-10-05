// ===== Dados dos pets (edite aqui) =====
const pets = [
  {nome:'Thor', tipo:'cao', idade:'filhote', info:'Cachorro • 8 meses • Médio', sexo:'Macho', tag:'Filhote', desc:'Brincalhão e dócil, adora correr e aprender truques novos.', img:'https://images.unsplash.com/photo-1579807351146-e6dd49462635?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDIwNHx8ZG9nfGVufDB8fHx8MTc5MTIzMDQzMnww&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'},
  {nome:'Mel', tipo:'gato', idade:'adulto', info:'Gato • 2 anos • Pequeno', sexo:'Fêmea', tag:'Castrada', desc:'Curiosa e carinhosa, adora um colo e uma janela ensolarada.', img:'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDJ8fGNhdHxlbnwwfHx8fDE3OTEyMTc5MTF8MA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'},
  {nome:'Pipoca', tipo:'cao', idade:'adulto', info:'Cachorro • 5 anos • Grande', sexo:'Macho', tag:'Filhote', desc:'Cheio de energia, se dá bem com crianças e outros bichinhos.', img:'https://images.unsplash.com/photo-1543466835-00a7907e9de1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDh8fGRvZ3xlbnwwfHx8fDE3OTEyMTU3NDV8MA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'},
  {nome:'Amora', tipo:'gato', idade:'adulto', info:'Gato • 3 anos • Pequeno', sexo:'Fêmea', tag:'Vacinada', desc:'Calma e independente, perfeita para apartamento.', img:'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDI4fHxjYXR8ZW58MHx8fHwxNzkxMjE3OTExfDA&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'},
  {nome:'Bob', tipo:'gato', idade:'adulto', info:'Cachorro • 3 Meses • Médio', sexo:'Macho', tag:'Castrado', desc:'Tranquilo e companheiro, adora acompanhar a família.', img:'https://images.unsplash.com/photo-1592924728350-f7d4fd5d1655?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDE1OHx8ZG9nfGVufDB8fHx8MTc5MTIzMDQzMnww&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'},
  {nome:'Mimi', tipo:'gato', idade:'adulto', info:'Gato • 1 ano • Pequeno', sexo:'Fêmea', tag:'Vacinada', desc:'Meiga e brincalhona, adora ser paparicada.', img:'https://images.unsplash.com/photo-1566340070191-403a3b871d27?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3MjAxN3wwfDF8c2VhcmNofDE2Mnx8Y2F0fGVufDB8fHx8MTc5MTIzMDkzMXww&ixlib=rb-4.1.0&q=85&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450'}
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

// ===== Toast =====
const toast = $('#toast');
let toastTimer;
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-show'), 2400);
}

// ===== Cards + filtros =====
const grid = $('#cards');
const favs = new Set();

function render(filter = 'todos'){
  const list = pets.filter(p => filter === 'todos' || p.tipo === filter || p.idade === filter);
  grid.innerHTML = list.map(p => `
    <article class="card">
      <div class="card__img">
        <img src="${p.img}" alt="${p.nome}, ${p.info}" loading="lazy">
        <span class="tag">${p.tag}</span>
        <button class="fav ${favs.has(p.nome) ? 'is-on' : ''}" data-nome="${p.nome}" aria-label="Favoritar ${p.nome}">${favs.has(p.nome) ? '♥' : '♡'}</button>
      </div>
      <div class="card__body">
        <div class="card__top"><h3>${p.nome}</h3><span class="card__sex">${p.sexo}</span></div>
        <p class="card__meta">${p.info}</p>
        <p class="card__desc">${p.desc}</p>
        <button class="btn btn--primary btn--sm" data-adotar="${p.nome}">Conhecer ${p.nome}</button>
      </div>
    </article>`).join('') || '<p style="grid-column:1/-1;text-align:center;color:var(--muted)">Nenhum pet nessa categoria por enquanto.</p>';
}

$$('.filter').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  render(btn.dataset.filter);
}));

grid.addEventListener('click', e => {
  const fav = e.target.closest('.fav');
  if (fav){
    const n = fav.dataset.nome;
    favs.has(n) ? favs.delete(n) : favs.add(n);
    fav.classList.toggle('is-on');
    fav.textContent = favs.has(n) ? '♥' : '♡';
    return;
  }
  const btn = e.target.closest('[data-adotar]');
  if (btn) showToast(`Que legal! Em breve você poderá conhecer o ${btn.dataset.adotar} 💜`);
});

// ===== Menu mobile =====
const toggle = $('.nav__toggle'), menu = $('#menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
});
$$('#menu a').forEach(a => a.addEventListener('click', () => menu.classList.remove('is-open')));

// ===== Copiar PIX =====
$('#copyPix').addEventListener('click', async e => {
  try {
    await navigator.clipboard.writeText(e.currentTarget.dataset.pix);
    showToast('Chave PIX copiada!');
  } catch { showToast('Não foi possível copiar. Copie manualmente: ' + e.currentTarget.dataset.pix); }
});

// ===== Newsletter =====
$('#newsForm').addEventListener('submit', e => {
  e.preventDefault();
  e.target.reset();
  showToast('Inscrição realizada. Obrigado!');
});

// ===== Contadores do hero =====
const nf = new Intl.NumberFormat('pt-BR');
const io = new IntersectionObserver(entries => entries.forEach(en => {
  if (!en.isIntersecting) return;
  const el = en.target, end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
  const t0 = performance.now(), dur = 1200;
  (function tick(t){
    const k = Math.min((t - t0) / dur, 1);
    el.textContent = pre + nf.format(Math.round(end * k)) + suf;
    if (k < 1) requestAnimationFrame(tick);
  })(t0);
  io.unobserve(el);
}), {threshold:.6});
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) $$('[data-count]').forEach(el => io.observe(el));

render();
