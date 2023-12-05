<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/rough">Rough</RouterLink>
      </nav>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
</style>
