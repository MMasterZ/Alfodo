<template>
  <q-page class="backdrop-grammar-action row justify-center items-center">

    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-grammar-action'"></background-main>

      <!-- backdrop -->
      <div class="absolute-top box-backdrop-header"></div>

      <!-- #region Header -->
      <header-bar class="z-max" :practiceData="practiceData" @callback-help="funcShowDialogHelp()"
        :page="'grammaraction'"></header-bar>
      <!-- #endregion -->

      <!-- #region Mini game Action -->
      <div class="absolute-top box-aniamtion-action">
        <animation-action :practiceData="practiceData"></animation-action>
      </div>
      <!-- #endregion -->

      <!-- #region Content practice -->
      <div class="absolute-top box-content-practice" v-if="isLoadPractice">
        <div class="absolute-top full-width" style="top: 8%" align="center">
          <!-- #region Question -->
          <div class="box-question" v-if="!isWaiting">
            <div class="sub row justify-center items-center" align="left">
              <div class="self-center">
                <span v-html="practiceData.question" v-if="practiceData.question"> </span>
                <span v-html="practiceData.instruction.eng" v-else> </span>
              </div>
              <q-space></q-space>
              <div class="col-1 self-center" align="right" style="width: fit-content; padding: 1%"
                v-if="practiceData.isImage">
                <q-btn push class="bg-brown text-white" label="ดูภาพโจทย์" @click="isShowDialogImage = true">
                </q-btn>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Box Button Choice -->
          <div style="margin-top: 1%" class="box-button-choices" align="center" v-if="!isWaiting">
            <div class="row">
              <div class="col-6 relative-position" :align="index % 2 === 0 ? 'left' : 'right'"
                v-for="(item, index) in practiceData.choices">
                <div class="button-active-main button-answer" :class="isButtonDisable
                  ? 'disable no-pointer-events'
                  : practiceData.isSendAnswer
                    ? practiceData.currentChoice != ''
                      ? practiceData.currentChoiceIndex == item.index
                        ? practiceData.isCorrectAnswer
                          ? 'correct no-pointer-events'
                          : 'incorrect no-pointer-events'
                        : 'no-pointer-events'
                      : practiceData.correctAnswer == index + 1
                        ? 'correct no-pointer-events'
                        : 'incorrect no-pointer-events'
                    : 'cursor-pointer'
                  " align="left" @mouseenter="
                    practiceData.isSendAnswer
                      ? null
                      : (practiceData.currentChoiceIndex = item.index)
                    " @mouseleave="
                      practiceData.isSendAnswer
                        ? null
                        : (practiceData.currentChoiceIndex = null)
                      " @click="
                        practiceData.isSendAnswer
                          ? null
                          : !practiceData.isSynchronize
                            ? funcSelectedAnswer(item)
                            : practiceData.currentStep == 2
                              ? funcSelectedAnswerForAsync(item)
                              : null
                        ">
                  <div class="sub row font-mali-m">
                    <div class="col-1 self-center" style="width: 10%" v-if="practiceData.isSynchronize">
                      <div v-if="index == 0">
                        <q-icon name="fas fa-circle"
                          :class="isButtonDisable ? 'icon-diable' : 'choice-circle-bg'"></q-icon>
                      </div>
                      <div v-if="index == 1">
                        <q-icon name="fas fa-square"
                          :class="isButtonDisable ? 'icon-diable' : 'choice-square-bg'"></q-icon>
                      </div>
                      <div v-if="index == 2">
                        <q-icon name="fas fa-play" :class="isButtonDisable ? 'icon-diable' : 'choice-triangle-bg'"
                          style="transform: rotate(-90deg)"></q-icon>
                      </div>
                      <div v-if="index == 3">
                        <q-icon name="fas fa-star" :class="isButtonDisable ? 'icon-diable' : 'choice-star-bg'"></q-icon>
                      </div>
                    </div>
                    <div class="col self-center">
                      <div v-html="item.choice"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Box Waiting -->
          <div v-if="practiceData.isSynchronize && isWaiting">
            <div class="box-waiting" align="center">
              <div class="sub">
                <div class="waiting-size">
                  <waiting></waiting>
                  <div class="font-mali-m text-waiting">รอเพื่อนก่อนนะ</div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-container-main-mobile absolute-center" v-if="!$q.platform.is.desktop">
      <!-- #region Header -->
      <header-bar :practiceData="practiceData" @callback-help="funcShowDialogHelp()"
        :page="'grammaraction'"></header-bar>
      <!-- #endregion -->

      <div v-if="isLoadPractice">
        <!-- #region Question -->
        <div class="relative-position animate__animated animate__fadeIn animation-duration-1s" v-if="!isWaiting">
          <div class="box-question mobile">
            <div class="sub row justify-center items-center" align="left">
              <div class="self-center">
                <span v-html="practiceData.question" v-if="practiceData.question"> </span>
                <span v-html="practiceData.instruction.eng" v-else> </span>
              </div>
              <q-space></q-space>
              <div class="col-1 self-center" align="right" style="width: fit-content; padding: 1%"
                v-if="practiceData.isImage">
                <q-btn push class="bg-brown text-white" label="ดูภาพโจทย์" @click="isShowDialogImage = true">
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Button Choice -->
        <div class="relative-position" v-if="!isWaiting">
          <div class="box-button-choices mobile" align="center">
            <div class="relative-position animate__animated animate__fadeInLeft animation-duration-0-5s" align="center"
              v-for="(item, index) in practiceData.choices" :style="`animation-delay: ${index * 0.1}s`">
              <div class="button-active-main button-answer mobile" :class="isButtonDisable
                ? 'disable no-pointer-events'
                : practiceData.isSendAnswer
                  ? practiceData.currentChoice != ''
                    ? practiceData.currentChoiceIndex == item.index
                      ? practiceData.isCorrectAnswer
                        ? 'correct no-pointer-events'
                        : 'incorrect no-pointer-events'
                      : 'no-pointer-events'
                    : practiceData.correctAnswer == index + 1
                      ? 'correct no-pointer-events'
                      : 'incorrect no-pointer-events'
                  : 'cursor-pointer'
                " align="left" @mouseenter="
                  practiceData.isSendAnswer
                    ? null
                    : (practiceData.currentChoiceIndex = item.index)
                  " @mouseleave="
                    practiceData.isSendAnswer
                      ? null
                      : (practiceData.currentChoiceIndex = null)
                    " @click="
                      practiceData.isSendAnswer
                        ? null
                        : !practiceData.isSynchronize
                          ? funcSelectedAnswer(item)
                          : practiceData.currentStep == 2
                            ? funcSelectedAnswerForAsync(item)
                            : null
                      ">
                <div class="sub mobile row font-mali-m">
                  <div class="col-1 self-center" style="width: 50px; font-size: 24px" v-if="practiceData.isSynchronize">
                    <div v-if="index == 0">
                      <q-icon name="fas fa-circle"
                        :class="isButtonDisable ? 'icon-diable' : 'choice-circle-bg'"></q-icon>
                    </div>
                    <div v-if="index == 1">
                      <q-icon name="fas fa-square"
                        :class="isButtonDisable ? 'icon-diable' : 'choice-square-bg'"></q-icon>
                    </div>
                    <div v-if="index == 2">
                      <q-icon name="fas fa-play" :class="isButtonDisable ? 'icon-diable' : 'choice-triangle-bg'"
                        style="transform: rotate(-90deg)"></q-icon>
                    </div>
                    <div v-if="index == 3">
                      <q-icon name="fas fa-star" :class="isButtonDisable ? 'icon-diable' : 'choice-star-bg'"></q-icon>
                    </div>
                  </div>
                  <div class="col self-center">
                    <div v-html="item.choice"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Waiting -->
        <div class="absolute-center full-width" v-if="practiceData.isSynchronize && isWaiting">
          <div class="relative-position animate__animated animate__zoomIn animation-duration-0-5s">
            <div class="box-waiting mobile" align="center">
              <div class="sub mobile">
                <div class="waiting-size mobile">
                  <waiting></waiting>
                </div>
                <div class="font-mali-m text-waiting">รอเพื่อนก่อนนะ</div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Help Grammar Video : PC -->
  <q-dialog maximized v-model="isDialogHelp" persistent v-if="$q.platform.is.desktop">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row">
        <div class="box-dialog-lesson col-12 self-center">
          <div class="relative-position text-white row" style="border: 1px solid #4e90a6" align="center">
            <div class="col-1" style="width: 50px"></div>
            <div class="col" style="padding: 10px">
              <span class="f16">เนื้อหา</span>
            </div>
            <div class="col-1 self-center q-px-sm" style="width: 50px" align="right">
              <q-btn dense round flat v-close-popup>
                <q-icon size="30px" name="fas fa-times"></q-icon>
              </q-btn>
            </div>
          </div>

          <div class="bg-white row">
            <div class="col-4 box-content-lesson-list">
              <div class="q-pa-sm" v-for="(item, index) in lessonList">
                <q-btn @click="selectedLesson = item.id" class="fit" align="left"
                  :class="selectedLesson == item.id ? 'btn-selected' : 'bg-white'" no-caps>
                  <span class="f14">{{ item.name }}</span></q-btn>
              </div>
            </div>
            <div class="col q-pa-md" style="max-height: 300px; min-height: fit-content">
              <div>
                <q-img class="relative-position" fit="contain" style="width: 100%"
                  :src="lessonList.filter((x) => x.id == selectedLesson)[0].imageUrl"></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Help Grammar Video : Mobile -->
  <q-dialog maximized v-model="isDialogHelp" persistent v-if="$q.platform.is.mobile">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row">
        <div class="col-12 self-center box-dialog-lesson-mobile">
          <div class="text-amber" style="border: 1px solid #2d3081" align="center">
            <q-tabs v-model="tabHelp" no-caps outside-arrows mobile-arrows class="text-amber shadow-0">
              <q-tab name="content" class="f16" label="เนื้อหา" />
              <!-- <q-tab name="extra" class="f16" label="คำศัพท์เสริม" /> -->
            </q-tabs>
          </div>

          <div class="bg-white">
            <q-tab-panels v-model="tabHelp" animated class="no-padding">
              <q-tab-panel name="content" class="no-padding">
                <div class="q-pa-md">
                  <div>
                    <q-select dense outlined v-model="selectedLesson" :options="lessonList" emit-value map-options />
                  </div>
                  <div class="box-content-lesson-mobile relative-position q-px-sm q-mt-md" align="center">
                    <div style="
                        max-width: 350px;
                        width: 100%;
                        height: 350px;
                        overflow: hidden;
                      ">
                      <q-img fit="cover" width="200%" style="left: -1px" :src="lessonList.filter((x) => x.value == selectedLesson)[0].imageUrl
                        "></q-img>
                    </div>
                    <div class="q-mt-sm" style="
                        max-width: 350px;
                        width: 100%;
                        height: 350px;
                        overflow: hidden;
                      ">
                      <q-img fit="contain" width="200%" style="left: -98%" :src="lessonList.filter((x) => x.value == selectedLesson)[0].imageUrl
                        "></q-img>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <!-- <q-tab-panel name="extra" class="no-padding">
                <div class="box-content-lesson-mobile">
                  <div v-if="practiceData.extraVocab.length">
                    <div v-for="(item, index) in practiceData.extraVocab">
                      <div class="q-px-md q-py-xs">
                        {{ item.vocab }}
                        <br />
                        {{ item.meaning }}
                      </div>
                      <hr />
                    </div>
                  </div>
                  <div v-else align="center" class="q-py-xl q-px-md text-bold">
                    <span>ไม่มีคำศัพท์เสริม</span>
                    <br />
                    <span>สำหรับแบบฝึกหัดนี้</span>
                  </div>
                </div>
              </q-tab-panel> -->
            </q-tab-panels>
            <div class="col-12">
              <div v-close-popup class="bg-amber-7" style="padding: 10px" align="center">
                ปิด
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Answer Action -->
  <div v-if="!isWaiting">
    <answer-action :systemStore="systemStore" :practiceData="practiceData" :synchronizeStore="synchronizeStore"
      :practiceStore="practiceStore" @callback-nextquestion="funcNextQuestion()"
      @callback-restart="funcRestartPractice()"></answer-action>
  </div>
  <!-- #endregion -->

  <!-- #region Dialog Same Learning -->
  <same-learning :isShowLearningDone="isShowLearningDone" @callback-closedialog="
    (isShowLearningDone = false), $router.replace('/practice/unit')
    "></same-learning>
  <!-- #endregion -->

  <!-- #region Dialog Image -->
  <q-dialog v-model="isShowDialogImage" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-image-container relative-position">
          <div class="sub-dialog-image">
            <div align="center" class="f20 font-mali-b">ภาพโจทย์</div>
            <div class="content-dialog-image" align="center">
              <q-img style="max-width: 220px; height: 220px" :src="practiceData.imageUrl" no-spinner no-transition
                fit="contain"></q-img>
            </div>
          </div>
          <div class="absolute-top-right box-button-close-dialog-image" v-close-popup>
            <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Practice Complete -->
  <dialog-practice-complete v-if="isShowDialogPracticeComplete"></dialog-practice-complete>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->

  <!-- #region Finish practice -->
  <!-- <finish-practice-dialog
    v-if="practiceData.isFinishPractice"
    :isDialogFinish="practiceData.isFinishPractice"
    :practiceData="practiceData"
    :syncData="synchronizeStore.syncData"
    :practiceStore="practiceStore"
  ></finish-practice-dialog> -->
</template>

<script setup>
// New
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import animationAction from "../components/grammar/grammarActionAnimation.vue";
import multiplechoiceBtn from "../components/button/multipleChoicesActionBtn.vue";
import waiting from "../components/waiting.vue";

import answerAction from "../components/answer-action.vue";
import finishPracticeDialog from "../components/dialog_main/finish-practice-dialog.vue";
import {
  ref,
  onBeforeUnmount,
  onMounted,
  reactive,
  defineComponent,
  computed,
} from "vue";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import lessonHooks from "../hooks/lessonHooks";
import axios from "axios";
import sameLearning from "../components/dialog-learning-done.vue";
import studentHooks from "../hooks/gameHooks";

import loading from "../components/dialog-loading.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";

// Components
// const components = defineComponent({
//   headerBar,
//   backgroundMain,
//   animationAction,
//   multiplechoiceBtn,
//   waiting,

//   answerAction,
//   sameLearning,

//   loading,
//   finishPracticeDialog,
//   dialogPracticeComplete,
// });

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

// Initial Data
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const CancelToken = axios.CancelToken;
let tokenAPI;

// Data
const selectedLesson = ref(1);
const lessonList = ref([]);
const tabHelp = ref("content");

// Practice Data
const practiceData = reactive({
  // Initial Data
  instruction: {
    eng: "",
    th: "",
  },
  answers: [],
  currentQuestion: 0,
  totalQuestion: 0,
  correct: 0,
  incorrect: 0,
  star: 0,
  isSynchronize: false,
  skill: "Grammar",
  score: 0,
  isEnableSoundEffect: false,
  isImage: false,
  imageUrl: "",
  level: 0,
  unit: 0,
  counter: 0,
  coin: 0,

  // use action step
  // ข้อปัจจุบัน
  // หน้าปัจจุบัน
  // 0 = หน้าคำถาม ยังกดตอบไม่ได้
  // 1 = กดคำตอบได้
  // 2 = ตอบแล้ว ไปหน้ารอ
  // 3 = เฉลย พร้อมคำอธิบาย
  currentStep: 0,

  // use current question
  correctAnswer: 0,
  question: "",
  choices: [],
  description: "",
  refs: [],
  totalCorrectQuestion: 0,

  // use current answer

  currentChoiceIndex: null,
  currentChoice: "",
  currentAnswer: "",

  isSendAnswer: false,
  isFinishPractice: false,
  isLoadingPractice: true,
  isCorrectAnswer: false,
  isShowDirection: false,
  isRestart: true,
  isPractice: true,
  isLoadPractice: true,
  isShowDialogStartPractice: true,
  isFirstTimeReward: false,

  func: {
    async restartPractice() {
      isShowLoading.value = true;

      practiceData.isRestart = true;

      // set new initial data
      practiceData.currentQuestion = 0;
      practiceData.totalQuestion = 0;
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.star = 0;
      practiceData.answers = [];
      practiceData.choices = [];
      practiceData.refs = [];
      practiceData.counter = 0;
      practiceData.coin = 0;

      // set start current step
      practiceData.currentStep = 0;

      // set start current answer
      practiceData.isSendAnswer = false;
      practiceData.isFinishPractice = false;
      practiceData.currentChoiceIndex = null;
      practiceData.currentChoice = "";
      practiceData.currentAnswer = "";
      practiceData.totalCorrectQuestion = 0;
      practiceData.isFirstTimeReward = false;

      isWaiting.value = false;

      answerStructure = [];

      await funcLoadPractice();
    },
  },
});

// เก็บข้อมูลแบบฝึกหัดทั้งหมด
const questionList = ref([]);

// Boolean
const isLoadPractice = ref(false);
const isShowLearningDone = ref(false);
const isShowDialogImage = ref(false);
const isShowLoading = ref(false);
const isDialogHelp = ref(false);
const isWaiting = ref(false);
const isShowDialogPracticeComplete = ref(false);

// #region Function

// #region Show Dialog Help
const funcShowDialogHelp = () => {
  isDialogHelp.value = true;
};
// #endregion

// #region Load Practice
const funcLoadPractice = async () => {
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    if (synchronizeStore.isSync) {
      saveCourseSyncData(0, route.params.practiceListId, [], 0);
    }

    // เก็บ practice list id จาก router
    let practiceListId = route.params.practiceListId;

    // ดึงข้อมูล practice list
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    practiceData.level = getData.level;
    practiceData.unit = getData.unit;
    practiceData.instruction.eng = getData.instructionEng;
    practiceData.instruction.th = getData.instructionTh;

    try {
      // if (!synchronizeStore.isSync) {
      let getLesson = await lessonHooks
        .lesson()
        .grammaraction(getData.level, getData.unit, practiceListId);

      if (getLesson.length) {
        getLesson.forEach((doc) => {
          (doc.value = doc.id), (doc.label = doc.name);
        });

        lessonList.value = getLesson;

        selectedLesson.value = lessonList.value[0].value;
      }
      // }
    } catch (error) {
      // console.log(`${error} : Get Hooks Grammar lesson`);
    }

    const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

    const postData = {
      practiceListId: route.params.practiceListId,
      requestURL: window.location.hash,
    };

    if (tokenAPI != undefined) tokenAPI();

    const response = await axios.post(apiURL, postData, {
      cancelToken: new CancelToken(function executor(c) {
        tokenAPI = c;
      }),
    });

    let tempQuestion = response.data;

    tempQuestion.sort((a, b) => a.order - b.order);

    practiceData.answers = tempQuestion.map((x) => {
      return { isCorrect: false };
    });

    questionList.value = tempQuestion;

    practiceData.totalQuestion = tempQuestion.length;

    practiceData.question = tempQuestion[0].question;
    practiceData.choices = tempQuestion[0].choices.sort((a, b) => a.index - b.index);
    practiceData.description = tempQuestion[0].description;
    practiceData.correctAnswer = tempQuestion[0].correctAnswer;
    practiceData.isImage = tempQuestion[0].isImage || false;
    practiceData.imageUrl = tempQuestion[0].imageUrl || "";

    if (isSync.value) {
      await funcSnapSync(getUser.value.uid);
    }

    isLoadPractice.value = true;
    isShowLoading.value = false;
    practiceData.isLoadPractice = false;
  } catch (error) {
    // console.log(`${error} : Function Load Practice`);
    isShowLoading.value = false;
  }
};
// #endregion

// #region Next Question
const funcNextQuestion = () => {
  practiceData.currentQuestion++;

  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  practiceData.choices = questionList.value[practiceData.currentQuestion].choices.sort(
    (a, b) => a.index - b.index
  );

  practiceData.description = questionList.value[practiceData.currentQuestion].description;

  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  practiceData.isImage =
    questionList.value[practiceData.currentQuestion].isImage || false;

  practiceData.imageUrl = questionList.value[practiceData.currentQuestion].imageUrl || "";

  practiceData.currentChoiceIndex = null;

  practiceData.isSendAnswer = false;
};
// #endregion

// #region Selected Answer Normal Mode
let answerStructure = [];
const funcSelectedAnswer = async (val) => {
  if (isButtonDisable.value) return;

  isShowLoading.value = true;

  practiceData.isSendAnswer = true;

  practiceData.currentChoiceIndex = val.index;

  const practiceStore = usePracticeStore();

  practiceStore.saveProgressLog(
    questionList.value[practiceData.currentQuestion].id,
    route.params.practiceListId
  );

  let currentChoice = val.choice;

  let currentAnswer = practiceData.choices.filter(
    (x) => x.index == practiceData.correctAnswer
  )[0].choice;

  if (practiceData.correctAnswer == practiceData.currentChoiceIndex) {
    practiceData.isCorrectAnswer = true;
    practiceData.totalCorrectQuestion++;
    practiceData.answers.push({
      isCorrect: true,
    });
  } else {
    practiceData.isCorrectAnswer = false;
    practiceData.answers.push({
      isCorrect: false,
    });
  }

  practiceData.currentChoice = currentChoice;
  practiceData.currentAnswer = currentAnswer;

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

  $q.loading.show();

  if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
    // practiceData.isFinishPractice = true;

    practiceData.coin = practiceData.correct;

    practiceData.counter = await funcFinishPractice(
      practiceData,
      route.params.practiceListId,
      $q.platform.is
    );

    practiceData.isRestart = false;
  }

  $q.loading.hide();

  isShowLoading.value = false;
};
// #endregion

// #region Restart Practice
const funcRestartPractice = async () => {
  isShowLoading.value = true;

  practiceData.isRestart = true;

  // set new initial data
  practiceData.currentQuestion = 0;
  practiceData.totalQuestion = 0;
  practiceData.correct = 0;
  practiceData.incorrect = 0;
  practiceData.star = 0;
  practiceData.answers = [];
  practiceData.choices = [];
  practiceData.refs = [];

  // set start current step
  practiceData.currentStep = 0;

  // set start current answer
  practiceData.isSendAnswer = false;
  practiceData.isFinishPractice = false;
  practiceData.currentChoiceIndex = null;
  practiceData.currentChoice = "";
  practiceData.currentAnswer = "";
  isWaiting.value = false;

  answerStructure = [];

  await funcLoadPractice();
};
// #endregion

// #region Selected Answer Control Mode
const funcSelectedAnswerForAsync = (val) => {
  if (isButtonDisable.value) return;

  practiceData.currentChoiceIndex = val.index;
  practiceData.currentChoice = val.choice;

  isWaiting.value = true;

  if (practiceData.correctAnswer == practiceData.currentChoiceIndex) {
    practiceData.isCorrectAnswer = true;
    practiceData.totalCorrectQuestion++;
    practiceData.answers.push({
      isCorrect: true,
    });
  } else {
    practiceData.isCorrectAnswer = false;
    practiceData.answers.push({
      isCorrect: false,
    });
  }

  let structure = {
    no: practiceData.currentQuestion,
    isCorrect: practiceData.isCorrectAnswer,
    answer: practiceData.currentChoice,
    answerIndex: practiceData.currentChoiceIndex,
    question: practiceData.question,
  };

  answerStructure.push(structure);

  practiceData.score = Math.round(
    practiceData.totalCorrectQuestion / practiceData.totalQuestion * 100
  );


  saveCourseSyncData(
    practiceData.currentQuestion,
    route.params.practiceListId,
    answerStructure,
    practiceData.score
  );
};
// #endregion

// #region Sync
let tempSync;
const funcSnapSync = async (uid) => {
  let getData = await studentHooks.studentInfomation(uid);
  let response = await studentHooks.courseInfomation(getData.currentCourseId);
  let studentInfo = { ...response, schoolId: getData.schoolId };

  const practiceStore = usePracticeStore();

  tempSync = db
    .collection("synchronize")
    .where("class", "==", studentInfo.class)
    .where("room", "==", studentInfo.room)
    .where("term", "==", studentInfo.term)
    .where("year", "==", studentInfo.year)
    .where("schoolId", "==", studentInfo.schoolId)
    .onSnapshot((doc) => {
      if (doc.size) {
        let temp = [];

        doc.forEach((res) => {
          temp.push(res.data());
        });

        temp.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        if (temp[0].mode == "control") {
          practiceData.isSynchronize = true;

          practiceData.currentStep = temp[0].action.currentStep;

          practiceData.currentQuestion = temp[0].action.currentQuestion;

          if (practiceData.currentStep == 0) {
            if (!practiceData.isRestart) {
              funcRestartPractice();
            }
          } else if (practiceData.currentStep == 1) {
            isWaiting.value = false;
            practiceData.currentAnswer = "";
            practiceData.currentChoice = "";
            practiceData.isCorrectAnswer = false;
            practiceData.isSendAnswer = false;
            practiceData.isSendAnswer = false;
            practiceData.isFinishPractice = false;
          } else if (practiceData.currentStep == 4) {
            isWaiting.value = false;
            practiceData.isSendAnswer = true;

            if (!practiceData.currentChoice) {
              practiceData.currentAnswer = practiceData.choices.filter(
                (x) => x.index == practiceData.correctAnswer
              )[0].choice;
            }

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
          } else if (practiceData.currentStep == 1) {
            practiceData.currentAnswer = "";
            practiceData.currentChoice = "";
            practiceData.isCorrectAnswer = false;
            practiceData.isSendAnswer = false;
          } else if (practiceData.currentStep == 6) {
            practiceStore.saveProgressLog(
              questionList.value[practiceData.currentQuestion].id,
              route.params.practiceListId
            );

            if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
              funcFinishPractice(
                practiceData,
                route.params.practiceListId,
                $q.platform.is
              );
              practiceData.isSendAnswer = true;
              practiceData.isFinishPractice = true;
              practiceData.isRestart = false;
            }
          }

          practiceData.question =
            questionList.value[practiceData.currentQuestion].question;

          practiceData.choices = questionList.value[
            practiceData.currentQuestion
          ].choices.sort((a, b) => a.index - b.index);

          practiceData.imageUrl =
            questionList.value[practiceData.currentQuestion].imageUrl || "";

          practiceData.isImage =
            questionList.value[practiceData.currentQuestion].isImage || false;

          practiceData.description =
            questionList.value[practiceData.currentQuestion].description;

          practiceData.correctAnswer =
            questionList.value[practiceData.currentQuestion].correctAnswer;
        } else {
          isWaiting.value = false;
          practiceData.isSynchronize = false;
        }
      }
    });
};
// #endregion

// #endregion

// #region Computed
const isButtonDisable = computed(() => {
  let isCheck = false;

  if (
    (practiceData.currentStep == 0 && practiceData.isSynchronize) ||
    (practiceData.currentStep == 1 && practiceData.isSynchronize) ||
    (practiceData.currentStep == 3 && practiceData.isSynchronize)
  ) {
    isCheck = true;
  } else {
    isCheck = false;
  }

  return isCheck;
});
// #endregion

let authListen;
const isSync = ref(false);
const getUser = ref("");
onMounted(async () => {
  systemStore.setRouter("grammaraction");

  isShowLoading.value = true;

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      getUser.value = user;

      if (analyticsLogEvent != null) {
        analyticsLogEvent("/grammarAction");
      }

      if ($q.sessionStorage.has(isSync)) {
        practiceData.isSynchronize = $q.sessionStorage.getItem("isSync");
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

  if (tempSync) {
    tempSync();
  }
});
</script>

<style lang="scss" scoped>
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
  background-image: url("/images/background_main/background-grammar-multiple.png");
  background-size: cover;
  background-position: 4% 0%;
  background-repeat: no-repeat;
}

.backdrop-grammar-action {
  background-image: url("/images/background_main/backdrop-grammar.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-dialog-image-container {
  width: 320px;
  border-radius: 12px;
  border: 2px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;
}

.sub-dialog-image {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
  color: #4a261b;
}

.content-dialog-image {
  border-radius: 10px;
  background: #efd080;
  padding: 12px;
  margin-top: 16px;
}

.box-button-close-dialog-image {
  top: -15px;
  right: -15px;
  width: 40px;
  cursor: pointer;
}

.box-aniamtion-action {
  width: 67.5%;
  top: 9%;
  margin: auto;
}

.box-backdrop-header {
  width: 100%;
  height: 42%;
  background-image: url("/images/background_main/banner-grammar-action.png");
  background-size: cover;
  background-position: top;
}

.box-content-practice {
  top: 42%;
  width: 100%;
  height: 58%;
}

.box-question,
.box-waiting {
  width: 56%;
  border: 0.2rem solid #4a261b;
  background-color: #f2c043;
  border-radius: 0.8rem;
  padding: 0.3%;
}

.box-question.mobile {
  max-width: 700px;
  min-width: 360px;
  width: 100%;
  padding: 7px;
  border-radius: 16px;
  border: 2px solid #4a261b;
  margin: 10px auto;
}

.box-waiting.mobile {
  max-width: 500px;
  min-width: 360px;
  width: 100%;
  padding: 7px;
  border-radius: 16px;
  border: 2px solid #4a261b;
  margin: 10px auto;
}

.box-question .sub,
.box-waiting .sub {
  width: 100%;
  background-color: #f6f3d3;
  border-radius: 0.4rem;
  padding: 1% 2% 2.5% 2%;
  color: #4a261b;
  font-size: clamp(13px, 1.25vw, 20px);
}

.box-question.mobile .sub,
.box-waiting.mobile .sub {
  border-radius: 8px;
  padding: 15px;
  font-size: 16px;
}

.box-button-choices {
  width: 56%;
}

.box-button-choices.mobile {
  width: 100%;
  margin: auto;
}

.waiting-size {
  width: 35%;
}

.waiting-size.mobile {
  width: 70%;
  margin: auto;
}

// #region Text
.text-waiting {
  font-size: clamp(16px, 1.62vw, 26px);
  color: #662707;
  padding: 3% 0%;
}

.text-waiting.mobile {
  font-size: 26px;
}

// #endregion

// #region Button
.button-active-main.button-answer {
  position: relative;
  width: 97.5%;
  background: #db8200;
  border: 0.1rem solid #4a261b;
  border-radius: 0.4rem;
  padding-bottom: 0.8%;
  margin: 2.5% 0%;
  cursor: pointer;
  font-size: clamp(10px, 1vw, 16px);
  color: #4a261b;
}

.button-active-main.button-answer.mobile {
  max-width: 400px;
  min-width: 320px;
  width: 95%;
  font-size: 16px;
  padding-bottom: 3px;
  margin: 15px auto;
  border-radius: 10px;
  overflow: hidden;
}

.button-answer::before {
  content: "";
  position: absolute;
  top: 13%;
  left: 1%;
  width: 3%;
  height: 9%;
  background: rgba(255, 255, 255, 0.5);
  transform: rotate(-30deg);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
}

.button-answer .sub {
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.4rem;
  padding: 3.5% 6%;
}

.button-answer .sub.mobile {
  border-radius: 9px;
  padding: 15px 20px;
}

.button-answer.correct {
  color: #58cc02;
  background: #8ec960;
  border: 0.1rem solid #58cc02;
}

.button-answer.correct .sub {
  background: #d7ffb8 !important;
}

.button-answer.incorrect {
  background: #e3a9aa;
  border: 0.1rem solid #ff4b4b;
  color: #ff4b4b;
}

.button-answer.incorrect .sub {
  background: #ffdfe0 !important;
}

.button-answer.disable {
  background: #9b9b9b;
  color: #fff;
}

.button-answer.disable .sub {
  background: #bababa !important;
}

.choice-circle-bg {
  color: #f66287;
}

.choice-square-bg {
  color: #067fd8;
}

.choice-triangle-bg {
  color: #991a99;
}

.choice-star-bg {
  color: #8f5839;
}

.icon-diable {
  color: #8f8d8c;
}

// #endregion

// #region Old

.bg-grammaraction {
  background-image: url("/images/grammar/bg-grammarmultiple-content.png");
  background-color: #b2dfff;
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}

.bg-mobile {
  background-color: #eabd94;
}

.box-finish {
  border: 5px solid #d14e29;
  background-color: #fff7eb;
  border-radius: 10px;
}

// .box-waiting {
//   border: 5px solid #d14e29;
//   background-color: #fff7eb;
//   border-radius: 10px;
// }

.border-dash {
  border: 1px dashed;
}

.box-show-answer {
  min-height: calc(50vh);
  max-height: fit-content;
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

.btn-choice {
  border-radius: 10px;
  box-shadow: 2px 3px 0px 0px #4e3801;
  height: 50px;
  background-image: linear-gradient(#ffd361, #ffbb0d);
}

.btn-choice:hover {
  background-image: linear-gradient(#4bddfe, #2c9bc0);
  box-shadow: 0px 3px 10px 0px #0082ba;
}

.btn-no {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 5px solid #662707;
}

.graph-mobile {
  width: 60px;
}

.graph-desktop {
  width: 100px;
}

.box-dialog-lesson {
  max-width: 1000px;
  width: 90%;
  background-color: #4e90a6;
  border-radius: 10px;
  overflow: hidden;
  margin: auto;
}

.box-dialog-lesson-mobile {
  max-width: 600px;
  width: 100%;
  background-color: #2d3081;
  overflow: hidden;
  margin: auto;
}

.box-lesson-list {
  background-color: #fff0da;
  height: 450px;
  overflow-x: auto;
}

/* width */
.box-lesson-list::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-lesson-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-lesson-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-lesson-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-active:active {
  transition: 0.2s;
  transform: scale(0.95);
}

.btn-selected {
  background-color: #48dbfc;
}

.box-content-lesson {
  height: calc(100vh - 150px);
  overflow-x: auto;
}

.box-content-lesson-mobile {
  width: 100%;
  height: 370px;
  overflow: auto;
}

.box-content-lesson-list {
  width: 300px;
  height: 600px;
  background-color: #fff0da;
  overflow: auto;
}

/* width */
.box-content-lesson-list::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-content-lesson-list::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-lesson-list::-webkit-scrollbar-thumb {
  background: #e20418;
}

/* Handle on hover */
.box-content-lesson-list::-webkit-scrollbar-thumb:hover {
  background: #d30315;
}

/* width */
.box-content-lesson-mobile::-webkit-scrollbar,
.box-content-lesson::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-content-lesson-mobile::-webkit-scrollbar-track,
.box-content-lesson::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-lesson-mobile::-webkit-scrollbar-thumb,
.box-content-lesson::-webkit-scrollbar-thumb {
  background: #e20418;
}

/* Handle on hover */
.box-content-lesson-mobile::-webkit-scrollbar-thumb:hover,
.box-content-lesson::-webkit-scrollbar-thumb:hover {
  background: #d30315;
}

// #endregion</style>
