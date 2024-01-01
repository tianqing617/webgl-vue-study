// 2D向量对象封装
// import type { Vector2D } from './types'

export class Vector2D extends Array {
  constructor(x = 1, y = 0) {
    // @ts-ignore
    super(x, y);
  }

  set x(v: number) {
    this[0] = v;
  }

  set y(v: number) {
    this[1] = v;
  }

  get x() {
    return this[0];
  }

  get y() {
    return this[1];
  }

  get length() {
    return Math.hypot(this.x, this.y);
  }

  get dir() {
    return Math.atan2(this.y, this.x);
  }

  get location(): [number, number] {
    return [this.x, this.y]
  }

  copy() {
    return new Vector2D(this.x, this.y);
  }

  add(v: Vector2D) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  sub(v: Vector2D) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  scale(a: number) {
    this.x *= a;
    this.y *= a;
    return this;
  }

  cross(v: Vector2D) {
    return this.x * v.y - v.x * this.y;
  }

  dot(v: Vector2D) {
    return this.x * v.x + v.y * this.y;
  }

  normalize() {
    return this.scale(1 / this.length);
  }

  rotate(rad: number) {
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const [x, y] = this;

    this.x = x * c + y * -s;
    this.y = x * s + y * c;

    return this;
  }
}
