<template>
  <div class="full-height font-mali-m">
    <!-- ********************** Desktop ********************** -->
    <div
      class="row justify-center full-height"
      v-if="systemStore.platform.desktop"
    >
      <div
        class="col-6 q-pa-md"
        style="max-width: 750px; width: 100%; min-width: 750px"
      >
        <q-img
          src="/images/vocabulary_main/box-vocabulary-matching.png"
          no-transition
          no-spinner
        >
          <div
            class="absolute-center row justify-center transparent"
            style="width: 90%; height: 100%"
          >
            <div class="col-5 self-center q-pa-sm" style="width: 300px">
              <q-img
                style="border-radius: 20px"
                no-transition
                no-spinner
                :src="practiceData.practice.matching.imageUrl"
              ></q-img>
            </div>
            <div class="col self-center q-pa-md">
              <div class="button-question q-pa-sm row justify-center">
                <div class="q-px-sm self-center" align="center">
                  <q-btn
                    @click="
                      practiceData.isSendAnswer
                        ? null
                        : practiceData.func.playSound()
                    "
                    size="10px"
                    round
                  >
                    <q-img
                      src="/images/icon_main/icon-sound-audio.png"
                      no-transition
                      no-spinner
                    ></q-img>
                  </q-btn>
                </div>
                <div class="self-center col" align="center">
                  <span class="f26 text-bold">
                    {{ practiceData.practice.matching.question }}
                  </span>
                </div>
                <div class="q-px-sm"></div>
              </div>
            </div>
          </div>
        </q-img>
      </div>
      <div class="col-12 self-end row justify-center" align="center">
        <div
          class="col-4 q-px-md"
          style="width: 400px"
          v-for="(item, index) in practiceData.practice.matching.choices"
        >
          <q-img
            class="cursor-pointer"
            src="/images/vocabulary_main/base-vocabulary-answer-matching.png"
            no-transition
            no-spinner
          >
            <div class="fit no-padding transparent">
              <div
                class="button-answer-shadow relative-position"
                @click="
                  practiceData.func.sendAnswer(index),
                    (practiceData.practice.selectedAnswer = index)
                "
              >
                <div
                  class="row justify-center button-answer default"
                  :class="
                    practiceData.isSendAnswer
                      ? practiceData.practice.matching.userAnswer == index
                        ? practiceData.isCorrect
                          ? 'correct'
                          : 'incorrect'
                        : 'default'
                      : 'default'
                  "
                >
                  <div class="self-center f24 text-choice text-uppercase">
                    {{ `${item}` }}
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </div>
    </div>

    <!-- ********************** Mobile ********************** -->
    <div
      v-if="systemStore.platform.mobile"
      class="q-px-md q-pt-md box-mobile-main row"
    >
      <div class="col-12">
        <div class="box-question-mobile">
          <q-img
            style="
              border-radius: 20px;
              border: 2px solid #fff;
              background-color: #fff;
            "
            :src="practiceData.practice.matching.imageUrl"
            no-transition
            no-spinner
          ></q-img>
        </div>

        <div class="box-meaning-mobile row">
          <div class="col-1 self-center"></div>
          <div class="col self-center" align="center">
            <span> {{ practiceData.practice.matching.question }} </span>
          </div>
          <div class="col-1 self-center width-fit q-pb-xs">
            <q-btn round flat>
              <q-img
                width="35px"
                src="/images/icon_main/icon-sound-audio.png"
                @click="practiceData.func.playSound()"
                no-transition
                no-spinner
              ></q-img>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="col-12 self-end q-pt-lg">
        <div class="box-choice-mobile row">
          <div
            class="col-12 q-mb-md q-mt-sm"
            v-for="(item, index) in practiceData.practice.matching.choices"
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
              @click="
                practiceData.func.sendAnswer(index),
                  (practiceData.practice.selectedAnswer = index)
              "
              no-transition
              no-spinner
            >
              <div
                class="full-width no-padding transparent"
                style="height: 85%"
              >
                <div class="absolute-center full-width" align="center">
                  <span class="text-choice-mobile">
                    {{ `${item}` }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
// ==================== Desktop ====================
.button-question {
  border: 5px solid #20d4df;
  border-radius: 20px;
  color: #20d4df;
}

.text-time {
  color: #20d4df;
}

.text-choice {
  color: #4a261b;
  font-weight: bold;
  font-family: mali-b;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
}

.button-answer-shadow {
  width: 97.5%;
  height: 100px;
  background-color: #fafefb;
  box-shadow: 0px 10px 0px 5px #c2bcc8;
  border-radius: 50px;
  cursor: pointer;
}

.button-answer {
  position: relative;
  width: 96.5%;
  height: 78px;
  border-radius: 60px;
}

.button-answer.default {
  background: linear-gradient(180deg, #fbb501 5%, #f7ec11 90%);
  box-shadow: 0px 8px 0px 5px #fbb501;
}

.button-answer.correct {
  background: linear-gradient(180deg, #5b9908 5%, #a0ca0e 90%);
  box-shadow: 0px 8px 0px 5px #5b9908;
}

.button-answer.incorrect {
  background: linear-gradient(180deg, #ae2317 5%, #ec6537 90%);
  box-shadow: 0px 8px 0px 5px #ae2317;
}

.button-answer::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  width: 25px;
  height: 7px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 30px 50px 3px 3px;
  transform: rotate(-30deg);
}

// ==================== Mobile ====================

.box-mobile-main {
  max-width: 700px;
  width: 100%;
  min-width: 320px;
  margin: auto;
}

.box-question-mobile {
  max-width: 250px;
  width: 50%;
  min-width: 170px;
  border: 5px solid #55a1ce;
  background-color: #021642;
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.png");
  background-position: center;
  background-size: cover;
  border-radius: 20px;
  padding: 5px;
  margin: 0px auto 15px auto;
}

.box-meaning-mobile {
  max-width: 350px;
  width: 100%;
  min-width: 320px;
  border: 5px solid #55a1ce;
  border-radius: 50px;
  background-color: #021642;
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.png");
  background-position: center;
  background-size: cover;
  padding: 0px 5px;
  color: #fff;
  font-size: clamp(18px, 4.5vw, 22px);
  line-height: 2.5em;

  margin: 15px auto;
}

.box-choice-mobile {
  max-width: 400px;
  width: 70%;
  min-width: 320px;
  margin: auto;
}

.text-choice-mobile {
  font-size: clamp(18px, 3.5vw, 20px);
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
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}
</style>
