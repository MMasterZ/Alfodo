<template>
  <q-page class="bg-seplling relative-position">
    <div id="midground"></div>
    <div id="foreground"></div>
    <div>
      <app-bar
        :isLoadPractice="isLoadPractice"
        :isHasInstruction="true"
        :isShowPause="isSynchronize ? null : true"
        :instructionData="instructionData"
        @toggleEffect="toggleEffect"
        :isSynchronize="isSynchronize"
        :systemStore="systemStore"
      ></app-bar>
    </div>

    <spelling-pc
      :practiceData="practiceData"
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :selectedLetter="selectedLetter"
      :isCorrectAnswer="practiceData.isCorrectAnswer"
      :currentQuestionTh="currentQuestionTh"
      :vocabularyList="vocabularyList"
      @callback-choosebtn="selectedBox"
      @callback-sendanswer="funcSendAnswer"
      @callback-nextquestion="funcNextQuestion"
      @callback-playsound="systemStore.playSound(practiceData.soundURL)"
      class="box-container-main"
      v-if="$q.platform.is.desktop && isLoadPractice"
      :boggleNumber="boggleNumber"
    ></spelling-pc>

    <spelling-mobile
      :practiceData="practiceData"
      :boggle="boggle"
      :selectValue="selectValue"
      :currentQuestionText="currentQuestionText"
      :currentQuestionTh="currentQuestionTh"
      :selectedLetter="selectedLetter"
      :isCorrectAnswer="practiceData.isCorrectAnswer"
      :vocabularyList="vocabularyList"
      @callback-choosebtn="selectedBox"
      @callback-sendanswer="funcSendAnswer"
      @callback-nextquestion="funcNextQuestion"
      @callback-playsound="systemStore.playSound(practiceData.soundURL)"
      v-if="$q.platform.is.mobile && isLoadPractice"
      class="box-container-main"
      :boggleNumber="boggleNumber"
    ></spelling-mobile>

    <answer-action
      :systemStore="systemStore"
      @callback-nextquestion="funcNextQuestion"
      @callback-restart="funcReStart()"
      :practiceData="practiceData"
      :isSynchronize="isSynchronize"
    ></answer-action>

    <learning-done
      :isShowLearningDone="isShowLearningDone"
      @callback-closedialog="
        (isShowLearningDone = false), $router.replace('/practice/unit')
      "
    ></learning-done>

    <tutorial
      type=""
      :isShowTutorial="isShowTutorial"
      v-if="isLoadPractice"
    ></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import spellingPc from "../components/spellingbee/spellingbeePc.vue";
import spellingMobile from "../components/spellingbee/spellingbeeMobile.vue";
import finishPractice from "../components/finishPracticeDialog.vue";
import appBar from "../components/app-bar.vue";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import learningDone from "../components/dialog-learning-done.vue";
import loading from "../components/dialog-loading.vue";
import {
  analyticsLogEvent,
  db,
  funcFinishPractice,
  funcPracticePermissionLog,
  saveCourseSyncData,
} from "src/router";
import axios from "axios";
import answerAction from "../components/answer-action.vue";
import tutorial from "../components/tutorial.vue";
import practiceHooks from "../hooks/practiceHooks";
import { usePracticeStore } from "src/stores/practice";

const CancelToken = axios.CancelToken;
let tokenAPI;

export default {
  components: {
    spellingPc,
    spellingMobile,
    appBar,
    finishPractice,
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
    studentStore: {
      default: () => {},
    },
  },

  setup(props) {
    // Router and Route
    const router = useRouter();
    const route = useRoute();
    // Initial Data
    const $q = useQuasar();
    const isCorrectAnswer = ref(false);
    const isShowLearningDone = ref(false);

    const isShowLoading = ref(false);

    const instructionData = ref({
      eng: "Choose the given alphabets to spell the correct word.",
      th: "เลือกตัวอักษรภาษาอังกฤษให้เป็นคำที่ถูกต้อง",
    });

    const practiceData = reactive({
      // Initial Data
      totalQuestion: 0,
      totalStar: 0,
      currentQuestion: 0,
      score: 0,
      correct: 0,
      incorrect: 0,
      skill: "Vocabulary",
      isEnableSoundEffect: false,
      level: 0,
      unit: 0,

      // use current question
      question: "",
      description: "",
      refs: [],
      choices: [],

      // use current answer
      isSendAnswer: false,
      isCorrectAnswer: false,
      isFinishPractice: false,
      currentChoice: "",
      currentAnswer: "",
      answers: [],
    });

    const isLoadPractice = ref(false);

    const boggle = ref([]);

    const vocabularyList = ref([]);

    let counter = 0;

    const funcLoadPractice = async () => {
      isLoadPractice.value = true;

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

        let setVocab = flashcardList;

        let randomData = setVocab.sort((a, b) => a.order - b.order);

        let setQuestion = randomData.map((x) => {
          return {
            vocab: x.vocab,
            meaning: x.meaning,
            descriptionTh: x.sentenceTh,
            descriptionEng: x.sentenceEng,
            soundURL: new Audio(x.soundVocabUrl),
          };
        });

        setQuestion = setQuestion.slice(0, practiceData.totalQuestion);

        practiceData.answers = setQuestion.map((x) => {
          return { isCorrect: false };
        });

        let setAnswer = [...setQuestion];

        // setAnswer = setAnswer.sort(() => Math.random() - 0.5);

        vocabularyList.value = setAnswer;

        practiceData.totalQuestion = vocabularyList.value.length;
        practiceData.soundURL = vocabularyList.value[0].soundURL;
        currentQuestionText.value =
          vocabularyList.value[practiceData.currentQuestion].vocab;
        currentQuestionTh.value =
          vocabularyList.value[practiceData.currentQuestion].meaning;

        await shuffleLetters(counter);

        isLoadPractice.value = true;
        isShowLoading.value = false;
      } catch (err) {
        // console.log(`${err} Type Spellingbee`);
        isShowLoading.value = false;
      }
    };

    const letter = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];

    const letterSound = [];

    const currentQuestionText = ref("");

    const currentQuestionTh = ref("");

    const selectedLetter = ref([]);

    const boggleNumber = ref(5);

    let rowBefore;
    let colBefore;

    const isFinishBoggle = ref(false);

    const shuffleArray = (array) => {
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
    };

    const resetBoggle = () => {
      selectValue.value = [];
      selectedLetter.value = [];
      counter = 0;

      if (boggleNumber.value == 5) {
        boggle.value = [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ];
      } else if (boggleNumber.value == 4) {
        boggle.value = [
          ["", "", "", ""],
          ["", "", "", ""],
          ["", "", "", ""],
          ["", "", "", ""],
          ["", "", "", ""],
        ];
      } else {
        boggle.value = [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ];
      }

      rowBefore = null;
      colBefore = null;
      shuffleLetters(counter);
    };

    const selectValue = ref([]);

    let countError = 0;

    const shuffleLetters = (counter) => {
      try {
        if (
          counter <
          vocabularyList.value[practiceData.currentQuestion].vocab.length
        ) {
          if (counter == 0) {
            let randomRow = Math.floor(Math.random() * 5); //random 0-4
            let randomCol = Math.floor(Math.random() * boggleNumber.value); //random 0-4
            //   ตัวแรก

            let letter =
              vocabularyList.value[practiceData.currentQuestion].vocab[
                counter
              ].toUpperCase();

            boggle.value[randomRow][randomCol] = {
              letter: letter,
            };

            selectedLetter.value.push(
              vocabularyList.value[practiceData.currentQuestion].vocab[
                counter
              ].toUpperCase()
            );

            rowBefore = randomRow;
            colBefore = randomCol;
            selectValue.value.push({
              row: randomRow,
              col: randomCol,
              left: {
                row: randomRow,
                col: randomCol - 1,
              },
              right: {
                row: randomRow,
                col: randomCol + 1,
              },
              bottom: {
                row: randomRow + 1,
                col: randomCol,
              },
              top: {
                row: randomRow - 1,
                col: randomCol,
              },
              lineMove: "center",
            });
            counter++;
            shuffleLetters(counter);
          } else {
            const findNearestColumn = () => {
              const try3 = () => {
                let availablePosition;
                if (rowBefore == 0) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [0, 1],
                      [1, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [0, 0],
                      [0, 2],
                      [1, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [0, 1],
                      [0, 3],
                      [1, 2],
                    ];
                  }
                } else if (rowBefore == 1) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 1],
                      [2, 0],
                      [0, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [1, 0],
                      [1, 2],
                      [0, 1],
                      [2, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [1, 1],
                      [0, 2],
                      [1, 3],
                      [2, 2],
                    ];
                  }
                } else if (rowBefore == 2) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 0],
                      [2, 1],
                      [3, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [2, 0],
                      [1, 1],
                      [2, 2],
                      [3, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [2, 1],
                      [1, 2],
                      [2, 3],
                      [3, 2],
                    ];
                  }
                } else if (rowBefore == 3) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [2, 0],
                      [3, 1],
                      [4, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [3, 0],
                      [2, 1],
                      [3, 2],
                      [4, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [3, 1],
                      [2, 2],
                      [3, 3],
                      [4, 2],
                    ];
                  }
                } else if (rowBefore == 4) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [3, 0],
                      [4, 1],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [4, 0],
                      [3, 1],
                      [4, 2],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [4, 1],
                      [3, 2],
                      [4, 3],
                    ];
                  }
                }

                let shuffleArr = shuffleArray(availablePosition);
                let [row, col] = shuffleArr[0];

                let letter =
                  vocabularyList.value[practiceData.currentQuestion].vocab[
                    counter
                  ].toUpperCase();

                if (boggle.value[row][col] == "") {
                  boggle.value[row][col] = {
                    letter: letter,
                  };
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  if (countError < 100) {
                    findNearestColumn();
                  } else {
                    countError = 0;
                    resetBoggle();
                  }
                }
              };

              const try4 = () => {
                let availablePosition;
                if (rowBefore == 0) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [0, 1],
                      [1, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [0, 0],
                      [0, 2],
                      [1, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [0, 1],
                      [0, 3],
                      [1, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [0, 2],
                      [0, 4],
                      [1, 3],
                    ];
                  }
                } else if (rowBefore == 1) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 1],
                      [2, 0],
                      [0, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [1, 0],
                      [1, 2],
                      [0, 1],
                      [2, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [1, 1],
                      [0, 2],
                      [1, 3],
                      [2, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [1, 2],
                      [0, 3],
                      [1, 4],
                      [2, 3],
                    ];
                  }
                } else if (rowBefore == 2) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 0],
                      [2, 1],
                      [3, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [2, 0],
                      [1, 1],
                      [2, 2],
                      [3, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [2, 1],
                      [1, 2],
                      [2, 3],
                      [3, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [2, 2],
                      [1, 3],
                      [2, 4],
                      [3, 3],
                    ];
                  }
                } else if (rowBefore == 3) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [2, 0],
                      [3, 1],
                      [4, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [3, 0],
                      [2, 1],
                      [3, 2],
                      [4, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [3, 1],
                      [2, 2],
                      [3, 3],
                      [4, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [3, 2],
                      [2, 3],
                      [3, 4],
                      [4, 3],
                    ];
                  }
                } else if (rowBefore == 4) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [3, 0],
                      [4, 1],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [4, 0],
                      [3, 1],
                      [4, 2],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [4, 1],
                      [3, 2],
                      [4, 3],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [4, 2],
                      [3, 3],
                      [4, 4],
                    ];
                  }
                }

                let shuffleArr = shuffleArray(availablePosition);
                let [row, col] = shuffleArr[0];
                let letter =
                  vocabularyList.value[practiceData.currentQuestion].vocab[
                    counter
                  ].toUpperCase();
                if (boggle.value[row][col] == "") {
                  boggle.value[row][col] = {
                    letter: letter,
                  };
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  if (countError < 100) {
                    findNearestColumn();
                  } else {
                    countError = 0;
                    resetBoggle();
                  }
                }
              };

              const try5 = () => {
                let availablePosition;
                if (rowBefore == 0) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [0, 1],
                      [1, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [0, 0],
                      [0, 2],
                      [1, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [0, 1],
                      [0, 3],
                      [1, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [0, 2],
                      [0, 4],
                      [1, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [0, 3],
                      [1, 4],
                    ];
                  }
                } else if (rowBefore == 1) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 1],
                      [2, 0],
                      [0, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [1, 0],
                      [1, 2],
                      [0, 1],
                      [2, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [1, 1],
                      [0, 2],
                      [1, 3],
                      [2, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [1, 2],
                      [0, 3],
                      [1, 4],
                      [2, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [1, 3],
                      [0, 4],
                      [2, 4],
                    ];
                  }
                } else if (rowBefore == 2) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [1, 0],
                      [2, 1],
                      [3, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [2, 0],
                      [1, 1],
                      [2, 2],
                      [3, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [2, 1],
                      [1, 2],
                      [2, 3],
                      [3, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [2, 2],
                      [1, 3],
                      [2, 4],
                      [3, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [2, 3],
                      [1, 4],
                      [3, 4],
                    ];
                  }
                } else if (rowBefore == 3) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [2, 0],
                      [3, 1],
                      [4, 0],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [3, 0],
                      [2, 1],
                      [3, 2],
                      [4, 1],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [3, 1],
                      [2, 2],
                      [3, 3],
                      [4, 2],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [3, 2],
                      [2, 3],
                      [3, 4],
                      [4, 3],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [3, 3],
                      [2, 4],
                      [4, 4],
                    ];
                  }
                } else if (rowBefore == 4) {
                  if (colBefore == 0) {
                    availablePosition = [
                      [3, 0],
                      [4, 1],
                    ];
                  } else if (colBefore == 1) {
                    availablePosition = [
                      [4, 0],
                      [3, 1],
                      [4, 2],
                    ];
                  } else if (colBefore == 2) {
                    availablePosition = [
                      [4, 1],
                      [3, 2],
                      [4, 3],
                    ];
                  } else if (colBefore == 3) {
                    availablePosition = [
                      [4, 2],
                      [3, 3],
                      [4, 4],
                    ];
                  } else if (colBefore == 4) {
                    availablePosition = [
                      [4, 3],
                      [3, 4],
                    ];
                  }
                }

                let shuffleArr = shuffleArray(availablePosition);
                let [row, col] = shuffleArr[0];
                let letter =
                  vocabularyList.value[practiceData.currentQuestion].vocab[
                    counter
                  ].toUpperCase();
                if (boggle.value[row][col] == "") {
                  boggle.value[row][col] = {
                    letter: letter,
                  };
                  counter++;
                  rowBefore = row;
                  colBefore = col;
                  shuffleLetters(counter);
                  countError = 0;
                } else {
                  countError++;
                  if (countError < 100) {
                    findNearestColumn();
                  } else {
                    countError = 0;
                    resetBoggle();
                  }
                }
              };

              try {
                if (boggleNumber.value == 3) {
                  try3();
                } else if (boggleNumber.value == 4) {
                  try4();
                } else {
                  try5();
                }
              } catch (error) {
                resetBoggle();
              }
            };

            findNearestColumn();
          }
        } else {
          // Finish
          boggle.value.forEach((element) => {
            element.forEach((x, index) => {
              if (!x) {
                let randomNumber = Math.floor(Math.random() * 26); //raddom 0  - 25
                element[index] = {
                  letter: letter[randomNumber].toUpperCase(),
                };
              }
            });
          });
          isFinishBoggle.value = true;
        }
      } catch (error) {
        resetBoggle();
      }
    };

    let audioTemp = null;

    const selectedBox = (item) => {
      audioTemp = letterSound.filter((x) => x.letter == item.val);

      if (item.val != " " && item.val) {
        props.systemStore.playSound(audioTemp[0].sound);
      }

      // ถ้ามีการกดปุ่มไว้อยู่แล้ว
      let sameAnswer = selectValue.value.filter(
        (x) => x.row == item.row && x.col == item.col
      ).length;

      // กรณีครั้งแรกห้ามกดตัวซ้ำ
      if (sameAnswer && selectValue.value.length == 1) {
        return;
      }

      if (selectValue.value.length > 1) {
        // เก็บค่า Index หลังจากกด Back กลับไป
        let backAnswer = selectValue.value[selectValue.value.length - 2];

        // เช็คค่า Back หลังจากกดกลับไป ว่าค่า Index ตรงกับที่กดมาหรือไม่
        if (backAnswer.row == item.row && backAnswer.col == item.col) {
          // isSendAnswer.value = false;
          // selectValue.value[selectValue.value.length - 2].lineMove = "center";
          selectValue.value.pop();
          selectedLetter.value.pop();
          return;
        }

        let DulpicateIndex = selectValue.value.filter(
          (x) => x.row == item.row && x.col == item.col
        ).length;

        // ถ้ากรณีมีข้อมูลที่กดอยู่แล้ว
        if (DulpicateIndex) {
          return;
        }

        // ไม่สามารถกดปุ่มต่อไปได้ถ้าตอบข้อตามจำนวนข้อแล้ว
        if (selectValue.value.length == currentQuestionText.value.length) {
          return;
        }
      }

      selectValue.value.push({
        row: item.row,
        col: item.col,
        left: {
          row: item.row,
          col: item.col - 1,
        },
        right: {
          row: item.row,
          col: item.col + 1,
        },
        bottom: {
          row: item.row + 1,
          col: item.col,
        },
        top: {
          row: item.row - 1,
          col: item.col,
        },
        lineMove: "center",
      });

      if (item.row == selectValue.value[selectValue.value.length - 2].row) {
        if (item.col > selectValue.value[selectValue.value.length - 2].col) {
          selectValue.value[selectValue.value.length - 1].lineMove = "right";
        } else {
          selectValue.value[selectValue.value.length - 1].lineMove = "left";
        }
      } else {
        if (item.row > selectValue.value[selectValue.value.length - 2].row) {
          selectValue.value[selectValue.value.length - 1].lineMove = "top";
        } else {
          selectValue.value[selectValue.value.length - 1].lineMove = "bottom";
        }
      }

      selectedLetter.value.push(item.val.toUpperCase());
    };

    let answerStructure = [];
    const funcSendAnswer = async () => {
      if (!practiceData.isSendAnswer) {
        const practiceStore = usePracticeStore();

        practiceStore.saveProgressLog(
          `spelling-${
            vocabularyList.value[practiceData.currentQuestion].vocab
          }`,
          route.params.practiceListId
        );

        practiceData.isSendAnswer = true;

        let answerLetter = selectedLetter.value.join("");

        practiceData.currentChoice = answerLetter;
        practiceData.currentAnswer = currentQuestionText.value.toUpperCase();

        if (answerLetter == currentQuestionText.value.toUpperCase()) {
          practiceData.isCorrectAnswer = true;
          practiceData.answers[practiceData.currentQuestion].isCorrect = true;
          // practiceData.correct++;
        } else {
          practiceData.isCorrectAnswer = false;
          practiceData.answers[practiceData.currentQuestion].isCorrect = false;
          // practiceData.incorrect++;
        }

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
          answerIndex: null,
          question: vocabularyList.value[practiceData.currentQuestion].meaning,
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

    const reset = () => {
      selectValue.value = [];
      resetBoggle();
    };

    const funcNextQuestion = () => {
      practiceData.currentQuestion++;
      selectValue.value = [];
      currentQuestionText.value =
        vocabularyList.value[practiceData.currentQuestion].vocab;
      currentQuestionTh.value =
        vocabularyList.value[practiceData.currentQuestion].meaning;

      practiceData.soundURL =
        vocabularyList.value[practiceData.currentQuestion].soundURL;

      resetBoggle();
    };

    const funcReStart = async () => {
      isShowLoading.value = false;

      practiceData.totalQuestion = 0;
      practiceData.currentQuestion = 0;
      practiceData.totalStar = 0;
      practiceData.isFinishPractice = false;
      practiceData.correct = 0;
      practiceData.incorrect = 0;
      practiceData.isSendAnswer = false;

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
          (x) => x.routeName == route.name && x.practiceType == "spellingbee"
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

      props.systemStore.setRouter("spellingbee");

      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          if (analyticsLogEvent != null) {
            analyticsLogEvent("/spellingbee");
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

          letter.forEach((x) => {
            let newAudio = new Audio(`/alphabet_sound/${x}.mp3`);
            let newData = {
              letter: x,
              sound: newAudio,
            };
            letterSound.push(newData);
          });

          await funcLoadPractice();
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    onBeforeUnmount(() => {
      if (authListen) {
        authListen();
      }

      if (tokenAPI != undefined) tokenAPI();

      letterSound.forEach((res) => {
        res.sound = null;
      });

      vocabularyList.value.forEach((res) => {
        res.soundURL = null;
      });
    });

    return {
      isShowLoading,
      isShowTutorial,
      isShowLearningDone,
      toggleEffect,
      practiceData,
      boggle,
      funcNextQuestion,
      selectedBox,
      selectValue,
      reset,
      isFinishBoggle,
      selectedLetter,
      currentQuestionText,
      currentQuestionTh,
      funcSendAnswer,
      isCorrectAnswer,
      isLoadPractice,
      finishPractice,
      funcReStart,
      boggleNumber,
      vocabularyList,
      instructionData,
    };
  },
  data() {
    return {
      tab: "vocab",
      instruction: {
        en: "xxx",
        th: "ปปป",
      },
    };
  },
  methods: {
    closeInstructionBtn() {
      this.$emit("closeInstruction");
    },
    closeHelpBtn() {
      this.$emit("closeHelp");
    },
  },
};
</script>

<style lang="scss" scoped>
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

.bg-seplling {
  // background-image: url("/images/spellingbee/bg-spellingbee.png");
  background-size: cover;
  background-position: center;
  background-color: #252a52;
}
.box-extravocab-pc {
  max-width: 600px;
  min-width: 290px;
  width: 100%;
}

.box-extravocab-mobile {
  max-width: 400px;
  width: 100%;
}

.box-header-extravocab {
  background-color: #9f220c;
  color: #fff;
  border-radius: 7px 7px 0px 0px;
}

.box-content-instruction {
  height: 100%;
}
</style>
