<template>
  <div class="relative-position">
    <q-dialog v-model="isDialogSetting" maximized persistent class="z-max">
      <q-card class="transparent shadow-0 font-mali">
        <q-card-section class="fit row items-center">
          <div class="dialog-container relative-position">
            <div
              class="q-pt-md q-pb-sm q-px-sm"
              style="background-color: #D4F3FF; border-radius: 15px"
            >
              <div align="center">
                <span class="f20 font-mali-b">ออกจากแบบฝึกหัด</span>
              </div>
              <div class="q-mt-md">
                <div class="box-setting-option q-pa-sm row">
                  <div class="col-1 self-center" style="width: fit-content">
                    <q-img
                      width="30px"
                      src="images/icon_main/icon-sound-effect.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="col q-px-xs self-center f16 font-mali-m">
                    <span> เสียงประกอบ</span>
                  </div>
                  <div class="col-1 self-center" style="width: 100px" align="right">
                    <q-img
                      @click="
                        systemStore.funcEnableSoundEffect(
                          !systemStore.systemData.isEnableSoundEffect
                        )
                      "
                      width="100px"
                      class="cursor-pointer"
                      :src="`/images/icon_main/icon-setting-${
                        systemStore.isEnableSoundEffect ? 'on' : 'off'
                      }.png`"
                      no-transition
                      no-spinner
                    >
                    </q-img>
                  </div>
                </div>
                <div
                  class="box-setting-option q-pa-sm row"
                  style="border: 0px solid; border-radius: 0px 0px 5px 5px"
                >
                  <div class="col-1 self-center" style="width: fit-content">
                    <q-img
                      width="30px"
                      src="images/icon_main/icon-sound-background.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                  <div class="col q-px-xs self-center f16 font-mali-m">
                    <span> เพลง</span>
                  </div>
                  <div class="col-1 self-center" style="width: 100px" align="right">
                    <q-img
                      @click="
                        systemStore.funcEnableSoundBackground(
                          !systemStore.systemData.isEnableSoundBackground
                        )
                      "
                      width="100px"
                      class="cursor-pointer"
                      :src="`/images/icon_main/icon-setting-${
                        systemStore.isEnableSoundBackground ? 'on' : 'off'
                      }.png`"
                      no-transition
                      no-spinner
                    >
                    </q-img>
                  </div>
                </div>
              </div>

              <div class="q-my-md text-link font-mali-b" align="center" v-if="false">
                <div
                  class="cursor-pointer q-my-sm"
                  @click="funcShowDialogTermsAndPolicy('terms')"
                >
                  ข้อกำหนดการใช้บริการ
                </div>
                <div
                  class="cursor-pointer q-my-sm"
                  @click="funcShowDialogTermsAndPolicy('policy')"
                >
                  นโยบายความเป็นส่วนตัว
                </div>
              </div>

              <div
                class="q-mt-md q-mb-sm"
                v-if="isLearningAndPractice && !sychronizeStore.isSync"
              >
                <q-img
                  @click="(isDialogConfirm = true), (isDialogSetting = false)"
                  v-close-popup
                  class="cursor-pointer"
                  src="/images/icon_main/icon-button-out-of-practice.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

              <div class="q-mt-md q-mb-sm" v-if="isSpeakup">
                <q-img
                  @click="(isDialogConfirm = true), (isDialogSetting = false)"
                  v-close-popup
                  class="cursor-pointer"
                  src="/images/icon_main/icon-button-out-of-speakup.png"
                ></q-img>
              </div>

              <div class="q-mt-md" align="center" v-if="isShowButtonOutOfMiniGame" @click="funcHandleCloseDialog()">
                <q-img width="281px" class="cursor-pointer" src="/images/minigame_main/button-out-of-alien-quest.webp" no-spinner no-transition></q-img>
              </div>

              <div class="text-right q-pr-xs q-pt-xs" style="font-size: 12px" v-if="false">
                v.{{ version }}
              </div>
            </div>

            <div
              @click="funcCloseDialog()"
              v-close-popup
              class="absolute-top-right"
              style="right: -15px; top: -15px"
            >
              <q-btn round flat>
                <q-img
                  width="45px"
                  src="/images/icon_main/icon-close.png"
                  no-spinner
                  no-transition
                ></q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- #region Dialog Confirm  -->
    <q-dialog maximized v-model="isDialogConfirm" persistent class="z-max">
      <q-card class="transparent shadow-0 font-mali">
        <q-card-section class="fit row items-center">
          <div class="dialog-container">
            <div
              class="q-pt-md q-pb-sm q-px-sm"
              style="background-color: #f6f3d3; border-radius: 15px"
            >
              <div align="center" class="f20 font-mali-b">
                <span v-if="!isSpeakup">ออกจากแบบฝึกหัด</span>
                <span v-if="isSpeakup">ออกจากการฝึกพูด</span>
              </div>

              <div
                class="box-setting-option q-pa-sm row q-mt-md"
                style="border: 0px solid; border-radius: 5px"
              >
                <div class="f16 text-weight-light">
                  <span v-if="!isSpeakup">
                    แบบฝึกหัดจะไม่ถูกบันทึกคะแนนยืนยันการออกจากแบบฝึกหัด
                  </span>
                  <span v-if="isSpeakup">
                    การฝึกพูดจะไม่ถูกบันทึกคะแนน ยืนยันการออกจากการฝึกพูด ?
                  </span>
                </div>
              </div>
              <div class="q-mt-md q-mb-sm row">
                <div class="col q-pr-xs" align="center" v-if="isLearningAndPractice">
                  <q-img
                    @click="funcCloseSettingDialog(currentPage)"
                    v-close-popup
                    v-ripple
                    class="cursor-pointer"
                    src="/images/icon_main/icon-button-confirm-exit.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col q-pl-xs" align="center">
                  <q-img
                    v-ripple
                    v-close-popup
                    @click="funcCloseDialog()"
                    class="cursor-pointer"
                    src="/images/icon_main/icon-button-cancel.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- #endregion -->
  </div>

  <!-- #region Dialog Confirm Mini Game  -->
  <q-dialog maximized v-model="isDialogConfirmMiniGame" persistent class="z-max">
    <q-card class="transparent shadow-0 font-mali">
      <q-card-section class="fit row items-center">
        <div class="dialog-container">
          <div
            class="q-pt-md q-pb-sm q-px-sm"
            style="background-color: #f6f3d3; border-radius: 15px"
          >
            <div align="center">
              <span class="f20">ออกจากแบบฝึกหัด</span>
            </div>

            <div
              class="box-setting-option q-pa-sm row q-mt-md"
              style="border: 0px solid; border-radius: 0px 0px 5px 5px"
            >
              <span class="f16 text-weight-light">
                แบบฝึกหัดจะไม่ถูกบันทึกคะแนนยืนยันการออกจากแบบฝึกหัด
              </span>
            </div>
            <div class="q-mt-md q-mb-sm row">
              <div class="col q-pr-xs" align="center">
                <q-img
                  @click="funcOutOfMiniGame()"
                  v-close-popup
                  v-ripple
                  class="cursor-pointer"
                  src="/images/icon_main/icon-button-confirm-exit.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

              <div class="col q-pl-xs" align="center">
                <q-img
                  v-ripple
                  v-close-popup
                  @click="funcCloseDialog()"
                  class="cursor-pointer"
                  src="/images/icon_main/icon-button-cancel.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <terms-dialog
    :isShowDialogTerms="isShowDialogTerms"
    :type="termsType"
    @callback-closeDialog="isShowDialogTerms = false"
  ></terms-dialog>
</template>

<script setup>
// Components
import termsDialog from "components/payments/terms-dialog.vue";

// Store
import { useSystemStore } from "src/stores/system";

import { ref,computed,onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import p_json from "/package.json";
import { useSynchronizeStore } from "src/stores/synchronize";

// Props
const props = defineProps({
  isLearningAndPractice: {
    type: Boolean,
    default: false,
  },
  isSpeakup: {
    type: Boolean,
    default: false,
  },
  currentPage: {
    type: String,
    default: "",
  },
  page:{
    type: String,
    default: "",
  }
});

// Emit
const emit = defineEmits([
  "callback-closeDialog",
  "callback-outOfMiniGame",
  "callback-isBackToCurrentStage",
]);

// Store
const systemStore = useSystemStore();
const sychronizeStore = useSynchronizeStore();

// Initial
const $q = useQuasar();
const router = useRouter();
const termsType = ref("");

// Dialog
const isDialogSetting = ref(true);
const isDialogConfirm = ref(false);
const isDialogConfirmMiniGame = ref(false);
const isShowDialogTerms = ref(false);

const funcShowDialogTermsAndPolicy = (type) => {
  isShowDialogTerms.value = true;
  termsType.value = type;
};

const funcOutOfPractice = () => {
  funcCloseDialog();
  router.replace(`/practice/unit/`);
};

const funcCloseDialog = () => {
  emit("callback-closeDialog");
};

const funcOutOfMiniGame = () => {
  emit("callback-outOfMiniGame");
};

const version = p_json.version;

const isShowButtonOutOfMiniGame = ref(false);
const funcShowButton = () => {

  let page = props.page;

  if(page == "alienQuest"){
    isShowButtonOutOfMiniGame.value = true;
  }

}

const funcHandleCloseDialog = () => {

  let page = props.page;

  if(page == "alienQuest"){
    router.replace("/lobby");
  }

}

const funcCloseSettingDialog = (page) => {
  isDialogSetting.value = false;
  $q.loading.show();

  setTimeout(() => {
    if (page) {
      if (page == "speakup") {
        emit("callback-isBackToCurrentStage", true);
      } else {
        router.replace("/practice/unit");
      }
    } else {
      emit("callback-closeDialog");
      router.replace("/practice/unit");
    }
    $q.loading.hide();
  }, 1000);
};

onMounted(() => {
  funcShowButton();
})
</script>

<style lang="scss" scoped>
.dialog-container {
  width: 320px;
  background-color: #01BFFB;
  border: 3px solid #014DA4;
  border-radius: 20px;
  padding: 7px;
  color: #4a261b;
  margin: auto;
}

.box-setting-option {
  background-color: #79DFFF;
  border-bottom: 2px solid #01BFFB;
  margin-bottom: 5px;
  border-radius: 5px 5px 0px 0px;
}

.text-link {
  color: #0085ff;
  text-decoration: underline;
}
</style>
