<template>
  <div>
    <div v-if="isDesktop" class="relative-position">
      <svg
        width="1600"
        height="900"
        viewBox="0 0 1600 900"
        style="width: 100%; height: 100%; margin-bottom: -5px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image
          href="/images/background_main/background-lobby-default.png"
        ></image>
      </svg>

      <div class="col-12 row fit justify-center absolute-center">
        <div class="col-5 relative-position"></div>
        <div class="col-5 relative-position">
          <character :isAnimation="true"></character>
        </div>
      </div>
    </div>

    <div v-if="!isDesktop">
      <div class="background-lobby row justify-center items-center">
        <character
          style="max-width: 500px; min-width: 450px; width: 70%"
          :isAnimation="true"
        ></character>
      </div>
    </div>
  </div>
</template>

<script>
import character from "components/character_main/character.vue";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
export default {
  components: {
    character,
  },
  setup(props) {
    // initialize
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);

    return {
      // Boolean
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-lobby {
  width: 100vw;
  height: 100vh;
  background-image: url("/images/background_main/background-lobby-default.png");
  background-position: 60% 0%;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
}
</style>
