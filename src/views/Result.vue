<template>
  <v-container class="place" >
    <v-layout row wrap class="lay" my-2 >
      <v-flex xs12 sm10 md10 lg9 xl8 class="f">
      <h2><v-icon color="success" size="23">description</v-icon>
        РЕЗУЛЬТАТИ ТЕСТУ
      </h2>
      </v-flex>
    </v-layout>
      <v-layout row wrap class="lay2">
        <v-flex xs12 sm5 lg4>
          <v-layout row wrap>
            <v-flex xs6 my-1>ПИТАННЯ:</v-flex>
            <v-flex xs1 ><v-icon color="success" size="25">ballot</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2> 555555</v-flex>

            <v-flex xs6 my-1>ПРАВИЛЬНО:</v-flex>
            <v-flex xs1 ><v-icon color="success" size="25">check_circle</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>34423</v-flex>

            <v-flex xs6 my-1>НЕПРАВИЛЬНО:</v-flex>
            <v-flex xs1 ><v-icon color="error" size="25">error</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>3424</v-flex>

            <v-flex xs6 my-1>НЕ ДАНО ВІДПОВІДІ:</v-flex>
            <v-flex xs1 ><v-icon color="error" size="25">speaker_notes_off</v-icon></v-flex>
            <v-flex xs4 my-1 ml-2>43434</v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm7 lg8>
          <app-result-navigation></app-result-navigation>
        </v-flex>
      </v-layout>
      <v-layout v-for=" i in 5" :key="i" row wrap my-2>
        <app-show-result-test></app-show-result-test>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  components:{
    appShowResultTest: () => import('./../components/ShowResultTest/ShowResultTest'),
    appResultNavigation: () => import('./../components/ResultNavigation/ResultNavigation')
  }
}
</script>

<style lang='scss' scoped>
// .place{
//   background: red;
//   .lay{
//     background: #00f;
//   }
//   .lay2{
//     background: rgb(28, 137, 145);
//   }
//   .f{
//     background: #223;
//   }
// }
</style>
