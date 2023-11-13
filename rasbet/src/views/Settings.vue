<template>
    <div class="mainDiv">
        <v-container>
            <SettingsPage/>
        </v-container>
    </div>
</template>
<script>
import SettingsPage from '../components/SettingsPage.vue'
export default
{
    name: 'Settings',
    components: {
        SettingsPage,
    }
}
</script>