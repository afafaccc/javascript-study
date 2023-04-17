// 1. 전체 url 가져오기
const currentURL = location.href;
console.log(currentURL);

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
    success: function (data) {
      console.log(data);
      const celsius = data.main.temp;
      const icon = data.weather[0].icon;

      temp.celsius = celsius.toFixed(0);
      temp.icon = icon;

      // $(".region-weather").text(`${celsius.toFixed(0)}℃`);
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
