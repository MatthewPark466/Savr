import { signup } from "./firebase.js";

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = signupForm.username.value;
    const email = signupForm.email.value;
    const password = signupForm.password.value;
    const confirm = signupForm.confirm.value;
    const role = signupForm.role.value;

    if (password !== confirm) {
      alert("Passwords don’t match.");
      return;
    }

    try {
      await signup(email, password, role, username);
      if (role === "customer") {
        window.location.href = "customer_dashboard.html";
      } else {
        window.location.href = "restaurant_dashboard.html";
      }
    } catch (err) {
      alert("Signup failed: " + err.code);
    }
  });
}
