<template>
  <div
    :class="{ open, correct }"
    class="accordion"
  >
    <div
      class="head"
      @click="open = !open"
    >
      <div>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est odit nihil neque ad autem excepturi molestias
        quo sunt molestiae corporis! Ipsam, accusamus soluta tempore nisi rem iste possimus asperiores. Voluptatum!
      </div>
      <div class="icon">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
    <div
      class="body"
    >
      <div v-for=" i in 4" :key="i" class="option">
        <div class="circle check">
          <div class="dotc"></div>
        </div>
        <div class="option-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde aut similique omnis ad velit nemo corporis numquam reiciendis amet fugiat veniam doloremque, ducimus soluta facere qui nobis nulla, sed magnam!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,// закрытая форма
    }
  },
  computed: {
    correct(){
      return true;
    }
  }
}
</script>


<style lang="scss" scoped>

$dot-radius: 5px;
.option{
  display: flex;
  position: relative;
  padding: 5px 0;
  .option-text{
    width: 95%;
  }
  .circle {
    margin: 10px;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #444;
    border-radius: 20px;
    &.check {
      .dotc {
        display: block;
      }
    }
    .dotc {
      display: none;
      width: 10px;
      height: 10px;
      background: #444;
      border-radius: 20px;
    }
  }
}
.accordion {
  background: #FFCCCC;
  &.correct {
    background: #9DF99B;
  }
  border-radius: 2px;
  line-height: 20px;
  padding: 15px;
  .head {
    display: flex;
    font-weight: bold;
    cursor: pointer;
  }
  .body {
    padding: 0;
    max-height: 0;
    transition: 0.4s;
    overflow: hidden;
  }
  &.open {
    .body {
      padding: 20px 0;
      max-height: 100vh;
      transition: 1s;
    }
    .dot {
      &:nth-child(even){
        top: 5px;
      }
      &:nth-child(odd) {
        top: 10px;
      }
    }
  }
}
.icon {
  display: flex;
  height: 20px;
  position: relative;
}
.dot {
  position: relative;
  top: 7px;
  width: $dot-radius;
  height: $dot-radius;
  background: #444;
  border-radius: $dot-radius;
  margin: 0 1px;
  transition: 0.4s;
  &:nth-child(even){
    top: 10px;
  }
  &:nth-child(odd) {
    top: 5px;
  }
}

</style>