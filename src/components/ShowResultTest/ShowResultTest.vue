<template>
  <v-layout row wrap @click="changeShape" :class="{
    bord: true,
    good: correctnes,
    mist: !correctness,
    }">
    <v-flex xs12 pa-3 :class="{
      bord: !shape,
      bordTop: shape
    }">
      <v-layout row wrap>
        <v-flex xs11>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est odit nihil neque ad autem excepturi molestias 
          quo sunt molestiae corporis! Ipsam, accusamus soluta tempore nisi rem iste possimus asperiores. Voluptatum!
        </v-flex>
        <v-flex xs1>
          <v-layout row wrap justify-end>
            <!-- <v-flex xs1 mr-1><img src="./../../assets/dot.svg"></v-flex> -->
            <v-flex xs1 mr-1 class="icon"></v-flex>
            <v-flex xs1 mr-1 class="icon"></v-flex>
            <v-flex xs1 mr-1 class="icon"></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 pa-3 :class="{
      close: !shape,
      open: shape,
      bordBot: shape,
    }">
      lolololololllllllllllllllllllllllllllllllllllllllllll
    </v-flex>
  </v-layout>
</template>

<script>
// <v-icon>equalizer</v-icon>

export default {
  data() {
    return {
      shape: false,// закрытая форма
    }
  },
  computed: {
    correctness(){
      return true;
    }
  },
  methods: {
    changeShape(){
      return this.shape = !this.shape
    }
  },
}
</script>

<style lang="scss" scoped>
.icon{
  background-image: url('./../../assets/dot.svg');
  height: 5px;
}
.bordTop{
  border-radius: 5px 5px 0 0;
}
.bord{
  border-radius: 5px;
  transition: 0.7s ease;
}
.bordBot{
  border-radius: 0 0 5px 5px;
}
.good{
  background: rgb(157, 249, 155);
}
.mist{
  background: rgb(255, 152, 142);
}
.close{
  line-height: 0;
  height: 0 ;
  overflow: hidden;
  zoom: 1;
  padding: 0 !important;
  transition: 0.5s ease;
}
.open{
  height: auto;
  transition: 0.5s ease;
}
</style>