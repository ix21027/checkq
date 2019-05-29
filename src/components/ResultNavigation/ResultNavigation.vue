<template>
  <div>
    <div class="place" v-for="(item, index) in resultList" :key="item.id">
      <v-btn class="cell" @click="clickToNavigation(index)" :color="colors(index)" depressed fab small>{{index+1}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props:['resultList'],
  methods: {
    colors(index){
      return this.resultList[index].answer === this.resultList[index].server_answer ? "#9DF99B" : "#FFCCCC"
    },
    clickToNavigation(index){
      console.log(index)
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
    margin: 2px;
  }
}
</style>
