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
							<label for='firstnameHorizontalIcons'>Ismi</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>

							<v-text-field
								id='firstnameHorizontalIcons'
								v-model='firstname'
								:prepend-inner-icon='icons.mdiAccountOutline'
								outlined
								dense
								placeholder='Ismi'
								hide-details
							></v-text-field>
						</v-col>

						<v-col
							cols='12'
							md='3'
						>
							<label for='firstnameHorizontalIcons'>Familiya</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>

							<v-text-field
								id='secondnameHorizontalIcons'
								v-model='secondname'
								:prepend-inner-icon='icons.mdiAccountOutline'
								outlined
								dense
								placeholder='Familyasi'
								hide-details
							></v-text-field>
						</v-col>
						<v-col
							cols='12'
							md='3'
						>
							<label for='emailHorizontalIcons'>Email</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>
							<v-text-field
								id='emailHorizontalIcons'
								v-model='email'
								:prepend-inner-icon='icons.mdiEmailOutline'
								outlined
								dense
								placeholder='Email'
								hide-details
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
								placeholder='Telefon raqami'
								hide-details
							></v-text-field>
						</v-col>

						<v-col
							cols='12'
							md='3'
						>
							<label for='passwordHorizontalIcons'>Bizni qanday topdingiz</label>
						</v-col>

						<v-col
							cols='12'
							md='9'
						>
							<v-select
								:items="items"
								label="Tanlash"
								outlined
							></v-select>
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
import { mdiAccountOutline, mdiEmailOutline, mdiCellphone, mdiLockOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
	data: () => ({
		items: ['Instagram', 'Telegram', 'Ota-onamdan', 'Tanishlarimdan', 'Boshqa'],
	}),
	setup() {
		const firstname = ref('')
		const secondname = ref('')
		const email = ref('')
		const mobile = ref()
		const password = ref()
		const checkbox = ref(false)

		return {
			firstname,
			secondname,
			email,
			mobile,
			password,
			checkbox,

			// icons
			icons: {
				mdiAccountOutline,
				mdiEmailOutline,
				mdiCellphone,
				mdiLockOutline,
			},
		}
	},
}
</script>
