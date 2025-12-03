<template>
  <div class="absolute-center fit box-backdrop-main row justify-center items-center">
    <div class="relative-position box-dialog-main animate__animated" :class="{'animate__zoomIn':isShowDialog,'animate__zoomOut':!isShowDialog,'mobile':isMobile}">
      <div class="font-mali-b text-title-setting" :class="{'mobile':isMobile}" align="center">
        ตั้งค่าการเล่น
      </div>
      <div class="box-setting row" :class="{'mobile':isMobile}">
        <div class="col self-center">
          <q-icon name="fas fa-volume-up"></q-icon>
          <span class="text font-mali-m" :class="{'mobile':isMobile}">เสียงประกอบ</span>
        </div>
        <div class="col-1 button-setting self-center" :class="{'mobile':isMobile}" @click="funcEnableSoundEffect()">
          <q-img :src="`/images/button_main/button-setting-${isSoundEffect ? 'on' : 'off'}.webp`" no-spinner no-transition></q-img>
        </div>
      </div>
      <div class="box-setting row end" :class="{'mobile':isMobile}">
        <div class="col self-center">
          <q-icon name="fas fa-music"></q-icon>
          <span class="text font-mali-m" :class="{'mobile':isMobile}">เพลง</span>
        </div>
        <div class="col-1 button-setting self-center" :class="{'mobile':isMobile}" @click="funcEnableSoundBackground()">
          <q-img :src="`/images/button_main/button-setting-${isBackgroundEffect ? 'on' : 'off'}.webp`" no-spinner no-transition></q-img>
        </div>
      </div>
      <div class="absolute-top-right box-close-main" :class="{'mobile':isMobile}" @click="funcCloseDialog()">
        <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useSystemStore } from 'src/stores/system';
import { onMounted, ref } from 'vue';

const $q = useQuasar();
const systemStore = useSystemStore();

const emits = defineEmits(['callback-closeDialog']);

const isMobile = ref($q.platform.is.mobile);
const isShowDialog = ref(true);
const isBackgroundEffect = ref(false);
const isSoundEffect = ref(false);

const funcEnableSoundEffect = () => {
  isSoundEffect.value = !isSoundEffect.value;
  systemStore.funcEnableSoundEffect(isSoundEffect.value);
};

const funcEnableSoundBackground = () => {
  isBackgroundEffect.value = !isBackgroundEffect.value;
  systemStore.funcEnableSoundBackground(isBackgroundEffect.value);
};

const funcCloseDialog = () => {
  isShowDialog.value = false;

  setTimeout(() => {
    emits('callback-closeDialog');
  }, 250);
}

onMounted(() => {

  isSoundEffect.value = systemStore.systemData.isEnableSoundEffect;
  isBackgroundEffect.value = systemStore.systemData.isEnableSoundBackground;

})
</script>

<style lang="scss" scoped>
.box-backdrop-main{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,.5);
}

.box-dialog-main{
  width:clamp(200px,20cqw,320px);
  border-radius: clamp(12.5px,1.25cqw,20px);
  border: clamp(5px,0.5cqw,8px) solid #F2C043;
  background: #F6F3D3;
  box-shadow: 0 0 0px clamp(1.875px,0.1875cqw,3px) #4A261B;
  padding:clamp(25px,2.5cqw,40px) clamp(5px,0.5cqw,8px);
  color: #4A261B;
  font-size: clamp(12.5px,1.25cqw,20px);
  line-height: clamp(12.5px,1.25cqw,20px);
  animation-duration:0.15s;

  &.mobile{
    width:320px;
    padding:30px 8px;
    font-size:20px;
    line-height:16px;
    box-shadow:0px 0px 0px 4px #4A261B;
    border-width:8px;
  }

  & .text-title-setting{
    margin:clamp(6.25px,0.625cqw,10px) 0px clamp(15px,1.5cqw,24px);

    &.mobile{
      margin:0px 0px 24px;
    }
  }

  & .box-setting{
    border-radius: clamp(3.125px,0.3125cqw,5px) clamp(3.125px,0.3125cqw,5px) 0 0;
    background: #EFD080;
    border-bottom:clamp(1.25px,0.125cqw,2px) solid #AC7D05;
    margin:clamp(3.75px,0.375cqw,6px) 0px;
    padding:clamp(5px,0.5cqw,8px) clamp(6.25px,0.625cqw,10px);
    font-size:clamp(18.75px,1.875cqw,30px);

    &.mobile{
      font-size:24px;
      padding:10px 10px;
    }

    &.end{
      border-radius: 0px 0px clamp(3.125px,0.3125cqw,5px) clamp(3.125px,0.3125cqw,5px);
      border-bottom:0px solid transparent;
    }

    & .text{
      font-size: clamp(10px,1cqw,16px);
      line-height: clamp(12.5px,1.25cqw,20px);
      color: #4A261B;
      margin:0px clamp(6.25px,0.625cqw,10px);

      &.mobile{
        font-size:16px;
        margin:0px 10px;
      }
    }

    & .button-setting{
      width:clamp(70px,7cqw,112px);
      cursor:pointer;

      &.mobile{
        width:112px;
      }
    }
  }

  & .box-close-main{
    top:clamp(-20px,-1.25cqw,-12.5px);
    right:clamp(-20px,-1.25cqw,-12.5px);
    width:clamp(28.125px,2.8125cqw,45px);
    line-height:0;
    cursor:pointer;

    &.mobile{
      top:-25px;
      right:-25px;
      width:45px;
    }
  }
}
</style>
