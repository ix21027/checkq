<template>
    <app-show-result-item></app-show-result-item>
</template>

<script>
export default {
  components: {
    appShowResultItem: ()=> import('./../ShowResultItem/ShowResultItem')
  }
}
</script>