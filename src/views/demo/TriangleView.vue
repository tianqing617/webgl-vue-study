<template>
  <div class="triangle-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import earcut from 'earcut'
import { draw, Vector2D, isPointInPath } from '@/utils';


const canvasRef = ref<HTMLCanvasElement | null>(null)

function generatePoints() {
  const points = [new Vector2D(0, 100)]
  for(let i = 1; i <= 4; i++) {
    const p = points[0].copy().rotate(i * Math.PI * 0.4)
    points.push(p)
  }

  return points.map(item => item.location)
}

// 画多边形
function drawPentagon(ctx: CanvasRenderingContext2D) {
  const polygon = generatePoints()
  console.log('polygon', polygon)

  // 判断点是否在多边形内
  const cells = earcut(polygon.flat())
  console.log('cells', cells)
  const mousePoints = new Vector2D(1000, 0)
  const result = isPointInPath(polygon, cells, mousePoints)
  console.log('result',result)

  ctx.save()
  ctx.translate(-128, 0)
  draw(polygon, ctx, { close: true })
  ctx.restore()
}

// 画五角星
function drawStart(ctx: CanvasRenderingContext2D) {
  const polygon = generatePoints()
  const starts = [
    polygon[0],
    polygon[2],
    polygon[4],
    polygon[1],
    polygon[3],
  ]

  ctx.save()
  ctx.translate(128, 0)
  draw(starts, ctx, { close: true, fillStyle: 'black', rule: 'evenodd' })
  ctx.restore()
}

onMounted(() => {
  console.log('earcut', earcut)
  const ctx = canvasRef.value?.getContext('2d')

  if (ctx) {
    // 转换坐标系
    ctx.translate(256, 256)
    ctx.scale(1, -1)

    drawPentagon(ctx)
    drawStart(ctx)
  }
})
</script>