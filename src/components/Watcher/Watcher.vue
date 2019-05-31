<template>
  <div class="watcher">
          <!-- {{errors}} -->
    <div class="loader" v-if="loading">
      <v-progress-linear
        indeterminate
        color="blue"
        :height="5"
      />

    </div>

    <div class="error-log">
      <div class="error-item" v-for='(error, i) in errors' :key='i'>{{error}}</div>
    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'loading',
      'errors',
    ]),
  }
}
</script>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    width: 100vw;
    height: calc(100vh + 15px);
    left: 0;;
    top: -15px;
    z-index: 2;
    background: rgba($color: #000000, $alpha: 0.3);
  }
  .error-log {
    position: fixed;
    z-index: 10;
    right: 0;
    bottom: 0;
    padding: 10px;
    .error-item {
      background: rgba(255, 78, 78, 0.356);
      padding: 10px;
      border-radius: 2px;
      font-weight: bold;
    }
  }
</style>
