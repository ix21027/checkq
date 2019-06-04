<template>
  <v-flex>
    <v-icon color="primary" size="20">access_time</v-icon>
    {{time}}
  </v-flex>
</template>

<script>
import { formatTime } from '@/utils'

export default {
  data() {
    return {
      time: '00:00',
      timerId: null
    };
  },
  props: [
    'initTime'
    ],
  methods: {
    display: formatTime,
  },
  mounted() {
    this.timerId = setInterval(() => {
      var diff = new Date().getTime() - this.initTime
      this.time = this.display(diff)
    }, 1000)

  },
  destroyed() {
    clearInterval( this.timerId )
  },
}
</script>

<style>

</style>