<template>
  <q-dialog
    maximized
    v-model="isShowLoading"
    no-esc-dismiss
    persistent
    class="z-max relative-position"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div
          class="col-12 self-center"
          style="width: clamp(114.375px,11.4375cqw,183px);"
          align="center"
        >
          <q-img src="/images/logo-alfodo.webp" no-spinner no-transition></q-img>
          <div align="center" class="f30 text-white text-bold">
            <span>Loading</span>
            <span class="animation-dots" style="animation-delay: 0s">.</span>
            <span class="animation-dots" style="animation-delay: 0.15s">.</span>
            <span class="animation-dots" style="animation-delay: 0.3s">.</span>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
import logo from "./logo-login.vue";
export default {
  components: {
    logo,
  },
  setup(props) {
    const isShowLoading = ref(true);

    return {
      isShowLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
.animation-dots {
  animation: fadeDots 0.5s linear infinite;
}

@keyframes fadeDots {
  to {
    opacity: 0;
  }
}
</style>
