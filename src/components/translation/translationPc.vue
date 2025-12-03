<template>
  <div :class="{ 'box-translation': $q.platform.is.desktop }">
    <div>
      <div class="col-12">
        <div>
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div>
    </div>

    <div align="center" style="margin-top: -30px" v-if="$q.platform.is.desktop">
      <div class="relative-position box-title q-pa-sm text-white">
        <div>
          <!-- <span class="f20 text-bold" v-html="practiceData.nameEng"></span> -->
          <span class="f20 text-bold">
            {{ practiceData.nameEng }}
            <div class="q-py-xs">
              <span>{{ practiceData.nameTh }}</span>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="row q-pa-md q-mt-md">
      <div
        class="col-12 relative-position box-content-th q-pa-md q-py-lg row justify-center"
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
      <div class="col-12 relative-position box-content-question q-px-lg q-py-md row">
        <div
          class="self-center"
          v-for="(item, index) in practiceData.question"
          align="left"
        >
          <div class="self-center relative-position">
            <div
              class="f18"
              v-if="!item.isAnswer"
              :class="
                item.isSpeicalText
                  ? 'text-black q-mx-xs'
                  : item.isExtraVocab
                  ? 'text-blue-5 q-mx-sm cursor-pointer'
                  : 'q-mx-sm'
              "
              @mouseenter="(isShowTooltip = true), (currentIndexTooltip = index)"
              @mouseleave="(isShowTooltip = false), (currentIndexTooltip = null)"
            >
              <span v-html="item.answer"></span>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[0, 0]"
                class="transparent"
                v-if="item.isExtraVocab && currentIndexTooltip == index"
                v-model="isShowTooltip"
                transition-show="fade"
                transition-hide="fade"
              >
                <div
                  class="q-pa-xs q-px-md"
                  style="background-color: #0082ba; border-radius: 50px"
                >
                  <span class="f16" v-html="item.meaning"> </span>
                </div>
              </q-tooltip>
            </div>
            <div
              v-if="item.isAnswer"
              class="q-my-sm q-mx-sm"
              @click="
                !practiceData.isSendAnswer
                  ? item.currentAnswer != ''
                    ? $emit('callback-removeboxanswer', {
                        data: item.currentAnswer,
                        index: index,
                      })
                    : null
                  : ''
              "
              :class="
                !practiceData.isSendAnswer
                  ? practiceData.currentSelectAnswerBox == index
                    ? 'btn-selected-answer bg-amber-4'
                    : item.currentAnswer != ''
                    ? 'btn-has-answer cursor-pointer'
                    : 'btn-not-selected-answer'
                  : item.isCorrectAnswer
                  ? 'btn-correct'
                  : 'btn-incorrect'
              "
              align="center"
            >
              {{ item.currentAnswer }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 q-py-md q-mt-md" align="center">
        <div
          style="max-width: 1000px; width: 100%; margin-bottom: -5px; z-index: 2"
          class="relative-position"
        >
          <q-img src="/images/translation/header-translation-answer.png"></q-img>
        </div>
        <div>
          <div
            class="box-content-answer relative-position row justify-center items-center"
          >
            <div class="q-px-md q-pt-sm" align="left">
              <q-btn
                push
                class="q-ma-sm"
                :class="
                  practiceData.allChooseAnswer
                    ? 'bg-disable no-pointer-events'
                    : 'bg-amber cursor-pointer'
                "
                v-for="(item, index) in practiceData.choices"
                @click="
                  $emit('callback-selectboxchoice', {
                    data: item,
                    index: index,
                  })
                "
                no-caps
                >{{ item }}</q-btn
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 self-start q-py-md">
        <div align="center">
          <q-img
            v-show="!practiceData.isSendAnswer"
            width="200px"
            :class="practiceData.allChooseAnswer ? 'cursor-pointer' : 'no-pointer-events'"
            @click="practiceData.allChooseAnswer ? $emit('callback-sendanswer') : null"
            :src="`/images/send-answer-btn${
              practiceData.allChooseAnswer ? '' : '-noactive'
            }.png`"
          ></q-img>
        </div>
      </div>
    </div>
    <!--
    <div class="row justify-center">
      <div
        :class="$q.platform.is.desktop ? 'col-6 q-py-md' : 'col-12'"
        class="relative-position self-start"
        align="center"
        >
        <div class="relative-position" style="z-index: 2" v-if="$q.platform.is.desktop">
          <q-img src="/images/translation/header-question.png"></q-img>
          <div class="q-px-md">
            <div
              style="
                background-color: #d5f3fc;
                height: 35px;
                max-width: 800px;
                width: 100%;
                margin-top: -8%;
              "
            ></div>
          </div>
        </div>
        <div v-else>
          <div
            :mode="$q.platform.is.desktop ? 'pc' : 'mobile'"
            class="relative-position box-content-th q-pa-md row justify-center"
            align="left"
          >
            <span class="f16" v-html="practiceData.questionTh"></span>
          </div>
        </div>

      </div>
      <div class="col-1" style="width: 50px" v-if="$q.platform.is.desktop"></div>

      <div
        :class="$q.platform.is.desktop ? 'col-5 q-py-md q-mt-lg' : 'col-12 q-pb-md'"
        align="center"
      >
        <div class="q-px-md">

        </div>
      </div>

      <div class="col-12 self-start q-py-md">
        <div align="center">
          <q-img
            v-show="!practiceData.isSendAnswer"
            width="200px"
            :class="practiceData.allChooseAnswer ? 'cursor-pointer' : 'no-pointer-events'"
            @click="practiceData.allChooseAnswer ? $emit('callback-sendanswer') : null"
            :src="
              `/images/send-answer-btn${
                practiceData.allChooseAnswer ? '' : '-noactive'
              }.png`
            "
          ></q-img>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import headerBar from "../../components/header-time-progress.vue";
import { ref } from "vue";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
  },
  emits: ["callback-finishpractice", "callback-sendanswer", "callback-selectboxchoice"],
  setup(props, { emit }) {
    const isShowTooltip = ref(false);
    const currentIndexTooltip = ref("");
    // Initial Router
    // const useRandomFakeChoice = computed(() => {
    //   let setRandom = 3;
    //   let setFilter = props.practiceData.question.filter(
    //     (x) => x.currentAnswer == "" && x.isAnswer
    //   );
    //   if (setFilter.length) {
    //     let totalAnswerLength = props.practiceData.choices.length;
    //     let answer = setFilter[0].answer;
    //     let currentChoiceIndex = props.practiceData.choices.indexOf(answer);
    //     let tempRandom = [];
    //     const reRandom = () => {
    //       tempRandom = [currentChoiceIndex];
    //       if (totalAnswerLength <= setRandom) {
    //         setRandom = totalAnswerLength - 1 || 1;
    //       }
    //       try {
    //         for (let i = 0; i < setRandom - 1; i++) {
    //           let fakeRandom = Math.floor(Math.random() * totalAnswerLength);
    //           if (tempRandom.includes(fakeRandom)) {
    //             reRandom();
    //             break;
    //           } else {
    //             tempRandom.push(fakeRandom);
    //           }
    //         }
    //       } catch (error) {
    //         reRandom();
    //         console.log(error);
    //       }
    //     };
    //     reRandom();
    //     tempRandom.sort(() => Math.random() - 0.5);
    //     return tempRandom;
    //   } else {
    //     return [];
    //   }
    // });

    return {
      isShowTooltip,
      currentIndexTooltip,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-title {
  width: 450px;
  background-image: url("/images/translation/label-title.png");
  background-size: cover;
  background-position: center;
  max-height: 500px;
  min-height: fit-content;
  border-radius: 10px;
  box-shadow: 5px 7px 0px 2px #542a0c;
}

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
  max-width: 1000px;
  width: 100%;
  min-height: 180px;
  max-height: fit-content;
  background-color: #d5f3fc;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border: 3px solid #fff;
  margin: auto;
  overflow-x: auto;
  border-radius: 0px 0px 7px 7px;
}

// .box-content-question[mode="mobile"] {
//   height: fit-content;
//   border: 2px solid#fff;
//   border-radius: 0px;
// }

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
  max-width: 990px;
  width: 97%;
  min-height: 150px;
  max-height: fit-content;
  background-color: rgba(21, 166, 216, 0.25);
  border-radius: 0px 0px 7px 7px;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
  border-top-color: transparent;
  margin: -30px auto auto auto;
  z-index: 1;
}

// .box-content-answer[mode="mobile"] {
//   max-width: 800px;
//   width: 100%;
//   height: fit-content;
//   background-color: #3c9ebe;
//   box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
//   border: 3px solid #fff;
// }

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
  max-width: 1000px;
  width: 100%;
  background-color: #99e2f6;
  border-bottom: 3px solid #fff;
  color: #005f80;
  // font-weight: bold;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  border: 3px solid #fff;
  border-bottom-color: transparent;
  margin: auto auto -10px auto;
}

// .box-content-th[mode="mobile"] {
//   max-width: 800px;
//   width: 100%;
//   background-color: #3c9ebe;
//   border: 2px solid #fff;
//   border-bottom-color: transparent;
//   color: #fff;
//   border-radius: 10px 10px 0px 0px;
// }

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
  text-align: center;
  padding-top: 1px;
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

.text-underline {
  text-decoration: underline;
}
</style>
