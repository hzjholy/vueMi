/*
	使用mock.js提供mock数据接口
*/

// 引入mock
import Mock from 'mockjs'
// 加载数据
import mockdata from './mockdata.json'

// 向外提供接口
// 返回商品详情的数据
// products名字根据mockdata.json文件对象的名字
Mock.mock('/products',{code: 0 , data: mockdata.products})


// 暴露数据
// 不需要向外暴露任何数据，只需要保证能执行一次即可