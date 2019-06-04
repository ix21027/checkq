<template>
  <div>
    <v-btn flat small @click="dialog = true">
      <v-icon left size="20">error</v-icon>
      Знайшли помилку ?
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
    <v-layout row wrap class="place" pa-3>
      <v-flex xs12 text-xs-center>
        Заголовок
      </v-flex>
      <v-flex xs12 >
        <v-textarea
          v-model="value"
          ref="txt"
          label="Коротко опишить помилку."
        >
        </v-textarea>
      </v-flex>
      <v-flex xs12 text-xs-right>
        <v-btn small @click="dialog = false">Відміна</v-btn>
        <v-btn small @click="sendMessage()" color="success">Відправити</v-btn>
      </v-flex>
    </v-layout>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      dialog: false,
      value: '',
    }
  },
  watch: {
    dialog(){
      if(!this.dialog){
        this.value = ' '
      }else{
        this.$nextTick(this.$refs.txt.focus)
      }
    }
  },
  methods: {
    ...mapActions([
      'Report'
      ]),
    sendMessage(){
      this.Report({mess: this.value});
      this.dialog = false;
    },
  },
}
</script>

<style scoped>
.place{
  background: #fff;
  border-radius: 2px;
}
</style>
