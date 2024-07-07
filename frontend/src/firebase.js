import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
        apiKey: "AIzaSyC5nmvBrc3o5DzB1U6zo3kXvnKtw8HlX0c",
        authDomain: "projecthub-1b710.firebaseapp.com",
        projectId: "projecthub-1b710",
        storageBucket: "projecthub-1b710.appspot.com",
        messagingSenderId: "735397157169",
        appId: "1:735397157169:web:d1f669e37f560d5502f810",
        measurementId: "G-CHPW97K56W"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };