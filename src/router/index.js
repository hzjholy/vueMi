// 路由器对象模块

// 引入vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入四个路由一级组件
import Home from '../pages/Home/Home.vue'
import Shopcart from '../pages/Shopcart/Shopcart.vue'
import Classify from '../pages/Classify/Classify.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Register from '../pages/Register/Register.vue'
import Test from '../components/Test/Test.vue'
import Detail from '../pages/Detail/Detail.vue'
// 测试props用法
import Nav from '../pages/Detail/Nav.vue'
import Usenav from '../pages/Detail/Usenav.vue'
// 引入订单页面
import Order from '../pages/Order/Order.vue'
// 引入收货地址页面
import Location from '../pages/Location/Location.vue'
import Search from '../pages/Search/Search.vue'
// 三级路由，分类菜单显示
// 新品
import New from '../components/Menu/New.vue'
// 众筹
import Crowd from '../components/Menu/Crowd.vue'
// 测试api接口测试页
import Apitest from '../pages/Apitest/Apitest.vue'

// 生命使用插件
Vue.use(VueRouter)

// 暴露路由器
export default new VueRouter({
    // 配置对象，配置所有路由
    routes: [


        {
            // 会自动跳转路径
            path: '/home',
            name: 'Home',
            component: Home,
            // 控制下面组件显示
            meta: {
                showFooter: true
            }
        },
        {
            path: '/shopcart',
            name: 'Shopcart',
            component: Shopcart,
            // 控制下面组件显示
            meta: {
                showFooter: true
            }
        },
        {
            path: '/classify',
            name: 'Classify',
            component: Classify,
            // 控制下面组件显示
            meta: {
                showFooter: true
            },
            children: [{
                    path: '/classify/new',
                    name: 'New',
                    component: New,
                    meta: {
                        showFooter: true
                    }
                },
                {
                    path: '/classify/crowd',
                    name: 'Crowd',
                    component: Crowd,
                    meta: {
                        showFooter: true
                    }
                },
                // 重定向，默认跳到热门推荐
                // {
                // 	path: '*',
                // 	redirect: {name: 'Hot'}
                // }
            ],
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
            // 控制下面组件显示
            meta: {
                showFooter: true
            }
        },
        {
            // 设置默认显示首页
            // 重定向为首页
            path: '*',
            redirect: '/home'
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            path: '/register',
            name: 'Register',
            component: Register,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        // 测试，主要录入商品数据信息
        {
            path: '/test',
            name: 'Test',
            component: Test,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 根据商品id获取数据
            path: '/detail/:pid',
            name: 'Detail',
            component: Detail,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 根据商品id获取数据
            path: '/nav',
            name: 'Nav',
            component: Nav,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 根据商品id获取数据
            path: '/usenav',
            name: 'Usenav',
            component: Usenav,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 根据商品id获取数据
            path: '/order',
            name: 'Order',
            component: Order,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 根据商品id获取数据
            path: '/location',
            name: 'Location',
            component: Location,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
            // 控制下面组件显示
            meta: {
                // false下面不显示
                showFooter: false
            }
        },
        {
            // 会自动跳转路径
            path: '/apitest',
            name: 'Apitest',
            component: Apitest
        },
    ]
})