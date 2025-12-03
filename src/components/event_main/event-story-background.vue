<template>
  <svg
    width="1600"
    height="900"
    viewBox="0 0 1600 900"
    style="width: 100%; height: 100%; margin-bottom: -5px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image
      :class="isSelectedUnit ? '' : 'blur '"
      href="/images/background_main/background-story.png"
    ></image>
  </svg>
</template>


<script>
export default {
  props: {
    isSelectedUnit: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.blur {
  filter: blur(3px);
}
</style>

