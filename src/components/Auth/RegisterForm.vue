<template>
<v-flex xs12 md1 xs4>
  <v-form
    ref='form'
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      prepend-icon="email"
      required
    ></v-text-field>
    <v-text-field
      v-model="username"
      :rules="usernameRules"
      label="Username"
      required
      prepend-icon="fingerprint"
      autocomplete="username"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="Password"
      prepend-icon="lock"
      :type="passwordShow ? 'text' : 'password'"
      :append-icon="passwordShow ? 'visibility_off': 'visibility'"
      @click:append='passwordShow = !passwordShow'
      autocomplete='new-password'
    ></v-text-field>
    <v-text-field
      v-model="confirm"
      :rules="confirmRules"
      label="Confirm password"
      prepend-icon="autorenew"
      :type="confirmShow ? 'text' : 'password'"
      :append-icon="confirmShow ? 'visibility_off': 'visibility'"
      @click:append='confirmShow = !confirmShow'
      autocomplete='new-password'
    ></v-text-field>
    <v-layout row justify-space-between wrap>
      <v-flex class="reet">
        <v-btn
          flat
          to='privacy'
        >
          <v-icon left>error</v-icon>
          Політика конфеденційності
        </v-btn>
      </v-flex>
      <v-flex class="root" align-center>
        <v-btn @click="submit"
          :disabled="!valid"
          color='info'
        >
          submit
        </v-btn>
      </v-flex> 
    </v-layout>
  </v-form>
</v-flex>

</template>

<script>
// import validateConfig from '@/config/validation'

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
        v => v.length > 8 || 'Мінімум 8 символів',
      ],
      confirm: '',
      confirmShow: false,
      confirmRules: [
        v => v === this.password || 'Паролі не збігаються',
      ]
    }
  },
  methods: {
    submit() {
      this.validate();
      if (this.valid) {
        const data = {
          username: this.username,
          email: this.email,
          password: this.password,
          password_confirmation: this.confirm,
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
  .root {
    background: red;
  }

  .reet {
    background: green;
  }
</style>
