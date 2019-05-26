<template>
  <div class="watcher">
    <div class="loader" v-if="loading">
      <v-progress-linear
        indeterminate
        color="blue"
        :height="5"
      />
    </div>

    <div class="error">

    </div>
  </div>
</template>


<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'loading',
      'error',
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
    pointer-events: none;
    background: rgba($color: #000000, $alpha: 0.3);
  }
</style>
