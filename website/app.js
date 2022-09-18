/* Global Variables */

// Personal API Key for OpenWeatherMap API
const apiKey = '53e08f62366a3db07a82785441b1619b&units=imperial';

const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const followURL = `&appid=`
const generate = document.getElementById('generate');
let currentDate;
let feelings;
const tempdiv = document.getElementById('temp');
const contentdiv = document.getElementById('content');
const datediv = document.getElementById('date');

/* End of Global Variables */

//helper functions

// Create a new date instance dynamically with JS
function newDate(){                                               
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate;
}

//End of helper functions

//main functions

//returns temperature
async function getWeather(baseURL,followURL,apiKey){
    currentDate = newDate();
    feelings = document.getElementById('feelings').value;
    const zip = document.getElementById('zip').value;
    const weatherObject = await fetch(baseURL+zip+followURL+apiKey);
    const weatherData = await weatherObject.json();
    try {
        const temperature = weatherData.main.temp;
        return temperature;
    }catch(error){
        console.log('error',error);
    }
}
//format the object and send it to the server
async function postData(url,enterData){
    const res = await fetch(url,{
                method:'POST',
                credentials:'same-origin',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(enterData)
                });
    const translatedres = await res.json();
    try{
    
    }catch(error){
        console.log('error',error);
    }
}
//get data back and update UI
async function getAndUpdate(){
    const serverData = await fetch('/sendData');
    const finalData = await serverData.json();
    try{
    contentdiv.innerHTML = finalData.feel;
    tempdiv.innerHTML = finalData.temp;
    datediv.innerHTML = finalData.date;
    }catch(error){
        console.log('error',error);
    }
}
//listener function to button click
function action(){
    getWeather(baseURL,followURL,apiKey)
    .then((x) => {
        return postData('/newEntry',{temp : x , date : currentDate , feel : feelings});})
    .then(()=>{
        getAndUpdate();})
}

//end of main functions

//add event listener to button
generate.addEventListener('click',action);                                     

