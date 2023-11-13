<template>
    <div class="mainDiv">
        <v-container>
            <TransactionsPage/>
        </v-container>
    </div>
</template>
<script>
import TransactionsPage from '../components/TransactionsPage.vue'
export default
{
    name: 'Transactions',
    components: {
        TransactionsPage,
    }
}
</script>