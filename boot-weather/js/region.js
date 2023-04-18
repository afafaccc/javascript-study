// 1. 전체 url 가져오기
const currentURL = location.href;
console.log(location);

// 2. 쿼리스트링 파라미터 가져오기
const urlObj = new URL(currentURL);

// 파라미터의 정보를 가지고 있다
const params = urlObj.searchParams;

// 파라미터의 값을 구한다 params.get("변수명");
const q = params.get("q");
const krcity = params.get("krcity");

console.log(q, krcity);

//3. ajax 이용해 전체 날씨 정보 얻어오기
function getCityWeather(q) {
  var temp = {};
  var urlAPI =
    "https://api.openweathermap.org/data/2.5/weather?appid=4e9177390355d89b1edc54dd2a0a106a&units=metric&lang=kr";

  urlAPI += "&q=" + q;

  $.ajax({
    type: "GET",
    url: urlAPI,
    dataType: "json",
    async: false, //동기상태=>ajax는 기본적으로 비동기다.
    success: function (q) {
      const celsius = q.main.temp;
      const icon = q.weather[0].icon;
      const description = q.weather[0].description;
      const windspeed = q.wind.speed;
      const humidity = q.main.humidity;
      const feels_like = q.main.feels_like;
      const main_weather = q.weather[0].description;
      console.log(q);

      temp.celsius = celsius.toFixed(0);
      temp.icon = icon;
      temp.description = description;
      temp.windspeed = windspeed;
      temp.humidity = humidity;
      temp.feels_like = feels_like;
      temp.main_weather = main_weather;
    },
    error: function (request, status, error) {
      console.log("code:" + request.status);
      console.log("message:" + request.responseText);
      console.log("error:" + error);
    },
  });
  return temp;
}

//4. 데이터 바인딩 작업
$(".region-title").text(`${krcity} 상세날씨`);
let temp = getCityWeather(q);

var iconURL = "https://openweathermap.org/img/wn/" + temp.icon + ".png";

$(".region-icon").attr("src", iconURL);

$(".region-weather").text(`${temp.celsius}℃`);

$(".region-windspeed").text(`${temp.windspeed}km/h`);

$(".region-humidity").text(`${temp.humidity}%`);

$(".region-feels_like").text(`${temp.feels_like}℃`);

$(".region-main_weather").text(`${temp.main_weather}`);
