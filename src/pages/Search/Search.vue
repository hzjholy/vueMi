<template>
    <div class="search">
        <header>
            <!-- 搜索 -->
            <van-search class="search" v-model="keyWord" ref="search" placeholder="请输入搜索关键词" background="#E2E1E4" show-action @focus="focusFn" @search="onSearch">
                <div slot="action" @click="search">搜索</div>
                <!-- <div slot="action" @click="search" class="fl back">123456</div> -->
            </van-search>
        </header>
        <div class="tags" v-show="isFocus">
            <p>搜索历史</p>
            <ul class="tag-row clearfix">
                <li class="tag-col fl" v-for="(item, index) in searchHistory[userId]" :key="index" @click="searchForTag(item)">{{item}}</li>
            </ul>
        </div>
        <div class="product-data">
            <van-row>
                <van-col :ref="'van' + index" @click.native="goState({name: 'Detail', params: {pid: item.id}, query: {active: 1}})" span="12" class="col-box" v-for="(item, index) in searchProducts" :key="index">
                    <div><img class="auto-img" :src="item.images.small" /></div>
                    <div class="product-info">
                        <p class="title">{{item.name}}</p>
                        <p class="price">{{item.price}}元</p>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>
<script>
import { Search } from 'vant';
export default {
    name: 'search',
    data() {
        return {
            keyWord: '小米8',
            //搜索商品数据
            searchProducts: [],

            //当前用户的搜索历史记录
            searchHistory: {},

            userId: '',

            //获取焦点
            isFocus: true

        }
    },
    components: {
        [Search.name]: Search
    },
    created() {

        //获取用户id
        this.userId = JSON.parse(localStorage.getItem('userLogin')).userId;

        //获取当前用户的本地存储搜索历史记录
        var searchHistoryData = localStorage.getItem('searchHistory');

        this.searchHistory = searchHistoryData == undefined ? {} : JSON.parse(searchHistoryData);

    },
    mounted() {
        var search = this.$refs.search.querySelector('input');

        search.focus();
    },
    methods: {

        goState(path) {
            this.$router.push(path);
        },

        search() {
            // 取消焦点
            this.isFocus = false;

            //判断搜索的值是否存在
            if (this.keyWord == '' || this.keyWord == undefined) {
                this.$toast('搜索关键不能为空');
                return;
            }
            // 清空搜索的数据
            this.searchProducts = [];
            // 设置匹配
            var match = new RegExp('(' + this.keyWord + ')', 'img');
            // new RegExp('(水)?(井)?')   (水井) | ((水)?(井)?)
            // 搜索匹配

            // 获取所有的商品数据
            var productDatas = JSON.parse(localStorage.getItem('products')).products;
            // 遍历获取匹配的商品
            productDatas.forEach(v => {
                if (match.test(v.name)) {
                    this.searchProducts.push(v);
                }
            })

            // 根据搜索历史判断，不能重复增加
            if (!this.searchHistory[this.userId]) {

                this.searchHistory[this.userId] = [];

            } else if (this.searchHistory[this.userId].length >= 10) {

                this.searchHistory[this.userId].shift();

            }


            if (this.searchHistory[this.userId].indexOf(this.keyWord) === -1) {
                this.searchHistory[this.userId].push(this.keyWord);
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }




        },

        focusFn() {
            this.isFocus = true;
        },

        searchForTag(keyWord) {
            this.keyWord = keyWord;
            this.search();
        },
        onSearch() {
            this.search()
        }
    }
}
</script>
<style lang="less" scoped>
.search{
	position: relative;
}
.back {
    position: absolute;
    top: 20%;
    left: 0;
}

.van-search__content {
    background-color: #fff;
}

.van-search__action {
    color: #fff;
}

.tag-row {
    text-align: center;
}

.tags {
    margin-top: 0.8rem;
    padding: 0.4rem;

    p {
        font-size: 17PX;
    }

    .tag-col {
        margin-right: 0.4rem;
        background-color: #f2f2f2;
        max-width: 260px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 0.2rem;
        padding: 0.1rem;
    }
}


.col-box {
    padding: 0.2133rem;

    .product-info {
        text-align: center;

        .title {
            color: #888;
            margin-top: 0.2666rem;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .price {
            color: #e4393c;
            margin-top: 0.2666rem;
        }
    }
}
</style>