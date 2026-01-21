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
          src="/images/vocabulary_main/box-vocabulary-multiple.webp"
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
          class="col row"
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
            }.webp`"
            no-spinner
            no-transition
            @click="
              practiceData.func.sendAnswer(index),
                (practiceData.practice.selectedAnswer = index)
            "
          >
            <div class="full-width no-padding transparent" style="height: 83%">
              <div class="absolute-center full-width f18" align="center">
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
  border: 5px solid #25B8FA;
  box-shadow: 0px 0px 5px 1px #25B8FA;
  border-radius: 20px;
  color: #014DA4;
  padding: 16px 10px;
  margin: 12px 15px;
  cursor: pointer;
  background-color: rgba(121,223,255, 0.5);
  transition: border 0.1s;
  overflow: auto;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
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
  border: 5px solid #FFE552;
  background-color: rgba(255, 236, 130, 0.5);
  box-shadow: 0px 0px 7px 1px #FFEC82;
}

.button-choice.incorrect {
  border: 5px solid #ff4b4b;
  box-shadow: 0px 0px 7px 1px #ff4b4b;
}

.box-total-question {
  max-width: fit-content;
  width: 100%;
  min-width: 100px;
  background-color: #FFE552;
  border: 2px solid #FF772D;
  border-radius: 10px;
  padding: 5px 0px;
  color:#014DA4;
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
  border: 5px solid rgba(255,236,130,1);
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.webp");
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
  text-shadow: rgb(1, 77, 164) 1px 0px 0px, rgb(1, 77, 164) 0.540302px 0.841471px 0px, rgb(1, 77, 164) -0.416147px 0.909297px 0px, rgb(1, 77, 164) -0.989992px 0.14112px 0px, rgb(1, 77, 164) -0.653644px -0.756802px 0px, rgb(1, 77, 164) 0.283662px -0.958924px 0px, rgb(1, 77, 164) 0.96017px -0.279415px 0px;
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
  color: #014DA4;
}

.box-tooltip {
  border-radius: 10px;
  background-color: #FFE552;
  color: #014DA4;
  padding: 5px 10px;
  box-shadow: 0px 0px 5px 1px #01144066;
}
</style>
