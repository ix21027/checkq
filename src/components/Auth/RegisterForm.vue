<template>
<v-flex xs12 sm8 md6 xl4 xl1>
  <v-form
    ref='form'
    v-model="valid"
    lazy-validation
    lazy
  >
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="Username"
      prepend-icon="fingerprint"
      validate-on-blur
    />

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      type="email"
      prepend-icon="email"
      autocomplete="username"
      validate-on-blur
    />

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      prepend-icon="lock"
      :type="passwordShow ? 'text' : 'password'"
      :append-icon="passwordShow ? 'visibility_off': 'visibility'"
      @click:append='passwordShow = !passwordShow'
      autocomplete='new-password'
      validate-on-blur
    />

    <v-text-field
      v-model="confirm"
      :rules="confirmRules"
      label="Confirm password"
      prepend-icon="autorenew"
      :type="confirmShow ? 'text' : 'password'"
      :append-icon="confirmShow ? 'visibility_off': 'visibility'"
      @click:append='confirmShow = !confirmShow'
      autocomplete='new-password'
      validate-on-blur
    />

    <v-layout justify-end wrap>
      <v-flex shrink>
        <v-btn
          flat
          to='privacy'
          target="_blank"
        >
          <v-icon
            left

          >error</v-icon>
          Політика конфеденційності
        </v-btn>
      </v-flex>
      <v-flex shrink>
        <v-btn @click="submit"
          :disabled="!valid"
          color='info'
        >
          Підтвердити
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</v-flex>

</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      valid: false,
      username: '',
      usernameRules: [
        v => !!v || 'Поле обовя\'зкове',
        v => v.length >= 3 || 'Мінімум 3 символа',
        v => v.length <= 15 || 'Максимум 15 символів',
      ],
      email: '',
      emailRules: [
        v => !!v || 'Поле обовя\'зкове',
        v=> !!(/^[a-z][a-zA-Z0-9_.]*(\.[a-zA-Z][a-zA-Z0-9_.]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?$/).test(v) || "Невірний формат пошти"
      ],
      password: '',
      passwordShow: false,
      passwordRules: [
        v => !!v || 'Поле обовя\'зкове',
        v => v.length >= 8 || 'Мінімум 8 символів',
      ],
      confirm: '',
      confirmShow: false,
      confirmRules: [
        v => v === this.password || 'Паролі не збігаються',
      ]
    }
  },
  methods: 
  {
    ...mapActions([
      'registration',
    ]),
    async submit() {
      this.validate();
      if (this.valid) {
        this.registration({
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm,
        });
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.valid = true
      } else {
        this.valid = false;
      }
    },
  },
  computed: {
    ...mapState({
      isRegister(state) {
        return state.user.isRegister;
      },
    })
  },
  watch: {
    isRegister(value) {
      if (value) {
        this.$router.push('/login');
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
