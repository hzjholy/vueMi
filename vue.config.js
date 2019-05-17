// 请求的api地址

let url = `https://v2.api.haodanku.com/itemlist/apikey/hzjholy/nav/3/cid/0/back/10/min_id/1`


// 引入superagent
// superagent在node服务器里面负责网络请求
const request = require('superagent')

// post解析数据
// 添加解析中间件
var bodyParser = require('body-parser')

// vue.config.js
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    // 当前的网址
                    target: "https://v2.api.haodanku.com",
                    // 请求的网址
                    // 如果没有下面pathRewriter，只有上面的target
                    // 会请求成
                    // https://v2.api.haodanku.com/api
                    // 和上面的/api拼接起来
                    // ========================
                    // 不要api，就需要pathRwrite路径重写
                    // api替换成空
                    pathRewrite: { "^/api": "" },
                    // 确定修改地址，避免没有出现效果
                    changeOrigin: true

                }
            }
        }
    },
    baseUrl: './'
}
