<template>
    <div class="mainDiv">
        <v-container>
            <PayBetPage/>
        </v-container>
    </div>
</template>
<script>
import PayBetPage from '../components/PayBetPage.vue'
export default
{
    name: 'PayBet',
    components: {
        PayBetPage,
    }
}
</script>
<style>
.mainDiv {
    height: 100% !important;
    width: 100vw;
    background-color: #e0e0e0!important;
    margin-top: 0vh;
}
</style>