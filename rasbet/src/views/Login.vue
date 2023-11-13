<template>
<div class="mainContainer">
    <v-container>
        <LoginPage v-bind:merda="merda"/>
    </v-container>
    </div>
</template>
<script>
import LoginPage from '../components/LoginPage.vue'
export default
{
    name: 'Login',
    components: {
        LoginPage,
    },
    data : function()
    {
        return {
            merda: 'merda',
        }
    },
}
</script>
<style>

/* Styles for container Login Page */
.mainContainer {
  background-image:url("https://wallpapercave.com/wp/wp8054901.jpg"); 
  background-size: cover;
  height: 100%;
}

</style>