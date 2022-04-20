<template>
<v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keydown.enter="onSubmit()"
    max-width="1800"
    width="80%"
  >
    <v-card>
			<v-card-title>
				<span class="headline">To'langan pullar</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<div id="data-list">
								<v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">
									<div class="d-flex pb-5" style="width: 100%">

										<v-autocomplete
											v-model="filter.group_id"
											:items="groups"
											item-text="number"
											item-value="id"
											dense
                      solo
											outlined
											hide-details
											label="Guruh"
											class="data-list-search me-3"
											clearable
										></v-autocomplete>

										<v-autocomplete
											v-model="filter.student_id"
											:items="students"
											item-text="full_name"
											item-value="id"
											dense
                      solo
											outlined
											hide-details
											label="Talaba"
											class="data-list-search me-3"
											clearable
										></v-autocomplete>

										<v-autocomplete
											v-model="filter.year"
											:items="yearOptions"
											item-text="text"
											item-value="value"
											dense
                      solo
											outlined
											hide-details
											label="Yil"
											class="data-list-search me-3"
											clearable
										></v-autocomplete>

										<v-autocomplete
											v-model="filter.month"
											:items="monthOptions"
											item-text="text"
											item-value="value"
											dense
                      solo
											outlined
											hide-details
											label="Oy"
											class="data-list-search me-3"
											clearable
										></v-autocomplete>

										<v-text-field
											v-model="filter.day"
											dense
											outlined
											hide-details
											label="Kun"
											class="data-list-search me-3"
										></v-text-field>
									</div>

									<v-spacer></v-spacer>

									<v-btn class="primary" @click="openPaidsForm()">Qo'shish</v-btn>
									<div v-if="state.rows.length > 0" class="ml-5">
										<v-btn v-if="$can('create', 'Room')" class="success exportXlsx" color="white" outlined @click="ExportExcel()">Jadvalni yuklab olish</v-btn>
									</div>
								</v-card-text>

								<!-- table -->
								<v-data-table
									ref="excel"
									v-model="selectedTableData"
									:headers="tableColumns"
									:items="state.rows"
									:options.sync="options"
									:server-items-length="state.total"
									:loading="loading"
									:items-per-page="options.itemsPerPage"
									:footer-props="footerProps"
									class="text-no-wrap"
								>
									<template slot="item.index" scope="props">
										{{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
									</template>

									<template #[`item.week_day`]="{ item }">
										{{ item.week_day ? getDay(item.week_day) : '-' }}
									</template>

									<template #[`item.actions`]="{ item }">
										<div class="d-flex align-center">
											<!-- delete -->
											<v-tooltip bottom>
												<template #activator="{ on, attrs }">
													<v-btn icon small v-bind="attrs" v-on="on" @click="confirmDelete(item.id)">
														<v-icon size="18">
															{{ icons.mdiDeleteOutline }}
														</v-icon>
													</v-btn>
												</template>
												<span>O'chirish</span>
											</v-tooltip>

											<!-- edit  -->
											<v-tooltip bottom>
												<template #activator="{ on, attrs }">
													<v-btn icon small v-bind="attrs" v-on="on" @click="openPaidsForm(item)">
														<v-icon size="18">
															{{ icons.mdiPencilOutline }}
														</v-icon>
													</v-btn>
												</template>
												<span>Tahrirlash</span>
											</v-tooltip>

											<!-- print  -->
											<v-tooltip bottom>
												<template #activator="{ on, attrs }">
													<v-btn icon small v-bind="attrs" v-on="on" @click="printCheck(item)">
														<v-icon size="18">
															{{ icons.mdiPrinter   }}
														</v-icon>
													</v-btn>
												</template>
												<span>Chop etish</span>
											</v-tooltip>
										</div>
									</template>

                  <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>
								</v-data-table>
							</div>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="gray" outlined @click="close()">OK</v-btn>
			</v-card-actions>
    </v-card>

				<dialog-confirm ref="dialogConfirm" />

				<payment-paids-form
					ref="PaymentPaidsForm"
					:MODULE_NAME="MODULE_NAME"
					v-on:refresh-list="$emit('refresh-list'), fetchDatas(true)"
					v-on:delete-row="$emit('delete-row'), fetchDatas(true)"
					v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
				/>
  </v-dialog>
</template>

<script>
import {
  mdiTrendingUp,
  mdiPlus,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiPencilOutline,
  mdiCalendar,
  mdiImageEditOutline,
  mdiFilterOutline,
  mdiPrinter,
} from '@mdi/js'

import { onUnmounted, ref, onMounted } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import { useRouter } from '@core/utils'

import envParams from '@envParams'
import XLSX from 'xlsx'
import moment from 'moment'
import numeral from 'numeral'

require('moment/locale/uz-latn')

// store module
import PaymentPaidsStoreModule from './PaymentPaidsStoreModule'

// composition function
import usePaymentPaidsList from './usePaymentPaidsList'
import PaymentPaidsForm from './PaymentPaidsForm.vue'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

export default {
  components: {
    PaymentPaidsForm,
    DialogConfirm,
  },
  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    summa: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup(props, { emit }) {
    const MODULE_NAME = 'payment-paids'
    const BASE_URL = envParams.BASE_URL
    const BACKEND_URL = envParams.BACKEND_URL

    const { router } = useRouter()

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, PaymentPaidsStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    // Modal
    const show = ref(false)
    const group_id = ref(null)
    const open = (item = null) => {
      show.value = true
      filter.value.group_id = item.group_id
      filter.value.student_id = item.student_id
      filter.value.year = item.year
      filter.value.month = item.month

      fetchDatas(true)
    }
    const close = () => {
      show.value = false
    }

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      searchQuery,
      filter,
      tableColumns,
      fetchDatas,

      options,
      loading,
      notify,
      selectedTableData,
    } = usePaymentPaidsList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    // Datepicker
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    // Form
    const PaymentPaidsForm = ref(null)
    const openPaidsForm = item => {
      const data = {
        // subject_id: filter.value.subject_id ? filter.value.subject_id.id : null,
        student_id: filter.value.student_id ? filter.value.student_id : null,
        group_id: filter.value.group_id ? filter.value.group_id : null,
        payment_id: filter.value.payment_id ? filter.value.payment_id : null,
      }

      PaymentPaidsForm.value.open(item, data)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    //delete
    const deleteRow = id => {
      store
        .dispatch(`${MODULE_NAME}/removeRow`, id)
        .then(message => {
          notify.value = { type: 'success', text: message, time: Date.now() }

          fetchDatas(true)
          emit('delete-row')
        })
        .catch(error => {
          console.log(error)
          notify.value = { type: 'error', text: error.message, time: Date.now() }
        })
    }

    // Week logic
    const days = ref([
      { key: 1, name: 'Dushanba' },
      { key: 2, name: 'Seshanba' },
      { key: 3, name: 'Chorshanba' },
      { key: 4, name: 'Payshanba' },
      { key: 5, name: 'Juma' },
      { key: 6, name: 'Shanba' },
      { key: 7, name: 'Yakshanba' },
    ])
    const getDay = day => {
      const result = days.value.filter(item => {
        if (item.key === day) {
          return item.name
        }
      })
      return result[0].name
    }

    const yearOptions = ref([
      { value: '2020', text: '2020' },
      { value: '2021', text: '2021' },
      { value: '2022', text: '2022' },
    ])

    const monthOptions = (function () {
      const arr = [{ value: '', text: '' }]
      for (let i = 1; i <= 12; i++) {
        arr.push({ value: i, text: moment(`2000-${i}-01`).format('MMMM') })
      }
      return arr
    })()

    // eport xlsx
    const excel = ref(null)
    const ExportExcel = (type, fn, dl) => {
      let elt = excel.value.$el.children[0]
      let wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' })
      return dl
        ? XLSX.write(wb, {
            bookType: type,
            bookSST: true,
            type: 'base64',
          })
        : XLSX.writeFile(wb, fn || 'Jadval.' + 'xlsx')
    }

    const printCheck = data => {
      var myWindow = window.open(
        BACKEND_URL + '/print/' + data.id,
        'MsgWindow',
        'toolbar=no,status=no,menubar=no,width=600,height=600',
      )
      //myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
    }

    // Loads
    const subjects = ref(null)
    const loadSubjects = () => {
      axios.get('/api/subjects').then(response => {
        if (response.data.success) {
          subjects.value = response.data.data
        }
      })
    }

    const groups = ref(null)
    const loadGroups = () => {
      axios.get('/api/groups').then(response => {
        if (response.data.success) {
          groups.value = response.data.data
        }
      })
    }

    const students = ref(null)
    const loadStudents = () => {
      const params = {}
      if (filter.value.group_id) params.group_id = filter.value.group_id

      axios.get('/api/students', { params }).then(response => {
        if (response.data.success) {
          students.value = response.data.data
        }
      })
    }

    // ! Created
    onMounted(() => {
      loadSubjects()
      loadGroups()
      loadStudents()
    })

    // Return
    return {
      show,
      open,
      close,
      BASE_URL,
      state,
      fetchDatas,

      // Loads
      subjects,
      groups,
      students,

      monthOptions,
      yearOptions,
      excel,
      ExportExcel,

      printCheck,

      picker,
      isDate,
      tableColumns,
      filter,
      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      PaymentPaidsForm,
      openPaidsForm,
      group_id,
      deleteRow,

      MODULE_NAME,

      // Wekk logic
      getDay,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiCalendar,
        mdiEyeOutline,
        mdiImageEditOutline,
        mdiFilterOutline,
        mdiPrinter,
      },
    }
  },
  watch: {
    ['notify']() {
      this.$toast[this.notify.type](this.notify.text)
    },
  },
}
</script>

<style lang="scss" scoped>
#data-list {
  .data-list-actions {
    max-width: 7.81rem;
  }

  .data-list-search {
    max-width: 10.625rem;
  }
}
.img-user {
  width: 50px;
  height: 50px;
  overflow: hidden;
  object-fit: cover;
}

.my-filter {
  .v-input {
    margin-right: 12px;
    margin-bottom: 12px;
  }
}
</style>
