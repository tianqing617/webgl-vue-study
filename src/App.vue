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
        <RouterLink to="/arc">曲线</RouterLink>
      </nav>
    </div>
  </header>

  <div class="container">
    <RouterView />
  </div>
</template>

<style scoped>
.wrapper {
  height: 60px;
  line-height: 60px;
}
nav a {
  margin-right: 10px;
}
.container {
  flex: 1;
}
</style>
