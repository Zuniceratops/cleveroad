const astronautList = document.querySelector('#card');

const lon = document.querySelector('#lon');
const lat = document.querySelector('#lat');

const time = document.querySelector('#time')
const date = document.querySelector('#date')

const countIss = document.querySelector('#countIss')

let timer = null;

//получение данных локации 
async function getLocation(){
    try{
      const response = await axios.get('http://api.open-notify.org/iss-now.json')
      const loc = response.data;
      lon.innerText = loc.iss_position.longitude;
      lat.innerText = loc.iss_position.latitude;
    }catch(error){
        console.error(error);
    }
}
//дата и время UTC
time.innerText = moment.utc().format('HH:mm:ss');
date.innerText = moment().add(7,'days').format('dddd, Do MMMM YYYY') ;

//состав текущего экипажа 
async function getAstronaut() {

  try {
    const response = await axios.get('http://api.open-notify.org/astros.json')
    const res =  response.data;

     //подсчет человек в экипаже
    let issPeople = res.people.filter(function(craft) {
      return craft.iss === 'ISS';
    });

    //вывод карточки астронавта
    res.people.forEach(function(elem){
      let astronaut = createCard(elem);
      astronautList.appendChild(astronaut);
     });     

    //вывод количества человек 
     countIss.innerText = issPeople.length;
    
  }catch(error){
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var map = new L.Map('map', {
      center: new L.LatLng(30.455002, 30.511284),
      zoom: 2,
      layers: [
          new L.TileLayer('https://tms{s}.visicom.ua/2.0.0/planet3/base/{z}/{x}/{y}.png?key=', {
              attribution: 'Данные карт © АО «<a href="https://api.visicom.ua/">Визиком</a>»',
              maxZoom: 19,
              subdomains: '123',
              tms: true
          })
      ]
  });
});



getLocation();
getAstronaut();




function createCard(res) {
  let astronaut = document.createElement('div');
  astronaut.style.width = '20 rem';
  astronaut.classList.add('astronaut','animate');

  astronaut.innerHTML = `
    <div class="card bg-light ">
      <div class="card-body text-center astronaut">
      <div class='container'>
        <i class="fas fa-user-astronaut icon"></i>
        <p class="card-text font-weight-bold">${res.name}</p>
      </div>
    </div>
  `
  return astronaut;
}