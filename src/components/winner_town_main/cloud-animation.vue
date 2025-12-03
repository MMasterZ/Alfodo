<template>
  <div class="absolute-center fit z-max" v-if="isMapOpen">
    <div class="relative-position fit">
      <q-img src="/images/winner_town_main/animation-cloud-opening.gif" no-spinner no-transition v-if="!isMobile"></q-img>

      <q-img  style="height:100vh" src="/images/winner_town_main/animation-cloud-opening-mobile.gif" no-spinner no-transition v-if="isMobile"></q-img>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";

const $q = useQuasar();

const isMobile = ref($q.platform.is.mobile);

const isMapOpen = ref(true);

onMounted(() => {
  let setTime = 3000

  if(isMobile.value){
    setTime = 1000;
  }

  setTimeout(() => {
    isMapOpen.value = false;
  }, setTime);
});
</script>

<style lang="scss" scoped>
</style>
