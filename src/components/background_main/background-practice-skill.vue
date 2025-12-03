<template>
  <svg
    width="1600"
    height="900"
    viewBox="0 0 1600 900"
    style="width: 100%; height: 100%; margin-bottom: -5px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Background main -->
    <g>
      <image href="/images/background_main/background-practice-list-2.png"></image>
    </g>

    <!-- #region Animation -->
    <g
      v-for="(itemAnimation, indexAnimation) in animationData"
      :class="itemAnimation.animationAll"
      :style="`animation-delay:${itemAnimation.delayAll}`"
      :key="indexAnimation"
    >
      <g
        :class="itemWater.animation"
        v-for="(itemWater, indexWater) in itemAnimation.waterList"
        :key="indexWater"
        v-if="!itemAnimation?.isFirstWater"
        :style="`animation-delay:${itemWater.delay}`"
      >
        <image
          :x="itemAnimation.position.x"
          :y="itemAnimation.position.y"
          :href="`/images/practice_list/${itemWater.image}`"
        ></image>
      </g>
      <g
        :class="itemAnimation.animation"
        :style="`animation-delay:${itemAnimation.delay}`"
      >
        <image
          :x="itemAnimation.position.x"
          :y="itemAnimation.position.y"
          :href="`/images/practice_list/${itemAnimation.image}`"
        ></image>
      </g>
      <g
        v-if="itemAnimation?.isFirstWater"
        v-for="(itemWater, indexWater) in itemAnimation.waterList"
        :key="indexWater"
      >
        <image
          :x="itemAnimation.position.x"
          :y="itemAnimation.position.y"
          :href="`/images/practice_list/${itemWater.image}`"
        ></image>
      </g>
    </g>
    <!-- #endregion -->

    <!-- #region line bar -->
    <!-- Left -->
    <!-- <g class="animation-line-bar-right">
      <image
        y="850"
        x="1590"
        height="50px"
        href="/images/background_main/background-practice-list-bar.png"
      ></image>
      <image
        y="850"
        height="50px"
        href="/images/background_main/background-practice-list-bar.png"
      ></image>
    </g> -->
    <!-- right -->
    <!-- <g class="animation-line-bar-Left">
      <image
        x="1590"
        height="50px"
        href="/images/background_main/background-practice-list-bar.png"
      ></image>
      <image
        height="50px"
        href="/images/background_main/background-practice-list-bar.png"
      ></image>
    </g> -->
    <!-- #endregion -->
  </svg>
</template>

<script setup>
const animationData = [
  // #region Mountain ice
  {
    image: "image-mountain-ice-big.png",
    waterList: [
      {
        image: "image-mountain-ice-big-water.png",
        animation: "animation-mountain-water",
      },
    ],
    position: {
      x: "40",
      y: "725",
    },
    animation: "animation-mountain",
  },
  // #endregion

  // #region Mountain small
  {
    image: "image-mountain-ice-small.png",
    waterList: [
      {
        image: "image-mountain-ice-small-water.png",
        animation: "animation-mountain-water",
      },
    ],
    position: {
      x: "420",
      y: "777",
    },
    animation: "animation-mountain",
  },
  // #endregion

  // #region Rock
  {
    image: "image-rock.png",
    waterList: [
      {
        image: "image-rock-water.png",
        animation: "animation-rock-water",
      },
    ],
    position: {
      x: "1470",
      y: "120",
    },
    animation: "animation-rock",
  },
  // #endregion

  // #region Ship
  {
    image: "image-ship.png",
    waterList: [
      {
        image: "image-ship-water.png",
        animation: "animation-ship-water",
      },
    ],
    position: {
      x: "1005",
      y: "720",
    },
    animation: "animation-ship",
  },
  // #endregion

  // #region Bird
  {
    image: "image-bird-1.png",
    waterList: [],
    position: {
      x: "1490",
      y: "495",
    },
    animation: "animation-bird-fly",
  },
  {
    image: "image-bird-2.png",
    waterList: [],
    position: {
      x: "1500",
      y: "560",
    },
    animation: "animation-bird",
  },
  // #endregion

  // #region Ghost
  {
    image: "image-ghost-1.png",
    waterList: [],
    position: {
      x: "940",
      y: "540",
    },
    animation: "animation-ghost",
  },
  {
    image: "image-ghost-1.png",
    waterList: [],
    position: {
      x: "940",
      y: "540",
    },
    animation: "animation-ghost-delay",
  },
  // #endregion

  // #region Boat
  {
    image: "image-boat.png",
    waterList: [
      {
        image: "image-boat-water.png",
        animation: "animation-boat-water",
      },
    ],
    position: {
      x: "1000",
      y: "180",
    },
    animation: "animation-boat",
  },
  // #endregion

  // #region Island
  {
    image: "image-island.png",
    waterList: [
      {
        image: "image-island-water.png",
        animation: "animation-island",
      },
    ],
    position: {
      x: "935",
      y: "80",
    },
    animation: "animation-island",
  },
  // #endregion

  // #region Squid
  {
    image: `image-squid-center.png`,
    waterList: [
      {
        image: `image-squid-center-water.png`,
        animation: `animation-squid-water`,
      },
    ],
    position: {
      x: "160",
      y: "430",
    },
    animation: "animation-squid",
    delay: "",
  },
  {
    image: `image-squid-left.png`,
    waterList: [
      {
        image: `image-squid-left-water.png`,
        animation: `animation-squid-water`,
      },
    ],
    position: {
      x: "135",
      y: "470",
    },
    animation: "animation-squid",
    delay: "0.2s",
  },
  {
    image: `image-squid-right.png`,
    waterList: [
      {
        image: `image-squid-right-water.png`,
        animation: `animation-squid-water`,
      },
    ],
    position: {
      x: "190",
      y: "465",
    },
    animation: "animation-squid",
    delay: "0.4s",
  },
  // #endregion

  // #region Shark
  {
    image: `image-shark.png`,
    waterList: [
      {
        image: `image-shark-water-1.png`,
        animation: `animation-shark-water`,
        delay: "",
      },
      {
        image: `image-shark-water-2.png`,
        animation: `animation-shark-water`,
        delay: "0.2s",
      },
    ],
    position: {
      x: "500",
      y: "360",
    },
    animationAll: "animation-shark",
    delayAll: "",
    animation: "",
    delay: "",
  },
  {
    image: `image-shark-small.png`,
    waterList: [
      {
        image: `image-shark-small-water-1.png`,
        animation: `animation-shark-water`,
        delay: "0s",
      },
      {
        image: `image-shark-small-water-2.png`,
        animation: `animation-shark-water`,
        delay: "0.2s",
      },
    ],
    position: {
      x: "700",
      y: "400",
    },
    animationAll: "animation-shark-small",
    delayAll: "0.5s",
    animation: "",
    delay: "",
  },
  // #endregion

  // #region Bottle
  {
    image: `image-bottle.png`,
    waterList: [
      {
        image: `image-bottle-water.png`,
        animation: ``,
      },
    ],
    position: {
      x: "550",
      y: "620",
    },
    animation: "animation-bottle",
    delay: "",
    isFirstWater: true,
  },
  {
    image: `image-bottle.png`,
    waterList: [
      {
        image: `image-bottle-water.png`,
        animation: ``,
      },
    ],
    position: {
      x: "1100",
      y: "400",
    },
    animation: "aniamtion-bottle",
    delay: "0.5s",
    isFirstWater: true,
    isFlip: true,
  },
  // #endregion
];
</script>

<style lang="scss" scoped>
.animation-line-bar-Left {
  animation: lineMove 50s linear infinite alternate;
}

.animation-line-bar-right {
  animation: lineMove 50s linear infinite alternate-reverse;
}

@keyframes lineMove {
  to {
    transform: translateX(-50%);
  }
}

.flip-image {
  transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -moz-transform: scaleX(-1);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  transform-box: fill-box;
  -webkit-transform-box: fill-box;
  -moz-transform-box: fill-box;
}

.animation-delay-0-5s {
  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
}

.animation-delay-1s {
  animation-delay: 1s;
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
}

.animation-delay-1-5s {
  animation-delay: 1.5s;
  -webkit-animation-delay: 1.5s;
  -moz-animation-delay: 1.5s;
}

.aniamtion-delay-2s {
  animation-delay: 2s;
  -webkit-animation-delay: 2s;
  -moz-animation-delay: 2s;
}

.animation-delay-5s {
  animation-delay: 5s;
  -webkit-animation-delay: 5s;
  -moz-animation-delay: 5s;
}

// #region Mountain
.animation-mountain-water {
  animation: mountainWater 1.3s forwards infinite alternate;
  transform: scale(0.95);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-animation: mountainWater 1.3s forwards infinite alternate;
  -webkit-transform: scale(0.95);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-animation: mountainWater 1.3s forwards infinite alternate;
  -moz-transform: scale(0.95);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;
}

@keyframes mountainWater {
  0% {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
  }
}

.animation-mountain {
  animation: mountain 2s ease-in-out infinite alternate;
  transform: rotate(0deg);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-animation: mountain 2s ease-in-out infinite alternate;
  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-animation: mountain 2s ease-in-out infinite alternate;
  -moz-transform: rotate(0deg);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes mountain {
  0% {
    transform: rotate(-1deg);
    -webkit-transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
  }
  100% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
    -moz-transform: rotate(1deg);
  }
}
// #endregion

// #region Squid
.animation-squid {
  animation: squid 5s forwards infinite alternate;
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-animation: squid 5s forwards infinite alternate;
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-animation: squid 5s forwards infinite alternate;
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes squid {
  0% {
    transform: rotate(0deg) skewX(0deg);
    -webkit-transform: rotate(0deg) skewX(0deg);
    -moz-transform: rotate(0deg) skewX(0deg);
  }
  80% {
    transform: rotate(5deg) skewX(-10deg);
    -webkit-transform: rotate(5deg) skewX(-10deg);
    -moz-transform: rotate(5deg) skewX(-10deg);
  }
  100% {
    transform: rotate(-10deg) skewX(15deg);
    -webkit-transform: rotate(-10deg) skewX(15deg);
    -moz-transform: rotate(-10deg) skewX(15deg);
  }
}

.animation-squid-water {
  animation: squidWater 5s forwards infinite alternate;
  -webkit-animation: squidWater 5s forwards infinite alternate;
  -moz-animation: squidWater 5s forwards infinite alternate;

  transform: skew(0deg);
  transform-origin: top;
  transform-box: fill-box;

  -webkit-transform: skew(0deg);
  -webkit-transform-origin: top;
  -webkit-transform-box: fill-box;

  -moz-transform: skew(0deg);
  -moz-transform-origin: top;
  -moz-transform-box: fill-box;
}

@keyframes squidWater {
  0% {
    transform: skew(0deg);
    -webkit-transform: skew(0deg);
    -moz-transform: skew(0deg);
  }
  80% {
    transform: skew(3deg);
    -webkit-transform: skew(3deg);
    -moz-transform: skew(3deg);
  }
  100% {
    transform: skew(-3deg);
    -webkit-transform: skew(-3deg);
    -moz-transform: skew(-3deg);
  }
}
// #endregion

// #region Shark
.animation-shark {
  animation: shark 7s forwards infinite 0.1s;
  -webkit-animation: shark 7s forwards infinite 0.1s;
  -moz-animation: shark 7s forwards infinite 0.1s;

  transform: translate(0, 0) rotateY(0deg);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(0, 0) rotateY(0deg);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;
}

@keyframes shark {
  0% {
    transform: translate(0, 0) rotateY(0deg);
    -webkit-transform: translate(0, 0) rotateY(0deg);
    -moz-transform: translate(0, 0) rotateY(0deg);
  }
  50% {
    transform: translate(100px, -35px) rotateY(0deg);
    -webkit-transform: translate(100px, -35px) rotateY(0deg);
    -moz-transform: translate(100px, -35px) rotateY(0deg);
  }
  55% {
    transform: translate(100px, -35px) rotateY(180deg);
    -webkit-transform: translate(100px, -35px) rotateY(180deg);
    -moz-transform: translate(100px, -35px) rotateY(180deg);
  }
  100% {
    transform: translate(0px, 0px) rotateY(180deg);
    -webkit-transform: translate(0px, 0px) rotateY(180deg);
    -moz-transform: translate(0px, 0px) rotateY(180deg);
  }
}

.animation-shark-small {
  animation: sharkSmall 5s forwards infinite 0.5s;
  -webkit-animation: sharkSmall 5s forwards infinite 0.5s;
  -moz-animation: sharkSmall 5s forwards infinite 0.5s;

  transform: translate(0, 0) rotateY(0deg);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(0, 0) rotateY(0deg);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;
}

@keyframes sharkSmall {
  0% {
    transform: translate(0, 0) rotateY(0deg);
    -webkit-transform: translate(0, 0) rotateY(0deg);
    -moz-transform: translate(0, 0) rotateY(0deg);
  }
  50% {
    transform: translate(-100px, -15px) rotateY(0deg);
    -webkit-transform: translate(-100px, -15px) rotateY(0deg);
    -moz-transform: translate(-100px, -15px) rotateY(0deg);
  }
  55% {
    transform: translate(-100px, -15px) rotateY(180deg);
    -webkit-transform: translate(-100px, -15px) rotateY(180deg);
    -moz-transform: translate(-100px, -15px) rotateY(180deg);
  }
  100% {
    transform: translate(0px, 0px) rotateY(180deg);
    -webkit-transform: translate(0px, 0px) rotateY(180deg);
    -moz-transform: translate(0px, 0px) rotateY(180deg);
  }
}

.animation-shark-water {
  animation: sharkWater 0.2s forwards infinite alternate;
  -webkit-animation: sharkWater 0.2s forwards infinite alternate;
  -moz-animation: sharkWater 0.2s forwards infinite alternate;

  opacity: 0;
}

@keyframes sharkWater {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
}
// #endregion

// #region Bottle
.animation-bottle {
  animation: bottle 5s forwards infinite alternate;
  -webkit-animation: bottle 5s forwards infinite alternate;
  -moz-animation: bottle 5s forwards infinite alternate;

  transform: rotate(0deg);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-transform: rotate(0deg);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes bottle {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
  }
  50% {
    transform: rotate(3deg);
    -webkit-transform: rotate(3deg);
    -moz-transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
  }
}

// #endregion

// #region Ghost
.animation-ghost {
  animation: ghost 7s forwards infinite;
  -webkit-animation: ghost 7s forwards infinite;
  -moz-animation: ghost 7s forwards infinite;

  transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;

  opacity: 0;

  transition: opacity 0.5s ease-out;
}

.animation-ghost-delay {
  animation: ghost 7s forwards infinite 3.5s;
  -webkit-animation: ghost 7s forwards infinite 3.5s;
  -moz-animation: ghost 7s forwards infinite 3.5s;

  transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;

  opacity: 0;

  transition: opacity 0.5s ease-out;
}

@keyframes ghost {
  0% {
    transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
    -webkit-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
    -moz-transform: translate(0px, 0px) rotateY(180deg) rotate(0deg) scale(0);
    opacity: 0;
  }
  5% {
    transform: translate(0px, 0px) rotateY(180deg) rotate(30deg) scale(0.5);
    -webkit-transform: translate(0px, 0px) rotateY(180deg) rotate(30deg) scale(0.5);
    -moz-transform: translate(0px, 0px) rotateY(180deg) rotate(30deg) scale(0.5);
    opacity: 1;
  }
  45% {
    transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    -webkit-transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    -moz-transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    opacity: 1;
  }
  46% {
    transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    -webkit-transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    -moz-transform: translate(20px, -25px) rotateY(180deg) rotate(30deg) scale(0.7);
    opacity: 0;
  }
  50% {
    transform: translate(20px, -25px) rotateY(0deg) rotate(0deg) scale(0.7);
    -webkit-transform: translate(20px, -25px) rotateY(0deg) rotate(0deg) scale(0.7);
    -moz-transform: translate(20px, -25px) rotateY(0deg) rotate(0deg) scale(0.7);
    opacity: 1;
  }
  90% {
    transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -webkit-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -moz-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    opacity: 1;
  }
  95% {
    transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -webkit-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -moz-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -webkit-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    -moz-transform: translate(-30px, -70px) rotateY(0deg) rotate(0deg) scale(1);
    opacity: 0;
  }
}
// #endregion

// #region Ship
.animation-ship {
  animation: ship 2s forwards infinite alternate;
  -webkit-animation: ship 2s forwards infinite alternate;
  -moz-animation: ship 2s forwards infinite alternate;

  transform: rotate(0deg);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-transform: rotate(0deg);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes ship {
  0% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
    -moz-transform: rotate(1deg);
  }
  100% {
    transform: rotate(-1deg);
    -webkit-transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
  }
}

.animation-ship-water {
  animation: shipWater 2s forwards infinite alternate 0.5s;
  -webkit-animation: shipWater 2s forwards infinite alternate 0.5s;
  -moz-animation: shipWater 2s forwards infinite alternate 0.5s;

  transform: skewX(0deg);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: skewX(0deg);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: skewX(0deg);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;
}

@keyframes shipWater {
  0% {
    transform: skewX(10deg);
    -webkit-transform: skewX(10deg);
    -moz-transform: skewX(10deg);
  }
  100% {
    transform: skewX(-2deg);
    -webkit-transform: skewX(-2deg);
    -moz-transform: skewX(-2deg);
  }
}
// #endregion

// #region rock
.animation-rock {
  animation: rock 1.5s forwards infinite alternate;
  -webkit-animation: rock 1.5s forwards infinite alternate;
  -moz-animation: rock 1.5s forwards infinite alternate;

  transform: translate(0px, 0px);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-transform: translate(0px, 0px);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(0px, 0px);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

.animation-rock-water {
  animation: rock 1.5s forwards infinite alternate 0.5s;
  -webkit-animation: rock 1.5s forwards infinite alternate 0.5s;
  -moz-animation: rock 1.5s forwards infinite alternate 0.5s;

  transform: translate(0px, 0px);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-transform: translate(0px, 0px);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(0px, 0px);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes rock {
  0% {
    transform: translate(1px, 0px);
    -webkit-transform: translate(1px, 0px);
    -moz-transform: translate(1px, 0px);
  }
  100% {
    transform: translate(-1px, 0px);
    -webkit-transform: translate(-1px, 0px);
    -moz-transform: translate(-1px, 0px);
  }
}
// #endregion

// #region Boat
.animation-boat {
  animation: boat 2s forwards infinite alternate;
  -webkit-animation: boat 2s forwards infinite alternate;
  -moz-animation: boat 2s forwards infinite alternate;

  transform: rotate(0deg);
  transform-origin: bottom right;
  transform-box: fill-box;

  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: bottom right;
  -webkit-transform-box: fill-box;

  -moz-transform: rotate(0deg);
  -moz-transform-origin: bottom right;
  -moz-transform-box: fill-box;
}

.animation-boat-water {
  animation: boat 2s forwards infinite alternate 0.5s;
  -webkit-animation: boat 2s forwards infinite alternate 0.5s;
  -moz-animation: boat 2s forwards infinite alternate 0.5s;

  transform: skewX(0deg);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: skewX(0deg);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: skewX(0deg);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;
}

@keyframes boat {
  0% {
    transform: rotate(1deg);
    -webkit-transform: rotate(1deg);
    -moz-transform: rotate(1deg);
  }
  100% {
    transform: rotate(-1deg);
    -webkit-transform: rotate(-1deg);
    -moz-transform: rotate(-1deg);
  }
}
// #endregion

// #region island
.animation-island {
  animation: island 2s forwards infinite alternate;
  -webkit-animation: island 2s forwards infinite alternate;
  -moz-animation: island 2s forwards infinite alternate;

  transform: skewX(0deg);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-transform: skewX(0deg);
  -webkit-transform-origin: bottom;
  -webkit-transform-box: fill-box;

  -moz-transform: skewX(0deg);
  -moz-transform-origin: bottom;
  -moz-transform-box: fill-box;
}

@keyframes island {
  0% {
    transform: skewX(1deg);
    -webkit-transform: skewX(1deg);
    -moz-transform: skewX(1deg);
  }
  100% {
    transform: skewX(-1deg);
    -webkit-transform: skewX(-1deg);
    -moz-transform: skewX(-1deg);
  }
}
// #endregion

// #region Bird
.animation-bird {
  animation: bird 2s forwards infinite alternate;
  -webkit-animation: bird 2s forwards infinite alternate;
  -moz-animation: bird 2s forwards infinite alternate;

  transform: translate(0px, 0px);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(0px, 0px);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(0px, 0px);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;
}

@keyframes bird {
  0% {
    transform: translate(0px, 0px);
    -webkit-transform: translate(0px, 0px);
    -moz-transform: translate(0px, 0px);
  }
  100% {
    transform: translate(0px, -7px);
    -webkit-transform: translate(0px, -7px);
    -moz-transform: translate(0px, -7px);
  }
}

.animation-bird-fly {
  animation: birdFly 30s forwards infinite;
  -webkit-animation: birdFly 30s forwards infinite;
  -moz-animation: birdFly 30s forwards infinite;

  transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
  transform-origin: center;
  transform-box: fill-box;

  -webkit-transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
  -webkit-transform-origin: center;
  -webkit-transform-box: fill-box;

  -moz-transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
  -moz-transform-origin: center;
  -moz-transform-box: fill-box;
}

@keyframes birdFly {
  0% {
    transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
    -webkit-transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
    -moz-transform: translate(150px, -100px) rotateY(0deg) rotate(0deg);
  }
  15% {
    transform: translate(0px, -14px) rotateY(0deg) rotate(0deg);
    -webkit-transform: translate(0px, -14px) rotateY(0deg) rotate(0deg);
    -moz-transform: translate(0px, -14px) rotateY(0deg) rotate(0deg);
  }
  16% {
    transform: translate(0px, -14px) rotateY(180deg) rotate(90deg);
    -webkit-transform: translate(0px, -14px) rotateY(180deg) rotate(90deg);
    -moz-transform: translate(0px, -14px) rotateY(180deg) rotate(90deg);
  }
  25% {
    transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
    -webkit-transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
    -moz-transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
  }
  100% {
    transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
    -webkit-transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
    -moz-transform: translate(150px, -100px) rotateY(180deg) rotate(90deg);
  }
}

// #endregion
</style>
