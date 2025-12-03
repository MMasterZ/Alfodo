<template>
  <svg
    width="1600"
    height="900"
    viewBox="0 0 1600 900"
    style="width: 100%; height: 100%; margin-bottom: -5px"
    xmlns="http://www.w3.org/2000/svg"
  >
    <image href="/images/background_main/background-practice-list.png"></image>
  </svg>
</template>

<script>
import character from "components/character_main/character.vue";
import { useStudentStore } from "src/stores/student";
export default {
  components: {
    character,
  },
  setup(props) {
    const studentStore = useStudentStore();

    return {
      studentStore,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
