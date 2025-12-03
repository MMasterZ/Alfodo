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
    <div class="fit absolute-center" v-if="practiceData.isAlertTime">
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
      <div class="fit absolute-center" v-if="practiceData.isAlertTime">
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
        <div class="col-12 fit">
          <!-- Header Bar -->
          <header-bar
            :practiceData="practiceData"
            :syncData="synchronizeStore.syncData"
            :systemStore="systemStore"
            :practiceStore="practiceStore"
            :pageName="'flashcard'"
          ></header-bar>

          <!-- Score Bar -->
          <score-bar-learning
            :practiceData="practiceData"
            v-if="practiceData.isStart"
          ></score-bar-learning>

          <!-- Content Flashcard -->
          <div
            class="q-pa-md"
            v-if="
              !practiceData.isPractice &&
              !practiceData.isStart &&
              !practiceData.isLoadingLearning &&
              !isFirstTutorial
            "
          >
            <flashcard
              :syncData="synchronizeStore.syncData"
              :systemStore="systemStore"
              :practiceData="practiceData"
              @callback-startPractice="practiceData.isDirection = true"
            ></flashcard>
          </div>

          <!-- Content Practice In Flashcard -->
          <div
            class="box-practice"
            v-if="
              practiceData.isPractice &&
              practiceData.isStart &&
              !practiceData.isLoadingNextQuestion
            "
          >
            <q-tab-panels
              v-model="practiceData.practice.type"
              animated
              class="transparent no-padding fit"
              transition-duration="200"
              transition-next="fade"
              transition-prev="fade"
            >
              <q-tab-panel name="Spell1" class="no-padding" style="overflow: hidden">
                <spelling-1
                  :systemStore="systemStore"
                  :practiceData="practiceData"
                ></spelling-1>
              </q-tab-panel>

              <q-tab-panel name="Spell2" class="no-padding" style="overflow: hidden">
                <spelling-2
                  :systemStore="systemStore"
                  :practiceData="practiceData"
                ></spelling-2>
              </q-tab-panel>

              <q-tab-panel name="Matching" class="no-padding" style="overflow: hidden">
                <matching
                  :systemStore="systemStore"
                  :practiceData="practiceData"
                ></matching>
              </q-tab-panel>

              <q-tab-panel
                name="Multiple Choices"
                class="no-padding"
                style="overflow: hidden"
              >
                <multiple-choices
                  :systemStore="systemStore"
                  :practiceData="practiceData"
                  :practiceStore="practiceStore"
                ></multiple-choices>
              </q-tab-panel>
            </q-tab-panels>
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

    <!-- <finish-learning-dialog
      v-if="practiceData.isFinishPractice"
      :isDialogFinish="practiceData.isFinishPractice"
      :practiceData="practiceData"
      :syncData="synchronizeStore.syncData"
      :practiceStore="practiceStore"
    ></finish-learning-dialog> -->

    <dialog-finish-lesson
      v-if="practiceData.isFinishPractice"
      :practiceData="practiceData"
      @callback-restart="practiceData.func.restartPractice()"
    ></dialog-finish-lesson>

    <loading-dialog
      :isShowLoading="true"
      v-if="
        practiceData.isLoadingLearning ||
        (practiceData.isStart && practiceData.isLoadingPractice) ||
        isFirstTutorial ||
        (practiceData.isDirection && practiceData.isLoadingPractice) ||
        (synchronizeStore.isSync &&
          synchronizeStore.isStartReview &&
          practiceData.isLoadingPractice) ||
        (synchronizeStore.isSync &&
          synchronizeStore.isStartReview &&
          practiceData.isLoadingLearning)
      "
    ></loading-dialog>
  </q-page>
</template>

<script>
// New
import dialogFinishLesson from "src/components/dialog_main/dialog-finish-lesson.vue";

import headerBar from "components/practice_main/header-bar.vue";
import scoreBarLearning from "components/practice_main/score-bar-learning.vue";

// Content
import flashcard from "components/vocabulary_main/flashcard.vue";
import spelling1 from "components/vocabulary_main/spelling_bee_1.vue";
import spelling2 from "components/vocabulary_main/spelling_bee_2.vue";
import matching from "components/vocabulary_main/matching.vue";
import multipleChoices from "components/vocabulary_main/multiple_choices.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";

// Dialog
import loadingDialog from "components/dialog-loading.vue";
import directionDialog from "src/components/dialog_main/direction-dialog.vue";
import answerDialog from "components/dialog_main/answer-dialog.vue";
// import finishLearningDialog from "src/components/dialog_main/finish-learning-dialog.vue";

import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";
export default {
  components: {
    headerBar,
    scoreBarLearning,
    dialogTutorial,

    // Content
    flashcard,
    spelling1,
    spelling2,
    matching,
    multipleChoices,

    // Dialog
    answerDialog,
    // finishLearningDialog,
    directionDialog,
    loadingDialog,

    // New
    dialogFinishLesson,
  },
  props: {
    // Store
    practiceStore: {
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
    studentStore: {
      default: () => {},
    },
    synchronizeStore: {
      default: () => {},
    },
    buddyStore: {
      default: () => {},
    },
  },
  setup(props) {
    // initialize Store
    const $q = useQuasar();
    const $router = useRouter();

    const practiceStore = usePracticeStore();

    const practiceData = reactive({
      currentQuestionIndex: 0,
      currentLearningIndex: 0,

      // TotalQuestion
      totalQuestion: 0,
      totalLearning: 0,
      totalCorrect: 0,
      totalNext: 0,

      practice: {},
      time: {
        min: 0,
        sec: 0,
      },
      score: 0,
      star: 0,
      progress: 0,

      // Buddy And User
      coin: 0,
      buddyCoin: 0,
      quota: 0,
      buddyQuota: 0,

      quotaId: "",
      counter: 0,

      // Temp Practice And Learning
      tempLearning: [],
      tempPractice: [],
      mode: "practice",
      // totalCorrectQuestion:0,

      // Boolearn
      isPractice: false,
      isEnableTimer: true,
      isDirection: false,
      isStart: false,
      isSendAnswer: false,
      isCorrect: false,
      isFinishLearning: false,
      isFinishPractice: false,
      isLoadingLearning: true,
      isLoadingPractice: true,
      isLoadingNextQuestion: false,
      isAlertTime: false,
      isTimeout: false,
      isStartReview: false,
      isFirstTimeReward: false,

      setInterval: null,
      setTimeout: null,
      isRestart: false,

      // Function
      func: {
        playSound() {
          if (practiceData.practice.tagAudioUrl != "") {
            props.systemStore.playSound(practiceData.practice.tagAudioUrl);
          }
        },
        timeout() {
          if (!practiceData.isEnableTimer) return;
          practiceData.func.clearTime();
          practiceData.time.sec = 30;

          if (counterFinish.value) {
            practiceData.func.clearTime();
            return;
          }

          practiceData.setTimeout = setTimeout(() => {
            practiceData.setInterval = setInterval(() => {
              if (practiceData.time.sec === 0) {
                practiceData.func.clearTime();
                this.sendAnswer(practiceData.practice.selectedAnswer);
                return;
              } else {
                if (practiceData.time.sec <= 5) {
                  practiceData.isAlertTime = true;
                }
              }
              practiceData.time.sec--;
            }, 1000);
          }, 500);
        },
        sendAnswer(answer) {
          practiceData.func.clearTime();

          if (practiceData.practice.userAnswer == undefined) {
            practiceData.practice.userAnswer = "";
          }

          practiceData.practice.userAnswer = answer;

          let practiceDataType;

          if (practiceData.practice.type == "Spell1") {
            practiceDataType = practiceData.practice.spell1;
          } else if (practiceData.practice.type == "Spell2") {
            practiceDataType = practiceData.practice.spell2;
          } else if (practiceData.practice.type == "Matching") {
            practiceDataType = practiceData.practice.matching;
          } else {
            practiceDataType = practiceData.practice.multiplechoices;
          }

          if (
            answer === practiceDataType.correctAnswer ||
            practiceDataType.vocab.localeCompare(
              practiceData.practice.userAnswer,
              undefined,
              {
                sensitivity: "accent",
              }
            ) === 0
          ) {
            practiceData.isCorrect = true;
          } else {
            practiceData.isCorrect = false;
          }

          practiceData.isSendAnswer = true;

          practiceData.func.saveProgressLog();
        },
        async nextQuestion() {
          practiceData.totalNext++;
          practiceData.isLoadingNextQuestion = true;

          practiceData.isAlertTime = false;

          if (!counterFinish.value) {
            practiceData.func.timeout();
          }

          if (!practiceData.isCorrect) {
            practiceData.practice.incorrect++;
            practiceData.score += 0;

            if (practiceData.practice.incorrect == 2) {
              practiceData.practice.isFinish = true;
            } else {
              if (
                practiceData.practice.practiceListId == props.practiceStore.practiceListId
              ) {
                practiceData.practice.isIncorrectCurrentUnit = true;

                props.practiceStore.saveIncorrectVocab(practiceData.practice);

                let setIncorrectQuestion = practiceData.practice;

                practiceData.tempPractice.splice(practiceData.currentQuestionIndex, 1);

                practiceData.tempPractice.push(setIncorrectQuestion);
              } else {
                practiceData.practice.isFinish = true;
              }
            }
          } else {
            practiceData.totalCorrect++;
            practiceData.coin++;

            if (practiceData.practice.isIncorrectPractice) {
              props.practiceStore.removeIncorrectPractice(
                practiceData.practice.vocabLogId
              );
            }

            if (practiceData.practice.incorrect == 1) {
              practiceData.score += (0.5 / practiceData.totalQuestion) * 100;
            } else {
              practiceData.score += (1 / practiceData.totalQuestion) * 100;
            }

            practiceData.practice.isFinish = true;
          }

          if (!practiceData.practice.isFinish) {
            let tempProgress = Math.round(
              (practiceData.tempPractice.filter((x) => x.isFinish).length /
                practiceData.tempPractice.length) *
                100
            );

            practiceData.progress = tempProgress;

            if (props.synchronizeStore.isSync) {
              props.practiceStore.saveSynchronizeFlashcardPractice(
                false,
                practiceData.score,
                practiceData.progress,
                practiceData.tempPractice
              );
            }

            if (!practiceData.isCorrect) {
              if (practiceData.practice.incorrect != 2) {
                if (props.synchronizeStore.isSync) {
                  props.practiceStore.updateSynchronizeFlashcardProgress(practiceData);
                }

                practiceData.isSendAnswer = false;
                practiceData.func.setCurrentPractice();
                practiceData.func.playSound();
                setTimeout(() => {
                  practiceData.isLoadingNextQuestion = false;
                }, 100);
                return;
              }
            }
          }

          let setTempCurrentPractice = practiceData.practice;

          practiceData.tempPractice[
            practiceData.currentQuestionIndex
          ] = setTempCurrentPractice;

          let tempProgress = Math.round(
            (practiceData.tempPractice.filter((x) => x.isFinish).length /
              practiceData.tempPractice.length) *
              100
          );

          practiceData.progress = tempProgress;

          if (props.synchronizeStore.isSync) {
            props.practiceStore.saveSynchronizeFlashcardPractice(
              false,
              practiceData.score,
              practiceData.progress,
              practiceData.tempPractice
            );
          }

          if (counterFinish.value) {
            practiceData.func.funcFinishPractice();

            return;
          }

          practiceData.isSendAnswer = false;
          practiceData.currentQuestionIndex++;

          if (props.synchronizeStore.isSync) {
            props.practiceStore.updateSynchronizeFlashcardProgress(practiceData);
          }

          practiceData.func.setCurrentPractice();
          practiceData.func.playSound();
        },
        startPractice() {
          if (!practiceData.isStart) {
            practiceData.isFinishLearning = true;
            practiceData.func.timeout();
            practiceData.isStart = true;
            practiceData.func.playSound();
          }
        },
        setCurrentPractice() {
          let randomPracticeType = Math.floor(
            Math.random() *
              practiceData.tempPractice[practiceData.currentQuestionIndex].types.length
          );

          let setType =
            practiceData.tempPractice[practiceData.currentQuestionIndex].types[
              randomPracticeType
            ];

          practiceData.practice = {
            incorrect: 0,
            isFinish: false,
            isIncorrectPractice: false,
            isIncorrectCurrentUnit: false,
            ...practiceData.tempPractice[practiceData.currentQuestionIndex],
            type: setType,
            userAnswer: "",
            selectedAnswer: "",
          };

          if (practiceData.practice.isIncorrectPractice) {
            if (
              practiceData.practice.practiceListId == props.practiceStore.practiceListId
            ) {
              practiceData.practice.isIncorrectCurrentUnit = true;
            }
          }

          practiceData.tempPractice[practiceData.currentQuestionIndex].types.splice(
            randomPracticeType,
            1
          );

          setTimeout(() => {
            practiceData.isLoadingNextQuestion = false;
          }, 100);
        },
        async restartPractice() {
          practiceData.currentLearningIndex = 0;
          practiceData.currentQuestionIndex = 0;

          practiceData.isRestart = true;

          practiceData.practice = {};

          if(props.synchronizeStore.isSync){

            practiceData.isPractice = true;
          }else{
            practiceData.isPractice = false;
          }

          practiceData.coin = 0;
          practiceData.score = 0;
          practiceData.isSendAnswer = false;
          practiceData.isDirection = false;
          practiceData.isCorrect = false;
          practiceData.isStart = false;
          practiceData.isFinishPractice = false;
          practiceData.isFinishFlashcard = false;
          practiceData.isFinishLearning = false;
          practiceData.isLoadingLearning = true;
          practiceData.isLoadingPractice = true;
          practiceData.isAlertTime = false;
          practiceData.tempLearning = [];
          practiceData.tempPractice = [];
          practiceData.isLoadingNextQuestion = true;
          practiceData.isTimeout = false;
          practiceData.totalCorrect = 0;
          practiceData.totalNext = 0;

          await practiceData.func.loadFlashcard();
          await practiceData.func.loadPractice();

          if(props.synchronizeStore.isSync){
            practiceData.isLoadingLearning = false;
            practiceData.isDirection = true;
            practiceData.isRestart = false;
          }

        },
        async funcFinishPractice() {
          let tempProgress = Math.round(
            (practiceData.tempPractice.filter((x) => x.isFinish).length /
              practiceData.tempPractice.length) *
              100
          );

          practiceData.progress = tempProgress;

          practiceData.score = Math.round(practiceData.score);

          if (!props.synchronizeStore.isSync) {
            if (props.buddyStore.isBuddy) {
              if (props.buddyStore.quota > 2) {
                practiceData.buddyCoin = 0;
              } else {
                practiceData.buddyCoin = practiceData.coin;
              }
            }

            if (practiceData.quota > 2) {
              practiceData.coin = 0;
            }
          }

          practiceData.isSendAnswer = false;

          practiceData.func.clearTime();

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

          await props.practiceStore.savePracticeLog(practiceData, $q.platform.is);

          if (!props.synchronizeStore.isSync) {
            if (
              (props.practiceStore.practiceData.counter == 0 && practiceData.star != 0) ||
              (props.practiceStore.practiceData.counter != 0 && practiceData.coin >= 0)
            ) {
              props.practiceStore.updateDailyPracticeQuota(practiceData.quotaId);

              if (props.buddyStore.isBuddy) {
                props.practiceStore.updateDailyPracticeQuota(
                  props.buddyStore.quota.dailyPracticeQuotaId
                );
              }

              if (props.buddyStore.isBuddy) {
                practiceData.buddyQuota++;
              }

              practiceData.quota++;
            }
          }

          $q.loading.hide();

          practiceData.isFinishPractice = true;
          practiceData.isRestart = false;

          if (props.synchronizeStore.isSync) {
            props.practiceStore.saveSynchronizeFlashcardPractice(
              true,
              practiceData.score,
              practiceData.progress,
              practiceData.tempPractice
            );

            props.practiceStore.updateSynchronizeFlashcardProgress(practiceData);
          }
        },
        saveProgressLog() {
          let type = practiceData.practice.type;

          if (type == "Spell1") {
            type = "spell1";
          } else if (type == "Spell2") {
            type = "spell2";
          } else if (type == "Matching") {
            type = "matching";
          } else if (type == "Multiple Choices") {
            type = "multiplechoices";
          }

          props.practiceStore.saveProgressLog(
            `${practiceData.practice.practiceListId}-${practiceData.practice[type].vocab}`
          );
        },
        async loadDailyPractice() {
          let responseQuota = await props.practiceStore.getCheckDailyPracticeQuota();

          practiceData.quota = responseQuota.quota || 0;

          practiceData.quotaId = responseQuota.dailyPracticeQuotaId;
        },
        async loadFlashcard() {
          practiceData.tempLearning = await props.practiceStore.getFlashcard();

          practiceData.totalLearning = practiceData.tempLearning.length;

          practiceData.isLoadingLearning = false;

          // isShowDialogStartPractice.value = true;
        },
        async loadPractice() {
          practiceData.isFirstTimeReward =
            practiceStore.currentPracticeData.isFirstTimeReward;

          practiceData.tempPractice = await props.practiceStore.getFlashcardLearningPractice();

          if (practiceData.tempPractice.length) {
            practiceData.totalQuestion = practiceData.tempPractice.length;

            practiceData.func.setCurrentPractice();

            if (props.synchronizeStore.isSync) {
              await props.practiceStore.saveSynchronizeFlashcardPractice(false, 0, 0, []);
            }

            practiceData.isLoadingPractice = false;
          }
        },
        clearTime() {
          clearTimeout(practiceData.setTimeout);
          clearInterval(practiceData.setInterval);
        },
      },
    });

    const isFirstTutorial = ref(false);
    const isShowDialogStartPractice = ref(false);
    const isShowDialogDirection = ref(false);

    const funcCloseDialog = () => {
      if (!isShowDialogStartPractice.value) {
        isShowDialogDirection.value = false;
        return;
      } else {
        if (practiceStore.practiceType == "flashcard") {
          practiceData.isDirection = true;
        } else {
          isShowDialogDirection.value = true;
        }
      }

      isShowDialogStartPractice.value = false;
    };

    // #region Watch
    watch(
      () => props.synchronizeStore.syncData,
      async () => {
        if (props.synchronizeStore.isSync) {
          if (props.synchronizeStore.syncData.isRestartPractice) {
            practiceData.func.restartPractice();
            return;
          }

          if (!props.synchronizeStore.syncData.isShowSummaryPractice) {
            if (props.synchronizeStore.syncData.isStartReview) {
              practiceData.isPractice = true;
              practiceData.isDirection = true;

              if (practiceData.isLoadingPractice) {
                await practiceData.func.loadPractice();
              }

            }
          } else {
            if (!practiceData.isFinishPractice) {
              practiceData.func.funcFinishPractice();
              practiceData.isFinishPractice = true;
              practiceData.isRestart = false;
            }
          }
        }
      }
    );
    // #endregion

    const counterFinish = computed(() => {
      let findFinish = practiceData.tempPractice.every((x) => x.isFinish);
      return findFinish;
    });
    onMounted(async () => {
      const synchronizeStore = useSynchronizeStore();
      const systemStore = useSystemStore();

      systemStore.setRouter("flashcard");

      await practiceData.func.loadDailyPractice();
      let responseFlashcard = await practiceData.func.loadFlashcard();

      if (responseFlashcard == 401) {
        $router.replace("/lobby");
        return;
      }

      await practiceData.func.loadPractice();
    });

    onBeforeUnmount(() => {
      clearInterval(practiceData.setInterval);
    });

    return {
      // Data
      practiceData,

      // Function
      funcCloseDialog,

      // Dialog
      isFirstTutorial,
      isShowDialogStartPractice,
      isShowDialogDirection,
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
  height: 100vh;
  background-image: url("/images/background_main/background-flashcard.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 15% 0%;
  overflow: auto;
}

.background-main {
  position: relative;
  max-width: 1600px;
  min-width: 1200px;
  width: 100%;
  height: 900px;
  background-repeat: no-repeat;
  background-size: fit-content;
  background-image: url("/images/background_main/background-flashcard.png");
  background-position: center;
  z-index: 1;
  margin: auto;
  overflow: auto;
}

.background-main::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.background-main-mobile {
  width: 100%;
  z-index: 1;
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
