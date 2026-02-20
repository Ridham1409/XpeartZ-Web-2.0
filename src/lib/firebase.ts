import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyChoJgvLMi01l3EbZOEgRB-M31z1qqIELk",
  authDomain: "xpeartz-bb456.firebaseapp.com",
  projectId: "xpeartz-bb456",
  storageBucket: "xpeartz-bb456.firebasestorage.app",
  messagingSenderId: "1029440502392",
  appId: "1:1029440502392:web:eec41d3ef13d0d19698b8d",
  measurementId: "G-SLYZL7DT88"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: any = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
