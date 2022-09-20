<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keydown.enter='onSubmit()'
		@keydown.esc='close()'
		@click:outside='close()'
		max-width='700px'
		width='700px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Ustozlar</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols='4'>
								<h4 class='text-required no-text'></h4>
								<v-text-field
									label='FAMILIYA'
									v-model='formData.last_name'
									type='text'
									dense
									outlined
									hide-details
									required
								></v-text-field>
							</v-col>
							<v-col cols='4'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									label='ISMI'
									v-model='formData.first_name'
									dense
									outlined
									required
									hide-details
									:rules='[required, minLengthValidator(formData.first_name, 3)]'
								></v-text-field>
							</v-col>
							<v-col cols='4'>
								<h4 class='text-required no-text'></h4>
								<v-text-field
									label='SHARIFI'
									v-model='formData.middle_name'
									type='text'
									dense
									outlined
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols='6'>
								<v-text-field
									prefix='+998'
									label='TELEFON'
									v-model='formData.phone'
									type='phone'
									dense
									outlined
									hide-details
								></v-text-field>
							</v-col>
							<v-col cols='6'>
								<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.birth_date'
											label="TUG'ILGAN SANASI"
											readonly
											v-bind='attrs'
											v-on='on'
											hide-details
											outlined
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.birth_date'
										color='primary'
										@input='isDate = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>
							<v-col cols='6'>
								<v-autocomplete
									v-model='formData.region_id'
									:items='regions'
									item-text='name'
									item-value='id'
									label='TUMAN'
									dense
									outlined
									hide-details
									clearable
								>
								</v-autocomplete>
							</v-col>
							<v-col cols='6'>
								<v-textarea
									v-model='formData.address'
									label='MANZIL'
									dense
									outlined
									hide-details
									height='80px'
								>
								</v-textarea>
							</v-col>
							<v-col cols='6'>
								<v-autocomplete
									v-model='formData.permanent_region_id'
									:items='regions'
									item-text='name'
									item-value='id'
									label='D.Y. TUMAN'
									dense
									outlined
									hide-details
									clearable
								>
								</v-autocomplete>
							</v-col>
							<v-col cols='6'>
								<v-textarea
									v-model='formData.permanent_address'
									label='D.Y. MANZIL'
									dense
									outlined
									hide-details
									height='80px'
								>
								</v-textarea>
							</v-col>
							<v-col cols='6'>
								<h4 class='text-required'>Jinsi <span>*</span></h4>
								<v-radio-group
									v-model='formData.gender'
									column
									hide-details=''
									class='mt-0'
									required
								>
									<v-radio
										label='Erkak'
										:value='1'
									></v-radio>
									<v-radio
										label='Ayol'
										:value='2'
									></v-radio>
								</v-radio-group>
							</v-col>
							<v-col cols='6' v-if='BRANCH_ID == null'>
								<v-select
									v-model='formData.place_ids'
									:items='places'
									item-text='name'
									item-value='id'
									:menu-props="{ maxHeight: '400' }"
									label='DARS BERADIGAN FILIALLARI'
									multiple
									outlined
								></v-select>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close()'>Bekor qilish</v-btn>
					<v-btn color='success' type='submit' @click.prevent='onSubmit'> Saqlash</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>

	</v-dialog>
</template>

<script>
import { mdiCalendar, mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import TeacherStoreModule from './TeacherStoreModule'

import axios from '@axios'

import { minLengthValidator, required } from '@core/utils/validation'
import { computed, ref, watch } from '@vue/composition-api'
import Button from '../../components/button/Button'

const MODULE_NAME = 'teacher'

export default {
	components: { Button },
	setup(props, { emit }) {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, TeacherStoreModule)
		}

		// show, hide
		const show = ref(false)
		const open = (id = null) => {
			show.value = true
			setTimeout(() => {
				form.value.$el[0].focus()
			}, 100)
			if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
		}
		const close = () => {
			show.value = false
			form.value.resetValidation()
			formData.value = { ...emptyFormData }
		}

		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, () => {
			togglePlaceId()
			togglePlaceIds()
		})

		const form = ref(null)
		const emptyFormData = {
			id: null,
			place_id: branch_id.value,
			first_name: null,
			last_name: null,
			middle_name: null,
			phone: null,
			region_id: null,
			address: null,
			permanent_region_id: null,
			permanent_address: null,
			gender: 1,
			birth_date: null,

			places: [],
		}
		const formData = ref({ ...emptyFormData })

		//fill formData place columns
		const togglePlaceId = () => {
			if (branch_id.value) {
				emptyFormData.place_id = branch_id.value
				formData.value.place_id = branch_id.value
			} else {
				emptyFormData.place_id = null
				formData.value.place_id = null
			}
		}
		const togglePlaceIds = () => {
			if (branch_id.value) {
				//formadan place_ids`ni olib tashlash

				if (formData.value.place_ids !== undefined)
					delete formData.value.place_ids
			} else {
				//formaga place_ids`ni qo`shish

				const plcs = formData.value.places
				if (Array.isArray(plcs) && plcs.length) {
					formData.value.place_ids = plcs.map(p => p.id)
				} else {
					formData.value.place_ids = []
				}
			}
		}
		togglePlaceId()
		togglePlaceIds()

		watch(() => formData.value.places, () => {
			togglePlaceIds()
		})


		// birth date picker
		const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)

		//validation
		const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
		const validate = () => {
			form.value.validate()
		}

		// on form submit
		const onSubmit = () => {
			if (form.value.validate()) {
				if (formData.value.id) {
					store
						.dispatch(`${MODULE_NAME}/updateRow`, formData.value)
						.then(({ data, message }) => {
							close()
							// emit('notify', { type: 'success', text: message })
							return data
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })

							return false
						})
				} else {
					store
						.dispatch(`${MODULE_NAME}/addRow`, formData.value)
						.then(({ data, message }) => {
							close()
							// emit('notify', { type: 'success', text: message })
							emit('add-teacher-to-options', data)
						})
						.catch(error => {

							console.log(error)
							emit('notify', { type: 'error', text: error.message })
							return false
						})
				}
			}
		}


		const regions = ref({})
		const loadRegions = () => {
			axios
				.get('/api/regions')
				.then(response => {
					if (response.data.success) {
						regions.value = response.data.data
					}
				})
				.catch(error => console.log(error))
		}
		loadRegions()

		const places = ref([])
		const loadPlaces = () => {
			axios.get('/api/places').then(response => {
				places.value = response.data.data
			})
		}
		loadPlaces()

		// TeacherForm
		const regionForm = ref(null)
		const addRegion = (id = null) => {
			regionForm.value.open(id)
		}
		const addRegionToOptions = row => {
			regions.value = regions.value.concat([row])
			formData.value.region_id = row.id
		}

		return {
			form,
			picker,
			isDate,
			required,
			minLengthValidator,
			formData,
			selectRule,
			validate,
			show,
			onSubmit,
			open,
			close,

			places,
			regions,

			regionForm,
			addRegion,
			addRegionToOptions,

			icons: {
				mdiPlusCircleOutline,
				mdiCalendar,
			},
		}
	},
}
</script>

<style>
.v-input__append-outer {
	margin: 0 0 0 10px !important;
}

.btn-dialog-add-item {
	min-width: 60px !important;
	padding-right: 15px !important;
	padding-left: 15px !important;
	border-color: rgba(94, 86, 105, 0.15) !important;
}
</style>
