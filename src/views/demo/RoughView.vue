<template>
  <div class="rough-view">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import rough from 'roughjs';

defineOptions({
  name: 'RoughView',
});

function drawRectangle(el:HTMLCanvasElement) {
  const rc = rough.canvas(el);
  rc.rectangle(10, 10, 80, 20); // x, y, width, height
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  console.log('ref', canvasRef)
  if (canvasRef.value) {
    drawRectangle(canvasRef.value)
  }
})
</script>

<style scoped>
.rough-view {
  height: 100%;
}
canvas {
  height: 100%;
  width: 100%;   
}
</style>