<template>
    <div class="bag">
        <div>
            <div v-if="bagdata[0]!== undefined">
                <van-row class="home-sale">
                    <van-col span="12" class="col-box" v-for="(item,index) in bagdata" @click.native="goState({name:'Detail',params: {pid: item.id}})">
                        <div class="home-sale-img">
                            <img :src="item.itempic" class="auto-img">
                        </div>
                        <div class="home-sale-product-info">
                            <p class="title"> {{item.itemshorttitle}}</p>
                            <p class="produce text">{{item.guide_article}}</p>
                            <div class="price">
                                <span class="iconfont rmb iconrenminbi1688"></span>
                                <span class="price-num">{{item.itemendprice}}</span>
                                <span>起</span>
                                <div class="price-old">
                                    <span class="iconfont rmb-old iconrenminbi1688"></span>
                                    <s> {{item.itemprice}}</s>
                                </div>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div v-if="bagdata[0]== undefined">
                <Loading/>
            </div>
        </div>
    </div>
</template>
<script>
//读取数据
import { mapState } from 'vuex'
export default {
    name: 'bag',
    mounted() {
        // 获取api数据
        // 获取家电数据
        this.$store.dispatch('getBagdata')
    },
    computed: {
        ...mapState(['bagdata']),
    }

}
</script>
<style lang="less" scoped>
// 商品售卖
.home-sale {
    width: 100%;
    height: 100%;
    .van-row {
        margin-top: .2rem;
    }

    .home-sale-img {
        position: relative;
        width: 5rem;
        height: 5rem;

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
        height: 8rem;

        .home-sale-product-info {
            text-align: left;
            padding: .3rem .6rem;
            line-height: .5rem;

            .title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: .4rem;
                color: rgba(0, 0, 0, .87);
            }

            .produce {
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
</style>