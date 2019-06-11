<template>
  <div class="tab-info">
      <div
        class="logo"
        :class="{left}"
      >
      <img :src="imgSrc" alt="background img">
      </div>
      <div class="content">
        <div class="head">{{header}}</div>
        <div class="body">
          <slot></slot>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    header: {
      type: String,
      default: '',
    },
    right: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/theme.scss';
@import '@/styles/mixin.scss';

.tab-info {
  display: flex;
  background: $side-color;
  min-height: 250px;
  align-items: flex-start;
  color: #fff;
  max-width: 900px;
  width: 100%;
  padding: 30px 20px;
  position: relative;
  flex: 1 0 auto;
  align-items: stretch;
  overflow: hidden;
  margin: 0 auto;
  border-bottom: 2px dashed #333;
  @include mobile {
    flex-direction: column;
    align-items: center;
    margin-bottom: 0;
    padding: 10px 0;

  }
  .logo {
    width: 250px;
    min-width: 250px;
    position: relative;
    order: 1;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    &.left {
      order: 3;
      @include mobile {
        order: 1;
      }
    }
    img {
      width: 100%;
      z-index: 0;
    }
  }
  .content {
    flex: 1 1 auto;
    padding: 30px;
    height: 100%;
    order: 2;
  }
  .head {
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    color: $main-color;
    margin-bottom: 20px;
  }
  .body {
    text-indent: 20px;
    position: relative;
    z-index: 10;
    line-height: 30px;
    @include mobile {

      max-width: 100vw;
      width: 100vw;
      padding: 0 20px;
    }
    }
}
</style>
