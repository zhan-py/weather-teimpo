<script>
  export let type = 'primary';
  export let fixed = false;
</script>


<button class={type} class:fixed={fixed}  on:click>
  <slot></slot>
</button>


<style>
  .primary {
    background-color: #FEFDF6;
    color: #333; 
    border: 2px solid #3E3E3E;
    border-radius: 5px;
    padding: 5px 10px;
    transition: background-color 0.3s ease, box-shadow 0.3s ease; 
  }

  .primary:hover {
    background-color: #FEF6F7; 
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); 
  }

  .primary:active,
  .primary:focus {
    background-color: #FEFDF6 !important; 
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5); 
  }

  .fixed {
    position: fixed;
    right: 20px;
  }
</style>