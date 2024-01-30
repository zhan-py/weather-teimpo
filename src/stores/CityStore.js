import { writable } from "svelte/store";

const CityStore = writable([
  {id: 1, name: 'toronto', weather: {}},
  {id: 2, name: 'New York', weather: {}}
]);

export default CityStore;