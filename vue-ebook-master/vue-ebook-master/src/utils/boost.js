// eslint-disable-next-line no-extend-native
Array.prototype.pushWidthoutDuplicate = function () {
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (this.indexOf(arg) === -1) {
      // 这里的this代表数组
      this.push(arg)
    }
  }
}
