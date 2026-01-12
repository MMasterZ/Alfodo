<template>
  <div class="absolute-top box-header-main row">
    <div class="button-home button-active" @click="goHome()">
      <q-img src="/images/extra_world_main/button-home.webp" no-spinner no-transition></q-img>
    </div>
    <q-space></q-space>
    <div class=" box-button-right" >
      <div class="button-setting button-active" @click="isShowDialogSetting = true">
        <q-img src="/images/icon_main/icon-setting.png" no-spinner no-transition></q-img>
      </div>
      <div class="button-info button-active" v-if="false">
        <q-img src="/images/icon_main/icon-info.png" no-spinner no-transition></q-img>
      </div>
    </div>
  </div>

  <dialog-setting v-if="isShowDialogSetting" @callback-closeDialog="isShowDialogSetting = false"></dialog-setting>
</template>

<script setup>
import dialogSetting from "src/components/dialog_main/setting-dialog.vue";
import { ref } from "vue"
import { useRouter } from "vue-router";

const $router = useRouter();

const isShowDialogSetting = ref(false)

const goHome = () => {
  $router.replace("/lobby");
}

</script>

<style lang="scss" scoped>
.box-header-main{
  padding:clamp(10px,1cqw,16px);

  & .button-home{
    width:clamp(45px,4.5cqw,72px);
  }

  & .box-button-right{

    & .button-setting{
      width:clamp(31.875px,3.1875cqw,51px);
    }

    & .button-info{
      width:clamp(18.75px,1.875cqw,30px);
      margin:clamp(10px,1cqw,16px) auto;
    }
  }
}

.button-active{
  cursor:pointer;

  &:active{
    transform:scale(0.95);
    -webkit-transform:scale(0.95);
    -moz-transform:scale(0.95);
    -ms-transform:scale(0.95);
    -o-transform:scale(0.95);
  }
}
</style>
