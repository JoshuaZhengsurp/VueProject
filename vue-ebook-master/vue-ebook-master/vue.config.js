function mock (app, url, data) {
  app.get(url, (req, res) => {
    res.json(data)
  })
}
const homeData = require('./src/mock/bookHome')
const shelfData = require('./src/mock/bookShelf')
const listData = require('./src/mock/bookList')
const flatListData = require('./src/mock/bookFlatList')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  devServer: {
    before (app) {
      mock(app, '/book/home', homeData)
      mock(app, '/book/shelf', shelfData)
      mock(app, '/book/list', listData)
      mock(app, '/book/flat-list', flatListData)
    }
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 921600,
      maxEntrypointSize: 921600
    }
  }
}
// module.exports = {
//   // 消除net::ERR_CONNECTION_TIMED_OUT错误
//   devServer: {
//     host: '0.0.0.0',
//     port: 8080
//   }
// }
