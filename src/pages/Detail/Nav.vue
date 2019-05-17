<template>
    <div class="nav">
		<div class="back-text text" @click="back">
			<van-icon name="arrow-left" />
		</div>
		<div class="p-detail">{{title}}</div>
		<div class="edit text"  @click="bianji">
			<van-icon name="edit"/>
		</div>
	</div>
</template>
<script>
export default {
    name: 'Nav',
    // 组件之间的属性传递
    props: {
    	title: {
    		type: String
    	},
    	icon: {
    		
    	}

    },
    methods:{
    	back(){
    		this.$router.go(-1)
    	},
    	bianji(){
    		this.$emit('edit')
    	}
    }
}
</script>
<style lang="less" scoped>
.nav{
		height: 1.3333rem;
		background-image: linear-gradient(to right, #62AAF5 0%, #1989FA 100%);
		position: relative;
		.text{
			font-size: 20PX;
			color: #fff;
			margin-top: calc(~"1.3333rem / 2 - 9px");
			position: relative;
			z-index: 2;
		}

		.back-text{
			float: left;
			margin-left: 0.5333rem;
		}

		.p-detail{
			color: #fff;
			text-align: center;
			font-size: 16PX;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			margin: auto;
			z-index: 1;
			line-height: 1.3333rem;
		}

		.edit{
			float: right;
			margin-right: 0.5333rem;
		}
	}
</style>