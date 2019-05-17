<template>
    <div class="appliances">
        <!-- 家电 -->
        <div>
            <div v-if="appliancedata[0]!== undefined">
                <!-- <van-row class="home-sale">
                    <van-col span="12" class="col-box" v-for="(item,index) in appliancedata" @click.native="goState({name:'Detail',params: {pid: item.id}})">
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
                <!-- ================================= -->
                <!-- 之前完善的 -->
                <van-row class="home-sale">
                    <van-col span="12" class="col-box" v-for="(item,index) in products['phone']" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                        <div class="home-sale-img">
                            <img :src="appliancedata[index].itempic" class="auto-img">
                        </div>
                        <div class="home-sale-product-info">
                            <p class="title"> {{appliancedata[index].itemshorttitle}}</p>
                            <p class="produce text">{{appliancedata[index].guide_article}}</p>
                            <div class="price">
                                <span class="iconfont rmb iconrenminbi1688"></span>
                                <span class="price-num">{{appliancedata[index].itemendprice}}</span>
                                <span>起</span>
                                <div class="price-old">
                                    <span class="iconfont rmb-old iconrenminbi1688"></span>
                                    <s> {{appliancedata[index].itemprice}}</s>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
                <!-- ==================== -->
                <!-- 单品详情 -->
                <!-- <van-col span="12" class="col-box" v-for="(item,index) in products['phone']" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                    <div class="home-sale-img">
                        <img :src="appliancedata[index].itempic" class="auto-img">
                    </div>
                    <div class="home-sale-product-info">
                        <p class="title"> {{appliancedata[index].itemshorttitle}}</p>
                        <p class="produce text">{{appliancedata[index].guide_article}}</p>
                        <div class="price">
                            <span class="iconfont rmb iconrenminbi1688"></span>
                            <span class="price-num">{{appliancedata[index].itemendprice}}</span>
                            <span>起</span>
                            <div class="price-old">
                                <span class="iconfont rmb-old iconrenminbi1688"></span>
                                <s> {{appliancedata[index].itemprice}}</s>
                            </div>
                        </div>
                    </div>
                </van-col> -->
            </div>
            <div v-if="appliancedata[0]== undefined">
                <Loading />
            </div>
        </div>
    </div>
</template>
<script>
//读取数据
import { mapState } from 'vuex'
// import Loading from './Loading.vue'
export default {
    name: 'appliances',
    components: {
        // 引入加载模块
        // Loading,
    },
    data() {
        return {
            //所有类型商品 { 类型: [{当前类型商品1}, {当前类型商品2}])
            products: {},
        }
    },
    created() {
        // ==================================
        // 获取本地存储的商品类型
        var types = JSON.parse(localStorage.getItem('types'))
        // console.log('types ==> ',types)
        // 获取本地浏览器存储的商品信息
        var products = JSON.parse(localStorage.getItem('products'))
        // phoneproducts
        // console.log('products ====' , products)
        // 通过类型查找商品
        // 遍历类型
        // console.log(types.types)
        types.types.forEach(v1 => {
            // console.log('v1 ==> ',v1)
            // 当前类型的商品推入到当前商品的数组中去
            this.products[v1.type] = []
            // console.log(this.products)
            // console.log('this.products ==> ',this.products[v1.type])
            // 遍历商品
            products.phoneproducts.forEach(v2 => {
                // console.log('v2 ==> ',v2)
                // 判断条件
                if (v1.type == v2.type) {
                    // 相同的数组推入
                    this.products[v1.type].push(v2)
                }
            })
        })
    },
    // 方法
    methods: {
        // 商品跳转到详情页
        // 绑定点击事件，拦截参数获取商品id
        // 上面需要绑定goState({name:'Detail',params: {pid: item.id}})
        back() {
            this.$router.go(-1)
        },
        goState(path) {
            this.$router.push(path);
        }
    },
    mounted() {
        // 获取api数据
        // 获取家电数据
        this.$store.dispatch('getAppliancedata')
    },
    computed: {
        ...mapState(['appliancedata']),
    },
    // 初始化数据


}
</script>
<style lang="less" scoped>
// 商品售卖
.home-sale {
    width: 100%;
    height: 100%;

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