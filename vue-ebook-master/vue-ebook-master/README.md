# vue-imooc-ebok

* 参考教程仿写的 [课程地址](https://coding.imooc.com/class/chapter/285.html#Anchor)
## 项目描述
>一款借助 [epubjs](https://www.npmjs.com/package/epubjs/v/0.3.79) 实现的集成电子书解析、阅读项目。项目集成图书推荐、分类、详情，个人书架页面。

* 阅读器工作原理
![image-20200524211537414](http://image.mdashen.com/pic/image-20200524211537414.png)

* 核心知识点
![image-20200524211349799](http://image.mdashen.com/pic/image-20200524211349799.png)

## 环境配置
#### Node.js环境

##### nvm工具的使用

* nvm作用：node version manger,node版本管理工具

* nvm github地址[https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

* nvm安装

  ```sh
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
  ```

###### nvm常用命令

* 换淘宝源

```sh
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node
```

* 其他

```sh
nvm install node // 安装最新版nodejs
nvm install 10.10.0 // 安装指定版本
nvm use 10.10.0 		// 切换到指定版本
```



#### Vue CLI 3.0环境搭建

* 卸载老版本`npm unistall vue-cli -g`
* 安装新版本 `npm install -g @vue/cli`
* 原型开发 `npm install -g@vue/cli-service-global`
* `npm i -g @vue/cli-service-global`

##### vue.config.js文件配置

* 作用：解决production模式下路径问题(虽然我没看懂代码╮(￣▽￣)╭)

* 注意：[baseUrl在Vue CLI 3.3被废弃，新版本使用publicPath](https://cli.vuejs.org/zh/config/#baseurl)

```javascript
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/'
}
```

##### Vue-remote-devtools调试工具

> 此工具与Chrome插件功能相同，一个是浏览器扩展，一个独立分离出来，可以不安装

[GitHub地址](https://github.com/vuejs/vue-devtools/tree/master/shells/electron#vue-remote-devtools)

* 安装 `npm install -g @vue/devtools` 添加 `--verbose`可以查看安装进度，以及请求地址

  > [npm 配置](https://docs.npmjs.com/misc/config)

> [Electron](https://www.electronjs.org/docs/tutorial/installation)，安装上述工具时，可能会需要安装这个Electron，不过由于网络的原因，会下载失败。
>
> 修改 ~/.npmrc 文件，添加一行ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"

* 添加`<script src="http://localhost:8098"></script>` 到/public/index.html
  * 项目上线时，要删除掉这句话



#### epubjs扩展

```sh
npm i --save epubjs
```

#### sass扩展

```sh
npm i --save-dev node-sass sass-loader
```

###### sass报错：this.getResolve is not a function

* 版本过高引起的，或其他低版本的不适用高版本sass

* 可降低sass版本解决

  ~~~sh
  npm uninstall sass-loader
  npm i -D sass-loader@7.3.1
  ~~~

#### web字体引入

##### 谷歌字体api

* 谷歌字体api [https://developers.google.com/fonts/docs/css2](https://developers.google.com/fonts/docs/css2)

使用方法

![image-20200529111040856](http://image.mdashen.com/pic/image-20200529111040856.png)

##### [三方汉化]谷歌字体api

* 谷歌中文字体api(第三方汉化)：[地址](http://www.googlefonts.net/)

![image-20200606140320118](http://image.mdashen.com/pic/image-20200606140320118.png)

```css
font-family: 'Hanalei Fill', cursive;
font-family: 'Kirang Haerang', cursive;
font-family: 'Merriweather', serif;
font-family: 'MedievalSharp', cursive;
font-family: 'Ranga', cursive;
```





#### Nignx搭建静态服务器

[Nginx.org](http://nginx.org/en/download.html)

* mac上安装Nignx需要先安装brew

  * ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    ```

  * 一般来说会由于网络原因，安装失败(挂代理也不能使用：git默认不走代理，即使能正常访问GitHub，clone仓库时也非常慢，所以需要[为git配置代理](http://baijiahao.baidu.com/s?id=1603409484949165821))

  * 国内下载方式` /bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`

  * 参考链接，[知乎](https://zhuanlan.zhihu.com/p/111014448) , [gitee](https://gitee.com/cunkai/HomebrewCN)

* brew 安装nginx

~~~sh
brew install nginx
~~~

* 运行nginx`sudo nginx`

  配置文件地址：`/usr/local/etc/nginx/nginx.conf`

* 停止运行 `sudo nginx -s stop`

* 重新加载 `sudo nginx -s reload`

##### 外链配置

项目根目录新建`.env.development`文件和 `.env.production` 文件

~~~配置文件
VUE_APP_RES_URL=http://127.0.0.1:9001/
~~~

* 外部引用举例

* ~~~javascript
  initGlobalStyle () {
        console.log(this.defaultTheme)
        addCss(`${process.env.VUE_APP_RES_URL}/themes/theme_eye.css`)
      },
  ~~~

##### nginx配置相关

* 需将 `autoindex on;` 才可以访问目录

![image-20200721231734769](http://image.mdashen.com/pic/image-20200721231734769.png)

## 后续
更多详细文档请转：https://blog.csdn.net/qq_44104254/article/details/108745861

或下载笔记源文档md格式：[下载链接](https://image.mdashen.com/%E5%B0%8F%E6%85%95%E8%AF%BB%E4%B9%A6web%E7%AB%AF%E7%AC%94%E8%AE%B0.md)