<!--suppress ALL -->
<template>

	<v-row class='d-flex justify-center'>
		<v-col
			cols='12'
			md='6'
		>

			<v-card elevation='2' class="pa-md-6 ma-9 mx-lg-auto">
				<h2 class='mb-8 text-center'>HILOL TA'LIM</h2>
				<v-form >
					<v-row>
						<v-col
							cols='12'
							md='3'
						>
							<label for='firstnameHorizontalIcons'>Ism</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>

							<v-text-field
								id='firstnameHorizontalIcons'
								v-model='firstname'
								:prepend-inner-icon='icons.mdiAccountOutline'
								:rules="nameRules"
								outlined
								dense
								label='Ism Familiya Sharifingiz'
								hide-details
								required
							></v-text-field>
						</v-col>

						<v-col
							cols='12'
							md='3'
						>
							<label for='mobileHorizontalIcons'>Telefon raqam</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>
							<v-text-field
								id='mobileHorizontalIcons'
								v-model='mobile'
								type='number'
								outlined
								:prepend-inner-icon='icons.mdiCellphone'
								dense
								label='Telefon raqami'
								hide-details
								:rules="phoneRules"
								required
							></v-text-field>
						</v-col>

						<v-col
							cols='12'
							md='3'
						>
							<label for='subjectsHorizontalIcons'>Fan</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>

							<v-autocomplete
								id='subjectsHorizontalIcons'
								v-model="formData.subject_id"
								:items="selectsDatas.subject"
								:prepend-inner-icon='icons.mdiBookOutline'
								item-text="name"
								item-value="id"
								label="Fan"
								dense
								outlined
								hide-details
								clearable
							>
							</v-autocomplete>
						</v-col>


						<v-col
							cols='12'
							md='3'
						>
							<label for='birthdayHorizontalIcons'>Tug'ilgan sa'nasi</label>
						</v-col>

						<v-col cols="12" md='9'>
							<v-menu
								v-model="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										id='birthdayHorizontalIcons'
										v-model="date"
										:prepend-inner-icon="icons.mdiCalendar"
										outlined
										dense
										v-bind="attrs"
										v-on="on"
										:rules="dateRules"
										required
									></v-text-field>
								</template>
								<v-date-picker
									v-model="date"
									color="primary"
									@input="menu2 = false"
								></v-date-picker>
							</v-menu>
						</v-col>


						<v-col
							cols='12'
							md='3'
						>
							<label for='radioHorizontalIcons'>Jins</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>
							<v-radio-group
								v-model="radioGroup"
								class="mt-0"
								hide-details
							>
								<v-radio
									:label="'Erkak'"
								></v-radio>
								<v-radio
									:label="'Ayol'"
								></v-radio>
							</v-radio-group>
						</v-col>

						<v-col
							cols='12'
							md='3'
						>
							<label for='summaryHorizontalIcons'>Izoh</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>

							<v-textarea
								id='summarynameHorizontalIcons'
								autocomplete="summary"
								label="Izoh"
								v-model='summary'
								:prepend-inner-icon='icons.mdiPencilOutline'
								:rules="summaryRules"
								outlined
								dense
								hide-details
								required
							></v-textarea>
						</v-col>



						<v-col
							offset-md='3'
							cols='12'
						>
							<v-btn color='primary'>
								Jo'natish
							</v-btn>
							<v-btn
								type='reset'
								outlined
								class='mx-2'
							>
								Bekor qilish
							</v-btn>
						</v-col>
					</v-row>
				</v-form>

			</v-card>
		</v-col>

	</v-row>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiEmailOutline, mdiCellphone, mdiLockOutline, mdiCalendar, mdiBookOutline, mdiPencilOutline } from '@mdi/js'

import { ref } from '@vue/composition-api'
import SubjectForm from '@/views/lists/subject/SubjectForm.vue'
import axios from '@axios'
import store from '@/store'

export default {
	components: { SubjectForm },
	created() {
		this.loadSubject()
	},
	data: () => ({
		items: ['Instagram', 'Telegram', 'Ota-onamdan', 'Tanishlarimdan', 'Boshqa'],
		valid: false,
		nameRules: [
			v => !!v || 'Kiritilishi shart',
			v => v.length <= 10 || 'Name must be less than 10 characters',
		],
		subjectsRules: [
			v => !!v || 'Kiritilishi shart',
		],
		dateRules: [
			v => !!v || 'Kiritilishi shart',
		],
		phoneRules: [
			v => !!v || 'Kiritilishi shart',
		],
		summaryRules: [
			v => !!v || 'Kiritilishi shart',
		],
	}),
	setup() {
		const date = new Date().toISOString().substr(0, 10)
		const firstname = ref('')
		const subjects = ref('')
		const email = ref('')
		const mobile = ref()
		const password = ref()
		const checkbox = ref(false)
		const menu = ref(false)
		const modal = ref(false)
		const menu2 = ref(false)
		const menuref = ref(null)
		const summary = ref(null)
		const emptyFormData =  {
			subject_id: null,
		}
		const formData = ref({ ...emptyFormData })
		const selectsDatas = ref({})

		// show, hide
		const show = ref(false)
		const open = (id = null) => {
			show.value = true
			if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME4}/getThirdById`](id)))
		}
		const close = () => {
			show.value = false
			form.value.resetValidation()
			formData.value = { ...emptyFormData }
		}

		const loadSubject = () => {
			axios
				.get('/api/subjects', { params: { itemsPerPage: -1 } })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.subject = response.data.data
						console.log(selectsDatas.value.subject)
					}
				})
				.catch(error => console.log(error))
		}

		const subjectForm = ref(null)
		const addSubject = (id = null) => {
			subjectForm.value.open(id)
		}
		const addSubjectToOptions = (row) => {
			selectsDatas.value.subject = selectsDatas.value.subject.concat([row])
			formData.value.subject_id = row.id
		}

		return {
			firstname,
			selectsDatas,
			subjects,
			email,
			mobile,
			password,
			checkbox,
			date,
			menu,
			modal,
			menu2,
			menuref,
			radioGroup: null,
			summary,
			addSubject,
			addSubjectToOptions,
			loadSubject,
			formData,
			length: 0,


			// icons
			icons: {
				mdiAccountOutline,
				mdiEmailOutline,
				mdiCellphone,
				mdiLockOutline,
				mdiCalendar,
				mdiBookOutline,
				mdiPencilOutline
			},
		}
	},
}
</script>
