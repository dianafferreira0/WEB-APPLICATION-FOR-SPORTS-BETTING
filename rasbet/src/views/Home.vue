<template>
<div class="mainDiv">
  <v-container class="containerX">
    <HomePage />
  </v-container>
</div>
</template>

<script>
  import HomePage from '../components/HomePage.vue'

  export default {
    name: 'Home',

    components: {
      HomePage,
    },
  }
</script>
<style>
.containerX {
    max-width: 90vw;
}
</style>