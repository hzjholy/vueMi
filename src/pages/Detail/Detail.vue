<template>
    <!--<div class="detail">-->
        <!--<header>-->
            <!--<div class="nav" :active="$route.query.active || -1">-->
                <!--&lt;!&ndash; $router.back() &ndash;&gt;-->
                <!--&lt;!&ndash;  this.$router.go(-1) 方法 &ndash;&gt;-->
                <!--<span class="back-text" @click="back()">-->
                    <!--<div class="nav-circle">-->
                        <!--<van-icon name="arrow-left" class="back_icon" />-->
                        <!--<span></span>-->
                    <!--</div>-->
                <!--</span>-->
                <!--<span class="share-text back-text">-->
                    <!--<div class="nav-circle" @click="share">-->
                        <!--<van-icon name="share" class="back_icon" />-->
                        <!--<span></span>-->
                    <!--</div>-->
                    <!--&lt;!&ndash; ====================================== &ndash;&gt;-->
                    <!--&lt;!&ndash; 分享的底层 &ndash;&gt;-->
                    <!--<van-popup v-model="isShare" position="bottom" :overlay="true" class="share_content">-->
                        <!--<p class="share_title">分享</p>-->
                        <!--<p class="share_weibo">-->
                            <!--<img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/detail/microblog.png" class="auto-img">-->
                        <!--</p>-->
                        <!--&lt;!&ndash; 一条横线 &ndash;&gt;-->
                        <!--<div class="home-divider-line">-->
                        <!--</div>-->
                        <!--<p class="share_cancel" @click="noshare">取消</p>-->
                    <!--</van-popup>-->
                <!--</span>-->
            <!--</div>-->
        <!--</header>-->
        <!--<div class="main" v-if="data[0]!== undefined">-->
            <!--<div class="content">-->
                <!--<van-row style="position: absolute;top: 0;width: 100%;">-->
                    <!--<van-col span="24">-->
                        <!--&lt;!&ndash; 详情主图 &ndash;&gt;-->
                        <!--&lt;!&ndash;<img :src="data[this.productsId].itempic" class="auto-img">&ndash;&gt;-->
                        <!--<img :src="data[this.productsId].itempic" class="auto-img">-->
                    <!--</van-col>-->
                    <!--<van-col span="24">-->
                        <!--<van-row>-->
                            <!--<van-col span="24">-->
                                <!--<div class="desc">-->
                                    <!--&lt;!&ndash; <p class="title">{{currentProduct.name}}</p> &ndash;&gt;-->
                                    <!--<p class="title">{{data[this.productsId].itemtitle}}</p>-->
                                    <!--&lt;!&ndash; <p class="configuration">{{currentProduct.configuration}}</p> &ndash;&gt;-->
                                    <!--&lt;!&ndash; <p class="text">{{currentProduct.detaildesc}}</p> &ndash;&gt;-->
                                    <!--&lt;!&ndash; <p class="text">{{data[this.productsId].guide_article}}</p> &ndash;&gt;-->
                                <!--</div>-->
                            <!--</van-col>-->
                            <!--<van-col span="24">-->
                                <!--<span class="money">-->
                                    <!--<span class="iconfont rmb iconrenminbi1688"></span>-->
                                    <!--&lt;!&ndash; <span class="price">{{currentProduct.price}}</span> &ndash;&gt;-->
                                    <!--<span class="price">{{data[this.productsId].itemendprice}}</span>-->
                                <!--</span>-->
                                <!--<span class="price-old">-->
                                    <!--<span class="iconfont rmb-old iconrenminbi1688"></span>-->
                                    <!--&lt;!&ndash; <s>{{currentProduct.oldprice}}</s> &ndash;&gt;-->
                                    <!--<s>{{data[this.productsId].itemprice}}</s>-->
                                <!--</span>-->
                            <!--</van-col>-->
                        <!--</van-row>-->
                    <!--</van-col>-->
                <!--</van-row>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="shopping">-->
            <!--<van-goods-action>-->
                <!--<van-goods-action-mini-btn icon="home-o" text="首页" @click="goto('/home')" />-->
                <!--<van-goods-action-mini-btn icon="cart-o" text="购物车" @click="goto('/shopcart')" />-->
                <!--<van-goods-action-big-btn primary text="加入购物车" @click="addOrBuy(0)" />-->
                <!--<van-goods-action-big-btn class="buybtn" primary text="立即购买" @click="addOrBuy(1)" />-->
            <!--</van-goods-action>-->
        <!--</div>-->
        <!--<div class="shopping-detail">-->
            <!--<van-sku v-model="showBase" :sku="skuData.sku" :goods="skuData.goods_info" :hide-stock="skuData.sku.hide_stock" reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :show-add-cart-btn="false" :close-on-click-overlay="closeOnClickOverlay" @buy-clicked="onBuyClicked">-->
                <!--&lt;!&ndash; 自定义 sku actions &ndash;&gt;-->
                <!--<template slot="sku-actions" slot-scope="props">-->
                    <!--<div class="van-sku-actions">-->
                        <!--&lt;!&ndash; 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 &ndash;&gt;-->
                        <!--<van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{text == 0 ? '加入购物车' : '立即购买'}}</van-button>-->
                    <!--</div>-->
                <!--</template>-->
            <!--</van-sku>-->
        <!--</div>-->
    <!--</div>-->
    <div class="detail">
        <header>
            <div class="nav" :active="$route.query.active || -1">
                <!-- $router.back() -->
                <!--  this.$router.go(-1) 方法 -->
                <span class="back-text" @click="back()">
                    <div class="nav-circle">
                        <van-icon name="arrow-left" class="back_icon" />
                        <span></span>
                    </div>
                </span>
                <span class="share-text back-text">
                    <div class="nav-circle" @click="share">
                        <van-icon name="share" class="back_icon" />
                        <span></span>
                    </div>
                    <!-- ====================================== -->
                    <!-- 分享的底层 -->
                    <van-popup v-model="isShare" position="bottom" :overlay="true" class="share_content">
                        <p class="share_title">分享</p>
                        <p class="share_weibo">
                            <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/detail/microblog.png" class="auto-img">
                        </p>
                        <!-- 一条横线 -->
                        <div class="home-divider-line">
                        </div>
                        <p class="share_cancel" @click="noshare">取消</p>
                    </van-popup>
                </span>
            </div>
        </header>
        <div class="main" v-if="data[0]!== undefined">
            <div class="content">
                <van-row style="position: absolute;top: 0;width: 100%;">
                    <van-col span="24">
                        <!-- 详情主图 -->
                        <!--<img :src="data[this.productsId].itempic" class="auto-img">-->
                        <!--<img :src="data[this.productsId].itempic" class="auto-img">-->
                        <img :src="this.currentProducts[this.productsId].images.large" class="auto-img">
                    </van-col>
                    <van-col span="24">
                        <van-row>
                            <van-col span="24">
                                <div class="desc">
                                    <!-- <p class="title">{{currentProduct.name}}</p> -->
                                    <!--<p class="title">{{data[this.productsId].itemtitle}}</p>-->
                                    <!-- <p class="configuration">{{currentProduct.configuration}}</p> -->
                                    <!-- <p class="text">{{currentProduct.detaildesc}}</p> -->
                                    <!-- <p class="text">{{data[this.productsId].guide_article}}</p> -->
                                    <p class="title">{{this.currentProducts[this.productsId].name}}</p>
                                     <p class="configuration">{{this.currentProducts[this.productsId].configuration}}</p>
                                     <p class="text">{{this.currentProducts[this.productsId].desc}}</p>
                                     <p class="text">{{this.currentProducts[this.productsId].detaildesc}}</p>

                                </div>
                            </van-col>
                            <van-col span="24">
                                <span class="money">
                                    <span class="iconfont rmb iconrenminbi1688"></span>
                                    <!-- <span class="price">{{currentProduct.price}}</span> -->
                                    <!--<span class="price">{{data[this.productsId].itemendprice}}</span>-->
                                    <span class="price">{{this.currentProducts[this.productsId].price}}</span>
                                </span>
                                <span class="price-old">
                                    <span class="iconfont rmb-old iconrenminbi1688"></span>
                                    <!-- <s>{{currentProduct.oldprice}}</s> -->
                                    <!--<s>{{data[this.productsId].itemprice}}</s>-->
                                    <s>{{this.currentProducts[this.productsId].oldprice}}</s>
                                </span>
                            </van-col>
                        </van-row>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="shopping">
            <van-goods-action>
                <van-goods-action-mini-btn icon="home-o" text="首页" @click="goto('/home')" />
                <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="goto('/shopcart')" />
                <van-goods-action-big-btn primary text="加入购物车" @click="addOrBuy(0)" />
                <van-goods-action-big-btn class="buybtn" primary text="立即购买" @click="addOrBuy(1)" />
            </van-goods-action>
        </div>
        <div class="shopping-detail">
            <van-sku v-model="showBase" :sku="skuData.sku" :goods="skuData.goods_info" :hide-stock="skuData.sku.hide_stock" reset-stepper-on-hide reset-selected-sku-on-hide disable-stepper-input :show-add-cart-btn="false" :close-on-click-overlay="closeOnClickOverlay" @buy-clicked="onBuyClicked">
                <!-- 自定义 sku actions -->
                <template slot="sku-actions" slot-scope="props">
                    <div class="van-sku-actions">
                        <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                        <van-button type="primary" bottom-action @click="props.skuEventBus.$emit('sku:buy')">{{text == 0 ? '加入购物车' : '立即购买'}}</van-button>
                    </div>
                </template>
            </van-sku>
        </div>
    </div>
</template>
<script>
//轮播图
import { Swipe, SwipeItem } from 'vant';
// 加入购物车和立即购买
import {
    GoodsAction,
    GoodsActionBigBtn,
    GoodsActionMiniBtn
} from 'vant';
// SKU面板
import { Sku } from 'vant'
import skuData from '../../data/vdata.js'
// 导入时间格式化脚本
import tool from '../../common/utils/tool.js'
// 导入弹出层组件
import { Popup } from 'vant'
import { mapState } from 'vuex'
export default {
    name: 'Detail',
    inject: ['reload'],
    data() {
        // sku数据
        this.skuData = skuData;
        return {
            // 用户登录状态
            // 传递的值有可能是null或者是对象，使用初始化为null
            userLoginStatus: null,
            //0: 加入购物车, 1: 购买
            text: 0,
            showBase: false,
            closeOnClickOverlay: true,
            // 查询参数
            active: -1,
            // 是否显示分享
            isShare: false,
            // 倒计时
            i: 3,
            // 所有商品数据
            products: [],
            productsId: 0,
            // 设置按钮点击一次
            disable: true,
        //    ===============
        //    重写
        //    当前商品的所有数据信息
            currentProducts: []

        }
    },
    components: {
        // 轮播图组件注册
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        // 加入购物车和立即购买组件注册
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
        // SKU面板
        [Sku.name]: Sku,
        // 弹出层组件
        [Popup.name]: Popup,


    },
    // 初始化数据
    created() {
        // ========================================
        // 截取查询参数active，根据active状态激活按钮高亮
        // console.log(this.$route.query.active)
        // ========================================
        // 这里：拦截参数获取商品id，获取当前的商品数据，给上面的html显示数据
        // 截取参数，获取商品id
        console.log(this.$route.params.pid)

        // 获取浏览器本地存储数据
        var products = JSON.parse(localStorage.getItem('products'))
        console.log(products.products)
        this.productsId = this.$route.params.pid
        this.currentProducts = products.products
        // =========================================
        // console.log('products == >',products)
        // 遍历所有商品数据
        for (var i = 0; i < products.products.length; i++) {
            // 根据跳转参数的id与商品id遍历寻找相对应的当前商品数据
            if (this.$route.params.pid == products.products[i].id) {
                // 获取对应的当前商品数据信息
                this.currentProduct = products.products[i]
                // 找到数据之后，立马打断，提高性能
                break;
            }
        }
        // console.log(this.currentProduct)
        // 获取当前商品的信息
        // console.log(this.currentProduct)
        // ==========================================
        // 获取当前商品信息数据
        // console.log(this.currentProduct)
        // 获取sku数据
        // console.log(this.skuData)
        // 重新配置对象
        this.skuData.goods_info = {
            // 修改面板展示的图片
            picture: this.currentProduct.images.large,
            // 修改面板的标题
            title: this.currentProduct.name
        }
        // 配置sku数据模型
        // 根据vdata.js文件获取数据，并重新配置
        // 修改商品id
        this.skuData.sku.list[0].goods_id = this.currentProduct.id
        // 修改价格，注意分为单位
        this.skuData.sku.list[0].price = this.currentProduct.price * 100
        // 修改商品类型,修改颜色
        this.skuData.sku.tree[0].v[0].name = this.currentProduct.color[0]

        // ==========================================
        // 这里：获取用户登录状态
        var userLogin = localStorage.getItem('userLogin')
        // console.log('userLogin ==> ', userLogin)
        // 获取有可能是null值，就是未登录状态，就是不存在用户
        // 这里需要一个判断
        // 登录过的话，就传值,反序列化将JSON数据转为js的对象
        this.userLoginStatus = userLogin == undefined ? null : JSON.parse(userLogin)
        // ==========================================
    },
    methods: {
        // 点击返回主页
        goto(path) {
            // 使用$router方法跳转页面
            this.$router.replace(path)

        },
        // 添加购物车或者立即购买
        addOrBuy(text) {
            if (!this.userLoginStatus) {
                // 时间跳转
                // 定时器执行的代码段
                // 生命定时器
                if (this.disable) {
                    var timer
                    timer = setInterval(() => {
                        this.$toast(`您尚未登录,` + this.i + `秒后自动跳转登录界面`);
                        if (this.i == 0) {
                            this.$toast('欢迎您登录');
                            this.$router.replace('/login')
                            clearInterval(timer);
                        }
                        this.i--;
                    }, 1000);
                    this.disable = false
                }


                // ============================
                // 提示用户登录，并跳转到登录界面
                // this.$toast(`您尚未登录,` + this.i + `秒后自动跳转登录界面`);
                // setTimeout(() => {
                // 箭头函数this指向vue实例
                // this.$router.replace('/login')
                // }, 3000)
            } else if (this.userLoginStatus.loginStaus) {
                // 修改下单面板下面的文字
                // 判断是立即购买还是加入购物车
                // 0加入购物车，1立即购买
                this.text = text;
                // 如果用户登录过并存在
                // 验证用户是否存在，增加安全性---加入购物车在验证
                // 展示sku下单面板
                this.showBase = true
            }
        },
        // 点击购买
        onBuyClicked(data) {
            // console.log('data ==> ', data);
            // 获取之前的购物车商品数据
            var shopcartData = localStorage.getItem('shopcart')
            // [{},{},{}]
            // 判断购物车的数据是否为空
            // 有数据就重新赋值
            shopcartData = shopcartData == undefined ? [] : JSON.parse(shopcartData)
            // 重新构建购物车数据对象，先获取之间数据，以免数据覆盖
            var currentProduct = {
                // 获取用户id
                userId: this.userLoginStatus.userId,
                // 获取商品id
                id: this.currentProduct.id,
                // 商品名字
                name: this.currentProduct.name,
                // 颜色
                color: this.currentProduct.color[0],
                // 价格
                price: this.currentProduct.price,
                // 旧的价格
                oldprice: this.currentProduct.oldprice,
                // 类型
                type: this.currentProduct.type,
                // 商品选择数量
                count: data.selectedNum,
                // 缩略图片
                thumbnail: this.currentProduct.images.small,
                // 获取购买当前的时间
                time: tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
            }

            // 数据存储，推入进去，根据时间先后顺序
            shopcartData.push(currentProduct)
            // console.log('shopcartData ==> ',shopcartData)
            // 设置到本地存储,不写入
            localStorage.setItem('shopcart', JSON.stringify(shopcartData))
            this.showBase = false;
        },
        // 返回
        back() {

            // console.log(this.active)
            if (this.active == 1) {
                // 跳转到购物车页面
                // 修改按钮激活状态
                this.$router.push({ name: 'Shopcart', query: { active: this.active } })

                console.log('111')
            } else {
                // 返回上一级
                this.$router.go(-1)
                // 页面无缝刷新
                // this.reload()
            }
        },
        // 显示分享链接
        share() {
            this.isShare = true
        },
        // 不分享
        noshare() {
            this.isShare = false
        }
    },
    computed: {
        // data() {
        //     return this.$store.state.data
        // }
        ...mapState(['data'])
    }
}
</script>
<style lang="less" scoped>
// 一条横线
.home-divider-line {
    height: .02rem;
    border-bottom: 1PX solid #d9d9d9;
}

.detail {

    // 立即购买按钮
    .buybtn {
        background-color: red !important;
    }

    // 按钮的背景颜色
    .van-button--danger {
        background-color: #fff;
        border: 0.02667rem solid #fff;
    }

    // 导航
    .nav {
        // position: absolute;
        height: 1.3333rem;
        background-image: #fff;
        /* margin-bottom: 1.3333rem; */


        .back-text {
            position: relative;
        }

        .nav-circle {

            span {
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
                background-color: rgba(0, 0, 0, .6);
                position: absolute;
                top: -.67rem;
                left: -0.8rem;
            }

            .back_icon {
                color: #fff;
                z-index: 9999999999;
            }

        }

        // 返回的图标
        span {
            width: 1rem;
            float: left;
            font-size: 18px;
            // color:red;
            // line-height: 1.3333rem;
            margin-left: 0.5333rem;
            margin-top: calc((1.3333rem / 2) - 9px);
            // z-index: 9999999;
            z-index: 99;
        }

        .share-text {
            z-index: 99;
            float: right;

            // 分享内容设置
            .share_content {
                color: #3c3c3c;
                font-size: .5rem;
                text-align: center;

                p {
                    padding: .4rem 0;
                }

                .share_weibo {
                    width: 1rem;
                    height: 1rem;
                    margin: 0 auto;
                }
            }
        }
    }

    // 主要内容
    .content {
        .desc {
            padding: .4rem;

            .title {
                color: #3c3c3c;
                font-size: .8rem;
            }

            .configuration {
                padding-top: .25rem;
                color: rgb(255, 74, 0);
                font-size: .35rem;
            }

            .text {
                padding-top: .25rem;
                line-height: 1.5em;
                word-break: break-all;
                color: rgba(0, 0, 0, .54);
            }
        }

        .money {
            padding-left: .4rem;
            height: 1rem;
            font-size: .6rem;
            color: #ff6700;

            .rmb {
                font-size: .6rem;
            }
        }

        .price-old {
            display: inline-block;
            margin: 0 .3rem;
            font-size: .4rem;
            color: rgba(0, 0, 0, .54);

            .rmb-old {
                font-size: .4rem;
            }
        }
    }

    // 下面栏购物车
    .shopping {
        .van-button {
            color: #fff;
            background-color: #ff6700;
        }
    }
}
</style>