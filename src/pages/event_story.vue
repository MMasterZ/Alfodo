<template>
  <q-page
    class="row"
    :class="eventData.platform.desktop ? 'event-container' : ''"
  >
    <!-- #region Desktop -->
    <div
      class="event-content relative-position"
      v-if="eventData.platform.desktop"
    >
      <background-story
        :isSelectedUnit="eventData.isSelectedUnit"
      ></background-story>
      <!-- <div>
        <q-img
          src="/images/background_main/background-story.png"
          style="
            position: relative;
            max-width: 1600px;
            min-width: 1200px;
            width: 100%;
            height: 900px;
          "
          :style="eventData.isSelectedUnit ? '' : 'filter: blur(3px)'"
        ></q-img>
      </div> -->

      <!-- Header Menu -->
      <div
        class="absolute-center fit row brx"
        v-if="!eventData.isLoading && !eventData.isFinishSpeaking"
      >
        <div class="col-12 brx self-start">
          <header-story :eventData="eventData"></header-story>
        </div>

        <!-- Menu -->
        <div class="col-12 self-start" v-if="!eventData.isSelectedUnit">
          <!-- Menu -->
          <menu-story
            :eventData="eventData"
            v-if="!eventData.isShop"
          ></menu-story>

          <!-- Shop -->
          <shop-story
            :diamond="eventData.diamond"
            v-if="eventData.isShop"
            :eventData="eventData"
          ></shop-story>
        </div>

        <!--  Start Practice -->
        <div
          class="col-12 absolute-center fit row"
          v-if="eventData.isSelectedUnit"
        >
          <!-- Dialog Start -->
          <dialog-start
            :eventData="eventData"
            v-if="!eventData.isStartPractice"
          ></dialog-start>

          <!-- Practice -->
          <practice-story
            :eventData="eventData"
            v-if="eventData.isStartPractice || eventData.isStartSpeaking"
          ></practice-story>

          <div
            v-if="eventData.isSelectedUnit"
            class="absolute-center fit"
            style="background-color: rgba(0, 0, 0, 0.5); z-index: 2"
          ></div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div
      class="event-content-mobile relative-position"
      v-if="eventData.platform.mobile"
    >
      <div
        class="absolute-center event-background-mobile fit"
        :class="eventData.isSelectedUnit ? '' : 'blur'"
      ></div>

      <!-- Header Menu -->
      <div
        class="absolute-center fit"
        v-if="!eventData.isLoading && !eventData.isFinishSpeaking"
      >
        <div class="col-12 self-start">
          <header-story :eventData="eventData"></header-story>
        </div>

        <!-- Menu -->
        <div class="col-12 self-start q-pt-md" v-if="!eventData.isSelectedUnit">
          <!-- Menu -->
          <menu-story
            :eventData="eventData"
            v-if="!eventData.isShop"
          ></menu-story>

          <!-- Shop -->
          <shop-story
            :diamond="eventData.diamond"
            v-if="eventData.isShop"
            :eventData="eventData"
          ></shop-story>
        </div>

        <!-- #region Start Practice -->
        <div
          class="col-12 absolute-center fit row"
          v-if="eventData.isSelectedUnit"
        >
          <!-- #region Dialog Start -->
          <dialog-start
            :eventData="eventData"
            v-if="!eventData.isStartPractice"
          ></dialog-start>
          <!-- #endregion -->

          <!-- #region Practice -->
          <practice-story
            :eventData="eventData"
            v-if="eventData.isStartPractice || eventData.isStartSpeaking"
          ></practice-story>
          <!-- #endregion -->

          <div
            v-if="eventData.isSelectedUnit"
            class="absolute-center fit"
            style="background-color: rgba(0, 0, 0, 0.5); z-index: 2"
          ></div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->

    <!-- Next To Speaking -->
    <dialog-next-to-speaking
      :eventData="eventData"
      :isShowDialog="eventData.isDialogNextToSpeaking"
    ></dialog-next-to-speaking>

    <dialog-finish-practice
      :eventData="eventData"
      :isShowDialog="eventData.isFinishSpeaking"
    ></dialog-finish-practice>

    <!-- Loading  -->
    <loading :isShowLoading="eventData.isLoading"></loading>
  </q-page>
</template>

<script>
import HeaderStory from "src/components/event_main/event-header.vue";
import BackgroundStory from "components/event_main/event-story-background.vue";
import MenuStory from "components/event_main/event-story-menu.vue";
import DialogStart from "components/event_main/event-story-dialog-start.vue";
import PracticeStory from "components/event_main/event-story-practice.vue";
import ShopStory from "components/event_main/event-story-shop.vue";
import DialogNextToSpeaking from "components/event_main/event-story-dialog-next-to-speaking.vue";
import DialogFinishPractice from "components/event_main/event-story-finish-practice.vue";

// Loading
import Loading from "components/dialog-loading.vue";
import { useSystemStore } from "src/stores/system";
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";

import { useRouter } from "vue-router";
import { event, useQuasar } from "quasar";
import { useEventStore } from "src/stores/event";
import { db, st } from "src/router";
import axios from "axios";
import { useStudentStore } from "src/stores/student";

export default {
  components: {
    HeaderStory,
    BackgroundStory,
    MenuStory,
    DialogStart,
    PracticeStory,
    ShopStory,
    DialogNextToSpeaking,
    DialogFinishPractice,

    // Loading
    Loading,
  },
  setup(props) {
    // Initial Data
    const systemStore = useSystemStore();
    const router = useRouter();
    const $q = useQuasar();

    let audioContext;
    let recorder;

    const eventData = reactive({
      platform: systemStore.platform,
      answerList: [],
      progress: 60,
      diamond: 0,
      star: 3,
      score: 0,

      selectedUnit: 0,
      practiceList: [],
      itemList: [
        {
          id: 1,
          name: "item 1",
          image: "/images/icon_main/icon-event-collect-lock.png",
          status: "lock",
          progress: "30",
        },
        {
          id: 2,
          name: "item 2",
          image: "/images/icon_main/icon-event-collect-lock.png",
          status: "lock",
          progress: "70",
        },
        {
          id: 3,
          name: "item 3",
          image: "/images/icon_main/icon-event-collect-lock.png",
          status: "lock",
          progress: "100",
        },
      ],

      // Practice
      selectedAnswer: null,
      currentQuestionIndex: null,
      questionList: [],

      // ChatList
      currentPlayAudioChat: 0,
      chatList: [],

      // Character NPC
      selectedCharacterId: null,

      // Itemshop
      currentPageItemshop: 0,
      itemshopList: [],

      // Boolean
      isPlayAudioChat: false,
      isRecorder: false,
      isSelectedAnswer: false,
      isSelectedUnit: false,
      isShop: true,
      isLoading: true,
      isStartPractice: false,
      isFinishPractice: false,
      isStartSpeaking: false,
      isFinishSpeaking: false,
      isFinishContent: false,
      isDialogNextToSpeaking: false,
      isEventItemshopLoading: true,

      // temp audio sound
      tempAudio: null,

      // #region Function
      func: {
        // Selected Unit
        async selectedUnit(data) {
          const eventStore = useEventStore();

          eventData.isLoading = true;
          eventData.isSelectedUnit = true;
          eventData.selectedUnit = data.unit;

          eventStore.setEventPracticeListId(data.eventPracticeListId);
          let response = await eventStore.getEventPracticeData();

          eventData.questionList = response;

          eventData.currentQuestionIndex = response[0].order;
          eventData.selectedCharacterId = response[0].character;

          eventData.isLoading = false;
        },

        // Start practice
        startPractice() {
          eventData.isStartPractice = true;

          if (
            eventData.com.questionData.type == "dialogue" ||
            eventData.com.questionData.type == "fillintheblank"
          ) {
            this.playAudio(eventData.com.questionData.soundUrl);
          }
        },

        // Play Audio
        playAudio(url) {
          this.stopAudio();

          if (url) {
            eventData.tempAudio = new Audio(url);
            eventData.tempAudio.play();
            return;
          }

          eventData.tempAudio = new Audio(eventData.com.questionData.soundUrl);
          eventData.tempAudio.play();
        },

        // Next Question
        async nextQuestion() {
          let tempQuestion = eventData.questionList;

          let tempData = eventData.com.questionData;

          // Practice
          if (!eventData.isStartSpeaking) {
            // Type : Multiple Choices
            if (!tempData.isQuestion) {
              if (tempData.type == "fillinmultiple") {
                tempData.userAnswer =
                  tempData.choices[eventData.selectedAnswer];

                let findTagTh =
                  tempData.userAnswer.answerTh.match(/s*\,/g) || 0;

                if (findTagTh.length) {
                  tempData.sentenceTh = tempData.sentenceTh;

                  findTagTh = tempData.userAnswer.answerTh.split(/s*\,/);
                  let findTagQuestion =
                    tempData.userAnswer.answerTh.split(/s*\,/);

                  for (let i = 0; i < findTagTh.length; i++) {
                    tempData.sentenceTh = tempData.sentenceTh.replace(
                      /\[\]/,
                      findTagAnswer[i]
                    );

                    tempData.sentenceEn = tempData.sentenceEn.replace(
                      /\[\]/,
                      findTagQuestion[i]
                    );
                  }
                } else {
                  if (tempData.sentenceEn != "") {
                    tempData.sentenceTh = tempData.sentenceTh
                      .replace(/\s\[\]\s/, tempData.userAnswer.answerTh)
                      .replace(/\s\[\]/, tempData.userAnswer.answerTh);

                    tempData.sentenceEn = tempData.sentenceEn
                      .replace(/\[\]/, tempData.userAnswer.answerEn)
                      .replace(/\s\[\]/, tempData.userAnswer.answerEn);
                  } else {
                    tempData.sentenceTh = tempData.userAnswer.answerTh;
                    tempData.sentenceEn = tempData.userAnswer.answerEn;
                  }
                }

                tempData.soundUrl = tempData.userAnswer.sentenceUrl;
              }
              // Type : Fill in the blank
              else if (tempData.type == "fillintheblank") {
                let findTagQuestion = tempData.sentenceEn.match(/s*\[\]/g) || 0;

                if (findTagQuestion.length) {
                  tempData.sentenceEn = tempData.sentenceEn;

                  tempData.sentenceTh = tempData.sentenceTh;

                  for (let i = 0; i < findTagQuestion.length; i++) {
                    tempData.sentenceEn = tempData.sentenceEn.replace(
                      /\[\]/,
                      eventData.answerList[i]
                    );

                    tempData.sentenceTh = tempData.sentenceTh.replace(
                      /\[\]/,
                      eventData.answerList[i]
                    );
                  }
                }
              } else if (tempData.type == "multiplechoices") {
                tempData.userAnswer =
                  tempData.choices[eventData.selectedAnswer];

                tempData.sentenceTh = tempData.userAnswer.answerTh;
                tempData.sentenceEn = tempData.userAnswer.answerEn;

                tempData.soundUrl = tempData.userAnswer.soundUrl;
              }
            }

            eventData.answerList = [];

            if (!tempData.isFinishContent && !tempData.isQuestion) {
              tempData.isFinishContent = true;
              this.playAudio(tempData.soundUrl);
              return;
            }

            tempData.isGroup = true;

            eventData.chatList.push(tempData);

            if (tempData.isQuestion) {
              if (tempData.isEnd) {
                eventData.isFinishPractice = true;

                if (!eventData.isStartSpeaking) {
                  setTimeout(() => {
                    eventData.isDialogNextToSpeaking = true;
                  }, 1000);
                } else {
                  eventData.isFinishSpeaking = true;
                }

                return;
              }
              eventData.currentQuestionIndex = Number(tempData.nextToOrder);
            } else {
              if (
                tempData.type == "multiplechoices" ||
                tempData.type == "fillinmultiple"
              ) {
                let findNextQuestion =
                  tempData.choices[eventData.selectedAnswer];

                if (findNextQuestion.isEnd) {
                  eventData.isFinishPractice = true;

                  if (!eventData.isStartSpeaking) {
                    setTimeout(() => {
                      eventData.isDialogNextToSpeaking = true;
                    }, 1000);
                  } else {
                    eventData.isFinishSpeaking = true;
                  }

                  return;
                }

                eventData.currentQuestionIndex = Number(
                  findNextQuestion.nextToOrder
                );
              } else if (tempData.type == "fillintheblank") {
                if (tempData.isEnd) {
                  eventData.isFinishPractice = true;

                  if (!eventData.isStartSpeaking) {
                    setTimeout(() => {
                      eventData.isDialogNextToSpeaking = true;
                    }, 1000);
                  } else {
                    eventData.isFinishSpeaking = true;
                  }

                  return;
                }

                eventData.currentQuestionIndex = Number(tempData.nextToOrder);
              }
            }
          }
          // Speaking
          else {
            eventData.chatList.push(tempData);

            let setScore =
              Math.round(
                (eventData.questionList
                  .filter((item) => {
                    return item.isGroup && !item.isQuestion;
                  })
                  .map((item) => item.scoreSpeaking)
                  .reduce((a, b) => a + b, 0) /
                  eventData.questionList.filter((item) => {
                    return item.isGroup && !item.isQuestion;
                  }).length) *
                  100
              ) || 0;

            let setStar = 3;

            if (setScore >= 80) {
              setStar = 3;
            } else if (setScore >= 65) {
              setStar = 2;
            } else if (setScore >= 50) {
              setStar = 1;
            } else {
              setStar = 0;
            }

            eventData.star = setStar;
            eventData.score = setScore;

            let isFinish = false;

            if (
              tempData.type != "fillinmultiple" &&
              tempData.type != "multiplechoices"
            ) {
              isFinish = tempData.isEnd;
              if (!isFinish) {
                eventData.currentQuestionIndex = tempData.nextToOrder;
              }
            } else {
              isFinish = tempData.userAnswer.isEnd;
              if (!isFinish) {
                eventData.currentQuestionIndex =
                  tempData.userAnswer.nextToOrder;
              }
            }

            if (isFinish) {
              eventData.isLoading = true;

              if (eventData.star == 0) {
                eventData.isFinishSpeaking = true;
                eventData.isLoading = false;
                return;
              }

              const eventStore = useEventStore();

              await eventStore.saveEventPracticeLog(eventData);
              eventData.isFinishSpeaking = true;
              eventData.isLoading = false;
              return;
            }
          }

          if (eventData.isFinishPractice) {
            if (eventData.currentQuestionIndex == tempQuestion.length - 1) {
              eventData.isFinishPractice = true;

              if (!eventData.isStartSpeaking) {
                setTimeout(() => {
                  eventData.isDialogNextToSpeaking = true;
                }, 1000);
              } else {
                eventData.isFinishSpeaking = true;
              }

              eventData.selectedAnswer = null;
              return;
            }
          }

          let findNextQuestion = eventData.questionList.find((item) => {
            return item.order == eventData.currentQuestionIndex;
          });

          if (findNextQuestion.soundUrl != "") {
            this.playAudio(findNextQuestion.soundUrl);
          }

          eventData.selectedAnswer = null;
          eventData.isFinishContent = false;
        },

        // Start Speaking
        async startSpeaking() {
          // console.clear();

          await funcCheckMicrophone();

          eventData.isLoading = true;

          eventData.chatList = [];
          eventData.isFinishPractice = false;
          eventData.isDialogNextToSpeaking = false;
          eventData.isStartSpeaking = true;

          eventData.currentQuestionIndex = 1;

          let findNextQuestion = eventData.questionList.find((item) => {
            return item.order == eventData.currentQuestionIndex;
          });

          if (findNextQuestion.soundUrl != "") {
            this.playAudio(findNextQuestion.soundUrl);
          }

          eventData.isLoading = false;
        },

        // Restart Practice
        async restartPractice() {
          const eventStore = useEventStore();

          eventData.isPlayAudioChat = false;
          eventData.isRecorder = false;
          eventData.isSelectedAnswer = false;
          eventData.isStartPractice = false;
          eventData.isFinishPractice = false;
          eventData.isStartSpeaking = false;
          eventData.isFinishSpeaking = false;
          eventData.isDialogNextToSpeaking = false;
          eventData.currentQuestionIndex = null;
          eventData.isFinishContent = false;
          eventData.selectedAnswer = null;
          eventData.isShop = false;
          eventData.score = 0;
          eventData.star = 3;
          eventData.chatList = [];

          // this.stopRecorder();
          this.stopRecorderAndroid();
          this.stopRecorderDesktop();
          this.stopRecorderIOS();
          this.stopAudio();

          let response = await eventStore.getEventPracticeData();

          eventData.questionList = response;

          eventData.currentQuestionIndex = response[0].order;
          eventData.selectedCharacterId = response[0].character;
        },

        // Back To Menu
        async backToMenu() {
          eventData.chatList = [];

          eventData.currentQuestionIndex = 0;
          eventData.isFinishPractice = false;
          eventData.isRecorder = false;
          eventData.isDialogNextToSpeaking = false;
          eventData.isStartSpeaking = false;
          eventData.isFinishSpeaking = false;
          eventData.isStartPractice = false;
          eventData.isSelectedUnit = false;
          eventData.isSelectedAnswer = false;
          eventData.selectedAnswer = null;
          eventData.isPlayAudioChat = false;
          eventData.isFinishContent = false;

          eventData.score = 0;
          eventData.star = 3;

          // this.stopRecorder();
          this.stopRecorderAndroid();
          this.stopRecorderDesktop();
          this.stopRecorderIOS();
          this.stopAudio();

          const eventStore = useEventStore();

          eventStore.eventPracticeData.isLoaded = false;
          eventStore.eventData.eventPracticeListId = "";

          await funcGetPracticeList();
        },

        // Play Audio Chat
        playAudioChat() {
          let tempChatList = eventData.chatList.map((x) => x.soundUrl);

          eventData.isPlayAudioChat = true;

          if (eventData.currentPlayAudioChat == tempChatList.length) {
            this.stopAudioChat();
          } else {
            if (eventData.tempAudio) {
              eventData.tempAudio.pause();
            }

            eventData.tempAudio = new Audio(
              tempChatList[eventData.currentPlayAudioChat]
            );
            eventData.tempAudio.play();

            eventData.tempAudio.onended = () => {
              eventData.currentPlayAudioChat++;
              if (eventData.isPlayAudioChat) {
                this.playAudioChat();
              }
            };
          }
        },

        // Stop Audio
        stopAudioChat() {
          eventData.isPlayAudioChat = false;
          eventData.currentPlayAudioChat = 0;
          if (eventData.tempAudio) {
            eventData.tempAudio.pause();
          }

          eventData.tempAudio = null;
        },

        // Stop Audio Chat
        stopAudio() {
          eventData.isPlayAudioChat = false;
          eventData.currentPlayAudioChat = 0;
          if (eventData.tempAudio) {
            eventData.tempAudio.pause();
          }

          eventData.tempAudio = null;
        },

        // #region function for recorder
        async startRecorder() {
          try {
            console.log(" ");
            console.log(" Start Recorder : Function");
            if ($q.platform.is.desktop) {
              console.log("***** Desktop Mode");
              eventData.func.mediaRecorderDesktop();
            } else if (!$q.platform.is.ios) {
              console.log("***** Android Mode");
              eventData.func.mediaRecorderAndroid();
            } else if ($q.platform.is.ios) {
              console.log("***** IOS Mode");
              eventData.func.mediaRecorderIOS();
            }
            return;

            navigator.mediaDevices
              .getUserMedia({
                audio: true,
              })
              .then(function (stream) {})
              .catch(function (error) {
                if ($q.platform.is.ios) {
                  alert("Error: " + error);
                  alert(
                    "Unable to access microphone. Please check your browser settings."
                  );
                } else {
                  if (
                    error.name === "NotAllowedError" ||
                    error.name === "NotFoundError"
                  ) {
                    $q.notify({
                      message:
                        "กรุณาเปิดไมค์โครโฟนของคุณให้พร้อมใช้งานในหน้านี้",
                      timeout: 2000,
                      icon: "fas fa-exclamation-triangle",
                      position: "top",
                    });

                    // alert("Microphone permission not granted.");
                    router.replace("/lobby");
                  } else {
                    $q.notify({
                      message: "ไมค์โครโฟนของคุณเกิดข้อผิดพลาด",
                      timeout: 2000,
                      icon: "fas fa-exclamation-triangle",
                      position: "top",
                    });

                    router.replace("/lobby");
                    throw Promise.reject(error);
                  }
                }
              });
          } catch (e) {
            alert(e);
            if ($q.platform.is.ios) {
              alert("Error: " + error);
              alert(
                "Unable to access microphone. Please check your browser settings."
              );
            }

            if (!$q.platform.is.ios) {
              if (
                error.name === "NotAllowedError" ||
                error.name === "NotFoundError"
              ) {
                $q.notify({
                  message: "กรุณาเปิดไมค์โครโฟนของคุณให้พร้อมใช้งานในหน้านี้",
                  timeout: 2000,
                  icon: "fas fa-exclamation-triangle",
                  position: "top",
                });

                // alert("Microphone permission not granted.");
                router.replace("/lobby");
              } else {
                $q.notify({
                  message: "ไมค์โครโฟนของคุณเกิดข้อผิดพลาด",
                  timeout: 2000,
                  icon: "fas fa-exclamation-triangle",
                  position: "top",
                });

                router.replace("/lobby");
                throw Promise.reject(error);
              }
            }
          }
        },
        // #endregion

        // #region Media Recorder Android
        async mediaRecorderAndroid() {
          console.log(" - Media Recorder : Function Android - ");

          try {
            $q.loading.show();

            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });

            $q.loading.hide();

            eventData.isRecorder = true;

            audioStream = stream;

            mediaRecorder = new MediaRecorder(stream);

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                chunks.push(event.data);
              }
            };

            mediaRecorder.onstop = () => {
              console.log(" Stop Recorder : On Stop");
              const audioBlob = new Blob(chunks, { type: "audio/mp3" });
              const audioUrl = URL.createObjectURL(audioBlob);

              eventData.tempAudio = new Audio(audioUrl);

              eventData.tempAudio.oncanplaythrough = () => {
                eventData.tempAudio.play();
                var reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async function () {
                  var base64data = reader.result.split(",")[1];

                  const APIURL = `${process.env.NEWAPI}/stt-stt`;

                  const POSTDATA = {
                    fileBase64: base64data,
                  };

                  const response = await axios.post(APIURL, POSTDATA);

                  if (response.data != "Error") {
                    const transcript = response.data;
                    let getCompare = similarity(
                      eventData.com.questionData.sentenceEn,
                      transcript
                    );
                    if (getCompare.resultCompare.length > 0) {
                      funcCheckAnswerRecorder(getCompare.resultCompare);
                    }
                  }
                };
              };
            };

            console.log(" Start Recorder : On Start");

            mediaRecorder.start();
            eventData.func.stopRecorderAndroid();
          } catch (e) {
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
              color: "negative",
              timeout: 2000,
            });

            eventData.isRecorder = false;

            if (mediaRecorder && mediaRecorder.state !== "inactive") {
              mediaRecorder.stop();
            }
          }
        },

        stopRecorderAndroid() {
          console.log(" Stop Recorder : Function Android ");
          try {
            let setQuestionTimeOut =
              eventData.com.questionData.sentenceEn.split(" ");

            setQuestionTimeOut = setQuestionTimeOut.length * 700;

            if (setQuestionTimeOut < 3000) {
              setQuestionTimeOut = 3000;
            } else if (setQuestionTimeOut > 10000) {
              setQuestionTimeOut = 10000;
            }

            console.log("---- Start Media Recorder ----");

            setTimeout(() => {
              console.log("---- Stop Media Recorder Android ----");
              mediaRecorder.stop();
              audioStream.getTracks().forEach((track) => track.stop());

              chunks = [];

              this.stopAudio();
            }, setQuestionTimeOut);
          } catch (e) {
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
              color: "negative",
              timeout: 2000,
            });

            eventData.isRecorder = false;

            if (mediaRecorder && mediaRecorder.state !== "inactive") {
              mediaRecorder.stop();
            }
          }
        },
        // #endregion

        // #region Media Recorder Desktop
        async mediaRecorderDesktop() {
          console.log(" - Media Recorder : Function For Android - ");

          const studentStore = useStudentStore();

          try {
            eventData.isRecorder = true;

            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });

            audioStream = stream;

            mediaRecorder = new MediaRecorder(stream);

            const SpeechRecognition =
              window.SpeechRecognition || window.webkitSpeechRecognition;

            recognition = new SpeechRecognition();

            recognition.continuous = true;
            recognition.interimResults = true;

            console.log(" Start Recorder : On Start");

            recognition.start();

            console.log(" Start Recorder Recognition : On Start");

            let setTranscript;
            recognition.onresult = (event) => {
              const transcript = event.results[0][0].transcript;

              let getCompare = similarity(
                eventData.com.questionData.sentenceEn,
                transcript
              );

              setTranscript = getCompare;
            };

            recognition.onerror = (event) => {
              console.error("Speech recognition error:", event.error);
              $q.notify({
                message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
                color: "negative",
                timeout: 2000,
              });
              eventData.isRecorder = false;
              recognition.stop();
            };

            recognition.onend = () => {
              if (setTranscript.resultCompare.length > 0) {
                funcCheckAnswerRecorder(setTranscript.resultCompare);
              }

              recognition.stop();
            };

            mediaRecorder.start();

            mediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                chunks.push(event.data);
              }
            };

            mediaRecorder.onstop = () => {
              console.log(" Stop Recorder : On Stop");

              console.log(chunks);

              if (chunks.length) {
                const audioBlob = new Blob(chunks, { type: "audio/wav" });

                console.log(`audioBlob : ${audioBlob}`);
                const audioUrl = URL.createObjectURL(audioBlob);
                eventData.tempAudio = new Audio(audioUrl);

                console.log(`audioUrl : ${audioUrl}`);

                eventData.tempAudio.oncanplaythrough = () => {
                  console.log("Play Audio");
                  eventData.tempAudio.play();

                  // const formData = new FormData();
                  // formData.append("audio", audioBlob);
                  // console.log(formData);

                  // #region Upload Audio to Firebase
                  // let setName = `${
                  //   eventData.questionList[eventData.currentQuestionIndex]
                  //     .practiceId
                  // }-${studentStore.studentId}`;
                  // await st
                  //   .child(`/event/student_voice/${setName}`)
                  //   .put(audioBlob)
                  //   .then((snapshot) => snapshot.ref.getDownloadURL())
                  //   .then((url) => {
                  //     console.log(url);
                  //     eventData.questionList[
                  //       eventData.currentQuestionIndex
                  //     ].recorderUrl = url;
                  //   });
                  // #endregion
                };
              }
            };

            eventData.func.stopRecorderDesktop();
          } catch (e) {
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
              color: "negative",
              timeout: 2000,
            });

            eventData.isRecorder = false;

            if (mediaRecorder && mediaRecorder.state !== "inactive") {
              mediaRecorder.stop();
              recognition.stop();
            }
          }
        },

        stopRecorderDesktop() {
          console.log(" Stop Recorder : Function Desktop");
          try {
            let setQuestionTimeOut =
              eventData.com.questionData.sentenceEn.split(" ");

            setQuestionTimeOut = setQuestionTimeOut.length * 700;

            if (setQuestionTimeOut < 3000) {
              setQuestionTimeOut = 3000;
            } else if (setQuestionTimeOut > 10000) {
              setQuestionTimeOut = 10000;
            }

            console.log("---- Start Media Recorder : Desktop ----");

            setTimeout(() => {
              console.log("---- Stop Media Recorder : Desktop ----");
              mediaRecorder.stop();
              audioStream.getTracks().forEach((track) => track.stop());
              chunks = [];
              recognition.stop();

              eventData.isRecorder = false;
              this.stopAudio();
            }, setQuestionTimeOut);
          } catch (e) {
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
              color: "negative",
              timeout: 2000,
            });

            eventData.isRecorder = false;

            if (mediaRecorder && mediaRecorder.state !== "inactive") {
              mediaRecorder.stop();
              recognition.stop();
            }
          }
        },
        // #endregion

        // #region Media Recorder IOS
        async mediaRecorderIOS() {
          // alert(" - Media Recorder : Function IOS - ");

          try {
            eventData.isRecorder = true;

            const SpeechRecognition =
              window.SpeechRecognition || window.webkitSpeechRecognition;

            recognition = new SpeechRecognition();

            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.lang = "en-US";
            recognition.maxAlternatives = 1;
            recognition.interimResults = true;

            recognition.start();

            let setTranscript;
            recognition.onresult = (event) => {
              const transcript = event.results[0][0].transcript;

              let getCompare = similarity(
                eventData.com.questionData.sentenceEn,
                transcript
              );

              setTranscript = getCompare;
            };

            recognition.onerror = (event) => {
              console.error("Speech recognition error:", event.error);
              $q.notify({
                message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง A",
                color: "negative",
                timeout: 2000,
              });
              eventData.isRecorder = false;
              recognition.stop();
            };

            recognition.onend = (e) => {
              if (setTranscript.resultCompare.length > 0) {
                funcCheckAnswerRecorder(setTranscript.resultCompare);
              }

              // eventData.isRecorder = false;
              recognition.stop();
            };

            eventData.func.stopRecorderIOS();
          } catch (e) {
            console.error("Speech recognition error:", event.error);
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง B",
              color: "negative",
              timeout: 2000,
            });
            eventData.isRecorder = false;
            recognition.stop();
          }
        },

        stopRecorderIOS() {
          try {
            let setQuestionTimeOut =
              eventData.com.questionData.sentenceEn.split(" ");

            setQuestionTimeOut = setQuestionTimeOut.length * 700;

            if (setQuestionTimeOut < 3000) {
              setQuestionTimeOut = 3000;
            } else if (setQuestionTimeOut > 10000) {
              setQuestionTimeOut = 10000;
            }

            setTimeout(() => {
              eventData.isRecorder = false;
              recognition.stop();
            }, setQuestionTimeOut);
          } catch (e) {
            $q.notify({
              message: "เกิดข้อผิดพลาย ลองใหม่อีกครั้ง",
              color: "negative",
              timeout: 2000,
            });
            eventData.isRecorder = false;
            recognition.stop();
          }
        },
        // #endregion

        nextPractice() {
          // console.log("#region nextPractice");
          this.backToMenu();
        },
      },
      // #endregion

      // #region Computed
      com: {
        unitData: computed(() => {
          let tempData = {
            id: 0,
            nameEn: "-",
            status: "unlock",
          };

          try {
            let findPracticeList = eventData.practiceList.find(
              (x) => x.unit == eventData.selectedUnit
            );

            if (findPracticeList) {
              return findPracticeList || tempData;
            } else {
              return tempData;
            }
          } catch (e) {
            return tempData;
          }
        }),
        questionData: computed(() => {
          let tempData = {
            id: 0,
            sentenceEn: "",
            sentenceTh: "",
            userAnswer: {},
            audioURL: "",
            recorderUrl: "",
            displayText: [],
            type: "",

            // Boolearn
            isQuestion: false,
            isRecorder: false,
          };

          let findData = {};

          if (eventData.isStartSpeaking) {
            findData = eventData.questionList.find(
              (x) => x.order == eventData.currentQuestionIndex && x.isGroup
            );
          } else {
            findData = eventData.questionList.find(
              (x) => x.order == eventData.currentQuestionIndex
            );
          }

          if (findData) return findData || tempData;
        }),
        showCharacterData: computed(() => {
          const eventStore = useEventStore();

          let tempCharacterData = eventStore.eventDataInfo.characters.find(
            (x) => x.characterId == eventData.selectedCharacterId
          );

          return tempCharacterData;
        }),
        isPassedPractice: computed(() => {
          const eventStore = useEventStore();

          return eventStore.eventPracticeDataInfo.isPassed || false;
        }),
      },
      // #endregion
    });

    const similarity = (original, transcript) => {
      var longer = original.replace(/’/g, "'");
      var shorter = transcript.replace(/’/g, "'");

      let originalForScore = longer;
      let transcriptForScore = shorter;

      if (original.length < transcript.length) {
        originalForScore = shorter;
        transcriptForScore = longer;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }

      let copyLonger = longer
        .replace(/\./g, "")
        .replace(/\!/g, "")
        .replace(/,/g, "");

      let copyShorter = shorter
        .replace(/\./g, "")
        .replace(/\!/g, "")
        .replace(/,/g, "");

      let originalSplit = copyLonger.split(" ");
      let transcriptSplit = copyShorter.split(" ");

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
        resultCompare.filter((x) => x.isCorrect).length / originalSplit.length;

      let compareScore = score;

      return { compareScore, resultCompare };
    };

    // Set Question Dislay Text
    const funcSetNewQuestion = () => {
      let tempQuestion = eventData.com.questionData;

      let regexp = /\s+/g;

      let setSpecialText = tempQuestion.sentenceEn
        .replace(/\./g, " . ")
        .replace(/\,/g, " , ")
        .replace(/\!/g, " ! ")
        .replace(/\?/g, " ? ")
        .split(regexp)
        .filter((x) => x != " " && x != "");

      let tempArr = [];

      for (var i = 0; i < setSpecialText.length; i++) {
        var newData = {
          text: setSpecialText[i],
          isCorrect: false,
          ignore: false,
        };

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

      tempArr = tempArr.filter((x) => x.text != "");

      return tempArr;
    };

    // Check Answer
    let countAnswerIndex = 0;
    let countVoiceIndex = 0;
    let resultTranscript = "";
    let tempDisplayText = [];
    const funcCheckAnswerRecorder = (voice) => {
      let voiceText = voice;

      resultTranscript = voice;

      if (tempDisplayText.length == 0) {
        tempDisplayText = funcSetNewQuestion();
      }

      if (tempDisplayText[countAnswerIndex]) {
        if (!tempDisplayText[countAnswerIndex].ignore) {
          if (
            tempDisplayText[countAnswerIndex].text.localeCompare(
              voiceText[countVoiceIndex].heard,
              undefined,
              {
                sensitivity: "accent",
              }
            ) == 0
          ) {
            tempDisplayText[countAnswerIndex].isCorrect = true;
          } else {
            tempDisplayText[countAnswerIndex].isCorrect = false;
          }

          if (countVoiceIndex + 1 != voiceText.length) {
            countVoiceIndex++;
          } else {
            funcCompleteCheckAnswerRecorder(tempDisplayText);
            return;
          }
        }
      } else {
        funcCompleteCheckAnswerRecorder(tempDisplayText);
        return;
      }

      countAnswerIndex++;
      funcCheckAnswerRecorder(voice);
    };

    // Complete Check Answer Recorder
    const funcCompleteCheckAnswerRecorder = (tempQuestion) => {
      let tempArr = [...tempQuestion];

      tempArr = [...tempArr];

      let diff = Math.abs(
        resultTranscript.length -
          (tempArr.length - tempArr.filter((x) => x.ignore).length)
      );

      let differenceRule = 2;

      if (diff <= differenceRule) {
        let reverResultArray = [...tempArr];

        reverResultArray = reverResultArray.reverse();

        // Original Word
        let reverseResultWord = [...tempQuestion];

        reverseResultWord = reverseResultWord.reverse();

        let reverseSpeakArray = resultTranscript
          .map((x) => x.heard)
          .filter((x) => x)
          .reverse();

        let counter = 0;
        for (let i = 0; i < reverseResultWord.length; i++) {
          if (reverseResultWord[i].ignore) {
            continue;
          }

          if (
            reverseResultWord[i].text.localeCompare(
              reverseSpeakArray[counter],
              undefined,
              { sensitivity: "accent" }
            ) === 0
          ) {
            reverResultArray[i].isCorrect = true;
          }

          counter++;
        }

        reverResultArray = reverResultArray.reverse();

        tempQuestion = reverResultArray;
      }

      let score =
        tempQuestion.filter((x) => x.isCorrect).length /
        (tempQuestion.length - tempArr.filter((x) => x.ignore).length);

      let findQuestion = eventData.questionList.find(
        (x) => x.practiceId == eventData.com.questionData.practiceId
      );

      if (findQuestion) {
        findQuestion.displayText = tempQuestion;
        findQuestion.scoreSpeaking = score;
      }

      if (score < 50) {
        findQuestion.counterSpeaking++;
      }

      countAnswerIndex = 0;
      countVoiceIndex = 0;
      tempDisplayText = [];
      eventData.tempAudio = "";
      eventData.isRecorder = false;
    };

    // Get Practice List
    const funcGetPracticeList = async () => {
      eventData.isLoading = true;
      const eventStore = useEventStore();

      let response = [];

      response = await eventStore.getEventPracticeList();

      if (response) {
        let tempQuestion = response;

        eventData.practiceList = tempQuestion;
      }

      setTimeout(() => {
        eventData.isLoading = false;
      }, 2000);
    };

    const funcGetEventItemshop = async () => {
      eventData.isEventItemshopLoading = true;
      const eventStore = useEventStore();

      let response = await db
        .collection("itemShopDraft")
        .where("eventId", "==", eventStore.selectedEventId)
        .get();

      if (response.size) {
        let minArr = 0;
        let maxArr = 9;
        let splitNumber = Math.ceil(response.docs.length / maxArr);

        const promise = new Promise((resolve, reject) => {
          let temp = [];
          for (let i = 0; i < response.docs.length; i++) {
            let data = response.docs[i].data();

            temp.push(data);
          }

          resolve(temp);
        });

        promise
          .then((tempResponse) => {
            let tempItemshop = [];

            for (let i = 0; i < splitNumber; i++) {
              minArr = 0;
              maxArr = 9;
              let temp = tempResponse.splice(minArr, maxArr);

              tempItemshop.push(temp);

              minArr += maxArr;
              maxArr += maxArr;
            }

            eventData.itemshopList = tempItemshop;
          })
          .catch((error) => {
            console.log(error);
          });
      }

      eventData.isEventItemshopLoading = false;
    };

    let listenPermissions;
    let recognition = null;
    let mediaRecorder = null;
    let chunks = [];
    let audioStream = null;
    const funcCheckMicrophone = async () => {
      // if ($q.platform.is.desktop || !$q.platform.is.ios) {
      listenPermissions = await navigator.permissions.query({
        name: "microphone",
      });

      if (listenPermissions.state === "granted") {
      } else if (listenPermissions.state === "prompt") {
        return navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => track.stop());
          })
          .catch((error) => {
            console.error(error);
          });
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
          return navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              stream.getTracks().forEach((track) => track.stop());
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };
      // }
    };

    // #region Mounted
    onMounted(async () => {
      funcGetEventItemshop();

      systemStore.setRouter("event-story");

      // alert("NEWS-UPDATE 50");

      try {
        // if ($q.platform.is.ios) {
        //   recognition.start();
        //   recognition.stop();
        // }

        // if (systemStore.platform.desktop) {
        //   const SpeechRecognition =
        //     window.SpeechRecognition || window.webkitSpeechRecognition;

        //   recognition = new SpeechRecognition();
        //   recognition.lang = "en-US";
        //   recognition.maxAlternatives = 1;
        //   recognition.interimResults = false;

        //   recognition.onresult = (event) => {
        //     const transcript =
        //       event.results[event.results.length - 1][0].transcript;
        //     let getCompare = similarity(
        //       eventData.com.questionData.sentenceEn,
        //       transcript
        //     );
        //     if (getCompare.resultCompare.length > 0) {
        //       funcCheckAnswerRecorder(getCompare.resultCompare);
        //     }
        //   };

        //   recognition.onerror = (error) => {
        //     // alert("on Error");
        //     recognition.stop();
        //     eventData.isRecorder = false;
        //   };

        //   recognition.onend = () => {
        //     recognition.stop();
        //     eventData.isRecorder = false;
        //   };

        // }

        // if (systemStore.platform.desktop || !$q.platform.is.ios) {
        //   mediaSteam = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //   });
        //   mediaRecorder = new MediaRecorder(mediaSteam);
        //   let chunks = [];
        //   // media recorder data available
        //   mediaRecorder.addEventListener("dataavailable", (event) => {
        //     chunks.push(event.data);
        //   });
        //   // media recorder start
        //   mediaRecorder.addEventListener("start", () => {
        //     chunks = [];
        //     eventData.isRecorder = true;
        //   });
        //   // media recorder stop
        //   mediaRecorder.addEventListener("stop", () => {
        //     console.log("stop");
        //     eventData.func.stopAudio();
        //     const blob = new Blob(chunks, {
        //       type: "audio/mp3",
        //     });
        //     const audioUrl = URL.createObjectURL(blob);
        //     let findQuestion = eventData.questionList.find(
        //       (x) => x.practiceId == eventData.com.questionData.practiceId
        //     );
        //     eventData.tempAudio = new Audio(audioUrl);
        //     eventData.tempAudio.addEventListener("canplaythrough", () => {
        //       console.log("x2");
        //       if (findQuestion) {
        //         findQuestion.recorderUrl = audioUrl;
        //       }
        //       eventData.tempAudio.play();
        //       if (!$q.platform.is.desktop) {
        //         var reader = new FileReader();
        //         reader.readAsDataURL(blob);
        //         reader.onloadend = async function () {
        //           var base64data = reader.result.split(",")[1];
        //           const APIURL = `${process.env.NEWAPI}/stt-stt`;
        //           const POSTDATA = {
        //             fileBase64: base64data,
        //           };
        //           const response = await axios.post(APIURL, POSTDATA);
        //           if (response.data != "Error") {
        //             const transcript = response.data;
        //             let getCompare = similarity(
        //               eventData.com.questionData.sentenceEn,
        //               transcript
        //             );
        //             if (getCompare.resultCompare.length > 0) {
        //               funcCheckAnswerRecorder(getCompare.resultCompare);
        //             }
        //           }
        //         };
        //       }
        //     });
        //     eventData.isRecorder = false;
        //   });
        //   // media recorder error
        //   mediaRecorder.onerror = function (e) {
        //     console.log("Error: " + e);
        //     mediaRecorder.stop();
        //     eventData.isRecorder = false;
        //   };
        // }

        const eventStore = useEventStore();

        eventStore.eventPracticeData.isLoaded = false;

        await funcGetPracticeList();
      } catch (error) {
        if (
          error.name === "NotAllowedError" ||
          error.name === "NotFoundError"
        ) {
          $q.notify({
            message: "กรุณาเปิดไมค์โครโฟนของคุณให้พร้อมใช้งานในหน้านี้",
            timeout: 2000,
            icon: "fas fa-exclamation-triangle",
            position: "top",
          });
          router.replace("/lobby");
          // console.log("Microphone permission not granted.");
        } else {
          $q.notify({
            message: "ไมค์โครโฟนของคุณเกิดข้อผิดพลาด",
            timeout: 2000,
            icon: "fas fa-exclamation-triangle",
            position: "top",
          });
          router.replace("/lobby");
          throw Promise.reject(error);
        }
      }
    });

    // #endregion

    // #region Before unmount
    onBeforeUnmount(() => {
      // if (authListen) {
      //   authListen();
      // }

      if (!$q.platform.is.ios) {
        if (mediaRecorder) {
          if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
          }

          if (mediaRecorder.state === "inactive") {
            // mediaRecorder.stop();
            mediaRecorder = null;
          }
        }
      }

      if (listenPermissions) {
        listenPermissions.onchange = null;
        listenPermissions = null;
      }
    });
    // #endregion

    // #region Return
    return {
      // Data
      eventData,
    };
    // #endregion
  },
};
</script>

<style lang="scss" scoped>
.event-container {
  background-image: url("/images/background_main/backdrop-lobby.png");
  position: relative;
  min-width: 1000px;
  box-sizing: inherit;
  background-repeat: no-repeat;
  background-size: cover;
}

.event-content {
  position: relative;
  max-width: 1600px;
  min-width: 1000px;
  width: 100%;
  // height: 900px;
  // background-repeat: no-repeat;
  // background-size: fit-content;
  // background-image: url("/images/background_main/background-story.png");
  // background-position: center;
  z-index: 1;
  margin: auto;
  overflow: hidden;
}

.event-content-mobile {
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  height: 100vh;
  min-height: fit-content;
  margin: auto;
}

.event-background-mobile {
  width: 100%;
  background-image: url("/images/background_main/background-story.png");
  background-size: cover;
  background-position: 45% 100%;
  background-repeat: no-repeat;
}
.event-background-mobile.blur {
  filter: blur(3px);
}
</style>
