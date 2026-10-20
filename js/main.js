'use strict';

/* ═══════════════════════════════════════════════
   Crónica Empresarial — lógica del frontend
   Versión demo: los datos se guardan en localStorage
   hasta que exista el backend en Flask.
   ═══════════════════════════════════════════════ */

// ─── CATÁLOGOS ───
const SECTORES = [
  'Agricultura', 'Banca y Finanzas', 'Comercio', 'Construcción', 'Educación',
  'Gobierno', 'Manufactura', 'Salud', 'Seguridad privada', 'Tecnología',
  'Telecomunicaciones', 'Transporte', 'Turismo y Hotelería', 'Zona Franca', 'Otro'
];

const PROVINCIAS = [
  'Distrito Nacional', 'Azua', 'Bahoruco', 'Barahona', 'Dajabón', 'Duarte', 'El Seibo',
  'Elías Piña', 'Espaillat', 'Hato Mayor', 'Hermanas Mirabal', 'Independencia',
  'La Altagracia', 'La Romana', 'La Vega', 'María Trinidad Sánchez', 'Monseñor Nouel',
  'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia', 'Puerto Plata', 'Samaná',
  'San Cristóbal', 'San José de Ocoa', 'San Juan', 'San Pedro de Macorís',
  'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'
];

const TIPOS = {
  empleado: [
    'Salario no pagado o retrasado', 'Horas extra no pagadas', 'Prestaciones laborales no pagadas',
    'Salario de Navidad o vacaciones no pagados', 'No inscripción en la Seguridad Social (TSS)',
    'Despido injustificado', 'Acoso laboral', 'Acoso sexual', 'Discriminación',
    'Condiciones de trabajo inseguras', 'Violación del contrato', 'Otro'
  ],
  empleador: [
    'Abandono de trabajo', 'Robo o hurto', 'Fraude o falsificación',
    'Filtración de información confidencial', 'Violencia o conducta inapropiada',
    'Daño a bienes de la empresa', 'Incumplimiento reiterado de normas', 'Otro'
  ]
};

const ESTADOS = [
  { id: 'recibida',  titulo: 'Recibida',    texto: 'Tu denuncia llegó correctamente.' },
  { id: 'revision',  titulo: 'En revisión', texto: 'Un moderador está analizando el caso.' },
  { id: 'cerrada',   titulo: 'Cerrada',     texto: 'El caso fue atendido y archivado.' }
];

const STAR_LABELS = ['', 'Muy mala', 'Mala', 'Regular', 'Buena', 'Excelente'];

// ─── DATOS (localStorage) ───
const STORAGE_KEY = 'cronica-demo-v1';

const SEED = {
  denuncias: [],
  empresas: [
    { id: 1, nombre: 'Banco Central de Servicios', sector: 'Banca y Finanzas', votos: [5, 4, 4, 3, 5, 4],
      comentarios: [
        { texto: 'Buen ambiente, pero los ascensos son muy lentos.', fecha: 'ene. 2025', estado: 'aprobado' },
        { texto: 'Los beneficios son buenos. La gerencia media puede mejorar.', fecha: 'feb. 2025', estado: 'aprobado' }
      ] },
    { id: 2, nombre: 'Constructora del Este', sector: 'Construcción', votos: [2, 1, 2, 1, 3],
      comentarios: [{ texto: 'No pagan horas extras. Piden mucho y dan poco.', fecha: 'mar. 2025', estado: 'aprobado' }] },
    { id: 3, nombre: 'TechRD Solutions', sector: 'Tecnología', votos: [5, 5, 4, 5, 5, 4, 5],
      comentarios: [
        { texto: 'Excelente empresa para crecer profesionalmente.', fecha: 'dic. 2024', estado: 'aprobado' },
        { texto: 'Trabajo remoto y horarios flexibles. Muy recomendada.', fecha: 'ene. 2025', estado: 'aprobado' }
      ] },
    { id: 4, nombre: 'Hotel Caribe & Resort', sector: 'Turismo y Hotelería', votos: [3, 3, 2, 4, 3],
      comentarios: [{ texto: 'Temporada alta es agotadora, pero las propinas ayudan.', fecha: 'feb. 2025', estado: 'aprobado' }] }
  ]
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) { /* almacenamiento bloqueado o dañado */ }
  return structuredClone(SEED);
}

function saveStore() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch (e) { /* modo privado */ }
}

const store = loadStore();

// ─── UTILIDADES ───
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// Escapa HTML antes de insertarlo con innerHTML. Sin esto, un nombre como
// <img src=x onerror=alert(1)> ejecutaría código (XSS).
function esc(str) {
  return String(str).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

const avg = votos => votos.length ? votos.reduce((a, b) => a + b, 0) / votos.length : 0;
const nowMonth = () => new Date().toLocaleDateString('es-DO', { month: 'short', year: 'numeric' });
const today = () => new Date().toLocaleDateString('es-DO', { day: 'numeric', month: 'long', year: 'numeric' });

function fillSelect(select, options, placeholder = 'Selecciona…') {
  select.innerHTML = '';
  select.append(new Option(placeholder, ''));
  options.forEach(o => select.append(new Option(o, o)));
}

function showToast(msg, type = '') {
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  $('#toast-container').append(t);
  setTimeout(() => t.remove(), 4000);
}

// Código de seguimiento: 12 caracteres aleatorios (60 bits) con crypto.
// El alfabeto omite 0/O y 1/I para evitar confusiones al copiarlo.
const ALFABETO = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generarCodigo() {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const chars = [...bytes].map(b => ALFABETO[b % ALFABETO.length]).join('');
  return chars.match(/.{4}/g).join('-');
}
function normalizarCodigo(str) {
  const limpio = str.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return (limpio.match(/.{1,4}/g) || []).join('-');
}

// ─── NAVEGACIÓN (rutas con #) ───
const ROUTES = ['inicio', 'denunciar', 'consultar', 'ranking', 'ayuda'];

function route() {
  const name = location.hash.slice(1);
  const current = ROUTES.includes(name) ? name : 'inicio';
  $$('.view').forEach(v => { v.hidden = v.dataset.view !== current; });
  $$('.main-nav a').forEach(a => a.classList.toggle('active', a.dataset.route === current));
  closeNav();
  window.scrollTo(0, 0);

  if (current === 'inicio') renderInicio();
  if (current === 'ranking') renderRanking();
}

function closeNav() {
  $('#main-nav').classList.remove('open');
  $('.nav-toggle').setAttribute('aria-expanded', 'false');
}

$('.nav-toggle').addEventListener('click', e => {
  const open = $('#main-nav').classList.toggle('open');
  e.currentTarget.setAttribute('aria-expanded', String(open));
});

window.addEventListener('hashchange', route);

// ─── ESTADÍSTICAS ───
function updateStats() {
  $('#stat-denuncias').textContent = store.denuncias.length;
  $('#stat-empresas').textContent = store.empresas.length;
  $('#stat-votos').textContent = store.empresas.reduce((n, e) => n + e.votos.length, 0);
}

// ─── ASISTENTE DE DENUNCIA ───
const form = $('#form-denuncia');
let paso = 1;

function rolActual() {
  return form.rol.value;
}

function irAPaso(n) {
  paso = n;
  $$('.step', form).forEach(s => { s.hidden = Number(s.dataset.step) !== n; });
  $$('.progress li').forEach((li, i) => {
    li.classList.toggle('active', i + 1 === n);
    li.classList.toggle('done', i + 1 < n);
  });
  $('[data-prev]', form).hidden = n === 1;
  $('[data-next]', form).hidden = n === 4;
  $('[data-submit]', form).hidden = n !== 4;
  if (n === 4) renderResumen();
  $('#wizard').scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function validarPaso(n) {
  const step = $(`.step[data-step="${n}"]`, form);
  let ok = true;

  if (n === 1) {
    ok = Boolean(rolActual());
    $('[data-error="rol"]').hidden = ok;
    return ok;
  }
  if (n === 4) {
    ok = form.veracidad.checked;
    $('[data-error="veracidad"]').hidden = ok;
    return ok;
  }

  let primero = null;
  $$('input, select, textarea', step).forEach(el => {
    if (el.type === 'file') return;
    const valido = el.checkValidity();
    el.classList.toggle('invalid', !valido);
    if (!valido && !primero) primero = el;
  });
  if (primero) { primero.reportValidity(); primero.focus(); ok = false; }
  return ok;
}

function aplicarRol(rol) {
  fillSelect(form.tipo, TIPOS[rol] || []);
  $('label[for="f-empresa"]').textContent = rol === 'empleador' ? 'Nombre de tu empresa' : 'Empresa donde trabajas';
  form.empresa.placeholder = rol === 'empleador' ? 'Tu empresa, S.R.L.' : 'Ej: Empresa XYZ, S.R.L.';
}

form.addEventListener('change', e => {
  if (e.target.name === 'rol') { aplicarRol(e.target.value); $('[data-error="rol"]').hidden = true; }
  if (e.target.classList.contains('invalid') && e.target.checkValidity()) e.target.classList.remove('invalid');
});
form.addEventListener('input', e => {
  if (e.target.classList.contains('invalid') && e.target.checkValidity()) e.target.classList.remove('invalid');
});

$('[data-next]', form).addEventListener('click', () => { if (validarPaso(paso)) irAPaso(paso + 1); });
$('[data-prev]', form).addEventListener('click', () => irAPaso(paso - 1));

// Contador de caracteres
form.descripcion.addEventListener('input', () => {
  $('#desc-counter').textContent = `${form.descripcion.value.length} / 5000`;
});

// Archivos (solo se listan; la demo no los sube)
const fileInput = $('#f-archivos');
const dropzone = $('.dropzone');
fileInput.addEventListener('change', () => {
  const list = $('#file-list');
  list.innerHTML = '';
  [...fileInput.files].forEach(f => {
    const li = document.createElement('li');
    const name = document.createElement('span');
    const size = document.createElement('span');
    name.textContent = f.name;
    size.textContent = `${(f.size / 1024).toFixed(0)} KB`;
    li.append(name, size);
    list.append(li);
  });
});
['dragenter', 'dragover'].forEach(ev => dropzone.addEventListener(ev, () => dropzone.classList.add('drag')));
['dragleave', 'drop'].forEach(ev => dropzone.addEventListener(ev, () => dropzone.classList.remove('drag')));

function renderResumen() {
  const fecha = form.fecha.value
    ? new Date(form.fecha.value + '-02').toLocaleDateString('es-DO', { month: 'long', year: 'numeric' })
    : 'No indicada';
  const filas = [
    ['Perfil', rolActual() === 'empleador' ? 'Empleador' : 'Empleado'],
    ['Empresa', form.empresa.value],
    ['Sector', form.sector.value],
    ['Provincia', form.provincia.value],
    ['Situación', form.tipo.value],
    ['Fecha', fecha],
    ['¿Continúa?', form.continua.value],
    ['Descripción', form.descripcion.value],
    ['Archivos', fileInput.files.length ? `${fileInput.files.length} archivo(s)` : 'Ninguno']
  ];
  const dl = $('#summary');
  dl.innerHTML = '';
  filas.forEach(([k, v]) => {
    const dt = document.createElement('dt');
    const dd = document.createElement('dd');
    dt.textContent = k;
    dd.textContent = v;  // textContent nunca interpreta HTML
    dl.append(dt, dd);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validarPaso(4)) return;

  const codigo = generarCodigo();
  store.denuncias.push({
    codigo,
    rol: rolActual(),
    empresa: form.empresa.value.trim(),
    sector: form.sector.value,
    provincia: form.provincia.value,
    tipo: form.tipo.value,
    fecha: form.fecha.value,
    continua: form.continua.value,
    descripcion: form.descripcion.value.trim(),
    estado: 'recibida',
    creada: today(),
    mensajes: []
  });
  saveStore();
  updateStats();

  $('#wizard').closest('.wizard-layout').hidden = true;
  $('#codigo-generado').textContent = codigo;
  $('#ok-tipo').textContent = form.tipo.value;
  $('#ok-fecha').textContent = today();
  const ok = $('#denuncia-ok');
  ok.hidden = false;
  ok.focus();
  window.scrollTo(0, 0);
});

function reiniciarAsistente(rol) {
  form.reset();
  fileInput.dispatchEvent(new Event('change'));
  $('#desc-counter').textContent = '0 / 5000';
  $$('.invalid', form).forEach(el => el.classList.remove('invalid'));
  $$('.field-error', form).forEach(el => { el.hidden = true; });
  $('#denuncia-ok').hidden = true;
  $('#wizard').closest('.wizard-layout').hidden = false;
  fillSelect(form.tipo, []);
  if (rol) {
    form.rol.value = rol;
    aplicarRol(rol);
    irAPaso(2);
  } else {
    irAPaso(1);
  }
}

$('#btn-nueva').addEventListener('click', () => reiniciarAsistente());
$$('[data-start-role]').forEach(a => a.addEventListener('click', () => reiniciarAsistente(a.dataset.startRole)));

$('#btn-copiar').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText($('#codigo-generado').textContent);
    showToast('Número copiado.');
  } catch {
    showToast('No se pudo copiar. Anota el número a mano.', 'error');
  }
});

// "Ver mi caso" lleva a consultar con el código ya cargado.
$('#btn-ver-caso').addEventListener('click', () => {
  pendingCode = $('#codigo-generado').textContent;
});

// ─── CONSULTAR CASO ───
// El código nunca va en la URL: quedaría en el historial del navegador.
let pendingCode = null;

$$('[data-code-form]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault();
  const codigo = normalizarCodigo(f.codigo.value);
  if (location.hash !== '#consultar') {
    pendingCode = codigo;
    f.reset();
    location.hash = 'consultar';
  } else {
    buscarCaso(codigo);
  }
}));

window.addEventListener('hashchange', () => {
  if (location.hash === '#consultar' && pendingCode) {
    $('#consulta-code').value = pendingCode;
    buscarCaso(pendingCode);
    pendingCode = null;
  }
});

function buscarCaso(codigo) {
  const out = $('#consulta-resultado');
  const d = store.denuncias.find(x => x.codigo === codigo);

  if (!d) {
    out.innerHTML = `
      <div class="empty">
        <h3>No encontramos ese expediente</h3>
        <p>Revisa que el número esté bien escrito. En la demo solo funcionan los números creados en este navegador.</p>
      </div>`;
    return;
  }

  const idx = ESTADOS.findIndex(s => s.id === d.estado);
  out.innerHTML = `
    <article class="file-sheet">
      <header class="file-head">
        <div>
          <span class="file-code">EXPEDIENTE ${esc(d.codigo)}</span>
          <h2>${esc(d.tipo)}</h2>
        </div>
        <span class="state-pill ${d.estado === 'cerrada' ? 'ok' : ''}">${esc(ESTADOS[idx].titulo)}</span>
      </header>
      <div class="file-meta">
        <div><span class="t-label">Empresa</span><span>${esc(d.empresa)}</span></div>
        <div><span class="t-label">Provincia</span><span>${esc(d.provincia)}</span></div>
        <div><span class="t-label">Enviada</span><span>${esc(d.creada)}</span></div>
      </div>
      <ol class="timeline">
        ${ESTADOS.map((s, i) => `
          <li class="${i < idx ? 'done' : i === idx ? 'current' : 'pending'}">
            <strong>${s.titulo}</strong>
            <span>${i <= idx ? s.texto : 'Pendiente'}</span>
          </li>`).join('')}
      </ol>
      <div class="file-msgs">
        <strong>Mensajes del moderador</strong>
        <p>${d.mensajes.length ? '' : 'Todavía no hay mensajes. Vuelve a consultar en unos días.'}</p>
      </div>
    </article>`;
}

// ─── RANKING ───
let orden = 'mejor';

function starsHTML(a) {
  let html = `<span class="stars" aria-hidden="true">`;
  for (let i = 1; i <= 5; i++) html += `<span class="${a >= i - 0.25 ? 'on' : ''}">★</span>`;
  return html + '</span>';
}

// Histograma de 1 a 5 estrellas: cada barra es proporcional a la más alta.
function distHTML(votos) {
  const counts = [1, 2, 3, 4, 5].map(s => votos.filter(v => v === s).length);
  const max = Math.max(...counts, 1);
  return `
    <div class="b-dist" role="img" aria-label="Votos por estrellas: ${counts.map((n, i) => `${i + 1}★ ${n}`).join(', ')}">
      ${counts.map(n => `<span style="height:${Math.max((n / max) * 100, 6)}%"></span>`).join('')}
    </div>
    <div class="b-dist-cap" aria-hidden="true"><span>1★</span><span>5★</span></div>`;
}

function scoreClass(a) {
  return a >= 4 ? 'score-good' : a >= 3 ? 'score-mid' : 'score-bad';
}

function publicados(emp) {
  return emp.comentarios.filter(c => c.estado === 'aprobado');
}

const BOARD_HEAD = `
  <div class="board-head" aria-hidden="true">
    <span>Pos.</span><span>Empresa</span><span>Puntuación</span><span>Distribución</span><span></span>
  </div>`;

function renderRow(emp, rank) {
  const a = avg(emp.votos);
  const coms = publicados(emp);
  const last = coms[coms.length - 1];
  const n = emp.votos.length;
  return `
    <article class="board-row">
      <span class="b-pos">${rank}</span>
      <div class="b-main">
        <div class="b-name">${esc(emp.nombre)}</div>
        <div class="b-sector">${esc(emp.sector)}</div>
        ${last ? `<p class="b-quote">“${esc(last.texto)}”</p>` : ''}
      </div>
      <div class="b-score">
        <span class="score-num ${scoreClass(a)}">${a.toFixed(1)}</span>
        <div>
          ${starsHTML(a)}
          <div class="b-votes">${n} valoracion${n === 1 ? '' : 'es'}</div>
        </div>
      </div>
      <div class="b-distwrap">${distHTML(emp.votos)}</div>
      <div class="b-actions">
        <button class="btn btn-blue btn-sm" type="button" data-votar="${emp.id}">Valorar</button>
        ${coms.length ? `<button class="btn btn-line btn-sm" type="button" data-comentarios="${emp.id}">Comentarios (${coms.length})</button>` : ''}
      </div>
    </article>`;
}

function getSorted() {
  const q = $('#search-input').value.trim().toLowerCase();
  const sector = $('#filtro-sector').value;
  let list = store.empresas.filter(e =>
    (!q || e.nombre.toLowerCase().includes(q) || e.sector.toLowerCase().includes(q)) &&
    (!sector || e.sector === sector)
  );
  if (orden === 'peor') list.sort((a, b) => avg(a.votos) - avg(b.votos));
  else if (orden === 'votos') list.sort((a, b) => b.votos.length - a.votos.length);
  else list.sort((a, b) => avg(b.votos) - avg(a.votos));
  return list;
}

function renderRanking() {
  const list = getSorted();
  $('#ranking-grid').innerHTML = list.length
    ? BOARD_HEAD + list.map((e, i) => renderRow(e, i + 1)).join('')
    : `<div class="empty"><h3>Sin resultados</h3><p>Prueba con otra búsqueda o agrega la empresa.</p></div>`;
  updateStats();
}

function renderInicio() {
  const top = [...store.empresas].sort((a, b) => avg(b.votos) - avg(a.votos)).slice(0, 3);
  $('#inicio-ranking').innerHTML = BOARD_HEAD + top.map((e, i) => renderRow(e, i + 1)).join('');
  updateStats();
}

function refreshRankings() {
  if (!$('#view-ranking').hidden) renderRanking();
  if (!$('#view-inicio').hidden) renderInicio();
}

$('#search-input').addEventListener('input', renderRanking);
$('#filtro-sector').addEventListener('change', renderRanking);
$$('.segmented button').forEach(b => b.addEventListener('click', () => {
  orden = b.dataset.orden;
  $$('.segmented button').forEach(x => x.classList.toggle('active', x === b));
  renderRanking();
}));

// Botones dentro de las tarjetas (delegación de eventos)
document.addEventListener('click', e => {
  const votar = e.target.closest('[data-votar]');
  const coms = e.target.closest('[data-comentarios]');
  if (votar) abrirVotar(Number(votar.dataset.votar));
  if (coms) verComentarios(Number(coms.dataset.comentarios));
});

// ─── ESTRELLAS ───
function buildStarInput(container) {
  const name = `stars-${container.dataset.stars}`;
  container.setAttribute('role', 'radiogroup');
  container.innerHTML = '';
  for (let i = 1; i <= 5; i++) {
    const input = document.createElement('input');
    input.type = 'radio'; input.name = name; input.value = i; input.id = `${name}-${i}`;
    const label = document.createElement('label');
    label.htmlFor = input.id; label.textContent = '★'; label.title = STAR_LABELS[i];
    label.setAttribute('aria-label', `${i} estrella${i > 1 ? 's' : ''}: ${STAR_LABELS[i]}`);
    container.append(input, label);
  }
  const caption = document.createElement('span');
  caption.className = 'star-caption';
  container.append(caption);

  const paint = n => {
    $$('label', container).forEach((l, i) => l.classList.toggle('on', i < n));
    caption.textContent = n ? STAR_LABELS[n] : 'Elige de 1 a 5';
  };
  const selected = () => Number($('input:checked', container)?.value || 0);
  $$('label', container).forEach((l, i) => {
    l.addEventListener('mouseenter', () => paint(i + 1));
    l.addEventListener('mouseleave', () => paint(selected()));
  });
  container.addEventListener('change', () => paint(selected()));
  container.reset = () => { $$('input', container).forEach(x => { x.checked = false; }); paint(0); };
  container.value = selected;
  paint(0);
}

// ─── MODALES ───
let empresaVotandoId = null;

$$('[data-open]').forEach(b => b.addEventListener('click', () => {
  const dlg = document.getElementById(b.dataset.open);
  $('form:not(.modal-close-form)', dlg)?.reset();
  $('.star-input', dlg)?.reset();
  dlg.showModal();
}));
$$('[data-close]').forEach(b => b.addEventListener('click', () => b.closest('dialog').close()));
$$('dialog').forEach(d => d.addEventListener('click', e => { if (e.target === d) d.close(); }));

function abrirVotar(id) {
  empresaVotandoId = id;
  const emp = store.empresas.find(e => e.id === id);
  $('#votar-titulo').textContent = `Valorar ${emp.nombre}`;
  $('#form-votar').reset();
  $('[data-stars="votar"]').reset();
  $('#modal-votar').showModal();
}

function verComentarios(id) {
  const emp = store.empresas.find(e => e.id === id);
  $('#com-titulo').textContent = emp.nombre;
  $('#com-sector').textContent = emp.sector;
  $('#com-lista').innerHTML = publicados(emp).slice().reverse().map(c => `
    <div class="comment">
      <div class="comment-meta"><span>Anónimo</span><span>${esc(c.fecha)}</span></div>
      <p>${esc(c.texto)}</p>
    </div>`).join('');
  $('#modal-comentarios').showModal();
}

$('#form-proponer').addEventListener('submit', e => {
  e.preventDefault();
  const stars = $('[data-stars="prop"]').value();
  if (!stars) { showToast('Elige una valoración de 1 a 5 estrellas.', 'error'); return; }

  const nombre = $('#prop-nombre').value.trim();
  if (store.empresas.some(x => x.nombre.toLowerCase() === nombre.toLowerCase())) {
    showToast('Esa empresa ya está en el ranking. Búscala y valórala.', 'error');
    return;
  }
  const comentario = $('#prop-comentario').value.trim();
  store.empresas.push({
    id: Date.now(), nombre, sector: $('#prop-sector').value, votos: [stars],
    comentarios: comentario ? [{ texto: comentario, fecha: nowMonth(), estado: 'pendiente' }] : []
  });
  saveStore();
  $('#modal-proponer').close();
  showToast(comentario ? 'Empresa agregada. Tu comentario se publicará cuando sea aprobado.' : 'Empresa agregada al ranking.');
  refreshRankings();
});

$('#form-votar').addEventListener('submit', e => {
  e.preventDefault();
  const stars = $('[data-stars="votar"]').value();
  if (!stars) { showToast('Elige una valoración de 1 a 5 estrellas.', 'error'); return; }

  const emp = store.empresas.find(x => x.id === empresaVotandoId);
  const comentario = $('#votar-comentario').value.trim();
  emp.votos.push(stars);
  if (comentario) emp.comentarios.push({ texto: comentario, fecha: nowMonth(), estado: 'pendiente' });
  saveStore();
  $('#modal-votar').close();
  showToast(comentario ? 'Gracias. Tu comentario se publicará cuando sea aprobado.' : 'Gracias por tu valoración.');
  refreshRankings();
});

// ─── INICIO ───
$$('select[data-options]').forEach(s => {
  fillSelect(s, s.dataset.options === 'provincias' ? PROVINCIAS : SECTORES, s.dataset.placeholder);
});
fillSelect(form.tipo, []);
$$('.star-input').forEach(buildStarInput);
route();
