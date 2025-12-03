<template>
  <svg
    width="420"
    height="380"
    viewBox="0 0 420 380"
    style="width: 100%; height: 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g align="center">
      <!-- Character -->
      <image href="images/character/character-none.png"></image>

      <!-- Skeleton -->
      <skeleton
        :isAnimation="true"
        :isCreateCharacter="isCreateCharacter"
        :isShop="isShop"
        :bodyColor="showSkeletonColor"
        :setId="setId"
      ></skeleton>
    </g>
    <style-equipment></style-equipment>
  </svg>
</template>

<script>
import styleEquipment from "./style_equipment.vue";
import skeleton from "./skeleton.vue";
import { useBuddyStore } from "src/stores/buddy";
export default {
  components: {
    styleEquipment,
    skeleton,
  },
  setup(props) {
    const buddyStoore = useBuddyStore();

    return {
      buddyStoore,
    };
  },
};
</script>

<style scoped></style>
