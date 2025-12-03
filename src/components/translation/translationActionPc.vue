<template>
  <div class="box-translation">
    <div>
      <div class="col-12">
        <div>
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div>
    </div>

    <div align="center" style="margin-top: -30px">
      <q-img
        width="450px"
        src="/images/translation/label-translation.png"
        style="z-index: 2"
      >
        <div class="absolute-center fit transparent">
          <span class="f20 text-bold" v-html="practiceData.nameEng"></span>
        </div>
      </q-img>
    </div>

    <div class="row justify-center">
      <div class="col-6 relative-position self-start q-py-md" align="center">
        <div class="relative-position" style="margin-bottom: -65px; z-index: 2">
          <q-img src="/images/translation/header-question.png"></q-img>
        </div>
        <div class="relative-position q-pb-lg q-px-md">
          <div class="box-content-question q-pa-lg">
            <div class="q-py-md"></div>
            <div class="row" v-if="!isShowContent">
              <div
                class="self-center"
                v-for="(item, index) in practiceData.question"
                @click="selectedBoxAnswer = index"
              >
                <div class="self-center relative-position">
                  <div
                    class="f18 q-mx-xs"
                    v-html="item.answer"
                    v-if="!item.isAnswer"
                  ></div>
                  <div
                    v-if="item.isAnswer"
                    class="q-my-sm q-mx-sm"
                    @click="
                      !isSendAnswer
                        ? item.currentAnswer != ''
                          ? funcRemoveAnswer(item.currentAnswer, index)
                          : null
                        : ''
                    "
                    :class="
                      !isSendAnswer
                        ? currentSelectAnswerBox == index
                          ? 'btn-selected-answer bg-amber-4'
                          : item.currentAnswer != ''
                          ? 'btn-has-answer cursor-pointer'
                          : 'btn-not-selected-answer'
                        : item.isCorrectAnswer
                        ? 'btn-correct'
                        : 'btn-incorrect'
                    "
                  >
                    {{ item.currentAnswer }}
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isShowContent" class="q-py-md" align="left">
              <div class="f20" v-html="practiceData.contentEng"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1" style="width: 50px"></div>
      <div class="col-5 q-py-md q-mt-lg" align="center">
        <div class="box-content-answer relative-position" v-if="!isShowContent">
          <div
            class="relative-position box-content-th q-pa-md q-py-lg row justify-center"
            align="left"
          >
            <q-img
              class="absolute-top-left"
              width="100px"
              style="top: -100%; left: -4%"
              src="/images/translation/icon-snow.png"
            ></q-img>
            <span class="f16" v-html="practiceData.questionTh"></span>
          </div>
          <div class="q-px-md q-pb-xl q-pt-sm" align="left">
            <q-btn
              push
              class="q-ma-sm"
              :class="
                allChooseAnswer
                  ? 'bg-disable no-pointer-events'
                  : 'bg-amber cursor-pointer'
              "
              v-for="(item, index) in practiceData.choices"
              @click="funcSelectedAnswer(item, index)"
              no-caps
              >{{ item }}</q-btn
            >
          </div>
        </div>

        <div
          v-else
          class="relative-position box-content-th q-px-lg q-py-xl"
          style="border: 3px solid#fff; border-radius: 10px"
          v-if="isShowContent"
          align="left"
        >
          <div>
            <q-img
              class="absolute-top-left"
              width="100px"
              style="top: -20%; left: -4%"
              src="/images/translation/icon-snow.png"
            ></q-img>
          </div>
          <div>
            <span class="f16" v-html="practiceData.contentTh"></span>
          </div>
        </div>
      </div>

      <div class="col-12 self-start">
        <div align="center" v-if="!isShowContent">
          <q-img
            v-show="!isSendAnswer"
            width="200px"
            :class="allChooseAnswer ? 'cursor-pointer' : 'no-pointer-events'"
            @click="!isSendAnswer ? funcSendAnswer() : null"
            :src="`/images/send-answer-btn${
              allChooseAnswer ? '' : '-noactive'
            }.png`"
          ></q-img>
        </div>

        <div class="q-pa-md" align="center" v-if="isShowContent">
          <q-btn
            label="ออกจากแบบฝึกหัด"
            push
            @click="$emit('callback-finishpractice')"
            class="bg-amber"
            no-caps
            style="width: 200px"
          >
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Finish Show Content -->
    <!-- <div class="row justify-center q-py-md" v-if="isShowContent">
      <div class="col q-px-md">
        <div class="box-question q-pa-sm" align="center">
          <span class="f20 text-bold" v-html="practiceData.nameEng"></span>
        </div>
        <div class="box-content-question q-pa-lg">
          <div>
            <span class="f20" v-html="practiceData.contentEng"></span>
          </div>
        </div>
      </div>

      <div class="col q-px-md">
        <div class="box-question q-pa-sm" align="center">
          <span class="f20 text-bold" v-html="practiceData.nameTh"></span>
        </div>
        <div class="box-content-question q-pa-lg">
          <div>
            <span class="f20" v-html="practiceData.contentTh"></span>
          </div>
        </div>
      </div>

      <div class="col-12 q-pa-xl" align="center">
        <q-btn
          label="ออกจากแบบฝึกหัด"
          push
          @click="$emit('callback-finishpractice')"
          class="bg-amber"
          no-caps
          style="width: 200px"
        >
        </q-btn>
      </div>
    </div> -->

    <answer-action
      :systemStore="systemStore"
      :isAnswerAction="isSendAnswer"
      :answerData="answerData"
      :isFinishPractice="isFinishPractice"
      @callback-nextquestion="funcNextQuestion()"
      @callback-finishpractice="isShowContent = true"
    ></answer-action>
  </div>
</template>

<script>
import headerBar from "../../components/header-time-progress.vue";
import answerAction from "../answer-action.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
    answerAction,
  },
  emits: ["callback-finishpractice"],
  setup(props, { emit }) {
    // Initial Router
    const route = useRoute();
    const router = useRouter();

    // Initial Data
    const selectedBoxAnswer = ref(0);
    const isDialogAnswer = ref(false);
    const isSendAnswer = ref(false);
    const isCorrectAnswer = ref(false);
    const isFinishPractice = ref(false);
    const isShowContent = ref(false);
    const answerData = ref({});

    const currentSelectAnswerBox = computed(() => {
      let nextAnswer = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      );

      if (nextAnswer.length) {
        return nextAnswer[0].index;
      } else {
        return null;
      }
    });

    const useRandomFakeChoice = computed(() => {
      let setRandom = 3;

      let setFilter = props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      );

      if (setFilter.length) {
        let totalAnswerLength = props.practiceData.choices.length;

        let answer = setFilter[0].answer;
        let currentChoiceIndex = props.practiceData.choices.indexOf(answer);

        let tempRandom = [];

        const reRandom = () => {
          tempRandom = [currentChoiceIndex];

          if (totalAnswerLength <= setRandom) {
            setRandom = totalAnswerLength - 1 || 1;
          }

          try {
            for (let i = 0; i < setRandom - 1; i++) {
              let fakeRandom = Math.floor(Math.random() * totalAnswerLength);

              if (tempRandom.includes(fakeRandom)) {
                reRandom();
                break;
              } else {
                tempRandom.push(fakeRandom);
              }
            }
          } catch (error) {
            reRandom();
            // console.log(error);
          }
        };

        reRandom();

        tempRandom.sort(() => Math.random() - 0.5);

        return tempRandom;
      } else {
        return [];
      }
    });

    const funcSelectedAnswer = (data, index) => {
      // isSendAnswer.value = true;

      props.practiceData.question.filter(
        (x) => x.currentAnswer == "" && x.isAnswer
      )[0].currentAnswer = data;

      props.practiceData.choices.splice(index, 1);
    };

    const funcRemoveAnswer = (data, index) => {
      props.practiceData.choices.push(data);

      props.practiceData.question[index].currentAnswer = "";
    };

    const showQuestionEng = computed(() => {
      let newSetQuestion = props.practiceData.questionEng
        .split(/<s*u>(.*?)<s*\/u>/gm)
        .join(" ");

      return newSetQuestion;
    });

    const allChooseAnswer = computed(() => {
      let finish = props.practiceData.question.filter(
        (x) => x.isAnswer && x.currentAnswer == ""
      );

      if (finish.length) {
        return false;
      } else {
        return true;
      }
    });

    const funcSendAnswer = () => {
      isSendAnswer.value = true;

      let getAllAnswer = props.practiceData.question.filter((x) => x.isAnswer);

      let checkAllAnswer = getAllAnswer.map((x) => {
        if (x.currentAnswer == x.answer) {
          x.isCorrectAnswer = true;
        }
        return x;
      });

      if (
        props.practiceData.currentQuestion + 1 ==
        props.practiceData.totalQuestion
      ) {
        isFinishPractice.value = true;
      }

      isCorrectAnswer.value = checkAllAnswer.every((x) => x.isCorrectAnswer);

      let newCurrentAnswer = props.practiceData.question.map((x) => {
        if (x.isAnswer) {
          return x.currentAnswer;
        } else {
          return x.answer;
        }
      });

      // let newContent = props.practiceData.questionEng;

      // newContent = newContent.split(/<s*u>(.*?)<s*\/u>/);

      emit("callback-sendContent", props.practiceData.questionEng);

      answerData.value = {
        currentAnswer: newCurrentAnswer.join(""),
        answer: props.practiceData.questionEng,
        isCorrectAnswer: isCorrectAnswer.value,
        description: "",
      };
    };

    const funcNextQuestion = () => {
      isSendAnswer.value = false;

      emit("callback-nextquestion");
    };

    return {
      isSendAnswer,
      isFinishPractice,
      isShowContent,
      isCorrectAnswer,
      selectedBoxAnswer,
      useRandomFakeChoice,
      currentSelectAnswerBox,
      allChooseAnswer,
      funcSelectedAnswer,
      funcRemoveAnswer,
      funcSendAnswer,
      funcNextQuestion,

      showQuestionEng,
      isDialogAnswer,
      answerData,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  max-width: 800px;
  width: 100%;
  background-color: #7c451e;
  border-radius: 10px 10px 0px 0px;
  color: #fff;
}

.box-translation {
  height: calc(100vh - 120px);
  width: 100%;
  background-image: url("/images/translation/background-translation-2.png");
  background-position: bottom right;
  background-size: cover;
  background-repeat: no-repeat;
}

.box-content-question {
  max-width: 800px;
  width: 100%;
  min-height: 50vh;
  max-height: fit-content;
  background-color: #d5f3fc;
  background-size: cover;
  background-position: center;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  overflow-x: auto;
}

/* width */
.box-content-question::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-content-question::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-question::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-question::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.box-content-answer {
  max-width: 800px;
  width: 100%;
  min-height: calc(50vh);
  max-height: fit-content;
  background-color: rgba(0, 95, 128, 0.4);
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
}

.box-content-answer::before {
  content: "";
  position: absolute;
  bottom: 13px;
  left: 3px;
  width: 7px;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-answer::after {
  content: "";
  position: absolute;
  bottom: 46px;
  left: 3px;
  width: 7px;
  height: 8px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-th {
  background-color: #99e2f6;
  border-bottom: 3px solid #fff;
  color: #005f80;
  font-weight: bold;
  border-radius: 8px 8px 0px 0px;
}

.box-content-th::before {
  content: "";
  position: absolute;
  top: 3px;
  right: 3px;
  width: 7px;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-th::after {
  content: "";
  position: absolute;
  top: 36px;
  right: 3px;
  width: 7px;
  height: 9px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-writing {
  border: 5px solid #a36112;
  border-radius: 0px 0px 7px 7px;
}

.btn-selected-answer {
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 2px dashed #ad7301;
}

.btn-has-answer {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: linear-gradient(180deg, #ffd058 0%, #ffbb0c 100%);
  box-shadow: 0px 3px 0px #d6af4a;
  border-radius: 7px;
  transition: 0.2s;
  transform: scale(1);
}

.btn-has-answer::before {
  content: "x";
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 10px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  background-color: #7c451e;
  color: white;
  border-radius: 50%;
  box-shadow: 0px 1px 7px rgba(85, 85, 85, 0.521);
}

.btn-has-answer:active {
  transition: 0.2s;
  transform: scale(0.9);
}

.btn-not-selected-answer {
  width: 100px;
  height: 35px;
  border-radius: 7px;
  border: 2px dashed #0082ba;
  background-color: #b9effe;
}

.btn-correct {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #58cc02;
  box-shadow: 0px 3px 0px #58a700;
  border-radius: 7px;
}

.btn-incorrect {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #ff4b4b;
  box-shadow: 0px 3px 0px #ea2b2b;
  border-radius: 7px;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.bg-disable {
  background-color: #ecdcbe;
}
</style>
