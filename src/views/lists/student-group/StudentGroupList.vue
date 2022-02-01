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
                    class="data-list-search me-3"
                    clearable
                  ></v-autocomplete>
                </v-col>

                <v-col cols="3">
                  <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="my-date-picker"
                        v-model="filter.begin_date"
                        label="Boshlangan sana"
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
                        class="my-date-picker"
                        v-model="filter.end_date"
                        label="Tugagan sana"
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
                      v-model="filter.end_date"
                      color="primary"
                      @input="isDateTwo = false"
                      no-title
                      :first-day-of-week="1"
                      locale="ru-ru"
                    ></v-date-picker>
                  </v-menu>
                </v-col>

              </v-expansion-panel-content>
              <v-expansion-panel-content>
                
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
      <template slot="item.index" scope="props">
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

      <template #[`item.group_id`]="{ item }"> 
        {{ item.group_id | numeral('0,0') }}
      </template>

      <template #[`item.begin_date`]="{ item }"> 
        {{ item.begin_date | date }}
      </template>
      <template #[`item.end_date`]="{ item }"> 
        {{ item.end_date | date }}
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
import { 
  mdiFilterOutline, 
  mdiCalendar, 
  mdiTrendingUp, 
  mdiPlus, 
  mdiDeleteOutline, 
  mdiDotsVertical, 
  mdiEyeOutline, 
  mdiPencilOutline 
} from '@mdi/js'


import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import moment from 'moment'
moment.locale('uz-latn')

import envParams from '@envParams'

// store module
import StudentGroupStoreModule from './StudentGroupStoreModule'

// composition function
import useStudentGroupList from './useStudentGroupList'
import StudentGroupForm from './StudentGroupForm'
import DialogConfirm from '../../components/DialogConfirm.vue'

import numeral from 'numeral'
numeral.locale('ru')

const MODULE_NAME = 'studentGroup'

export default {
  components: {
    StudentGroupForm,
    DialogConfirm,
  },
  filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		sum: value => numeral(value).format('0,0'),
		feed: value => (value[1] + '/' + value[2] + '/' + value[3]),
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
      loadTeachers(),
      loadGroups(),
      loadStudents()
    })

    // Return
    return {
      BASE_URL,
      state,

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
