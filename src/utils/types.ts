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

export type PolicyRandomTriangle = {
  u_color: number[] // 颜色
  u_rotation: number // 初始旋转角度
  u_scale: number // 初始大小
  u_time: number // 初始时间
  u_duration: number // 动画持续时间
  u_dir: number[] // 运动方向
  startTime: number // 创建时间
}