<template>
<v-layout pa-3 justify-center column>
  <v-flex md6>
      <div class="bank">
      <v-text-field label="пошук" v-model="search"></v-text-field>
    </div>
  </v-flex>
  <v-flex md6>
    <app-bank-answer
      v-for="i in 5"
      :key="i"
      :question="`${i}. You bark all day lil doggy?`"
      :answer="`No, ist only half of day => ${i}`"
    />
  </v-flex>
</v-layout>

</template>

<script>
import BankAnswer from '@/components/BankAnswer/BankAnswer.vue';

export default {
  data() {
    return {
      search: '',
    }
  },
  components: {
    appBankAnswer: BankAnswer,
  }
}
</script>

<style>

</style>
