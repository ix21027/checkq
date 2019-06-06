<template>
  <v-layout fill-height pa-3>
    <v-flex>
      <v-flex text-xs-center>
        <h1>Вхід</h1>
        <v-layout row wrap justify-center>
          <app-login-form>
          </app-login-form>
        </v-layout>
      </v-flex>
    </v-flex>
  </v-layout>
</template>


<script>
import LoginForm from '@/components/Auth/LoginForm.vue'
export default {
  components: {
    appLoginForm: LoginForm,
  }

}
</script>

<style>

</style>
