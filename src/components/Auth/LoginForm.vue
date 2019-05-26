<template>
<v-flex xs12 sm8 md6 xl4 xl1>
  <v-form
    ref='form'
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      :type="email"
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
      autocomplete='curr-password'
      validate-on-blur
    />

    <v-layout justify-end>
      <v-flex shrink>
        <v-btn
          flat
          to='privacy'
        >
          <v-icon left>error</v-icon>
          Забули пароль?
        </v-btn>
      </v-flex>
      <v-flex shrink>
        <v-btn @click="submit"
          :disabled="!valid"
          color='info'
        >
          Ввійти
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</v-flex>

</template>

<script>

export default {
  data() {
    return {
      valid: false,
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
      ]
    }
  },
  methods: {
    submit() {
      this.validate();
      if (this.valid) {
        const data = {
          email: this.email,
          password: this.password,
        }

        // eslint-disable-next-line
        console.log({user: data});
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.valid = true
      } else {
        this.valid = false;
      }
    },
  }
}
</script>
<style lang="scss" scoped>

</style>
