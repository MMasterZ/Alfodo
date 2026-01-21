<template>
  <div>
    <q-dialog maximized persistent :model-value="isDialogAnswer" position="bottom">
      <q-card class="transparent shadow-0 font-mali-m">
        <q-card-section class="fit no-padding">
          <div class="relative-position" style="padding-top:190px">
            <div
            >
              <div class="relative-position fit q-px-md q-pb-md" :class="{'row justify-center items-center':!isMobile}" v-if="!isMobile">
                <div
                  :class="!isMobile ? 'col-3' : 'col-12'"
                  class="col-3 relative-position"
                  :style="!isMobile ? 'width: 300px' : 'height:40px'"
                  :align="!isMobile ? 'center' : 'left'"
                >
                  <div
                    class="self-center row justify-center"
                    :class="!isMobile ? 'monster' : 'monster-mobile'"
                  >
                    <q-img
                      no-spinner
                      no-transition
                      :src="`/images/monster_main/${monster}.webp`"
                    ></q-img>
                  </div>
                </div>

                <div
                  :class="!isMobile ? 'self-start q-mt-md col-1 width-fit' : 'self-start col-12 row '"
                >
                  <div class="col-1 self-start width-fit q-mt-xs">
                    <q-icon
                      :size="!isMobile ? '60px' : '40px'"
                      :style="`color:#${practiceData.isCorrect ? '58CC02' : 'F60000'};`"
                      :name="
                        practiceData.isCorrect
                          ? 'far fa-check-circle'
                          : 'far fa-times-circle'
                      "
                    ></q-icon>
                  </div>
                </div>

                <!-- Desktop -->
                <div class="col q-px-lg f18" v-if="systemStore.platform.desktop">
                  <div v-if="practiceData.isCorrect" class="text-correct text-bold q-mt-md">
                    <div class="f32">Excellent!</div>
                    <div class="q-mb-xs">
                      <span class="text-description">
                        {{ showAnswer.correctAnswer }}
                      </span>
                    </div>
                  </div>

                  <div v-else class="text-bold">
                    <div class="q-mt-md text-incorrect q-mb-sm" v-if="showAnswer.userAnswer != ''">
                      {{ `${showAnswer.userAnswer} เป็นคำตอบที่ผิด` }}
                    </div>
                    <!-- <div class="text-incorrect " v-else>
                      {{ ` เป็นคำตอบที่ผิด` }}
                    </div> -->
                    <div class="q-mb-sm">
                      <span class="text-incorrect text-bold" v-if="!practiceData.isCorrect"
                        >{{ `คำตอบที่ถูกต้อง คือ ` }}
                      </span>
                      <span class="text-correct text-bold">{{
                        showAnswer.correctAnswer
                      }}</span>
                    </div>
                  </div>
                  <div>
                    <span
                      :class="practiceData.isCorrect ? 'text-description' : 'text-incorrect'"
                      class="text-weight-light"
                      v-html="`  ${practiceData.practice.description}`"
                    >
                    </span>
                  </div>
                </div>
              </div>

               <!-- Mobile -->
              <div v-if="isMobile">
                <div class="box-answer-practice-main mobile">
                  <q-img :src="`/images/box_main/box-dialog-answer-${practiceData.isCorrect ? 'correct' : 'incorrect'}-mobile.webp`" no-spinner no-transition></q-img>
                </div>
                <!-- <div  :class="{'correct':practiceData.isCorrect,'incorrect':!practiceData.isCorrect}">
                  <div class="col self-start q-px-sm text-answer mobile">
                    <div v-if="practiceData.isCorrect" class="text-correct text-bold">
                      <div class="f24">Excellent!</div>
                      <div class="q-mt-sm q-mb-xs">
                        <span class="text-description">
                          {{ showAnswer.correctAnswer }}
                        </span>
                      </div>
                    </div>
                    <div v-else class="text-bold">
                      <div
                        class="text-incorrect q-mb-xs"
                        v-if="showAnswer.userAnswer != ''"
                      >
                        {{ `${showAnswer.userAnswer} เป็นคำตอบที่ผิด` }}
                      </div>
                      <div class="q-mb-xs">
                        <span
                          class="text-incorrect text-bold"
                          v-if="!practiceData.isCorrect"
                          >
                          {{ `คำตอบที่ถูกต้อง คือ ` }}
                        </span>
                        <span class="text-correct text-bold">{{
                          showAnswer.correctAnswer
                        }}</span>
                      </div>
                    </div>
                    <div>
                      <span
                        :class="practiceData.isCorrect ? 'text-description' : 'text-incorrect'"
                        class="text-weight-light"
                        v-html="`  ${practiceData.practice.description}`"
                      >
                      </span>
                    </div>
                  </div>

                  <div
                  :align="systemStore.platform.desktop ? 'right' : 'center'"
                    class="col-12 q-px-md"
                  >
                    <q-img
                      no-spinner
                      no-transition
                      @click="practiceData.func.nextQuestion()"
                      class="cursor-pointer"
                      width="150px"
                      src="/images/button_main/button-next.webp"
                    ></q-img>
                  </div>
                </div> -->
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { computed, onMounted, ref } from "vue";
export default {
  props: {
    isDialogAnswer: {
      type: Boolean,
      default: false,
    },
    practiceData: {
      type: Object,
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
  },

  setup(props) {
    const $q = useQuasar();
    const practiceData = props.practiceData;

    const isMobile = ref($q.platform.is.mobile);

    const monster = computed(() => {
      let monsterPath = "";

      if (props.practiceStore.skill == "Vocabulary") monsterPath = `vocab`;
      else if (props.practiceStore.skill == "Grammar") monsterPath = `grammar`;
      else if (props.practiceStore.skill == "reading") monsterPath = `reading`;
      else if (props.practiceStore.skill == "writing") monsterPath = `writing`;
      else if (props.practiceStore.skill == "phonics") monsterPath = `phonics`;
      else if (props.practiceStore.skill == "listen") monsterPath = `listen`;

      return `${monsterPath}-${practiceData.isCorrect ? "correct" : "incorrect"}`;
    });

    const showAnswer = computed(() => {
      let setData = {
        userAnswer: "",
        correctAnswer: "",
      };

      if (props.practiceStore.skill == "Vocabulary") {
        if (props.practiceStore.practiceType == "multiplechoices") {
          setData.userAnswer =
            practiceData.practice.multiplechoices.choices[
              practiceData.practice.userAnswer
            ] || "";

          setData.correctAnswer =
            practiceData.practice.multiplechoices.choices[
              practiceData.practice.multiplechoices.correctAnswer
            ] || "-";
        } else {
          if (practiceData.practice.type == "Matching") {
            if (
              practiceData.practice.userAnswer != "" ||
              practiceData.practice.userAnswer != null
            ) {
              setData.userAnswer =
                practiceData.practice.matching.choices[
                  practiceData.practice.userAnswer
                ] || "";
            }

            setData.correctAnswer =
              practiceData.practice.matching.choices[
                practiceData.practice.matching.correctAnswer
              ];
          } else if (practiceData.practice.type == "Spell1") {
            setData.userAnswer = practiceData.practice.userAnswer || "";

            setData.correctAnswer = practiceData.practice.spell1.vocab;
          } else if (practiceData.practice.type == "Spell2") {
            setData.userAnswer = practiceData.practice.userAnswer || "";

            setData.correctAnswer = practiceData.practice.spell2.vocab;
          } else if (practiceData.practice.type == "Multiple Choices") {
            setData.userAnswer =
              practiceData.practice.multiplechoices.choices[
                practiceData.practice.userAnswer
              ] || "";

            setData.correctAnswer =
              practiceData.practice.multiplechoices.choices[
                practiceData.practice.multiplechoices.correctAnswer
              ] || "";
          }
        }
      }
      return setData;
    });

    onMounted(() => {
      if (practiceData.isSendAnswer)
        if (practiceData.isCorrect) props.systemStore.playEffectCorrect();
        else props.systemStore.playEffectIncorrect();
    });

    return {
      monster,
      isMobile,
      showAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
// ================ Desktop ================
.box-answer-practice-main{
  position: relative;
  min-height:237px;
  height:100%;
  max-height:fit-content;

  &.mobile{
    width:100%;
    min-height:257px;
    height:100%;
    max-height:fit-content;
  }

  &.correct{
    // background:#58CC02;
    // border-left:4px solid #58CC02;
    // border-right:4px solid #58CC02;
  }

  &.incorrect{
    // background:linear-gradient(180deg, #FFEAEA 0%, #FFB7B7 64.98%);
    // border-left:6px solid #F60000;
    // border-right:6px solid #F60000;
  }
}

.box-correct-answer-container {
  position: relative;
  min-height:237px;
  background-size: 100% 237px;
  background-repeat: no-repeat;
  background-position: bottom;

  &.mobile{
    min-height:257px;
    height:100%;
    max-height:fit-content;
    background-size: 100% 257px !important;
  }

  &.correct{
    background-image: url('/images/box_main/box-dialog-answer-correct.webp');

    &.mobile{
      background-image: url('/images/box_main/box-dialog-answer-correct-mobile.webp');
    }
  }

  &.incorrect{
    background-image: url('/images/box_main/box-dialog-answer-incorrect.webp');

    &.mobile{
      background-image: url('/images/box_main/box-dialog-answer-incorrect-mobile.webp');
    }
  }
}

.text-correct {
  color: #58CC02;
}

.text-description {
  color: #014DA4;
}
.text-incorrect {
  color: #F60000;
}

.monster {
  position: absolute;
  top:-160px;
  left:30px;
  width: 250px;
  border-radius: 50%;
}

.monster-mobile {
  position: absolute;
  bottom:3px;
  left:-8px;
  width: 150px;
  border-radius: 50%;
}

.text-answer {
  font-size: clamp(16px, 3vw, 24px);

  &.mobile{
    height:150px;
    font-size:16px;
  }
}

</style>
