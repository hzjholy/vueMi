<template>
	<div>
		<h1>使用导航组件，测试props</h1>
		<!-- 组件之间传值 -->
		<!-- 父组件使用子组件方法 -->
		<top-nav :title="title" @edit="editnow"></top-nav>
		<h1 v-if="isEdit">父组件</h1>
	</div>
	
</template>

<script>
	//导入组件
	import Topnav from './Nav'
	export default {
		name: 'Usenav',
		components: {
			// 组件注册
			'top-nav': Topnav, 
		},
		data(){
			return{
				// 必须传入
				title: '商品详情',
				// 显示隐藏
				isEdit: false

			}
		},
		methods:{
			editnow(){
				if(!this.isEdit){
					this.isEdit = true
				}else{
					this.isEdit = false

				}
			}
		}
	}
</script>

<style lang="less"></style>
