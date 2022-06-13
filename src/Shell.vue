<template>
  <App />
</template>

<script lang="ts" setup>
import App from './App.vue'
import { provideAuth0 } from './plugins/auth'

provideAuth0()
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;900&family=Poppins:ital,wght@0,100;0,400;0,700;1,100;1,400;1,700&display=swap");

body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  font-family: "Poppins", sans-serif;
}
</style>