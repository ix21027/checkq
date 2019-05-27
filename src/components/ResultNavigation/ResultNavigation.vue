<template>
  <div>
    <div class="place" v-for="i in 60" :key="i">
      <v-btn class="cell" color="#9DF99B" depressed fab small>{{i}}</v-btn>
    </div>
  </div>
</template>

<script>
export default {

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
