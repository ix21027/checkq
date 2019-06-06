<template>
  <div>
    <v-btn flat small @click="dialog = true">
      <v-icon left>bug_report</v-icon>
      <div class="btn-text">
        Знайшли помилку ?
      </div>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="500px"
    >
    <div class="place">
    <v-layout row wrap class="">
      <v-flex class="report-control">
        <v-icon
          @click="dialog = false"
        >close</v-icon>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="place" pl-3 pr-3 pb-3 pt-2>
      <v-flex xs12 >
        <v-textarea
          v-model="value"
          ref="txt"
          color="black"
          label="Коротко опишіть помилку"
        >
        </v-textarea>
      </v-flex>
      <v-flex xs12 text-xs-right>
        <v-btn small @click="sendMessage" outline color="orange">Відправити</v-btn>
      </v-flex>
    </v-layout>
    </div>
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

<style lang="scss" scoped>
@import '@/styles/theme.scss';

.place{
  background: #fff;
  border-radius: 2px;
}
.report-control {
  padding: 5px 10px;
  background: $main-color;
}
@media (max-width: 600px){
  .btn-text{
    display: none;
  }
}

</style>
