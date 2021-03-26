const apiKey = "b773ba3167fd9791028d0f0f123759cc";
const fiveApiKey = "479b9c1f7ac985105fde50a940545820"
const currDate = moment().format('MMM Do YYYY');
const dateFiveDay = moment().format('MM/DD/YY')
const citySearch = $("#userInput").val();
let lon = 0;
let lat = 0;

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
      .then(function (response) {
        return (response.json());
      })
      .then(function (response) {
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
        // let cityUv = document.querySelector(".uvIndex");
        lon = response.coord.lon
        lat = response.coord.lat
        // console.log(response)

      });

      let queryUrl = fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + str + '&APPID=' + apiKey + '&units=imperial')
      .then(function (response) {
        return (response.json())
      })
      .then(function (test) {
        // console.log(test);

        for(let i = 0; i != test.list.length; i+=8) {
          // console.log(test.list[i])
          let aDate = test.list[i].dt_txt;
          let bDate = aDate.slice(0, 10)
          let fiveDate = moment(bDate).format('MM/DD/YY');
          let aTemp = test.list[i].main.temp;
          let bTemp = Math.floor(aTemp)
          let aHum = test.list[i].main.humidity
          let aIcon = test.list[i].weather[0].icon
          let bIcon = 'https://openweathermap.org/img/w/' + aIcon + '.png'
          // console.log(aHum)
          // console.log(fiveDate)
          $(".fiveForecast").append('<div class="card col m-2 fiveDay"><div class="card-body"><h5 class="card-title">'+ fiveDate + '</h5><img src=' + bIcon + '><p class="card-text">Temperature: ' + bTemp + '°F</p><p class="card-text">Humidity: ' + aHum + '%</p></div></div>')
        }
      })

      let uvUrl = fetch('http://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial')
      .then(function (response) {
        return (response.json())
      })
      .then(function (uv) {
        // console.log(uv)
        let cityUv = document.querySelector(".uvIndex");
        cityUv.textContent = uv.value
      })
  });

};




getCurrentWeather();
locRecall();
