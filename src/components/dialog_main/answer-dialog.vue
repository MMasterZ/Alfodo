<template>
  <div>
    <q-dialog maximized persistent :model-value="isDialogAnswer" position="bottom">
      <q-card class="transparent shadow-0 font-mali-m">
        <q-card-section class="fit no-padding">
          <div class="relative-position" style="padding-top: 150px">
            <div
              class="box-correct-answer-container row justify-center"
              :class="practiceData.isCorrect ? 'correct' : 'incorrect'"
            >
              <div
                :class="systemStore.platform.desktop ? 'col-3' : 'col-12'"
                class="col-3 relative-position"
                :style="systemStore.platform.desktop ? 'width: 250px' : 'height:50px'"
                :align="systemStore.platform.desktop ? 'center' : 'left'"
              >
                <div
                  class="self-center row justify-center"
                  :class="systemStore.platform.desktop ? 'monster' : 'monster-mobile'"
                >
                  <q-img
                    no-spinner
                    no-transition
                    :src="`/images/monster_main/${monster}.gif`"
                  ></q-img>
                </div>
              </div>
              <div
                :class="systemStore.platform.desktop ? 'col-1 width-fit' : 'col-12  row'"
                class="q-pa-md"
              >
                <div class="col-1 self-start width-fit">
                  <q-icon
                    size="60px"
                    :class="practiceData.isCorrect ? 'text-green' : 'text-red'"
                    :name="
                      practiceData.isCorrect
                        ? 'far fa-check-circle'
                        : 'far fa-times-circle'
                    "
                  ></q-icon>
                </div>

                <!-- Mobile -->
                <div
                  class="col self-start q-px-md text-answer"
                  v-if="systemStore.platform.mobile"
                >
                  <div v-if="practiceData.isCorrect" class="text-correct text-bold">
                    <div class="f24">ถูกต้อง</div>
                    <div class="q-mt-md q-mb-sm">
                      <span class="text-description">
                        {{ showAnswer.correctAnswer }}
                      </span>
                    </div>
                  </div>
                  <div v-else class="text-bold">
                    <div
                      class="text-incorrect q-mb-md"
                      v-if="showAnswer.userAnswer != ''"
                    >
                      {{ `${showAnswer.userAnswer} เป็นคำตอบที่ผิด` }}
                    </div>
                    <!-- <div class="text-incorrect " v-else>
                    {{ ` เป็นคำตอบที่ผิด` }}
                  </div> -->
                    <div class="q-mb-sm">
                      <span
                        class="text-incorrect text-bold"
                        v-if="!practiceData.isCorrect"
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

              <!-- Desktop -->
              <div class="col q-pa-md q-py-lg f24" v-if="systemStore.platform.desktop">
                <div v-if="practiceData.isCorrect" class="text-correct text-bold">
                  <div class="f24">ถูกต้อง</div>
                  <div class="q-mt-md q-mb-sm">
                    <span class="text-description">
                      {{ showAnswer.correctAnswer }}
                    </span>
                  </div>
                </div>

                <div v-else class="text-bold">
                  <div class="text-incorrect q-mb-md" v-if="showAnswer.userAnswer != ''">
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
              <div
                :align="systemStore.platform.desktop ? 'right' : 'center'"
                class="col-12 q-px-lg q-py-md"
              >
                <q-img
                  no-spinner
                  no-transition
                  @click="practiceData.func.nextQuestion()"
                  class="cursor-pointer"
                  width="150px"
                  src="/images/button_main/button-next.png"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
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
    const practiceData = props.practiceData;

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

      showAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
// ================ Desktop ================
.box-correct-answer-container {
  position: relative;
}

.box-correct-answer-container.correct {
  position: relative;
  background-color: #d7ffb8;
}
.box-correct-answer-container.incorrect {
  position: relative;
  background-color: #ffdfe0;
}

.text-correct {
  color: #58cc02;
}

.text-description {
  color: #2da0d2;
}
.text-incorrect {
  color: #ec0b1b;
}

.monster {
  position: absolute;
  top: -150px;
  left: 50%;
  transform: translateX(-50%);
  width: 250px;
  height: 250px;
  border-radius: 50%;
}

.monster-mobile {
  position: absolute;
  left: 15px;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  transform-origin: bottom;
  transform: translateY(-140px);
}

.text-answer {
  font-size: clamp(16px, 3vw, 24px);
}

// ================ Mobile ================
</style>
