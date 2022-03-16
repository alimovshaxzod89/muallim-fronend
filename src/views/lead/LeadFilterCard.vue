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
							<v-btn text @click="openForm(columns.position, columns.id)">
								<v-icon class="mr-3" size="18">{{ icons.mdiPencilOutline }}</v-icon>
								Tahrirlash
							</v-btn>
						</v-list-item>
						<v-list-item class="pa-0">
							<v-btn text @click="getLink(columns.id)">
								<v-icon class="mr-3" color="info" size="18">{{ icons.mdiLinkVariant }}</v-icon>
								Linkni olish
							</v-btn>
						</v-list-item>
						<v-list-item class="pa-0">
							<v-btn text @click="removeCard('lead', columns.id)">
								<v-icon class="mr-3" color="error" size="18">{{ icons.mdiDeleteOutline }}</v-icon>
								O'chirish
							</v-btn>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-card-text>
			<draggable
				class="my-draggable"
				:list="taskGroup"
				:animation="200"
				ghost-class="ghost-card"
				group="tasks"
				:id="columns.id"
				@end="taskChange"
			>
				<lead-task-card
					v-for="task in appealReturn()"
					:key="task.id"
					:task="task"
					:removeCard="removeCard"
					:openAppealForm="openAppealForm"
				></lead-task-card>
			</draggable>
		</v-card>
	</div>
</template>

<script>
import { ref } from '@vue/composition-api'
import store from '@/store'
import draggable from 'vuedraggable'
import { mdiMenu, mdiDeleteOutline, mdiPencilOutline, mdiLinkVariant } from '@mdi/js'

import LeadTaskCard from './LeadTaskCard'

export default {
  components: {
    draggable,
    LeadTaskCard,
  },
  props: {
    columns: {
      type: Object,
    },
    openForm: {
      type: Function,
    },
    removeCard: {
      type: Function,
    },
    openAppealForm: {
      type: Function,
    },
  },
  setup(props) {
    const state = ref(store.state.appeal)
    const taskGroup = ref(null)

    const appealReturn = () => state.value.rows.filter(el => el.lead_id === props.columns.id)

    const taskChange = e => {
      const task = JSON.parse(JSON.stringify(e.item.__vue__.task))

      if (e.oldIndex !== e.newIndex || (e.from.id !== e.to.id && e.pullMode)) {
        const updatedTask = {
          lead_id: e.to.id,
          id: task.id,
          full_name: task.full_name,
          phone: task.phone,
          birth_date: task.birth_date,
          gender: task.gender,
          note: task.note,
          subject_id: task.subject_id,
          subject: task.subject,
          days: task.days,
          hours: task.hours,
        }

        store
          .dispatch(`appeal/updateRow`, updatedTask)
          .then(({ data }) => data)
          .catch(error => {
            console.log(error)
            return false
          })
      }
    }

		const getLink = id => {

			const url = `${window.location.origin}/lead-form/${id}`

			const el = document.createElement('textarea');  // Create a <textarea> element
			el.value = url;                                 // Set its value to the string that you want copied
			el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
			el.style.position = 'absolute';
			el.style.left = '-9999px';                      // Move outside the screen to make it invisible
			document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
			const selected =
				document.getSelection().rangeCount > 0        // Check if there is any content selected previously
					? document.getSelection().getRangeAt(0)     // Store selection if found
					: false;                                    // Mark as false to know no selection existed before
			el.select();                                    // Select the <textarea> content
			document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
			document.body.removeChild(el);                  // Remove the <textarea> element
			if (selected) {                                 // If a selection existed before copying
				document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
				document.getSelection().addRange(selected);   // Restore the original selection
			}
		}

    return {
      state,
      taskGroup,
      appealReturn,
      taskChange,
			getLink,

      icons: {
        mdiMenu,
        mdiDeleteOutline,
        mdiPencilOutline,
				mdiLinkVariant
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