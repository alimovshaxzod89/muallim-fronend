<template>
  <v-card id="data-list">
    <!-- search -->
    <v-card-text class="d-flex align-center flex-wrap pb-0">
      <div class="d-flex align-center flex-wrap pb-5 my-filter">
        <v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="FISH"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="TELEFON"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="TUMAN"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="MANZIL"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="D.Y. TUMAN"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="D.Y. MANZIL"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="JINSI"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="TUG'ILGAN SANA"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="CHEGIRMA"
          class="data-list-search me-3"
        ></v-text-field>

				<v-text-field
          v-model="searchQuery"
          single-line
          dense
          outlined
          hide-details
          placeholder="CHEGIRMA SABABI"
          class="data-list-search me-3"
        ></v-text-field>

				<v-spacer></v-spacer>

				<v-btn class="primary" @click="openForm()">Qo'shish</v-btn>
      </div>
    </v-card-text>

    <!-- table -->
    <v-data-table
      v-model="selectedTableData"
      :headers="tableColumns"
      :items="state.rows"
      :options.sync="options"
      :server-items-length="state.total"
      :loading="loading"
      :items-per-page="options.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
    >
      <template slot="item.index" scope="props">
        {{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
      </template>

      <template #[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-center">
          <!-- delete -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="confirmDelete(item.id)">
                <v-icon size="18">
                  {{ icons.mdiDeleteOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>O'chirish</span>
          </v-tooltip>

          <!-- edit  -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openForm(item.id)">
                <v-icon size="18">
                  {{ icons.mdiPencilOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Tahrirlash</span>
          </v-tooltip>

          <!-- image -->
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-btn icon small v-bind="attrs" v-on="on" @click="openPhoto(item)">
                <v-icon size="18">
                  {{ icons.mdiImageEditOutline }}
                </v-icon>
              </v-btn>
            </template>
            <span>Suratni tanlash</span>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.gender`]="{ item }">
        {{ item.gender === 1 ? 'Erkak' : 'Ayol' }}
      </template>

      <template #[`item.photo`]="{ item }">
        <img
          class="img-user"
          :src="item.photo_link ? BASE_URL + item.photo_link : require(`@/assets/images/user-image.png`)"
          alt="Avatar"
        />
      </template>

      <template #[`item.sale`]="{ item }">
        {{ item.sale ? 'Ha' : 'Yo\'q' }}
      </template>
    </v-data-table>

    <dialog-confirm ref="dialogConfirm" />

    <student-form
      ref="studentForm"
      :MODULE_NAME="MODULE_NAME"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />

    <student-photo
      ref="studentPhoto"
      :MODULE_NAME="MODULE_NAME"
      v-on:notify="notify = { type: $event.type, text: $event.text, time: Date.now() }"
    />
  </v-card>
</template>

<script>
import {
  mdiTrendingUp,
  mdiPlus,
  mdiDeleteOutline,
  mdiDotsVertical,
  mdiEyeOutline,
  mdiPencilOutline,
  mdiImageEditOutline,
} from '@mdi/js'

import { onUnmounted, ref } from '@vue/composition-api'
import store from '@/store'

import envParams from '@envParams'

// store module
import StudentStoreModule from './StudentStoreModule'

// composition function
import useStudentList from './useStudentList'
import StudentForm from './StudentForm'
import StudentPhoto from './StudentPhoto'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

export default {
  components: {
    StudentForm,
    StudentPhoto,
    DialogConfirm,
  },
  setup() {
    const MODULE_NAME = 'students'

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    //store state
    const state = ref(store.state[MODULE_NAME])

    //logics
    const {
      searchQuery,
      tableColumns,
      deleteRow,

      options,
      loading,
      notify,
      selectedTableData,
    } = useStudentList(MODULE_NAME)

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
    const actions = ['Delete', 'Edit']
    const selectedAction = ref('')
    const actionOptions = [
      { title: 'Delete', icon: mdiDeleteOutline },
      { title: 'Edit', icon: mdiPencilOutline },
    ]

    //Form
    const studentForm = ref(null)
    const openForm = id => {
      studentForm.value.open(id)
    }

    //Photo
    const studentPhoto = ref(null)
    const openPhoto = item => {
      studentPhoto.value.openUserImage(item)
    }

    //Delete Confirm Dialog
    const dialogConfirm = ref(null)
    const confirmDelete = id => {
      dialogConfirm.value
        .open("O'chirishga aminmisiz?")
        .then(() => deleteRow(id))
        .catch(() => {})
    }

		const BASE_URL = envParams.BASE_URL

    // Return
    return {
			BASE_URL,
      state,

      tableColumns,
      searchQuery,
      options,
      loading,
      notify,
      selectedTableData,

      actions,
      actionOptions,
      selectedAction,
      footerProps,

      dialogConfirm,
      confirmDelete,

      studentForm,
      studentPhoto,
      openForm,
      openPhoto,

      MODULE_NAME,

      icons: {
        mdiTrendingUp,
        mdiPlus,
        mdiPencilOutline,
        mdiDeleteOutline,
        mdiDotsVertical,
        mdiEyeOutline,
        mdiImageEditOutline,
      },
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
#data-list {
  .data-list-actions {
    max-width: 7.81rem;
  }

  .data-list-search {
    max-width: 10.625rem;
  }
}
.img-user {
  width: 50px;
  height: 50px;
  overflow: hidden;
  object-fit: cover;
}

.my-filter {
  .v-input {
    margin-bottom: 12px;
  }
}
</style>
