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
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="$can('create', 'Room')" class="primary" @click="openForm()">Qo'shish</v-btn>
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

      <template #[`item.date`]="{ item }">
        {{ item.date | date }}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <cashbox-form
      ref="cashboxForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import { mdiTrendingUp, mdiPlus, mdiDeleteOutline, mdiDotsVertical, mdiEyeOutline, mdiPencilOutline } from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'
import moment from 'moment'
moment.locale('uz-latn')

// store module
import CashboxStoreModule from './CashboxStoreModule'

// composition function
import useCashboxList from './useCashboxList'
import CashboxForm from './CashboxForm.vue'
import DialogConfirm from '../../components/DialogConfirm.vue'

const MODULE_NAME = 'cashbox'

export default {
  components: {
    CashboxForm,
    DialogConfirm,
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, CashboxStoreModule)
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
    } = useCashboxList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const cashboxForm = ref(null)
    const openForm = id => {
      cashboxForm.value.open(id)
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
      cashboxForm,
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
