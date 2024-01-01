// 类型文件

export interface PolicyVector2D {
  x: number
  y: number
  length: number
  dir: number

  copy(): PolicyVector2D
  add(v: PolicyVector2D): PolicyVector2D
  sub(v: PolicyVector2D): PolicyVector2D
  scale(a: number): PolicyVector2D
  cross(v: PolicyVector2D): number
  dot(v: PolicyVector2D): number
  normalize(): number
  rotate(rad: number): PolicyVector2D
}

export type PolicyCoordinateArray = [number, number][]