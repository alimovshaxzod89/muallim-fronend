<template>
	<div>

		<select-place v-if="!place_id" v-on:select-place="selectPlace($event)" />
		<div v-if="place_id" style="display: flex;">
			<v-btn
				outlined
				style=""
				color="primary"
				@click="selectPlace(null)"
			>
				Orqaga
			</v-btn>
			<h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{place_names[place_id]}}</h3>
		</div>

	</div>
</template>

<script>

import { useRouter } from '@core/utils'
import SelectPlace from './SelectPlace'

import { onUnmounted, ref } from '@vue/composition-api'

export default {
	components: {
		SelectPlace,
	},
	setup() {
		const { router } = useRouter()

		const place_id = ref(0)
		const place_names = {
			1: 'A-bino',
			2: 'B-bino',
			3: 'Kotejlar',
			4: 'VIP',
		}
		const selectPlace = (id) => {
			place_id.value = id

			router.push({
				query: {
					...router.query,
					place_id: id,
				},
			})
		}

		return {
			router,
			place_id,
			place_names,
			selectPlace,
		}
	},
}
</script>

<style scoped>

</style>