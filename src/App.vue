<template>
    <div id="app" class="app">
        <!-- 路由部分 -->
        <router-view v-if="isRouterAlive"></router-view>
        <!-- 导航 -->
        <!-- v-show=""控制只有在4个一级路由里面显示 -->
        <!-- $route当前路由 控制meta-->
        <FooterGuide v-show="$route.meta.showFooter" />
        <!-- <a>{{$store.state.allCommodities}}</a> -->
        <!-- <button @click="add">数组增加</button> -->
    </div>
</template>
<script>
//引入导航部分
import Vue from 'vue'
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
import axios from 'axios'

// =============
// vuex的另外一种引入数据方法
import { mapActions } from 'vuex'


// 定义api网址
// const url = 'https://v2.api.haodanku.com/itemlist/apikey/hzjholy/nav/3/cid/0/back/10/min_id/1'
// 写了代理服务器就是修改https，避免跨域问题
let name = 3
let url = `/api/itemlist/apikey/hzjholy/nav/${name}/cid/0/back/100/min_id/1`

export default {
    name: 'app',
    components: {
        FooterGuide
    },
    provide(){
        return{
            // 重新加载页面
            reload: this.reload,
        }
    },
    data() {
        return {
            // 是否加载页面判断
            isRouterAlive: true,
        }
    },
    mounted(){
        // 除了这种方法还有其他方法
        // this.$store.dispatch('getdata')
        // ============
        // 调用获取数据的方法
        this.getdata()
    },
    // store
    // 计算属性
    computed: {
        addpush() {
            // 读取store.js的getters
            return this.$store.getters.addpush
        }
    },
    // 方法
    methods: {
        add() {
            // 通知vuex更新数据
            // 分发事件
            // 参数一：消息名
            // 参数二：操作的数据
            // 触发store中对应的action调用
            // action对应名
            this.$store.dispatch('add')
        },
        // 另外一种获取数据的方法
        // 更新状态
        ...mapActions(['getdata']),
        // 是否刷新页面
        reload(){
            this.isRouterAlive = false
            this.$nextTick(function(){
                this.isRouterAlive
            })
        }
    },
    created() {
        // store
        // ================
        // webpack-proxy代理服务器使用方法
        console.log(url)
        let name = 5
        console.log(url)

        // let url1 = url.substr(1,32)
        // 默认全部商品
        //（1实时跑单商品，2爆单榜商品，3全部商品，4纯视频单，5聚淘专区）
        // let url2 = [1,2,3,4,5]
        // let url3 = url.substr(34)
        // console.log('url1 ==> ',url1)
        // console.log('url2[4] ==> ',url2[4])
        // console.log('url3 ==> ',url3)
        // url = url1 + url2 + url3
        // console.log('url ==> ',url)
        // 问题：不是const定义的，
        // 针对不同的数据需要不同的截取url地址更改字符串
        // axios获取数据
        axios.get(url).then(response => {
            // console.log(response.data)
            console.log(url)
            // this.allCommodities = response.data
            // console.log(this.allCommodities)
        }, err => {
            alert(err)
        })

        // ==============================
        // superagent使用方法
        // this.axios.get('/test/superagent').then(res =>{
        //     console.log(res)
        // })
        // ==============================
        // 参数改变获取
        // get请求
        // this.axios.get('/test/superagent?aaa').then(res =>{
        //     console.log(res)
        // })
        // ================================
        // post请求
        // this.axios.post('/test/post',{
        //     firstName: 'Fred',
        //     lastName: 'Fiile'
        // }).then(function(response){
        //     console.log(response)
        // })
    }
}
</script>
<!-- stylus编写样式 -->
<style lang="less">
.app {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    // ===============
    // 移动端在电脑展示技巧
    max-width: 640PX;
    margin: 0 auto;
}

.auto-img {
    width: 100%;
    height: auto;
    display: block;
    max-width: 100%;
    max-height: 100%;
}

// 一条横线
.home-divider-line {
    height: 0.16rem;
    border-bottom: 0.16rem solid rgb(245, 245, 245);
    background-color: rgb(245, 245, 245);
}

.fl {
    float: left;
}

.fr {
    float: right;
}

// 清除浮动
.clearfix::after {
    content: ".";
    clear: both;
    display: block;
    overflow: hidden;
    font-size: 0;
    height: 0;
}

.clearfix {
    zoom: 1;
    // 为了IE6和IE7浏览器，
    // 要给clearfix这个
    // class添加一条zoom:1;触发haslayout。
}

.text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>