<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">
      <div class="d-flex pb-5" style="width: 100%">
				<v-text-field
          v-model="searchQuery"
          dense
          outlined
          hide-details
          label="Qidiruv"
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
								v-model="options.first_name"
								dense
								outlined
								hide-details
								label="Fish"
								class="data-list-search me-3"
							></v-text-field>

							<v-text-field
								v-model="options.phone"
								dense
								outlined
								hide-details
								label="Telefon"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="options.region_id"
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
								v-model="options.address"
								dense
								outlined
								hide-details
								label="Manzil"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="options.permanent_region_id"
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
								v-model="options.permanent_address"
								dense
								outlined
								hide-details
								label="D.Y. Manzil"
								class="data-list-search me-3"
							></v-text-field>

							<v-autocomplete
								v-model="options.gender"
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
										class="my-date-picker"
										v-model="options.birth_date"
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
									v-model="options.birth_date"
									color="primary"
									@input="isDate = false"
									no-title
									:first-day-of-week="1"
									locale="ru-ru"
								></v-date-picker>
							</v-menu>

							<v-autocomplete
								v-model="options.sale"
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
								v-model="options.sale_cause"
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
			<v-btn class="primary" @click="openForm()">Qo'shish</v-btn>
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

      <template #[`item.actions`]="{ item }">
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
            <span>O'chirish</span>
          </v-tooltip>

          <!-- edit  -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Tahrirlash</span>
          </v-tooltip>

          <!-- image -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openPhoto(item)">
                <v-icon size="18">
                  {{ icons.mdiImageEditOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Suratni tanlash</span>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.gender`]="{ item }">
        {{ item.gender === 1 ? 'Erkak' : 'Ayol' }}
      </template>

      <template #[`item.photo`]="{ item }">
        <img
          class="img-user"
          :src="item.photo_link ? BASE_URL + item.photo_link : require(`@/assets/images/user-image.png`)"
          alt="Avatar"
        />
      </template>

      <template #[`item.sale`]="{ item }">
        {{ item.sale ? 'Ha' : 'Yo\'q' }}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <student-form
      ref="studentForm"
      :MODULE_NAME="MODULE_NAME"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />

    <student-photo
      ref="studentPhoto"
      :MODULE_NAME="MODULE_NAME"
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
} from '@mdi/js'

import { onMounted, onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'

import envParams from '@envParams'

// store module
import StudentStoreModule from './StudentStoreModule'

// composition function
import useStudentList from './useStudentList'
import StudentForm from './StudentForm'
import StudentPhoto from './StudentPhoto'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

export default {
  components: {
    StudentForm,
    StudentPhoto,
    DialogConfirm,
  },
  setup() {
    const MODULE_NAME = 'students'

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      searchQuery,
      tableColumns,
      deleteRow,

      options,
      loading,
      notify,
      selectedTableData,
    } = useStudentList(MODULE_NAME)

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
    const studentForm = ref(null)
    const openForm = id => {
      studentForm.value.open(id)
    }

    //Photo
    const studentPhoto = ref(null)
    const openPhoto = item => {
      studentPhoto.value.openUserImage(item)
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

    // LoadApis
    const regions = ref([])
    const loadRegions = () => {
      axios.get('regions').then(response => {
        regions.value = response.data.data
      })
    }

    onMounted(() => {
      loadRegions()
    })

    // Return
    return {
      BASE_URL,
      state,

      picker,
      isDate,
      tableColumns,
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

      studentForm,
      studentPhoto,
      openForm,
      openPhoto,

      MODULE_NAME,

      // LoadApis
      regions,

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
