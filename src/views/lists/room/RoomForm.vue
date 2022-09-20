<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keydown.enter='onSubmit()'
		@keydown.esc='close()'
		@click:outside='close()'
		max-width='600px'
		width='500px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Xonalar</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols='12' v-if='BRANCH_ID == null'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.place_id'
									:items='places'
									item-text='name'
									item-value='id'
									label='FILIAL'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
									required
								>
								</v-autocomplete>
							</v-col>
							<v-col cols='12'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									label='Nomi'
									v-model='formData.name'
									dense
									outlined
									required
									hide-details
									:rules='[required, minLengthValidator(formData.name, 3)]'
								></v-text-field>
							</v-col>
							<v-col cols='12'>
								<v-text-field
									label="SIG'IMI"
									v-model='formData.capacity'
									type='number'
									dense
									outlined
									hide-details
									required
								></v-text-field>
							</v-col>
							<v-col cols='12'>
								<v-checkbox
									v-model='formData.status'
									hide-details
									label='AKTIV'
									class='mt-0'
									false-value='0'
									true-value='1'
								></v-checkbox>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close()'>Bekor qilish</v-btn>

					<v-btn
						color='success'
						type='button'
						@click='onSubmit'
						:disabled='submitDisabled'
					>
						<v-icon
							class='loading-animation'
							v-if='submitDisabled'
						>
							{{ icons.mdiLoading }}
						</v-icon>
						Saqlash
					</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>

	</v-dialog>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import RoomStoreModule from './RoomStoreModule'

import axios from '@axios'

import { computed, ref, watch } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button'

const MODULE_NAME = 'room'

export default {
	components: { Button },
	setup(props, { emit }) {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, RoomStoreModule)
		}

		// show, hide
		const show = ref(false)
		const open = (id = null) => {
			show.value = true
			if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
		}
		const close = () => {
			show.value = false
			form.value.resetValidation()
			formData.value = { ...emptyFormData }
		}
		const form = ref(null)


		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, val => {
			emptyFormData.place_id = val
			formData.value.place_id = val
		})

		const emptyFormData = {
			id: null,
			place_id: branch_id.value,
			name: null,
			capacity: null,
			status: '1',
		}
		//validation
		const formData = ref({ ...emptyFormData })
		const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
		const validate = () => {
			form.value.validate()
		}

		// on form submit
		const submitDisabled = ref(false)
		const onSubmit = () => {
			if (submitDisabled.value === true)
				return
			else
				submitDisabled.value = true

			submitDisabled.value = true

			if (!form.value.validate()) {
				console.log('form inputs not valid!')

				submitDisabled.value = false
				return
			}
			if (form.value.validate()) {
				if (formData.value.id) {
					store
						.dispatch(`${MODULE_NAME}/updateRow`, formData.value)
						.then(message => {
							close()
							emit('notify', { type: 'success', text: message })
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })
						})
						.finally(() => {
							submitDisabled.value = false
						})
				} else {
					store
						.dispatch(`${MODULE_NAME}/addRow`, formData.value)
						.then(message => {
							close()
							emit('notify', { type: 'success', text: message })
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })
						})
						.finally(() => {
							submitDisabled.value = false
						})
				}
			}
		}

		const places = ref([])
		const loadPlace = () => {
			axios
				.get('/api/places')
				.then(response => {
					if (response.data.success) {
						places.value = response.data.data
					}
				})
				.catch(error => console.log(error))
		}
		loadPlace()


		// ProductTypeForm
		const roomForm = ref(null)
		const addPlace = (id = null) => {
			roomForm.value.open(id)
		}
		const addPlaceToOptions = row => {
			places.value = places.value.concat([row])
			formData.value.place_id = row.id
		}

		return {
			form,
			required,
			minLengthValidator,
			formData,
			selectRule,
			validate,
			show,
			onSubmit,
			submitDisabled,
			open,
			close,

			places,

			roomForm,
			addPlace,
			addPlaceToOptions,

			icons: {
				mdiPlusCircleOutline,
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
