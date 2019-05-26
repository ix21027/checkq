<template>
  <v-layout row wrap justify-center align-center fill-height>
    <v-flex mt-5>
      <v-progress-circular
        centered
        indeterminate
        color="primary"
      ></v-progress-circular>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: true,
    }
  }
}
</script>

<style>

</style>
