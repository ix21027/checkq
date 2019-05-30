<template>
  <div class="anchor">
    <v-icon size='50' @click="upper" color="primary">keyboard_arrow_up</v-icon>
  </div>
</template>

<script>
export default {
  methods: {
    upper(){
      window.scroll(0, 0);
    },
  },
}
</script>

<style lang="scss" scoped>
$width-height: 50px;
.anchor{
  position: fixed;
  width: $width-height;
  height: $width-height;
  z-index: 10;
  margin: -$width-height/2 -$width-height/2;
  left: 95%;
  top: 95%;
}
</style>
