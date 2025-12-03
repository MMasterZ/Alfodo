<template>
  <svg
    width="150"
    height="220"
    viewBox="0 0 150 220"
    style="width: 100%; height: 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g @mouseover="funcOnHover()" @mouseleave="funcOnOut()" @click="funcClickStartChat()">
      <image
        :href="`/images/ai_character_main/ai-character.png?${randomString}`"
        :x="`-${positionX}px`"
        :y="`-${positionY}px`"
      ></image>
    </g>
  </svg>
</template>

<script>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    isAnimation: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const $route = useRoute();
    const $router = useRouter();
    const randomString = ref(Math.random().toString(36).substring(3));
    const positionX = ref(0);
    const positionY = ref(0);

    let setIntervalAnimation;
    let setTimeoutAnimtion;
    const funcStartAnimation = () => {
      funcStopAnimation();

      if (!props.isAnimation) {
        funcStopAnimation();
        return;
      }

      let frameRate = 1000 / 12 || 0;
      let duration = 1.5 * 1000 || 0;

      if (isHover.value) {
        positionY.value = 220;
        frameRate = 1000 / 8 || 0;
        duration = 0.5 * 1000 || 0;
      }

      let image = new Image();

      image.src = `/images/ai_character_main/ai-character.png?${randomString.value}`;

      image.onload = () => {
        const frameCount = Math.floor(image.width / 150);
        if (frameCount <= 1 || (duration == 0 && frameRate == 0)) {
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
          setWidthImage = Number(
            setWidthImage.substring(0, setWidthImage.length - 1) + 0
          );
        }

        if (isHover.value) {
          setWidthImage = setWidthImage - 300;
        }

        setTimeoutAnimtion = setTimeout(() => {
          setIntervalAnimation = setInterval(() => {
            if (positionX.value >= setWidthImage - 150) {
              positionX.value = 0;
              if (duration > 0) {
                funcStartAnimation();
              }
            } else {
              positionX.value += 150;
            }
          }, frameRate);
        }, duration);
      };
    };

    const funcStopAnimation = () => {
      if (setIntervalAnimation || setTimeoutAnimtion) {
        positionX.value = 0;
        positionY.value = 0;

        clearTimeout(setTimeoutAnimtion);
        clearInterval(setIntervalAnimation);

        setTimeoutAnimtion = null;
        setIntervalAnimation = null;
      }
    };

    const funcOnHover = () => {
      isHover.value = true;
    };

    const funcOnOut = () => {
      isHover.value = false;
    };

    const funcClickStartChat = () => {
      $router.push("/homework");
      // emit("callback-clickStartChat");
    };

    const isHover = ref(false);
    onMounted(() => {
      funcStartAnimation();
    });

    onBeforeUnmount(() => {
      funcStopAnimation();
    });

    return {
      randomString,
      positionX,
      positionY,

      // function
      funcOnHover,
      funcOnOut,
      funcClickStartChat,
    };
  },
};
</script>

<style lang="scss" scoped></style>
