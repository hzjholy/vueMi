<template>
    <div class="newProduct" v-if="data[0]!== undefined">
        <div class="shopWrapper" ref="shopWrapper">
            <ul class="listbox content" v-for="(item,index) in shopList" :key="index">
                <li>
                    <!-- shopList -->
                    <!-- 分类标题 -->
                    <span>{{item.main_name}}</span>
                    <!-- 分类项目的商品 -->
                    <!-- ========== -->
                    <van-row class="phoneProduct">
                        <van-col span="24" v-for="(items,index) in item.data" :key="index">
                            <div v-for="(detailshop,index) in items.info" :key="index" class="product">
                                <div class="pro-top">
                                    <img :src="detailshop.imgurl" class="auto-img">
                                </div>
                                <div class="pro-title">
                                    <span>{{detailshop.son_name}}</span>
                                </div>
                            </div>
                        </van-col>
                        <!-- <div class="titlebox">
                        <van-row>
                            <van-col span="24">
                                <div v-for="(detailshop,index) in items.info" :key="index" class="product">
                                    <div class="pro-top">
                                        <img :src="detailshop.imgurl" class="auto-img">
                                    </div>
                                    <div class="pro-title">
                                        <span>{{detailshop.son_name}}</span>
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div> -->
                        <!-- ============== -->
                        <!-- <van-col span="8" v-for="(list,index) in shopList.data" :key="index" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                        <p>{{list[index].next_name}}</p>
                        <div class="product">
                            <div class="pro-top">
                                <img class="auto-img" :src="data[index].itempic">
                            </div>
                            <div class="pro-title text">
                                <span>{{list[index].next_name}}</span>
                            </div>
                        </div>
                    </van-col> -->
                    </van-row>
                </li>
            </ul>
        </div>
        <!-- ========================= -->
        <!-- 备份 -->
        <!--  <div class="title">
            <span>手机</span>
        </div>
        <div class="phoneProduct">
            <van-row>
                <van-col span="8" v-for="(item,index) in phoneproducts" :key="index" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                    <div class="product">
                        <div class="pro-top">
                            <img class="auto-img" :src="data[index].itempic">
                        </div>
                        <div class="pro-title text">
                            <span>{{data[index].itemshorttitle}}</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div> -->
        <!-- ============================ -->
        <!-- <div class="title">
            <span>家电</span>
        </div>
        <div class="phoneProduct">
            <van-row>
                <van-col span="8" v-for="(item,index) in appliancedata" :key="index" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                    <div class="product">
                        <div class="pro-top">
                            <img class="auto-img" :src="item.itempic">
                        </div>
                        <div class="pro-title">
                            <span>{{item.itemshorttitle}}</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div> -->
        <!-- <div class="title">
            <span>电脑</span>
        </div>
        <div class="phoneProduct">
            <van-row>
                <van-col span="8" v-for="(item,index) in phoneproducts" :key="index">
                    <div class="product">
                        <div class="pro-top">
                            <img class="auto-img" :src="item.images.small">
                        </div>
                        <div class="pro-title">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div> -->
    </div>
</template>
<script>
import { mapState } from 'vuex'
// 引入better-scroll的js库
import BScroll from 'better-scroll'


export default {
    name: 'new',
    data() {
        return {
            // 全部商品信息
            allProduct: {},
            // 商品数据
            phoneproducts: [],
            // 开始截取商品下标
            startIndex: 0,
            // 结束截取商品下标
            // 因为默认截取8个
            endIndex: 8,
        }
    },
    methods: {
        // 点击导航跳转页面
        goState(path) {
            this.$router.push(path)
        },
    },
    // mounted(){
    //     this.$store.dispatch('getAppliancedata')
    // },
    created() {
        // 获取本地商品的数据信息
        var productsData = JSON.parse(localStorage.getItem('products')).products
        // console.log('productsData ==> ', productsData)
        this.allProduct = productsData
        // console.log('this.allProduct ==> ', this.allProduct)
        // ====
        // products需要推荐的8个商品数据
        this.phoneproducts = productsData.slice(this.startIndex, this.endIndex)
        // console.log('this.products ==> ',this.products)
        // ==============
        // 修改值，懒加载添加新的商品信息
        // 修改值，固定每次+8
        this.startIndex = this.endIndex;
        this.endIndex += 8;
        // console.log('products ==> ', this.products)
    },
    mounted() {
        this.$store.dispatch('getShopList', () => {
            // 数据更新后执行
            this.$nextTick(() => {
                const shopsScroll =  new BScroll('.shopWrapper',{
                    probeType: 1
                })
                 // 给右侧绑定scroll监听
                 // 参数一：事件名
                 // 参数二：回调函数
                 shopsScroll.on('scroll',({x,y}) => {
                        console.log(x,y)
                 })
            })
           
        })
    },
    computed: {
        // 读取数据
        ...mapState(['appliancedata', 'data', 'shopList'])
    }
}
</script>
<style lang="less" scoped>
.product {
    float: left;
}

.newProduct {

    // 头部图片
    header {
        height: 2rem;
        padding: .5rem;
    }

    // 标题
    .listbox {
        background: #fff;
        font-size: .45rem;
        text-align: center;
        font-weight: 400;
        margin-top: .2rem;
        height: auto;
        line-height: 2rem;
        overflow: hidden;

        &>span {
            position: relative;

            &::before,
            &::after {
                content: "";
                position: absolute;
                top: 50%;
                left: 0;
                width: 6.4px;
                width: .4rem;
                border-top: 1px solid #e0e0e0;
                transform: translate3d(-150%, -50%, 0);
                -webkit-transform: translate3d(-150%, -50%, 0);
            }

            &::after {
                left: auto;
                right: 0;
                transform: translate3d(150%, -50%, 0);
                -webkit-transform: translate3d(150%, -50%, 0);
            }
        }

        // 手机产品信息
        .phoneProduct {
            // background: red;
            // height: 3rem;
            // margin: -.06rem 0 0;

            .product {
                float: left;
                width: 30%;

                // 产品图片
                .pro-top {
                    width: 1rem;
                    height: 1rem;
                    margin: 0 auto;
                    background: #fff;
                    overflow: hidden;
                }

                // 产品下面的文字
                .pro-title {
                    text-align: center;
                    white-space: nowrap;
                    font-size: .3rem;
                    color: rgba(0, 0, 0, .54);
                }

            }





            .listbox {
                height: 1rem;
                background-color: red;
            }


        }
    }


}
</style>