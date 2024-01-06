<template>
  <div class="webgl-view">
    <canvas ref="canvasRef" width="512" height="512"></canvas>
    <canvas ref="canvasRef2" width="512" height="512"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type PolicyRandomTriangle } from '@/utils/types'

function helloWorld(gl: WebGLRenderingContext) {
    // 2. 创建WebGL程序
    // 2.1 WebGLProgram 对象，它是给 GPU 最终运行着色器的程序，而不是我们正在写的三角形的 JavaScript 程序
    // 以下代码是：创建两个着色器（Shader）
    // 顶点着色器（Vertex Shader）负责处理图形的顶点信息，
    // 片元着色器（Fragment Shader）负责处理图形的像素信息。
    /**
     * webGL语法说明(attribute)：
     * 1. 在 GLSL 中，attribute 表示声明顶点相关的变量，vec2 是变量的类型，它表示一个二维向量，position 是变量名
     * 2. attribute变量是对应于顶点的，几何图形有几个顶点，就要提供几份attribute数据
     * 3. attribute变量只能在顶点着色器中使用，如果要在片元着色器中使用，需要通过varying变量将它传给片元着色器
     * 
     * webGL语法说明(uniform)：在welcomeTriangle方法中使用
     * 1. uniform声明的变量和其他语言中的常量一样，赋值给uniform变量的值在shader执行的过程中不可改变。
     * 2. uniform变量既可以在顶点着色器中使用，也可以在片元着色器中使用
     */
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

// 练习二，欢迎三角形彩带
// 创建随机三角形属性的函数
function randomTriangles(): PolicyRandomTriangle {
  const u_color = [Math.random(), Math.random(), Math.random(), 1.0]; // 随机颜色
  const u_rotation = Math.random() * Math.PI; // 初始旋转角度
  const u_scale = Math.random() * 0.05 + 0.03; // 初始大小
  const u_time = 0; // 初始时间
  const u_duration = 3.0; // 持续3秒钟

  const rad = Math.random() * Math.PI * 2;
  const u_dir = [Math.cos(rad), Math.sin(rad)]; // 运动方向
  const startTime = performance.now(); // 创建时间

  return { u_color, u_rotation, u_scale, u_time, u_duration, u_dir, startTime };
}

function welcomeTriangle(gl: WebGLRenderingContext) {
  const vertex = `
    attribute vec2 position;

    uniform float u_rotation;
    uniform float u_time;
    uniform float u_duration;
    uniform float u_scale;
    uniform vec2 u_dir;

    varying float vP;

    void main() {
      // 当前动画进度
      float p = min(1.0, u_time / u_duration);
      float rad = u_rotation + 3.14 * 10.0 * p;
      // 绽放比例
      float scale = u_scale * p * (2.0 - p);
      // 二维向量
      vec2 offset = 2.0 * u_dir * p * p;
      // 偏移矩阵
      mat3 translateMatrix = mat3(
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        offset.x, offset.y, 1.0
      );
      // 旋转矩阵
      mat3 rotateMatrix = mat3(
        cos(rad), sin(rad), 0.0,
        -sin(rad), cos(rad), 0.0,
        0.0, 0.0, 1.0
      );
      // 绽放矩阵
      mat3 scaleMatrix = mat3(
        scale, 0.0, 0.0,
        0.0, scale, 0.0,
        0.0, 0.0, 1.0
      );
      gl_PointSize = 1.0;
      // 仿射变换
      vec3 pos = translateMatrix * rotateMatrix * scaleMatrix * vec3(position, 1.0);
      gl_Position = vec4(pos, 1.0);
      vP = p;
    }
  `;

  const fragment = `
    precision mediump float;
    
    uniform vec4 u_color;

    varying float vP;
    // 片元着色器中，给三角形着色
    void main()
    {
      gl_FragColor.xyz = u_color.xyz;
      gl_FragColor.a = (1.0 - vP) * u_color.a;
    }    
  `;

  const vertexShader = gl.createShader(gl.VERTEX_SHADER) as WebGLShader
  gl.shaderSource(vertexShader, vertex);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)as WebGLShader
  gl.shaderSource(fragmentShader, fragment);
  gl.compileShader(fragmentShader);

  const program = gl.createProgram() as WebGLProgram
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const position = new Float32Array([
    -1, -1,
    0, 1,
    1, -1,
  ]);
  const bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, position, gl.STATIC_DRAW);

  const vPosition = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vPosition);

  /**
   * 将随机三角形信息传给shader里的uniform变量
   * @param gl webgl上下文
   * @param param1 随机三角形属性的参数
   * 
   * uniform相关方法说明：
   * 1. gl.uniform1f 传入一个浮点数，对应的uniform变量的类型为float
   * 2. gl.uniform4f 传入四个浮点数，对应的uniform变量的类型为float[4]
   * 3. gl.uniform3fv 传入一个三维向量，对应的uniform变量类型为vec3
   * 4. gl.uniformMatrix4fv 传入一个4*4的矩阵，对应的uniform变量类型为mat4
   * 参考地址：https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/uniform
   */
  function setUniforms(gl: WebGLRenderingContext, { u_color, u_rotation, u_scale, u_time, u_duration, u_dir }: PolicyRandomTriangle) {
    let loc = gl.getUniformLocation(program, 'u_color');
    gl.uniform4fv(loc, u_color);

    loc = gl.getUniformLocation(program, 'u_rotation');
    gl.uniform1f(loc, u_rotation);

    loc = gl.getUniformLocation(program, 'u_scale');
    gl.uniform1f(loc, u_scale);

    loc = gl.getUniformLocation(program, 'u_time');
    gl.uniform1f(loc, u_time);

    loc = gl.getUniformLocation(program, 'u_duration');
    gl.uniform1f(loc, u_duration);

    loc = gl.getUniformLocation(program, 'u_dir');
    gl.uniform2fv(loc, u_dir);
  }

  let triangles: PolicyRandomTriangle[] = [];
  /**
   * 使用requestAnimationFrame实现动画
   * 1. 每次新建数个随机三角形，然后依次修改所有三角形的u_item(始终时间)属性
   * 2. 通过setUniforms方法将修改属性更新到shader中
   */
  function update() {
    for(let i = 0; i < 5 * Math.random(); i++) {
      triangles.push(randomTriangles());
    }
    gl.clear(gl.COLOR_BUFFER_BIT);
    triangles.forEach((triangle) => {
      triangle.u_time = (performance.now() - triangle.startTime) / 1000;
      setUniforms(gl, triangle);
      gl.drawArrays(gl.TRIANGLES, 0, position.length / 2);
    });

    triangles = triangles.filter((triangle) => {
      return triangle.u_time <= triangle.u_duration;
    });
    requestAnimationFrame(update);
  }

  // 调用update方法
  requestAnimationFrame(update);
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasRef2 = ref<HTMLCanvasElement | null>(null)
onMounted(() => {
  // 1. 创建webgl上下文
  const ctx = canvasRef.value?.getContext('webgl')
  const ctx2 = canvasRef2.value?.getContext('webgl')

  if (ctx) helloWorld(ctx)
  if (ctx2) welcomeTriangle(ctx2)
})
</script>

<style scoped>
.webgl-view {
  > canvas {
    margin-right: 10px;
  }
}
</style>