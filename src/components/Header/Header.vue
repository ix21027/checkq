<template>
  <v-toolbar app class="header" absolute>
    <div class="place">
      <div class="logo">
        <img src="../../assets/CheckQ.svg" alt="logo" @click="toHome">
      </div>
      <div class="links">
          <div @click="toBank" class="links-item">
             <v-icon color="white">work</v-icon>
             <div  class="links-item-text">
                Банк питань
             </div>
          </div>
          <div @click="toAbout" class="links-item">
            <v-icon color="white">contact_support</v-icon>
            <div class="links-item-text">
              Про сайт
            </div>
          </div>
      </div>
    </div>
  </v-toolbar>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['fetchBank']),
    toHome() {
      this.$router.push('/');
    },
    toAbout(){
      this.$router.push('/about')
    },
    toBank(){
      this.$router.push('/bank')
    }
  }
};
</script>

<style lang='scss'>
@import '@/styles/colors.scss';
@import '@/styles/mixin.scss';

.header {
  background: $black !important;
  display: flex;
  width: 100vw !important;
  &>* {
    width: 100%;
  }
  .place{
    display: flex;
    flex: 1 0 auto;
    justify-content: space-between;
    align-items: center;
    .logo {
      img {
        cursor: pointer;
      }
    }
    .links{
      display: flex;
      justify-items: center;
      flex-direction: row;
      color: white;
      &-item{
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 10px;
      }
      &-item-text{
        margin: auto 10px;
        @include mobile{
          display: none;
        }
     }
    }
  }
}
</style>
