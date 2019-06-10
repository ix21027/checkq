<template>
  <v-flex md6>
    <v-flex>
      <v-tabs
        v-model="currentTab"
        slider-color="orange"
        fixed-tabs
        color="transparent"
        :show-arrows="$vuetify.breakpoint.smAndUp"
      >
        <v-tab
          v-for="subject in subjects"
          :key="subject.id"
          ripple
        >
          {{subject.name}}
        </v-tab>
          <v-tab-item
            v-for="(subject, index) in subjects"
            :key="subject.id"
          >
          <v-layout justify-center>
            <v-pagination
            v-if="paginationSizes[index] > 1"
              class="pagination"
              circle
              color="orange"
              v-model="paginationOffsets[index]"
              :length="paginationSizes[index]"
              :total-visible="maxPaginationSize"
            ></v-pagination>
          </v-layout>
          <app-answer
            v-for="(test, index) in paginatedTests[currentPaginationPage - 1]"
            :key="test.question_id"
            :question="test.question_name"
            :answer="test.answer_name"
            :mark="`${(currentPaginationPage - 1) * testPerPage + index + 1}.`"
          />
          <v-layout justify-center>
            <v-pagination
              v-if="paginationSizes[index] > 1"
              class="pagination"
              circle
              color="orange"
              v-model="paginationOffsets[index]"
              :length="paginationSizes[index]"
              :total-visible="maxPaginationSize"
            ></v-pagination>
          </v-layout>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-flex>
</template>

<script>
import BankAnswer from './BankAnswer';

export default {
  props: {
    tests: {
      type: Array,
      default: () => [],
    },
    subjects: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      currentTab: 0, // number of currentTab, index of subject in array
      paginationOffsets: [],
      // paginationPageNumbers: new Array(this.subjects.length).fill(0),
      testPerPage: 20,
    }
  },
  components: {
    appAnswer: BankAnswer,
  },
  watch: {
    subjects(){
      this.paginationOffsets = new Array(this.subjects.length).fill(1);
    }
  },
  computed: {
    categories() {
      const r =  this.subjects.map(s => {
        return {
          subject_id: s.id,
          title: s.name,
          questions: this.tests.filter(t => t.subject_id == s.id)
        };
      })
      return r;
    },
    subjectTests() {
      return this.subjects.map(subject =>
        this.tests.filter(test => test.subject_id === subject.id)
      );
    },
    activeSubjectTests() {
      return this.subjectTests[this.currentTab];
    },
    paginatedTests() {
      const pages = Math.floor(this.activeSubjectTests.length / this.testPerPage) + 1;
      const testsPaginated = [];
      for (let i = 0; i < pages; i += 1) {
        testsPaginated.push(this.activeSubjectTests.slice(this.testPerPage * i, this.testPerPage * i + this.testPerPage));
      }

      return testsPaginated;
    },
    currentPaginationPage() {
      return this.paginationOffsets[this.currentTab] || 1;
    },
    paginationSizes() {
      return this.subjectTests.map(tests => {
        return Math.ceil(tests.length / this.testPerPage);
      });
    },
    maxPaginationSize() {
      return Math.max(...this.paginationSizes);
    },
    filterCategorie() {
      return this.categories;
    },
    paginated() {
      return this.filterCategorie.slice();
    },
    paginationSize() {
      return this;
    },
  },
}
</script>

<style>

</style>
