<template>
  <svg
    width="1600"
    height="900"
    viewBox="0 0 1600 900"
    style="width: 100%; height: 100%; margin-bottom: -5px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- #region Background -->
    <image href="/images/background_main/background-gacha-pon-base.png"></image>
    <!-- #endregion -->

    <!-- #region Ring light -->
    <g id="animation-ring-light" style="display: none">
      <image href="/images/gacha_main/gacha-animation-ring-light.png"></image>
    </g>
    <!-- #endregion -->

    <!-- #region base -->
    <g>
      <image href="/images/gacha_main/gacha-grass.png"></image>
      <image
        id="animation-light-open"
        style="display: none"
        href="/images/gacha_main/gacha-light.png"
      ></image>
      <image href="/images/gacha_main/gacha-stand.png"></image>
      <g>
        <image href="/images/gacha_main/gacha-animation-stand-star.png"></image>
      </g>
      <g>
        <image
          v-show="isShowGachaBox"
          class="animation-stand-star"
          href="/images/gacha_main/gacha-animation-pole-light-bottom.png"
        ></image>
        <image href="/images/gacha_main/gacha-pole.png"></image>
        <image
          v-show="isShowGachaBox"
          class="animation-stand-star"
          href="/images/gacha_main/gacha-animation-pole-light-top.png"
        ></image>
      </g>
    </g>
    <!-- #endregion -->

    <!-- #region Animation Open Box And Light -->
    <g v-show="isShowGachaBox">
      <!-- #region mystery box  -->
      <g id="mystery-box" style="display: none" v-if="gachaData">
        <image :href="`/images/gacha_main/gacha-box-${gachaData.type}-close.png`"></image>
        <image
          :href="`/images/gacha_main/gacha-box-${gachaData.type}-open.png`"
          style="display: none"
          id="mystery-box-open"
        ></image>
        <g style="display: none" id="mystery-box-light-open">
          <image href="/images/gacha_main/gacha-light-open-center.png"></image>
          <image
            class="animation-box-light"
            href="/images/gacha_main/gacha-light-open-left.png"
          ></image>
          <image
            class="animation-box-light"
            href="/images/gacha_main/gacha-light-open-right.png"
          ></image>
        </g>
        <g style="display: none" id="mystery-box-light-open-limited">
          <image href="/images/gacha_main/gacha-light-open-center-limited.png"></image>
          <image
            class="animation-box-light"
            href="/images/gacha_main/gacha-light-open-left-limited.png"
          ></image>
          <image
            class="animation-box-light"
            href="/images/gacha_main/gacha-light-open-right-limited.png"
          ></image>
        </g>
        <image :href="`/images/gacha_main/gacha-box-${gachaData.type}.png`"></image>
      </g>
      <!-- #endregion -->

      <!-- #region Background Dialog Item ward -->
      <g
        id="animation-background-light"
        style="display: none"
        class="animation-background-light"
      >
        <image href="/images/background_main/background-dialog-item-reward.png"></image>
      </g>
      <!-- #endregion -->

      <!-- #region Animation light limited -->
      <g
        id="animation-light-limited"
        style="display: none"
        class="animation-light-limited"
      >
        <image href="/images/gacha_main/gacha-light-limited.png"></image>
      </g>
      <!-- #endregion -->

      <!-- #region Backdrop limited -->
      <g
        id="animation-backdrop-limited"
        style="display: none"
        class="animation-backdrop-limited"
      >
        <image href="/images/gacha_main/gacha-backdrop-limited.png"></image>
      </g>
      <!-- #endregion -->

      <!-- #region Animation light -->
      <g v-if="isLimited && isShowAnimationLightLimited">
        <g>
          <image
            class="animation-ring-light-circle"
            href="/images/gacha_main/gacha-ring-light-circle-limited.png"
          ></image>
          <image
            class="animation-ring-light-circle-limited"
            href="/images/gacha_main/gacha-ring-light-limited.png"
          ></image>
        </g>
      </g>

      <g
        style="display: none"
        id="animation-ring-light-circle"
        class="animation-ring-light-circle"
      >
        <image href="/images/gacha_main/gacha-ring-light-circle.png"></image>
      </g>

      <g
        style="display: none"
        id="animation-ring-light-circle-finish"
        class="animation-ring-light-circle-finish"
      >
        <image href="/images/gacha_main/gacha-ring-light-circle.png"></image>
      </g>

      <!-- #endregion -->
    </g>
    <!-- #endregion -->

    <!-- #region Animation cloud -->
    <g>
      <g class="animation-cloud-right" :class="isAnimationCloud ? 'reverse' : ''">
        <image href="/images/gacha_main/gacha-animation-cloud-right.png"></image>
      </g>

      <g class="animation-cloud-left" :class="isAnimationCloud ? 'reverse' : ''">
        <image href="/images/gacha_main/gacha-animation-cloud-left.png"></image>
      </g>
    </g>
    <!-- #endregion -->
  </svg>
</template>

<script setup>
import { useQuasar } from "quasar";
import { useSystemStore } from "src/stores/system";
import { ref, watch } from "vue";

const props = defineProps({
  isShowAnimationOpenBox: {
    type: Boolean,
    default: false,
  },
  isShowGachaBox: {
    type: Boolean,
    default: false,
  },
  gachaData: {
    type: Object,
    default: {
      type: "standard",
    },
  },
  isTutorial: {
    type: Boolean,
    default: false,
  },
  isLimited: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["callback-itemReward"]);

const $q = useQuasar();

let listenGachaBox = null;
watch(
  () => props.isShowGachaBox,
  () => {
    if (props.isShowGachaBox) {
      if (listenGachaBox) {
        clearTimeout(listenGachaBox);
        listenGachaBox = null;
      }

      listenGachaBox = setTimeout(() => {
        funcShowMysteryBox();
      }, 1000);
    } else {
      funcClearAnimation();
    }
  }
);

let listenOpenBox = null;
watch(
  () => props.isShowAnimationOpenBox,
  () => {
    if (props.isShowAnimationOpenBox) {
      if (listenOpenBox) {
        clearTimeout(listenOpenBox);
        listenOpenBox = null;
      }

      listenOpenBox = setTimeout(() => {
        funcSetAnimationOpenBox();
      }, 1000);
    }
  }
);

watch(
  () => props.gachaData,
  () => {
    if (props.gachaData?.isDrawAgain) {
      funcDrawAgain();
    }
  }
);

const isFinishAnimation = ref(false);
const isAnimationCloud = ref(false);
const isShowAnimationLightLimited = ref(false);
const isHoldAnimation = ref(false);

let timeoutMysteryBox = null;
let timeoutAnimtionBox = null;
let timeoutAnimationShakeBox = null;
let timeoutAnimationOpenBox = null;
let timeoutAnimationLightBox = null;
let timeoutReward = null;
let elAnimationLightLimited = null;
let elAnimationBackDropLimited = null;
let elAnimationBackgroundLight = null;

let elMysteryBox = null;
let elMysteryBoxOpen = null;
let elMysteryBoxLightOpen = null;
let elMysteryBoxLightOpenLimited = null;
let elAnimationRingLightCircle = null;
let elAnimationRightLightCircleFinish = null;
let elAnimationRingLight = null;
let elAnimationLightOpen = null;

const funcShowMysteryBox = () => {
  const systemStore = useSystemStore();

  systemStore.stopSound();

  // Element
  elMysteryBox = document.getElementById("mystery-box");
  elAnimationRingLightCircle = document.getElementById("animation-ring-light-circle");
  elAnimationRingLight = document.getElementById("animation-ring-light");
  elAnimationLightOpen = document.getElementById("animation-light-open");

  isAnimationCloud.value = true;

  if (timeoutMysteryBox) {
    clearTimeout(timeoutMysteryBox);
    timeoutMysteryBox = null;
  }

  timeoutMysteryBox = setTimeout(() => {
    elMysteryBox.classList.add("animation-show-box");
    elMysteryBox.style.display = "block";

    timeoutAnimtionBox = setTimeout(() => {
      elMysteryBox.classList.remove("animation-show-box");
      elMysteryBox.classList.add("animation-shake-box");

      elAnimationRingLightCircle.style.display = "block";

      elAnimationRingLight.style.display = "block";
      elAnimationRingLight.classList.add("animation-ring-light");

      elAnimationLightOpen.style.display = "block";
      elAnimationLightOpen.classList.add("animation-light-open");
    }, 700);
  }, 500);
};

const funcSetAnimationOpenBox = () => {
  const systemStore = useSystemStore();

  systemStore.stopSound();

  isFinishAnimation.value = false;
  isHoldAnimation.value = false;

  // Element
  elMysteryBoxOpen = document.getElementById("mystery-box-open");
  elMysteryBoxLightOpen = document.getElementById("mystery-box-light-open");
  elMysteryBoxLightOpenLimited = document.getElementById(
    "mystery-box-light-open-limited"
  );

  elAnimationRightLightCircleFinish = document.getElementById(
    "animation-ring-light-circle-finish"
  );

  elAnimationLightLimited = document.getElementById("animation-light-limited");
  elAnimationBackgroundLight = document.getElementById("animation-background-light");
  elAnimationBackDropLimited = document.getElementById("animation-backdrop-limited");

  // Animation
  elMysteryBox.classList.remove("animation-shake-box");

  elAnimationRingLightCircle.style.display = "none";

  if (timeoutAnimationOpenBox) {
    clearTimeout(timeoutAnimationOpenBox);
    timeoutAnimationOpenBox = null;
  }

  timeoutAnimationOpenBox = setTimeout(() => {
    elMysteryBoxOpen.style.display = "block";
    let timeout = 500;
    timeoutAnimationLightBox = setTimeout(() => {
      if (props.isLimited) {
        elMysteryBoxLightOpenLimited.style.display = "block";
        isShowAnimationLightLimited.value = true;
        timeout = 700;
      } else {
        elMysteryBoxLightOpen.style.display = "block";
      }

      clearTimeout(timeoutMysteryBox);
      clearTimeout(timeoutAnimtionBox);
      clearTimeout(timeoutAnimationShakeBox);
      clearTimeout(timeoutAnimationOpenBox);
      clearTimeout(timeoutAnimationLightBox);
      timeoutReward = setTimeout(() => {
        elAnimationRightLightCircleFinish.style.display = "block";
        elAnimationLightOpen.style.display = "none";
        isFinishAnimation.value = true;
        elMysteryBoxLightOpen.style.display = "none";
        elMysteryBoxLightOpenLimited.style.display = "none";
        if (props.isLimited) {
          elAnimationLightLimited.style.display = "block";
          if ($q.platform.is.desktop) {
            elAnimationBackDropLimited.style.display = "block";
          }
          systemStore.playEffect("gacha-get-special-reward");
        } else {
          systemStore.playEffect("gacha-get-common-reward");
        }
        if ($q.platform.is.desktop) {
          elAnimationBackgroundLight.style.display = "block";
        }
        emit("callback-itemReward");
        isShowAnimationLightLimited.value = false;
        clearTimeout(timeoutReward);
      }, timeout);
    }, 100);
  }, 500);
};

const funcClearAnimation = () => {
  console.log("Clear Animation");
  if (elMysteryBox) {
    elMysteryBox.style.display = "none";
    elMysteryBox.classList.remove("animation-show-box");
    elMysteryBox.classList.remove("animation-shake-box");
  }

  if (elMysteryBoxOpen) elMysteryBoxOpen.style.display = "none";
  if (elMysteryBoxLightOpen) elMysteryBoxLightOpen.style.display = "none";
  if (elMysteryBoxLightOpenLimited) elMysteryBoxLightOpenLimited.style.display = "none";
  if (elAnimationRingLight) {
    elAnimationRingLight.style.display = "none";
    elAnimationRingLight.classList.remove("animation-ring-light");
  }
  if (elAnimationLightOpen) {
    elAnimationLightOpen.style.display = "none";
    elAnimationLightOpen.classList.remove("animation-light-open");
  }
  if (elAnimationRingLightCircle) elAnimationRingLightCircle.style.display = "none";
  if (elAnimationRightLightCircleFinish)
    elAnimationRightLightCircleFinish.style.display = "none";
  if (elAnimationLightLimited) elAnimationLightLimited.style.display = "none";
  if (elAnimationBackDropLimited) elAnimationBackDropLimited.style.display = "none";
  if (elAnimationBackgroundLight) elAnimationBackgroundLight.style.display = "none";

  isAnimationCloud.value = false;

  clearTimeout(timeoutMysteryBox);
  clearTimeout(timeoutAnimtionBox);
  clearTimeout(timeoutAnimationShakeBox);
  clearTimeout(timeoutAnimationOpenBox);
  clearTimeout(timeoutAnimationLightBox);
  clearTimeout(timeoutReward);
  clearTimeout(listenGachaBox);

  return;
};

const funcDrawAgain = () => {
  elMysteryBox.style.display = "none";
  elMysteryBoxOpen.style.display = "none";
  elMysteryBoxLightOpen.style.display = "none";
  elMysteryBoxLightOpenLimited.style.display = "none";
  elAnimationRightLightCircleFinish.style.display = "none";
  elAnimationLightLimited.style.display = "none";
  elAnimationBackDropLimited.style.display = "none";
  elAnimationBackgroundLight.style.display = "none";

  if (listenGachaBox) {
    clearTimeout(listenGachaBox);
    listenGachaBox = null;
  }

  listenGachaBox = setTimeout(() => {
    funcShowMysteryBox();
  }, 1000);
};
</script>

<style lang="scss" scoped>
// #region Animation
.animation-cloud-left {
  animation: cloudLeft 1s forwards 0.5s;
  -webkit-animation: cloudLeft 1s forwards 0.5s;
  -moz-animation: cloudLeft 1s forwards 0.5s;

  transform: translateX(-100vh);
  -webkit-transform: translateX(-100vh);
  -moz-transform: translateX(-100vh);
}

@keyframes cloudLeft {
  to {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
    -moz-transform: translateX(0px);
  }
}

.animation-cloud-right {
  animation: cloudRight 1s forwards 0.5s;
  -webkit-animation: cloudRight 1s forwards 0.5s;
  -moz-animation: cloudRight 1s forwards 0.5s;

  transform: translateX(100vh);
  -webkit-transform: translateX(100vh);
  -moz-transform: translateX(100vh);
}

@keyframes cloudRight {
  to {
    transform: translateX(0px);
    -webkit-transform: translateX(0px);
    -moz-transform: translateX(0px);
  }
}

.animation-cloud-left.reverse {
  animation: cloudLeftReverse 1s forwards;
  -webkit-animation: cloudLeftReverse 1s forwards;
  -moz-animation: cloudLeftReverse 1s forwards;

  transform: translateX(0px);
  -webkit-transform: translateX(0px);
  -moz-transform: translateX(0px);
}

@keyframes cloudLeftReverse {
  to {
    transform: translateX(-100vh);
    -webkit-transform: translateX(-100vh);
    -moz-transform: translateX(-100vh);
  }
}

.animation-cloud-right.reverse {
  animation: cloudRightReverse 1s forwards;
  -webkit-animation: cloudRightReverse 1s forwards;
  -moz-animation: cloudRightReverse 1s forwards;

  transform: translateX(0px);
  -webkit-transform: translateX(0px);
  -moz-transform: translateX(0px);
}

@keyframes cloudRightReverse {
  to {
    transform: translateX(100vh);
    -webkit-transform: translateX(100vh);
    -moz-transform: translateX(100vh);
  }
}

// #endregion

.animation-ring-light {
  animation: ringLight 2.4s ease-in-out forwards;
  -moz-animation: ringLight 2.4s ease-in-out forwards;
  -webkit-animation: ringLight 2.4s ease-in-out forwards;
}

@keyframes ringLight {
  15% {
    opacity: 0.5;
  }
  20% {
    opacity: 1;
  }
  25% {
    opacity: 0.5;
  }
  30% {
    opacity: 1;
  }
  35% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animation-show-box {
  animation: showBox 0.5s forwards;
  -webkit-animation: showBox 0.5s forwards;
  -moz-animation: showBox 0.5s forwards;

  transform: translateY(-100vh);
  -webkit-transform: translateY(-100vh);
  -moz-transform: translateY(-100vh);
  opacity: 0;
}

@keyframes showBox {
  50% {
    opacity: 0;
  }
  to {
    opacity: 1;

    transform: translateY(0px);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
  }
}

.animation-shake-box {
  animation: shakeBox 0.5s forwards alternate-reverse infinite;
  -webkit-animation: shakeBox 0.5s forwards alternate-reverse infinite;
  -moz-animation: shakeBox 0.5s forwards alternate-reverse infinite;

  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;
}

@keyframes shakeBox {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  20% {
    transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
  }
  40% {
    transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
  }
  60% {
    transform: rotate(5deg);
    -webkit-transform: rotate(5deg);
    -moz-transform: rotate(5deg);
  }
  80% {
    transform: rotate(-5deg);
    -webkit-transform: rotate(-5deg);
    -moz-transform: rotate(-5deg);
  }
  100% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
}

.animation-ring-light-circle {
  animation: ringLightCircle 0.7s ease-in-out alternate-reverse infinite;
  -webkit-animation: ringLightCircle 0.7s ease-in-out alternate-reverse infinite;
  -moz-animation: ringLightCircle 0.7s ease-in-out alternate-reverse infinite;

  transform: scale(0.1);
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  opacity: 0;
}

@keyframes ringLightCircle {
  0% {
    opacity: 0;
  }
  60% {
    opacity: 1;
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
  }
}

.animation-ring-light-circle-finish {
  animation: ringLightCircleFinish 0.5s ease-in-out alternate-reverse infinite;
  -webkit-animation: ringLightCircleFinish 0.5s ease-in-out alternate-reverse infinite;
  -moz-animation: ringLightCircleFinish 0.5s ease-in-out alternate-reverse infinite;

  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;

  opacity: 0;
}

@keyframes ringLightCircleFinish {
  0% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.animation-light-open {
  animation: lightOpen 0.5s ease-in-out alternate-reverse forwards infinite;
  -webkit-animation: lightOpen 0.5s ease-in-out alternate-reverse forwards infinite;
  -moz-animation: lightOpen 0.5s ease-in-out alternate-reverse forwards infinite;

  opacity: 0;
}

@keyframes lightOpen {
  to {
    opacity: 0.5;
  }
}

.animation-box-light {
  animation: boxLight 0.5s ease-in-out alternate-reverse forwards infinite;
  -webkit-animation: boxLight 0.5s ease-in-out alternate-reverse forwards infinite;
  -moz-animation: boxLight 0.5s ease-in-out alternate-reverse forwards infinite;

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  transform: rotateY(0deg);
  -webkit-transform: rotateY(0deg);
  -moz-transform: rotateY(0deg);

  opacity: 0;
}

@keyframes boxLight {
  to {
    opacity: 0.5;
    transform: rotateY(45deg);
  }
}

.animation-ring-light-circle-limited {
  animation: ringLightCircleLimited 0.5s ease-in-out alternate-reverse;
  -webkit-animation: ringLightCircleLimited 0.5s ease-in-out alternate-reverse;
  -moz-animation: ringLightCircleLimited 0.5s ease-in-out alternate-reverse;

  transform: scale(0.5) rotate(0deg);
  -webkit-transform: scale(0.5) rotate(0deg);
  -moz-transform: scale(0.5) rotate(0deg);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  opacity: 0;
}

@keyframes ringLightCircleLimited {
  0% {
    opacity: 0;
  }
  50% {
    transform: scale(1) rotate(90deg);
    -webkit-transform: scale(1) rotate(90deg);
    -moz-transform: scale(1) rotate(90deg);
  }
  100% {
    opacity: 0.8;
  }
}

.animation-light-limited {
  animation: lightLimited 0.5s ease-in-out infinite alternate-reverse;
  -webkit-animation: lightLimited 0.5s ease-in-out infinite alternate-reverse;
  -moz-animation: lightLimited 0.5s ease-in-out infinite alternate-reverse;

  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;

  opacity: 0;
}

@keyframes lightLimited {
  0% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.animation-stand-star {
  animation: standStar 0.7s ease-in-out forwards infinite;
  -webkit-animation: standStar 0.7s ease-in-out forwards infinite;
  -moz-animation: standStar 0.7s ease-in-out forwards infinite;

  opacity: 0;
}

@keyframes standStar {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.animation-backdrop-limited {
  animation: backdropLimited 0.5s ease-in-out alternate-reverse infinite;
  -webkit-animation: backdropLimited 0.5s ease-in-out alternate-reverse infinite;
  -moz-animation: backdropLimited 0.5s ease-in-out alternate-reverse infinite;

  opacity: 0;
}

@keyframes backdropLimited {
  0% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

.animation-background-light {
  animation: backgroundLight 0.5s ease-in-out alternate-reverse infinite;
  -webkit-animation: backgroundLight 0.5s ease-in-out alternate-reverse infinite;
  -moz-animation: backgroundLight 0.5s ease-in-out alternate-reverse infinite;

  transform: rotateY(0deg) scale(1.05);
  -webkit-transform: rotateY(0deg) scale(1.05);
  -moz-transform: rotateY(0deg) scale(1.05);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  opacity: 1;
}

@keyframes backgroundLight {
  to {
    opacity: 0.5;

    transform: rotateY(5deg) scale(1.2);
    -webkit-transform: rotateY(5deg) scale(1.2);
    -moz-transform: rotateY(5deg) scale(1.2);
  }
}
</style>
