<template>
    <div class="Apitest" v-if="data[0]!== undefined">
        <h1>apitest</h1>
        <!-- 商品图片 -->
        <p>
            <h4>商品的id:</h4>
            <span >
                {{data[0].itemid}}
            </span>
        </p>
        <p>
            <h4>商品的标题:</h4>
            <span>
                {{data[0].itemtitle}}
            </span>
        </p>
        <p>
            <h4>商品的图片</h4>
            <div class="imgbox">
                <img :src="data[0].itempic" class="auto-img":alt="data[0].itemtitle">
            </div>
            <h4>商品的详情图</h4>
            <div class="imgbox">
                <img :src="'http://img.haodanku.com/'+`${data[0].itempic_copy}`" class="auto-img" :alt="data[0].itemtitle">
            </div>
        </p>
        <p>
            <h4>商品的描述:</h4>
            <span>
                {{data[0].guide_article}}
            </span>
        </p>
        <p>
            <h4>商品的价格:</h4>
            <span>
                {{data[0].itemprice}}
            </span>
        </p>
        <p>
            <h4>商品的卷后价格:</h4>
            <span>
                {{data[0].itemendprice}}
            </span>
        </p>
        <p>
            <h4>商品优惠金额:</h4>
            <span>
                {{data[0].couponmoney}}
            </span>
        </p>
        <p>
            <h4>商品的折扣力度:</h4>
            <span>
                {{data[0].discount}}
            </span>
        </p>
        <p>
            <h4>商品的月销售量:</h4>
            <span>
                {{data[0].itemsale}}
            </span>
        </p>
        <p>
            <h4>店铺名:</h4>
            <span>
                {{data[0].shopname}}
            </span>
        </p>
    </div>
</template>
<script>
export default {
    name: 'apitest',
    components: {

    },
    data() {
        return {
            productData: [],
            allCommodities: [],
            // 商品的标题
            itemtitle: '',
            // 商品的描述
            guide_article: '',
            // 商品的价格
            itemprice: 0,
            // 商品的月销售量
            itemsale: 0,
            // 店铺名
            shopname: ''
        }
    },
    mounted() {
        this.$nextTick(function() {
            // Code that will run only after the
            // entire view has been rendered
            this.$store.dispatch('getdata')
        })
        // console.log(this.allCommodities)
        // this.$store.dispatch('getMineBaseApi')
        console.log('123')
        // 商品全部数据

        // 商品的数码商品数据
        this.$store.dispatch('getDigitaldata')
        // =======================
        // 获取mock数据
        this.$store.dispatch('getmockdata')

    },
    computed: {
        data() {
            return this.$store.state.data
        }
    }
}
</script>
<style lang="less" scoped>
.Apitest {
    font-size: 24px;
}

.imgbox {
    width: 100px;
    height: 100px;
}
</style>