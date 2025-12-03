<template>
  <div class="relative-position col-12 row justify-center">
    <div
      class="box-scroll-chat absolute-center col-5 self-end row"
      style="width: 600px"
      id="scroll-chat"
      :class="eventData.platform.desktop ? '' : ' mobile '"
    >
      <div class="col-12 q-pb-sm self-end">
        <div
          v-for="(itemChat, indexChat) in eventData.chatList"
          class="q-mx-sm q-my-md"
          :align="!itemChat.isQuestion ? 'right' : 'left'"
          :key="indexChat"
        >
          <div
            class="box-chat font-mali-m f20 animate__animated animate__fadeIn"
            :position="!itemChat.isQuestion ? 'right' : 'left'"
            align="left"
          >
            {{ `${itemChat.sentenceEn}` }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="self-end col-12 row relative-position justify-around box-character-container"
      style="padding: 3.5% 0px"
      :class="eventData.platform.desktop ? '' : 'mobile'"
    >
      <!-- #region Character -->
      <!-- Npc -->
      <div
        class="col-5 relative-position"
        :class="!eventData.com.questionData.isQuestion ? '' : 'my-turn'"
        align="center"
      >
        <div
          class="animate__animated animate__fadeIn box-character"
          :class="eventData.platform.desktop ? '' : 'absolute-center'"
          :style="eventData.platform.desktop ? '' : 'top:35%;width: 100%'"
        >
          <character
            :equipment="eventData.com.showCharacterData"
            :isShop="true"
            :isPet="false"
            setId="character-bot"
            :isAnimation="false"
          ></character>
        </div>
      </div>

      <!-- Character -->
      <div
        class="col-5 relative-position"
        :class="!eventData.com.questionData.isQuestion ? 'my-turn' : ''"
        align="center"
      >
        <div
          class="animate__animated animate__fadeIn box-character"
          :class="eventData.platform.desktop ? '' : 'absolute-center'"
          :style="eventData.platform.desktop ? '' : 'top:35%;width: 100%'"
        >
          <character
            :isPet="false"
            :setId="'Student'"
            :isAnimation="false"
          ></character>
        </div>
      </div>
      <!-- #endregion -->

      <!--  Practice -->
      <div
        class="absolute-center"
        style="top: 70%; z-index: 3"
        :style="eventData.platform.desktop ? '' : 'width:95%;'"
      >
        <div
          class="box-question relative-position font-mali-m animate__animated animate__fadeInUp"
          :class="eventData.platform.desktop ? '' : 'mobile'"
        >
          <!-- Label Name -->
          <!-- NPC -->
          <div
            v-show="eventData.com.questionData.isQuestion"
            class="box-name npc left row justify-center items-center absolute-top-right"
          >
            <span class="f20">
              {{ eventData.com.showCharacterData.name }}
            </span>
          </div>
          <!-- YOU -->
          <div
            v-show="!eventData.com.questionData.isQuestion"
            class="box-name user right row justify-center items-center absolute-top-right"
          >
            <span class="f20 text-overflow">
              {{ "You" }}
            </span>
          </div>

          <!-- Box Question -->
          <div
            class="box-sub-question relative-position font-mali-m f20 row"
            :class="eventData.platform.desktop ? '' : 'mobile'"
          >
            <div class="col-12 row relative-position">
              <!-- Not Question -->
              <div
                class="col q-px-md q-pt-xs text-color-question"
                v-if="
                  eventData.com.questionData.isQuestion ||
                  (eventData.com.questionData.isFinishContent &&
                    !eventData.isStartSpeaking) ||
                  (eventData.com.questionData.isQuestion &&
                    eventData.isStartSpeaking)
                "
              >
                <div>
                  {{ eventData.com.questionData.sentenceEn }}
                </div>

                <div>
                  {{ eventData.com.questionData.sentenceTh }}
                </div>
              </div>

              <!-- Practice -->
              <div
                class="col-12 q-px-md"
                v-if="
                  !eventData.com.questionData.isQuestion &&
                  !eventData.com.questionData.isFinishContent &&
                  !eventData.isStartSpeaking
                "
              >
                <!-- Instruction -->
                <div class="text-color-question q-pt-xs">
                  <span
                    class="f14"
                    v-if="!eventData.com.questionData.isQuestion"
                  >
                    {{ eventData.com.questionData.instruction }}
                  </span>

                  <span class="f14" v-else> พูดอัดเสียงคำตอบภาษาอังกฤษ </span>
                  <br />
                  <div
                    class="q-mt-sm"
                    v-if="
                      !eventData.com.questionData.isQuestion &&
                      eventData.com.questionData.sentenceEn != '' &&
                      eventData.com.questionData.type == 'fillinmultiple'
                    "
                  >
                    <div class="row">
                      <div
                        class="col-1 width-fit self-center"
                        v-for="(itemQuestion, indexQuestion) in newQuestion"
                        :key="indexQuestion"
                      >
                        <div v-show="!itemQuestion.isAnswer">
                          {{ itemQuestion.content }}
                        </div>
                        <div
                          v-if="
                            itemQuestion.isAnswer &&
                            !eventData.com.questionData.choices[
                              eventData.selectedAnswer
                            ] &&
                            eventData.selectedAnswer == null
                          "
                        >
                          <div
                            class="box-question-fillinmultiple cursor-inherit q-mx-sm"
                          >
                            <div class="box-sub-answer q-px-sm"></div>
                          </div>
                        </div>
                        <div
                          v-if="
                            itemQuestion.isAnswer &&
                            !eventData.com.questionData.choices[
                              eventData.selectedAnswer
                            ] &&
                            eventData.selectedAnswer != null
                          "
                        >
                          <div
                            class="box-answer selected cursor-inherit q-mx-sm"
                          >
                            <div class="box-sub-answer selected">
                              <span
                                :class="
                                  eventData.platform.desktop ? 'f20' : ' f16 '
                                "
                              >
                                {{
                                  eventData.com.questionData.choices[
                                    eventData.selectedAnswer
                                  ].answerEn
                                }}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div
                          v-if="
                            itemQuestion.isAnswer &&
                            eventData.com.questionData.choices[
                              eventData.selectedAnswer
                            ]
                          "
                        >
                          <div class="box-answer cursor-inherit q-mx-sm">
                            <div class="box-sub-answer q-px-sm">
                              <span
                                :class="
                                  eventData.platform.desktop ? 'f20' : ' f16 '
                                "
                              >
                                {{
                                  eventData.com.questionData.choices[
                                    eventData.selectedAnswer
                                  ].answerEn
                                }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Multiple && Fill in multiple choice  -->
                <div
                  class="row q-mt-md"
                  :class="
                    eventData.platform.desktop
                      ? ''
                      : 'box-button-multiple-container'
                  "
                  v-if="
                    eventData.com.questionData.type == 'multiplechoices' ||
                    eventData.com.questionData.type == 'fillinmultiple'
                  "
                >
                  <div
                    class="row"
                    :class="
                      eventData.platform.desktop ? '' : 'box-button-multiple'
                    "
                  >
                    <div
                      v-for="(itemAnswer, indexAnswer) in eventData.com
                        .questionData.choices"
                      :key="indexAnswer"
                      class="self-center q-ma-xs"
                    >
                      <div v-if="eventData.com.questionData.sentenceEn != ''">
                        <div
                          v-show="eventData.selectedAnswer != indexAnswer"
                          class="box-answer animate__animated animate__fadeIn q-ma-xs"
                          :class="
                            eventData.selectedAnswer == indexAnswer
                              ? 'animate__fadeInUp'
                              : ''
                          "
                          @click="eventData.selectedAnswer = indexAnswer"
                        >
                          <div class="box-sub-answer q-px-sm">
                            <span
                              :class="
                                eventData.platform.desktop ? 'f20' : ' f16 '
                              "
                            >
                              {{ itemAnswer.answerEn }}
                            </span>
                          </div>
                        </div>

                        <div
                          v-show="eventData.selectedAnswer == indexAnswer"
                          class="box-noselected-answer animate__animated animate__fadeIn"
                          :class="eventData.platform.desktop ? '' : 'mobile'"
                        >
                          <div class="box-sub-answer q-px-sm">
                            <span
                              :class="
                                eventData.platform.desktop ? 'f20' : ' f16 '
                              "
                            >
                              {{ itemAnswer.answerEn }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div v-if="eventData.com.questionData.sentenceEn == ''">
                        <div
                          class="box-answer animate__animated animate__fadeIn"
                          :class="
                            eventData.selectedAnswer == indexAnswer
                              ? 'selected'
                              : ''
                          "
                          @click="eventData.selectedAnswer = indexAnswer"
                        >
                          <div
                            class="box-sub-answer q-px-sm"
                            :class="
                              eventData.selectedAnswer == indexAnswer
                                ? 'selected'
                                : ''
                            "
                          >
                            <span
                              :class="
                                eventData.platform.desktop ? 'f20' : ' f16 '
                              "
                            >
                              {{ itemAnswer.answerEn }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Fill in the blank -->
                <div
                  v-if="eventData.com.questionData.type == 'fillintheblank'"
                  class="q-mt-sm"
                >
                  <div class="row">
                    <div
                      class="col-1 width-fit self-center"
                      v-for="(itemContent, indexContent) in newQuestion"
                      :key="indexContent"
                    >
                      <div
                        v-show="!itemContent.isAnswer"
                        class="text-color-question"
                      >
                        {{ itemContent.content }}
                      </div>
                      <div
                        class="box-question-answer q-px-sm"
                        v-show="itemContent.isAnswer"
                      >
                        <q-input
                          class="no-padding"
                          :input-style="
                            isShowNextQuestionButton
                              ? 'color:#4B1E0A;font-size:20px;margin-bottom: 7px;'
                              : `color:#C0A275;font-style: italic;font-size:20px;margin-bottom: 7px;`
                          "
                          dense
                          borderless
                          v-model="eventData.answerList[indexContent - 1]"
                          placeholder="Enter answer"
                        >
                        </q-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Speaking -->
              <div
                class="col-12 q-px-md"
                v-if="
                  !eventData.com.questionData.isQuestion &&
                  eventData.isStartSpeaking
                "
              >
                <div>
                  <div class="f20 q-mt-xs text-color-question">
                    {{ eventData.com.questionData.sentenceTh }}
                  </div>
                  <div
                    v-if="eventData.com.questionData.displayText.length == 0"
                  >
                    <div class="dot-answer"></div>
                  </div>
                  <div
                    class="q-mt-sm"
                    v-if="eventData.com.questionData.displayText.length > 0"
                  >
                    <span
                      v-for="(item, index) in eventData.com.questionData
                        .displayText"
                      :class="item.ignore ? '' : 'q-ml-xs'"
                    >
                      <span
                        v-html="item.text"
                        :class="
                          eventData.isRecorder
                            ? 'text-color-question'
                            : item.isCorrect
                            ? 'text-corect-answer'
                            : item.ignore
                            ? 'text-black'
                            : 'text-incorect-answer'
                        "
                      ></span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Button Audio -->
              <div
                class="col-2 absolute-top-right q-pa-sm"
                style="width: 50px"
                align="center"
                v-if="
                  eventData.com.questionData.isQuestion ||
                  eventData.com.questionData.isFinishContent
                "
              >
                <div class="top-bar-sticky">
                  <q-img
                    class="cursor-pointer"
                    width="35px"
                    src="/images/icon_main/icon-sound-audio.png"
                    no-spinner
                    no-transition
                    @click="eventData.func.playAudio()"
                  ></q-img>
                </div>
              </div>

              <!-- Button Speaking -->
              <div
                class="col-12 self-end"
                align="center"
                v-if="isShowRecorderButton"
                style="top: 80%"
              >
                <q-btn
                  v-if="
                    !eventData.isRecorder &&
                    eventData.com.questionData.recorderUrl != null
                  "
                  round
                  flat
                  class="animate__animated animate__flipInY q-mx-sm"
                  @click="
                    eventData.func.playAudio(
                      eventData.com.questionData.recorderUrl
                    )
                  "
                >
                  <q-img
                    src="/images/icon_main/icon-play.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </q-btn>

                <q-btn
                  v-show="!eventData.isRecorder"
                  round
                  flat
                  class="animate__animated animate__flipInY q-mx-sm"
                  @click="eventData.func.startRecorder()"
                >
                  <q-img
                    src="/images/icon_main/icon-mic.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </q-btn>

                <q-btn
                  v-show="eventData.isRecorder"
                  round
                  flat
                  class="cursor-inherit animate__animated animate__flipInY q-mx-sm"
                  @click="eventData.func.stopRecorder()"
                >
                  <q-img
                    src="/images/icon_main/icon-process.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </q-btn>
              </div>
            </div>

            <div class="col-12 self-end q-px-sm q-pb-md q-pt-sm" align="right">
              <q-img
                v-if="isShowNextQuestionButton"
                width="85px"
                class="cursor-pointer"
                src="/images/button_main/button-event-practice-next.png"
                @click="eventData.func.nextQuestion()"
              ></q-img>
            </div>
          </div>

          <!-- Button Next Question -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Character from "components/character_main/character.vue";
import { useStudentStore } from "src/stores/student";
import { computed, onBeforeMount, reactive, watch } from "vue";
export default {
  components: {
    Character,
  },
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const studentStore = useStudentStore();
    const student = reactive(studentStore.student);

    const isShowRecorderButton = computed(() => {
      if (props.eventData.isStartSpeaking) {
        if (!props.eventData.com.questionData.isQuestion) {
          return true;
        } else {
          return false;
        }
      }
    });

    const isShowNextQuestionButton = computed(() => {
      if (props.eventData.isFinishPractice) {
        return false;
      }

      if (!props.eventData.isStartSpeaking) {
        if (props.eventData.com.questionData.isFinishContent) {
          return true;
        }

        if (
          (!props.eventData.com.questionData.isQuestion &&
            props.eventData.selectedAnswer != null) ||
          (!props.eventData.com.questionData.isQuestion &&
            props.eventData.answerList != "")
        ) {
          return true;
        } else if (
          props.eventData.com.questionData.isQuestion &&
          !props.eventData.isFinishPractice
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (props.eventData.com.questionData.isQuestion) {
          return true;
        } else {
          if (props.eventData.isRecorder) {
            return false;
          }

          let tempCorrect = props.eventData.com.questionData.displayText.filter(
            (x) => x.isCorrect
          );

          let tempDisplayText =
            props.eventData.com.questionData.displayText.filter(
              (x) => !x.ignore
            );

          let isPassed = false;

          let scoreTempCorrect =
            (tempCorrect.length / tempDisplayText.length) * 100 || 0;

          if (scoreTempCorrect >= 50) {
            isPassed = true;
          }

          // console.log(isPassed);

          if (
            isPassed ||
            props.eventData.com.questionData.counterSpeaking > 1
          ) {
            // console.log("True");
            return true;
          } else {
            // console.log("False");
            return false;
          }
        }
      }
    });

    let tempTimeout;
    watch(
      () => props.eventData.chatList.length,
      (newVal, oldVal) => {
        if (tempTimeout) clearTimeout(tempTimeout);

        let element = document.getElementById("scroll-chat");

        tempTimeout = setTimeout(() => {
          element.scrollBy({
            top: element.scrollHeight,
            left: 0,
            behavior: "smooth",
          });
        }, 150);
      }
    );

    const newQuestion = computed(() => {
      let question = props.eventData.com.questionData.sentenceEn;
      let splitQuestion = question.split(/(s*\[\])/g);

      let temp = [];
      for (let i = 0; i < splitQuestion.length; i++) {
        let newContent = {
          content: splitQuestion[i],
          isAnswer: false,
        };

        if (splitQuestion[i] == "[]") {
          newContent.isAnswer = true;
        }

        temp.push(newContent);
      }

      return temp;
    });

    onBeforeMount(() => {
      if (tempTimeout) clearTimeout(tempTimeout);
    });

    return {
      student,

      // Computed
      isShowNextQuestionButton,
      isShowRecorderButton,

      newQuestion,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  width: 800px;
  height: 200px;
  background-color: #dec7a6;
  border: 2px solid #4b1e0a;
  border-radius: 10px;
  padding-bottom: 5px;
  animation-duration: 0.7s;
  -webkit-animation-duration: 0.7s;
}

.box-question.mobile {
  width: 100%;
  height: 250px;
  background-color: #dec7a6;
  border: 2px solid #4b1e0a;
  border-radius: 10px;
  padding-bottom: 5px;
  animation-duration: 0.7s;
  -webkit-animation-duration: 0.7s;
}

.box-question .box-sub-question {
  width: 100%;
  height: 100%;
  background-color: #fff5e7;
  border-radius: 10px;
}

.box-question .box-sub-question.mobile {
  width: 100%;
  height: 100%;
  background-color: #fff5e7;
  border-radius: 10px;
}

.box-sub-question::-webkit-scrollbar {
  width: 0px;
}

// .box-sub-question::-webkit-scrollbar-thumb {
//   background-color: #4b1e0a;
//   border: 2px solid #fff5e7;
//   border-radius: 10px;
// }

.box-name {
  border-radius: 10px 10px 0px 0px;
  width: 90px;
  height: 35px;
  border: 2px solid #4b1e0a;
  padding: 0px 5px;
}

.box-name.npc {
  background-color: #00d1ff;
}

.box-name.user {
  background-color: #ffc100;
}

.box-name.left {
  top: -35px;
  left: 15px;
}

.box-name.right {
  top: -35px;
  right: 15px;
}

.text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.my-turn {
  z-index: 3;
}

.box-scroll-chat {
  height: 40%;
  top: 25%;
  overflow-y: auto;
  z-index: 3;
}

.box-scroll-chat.mobile {
  height: 25% !important;
}

.box-scroll-chat::-webkit-scrollbar {
  width: 0px;
}

.box-chat {
  position: relative;
  width: fit-content;
  max-width: 70%;
  min-width: 50px;
  padding: 10px 15px;
  background-color: #fff;
  color: #4b1e0a;
  border-radius: 30px;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
  animation-duration: 0.7s;
  -webkit-animation-duration: 0.7s;
}

.box-chat[position="left"]::before {
  content: "";
  position: absolute;
  bottom: -11px;
  left: 7px;
  background-image: url("/images/icon_main/icon-chat-arrow.png");
  background-size: 25px 15px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 25px;
  height: 15px;
}

.box-chat[position="right"]::before {
  content: "";
  position: absolute;
  bottom: -11px;
  right: 7px;
  background-image: url("/images/icon_main/icon-chat-arrow.png");
  transform: rotateY(180deg);
  background-size: 25px 15px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 25px;
  height: 15px;
}

.top-bar-sticky {
  position: sticky;
  top: 10px;
}

.box-character {
  max-width: 500px;
  min-width: 400px;
  width: 80%;
  animation-duration: 0.7s;
  -webkit-animation-duration: 0.7s;
}

.box-noselected-answer {
  width: fit-content;
  background-color: transparent;
  padding-bottom: 3px;
  border: 1px solid transparent;
  border-radius: 5px;
}

.box-noselected-answer .box-sub-answer {
  width: fit-content;
  height: 100%;
  background-color: transparent;
  padding: 5px;
  border-radius: 5px;
  color: #fff5e7;
}

.box-noselected-answer.mobile .box-sub-answer {
  color: #ffeace;
}

.box-question-fillinmultiple {
  width: 120px;
  background-color: #fff;
  padding-bottom: 3px;
  border: 1px dashed #4b1e0a;
  border-radius: 5px;
}

.box-question-fillinmultiple .box-sub-answer {
  width: fit-content;
  height: 30px;
  background-color: #ffffff;
  border-radius: 5px;
  color: #4b1e0a;
}

.box-answer {
  width: fit-content;
  background-color: #b9b9b9;
  padding-bottom: 3px;
  border: 1px solid #4b1e0a;
  border-radius: 5px;
  cursor: pointer;
}

.box-answer .box-sub-answer {
  width: fit-content;
  min-height: 30px;
  max-height: fit-content;
  background-color: #ffffff;
  border-radius: 5px;
  color: #4b1e0a;
}

.box-answer.selected {
  background-color: #0857a0;
}

.box-answer .box-sub-answer.selected {
  color: #4b1e0a;
  background-color: #41a4ff;
}

.dot-answer {
  width: 40%;
  border-bottom: 2px;
  border-bottom-style: dotted;
  padding: 15px;
}

.text-corect-answer {
  color: #4bc700;
}

.text-incorect-answer {
  color: #ff0000;
}

.box-question-answer {
  width: 180px;
  height: 35px;
  background-color: #ffecd0;
  border-radius: 5px;
  border: 1px solid #c0a275;
  margin: 0px 10px;
}

.box-character-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.box-character-container.mobile {
  width: 100%;
  height: 60%;
}

.text-color-question {
  color: #4b1e0a;
}

.box-button-multiple-container {
  background-color: #ffeace;
  border-radius: 10px;
}

.box-button-multiple {
  width: 100%;
  height: 130px;

  border-radius: 10px;
  overflow: auto;
}

.box-button-multiple::-webkit-scrollbar {
  width: 6px;
}

// .box-button-multiple::-webkit-scrollbar-button {
//   background-color: #fff5e7;
// }

// .box-button-multiple::-webkit-scrollbar-thumb {
//   background-color: #ffc100;
// }

.box-button-multiple::-webkit-scrollbar-thumb {
  background-color: #ffc100;
  border-radius: 10px;
}

.box-button-multiple::-webkit-scrollbar-track {
  background-color: #fff5e7;
}
</style>
