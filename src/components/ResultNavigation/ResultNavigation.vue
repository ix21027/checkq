<template>
  <v-flex class="navigation">
    <div class="place" v-for="(item, index) in resultList" :key="item.id">
      <v-btn
        :to="`#${item.id}`"
        class="cell"
        @click.native="scrollFix(`#${item.id}`)"
        :color="colors(index)"
        depressed
        fab
        small
      >
        {{index+1}}
      </v-btn>
    </div>
  </v-flex>
</template>

<script>
export default {
  props:['resultList'],
  methods: {
    colors(index){
      return this.resultList[index].answer === this.resultList[index].server_answer ? "#9DF99B" : "#FFCCCC"
    },
    scrollFix: function(hashbang)
    {
      location.href = hashbang;
      window.scroll(window.scrollX, window.scrollY - 70);
    }
  },
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';

.place{
  display: inline-block;
  .cell{
    // width: 3em;
    // height: 3em;
    border-radius: 3px;
    text-align: center;
    margin: 1.5px;
  }
}

.navigation {
  @include mobile {
    margin-top: 10px;
  }
}
</style>
