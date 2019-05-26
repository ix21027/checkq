<template>
  <v-layout>
    <v-flex col>
      <h1>Оберіть категорії для тестування</h1>
      <app-loader
        :ready="isReady"
        :error="isError"
      >
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
          <v-btn color="success" to='/test' :disabled="!isValid">Почати тестування</v-btn>
        </v-layout>
      </app-loader>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
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
    selectAll() {
      if (this.selectedCategories.length === this.categories.length) {
        this.selectedCategories = []
      } else {
        this.selectedCategories = [...this.categories.list.map(c => c.id)]
      }
    }
  },
  computed: {
    ...mapState([
      'categories',
    ]),
    loading() {
      return (this.categories.fetchStatus === fetchStatus.start)
    },
    isReady() {
      return (this.categories.fetchStatus === fetchStatus.success);
    },
    isError() {
      return (this.categories.fetchStatus === fetchStatus.faile)
    },
    isValid() {
      return (this.selectedCategories.length > 0 && this.testNumber > 0);
    }
  },

  components: {
    appCategories: () => import('@/components/CategorieList/CategorieList'),
    appLoader: () => import('@/components/Loader/Loader'),
  },
}
</script>

<style lang="scss" scoped>
  .ctg-cart {
    width: 300px;
    height: 250px;
    overflow: hidden;
    position: relative;
    margin: 10px;
    img {
      width: 100%;
      position: absolute;
      top: 0;
    }
    &.select {
      .ctg-title {
        height: 100%;
        .switch {
          .mark-icon {
            width: 40px;
            height: 40px;
            border: 2px solid rgb(35, 177, 54);
            border-radius: 40px;
          }
        }
      }
    }
    .ctg-title {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 70px;
      width: 100%;
      transition: 0.4s;
      background: rgba($color: #000000, $alpha: 0.7);
      .text {
        text-align: center;
        color: #eee;
        font-size: 14pt;
        font-weight: bold;
        text-transform: uppercase;
        padding: 5px;
      }
      .switch {
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: auto;
        box-sizing: border-box;
        color: #fff;
        cursor: pointer;
        flex-direction: column;
        width: 100%;
        height: 100%;
        input {
          display: none;
        }

        .mark-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          width: 0;
          height: 0;
          transition: 0.7s;
          border-color: #fff;
        }
      }
    }
  }
</style>
