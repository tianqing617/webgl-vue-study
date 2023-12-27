<template>
  <div class="rough-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
  }
})
</script>