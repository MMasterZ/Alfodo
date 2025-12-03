<template>
  <div
    align="center"
    class="animate__animated animate__fadeIn animate__delay-1s fit"
    style="animation-duration: 1s"
    v-if="isStartSpeakup"
  >
    <div
      class="row"
      :class="
        $q.platform.is.desktop
          ? 'fit '
          : 'fixed-bottom box-chapter-content-mobile'
      "
    >
      <div class="col-12 self-end">
        <!-- #region Character Content -->
        <div class="relative-position">
          <div
            class="absolute-bottom"
            style="
              max-width: 550px;
              min-width: 300px;
              width: 100%;
              bottom: 90px;
              margin: auto;
            "
          >
            <div class="relative-position">
              <!-- #region Character -->
              <character></character>
              <!-- #endregion -->
              <!-- #region Box Answer Voice  -->
              <div
                class="absolute-center"
                style="width: 100%; top: -10px"
                v-if="eventData.userAnswerLog[eventData.currentQuestion]"
              >
                <div
                  class="box-answer-container relative-position row"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                  v-if="
                    eventData.userAnswerLog[eventData.currentQuestion]
                      .isSendAnswer
                  "
                >
                  <div class="col-1 self-start width-fit">
                    <q-img
                      :width="$q.platform.is.desktop ? '35px' : '25px'"
                      :src="`/images/speakup_main/speakup-button-${
                        isPlayAudio ? 'playing' : 'play'
                      }.png`"
                      class="button-speakup-main"
                      :class="eventData.isRecording ? '' : ' active'"
                      no-spinner
                      no-transition
                      @click="eventData.isRecording ? null : funcPlayAudio()"
                    >
                      <div
                        class="transparent fit no-padding"
                        v-if="isPlayAudio"
                      >
                        <button-wave-animation></button-wave-animation>
                      </div>
                    </q-img>
                  </div>
                  <div
                    class="col self-center font-prompt-r row"
                    align="left"
                    :class="
                      $q.platform.is.desktop ? 'f20 q-pl-md' : 'f14 q-px-xs'
                    "
                  >
                    <div
                      v-for="(itemQuestionLog, indexQuestionLog) in eventData
                        .userAnswerLog[eventData.currentQuestion].answer"
                      :key="indexQuestionLog"
                    >
                      <div
                        :class="
                          itemQuestionLog.ignore
                            ? itemQuestionLog.ignoreText
                              ? 'q-ml-sm '
                              : ''
                            : itemQuestionLog.isCorrect
                            ? 'correct q-ml-sm'
                            : 'incorrect q-ml-sm'
                        "
                      >
                        {{ `${itemQuestionLog.text}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <div
            class="box-speakup-question relative-position"
            :class="$q.platform.is.desktop ? '' : ' mobile'"
          >
            <!-- #region Box Question -->
            <div class="sub-speakup-question row">
              <div
                class="col-12 font-prompt-m"
                :class="$q.platform.is.desktop ? 'f14' : 'f12'"
                align="left"
              >
                <div>
                  <span> พูดอัดเสียงภาษาอังกฤษตามประโยคต่อไปนี้ </span>
                </div>

                <div class="row q-py-sm">
                  <div>
                    <q-img
                      :width="$q.platform.is.desktop ? '35px' : '25px'"
                      :src="`/images/speakup_main/speakup-button-${
                        isPlayQuestionAudio ? 'playing' : 'listen'
                      }${eventData.isRecording ? '-disable' : ''}.png`"
                      class="button-speakup-main"
                      :class="eventData.isRecording ? '' : ' active'"
                      no-spinner
                      no-transition
                      @click="
                        eventData.isRecording ? null : funcPlayQuestionAudio()
                      "
                    >
                      <div
                        class="transparent fit no-padding"
                        v-if="isPlayQuestionAudio"
                      >
                        <button-wave-animation></button-wave-animation>
                      </div>
                    </q-img>
                  </div>
                  <div
                    class="col self-center q-px-md font-prompt-r"
                    :class="$q.platform.is.desktop ? 'f20' : 'f14'"
                  >
                    {{
                      `${
                        eventData.chapterData.sentences[
                          eventData.currentQuestion
                        ].sentenceEn
                      }`
                    }}
                  </div>
                </div>
              </div>
              <div class="col-12 relative-position self-end" align="center">
                <q-img
                  width="50px"
                  class="button-speakup-main active"
                  src="/images/speakup_main/speakup-button-microphone.png"
                  no-spinner=""
                  no-transition=""
                  v-if="!eventData.isRecording"
                  @click="
                    eventData.userAnswerLog[eventData.currentQuestion]
                      .isSendAnswer
                      ? (isShowDialogHasFileRecord = true)
                      : funcStartRecording()
                  "
                ></q-img>

                <q-img
                  width="50px"
                  class="button-speakup-main diable animate__animated animate__heartBeat animate__infinite"
                  style="animation-duration: 1s"
                  src="/images/speakup_main/speakup-button-recording.png"
                  no-spinner=""
                  no-transition=""
                  v-if="eventData.isRecording"
                ></q-img>

                <div
                  class="absolute-bottom-right"
                  v-if="
                    eventData.userAnswerLog[eventData.currentQuestion] &&
                    !eventData.isRecording
                  "
                >
                  <div
                    v-if="
                      eventData.userAnswerLog[eventData.currentQuestion]
                        .isSendAnswer
                    "
                  >
                    <q-img
                      :width="$q.platform.is.desktop ? '80px' : '60px'"
                      class="button-speakup-main active"
                      :src="`/images/speakup_main/speakup-button-${
                        eventData.currentQuestion + 1 ==
                        eventData.chapterData.sentences.length
                          ? 'end'
                          : 'next'
                      }${$q.platform.is.desktop ? '' : '-mobile'}.png`"
                      no-spinner
                      no-transition
                      @click="funcNextQuestion()"
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Question Number -->
              <div
                class="box-question-number absolute-top-left row justify-center items-center"
                align="center"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div
                  class=""
                  :class="
                    $q.platform.is.desktop
                      ? 'font-mali-m f20'
                      : 'font-prompt-m f16'
                  "
                >
                  {{
                    `${eventData.currentQuestion + 1}/${
                      eventData.chapterData.sentences.length
                    }`
                  }}
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
  </div>

  <!-- #region Dialog instruction -->
  <q-dialog
    v-model="isShowDialogInstruction"
    persistent
    maximized
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-header"></div>
              <div class="box-dialog-body">
                <div align="center">
                  <div
                    :data-text="`เริ่มฝึกพูด`"
                    class="text-title font-prompt-b f24"
                  >
                    เริ่มฝึกพูด
                  </div>

                  <div class="font-prompt-m f16 q-my-md">
                    มาเริ่มฝึกพูดออกเสียงกันเถอะ
                  </div>
                </div>
              </div>
              <div class="box-dialog-footer" align="center">
                <q-img
                  class="button-speakup-main active"
                  src="/images/speakup_main/speakup-button-let-go.png"
                  no-spinner
                  no-transition
                  @click="funcLetGoSpeakup()"
                ></q-img>
              </div>
            </div>
          </div>

          <div class="absolute-center" style="top: 0%">
            <q-img
              width="254px"
              src="/images/speakup_main/speakup-label-chapter-content.png"
            >
              <div class="transparent fit no-padding">
                <div
                  class="absolute-center f24 font-fredoka text-chapter-content"
                >
                  {{ eventData.chapterData.name }}
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Has a file record -->
  <q-dialog v-model="isShowDialogHasFileRecord" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body" style="padding: 20px 5px">
                <div align="center" class="font-prompt-m f16">
                  ไฟล์เสียงใหม่จะถูกแทนที่ไฟล์เสียงปัจจุบัน
                  <br />
                  ต้องการอัดเสียงใหม่หรือไม่
                </div>
              </div>
              <div class="box-dialog-footer row justify-center">
                <div class="q-px-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-cancel.png"
                    no-spinner
                    no-transition
                    v-close-popup
                  ></q-img>
                </div>
                <div class="q-px-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-record.png"
                    no-spinner
                    no-transition
                    @click="funcStartRecording()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import buttonWaveAnimation from "components/speakup_main/speakup-button-wave-animation.vue";
import character from "components/character_main/character.vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
export default {
  components: {
    character,
    buttonWaveAnimation,
  },
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();

    const isStartSpeakup = ref(false);
    const isFinishSpeakup = ref(false);
    const isPlayAudio = ref(false);
    const isPlayQuestionAudio = ref(false);

    // Dialog
    const isShowDialogInstruction = ref(true);
    const isShowDialogHasFileRecord = ref(false);

    // #region Function
    const funcLetGoSpeakup = () => {
      isShowDialogInstruction.value = false;
      isStartSpeakup.value = true;
      setTimeout(() => {
        funcPlayQuestionAudio();
      }, 500);
    };

    const funcNextQuestion = () => {
      props.eventData.func.nextQuestion();
    };

    const funcStartRecording = () => {
      props.eventData.isRecording = true;

      if (isPlayAudio.value) {
        funcStopAudio();
      }

      if (isPlayQuestionAudio.value) {
        funcStopAudioQuestion();
      }
      isShowDialogHasFileRecord.value = false;
      props.eventData.func.startRecording();
    };
    // #endregion

    const funcPlayQuestionAudio = () => {
      if (isPlayAudio.value) {
        funcStopAudio();
      }

      if (isPlayQuestionAudio.value) {
        funcStopAudioQuestion();
        return;
      }

      isPlayQuestionAudio.value = true;

      props.eventData.tempQuestionAudio = new Audio(
        props.eventData.chapterData.sentences[
          props.eventData.currentQuestion
        ].audioUrl
      );

      props.eventData.tempQuestionAudio.play();

      props.eventData.tempQuestionAudio.onended = () => {
        isPlayQuestionAudio.value = false;
        props.eventData.tempQuestionAudio = null;
      };
    };

    const funcStopAudioQuestion = () => {
      if (props.eventData.tempQuestionAudio) {
        props.eventData.tempQuestionAudio.pause();
        isPlayQuestionAudio.value = false;
      }
    };

    const funcPlayAudio = () => {
      if (isPlayQuestionAudio.value) {
        funcStopAudioQuestion();
      }

      if (isPlayAudio.value) {
        funcStopAudio();
        return;
      }

      isPlayAudio.value = true;

      props.eventData.tempUserAudio = new Audio(
        props.eventData.userAnswerLog[props.eventData.currentQuestion].audioUrl
      );

      props.eventData.tempUserAudio.play();

      props.eventData.tempUserAudio.onended = () => {
        isPlayAudio.value = false;
        props.eventData.tempUserAudio = null;
      };
    };

    const funcStopAudio = () => {
      if (props.eventData.tempUserAudio) {
        props.eventData.tempUserAudio.pause();
        isPlayAudio.value = false;
      }
    };

    watch(
      () => props.eventData.currentQuestion,
      () => {
        if (props.eventData.currentQuestion) {
          setTimeout(() => {
            funcPlayQuestionAudio();
          }, 300);
        }
      }
    );

    watch(
      () => props.eventData.tempUserAudio,
      () => {
        if (props.eventData.tempUserAudio) {
          props.eventData.tempUserAudio.onplaying = () => {
            isPlayAudio.value = true;
          };

          props.eventData.tempUserAudio.onended = () => {
            isPlayAudio.value = false;
            props.eventData.tempUserAudio = null;
          };
        } else {
          isPlayAudio.value = false;
        }
      }
    );

    watch(
      () => props.eventData.isShowDialogUserAnswerLog,
      () => {
        if (props.eventData.isShowDialogUserAnswerLog) {
          isPlayAudio.value = false;
          isPlayQuestionAudio.value = false;
        }
      }
    );

    onBeforeUnmount(() => {
      if (isPlayAudio.value) {
        funcStopAudio();
      }

      if (isPlayQuestionAudio.value) {
        funcStopAudioQuestion();
      }
    });

    return {
      // Data

      // Boolean
      isStartSpeakup,
      isFinishSpeakup,
      isPlayQuestionAudio,
      isPlayAudio,

      // Dialog
      isShowDialogInstruction,
      isShowDialogHasFileRecord,

      // Function
      funcPlayQuestionAudio,
      funcPlayAudio,
      funcLetGoSpeakup,
      funcNextQuestion,
      funcStartRecording,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-speakup-question {
  max-width: 800px;
  width: 95%;
  min-width: 320px;
  height: 180px;
  background-color: #dec7a6;
  border: 2px solid #4a261b;
  border-radius: 10px;
  padding-bottom: 5px;
  margin: 32px auto;
}

.box-speakup-question.mobile {
  margin: 15px auto;
}

.box-speakup-question .sub-speakup-question {
  width: 100%;
  height: 100%;
  color: #4a261b;
  background-color: #fff5e7;
  border-radius: 10px;
  padding: 10px;
}

.box-question-number {
  width: 100px;
  height: 32px;
  top: -32px;
  left: 10px;
  border-radius: 10px 10px 0px 0px;
  background-color: #ffc100;
  border: 2px solid #4a261b;
}

.box-question-number.mobile {
  width: 80px;
  height: 25px;
  top: -25px;
}

.text-title {
  position: relative;
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

.text-title::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: 0px 4px 0px rgb(75, 30, 10), 3px 4px 0px rgb(75, 30, 10),
    -1px 4px 0px rgb(75, 30, 10);
}

.box-answer-container {
  max-width: fit-content;
  width: 100%;
  min-width: 300px;
  background-color: #ffffff;
  border-radius: 32px;
  color: #4a261b;
  padding: 15px;
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
}

.box-answer-container.mobile {
  width: 90%;
  min-width: 300px;
  padding: 10px;
}

.box-answer-container .correct {
  color: #4bc700;
}
.box-answer-container .incorrect {
  color: #ff6363;
}

.box-answer-container::before {
  content: "";
  position: absolute;
  bottom: -20px;
  left: 10px;
  border: 20px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  // border-right-color: transparent;
  transform: rotate(-100deg);
}

.text-chapter-content {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px,
    rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px,
    rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px,
    rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px,
    rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px,
    rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px,
    rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px, rgb(0, 0, 0) 0px 0px 5px;
}

// #region Mobile
.box-chapter-content-mobile {
  height: calc(100vh - 110px);
}
// #endregion
</style>
