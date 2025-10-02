import { auth, db, login, doc, getDoc } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { login } from "./firebase.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;
    const role = loginForm.role.value;

    try {
      const { user, data } = await login(email, password);

      if(data.role!==role){
        alert("❌ Role mismatch. Please use the correct login page.");
        return;
      }

      if(role==="customer"){
        window.location.href = "customer_dashboard.html";
      } else {
        window.location.href = "restaurant_dashboard.html";
      } 
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  });
}