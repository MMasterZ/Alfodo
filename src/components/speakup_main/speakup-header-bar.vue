<template>
  <div>
    <!-- #region Header  -->
    <div
      class="relative-position row z-max"
      :class="$q.platform.is.desktop ? 'q-pa-md' : 'q-pa-sm'"
    >
      <!-- #region Button Back And Pause -->
      <div class="q-mr-sm">
        <q-img
          :width="$q.platform.is.desktop ? '45px' : '40px'"
          src="/images/speakup_main/speakup-button-pause.png"
          class="button-speakup-main"
          :class="eventData.isRecording ? '' : 'active'"
          no-spinner
          no-transition
          @click="eventData.isRecording ? null : funcShowDialogSetting()"
          v-if="isShowChapterContent"
        ></q-img>

        <q-img
          :width="$q.platform.is.desktop ? '45px' : '40px'"
          :src="`/images/speakup_main/speakup-button-back${
            eventData.isRecording ? '-disable' : ''
          }.png`"
          class="button-speakup-main"
          :class="eventData.isRecording ? '' : 'active'"
          no-spinner
          no-transition
          @click="eventData.isRecording ? null : funcBackToMenu()"
          v-else
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Text Content -->
      <div
        class="self-center relative-position"
        :class="$q.platform.is.desktop ? 'f40 q-mx-sm' : 'f16'"
      >
        <div
          class="text-chapter font-fredoka animate__animated animate__fadeIn"
          style="line-height: 0"
          :data-text="eventData.chapterData.name"
          v-if="isShowChapterContent && $q.platform.is.desktop"
        >
          {{ `${eventData.chapterData.name}` }}
        </div>
        <div
          class="text-chapter font-fredoka animate__animated animate__fadeIn"
          style="line-height: 0"
          data-text="SPEAK UP"
          v-if="!isShowChapterContent && !eventData.isShowDialogItemshop"
        >
          {{ `SPEAK UP` }}
        </div>

        <div
          class="text-chapter font-fredoka animate__animated animate__fadeIn"
          style="line-height: 0"
          data-text="SHOP"
          v-if="eventData.isShowDialogItemshop && $q.platform.is.desktop"
        >
          {{ `SHOP` }}
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Information -->
      <div
        class="self-center"
        :class="$q.platform.is.desktop ? 'q-mx-sm' : 'q-ml-xs q-mr-sm'"
        v-if="isShowButtonInformation"
      >
        <q-img
          :width="$q.platform.is.desktop ? '25px' : '20px'"
          src="/images/speakup_main/speakup-icon-infomation.png"
          class="button-speakup-main"
          :class="eventData.isRecording ? '' : 'active'"
          no-spinner
          no-transition
          @click="isShowDialogTutorial = true"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Practice Mode  -->
      <div
        class="self-center row"
        :class="$q.platform.is.desktop ? 'q-mx-sm' : ''"
        v-if="isShowChapterContent"
      >
        <div
          class="relative-position"
          v-for="(itemScore, indexScore) in scoreList"
          :class="$q.platform.is.desktop ? 'q-mx-xs' : ''"
          :style="$q.platform.is.desktop ? '' : 'margin: 0 2px'"
        >
          <q-img
            :width="$q.platform.is.desktop ? '35px' : '25px'"
            class="animate__animated"
            :class="
              eventData.chapterData.score >= itemScore.score
                ? 'animate__fadeOut'
                : ''
            "
            style="animation-duration: 1.5s"
            src="/images/speakup_main/speakup-score-star-empty.png"
            no-spinner
            no-transition
          ></q-img>
          <div class="absolute-center">
            <q-img
              :width="$q.platform.is.desktop ? '35px' : '25px'"
              class="animate__animated animate__bounceIn"
              :class="`animate__delay-${indexScore}s`"
              style="animation-duration: 0.5s"
              src="/images/speakup_main/speakup-score-star.png"
              v-if="eventData.chapterData.score >= itemScore.score"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <q-space></q-space>

      <!-- #region Button Log Mode Practice -->
      <div align="right" class="col self-center" v-if="isShowChapterContent">
        <q-img
          :width="$q.platform.is.desktop ? '45px' : '40px'"
          src="/images/speakup_main/speakup-button-log.png"
          class="button-speakup-main"
          :class="eventData.isRecording ? '' : 'active'"
          no-spinner
          no-transition
          @click="eventData.isRecording ? null : funcShowDialogLogAnswer()"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Shop Mode -->
      <div
        v-if="isShowContentShop"
        class="col self-center row justify-end"
        align="right"
      >
        <div
          class="col-1 self-center relative-position"
          :style="`width: ${$q.platform.is.desktop ? '130px' : '85px'}`"
          :class="$q.platform.is.desktop ? '' : 'q-mr-xs'"
        >
          <q-img
            src="/images/speakup_main/speakup-box-diamond.png"
            no-spinner
            no-transition
          >
            <div class="transparent no-padding fit">
              <div class="absolute-center" style="left: 55%">
                <div
                  class="font-prompt-b text-coin-event"
                  :class="$q.platform.is.desktop ? 'f24' : 'f14'"
                >
                  {{
                    `${
                      eventData.eventCoin > 9999 ? `+9999` : eventData.eventCoin
                    }`
                  }}
                </div>
              </div>
            </div>
          </q-img>

          <div class="absolute-center" style="left: 10px">
            <q-img
              :width="$q.platform.is.desktop ? '70px' : '40px'"
              :src="`${eventData.monetaryImgUrl}`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <div
          class="col-1 relative-position"
          :style="`width: ${$q.platform.is.desktop ? '160px' : '70px'}`"
          align="right"
        >
          <div
            :class="
              $q.platform.is.desktop ? 'absolute-top-right' : 'absolute-center'
            "
          >
            <q-img
              :width="$q.platform.is.desktop ? '140px' : '65px'"
              :src="`/images/speakup_main/speakup-button-shop${
                $q.platform.is.desktop ? '' : '-mobile'
              }.png`"
              no-spinner
              no-transition
              class="button-speakup-main active"
              @click="eventData.isShowDialogItemshop = true"
            ></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>

  <!-- #region Setting Menu -->
  <dialog-setting
    :isDialogSetting="isShowDialogSetting"
    @callback-closeDialog="isShowDialogSetting = false"
    @callback-isBackToCurrentStage="funcBackStage()"
    :currentPage="'speakup'"
    :isSpeakup="true"
  ></dialog-setting>
  <!-- #endregion -->

  <q-dialog v-model="isShowDialogOutOfPractice" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="brx box-dialog-out-of-practice">
          <div class="sub-content">
            <div align="center" class="q-pa-md font-mali-b f20">
              ออกจากการฝึกพูด
            </div>

            <div class="box-text-out-of-practice q-my-sm f16 font-mali-m">
              การฝึกพูดจะไม่ถูกบันทึกคะแนน<br />ยืนยันการออกจากการฝึกพูด ?
            </div>

            <div class="row justify-between q-pt-sm q-pb-xs">
              <div align="center">
                <q-img
                  width="133px"
                  class="cursor-pointer"
                  src="/images/speakup_main/speakup-button-confirm-out-of-practice.png"
                  no-spinner
                  no-transition
                  @click="funcBackStage()"
                ></q-img>
              </div>
              <div align="center">
                <q-img
                  width="133px"
                  class="cursor-pointer"
                  src="/images/speakup_main/speakup-button-cancel-out-of-practice.png"
                  no-spinner
                  no-transition
                  v-close-popup
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <dialog-tutorial
    :isDialogTutorial="isShowDialogTutorial"
    :systemStore="systemStore"
    :typeTutorial="`lobby`"
    :pageName="pageName"
    @callback-closeDialog="isShowDialogTutorial = false"
  ></dialog-tutorial>
</template>

<script>
import dialogTutorial from "components/dialog_main/tutorial.vue";
import dialogSetting from "components/dialog_main/setting-dialog.vue";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import tutorial from "src/js/tutorial.js";
import { useSystemStore } from "src/stores/system";

export default {
  components: {
    dialogTutorial,
    dialogSetting,
  },
  props: {
    eventData: {
      default: () => {},
    },
  },
  emits: ["callback-showDialogLogAnswer"],
  setup(props, { emit }) {
    const router = useRouter();
    const $q = useQuasar();
    const isShowDialogSetting = ref(false);
    const isShowDialogOutOfPractice = ref(false);
    const isShowDialogTutorial = ref(false);

    //  Data
    const tutorialList = ref(tutorial.speakUp);
    const scoreList = ref([
      {
        score: 70,
        isPass: false,
      },
      {
        score: 80,
        isPass: false,
      },
      {
        score: 90,
        isPass: false,
      },
    ]);

    const funcBackToMenu = () => {
      let currentStage = props.eventData.stage;

      if (props.eventData.isShowDialogItemshop) {
        props.eventData.isShowDialogItemshop = false;
        return;
      }

      if (props.eventData.stage == "6") {
        isShowDialogOutOfPractice.value = true;
        return;
      }

      $q.loading.show();

      setTimeout(() => {
        if (currentStage == "6" || currentStage == "5") {
          isShowDialogSetting.value = true;
        } else {
          router.replace("/lobby");
        }

        $q.loading.hide();
      }, 1000);
    };

    const funcShowDialogSetting = () => {
      isShowDialogOutOfPractice.value = true;
    };

    const funcBackStage = () => {
      isShowDialogSetting.value = false;
      isShowDialogOutOfPractice.value = false;
      let currentStage = props.eventData.stage;
      if (currentStage == "6" || currentStage == "5") {
        props.eventData.stage = "4";
      }
    };

    const funcShowDialogLogAnswer = () => {
      emit("callback-showDialogLogAnswer");
    };

    const isShowButtonInformation = computed(() => {
      let isCheck = false;

      if (
        (props.eventData.stage == "3" ||
          props.eventData.stage == "4" ||
          props.eventData.stage == "5" ||
          props.eventData.stage == "6") &&
        !props.eventData.isShowDialogItemshop
      ) {
        isCheck = true;
      }

      return isCheck;
    });

    const isShowChapterContent = computed(() => {
      // console.log("isShowChapterContent: ");
      let isCheck = false;

      if (
        props.eventData.stage == "5" &&
        !props.eventData.isShowDialogItemshop
      ) {
        isCheck = true;
      }

      // console.log("isCheck: ", isCheck);

      return isCheck;
    });

    const isShowContentShop = computed(() => {
      let isCheck = false;

      if (
        props.eventData.stage == "4" &&
        !props.eventData.isShowDialogItemshop
      ) {
        isCheck = true;
      }

      return isCheck;
    });

    const pageName = computed(() => {
      let setName = "";
      let stage = props.eventData.stage;

      if (stage == "3" || stage == "6") {
        setName = "pretest-story";
      } else if (stage == "4") {
        setName = "chapter-menu";
      } else if (stage == "5") {
        setName = "chapter-practice";
      }

      return setName;
    });

    return {
      tutorialList,
      scoreList,

      isShowDialogSetting,
      isShowDialogOutOfPractice,
      isShowDialogTutorial,

      // Function
      funcShowDialogSetting,
      funcBackToMenu,
      funcBackStage,
      funcShowDialogLogAnswer,

      // Computed
      isShowButtonInformation,
      isShowChapterContent,
      isShowContentShop,
      pageName,

      // Store
      systemStore: useSystemStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
.text-chapter {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px,
    rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px,
    rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.text-chapter::before {
  content: attr(data-text);
  position: absolute;
  text-shadow: 0px 4px 0px rgb(75, 30, 10), 3px 4px 0px rgb(75, 30, 10),
    -1px 4px 0px rgb(75, 30, 10);
}

.button-speakup-main {
  width: 100px;
}

.button-speakup-main.size-280 {
  width: 280px !important;
}

.button-speakup-main.size-138 {
  width: 138px !important;
}

.button-speakup-main.size-25 {
  width: 25px !important;
}

.button-speakup-main.active {
  cursor: pointer;
}

.button-speakup-main.active:active {
  transform: scale(0.95);
}

.text-coin-event {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px,
    rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px,
    rgb(0, 0, 0) -0.832294px 1.81859px 0px,
    rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px,
    rgb(0, 0, 0) -1.87291px -0.701566px 0px,
    rgb(0, 0, 0) -1.30729px -1.5136px 0px,
    rgb(0, 0, 0) -0.421592px -1.95506px 0px,
    rgb(0, 0, 0) 0.567324px -1.91785px 0px,
    rgb(0, 0, 0) 1.41734px -1.41108px 0px,
    rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}

.box-dialog-container {
  width: 320px;
  border: 3px solid #4b1e0a;
  border-radius: 10px;
  background-color: #7f4429;
  padding-bottom: 5px;
}

.box-dialog-sub {
  background-color: #ba6f4d;
  border-radius: 7px;
  padding: 10px;
}

.sub-dialog-body {
  background-color: #fff5e7;
  border-radius: 10px;
  padding: 7px;
  color: #4a261b;
}

.box-dialog-out-of-practice {
  width: 320px;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 20px;
  padding: 7px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
}

.box-dialog-out-of-practice .sub-content {
  background-color: #f6f3d3;
  border-radius: 11px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
  padding: 7px;
  color: #4a261b;
}

.box-text-out-of-practice {
  background-color: #efd080;
  border-radius: 5px;
  padding: 10px 15px;
}
</style>
