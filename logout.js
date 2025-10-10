import { logout } from "/firebase.js"

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await logout();
            alert("You've been logged out");

            if (window.location.href.includes("resteraunt")) {
                window.location.href = "resteraunt.html";
            } else {
                window.location = "customer.html";
            }
        } catch (err) {
            console.error("Logout failed:", err);
            alert("Error logging out: " + err.message);
        }
    });
}