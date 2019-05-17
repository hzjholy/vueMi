<template>
	<div>
		<h1>test</h1>
		<button @click="addProducts">添加商品数据</button>
		<button @click="addTypes">添加商品类型</button>
	</div>
</template>

<script>
	//导入商品的数据库
	import products from '../../data/data.js'
	// 导入商品的类型
	import types from '../../data/types.js'
	export default {
		name: 'Test',
		methods:{
			addProducts(){
				// 添加在本地存储浏览器中
				localStorage.setItem('products', JSON.stringify(products))
				// console.log('products ==> ',products)
			},
			addTypes(){
				localStorage.setItem('types', JSON.stringify(types));
				console.log('types ==> ',types)
			}
		}
	}
</script>

<style lang="less" scoped>
	
</style>