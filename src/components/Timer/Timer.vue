<template>
	<v-flex xs3 sm2 md2>
		<v-icon color="primary" size="20">access_time</v-icon>
		{{timer}}
	</v-flex>
</template>
<script>
import { mapActions, mapState } from 'vuex';
export default {
  created() {
    this.fetchTime()
  },
  computed: {
    ...mapState([
      'tests'
    ]),
    timer(){
      return this.tests.currentTime
    }
  },
  methods: {
    ...mapActions([
      'fetchTime'
    ])
  },
}
</script>
<style>

</style>