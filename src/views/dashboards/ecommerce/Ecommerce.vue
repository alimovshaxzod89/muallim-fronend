<template>
	<v-btn
		style=""
		x-large
		color="primary"
		@click="router.push('/bron')"
	>
		Bron qo'shish
	</v-btn>
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
