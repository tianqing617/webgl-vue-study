<template>
  <div class="rough-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { arc } from '@/utils/index'

const canvasRef = ref<HTMLCanvasElement | null>(null)

function drawArc(ctx: CanvasRenderingContext2D) {
  ctx.translate(256, 256)
    ctx.scale(1, -1)

    const ret = arc(0, 0, 100, 0, Math.PI)
    console.log('ret', ret)
    
    ret.forEach(item => {
      // @ts-ignore
      ctx.lineTo(...item)
    })

    ctx.stroke()
}
onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d')
  console.log('ctx', ctx)
  if (ctx) {
    drawArc(ctx)
  }
})
</script>