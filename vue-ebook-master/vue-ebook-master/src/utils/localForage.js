import localForage from 'localforage'
// 封装了一些操作localforage的方法

// 存入数据，key-value-成功回调-失败回调
export function setLocalForage (key, data, cb, cb2) {
  localForage.setItem(key, data).then((value) => {
    if (cb) cb(value)
  }).catch(function (err) {
    if (cb2) cb2(err)
  })
}

// 读取数据
export function getLocalForage (key, cb) {
  localForage.getItem(key, (err, value) => {
    cb(err, value)
  })
}
// 删除key数据
export function removeLocalForage (key, cb, cb2) {
  localForage.removeItem(key).then(function () {
    if (cb) cb()
  }).catch(function (err) {
    if (cb2) cb2(err)
  })
}
// 清空所有indexDb中的数据(离线下载的图书)
export function clearLocalForage (cb, cb2) {
  localForage.clear().then(function () {
    if (cb) cb()
  }).catch(function (err) {
    if (cb2) cb2(err)
  })
}
// 统计indexDB中总共有多少个key
export function lengthLocalForage (cb) {
  localForage.length().then(
    numberOfKeys => {
      if (cb) cb(numberOfKeys)
      console.log(numberOfKeys)
    }).catch(function (err) {
    console.log(err)
  })
}
// 遍历
export function iteratorLocalForage () {
  localForage.iterate(function (value, key, iterationNumber) {
    console.log([key, value])
  }).then(function () {
    console.log('Iteration has completed')
  }).catch(function (err) {
    console.log(err)
  })
}
// 判断，当前浏览器是否支持indexDB数据库
export function support () {
  const indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || null
  if (indexedDB) {
    return true
  } else {
    return false
  }
}
