<template>
  <div class="radio-button">
    {{value}}
  </div>
</template>

<script>
export default {
  props: ['value'],
}
</script>

<style lang="scss" scoped>
$size: 20px;

.radio-button {
  width: $size;
  height: $size;
  background: red;
}
</style>
