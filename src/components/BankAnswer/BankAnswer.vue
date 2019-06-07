<template>
  <v-layout
    column
    pa-2
    class="bank-answer"
  >
    <v-flex>
      <div class="question">{{question}}</div>
    </v-flex>
    <v-flex>
      <div class="answer">
        <div class="answer-head">Відповідь:</div>
        <div class="answer-body">{{answer}}</div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
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
  }
}
</script>

<style lang="scss" scoped>
.question {
  font-size: 12pt;
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
