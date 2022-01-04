<template>
  <v-dialog
    v-model="show"
    @keydown.enter="accept(true)"
    @keydown.esc="cancel(false)"
    @click:outside="cancel(false)"
    width="600"
  >
    <v-card>
      <v-card-title class="headline">Tasdiqlang</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="gray" outlined @click="cancel(false)">Bekor qilish</v-btn>
        <v-btn color="error" @click="accept(true)">Tasdiqlash</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    text: '',
    show: false,
    resolve: null,
    reject: null,
  }),

  methods: {
    open(text) {
      this.text = text

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject

        this.show = true
      })
    },
    accept() {
      this.show = false
      this.text = ''
      this.resolve()
    },
    cancel() {
      this.show = false
      this.text = ''
      this.reject()
    },
  },
}
</script>
