<template>
  <!-- #region Dialog Welcome to wintown -->
  <div class="relative-position box-dialog-welcome-to-wintown-main animate__animated" :class="{'animate__zoomIn':isAnimation,'animate__zoomOut':!isAnimation}">
    <q-img src="/images/winner_town_main/dialog-welcome-to-wintown.webp" no-spinner no-transition></q-img>

    <div class="absolute-top-right button-close" @click="funcCloseDialog()">
      <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
    </div>

    <div class="absolute-bottom-right button-welcome-to-wintown" @click="funcGoToWintown()">
      <q-img src="/images/winner_town_main/button-welcome-to-wintown.webp" no-spinner no-transition></q-img>
    </div>

    <div class="absolute-bottom-right box-check-popup">
      <q-checkbox dense keep-color :color="isCheckPopupWelcomeToWintown ? 'primary' : 'white'" v-model="isCheckPopupWelcomeToWintown" @update:model-value="funcSetCookie" :label="` ไม่ต้องแสดงอีกในวันนี้`"  />
    </div>
  </div>
  <!-- #endregion -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();

const emits = defineEmits(['callback-closeDialog']);

const studentStore = useStudentStore();

const isAnimation = ref(true)
const isCheckPopupWelcomeToWintown = ref(false);

// ใช้ cookie เพื่อเก็บการปิด popup ไม่ให้แสดงอีกในวันนี้
let cookie_name = `odc_wintown_popup_${studentStore.studentId}`;

const funcSetCookie = (check) => {
  setCookie(cookie_name,check);
}

// ใช้งาน cookie แบบง่าย
function setCookie(name, value) {

  let loginKey = ""

  if(value){
    loginKey = "false"
  }else{
    loginKey = studentStore.studentData.loginKey || "";
  }

  const d = new Date();
  // ตั้งวันหมดอายุเป็นเที่ยงคืนของวันนี้ (midnight tonight)
  d.setHours(24, 0, 0, 0); // ตั้งเวลาเป็นเที่ยงคืนของวันนี้

  document.cookie = `${name}=${loginKey};expires=${d.toUTCString()};path=/`;
}

const funcGoToWintown = () => {

  $q.loading.show();

  setCookie(cookie_name,isCheckPopupWelcomeToWintown.value);

  setTimeout(() => {
    $router.push("/wintown");
    $q.loading.hide();
  }, 250);
}

const funcCloseDialog = () => {
  isAnimation.value = false;

  setTimeout(() => {
    emits('callback-closeDialog');
  }, 50);
}

</script>

<style lang="scss" scoped>
.box-dialog-welcome-to-wintown-main{
  width:clamp(396.875px,39.6875cqw,635px);

  & .button-close{
    width:clamp(22.5px,2.25cqw,36px);
    cursor:pointer;
  }

  & .button-welcome-to-wintown{
    bottom:clamp(34.375px,3.4375cqw,55px);
    right:clamp(81.25px,8.125cqw,130px);
    width:clamp(80.625px,8.0625cqw,129px);
    cursor:pointer;
  }

  & .box-check-popup{
    bottom:clamp(40.625px,4.0625cqw,65px);
    right:clamp(-70px,-4.375cqw,-43.75px);
    color:#fff;
  }
}
</style>
