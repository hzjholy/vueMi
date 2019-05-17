// 入口js文件

// 引入rem转换配置
import 'lib-flexible/flexible.js'
// 引入vue
import Vue from 'vue'
// 引入app
import App from './App'
// 引入路由器
import router from './router'
// 全局引入vant组件
import Vant from 'vant'
// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 引入axios
// import axios from 'axios'
// ============
// 原型链不推荐使用
// 由于在其他组件中无法使用axios命令，所以需要将axios改写为Vue的原型属性。
// Vue.prototype.$axios = axios
// 映射store
import store from './store/index'


// 引入mock模拟数据
// 类似css加载打包
// 加载mockServer即可
import './mock/mockServer'


// 引入自定义的全局loading组件,index.js是组件的默认入口
import Loading from './components/ShopList/Loading/index.js'
Vue.use(Loading)

// 全局引入布局组件
// 引入Layout布局 Row,Col
// 引入icon图标Icon 
// 引入Button按钮Button 
// 引入Toast轻提示
import { Row, Col, Icon, Button,NavBar ,Toast } from 'vant';
Vue.use(Row).use(Col).use(Icon).use(Button).use(NavBar).use(Toast);

// 全局引入图标组件
import './common/font/iconfont.css'

// 全局引入初始化css文件
import './common/css/reset.css'




// 创建vue实例
new Vue({
	// render函数是渲染一个视图，然后提供给el挂载
	render: h => h(App),
	// 使用路由
	router,
	// 产生两个结果
	// 多了组件标签 route-link route-view keep-alive
	/*
		<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，
		而不是销毁它们。和 <transition> 相似，
		<keep-alive> 是一个抽象组件：
		它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
		<keep-alive>经常跟 <router-view></router-view>一起搭配
	*/
	// 多了两个属性访问 $route $router
	// 映射store
	// 所有的组件对象都多了一个属性: $store
	// $store相当于store对象
	store
}).$mount('#app')