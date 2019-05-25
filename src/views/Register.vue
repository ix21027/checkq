<template>
  <v-layout fill-height>
    <v-flex>
      <v-flex text-xs-center>
        <h1>Реєстрація</h1>
      <v-layout row wrap justify-center>
        <app-register-form>
        </app-register-form>
      </v-layout>
      </v-flex>

    </v-flex>

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
