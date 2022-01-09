<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keydown.enter="onSubmit()"
    max-width="1200px"
    width="1200px"
  >
    <v-card>
			<v-card-title>
				<span class="headline">Guruh vaqtlari</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>



					</v-row>
				</v-container>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="gray" outlined @click="close()">OK</v-btn>
				<!-- <v-btn color="success" @click.prevent="onSubmit()">OK</v-btn> -->
			</v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// import store from '@/store'
// import axios from '@axios'

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

    const open = (id = null) => {
      show.value = true
    }
    const close = () => {
      show.value = false
    }

    return {
      show,
      open,
      close,
    }
  },
}
</script>
