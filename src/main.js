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


import vueNumeralFilterInstaller from 'vue-numeral-filter';
import numeral from 'numeral'
import moment from 'moment'

Vue.use(vueNumeralFilterInstaller, { locale: 'ru' });

Vue.config.productionTip = false
Vue.use(Toast)

Vue.filter('summa', value => numeral(String(value).replace('.', ',')).format('0,0'))
Vue.filter('date', value => moment(value).format('D MMMM YYYY'))
Vue.filter('year_month', value => moment(value).format('MMMM YYYY'))
Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
}).$mount('#app')
