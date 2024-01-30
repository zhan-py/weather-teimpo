<script>
  import CityStore from '../stores/CityStore';
  import WeatherSummary from "./WeatherSummary.svelte";
  import { flip } from 'svelte/animate';
  import { fade, slide, scale } from 'svelte/transition';
</script>


<div class="weather-list container">
  {#each $CityStore as city (city.id)}
    <div in:fade out:scale|local animate:flip={{duration: 500}} class="m-4"> 
      <WeatherSummary city={city.name} cityObj={city} on:checkout/> 
    </div>
  {:else}
    <p>No weather info to show. Search in the top bar to explore!</p>
  {/each}
</div>


<style>
  .weather-list {
    max-width: 720px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; 
  }
</style>