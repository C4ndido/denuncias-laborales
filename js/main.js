// Datos de ejemplo para las denuncias
const denunciasEjemplo = [
    {
        id: 1,
        titulo: "Acoso laboral en empresa de tecnología",
        tipo: "acoso",
        descripcion: "Situación de acoso laboral por parte de superiores...",
        fecha: "2024-03-15",
        reacciones: { positivas: 15, negativas: 2 },
        comentarios: 5,
        estado: "aprobada",
        moderador: "admin",
        fechaModeracion: "2024-03-15"
    },
    {
        id: 2,
        titulo: "Discriminación por edad en proceso de selección",
        tipo: "discriminacion",
        descripcion: "Experiencia de discriminación durante entrevista...",
        fecha: "2024-03-14",
        reacciones: { positivas: 23, negativas: 1 },
        comentarios: 8,
        estado: "aprobada",
        moderador: "admin",
        fechaModeracion: "2024-03-14"
    }
];

// Datos actualizados de las mejores empresas para trabajar en RD 2025
const empresasEjemplo = [
    {
        id: 1,
        nombre: "Empresa Hotelera A",
        sector: "servicios",
        logo: "img/placeholder-logo.png",
        rating: 4.9,
        votos: 1500,
        badges: ["Mejor ambiente laboral", "Beneficios premium", "Desarrollo internacional"],
        descripcion: "Empresa líder en el sector turístico",
        verificado: true,
        fuente: "Encuesta interna verificada"
    },
    {
        id: 2,
        nombre: "Club Vacacional B",
        sector: "servicios",
        logo: "img/placeholder-logo.png",
        rating: 4.8,
        votos: 1200,
        badges: ["Flexibilidad horaria", "Crecimiento profesional", "Equilibrio vida-trabajo"],
        descripcion: "Empresa líder en el sector vacacional",
        verificado: true,
        fuente: "Encuesta interna verificada"
    },
    {
        id: 3,
        nombre: "PedidosYa",
        sector: "tecnologia",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/PedidosYa_logo.svg/1200px-PedidosYa_logo.svg.png",
        rating: 4.7,
        votos: 1100,
        badges: ["Innovación", "Cultura dinámica", "Oportunidades de crecimiento"],
        descripcion: "Plataforma líder en delivery y tecnología"
    },
    {
        id: 4,
        nombre: "Casa de Campo Resort & Villas",
        sector: "servicios",
        logo: "https://via.placeholder.com/60",
        rating: 4.7,
        votos: 1000,
        badges: ["Excelente ambiente", "Beneficios exclusivos", "Desarrollo profesional"],
        descripcion: "Resort de lujo líder en el Caribe"
    },
    {
        id: 5,
        nombre: "CEVALDOM S.A.",
        sector: "manufactura",
        logo: "https://via.placeholder.com/60",
        rating: 4.6,
        votos: 950,
        badges: ["Estabilidad", "Crecimiento continuo", "Beneficios competitivos"],
        descripcion: "Empresa líder en la industria de la construcción"
    },
    {
        id: 6,
        nombre: "Banco Popular Dominicano",
        sector: "finanzas",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Popular_Dominicano_logo.svg/1200px-Banco_Popular_Dominicano_logo.svg.png",
        rating: 4.6,
        votos: 1300,
        badges: ["Estabilidad financiera", "Desarrollo profesional", "Beneficios bancarios"],
        descripcion: "Institución financiera líder en República Dominicana"
    },
    {
        id: 7,
        nombre: "Cervecería Nacional Dominicana",
        sector: "manufactura",
        logo: "https://via.placeholder.com/60",
        rating: 4.5,
        votos: 900,
        badges: ["Cultura corporativa", "Beneficios atractivos", "Desarrollo sostenible"],
        descripcion: "Empresa líder en la industria cervecera"
    },
    {
        id: 8,
        nombre: "Banco BHD",
        sector: "finanzas",
        logo: "https://via.placeholder.com/60",
        rating: 4.5,
        votos: 850,
        badges: ["Innovación financiera", "Crecimiento profesional", "Beneficios exclusivos"],
        descripcion: "Banco líder en innovación financiera"
    },
    {
        id: 9,
        nombre: "Nestlé Dominicana",
        sector: "manufactura",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Nestl%C3%A9_logo.svg/1200px-Nestl%C3%A9_logo.svg.png",
        rating: 4.4,
        votos: 800,
        badges: ["Desarrollo sostenible", "Cultura global", "Beneficios internacionales"],
        descripcion: "Empresa líder en nutrición y bienestar"
    },
    {
        id: 10,
        nombre: "Philip Morris Dominicana",
        sector: "manufactura",
        logo: "https://via.placeholder.com/60",
        rating: 4.4,
        votos: 750,
        badges: ["Innovación", "Desarrollo profesional", "Beneficios competitivos"],
        descripcion: "Empresa líder en transformación del sector"
    }
];

// Función para formatear la fecha
function formatearFecha(fecha) {
    return new Date(fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Función para crear una card de denuncia
function crearDenunciaCard(denuncia) {
    if (denuncia.estado !== 'aprobada') return '';
    
    return `
        <div class="col-md-6 col-lg-4">
            <div class="card denuncia-card mb-4">
                <div class="card-header d-flex justify-content-between align-items-center">
                    <span class="badge bg-${getBadgeColor(denuncia.tipo)}">${denuncia.tipo}</span>
                    <small class="text-white">${formatearFecha(denuncia.fecha)}</small>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${denuncia.titulo}</h5>
                    <p class="card-text">${denuncia.descripcion.substring(0, 100)}...</p>
                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <div class="reacciones">
                            <button class="reaction-btn" onclick="reaccionar(${denuncia.id}, 'positiva')">
                                <i class="fas fa-thumbs-up"></i> ${denuncia.reacciones.positivas}
                            </button>
                            <button class="reaction-btn" onclick="reaccionar(${denuncia.id}, 'negativa')">
                                <i class="fas fa-thumbs-down"></i> ${denuncia.reacciones.negativas}
                            </button>
                        </div>
                        <div class="comentarios">
                            <i class="fas fa-comments"></i> ${denuncia.comentarios}
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm w-100" onclick="verDenuncia(${denuncia.id})">
                        Ver Denuncia
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Función para obtener el color del badge según el tipo
function getBadgeColor(tipo) {
    const colores = {
        acoso: 'danger',
        discriminacion: 'warning',
        abuso: 'dark',
        salario: 'info',
        otros: 'secondary'
    };
    return colores[tipo] || 'primary';
}

// Función para manejar reacciones
function reaccionar(id, tipo) {
    const denuncia = denunciasEjemplo.find(d => d.id === id);
    if (denuncia) {
        denuncia.reacciones[tipo === 'positiva' ? 'positivas' : 'negativas']++;
        actualizarDenuncias();
    }
}

// Función para ver una denuncia (simulada)
function verDenuncia(id) {
    alert('Funcionalidad de ver denuncia en desarrollo');
}

// Función para actualizar el listado de denuncias
function actualizarDenuncias() {
    const container = document.getElementById('denuncias-container');
    container.innerHTML = denunciasEjemplo.map(denuncia => crearDenunciaCard(denuncia)).join('');
}

// Función debounce para optimizar búsquedas
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Sistema de búsqueda mejorado
const searchSystem = {
    filters: {
        searchTerm: '',
        type: 'todos',
        sector: 'todos',
        location: 'todos',
        date: 'todos'
    },
    
    init() {
        this.setupEventListeners();
        this.applyFilters();
    },
    
    setupEventListeners() {
        // Búsqueda con debounce
        const searchInput = document.getElementById('searchBox');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.filters.searchTerm = e.target.value.toLowerCase();
                this.applyFilters();
            }, 300));
        }

        // Filtros
        const filterInputs = document.querySelectorAll('.filter-control select');
        filterInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.filters[e.target.id.replace('filter', '').toLowerCase()] = e.target.value;
                this.applyFilters();
            });
        });

        // Botón de limpiar filtros
        const clearButton = document.getElementById('clearFilters');
        if (clearButton) {
            clearButton.addEventListener('click', () => {
                this.clearFilters();
            });
        }
    },
    
    applyFilters() {
        const denuncias = document.querySelectorAll('.denuncia-card');
        let visibleCount = 0;
        
        denuncias.forEach(denuncia => {
            const matches = this.matchesFilters(denuncia);
            denuncia.style.display = matches ? 'block' : 'none';
            if (matches) visibleCount++;
        });

        // Actualizar contador de resultados
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = `${visibleCount} denuncias encontradas`;
        }

        // Mostrar mensaje si no hay resultados
        const noResults = document.getElementById('noResults');
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    },
    
    matchesFilters(denuncia) {
        const titulo = denuncia.querySelector('.denuncia-titulo').textContent.toLowerCase();
        const descripcion = denuncia.querySelector('.denuncia-descripcion').textContent.toLowerCase();
        const tipo = denuncia.dataset.tipo;
        const sector = denuncia.dataset.sector;
        const ubicacion = denuncia.dataset.ubicacion;
        const fecha = denuncia.dataset.fecha;

        // Búsqueda en título y descripción
        if (this.filters.searchTerm && 
            !titulo.includes(this.filters.searchTerm) && 
            !descripcion.includes(this.filters.searchTerm)) {
            return false;
        }

        // Filtros específicos
        if (this.filters.type !== 'todos' && tipo !== this.filters.type) return false;
        if (this.filters.sector !== 'todos' && sector !== this.filters.sector) return false;
        if (this.filters.location !== 'todos' && ubicacion !== this.filters.location) return false;
        if (this.filters.date !== 'todos') {
            const fechaDenuncia = new Date(fecha);
            const ahora = new Date();
            
            switch(this.filters.date) {
                case 'hoy':
                    return fechaDenuncia.toDateString() === ahora.toDateString();
                case 'semana':
                    const unaSemana = new Date(ahora.setDate(ahora.getDate() - 7));
                    return fechaDenuncia >= unaSemana;
                case 'mes':
                    const unMes = new Date(ahora.setMonth(ahora.getMonth() - 1));
                    return fechaDenuncia >= unMes;
                case 'año':
                    const unAño = new Date(ahora.setFullYear(ahora.getFullYear() - 1));
                    return fechaDenuncia >= unAño;
            }
        }

        return true;
    },
    
    clearFilters() {
        // Limpiar búsqueda
        const searchInput = document.getElementById('searchBox');
        if (searchInput) {
            searchInput.value = '';
            this.filters.searchTerm = '';
        }

        // Resetear filtros
        const filterInputs = document.querySelectorAll('.filter-control select');
        filterInputs.forEach(input => {
            input.value = 'todos';
            this.filters[input.id.replace('filter', '').toLowerCase()] = 'todos';
        });

        // Aplicar cambios
        this.applyFilters();
    }
};

// Sistema de Notificaciones
const notificationSystem = {
    notifications: [],
    maxNotifications: 5,
    
    init() {
        this.setupWebSocket();
    },

    setupWebSocket() {
        // Simulación de WebSocket para notificaciones en tiempo real
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.showNotification({
                    type: 'success',
                    title: 'Nueva denuncia',
                    message: 'Se ha recibido una nueva denuncia laboral'
                });
            }
        }, 30000);
    },

    showNotification(notification) {
        const notificationElement = this.createNotificationElement(notification);
        const notificationsList = document.getElementById('notificationsList');
        if (!notificationsList) return;
        
        notificationsList.appendChild(notificationElement);
        this.notifications.push(notificationElement);

        if (this.notifications.length > this.maxNotifications) {
            const oldestNotification = this.notifications.shift();
            this.removeNotification(oldestNotification);
        }

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            this.removeNotification(notificationElement);
        }, 5000);
    },

    createNotificationElement(notification) {
        const element = document.createElement('div');
        element.className = `notification ${notification.type}`;
        
        const icon = this.getNotificationIcon(notification.type);
        
        element.innerHTML = `
            <div class="notification-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-message">${notification.message}</div>
            </div>
            <button class="notification-close" aria-label="Cerrar notificación">
                <i class="fas fa-times"></i>
            </button>
        `;

        element.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(element);
        });

        return element;
    },

    getNotificationIcon(type) {
        switch (type) {
            case 'success':
                return 'fa-check-circle';
            case 'error':
                return 'fa-exclamation-circle';
            case 'warning':
                return 'fa-exclamation-triangle';
            default:
                return 'fa-info-circle';
        }
    },

    removeNotification(element) {
        element.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            element.remove();
            this.notifications = this.notifications.filter(n => n !== element);
        }, 300);
    }
};

// Lazy Loading para imágenes
const lazyLoading = {
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            });

            document.querySelectorAll('.lazy-image').forEach(img => {
                this.observer.observe(img);
            });
        }
    },

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                this.observer.unobserve(img);
            }
        });
    }
};

// Inicialización de sistemas
document.addEventListener('DOMContentLoaded', () => {
    searchSystem.init();
    notificationSystem.init();
    lazyLoading.init();
    actualizarDenuncias();
    actualizarRanking();
    estadisticasModeracion.actualizar();
    notificaciones.actualizarContador();
});

// Función para crear una card de empresa
function crearEmpresaCard(empresa) {
    const card = document.createElement('div');
    card.className = 'empresa-card';
    card.innerHTML = `
        <div class="empresa-info">
            <img src="${empresa.logo}" alt="${empresa.nombre}" class="empresa-logo">
            <div class="empresa-details">
                <h3 class="empresa-nombre">
                    ${empresa.nombre}
                    ${empresa.verificado ? '<i class="fas fa-check-circle text-primary ms-2" title="Información verificada"></i>' : ''}
                </h3>
                <p class="empresa-sector">${empresa.sector}</p>
                <div class="empresa-badges">
                    ${empresa.badges.map(badge => `
                        <span class="empresa-badge">${badge}</span>
                    `).join('')}
                </div>
                <small class="text-muted d-block mt-2">Fuente: ${empresa.fuente}</small>
            </div>
        </div>
        <div class="empresa-stats">
            <div class="empresa-rating">
                <i class="fas fa-star"></i>
                <span>${empresa.rating.toFixed(1)}</span>
            </div>
            <button class="voto-btn" onclick="verificarVoto(${empresa.id})">
                <i class="fas fa-thumbs-up"></i>
                Votar
            </button>
        </div>
    `;
    return card;
}

// Función para verificar el voto
function verificarVoto(id) {
    const modal = new bootstrap.Modal(document.getElementById('verificacionVotoModal'));
    modal.show();
    
    // Guardar el ID de la empresa para el voto
    document.getElementById('verificacionVotoModal').dataset.empresaId = id;
}

// Manejo del formulario de verificación de voto
document.getElementById('verificacionVotoForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const empresaId = parseInt(document.getElementById('verificacionVotoModal').dataset.empresaId);
    const email = document.getElementById('votoEmail').value;
    const terminos = document.getElementById('votoTerminos').checked;
    
    if (!terminos) {
        alert('Debes aceptar los términos y condiciones para votar.');
        return;
    }
    
    // Aquí iría la lógica de verificación del email
    // Por ahora solo simulamos la verificación
    votarEmpresa(empresaId);
    
    // Cerrar el modal y limpiar el formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('verificacionVotoModal'));
    modal.hide();
    this.reset();
});

// Función para votar por una empresa (modificada)
function votarEmpresa(id) {
    const empresa = empresasEjemplo.find(e => e.id === id);
    if (empresa) {
        const votoBtn = document.querySelector(`.voto-btn[onclick="verificarVoto(${id})"]`);
        if (!votoBtn.classList.contains('votado')) {
            empresa.votos++;
            empresa.rating = ((empresa.rating * (empresa.votos - 1)) + 5) / empresa.votos;
            votoBtn.classList.add('votado');
            votoBtn.innerHTML = '<i class="fas fa-check"></i> Votado';
            actualizarRanking();
        }
    }
}

// Función para filtrar empresas
function filtrarEmpresas(sector) {
    const empresas = document.querySelectorAll('.empresa-card');
    empresas.forEach(empresa => {
        if (sector === 'all' || empresa.dataset.sector === sector) {
            empresa.style.display = 'flex';
        } else {
            empresa.style.display = 'none';
        }
    });
}

// Función para actualizar el ranking
function actualizarRanking() {
    const empresasOrdenadas = [...empresasEjemplo].sort((a, b) => b.rating - a.rating);
    
    // Actualizar top 3 empresas
    const top3Container = document.querySelector('.top-3-empresas');
    top3Container.innerHTML = '';
    
    empresasOrdenadas.slice(0, 3).forEach((empresa, index) => {
        const card = crearEmpresaCard(empresa);
        card.classList.add('top-' + (index + 1));
        top3Container.appendChild(card);
    });
    
    // Actualizar lista completa
    const rankingContainer = document.getElementById('empresas-ranking');
    rankingContainer.innerHTML = '';
    
    empresasOrdenadas.slice(3).forEach(empresa => {
        const card = crearEmpresaCard(empresa);
        rankingContainer.appendChild(card);
    });
}

// Inicializar filtros
document.querySelectorAll('.ranking-filters .btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelector('.ranking-filters .btn.active').classList.remove('active');
        this.classList.add('active');
        filtrarEmpresas(this.dataset.filter);
    });
});

// Manejo del formulario de nueva empresa
document.getElementById('nuevaEmpresaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los badges seleccionados
    const badges = [];
    document.querySelectorAll('#nuevaEmpresaForm .form-check-input:checked').forEach(checkbox => {
        badges.push(checkbox.value);
    });

    const nuevaEmpresa = {
        id: empresasEjemplo.length + 1,
        nombre: document.getElementById('empresaNombre').value,
        sector: document.getElementById('empresaSector').value,
        logo: document.getElementById('empresaLogo').value,
        rating: 5.0, // Rating inicial
        votos: 1, // Primer voto
        badges: badges,
        descripcion: document.getElementById('empresaDescripcion').value
    };

    empresasEjemplo.push(nuevaEmpresa);
    actualizarRanking();

    // Cerrar el modal y limpiar el formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('nuevaEmpresaModal'));
    modal.hide();
    this.reset();

    // Mostrar mensaje de confirmación
    alert('¡Empresa agregada exitosamente al ranking!');
});

// Sistema de notificaciones
const notificaciones = {
    pendientes: [],
    enviarNotificacion: function(denuncia, tipo) {
        const notificacion = {
            id: Date.now(),
            denunciaId: denuncia.id,
            tipo: tipo,
            fecha: new Date().toISOString(),
            leida: false
        };
        this.pendientes.push(notificacion);
        this.actualizarContador();
    },
    actualizarContador: function() {
        const contador = document.getElementById('notificacionesContador');
        if (contador) {
            const noLeidas = this.pendientes.filter(n => !n.leida).length;
            contador.textContent = noLeidas;
            contador.style.display = noLeidas > 0 ? 'block' : 'none';
        }
    }
};

// Estadísticas de moderación
const estadisticasModeracion = {
    totalDenuncias: 0,
    aprobadas: 0,
    rechazadas: 0,
    pendientes: 0,
    tiempoPromedioModeracion: 0,
    actualizar: function() {
        this.totalDenuncias = denunciasEjemplo.length;
        this.aprobadas = denunciasEjemplo.filter(d => d.estado === 'aprobada').length;
        this.rechazadas = denunciasEjemplo.filter(d => d.estado === 'rechazada').length;
        this.pendientes = denunciasEjemplo.filter(d => d.estado === 'pendiente').length;
        
        // Calcular tiempo promedio de moderación
        const denunciasModeradas = denunciasEjemplo.filter(d => d.fechaModeracion);
        if (denunciasModeradas.length > 0) {
            const tiempos = denunciasModeradas.map(d => {
                const fechaDenuncia = new Date(d.fecha);
                const fechaModeracion = new Date(d.fechaModeracion);
                return (fechaModeracion - fechaDenuncia) / (1000 * 60 * 60); // en horas
            });
            this.tiempoPromedioModeracion = tiempos.reduce((a, b) => a + b, 0) / tiempos.length;
        }
    }
};

// Función para moderar denuncias (modificada)
function moderarDenuncia(id, accion) {
    const denuncia = denunciasEjemplo.find(d => d.id === id);
    if (denuncia) {
        denuncia.estado = accion;
        denuncia.moderador = "admin";
        denuncia.fechaModeracion = new Date().toISOString().split('T')[0];
        
        // Enviar notificación
        notificaciones.enviarNotificacion(denuncia, accion);
        
        // Actualizar estadísticas
        estadisticasModeracion.actualizar();
        
        actualizarDenuncias();
        actualizarPanelModeracion();
        actualizarEstadisticas();
    }
}

// Función para actualizar el panel de moderación (modificada)
function actualizarPanelModeracion() {
    const panelModeracion = document.getElementById('panelModeracion');
    if (!panelModeracion) return;

    const denunciasPendientes = denunciasEjemplo.filter(d => d.estado === 'pendiente');
    const denunciasAprobadas = denunciasEjemplo.filter(d => d.estado === 'aprobada');
    const denunciasRechazadas = denunciasEjemplo.filter(d => d.estado === 'rechazada');

    panelModeracion.innerHTML = `
        <div class="row mb-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Estadísticas de Moderación</h5>
                        <div class="row text-center">
                            <div class="col-md-3">
                                <div class="stat-card bg-primary text-white">
                                    <h3>${estadisticasModeracion.totalDenuncias}</h3>
                                    <p>Total Denuncias</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card bg-success text-white">
                                    <h3>${estadisticasModeracion.aprobadas}</h3>
                                    <p>Aprobadas</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card bg-danger text-white">
                                    <h3>${estadisticasModeracion.rechazadas}</h3>
                                    <p>Rechazadas</p>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="stat-card bg-warning text-white">
                                    <h3>${estadisticasModeracion.pendientes}</h3>
                                    <p>Pendientes</p>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-12 text-center">
                                <p class="mb-0">
                                    <i class="fas fa-clock me-2"></i>
                                    Tiempo promedio de moderación: ${estadisticasModeracion.tiempoPromedioModeracion.toFixed(1)} horas
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-warning text-white">
                        <h5 class="mb-0">Pendientes (${denunciasPendientes.length})</h5>
                    </div>
                    <div class="card-body">
                        ${denunciasPendientes.map(denuncia => `
                            <div class="denuncia-moderacion mb-3">
                                <h6>${denuncia.titulo}</h6>
                                <p class="small">${denuncia.descripcion.substring(0, 100)}...</p>
                                <div class="denuncia-meta">
                                    <small class="text-muted">
                                        <i class="fas fa-clock me-1"></i>
                                        ${formatearFecha(denuncia.fecha)}
                                    </small>
                                </div>
                                <div class="btn-group mt-2">
                                    <button class="btn btn-success btn-sm" onclick="moderarDenuncia(${denuncia.id}, 'aprobada')">
                                        <i class="fas fa-check"></i> Aprobar
                                    </button>
                                    <button class="btn btn-danger btn-sm" onclick="moderarDenuncia(${denuncia.id}, 'rechazada')">
                                        <i class="fas fa-times"></i> Rechazar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-success text-white">
                        <h5 class="mb-0">Aprobadas (${denunciasAprobadas.length})</h5>
                    </div>
                    <div class="card-body">
                        ${denunciasAprobadas.map(denuncia => `
                            <div class="denuncia-moderacion mb-3">
                                <h6>${denuncia.titulo}</h6>
                                <p class="small">Moderado por: ${denuncia.moderador}</p>
                                <p class="small">
                                    <i class="fas fa-calendar me-1"></i>
                                    ${formatearFecha(denuncia.fechaModeracion)}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header bg-danger text-white">
                        <h5 class="mb-0">Rechazadas (${denunciasRechazadas.length})</h5>
                    </div>
                    <div class="card-body">
                        ${denunciasRechazadas.map(denuncia => `
                            <div class="denuncia-moderacion mb-3">
                                <h6>${denuncia.titulo}</h6>
                                <p class="small">Moderado por: ${denuncia.moderador}</p>
                                <p class="small">
                                    <i class="fas fa-calendar me-1"></i>
                                    ${formatearFecha(denuncia.fechaModeracion)}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Función para actualizar estadísticas
function actualizarEstadisticas() {
    estadisticasModeracion.actualizar();
    actualizarPanelModeracion();
}

// Sistema de Rate Limiting
const rateLimiter = {
    denuncias: new Map(),
    votos: new Map(),
    tiempoLimite: 3600000, // 1 hora en milisegundos
    maxDenuncias: 3,
    maxVotos: 5,

    puedeEnviarDenuncia(ip) {
        const ahora = Date.now();
        const denuncias = this.denuncias.get(ip) || [];
        const denunciasRecientes = denuncias.filter(tiempo => ahora - tiempo < this.tiempoLimite);
        
        if (denunciasRecientes.length >= this.maxDenuncias) {
            return false;
        }
        
        denunciasRecientes.push(ahora);
        this.denuncias.set(ip, denunciasRecientes);
        return true;
    },

    puedeVotar(ip) {
        const ahora = Date.now();
        const votos = this.votos.get(ip) || [];
        const votosRecientes = votos.filter(tiempo => ahora - tiempo < this.tiempoLimite);
        
        if (votosRecientes.length >= this.maxVotos) {
            return false;
        }
        
        votosRecientes.push(ahora);
        this.votos.set(ip, votosRecientes);
        return true;
    }
};

// Función mejorada para validar denuncias
function validarDenuncia(denuncia) {
    const errores = [];

    // Validar título
    if (!denuncia.titulo || denuncia.titulo.length < 5) {
        errores.push('El título debe tener al menos 5 caracteres');
    } else if (denuncia.titulo.length > 100) {
        errores.push('El título no puede exceder los 100 caracteres');
    }

    // Validar descripción
    if (!denuncia.descripcion || denuncia.descripcion.length < 20) {
        errores.push('La descripción debe tener al menos 20 caracteres');
    } else if (denuncia.descripcion.length > 1000) {
        errores.push('La descripción no puede exceder los 1000 caracteres');
    }

    // Validar tipo
    if (!denuncia.tipo) {
        errores.push('Debe seleccionar un tipo de denuncia');
    }

    // Validar ubicación
    if (!denuncia.ubicacion) {
        errores.push('Debe seleccionar una ubicación');
    }

    // Validar sector
    if (!denuncia.sector) {
        errores.push('Debe seleccionar un sector');
    }

    // Validar contenido inapropiado
    const palabrasProhibidas = ['insulto', 'palabra1', 'palabra2']; // Agregar palabras prohibidas
    const textoCompleto = `${denuncia.titulo} ${denuncia.descripcion}`.toLowerCase();
    
    if (palabrasProhibidas.some(palabra => textoCompleto.includes(palabra))) {
        errores.push('El contenido contiene palabras inapropiadas');
    }

    if (errores.length > 0) {
        throw new Error(errores.join('\n'));
    }

    return true;
}

// Función mejorada para sanitizar texto
function sanitizarTexto(texto) {
    if (!texto) return '';
    
    return texto
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
        .replace(/javascript:/gi, '')
        .replace(/on\w+=/gi, '')
        .trim();
}

// Función para guardar una denuncia en Firebase
async function guardarDenuncia(denuncia) {
    try {
        // Subir archivo si existe
        let archivoUrl = null;
        const archivo = document.getElementById('archivo').files[0];
        if (archivo) {
            const storageRef = storage.ref();
            const archivoRef = storageRef.child(`denuncias/${Date.now()}_${archivo.name}`);
            await archivoRef.put(archivo);
            archivoUrl = await archivoRef.getDownloadURL();
        }

        // Agregar URL del archivo a la denuncia
        denuncia.archivoUrl = archivoUrl;
        denuncia.fecha = firebase.firestore.FieldValue.serverTimestamp();

        // Guardar en Firestore
        const docRef = await db.collection('denuncias').add(denuncia);
        return docRef.id;
    } catch (error) {
        console.error('Error al guardar la denuncia:', error);
        throw error;
    }
}

// Función para cargar denuncias desde Firebase
async function cargarDenuncias() {
    try {
        const snapshot = await db.collection('denuncias')
            .where('estado', '==', 'aprobada')
            .orderBy('fecha', 'desc')
            .limit(10)
            .get();

        const denuncias = [];
        snapshot.forEach(doc => {
            denuncias.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return denuncias;
    } catch (error) {
        console.error('Error al cargar denuncias:', error);
        return [];
    }
}

// Modificar el manejo del formulario de denuncias
document.addEventListener('DOMContentLoaded', function() {
    const denunciaForm = document.getElementById('denunciaForm');
    if (denunciaForm) {
        denunciaForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            try {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                const tipoUsuario = document.querySelector('input[name="tipoUsuario"]:checked')?.value;
                if (!tipoUsuario) {
                    throw new Error('Debes seleccionar un tipo de usuario');
                }

                const nuevaDenuncia = {
                    tipoUsuario: tipoUsuario,
                    titulo: sanitizarTexto(document.getElementById('titulo').value),
                    tipo: document.getElementById('tipo').value,
                    descripcion: sanitizarTexto(document.getElementById('descripcion').value),
                    ubicacion: sanitizarTexto(document.getElementById('ubicacion').value),
                    sector: document.getElementById('sector').value,
                    reacciones: { positivas: 0, negativas: 0 },
                    comentarios: 0,
                    estado: "pendiente",
                    moderador: null,
                    fechaModeracion: null
                };

                // Validar datos
                validarDenuncia(nuevaDenuncia);

                // Validar términos
                if (!document.getElementById('terminos').checked) {
                    throw new Error('Debes aceptar los términos y condiciones');
                }

                // Guardar en Firebase
                await guardarDenuncia(nuevaDenuncia);

                // Cerrar modal y limpiar formulario
                const modal = bootstrap.Modal.getInstance(document.getElementById('denunciaModal'));
                if (modal) {
                    modal.hide();
                }
                this.reset();

                // Mostrar notificación de éxito
                notificationSystem.showNotification({
                    type: 'success',
                    title: 'Denuncia Enviada',
                    message: 'Tu denuncia ha sido enviada y está pendiente de moderación'
                });

            } catch (error) {
                notificationSystem.showNotification({
                    type: 'error',
                    title: 'Error',
                    message: error.message
                });
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        });
    }

    // Cargar denuncias iniciales
    cargarDenuncias().then(denuncias => {
        denunciasEjemplo.length = 0;
        denunciasEjemplo.push(...denuncias);
        actualizarDenuncias();
    });
});

// Función para actualizar el formulario según el tipo de usuario
document.querySelectorAll('input[name="tipoUsuario"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const tipoUsuario = this.value;
        const form = document.getElementById('denunciaForm');
        
        // Actualizar placeholders y textos según el tipo de usuario
        if (tipoUsuario === 'empresa') {
            document.getElementById('titulo').placeholder = 'Ej: Situación irregular en el departamento de recursos humanos';
            document.getElementById('descripcion').placeholder = 'Describe la situación de manera detallada. Como empresa, puedes reportar situaciones que afecten a tu organización o empleados.';
        } else {
            document.getElementById('titulo').placeholder = 'Ej: Situación de acoso laboral en el departamento de ventas';
            document.getElementById('descripcion').placeholder = 'Describe la situación de manera detallada. Recuerda no incluir nombres específicos de personas o empresas.';
        }
    });
});

// Función mejorada para manejar votos
async function manejarVoto(denunciaId, tipoVoto) {
    try {
        // Simular IP del usuario (en producción esto vendría del servidor)
        const userIP = '127.0.0.1';
        
        if (!rateLimiter.puedeVotar(userIP)) {
            throw new Error('Has alcanzado el límite de votos por hora. Por favor, intenta más tarde.');
        }

        const denuncia = denunciasEjemplo.find(d => d.id === denunciaId);
        if (!denuncia) {
            throw new Error('Denuncia no encontrada');
        }

        // Simular verificación de usuario
        const usuarioHaVotado = localStorage.getItem(`voto_${denunciaId}`);
        if (usuarioHaVotado) {
            throw new Error('Ya has votado en esta denuncia');
        }

        // Simular envío al servidor
        await new Promise(resolve => setTimeout(resolve, 500));

        // Actualizar votos
        denuncia.reacciones[tipoVoto]++;
        
        // Guardar voto en localStorage
        localStorage.setItem(`voto_${denunciaId}`, tipoVoto);
        
        // Actualizar UI
        actualizarDenuncias();
        
        // Mostrar notificación
        notificationSystem.showNotification({
            type: 'success',
            title: 'Voto Registrado',
            message: 'Tu voto ha sido registrado correctamente'
        });

    } catch (error) {
        notificationSystem.showNotification({
            type: 'error',
            title: 'Error',
            message: error.message
        });
    }
} 