<template>
  <!-- photo dialog -->
  <v-dialog
    ref="studentPhoto"
    v-model="show"
    @click:outside="close()"
    @keydown.esc="close()"
    @keydown.enter="onSubmit()"
    max-width="500px"
    width="500px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Talabani suratini yuklash</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>

              <div class="image-center">
                <div class="camera" v-show="cameraShow">
                  <video v-show="visibleCamera" ref="video" width="400" height="300" autoplay></video>
                  <canvas v-show="!visibleCamera" ref="canvas"></canvas>
                </div>
                <img class="user-src" :src="url" alt="Avatar" v-if="!cameraShow" v-show="url" />
                <v-btn class="error delete-image" v-show="selectedAvatar && !cameraShow" @click="deleteImage">O'chirish</v-btn>
              </div>
              <div class="webcam-buttons">
                <v-btn v-show="!visibleCamera" class="warning" @click.prevent="reCapture">QAYTA OLISH</v-btn>
                <v-btn v-if="cameraShow" v-show="visibleCamera" class="primary" @click="capturePhoto">SURATGA OLISH</v-btn>
                <v-btn v-if="!cameraShow" v-show="visibleCamera" class="primary" @click="startWebCamera">SURATGA OLISH BO'LIMI</v-btn>
                <input id="fileUpload" type="file" accept="image/*" hidden @click="fileUpload" @change="fileUpload" />
                <v-btn class="photo-label" color="info" outlined v-show="visibleCamera">
									<label for="fileUpload" v-show="visibleCamera">TANLASH</label>
								</v-btn>
              </div>

            </v-row>
          </v-container>
        </v-card-text>
				<hr>
        <v-card-actions class="pt-5">
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="stopWebCamera()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="submitPhoto()">Saqlash</v-btn>
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
  setup(props, { emit }) {
    //show, hide
    const show = ref(false)
    const form = ref(null)
    // const open = (id = null) => {
    //   show.value = true
    //   if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
    // }
    const close = () => {
      show.value = false
    }

    // PHOTO LOGIC
    // Photo variables
    const cameraShow = ref(false)
    const visibleCamera = ref(true)
    const url = ref(null)
    const selectedAvatar = ref(false)

    const camera = ref(null)
    const canvas = ref(null)
    const video = ref(null)
    const avatar = ref(null)
    const studentInfo = ref(null)

    // Photo functions
    const getBase64 = file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    }
    const fileUpload = e => {
      hideCamera()
      cameraShow.value = false
      camera.value = null
      canvas.value = null
      visibleCamera.value = true

      let file = e.target.files[0]
      getBase64(file).then(data => ((avatar.value = data), (url.value = URL.createObjectURL(file))))
    }
    const hideCamera = () => {
      if (camera.value ? camera.value.srcObject.getTracks()[0] : false) {
        camera.value.srcObject.getTracks()[0].stop()
      }
      if (camera.value ? camera.value.srcObject.getTracks()[1] : false) {
        camera.value.srcObject.getTracks()[1].stop()
      }
    }
    const openUserImage = student => {
      studentInfo.value = student
      show.value = true
      if (student.photo_link) {
        url.value = envParams.BACKEND_URL + student.photo_link
        selectedAvatar.value = true
      } else {
        url.value = require(`@/assets/images/user-image.png`)
        selectedAvatar.value = false
      }
    }
    const startWebCamera = () => {
      cameraShow.value = true
      const modalShow = new Promise(resolve => {
        show.value = true
        resolve()
      })

      modalShow.then(res => {
        camera.value = video.value

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(stream => {
              camera.value.srcObject = stream
            })
            .catch(error => {
              console.log('Something went wrong!', error)
            })
        }
      })
    }
    const stopWebCamera = () => {
      show.value = false

      hideCamera()

      url.value = null
      cameraShow.value = false
      camera.value = null
      canvas.value = null
      avatar.value = null
      visibleCamera.value = true
      studentInfo.value = null
      selectedAvatar.value = false
    }
    const capturePhoto = () => {
      canvas.value.width = 400
      canvas.value.height = 300
      canvas.value.getContext('2d').drawImage(camera.value, 0, 0, 400, 300)
      avatar.value = canvas.value.toDataURL('image/png')

      if (canvas.value.width) {
        visibleCamera.value = false
        hideCamera()
      }
    }
    const reCapture = () => {
      visibleCamera.value = true
      avatar.value = null
      camera.value = video.value

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(stream => {
            camera.value.srcObject = stream
          })
          .catch(error => {
            console.log('Something went wrong!', error)
          })
      }
    }
    const submitPhoto = () => {
      if (studentInfo.value && avatar.value) {
        const newInfo = {
          ...studentInfo.value,
          // photo: url.value ? url.value : null,
          image: avatar.value ? avatar.value : null,
        }
        delete newInfo.photo
        delete newInfo.photo_link
        store
          .dispatch(`${MODULE_NAME}/updateRow`, newInfo)
          .then(res => {
            stopWebCamera()
            emit('notify', { type: 'success', text: 'Muvaffaqiyatli' })
          })
          .catch(error => {
            console.log(error)
            emit('notify', { type: 'error', text: error.message })
          })
      } else if (!avatar.value) {
        stopWebCamera()
        // loadStudents((this.page - 1) * this.limit)
        emit('notify', { type: 'success', text: 'Muvaffaqiyatli' })
      } else {
        emit('notify', { type: 'warning', text: 'Suratga olinmadi!' })
      }
    }
    const deleteImage = () => {
      const newInfo = {
        ...studentInfo.value,
        photo: null,
      }
      store
        .dispatch(`${MODULE_NAME}/updateRow`, newInfo)
        .then(res => {
          emit('notify', { type: 'success', text: 'Muvaffaqiyatli' })
          url.value = require(`@/assets/images/user-image.png`)
          selectedAvatar.value = false
          avatar.value = null
        })
        .catch(error => {
          console.log(error)
          emit('notify', { type: 'error', text: error.message })
        })
    }

    return {
      form,
      show,
      open,
      close,

      // Photo variables
      cameraShow,
      visibleCamera,
      url,
      selectedAvatar,
      camera,
      canvas,
      avatar,
      video,
      studentInfo,
      MODULE_NAME,

      // Photo functions
      startWebCamera,
      stopWebCamera,
      capturePhoto,
      reCapture,
      fileUpload,
      deleteImage,
      submitPhoto,
      getBase64,
      hideCamera,
      openUserImage,
    }
  },
}
</script>

<style>
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
