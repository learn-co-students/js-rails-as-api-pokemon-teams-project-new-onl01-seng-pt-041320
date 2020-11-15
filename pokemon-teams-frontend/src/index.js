const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector("main")

document.addEventListener('DOMContentLoaded', function() {
    fetchTrainers()
})

function deletePokemon(pokemon) {
    let id = pokemon.data.relationships.trainer.data.id
    const poke = pokemon.data.id
    let div = main.querySelectorAll("div.card")
    div.forEach(card => {
        if (card.dataset.id == id) {
            let list = card.querySelectorAll("li")
            list.forEach(li => {
                if (li.children[0].dataset.pokemonId == poke) {
                    li.remove();
                    fetchTrainers();
                }
            })
        }
    })
}

function newPokemon(pokemon) {
    let trainer_id = Number(pokemon.data.relationships.trainer.data.id)
    let pokemon_id = Number(pokemon.data.id)
    let card = document.querySelector(`[data-id="${trainer_id}"]`)
    let ul = card.querySelector("ul")
    var li = document.createElement('li')
    var release = document.createElement('button');
    release.className = "release"
    release.dataset.pokemonId = pokemon_id
    release.innerText = "Release"
    li.innerText = `${pokemon.data.attributes.nickname} (${pokemon.data.attributes.species})`
    li.appendChild(release);
    ul.appendChild(li);
    card.appendChild(ul);
}

function addPokemon(trainer) {
    let id = Number(trainer.dataset.trainerId)
    let data = {
        trainer_id: id
    };
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(POKEMONS_URL, configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        newPokemon(object)
    })
    .catch(function(error) {
        alert("Not enough space to add pokemon.")
    })
}

function selectPokemon(trainer, pokemon) {
    let trainer_id = Number(trainer)
    let pokemon_id = Number(pokemon.dataset.pokemonId)
    let data = {
        trainer_id: trainer_id,
        pokemon_id: pokemon_id
    }
    let configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    };
    fetch(POKEMONS_URL + "/" + pokemon_id, configObj)
    .then(function(response) {
        return response.json();
    })
    .then(function(object) {
        deletePokemon(object)
    })
}

function displayTrainers(trainers) {
    const list = trainers.data
    list.forEach(data =>
        {  
            const pokemons = data.attributes.pokemons
            var div = document.createElement("div")
            var p = document.createElement('p');
            var btn = document.createElement('button');
            var ul = document.createElement('ul')
            div.className = "card"
            div.dataset.id = data.id
            p.innerText = data.attributes.name
            btn.dataset.trainerId = data.id
            btn.innerText = "Add Pokemon"
            btn.addEventListener("click", e => {
                addPokemon(e.target)
            })
            pokemons.forEach(pokemon => {
                var li = document.createElement('li')
                var release = document.createElement('button');
                release.className = "release"
                release.dataset.pokemonId = pokemon.id
                release.innerText = "Release"
                release.addEventListener("click", e => {
                       selectPokemon(e.path[3].dataset.id, e.target)
                })
                li.innerText = `${pokemon.nickname} (${pokemon.species})`
                li.appendChild(release);
                ul.appendChild(li);
            })
            div.append(p, btn, ul);
            main.appendChild(div);
        })
}

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => displayTrainers(json))
}