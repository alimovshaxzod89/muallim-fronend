<template>
  <v-card-text class="my-task-card cursor-move pb-0">
		<v-menu bottom offset-y>
			<template #activator="{ on, attrs }">
				<v-btn class="task-btn" v-bind="attrs" v-on="on" text small fab>
					<v-icon size="18">{{ icons.mdiMenu }}</v-icon>
				</v-btn>
			</template>
			<v-list class="my-list">
				<v-list-item class="pa-0">
					<v-btn text @click="openAppealForm(task.id)">
						<v-icon class="mr-3" size="18">{{ icons.mdiPencilOutline }}</v-icon>
						Tahrirlash
					</v-btn>
				</v-list-item>
				<v-list-item class="pa-0">
					<v-btn text @click="removeCard('appeal', task.id)">
						<v-icon class="mr-3" color="error" size="18">{{ icons.mdiDeleteOutline }}</v-icon>
						O'chirish
					</v-btn>
				</v-list-item>
			</v-list>
		</v-menu>
		<div class="my-task-content">
			<strong>{{ task.full_name }}</strong>
			<span>{{ task.subject ? task.subject.name : null }}</span>
			<span class="my-task-phone">{{ task.phone }}</span>
			<span class="my-task-date">{{ task.created_at | date }}</span>
		</div>
	</v-card-text>
</template>

<script>
import moment from 'moment'
import { mdiMenu, mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

moment.locale('uz-latn')

export default {
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
    removeCard: {
      type: Function,
    },
    openAppealForm: {
      type: Function,
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
  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
  },
}
</script>

<style scoped lang="scss">
.my-list {
  .v-btn {
    width: 100%;
    justify-content: flex-start;
  }
}
.my-task-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 80px;
  strong {
    font-size: 15px;
  }
}
.my-task-phone {
  font-size: 13px;
  color: rgb(29, 117, 248);
}
.my-task-date {
  position: absolute;
  right: 15px;
  bottom: 5px;
  font-size: 10px;
}
</style>