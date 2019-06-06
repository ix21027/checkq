<template>
  <div
    :class="{
      open,
      correct: correct() }"
    class="accordion"
    :id="item.id"
  >
  <div class="accordion-counter">{{index + 1}}</div>
    <div
      class="head"
      @click="open = !open"
    >
      <div>
        <app-katex
          :expression='`${item.question}`'>
        </app-katex>
      </div>

    </div>
    <div
      class="body"
    >
      <div v-for="(i,count) in item.options" :key="i.id" class="option">
        <div>
          <div
            class="letter"
            :class="{
              checked: item.answer === i.id,
              'correct-option': correct(),
            }"
          >
            {{letters[count]}}
          </div>
        </div>
        <div class="option-text">
          <app-katex
            :expression='`${i.title}`'>
          </app-katex>
        </div>
      </div>
      <div v-if="!correct()" class="true-answer">
        Правильна відповідь: {{letters[item.options.findIndex((i)=> i.id === item.server_answer)]}}.
      </div>
    </div>
  </div>
</template>

<script>
import letters from '@/constants/lettersForTest';
import Katex from '@/components/WithFormula/WithFormula';

export default {
  data() {
    return {
      letters:letters,
      open: !this.correct(),
    }
  },
  props:[ 'item', 'index'],
  methods: {
    correct(){
      return this.item.answer === this.item.server_answer
    }
  },
  components: {
    appKatex: Katex,
  },
}
</script>


<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

$dot-radius: 5px;
$size: 26px;
.true-answer{
  margin: 5px 0 0 10px;
}
.option{
  display: flex;
  position: relative;
  padding: 5px 0;
  align-items: center;
  .option-text{
    width: 95%;
  }
  .circle {
    position: relative;
    top: 50%;
    margin: -10px 10px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    border-radius: 20px;
    &.check {
      .dotc {
        display: block;
      }
    }
    .dotc {
      // display: none;
    }
  }
}
.accordion {

  position: relative;
  margin: 10px 0;
  border-left: 5px solid $uncorrect;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 3px $inactive-color;
  .accordion-counter {
    color: #fff;
    width: 30px;
    height: 30px;
    background: $uncorrect;
    top: calc(50% - 15px);
    left: -17px;
    text-align: center;
    border-radius: 20px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.correct {
    border-color: $correct;
    .accordion-counter {
      background: $correct;
    }
  }
  line-height: 20px;
  padding: 15px;
  .head {
    display: flex;
    font-weight: bold;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    margin-left: 10px;
    @include mobile {
      overflow-x: auto;
    }

  }
  .body {
    padding: 0;
    max-height: 0;
    transition: 0.4s;
    overflow: hidden;
    @include print {
      max-height: 100vh;
    }
    @include desktop {
      margin-left: 20px
    }
  }
  &.open {
    .body {
      padding: 20px 0;
      max-height: 100vh;
      transition: 1s;
    }
    .dot {
      &:nth-child(even){
        top: 5px;
      }
      &:nth-child(odd) {
        top: 10px;
      }
    }
  }
}
.icon {
  display: flex;
  height: 20px;
  position: relative;
}
.letter {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $size;
  width: $size;
  height: $size;
  min-width: $size;
  min-height: $size;
  font-weight: bold;
  margin-right: 0.5em;
  &.checked {
    border: 2px solid $side-color;
    &.correct-option{
      border: 2px solid $side-color;
    }
  }
}

</style>