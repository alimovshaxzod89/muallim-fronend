<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keyup='onSubmit()'
		@keydown.esc='close()'
		@click:outside='close()'
		max-width='1000px'
		width='1000px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Talaba guruh qo'shish</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							
							<v-col cols='4'>
								<v-autocomplete
									v-model='formData.student_id'
									:items='students'
									item-text='full_name'
									item-value='id'
									label='TALABA'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
									required
								>
									
								</v-autocomplete>
							</v-col>
						</v-row>
                        <v-row>
                            <v-col cols='6'>
								<h4 class='text-required'>Chegirma turi <span>*</span></h4>
								<v-radio-group
									v-model='formData.discount_options'
									column
									hide-details=''
									class='mt-0'
									required
								>
									<v-radio
										label='Bola olib kelgani uchun'
										:value='1'
									></v-radio>
                                    
									<v-radio
										label='Har doimga davlat tomonidan'
										:value='2'
									></v-radio>
                                    
                                    <v-radio
										label="10-gacha to'ladi"
										:value='3'
									></v-radio>
								</v-radio-group>
							</v-col>
                        </v-row>
                        
                        <v-row>
                            <v-col cols='6'>
								<v-radio-group
                                    v-model='formData.discount_type'
									column
									hide-details=''
									required
                                    class="m-0 p-0"
								>
                                    <div class="d-flex">
                                        <v-radio
										    :value='1'
                                        >
                                        </v-radio>
                                        <v-col cols="6" style="margin-top: 16px; padding: 0;">
                                            <v-text-field
                                                v-model="currency_type__one"
                                                :disabled="formData.discount_type == 2"
                                                outlined
                                                dense
                                            >
                                            </v-text-field>
                                        </v-col>
                                    </div>

                                    <div class="d-flex">
                                        <v-radio
										    :value='2'
                                        >
                                        </v-radio>
                                        <v-col cols="6" style="margin-top: 16px; padding: 0;">
                                            <v-text-field
                                                :disabled="formData.discount_type == 1"
                                                v-model="currency_type__two"
                                                outlined
                                                dense
                                            >
                                            </v-text-field>
                                        </v-col>
                                    </div>
                                </v-radio-group>
                            </v-col>
                            <v-col cols='6'>
								<v-textarea
									label='CHEGIRMA SABABI'
									hide-details
									outlined
									clearable
                                    style="margin-top: 32px;"
								></v-textarea>
							</v-col>
                        </v-row>

						<v-row>
							<v-col cols="3">
								<v-list-item-title>Guruh</v-list-item-title>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.group_id'
									:items='groups'
									item-text='number'
									item-value='id'
									label='GURUH'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
								>
								</v-autocomplete>
							</v-col>
							<v-col cols="9">
								<v-list-item-title>Qaysi oylar uchun</v-list-item-title>
								<div style="margin-top: 22px;" class="d-flex mx-auto">
									<v-btn color="primary">2022-noyabr</v-btn>
									<v-btn color="primary" class="mx-1">2022-dekabr</v-btn>
									<v-btn color="primary" class="mx-1">2023-yanvar</v-btn>
									<v-btn color="primary">2023-fevral</v-btn>
								</div>
							</v-col>
						</v-row>
						<v-row>
							<v-col cols='12'>
								<v-checkbox
									hide-details
									label='Ustoz oyligidan ham ayrilsinmi?'
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
					<v-btn color='success' type='submit' @click.prevent='onSubmit'> Saqlash</v-btn>
				</v-card-actions>
			</v-form>

			<template #[`item.begin_date`]='{ item }'> {{ item.begin_date | date }}</template>
		</v-card>

	</v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'

moment.locale('uz')

import store from '@/store'
import DiscountStoreModule from './DiscountStoreModule'

import axios from '@axios'

import { computed, ref, watch } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'discount'

export default {

	filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		// sum: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},

	setup(props, { emit }) {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, DiscountStoreModule)
		}

		// show, hide
		const show = ref(false)
		const open = (id = null) => {
			show.value = true
			if (id) {
				formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
			}

		}
        const currency_type__one = ref('Chegirma: 25%')
        const currency_type__two = ref('Sumda: 75 000')
		
        const close = () => {
			show.value = false
			form.value.resetValidation()
			formData.value = { ...emptyFormData }
		}

		const form = ref(null)
		const emptyFormData = {
			id: null,
			student_id: null,
			group_id: null,
            discount_options: 1,
            discount_type: 1,
            currency_type: null
		}

		//validation
		const formData = ref({ ...emptyFormData })
		const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
		const validate = () => {
			form.value.validate()
		}


		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}


		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, (value) => {
			loadTeachers()
			loadGroups()
			loadStudents()
		})

		const students = ref([])
		const loadStudents = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios.get('/api/students', { params }).then(response => {
				if (response.data.success) {
					students.value = response.data.data
				}
			})
				.catch(error => console.log(error))
		}
		loadStudents()

		const groups = ref([])
		const loadGroups = () => {
			axios.get(`/api/groups`).then(response => {
				groups.value = response.data.data
			})
		}
		loadGroups()


		// on form submit
		const onSubmit = () => {
			if (form.value.validate()) {
				if (formData.value.id) {
					store
						.dispatch(`${MODULE_NAME}/updateRow`, formData.value)
						.then(({ message }) => {
							close()
							// emit('notify', { type: 'success', text: message })
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })
						})
				} else {
					//create

					let studentIds = []
					if (Array.isArray(formData.value.student_id)) {
						studentIds = formData.value.student_id
					} else {
						studentIds.push(formData.value.student_id)
					}

					studentIds.forEach(student_id => {
						store
							.dispatch(`${MODULE_NAME}/addRow`, { ...formData.value, student_id })
							.then(({ message }) => {
								close()
								emit('notify', { type: 'success', text: message })
							})
							.catch(error => {
								console.log(error)
								emit('notify', { type: 'error', text: error.message })
							})
					})
				}
			}
		}


		const picker = new Date().toISOString().substr(0, 10)
		const isDateFirst = ref(false)
		const isDateSecond = ref(false)

		return {
			form,
			picker,
			isDateFirst,
			isDateSecond,
			required,
			minLengthValidator,
			formData,
			selectRule,
			validate,
			show,
			onSubmit,
			open,
			groups,
			close,
			students,

            currency_type__two,
            currency_type__one,

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
