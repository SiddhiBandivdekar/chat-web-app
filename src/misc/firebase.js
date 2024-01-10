import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD4BpKk-9PxhLrLDshMgdLQGUgGY-7rcE0",
  authDomain: "chat-web-app-c2327.firebaseapp.com",
  projectId: "chat-web-app-c2327",
  storageBucket: "chat-web-app-c2327.appspot.com",
  messagingSenderId: "531463206091",
  appId: "1:531463206091:web:7ff0b96aa42c656405974e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
