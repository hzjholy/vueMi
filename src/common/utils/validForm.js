// 表单验证正则
// 导出文件
export default {
	// 验证手机号码
	validPhone(value){


		// return /^(\+86)?0?1[3456789]\d{9}$/
		return /^1[3456789]\d{9}$/.test(value)

	},
	// 验证密码[!@.,\w]
	validPwd(value,min,max){
		// 动态正则中一个'\'要写成'\\'
		return new RegExp('^[!@\\.\\w]{'+min +','+ max +'}$').test(value)
	},

	//验证两值严格相等(===) Object.is(a,b)
	validEqual(value1,value2){
		return Object.is(value1,value2)
	},

	// 随机生成验证码
	generateValidCode(){
		// 获取时间戳
		// var time = new Date().getTime().toString().slice(-3)
		// 0-1 就截取第一个
		// -1 - 
		var time = new Date().getTime().toString().substr(-3, 3);
		// 截取后面三位

		// 获取随机数
		var random = Math.random().toString().substr(-3, 3);

		// 数组合并
		return time.concat(random);
		
		
	}

	
}