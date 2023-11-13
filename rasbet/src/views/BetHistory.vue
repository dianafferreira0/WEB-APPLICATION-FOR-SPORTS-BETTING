<template>
    <div class="mainDiv">
        <v-container>
            <BetHistoryPage/>
        </v-container>
    </div>
</template>
<script>
import BetHistoryPage from '../components/BetHistoryPage.vue'
export default
{
    name: 'BetHistory',
    components: {
        BetHistoryPage,
    }
}
</script>