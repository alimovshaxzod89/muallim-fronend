<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex  pb-0">
      <div class="d-flex pb-5" style="width: 100%">
        <v-text-field
          v-model="filter.query"
          dense
          outlined
          hide-details
          label="Qidirish"
          class="data-list-search me-3"
        ></v-text-field>

        <!-- <v-expansion-panels class="my-accordion" accordion>
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
								v-model="filter.year"
                :items="years"
                item-text="number"
								item-value="id"
								dense
								outlined
								hide-details
								label="YIL"
								class="data-list-search me-3"
							></v-text-field>

							<v-text-field
								v-model="filter.month"
                :items="months"
                item-text="name"
								item-value="id"
								dense
								outlined
								hide-details
								label="YIL"
								class="data-list-search me-3"
							></v-text-field>

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
                    label="Date"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    :prepend-icon="icons.mdiCalendar"
                    v-bind="attrs"
                    @blur="date = parseDate(dateFormatted)"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="filter.date"
                  no-title
                  color="primary"
                  @input="menu1 = false"
                ></v-date-picker>
              </v-menu>

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
                    label="Date (read only text field)"
                    hint="MM/DD/YYYY format"
                    persistent-hint
                    :prepend-icon="icons.mdiCalendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>

                <v-date-picker
                  v-model="filter.date2"
                  no-title
                  color="primary"
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>

							<v-autocomplete
								v-model="filter.teacher_id"
								:items="teachers"
								item-text="name"
								item-value="id"
								dense
								outlined
								hide-details
								label="Ustozlar"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>

							<v-autocomplete
								v-model="filter.group_id"
								:items="groups"
								item-text="number"
								item-value="id"
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
								dense
								outlined
								hide-details
								label="Studentlar"
								class="data-list-search me-3"
								clearable
							></v-autocomplete>
						</v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels> -->
      </div>

      <v-spacer></v-spacer>

      <div class="d-flex align-center">
        <div v-if='state.rows.length > 0' class='mx-2 my-4'>
        <v-btn class='success exportXlsx' color='white' outlined
          @click='ExportExcel()'>Jadvalni yuklab olish
        </v-btn>
		  </div>
      <v-btn v-if="$can('create', 'Teacher')" class="primary" @click="openForm()">Qo'shish</v-btn>
      </div>
    </v-card-text>

    <!-- table -->
    <v-data-table
      ref='excel'
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
          <v-tooltip bottom v-if="$can('delete', 'Teacher')">
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
          <v-tooltip bottom v-if="$can('update', 'Teacher')">
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

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>

      <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>
    
      <template slot='body.append'>
				<tr>
					<th colspan='3' class='text-center'>Jami:</th>
					<th colspan='3' class='text-start'>{{ totalPrice | summa }}</th>
				</tr>
			</template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <teacher-paid-form
      ref="teacherPaidForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import {
  // mdiCalendar,
  mdiTrendingUp,
  mdiPlus,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiPencilOutline,
} from '@mdi/js'

import { onMounted, ref, computed } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'

// store module
import TeacherPaidStoreModule from './TeacherPaidStoreModule'

// composition function
import useTeacherPaidList from './useTeacherPaidList'
import TeacherPaidForm from './TeacherPaidForm'
import DialogConfirm from '../../components/DialogConfirm.vue'

import moment from 'moment'
moment.locale('uz-latn')

import XLSX from 'xlsx'

import numeral from 'numeral'
numeral.locale('ru')

const MODULE_NAME = 'teacherPaid'

export default {
  components: {
    TeacherPaidForm,
    DialogConfirm,
  },
  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    summa: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, TeacherPaidStoreModule)
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
    } = useTeacherPaidList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    // Filter date picker
    // const date = ref(new Date().toISOString().substr(0, 10))
    // const menu1 = ref(false)
    // const menu2 = ref(false)

    // const formatDate = dates => {
    //   if (!dates) return null
    //   const [year, month, day] = dates.split('-')

    //   return `${month}/${day}/${year}`
    // }

    // let dateFormatted = formatDate(new Date().toISOString().substr(0, 10))

    // const parseDate = dates => {
    //   if (!dates) return null
    //   const [month, day, year] = dates.split('/')

    //   return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    // }

    // const computedDateFormatted = computed(() => formatDate(date.value))

    // watch(date, () => {
    //   dateFormatted = formatDate(date.value)
    // })

    //Form
    const teacherPaidForm = ref(null)
    const openForm = id => {
      teacherPaidForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    const totalPrice = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + item.amount, 0)
			return total
		})

    // const years = ref([
    //   { id: 1, number: '2020' },
    //   { id: 2, number: '2021' },
    //   { id: 3, number: '2022' },
    // ])
    // const months = ref([
    //   { id: 1, name: 'Yanvar' },
    //   { id: 1, name: 'Fevral' },
    //   { id: 1, name: 'Mart' },
    //   { id: 1, name: 'Aprel' },
    //   { id: 1, name: 'May' },
    //   { id: 1, name: 'Iyun' },
    //   { id: 1, name: 'Iyul' },
    //   { id: 1, name: 'Avgust' },
    //   { id: 1, name: 'Sentabr' },
    //   { id: 1, name: 'Oktabr' },
    //   { id: 1, name: 'Noyabr' },
    //   { id: 1, name: 'Dekabr' },
    // ])

    // LoadApis
    // const teachers = ref([])
    // const groups = ref([])
    // const students = ref([])
    // const loadTeachers = () => {
    //   axios.get('/api/teachers').then(response => {
    //     teachers.value = response.data.data
    //   })
    // }
    // const loadGroups = () => {
    //   axios.get('/api/groups').then(response => {
    //     groups.value = response.data.data
    //   })
    // }
    // const loadStudents = () => {
    //   axios.get('/api/students').then(response => {
    //     students.value = response.data.data
    //   })
    // }
    // onMounted(() => {
    //   loadTeachers()
    //   loadGroups()
    //   loadStudents()
    // })

    // export xlsx
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

    const BASE_URL = envParams.BASE_URL

    // Return
    return {
      BASE_URL,
      state,

      excel,
			ExportExcel,

      tableColumns,
      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,
      filter,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      teacherPaidForm,
      openForm,

      totalPrice,

      // years,
      // months,
      // teachers,
      // loadTeachers,
      // groups,
      // loadGroups,
      // students,
      // loadStudents,

      // date,
      // dateFormatted,
      // menu1,
      // menu2,
      // computedDateFormatted,
      // parseDate,
      // formatDate,

      MODULE_NAME,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
        // mdiCalendar,
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
</style>
