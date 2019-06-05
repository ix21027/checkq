<template>
  <v-flex xs12 sm5 lg6 class="statistic">
    <v-layout column align-center justify-center class="statistic-main-info">
      <v-flex>
        <v-layout justify-center align-center mb-3 fill-height>
            <v-flex>
              <v-progress-circular
                :value="persent"
                color="deep-orange"
                size="80"
                width="10"
                rotate="-90"
              >
                {{persent}}%
              </v-progress-circular>
            </v-flex>
        </v-layout>
      </v-flex>
      <v-flex>

    <v-layout row wrap align-end>
      <v-flex xs6 my-1 mr-2>Кількість питань:</v-flex>
      <v-flex xs4 my-1>{{total}}</v-flex>

      <v-flex xs6 my-1 mr-2>Правильно:</v-flex>
      <v-flex xs4 my-1>{{positive}}</v-flex>

      <v-flex xs6 my-1 mr-2>Невірно:</v-flex>
      <v-flex xs4 my-1>{{negative}}</v-flex>

      <v-flex xs6 my-1 mr-2>Без відповіді:</v-flex>
      <v-flex xs4 my-1>{{blank}}</v-flex>

      <v-flex xs6 my-1 mr-2>Час:</v-flex>
      <v-flex xs4 my-1>{{time}}</v-flex>
    </v-layout>
  </v-flex>
  </v-layout>
  </v-flex>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    positive: {
      type: Number,
      required: true,
    },
    negative: {
      type: Number,
      required: true,
    },
    blank: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  computed: {
    persent() {
      let p = 0;
      if (this.positive !== 0) {
        p = Math.floor((this.total / this.positive) * 100);
      }

      return p;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.statistic {
  border: 2px solid $main-color;
  border-radius: $block-border-radius;
  padding: 10px;
  &-main-info {
    height: 100%;
  }
}
</style>
