<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-flex-start flex-wrap'>

			<h1>Ustoz guruhlari va talabalarini import qilish</h1>
		</v-card-text>

		<br>
		<br>

		<!--		<h4>Export uchun namuna</h4>-->
		<!--		<v-btn color='success'>Yuklab olish</v-btn>-->
		<!--		<br>-->
		<!--		<br>-->
		<!--		<br>-->

		<v-card-text>

			<v-row>
				<v-col cols='6'>
					<v-file-input
						counter
						truncate-length='50'
						label='EXCEL FAYLNI KIRITING'
						v-model='fileInput'
						id='import-file-input'
						outlined
						clearable
					></v-file-input>
				</v-col>
				<v-col cols='6'>
					<v-text-field
						label='USTOZ FAMILIYASI VA ISMI'
						v-model='teacher_full_name'
						@keyup.enter='importFile()'
						outlined
					/>
				</v-col>
			</v-row>

			<v-btn color='info' @click='importFile()'>Import qilish</v-btn>
		</v-card-text>
	</v-card>
</template>

<script>
function basename(path) {
	return path.split(/[\\/]/).pop()
}

const getExtension = () => {
	const file = document.querySelector('input#import-file-input[type="file"]').value
	return file.split('.').pop()
}

async function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = error => reject(error)
	})
}

import { ref, watch } from '@vue/composition-api'
import axios from '@axios'

export default {

	setup() {
		const fileInput = ref(null)
		const teacher_full_name = ref('')
		const fileExtension = ref('')

		watch(fileInput, (file) => {

			if (file) {

				// const file = document.querySelector('input#import-file-input[type="file"]').value
				// const file_name = basename(file)
				const file_name = file.name

				teacher_full_name.value = file_name.replace(/\.[^/.]+$/, '')

				fileExtension.value = getExtension()
			} else {

				teacher_full_name.value = ''
				fileExtension.value = null
			}
		})

		const importFile = async () => {

			var file = document.querySelector('input#import-file-input[type="file"]').files[0]

			if (file) {

				if (fileExtension.value != 'xlsx') {
					alert('Fayl xlsx formatida bo\'lishi kerak')
					return
				}

				const base64 = await getBase64(file)

				// axios.post('/api/room', {
				axios.post('api/import', {
					fileBase64: base64,
					fileExtension: fileExtension.value,
					teacher_full_name: teacher_full_name.value,
				}).then(response => {
					if (response.data.success) {
						fileInput.value = null

						alert('Yuklandi')

					} else {
						alert('Xatolik: ' + response.data.message)
					}

					console.log(response)

				}).catch(error => {
					console.log(error)
					alert(error)
				})

			} else {
				alert('Oldin faylni tanlang!')
				return false
			}

		}

		return {
			fileInput,
			teacher_full_name,

			importFile,

		}
	},
}
</script>

<style>

</style>