/*** Application d'exercice de l'utilisation de l'API OpenWeatherMap et d'ajax permettant l'affichage de la température d'une ville souhaité. ***/

//Variables utilisées pour la fontion météo
let ville;
let lat;
let lon;

//Fonction permettant l'afffichage de la température par rapport à une ville en paramètre
function météo (ville, lat, lon){

    //Clé de l'API OpenWeatherMap
    const clé = "2b7006d3e309869881f1f31fa216c490";
    //Unité 
    const unité = "metric";

    //URL de l'ajax
    const urlVille = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=' + clé + '&units=' + unité;
    const urlCords = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + clé + '&units=' + unité;

    //Si la variable ville est différent de '' donc le nom de la ville est renseingé (ex: Paris)
    if(ville != ''){
        //Requête Ajax avec JQuery
        console.log('ville');
        $.ajax({
            url: urlVille,
            type: 'POST',
            data: ville,
            dataType: 'json',
            success: (data) => {
                $('#temperature_label').text(data.main.temp);
                $('#ville').text(data.name);
            },
            error: () => {
                alert('Un problème est intervenu, merci de revenir plus tard.');
            } 
        });
    };
    //Si la variable ville = '' donc il y a les coordonées (lat, lon).
    if(ville == ''){
        console.log('cords');
        $.ajax({
            url: urlCords,
            type: 'POST',
            data: lat, lon,
            dataType: 'json',
            success: (data) => {
                $('#temperature_label').text(data.main.temp);
                $('#ville').text(data.name);
            },
            error: () => {
                alert('Un problème est intervenu, merci de revenir plus tard.');
            } 
        }); 
    };
};

const button = document.querySelector('#changer');

//Condition lors du click sur le bouton "changer ville"
function bouton(){
    if(button.addEventListener){
        lat = 0;
        lon = 0;
        ville = '';
        button.addEventListener("click", function click (){ ville = prompt('Saisir votre ville: '); return météo(ville, lat, lon);});
    };
};

if ("geolocation" in navigator){
    //Géolocalisation disponible
    navigator.geolocation.getCurrentPosition(function(position){
        lat = (position.coords.latitude);
        lon = (position.coords.longitude);
        météo('', lat, lon);
        bouton();

    }, error, options)

    function error(){
        //Message d'erreur
        alert('Aucune position disponible.');
        //Ville par défaut permettant l'affichage de la température de Paris
        let defaut = 'Paris';
        ville = defaut;
        météo(ville, lat = 0, lon = 0);
        bouton();
    }

    var options = {
        enableHighAccuracy : true,
        timeout : 5000,
        maximunAge : 2000
    }

} else {
    //Géolocalisation non disponible
    alert("Le navigateur ne supporte pas la géolocalisation"); 
};   

















    
