<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">

			<teacher-search v-model='filter' />

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

      <template #[`item.gender`]="{ item }">
				{{ item.gender == 1 ? 'Erkak' : item.gender == 2 ? 'Ayol' : '' }}
      </template>

			<template #[`item.places`]="{ item }">
				{{item.places.map(place => place.name).join(', ')}}
			</template>

      <template #[`item.birth_date`]="{ item }"> {{ item.birth_date | date }}</template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <teacher-form
      ref="teacherForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import { mdiCalendar, mdiFilterOutline,  mdiTrendingUp, mdiPlus, mdiDeleteOutline, mdiDotsVertical, mdiEyeOutline, mdiPencilOutline } from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'

import moment from 'moment'
moment.locale('uz-latn')

import envParams from '@envParams'

// store module
import TeacherStoreModule from './TeacherStoreModule'

// composition function
import useTeacherList from './useTeacherList'
import TeacherForm from './TeacherForm'
import XLSX from 'xlsx'
import DialogConfirm from '../../components/DialogConfirm.vue'
import TeacherSearch from '@/views/lists/teacher/TeacherSearch'

const MODULE_NAME = 'teacher'

export default {
  components: {
		TeacherSearch,
    TeacherForm,
    DialogConfirm,
  },
  filters: {
		date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
		// sum: value => numeral(value).format('0,0'),
		feed: value => (value[1] + '/' + value[2] + '/' + value[3]),
	},
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, TeacherStoreModule)
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
    } = useTeacherList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const teacherForm = ref(null)
    const openForm = id => {
      teacherForm.value.open(id)
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

      teacherForm,
      openForm,

      MODULE_NAME,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
        mdiCalendar,
        mdiFilterOutline
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
