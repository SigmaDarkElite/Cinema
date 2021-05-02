<template>
  <v-app>
    <v-app-bar app color="primary" dark>
        <h1>Cinema</h1> 
    </v-app-bar>
    <v-main>
    <!-- Renderiza la view que a la que se esté navegando -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
