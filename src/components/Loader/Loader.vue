<template>
  <div>
    <div v-if="error">
      <v-dialog
        v-model="errorDialog"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline grey lighten-2"
            primary-title
          >
            Сталась помилка
          </v-card-title>

        <v-card-text>
          Не вдалось завантажити сторінку. Спробуйте ще раз.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="errorDialog = false"
          >
            Закрити
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
    <div v-else-if='!ready'>
      <div class="loader">
          <v-progress-linear
            centered
            indeterminate
            color="blue"
            :height="5"
          />
      </div>
    </div>
    <div v-else>
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    ready: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      errorDialog: this.error,
    }
  }
}
</script>

<style lang="scss" scoped>
  .loader {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.2);
    top: -15px;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;
  }
</style>


