<script>
  import CityStore from '../stores/CityStore';
  import Button from '../shared/Button.svelte';

  let name;

  const addCity = () => {
    const city = {id: Math.random(), name}
    console.log("city", city);
    CityStore.update(currCities => {
      return [city, ...currCities];
    });
  }
</script>


<section class="container mt-3 mb-4">
  <div class="row justify-content-center">
    <div class="col-md-3">
      <input type="search" class="form-control" bind:value={name}>
    </div>
    <div class="col-md-1">
      <Button on:click={addCity}>Add</Button>
    </div>
  </div>
</section>
