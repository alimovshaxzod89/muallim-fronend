<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-center flex-wrap pb-0">

        <v-col cols="3">
          <v-text-field
            v-model="filter.query"
            dense
            outlined
            hide-details
            label="Qidirish"
            class="data-list-search me-3"
          ></v-text-field>
        </v-col>

        <v-col cols="9">
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

              <v-col cols="3">
							  <v-autocomplete
							  	v-model="filter.year"
                  :items="years"
                  item-text="number"
							  	item-value="id"
                  solo
							  	dense
							  	outlined
							  	hide-details
							  	label="YIL"
							  	class="data-list-search me-3"
                  clearable
							  ></v-autocomplete>
              </v-col>

              <v-col cols="3">
							  <v-autocomplete
							  	v-model="filter.month"
                  :items="months"
                  item-text="name"
							  	item-value="id"
                  solo
							  	dense
							  	outlined
							  	hide-details
							  	label="OY"
							  	class="data-list-search me-3"
                  clearable
							  ></v-autocomplete>
              </v-col>

              <v-col cols="3">
                <v-menu
                  ref="menuref"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >

                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="filter.date"
                        label="Xozirgi san'a"
                        persistent-hint
                        :prepend-icon="icons.mdiCalendar"
                        v-bind="attrs"
                        @blur="date = parseDate(dateFormatted)"
                        v-on="on"
                        outlined
                        dense
                        clearable
                      ></v-text-field>
                    </template>


                    <v-date-picker
                      v-model="filter.date"
                      no-title
                      color="primary"
                      @input="menu1 = false"
                    ></v-date-picker>

                </v-menu>
              </v-col>

              <v-col cols="3">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="auto"
                >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="filter.date2"
                        label="san'ani tanlash"
                        persistent-hint
                        :prepend-icon="icons.mdiCalendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        outlined
                        dense
                        clearable
                      ></v-text-field>
                    </template>

                  <v-date-picker
                    v-model="filter.date2"
                    no-title
                    color="primary"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

							  <!-- <v-autocomplete
							  	v-model="filter.full_name"
							  	:items="teachers"
							  	item-text="full_name"
							  	item-value="id"
							  	dense
							  	outlined
							  	hide-details
							  	label="Ustozlar"
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete> -->

							  <v-autocomplete
							  	v-model="filter.group_id"
							  	:items="groups"
							  	item-text="number"
							  	item-value="id"
                  solo
							  	dense
							  	outlined
							  	hide-details
							  	label="Guruhlar"
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete>

							  <v-autocomplete
							  	v-model="filter.student_id"
							  	:items="students"
							  	item-text="full_name"
							  	item-value="id"
                  solo
							  	dense
							  	outlined
							  	hide-details
							  	label="Studentlar"
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete>

						  </v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
        </v-col>
      <v-spacer></v-spacer>

    <div class="btnAdd ml-auto">
      <v-btn class="primary mb-3" @click="openForm()">Qo'shish</v-btn>
    </div>
    </v-card-text>

    <!-- table -->
    <v-data-table
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
      <template slot="item.index" slot-scope="props">
        {{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
      </template>

      <!-- total -->
      <template #[`item.total`]="{ item }"> ${{ item.total }}</template>

      <template late #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="confirmDelete(item.id)">
                <v-icon size="18">
                  {{ icons.mdiDeleteOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>

          <!-- view  -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.month_year`]="{ item }">
        {{ item.payment.date | year_month }}
      </template>
      <template #[`item.amount`]="{ item }">
        {{ item.amount | summa }}
      </template>

      <template #[`item.date`]="{ item }">
        {{ item.date | date }}
      </template>


      <template v-slot:footer>
				<table class="totalAmount">
					<tbody>
						<tr>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td rowspan="10" class="text-end">Jami summa:</td>
							<td rowspan="1" class="text-end">{{totalAmount()}}</td>
							<td></td>
						</tr>
					</tbody>
				</table>
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <student-paid-form
      ref="studentPaidForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import {
  mdiFilterOutline,
  mdiCalendar,
  mdiTrendingUp,
  mdiPlus,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiPencilOutline,
} from '@mdi/js'

import { onMounted, ref, computed, watch } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import moment from 'moment'
moment.locale('uz-latn')

import envParams from '@envParams'

// store module
import StudentPaidStoreModule from './StudentPaidStoreModule'

// composition function
import useStudentPaidList from './useStudentPaidList'
import StudentPaidForm from './StudentPaidForm'
import DialogConfirm from '../../components/DialogConfirm.vue'

const MODULE_NAME = 'studentPaid'

export default {
  components: {
    StudentPaidForm,
    DialogConfirm,
  },
  filters: {
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentPaidStoreModule)
    }
    // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      filter,
      searchQuery,
      tableColumns,
      deleteRow,

      options,
      loading,
      notify,
      selectedTableData,
    } = useStudentPaidList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    // Filter date picker
    const date = ref(new Date().toISOString().substr(0, 10))
    const menu1 = ref(false)
    const menu2 = ref(false)

    const formatDate = dates => {
      if (!dates) return null
      const [year, month, day] = dates.split('-')

      return `${month}/${day}/${year}`
    }

    let dateFormatted = formatDate(new Date().toISOString().substr(0, 10))

    const parseDate = dates => {
      if (!dates) return null
      const [month, day, year] = dates.split('/')

      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }

    const computedDateFormatted = computed(() => formatDate(date.value))

    watch(date, () => {
      dateFormatted = formatDate(date.value)
    })

    // Datepicker
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)
    const isDateTwo = ref(false)

    //Form
    const studentPaidForm = ref(null)
    const openForm = id => {
      studentPaidForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    const BASE_URL = envParams.BASE_URL

    const years = ref([
      { id: 1, number: '2020' },
      { id: 2, number: '2021' },
      { id: 3, number: '2022' },
    ])
    const months = ref([
      { id: 1, name: 'Yanvar' },
      { id: 2, name: 'Fevral' },
      { id: 3, name: 'Mart' },
      { id: 4, name: 'Aprel' },
      { id: 5, name: 'May' },
      { id: 6, name: 'Iyun' },
      { id: 7, name: 'Iyul' },
      { id: 8, name: 'Avgust' },
      { id: 9, name: 'Sentabr' },
      { id: 10, name: 'Oktabr' },
      { id: 11, name: 'Noyabr' },
      { id: 12, name: 'Dekabr' },
    ])

    const teachers = ref([])
    const loadTeachers = () => {
      axios.get('/api/teachers').then(response => {
        teachers.value = response.data.data
      })
    }

    const groups = ref([])
    const loadGroups = () => {
      axios.get('/api/groups').then(response => {
        groups.value = response.data.data
      })
    }

    const students = ref([])
    const loadStudents = () => {
      axios.get('/api/students').then(response => {
        students.value = response.data.data
      })
    }

    const selectsDatas = ref({
      amount: null,
    })

    const totalAmount = () => {
      return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
    }
    axios.get('/api/payment-paids').then(response => {
      if (response.data.success) {
        selectsDatas.value.amount = response.data.data
      }
    })

    onMounted(() => {
      loadTeachers()
      loadGroups()
      loadStudents()
    })

    // Return
    return {
      BASE_URL,
      state,

      totalAmount,
      selectsDatas,

      tableColumns,
      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,
      filter,
      picker,

      isDate,
      isDateTwo,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      years,
      months,
      teachers,
      loadTeachers,
      groups,
      loadGroups,
      students,
      loadStudents,

      date,
      dateFormatted,
      menu1,
      menu2,
      computedDateFormatted,
      parseDate,
      formatDate,

      studentPaidForm,
      openForm,

      MODULE_NAME,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
        mdiFilterOutline,
        mdiCalendar,
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
.totalAmount {
  margin-left: 70%;
}
</style>
