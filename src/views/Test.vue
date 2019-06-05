<template>
  <v-layout
    v-if="this.tests.list.length !== 0"
    row
    wrap
    justify-center
    class="test-view"
  >
    <v-flex xs12 sm11 md11 lg8>
      <app-show-test
        :currentNumber='tests.currentNumber'
        @complete="checkTest"
      ></app-show-test>
    </v-flex>
    <v-flex xs12 sm11 md11 lg8 mt-1>
      <app-test-navigation></app-test-navigation>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { status } from '@/fetchapi'
import ShowTest from '@/components/ShowTest/ShowTest';
import TestNavigation from '@/components/TestNavigation/TestNavigation';
import fetchStatus from '@/constants/fetchStatus';

export default {
  created() {
    if( this.tests.list.length === 0 || this.tests.testStatus){
      this.$router.push({ path: '/' })
    }
  },
  computed: {
    ...mapState([
      'tests'
      ]),
    loading() {
      return (this.tests.fetchStatus == fetchStatus.start)
    },
    currentNumber(){
      return this.tests.currentNumber
    }
  },
  methods: {
    ...mapActions([
      'fetchTests',
      'fetchResult'
    ]),
    async checkTest() {
      const r = await this.fetchResult();
      if (r.status === status.success) {
        this.$router.push('/result');
      }
    }
  },
  components:{
    appShowTest: ShowTest,
    appTestNavigation: TestNavigation,
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.test-view {
  margin-top: 20px;
  @include mobile {
    margin-top: 0;
  }
}

</style>