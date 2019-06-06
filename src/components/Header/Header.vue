<template>
  <v-toolbar app class="header">
      <div class="logo">
        <img src="../../assets/CheckQ.svg" alt="logo" @click="toHome">
      </div>
      <div class="links">
        <div class="control" v-if='!isAuth'>
          <v-btn flat to='/register' dark class="nav-btn">
            <v-icon>fingerprint</v-icon>
            <div class="nav-btn-text">Реєстрація</div>
          </v-btn>
          <v-btn flat to='/login' dark class="nav-btn">
            <v-icon>how_to_reg</v-icon>
            <div class="nav-btn-text">Вхід</div>
          </v-btn>
        </div>
        <div class="control" v-else>
          <div
            class="user-area"
            @click="signOut"
          >
            <div class="user-name">
              Taras Sh
            </div>
            <div class="user-icon">
              <img src="@/assets/logo.png" alt="">
            </div>
          </div>
        </div>
      </div>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      isAuth(state) {
        return state.user.isAuth;
      },
    }),

  },
  methods: {
    ...mapActions(['userSignOut']),
    toHome() {
      this.$router.push('/');
    },
    signOut() {
      this.userSignOut();
    }
  }
}
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

  .links {
    display: flex;
  }
  .control {
    display: flex;
    align-items: center;
  }

  .user-area {
    display: flex;
    align-items: center;
    margin-right: 1em;
    cursor: pointer;
  }

  .user-name {
    font-weight: bold;
    font-size: 14pt;
    color: $white;
    margin: 10px;
    @media screen and (max-width: 600px) {
      display: none;
    }
  }
  .user-icon {
    width: 40px;
    height: 40px;
    display: block;
    border-radius: 50px;
    border: 2px solid $orange;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      border-radius: 30px;
    }
  }
}

.nav-btn {
  @media screen and (max-width: 600px) {
    width: 40px !important;
    margin: 0;
    padding: 0;
  }
}

.nav-btn-text {
  @media screen and (max-width: 600px) {
    display: none;
  }
}

</style>
