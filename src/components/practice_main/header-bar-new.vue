<template>
  <!-- #region Desktop -->
  <div v-if="$q.platform.is.desktop">
    <div class="absolute-top-right row justify-end box-help-and-direction">
      <!-- #region Button Pause -->
      <div class="col-1 button-active-main button-pause">
        <div class="relative-position animate__animated animate__fadeIn animation-duration-0-5s animate__delay-2s">
          <q-img src="/images/icon_main/icon-pause.png" @click="funcShowDialogSetting()" no-spinner
            no-transition></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Box name and information -->
      <div class="col self-start">
        <div
          class="relative-position row animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-1s">
          <div class="col-1 width-fit font-fredoka text-title-practice-type">
            {{ `${showNamePractice}` }}
          </div>

          <div class="button-active-main self-center button-info">
            <q-img src="/images/icon_main/icon-information.png" no-spinner no-transition
              @click="funcShowDialogTutorial()"></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <q-space></q-space>

      <!-- #region Button Direction -->
      <div class="col-1 button-active-main button-direction" v-if="isPractice">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-direction.webp" no-spinner no-transition
            @click="funcShowDialogDirection()"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Help -->
      <div class="col-1 button-active-main button-help" v-if="isShowButtonHelp">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-help.png" no-spinner no-transition @click="funcShowDialogHelp()">
          </q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Story content -->
      <div class="col-1 button-active-main button-story" v-if="isShowButtonStory">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-story-content.png" no-spinner no-transition
            @click="funcShowDialogContent()">
          </q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>

    <!-- #region Button increase and decrease font -->
    <div class="absolute-top-right button-increase-and-decrease row" v-if="isReadingLesson">
      <div class="col animate__animated animate__bounceIn animation-duration-0-5s animation-delay-0-5s"
        @click="funcSetFontSize('decrease')">
        <q-img class="button-active-main" :class="practiceData.fontSize <= 16 ? 'disable' : ''" :src="`/images/button_main/button-decrease-font${practiceData.fontSize <= 16 ? '-disable' : ''
          }.png`" no-spinner no-transition></q-img>
      </div>
      <div class="col animate__animated animate__bounceIn animation-duration-0-5s animation-delay-1s"
        @click="funcSetFontSize('increase')">
        <q-img class="button-active-main" :class="practiceData.fontSize >= 26 ? 'disable' : ''" :src="`/images/button_main/button-increase-font${practiceData.fontSize >= 26 ? '-disable' : ''
          }.png`" no-spinner no-transition></q-img>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Box Current Question Number -->
    <div class="absolute-top-left box-current-question" v-if="isPractice">
      <div class="relative-position animate__animated animate__zoomIn animate__delay-1s">
        <q-img src="/images/box_main/box-current-question.png" no-spinner no-transition></q-img>
        <div class="absolute-center text-current-question">
          <div class="font-sarabun-b">
            {{ `${practiceData.currentQuestion + 1}/${practiceData.totalQuestion}` }}
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Box Star -->
    <div class="absolute-top-left box-practice-star" v-if="isPractice">
      <div class="relative-position animate__animated animate__zoomIn animate__delay-2s">
        <q-img src="/images/box_main/box-current-star.png" no-spinner no-transition></q-img>

        <div class="absolute-center box-star row justify-center">
          <div v-for="i in 3" class="col-1 relative-position" style="width: 17.14285%; margin: 0% 1%">
            <q-img src="/images/icon_main/icon-practice-star-blank.png" no-spinner no-transition></q-img>

            <div class="absolute-center fit" v-if="practiceData.star >= i">
              <q-img class="animate__animated animate__zoomIn" style="animation-duration: 0.5s"
                :style="`animation-delay: 0.${i * 2}s`" src="/images/icon_main/icon-practice-star.png" no-spinner
                no-transition></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->

  <!-- #region Mobile -->
  <div v-else>
    <!-- #region Box Button header And Name Practice -->
    <div class="row q-pa-xs q-py-sm">
      <!-- Button Pause -->
      <div class="button-active-main button-pause mobile">
        <div class="animate__animated animate__fadeIn animation-duration-0-5s animate__delay-2s">
          <q-img src="/images/icon_main/icon-pause.png" @click="funcShowDialogSetting()" no-spinner
            no-transition></q-img>
        </div>
      </div>

      <!-- Name -->
      <div
        class="col-1 self-center text-title-practice-type mobile animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-1s">
        <div class="font-fredoka">
          {{ `${showNamePractice}` }}
        </div>
      </div>

      <!-- Button Information -->
      <div class="col-1 button-active-main self-center button-info mobile">
        <q-img src="/images/icon_main/icon-information.png" no-spinner no-transition
          @click="funcShowDialogTutorial()"></q-img>
      </div>

      <q-space></q-space>

      <div class="col-1 button-active-main self-center button-direction mobile" v-if="isPractice">
        <div class="animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-direction-circle.png" no-spinner no-transition
            @click="funcShowDialogDirection()"></q-img>
        </div>
      </div>

      <div class="col-1 button-active-main self-center button-help mobile" v-if="isShowButtonHelp">
        <div class="animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-help-circle.png" no-spinner no-transition
            @click="funcShowDialogHelp()"></q-img>
        </div>
      </div>

      <div class="col-1 button-active-main self-center button-story mobile" v-if="isShowButtonStory">
        <div class="animate__animated animate__fadeInRight animation-duration-0-5s animate__delay-1s">
          <q-img src="/images/button_main/button-story-content-circle.png" no-spinner no-transition
            @click="funcShowDialogContent()"></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Box Current Question and Star -->
    <div class="row q-mt-sm" v-if="isPractice">
      <!-- Box Current Question Number -->
      <div class="col-1 box-current-question mobile">
        <div class="relative-position animate__animated animate__zoomIn animate__delay-1s">
          <q-img src="/images/box_main/box-current-question.png" no-spinner no-transition></q-img>
          <div class="absolute-center text-current-question mobile">
            <div class="font-sarabun-b">
              {{ `${practiceData.currentQuestion + 1}/${practiceData.totalQuestion}` }}
            </div>
          </div>
        </div>
      </div>

      <!-- Box Star -->
      <div class="col-1 box-practice-star mobile">
        <div class="relative-position animate__animated animate__zoomIn animate__delay-2s">
          <q-img src="/images/box_main/box-current-star.png" no-spinner no-transition></q-img>

          <div class="absolute-center box-star row justify-center">
            <div v-for="i in 3" class="col-1 relative-position" style="width: 24px; margin: 0px 3px">
              <q-img src="/images/icon_main/icon-practice-star-blank.png" no-spinner no-transition></q-img>

              <div class="absolute-center fit" v-if="practiceData.star >= i">
                <q-img class="animate__animated animate__zoomIn" style="animation-duration: 0.5s"
                  :style="`animation-delay: 0.${i * 2}s`" src="/images/icon_main/icon-practice-star.png" no-spinner
                  no-transition></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Button increase and decrease font -->
    <div align="right" v-if="isReadingLesson">
      <div class="button-increase-and-decrease mobile row font-sarabun-b">
        <div class="col animate__animated animate__bounceIn animation-duration-0-5s animation-delay-0-5s"
          @click="funcSetFontSize('decrease')">
          <div class="button-active-main button-increase-mobile relative-position row justify-center items-center"
            :class="practiceData.fontSize <= 16 ? 'disable' : ''">
            <div class="f20">A</div>
            <div class="absolute-center icon-decrease f16">-</div>
          </div>
        </div>
        <div class="col animate__animated animate__bounceIn animation-duration-0-5s animation-delay-1s"
          @click="funcSetFontSize('increase')">
          <div class="button-active-main button-decrease-mobile relative-position row justify-center items-center"
            :class="practiceData.fontSize >= 26 ? 'disable' : ''">
            <div class="f20">A</div>
            <div class="absolute-center icon-increase f16">+</div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->

  <!-- #region Dialog start-practice -->
  <dialog-start-practice v-if="isShowDialogStartPractice && !practiceData.isLoadPractice"
    :practiceName="showNamePractice" :practiceData="practiceData"
    @callback-closeDialog="funcCloseDialog()"></dialog-start-practice>
  <!-- #endregion -->

  <!-- #region Dialog Direction -->
  <dialog-direction v-if="isShowDialogDirection && !practiceData.isLoadPractice"
    @callback-closeDialog="funcCloseDialog()"></dialog-direction>
  <!-- #endregion -->

  <!-- #region Dialog Tutorial -->
  <dialog-tutorial :isDialogTutorial="isShowDialogTutorial" v-if="isShowDialogTutorial && !practiceData.isLoadPractice"
    @callback-closeDialog="isShowDialogTutorial = false" class="z-max" :pageName="page"></dialog-tutorial>
  <!-- #endregion -->

  <!-- #region Dialog Setting -->
  <dialog-setting :isDialogSetting="isShowDialogSetting" :isLearningAndPractice="true"
    @callback-closeDialog="isShowDialogSetting = false"></dialog-setting>
  <!-- #endregion -->
</template>

<script setup>
import dialogStartPractice from "components/dialog_main/dialog-start-practice.vue";
import dialogDirection from "components/dialog_main/dialog-direction.vue";

import dialogSetting from "components/dialog_main/setting-dialog.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";

import { usePracticeStore } from "src/stores/practice";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";

import { computed, defineComponent, onMounted, ref } from "vue";

const components = defineComponent({
  dialogSetting,
  dialogTutorial,

  dialogStartPractice,
  dialogDirection,
});

const props = defineProps({
  practiceData: {
    type: Object,
    default: () => { },
  },
  page: {
    type: String,
    default: "",
  },
});

const emits = defineEmits([
  "callback-setting",
  "callback-tutorial",
  "callback-help",
  "callback-content",
  "callback-font-size",
  "callback-direction",
]);

// Store
const practiceStore = usePracticeStore();
const synchronizeStore = useSynchronizeStore();

// Initialize Data
const isShowDialogDirection = ref(false);
const isShowDialogStartPractice = ref(true);

// #region Function

// #region Dialog Show Setting
const isShowDialogSetting = ref(false);
const funcShowDialogSetting = () => {
  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  isShowDialogSetting.value = true;

  emits("callback-setting");
};
// #endregion

// #region Dialog Show Tutorial
const isShowDialogTutorial = ref(false);
const funcShowDialogTutorial = () => {
  // if (synchronizeStore.isSync) return;

  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  isShowDialogTutorial.value = true;

  emits("callback-tutorial");
};
// #endregion

// #region Dialog Close Notification
const funcCloseDialogStartPractice = () => {
  // if (synchronizeStore.isSync) return;

  props.practiceData.isShowDialogStartPractice = false;

  isShowDialogDirection.value = true;
};
// #endregion

// #region Dialog Show Direction
const funcShowDialogDirection = () => {
  // if (synchronizeStore.isSync) return;

  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  isShowDialogDirection.value = true;
};
// #endregion

// #region Dialog Close Direction
const funcCloseDialogDirection = () => {
  // if (synchronizeStore.isSync) return;

  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  isShowDialogDirection.value = false;

  emits("callback-direction");
};
// #endregion

// #region Dialog Show Help
const funcShowDialogHelp = () => {
  // if (synchronizeStore.isSync) return;

  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  emits("callback-help");
};
// #endregion

// #region Dialog Show Content
const funcShowDialogContent = () => {
  // if (synchronizeStore.isSync) return;

  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  emits("callback-content");
};
// #endregion

// #region Set Font Size
const funcSetFontSize = (type) => {
  if (props.practiceData != undefined) {
    if (props.practiceData.isSendAnswer) return;
  }

  emits("callback-font-size", type);
};
// #endregion

// #region Close Dialog
const funcCloseDialog = () => {
  if (!isShowDialogStartPractice.value) {
    isShowDialogDirection.value = false;
    return;
  } else {
    if (!practiceStore.practiceData.isLesson) {
      isShowDialogDirection.value = true;
    }
  }

  isShowDialogStartPractice.value = false;
};
// #endregion

// #endregion

// #region Computed

// #region Show Name Practice
const showNamePractice = computed(() => {
  let pt = practiceStore.practiceType;
  let skill = practiceStore.skill;

  let text = "Practice";

  if (skill == "Vocabulary") {
  } else if (skill == "Grammar") {
    if (pt == "grammarlesson") {
      text = "Grammar Lesson";
    } else if (pt == "grammaraction") {
      text = "Grammar Action";
    } else if (pt == "multiplechoices") {
      text = "Multiple choices";
    }
  } else if (skill == "Writing") {
    if (pt == "translation") {
      text = "Translation";
    }
  } else if (skill == "Reading") {
    if (props.page == "readinglesson") {
      text = "Reading Lesson";
    } else {
      text = "Multiple Choices";
    }
  } else if (skill == "Phonics") {
    if (pt == "phonicslesson") {
      text = "Phonics Lesson";
    } else {
      text = "Multiple Choices";
    }
  } else {
    if (pt == "languagetips") {
      text = "Language Tips";
    } else if (pt.includes("multiplechoices")) {
      text = "Multiple Choices";
    } else if (pt == "conversationlesson") {
      text = "Conversation";
    } else if (pt == "roleplay") {
      text = "Role Play";
    }
  }

  return text;
});
// #endregion

// #region Is Show Button Help
const isShowButtonHelp = computed(() => {
  let isShow = false;

  let pt = practiceStore.practiceType;

  let skill = practiceStore.skill;

  if (skill == "Vocabulary") {
    isShow = false;
  } else if (skill == "Grammar") {
    if (pt == "grammarlesson" || pt == "multiplechoices") {
      isShow = false;
    } else {
      isShow = true;
    }
  } else if (skill == "Phonics") {
    if (pt.includes("multiplechoices")) {
      isShow = true;
    }
  } else {
    if (pt == "multiplechoices") {
      isShow = true;
    }
  }

  return isShow;
});

const isShowButtonStory = computed(() => {
  let isShow = false;

  let pt = practiceStore.practiceType;

  let skill = practiceStore.skill;

  if (skill == "Writing") {
    if (pt == "translation") {
      isShow = true;
    }
  }

  return isShow;
});
// #endregion

// #region Is Practice
const isPractice = computed(() => {
  let isShow = false;

  let pt = practiceStore.practiceType;

  if (
    pt == "grammarlesson" ||
    pt == "phonicslesson" ||
    pt == "languagetips" ||
    pt == "readinglesson" ||
    pt == "conversationlesson"
  ) {
    isShow = false;
  } else {
    isShow = true;
  }

  return isShow;
});
// #endregion

// #region Is Reading Lesson
const isReadingLesson = computed(() => {
  let isShow = false;

  let pt = practiceStore.practiceType;

  if (pt == "readinglesson" || pt == "readingmultiplechoices") {
    isShow = true;
  }

  return isShow;
});
// #endregion

// #endregion

onMounted(() => {
  const systemStore = useSystemStore();
  const synchronizeStore = useSynchronizeStore();

  if (props.page == "") return;

  let isCheckTutorial = systemStore.checkFirstTutorial(props.page);

  if (!synchronizeStore.isSync) {
    if (isCheckTutorial) {
      isShowDialogTutorial.value = true;
    }
  }

  // if (!practiceStore.practiceData.isLesson) {
  //   isShowDialogStartPractice.value = true;
  // }
});
</script>

<style lang="scss" scoped>
// #region Box

.box-title-information {
  left: 5%;
}

.box-help-and-direction {
  width: 100%;
  padding: 0.5%;
}

.box-current-question {
  width: 3.9375%;
  top: 8%;
  left: 0.5%;
}

.box-current-question.mobile {
  width: 63px;
  height: 42px;
  margin: 0px 3px;
}

.box-practice-star {
  width: 8.75%;
  top: 8%;
  left: 5%;
}

.box-practice-star.mobile {
  width: 140px;
  margin: 0px 3px;
}

.box-star {
  top: 38%;
  width: 100%;
}

.box-star.mobile {
  width: 24px;
  margin: 0px 5px;
}

.box-instruction-pc {
  max-width: 650px;
  width: 100%;
  min-height: 250px;
  max-height: fit-content;
  background-color: #fff0da;
  border: 5px solid#A36112;
  border-radius: 10px;
  font-size: 28px;
}

.box-instruction-mobile {
  max-width: 400px;
  width: 100%;
  min-height: 200px;
  max-height: fit-content;
  background-color: #fff0da;
  border: 5px solid#A36112;
  border-radius: 10px;
  font-size: 24px;
}

.box-dialog-start-practice {
  max-width: 320px;
  width: 100%;
  font-size: 14px;
  color: #512a08;
}

// #endregion

// #region Text
.text-header-practice {
  color: #683200;
}

.text-title-practice-type {
  color: #fff;
  font-size: clamp(26px, 2.5vw, 40px);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px, 0px 4px 0px #000;
  -webkit-text-stroke-width: 1;
  -webkit-text-stroke-color: #000;
  line-height: 1;
  padding: 0% 0% 0% 1%;
}

.text-title-practice-type.mobile {
  width: fit-content;
  line-height: 1;
  padding: 3px 5px;
  font-size: 24px;
}

.text-current-question {
  top: 35%;
  font-size: clamp(12px, 0.875vw, 14px);
  color: #fff;
}

.text-current-question.mobile {
  top: 37%;
  font-size: 14px;
}

// #endregion

// #region Button

.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.05s;
  -webkit-transition: 0.05s;
  -moz-transition: 0.05s;

  cursor: pointer;
}

.button-active-main.disable {
  transform: scale(1);
  cursor: not-allowed;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-active-main.button-pause {
  max-width: 46px;
  width: 3.1249999%;
  top: 1.5%;
  left: 1%;
}

.button-pause.mobile {
  width: 40px;
}

.button-active-main.button-info {
  max-width: 24px;
  width: 1.579%;
  margin-left: 1%;
  margin-bottom: 0.5%;
}

.button-info.mobile {
  width: 14px;
}

.button-active-main.button-direction {
  max-width: 178.15px;
  width: 11.134375%;
}

.button-direction.mobile {
  width: 39px;
  margin: 0px 5px;
}

.button-active-main.button-help {
  max-width: 110.31px;
  width: 6.894375%;
  margin-left: 1%;
}

.button-help.mobile {
  width: 39px;
}

.button-story {
  max-width: 110.31px;
  width: 6.894375%;
  margin-left: 1%;
}

.button-story.mobile {
  width: 39px;
}

.button-increase-and-decrease {
  width: 6%;
  top: 9%;
  right: 1%;
}

.button-increase-and-decrease.mobile {
  width: 96px;
  margin: 0px 15px;
}

.button-increase-mobile,
.button-decrease-mobile {
  width: 48px;
  height: 35px;
  background: linear-gradient(180deg, #ba46f3 0%, #a532ea 100%);
  color: #fff;
  border: 1.094px solid #4a261b;
}

.button-increase-mobile.disable,
.button-decrease-mobile.disable {
  background: #929d9f;
  border: 1.094px solid #566162;
}

.button-increase-mobile {
  border-radius: 108.281px 0px 0px 108.281px;
}

.button-decrease-mobile {
  border-radius: 0px 108.281px 108.281px 0px;
}

.icon-increase {
  top: 25%;
  left: 70%;
}

.icon-decrease {
  top: 27%;
  left: 65%;
}

// #endregion

// #region Animation
.animation-duration-1s {
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
}

.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}

.animation-delay-0-5s {
  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
}

.animation-delay-1s {
  animation-delay: 1s;
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
}

// #endregion</style>
