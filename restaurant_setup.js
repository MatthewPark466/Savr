import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const saveBtn = document.getElementById("save-btn");

if (saveBtn) {
    saveBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!name || !address) {
            alert("Please fill out both fields");
            return;
        }

        try {
            await addDoc(collection(db, "restaurants"), {
                name: name,
                address: address,
            });

            alert("Restaurant info saved!");
            window.location.href = "restaurant_dashboard.html";
        } catch (error) {
            console.error("Error saving restaurant:", error);
            alert("Error: " + error.message);
        }
    });
}   else {
    console.error("Save button not found");
}
