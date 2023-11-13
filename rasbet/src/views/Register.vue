<template>
<div class="mainContainer">
    <v-container>
        <RegisterPage v-bind:merda="merda"/>
    </v-container>
    </div>
</template>
<script>
import RegisterPage from '../components/RegisterPage.vue'
export default
{
    name: 'Register',
    components: {
        RegisterPage,
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
}

</style>