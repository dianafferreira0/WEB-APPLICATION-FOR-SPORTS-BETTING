<template>
<div class="mainDiv">
  <v-container>
    <AdminPage />
  </v-container>
</div>
</template>

<script>
  import AdminPage from '../components/AdminPage.vue'

  export default {
    name: 'Admin',

    components: {
      AdminPage,
    },
  }
</script>
