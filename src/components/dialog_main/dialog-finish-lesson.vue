<template>
  <q-dialog v-model="isShowDialogFinishLesson" persistent maximized class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container relative-position">
          <div class="sub-dialog" align="center">
            <!-- #region เลเวล/ยูนิต -->
            <div class="box-level-unit relative-position">
              <q-img
                src="/images/box_main/box-prepare-level-unit.webp"
                no-spinner
                no-transition
              ></q-img>
              <div class="absolute-center full-width f12 row justify-center">
                <div class="col self-cecnter font-fredoka" align="right">
                  <span class="relative-position">{{ ` Level ` }}</span>
                  <span class="relative-position text-level" style="margin-left: 2px">{{
                    ` ${practiceStore.level} `
                  }}</span>
                </div>
                <div class="q-mx-sm self-cecnter">
                  {{ ` - ` }}
                </div>
                <div class="col self-cecnter font-mali-b" align="left">
                  <span class="relative-position">{{ ` บทที่ ` }}</span>
                  <span class="relative-position" style="margin-left: 2px">{{
                    ` ${practiceStore.unit} `
                  }}</span>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region เฉพาะ Vocab -->
            <div class="" v-if="isVocabOnly">
              <div class="text-vocab-header font-mali-b f16" align="center">
                คำศัพท์ที่ได้รอบนี้
              </div>

              <div class="content-vocab-dialog">
                <div class="content-scroll">
                  <div
                    v-for="(itemFlashcard, indexFlashcard) in practiceData.tempLearning"
                    :key="indexFlashcard"
                    class="q-pa-xs font-mali-m f14 box-flashcard"
                    align="left"
                  >
                    <div>
                      {{ `${itemFlashcard.vocab}` }}
                    </div>
                    <div class="q-mt-sm">
                      {{ `${itemFlashcard.meaning}` }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <div v-if="!isVocabOnly">
              <!-- #region อนิเมชันข้อความ -->
              <div class="relative-position box-text-finish font-luckiest-guy">
                <div class="absolute-center full-width row justify-center">
                  <div
                    class="relative-position animation-show-text"
                    v-for="(itemText, indexText) in showTextFinish"
                    :key="indexText"
                    :style="`animation-delay:${indexText * 0.15}s;`"
                  >
                    <div
                      class="relative-position animate__animated"
                      :style="`animation-delay:${
                        indexText * 0.15
                      }s;animation-duration:0.5s`"
                      :class="`animate__${showAniamtionFinish[indexText]}`"
                    >
                      <div class="label-shadow-finish">
                        {{ itemText }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row justify-center">
                  <div
                    class="relative-position animation-show-text"
                    v-for="(itemText, indexText) in showTextFinish"
                    :key="indexText"
                    :style="`animation-delay:${indexText * 0.15}s;`"
                  >
                    <div
                      class="relative-position animate__animated"
                      :style="`animation-delay:${
                        indexText * 0.15
                      }s;animation-duration:0.5s`"
                      :class="`animate__${showAniamtionFinish[indexText]}`"
                    >
                      <div class="label-text-finish">
                        {{ itemText }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region reward -->
            <div
              class="content-dialog row justify-center relative-position"
              v-if="practiceData.isFirstTimeReward || isVocabOnly"
            >
              <div class="absolute-top box-label-reward font-fredoka f12" align="center">
                <div class="sub-label-reward">REWARD</div>
              </div>
              <div
                class="self-end box-ticket relative-position"
                v-if="isShowTicketReward"
              >
                <div class="absolute-center" style="top: 40%">
                  <q-img
                    src="/images/icon_main/icon-game-ticket.webp"
                    no-spinner
                    no-transition
                    width="28.939px"
                  ></q-img>
                </div>
                <div class="absolute-center font-mali-b" style="top: 65%">
                  <span class="f12">x</span>
                  <span class="f20">1</span>
                </div>
              </div>
              <div
                class="col box-exp f24 relative-position font-mali-b row justify-center"
                :class="practiceData.isFirstTimeReward && isVocabOnly ? 'q-mt-md' : ''"
              >
                <div
                  class="absolute-top box-bonus-frist-time"
                  v-if="practiceData.isFirstTimeReward && isVocabOnly"
                >
                  <div class="relative-position">
                    <q-img
                      src="/images/box_main/box-bonus-first-time.webp"
                      no-spinner
                      no-transition
                    ></q-img>

                    <div class="absolute-bottom-right text-bonus f12 font-fredoka">
                      {{ `+${setAmount(2500)}%` }}
                    </div>

                    <div class="absolute-top-left animation-frame">
                      <sprite-animation
                        :setWidth="320"
                        :setHeight="320"
                        :setImage="`/images/sprite_main/sprite-frame-first-time.png`"
                        :setActive="{
                          frameRate: 20,
                          duration: 0,
                          isHover: false,
                          isActive: true,
                          isLoop: true,
                        }"
                      ></sprite-animation>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 self-end row justify-center items-center"
                  style="margin-bottom: 0px"
                >
                  <div class="self-center" v-if="!practiceData.isFirstTimeReward">
                    {{ `${setAmount(practiceData.totalCorrect)}` }}
                  </div>
                  <div v-else>
                    {{ `${setAmount(2500)}` }}
                  </div>
                  <div class="self-end q-ml-sm">
                    <q-img
                      src="/images/icon_main/icon-text-xp.webp"
                      no-spinner
                      no-transition
                      width="38px"
                    ></q-img>
                  </div>
                </div>
              </div>
              <div
                align="center"
                class="box-text-ticket col-12 f10 font-mali-sb"
                v-if="studentStore.studentData.gameTicket >= 5"
              >
                {{ `Play Ticket ถึงจำนวนจำกัดแล้ว` }}
              </div>
            </div>
            <!-- #region -->

            <!-- #region โหมดควบคุม -->
            <div
              v-if="synchronizeStore.isSync"
              class="control-dialog font-mali-sb f10"
              align="center"
            >
              {{ `รอคุณครูเลือกบทเรียน, แบบฝึกหัดถัดไปก่อนนะ` }}
            </div>
            <!-- #endregion -->
          </div>

          <!-- #region ปุ่มด้านล่าง -->
          <div
            class="absolute-bottom footer-dialog row justify-around"
            v-if="!synchronizeStore.isSync"
          >
            <div>
              <q-img
                width="76px"
                class="button-active-main"
                src="/images/button_main/button-back-to-practice-unit.webp"
                no-spinner
                no-transition
                @click="funcBackToPracticeUnit()"
              ></q-img>
            </div>
            <div>
              <q-img
                width="76px"
                class="button-active-main"
                src="/images/button_main/button-restart-practice.webp"
                no-spinner
                no-transition
                @click="funcRestartLesson()"
              ></q-img>
            </div>
            <div>
              <q-img
                width="76px"
                class="button-active-main"
                :class="practiceStore.nextPractice ? '' : 'disable'"
                :src="`/images/button_main/button-next-to-practice${
                  practiceStore.nextPractice ? '' : '-disable'
                }.webp`"
                no-spinner
                no-transition
                @click="funcNextToPractice()"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region ป้าย Complete -->
          <!-- ข้างหน้า -->
          <div class="absolute-top box-label-front">
            <q-img
              src="/images/label_main/label-complete-front.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <!-- ข้างหลัง -->
          <div class="absolute-top box-label-back">
            <q-img
              src="/images/label_main/label-complete-back.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import spriteAnimation from "components/animation_main/sprite_animation_main.vue";

import { setAmount } from "src/router";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Props Data
const props = defineProps({
  practiceData: {
    type: Object,
    default: () => {},
  },
});

// Emits
const emits = defineEmits(["callback-closeDialog", "callback-restart"]);

// Intial
const router = useRouter();
const route = useRoute();

// Store
const studentStore = useStudentStore();
const practiceStore = usePracticeStore();
const synchronizeStore = useSynchronizeStore();

// Data
const isVocabOnly = ref(false);
const isShowTicketReward = ref(false);

const isShowDialogFinishLesson = ref(true);
const showTextFinish = ref([]);

const tempTextFinish1 = ["BRILLIANT", "EXCELLENT", "MAGNIFICENT"];
const tempTextFinish2 = ["FANTASTIC", "GREAT", "AWESOME"];

const animationList = ref([
  "backInDown",
  "backInLeft",
  "backInRight",
  "backInUp",
  "bounceInDown",
  "bounceInLeft",
  "bounceInRight",
  "bounceInUp",
  "fadeIn",
  "fadeInDown",
  "fadeInDownBig",
  "fadeInLeft",
  "fadeInLeftBig",
  "fadeInRight",
  "fadeInRightBig",
  "fadeInUp",
  "fadeInUpBig",
  "fadeInTopLeft",
  "fadeInTopRight",
  "fadeInBottomLeft",
  "fadeInBottomRight",
  "lightSpeedInRight",
  "lightSpeedInLeft",
  "rotateIn",
  "rotateInDownLeft",
  "rotateInDownRight",
  "rotateInUpLeft",
  "rotateInUpRight",
  "zoomIn",
  "zoomInDown",
  "zoomInLeft",
  "zoomInRight",
  "zoomInUp",
  "slideInDown",
  "slideInLeft",
  "slideInRight",
  "slideInUp",
]);

// Function

const funcBackToPracticeUnit = () => {
  router.replace("/practice/unit");
};

const funcNextToPractice = () => {
  if (practiceStore.nextPractice) {
    router.replace("/landing");
  }
};

const funcCloseDialog = () => {
  isShowDialogFinishLesson.value = false;

  setTimeout(() => {
    emits("callback-closeDialog", false);
  }, 250);
};

const funcRestartLesson = () => {
  isShowDialogFinishLesson.value = false;

  practiceStore.setPracticeData(practiceStore.practiceData);

  setTimeout(() => {
    emits("callback-restart");
  }, 250);
};

const showAniamtionFinish = ref([]);
const funcSplitText = (text) => {
  let data = text.split("");

  for (let i = 0; i < data.length; i++) {
    let randomAnimation =
      animationList.value[Math.floor(Math.random() * animationList.value.length) + 1];

    showAniamtionFinish.value = [...showAniamtionFinish.value, randomAnimation];
  }

  showTextFinish.value = data;
};

onMounted(() => {
  const systemStore = useSystemStore();
  systemStore.playEffectPass();

  if (practiceStore.practiceType == "flashcard") {
    isVocabOnly.value = true;

    if (practiceStore.currentPracticeData.counter <= 0) {
      isShowTicketReward.value = true;
    }
  } else {
    if (props.practiceData.isFirstTimeReward) {
      isShowTicketReward.value = true;
    }
  }

  let tempText = [];

  if (props.practiceData.isFinishAll) {
    tempText = tempTextFinish1[Math.floor(Math.random() * tempTextFinish1.length)];

    tempText.toLocaleUpperCase();
  } else {
    tempText = tempTextFinish2[Math.floor(Math.random() * tempTextFinish2.length)];

    tempText.toLocaleUpperCase();
  }

  funcSplitText(tempText);
});
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 280px;
  border-radius: 12px;
  padding: 6px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #512a08;

  & .sub-dialog {
    width: 100%;
    height: 100%;
    padding: 42px 8px 24px 8px;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

    // Box Level unit
    & .box-level-unit {
      color: #fff;
      width: 182px;
      margin: 8px 0px 16px;
      text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
        rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
        rgb(74, 38, 27) -0.832294px 1.81859px 0px,
        rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px,
        rgb(74, 38, 27) -1.87291px -0.701566px 0px,
        rgb(74, 38, 27) -1.30729px -1.5136px 0px,
        rgb(74, 38, 27) -0.421592px -1.95506px 0px,
        rgb(74, 38, 27) 0.567324px -1.91785px 0px,
        rgb(74, 38, 27) 1.41734px -1.41108px 0px,
        rgb(74, 38, 27) 1.92034px -0.558831px 0px;

      & .text-level {
        color: #ffbf19;
      }
    }

    // Box Text Finish
    & .box-text-finish {
      width: 100%;
      margin: 8px 0px 18px;
      overflow: hidden;
    }

    // Box Content
    & .content-dialog {
      width: 100%;
      height: 100%;
      padding: 24px 8px 8px 8px;
      border-radius: 12px;
      background: #efd080;
      margin: 26px 0px 24px;

      & .box-label-reward {
        top: -14px;
        width: 128px;
        padding: 2px;
        border-radius: 999px;
        background: #4a261b;
        color: #fff;
        margin: auto;

        & .sub-label-reward {
          padding: 2px 8px 2px 8px;
          border-radius: 99px;
          border: 1px solid #fff;
        }
      }

      & .box-ticket {
        width: 48px;
        height: 48px;
        padding: 8px 16px;
        border-radius: 50%;
        border: 2px solid #4a261b;
        background: rgba(0, 0, 0, 0.5);
        margin-right: 8px;
        text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
          rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
          rgb(74, 38, 27) -0.832294px 1.81859px 0px,
          rgb(74, 38, 27) -1.60229px 1.19694px 0px,
          rgb(74, 38, 27) -1.97998px 0.28224px 0px,
          rgb(74, 38, 27) -1.87291px -0.701566px 0px,
          rgb(74, 38, 27) -1.30729px -1.5136px 0px,
          rgb(74, 38, 27) -0.421592px -1.95506px 0px,
          rgb(74, 38, 27) 0.567324px -1.91785px 0px,
          rgb(74, 38, 27) 1.41734px -1.41108px 0px,
          rgb(74, 38, 27) 1.92034px -0.558831px 0px;
        color: #fff;
      }

      & .box-exp {
        width: 100%;
        height: 48px;
        padding: 8px;
        border-radius: 9999px;
        border: 2px solid #4a261b;
        background: rgba(0, 0, 0, 0.5);
        text-shadow: rgb(43, 43, 43) 2px 0px 0px, rgb(43, 43, 43) 1.75517px 0.958851px 0px,
          rgb(43, 43, 43) 1.0806px 1.68294px 0px, rgb(43, 43, 43) 0.141474px 1.99499px 0px,
          rgb(43, 43, 43) -0.832294px 1.81859px 0px,
          rgb(43, 43, 43) -1.60229px 1.19694px 0px,
          rgb(43, 43, 43) -1.97998px 0.28224px 0px,
          rgb(43, 43, 43) -1.87291px -0.701566px 0px,
          rgb(43, 43, 43) -1.30729px -1.5136px 0px,
          rgb(43, 43, 43) -0.421592px -1.95506px 0px,
          rgb(43, 43, 43) 0.567324px -1.91785px 0px,
          rgb(43, 43, 43) 1.41734px -1.41108px 0px,
          rgb(43, 43, 43) 1.92034px -0.558831px 0px;
        color: #fff;
        line-height: 0px;

        & .box-bonus-frist-time {
          top: -25px;
          width: 116px;
          margin: auto;

          & .animation-frame {
            width: 40px;
            left: -5px;
            top: -5px;
          }

          & .text-bonus {
            width: fit-content;
            bottom: 9px;
            right: 10px;
            text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
              rgb(0, 0, 0) -0.416147px 0.909297px 0px,
              rgb(0, 0, 0) -0.989992px 0.14112px 0px,
              rgb(0, 0, 0) -0.653644px -0.756802px 0px,
              rgb(0, 0, 0) 0.283662px -0.958924px 0px,
              rgb(0, 0, 0) 0.96017px -0.279415px 0px;
          }
        }
      }

      & .box-text-ticket {
        padding: 10px 4px 2px 4px;
        color: #ff2c2c;
      }
    }

    & .control-dialog {
      width: 100%;
      margin-top: 24px;
    }
  }

  & .footer-dialog {
    width: 100%;
    bottom: -35px;
    margin: auto;
  }

  & .box-label-front {
    top: -20px;
    width: 352px;
    left: 50%;
    transform: translateX(-50%);
  }

  & .box-label-back {
    top: -20px;
    width: 352px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
}

.animation-setup {
  animation-delay: 0.45s;
  animation-duration: 1s;

  -webkit-animation-delay: 0.45s;
  -webkit-animation-duration: 1s;
}

.text-finish-skill {
  color: #ffffff;
  text-shadow: rgb(78, 42, 2) 2px 0px 0px, rgb(78, 42, 2) 1.75517px 0.958851px 0px,
    rgb(78, 42, 2) 1.0806px 1.68294px 0px, rgb(78, 42, 2) 0.141474px 1.99499px 0px,
    rgb(78, 42, 2) -0.832294px 1.81859px 0px, rgb(78, 42, 2) -1.60229px 1.19694px 0px,
    rgb(78, 42, 2) -1.97998px 0.28224px 0px, rgb(78, 42, 2) -1.87291px -0.701566px 0px,
    rgb(78, 42, 2) -1.30729px -1.5136px 0px, rgb(78, 42, 2) -0.421592px -1.95506px 0px,
    rgb(78, 42, 2) 0.567324px -1.91785px 0px, rgb(78, 42, 2) 1.41734px -1.41108px 0px,
    rgb(78, 42, 2) 1.92034px -0.558831px 0px, rgb(78, 42, 2) 0px 4px 0px,
    rgb(78, 42, 2) 1px 4px 0px, rgb(78, 42, 2) -1px 4px 0px;
}

.label-text-finish {
  position: relative;
  background: linear-gradient(180deg, #fcef5e 0%, #fca611 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
}

.label-shadow-finish {
  font-size: 39px;
  letter-spacing: -0.1rem;
  color: transparent;
  text-shadow: rgb(57, 29, 16) 5px 0px 0px, rgb(57, 29, 16) 4.90033px 0.993347px 0px,
    rgb(57, 29, 16) 4.60531px 1.94709px 0px, rgb(57, 29, 16) 4.12668px 2.82321px 0px,
    rgb(57, 29, 16) 3.48353px 3.58678px 0px, rgb(57, 29, 16) 2.70151px 4.20736px 0px,
    rgb(57, 29, 16) 1.81179px 4.6602px 0px, rgb(57, 29, 16) 0.849836px 4.92725px 0px,
    rgb(57, 29, 16) -0.145998px 4.99787px 0px, rgb(57, 29, 16) -1.13601px 4.86924px 0px,
    rgb(57, 29, 16) -2.08073px 4.54649px 0px, rgb(57, 29, 16) -2.94251px 4.04248px 0px,
    rgb(57, 29, 16) -3.68697px 3.37732px 0px, rgb(57, 29, 16) -4.28444px 2.57751px 0px,
    rgb(57, 29, 16) -4.71111px 1.67494px 0px, rgb(57, 29, 16) -4.94996px 0.7056px 0px,
    rgb(57, 29, 16) -4.99147px -0.291871px 0px, rgb(57, 29, 16) -4.83399px -1.27771px 0px,
    rgb(57, 29, 16) -4.48379px -2.2126px 0px, rgb(57, 29, 16) -3.95484px -3.05929px 0px,
    rgb(57, 29, 16) -3.26822px -3.78401px 0px, rgb(57, 29, 16) -2.4513px -4.35788px 0px,
    rgb(57, 29, 16) -1.53666px -4.75801px 0px, rgb(57, 29, 16) -0.560763px -4.96845px 0px,
    rgb(57, 29, 16) 0.437495px -4.98082px 0px, rgb(57, 29, 16) 1.41831px -4.79462px 0px,
    rgb(57, 29, 16) 2.34258px -4.41727px 0px, rgb(57, 29, 16) 3.17346px -3.86382px 0px,
    rgb(57, 29, 16) 3.87783px -3.15633px 0px, rgb(57, 29, 16) 4.4276px -2.32301px 0px,
    rgb(57, 29, 16) 4.80085px -1.39708px 0px, rgb(57, 29, 16) 4.98271px -0.415447px 0px;
}

// #region Vocab
.text-vocab-header {
  color: #4e2a02;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989992px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756802px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279415px 0px, rgb(255, 255, 255) 0px 3px 0px;
  line-height: 7px;
}

.content-vocab-dialog {
  width: 100%;
  height: 205px;
  border-radius: 12px;
  background: #efd080;
  padding: 8px 2px 8px 8px;
  margin-top: 10px;

  & .content-scroll {
    width: 100%;
    height: 100%;
    overflow: scroll;

    & .box-flashcard {
      padding: 4px 0px;
      border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
    }

    &::-webkit-scrollbar {
      width: 3.367px;
      height: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background: #4a261b;
      border-radius: 999px;
    }

    &::-webkit-scrollbar-track {
      // border-radius: 999px;
      background: transparent;
    }
  }
}
// #endregion

// #region Button
.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  cursor: pointer;

  &.disable {
    cursor: default;
  }

  &:not(.disable):active {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
  }
}
// #endregion

// #region Animation
.animation-show-text {
  animation: showText 0.3s ease-in-out forwards;
  -webkit-animation: showText 0.3s ease-in-out forwards;
  -moz-animation: showText 0.3s ease-in-out forwards;

  opacity: 0;

  @keyframes showText {
    100% {
      opacity: 1;
    }
  }
}
// #endregion
</style>
