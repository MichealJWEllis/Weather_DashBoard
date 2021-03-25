const apiKey = "b773ba3167fd9791028d0f0f123759cc";
const fiveApiKey = "479b9c1f7ac985105fde50a940545820"
const currDate = moment().format('MMM Do YYYY');
const dateFiveDay = moment().format('MM/DD/YY')
const citySearch = $("#userInput").val();

function locRecall() {
  $("#locSearch").click(function () {
    let str = $("#userInput").val();
    let caps = str.toUpperCase();

    if (str === '') {
      alert("Please enter a City to Search!");
      return
    } else {
      $(".lastLookUp").append('<li class="mb-2"><button>' + caps + '</button></li>')
      $("#userInput").val('');
    }
  })
}

function getCurrentWeather() {
  
  $("#locSearch").click(function () {
    let str = $("#userInput").val();
    let weatherUrl = fetch('https://api.openweathermap.org/data/2.5/weather?q=' + str + '&appid=' + apiKey + '&units=imperial')
    .then(function(response) {
      return (response.json());
    })
    .then(function(response) {
      let cityName = document.querySelector(".cityName");
      cityName.textContent = "(" + response.name + ") - "
      let cityDate = document.querySelector(".currentDate");
      cityDate.textContent = currDate
      let cityTemp = document.querySelector(".cityTemp");
      cityTemp.textContent = Math.floor(response.main.temp) + " °F"
      let cityHum = document.querySelector(".cityHumidity");
      cityHum.textContent = response.main.humidity + "%" 
      let cityWind = document.querySelector(".cityWind");
      cityWind.textContent = response.wind.speed + " MPH"
      let cityUv = document.querySelector(".uvIndex");
      cityUv.textContent = response.coord.lon
      
      
    })
    

  });

};

function getFiveDayForecast() {

$("#locSearch").click(function () { 
  let str = $("#userInput").val();
  let queryUrl = fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + str + '&APPID=' + apiKey + '&units=imperial')
  .then(function(response) {
    return (response.json())
  })
  .then(function(test) {
    console.log(test);
  })
  
  })
} 


getCurrentWeather();
locRecall();
getFiveDayForecast();