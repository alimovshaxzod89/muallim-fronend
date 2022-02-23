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

				<draggable
					class="my-draggable my-task-defaults"
					:list="taskGroup"
					:animation="200"
					ghost-class="ghost-card"
					group="tasks"
					@change="taskChange()"
				>
					<lead-task-card
						v-for="task in appealReturn()"
						:key="task.id"
						:task="task"
					></lead-task-card>
				</draggable>

				<lead-filter-card
					v-for="column in state.rows.filter(el => el.position === 1)"
					:columns="column"
					:key="column.id"
				/>
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

import { ref, onBeforeMount, onUnmounted } from '@vue/composition-api'
import draggable from 'vuedraggable'
import store from '@/store'

// store module
import LeadStoreModule from './LeadStoreModule'
import AppealStoreModule from './appeal/AppealStoreModule'

// composition function
import useLeadList from './useLeadList'
import LeadFilterCard from './LeadFilterCard'
import LeadTaskCard from './LeadTaskCard'

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
    if (!store.hasModule('appeal')) {
      store.registerModule('appeal', AppealStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
      if (store.hasModule('appeal')) store.unregisterModule('appeal')
    })

    const appealFetchDatas = () => {
      store
        .dispatch(`appeal/fetchDatas`)
        .then(() => {})
        .catch(error => {
          console.log(error)
        })
    }
    onBeforeMount(() => {
      appealFetchDatas()
    })

    const { fetchDatas, deleteRow, loading, notify, selectedTableData } = useLeadList(MODULE_NAME)

    // Store state
    const state = ref(store.state[MODULE_NAME])
    const appealState = ref(store.state.appeal)
    const taskGroup = ref(null)

    const appealReturn = () => appealState.value.rows.filter(el => el.lead_id === null).reverse()

    const taskChange = evt => {
      console.log(evt)
    }

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

    // Return
    return {
      MODULE_NAME,
      BASE_URL,
      state,
      appealState,
      taskGroup,
      appealReturn,
      taskChange,

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

<style lang="scss">
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
.my-task-card {
  position: relative;
  width: 95%;
  min-height: 80px;
  margin: 20px auto 15px auto;
  padding-top: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fbfbfb;
  .task-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.my-task-defaults {
  margin-bottom: 30px;
  .my-task-card {
    background-color: #ededed !important;
  }
}
</style>