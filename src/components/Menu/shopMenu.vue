<template>
    <div>
        <div class="shopMenu" v-show="data[0]!== undefined">
            <div class="main ">
                <!-- 局部左右 -->
                <!-- 左边分类显示 -->
                <div class="menu wrapper" ref="wrapper">
                    <!-- <div v-for="(item,index) in menus" :key="index">{{item.title}}</div> -->
                    <ul class="content">
                        <li v-for="(item,index) in shopList" :key="index" :class="{current: index===currentIndex}" @click="clickMenuItem(index)">{{shopList[index].main_name}}</li>
                    </ul>
                </div>
                <!-- ================================= -->
                <!-- 右边商品展示 -->
                <div class="menu-content shopWrapper" ref="shopWrapper">
                    <!-- <newshop /> -->
                    <!-- <Crowd/> -->
                    <!-- <div class="newProduct"> -->
                    <div class="shopWrapper newProduct">
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
                                </van-row>
                            </li>
                        </ul>
                    </div>
                    <!-- </div> -->
                </div>
            </div>
        </div>
        <div v-show="data[0] == undefined">
            <Loading />
        </div>
    </div>
</template>
<script>
//读取数据
import { mapState } from 'vuex'

//引入新品组件
import newshop from '../../components/Menu/New.vue'
// 引入众筹
import Crowd from '../../components/Menu/Crowd.vue'
// 引入better-scroll的js库
import BScroll from 'better-scroll'
// ==========================
// 怎么知道列表显示？先watch在nextTick
// 列表显示之后创建
// better-scroll
// new BScroll('.menu')

// ===========================
export default {
    name: 'shopMenu',
    data() {
        return {
            // 滚动的Y值
            scrollY: 0,
            // 所有分类标题的高度的数组
            tops: [],
        }
    },
    components: {
        // 组件映射成标签
        newshop,
        Crowd
    },
    mounted() {

        // 从state获取家电分类的数据
        // 里面是异步获取数据，这里是同步获取
        // 初始化代码和回调代码
        // 得到数据在回调代码执行
        // 异步代码是同步代码之后执行
        // this.$refs.wrapper.click()
        // 会触发actions.js中的getAppliancedata函数
        // 全部商品
        this.$store.dispatch('getdata')
        // 获取商品列表分类
        // 后面可以传递回调函数的数据
        // 回调函数在数据更新后执行
        this.$store.dispatch('getShopList', () => {
            // 数据更新后执行
            this.$nextTick(() => {
                // 回调函数在列表数据更新显示后执行
                // 配合action.js的回调函数
                // 列表显示之后创建
                // =====================
                // 初始化滚动条
                this._initScroll()
                this._initTops()

            })

        })
    },
    computed: {
        // 读取数据
        ...mapState(['appliancedata', 'data', 'shopList']),

        // 计算得到当前分类的下标
        // bug惯性的滑动没有收集
        currentIndex() {
            // 初始化执行一次，相关数据发生变化会执行
            // 得到相关的条件数据
            const { scrollY, tops } = this
            // 根据条件计算产生结果
            // 找到tops数组的下标
            /*
                [0,3,8,11]
                找5，返回-1
                找8，返回当前的下标
                找的数据就是scrollY
                tops就是对应的数组数据
                比如找5就是1
                5在3-8的区间，下标是1
                找11是3
                11是区间的第一个就是3
                需要看区间
            */
            const index = tops.findIndex((top, index) => {
                // 结果的逻辑处理---重点
                // 找到当前正确的下标
                // scrollY >= 当前top 而且小于第二个 && scrollY < 下一个top
                return scrollY >= top && scrollY < tops[index + 1]
            })
            // 箭头函数返回的结果是什么类型?
            // 确定index是否是我要找的,遍历寻找，返回true就是找到
            // 当前结束的下标就是返回的结果
            // =========================
            // 返回结果(数值)
            return index
        }
    },
    methods: {
        // 加下划线是区分事件回调函数的普通方法
        // 初始化
        _initScroll() {
            /*
                    使用注意：
                    wrapper里面不能存在多个同级div，
                */
            // new BScroll('.wrapper')
            // let wrapper = document.querySelector('.wrapper')
            // let scroll = new BScroll(wrapper, {})
            // scroll.refresh()
            new BScroll('.wrapper', {
                // 配置对象
                // 默认是垂直滑动
                scrollY: true,
                // 所有重新事件封装
                // 注意这里的click需要开启，否则点击事件无效
                // better-scroll默认会阻止浏览器原生的click事件
                // 为true会派发click事件
                click: true,
            })
            // this.scroll = new BScroll(this.$refs.wrapper, {
            // })
            // scroll更新数据
            // this.scroll.refresh()
            // testing
            // if (!this.scroll) {
            //     this.scroll = new BScroll(this.$refs.wrapper, {})
            //     console.log(this.scroll)
            // }
            // 右侧
            this.shopsScroll = new BScroll('.shopWrapper', {
                // 因为惯性滑动，不会触发
                probeType: 2,
                // 2的话，惯性滑动没有触发，出现点问题
                // 改为3，惯性滑动可以
                // probeType: 3
                click: true
            })
            this.shopsScroll.finishPullUp()
            // 给右侧绑定scroll监听
            // 参数一：事件名
            // 参数二：回调函数
            this.shopsScroll.on('scroll', ({ x, y }) => {
                console.log(x, y)
                // 收集Y值
                this.scrollY = Math.abs(y)
                // 收集tops
                // 列表第一次显示收集
            })
            // 给右侧绑定scroll结束的监听
            this.shopsScroll.on('scrollEnd', ({ x, y }) => {
                console.log('scrollEnd', x, y)
                // 收集Y值
                this.scrollY = Math.abs(y)
                // 收集tops
                // 列表第一次显示收集
            })
        },
        // 初始化tops
        _initTops() {
            // 1.初始化tops
            const tops = []
            // 第一个top为0
            let top = 0
            tops.push(top)
            // 2.收集tops
            // 找到右侧所有分类的li
            // 伪数组
            const lis = this.$refs.shopWrapper.getElementsByClassName('listbox')
            // const lis = this.$refs.shopUl.children
            Array.prototype.slice.call(lis).forEach(li => {
                top += li.clientHeight
                tops.push(top)
            })
            // 3.更新状态
            this.tops = tops
            console.log('tops ==> ', tops)
        },
        // 左侧点击改变右边移动
        clickMenuItem(index) {
            // console.log(index)
            // 得到目标位置的scrollY
            const scrollY = this.tops[index]
            // 右边的颜色慢变有点卡顿的感觉
            // 立即更新scrollY(点击的分类项更新成为当前分类)
            this.scrollY = scrollY
            // 点击使右侧列表滑动到对应的位置
            // 滑动问题？编码 this.shopsScroll
            // 向下是负数
            // 平滑滚动右侧列表
            this.shopsScroll.scrollTo(0, -scrollY, 300)
        }

    }
}
</script>
<style lang="less">
.product {
    float: left;
}

.newProduct {
    padding-top: 1rem;
    padding-bottom: 1rem;

    // 头部图片
    header {
        height: 2rem;
        padding: .5rem;
    }

    .shopWrapper {
        // height: 20rem;
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
                    font-size: .4rem;
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

.menu-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    overflow: hidden;
}

.shopMenu {
    .main {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        // 这样设置会铺满整个屏幕
        padding-top: 1.33333rem;
        padding-bottom: 1.3333rem;

        // 左侧菜单栏
        .menu {
            // 固定定位
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            width: 2.66666rem;
            background-color: #fff;
            padding-top: 1.33333rem;
            padding-bottom: 1.3333rem;
            // 盒子必须有高度
            height: 15rem;
            color: #3c3c3c;
            // 内容超出可以滚动
            // 不用这个，使用第三方滑动库解决
            // overflow-y: auto;

            // 菜单大盒子
            .content {
                padding: 1.5rem 0;
            }

            // 菜单下面的标签
            li {
                font-size: 20PX;
                color: #333;
                text-align: center;
                height: 1.5rem;
                line-height: 1.5rem;
            }

            .current {
                color: #ff6700;
                font-size: .65rem;
            }
        }

        // 右侧菜单内容
        .menu-content {
            position: absolute;
            top: 0;
            width: calc(~"100% - 2.6666rem");
            left: 2.6666rem;
            bottom: 0;
            // background-color: #e43;
            // 溢出内容就会出现滚动条
            // overflow-y: auto;
            padding-top: 1.3333rem;
            padding-bottom: 1.3333rem;
        }
    }
}
</style>