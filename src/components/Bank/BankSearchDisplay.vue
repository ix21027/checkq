<template>
  <v-flex md6>
    <v-layout pa-2>
      <v-flex class="search-control">
        <div class="plain">
          Результати пошуку:
        </div>
        <div class="query">
          {{query}}
        </div>
      </v-flex>
    </v-layout>
    <app-answer
      v-for="test in result"
      :key="test.question_id"
      :question="test.question_name"
      :answer="test.answer_name"
    />
</v-flex>
</template>

<script>
import BankAnswer from './BankAnswer'

export default {
  props: {
    result: {
      type: Array,
      default: () => [],
    },
    query: {
      type: String,
      default: '',
    }
  },
  components: {
    appAnswer: BankAnswer,
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.search-control {
  height: 32px;
  display: flex;
  align-items: center;
  .plain {
    font-weight: bold;
    margin-right: 5px;
  }
  .query {
    color: $main-color;

  }
}
</style>
