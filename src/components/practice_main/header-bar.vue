<template>
  <div class="relative-position full-width">
    <div
      class="relative-position row re self-start q-px-md q-pt-md box-header-container-main"
    >
      <div class="col-1 self-center width-fit">
        <q-btn
          round
          push
          flat
          size="16px"
          :disable="synchronizeStore.isSync"
          :class="synchronizeStore.isSync ? 'cursor-not-allowed' : 'cursor-pointer'"
          @click="synchronizeStore.isSync ? null : (isShowDialogSetting = true)"
        >
          <q-img src="/images/icon_main/icon-pause.png" no-transition no-spinner></q-img>
        </q-btn>
      </div>
      <div
        class="col-6 self-center relative-position text-shadow-white"
        :class="isDesktop ? 'q-px-md' : 'q-ml-sm'"
      >
        <span class="" :class="isDesktop ? 'f38' : 'f30'">
          {{ `${converPracticeType}` }}
        </span>
      </div>
      <div
        class="col-1 self-center width-fit"
        :class="isDesktop ? 'q-px-xs' : 'q-ml-sm'"
        style="width: fit-content"
      >
        <q-img
          class="cursor-pointer"
          width="20px"
          src="/images/icon_main/icon-info.png"
          @click="isShowDialogTutorial = true"
        ></q-img>
      </div>
      <q-space></q-space>
      <div class="col-2 self-center row width-fit">
        <div
          class="col-2 self-center width-fit q-mr-sm"
          v-if="isDesktop && practiceData.isEnableTimer"
        >
          <q-img
            v-if="practiceData.isStart || practiceData.isPractice"
            width="170px"
            src="/images/button_main/button-timer-practice.png"
          >
            <div
              class="absolute-center no-padding transparent"
              style="width: 55%; height: 60%; left: 65%"
              align="center"
            >
              <span
                class="f28 text-timeout text-color"
                :class="
                  !practiceData.isStart
                    ? ''
                    : practiceData.isAlertTime
                    ? 'animation-timer'
                    : ''
                "
                >{{ `${showTime.min}:${showTime.sec}` }}</span
              >
            </div>
          </q-img>
        </div>
        <div class="col-2 self-center width-fit">
          <div v-if="isDesktop">
            <q-img
              v-if="practiceData.isPractice || practiceData.isStart"
              @click="isShowDialogDirection = true"
              class="cursor-pointer"
              width="180px"
              src="/images/button_main/button-direction.png"
            ></q-img>
          </div>

          <div v-else>
            <q-img
              v-if="practiceData.isPractice || practiceData.isStart"
              @click="isShowDialogDirection = true"
              class="cursor-pointer"
              width="48px"
              src="/images/icon_main/icon-direction.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <setting-dialog
      v-if="isShowDialogSetting"
      :isLearningAndPractice="true"
      :isDialogSetting="isShowDialogSetting"
      @callback-closeDialog="isShowDialogSetting = false"
    ></setting-dialog>

    <!-- <direction-dialog
      :isDialogDirection="practiceData.isDirection"
      v-if="
        practiceData.isDirection &&
        !practiceData.isLoadingPractice &&
        practiceData.isPractice
      "
      :practiceData="practiceData"
      @callback-closeDialog="practiceData.isDirection = false"
    ></direction-dialog> -->

    <dialog-start-practice
      v-if="isShowDialogStartPractice"
      :practiceName="pageName"
      :practiceData="practiceData"
      @callback-closeDialog="funcCloseDialog()"
    ></dialog-start-practice>

    <dialog-direction
      v-if="isShowDialogDirection"
      @callback-closeDialog="funcCloseDialog()"
    ></dialog-direction>

    <!-- #region Dialog Tutorial -->
    <dialog-tutorial
      v-if="isShowDialogTutorial && !practiceData.isLoadingPractice"
      :isDialogTutorial="isShowDialogTutorial"
      :systemStore="systemStore"
      @callback-closeDialog="funcCloseTutorial()"
      :pageName="pageName"
    ></dialog-tutorial>
    <!-- #endregion -->
  </div>
</template>

<script setup>
// New
import dialogStartPractice from "../dialog_main/dialog-start-practice.vue";
import dialogDirection from "../dialog_main/dialog-direction.vue";

// Old
import settingDialog from "components/dialog_main/setting-dialog.vue";
// import directionDialog from "components/dialog_main/direction-dialog.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";
import { useQuasar } from "quasar";
import { computed, onMounted, ref, watch } from "vue";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";

// Store
const practiceStore = usePracticeStore();
const studentStore = useStudentStore();
const systemStore = useSystemStore();
const synchronizeStore = useSynchronizeStore();

// Props
const props = defineProps({
  practiceData: {
    type: Object,
  },
  pageName: {
    type: String,
    default: "",
  },
  isFirstTutorial: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emits = defineEmits(["callback-start-practice"]);

const $q = useQuasar();

const isDesktop = ref($q.platform.is.desktop);

const isShowDialogDirection = ref(false);
const isShowDialogStartPractice = ref(true);

const isShowDialogSetting = ref(false);
// const isShowDialogDirection = ref(false);
const isShowDialogTutorial = ref(false);

const showDialogTutorial = computed(() => {
  if (props.isFirstTutorial) return true;
  if (isShowDialogTutorial.value) return true;
  return false;
});

const funcCloseDialog = () => {
  if (!isShowDialogStartPractice.value) {
    isShowDialogDirection.value = false;

    if (practiceStore.practiceType == "flashcard") {
      props.practiceData.func.startPractice();
    }

    return;
  } else {
    isShowDialogDirection.value = true;
  }

  isShowDialogStartPractice.value = false;
};

const converPracticeType = computed(() => {
  let practiceType = "";

  if (practiceStore.practiceType == "flashcard") practiceType = "Flashcard";
  else if (practiceStore.practiceType == "multiplechoices")
    practiceType = "Multiple Choices";

  return practiceType;
});

const showTime = computed(() => {
  let newTime = {
    min: 0,
    sec: 0,
  };

  let min = props.practiceData.time.min;
  let sec = props.practiceData.time.sec;

  newTime.min = min <= 9 ? `0${min}` : min;
  newTime.sec = sec <= 9 ? `0${sec}` : sec;

  return newTime;
});

// #region Close Tutorial
const funcCloseTutorial = () => {
  isShowDialogTutorial.value = false;
};
// #endregion

watch(
  () => props.practiceData.isDirection,
  () => {
    if (props.practiceData.isDirection) {
      isShowDialogStartPractice.value = true;
    }
  }
  // { immediate: true }
);

onMounted(() => {
  if (practiceStore.practiceType == "flashcard") {
    isShowDialogStartPractice.value = false;
  }

  let isCheckTutorial = systemStore.checkFirstTutorial(props.pageName);

  if (!synchronizeStore.isSync) {
    if (isCheckTutorial) {
      isShowDialogTutorial.value = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.box-header-container-main {
  min-width: 320px;
}

.text-shadow-white {
  max-width: fit-content;
  min-width: 100px;
  color: #fff;
  font-family: fredoka;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px,
    rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px,
    rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px,
    rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px,
    rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px,
    rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px,
    rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px,
    rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px,
    rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px,
    rgb(0, 0, 0) 2.88051px -0.838247px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.animation-timer {
  animation: timeOut 0.3s ease-in-out infinite alternate;
  color: #4a261b;
}

.text-color {
  color: #4a261b;
}

@keyframes timeOut {
  50% {
    color: rgb(160, 0, 0);
  }
}
</style>
