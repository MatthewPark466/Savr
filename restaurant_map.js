import { db, getDocs, collectioin } from './firebase.js';

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 37.7749, lng: -122.4194 }, // Default center
        zoom: 12,
    });
}

async function loadRestaurantLocations() {
    const restaurantsRef = collection(db, "restaurants");
    const snapshot = await getDocs(restaurantsRef);

    snapshot.forEach((doc) => {
        const data = doc.data();

        const address = data.address;
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_KEY`);
        const geoData = await response.json();

        if (geoData.results && geoData.results[0]) {
            const location = geoData.results[0].geometry.location;
            const marker = new google.maps.Marker({
                position: { lat: location.lat, lng: location.lng },
                map,
                title: data.name,
            });

            const infoWindow = new google.maps.InfoWindow({
                content: `<h3>${data.name}</h3>
                          <p>Address: ${address}</p>`,
            });

            marker.addListener("click", () => infoWindow.open(map, marker));

            map.setCenter(marker.getPosition()); 
        }
    });
}

window.onload = () => {
    initMap();
    loadRestaurantLocations();
};