<template>
  <div class="relative-position fit animate__animated row justify-center items-center" :class="{'animate__fadeIn': isShowDialogAnimationUnlockLevel,'animate__fadeOut':!isShowDialogAnimationUnlockLevel}">
    <div class="relative-position box-card-level-main" :class="{'mobile self-center':isMobile}">
      <div class="box-unlock-level-header relative-position" align="center" :class="{'mobile':isMobile}">
        <div class="font-mali-b">
          {{ `Level ${cardLevelData.level}` }}
        </div>
      </div>
      <div class="box-unlock-level-body" :class="{'mobile':isMobile}">
        <div class="box-image-level" align="center" :class="{'mobile':isMobile}">
          <q-img :src="`${cardLevelData.img}`" no-spinner no-transition></q-img>
        </div>
        <div class="box-text-details font-mali-m" align="center" :class="{'mobile':isMobile}">
          {{ `${cardLevelData.detail}` }}
        </div>
      </div>
    </div>

    <!-- #region Backdrop -->
    <div class="absolute-center box-backdrop fit animate__animated animate__fadeIn" v-if="isStart"></div>
    <!-- #endregion -->

    <div class="absolute-center box-animation-light-circle-main row justify-center items-center animate__animated animate__fadeIn" :class="{'mobile':isMobile}" v-if="isStart">
      <div class="box-animation-light-circle" :class="{'mobile':isMobile}">
        <q-img src="/images/box_main/box-animation-light-circle.webp" no-spinner no-transition></q-img>
      </div>
    </div>

    <div class="absolute-center box-animation-unlock-level-main row justify-center items-center animate__animated animate__fadeIn" v-if="isStart" :class="{'mobile':isMobile}">
      <div class="icon-lock-level" :class="{'mobile':isMobile}">
        <q-img :src="`/images/icon_main/icon-${isShowAnimationUnlock ? 'un' : ''}lock-card-level.webp`" no-spinner no-transition ></q-img>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref,onMounted, onBeforeUnmount } from 'vue';

const $q = useQuasar()

const props = defineProps({
  cardLevelData: {
    type: Object,
    default:{
      level:1,
      details:"(เหมาะสำหรับอายุ 7-8 ปี)",
      img:"/images/subscribe_payment/courseLv1.png"
    }
  }
})

const emits = defineEmits(['callback-finish']);

const isMobile = ref($q.platform.is.mobile);
const isShowDialogAnimationUnlockLevel = ref(true);
const isShowAnimationUnlock = ref(false)
const isStart = ref(false)


let listener_animation;
let listener_start;
let listener_finish;
onMounted(() => {

  listener_start = setTimeout(() => {
    isStart.value = true;

    listener_animation = setTimeout(() => {
      isShowAnimationUnlock.value = true;

      listener_finish = setTimeout(() => {
        isShowDialogAnimationUnlockLevel.value = false;
        setTimeout(() => {
          emits("callback-finish");
        }, 50);
      }, 1500);

    }, 1000);

  }, 500);

})

onBeforeUnmount(() => {

  if(listener_start){
    clearTimeout(listener_start);
    listener_start = null;
  }

  if(listener_animation){
    clearTimeout(listener_animation);
    listener_animation = null;
  }

  if(listener_finish){
    clearTimeout(listener_finish);
    listener_finish = null;
  }

})

</script>

<style lang="scss" scoped>
.box-card-level-main{
  width:14.5625%;
  color:#fff;
  font-size: clamp(15px,1.5cqw,24px);
  line-height: clamp(15px,1.5cqw,24px);
  padding: clamp(3.75px,0.375cqw,6px);
  margin: auto;

  &.mobile{
    width:233px;
    font-size:24px;
    line-height:24px;
    padding:6px;
  }

  & .box-unlock-level-header{
    background: #4A261B;
    padding: clamp(7.5px,0.75cqw,12px) clamp(10px,1cqw,16px) clamp(5px,0.5cqw,8px) clamp(10px,1cqw,16px);
    border-radius: clamp(10px,1cqw,16px) clamp(10px,1cqw,16px) 0px 0px;

    &.mobile{
      padding: 12px 16px 8px 16px;
      border-radius: 16px 16px 0px 0px;
    }
  }

  & .box-unlock-level-body{
    width:100%;
    color: #4A261B;
    background-color:#fff;
    padding: clamp(7.5px,0.75cqw,12px) 0px clamp(10px,1cqw,16px) 0px;
    border-radius: 0px 0px clamp(10px,1cqw,16px) clamp(10px,1cqw,16px);

    &.mobile{
      padding: 12px 0px 16px 0px;
      border-radius: 0px 0px 16px 16px;
    }

    & .box-image-level{
      width:78.285%;
      margin:auto;

      &.mobile{
        width:173px;
      }
    }

    & .box-text-details{
      font-size:clamp(7.5px,0.75cqw,12px);
      line-height: clamp(10px,1cqw,16px);
      margin-top:clamp(2.5px,0.25cqw,4px);

      &.mobile{
        font-size:12px;
        line-height:16px;
        margin-top:4px;
      }
    }
  }
}

.box-backdrop{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.3);

  animation-duration:0.3s;
  -webkit-animation-duration:0.3s;
  -moz-animation-duration:0.3s;
  -ms-animation-duration:0.3s;
  -o-animation-duration:0.3s;
}

.box-animation-light-circle-main{
  width:100%;
  height:100%;

  animation-duration:0.3s;
  -webkit-animation-duration:0.3s;
  -moz-animation-duration:0.3s;
  -ms-animation-duration:0.3s;
  -o-animation-duration:0.3s;

  & .box-animation-light-circle{
    width:35.5%;
    opacity: 0.7;
    transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -moz-transform:rotate(0deg);
    -ms-transform:rotate(0deg);
    -o-transform:rotate(0deg);

    &.mobile{
      max-width:568px;
      width:100%;
    }

    animation: LightCircle 10s linear infinite;
    -webkit-animation: LightCircle 10s linear infinite;
    -moz-animation: LightCircle 10s linear infinite;
    -ms-animation: LightCircle 10s linear infinite;
    -o-animation: LightCircle 10s linear infinite;

    @keyframes LightCircle{
      0%{
        transform:rotate(0deg);
      }
      100%{
        transform:rotate(360deg);
      }
    }
  }
}

.box-animation-unlock-level-main{
  width:100%;
  height:100%;
  top:48.5%;

  animation-duration:0.3s;
  -webkit-animation-duration:0.3s;
  -moz-animation-duration:0.3s;
  -ms-animation-duration:0.3s;
  -o-animation-duration:0.3s;

  & .icon-lock-level{
    width:7.5%;

    &.mobile{
      width:120px;
    }
  }
}
</style>
