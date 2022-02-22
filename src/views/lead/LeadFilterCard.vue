<template>
	<div>
		<v-card class="my-cart-filter">
			<v-card-text class="d-flex align-center justify-space-between">
				<h3 class="my-group-title">{{columns.name}}
					<div v-if="columns.position === 3">
						<!-- ● {{columns.subjects.name}}
						● {{columns.teachers.full_name}}
						● {{columns.rooms.name}}
						● {{columns.time_begin}} -->
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
			<!-- <draggable
				class="my-draggable"
				:list="columns.tasks"
				:animation="200"
				ghost-class="ghost-card"
				group="tasks"
			>
				<lead-task-card
					v-for="task in group.tasks"
					:key="task.id"
					:task="task"
				></lead-task-card>
			</draggable> -->
		</v-card>
	</div>
</template>

<script>
import { ref } from '@vue/composition-api'
import axios from '@axios'
import { mdiMenu, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

import LeadTaskCard from './LeadTaskCard'

export default {
  components: {
    LeadTaskCard,
  },
  props: {
    columns: {
      type: Object,
    },
  },
  setup() {
    // API Loads
    const data = ref(null)
    const loadAppeals = () => {
      axios.get('api/appeals').then(response => {
        if (response.data.success) {
          data.value = response.data.data
        }
      })
    }

    // Loads
    loadAppeals()
    console.log(data)

    return {
      data,

      icons: {
        mdiMenu,
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