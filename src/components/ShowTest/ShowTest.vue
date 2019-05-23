<template>
  <v-layout row wrap justify-center>
    <v-flex md10 sm11>
        <v-card >
          <v-card-title>
            <b>{{currentTest.answer}}{{answer}}
            </b>
          </v-card-title>
          <v-card-text>
            <v-radio-group v-model="answer">
              <v-radio
                v-for="(n,i) in currentTest.options"
                :key="i"
                :label="letters[i]+'.  '+n"
                :value="i"
              ></v-radio>
              <label for=""></label>
            </v-radio-group>
          </v-card-text>
          <v-card-actions>
            <v-layout column>
              <v-layout row>
                <v-flex xs4 sm3 md2>
                  <v-btn flat left @click="previosQuestion" outline color="grean" :disabled="currentId==0" >НАЗАД</v-btn>
                </v-flex>
                <v-flex xs4 sm6 md8>
                  <v-spacer></v-spacer>
                </v-flex>
                <v-flex xs4 sm3 md2>
                  <v-btn flat right @click="nextQuestion" outline color="success" :disabled="tests.list.length==currentId+1">ДАЛІ</v-btn>
                </v-flex>
              </v-layout>
              <v-layout row pr-3 pb-3>
                <v-flex xs6 sm8 md8 >
                  <v-spacer></v-spacer>
                </v-flex>
                <timer></timer>
                <count></count>
              </v-layout>
            </v-layout>
          </v-card-actions>
        </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex';
import letters from './../../constants/lettersForTest'

export default {
  data() {
    return {
      letters:letters,
      answer:null
    }
  },
  props:[
    'currentId'
  ],
  computed: {
    ...mapState([
      'tests'
    ]),
    currentTest(){
      // return this.tests.list.filter(x => x.id == this.currentId)[0]
      return this.tests.list[this.currentId]
    }
  },
  methods: {
    nextQuestion(){
      this.$store.commit('changeCurrentId',{currentId: this.currentId+1})
    },
    previosQuestion(){
       this.$store.commit('changeCurrentId',{currentId: this.currentId-1})
    }
  },
  components:{
    Timer: () => import('./../Timer/Timer'),
    Count: () => import('./../Count/Count')
  }
}
</script>
<style scoped>
</style>
