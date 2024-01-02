// 绘制工具

/**
 * 确认坐标0，0点
 * @param ctx Canvas上下文
 */
export function confirmCenter(ctx: CanvasRenderingContext2D) {
  ctx.save()
  
  ctx.arc(0, 0, 10, 0, Math.PI * 2)
  ctx.fillStyle = "red"
  ctx.fill()

  ctx.restore()
}
