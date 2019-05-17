<template>
    <div>
        <div class="login">
            <!-- <van-nav-bar title="" left-arrow @click-left="goTo('/profile')" @click-right="onClickRight" class="nav"> -->
            <van-nav-bar title="" left-arrow @click-left="$router.back()" @click-right="onClickRight" class="nav" right-text="注册">
                <!-- <van-icon name="search" slot="" /> -->
                <!-- <span class="Register-text">注册</span> -->
            </van-nav-bar>
            <!-- <div class="nav"> -->
            <!-- <span @click="register">注册</span> -->
            <!-- <router-link :to="{name : 'Register'}" class="Register-text">注册</router-link> -->
            <!-- <span class="Register-text">注册</span> -->
            <!-- </div> -->
            <div class="login-content">
                <div class="logo">
                    <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <rect width="48" height="48" rx="3" ry="3" style="fill:#ff6700"></rect>
                        <rect x="10" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
                        <rect x="33.75" y="15" width="4.2" height="18" style="fill:#FFFFFF"></rect>
                        <rect x="11.25" y="15" width="15" height="4.1" style="fill:#FFFFFF"></rect>
                        <rect x="26.2" y="20.55" width="4.2" height="12.5" style="fill:#FFFFFF"></rect>
                        <rect x="20.6" y="15" width="9.8" height="9.8" rx="4.4" ry="4.4" style="fill:#FFFFFF"></rect>
                        <rect x="20.2" y="19" width="6" height="6" rx="2" ry="2" style="fill:#ff6700"></rect>
                        <rect x="18" y="19.1" width="4" height="2.2" style="fill:#ff6700"></rect>
                        <rect x="24.2" y="23" width="1.94" height="10" style="fill:#ff6700"></rect>
                        <rect x="18.1" y="22.8" width="4.2" height="10.2" style="fill:#FFFFFF"></rect>
                    </svg>
                </div>
                <p>小米账号登录</p>
            </div>
            <van-row>
                <van-col offset="2" span="20">
                    <van-cell-group>
                        <van-field label="手机号" placeholder="请输入手机号码" v-model="userInfo.phone" />
                        <van-field label="密码" type="password" v-model="userInfo.pwd" placeholder="密码(8-16位)" />
                        <!-- <van-field label="验证码" type="password" placeholder="短信验证码" v-model="userInfo.pwd" /> -->
                        <!-- 看密码就是type="password"换文本类型 -->
                        <!-- <van-field label="验证码" v-model="userInfo.validcode" placeholder="短信验证码">
                            <van-button slot="button" type="primary" size="small" @click="sendValidCode" :disabled="isDisabled">获取验证码</van-button>
                        </van-field> -->
                        </van-field>
                    </van-cell-group>
                    <!-- <van-button class="login-btn" size="large" type="info" @click="login">登录</van-button> -->
                    <van-button class="login-btn" size="large" type="info" @click="login()">登录</van-button>
                    <!-- :disabled="isDisabled" -->
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import { CellGroup, Field, Button, NavBar, Icon } from 'vant'
// 导入表单验证脚本
import validForm from '../../common/utils/validForm.js'
// 导入提示脚本
import tip from '../../common/utils/tip.js'
export default {
    name: 'Login',
    data() {
        return {
            // 用户列表
            users: [],
            // 用户信息
            userInfo: {
                phone: '',
                pwd: '',
            }
        }
    },

    /*注册组件*/
    components: {
        [CellGroup.name]: CellGroup,
        [Field.name]: Field,
        [Button.name]: Button,
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
    },
    methods: {
        // onClickLeft() {
        //     Toast('返回');
        // },
        onClickRight() {
            this.$router.push({ path: 'register' })
        },
        // 点击导航跳转页面
        // goTo(path) {
        //     this.$router.replace(path)

        // }
        // 登录
        login() {
            // 验证手机号
            if (!validForm.validPhone(this.userInfo.phone)) {
                tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone')
            } else if (!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
                tip.dialogTip('密码只支持8-16位的!@._字母数字组合', true, this.userInfo, 'pwd')
                this.userInfo.repwd = ''
            }else{
                //从本地存储中获取用户数据 
                var userData = localStorage.getItem('users')
                // 本地存储判断用户是否存在
                if(userData){
                    // 如果存在任何用户
                    this.users = JSON.parse(userData)
                    // console.log(this.users)
                    // 找到手机号用户在验证密码
                    for(var i = 0 ; i < this.users.length ; i++){
                        // 遍历数组中的每一个用户对象
                        if(this.users[i].phone == this.userInfo.phone){
                            // 手机号和密码两者同时匹配才行
                            // 如果手机号匹配需要验证密码
                            if(this.users[i].pwd == this.userInfo.pwd){
                                // 保存用户登录状态
                                // {userid: 手机号, loginStaus: true}
                                localStorage.setItem('userLogin',JSON.stringify({
                                    userId: this.userInfo.phone,
                                    loginStaus: true
                                }))
                                // 登录之后温馨提示一下
                                tip.dialogTip('欢迎您' +this.userInfo.phone + '用户登录')

                                return this.$router.push({name: 'Home'})
                                // return是终止循环
                            }else {
                                // 手机号正确，密码不正确
                                // 需要不确定的提示
                                // 防止别人盗号
                                return tip.dialogTip('手机号或者密码不正确')
                                // return是终止循环
                                    
                            }
                        }
                    }
                    // 不存在手机号用户
                     tip.dialogTip('该用户不存在')
                }
            }
        },
        // back() {
        //     // 返回上一级
        //     this.$router.go(-1)
        // },
    }
}
</script>
<style lang="less" scoped>
.van-nav-bar__text {
    color: #333;
}

.van-nav-bar__text:active {
    background-color: #ff6700;
}


.login {
    .nav {
        height: 1.3333rem;
        background-color: #ff6700;
        margin-bottom: 1.3333rem;

        .van-nav-bar__text {
            color: #fff;
            font-size: 16PX;
            line-height: 1.3333rem;
        }

        .van-icon {
            color: #fff;
            font-size: 24PX;
        }
    }

    .login-content {
        .logo {
            width: 1.5rem;
            height: 1.5rem;
            margin: 0 auto .5rem;
        }

        p {
            text-align: center;
            margin-bottom: .5rem;
            font-size: .5rem;
            color: #000;
            font-weight: normal;
        }
    }

    .login-btn {
        margin-top: 1.3333rem;
        background-color: #ff6700;
        border: 0.02667rem solid #ff6700;
    }

    .van-button--primary {
        background-color: #ff6700;
        border: 0.02667rem solid #ff6700;

    }
}
</style>