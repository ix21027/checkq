<template>
  <v-layout pa-3>
    <v-flex col>
      <v-layout row wrap ma-2>
        <v-flex>
          <h1>Розпочати тестування</h1>
          <p>
            Оберіть категорії для тестування та кількість тестів.
          </p>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex>
        <app-categorie
          :categories="categories"
          v-model="selectedCategories"
          @markAll="selectAll"
          @random="random"
        />
        </v-flex>
      </v-layout>
      <v-layout column wrap align-center pa-1>
        <v-flex>
          <v-layout column justify-center mt-2>
            <v-flex>
              <div class="test-count">
                {{testNumber}}
              </div>

            </v-flex>
            <v-flex xs1>
              <v-slider
              v-model="testNumber"
              step="5"
              max="60"
              min="0"
              color="orange"
            ></v-slider>
            </v-flex>

          </v-layout>

        </v-flex>
        <v-flex>
        <v-btn
          @click="startTest"
          :disabled="!isValid"
          color="orange"
          outline=""
          >
            Почати
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { status } from '@/fetchapi'
import Categorie from '@/components/Categorie/Categorie'
import { rand, randSelect } from '@/utils'

import fetchStatus from '@/constants/fetchStatus.js'

export default {
  name: 'home',
  data: () => {
    return {
      selectedCategories: [],
      testNumber: 30
    }
  },

  components: {
    appCategorie: Categorie,
  },

  methods: {
    ...mapActions([
      'fetchTests'
    ]),
    selectAll() {
      if (this.selectedCategories.length === this.categories.length) {
        this.selectedCategories = []
      } else {
        this.selectedCategories = [...this.categories.map(categorie => categorie.id)]
      }
    },
    random() {

      const categorieNumber = rand(1, this.categories.length);
      const randomCategories = randSelect(categorieNumber, this.categories);
      this.selectedCategories = [...randomCategories.map(categorie => categorie.id)];
    },

    async startTest() {
      const r = await this.fetchTests({
        categories: this.selectedCategories,
        testCount: this.testNumber
      });

      if (r.status === status.success) {
        this.$router.push('/test')
      }
      // TODO: handle error, r.status may error
    }
  },
  computed: {
    ...mapState({
      categories(state) {
        return state.categories.list;
      },
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
      return (this.selectedCategories.length > 0 && this.testNumber >= this.selectedCategories.length);
    }
  },


}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.test-count {
  text-align: center;
  font-size: 2em;
  // border: 1px solid $side-color;
  // background: $main-color;
  // border-radius: $block-border-radius;
}
</style>
