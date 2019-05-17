<template>
    <div class="register">
        <!-- <div class="nav">
            <span @click="toLogin" class="Login-text">登录</span>
            <router-link :to="{name : 'login'}" class="Login-text">登录</router-link>
        </div> -->
        <van-nav-bar title="" left-arrow @click-left="$router.back()" @click-right="onClickRight" class="nav" right-text="登录">
            <!-- <van-icon name="search" slot="" /> -->
            <!-- <span class="Register-text">注册</span> -->
        </van-nav-bar>
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
            <p>小米账号注册</p>
        </div>
        <van-row>
            <van-col offset="2" span="20">
                <van-cell-group>
                    <van-field label="手机号" v-model="userInfo.phone" placeholder="请输入手机号" />
                    <van-field label="密码" type="password" v-model="userInfo.pwd" placeholder="密码(8-16位)" />
                    <van-field label="确认密码" type="password" v-model="userInfo.repwd" placeholder="请重新确认密码" />
                    <!-- 看密码就是type="password"换文本类型 -->
                    <van-field label="短信验证码" v-model="userInfo.validcode" placeholder="">
                        <van-button slot="button" type="primary" size="small" @click="sendValidCode" :disabled="isDisabled">{{validCodeText}}</van-button>
                    </van-field>
                </van-cell-group>
                <van-button class="register-btn" size="large" type="info" @click="register" :disabled="isLogin">注册</van-button>
                <!-- :disabled="isDisabled" -->
            </van-col>
        </van-row>
    </div>
</template>
<script>
//导入正则验证
import validForm from '../../common/utils/validForm.js'
// 导入提示信息
import tip from '../../common/utils/tip.js'
// 导入格式时间工具
import tool from '../../common/utils/tool.js'

//组件内部使用
//1.输入框组件
import Vue from 'vue'
import { CellGroup, Field, Button, NavBar } from 'vant';

// Vue.use(Dialog)
export default {
    name: 'Register',
    validCode: '',
    data() {
        return {
            // 随机生成验证码
            validCode: '',

            validCodeText: '获取验证码',

            // 禁用文本
            isDisabled: false,

            // 禁用登录
            isLogin: true,

            // 用户列表
            users: null,

            // 用户信息
            userInfo: {
                phone: '',
                pwd: '',
                repwd: '',
                // 用户输入的验证码
                validcode: '',
            }
        }
    },
    components: {
        // 布局
        [CellGroup.name]: CellGroup,
        // 输入框
        [Field.name]: Field,
        // 按钮
        [Button.name]: Button,
        // 弹出框
        // [Dialog.name]: Dialog
        // 导航栏
        [NavBar.name]: NavBar,
    },
    methods: {
        // 注册
        register() {
            // var isValid = validForm.validPhone('18927139546')
            // console.log(isValid)
            // console.log(this.userInfo)
            if (!validForm.validPhone(this.userInfo.phone)) {
                // 验证不通过
                //alert('验证不通过')
                // Dialog.alert({
                //     title: '手机号码不正确'
                // }).then(() => {
                //     console.log('成功了')
                //     console.log(this)
                //     // 清空内容
                //     this.userInfo.phone = ''
                // })
                tip.dialogTip('手机号码不正确', true, this.userInfo, 'phone')
            } else if (!validForm.validPwd(this.userInfo.pwd, 8, 16)) {
                // Dialog.alert({
                //     title: '密码只支持8-16位的!@._字母数字组合'
                // }).then(() => {
                //     console.log('成功了')
                //     console.log(this)
                //     // 清空内容
                //     this.userInfo.pwd = ''
                // },() => {
                //     console.log('失败了')
                // })
                tip.dialogTip('密码只支持8-16位的!@._字母数字组合', true, this.userInfo, 'pwd')
                this.userInfo.repwd = ''

            } else if (!validForm.validEqual(this.userInfo.pwd,
                    this.userInfo.repwd)) {

                //  Dialog.alert({
                //     title: '两次密码不一致'
                // }).then(() => {
                //     console.log('成功了')
                //     console.log(this)
                //     // 清空内容
                //     this.userInfo.repwd = ''
                // },() => {
                //     console.log('失败了')
                // })
                tip.dialogTip('两次密码不一致', true, this.userInfo, 'repwd')

            } else if (this.userInfo.validcode.length < 6 || !validForm.validEqual(this.userInfo.validcode, this.validCode)) {
                // 验证码长度6位，并且验证码一样，否则就会提示下面错误
                // Dialog.alert({
                //     title: '验证码不正确'
                // }).then(() => {
                //     this.userInfo.validcode = ''
                // })
                tip.dialogTip('验证码不正确', true, this.userInfo, 'validcode')

            } else {
                this.$toast('欢迎' + this.userInfo.phone + '用户注册成功')
                console.log(this.userInfo.phone + '用户注册成功')
                // 以上都通过
                // ======================================
                // 存储之前，验证是否已经存在用户手机号
                for (var i = 0; i < this.users.length; i++) {
                    // 如果存储存在该用户
                    // 判断是否存在唯一相同的手机号
                    if (this.users[i].phone == this.userInfo.phone) {
                        // 提示信息
                        tip.dialogTip('该手机号已被注册,请直接登录')
                        // 跳转到登录界面
                        this.$router.push({ name: 'Login' })
                        // 检查完之后打断
                        return;
                        // 终止函数执行，for循环也会被终止
                    }
                }

                // 若不存在该用户,添加一个用户到用户列表中users
                // 时间戳生成uid,生成用户id
                var time = new Date()
                var uid = 'vue' + time.getTime()
                var phone = this.userInfo.phone
                var pwd = this.userInfo.pwd
                var registerTime = tool.format(time, 'yyyy-MM-dd hh:mm:ss')

                // 综合起来一个完整对象
                var user = {
                    uid,
                    phone,
                    pwd,
                    registerTime
                }

                // 对象查看
                this.users.push(user)
                var usersData = JSON.stringify(this.users)
                console.log('usersData', usersData)
                // 有问题

                // users写入到本地存储
                localStorage.setItem('users', usersData)

                // 跳转到登录组件
                this.$router.push({ name: 'Login' })

            }

        },
        // 获取验证码
        sendValidCode() {

            this.isLogin = false
            if (!validForm.validPhone(this.userInfo.phone)) {
                // 验证不通过
                //alert('验证不通过')
                // Dialog.alert({
                //     title: '手机号码不正确'
                // }).then(() => {
                //     console.log('成功了')
                //     console.log(this)
                //     // 清空内容
                //     this.userInfo.phone = ''
                // },() => {
                //     console.log('失败了')
                // })
                tip.dialogTip('请输入正确的手机号码', true, this.userInfo, 'phone')
            } else {
                this.isDisabled = true
                var time = 60
                this.validCodeText = time + 's后重新发送'
                var timer = setInterval(() => {
                    if (time <= 0) {
                        // 启用
                        this.isDisabled = false
                        // 文本改回来
                        this.validCodeText = '发送验证码'

                        // 清除定时器
                        clearInterval(timer)
                        time = null
                    } else {
                        this.validCodeText = --time + 's后重新发送'
                    }
                }, 1000)
                // 发送验证码
                this.validCode = validForm.generateValidCode()
                this.$toast('验证码是' + this.validCode)
                console.log(this.validCode)
            }

        },
        // 跳转到登录界面
        onClickRight() {
            this.$router.push({ path: 'login' })
        }
    },

    created() {
        // 存储到浏览器本地模拟数据库
        var userData = localStorage.getItem('users');
        // console.log('userData ==> ', userData)
        this.users = userData == undefined ? [] : JSON.parse(userData)
    }
}
</script>
<style lang="less" scoped>
.register {

    .nav {
        height: 1.3333rem;
        background-color: #ff6700;
        margin-bottom: 1.3333rem;

        .van-nav-bar__text {
            color: #fff;
            font-size: 16PX;
            line-height: 1.3333rem;
        }
        .van-icon{
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
    .register-btn {
        margin-top: 1.3333rem;
    }

    // 验证码
    .van-cell{
        .van-field__button{
            button{
                font-size: 16PX;
                color:#2ea5e5;
                background-color: #fff;
                border:none;
            }
        }
    }

    // 注册按钮
    .register-btn{
        background-color: #ff6700;
        border: none;
    }

}
</style>