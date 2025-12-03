<template>
  <q-page class="bg-multiplevocab">
    <div id="midground"></div>
    <div id="foreground"></div>

    <div>
      <app-bar
        :isHasHelp="$q.platform.is.mobile ? true : false"
        :isHasInstruction="true"
        :instructionData="instructionData"
        :isShowHome="false"
        :isShowPause="isSynchronize ? false : true"
        :isLoadPractice="isLoadPractice"
        :isSynchronize="isSynchronize"
        @toggleEffect="toggleEffect"
        @callback-showdialoghelp="isShowDialogHelp = true"
        :systemStore="systemStore"
      ></app-bar>
    </div>

    <multiplevocab-pc
      :practiceData="practiceData"
      @callback-sendanswer="fucnSendAnswer"
      v-if="$q.platform.is.desktop && isLoadPractice"
      class="box-container-main"
    ></multiplevocab-pc>

    <multiplevocab-mobile
      :practiceData="practiceData"
      @callback-sendanswer="fucnSendAnswer"
      v-if="$q.platform.is.mobile && isLoadPractice"
    ></multiplevocab-mobile>

    <!-- Help Popup -->
    <q-dialog maximized v-model="isShowDialogHelp" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row">
          <div class="box-dialog-lesson col-12 self-center">
            <div
              class="relative-position text-white row"
              style="
                max-width: 800px;
                width: 100%;
                background-color: #2d3081;
                color: #f3ab14;
                border: 1px solid#2d3081;
                margin: auto;
              "
              align="center"
            >
              <div class="col" style="padding: 10px">
                <span class="f16">คำศัพท์</span>
              </div>
            </div>
            <div class="box-content-extra">
              <div class="row bg-white">
                <div
                  v-for="(vocab, index) in practiceData.extraVocab"
                  :key="index"
                  :class="
                    practiceData.extraVocab.length == 1
                      ? 'col-12'
                      : 'col-sm-6 col-xs-12'
                  "
                  class="self-start"
                >
                  <div class="q-pa-sm" style="border: 1px solid #c4c4c4">
                    <div>
                      <span v-html="vocab.vocab"></span>
                      <span v-if="vocab.partOfSpeech.partOfSpeech != 'ไม่ระบุ'">
                        ({{ vocab.partOfSpeech.partOfSpeech }})
                      </span>
                    </div>
                    <div>
                      <span v-html="vocab.meaning"></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div
                  v-close-popup
                  class="bg-amber-7"
                  style="padding: 10px"
                  align="center"
                >
                  ปิด
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <answer-action
      :systemStore="systemStore"
      :practiceData="practiceData"
      @callback-nextquestion="funcSelectedQuestion(false)"
      @callback-restart="funcReStart()"
      :isSynchronize="isSynchronize"
    ></answer-action>

    <learning-done
      :isShowLearningDone="isShowLearningDone"
      @callback-closedialog="
        (isShowLearningDone = false), $router.replace('/practice/list')
      "
    ></learning-done>

    <tutorial
      type=""
      :isShowTutorial="isShowTutorial"
      v-if="isLoadPractice"
      :skill="practiceData.skill"
    ></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import multiplevocabPc from "../components/multiplevocab/multiplevocabPc.vue";
import multiplevocabMobile from "../components/multiplevocab/multiplevocabMobile.vue";
import appBar from "../components/app-bar.vue";
import { reactive, onMounted, ref, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
import tutorial from "../components/tutorial.vue";
import studentHooks from "../hooks/gameHooks";
import {
  analyticsLogEvent,
  apiURL,
  auth,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import answerAction from "../components/answer-action.vue";
import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";

const CancelToken = axios.CancelToken;
let tokenAPIFlashcard;
let tokenAPIPractice;

export default {
  components: {
    multiplevocabPc,
    multiplevocabMobile,
    appBar,
    answerAction,
    learningDone,
    tutorial,
    loading,
  },
  props: {
    isSynchronize: {
      type: Boolean,
      default: false,
    },
    systemStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
    studentStore: {
      default: () => {},
    },
  },

  setup(props) {
    // Initial Data
    const isLoadPractice = ref(false);
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const tab = ref("vocab");
    const isShowLearningDone = ref(false);
    const isShowLoading = ref(false);

    // Initial Practice Data
    const instructionData = ref({
      eng: "Choose the best answer to fill in the blank.",
      th: "เลือกคำตอบที่เหมาะสมที่สุดเพื่อเติมลงในช่องว่าง",
    });
    const questionList = ref([]);
    const isShowDialogHelp = ref(false);

    // ข้อมูลแบบฝึกหัด
    const practiceData = reactive({
      answers: [],

      // Current Practice Details
      currentQuestion: 0,
      totalQuestion: 0,
      totalStar: 0,
      score: 0,
      correct: 0,
      incorrect: 0,
      extraVocab: [],
      skill: "Vocabulary",
      isEnableSoundEffect: false,
      numOfPractice: 0,
      level: 0,
      unit: 0,

      // use current question
      correctAnswer: 0,
      question: "",
      choices: [],
      description: "",
      refs: [],

      // use current answer
      isSendAnswer: false,
      isCorrectAnswer: false,
      isFinishPractice: false,
      currentChoiceIndex: null,
      currentAnswer: "",
      currentChoice: "",
    });

    // const isHasHelp = ref(true);
    // const isHasInstruction = ref(true);

    // โหลดข้อมูลแบบฝึกหัด
    const funcLoadPractice = async () => {
      isLoadPractice.value = false;

      try {
        let multipleList = [];

        // เก็บ practice list id จาก router
        let practiceListId = route.params.practiceListId;

        // ดึงข้อมูล practice list
        let getData = await practiceHooks.practiceListInfo(practiceListId);

        // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
        practiceData.totalQuestion = getData.numOfPractice;
        practiceData.level = getData.level;
        practiceData.unit = getData.unit;

        const flashcardUrl = `${process.env.API}/getFlashcardId`;

        const postFlashcardData = {
          level: getData.level,
          unit: getData.unit,
        };

        let responseFlashcard = await axios.post(
          flashcardUrl,
          postFlashcardData
        );

        const flashcardListUrl = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

        const postFlashcardKey = {
          practiceListId: responseFlashcard.data,
          requestURL: window.location.hash,
        };

        if (tokenAPIFlashcard != undefined) tokenAPIFlashcard();

        responseFlashcard = await axios.post(
          flashcardListUrl,
          postFlashcardKey,
          {
            cancelToken: new CancelToken(function executor(c) {
              tokenAPIFlashcard = c;
            }),
          }
        );

        let tempFlashcard = responseFlashcard.data.sort(
          (a, b) => Number(a.order) - Number(b.order)
        );

        practiceData.extraVocab = tempFlashcard;

        // Get Api
        const practiceUrl = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

        const postPracticeData = {
          practiceListId: practiceListId,
          requestURL: window.location.hash,
        };

        if (tokenAPIPractice != undefined) tokenAPIPractice();

        const response = await axios.post(practiceUrl, postPracticeData, {
          cancelToken: new CancelToken(function executor(c) {
            tokenAPIPractice = c;
          }),
        });

        // เก็บข้อมูลที่ได้จาก axios
        multipleList = response.data;

        // เก็บข้อมูลที่ได้จาก axios
        let setExtraVocab = response.data;

        // copy แบบฝึกหัด
        let setPracticeList = [...multipleList];

        // เก็บคำศัพท์เสริม
        // setExtraVocab = setExtraVocab.map((x) => x.extraVocab).filter((x) => x.length);

        // let tempExtra = [];

        // // เอาคำศัพท์เสริมที่ได้มาต่อกัน
        // setExtraVocab.forEach((res) => {
        //   tempExtra.push(...res);
        // });

        // tempExtra.sort((a, b) => (a.vocab > b.vocab ? 1 : -1));

        // สุ่มคำตอบของแต่ละข้อ
        setPracticeList = setPracticeList.map((x) => {
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
        await funcSelectedQuestion(true);
        isLoadPractice.value = true;
        isShowLoading.value = false;
      } catch (error) {
        // console.log(`${error} : Function Load Practice`);
        isShowLoading.value = false;
      }
    };

    // เลือกแบบฝึกหัดเมื่อมีการเปลื่ยนข้อ หรือ โหลดข้อมูลครั้งแรก
    const funcSelectedQuestion = (firstTime) => {
      firstTime = firstTime || false;

      if (!firstTime) {
        practiceData.currentQuestion++;
      }

      // Practice Data : Show Question
      practiceData.question =
        questionList.value[practiceData.currentQuestion].question;

      // Practice Data : Show Choices
      practiceData.choices =
        questionList.value[practiceData.currentQuestion].choices;

      // Practice Data : Show Description
      practiceData.description =
        questionList.value[practiceData.currentQuestion].description;

      // Practice Data : Correct Answer
      practiceData.correctAnswer =
        questionList.value[practiceData.currentQuestion].correctAnswer;

      let tempExtra = questionList.value[
        practiceData.currentQuestion
      ].extraVocab.map((x) => {
        let newData = {
          sort: x.vocab.toLowerCase(),
          ...x,
        };
        return newData;
      });

      tempExtra.sort((a, b) => (a.sort > b.sort ? 1 : -1));

      // เก็บข้อมูลคำศัพท์เสริม
      practiceData.extraVocab = tempExtra;

      practiceData.isSendAnswer = false;
      practiceData.currentChoiceIndex = null;
    };

    let answerStructure = [];
    // ส่งคำตอบมาว่าเป็นจริงหรือเท็จ
    const fucnSendAnswer = async (items) => {
      if (!practiceData.isSendAnswer) {
        const practiceStore = usePracticeStore();

        practiceStore.saveProgressLog(
          questionList.value[practiceData.currentQuestion].id,
          route.params.practiceListId
        );

        practiceData.currentChoiceIndex = items.index;

        practiceData.isSendAnswer = true;

        let currentChoice = practiceData.choices.filter(
          (x) => x.index == practiceData.currentChoiceIndex
        )[0].choice;

        let currentAnswer = practiceData.choices.filter(
          (x) => x.index == practiceData.correctAnswer
        )[0].choice;

        if (practiceData.correctAnswer == practiceData.currentChoiceIndex) {
          practiceData.isCorrectAnswer = true;
          practiceData.answers[practiceData.currentQuestion].isCorrect = true;
          // practiceData.correct++;
        } else {
          practiceData.isCorrectAnswer = false;
          practiceData.answers[practiceData.currentQuestion].isCorrect = false;
          // practiceData.incorrect++;
        }

        practiceData.currentChoice = currentChoice;
        practiceData.currentAnswer = currentAnswer;

        practiceData.correct = practiceData.answers.filter(
          (x) => x.isCorrect
        ).length;

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

        if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
          isShowLoading.value = true;
          practiceData.isFinishPractice = true;

          if (!isSync.value) {
            practiceData.numOfPractice = await funcFinishPractice(
              practiceData,
              route.params.practiceListId,
              $q.platform.is
            );

            // console.log(practiceData.numOfPractice);
          }
        }

        if (isSync.value) {
          // isShowLoading.value = true;
          funcFinishPractice(
            practiceData,
            route.params.practiceListId,
            $q.platform.is
          );

          // กรณีเคส synchronize บันทึกข้อมูลสำหรับแสดงผลใน TAS ลงใน Course
          saveCourseSyncData(
            practiceData.currentQuestion,
            route.params.practiceListId,
            answerStructure,
            practiceData.score
          );
          // isShowLoading.value = false;
        }

        isShowLoading.value = false;
      }
    };

    const funcReStart = async () => {
      isShowLoading.value = true;

      practiceData.totalQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.question = [];
      practiceData.choices = [];
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.currentQuestion = 0;
      practiceData.currentChoiceIndex = null;
      practiceData.isSendAnswer = false;
      practiceData.isFinishPractice = false;

      isShowTutorial.value = false;

      await funcLoadPractice();
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
          (x) => x.routeName == route.name && x.practiceType == "multiplevocab"
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

      props.systemStore.setRouter("multiplevocab");

      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          if (analyticsLogEvent != null) {
            analyticsLogEvent("/multiplevocab");
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
            await funcLoadTutorial();
          } else {
            saveCourseSyncData(0, route.params.practiceListId, [], 0);
          }

          await funcLoadPractice();
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    onBeforeUnmount(() => {
      if (authListen) authListen();

      if (tokenAPIFlashcard != undefined) tokenAPIFlashcard();
      if (tokenAPIPractice != undefined) tokenAPIPractice();
    });

    return {
      isShowLoading,
      isShowTutorial,
      tab,
      isShowDialogHelp,
      practiceData,
      funcSelectedQuestion,
      isLoadPractice,
      instructionData,
      isShowLearningDone,
      // isHasHelp,
      // isHasInstruction,
      fucnSendAnswer,
      funcReStart,
      toggleEffect,
      questionList,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-multiplevocab {
  background-image: url("/images/multiplevocab/bg-space.png");
  // background-attachment: fixed;
  background-size: cover;
  background-position: bottom center;
  background-color: #252a52;
  width: 100%;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.box-instruction-pc {
  background-color: transparent;
  width: 80%;
  height: 45%;
  bottom: 5px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-instruction-mobile {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 20px;
  margin: auto;
  font-size: 16px;
  font-weight: bold;
  color: #000;
}

.box-finish {
  background-color: transparent;
  width: 80%;
  height: 55%;
  bottom: 16px;
  margin: auto;
  font-size: 16px;
  color: #000;
}

.btn-start {
  background-image: url("/images/btn-start.png");
  background-repeat: no-repeat;
  width: 200px;
  height: 40px;
}

.box-extravocab {
  max-width: 600px;
  min-width: 290px;
  width: 100%;
}

.box-header-extravocab {
  background-color: #9f220c;
  color: #f3ab14;
  border-radius: 7px 7px 0px 0px;
}

.header-extravocab-active {
  background-color: #9f220c;
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

.box-content-extra {
  max-width: 800px;
  width: 100%;
  height: 370px;
  margin: auto;
  overflow: auto;
}
</style>
