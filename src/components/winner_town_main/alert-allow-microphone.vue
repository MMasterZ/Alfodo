<template>
  <div
    class="absolute-center fit box-backdrop-main row justify-center items-center z-max"
    @click="funcCloseDialog"
  >
    <div class="relative-position box-dialog-main animate__animated" :class="{'animate__zoomIn':isShowDialog,'animate__zoomOut':!isShowDialog,'mobile':isMobile}">
      <q-img :src="`/images/winner_town_main/alert-allow-microphone${isMobile ? '-mobile' : ''}.webp`" fit="contain" no-spinner no-transition></q-img>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();
const emits = defineEmits(['callback-closeDialog']);

const isMobile = ref($q.platform.is.mobile);
const isShowDialog = ref(true);

const funcCloseDialog = () => {

  isShowDialog.value = false;

  setTimeout(() => {
    emits('callback-closeDialog')
  }, 250);
}
</script>

<style lang="scss" scoped>
.box-backdrop-main{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.5);
}

.box-dialog-main{
  width:clamp(373.125px,37.3125cqw,597px);

  &.mobile{
    width:310px;
    margin:auto;
  }
}
</style>
