import Storage from 'web-storage-cache'

const localStorage = new Storage()

// 设置缓存
export function setLocalStorage (key, value) {
  return localStorage.set(key, value)
}
// 获取缓存值
export function getLocalStorage (key) {
  return localStorage.get(key)
}
// 删除特定缓存
export function removeLocalStorage (key) {
  return localStorage.delete(key)
}
// 清空缓存
export function clearLocalStorage () {
  return localStorage.clear()
}

// 定义图书对象，用来存储每本书对应的字号大小，字体样式、阅读进度等信息
export function setBookObject (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}
// 获取图书信息
export function getBookObject (fileName, key) {
  const book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}
// 获取图书的字体样式
export function getFontFamily (fileName) {
  return getBookObject(fileName, 'fontFamily')
}
// 设置图书字体样式
export function saveFontFamily (fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}
// 获取图书字号
export function getFontSize (fileName) {
  return getBookObject(fileName, 'fontSize')
}
// 设置图书字号
export function saveFontSize (fileName, fontSize) {
  return setBookObject(fileName, 'fontSize', fontSize)
}
// 获取默认语言(cn/en)
export function getLocale () {
  return getLocalStorage('locale')
}
// 设置默认语言(cn/en)
export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}
// 获取默认主题
export function getTheme () {
  return getLocalStorage('theme')
}

// 设置默认主题
export function saveTheme (theme) {
  return setLocalStorage('theme', theme)
}
// 保存阅读进度
export function saveLocation (fileName, location) {
  return setBookObject(fileName, 'location', location)
}
// 获取阅读进度
export function getLocation (fileName) {
  return getBookObject(fileName, 'location')
}
// 获取阅读时间
export function getReadTime (fileName) {
  return getBookObject(fileName, 'readTime')
}
// 设置阅读时间
export function saveReadTime (fileName, readTime) {
  return setBookObject(fileName, 'readTime', readTime)
}
// 获取书签
export function getBookmark (fileName) {
  return getBookObject(fileName, 'bookmark')
}
// 设置书签
export function saveBookmark (fileName, cfi) {
  // cfi 数组，[{"cfi":"startcfi地址","text":"文本内容"},{第二个书签}]
  return setBookObject(fileName, 'bookmark', cfi)
}
// 存入书架内容,传入数组(包含书架中所有图书信息)
export function saveBookShelf (shelf) {
  return setLocalStorage('shelf', shelf)
}
// 获取书架内容
export function getBookShelf () {
  return getLocalStorage('shelf')
}
