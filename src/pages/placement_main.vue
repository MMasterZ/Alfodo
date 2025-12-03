<template>
  <q-page class="backdrop-placement row justify-center items-center">
    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="`background-placement`"></background-main>

      <!-- #region Item Props -->
      <div class="absolute-center fit">
        <div class="absolute-top-left" style="width: 10%; top: 15%; left: -1.2%">
          <div class="relative-position">
            <q-img no-spinner no-transition class="absolute"
              :src="`/images/placement_main/diamond-shadow.png?${tempCacheImage}`"></q-img>
            <q-img no-spinner no-transition :src="`/images/placement_main/diamond.gif?${tempCacheImage}`"></q-img>
          </div>
        </div>

        <div class="absolute-bottom-right" style="width: 17.5%; bottom: 8.7%; right: 2%">
          <div class="relative-position">
            <q-img no-spinner no-transition class="absolute"
              :src="`/images/placement_main/compass-shadow.png?${tempCacheImage}`"></q-img>
            <q-img no-spinner no-transition :src="`/images/placement_main/compass.gif?${tempCacheImage}`"></q-img>
          </div>
        </div>

        <div class="absolute-bottom-left" style="width: 31%; bottom: -9.3%; left: -8.8%">
          <q-img no-spinner no-transition
            :src="`/images/placement_main/placement-item-3.png?${tempCacheImage}`"></q-img>
        </div>

        <div class="absolute-top-right" style="width: 27.5%; top: 8%; right: -5.3%">
          <q-img no-spinner no-transition
            :src="`/images/placement_main/placement-item-1.png?${tempCacheImage}`"></q-img>
        </div>

        <div class="absolute-bottom-left" style="width: 19%; bottom: -2.6%; left: 15.7%">
          <q-img no-spinner no-transition
            :src="`/images/placement_main/placement-item-2.png?${tempCacheImage}`"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Placement Content -->
      <div class="absolute-center fit" v-if="!placementData.isFinish">
        <div class="absolute-center box-placement-main">
          <div class="relative-position animate__animated animate__zoomInUp animate__delay-1s"
            style="animation-duration: 1s">
            <div class="absolute-center box-backdrop-placement" v-if="isStartPlacement">
              <div class="box-backdrop-question"></div>
            </div>

            <q-img src="/images/box_main/box-placement-content.png" no-spinner no-transition></q-img>

            <!-- #region Section Start -->
            <div class="absolute-center fit row justify-center items-center" v-if="!isStartPlacement">
              <div class="col-12" style="margin-top: 5%" align="center">
                <div class="font-mali-b text-start-placement">
                  ถ้าพร้อมแล้วกด “START” เพื่อเริ่มได้เลย
                </div>
                <div class="box-button-start-placement">
                  <q-img class="button-active-main" src="/images/button_main/button-start-placement.png" no-spinner
                    no-transition @click="funcStartPlacement()"></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Start Placement -->
            <div class="absolute-center box-start-placement-container" v-if="isStartPlacement" align="center">
              <div class="box-placement-question" align="left">
                <!-- #region Button Language -->
                <div align="right">
                  <div class="box-button-change-language">
                    <q-img class="button-active-main"
                      :src="`/images/button_main/button-change-language-${language}.png`" no-spinner="" no-transition=""
                      @click="funcChangeLanguage()"></q-img>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Instruction -->
                <div class="font-mali-m box-instruction-container">
                  <div v-if="language == 'eng'" v-html="placementTestDisplay[placementData.currentQuestion].instructionEng
                    "></div>
                  <div v-else v-html="placementTestDisplay[placementData.currentQuestion].instructionTh
                    "></div>
                </div>
                <!-- #endregion -->

                <!-- #region Question -->
                <div class="box-question-container">
                  <div v-html="placementTestDisplay[placementData.currentQuestion].question"></div>
                </div>
                <!-- #endregion -->
              </div>

              <!-- #region button-answer-placement -->
              <div class="box-placement-answer-container row items-center">
                <div class="col-6 box-button-answer button-active-main" v-for="(itemAnswer, indexAnswer) in placementTestDisplay[
                  placementData.currentQuestion
                ].choices" :key="indexAnswer">
                  <div class="relative-position" @click="funcSelectedAnswer(indexAnswer)">
                    <q-img src="/images/button_main/button-answer-placement.png" no-spinner no-transition>
                    </q-img>

                    <div class="absolute-center font-mali-m full-width" style="padding: 1% 7%" align="left">
                      <span v-html="itemAnswer"></span>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Box student name -->
      <div class="fixed-top-left box-student-name-container">
        <div
          class="box-student-name relative-position animate__animated animate__fadeInLeft animation-duration-0-5s animate__delay-2s row items-center">
          <span class="self-center font-mali-m text-student-name">
            {{ `Username: ${studentStore.username}` }}
          </span>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Logout -->
      <div class="fixed-top-right box-button-logout z-max">
        <div class="relative-position animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-2s">
          <q-img src="/images/icon_main/icon-logout.png" class="cursor-pointer button-active-main" no-spinner
            no-transition @click="isShowDialogLogout = true"></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="$q.platform.is.mobile" class="box-container-main-mobile relative-position">
      <div class="row">
        <!-- #region Box student name -->
        <div class="col box-student-name-container-mobile">
          <div
            class="box-student-name-mobile relative-position animate__animated animate__fadeInLeft animation-duration-0-5s animate__delay-2s">
            <span class="self-center font-mali-m text-student-name f12">
              {{ `Username: ${studentStore.username}` }}
            </span>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Logout -->
        <div class="col-1 box-button-logout-mobile z-max">
          <div
            class="relative-position animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-2s">
            <q-img src="/images/icon_main/icon-logout.png" class="cursor-pointer button-active-main"
              @click="isShowDialogLogout = true" no-spinner no-transition></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region Placement Content -->
      <div v-if="!placementData.isFinish">
        <div class="box-placement-main-mobile">
          <div class="box-placement-header row justify-center items-center">
            <div align="center" class="font-fredoka f20 text-placement-header">
              {{ `PLACEMENT TEST` }}
            </div>
          </div>

          <div class="row justify-center items-center box-placement-question-mobile" v-if="!isStartPlacement">
            <div align="center" class="font-mali-b f20 text-white">
              ถ้าพร้อมแล้วกด “START”
              <div>เพื่อทำกันได้เลย</div>
            </div>
          </div>

          <div v-if="isStartPlacement" class="box-placement-question-mobile">
            <!-- #region Button Language -->
            <div align="right">
              <div class="box-button-change-language-mobile">
                <q-img width="74px" class="button-active-main"
                  :src="`/images/button_main/button-change-language-${language}.png`" no-spinner="" no-transition=""
                  @click="funcChangeLanguage()"></q-img>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Instruction -->
            <div class="font-mali-m box-instruction-container-mobile">
              <div v-if="language == 'eng'" v-html="placementTestDisplay[placementData.currentQuestion].instructionEng
                "></div>
              <div v-else v-html="placementTestDisplay[placementData.currentQuestion].instructionTh"></div>
            </div>
            <!-- #endregion -->

            <!-- #region Question -->
            <div class="box-question-container-mobile">
              <div v-html="placementTestDisplay[placementData.currentQuestion].question"></div>
            </div>
            <!-- #endregion -->
          </div>
        </div>

        <!-- #region button-answer-placement -->
        <div class="box-placement-answer-container-mobile" v-if="isStartPlacement">
          <div class="box-button-answer-mobile button-active-main" v-for="(itemAnswer, indexAnswer) in placementTestDisplay[
            placementData.currentQuestion
          ].choices" :key="indexAnswer">
            <div class="relative-position" @click="funcSelectedAnswer(indexAnswer)">
              <q-img src="/images/button_main/button-answer-placement.png" no-spinner no-transition>
              </q-img>

              <div class="absolute-center font-mali-m full-width" style="padding: 1% 7%" align="left">
                <span v-html="itemAnswer"></span>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region Button Start -->
      <div class="absolute-bottom box-button-start-mobile" v-if="!isStartPlacement" align="center">
        <q-img src="/images/button_main/button-start.png" no-spinner no-transition class="button-active-main"
          @click="funcStartPlacement()"></q-img>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Logout -->
  <logout-dialog :isDialogLogOut="isShowDialogLogout" v-if="isShowDialogLogout"
    @callback-closeDialog="isShowDialogLogout = false" @callback-logout="funcLogout()"></logout-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Your Level -->
  <!-- <dialog-your-level></dialog-your-level> -->
  <!-- #endregion -->

  <dialog-loading :isShowLoading="isShowDialogLoading"></dialog-loading>
</template>

<script setup>
import backgroundMain from "../components/background_main/background-main.vue";
import dialogYourLevel from "components/dialog_main/dialog-your-level.vue";
import dialogLoading from "../components/dialog-loading.vue";
import logoutDialog from "../components/dialog_main/logout-dialog.vue";

import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { auth, logout } from "src/router";
import { useQuasar } from "quasar";
import axios from "axios";

// Initial Data
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Initial Store
const studentStore = useStudentStore();

// Data
const language = ref("eng");
const vocabNumber = 6; // จำนวนข้อสอบ vocab ต่อชุด
const grammarNumber = 6; // จำนวนข้อสอบ grammar ต่อชุด
const criteria = 0.75;

const placementTestDisplay = ref([]);
const placementList = ref([]);
const placementTestResultLevel = ref("");
const placementLevel = ref(1);
const placementData = ref({
  currentQuestion: 0,
  totalCorrectAnswer: 0,
  totalIncorrectAnswer: 0,
  isSendAnswer: false,
  startGroup: "3",
  language: "eng",
  currentSkill: "Vocabulary",
  timeout: {
    min: "40",
    sc: "00",
  },
  isFinishVocabulary: false,
  summaryVocabularyGroup: "",
  vocabularyLevel: "",
  isFinishGrammar: false,
  grammarLevel: "",
  currentLevel: "",
  isSelectedClass: false,
  isStart: false,
  isLogout: false,
  isTimeout: false,
  isFinish: false,
  isLoading: true,
});

const levelForClassroomList = ref([
  {
    label: "เลเวล 1-2",
    level: "1",
    ageOfLearning: "7",
  },
  {
    label: "เลเวล 3-4",
    level: "3",
    ageOfLearning: "8",
  },
  {
    label: "เลเวล 5-6",
    level: "5",
    ageOfLearning: "9",
  },
  {
    label: "เลเวล 7-8",
    level: "7",
    ageOfLearning: "10",
  },
  {
    label: "เลเวล 9-10",
    level: "9",
    ageOfLearning: "11",
  },
  {
    label: "เลเวล 11-12",
    level: "11",
    ageOfLearning: "12",
  },
]);

// Boolean
const isStartPlacement = ref(false);
const isShowDialogLoading = ref(false);
const isShowDialogLogout = ref(false);

// #region Logout
const funcLogout = async () => {
  isShowDialogLoading.value = true;
  await logout();
  isShowDialogLoading.value = false;
};
// #endregion

// #region Start Placement
const funcStartPlacement = () => {
  isStartPlacement.value = true;
};
// #endregion

// #region Change Language
const funcChangeLanguage = () => {
  language.value = language.value === "eng" ? "th" : "eng";
};
// #endregion

// #region Load Placement
const funcGetPlacementTest = async () => {
  console.clear();
  isShowDialogLoading.value = true;

  const practiceStore = usePracticeStore();
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  try {
    let response = await practiceStore.getPlacementTest();

    if (response.message != "success") {
      throw new Error("Error");
    }

    placementList.value = response.data;

    let findLevelOfAge = levelForClassroomList.value.find((x) => {
      if (studentStore.levelForAge <= 7) {
        return x.ageOfLearning == 7;
      } else if (studentStore.levelForAge >= 12) {
        return x.ageOfLearning == 12;
      } else {
        return x.ageOfLearning == studentStore.levelForAge;
      }
    });

    if (findLevelOfAge) {
      placementLevel.value = findLevelOfAge.level;
    }

    const filterQuestion = placementList.value.filter(
      (x) =>
        x.level == Number(findLevelOfAge.level) ||
        x.level == Number(findLevelOfAge.level) + 1
    );

    const filterVocab = filterQuestion.filter((x) => x.skill == "Vocabulary");
    const filterGrammar = filterQuestion.filter((x) => x.skill == "Grammar");

    // get just 6 vocab
    const vocab = filterVocab.slice(0, vocabNumber);
    // get just 6 grammar
    const grammar = filterGrammar.slice(0, grammarNumber);

    // Merge 2 array
    const mergeArray = [...vocab, ...grammar];

    placementTestDisplay.value = mergeArray;

    isShowDialogLoading.value = false;
  } catch (e) {
    isShowDialogLoading.value = false;
    // router.replace("/lobby");
  }
};
// #endregion

// #region Calculate Age
const funcCalculateAge = (birthDate, today) => {
  let date = new Date(birthDate);

  let age = Math.floor(today.getFullYear() + 543) - date.getFullYear();

  return age;
};
// #endregion

// #region Select Answer
const funcSelectedAnswer = (index) => {
  if (placementData.value.isSendAnswer) return;

  placementData.value.isSendAnswer = true;

  if (
    index == placementTestDisplay.value[placementData.value.currentQuestion].correctIndex
  ) {
    placementData.value.totalCorrectAnswer++;
  }

  placementData.value.isSendAnswer = false;

  funcCheckScore();
};
// #endregion

// #region Check Score
const funcCheckScore = () => {
  // console.log("check score");
  let scoreAvg =
    placementData.value.totalCorrectAnswer / placementTestDisplay.value.length;
  // console.log("scoreAvg: ", scoreAvg);
  if (scoreAvg >= criteria) {
    if (placementLevel.value == 11) {
      funcFinishPlacement();
      return;
    }
    funcGetNewContent();
  } else {
    funcNextQuestion();
  }
};
// #endregion

// #region Next question
const funcNextQuestion = () => {
  // console.log("next");
  if (placementData.value.currentQuestion != placementTestDisplay.value.length - 1) {
    placementData.value.currentQuestion++;
  } else {
    funcCheckFinalScore();
  }
};
// #endregion

// #region Check final score
const funcCheckFinalScore = () => {
  // console.log("check final");
  let scoreAvg =
    placementData.value.totalCorrectAnswer / placementTestDisplay.value.length;
  if (scoreAvg >= criteria) {
    funcGetNewContent();
  } else {
    funcFinishPlacement();
  }
};
// #endregion

// #region Finish Placement
const funcFinishPlacement = async () => {
  const systemStore = useSystemStore();
  isShowDialogLoading.value = true;

  // isShowDialogPlacementTest.value = false;
  placementTestResultLevel.value = placementLevel.value.toString();

  try {
    const APIURL = `${process.env.NEWAPI}/registerV2-finishPlacementTest`;

    const POSTDATA = {
      studentId: studentStore.studentId,
      placementTestLevel: placementLevel.value.toString(),
    };

    const response = await axios.post(APIURL, POSTDATA);

    if (response.data.message != "success") {
      throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }

    studentStore.student.data.placementTestLevel = placementLevel.value.toString();
    studentStore.student.data.isPlacement = true;

    placementData.value.isFinish = true;
    isShowDialogLoading.value = false;

    setTimeout(() => {
      router.replace("/lobby");
    }, 100);

    // systemStore.setRegisterData({
    //   placementTestLevel: placementTestResultLevel.value,
    //   stage: "show-level-for-placement-test",
    // });
  } catch (e) {
    isShowDialogLoading.value = false;
    placementData.value.isStart = false;
    placementData.value.isFinish = false;
    // isShowDialogPlacementTest.value = true;
    $q.notify({
      message: e.message,
      color: "negative",
      position: "top",
      timeout: 1000,
      html: true,
    });
  }
};
// #endregion

// #region Get new content
const funcGetNewContent = () => {
  placementData.value.totalCorrectAnswer = 0;
  placementData.value.currentQuestion = 0;
  placementLevel.value += 2;

  const start = placementLevel.value.toString();
  const end = (placementLevel.value + 1).toString();

  const filterQuestion = placementList.value.filter(
    (x) => x.level == start || x.level == end
  );

  const filterVocab = filterQuestion.filter((x) => x.skill == "Vocabulary");
  const filterGrammar = filterQuestion.filter((x) => x.skill == "Grammar");
  const vocab = filterVocab.slice(0, vocabNumber);
  const grammar = filterGrammar.slice(0, grammarNumber);
  const mergeArray = [...vocab, ...grammar];
  placementTestDisplay.value = mergeArray;
};
// #endregion

let authListen;
onMounted(() => {
  const systemStore = useSystemStore();

  systemStore.setRouter("placement");

  authListen = auth.onAuthStateChanged(async (user) => {
    if (!user) {
      router.replace("/");
    } else {
      if (studentStore.studentType != "school") {
        if (studentStore.placementTestLevel) {
          placementData.value.isFinish = true;
          systemStore.systemData.activeState.isShowDialogYourLevel = true;

          return;
        }
      } else {
        router.replace("/lobby");
      }

      await funcGetPlacementTest();
    }
  });
});

onBeforeUnmount(() => {
  if (authListen) {
    authListen();
  }
});
</script>

<style lang="scss" scoped>
// #region Box
.backdrop-placement {
  background-image: url("/images/background_main/background-placement.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
}

.box-container-main-mobile {
  // max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100vh;
  background-image: url("/images/background_main/background-placement.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: auto;
}

.box-backdrop-placement {
  top: 52%;
  width: 95%;
  height: 85%;
}

.box-backdrop-question {
  height: 50%;
  background-color: rgba(0, 0, 0, 0.3);
}

.box-placement-main {
  width: 72.625%;
  color: #fff;
}

.box-placement-main-mobile {
  min-width: 330px;
  width: 90%;
  max-width: 1000px;
  height: 300px;
  border-radius: 10px;
  border: 2px solid #4a261b;
  background: rgba(0, 0, 0, 0.5);
  margin: 10px auto 0px auto;
}

.box-placement-header {
  position: relative;
  border-radius: 10px 10px 0px 0px;
  height: 13.515%;
  border-bottom: 2px solid #4a261b;
  background: #984510;
  z-index: 1;
}

.box-placement-header::before {
  content: "";
  position: absolute;
  top: 7px;
  left: 3px;
  width: 10px;
  height: 3px;
  padding: 3px 7px;
  border-radius: 20px 20px 5px 5px;
  background-color: #ffdf95;
  transform: rotate(-40deg);
}

.box-placement-question-mobile {
  width: 100%;
  height: 86.485%;
  padding: 14px 7px;
  color: #fff;
}

.box-button-start-placement {
  width: 21.5146%;
  margin-top: 7%;
}

.box-button-start-mobile {
  width: 169px;
  bottom: 25px;
  margin: auto;
}

.box-start-placement-container {
  top: 52%;
  width: 95%;
  height: 85%;
  // background: rgba(0, 0, 0, 0.5);
}

.box-placement-question {
  width: 95%;
  height: 50%;
  // background: rgba(0, 0, 0, 0.5);
  padding-top: 3%;
  padding-left: 2.5%;
}

.box-button-change-language {
  width: 8.6058%;
  margin: 1.3% 1.7% 0;
}

.box-button-change-language-mobile {
  width: 100%;
}

.box-instruction-container {
  width: 100%;
  font-size: clamp(16px, 1.5vw, 24px);
  text-decoration-line: underline;
  // background: rgba(0, 0, 0, 0.5);
}

.box-instruction-container-mobile {
  width: 100%;
  font-size: 16px;
  text-decoration: underline;
  margin: 14px 5px;
}

.box-button-logout {
  width: 2.45%;
  min-width: 35px;
  margin: 1%;
}

.box-button-logout-mobile {
  width: 40px;
  margin: 3%;
}

.box-student-name-container {
  max-width: 300px;
  width: 18.75%;
  min-width: 200px;
  margin: 1%;
}

.box-student-name-container-mobile {
  max-width: 300px;
  width: 18.75%;
  min-width: 200px;
  margin: 3%;
}

.box-student-name {
  width: 100%;
  height: 100%;
  max-height: 60px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 5% 7%;
  color: #fff;
  line-height: 1.5;
  font-size: clamp(11px, 1vw, 16px);
}

.box-student-name-mobile {
  width: 230px;
  height: 40px;
  font-size: 12px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  color: #fff;
}

.box-question-container {
  width: 100%;
  height: 62%;
  font-size: clamp(16px, 1.5vw, 24px);
  color: #fff;
  margin: 2% 0;
  overflow: auto;
}

.box-question-container-mobile {
  width: 100%;
  font-size: 16px;
  padding: 5px 5px;
}

.box-placement-answer-container {
  height: 47%;
  padding: 1% 2.3%;
}

.box-placement-answer-container-mobile {
  width: 100%;
  max-width: 330px;
  padding: 14px;
  margin: auto;
}

.box-button-answer {
  color: #4a261b;
  padding: 1%;
  font-size: clamp(16px, 1.5vw, 24px);
}

.box-button-answer-mobile {
  font-size: 16px;

  margin: 10px auto;
}

// #endregion

// #region Button
.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.1s;
  -webkit-transition: transform 0.1s;
  -moz-transition: transform 0.1s;

  cursor: pointer;
}

.button-active-main:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}

// #endregion

// #region Text
.text-start-placement {
  font-size: clamp(23px, 2.25vw, 36px);
}

.text-student-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-placement-header {
  position: relative;
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
  z-index: 2;
}

.text-placement-header::before {
  content: "PLACEMENT TEST";
  position: absolute;
  top: 65%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: #4a261b;
  z-index: -1;
}

// #endregion</style>
