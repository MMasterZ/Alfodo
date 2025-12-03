<template>
  <q-page
    :class="
      systemStore.platform.desktop
        ? 'row background-container'
        : 'background-container-mobile'
    "
  >
    <div v-if="systemStore.platform.desktop">
      <div class="fixed-top">
        <div class="background-bar"></div>
      </div>

      <div class="fixed-bottom">
        <div class="background-bar"></div>
      </div>
    </div>

    <!-- Alert Time Mobile -->
    <div class="fit absolute-center" v-if="practiceData.isAlertBackdropTime">
      <div
        class="background-alert-time-mobile fit animation-alert-time"
        v-if="systemStore.platform.mobile"
      ></div>
    </div>

    <!-- Content -->
    <div
      class="relative-position"
      :class="systemStore.platform.desktop ? 'background-main' : 'background-main-mobile'"
    >
      <!-- Alert Time Desktop -->
      <div class="fit absolute-center" v-if="practiceData.isAlertBackdropTime">
        <div
          class="background-alert-time-desktop fit animation-alert-time"
          v-if="systemStore.platform.desktop"
        ></div>
      </div>

      <div
        class="row"
        :class="systemStore.platform.desktop ? 'background-content' : ''"
        v-if="!practiceData.isFinishPractice"
      >
        <div class="col-12 fit" v-if="!practiceData.isLoadPractice">
          <!-- Header Bar -->
          <header-bar
            :practiceData="practiceData"
            :syncData="synchronizeStore.syncData"
            :systemStore="systemStore"
            :practiceStore="practiceStore"
            :pageName="'multiplevocab'"
          ></header-bar>

          <!-- Score Bar -->
          <score-bar-practice :practiceData="practiceData"></score-bar-practice>

          <!-- Content Multiple Choices -->
          <div class="box-practice" v-if="!practiceData.isLoadPractice">
            <multiple-choices
              :systemStore="systemStore"
              :practiceData="practiceData"
              :practiceStore="practiceStore"
            ></multiple-choices>
          </div>
        </div>
      </div>
    </div>

    <answer-dialog
      v-if="practiceData.isSendAnswer"
      :isDialogAnswer="practiceData.isSendAnswer"
      :practiceData="practiceData"
      :practiceStore="practiceStore"
      :systemStore="systemStore"
    ></answer-dialog>

    <dialog-finish-practice
      :practiceData="practiceData"
      v-if="practiceData.isFinishPractice && !practiceData.isLoadPractice"
      @callback-restart="practiceData.func.restartPractice()"
    ></dialog-finish-practice>

    <!-- <finish-practice-dialog
      v-if="practiceData.isFinishPractice && !practiceData.isLoadingPractice"
      :isDialogFinish="practiceData.isFinishPractice"
      :practiceData="practiceData"
      :syncData="synchronizeStore.syncData"
      :practiceStore="practiceStore"
    ></finish-practice-dialog> -->

    <!-- <info-practice-dialog
      v-if="!practiceData.isLoadingPractice"
      :isDialogInfoPractice="practiceData.isDialogInfoPractice"
      @callback-closeDialog="
        (practiceData.isDirection = true), (practiceData.isDialogInfoPractice = false)
      "
    ></info-practice-dialog> -->

    <dialog-practice-complete
      v-if="isShowDialogPracticeComplete"
    ></dialog-practice-complete>

    <loading-dialog
      :isShowLoading="isShowDialogLoading"
      v-if="isShowDialogLoading || isFirstTutorial"
    ></loading-dialog>
  </q-page>
</template>

<script>
// New
import dialogFinishPractice from "src/components/dialog_main/dialog-finish-practice.vue";
import dialogPracticeComplete from "src/components/dialog_main/dialog-practice-complete.vue";

import headerBar from "components/practice_main/header-bar.vue";
import scoreBarPractice from "components/practice_main/score-bar-practice.vue";
import multipleChoices from "components/vocabulary_main/multiple_choices.vue";

import loadingDialog from "components/dialog-loading.vue";
import directionDialog from "src/components/dialog_main/direction-dialog.vue";
import tryAgainDialog from "components/dialog_main/try-again-dialog.vue";
import completePracticeDialog from "src/components/dialog_main/complete-practice-dialog.vue";
import logOutDialog from "components/dialog_main/logout-dialog.vue";
import answerDialog from "components/dialog_main/answer-dialog.vue";
import finishPracticeDialog from "components/dialog_main/finish-practice-dialog.vue";

import infoPracticeDialog from "components/dialog_main/dialog-info-pratice.vue";

import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
export default {
  components: {
    headerBar,
    scoreBarPractice,

    // Practice
    multipleChoices,

    // Dialog Loading and Answer
    loadingDialog,
    answerDialog,
    finishPracticeDialog,
    directionDialog,
    infoPracticeDialog,

    // New
    completePracticeDialog,
    tryAgainDialog,
    logOutDialog,
    dialogFinishPractice,
    dialogPracticeComplete,
  },
  setup(props) {
    // Store
    const practiceStore = usePracticeStore();
    const studentStore = useStudentStore();
    const systemStore = useSystemStore();
    const synchronizeStore = useSynchronizeStore();

    const $q = useQuasar();
    const router = useRouter();

    const isFirstTutorial = ref(false);
    const isShowDialogLoading = ref(true);
    const isShowDialogPracticeComplete = ref(false);

    const practiceData = reactive({
      counter: 0,
      currentQuestionIndex: 0,
      totalQuestion: computed(() => practiceData.tempPractice.length),
      practice: {},
      totalCorrectQuestion: computed(
        () => practiceData.tempPractice.filter((x) => x.isCorrect).length
      ),
      score: 0,
      star: 0,
      coin: 0,
      time: {
        min: 0,
        sec: 0,
      },

      // Temp Practice
      tempPractice: [],
      tempAnswer: [],

      // Active Boolearn
      isPractice: true,
      isEnableTimer: false,
      isDialogInfoPractice: true,
      isDirection: false,
      isStart: false,
      isCorrect: false,
      isSendAnswer: false,
      isFinishPractice: false,
      isWaitingForTeacher: false,
      isLoadPractice: true,
      isAlertTime: false,
      isAlertBackdropTime: false,
      isTimeout: false,
      isRestart: false,
      isFirstTimeReward: false,

      mode: "practice",

      // Timer
      setInterval: null,
      setTimeout: null,

      reset() {
        // data
        this.star = 0;
        this.coin = 0;
        this.score = 0;
        this.currentQuestionIndex = 0;
        this.tempPractice = [];
        this.tempAnswer = [];

        // Boolean
        this.isLoadPractice = true;
        this.isDialogInfoPractice = true;
        this.isDirection = false;
        this.isFinishPractice = false;
        this.isCorrect = false;
        this.isStart = false;
        this.isSendAnswer = false;
        this.isTimer = false;
        this.isTimeout = false;
      },

      // Function
      func: {
        // Set Current Practice
        setCurrentPractice() {
          let tempPractice = practiceData.tempPractice[practiceData.currentQuestionIndex];

          let tempQuestion = tempPractice.multiplechoices.question;

          let tempExtra =
            practiceData.tempPractice[practiceData.currentQuestionIndex].multiplechoices
              .extraVocab;

          tempQuestion = tempQuestion.replace(/&nbsp;/g, " ");

          let newQuestion = tempQuestion;

          let newExtra = [];
          let tempNewQuestion = [];
          if (tempExtra.length) {
            for (let i = 0; i < tempExtra.length; i++) {
              let regex = new RegExp("\\b" + tempExtra[i].vocab + "\\b", "g");

              newQuestion = newQuestion.replace(
                regex,
                `<span exvoc>${tempExtra[i].vocab}</span>`
              );

              newExtra = newQuestion.match(/<s*span exvoc>(.*?)<s*\/span>/gm);

              if (newExtra) {
                newExtra = newExtra.map((x) =>
                  x.replace(/<span exvoc>/g, "").replace(/<\/span>/g, "")
                );
              }
            }

            let findNewLine = newQuestion.match(/<s*br>/gm) || [];

            if (findNewLine.length) {
              newQuestion = newQuestion.replace(
                /<s*br>/gm,
                "<span newline>[newLine]</span>"
              );
            }

            newQuestion = newQuestion.split(
              /(?:<s*span exvoc>(.*?)<s*\/span>)|(?:<s*span newline>(.*?)<s*\/span>)/gm
            );
          } else {
            newQuestion = newQuestion.split("\\b");
          }

          newQuestion = newQuestion.filter((x) => x != "" && x != " " && x != undefined);

          for (let i = 0; i < newQuestion.length; i++) {
            let wordQuestion = newQuestion[i];

            let newData = {
              vocab: newQuestion[i],
              meaning: "",
              isExtra: false,
              isMobileOpenTooltip: false,
              partOfSpeech: "",
              isExcept: false,
              isNewLine: false,
            };

            if (wordQuestion == "[newLine]") {
              newData.isNewLine = true;
            }

            if (wordQuestion == "." || wordQuestion == "?" || wordQuestion == "!") {
              newData.isExcept = true;
            }

            if (newExtra) {
              for (let ii = 0; ii < newExtra.length; ii++) {
                let wordExtra = newExtra[ii];
                if (wordQuestion == wordExtra) {
                  let findExtra = tempExtra.find((x) => x.vocab == wordExtra);
                  if (findExtra) {
                    newData.meaning = findExtra.meaning;
                    newData.partOfSpeech = findExtra.partOfSpeech.partOfSpeech;
                    newData.isExtra = true;
                    newData.isMobileOpenTooltip = false;
                  }
                }
              }
            }

            tempNewQuestion.push(newData);
          }

          practiceData.tempPractice[
            practiceData.currentQuestionIndex
          ].multiplechoices.questionArr = tempNewQuestion;

          practiceData.practice =
            practiceData.tempPractice[practiceData.currentQuestionIndex];
        },

        // Play Sound
        playSound() {
          if (practiceData.practice.tagAudioUrl != "") {
            systemStore.playSound(practiceData.practice.tagAudioUrl);
          }
        },

        // Start Time
        startTime() {
          if (!practiceData.isEnableTimer) return;

          if (counterFinish.value) {
            practiceData.func.clearTime();
            return;
          }

          practiceData.func.clearTime();
          let setTempTimer = (30 * practiceData.tempPractice.length) / 60;

          practiceData.time.min = setTempTimer;

          practiceData.setTimeout = setTimeout(() => {
            practiceData.setInterval = setInterval(() => {
              if (practiceData.time.min <= 0 && practiceData.time.sec <= 0) {
                practiceData.isSendAnswer = true;
                practiceData.isCorrect = false;
                practiceData.practice.isFinish = true;

                if (practiceData.practice.userAnswer == undefined)
                  practiceData.practice.userAnswer = "";

                practiceData.practice.userAnswer = null;

                let structure = {
                  no: practiceData.currentQuestionIndex + 1,
                  id: practiceData.practice.multiplechoices.practiceId,
                  isCorrect: practiceData.isCorrect,
                  answer: "",
                  question: practiceData.practice.multiplechoices.question,
                };

                practiceData.tempAnswer.push(structure);

                practiceStore.savePracticeLog(practiceData, $q.platform.is);

                practiceStore.saveUpdateCourseSync(
                  practiceData.currentQuestionIndex,
                  practiceData.tempAnswer,
                  practiceData.score
                );

                practiceData.isTimeout = true;

                practiceData.func.clearTime();

                // practiceData.func.nextQuestion();
                return;
              } else {
                if (practiceData.time.sec == 0) {
                  practiceData.time.min--;
                  practiceData.time.sec = 59;
                } else {
                  practiceData.time.sec--;
                }

                if (practiceData.time.min < 1) {
                  practiceData.isAlertTime = true;
                  if (practiceData.time.sec <= 20) {
                    practiceData.isAlertBackdropTime = true;
                  }
                }
              }
            }, 1000);
          }, 500);
        },

        // Send Answer
        sendAnswer(answer) {
          if (practiceData.practice.userAnswer == undefined)
            practiceData.practice.userAnswer = "";

          practiceData.practice.userAnswer = answer;

          if (answer == practiceData.practice.multiplechoices.correctAnswer) {
            practiceData.isCorrect = true;
            practiceData.practice.isCorrect = true;
            practiceData.coin++;
          } else {
            practiceData.isCorrect = false;
          }

          let score = 0;

          score = Math.floor(
            (practiceData.tempPractice.filter((x) => x.isCorrect).length /
              practiceData.tempPractice.length) *
              100
          );

          practiceData.practice.isFinish = true;

          practiceData.score = score;

          if (practiceData.score >= 80) {
            practiceData.star = 3;
          } else if (practiceData.score >= 65) {
            practiceData.star = 2;
          } else if (practiceData.score >= 60) {
            practiceData.star = 1;
          } else {
            practiceData.star = 0;
          }

          practiceData.func.saveProgressLog();

          if (synchronizeStore.isSync) {
            let structure = {
              no: practiceData.currentQuestionIndex + 1,
              id: practiceData.practice.multiplechoices.practiceId,
              isCorrect: practiceData.isCorrect,
              answer: practiceData.practice.multiplechoices.choices[answer] || null,
              question: practiceData.practice.multiplechoices.question,
            };

            practiceData.tempAnswer.push(structure);

            practiceStore.saveUpdateCourseSync(
              practiceData.currentQuestionIndex,
              practiceData.tempAnswer,
              score
            );
          }

          practiceData.isSendAnswer = true;
        },

        // Next Question
        async nextQuestion() {
          let score = Math.floor(
            (practiceData.totalCorrectQuestion / practiceData.totalQuestion) * 100
          );

          practiceData.isAlertTime = false;
          practiceData.isAlertBackdropTime = false;

          if (counterFinish.value || practiceData.isTimeout) {
            isShowDialogLoading.value = true;
            practiceData.isSendAnswer = false;
            practiceData.func.clearTime();

            if (score < 50) systemStore.playEffectFail();
            else systemStore.playEffectPass();

            $q.loading.show();

            await practiceStore.savePracticeLog(practiceData, $q.platform.is);
            if (!synchronizeStore.isSync) {
              practiceData.counter = practiceStore.practiceData.counter;
            }

            $q.loading.hide();

            practiceData.isFinishPractice = true;
            practiceData.isRestart = false;
            isShowDialogLoading.value = false;

            return;
          }

          practiceData.isSendAnswer = false;
          practiceData.currentQuestionIndex++;

          practiceData.func.setCurrentPractice();
        },

        // Reset Practice
        async restartPractice() {
          practiceData.reset();
          practiceData.isRestart = true;
          await practiceData.func.loadPractice();
        },

        // Start practice
        startPractice() {
          if (!practiceData.isStart) {
            practiceData.func.startTime();
            practiceData.isStart = true;
          }
        },

        saveProgressLog() {
          practiceStore.saveProgressLog(practiceData.practice.multiplechoices.practiceId);
        },

        // Load Practice
        async loadPractice() {
          isShowDialogLoading.value = true;

          practiceData.isFirstTimeReward =
            practiceStore.currentPracticeData.isFirstTimeReward;

          // ระบบ Synchornize
          if (synchronizeStore.isSync) {
            practiceData.tempPractice = synchronizeStore.syncData.questionPool;

            practiceStore.saveUpdateCourseSync(
              practiceData.currentQuestionIndex,
              practiceData.tempAnswer,
              practiceData.score
            );
          }
          // ระบบปกติ
          else {
            practiceData.tempPractice = await practiceStore.getVocabMultipleByPracticeListId();
          }

          practiceData.func.setCurrentPractice();

          practiceData.isLoadPractice = false;
          isShowDialogLoading.value = false;
        },

        // Clear Time
        clearTime() {
          clearTimeout(practiceData.setTimeout);
          clearInterval(practiceData.setInterval);
        },
      },
    });

    const counterFinish = computed(() => {
      let findFinish = practiceData.tempPractice.every((x) => x.isFinish);
      return findFinish;
    });

    watch(
      () => synchronizeStore.syncData,
      async () => {
        if (synchronizeStore.isSync) {
          if (synchronizeStore.syncData.isRestartPractice) {
            if (!practiceData.isRestart) {
              practiceData.func.restartPractice();
            }
            return;
          }

          if (!synchronizeStore.syncData.isShowSummaryPractice) {
            if (practiceData.isLoadPractice) {
              await practiceData.func.loadPractice();
            }
          } else {
            if (!practiceData.isFinishPractice) {
              await practiceStore.savePracticeLog(practiceData, $q.platform.is);
              practiceData.isDialogInfoPractice = false;
              practiceData.isFinishPractice = true;
              practiceData.isRestart = false;
            }
          }
        }
      }
    );

    onMounted(async () => {
      const synchronizeStore = useSynchronizeStore();
      const systemStore = useSystemStore();
      const practiceStore = usePracticeStore();

      systemStore.setRouter("multiplevocab");

      if (!synchronizeStore.isSync) {
        practiceData.counter = practiceStore.practiceCurrentCounter;
        if (practiceStore.practiceCurrentCounter == 2) {
          isShowDialogPracticeComplete.value = true;
          // router.replace("/practice/unit");
          isShowDialogLoading.value = false;
          return;
        }
      }

      await practiceData.func.loadPractice();
    });

    onBeforeUnmount(() => {
      practiceData.func.clearTime();
    });

    return {
      //
      practiceStore,
      studentStore,
      systemStore,
      synchronizeStore,

      // Data
      practiceData,

      isFirstTutorial,
      isShowDialogLoading,
      isShowDialogPracticeComplete,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-container {
  position: relative;
  min-width: 1200px;
  box-sizing: inherit;
  background-image: url("/images/background_main/backdrop-vocabulary.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.background-container-mobile {
  position: relative;
  box-sizing: inherit;
  background-image: url("/images/background_main/background-vocabulary-multiple.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0% 100%;
  margin: auto;
  overflow: auto;
}

.background-main {
  max-width: 1600px;
  min-width: 1200px;
  width: 100%;
  height: 900px;
  background-repeat: no-repeat;
  background-size: fit-content;
  background-image: url("/images/background_main/background-vocabulary-multiple.png");
  background-position: center;
  overflow: hidden;
  margin: auto;
}

.background-content {
  min-width: 1200px;
  max-width: 1600px;
  width: 100vw;
  height: 100%;
  overflow: hidden;
}

.background-bar {
  position: relative;
  height: 50px;
  width: 200%;
  background-image: url("/images/background_main/backdrop-vocabulary-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.box-practice {
  height: calc(100% - 150px);
}

.background-alert-time-desktop {
  background-image: url("/images/practice_main/alert-time-fade-desktop.png");
  background-size: cover;
  background-position: center;
  margin: 0px;
}

.background-alert-time-mobile {
  background-image: url("/images/practice_main/alert-time-fade-mobile.png");
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  margin: 0px;
}

.animation-alert-time {
  animation: alertTime 1s linear infinite;
  opacity: 1;
}

@keyframes alertTime {
  to {
    opacity: 0.1;
  }
}
</style>
