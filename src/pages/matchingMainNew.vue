<template>
  <q-page class="bg-matching" style="overflow: hidden">
    <div id="midground"></div>
    <div id="foreground"></div>

    <div>
      <app-bar
        :isShowHome="false"
        :isShowPause="isSynchronize ? null : true"
        :isHasInstruction="true"
        :isLoadPractice="isLoadPractice"
        :instructionData="instructionData"
        :isSynchronize="isSynchronize"
        @toggleEffect="toggleEffect"
        :systemStore="systemStore"
      ></app-bar>
    </div>

    <div
      class="relative-position box-container-main"
      :class="{ row: $q.platform.is.desktop }"
    >
      <div class="col-12">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>

      <div class="col-12 q-py-lg desktop-only">
        <!-- DESKTOP -->
        <div style="position: relative; z-index: 2" v-if="isLoadPractice">
          <div
            class="row justify-center"
            :class="{
              'items-center': verticalAlign == 2,
              'items-start': verticalAlign == 1,
              'items-end': verticalAlign == 3,
            }"
          >
            <div
              class="col relative-position animate__animated animate__slideInLeft"
              style="height: 150px; padding-left: 8%; animation-duration: 2s"
              align="center"
            >
              <div id="rocketQuestion" class="absolute row">
                <div
                  class="self-center"
                  @click="systemStore.playSound(questionList[current].audioURL)"
                  @mouseenter="systemStore.playSound(questionList[current].audioURL)"
                >
                  <q-btn
                    no-caps
                    text-color="white"
                    style="
                      height: 100px;
                      background-color: #541395;
                      border-radius: 10px;
                      border: 8px solid #f47908;
                      min-width: 200px;
                      font-size: 24px;
                    "
                  >
                    <q-btn
                      class="absolute-center"
                      style="
                        top: -5px;
                        border: 5px solid #f47908;
                        background-color: #541395;
                      "
                      round
                      icon="fas fa-volume-up"
                    ></q-btn>
                    {{ questionList[current].question }}
                  </q-btn>
                </div>
                <div class="self-center">
                  <q-img :src="rocketImg" class="rocketMove" style="width: 255px"></q-img>
                </div>
              </div>
            </div>
            <div
              class="col-5 relative-position animate__animated animate__slideInRight"
              style="animation-duration: 2s"
              align="left"
            >
              <div class="row">
                <div
                  class="col-12"
                  :class="index == 1 ? 'q-my-lg q-py-md' : ''"
                  v-for="(item, index) in questionList[current].choices"
                >
                  <div
                    v-ripple
                    class="relative-position text-white"
                    align="center"
                    :class="
                      practiceData.isSendAnswer
                        ? practiceData.currentChoiceIndex == item.index
                          ? practiceData.isCorrectAnswer
                            ? 'choice-btn-correct-pc text-black no-pointer-events'
                            : 'choice-btn-incorrect-pc text-red no-pointer-events'
                          : 'choice-btn-color-pc no-pointer-events'
                        : 'choice-btn-color-pc cursor-pointer'
                    "
                    style="
                      max-width: 400px;
                      width: 90%;
                      margin: auto;
                      font-size: 24px;
                      padding: 30px;
                    "
                    @mouseenter="activeChoices(index + 1)"
                    @click="checkAnswer(item)"
                  >
                    {{ item.choice }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 desktop-only"></div>

      <!-- MOBILE -->
      <div
        class="mobile-only q-pa-md q-py-lg q-mt-xl"
        align="center"
        style="
          max-width: 600px;
          width: 100%;
          position: relative;
          z-index: 2;
          margin: auto;
        "
        v-if="isLoadPractice"
      >
        <!-- @click="playVocabSound(questionList[current].audioURL)" -->

        <!-- Question -->
        <div align="center">
          <q-btn
            readonly=""
            no-caps
            text-color="black"
            style="
              background-color: #fee9d4;
              border-radius: 30px;
              border: 8px solid #d14e29;
              font-size: 24px;
              width: 100%;
            "
            @click="systemStore.playSound(questionList[current].audioURL)"
            flat
          >
            <div class="absolute-center" style="top: -5px">
              <q-btn
                class="relative-position bg-white"
                style="border: 5px solid #f47908"
                round
                icon="fas fa-volume-up"
                v-ripple
                @click="systemStore.playSound(questionList[current].audioURL)"
              ></q-btn>
            </div>
            {{ questionList[current].question }}
          </q-btn>
        </div>

        <!-- Choices -->
        <div class="q-mt-md">
          <div
            :class="practiceData.isSendAnswer ? 'no-pointer-events' : 'cursor-pointer'"
            class="q-my-md q-py-xs q-px-sm"
            v-for="(item, index) in questionList[current].choices"
            @click="checkAnswer(item)"
          >
            <multipleChoices-btn
              :choices="item"
              :practiceData="practiceData"
              :index="`matching-${index}`"
            ></multipleChoices-btn>
          </div>
        </div>
      </div>
    </div>

    <answer-action
      :systemStore="systemStore"
      @callback-nextquestion="nextQuestion()"
      @callback-restart="funcReStart()"
      :practiceData="practiceData"
      :isSynchronize="isSynchronize"
    ></answer-action>

    <learning-done
      :isShowLearningDone="isShowLearningDone"
      @callback-closedialog="
        (isShowLearningDone = false), $router.replace('/practice/list')
      "
    ></learning-done>

    <tutorial type="" :isShowTutorial="isShowTutorial" v-if="isLoadPractice"></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import { onMounted, ref, onBeforeUnmount, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
import appBar from "../components/app-bar.vue";
import tutorial from "../components/tutorial.vue";
import {
  funcPracticePermissionLog,
  db,
  funcFinishPractice,
  playSoundEffect,
  auth,
  saveCourseSyncData,
  analyticsLogEvent,
} from "src/router";
import answerAction from "../components/answer-action.vue";
import multipleChoicesBtn from "../components/button/multipleChoicesBtn.vue";
import finishPracticeDialog from "../components/finishPracticeDialog.vue";
import headerBar from "../components/header-time-progress.vue";
import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";

const CancelToken = axios.CancelToken;
let tokenAPI;

export default {
  components: {
    appBar,
    answerAction,
    multipleChoicesBtn,
    finishPracticeDialog,
    headerBar,
    learningDone,
    tutorial,
    loading,
  },
  props: {
    isSynchronize: {
      type: Boolean,
    },
    systemStore: {
      default: () => {},
    },
    studentStore: {
      dfefault: () => {},
    },
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const isShowLearningDone = ref(false);
    const isShowLoading = ref(false);

    const verticalAlign = ref(2);

    const isEnableActiveChoices = ref(true);
    const activeChoices = (val) => {
      if (!practiceData.isSendAnswer) {
        if (isEnableActiveChoices.value) {
          verticalAlign.value = val;
        }
      }
    };

    const practiceData = reactive({
      totalQuestion: 0,
      currentQuestion: 0,
      totalStar: 0,
      score: 0,
      correct: 0,
      incorrect: 0,
      level: 0,
      unit: 0,
      isSendAnswer: false,
      isCorrectAnswer: false,
      currentChoice: "",
      description: "",
      refs: [],
      isFinishPractice: false,
      currentAnswer: "",
      skill: "Vocabulary",
      isEnableSoundEffect: false,
      currentChoiceIndex: null,
      answers: [],
    });

    const instructionData = ref({
      eng: "Choose the Thai word that matches the English definition.",
      th: "เลือกคำศัพท์ภาษาไทยที่ตรงกับความหมายภาษาอังกฤษ",
    });

    const current = ref(0);

    const questionList = ref([]);

    function shuffle(array) {
      var currentIndex = array.length,
        temporaryValue,
        randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    const isLoadPractice = ref(false);

    const funcLoadPractice = async () => {
      isLoadPractice.value = false;

      try {
        let flashcardList = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await practiceHooks.practiceListInfo(practiceListId);

        practiceData.totalQuestion = getData.numOfPractice;
        practiceData.level = getData.level;
        practiceData.unit = getData.unit;

        let getFlashId = await db
          .collection("practiceList")
          .where("level", "==", getData.level)
          .where("unit", "==", getData.unit)
          .where("practiceType", "==", "flashcard")
          .where("status", "==", true)
          .get();

        const url = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

        const postData = {
          practiceListId: getFlashId.docs[0].id,
          requestURL: window.location.hash,
        };

        if (tokenAPI != undefined) tokenAPI();

        const response = await axios.post(url, postData, {
          cancelToken: new CancelToken(function executor(c) {
            tokenAPI = c;
          }),
        });

        flashcardList = response.data;

        let temp = [];

        for (let i = 0; i < flashcardList.length; i++) {
          let question = flashcardList[i].vocab;

          let choicesMap = flashcardList.map((x) => x.meaning);

          choicesMap.splice(i, 1);

          choicesMap = shuffle(choicesMap);

          let choices = [flashcardList[i].meaning, choicesMap[0], choicesMap[1]];

          choices = shuffle(choices);

          let findCorrectAnswerIndex = choices.indexOf(flashcardList[i].meaning);

          choices = choices.map((x, index) => {
            return { index: index, choice: x };
          });

          temp.push({
            question: question,
            choices: choices,
            correctAnswer: findCorrectAnswerIndex,
            isCorrect: false,
            audioURL: new Audio(flashcardList[i].soundVocabUrl),
          });
        }

        temp = shuffle(temp);

        temp = temp.slice(0, practiceData.totalQuestion);

        practiceData.answers = temp.map((x) => {
          return { isCorrect: false };
        });

        questionList.value = temp;

        isLoadPractice.value = true;
        isShowLoading.value = false;
      } catch (err) {
        alert(err);
        // console.log(`${err} Type Matching`);
        isShowLoading.value = false;
      }
    };

    const rocketImg = ref("/images/matching/normal.gif");
    const isAnswerAction = ref(false);
    const currentActiveChoice = ref(null);
    let answerStructure = [];
    const checkAnswer = async (items) => {
      if (!practiceData.isSendAnswer) {
        const practiceStore = usePracticeStore();
        practiceStore.saveProgressLog(
          `matching-${questionList.value[practiceData.currentQuestion].question}`,
          route.params.practiceListId
        );

        practiceData.currentChoiceIndex = items.index;
        if (isEnableActiveChoices.value) {
          let timeout = $q.platform.is.desktop ? 1000 : 0;

          const correctAnswer = questionList.value[current.value].correctAnswer;

          document.getElementById("rocketQuestion").classList.add("rocket");

          isEnableActiveChoices.value = false;
          practiceData.currentChoice =
            questionList.value[current.value].choices[
              practiceData.currentChoiceIndex
            ].choice;

          practiceData.currentAnswer =
            questionList.value[current.value].choices[correctAnswer].choice;

          if (practiceData.currentChoiceIndex == correctAnswer) {
            // console.log("ตอบถูก");

            // questionList.value[current.value].isCorrect = true;
            practiceData.isCorrectAnswer = true;
            // practiceData.correct++;
            practiceData.answers[current.value].isCorrect = true;

            setTimeout(() => {
              rocketImg.value = ref("/images/matching/true.gif");
              currentActiveChoice.value = practiceData.currentChoiceIndex;
            }, timeout);
          } else {
            // console.log("ตอบผิด");

            // questionList.value[current.value].isCorrect = false;
            practiceData.answers[current.value].isCorrect = false;
            practiceData.isCorrectAnswer = false;
            // practiceData.incorrect++;

            setTimeout(() => {
              rocketImg.value = ref("/images/matching/false.gif");
              currentActiveChoice.value = practiceData.currentChoiceIndex;
            }, timeout);
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

          let structure = {
            no: current.value,
            isCorrect: practiceData.isCorrectAnswer,
            answer: practiceData.currentChoice,
            answerIndex: practiceData.currentChoiceIndex,
            question: questionList.value[practiceData.currentQuestion].question,
          };

          answerStructure.push(structure);

          setTimeout(async () => {
            practiceData.isSendAnswer = true;

            if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
              isShowLoading.value = true;
              practiceData.isFinishPractice = true;

              if (!isSync.value) {
                practiceData.numOfPractice = await funcFinishPractice(
                  practiceData,
                  route.params.practiceListId,
                  $q.platform.is
                );
              }
            }

            if (isSync.value) {
              funcFinishPractice(
                practiceData,
                route.params.practiceListId,
                $q.platform.is
              );

              // กรณีเคส synchronize บันทึกข้อมูลสำหรับแสดงผลใน TAS ลงใน Course
              saveCourseSyncData(
                current.value,
                route.params.practiceListId,
                answerStructure,
                practiceData.score
              );
            }

            isShowLoading.value = false;
          }, timeout);
        }
      }
    };

    const nextQuestion = () => {
      practiceData.isSendAnswer = false;

      document.getElementById("rocketQuestion").classList.remove("rocket");

      rocketImg.value = "/images/matching/normal.gif";
      isEnableActiveChoices.value = true;
      currentActiveChoice.value = null;

      current.value++;

      practiceData.currentQuestion = current.value;
    };

    const funcReStart = async () => {
      isShowLoading.value = true;

      current.value = 0;
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.score = 0;
      practiceData.currentQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.isFinishPractice = false;
      practiceData.isSendAnswer = false;
      practiceData.currentChoiceIndex = null;

      isEnableActiveChoices.value = true;
      currentActiveChoice.value = null;
      document.getElementById("rocketQuestion").classList.remove("rocket");

      isShowTutorial.value = false;

      await funcLoadPractice();
    };

    let tempAudio;
    const playVocabSound = (url) => {
      if (tempAudio) {
        tempAudio.pause();
      }
      let audio = url;
      tempAudio = audio;
      tempAudio.currentTime = 0;
      tempAudio.volume = 0.5;
      tempAudio.play();
    };

    // เปิด / ปิดเสียง effect
    const toggleEffect = (val) => {
      practiceData.isEnableSoundEffect = val.val;
    };

    const isShowTutorial = ref(false);

    const funcLoadTutorial = async () => {
      let getData = props.studentStore.studentData;

      if (getData.tutorial) {
        let findTutorial = getData.tutorial.filter(
          (x) => x.routeName == route.name && x.practiceType == "matching"
        );

        if (!findTutorial.length) {
          isShowTutorial.value = true;
        }
      } else {
        isShowTutorial.value = true;
      }
    };

    let authListen;
    const isSync = ref(false);
    onMounted(() => {
      isShowLoading.value = true;

      props.systemStore.setRouter("matching");

      authListen = auth.onAuthStateChanged(async function (user) {
        if (user) {
          if (analyticsLogEvent != null) {
            analyticsLogEvent("/matching");
          }

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
            await funcLoadTutorial();
          } else {
            saveCourseSyncData(0, route.params.practiceListId, [], 0);
          }

          await funcLoadPractice();
        } else {
          // User is signed out.
          router.replace("/");
          1;
        }
      });
    });

    onBeforeUnmount(() => {
      if (authListen) {
        authListen();
      }

      if (tokenAPI != undefined) tokenAPI();

      questionList.value.forEach((res) => {
        res.audioURL = null;
      });
    });

    return {
      isShowLoading,
      isShowLearningDone,
      isShowTutorial,
      activeChoices,
      verticalAlign,
      practiceData,
      questionList,
      current,
      isLoadPractice,
      checkAnswer,
      rocketImg,
      isAnswerAction,
      nextQuestion,
      currentActiveChoice,
      funcReStart,
      playVocabSound,
      toggleEffect,
      instructionData,
      playSoundEffect,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-matching {
  background-image: url("/images/matching/bg-space-1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center;
}

.rocket {
  animation: moveRocket linear 1s forwards;
  width: 500px;
  white-space: nowrap;
}

.choice-btn-color-pc {
  background-color: #541395;
  border: 10px solid #9731fe;
  box-shadow: 0px 5px 0px 0px #6e1ebd;
  border-radius: 10px;
}

.choice-btn-color-pc:hover {
  background-color: #00587d;
  border: 10px solid #00b2ff;
  box-shadow: 0px 5px 0px 0px #005275;
  border-radius: 10px;
}

.choice-btn-correct-pc {
  background-color: #80ddcc;
  border: 10px solid #3ac2aa;
  box-shadow: 0px 5px 0px 0px #159c82;
  border-radius: 10px;
}

.choice-btn-incorrect-pc {
  background-color: #ffdfe0;
  border: 10px solid #ff4b4b;
  box-shadow: 0px 5px 0px 0px #c61414;
  border-radius: 10px;
}

.btn-bg {
  background: linear-gradient(180deg, #ffd056 0%, #eea318 100%);
  box-shadow: 0px 5px 0px 0px #db8200;
}

.choice-btn-correct {
  background-color: #80ddcc;
  box-shadow: 0px 5px 0px 0px #159c82;
}

.choice-btn-incorrect {
  background-color: #ffadad;
  box-shadow: 0px 5px 0px 0px #ff5d5d;
}

.rocketMove {
  position: relative;
  animation: rocketMove linear 0.5s infinite alternate;
}

@keyframes rocketMove {
  100% {
    transform: translateY(5px);
  }
}

@keyframes moveRocket {
  from {
    right: 50%;
  }
  to {
    right: 0%;
  }
}

@keyframes STAR-MOVE {
  to {
    left: -10000px;
    top: -2000px;
  }
}

#midground {
  background: url(/images/spellingbee/midground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  animation-name: STAR-MOVE;
  animation-duration: 500s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 500s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#foreground {
  background: url(/images/spellingbee/foreground-star.png) repeat 0% 0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  animation-name: STAR-MOVE;
  animation-duration: 300s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 300s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

.btn-choice {
  border-radius: 10px;
  // box-shadow: 2px 3px 0px 0px #4935018f;
}

.circle-1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
.circle-2 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}
</style>
