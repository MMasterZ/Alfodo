<template>
  <div
    align="center"
    class="animate__animated animate__zoomIn"
    style="animation-duration: 0.5s"
    v-if="eventData.chapterList.length"
  >
    <!-- #region Chapter Container -->
    <div class="box-chapter-container">
      <div class="box-chapter-sub relative-position">
        <div class="box-chapter-header"></div>

        <!-- #region Chapter Content -->
        <div class="box-chapter-body row justify-center" style="width: 100%">
          <div
            class="col-3 q-pt-md"
            v-for="(item, index) in eventData.chapterList"
            :key="index"
          >
            <div
              class="relative-position button-speakup-main size-70"
              :class="item.isLock ? '' : 'active'"
              align="center"
              @click="funcSelectedChapter(item, index)"
            >
              <q-img
                width="70px"
                :src="`/images/speakup_main/speakup-button-chapter-${item.currentStar}-star.png`"
                no-spinner
                no-transition
                v-if="!item.isLock"
                class="animate__animated animate__fadeIn"
                style="animation-duration: 1s"
              >
                <div
                  class="absolute-center no-padding transparent"
                  style="top: 43%"
                >
                  <div class="font-mali-b f24">
                    {{ index + 1 }}
                  </div>
                </div>
              </q-img>
              <q-img
                width="70px"
                src="/images/speakup_main/speakup-button-chapter-lock.png"
                no-spinner
                no-transition
                class="animate__animated animate__fadeIn"
                style="animation-duration: 1s"
                v-else
              ></q-img>

              <div
                class="absolute-top-right"
                style="top: -17px; right: -14px"
                v-if="item.isSpecialChapter && !item.isLock"
              >
                <div
                  class="relative-position animate__animated animate__bounceIn animate__delay-2s"
                  style="animation-duration: 0.3s"
                >
                  <div
                    style="
                      width: 27px;
                      height: 27px;
                      background-color: #c88f04;
                      border-radius: 50%;
                      top: 61%;
                      left: 44%;
                    "
                    class="absolute-center"
                  ></div>
                  <q-img
                    width="50px"
                    :src="`${eventData.monetaryImgUrl}`"
                    no-spinner
                    no-transition
                  ></q-img>

                  <div class="absolute-center" style="top: 70%">
                    <div class="font-fredoka text-diamond">x3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button extra chapter -->
        <div class="box-chapter-footer" align="center">
          <q-img
            class="button-speakup-main size-300"
            :class="isShowExtraChapter ? 'active' : ''"
            :src="`/images/speakup_main/speakup-button-extra-chapter${
              isShowExtraChapter ? '' : '-disable'
            }.png`"
            no-spinner
            no-transition
            @click="isShowExtraChapter ? funcNextToExtraChapter() : null"
          ></q-img>
        </div>
        <!-- #endregion -->

        <div class="absolute-center" style="width: 336px; top: 0">
          <q-img
            src="/images/speakup_main/speakup-label-chapter.png"
            no-spinner
            no-transition
          >
            <div class="transparent no-padding fit text-title-chapter row">
              <div class="col-12 self-center">
                <div class="font-fredoka f20">
                  {{ `Chapter Select` }}
                </div>
              </div>
              <div class="col-12 self-center font-prompt-sb f16">
                {{ `${eventData.storyData.topicEn}` }}
              </div>
            </div>
          </q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Reward Container -->
    <div class="q-mt-md">
      <div class="box-reward-container">
        <div class="box-reward-sub">
          <div class="row relative-position justify-around">
            <div
              class="col-1"
              style="width: 70px"
              align="center"
              v-for="(itemReward, indexReward) in eventData.progressReward"
              :key="indexReward"
            >
              <div>
                <div
                  :class="
                    numOfSuccess <
                      Math.floor(
                        eventData.chapterList.length * itemReward.percentage
                      ) || itemReward.isRecieved
                      ? ''
                      : 'active'
                  "
                  class="button-speakup-main size-60"
                  @click="
                    numOfSuccess <
                      Math.floor(
                        eventData.chapterList.length * itemReward.percentage
                      ) || itemReward.isRecieved
                      ? null
                      : funcGetReward(itemReward, indexReward)
                  "
                >
                  <q-img
                    width="60px"
                    :src="`/images/speakup_main/speakup-prize-box-${
                      indexReward + 1
                    }${
                      numOfSuccess <
                        Math.floor(
                          eventData.chapterList.length * itemReward.percentage
                        ) || itemReward.isRecieved
                        ? ''
                        : '-collect'
                    }.png`"
                    no-spinner
                    no-transition
                  >
                    <div
                      class="fit no-padding"
                      style="border-radius: 10px"
                      v-if="itemReward.isRecieved"
                    >
                      <div class="absolute-center">
                        <q-img
                          width="40px"
                          src="/images/speakup_main/speakup-icon-get-reward-1.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>

              <div align="center">
                <div v-if="!itemReward.isRecieved">
                  <q-img
                    :src="`/images/speakup_main/${
                      numOfSuccess <
                      Math.floor(
                        eventData.chapterList.length * itemReward.percentage
                      )
                        ? 'speakup-box-reward-lock'
                        : 'speakup-button-collect'
                    }.png`"
                    no-spinner
                    no-transition
                    class="button-speakup-main size-48"
                    :class="
                      numOfSuccess <
                      Math.floor(
                        eventData.chapterList.length * itemReward.percentage
                      )
                        ? ''
                        : 'active animation-button-reward'
                    "
                    @click="
                      numOfSuccess <
                        Math.floor(
                          eventData.chapterList.length * itemReward.percentage
                        ) || itemReward.isRecieved
                        ? null
                        : funcGetReward(itemReward, indexReward)
                    "
                  >
                    <div
                      class="fit transparent no-padding"
                      v-if="
                        numOfSuccess <
                        Math.floor(
                          eventData.chapterList.length * itemReward.percentage
                        )
                      "
                    >
                      <div class="absolute-center row full-width q-px-xs">
                        <div
                          class="col-1 width-fit self-center"
                          style="padding: 3px"
                        >
                          <q-img
                            style="margin-top: -4px"
                            width="8px"
                            :src="`/images/speakup_main/speakup-icon-lock.png`"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="col self-center font-mali-b text-reward f10"
                        >
                          {{
                            `${numOfSuccess}/${Math.floor(
                              eventData.chapterList.length *
                                itemReward.percentage
                            )}`
                          }}
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <div v-else>
                  <q-img
                    width="20px"
                    src="/images/speakup_main/speakup-icon-get-reward-2.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>

  <!-- #region Dialog show success chapter -->
  <q-dialog v-model="isShowDialogSuccessChapter" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div class="row justify-center q-pa-md" align="center">
                  <div class="col-1 q-mx-xs box-icon-star left">
                    <q-img
                      src="/images/speakup_main/speakup-icon-star.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col-1 q-mx-xs box-icon-star center">
                    <q-img
                      src="/images/speakup_main/speakup-icon-star.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col-1 q-mx-xs box-icon-star right">
                    <q-img
                      src="/images/speakup_main/speakup-icon-star.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <div class="font-prompt-m f16 q-mt-xs q-pb-md" align="center">
                  <span>
                    คุณได้ฝึกพูด Chapter นี้จนคล่องแล้ว ไปลอง Chapter
                    อื่นกันเถอะ
                  </span>
                </div>
              </div>
              <div class="box-dialog-footer" align="center">
                <q-img
                  width="100px"
                  src="/images/speakup_main/speakup-button-okay.png"
                  v-close-popup
                  no-spinner
                  no-transition
                  class="cursor-pointer button-speakup-main active"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog get reward -->
  <q-dialog v-model="isShowDialogGetReward" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div align="center" class="font-prompt-m f16 q-mt-md q-pt-xs">
                  <span>คุณได้รับรางวัล</span>
                </div>
                <div align="center" class="row justify-center">
                  <div
                    class="col relative-position animate__animated animate__bounceIn"
                    :class="`animate__delay-${indexShowReward + 1}s`"
                    style="animation-duration: 1s"
                    v-for="(itemShowReward, indexShowReward) in showRewardList"
                    :key="indexShowReward"
                  >
                    <div class="absolute-center">
                      <div
                        class="animate__animated animate__flash animate__infinite"
                        style="animation-duration: 2s"
                        :class="`animate__delay-${indexShowReward + 1}s`"
                      >
                        <q-img
                          width="140px"
                          src="/images/speakup_main/speakup-box-light-reward.png"
                          no-spinner
                          no-transition
                        >
                        </q-img>
                      </div>
                    </div>
                    <div class="q-py-md">
                      <div
                        class="box-item-reward animate__animated animate__pulse animate__infinite"
                        :class="`animate__delay-${indexShowReward + 1}s`"
                        style="animation-duration: 1s"
                      >
                        <q-img
                          width="100%"
                          class=""
                          :src="`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/${itemShowReward.itemName}.${itemShowReward.itemExtension}`"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="box-dialog-footer" align="center">
                <q-img
                  src="/images/speakup_main/speakup-button-claim.png"
                  v-close-popup
                  no-spinner
                  no-transition
                  class="cursor-pointer button-speakup-main active"
                ></q-img>
              </div>
            </div>

            <div class="absolute-center box-label-header">
              <q-img
                width="250px"
                src="/images/speakup_main/speakup-label-reward.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useEventStore } from "src/stores/event";
import { useQuasar } from "quasar";

// #region Mockup Data

let tempRewardList = [
  {
    numOfSuccess: 6,
    isRecieved: false,
    lsit: [],
  },
  {
    numOfSuccess: 9,
    isRecieved: false,
    lsit: [],
  },
  {
    numOfSuccess: 12,
    isRecieved: false,
    lsit: [],
  },
];

// #endregion Mockup Data

export default {
  props: {
    eventData: {
      default: () => {},
    },
  },
  setup(props) {
    const $q = useQuasar();

    const selectedCurrentRewardIndex = ref(0);
    const isShowDialogSuccessChapter = ref(false);
    const isShowDialogGetReward = ref(false);

    // #region ***** Function *****
    // #region Get Speak up list
    const funcGetSpeakUpChapters = async () => {
      $q.loading.show();

      const eventStore = useEventStore();

      const response = await eventStore.getSpeakUpChapters();

      props.eventData.chapterList = response;

      $q.loading.hide();
    };
    // #endregion

    // #region select chapter
    const funcSelectedChapter = (chapter, index) => {
      if (chapter.isLock) {
        return;
      }

      if (chapter.star == 3) {
        isShowDialogSuccessChapter.value = true;
        return;
      }

      $q.loading.show();

      props.eventData.chapterId = chapter.chapterId;
      props.eventData.chapterData = chapter;
      props.eventData.isShowDialogFinishSpeakup = false;
      props.eventData.currentQuestion = 0;

      props.eventData.func.addUserAnswerLogs();

      setTimeout(() => {
        props.eventData.stage = "5";
        $q.loading.hide();
      }, 1000);
    };
    // #endregion

    // #region get reward
    const funcGetReward = async (item, index) => {
      console.log("item: ", item);
      selectedCurrentRewardIndex.value = index;
      const eventStore = useEventStore();

      $q.loading.show();
      props.eventData.progressReward[index].isRecieved = true;
      props.eventData.progressReward.push([]);
      props.eventData.progressReward.pop();
      await eventStore.receiveSpeakUpProgressReward(item);
      $q.loading.hide();
      isShowDialogGetReward.value = true;
    };
    // #endregion

    // #region next to extra chapter
    const funcNextToExtraChapter = () => {
      props.eventData.stage = "6";
    };
    // #endregion

    // #endregion ***** Function *****

    // #region ***** Computed *****
    // #region is show button extra chapter
    const isShowExtraChapter = computed(() => {
      let isCheck = false;

      let findSuccessChapter = props.eventData.chapterList.every((item) => {
        return item.star > 0;
      });

      if (findSuccessChapter) {
        isCheck = true;
      }

      return isCheck;
    });
    // #endregion

    // #region num of success
    const numOfSuccess = computed(() => {
      let currentSuccess = 0;

      let findOfSuccess = props.eventData.chapterList.filter(
        (item) => item.star > 0
      );

      if (findOfSuccess.length) {
        currentSuccess = findOfSuccess.length;
      }

      return currentSuccess;
    });
    // #endregion

    // #region show reward list
    const showRewardList = computed(() => {
      let temp = [];

      let findItemReward =
        props.eventData.progressReward[selectedCurrentRewardIndex.value];

      if (findItemReward) {
        temp = findItemReward.item;
      }

      return temp;
    });
    // #endregion
    // #endregion ***** Computed *****

    onMounted(async () => {
      await funcGetSpeakUpChapters();
    });

    return {
      numOfSuccess,

      // Dialog
      isShowDialogSuccessChapter,
      isShowDialogGetReward,

      // Computed
      isShowExtraChapter,
      showRewardList,

      // Function
      funcNextToExtraChapter,
      funcSelectedChapter,
      funcGetReward,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-chapter-container {
  width: 330px;
  max-height: fit-content;
  min-height: 400px;
  background-color: #dec7a6;
  border: 3px solid #4b1e0a;
  border-radius: 20px;
  padding-bottom: 5px;
}

.box-chapter-container .box-chapter-sub {
  width: 100%;
  height: 100%;
  background-color: #fff5e7;
  border-radius: 20px;
  padding: 7px;
}

.box-chapter-container .box-chapter-sub .box-chapter-header {
  height: 25px;
}

// .box-chapter-container .box-chapter-sub .box-chapter-body {
// }

.box-chapter-container .box-chapter-sub .box-chapter-footer {
  padding-top: 15px;
  padding-bottom: 5px;
}

.box-icon-star {
  width: 40px;
  height: 40px;
}

.box-icon-star.center {
  margin-top: -10px;
}

.box-icon-star.left {
  transform: rotate(-15deg);
}

.box-icon-star.right {
  transform: rotate(15deg);
}

.text-title-chapter {
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
    rgb(74, 38, 27) 1.92034px -0.558831px 0px, rgb(74, 38, 27) 0px 2px 0px,
    rgb(74, 38, 27) 0px 2px 3px;
}

// #region Box Reward
.box-reward-container {
  width: 330px;
  background-color: #7f4429;
  border: 2px solid #4b1e0a;
  border-radius: 15px;
  padding-bottom: 5px;
}

.box-reward-sub {
  background-color: #ba6f4d;
  padding: 7px 15px;
  border-radius: 15px;
}

.box-item-reward {
  width: 90px;
  width: 85px;
  border: 1px solid #4b1e0a;
  border-radius: 9px;
  overflow: hidden;
}

.text-reward {
  color: #fff;
  text-shadow: rgb(105, 105, 105) 1px 0px 0px,
    rgb(105, 105, 105) 0.540302px 0.841471px 0px,
    rgb(105, 105, 105) -0.416147px 0.909297px 0px,
    rgb(105, 105, 105) -0.989992px 0.14112px 0px,
    rgb(105, 105, 105) -0.653644px -0.756802px 0px,
    rgb(105, 105, 105) 0.283662px -0.958924px 0px,
    rgb(105, 105, 105) 0.96017px -0.279415px 0px;
}
// #endregion

.animation-button-reward {
  animation: buttonReward 1s infinite alternate-reverse;
  -webkit-animation: buttonReward 1s infinite alternate-reverse;
  -moz-animation: buttonReward 1s infinite alternate-reverse;
  transform: scale(1);
  -moz-transform: scale(1);
  -webkit-transform: scale(1);
}

@keyframes buttonReward {
  to {
    transform: scale(1.2);
    -moz-transform: scale(1.2);
    -webkit-transform: scale(1.2);
  }
}
</style>
