<template>
  <q-page class="backdrop-language-multiple row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- #region Background -->
      <background-main :background="`background-languagetips-multiple`"></background-main>
      <!-- #endregion -->

      <!-- #region Animation action -->
      <div class="absolute-top box-aniamtion-action">
        <animation-action :practiceData="practiceData"></animation-action>
      </div>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-help="isShowDialogHelp = true"
        :page="`languagetipmultiple`"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="box-practice-main absolute-top" v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question">
          <div class="sub-question">
            <div v-html="practiceData.question"></div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Choices -->
        <div class="box-choices row justify-between">
          <div
            class="col-6 button-active-main button-choice"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            :class="
              practiceData.isSendAnswer
                ? practiceData.currentChoiceIndex == item.index
                  ? practiceData.isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : 'disable'
                : ''
            "
            @click="practiceData.isSendAnswer ? null : funcSendAnswer(item)"
          >
            <div class="relative-position z-top font-mali-m" v-html="item.choice"></div>
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
        @callback-help="isShowDialogHelp = true"
        :page="`languagetipmultiple`"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="box-practice-main-mobile" v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-mobile">
          <div class="sub-question-mobile">
            <div class="font-mali-m" v-html="practiceData.question"></div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Choices -->
        <div class="box-choices-mobile">
          <div
            class="button-active-main button-choice-mobile row items-center"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            :class="
              practiceData.isSendAnswer
                ? practiceData.currentChoiceIndex == item.index
                  ? practiceData.isCorrectAnswer
                    ? 'correct'
                    : 'incorrect'
                  : 'disable'
                : ''
            "
            @click="practiceData.isSendAnswer ? null : funcSendAnswer(item)"
          >
            <div class="relative-position z-top font-mali-m" v-html="item.choice"></div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Help Grammar Video : PC -->
  <q-dialog maximized v-model="isShowDialogHelp" persistent v-if="$q.platform.is.desktop">
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
              <div class="q-pa-sm" v-for="(item, index) in lessonList">
                <q-btn
                  @click="selectedLesson = item.id"
                  class="fit"
                  align="left"
                  :class="selectedLesson == item.id ? 'btn-selected' : 'bg-white'"
                  no-caps
                >
                  <span class="f14">{{ item.name }}</span></q-btn
                >
              </div>
            </div>
            <div class="col q-pa-md" style="max-height: 300px; min-height: fit-content">
              <div v-if="lessonList.filter((x) => x.id == selectedLesson)[0].vdoUrl">
                <q-video
                  :ratio="16 / 9"
                  :src="lessonList.filter((x) => x.id == selectedLesson)[0].vdoUrl"
                ></q-video>
              </div>

              <div v-else>
                <q-img
                  class="relative-position"
                  fit="contain"
                  style="width: 100%"
                  :src="lessonList.filter((x) => x.id == selectedLesson)[0].imageUrl"
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
  <q-dialog maximized v-model="isShowDialogHelp" persistent v-if="$q.platform.is.mobile">
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
                      :options="lessonList"
                      emit-value
                      map-options
                    />
                  </div>
                  <div
                    class="box-content-lesson-mobile relative-position q-mt-md"
                    align="center"
                  >
                    <div
                      v-if="lessonList.filter((x) => x.id == selectedLesson)[0].vdoUrl"
                    >
                      <q-video
                        :ratio="16 / 9"
                        :src="lessonList.filter((x) => x.id == selectedLesson)[0].vdoUrl"
                      ></q-video>
                    </div>

                    <div v-else>
                      <q-img
                        fit="contain"
                        width="100%"
                        :src="
                          lessonList.filter((x) => x.id == selectedLesson)[0].imageUrl
                        "
                      ></q-img>
                    </div>
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

  <!-- #region Dialog Answer action -->
  <answer-action
    :systemStore="systemStore"
    :practiceData="practiceData"
    :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore"
    @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-restart="funcRestartPractice()"
  ></answer-action>
  <!-- #endregion -->

  <!-- #region Dialog เรียนครบ -->
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
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import animationAction from "../components/languagetip/theme-animation.vue";
import answerAction from "../components/answer-action.vue";

import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";

import { ref, onMounted, reactive, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  analyticsLogEvent,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import axios from "axios";
import { useQuasar } from "quasar";
import lessonHooks from "src/hooks/lessonHooks";

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

// Store
const systemStore = useSystemStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();
const practiceStore = usePracticeStore();

// Initial Data
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const isShowLearningDone = ref(false);
const tabHelp = ref("content");
const isShowLoading = ref(false);

const isShowDialogHelp = ref(false);
const isShowDialogPracticeComplete = ref(false);

const questionList = ref([]);
const practiceData = reactive({
  answers: [],

  instruction: {
    eng: "",
    th: "",
  },
  star: 0,
  totalQuestion: 0,
  currentQuestion: 0,
  correctAnswer: 0,
  correct: 0,
  incorrect: 0,
  choices: [],
  question: "",
  description: "",
  refs: [],
  isSynchronize: false,
  skill: "Listening & Speaking",
  isEnableSoundEffect: false,
  numOfPractice: 0,
  level: 0,
  unit: 0,
  coin: 0,
  counter: 0,
  totalCorrectQuestion: 0,

  isSendAnswer: false,
  isFinishPractice: false,
  isCorrectAnswer: false,
  currentChoiceIndex: null,
  currentChoice: "",
  currentAnswer: "",
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
      practiceData.isFinishPractice = false;
      practiceData.isSendAnswer = false;
      practiceData.correct = 0;
      practiceData.incorrect = 0;
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

const isLoadPractice = ref(false);
const lessonList = ref([]);
const selectedLesson = ref("");

const funcLoadPractice = async () => {
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    if (synchronizeStore.isSync) {
      saveCourseSyncData(0, route.params.practiceListId, [], 0);
    }

    let tempPractice = [];

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
          doc;
        });

        lessonList.value = getLesson;

        selectedLesson.value = lessonList.value[0].value;
      }
    } catch (error) {
      // console.log(`${error} : Get Hooks Language tip lesson`);
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

    // // เก็บข้อมูลที่ได้จาก axios
    tempPractice = response.data;

    // // copy แบบฝึกหัด
    let setPracticeList = [...tempPractice];

    // // เก็บข้อมูลคำศัพท์เสริม
    // practiceData.extraSound = extraSound;

    // // สุ่มคำตอบของแต่ละข้อ
    setPracticeList = setPracticeList.map((x, index) => {
      let choices = x.choices.sort(() => Math.random() - 0.5);
      x.choices = choices;
      return x;
    });

    // เรียงแบบฝึกหัด
    setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

    //  สุ่มแบบฝึกหัด
    // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

    // // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
    setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

    practiceData.answers = setPracticeList.map((x) => {
      return { isCorrect: false };
    });

    // // เก็บข้อมูลแบบฝึกหัดทั้งหมด
    questionList.value = setPracticeList;

    // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
    await funcSelectedQuestion(true);

    isLoadPractice.value = true;
    isShowLoading.value = false;
    practiceData.isLoadPractice = false;
  } catch (error) {
    // console.log(`${error} : Function Load Practice`);
    isShowLoading.value = false;
  }
};

const funcSelectedQuestion = (firsttime) => {
  firsttime = firsttime || false;

  if (!firsttime) {
    practiceData.currentQuestion++;
  }

  //
  practiceData.question = questionList.value[practiceData.currentQuestion].question;
  practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  practiceData.description = questionList.value[practiceData.currentQuestion].description;

  practiceData.isSendAnswer = false;
};

//
let answerStructure = [];
const funcSendAnswer = async (item) => {
  practiceData.isSendAnswer = true;

  const practiceStore = usePracticeStore();

  practiceStore.saveProgressLog(
    questionList.value[practiceData.currentQuestion].id,
    route.params.practiceListId
  );

  let currentChoice = item.choice;
  let currentAnswer = practiceData.choices.find(
    (x) => x.index == practiceData.correctAnswer
  );

  if (practiceData.correctAnswer == item.index) {
    practiceData.isCorrectAnswer = true;
    practiceData.answers[practiceData.currentQuestion].isCorrect = true;
    practiceData.totalCorrectQuestion++;
    // practiceData.correct++;
  } else {
    practiceData.isCorrectAnswer = false;
    practiceData.answers[practiceData.currentQuestion].isCorrect = false;
  }

  if (currentAnswer) {
    practiceData.currentAnswer = currentAnswer.choice;
  }

  practiceData.currentChoice = currentChoice;
  practiceData.currentChoiceIndex = item.index;

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
    isShowLoading.value = true;
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

    // practiceData.isFinishPractice = true;
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

const funcToggleEffect = (val) => {
  practiceData.isEnableSoundEffect = val.val;
};

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
  practiceData.isFinishPractice = false;
  practiceData.isSendAnswer = false;
  practiceData.correct = 0;
  practiceData.incorrect = 0;
  answerStructure = [];

  if (isLoadPractice.value) {
    await funcLoadPractice();
  }
};

let authListen;
const isSync = ref(false);

onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("languagetipmultiple");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/languagetipmultiple");
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

        practiceData.counter = practiceStore.currentPracticeData.counter;

        if (practiceStore.practiceCurrentCounter == 2) {
          isShowDialogPracticeComplete.value = true;
          isShowLoading.value = false;
          return;
        }
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
  background-image: url("/images/background_main/background-languagetips-multiple.png");
  background-size: cover;
  background-position: 100% 100%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-language-multiple {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-aniamtion-action {
  width: 100%;
  top: 0%;
}

.box-practice-main {
  top: 46%;
}

.box-practice-main-mobile {
  max-width: 600px;
  width: 100%;
  min-width: 360px;
  margin: 10px auto;
}

.box-question {
  width: 55.9375%;
  border: 0.17rem solid #4a261b;
  background-color: #f2c043;
  border-radius: 0.5rem;
  padding: 0.2%;
  margin: auto;
  color: #4a261b;
}

.sub-question {
  width: 100%;
  background-color: #f6f3d3;
  border-radius: 0.4rem;
  padding: 2% 3%;
  font-size: clamp(14px, 1.25vw, 20px);
}

.box-question-mobile {
  width: 100%;
  border: 2px solid #4a261b;
  background-color: #f2c043;
  border-radius: 12px;
  padding: 5px;
  color: #4a261b;
  margin: 0px auto 25px auto;
}

.sub-question-mobile {
  width: 100%;
  background-color: #f6f3d3;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
}

.box-choices {
  width: 55.9375%;
  margin: 1% auto;
}

.box-choices-mobile {
  max-width: 500px;
  width: 100%;
  margin: 10px auto;
}
// #endregion

// #region Button
.button-active-main {
  position: relative;
  background-color: #db8200;
  border-radius: 0.5rem;
  border: 0.1rem solid #4a261b;
  padding: 2%;
  margin: 1.5% 0%;
  cursor: pointer;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;
}

.button-active-main.disable {
  cursor: default;
}

.button-active-main:not(.disable, .correct, .incorrect):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;
}

.button-active-main:not(.correct, .incorrect)::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 94%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.4rem 0.4rem 0.5rem 0.5rem;
}

.button-active-main:not(.mobile)::after {
  content: "";
  position: absolute;
  top: 11%;
  left: 0.5%;
  width: 3.5%;
  padding: 0.65%;
  background-color: #fff;
  border-radius: 0.4rem 0.4rem 0px 0px;
  opacity: 0.5;
  transform: rotate(-35deg);
}

// Correct
.button-active-main.correct {
  background-color: #8ec960;
  border: 0.1rem solid #58cc02;
  color: #58cc02;
  cursor: default;
}

.button-active-main.correct::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 94%;
  background: #d7ffb8;
  border-radius: 0.4rem 0.4rem 0.5rem 0.5rem;
}

// Incorrect
.button-active-main.incorrect {
  background-color: #e3a9aa;
  border: 0.1rem solid #ff4b4b;
  color: #ff4b4b;
  cursor: default;
}

.button-active-main.incorrect::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 94%;
  background: #ffdfe0;
  border-radius: 0.4rem 0.4rem 0.5rem 0.5rem;
}

.button-active-main.button-choice {
  width: 48%;
  padding: 2% 3%;
  font-size: clamp(12px, 1vw, 16px);
  color: #4a261b;
}

.button-active-main.button-choice-mobile {
  width: 90%;
  height: 60px;
  padding: 10px 15px;
  font-size: 16px;
  margin: 10px auto;
  color: #4a261b;
}
// #endregion

// #region OLd
.bg-language {
  background-image: url("/images/languagetip/background-languagetips-multiple-2.png");
  background-size: cover;
  background-color: #0075b7;
  background-repeat: no-repeat;
  background-position: right bottom;
  width: 100%;
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
  border-radius: 15px;
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
  max-height: 300px;
  min-height: fit-content;
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
