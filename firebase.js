import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

// Import the functions you need from the SDKs you need
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";
import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase config (replace with your own project values)
const firebaseConfig = {
    apiKey: "AIzaSyDPiNlImOOEzGus2CxMcnisnRMPRrsxcP0", 
    authDomain: "savr-90c8d.firebaseapp.com", 
    projectId: "savr-90c8d", 
    storageBucket: "savr-90c8d.firebasestorage.app", 
    messagingSenderId: "333467669609", 
    appId: "1:333467669609:web:47245aa7aeaa1127ee3ef8", 
    measurementId: "G-M6NJ2CWE6P"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up
async function signup(email, password, role, username) {
    try{
        const cred = await createUserWithEmailAndPassword(auth, email, password,);
        await setDoc(doc(db, "users", cred.user.uid), {
            email,
            username,
            role,
            createdAt: serverTimestamp()
        });
        return cred.user;
    } catch (err) {
        console.error("Error during sign up:", err);
        throw err; 
    }
}

// Login
async function login(email, password) {
    try {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const user = cred.user;

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            throw new Error("This user is not signed up.");
        }
    
        return {user, data: snap.data()};
    }   catch (err) {
        console.error("Error during login:", err);
        throw err; 
    }
}

// Logout
async function logout() {
    try {
        await signOut(auth);
    } catch (err) {
        console.error("Error during logout:", err);
        throw err; 
    }
}

// Auth listener
function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

export {
  auth,
  db,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  onAuthChange,
  signup,
  login,
  logout,
  onAuthStateChanged
};

