<template>
  <div class="row" style="width: 70%; height: 100%; margin: auto">
    <div
      class="col self-center relative-position"
      style="height: 70%"
      v-for="i in 5"
    >
      <div
        class="absolute-center line-wave animation-playing-audio"
        :class="
          i == 3
            ? ''
            : i == 1
            ? 'left-1'
            : i == 2
            ? 'left-2'
            : i == 4
            ? 'right-2'
            : 'right-1'
        "
      ></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// #region Animation

.line-wave {
  width: 70%;
  height: 100%;
  background-color: #4a261b;
  border-radius: 20px;
  animation-delay: 0.5s;
}

.line-wave.left-1 {
  left: 30%;
  height: 40%;
  animation-delay: 0.3s;
}

.line-wave.left-2 {
  left: 40%;
  height: 60%;
  animation-delay: 0.1s;
}

.line-wave.right-2 {
  left: 60%;
  height: 60%;
  animation-delay: 0.1s;
}

.line-wave.right-1 {
  left: 70%;
  height: 40%;
  animation-delay: 0.3s;
}

.animation-playing-audio {
  animation: waveAudio 0.3s infinite alternate;
  transform-origin: center;
}

@keyframes waveAudio {
  to {
    height: 15%;
  }
}
// #endregion
</style>
