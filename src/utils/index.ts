const TAU_SEGMENTS = 60
const TAU = Math.PI * 2

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
  const ret = ang === TAU ? [] : [[x0, y0]]
  const segments = Math.round(TAU_SEGMENTS * ang / TAU)

  for(let i = 0; i <= segments; i++) {
    const x = x0 + radius * Math.cos(startAng + ang * i / segments)
    const y = y0 + radius * Math.sin(startAng + ang * i / segments)

    ret.push([x, y])
  }

  return ret
}