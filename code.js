var firebaseConfig = {
    apiKey: "AIzaSyCJVBy-PBVTwx1eatsve9ww3g3vLBsomcs",
    authDomain: "chec-js-firebase.firebaseapp.com",
    projectId: "chec-js-firebase",
    storageBucket: "chec-js-firebase.appspot.com",
    messagingSenderId: "715679080384",
    appId: "1:715679080384:web:9f823146a8bdffb160f225"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  const auth = firebase.auth();

//leer datos expropiaciones

var expropiadas = document.getElementById("exp-expropiadas")


db.collection("expropiaciones").orderBy("KI", "asc").get().then((querySnapshot) => {
    expropiadas.innerHTML ='';
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        expropiadas.innerHTML += `
        
        <div class="card mb-3">
        <div class="card-header bg-success fw-bolder text-white">
            ${doc.data().status}
        </div>
        <div class="card-body text-center">
            <h5 class="card-title">${doc.data().ExpCod}</h5>
            <a href="${doc.data().plano}">
                <p class="card-text">${doc.data().ofi}</p>
            </a>
            <p class="card-text">${doc.data().KI} - ${doc.data().KF}</p>
        </div>
        </div>


        `
    });
});

//leer datos puentes

var bridges = document.getElementById("puentes-list")


db.collection("Puentes").orderBy("ki", "asc").get().then((querySnapshot) => {
    bridges.innerHTML ='';
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);

        let latLong = doc.data().coords.split(",");
        console.log(latLong);

        bridges.innerHTML += `
        
        <div class="card mb-3">
        <div class="card-header text-center bg-primary text-white fw-bolder">
            ${doc.data().name}  
        </div>
        <div class="card-body p-1">
            <p class="card-text text-center">${doc.data().ki}<span class="coords">  ${latLong}</span></p>
        </div>
        </div>


        `
    });
});

//leer datos retornos

var retorno = document.getElementById("retornos-list")


db.collection("retornos").orderBy("ki", "asc").get().then((querySnapshot) => {
    retorno.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        retorno.innerHTML += `
        
        <div class="card mb-3">
        <div class="card-header text-center bg-primary text-white fw-bolder">
            <a href="${doc.data().url}" class="text-white">${doc.data().name}</a>
        </div>
        <div class="card-body p-1">
            <p class="card-text text-center">${doc.data().ki}</p>
        </div>
        </div>


        `
    });
});

//leer datos PSV

var psv = document.getElementById("psv-list")


db.collection("psv").orderBy("ki", "asc").get().then((querySnapshot) => {
    psv.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        psv.innerHTML += `
        
        <div class="card mb-3">
        <div class="card-header text-center bg-primary text-white fw-bolder">
            <a href="${doc.data().url}" class="text-white">${doc.data().name}</a>
        </div>
        <div class="card-body p-1">
            <p class="card-text text-center">${doc.data().ki}</p>
        </div>
        </div>


        `
    });
});
//leer datos Puentes Peatonales

var peatonal = document.getElementById("PuentesPeatonales-list")


db.collection("peatonal").orderBy("ki", "asc").get().then((querySnapshot) => {
    peatonal.innerHTML ='';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        peatonal.innerHTML += `
        
        <div class="card mb-3">
        <div class="card-header text-center bg-primary text-white fw-bolder">
            ${doc.data().name}
        </div>
        <div class="card-body p-1">
            <p class="card-text text-center">${doc.data().ki}</p>
        </div>
        </div>


        `
    });
});


// LEAFTLET SCRIPT

const tilesProvider = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";

// Obtener Latitud y Longitud para mostrar en el mapa



navigator.geolocation.getCurrentPosition(
    (pos) => {
        const { coords } = pos
        var mymap = L.map('mapid').setView([coords.latitude, coords.longitude], 13);
        L.tileLayer(tilesProvider, {
            maxZoom: 18,
        }).addTo(mymap);
        L.marker([coords.latitude, coords.longitude]).addTo(mymap);



        db.collection("Puentes").orderBy("ki", "asc").get().then((querySnapshot) => {
            
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.id} => ${doc.data()}`);
        
                let latLong = doc.data().coords.split(",");
                let puenteNombre = doc.data().name;
                let kilometraje = doc.data().ki;
                let latLog = doc.data().coords;
                //console.log(latLong);
                L.marker(latLong).bindPopup("<b>" + puenteNombre +"</b>" + "<br>" + kilometraje + "<br>" + latLog ).addTo(mymap);
            });
        });





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

// Obtener Latitud y Longitud para mostrar en el mapa



