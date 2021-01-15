const tilesProvider = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

navigator.geolocation.getCurrentPosition(
    (pos) => {
        const { coords } = pos
        var mymap = L.map('mapid').setView([coords.latitude, coords.longitude], 13);
        L.tileLayer(tilesProvider, {
            maxZoom: 18,
        }).addTo(mymap);
        L.marker([coords.latitude, coords.longitude]).addTo(mymap)

        document.getElementById("coordenadas").innerHTML+= 
        `
            <p>${coords.latitude}, ${coords.longitude}</p>

        ` 

    },
    (err)=> {

    },
    {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    
)







