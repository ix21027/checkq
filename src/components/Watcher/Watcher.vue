<template>
  <div class="watcher">
          <!-- {{errors}} -->
    <div class="loader" v-if="loading || loader.length !== 0">
      <v-progress-linear
        indeterminate
        color="#FFB951"
        :height="5"
      />
    </div>
    <div class="error-log">
      <div v-for='(error, i) in errors' :key='i'>
        <app-error-item
          :error="error"
          :index="i"
        >
        </app-error-item>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import errorItem from '@/components/errorItem/errorItem'

export default {
  computed: {
    ...mapState([
      'loading',
      'loader',
      'errors',
    ]),
  },
  components:{
    appErrorItem: errorItem,
  },
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
}
</style>
