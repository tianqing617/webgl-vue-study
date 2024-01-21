<template>
  <div class="mandelbrot-view">
    <!-- 绘制分形图案 -->
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
// 此库没有typescript类
// @ts-ignore型
// import GlRenderer from 'gl-renderer'
import { onMounted, ref } from 'vue'

function drawMandelbrot(canvas: HTMLCanvasElement) {
  console.log('canvas', canvas)
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  // 1. 创建webgl上下文
  if (canvasRef.value) drawMandelbrot(canvasRef.value)
})
</script>