// ─── DATA ───
const store = {
  denuncias: [],
  empresas: [
    {
      id: 1, nombre: "Banco Central de Servicios", sector: "Banca y Finanzas",
      votos: [5,4,4,3,5,4],
      comentarios: [
        { texto: "Buen ambiente, pero los ascensos son muy lentos.", fecha: "Ene 2025" },
        { texto: "Los beneficios son buenos. La gerencia media puede mejorar.", fecha: "Feb 2025" }
      ]
    },
    {
      id: 2, nombre: "Constructora del Este", sector: "Construcción",
      votos: [2,1,2,1,3],
      comentarios: [
        { texto: "No pagan horas extras. Piden mucho y dan poco.", fecha: "Mar 2025" }
      ]
    },
    {
      id: 3, nombre: "TechRD Solutions", sector: "Tecnología",
      votos: [5,5,4,5,5,4,5],
      comentarios: [
        { texto: "Excelente empresa para crecer profesionalmente.", fecha: "Dic 2024" },
        { texto: "Trabajo remoto y horarios flexibles. Muy recomendada.", fecha: "Ene 2025" }
      ]
    },
    {
      id: 4, nombre: "Hotel Caribe & Resort", sector: "Turismo y Hotelería",
      votos: [3,3,2,4,3],
      comentarios: [
        { texto: "Temporada alta es agotadora, pero las propinas ayudan.", fecha: "Feb 2025" }
      ]
    }
  ]
};

let filtroActual = 'todos';
let empresaVotandoId = null;

// ─── NAV ───
function showSection(sec) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById('section-' + sec).classList.add('active');
  const map = { inicio: 0, denuncia: 1, ranking: 2 };
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('nav button')[map[sec]].classList.add('active');
  if (sec === 'ranking') renderRanking();
  if (sec === 'inicio') renderInicioRanking();
}

// ─── TABS ───
function switchTab(tab, btn) {
  document.querySelectorAll('.form-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-empleado').style.display = tab === 'empleado' ? 'block' : 'none';
  document.getElementById('tab-empresa-den').style.display = tab === 'empresa-den' ? 'block' : 'none';
}

// ─── STARS ───
const starLabels = ['', 'Muy mala', 'Mala', 'Regular', 'Buena', 'Excelente'];

function initStarInputs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const stars = container.querySelectorAll('.star-input');
  const labelId = containerId === 'prop-stars' ? 'prop-stars-label' : 'votar-stars-label';

  stars.forEach(star => {
    star.addEventListener('mouseenter', () => {
      const val = parseInt(star.dataset.val);
      stars.forEach(s => s.classList.toggle('hovered', parseInt(s.dataset.val) <= val));
      document.getElementById(labelId).textContent = starLabels[val] + ' (' + val + '/5)';
    });
    star.addEventListener('mouseleave', () => {
      const sel = parseInt(container.dataset.selected);
      stars.forEach(s => { s.classList.remove('hovered'); s.classList.toggle('selected', parseInt(s.dataset.val) <= sel); });
      document.getElementById(labelId).textContent = sel > 0 ? starLabels[sel] + ' (' + sel + '/5)' : 'Selecciona una calificación';
    });
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.val);
      container.dataset.selected = val;
      stars.forEach(s => { s.classList.toggle('selected', parseInt(s.dataset.val) <= val); s.classList.remove('hovered'); });
      document.getElementById(labelId).textContent = starLabels[val] + ' (' + val + '/5)';
    });
  });
}

// ─── HELPERS ───
function avg(votos) {
  return votos.length ? votos.reduce((a,b) => a+b,0) / votos.length : 0;
}

function renderStars(average, count) {
  let html = '<div class="stars-display">';
  for (let i = 1; i <= 5; i++) {
    html += `<span class="star ${average >= i ? 'filled' : ''}">★</span>`;
  }
  html += `</div>`;
  return html;
}

function scoreColor(a) {
  if (a >= 4) return '#16a34a';
  if (a >= 3) return '#ca8a04';
  return '#dc2626';
}

function nowDate() {
  return new Date().toLocaleDateString('es-RD', { month: 'short', year: 'numeric' });
}

// ─── CARD ───
function renderCard(emp, rank) {
  const a = avg(emp.votos);
  const last = emp.comentarios.length > 0 ? emp.comentarios[emp.comentarios.length - 1] : null;
  return `
    <div class="empresa-card">
      <div class="empresa-rank">#${rank}</div>
      <div class="empresa-header">
        <div class="empresa-title-group">
          <div class="empresa-name">${emp.nombre}</div>
          <div class="empresa-sector">${emp.sector}</div>
        </div>
      </div>
      <div class="rating-block">
        <div class="score-badge">${a.toFixed(1)}</div>
        <div class="star-rating">${renderStars(a, emp.votos.length)}</div>
        <span class="votos-text">${emp.votos.length} voto${emp.votos.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="empresa-stats">
        <div class="empresa-stat">
          <span class="empresa-stat-num">${emp.votos.length}</span>
          <span class="empresa-stat-label">Total Votos</span>
        </div>
        <div class="empresa-stat">
          <span class="empresa-stat-num">${emp.comentarios.length}</span>
          <span class="empresa-stat-label">Opiniones</span>
        </div>
      </div>
      ${last ? `<div class="empresa-comentario-preview">"${last.texto}"</div>` : ''}
      <div class="empresa-actions">
        <button class="btn-primary" style="width:auto;flex:1;flex-shrink:0;" onclick="abrirVotar(${emp.id})">Calificar</button>
        ${emp.comentarios.length > 0 ? `<button class="btn-secondary" style="width:auto;flex:1;flex-shrink:0;" onclick="verComentarios(${emp.id})">Comentarios</button>` : ''}
      </div>
    </div>`;
}

// ─── RENDER ───
function getSorted() {
  let list = [...store.empresas];
  const q = (document.getElementById('search-input')?.value || '').toLowerCase();
  if (q) list = list.filter(e => e.nombre.toLowerCase().includes(q) || e.sector.toLowerCase().includes(q));
  if (filtroActual === 'mejor') list.sort((a,b) => avg(b.votos) - avg(a.votos));
  else if (filtroActual === 'peor') list.sort((a,b) => avg(a.votos) - avg(b.votos));
  else if (filtroActual === 'mas-votadas') list.sort((a,b) => b.votos.length - a.votos.length);
  else list.sort((a,b) => avg(b.votos) - avg(a.votos));
  return list;
}

function renderRanking() {
  const grid = document.getElementById('ranking-grid');
  const list = getSorted();
  grid.innerHTML = list.length
    ? list.map((e,i) => renderCard(e, i+1)).join('')
    : `<div class="empty-state"><div class="empty-icon">🔍</div><h3>Sin resultados</h3><p>Intenta con otro término.</p></div>`;
  updateStats();
}

function renderInicioRanking() {
  const grid = document.getElementById('inicio-ranking');
  const list = [...store.empresas].sort((a,b) => avg(b.votos) - avg(a.votos)).slice(0, 3);
  grid.innerHTML = list.map((e,i) => renderCard(e, i+1)).join('');
  updateStats();
}

function filtrarEmpresas() { renderRanking(); }

function setFiltro(f, btn) {
  filtroActual = f;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderRanking();
}

// ─── STATS ───
function updateStats() {
  const totalVotos = store.empresas.reduce((a,e) => a + e.votos.length, 0);
  setCount('stat-denuncias', store.denuncias.length);
  setCount('stat-empresas', store.empresas.length);
  setCount('stat-votos', totalVotos);
}

function setCount(id, val) {
  document.getElementById(id).textContent = val;
}

// ─── MODALS ───
function abrirProponerEmpresa() {
  document.getElementById('modal-proponer').classList.add('open');
  setTimeout(() => initStarInputs('prop-stars'), 50);
}

function abrirVotar(id) {
  empresaVotandoId = id;
  const emp = store.empresas.find(e => e.id === id);
  document.getElementById('votar-empresa-nombre').textContent = emp.nombre;
  document.getElementById('votar-stars').dataset.selected = 0;
  document.querySelectorAll('#votar-stars .star-input').forEach(s => s.classList.remove('selected','hovered'));
  document.getElementById('votar-stars-label').textContent = 'Selecciona una calificación';
  document.getElementById('votar-comentario').value = '';
  document.getElementById('modal-votar').classList.add('open');
  setTimeout(() => initStarInputs('votar-stars'), 50);
}

function verComentarios(id) {
  const emp = store.empresas.find(e => e.id === id);
  document.getElementById('com-empresa-nombre').textContent = emp.nombre;
  document.getElementById('com-empresa-sector').textContent = emp.sector;
  const lista = document.getElementById('comentarios-lista');
  lista.innerHTML = emp.comentarios.length
    ? emp.comentarios.map(c => `
        <div class="comentario-item">
          <div class="comentario-header">
            <span class="comentario-anon">👤 Empleado anónimo</span>
            <span class="comentario-fecha">${c.fecha}</span>
          </div>
          <div class="comentario-text">${c.texto}</div>
        </div>`).join('')
    : '<p style="color:var(--gray);text-align:center;padding:20px 0;">Sin comentarios aún.</p>';
  document.getElementById('modal-comentarios').classList.add('open');
}

function cerrarModal(id) {
  document.getElementById(id).classList.remove('open');
}

document.querySelectorAll('.modal-overlay').forEach(o => {
  o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
});

// ─── ACTIONS ───
function proponerEmpresa(e) {
  e.preventDefault();
  const nombre = document.getElementById('prop-nombre').value.trim();
  const sector = document.getElementById('prop-sector').value;
  const stars = parseInt(document.getElementById('prop-stars').dataset.selected);
  const comentario = document.getElementById('prop-comentario').value.trim();

  if (!stars) { showToast('Por favor selecciona una calificación.', 'error'); return; }

  store.empresas.push({
    id: Date.now(), nombre, sector,
    votos: [stars],
    comentarios: comentario ? [{ texto: comentario, fecha: nowDate() }] : []
  });

  cerrarModal('modal-proponer');
  document.getElementById('prop-nombre').value = '';
  document.getElementById('prop-sector').value = '';
  document.getElementById('prop-comentario').value = '';
  document.getElementById('prop-stars').dataset.selected = 0;
  document.querySelectorAll('#prop-stars .star-input').forEach(s => s.classList.remove('selected'));
  document.getElementById('prop-stars-label').textContent = 'Selecciona una calificación';

  showToast('✅ Empresa propuesta al ranking exitosamente.', 'success');
  renderRanking();
  renderInicioRanking();
}

function submitVoto(e) {
  e.preventDefault();
  const stars = parseInt(document.getElementById('votar-stars').dataset.selected);
  const comentario = document.getElementById('votar-comentario').value.trim();
  if (!stars) { showToast('Por favor selecciona una calificación.', 'error'); return; }

  const emp = store.empresas.find(e => e.id === empresaVotandoId);
  emp.votos.push(stars);
  if (comentario) emp.comentarios.push({ texto: comentario, fecha: nowDate() });

  cerrarModal('modal-votar');
  showToast('⭐ Calificación enviada. ¡Gracias por tu aporte!', 'success');
  renderRanking();
  renderInicioRanking();
}

function enviarDenuncia(e) {
  e.preventDefault();
  store.denuncias.push({ fecha: new Date() });
  showToast('📋 Denuncia enviada de forma anónima. ¡Gracias por tu valentía!', 'success');
  document.getElementById('form-denuncia').reset();
  updateStats();
}

// ─── TOAST ───
function showToast(msg, type = '') {
  const c = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

// ─── INIT ───
renderInicioRanking();