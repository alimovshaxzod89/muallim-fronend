<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-center flex-wrap pb-0">
      <!-- <div class="d-flex align-center pb-5">
        <v-text-field
          v-model="filter.query"
          dense
          outlined
          hide-details
          label="Qidiruv"
          class="data-list-search me-3"
        ></v-text-field>
      </div> -->

      <v-col cols="3" class="">
        <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
            class="my-date-picker"
              v-model="filter.date"
              label="SANA"
              readonly
              :now="today"
              :value="today"
              v-bind="attrs"
              v-on="on"
              outlined
              clearable
              :append-icon="icons.mdiCalendar"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="filter.date"
            color="primary"
            @input="isDate = false"
            no-title
            :first-day-of-week="1"
            locale="ru-ru"
          ></v-date-picker>
        </v-menu>
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
							  	v-model="filter.month"
							  	:items="months"
							  	item-text="name"
							  	item-value="id"
							  	dense
							  	outlined
							  	hide-details
							  	label="OY"
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete>
              </v-col>

              <v-col cols="3">
                <v-autocomplete
							  	v-model="filter.teacher_id"
							  	:items="teachers"
							  	item-text="full_name"
							  	item-value="id"
							  	dense
							  	outlined
							  	hide-details
							  	label="USTOZ"
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete>
              </v-col>

              <v-col cols="3">
                <v-autocomplete
							  	v-model="filter.group_id"
							  	:items="groups"
							  	item-text="number"
							  	item-value="id"
							  	dense
							  	outlined
							  	hide-details
							  	label="GURUH"
							  	class="data-list-search me-3"
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
							  	class="data-list-search me-3"
							  	clearable
							  ></v-autocomplete>
              </v-col>
						</v-expansion-panel-content>
            <v-expansion-panel-content>
              
            </v-expansion-panel-content>
					</v-expansion-panel>
				</v-expansion-panels>
      </v-col>
    </v-card-text>

    <!-- table -->
    <v-data-table
      v-model="selectedTableData"
      :headers="tableColumns"
      :items="state.rows"
      :options.sync="options"
      :server-items-length="state.total"
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
          <v-tooltip bottom v-if="$can('delete', 'Group')">
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
          <v-tooltip bottom v-if="$can('update', 'Group')">
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

      <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />
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
  mdiFilterOutline,
  mdiCalendar, 
  } from '@mdi/js'

import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import numeral from 'numeral'

import envParams from '@envParams'

// store module
import StudentDeptStoreModule from './StudentDeptStoreModule'

// composition function
import useStudentDeptList from './useStudentDeptList'
import DialogConfirm from '../../components/DialogConfirm.vue'

const MODULE_NAME = 'studentDept'

export default {
  components: {
    DialogConfirm,
  },
  filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		summa: value => numeral(value).format('0,0'),
		feed: value => (value[1] + '/' + value[2] + '/' + value[3]),
	},
  setup() {

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentDeptStoreModule)
    }
    // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])

    const today = Date.now()

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //logics
    const {
      filter,
      searchQuery,
      tableColumns,
      deleteRow,
      selectedTableData,

      options,
      notify,
    } = useStudentDeptList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    const BASE_URL = envParams.BASE_URL


    // LoadApis
    const months = ref([])
    const loadMonths = () => {
      axios.get('/api/months').then(response => {
        months.value = response.data.data 
      })
    }
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

    onMounted(() => {
      loadMonths()
      loadTeachers()
      loadGroups()
      loadStudents()
    })



    // Return
    return {
      BASE_URL,
      state,
      picker,
      isDate,
      today,

      tableColumns,
      searchQuery,
      options,
      notify,
      filter,
      selectedTableData,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      MODULE_NAME,

      // LoadApis
      months,
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
