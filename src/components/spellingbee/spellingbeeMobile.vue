<template>
  <div class="row relative-position" style="background-color: #252a52">
    <div class="col-12" align="center">
      <div class="col-12 q-py-md" style="">
        <div class="q-px-xs">
          <div class="box-question">
            <div class="row" style="margin-top: -10px">
              <div class="col">
                <header-bar :practiceData="practiceData"></header-bar>
              </div>
              <div
                class="col-2 self-center q-pr-xs q-py-xs"
                style="width: fit-content"
              >
                <q-btn
                  push
                  round
                  style="background-color: #6d4300; z-index: 2"
                  class="text-white relative-position"
                  icon="fas fa-volume-up"
                  @click="$emit('callback-playsound')"
                ></q-btn>
              </div>
            </div>
            <div class="q-pa-md box-question-text">
              <span class="f20"> {{ currentQuestionTh }} </span>
            </div>
          </div>
        </div>
        <div class="row justify-center q-py-lg" align="center">
          <div
            class="box-show-answer self-end f20"
            v-for="(item, index) in currentQuestionText.length"
            :key="index"
          >
            {{ selectedLetter[index] }}
          </div>
        </div>

        <div class="box-content-answer q-pa-md">
          <div
            class="justify-between row q-mt-xs"
            v-if="currentAnswerList.length"
            v-for="(item, row) in boggle"
            :key="row"
          >
            <div
              class="relative-position"
              style="width: 20%"
              v-for="(item2, col) in item"
              :key="col"
            >
              <q-btn
                round
                push
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
                  isCorrectAnswer &&
                  currentAnswerList.filter((x) => x.row == row && x.col == col)
                    .length &&
                  practiceData.isSendAnswer
                    ? 'bg-teal-3 text-black'
                    : !isCorrectAnswer &&
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
                    : currentAnswerList.length == currentQuestionText.length &&
                      !currentAnswerList.filter(
                        (x) => x.row == row && x.col == col
                      ).length
                    ? 'cursor-not-allowed bg-black'
                    : 'cursor-pointer bg-purple'
                "
                class="text-bold text-white q-ma-xs"
                style="z-index: 2"
                ><span class="text-bold f24">{{ item2.letter }}</span>
              </q-btn>
              <div
                v-if="
                  currentAnswerList.filter((x) => x.row == row && x.col == col)
                    .length
                "
                :class="`link-answer-${
                  currentAnswerList.filter(
                    (x) => x.row == row && x.col == col
                  )[0].lineMove
                }`"
              ></div>
            </div>
          </div>

          <div class="q-pa-md" align="right"></div>

          <div
            class="relative-position row"
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

    const sendAnswer = () => {
      // isSendAnswer.value = true;

      if (
        props.practiceData.totalQuestion ==
        props.practiceData.currentQuestion + 1
      ) {
        isFinishPractice.value = true;
      }

      let isCorrectAnswer = false;

      let answerLetter = props.selectedLetter.join("").toLowerCase();

      if (answerLetter == props.currentQuestionText.toLowerCase()) {
        isCorrectAnswer = true;
      } else {
        isCorrectAnswer = false;
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

          // console.log(getLastData);
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

    const tempAudio = ref(null);

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
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question-text {
  background-color: #fee9d4;
  border-radius: 10px;
}

.box-question {
  position: relative;
  max-width: 400px;
  background-color: #d14e29;
  border-width: 5px;
  border-style: solid;
  border-color: #d14e29;
  border-radius: 10px;
  // margin-top: -25px;
  font-weight: bold;
  z-index: 2;
}

.box-show-answer {
  width: 18px;
  margin: 0px 2px;
  border-bottom: 2px solid #fff;
  font-weight: bold;
  color: #fff;
}

.box-content-answer {
  max-width: 400px;
  width: 100%;
  z-index: 2;
}

.border-show-answer {
  border-bottom: 3px solid transparent !important;
}

// Line Move Background Color
.link-answer-top {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 27px;
  height: 100%;
}

.link-answer-bottom {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  background-color: #ff5f01;
  width: 27px;
  height: 100%;
}

.link-answer-left {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 25px;
}

.link-answer-right {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(0%, -50%);
  background-color: #ff5f01;
  width: 100%;
  height: 25px;
}

.btn-active {
  transform: scale(1);
}

.btn-active:active {
  transform: scale(0.9);
}
</style>
