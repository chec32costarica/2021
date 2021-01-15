const tilesProvider = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

var mymap = L.map('mapid').setView([10.146, -83.578], 13);

L.tileLayer(tilesProvider, {
    maxZoom: 18,
}).addTo(mymap);


navigator.geolocation.getCurrentPosition(
    (pos) => {
        const { coords } = pos
        L.marker([coords.latitude, coords.longitude]).addTo(mymap)
    },
    (err)=> {

    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
)