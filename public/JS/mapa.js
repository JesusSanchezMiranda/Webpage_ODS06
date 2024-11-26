// Inicializar el mapa y centrarlo en Imperial, Cañete (coordenadas aproximadas)
var map = L.map('map').setView([-13.0739, -76.3522], 14); // Latitud y longitud de Imperial, Cañete

// Añadir el mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variable para almacenar el marcador actual
var currentMarker = null;

// Función para obtener el nombre del lugar usando la API de Nominatim
function getPlaceName(lat, lon) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
        .then(response => response.json())
        .then(data => {
            var placeName = data.display_name || "Lugar desconocido";
            if (currentMarker) {
                currentMarker.bindPopup(`<b>${placeName}</b>`).openPopup();
            }
        })
        .catch(error => {
            console.error("Error al obtener el nombre del lugar:", error);
            if (currentMarker) {
                currentMarker.bindPopup("No se pudo obtener el nombre del lugar").openPopup();
            }
        });
}

// Evento de clic en el mapa para agregar un marcador
function onMapClick(e) {
    // Si ya existe un marcador, eliminarlo
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }

    // Crear un nuevo marcador y cargar el nombre del lugar
    currentMarker = L.marker(e.latlng).addTo(map)
        .bindPopup("Cargando nombre del lugar...")
        .openPopup();

    getPlaceName(e.latlng.lat, e.latlng.lng);
}

// Asignar el evento de clic al mapa
map.on('click', onMapClick);