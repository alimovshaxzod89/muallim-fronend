<template>
	<v-row>
		<v-col
			cols="12"
			sm="6"
		>
			<v-btn
				outlined
				style="height: 20vh !important;"
				color="primary"
				block
				@click="$emit('select-place', 1)"
			>
				A Bino
			</v-btn>
		</v-col>

		<v-col
			cols="12"
			sm="6"
		>
			<v-btn
				outlined
				style="height: 20vh !important;"
				color="primary"
				block
				@click="$emit('select-place', 2)"
			>
				B Bino
			</v-btn>
		</v-col>

		<v-col
			cols="12"
			sm="6"
		>
			<v-btn
				outlined
				style="height: 20vh !important;"
				color="primary"
				block
				@click="$emit('select-place', 3)"
			>
				Katejlar
			</v-btn>
		</v-col>

		<v-col
			cols="12"
			sm="6"
		>
			<v-btn
				outlined
				style="height: 20vh !important;"
				color="primary"
				block
				@click="$emit('select-place', 4)"
			>
				VIP
			</v-btn>
		</v-col>
	</v-row>
</template>

<script>

import { useRouter } from '@core/utils'

export default {
	setup() {
		const { router } = useRouter()

		return {
			router,
		}
	},
}
</script>

<style scoped>

</style>