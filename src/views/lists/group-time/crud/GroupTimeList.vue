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
				<span class="headline">Guruh vaqtlari</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<div id="data-list">
								<v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">
									<v-btn class="primary" @click="openForm(null, filter.group_id)">Qo'shish</v-btn>
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
													<v-btn icon small v-bind="attrs" v-on="on" @click="openForm(item)">
														<v-icon size="18">
															{{ icons.mdiPencilOutline }}
														</v-icon>
													</v-btn>
												</template>
												<span>Tahrirlash</span>
											</v-tooltip>
										</div>
									</template>
								</v-data-table>

								<dialog-confirm ref="dialogConfirm" />

								<group-time-form
									ref="GroupTimeForm"
									:MODULE_NAME="MODULE_NAME"
									v-on:refresh-list="$emit('refresh-list')"
									v-on:delete-row="$emit('delete-row')"
									v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
								/>
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
} from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'

// store module
import GroupTimeStoreModule from '../GroupTimeStoreModule'

// composition function
import useGroupTimeList from './useGroupTimeList'
import GroupTimeForm from './GroupTimeForm.vue'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

export default {
  components: {
    GroupTimeForm,
    DialogConfirm,
  },
  setup(props, { emit }) {
    const MODULE_NAME = 'group-time'
    const BASE_URL = envParams.BASE_URL

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, GroupTimeStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    // Modal
    const show = ref(false)
    const group_id = ref(null)
    const open = (group_id = null) => {
      show.value = true
      filter.value.group_id = group_id

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
    } = useGroupTimeList(MODULE_NAME)

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
    const GroupTimeForm = ref(null)
    const openForm = (item, group_id) => {
      GroupTimeForm.value.open(item, group_id)
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

    // Return
    return {
      show,
      open,
      close,
      BASE_URL,
      state,

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

      GroupTimeForm,
      openForm,
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
