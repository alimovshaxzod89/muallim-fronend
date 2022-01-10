<template>
	<div />
</template>

<script>
import envParams from '@envParams'

export default {
	name: 'AdminLink',
	beforeCreate() {
		if (envParams.IS_LOCAL) {
			window.location.href = envParams.BACKEND_URL + '/admin'
		} else {
			window.location.href = '/v1/admin'
		}
	},
}
</script>

<style scoped>

</style>
