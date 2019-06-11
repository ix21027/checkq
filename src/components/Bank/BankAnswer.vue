<template>
  <v-layout
    column
    pa-2
    class="bank-answer"
  >
    <v-flex>
      <div class="question">
        <div class="question-mark" v-if='mark'>
          {{mark}}
        </div>
        <div
          class="question-body"
          v-html="question">
        </div>
      </div>
    </v-flex>
    <v-flex>
      <div class="answer">
        <div class="answer-head">Відповідь:</div>
        <div
          class="answer-body"
          v-html="answer">
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import 'katex/dist/katex.min.css';


export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    mark: {
      type: String,
      default: '',
    },
  },

}
</script>

<style lang="scss" scoped>
.question {
  font-size: 12pt;
  display: flex;
  &-mark {
    margin-right: 5px;
  }
}

.question-mark{
  display: flex;
  align-items: center;
}
.answer {
  font-size: 10pt;
  display: flex;
  &-head {
    margin-right: 5px;
    font-weight: bold;
  }
}
</style>
