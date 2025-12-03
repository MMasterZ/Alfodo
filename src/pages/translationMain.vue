<template>
  <q-page class="backdrop-translation row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-translation'"></background-main>

      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-content="isDialogContent = true"
        :page="'translation'"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="absolute-top box-content-practice" v-if="!practiceData.isLoadPractice">
        <!-- #region Story Title -->
        <div
          class="box-title text-white animate__animated animate__fadeInDown animation-duration-0-5s"
        >
          <div class="relative-position">
            <span class="text-bold font-mali-b">
              <span v-html="practiceData.nameEng"></span>
              <div>
                <span v-html="practiceData.nameTh"></span>
              </div>
            </span>
          </div>
        </div>
        <!-- #endregion -->

        <div
          class="animate__animated animate__fadeIn animation-duration-0-5s"
          v-if="!practiceData.isHasContent"
        >
          <!-- #region Question -->
          <div class="relative-position box-question row justify-center" align="left">
            <div class="sub-question font-mali-r">
              <span v-html="practiceData.questionTh"></span>
            </div>
            <q-img
              class="absolute-top-left"
              style="width: 10%; top: -55%; left: -4%"
              src="/images/translation/icon-snow.png"
            ></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region Show Answer -->
          <div class="relative-position box-content-question">
            <div class="sub-content-question row">
              <div
                v-for="(item, index) in practiceData.question"
                class="relative-position"
                :class="
                  practiceData.isSendAnswer
                    ? item.isAnswer
                      ? item.isCorrectAnswer
                        ? 'button-select-answer correct'
                        : 'button-select-answer incorrect'
                      : 'text-not-answer self-center'
                    : item.isAnswer
                    ? item.currentAnswer == ''
                      ? practiceData.currentSelectAnswerBox == index
                        ? 'button-answer-blank'
                        : 'button-answer-blank'
                      : 'button-select-answer'
                    : 'text-not-answer self-center'
                "
                @click="
                  !practiceData.isSendAnswer
                    ? item.isAnswer
                      ? item.currentAnswer != ''
                        ? funcRemoveAnswer({
                            data: item.currentAnswer,
                            index: index,
                          })
                        : null
                      : ''
                    : ''
                "
              >
                <!-- #region Type : Not Answer -->
                <div
                  v-if="!item.isAnswer"
                  :class="item.isExtraVocab ? 'text-extra cursor-pointer' : ''"
                >
                  <div
                    @mouseenter="(isShowTooltip = true), (currentIndexTooltip = index)"
                    @mouseleave="(isShowTooltip = false), (currentIndexTooltip = null)"
                  >
                    <span v-html="item.answer"></span>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[0, 0]"
                      class="transparent"
                      v-if="item.isExtraVocab && currentIndexTooltip == index"
                      v-model="isShowTooltip"
                      transition-show="fade"
                      transition-hide="fade"
                    >
                      <div
                        class="q-pa-xs q-px-md"
                        style="background-color: #0082ba; border-radius: 50px"
                      >
                        <span class="f16" v-html="item.meaning"> </span>
                      </div>
                    </q-tooltip>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Type : Answer -->
                <div
                  v-if="item.isAnswer && item.currentAnswer == ''"
                  class="absolute-center fit"
                >
                  <q-img
                    :src="`/images/button_main/button-translation-answer${
                      !practiceData.isSendAnswer
                        ? practiceData.currentSelectAnswerBox == index
                          ? '-selected'
                          : ''
                        : ''
                    }.png`"
                    no-transition
                    no-spinner
                  ></q-img>
                </div>
                <!-- #endregion  -->

                <!-- #region Type : Answered -->
                <div
                  v-if="item.isAnswer && item.currentAnswer != ''"
                  class="row justify-center items-center fit"
                >
                  <div align="center" class="font-mali-m z-top">
                    {{ item.currentAnswer }}
                  </div>

                  <div
                    class="absolute-top-right button-remove-answer"
                    v-if="!practiceData.isSendAnswer"
                  >
                    <q-img
                      src="/images/button_main/button-translation-remove.png"
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

          <!-- #region Button Answer -->
          <div class="box-content-answer relative-position">
            <div class="row justify-center items-center" align="left">
              <div
                class="relative-position animate__animated animate__fadeInLeft button-choice row justify-center items-center animation-duration-0-5s"
                :style="`animation-delay: ${index * 0.1}s`"
                v-for="(item, index) in practiceData.choices"
                :class="
                  practiceData.allChooseAnswer
                    ? 'disable no-pointer-events'
                    : 'cursor-pointer'
                "
                @click="
                  funcSelectedChoice({
                    data: item,
                    index: index,
                  })
                "
              >
                <div class="font-mali-m z-top">
                  {{ item }}
                </div>
              </div>
            </div>

            <div style="width: 102%; top: -1%" class="absolute-center">
              <q-img
                src="/images/translation/header-translation-answer.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Button send answer -->
          <div align="center" class="">
            <div
              class="button-send-answer row justify-center items-center"
              :class="practiceData.allChooseAnswer ? '' : 'disable'"
              @click="
                practiceData.isSendAnswer
                  ? null
                  : practiceData.allChooseAnswer
                  ? funcSendAnswer()
                  : null
              "
            >
              <div class="z-top font-mali-m">
                {{ `ส่งคำตอบ` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #region Box Story Content -->
        <div style="height: 92%" v-if="practiceData.isHasContent">
          <!-- #region Story content -->
          <div
            class="relative-position box-story-content animate__animated animate__zoomIn animation-duration-0-5s animate__delay-1s"
          >
            <div class="sub-story-content">
              <div align="center" class="font-mali-sb text-title-story">เนื้อเรื่อง</div>

              <div class="box-text-story">
                <!-- <div v-for="i in 100" class="q-pa-sm brx"></div> -->
                <div
                  v-for="(item, index) in contentOverAll"
                  style="padding-bottom: 2%"
                  :key="index"
                >
                  <div class="text-bold" v-html="item.eng"></div>
                  <div style="padding-top: 0.3%">
                    <div style="color: #005f80" v-html="item.th"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Button finish practice -->
          <div align="center" class="relative-position anima">
            <div
              class="button-send-answer row justify-center items-center"
              @click="funcFinishPracticeTranslation()"
            >
              <div class="font-mali-m z-top">
                {{ `จบแบบฝึกหัด ` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-container-main-mobile absolute-center" v-if="!$q.platform.is.desktop">
      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-content="isDialogContent = true"
        :page="'translation'"
      ></header-bar>
      <!-- #endregion -->

      <div v-if="!practiceData.isLoadPractice">
        <!-- #region Story Title -->
        <div
          class="box-title mobile text-white animate__animated animate__fadeInDown animation-duration-0-5s"
        >
          <div class="relative-position">
            <span class="text-bold font-mali-b">
              {{ practiceData.nameEng }}
              <div>
                <span>{{ practiceData.nameTh }}</span>
              </div>
            </span>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Practice -->
        <div v-if="!practiceData.isHasContent">
          <!-- #region Question -->
          <div
            class="relative-position box-question mobile row justify-center"
            align="left"
          >
            <div class="sub-question mobile font-mali-r">
              <span v-html="practiceData.questionTh"></span>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Show Answer -->
          <div class="relative-position box-content-question mobile">
            <div class="sub-content-question mobile row">
              <div
                v-for="(item, index) in practiceData.question"
                class="relative-position self-start mobile"
                :class="
                  practiceData.isSendAnswer
                    ? item.isAnswer
                      ? item.isCorrectAnswer
                        ? 'button-select-answer correct'
                        : 'button-select-answer incorrect'
                      : 'text-not-answer self-center'
                    : item.isAnswer
                    ? item.currentAnswer == ''
                      ? practiceData.currentSelectAnswerBox == index
                        ? 'button-answer-blank self-center'
                        : 'button-answer-blank self-center'
                      : 'button-select-answer '
                    : 'text-not-answer self-center'
                "
                @click="
                  !practiceData.isSendAnswer
                    ? item.isAnswer
                      ? item.currentAnswer != ''
                        ? funcRemoveAnswer({
                            data: item.currentAnswer,
                            index: index,
                          })
                        : null
                      : ''
                    : ''
                "
              >
                <!-- #region Type : Not Answer -->
                <div
                  v-if="!item.isAnswer"
                  :class="item.isExtraVocab ? 'text-extra cursor-pointer' : ''"
                >
                  <div
                    @mouseenter="(isShowTooltip = true), (currentIndexTooltip = index)"
                    @mouseleave="(isShowTooltip = false), (currentIndexTooltip = null)"
                  >
                    <span v-html="item.answer"></span>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[0, 0]"
                      class="transparent"
                      v-if="item.isExtraVocab && currentIndexTooltip == index"
                      v-model="isShowTooltip"
                      transition-show="fade"
                      transition-hide="fade"
                    >
                      <div
                        class="q-pa-xs q-px-md"
                        style="background-color: #0082ba; border-radius: 50px"
                      >
                        <span class="f16" v-html="item.meaning"> </span>
                      </div>
                    </q-tooltip>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Type : Answer -->
                <div
                  v-if="item.isAnswer && item.currentAnswer == ''"
                  class="absolute-center fit"
                >
                  <q-img
                    :src="`/images/button_main/button-translation-answer${
                      !practiceData.isSendAnswer
                        ? practiceData.currentSelectAnswerBox == index
                          ? '-selected'
                          : ''
                        : ''
                    }.png`"
                    no-transition
                    no-spinner
                  ></q-img>
                </div>
                <!-- #endregion  -->

                <!-- #region Type : Answered -->
                <div
                  v-if="item.isAnswer && item.currentAnswer != ''"
                  class="row justify-center items-center fit"
                >
                  <div align="center" class="font-mali-m z-top">
                    {{ item.currentAnswer }}
                  </div>

                  <div
                    class="absolute-top-right button-remove-answer"
                    v-if="!practiceData.isSendAnswer"
                  >
                    <q-img
                      src="/images/button_main/button-translation-remove.png"
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

          <!-- #region Button Answer -->
          <div class="box-content-answer mobile relative-position">
            <div class="row" align="left">
              <div
                class="relative-position animate__animated animate__fadeInLeft button-choice mobile row justify-center items-center animation-duration-0-5s"
                :style="`animation-delay: ${index * 0.1}s`"
                v-for="(item, index) in practiceData.choices"
                :class="
                  practiceData.allChooseAnswer
                    ? 'disable no-pointer-events'
                    : 'cursor-pointer'
                "
                @click="
                  funcSelectedChoice({
                    data: item,
                    index: index,
                  })
                "
              >
                <div class="font-mali-m z-top">
                  {{ item }}
                </div>
              </div>
            </div>

            <div style="width: 105%; top: 0" class="absolute-center">
              <q-img
                src="/images/translation/header-translation-answer-mobile.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Button send answer -->
          <div align="center" class="">
            <div
              class="button-send-answer mobile row justify-center items-center"
              :class="practiceData.allChooseAnswer ? '' : 'disable'"
              @click="
                practiceData.isSendAnswer
                  ? null
                  : practiceData.allChooseAnswer
                  ? funcSendAnswer()
                  : null
              "
            >
              <div class="z-max font-mali-m">
                {{ `ส่งคำตอบ` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Box Story Content -->
        <div class="" v-if="practiceData.isHasContent">
          <!-- #region Story content -->
          <div
            class="relative-position box-story-content mobile animate__animated animate__zoomIn animation-duration-0-5s animate__delay-1s"
          >
            <div class="sub-story-content mobile">
              <div align="center" class="font-mali-sb text-title-story mobile">
                เนื้อเรื่อง
              </div>

              <div class="box-text-story mobile">
                <div v-for="(item, index) in contentOverAll" style="padding-bottom: 13px">
                  <div class="text-bold" v-html="item.eng"></div>
                  <div style="padding-top: 5px">
                    <div style="color: #005f80" v-html="item.th"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Button finish practice -->
          <div align="center" class="relative-position anima">
            <div
              class="button-send-answer mobile row justify-center items-center"
              @click="funcFinishPracticeTranslation()"
            >
              <div class="font-mali-m z-top">
                {{ `จบแบบฝึกหัด ` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Answer Action -->
  <answer-action
    :systemStore="systemStore"
    :practiceData="practiceData"
    :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore"
    @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-showcontent="practiceData.isHasContent = true"
    @callback-restart="funcRestartPractice()"
    v-if="practiceData.isSendAnswer"
  ></answer-action>
  <!-- #endregion -->

  <!-- #region Dialog Learning Done -->
  <learning-done
    :isShowLearningDone="isShowLearningDone"
    @callback-closedialog="
      (isShowLearningDone = false), $router.replace('/practice/unit')
    "
  ></learning-done>
  <!-- #endregion -->

  <!-- #region Dialog Content -->
  <q-dialog v-model="isDialogContent" maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center">
        <div class="col-12 self-center" align="center">
          <div style="max-width: 1000px; width: 100%">
            <q-img
              v-if="$q.platform.is.desktop"
              fit="contain"
              height="70px"
              src="/images/translation/header-translation-answer.png"
              no-transition=""
              no-spinner=""
            ></q-img>
            <q-img
              v-if="$q.platform.is.mobile"
              fit="contain"
              height="70px"
              src="/images/translation/header-translation-answer-mobile.png"
              no-transition=""
              no-spinner=""
            ></q-img>
          </div>
          <div
            :class="
              $q.platform.is.desktop ? 'box-content-snow' : 'box-content-snow-mobile'
            "
          >
            <div
              :class="
                $q.platform.is.mobile
                  ? 'q-px-sm q-py-xs box-content-list-mobile'
                  : 'q-pa-md box-content-list'
              "
              align="left"
            >
              <div v-for="(item, index) in contentOverAll">
                <div>
                  <span
                    :class="$q.platform.is.mobile ? 'f14' : 'f16'"
                    v-html="item.eng"
                  ></span>
                </div>
                <div class="q-pb-md q-pt-xs">
                  <span
                    style="color: #005f80"
                    :class="$q.platform.is.mobile ? 'f14' : 'f16'"
                    v-html="item.th"
                  ></span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-12 self-end q-pa-md" align="center">
            <q-img
              v-close-popup
              width="200px"
              src="/images/btn-back-to-practice.png"
              class="cursor-pointer"
              no-transition=""
              no-spinner=""
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Practice Complete -->
  <dialog-practice-complete
    v-if="isShowDialogPracticeComplete"
  ></dialog-practice-complete>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import answerAction from "../components/answer-action.vue";

import { ref, reactive, onMounted, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import learningDone from "../components/dialog-learning-done.vue";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import { useQuasar } from "quasar";
import loading from "../components/dialog-loading.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";

// Components
const components = defineComponent({
  headerBar,
  backgroundMain,
  answerAction,
  learningDone,
  loading,
});

// Store
const systemStore = useSystemStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();
const practiceStore = usePracticeStore();

const CancelToken = axios.CancelToken;
let tokenAPI;

// Initial Data And Route
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const isShowLearningDone = ref(false);
const isShowLoading = ref(false);

// Initial Data
const questionList = ref([]);
const contentList = ref([]);
const currentIndexTooltip = ref("");

const practiceData = reactive({
  totalQuestion: 0,
  star: 0,
  currentQuestion: 0,
  correct: 0,
  incorrect: 0,
  score: 0,
  question: "",
  choices: [],
  questionTh: "",
  nameTh: "",
  nameEng: "",
  contentTh: "",
  description: "",
  refs: [],
  isSynchronize: false,
  skill: "Writing",
  isEnableSoundEffect: false,
  level: 0,
  unit: 0,
  counter: 0,
  coin: 0,
  instruction: {
    eng: "",
    th: "",
  },
  questionEng: "",
  totalCorrectQuestion: 0,

  // Details Practice Data
  isSendAnswer: false,
  isFinishPractice: false,
  isShowBtnContent: false,
  isCorrectAnswer: false,
  isHasContent: false,
  allChooseAnswer: false,
  currentSelectAnswerBox: "",
  currentChoiceIndex: null,
  currentAnswer: "",
  currentChoice: "",
  numOfPractice: 0,
  isRestart: false,
  isLoadPractice: true,
  isShowDialogStartPractice: true,
  isFirstTimeReward: false,

  func: {
    async restartPractice() {
      isShowLoading.value = true;

      if (synchronizeStore.isSync) {
        practiceData.isRestart = true;
      }

      practiceData.totalQuestion = 0;
      practiceData.star = 0;
      practiceData.question = [];
      practiceData.choices = [];
      practiceData.answers = [];
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.currentQuestion = 0;
      practiceData.score = 0;
      practiceData.isSendAnswer = false;
      practiceData.allChooseAnswer = false;
      practiceData.isHasContent = false;
      practiceData.isFinishPractice = false;
      practiceData.isShowBtnContent = false;
      practiceData.coin = 0;
      practiceData.counter = 0;
      practiceData.totalCorrectQuestion = 0;
      practiceData.isFirstTimeReward = false;

      answerStructure = [];

      contentOverAll.value = [];

      // await checkPracticePermission();
      await funcLoadPractice();
    },
  },
});

const isShowTooltip = ref(false);
const isLoadPractice = ref(false);
const isDialogContent = ref(false);
const isShowDialogPracticeComplete = ref(false);

// #region Function

// #region Load Practice
const funcLoadPractice = async () => {
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    if (synchronizeStore.isSync) {
      saveCourseSyncData(0, route.params.practiceListId, [], 0);
    }

    let tempContent = [];

    // Set Practice ID
    let practiceListId = route.params.practiceListId;

    // Get Practice List
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    // Practice Data : Show Total Question

    practiceData.instruction.eng = getData.instructionEng;
    practiceData.instruction.th = getData.instructionTh;
    practiceData.level = getData.level;
    practiceData.unit = getData.unit;

    // Test data
    // practiceData.currentQuestion = 7;

    try {
      let getPracticeName = await db
        .collection("practiceListName")
        .where("level", "==", getData.level)
        .where("unit", "==", getData.unit)
        .where("skill", "==", "Writing")
        .get();

      practiceData.nameEng = getPracticeName.docs[0].data().nameEng;
      practiceData.nameTh = getPracticeName.docs[0].data().nameTh;
    } catch (error) {
      // console.log(`${error} : Get Load Practice List Name`);
    }

    // Get Practice Data
    const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

    const postData = {
      practiceListId: practiceListId,
      requestURL: window.location.hash,
    };

    if (tokenAPI != undefined) tokenAPI();

    const response = await axios.post(apiURL, postData, {
      cancelToken: new CancelToken(function executor(c) {
        tokenAPI = c;
      }),
    });

    // Question List : Set Question
    tempContent = response.data;

    // เรียงแบบฝึกหัด
    tempContent.sort((a, b) => a.order - b.order);

    let setNewContentEng = "";
    let setNewContentTh = "";

    for (let i = 0; i < tempContent.length; i++) {
      if (tempContent[i].except) {
        let newContentEng = tempContent[i].sentenceEng;
        newContentEng = newContentEng
          .replace(/<b>/g, "")
          .replace(/<\/b>/g, "")
          .replace(/<u>/g, "")
          .replace(/<\/u>/g, "");

        let newContentTh = tempContent[i].sentenceTh;

        let newData = {
          th: newContentTh,
          eng: newContentEng,
        };

        contentOverAll.value.push(newData);
        break;
      } else {
        break;
      }
    }

    for (let i = 0; i < tempContent.length; i++) {
      let res = tempContent[i];

      let sentenceEng = res.sentenceEng;
      let sentenceTh = res.sentenceTh;
      let sentenceExtra = res.sentenceExtra;

      if (!res.except) {
        // ใช้ในการค้นหาคำศัพท์ที่เป็นเฉพาะ Tag <u>
        let regex = /<u>(.*?)<s*\/u>/g;

        // เพิ่มคำถามที่เป็น Tag <u> ให้ระบุเป็นตัวแยกก่อนจะทำการ Split
        let tempNewQuestion = sentenceEng.replace(regex, (match) => `|${match}|`);

        // แยกประโยคทั้หมดออกจากกันด้วยการ Split "|"
        tempNewQuestion = tempNewQuestion.split("|");

        if (tempNewQuestion.length) {
          tempNewQuestion = tempNewQuestion
            .map((x) => {
              if (x != " " && x != undefined && x != "&nbsp;" && x != "") {
                return x.trim();
              }
            })
            .filter((x) => x != undefined);

          let tempQuestion = [];
          let tempSplitQuestion = [];
          for (let i = 0; i < tempNewQuestion.length; i++) {
            let resNewQuestion = tempNewQuestion[i];

            resNewQuestion = resNewQuestion.replace(/&nbsp;/g, "");

            let newData = {
              isAnswer: false,
              answer: resNewQuestion,
              currentAnswer: "",
              index: i,
              isCorrectAnswer: false,
              meaning: "",
              isExtraVocab: false,
            };

            let findQuestionTag = resNewQuestion.match(/<s*u>(.*?)<s*\/u>/g);

            if (findQuestionTag) {
              newData.answer = resNewQuestion
                .replace(/<s*u>/g, "")
                .replace(/<s*\/u>/g, "");

              newData.isAnswer = true;

              tempSplitQuestion.push(newData);
            } else {
              if (res.extraVocab.length) {
                let findExtra = res.extraVocab.find((x) => x.vocab == resNewQuestion);

                if (findExtra) {
                  newData.meaning = `${findExtra.meaning} ${
                    findExtra.partOfSpeech.partOfSpeech == "ไม่ระบุ"
                      ? ""
                      : `(${findExtra.partOfSpeech.partOfSpeech})`
                  }`;
                  newData.isExtraVocab = true;
                }
              }
            }

            tempQuestion.push(newData);
          }

          if (studentStore.studentType == "school") {
            let questionMax = Math.ceil(tempSplitQuestion.length / 2);

            if (questionMax < 3) {
              questionMax = 3;
            }

            tempSplitQuestion.sort((a, b) => Math.random() - 0.5);

            // คำถามที่เหลือ
            let tempTagQuestion = tempSplitQuestion.splice(0, questionMax);

            tempQuestion = tempQuestion.filter((x) => {
              if (tempTagQuestion.findIndex((y) => y.index == x.index) == -1) {
                x.isAnswer = false;
              }
              return x;
            });
            sentenceExtra = sentenceExtra.filter((x) => {
              if (tempQuestion.findIndex((y) => y.answer == x) == -1) {
                return x;
              }
            });

            let extraMax = Math.ceil(sentenceExtra.length / 2);

            if (extraMax < 2) {
              extraMax = 1;
            }

            sentenceExtra = sentenceExtra.splice(0, extraMax);

            tempTagQuestion = tempTagQuestion.map((x) =>
              x.answer.replace(/<s*b>/, "").replace(/<s*\/b>/)
            );

            sentenceExtra = sentenceExtra.concat(tempTagQuestion);

            res.sentenceExtra = sentenceExtra;
          }

          res.percentageOfQuestion =
            (tempQuestion.filter((x) => x.isAnswer).length / tempQuestion.length) * 100;

          res.question = tempQuestion;

          res.totalScore = 0;
        }
      }

      setNewContentEng += sentenceEng.split(/<s*u>(.*?)<s*\/u>/gm).join(" ");

      setNewContentTh += sentenceTh;
    }

    practiceData.contentEng = setNewContentEng
      .replace(/&nbsp;/g, "")
      .replace(/" , "/g, ", ")
      .replace(/[ . ]/g, ". ");

    practiceData.contentTh = setNewContentTh;

    contentList.value = tempContent;

    questionList.value = tempContent.filter((x) => !x.except);

    practiceData.totalQuestion = questionList.value.length;

    // .slice(0, practiceData.totalQuestion);

    // สุ่มแบบฝึกหัด
    // questionList.value.sort(() => Math.random() - 0.5);

    await funcSelectedQuestion(true);

    practiceData.isLoadPractice = false;
    isLoadPractice.value = true;
    isShowLoading.value = false;
  } catch (error) {
    // console.log(`${error} : Function Load Practice`);
    isShowLoading.value = false;
  }
};
// #endregion

// #region Select Question
const funcSelectedQuestion = (firsttime) => {
  firsttime = firsttime || false;

  if (!firsttime) {
    practiceData.currentQuestion++;
  }

  // Practice Data : Show Question
  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  // Practice Data : Show Question Th
  practiceData.questionTh = questionList.value[practiceData.currentQuestion].sentenceTh;

  practiceData.questionEng = questionList.value[practiceData.currentQuestion].sentenceEng;

  let tempChoices = questionList.value[practiceData.currentQuestion].sentenceExtra;

  tempChoices.sort(() => Math.random() - 0.5);

  // Practice Data : Show Choices
  practiceData.choices = tempChoices;
  practiceData.isSendAnswer = false;
  practiceData.isFinishPractice = false;
  practiceData.allChooseAnswer = false;
};
// #endregion

// #region Reset Practice
const funcRestartPractice = async () => {
  isShowLoading.value = true;

  if (synchronizeStore.isSync) {
    practiceData.isRestart = true;
  }

  practiceData.totalQuestion = 0;
  practiceData.star = 0;
  practiceData.question = [];
  practiceData.choices = [];
  practiceData.answers = [];
  practiceData.correct = 0;
  practiceData.incorrect = 0;
  practiceData.currentQuestion = 0;
  practiceData.score = 0;
  practiceData.isSendAnswer = false;
  practiceData.allChooseAnswer = false;
  practiceData.isHasContent = false;
  practiceData.isFinishPractice = false;
  practiceData.isShowBtnContent = false;
  practiceData.isLoadPractice = true;

  answerStructure = [];

  contentOverAll.value = [];

  // await checkPracticePermission();
  await funcLoadPractice();
};
// #endregion

// #region Send Answer
const contentOverAll = ref([]);
let answerStructure = [];
const funcSendAnswer = async () => {
  practiceData.isSendAnswer = true;

  const practiceStore = usePracticeStore();

  practiceStore.saveProgressLog(
    questionList.value[practiceData.currentQuestion].id,
    route.params.practiceListId
  );

  let newContentEng = practiceData.questionEng;
  let newContentTh = practiceData.questionTh;

  newContentEng = newContentEng.replace(/<u>/g, "").replace(/<\/u>/g, "");

  let newData = {
    th: newContentTh,
    eng: newContentEng,
  };

  contentOverAll.value.push(newData);

  if (contentList.value[practiceData.currentQuestion + 1]) {
    if (contentList.value[practiceData.currentQuestion + 1].except) {
      newContentEng = contentList.value[practiceData.currentQuestion + 1].sentenceEng;
      newContentTh = contentList.value[practiceData.currentQuestion + 1].sentenceTh;

      newData = {
        th: newContentTh,
        eng: newContentEng,
      };

      contentOverAll.value.push(newData);
    }
  }

  let getAllAnswer = practiceData.question.filter((x) => x.isAnswer);

  let checkAllAnswer = getAllAnswer.map((x) => {
    let newAnswer = x.answer.replace(/<b>/g, "").replace(/<\/b>/g, "");

    if (x.currentAnswer == newAnswer) {
      x.isCorrectAnswer = true;
      practiceData.correct++;
    }
    return x;
  });

  let percentage =
    (getAllAnswer.filter((x) => x.isCorrectAnswer).length / getAllAnswer.length) * 100;

  // console.log("percentage: ", percentage);

  if (percentage >= 60) {
    practiceData.totalCorrectQuestion++;
  }

  practiceData.isCorrectAnswer = checkAllAnswer.every((x) => x.isCorrectAnswer);

  checkAllAnswer =
    (checkAllAnswer.filter((x) => x.isCorrectAnswer).length / getAllAnswer.length) * 100;

  questionList.value[practiceData.currentQuestion].totalScore = checkAllAnswer;

  practiceData.currentChoice = practiceData.question
    .map((x) => {
      if (x.isAnswer) {
        return x.currentAnswer + " ";
      } else {
        return x.answer + " ";
      }
    })
    .join("")
    .replace(/&nbsp;[?]/g, "? ")
    .replace(/&nbsp;[!]/g, "! ")
    .replace(/&nbsp;[,]/g, ", ")
    .replace(/&nbsp;[.]/g, ". ")
    .replace(/(\s[?])/g, "? ")
    .replace(/(\s[!])/g, "! ")
    .replace(/(\s[,])/g, ", ")
    .replace(/(\s[.])/g, ". ")
    .replace(/&nbsp;/g, " ");

  practiceData.currentAnswer = practiceData.questionEng
    .split(/(?:<s*u>(.*?)<s*\/u>)/gm)
    .join("")
    .replace(/&nbsp;[?]/g, "? ")
    .replace(/&nbsp;[!]/g, "! ")
    .replace(/&nbsp;[,]/g, ", ")
    .replace(/&nbsp;[.]/g, ". ")
    .replace(/(\s[?])/g, "? ")
    .replace(/(\s[!])/g, "! ")
    .replace(/(\s[,])/g, ", ")
    .replace(/(\s[.])/g, ". ")
    .replace(/&nbsp;/g, " ");

  practiceData.score = Math.round(
    questionList.value.map((x) => x.totalScore).reduce((a, b) => a + b, 0) /
      practiceData.totalQuestion
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

  let studentAnswer = "";
  let question = "";

  practiceData.question.forEach((element) => {
    let textColor = element.isCorrectAnswer ? `style='color:green'` : `style='color:red'`;

    if (element.isAnswer) {
      let answerLength = element.answer.length;
      let underscore = "<span >";
      for (let index = 0; index < answerLength; index++) {
        underscore += "&nbsp;";
      }
      underscore += "</span>";
      studentAnswer += `<u ${textColor}>${element.currentAnswer}</u> `;
      question += `<u>${underscore}</u> `;
    } else {
      studentAnswer += `${element.answer} `;
      question += `${element.answer} `;
    }
  });

  let structure = {
    no: practiceData.currentQuestion,
    isCorrect: practiceData.isCorrectAnswer,
    answer: studentAnswer,
    answerIndex: null,
    question: practiceData.questionTh + "<br/> โจทย์ที่ได้รับ : " + question,
  };

  answerStructure.push(structure);

  if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
    isShowLoading.value = true;
    practiceData.isShowBtnContent = true;
    practiceData.isRestart = false;

    practiceData.coin = practiceData.correct;

    $q.loading.show();

    if (!isSync.value) {
      practiceData.counter = await funcFinishPractice(
        practiceData,
        route.params.practiceListId,
        $q.platform.is
      );
    } else {
      await funcFinishPractice(practiceData, route.params.practiceListId, $q.platform.is);
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

  $q.loading.hide();

  isShowLoading.value = false;
};
// #endregion

// #region Selected Choice
const funcSelectedChoice = (item) => {
  practiceData.question.filter(
    (x) => x.currentAnswer == "" && x.isAnswer
  )[0].currentAnswer = item.data;

  practiceData.choices.splice(item.index, 1);

  let nextAnswer = practiceData.question.filter(
    (x) => x.currentAnswer == "" && x.isAnswer
  );

  if (nextAnswer.length) {
    practiceData.currentSelectAnswerBox = nextAnswer[0].index;
  } else {
    practiceData.currentSelectAnswerBox = null;
  }

  let finish = practiceData.question.filter((x) => x.isAnswer && x.currentAnswer == "");

  if (finish.length) {
    practiceData.allChooseAnswer = false;
  } else {
    practiceData.allChooseAnswer = true;
  }
};
// #endregion

// #region Remove Answer
const funcRemoveAnswer = (item) => {
  practiceData.choices.push(item.data);
  practiceData.question[item.index].currentAnswer = "";

  let nextAnswer = practiceData.question.filter(
    (x) => x.currentAnswer == "" && x.isAnswer
  );

  if (nextAnswer.length) {
    practiceData.currentSelectAnswerBox = nextAnswer[0].index;
  } else {
    practiceData.currentSelectAnswerBox = null;
  }

  let finish = practiceData.question.filter((x) => x.isAnswer && x.currentAnswer == "");

  if (finish.length) {
    practiceData.allChooseAnswer = false;
  } else {
    practiceData.allChooseAnswer = true;
  }
};
// #endregion

// #region Finish Practice Translation
const funcFinishPracticeTranslation = async () => {
  practiceData.isFinishPractice = true;

  practiceData.isSendAnswer = true;
};
// #endregion

// #endregion

watch(
  () => synchronizeStore.syncData,
  async () => {
    if (synchronizeStore.isSync) {
      if (synchronizeStore.syncData.isRestartPractice) {
        // console.log("Is Restart Practice");
        funcRestartPractice();
        return;
      }

      if (!synchronizeStore.syncData.isShowSummaryPractice) {
        // console.log("Is Loading Practice");
        // if (practiceData.isLoadingPractice) {
        await funcLoadPractice();
        // }
      } else {
        if (!practiceData.isFinishPractice) {
          console.log("*** Is Finish Practice");
          funcFinishPractice(practiceData, route.params.practiceListId, $q.platform.is);
          practiceData.isFinishPractice = true;
          practiceData.isSendAnswer = true;
          practiceData.isRestart = false;
        }
      }
    }
  }
);

// Mounted
let authListen;
const isSync = ref(false);
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("translation");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/translation");
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
  background-image: url("/images/background_main/background-translation.png");
  background-size: cover;
  background-position: 4% 0%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-translation {
  background-image: url("/images/background_main/backdrop-writing.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-content-practice {
  top: 12%;
  width: 100%;
  height: 88%;
}

.box-story-content {
  max-width: 1000px;
  width: 62.5%;
  height: 80%;
  background-color: #ffffff;
  border: 0.17rem solid #005f7f;
  border-radius: 0.8rem;
  padding: 0.3%;
  margin: 2% auto;
}

.box-story-content .sub-story-content {
  width: 100%;
  height: 100%;
  background-color: #d5f3fc;
  padding: 2%;
  border-radius: 0.5rem;
  overflow: auto;
}

.box-story-content .sub-story-content::-webkit-scrollbar {
  width: 0px;
}

.box-story-content.mobile {
  max-width: 600px;
  width: 95%;
  min-width: 360px;
  font-size: 16px;
}

.box-title {
  width: 28.125%;
  background-image: url("/images/translation/label-title.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 0.7rem;
  box-shadow: 0.35rem 0.5rem 0px 0.05rem #542a0c;
  margin: -1.5% auto 0% auto;
  padding: 0.5%;
  text-align: center;
  font-size: clamp(13px, 1.25vw, 20px);
  line-height: 1.8;
}

.box-title.mobile {
  max-width: 330px;
  width: 100%;
  border-radius: 6px;
  margin: 13px auto;
  box-shadow: 4.5px 5px 0px 1px #542a0c;
  font-size: 12px;
  padding: 5px 0px;
  line-height: 2;
}

.box-question {
  max-width: 1000px;
  width: 62.5%;
  color: #005f80;
  font-size: clamp(10px, 1vw, 16px);
  background-color: #fff;
  border: 0.18rem solid #005f80;
  border-radius: 1rem 1rem 0rem 0rem;
  margin: 2% auto 0% auto;
  padding: 0.3%;
}

.box-question .sub-question {
  width: 100%;
  height: 100%;
  background-color: #99e2f6;
  text-align: center;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  padding: 1.931% 1%;
}

.box-question.mobile {
  max-width: 600px;
  width: 100%;
  min-width: 360px;
  border-radius: 16px 16px 0px 0px;
  border: 2px solid #005f80;
  padding: 5px;
  margin-top: 25px;
  color: #005f80;
}

.box-question .sub-question.mobile {
  border-radius: 8px 8px 0px 0px;
  padding: 15px 7px;
  font-size: 16px;
}

.box-content-question {
  max-width: 1000px;
  width: 62.5%;
  background-color: #fff;
  border: 0.18rem solid #005f80;
  border-radius: 0rem 0rem 1rem 1rem;
  border-top: transparent;
  margin: auto;
  overflow-x: auto;
  padding: 0.31%;
  font-size: clamp(12px, 1.25vw, 18px);
}

.box-content-question .sub-content-question {
  width: 100%;
  height: 100%;
  background-color: #d5f3fc;
  padding: 3% 2.5%;
  border-radius: 0rem 0rem 0.6rem 0.6rem;
}

.box-content-question.mobile {
  max-width: 600px;
  width: 100%;
  min-width: 360px;
  background-color: #fff;
  border-top: transparent;
  margin: auto;
  width: 100%;
  border: 2px solid #005f80;
  border-radius: 0px 0px 16px 16px;
  padding: 5px;
  font-size: 18px;
  overflow-x: auto;
}

.box-content-question .sub-content-question.mobile {
  width: 100%;
  height: 100%;
  min-height: 100px;
  background-color: #d5f3fc;
  border-radius: 0px 0px 8px 8px;
  padding: 15px;
}

/* width */
.box-content-question::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-content-question::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-question::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-question::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.box-content-answer {
  max-width: 990px;
  width: 62.5%;
  background-color: rgba(21, 166, 216, 0.25);
  border-radius: 0px 0px 7px 7px;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
  border-top-color: transparent;
  margin: 4% auto auto auto;
  padding: 2.5% 0% 2.7% 0%;
  z-index: 1;
}

.box-content-answer.mobile {
  max-width: 500px;
  width: 95%;
  min-width: 350px;
  background: rgba(21, 166, 216, 0.25);
  border-radius: 0px 0px 7px 7px;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
  border-top-color: transparent;
  margin: 60px auto auto auto;
  padding: 30px 0px 15px 0px;
  z-index: 1;
}

.box-text-story {
  max-height: 500px;
  min-height: fit-content;
  color: #000000;
  font-size: clamp(12px, 1.25vw, 18px);
  overflow: auto;
}

.box-text-story.mobile {
  // max-height: 50vh;
  min-height: fit-content;
  font-size: 16px;
}

// .box-text-story::-webkit-scrollbar {
//   width: 7px;
// }

// #endregion

// #region Text
.text-not-answer {
  padding: 0.5%;
  color: #000000;
  font-size: clamp(12px, 1.25vw, 18px);
}

.text-not-answer.mobile {
  padding: 5px;
  color: #000000;
  font-size: 18px;
}

.text-not-answer .text-extra {
  color: #0082ba;
}

.text-title-story {
  font-size: clamp(14px, 1.25vw, 20px);
  margin: 1%;
  margin-bottom: 2%;
}

.text-title-story.mobile {
  font-size: 18px;
  margin: 15px;
}

// #endregion

// #region Button

.button-answer-blank {
  width: 10.675%;
  padding: 1.922% 2%;
  margin: 0.7%;
}

.button-answer-blank.mobile {
  width: 100px;
  height: 35px;
  margin: 5px;
  padding: 10px 15px;
}

.button-select-answer {
  max-width: fit-content;
  width: 100%;
  min-width: fit-content;
  border: 0.17rem solid #4a261b;
  background: #db8200;
  border-radius: 0.7rem;
  margin: 0.7%;
  padding: 1.922% 2%;
  color: #4a261b;
  font-size: clamp(12px, 1vw, 16px);
  line-height: 0;
  cursor: pointer;
}

.button-select-answer::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 1%;
  width: 100%;
  height: 90%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.5rem;
  transform: translateX(-50%);
}

.button-select-answer::after {
  content: "";
  position: absolute;
  left: 2%;
  top: 15%;
  max-width: 13px;
  width: 10%;
  height: 17%;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  // border-radius: 50%;
  border-radius: 0.9rem 0.9rem 0rem 0rem;
  transform: rotate(-40deg);
}

.button-select-answer.mobile {
  max-width: fit-content;
  width: 100%;
  min-width: fit-content;
  height: 40px;
  border: 1px solid #4a261b;
  background: #db8200;
  border-radius: 10px;
  color: #4a261b;
  font-size: 16px;
  line-height: 1;
  margin: 5px;
  padding: 10px 15px;
}

.button-select-answer.mobile::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 1%;
  width: 99%;
  height: 92%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 8px;
  transform: translateX(-50%);
}

.button-select-answer.mobile::after {
  content: "";
  position: absolute;
  left: 2px;
  top: 5px;
  width: 15px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.5);
  // border-radius: 50%;
  border-radius: 0.9rem 0.9rem 0rem 0rem;
  transform: rotate(-40deg);
}

.button-select-answer.correct {
  background: #8ec960;
  border: 0.17rem solid #58cc02;
  color: #58cc02;
  cursor: default;
}

.button-select-answer.mobile.correct {
  background: #8ec960;
  border: 1px solid #58cc02;
  color: #58cc02;
  cursor: default;
}

.button-select-answer.correct::before {
  background: #d7ffb8;
}

.button-select-answer.incorrect {
  background-color: #e3a9aa;
  border: 0.17rem solid #ff4b4b;
  color: #ff4b4b;
  cursor: default;
}

.button-select-answer.mobile.incorrect {
  background-color: #e3a9aa;
  border: 1px solid #ff4b4b;
  color: #ff4b4b;
  cursor: default;
}

.button-select-answer.incorrect::before {
  background: #ffdfe0;
}

.btn-incorrect {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #ff4b4b;
  box-shadow: 0px 3px 0px #ea2b2b;
  border-radius: 7px;
}

.button-remove-answer {
  top: -20%;
  right: -5%;
  width: 16.67%;
  max-width: 16px;
  min-width: 16px;
}

.button-choice {
  max-width: fit-content;
  width: 100%;
  min-width: fit-content;
  border: 0.17rem solid #4a261b;
  background: #db8200;
  border-radius: 0.7rem;
  margin: 0.7%;
  padding: 1.83% 2%;
  color: #4a261b;
  font-size: clamp(12px, 1vw, 16px);
  line-height: 0;
}

.button-choice.mobile {
  max-width: fit-content;
  width: 100%;
  min-width: fit-content;
  height: 40px;
  border: 1px solid #4a261b;
  background: #db8200;
  border-radius: 10px;
  color: #4a261b;
  font-size: 16px;
  line-height: 1;
  margin: 5px;
  padding: 10px 15px;
}

.button-choice.disable {
  color: #fff;
  background-color: #9b9b9b;
}

.button-choice.disable::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 1%;
  width: 100%;
  height: 92%;
  border-radius: 0.5rem;
  transform: translateX(-50%);
  background: #bababa;
}

.button-choice::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 1%;
  width: 100%;
  height: 92%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.5rem;
  transform: translateX(-50%);
}

.button-choice::after {
  content: "";
  position: absolute;
  left: 2%;
  top: 15%;
  max-width: 15px;
  width: 15%;
  height: 17%;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.9rem 0.9rem 0rem 0rem;
  transform: rotate(-40deg);
}

.button-disable {
  background-color: #ecdcbe;
}

.button-send-answer {
  position: relative;
  width: 12.5%;
  border: 0.17rem solid #4a261b;
  background: #db8200;
  border-radius: 0.7rem;
  padding: 1.125% 0%;
  margin: 2%;
  color: #4a261b;
  font-size: clamp(12px, 1vw, 16px);
  color: #4a261b;
  line-height: 0;
  cursor: pointer;
}

.button-send-answer.disable {
  background-color: #9b9b9b;
  color: #fff;
  cursor: not-allowed;
}

.button-send-answer.disable::before {
  background: #bababa;
}

.button-send-answer::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 1%;
  width: 100%;
  height: 92%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.5rem;
  transform: translateX(-50%);
}

.button-send-answer::after {
  content: "";
  position: absolute;
  left: 2%;
  top: 17%;
  width: 8%;
  height: 20%;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  // border-radius: 50%;
  border-radius: 0.9rem 0.9rem 0rem 0rem;
  transform: rotate(-40deg);
}

.button-send-answer.mobile {
  width: 200px;
  height: 40px;
  border: 1px solid #4a261b;
  border-radius: 10px;
  padding: 10px 0px;
  margin: 20px;
  color: #4a261b;
  font-size: 16px;
  line-height: 1;
}

.button-send-answer.mobile::after {
  content: "";
  position: absolute;
  left: 3px;
  top: 4px;
  width: 15px;
  height: 7px;
  background-color: rgba(255, 255, 255, 0.5);
  // border-radius: 50%;
  border-radius: 0.9rem 0.9rem 0rem 0rem;
  transform: rotate(-40deg);
}

// #endregion

// #region Old
.bg-translation {
  background-image: url("/images/translation/bg-writing.png");
  background-size: contain;
  background-position: bottom;
  background-color: #fff;
}

.bg-translation-action {
  background-image: url("/images/translation/bg-translation-action.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.box-content-snow {
  max-width: 990px;
  width: 97%;
  background-color: #d5f3fc;
  min-height: 200px;
  max-height: fit-content;
  border: 3px solid #fff;
  border-top-color: transparent;
  border-radius: 0px 0px 7px 7px;
  margin-top: -45px;
  padding-top: 15px;
  padding: 30px 10px 15px 15px;
}

.box-content-snow-mobile {
  max-width: 450px;
  width: 97%;
  background-color: #d5f3fc;
  min-height: 200px;
  max-height: fit-content;
  border: 3px solid #fff;
  border-top-color: transparent;
  border-radius: 0px 0px 7px 7px;
  margin-top: -45px;
  padding-top: 15px;
  padding: 30px 10px 15px 15px;
}

// .box-content-th {
//   min-height: 50vh;
//   max-height: fit-content;
//   border: 3px solid #fff;
//   background-color: #99e2f6;
//   border-radius: 10px;
// }

.box-content-list {
  height: 400px;
  overflow: auto;
}

.box-content-list-mobile {
  height: 300px;
  overflow: auto;
}

/* width */
.box-content-list::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-content-list::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 20px;
  border: 2px solid #d5f3fc;
}

/* Handle */
.box-content-list::-webkit-scrollbar-thumb {
  background: #99e2f6;
  border-radius: 20px;
}

/* Handle on hover */
.box-content-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}
// #endregion
</style>
