<template>
    <div class="home">
        <!-- 搜索 -->
        <van-search class="search" @focus="goState({name: 'Search'})" ref="search" placeholder="请输入搜索关键词" v-model="value" background="#E2E1E4" />
        <!-- 标签页 -->
        <van-tabs class="vtabs" ref="vtabs" background="#f2f2f2" color="rgb(237, 91, 0)" title-active-color="rgb(237, 91, 0)" v-model="active" :swipeable="true">
            <!-- 这里的index默认是从1开始,也就是第一个 -->
            <van-tab v-for="index in 8" :title="title[index]">
                <!-- 内容 {{ index }} -->
                <!-- 大页面1 -- 推荐 -->
                <div v-if="index==1" class="home-page-one">
                    <div class="home-swiper-warpper">
                        <!-- 轮播图 -->
                        <van-swipe :autoplay="3000" indicator-color="white">
                            <van-swipe-item v-for="(item,index) in banners" :key="index">
                                <img :src="item.url" class="auto-img">
                            </van-swipe-item>
                        </van-swipe>
                    </div>
                    <!-- 5个详情 -->
                    <div class="home-nav-img" v-for="(item,index) in navs" :key="index">
                        <img :src="item.url">
                    </div>
                    <!-- 横线 -->
                    <div class="home-divider-line">
                    </div>
                    <!-- 小米9，电视，家电 -->
                    <div class="home-content">
                        <van-row>
                            <van-col span="12">
                                <div class="home-content-left fl">
                                    <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/main/1.jpg" class="auto-img">
                                </div>
                            </van-col>
                            <van-col span="12" style="width: 48.5%">
                                <div class="home-content-right fr">
                                    <div class="home-content-top">
                                        <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/main/2.jpg">
                                    </div>
                                    <div class="home-content-bottom">
                                        <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/main/3.jpg" class="auto-img">
                                    </div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                    <!-- 横线 -->
                    <div class="home-divider-line">
                    </div>
                    <!-- 新品现货热卖 -->
                    <div class="home-new-product">
                        <a href="#">
                            <div class="home-new-product-img">
                                <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/new/1.jpg" class="auto-img">
                            </div>
                        </a>
                    </div>
                    <!-- 横线 -->
                    <div class="home-divider-line">
                    </div>
                    <!-- 每日精选 -->
                    <div class="home-day-product">
                        <a href="#">
                            <div class="home-day-product-img">
                                <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/new/2.jpg" alt="" class="auto-img">
                            </div>
                        </a>
                    </div>
                    <!-- 商品售卖 -->
                    <div class="home-sale">
                        <!--<ShopList />-->
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
                        </van-col>
                    </div>
                    <!-- 横线 -->
                    <div class="home-divider-line"></div>
                    <!-- 更多小米手机产品 -->
                    <van-row class="home-more">
                        <van-col class="title" span="24">
                            更多小米手机产品 >
                        </van-col>
                    </van-row>
                    <!-- <div class="home-content">
                        <van-row>
                            <van-col span="12">
                                <div class="home-content-left fl">
                                    <img src="./images/home/1.jpg" class="auto-img">
                                </div>
                            </van-col>
                            <van-col span="12">
                                <div class="home-content-right fr">
                                    <div class="home-content-top"></div>
                                    <div class="home-content-bottom"></div>
                                </div>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="home-content">
                        <van-row>
                            <van-col span="12">
                                <div class="home-content-left fl">
                                    <img src="./images/home/1.jpg" class="auto-img">
                                </div>
                            </van-col>
                            <van-col span="12">
                                <div class="home-content-right fr">
                                    <div class="home-content-top"></div>
                                    <div class="home-content-bottom"></div>
                                </div>
                            </van-col>
                        </van-row>
                    </div> -->
                </div>
                <!-- 大页面2 -->
                <!-- 数码 -->
                <div v-if="index==2">
                    <Digital/>
                </div>
                <!-- 大页面3 -- 宠物 -->
                <div v-if="index==3" class="noopsyche-page-three">
                    <Pet/>
                    <!-- 轮播图 -->
                    <!-- <div class="noopsyche-swiper-warpper">
                        <van-swipe :autoplay="3000" indicator-color="white">
                            <van-swipe-item v-for="(item,index) in banners" :key="index">
                                <img :src="item.url" class="auto-img">
                            </van-swipe-item>
                        </van-swipe>
                    </div> -->
                    <!-- 导航 -->
                    <!-- <div class="noopseyche_nav"> -->
                        <!-- <div class="swiper-container"> -->
                            <!-- <div class="swiper-wrapper">
                                <div class="swiper-slide">Slide 1</div>
                                <div class="swiper-slide">Slide 2</div>
                                <div class="swiper-slide">Slide 3</div>
                            </div> -->
                            <!-- 如果需要分页器 -->
                            <!-- <div class="swiper-pagination"></div> -->
                            <!-- 如果需要导航按钮 -->
                            <!-- <div class="swiper-button-prev"></div> -->
                            <!-- <div class="swiper-button-next"></div> -->
                        <!-- </div> -->
                    <!-- </div> -->
                </div>
                <!-- 大页面4 -->
                <!-- 车品组件 -->
                <div v-if="index==4">
                    <!-- <h2>第四个大页面</h2> -->
                    <Car/>
                </div>
                <!-- 大页面5 -->
                <div v-if="index==5">
                    <!-- <h2>第五个大页面</h2> -->
                    <!-- 家电 -->
                     <Appliances/>
                </div>
                <!-- 大页面6 -->
                <div v-if="index==6">
                    <!-- <h2>第六个大页面</h2> -->
                    <!-- 居家 -->
                    <Life/>
                </div>
                <!-- 大页面7 -->
                <div v-if="index==7">
                    <!-- <h2>第七个大页面</h2> -->
                    <!-- 美食 -->
                    <Cate/>
                </div>
                <!-- 大页面8 -->
                <div v-if="index==8">
                    <!-- <h2>第八个大页面</h2> -->
                    <!-- 箱包 -->
                    <Bag/>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
/*
        vant插件说明
        Search 搜索框
        Swipe 轮播图
        SwipeItem 轮播图
        Tab 标签页
        Tabs 标签页
    */
import { Search, Swipe, SwipeItem, Tab, Tabs } from 'vant';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

// 引入商品列表组件
import ShopList from '../../components/ShopList/ShopList.vue'
// 引入家电数据组件
import Appliances from '../../components/ShopList/Appliances.vue'
// 引入数码组件
import Digital from '../../components/ShopList/Digital.vue'
// 引入宠物组件
import Pet from '../../components/ShopList/Pet.vue'
// 引入车品组件
import Car from '../../components/ShopList/Car.vue'
// 引入居家组件
import Life from '../../components/ShopList/Life.vue'
// 引入美食组件
import Cate from '../../components/ShopList/Cate.vue'
// 引入箱包组件
import Bag from '../../components/ShopList/Bag.vue'







export default {
    name: 'Home',
    // 页面刷新
    // inject: ['reload'],
    data() {
        return {
            active: 0,
            value: '',
            // 小标签的标题
            title: ['', '推荐', '手机', '宠物', '车品', '家电', '居家', '美食','箱包'],
            // 轮播图数据
            // 轮播图的图片资源
            banners: [
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/banner/1.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/banner/2.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/banner/3.jpg' },
                // { url: require('./images/shop/1.jpg') },
            ],
            navs: [
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/nav/1.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/nav/2.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/nav/3.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/nav/4.jpg' },
                { url: 'http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/home/nav/5.jpg' },
                // { url: require('./images/nav/2.jpg') },
            ],
            //所有类型商品 { 类型: [{当前类型商品1}, {当前类型商品2}])
            products: {},
        }
    },
    // 组件注册
    components: {
        [Search.name]: Search,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,

        // 商品列表组件注册
        // 映射成标签 
        // 商品列表模板
        ShopList,
        // 家电组件
        Appliances,
        // 手机组件
        Digital,
        // 宠物组件
        Pet,
        // 车品组件
        Car,
        // 居家组件
        Life,
        // 美食组件
        Cate,
        // 箱包组件
        Bag,
    },
    // // 初始化数据
    created() {
        // 获取本地存储的商品类型
        var types = JSON.parse(localStorage.getItem('types'))
        // console.log('types ==> ',types)
        // 获取本地浏览器存储的商品信息
        var products = JSON.parse(localStorage.getItem('products'))
        // console.log('products ====' , products)
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
                if(v1.type == v2.type){
                    // 相同的数组推入
                    this.products[v1.type].push(v2)
                }
            })
        })

        console.log('this.products == >',this.products )
    },
    // 渲染之后
    mounted() {
        
        // ============================================
        // 获取高度
        var search = this.$refs.search
        // console.log('search ==> ', search)
        // 动态获取具体的高度值
        var searchHeight = getComputedStyle(search).height
        // console.log('searchHeight ==> ', searchHeight)
        // 获取标签总的
        var vtabs = this.$refs.vtabs.$el.firstChild
        // console.log('vtabs ==> ', vtabs)
        vtabs.style.position = 'sticky'
        vtabs.style.top = searchHeight
        // ========================================
        // Swiper使用
        // 创建一个Swiper实例对象，来实现轮播
        // 第一个参数：容器的类名
        // 第二个参数：配置对象
        // Swiper使用不了
        new Swiper('.swiper-container', {
            autoplay: true, //可选选项，自动滑动
        })
    },
    methods: {
        goState(path) {
            this.$router.push(path);
        },
    }
}
</script>
<!-- stylus编写样式 -->
<style lang="less" scoped>
@height: 2rem;


.home {
    padding-bottom: 1.3333rem;

    .search {
        position: sticky;
        top: 0;
        z-index: 100;
    }

    .vtabs {
        padding: 0;
    }

    .van-tabs__wrap {
        box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2);

        // 控制tab标签的字体样式
        span {
            color: rgb(116, 116, 116);
            border-color: rgb(242, 242, 242);
        }
    }

    // 搜索没有
    // 大标签页没有
    // 8个标签页分别布局
    // 1.第一个标签页布局
    .swiper-container {
        width: 6rem;
        height: 3rem;
    }

    .home-page-one {

        // 轮播图
        .home-swiper-warpper {}

        // 5个商品详情
        .home-nav-img {
            width: 20%;
            height: @height;
            display: inline-block;

            img {
                width: @height;
                height: @height;
                display: block;
            }
        }

        // 一条横线
        .home-divider-line {
            height: 0.16rem;
            border-bottom: 0.16rem solid rgb(245, 245, 245);
            background-color: rgb(245, 245, 245);
        }

        // 主图部分
        .home-content {
            height: 6.5rem;
            // background-color: red;

            .home-content-left {
                width: 100%;
                height: 7.5rem;
                // background-color: #e49;

                img {
                    max-width: 100%;
                    max-height: 100%;
                }
            }

            .home-content-right {
                width: 100%;
                height: 6.5rem;
                // background-color: yellow;

                .home-content-top {
                    width: 100%;
                    height: 55%;
                    // background-color: #e49654;
                    padding: 0 0 0 .1rem;

                    img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        max-width: 100%;
                    }
                }

                .home-content-bottom {
                    width: 100%;
                    height: 53%;
                    // background-color: #954;
                    padding-left: .1rem;
                    padding-top: .05rem;
                }

            }
        }

        // 新品热卖
        .home-new-product {
            padding-top: .35rem;

            .home-new-product-img {}

        }

        // 每日精选
        .home-day-product {
            width: 100%;
            height: 6rem;
        }

        // 商品售卖
        .home-sale {
            width: 100%;
            height: 32rem;

            .van-row {
                margin-top: .2rem;
            }

            .home-sale-img {
                position: relative;

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

        // 更多小米手机产品
        .home-more {
            font-size: .4rem;
            text-align: center;

            .title {
                color: rgba(0, 0, 0, .6);
            }
        }
    }

    // 2.第三个标签页布局
    .noopsyche-page-three {

        // a.轮播图部分
        .noopsyche-swiper-warpper {}

        // b.导航部分
        .noopseyche_nav {
            .noopseyche-nav-img {
                width: 20%;
                height: @height;
                display: inline-block;

                img {
                    width: @height;
                    height: @height;
                    display: block;
                }
            }
        }
    }

}
</style>