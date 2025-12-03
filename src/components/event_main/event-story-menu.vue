<template>
  <div
    class="animate__animated animate__bounceInUp"
    style="animation-duration: 0.7s"
  >
    <!-- #region Desktop -->
    <div
      class="absolute-center brx"
      style="width: 30.06%"
      v-if="eventData.platform.desktop"
      align="center"
    >
      <div class="relative-position brx">
        <!-- #region Chapter Menu -->
        <q-img
          no-spinner
          no-transition
          src="/images/event_main/event-box-chapter-story.png"
        >
          <div class="fit row no-padding transparent brx">
            <!-- #region Unit Content -->
            <div
              class="box-unit-scroller absolute-center brx"
              style="top: 44%; padding: 0%"
            >
              <div class="row brx" style="padding: 0% 4%">
                <div
                  class="col-3 row justify-center items-center"
                  v-for="(
                    itemPracticeList, indexPracticeList
                  ) in eventData.practiceList"
                >
                  <!-- Show practice locked -->
                  <div class="col-12 self-center" style="padding: 7%">
                    <q-img
                      no-spinner
                      no-transition
                      v-if="
                        itemPracticeList.isLocked && !itemPracticeList.isCurrent
                      "
                      class="cursor-not-allowed"
                      src="/images/button_main/button-event-chapter-lock.png"
                    ></q-img>
                    <!-- Show practice  -->
                    <q-img
                      @click="eventData.func.selectedUnit(itemPracticeList)"
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      src="/images/button_main/button-event-chapter-star-0.png"
                      v-else-if="
                        (!itemPracticeList.isLocked &&
                          !itemPracticeList.isPassed) ||
                        (itemPracticeList.isLocked &&
                          itemPracticeList.isCurrent)
                      "
                    >
                      <div class="fit no-padding transparent">
                        <div
                          style="
                            width: 90%;
                            height: 80%;
                            top: 42%;
                            font-size: max(24px, min(40px, 2.5vw));
                          "
                          class="absolute-center row justify-center items-center"
                        >
                          <div class="font-mali-b text-white">
                            {{ itemPracticeList.unit }}
                          </div>
                        </div>
                      </div>
                    </q-img>
                    <!-- Show practice passed and show star -->
                    <q-img
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      :src="`/images/button_main/button-event-chapter-star-${itemPracticeList.star}.png`"
                      v-else-if="
                        !itemPracticeList.isLocked &&
                        itemPracticeList.isPassed &&
                        itemPracticeList.star > 0
                      "
                      @click="eventData.func.selectedUnit(itemPracticeList)"
                    >
                      <div class="fit no-padding transparent">
                        <div
                          style="
                            width: 90%;
                            height: 80%;
                            top: 42%;
                            font-size: max(24px, min(40px, 2.5vw));
                          "
                          class="absolute-center row justify-center items-center"
                        >
                          <span class="font-mali-b text-white">{{
                            itemPracticeList.unit
                          }}</span>
                        </div>
                      </div>
                    </q-img>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Button Extra Chapter -->
            <div
              style="
                width: 88.54%;
                left: 50%;
                bottom: 5%;
                transform: translate(-50%, 0%);
              "
              class="absolute-bottom brx"
            >
              <q-img
                no-spinner
                no-transition
                src="/images/event_main/event-button-extra-chapter-story.png"
                class="cursor-not-allowed"
              ></q-img>
            </div>
            <!-- #endregion -->
          </div>
        </q-img>
        <!-- #endregion -->

        <!-- #region Label Chapter Select -->
        <div class="absolute-center brx" style="width: 58.33%; top: 0">
          <q-img
            no-spinner
            no-transition
            width="100%"
            src="/images/event_main/event-label-chapter-story.png"
          ></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Progress reward item -->
        <div style="margin-top: 5%">
          <q-img src="/images/event_main/event-box-progress-reward.png">
            <div class="fit row no-padding transparent brx">
              <!-- #region  -->

              <div
                class="self-end col-12 brx"
                style="width: 100%; margin: 2.5% auto; padding: 1.5%"
              >
                <div class="progress-bar relative-position">
                  <div class="progress-value">
                    <div class="progress-animation"></div>
                    <div class="progress-light"></div>
                  </div>

                  <div class="brx relative-position fit">
                    <div
                      style="width: 13.08%; margin: auto"
                      v-for="(item, indexItemList) in eventStore.eventRewards"
                      :key="indexItemList"
                      class="absolute brx"
                      :style="`left: ${item[0].progressExpect}%; transform: translate(-${item[0].progressExpect}%,-130%)`"
                    >
                      <div class="relative-position brx">
                        <q-img
                          src="/images/event_main/event-box-reward-itme.png"
                        >
                          <div
                            class="absolute-center fit transparent"
                            style="padding: 10%"
                          >
                            <q-img
                              :class="
                                eventData.progress >= item[0].progressExpect &&
                                !funcIsClaimedRewards(indexItemList)
                                  ? 'animation-item-reward'
                                  : ''
                              "
                              style="width: 100%"
                              :style="`animation-delay:0.${Math.floor(
                                Math.random() * 2
                              )}s}`"
                              :src="eventStore.eventDataInfo.giftBoxUrl"
                            >
                            </q-img>
                          </div>
                        </q-img>

                        <div
                          :style="
                            eventData.progress >= item[0].progressExpect
                              ? 'width:121%;'
                              : 'width: 40%;'
                          "
                          class="absolute-center brx"
                          style="left: 50%; top: 127%"
                          :class="
                            eventData.progress >= item[0].progressExpect &&
                            !funcIsClaimedRewards(indexItemList)
                              ? 'cursor-pointer '
                              : ''
                          "
                          align="center"
                          @click="
                            eventData.progress >= item[0].progressExpect &&
                            !funcIsClaimedRewards(indexItemList)
                              ? funcShowDialogRewards(indexItemList)
                              : null
                          "
                        >
                          <q-img
                            width="100%"
                            :src="
                              eventData.progress >= item[0].progressExpect
                                ? `/images/event_main/event-button-get-item-collect.png`
                                : `/images/event_main/event-icon-collect-lock.png`
                            "
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->

    <!-- <div class="brx"></div> -->

    <div
      class="q-pa-md q-py-md"
      align="center"
      v-if="eventData.platform.mobile"
    >
      <div class="relative-position box-menu-container mobile">
        <q-img
          no-spinner
          no-transition
          src="/images/box_main/box-event-chapter-story.png"
          crossorigin
        >
          <div
            class="transparent relative-position no-padding"
            style="width: 100%; height: 100%"
          >
            <div class="q-mt-md" style="width: 100%; height: 20px"></div>
            <div class="box-unit-scroller-mobile">
              <div class="row">
                <div
                  class="col-3 q-pa-xs row justify-center items-center"
                  v-for="(
                    itemPracticeList, indexPracticeList
                  ) in eventData.practiceList"
                >
                  <!-- Show practice locked -->
                  <q-img
                    no-spinner
                    no-transition
                    v-show="
                      itemPracticeList.isLocked && !itemPracticeList.isCurrent
                    "
                    class="cursor-inherit"
                    width="100%"
                    src="/images/button_main/button-event-chapter-lock.png"
                  ></q-img>
                  <!-- Show practice  -->
                  <q-img
                    @click="eventData.func.selectedUnit(itemPracticeList)"
                    no-spinner
                    no-transition
                    width="100%"
                    class="cursor-pointer"
                    src="/images/button_main/button-event-chapter-star-0.png"
                    v-show="
                      (!itemPracticeList.isLocked &&
                        !itemPracticeList.isPassed) ||
                      (itemPracticeList.isLocked && itemPracticeList.isCurrent)
                    "
                  >
                    <div class="fit no-padding transparent">
                      <div
                        style="width: 90%; height: 80%; top: 42%"
                        class="absolute-center row justify-center items-center"
                      >
                        <span class="font-mali-b f36 text-white">{{
                          itemPracticeList.unit
                        }}</span>
                      </div>
                    </div>
                  </q-img>
                  <!-- Show practice passed and show star -->
                  <q-img
                    no-spinner
                    no-transition
                    width="100%"
                    class="cursor-pointer"
                    :src="`/images/button_main/button-event-chapter-star-${itemPracticeList.star}.png`"
                    v-show="
                      !itemPracticeList.isLocked &&
                      itemPracticeList.isPassed &&
                      itemPracticeList.star > 0
                    "
                    @click="eventData.func.selectedUnit(itemPracticeList)"
                  >
                    <div class="fit no-padding transparent">
                      <div
                        style="width: 90%; height: 80%; top: 42%"
                        class="absolute-center row justify-center items-center"
                      >
                        <span class="font-mali-b f36 text-white">{{
                          itemPracticeList.unit
                        }}</span>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
            <div style="width: 85%">
              <q-img
                no-spinner
                no-transition
                src="/images/button_main/button-event-extra-chapter-story.png"
              ></q-img>
            </div>
          </div>
        </q-img>

        <!-- #region Collect Item -->
        <div align="center" class="q-mt-md">
          <div class="box-event-collect-item mobile">
            <div class="sub-collect-item row">
              <div class="col-12">
                <div style="height: 80px" class="q-px-md"></div>
              </div>
              <div class="col-12" style="padding-bottom: 25px">
                <div class="q-px-md q-pb-xs">
                  <div class="progress-bar relative-position" align="left">
                    <div
                      class="progress-value relative-position"
                      :style="`width: ${eventData.progress}%`"
                    >
                      <div class="progress-animation"></div>
                      <div class="progress-light"></div>
                    </div>

                    <div>
                      <div
                        v-for="(item, indexItemList) in eventStore.eventRewards"
                        :key="indexItemList"
                        class="item-collect mobile absolute-center"
                        :style="`left: ${item[0].progressExpect}%; transform: translate(-${item[0].progressExpect}%, -50%)`"
                        align="center"
                        :class="
                          eventData.progress >= item[0].progressExpect &&
                          !funcIsClaimedRewards(indexItemList)
                            ? 'cursor-pointer '
                            : ''
                        "
                        @click="
                          eventData.progress >= item[0].progressExpect &&
                          !funcIsClaimedRewards(indexItemList)
                            ? funcShowDialogRewards(indexItemList)
                            : null
                        "
                      >
                        <div
                          class="relative-position q-pa-sm"
                          style="width: 100%"
                        >
                          <q-img
                            :class="
                              eventData.progress >= item[0].progressExpect &&
                              !funcIsClaimedRewards(indexItemList)
                                ? 'animation-item-reward'
                                : ''
                            "
                            :src="eventStore.eventDataInfo.giftBoxUrl"
                          ></q-img>

                          <div
                            class="absolute-center backdrop-item-reward"
                            v-if="eventData.progress < item[0].progressExpect"
                          >
                            <q-img
                              class="absolute-center"
                              width="40%"
                              src="/images/icon_main/icon-event-collect-lock.png"
                            ></q-img>
                          </div>

                          <div
                            class="absolute-center backdrop-item-reward"
                            v-if="funcIsClaimedRewards(indexItemList)"
                          >
                            <div
                              style="
                                width: 25px;
                                height: 25px;
                                background-color: #4bc700;
                                border-radius: 50%;
                                border: 1px solid #4bc700;
                                padding: 3px;
                              "
                              class="absolute-center row justify-center items-center"
                            >
                              <q-icon
                                name="fas fa-check"
                                size="14px"
                                class="text-white"
                              ></q-icon>
                            </div>
                          </div>
                        </div>
                        <div
                          class="absolute-center row"
                          style="width: 50px; top: 86px"
                        >
                          <div class="col relative-position">
                            <div
                              style="
                                background-color: #4a261b;
                                width: 3px;
                                height: 3px;
                                border-radius: 50%;
                              "
                            ></div>
                            <q-img
                              no-spinner
                              no-transition
                              width="13px"
                              style="margin-bottom: 3px"
                              src="/images/icon_main/icon-event-star.png"
                            ></q-img>
                          </div>
                          <div class="col self-end" align="left">
                            <span class="text-reward-star font-mali-b f14"
                              >10</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <div class="absolute-center" style="top: 0">
          <q-img
            no-spinner
            no-transition
            width="226px"
            src="/images/label_main/label-event-chapter-story-mobile.png"
          ></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Dialog Collect Reward -->
    <q-dialog maximized v-model="isShowDialogReward" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-dialog-reward">
            <div class="sub">
              <div align="center" class="q-my-sm q-mt-md">
                <span class="title-choose-reward f24 font-mali-b"
                  >เลือกของรางวัล</span
                >
              </div>
              <div class="q-pa-sm">
                <div class="row">
                  <div
                    class="col-6 q-pa-sm"
                    v-for="(itemReward, indexReward) in eventStore.eventRewards[
                      selectedCollectRewardIndex
                    ]"
                    :key="indexReward"
                  >
                    <div
                      class="bg-white cursor-pointer item-reward"
                      :class="
                        selecteItemReward == indexReward ? 'selected' : ''
                      "
                      @click="selecteItemReward = indexReward"
                    >
                      <q-img
                        no-spinner
                        no-transition
                        :src="itemReward.pathStoreUrl"
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row justify-center q-pa-md">
                <div class="q-mx-sm">
                  <q-img
                    width="80px"
                    src="/images/button_main/button-event-close.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    v-close-popup
                  ></q-img>
                </div>
                <div class="q-mx-sm">
                  <q-img
                    width="120px"
                    :src="`/images/button_main/button-event-confirm${
                      selecteItemReward == null ? '-disable' : ''
                    }.png`"
                    no-spinner
                    no-transition
                    :class="selecteItemReward != null ? 'cursor-pointer' : ''"
                    @click="funcCollectReward()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- #endregion -->
  </div>
</template>

<script>
import { useEventStore } from "src/stores/event";
import { ref } from "@vue/reactivity";
export default {
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // Store
    const eventStore = useEventStore();

    // Data
    const selectedCollectRewardIndex = ref(null);
    const selecteItemReward = ref(null);

    // Dialog
    const isShowDialogReward = ref(false);

    // #region Function about Reward
    // Show Dialog Reward
    const funcShowDialogRewards = (index) => {
      console.log(index);
      return;
      selectedCollectRewardIndex.value = index;
      selecteItemReward.value = null;
      isShowDialogReward.value = true;
    };
    // Collect Reward
    const funcCollectReward = async () => {
      props.eventData.isLoading = true;

      let findItem =
        eventStore.eventRewards[selectedCollectRewardIndex.value][
          selecteItemReward.value
        ];

      await eventStore.collectReward(findItem);

      isShowDialogReward.value = false;

      props.eventData.isLoading = false;
    };
    // Check Reward is Claimed
    const funcIsClaimedRewards = (index) => {
      let findRewardIsClaimed = eventStore.eventRewards[index].find(
        (item) => item.isClaimed == true
      );

      if (findRewardIsClaimed) {
        return true;
      } else {
        return false;
      }
    };
    // #endregion

    return {
      // Store
      eventStore,

      // Data
      selectedCollectRewardIndex,
      selecteItemReward,

      // Function
      funcShowDialogRewards,
      funcCollectReward,
      funcIsClaimedRewards,

      // Dialog
      isShowDialogReward,
    };
  },
};
</script>

<style lang="scss" scoped>
// #region Container
.box-menu-container {
  position: relative;
}
// #endregion

// #region Desktop

// #endregion

// #region Mobile
.box-menu-container.mobile {
  max-width: 450px;
  width: 100%;
  min-width: 330px;
}
// #endregion

.box-unit-scroller {
  width: 100%;
  height: 65%;
  overflow-y: auto;
}

.box-unit-scroller-mobile {
  width: 96%;
  height: 66%;
  overflow-y: auto;
}

.box-event-collect-item {
  width: 480px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 15px;
  padding-bottom: 3px;
}

.box-event-collect-item.mobile {
  max-width: 4500px;
  width: 100%;
  min-width: 330px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 15px;
  padding-bottom: 3px;
}

.box-event-collect-item .sub-collect-item {
  width: 100%;
  height: 95%;
  background-color: #ba6f4d;
  border-radius: 15px;
}

.progress-bar {
  width: 100%;
  height: 7px;
  border-radius: 15px;
  border: 1px solid #4a261b;
  background-color: #fff;
}

.progress-value {
  height: 100%;
  border-radius: 15px;
  background-color: #33dada;
  transition: 0.5s;
  overflow: hidden;
}

.progress-animation {
  width: 300%;
  height: 100%;
  border-radius: 15px;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 6px,
    rgba(67, 255, 255, 1) 0px,
    rgba(67, 255, 255, 1) 12px
  );
  animation: progressAnimation 30s forwards infinite;
  transform: translateX(0%);

  -webkit-animation: progressAnimation 30s ease-in-out alternate-reverse
    infinite;
  -webkit-transform: translateX(0%);
}

@keyframes progressAnimation {
  100% {
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
  }
}

.progress-light {
  position: absolute;
  width: 95%;
  top: 1px;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: #fff;
  height: 2px;
}

.item-collect {
  top: -52px;
  width: 70px;
  height: 70px;
  background-color: #fff;
  border: 1px solid #4a261b;
  border-radius: 10px;
}

.item-collect.mobile {
  top: -40px;
  width: 57px;
  height: 57px;
  background-color: #fff;
  border: 1px solid #4a261b;
  border-radius: 10px;
}

.box-dialog-reward {
  width: 320px;
  height: fit-content;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 40px;
  padding-bottom: 3px;
}

.box-dialog-reward .sub {
  width: 100%;
  height: 100%;
  background-color: #ba6f4d;
  border-radius: 40px;
  padding: 10px;
}

.title-choose-reward {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px,
    rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px,
    rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px,
    rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px,
    rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px,
    rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px,
    rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px,
    rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px,
    rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px,
    rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}

.item-reward {
  width: 120px;
  height: 120px;
  background-color: #fff;
  border: 5px solid #fff;
  border-radius: 20px;
  overflow: hidden;
}

.item-reward.selected {
  border: 5px solid #4bc700;
}

.backdrop-item-reward {
  width: 102%;
  height: 102%;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.text-reward-star {
  text-shadow: rgb(74, 38, 27) 1px 0px 0px,
    rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px,
    rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px,
    rgb(74, 38, 27) 0.96017px -0.279415px 0px;
  color: #fff;
}

.animation-item-reward {
  animation: reward 1s forwards infinite;
  transform: rotate(0deg);
}

@keyframes reward {
  20% {
    transform: rotate(-5deg);
  }

  80% {
    transform: rotate(5deg);
  }
}
</style>
