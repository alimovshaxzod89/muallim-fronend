<template>
  <div id="data-list">
    <!-- <v-card-text class="d-flex align-center flex-wrap">
      <v-spacer></v-spacer>
      <v-btn class="primary" @click="openForm()">Qo'shish</v-btn>
    </v-card-text> -->

		<v-row>
			<v-col cols="4">
				<v-card >
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>So'rovlar</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn class="mr-5" color="primary" title="Yangi so'rov qo'shish" @click="openAppealForm()">
								<v-icon size="25">{{ icons.mdiFileAccountOutline }} </v-icon>
							</v-btn>
							<v-btn text small fab title="Yangi bo'lim yaratish">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>

					<draggable class="list-group" :list="list1" group="people" @change="log">
						<div
							class="list-group-item"
							v-for="(element, index) in list1"
							:key="element.name"
						>
							{{ element.name }} {{ index }}
						</div>
					</draggable>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card>
					<v-card-title>Kutish</v-card-title>

					<draggable class="list-group" :list="list2" group="people" @change="log">
						<div
							class="list-group-item"
							v-for="(element, index) in list2"
							:key="element.name"
						>
							{{ element.name }} {{ index }}
						</div>
					</draggable>|
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card>
					<v-card-title>Guruhlar</v-card-title>
				</v-card>
			</v-col>
		</v-row>

    <lead-form
      ref="leadForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
		<appeal-form ref="appealForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<dialog-confirm ref="dialogConfirm" />

		<!-- DRAGGABLE -->
		<!-- <rawDisplayer class="col-3" :value="list1" title="List 1" /> -->
    <!-- <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </div>
</template>

<script>
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus, mdiFileAccountOutline } from '@mdi/js'

import { ref } from '@vue/composition-api'
import store from '@/store'

import draggable from 'vuedraggable'

// store module
import LeadStoreModule from './LeadStoreModule'

// composition function
import useLeadList from './useLeadList'
import LeadForm from './LeadForm'

import AppealForm from './appeal/AppealForm'
import DialogConfirm from '@/views/components/DialogConfirm'

const MODULE_NAME = 'lead'
import envParams from '@envParams'

export default {
  components: {
    draggable,
    LeadForm,
    AppealForm,
    DialogConfirm,
  },
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }

    const BASE_URL = envParams.BASE_URL
    // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      searchQuery,
      // tableColumns,
      deleteRow,

      options,
      loading,
      notify,
      selectedTableData,
    } = useLeadList(MODULE_NAME)

    //interface additional elements
    // const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    // const actions = ['Delete', 'Edit']
    // const selectedAction = ref('')
    // const actionOptions = [
    //   { title: 'Delete', icon: mdiDeleteOutline },
    //   { title: 'Edit', icon: mdiPencilOutline },
    // ]

    // Draggable data
    const list1 = ref([
      { name: 'John', id: 1 },
      { name: 'Joao', id: 2 },
      { name: 'Jean', id: 3 },
      { name: 'Gerard', id: 4 },
    ])
    const list2 = ref([
      { name: 'Juan', id: 5 },
      { name: 'Edgard', id: 6 },
      { name: 'Johnson', id: 7 },
    ])

    // Form
    const leadForm = ref(null)
    const openForm = id => {
      leadForm.value.open(id)
    }

    // Appeal form
    const appealForm = ref(null)
    const openAppealForm = id => {
      appealForm.value.open(id)
    }

    // Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

    // Return
    return {
      BASE_URL,
      state,

      // tableColumns,
      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,

      // actions,
      // actionOptions,
      // selectedAction,
      // footerProps,

      dialogConfirm,
      confirmDelete,

      leadForm,
      openForm,
      appealForm,
      openAppealForm,

      // Draggable data
      list1,
      list2,

      MODULE_NAME,

      icons: {
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiPlus,
        mdiFileAccountOutline,
      },
    }
  },
  watch: {
    ['notify']() {
      this.$toast[this.notify.type](this.notify.text)
    },
  },
  methods: {
    // add: function () {
    //   this.list.push({ name: 'Juan' })
    // },
    // replace: function () {
    //   this.list = [{ name: 'Edgard' }]
    // },
    // clone: function (el) {
    //   return {
    //     name: el.name + ' cloned',
    //   }
    // },
    log: function (evt) {
      // window.console.log(evt)
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

.my-top {
  border-bottom: 1px solid #dfdfdf;
}
</style>
