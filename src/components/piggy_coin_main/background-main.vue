<template>
  <div>
    <svg
      width="1600"
      height="900"
      viewBox="0 0 1600 900"
      style="width: 100%; height: 100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <image
        v-if="!isStartGame"
        class="animate__animated animate__fadeIn"
        href="/images/background_main/background-alien-quest.webp"
      ></image>
      <image
        v-if="isStartGame"
        class="animate__animated animate__fadeIn animate__delay-1s"
        href="/images/background_main/background-alien-quest-start.webp"
      ></image>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    isStartGame: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
