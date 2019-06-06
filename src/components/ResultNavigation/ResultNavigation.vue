<template>
  <v-flex>
    <div class="place" v-for="(item, index) in resultList" :key="item.id">
      <div
        :to="`#${item.id}`"
        class="nav-btn"
        @click="scrollFix(`#${item.id}`)"
        :class="{ correct: resultList[index].answer === resultList[index].server_answer }"
      >
        {{index+1}}
      </div>
    </div>
  </v-flex>
</template>

<script>
export default {
  props:['resultList'],
  methods: {
    scrollFix: function(hashbang)
    {
      location.href = hashbang;
      window.scroll(window.scrollX, window.scrollY - 70);
    }
  },
  computed: {
    isCorrect(index) {
      return (this.resultList[index].answer === this.resultList[index].server_answer);
    }
  }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
@import '@/styles/theme.scss';
$size-btn: 30px;

.place{
  display: inline-block;
  .nav-btn{
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(255, 252, 252);
    border-radius: 3px;
    text-align: center;
    background: $uncorrect;
    color: #fff;
    margin: 1.5px;
    width: $size-btn;
    height: $size-btn;
    border-radius: $size-btn;
    cursor: pointer;
    border: 0px;
    margin: 5px;
    &:hover {
      border: 2px solid;
    }
    &.correct {
      background: $correct;
    }
  }
}

.navigation {
  @include mobile {
    margin-top: 10px;
  }
}
</style>
