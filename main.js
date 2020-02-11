const locateCard = document.querySelector('#locate-card');
const astronautList = document.querySelector('#card');

let timer = null;

//получение данных локации 
async function getLocation(){
    try{
      const response = await axios.get('http://api.open-notify.org/iss-now.json')
      const loc = response.data;
    }catch(error){
        console.error(error);
    }
}

//состав текущего экипажа 
async function getAstronaut() {

  try {
    const people = await axios.get('http://api.open-notify.org/astros.json')
    const res =  people.data;
    res.people.forEach(function(elem){
      let astronaut = createCard(elem);
      astronautList.appendChild(astronaut);
     });

  }catch(error){
    console.error(error);
  }
}

getLocation();
getAstronaut();




function createCard(res) {
  let astronaut = document.createElement('div');
  astronaut.style.width = '20 rem';
  astronaut.classList.add('astronaut','animate');

  astronaut.innerHTML = `
    <div class="card bg-light ">
      <div class="card-body text-center astronaut">
      <p class="card-text">Name: ${res.name}</p>
      <p class="card-text">Craft: ${res.craft}</p>
    </div>
  `
  return astronaut;
}