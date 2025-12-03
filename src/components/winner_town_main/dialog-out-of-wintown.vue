<template>
  <div class="absolute-center fit box-backdrop-main row justify-center items-center">
    <div class="relative-position box-dialog-main animate__animated" :class="{'animate__zoomIn':isShowDialog,'animate__zoomOut':!isShowDialog,'mobile':isMobile}">
      <div class="font-mali-b text-title" align="center">
        ออกจาก Wintown
      </div>

      <div align="center">
        <div class="button-cancel-out" :class="{'mobile':isMobile}" @click="funcCloseDialog()">
          <q-img src="/images/winner_town_main/button-cancel-out.webp" fit="contain" no-spinner no-transition></q-img>
        </div>

        <div class="button-out-of-wintown" :class="{'mobile':isMobile}" @click="funcGoToLobby()">
          <q-img src="/images/winner_town_main/button-out-of-wintown.webp" fit="contain" no-spinner no-transition></q-img>
        </div>
      </div>

      <div class="absolute-top-right box-close-main" :class="{'mobile':isMobile}" @click="funcCloseDialog()">
        <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

const $q = useQuasar();
const $router = useRouter();

const isShowDialog = ref(true);

const emits = defineEmits(['callback-closeDialog']);

const isMobile = ref($q.platform.is.mobile);

const funcGoToLobby = () => {

  $q.loading.show();

  setTimeout(() => {
    $router.replace('/lobby');
    $q.loading.hide();
  }, 250);
}

const funcCloseDialog = () => {
  isShowDialog.value = false;

  setTimeout(() => {
    emits('callback-closeDialog');
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
  width:clamp(200px,20cqw,320px);
  border-radius: clamp(12.5px,1.25cqw,20px);
  border: clamp(5px,0.5cqw,8px) solid #F2C043;
  background: #F6F3D3;
  box-shadow: 0 0 0px clamp(1.875px,0.1875cqw,3px) #4A261B;
  padding:clamp(18.75px,1.875cqw,30px) clamp(5px,0.5cqw,8px);
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

  & .text-title{
    margin:0px 0px clamp(15px,1.5cqw,24px);
  }

  & .button-cancel-out{
    width:clamp(176.5625px,17.65625cqw,282.5px);
    height:clamp(31.25px,3.125cqw,50px);
    margin:clamp(10px,1cqw,16px) auto 0px;
    line-height:0;
    cursor:pointer;

    &.mobile{
      width:282px;
      height:fit-content;
      margin:30px 0px 16px;
    }
  }

  & .button-out-of-wintown{
    width:clamp(176.5625px,17.65625cqw,282.5px);
    height:clamp(31.25px,3.125cqw,50px);
    margin:clamp(10px,1cqw,16px) auto 0px;
    line-height:0;
    cursor:pointer;

    &.mobile{
      width:282px;
      height:fit-content;
      margin:16px 0px 0px;
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
      width:46px;
    }
  }

}
</style>
