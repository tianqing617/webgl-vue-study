export { parametric, draw } from './curve'

const TAU_SEGMENTS = 60
const TAU = Math.PI * 2
const LINE_SEGMENTS = 60

/**
 * 画圆
 * @param x0 圆心x坐标
 * @param y0 圆心y坐标
 * @param radius 圆半径
 * @param startAng 起始弧度
 * @param endAng 终止弧度
 */
export function arc(x0: number, y0: number, radius: number, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng)
  const ret = [] as [number, number][]
  // const ret = ang === TAU ? [] : [[x0, y0]]
  const segments = Math.round(TAU_SEGMENTS * ang / TAU)

  for(let i = 0; i <= segments; i++) {
    const x = x0 + radius * Math.cos(startAng + ang * i / segments)
    const y = y0 + radius * Math.sin(startAng + ang * i / segments)

    ret.push([x, y])
  }

  return ret
}

/**
 * 画椭圆
 * @param x0 椭圆心x坐标
 * @param y0 椭圆心y坐标
 * @param radiusX 长轴
 * @param radiusY 短轴
 * @param startAng 起始弧度
 * @param endAng 终止弧度
 * @returns 点坐标数组
 */
export function ellipse(x0: number, y0: number, radiusX: number, radiusY: number, startAng = 0, endAng = Math.PI * 2) {
  const ang = Math.min(TAU, endAng - startAng)
  const ret = [] as [number, number][]
  // const ret = ang === TAU ? [] : [[x0, y0]]
  const segments = Math.round(TAU_SEGMENTS * ang / TAU)

  for(let i = 0; i <= segments; i++) {
    const x = x0 + radiusX * Math.cos(startAng + ang * i / segments)
    const y = y0 + radiusY * Math.sin(startAng + ang * i / segments)

    ret.push([x, y])
  }

  return ret
}

/**
 * 画抛物线
 * @param x0 抛物线在x轴上的顶点
 * @param y0 抛物线在y轴上的顶点
 * @param p 焦点到准线的距离
 * @param min 最小弧长
 * @param max 最大弧长
 */
export function parabola(x0: number, y0: number, p: number, min: number, max: number) {
  const ret = [] as [number, number][]
  for(let i = 0; i <= LINE_SEGMENTS; i++) {
    const s = i / 60
    const t = min * (1 - s) + max * s
    const x = x0 + 2 * p * t **2
    const y = y0 + 2 * p * t

    ret.push([x, y])
  }

  return ret
}