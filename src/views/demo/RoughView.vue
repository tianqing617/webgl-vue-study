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

// 使用 坐标系与坐标映射 的方式
function drawHill(el:HTMLCanvasElement) {
  const rc = rough.canvas(el)
  console.log('drawHill', rc)
  const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: 'blue' }
  // M 表示 Move to，L 表示 Line to
  rc.path('M76 256L176 156L276 256', hillOpts)
  rc.path('M236 256L336 156L436 256', hillOpts)

  rc.circle(256, 106, 105, {
    stroke: 'red',
    strokeWidth: 4,
    fill: 'rgba(255, 255, 0, 0.4)',
    fillStyle: 'solid',
  })
}

// 使用 坐标系转换 的方式
function drawHill2(el:HTMLCanvasElement) {
  const rc = rough.canvas(el)
  const hillOpts = { roughness: 2.8, strokeWidth: 2, fill: 'blue' }
  console.log('rc', rc)
  // 转换坐标系
  const ctx = el.getContext('2d')
  if (ctx) {
    ctx.translate(256, 256)
    ctx.scale(1, -1)
  }
  
  // M 表示 Move to，L 表示 Line to
  rc.path('M-180 0L-80 100L20 0', hillOpts)
  rc.path('M-20 0L80 100L180 0', hillOpts)

  rc.circle(0, 150, 105, {
    stroke: 'red',
    strokeWidth: 4,
    fill: 'rgba(255, 255, 0, 0.4)',
    fillStyle: 'solid',
  })
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  console.log('ref', canvasRef)
  if (canvasRef.value) {
    drawRectangle(canvasRef.value)
    // drawHill(canvasRef.value)
    drawHill2(canvasRef.value)
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