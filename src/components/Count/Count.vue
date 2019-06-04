<template>
  <v-flex>
    <v-icon color="success" size="20" >check_circle</v-icon>
    {{currentCount+'/'+lengthAll}}
  </v-flex>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'tests'
    ]),
    lengthAll(){
      return this.tests.list.length
    },
    currentCount(){
      return this.tests.countPassed
    }
  }
}
</script>

<style>

</style>
