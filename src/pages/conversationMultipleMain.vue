<template>
  <q-page class="backdrop-listening row justify-center items-center">
    <!-- #region Desktop -->
    <div v-if="$q.platform.is.desktop" class="box-container-main relative-position">
      <!-- #region Background -->
      <background-main :background="`background-conversation-multiple`">
      </background-main>
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
        :page="'conversationmultiple'"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="absolute-top box-practice-main" v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-main">
          <div class="sub-question text-center font-mali-m">
            <div class="text-question" v-html="practiceData.question"></div>

            <div
              class="button-active-main button-watch-video"
              :class="practiceData.isSendAnswer ? 'disable' : ''"
              @click="practiceData.isSendAnswer ? null : (isShowDialogVideoLesson = true)"
            >
              <div class="row fit relative-position z-top">
                <div class="self-center icon-video">
                  <q-icon name="fas fa-video"></q-icon>
                </div>
                <div class="self-center font-mali-m">
                  {{ `ดูวิดีโออีกครั้ง` }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Choices -->
        <div class="box-choices-main row justify-between">
          <div
            class="col-1 button-active-main button-choice"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            @click="practiceData.isSendAnswer ? null : funcSelectChoice(item)"
          >
            <q-img
              :src="`/images/button_main/button-choice-sound-height-150${
                practiceData.isSendAnswer
                  ? practiceData.currentChoiceIndex == item.index
                    ? practiceData.isCorrectAnswer
                      ? '-correct'
                      : '-incorrect'
                    : ''
                  : practiceData.currentChoiceIndex == item.index
                  ? '-selected'
                  : ''
              }.png`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Send answer -->
        <div
          class="button-active-main button-send-answer row justify-center items-center"
          :class="practiceData.currentChoiceIndex == null ? 'disable' : ''"
          @click="
            practiceData.isSendAnswer
              ? null
              : practiceData.currentChoiceIndex == null
              ? null
              : funcSendAnswer()
          "
        >
          <div class="self-center font-mali-m relative-position z-top">
            {{ `ส่งคำตอบ` }}
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="!$q.platform.is.desktop" class="box-container-main-mobile absolute-center">
      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-help="isShowDialogHelp = true"
        :page="'conversationmultiple'"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div class="box-practice-main-mobile" v-if="!practiceData.isLoadPractice">
        <!-- #region Question -->
        <div class="box-question-main-mobile">
          <div class="sub-question-main-mobile" align="center">
            <div class="font-mali-m" v-html="practiceData.question"></div>
            <div
              class="button-active-main button-watch-video-mobile"
              @click="isShowDialogVideoLesson = true"
            >
              <div class="row fit justify-center items-center relative-position z-top">
                <div class="self-center icon-video-mobile">
                  <q-icon name="fas fa-video"></q-icon>
                </div>
                <div class="self-center font-mali-m">
                  {{ `ดูวิดีโออีกครั้ง` }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Choices -->
        <div class="box-choices-main-mobile">
          <div
            class="button-active-main button-choice-mobile row justify-center items-center"
            v-for="(item, index) in practiceData.choices"
            :key="index"
            @click="practiceData.isSendAnswer ? null : funcSelectChoice(item)"
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
          >
            <div class="relative-position z-top">
              <q-icon name="fas fa-volume-up"></q-icon>
            </div>
            <!-- <q-img
              :src="`/images/button_main/button-choice-sound${
                practiceData.isSendAnswer
                  ? practiceData.currentChoiceIndex == item.index
                    ? practiceData.isCorrectAnswer
                      ? '-correct'
                      : '-incorrect'
                    : ''
                  : practiceData.currentChoiceIndex == item.index
                  ? '-selected'
                  : ''
              }.png`"
              no-spinner
              no-transition
            ></q-img> -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Finish -->
        <div
          class="button-active-main button-send-answer-mobile row justify-center items-center"
          :class="practiceData.currentChoiceIndex == null ? 'disable' : ''"
          align="center"
          @click="
            practiceData.isSendAnswer
              ? null
              : practiceData.currentChoiceIndex == null
              ? null
              : funcSendAnswer()
          "
        >
          <div class="font-mali-m relative-position f16 z-top">
            {{ `ส่งคำตอบ` }}
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Video Lesson -->
  <q-dialog v-model="isShowDialogVideoLesson" maximized persistent>
    <q-card class="shadow-0" style="background-color: rgba(0, 0, 0, 0.1)">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-main relative-position">
          <div class="sub-dialog-main">
            <div class="box-text-title-video" style="margin-bottom: 16px">
              <div class="sub-text-title-video font-mali-m f24" align="center">
                {{ `${lessonData.name}` }}
              </div>
            </div>
            <!-- @ended="(isShowFinish = true), systemStore.playVideo(false)" -->
            <!-- controlsList="nodownload"
                preload="none" -->
            <!-- @play="systemStore.playVideo(true)"
                @pause="systemStore.playVideo(false)" -->

            <div align="center" style="margin: auto">
              <video
                :poster="lessonData.imageUrl"
                controls
                controlsList="nodownload"
                style="width: 100%"
                :src="lessonData.vdoUrl"
                preload="none"
                @play="systemStore.playVideo(true)"
                @pause="systemStore.playVideo(false)"
              ></video>
            </div>
          </div>

          <div class="button-active-main button-close absolute-top-right">
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
              v-close-popup
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Answer Action -->
  <answer-action
    :systemStore="systemStore"
    :practiceData="practiceData"
    :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore"
    @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-restart="funcRestartPractice()"
  ></answer-action>
  <!-- #endregion -->

  <!-- #region เรียนครบแล้ว -->
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
import animationAction from "../components/conversation/theme-animation.vue";
import answerAction from "../components/answer-action.vue";

import finishPractice from "components/finishPracticeDialog.vue";
import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";

import { ref, reactive, onMounted, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import { useQuasar } from "quasar";
import axios from "axios";

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

  finishPractice,
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
const practiceStore = usePracticeStore();
const synchronizeStore = useSynchronizeStore();

// Initial Data
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Dialog
const isShowLearningDone = ref(false);
const isShowLoading = ref(false);
const isShowDialogVideoLesson = ref(false);
const isShowDialogPracticeComplete = ref(false);

// Practice Data
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
  question: "",
  correct: 0,
  incorrect: 0,
  score: 0,
  choices: [],
  correctAnswer: 0,
  extraSound: [],
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
      practiceData.correct = 0;
      practiceData.currentQuestion = 0;
      practiceData.isFinishPractice = false;
      practiceData.currentChoiceIndex = null;
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
const lessonData = ref(null);
const isLoadPractice = ref(false);
const isFinishPractice = ref(false);
const lessonList = ref([]);
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
      // let getLesson = await lessonHooks
      //   .lesson()
      //   .phonics(getData.level, getData.unit);
      // lessonList.value = getLesson;
      // lessonData.value = lessonList.value[0].vdoLink;
    } catch (error) {
      // console.log(`${error} : Get Hooks Grammar lesson`);
    }

    let findConversationLesson = practiceStore.listBySkill.find((x) => {
      return x.practiceType == "conversationlesson";
    });

    // Get Api
    const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

    const POSTDATALESSON = {
      practiceListId: findConversationLesson.id,
      requestURL: window.location.hash,
    };

    const responseLesson = await axios.post(apiURL, POSTDATALESSON);

    console.log(responseLesson);

    if (responseLesson.status == 200) {
      let getName = practiceStore.listName.Listening.find((x) => {
        return x.level == practiceStore.level && x.unit == practiceStore.unit;
      });

      lessonData.value = {
        name: getName.nameEng,
        ...responseLesson.data[0],
      };
    }

    const postData = {
      practiceListId: practiceListId,
      requestURL: window.location.hash,
    };

    const response = await axios.post(apiURL, postData, {
      cancelToken: new CancelToken(function executor(c) {
        tokenAPI = c;
      }),
    });

    if (tokenAPI != undefined) tokenAPI();

    // เก็บข้อมูลที่ได้จาก axios
    tempPractice = response.data;

    // copy แบบฝึกหัด
    let setPracticeList = [...tempPractice];

    // เก็บข้อมูลคำศัพท์เสริม
    // practiceData.extraSound = extraSound;

    // สุ่มคำตอบของแต่ละข้อ
    setPracticeList = setPracticeList.map((x, index) => {
      let choices = x.choices.sort(() => Math.random() - 0.5);

      choices = choices.map((xx) => {
        if (xx.soundUrl) {
          let newSound = new Audio(xx.soundUrl);
          xx.soundUrl = newSound;
        }

        return xx;
      });

      x.choices = choices;
      return x;
    });

    // เรียงแบบฝึกหัด
    setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

    // สุ่มแบบฝึกหัด
    // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

    // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
    setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

    // practiceData.answers = setPracticeList.map((x) => {
    //   return { isCorrect: false };
    // });

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

// #region Select Question
const funcSelectedQuestion = (firsttime) => {
  firsttime = firsttime || false;

  if (!firsttime) {
    practiceData.currentQuestion++;
  }

  // Practice Data : Show Question
  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  // Practice Data : Show Choice
  practiceData.choices = questionList.value[practiceData.currentQuestion].choices;

  // Practice Data : Correct Answer
  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  practiceData.currentChoiceIndex = null;
  practiceData.isSendAnswer = false;
};
// #endregion

// #region Select Choice
const funcSelectChoice = (item) => {
  if (practiceData.isSendAnswer) {
    return;
  }

  funcPlaySound(item.soundUrl);

  practiceData.currentChoiceIndex = item.index;
};
// #endregion

// #region Play sound
const selectAudioSound = ref(null);
const funcPlaySound = (url) => {
  systemStore.playSound(url);
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

  let currentChoice = practiceData.choices.filter(
    (x) => x.index == practiceData.currentChoiceIndex
  )[0].choice;

  let currentAnswer = practiceData.choices.filter(
    (x) => x.index == practiceData.correctAnswer
  )[0].choice;

  if (practiceData.currentChoiceIndex == Number(practiceData.correctAnswer)) {
    practiceData.isCorrectAnswer = true;
    practiceData.answers[practiceData.currentQuestion] = {
      isCorrect: true,
    };
    practiceData.totalCorrectQuestion++;
    // practiceData.correct++;
  } else {
    practiceData.isCorrectAnswer = false;
    practiceData.answers[practiceData.currentQuestion] = {
      isCorrect: false,
    };
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
    answerIndex: null,
    question: practiceData.question,
  };

  answerStructure.push(structure);

  if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
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
  practiceData.correct = 0;
  practiceData.currentQuestion = 0;
  practiceData.isFinishPractice = false;
  practiceData.currentChoiceIndex = null;
  answerStructure = [];

  if (isLoadPractice.value) {
    await funcLoadPractice();
  }
};
// #endregion

// #endregion

let authListen;
const isSync = ref(false);
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("conversationmultiple");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/conversationmultiple");
      }

      // User is signed in.
      let practiceId = route.params.practiceListId;
      isSync.value = $q.sessionStorage.getItem("isSync");

      // User is signed in.
      let permission = await funcPracticePermissionLog(practiceId);
      if (!isSync.value) {
        if (!permission) {
          isShowLearningDone.value = true;
          isShowLoading.value = true;
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

  questionList.value.forEach((res) => {
    res.choices.forEach((x) => {
      x.soundUrl = null;
    });
  });
});
</script>

<style lang="scss" scoped>
video::-webkit-media-controls {
  // display: none;
}

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
  background-image: url("/images/background_main/background-conversation-multiple.png");
  background-size: cover;
  background-position: 54% 80%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-listening {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-aniamtion-action {
  width: 100%;
  top: -6%;
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

.box-question-main {
  width: 55.9375%;
  background-color: #f2c043;
  border: 0.17rem solid #4a261b;
  border-radius: 0.5rem;
  padding: 0.35%;
  margin: auto;
}

.box-question-main .sub-question {
  border-radius: 0.3rem;
  background: #f6f3d3;
  padding: 2% 3%;
  color: #4a261b;
  font-size: clamp(12px, 1vw, 16px);
}

.box-question-main-mobile {
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #f2c043;
  padding: 8px;
}

.sub-question-main-mobile {
  border-radius: 8px;
  background: #f6f3d3;
  padding: 16px 8px;
  color: #4a261b;
  font-size: 16px;
}

.box-choices-main {
  width: 55.939%;
  margin: 1.7% auto;
}

.box-choices-main-mobile {
  margin: 12px auto;
}

.box-dialog-main {
  width: 990px;
  background-color: #f2c043;
  border: 2px solid #4a261b;
  border-radius: 16px;
  padding: 8px;
}

.sub-dialog-main {
  border-radius: 8px;
  background: #f6f3d3;
  padding: 16px;
}

.box-text-title-video {
  width: fit-content;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #ba6f40;
  padding: 8px;
  margin: auto;
}

.sub-text-title-video {
  border-radius: 8px;
  background: #804a28;
  padding: 16px 32px;
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

// #endregion

// #region Text
.text-question {
  padding: 1% 0%;
  color: #4a261b;
}
// #endregion

// #region Button

.button-active-main {
  cursor: pointer;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.1s;
  -webkit-transition: -webkit-transform 0.1s;
  -moz-transition: -moz-transform 0.1s;
}

.button-active-main.disable {
  cursor: not-allowed;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: transform 0.1s;
  -webkit-transition: -webkit-transform 0.1s;
  -moz-transition: -moz-transform 0.1s;
}

.button-choice {
  width: 29.05027%;
}

.button-choice-mobile {
  width: 320px;
  min-width: 320px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  margin: 16px auto;
  color: #4a261b;
  line-height: 0;
  font-size: 35px;
}

.button-choice-mobile::before {
  content: "";
  position: absolute;
  top: 7px;
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

.button-choice-mobile:not(.correct, .incorrect, .selected)::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-choice-mobile.correct {
  color: #58cc02;
  border: 1px solid #58cc02;
  background: #8ec960;
}

.button-choice-mobile.correct::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: #d7ffb8;
}

.button-choice-mobile.incorrect {
  color: #ff4b4b;
  border: 1px solid #ff4b4b;
  background: #e3a9aa;
}

.button-choice-mobile.incorrect::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;

  background: #ffdfe0;
}

.button-choice-mobile.selected {
  border: 1px solid #4a261b;
  background: #2daac7;
}

.button-choice-mobile.selected::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: #48dbfc;
}

.button-watch-video {
  position: relative;
  width: 24.183%;
  border-radius: 0.6rem;
  border: 0.1rem solid #4a261b;
  background: #69199c;
  color: #ffffff;
  padding: 0.848% 1%;
  margin: 0.5% auto;
  font-size: clamp(10px, 1vw, 16px);
  line-height: 0;
}

.button-watch-video .icon-video {
  width: 35%;
  font-size: clamp(16px, 1.5vw, 22px);
}

.button-watch-video::before {
  content: "";
  position: absolute;
  top: 13%;
  left: 1.5%;
  width: 6%;
  max-width: 14.47px;
  height: 15%;
  max-height: 5.57px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 2rem 2rem 0rem 0rem;
  z-index: 1;
}

.button-watch-video::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 0.6rem;
  background: linear-gradient(180deg, #ba46f3 0%, #a532ea 100%);
}

.button-watch-video-mobile {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #69199c;
  margin-top: 10px;
  line-height: 0;
  font-size: 16px;
  color: #fff;
}

.button-watch-video-mobile .icon-video-mobile {
  font-size: 20px;
  padding: 0px 16px;
}

.button-watch-video-mobile::before {
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
  border-radius: 15px 15px 5px 5px;
  z-index: 1;
}

.button-watch-video-mobile::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ba46f3 0%, #a532ea 100%);
}

.button-send-answer {
  width: 12.5%;
  border-radius: 0.7rem;
  border: 0.1rem solid #4a261b;
  background: #db8200;
  margin: 1% auto;
  padding: 1.188%;
  color: #4a261b;
  line-height: 0;
  font-size: clamp(12px, 1vw, 16px);
}

.button-send-answer.disable {
  background: #9b9b9b;
  color: #ffffff;
}

.button-send-answer::before {
  content: "";
  position: absolute;
  top: 13%;
  left: 1.5%;
  width: 6%;
  max-width: 14.47px;
  height: 15%;
  max-height: 5.57px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 2rem 2rem 0rem 0rem;
  z-index: 1;
}

.button-send-answer.disable::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: #bababa;
}

.button-send-answer:not(.disable)::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-send-answer-mobile {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  margin: 30px auto;
  color: #4a261b;
}

.button-send-answer-mobile.disable {
  background: #9b9b9b;
  color: #ffffff;
}

.button-send-answer-mobile.disable::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: #bababa;
}

.button-send-answer-mobile:not(.disable)::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 94%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-send-answer-mobile::before {
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
  border-radius: 15px 15px 5px 5px;
  z-index: 1;
}

.button-close {
  width: 50px;
  top: -20px;
  right: -20px;
}
// #endregion

.bg-conversation {
  background-image: url("/images/conversation/background-conversation-multiple-2.png");
  background-size: cover;
  background-position: center bottom;
  width: 100%;
}

// .box-container-main {
//   max-width: 1600px;
//   width: 100%;
//   height: calc(100vh - 50px);
//   margin: auto;
// }

.box-help-practice-pc {
  overflow: hidden;
  max-width: 600px;
  min-width: 290px;
  width: 100%;
  border-radius: 0px 0px 7px 7px;
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
</style>
