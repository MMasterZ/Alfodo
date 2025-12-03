<template>
  <q-page class="backdrop-grammar-multiple row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="'background-grammar-action'"></background-main>

      <!-- #region Mini game Action -->
      <div class="absolute-top box-aniamtion-action">
        <animation-action
          :isSendAnswer="practiceData.isSendAnswer"
          :isCorrectAnswer="practiceData.isCorrectAnswer"
        ></animation-action>
      </div>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar :practiceData="practiceData" :page="'grammarmultiple'"></header-bar>
      <!-- #endregion -->

      <!-- #region Conntent -->
      <div class="absolute-top box-content-practice" v-if="!practiceData.isLoadPractice">
        <div class="absolute-top full-width" style="top: 8%" align="center">
          <!-- #region Question -->
          <div class="box-question">
            <div class="sub row justify-center items-center" align="left">
              <div class="self-center">
                <span v-html="practiceData.question" v-if="practiceData.question"> </span>
                <span v-html="practiceData.instruction.eng" v-else> </span>
              </div>
              <q-space></q-space>
              <div
                class="col-1 self-center"
                align="right"
                style="width: fit-content; padding: 1%"
                v-if="practiceData.isImage"
              >
                <q-btn
                  push
                  class="bg-brown text-white"
                  label="ดูภาพโจทย์"
                  @click="isShowDialogImage = true"
                >
                </q-btn>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Box Button Choice -->
          <div style="margin-top: 1%" class="box-button-choices" align="center">
            <div class="row">
              <div
                class="col-6 relative-position"
                :align="index % 2 === 0 ? 'left' : 'right'"
                v-for="(item, index) in practiceData.choices"
              >
                <div
                  class="button-active-main button-answer"
                  :class="
                    practiceData.isSendAnswer
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
                  "
                  align="left"
                  @mouseenter="
                    practiceData.isSendAnswer
                      ? null
                      : (practiceData.currentChoiceIndex = item.index)
                  "
                  @mouseleave="
                    practiceData.isSendAnswer
                      ? null
                      : (practiceData.currentChoiceIndex = null)
                  "
                  @click="practiceData.isSendAnswer ? null : funcSendAnswer()"
                >
                  <div class="sub row font-mali-m">
                    <div class="col self-center">
                      <div v-html="item.choice"></div>
                    </div>
                  </div>
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
      <header-bar :practiceData="practiceData" :page="'grammarmultiple'"></header-bar>
      <!-- #endregion -->

      <div v-if="isLoadPractice">
        <!-- #region Question -->
        <div
          class="relative-position animate__animated animate__fadeIn animation-duration-1s"
        >
          <div class="box-question mobile">
            <div class="sub row justify-center items-center" align="left">
              <div class="self-center">
                <span v-html="practiceData.question" v-if="practiceData.question"> </span>
                <span v-html="practiceData.instruction.eng" v-else> </span>
              </div>
              <q-space></q-space>
              <div
                class="col-1 self-center"
                align="right"
                style="width: fit-content; padding: 1%"
                v-if="practiceData.isImage"
              >
                <q-btn
                  push
                  class="bg-brown text-white"
                  label="ดูภาพโจทย์"
                  @click="isShowDialogImage = true"
                >
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Button Choice -->
        <div class="relative-position">
          <div class="box-button-choices mobile" align="center">
            <div
              class="relative-position animate__animated animate__fadeInLeft animation-duration-0-5s"
              align="center"
              v-for="(item, index) in practiceData.choices"
              :style="`animation-delay: ${index * 0.1}s`"
            >
              <div
                class="button-active-main button-answer mobile"
                :class="
                  practiceData.isSendAnswer
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
                "
                align="left"
                @mouseenter="
                  practiceData.isSendAnswer
                    ? null
                    : (practiceData.currentChoiceIndex = item.index)
                "
                @mouseleave="
                  practiceData.isSendAnswer
                    ? null
                    : (practiceData.currentChoiceIndex = null)
                "
                @click="practiceData.isSendAnswer ? null : funcSendAnswer()"
              >
                <div class="sub mobile row font-mali-m">
                  <div class="col self-center">
                    <div v-html="item.choice"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Image -->
  <q-dialog v-model="isShowDialogImage" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-image-container relative-position">
          <div class="sub-dialog-image">
            <div align="center" class="f20 font-mali-b">ภาพโจทย์</div>
            <div class="content-dialog-image" align="center">
              <q-img
                style="max-width: 220px; height: 220px"
                :src="practiceData.imageUrl"
                no-spinner
                no-transition
                fit="contain"
              ></q-img>
            </div>
          </div>
          <div class="absolute-top-right box-button-close-dialog-image" v-close-popup>
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Answer Action -->
  <answer-action
    :practiceData="practiceData"
    @callback-nextquestion="funcSelectedQuestion(false)"
    @callback-restart="funcRestartPractice()"
  ></answer-action>
  <!-- #endregion -->

  <!-- #region Learning done -->
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

  <!-- #region loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
// New
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import animationAction from "../components/grammar/themeAnimation.vue";
import answerAction from "../components/answer-action.vue";

import { ref, onMounted, reactive, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import loading from "../components/dialog-loading.vue";

import {
  analyticsLogEvent,
  auth,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";

import axios from "axios";
import lessonHooks from "../hooks/lessonHooks.js";

import learningDone from "../components/dialog-learning-done.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";

// Component
const components = defineComponent({
  backgroundMain,
  headerBar,
  animationAction,

  answerAction,
  learningDone,

  loading,
});

const CancelToken = axios.CancelToken;
let tokenAPI;

// Initial Quasar
const $q = useQuasar();

// Store
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const synchronizeStore = useSynchronizeStore();

// Initial Data Route
const route = useRoute();
const router = useRouter();
const isShowLearningDone = ref(false);
const isShowLoading = ref(false);
const isShowDialogImage = ref(false);
const isShowDialogPracticeComplete = ref(false);

// Initial Practice Data
const questionList = ref([]);
const practiceData = reactive({
  answers: [],
  // Initial Data
  currentQuestion: 0,
  totalQuestion: 0,
  star: 0,
  correct: 0,
  incorrect: 0,
  extraVocab: [],
  skill: "Grammar",
  score: 0,
  isEnableSoundEffect: false,
  numOfPractice: 0,
  isImage: false,
  imageUrl: "",
  level: 0,
  unit: 0,
  coin: 0,
  counter: 0,
  instruction: {
    th: "เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมลงในช่องว่าง",
    eng: "Choose the best answer to fill in the blank.",
  },
  totalCorrectQuestion: 0,

  // use current question
  question: "",
  choices: [],
  correctAnswer: 0,
  description: "",
  refs: [],

  // use current answer
  isSendAnswer: false,
  isCorrectAnswer: false,
  isFinishPractice: false,
  currentChoiceIndex: null,
  currentChoice: "",
  currentAnswer: "",
  isRestart: false,
  isSynchronize: false,
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
      practiceData.currentQuestion = 0;
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.currentChoiceIndex = null;
      practiceData.isSendAnswer = false;
      practiceData.isFinishPractice = false;
      practiceData.isCorrectAnswer = false;
      answerStructure = [];
      practiceData.coin = 0;
      practiceData.counter = 0;
      practiceData.isLoadPractice = true;
      practiceData.isDirection = false;
      practiceData.totalCorrectQuestion = 0;
      practiceData.isFirstTimeReward = false;

      if (isLoadPractice.value) {
        await funcLoadPractice();
      }
    },
  },
});

const lessonList = ref([]);
const showLessonVideo = ref([]);
const refContent = ref([]);
const isLoadPractice = ref(false);

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

    // Set Practice ID
    let practiceListId = route.params.practiceListId;

    // Get Practice List
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    // Practice Data : Show Total Question
    practiceData.totalQuestion = getData.numOfPractice;
    // practiceData.instruction.eng = getData.instructionEng;
    // practiceData.instruction.th = getData.instructionTh;
    practiceData.level = getData.level;
    practiceData.unit = getData.unit;

    try {
      let getLesson = await lessonHooks
        .lesson()
        .lessonAll(getData.level, getData.unit, getData.skill);

      getLesson.forEach((res, index) => {
        res.value = index;
        res.label = res.name;
      });

      lessonList.value = getLesson;
    } catch (error) {
      // console.log(`${error} : Get Hooks Grammar lesson`);
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
    let setQuestion = response.data;

    setQuestion = [...setQuestion];

    setQuestion.sort((a, b) => a.order - b.order);

    setQuestion = setQuestion.slice(0, practiceData.totalQuestion);

    practiceData.answers = setQuestion.map((x) => {
      return { isCorrect: false };
    });

    questionList.value = setQuestion;

    // Function : เลือกแบบฝึกหัด แล้วส่งค่า true ไปบอกว่านี้คือการโหลดครั้งแรก
    await funcSelectedQuestion(true);

    if (synchronizeStore.isSync) {
      saveCourseSyncData(
        practiceData.currentQuestion,
        route.params.practiceListId,
        [],
        practiceData.score
      );
    }

    isLoadPractice.value = true;
    practiceData.isLoadPractice = false;
    setTimeout(() => {
      isShowLoading.value = false;
    }, 500);
  } catch (error) {
    // Keep Error Log
    // console.log(`${error} : Function Load Practice`);
    setTimeout(() => {
      isShowLoading.value = false;
    }, 500);
  }
};
// #endregion

// #region Selected Question
const funcSelectedQuestion = (firstTime) => {
  // Check : เช็คข้อมูลถ้าไม่ใช่ครั้งแรกที่โหลดข้อมูลนี้ จะเป็น false
  firstTime = firstTime || false;

  // First check : ถ้าเช็คโหลดครั้งแรกแล้วไม่เป็นความจริง จะทำการ เพิ่มค่าในการเลือกแบบฝึกหัดต่อไป
  if (!firstTime) {
    // เพิ่มค่าเลือกแบบฝึกหัดต่อไป หรือ เลือกข้อต่อไปนั้นเอง
    practiceData.currentQuestion++;
  }

  let helpExtra = [...questionList.value];
  let tempExtra = [];

  helpExtra.forEach((res) => {
    tempExtra.push(...res.extraVocab);
  });

  // Practice Data : Show Ref
  practiceData.refs = questionList.value[practiceData.currentQuestion].refs.map(
    (x) => x.name
  );

  // Practice Data : Show Extra Vocab
  practiceData.extraVocab = tempExtra;

  practiceData.isImage =
    questionList.value[practiceData.currentQuestion].isImage || false;
  practiceData.imageUrl = questionList.value[practiceData.currentQuestion].imageUrl || "";

  // Practice Data : Show Question
  practiceData.question = questionList.value[practiceData.currentQuestion].question;

  // Practice Data : Show Choices
  practiceData.choices = questionList.value[practiceData.currentQuestion].choices;
  practiceData.choices.sort((a, b) => a.index - b.index);

  // Practice Data : Choice Number Correct Answer
  practiceData.correctAnswer =
    questionList.value[practiceData.currentQuestion].correctAnswer;

  // Practice Data : Show Description
  practiceData.description =
    questionList.value[practiceData.currentQuestion].description ||
    "ยังไม่ได้ใส่คำอธิบาย";

  // Grammar Lesson Video
  refContent.value = [];
  showLessonVideo.value = lessonList.value;

  practiceData.isSendAnswer = false;
  practiceData.currentChoiceIndex = null;
};
// #endregion

// #region Send Answer
let answerStructure = [];
const funcSendAnswer = async () => {
  if (!practiceData.isSendAnswer) {
    practiceData.isSendAnswer = true;

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

    if (Number(practiceData.correctAnswer) == practiceData.currentChoiceIndex) {
      practiceData.isCorrectAnswer = true;
      practiceData.answers[practiceData.currentQuestion].isCorrect = true;
      practiceData.totalCorrectQuestion++;
      // practiceData.correct++;
    } else {
      practiceData.isCorrectAnswer = false;
      practiceData.answers[practiceData.currentQuestion].isCorrect = false;
      // practiceData.incorrect++;
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

    let structure = {
      no: practiceData.currentQuestion,
      isCorrect: practiceData.isCorrectAnswer,
      answer: practiceData.currentChoice,
      answerIndex: practiceData.currentChoiceIndex,
      question: practiceData.question,
    };

    answerStructure.push(structure);

    $q.loading.show();

    if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
      isShowLoading.value = true;

      practiceData.isRestart = false;
      practiceData.coin = practiceData.correct;

      if (!synchronizeStore.syncData.isSync) {
        practiceData.counter = await funcFinishPractice(
          practiceData,
          route.params.practiceListId,
          $q.platform.is
        );
      } else {
        await funcFinishPractice(
          practiceData,
          route.params.practiceListId,
          $q.platform.is
        );
      }

      // practiceData.isFinishPractice = true;
    }

    if (synchronizeStore.syncData.isSync) {
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
  }
};
// #endregion

// #region Toggle Effect
const funcToggleEffect = (val) => {
  practiceData.isEnableSoundEffect = val.val;
};
// #endregion

// #region Restart Practice
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
  practiceData.currentQuestion = 0;
  practiceData.correct = 0;
  practiceData.incorrect = 0;
  practiceData.currentChoiceIndex = null;
  practiceData.isSendAnswer = false;
  practiceData.isFinishPractice = false;
  practiceData.isCorrectAnswer = false;
  answerStructure = [];
  practiceData.isLoadPractice = true;

  if (isLoadPractice.value) {
    await funcLoadPractice();
  }
};
// #endregion

// #endregion

// Mounted Function First time
let authListen;
let practiceId;
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("grammarmultiple");

  authListen = auth.onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/grammarmultiple");
      }

      // User is signed in.
      practiceId = route.params.practiceListId;

      // User is signed in.
      let permission = await funcPracticePermissionLog(practiceId);

      if (!synchronizeStore.syncData.isSync) {
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
          await funcFinishPractice(
            practiceData,
            route.params.practiceListId,
            $q.platform.is
          );
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
// #region Box Container
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

.backdrop-grammar-multiple {
  background-image: url("/images/background_main/backdrop-grammar.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-aniamtion-action {
  top: -7%;
  width: 100%;
  height: 42%;
}

.box-content-practice {
  top: 42.3%;
  width: 100%;
  height: 57.7%;
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
.bg-grammarmultiple {
  background-image: url("/images/grammar/bg-grammarmultiple-content.png");
  background-position: center;
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
