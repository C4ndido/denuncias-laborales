// Configuración de Firebase
const firebaseConfig = {
    // Aquí irán tus credenciales de Firebase
    apiKey: "TU_API_KEY",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a servicios
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

// Exportar referencias
window.db = db;
window.auth = auth;
window.storage = storage; 