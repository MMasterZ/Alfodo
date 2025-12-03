<template>
  <q-page class="backdrop-phonics-multiple row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-phonics-action'"></background-main>

      <!-- backdrop -->
      <div class="absolute-top box-backdrop-header"></div>

      <!-- #region Mini game Action -->
      <div class="absolute-top box-aniamtion-action">
        <animation-action :practiceData="practiceData"></animation-action>
      </div>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-direction="funcCloseDialogDirection()"
        @callback-help="isShowDialogHelp = true"
        :page="'phonicsmultiple'"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region เทียบเสียง -->
      <div class="absolute-top-right box-help-main">
        <div class="box-help-header font-mali-b" align="center">เทียบเสียง</div>
        <div class="box-help-scroll">
          <div
            class="row justify-center"
            style="width: 100%; padding: 3.5% 1%"
            v-for="(item, index) in extraSound"
            :key="index"
          >
            <div class="col-1 self-start" style="width: 17%" align="right">
              <span>{{ item.vocab }}</span>
            </div>
            <div class="col-1 self-start width-fit" style="padding: 0% 7%" align="left">
              <span
                v-if="
                  item.vocab == 'A' ||
                  item.vocab == 'E' ||
                  item.vocab == 'I' ||
                  item.vocab == 'O' ||
                  item.vocab == 'U'
                "
                >เทียบได้กับสระ</span
              >
              <span v-else>เทียบได้กับอักษร</span>
            </div>
            <div class="col self-start" align="left">
              <span>{{ item.alphabets }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="absolute-top box-practice-content" v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-main">
          <div class="sub-question-main row justify-center items-center font-mali-m">
            <div class="col-12" align="center" v-if="practiceType == 'questionsound'">
              <div
                class="button-active-main button-question-sound row justify-center items-center"
                @click="practiceData.isSendAnswer ? null : funcPlaySoundQuestion()"
              >
                <div class="self-start relative-position z-top" style="margin-top: -1.1%">
                  <q-icon name="fas fa-volume-up"></q-icon>
                </div>
                <div
                  class="self-center relative-position z-top"
                  style="padding: 0% 2%; margin-top: -0.5%"
                >
                  กดเพื่อฟังเสียงโจทย์
                </div>
              </div>
            </div>
            <div v-else class="col-12" align="center">
              <div v-html="practiceData.question"></div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Choices -->
        <div
          class="box-choices-main row justify-between"
          :class="
            practiceType == 'questionsound' || practiceType == 'multiplechoices'
              ? ' justify-between'
              : ''
          "
        >
          <div
            class="button-active-main"
            :class="[
              practiceType == 'questionsound' || practiceType == 'multiplechoices'
                ? 'button-choice'
                : 'button-sound-choice',
              practiceData.isSendAnswer
                ? practiceData.currentChoiceIndex == item.index
                  ? practiceData.isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
                : practiceData.currentChoiceIndex == item.index
                ? 'selected'
                : '',
            ]"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            @click="practiceData.isSendAnswer ? null : funcSelectedChoice(item)"
          >
            <div
              class="z-top relative-position font-mali-m"
              v-if="practiceType == 'questionsound' || practiceType == 'multiplechoices'"
            >
              <div v-html="item.choice"></div>
            </div>
            <div v-else align="center">
              <q-icon name="fas fa-volume-up"></q-icon>
            </div>
            <!-- <multiplechoice-btn
                :choices="item"
                :practiceData="practiceData"
                :isSound="item.soundUrl ? true : false"
              ></multiplechoice-btn> -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Send answer -->
        <div class="box-send-answer" align="center">
          <div
            class="button-active-main button-send-answer"
            :class="
              practiceData.isSendAnswer
                ? 'disable'
                : practiceData.currentChoiceIndex == null
                ? 'disable'
                : ''
            "
            @click="
              practiceData.isSendAnswer
                ? null
                : practiceData.currentChoiceIndex == null
                ? null
                : funcSendAnswer()
            "
          >
            <div class="z-top relative-position font-mali-m">
              {{ `ส่งคำตอบ` }}
            </div>
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
      <header-bar
        :practiceData="practiceData"
        @callback-direction="funcCloseDialogDirection()"
        @callback-help="isShowDialogHelp = true"
        :page="'phonicsmultiple'"
      ></header-bar>
      <!-- #endregion -->

      <div v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-main mobile">
          <div class="sub-question-main mobile">
            <div class="font-mali-m" v-if="practiceType == 'questionsound'">
              <div
                class="button-active-main button-question-sound-mobile row justify-center"
                @click="practiceData.isSendAnswer ? null : funcPlaySoundQuestion()"
              >
                <div class="self-center relative-position z-top" style="margin-top: -5px">
                  <q-icon name="fas fa-volume-up" class="f22"></q-icon>
                </div>
                <div
                  class="self-center relative-position z-top f16"
                  style="padding: 0px 7px; margin-top: -1px"
                >
                  กดเพื่อฟังเสียงโจทย์
                </div>
              </div>
            </div>
            <div v-else>
              <div v-html="practiceData.question"></div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button choices -->
        <div class="box-choices-main mobile">
          <div v-for="(item, index) in practiceData.choices" :key="index">
            <div
              class="button-active-main button-choice-mobile"
              :class="
                practiceData.isSendAnswer
                  ? practiceData.currentChoiceIndex == item.index
                    ? practiceData.isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                  : practiceData.currentChoiceIndex == item.index
                  ? 'selected'
                  : ''
              "
              @click="practiceData.isSendAnswer ? null : funcSelectedChoice(item)"
            >
              <div
                class="fit row items-center q-px-md"
                v-if="
                  practiceType == 'questionsound' || practiceType == 'multiplechoices'
                "
              >
                <div class="relative-position z-top q-pa-sm font-mali-m f16" align="left">
                  <div v-html="item.choice"></div>
                </div>
              </div>
              <div class="fit row justify-center items-center" v-else>
                <q-icon name="fas fa-volume-up" class="f26"></q-icon>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Send answer -->
        <div class="box-button-send-answer-mobile">
          <div
            class="button-send-answer-mobile row justify-center items-center"
            :class="
              practiceData.isSendAnswer
                ? 'disable'
                : practiceData.currentChoiceIndex == null
                ? 'disable'
                : ''
            "
            @click="
              practiceData.isSendAnswer
                ? null
                : practiceData.currentChoiceIndex == null
                ? null
                : funcSendAnswer()
            "
          >
            <div class="relative-position z-top font-mali-m">
              {{ `ส่งคำตอบ` }}
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Help Grammar Video : PC -->
  <q-dialog
    maximized
    v-model="isShowDialogHelp"
    persistent
    v-if="$q.platform.is.desktop"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit">
        <div class="box-dialog-lesson absolute-center">
          <div
            class="relative-position text-white row"
            style="border: 1px solid #4e90a6"
            align="center"
          >
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
              <div class="q-pa-sm" v-for="(item, index) in showLessonVideo">
                <div
                  v-ripple
                  @click="selectedLesson = item.id"
                  class="fit cursor-pointer q-pa-sm relative-position shadow-1 rounded-borders"
                  align="left"
                  :class="selectedLesson == item.id ? 'btn-selected' : 'bg-white'"
                  no-caps
                >
                  <span class="f14">{{ item.name }}</span>
                </div>
              </div>
            </div>
            <div class="col q-pa-md" style="max-height: 300px; min-height: fit-content">
              <div v-if="showLessonVideo.filter((x) => x.id == selectedLesson)[0].vdoUrl">
                <q-video
                  :ratio="16 / 9"
                  :src="showLessonVideo.filter((x) => x.id == selectedLesson)[0].vdoUrl"
                ></q-video>
              </div>

              <div v-else>
                <q-img
                  class="relative-position"
                  fit="contain"
                  style="width: 100%"
                  :src="showLessonVideo.filter((x) => x.id == selectedLesson)[0].imageUrl"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Help Grammar Video : Mobile -->
  <q-dialog
    maximized
    v-model="isShowDialogHelp"
    persistent
    v-if="$q.platform.is.mobile"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit">
        <div class="box-dialog-lesson-mobile absolute-center">
          <div class="text-amber" style="border: 1px solid #2d3081" align="center">
            <q-tabs
              v-model="tabHelp"
              no-caps
              outside-arrows
              mobile-arrows
              class="text-amber shadow-0"
            >
              <q-tab name="content" class="f16" label="เนื้อหา" />
              <q-tab name="extra" class="f16" label="เทียบเสียง" />
            </q-tabs>
          </div>

          <div class="bg-white">
            <q-tab-panels v-model="tabHelp" animated class="no-padding">
              <q-tab-panel name="content" class="no-padding">
                <div class="q-pa-md">
                  <div>
                    <q-select
                      dense
                      outlined
                      v-model="selectedLesson"
                      :options="showLessonVideo"
                      emit-value
                      map-options
                    />
                  </div>
                  <div
                    class="relative-position q-mt-md"
                    align="center"
                    style="max-height: 300px; min-height: fit-content"
                  >
                    <div
                      v-if="
                        showLessonVideo.filter((x) => x.id == selectedLesson)[0].vdoUrl
                      "
                    >
                      <q-video
                        :ratio="16 / 9"
                        :src="
                          showLessonVideo.filter((x) => x.id == selectedLesson)[0].vdoUrl
                        "
                      ></q-video>
                    </div>
                    <div v-else>
                      <q-img
                        class="relative-position"
                        fit="contain"
                        style="width: 100%"
                        :src="
                          showLessonVideo.filter((x) => x.id == selectedLesson)[0]
                            .imageUrl
                        "
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="extra" class="no-padding">
                <div class="box-content-lesson-mobile">
                  <div v-for="(item, index) in practiceData.extraSound">
                    <div class="q-py-sm row">
                      <div
                        class="col-2 self-center q-pl-lg"
                        align="left"
                        style="width: 80px"
                      >
                        {{ item.vocab }}
                      </div>
                      <div class="col self-center" align="left">
                        <span
                          v-if="
                            item.vocab == 'A' ||
                            item.vocab == 'E' ||
                            item.vocab == 'I' ||
                            item.vocab == 'O' ||
                            item.vocab == 'U'
                          "
                          >เทียบได้กับสระ</span
                        >
                        <span v-else>เทียบได้กับอักษร</span>
                      </div>
                      <div
                        class="col-4 self-center q-px-md"
                        style="width: 100px"
                        align="left"
                      >
                        {{ item.alphabets }}
                      </div>
                    </div>
                    <hr class="no-padding no-margin" />
                  </div>
                </div>
              </q-tab-panel>
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
  <answer-action
    :systemStore="systemStore"
    :practiceData="practiceData"
    :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore"
    @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-restart="funcRestartPractice()"
  ></answer-action>
  <!-- #endregion -->

  <!-- #region Dialog เรียนครบ 2 ครั้ง -->
  <learning-done
    :isShowLearningDone="isShowLearningDone"
    @callback-closedialog="
      (isShowLearningDone = false), $router.replace('/practice/list')
    "
  ></learning-done>
  <!-- #endregion -->

  <!-- #region Dialog Practice Complete -->
  <dialog-practice-complete
    v-if="isShowDialogPracticeComplete"
  ></dialog-practice-complete>
  <!-- #endregion -->

  <!-- #region Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
// New
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import animationAction from "../components/phonicsmultiple/theme-animation.vue";
import answerAction from "../components/answer-action.vue";

import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";

import lessonHooks from "../hooks/lessonHooks";
import { ref, reactive, onMounted, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  analyticsLogEvent,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import axios from "axios";

import { useQuasar } from "quasar";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";

const CancelToken = axios.CancelToken;
let tokenAPI;

const components = defineComponent({
  headerBar,
  backgroundMain,
  animationAction,
  answerAction,

  learningDone,
  loading,
});

const props = defineProps({
  isSynchronize: {
    type: Boolean,
    default: false,
  },
});

// #region Data

// Store
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();

// Initial Data
const route = useRoute();
const router = useRouter();
const tab = ref("video");
const isShowDialogHelp = ref(false);
const tabHelp = ref("content");
const isShowLearningDone = ref(false);
const isShowLoading = ref(false);
const isShowDialogPracticeComplete = ref(false);

const $q = useQuasar();

// Practice Data
const questionList = ref([]);
const practiceData = reactive({
  answers: [],

  instruction: {
    eng: "",
    th: "",
  },
  // Details Practice
  totalQuestion: 0,
  currentQuestion: 0,
  question: "",
  choices: [],
  extraSound: [],
  correctAnswer: 0,
  isQuestionSound: false,
  refs: [],
  description: "",
  isSynchronize: false,
  skill: "Phonics",
  star: 0,
  score: 0,
  correct: 0,
  incorrect: 0,
  soundQuestionUrl: "",
  isEnableSoundEffect: false,
  numOfPractice: 0,
  level: 0,
  unit: 0,
  counter: 0,
  coin: 0,
  totalCorrectQuestion: 0,

  // Details Active Practice
  isSendAnswer: false,
  isFinishPractice: false,
  isCorrectAnswer: false,
  currentChoiceIndex: null,
  currentAnswer: "",
  currentChoice: "",
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
      practiceData.question = "";
      practiceData.choices = [];
      practiceData.answers = [];
      practiceData.currentQuestion = 0;
      practiceData.correct = 0;
      practiceData.score = 0;
      practiceData.isFinishPractice = false;
      practiceData.isSendAnswer = false;
      practiceData.coin = 0;
      practiceData.counter = 0;

      answerStructure = [];

      if (isLoadPractice.value) {
        await funcLoadPractice();
      }
    },
  },
});

const selectedLesson = ref("");
const isLoadPractice = ref(false);
const showLessonVideo = ref([]);
const extraSound = reactive([
  {
    vocab: "A",
    alphabets: "แ",
  },
  {
    vocab: "B",
    alphabets: "บ",
  },
  {
    vocab: "C",
    alphabets: "ซ, ค",
  },
  {
    vocab: "D",
    alphabets: "ด",
  },
  {
    vocab: "E",
    alphabets: "เ, อี",
  },
  {
    vocab: "F",
    alphabets: "ฟ",
  },
  {
    vocab: "G",
    alphabets: "ก",
  },
  {
    vocab: "H",
    alphabets: "ฮ",
  },
  {
    vocab: "I",
    alphabets: "อิ, ไ",
  },
  {
    vocab: "J",
    alphabets: "จ",
  },
  {
    vocab: "K",
    alphabets: "ค, ก",
  },
  {
    vocab: "L",
    alphabets: "ล",
  },
  {
    vocab: "M",
    alphabets: "ม",
  },
  {
    vocab: "N",
    alphabets: "น",
  },
  {
    vocab: "O",
    alphabets: "โ, อ",
  },
  {
    vocab: "P",
    alphabets: "พ",
  },
  {
    vocab: "Q",
    alphabets: "คว",
  },
  {
    vocab: "R",
    alphabets: "ร",
  },
  {
    vocab: "S",
    alphabets: "ซ, ส",
  },
  {
    vocab: "T",
    alphabets: "ท",
  },
  {
    vocab: "U",
    alphabets: "อั, อิว, อู",
  },
  {
    vocab: "V",
    alphabets: "ว",
  },
  {
    vocab: "W",
    alphabets: "ว",
  },
  {
    vocab: "X",
    alphabets: "กซ",
  },
  {
    vocab: "Y",
    alphabets: "ย, วี, อาย",
  },
  {
    vocab: "Z",
    alphabets: "ซ",
  },
]);

// #endregion

// #region Function

// #region Function
const practiceType = ref("");
const funcLoadSkill = async () => {
  let practiceListId = route.params.practiceListId;

  let getData = await practiceHooks.practiceListInfo(practiceListId);

  if (getData.practiceType == "multiplechoices(questionsound)") {
    practiceType.value = "questionsound";
  } else if (getData.practiceType == "multiplechoices(answersound)") {
    practiceType.value = "answersound";
  } else {
    practiceType.value = "multiplechoices";
  }
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

    let multipleList = [];

    // เก็บ practice list id จาก router
    let practiceListId = route.params.practiceListId;

    // ดึงข้อมูล practice list
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
    practiceData.totalQuestion = getData.numOfPractice;
    practiceData.level = getData.level;
    practiceData.unit = getData.unit;

    practiceData.instruction.eng = getData.instructionEng;
    practiceData.instruction.th = getData.instructionTh;

    try {
      let getLesson = await lessonHooks
        .lesson()
        .lessonAll(getData.level, getData.unit, getData.skill);

      if (getLesson.length) {
        getLesson.forEach((doc) => {
          doc.value = doc.id;
          doc.label = doc.name;
        });

        getLesson = getLesson.filter((x) => x.vdoUrl);

        showLessonVideo.value = getLesson;
        selectedLesson.value = getLesson[0].value;
      }
    } catch (error) {
      // console.log(`${error} : Get Hooks Phonics lesson`);
    }

    // Get Api
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

    // เก็บข้อมูลที่ได้จาก axios
    multipleList = response.data;

    // copy แบบฝึกหัด
    let setPracticeList = [...multipleList];

    // เก็บข้อมูลคำศัพท์เสริม
    practiceData.extraSound = extraSound;

    // สุ่มคำตอบของแต่ละข้อ
    setPracticeList = setPracticeList.map((x, index) => {
      x.choices = x.choices.map((xx, index) => {
        xx.index = index + 1;

        if (xx.soundUrl) {
          let newSound = new Audio(xx.soundUrl);
          xx.soundUrl = newSound;
        }

        return xx;
      });

      if (x.soundQuestionUrl) {
        let newSound = new Audio(x.soundQuestionUrl);
        x.soundQuestionUrl = newSound;
      }

      let choices = x.choices.sort(() => Math.random() - 0.5);
      x.choices = choices;
      return x;
    });

    // สุ่มแบบฝึกหัด
    setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

    // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
    setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

    practiceData.answers = setPracticeList.map((x) => {
      return { isCorrect: false };
    });

    // เก็บข้อมูลแบบฝึกหัดทั้งหมด
    questionList.value = setPracticeList;

    // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
    funcSelectedQuestion(true);
    isLoadPractice.value = true;
    isShowLoading.value = false;
    practiceData.isLoadPractice = false;
  } catch (error) {
    // console.log(`${error} : Function Load Practice`);
    isShowLoading.value = false;
  }
};
// #endregion

// #region Selected Question
const funcSelectedQuestion = (firsttime) => {
  if (!firsttime) {
    practiceData.currentQuestion++;
    funcPlaySoundQuestion();
  }

  // Practice Data : Show Question
  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  // Practice Data : Show Choice
  practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

  if (questionList.value[practiceData.currentQuestion].soundQuestionUrl) {
    practiceData.isQuestionSound = true;
    practiceData.soundQuestionUrl =
      questionList.value[practiceData.currentQuestion].soundQuestionUrl;
  } else {
    practiceData.isQuestionSound = false;
    practiceData.soundQuestionUrl = "";
  }

  // Practice Data : Correct Answer
  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  practiceData.isSendAnswer = false;
  practiceData.currentChoiceIndex = null;

  if (!firsttime) {
    funcPlaySoundQuestion();
  }
};
// #endregion

// #region selected choice
const funcSelectedChoice = (item) => {
  practiceData.currentChoiceIndex = item.index;

  if (item.soundUrl) {
    systemStore.playSound(item.soundUrl);
  }
};
// #endregion

// #region Play sound question

const funcPlaySoundQuestion = () => {
  if (practiceData.isQuestionSound) {
    systemStore.playSound(practiceData.soundQuestionUrl);
  }
};
// #endregion

// #region Send Answer
let answerStructure = [];
const funcSendAnswer = async () => {
  practiceData.isSendAnswer = true;
  isShowLoading.value = true;

  const practiceStore = usePracticeStore();

  practiceStore.saveProgressLog(
    questionList.value[practiceData.currentQuestion].id,
    route.params.practiceListId
  );

  if (Number(practiceData.correctAnswer) == practiceData.currentChoiceIndex) {
    practiceData.isCorrectAnswer = true;
    practiceData.answers[practiceData.currentQuestion].isCorrect = true;
    practiceData.totalCorrectQuestion++;
    // practiceData.correct++;
  } else {
    practiceData.answers[practiceData.currentQuestion].isCorrect = false;
    practiceData.isCorrectAnswer = false;
  }

  practiceData.currentChoice = practiceData.choices.filter(
    (x) => x.index == practiceData.currentChoiceIndex
  )[0].choice;

  practiceData.currentAnswer = practiceData.choices.filter(
    (x) => x.index == practiceData.correctAnswer
  )[0].choice;

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
    answerIndex: null,
    question: practiceData.question,
  };

  answerStructure.push(structure);

  if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
    // practiceData.isFinishPractice = true;
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

// #region Reset Practice
const funcRestartPractice = async () => {
  isShowLoading.value = true;

  if (synchronizeStore.isSync) {
    practiceData.isRestart = true;
  }

  practiceData.totalQuestion = 0;
  practiceData.star = 0;
  practiceData.question = "";
  practiceData.choices = [];
  practiceData.answers = [];
  practiceData.currentQuestion = 0;
  practiceData.correct = 0;
  practiceData.score = 0;
  practiceData.isFinishPractice = false;
  practiceData.isSendAnswer = false;

  answerStructure = [];

  if (isLoadPractice.value) {
    await funcLoadPractice();
  }
};
// #endregion

// #region Close Dialog Direction
const isFirstTime = ref(true);
const funcCloseDialogDirection = () => {
  if (isFirstTime.value) {
    isFirstTime.value = false;
    funcPlaySoundQuestion();
    return;
  }
};
// #endregion

// #endregion

// #region Watch
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
// #endregion

// Mounted Function First time
let authListen;
const isSync = ref(false);
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("phonicsmultiple");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
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

        practiceData.counter = practiceStore.currentPracticeData.counter;

        if (practiceStore.practiceCurrentCounter == 2) {
          isShowDialogPracticeComplete.value = true;
          isShowLoading.value = false;
          return;
        }
      }

      await funcLoadSkill();

      if (analyticsLogEvent != null) {
        analyticsLogEvent("/phonicsMultiple/" + practiceType.value);
      }

      if (synchronizeStore.isSync) {
        if (synchronizeStore.syncData.isShowSummaryPractice) {
          practiceData.isFinishPractice = true;
          practiceData.isRestart = false;
          isShowLoading.value = false;
          return;
        }
      }
      funcLoadPractice();
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

  questionList.value.forEach((res) => {
    res.soundUrl = null;
    res.soundQuestionUrl = null;
  });
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

.box-container-main.mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100vh;
}

.box-container-main-mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url("/images/background_main/background-phonics-multiple.png");
  background-size: cover;
  background-position: 52% 50%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-phonics-multiple {
  background-image: url("/images/background_main/backdrop-phonics.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-backdrop-header {
  width: 100%;
  height: 40.5%;
  background-image: url("/images/background_main/backdrop-phonics-action.png");
  background-size: cover;
  background-position: top;
}

.box-aniamtion-action {
  width: 77.5%;
  top: 0%;
}

.box-help-main {
  top: 7.5%;
  width: 22.5%;
  height: calc(100% - 7.1%);
  overflow: hidden;
}

.box-help-header {
  background-color: #984510;
  border: 0.1rem solid #4a261b;
  border-radius: 0.4rem 0.4rem 0 0;
  color: #fff;
  padding: 2.19%;
  font-size: clamp(16px, 1.5vw, 24px);
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-help-scroll {
  width: 100%;
  height: calc(100% - 6.5%);
  background-color: #f6f3d3;
  border: 0.1rem solid #4a261b;
  border-top: transparent;
  overflow: auto;
  font-size: clamp(10px, 1vw, 16px);
}

.box-help-scroll::-webkit-scrollbar {
  width: 0.5rem;
}

.box-help-scroll::-webkit-scrollbar-track {
  background: #eaa02c;
}

.box-help-scroll::-webkit-scrollbar-thumb {
  background: #9f220c;
}

.box-practice-content {
  top: 40.5%;
  width: 77.5%;
  height: 59.5%;
}

.box-question-main {
  width: 72.178%;
  height: 25.025%;
  background-color: #f2c043;
  border: 0.17rem solid #4a261b;
  border-radius: 0.5rem;
  padding: 0.4%;
  margin: 4% auto 1.5% auto;
  text-align: center;
  color: #4a261b;
  font-size: clamp(10px, 1vw, 20px);
}

.box-question-main.mobile {
  max-width: 600px;
  width: 100%;
  min-width: 360px;
  height: fit-content;
  padding: 7px;
  border-radius: 16px;
  font-size: 20px;
  margin: 10px auto;
}

.sub-question-main {
  background-color: #f6f3d3;
  height: 100%;
  border-radius: 0.3rem;
}

.sub-question-main.mobile {
  padding: 5px;
  border-radius: 8px;
}

.box-choices-main {
  width: 72.178%;
  font-size: clamp(10px, 1vw, 16px);
  margin: auto;
}

.box-choices-main.mobile {
  max-width: 600px;
  width: 95%;
  min-width: 360px;
  margin: 15px auto;
}

.box-send-answer {
  width: 72.178%;
  margin: 1.5% auto;
}

.box-button-send-answer-mobile {
  max-width: 360px;
  width: 100%;
  min-width: 320px;
  margin: 30px auto;
}

// #endregion

// #region Button
.button-active-main {
  position: relative;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.1s;
  -webkit-transition: transform 0.1s;
  -moz-transition: transform 0.1s;

  cursor: pointer;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: transform 0.2s;
  -webkit-transition: transform 0.2s;
  -moz-transition: transform 0.2s;
}

.button-active-main:not(.mobile, .button-send-answer, .button-sound-choice)::after {
  content: "";
  position: absolute;
  top: 10%;
  left: 1%;
  width: 3.5%;
  padding: 0.65%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  transform: rotate(-32deg);
}

.button-question-sound-mobile {
  max-width: 360px;
  width: 95%;
  min-width: 320px;
  height: 60px;
  background-color: #db8200;
  border-radius: 10px;
  border: 1px solid #4a261b;
  margin: 10px auto;
  font-size: 16px;
  color: #4a261b;
}

.button-active-main.button-choice-mobile {
  max-width: 360px;
  width: 85%;
  min-width: 320px;
  height: 60px;
  background-color: #db8200;
  border-radius: 10px;
  border: 1px solid #4a261b;
  margin: 15px auto;
  font-size: 16px;
  color: #4a261b;
}

.button-choice-mobile::before,
.button-question-sound-mobile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 10px;
}

.button-active-main.button-question-sound {
  width: 40.86%;
  background-color: #db8200;
  padding: 1.80524%;
  border: 0.1rem solid #4a261b;
  border-radius: 0.7rem;
  text-align: center;
  margin: 1% 0%;
  font-size: clamp(12px, 1vw, 20px);
}

.button-question-sound::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 92%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.7rem;
}

.button-active-main.button-choice {
  position: relative;
  width: 48.5%;
  background-color: #db8200;
  padding: 1.9% 5%;
  border: 0.1rem solid #4a261b;
  border-radius: 0.7rem;
  text-align: left;
  margin: 1% 0% 2% 0%;
}

.button-active-main.button-sound-choice {
  position: relative;
  width: 29.052%;
  background-color: #db8200;
  padding: 6.593% 5%;
  border: 0.1rem solid #4a261b;
  border-radius: 0.7rem;
  text-align: left;
  margin: 1% 0%;
  font-size: clamp(16px, 2vw, 30px);
  line-height: 0;
  color: #4a261b;
}

.button-active-main.button-sound-choice::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.7rem;
}

.button-active-main.button-sound-choice::after {
  content: "";
  position: absolute;
  top: 5%;
  left: 2%;
  width: 5%;
  padding: 1%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  transform: rotate(-32deg);
}

.button-choice.selected,
.button-sound-choice.selected,
.button-choice-mobile.selected {
  background-color: #2daac7;
  border: 0.1rem solid #4a261b;
}

.button-choice.correct,
.button-sound-choice.correct,
.button-choice-mobile.correct {
  background-color: #8ec960;
  border: 0.1rem solid #58cc02;
  color: #58cc02;
}

.button-choice.incorrect,
.button-sound-choice.incorrect,
.button-choice-mobile.incorrect {
  background-color: #e3a9aa;
  border: 0.1rem solid #ff4b4b;
  color: #ff4b4b;
}

.button-choice.correct::before,
.button-sound-choice.correct::before,
.button-choice-mobile.correct::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: #d7ffb8;
  border-radius: 0.7rem;
}

.button-choice.incorrect::before,
.button-sound-choice.incorrect::before,
.button-choice-mobile.incorrect::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: #ffdfe0;
  border-radius: 0.7rem;
}

.button-choice.selected::before,
.button-sound-choice.selected::before,
.button-choice-mobile.selected::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 98%;
  background: #48dbfc;
  border-radius: 0.7rem;
}

.button-choice::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 95%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.7rem;
}

.button-active-main.button-send-answer {
  width: 22.398%;
  background-color: #db8200;
  padding: 0.785%;
  border: 0.1rem solid #4a261b;
  border-radius: 0.7rem;
  text-align: center;
  margin: 1% 0%;
  font-size: clamp(10px, 1vw, 16px);
}

.button-active-main.button-send-answer::after {
  content: "";
  position: absolute;
  top: 18%;
  left: 2%;
  width: 7%;
  padding: 1.3%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  transform: rotate(-32deg);
}

.button-send-answer:not(.disable)::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 95%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.7rem;
}

.button-send-answer.disable {
  background-color: #9b9b9b;
  border: 0.1rem solid #4a261b;
  color: #fff;
  cursor: not-allowed;
}

.button-send-answer.disable::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  background: #bababa;
  border-radius: 0.7rem;
}

.button-send-answer-mobile {
  position: relative;
  max-width: 200px;
  width: 100%;
  min-width: 200px;
  height: 40px;
  background-color: #db8200;
  border-radius: 10px;
  border: 1px solid #4a261b;
  margin: 10px auto;
  font-size: 16px;
  color: #4a261b;
}

.button-send-answer-mobile::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 97%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 10px;
}

.button-send-answer-mobile::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 3px;
  width: 12px;
  padding: 2.5px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px 5px 0px 0px;
  transform: rotate(-35deg);
}

.button-send-answer-mobile.disable {
  background-color: #9b9b9b;
  border: 1px solid #4a261b;
  color: #fff;
  cursor: not-allowed;
}

.button-send-answer-mobile.disable::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 97%;
  background: #bababa;
  border-radius: 10px;
}

// #endregion

// #region OLD

.box-dialog-lesson {
  max-width: 850px;
  width: 90%;
  background-color: #4e90a6;
  overflow: hidden;
}

.box-lesson-list {
  background-color: #fff0da;
  height: 450px;
  overflow-x: auto;
}

.box-help-practice-pc {
  max-width: 800px;
  min-width: 290px;
  width: 100%;
}

.box-help-practice-mobile {
  max-width: 400px;
  width: 100%;
}

.box-header-help {
  background-color: #9f220c;
  color: #fff;
  border-radius: 7px 7px 0px 0px;
  font-size: 20px;
}

.box-help-left {
  background-color: #fff0da;
  height: 500px;
  overflow: auto;
}

.box-choices {
  background-color: #ffffff;
  box-shadow: 0 1px 1px #000;
}

.btn-selected {
  background-color: #48dbfc;
}

/* width */
.box-help-word::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-help-word::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-word::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-word::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}

/* width */
.box-help-left::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.box-help-left::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-help-left::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-help-left::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.btn-hover {
  transition: 0.3s;
  transform: scale(1);
}

.btn-hover:hover {
  transition: 1s;
  transform: scale(0.95);
}

.box-help-word {
  height: 500px;
  overflow: auto;
}

.btn-selected {
  background-color: #48dbfc;
}

/* width */
.box-help-word::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-help-word::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-word::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-word::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}

.box-dialog-lesson {
  max-width: 850px;
  width: 90%;
  background-color: #4e90a6;
  border-radius: 10px;
  overflow: hidden;
}

.box-dialog-lesson-mobile {
  max-width: 600px;
  width: 90%;
  background-color: #2d3081;
  overflow: hidden;
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
  height: 400px;
  overflow: auto;
}

.box-content-lesson-list {
  width: 250px;
  height: 450px;
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
// #endregion
</style>
