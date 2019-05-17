// 引入加载的组件
import LoadingComponents from './Loading.vue'

const Loading = {
	install:(Vue) =>{
		Vue.component('Loading',LoadingComponents)
	}
}

export default Loading