let currentPokemon;
let pokemonsAsJSONArray = [];
let anotherPokemon;
let counter = 0;



//function to download all the jsons from the internet
async function loadFirst20Pokemon(){
    for (let i = 1; i <= 50; i++) {

        let url = 'https://pokeapi.co/api/v2/pokemon/'+i;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemonsAsJSONArray.push(currentPokemon);
      
    }  
    showPokemonOverview();
}


//function to show all the pokemons dynamically on the main page
function showPokemonOverview(){
    let container = document.getElementById('container');
    container.innerHTML = "";
 
    for (let i = 0; i < pokemonsAsJSONArray.length; i++) {
       
        currentPokemon = pokemonsAsJSONArray[i];

        let image = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        let name = currentPokemon['name'];
        let order = currentPokemon['order'];
        let pokemonType = currentPokemon['types'][0]['type']['name'];
        
        container.innerHTML +=`
        <div class="pokemonCard" id="pokemonCard${i}" onclick="showPokemon(${i})">
        <div class="headline">
        <h5>${name}</h5>
        <h5>#${order}</h5>

        </div>
        <div class="body-section">    
        <div id="pokemonTypes${i}">
             
        </div>
        <img id="pokemonImageOverview" src="${image}">
        </div></div>
        `;

        document.getElementById('pokemonCard'+i).classList.add('addBackground'+pokemonType);
        renderPokemonType(currentPokemon, i);
    }   
}


//helpfunction that shows some details on the mainpage
function renderPokemonType(currentPokemon, i){
    let pokemonTypesJSONArray = currentPokemon['types'];
    let container = document.getElementById('pokemonTypes'+i);
    for (let j = 0; j < pokemonTypesJSONArray.length; j++) {
        let pokemonType = pokemonTypesJSONArray[j]['type']['name'];
       

        container.innerHTML +=`
        <div id="pokemonTypesElement${i}${j}" class="pokemonTypesElement">
        <h5>${pokemonType}</h5>
        
        </div>
        `;
           
        document.getElementById('pokemonTypesElement'+i+""+j).classList.add('addBackground'+pokemonType);
    }

}

//shows the choosen pokemon in detail on a new page
function showPokemon(i){
    
    currentPokemon = pokemonsAsJSONArray[i];
    let pokemonType = currentPokemon['types'][0]['type']['name'];
    console.log('currentPokemon', currentPokemon);

    let container = document.getElementById('container');
    container.innerHTML = "";
    container.innerHTML =`
    <div id="pokemonElementBackground" onclick="backtoBackground()">
    <div id="pokemonElement" onclick="event.stopPropagation()">
    <div id="pokedex">
    <h1 id="pokemonName"></h1>

    </div>
    <div id="info-container">
    <img id ="pokemonImage">
    <div id="categories">
        
        <button id="menue-button"><h4 id="menue-options" onclick="renderPokemonInfo(event)">about</h4><div id="about-line"></div></button>
        <button id="menue-button"><h4 id="menue-options" onclick="renderBaseStats(event)">base stats</h4><div id="baseStats-line"></div></button>
        <button id="menue-button"><h4 id="menue-options" onclick="renderMoves(event)">moves</h4><div id="moves-line"></div></button>

    </div>
    <div id="worth-section">

    </div>
    </div>
    </div>

</div>`;
document.getElementById('pokedex').classList.add('addBackground'+pokemonType);


renderPokemonPictureAndImage();
renderPokemonInfo();
}

//function to show the pokemonimage and pokemonname
function renderPokemonPictureAndImage(){
    document.getElementById('pokemonName').innerHTML = currentPokemon['name'];
    document.getElementById('pokemonImage').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


//function to render the pokemoninfo when a pokemon is choosen
function renderPokemonInfo(event){
    
    document.getElementById('about-line').classList.add('addUnderlineBlue');
    document.getElementById('baseStats-line').classList.remove('addUnderlineBlue');
    document.getElementById('moves-line').classList.remove('addUnderlineBlue');

    let container = document.getElementById('worth-section');
    let species = currentPokemon['species']['name'];
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    let abilitie1 = currentPokemon['abilities'][0]["ability"]["name"];
    let abilitie2 = currentPokemon['abilities'][1]["ability"]["name"];
    let blankspace = ", ";

    container.innerHTML = ` <div id="input-fields"><p id="species1" class="first-Inputfield">Species</p><p id="species2">${species}</p></div>
            <div id="input-fields"><p id="height1" class="first-Inputfield">Height</p><p id="height2">${height}"</p></div>
            <div id="input-fields"><p id="weight1" class="first-Inputfield">Weight</p><p id="weight2">${weight}kg</p></div>
            <div id="input-fields"><p id="abilities1" class="first-Inputfield">Abilities</p><p id="abilities2">${abilitie1}${blankspace}${abilitie2}</p></div>`;

    event.stopPropagation();


}


//function to render the category moves
function renderMoves(event){
    document.getElementById('baseStats-line').classList.remove('addUnderlineBlue');
    document.getElementById('about-line').classList.remove('addUnderlineBlue');
    document.getElementById('moves-line').classList.add('addUnderlineBlue');

    let container = document.getElementById('worth-section');
    container.innerHTML = "";
    let movesLengthCounter;

    if(currentPokemon['moves'].length < 5){
        movesLengthCounter = currentPokemon['moves'].length;
    }else{
        movesLengthCounter = 5;
    }

    for (let index = 0; index < movesLengthCounter; index++) {
        const element = currentPokemon['moves'][index]['move']['name'];
        container.innerHTML += `
        
        <div id="moves-stats" >
        <h5>${element}</h5>
        </div>
       
        `;
    }
  

    event.stopPropagation();

}


//function to render the category base stats
function renderBaseStats(event){

    
    document.getElementById('baseStats-line').classList.add('addUnderlineBlue');
    document.getElementById('about-line').classList.remove('addUnderlineBlue');
    document.getElementById('moves-line').classList.remove('addUnderlineBlue');
    let hp = currentPokemon['stats'][0]['base_stat'];
    let attack = currentPokemon['stats'][1]['base_stat'];
    let defense = currentPokemon['stats'][2]['base_stat'];
    let spAtk = currentPokemon['stats'][3]['base_stat'];
    let spDef = currentPokemon['stats'][4]['base_stat'];
    let speed = currentPokemon['stats'][5]['base_stat'];
    
   
    let container = document.getElementById('worth-section');

    container.innerHTML = `
    
    <div id="base-stats-elements">
                <p class="base-stats-worth">HP</p><p class="base-stats-result"><b>${hp}</b></p><div class="base-stats-lineBox"><div class="base-stats-line1"></div></div>

            </div>
            <div id="base-stats-elements">
                <p class="base-stats-worth">Attack</p><p class="base-stats-result"><b>${attack}</b></p><div class="base-stats-lineBox"><div class="base-stats-line2"></div></div>

            </div>
            <div id="base-stats-elements">
                <p class="base-stats-worth">Defense</p><p class="base-stats-result"><b>${defense}</b></p><div class="base-stats-lineBox"><div class="base-stats-line3"></div></div>

            </div>
            <div id="base-stats-elements">
                <p class="base-stats-worth">Sp. Atk</p><p class="base-stats-result"><b>${spAtk}</b></p><div class="base-stats-lineBox"><div class="base-stats-line4"></div></div>

            </div> 
            <div id="base-stats-elements">
                <p class="base-stats-worth">Sp. Def</p><p class="base-stats-result"><b>${spDef}</b></p><div class="base-stats-lineBox"><div class="base-stats-line5"></div></div>

            </div>
            <div id="base-stats-elements">
                <p class="base-stats-worth">Speed</p><p class="base-stats-result"><b>${speed}</b></p><div class="base-stats-lineBox"><div class="base-stats-line6"></div></div>

            </div>`;
            event.stopPropagation();


}

//function to go back to the main page 
function backtoBackground(){

        document.getElementById('pokemonElementBackground').classList.add('d-none');
        showPokemonOverview();
   
   

}

