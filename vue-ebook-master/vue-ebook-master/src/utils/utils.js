export function px2rem (px) {
  // 与src/assets/styles/minxin.scss中的px2rem()有区别
  // 这里的是方法，那边的是样式
  const ratio = 375 / 10
  return px / ratio
}
export function realPx (px) {
  // 输入rem数值，返回px数值
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
