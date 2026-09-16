import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "mock-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mock-domain",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mock-bucket",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "mock-app"
};

// Initialize Firebase only if we have a real config, otherwise return null
// This allows the app to function with mock data from `mockData.ts` if no backend is attached yet.
const isFirebaseConfigured = import.meta.env.VITE_FIREBASE_API_KEY !== undefined;

export const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = app ? getFirestore(app) : null;

export const isBackendConnected = () => !!db;
