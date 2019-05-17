<template>
    <div class="order">
        <!-- 头部导航 -->
        <header>
            <van-nav-bar title="我的订单" left-arrow @click-left="back" fixed>
            </van-nav-bar>
        </header>
        <!-- 没有订单信息 -->
        <div class="not-order" v-if="orderCode.length == 0">
            没有订单数据
        </div>
        <!-- 订单数据显示 -->
        <div class="orderInfo" v-for="(item,index) in orderCode">
            <div class="orderTop clearfix">
                <div class="fl text">订单编号:{{item}}</div>
                <div class="fr clearfix">
                    <span class="fl text">{{orderTime[index]}}</span>
                    <span class="fl icon-del">
                    	<!-- item是订单编号 -->
                        <van-icon name="delete" @click="removeOrder(index,item)"></van-icon>
                    </span>
                </div>
            </div>
            <div>
                <van-card :num="item1.count" :price="item1.price" :title="item1.name" :thumb="item1.thumbnail" :origin-price="item1.oldprice" v-for="(item1,index1) in orderDatas[item]" @click="goState(item1.id)">
                </van-card>
            </div>
        </div>
    </div>
</template>
<script>
import { Card } from 'vant'
export default {
    name: 'Order',
    components: {
        [Card.name]: Card,
    },
    data() {
        return {
            // 存储当前用户的订单信息
            // orderDatas: {
            // 	'a001':[{name:12},{name:"were"}],
            // 	'a002':[{name:82},{name:"re"}],
            // },
            orderDatas: {},
            // 当前用户的订单编号
            // orderCode:['a001','a002'],
            orderCode:[
            	// {orderTime: '',orderId:''},
            ],
            // 订单时间
            orderTime: []
        }
    },
    methods: {
        back() {
            // 返回上一级
            this.$router.go(-1)
        },
        // 点击导航跳转页面
        goTo(topath) {
            this.$router.push({ path: topath })
        },
        // 点击商品跳转详情页
        goState(pid){
        	this.$router.push({name: 'Detail', params:{pid}})
        },
        // 删除订单
        // 页面删除
        removeOrder(index,orderId){
        	// =======================================
        	// 逻辑删除
        	// index每个商品的下标
        	// orderId订单id
        	// 订单页面删除
        	this.orderCode.splice(index,1)
        	// 时间删除
        	this.orderTime.splice(index,1)
        	// 删除订单编号，对象删除
        	delete this.orderDatas[orderId]
        	console.log('this.orderCode ==> ' , this.orderCode)
        	console.log('this.orderTime ==> ' , this.orderTime)
        	console.log('this.orderDatas ==> ' , this.orderDatas)
        	// ========================================
        	// 物理删除
        	// 删除本地存储的订单数据
        	// 获取用户id
        	var userId = JSON.parse(localStorage.getItem('userLogin')).userId
        	// 获取本地存储订单数据
        	var allOrderDatas = JSON.parse(localStorage.getItem('order'))
        	// 过滤筛选
        	for(var i = 0 ; i < allOrderDatas.length ; i++){
        		// 需要删除的订单id和全部订单数据的id一样
        		// 并且当前的id用户一致
        		if(orderId == allOrderDatas[i].orderId && userId == allOrderDatas[i].userId){
        			// 删除当前订单的商品
        			// 注意，这里删除会影响之前的下标问题
        			// 会影响原数组
        			allOrderDatas.splice(i,1)
        			// 解决下标变化问题，否则会忽略前面一个
        			i--;
        		}
        	}
        	// 本地存储重新写入
        	localStorage.setItem('order',JSON.stringify(allOrderDatas))
        }

    },
    created() {
        // 请求数据信息
        // 获取订单数据
        var orderData = localStorage.getItem('order')
        // 控制一开始的，防止报错
        orderData = orderData == undefined ? [] : JSON.parse(orderData)
        // 判断是否有订单数据信息
        if (orderData.length === 0) {
            // 订单没有信息数据
            return
        }
        // 筛选当前用户的订单，再根据订单编号进行筛选
        // 获取用户登录状态
        // 数据结构
        /*
			{
				订单编号1: [{},{},{}],
				订单编号2: [{},{},{}],
			}
        */
        var userLogin = JSON.parse(localStorage.getItem('userLogin'))
        if (userLogin) {
            // 用户已经登录状态
           	//遍历订单数据
           	orderData.forEach(v => {
           		// console.log(v)
           		// 判断订单id和登录用户id是否一致
           		// 获取当前用户id的订单数据
           		if(v.userId == userLogin.userId){
           			// 构造订单数据商品数组
           			var arr = []
           			// 获取订单信息
           			// 根据订单编号进行分类
           			// 订单编号信息,根据orderId
           			// 防止多个商品订单编号一样多次推入
           			// 根据orderId一样的商品只推入一次
           			if(this.orderCode.indexOf(v.orderId) === -1){
           				// 没有找到才推入
           				this.orderCode.push(v.orderId)
           				// 存储订单时间
           				this.orderTime.push(v.orderTime)
           				// 筛选订单编号的所有商品信息
           				orderData.forEach(v1 => {
           					if(v1.orderId == v.orderId){
           						// 商品数据推入
           						arr.push(v1)
           					}
           				})
           				// 存储订单商品数据信息
           				this.orderDatas[v.orderId] = arr

           			}
           		}
           	}) 
           	// console.log(this.orderCode)
           	console.log(this.orderDatas)

        } else {
            // 用户未登录
            this.$toast('请您登录或注册账号')
            this.goTo('login')
        }
    }
}
</script>
<style lang="less" scoped>
.order {
    header {
        height: 1.3rem;
    }
    // 没有订单数据显示
    .not-order{
        color: #aaa;
        font-size: 18PX;
        text-align: center;
        padding: .4rem 0 ;
    }

    // 有订单数据信息
    .orderInfo {
        .orderTop {
            padding: .4rem;

            // 文字样式
            .text {
                color: #aaa;
            }

            // 删除按钮
            .icon-del {
                margin-left: .4rem;
                font-size: 16PX;
                color: #e4393c;
            }
        }
    }
}
</style>
<!-- 
	0：待发货
	1：已发货
	2：已收货

	order订单表需要的数据
	address 地址
	phone 联系电话
	username 联系人姓名
	userId 联系人ID
	count 商品数量
	name 商品名称
	color 商品规则
	price 商品价格
	id 商品id
	orderId 订单编号
	orderTime 订单时间
	total 订单总价
	status 当前订单状态
 -->