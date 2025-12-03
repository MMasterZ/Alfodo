<template>
  <div>
    <q-dialog v-model="isDialogFinish" maximized persistent>
      <!-- กรณีที่เรียนเองและดาวมากกว่า 0 -->
      <q-card
        class="transparent shadow-0 font-mali-m"
        v-if="
          (!syncData.isSync &&
            practiceStore.practiceData.counter == 0 &&
            practiceData.star != 0) ||
          (!syncData.isSync &&
            practiceStore.practiceData.counter != 0 &&
            practiceData.coin >= 0) ||
          (syncData.isSync && practiceData.coin >= 0)
        "
      >
        <q-card-section class="fit row items-center no-padding" align="center">
          <div class="col-12 q-pa-md">
            <div class="col-12 relative-position box-label">
              <q-img
                src="/images/practice_main/label-finish-learning-practice.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="col-12 box-finish-learning-practice row">
              <div class="col-12" style="height: 50px"></div>
              <div class="col-12 q-px-md q-pt-md box-header" align="center">
                <div
                  class="relative-position"
                  style="border-radius: 50%; width: 90px; height: 90px"
                >
                  <div class="absolute-center" style="z-index: 1">
                    <q-img
                      class="relative-position"
                      width="300px"
                      src="/images/icon_main/icon-coin-finish-practice.png"
                      no-spinner
                      no-transition
                    >
                      <div class="full-width no-padding transparent" style="height: 97%">
                        <div class="absolute-center q-pr-xs">
                          <span class="text-coin f36 font-mali-m text-bold">
                            <span v-if="!syncData.isSync">
                              <span>
                                {{ `+${practiceData.quota > 2 ? 0 : practiceData.coin}` }}
                              </span>
                            </span>
                            <span v-if="syncData.isSync">
                              {{ `+${practiceData.coin}` }}
                            </span>
                          </span>
                        </div>
                      </div>
                    </q-img>
                  </div>
                  <div class="absolute-center">
                    <q-img
                      width="1100px"
                      class="animation-light"
                      src="/images/icon_main/icon-finish-animation-light.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div
                    class="absolute-center animation-finish-icon-move"
                    v-for="i in 4"
                    :style="`top: ${[15, 90, 30, 95][i - 1]}%; left: ${
                      [-10, -10, 115, 120][i - 1]
                    }%`"
                  >
                    <q-img
                      :width="`${[35, 30, 30, 35][i - 1]}px`"
                      class="relative-position animation-icon-star"
                      src="/images/icon_main/icon-animate-star.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div
                    class="absolute-center animation-finish-icon-move"
                    v-for="i in 4"
                    :style="`top: ${[60, 90, 15, 50][i - 1]}%; left: ${
                      [-10, 10, 100, 115][i - 1]
                    }%`"
                  >
                    <q-img
                      :width="`${[15, 10, 15, 10][i - 1]}px`"
                      class="relative-position animation-icon-circle"
                      src="/images/icon_main/icon-animate-circle.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <div
                  class="relative-position q-mt-sm q-pb-sm f12"
                  style="z-index: 2; font-size: 10px"
                >
                  <span v-if="!syncData.isSync">
                    {{
                      `จำกัดจำนวนครั้งในการได้รับเหรียญ (${
                        practiceData.quota >= 2 ? 2 : practiceData.quota
                      }/2) ต่อวัน`
                    }}
                  </span>
                  <span v-if="syncData.isSync">
                    {{ `กรุณารอคุณครูเลือกบทเรียนหรือแบบฝึกหัดถัดไป` }}
                  </span>
                </div>

                <div class="box-content" align="left">
                  <div class="box-content-scroll font-mali-m q-pa-sm">
                    <div class="row" v-for="(item, index) in showContentVocabulary">
                      <div class="col q-pa-xs">
                        <div>
                          {{
                            `${item.vocab} ${
                              item.partOfSpeech == "ไม่ระบุบ"
                                ? ""
                                : "(" + item.partOfSpeech + ")"
                            }`
                          }}
                        </div>
                        <div class="q-mt-sm">{{ item.meaning }}</div>
                      </div>
                      <div
                        class="col-12 border-dash q-my-sm"
                        v-if="index + 1 != showContentVocabulary.length"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="self-end col-12 q-pb-md q-py-sm">
                <div
                  class="row justify-center"
                  style="height: 50px"
                  v-if="!syncData.isSync"
                >
                  <div class="col-1 self-center q-mx-sm width-fit">
                    <q-img
                      class="cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-menu.png"
                      @click="$router.replace('/practice/unit')"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col-1 self-center q-mx-sm width-fit">
                    <q-img
                      @click="practiceData.func.restartPractice()"
                      class="cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-restart.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col-1 self-center q-mx-sm width-fit">
                    <q-img
                      v-if="
                        (practiceStore.practiceData.counter == 0 &&
                          practiceData.star != 0) ||
                        (practiceStore.practiceData.counter != 0 &&
                          practiceData.coin >= 0)
                      "
                      class="cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-next-practice.png"
                      no-spinner
                      no-transition
                      @click="$router.replace('/landing')"
                    ></q-img>
                  </div>
                </div>
                <div class="col-12" style="height: 50px" v-else></div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- กรณีที่ดาวเท่ากับ 0 -->
      <q-card
        class="transparent shadow-0 font-mali-m"
        v-if="
          !syncData.isSync &&
          practiceStore.practiceData.counter == 0 &&
          practiceData.star == 0
        "
      >
        <q-card-section class="fit row justify-center no-padding">
          <div class="self-center q-pa-md relative-position">
            <q-img
              width="320px"
              src="/images/dialog_main/dialog-finish-sync-practice.png"
              no-spinner
              no-transition
            >
              <div class="fit transparent absolute-center row">
                <div
                  class="col-12 self-center row justify-center"
                  style="width: 85%; height: 43%; overflow: hidden; margin: auto"
                >
                  <div class="col-12 self-center width-fit">
                    <div class="animation-show-word">
                      <q-img
                        width="250px"
                        class="animate__animated animation-setup"
                        :class="`${
                          animationWordList[
                            Math.floor(Math.random() * animationWordList.length)
                          ]
                        }`"
                        :src="`/images/label_main/${
                          wordingScore[practiceData.star][
                            Math.floor(
                              Math.random() * wordingScore[practiceData.star].length
                            )
                          ]
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>

                <div class="col-12 self-center row justify-center q-pa-sm">
                  <div class="self-center" align="center">
                    <span class="text-stroke f20"> คะแนนไม่ผ่านเกณฑ์ </span>
                  </div>
                </div>

                <div class="self-end col-12 q-pa-md row" v-if="!syncData.isSync">
                  <div class="col-12 self-center row justify-center">
                    <q-img
                      class="q-ma-xs cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-menu.png"
                      @click="$router.replace('/practice/unit')"
                      no-spinner
                      no-transition
                    ></q-img>
                    <q-img
                      class="q-ma-xs cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-restart.png"
                      @click="practiceData.func.restartPractice()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <div class="col-12 row justify-center q-pa-md" v-if="syncData.isSync">
                  <div class="self-center text-content-finish f12 q-pb-sm" align="center">
                    กรุณารอคุณครูเลือก <br />
                    บทเรียนหรือแบบฝึกหัดถัดไป
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { usePracticeStore } from "src/stores/practice";
import { computed, onMounted, ref } from "vue";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    isDialogFinish: {
      type: Boolean,
      default: false,
    },
    practiceData: {
      default: () => {},
    },
    syncData: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
  },
  setup(props) {
    const practiceStore = usePracticeStore();
    const practiceData = ref(props.practiceData);
    const systemStore = useSystemStore();

    const isAnimation = ref(false);
    const wordingScore = [
      ["label-dont-give-up", "label-try-again", "label-keep-going"],
      ["label-good", "label-not-bad", "label-keep-it-up"],
      ["label-fantastic", "label-great", "label-awesome"],
      ["label-brilliant", "label-excellent", "label-magnificent"],
    ];

    const animationWordList = ref([
      "animate__shakeX",
      "animate__swing",
      "animate__heartBeat",
      "animate__shakeY",
      "animate__rubberBand",
      "animate__fadeInDown",
      "animate__fadeInUp",
      "animate__flipInX",
      "animate__lightSpeedInRight",
      "animate__lightSpeedInLeft",
      "animate__jackInTheBox",
      "animate__rollIn",
      "animate__zoomInDown",
      "animate__zoomIn",
      "animate__zoomInLeft",
      "animate__zoomInRight",
      "animate__zoomInUp",
      "animate__slideInDown",
      "animate__slideInUp",
      "animate__slideInLeft",
      "animate__slideInRight",
    ]);

    const showContentVocabulary = computed(() => {
      let temp = [];

      practiceData.value.tempPractice.forEach((res) => {
        let newData;

        newData = {
          vocab: res.vocab,
          meaning: res.meaning,
          incorrect: res.incorrect,
          partOfSpeech: res.partOfSpeech.partOfSpeech,
        };

        temp.push(newData);
      });

      temp.sort((a, b) => (a.vocab > b.vocab ? 1 : -1));

      return temp;
    });

    onMounted(() => {
      if (practiceData.value.star == 0) systemStore.playEffectFail();
      else systemStore.playEffectPass();

      isAnimation.value = true;
    });

    return {
      // data
      isAnimation,
      wordingScore,
      animationWordList,

      // Store
      practiceStore,

      // Computed
      showContentVocabulary,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-label {
  max-width: 450px;
  width: 100%;
  min-width: 300px;
  height: fit-content;
  margin-bottom: -50px;
  z-index: 2;
}

.box-finish-learning-practice {
  position: relative;
  max-width: 450px;
  min-width: 300px;
  width: 100%;
  max-height: 350px;
  min-height: 500px;
  background-color: #fff4d4;
  box-shadow: 0px 0px 0px 5px #744213;
  border-radius: 50px;
  border-bottom: 17px solid #f9a107;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  overflow: hidden;
}

.box-header {
  color: #d38300;
}

.text-header {
  text-shadow: rgb(78, 42, 2) 3px 0px 0px, rgb(78, 42, 2) 2.83487px 0.981584px 0px,
    rgb(78, 42, 2) 2.35766px 1.85511px 0px, rgb(78, 42, 2) 1.62091px 2.52441px 0px,
    rgb(78, 42, 2) 0.705713px 2.91581px 0px, rgb(78, 42, 2) -0.287171px 2.98622px 0px,
    rgb(78, 42, 2) -1.24844px 2.72789px 0px, rgb(78, 42, 2) -2.07227px 2.16926px 0px,
    rgb(78, 42, 2) -2.66798px 1.37182px 0px, rgb(78, 42, 2) -2.96998px 0.42336px 0px,
    rgb(78, 42, 2) -2.94502px -0.571704px 0px, rgb(78, 42, 2) -2.59586px -1.50383px 0px,
    rgb(78, 42, 2) -1.96093px -2.27041px 0px, rgb(78, 42, 2) -1.11013px -2.78704px 0px,
    rgb(78, 42, 2) -0.137119px -2.99686px 0px, rgb(78, 42, 2) 0.850987px -2.87677px 0px,
    rgb(78, 42, 2) 1.74541px -2.43999px 0px, rgb(78, 42, 2) 2.44769px -1.73459px 0px,
    rgb(78, 42, 2) 2.88051px -0.838247px 0px;
}

.box-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 230px;
  background-color: #ffdfa4;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin: auto;
  z-index: 1;
  padding: 3px;
  overflow: hidden;
}

.box-content-scroll {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #4a261b;
}

.box-content-scroll::-webkit-scrollbar {
  width: 3px;
}
.box-content-scroll::-webkit-scrollbar-thumb {
  background-color: #b100d0;
  box-shadow: 0px 3px 2px 0px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
}

.animation-finish-icon-move {
  animation: iconMove 1s linear forwards reverse;
  -webkit-animation: iconMove 1s linear forwards reverse;
}

@keyframes iconMove {
  0% {
    z-index: 1;
  }
  30% {
    z-index: -1;
  }
  to {
    left: 50%;
    top: 50%;
    z-index: -1;
  }
}

.animation-icon-star {
  position: relative;
  animation: iconStar 3s linear infinite alternate;
  -webkit-animation: iconStar 3s linear infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
}

@keyframes iconStar {
  10% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  15% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  20% {
    transform: rotate(-15deg);
    -webkit-transform: rotate(-15deg);
  }
  25% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  30% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }

  70% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
  75% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  80% {
    transform: rotate(-15deg);
    -webkit-transform: rotate(-15deg);
  }
  85% {
    transform: rotate(15deg);
    -webkit-transform: rotate(15deg);
  }
  90% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }
}

.animation-icon-circle {
  position: relative;
  animation: iconCircle 3s linear infinite alternate;
  -webkit-animation: iconCircle 3s linear infinite alternate;
  transform-origin: center;
  transform-box: fill-box;
  transform: translateY(0px);
  -webkit-transform: translateY(0px);
}

@keyframes iconCircle {
  20% {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }
  25% {
    transform: translateY(-5px);
    -webkit-transform: translateY(-5px);
  }
  30% {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }

  60% {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }
  65% {
    transform: translateY(-5px);
    -webkit-transform: translateY(-5px);
  }
  70% {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
  }
}

.animation-light {
  animation: lightRotate 5s linear infinite;
  -webkit-animation: lightRotate 5s linear infinite;
}

@keyframes lightRotate {
  to {
    transform: rotate(360deg);
  }
}

.text-coin {
  color: #ffd211;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.icon-correct {
  color: #2e6c00;
}
.icon-incorrect {
  color: #d6000f;
}

.border-dash {
  border: 1px dashed rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.animation-show-word {
  animation: showWord 0.5s linear forwards;
  opacity: 0;
}

.animation-setup {
  animation-delay: 0.45s;
  animation-duration: 1s;

  -webkit-animation-delay: 0.45s;
  -webkit-animation-duration: 1s;
}

@keyframes showWord {
  0% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
}

.text-stroke {
  color: #fff;
  text-shadow: rgb(78, 42, 2) 2px 0px 0px, rgb(78, 42, 2) 1.75517px 0.958851px 0px,
    rgb(78, 42, 2) 1.0806px 1.68294px 0px, rgb(78, 42, 2) 0.141474px 1.99499px 0px,
    rgb(78, 42, 2) -0.832294px 1.81859px 0px, rgb(78, 42, 2) -1.60229px 1.19694px 0px,
    rgb(78, 42, 2) -1.97998px 0.28224px 0px, rgb(78, 42, 2) -1.87291px -0.701566px 0px,
    rgb(78, 42, 2) -1.30729px -1.5136px 0px, rgb(78, 42, 2) -0.421592px -1.95506px 0px,
    rgb(78, 42, 2) 0.567324px -1.91785px 0px, rgb(78, 42, 2) 1.41734px -1.41108px 0px,
    rgb(78, 42, 2) 1.92034px -0.558831px 0px;
}

.text-content-finish {
  color: #4a261b;
}
</style>
