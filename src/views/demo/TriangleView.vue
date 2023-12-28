<template>
  <div class="triangle-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import { Vector2D } from '@/utils/lib'
// import { draw } from '@/utils/index'

const canvasRef = ref<HTMLCanvasElement | null>(null)

function generatePoints() {
  const points = [ new Vector2D(0, 100)]
  for(let i = 1; i <= 4; i++) {
    const p = points[0].copy().rotate(i * Math.PI * 0.4)
    points.push(p)
  }

  return points
}
function drawStar(ctx: CanvasRenderingContext2D) {
  const polygon = generatePoints()
  console.log('polygon', polygon)
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')

  if (ctx) {
    // 转换坐标系
    ctx.translate(256, 256)
    ctx.scale(1, -1)

    drawStar(ctx)
  }
})
</script>