<template>
  <div class="rough-view">
    <canvas ref="canvasRef" width="512" height="256"></canvas>

    <canvas ref="treeRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import rough from 'roughjs';
import { Vector2D } from '@/utils/lib'

defineOptions({
  name: 'RoughView',
});

function drawRectangle(el:HTMLCanvasElement) {
  const rc = rough.canvas(el);
  rc.rectangle(10, 10, 80, 20); // x, y, width, height
}

// 使用 坐标系与坐标映射 的方式
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// 画树
function drawBranch(
  context: CanvasRenderingContext2D,
  v0: InstanceType<typeof Vector2D>,
  length: number,
  thickness: number,
  dir: number,
  bias: number
) {
  const v = new Vector2D().rotate(dir).scale(length);
  const v1 = v0.copy().add(v);

  context.lineWidth = thickness;
  context.beginPath();
  context.moveTo(v0.x, v0.y);
  context.lineTo(v1.x, v1.y);
  context.stroke();

  // 递归
  if(thickness > 2) {
    // const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
    const left = dir + 0.2
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    // const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
    const right = dir - 0.2
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }
}

function drawTree(el: HTMLCanvasElement) {
  const ctx = el.getContext('2d');

  if (ctx) {
    // 将x轴移到canvas的底部
    ctx.translate(0, el.height);
    // 将y轴翻转180度
    ctx.scale(1, -1);
    ctx.lineCap = 'round';

    const v0 = new Vector2D(256, 0);
    console.log('v0', v0)
    // drawBranch(ctx, v0, 50, 10, 1, 3);
    drawBranch(ctx, v0, 50, 10, Math.PI / 2, 3);
  }
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const treeRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  console.log('ref', canvasRef)
  if (canvasRef.value) {
    drawRectangle(canvasRef.value)
    // drawHill(canvasRef.value)
    drawHill2(canvasRef.value)
  }

  if (treeRef.value) {
    drawTree(treeRef.value)
  }
})
</script>

<style scoped>
.rough-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  canvas {
    outline: 1px solid #ccc;
    margin-bottom: 10px;
  }
}
</style>