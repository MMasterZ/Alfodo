<template>
  <g>
    <image
      v-if="itemData"
      :href="`${pathStorage}${itemData.itemName}-${itemLayer}.png`"
      :id="itemData.itemName"
      :x="`-${positionX}px`"
    ></image>
  </g>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  props: {
    itemData: {
      default: () => {},
    },
    itemLayer: {
      type: String,
      default: "",
    },
    isAnimation: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const pathStorage = ref(
      "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/"
    );

    const randomString = ref(Math.random().toString(36).substring(3));
    const positionX = ref(0);

    const randomNumber = ref(Math.random().toString(36).substring(3));

    let setIntervalAnimation;
    let setTimeoutAnimtion;

    const funcStartAnimation = () => {
      funcStopAnimation();

      if (!props.isAnimation) return;

      const frameRate = 1000 / Number(props.itemData.FPS) || 0;
      const duration = Number(props.itemData.duration) * 1000 || 0;

      let image = new Image();

      image.src = `${pathStorage.value}${props.itemData.itemName}-${props.itemLayer}.png`;

      image.onload = () => {
        const frameCount = Math.floor(image.width / 420);
        if (frameCount <= 1 || (duration == 0 && frameRate == 0)) {
          funcStopAnimation();
          return;
        }

        // console.log("frameCount: ", frameCount);
        // console.log("image.width: ", image.width);
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

        setTimeoutAnimtion = setTimeout(() => {
          setIntervalAnimation = setInterval(() => {
            if (positionX.value >= setWidthImage - 420) {
              positionX.value = 0;
              if (duration > 0) {
                funcStopAnimation();
                funcStartAnimation();
              }
            } else {
              positionX.value += 420;
            }
          }, frameRate);
        }, duration);
      };
    };

    const funcStopAnimation = () => {
      if (setIntervalAnimation || setTimeoutAnimtion) {
        positionX.value = 0;
        clearTimeout(setTimeoutAnimtion);
        clearInterval(setIntervalAnimation);

        setTimeoutAnimtion = null;
        setIntervalAnimation = null;
      }
    };

    watch(
      () => props.itemData,
      () => {
        funcStopAnimation();
        funcStartAnimation();
      }
    );

    onMounted(() => {
      funcStopAnimation();
      funcStartAnimation();
    });

    return {
      pathStorage,
      positionX,
      randomNumber,
      randomString,
    };
  },
};
</script>

<style lang="scss" scoped></style>
