const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//get trainers and related pokemons
function fetchTrainersAndPokemons() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => {
        const trainers = data;
        return trainers;
    });
}

