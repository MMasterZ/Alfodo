<template>
  <div>
    <q-dialog maximized v-model="isDialogFinish" persistent class="z-max">
      <!-- นักเรียน เรียนเอง -->
      <q-card class="transparent shadow-0 font-mali-m" v-if="!syncData.isSync">
        <q-card-section class="fit row justify-center no-padding">
          <!-- #region กรณีที่ทำแบบฝึกหัดไม่ผ่าน และ มีการเข้าทำแบบฝึกหัดน้อยกว่า 1 ครั้ง Score == 0 && Counter == 0 -->
          <div
            class="self-center rounded-borders"
            v-if="practiceData.counter == 0 && practiceData.star == 0"
          >
            <q-img
              width="320px"
              src="/images/dialog_main/dialog-try-again.png"
              no-spinner
              no-transition
            >
              <div
                class="row justify-center items-center no-padding absolute-center transparent"
                style="width: 75%; height: 90%"
              >
                <div class="self-start col-12 row" style="height: 40%">
                  <div class="col fit row self-start" style="overflow: hidden">
                    <div class="self-center col-12">
                      <div
                        class="animate__animated animation-setup animate__bounceIn"
                        align="center"
                      >
                        <div align="center" class="font-luckiest-guy relative-position">
                          <div class="absolute-center fit label-shadow-finish">
                            {{ `${showTextFinish}` }}
                          </div>

                          <div class="label-text-finish">
                            {{ `${showTextFinish}` }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="self-end col-12 q-pa-md row" style="height: 40%">
                  <div
                    class="col-12 self-center row justify-center"
                    v-if="!syncData.isSync"
                  >
                    <q-img
                      class="q-ma-xs cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-menu.png"
                      @click="funcBackToMenu()"
                      no-spinner
                      no-transition
                    ></q-img>
                    <q-img
                      class="q-ma-xs cursor-pointer"
                      width="60px"
                      src="/images/button_main/button-restart.png"
                      @click="funcRestartPractice()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <!-- #endregion -->

          <!-- #region กรณีที่ทำแบบฝึกหัด Star > 0 -->
          <div
            class="self-center relative-position"
            v-else-if="
              practiceData.counter > 0 ||
              (practiceData.counter == 0 && practiceData.star > 0)
            "
          >
            <q-img
              width="320px"
              src="/images/dialog_main/dialog-finish-practice.png"
              no-spinner
              no-transition
            >
              <div class="fit transparent absolute-center row">
                <div
                  class="col-12 self-center row justify-center"
                  style="width: 85%; height: 33%; overflow: hidden; margin: auto"
                >
                  <div class="col-12 self-center q-mt-md">
                    <div
                      class="animate__animated animation-setup animate__bounceIn"
                      align="center"
                    >
                      <div align="center" class="font-luckiest-guy relative-position">
                        <div class="absolute-center fit label-shadow-finish">
                          {{ `${showTextFinish}` }}
                        </div>

                        <div class="label-text-finish">
                          {{ `${showTextFinish}` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 self-center row justify-center" style="height: 17%">
                  <div class="self-center" align="center">
                    <span class="text-stroke f20"> จบแบบฝึกหัด </span>
                    <div class="f14" style="margin-top: -3px">
                      {{ `ระดับ ${practiceStore.level} - บทที่ ${practiceStore.unit}` }}
                    </div>
                  </div>
                </div>
                <div class="col-12 row justify-center" style="height: 50%">
                  <div class="self-center" align="center">
                    <div class="q-pb-sm">
                      <div class="box-coin row justify-center">
                        <div>
                          <q-img
                            width="30px"
                            src="/images/icon_main/icon-coin-winner.png"
                          ></q-img>
                        </div>
                        <div class="q-px-md">
                          <span class="f20 text-stroke">
                            {{ `x${practiceData.coin}` }}
                          </span>
                        </div>
                      </div>
                      <span class="text-black" style="font-size: 10px">{{
                        `จำนวนครั้งในการทำ : ${practiceStore.practiceCurrentCounter}/2`
                      }}</span>
                    </div>
                    <div class="" v-if="!syncData.isSync">
                      <q-img
                        class="q-ma-sm cursor-pointer"
                        @click="funcBackToMenu()"
                        width="60px"
                        src="/images/button_main/button-menu.png"
                        no-spinner
                        no-transition
                      ></q-img>
                      <!-- v-if="practiceStore.practiceCurrentCounter < 2" -->
                      <q-img
                        class="q-ma-xs"
                        @click="
                          practiceStore.practiceData.counter < 2
                            ? funcRestartPractice()
                            : null
                        "
                        width="60px"
                        :class="
                          practiceStore.practiceCurrentCounter < 2
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                        "
                        :src="`/images/button_main/button-restart${
                          practiceStore.practiceCurrentCounter < 2 ? '' : '-disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                      <q-img
                        @click="practiceStore.nextPractice ? funcNextPractice() : null"
                        class="q-ma-sm"
                        width="60px"
                        :class="
                          practiceStore.nextPractice
                            ? 'cursor-pointer'
                            : 'cursor-not-allowed'
                        "
                        :src="`/images/button_main/button-next-practice${
                          practiceStore.nextPractice ? '' : '-disable'
                        }.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </q-img>
            <div class="absolute-center row justify-center full-width" style="top: -5px">
              <div class="col-1 self-end width-fit relative-position" v-for="i in 3">
                <q-img
                  :width="`${i == 2 ? '70px' : '60px'}`"
                  :class="{ 'icon-rotate-1': i == 1, 'icon-rotate-2': i == 3 }"
                  src="/images/icon_main/icon-finish-star-backdrop.png"
                  no-spinner
                  no-transition
                ></q-img>
                <div
                  class="absolute-center"
                  :class="practiceData.star >= i ? `animation-finish-star-${i}` : ''"
                >
                  <q-img
                    v-if="practiceData.star >= i"
                    class="relative-position"
                    :width="`${i == 2 ? '70px' : '60px'}`"
                    :class="{
                      'icon-rotate-1': i == 1,
                      'icon-rotate-2': i == 3,
                    }"
                    src="/images/icon_main/icon-finish-star.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </q-card-section>
      </q-card>

      <!-- คุณครูควบคุม -->
      <q-card class="transparent shadow-0 font-mali-m" v-if="syncData.isSync">
        <q-card-section class="fit row justify-center no-padding">
          <!-- #region กรณีคุณครูควบคุมและได้ดาว -->
          <div class="self-center q-pa-md relative-position" v-if="practiceData.star > 0">
            <q-img
              width="320px"
              src="/images/dialog_main/dialog-finish-practice.png"
              no-spinner
              no-transition
            >
              <div class="fit transparent absolute-center row">
                <div
                  class="col-12 self-center row justify-center"
                  style="width: 85%; height: 33%; overflow: hidden; margin: auto"
                >
                  <div class="col-12 self-center q-mt-md">
                    <div
                      class="animate__animated animation-setup animate__bounceIn"
                      align="center"
                    >
                      <div align="center" class="font-luckiest-guy relative-position">
                        <div class="absolute-center fit label-shadow-finish">
                          {{ `${showTextFinish}` }}
                        </div>

                        <div class="label-text-finish">
                          {{ `${showTextFinish}` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 self-center row justify-center" style="height: 15%">
                  <div class="self-center" align="center">
                    <span class="text-stroke f20"> จบแบบฝึกหัด </span>
                    <div class="f14" style="margin-top: -3px">
                      {{ `ระดับ ${practiceStore.level} - บทที่ ${practiceStore.unit}` }}
                    </div>
                  </div>
                </div>

                <div class="col-12 row justify-center" style="height: 50%">
                  <div class="col-12 self-center row justify-center">
                    <div class="q-pb-md">
                      <div class="box-coin row justify-center">
                        <div>
                          <q-img
                            width="30px"
                            src="/images/icon_main/icon-coin-winner.png"
                          ></q-img>
                        </div>
                        <div class="q-px-md">
                          <span class="f20 text-stroke">
                            {{ `x${practiceData.coin}` }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="self-center text-content-finish f12 q-pa-sm"
                      align="center"
                    >
                      กรุณารอคุณครูเลือก <br />
                      บทเรียนหรือแบบฝึกหัดถัดไป
                    </div>
                  </div>
                </div>
              </div>
            </q-img>

            <div class="absolute-center row justify-center full-width" style="top: 10px">
              <div class="col-1 self-end width-fit relative-position" v-for="i in 3">
                <q-img
                  :width="`${i == 2 ? '70px' : '60px'}`"
                  :class="{ 'icon-rotate-1': i == 1, 'icon-rotate-2': i == 3 }"
                  src="/images/icon_main/icon-finish-star-backdrop.png"
                  no-spinner
                  no-transition
                ></q-img>
                <div
                  class="absolute-center"
                  :class="practiceData.star >= i ? `animation-finish-star-${i}` : ''"
                >
                  <q-img
                    v-if="practiceData.star >= i"
                    class="relative-position"
                    :width="`${i == 2 ? '70px' : '60px'}`"
                    :class="{
                      'icon-rotate-1': i == 1,
                      'icon-rotate-2': i == 3,
                    }"
                    src="/images/icon_main/icon-finish-star.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region กรณีคุณครูควบคุมและไม่ได้ดาว -->
          <div
            class="self-center q-pa-md relative-position"
            v-else-if="practiceData.star == 0"
          >
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
                  <div class="col-12 self-center">
                    <div
                      class="animate__animated animation-setup animate__bounceIn"
                      align="center"
                    >
                      <div align="center" class="font-luckiest-guy relative-position">
                        <div class="absolute-center fit label-shadow-finish">
                          {{ `${showTextFinish}` }}
                        </div>

                        <div class="label-text-finish">
                          {{ `${showTextFinish}` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 self-center row justify-center q-pa-sm">
                  <div class="self-center" align="center">
                    <span class="text-stroke f20"> คะแนนไม่ผ่านเกณฑ์ </span>
                  </div>
                </div>

                <div class="col-12 row justify-center q-pa-md">
                  <div class="self-center text-content-finish f12 q-pb-sm" align="center">
                    กรุณารอคุณครูเลือก <br />
                    บทเรียนหรือแบบฝึกหัดถัดไป
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <!-- #endregion -->
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useRouter } from "vue-router";
export default {
  props: {
    isDialogFinish: {
      type: Boolean,
      default: false,
    },
    practiceData: {
      type: Object,
      default: () => {},
    },
    syncData: {
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
    const courseStore = useCourseStore();

    const $router = useRouter();

    const practiceData = ref(props.practiceData);

    const isAnimation = ref(false);

    const showTextFinish = ref("");

    const wordingScore = ref([
      ["DON'T GIVE UP", "TRY AGAIN", "KEEP GOING"],
      ["GOOD", "NOT BAD", "KEEP IT UP"],
      ["FANTASTIC", "GREAT", "AWESOME"],
      ["BRILLIANT", "EXCELLENT", "MAGNIFICENT"],
    ]);

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

    const funcRestartPractice = () => {
      const studentStore = useStudentStore();
      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }

      practiceData.value.func.restartPractice();
    };

    const funcBackToMenu = () => {
      const studentStore = useStudentStore();
      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }

      $router.replace("/practice/unit");
    };

    const funcNextPractice = () => {
      const studentStore = useStudentStore();
      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = false;

        setTimeout(() => {
          courseStore.isShowDialogLevelExpired = true;
        }, 50);
        return;
      }

      $router.replace("/landing");
    };

    onMounted(() => {
      const systemStore = useSystemStore();

      if (practiceData.value.star == 0) systemStore.playEffectFail();
      else systemStore.playEffectPass();

      showTextFinish.value =
        wordingScore.value[practiceData.value.star][
          Math.floor(Math.random() * wordingScore.value[practiceData.value.star].length)
        ];

      isAnimation.value = true;
    });

    return {
      funcRestartPractice,
      funcBackToMenu,
      funcNextPractice,

      showTextFinish,

      isAnimation,
      animationWordList,
    };
  },
};
</script>

<style lang="scss" scoped>
.icon-rotate-1 {
  transform-origin: bottom;
  transform: rotate(-15deg) translate(10px, 7px);

  // Webkit
  -webkit-transform-origin: bottom;
  -webkit-transform: rotate(-15deg) translate(10px, 7px);
}
.icon-rotate-2 {
  transform-origin: bottom;
  transform: rotate(15deg) translate(-10px, 7px);

  // Webkit
  -webkit-transform-origin: bottom;
  -webkit-transform: rotate(15deg) translate(-10px, 7px);
}

.animation-finish-star-1 {
  animation: animationStar1 0.5s linear forwards 0.5s;
  opacity: 0;
  transform: scale(1.1) translateY(-200%) translateX(-200%);
}

@keyframes animationStar1 {
  40% {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
  90% {
    transform: scale(1.2) translateY(-50%) translateX(-50%);
  }
  to {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
}

.animation-finish-star-2 {
  animation: animationStar2 0.5s linear forwards 0.6s;
  opacity: 0;
  transform: scale(1.1) translateY(-200%) translateX(-50%);
}

@keyframes animationStar2 {
  40% {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
  90% {
    transform: scale(1.2) translateY(-50%) translateX(-50%);
  }
  to {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
}

.animation-finish-star-3 {
  animation: animationStar3 0.5s linear forwards 0.7s;
  opacity: 0;
  transform: scale(1.1) translateY(-200%) translateX(200%);
}

@keyframes animationStar3 {
  40% {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
  90% {
    transform: scale(1.2) translateY(-50%) translateX(-50%);
  }
  to {
    transform: scale(1) translateY(-50%) translateX(-50%);
    opacity: 1;
  }
}

.animation-setup {
  animation-delay: 0.45s;
  animation-duration: 1s;

  -webkit-animation-delay: 0.45s;
  -webkit-animation-duration: 1s;
}

.box-coin {
  width: 150px;
  background-color: #efd080;
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  padding: 7px 10px;
}

.animation-show-word {
  animation: showWord 0.5s linear forwards;
  opacity: 0;
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

.label-text-finish {
  position: relative;
  background: linear-gradient(180deg, #fcef5e 0%, #fca611 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 36px;
}

.label-shadow-finish {
  font-size: 40px;
  letter-spacing: -0.1rem;
  color: transparent;
  text-shadow: rgb(57, 29, 16) 5px 0px 0px, rgb(57, 29, 16) 4.90033px 0.993347px 0px,
    rgb(57, 29, 16) 4.60531px 1.94709px 0px, rgb(57, 29, 16) 4.12668px 2.82321px 0px,
    rgb(57, 29, 16) 3.48353px 3.58678px 0px, rgb(57, 29, 16) 2.70151px 4.20736px 0px,
    rgb(57, 29, 16) 1.81179px 4.6602px 0px, rgb(57, 29, 16) 0.849836px 4.92725px 0px,
    rgb(57, 29, 16) -0.145998px 4.99787px 0px, rgb(57, 29, 16) -1.13601px 4.86924px 0px,
    rgb(57, 29, 16) -2.08073px 4.54649px 0px, rgb(57, 29, 16) -2.94251px 4.04248px 0px,
    rgb(57, 29, 16) -3.68697px 3.37732px 0px, rgb(57, 29, 16) -4.28444px 2.57751px 0px,
    rgb(57, 29, 16) -4.71111px 1.67494px 0px, rgb(57, 29, 16) -4.94996px 0.7056px 0px,
    rgb(57, 29, 16) -4.99147px -0.291871px 0px, rgb(57, 29, 16) -4.83399px -1.27771px 0px,
    rgb(57, 29, 16) -4.48379px -2.2126px 0px, rgb(57, 29, 16) -3.95484px -3.05929px 0px,
    rgb(57, 29, 16) -3.26822px -3.78401px 0px, rgb(57, 29, 16) -2.4513px -4.35788px 0px,
    rgb(57, 29, 16) -1.53666px -4.75801px 0px, rgb(57, 29, 16) -0.560763px -4.96845px 0px,
    rgb(57, 29, 16) 0.437495px -4.98082px 0px, rgb(57, 29, 16) 1.41831px -4.79462px 0px,
    rgb(57, 29, 16) 2.34258px -4.41727px 0px, rgb(57, 29, 16) 3.17346px -3.86382px 0px,
    rgb(57, 29, 16) 3.87783px -3.15633px 0px, rgb(57, 29, 16) 4.4276px -2.32301px 0px,
    rgb(57, 29, 16) 4.80085px -1.39708px 0px, rgb(57, 29, 16) 4.98271px -0.415447px 0px;
}
</style>
