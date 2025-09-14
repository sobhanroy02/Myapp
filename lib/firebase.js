import { initializeApp, getApps } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    };

    // Validate Firebase configuration
    const isValidConfig = firebaseConfig.apiKey && 
                         firebaseConfig.apiKey !== 'undefined' && 
                         firebaseConfig.apiKey !== 'null' &&
                         !firebaseConfig.apiKey.includes('YOUR_') &&
                         firebaseConfig.projectId &&
                         firebaseConfig.projectId !== 'undefined';

    // Initialize Firebase only if we have valid configuration and are on client side
    let app = null;
    let auth = null;
    let db = null;

    if (typeof window !== 'undefined' && isValidConfig) {
      try {
        // Only initialize on client-side with valid config
        if (!getApps().length) {
          app = initializeApp(firebaseConfig);
        } else {
          app = getApps()[0];
        }
        
        auth = getAuth(app);
        db = getFirestore(app);
        
        console.log('Firebase initialized successfully');
      } catch (error) {
        console.error('Firebase initialization failed:', error);
        auth = null;
        db = null;
      }
    } else if (!isValidConfig && typeof window !== 'undefined') {
      console.warn('Firebase configuration is invalid. Check environment variables.');
    }

    export { auth, db };