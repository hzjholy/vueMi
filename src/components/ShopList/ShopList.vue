<template>
    <div>
        <div v-if="data[0]!== undefined">
            <!-- <p>
                <h4>商品的标题:</h4>
                <span>
                    {{data[0].itemtitle}}
                </span>
            </p> -->
            <van-row>
                <!-- 第一行 -->
                <!-- <van-row class="home-sale">
                    <van-col span="12" class="col-box" v-for="(item,index) in data" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                        <div class="home-sale-img">
                            <img :src="item.itempic" class="auto-img">
                        </div>
                        <div class="home-sale-product-info">
                            <p class="title"> {{item.itemshorttitle}}</p>
                            <p class="produce text">{{item.guide_article}}</p>
                            <div class="price">
                                <span class="iconfont rmb iconrenminbi1688"></span>
                                <span class="price-num">{{item.itemendprice}}</span>
                                <span>起</span>
                                <div class="price-old">
                                    <span class="iconfont rmb-old iconrenminbi1688"></span>
                                    <s> {{item.itemprice}}</s>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row> -->
                <!-- =============================== -->
                <van-col span="12" class="col-box" v-for="(item,index) in products['phone']" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                    <div class="home-sale-img">
                        <img :src="data[index].itempic" class="auto-img">
                    </div>
                    <div class="home-sale-product-info">
                        <p class="title"> {{data[index].itemshorttitle}}</p>
                        <p class="produce text">{{data[index].guide_article}}</p>
                        <div class="price">
                            <span class="iconfont rmb iconrenminbi1688"></span>
                            <span class="price-num">{{data[index].itemendprice}}</span>
                            <span>起</span>
                            <div class="price-old">
                                <span class="iconfont rmb-old iconrenminbi1688"></span>
                                <s> {{data[index].itemprice}}</s>
                            </div>
                        </div>
                    </div>
                </van-col>
                <!-- ======================================== -->
                <!-- 原来的数据 -->
                <!-- 
            <van-col span="12" class="col-box" v-for="(item,index) in products['phone']" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                <div class="home-sale-img">
                    <img :src="item.images.small" class="auto-img">
                    <div class="tag" v-if="index == 0 || index == 1 || index == 2 || index == 3 || index == 4|| index == 7">
                        <img :src="item.images.discount" class="auto-img tag-icon">
                    </div>
                </div>
                <div class="home-sale-product-info">
                    <p class="title">{{item.name}}</p>
                    <p class="produce">{{item.desc}}</p>
                    <div class="price">
                        <span class="iconfont rmb iconrenminbi1688"></span>
                        <span class="price-num">{{item.price}}</span>
                        <span>起</span>
                        <div class="price-old" v-if="index == 0 || index == 1 || index == 2 || index == 3 || index == 4 || index == 5">
                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                            <s>{{item.oldprice}}</s>
                        </div>
                    </div>
                </div>
            </van-col> -->
                <!-- <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/2.jpg" class="auto-img">
                                    <div class="tag">
                                        <img src="./images/home/product/2.png" class="auto-img tag-icon">
                                    </div>
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">小米8 屏幕指纹版</p>
                                    <p class="produce">压感屏幕指纹，手持超级夜景</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">2499</span>
                                        <span>起</span>
                                        <div class="price-old">
                                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                                            <s>2999</s>
                                        </div>
                                    </div>
                                </div>
                            </van-col> -->
                <!-- 第二行 -->
                <!-- <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/3.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">黑鲨游戏手机 Helo</p>
                                    <p class="produce">双液冷，更能打</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">3199</span>
                                        <div class="price-old">
                                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                                            <s>3499</s>
                                        </div>
                                    </div>
                                </div>
                            </van-col>
                            <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/4.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">红米6</p>
                                    <p class="produce">小屏高性能的双摄手机</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">729</span>
                                        <span>起</span>
                                        <div class="price-old">
                                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                                            <s>799</s>
                                        </div>
                                    </div>
                                </div> 
                            </van-col> -->
                <!-- 第三行 -->
                <!-- <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/5.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">红米6A</p>
                                    <p class="produce">好看耐用/轻巧省心</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">549</span>
                                        <span>起</span>
                                        <div class="price-old">
                                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                                            <s>599</s>
                                        </div>
                                    </div>
                                </div>
                            </van-col>
                            <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/6.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">小米6X</p>
                                    <p class="produce">前置2000万，后置2000万</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">1199</span>
                                        <span>起</span>
                                        <div class="price-old">
                                            <span class="iconfont rmb-old iconrenminbi1688"></span>
                                            <s>1599</s>
                                        </div>
                                    </div>
                                </div>
                            </van-col> -->
                <!-- 第四行 -->
                <!--  </van-col>
                            <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/7.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">小米Play（附带流量卡）</p>
                                    <p class="produce">自带高速流量</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">1099</span>
                                    </div>
                                </div>
                            </van-col>
                            </van-col>
                            <van-col span="12" class="col-box">
                                <div class="home-sale-img">
                                    <img src="./images/home/product/8.jpg" class="auto-img">
                                </div>
                                <div class="home-sale-product-info">
                                    <p class="title">小米平板4</p>
                                    <p class="produce">大屏、长续航、超薄电脑</p>
                                    <div class="price">
                                        <span class="iconfont rmb iconrenminbi1688"></span>
                                        <span class="price-num">1099</span>
                                        <span>起</span>
                                    </div>
                                </div>
                            </van-col> -->
            </van-row>
        </div>
        <div v-if="data[0]== undefined">
           <Loading/>
        </div>
    </div>
</template>
<script>
//引入vuex的映射函数
// 读取state数据
// 必有计算属性
import { mapState } from 'vuex'
export default {
    name: 'ShopList',
    data() {
        return {
            //所有类型商品 { 类型: [{当前类型商品1}, {当前类型商品2}])
            products: {},
        }
    },
    // 初始化数据
    created() {
        // ==================================
        // 获取本地存储的商品类型
        var types = JSON.parse(localStorage.getItem('types'))
        // console.log('types ==> ',types)
        // 获取本地浏览器存储的商品信息
        var products = JSON.parse(localStorage.getItem('products'))
        // console.log('products ====>>>' , products)
        // 通过类型查找商品
        // 遍历类型
        types.types.forEach(v1 => {
            // console.log('v1 ==> ',v1)
            // 当前类型的商品推入到当前商品的数组中去
            this.products[v1.type] = []
            // console.log('this.products ==> ',this.products[v1.type])
            // 遍历商品
            products.products.forEach(v2 => {
                // console.log('v2 ==> ',v2)
                // 判断条件
                if (v1.type == v2.type) {
                    // 相同的数组推入
                    this.products[v1.type].push(v2)
                }
            })
        })

        // console.log('this.products == >',this.products )
    },
    // 方法
    methods: {
        // 商品跳转到详情页
        // 绑定点击事件，拦截参数获取商品id
        // 上面需要绑定goState({name:'Detail',params: {pid: item.id}})
        goState(path) {
            this.$router.push(path);
        }
    },
    computed: {
        // data() {
        //     return this.$store.state.data
        // },
        // ...mapState({
        //     goods: state => state.data,
        // })
        ...mapState(['data'])
    }
}
</script>
<!-- stylus编写样式 -->
<style lang="less" scoped>
// 商品售卖
.home-sale {
    width: 100%;
    height: 32rem;

    .van-row {
        margin-top: .2rem;
    }

    .home-sale-img {
        position: relative;
        width: 5rem;
        height: 5rem;

        .tag {
            width: 1rem;
            height: 1rem;
            position: absolute;
            bottom: 0;
            right: 0;

            .tag-icon {
                display: inline-block;
                width: 1rem;
                height: auto;
            }
        }
    }

    .col-box {
        height: 8rem;

        .home-sale-product-info {
            text-align: left;
            padding: .3rem .6rem;
            line-height: .5rem;

            .title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .4rem;
                color: rgba(0, 0, 0, .87);
            }

            .produce {
                margin-top: .06rem;
                font-size: .22rem;
                line-height: .3rem;
                color: rgba(0, 0, 0, .54)
            }



            .price {
                font-size: .28rem;
                color: #ea625b;
                height: 1.5rem;
                line-height: 1.5rem;
                position: relative;
                display: inline-block;
                padding-top: .1rem;

                .rmb {
                    font-size: .2rem;

                }

                .price-num {
                    font-size: .4rem;
                }

                .price-old {
                    display: inline-block;
                    margin: 0 .1rem;
                    font-size: .22rem;
                    color: rgba(0, 0, 0, .54);

                    .rmb-old {
                        font-size: .2rem;
                    }
                }
            }
        }
    }
}
</style>