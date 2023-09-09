import { realPx } from './utils'
// 存放book模块下的静态变量
export const FONT_SIZE_LIST = [
  // 字号大小
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]
// 字体样式
export const FONT_FAMILY_LIST = [
  { font: 'Merriweather' },
  { font: 'MedievalSharp' },
  { font: 'Hanalei Fill' },
  { font: 'Kirang Haerang' },
  { font: 'Ranga' }
]
// 主题样式
export function themeList (vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#000',
          background: '#fff',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#000',
          background: '#bdbaae',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#000',
          background: '#a6b9a0',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Nigth',
      style: {
        body: {
          color: '#c7c7c7',
          background: '#000',
          'padding-top': `${realPx(48)}px!important`,
          'padding-bottom': `${realPx(48)}px!important`
        }
      }
    }
  ]
}
// 动态添加css文件，改变全局主题样式
export function addCss (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}
// 删除css文件，addCss重复点击会追加多余的文件
export function removeCss (href) {
  // href是要删除的目录
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') &&
      link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}
// 清空所有(4个)的样式css文件
export function removeAllCss () {
  removeCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_local_URL}/themes/theme_night.css`)
}
// 打散目录数据，将三维数组转变为一维数组
export function flatten (array) {
  // return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
  return [].concat(...array.map(v => [v, ...flatten(v.subitems)]))
}
