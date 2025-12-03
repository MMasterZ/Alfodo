<template>
  <q-page class="bg-white">
    <!-- #region Header -->
    <div class="quiz-header row">
      <div class="col-1 brx q-pa-md"></div>
      <div class="col brx self-center" align="center">
        <div class="quiz-timer row justify-center items-center">
          <div class="f24 font-mali-b">
            {{ `${quizTestData.com.timer}` }}
          </div>
        </div>
      </div>
      <div class="col-1 brx q-pa-md"></div>
    </div>
    <!-- #endregion -->

    <!-- #region Start Page -->
    <div
      class="brx q-pa-md"
      align="center"
      v-if="quizTestData.stage == 'quiz-home'"
    >
      <div class="quiz-container relative-position brx q-pa-md">
        <div class="brx quiz-home-page">
          <div class="quiz-home-page-sub">
            <!-- #region Quiz Title -->
            <div class="brx relative-position" style="height: 120px">
              <div class="absolute-center brx">
                <div
                  class="quiz-start-title row justify-center items-center font-mali-b"
                  align="center"
                >
                  <div>
                    <div class="f36">Quiz</div>
                    <div class="f24">
                      <span v-if="isQuizMid">แบบทดสอบก่อนสอบกลางภาค</span>
                      <span v-if="isQuizPost">แบบทดสอบก่อนสอบปลายภาค</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Details Test Question -->
            <div class="brx q-pa-md f20 font-mali-m">
              <div class="brx row">
                <div class="brx col q-pa-xs" align="left">
                  {{ `จำนวนข้อสอบ` }}
                </div>
                <div class="brx col q-pa-xs" align="right">
                  {{ `20 ข้อ` }}
                </div>
              </div>
              <div class="brx row">
                <div class="brx col q-pa-xs" align="left">
                  {{ `เวลาในการสอบ` }}
                </div>
                <div class="brx col q-pa-xs" align="right">
                  {{ `${quizTestData.timeMinute} นาที` }}
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <div class="q-pa-md brx">
              <q-separator style="background-color: #2c2c2c"></q-separator>
            </div>

            <!-- #region Description -->
            <div class="q-pa-md brx" align="left">
              <div align="left" class="f14 font-mali-b brx">
                <span> คำอธิบาย </span>
              </div>
              <div
                class="f14 font-mali-m q-mt-md brx"
                style="width: 80%"
                align="left"
              >
                กรณีที่หมดเวลาสอบ ระบบจะทำการส่งข้อสอบให้อัตโนมัติ
                และคิดคะแนนรวมถึงข้อที่นักเรียนทำถึง
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Reward Condition -->
            <div class="brx q-pa-md">
              <div align="center" class="brx q-pa-md q-my-md">
                <div class="brx font-mali-b f14">
                  <div>รางวัลที่จะได้รับ</div>
                  <div class="row justify-center items-center">
                    <div>
                      <div class="relative-position">
                        <q-img
                          width="45px"
                          src="/images/icon_main/icon-coin-winner.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <div class="absolute-bottom brx" style="bottom: -10px">
                          <span class="quiz-text-coin-reward font-mali-sb f20">
                            {{ `x${practiceStore.prePostReward.coin}` }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="q-px-sm f16">ต่อจำนวนข้อที่ถูก</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
            <!-- #region Button Start  -->
            <div class="q-pb-md brx">
              <div align="center" style="max-width: 280px">
                <div
                  class="q-mb-sm brx row justify-center items-end"
                  style="height: 20px"
                >
                  <div
                    class="col-12 quiz-progress-box"
                    align="left"
                    v-if="!quizTestData.isShowwButtonStartQuiz"
                  >
                    <div
                      class="quiz-progress"
                      :class="
                        quizTestData.isShowAnimationStartProgress
                          ? 'animation-progress'
                          : ''
                      "
                    ></div>
                  </div>
                  <div v-else class="animate__animated animate__fadeIn">
                    <span class="f14"
                      >ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</span
                    >
                  </div>
                </div>
                <div>
                  <q-img
                    class="quiz-button"
                    :src="`/images/prepost/button-start-prepost${
                      quizTestData.isShowwButtonStartQuiz ? '' : '-disable'
                    }.png`"
                    no-spinner=""
                    no-transition=""
                    :class="
                      quizTestData.isShowwButtonStartQuiz ? '' : 'disable'
                    "
                    @click="
                      quizTestData.isShowwButtonStartQuiz
                        ? quizTestData.func.startQuizTest()
                        : null
                    "
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Quiz Test -->
    <div class="brx" align="center" v-if="quizTestData.stage == 'quiz-start'">
      <div class="brx quiz-container q-pa-md">
        <div class="quiz-start-page q-pa-lg q-px-xl">
          <!-- #region Question Length -->
          <div class="brx" align="left">
            <div class="quiz-question-number f16 font-mali-sb">
              {{
                `Q${quizTestData.currentQuestion + 1}/${
                  quizTestData.questionList.length
                }`
              }}
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Question Scroll  -->
          <div class="brx q-my-md" align="left">
            <div class="brx">
              <div class="f24 font-mali-m">
                {{ quizTestData.com.question.instructionEng }}
              </div>
              <div class="f20 font-mali-m q-mt-sm">
                {{ quizTestData.com.question.instructionTh }}
              </div>
            </div>
            <div class="brx quiz-question-scroll">
              <div class="brx q-mt-xl font-mali-m f24">
                {{ `${quizTestData.com.question.question}` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Choices -->
          <div class="brx" align="left">
            <div
              class="brx q-my-md"
              v-for="(itemChoice, indexChoice) in quizTestData.com.question
                .choices"
              :key="indexChoice"
            >
              <div class="quiz-choice-button">
                {{ `${itemChoice.choice}` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog answer details -->
  <q-dialog
    v-model="quizTestData.isShowDialogAnswer"
    persistent
    maximized
    position="bottom"
  >
    <q-card class="transparent brx">
      <q-card-section
        class="brx"
        style="padding: 50vh 0px 0px 0px; overflow: hidden"
      >
        <!-- #region Character -->
        <div class="brx" align="center">
          <div class="quiz-answer-container relative-position brx">
            <div class="absolute-center brx" style="top: -70px; left: 100px">
              <div class="relative-position" style="max-width: 420px">
                <character></character>
                <div class="absolute-center brx" style="top: 0%">
                  <q-img
                    width="350px"
                    src="/images/prepost/prepost-character-talk-correct.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
        <!-- #region answer details -->
        <div
          class="quiz-dialog-answer shadow-1 relative-position brx incorrect q-pa-md row justify-center items-center"
          align="center"
        >
          <div
            class="col-12 self-start quiz-answer-container q-pa-md brx"
          ></div>
          <div class="col-12 self-end quiz-answer-container brx">
            <q-img
              class="cursor-pointer"
              width="128px"
              no-spinner=""
              no-transition=""
              src="/images/prepost/question-test-button-next.png"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import character from "components/character_main/character.vue";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";
export default {
  components: {
    character,
  },
  setup(props) {
    // #region ---------- Initilize Section ----------
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const routerName = ref(route.name);
    // #endregion

    // #region ---------- Data Section ----------
    const quizTestData = reactive({
      // #region Data
      stage: "quiz-home",
      currentQuestion: 0,
      questionList: [],

      // Boolearn
      isShowDialogAnswer: true,
      isShowwButtonStartQuiz: false,
      isShowAnimationStartProgress: false,

      // Time and Timer
      listenTimer: null,
      timeMinute: 30,
      timeSecond: 0,
      // #endregion

      // #region Function
      func: {
        countdownQuizTest() {
          console.log("countdownQuizTest");
          const practiceStore = usePracticeStore();

          let setTime = quizTestData.timeMinute * 60;

          if (practiceStore.prePostStatus.isStartPrePostTest) {
            if (practiceStore.prePostObject.timer) {
              setTime = practiceStore.prePostObject.timer;
            }
          }

          let setMin = Math.floor(setTime / 60);
          let setSec = setTime % 60;

          quizTestData.listenTimer = setInterval(async () => {
            setTime--;
            setMin = Math.floor(setTime / 60);
            setSec = setTime % 60;

            quizTestData.timeMinute = setMin;
            quizTestData.timeSecond = setSec;

            if (setMin == 0 && setSec == 0) {
              clearInterval(quizTestData.listenTimer);

              $q.loading.show();

              // await funcSavePrePostLog();
              // await funcGetRewardByScore();

              isTimeout.value = true;
              isShowDialogAnswer.value = false;
              practiceStore.setPrePostStatus({
                isStartPrePostTest: true,
                isFinishPrePostTest: true,
                isSendAnswer: false,
                isTimeout: true,
                isGetRewardCoin: isShowRewardCoin.value,
                isGetRewardItem: isShowRewardItem.value,
              });

              $q.loading.hide();
            }

            if (setTime >= 0) {
              practiceStore.setPrePostTimer(setTime);
            }
          }, 1000);
        },
        startQuizTest() {
          console.log("startQuizTest");

          const practiceStore = usePracticeStore();

          quizTestData.stage = "quiz-start";

          practiceStore.setPrePostStatus({
            isStartPrePostTest: true,
            isFinishPrePostTest: false,
            isTimeout: false,
          });

          return;
          this.countdownQuizTest();
        },
      },
      // #endregion

      // #region Computed
      com: {
        timer: computed(() => {
          let timer = "00:00";

          if (quizTestData.stage == "quiz-start") {
            let min =
              quizTestData.timeMinute < 10
                ? `0${quizTestData.timeMinute}`
                : quizTestData.timeMinute;
            let sec =
              quizTestData.timeSecond < 10
                ? `0${quizTestData.timeSecond}`
                : quizTestData.timeSecond;
            timer = `${min}:${sec}`;
          }

          return timer;
        }),
        question: computed(() => {
          let question = {};

          if (quizTestData.questionList.length) {
            question = quizTestData.questionList[quizTestData.currentQuestion];
          }

          return question;
        }),
      },
      // #endregion
    });
    // #endregion

    // #region ---------- Method Section ----------
    // #region Function Timer Start Quiz
    const funcTimerStartQuiz = () => {
      console.log("funcTimerStartQuiz");
      let timer = 5;

      let interval = setInterval(() => {
        quizTestData.isShowAnimationStartProgress = true;
        if (timer == 0) {
          clearInterval(interval);
          quizTestData.isShowwButtonStartQuiz = true;
        }
        timer--;
      }, 1000);
    };
    // #endregion

    // #region Get Quiz Test Question
    const funcGetQuizTestQuestion = async () => {
      console.log("funcGetQuizTestQuestion");
      const practiceStore = usePracticeStore();

      $q.loading.show();

      let response = await practiceStore.getEncryptedTestQuestions(
        routerName.value
      );

      if (response.length) {
        quizTestData.questionList = response;

        $q.loading.hide();

        if (practiceStore.prePostStatus.isStartPrePostTest) {
          quizTestData.stage = "quiz-start";
          // quizTestData.func.countdownQuizTest();
          return;
        }

        setTimeout(() => {
          funcTimerStartQuiz();
        }, 1000);
      } else {
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Check Quiz Test
    const funcCheckQuizTest = async () => {
      console.log("funcCheckQuizTest");
      const practiceStore = usePracticeStore();

      try {
        let response = await practiceStore.checkTestingMode();

        if (
          response.testType != routerName.value ||
          !response.isShowPopupPretest
        ) {
          if (quizTestData.listenTimer) {
            clearInterval(quizTestData.listenTimer);
          }
          practiceStore.clearPrePost();
          setTimeout(() => {
            $router.replace("lobby");
            $q.loading.hide();
          }, 1000);
          return;
        }
      } catch (e) {
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Get Quiz Reward
    const funcGetQuizTestReward = async () => {
      console.log("funcGetQuizTestReward");
      const practiceStore = usePracticeStore();
      try {
        await practiceStore.getTestReward(routerName.value);
      } catch (e) {
        $q.loading.hide();
      }
    };
    // #endregion
    // #endregion

    // #region ---------- Computed Section ----------
    // #region isQuizMid
    const isQuizMid = computed(() => {
      let isCheck = false;

      if (routerName.value == "quizMid") {
        isCheck = true;
      }
      return isCheck;
    });
    // #endregion

    // #region isQuizPost
    const isQuizPost = computed(() => {
      let isCheck = false;

      if (routerName.value == "quizPost") {
        isCheck = true;
      }
      return isCheck;
    });
    // #endregion
    // #endregion

    // #region ---------- Mounted Section ----------
    onMounted(async () => {
      $q.loading.show();

      const systemStore = useSystemStore();

      systemStore.setRouter(route.name);

      await funcCheckQuizTest();
      await funcGetQuizTestReward();
      await funcGetQuizTestQuestion();
    });
    // #endregion

    return {
      // Store
      practiceStore: usePracticeStore(),

      // Data
      quizTestData,

      // Computed
      isQuizMid,
      isQuizPost,
    };
  },
};
</script>

<style lang="scss" scoped>
.quiz-header {
  width: 100%;
  height: 50px;
  background-color: #3277c9;
}

.quiz-timer {
  width: 130px;
  height: 40px;
  border: 1px solid #4a261b;
  border-radius: 50px;
  background-color: #fff;
  color: #4a261b;
}

// #region Home page
.quiz-container {
  max-width: 1000px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  color: #2c2c2c;
}

.quiz-home-page {
  max-width: 600px;
  width: 100%;
  border: 5px solid #3277c9;
  border-radius: 20px;
  padding: 1%;
}

.quiz-home-page-sub {
  border: 5px dashed #3277c9;
  border-radius: 12px;
  padding: 2%;
}

.quiz-start-title {
  width: 630px;
  height: 110px;
  background-color: #3277c9;
  border-radius: 10px;
  color: #fff;
}

.quiz-text-coin-reward {
  color: #4a261b;
  text-shadow: rgb(255, 255, 255) 3px 0px 0px,
    rgb(255, 255, 255) 2.83487px 0.981584px 0px,
    rgb(255, 255, 255) 2.35766px 1.85511px 0px,
    rgb(255, 255, 255) 1.62091px 2.52441px 0px,
    rgb(255, 255, 255) 0.705713px 2.91581px 0px,
    rgb(255, 255, 255) -0.287171px 2.98622px 0px,
    rgb(255, 255, 255) -1.24844px 2.72789px 0px,
    rgb(255, 255, 255) -2.07227px 2.16926px 0px,
    rgb(255, 255, 255) -2.66798px 1.37182px 0px,
    rgb(255, 255, 255) -2.96998px 0.42336px 0px,
    rgb(255, 255, 255) -2.94502px -0.571704px 0px,
    rgb(255, 255, 255) -2.59586px -1.50383px 0px,
    rgb(255, 255, 255) -1.96093px -2.27041px 0px,
    rgb(255, 255, 255) -1.11013px -2.78704px 0px,
    rgb(255, 255, 255) -0.137119px -2.99686px 0px,
    rgb(255, 255, 255) 0.850987px -2.87677px 0px,
    rgb(255, 255, 255) 1.74541px -2.43999px 0px,
    rgb(255, 255, 255) 2.44769px -1.73459px 0px,
    rgb(255, 255, 255) 2.88051px -0.838247px 0px;
}

.quiz-button {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  transition: 0.1s;
  cursor: pointer;
}

.quiz-button.disable {
  cursor: not-allowed;
  opacity: 0.5;
}

.quiz-button:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
  transition: 0.1s;
}

.quiz-progress-box {
  height: 5px;
  border: 1px solid #c7dded;
  background-color: #fff;
  border-radius: 2.5px;
}

.quiz-progress {
  width: 0%;
  height: 100%;
  background-color: #3277c9;
  border-radius: 2.5px;
}

.animation-progress {
  animation: progress 5s linear forwards;
  -webkit-animation: progress 5s linear forwards;
  -moz-animation: progress 5s linear forwards;
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
// #endregion

// #region Start page
.quiz-start-page {
  width: 100%;
  border: 1px solid #3277c9;
  border-radius: 5px;
}

.quiz-question-number {
  width: fit-content;
  background-color: #3277c9;
  border-radius: 5px;
  color: #fff;
  padding: 5px 12px;
}

.quiz-question-scroll {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.quiz-choice-button {
  color: #2c2c2c;
  border: 1px solid #2c2c2c;
  border-radius: 2px;
  padding: 10px 15px;
}

.quiz-choice-button:hover {
  background-color: #cdedff;
  cursor: pointer;
}

.quiz-choice-button:not(.selected):active {
  background-color: #ffc42c;
}
// #endregion

// #region Dialog Answer
.quiz-dialog-answer {
  width: 100%;
  min-height: 200px;
  max-height: fit-content;
  border-radius: 30px 30px 0px 0px;
}

.quiz-dialog-answer.incorrect {
  background-color: #ffdfe0;
}
.quiz-dialog-answer.correct {
  background-color: #d7ffb8;
}

.quiz-answer-container {
  max-width: 1000px;
  height: 100%;
}

// #endregion
</style>
