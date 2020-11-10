const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//Pokemon and Trainers

pokemon_trainers = () => {
    fetch(TRAINERS_URL)
    .then(function(response){
        return response.json();
    })
    .then(function(json){
        console.log(json)
    });
