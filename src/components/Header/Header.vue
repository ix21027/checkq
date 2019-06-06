<template>
  <v-toolbar app class="header" absolute>
      <div class="logo">
        <img src="../../assets/CheckQ.svg" alt="logo" @click="toHome">
      </div>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    toHome() {
      this.$router.push('/');
    },
  }
 };
</script>

<style lang='scss'>
@import '@/styles/colors.scss';

.header {
  background: $black !important;
  display: flex;
  width: 100vw !important;
  &>* {
    width: 100%;
  }
  .logo {
    flex: 1 0 auto;
    img {
      cursor: pointer;
    }
  }
}
</style>
