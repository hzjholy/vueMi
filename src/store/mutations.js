// mutations
// 直接更新state的多个方法对象

// 引入所有的mutation-types
import { RECEIVE_MOCKPRODUCTS  } from './mutation-types'

// export default {
// 	// 方法
// 	// [RECEIVE_SHOPDATA] 方法名
// 	// state,{shopdata} 参数
// 	// {shopdata} 接受ajax
// 	[RECEIVE_SHOPDATA] (state,{shopdata}){
// 		state.shopdata = shopdata
// 	}
// }

// 包含多个更新state函数的对象(状态对象)
export default {
    // 增加的mutation
    ADD(state) {
        // 更新状态
        state.allCommodities = [12]
    },
    getdata(state, res) {
        state.data = res.data.data
        console.log('全部商品数据',state.data)
    },
    // 获取商品列表
    getShopList(state,res){
        state.shopList = res.data.general_classify
        console.log('商品分类',state.shopList)
        console.log('分分类',state.shopList[0].data[0])
    },
    // =================================
    // 获取家电数据
    getAppliancedata(state, res) {
        state.appliancedata = res.data.data
        console.log('家电',state.appliancedata)
    },
    // 获取数码数据
    getDigitaldata(state, res) {
        state.digitaldata = res.data.data
        console.log('数码',state.digitaldata)
    },
    // 获取宠物数据
    getPetdata(state, res) {
        state.petdata = res.data.data
        console.log('宠物',state.petdata)
    },
    // 获取车品数据
    getCardata(state, res) {
        state.cardata = res.data.data
        console.log('车品',state.cardata)
    },
    // 获取居家数据
    getLifedata(state, res) {
        state.lifedata = res.data.data
        console.log('居家',state.lifedata)
    },
    // 获取美食数据
    getCatedata(state, res) {
        state.catedata = res.data.data
        console.log('居家',state.catedata)
    },
    // 获取箱包数据
    getBagdata(state, res) {
        state.bagdata = res.data.data
        console.log('居家',state.bagdata)
    },
    [RECEIVE_MOCKPRODUCTS](state,{mockproduct}){
        state.mockproduct = mockproduct
    }


}