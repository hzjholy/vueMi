# demo01

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

###
```
order{
	表单数据信息
	thumbnail 商品缩略图
}

address地址表信息
{
	id: 地址id(时间戳) 删除可以用此操作
	userId: 用户id
	recieve: 收货人
	tel: 收货电话
	province: 省份
	city: 市
	county: 区县
	addressDetail: 详细地址
	isDefault: 默认地址
	areaCode: 地区编号
	country: 国家
	postalCode: 邮编
	addTime: 添加地址时间
	editTime: 编辑地址时间
	address: 全称地址
}
```