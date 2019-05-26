<template>
	<v-flex xs3 sm2 md2>
		<v-icon color="primary" size="20">access_time</v-icon>
		{{time}}
	</v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
/* eslint-disable */
export default {
  data() {
    return {
      initTime: 0,
      endTime:0,
      time: '00:00',
      timerId: null
    };
  },
  computed: {
    ...mapState([
      'tests'
    ])
  },
  methods: {
    ...mapMutations([
      'setEndTime',
      'setStartTime'
    ]),
    display: function (ms){
      var seconds = Math.floor(ms/1000)
      var minutes = Math.floor(seconds/60)
      var hours = Math.floor(minutes/60)
      seconds %= 60
      minutes %= 60
      var str =''+(hours > 0? hours+':':'')
      str += ( minutes === 0) ? '00' : ((minutes < 10 && minutes > 0 ) ?'0'+minutes : minutes)
      str+=':'
      str += ( seconds === 0 ) ? '00' : ((seconds < 10 && seconds > 0 ) ? '0'+seconds : seconds)
      this.time = str
    }
  },
  created() {
    if( this.tests.startTime === null){
      this.initTime = new Date().getTime();
      this.setStartTime({ time: this.initTime })
    } else {
      this.initTime = this.tests.startTime
    }
  },
  mounted() {
    this.timerId = setInterval(() => {
      var diff = new Date().getTime() - this.initTime
      this.display(diff)
    },1000)

  },
  beforeDestroy() {
    this.setEndTime({ time: new Date().getTime() })
    clearInterval( this.timerId )
  },
}
</script>

<style>

</style>