<template>
    <header>
    	<!-- <slot name="left">返回</slot> -->
        <van-nav-bar title="购物车" left-arrow >
            <van-icon name="search" slot="right" />
            <!-- 对应下面props的名字 -->
            <span>{{aaa}}</span>
        </van-nav-bar>
    	<!-- <slot name="right">搜索</slot> -->

    </header>
</template>
<script>
//导入组件
import { NavBar, Icon } from 'vant';


export default {
    name: 'HeaderTop',
    data(){
    	return{
    		aaa: '购物车'
    	}
    },
    // 组件注册使用
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,

    },
    methods: {
        onClickLeft() {
            Toast('返回');
        },
        onClickRight() {
            Toast('按钮');
        },
        // 点击导航跳转页面
        goTo(path) {
            this.$router.replace(path)

        }
    },
    // 组件接受名字，需要声明
    props: {
    	// 对应上面的名字
    	title: String,
    }
}
</script>
<!-- stylus编写样式 -->
<style lang="less" scoped>
.van-nav-bar .van-icon {
    color: #666;
    font-size: .7rem;
    line-height: .6rem;
}

header {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    right: 0;
    background: #f2f2f2;

    .van-nav-bar {

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
</style>