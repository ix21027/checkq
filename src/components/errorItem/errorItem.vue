<template>
  <div class="error-item" >
    <v-layout row wrap align-center>
      <v-flex xs11>
        {{error.title}}
      </v-flex>
      <v-flex xs1>
        <v-icon @click="close" class="btn-close">close</v-icon>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      death: false,
      timeoutId: 0,
    }
  },
  created(){
    this.delete()
  },
  props: {
    error:{
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations([
      'deleteError'
    ]),
    close(){
      clearTimeout(this.timeoutId)
      this.deleteError({id: this.error.id})
    },
    delete(){
      this.timeoutId = setTimeout(function(id, fun){
        fun({id})
      },4000,this.error.id, this.deleteError)
    }
  },
}
</script>

<style lang='scss' scoped>
@import '@/styles/colors.scss';
@import '@/styles/theme.scss';

.btn-close{
  color: $background-color;
}
.error-item {
  background: rgba($red, 0.9);
  padding: 10px;
  margin-bottom: 3px;
  border-radius: 2px;
  font-weight: bold;
}
</style>
