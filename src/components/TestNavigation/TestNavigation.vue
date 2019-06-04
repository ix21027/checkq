<template>
  <v-card>
    <v-card-text>
      <div class="place" v-for="(test, index) in list" :key="test.id">
        <v-btn class="cell" @click="clickToNavigation(index)" :outline="index===currentNumber" :color="colors(index)" depressed fab small>{{index+1}}</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState([
      'tests'
      ]),
    currentNumber(){
      return this.tests.currentNumber
    },
    list(){
      return this.tests.list
    }
  },
  methods:{
    ...mapMutations([
      'changeCurrentNumber'
      ]),
    colors(index){
      return this.tests.list[index].answer === undefined ? '#BBDEFB':'#00E676'
    },
    clickToNavigation(index){
      this.changeCurrentNumber({ currentNumber: index })
    }
  },
}
</script>

<style lang='scss' scoped>
.place{
  display: inline-block;
  button{
    width: 2em;
    height: 2em;
  }
  .cell{
    border-radius: 3px;
    text-align: center;
    margin: 1.5px;
  }
}
</style>
