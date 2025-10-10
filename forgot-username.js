import { db } from "./firebase.js";
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const form = document.getElementById("username-form");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = form.email.value.trim();

        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("email", "==", email));
            const snap = await getDocs(q);

            if (snap.empty) {
                alert("❌ No account found with that email.");
                return;
            }

            const username = snap.docs[0].data().username;
            alert('✅ Your username is: ${username}');
        }   catch (err) {
            console.error("Error fetching username:", err);
            alert("Error: " + err.message);
        }
    })
}