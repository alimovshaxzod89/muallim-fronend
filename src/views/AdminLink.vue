<template>
  <div />
</template>

<script>
export default {
  name: 'AdminLink',
  beforeCreate() {
    window.location.href = '/v1/admin'
  },
}
</script>

<style scoped>

</style>
