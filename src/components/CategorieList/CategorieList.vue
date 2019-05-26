<template>
  <v-layout column wrap class="ctg-list" pa-2 mt-3>
    <app-categorie-loader v-if='loading'></app-categorie-loader>
    <v-layout column wrap v-else>
      <v-layout row wrap>
        <v-btn @click="toggleAllSelect" v-if='categories.length > 1'>Вибрати все</v-btn>
      </v-layout>
      <v-layout wrap>
        <v-flex
          v-for="categorie in categories"
          :key="categorie.id"
          class="ctg-cart"
          :class="{select: selectedCategories.includes(categorie.id)}"
        >
          <img :src="categorie.avatar" alt="Фон категорії" class="ctg-img">
          <v-layout class="ctg-title" justify-center align-center>
            <label class='switch'>
              <div class="mark-icon">
                <v-icon
                  class="check-icon"
                  color="white">
                    check
                </v-icon>
              </div>
              <div class="text">
                  {{categorie.name}}
              </div>
              <input
                type="checkbox"
                :value="categorie.id"
                :label="categorie.name"
                v-model="selectedCategories"
              >
            </label>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>
import CategorieLoader from './CategorieLoader.vue';

export default {
  data: () => {
    return {
      selectedCategories: []
    }
  },
  props: [
    'categories',
    'loading'
  ],
  methods: {
    toggleAllSelect() {
      if (this.selectedCategories.length !== this.categories.length) {
        this.selectedCategories = this.categories.map(c => c.id);
      } else {
        this.selectedCategories = [];
      }

    }
  },
  watch: {
    selectedCategories() {
      this.$emit('input', this.selectedCategories);
    }
  },
  components: {
    appCategorieLoader: CategorieLoader,
  }
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

