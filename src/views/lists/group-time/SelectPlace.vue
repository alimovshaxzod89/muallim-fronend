<template>
	<v-row>
		<v-col
			v-for="place in places"
			cols="12"
			sm="6"
		>
			<v-btn
				style="height: 20vh !important; font-size: 40px !important;"
				color="primary"
				block
				@click="$emit('select-place', place.id)"
			>
				{{place.name}}
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>
import { useRouter } from '@core/utils'
import axios from '@axios'
import { ref } from '@vue/composition-api/dist/vue-composition-api'

export default {
  setup() {
    const { router } = useRouter()

    const places = ref([])
    const loadPlaces = () => {
      axios.get('/api/places').then(response => {
        if (response.data.success) {
          places.value = response.data.data
        }
      })
    }
    loadPlaces()

    return {
      router,
      places,
    }
  },
}
</script>

<style scoped>
</style>
