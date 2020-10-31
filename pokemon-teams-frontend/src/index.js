const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", fetchTrainers());

function fetchTrainers()
{
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => renderTrainers(json));
}

function renderTrainers(json)
{
    json.forEach(trainer => createTrainer(trainer));
}

function createTrainer(trainer)
{
    const main = document.querySelector("main");
    const divTrainerCard = document.createElement("div");
    const pTrainer = document.createElement('p');
    const button = document.createElement("button");

    divTrainerCard.className = "card";
    divTrainerCard["data-id"] = trainer.id;
    pTrainer.innerText = trainer.name;
    
    button["data-trainer-id"] = trainer.id;
    button.innerText = "Add Pokemon";
    
    divTrainerCard.append(pTrainer, button);

    button.addEventListener("click", addNewPokemon);

    main.append(divTrainerCard);

    renderPokemons(trainer.pokemons, divTrainerCard);
}

function addNewPokemon(e)
{
    e.preventDefault();
    
    /* 
        target - gets the element on which the event originally occurred, the button
        nextElementSibling - returns the element immediately following the specified element, in the same tree level;
            returns the next sibling node as an elemnt node (ignores text and comment nodes).
    */
    let ulPokemon = e.target.nextElementSibling;

    if (ulPokemon.childElementCount < 6)
    {
        configObj = 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({trainer_id: e.target["data-trainer-id"]})
        };

        fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(pokemon => createPokemon(pokemon, ulPokemon));
    }
}

function renderPokemons(pokemons, divTrainerCard)
{
    const ulPokemon = document.createElement("ul");

    pokemons.forEach(pokemon => personalPokemon(pokemon))

    function personalPokemon(pokemon)
    {
        createPokemon(pokemon,ulPokemon);
        divTrainerCard.append(ulPokemon);
    }
}

function createPokemon(pokemon, ulElement)
{
    const liPokemon = document.createElement("li");
    const deletePokemonButton = document.createElement("button");

    liPokemon.innerText = `${pokemon.nickname} (${pokemon.species}) `;

    deletePokemonButton.className = "release";
    deletePokemonButton["data-pokemon-id"] = pokemon.id;
    deletePokemonButton.style.float = "right";
    deletePokemonButton.style.background = "#C62D42";
    deletePokemonButton.innerText = "Release";
    deletePokemonButton.addEventListener("click", deletePokemon);

    liPokemon.append(deletePokemonButton);

    ulElement.append(liPokemon);
}

function deletePokemon(e)
{
    e.preventDefault();

    let configObj = 
    {
        method: "DELETE"
    };

    fetch(`${POKEMONS_URL}/${e.target["data-pokemon-id"]}`, configObj)
    .then(console.log);

    let liPokemon = e.target.parentElement;

    liPokemon.remove();
}