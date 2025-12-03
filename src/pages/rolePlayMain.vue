<template>
  <q-page class="backdrop-listening row justify-center items-center">
    <!-- #region Audio -->
    <!-- <div class="absolute-center">
      <audio controls v-if="audioTemp" id="myAudio">
        <source :src="audioTemp" type="audio/wav" />
      </audio>
    </div> -->
    <!-- #endregion -->

    <!-- #region Desktop -->
    <div v-if="$q.platform.is.desktop" class="box-container-main relative-position">
      <!-- Background -->
      <background-main :background="`background-roleplay`"></background-main>

      <!-- Header bar -->
      <header-bar :practiceData="practiceData" :page="'roleplay'"></header-bar>

      <!-- #region Practice -->
      <div class="box-practice-main absolute-top" v-if="!practiceData.isLoadPractice">
        <!-- #region Video -->
        <div class="box-video-main">
          <video id="videoPlayer" :key="`video-${current}`" :src="vdoURL" class="no-padding"
            style="width: 100%; margin-bottom: -5px" :poster="imageUrl" preload="metadata" playsinline>
            <source :src="vdoURL" type="video/mp4">
            <p>ไม่สามารถแสดงวิดีโอได้</p>
          </video>
        </div>
        <!-- #endregion -->

        <!-- #region Box Content -->
        <div class="box-content-main relative-position">
          <div class="sub-content-main">
            <!-- #region Questio Text -->

            <!-- Sentance Eng -->
            <div class="row justify-center" align="left" v-if="!practiceData.isSendAnswer">
              <div class="relative-position font-mali-m" v-for="(item, index) in rolePlayList[current].displayText"
                :class="item.ignore ? (item.isSpace ? 'q-ml-xs' : '') : 'q-ml-xs'">
                <span v-if="item.ignore">
                  {{ item.text }}
                </span>
                <span v-else :class="isShowDialogErrorMicrophone
                  ? 'text-red'
                  : practiceData.isSendAnswer
                    ? item.isCorrect
                      ? 'text-teal'
                      : 'text-red'
                    : ''
                  ">
                  {{ `${item.text}` }}
                </span>
              </div>
            </div>

            <div class="row justify-center relative-position font-mali-m" align="left" v-if="practiceData.isSendAnswer">
              <div v-html="practiceData.displayHtml" v-if="practiceData.displayHtml"></div>
              <div v-html="rolePlayList[current].sentenceEng" v-else></div>
            </div>

            <!-- Sentance Thai -->
            <div class="row justify-center font-mali-m" align="left">
              <div>{{ rolePlayList[current].sentenceTh }}</div>
            </div>

            <!-- #endregion -->

            <!-- #region Button Start Record -->
            <div class="box-record-main" align="center" v-if="!isRecording">
              <div class="row justify-center">
                <div class="button-active-main button-play-video" :class="practiceData.isSendAnswer ? 'disable' : ''">
                  <q-img :src="`/images/button_main/button-${isPlaying ? 'pause' : 'play'
                    }-video.png`" no-spinner no-transition @click="
                      practiceData.isSendAnswer
                        ? null
                        : isRecording
                          ? null
                          : funcPlayVideo()
                      "></q-img>
                </div>

                <div class="button-active-main button-record-sound" :class="practiceData.isSendAnswer
                  ? 'disable'
                  : practiceData.isRecordSound && !isPlaying
                    ? ''
                    : 'disable'
                  ">
                  <q-img :src="`/images/button_main/button-record-sound${practiceData.isRecordSound && !isPlaying ? '' : '-disable'
                    }.png`" no-spinner no-transition @click="
                      practiceData.isSendAnswer
                        ? null
                        : !practiceData.isRecordSound || isPlaying
                          ? null
                          : funcStartRecorder()
                      "></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Recording -->
            <div v-else
              class="box-recording-main row justify-center animate__animated animation-duration-0-5s animate__fadeIn">
              <div class="button-active-main disable button-recording relative-position">
                <div class="absolute-center fit">
                  <q-img class="button-recording-animation" src="/images/button_main/button-recording-animation.png"
                    no-spinner no-transition></q-img>
                </div>
                <q-img src="/images/button_main/button-recording.png" no-spinner no-transition></q-img>
              </div>
              <div class="self-center box-text-recording self-center font-mali-m">
                <span>Recording</span>
                <span class="animation-dots" style="animation-delay: 0s">.</span>
                <span class="animation-dots" style="animation-delay: 0.15s">.</span>
                <span class="animation-dots" style="animation-delay: 0.3s">.</span>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-container-main-mobile absolute-center" v-if="!$q.platform.is.desktop">
      <!-- Header bar -->
      <header-bar :practiceData="practiceData" :page="'roleplay'"></header-bar>

      <!-- #region Practice -->
      <div class="box-practice-main-mobile" v-if="!practiceData.isLoadPractice">
        <!-- #region Video -->
        <div class="box-video-main-mobile">
          <video id="videoPlayer" :src="vdoURL" class="no-padding" style="width: 100%; margin-bottom: -5px"
            :poster="imageUrl">
            <source :src="vdoURL" type="video/mp4">
            <p>ไม่สามารถแสดงวิดีโอได้</p>
          </video>
        </div>
        <!-- #endregion -->

        <div class="box-content-main-mobile">
          <div class="sub-content-main-mobile">
            <!-- Sentance Eng -->
            <div class="row justify-center" align="left" v-if="!practiceData.isSendAnswer">
              <div class="relative-position font-mali-m" v-for="(item, index) in rolePlayList[current].displayText"
                :class="item.ignore ? '' : 'q-ml-xs'">
                <span v-if="item.ignore">
                  {{ item.text }}
                </span>
                <span v-else :class="isShowDialogErrorMicrophone
                  ? 'text-red'
                  : practiceData.isSendAnswer
                    ? item.isCorrect
                      ? 'text-teal'
                      : 'text-red'
                    : ''
                  ">
                  {{ `${item.text}` }}
                </span>
              </div>
            </div>

            <div class="row justify-center relative-position font-mali-m" align="left" v-if="practiceData.isSendAnswer">
              <div v-html="practiceData.displayHtml" v-if="practiceData.displayHtml"></div>
              <div v-html="rolePlayList[current].sentenceEng" v-else></div>
            </div>

            <!-- Sentance Thai -->
            <div class="row justify-center font-mali-m" align="left">
              <div>{{ rolePlayList[current].sentenceTh }}</div>
            </div>

            <!-- #region Button Start Record -->
            <div class="box-record-main-mobile" align="center" v-if="!isRecording">
              <div class="row justify-center">
                <div class="self-center button-active-main button-play-video-mobile row justify-center items-center"
                  :class="practiceData.isSendAnswer ? 'disable' : ''" @click="
                    practiceData.isSendAnswer
                      ? null
                      : isRecording
                        ? null
                        : funcPlayVideo()
                    ">
                  <div class="relative-position z-top">
                    <q-icon name="fas fa-play" v-if="!isPlaying"></q-icon>
                    <q-icon name="fas fa-pause" v-else></q-icon>
                  </div>
                </div>

                <div class="self-center relative-position button-active-main button-record-sound-mobile" :class="practiceData.isSendAnswer
                  ? 'disable'
                  : practiceData.isRecordSound && !isPlaying
                    ? ''
                    : 'disable'
                  " @click="
                    practiceData.isSendAnswer
                      ? null
                      : !practiceData.isRecordSound || isPlaying
                        ? null
                        : funcStartRecorder()
                    ">
                  <div class="fit row relative-position justify-center items-center z-top">
                    <div class="self-center">
                      <q-icon name="fas fa-microphone-alt" class="f20 q-mx-xs"></q-icon>
                    </div>
                    <div class="self-center font-mali-m f16">พูดอัดเสียง</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Recording -->
            <div v-else class="box-recording-main-mobile row justify-center">
              <div
                class="button-active-main disable button-recording-mobile relative-position animate__animated animate__zoomIn animation-duration-0-5s">
                <div class="absolute-center fit">
                  <q-img class="button-recording-animation" src="/images/button_main/button-recording-animation.png"
                    no-spinner no-transition></q-img>
                </div>
                <q-img src="/images/button_main/button-recording.png" no-spinner no-transition></q-img>
              </div>
              <div class="self-center box-text-recording self-center font-mali-m">
                <span>Recording</span>
                <span class="animation-dots" style="animation-delay: 0s">.</span>
                <span class="animation-dots" style="animation-delay: 0.15s">.</span>
                <span class="animation-dots" style="animation-delay: 0.3s">.</span>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Answer Action -->
  <answer-action :systemStore="systemStore" :practiceData="practiceData" :synchronizeStore="synchronizeStore"
    :practiceStore="practiceStore" @callback-nextquestion="nextQuestion()" @callback-restart="funcRestartPractice"
    @callback-re-record="reRecordAudio()" @callback-finishPractice="funcFinishRolePlayPractice()"></answer-action>
  <!-- #endregion -->

  <!-- #region Dialog เรียนครบแล้ว -->
  <learning-done :isShowLearningDone="isShowLearningDone" @callback-closedialog="
    (isShowLearningDone = false), $router.replace('/practice/list')
    "></learning-done>
  <!-- #endregion -->

  <!-- #region Dialog Error Microphone -->
  <q-dialog v-model="isShowDialogErrorMicrophone" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-error">
          <div class="sub-dialog-error">
            <div align="center" class="font-mali-b f20">
              {{ `ไม่ได้ยินเสียงพูดเลย` }}
            </div>

            <div class="box-dialog-content font-mali-b f16" align="center">
              <div align="center" style="margin-bottom: 8px">
                <q-img width="120px" src="/images/icon_main/icon-error-microphone.png"></q-img>
              </div>
              <div>ลองตรวจสอบการ</div>
              <div>เชื่อมต่อไมโครโฟน</div>
              <div>แล้วลองใหม่อีกครั้งนะ</div>
            </div>
            <div class="button-active-main" align="center">
              <q-img width="160px" src="/images/button_main/button-try-again-eng.png" no-native-menu no-spinner
                no-transition v-close-popup></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Practice Complete -->
  <dialog-practice-complete v-if="isShowDialogPracticeComplete"></dialog-practice-complete>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <loading :isShowLoading="isShowLoading"></loading>
  <!-- #endregion -->
</template>

<script setup>
import dialogPracticeComplete from "../components/dialog_main/dialog-practice-complete.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import answerAction from "../components/answer-action.vue";

import finishPracticeDialog from "../components/finishPracticeDialog.vue";
import learningDone from "../components/dialog-learning-done.vue";

import loading from "../components/dialog-loading.vue";

import { useQuasar } from "quasar";
import { ref, onMounted, reactive, onBeforeUnmount, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";

import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";

import { axios } from "src/boot/axios";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useStudentStore } from "src/stores/student";

const components = defineComponent({
  headerBar,
  backgroundMain,
  answerAction,

  finishPracticeDialog,
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

// Initital Data
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const vdoURL = ref("");
const imageUrl = ref("");

const isShowLearningDone = ref(false);
const isShowDialogPracticeComplete = ref(false);
const isShowLoading = ref(false);

const showRecordError = ref("");

const practiceData = reactive({
  instruction: {
    th: "โปรดฟังเสียงบทสนทนาและพูดตาม",
    eng: "Please listen to the dialogue and repeat after it.",
  },
  // Initial Data
  totalQuestion: 0,
  star: 0,
  currentQuestion: 0,
  score: 0,
  coin: 0,
  correct: 0,
  incorrect: 0,
  skill: "Listening & Speaking",
  isEnableSoundEffect: false,
  level: 0,
  unit: 0,
  coin: 0,
  counter: 0,
  totalCorrectQuestion: 0,

  // use current question
  question: "",
  description: "",
  refs: [],
  choices: [],
  displayHtml: "",

  // use current answer
  isSendAnswer: false,
  isCorrectAnswer: false,
  isFinishRolePlay: false,
  isFinishPractice: false,
  isShowRestartBtn: false,
  isEnableNext: false,
  currentChoice: "",
  currentAnswer: "",
  isRecordSound: false,
  isDisableRecordBtn: false,
  isLoadPractice: true,
  isShowDialogStartPractice: true,
  isFirstTimeReward: false,

  func: {
    async restartPractice() {
      isShowLoading.value = true;

      current.value = 0;
      practiceData.correct = 0;
      practiceData.currentQuestion = 0;
      practiceData.score = 0;
      practiceData.star = 0;
      countVoiceIndex = 0;
      practiceData.isFinishRolePlay = false;
      practiceData.isFinishPractice = false;
      practiceData.isSendAnswer = false;

      practiceData.isDisableRecordBtn = false;
      practiceData.isEnableNext = false;

      practiceData.coin = 0;
      practiceData.counter = 0;

      practiceData.totalCorrectQuestion = 0;
      practiceData.isFirstTimeReward = false;

      isShowNextBtn.value = false;
      isShowResult.value = false;
      isRecording.value = false;
      isShowTutorial.value = false;

      if (mediaRecorder) {
        if (mediaRecorder.state == "recording") {
          mediaRecorder.stop();
        }
      }

      await funcLoadPractice();
    },
  },
});

// #region Function

const isLoaded = ref(false);

const current = ref(0);
const rolePlayList = ref([]);
const isShowResult = ref(true);
const isAddListener = ref(false);

let setTimeOut;
let answerStructure = [];

// #region Play Video
const isPlaying = ref(false);
// เพิ่มฟังก์ชันสำหรับ reset video element
const funcResetVideoElement = () => {
  try {
    console.log("funcResetVideoElement");

    const video = document.getElementById("videoPlayer");
    if (!video) return;

    // หยุด video และ clear events
    video.pause();
    video.currentTime = 0;

    // Remove all event listeners
    video.onpause = null;
    video.onended = null;
    if (pausing_function) {
      video.removeEventListener("timeupdate", pausing_function);
    }

    // Force reload video element for iOS compatibility
    video.load();

    isPlaying.value = false;
  } catch (error) {
    console.error("Error resetting video element:", error);
    isPlaying.value = false;
    // Force loading state to false if error occurs
    isShowLoading.value = false;
  }
};

// แก้ไข funcPlayVideo เพื่อรองรับ iOS เก่า
let pausing_function; // ย้ายมาข้างนอกเพื่อให้ removeEventListener ได้

const funcPlayVideo = async () => {
  try {
    const video = document.getElementById("videoPlayer");
    if (!video) {
      console.error("Video element not found");
      isPlaying.value = false;
      return;
    }

    let currentTime = 0;

    // Clean up existing event listeners
    try {
      video.onpause = null;
      video.onended = null;
      if (pausing_function) {
        video.removeEventListener("timeupdate", pausing_function);
      }
    } catch (cleanupError) {
      console.warn("Error cleaning up video listeners:", cleanupError);
    }

    if (isPlaying.value) {
      try {
        video.pause();
        isPlaying.value = false;
        return;
      } catch (pauseError) {
        console.error("Error pausing video:", pauseError);
        isPlaying.value = false;
        return;
      }
    }

    try {
      isPlaying.value = true;

      let splitTimeStart = rolePlayList.value[current.value].start.split(":");
      let splitTimeEnd = rolePlayList.value[current.value].end.split(":");

      let startTime = Number(splitTimeStart[0]) * 60 + Number(splitTimeStart[1]);
      let endTime = Number(splitTimeEnd[0]) * 60 + Number(splitTimeEnd[1]);

      // Set current time first
      video.currentTime = startTime;

      console.log(video.currentTime);

      // Add event listeners before play
      video.onpause = function () {
        isPlaying.value = false;
      };

      video.onended = function (event) {
        try {
          if (currentTime >= event.target.duration) {
            isPlaying.value = false;
            practiceData.isRecordSound = true;
          }
        } catch (endedError) {
          console.error("Error in video ended event:", endedError);
          isPlaying.value = false;
        }
      };

      pausing_function = function () {
        try {
          currentTime = this.currentTime;

          if (this.currentTime >= endTime) {
            video.pause();
            isPlaying.value = false;
            practiceData.isRecordSound = true;
            // remove the event listener after you paused the playback
            this.removeEventListener("timeupdate", pausing_function);
          }
        } catch (pausingError) {
          console.error("Error in pausing function:", pausingError);
          isPlaying.value = false;
        }
      };

      video.addEventListener("timeupdate", pausing_function);

      // สำหรับ iOS - ต้องมี user interaction
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            console.log("Video started playing");
          })
          .catch((error) => {
            console.error("Video play failed:", error);
            isPlaying.value = false;

            // สำหรับ iOS เก่าๆ ที่มีปัญหา autoplay
            if (error.name === 'NotAllowedError' || error.name === 'AbortError') {
              alert("📱 สำหรับ iPad/iOS:\nกรุณากดปุ่ม Play อีกครั้งเพื่อเล่นวิดีโอ");
            }
          });
      }

    } catch (playError) {
      console.error("Error in video play logic:", playError);
      isPlaying.value = false;
    }

  } catch (error) {
    console.error("Error playing video:", error);
    isPlaying.value = false;
    // Force loading state to false if error occurs
    isShowLoading.value = false;
  }
};
// #endregion

// #region Finish Practice
const funcFinishRolePlayPractice = async () => {
  try {
    isShowLoading.value = true;

    let tempArr = [...rolePlayList.value[current.value].displayText];

    tempArr = [...tempArr];

    let score =
      rolePlayList.value[current.value].displayText.filter((x) => x.isCorrect).length /
      (rolePlayList.value[current.value].displayText.length -
        tempArr.filter((x) => x.ignore).length);

    practiceData.correct = rolePlayList.value.filter((x) => x.score >= 0.5).length;

    practiceData.coin = practiceData.correct;

    if (!isSync.value) {
      practiceData.counter = await funcFinishPractice(
        practiceData,
        route.params.practiceListId,
        $q.platform.is
      );
    } else {
      if (score >= 0.7 || score >= 0.5) {
        funcFinishPractice(practiceData, route.params.practiceListId, $q.platform.is);

        saveCourseSyncData(
          practiceData.currentQuestion,
          route.params.practiceListId,
          answerStructure,
          practiceData.score
        );
      }
    }

    isShowResult.value = false;
    practiceData.isFinishPractice = true;
    practiceData.isSendAnswer = false;
    isShowLoading.value = false;
  } catch (error) {
    console.error("Error finishing practice:", error);
    isShowLoading.value = false;
    alert("❌ เกิดข้อผิดพลาดในการจบแบบฝึกหัด\nกรุณาลองใหม่อีกครั้ง");
  }
};
// #endregion

// #region Re Record Audio
const reRecordAudio = () => {
  practiceData.isDisableRecordBtn = false;
  resultTranscript.value = "";

  rolePlayList.value[current.value].displayText.forEach((res) => (res.isCorrect = false));
};
// #endregion

// #region Load Practice
const funcLoadPractice = async () => {
  try {
    console.clear();
    isLoaded.value = false;

    practiceData.isLoadPractice = true;

    practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

    let findConversion = practiceStore.listBySkill.find(res => res.practiceType == 'conversationlesson')

    if (!findConversion) {
      throw new Error("No conversation lesson data found");
    }

    const API_URL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/practice-getRolePlay?practiceListId=${findConversion.id}`;

    const response = await axios.get(API_URL);

    if (response.data.message != 'success') {
      throw new Error("API response unsuccessful");
    }

    vdoURL.value = response.data.vdoURL;

    console.log(vdoURL.value);

    imageUrl.value = response.data.imageURL;

    let temp = [];

    response.data.data.forEach((element) => {
      const sentenceCompare = element
        .conversationEng.replace(/'/g, "'")
        .replace(/,/g, "");

      let regexp = /\s+/g;

      let newDataContent = {
        id: element.id,
        start: element.startTime,
        end: element.endTime,
        sentenceEng: element.conversationEng,
        sentenceTh: element.conversationTh,
        isRecord: false,
        score: 0,
        isUse: element.isTraining,
        order: element.order,
        sentenceCompare: sentenceCompare,
        counter: 0,
        failCounter: 0,
        displayText: [],
      };

      let newSentence = element.conversationEng;

      let setSpecialText = newSentence
        .replace(/\./g, " . ")
        .replace(/\,/g, " , ")
        .replace(/\!/g, " ! ")
        .replace(/\'/g, "'")
        .replace(/\?/g, " ? ")
        .split(regexp)
        .filter((x) => x != " " && x != "");

      let tempArr = [];

      for (var i = 0; i < setSpecialText.length; i++) {
        var newData = {
          text: setSpecialText[i],
          isCorrect: false,
          ignore: false,
          specialTextList: [],
        };

        let regexp = /(^\d+(-\d+)+$)/g;
        // let regexp = /(!*[0-9]+[-]+[0-9]*)/g;

        let findMath = regexp.test(newData.text);
        // console.log("findMath: ", findMath);

        if (findMath) {
          for (let ii = 0; ii < newData.text.length; ii++) {
            let resSpecial = newData.text[ii];
            if (resSpecial == "-") {
              newData.specialTextList.push({
                text: "-",
                index: ii,
              });
            }
          }
        }

        if (
          newData.text.includes("!") ||
          newData.text.includes("?") ||
          newData.text.includes(".") ||
          newData.text.includes(",")
        ) {
          newData.ignore = true;
        }

        tempArr.push(newData);
      }

      newDataContent.displayText = tempArr.filter((x) => x.text != "");

      temp.push(newDataContent);
    });

    temp.sort((a, b) => a.order - b.order);

    rolePlayList.value = temp;

    practiceData.currentQuestion = current.value;
    practiceData.totalQuestion = temp.length;
    current.value = 0;
    isLoaded.value = true;
    isShowLoading.value = false;
    practiceData.isLoadPractice = false;

    // Test
    // current.value = 1;
    // practiceData.currentQuestion = current.value;

  } catch (error) {
    console.error("Error loading practice:", error);
    isShowLoading.value = false;
    isLoaded.value = false;
    practiceData.isLoadPractice = false;

    // Show user-friendly error message
    alert("❌ เกิดข้อผิดพลาดในการโหลดข้อมูล\nกรุณาลองใหม่อีกครั้ง");

    // Go back to previous page or handle error appropriately
    router.back();
  }
};

// db.collection("practiceList")
//   .doc(route.params.practiceListId)
//   .get()
//   .then((doc) => {
//     const level = doc.data().level;
//     const unit = doc.data().unit;

//     practiceData.level = level;
//     practiceData.unit = unit;

//     db.collection("practiceList")
//       .where("level", "==", level)
//       .where("unit", "==", unit)
//       .where("practiceType", "==", "conversationlesson")
//       .get()
//       .then(async (cDoc) => {

//         db.collection("practiceData")
//           .doc("server")
//           .collection("practice")
//           .where("practiceListId", "==", cDoc.docs[0].id)
//           .get()
//           .then((cData) => {
//             const practiceConverId = cData.docs[0].id;

//             vdoURL.value = cData.docs[0].data().vdoUrl;
//             imageUrl.value = cData.docs[0].data().imageUrl;

//             db.collection("practiceData")
//               .doc("server")
//               .collection("practice")
//               .doc(practiceConverId)
//               .collection("sentence")
//               .where("isTraining", "==", true)
//               .get()
//               .then((converData) => {
//               });
//           });
//       });
//   });
// };
// #endregion

// #region Next Question
const isShowFinishPracticeBtn = ref(false);
// แก้ไข nextQuestion function
const nextQuestion = () => {
  try {
    clearTimeout(setTimeOut);
    clearTimeout(recordTimeout);

    resultTranscript.value = "";

    practiceData.isEnableNext = false;
    practiceData.isRecordSound = false;

    isShowNextBtn.value = false;

    practiceData.correct = rolePlayList.value.filter((x) => x.score >= 0.5).length;

    if (current.value < rolePlayList.value.length - 1) {
      practiceData.currentQuestion = current.value + 1;
      current.value++;

      // **เพิ่มการ reset video element เมื่อเปลี่ยนข้อ**
      funcResetVideoElement();
    }

    if (mediaRecorder) {
      try {
        if (mediaRecorder.state == "recording") {
          mediaRecorder.stop();
        }
      } catch (recorderError) {
        console.warn("Error stopping media recorder:", recorderError);
      }
    }

    practiceData.isSendAnswer = false;
    practiceData.isDisableRecordBtn = false;
    practiceData.isCorrectAnswer = false;
    audioChunks = [];
  } catch (error) {
    console.error("Error in nextQuestion:", error);
    // Force reset loading state
    isShowLoading.value = false;
    isRecording.value = false;
    alert("❌ เกิดข้อผิดพลาดในการเปลี่ยนข้อ\nกรุณาลองใหม่อีกครั้ง");
  }
};
// #endregion

// #region Restart Practice
const isShowFinishPracticeDialog = ref(false);
const funcRestartPractice = async () => {
  try {
    isShowLoading.value = true;

    current.value = 0;
    practiceData.correct = 0;
    practiceData.currentQuestion = 0;
    practiceData.score = 0;
    practiceData.star = 0;
    countVoiceIndex = 0;
    practiceData.isFinishRolePlay = false;
    practiceData.isFinishPractice = false;
    practiceData.isSendAnswer = false;

    practiceData.totalCorrectQuestion = 0;
    practiceData.isFirstTimeReward = false;

    practiceData.isDisableRecordBtn = false;
    practiceData.isEnableNext = false;

    isShowNextBtn.value = false;
    isShowResult.value = false;
    isRecording.value = false;
    isShowTutorial.value = false;

    if (mediaRecorder) {
      try {
        if (mediaRecorder.state == "recording") {
          mediaRecorder.stop();
        }
      } catch (recorderError) {
        console.warn("Error stopping recorder in restart:", recorderError);
      }
    }

    await funcLoadPractice();
  } catch (error) {
    console.error("Error restarting practice:", error);
    isShowLoading.value = false;
    alert("❌ เกิดข้อผิดพลาดในการเริ่มแบบฝึกหัดใหม่\nกรุณาลองใหม่อีกครั้ง");
  }
};
// #endregion

// #region Tutorial
const isShowTutorial = ref(false);
const funcLoadTutorial = async () => {
  let getData = studentStore.studentData;

  if (getData.tutorial) {
    let findTutorial = getData.tutorial.filter(
      (x) => x.routeName == route.name && x.practiceType == "roleplay"
    );

    if (!findTutorial.length) {
      isShowTutorial.value = true;
    }
  } else {
    isShowTutorial.value = true;
  }
};
// #endregion

// #region Back To Menu
const funcBackToMenu = () => {
  isShowLoading.value = true;

  router.replace("/practice/list");
};
// #endregion

// #region Audio Record
const isShowDialogErrorMicrophone = ref(false);
let countOfError = 0;
const isRecording = ref(false);
const isShowNextBtn = ref(false);
let recordTimeout;

// #region Media Start Recorder
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let audioStream;
let mediaRecorder;
let recognition;
let listenerTimeout;

let audioChunks = [];
const audioTemp = ref("");
const resultTranscript = ref("");

// เพิ่มฟังก์ชันนี้ใหม่
const showBrowserNotSupportedDialog = () => {
  $q.dialog({
    title: '⚠️ Browser ไม่รองรับ',
    message: `การบันทึกเสียงไม่รองรับใน browser นี้

📱 สำหรับ iPad/iPhone:
• กรุณาเปิดใน Google Chrome
• หรือใช้อุปกรณ์ Android/PC

💡 แนะนำ: Google Chrome ให้ประสบการณ์ที่ดีที่สุด`,
    ok: {
      label: 'เข้าใจแล้ว',
      color: 'primary'
    }
  });
};

const funcStartRecorder = async () => {
  try {
    console.clear();

    // ตรวจสอบ browser compatibility
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      showBrowserNotSupportedDialog();
      return;
    }

    if (!window.MediaRecorder) {
      showBrowserNotSupportedDialog();
      return;
    }

    if (audioChunks.length) {
      audioChunks = [];
    }

    resultTranscript.value = "";

    audioTemp.value = "";
    if (audioTemp.value) {
      // console.log(audioTemp.value);
    }

    // if ($q.platform.is.ios) {
    //   funcMediaRecorderIOS();
    // } else {
    await funcMediaRecorder();
    // }
  } catch (error) {
    console.error("Error starting recorder:", error);
    isShowLoading.value = false;
    isRecording.value = false;
    alert("❌ เกิดข้อผิดพลาดในการเริ่มบันทึกเสียง\nกรุณาลองใหม่อีกครั้ง");
  }
};
// #endregion

// #region Media Recorder Desktop && Android
const funcMediaRecorder = async () => {
  try {
    console.clear();

    // ตรวจสอบว่า MediaRecorder รองรับหรือไม่
    if (!window.MediaRecorder) {
      showBrowserNotSupportedDialog();
      isShowLoading.value = false;
      return;
    }

    try {
      isShowLoading.value = true;

      audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder = new MediaRecorder(audioStream);

      isShowLoading.value = false;

      isRecording.value = true;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        try {
          // let sentenceEng = JSON.stringify(rolePlayList.value[current.value].displayText);
          // console.log("sentenceEng: ", sentenceEng);

          // sentenceEng = JSON.parse(sentenceEng)
          //   .map((x) => {
          //     // if (x.ignore) {
          //     //   return "";
          //     // }

          //     if (x.specialTextList.length) {
          //       x.text = x.text.replace(/\-/g, "");
          //     }

          //     return x.text;
          //   })
          //   .filter((x) => x != "")
          //   .join(" ");

          // console.log("sentenceEng: ", sentenceEng);

          let audioBlob = new Blob(audioChunks, { type: "audio/wav" });

          let audioUrl = URL.createObjectURL(audioBlob);

          audioTemp.value = new Audio(audioUrl);

          let arrayBuffer = await audioBlob.arrayBuffer();

          let AudioContext = window.AudioContext || window.webkitAudioContext;

          let audioContext = new AudioContext();

          let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

          let wavBlob = audioBufferToWavBlob(audioBuffer);

          if (audioTemp.value) {
            isShowLoading.value = true;

            try {
              if (!$q.platform.is.ios) {
                audioTemp.value.play();
              }

              const formData = new FormData();
              formData.append("file", wavBlob, "audio.wav");
              formData.append(
                "excepted_word",
                rolePlayList.value[current.value].sentenceEng
              );

              const APIURL = `https://speech-to-text-b75fqlb26a-as.a.run.app/`;

              // const APIURL = `http://localhost:5000/winnerenglish2-e0f1b/asia-southeast1/speech_to_text`;

              try {
                const response = await axios.post(APIURL, formData);

                if (response.data.message != "success") {
                  throw "Error API Speech To Text";
                }

                let scoreOfAnswer = response.data.score / 100;

                evaluate(scoreOfAnswer);

                practiceData.displayHtml = response.data.html;

                isShowLoading.value = false;
              } catch (e) {
                evaluate(-1);
                isShowLoading.value = false;
                // funcOnStopRecorder();
                // return;
                // throw "Error API Android";
              }

              isShowLoading.value = false;
            } catch (e) {
              // console.log(e);
              evaluate(-1);
              isShowLoading.value = false;
            }
          } else {
            evaluate(-1);
            isShowLoading.value = false;
            // funcOnStopRecorderAndroid();
            // return;
            // throw "Error API Android";
          }
        } catch (e) {
          evaluate(-1);
          isShowLoading.value = false;
          // funcOnStopRecorderAndroid();
          // return;
          // throw "Error API Android";
        }
      };

      mediaRecorder.start();

      if (listenerTimeout) {
        clearTimeout(listenerTimeout);
      }

      funcStopRecorderTime();
    } catch (error) {
      let errorMessage = "❌ ไม่สามารถเข้าถึงไมโครโฟนได้\n\n";

      // ตรวจสอบ browser type สำหรับข้อความที่เหมาะสม
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      if (isIOS || isSafari) {
        errorMessage += "📱 สำหรับ iOS/Safari:\n• กรุณาใช้ Google Chrome\n• หรือลองใช้อุปกรณ์อื่น";
      } else {
        errorMessage += "🔧 กรุณา:\n• อนุญาตการใช้งานไมโครโฟน\n• ตรวจสอบการตั้งค่า browser";
      }

      alert(errorMessage);
      isShowLoading.value = false;
    }
  } catch (outerError) {
    console.error("Fatal error in funcMediaRecorder:", outerError);
    isShowLoading.value = false;
    isRecording.value = false;
    alert("❌ เกิดข้อผิดพลาดร้ายแรงในการบันทึกเสียง\nกรุณาลองใหม่อีกครั้ง");
  }
};

const funcStopRecorderTime = () => {
  try {
    let setQuestionTimeOut = rolePlayList.value[current.value].sentenceEng.split(" ");

    setQuestionTimeOut = setQuestionTimeOut.length * 800;

    if (setQuestionTimeOut < 5000) {
      setQuestionTimeOut = 5000;
    } else if (setQuestionTimeOut > 10000) {
      setQuestionTimeOut = 10000;
    }

    listenerTimeout = setTimeout(() => {
      funcOnStopRecorder();
    }, setQuestionTimeOut);
  } catch (e) {
    // console.log("Catch Error Stop Recorder Time Desktop");
    evaluate(-1);
    funcOnStopRecorder();
    isShowLoading.value = false;
    // $q.notify({
    //   // message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
    //   message: `Error function Stop Recorder Time Desktop : ${e} `,
    //   color: "negative",
    //   timeout: 5000,
    //   position: "top",
    // });
  }
};

const funcOnStopRecorder = () => {
  if (listenerTimeout) {
    clearTimeout(listenerTimeout);
  }

  if (isRecording.value) {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }

    audioStream.getTracks().forEach((track) => {
      if (track) {
        track.stop();
      }
    });
    // recognition.stop();
    isShowLoading.value = true;
    isRecording.value = false;
    practiceData.isDisableRecordBtn = true;
  } else {
    isShowLoading.value = true;
    isRecording.value = false;
    practiceData.isDisableRecordBtn = true;
  }
};
// #endregion

// #region Media Recorder IOS
const funcMediaRecorderIOS = async () => {
  try {
    isRecording.value = true;

    recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;
    recognition.interimResults = true;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;

      let getCompare = similarity(
        rolePlayList.value[current.value].sentenceEng,
        transcript
      );

      resultTranscript.value = getCompare;
    };

    recognition.onerror = (event) => {
      evaluate(-1);
      funcOnStopRecorderIOS();
      isShowLoading.value = false;
    };

    recognition.onend = (e) => {
      try {
        if (resultTranscript.value) {
          if (resultTranscript.value.resultCompare.length > 0) {
            funcCheckAnswerRecorder(resultTranscript.value.resultCompare);
          }
        } else {
          evaluate(-1);
          funcOnStopRecorderIOS();
          isShowLoading.value = false;
        }
      } catch (e) {
        evaluate(-1);
        funcOnStopRecorderIOS();
        isShowLoading.value = false;
      }
    };

    funcStopRecorderTimeIOS();
  } catch (e) {
    evaluate(-1);
    funcOnStopRecorderIOS();
    isShowLoading.value = false;
  }
};

const funcStopRecorderTimeIOS = () => {
  try {
    let setQuestionTimeOut = rolePlayList.value[current.value].sentenceEng.split(" ");

    setQuestionTimeOut = setQuestionTimeOut.length * 800;

    if (setQuestionTimeOut < 5000) {
      setQuestionTimeOut = 5000;
    } else if (setQuestionTimeOut > 10000) {
      setQuestionTimeOut = 10000;
    }

    listenerTimeout = setTimeout(() => {
      funcOnStopRecorderIOS();
    }, setQuestionTimeOut);
  } catch (e) {
    evaluate(-1);
    funcOnStopRecorderIOS();
    isShowLoading.value = false;
  }
};

const funcOnStopRecorderIOS = () => {
  if (isRecording.value) {
    if (listenerTimeout) {
      clearTimeout(listenerTimeout);
    }

    isRecording.value = false;
    practiceData.isDisableRecordBtn = true;
    recognition.stop();
  } else {
    isRecording.value = false;
    practiceData.isDisableRecordBtn = true;
  }
};
// #endregion

// #region ส่วนของการเช็ค permission ของไมค์โครโฟน
let listenPermissions;
const funcCheckPermission = async () => {
  try {
    // Check if permissions API is available
    if (!navigator.permissions) {
      console.warn("Permissions API not available");
      return;
    }

    listenPermissions = await navigator.permissions.query({
      name: "microphone",
    });

    if (listenPermissions.state === "granted") {
      // Microphone access granted
    } else if (listenPermissions.state === "prompt") {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        console.error("Error requesting microphone permission:", error);
      }
    } else if (listenPermissions.state === "denied") {
      $q.notify({
        message: "กรุณาเปิดไมค์โครโฟนของคุณให้พร้อมใช้งานในหน้านี้",
        timeout: 2000,
        icon: "fas fa-exclamation-triangle",
        position: "top",
      });

      router.replace("/lobby");
      return;
    }

    listenPermissions.onchange = async function (e) {
      try {
        if (e.target.state == "denied") {
          $q.notify({
            message: "กรุณาเปิดไมค์โครโฟนของคุณให้พร้อมใช้งานในหน้านี้",
            timeout: 2000,
            icon: "fas fa-exclamation-triangle",
            position: "top",
          });

          router.replace("/lobby");
          return;
        } else if (e.target.state === "prompt") {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach((track) => track.stop());
          } catch (error) {
            console.error("Error in permission change prompt:", error);
          }
        }
      } catch (changeError) {
        console.error("Error in permission change handler:", changeError);
      }
    };
  } catch (error) {
    console.error("Error checking microphone permission:", error);
    // Don't block the app if permission check fails
  }
};
// #endregion

// #region audio Buffer To Wav Blob
const audioBufferToWavBlob = (audioBuffer) => {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length * numberOfChannels * 2 + 44;
  const buffer = new ArrayBuffer(length);
  const view = new DataView(buffer);

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output, offset, input) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
  };

  const interleave = (inputL, inputR) => {
    const length = inputL.length + inputR.length;
    const result = new Float32Array(length);

    let index = 0;
    let inputIndex = 0;

    while (index < length) {
      result[index++] = inputL[inputIndex];
      result[index++] = inputR[inputIndex];
      inputIndex++;
    }
    return result;
  };

  writeString(view, 0, "RIFF");
  view.setUint32(4, 32 + audioBuffer.length * numberOfChannels * 2, true);
  writeString(view, 8, "WAVE");
  writeString(view, 12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numberOfChannels, true);
  view.setUint32(24, audioBuffer.sampleRate, true);
  view.setUint32(28, audioBuffer.sampleRate * 4, true);
  view.setUint16(32, numberOfChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, "data");
  view.setUint32(40, audioBuffer.length * numberOfChannels * 2, true);

  if (numberOfChannels === 2) {
    floatTo16BitPCM(
      view,
      44,
      interleave(audioBuffer.getChannelData(0), audioBuffer.getChannelData(1))
    );
  } else {
    floatTo16BitPCM(view, 44, audioBuffer.getChannelData(0));
  }

  return new Blob([view], { type: "audio/wav" });
};
// #endregion

// #endregion

// #region Evaluate
const evaluate = async (calculatedScore) => {
  try {
    rolePlayList.value[current.value].counter++;

    if (calculatedScore == -1) {
      // practiceData.isCorrectAnswer = false;
      practiceData.currentChoice = "ลองใหม่อีกครั้ง";
      practiceData.currentAnswer =
        "ไม่ได้ยินที่คุณพูดเลย ลองใหม่หรือตรวจสอบการเชื่อมต่อไมโครโฟน";

      isShowDialogErrorMicrophone.value = true;
      // Force loading state to false
      isShowLoading.value = false;
      return;
    } else if (calculatedScore >= 0.7) {
      practiceData.isCorrectAnswer = true;
      practiceData.currentChoice = "เยี่ยมยอด";
      practiceData.currentAnswer = "สุดยอดทำได้เยี่ยมมาก";
      countOfError = 0;
      practiceData.totalCorrectQuestion++;
    } else if (calculatedScore >= 0.5) {
      practiceData.isCorrectAnswer = true;
      practiceData.currentChoice = "เก่งมาก";
      practiceData.currentAnswer = "พูดได้ขนาดนี้ก็เก่งมากแล้ว";
      countOfError = 0;
      practiceData.totalCorrectQuestion++;
    } else {
      practiceData.isCorrectAnswer = false;

      practiceData.currentChoice = "ลองใหม่อีกครั้ง";
      practiceData.currentAnswer = "เธอทำได้อยู่แล้ว ลองพูดใหม่อีกครั้งนะ";

      if (rolePlayList.value[current.value].failCounter >= 1) {
        practiceData.currentAnswer = "เธอทำได้อยู่แล้ว ลองพูดใหม่อีกครั้งในประโยคถัดไปนะ";
      }

      if (
        current.value + 1 == rolePlayList.value.length &&
        rolePlayList.value[current.value].failCounter >= 1
      ) {
        practiceData.currentChoice = "";
        practiceData.currentAnswer = "ไม่เป็นไรนะ แบบฝึกหัดต่อไปทำได้แน่! ฝึกฝนพยายามเข้า";
      }

      isShowNextBtn.value = true;
      rolePlayList.value[current.value].failCounter++;

      countOfError = 0;
    }

    if (calculatedScore > rolePlayList.value[current.value].score) {
      rolePlayList.value[current.value].score = calculatedScore;
    }

    let totalScore = Math.round(
      (rolePlayList.value.map((x) => x.score).reduce((a, b) => a + b, 0) /
        rolePlayList.value.length) *
      100
    );

    let star = 0;

    if (totalScore >= 80) {
      star = 3;
    } else if (totalScore >= 65) {
      star = 2;
    } else if (totalScore >= 50) {
      star = 1;
    } else {
      star = 0;
    }

    isShowResult.value = false;

    practiceData.star = star;
    practiceData.score = totalScore;

    const practiceStore = usePracticeStore();

    try {
      await practiceStore.saveProgressLog(
        rolePlayList.value[practiceData.currentQuestion].id,
        route.params.practiceListId
      );
    } catch (progressError) {
      console.error("Error saving progress log:", progressError);
      // Don't block the flow if progress saving fails
    }

    clearTimeout(setTimeOut);

    // setTimeOut = setTimeout(() => {
    // isRecording.value = false;

    let structure = {
      no: practiceData.currentQuestion,
      isCorrect: practiceData.isCorrectAnswer,
      answer: practiceData.currentChoice,
      answerIndex: null,
    };

    let findIndex = answerStructure.filter((x) => x.no == practiceData.currentQuestion);

    if (findIndex.length) {
      answerStructure[findIndex[0].no] = structure;
    } else {
      answerStructure.push(structure);
    }

    if (practiceData.currentQuestion + 1 == practiceData.totalQuestion) {
      if (practiceData.isCorrectAnswer) {
        // console.log("Correct");
        practiceData.isFinishRolePlay = true;
        // practiceData.isEnableNext = true;
        // await finishPractice(answerStructure);
      } else {
        // console.log("Incorrect");
        if (rolePlayList.value[current.value].failCounter >= 2) {
          // console.log("Counter 2");
          practiceData.isFinishRolePlay = true;
          // practiceData.isEnableNext = true;
          // await finishPractice(answerStructure);
        } else {
          // console.log("Counter 1");
          practiceData.isFinishRolePlay = false;
          practiceData.isEnableNext = false;
        }
      }
    } else {
      // console.log("Next Question");
      if (calculatedScore >= 0.7 || calculatedScore >= 0.5) {
        // console.log("Correct");
        practiceData.isEnableNext = true;
      } else {
        // console.log("Incorrect");
        if (rolePlayList.value[current.value].failCounter >= 2) {
          // console.log("Counter 2");
          practiceData.isEnableNext = true;
        } else {
          // console.log("Counter 1");
          practiceData.isEnableNext = false;
        }
      }
    }

    countAnswerIndex = 0;
    countVoiceIndex = 0;

    practiceData.isSendAnswer = true;
    isShowLoading.value = false;
    // }, 1000);
  } catch (error) {
    console.error("Error in evaluate function:", error);
    // Force loading states to false to prevent UI hanging
    isShowLoading.value = false;
    isRecording.value = false;
    practiceData.isSendAnswer = true;

    // Show fallback error state
    practiceData.currentChoice = "เกิดข้อผิดพลาด";
    practiceData.currentAnswer = "เกิดข้อผิดพลาดในการประเมินผล กรุณาลองใหม่";
    isShowDialogErrorMicrophone.value = true;
  }
};
// #endregion

// #region Similarity
const similarity = (original, transcript) => {
  try {
    // transcript = "63415";
    var longer = original.toString().replace(/'/g, "'").replace(/-/g, "") || "";

    var shorter = transcript.toString().replace(/'/g, "'").replace(/-/g, "") || "";

    let originalForScore = longer.toString();
    let transcriptForScore = shorter.toString();

    if (original.length < transcript.length) {
      originalForScore = shorter.toString();
      transcriptForScore = longer.toString();
    }

    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }

    let copyLonger = longer
      .replace(/\./g, "")
      .replace(/\!/g, "")
      .replace(/,/g, "")
      .replace(/-/g, "");

    let copyShorter = shorter
      .replace(/\./g, "")
      .replace(/\!/g, "")
      .replace(/,/g, "")
      .replace(/-/g, "");

    let originalSplit = copyLonger.toString().split(" ");
    let transcriptSplit = copyShorter.toString().split(" ");

    let resultCompare = [];

    for (let i = 0; i < transcriptSplit.length; i++) {
      let o = originalSplit[i] || "";
      let t = transcriptSplit[i] || "";
      let result = {
        heard: t,
        correctWord: o,
      };

      if (t.localeCompare(o, undefined, { sensitivity: "accent" }) == 0) {
        result.isCorrect = true;
      } else {
        result.isCorrect = false;
      }
      resultCompare.push(result);
    }

    let score =
      resultCompare.filter((x) => x.isCorrect).length / originalSplit.length || 0;

    let compareScore = score || 0;
    // alert(compareScore);

    // let compareScore =
    //   (longerLength - editDistance(originalForScore, transcriptForScore)) /
    //   parseFloat(longerLength);

    return { compareScore, resultCompare };
  } catch (error) {
    evaluate(-1);
  }
};
// #endregion

// #region Check Answer Recorder
let countAnswerIndex = 0;
let countVoiceIndex = 0;
const funcCheckAnswerRecorder = (voice) => {
  let voiceText = voice;

  let textAnswer = rolePlayList.value[current.value].displayText[countAnswerIndex].text;

  if (rolePlayList.value[current.value].displayText[countAnswerIndex]) {
    // console.log("x1");
    if (!rolePlayList.value[current.value].displayText[countAnswerIndex].ignore) {
      // console.log("x2");

      if (
        rolePlayList.value[current.value].displayText[countAnswerIndex].specialTextList
          .length
      ) {
        textAnswer = rolePlayList.value[current.value].displayText[
          countAnswerIndex
        ].text.replace(/\-/g, "");
      }

      if (
        textAnswer.localeCompare(voiceText[countVoiceIndex].heard, undefined, {
          sensitivity: "accent",
        }) == 0
      ) {
        // console.log("x3");
        // console.log("Correct");
        rolePlayList.value[current.value].displayText[countAnswerIndex].isCorrect = true;
      } else {
        // console.log("x3");
        // console.log("Incorrect");
        rolePlayList.value[current.value].displayText[countAnswerIndex].isCorrect = false;
      }

      // console.log("x4");
      // console.log("Loop");
      countVoiceIndex++;
      // else {
      //   console.log("x4");
      //   console.log("Finish");
      //   funcCompleteCheckAnswer();
      //   return;
      // }
    }
    // else {
    //   // console.log("Ignore word");
    // }
    // else {
    //   console.log("Have Ignore");
    //   let displayTextLength = rolePlayList.value[current.value].displayText.filter(
    //     (x) => !x.ignore
    //   );

    //   console.log("displayTextLength: ", displayTextLength);

    //   if (countVoiceIndex + 1 == displayTextLength.length) {
    //     console.log("x4");
    //     console.log("Finish");
    //     funcCompleteCheckAnswer();
    //     return;
    //   }
    // }
  } else {
    // console.log("x5");
    // console.log("Finish");
    funcCompleteCheckAnswer();
    return;
  }

  let displayTextLength = rolePlayList.value[current.value].displayText.filter(
    (x) => !x.ignore
  );

  if (
    countVoiceIndex == displayTextLength.length ||
    countVoiceIndex == voiceText.length
  ) {
    // console.log("countVoiceIndex: ", countVoiceIndex);
    // console.log("x5");
    // console.log("Finish");
    funcCompleteCheckAnswer();
    return;
  }

  countAnswerIndex++;
  funcCheckAnswerRecorder(voice);
};
// #endregion

// #region Complete Check Answer
const funcCompleteCheckAnswer = () => {
  let tempArr = [...rolePlayList.value[current.value].displayText];

  tempArr = [...tempArr];

  let diff = Math.abs(
    resultTranscript.value.length -
    (tempArr.length - tempArr.filter((x) => x.ignore).length)
  );

  let differenceRule = 2;

  if (diff <= differenceRule) {
    let reverResultArray = [...tempArr];

    reverResultArray = reverResultArray.reverse();

    // Original Word
    let reverseResultWord = [...rolePlayList.value[current.value].displayText];

    reverseResultWord = reverseResultWord.reverse();

    let reverseSpeakArray = resultTranscript.value
      .map((x) => x.heard)
      .filter((x) => x)
      .reverse();

    let counter = 0;
    for (let i = 0; i < reverseResultWord.length; i++) {
      if (reverseResultWord[i].ignore) {
        continue;
      }

      if (
        reverseResultWord[i].text.localeCompare(reverseSpeakArray[counter], undefined, {
          sensitivity: "accent",
        }) === 0
      ) {
        reverResultArray[i].isCorrect = true;
      }

      counter++;
    }

    reverResultArray = reverResultArray.reverse();

    rolePlayList.value[current.value].displayText = reverResultArray;
  }

  let score =
    rolePlayList.value[current.value].displayText.filter((x) => x.isCorrect).length /
    (rolePlayList.value[current.value].displayText.length -
      tempArr.filter((x) => x.ignore).length);

  evaluate(score);
};
// #endregion

const compareTextLocale = (text1, text2) => {
  if (text1.localeCompare(text2, undefined, { sensitivity: "accent" }) == 0) return true;
  else return false;
};

const funcCheckIsNonText = (text) => {
  let temp = [",", ".", "!", "*", "?"];

  let findTemp = temp.find((x) => x == text);

  if (findTemp) return true;
  else return false;
};

// #endregion

let authListen;
const isSync = ref(false);
onMounted(async () => {
  try {
    isShowLoading.value = true;

    systemStore.setRouter("roleplay");

    authListen = firebase.auth().onAuthStateChanged(async function (user) {
      try {
        if (user) {
          if (analyticsLogEvent != null) {
            analyticsLogEvent("/roleplay");
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

          await funcCheckPermission();
          await funcLoadPractice();
        } else {
          // User is signed out.
          router.replace("/");
        }
      } catch (authError) {
        console.error("Error in auth state change:", authError);
        isShowLoading.value = false;
        alert("❌ เกิดข้อผิดพลาดในการตรวจสอบผู้ใช้\nกรุณาลองใหม่อีกครั้ง");
      }
    });
  } catch (error) {
    console.error("Error in onMounted:", error);
    isShowLoading.value = false;
    alert("❌ เกิดข้อผิดพลาดในการเริ่มต้นหน้า\nกรุณาลองใหม่อีกครั้ง");
  }
});

onBeforeUnmount(() => {
  if (authListen) {
    authListen();
  }
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

.box-container-main-mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url("/images/background_main/background-conversation.png");
  background-repeat: no-repeat;
  background-size: cover;
}

// .box-container-main.mobile {
//   max-width: 1000px;
//   width: 100%;
//   min-width: 320px;

//   overflow-y: auto;
// }

.backdrop-listening {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-practice-main {
  top: 15%;
}

.box-practice-main-mobile {
  max-width: 600px;
  width: 100%;
  min-width: 360px;
  margin: 16px auto;
}

.box-video-main {
  width: 58.75%;
  // border-bottom: 4px solid #35ccdf;
  margin: auto;
}

.box-video-main-mobile {
  border: 2px solid #4a261b;
}

.box-content-main {
  width: 55.9375%;
  background-color: #f2c043;
  border-radius: 0.7rem;
  border: 0.1rem solid #4a261b;
  padding: 0.3rem;
  margin: 1.7% auto;
  font-size: 16px;
  /* Fallback for older browsers */
  font-size: clamp(13px, 1.25vw, 20px);
  color: #4a261b;
}

.sub-content-main {
  background-color: #f6f3d3;
  border-radius: 0.4rem;
  padding: 2%;
}

.box-content-main-mobile {
  width: 100%;
  border-radius: 16px;
  border: 2px solid #4a261b;
  padding: 8px;
  background: #f2c043;
  margin: 16px auto;
}

.sub-content-main-mobile {
  padding: 16px;
  border-radius: 8px;
  background: #f6f3d3;
  color: #4a261b;
  font-size: 16px;
}

.box-record-main {
  margin-top: 2%;
}

.box-record-main-mobile {
  margin-top: 16px;
}

.box-recording-main {
  margin-top: 1%;
}

.box-recording-main-mobile {
  margin-top: 16px;
}

.box-dialog-error {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
}

.sub-dialog-error {
  color: #4a261b;
  border-radius: 12px;
  background: #ffedc4;
  padding: 16px 12px 12px 12px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-dialog-content {
  padding: 12px;
  border-radius: 10px;
  background: #efd080;
  margin: 16px 0px;
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

.button-active-main.disable {
  cursor: not-allowed;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: transform 0.1s;
  -webkit-transition: transform 0.1s;
  -moz-transition: transform 0.1s;
}

.button-active-main.button-play-video {
  width: 4.717%;
  margin: 0% 1%;
}

.button-play-video-mobile {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  font-size: 20px;
  margin: 0px 8px;
  line-height: 0;
}

.button-play-video-mobile::before {
  content: "";
  position: absolute;
  top: 0%;
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffd362 0%, #ffb701 100%);
}

.button-active-main.button-record-sound {
  width: 23.583%;
  margin: 0% 1%;
}

.button-record-sound-mobile {
  width: 200px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  margin: 0px 8px;
  line-height: 0;
  color: #4a261b;
}

.button-record-sound-mobile.disable {
  background: #9b9b9b;
  border: 1px solid solid #4a261b;
  border-radius: 10px;
  color: #fff;
  cursor: default;
}

.button-record-sound-mobile.disable::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: #bababa;
}

.button-record-sound-mobile:not(.disable)::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffd362 0%, #ffb701 100%);
}

.button-record-sound-mobile::after {
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
  border-radius: 20px 20px 7px 7px;
  z-index: 1;
}

.button-active-main.button-recording {
  width: 5.5865%;
  margin: 0% 1%;
}

.button-recording-mobile {
  width: 50px;
  margin: 0px 16px;
}

.button-recording-animation {
  animation: animteRecording 0.3s linear alternate infinite;
  -webkit-animation: animteRecording 0.3s linear alternate infinite;
  -moz-animation: animteRecording 0.3s linear alternate infinite;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
}

@keyframes animteRecording {
  0% {
    transform: scale(1);
    opacity: 0.65;
  }

  100% {
    transform: scale(1.2);
    opacity: 0.65;
  }
}

.animation-dots {
  animation: fadeDots 0.5s linear infinite;
  -webkit-animation: fadeDots 0.5s linear infinite;
  -moz-animation: fadeDots 0.5s linear infinite;
}

@keyframes fadeDots {
  to {
    opacity: 0;
  }
}

.button-active-main.back-menu {
  width: 200px;
  background: #db8200;
  padding: 5px;
  margin: auto;
  border-radius: 10px;
}

// #endregion

// #region Text
.box-text-recording {
  margin-left: 2%;
}

.box-text-recording-mobile {
  margin-left: 32px;
}

// #endregion

// #region Animation
.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}

// #endregion

video {
  -webkit-playsinline: true;
  playsinline: true;
}
</style>
