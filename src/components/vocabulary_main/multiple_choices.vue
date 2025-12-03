<template>
  <div class="q-pa-md">
    <!-- ********************** Desktop ********************** -->
    <div
      class="box-multiple-container"
      v-if="systemStore.platform.desktop"
      align="center"
    >
      <div class="relative-position">
        <q-img
          no-spinner
          no-transition
          width="1000px"
          src="/images/vocabulary_main/box-vocabulary-multiple.png"
        >
          <div class="fit row transparent font-mali-b">
            <div
              class="
                col-12
                self-center
                box-question
                row
                justify-center
                q-pt-lg q-px-xl
                f24
              "
              align="left"
            >
              <div
                class="col row q-py-sm"
                v-if="practiceStore.practiceType != 'flashcard'"
              >
                <span class="col width-fit row">
                  <span
                    v-for="(item, index) in practiceData.practice
                      .multiplechoices.questionArr"
                    :class="
                      item.isNewLine ? 'col-12' : item.isExcept ? '' : 'q-ml-sm'
                    "
                  >
                    <span
                      v-if="!item.isNewLine"
                      :class="item.isExtra ? 'text-tooltip cursor-pointer' : ''"
                      v-html="item.vocab"
                    >
                    </span>

                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      class="transparent"
                      :offset="[0, 0]"
                      v-if="item.isExtra"
                    >
                      <div class="box-tooltip">
                        <span class="f16 font-mali-b">{{
                          `${item.meaning} (${item.partOfSpeech})`
                        }}</span>
                      </div>
                    </q-tooltip>
                  </span>
                </span>
              </div>
              <div v-else class="q-pt-md">
                <span
                  v-html="practiceData.practice.multiplechoices.question"
                ></span>
              </div>
            </div>
            <div class="col-12 self-end row justify-center box-content-scroll">
              <div
                v-for="(item, index) in practiceData.practice.multiplechoices
                  .choices"
                class="col-5 relative-position"
                style="width: 350px"
              >
                <div
                  class="button-choice row justify-center f24"
                  :class="
                    practiceData.isSendAnswer
                      ? practiceData.practice.userAnswer === index
                        ? practiceData.isCorrect
                          ? 'correct'
                          : 'incorrect'
                        : ''
                      : ''
                  "
                  @click="
                    practiceData.func.sendAnswer(index),
                      (practiceData.practice.selectedAnswer = index)
                  "
                >
                  <span class="self-center">
                    <span v-html="`${item}`"></span>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-12"></div>
          </div>
        </q-img>

        <div
          class="absolute-center"
          style="top: 0px"
          v-if="
            practiceData.isPractice && practiceStore.practiceType != 'flashcard'
          "
        >
          <div class="box-total-question font-mali-b f20" align="center">
            {{
              `${practiceData.currentQuestionIndex + 1}/${
                practiceData.totalQuestion
              }`
            }}
          </div>
        </div>
      </div>
    </div>

    <!-- ********************** Mobile ********************** -->
    <div class="box-mobile-main" v-if="systemStore.platform.mobile">
      <div
        class="box-question-mobile row justify-center relative-position"
        align="left"
      >
        <div
          class="col row q-pt-md"
          v-if="practiceStore.practiceType != 'flashcard'"
        >
          <span class="col width-fit q-px-sm row">
            <span
              v-for="(item, index) in practiceData.practice.multiplechoices
                .questionArr"
              :class="
                item.isNewLine
                  ? 'col-12'
                  : item.isExcept
                  ? ''
                  : index > 0
                  ? 'q-ml-sm'
                  : ''
              "
              @click="
                item.isMobileOpenTooltip
                  ? (item.isMobileOpenTooltip = false)
                  : (item.isMobileOpenTooltip = true)
              "
              @mouseleave="item.isMobileOpenTooltip = false"
            >
              <span
                v-if="!item.isNewLine"
                :class="item.isExtra ? 'text-tooltip cursor-pointer' : ''"
                v-html="item.vocab"
              >
              </span>

              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                class="transparent"
                :offset="[0, 0]"
                v-if="item.isExtra"
                v-model="item.isMobileOpenTooltip"
                :no-parent-event="true"
              >
                <div class="f16 box-tooltip">
                  <span class="text-no-wrap f16 font-mali-b">
                    {{ `${item.meaning} (${item.partOfSpeech})` }}
                  </span>
                </div>
              </q-tooltip>
            </span>
          </span>
        </div>

        <span
          v-else
          class="self-center"
          v-html="practiceData.practice.multiplechoices.question"
        >
        </span>

        <div
          class="absolute-center"
          style="top: -10px"
          v-if="
            practiceData.isPractice && practiceStore.practiceType != 'flashcard'
          "
        >
          <div class="box-total-question-mobile font-mali-b f20" align="center">
            {{
              `${practiceData.currentQuestionIndex + 1}/${
                practiceData.totalQuestion
              }`
            }}
          </div>
        </div>
      </div>
      <div class="box-choice-mobile">
        <div
          class="q-mt-md"
          v-for="(item, index) in practiceData.practice.multiplechoices.choices"
        >
          <q-img
            :src="`/images/button_main/button-choices-long-${
              practiceData.isSendAnswer
                ? practiceData.practice.userAnswer === index
                  ? practiceData.isCorrect
                    ? 'correct'
                    : 'incorrect'
                  : 'default'
                : 'default'
            }.png`"
            no-spinner
            no-transition
            @click="
              practiceData.func.sendAnswer(index),
                (practiceData.practice.selectedAnswer = index)
            "
          >
            <div class="full-width no-padding transparent" style="height: 83%">
              <div class="absolute-center full-width" align="center">
                <span v-html="item"></span>
              </div>
            </div>
          </q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
export default {
  props: {
    practiceData: {
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
  },

  setup(props) {
    onMounted(() => {
      if (props.practiceStore.practiceType == "flashcard") {
        if (props.practiceData.practice.multiplechoices.questionLang == "en") {
          props.practiceData.func.playSound();
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
// ============== Desktop ==============
.box-multiple-container {
  margin: auto;
}

.text-time {
  color: #031740;
}

.box-question {
  height: 100px;
}

.text-question,
.text-choice {
  color: #21d4da;
}

.button-choice {
  position: relative;
  height: 100px;
  border: 5px solid #20d4df;
  box-shadow: 0px 0px 7px 1px #20d4df;
  border-radius: 20px;
  color: #21d4da;
  padding: 10px;
  margin: 12px 15px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.05);
  transition: border 0.1s;
  overflow: auto;
}

.button-choice::-webkit-scrollbar {
  width: 7px;
}

.button-choice::-webkit-scrollbar-thumb {
  background-color: #fff;
  border: 3px solid rgba(255, 255, 255, 0.01);
  border-radius: 50px;
}

.button-choice::-webkit-scrollbar-track {
  border-radius: 50px;
}

.button-choice:hover {
  border: 5px solid #a5faff;
  box-shadow: 0px 0px 7px 1px #a5faff;
}

.button-choice.correct {
  border: 5px solid #a0ca0e;
  box-shadow: 0px 0px 7px 1px #a0ca0e;
}

.button-choice.incorrect {
  border: 5px solid #ff4b4b;
  box-shadow: 0px 0px 7px 1px #ff4b4b;
}

.box-total-question {
  max-width: fit-content;
  width: 100%;
  min-width: 100px;
  background-color: #21dae2;
  border: 2px solid #014647;
  border-radius: 6px;
  padding: 5px 0px;
}

// ============== Mobile ==============
.box-mobile-main {
  max-width: 500px;
  width: 100%;
  min-width: 320px;
  margin: auto;
}

.box-question-mobile {
  max-width: 450px;
  min-width: 320px;
  min-height: 100px;
  max-height: fit-content;
  width: 100%;
  border: 5px solid #55a1ce;
  background-color: #021642;
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.png");
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  color: #fff;
  font-size: clamp(18px, 4.5vw, 24px);
  margin: 30px auto 15px auto;
  padding: 15px;
}

.box-choice-mobile {
  max-width: 400px;
  width: 90%;
  min-width: 300px;
  margin: 35px auto 0px auto;
  font-size: clamp(16px, 4.5vw, 22px);
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
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-total-question-mobile {
  max-width: fit-content;
  width: 100%;
  min-width: 100px;
  background-color: #021642;
  border: 2px solid #55a1ce;
  color: #fff;
  border-radius: 6px;
  padding: 5px 0px;
}

.box-content-scroll {
  height: 65%;
  overflow: auto;
}

.box-content-scroll::-webkit-scrollbar {
  width: 0px;
}

.text-tooltip {
  color: #21d4da;
}

.box-tooltip {
  border-radius: 10px;
  background-color: #20d4df;
  color: #011440;
  padding: 5px 10px;
  box-shadow: 0px 0px 5px 1px #01144066;
}
</style>
