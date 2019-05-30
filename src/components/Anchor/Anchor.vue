<template>
  <div class="anchor" v-scroll="handleScroll" >
    <v-icon size='50' @click="upper" color="primary">keyboard_arrow_up</v-icon>
  </div>
</template>

<script>
export default {
  methods: {
    upper(){
      window.scroll(0, 0);
    },
    handleScroll: function (evt, el) {
      console.log(window.scrollY)
      if (window.scrollY > 200) {
        el.setAttribute(
          'scrollActive',''
        )
      }else  if(el.hasAttribute('scrollActive')){
        el.removeAttribute('scrollActive')
      }
      return false
    }
  },
  directives: {
    scroll: {
      inserted: function (el, binding) {
        let f = function (evt) {
          if (binding.value(evt, el)) {
            window.removeEventListener('scroll', f)
          }
        }
        window.addEventListener('scroll', f)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$width-height: 50px;
.anchor{
  display: none;
  position: fixed;
  width: $width-height;
  height: $width-height;
  z-index: 10;
  margin: -$width-height/2 -$width-height/2;
  left: 95%;
  top: 95%;
  &[scrollActive]{
    display: block;
  }
}
</style>
