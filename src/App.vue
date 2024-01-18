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
        <RouterLink to="/triangle">三角剖分</RouterLink>
        <RouterLink to="/webgl">WebGL</RouterLink>
        <RouterLink to="/grids">Grids</RouterLink>
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
