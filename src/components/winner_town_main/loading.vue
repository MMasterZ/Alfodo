<template>
  <div class="absolute-center fit row justify-center items-center box-backdrop-main z-max">
    <div class="relative-position animate__animated" :class="{'animate__fadeIn':isAnimation,'animate__fadeOut':!isAnimation}">
      <div class="box-image-loading" :class="{'mobile':isMobile}">
        <q-img src="/images/winner_town_main/Loading.gif" no-spinner no-transition></q-img>
      </div>
      <div class="box-text-loading font-mali-b" align="center" :class="{'mobile':isMobile}">
        {{ `${props.text}` }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const props = defineProps({
  text: {
    type: String,
    default: 'โปรดรอสักครู่...'
  }
});

const isMobile = ref($q.platform.is.mobile);
const isAnimation = ref(true);

</script>

<style lang="scss" scoped>
.box-backdrop-main{
  background-color:rgba(0,0,0,0.5);
}

.box-image-loading{
  width:clamp(80px,8cqw,128px);
  margin:clamp(15px,1.5cqw,24px) auto;

  &.mobile{
    width:80px;
    margin:12px auto;
  }
}

.box-text-loading{
  color:#FFF;
  font-size:clamp(10px,1cqw,16px);
  text-shadow: rgb(94, 50, 32) 1px 0px 0px, rgb(94, 50, 32) 0.540302px 0.841471px 0px, rgb(94, 50, 32) -0.416147px 0.909297px 0px, rgb(94, 50, 32) -0.989992px 0.14112px 0px, rgb(94, 50, 32) -0.653644px -0.756802px 0px, rgb(94, 50, 32) 0.283662px -0.958924px 0px, rgb(94, 50, 32) 0.96017px -0.279415px 0px;

  &.mobile{
    font-size:16px;
  }
}
</style>
