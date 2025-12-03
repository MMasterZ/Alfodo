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
        href="/images/piggy_coin_main/piggy-coin-background-main.png"
      ></image>
      <image
        v-if="isStartGame"
        class="animate__animated animate__fadeIn animate__delay-1s"
        href="/images/piggy_coin_main/piggy-coin-background-game.png"
      ></image>
    </svg>

    <!-- <svg
      width="800"
      height="1000"
      viewBox="0 0 800 1000"
      style="width: 100%; height: 100%"
      xmlns="http://www.w3.org/2000/svg"
      v-if="platform.mobile"
    >
      <image
        v-if="!isStartGame"
        class="animate__animated animate__fadeIn"
        href="/images/piggy_coin_main/piggy-coin-background-main-mobile.png"
      ></image>

      <image
        v-if="isStartGame"
        class="animate__animated animate__fadeIn animate__delay-1s"
        href="/images/piggy_coin_main/piggy-coin-background-game-mobile.png"
      ></image>
    </svg> -->
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
