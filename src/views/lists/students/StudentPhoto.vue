<template>
  <!-- photo dialog -->
  <v-dialog
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
                <img class="user-src" :src="this.url" alt="Avatar" v-if="!cameraShow" v-show="this.url" />
                <button class="btn btn-danger delete-image" v-show="selectedAvatar && !cameraShow" @click="deleteImage">
                  <feather-icon icon="TrashIcon" />
                </button>
              </div>
              <div class="webcam-buttons">
                <button v-show="!visibleCamera" class="btn btn-warning" @click="reCapture">Qayta olish</button>
                <button v-if="cameraShow" v-show="visibleCamera" class="btn btn-success" @click="capturePhoto">
                  Suratga olish
                </button>
                <button v-if="!cameraShow" v-show="visibleCamera" class="btn btn-success" @click="startWebCamera">
                  Suratga olish bo'limi
                </button>
                <input id="fileUpload" type="file" accept="image/*" hidden @click="fileUpload" @change="fileUpload" />
                <label class="btn btn-outline-info" for="fileUpload" v-show="visibleCamera">
                  Tanlash
                </label>
              </div>

            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="onSubmit()">Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import store from '@/store'

import { ref } from '@vue/composition-api'

export default {
  props: {
    MODULE_NAME: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    //show, hide
    const show = ref(false)
    const form = ref(null)
    const open = (id = null) => {
      show.value = true
      // if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](id)))
    }
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
      this.hideCamera()
      this.cameraShow = false
      this.camera = null
      this.canvas = null
      this.visibleCamera = true

      let file = e.target.files[0]
      this.getBase64(file).then(data => ((this.avatar = data), (this.url = URL.createObjectURL(file))))
    }
    const hideCamera = () => {
      if (this.camera ? this.camera.srcObject.getTracks()[0] : false) {
        this.camera.srcObject.getTracks()[0].stop()
      }
      if (this.camera ? this.camera.srcObject.getTracks()[1] : false) {
        this.camera.srcObject.getTracks()[1].stop()
      }
    }
    const openUserImage = student => {
      this.studentInfo = student
      this.$refs['my-photo-modal'].show()
      if (student.photo) {
        this.url = 'storage/' + student.photo
        this.selectedAvatar = true
      } else {
        this.url = require(`@/assets/images/user-image.png`)
        this.selectedAvatar = false
      }
    }
    const startWebCamera = () => {
      this.cameraShow = true
      const modalShow = new Promise(resolve => {
        this.$refs['my-photo-modal'].show()
        resolve()
      })

      modalShow.then(res => {
        this.camera = this.$refs['video']

        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then(stream => {
              this.camera.srcObject = stream
            })
            .catch(error => {
              console.log('Something went wrong!', error)
            })
        }
      })
    }
    const stopWebCamera = () => {
      this.$refs['my-photo-modal'].hide()

      this.hideCamera()

      this.url = null
      this.cameraShow = false
      this.camera = null
      this.canvas = null
      this.avatar = null
      this.visibleCamera = true
      this.studentInfo = null
      this.selectedAvatar = false
    }
    const capturePhoto = () => {
      let canvas = this.$refs['canvas']

      canvas.width = 400
      canvas.height = 300
      canvas.getContext('2d').drawImage(this.camera, 0, 0, 400, 300)
      this.avatar = canvas.toDataURL('image/png')

      if (canvas.width) {
        this.visibleCamera = false
        this.hideCamera()
      }
    }
    const reCapture = () => {
      this.visibleCamera = true
      this.avatar = null
      this.camera = this.$refs['video']

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then(stream => {
            this.camera.srcObject = stream
          })
          .catch(error => {
            console.log('Something went wrong!', error)
          })
      }
    }
    const submitPhoto = () => {
      if (this.studentInfo && this.avatar) {
        put('/students/' + this.studentInfo.id, {
          first_name: this.studentInfo.first_name,
          image: this.avatar ? this.avatar : null,
        }).then(res => {
          if (res.data.success) {
            this.stopWebCamera()
            this.loadStudents((this.page - 1) * this.limit)
            this.nofity('Success', 'Muvaffaqiyatli', 'success')
          }
        })
      } else if (!this.avatar) {
        this.stopWebCamera()
        this.loadStudents((this.page - 1) * this.limit)
        this.nofity('Success', 'Muvaffaqiyatli', 'success')
      } else {
        this.nofity('Xato', 'Suratga olinmadi!', 'danger')
      }
    }
    const deleteImage = () => {
      put('/students/' + this.studentInfo.id, {
        first_name: this.studentInfo.first_name,
        photo: null,
      }).then(response => {
        if (response.data.success) {
          this.nofity('Success', 'Muvaffaqiyatli', 'success')
          this.url = require(`@/assets/images/user-image.png`)
          this.$refs['my-modal'].hide()
          this.selectedAvatar = false
          this.avatar = null
        }
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
      studentInfo,

      // Photo functions
      startWebCamera,
      stopWebCamera,
      capturePhoto,
      reCapture,
      fileUpload,
      deleteImage,
      submitPhoto,
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
</style>
