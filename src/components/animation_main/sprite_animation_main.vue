<template>
  <svg
    :width="setWidth"
    :height="setHeight"
    :viewBox="`0 0 ${setWidth} ${setHeight}`"
    style="width: 100%; height: 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <image :href="`${setImage}`" :x="`-${positionX}px`" :y="`-${positionY}px`"></image>
    </g>
  </svg>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const emit = defineEmits(["callback-finishAnimation"]);

const props = defineProps({
  setWidth: {
    type: Number,
    default: 0,
  },
  setHeight: {
    type: Number,
    default: 0,
  },
  setImage: {
    type: String,
    default: "",
  },
  setActive: {
    type: Object,
    default: () => {
      return {
        frameRate: 0,
        duration: 0,
        isHover: false,
        isActive: false,
        isLoop: true,
      };
    },
    required: true,
  },
});

const randomString = ref(Math.random().toString(36).substring(3));
const positionX = ref(0);
const positionY = ref(0);
let setTimeoutActive = null;
let setIntervalActive = null;
const funcStartAnimation = () => {
  let frameRate = 1000 / props.setActive.frameRate || 0;
  let duration = props.setActive.duration * 1000 || 0;

  let image = new Image();

  image.src = `${props.setImage}?${randomString.value}`;

  image.onload = () => {
    const frameCount = Math.floor(image.width / props.setWidth);

    if (
      frameCount <= 1 ||
      (props.setActive.duration == 0 && props.setActive.frameRate == 0)
    ) {
      funcStopAnimation();
      return;
    }

    let setWidthImage = image.width;

    let tempWidth = 0;

    tempWidth = image.width;
    tempWidth = tempWidth.toString();
    tempWidth = tempWidth[tempWidth.length - 1];
    if (tempWidth == "1") {
      setWidthImage = setWidthImage.toString();
      setWidthImage = Number(setWidthImage.substring(0, setWidthImage.length - 1) + 0);
    }

    funcLoopAnimation(setWidthImage, frameRate, duration);
  };
};

const funcLoopAnimation = (width, frameRate, duration) => {
  if (setIntervalActive || setTimeoutActive) {
    clearInterval(setIntervalActive);
    clearTimeout(setTimeoutActive);

    setTimeoutActive = null;
    setIntervalActive = null;
  }

  setTimeoutActive = setTimeout(() => {
    setIntervalActive = setInterval(() => {
      if (props.setActive.isActive || props.setActive.isHover) {
        if (props.setActive.isHover) {
          positionY.value = props.setHeight;
        } else {
          positionY.value = 0;
        }

        if (positionX.value >= width - props.setWidth) {
          if (props.setActive.isHover) {
            positionX.value = 0;
          }

          if (props.setActive.isLoop) {
            positionX.value = 0;
          }

          funcLoopAnimation(width, frameRate, duration);
          setTimeout(() => {
            emit("callback-finishAnimation");
          }, 500);
        } else {
          positionX.value += props.setWidth;
        }
      } else {
        if (!props.setActive.isHover) {
          positionY.value = 0;
        }

        positionX.value = 0;
      }
    }, frameRate);
  }, duration);
};

const funcStopAnimation = () => {
  if (setIntervalActive || setTimeoutActive) {
    clearInterval(setIntervalActive);
    clearTimeout(setTimeoutActive);

    positionX.value = 0;
    positionY.value = 0;

    setTimeoutActive = null;
    setIntervalActive = null;
  }
};

onMounted(() => {
  funcStartAnimation();
});

onBeforeUnmount(() => {
  funcStopAnimation();
});
</script>
