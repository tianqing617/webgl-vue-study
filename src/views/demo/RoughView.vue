<template>
  <div class="rough-view">
    <canvas ref="canvasRef" width="512" height="256"></canvas>
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

function drawHill(el:HTMLCanvasElement) {
  const rc = rough.canvas(el)
  const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: 'blue' }
  // M 表示 Move to，L 表示 Line to
  rc.path('M76 256L176 156L276 256', hillOpts)
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  console.log('ref', canvasRef)
  if (canvasRef.value) {
    drawRectangle(canvasRef.value)
    drawHill(canvasRef.value)
  }
})
</script>

<style scoped>
.rough-view {
  height: 100%;
  canvas {
    outline: 1px solid #ccc;
  }
}
</style>