<template>
  <v-card-text class="my-task-card cursor-move">
		<v-menu bottom offset-y>
			<template #activator="{ on, attrs }">
				<v-btn class="task-btn" v-bind="attrs" v-on="on" text small fab>
					<v-icon size="18">{{ icons.mdiMenu }}</v-icon>
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
		<span>{{ task.name }}</span>
	</v-card-text>
</template>

<script>
import { mdiMenu, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

export default {
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {
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
.my-task-card {
  position: relative;
  width: 95%;
  min-height: 80px;
  margin: 20px auto 15px auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fbfbfb;
  .task-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.my-list {
  .v-btn {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>