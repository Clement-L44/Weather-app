//Application d'exercice de l'utilisation de l'API OpenWeatherMap et d'ajax permettant l'affichage de la température d'une ville souhaité.


//Variable ville utilisé pour la fontion météo
let ville;

//Fonction permettant l'afffichage de la température par rapport à une ville en paramètre
function météo (ville){

    //Clé de l'API OpenWeatherMap
    const clé = "2b7006d3e309869881f1f31fa216c490";
    //Unité 
    const unité = "metric";

    //URL de l'ajax
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=' + clé + '&units=' + unité;

    let requete = new XMLHttpRequest();

    //Ajax en POST
    requete.open('POST', url);
    requete.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //On récupére les données en JSON
    requete.responseType = 'json';
    requete.send('q='+ ville);

    requete.onload = function() {
    if (requete.readyState === XMLHttpRequest.DONE) {
        if (requete.status === 200) {
                let reponse = requete.response;
                //Mets la valeur de la température dans le contenu correspondant à l'identifiant temperature_label
                document.querySelector('#temperature_label').textContent = reponse.main.temp;
                //Mets la valeur de la température dans le contenu correspondant à l'identifiant temperature_label
                document.querySelector('#ville').textContent = reponse.name;
            }
            else 
            {
                alert('Un problème est intervenu, merci de revenir plus tard.');
            }
        }
    }
}

const button = document.querySelector('#changer');

//Ville par défaut permettant l'affichage de la température de Paris lors de l'ouverture de l'application
let defaut = 'Paris';
ville = defaut;
météo(ville);

//Condition lors du click sur le bouton "changer ville".
if(button.addEventListener)
{
    button.addEventListener("click", function click (){ ville = prompt('Saisir votre ville: '); return météo(ville);});
    
}







    
