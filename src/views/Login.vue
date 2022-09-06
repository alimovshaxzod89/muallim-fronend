<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-inner">
      <!-- brand logo -->
      <router-link to="/" class="brand-logo d-flex align-center">
        <v-img
          :src="appLogo"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          class="me-3"
        ></v-img>

        <h2 class="text--primary">
          {{ appName }}
        </h2>
      </router-link>
      <!--/ brand logo -->

      <v-row class="auth-row ma-0">
        <v-col lg="8" class="d-none d-lg-block position-relative overflow-hidden pa-0">
          <div class="auth-illustrator-wrapper">
            <!-- triangle bg -->
            <img
              height="362"
              class="auth-mask-bg"
              :src="require(`@/assets/images/misc/mask-v2-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
            />

            <!-- tree -->
            <v-img
              height="226"
              width="300"
              class="auth-tree"
              :src="require('@/assets/images/misc/tree-4.png').default"
            ></v-img>

            <!-- 3d character -->
            <div class="d-flex align-center h-full pa-16 pe-0">
              <v-img
                contain
                max-width="100%"
                height="692"
                class="auth-3d-group"
                :src="
                  require(`@/assets/images/3d-characters/illustration-forgot-password-${
                    $vuetify.theme.dark ? 'dark' : 'light'
                  }.png`)
                "
              ></v-img>
            </div>
          </div>
        </v-col>

        <v-col lg="4" class="d-flex align-center auth-bg pa-10 pb-0">
          <v-row>
            <v-col cols="12" sm="8" md="6" lg="12" class="mx-auto">
              <v-card flat>
                <v-card-text>
                  <p class="text-2xl font-weight-semibold text--primary mb-2">Kirish</p>
<!--                  <p class="mb-2">Please sign-in to your account and start the adventure</p>-->
                </v-card-text>

                <!-- <v-card-text>
                  <v-alert text color="primary">
                    <small class="d-block mb-1">
                      Admin username: <strong>admin@materio.com</strong> / Pass: <strong>admin</strong>
                    </small>
                    <small>
                      Client username: <strong>client@materio.com</strong> / Pass: <strong>client</strong>
                    </small>
                  </v-alert>
                </v-card-text> -->

                <!-- login form -->
                <v-card-text>
                  <v-form ref="loginForm" @submit.prevent="handleFormSubmit">
                    <v-text-field
                      v-model="username"
                      outlined
                      label="Login"
                      placeholder="username"
                      :error-messages="errorMessages.username"
                      :rules="[validators.required]"
                      hide-details="auto"
                      class="mb-6"
                    ></v-text-field>

                    <v-text-field
                      v-model="password"
                      outlined
                      :type="isPasswordVisible ? 'text' : 'password'"
                      label="Parol"
                      :error-messages="errorMessages.password"
                      placeholder="Password"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      :rules="[validators.required]"
                      hide-details="auto"
                      class="mb-2"
                      @click:append="isPasswordVisible = !isPasswordVisible"
                    ></v-text-field>
                    
                    <v-col
                      class="d-flex"
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        v-model="place_id"
                        :items="places"
                        item-text="name"
                        item-value="id"
                        :rules="selectRule"
                        label="Binoni Tanlash"
                      ></v-select>
                    </v-col>

<!--                    <div class="d-flex align-center justify-space-between flex-wrap">-->
<!--                      <v-checkbox hide-details label="Remember Me" class="mt-0"> </v-checkbox>-->

<!--                      &lt;!&ndash; forget link &ndash;&gt;-->
<!--                      &lt;!&ndash; <router-link :to="{ name: 'auth-forgot-password' }" class="ms-3"> Forgot Password? </router-link> &ndash;&gt;-->
<!--                    </div>-->

                    <v-btn block color="primary" type="submit" class="mt-6"> Kirish </v-btn>
                  </v-form>
                </v-card-text>

                <!-- create new account  -->
                <!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
                  <p class="mb-0 me-2">New on our platform?</p>
                  <router-link :to="{ name: 'auth-register' }"> Create an account </router-link>
                </v-card-text> -->

                <!-- divider -->
                <!-- <v-card-text class="d-flex align-center mt-2">
                  <v-divider></v-divider>
                  <span class="mx-5">or</span>
                  <v-divider></v-divider>
                </v-card-text> -->

                <!-- socail links -->
                <!-- <v-card-actions class="d-flex justify-center">
                  <v-btn v-for="link in socialLink" :key="link.icon" icon class="ms-1">
                    <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
                      {{ link.icon }}
                    </v-icon>
                  </v-btn>
                </v-card-actions> -->
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref, getCurrentInstance } from '@vue/composition-api'
import { required } from '@core/utils/validation'
import axios from '@axios'
import { useRouter } from '@core/utils'
import themeConfig from '@themeConfig'

export default {
  setup() {
    // Template Ref
    const loginForm = ref(null)

    const vm = getCurrentInstance().proxy
    const { router } = useRouter()

    const isPasswordVisible = ref(false)

    const username = ref('')
    const password = ref('')

    const place_id = ref(null)
    //set old selected
    if (localStorage.getItem('place')) {
      const lastplace = JSON.parse(localStorage.getItem('place'))
      place_id.value = lastplace.id
    }
    //place options
    const places = ref([])
    const loadPlace = () => {
      axios.get('/api/places').then(response => {
        if (response.data.success) {
          places.value = response.data.data
        }
      })
    }

    loadPlace()
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']

    

    const errorMessages = ref([])
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    const notify = ref({})

    const handleFormSubmit = () => {
      const isFormValid = loginForm.value.validate()

      if (!isFormValid) return

      /*
        1. Make HTTP request to get accessToken
        2. Store received token in localStorage for future use
        3. Make another HTTP request for getting user information
        4. On successful response of user information redirect to home page

        ? We have use promise chaining to get user data from access token
        ? Promise Chaining: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#chaining
      */

      axios
        .post('/api/login', { username: username.value, password: password.value, place_id: place_id.value })
        .then(response => {
          // ? Set access token in localStorage so axios interceptor can use it
          // Axios Interceptors: https://github.com/axios/axios#interceptors

          const { success, token, user, msg, multi_currency } = response.data

          if (success) {
            localStorage.setItem('accessToken', token)

            const place = {
              id: place_id.value,
              name: '',
            }
            places.value.forEach(element => {
              if (element.id == place.id) place.name = element.name
            })

            localStorage.setItem('place', JSON.stringify(place))
            localStorage.setItem('multi_currency', multi_currency)
            localStorage.setItem('userData', JSON.stringify(user))

            const { ability: userAbility } = user
            // Set user ability
            // ? https://casl.js.org/v5/en/guide/intro#update-rules
            vm.$ability.update(userAbility)
            // Set user's ability in localStorage for Access Control
            localStorage.setItem('userAbility', JSON.stringify(userAbility))

            // notify.value = { type: 'success', text: msg, time: Date.now() }
            // router.push({ name: 'dashboard-eCommerce' }).catch(err => console.log(err)).then(() => {
            // router.push('/').catch(err => console.log(err)).then(() => {
            window.location.reload()
            // });
          } else {
            notify.value = { type: 'error', text: msg, time: Date.now() }
            username.value = ''
            password.value = ''
          }

          return response
        })
        .catch(error => {
          // TODO: Next Update - Show notification
          console.error('Oops, Unable to login!')
          console.log('error :>> ', error.response)
          notify.value = { type: 'error', text: error.response.data.error, time: Date.now() }
          errorMessages.value = error.response.data.error
        })
    }

    return {
      handleFormSubmit,

      isPasswordVisible,
      username,
      password,
      place_id,
      selectRule,
      errorMessages,
      socialLink,
      notify,
      places,
      loadPlace,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      validators: {
        required,
      },

      // themeConfig
      appName: themeConfig.app.name,
      appLogo: themeConfig.app.logoInLogin,

      // Template Refs
      loginForm,
    }
  },
  watch: {
    ['notify']() {
      this.$toast[this.notify.type](this.notify.text)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@core/preset/preset/pages/auth.scss';
</style>
