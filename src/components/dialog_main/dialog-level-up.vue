<template>
  <!-- #region แสดงผลเลเวล -->
  <div
    class="box-dialog-level-up relative-position animate__animated animation-duration-0-5s"
    :class="[
      isShowDialogLevelUp ? 'animate__fadeIn' : 'animate__fadeOut',
      isMobile ? 'mobile' : '',
    ]"
  >
    <div class="sub-dialog-level-up" :class="isMobile ? 'mobile' : ''">
      <div>
        <q-img
          src="/images/label_main/label-level-result.webp"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <div class="content-dialog-level-up" :class="isMobile ? 'mobile' : ''">
        <!-- #region แสดงผล exp ทีได้รับ -->
        <div
          class="content-result-xp row justify-center"
          :class="isMobile ? 'mobile' : ''"
          align="center"
        >
          <div class="self-center font-mali-b">
            {{ `+${funcSetToken(totalLearningEXP)}` }}
          </div>
          <div class="icon-text-xp" :class="isMobile ? 'mobile' : ''">
            <q-img
              src="/images/icon_main/icon-text-xp.webp"
              no-transition
              no-spinner
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <div
          class="box-rank-main row justify-center relative-position"
          :class="isMobile ? 'mobile' : ''"
        >
          <!-- #region แสดงผลเลเวลปัจจุบัน -->
          <div
            class="absolute-center box-icon-next-level"
            :class="isMobile ? 'mobile' : ''"
          >
            <div
              class="self-center relative-position"
              :class="isShowAnimationLevelUp ? 'animation-level-up' : ''"
            >
              <q-img
                :src="`/images/box_main/box-rank-level-${currentTier}.webp`"
                no-spinner
                no-transition
              ></q-img>

              <div
                class="absolute-center fit row justify-center items-center text-level text-shadow-level font-fredoka"
                :class="isMobile ? 'mobile' : ''"
              >
                {{ `${currentLevel > 480 ? "MAX" : currentLevel}` }}
              </div>

              <div
                class="absolute-center text-level font-fredoka"
                :class="[
                  currentLevel >= 401 ? 'high-level' : 'normal-level',
                  isMobile ? 'mobile' : '',
                ]"
              >
                {{ `${currentLevel}` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region อนิเมชั่นลูกศร -->
          <div class="absolute-center box-animation-arrow">
            <div class="relative-position self-center">
              <div
                class="absolute-center"
                :class="
                  isShowAnimationLevelUp ? 'animation-arrow one' : 'animation-arrow-off'
                "
              >
                <q-img
                  src="/images/icon_main/icon-arrow-animate-level-up.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div
                class="absolute-center"
                :class="
                  isShowAnimationLevelUp ? 'animation-arrow two' : 'animation-arrow-off'
                "
              >
                <q-img
                  src="/images/icon_main/icon-arrow-animate-level-up.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region แสดงผลเลเวลอัพ -->
          <div
            class="absolute-center box-icon-current-rank"
            v-if="isShowAnimationLevelUp"
          >
            <div class="relative-position">
              <div
                class="absolute-center fit"
                style="top: 40%"
                v-if="isShowAnimationLevelUp"
              >
                <div class="relative-position animation-light-level-up delay-1s">
                  <q-img
                    src="/images/box_main/box-animate-light-level-up.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>

              <div
                class="relative-position"
                :class="isShowAnimationTierUp ? 'animation-upgrade-tier' : ''"
              >
                <div
                  class="relative-position"
                  :class="isShowAnimationLevelUp ? 'animation-level-up' : ''"
                >
                  <q-img
                    :src="`/images/box_main/box-rank-level-${currentTierUp}.webp`"
                    no-spinner
                    no-transition
                  ></q-img>

                  <div
                    class="absolute-center fit row justify-center items-center text-level text-shadow-level font-fredoka"
                    :class="isMobile ? 'mobile' : ''"
                  >
                    {{ `${currentLevelUp > 480 ? "MAX" : currentLevelUp}` }}
                  </div>

                  <div
                    class="absolute-center text-level font-fredoka"
                    :class="[
                      currentLevelUp >= 401 ? 'high-level' : 'normal-level',
                      isMobile ? 'mobile' : '',
                    ]"
                  >
                    {{ `${currentLevelUp}` }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #region หลอดเลเวล/ค่าประสบการณ์ -->
        <div class="box-progress-main" :class="isMobile ? 'mobile' : ''">
          <div class="progress-bar relative-position" :class="isMobile ? 'mobile' : ''">
            <q-img
              src="/images/box_main/box-xp-progress.webp"
              no-spinner
              no-transition
            ></q-img>

            <div
              class="absolute-top progress-animation-bar"
              :style="`transform: translateX(${comProgressLevel}%)`"
            >
              <q-img
                src="/images/box_main/box-xp-animation-progress.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>

          <div class="absolute-center icon-xp" :class="isMobile ? 'mobile' : ''">
            <q-img src="/images/icon_main/icon-xp.webp" no-spinner no-transition></q-img>
          </div>
        </div>

        <div
          class="text-progress-exp font-prompt-b"
          :class="isMobile ? 'mobile' : ''"
          align="center"
        >
          {{ `${funcSetToken(progressEXP)}/${funcSetToken(nextEXP)}` }}
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region ปุ่มรับของรางวัล -->
      <div align="center">
        <div
          class="box-button-claim"
          :class="
            (!isFirstTutorial && isFinishLevelUp && studentStore.isHasLevelReward) ||
            (isFirstTutorial && studentStore.isHasLevelReward)
              ? ''
              : 'disable'
          "
          @click="funcClaimAllLevelReward()"
        >
          <q-img
            :src="`/images/button_main/button-claim-reward${
              (!isFirstTutorial && isFinishLevelUp && studentStore.isHasLevelReward) ||
              (isFirstTutorial && studentStore.isHasLevelReward)
                ? ''
                : '-disable'
            }.webp`"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>

    <!-- #region ปุ่มปิด -->
    <div
      class="absolute-top-right button-close"
      :class="!isFinishLevelUp ? 'block' : ''"
      @click="funcCloseDialogLevelUp()"
      v-if="!isFirstTutorial && isFinishLevelUp"
    >
      <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->

  <!-- #region แสดงผลสิ้นสุดการอัพเลเวล -->
  <div class="absolute-center fit" v-if="isShowDialogTierUp">
    <div
      class="relative-position fit box-dialog-level-up animate__animated animate__fadeIn"
    >
      <div class="sub-dialog-level-up" :class="isMobile ? 'mobile' : ''">
        <div>
          <q-img
            src="/images/label_main/label-level-congratulations.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>

        <div
          class="content-dialog-level-up congratulation"
          :class="isMobile ? 'mobile' : ''"
        >
          <!-- #region แสดงผล exp ทีได้รับ -->
          <div
            class="box-text-congratulations row justify-center"
            :class="isMobile ? 'mobile' : ''"
            align="center"
          >
            <div class="self-center font-mali-b">
              {{ `You’ve been promoted!` }}
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region แสดงการเลื่อนเลเวล -->
          <div
            class="box-rank-main congratulation row justify-center relative-position"
            :class="isMobile ? 'mobile' : ''"
          >
            <div
              class="absolute-center box-icon-next-level"
              :class="isMobile ? 'mobile' : ''"
            >
              <div class="absolute-center fit" style="top: 40%">
                <div class="relative-position animation-light-level-up">
                  <q-img
                    src="/images/box_main/box-animate-light-level-up.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>

              <div class="self-center relative-position">
                <q-img
                  :src="`/images/box_main/box-rank-level-${currentTierUp}.webp`"
                  no-spinner
                  no-transition
                ></q-img>

                <div
                  class="absolute-center fit row justify-center items-center text-level text-shadow-level font-fredoka"
                  :class="isMobile ? 'mobile' : ''"
                >
                  {{ `${currentLevelUp > 480 ? "MAX" : currentLevelUp}` }}
                </div>

                <div
                  class="absolute-center text-level font-fredoka"
                  :class="[
                    currentLevelUp >= 401 ? 'high-level' : 'normal-level',
                    isMobile ? 'mobile' : '',
                  ]"
                >
                  {{ `${currentLevelUp}` }}
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <div
            class="box-pixel-text row justify-center items-center"
            :class="$q.platform.is.desktop ? '' : 'mobile'"
          >
            <div
              v-for="(itemWord, indexWord) in funcShowPixelText('promoted')"
              class="row animation-pixel-text"
              :style="`animation-delay:${indexWord * 0.1}s`"
            >
              <div class="self-center" style="margin: 0px 1.5px">
                <div
                  v-for="(itemSetWord, indexSetWord) in itemWord"
                  :key="indexSetWord"
                  class="row justify-center items-center"
                >
                  <div
                    class="col-1 self-center pixel-block"
                    v-for="(itemSetWordColor, indexSetWordColor) in itemSetWord"
                    :key="indexSetWordColor"
                    :class="[
                      $q.platform.is.desktop ? '' : 'mobile',
                      itemSetWordColor == 1 ? 'color-green' : '',
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- #region ปุ่มตกลง -->
        <div align="center">
          <div class="box-button-claim" @click="funcCloseDialogTierUp()">
            <q-img
              :src="`/images/button_main/button-congratulations-ok.webp`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
  </div>
  <!-- #endregion -->
</template>

<script setup>
import PXT from "src/js/pixel-text.js";

import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import levelExp from "src/js/level-exp";

// Emits
const emits = defineEmits([
  "closeDialogLevelUp",
  "callback-claimAllReward",
  "callback-levelUp",
]);

const props = defineProps({
  isFirstTutorial: {
    type: Boolean,
    default: false,
  },
});

// Store
const studentStore = useStudentStore();

// Initialize Data
const $q = useQuasar();

// Data
const levelExpList = ref(levelExp);
const arrayPXT = ref(PXT);
const isMobile = ref(false);
const currentTier = ref("iron-1");
const currentLevel = ref(0);
const currentEXP = ref(0);
const currentLevelUp = ref(0);
const currentTierUp = ref("iron-1");
const pendingEXP = ref(0);
const progressEXP = ref(0);
const stackEXP = ref(0);
const nextEXP = ref(0);
const totalLearningEXP = ref(0);

// Boolean
const isShowDialogLevelUp = ref(true);
const isShowAnimationLevelUp = ref(false);
const isShowAnimationTierUp = ref(false);
const isFinishLevelUp = ref(false);
const isShowDialogTierUp = ref(false);

// #region Level Up
const funcLevelUp = () => {
  isShowAnimationTierUp.value = false;
  isShowDialogTierUp.value = false;

  let studentData = studentStore.studentData;

  currentLevel.value = studentData.level;
  currentLevelUp.value = studentData.level;
  currentEXP.value = studentData.exp;

  let findLevel = levelExpList.value[currentLevel.value];

  if (findLevel) {
    currentTier.value = findLevel.tier;
    currentTierUp.value = findLevel.tier;
    nextEXP.value = Number(findLevel.exp);
  }

  // รายการ Exp ที่ต้องการอัพเลเล
  let tempLevelExp = levelExpList.value.map((x) => x.exp);
  // console.log("รายการ Exp ที่ต้องการอัพเลเล: ", tempLevelExp);

  // รายการ Tier
  let tempTier = levelExpList.value.map((x) => x.tier);
  // console.log("รายการ Tier: ", tempTier);

  // Exp ที่เก็บสระสม
  if (props.isFirstTutorial) {
    pendingEXP.value = 20;
    currentEXP.value = 0;
  } else {
    pendingEXP.value = Number(studentData.pendingEXP);
    // Exp ปัจจุบัน
    currentEXP.value = studentData.exp || 0;
    // console.log("Current Exp ปัจจุบัน: ", currentEXP.value);
  }

  // console.log("Pending EXP ที่เก็บสระสม: ", pendingEXP.value);

  progressEXP.value = currentEXP.value;

  funcProcessLevelUp();
};
// #endregion

// #region Process Level Up
let setTimeLevel;
const funcProcessLevelUp = () => {
  // console.clear();
  // Exp เลเวลต่อไป
  // console.log("Next Level Exp เลเวลต่อไป: ", nextEXP.value);

  // Exp ที่ต้องการอัพเลเวล
  // let totalNextExp = nextEXP.value - progressEXP.value;
  // console.log("*** Total Next Exp ที่ต้องการอัพเลเวล: ", totalNextExp);

  // Exp รวมที่ใช่ในการอัพเลเวล
  const promises = [];

  let totalExp = currentEXP.value + pendingEXP.value;

  // console.log(`*** Total Exp : ${totalExp}`);

  setTimeLevel = setTimeout(() => {
    // console.log(`*** Total Exp ที่ใช้ในการอัพเลเวล: ${totalExp}`);

    if (totalExp >= nextEXP.value) {
      // console.log(`*** Progress Exp ปัจจุบัน 0: ${totalExp}`);

      if (setTimeLevel) {
        clearTimeout(setTimeLevel);
      }

      totalExp -= nextEXP.value;

      progressEXP.value = nextEXP.value;

      let tier = levelExpList.value[currentLevelUp.value];

      promises.push(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            currentLevelUp.value++;

            tier = levelExpList.value[currentLevelUp.value];

            resolve("success update Progress Level");
          }, 150);
        })
      );

      promises.push(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (!tier) {
              tier = "chosen-one-4";
            } else {
              tier = tier.tier;
            }

            // มีการเลื่อนระดับ
            if (tier != currentTier.value) {
              currentTierUp.value = tier;

              isShowAnimationTierUp.value = true;
            }

            resolve("success update tempTier");
          }, 1000);
        })
      );

      Promise.all(promises)
        .then((result) => {
          // console.log(`*** Result : ${result}`);

          nextEXP.value = levelExpList.value[currentLevelUp.value].exp;

          currentEXP.value = 0;

          pendingEXP.value = totalExp;

          progressEXP.value = 0;

          if (tier != currentTier.value) {
            setTimeout(() => {
              isShowDialogTierUp.value = true;
            }, 300);
          } else {
            setTimeout(() => {
              funcProcessLevelUp();
            }, 300);
          }
        })
        .catch((error) => {
          // console.log(error);
        });

      // console.log(`*** Progress Exp ปัจจุบัน 1: ${progressEXP.value}`);
    } else {
      // console.log(`*** Progress Exp ปัจจุบัน 2: ${progressEXP.value}`);

      currentEXP.value = totalExp;

      progressEXP.value = totalExp;

      pendingEXP.value = 0;

      setTimeout(() => {
        if (currentLevelUp.value > currentLevel.value) {
          isShowAnimationLevelUp.value = false;
          currentLevel.value = currentLevelUp.value;
          studentStore.student.data.level = currentLevelUp.value;
        }

        nextEXP.value = levelExpList.value[currentLevelUp.value].exp;

        if (currentTierUp.value != currentTier.value) {
          currentTier.value = currentTierUp.value;
          studentStore.student.data.tier = currentTierUp.value;
        }

        studentStore.student.data.exp = progressEXP.value;

        studentStore.student.data.nextEXP = nextEXP.value;

        if (!props.isFirstTutorial) {
          studentStore.student.data.pendingEXP = 0;
        }

        isShowAnimationTierUp.value = false;

        isFinishLevelUp.value = true;
      }, 300);
    }
  }, 300);
};
// #endregion

// #region Show Pixel Text
const funcShowPixelText = (text) => {
  let setArrayText = text.split("");

  let setArrayPXT = [];

  setArrayText.forEach((itemText) => {
    let findText = arrayPXT.value[itemText];

    if (!findText) {
      findText = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    }

    setArrayPXT.push(findText);
  });

  return setArrayPXT;
};
// #endregion

// #region Set current token
const funcSetToken = (val) => {
  let total = val;

  return `${Number(total).toLocaleString()}`;
};
// #endregion

// #region Close Dialog Level Up
const funcCloseDialogLevelUp = () => {
  if (studentStore.student.isUpdateLevel) {
    return;
  }

  isShowDialogLevelUp.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 500);
};
// #endregion

// #region Claim All Reward
const funcClaimAllLevelReward = () => {
  if (props.isFirstTutorial) {
    if (!studentStore.isHasLevelReward) {
      return;
    }
  } else {
    if (studentStore.studentData.pendingEXP != 0 || !studentStore.isHasLevelReward) {
      return;
    }
  }

  isShowDialogLevelUp.value = false;

  setTimeout(() => {
    emits("callback-claimAllReward");
  }, 500);
};
// #endregion

// #region Close Dialog Finish Level Up
const funcCloseDialogTierUp = () => {
  isShowDialogTierUp.value = false;

  currentTier.value = currentTierUp.value;

  currentLevel.value = currentLevelUp.value;

  isShowAnimationLevelUp.value = false;

  isShowAnimationTierUp.value = false;

  if (pendingEXP.value > 0) {
    setTimeout(() => {
      funcProcessLevelUp();
    }, 300);
  }
};
// #endregion

// #region Computed

// #region Progress Level
const comProgressLevel = computed(() => {
  let progress = 0;

  progress = ((progressEXP.value / nextEXP.value) * 89).toFixed(2);

  if (progress >= 89) {
    isShowAnimationLevelUp.value = true;
    emits("callback-levelUp");
  }

  return progress;
});
// #endregion

// #endregion

watch(
  () => isFinishLevelUp,
  (value) => {
    if (value) {
      isShowDialogTierUp.value = true;
    }
  }
);

onMounted(async () => {
  if ($q.platform.is.mobile) {
    isMobile.value = true;
  }

  if (props.isFirstTutorial) {
    totalLearningEXP.value = 20;
  } else {
    if (studentStore.studentData.pendingEXP > 0) {
      totalLearningEXP.value = studentStore.studentData.pendingEXP;
    }
  }

  funcLevelUp();

  studentStore.levelUp();
});

onBeforeUnmount(() => {
  if (setTimeLevel != null) clearInterval(setTimeLevel);
});
</script>

<style lang="scss" scoped>
.box-dialog-level-up {
  width: 100%;
  height: 100%;
  border-radius: clamp(1px, 1cqw, 16px);
  border: clamp(1.25px, 0.125cqw, 2px) solid #000;
  background: #252525;
  padding: clamp(5px, 0.5cqw, 8px);

  &.mobile {
    width: 340px;
    height: 340px;
    border-radius: 16px;
    border: 2px solid #000;
    background: #252525;
    padding: 8px;
  }

  & .sub-dialog-level-up {
    width: 100%;
    height: 100%;
    border-radius: clamp(5px, 0.5cqw, 8px);
    background: #404040;
    padding: clamp(5px, 0.5cqw, 8px);

    &.mobile {
      width: 100%;
      height: 100%;
      border-radius: 8px;
      background: #404040;
      padding: 8px;
    }

    & .content-dialog-level-up {
      width: 100%;
      height: 66%;
      border-radius: clamp(5px, 0.5cqw, 8px);
      background: #2d2d2d;
      padding: clamp(2.5px, 0.25cqw, 4px) clamp(5px, 0.5cqw, 8px);
      margin: clamp(5px, 0.5cqw, 8px) 0px;

      &.congratulation {
        padding: clamp(10px, 1cqw, 16px) clamp(5px, 0.5cqw, 8px);
      }

      &.mobile {
        width: 100%;
        height: 66%;
        border-radius: 8px;
        background: #2d2d2d;
        padding: 4px 8px;
        margin: 8px 0px;
      }

      & .content-result-xp {
        border-radius: clamp(5px, 0.5cqw, 8px);
        background: #202020;
        padding: clamp(5px, 0.5cqw, 8px);
        font-size: clamp(20px, 2cqw, 32px);
        color: #fff;
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
        line-height: 0;

        &.mobile {
          border-radius: 8px;
          padding: 8px;
          font-size: 32px;
        }

        & .icon-text-xp {
          width: 23.53%;
          margin: 0px clamp(5px, 0.5cqw, 8px);

          &.mobile {
            width: 23.53%;
            margin: 0px 8px;
          }
        }
      }

      & .box-rank-main {
        width: 100%;
        height: 40%;
        margin: clamp(5px, 0.5cqw, 8px) 0px;

        &.congratulation {
          margin: clamp(15px, 1.5cqw, 24px) 0px;
        }

        &.mobile {
          width: 100%;
          height: 40%;
          margin: 8px 0px;
        }

        & .box-icon-next-level {
          width: 34.725%;
          line-height: 0;
          transition: 0.5s;

          & .text-level {
            font-size: clamp(18.75px, 1.875cqw, 30px);
            color: #fff;

            &.mobile {
              font-size: 30px;
            }

            &.text-shadow-level {
              color: transparent;
              // font-size: clamp(31.25px, 3.125cqw, 50px);
              text-shadow: rgb(43, 43, 43) 3px 0px 0px,
                rgb(43, 43, 43) 2.83487px 0.981584px 0px,
                rgb(43, 43, 43) 2.35766px 1.85511px 0px,
                rgb(43, 43, 43) 1.62091px 2.52441px 0px,
                rgb(43, 43, 43) 0.705713px 2.91581px 0px,
                rgb(43, 43, 43) -0.287171px 2.98622px 0px,
                rgb(43, 43, 43) -1.24844px 2.72789px 0px,
                rgb(43, 43, 43) -2.07227px 2.16926px 0px,
                rgb(43, 43, 43) -2.66798px 1.37182px 0px,
                rgb(43, 43, 43) -2.96998px 0.42336px 0px,
                rgb(43, 43, 43) -2.94502px -0.571704px 0px,
                rgb(43, 43, 43) -2.59586px -1.50383px 0px,
                rgb(43, 43, 43) -1.96093px -2.27041px 0px,
                rgb(43, 43, 43) -1.11013px -2.78704px 0px,
                rgb(43, 43, 43) -0.137119px -2.99686px 0px,
                rgb(43, 43, 43) 0.850987px -2.87677px 0px,
                rgb(43, 43, 43) 1.74541px -2.43999px 0px,
                rgb(43, 43, 43) 2.44769px -1.73459px 0px,
                rgb(43, 43, 43) 2.88051px -0.838247px 0px;
              letter-spacing: 0px;
            }

            &.normal-level {
              text-shadow: rgb(74, 38, 27) 3px 0px 0px,
                rgb(74, 38, 27) 2.83487px 0.981584px 0px,
                rgb(74, 38, 27) 2.35766px 1.85511px 0px,
                rgb(74, 38, 27) 1.62091px 2.52441px 0px,
                rgb(74, 38, 27) 0.705713px 2.91581px 0px,
                rgb(74, 38, 27) -0.287171px 2.98622px 0px,
                rgb(74, 38, 27) -1.24844px 2.72789px 0px,
                rgb(74, 38, 27) -2.07227px 2.16926px 0px,
                rgb(74, 38, 27) -2.66798px 1.37182px 0px,
                rgb(74, 38, 27) -2.96998px 0.42336px 0px,
                rgb(74, 38, 27) -2.94502px -0.571704px 0px,
                rgb(74, 38, 27) -2.59586px -1.50383px 0px,
                rgb(74, 38, 27) -1.96093px -2.27041px 0px,
                rgb(74, 38, 27) -1.11013px -2.78704px 0px,
                rgb(74, 38, 27) -0.137119px -2.99686px 0px,
                rgb(74, 38, 27) 0.850987px -2.87677px 0px,
                rgb(74, 38, 27) 1.74541px -2.43999px 0px,
                rgb(74, 38, 27) 2.44769px -1.73459px 0px,
                rgb(74, 38, 27) 2.88051px -0.838247px 0px;
            }

            &.high-level {
              color: transparent;
              background: linear-gradient(
                180deg,
                #ffc42c 45%,
                #fff 30%,
                #ffc42c 55%,
                #ff7a00 100%
              );
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              line-height: clamp(18.75px, 1.875cqw, 30px);

              &.mobile {
                line-height: 30px;
              }
            }
          }

          & .animation-level-up {
            animation: levelUp 0.7s ease-in-out forwards 0.3s;
            -webkit-animation: levelUp 0.7s ease-in-out forwards 0.3s;
            -moz-animation: levelUp 0.7s ease-in-out forwards 0.3s;

            transform: translateX(0%) scale(1);
            -webkit-transform: translateX(0%) scale(1);
            -moz-transform: translateX(0%) scale(1);

            @keyframes levelUp {
              0% {
                transform: translateX(0%) scale(1);
                -webkit-transform: translateX(0%) scale(1);
                -moz-transform: translateX(0%) scale(1);
              }
              100% {
                transform: translateX(-85%) scale(0.7);
                -webkit-transform: translateX(-85%) scale(0.7);
                -moz-transform: translateX(-85%) scale(0.7);
              }
            }
          }

          & .animation-level-up-off {
            animation: levelUpOff 0.5s ease-in-out forwards;
            -webkit-animation: levelUpOff 0.5s ease-in-out forwards;
            -moz-animation: levelUpOff 0.5s ease-in-out forwards;

            transform: translateX(-85%) scale(0.7);
            -webkit-transform: translateX(-85%) scale(0.7);
            -moz-transform: translateX(-85%) scale(0.7);

            opacity: 0;

            @keyframes levelUpOff {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 0;
              }

              99% {
                opacity: 0;

                transform: translateX(-85%) scale(0.7);
                -webkit-transform: translateX(-85%) scale(0.7);
                -moz-transform: translateX(-85%) scale(0.7);
              }
              100% {
                opacity: 1;
                transform: translateX(0%) scale(1);
                -webkit-transform: translateX(0%) scale(1);
                -moz-transform: translateX(0%) scale(1);
              }
            }
          }
        }

        & .box-animation-arrow {
          width: 25%;
          left: 44%;

          & .animation-arrow {
            animation: arrowLevelUp 0.5s ease-in-out forwards;
            -webkit-animation: arrowLevelUp 0.5s ease-in-out forwards;
            -moz-animation: arrowLevelUp 0.5s ease-in-out forwards;

            opacity: 0;

            &.one {
              width: 33.34%;
              left: 30%;
              animation-delay: 0.55s;
            }

            &.two {
              width: 44.46%;
              left: 70%;
              animation-delay: 0.65s;
            }

            @keyframes arrowLevelUp {
              0% {
                opacity: 0;
              }
              90% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }

          & .animation-arrow-off {
            animation: arrowLevelUpOff 0.5s ease-in-out forwards;
            -webkit-animation: arrowLevelUpOff 0.5s ease-in-out forwards;
            -moz-animation: arrowLevelUpOff 0.5s ease-in-out forwards;

            opacity: 1;

            @keyframes arrowLevelUpOff {
              0% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          }
        }

        & .box-icon-current-rank {
          width: 34.725%;
          line-height: 0;
          left: 73%;

          & .animation-level-up {
            animation: nextLevelUp 1s ease-in-out forwards 0.3s;
            -webkit-animation: nextLevelUp 1s ease-in-out forwards 0.3s;
            -moz-animation: nextLevelUp 1s ease-in-out forwards 0.3s;

            opacity: 0;

            @keyframes nextLevelUp {
              0% {
                opacity: 0;
              }
              90% {
                opacity: 0;
              }
              100% {
                opacity: 1;
              }
            }
          }

          & .animation-upgrade-tier {
            animation: upgradeTier 0.3s ease-in-out forwards;
            -webkit-animation: upgradeTier 0.3s ease-in-out forwards;
            -moz-animation: upgradeTier 0.3s ease-in-out forwards;

            transform: scale(1);
            -webkit-transform: scale(1);
            -moz-transform: scale(1);

            @keyframes upgradeTier {
              0% {
                transform: scale(1);
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
              }
              50% {
                transform: scale(0);
                -webkit-transform: scale(0);
                -moz-transform: scale(0);
              }
              100% {
                transform: scale(1);
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
              }
            }
          }

          & .text-level {
            font-size: clamp(18.75px, 1.875cqw, 30px);
            color: #fff;

            &.mobile {
              font-size: 30px;
            }

            &.text-shadow-level {
              color: transparent;
              // font-size: clamp(31.25px, 3.125cqw, 50px);
              text-shadow: rgb(43, 43, 43) 3px 0px 0px,
                rgb(43, 43, 43) 2.83487px 0.981584px 0px,
                rgb(43, 43, 43) 2.35766px 1.85511px 0px,
                rgb(43, 43, 43) 1.62091px 2.52441px 0px,
                rgb(43, 43, 43) 0.705713px 2.91581px 0px,
                rgb(43, 43, 43) -0.287171px 2.98622px 0px,
                rgb(43, 43, 43) -1.24844px 2.72789px 0px,
                rgb(43, 43, 43) -2.07227px 2.16926px 0px,
                rgb(43, 43, 43) -2.66798px 1.37182px 0px,
                rgb(43, 43, 43) -2.96998px 0.42336px 0px,
                rgb(43, 43, 43) -2.94502px -0.571704px 0px,
                rgb(43, 43, 43) -2.59586px -1.50383px 0px,
                rgb(43, 43, 43) -1.96093px -2.27041px 0px,
                rgb(43, 43, 43) -1.11013px -2.78704px 0px,
                rgb(43, 43, 43) -0.137119px -2.99686px 0px,
                rgb(43, 43, 43) 0.850987px -2.87677px 0px,
                rgb(43, 43, 43) 1.74541px -2.43999px 0px,
                rgb(43, 43, 43) 2.44769px -1.73459px 0px,
                rgb(43, 43, 43) 2.88051px -0.838247px 0px;
              letter-spacing: 0px;
            }

            &.normal-level {
              text-shadow: rgb(74, 38, 27) 3px 0px 0px,
                rgb(74, 38, 27) 2.83487px 0.981584px 0px,
                rgb(74, 38, 27) 2.35766px 1.85511px 0px,
                rgb(74, 38, 27) 1.62091px 2.52441px 0px,
                rgb(74, 38, 27) 0.705713px 2.91581px 0px,
                rgb(74, 38, 27) -0.287171px 2.98622px 0px,
                rgb(74, 38, 27) -1.24844px 2.72789px 0px,
                rgb(74, 38, 27) -2.07227px 2.16926px 0px,
                rgb(74, 38, 27) -2.66798px 1.37182px 0px,
                rgb(74, 38, 27) -2.96998px 0.42336px 0px,
                rgb(74, 38, 27) -2.94502px -0.571704px 0px,
                rgb(74, 38, 27) -2.59586px -1.50383px 0px,
                rgb(74, 38, 27) -1.96093px -2.27041px 0px,
                rgb(74, 38, 27) -1.11013px -2.78704px 0px,
                rgb(74, 38, 27) -0.137119px -2.99686px 0px,
                rgb(74, 38, 27) 0.850987px -2.87677px 0px,
                rgb(74, 38, 27) 1.74541px -2.43999px 0px,
                rgb(74, 38, 27) 2.44769px -1.73459px 0px,
                rgb(74, 38, 27) 2.88051px -0.838247px 0px;
            }

            &.high-level {
              color: transparent;
              background: linear-gradient(
                180deg,
                #ffc42c 45%,
                #fff 30%,
                #ffc42c 55%,
                #ff7a00 100%
              );
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              line-height: clamp(18.75px, 1.875cqw, 30px);

              &.mobile {
                line-height: 30px;
              }
            }
          }
        }
      }

      & .box-progress-main {
        position: relative;
        width: 95%;
        margin: clamp(7.5px, 0.75cqw, 12px) auto;
        line-height: 0;

        &.mobile {
          width: 95%;
          margin: 12px auto;
        }

        & .progress-bar {
          overflow: hidden;
          width: 100%;

          & .progress-animation-bar {
            width: 100%;
            left: -89%;
            transition: transform 0.2s;
          }
        }

        & .icon-xp {
          width: 18.16%;
          left: 7%;
        }
      }

      & .text-progress-exp {
        color: #fff;
        font-size: clamp(7.5px, 0.75cqw, 12px);
        text-shadow: rgb(19, 19, 19) 2px 0px 0px, rgb(19, 19, 19) 1.75517px 0.958851px 0px,
          rgb(19, 19, 19) 1.0806px 1.68294px 0px, rgb(19, 19, 19) 0.141474px 1.99499px 0px,
          rgb(19, 19, 19) -0.832294px 1.81859px 0px,
          rgb(19, 19, 19) -1.60229px 1.19694px 0px,
          rgb(19, 19, 19) -1.97998px 0.28224px 0px,
          rgb(19, 19, 19) -1.87291px -0.701566px 0px,
          rgb(19, 19, 19) -1.30729px -1.5136px 0px,
          rgb(19, 19, 19) -0.421592px -1.95506px 0px,
          rgb(19, 19, 19) 0.567324px -1.91785px 0px,
          rgb(19, 19, 19) 1.41734px -1.41108px 0px,
          rgb(19, 19, 19) 1.92034px -0.558831px 0px;
        line-height: 0;
        margin: clamp(10px, 1cqw, 16px) 0px;

        &.mobile {
          font-size: 12px;
          margin: 16px 0px;
        }
      }

      & .box-text-congratulations {
        color: #fff;
        font-size: clamp(10px, 1cqw, 16px);
      }
    }

    & .box-button-claim {
      width: 54.61%;
      cursor: pointer;

      &.disable {
        cursor: default;
      }
    }
  }

  & .button-close {
    width: 13.872%;
    top: -3%;
    right: -3%;
    cursor: pointer;

    &.block {
      cursor: default;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 5;
        border-radius: 50%;
      }
    }
  }
}

.box-pixel-text {
  width: 76.39%;
  padding: clamp(2.5px, 0.25cqw, 4px);
  border-radius: clamp(2.5px, 0.25cqw, 4px);
  background: #202020;
  line-height: 0;
  margin: auto;

  &.mobile {
    padding: 4px;
    border-radius: 4px;
    background: #202020;
  }

  & .pixel-block {
    width: clamp(2.5px, 0.25cqw, 4px);
    height: clamp(2.5px, 0.25cqw, 4px);
    margin: clamp(0.3125px, 0.03125cqw, 0.5px);
    background-color: #202020;

    &.mobile {
      width: 4px;
      height: 4px;
      margin: 0.5px;

      &.block {
        width: 2.42px;
        height: 2.42px;
      }
    }

    &.color-green {
      background-color: #74ff52;
    }

    &.color-red {
      background-color: #ff0000;
    }

    &.color-blue {
      background-color: #4be0ff;
    }
  }
}

// #region Animation

.animation-pixel-text {
  animation: pixelText 4s ease-in-out infinite;
  opacity: 0;

  @keyframes pixelText {
    30% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}

.animation-light-level-up {
  animation: lightLevelUp 5s linear infinite;
  -webkit-animation: lightLevelUp 5s linear infinite;
  -moz-animation: lightLevelUp 5s linear infinite;

  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  opacity: 0;

  &.delay-1s {
    animation-delay: 1s;
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
  }

  @keyframes lightLevelUp {
    0% {
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);

      opacity: 1;
    }
    100% {
      transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);

      opacity: 1;
    }
  }
}
// #endregion
</style>
