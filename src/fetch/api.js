//引入axios 
import axios from 'axios'
let name = 3
let url = `/api/itemlist/apikey/hzjholy/nav/${name}/cid/0/back/100/min_id/1`
// 定义获取axios处理和axios封装
export function fetch(url,params){
	return new Promise((resolve,reject) => {
		axios.get(url,params)
			.then(response => {
				alert('api -- ok')
				resolve(response.data)
			})
			.catch((error) => {
				console.log(error)
				reject(error)
			})
	})
}

export default {
	// 获取页面的后台数据
	mineBaseMsgApi(){
		alert('进入api.js')
		return fetch(url)
	}
}