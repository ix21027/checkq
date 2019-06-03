<template>
  <v-layout>
    <v-flex col>
      <h1>Оберіть категорії для тестування</h1>
      <app-categories
        :categories='categories.list'
        v-model="selectedCategories"
        @markAll="selectAll"
      ></app-categories>
      <v-layout row wrap mt-5 mb-5>
        <v-slider
          v-model="testNumber"
          label="Кількість тестів"
          step="5"
          max="60"
          min="0"
          thumb-label="always"
          ticks
        ></v-slider>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="startTest" :disabled="!isValid">Почати тестування</v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import fetchStatus from '@/constants/fetchStatus.js'

export default {
  name: 'home',
  data: () => {
    return {
      selectedCategories: [],
      testNumber: 30
    }
  },

  methods: {
    ...mapActions([
      'fetchTests'
    ]),
    selectAll() {
      if (this.selectedCategories.length === this.categories.length) {
        this.selectedCategories = []
      } else {
        this.selectedCategories = [...this.categories.list.map(c => c.id)]
      }
    },
    startTest() {
      this.fetchTests({categories: this.selectedCategories, testCount: this.testNumber});
    }
  },
  computed: {
    ...mapState([
      'categories',
    ]),
    ...mapState({
      fetchTestStatus(state) {
        return state.tests.fetchStatus;
      }
    }),
    loading() {
      return (this.categories.fetchStatus === fetchStatus.start)
    },
    isReady() {
      return (this.categories.fetchStatus === fetchStatus.success);
    },
    isError() {
      return (this.categories.fetchStatus === fetchStatus.fail)
    },
    isValid() {
      return (this.selectedCategories.length > 0 && this.testNumber > 0);
    }
  },

  components: {
    appCategories: () => import('@/components/CategorieList/CategorieList'),
  },

  watch: {
    fetchTestStatus(value){
      if (value === fetchStatus.success) {
        this.$router.push('/test');
      }
    }
  }
}
</script>
