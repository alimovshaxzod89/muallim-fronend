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
							<label for='firstnameHorizontalIcons'>IFSh</label>
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
								placeholder='IFSh'
								hide-details
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

							<v-text-field
								id='subjectsHorizontalIcons'
								v-model='subjects'
								:prepend-inner-icon='icons.mdiBookOutline'
								outlined
								dense
								placeholder='Fan'
								hide-details
								:rules="subjectsRules"
								required
							></v-text-field>
						</v-col>


						<v-col
							cols='12'
							md='3'
						>
							<label for='emailHorizontalIcons'>Tug'ilgan sa'nasi</label>
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
								placeholder='Telefon raqami'
								hide-details
								:rules="phoneRules"
								required
							></v-text-field>
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
									:key="Ayol"
									:label="'Ayol'"
									:value="Ayol"
								></v-radio>
								<v-radio
									:key="Erkak"
									:label="'Erkak'"
									:value="Erkak"
								></v-radio>
							</v-radio-group>
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
import { mdiAccountOutline, mdiEmailOutline, mdiCellphone, mdiLockOutline, mdiCalendar, mdiBookOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
	data: () => ({
		items: ['Instagram', 'Telegram', 'Ota-onamdan', 'Tanishlarimdan', 'Boshqa'],
		valid: false,
		nameRules: [
			v => !!v || 'Kiritilishi shart',
			v => v.length <= 10 || 'Name must be less than 10 characters',
		],
		subjectsRules: [
			v => !!v || 'Kiritilishi shart',
			v => v.length <= 10 || 'Name must be less than 10 characters',
		],
		dateRules: [
			v => !!v || 'Kiritilishi shart',
			v => v.length <= 10 || 'Name must be less than 10 characters',
		],
		phoneRules: [
			v => !!v || 'Kiritilishi shart',
			v => v.length <= 10 || 'Name must be less than 10 characters',
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
		const radioGroup = ref(1)

		return {
			firstname,
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
			radioGroup,


			// icons
			icons: {
				mdiAccountOutline,
				mdiEmailOutline,
				mdiCellphone,
				mdiLockOutline,
				mdiCalendar,
				mdiBookOutline
			},
		}
	},
}
</script>
