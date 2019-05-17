// actions
// 通过mutations间接更新state的多个方法对象
import axios from 'axios'
import { RECEIVE_SHOPDATA } from './mutation-types'
let nav = 3
let cid = 0
// 所有商品的api
let url = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取家电
cid = 13
let applianceurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取数码数据的数码的api
cid = 12
let digitalurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取宠物数据
cid = 17
let peturl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取车品数据
cid = 15
let carurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取居家数据
cid = 10
let lifeurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取美食数据
cid = 11
let cateurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`
// 获取箱包数据
cid = 7
let bagurl = `/api/itemlist/apikey/hzjholy/nav/${nav}/cid/${cid}/back/50/min_id/1`

// mockjs
let mockproduct = () => axios('/products')
// 引入所有的mutation-types
import { RECEIVE_MOCKPRODUCTS  } from './mutation-types'


// =====================================
// 获取商品分类的api
let shopListurl = `http://v2.api.haodanku.com/super_classify/apikey/hzjholy`
export default {
    // 异步获取mock数据
    async getmockdata({commit}){
        const result = await mockproduct()
        if(result.code == 0){
            const info = result.data
            commit(RECEIVE_MOCKPRODUCTS,{info})
        }
    }, 
    // ====================
    // 与后台交互
    // 异步获取商品数据
    // 获取商品的全部数据
    async getdata(context) {
        axios.get(url)
            .then((res) => {
                context.commit('getdata', res)
            })
    },
    // 获取家电产品
    async getAppliancedata(context){
    	axios.get(applianceurl)
    		 .then(res => {
    		 	context.commit('getAppliancedata',res)
    		 })
    },
    // 获取数码产品
    async getDigitaldata(context){
        axios.get(digitalurl)
             .then(res => {
                context.commit('getDigitaldata',res)
             })
    },
    // 获取宠物数据
    async getPetdata(context){
        axios.get(peturl)
             .then(res => {
                context.commit('getPetdata',res)
             })
    },
    // 获取车品数据
    async getCardata(context){
        axios.get(carurl)
             .then(res => {
                context.commit('getCardata',res)
             })
    },
    // 获取居家数据
    async getLifedata(context){
        axios.get(lifeurl)
             .then(res => {
                context.commit('getLifedata',res)
             })
    },
    // 获取美食数据
    async getCatedata(context){
        axios.get(cateurl)
             .then(res => {
                context.commit('getCatedata',res)
             })
    },
    // 获取箱包数据
    async getBagdata(context){
        axios.get(bagurl)
             .then(res => {
                context.commit('getBagdata',res)
             })
    },
    // =====================================
    // 获取商品分类列表
    // 后面可以传递回调函数的数据,可传可不传
    async getShopList(context,callback){
        axios.get(shopListurl)
             .then(res => {
                context.commit('getShopList',res)
                // 数据更新了，自己通知组件数据改变
                // 有可能不会传,确保直接获取数据也不会报错
                callback &&  callback()
             })
             
    },
}