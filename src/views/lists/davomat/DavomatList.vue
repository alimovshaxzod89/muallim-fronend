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

        <!-- <v-col cols="9">
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
        </v-col> -->

      <v-spacer></v-spacer>

    <div class="d-flex align-center">

      <div v-if='state.rows.length > 0' class='mx-2'>
        <v-btn class='success exportXlsx' color='white' outlined
          @click='ExportExcel()'>Jadvalni yuklab olish
        </v-btn>
		  </div>
       <div class="btnAdd ml-auto">
        <v-btn class="primary" @click="openForm()">Qo'shish</v-btn>
      </div>
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

      <template #[`item.date`]="{ item }">
        {{item.date | date}}
      </template>

      <template #[`item.came`]="{ item }">
          {{item.came ? 'ha' : 'yuq'}}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <davomat-form
      ref="davomatForm"
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

import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'

import envParams from '@envParams'

// store module
import DavomatStoreModule from './DavomatStoreModule'

// composition function
import useDavomatList from './useDavomatList'
import DavomatForm from './DavomatForm'
import DialogConfirm from '../../components/DialogConfirm.vue'

import XLSX from 'xlsx'

import moment from 'moment'
moment.locale('uz-latn')

const MODULE_NAME = 'davomat'

export default {
  components: {
    DavomatForm,
    DialogConfirm,
  },
  filters: {
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, DavomatStoreModule)
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
    } = useDavomatList(MODULE_NAME)

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

    //Form
    const davomatForm = ref(null)
    const openForm = id => {
      davomatForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

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
      loadGroups(), loadStudents()
    })

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
      picker,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      davomatForm,
      openForm,

      MODULE_NAME,

      // LoadApis
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
