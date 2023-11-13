<template>
    <div class="mainDiv">
        <v-container>
            <WithdrawalPage/>
        </v-container>
    </div>
</template>
<script>
import WithdrawalPage from '../components/WithdrawalPage.vue'
export default
{
    name: 'Withdrawal',
    components: {
        WithdrawalPage,
    }
}
</script>