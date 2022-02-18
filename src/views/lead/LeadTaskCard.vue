<template>
  <v-card-text class="my-task-card cursor-move">

		<!-- <v-menu
      v-for="menu in menusVariant"
      :key="menu"
      offset-y
    >
      <template #activator="{ on, attrs }">
        <v-btn
          :color="menu"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ menu }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu> -->
		<v-menu bottom offset-y>
			<template #activator="{ on, attrs }">
				<v-btn class="task-btn" v-bind="attrs" v-on="on" text small fab>
					<v-icon size="18">{{ icons.mdiMenu }}</v-icon>
				</v-btn>
			</template>
			<v-list>
				<v-list-item>
					<v-btn text>Tahrirlash</v-btn>
				</v-list-item>
				<v-list-item>
					<v-btn text>O'chirish</v-btn>
				</v-list-item>
			</v-list>
		</v-menu>
		<span>{{ task.name }}</span>
	</v-card-text>
</template>

<script>
import { mdiMenu } from '@mdi/js'

export default {
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const items = [{ title: 'Option 1' }, { title: 'Option 2' }, { title: 'Option 3' }]

    return {
      items,

      icons: {
        mdiMenu,
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
  .task-btn {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>