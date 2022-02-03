<template>
<div class="d-flex">
<v-col cols="4">
  <v-card id="data-list">
    <h3 class="titleS">So'rovlar</h3>
    <!-- buttons -->
    <v-row
      align="center"
      justify="space-around"
    > 
      <v-col cols="6">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="requestButton"
          @click="openRequestForm()"
        >
            +So'rov qo'shing 
        </v-btn>
      </v-col>  
    </v-row> 

    <v-data-table
      v-model="requestSelectedTableData"
      :headers="requestTableColumns"
      :items="requestState.requestRows"
      :options.sync="requestOptions"
      :server-items-length="requestState.requestTotal"
      :loading="requestLoading"
      :items-per-page="requestOptions.itemsPerPage"
      :footer-props="requestFooterProps"
      class="text-no-wrap"
    >
      <template slot="item.index" scope="props">
        {{ props.index + 1 + (requestOptions.page - 1) * requestOptions.itemsPerPage }}
      </template>

      <!-- total -->
      <template #[`item.requestTotal`]="{ item }"> ${{ item.reuestTotal }}</template>

      <template late #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="requestConfirmDelete(item.id)">
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
              <v-btn icon small v-bind="attrs" v-on="on" @click="openRequestForm(item.id)">
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

    <!-- table -->
    <v-row>
      <v-col class="submit_btn">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="btn primary" 
          @click="openForm()"
        >
          Qo'shish
        </v-btn>
      </v-col>
    </v-row>
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
    <request-form
      ref="requestForm"
      v-on:notify="notify= { type: $event.type, text: $event.text, time: Date.now() }"
    />   
  </v-card>
</v-col>



<v-col cols="4">
  <v-card id="data-list-second">
    <h3 class="titleK">Kutish</h3>

    <!-- button -->
    <v-row
      align="center"
      justify="space-around"
    > 
      <v-col cols="6">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="button"
          @click="openSecondForm()"
        >
            +So'rov qo'shing 
        </v-btn>
      </v-col>  
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="btn primary" 
          @click="openSecondForm()"
        >
          Qo'shish
        </v-btn>
      </v-col>
    </v-row>  

    <!-- table -->
    <v-data-table
      v-model="secondSelectedTableData"
      :headers="secondTableColumns"
      :items="state.secondRows"
      :options.sync="secondOptions"
      :server-items-length="state.secondTotal"
      :loading="secondLoading"
      :items-per-page="secondOptions.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
    >

    <template slot="item.index" scope="props">
        {{ props.index + 1 + (secondOptions.page - 1) * secondOptions.itemsPerPage }}
      </template>

    <!-- total -->
      <template #[`item.secondTotal`]="{ item }"> ${{ item.secondTotal }}</template>
    </v-data-table>

    <template late #[`item.secondActions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="confirmSecondDelete(item.id)">
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

      <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>

    <dialog-confirm ref="dialogConfirm" />

    <lead-second-form
      ref="leadSecondForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
    
    <second-request-form
      ref="secondRequestForm"
      v-on:notify="notify= { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</v-col>

<v-col cols="4">
  <v-card id="data-list-third">
    <h3 class="titleK">To'plam</h3>

    <!-- button -->
    <v-row
      align="center"
      justify="space-around"
    > 
      <v-col cols="6">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="button"
          @click="openThirdRequestForm()"
        >
            +So'rov qo'shing 
        </v-btn>
      </v-col>  
      <v-spacer></v-spacer>
      <v-col cols="6">
        <v-btn 
          v-if="$can('create', 'Lead')" 
          x-small 
          class="btn primary" 
          @click="openThirdForm()"
        >
          Qo'shish
        </v-btn>
      </v-col>
    </v-row>

    <!-- table -->
    <v-data-table
      v-model="thirdSelectedTableData"
      :headers="thirdTableColumns"
      :items="thirdState.thirdRows"
      :options.sync="thirdOptions"
      :server-items-length="thirdState.thirdTotal"
      :loading="thirdLoading"
      :items-per-page="thirdOptions.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
    >

    <template slot="item.index" scope="props">
        {{ props.index + 1 + (thirdOptions.page - 1) * thirdOptions.itemsPerPage }}
      </template>

    <!-- total -->
      <template #[`item.thirdTotal`]="{ item }"> ${{ item.total }}</template>
    </v-data-table>

    <template late #[`item.thirdActions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom v-if="$can('delete', 'Lead')">
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="confirmThirdDelete(item.id)">
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

      <template #[`item.amount`]="{ item }"> {{ item.amount | summa }}</template>

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>

    <dialog-confirm ref="dialogConfirm" />

    <lead-third-form
      ref="leadThirdForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
    <third-request-form
      ref="thirdRequestForm"
      v-on:notify="notify= { type: $event.type, text: $event.text, time: Date.now() }"
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
import LeadStoreModule from './storeModule/LeadStoreModule'
import RequestStoreModule from './storeModule/RequestStoreModule'

// composition function
import useLeadList from './useLeadList'
import useRequestList from './request/useRequestList'
import useLeadSecondList from './useLeadSecondList'
import useLeadThirdList from './useLeadThirdList'
import LeadForm from './LeadForm'
import LeadSecondForm from './LeadSecondForm.vue'
import LeadThirdForm from './LeadThirdForm.vue'
import RequestForm from './request/RequestForm.vue'
import SecondRequestForm from './request/SecondRequestForm.vue'
import ThirdRequestForm from './request/ThirdRequestForm.vue'
import DialogConfirm from '../components/DialogConfirm.vue'

const MODULE_NAME = 'lead'
const MODULE_NAME2 = 'request'
const MODULE_NAME4 = 'leadThird'

export default {
  components: {
    LeadForm,
    RequestForm,
    SecondRequestForm,
    ThirdRequestForm,
    LeadSecondForm,
    LeadThirdForm,
    DialogConfirm,
  },
  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    summa: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }

    if (!store.hasModule(MODULE_NAME4)) {
      store.registerModule(MODULE_NAME4, LeadStoreModule)
    }

    if (!store.hasModule(MODULE_NAME2)) {
      store.registerModule(MODULE_NAME2, RequestStoreModule)
    }
    // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])
    const thirdState = ref(store.state[MODULE_NAME4])
    const requestState = ref(store.state[MODULE_NAME2])

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
      requestTableColumns,
      requestDeleteRow,

      requestOptions,
      requestLoading,
      requestSelectedTableData,
    } = useRequestList(MODULE_NAME2)

    const { secondSelectedTableData, secondTableColumns, secondOptions, secondLoading } = useLeadSecondList(MODULE_NAME)

    const { thirdSelectedTableData, thirdTableColumns, thirdOptions, thirdLoading } = useLeadThirdList(MODULE_NAME4)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const requestFooterProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const secondActions = ['Delete', 'Edit']
    const thirdActions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const selectedSecondAction = ref('')
    const selectedThirdAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]
    const actionSecondOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]
    const actionThirdOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const leadForm = ref(null)
    const openForm = id => {
      leadForm.value.open(id)
    }
    const leadThirdForm = ref(null)
    const openThirdForm = id => {
      leadThirdForm.value.open(id)
    }
    const leadSecondForm = ref(null)
    const openSecondForm = id => {
      leadSecondForm.value.open(id)
    }

    //RequestForm
    const requestForm = ref(null)
    const openRequestForm = id => {
      requestForm.value.open(id)
    }
    const secondRequestForm = ref(null)
    const openSecondRequestForm = id => {
      secondRequestForm.value.open(id)
    }
    const thirdRequestForm = ref(null)
    const openThirdRequestForm = id => {
      thirdRequestForm.value.open(id)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
      console.log(deleteRow())
    }
    const requestConfirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => requestDeleteRow(id))
        .catch(() => {})
    }
    const confirmSecondDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteSecondRow(id))
        .catch(() => {})
    }
    const confirmThirdDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteThirdRow(id))
        .catch(() => {})
    }

    const BASE_URL = envParams.BASE_URL

    // Return
    return {
      BASE_URL,
      state,
      requestState,
      thirdState,

      tableColumns,
      requestTableColumns,
      secondTableColumns,
      thirdTableColumns,
      searchQuery,
      options,
      requestOptions,
      secondOptions,
      thirdOptions,
      loading,
      requestLoading,
      secondLoading,
      thirdLoading,
      notify,
      selectedTableData,
      requestSelectedTableData,
      secondSelectedTableData,
      thirdSelectedTableData,
      filter,

      actions,
      secondActions,
      thirdActions,
      actionOptions,
      actionSecondOptions,
      actionThirdOptions,
      selectedAction,
      selectedSecondAction,
      selectedThirdAction,
      footerProps,
      requestFooterProps,

      dialogConfirm,
      confirmDelete,
      requestConfirmDelete,
      confirmSecondDelete,
      confirmThirdDelete,

      leadForm,
      openForm,

      requestForm,
      openRequestForm,

      secondRequestForm,
      openSecondRequestForm,

      thirdRequestForm,
      openThirdForm,

      leadSecondForm,
      openThirdRequestForm,
      openSecondForm,

      leadThirdForm,
      openThirdForm,

      MODULE_NAME,
      MODULE_NAME2,
      MODULE_NAME4,

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
  margin-left: 58%;
}
.requestButton {
  margin-left: 80%;
}
.titleS {
  margin-left: 38%;
  padding-top: 3%;
}
.titleK {
  margin-left: 38%;
  padding-top: 3%;
}
.submit_btn {
  margin-left: 40%;
}
</style>
