<template>
  <div class="q-pa-md">
    <!-- Desktop -->
    <div v-if="isDesktop" class="box-spelling-container row">
      <div class="col-4 q-pa-md">
        <div>
          <q-img
            :src="`/images/box_main/box-flashcard-image-question.png`"
            no-spinner
            no-transition
          >
            <div class="full-width transparent" style="height: 95%">
              <div>
                <q-img
                  style="border-radius: 15px; border: 5px solid #fffbfb"
                  :src="practiceData.practice.spell1.imageUrl"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </q-img>
        </div>

        <div class="q-mt-sm">
          <div class="box-meaning-question q-pa-sm" align="center">
            <span class="f24 font-mali-b">
              {{ practiceData.practice.spell1.meaning }}
            </span>
          </div>
        </div>
      </div>

      <div class="col self-center">
        <div
          class="row"
          :class="
            isDesktop
              ? 'justify-center'
              : 'box-choice-main-mobile q-pl-md q-pt-md justify-center'
          "
          align="left"
        >
          <span
            v-for="(item, index) in letterBox"
            :class="isDesktop ? 'q-mx-sm q-mb-md q-my-sm' : 'q-ma-xs '"
            :style="
              isDesktop
                ? 'width: 100px; height: 100px'
                : 'width:60px;height:60px;'
            "
          >
            <q-img
              v-show="!item.isSelected"
              @click="
                practiceData.isSendAnswer
                  ? null
                  : isActiveButton
                  ? null
                  : funcSelectedAnswer(item)
              "
              class="button-active hover"
              src="/images/button_main/button-spell-default.png"
              no-spinner
              no-transition
            >
              <div class="transparent" style="width: 100%; height: 85%">
                <span
                  class="absolute-center font-mali-b"
                  :class="isDesktop ? 'text-answer' : 'text-answer-mobile'"
                >
                  {{ item.letter.toUpperCase() }}
                </span>
              </div>
            </q-img>
          </span>
        </div>
      </div>

      <div class="col-12 q-mt-xl">
        <div class="q-pa-ma row justify-center" align="left">
          <div class="col-1 self-center q-ma-md" style="width: 70px">
            <q-btn
              round
              :class="
                practiceData.isSendAnswer
                  ? 'no-pointer-events'
                  : 'cursor-pointer'
              "
              @click="
                practiceData.isSendAnswer ? null : practiceData.func.playSound()
              "
            >
              <q-img
                width="60px"
                src="/images/icon_main/icon-sound-audio.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
          <div class="col-8 row" align="left" style="width: fit-content">
            <span
              v-for="(item, index) in practiceData.practice.spell1.answerBox"
              class="q-ma-xs"
            >
              <q-img
                @click="
                  practiceData.isSendAnswer
                    ? null
                    : isActiveButton
                    ? null
                    : item.isEmpty
                    ? null
                    : funcRemoveAnswer(item, index)
                "
                width="100px"
                class=""
                :class="item.isEmpty ? '' : ' button-active hover'"
                :src="`/images/button_main/button-spell-${
                  practiceData.isSendAnswer
                    ? item.isEmpty
                      ? 'answer'
                      : practiceData.practice.spell1.vocab[index] == item.letter
                      ? 'correct'
                      : 'incorrect'
                    : !item.isEmpty
                    ? 'default'
                    : 'answer'
                }.png`"
                no-spinner
                no-transition
              >
                <div
                  class="transparent"
                  :style="
                    !item.isEmpty ? 'height:85%' : 'height:100%;opacity: 0.5;'
                  "
                  style="width: 100%"
                >
                  <span class="absolute-center font-mali-b text-answer">
                    {{ item.letter.toUpperCase() }}
                  </span>
                </div>
              </q-img>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div v-else class="box-spelling-container-mobile">
      <div>
        <div class="box-image-question-main-mobile relative-position q-pa-sm">
          <q-img
            style="border-radius: 15px"
            :src="practiceData.practice.spell1.imageUrl"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>

      <div class="q-mt-sm">
        <div class="box-meaning-question-mobile row q-pa-xs" align="center">
          <div class="col-1 self-center" style="width: 40px"></div>
          <div class="col self-center">
            <span class="font-mali-b">
              {{ practiceData.practice.spell1.meaning }}
            </span>
          </div>
          <div class="col-1 self-center" style="width: 40px">
            <q-btn
              round
              flat
              :class="
                practiceData.isSendAnswer
                  ? 'no-pointer-events'
                  : 'cursor-pointer'
              "
              @click="
                practiceData.isSendAnswer ? null : practiceData.func.playSound()
              "
            >
              <q-img
                width="35px"
                src="/images/icon_main/icon-sound-audio.png"
              ></q-img>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="row q-pt-lg q-pb-lg text-left" align="left">
        <span
          v-for="(item, index) in practiceData.practice.spell1.answerBox"
          class="col-1 width-fit q-ma-xs"
        >
          <q-img
            @click="
              practiceData.isSendAnswer
                ? null
                : isActiveButton
                ? null
                : item.isEmpty
                ? null
                : funcRemoveAnswer(item, index)
            "
            style="width: 60px; height: 60px"
            class=""
            :class="item.isEmpty ? '' : ' button-active hover'"
            :src="`/images/button_main/button-spell-${
              practiceData.isSendAnswer
                ? item.isEmpty
                  ? 'answer'
                  : practiceData.practice.spell1.vocab[index] == item.letter
                  ? 'correct'
                  : 'incorrect'
                : !item.isEmpty
                ? 'default'
                : 'answer'
            }.png`"
            no-spinner
            no-transition
          >
            <div
              class="transparent"
              :style="!item.isEmpty ? 'height:85%' : 'height:100%;'"
              style="width: 100%"
            >
              <span class="absolute-center font-mali-b text-answer-mobile">
                {{ item.letter.toUpperCase() }}
              </span>
            </div>
          </q-img>
        </span>
      </div>

      <div class="row q-pt-lg q-pb-lg text-left justify-center" align="left">
        <span
          v-for="(item, index) in letterBox"
          class="col-1 width-fit q-ma-xs"
          align="left"
        >
          <q-img
            v-show="!item.isSelected"
            @click="
              practiceData.isSendAnswer
                ? null
                : isActiveButton
                ? null
                : funcSelectedAnswer(item)
            "
            style="width: 60px; height: 60px"
            class=""
            :class="item.isEmpty ? '' : ' button-active hover'"
            :src="`/images/button_main/button-spell-default.png`"
            no-spinner
            no-transition
          >
            <div
              class="transparent"
              :style="!item.isEmpty ? 'height:85%' : 'height:100%;'"
              style="width: 100%"
            >
              <span class="absolute-center font-mali-b text-answer-mobile">
                {{ item.letter.toUpperCase() }}
              </span>
            </div>
          </q-img>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useQuasar } from "quasar";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // Initialize
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);
    const practiceData = ref(props.practiceData);

    const isActiveButton = ref(false);
    const funcSelectedAnswer = (item) => {
      let setLetterBox = practiceData.value.practice.spell1.letter;
      setLetterBox = setLetterBox.find((x) => x.index == item.index);

      let findEmptyBox = practiceData.value.practice.spell1.answerBox.find(
        (x) => x.isEmpty
      );

      isActiveButton.value = true;

      findEmptyBox.letter = item.letter;
      findEmptyBox.isEmpty = false;
      findEmptyBox.address = item.index;

      setLetterBox.isSelected = true;

      let isCheckSelectedALL =
        practiceData.value.practice.spell1.answerBox.find((x) => x.isEmpty) ||
        null;

      if (!isCheckSelectedALL) {
        let userAnswer = practiceData.value.practice.spell1.answerBox
          .map((x) => x.letter)
          .join("");

        practiceData.value.func.sendAnswer(userAnswer);
      }

      isActiveButton.value = false;
    };

    const funcRemoveAnswer = (item, index) => {
      let setLetterBox = practiceData.value.practice.spell1.letter;

      setLetterBox = setLetterBox.find((x, index) => x.index == item.address);

      practiceData.value.practice.spell1.answerBox[index].isEmpty = true;

      let findHelpLetter = practiceData.value.practice.spell1.letter.find(
        (x) => x.index == index && x.isHelp
      );

      if (findHelpLetter) {
        practiceData.value.practice.spell1.answerBox[index].letter =
          findHelpLetter.letter;
      } else {
        practiceData.value.practice.spell1.answerBox[index].letter = "";
      }

      setLetterBox.isSelected = false;

      delete practiceData.value.practice.spell1.answerBox[index].address;
    };

    const letterBox = computed(() => {
      let setNewLetterBox = practiceData.value.practice.spell1.letter;

      return setNewLetterBox;
    });

    return {
      // Computed
      letterBox,

      funcSelectedAnswer,
      funcRemoveAnswer,

      // Boolean
      isActiveButton,
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-spelling-container {
  width: 1000px;
  margin: auto;
}

.box-spelling-container-mobile {
  max-width: 500px;
  min-width: 300px;
  margin: auto;
}

.box-image-question-main-mobile {
  max-width: 500px;
  width: 50%;
  min-width: 200px;
  margin: auto;
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.png");
  background-size: cover;
  border-radius: 20px;
  border: 5px solid #55a1ce;
  background-color: #062353;
}

.box-meaning-question {
  position: relative;
  background: linear-gradient(180deg, #ffd211 0%, #ffcc31 100%);
  border: 5px solid #4a261b;
  box-sizing: border-box;
  border-radius: 20px;
  text-shadow: rgb(64, 4, 101) 2px 0px 0px,
    rgb(64, 4, 101) 1.75517px 0.958851px 0px,
    rgb(64, 4, 101) 1.0806px 1.68294px 0px,
    rgb(64, 4, 101) 0.141474px 1.99499px 0px,
    rgb(64, 4, 101) -0.832294px 1.81859px 0px,
    rgb(64, 4, 101) -1.60229px 1.19694px 0px,
    rgb(64, 4, 101) -1.97998px 0.28224px 0px,
    rgb(64, 4, 101) -1.87291px -0.701566px 0px,
    rgb(64, 4, 101) -1.30729px -1.5136px 0px,
    rgb(64, 4, 101) -0.421592px -1.95506px 0px,
    rgb(64, 4, 101) 0.567324px -1.91785px 0px,
    rgb(64, 4, 101) 1.41734px -1.41108px 0px,
    rgb(64, 4, 101) 1.92034px -0.558831px 0px;
  color: #fff;
  font-weight: bold;
}

.box-meaning-question-mobile {
  max-width: 400px;
  width: 100%;
  min-width: 200px;
  margin: auto;
  background-image: url("/images/box_main/box-flashcard-image-question-mobile.png");
  background-size: cover;
  border-radius: 50px;
  border: 5px solid #55a1ce;
  background-color: #062353;
  color: #fff;
  font-size: clamp(20px, 3vw, 24px);
}

.box-meaning-question::after {
  content: " ";
  position: absolute;
  left: 7px;
  right: 0;
  top: 7px;
  bottom: 0;
  width: 20px;
  height: 7.69px;
  background: #fff0b7;
  border-radius: 20px 20px 0px 0px;
  transform: rotate(-40deg);
  -webkit-transform: rotate(-40deg);
}

.text-answer {
  font-size: 56px;
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

.text-answer-mobile {
  font-size: clamp(24px, 4vw, 30px);
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

.button-answer-fake {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: rgba(196, 196, 196, 0.5);
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 20px;
}

.text-fake-answer {
  position: relative;
  display: inline-block;
  text-align: center;
  font-size: 56px;
  color: rgba(0, 0, 0, 0.15);
}

.text-fake-answer[data-vocab]::after {
  content: attr(data-vocab);
  position: absolute;
  left: 0;
  top: 0;
  font-size: 56px;
  text-align: center;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.05);
}

.box-choice-main-mobile {
  max-width: 450px;
  width: 100%;
  min-width: 320px;
  margin: auto;
}
</style>
