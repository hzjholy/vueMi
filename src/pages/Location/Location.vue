<template>
    <div class="address">
        <header>
            <van-nav-bar title="收货地址" left-arrow @click-left="back" fixed class="nav">
            </van-nav-bar>
        </header>
        <div class="addressInfo">
            <!-- 地址信息 -->
            <van-address-list v-model="chosenAddressId" :list="addressList" @edit="editAddress" @add="addAddress" @click.native="toggleDefault" />
        </div>
        <div>
            <!-- 上拉菜单 -->
            <van-actionsheet v-model="showactionsheet">
                <van-address-edit :area-list="area" show-set-default show-search-result show-delete show-postal save-button-text="保存地址" delete-button-text="取消" @save="save" />
            </van-actionsheet>
        </div>
        <!-- 编辑地址需要用到 -->
        <div>
            <!-- 上拉菜单 -->
            <van-actionsheet v-model="editshow" cancel-text="取消" :actions="actions" @select="onSelect">
            </van-actionsheet>
        </div>
    </div>
</template>
<script>
//导入地址列表组件
import { AddressList, AddressEdit } from 'vant';
// 添加上拉菜单
import { Actionsheet } from 'vant';
// 导入地址，控制三省联动
import area from '../../data/area.js'
// 导入格式化时间
import date from '../../common/utils/tool.js'

export default {
    name: 'location',
    data() {
        return {
            chosenAddressId: 2, //关联下面地址的id，默认选择地址的id
            // 当前用户地址数据
            addressList: [],

            // {
            //        id: 1,
            //        name: 'hhh',
            //        tel: '15320000000',
            //        address: '浙江省杭州市拱墅区莫干山路 50 号'
            //    },
            //    {
            //        id: 2,
            //        name: 'hh555h',
            //        tel: '189520000000',
            //        address: '浙江省杭州市拱墅区莫干山路5000号'
            //    }
            // 显示上拉菜单，用于新增地址
            showactionsheet: false,
            // 全国地址信息
            area,
            // ============
            // 用户iduserID
            userId: '',
            // ============
            // 显示编辑
            editshow: false,
            // 编辑地址需要的信息
            actions: [{
                    name: '编辑地址'
                },
                {
                    name: '删除地址'
                }
            ],
            // 关联索引需要删除的地址
            index: -1,
            // 地址id
            id: -1,
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
                // 全部地址
                address: ''
            },
            // 是否是新增地址还是保存地址
            isSave: true
        }
    },
    components: {
        [AddressList.name]: AddressList,
        [Actionsheet.name]: Actionsheet,
        [AddressEdit.name]: AddressEdit,
    },
    created() {
        // 获取本地存储地址管理数据
        var addressData = localStorage.getItem('address')
        // 初始化
        addressData = addressData == undefined ? [] : JSON.parse(addressData)
        // 获取用户id
        var userId = JSON.parse(localStorage.getItem('userLogin')).userId
        // 筛选当前用户的地址
        addressData.forEach(v => {
            // 根据用户id遍历
            // 找到当前用户的地址数据
            if (this.userId == v.userId) {
                // 如果是默认地址
                if (v.isDefault) {
                    // 默认选择的地址
                    this.chosenAddressId = v.id
                }
                this.addressList.push(v)
            }
        })
    },
    methods: {
        back() {
            // 返回上一级
            this.$router.go(-1)
        },
        // 编辑地址信息
        editAddress(item, index) {
            // item就是地址每一项
            // console.log(item)
            // 显示编辑框
            this.editshow = true
            // 当点击哪一项的时候赋值index
            // this.index就是点击的那一项
            this.index = index
            // 获取编辑地址的id
            this.id = item.id
        },
        // 新建地址
        addAddress() {
            // 显示收货地址信息
            this.showactionsheet = true
        },
        // 保存地址
        save(data) {
            if (this.isSave) {
                // 获取本地存储地址管理数据
                var addressData = localStorage.getItem('address')
                // 初始化
                addressData = addressData == undefined ? [] : JSON.parse(addressData)
                // 获取用户id
                // var userId = JSON.parse(localStorage.getItem('userLogin')).userId
                // ============================================
                // 默认地址是有一个
                if (data.isDefault && addressData.length > 0) {
                    // 如果默认地址，需要把当前用户地址的默认值设置为false
                    // 默认地址只有一个
                    for (var i = 0; i < addressData.length; i++) {
                        if (this.userId == addressData[i].userId && addressData[i].isDefault) {
                            // 用户id相同并且存在默认值
                            addressData[i].isDefault = false
                            break
                        }
                    }
                }
                // ============================================
                // 生成添加地址的时间
                var time = new Date();
                // 生成地址id
                // 添加标记-后台专业名词，加盐,撒盐(加密)
                var addressId = 'address' + time.getTime()
                // 构造地址数据
                // 用户ID
                data.userId = this.userId
                // 地址ID
                data.id = addressId
                // 添加时间time
                data.addTime = date.format(time, 'yyyy-MM-dd hh:mm:ss')
                // 全称地址的拼接
                data.address = data.province + data.city + data.county + data.addressDetail;
                // 编辑时间time
                data.editTime = ''
                // 数据存储推入
                addressData.push(data)
                // 写入本地存储
                localStorage.setItem('address', JSON.stringify(addressData))
                // ===================================
                // 将当前地址添加到页面上
                // 并把默认按钮选择解决
                if (data.isDefault) {
                    // 当前地址为默认地址
                    for (var i = 0; i < this.addressList.length; i++) {
                        // 找到默认的
                        if (this.addressList[i].isDefault) {
                            this.addressList[i].isDefault = false
                            this.chosenAddressId = addressId
                            break;
                        }
                    }
                }
                this.addressList.push(data)

                // 编辑完成后关闭面板
                this.showactionsheet = false
                // ======================
                // 初始化数据
            } else {
                // 编辑保存的地址
                // 展示数据
                // 这里有个关键，初始化数据怎么获取
                // var addressData = JSON.parse(localStorage.getItem('address'))
                // this.addressInfo = addressData[this.index]
                // localStorage.setItem('address', JSON.stringify(addressData))
            }
        },
        // 删除或者编辑地址
        onSelect(item, index) {
            // item
            // index 判断是删除还是编辑
            // index 为 0 编辑地址
            // index 为 1 删除地址

            // ============
            if (index === 0) {
                // 编辑地址
                // this.showactionsheet = true
                // // 不是保存地址
                // this.isSave = false
                // var addressData = JSON.parse(localStorage.getItem('address'))
                // // console.log(addressData)
                // // 得到当前点击的index
                // // console.log(this.index)
                // // 获取当前点击的信息数据
                // // console.log(this.addressList[this.index])
                // // console.log(addressData[this.index])
                // this.addressInfo.tel = addressData[this.index].tel
                // this.addressInfo.id = addressData[this.index].id
                // this.addressInfo.name = addressData[this.index].name
                // this.addressInfo.province = addressData[this.index].province
                // this.addressInfo.city = addressData[this.index].city
                // this.addressInfo.county = addressData[this.index].county
                // this.addressInfo.addressDetail = addressData[this.index].addressDetail
                // this.addressInfo.address = addressData[this.index].address
                // // 获取当前信息的对象
                // console.log(this.addressInfo)


            } else if (index === 1) {
                // 删除地址
                // 逻辑删除
                // index最为关键
                this.addressList.splice(this.index, 1)
                // 物理删除
                // 获取本地存储地址管理数据
                var addressData = JSON.parse(localStorage.getItem('address'))
                // 根据地址id删除
                for (var i = 0; i < addressData.length; i++) {
                    if (addressData[i].id == this.id) {
                        addressData.splice(i, 1)
                        break;
                    }
                }
                // 本地存储写入
                localStorage.setItem('address', JSON.stringify(addressData))

            }
            // 关闭编辑面板
            this.editshow = false
        },
        // 修改默认地址
        toggleDefault() {
            // console.log(this.chosenAddressId)
            // 根据id修改
            // 获取本地存储地址管理数据
            var addressData = JSON.parse(localStorage.getItem('address'))
            // 全部为false
            for (var i = 0; i < addressData.length; i++) {
                if (this.userId == addressData[i].userId && addressData[i].isDefault) {
                    addressData[i].isDefault = false
                    break;
                }
            }
            // 选中为真
            for (var j = 0; j < addressData.length; j++) {
                if (this.chosenAddressId == addressData[j].id) {
                    addressData[j].isDefault = true
                    break;
                }
            }
            // 设置回去
            localStorage.setItem('address', JSON.stringify(addressData))


        }
    },



}
</script>
<style lang="less" scoped>
.address {
    .nav {
        color: #666;
        background-color: #f2f2f2;
        font-size: 16px;

        .van-icon {
            color: #666;
            font-size: 24px;
        }
    }

    .addressInfo {
        margin-top: 1rem;
    }
}

// 新建地址按钮在遮罩下面
.van-button {
    z-index: 1000;
}

.van-address-list {
    padding: 0;
}
</style>