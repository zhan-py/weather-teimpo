<script>
  import Temperature from "./Temperature.svelte";
  import DailyWeather from "./DailyWeather.svelte";
  import Button from "../shared/Button.svelte";
  
  export let checkoutCity;
</script>


<div>
  <Button fixed={true} on:click>Back</Button>
  <Temperature {checkoutCity} />
  <DailyWeather {checkoutCity} />
</div>
