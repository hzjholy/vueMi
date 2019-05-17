
import Vue from 'vue'
import { Dialog } from 'vant'

Vue.use(Dialog)


export default {
	// 对话框提示
	// title提示内容
	// isClear是否清空某个对象的属性值
	// obj清空属性值的对象
	// property清空的对象obj的属性
	dialogTip(title,isClear,obj,property){
		Dialog.alert({
			title,
		}).then(() => {
			if(typeof isClear === 'boolean' && isClear){
				// true清空
				obj[property] = '';
			}
		})
	}
}