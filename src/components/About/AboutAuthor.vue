<template>
<div class="author">

    <div class="author-name">
  {{name}}
  </div>
  <div class="author-link">
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <a target="_blank" v-on="on" :href="link">{{linkTitle}}</a>
      </template>
      <span>{{linkDescription}}</span>
    </v-tooltip>
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    linkTitle: {
      type: String,
      required: true,
    },
    linkDescription: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

.author {
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-indent: 0;
  margin: 10px;
  padding: 20px 10px;
  color: #fff;
  background: #333;
  border-radius: 2px;

}

.author-name {
  font-weight: bold;
  font-size: 12pt;
}

a {
  text-decoration: none;
  color: $light-primary-color !important;
  position: relative;
  &::after {
    position: absolute;
    bottom: -4px;
    content: '';
    display: inline-block;
    width: 100%;
    border-radius: 2px;
    height: 2px;
    background: $light-primary-color;
    width: 0;
    left: 0;
    transition: width 0.4s;
  }
  &:hover::after{
      width: 100%;
    }
}


</style>
