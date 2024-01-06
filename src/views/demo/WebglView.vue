<template>
  <div class="webgl-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

function helloWorld(gl: WebGLRenderingContext) {
    // 2. 创建WebGL程序
    // 2.1 WebGLProgram 对象，它是给 GPU 最终运行着色器的程序，而不是我们正在写的三角形的 JavaScript 程序
    // 以下代码是：创建两个着色器（Shader）
    // 顶点着色器（Vertex Shader）负责处理图形的顶点信息，
    // 片元着色器（Fragment Shader）负责处理图形的像素信息。
    // 在 GLSL 中，attribute 表示声明变量，vec2 是变量的类型，它表示一个二维向量，position 是变量名
    const vertex = `
      attribute vec2 position;
      varying vec3 color;

      void main() {
        gl_PointSize = 1.0;
        color = vec3(0.5 + position * 0.5, 0.0);
        gl_Position = vec4(position * 0.5, 1.0, 1.0);
      }
    `;

    const fragment = `
      precision mediump float;
      varying vec3 color;

      void main()
      {
        gl_FragColor = vec4(color, 1.0);
      }    
    `;
    
    // 2.2 顶点着色器和片元着色器只是一段代码片段，所以我们要将它们分别创建成 shader 对象。
    const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
    gl.shaderSource(vertexShader, vertex);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER) as WebGLShader
    gl.shaderSource(fragmentShader, fragment);
    gl.compileShader(fragmentShader);

    // 2.3 创建 WebGLProgram 对象，并将这两个 shader 关联到这个 WebGL 程序上
    const program = gl.createProgram() as WebGLProgram
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    // 通过 useProgram 选择启用这个 WebGLProgram 对象
    gl.useProgram(program);
    
    // 3 将数据存入缓冲区
    // 3.1 定义一个类型数组，存储三角形的三个顶点
    const points = new Float32Array([
      -1, -1,
      0, 1,
      1, -1,
    ]);
    
    // 3.2 将定义好的数据写入 WebGL 的缓冲区
    const bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId); // 绑定为当前操作对象
    gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW); // 把当前的数据写入缓存对象

    // 4. 将缓冲区数据读取到 GPU
    // 4.1 将 buffer 的数据绑定给顶点着色器的 position 变量
    // 获取顶点着色器中的position变量的内存地址，即指针
    const vPosition = gl.getAttribLocation(program, 'position');
    // 给变量设置长度和类型
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    // 激活这个变量
    gl.enableVertexAttribArray(vPosition);

    // 5. 执行着色器程序完成绘制
    gl.clear(gl.COLOR_BUFFER_BIT); // 当前画布的内容清除
    // 绘制模式：以三角形为图元、绘制的顶点偏移量、顶点数量
    // points.length是6，故需要除2，得3
    gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  // 1. 创建webgl上下文
  const ctx = canvasRef.value?.getContext('webgl')

  if (ctx) {
    helloWorld(ctx)
  }
})
</script>