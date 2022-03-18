<template>
  <!-- form dialog -->
  <v-dialog 
    v-model="show" 
    @keydown.esc="close()" 
    @click:outside="close()" 
    max-width="550px" 
    width="550px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Xarajat turlari</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>  
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  :items="selectsDatas.ExpenseCategory"
                  type="text"
                  dense
                  outlined
                  hide-details
                  :rules="[required]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>

          <v-btn color="success" type="submit" @click.prevent="onSubmit"> Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import ExpenseCategoryStoreModule from './ExpenseCategoryStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button'

const MODULE_NAME = 'expense-category'

export default {
  components: { Button },
  // props: {
  //
  // },
  created() {
    this.loadExpenseCategory()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, ExpenseCategoryStoreModule)
    }

    // show, hide
    const show = ref(false)
    const formData = ref({})

    const form = ref(null)
    const emptyFormData = {
      id: null,
      name: null,
    }

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

    //validation
    const validate = () => {
      form.value.validate()
    }
    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadExpenseCategory = () => {
      axios
        .get('/api/expense-categorys', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.ExpenseCategory = response.data.data
          }
        })
        .catch(error => console.log(error))
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

    return {
      form,
      required,
      minLengthValidator,
      formData,
      validate,
      selectsDatas,
      show,
      onSubmit,
      open,
      close,
      loadExpenseCategory,
      emptyFormData,

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
