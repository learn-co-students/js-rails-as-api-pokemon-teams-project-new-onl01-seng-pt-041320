const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main");

document.addEventListener("DOMContentLoaded", (event) => {

fetch(TRAINERS_URL)
.then(resp => resp.json())
.then(putsTrainersOnPage)

function putsTrainersOnPage(trainers){
    trainers.forEach(trainer => {
        let pokiString = ""
        trainer.pokemons.forEach(pokemon => {
            pokiString += `<li>${pokemon.nickname} (${pokemon.species}) <button
            class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        })
        main.innerHTML += `
        <div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
        <ul>${pokiString}</ul>
        </div>
        `
    })
}

main.addEventListener("click", e => {
    //debugger
    if (e.target.dataset.trainerId !== undefined) {
        fetch(POKEMONS_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId
            })
        })
        .then(resp => resp.json())
        .then(addPokemon)
    }
    if (e.target.dataset.pokemonId !== undefined) {
        e.target.parentElement.remove()
        fetch(POKEMONS_URL + "/" + e.target.dataset.pokemonId, {method :"DELETE"})
    }
})

function addPokemon(pokemon) {
    main.children[pokemon.trainer_id-1].lastElementChild.innerHTML +=
    `<li>${pokemon.nickname} (${pokemon.species}) <button class="release"
    data-pokemon-id="${pokemon.id}">Release</button></li>`
}

})

