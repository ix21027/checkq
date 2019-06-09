<template>
<v-layout pa-3 justify-center column>
  <v-flex md6>
      <div class="bank">
      <v-text-field
        label="пошук"
        v-model="search"
        append-icon="search"

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
    }
  },
  props: ['query'],
  components: {
    appSearch: BankSearchDisplay,
    appBankList: BankListDisplay
  },
  methods: {
    ...mapActions(['fetchBank']),
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
    searchResult() {
      if (!this.search) {
        return this.tests;
      }
      const options = {
        keys: ['question_name']
      };

      const fuse = new Fuse(this.tests, options);
      return fuse.search(this.query);
    },
    isSearch() {
      return !!this.query;
    }
  },
  watch: {
    search(value) {
      this.$router.push(`/bank?q=${value}`)
    }
  }
}
</script>

<style>

</style>
