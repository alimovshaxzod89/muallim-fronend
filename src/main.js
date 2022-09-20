import '@/@fake-db/db'
import { i18n } from '@/plugins/i18n'
import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import './plugins/acl'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { VueMaskDirective } from 'v-mask'


import vueNumeralFilterInstaller from 'vue-numeral-filter'
import numeral from 'numeral'
import moment from 'moment'

moment.locale('uz-latn')

Vue.use(vueNumeralFilterInstaller, { locale: 'ru' })

Vue.config.productionTip = false
Vue.use(Toast)

Vue.filter('summa', value => (value !== null && value !== '' ? numeral(String(value).replace('.', ',')).format('0,0') : '—'))
Vue.filter('date', value => moment(value).format('D MMMM YYYY'))
Vue.filter('year_month', value => moment(value).format('MMMM YYYY'))
Vue.directive('mask', VueMaskDirective)

Vue.mixin({
	data: function() {
		return {
			get BRANCH_ID() {
				return store.state.branch_id;
			},
			// get BRANCH_NAME() {
			// 	return store.state.branch_name;
			// }
		}
	}
})

// Vue.prototype.$branchId = store.state.place_id

new Vue({
	router,
	store,
	i18n,
	vuetify,
	created() {
		const branch = JSON.parse(localStorage.getItem('branch'))
		if (branch) {
			store.dispatch('app/setBranch', branch)
		}
	},
	render: h => h(App),
}).$mount('#app')
