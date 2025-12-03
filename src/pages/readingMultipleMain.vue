<template>
  <q-page class="backdrop-reading-multiple row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-reading-lesson'"></background-main>

      <!-- #region Header -->
      <header-bar :practiceData="practiceData" @callback-font-size="funcSetFontSet"
        :page="'readingmultiple'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div v-if="!practiceData.isLoadPractice">
        <!-- #region Title -->
        <div class="absolute-top box-label-reading" align="center">
          <div class="relative-position">
            <q-img src="/images/reading/title-board.png" no-transition no-spinner>
            </q-img>
            <div align="center" class="absolute-center" style="width: 100%">
              <span class="font-itim text-label-reading text-white">{{ practiceData.titleEng }}
              </span>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Practice -->
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
                  style="width: 100%; padding: 0px"></audio>
              </div>
              <!-- #endregion -->

              <!-- #region Story -->
              <div class="font-itim box-text-content" align="left" v-if="!practiceData.isShowContent">
                <div v-if="practiceData.isSendAnswer">
                  <span class="relative-position" :style="`font-size:${practiceData.fontSize}px;`">
                    <span v-html="highLightText"></span>
                  </span>
                </div>

                <div v-if="!practiceData.isSendAnswer">
                  <div :style="`font-size:${practiceData.fontSize}px;`" v-html="practiceData.ReadingExtraContent"></div>
                  <!-- <span
                    :style="`font-size:${practiceData.fontSize}px;`"
                    v-for="(item, index) in practiceData.ReadingExtraContent"
                    class="relative-position"
                  >
                    <span
                      v-html="item.text"
                      :class="
                        item.answer == ''
                          ? 'text-black '
                          : item.isExtra
                          ? 'text-blue-5 cursor-pointer'
                          : 'text-black '
                      "
                      @mouseenter="(isShowTooltip = true), (currentIndexTooltip = index)"
                      @mouseleave="(isShowTooltip = false), (currentIndexTooltip = null)"
                    >
                    </span>

                    <div
                      class="box-tooltip"
                      :style="`font-size:${practiceData.fontSize}px;`"
                      v-if="item.isExtra && currentIndexTooltip == index"
                    >
                      <div class="text-tooltip" v-html="item.meaning"></div>
                    </div>
                  </span> -->
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Content Finish -->
              <div class="font-itim box-text-content" align="left" v-if="practiceData.isShowContent">
                <div>
                  <div :style="`font-size:${practiceData.fontSize}px;`" v-html="practiceData.ReadingExtraContent"></div>
                </div>

                <q-separator class="q-my-md"></q-separator>

                <div>
                  <span :style="`font-size:${practiceData.fontSize}px;`" class="relative-position"
                    v-html="practiceData.contentTh"></span>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region Question -->
            <div class="box-question-main" v-if="!practiceData.isShowContent">
              <div class="sub-question-main">
                <div v-html="practiceData.question"></div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Choices -->
            <div class="box-choices-main row" v-if="!practiceData.isShowContent">
              <div class="col-6" v-for="(item, index) in practiceData.choices"
                :align="index % 2 == 0 ? 'left' : 'right'"
                @click="practiceData.isSendAnswer ? null : funcSendAnswer(item)">
                <div class="button-active-main button-choice row items-center" :class="practiceData.isSendAnswer
                  ? practiceData.currentChoiceIndex == item.index
                    ? practiceData.isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                  : ''
                  ">
                  <div v-html="item.choice" align="left" class="z-max relative-position font-mali-m"></div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Button Finish -->
            <div v-if="practiceData.isShowContent"
              class="animate__animated animate__bounceIn animation-duration-0-5s animation-delay-1s">
              <div class="button-active-main button-finish" align="center">
                <q-img src="/images/button_main/button-finish-lesson.png" no-transition no-spinner
                  class="cursor-pointer" @click="practiceData.isFinishPractice = true"></q-img>
              </div>
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
        :page="'readingmultiple'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="box-content-reading mobile" v-if="!practiceData.isLoadPractice">
        <!-- #region Title -->
        <div class="relative-position" align="center">
          <q-img src="/images/reading/title-board.png" style="width: 95%; max-width: 400px; min-width: 330px"
            no-transition no-spinner>
            <div align="center" class="absolute-center transparent" style="width: 100%">
              <span class="f20 font-itim">{{ practiceData.titleEng }} </span>
            </div>
          </q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Image -->
        <div align="center" class="q-my-md q-py-sm">
          <q-img style="max-width: 650px; width: 100%; min-width: 320px" :src="practiceData.imageURL" no-transition
            no-spinner></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Audio -->
        <div>
          <audio :src="practiceData.soundURL" controls controlsList="nodownload" @play="systemStore.playVideo(true)"
            @pause="systemStore.playVideo(false)" style="width: 100%" id="audio"></audio>
        </div>
        <!-- #endregion -->

        <!-- #region Story -->
        <div class="q-mt-md" align="left">
          <div v-if="practiceData.isSendAnswer">
            <span class="relative-position" :style="`font-size:${practiceData.fontSize}px;`">
              <span v-html="highLightText"></span>
            </span>
          </div>

          <div v-if="!practiceData.isSendAnswer">
            <div :style="`font-size:${practiceData.fontSize}px;`" v-html="practiceData.ReadingExtraContent"></div>
          </div>

          <!-- #region Content Finish -->
          <div v-if="practiceData.isShowContent">
            <q-separator class="q-my-md"></q-separator>

            <div>
              <span :style="`font-size:${practiceData.fontSize}px;`" class="relative-position"
                v-html="practiceData.contentTh"></span>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Button Finish -->
        <div v-if="practiceData.isShowContent"
          class="animate__animated animate__bounceIn animation-duration-0-5s animation-delay-1s" align="center">
          <div class="button-active-main button-finish mobile" align="center">
            <q-img src="/images/button_main/button-finish-lesson.png" no-transition no-spinner class="cursor-pointer"
              @click="practiceData.isFinishPractice = true"></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <div class="box-question-and-choices" v-if="!practiceData.isShowContent && !practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-main mobile">
          <div class="sub-question-main mobile">
            <div v-html="practiceData.question"></div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Choices -->
        <div class="box-choices-main mobile">
          <div v-for="(item, index) in practiceData.choices"
            @click="practiceData.isSendAnswer ? null : funcSendAnswer(item)">
            <div class="button-active-main mobile button-choice row items-center" :class="practiceData.isSendAnswer
              ? practiceData.currentChoiceIndex == item.index
                ? practiceData.isCorrectAnswer
                  ? 'correct'
                  : 'incorrect'
                : ''
              : ''
              ">
              <div v-html="item.choice" align="left" class="z-max relative-position font-mali-m"></div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Answer action -->
  <answer-action :systemStore="systemStore" :practiceData="practiceData" :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore" @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-restart="funcRestartPractice()" @callback-showcontent="practiceData.isShowContent = true"></answer-action>
  <!-- #endregion -->

  <!-- #region Learning done -->
  <learning-done :isShowLearningDone="isShowLearningDone" @callback-closedialog="
    (isShowLearningDone = false), $router.replace('/practice/list')
    "></learning-done>
  <!-- #endregion -->

  <!-- #region Dialog Practice Complete -->
  <dialog-practice-complete v-if="isShowDialogPracticeComplete"></dialog-practice-complete>
  <!-- #endregion -->

  <!-- #region Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import answerAction from "components/answer-action.vue";

import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";

import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  reactive,
  watch,
  defineComponent,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import axios from "axios";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";

const CancelToken = axios.CancelToken;
let tokenAPI;

// Components
const components = defineComponent({
  headerBar,
  answerAction,
  backgroundMain,

  learningDone,
  loading,
});

// Props
const props = defineProps({
  isSynchronize: {
    type: Boolean,
    default: false,
  },
});

// Store
const practiceStore = usePracticeStore();
const studentStore = useStudentStore();
const systemStore = useSystemStore();
const synchronizeStore = useSynchronizeStore();

// Route And Initial Data
const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const isShowLearningDone = ref(false);
const isShowLoading = ref(false);
const currentIndexTooltip = ref(null);
const isShowTooltip = ref(false);
const isShowDialogPracticeComplete = ref(false);

const instructionData = ref({
  th: "-",
  eng: "-",
});

// Initial Practice Data
const practiceData = reactive({
  answers: [],

  instruction: {
    eng: "",
    th: "",
  },
  titleEng: "",
  titleTh: "",
  contentEng: "",
  contentTh: "",
  imageURL: "",
  soundURL: "",
  ReadingExtraContent: "",
  currentQuestion: 0,
  totalQuestion: 0,
  correct: 0,
  incorrect: 0,
  extraVocab: [],
  isSynchronize: false,
  skill: "Reading",
  score: 0,
  star: 0,
  isEnableSoundEffect: false,
  numOfPractice: 0,
  level: 0,
  unit: 0,
  coin: 0,
  counter: 0,
  fontSize: 16,
  totalCorrectQuestion: 0,

  // use current question
  choices: [],
  question: "",
  correctAnswer: 0,
  description: "",
  refs: [],

  // use current answer
  isShowBtnContent: false,
  isShowContent: false,
  isSendAnswer: false,
  isCorrectAnswer: false,
  isFinishPractice: false,
  currentChoiceIndex: null,
  currentChoice: "",
  currentAnswer: "",
  isLoadPractice: true,
  isShowDialogStartPractice: true,
  isFirstTimeReward: true,

  // teacher control
  currentStep: 0,

  func: {
    async restartPractice() {
      isShowLoading.value = true;

      if (synchronizeStore.isSync) {
        practiceData.isRestart = true;
      }

      practiceData.isFinishPractice = false;
      practiceData.isShowContent = false;
      practiceData.isShowBtnContent = false;
      practiceData.currentQuestion = 0;
      practiceData.isSendAnswer = false;
      practiceData.correct = 0;
      practiceData.answers = [];
      practiceData.star = 0;
      practiceData.totalQuestion = 0;
      answerStructure = [];
      practiceData.coin = 0;
      practiceData.counter = 0;
      practiceData.totalCorrectQuestion = 0;
      practiceData.isFirstTimeReward = false;

      if (isLoadPractice.value) {
        await funcLoadPractice();
      }
    },
  },
});

// #region Function

// #region Load Practice
const questionList = ref([]);
const isLoadPractice = ref(false);
const funcLoadPractice = async () => {
  console.clear();
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    if (synchronizeStore.isSync) {
      saveCourseSyncData(0, route.params.practiceListId, [], 0);
    }

    practiceData.counter = practiceStore.practiceData.counter;

    // Set Level and Unit and Skill
    let level = 0;
    let unit = 0;

    // Set Practice ID
    let practiceListId = route.params.practiceListId;

    // Get Practice List
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    practiceData.instruction.eng = getData.instructionEng;
    practiceData.instruction.th = getData.instructionTh;

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
    try {
      new RegExp(`(?<!test)word`, "gi");
      supportsNegativeLookbehind = true;
    } catch (error) {
      supportsNegativeLookbehind = false;
    }

    // ตอนนี้ loop vocab โดยใช้การตรวจสอบที่ทำไว้แล้ว
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

    let tempPractice = [];

    // ระบบ Synchronize
    if (synchronizeStore.isSync) {
      tempPractice = synchronizeStore.syncData.questionPool;
    }
    // ระบบปกติ
    else {
      const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/practice-getPracticeDataV3`;

      const postData = {
        practiceListId: route.params.practiceListId,
        requestURL: window.location.hash,
        mode: "server",
      };

      if (tokenAPI != undefined) tokenAPI();

      const result = await axios.post(APIURL, postData, {
        cancelToken: new CancelToken(function executor(c) {
          tokenAPI = c;
        }),
      });

      tempPractice = result.data;

      if (studentStore.studentType == "school") {
        tempPractice.sort((a, b) => Math.random() - 0.5);

        let maxQuestion = tempPractice.length;

        if (tempPractice.length > 8) {
          maxQuestion = 8;
        }

        tempPractice = tempPractice.slice(0, maxQuestion);
      }
    }

    tempPractice.sort((a, b) => a.order - b.order);

    tempPractice = tempPractice.map((x) => {
      let newChoice = x.choices.sort((a, b) => a.index - b.index);
      x.choices = newChoice;

      return x;
    });

    practiceData.answers = tempPractice.map((x) => {
      return { isCorrect: false };
    });

    questionList.value = tempPractice;

    practiceData.totalQuestion = questionList.value.length;

    await funcSelectedQuestion(true);

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

// #region Selected Question
// เลือกแบบฝึกหัดเมื่อมีการเปลื่ยนข้อ หรือ โหลดข้อมูลครั้งแรก
const funcSelectedQuestion = (firstTime) => {
  firstTime = firstTime || false;

  if (!firstTime) {
    practiceData.currentQuestion++;
  }

  // Practice Data : Show Question
  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  // Practice Data : Show Choices
  practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

  // Practice Data : Show Description
  practiceData.description = questionList.value[practiceData.currentQuestion].description;

  // Practice Data : Correct Answer
  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  // Practice Data : Refs
  practiceData.refs = questionList.value[practiceData.currentQuestion].refs;

  practiceData.isSendAnswer = false;
  practiceData.currentChoiceIndex = null;
};
// #endregion

// #region Send Answer
const audioTemp = ref("");
const isOpenHelp = ref(false);
const learningMode = ref("selfLearning");
const colorGraph = [
  { color: "red", icon: "fas fa-spider" },
  { color: "blue", icon: "fas fa-fish" },
  { color: "purple", icon: "fas fa-dove" },
  { color: "green", icon: "fas fa-frog" },
];

// ส่งคำตอบ
let answerStructure = [];
const funcSendAnswer = async (item) => {
  practiceData.isSendAnswer = true;

  const practiceStore = usePracticeStore();

  practiceData.currentChoiceIndex = item.index;

  practiceStore.saveProgressLog(
    questionList.value[practiceData.currentQuestion].id,
    route.params.practiceListId
  );

  let currentAnswer = questionList.value[practiceData.currentQuestion].choices.filter(
    (x) => x.index == practiceData.correctAnswer
  )[0].choice;

  let currentChoice = item.choice;

  if (Number(practiceData.correctAnswer) == item.index) {
    practiceData.isCorrectAnswer = true;
    practiceData.totalCorrectQuestion++;
    // practiceData.correct++;
    practiceData.answers[practiceData.currentQuestion].isCorrect = true;
  } else {
    practiceData.isCorrectAnswer = false;
    practiceData.answers[practiceData.currentQuestion].isCorrect = false;
  }

  practiceData.currentAnswer = currentAnswer;
  practiceData.currentChoice = currentChoice;

  practiceData.correct = practiceData.answers.filter((x) => x.isCorrect).length;

  practiceData.score = Math.round(
    (practiceData.correct / practiceData.totalQuestion) * 100
  );

  if (practiceData.score >= 80) {
    practiceData.star = 3;
  } else if (practiceData.score >= 65) {
    practiceData.star = 2;
  } else if (practiceData.score >= 60) {
    practiceData.star = 1;
  } else {
    practiceData.star = 0;
  }

  let structure = {
    no: practiceData.currentQuestion,
    isCorrect: practiceData.isCorrectAnswer,
    answer: practiceData.currentChoice,
    answerIndex: practiceData.currentChoiceIndex,
    question: practiceData.question,
  };

  answerStructure.push(structure);

  if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
    isShowLoading.value = true;
    practiceData.isShowBtnContent = true;
    practiceData.isRestart = false;

    practiceData.coin = practiceData.correct;

    if (!isSync.value) {
      practiceData.counter = await funcFinishPractice(
        practiceData,
        route.params.practiceListId,
        $q.platform.is
      );
    } else {
      funcFinishPractice(practiceData, route.params.practiceListId, $q.platform.is);
    }
  }

  if (isSync.value) {
    // กรณีเคส synchronize บันทึกข้อมูลสำหรับแสดงผลใน TAS ลงใน Course
    saveCourseSyncData(
      practiceData.currentQuestion,
      route.params.practiceListId,
      answerStructure,
      practiceData.score
    );
  }

  isShowLoading.value = false;
};
// #endregion

// #region Restart Practicec
const funcRestartPractice = async () => {
  isShowLoading.value = true;

  if (synchronizeStore.isSync) {
    practiceData.isRestart = true;
  }

  practiceData.isFinishPractice = false;
  practiceData.isShowContent = false;
  practiceData.isShowBtnContent = false;
  practiceData.currentQuestion = 0;
  practiceData.isSendAnswer = false;
  practiceData.correct = 0;
  practiceData.answers = [];
  practiceData.star = 0;
  practiceData.totalQuestion = 0;
  answerStructure = [];

  if (isLoadPractice.value) {
    await funcLoadPractice();
  }
};
// #endregion

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

// #endregion

// #region Computed

// Star Calculation
const star = computed(() => {
  let score = questionList.value.filter((x) => x.isCorrect);
  score = (score.length / questionList.value.length) * 100;
  let summaryStar;
  if (score >= 80) {
    summaryStar = 3;
  } else if (score >= 65) {
    summaryStar = 2;
  } else if (score >= 50) {
    summaryStar = 1;
  }
  return { score, summaryStar };
});

// #region Highlight Text In Content
const highLightText = computed(() => {
  let content = practiceData.contentEng;

  if (!practiceData.isSendAnswer) {
    return content;
  }

  // Function to strip HTML tags
  const stripHtml = (html) => {
    return html.replace(/(<([^>]+)>)/gi, "");
  };

  let result = content;
  const highLight = practiceData.refs;

  highLight.forEach((searchText) => {
    // Create a temporary copy of content with HTML stripped for comparison
    let tempContent = content;

    // Strip HTML from search text
    const plainSearchText = searchText.trim();

    // Find the start and end index of the search text in the stripped content
    const strippedContent = stripHtml(tempContent);

    const startIndex = strippedContent.indexOf(plainSearchText);

    if (startIndex !== -1) {
      // Find the corresponding position in the original HTML
      let htmlStartIndex = 0;
      let plainTextIndex = 0;

      // Walk through the original HTML until we find the start position
      while (plainTextIndex < startIndex) {
        if (tempContent[htmlStartIndex].match(/[<>]/)) {
          // Skip HTML tags
          while (
            tempContent[htmlStartIndex] !== ">" &&
            htmlStartIndex < tempContent.length
          ) {
            htmlStartIndex++;
          }
          htmlStartIndex++;
        } else {
          plainTextIndex++;
          htmlStartIndex++;
        }
      }

      // Find the end position in the original HTML
      let htmlEndIndex = htmlStartIndex;
      let remainingChars = plainSearchText.length;

      while (remainingChars > 0 && htmlEndIndex < tempContent.length) {
        if (tempContent[htmlEndIndex].match(/[<>]/)) {
          // Skip HTML tags
          while (tempContent[htmlEndIndex] !== ">" && htmlEndIndex < tempContent.length) {
            htmlEndIndex++;
          }
          htmlEndIndex++;
        } else {
          remainingChars--;
          htmlEndIndex++;
        }
      }

      // Extract the original HTML segment
      const originalHtmlSegment = tempContent.substring(htmlStartIndex, htmlEndIndex);

      // Replace this segment with the highlighted version using the specified color
      result = result.replace(
        originalHtmlSegment,
        `<span style="background-color:rgba(255,170,46,0.3)">${originalHtmlSegment}</span>`
      );
    }
  });

  return result;
});

// #endregion

// #endregion

// Mounted Function First time
let authListen;
const isSync = ref(false);
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("readingmultiple");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/readingmultiple");
      }

      // User is signed in.
      let practiceId = route.params.practiceListId;
      isSync.value = $q.sessionStorage.getItem("isSync");

      // User is signed in.
      let permission = await funcPracticePermissionLog(practiceId);

      if (!isSync.value) {
        if (!permission) {
          isShowLearningDone.value = true;
          isShowLoading.value = false;
          return;
        }

        practiceData.counter = practiceStore.practiceCurrentCounter;

        if (practiceStore.practiceCurrentCounter == 2) {
          isShowDialogPracticeComplete.value = true;
          isShowLoading.value = false;
          return;
        }

        // await funcLoadTutorial();
      }

      if (synchronizeStore.isSync) {
        if (synchronizeStore.syncData.isShowSummaryPractice) {
          practiceData.isFinishPractice = true;
          practiceData.isRestart = false;
          isShowLoading.value = false;
          return;
        }
      }

      await funcLoadPractice();
    } else {
      // User is signed out.
      router.replace("/");
    }
  });
});

watch(
  () => synchronizeStore.syncData,
  async () => {
    if (synchronizeStore.isSync) {
      if (synchronizeStore.syncData.isRestartPractice) {
        // console.log("Is Restart Practice");
        if (!practiceData.isRestart) {
          funcRestartPractice();
        }
        return;
      }

      if (!synchronizeStore.syncData.isShowSummaryPractice) {
        // console.log("Is Loading Practice");
        if (!isLoadPractice.value) {
          await funcLoadPractice();
        }
      } else {
        if (!practiceData.isFinishPractice) {
          funcFinishPractice(practiceData, route.params.practiceListId, $q.platform.is);
          practiceData.isFinishPractice = true;
          practiceData.isRestart = false;
          isShowLoading.value = false;
        }
      }
    }
  }
);

onBeforeUnmount(() => {
  if (authListen) {
    authListen();
  }

  if (tokenAPI != undefined) tokenAPI();
});
</script>

<style lang="scss" scoped>
audio {
  outline: none;
  height: 25px;
}

.vocab-extra {
  position: relative;
  display: inline-block;
  cursor: pointer;
  color: #42a5f5;
}

.vocab-extra:hover::after {
  content: attr(data-tooltip);
  width: fit-content;
  background-color: #6c757d;
  color: #fff;
  text-align: center;
  border-radius: lamp(3.125px, 0.3125vw, 5px);
  padding: clamp(3.125px, 0.3125vw, 5px);
  position: absolute;
  top: -130%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  white-space: nowrap;
  font-style: normal;
  font-weight: normal;
  transition: 0.3s;
}

// #region Box
.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  height: 100%;
  overflow: auto;
  background-color: #ffa6bc;
  margin: auto;
}

// .box-container-main::-webkit-scrollbar {
//   // width: 0rem;
// }

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

.backdrop-reading-multiple {
  background-image: url("/images/background_main/backdrop-reading.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #ffa6bc;
}

.backdrop-reading-multiple-mobile {
  width: 100%;
  height: 100%;
  background-image: url("/images/background_main/background-reading-lesson.png");
}

.box-label-reading {
  width: 34.375%;
  top: 10%;
  left: 32.5%;
}

.box-content-reading-scorll {
  width: 100%;
  top: 21.5%;
  left: 50%;
  transform: translate(-50%, 0%);
  margin: auto;
}

.box-content-reading {
  width: 62.5%;
  background-color: #f6f3d3;
  border: 0.17rem solid #4a261b;
  border-radius: 1rem;
  padding: 0.8% 0.8% 0% 0.8%;
  margin: 0% auto 1% auto;
}

.box-content-reading.mobile {
  max-width: 700px;
  width: 100%;
  min-width: 360px;
  background-color: #fff;
  border: 1px solid #4a261b;
  border-radius: 8px;
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

.box-question-main {
  width: 95%;
  border: 2px solid #4a261b;
  background: #f2c043;
  border-radius: 0.5rem;
  margin: 1.5% auto;
  padding: 0.4%;
}

.box-question-main.mobile {
  max-width: 700px;
  width: 100%;
  min-width: 360px;
  border: 2px solid #4a261b;
  background: #f2c043;
  border-radius: 8px;
  margin: 10px auto;
  padding: 5px;
  margin-bottom: 15px;
}

.sub-question-main {
  border-radius: 0.2rem;
  background: #f6f3d3;
  padding: 2.5%;
  font-size: clamp(12px, 1.2vw, 20px);
}

.sub-question-main.mobile {
  border-radius: 8px;
  background: #f6f3d3;
  padding: 15px;
  font-size: 16px;
}

.box-choices-main {
  width: 95%;
  margin: 1.5% auto 0.5% auto;
}

.box-choices-main.mobile {
  max-width: 650px;
  width: 90%;
  min-width: 320px;
  margin: 10px auto;
}

.box-question-and-choices {
  height: fit-content;
  background-color: #ffa6bc;
  padding-bottom: 7px;
}

// #endregion

// #region Button

// #endregion

// #region Text
.text-label-reading {
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

  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  -moz-transition: transform 0.3s;

  cursor: pointer;
}

.button-active-main:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
}

.button-active-main.button-finish {
  width: 20.611%;
  margin: 1.5% auto;
}

.button-finish.mobile {
  width: 200px;
  margin: 15px auto 0px auto;
}

.button-active-main.button-choice {
  width: 98%;
  background-color: #db8200;
  border: 0.1rem solid #4a261b;
  border-radius: 0.5rem;
  padding: 3.7% 6%;
  margin: 2% 0%;
  font-size: clamp(11px, 1vw, 16px);
}

.button-active-main.button-choice.mobile {
  width: 100%;
  background-color: #db8200;
  border: 1px solid #4a261b;
  border-radius: 10px;
  padding: 17px 20px;
  margin: 10px 0px;
  font-size: 16px;
}

.button-active-main.button-choice.mobile::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 94%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 8px;
}

.button-active-main.button-choice.mobile::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 3px;
  width: 14.468px;
  height: 5.572px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  border-radius: 10px 10px 1px 1px;
  opacity: 0.5;
}

.button-choice:not(.incorrect, .correct, .mobile)::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 93%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.4rem;
}

.button-choice:not(.incorrect, .correct, .mobile)::after {
  content: "";
  position: absolute;
  top: 12%;
  left: 0.5%;
  width: 3.7%;
  padding: 0.75%;
  background-color: #fff;
  border-radius: 5rem 5rem 0.3rem 0.3rem;
  transform: rotate(-35deg);
  opacity: 0.5;
}

.button-choice.correct {
  color: #58cc02;
  background-color: #8ec960;
  border: 0.1rem solid #58cc02;
  border-radius: 0.5rem;
}

.button-choice.correct.mobile {
  color: #58cc02;
  background-color: #8ec960;
  border: 1px solid #58cc02;
  border-radius: 10px;
}

.button-choice.correct::before,
.button-choice.correct.mobile::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 93%;
  background: #d7ffb8;
  border-radius: 0.4rem;
}

.button-choice.incorrect {
  color: #ff4b4b;
  background-color: #e3a9aa;
  border: 0.1rem solid #ff4b4b;
  border-radius: 0.5rem;
}

.button-choice.incorrect.mobile {
  color: #ff4b4b;
  background-color: #e3a9aa;
  border: 1px solid #ff4b4b;
  border-radius: 10px;
}

.button-choice.incorrect::before,
.button-choice.incorrect.mobile::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 93%;
  background: #ffdfe0;
  border-radius: 0.4rem;
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
  height: 50%;
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

// .bg-reading {
//   background-color: #51acff;
// }

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
