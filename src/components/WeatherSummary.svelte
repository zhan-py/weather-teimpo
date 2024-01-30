<script>
  import CityStore from '../stores/CityStore';
  import { onMount } from 'svelte'
  import moment from 'moment-timezone';
  import {createEventDispatcher} from 'svelte';

  const apiKey = process.env.API_KEY;
  export let cityObj;
  export let city;
  $: cityName = city.charAt(0).toUpperCase() + city.slice(1);
  let coords = [];
  let weatherData = null;
  let dispatch = createEventDispatcher();
  

  async function getLatLon(city) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const [data] = await response.json()
      const coordinates = [data.lat.toFixed(4), data.lon.toFixed(4)];
      console.log("coordinates", coordinates);
      return coordinates;
    } catch (error) {
      console.error('Error fetching coords data:', error);
      throw error;
    }
  }


  async function getCurrentWeather(lat, lon) {  
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      weatherData = data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }

  }


  const formatDate = (timestamp, timezone) => {
    console.log(timestamp, timezone);
    const date = moment.unix(timestamp).tz(timezone);
    console.log(date);
    return date.format('HH:mm');
  }


  onMount(async () => {
    coords = await getLatLon(city);
    const lat = coords[0];
    const lon = coords[1];
    await getCurrentWeather(lat, lon);

    CityStore.update(currCities => {
      let copiedCitiess = [...currCities];
      cityObj.weather = weatherData;
      return copiedCitiess;
    })

    // weatherData = cityObj.weather
    // console.log(weatherData);
  });


  const handleDelete = (id) => {
    CityStore.update(currCities => {
      return currCities.filter(c => c.id != id)
    })
  }


  const handleCheckout = (obj) => {
    dispatch('checkout', cityObj)
  }
  
</script>


{#if weatherData}
  <div class="card" style="background: #FEFDF6; color: #4B515D; border-radius: 35px;">
    <div class="card-body p-4">

      <div class="d-flex">
        <h6 class="flex-grow-1">{ cityName }</h6>
        <h6>{ formatDate(weatherData.current.dt, weatherData.timezone) }</h6>
      </div>

      <div class="d-flex flex-column text-center mt-5 mb-4">
        <h6 class="display-4 mb-0 font-weight-bold" style="color: #1C2331;"> { Math.round(weatherData.current.temp) }°C </h6>
        <span class="small" style="color: #868B94">{ weatherData.current.weather[0].main }</span>
      </div>

      <div class="d-flex align-items-center">
        <div class="flex-grow-1 me-2" style="font-size: 1rem;">
          <div><span class="ms-1"><i class="bi bi-wind"></i> { Math.round(weatherData.current.wind_speed) } km/h
            </span></div>
          <div><span class="ms-1"><i class="bi bi-moisture"></i> { weatherData.current.humidity }% </span>
          </div>
          <div><span class="ms-1"> Feels like: { Math.round(weatherData.current["feels_like"]) }°C </span>
          </div>
        </div>
        <div class="d-flex ms-5">
          <button class="btn btn-outline-none" on:click={() => handleCheckout(cityObj)}><i class="bi bi-info-circle"></i></button>
          <button class="btn btn-outline-none" on:click={() => handleDelete(cityObj.id)}><i class="bi bi-x-circle"></i></button>
        </div>
      </div>

    </div>
  </div>
{/if}