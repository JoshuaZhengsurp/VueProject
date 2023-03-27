const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
        '/api': {
            target: 'http://iwenwiki.com:3000',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            }
        }
    }
  }
})
