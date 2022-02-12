<template>
  <div id="data-list">

		<v-row>
			<v-col cols="4">
				<v-card class="my-draggable-card-main">
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>So'rovlar</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn class="mr-5" color="secondary" outlined title="Yangi so'rov qo'shish" @click="openAppealForm()">
								<v-icon size="24">{{ icons.mdiFileAccountOutline }} </v-icon>
							</v-btn>
							<v-btn text small fab title="Yangi bo'lim yaratish" @click="openSimpleForm(1)">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>

					<div>
						<!-- <button type="button" @click="newGroup()" class="btn btn-sm btn-info">New Group</button> -->
						<div v-for="(group, groupIdx) in groups" :key="group.id">
							<h3>{{group.title}}</h3>
							<button type="button" @click="newDraggableItem(groupIdx)">New Item</button>
							<draggable tag="ul" :list="group.items" class="list-group" handle=".handle" v-bind="dragOptions" @start="drag = true" @end="drag = false">
								<transition-group type="transition" :name="!drag ? 'flip-list' + group.id : null">
									<li class="list-group-item handle" v-for="(item, itemIdx) in group.items" :key="'p'+item.id">
										{{item.description}}
										<!-- <i class="fa fa-times close" @click="removeAt(item.id)"></i> -->
									</li>
								</transition-group>
							</draggable>
						</div>
					</div>


					<!-- <draggable
						class="list-group"
						group="people"
						tag="ul"
						v-model="list1"
						v-bind="dragOptions()"
						@start="drag = true"
						@end="drag = false"
					>
						<transition-group type="transition" :name="!drag ? 'flip-list' : null">
							<li
								class="list-group-item"
								v-for="element in list1"
								:key="element.name"
							>
								<i
									:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
									@click="element.fixed = !element.fixed"
									aria-hidden="true"
								></i>
								{{ element.name }}
							</li>
						</transition-group>
					</draggable> -->
				</v-card>

				<!-- <v-card class="my-draggable-card" v-if="leadPositions" v-for="lead of leadPositions" :key="lead.id">
					<v-card-title class="my-top">{{lead.name}}</v-card-title>
					<draggable
						class="list-group"
						group="people"
						tag="ul"
						v-model="list4"
						v-bind="dragOptions()"
						@start="drag = true"
						@end="drag = false"
					>
						<transition-group type="transition" :name="!drag ? 'flip-list' : null">
							<li
								class="list-group-item"
								v-for="element in list4"
								:key="element.name"
							>
								<i
									:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
									@click="element.fixed = !element.fixed"
									aria-hidden="true"
								></i>
								{{ element.name }}
							</li>
						</transition-group>
					</draggable>
				</v-card> -->
			</v-col>
			<!-- <v-col cols="4">
				<v-card >
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>Kutish</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn text small fab title="Yangi bo'lim yaratish">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>

					<draggable
						class="list-group"
						group="people"
						tag="ul"
						v-model="list2"
						v-bind="dragOptions()"
						@start="drag = true"
						@end="drag = false"
					>
						<transition-group type="transition" :name="!drag ? 'flip-list' : null">
							<li
								class="list-group-item"
								v-for="element in list2"
								:key="element.name"
							>
								<i
									:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
									@click="element.fixed = !element.fixed"
									aria-hidden="true"
								></i>
								{{ element.name }}
							</li>
						</transition-group>
					</draggable>
				</v-card>
			</v-col>
			<v-col cols="4">
				<v-card >
					<div class="my-top d-flex align-center mb-5">
						<v-card-title>Guruhlar</v-card-title>
						<v-spacer></v-spacer>
						<v-list class="mr-5">
							<v-btn text small fab title="Yangi bo'lim yaratish">
								<v-icon>{{ icons.mdiPlus }}</v-icon>
							</v-btn>
						</v-list>
					</div>

					<draggable
						class="list-group"
						group="people"
						tag="ul"
						v-model="list3"
						v-bind="dragOptions()"
						@start="drag = true"
						@end="drag = false"
					>
						<transition-group type="transition" :name="!drag ? 'flip-list' : null">
							<li
								class="list-group-item"
								v-for="element in list3"
								:key="element.name"
							>
								<i
									:class="element.fixed ? 'fa fa-anchor' : 'glyphicon glyphicon-pushpin'"
									@click="element.fixed = !element.fixed"
									aria-hidden="true"
								></i>
								{{ element.name }}
							</li>
						</transition-group>
					</draggable>
				</v-card>
			</v-col> -->
		</v-row>

    <lead-simple-form
      ref="leadSimpleForm"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
		<appeal-form ref="appealForm" v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }" />
		<dialog-confirm ref="dialogConfirm" />
  </div>
</template>

<script>
import { mdiDeleteOutline, mdiPencilOutline, mdiPlus, mdiFileAccountOutline } from '@mdi/js'

import { ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'

import draggable from 'vuedraggable'

// store module
import LeadStoreModule from './LeadStoreModule'

// composition function
import useLeadList from './useLeadList'
import LeadSimpleForm from './LeadSimpleForm'

import AppealForm from './appeal/AppealForm'
import DialogConfirm from '@/views/components/DialogConfirm'

const MODULE_NAME = 'leads'
import envParams from '@envParams'

export default {
  components: {
    draggable,
    LeadSimpleForm,
    AppealForm,
    DialogConfirm,
  },
  setup() {
    const BASE_URL = envParams.BASE_URL

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }
    // // UnRegister on leave
    // onUnmounted(() => {
    //   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    // })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const { searchQuery, deleteRow, options, loading, notify, selectedTableData } = useLeadList(MODULE_NAME)

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
    const list3 = ref([
      { name: 'Yodgor', id: 8 },
      { name: 'Mirza', id: 9 },
      { name: 'Salimboy', id: 10 },
    ])
    const list4 = ref([{ name: 'Juan', id: 11 }])
    const drag = ref(false)
    const groups = ref([
      {
        id: groupId,
        title: 'Asosiy',
        items: [],
      },
    ])
    let groupId = ref(1)
    let itemId = ref(0)
    const removeAt = itemIdRemove => {
      let canBreak = false
      groups.value.forEach((value, groupIndex) => {
        if (canBreak) {
          return true
        }

        value.items.forEach((value, itemIndex) => {
          if (value.id === itemIdRemove) {
            canBreak = true
            groups.value[groupIndex].items.splice(itemIndex, 1)
            return true
          }
        })
      })
    }
    const newGroup = () => {
      groups.value.push({
        id: ++groupId.value,
        title: 'Yangi gurux',
        items: [],
      })
    }
    const newDraggableItem = groupIdx => {
      groups.value[groupIdx].items.push({
        id: ++itemId.value,
        description: 'Yangi qiymat',
      })
    }

    // Form
    const leadSimpleForm = ref(null)
    const openSimpleForm = id => {
      leadSimpleForm.value.open(id)
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

    const selectDatas = ref({
      leads: null,
    })
    let leadPositions = ref(null)
    const loadLeads = () => {
      axios
        .get('/api/leads', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectDatas.value.leads = response.data.data
            leadPositions.value = response.data.data.filter(el => el.position === true)
          }
        })
        .catch(error => console.log(error))
    }

    // Return
    return {
      BASE_URL,
      state,

      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,

      dialogConfirm,
      confirmDelete,

      leadSimpleForm,
      openSimpleForm,
      appealForm,
      openAppealForm,

      // Draggable data
      groups,
      list1,
      list2,
      list3,
      list4,
      drag,
      groupId,
      itemId,
      removeAt,
      newGroup,
      newDraggableItem,

      leadPositions,
      selectDatas,
      loadLeads,

      MODULE_NAME,

      icons: {
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiPlus,
        mdiFileAccountOutline,
      },
    }
  },
  created() {
    this.loadLeads()
  },
  computed: {
    dragOptions: () => {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      }
    },
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
.button {
  margin-top: 35px;
}
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
