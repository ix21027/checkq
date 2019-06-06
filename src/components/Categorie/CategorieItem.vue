<template>
  <div
    class="categorie-item"
    :class="{ selected: shouldBeChecked }"
    @click="updateInput"
  >
    <div class="checkbox" >
      <v-icon
        v-if='shouldBeChecked'
        color="white"
      >
        check
      </v-icon>
    </div>
    <div class="content">
    <div class="body">
      <div class="text-wrapper">
        {{ value.name }}
      </div>

    </div>
    <div class="test-count">{{value.question_count}}</div>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  props: {
    value: {
      type: Object,
    },
    selected: {
      default: false
    },
  },
  computed: {
    shouldBeChecked() {
      return this.selected.includes(this.value.id)
    }
  },
  methods: {
    updateInput() {
      let updateList = [...this.selected];

      if (this.shouldBeChecked) {
        updateList = updateList.filter(c => c !== this.value.id)
      } else {
        updateList.push(this.value.id);
      }

      this.$emit('change', updateList)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/theme.scss';

.categorie-item {
  border-radius: $block-border-radius;
  cursor: pointer;
  display: flex;
  height: 45px;
  width: 100%;
  max-width: 90vw;
  background: $inactive-color;
  &.selected {
    background: $main-color;
  }

  .checkbox {
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    width: 30px;
    min-width: 40px;

  }
  .content {
    display: flex;
    flex: 0 1 100%;
  }

  .body {
    flex: 1 1 100%;
    display: inline-flex;
    align-items: center;
    font-weight: bold;
    min-width: 0;

  }

  .test-count {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 40px;
  }
}
</style>
