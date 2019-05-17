<template>
    <div class="footerguide">
        <!-- 标签导航 -->
        <!-- <van-tabbar v-model="active" active-color="#F56D02" ref="tabbar" class="tabbar"> -->
        <!-- <van-tabbar-item :icon="item.icon" v-for="(item,index) in tabs" :key="index">{{item.title}}</van-tabbar-item> -->
        <!-- <van-tabbar-item icon="home-o" @click="goTo('/home')">首页</van-tabbar-item>
            <van-tabbar-item icon="orders-o" @click="goTo('/classify/hot')">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" @click="goTo('/shopcart')">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager-o" @click="goTo('/profile')">我的</van-tabbar-item> -->
        <!-- <van-tabbar-item :class="{active: item.isCheck}" :icon="item.icon" v-for="(item, index) in tabs" :key="index" @click="go(item.path)">{{item.title}}</van-tabbar-item> -->
        <!-- </van-tabbar> -->
        <div class="tabbar">
            <div :class="{active: item.isCheck}" v-for="(item, index) in tabs" :key="index" @click="changeActive(item, index)">
                <p class="tabicon">
                    <van-icon :class="{active: item.isCheck}" :name="item.icon" class="t-icon" />
                </p>
                <div> {{item.title}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
    name: 'FooterGuide',
    data() {
        return {
            idx: 0,
            active: 0,
            // 标签导航数组
            tabs: [
                { title: '首页', icon: "home-o", isCheck: true, path: { name: 'Home' }, flag: 'home' },
                { title: '分类', icon: "orders-o", isCheck: false, path: { name: 'New' }, flag: 'classify' },
                { title: '购物车', icon: "shopping-cart-o", isCheck: false, path: { name: 'Shopcart' }, flag: 'shopcart' },
                { title: '我的', icon: "manager-o", isCheck: false, path: { name: 'Profile' }, flag: 'profile' },
            ],
            i: 1,
        }
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem

    },
    methods: {
        // 点击导航跳转页面
        goTo(path) {
            var tabbar = this.$refs.tabbar.$el.children[0].style.cssText
            tabbar = 'color: rgb(245, 109, 2)';
            // console.log('tabbar ==> ',tabbar)
            this.$router.replace(path)
        },
        // 
        go(path) {
            this.$router.push(path);
        },
        changeActive(item, index) {

            if (this.idx == index) {
                return;
            }

            item.isCheck = true;

            this.tabs[this.idx].isCheck = false;

            this.idx = index;

            this.$router.push(item.path);

        }
    },
    created() {

        // var timer = setTimeout(function() {
        //     window.location.reload()
        // }, 1000)
        // clearInterval(timer)


        // 商品跳转修改激活状态
        // this.active = this.$route.query.active || 0
        var active = this.$route.query.active
        this.active = active == undefined ? 0 : Number(active)
        // =========================
        // 修改下标的激活状态
        var hash = location.hash; // #/xxxx/xxx
        // console.log('hash ==> ', hash)

        for (var i = 0; i < this.tabs.length; i++) {
            if (hash.indexOf(this.tabs[i].flag) > -1) {
                this.tabs[i].isCheck = true;
                this.idx = i;
                // console.log('true')
            } else {
                this.tabs[i].isCheck = false;
                // console.log('false')
            }
        }

    }
}
</script>
<style lang="less" scoped>
.footerguide {

    // 标签导航大盒子
    .tabbar {
        max-width: 640PX;
        // 有定位的话，margin auto是不能居中的
        margin: 0 auto;
        // 需要在配合一个left和right为0,margin才会生效并居中
        right: 0;
        background-color: #fff;
        overflow: hidden;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        font-size: 12PX;
        color: #999;

        // 每个标签的图标
        .tabicon {
            width: .5rem;
            height: .5rem;
            margin: 0 auto;
            margin-left: .95rem;
            color: #999;

            .t-icon {
                font-size: 24PX;
            }
        }

        // 每个标签
        &>div {
            float: left;
            width: 25%;
            text-align: center;
            height: 50px;
            line-height: 50px;
            background-color: #f8f8f8;
        }
    }
}

.active {
    color: #ff6700;
}
</style>