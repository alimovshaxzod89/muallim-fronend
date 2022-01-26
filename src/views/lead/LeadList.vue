<template>
<div class="d-flex">
<v-col cols="4">
  <v-card id="data-list">
    <h3 class="titleS">So'rovlar</h3>
    <!-- button -->
    <v-btn v-if="$can('create', 'Lead')" x-small class="btn primary" @click="openForm()">Qo'shish</v-btn>

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
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
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
          <v-tooltip bottom v-if="$can('update', 'Lead')">
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

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <lead-form
      ref="leadForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</v-col>



<v-col cols="4">
  <v-card id="data-list-third">
    <h3 class="titleK">Kutish</h3>

    <!-- button -->
    <v-btn v-if="$can('create', 'Lead')" x-small class="btn primary" @click="openSecondForm()">Qo'shish</v-btn>

    <!-- table -->
    <v-data-table
      v-model="secondSelectedTableData"
      :headers="secondTableColumns"
      :items="state.rows"
      :options.sync="options"
      :server-items-length="state.total"
      :loading="secondLoading"
      :items-per-page="options.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
    >

    <template slot="item.index" scope="props">
        {{ props.index + 1 + (secondOptions.page - 1) * secondOptions.itemsPerPage }}
      </template>

    <!-- total -->
      <template #[`item.total`]="{ item }"> ${{ item.total }}</template>
    </v-data-table>

    <template late #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
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
          <v-tooltip bottom v-if="$can('update', 'Lead')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openSecondForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </div>
      </template>

    <dialog-confirm ref="dialogConfirm" />

    <lead-second-form
      ref="leadSecondForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</v-col>

<v-col cols="4">
  <v-card id="data-list-second">
    <h3 class="titleK">To'plam</h3>

    <!-- button -->
    <v-btn v-if="$can('create', 'Lead')" x-small class="btn primary" @click="openThirdForm()">Qo'shish</v-btn>

    <!-- table -->
    <v-data-table
      v-model="thirdSelectedTableData"
      :headers="thirdTableColumns"
      :items="state.rows"
      :options.sync="thirdOptions"
      :server-items-length="state.total"
      :loading="thirdLoading"
      :items-per-page="thirdOptions.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
    >

    <template slot="item.index" scope="props">
        {{ props.index + 1 + (thirdOptions.page - 1) * thirdOptions.itemsPerPage }}
      </template>

    <!-- total -->
      <template #[`item.total`]="{ item }"> ${{ item.total }}</template>
    </v-data-table>

    <template late #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
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
          <v-tooltip bottom v-if="$can('update', 'Lead')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openThirdForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Edit</span>
          </v-tooltip>
        </div>
      </template>

    <dialog-confirm ref="dialogConfirm" />

    <lead-third-form
      ref="leadThirdForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</v-col>
</div>
</template>

<script>
import { mdiTrendingUp, mdiPlus, mdiDeleteOutline, mdiDotsVertical, mdiEyeOutline, mdiPencilOutline } from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'
import moment from 'moment'
moment.locale('uz-latn')

import numeral from 'numeral'
numeral.locale('ru')

import envParams from '@envParams'

// store module
import LeadStoreModule from './LeadStoreModule'

// composition function
import useLeadList from './useLeadList'
import useLeadSecondList from './useLeadSecondList'
import useLeadThirdList from './useLeadThirdList'
import LeadForm from './LeadForm'
import LeadSecondForm from './LeadSecondForm.vue'
import LeadThirdForm from './LeadThirdForm.vue'
import DialogConfirm from '../components/DialogConfirm.vue'

const MODULE_NAME = 'lead'

export default {
  components: {
    LeadForm,
    LeadSecondForm,
    LeadThirdForm,
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
      store.registerModule(MODULE_NAME, LeadStoreModule)
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
    } = useLeadList(MODULE_NAME)

    const {
      secondSelectedTableData,
      secondTableColumns,
      secondOptions,
      secondLoading,
    } = useLeadSecondList(MODULE_NAME)

    const {
      thirdSelectedTableData,
      thirdTableColumns,
      thirdOptions,
      thirdLoading,
    } = useLeadThirdList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const leadForm = ref(null)
    const openForm = id => {
      leadForm.value.open(id)
    }

    const leadSecondForm = ref(null)
    const openSecondForm = id => {
      leadSecondForm.value.open(id)
    }

    const leadThirdForm = ref(null)
    const openThirdForm = id => {
      leadThirdForm.value.open(id)
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
      secondTableColumns,
      thirdTableColumns,
      searchQuery,
      options,
      secondOptions,
      thirdOptions,
      loading,
      secondLoading,
      thirdLoading,
      notify,
      selectedTableData,
      secondSelectedTableData,
      thirdSelectedTableData,
      filter,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      leadForm,
      openForm,

      leadSecondForm,
      openSecondForm,

      leadThirdForm,
      openThirdForm,

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
#data-list-second {
  .data-list-actions {
    max-width: 7.81rem;
  }
  .data-list-search {
    max-width: 10.625rem;
  }
}
#data-list-third {
  .data-list-actions {
    max-width: 7.81rem;
  }
  .data-list-search {
    max-width: 10.625rem;
  }
}
.btn {
    margin-left: 75%;
    margin-bottom: 2%;
}
.titleS{
    margin-left: 38%;
    padding-top: 3%;
}
.titleK{
  margin-left: 38%;
  padding-top: 3%;
}
</style>
