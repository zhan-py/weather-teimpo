<script>
  import AddCity from './components/AddCity.svelte';
  import Header from './components/Header.svelte';
  import WeatherList from './components/WeatherList.svelte';
  import WeatherDetail from './components/WeatherDetail.svelte';

  //virtual tabs
  let items = ['Summary Info', 'Detailed Info'];
  let activeItem = 'Summary Info';
  let checkoutCity;
  
  const handleCheckout = (e) => {
    activeItem = 'Detailed Info';
    checkoutCity = e.detail;
  }

  const switchActiveItem = () => {
    activeItem = 'Summary Info';
  }
</script>


<Header />

<main> 
  {#if activeItem === 'Summary Info'}
    <AddCity />
    <WeatherList on:checkout={handleCheckout}/>
  {:else if activeItem === 'Detailed Info'}
    <WeatherDetail {checkoutCity} on:click={switchActiveItem}/>
  {/if}
</main>


<style>
  main {
    max-width: 960px;
    margin: 10px auto;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>