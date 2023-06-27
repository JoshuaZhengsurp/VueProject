import Mock from 'mockjs'
import home from './bookHome'
// import categoryList from './bookCategoryList'
// 后面做查询用的
import flatList from './bookFlatList'
// 图书列表的数据
import list from './bookList'
import shelf from './bookShelf'

// 拦截请求地址，进行数据替换
Mock.mock(/\/book\/home/, 'get', home)
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/flat-list/, 'get', flatList)
