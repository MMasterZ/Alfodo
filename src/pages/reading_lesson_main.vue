<template>
  <q-page class="backdrop-reading-lesson row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-reading-lesson'"></background-main>

      <!-- #region Header -->
      <header-bar :practiceData="practiceData" @callback-font-size="funcSetFontSet"
        :page="'readinglesson'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div v-if="!practiceData.isLoadPractice">
        <!-- #region Label Reading -->
        <div class="absolute-center box-label-reading" align="center">
          <div class="relative-position">
            <q-img src="/images/reading/title-board.png" no-transition no-spinner>
            </q-img>
            <div align="center" class="absolute-center" style="width: 100%">
              <span class="font-itim text-label-reading">{{ practiceData.titleEng }}
              </span>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Content -->
        <div class="absolute-top box-content-reading-scorll">
          <div class="box-content-reading">
            <div class="box-sub-content-reading relative-position">
              <!-- #region Box Image content -->
              <div class="box-image-content" align="center">
                <q-img :src="practiceData.imageURL" no-transition no-spinner></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region Box Sound -->
              <div class="box-sound-content">
                <audio :src="practiceData.soundURL" controls controlsList="nodownload"
                  @play="systemStore.playVideo(true)" @pause="systemStore.playVideo(false)" id="audio"
                  style="width: 100%"></audio>
              </div>
              <!-- #endregion -->

              <!-- #region Story -->
              <div class="font-itim box-text-content" align="left">
                <div :style="`font-size:${practiceData.fontSize}px;`" v-html="practiceData.ReadingExtraContent"></div>

              </div>
              <!-- #endregion -->
            </div>

            <!-- #region Button Finish -->
            <div class="button-active-main button-finish" align="center">
              <q-img src="/images/button_main/button-finish-lesson.png" no-transition no-spinner class="cursor-pointer"
                @click="funcSaveLessonLog()"></q-img>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-container-main-mobile absolute-center" v-if="!$q.platform.is.desktop">
      <!-- #region Header -->
      <header-bar :practiceData="practiceData" @callback-font-size="funcSetFontSet"
        :page="'readinglesson'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="box-content-reading mobile" v-if="!practiceData.isLoadPractice">
        <div class="relative-position" align="center">
          <q-img src="/images/reading/title-board.png" style="width: 95%; max-width: 400px; min-width: 330px"
            no-transition no-spinner>
            <div align="center" class="absolute-center transparent" style="width: 100%">
              <span class="f20 font-itim">{{ practiceData.titleEng }} </span>
            </div>
          </q-img>
        </div>

        <div align="center" class="q-my-md q-py-sm">
          <q-img style="max-width: 650px; width: 100%; min-width: 320px" :src="practiceData.imageURL" no-transition
            no-spinner></q-img>
        </div>

        <div style="width: 100%; border-radius: 5px">
          <div>
            <audio :src="practiceData.soundURL" controls controlsList="nodownload" @play="systemStore.playVideo(true)"
              @pause="systemStore.playVideo(false)" style="width: 100%" id="audio"></audio>
          </div>

          <div class="font-itim box-text-content" align="left">
            <div :style="`font-size:${practiceData.fontSize}px;`" v-html="practiceData.ReadingExtraContent"></div>
          </div>
        </div>

        <div class="q-pt-md q-mt-sm" align="center">
          <div class="button-active-main button-finish-mobile row justify-center items-center"
            @click="funcSaveLessonLog()">
            <div class="font-mali-m f16 relative-position z-top">จบบทเรียน</div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Finish Dialog Lesson -->
  <finish-dialog-lesson :practiceData="practiceData" :isShowDialogFinishLesson="isShowDialogFinishLesson"
    @callbackCloseDialog="isShowDialogFinishLesson = false" @callback-restart="funcRestartPractice()"
    v-if="isShowDialogFinishLesson"></finish-dialog-lesson>
  <!-- #endregion -->

  <!-- #region Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import finishDialogLesson from "components/dialog_main/dialog-finish-lesson.vue";

import { ref, onMounted, onBeforeUnmount, reactive, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  saveCourseSyncData,
} from "src/router";
import axios from "axios";
import learningDone from "../components/dialog-learning-done.vue";

import loading from "../components/dialog-loading.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";

const CancelToken = axios.CancelToken;
let tokenAPI;

// Components
const components = defineComponent({
  backgroundMain,
  headerBar,

  learningDone,
  loading,
  finishDialogLesson,
});

const props = defineProps({
  isSynchronize: {
    type: Boolean,
    default: false,
  },
});

// Store
const practiceStore = usePracticeStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();
const systemStore = useSystemStore();

// Route And Initial Data
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const isShowLoading = ref(false);
const isShowTooltip = ref(false);
const currentIndexTooltip = ref(null);

// Initial Practice Data
const practiceData = reactive({
  fontSize: 16,
  // use current answer
  isLoadPractice: true,
  isShowDialogStartPractice: false,
  isFirstTimeReward: false,
});

// #region Function

// #region Set Font Size
const funcSetFontSet = (type) => {
  if (type == "increase") {
    if (practiceData.fontSize >= 26) return;
    practiceData.fontSize += 2;
  } else {
    if (practiceData.fontSize <= 16) return;
    practiceData.fontSize -= 2;
  }
};
// #endregion

// #region Load Practice
const questionList = ref([]);
const isLoadPractice = ref(false);
const funcLoadLesson = async () => {
  console.clear();
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    // Set Practice ID
    let practiceListId = route.params.practiceListId;

    // Set Level and Unit and Skill
    let level = 0;
    let unit = 0;

    // Get Practice List
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    practiceData.level = getData.level;
    practiceData.unit = getData.unit;

    const API_URL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/practice-getReadingContent?practiceListId=${practiceListId}`

    const response = await axios.get(API_URL);

    if (response.data.message != 'success') {
      throw new Error("No data");
    }

    let tempContent = response.data.data[0]

    tempContent.extraVocab.sort((a, b) => (a.vocab > b.vocab ? 1 : -1));

    practiceData.extraVocab = tempContent.extraVocab;

    practiceData.imageURL = tempContent.imageURL;
    practiceData.contentEng = tempContent.contentEng
      .replace(/<s*p>/g, "")
      .replace(/<s*\/p>/g, "<br>")
      .replace(/<s*div>/g, "")
      .replace(/<s*\/div>/g, "<br>");

    practiceData.contentTh = tempContent.contentTh;
    practiceData.titleEng = tempContent.titleEng;
    practiceData.titleTh = tempContent.titleTh;
    practiceData.soundURL = tempContent.soundURL;

    const escapeRegExp = (string) => {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    };

    let processedContent = practiceData.contentEng;

    // Sort vocab by length (longest first) to prevent partial word matches
    const sortedVocab = [...practiceData.extraVocab].sort(
      (a, b) => b.vocab.length - a.vocab.length
    );

    // **ทดสอบ negative lookbehind รองรับหรือไม่ - ครั้งเดียวก่อน loop**
    let supportsNegativeLookbehind = false;
    // try {
    //   new RegExp(`(?<!test)word`, "gi");
    //   supportsNegativeLookbehind = true;
    //   alert("✅ Browser รองรับ Negative Lookbehind (iOS 16.4+)");
    // } catch (error) {
    //   supportsNegativeLookbehind = false;
    //   alert("⚠️ Browser ไม่รองรับ Negative Lookbehind\nใช้วิธีการทดแทน (iOS < 16.4)");
    // }

    // ตอนนี้ loop vocab โดยไม่ต้อง alert แล้ว
    sortedVocab.forEach(({ vocab, meaning, partOfSpeech }) => {
      if (!vocab || !meaning || !partOfSpeech) return;

      let regex;
      if (supportsNegativeLookbehind) {
        // ใช้ negative lookbehind
        regex = new RegExp(`(?<!<[^>]*)\\b${escapeRegExp(vocab)}\\b`, "gi");
      } else {
        // ใช้ regex ธรรมดา
        regex = new RegExp(`\\b${escapeRegExp(vocab)}\\b`, "gi");
      }

      // Replace matches with tooltip span
      processedContent = processedContent.replace(regex, (match, offset, string) => {
        // สำหรับ browser ที่ไม่รองรับ negative lookbehind ให้เช็คเอง
        if (!supportsNegativeLookbehind) {
          // Check if the match is inside an HTML tag
          const beforeMatch = string.substring(0, offset);
          const openTags = (beforeMatch.match(/</g) || []).length;
          const closeTags = (beforeMatch.match(/>/g) || []).length;

          // If we're inside a tag, don't replace
          if (openTags > closeTags) {
            return match;
          }
        }

        const tooltipContent = `${meaning} (${partOfSpeech.partOfSpeech})`;
        return `<span
          style="
            position: relative;
            display: inline-block;
            cursor: pointer;
          "
          onmouseover="this.querySelector('.vocab-tooltip').style.display='block'"
          onmouseout="this.querySelector('.vocab-tooltip').style.display='none'"
          class="text-blue-5"
        >
          ${match}
          <span
            class="vocab-tooltip"
            style="
              display: none;
              position: absolute;
              color: white;
              padding: 3px 10px;
              border-radius: 50px;
              font-size: 16px;
              bottom: 100%;
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;
              z-index: 1000;
              margin-bottom: 5px;
              background-color:#0082ba;
               font-style: normal;
              font-weight: normal;
              text-decoration: none;

            "
          >${tooltipContent} </span>
        </span>`;
      });
    });

    practiceData.ReadingExtraContent = processedContent;

    isLoadPractice.value = true;
    isShowLoading.value = false;

    practiceData.isLoadPractice = false;
  } catch (error) {
    // Keep Error Log
    // console.log(`${error} : Function Load Practice`);
    isShowLoading.value = false;
  }
};
// #endregion

// #region Restart Practice
const funcRestartPractice = () => {
  isShowLoading.value = true;
  practiceData.isLoadPractice = true;
  isShowDialogFinishLesson.value = false;
  funcLoadLesson();
};
// #endregion

// #region Save PracticeLog
const isShowDialogFinishLesson = ref(false);

const funcSaveLessonLog = async () => {
  isShowLoading.value = true;

  let practiceListId = route.params.practiceListId;

  const practiceLogData = {
    practiceListId: practiceListId,
    score: 0,
    star: 0,
    coin: 0,
    ...practiceData,
  };

  let element = document.getElementById("audio");

  element.pause();

  await practiceStore.savePracticeLog(practiceLogData, $q.platform.is);

  isShowLoading.value = false;
  isShowDialogFinishLesson.value = true;
};
// #endregion

// #endregion

// Mounted Function First time
let authListen;
onMounted(() => {
  console.clear();
  isShowLoading.value = true;

  systemStore.setRouter("readinglesson");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/readinglesson");
      }

      await funcLoadLesson();
    } else {
      // User is signed out.
      router.replace("/");
    }
  });
});

onBeforeUnmount(() => {
  if (authListen) {
    authListen();
  }

  if (tokenAPI != undefined) tokenAPI();
});
</script>

<style lang="scss" scoped>
// #region Box
.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  overflow: hidden;
}

.box-container-main-mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url("/images/background_main/background-reading-lesson.png");
  background-size: cover;
  background-position: 4% 0%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-reading-lesson {
  background-image: url("/images/background_main/backdrop-reading.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-label-reading {
  width: 34.375%;
  top: 15%;
}

.box-content-reading-scorll {
  width: 100%;
  height: calc(100% - 20%);
  top: 20%;
  left: 50%;
  transform: translate(-50%, 0%);
  overflow: auto;
  margin: auto;
}

.box-content-reading-scorll::-webkit-scrollbar {
  width: 0px;
}

.box-content-reading {
  width: 62.5%;
  background-color: #f6f3d3;
  border: 0.17rem solid #4a261b;
  border-radius: 1rem;
  padding: 0.8%;
  margin: 1% auto;
}

.box-content-reading.mobile {
  max-width: 700px;
  width: 100%;
  min-width: 360px;
  background-color: #fff;
  border: 1px solid #4a261b;
  border-radius: 16px;
  padding: 17px;
  margin: 15px auto;
}

.box-sub-content-reading {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border: 0.1rem solid #4a261b;
  border-radius: 0.5rem;
  padding: 2%;
}

.box-image-content {
  width: 70%;
  margin: auto;
}

.box-sound-content {
  width: 70%;
  margin: 2% auto;
}

.box-text-content {
  width: 100%;
}

.box-tooltip {
  top: 0%;
  background-color: #0082ba;
  border-radius: 50px;
  padding: 3px 10px;
  color: #fff;
  left: 50%;
  pointer-events: none;
  position: absolute;
  width: fit-content;
  text-align: center;
  transform: translate(-50%, -100%);
}

// #endregion

// #region Text
.text-label-reading {
  color: #fff;
  font-size: clamp(22px, 2vw, 32px);
}

.text-tooltip {
  white-space: nowrap;
}

// #endregion

// #region Button
.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
}

.button-active-main:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
}

.button-active-main.button-finish {
  width: 20.611%;
  margin: 1.5% auto 0% auto;
}

.button-finish-mobile {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  color: #4a261b;
}

.button-finish-mobile::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffd362 0%, #ffb701 100%);
}

.button-finish-mobile::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 3px;
  width: 15px;
  height: 5px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 20px 20px 7px 7px;
  z-index: 1;
}

// #endregion

// #region Old
.bg-reading-mobile {
  background-image: url("/images/reading/bg-reading.png");
  background-size: contain;
  background-position: top;
}

.box-question {
  max-width: 1000px;
  width: 100%;
  border: 4px solid #6f3c00;
  background-color: #fff;
  border-radius: 5px;
}

.box-description {
  background-color: #fff;
  border-radius: 10px;
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-container-reading {
  max-width: 1200px;
}

.bg-my-brown {
  background-color: rgba(255, 255, 255, 0);
}

.box-content {
  // height: 50%;
  overflow: hidden;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}

.box-content-show-score {
  background-color: #0095b6;
  height: 150px;
}

.box-show-score {
  min-height: 100px;
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.5);

  .box-show-score-footer,
  .box-show-score-header {
    border-radius: 50%;
  }

  .box-show-score-footer {
    box-shadow: 0 3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header {
    box-shadow: 0 -3px 7px -1px rgba(0, 0, 0, 0.2);
  }

  .box-show-score-header[data-color="red"] {
    background-color: #ff8e8e;
  }

  .box-show-score-header[data-color="blue"] {
    background-color: #61b0ea;
  }

  .box-show-score-header[data-color="purple"] {
    background-color: #e3a8ff;
  }

  .box-show-score-header[data-color="green"] {
    background-color: #81c972;
  }

  .box-show-score-footer[data-color="red"] {
    background-color: #ff6464;
  }

  .box-show-score-footer[data-color="blue"] {
    background-color: #067fd8;
  }

  .box-show-score-footer[data-color="purple"] {
    background-color: #ce67ff;
  }

  .box-show-score-footer[data-color="green"] {
    background-color: #549745;
  }
}

.box-show-score[data-color="red"] {
  background-color: #ff6464;
}

.box-show-score[data-color="blue"] {
  background-color: #067fd8;
}

.box-show-score[data-color="purple"] {
  background-color: #ce67ff;
}

.box-show-score[data-color="green"] {
  background-color: #549745;
}

.graph-mobile {
  width: 60px;
}

.graph-desktop {
  width: 100px;
}

.box-show-answer {
  min-height: calc(50vh);
  max-height: fit-content;
}

.bg-reading {
  height: 100%;
  background-image: url("/images/reading/background-reading-multiple-2.png");
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #ad4919;
}

.box-question {
  max-width: 1000px;
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.2);
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-content-main {
  max-width: 1000px;
  width: 90%;
}

.box-container-reading {
  max-width: 1000px;
}

.box-content {
  max-width: 1000px;
  width: 100%;
  border: 7px solid #cbb6e3;
  border-radius: 7px;
  background-color: #cbb6e3;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

audio {
  outline: none;
  height: 25px;
}

.text-underline {
  text-decoration: underline;
}

.bg-reading-action-mobile {
  position: relative;
  background-image: url("/images/reading/bg-reading-action-mobile.png");
  background-size: cover;
  background-position: center;
}

@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}

.box-content-extra {
  max-width: 800px;
  width: 100%;
  height: 370px;
  margin: auto;
  overflow: auto;
}

/* width */
.box-content-extra::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-content-extra::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-extra::-webkit-scrollbar-thumb {
  background: #e20418;
}

/* Handle on hover */
.box-content-extra::-webkit-scrollbar-thumb:hover {
  background: #e20418;
}

// #endregion</style>
