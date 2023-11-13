<template>
    <div class="mainDiv">
        <v-container>
            <DepositPage/>
        </v-container>
    </div>
</template>
<script>
import DepositPage from '../components/DepositPage.vue'
export default
{
    name: 'Deposit',
    components: {
        DepositPage,
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