<template>
    <div class="profile">
        <!-- 用户信息 -->
        <header class="header">
            <div class="user">
                <!-- 用户 -->
                <div class="user-img">
                    <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/profile/user.png" class="auto-img" @click="userLogin">
                </div>
                <!-- 注册登录 -->
                <div class="user-name" @click="userLogin" v-if="isLogin">
                    登录/注册
                </div>
                <!-- 用户信息 -->
                <div class="userId" v-if="!isLogin">用户id:{{user}}</div>
                <!-- <nut-dialog title="协议声明" :visible="dialogShow" @close="dialogShow=false" cancelBtnTxt="不同意" okBtnTxt="同意">
                    <a href="javascript:;" @click="dialogShow=false" :noCancelBtn="true">
                        <div class="user-name-dialog">
                            <a href="javascript:;">《小米商城用户协议》</a>
                            <a href="javascript:;">《账号协议》</a>
                            <a href="javascript:;">《隐私政策》</a>
                            <p>请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件</p>
                        </div>
                    </a>
                </nut-dialog> -->
                <van-dialog v-model="show" title="标题" show-cancel-button>
                </van-dialog>
            </div>
        </header>
        <!-- 我的订单 -->
        <div class="myorder">
            <van-cell-group>
                <!-- is-link 展示箭头 -->
                <!-- <van-cell title="我的订单" value="全部订单" is-link url="https://m.mi.com/user" style="border-bottom: 1px solid rgba(0,0,0,.15);"/> -->
                <van-cell title="我的订单" value="全部订单" is-link @click="to('order')" style="border-bottom: 1px solid rgba(0,0,0,.15);" />
            </van-cell-group>
            </nut-cell>
        </div>
        <div class="profile-order-details">
            <van-row type="flex" justify="space-around">
                <van-col span="4" class="order-details-info">
                    <a href="#" class="order-icon-box">
                        <!-- 待付款字体icon -->
                        <!-- <div class="iconfont iconweixiuoff"></div> -->
                        <div class="order-icon">
                            <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/profile/1.jpg" class="auto-img">
                        </div>
                        <!-- 文字 -->
                        <span>待付款</span>
                    </a>
                </van-col>
                <van-col span="4" class="order-details-info">
                    <a href="#" class="order-icon-box">
                        <div class="order-icon">
                            <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/profile/2.jpg" class="auto-img">
                        </div>
                        <!-- 文字 -->
                        <span>待收货</span>
                    </a>
                </van-col>
                <van-col span="4" class="order-details-info">
                    <a href="#" class="order-icon-box">
                        <!-- 待付款字体icon -->
                        <div class="order-icon">
                            <div class="iconfont iconweixiuoff maintain-icon"></div>
                        </div>
                        <!-- 文字 -->
                        <span>退换修</span>
                    </a>
                </van-col>
            </van-row>
        </div>
        <!-- 一条横线 -->
        <div class="home-divider-line">
        </div>
        <!-- 会员中心和我的优惠 -->
        <div class="profile-member">
            <van-cell-group class="profile-member-box">
                <!-- <van-cell value="" icon="shop-o" is-link class="member-box"> -->
                <van-cell value="" is-link class="member-box" @click="to('location')">
                    <template slot="title">
                        <div class="member-icon">
                            <div class="iconfont iconweixiuoff maintain-icon"></div>
                        </div>
                        <span class="custom-text">收货地址</span>
                    </template>
                </van-cell>
                <van-cell value="" icon="shop-o" is-link class="member-box">
                    <template slot="title">
                        <span class="custom-text">我的优惠</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        <!-- 一条横线 -->
        <div class="home-divider-line">
        </div>
        <!-- 服务中心和小米之家 -->
        <div class="profile-member">
            <van-cell-group class="profile-member-box">
                <van-cell value="" icon="shop-o" is-link class="member-box">
                    <template slot="title">
                        <span class="custom-text">服务中心</span>
                    </template>
                </van-cell>
                <van-cell value="" icon="shop-o" is-link class="member-box">
                    <template slot="title">
                        <span class="custom-text">小米之家</span>
                    </template>
                </van-cell>
            </van-cell-group>
        </div>
        <!-- 一条横线 -->
        <div class="home-divider-line">
        </div>
        <!-- F码通道 -->
        <div class="profile-member">
            <van-cell value="" icon="shop-o" is-link class="member-box-one">
                <template slot="title">
                    <span class="custom-text">F码通道</span>
                </template>
            </van-cell>
        </div>
        <!-- 一条横线 -->
        <div class="home-divider-line">
        </div>
        <!-- 设置 -->
        <div class="profile-member">
            <van-cell value="" icon="shop-o" is-link class="member-box-one">
                <template slot="title">
                    <span class="custom-text">设置</span>
                </template>
            </van-cell>
        </div>
        <van-button type="danger" size="large" class="quitbtn" @click="quit" v-if="!isLogin">退出账号</van-button>
        <div class="box">
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
// Dialog提示框，Cell 京东单元格布局
// import { Picker } from '@nutui/nutui';
// vant Layout 布局
import { Row, Col } from 'vant';
// vant Cell 单元格
import { Cell, CellGroup } from 'vant';
// vant 提示框，用京东的会有冲突
import { Dialog } from 'vant'

// Dialog.install(Vue);
// Picker.install(Vue);
Vue.use(Cell).use(CellGroup);
Vue.use(Dialog);
export default {
    name: 'Profile',
    data() {
        return {
            show: false,
            // vant组件注册
            components: {
                [Row.name]: Row,
                [Col.name]: Col,
                [Cell.name]: Cell,
                [CellGroup.name]: CellGroup,
                [Dialog.name]: Dialog,
            },
            // ==============
            // 是否显示登陆注册
            isLogin: true,
            // 用户
            user: '',


        };
    },
    created() {
        // 获取用户登录信息
        var user = localStorage.getItem('userLogin')
        if (!user || user == {} || user == '') {
            // 不存在用户信息，显示登陆注册
            this.isLogin = true;
            // console.log('true')
        } else if(user) {
            // 显示用户id
            this.isLogin = false
            this.user = user == undefined ? '' : JSON.parse(user).userId
        }


    },
    methods: {
        // 点击导航跳转页面
        to(topath) {
            this.$router.push({ path: topath })
        },
        userLogin() {
            // this.dialogShow = true
            // console.log(this.$router)
            var routerlink = this.$router
            var link = function() {
                routerlink.push({ path: 'login' })
            }

            // this.$dialog({
            //     title: '请注册登录',
            //     onOkBtn(event) { //确定按钮点击事件
            //         // alert("okBtn");
            //        // console.log(this)
            //        // 页面跳转
            //         link()
            //         this.close(); //关闭对话框
            //     },
            // })
            Dialog.confirm({
                title: '协议说明',
                message: `<div class="user-name-dialog">
                <nobr> <a href="javascript:;" style="color: #ff6700;
    margin-right: 0.1rem;display: inline-block;">《小米商城用户协议》</a>
                            <a href="javascript:;" style="color: #ff6700;
    margin-right: 0.1rem;display: inline-block;">《账号协议》</a>
                            </nobr>
                            <a href="javascript:;" style="color: #ff6700;
    margin-right: 0.1rem;display: inline-block;float:left;">《隐私政策》</a>
                           
                            <p style="position: relative;
    top: -1rem;    line-height: 1.5em;
    color: #676767;">请您仔细阅读以上协议，其中有对您权利义务的特别约定等重要条款，同意后方可使用本软件</p>
                        </div>`,
                cancelButtonText: "不同意",
                confirmButtonText: "同意",
                confirmButtonColor: "#ff6700"
            }).then(() => {
                // on confirm
                link()
            }).catch(() => {
                // on cancel
            });
        },

        quit() {
            //清空状态
            localStorage.removeItem('userLogin')
            // 显示登录注册
            this.isLogin = true;
        }



    },


}
</script>
<style lang="less" scoped>
// 修改退换修等字体
.profile-order-details .order-details-info .order-icon-box span {
    width: 2rem !important;
}

.header {
    z-index: 2000;
}

.usertitle {
    color: red !important;


}

.nut-dialog-footer .nut-dialog-ok {
    color: #fff;
    background: #ff6700 !important;
}

.profile {
    padding-bottom: .5rem;
}

header {
    width: 100%;
    height: 1.5rem;
    background: url(http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/profile/topbg.png) center 0 #f37d0f;
    background-size: auto 100%;
    padding: .32rem 0;

    .user {
        .user-img {
            margin: 0 .3rem 0 .5rem;
            width: 1.5rem;
            height: 1.5rem;
            overflow: hidden;
            box-sizing: border-box;
            border-radius: 100%;
            border: 3px solid hsla(0, 0%, 100%, .4);
            text-align: center;
            display: inline-block;
            vertical-align: middle;

        }

        .user-name {
            display: inline-block;
            color: #fff;
            font-size: .24rem;
            line-height: .96rem;
            text-align: left;
        }

        .userId {
            display: inline-block;
            color: #fff;
            font-size: .24rem;
            line-height: .96rem;
            text-align: left;
        }

        // 弹出信息
        .user-name-dialog {
            font-size: .3rem !important;

            a {
                color: #ff6700;
                margin-right: 0.1rem;
            }

            p {
                color: #676767;
                line-height: 1rem;
            }

        }
    }
}

// 我的订单
.myorder {
    width: 100%;
    height: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, .15);
    color: rgba(0, 0, 0, .54);
    background-color: #fff;

    span {
        color: rgba(0, 0, 0, .87);
    }
}

// 订单详情
.profile-order-details {
    width: 100%;
    height: 2.7rem;
    // background-color: #d49;
    margin-top: .3rem;

    .order-details-info {
        width: 20%;
        height: 100%;
        // background-color: red;

        .order-icon-box {
            width: 1rem;
            height: 2rem;
            margin: .5rem auto .16rem;
            display: block;

            span {
                display: inline-block;
                padding-top: .2rem;
                color: rgba(0, 0, 0, .87);
            }

            .order-icon {
                .maintain-icon {
                    font-size: 1rem;
                    color: #9B9696;
                }
            }

        }
    }
}

// 单独设置icon
.member-icon {
    display: inline-block;
    margin-right: .1rem;
}

// 会员中心和我的优惠
.profile-member {

    // 多行的设置
    .profile-member-box {
        width: 100%;
        height: 3rem;

        .member-box {
            height: 50%;
            font-size: .45rem;
        }
    }

    // 一行的设置
    .member-box-one {
        width: 100%;
        height: 1.3rem;
        font-size: .45rem;
    }
}

// 退出登录按钮
.quitbtn {
    margin-top: 1rem;
    background-color: #ff6700;
    border: 1px solid #ff6700;
}

.box {
    width: 100%;
    height: 1rem;
    background-color: #f5f5f5 !important;
}
</style>