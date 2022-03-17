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
					<span class='headline'>Lidlar</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols='6' class='inputForm'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.subject_id'
									:items='selectsDatas.subject'
									item-text='name'
									item-value='id'
									label='FAN'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
								>
								</v-autocomplete>
							</v-col>
							<v-col cols='6' class='inputForm'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									label='FIO'
									v-model='formData.full_name'
									type='text'
									dense
									outlined
									hide-details
									:rules='[required]'
								></v-text-field>
							</v-col>
							<v-col cols='6' class='inputForm'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									prefix='+998'
									label='TELEFON RAQAM'
									v-model='formData.phone'
									type='phone'
									dense
									outlined
									hide-details
									:rules='[required]'
								></v-text-field>
							</v-col>
							<v-col cols='6' class='inputForm'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.birth_date'
											label="TUG'ILGAN KUN"
											readonly
											v-bind='attrs'
											v-on='on'
											hide-details
											dense
											outlined
											:rules='[required]'
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
							<v-col cols='6' class='inputForm'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-radio-group
									v-model='formData.gender'
									class='mt-0'
									hide-details
								>
									<v-radio
										label='ERKAK'
										:value='true'
									></v-radio>
									<v-radio
										label='AYOL'
										:value='false'
									></v-radio>
								</v-radio-group>
							</v-col>
							<v-col cols='6'>
								<v-textarea
									v-model='formData.note'
									label='IZOH'
									dense
									outlined
									hide-details
									height='80px'
								>
								</v-textarea>
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
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import store from '@/store'
import AppealStoreModule from './AppealStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'appeal'

export default {
  created() {
    this.loadSubject()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, AppealStoreModule)
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
    const emptyFormData = {
      id: null,
      lead_id: null,
      full_name: null,
      phone: null,
      birth_date: null,
      gender: true,
      note: null,
      subject_id: null,
      days: null,
      hours: null,
    }
    const formData = ref({ ...emptyFormData })

    // birth date picker
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //validation
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']

    // form options for selects
    const selectsDatas = ref({
      subject: [],
    })
    const loadSubject = () => {
      axios
        .get('/api/subjects', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.subject = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      const newValue = {
        ...formData.value,
        days: '1',
        hours: '1',
      }
      if (form.value.validate()) {
        if (formData.value.id) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, newValue)
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
            .dispatch(`${MODULE_NAME}/addRow`, newValue)
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
        }
      }
    }

    // SubjectForm
    const subjectForm = ref(null)
    const addSubject = (id = null) => {
      subjectForm.value.open(id)
    }
    const addSubjectToOptions = row => {
      selectsDatas.value.subject = selectsDatas.value.subject.concat([row])
      formData.value.subject_id = row.id
    }

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadSubject,
      show,
      onSubmit,
      open,
      close,

      subjectForm,
      addSubject,
      addSubjectToOptions,

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

.inputForm {
  margin-top: -15px;
}
</style>
