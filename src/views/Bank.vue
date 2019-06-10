<template>
<v-layout pa-3 justify-center column>
  <v-flex md6>
      <div class="bank">
      <v-text-field
        label="пошук"
        v-model="search"
        @keyup.enter="findTest"
        @blur="findTest"
        :prepend-icon-cb="clean"
        prepend-icon="close"
        append-icon="search"
        @click:append="findTest"
      />
    </div>
  </v-flex>
  <app-search
    v-if="isSearch"
    :result="searchResult"
    :query="query"
  />
  <app-bank-list
    v-else
    :tests="tests"
    :subjects="subjects"
  />
</v-layout>
</template>

<script>

import BankSearchDisplay from '@/components/Bank/BankSearchDisplay.vue';
import BankListDisplay from '@/components/Bank/BankListDisplay.vue';
import { mapActions, mapState } from 'vuex';
import Fuse from 'fuse.js';

export default {
  data() {
    return {
      search: this.query,
      searchResult: [],
      searchResultQuery: '',
    }
  },
  props: ['query'],
  components: {
    appSearch: BankSearchDisplay,
    appBankList: BankListDisplay
  },
  methods: {
    ...mapActions(['fetchBank']),
    clean(){
      this.search = '';
      this.searchResult = [];
      this.$router.push(`/bank`)
    },
    findTest() {
      if(this.searchResultQuery === this.search){
        return ;
      }
      this.$router.push(`/bank?q=${this.search}`)
      const options = {
        keys: ['question_name']
      };

      const fuse = new Fuse(this.tests, options);
      this.searchResult = [...fuse.search(this.query).slice(0,10)];
      this.searchResultQuery = this.search;
    }
  },
  mounted() {
    if (this.tests.length === 0) {
      this.fetchBank();
    }
  },
  computed: {
    ...mapState({
      tests(state) {
        return state.bank.tests;
      },
      subjects(state) {
        return state.bank.subjects;
      }
    }),
    isSearch() {
      return !!this.query;
    }
  },
}
</script>

<style>

</style>
