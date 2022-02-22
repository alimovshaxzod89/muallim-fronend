<template>
  <div id="data-list">
		<v-row>
			<v-col cols="4">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>Lidlar</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn class="mr-5" color="secondary" outlined title="Yangi so'rov qo'shish" @click="openAppealForm()">
								<v-icon size="24">{{ icons.mdiFileAccountOutline }}</v-icon>
							</v-btn>
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openForm(1)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>
				</v-card>

				<!-- <draggable
					class="my-draggable"
					:list="data"
					:animation="200"
					ghost-class="ghost-card"
					group="tasks"
				>
					<lead-task-card
						v-for="task in data"
						:key="task.id"
						:task="task"
					></lead-task-card>
				</draggable> -->

				<lead-filter-card  v-for="column in state.rows.filter(el => el.position === 1)" :columns="column" :key="column.id" />
			</v-col>

			<v-col cols="4">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>Kutish</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openForm(2)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>
				</v-card>

				<lead-filter-card  v-for="column in state.rows.filter(el => el.position === 2)" :columns="column" :key="column.id" />
			</v-col>

			<v-col cols="4">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>Guruhlar</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openForm(3)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>
				</v-card>

				<lead-filter-card  v-for="column in state.rows.filter(el => el.position === 3)" :columns="column" :key="column.id" />
			</v-col>
		</v-row>

    <lead-simple-form ref="leadSimpleForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
    <lead-group-form ref="leadGroupForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<appeal-form ref="appealForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<dialog-confirm ref="dialogConfirm" />
  </div>
</template>

<script>
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus, mdiFileAccountOutline, mdiMenu } from '@mdi/js'

import { ref, onUnmounted } from '@vue/composition-api'
import draggable from 'vuedraggable'
import store from '@/store'

// store module
import LeadStoreModule from './LeadStoreModule'

// composition function
import useLeadList from './useLeadList'
import LeadFilterCard from './LeadFilterCard'

import LeadSimpleForm from './LeadSimpleForm'
import LeadGroupForm from './LeadGroupForm'
import AppealForm from './appeal/AppealForm'
import DialogConfirm from '@/views/components/DialogConfirm'

const MODULE_NAME = 'lead'
import envParams from '@envParams'

export default {
  components: {
    draggable,
    LeadFilterCard,
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

    const { fetchDatas, deleteRow, loading, notify, selectedTableData } = useLeadList(MODULE_NAME)

    // Store state
    const state = ref(store.state[MODULE_NAME])
    const appealState = ref(store.state['appeal'])
    console.log(appealState)

    // Form
    const leadSimpleForm = ref(null)
    const leadGroupForm = ref(null)
    const openForm = position => {
      if (position === 3) {
        leadGroupForm.value.open(position)
      } else {
        leadSimpleForm.value.open(position)
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

    const appelas = ref([
      {
        id: 1,
        lead_id: null,
        full_name: 'Bektosh Yuldashev',
        phone: '901002020',
        birth_date: null,
        gender: null,
        note: 'test',
        subject_id: null,
        days: '1',
        hours: '1',
      },
      {
        id: 5,
        lead_id: null,
        full_name: 'Elbek yuldashev',
        phone: '990336010',
        birth_date: null,
        gender: null,
        note: 'test',
        subject_id: null,
        days: '1',
        hours: '1',
      },
      {
        id: 7,
        lead_id: null,
        full_name: 'tgtgtgt',
        phone: '13123213',
        birth_date: '2022-02-08T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 1,
        days: '1997',
        hours: '1600',
      },
      {
        id: 8,
        lead_id: null,
        full_name: '123123123',
        phone: '9999999',
        birth_date: '2022-02-08T19:00:00.000000Z',
        gender: false,
        note: null,
        subject_id: 2,
        days: '1997',
        hours: '1600',
      },
      {
        id: 9,
        lead_id: null,
        full_name: 'test testov',
        phone: '901888778',
        birth_date: '2022-02-02T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 3,
        days: '1997',
        hours: '1600',
      },
      {
        id: 10,
        lead_id: null,
        full_name: 'test',
        phone: '905005050',
        birth_date: '2022-02-07T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 2,
        days: '1997',
        hours: '1600',
      },
      {
        id: 11,
        lead_id: null,
        full_name: 'test',
        phone: '988005020',
        birth_date: '2022-02-15T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 4,
        days: '1997',
        hours: '1600',
      },
      {
        id: 12,
        lead_id: null,
        full_name: 'bek yuldashev',
        phone: '990366118',
        birth_date: '2022-02-01T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 1,
        days: '1997',
        hours: '1600',
      },
      {
        id: 13,
        lead_id: null,
        full_name: 'test',
        phone: '995566556',
        birth_date: '2022-02-01T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 19,
        days: '1997',
        hours: '1600',
      },
      {
        id: 14,
        lead_id: null,
        full_name: 'Bek yuldashev',
        phone: '901002030',
        birth_date: '2022-01-31T19:00:00.000000Z',
        gender: true,
        note: null,
        subject_id: 2,
        days: '1997',
        hours: '1600',
      },
    ])

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
      appelas,

      icons: {
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiPlus,
        mdiFileAccountOutline,
        mdiMenu,
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
.my-draggable {
  min-height: 80px;
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