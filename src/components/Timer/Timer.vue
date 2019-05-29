<template>
	<v-flex xs3 sm2 md2>
		<v-icon color="primary" size="20">access_time</v-icon>
		{{time}}
	</v-flex>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { formatTime } from '@/utils'

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
      'setStartTime',
      'setEndTime',
      'setStringTime'
    ]),
    display: formatTime,
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
      this.time = this.display(diff)
    }, 1000)

  },
  destroyed() {
    this.setEndTime({ time: new Date().getTime() })
    const t = this.display(this.tests.endTime - this.tests.startTime)
    this.setStringTime({ time: t })
    localStorage.setItem('testTime',JSON.stringify(t))
    clearInterval( this.timerId )
  },
}
</script>

<style>

</style>