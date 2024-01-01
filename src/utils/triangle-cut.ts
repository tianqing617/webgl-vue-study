// 三角剖分相关方法
import type { PolicyVector2D } from './types'

/**
 * 判断一个点，是否在三角形内，含三角形的边上
 * @param p1 三角形点P1的坐标
 * @param p2 三角形点P2的坐标
 * @param p3 三角形点P3的坐标
 * @param point 一个点的坐标
 * @returns 布尔值，是否在三角形内
 */
export function inTriangle(
  p1: PolicyVector2D,
  p2: PolicyVector2D,
  p3: PolicyVector2D,
  point: PolicyVector2D,
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