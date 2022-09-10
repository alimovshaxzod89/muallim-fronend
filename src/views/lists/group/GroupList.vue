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
        <v-autocomplete
          v-model="filter.place_id"
          :items="places"
          item-text="name"
          item-value="id"
          label="BINO"
          class="data-list-search me-3"
          dense
          solo
          outlined
          hide-details
          clearable
        >
        </v-autocomplete>
       

				<v-expansion-panels class="my-accordion" accordion multiple>
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
			<v-btn v-if="$can('create', 'Group')" class="primary" @click="openForm()">Qo'shish</v-btn>
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
			:headers-length="2"
    >
      <template slot="item.index" scope="props">
        {{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
      </template>

      <template #[`item.actions`]="{ item }">
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
            <span>O'chirish</span>
          </v-tooltip>

          <!-- edit  -->
          <v-tooltip bottom v-if="$can('update', 'Group')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Tahrirlash</span>
          </v-tooltip>

					<!-- time edit -->
					<v-tooltip bottom v-if="$can('manage', 'GroupTime')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openGroupTimeList(item)">
                <v-icon size="18">
                  {{ icons.mdiClockTimeThreeOutline  }}
                </v-icon>
              </v-btn>
            </template>
            <span>Guruh vaqtlarini tahrirlash</span>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.status`]="{ item }">
          {{item.status ? 'ha' : 'yo\'q'}}
      </template>

			<template #[`item.begin_date`]="{ item }">
				{{item.begin_date | date}} <br>
				<b>{{ item.end_date | date}}</b>
      </template>

			<template #[`item.group_times`]="{ item }" >
				<div class="my-table my-size-table pa-5">
					<v-simple-table dense>
						<template v-slot:default>
							<tbody>
								<tr v-for="(i, index) in item.group_times" :key="item.id + index">
									<td class="text-center">{{ i.week_day ? getDay(i.week_day) : '-' }}</td>
									<td class="text-center">{{ i.room ? i.room.name : '-' }}</td>
									<td class="text-center">{{ i.time_begin ? i.time_begin : '-' }}</td>
									<td class="text-center">{{ i.time_end ? i.time_end : '-' }}</td>
								</tr>
							</tbody>
						</template>
					</v-simple-table>
				</div>
      </template>

      <!-- <template #[`item.begin_date`]="{ item }"> {{ item.begin_date | date }}</template>
      <template #[`item.end_date`]="{ item }"> {{ item.end_date | date }}</template> -->

      <template #[`item.price`]="{ item }"> {{ item.price | summa }}</template>

    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <group-form
      ref="GroupForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />

		<group-time-list
      ref="groupTimeList"
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
  mdiClockTimeThreeOutline,
} from '@mdi/js'

import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import moment from 'moment'
moment.locale('uz-latn')

import numeral from 'numeral'
numeral.locale('ru')

import envParams from '@envParams'

// store module
import GroupStoreModule from './GroupStoreModule'

// composition function
import useGroupList from './useGroupList'
import GroupForm from './GroupForm'
import GroupTimeList from '@/views/lists/group-time/crud/GroupTimeList.vue'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

const MODULE_NAME = 'group'

export default {
  components: {
    GroupForm,
    GroupTimeList,
    DialogConfirm,
  },
  filters: {
    date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
    summa: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, GroupStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    //store state
    const state = ref(store.state[MODULE_NAME])

    const panel = [1, 2];
    const readonly = false;

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
    } = useGroupList(MODULE_NAME)

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
    const GroupForm = ref(null)
    const openForm = id => {
      GroupForm.value.open(id)
    }

    // time list form
    const groupTimeList = ref(null)
    const openGroupTimeList = group => {
      groupTimeList.value.open(group.id)
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

    // ! METHODS
    const places = ref([])
    const loadPlace = () => {
      axios.get('/api/places').then(response => {
        places.value = response.data.data
      })
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
      loadPlace()
    })

    // PlaceForm
    const placeForm = ref(null)
    const addPlace = (id = null) => {
      placeForm.value.open(id)
    }

    // Return
    return {
      BASE_URL,
      state,
      filter,
      loadPlace,

      picker,
      isDate,
      tableColumns,
      fetchDatas,
      options,
      loading,
      notify,
      selectedTableData,

      placeForm,
      addPlace,

      // LoadApis
      places,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      GroupForm,
      openForm,

      MODULE_NAME,

      groupTimeList,
      openGroupTimeList,

      // LoadApis
      regions,

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
        mdiClockTimeThreeOutline,
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
