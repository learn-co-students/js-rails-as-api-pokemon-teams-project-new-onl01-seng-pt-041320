const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const mainSection = document.querySelector("main")

//get trainers and related pokemons
function fetchTrainersAndPokemons() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => renderData(data));
}

//step trhough all trainers
function renderData(data) {
  const trainers = data.data
  trainers.forEach(trainer => {
    mainSection.append(buildTrainerHTML(trainer));
    console.log(buildTrainerHTML(trainer));
  } );
}

function buildTrainerHTML(trainerData) {
    const card = document.createElement('div');
    card.setAttribute("clsss","card");
    card.setAttribute("data-trainer-id", "1");
    card.innerHTML = `
    <p>${trainerData.attributes.name}</p>
    <button data-trainer-id="1">Add Pokemon</button>
    <ul>
      <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
      <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
      <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
      <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
      <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
    </ul>
    `;
    return card; 
};

