<template>
    <div>
        <!-- 导航搜索 -->
        <header>
            <van-nav-bar title="分类" left-arrow @click-left="goState({name : 'Shopcart'})" @click-right="goState({name: 'Search'})">
                <van-icon name="search" slot="right" />
            </van-nav-bar>
        </header>
        <!-- 商品分类主体内容 -->
        <div class="content">
            <!-- 重新布局 -->
            <shopMenu/>
            <!-- =========================================================== -->
            <!-- <div class="menu"> -->
                <!-- 第一个 新品 -->
                <!-- <div :class="{active: item.isCheck}" v-for="(item,index) in menus" :key="index" @click="toggleMenu(item,index)">{{item.title}}</div> -->
            <!-- </div> -->
            <!-- 右边的菜单内容展示 -->
            <!-- <div class="menu-content"> -->
                <!-- 三级路由 -->
                <!-- <router-view></router-view> -->
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
//导入组件
import { NavBar, Icon } from 'vant';
// 引入menu模板组件
import shopMenu from '../../components/Menu/shopMenu.vue'


export default {
    name: 'Classify',
    // 组件注册使用
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        // 组件注册映射成标签
        shopMenu
    },
    data() {
        return {
            // 标记点击的一项
            idx: 0,
            menus: [
                { title: '新品', isCheck: true, path: { name: 'New' } },
                { title: '众筹', isCheck: false, path: { name: 'Crowd' } }
            ]
        }
    },
    
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        // 点击导航跳转页面
        goState(path) {
            this.$router.replace(path)
        },
        toggleMenu(item, index) {
            // 点击同一项不能执行
            if (this.idx == index) {
                return
            }
            // 当前的点击项为true
            item.isCheck = true
            // 之前的那一项修改为false
            this.menus[this.idx].isCheck = false
            // 修改为当前项
            this.idx = index
            // 跳转对应的页面
            this.$router.push(item.path)
        }
    }
}
</script>
<!-- stylus编写样式 -->
<style lang="less" scoped>
.van-nav-bar .van-icon {
    color: #666;
    font-size: .7rem;
    line-height: 1.3333rem;
}

// 下面标签
.tabbar .van-hairline--top-bottom .van-tabbar {
    height: 1.3333rem;
}

// 导航条
header {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    right: 0;
    background: #f2f2f2;
    height: 1.3333rem;

    .van-nav-bar {
        height: 1.3333rem;

        // 控制中间标题
        .van-nav-bar__title {
            color: #666;
            font-size: .4rem;
        }

        // 控制左边箭头
        .van-icon-arrow-left {
            &:before {
                color: #666;
                line-height: .6rem;
                font-size: .7rem;
            }
        }

    }
}

// 内容主体
.active {
    background-color: #fff;
    color: #ff6700;
}

.content {
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
        background-color: #ccc;
        padding-top: 1.33333rem;
        padding-bottom: 1.3333rem;
        // 内容超出可以滚动
        overflow-y: auto;

        // 菜单下面的标签
        &>div {
            font-size: 20PX;
            // color: #ff6700;
            text-align: center;
            height: 1rem;
            line-height: 1rem;
        }
    }

    // 右侧菜单内容
    .menu-content {
        position: absolute;
        top: 0;
        width: calc(~"100% - 2.6666rem");
        left: 2.6666rem;
        bottom: 0;
        background-color: #e43;
        // 溢出内容就会出现滚动条
        overflow-y: auto;
        padding-top: 1.3333rem;
        padding-bottom: 1.3333rem;
    }
}
</style>