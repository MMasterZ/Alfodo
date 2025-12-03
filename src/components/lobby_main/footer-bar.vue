<template>
  <div>
    <q-resize-observer @resize="onResize" />
    <!-- #region Desktop -->
    <div class="relative-position row justify-between q-pa-md" v-if="isDesktop">
      <div class="row q-px-md">
        <div
          class="col-1 self-end"
          style="width: fit-content"
          v-for="(item, index) in menuList"
        >
          <div>
            <q-img
              @click="
                synchronizeStore.isSync ||
                (studentStore.studentType == 'demo' && item == 'ranking') ||
                (item == 'mystery-box' && !mysteryBoxStore.isOpenMysteryBox)
                  ? null
                  : funcGoto(item)
              "
              class="icon-menu"
              :class="
                synchronizeStore.isSync ||
                (studentStore.studentType == 'demo' && item == 'ranking') ||
                (item == 'mystery-box' && !mysteryBoxStore.isOpenMysteryBox)
                  ? 'cursor-not-allowed'
                  : 'button-active cursor-pointer'
              "
              :src="`/images/button_main/button-${item}${
                synchronizeStore.isSync ||
                (studentStore.studentType == 'demo' && item == 'ranking') ||
                (item == 'mystery-box' && !mysteryBoxStore.isOpenMysteryBox)
                  ? '-disable'
                  : ''
              }.gif`"
              no-spinner
              no-transition
            >
              <div class="fit transparent no-padding">
                <div
                  class="absolute-center"
                  style="width: 12%; top: 63%; left: 88%"
                  v-if="
                    (item == 'equipment' && inventoryStore.isNewItem) ||
                    (item == 'shop' && itemShopStore.isNewItem)
                  "
                >
                  <q-img
                    src="/images/icon_main/icon-item-alert-circle-red.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
      <q-space></q-space>
      <div
        class="col-1 self-end relative-position"
        v-if="studentStore.studentType == 'school' && eventStore.eventList.length > 0"
        style="width: fit-content"
      >
        <div class="button-learn-animation">
          <svg
            width="150"
            height="109"
            viewBox="0 0 150 109"
            style="width: 100%; height: 100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              @click="synchronizeStore.isSync ? null : funcShowDialogEvent()"
              :class="synchronizeStore.isSync ? 'cursor-not-allowed ' : 'cursor-pointer '"
            >
              <image
                v-if="!synchronizeStore.isSync"
                href="images/button_main/button-event.png"
                :x="`-${positionX}px`"
                :y="`-${positionY}px`"
              ></image>
              <image v-else href="/images/button_main/button-event-disable.png"></image>
            </g>
          </svg>
        </div>
      </div>
      <div class="col-1 self-end q-mx-md" style="width: fit-content">
        <q-img
          class="cursor-pointer icon-play-game button-learn-animation animation-stop"
          :class="synchronizeStore.isSync ? 'cursor-not-allowed ' : 'cursor-pointer '"
          @click="
            synchronizeStore.isSync || studentStore.studentType == 'demo'
              ? null
              : funcShowDialogMiniGame()
          "
          :src="`/images/button_main/button-play-game${
            synchronizeStore.isSync || studentStore.studentType == 'demo'
              ? '-disable'
              : ''
          }.png`"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <div class="col-1" style="width: fit-content">
        <q-img
          no-transition
          no-spinner
          class="icon-learning button-learn-animation animation-stop"
          :class="synchronizeStore.isSync ? 'cursor-not-allowed ' : 'cursor-pointer '"
          @click="synchronizeStore.isSync ? null : funcGotoLearning()"
          :src="`/images/button_main/button-learn${
            synchronizeStore.isSync ? '-disable' : ''
          }.png`"
        ></q-img>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="!isDesktop" class="q-pa-xs">
      <div align="center" class="q-pb-md fixed-bottom">
        <div class="row justify-center q-pb-sm">
          <div class="self-end" style="width: 100px">
            <q-img
              class="cursor-pointer icon-play-game"
              mode-mobile="true"
              @click="
                synchronizeStore.isSync || studentStore.studentType == 'demo'
                  ? null
                  : funcShowDialogMiniGame()
              "
              :src="`/images/button_main/button-play-game${
                synchronizeStore.isSync || studentStore.studentType == 'demo'
                  ? '-disable'
                  : ''
              }.png`"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="q-mx-sm self-end">
            <q-img
              class="cursor-pointer icon-learning"
              mode-mobile="true"
              @click="synchronizeStore.isSync ? null : funcGotoLearning()"
              :src="`/images/button_main/button-learn${
                synchronizeStore.isSync ? '-disable' : ''
              }.png`"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div
            class="self-end"
            style="width: 100px"
            v-if="studentStore.studentType == 'school' && eventStore.eventList.length > 0"
          >
            <div class="button-learn-animation">
              <svg
                width="150"
                height="109"
                viewBox="0 0 150 109"
                style="width: 100%; height: 100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  @click="synchronizeStore.isSync ? null : funcShowDialogEvent()"
                  :class="
                    synchronizeStore.isSync ? 'cursor-not-allowed ' : 'cursor-pointer '
                  "
                >
                  <image
                    v-if="!synchronizeStore.isSync"
                    href="images/button_main/button-event.png"
                    :x="`-${positionX}px`"
                    :y="`-${positionY}px`"
                  ></image>
                  <image
                    v-else
                    href="/images/button_main/button-event-disable.png"
                  ></image>
                </g>
              </svg>
            </div>
            <!-- <q-img
              class="cursor-pointer"
              width="90px"
              :class="
                synchronizeStore.isSync
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer '
              "
              :src="`${
                synchronizeStore.isSync
                  ? '/images/button_main/button-event-disable.png'
                  : '/images/button_main/button-event.png'
              }`"
              @click="synchronizeStore.isSync ? null : funcShowDialogEvent()"
              no-spinner
              no-transition
            ></q-img> -->
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>

  <dialog-maintenance
    v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="isShowDialogMaintenance = false"
  ></dialog-maintenance>

  <ranking-dialog
    :studentStore="studentStore"
    v-if="isShowDialogRanking"
    :isDialogRanking="isShowDialogRanking"
    @callback-closeDialog="isShowDialogRanking = false"
  ></ranking-dialog>

  <event-dialog
    v-if="isShowDialogEvent"
    @callback-closeDialog="isShowDialogEvent = false"
  ></event-dialog>

  <dialog-minigame-menu
    :isShowDialogMiniGanmeMenu="isShowDialogMiniGanmeMenu"
    @callback-closeDialog="isShowDialogMiniGanmeMenu = false"
  ></dialog-minigame-menu>

  <dialog-recommend-level
    v-if="isShowDialogRecommendLevel"
    @close-dialog="isShowDialogRecommendLevel = false"
  ></dialog-recommend-level>

  <dialog-your-level-2
    v-if="isShowDialogYourLevel"
    @close-dialog="isShowDialogYourLevel = false"
  ></dialog-your-level-2>
</template>

<script setup>
import rankingDialog from "components/dialog_main/ranking-dialog.vue";
import eventDialog from "components/dialog_main/dialog-event.vue";
import dialogMinigameMenu from "components/dialog_main/dialog-minigame-menu.vue";
import dialogMaintenance from "components/dialog_main/dialog-maintenance.vue";
import dialogRecommendLevel from "../dialog_main/dialog-recommend-level.vue";
import dialogYourLevel2 from "../dialog_main/dialog-your-level-2.vue";

import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useEventStore } from "src/stores/event";
import { useInventoryStore } from "src/stores/inventory";
import { useMysteryBoxStore } from "src/stores/mystery-box";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useItemShopStore } from "src/stores/item-shop";
import { useCourseStore } from "src/stores/course";

const $q = useQuasar();
const $router = useRouter();

const emit = defineEmits(["callback-showDialogAgreement"]);

// Store
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();
const practiceStore = usePracticeStore();
const eventStore = useEventStore();
const inventoryStore = useInventoryStore();
const mysteryBoxStore = useMysteryBoxStore();
const itemShopStore = useItemShopStore();
const courseStore = useCourseStore();

const isDesktop = $q.platform.is.desktop;
const isShowDialogRanking = ref(false);
const isShowDialogEvent = ref(false);
const menuList = ref([
  "ranking",
  // "mission",
  // "achievements",
  "equipment",
  "shop",
  "mystery-box",
]);

const isShowDialogMaintenance = ref(false);
const isShowDialogRecommendLevel = ref(false);
const isShowDialogYourLevel = ref(false);

const windowSize = ref({});

const funcGotoPackage = () => {
  // isShowDialogMaintenance.value = true;
  $router.push("/subscribepackage");
};

const funcGoto = async (type) => {
  if (type == "ranking") isShowDialogRanking.value = true;
  else if (type == "equipment") $router.push("/equipment");
  else if (type == "shop") $router.push("/shop");
  else if (type == "mystery-box") $router.push("/gachapon");
};

const funcGotoLearning = () => {
  const practiceStore = usePracticeStore();
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  // ถ้าเป็นนักเรียนออนไลน์
  if (studentStore.studentType == "online") {
    // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
    if (!studentStore.isAgreePolicy) {
      emit("callback-showDialogAgreement");
      return;
    }

    // ยังไม่เคยเลือกระดับ
    if (courseStore.courseLevel == 0) {
      if (!studentStore.isSkipPlacementTest) {
        if (studentStore.placementTestLevel != "") {
          isShowDialogYourLevel.value = true;
        } else {
          isShowDialogRecommendLevel.value = true;
        }
      } else {
        // isShowDialogMaintenance.value = true;
        $router.push("/subscribepackage");
      }
      return;
    }

    // เคยเลือกระดับแล้ว
    else {
      // แพ็คเกจที่ใช้งานอยู่หมดอายุ

      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }
    }
  }

  practiceStore.setPracticeSkill("Vocabulary");
  $router.push("/practice/list");
};

const isShowDialogMiniGanmeMenu = ref(false);
const funcShowDialogMiniGame = () => {
  const systemStore = useSystemStore();

  // ถ้าเป็นนักเรียนออนไลน์
  if (studentStore.studentType == "online") {
    // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
    if (!studentStore.isAgreePolicy) {
      emit("callback-showDialogAgreement");
      return;
    }

    // ยังไม่เคยเลือกระดับ
    if (courseStore.courseLevel == 0) {
      if (!studentStore.isSkipPlacementTest) {
        if (studentStore.placementTestLevel != "") {
          isShowDialogYourLevel.value = true;
        } else {
          isShowDialogRecommendLevel.value = true;
        }

        return;
      } else {
        // isShowDialogMaintenance.value = true;
        $router.push("/subscribepackage");
        return;
      }
    }

    // เคยเลือกระดับแล้ว
    else {
      // แพ็คเกจที่ใช้งานอยู่หมดอายุ
      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }
    }
  }

  isShowDialogMiniGanmeMenu.value = true;
};

const funcShowDialogEvent = async () => {
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  // ถ้าเป็นนักเรียนออนไลน์
  if (studentStore.studentType == "online") {
    // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
    if (!studentStore.isAgreePolicy) {
      emit("callback-showDialogAgreement");
      return;
    }

    // ยังไม่เคยเลือกระดับ
    if (courseStore.courseLevel == 0) {
      if (!studentStore.isSkipPlacementTest) {
        if (studentStore.placementTestLevel != "") {
          isShowDialogYourLevel.value = true;
        } else {
          isShowDialogRecommendLevel.value = true;
        }

        return;
      } else {
        // isShowDialogMaintenance.value = true;
        $router.push("/subscribepackage");
        return;
      }
    }

    // เคยเลือกระดับแล้ว
    else {
      // แพ็คเกจที่ใช้งานอยู่หมดอายุ
      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }
    }
  }

  isShowDialogEvent.value = true;
};

const onResize = (size) => {
  windowSize.value = size;
};

// #region Sprite animation
const positionX = ref(0);
const positionY = ref(0);
const randomString = ref(Math.random().toString(36).substring(3));
let setIntervalAnimation;
let setTimeoutAnimtion;
const funcStartAnimation = () => {
  funcStopAnimation();

  let frameRate = 1000 / 12 || 0;
  let duration = 1.5 * 1000 || 0;

  let image = new Image();

  image.src = `/images/button_main/button-event.png?${randomString.value}`;

  image.onload = () => {
    const frameCount = Math.floor(image.width / 150);
    if (frameCount <= 1 || (duration == 0 && frameRate == 0)) {
      funcStopAnimation();
      return;
    }

    let setWidthImage = image.width;

    let tempWidth = 0;

    tempWidth = image.width;
    tempWidth = tempWidth.toString();
    tempWidth = tempWidth[tempWidth.length - 1];
    if (tempWidth == "1") {
      setWidthImage = setWidthImage.toString();
      setWidthImage = Number(setWidthImage.substring(0, setWidthImage.length - 1) + 0);
    }

    setTimeoutAnimtion = setTimeout(() => {
      setIntervalAnimation = setInterval(() => {
        if (positionX.value >= setWidthImage - 150) {
          positionX.value = 0;
          if (duration > 0) {
            funcStartAnimation();
          }
        } else {
          positionX.value += 150;
        }
      }, frameRate);
    }, duration);
  };
};

const funcStopAnimation = () => {
  if (setIntervalAnimation || setTimeoutAnimtion) {
    positionX.value = 0;
    positionY.value = 0;

    clearTimeout(setTimeoutAnimtion);
    clearInterval(setIntervalAnimation);

    setTimeoutAnimtion = null;
    setIntervalAnimation = null;
  }
};
// #endregion

onMounted(() => {
  funcStartAnimation();
});
</script>

<style lang="scss" scoped>
.button-learn-animation {
  animation: moveButton 0.8s ease-in alternate infinite;
  transform: translateY(0%);
  -webkit-animation: moveButton 0.8s ease-in alternate infinite;
  -webkit-transform: translateY(0%);
}

.button-learn-animation:hover,
.animation-stop {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

@keyframes moveButton {
  90% {
    transform: translateY(-5%);
    -webkit-transform: translateY(-5%);
  }

  to {
    transform: translateY(-5%);
    -webkit-transform: translateY(-5%);
  }
}

.button-active:hover {
  transition: transform 0.1s;
  transform: translateY(-5px);
  -webkit-transition: transform 0.1s;
  -webkit-transform: translateY(-5px);
}

.button-active:active {
  transition: 0.05s;
  transform: scale(0.95) translateY(-5px);
  -webkit-transition: 0.05s;
  -webkit-transform: scale(0.95) translateY(-5px);
}

.icon-menu {
  width: 130px;
  margin: 0px 10px;
}

.icon-menu[mode-mobile="true"] {
  max-width: 130px;
  min-width: 100px;
  width: 3vw;
}

.icon-learning {
  width: 150px;
}

.icon-learning[mode-mobile="true"] {
  max-width: 150px;
  min-width: 120px;
  width: 50%;
}

.icon-play-game {
  width: 93px;
}

.icon-play-game[mode-mobile="true"] {
  max-width: 90px;
  min-width: 65px;
  width: 50%;
}
</style>
