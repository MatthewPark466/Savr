import { auth, db, login, doc, getDoc } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { login } from "./firebase.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    let emailOrUsername = loginForm.email.value;
    const password = loginForm.password.value;
    const role = loginForm.role.value;

    console.log("Login form submitted", { emailOrUsername, role });
    let emailToUse = emailOrUsername;
    try {
      // If input does not contain @, treat as username and look up email
      if (!emailOrUsername.includes("@")) {
        console.log("Looking up email for username:", emailOrUsername);
        // Firestore lookup for email by username
        const { getFirestore, collection, query, where, getDocs } = await import("https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js");
        const db = (await import("./firebase.js")).db;
        const q = query(collection(db, "users"), where("username", "==", emailOrUsername));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          alert("No account found with that username.");
          return;
        }
        // Use the first match
        const userData = querySnapshot.docs[0].data();
        emailToUse = userData.email;
        console.log("Found email for username:", emailToUse);
      }

      const result = await login(emailToUse, password);
      console.log("Login result:", result);
      if (!result || !result.data) {
        alert("Account does not exist or is missing data.");
        return;
      }
      if (result.data.role !== role) {
        alert("❌ Role mismatch. Please use the correct login page.");
        return;
      }
      if (role === "customer") {
        console.log("Redirecting to customer dashboard");
        window.location.href = "customer_dashboard.html";
      } else {
        console.log("Redirecting to restaurant dashboard");
        window.location.href = "restaurant_dashboard.html";
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed: " + err.message);
    }
  });
}