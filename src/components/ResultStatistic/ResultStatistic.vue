<template>
  <v-flex xs12 sm5 lg6 class="statistic">
    <v-layout column align-center justify-center class="statistic-main-info">
      <v-flex class="progress">
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
    <v-layout justify-center>
      <v-flex xs12 md10 lg5 >
        <div @click="startTest" class="btn-try-again">
          Пройти тест ще раз.
        </div>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import { mapActions } from 'vuex';
import { status } from '@/fetchapi'

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
    categories: {
      type: Array,
      required: true,
    },
    testCount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    persent() {
      let p = 0;
      if (this.total !== 0) {
        p = Math.floor((this.positive / this.total) * 100);
      }

      return p;
    }
  },
  methods: {
    ...mapActions([
      'fetchTests'
    ]),
    async startTest() {
      const r = await this.fetchTests({
        categories: this.categories,
        testCount: this.testCount
      });

      if (r.status === status.success) {
        this.$router.push('/test')
      }
      //TODO: handle error, r.status may error
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

.statistic {
  border: 2px solid $main-color;
  border-radius: $block-border-radius;
  padding: 10px;
  &-main-info {
    height: 90%;
    @include desktop{
      flex-direction: row;
      .progress {
        margin-right: 20px;
      }
    }
  }
  .btn-try-again{
    display: flex;
    justify-content: center;
    color: $background-color;
    background: $main-color;
    width: 100%;
    height: 100%;
    border-radius: $block-border-radius;
    cursor: pointer;
    &:hover{
      background: $side-color;
      color: $main-color;
    }
  }
}
</style>
