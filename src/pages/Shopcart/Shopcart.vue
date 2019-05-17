<template>
    <div class="shopcart">
        <header>
            <van-nav-bar title="购物车" left-arrow @click-left="back" fixed>
                <!-- <van-icon :name="icon" slot="right" v-if="isHasicon"/> -->
                <van-icon :name="icon" slot="right" v-if="isHas" @click="edit" v-show="isicon" />
            </van-nav-bar>
        </header>
        <!-- title对应前面定义的{{title}} -->
        <!-- <HeaderTop title="购物车" class="shopcart-header" @click-left="back()" @click-right="onClickRight"> -->
        <!-- 指定插入对应的插槽 -->
        <!-- <span slot="left">125553</span> -->
        <!-- <span slot="right">slot2</span> -->
        <!-- </HeaderTop> -->
        <!-- <div class="box"></div> -->
        <!-- ===================================================== -->
        <!-- 推荐商品 -->
        <div class="shopcart-product">
            <!-- 用户已经登录且购物车有东西,还继续推荐 -->
            <div v-if="isHas">
                <van-row class="card-row" v-for="(item,index) in currentUserProduct" :key="index">
                    <!-- 商品前面的勾选框 -->
                    <van-col class="card-col" :span="s1">
                        <van-checkbox v-model="item.checked" checked-color="#ff6700" @change="clacMoney"></van-checkbox>
                    </van-col>
                    <van-col :span="s2" :offset="offset">
                        <van-card :num="item.count" :price="item.price" :title="item.name" :origin-price="item.oldprice" :thumb="item.thumbnail">
                            <div slot="footer">
                                <!-- 删除按钮也需要和前面显示一样 -->
                                <van-button size="mini" v-show="isEdit" @click="removeProduct">删除</van-button>
                            </div>
                        </van-card>
                    </van-col>
                </van-row>
                <!-- 提交订单 -->
                <van-submit-bar :price="price" :button-text="text" ref="subbar" @submit="submitOrder" v-if="isSubmit">
                    <van-checkbox v-model="allChecked"@click="allSelected" checked-color="#ff6700">全选</van-checkbox>
                </van-submit-bar>
                <!-- 购物车订单信息 -->
                <div class="shopcart-like">
                    <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/shopcart/like.jpg" class="auto-img">
                </div>
                <!-- 商品售卖,，推荐 -->
                <div class="home-sale">
                    <ShopList />
                </div>
            </div>
            <!-- 没有登录或者用户登录购物车没有商品 -->
            <div class="nofound" v-if="!isHas">
                <div class="tologin">
                    <van-cell v-if="isLogin" title="登录后享受更多优惠" is-link value="去登录" @click.native="goTo('login')" />
                    <div class="shopcart-center">
                        <van-row type="flex" justify="center">
                            <van-col span="15" @click.native="goTo('home')">
                                <span>
                                    <van-icon name="shopping-cart-o" class="center-icon" />
                                </span>
                                <span class="center-title">购物车还是空的</span>
                                <span>
                                    <van-button type="default" size="mini" class="center-btn">去逛逛</van-button>
                                </span>
                            </van-col>
                        </van-row>
                    </div>
                    <div class="shopcart-like">
                        <img src="http://hzjholysvn-test.stor.sinaapp.com/vueShopping/images/shopcart/like.jpg" class="auto-img">
                    </div>
                </div>
                <!-- 商品售卖,，推荐 -->
                <div class="home-sale">
                    <van-row>
                        <van-col span="24" class="col-box" v-for="(item,index) in products" :key="index" @click.native="goState({name: 'Detail' ,params : {pid : item.id},query:{active: 1}})" :ref="'van' + index">
                            <!-- query:{active: 1}查询参数，激活按钮高亮 -->
                            <!-- 在购物车页面就是1 -->
                            <!-- <div class="home-sale-img">
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
                            </div> -->
                             <ShopList />
                        </van-col>

                        
                    </van-row>
                    <!-- 底线 -->
                    <div class="underline" v-if="isNone">嘿，我是有底线的!</div>
                </div>
            </div>
        </div>
        <van-actionsheet v-model="isordershow" title="填写订单信息">
            <!-- 订单填写信息 -->
            <van-address-edit :area-list="areaList" :show-delete="false" show-search-result @save="comfirm" save-button-text="确认" :address-info="addressInfo" />
        </van-actionsheet>
    </div>
</template>
<script>
//导入组件
import { NavBar, Icon } from 'vant';
// 引入组件，试用props和slot
import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
// 导入推荐商品组件
import ShopList from '../../components/ShopList/ShopList.vue'
// 引入Card商品卡片
import { Card } from 'vant'
// 复选框
import { Checkbox } from 'vant'
// 提交订单栏
import { SubmitBar } from 'vant'
// 引入订单信息
import { AddressEdit } from 'vant'
// 导入地址信息，三省联动
import areaList from '../../data/area.js'
// 导入上拉菜单
import { Actionsheet } from 'vant'
// 导入格式化时间脚本
import tool from '../../common/utils/tool.js'

export default {
    // 属性绑定,组件与组件之间通讯的工具props
    name: 'Shopcart',
    data() {
        return {
            // 图标是否显示
            icon: 'edit',
            // 更换图标
            isHasicon: false,
            // 是否登录显示
            isLogin: true,
            // 购物车是否有东西
            isHas: false,
            // ================
            // 商品数据
            products: [],
            // 开始截取商品下标
            startIndex: 0,
            // 结束截取商品下标
            // 因为默认截取8个
            endIndex: 8,
            // ===============
            // 所有商品
            allProducts: null,
            // 控制显示下面的底线
            isNone: false,
            // ============
            // 登录之后控制去登录关闭
            isLogin: true,
            // ============
            // 控制商品订单信息间距
            s1: 3,
            s2: 21,
            offset: 3,
            // 是否编辑状态
            isEdit: false,
            // 复选框是否选中
            checked: false,
            // ===========
            // 当前用户购物车的商品
            currentUserProduct: [],
            // ===============
            // 全选框的值
            allChecked: false,
            // ================
            // 提交订单信息按钮
            text: '提交订单',
            // 订单金额的价格为0
            price: 0,
            // ============
            // 订单提交是否显示
            isSubmit: false,
            // 是否显示编辑和确定按钮，右上角按钮
            isicon: false,
            // ===============
            // 地址数据
            areaList,
            // 订单信息收货地址是否显示
            isordershow: false,
            // =========
            // 全选框出现控制
            isAll: false,
            // ===========
            // 收货人信息
            // 仅仅作为初始化的值
            addressInfo: {
                // 每条地址的唯一标识
                id: '',
                // 收货人姓名
                name: '',
                // 手机号码
                tel: '',
                // 省份
                province: '',
                // 城市
                city: '',
                // 区县
                county: '',
                // 详细地址
                addressDetail: '',
            },
        }
    },
    // 组件注册使用
    components: {
        [NavBar.name]: NavBar,
        [Icon.name]: Icon,
        [Card.name]: Card,
        [Checkbox.name]: Checkbox,
        [SubmitBar.name]: SubmitBar,
        [AddressEdit.name]: AddressEdit,
        [Actionsheet.name]: Actionsheet,
        // 映射成标签
        HeaderTop,
        // 商品列表组件注册
        // 映射成标签 
        ShopList,
    },
    methods: {
        back() {
            // 返回上一级
            this.$router.go(-1)
        },
        // 点击导航跳转页面
        goTo(topath) {
            this.$router.push({ path: topath })
        },
        // 跳转到详情页
        goState(path) {
            this.$router.push(path)
        },
        // 编辑购物车信息
        edit() {
            // 订单金额不显示
            // 获取需要隐藏的元素
            var __text = document.getElementsByClassName('van-submit-bar__text')[0]
            // console.log(__text)
            if (!this.isEdit) {
                // 处于编辑状态
                this.isEdit = true
                //显示前面的勾选
                // this.s1 = 3
                // 后面的商品信息相对应的修改
                // this.s2 = 21
                // 显示按钮
                // this.offset = 3
                // 编辑状态后改为正确
                this.icon = 'certificate'
                // 提交订单的文本变为全部删除
                this.text = '全部删除'
                // 编辑状态下不显示金额信息
                // 不使用display，因为会改变div的存在
                // 需要让它存在但是你又看不见
                __text.style.opacity = '0'
            } else {
                // 不是编辑窗台
                this.isEdit = false
                //显示前面的勾选
                // this.s1 = 0
                // 后面的商品信息相对应的修改
                // this.s2 = 24
                // 显示按钮
                // this.offset = 0
                // 编辑状态后改为正确
                this.icon = 'edit'
                // 订单状态下为提交订单
                this.text = '提交订单'
                // 订单状态下，显示订单的金额
                __text.style.opacity = '1'
            }
            // ===============================
            // 如果购物车的全部商品被删除之后，订单就不会显示
            if (this.currentUserProduct.length === 0) {
                // this.isHas = false
                // console.log('aa')
                // 不显示订单栏
                this.isSubmit = false
                // 编辑按钮也不会出现
                this.isicon = false
            }
        },
        //移除商品
        removeProduct(index) {
            // 获取购物车内的所有商品数据
            var shopcartProduct = JSON.parse(localStorage.getItem('shopcart'));
            // 删除商品
            // 购物车中当前的商品数据,是一个许多对象构成的数组
            // 逻辑删除
            // 获取单击删除的商品信息
            // 有且只有一项
            // var product = this.currentUserProduct.splice(index, 1)[0]
            // 全部删除，共用此方法，修改
            // 判断传入进来的参数
            // 是不是为空(undefined)就是全部删除，否则就是单个删除
            var product = index == undefined ? this.currentUserProduct.splice(0) :
                this.currentUserProduct.splice(index, 1);
            // console.log(product)
            // 遍历删除全部商品
            for (var n = 0; n < product.length; n++) {
                // 获取事件
                // 获取需要删除商品的时间戳
                var time = new Date(product[n].time).getTime()
                // console.log(this.currentUserProduct)
                for (var i = 0; i < shopcartProduct.length; i++) {
                    var v = shopcartProduct[i]
                    // 浏览器本地存储中删除商品,3个条件判断，否则会误删
                    // 根据购物车当中商品的信息与之删除的信息匹配
                    // 获取购物车商品的时间戳
                    var t = new Date(v.time).getTime()
                    // 用户id
                    // 商品id
                    // 时间戳
                    if (v.userId == product[n].userId && v.id == product[n].id && t == time) {
                        // 删除单一当前商品数据
                        shopcartProduct.splice(i, 1);
                        break;
                    }
                }
            }
            // 重新写入购物车数据
            localStorage.setItem('shopcart', JSON.stringify(shopcartProduct))
        },
        //控制商品全选
        allSelected() {
            // 改变所有商品单个按钮的值
            // 遍历
            this.currentUserProduct.forEach(v => {
                // 设置默认一开始单选框的值
                v.checked = this.allChecked
                // ===================
                // bug:当其他商品全部点击的时候，全选会被选中
            })
        },
        // 单选控制全选按钮
        allSelectedStatus() {
            // bug，搞定单选控制全选
            // 判断长度，勾选的框和购物车数据长度一样，就都是勾选了
            for (var i = 0; i < this.currentUserProduct.length; i++) {
                // 遍历判断没有选中的复选框
                // console.log(this.currentUserProduct[i].checked)
                // 只要有一项是假的，就没有全选
                if (!this.currentUserProduct[i].checked) {
                    this.allChecked = false
                    return
                }
            }
            // 可以通过的话，设置为真值
            this.checked = true
        },
        // 提交订单
        submitOrder() {
            // 提交订单初始化
            // 点击按钮，默认里面就是全选状态
            this.allChecked = true
            // 遍历获取没有选中的复选框，默认全部设置为选中
            for (var i = 0; i < this.currentUserProduct.length; i++) {
                // 遍历判断没有选中的复选框
                // console.log(this.currentUserProduct[i].checked)
                if (!this.currentUserProduct[i].checked) {
                    this.currentUserProduct[i].checked = true
                }
            }
            if (this.isEdit) {
                // 处于编辑状态
                this.removeAllProduct()
            } else {
                // ========================
                // 显示订单信息填写面板
                // 控制显示订单，只有勾选才会显示
                // 根据价格判断,个人认为不太严谨
                // 可以根据选中框是否全部勾选
                // console.log(this.allChecked)
                if (this.allChecked) {
                    // 价格大于0说明才有商品被选中
                    // 修改为只有全选才会被进来，提交表单信息
                    // 显示填写表单的信息
                    this.isordershow = true
                    // 获取收货人的初始信息
                    // 获取本地存储用户数据信息
                    var userInfo = JSON.parse(localStorage.getItem('userLogin'))
                    // console.log(userInfo)
                    // 初始化表单的默认信息
                    this.addressInfo.tel = userInfo.userId
                } else {
                    return
                }


                // ========================
                // 提交订单
                // console.log('submit')
                // 跳转到订单页面
                // this.$router.push({path: 'Order'})
            }
        },
        // 全部删除
        removeAllProduct() {
            // 判断购物车内是否有商品需要全部删除,没有商品直接拦截
            if (this.currentUserProduct.length === 0) {
                return
            }
            // console.log('delete')  
            // console.log(this.allChecked)
            // 全选的值是allChecked checked
            if (this.allChecked) {
                // console.log('全部删除')
                // 全部删除，数组为0
                // this.currentUserProduct = []
                // 复用上面单个删除的办法，如果是全部删除就是不传参
                this.removeProduct()
            } else {
                // 提示
                // 必须全选才可以选择
                // this.$toast('请选择所有商品')
            }
        },
        // 推荐商品
        sendProduct() {
            // 直接获取8个商品
            // productsData获取所有全部商品的数据信息
            var productsData = JSON.parse(localStorage.getItem('products')).products
            // 获取全部所有的商品数据
            this.allProducts = productsData
            // products需要推荐的8个商品数据
            this.products = productsData.slice(this.startIndex, this.endIndex)
            // console.log('this.products ==> ',this.products)
            // ==============
            // 修改值，懒加载添加新的商品信息
            // 修改值，固定每次+8
            this.startIndex = this.endIndex;
            this.endIndex += 8;
        },
        // 计算订单总价
        clacMoney() {
            // 清空价格
            this.price = 0;
            // 遍历获取每件购物车的商品
            this.currentUserProduct.forEach(v => {
                // 判断选项是否勾选
                if (v.checked) {
                    // 勾选要做的事情
                    // 计算总价，累加
                    // 这里获取的v.price是字符串需要转化为数字
                    // * 这里可以隐式转换为数字 
                    this.price += v.price * 100;
                    this.allChecked = true
                }
            })
            // 控制全选
            this.allSelectedStatus();
            return this.price
        },
        // 确认提交订单
        // @save 默认里面方法有个参数data就是表单填写的数据信息
        comfirm(data) {
            // 生成订单编号提交就是唯一的，根据时间戳
            data.id = 'order' + new Date().getTime().toString()
            // console.log('aa')
            // data就是收货信息
            // console.log(data)
            // ================================
            // 从购物车移除当前的商品数据
            // 先获取购物车内的商品数据
            var shopcartData = JSON.parse(localStorage.getItem('shopcart'))
            // 获取订单信息
            var orderData = localStorage.getItem('order')
            // 判断还是否有订单数据信息
            orderData = orderData == undefined ? [] : JSON.parse(orderData)
            // 生成订单id
            var orderId = 'order' + new Date ().getTime().toString()
            // 遍历当前购物车的商品数据
            // 勾选的商品
            this.currentUserProduct.forEach(v => {
                // 遍历购物车里面勾选的商品数据
                if (v.checked) {
                    // 移除当前用户的购物车商品
                    for(var i = 0 ; i < shopcartData.length ; i++){
                        // 遍历购物车的商品数据
                        // 根据用户名、商品id和时间戳
                        if(v.userId == shopcartData[i].userId && v.id == shopcartData[i].id && v.time == shopcartData[i].time){
                            // 移除购物车内的商品信息数据
                            // 判断是否同个用户
                            // 提交订单的商品id和购物车内的商品id
                            // 时间戳一样
                            // 从i开始删除1个
                            shopcartData.splice(i,1)
                            break
                        }
                    }
                    // =======================
                    // 构造我的订单信息
                    // v是商品的基本数据信息
                    // console.log(v)
                    // 添加商品的订单信息数据
                    // 地址信息
                    v.address = data.province + data.city + data.addressDetail
                    // 手机号码
                    v.phone = data.tel
                    // 联系人姓名
                    v.username = data.name
                    // 订单时间
                    v.orderTime = tool.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
                    // 订单id
                    v.orderId = orderId
                    // 订单状态
                    // 2 已收货
                    v.status = 2
                    // 写入
                    orderData.push(v)
                    // console.log(v)
                }
            })
            // 本地存储
            localStorage.setItem('order', JSON.stringify(orderData))
            // 购物车数据重新写入
            localStorage.setItem('shopcart', JSON.stringify(shopcartData))
            // 温馨提示
            this.$toast('请您确定订单信息')
           
            // ================================
            // 跳转到订单页面
            this.$router.push({path: 'Order'})

        }
    },
    // 初始化数据
    created() {
        // 获取用户登录状态
        var userLogin = localStorage.getItem('userLogin')
        // 查看用户登录状态
        // console.log('userLogin ==> ',userLogin)
        // 判断用户是哪种登录状态
        if (userLogin) {
            // 用户已经登录,获取用户信息
            userLogin = JSON.parse(userLogin)
            // 关闭去登录的显示
            this.isLogin = false
            // 获取购物车数据
            var shopcartData = localStorage.getItem('shopcart')
            // 控制一下，购物车数据是否为空
            shopcartData = shopcartData == undefined ? null : JSON.parse(shopcartData)
            // console.log(shopcartData)
            // 根据购物车判断
            if (!shopcartData.length === 0 || shopcartData) {
                // shopcartData.length === 0就是用户购物车无东西
                // !shopcartData.length === 0 就是用户购物车有东西
                // 显示订单栏
                this.isSubmit = true
                // 显示编辑确定右上角的按钮
                this.isicon = true
                // console.log('购物车有东西')
                // 购物车有商品数据
                // console.log('购物车内有数据')
                this.currentUserProduct = [];
                // 如果购物车有商品数据
                // 筛选当前用户商品的数据
                shopcartData.forEach(v => {
                    // 判断是否是同一用户
                    if (v.userId == userLogin.userId) {
                        // console.log(v)
                        // 额外添加check状态
                        v.checked = true
                        // 价格设置
                        // 价格单位转换
                        // toFixed(2)保留两位小数
                        // 当前价格
                        v.price = v.price.toFixed(2)
                        // 之前的价格设置
                        v.oldprice = v.oldprice
                        this.currentUserProduct.push(v)
                    }
                })
                // 购物车有数据就计算总价
                this.clacMoney()
                // ====================
                // 商品一进来默认全选勾选
                this.currentUserProduct.forEach(v => {
                    if (v.checked) {
                        this.allChecked = true
                    }
                })
                // 如果购物车没有商品数据
                if (this.currentUserProduct.length === 0) {
                    // 推荐商品
                    this.sendProduct()
                    // console.log('用户没有购买东西')
                    // 直接获取8个商品
                    // productsData获取所有全部商品的数据信息
                    // var productsData = JSON.parse(localStorage.getItem('products')).products
                    // // 获取全部所有的商品数据
                    // this.allProducts = productsData
                    // // products需要推荐的8个商品数据
                    // this.products = productsData.slice(this.startIndex, this.endIndex)
                    // // console.log('this.products ==> ',this.products)
                    // // ==============
                    // // 修改值，懒加载添加新的商品信息
                    // // 修改值，固定每次+8
                    // this.startIndex = this.endIndex;
                    // this.endIndex += 8;
                } else {
                    // 如果当前用户购物车有商品数据
                    // 显示购物车
                    this.isHas = true
                    // console.log('this.currentUserProduct ==> ', this.currentUserProduct)
                }
            } else {
                // 购物没有东西
                // 推荐商品
                this.sendProduct()
                // console.log('用户已经登录，但是购物车内无东西')
            }
        } else {
            // 如果未登录
            // 推荐商品
            this.sendProduct()
            // 直接获取8个商品
            // productsData获取所有全部商品的数据信息
            // var productsData = JSON.parse(localStorage.getItem('products')).products
            // // 获取全部所有的商品数据
            // this.allProducts = productsData
            // // products需要推荐的8个商品数据
            // this.products = productsData.slice(this.startIndex, this.endIndex)
            // // console.log('this.products ==> ',this.products)
            // // ==============
            // // 修改值，懒加载添加新的商品信息
            // // 修改值，固定每次+8
            // this.startIndex = this.endIndex;
            // this.endIndex += 8;
        }
    },
    // 页面渲染之后
    mounted() {
        // 声明一个定时器空数组
        var timers = [];
        // 绑定滚动事件
        // 懒加载
        window.onscroll = () => {
            // 拦截，商品的长度
            // 当前商品推荐的长度和所有商品长度信息一致就不用推荐了，拦截
            // this.products有可能获取不到,拦截
            // console.log(this.products.length)
            // 购物车有商品进来就不懒加载，会报错
            if (this.products.length == 0) {
                return
            }
            // productsData获取所有全部商品的数据信息
            // var productsData = JSON.parse(localStorage.getItem('products')).products
            // 获取全部所有的商品数据
            // this.allProducts = productsData
            // console.log(this.allProducts)
            if (this.products.length >= this.allProducts.length) {
                this.isNone = true
                return
            }
            // 获取页面的滚动距离
            // console.log(document.documentElement.scrollTop)
            var scrollTop = document.documentElement.scrollTop
            // 获取最后一个节点
            var lastRef = this.$refs['van' + (this.products.length - 1)][0].$el
            // console.log(this.$refs)
            // console.log(lastRef)
            // 获取最后一个节点的top值，距离顶部的值offsetTop
            // 再减去自身节点的高度
            var offsetTop = lastRef.offsetTop
            // console.log(offsetTop)
            // 页面滚动距离与最后一个元素距离页面顶部距离相比较
            // scrollTop 接近于 offsetTop就会懒加载新的商品信息
            // 获取最后一个节点的高度
            var height = lastRef.offsetHeight
            // console.log(height)
            var h = offsetTop - height - 200
            // console.log(h)
            // 条件判断，快接近底部的时候触发懒加载
            // 函数防抖，函数节流
            if (scrollTop >= h) {
                // console.log(123)
                // 定时器
                // 只执行一次，多余的清空定时器
                var timer = setTimeout(() => {
                    // console.log(123)
                    // ===============
                    // 添加推荐商品
                    this.products.push(...this.allProducts.slice(this.startIndex, this.endIndex))
                    this.startIndex = this.endIndex
                    this.endIndex += 8
                    // ===============
                    clearTimeout(timer)
                    timer = null
                    // ===============
                    timers = []
                }, 500)
                timers.push(timer)
                // 清空定时器
                // 只留下一个定时器
                for (var i = 1; i < timers.length; i++) {
                    clearTimeout(timers[i])
                }
            }
            // console.log(timers)
        }
        // ========================
        // 判断是否有用户登录
        var userLogin = localStorage.getItem('userLogin')
        userLogin = userLogin == undefined ? [] : JSON.parse(userLogin)
        // console.log(userLogin)


        if (userLogin) {
            // console.log('用户登录')
            // 用户登录
            // 判断购物车内是否有东西
            var shopcartProduct = JSON.parse(localStorage.getItem('shopcart'));
            // console.log(shopcartProduct)
            // !shopcartData.length === 0 || shopcartData
            if (shopcartProduct.length === 0) {
                // console.log('用户购物车没有东西')
            } else {
                // 购物车都有东西
                // 显示出下面的菜单标签
                // 获取底部按钮高度设置
                var h = document.getElementsByClassName('tabbar')[0].clientHeight
                // console.log(h)
                // 获取按钮元素
                var el = this.$refs.subbar
                // console.log(el)
                // 重新赋值底部元素的bottom设置位置
                el.style.bottom = h + 'PX';
                // ======================
            }
        } else {
            // 用户没有登录
        }
    },
    // 购物车离开守卫
    // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。
    //该导航可以通过 next(false) 来取消。
    // 离开当前组件守卫
    beforeRouteLeave(to, from, next) {
        // 离开购物车的话就不会触发懒加载事件
        window.onscroll = null
        // 注意:凡是before都需要next方法执行下一步
        next()
    }


}
</script>
<style lang="less" scoped>
header{
    height: 1rem;
}
.shopcart {
    margin-bottom: 2rem;

    .van-nav-bar {
        background-color: #f2f2f2;
    }

    .shopcart-header {
        height: 1.2rem;
    }

    .tologin {
        width: 100%;
        height: 1.5rem;

        span {
            font-size: .4rem;
            color: rgba(0, 0, 0, .87);
        }

        .van-cell__value {
            span {
                font-size: .35rem;
                color: rgba(0, 0, 0, .54);
            }
        }
    }

    .shopcart-center {
        width: 100%;
        height: 1.2rem;
        background-color: #ebebeb;
        text-align: center;
        line-height: 1.2rem;
        position: relative;

        // 购物车中间文字
        .center-title {
            color: #3c3c3c;
        }

        // 中间购物车的图标
        .center-icon {
            margin-right: .2rem;
            font-size: 1rem;
            position: absolute;
            top: .1rem;
            left: 1.5rem;
            color: rgba(0, 0, 0, .27);
        }

        // 去逛逛按钮
        .center-btn {
            border: 1PX solid rgba(0, 0, 0, .15);
            box-sizing: border-box;
            height: .5rem;
            margin-left: .1rem;
            line-height: .5rem;
            padding: 0 .24rem;
            color: rgba(0, 0, 0, .87);
            font-style: normal;
            background-color: #ebebeb;
        }
    }

    .shopcart-like {
        width: 100%;
        height: 2rem;
    }

    // 没有登录推荐商品
    .nofound {
        padding-top: .8rem;

        // 商品推荐
        .home-sale {
            width: 100%;
            margin-top: 3rem;

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
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;

                    .title {
                        // 文字溢出的解决方式
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-size: .4rem;
                        color: rgba(0, 0, 0, .87);
                    }

                    .produce {
                        overflow: hidden;
                        text-overflow: ellipsis;
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
    }

    .box {
        margin-top: .5rem;
        width: 100%;
        height: 1rem;
        background-color: red;
    }

    .underline {
        text-align: center;
        color: #aaa;
        font-size: 12PX;
        padding: 0.26666rem;
    }

    // 购物车编辑
    // 复选框编辑
    .card-row {
        position: relative;
        margin-top: .4rem;

        .card-col {
            // 没有高度和宽度的情况下居中
            // 垂直居中
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }

        .van-checkbox {
            // 复选框水平居中
            text-align: center;
        }

        // 价格距离标题
        .van-card__bottom {
            margin-top: .2666rem;
        }
    }

    // 设置全选按钮的位置
    .van-submit-bar__bar .van-checkbox {
        margin-left: .5666rem;
    }
}
</style>