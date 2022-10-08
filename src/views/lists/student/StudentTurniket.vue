<template>
	<!-- photo dialog -->
	<v-dialog
		ref='studentPhoto'
		v-model='show'
		@click:outside='close()'
		@keydown.esc='close()'
		@keydown.enter='onSubmit()'
		max-width='500px'
		width='500px'
	>
		<v-card>
			<v-form ref='form' v-if='studentInfo != null'>
				<v-card-title>
					<span class='headline'>Turniket</span>
				</v-card-title>

				<v-card-text>

					<br>

					<div id='print-area'>
						<v-simple-table dense>
							<template v-slot:default>
								<tbody>
								<tr>
									<td><h3>Talaba:</h3></td>
									<td><h3>{{ studentInfo.full_name }}</h3></td>
								</tr>
								<!--								<tr>-->
								<!--									<td><b>Sinf:</b></td>-->
								<!--									<td>{{ studentInfo.group.subject.name + '-' + studentInfo.group.number }} sinf-->
								<!--									</td>-->
								<!--								</tr>-->
								</tbody>
							</template>
						</v-simple-table>

						<br>
						<br>

						<h3>Qachongacha kira oladi:</h3>
						<v-row justify='center'>

							<v-col>
								<v-date-picker
									v-model='studentInfo.accepted_end_date'
									color='success'
									full-width
									elevation='5'
									:first-day-of-week='1'
									locale='ru-ru'
								></v-date-picker>
							</v-col>
						</v-row>

						<br>
						<h3>Turniketdan kirish chiqishga ro'xsat berish:</h3>
						<v-row justify='left'>

							<v-col>

								<v-switch v-model='studentInfo.accepted' inset color='success'>
									<template v-slot:label>

<!--										<v-progress-circular-->
<!--											:indeterminate='studentInfo.accepted'-->
<!--											:value='0'-->
<!--											size='24'-->
<!--											class='ml-2'-->
<!--										></v-progress-circular>-->
									</template>
								</v-switch>
							</v-col>

						</v-row>

					</div>

				</v-card-text>

				<hr>
				<v-card-actions class='pt-5'>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close'>Yopish</v-btn>
					<v-btn color='success' type='button' @click='save()'>Saqlash</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
import store from '@/store'

import { ref } from '@vue/composition-api'
import envParams from '@envParams'

const MODULE_NAME = 'student'


export default {
	methods: {
		async print() {
			// Pass the element id here
			await this.$htmlToPaper('print-area')
		},
	},
	setup(props, { emit }) {
		//show, hide
		const show = ref(false)
		const form = ref(null)
		// const open = (id = null) => {
		//   show.value = true
		//   if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](id)))
		// }
		const close = () => {
			show.value = false
		}

		const studentInfo = ref(null)

		const openModal = student => {
			studentInfo.value = student
			show.value = true
		}

		const access = ref(false)

		const save = () => {

			if (studentInfo.value.accepted_end_date == null && studentInfo.value.accepted) {
				alert('Oldin qachongacha kirish chiqishga ro\'xsat berishni belgilang')
				return
			}

			store
				.dispatch(`${MODULE_NAME}/updateRow`, studentInfo.value)
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


		return {
			form,
			show,
			open,
			close,
			save,

			studentInfo,
			MODULE_NAME,

			openModal,
			access,
		}
	}
	,
}
</script>

<style>
.qrcode img {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}

.image-center {
	position: relative !important;
	text-align: center;
}

.camera {
	text-align: center;
}

.camera video {
	border: 4px solid red;
	border-radius: 5px;
}

.camera canvas {
	border: 4px solid #00ea00;
	border-radius: 5px;
}

.webcam-buttons {
	margin-top: 20px;
	text-align: center;
}

.user-src {
	width: 400px;
	height: 300px;
	object-fit: cover;
}

label[for='fileUpload'] {
	margin-bottom: 0;
	text-transform: capitalize;
}

.delete-image {
	position: absolute;
	top: 10px;
	right: 40px;
	border: 3px solid #fff !important;
}

.image-center {
	width: 100%;
}

.photo-label {
	height: 0 !important;
	padding: 0 !important;
}

.photo-label label {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 38px !important;
	padding: 0 23.1111111111px;
	cursor: pointer;
}

.webcam-buttons {
	display: flex;
	justify-content: center;
	width: 100%;
	margin: 20px auto 5px auto;
}

.webcam-buttons button {
	margin-right: 15px;
}
</style>
