<script>
  import moment from 'moment-timezone';

  export let checkoutCity;
  const weather = checkoutCity.weather;
  const dailyWeather = checkoutCity.weather.daily;

  const getHour = (timestamp, timezone) => {
    const date = moment.unix(timestamp).tz(timezone);
    const hour = date.hour();
    return hour;
  }

  const getWeekDay = (timestamp, timezone) => {
    const date = moment.unix(timestamp).tz(timezone);
    const weekDay = date.format('dddd');
    return weekDay;
  }


  function getIcon(desc, mainDesc, timestamp, timezone) {
    const urlP1 = "https://openweathermap.org/img/wn/";
    const urlP3 = "@2x.png";
    let urlP2DayOrNight;

    const hour = getHour(timestamp, timezone);
    
    switch (true) {
      case (hour >= 19 && hour <= 24):
      case (hour >= 0 && hour <= 4):
        urlP2DayOrNight = "n";
        break;  
      default:
        urlP2DayOrNight = "d";
        break;
    }

    const weatherMappings = {
      "clear sky": "01",
      "few clouds": "02",
      "scattered clouds": "03",
      "broken clouds": "04",
      "shower rain": "09",
      "light intensity shower rain": "09",
      "heavy intensity shower rain": "09",
      "ragged shower rain": "09",
      "freezing rain": "13",
      "light rain": "10",
      "moderate rain": "10",
      "heavy intensity rain": "10",
      "very heavy rain": "10",
      "extreme rain": "10",
      "thunderstorm": "11",
      "Snow": "13",
      "rain and snow": "10",
      "Drizzle": "09",
      "mist": "50",
      "smoke": "50",
      "haze": "50",
      "sand/dust whirls": "50",
      "fog": "50",
      "sand": "50",
      "dust": "50",
      "volcanic ash": "50",
      "squalls": "50",
      "tornado": "50",
      "few clouds: 11-25%": "02",
      "scattered clouds: 25-50%": "03",
      "broken clouds: 51-84%": "04",
      "overcast clouds: 85-100%": "04",
    };
    
    const defaultUrlP2 = "03";  
    const urlP2 = weatherMappings[desc] || weatherMappings[mainDesc] || defaultUrlP2;
    const url = urlP1 + urlP2 + urlP2DayOrNight + urlP3;
    return url;  
  }

</script>


{#if weather}
  <div class="d-flex flex-wrap justify-content-evenly mt-3" id="dailyWeather">
    {#each dailyWeather as w}
      <div class="d-flex flex-column align-items-center">
        <p>{getWeekDay(w.dt, weather.timezone)}</p>
        <img src="{getIcon(w.weather[0].description, w.weather[0].main, weather.current.dt, weather.timezone)}" alt="{w.weather[0].description}">
        <p>{Math.round(w.temp.min) + "°" + " - " + Math.round(w.temp.max) + "°"}</p>
      </div>
    {/each}
  </div>
{/if}
