<template>
  <q-page class="bg-translation">
    <div>
      <app-bar
        :isShowPause="true"
        @toggleEffect="toggleEffect"
        @toggleMusic="toggleMusic"
        :systemStore="systemStore"
      ></app-bar>
    </div>

    <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner color="primary" size="100px" />
    </div>

    <div class="box-container-main" v-if="isLoadPractice">
      <div class="bg-clozetest full-width">
        <div class="q-pb-lg">
          <div align="center">
            <div
              class="relative-position"
              style="position: sticky; top: 50px; z-index: 2"
              :style="
                $q.platform.is.desktop ? '' : 'background-color: #c7feff;'
              "
            >
              <div>
                <header-bar
                  :setFontSize="fontSize"
                  @decreaseFont="decreaseFont"
                  @increaseFont="increaseFont"
                  @playSound="playSound"
                  :practiceData="practiceData"
                ></header-bar>
              </div>
            </div>
            <div style="max-width: 1000px" class="q-mt-md">
              <div
                class=""
                :style="
                  $q.platform.is.desktop
                    ? 'margin-top: -40px'
                    : 'padding-top:0px;'
                "
                align="center"
              >
                <q-img
                  style="max-width: 400px; width: 100%"
                  src="/images/translation/label-translation.png"
                >
                  <div class="transparent absolute-center fit">
                    <span class="f20" v-html="practiceData.nameEng"> </span>
                  </div>
                </q-img>
              </div>
              <div class="q-pa-sm">
                <q-img
                  width="100%"
                  src="/images/translation/header-question.png"
                ></q-img>
              </div>
              <div
                class="q-px-lg"
                :style="
                  $q.platform.is.desktop
                    ? 'margin-top: -100px'
                    : 'margin-top: -50px'
                "
              >
                <div class="box-container-reading q-pa-md q-py-lg q-pb-xl">
                  <div
                    :style="
                      $q.platform.is.desktop ? 'height: 60px' : 'height:20px;'
                    "
                  ></div>
                  <div
                    class="q-mt-sm box-content"
                    :class="$q.platform.is.desktop ? 'q-px-lg' : 'q-px-md'"
                    align="left"
                  >
                    <span
                      v-for="(item, index) in practiceData.question"
                      v-if="!isShowContentAnswer"
                    >
                      <span
                        :style="`font-size:${fontSize}px;`"
                        v-html="item.text"
                        v-if="!item.isAnswer"
                      ></span>
                      <span
                        v-if="item.isAnswer"
                        :class="
                          practiceData.currentQuestion + 1 ==
                            item.indexCurrentQuestion && item.isAnswer
                            ? 'box-btn-selected'
                            : 'box-btn-not-selected'
                        "
                        v-html="item.html"
                      ></span>
                    </span>
                    <span
                      :style="`font-size:${fontSize}px;`"
                      v-html="`${practiceData.contentEng}`"
                      v-if="isShowContentAnswer"
                    ></span>
                  </div>
                </div>
              </div>
            </div>

            <div align="center">
              <div class="q-px-lg" style="max-width: 1000px">
                <div
                  class="box-description q-my-md q-px-md q-pb-md"
                  v-show="isShowContentAnswer"
                >
                  <div class="q-pt-md">
                    <div class="q-pa-md q-pb-lg" align="center">
                      <span class="f24" v-html="practiceData.nameTh"> </span>
                    </div>
                    <div class="q-pa-md" align="left">
                      <span
                        class="f16"
                        v-html="`${practiceData.contentTh}`"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="q-py-md" v-show="isShowContentAnswer">
              <q-btn
                class="bg-amber-5"
                label="ออกจากแบบฝึกหัด"
                @click="isShowFinishPracticeDialog = true"
              ></q-btn>
            </div>
          </div>
        </div>
      </div>

      <div align="center" class="q-pt-lg q-pb-md" v-if="!isShowContentAnswer">
        <div class="q-pa-md">
          <div class="box-container-content row">
            <div
              class="col-sm-6 col-xs-12 q-pa-sm"
              v-for="(item, index) in practiceData.choices"
              :key="index"
              @click="isSendAnswer ? null : funcSendAnswer(item, index)"
            >
              <multiple-choices
                :isDisable="isSendAnswer"
                :choice="item.choice"
              ></multiple-choices>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- show answer platfom desktop -->
    <answer-action
      :systemStore="systemStore"
      :isAnswerAction="isSendAnswer"
      :answerData="answerData"
      :isFinishPractice="isFinishPractice"
      @callback-nextquestion="funcNextQuestion()"
      @callback-finishpractice="isShowContentAnswer = true"
    ></answer-action>

    <finish-practice
      :isFinishPractice="isShowFinishPracticeDialog"
      @reStart="reStart"
      :isShowRestartBtn="isShowRestartBtn"
      @finish="finish"
      :numOfPractice="numOfPractice"
      :totalStar="totalStar"
    ></finish-practice>
  </q-page>
</template>

<script>
import questionNumber from "../components/button/btn-current-choices.vue";
import multipleChoices from "../components/button/multipleChoicesBtn.vue";
import appBar from "../components/app-bar.vue";
import finishPractice from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress.vue";
import practiceHooks from "../hooks/practiceHooks";
import answerAction from "../components/answer-action.vue";

import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { apiURL, auth, db, playSoundEffect } from "src/router";
import { useQuasar } from "quasar";
import axios from "axios";
export default {
  components: {
    questionNumber,
    appBar,
    headerBar,
    finishPractice,
    multipleChoices,
    answerAction,
    // answerActionMobile,
  },
  props: {},
  setup(props) {
    // Initial Data
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const showContent = ref(false);

    const practiceData = reactive({
      totalQuestion: 10,
      currentQuestion: 0,
      question: "",
      contentEng: "",
      contentTh: "",
      choices: [],
      correctAnswer: 0,
      nameEng: "",
      nameTh: "",
    });

    const answerData = ref({});

    const isLoadPractice = ref(false);

    // Font Size
    const fontSize = ref(16);

    const decreaseFont = () => {
      fontSize.value++;
    };

    const increaseFont = () => {
      fontSize.value--;
    };

    // Question List
    const questionList = ref([]);

    const funcLoadPractice = async () => {
      try {
        let tempPractice = [];

        // Set Practice ID
        let practiceListId = route.params.practiceListId;

        // Get Practice List
        let getData = await db
          .collection("practiceList")
          .doc(practiceListId)
          .get();

        // Practice Data : Show Total Question
        practiceData.totalQuestion = getData.data().numOfPractice;

        // Get Practice Name
        let getPracticenName = await practiceHooks
          .practice(getData.data().level)
          .practiceName();

        // Filter Level and Unit
        getPracticenName = getPracticenName.filter(
          (x) => x.unit == getData.data().unit && x.skill == "Writing"
        )[0];

        practiceData.nameEng = getPracticenName.nameEng;

        practiceData.nameTh = getPracticenName.nameTh;

        // Get Practice Data
        const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

        const postData = {
          practiceListId: practiceListId,
          requestURL: window.location.hash,
        };

        const response = await axios.post(apiURL, postData);

        // เก็บข้อมูลที่ได้จาก axios
        tempPractice = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = tempPractice[0];

        setPracticeList.answer = setPracticeList.answer.map((x) => {
          let newChoice = x.choice.map((xx, index) => {
            let newData = {
              choice: xx,
              index: null,
            };

            newData.index = index;

            xx = { ...newData };

            return xx;
          });

          let choices = newChoice.sort(() => Math.random() - 0.5);

          x.choice = choices;

          return x;
        });

        // สุ่มแบบฝึกหัด
        // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

        questionList.value = setPracticeList;

        practiceData.contentEng = questionList.value.sentenceEng;

        practiceData.contentTh = questionList.value.sentenceTh;

        let setNewQuestion = questionList.value.sentenceEng.split(
          /<s*u[^>]*>(.*?)<\/s*u>/gm
        );

        let findQuestionAnswer = questionList.value.sentenceEng.match(
          /<s*u[^>]*>(.*?)<\/s*u>/gm
        );

        let tempQuestion = [];

        let countAnswer = 0;

        for (let i = 0; i < setNewQuestion.length; i++) {
          let newData = {
            isAnswer: false,
            text: setNewQuestion[i],
            currentAnswer: "",
            html: "",
            indexCurrentQuestion: 0,
          };

          for (let x = 0; x < findQuestionAnswer.length; x++) {
            let removeTag = findQuestionAnswer[x]
              .replace(/<s*u>/g, "")
              .replace(/<s*\/u>/g, "");

            practiceData.contentEng = practiceData.contentEng.replace(
              /<s*u[^>]*>(.*?)<\/s*u>/,
              `<span style="background-color:#9CDC83;padding:0px 5px;">${removeTag}</span>`
            );

            if (removeTag == setNewQuestion[i]) {
              countAnswer++;
              newData.indexCurrentQuestion = countAnswer;
              newData.isAnswer = true;
              newData.html = `<span class="relative-position q-py-xs q-ma-xs" style="">${countAnswer}</span>`;
              findQuestionAnswer.splice(x, 1);
              break;
            }
          }

          tempQuestion.push(newData);
        }

        practiceData.question = tempQuestion;

        funcSelectedQuestion(true);

        isLoadPractice.value = true;
      } catch (error) {
        // console.log(`${error} : Function Load Practice`);
      }
    };

    const funcSelectedQuestion = (firsttime) => {
      firsttime = firsttime || false;

      if (!firsttime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Total Question
      practiceData.totalQuestion = questionList.value.answer.length;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value.answer[practiceData.currentQuestion].choice;

      practiceData.description =
        questionList.value.answer[practiceData.currentQuestion].description ||
        "";
    };

    const isShowContentAnswer = ref(false);

    const funcNextQuestion = () => {
      isSendAnswer.value = false;
      isDescription.value = false;

      funcSelectedQuestion();
    };

    const isSendAnswer = ref(false);
    const isDescription = ref(false);
    const isCorrectAnswer = ref(false);
    const currentAnswer = ref(null);
    const isFinishPractice = ref(false);

    const isShowFinishPracticeDialog = ref(false);

    const showAnswer = ref("");
    const totalCorrect = ref(0);

    const funcSendAnswer = (item, index) => {
      isSendAnswer.value = true;

      currentAnswer.value = index;

      if (practiceData.correctAnswer == item.index) {
        isCorrectAnswer.value = true;
        totalCorrect.value++;
      } else {
        isCorrectAnswer.value = false;
      }

      showAnswer.value = practiceData.choices.filter(
        (x) => x.index == practiceData.correctAnswer
      )[0].choice;

      if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
        isFinishPractice.value = true;
        funcFinishPractice();
      }

      if (isEnableSoundEffect.value) {
        if (isCorrectAnswer.value) {
          // playSoundEffect("correct");
        } else {
          // playSoundEffect("incorrect");
        }
      }

      answerData.value = {
        currentAnswer: item.choice,
        answer: showAnswer.value,
        isCorrectAnswer: isCorrectAnswer.value,
        description: "",
      };
    };

    const reStart = () => {
      isFinishPractice.value = false;
      isShowFinishPracticeDialog.value = false;
      isLoadPractice.value = false;
      isSendAnswer.value = false;
      isDescription.value = false;
      isShowContentAnswer.value = false;

      practiceData.totalQuestion = 0;
      practiceData.star = 0;
      practiceData.question = "";
      practiceData.choices = [];
      practiceData.currentQuestion = 0;
      totalCorrect.value = 0;

      funcLoadPractice();
    };

    const isShowRestartBtn = ref(true);
    const numOfPractice = ref(0);
    const totalStar = ref(0);
    const funcFinishPractice = async (val) => {
      // console.log("finish");
      $q.loading.show();
      // UID
      try {
        const uid = await auth.currentUser.uid;

        const score = (totalCorrect.value / practiceData.totalQuestion) * 100;
        const star = score >= 80 ? 3 : score >= 65 ? 2 : score >= 50 ? 1 : 0;
        const url = `${process.env.API}/saveLog`;
        const practiceLogData = {
          practiceListId: route.params.practiceListId,
          studentId: uid,
          score: score,
          star: star,
          coin: totalCorrect.value,
        };
        totalStar.value = star;

        const response = await axios.post(url, practiceLogData);

        numOfPractice.value = response.data;

        if (response.data == "2") {
          isShowRestartBtn.value = false;
        }

        isShowFinishPracticeDialog.value = true;

        // backgroundAudio.pause();
        if (isEnableSoundEffect.value) {
          if (score >= 50) {
            // playSoundEffect("pass");
          } else {
            // playSoundEffect("fail");
          }
        }

        $q.loading.hide();
      } catch (error) {
        console.error(error);
        $q.loading.hide();
      }
    };

    const checkPracticePermission = async () => {
      $q.loading.show();
      try {
        const uid = await auth.currentUser.uid;
        const courseId = await practiceHooks.getCourseId(uid);

        const permission = await practiceHooks.checkPracticePermission(
          courseId,
          route.params.practiceListId
        );

        if (!permission) {
          $q.notify({
            message: "คุณทำแบบฝึกหัดครบตามจำนวนครั้งแล้ว",
            color: "red",
          });
          router.replace("/practice/list");
        }
        $q.loading.hide();
      } catch (error) {
        $q.loading.hide();
        console.error(error);
      }
    };

    const isEnableSoundEffect = ref(true);

    // เปิด / ปิดเสียง effect
    const toggleEffect = (val) => {
      if (val.val) {
        isEnableSoundEffect.value = true;
      } else {
        isEnableSoundEffect.value = false;
      }
    };

    // เปิด / ปิด เสียง background
    const toggleMusic = (val) => {
      if (val.val) {
        // backgroundAudio.play();
        // console.log("play");
      } else {
        // backgroundAudio.pause();
        // console.log("pause");
      }
    };

    onMounted(() => {
      checkPracticePermission();
      funcLoadPractice();
    });

    return {
      practiceData,
      decreaseFont,
      increaseFont,
      currentAnswer,
      fontSize,
      showAnswer,
      showContent,
      answerData,

      //
      isLoadPractice,
      isSendAnswer,
      isCorrectAnswer,
      isDescription,
      isFinishPractice,
      isShowFinishPracticeDialog,
      isShowContentAnswer,
      totalCorrect,
      numOfPractice,
      totalStar,

      // Function
      funcSendAnswer,
      funcNextQuestion,
      reStart,
      funcFinishPractice,
      isShowRestartBtn,

      // Appbar
      isEnableSoundEffect,
      toggleEffect,
      toggleMusic,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-translation {
  background-image: url("/images/translation/bg-writing.png");
  background-size: contain;
}

.bg-clozetest {
  background-image: url("/images/translation/bg-translation.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
}

.box-question {
  max-width: 1000px;
  width: 100%;
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-container-reading {
  max-width: 1000px;
  background-color: #d5f3fc;
  border-radius: 10px;
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

.animation-rotate {
  animation: rotateLight 3s linear infinite;
  transform: rotate(0deg);
  transform-box: fill-box;
  transform-origin: center;
}

@keyframes rotateLight {
  to {
    transform: rotate(360deg);
  }
}

.box-description {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-color: #99e2f6e0;
  border: 2px solid #fff;
  color: #005f80;
}

.box-description::after {
  position: absolute;
  content: "";
  top: 38px;
  right: 5px;
  width: 8px;
  height: 10px;
  background-color: #fff;
  border-radius: 50%;
}

.box-description::before {
  position: absolute;
  content: "";
  top: 5px;
  right: 5px;
  width: 8px;
  height: 30px;
  background-color: #fff;
  border-radius: 20px;
}

.box-btn-selected {
  display: inline-block;
  border: 1px dashed;
  width: 100px;
  text-align: center;
  border-radius: 10px;
  background-color: #f8ca72;
  padding: 3px;
  margin: 5px;
}

.box-btn-not-selected {
  display: inline-block;
  border-bottom: 1px dashed;
  width: 100px;
  text-align: center;
}
</style>
