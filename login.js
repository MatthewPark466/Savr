import { auth, db, login, doc, getDoc } from "./firebase.js";


const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const user = await login(email, password);

      // Get role from Firestore
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        if (data.role === "customer") {
          window.location.href = "customer_dashboard.html";
        } else if (data.role === "restaurant") {
          window.location.href = "restaurant_dashboard.html";
        } else {
          alert("Unknown role.");
        }
      } else {
        alert("No role found in Firestore.");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}
