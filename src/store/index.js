/*
    vuex的核心管理对象模块: store对象(向外暴露)
*/
// 因为是vue的插件，前提引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'

// 引入axios
import axios from 'axios'

// 引入自定义模块
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 声明使用vuex
Vue.use(Vuex)
/*
    api数据
    0全部，1女装，2男装，3内衣，4美妆，5配饰，
    6鞋品，7箱包，8儿童，9母婴，10居家，11美食，
    12数码，13家电，14其他，15车品，16文体，17宠物
    （支持多类目筛选，如1,2获取类目为女装、男装的商品，逗号仅限英文逗号）
*/

// 修改获取的api数据
let nav = 3
let cid = 0
let url = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/100/min_id/1`

// womenwear
// cid = 1
cid = 1
let urlwomen = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/100/min_id/1`



// ==================================
// 状态对象
// const state = {
//     // 初始化状态
//     allCommodities: [],
//     // 所有商品的数据
//     data: []
// }

// // 包含多个更新state函数的对象(状态对象)
// const mutations = {
//     // 增加的mutation
//     ADD(state) {
//         // 更新状态
//         state.allCommodities = [12]
//     },
//     getdata(state, res ) {
//         state.data = res.data.data
//         console.log(state.data)
//     }

// }

// 包含多个对应事件回调函数的对象
// const actions = {
//     // 名字要相互对应
//     // 增加的action
//     add({ commit, state }) {
//         // 提交mutation
//         commit('ADD')
//     },
//     // 获取商品的全部数据
//     getdata(context) {
//         axios.get(url)
//             .then((res) => {
//                 context.commit('getdata', res)
//             })
//     },
//     // 获取女装的数据
//     // getwomendata(context) {
//     //     axios.get(urlwomen)
//     //         .then((res) => {
//     //             context.commit('getdata', res)
//     //         })
//     // }

// }

// 包含多个getter计算属性函数的对象
// const getters = {
//     // 定义计算属性，是一个函数，返回一个结果
//     // 不需要调用，只需要读取属性值
//     addpush(state) {
//         return state.allCommodities.push(1)
//     }
// }

// store对象
// Store是一个构造函数
export default new Vuex.Store({
    // 四个常用配置
    // 状态数据
    state,
    // 包含多个更新state函数的对象(状态对象)
    mutations,
    // 包含多个对应事件回调函数的对象
    actions,
    // 包含多个getter计算属性函数的对象
    getters

})