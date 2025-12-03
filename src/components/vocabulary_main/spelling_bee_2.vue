<template>
  <div class="" v-if="boggleList.length">
    <!-- Question Box -->
    <div
      style="
        max-width: 400px;
        min-width: 300px;
        width: 95%;
        margin: 15px auto 0px auto;
      "
      align="center"
    >
      <q-img
        no-spinner
        no-transition
        src="/images/vocabulary_main/vocab-spelling-question-box.png"
      >
        <div class="fit transparent no-padding">
          <div
            class="absolute-center row justify-center q-px-md"
            style="width: 90%"
          >
            <div
              align="left"
              class="self-center q-px-sm text-black font-mali-b"
              style="font-size: clamp(18px, 2vw, 22px)"
            >
              {{ practiceData.practice.spell2.question }}
            </div>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Show Current Answer -->
    <div class="q-pa-md" align="center">
      <div class="row justify-center" style="width: 400px; margin: auto">
        <div class="self-center col-1" style="width: 50px">
          <q-btn
            @click="practiceData.func.playSound()"
            flat=""
            size="13px"
            round
          >
            <q-img
              no-spinner
              no-transition
              src="/images/icon_main/icon-sound-audio.png"
            ></q-img>
          </q-btn>
        </div>
        <div
          class="self-center q-px-xs row"
          :class="practiceData.practice.spell2.vocab.length <= 3 ? '' : 'col'"
          align="center"
        >
          <div
            v-for="(item, index) in practiceData.practice.spell2.vocab.length"
            class="q-mx-xs"
            :class="
              practiceData.practice.spell2.vocab.length <= 3 ? 'col-1' : 'col'
            "
            :style="
              practiceData.practice.spell2.vocab.length <= 3 ? 'width:50px' : ''
            "
          >
            <div
              style="height: 55px"
              class="f36 font-mali-b text-white text-show-answer text-uppercase"
            >
              {{ selectedBoggle[index] ? selectedBoggle[index].text : " " }}
            </div>
          </div>
        </div>
        <div class="self-center col-1" style="width: 50px"></div>
      </div>
    </div>

    <!-- Answer Box -->
    <div
      style="max-width: 350px; min-width: 300px; width: 80%; margin: auto"
      align="center"
    >
      <q-img
        no-spinner
        no-transition
        src="/images/vocabulary_main/vocab-spelling-answer-box.png"
      >
        <div class="fit transparent">
          <div
            class="row justify-center"
            style="width: 100%; height: 95%; overflow: hidden"
          >
            <div
              class="self-center row justify-center items-center full-width"
              v-for="(box, indexBox) in boggleList"
            >
              <div
                class="col self-center relative-position q-pa-xs"
                v-for="(item, index) in box"
              >
                <!-- Line Arrow -->
                <div
                  class="absolute-center line-move-top"
                  v-if="item.type == 'top'"
                ></div>
                <div
                  class="absolute-center line-move-bottom"
                  v-if="item.type == 'bottom'"
                ></div>
                <div
                  class="absolute-center line-move-left"
                  v-if="item.type == 'left'"
                ></div>
                <div
                  class="absolute-center line-move-right"
                  v-if="item.type == 'right'"
                ></div>

                <!-- Button -->
                <q-btn
                  flat
                  style="width: 100%"
                  class="z-top"
                  round
                  :class="
                    (!(
                      nextChoices.top == item.rows &&
                      item.cols == nextChoices.cols
                    ) &&
                      !(
                        nextChoices.bottom == item.rows &&
                        item.cols == nextChoices.cols
                      ) &&
                      !(
                        nextChoices.left == item.cols &&
                        nextChoices.rows == item.rows
                      ) &&
                      !(
                        nextChoices.right == item.cols &&
                        nextChoices.rows == item.rows
                      ) &&
                      !(
                        item.cols == nextChoices.cols &&
                        item.rows == nextChoices.rows
                      ) &&
                      !item.isSelected) ||
                    (selectedBoggle.length ==
                      practiceData.practice.spell2.vocab.length &&
                      !item.isSelected)
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer'
                  "
                  @click="
                    (!(
                      nextChoices.top == item.rows &&
                      item.cols == nextChoices.cols
                    ) &&
                      !(
                        nextChoices.bottom == item.rows &&
                        item.cols == nextChoices.cols
                      ) &&
                      !(
                        nextChoices.left == item.cols &&
                        nextChoices.rows == item.rows
                      ) &&
                      !(
                        nextChoices.right == item.cols &&
                        nextChoices.rows == item.rows
                      ) &&
                      !(
                        item.cols == nextChoices.cols &&
                        item.rows == nextChoices.rows
                      ) &&
                      !item.isSelected) ||
                    (selectedBoggle.length ==
                      practiceData.practice.spell2.vocab.length &&
                      !item.isSelected)
                      ? null
                      : funcSelectedBoggleItems(indexBox, index)
                  "
                >
                  <q-img
                    width="90%"
                    no-spinner
                    no-transition
                    :src="`/images/button_main/button-spelling-${
                      item.isSelected
                        ? 'selected'
                        : selectedBoggle.length ==
                          practiceData.practice.spell2.vocab.length
                        ? 'disable'
                        : (nextChoices.top == item.rows &&
                            item.cols == nextChoices.cols) ||
                          (nextChoices.bottom == item.rows &&
                            item.cols == nextChoices.cols) ||
                          (nextChoices.left == item.cols &&
                            nextChoices.rows == item.rows) ||
                          (nextChoices.right == item.cols &&
                            nextChoices.rows == item.rows)
                        ? 'choices'
                        : 'disable'
                    }.png`"
                  >
                    <div class="full-width transparent" style="height: 100%">
                      <div class="absolute-center">
                        <span
                          class="font-mali-b f30 text-answer"
                          :class="item.isSelected ? 'text-black' : ''"
                        >
                          {{ `${item.text}` }}
                        </span>
                      </div>
                    </div>
                  </q-img>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </q-img>
    </div>

    <!-- Button Send Answer -->
    <div class="q-mt-sm" align="center">
      <div class="row justify-center" style="width: 400px">
        <div class="self-center q-mx-sm">
          <q-img
            :class="
              selectedBoggle.length == practiceData.practice.spell2.vocab.length
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            "
            width="150px"
            no-spinner
            no-transition
            :src="`/images/button_main/button-send${
              selectedBoggle.length == practiceData.practice.spell2.vocab.length
                ? ''
                : '-disable'
            }.png`"
            @click="
              selectedBoggle.length == practiceData.practice.spell2.vocab.length
                ? funcSendAnswer()
                : null
            "
          ></q-img>
        </div>
        <div class="col-1 self-start q-mx-xs">
          <q-img
            :class="
              selectedBoggle.length > 1
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            "
            width="50px"
            no-spinner
            no-transition
            :src="`/images/button_main/button-del${
              selectedBoggle.length > 1 ? '' : '-disable'
            }.png`"
            @click="selectedBoggle.length > 1 ? funcRemoveSelected() : null"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
export default {
  props: {
    practiceData: {
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const rows = ref(4);
    const cols = ref(4);

    const boggleList = ref([]);
    const selectedBoggle = ref([]);
    const rowsPosition = ref(0);
    const colsPosition = ref(0);
    const currentWord = ref(0);
    const isFirstBoggle = ref(true);
    const counterError = ref(0);
    const rowsBeforePosition = ref(0);
    const colsBeforePosition = ref(0);

    const funcSetRowsAndCols = (position, type) => {
      let tempPosition = [];
      let setArray = type == "ROWS" ? rows.value : cols.value;

      let newUpper = position;
      let newLower = position;

      if (type == "ROWS") {
        if (position != 0) {
          newUpper--;
        }

        if (position + 1 != setArray) {
          newLower++;
        }
      } else {
        if (rowsBeforePosition.value == rowsPosition.value) {
          if (position != 0) {
            newUpper--;
          }

          if (position + 1 != setArray) {
            newLower++;
          }
        }
      }

      tempPosition = [newUpper, position, newLower];

      if (type == "ROWS") {
        tempPosition = [...new Set(tempPosition)];

        tempPosition = tempPosition.filter((x) =>
          boggleList.value[x].filter((xx) => !xx.isHas)
        );
      } else {
        tempPosition = tempPosition.filter(
          (x) => !boggleList.value[rowsPosition.value][x].isHas
        );
      }

      let randomPosition = Math.floor(Math.random() * tempPosition.length);

      return tempPosition[randomPosition];
    };

    const funcSetAnswerInBoggle = () => {
      try {
        if (
          currentWord.value < props.practiceData.practice.spell2.vocab.length
        ) {
          if (isFirstBoggle.value) {
            isFirstBoggle.value = false;

            rowsPosition.value = Math.floor(Math.random() * rows.value);
            colsPosition.value = Math.floor(Math.random() * cols.value);

            boggleList.value[rowsPosition.value][colsPosition.value] = {
              text: props.practiceData.practice.spell2.vocab[currentWord.value],
              isHas: true,
              isSelected: true,
              rows: rowsPosition.value,
              cols: colsPosition.value,
              type: "center",
            };

            selectedBoggle.value = [
              boggleList.value[rowsPosition.value][colsPosition.value],
            ];

            rowsBeforePosition.value = rowsPosition.value;
            colsBeforePosition.value = colsPosition.value;

            currentWord.value++;
            funcSetAnswerInBoggle();
            return;
          }

          rowsPosition.value = funcSetRowsAndCols(rowsPosition.value, "ROWS");
          colsPosition.value = funcSetRowsAndCols(colsPosition.value, "COLS");

          if (!boggleList.value[rowsPosition.value][colsPosition.value].isHas) {
            boggleList.value[rowsPosition.value][colsPosition.value] = {
              text: props.practiceData.practice.spell2.vocab[currentWord.value],
              isHas: true,
              isSelected: false,
              rows: rowsPosition.value,
              cols: colsPosition.value,
              type: "center",
            };

            rowsBeforePosition.value = rowsPosition.value;
            colsBeforePosition.value = colsPosition.value;

            currentWord.value++;
            funcSetAnswerInBoggle();
          } else {
            if (counterError.value < 10) {
              counterError.value++;
              funcSetAnswerInBoggle();
            } else {
              counterError.value = 0;
              funcReset();
            }
            return;
          }
        }
      } catch (e) {
        funcReset();
      }
    };

    const nextChoices = computed(() => {
      let findNextChoices = {
        ...selectedBoggle.value[selectedBoggle.value.length - 1],
      };

      let tempAround;
      let setTop = findNextChoices.rows;
      let setBottom = findNextChoices.rows;

      let setLeft = findNextChoices.cols;
      let setRight = findNextChoices.cols;

      if (findNextChoices.rows != 0) {
        setTop = findNextChoices.rows - 1;
      }

      if (findNextChoices.rows + 1 != rows.value) {
        setBottom = findNextChoices.rows + 1;
      }

      if (findNextChoices.cols != 0) {
        setLeft = findNextChoices.cols - 1;
      }

      if (findNextChoices.cols + 1 != cols.value) {
        setRight = findNextChoices.cols + 1;
      }

      tempAround = {
        top: setTop,
        bottom: setBottom,
        left: setLeft,
        right: setRight,
        cols: findNextChoices.cols,
        rows: findNextChoices.rows,
      };

      return tempAround;
    });

    const funcSetBoggle = () => {
      boggleList.value = [];

      let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

      for (let a = 0; a < rows.value; a++) {
        boggleList.value.push([]);

        for (let b = 0; b < cols.value; b++) {
          let randomAlphabet = Math.floor(Math.random() * alphabet.length);

          let newData = {
            text: alphabet[randomAlphabet],
            isHas: false,
            isSelected: false,
            rows: a,
            cols: b,
          };

          boggleList.value[a].push(newData);
        }
      }

      funcSetAnswerInBoggle();
    };

    const funcReset = () => {
      selectedBoggle.value = [];
      rowsPosition.value = 0;
      colsPosition.value = 0;
      currentWord.value = 0;
      isFirstBoggle.value = true;

      funcSetBoggle();
    };

    const funcSelectedBoggleItems = (rows, cols) => {
      let currentSelected =
        selectedBoggle.value[selectedBoggle.value.length - 1];

      if (boggleList.value[rows][cols].isSelected) {
        if (currentSelected.rows == rows && currentSelected.cols == cols) {
          return;
        } else {
          boggleList.value[currentSelected.rows][
            currentSelected.cols
          ].isSelected = false;
          boggleList.value[currentSelected.rows][currentSelected.cols].type =
            "center";

          selectedBoggle.value.pop();
        }
        return;
      }

      if (
        selectedBoggle.value.length ==
        props.practiceData.practice.spell2.vocab.length
      ) {
        return;
      }

      let setType = "center";

      if (currentSelected.rows == rows) {
        if (cols < currentSelected.cols) {
          setType = "left";
        } else {
          setType = "right";
        }
      } else {
        if (rows < currentSelected.rows) {
          setType = "bottom";
        } else {
          setType = "top";
        }
      }

      boggleList.value[rows][cols].isSelected = true;
      boggleList.value[rows][cols].type = setType;

      selectedBoggle.value.push(boggleList.value[rows][cols]);

      let answer = selectedBoggle.value.map((x) => x.text).join("");

      props.practiceData.practice.selectedAnswer = answer;
    };

    const funcRemoveSelected = () => {
      let currentSelected =
        selectedBoggle.value[selectedBoggle.value.length - 1];

      if (selectedBoggle.value.length == 1) {
        return;
      }

      boggleList.value[currentSelected.rows][
        currentSelected.cols
      ].isSelected = false;

      boggleList.value[currentSelected.rows][currentSelected.cols].type =
        "center";

      selectedBoggle.value.pop();
    };

    const funcSendAnswer = () => {
      let answer = selectedBoggle.value.map((x) => x.text).join("");

      props.practiceData.practice.spell2.description =
        props.practiceData.practice.spell2.vocab;

      props.practiceData.func.sendAnswer(answer);
    };

    onMounted(() => {
      funcSetBoggle();
    });

    return {
      boggleList,
      selectedBoggle,
      nextChoices,

      funcSelectedBoggleItems,
      funcRemoveSelected,
      funcSendAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-show-answer {
  text-shadow: rgb(74, 38, 27) 1px 0px 0px,
    rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px,
    rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px,
    rgb(74, 38, 27) 0.96017px -0.279415px 0px;
  border-bottom-color: #a3ade6;
  border-bottom-width: 1.3mm;
  border-bottom-style: solid;
  box-shadow: 0px 5px 0px 0px rgba(0, 0, 0, 0.1);
}

.text-answer {
  text-shadow: rgb(74, 38, 27) 1px 0px 0px,
    rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px,
    rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px,
    rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}

.text-answer.selected {
  color: #000000;
}

.text-answer {
  color: #fff;
}

.line-move-left,
.line-move-right,
.line-move-top,
.line-move-bottom {
  background-color: #a7e71d;
}

.line-move-left,
.line-move-right {
  width: 50px;
  height: 20px;
}

.line-move-left {
  left: 100%;
}

.line-move-right {
  left: 0%;
}

.line-move-top,
.line-move-bottom {
  width: 20px;
  height: 50px;
}

.line-move-top {
  top: 0%;
}

.line-move-bottom {
  top: 100%;
}
</style>
