<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-center flex-wrap pb-0">
      <div class="d-flex align-center pb-5">
        <v-text-field
          v-model="filter.query"
          dense
          outlined
          hide-details
          label="Qidiruv"
          class="data-list-search me-3"
        ></v-text-field>

				<v-autocomplete
					v-if='BRANCH_ID == null'
					v-model="filter.place_id"
					:items="places"
					item-text="name"
					item-value="id"
					label="FILIAL"
					class="data-list-search me-3"
					dense
					outlined
					hide-details
					clearable
				>
				</v-autocomplete>
      </div>

      <v-spacer></v-spacer>
      <div v-if='state.rows.length > 0' class='mx-2 my-4'>
        <v-btn class='success exportXlsx' color='white' outlined
          @click='ExportExcel()'>Jadvalni yuklab olish
        </v-btn>
      </div>
      <v-btn v-if="$can('create', 'Room')" class="primary" @click="openForm()">Qo'shish</v-btn>
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
      <template slot="item.index" slot-scope="props">
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

      <template #[`item.status`]="{ item }">
          {{item.status ? 'ha' : 'yo\'q'}}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <room-form
      ref="roomForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import { mdiTrendingUp, mdiPlus, mdiDeleteOutline, mdiDotsVertical, mdiEyeOutline, mdiPencilOutline } from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'

// store module
import RoomStoreModule from './RoomStoreModule'

import XLSX from 'xlsx'

// composition function
import useRoomList from './useRoomList'
import RoomForm from './RoomForm'
import DialogConfirm from '../../components/DialogConfirm.vue'
import axios from '@axios'

const MODULE_NAME = 'room'

export default {
  components: {
    RoomForm,
    DialogConfirm,
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, RoomStoreModule)
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
    } = useRoomList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const roomForm = ref(null)
    const openForm = id => {
      roomForm.value.open(id)
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

		const places = ref([])
		const loadPlaces = () => {
			axios.get('/api/places').then(response => {
				places.value = response.data.data
			})
		}
		loadPlaces()

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
			places,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      roomForm,
      openForm,

      MODULE_NAME,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
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
