<template>
  <div class="rough-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
// @ts-ignore
import { Vector2D } from '@/utils/lib'
import { arc, ellipse, parabola, parametric } from '@/utils/index'

const canvasRef = ref<HTMLCanvasElement | null>(null)

function drawLine(ret: [number, number][], ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.lineWidth = 2
  ctx.moveTo(...ret[0])
  ret.forEach(item => {
    ctx.lineTo(...item)
  })

  ctx.stroke()
}

function drawArc(ctx: CanvasRenderingContext2D) {
  // const ret = arc(0, 0, 100, 0, Math.PI)
  const ret = arc(0, 0, 100, 0, Math.PI * 2)
  console.log('ret', ret)
  // ctx.save()
  // 开始一个新的路径
  ctx.strokeStyle = 'black';
  drawLine(ret, ctx)

  // 使用closePath闭合路径
  // ctx.closePath()
  // ctx.restore()
}

function drawEllipse(ctx: CanvasRenderingContext2D) {
  const ret = ellipse(0, 0, 200, 100)
  console.log('ret', ret)
  ctx.strokeStyle = 'blue';
  drawLine(ret, ctx)
}

function drawParabola(ctx: CanvasRenderingContext2D) {
  const ret = parabola(0, 0, 4, -Math.PI, Math.PI)
  console.log('ret', ret)
  ctx.strokeStyle = 'red'
  drawLine(ret, ctx)
}

function drawHelix(ctx: CanvasRenderingContext2D) {
  const helical = parametric(
    (t: number, l: number) => l * t * Math.cos(t),
    (t: number, l: number) => l * t * Math.sin(t),
  )

  helical(0, 50, 500, 5).draw(ctx, { strokeStyle: 'purple' })
}

function drawBezier(ctx: CanvasRenderingContext2D) {
  const quadricBezier = parametric(
   (t: number, [{ x: x0 }, { x: x1 }, { x: x2 }]: any) => (1 - t) ** 2 * x0 + 2 * t * (1 - t) * x1 + t ** 2 * x2,
   (t: number, [{ y: y0 }, { y: y1 }, { y: y2 }]: any) => (1 - t) ** 2 * y0 + 2 * t * (1 - t) * y1 + t ** 2 * y2,
  )

  const p0 = new Vector2D(0, 0)
  const p1 = new Vector2D(100, 0).rotate(0.75)
  const p2 = new Vector2D(200, 0)

  quadricBezier(0, 1, 100, [p0, p1, p2]).draw(ctx, { strokeStyle: 'green' })
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')
  // console.log('ctx', ctx)
  if (ctx) {
    // 转换坐标系
    ctx.translate(256, 256)
    ctx.scale(1, -1)

    drawArc(ctx)
    drawEllipse(ctx)
    drawParabola(ctx)
    drawHelix(ctx)
    drawBezier(ctx)
  }
})
</script>