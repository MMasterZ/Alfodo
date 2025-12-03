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
          style="max-width: 400px; width: 100%"
          align="center"
        >
          <logo></logo>
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
import logo from "./logo-login.vue";
export default {
  props: {
    isShowLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    logo,
  },
  setup(props) {},
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
