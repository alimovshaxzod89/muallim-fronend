<template>
  <v-card class="my-cart-filter" v-for="(group, index) in column.groups" :key="group + index">
		<v-card-text class="d-flex align-center justify-space-between">
			<h3 class="my-group-title">{{group.name}}
				<div v-if="column.position === 3">
					● {{group.subjects.name}}
					● {{group.teachers.full_name}}
					● {{group.rooms.name}}
					● {{group.time_begin}}
				</div>
			</h3>
			<v-menu bottom offset-y>
				<template #activator="{ on, attrs }">
					<v-btn class="task-btn" v-bind="attrs" v-on="on" text small fab>
						<v-icon size="24">{{ icons.mdiMenu }}</v-icon>
					</v-btn>
				</template>
				<v-list class="my-list">
					<v-list-item class="pa-0">
						<v-btn text><v-icon class="mr-3" size="18">{{ icons.mdiPencilOutline }}</v-icon> Tahrirlash</v-btn>
					</v-list-item>
					<v-list-item class="pa-0">
						<v-btn text><v-icon class="mr-3" color="error" size="18">{{ icons.mdiDeleteOutline }}</v-icon> O'chirish</v-btn>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-card-text>
		<draggable
			class="my-draggable"
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
</template>

<script>
import axios from '@axios'

import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

export default {
  setup() {
    const loadLeads = () => {
      axios.get('api/leads').then(response => {
        if (response.data.sucess) {
          console.log(response)
        }
      })
    }
    loadLeads()

    return {
      icons: {
        mdiDeleteOutline,
        mdiPencilOutline,
      },
    }
  },
}
</script>

<style scoped lang="scss">
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