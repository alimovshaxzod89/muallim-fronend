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
          label="Qidirish"
          class="data-list-search me-3"
        ></v-text-field>
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

      <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>

      <template #[`item.money_id`]="{ item }"> {{ item.money_id }}</template>

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>


      <!-- <template v-slot:footer>
        <table class="my-table-footer">
          <tbody>
            <tr>
              <td></td>
              <td></td>
							<td></td>
              <td
                rowspan="5"
              >
                Jami:
              </td>
              <td
                rowspan="1"
                class="money text-end d-flex"
              >
                <p>
                  Summa:
                </p>
                {{totalAmount()}}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </template> -->

    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <expense-form
      ref="expenseForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import { mdiTrendingUp, mdiPlus, mdiDeleteOutline, mdiDotsVertical, mdiEyeOutline, mdiPencilOutline } from '@mdi/js'

import { onUnmounted, onMounted, ref } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'

// store module
import ExpenseStoreModule from './ExpenseStoreModule'

// composition function
import useExpenseList from './useExpenseList'
import ExpenseForm from './ExpenseForm'
import DialogConfirm from '../../components/DialogConfirm.vue'

import moment from 'moment'
moment.locale('uz-latn')

import axios from '@axios'
import { nullFormat } from 'numeral'

const MODULE_NAME = 'expense'

export default {
  components: {
    ExpenseForm,
    DialogConfirm,
  },
  filters: {
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, ExpenseStoreModule)
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
    } = useExpenseList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const expenseForm = ref(null)
    const openForm = id => {
      expenseForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    axios.get('/api/expense').then(response => {
      if (response.data.success) {
        selectsDatas.value.amount = response.data.data
      }
    })
    const selectsDatas = ref({
      amount: [],
    })
    const totalAmount = () => {
      return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
    }

    const BASE_URL = envParams.BASE_URL

    // Return
    return {
      BASE_URL,
      state,

      selectsDatas,

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

      expenseForm,
      openForm,

      totalAmount,

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

.my-table-footer {
  width: 100%;
  background-color: #f3f2f7;
  td {
    padding: 0 5px;
    font-weight: 700;
    font-size: 14px;
  }
}
.money {
  margin-left: 48%;
  margin-top: 2%;
}
</style>
