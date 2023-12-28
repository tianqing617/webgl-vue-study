/**
 * 根据x和y坐标，绘制曲线
 * @param points x和y坐标
 * @param context Canvas上下文对象
 * @param param2 绘制参数
 */
export function draw(
  points: [number, number][],
  context: CanvasRenderingContext2D,
  {
    strokeStyle = 'black',
    fillStyle = null,
    close = false,
  } = {}) {
    context.strokeStyle = strokeStyle
    context.beginPath()
    context.moveTo(...points[0])

    for(let i = 1; i < points.length; i++) {
      context.lineTo(...points[i])
    }

    if (close) context.closePath()
    if (fillStyle) {
      context.fillStyle = fillStyle
      context.fill()
    }
    
    context.stroke()
}

/**
 * 获取坐标数组和绘制方法
 * @param xFunc x坐标计算回调函数
 * @param yFunc y坐标计算回调函数
 * @returns 绘制方法和坐标数组对象
 */
export function parametric(xFunc: any, yFunc: any) {
  /**
   * @param start 绘制起始数值（关键范围参数）
   * @param end   绘制终止数值（关键范围参数）
   * @param seg   采样点个数
   * @param args  最终传为回调函数xFunc和yFunc
   * @returns 绘制方法和坐标数组对象
   */
  return function(start: number, end: number, seg = 100, ...args: any) {
    const points = [] as [number, number][]
    for(let i = 0; i <= seg; i++) {
      const p = i / seg
      const t = start * (1 - p) + end * p

      const x = xFunc(t, ...args)
      const y = yFunc(t, ...args)
      points.push([x, y])
    }

    return {
      draw: draw.bind(null, points),
      points,
    }
  }
}