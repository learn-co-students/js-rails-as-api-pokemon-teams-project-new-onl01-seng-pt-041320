const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {

    fetch(TRAINERS_URL)
          .then(function(response) {
            return response.json();
          })
          .then(function(array) {
            for (const trainer of array) {
              renderTrainer(trainer)
            }
          })
    });

function renderTrainer(trainer) {
    const container = document.getElementById('container')
    const list = document.createElement('ul')

    const newDiv = document.createElement('div')
    newDiv.className = 'card'

    const name = document.createElement('p')
    name.innerHTML = `${trainer.name}`
    newDiv.appendChild(name)

    const addButton = document.createElement('button')
    addButton.innerText = `Add Pokemon`
    addButton.addEventListener("click", function(event) {
       // if (trainer.pokemons < 6) {
           
            let Obj = {
                method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({"trainer_id": trainer.id})
                };
            fetch("http://localhost:3000/pokemons", Obj)
            .then(function(response) {
                return response.json();
            })
            .then(function(object) {
                let newPokemon = renderPokemon(object)
                list.appendChild(newPokemon)
                });


         // }
        })
    newDiv.appendChild(addButton)
    

        for (const pokemon of trainer.pokemons) {
            let item = renderPokemon(pokemon)
            list.appendChild(item)
        }

    newDiv.appendChild(list)

    container.appendChild(newDiv)


}

function renderPokemon(pokemon) {
            let li = document.createElement('li')
              const releaseButton = document.createElement('button')
              releaseButton.innerText = `Release`
              releaseButton.className = "release"
              li.innerHTML = `${pokemon.nickname} (${pokemon.species}) `
              li.appendChild(releaseButton)

              releaseButton.addEventListener("click", function(event) {
                li.innerHTML = '';
                let configObj = {
                    method: 'delete',
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({pokemon})
                  }
                fetch(`${BASE_URL}/pokemons/${pokemon.id}`, configObj)
            
              })

            return li
            }
