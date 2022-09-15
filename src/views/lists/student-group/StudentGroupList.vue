<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex flex-column">
      <v-row class="flex-wrap">
        <v-col>
          <v-autocomplete
            v-model="filter.teacher_id"
            :items="teachers"
            item-text="full_name"
            item-value="id"
            dense
            outlined
            hide-details
            label="USTOZ"
            class="mx-auto"
            clearable
          >
          </v-autocomplete>
        </v-col>

        <v-col>
          <v-autocomplete
            v-model="filter.group_id"
            :items="groups"
            item-text="number"
            item-value="id"
            dense
            outlined
            hide-details
            label="GURUH"
            class="mx-auto"
            clearable
          ></v-autocomplete>
        </v-col>

        <v-col cols="3">
          <v-autocomplete
            v-model="filter.student_id"
            :items="students"
            item-text="full_name"
            item-value="id"
            dense
            outlined
            hide-details
            label="TALABA"
            class="mx-auto"
            clearable
          ></v-autocomplete>
        </v-col>

        <v-col cols="3">
          <v-autocomplete
            v-model="filter.status"
            :items="[{value: 1, name: 'Ha'}, {value: 0, name: 'Yo\'q'}]"
            item-text="name"
            item-value="value"
            dense
            outlined
            hide-details
            label="Aktiv"
            class="mx-auto"
            clearable
          ></v-autocomplete>
        </v-col>

      </v-row>

      <v-row>
        <v-col cols="3">
          <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filter.begin_date"
                label="Boshlangan sana"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
                outlined
                clearable
                :append-icon="icons.mdiCalendar"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="filter.begin_date"
              color="primary"
              @input="isDate = false"
              no-title
              :first-day-of-week="1"
              locale="ru-ru"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="3">
          <v-menu
            v-model="isDateTwo"
            :close-on-content-click="false"
            offset-y min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="filter.end_date"
                label="Tugagan sana"
                readonly
                v-bind="attrs"
                hide-details
                v-on="on"
                outlined
                clearable
                :append-icon="icons.mdiCalendar"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="filter.end_date"
              color="primary"
              @input="isDateTwo = false"
              no-title
              :first-day-of-week="1"
              locale="ru-ru"
            ></v-date-picker>
          </v-menu>
        </v-col>

      </v-row>

      <v-spacer></v-spacer>

      <div class="d-flex align-center ml-auto my-4">

        <div v-if='state.rows.length > 0' class='mx-2'>
          <v-btn class='success exportXlsx' color='white' outlined
            @click='ExportExcel()'>Jadvalni yuklab olish
          </v-btn>
		    </div>
        <v-btn class="primary" @click="openForm()">Qo'shish</v-btn>
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
      <template slot="item.index" scope="props">
        {{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
      </template>

      <!-- total -->
      <template #[`item.total`]="{ item }"> ${{ item.total }}</template>

      <template late #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'StudentGroup')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="confirmDelete(item.id)">
                <v-icon size="18">
                  {{ icons.mdiDeleteOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span >Delete</span>
          </v-tooltip>

          <!-- view  -->
          <v-tooltip bottom  v-if="$can('update', 'StudentGroup')">
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

      <template #[`item.group_id`]="{ item }">
        {{ item.group_id | numeral('0,0') }}
      </template>

      <template #[`item.begin_date`]="{ item }">
        {{ item.begin_date | date }}
      </template>
      <template #[`item.end_date`]="{ item }">
        {{ item.end_date | date }}
      </template>

			<template #[`item.sale`]="{ item }">
				<div v-if='item.sale'>
					{{ item.sale | summa }}
					<br>
					<i>{{ item.sale_cause }}</i>
				</div>
			</template>

      <template #[`item.status`]="{ item }">
          {{item.status ? 'ha' : 'yo\'q'}}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <student-group-form
      ref="studentGroupForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import store from '@/store'
import axios from '@axios'
import envParams from '@envParams'
import {
  mdiCalendar,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiFilterOutline,
  mdiPencilOutline,
  mdiPlus,
  mdiTrendingUp,
} from '@mdi/js'
import { onMounted, ref, watch } from '@vue/composition-api'
import moment from 'moment'
import numeral from 'numeral'
import XLSX from 'xlsx'
import DialogConfirm from '../../components/DialogConfirm.vue'
import StudentGroupForm from './StudentGroupForm'
// store module
import StudentGroupStoreModule from './StudentGroupStoreModule'
// composition function
import useStudentGroupList from './useStudentGroupList'

moment.locale('uz-latn')

numeral.locale('ru')

const MODULE_NAME = 'studentGroup'

export default {
  components: {
    StudentGroupForm,
    DialogConfirm,
  },
  filters: {
    date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
    sum: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentGroupStoreModule)
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
    } = useStudentGroupList(MODULE_NAME)

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
    const isDateTwo = ref(false)

    //Form
    const studentGroupForm = ref(null)
    const openForm = id => {
      studentGroupForm.value.open(id)
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


		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}

    const teachers = ref([])
    const loadTeachers = () => {
      axios.get('/api/teachers').then(response => {
        teachers.value = response.data.data
      })
    }
		loadTeachers()

    const groups = ref([])
    const freshGroups = ref([])
    const params = ref({})

    const loadGroups = () => {
			const params = clearParams({
				teacher_id: filter.value.teacher_id,
			})

      axios.get(`/api/groups`, { params }).then(response => {
        groups.value = response.data.data
      })
    }
		loadGroups()

    watch(
      () => filter.value.teacher_id,
      () => {
        loadGroups()
      },
    )

    const students = ref([])
    const loadStudents = () => {
      axios.get('/api/students').then(response => {
        students.value = response.data.data
      })
    }
		loadStudents()

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
      picker,

      isDate,
      isDateTwo,
      picker,

      freshGroups,

      params,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      studentGroupForm,
      openForm,

      MODULE_NAME,

      // LoadApis
      teachers,
      groups,
      students,

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
</style>
