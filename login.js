import { login } from "./firebase.js";

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = loginForm.email.value.trim();
    const password = loginForm.password.value;
    const role = loginForm.role.value;

    try {
      const { user, data } = await login(input, password);

      if(data.role !== role){
        alert("Role mismatch. Please use the correct login page.");
        return;
      }

      if(role === "customer"){
        window.location.href = "customer_dashboard.html";
      } else {
        console.log("Redirecting to restaurant dashboard");
        window.location.href = "restaurant_dashboard.html";
      }
    } catch (err) {
      alert("Login failed: " + err.code);
    }
  });
}