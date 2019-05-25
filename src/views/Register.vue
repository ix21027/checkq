<template>
  <v-layout column justify-center  md4>
    <v-flex mb-4>
      <h1>Реєстрація</h1>
    </v-flex>

    <app-register-form>
    </app-register-form>
  </v-layout>
</template>

<script>
import RegisterForm from '@/components/Auth/RegisterForm'
export default {

  components: {
    appRegisterForm: RegisterForm,
  }

}
</script>

<style>

</style>
