<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">
      <div class="d-flex pb-5" style="width: 100%">
				<v-text-field
          v-model="filter.query"
          dense
          outlined
          hide-details
          label="Qidiruv"
          class="data-list-search me-3"
        ></v-text-field>

				<v-expansion-panels class="my-accordion" accordion>
					<v-expansion-panel>
						<v-expansion-panel-header disable-icon-rotate>
							Ko'proq
							<template #actions>
							<v-icon color="secondary">
								{{ icons.mdiFilterOutline  }}
							</v-icon>
						</template>
						</v-expansion-panel-header>
						<v-expansion-panel-content>
							<v-text-field
								v-model="filter.full_name"
								dense
								outlined
								hide-details
								label="Fish"
								class="data-list-search me-3"
							></v-text-field>

							<v-text-field
								v-model="filter.phone"
								dense
								outlined
								hide-details
								label="Telefon"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="filter.region_id"
								:items="regions"
								item-text="name"
								item-value="id"
								dense
								outlined
								hide-details
								label="Tuman"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>

							<v-text-field
								v-model="filter.address"
								dense
								outlined
								hide-details
								label="Manzil"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="filter.permanent_region_id"
								:items="regions"
								item-text="name"
								item-value="id"
								dense
								outlined
								hide-details
								label="D.Y. Tuman"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>

							<v-text-field
								v-model="filter.permanent_address"
								dense
								outlined
								hide-details
								label="D.Y. Manzil"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="filter.gender"
								:items="[{value: 1, name: 'Erkak'}, {value: 2, name: 'Ayol'}]"
								item-text="name"
								item-value="value"
								dense
								outlined
								hide-details
								label="Jinsi"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>

							<v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										class="my-date-picker"
										v-model="filter.birth_date"
										label="Tug'ilgan sana"
										readonly
										v-bind="attrs"
										hide-details
										v-on="on"
										style="height: 40px !important; width: 170px !important"
										outlined
										clearable
										:append-icon="icons.mdiCalendar"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="filter.birth_date"
									color="primary"
									@input="isDate = false"
									no-title
									:first-day-of-week="1"
									locale="ru-ru"
								></v-date-picker>
							</v-menu>

							<v-autocomplete
								v-model="filter.sale"
								:items="[{value: 1, name: 'Ha'}, {value: 0, name: 'Yo\'q'}]"
								item-text="name"
								item-value="value"
								dense
								outlined
								hide-details
								label="Chegirma"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>

							<v-text-field
								v-model="filter.sale_cause"
								dense
								outlined
								hide-details
								label="Chegirma sababi"
								class="data-list-search me-3"
							></v-text-field>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
      </div>

			<v-spacer></v-spacer>
			<div v-if="state.rows.length > 0">
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

			<template #[`item.amount`]="{ item }">
				<v-text-field
					style="width: 150px"
					:value="item.amount"
					hide-details
					:append-icon="icons.mdiPencilOutline"
					@keydown.enter="updateAmount(item, $event, true)"
					@blur="updateAmount(item, $event)"
				></v-text-field>
      </template>

			<template #[`item.paid`]="{ item }">
				<v-btn outlined color="success" title="To'lov amalga oshirish uchun bosing" @click="openPaymentPaidsList(item)">{{item.paid | summa}}</v-btn>
      </template>

			<template #[`item.dept`]="{ item }">
				{{item.amount - item.paid | summa}}
      </template>

      <template #[`item.month`]="{ item }">
				{{getMonth(item.month)}}
				<br>
				{{item.year}}
      </template>

			<template v-slot:footer>
				<table class="my-table-footer">
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td rowspan="5" class="text-end">Jami:</td>
							<td rowspan="1" class="text-end">{{totalAmount()}}</td>
							<td rowspan="1" class="text-end">{{totalPaid()}}</td>
							<td rowspan="1" class="text-end">{{totalDebt()}}</td>
							<td></td>
						</tr>
					</tbody>
				</table>
      </template>

    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <payment-form
      ref="paymentForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />

		<payment-paids-list
      ref="paymentPaidsList"
			v-on:refresh-list="fetchDatas(true)"
			v-on:delete-row="fetchDatas(true)"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
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
} from '@mdi/js'

import { onMounted, ref } from '@vue/composition-api'

import store from '@/store'
import axios from '@axios'

import envParams from '@envParams'

// store module
import PaymentStoreModule from './PaymentStoreModule'

import XLSX from 'xlsx'

// composition function
import usePaymentList from './usePaymentList'
import PaymentForm from './PaymentForm.vue'
import PaymentPaidsList from '@/views/lists/payment-paids/PaymentPaidsList.vue'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

const MODULE_NAME = 'payment'

export default {
  components: {
    PaymentForm,
    PaymentPaidsList,
    DialogConfirm,
  },
  filters: {
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, PaymentStoreModule)
    }
    const BACKEND_URL = envParams.BACKEND_URL

    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      filter,
      tableColumns,
      deleteRow,
      fetchDatas,

      options,
      loading,
      notify,
      selectedTableData,
    } = usePaymentList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [5, 10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    // Datepicker
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //Form
    const studentForm = ref(null)
    const openForm = id => {
      studentForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    const updateAmount = ({ id, date, group_id, student_id, amount }, event, entered = false) => {
      if (amount === parseInt(event.target.value)) return

      axios
        .put(`/api/payments/${id}`, {
          amount: event.target.value,
          date,
          group_id,
          student_id,
        })
        .then(response => {
          if (response.status === 200) {
            if (!entered) {
              notify.value = { type: 'success', text: 'Qiymat saqlandi' }
            } else {
              event.target.blur()
            }
          }
        })
    }

    const monthOptions = ref([
      {
        value: '1',
        text: 'Yanvar',
        id: 1,
      },
      {
        value: '2',
        text: 'Fevral',
        id: 2,
      },
      {
        value: '3',
        text: 'Mart',
        id: 3,
      },
      {
        value: '4',
        text: 'Aprel',
        id: 4,
      },
      {
        value: '5',
        text: 'May',
        id: 5,
      },
      {
        value: '6',
        text: 'Iyun',
        id: 6,
      },
      {
        value: '7',
        text: 'Iyul',
        id: 7,
      },
      {
        value: '8',
        text: 'Avgust',
        id: 8,
      },
      {
        value: '9',
        text: 'Sentabr',
        id: 9,
      },
      {
        value: '10',
        text: 'Oktabr',
        id: 10,
      },
      {
        value: '11',
        text: 'Noyabr',
        id: 11,
      },
      {
        value: '12',
        text: 'Dekabr',
        id: 12,
      },
    ])

    const getMonth = month => {
      const result = monthOptions.value.filter(item => {
        if (item.value === month) {
          return item.text
        }
      })
      return result[0].text
    }

    const selectsDatas = ref({
      amount: null,
      paid: null,
    })
    axios.get('/api/payments').then(response => {
      if (response.data.success) {
        selectsDatas.value.amount = response.data.data
        selectsDatas.value.paid = response.data.data
      }
    })

    const totalAmount = () => {
      return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
    }
    const totalPaid = () => {
      return selectsDatas.value.paid.reduce((a, c) => a + c.paid, 0)
    }
    const totalDebt = () => {
      return totalAmount() - totalPaid()
    }

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

    // LoadApis
    const regions = ref([])
    const loadRegions = () => {
      axios.get('/api/regions').then(response => {
        regions.value = response.data.data
      })
    }

    onMounted(() => {
      loadRegions()
    })

    // Paids
    const paymentPaidsList = ref(null)
    const openPaymentPaidsList = item => {
      paymentPaidsList.value.open(item)
    }

    // Return
    return {
      BACKEND_URL,
      state,
      ExportExcel,
      excel,
      totalAmount,
      totalPaid,
      totalDebt,
      paymentPaidsList,
      openPaymentPaidsList,
      fetchDatas,
      selectsDatas,

      picker,
      isDate,
      tableColumns,
      filter,
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

      studentForm,
      openForm,

      MODULE_NAME,
      getMonth,

      // LoadApis
      regions,
      updateAmount,

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

.my-table-footer {
  width: 100%;
  background-color: #f3f2f7;
  td {
    padding: 0 16px;
    font-weight: 700;
    font-size: 14px;
  }
}
</style>
