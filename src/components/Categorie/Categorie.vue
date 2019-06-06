<template>
  <v-layout column wrap class="ctg-list">
    <v-layout row wrap>
      <div
        class="control-btn"
        @click="toggleAllSelect"
      >
        <v-icon>done_all</v-icon>
        <div class="text">
          Всі категорії
        </div>
      </div>
      <div
        class="control-btn"
        @click="random"
      >
        <v-icon>grain</v-icon>
        <div class="text">
          Випадково
        </div>
      </div>
    </v-layout>
      <div class="categorie-list">
        <app-categorie-item
          v-model='selectedCategories'
          :value="categorie"
          v-for="categorie in categories"
          :key="categorie.id"
        />
      </div>
    </v-layout>
</template>

<script>
import CategorieItem from './CategorieItem'
import { rand, randSelect } from '@/utils'


export default {
  data: () => {
    return {
      selectedCategories: [],
      test: [],
      prevRandNumber: 0,
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
      this.$emit('input', this.selectedCategories);
    },
    random() {
      const categorieNumber = (rand(1, this.categories.length) + this.prevRandNumber) % this.categories.length;
      const randomCategories = randSelect(categorieNumber, this.categories);
      this.selectedCategories = [...randomCategories.map(categorie => categorie.id)];
      this.$emit('input', this.selectedCategories);
    }
  },
  components: {
    appCategorieItem: CategorieItem,
  },
  watch: {
    selectedCategories(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

.categorie-list {
  display: flex;
  flex-wrap: wrap;
  & > * {
    flex: 1 0 auto;
    margin: $small-margin 0;
    @include tablet-portrait {

      flex: 0 1 calc(50% - 20px);
      &:nth-child(odd) {
        margin-right: 2*$small-margin;
      }
    }
  }
}

.control-btn{
  align-items: center;
  color: $main-color;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-left: $small-margin;
  margin-bottom: $small-margin;
  padding: $small-padding;
  position: relative;
  .text {
    position: relative;
  }
  .text::after {
    content: '';

    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: $main-color;
    border-radius: 2px;
    width: 0;
    transition: 0.4s;
  }

  .text:hover::after {
    width: 100%;
    left: 0;
  }

  .text {
    margin-left: 5px;
  }
}
</style>

