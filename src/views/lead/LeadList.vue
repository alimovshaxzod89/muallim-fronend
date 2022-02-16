<template>
  <div id="data-list">

		<v-row>
			<v-col cols="4" v-for="column in columns" :key="column.title">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title> {{column.title}} </v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn class="mr-5" color="secondary" outlined title="Yangi so'rov qo'shish" v-if="column.position === 1" @click="openAppealForm()">
								<v-icon size="24">{{ icons.mdiFileAccountOutline }} </v-icon>
							</v-btn>
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openForm(column.modal)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>

					<draggable
						v-for="(group, index) in column.groups"
						:key="group + index"
						:list="column.tasks"
						:animation="200"
						ghost-class="ghost-card"
						group="tasks"
					>
					<strong>{{group.title}}</strong>
						<lead-task-card
							v-for="task in group.tasks"
							:key="task.id"
							:task="task"
							class="mt-3 cursor-move"
						></lead-task-card>
					</draggable>
				</v-card>
			</v-col>
		</v-row>

    <lead-simple-form ref="leadSimpleForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
    <lead-group-form ref="leadGroupForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<appeal-form ref="appealForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<dialog-confirm ref="dialogConfirm" />
  </div>
</template>

<script>
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus, mdiFileAccountOutline } from '@mdi/js'

import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'

import draggable from 'vuedraggable'

// store module
import LeadStoreModule from './LeadStoreModule'

// composition function
import useLeadList from './useLeadList'
import LeadTaskCard from './LeadTaskCard'

import LeadSimpleForm from './LeadSimpleForm'
import LeadGroupForm from './LeadGroupForm'
import AppealForm from './appeal/AppealForm'
import DialogConfirm from '@/views/components/DialogConfirm'

const MODULE_NAME = 'leads'
import envParams from '@envParams'

export default {
  components: {
    draggable,
    LeadTaskCard,
    LeadSimpleForm,
    LeadGroupForm,
    AppealForm,
    DialogConfirm,
  },
  setup() {
    const BASE_URL = envParams.BASE_URL

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    // Store state
    const state = ref(store.state[MODULE_NAME])

    // Logics
    const { fetchDatas, deleteRow, loading, notify, selectedTableData } = useLeadList(MODULE_NAME)

    // Form
    const leadSimpleForm = ref(null)
    const leadGroupForm = ref(null)
    const openForm = modal => {
      if (modal === 1) {
        leadSimpleForm.value.open()
      }
      if (modal === 2) {
        leadGroupForm.value.open()
      }
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

    // Draggable data
    const columns = ref([
      {
        position: 1,
        title: 'Lidlar',
        modal: 1,
        groups: {
          0: {
            title: 'Erkaklar',
            tasks: [
              {
                id: 1,
                name: 'Add discount code to checkout page',
              },
              {
                id: 2,
                name: 'Provide documentation on integrations',
              },
              {
                id: 3,
                name: 'Design shopping cart dropdown',
              },
              {
                id: 4,
                name: 'Add discount code to checkout page',
              },
              {
                id: 5,
                name: 'Test checkout flow',
              },
            ],
          },
          1: {
            title: 'Ayollar',
            tasks: [
              {
                id: 14,
                name: 'Olimlar',
              },
              {
                id: 15,
                name: 'Zakiylar',
              },
              {
                id: 16,
                name: 'Dizaynerlar top',
              },
              {
                id: 17,
                name: 'Qurtaboy',
              },
              {
                id: 18,
                name: 'Ilon Mask',
              },
            ],
          },
        },
      },
      {
        position: 2,
        title: 'Kutish',
        modal: 1,
        tasks: [
          {
            id: 6,
            name: 'Design shopping cart dropdown',
          },
          {
            id: 7,
            name: 'Add discount code to checkout page',
          },
          {
            id: 8,
            name: 'Provide documentation on integrations',
          },
        ],
      },
      {
        position: 3,
        title: 'Guruhlar',
        modal: 2,
        tasks: [
          {
            id: 9,
            name: 'Provide documentation on integrations',
          },
          {
            id: 10,
            name: 'Design shopping cart dropdown',
          },
          {
            id: 11,
            name: 'Add discount code to checkout page',
          },
          {
            id: 12,
            name: 'Design shopping cart dropdown',
          },
          {
            id: 13,
            name: 'Add discount code to checkout page',
          },
        ],
      },
    ])

    // onMounted(() => {
    //   fetchDatas(true)
    // 	leadPositions.value = state.value.rows.filter(el => el.position === true)
    // })

    // Return
    return {
      MODULE_NAME,
      BASE_URL,
      state,

      fetchDatas,
      loading,
      notify,
      selectedTableData,

      dialogConfirm,
      confirmDelete,

      leadSimpleForm,
      leadGroupForm,
      openForm,
      appealForm,
      openAppealForm,

      // Draggable data
      columns,

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

// Draggabel
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.my-draggable-card-main {
  margin-bottom: 50px;
}
.my-draggable-card {
  margin-top: 20px;
  .v-card__title {
    font-size: 16px;
  }
}
</style>
