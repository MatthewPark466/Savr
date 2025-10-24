import { db } from './firebase.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const form = document.getElementById("restaurantForm");

form.addEventListener("submit", async (e) => {
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
            address: address
        });

        alert("restaurant info saved!");

        window.location.href = "restaurant_dashboard.html";
    } catch (error) {
        console.error("Error saving restaurant:", error);
    }
});