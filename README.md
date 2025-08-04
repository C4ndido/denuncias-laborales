# Crónica Empresarial - Plataforma de Denuncias Laborales

> **Una plataforma moderna y segura para denunciar situaciones laborales injustas de forma anónima en República Dominicana.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

## Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías-utilizadas)
- [Instalación](#-instalación)
- [Configuración](#-configuración-de-firebase)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

## Características

### Seguridad y Privacidad
- **Denuncias 100% anónimas** - Tu identidad está completamente protegida
- **Encriptación de datos** - Toda la información está segura
- **Sin registro requerido** - Denuncia sin crear cuentas

### Funcionalidades Principales
- **Formularios duales** - Para empleados y empresas
- **Ranking de empresas** - Sistema de votación y calificación
- **Búsqueda avanzada** - Filtros por sector, ubicación, fecha
- **Diseño responsivo** - Funciona en todos los dispositivos
- **Notificaciones en tiempo real** - Actualizaciones instantáneas
- **Panel de moderación** - Control de calidad de contenido

### Experiencia de Usuario
- **Diseño moderno** - Interfaz atractiva y fácil de usar
- **Carga rápida** - Optimizado para rendimiento
- **Accesibilidad** - Cumple con estándares WCAG
- **Estadísticas** - Análisis de tendencias laborales

## Tecnologías Utilizadas

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript ES6+** - Lógica interactiva
- **Bootstrap 5** - Framework CSS responsivo
- **Font Awesome** - Iconografía

### Backend
- **Firebase Authentication** - Gestión de usuarios (opcional)
- **Cloud Firestore** - Base de datos NoSQL
- **Firebase Storage** - Almacenamiento de archivos
- **Firebase Hosting** - Hosting web

### Herramientas de Desarrollo
- **Git** - Control de versiones
- **GitHub** - Repositorio y colaboración
- **VS Code** - Editor recomendado

## Instalación

### Prerrequisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Conexión a internet
- Cuenta de Firebase (para configuración completa)

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/C4ndido/denuncias-laborales.git
   cd denuncias-laborales
   ```

2. **Abre el proyecto**
   ```bash
   # Opción 1: Abrir directamente
   open index.html
   
   # Opción 2: Usar un servidor local (recomendado)
   python -m http.server 8000
   # Luego visita http://localhost:8000
   ```

3. **¡Listo!** 🎉
   La aplicación debería estar funcionando en tu navegador.

## Configuración de Firebase

### 1. Crear Proyecto Firebase
1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Crear un proyecto"
3. Sigue el asistente de configuración

### 2. Configurar Servicios
```javascript
// Habilita estos servicios en Firebase Console:
- Authentication (opcional)
- Cloud Firestore
- Storage
- Hosting (opcional)
```

### 3. Obtener Credenciales
1. Ve a Configuración del proyecto > General
2. En "Tus aplicaciones" > "SDK setup and configuration"
3. Copia la configuración

### 4. Configurar Credenciales
Edita `js/firebase-config.js`:

```javascript
// js/firebase-config.js
const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "tu-app-id"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
```

## Uso

### Para Empleados
1. **Accede** a la plataforma
2. **Haz clic** en "Denuncia como Empleado"
3. **Completa** el formulario con los detalles
4. **Envía** tu denuncia de forma anónima

### Para Empresas
1. **Accede** a la plataforma
2. **Haz clic** en "Denuncia como Empresa"
3. **Proporciona** información de tu empresa
4. **Describe** la situación a reportar

### Funcionalidades Adicionales
- **Buscar denuncias** usando los filtros
- **Votar por empresas** en el ranking
- **Ver estadísticas** de denuncias
- **Compartir** en redes sociales

## Estructura del Proyecto

```bash
denuncias-laborales/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   ├── main.js             # Lógica principal
│   └── firebase-config.js  # Configuración Firebase
├── README.md               # Documentación
├── .gitignore              # Archivos ignorados por Git
└── LICENSE                 # Licencia MIT
```

### Archivos Principales

- **`index.html`** - Estructura HTML principal con componentes Bootstrap
- **`css/styles.css`** - Estilos CSS personalizados con variables modernas
- **`js/main.js`** - Funcionalidad JavaScript para interacciones
- **`js/firebase-config.js`** - Configuración y conexión con Firebase

## Contribuir

¡Las contribuciones son bienvenidas! Aquí te explicamos cómo puedes ayudar:

### Reportar Bugs
1. Busca si el issue ya existe
2. Crea un nuevo issue con detalles
3. Incluye pasos para reproducir el problema

### Sugerir Mejoras
1. Abre un issue con la etiqueta "enhancement"
2. Describe la funcionalidad propuesta
3. Explica por qué sería útil

### Contribuir Código
1. **Fork** el repositorio
2. **Crea** una rama para tu feature
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realiza** tus cambios
4. **Commit** con mensajes descriptivos
   ```bash
   git commit -m "feat: añadir nueva funcionalidad X"
   ```
5. **Push** a tu rama
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
6. **Abre** un Pull Request

### Guías de Contribución
- Sigue las convenciones de código existentes
- Añade comentarios para código complejo
- Prueba tus cambios antes de enviar
- Actualiza la documentación si es necesario

## Personalización

### Colores y Temas
Edita las variables CSS en `css/styles.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #ff6b6b;
  /* Personaliza más colores... */
}
```

### Agregar Nuevas Funcionalidades
1. Modifica `index.html` para la estructura
2. Añade estilos en `css/styles.css`
3. Implementa lógica en `js/main.js`
4. Actualiza Firebase rules si es necesario

## Despliegue

### Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar proyecto
firebase init hosting

# Desplegar
firebase deploy
```

### Otros Servicios
- **Netlify** - Drag & drop o conecta con GitHub
- **Vercel** - Importa desde GitHub
- **GitHub Pages** - Habilita en configuración del repo

## Roadmap

### Próximas Funcionalidades
- [ ] Sistema de autenticación opcional
- [ ] API REST para integraciones
- [ ] Dashboard de analytics
- [ ] Notificaciones push
- [ ] Modo offline
- [ ] Exportar reportes PDF
- [ ] Integración con redes sociales
- [ ] Chatbot de ayuda

### Mejoras Planificadas
- [ ] Tests automatizados
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
- [ ] Tema oscuro/claro
- [ ] Optimización SEO

## Licencia

Este proyecto está bajo la **Licencia MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

```bash
MIT License

Copyright (c) 2025 Crónica Empresarial

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

## Contacto

### Desarrollador
- **GitHub**: [@C4ndido](https://github.com/C4ndido)
- **Email**: deivros17@gmail.com

### Proyecto
- **Repositorio**: [denuncias-laborales](https://github.com/C4ndido/denuncias-laborales)
- **Issues**: [Reportar problemas](https://github.com/C4ndido/denuncias-laborales/issues)
- **Discussions**: [Discusiones](https://github.com/C4ndido/denuncias-laborales/discussions)

### Comunidad
- **Discord**: [Únete a nuestra comunidad](# - próximamente)
- **Twitter**: [@CronicaEmpresarial](# - próximamente)

---

<div align="center">

**⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella! ⭐**

**Hecho con ❤️ para mejorar las condiciones laborales en República Dominicana**

[⬆️ Volver arriba](#-crónica-empresarial---plataforma-de-denuncias-laborales)

</div>
