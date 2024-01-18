<template>
  <div class="grids-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import GlRenderer from 'gl-renderer'
import { onMounted, ref, render } from 'vue'

const vertex = `
  attribute vec2 a_vertexPosition;
  attribute vec2 uv;

  varying vec2 vUv;

  void main() {
    gl_PointSize = 1.0;
    vUv = uv;
    gl_Position = vec4(a_vertexPosition, 1, 1);
  }
`;

// fract: 获取一个数的小数部分。
const fragment = `
  #ifdef GL_ES
  precision mediump float;
  #endif

  varying vec2 vUv;
  uniform float rows;

  void main() {
    vec2 st = fract(vUv * rows);
    float d1 = step(st.x, 0.9);
    float d2 = step(0.1, st.y);
    gl_FragColor.rgb = mix(vec3(0.8), vec3(1.0), d1 * d2);
    gl_FragColor.a = 1.0;
  }
`;

const canvasRef = ref<HTMLCanvasElement | null>(null)

function drawGrids(canvas: HTMLCanvasElement) {
  const renderer = new GlRenderer(canvas)

  // load fragment shader and createProgram
  const program = renderer.compileSync(fragment, vertex)
  renderer.useProgram(program)

  // 1 4 16 32 64
  // renderer.uniforms.rows = 1
  renderer.uniforms.rows = 4

  renderer.setMeshData([{
    positions: [
      [-1, -1],
      [-1, 1],
      [1, 1],
      [1, -1],
    ],
    attributes: {
      uv: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    },
    cells: [[0, 1, 2], [2, 0, 3]],
  }])

  renderer.render()
}

onMounted(() => {
  // 1. 创建webgl上下文
  console.log('GlRenderer', GlRenderer)
  if (canvasRef.value) drawGrids(canvasRef.value)
})
</script>