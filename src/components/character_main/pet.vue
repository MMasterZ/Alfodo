<template>
  <g>
    <image
      v-if="item.isFront"
      :href="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${item.itemName}-front.png`"
    ></image>
    <!-- 
    <image
      id="imageSprite"
      href="/sprite/deer-sprite.png"
      :x="`-${setPositionX}px`"
    ></image> -->
  </g>
</template>

<script>
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // let setIntervalPet;
    // const setPositionX = ref(0);
    // const funcRuningFrame = () => {
    //   let el = document.getElementById("imageSprite");
    //   let setWidthImage;
    //   let image = new Image();
    //   image.src = `https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${props.item.itemName}-front.png`;
    //   image.onload = function (e) {
    //     setWidthImage = this.width;
    //   };
    //   setIntervalPet = setInterval(() => {
    //     if (setPositionX.value >= setWidthImage - 420) {
    //       setPositionX.value = 0;
    //     } else {
    //       setPositionX.value += 420;
    //     }
    //   }, 120);
    // };
    // onMounted(() => {
    //   setTimeout(() => {
    //     funcRuningFrame();
    //   }, 500);
    // });
    // onUnmounted(() => {
    //   if (setIntervalPet) clearInterval(setIntervalPet);
    // });
    // return {
    //   setPositionX,
    // };
  },
};
</script>

<style lang="scss" scoped></style>