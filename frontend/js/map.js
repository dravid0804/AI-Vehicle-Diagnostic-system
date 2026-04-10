// Initialize map (default view before location loads)
const map = L.map('map').setView([20, 78], 5)

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map)


// Custom icon for service centers
const serviceIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854894.png",
    iconSize: [30, 30]
})


// Get user location
navigator.geolocation.getCurrentPosition(success, error)


// Success function
function success(position) {

    const lat = position.coords.latitude
    const lon = position.coords.longitude

    // Zoom to user location
    map.setView([lat, lon], 14)

    // Add user marker
    L.marker([lat, lon])
        .addTo(map)
        .bindPopup("📍 You are here")
        .openPopup()

    // Fetch service centers
    fetchServiceCenters(lat, lon)
}


// Error function
function error() {
    alert("Location access denied. Please allow location to use this feature.")
}


// Fetch service centers using Overpass API
async function fetchServiceCenters(lat, lon){

    const query = `
[out:json][timeout:25];
(
  node["amenity"="car_repair"](around:15000,${lat},${lon});
  node["shop"="car_repair"](around:15000,${lat},${lon});
  node["shop"="car"](around:15000,${lat},${lon});
  node["amenity"="garage"](around:15000,${lat},${lon});
  node["service"="vehicle"](around:15000,${lat},${lon});
);
out body;
`
    
    const url = "https://overpass-api.de/api/interpreter"
    
    try{
    
    const res = await fetch(url, {
    method: "POST",
    headers: {
    "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "data=" + encodeURIComponent(query)
    })
    
    if(!res.ok){
    throw new Error("API failed")
    }
    
    const data = await res.json()
    
    console.log("Overpass Response:", data) // DEBUG
    
    if(!data.elements || data.elements.length === 0){
    alert("No service centers found nearby")
    return
    }
    
    data.elements.forEach(place => {
    
    if(place.lat && place.lon){
    
    const name = place.tags?.name || "Service Center"
    
    L.marker([place.lat, place.lon], {icon: serviceIcon})
    .addTo(map)
    .bindPopup(`<b>${name}</b><br>Vehicle Service Center`)
    
    }
    
    })
    
    }catch(err){
    
    console.error("Overpass Error:", err)
    alert("Error fetching service centers. Try again later.")
    
    }
    }