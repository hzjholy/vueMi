// ajax请求函数模块
export default function ajax(url, data = {}, type = 'get') {
    // 参数一：请求地址
    // 参数二：请求参数对象
    // 参数三：请求方式
    // 声明promise对象
    let promise
    // get请求的参数拼接
    // 数据拼接字符串
    let dataStr = ''
    if (type === 'GET') {
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&'
        })
        if (dataStr != '') {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
            url = url + '?' + dataStr
        }
        // 发送get请求
        promise = axios.get(url)
    }else{
    	// 发送post请求
    	promise = axios.post(url,data)
    }

    return promise

}