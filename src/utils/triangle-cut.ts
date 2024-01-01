// 三角剖分相关方法
import { Vector2D } from './vector2d'
import type {
  // PolicyVector2D,
  PolicyCoordinateArray
} from './types'

/**
 * 判断一个点，是否在三角形内，含三角形的边上
 * @param p1 三角形点P1的坐标
 * @param p2 三角形点P2的坐标
 * @param p3 三角形点P3的坐标
 * @param point 一个点的坐标
 * @returns 布尔值，是否在三角形内
 */
export function inTriangle(
  p1: Vector2D,
  p2: Vector2D,
  p3: Vector2D,
  point: Vector2D,
) {
  // 三角形的，三个边向量
  const a = p2.copy().sub(p1)
  const b = p3.copy().sub(p2)
  const c = p1.copy().sub(p3)

  // 一个点，分别到三角形三个顶点，的向量
  const u1 = point.copy().sub(p1)
  const u2 = point.copy().sub(p2)
  const u3 = point.copy().sub(p3)

  // 获取一个点到，三角形其中一个顶点的向量，的差乘符号
  const s1 = Math.sign(a.cross(u1))
  // 判断点，是否在三角形的一个边上
  let p = a.dot(u1) / a.length ** 2
  if (s1 === 0 && p >= 0 && p <= 1) return true

  const s2 = Math.sign(b.cross(u2))
  p = b.dot(u1) / b.length ** 2
  if (s2 === 0 && p >= 0 && p <= 1) return true

  const s3 = Math.sign(c.cross(u3))
  p = c.dot(u1) / c.length ** 2
  if (s3 === 0 && p >= 0 && p <= 1) return true

  return s1 === s2 && s2 === s3
}

/**
 * 根据三角剖分的结果，判断一个点，是否在三角形内
 * @param polygon vertices：多边形坐标集合；cells：三角剖分后的结果
 * @param point 一个点坐标
 * @returns 一个点，是否在多边形内
 */
export function isPointInPath(
  vertices: PolicyCoordinateArray,
  cells : number[], // [1, 5, 3] 表示三角形第1个、第5个、第3个，剖分的三角形
  point: Vector2D,
) {
  let ret = false
  for(let i = 0; i < cells.length; i += 3) {
    const p1 = new Vector2D(...vertices[cells[i]])
    const p2 = new Vector2D(...vertices[cells[i + 1]])
    const p3 = new Vector2D(...vertices[cells[i + 2]])

    if (inTriangle(p1, p2, p3, point)) {
      ret = true
      break
    }
  }

  return ret
}