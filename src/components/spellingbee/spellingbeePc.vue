<template>
  <div class="relative-position">
    <!-- <div class="absolute-bottom" style="left: 20%; bottom: 20%; z-index: 2">
      <q-img width="200px" src="/images/monsters/monster1.png"></q-img>
    </div>
    <div
      class="absolute-top-right"
      style="right: 10%; top: 20%; transform: rotate(40deg); z-index: 2"
    >
      <q-img width="150px" src="/images/monsters/monster1.png"></q-img>
    </div> -->

    <div class="row relative-position">
      <div class="col relative-position" align="center">
        <div class="box-question q-my-md">
          <div class="relative-position row">
            <div class="col">
              <header-bar
                style="margin-top: -10px"
                :practiceData="practiceData"
              ></header-bar>
            </div>
            <div class="col-2 self-center q-pb-sm" style="width: 50px">
              <q-btn
                style="background-color: #6d4300; z-index: 2"
                class="text-white"
                icon="fas fa-volume-up"
                @click="$emit('callback-playsound')"
                round
              ></q-btn>
            </div>
          </div>
          <div class="col-12 box-question-text q-pa-md">
            <span class="f24">
              {{ currentQuestionTh }}
            </span>
          </div>
        </div>

        <div class="row justify-center box-content" align="center">
          <div
            class="box-show-answer self-end"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            <span style="font-size: 30px">{{ selectedLetter[index] }}</span>
          </div>

          <div class="col-12 q-py-lg">
            <div class="box-content-answer q-pa-md">
              <div
                class="justify-center row q-mt-xs box-answer"
                v-if="currentAnswerList.length"
                v-for="(item, row) in boggle"
                :key="row"
              >
                <div
                  class="relative-position"
                  :style="
                    boggleNumber == 3
                      ? 'width:33%'
                      : boggleNumber == 4
                      ? 'width:25%;'
                      : 'width:20%'
                  "
                  v-for="(item2, col) in item"
                  :key="col"
                >
                  <q-btn
                    round
                    size="16px"
                    @click="
                      practiceData.isSendAnswer ||
                      (!(checkBottom.row == row && checkBottom.col == col) &&
                        !(checkTop.row == row && checkTop.col == col) &&
                        !(checkLeft.row == row && checkLeft.col == col) &&
                        !(checkRight.row == row && checkRight.col == col))
                        ? null
                        : chooseLineMove(row, col, item2.letter)
                    "
                    :class="
                      practiceData.isCorrectAnswer &&
                      currentAnswerList.filter(
                        (x) => x.row == row && x.col == col
                      ).length &&
                      practiceData.isSendAnswer
                        ? 'bg-teal-3 text-black'
                        : !practiceData.isCorrectAnswer &&
                          currentAnswerList.filter(
                            (x) => x.row == row && x.col == col
                          ).length &&
                          practiceData.isSendAnswer
                        ? 'bg-red-3 text-black'
                        : currentAnswerList.filter(
                            (x) => x.row == row && x.col == col
                          ).length
                        ? 'bg-amber text-black'
                        : !(checkBottom.row == row && checkBottom.col == col) &&
                          !(checkTop.row == row && checkTop.col == col) &&
                          !(checkLeft.row == row && checkLeft.col == col) &&
                          !(checkRight.row == row && checkRight.col == col) &&
                          !currentAnswerList.filter(
                            (x) => x.row == row && x.col == col
                          ).length &&
                          currentAnswerList.length != currentQuestionText.length
                        ? 'cursor-not-allowed bg-black disabled'
                        : currentAnswerList.length ==
                            currentQuestionText.length &&
                          !currentAnswerList.filter(
                            (x) => x.row == row && x.col == col
                          ).length
                        ? 'cursor-not-allowed bg-black'
                        : 'cursor-pointer bg-purple'
                    "
                    class="text-bold text-white q-ma-xs"
                    style="z-index: 2"
                    ><span class="text-bold f30">{{ item2.letter }}</span>
                  </q-btn>
                  <div
                    v-if="
                      currentAnswerList.filter(
                        (x) => x.row == row && x.col == col
                      ).length
                    "
                    :class="`link-answer-${
                      currentAnswerList.filter(
                        (x) => x.row == row && x.col == col
                      )[0].lineMove
                    }`"
                  ></div>

                  <!-- <audio
                    :src="`/alphabet_sound/${item2.letter}.mp3`"
                  ></audio> -->
                </div>
              </div>
            </div>
          </div>

          <div
            class="col-12 q-pt-md relative-position row"
            style="max-width: 300px; width: 100%; z-index: 2"
            align="center"
          >
            <div class="col q-pr-sm">
              <q-btn
                label="ส่งคำตอบ"
                push
                class="fit text-black rounded-borders"
                :class="
                  showAnswerBtn
                    ? 'cursor-pointer bg-amber'
                    : 'bg-grey-6 no-pointer-events'
                "
                @click="showAnswerBtn ? sendAnswer() : null"
              ></q-btn>
            </div>

            <div class="col-2 q-pl-sm" style="width: 70px">
              <q-btn
                @click="undo()"
                label="ลบ"
                class="bg-orange-9 text-white rounded-borders fit"
                push
              ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress.vue";
import { ref, computed, watch } from "vue";
export default {
  components: {
    headerBar,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    boggle: {
      type: Array,
      default: () => [],
    },
    boggleNumber: {
      type: Number,
      default: () => [],
    },
    selectValue: {
      type: Array,
      default: () => [],
    },
    selectedLetter: {
      type: Array,
      default: () => [],
    },
    currentQuestionText: {
      type: String,
      default: "",
    },
    currentQuestionTh: {
      type: String,
      default: "",
    },
    isCorrectAnswer: {
      type: Boolean,
      default: () => null,
    },
  },
  emits: [
    "callback-nextquestion",
    "callback-choosebtn",
    "callback-sendanswer",
    "callback-playsound",
  ],
  setup(props, { emit }) {
    // Initial Data
    const currentAnswerList = ref(props.selectValue);
    // const isSendAnswer = ref(false);
    const isDialogAnswer = ref(false);

    const checkBottom = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].bottom;
    });

    const checkTop = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].top;
    });

    const checkLeft = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].left;
    });

    const checkRight = computed(() => {
      return currentAnswerList.value[currentAnswerList.value.length - 1].right;
    });

    const chooseLineMove = (row, col, val) => {
      emit("callback-choosebtn", { row: row, col: col, val: val });
    };

    const isFinishPractice = ref(false);

    const sendAnswer = async () => {
      // isSendAnswer.value = true;

      if (
        props.practiceData.totalQuestion ==
        props.practiceData.currentQuestion + 1
      ) {
        isFinishPractice.value = true;
      }

      let answerLetter = props.selectedLetter.join("").toLowerCase();

      if (answerLetter == props.currentQuestionText.toLowerCase()) {
        props.practiceData.isCorrectAnswer = true;
        emit("callback-playsound");
      } else {
        props.practiceData.isCorrectAnswer = false;
      }

      emit("callback-sendanswer");
    };

    const showAnswerBtn = computed(() => {
      if (currentAnswerList.value.length === props.currentQuestionText.length) {
        return true;
      } else {
        return false;
      }
    });

    const undo = () => {
      if (!props.practiceData.isSendAnswer) {
        if (currentAnswerList.value.length > 1) {
          let getLastData =
            currentAnswerList.value[currentAnswerList.value.length - 2];
          emit("callback-choosebtn", {
            row: getLastData.row,
            col: getLastData.col,
          });
        }
      }
    };

    watch(
      () => props.selectValue,
      () => {
        currentAnswerList.value = props.selectValue;
      }
    );

    // const funcNextQuestion = () => {
    // isSendAnswer.value = false;

    //   emit("callback-nextquestion");
    // };

    let tempAudio;

    const playVocabSound = () => {
      props.systemStore.playSound(props.practiceData.soundURL);

      // if (tempAudio) {
      //   tempAudio.pause();
      // }
      // let audio = props.practiceData.soundURL;
      // tempAudio = audio;
      // tempAudio.currentTime = 0;
      // tempAudio.volume = 0.75;
      // tempAudio.play();
    };

    return {
      currentAnswerList,
      // isSendAnswer,
      checkBottom,
      checkTop,
      checkLeft,
      checkRight,
      chooseLineMove,
      sendAnswer,
      showAnswerBtn,
      // funcNextQuestion,
      undo,
      isFinishPractice,
      playVocabSound,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  position: relative;
  max-width: 500px;
  width: 50;
  background-color: #d14e29;
  border-width: 5px;
  border-style: solid;
  border-color: #d14e29;
  border-radius: 10px;
  padding: 3px;
  font-weight: bold;
  z-index: 2;
}

.box-question-text {
  background-color: #fee9d4;
  border-radius: 10px;
}
.box-show-answer {
  position: relative;
  width: 30px;
  margin: 0px 4px;
  border-bottom: 4px solid #fff;
  color: #fff;
  font-weight: bold;
  z-index: 2;
}

.border-show-answer {
  border-bottom: 4px solid transparent !important;
}

.box-content {
  max-width: 1000px;
}

.box-content-answer {
  position: relative;
  max-width: 380px;
  width: 50%;
  background-color: #4f4f4f;
  border: 7px solid #c4c4c4;
  border-radius: 5px;
  z-index: 2;
}

.box-content-answer::before {
  content: "";
  position: absolute;
  bottom: -43px;
  left: 0;
  width: 100%;
  border: 18px solid #4f4f4f;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
}

.box-answer {
  width: 100%;
}

// Line Move Background Color
.link-answer-top {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 30px;
  height: 100%;
}

.link-answer-bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 30px;
  height: 100%;
}

.link-answer-left {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 30px;
}

.link-answer-right {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 30px;
}

.btn-active {
  transform: scale(1);
}

.btn-active:active {
  transform: scale(0.9);
}
</style>
