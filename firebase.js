import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
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
    serverTimestamp, 
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

// Firebase config (replace with your own project values)
const firebaseConfig = {
    apiKey: "AIzaSyD-9i_vM2hL0y8ueqL2mfRwL2Clr-5yKD8",
    authDomain: "cscongressionalappchallenge.firebaseapp.com",
    projectId: "cscongressionalappchallenge",
    storageBucket: "cscongressionalappchallenge.firebasestorage.app",
    messagingSenderId: "638513027367",
    appId: "1:638513027367:web:bc8471a2ff3817b6ccf102"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up
export async function signup(email, password, role, username) {
    try{
        //checks if username exists already
        const q = query(collection(db, "users"), where("username", "==", username));
        const snap = await getDocs(q);
        if(!snap.empty) {
            throw new Error("username already taken. Please choose another");
        }

        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", cred.user.uid), {
            email,
            role,
            username,
            createdAt: serverTimestamp()
        });
        return cred.user;
    } catch (err) {
        console.error("Error during sign up:", err);
        throw err; 
    }
}

// Login
export async function login(input, password) {
    let email = input; 

    //checks if the input is email, if not then searches for the associated username
    if(!input.incudes("@")) {
        const q = query(collection(db, "users"), where("username", "==", input));

        if(snap.empty) {
            throw new Error("No account found with the username");
        }

        email = snap.docs[0].data().email; //finds associated email
    }

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;

    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        throw new Error("This user is not signed up.");
    }

    // Return both user and Firestore data
    return { user, data: userSnap.data() };
}

// Logout
export async function logout() {
    await signOut(auth);
}

// Auth listener
export function onAuthChange(callback) {
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
  logout
};

