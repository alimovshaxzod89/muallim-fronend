<template>
  <div id="data-list">

		<v-row>
			<v-col cols="4" v-for="column in columns" :key="column.title">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>{{column.name}}</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn class="mr-5" color="secondary" outlined title="Yangi so'rov qo'shish" v-if="column.position === 1" @click="openAppealForm()">
								<v-icon size="24">{{ icons.mdiFileAccountOutline }} </v-icon>
							</v-btn>
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openForm(column.position)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>
				</v-card>

					<v-card class="my-cart-filter" v-for="(group, index) in column.groups" :key="group + index">
						<v-card-text>
							<h3 class="my-group-title">{{group.name}}
								<div v-if="column.position === 3">
									● {{group.subjects.name}}
									● {{group.teachers.full_name}}
									● {{group.rooms.name}}
									● {{group.time_begin}}
								</div>
							</h3>
						</v-card-text>
						<draggable
							:list="column.tasks"
							:animation="200"
							ghost-class="ghost-card"
							group="tasks"
						>
							<lead-task-card
								v-for="task in group.tasks"
								:key="task.id"
								:task="task"
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
    const openForm = position => {
      if (position === 3) {
        leadGroupForm.value.open()
      } else {
        leadSimpleForm.value.open()
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
        name: 'Lidlar',
        groups: {
          0: {
            name: 'Erkaklar',
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
            name: 'Ayollar',
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
        name: 'Kutuv',
        groups: {
          0: {
            name: 'Rus tiliga',
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
            name: 'Ingiliz tiliga',
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
        position: 3,
        name: 'Guruh',
        groups: {
          0: {
            name: "1-bo'lim",
            subjects: {
              name: 'Ingliz tili',
            },
            teachers: {
              full_name: 'Olimov Qosim',
            },
            rooms: {
              name: 'G-14',
            },
            week_days: 1,
            time_begin: '16:00',
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
            name: "2-bo'lim",
            subjects: {
              name: 'Rus tili',
            },
            teachers: {
              full_name: 'Yuldashov Bektosh',
            },
            rooms: {
              name: 'G-5',
            },
            week_days: 1,
            time_begin: '12:00',
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
  margin-bottom: 40px;
}
.my-draggable-card {
  margin-top: 20px;
  .v-card__title {
    font-size: 16px;
  }
}
.my-cart-filter {
  margin-bottom: 20px;
  padding-bottom: 5px;
}
.my-group-title {
  display: flex;
  div {
    margin-left: 5px;
  }
}
</style>
