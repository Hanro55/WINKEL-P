
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-storage.js";

const firebaseConfig = {
apiKey: "AIzaSyB_AVP6tZD8U4AHNLrVf9nCe-gpOHPDLM8",
authDomain: "zweers-troue.firebaseapp.com",
projectId: "zweers-troue",
storageBucket: "zweers-troue.firebasestorage.app",
messagingSenderId: "584236352490",
appId: "1:584236352490:web:c717038090bd005e712893",
measurementId: "G-JBWM0TNSM4"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
