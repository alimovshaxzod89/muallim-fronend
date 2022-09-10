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
          label="Qidirish"
          class="data-list-search me-3"
        ></v-text-field>

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

      <v-btn v-if="$can('create', 'Teacher')" class="primary" @click="openForm()">Qo'shish</v-btn>
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
          {{item.gender ? 'erkak' : 'ayol'}}
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
import DialogConfirm from '../../components/DialogConfirm.vue'

const MODULE_NAME = 'teacher'

export default {
  components: {
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

    const BASE_URL = envParams.BASE_URL

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
