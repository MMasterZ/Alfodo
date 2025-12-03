<template>
  <div class="fit">
    <div class="box-practice" v-if="!practiceData.isLoadingNextQuestion"></div>
  </div>
</template>

<script>
export default {
  components: {
    scoreBarPractice,
  },
  props: {
    // Store
    practiceStore: {
      default: () => {},
    },
    synchronizeStore: {
      default: () => {},
    },
    practiceData: {
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
