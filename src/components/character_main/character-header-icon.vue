<template>
  <div
    class="relative-position"
    style="top: 50%; left: 50%; transform: translate(-50%, 25%); width: 450%"
  >
    <character-main
      :isRanking="isRanking"
      :isPet="false"
      :isAnimation="isAnimation"
      :setId="setId"
      :equipment="equipment"
    ></character-main>
  </div>
</template>

<script>
import characterMain from "src/components/character_main/character.vue";
export default {
  components: {
    characterMain,
  },
  props: {
    isRanking: {
      type: Boolean,
      default: false,
    },
    equipment: {
      type: Object,
      default: () => {},
    },
    isAnimation: {
      type: Boolean,
      default: true,
    },
    setId: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
