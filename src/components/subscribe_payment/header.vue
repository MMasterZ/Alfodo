<template>
  <div
    style="
      height: 72px;
      width: 100vw;
      padding: 8px 16px;
      gap: 16px;
      position: sticky;
      top: 0;
      z-index: 1;
    "
    class="row items-center"
    :class="['sticky-header', { scrolled: isScrolled }]"
  >
    <div
      @click="toLobbyPage()"
      style="width: 48px; height: 48px"
      class="clickable cursor-pointer"
    >
      <img
        src="/images/subscribe_payment/backBtn.png"
        style="
          object-fit: cover;
          image-rendering: optimizeQuality;
          image-rendering: optimizeSpeed;
        "
      />
    </div>
    <div
      class="relative-position"
      style="display: flex; justify-content: center; align-items: center; top: 2px"
    >
      <div
        class="font-fredoka fit absolute textShadow"
        style="top: -4px; z-index: 3; font-size: clamp(24px, 1.88vw, 36px)"
      >
        Learning Package
      </div>
      <div
        class="font-fredoka fit relative-position"
        style="z-index: 2; top: 1px; font-size: clamp(24px, 1.88vw, 36px)"
      >
        Learning Package
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isScrolled: {
    type: Boolean,
    default: false,
  },
});

const $q = useQuasar();

const $router = useRouter();

const toLobbyPage = () => {
  $router.push({ name: "lobby-main" });
};
</script>

<style lang="scss" scoped>
.textShadow {
  color: white;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}

.sticky-header {
  transition: background-color 0.3s ease; /* Smooth transition */
}

.sticky-header.scrolled {
  background-color: #4a261b; /* Background color when scrolled */
}
</style>
