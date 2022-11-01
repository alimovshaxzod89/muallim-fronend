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
import StudentStoreModule from '@/views/lists/student/StudentStoreModule'

moment.locale('uz-latn')

Vue.use(vueNumeralFilterInstaller, { locale: 'ru' })

Vue.config.productionTip = false
Vue.use(Toast)

Vue.filter('summa', value => (value !== null && value !== '' ? numeral(String(value).replace('.', ',')).format('0,0') : '—'))
Vue.filter('date', value => moment(value).format('D MMMM YYYY'))
Vue.filter('date_month', value => moment(value).format('D MMMM'))
Vue.filter('year_month', value => moment(value).format('MMMM YYYY'))
Vue.filter('year', value => moment(value).format('YYYY'))
Vue.filter('month', value => moment(value).format('MMMM'))
Vue.directive('mask', VueMaskDirective)

Vue.mixin({
	data: function() {
		return {
			get USER_ROLE() {
				return store.state.user_role
			},

			get BRANCH_ID() {
				return store.state.branch_id
			},
			// get BRANCH_NAME() {
			// 	return store.state.branch_name;
			// }
		}
	},
})

// Vue.prototype.$branchId = store.state.place_id

new Vue({
	router,
	store,
	i18n,
	vuetify,
	created() {
		const branch = JSON.parse(localStorage.getItem('branch'))
		if (branch)
			store.dispatch('app/setBranch', branch)

		const userData = JSON.parse(localStorage.getItem('userData'))
		if (userData)
			store.dispatch('app/setUserRole', userData.role)
		else
			store.dispatch('app/setUserRole', null)

		if (store.state.branch_id) {
			if (!store.hasModule('student')) {
				store.registerModule('student', StudentStoreModule)
			}

			store.dispatch(`student/fetchList`, store.state.branch_id)
		}

	},
	render: h => h(App),
}).$mount('#app')
