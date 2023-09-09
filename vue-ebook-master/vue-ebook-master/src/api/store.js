import axios from 'axios'
import { setLocalForage } from '../utils/localForage'
const baseUrl = process.env.VUE_APP_BASE_URL
// base是本地接口，是使用mockjs @/src/mock

export function flatList () {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/flat-list`
  })
}
export function home () {
  return axios({
    method: 'get',
    url: `${baseUrl}/book/home`
  })
}
export function detail (book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}
export function list () {
  return axios({
    method: 'get',
    url: `${baseUrl}/book/list`
  })
}
export function shelf () {
  return axios({
    method: 'get',
    url: `${baseUrl}/book/shelf`
  })
}
export function download (book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: ProgressEvent => {
      if (onProgress) {
        onProgress(ProgressEvent)
      }
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob, () => {
        if (onSuccess) onSuccess(res)
      }, err => {
        if (onError) onError(err)
      })
    }).catch(err => {
      if (onError) onError(err)
    })
}
