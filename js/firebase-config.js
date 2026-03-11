// Configuración de Firebase (opcional - la app funciona sin Firebase)
try {
    if (typeof firebase !== 'undefined') {
        const firebaseConfig = {
            apiKey: "TU_API_KEY",
            authDomain: "tu-proyecto.firebaseapp.com",
            projectId: "tu-proyecto",
            storageBucket: "tu-proyecto.appspot.com",
            messagingSenderId: "TU_MESSAGING_SENDER_ID",
            appId: "TU_APP_ID"
        };
        firebase.initializeApp(firebaseConfig);
        window.db = firebase.firestore();
        window.storage = firebase.storage();
    }
} catch (e) {
    console.warn('Firebase no configurado. La app usa datos locales.');
    window.db = null;
    window.storage = null;
}
