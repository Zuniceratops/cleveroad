//получение данных локации 
async function getLocation(){
    try{
      const response = await axios.get('http://api.open-notify.org/iss-now.json')
    }catch(error){
        console.error(error)
    }
}
getLocation();

