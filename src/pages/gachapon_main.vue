<template>
  <q-page
    :class="$q.platform.is.desktop ? 'background-main justify-center items-center' : ''"
    class="row"
  >
    <!-- #region Desktop Mode -->
    <div
      class="relative-position background-container-desktop"
      v-if="$q.platform.is.desktop"
    >
      <div class="relative-position fit">
        <!-- #region Background main -->
        <background-main
          :isShowAnimationOpenBox="isAnimationOpenGacha"
          :isShowGachaBox="isShowGachaBox"
          :gachaData="selectGachaBox"
          :isLimited="showItemReward.isLimited"
          @callback-itemReward="funcShowDialogItemReward()"
          :isTutorial="isShowDialogTutorialFirstTime"
        ></background-main>
        <!-- #endregion -->

        <div class="absolute-center fit" v-if="isAnimationStart">
          <!-- #region Backdrop -->
          <div
            class="fit absolute-center backdrop"
            :style="
              isShowGachaBox
                ? 'transition:background-color 0.7s;background-color:transparent'
                : 'transition:background-color 0.7s;'
            "
          ></div>
          <!-- #endregion -->

          <!-- #region Choose & Get Limited -->
          <div
            class="absolute-center fit"
            :class="isShowDialogChooseLimited ? 'z-max ' : ''"
            style="opacity: 0"
            :style="
              isShowDialogChooseLimited
                ? 'opacity:1'
                : 'opacity: 0;transition: opacity 1s'
            "
          >
            <div
              class="relative-position row fit justify-center items-center animate__animated animation-duration-0-5s"
              :class="
                !isShowGachaBox && isShowDialogChooseLimited
                  ? 'animate__zoomIn'
                  : 'animate__zoomOut'
              "
            >
              <div class="relative-position box-choose-limited-container">
                <q-img
                  src="/images/box_main/box-gacha-choose-limited.png"
                  no-spinner
                  no-transition
                >
                  <div class="fit no-padding transparent">
                    <div class="row fit">
                      <!-- #region Character -->
                      <div class="col relative-position">
                        <div
                          class="absolute-center"
                          style="width: 99%; left: 50.5%; top: 45.5%"
                          align="center"
                        >
                          <div style="width: 90%">
                            <mock-character
                              :equipment="selectedLimitedItem"
                              :isGetCostume="true"
                            ></mock-character>
                          </div>
                        </div>

                        <div
                          class="absolute-bottom box-button-choose-limited row justify-center items-center"
                        >
                          <div class="col-1 self-center button-active-main reset">
                            <q-img
                              src="/images/button_main/button-reset-equipment.png"
                              no-spinner
                              no-transition
                              @click="selectedLimitedItem = null"
                            ></q-img>
                          </div>
                          <div
                            class="col-1 self-center button-active-main button-choose-get-limited"
                            :class="selectedLimitedItem == null ? 'disable' : ''"
                          >
                            <q-img
                              :src="`/images/button_main/button-gacha-choose-get-limited${
                                selectedLimitedItem == null ? '-disable' : ''
                              }.png`"
                              no-spinner
                              no-transition
                              @click="funcShowDialogConfirmGetRateUpLimited()"
                            ></q-img>
                          </div>
                          <div class="col-1 self-center button-active-main reset"></div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region Choose Item -->
                      <div
                        class="col relative-position row justify-center"
                        style="margin-top: -5%"
                      >
                        <div class="col-12 row justify-center items-center">
                          <div
                            class="col-9"
                            style="width: 78%; height: 65%"
                            v-if="showLimitedRateUpDetail.rateUpCostumesPageList.length"
                          >
                            <div class="row">
                              <div
                                class="col-1 button-choose-item-limited-main"
                                v-for="(
                                  itemRateUpLimited, indexRateUpLimited
                                ) in showLimitedRateUpDetail.rateUpCostumesPageList[
                                  currentCostumesPage - 1
                                ]"
                                align="center"
                                :key="indexRateUpLimited"
                              >
                                <q-img
                                  class="button-active-main item-limited"
                                  :src="`/images/button_main/button-shop-item${
                                    selectedLimitedItem == null
                                      ? ''
                                      : selectedLimitedItem.itemName ==
                                        itemRateUpLimited.itemName
                                      ? '-selected'
                                      : ''
                                  }.png`"
                                  :class="
                                    funcCheckItemInInventory(itemRateUpLimited)
                                      ? 'disable'
                                      : ''
                                  "
                                  no-spinner
                                  no-transition
                                  @click="funcSelectedRateUpLimited(itemRateUpLimited)"
                                >
                                  <div class="fit no-padding transparent">
                                    <div class="absolute-center" style="width: 87%">
                                      <q-img
                                        src="/images/button_main/button-item-blank.png"
                                        no-spinner
                                        no-transition
                                      >
                                        <div class="fit transparent no-padding">
                                          <div
                                            class="absolute-center"
                                            style="
                                              width: 70%;
                                              overflow: hidden;
                                              border-radius: 0.5rem;
                                            "
                                          >
                                            <q-img
                                              :src="`${pathStorage}${itemRateUpLimited.itemName}.png`"
                                              no-spinner
                                              no-trasnsition
                                              v-if="itemRateUpLimited.itemName != 'coin'"
                                            >
                                            </q-img>

                                            <q-img
                                              src="/images/icon_main/icon-item-coin.png"
                                              no-spinner
                                              no-trasnsition
                                              v-if="itemRateUpLimited.itemName == 'coin'"
                                            >
                                            </q-img>
                                          </div>
                                        </div>
                                      </q-img>
                                      <div class="text-choose-item-name" align="left">
                                        <div v-if="itemRateUpLimited.type != 'coin'">
                                          {{ `${itemRateUpLimited.itemNameTh}` }}
                                        </div>
                                        <div v-if="itemRateUpLimited.itemName == 'coin'">
                                          {{ `เหรียญ ${itemRateUpLimited.amount}` }}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    class="fit absolute-center row justify-center items-center no-padding"
                                    style="
                                      border-radius: 0.5rem;
                                      background-color: rgba(0, 0, 0, 0.8);
                                    "
                                    v-if="funcCheckItemInInventory(itemRateUpLimited)"
                                  >
                                    <div class="col-12">
                                      <div style="width: 53.96%">
                                        <q-img
                                          src="/images/icon_main/icon-check-has-item.png"
                                          no-spinner
                                          no-transition
                                        ></q-img>
                                      </div>
                                      <div class="col-12 text-check-has-item">
                                        {{ `Already have it` }}
                                      </div>
                                    </div>
                                  </div>
                                </q-img>
                              </div>
                            </div>
                          </div>
                        </div>

                        <!-- #region Box Pagination -->
                        <div
                          class="absolute-bottom box-choose-pagination-container"
                          v-if="showLimitedRateUpDetail.rateUpCostumesPageList.length"
                        >
                          <div
                            class="row box-choose-button-pagination-main justify-center items-center"
                          >
                            <div
                              class="col-1 box-choose-button-pagination row justify-center items-center"
                              :class="currentCostumesPage == 1 ? 'disable' : ''"
                              @click="
                                currentCostumesPage == 1 ? null : currentCostumesPage--
                              "
                            >
                              <div
                                class="font-mali-b self-center box-choose-button-text-pagination"
                              >
                                {{ `<` }}
                              </div>
                            </div>
                            <div
                              class="col-1 box-choose-button-pagination row justify-center items-center"
                              v-for="i in showLimitedRateUpDetail.rateUpCostumesPageList
                                .length"
                              :class="currentCostumesPage == i ? 'selected' : ''"
                              @click="currentCostumesPage = i"
                            >
                              <div
                                class="font-mali-b self-center"
                                :class="
                                  currentCostumesPage == i
                                    ? ''
                                    : 'box-choose-button-text-pagination'
                                "
                              >
                                {{ i }}
                              </div>
                            </div>
                            <div
                              class="col-1 box-choose-button-pagination row justify-center items-center"
                              :class="
                                currentCostumesPage ==
                                showLimitedRateUpDetail.rateUpCostumesPageList.length
                                  ? 'disable'
                                  : ''
                              "
                              @click="
                                currentCostumesPage ==
                                showLimitedRateUpDetail.rateUpCostumesPageList.length
                                  ? null
                                  : currentCostumesPage++
                              "
                            >
                              <div
                                class="font-mali-b self-center box-choose-button-text-pagination"
                              >
                                {{ `>` }}
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <!-- #endregion -->
                    </div>
                  </div>
                </q-img>

                <!-- #region Label Choose -->
                <div class="absolute-center label-gacha-choose-limited">
                  <q-img
                    src="/images/label_main/label-gacha-pon-choose-limited.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- #endregion -->
              </div>
            </div>

            <!-- #region Button close in box choose -->
            <div class="absolute-top-left header-bar">
              <div
                class="relative-position animate__animated animation-duration-0-5s"
                :class="
                  isShowDialogChooseLimited ? 'animate__fadeInDown' : 'animate__fadeOutUp'
                "
              >
                <div class="button-active-main icon-back">
                  <q-img
                    src="/images/icon_main/icon-back.png"
                    no-spinner
                    no-transition
                    @click="
                      (isShowDialogChooseLimited = false), (selectedLimitedItem = null)
                    "
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- #region Box Rate-up -->
          <div
            class="absolute-center box-rate-up-main"
            :class="funcShowBoxTutorial('rate-up')"
          >
            <div
              class="relative-position animate__animated animation-duration-0-5s"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInLeft'
                  : 'animate__fadeOutLeft'
              "
              align="center"
            >
              <!-- #region Label Gacha pon rate up -->
              <div align="center" class="label-rate-up-main">
                <q-img
                  width=""
                  src="/images/label_main/label-gacha-pon-rate-up.png"
                  no-spinner=""
                  no-transition=""
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region Box Show Details Limited rate up -->
              <div>
                <q-img
                  src="/images/box_main/box-gacha-pon-rate-up-limited.png"
                  no-spinner=""
                  no-transition=""
                >
                  <div class="fit transparent no-padding">
                    <div class="box-content-rate-up fit">
                      <!-- #region Title -->
                      <div class="font-mali-sb text-rate-up-header" align="center">
                        ชุด Limited Rate-Up ตอนนี้
                      </div>
                      <!-- #endregion -->

                      <!-- #region Box Character And Show Limited Outfit -->
                      <div
                        class="row justify-between box-body-rate-up-limited"
                        style="margin-top: 3%"
                      >
                        <!-- #region Character -->
                        <div class="col-1 self-end box-character" style="width: 45.5103%">
                          <mock-character
                            :equipment="selectedShowLimited"
                            :isAnimation="true"
                          ></mock-character>
                        </div>
                        <!-- #endregion -->

                        <!-- #region Detail Show Outfit -->
                        <div class="col-1 self-start box-background-item-limited">
                          <q-img
                            src="/images/background_main/background-gacha-pon-item-limited.png"
                            no-spinner=""
                            no-transition=""
                            v-touch-swipe.mouse="funcHandleSwiperShowRateUp"
                          >
                            <div class="fit no-padding transparent" style="">
                              <!-- #region Outfit Collection -->
                              <div
                                class="absolute-center row"
                                style="width: 98%; overflow: hidden"
                              >
                                <div
                                  class="row justify-center items-center full-width animate__animated animation-duration-0-5s"
                                  :class="
                                    controllerAnimation == 'auto'
                                      ? isAnimationSlideLeft
                                        ? 'animation-show-slide-left'
                                        : 'aniamtion-out-slide-right'
                                      : controllerAnimation == 'left'
                                      ? isAnimationSlideRight
                                        ? 'animation-show-slide-left'
                                        : 'aniamtion-out-slide-right'
                                      : isAnimationSlideLeft
                                      ? 'animation-show-slide-right'
                                      : 'aniamtion-out-slide-left'
                                  "
                                >
                                  <div
                                    class="col-1 box-show-item-limited relative-position"
                                    v-for="(
                                      itemShowRateUp, indexShowRateUp
                                    ) in showLimitedRateUpDetail.rateUpList[
                                      currentIndexLimited
                                    ]"
                                    v-show="
                                      itemShowRateUp.itemName != '' &&
                                      indexShowRateUp != 'name'
                                    "
                                    :key="indexShowRateUp"
                                  >
                                    <q-img
                                      src="/images/button_main/button-item-limited-blank.png"
                                      no-spinner=""
                                      no-transition=""
                                    >
                                      <div class="fit no-padding transparent"></div>
                                    </q-img>
                                    <div
                                      class="absolute-center"
                                      style="
                                        top: 49%;
                                        width: 80%;
                                        border-radius: 2rem;
                                        overflow: hidden;
                                      "
                                    >
                                      <q-img
                                        width="100%"
                                        :src="`${pathStorage}${itemShowRateUp.itemName}.png`"
                                        no-spinner=""
                                        no-transition=""
                                      ></q-img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- #endregion -->

                              <!-- #region Pagination -->
                              <div
                                class="absolute-bottom relative-position"
                                style="bottom: 10%"
                              >
                                <div
                                  class="row justify-center absolute-center full-width"
                                  align="center"
                                >
                                  <div
                                    class="col-1 button-icon-page"
                                    v-for="(
                                      itemIconPageCircle, indexIconPageCircle
                                    ) in showLimitedRateUpDetail.rateUpList"
                                    :key="indexIconPageCircle"
                                    :class="
                                      isDisableButtonTutorialFirstTime ? 'disable' : ''
                                    "
                                  >
                                    <q-img
                                      @click="
                                        isDisableButtonTutorialFirstTime
                                          ? null
                                          : funcSelectedShowLimited(indexIconPageCircle)
                                      "
                                      :src="`/images/icon_main/icon-pagination-circle-page${
                                        indexIconPageCircle == currentIndexLimited
                                          ? '-current'
                                          : ''
                                      }.png`"
                                      no-spinner=""
                                      no-transition=""
                                    ></q-img>
                                  </div>
                                </div>
                              </div>
                              <!-- #endregion -->
                            </div>
                          </q-img>
                        </div>
                        <!-- #endregion -->
                      </div>
                      <!-- #endregion -->

                      <!-- #region Progress bar and Button Get Limited Rate up -->
                      <div class="box-footer-rate-up row">
                        <div class="col">
                          <div class="row justify-center">
                            <div class="self-center">
                              <div class="text-footer-rate-up row">
                                เลือกรับชุด Limited เมื่อครบ 10 คะแนน
                              </div>
                            </div>
                            <div
                              class="col-1 self-start icon-information relative-position"
                            >
                              <q-img
                                src="/images/icon_main/icon-information.png"
                                no-spinner=""
                                no-transition=""
                                class="button-active-main absolute-center"
                                :class="isShowDialogTutorialFirstTime ? 'disable' : ''"
                                style="left: 0%"
                                @click="
                                  isShowDialogTutorialFirstTime
                                    ? null
                                    : funcSelectTypeOfInformation('rate-up')
                                "
                              ></q-img>
                            </div>
                          </div>
                          <div
                            class="relative-position"
                            style="width: 100%; margin: 2.5% 0%"
                          >
                            <div class="box-count-bar-limited-rate-up relative-position">
                              <div
                                class="box-background-bar-progress-limited-rate-up absolute-top-left"
                                :style="`width: ${
                                  (showLimitedRateUpDetail.limitedPoint > 10
                                    ? 10
                                    : showLimitedRateUpDetail.limitedPoint) * 10
                                }%`"
                              >
                                <div
                                  class="relative-position fit"
                                  style="overflow: hidden"
                                >
                                  <div
                                    class="background-bar-progress"
                                    :class="`${
                                      showLimitedRateUpDetail.limitedPoint >= 10
                                        ? 'progress-active-green'
                                        : ''
                                    }`"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div
                              class="absolute-center text-count-bar-limited-rate-up font-mali-b"
                              :class="
                                showLimitedRateUpDetail.limitedPoint >= 10
                                  ? 'text-active-orange'
                                  : ''
                              "
                            >
                              <span
                                :class="
                                  showLimitedRateUpDetail.limitedPoint > 10
                                    ? 'text-active-red'
                                    : ''
                                "
                                >{{ `${showLimitedRateUpDetail.limitedPoint}` }}</span
                              >
                              <span>{{ `/10` }}</span>
                            </div>
                          </div>
                        </div>
                        <div class="col-1 box-button-get-limited">
                          <q-img
                            :src="`/images/button_main/button-gacha-pon-get-limited${
                              showLimitedRateUpDetail.limitedPoint < 10 ? '-disable' : ''
                            }.png`"
                            no-spinner=""
                            no-transition=""
                            class="button-active-main"
                            :class="
                              isShowDialogTutorialFirstTime
                                ? 'disable'
                                : showLimitedRateUpDetail.limitedPoint < 10
                                ? 'disable'
                                : ''
                            "
                            @click="
                              isShowDialogTutorialFirstTime
                                ? null
                                : showLimitedRateUpDetail.limitedPoint < 10
                                ? null
                                : funcShowBoxChooseLimited()
                            "
                          ></q-img>
                        </div>
                      </div>
                      <!-- #endregion -->
                    </div>
                  </div>
                </q-img>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Box Gachapon Premium -->
          <div
            class="absolute-center box-premium-container"
            :class="funcShowBoxTutorial(showGachaPremiumDetail.name)"
          >
            <div
              class="relative-position animate__animated animation-duration-0-5s"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInRight'
                  : 'animate__fadeOutRight'
              "
            >
              <div>
                <q-img
                  :src="`/images/box_main/box-gacha-pon-premium.png`"
                  no-spinner
                  no-transition
                >
                  <div class="fit no-padding transparent">
                    <!-- #region Icon Box Gachapon -->
                    <div class="absolute-center box-icon-gacha">
                      <q-img
                        :src="`/images/icon_main/icon-gacha-pon-box-premium.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Label Gachapon -->
                    <div class="absolute-center box-label-gachapon">
                      <q-img
                        :src="`/images/label_main/label-gacha-pon-premium.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region News Gachapon -->
                    <div class="absolute-center box-gacha-news">
                      <q-img
                        src="/images/box_main/box-gacha-pon-news.png"
                        no-spinner
                        no-transition
                      >
                        <div class="fit no-padding transparent">
                          <!-- #region Conten for Permium -->
                          <div class="relative-position box-content-news">
                            <div
                              class="fit"
                              v-if="showGachaPremiumDetail.limitedList.length"
                            >
                              <div class="row justify-center">
                                <div class="col-1 self-center icon-time">
                                  <q-img
                                    src="/images/icon_main/icon-time.png"
                                    no-spinner=""
                                    no-transition=""
                                  ></q-img>
                                </div>
                                <div class="self-center" style="margin: 0% 3%">
                                  {{ showGachaPremiumDetail.remaining }}
                                </div>
                                <div class="col-12 text-rate-up-news" align="center">
                                  เพิ่มอัตราการได้รับ !
                                </div>
                              </div>
                              <div class="full-width">
                                <div
                                  class="row justify-center items-center full-width"
                                  :class="
                                    isAnimationBoxNewsGachaSlide
                                      ? 'animation-show-slide-left'
                                      : 'aniamtion-out-slide-left'
                                  "
                                >
                                  <div
                                    class="col-1 box-show-item-limited news"
                                    v-for="(
                                      itemShowPremiumLimited, indexShowPremiumLimited
                                    ) in showGachaPremiumDetail.limitedList[
                                      currentIndexBoxNewsGacha
                                    ]"
                                    :key="indexShowPremiumLimited"
                                  >
                                    <q-img
                                      src="/images/button_main/button-item-limited-blank.png"
                                      no-spinner=""
                                      no-transition=""
                                    >
                                      <div class="fit no-padding transparent">
                                        <div
                                          class="absolute-center"
                                          style="
                                            top: 48%;
                                            width: 75%;
                                            border-radius: 0.5rem;
                                            overflow: hidden;
                                          "
                                        >
                                          <q-img
                                            width="100%"
                                            :src="`${pathStorage}${itemShowPremiumLimited.itemName}.${itemShowPremiumLimited.itemExtension}`"
                                            no-spinner
                                            no-transition
                                          ></q-img>
                                        </div>
                                      </div>
                                    </q-img>
                                  </div>
                                </div>
                              </div>
                              <div class="absolute-bottom full-width" style="bottom: 10%">
                                <div class="col-12 self-end relative-position">
                                  <div
                                    class="row justify-center absolute-center full-width"
                                    align="center"
                                  >
                                    <div
                                      class="col-1 button-icon-page news"
                                      v-for="(
                                        itemBoxNewsGacha, indexBoxNewsGacha
                                      ) in showGachaPremiumDetail.limitedList"
                                      :class="
                                        isShowDialogTutorialFirstTime ? 'disable' : ''
                                      "
                                    >
                                      <q-img
                                        @click="funcSelectNewGachaList(indexBoxNewsGacha)"
                                        :src="`/images/icon_main/icon-pagination-circle-page${
                                          indexBoxNewsGacha == currentIndexBoxNewsGacha
                                            ? '-current'
                                            : ''
                                        }.png`"
                                        no-spinner=""
                                        no-transition=""
                                      ></q-img>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- #endregion -->
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Progress bar gachapon -->
                    <div class="absolute-center box-progress-bar-gachapon" align="center">
                      <div>
                        <span>
                          {{
                            `การันตีชุด Limited เมื่อสุ่มครบ ${showGachaPremiumDetail.maxGuaranteePoint} ครั้ง`
                          }}</span
                        >
                      </div>
                      <div class="relative-position" style="width: 80%; margin: 2.5% 0%">
                        <div class="box-count-bar-gachapon relative-position">
                          <div
                            class="box-background-bar-progress-gachapon absolute-top-left"
                            :style="`width: ${
                              (showGachaPremiumDetail.guaranteePoint /
                                showGachaPremiumDetail.maxGuaranteePoint) *
                              100
                            }%`"
                          >
                            <div class="relative-position fit" style="overflow: hidden">
                              <div
                                class="background-bar-progress-gachapon"
                                :class="`${
                                  showGachaPremiumDetail.guaranteePoint >=
                                  showGachaPremiumDetail.maxGuaranteePoint
                                    ? 'progress-active-green'
                                    : ''
                                }`"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="absolute-center text-count-bar-gachapon font-mali-b"
                          :class="
                            showGachaPremiumDetail.guaranteePoint >=
                            showGachaPremiumDetail.maxGuaranteePoint
                              ? 'text-active-bar'
                              : ''
                          "
                        >
                          <div>
                            {{
                              `${showGachaPremiumDetail.guaranteePoint}/${showGachaPremiumDetail.maxGuaranteePoint}`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Button Open Gachapon -->
                    <div class="absolute-center box-button-gacha-open">
                      <q-img
                        src="/images/button_main/button-gacha-pon-open.png"
                        no-spinner
                        no-transition
                        class="button-active-main"
                        :class="isDisableButtonTutorialFirstTime ? 'disable' : ''"
                        @click="
                          isShowGachaBox
                            ? null
                            : funcSelectGachaBox(showGachaPremiumDetail)
                        "
                      >
                        <div class="fit no-padding transparent">
                          <div class="relative-position fit row" style="padding: 0% 7%">
                            <div class="col relative-position"></div>
                            <div
                              class="col-1 self-center relative-position icon-key-button-gacha-open"
                            >
                              <q-img
                                src="/images/icon_main/icon-gacha-pon-key.png"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>
                            <div
                              class="col-1 relative-position self-center"
                              style="min-width: fit-content; padding-left: 4%"
                              align="left"
                            >
                              <div class="text-number-of-key-and-coin font-fredoka">
                                {{ funcFormatNumber(showGachaPremiumDetail.price) }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region icon Information -->
                    <q-img
                      class="absolute-top-right box-button-infomation button-active-main"
                      src="/images/icon_main/icon-information.png"
                      no-spinner
                      no-transition
                      :class="isShowDialogTutorialFirstTime ? 'disable' : ''"
                      @click="funcSelectTypeOfInformation(showGachaPremiumDetail.name)"
                    ></q-img>
                    <!-- #endregion -->
                  </div>
                </q-img>
              </div>

              <!-- #region Alert No enough -->
              <div
                class="absolute-bottom box-alert-no-enough-main"
                v-if="selectGachaBox?.type == showGachaPremiumDetail.name && isNoEnough"
              >
                <div
                  class="relative-position fit animate__animated animation-duration-0-5s"
                  :class="isNoEnough ? 'animate__fadeInDown' : 'animate__fadeOut'"
                >
                  <div class="box-alert-no-enough row justify-center items-center">
                    <div class="col-1 self-center alert-no-enough-icon">
                      <q-img
                        src="/images/icon_main/icon-gacha-pon-key.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="self-center font-mali-m">
                      <div>
                        {{ `จำนวนกุญแจไม่เพียงพอ` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Box Gachapon Standard -->
          <div
            class="absolute-center box-stardard-container"
            :class="funcShowBoxTutorial(showGachaStandardDetail.name)"
          >
            <div
              class="relative-position animate__animated animation-duration-0-5s"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInRight'
                  : 'animate__fadeOutRight'
              "
            >
              <div>
                <q-img
                  :src="`/images/box_main/box-gacha-pon-standard.png`"
                  no-spinner
                  no-transition
                >
                  <div class="fit no-padding transparent">
                    <!-- #region Icon Box Gachapon -->
                    <div class="absolute-center box-icon-gacha">
                      <q-img
                        :src="`/images/icon_main/icon-gacha-pon-box-standard.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <!-- /#endregion -->

                    <!-- #region Label Gachapon -->
                    <div class="absolute-center box-label-gachapon">
                      <q-img
                        :src="`/images/label_main/label-gacha-pon-standard.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region News Gachapon -->
                    <div class="absolute-center box-gacha-news">
                      <q-img
                        src="/images/box_main/box-gacha-pon-news.png"
                        no-spinner
                        no-transition
                      >
                        <div class="fit no-padding transparent">
                          <div class="fit">
                            <div class="">
                              <div class="text-rate-up-news standard" align="center">
                                ลุ้นของแต่งกาย <br />
                                และกุญแจ Limited-Time
                              </div>
                            </div>

                            <div class="" align="center">
                              <q-img
                                width="70%"
                                :src="showGachaStandardDetail.banner"
                                no-spinner=""
                                no-transition=""
                              ></q-img>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Progress bar gachapon -->
                    <div class="absolute-center box-progress-bar-gachapon" align="center">
                      <div>
                        <span>
                          {{
                            `การันตีกุญแจ Limited เมื่อสุ่มครบ ${showGachaStandardDetail.maxGuaranteePoint} ครั้ง`
                          }}
                        </span>
                      </div>
                      <div class="relative-position" style="width: 80%; margin: 2.5% 0%">
                        <div class="box-count-bar-gachapon relative-position">
                          <div
                            class="box-background-bar-progress-gachapon absolute-top-left"
                            :style="`width: ${
                              (showGachaStandardDetail.guaranteePoint /
                                showGachaStandardDetail.maxGuaranteePoint) *
                              100
                            }%`"
                          >
                            <div class="relative-position fit" style="overflow: hidden">
                              <div
                                class="background-bar-progress-gachapon"
                                :class="
                                  showGachaStandardDetail.guaranteePoint >=
                                  showGachaStandardDetail.maxGuaranteePoint
                                    ? 'progress-active-green'
                                    : ''
                                "
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          class="absolute-center text-count-bar-gachapon font-mali-b"
                          :class="
                            showGachaStandardDetail.guaranteePoint >=
                            showGachaStandardDetail.maxGuaranteePoint
                              ? 'text-active-bar'
                              : ''
                          "
                        >
                          <div>
                            {{
                              `${showGachaStandardDetail.guaranteePoint}/${showGachaStandardDetail.maxGuaranteePoint}`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region Button Open Gachapon -->
                    <div class="absolute-center box-button-gacha-open">
                      <q-img
                        src="/images/button_main/button-gacha-pon-open.png"
                        no-spinner
                        no-transition
                        class="button-active-main"
                        :class="isDisableButtonTutorialFirstTime ? 'disable' : ''"
                        @click="
                          isShowGachaBox
                            ? null
                            : funcSelectGachaBox(showGachaStandardDetail)
                        "
                      >
                        <div class="fit no-padding transparent">
                          <div class="relative-position fit row" style="padding: 0% 7%">
                            <div class="col relative-position"></div>
                            <div
                              class="col-1 self-center relative-position icon-coin-button-gacha-open"
                            >
                              <q-img
                                src="/images/icon_main/icon-coin.png"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>
                            <div
                              class="col-1 relative-position self-center"
                              style="min-width: fit-content; padding-left: 4%"
                              align="left"
                            >
                              <div class="text-number-of-key-and-coin font-fredoka">
                                {{ funcFormatNumber(showGachaStandardDetail.price) }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region icon Information -->
                    <q-img
                      class="absolute-top-right box-button-infomation button-active-main"
                      src="/images/icon_main/icon-information.png"
                      no-spinner
                      no-transition
                      :class="isShowDialogTutorialFirstTime ? 'disable' : ''"
                      @click="funcSelectTypeOfInformation(showGachaStandardDetail.name)"
                    ></q-img>
                    <!-- #endregion -->
                  </div>
                </q-img>
              </div>

              <!-- #region Alert No enough -->
              <div
                class="absolute-bottom box-alert-no-enough-main"
                v-if="selectGachaBox?.type == showGachaStandardDetail.name && isNoEnough"
              >
                <div
                  class="relative-position fit animate__animated animation-duration-0-5s"
                  :class="isNoEnough ? 'animate__fadeInDown' : 'animate__fadeOut'"
                >
                  <div class="box-alert-no-enough row justify-center items-center">
                    <div class="col-1 self-center alert-no-enough-icon">
                      <q-img
                        src="/images/icon_main/icon-coin.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="self-center font-mali-m">
                      <div>{{ `จำนวนเงินไม่เพียงพอ` }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Header Button Back -->
          <div class="absolute-top-left header-bar-button-back">
            <div
              class="relative-position fit animate__animated"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInDown'
                  : 'animate__fadeOutUp'
              "
            >
              <q-img
                class="button-active-main"
                src="/images/icon_main/icon-back.png"
                no-spinner
                no-transition
                @click="funcBackToLobby()"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Header Coin -->
          <div
            class="absolute-top-left header-bar-coin"
            :class="funcShowBoxTutorial('header-coin')"
          >
            <div
              class="relative-position fit animate__animated"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInDown'
                  : 'animate__fadeOutUp'
              "
            >
              <q-img
                src="/images/gacha_main/gacha-box-header-coin.png"
                no-spinner
                no-transition
              >
                <div class="fit no-padding transparent">
                  <div class="absolute-center" style="left: 55%">
                    <div class="text-white font-mali-b text-coin" align="center">
                      {{ `${funcFormatStudentCoin(studentStore.coin)}` }}
                    </div>
                  </div>
                </div>
              </q-img>

              <div class="absolute-center" style="left: 5%; top: 65%; width: 40%">
                <q-img src="/images/icon_main/icon-coin.png" no-spinner no-transition>
                </q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Header Key -->
          <div
            class="absolute-top-left header-bar-key"
            :class="funcShowBoxTutorial('header-key')"
          >
            <div
              class="relative-position fit animate__animated"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInDown'
                  : 'animate__fadeOutUp'
              "
            >
              <q-img
                src="/images/gacha_main/gacha-box-header-key.png"
                no-spinner
                no-transition
              >
                <div class="fit no-padding transparent">
                  <div class="absolute-center" style="left: 55%">
                    <div class="text-white font-mali-b text-coin" align="center">
                      {{ `${studentStore.premiumKey}` }}
                    </div>
                  </div>
                </div>
              </q-img>

              <div class="absolute-center" style="left: 5%; top: 65%; width: 38.8955%">
                <q-img
                  src="/images/icon_main/icon-gacha-pon-key.png"
                  no-spinner
                  no-transition
                >
                </q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Header Information -->
          <div class="absolute-top-left header-bar-information">
            <div
              class="relative-position fit animate__animated"
              :class="
                !isShowGachaBox && !isShowDialogChooseLimited
                  ? 'animate__fadeInDown'
                  : 'animate__fadeOutUp'
              "
            >
              <q-img
                class="icon-tutorial-infomation button-active-main"
                src="/images/icon_main/icon-information.png"
                no-spinner
                no-transition
                @click="isShowDialogTutorial = true"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Tutorial First time -->
          <!-- #region Box Tutorial -->
          <div
            class="fit absolute-center"
            v-if="isShowDialogTutorialFirstTime"
            :class="isShowGachaBox ? '' : 'backdrop'"
          >
            <div
              class="relative-position fit animate__animated animation-duration-0-3s"
              :class="
                isShowGachaBox
                  ? currentTutorialData.tutorialBarPosition.includes('bottom')
                    ? 'animate__fadeOutDown'
                    : 'animate__fadeOutUp'
                  : currentTutorialData.tutorialBarPosition.includes('bottom')
                  ? 'animate__fadeInUp'
                  : 'animate__fadeInDown'
              "
            >
              <div :class="currentTutorialData.tutorialBarPosition">
                <q-img
                  src="/images/gacha_main/gacha-tutorial-step.png"
                  no-spinner
                  no-transition
                >
                  <div class="fit relative-position transparent no-padding z-max">
                    <div
                      class="absolute-center"
                      style="
                        top: 52%;
                        left: 53%;
                        width: 65%;
                        height: 80%;
                        padding: 1% 0%;
                        line-height: 1.7;
                      "
                    >
                      <div class="text-tutorial font-mali-b">
                        <span v-html="currentTutorialData.text"></span>
                      </div>
                    </div>
                    <div v-if="currentTutorialData.isNextButton">
                      <div
                        class="absolute-center"
                        style="width: 7.5%"
                        :style="currentTutorialData.positionButtonNext"
                        v-if="currentStepTutorial < tutorialFirstList.length - 1"
                      >
                        <q-img
                          class="cursor-pointer button-active-main"
                          src="/images/button_main/button-tutorial-next.png"
                          no-spinner
                          no-transition
                          @click="funcNextStepTutorial()"
                        ></q-img>
                      </div>

                      <div
                        class="absolute-center"
                        style="width: 13.6406%"
                        :style="currentTutorialData.positionButtonNext"
                        v-if="currentStepTutorial + 1 == tutorialFirstList.length"
                      >
                        <q-img
                          class="cursor-pointer button-active-main"
                          src="/images/button_main/button-tutorial-finish.png"
                          no-spinner
                          no-transition
                          @click="funcFinishTutorial()"
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </q-img>
              </div>
              <div
                :class="currentTutorialData.winnyPosition"
                style="width: 26.25%; padding: 1% 0%"
              >
                <q-img
                  src="/images/ai_character_main/winny-character-tutorial.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Hand Animation -->
          <div
            class="absolute z-max"
            style="width: 9.375%"
            :style="currentTutorialData.positionHandLeft"
            v-if="
              isShowDialogTutorialFirstTime &&
              currentTutorialData.isShowHandLeft &&
              isAnimationHand
            "
          >
            <div
              class="relative-position fit animate__animated animation-duration-0-3s"
              :class="isShowGachaBox ? 'animate__fadeOut' : 'animate__bounceIn'"
            >
              <q-img
                no-spinner
                no-transition
                src="/images/icon_main/icon-tutorial-hand-left.png"
              ></q-img>
            </div>
          </div>
          <div
            class="absolute z-max"
            style="width: 9.375%"
            :style="currentTutorialData.positionHandRight"
            v-if="
              isShowDialogTutorialFirstTime &&
              currentTutorialData.isShowHandRight &&
              isAnimationHand
            "
          >
            <div
              class="relative-position fit animate__animated animation-duration-0-3s"
              :class="isShowGachaBox ? 'animate__fadeOut' : 'animate__bounceIn'"
            >
              <q-img
                :class="isAnimationHandClick ? 'animation-hand-right' : ''"
                no-spinner
                no-transition
                src="/images/icon_main/icon-tutorial-hand-right.png"
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->
          <!-- #endregion -->
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile Mode -->
    <div
      class="col-12 relative-position background-container-mobile"
      v-if="!$q.platform.is.desktop"
    >
      <!-- #region Background main -->
      <div
        class="absolute-bottom-left"
        style="max-width: 1500px; width: 300%; left: 50%; transform: translate(-50%, 1%)"
      >
        <background-main
          :isShowAnimationOpenBox="isAnimationOpenGacha"
          :isShowGachaBox="isShowGachaBox"
          :gachaData="selectGachaBox"
          :isLimited="showItemReward.isLimited"
          @callback-itemReward="funcShowDialogItemReward()"
          :isTutorial="isShowDialogTutorialFirstTime"
        ></background-main>
      </div>
      <!-- #endregion -->

      <!-- #region Backdrop -->
      <div
        :style="
          isShowGachaBox && !isShowDialogItemReward
            ? 'transition:background-color 0.7s;background-color:transparent'
            : 'transition:background-color 0.7s;'
        "
        class="absolute-center fit backdrop"
      ></div>
      <!-- #endregion -->

      <div
        class="relative-position row fit animate__animated"
        :class="
          !isShowGachaBox && !isShowDialogChooseLimited
            ? 'animate__fadeInLeft'
            : 'animate__fadeOutRight'
        "
        v-if="isAnimationStart"
      >
        <!-- #region Header Bar -->
        <div
          class="absolute-top-left row box-header-main-mobile"
          :class="isShowDialogTutorialFirstTime ? '' : 'z-max'"
        >
          <!-- #region Button Back -->
          <div
            class="relative-position col-3 button-active-main icon-back-mobile animate__animated animation-duration-0-5s"
            :class="
              !isShowGachaBox && !isShowDialogChooseLimited
                ? 'animate__fadeInDown'
                : 'animate__fadeOutUp'
            "
          >
            <q-img
              src="/images/icon_main/icon-back.png"
              no-spinner
              no-transition
              @click="funcBackToLobby()"
            ></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region Coin Bar -->
          <div
            class="relative-position self-start col-3 box-total-bar mobile animate__animated animation-duration-0-5s"
            :class="[
              !isShowGachaBox && !isShowDialogChooseLimited
                ? 'animate__fadeInDown'
                : 'animate__fadeOutUp',
              funcShowBoxTutorial('header-coin'),
            ]"
          >
            <q-img
              src="/images/gacha_main/gacha-box-header-coin.png"
              no-spinner
              no-transition
            >
              <div class="fit no-padding transparent">
                <div class="absolute-center" style="left: 55%; top: 47%">
                  <div class="text-white font-mali-b text-coin mobile" align="center">
                    {{ `${funcFormatStudentCoin(studentStore.coin)}` }}
                  </div>
                </div>
              </div>
            </q-img>

            <div
              class="absolute-center"
              style="left: 5%; top: 65%; max-width: 40px; min-width: 35px; width: 100%"
            >
              <q-img src="/images/icon_main/icon-coin.png" no-spinner no-transition>
              </q-img>
            </div>

            <div
              class="absolute-center"
              style="width: 60px; top: 20%; left: 123%"
              v-if="
                isShowDialogTutorialFirstTime &&
                currentTutorialData.isShowHandLeft &&
                isAnimationHand
              "
            >
              <div
                class="relative-position fit animate__animated animation-duration-0-3s"
                :class="isShowGachaBox ? 'animate__fadeOut' : 'animate__bounceIn'"
              >
                <q-img
                  style="transform: rotate(-35deg); transform-origin: center"
                  no-spinner
                  no-transition
                  src="/images/icon_main/icon-tutorial-hand-left.png"
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Key Bar -->
          <div
            class="relative-position self-start col-3 box-total-bar mobile animate__animated animation-duration-0-5s"
            style="max-width: 80px"
            :class="[
              !isShowGachaBox && !isShowDialogChooseLimited
                ? 'animate__fadeInDown'
                : 'animate__fadeOutUp',
              funcShowBoxTutorial('header-key'),
            ]"
          >
            <q-img
              src="/images/gacha_main/gacha-box-header-key.png"
              no-spinner
              no-transition
            >
              <div class="fit no-padding transparent">
                <div class="absolute-center" style="left: 55%">
                  <div class="text-white font-mali-b text-coin mobile" align="center">
                    {{ `${studentStore.premiumKey}` }}
                  </div>
                </div>
              </div>
            </q-img>

            <div class="absolute-center" style="left: 5%; top: 65%; width: 38.8955%">
              <q-img
                src="/images/icon_main/icon-gacha-pon-key.png"
                no-spinner
                no-transition
              >
              </q-img>
            </div>

            <div
              class="absolute-center"
              style="width: 60px; top: 20%; left: -32px"
              v-if="
                isShowDialogTutorialFirstTime &&
                currentTutorialData.isShowHandRight &&
                isAnimationHand
              "
            >
              <div
                class="relative-position fit animate__animated animation-duration-0-3s"
                :class="isShowGachaBox ? 'animate__fadeOut' : 'animate__bounceIn'"
              >
                <q-img
                  :class="isAnimationHandClick ? 'animation-hand-right' : ''"
                  no-spinner
                  no-transition
                  src="/images/icon_main/icon-tutorial-hand-right.png"
                  style="transform: rotate(-15deg); transform-origin: center"
                ></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region button information -->

          <div
            class="relative-position self-start col-3 box-total-bar mobile animate__animated animation-duration-0-5s"
            style="max-width: 35px; width: 7%; min-width: 20px; margin-left: 4px"
            :class="
              !isShowGachaBox && !isShowDialogChooseLimited
                ? 'animate__fadeInDown'
                : 'animate__fadeOutUp'
            "
          >
            <q-img
              src="/images/icon_main/icon-information.png"
              no-spinner
              no-transition
              @click="isShowDialogTutorial = true"
            ></q-img>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Rate-up -->
        <div
          class="absolute-center box-container-mobile"
          v-touch-swipe.mouse="funcHandleSwiper"
          :class="[
            isShowDialogTutorialFirstTime
              ? ''
              : selectCurrentGachaBoxMobile === null || selectCurrentGachaBoxMobile === 0
              ? 'z-max'
              : '',
            funcShowBoxTutorial('rate-up'),
          ]"
        >
          <div
            class="relative-position"
            :class="
              selectCurrentGachaBoxMobile === null || selectCurrentGachaBoxMobile === 0
                ? ' animation-page-in-left'
                : 'animation-page-out-left'
            "
          >
            <div class="box-label-rate-up-main-mobile">
              <q-img
                src="/images/label_main/label-gacha-pon-rate-up.png"
                no-spinner
                no-trasnsition
              ></q-img>
            </div>
            <div class="box-rate-up-main-mobile">
              <q-img
                src="/images/box_main/box-gacha-pon-rate-up-limited-mobile.png"
                no-spinner
                no-transition
              >
                <div class="fit no-padding transparent">
                  <div
                    class="absolute-center font-mali-sb text-16-mobile"
                    style="width: 100%; top: 6%"
                    align="center"
                  >
                    {{ `ชุด Limited Rate-Up ตอนนี้` }}
                  </div>

                  <!-- #region Mock Character -->
                  <div class="absolute-center" style="width: 85%; top: 38%">
                    <mock-character
                      :equipment="selectedShowLimited"
                      :isAnimation="true"
                    ></mock-character>
                  </div>
                  <!-- #endregion -->

                  <!-- #region Pagination -->
                  <div class="absolute-bottom relative-position" style="bottom: 32.5%">
                    <div
                      class="row justify-center absolute-center full-width"
                      align="center"
                    >
                      <div
                        class="col-1 button-icon-page"
                        v-for="(
                          itemIconPageCircle, indexIconPageCircle
                        ) in showLimitedRateUpDetail.rateUpList"
                      >
                        <q-img
                          @click="funcSelectedShowLimited(indexIconPageCircle)"
                          :src="`/images/icon_main/icon-pagination-circle-page${
                            indexIconPageCircle == currentIndexLimited ? '-current' : ''
                          }.png`"
                          no-spinner=""
                          no-transition=""
                        ></q-img>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region Progress & Button Get -->
                  <div
                    class="absolute-bottom"
                    style="width: 95%; bottom: 9%; margin: auto"
                  >
                    <div class="row" style="padding: 2% 1%">
                      <div
                        class="col self-center text-12-mobile font-mali-sb"
                        style="padding: 2%"
                      >
                        {{ `เลือกรับชุด Limited เมื่อครบ 10 คะแนน` }}
                      </div>
                      <div class="col-1 self-center" style="max-width: 30px; width: 100%">
                        <q-img
                          width="85%"
                          class="button-active-main"
                          src="/images/icon_main/icon-information.png"
                          no-spinner
                          no-trasnsition
                          @click="funcSelectTypeOfInformation('rate-up')"
                        ></q-img>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col self-center" align="center">
                        <div
                          class="relative-position"
                          style="width: 100%; margin: 2.5% auto"
                        >
                          <div
                            class="box-count-bar-limited-rate-up-mobile relative-position"
                          >
                            <div
                              class="box-background-bar-progress-limited-rate-up absolute-top-left"
                              :style="`width: ${
                                (showLimitedRateUpDetail.limitedPoint > 10
                                  ? 10
                                  : showLimitedRateUpDetail.limitedPoint) * 10
                              }%`"
                            >
                              <div class="relative-position fit" style="overflow: hidden">
                                <div
                                  class="background-bar-progress"
                                  :class="`${
                                    showLimitedRateUpDetail.limitedPoint >= 10
                                      ? 'progress-active-green'
                                      : ''
                                  }`"
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="absolute-center text-count-bar-limited-rate-up-mobile text-16-mobile font-mali-b"
                            :class="
                              showLimitedRateUpDetail.limitedPoint >= 10
                                ? 'text-active-orange-mobile'
                                : ''
                            "
                          >
                            <span
                              :class="
                                showLimitedRateUpDetail.limitedPoint > 10
                                  ? 'text-active-red-mobile'
                                  : ''
                              "
                              >{{ `${showLimitedRateUpDetail.limitedPoint}` }}</span
                            >
                            <span>{{ `/10` }}</span>
                          </div>
                        </div>
                      </div>
                      <div class="col-1 button-active-main get-button-mobile">
                        <q-img
                          :src="`/images/button_main/button-gacha-pon-get-limited${
                            isShowDialogTutorialFirstTime
                              ? '-disable'
                              : showLimitedRateUpDetail.limitedPoint < 10
                              ? '-disable'
                              : ''
                          }.png`"
                          no-spinner=""
                          no-transition=""
                          :class="
                            isShowDialogTutorialFirstTime
                              ? 'disable'
                              : showLimitedRateUpDetail.limitedPoint < 10
                              ? 'disable'
                              : ''
                          "
                          @click="
                            isShowDialogTutorialFirstTime
                              ? null
                              : showLimitedRateUpDetail.limitedPoint < 10
                              ? null
                              : funcShowBoxChooseLimited()
                          "
                        ></q-img>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->
                </div>
              </q-img>
            </div>

            <!-- #region Hand -->
            <div
              class="absolute-bottom-right"
              style="bottom: 75px; right: -35px"
              v-if="
                isShowDialogTutorialFirstTime &&
                selectCurrentGachaBoxMobile == 0 &&
                currentTutorialData.isShowHandLeft
              "
            >
              <div style="transform: rotateY(180deg); transform-origin: center">
                <q-img
                  width="60px"
                  src="/images/icon_main/icon-tutorial-hand-right.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Standard Box -->
        <div
          class="absolute-center box-container-mobile"
          :class="[
            isShowDialogTutorialFirstTime
              ? ''
              : selectCurrentGachaBoxMobile == 2
              ? 'z-max'
              : '',
            funcShowBoxTutorial('standard'),
          ]"
          v-touch-swipe.mouse="funcHandleSwiper"
        >
          <div
            class="animate__animated"
            align="center"
            :class="
              selectCurrentGachaBoxMobile == 1 || selectCurrentGachaBoxMobile != 2
                ? 'animation-page-out-right'
                : currentStepPage == 'right'
                ? selectCurrentGachaBoxMobile == 2
                  ? 'animation-page-in-right'
                  : 'animation-page-out-left'
                : currentStepPage == 'left'
                ? selectCurrentGachaBoxMobile == 2
                  ? 'animation-page-in-left'
                  : 'animation-page-out-right'
                : ''
            "
          >
            <q-img
              :src="`/images/box_main/box-gacha-pon-standard.png`"
              no-spinner
              no-transition
            >
              <div class="fit transparent no-padding">
                <!-- #region Icon Box Gachapon -->
                <div class="absolute-center box-icon-gacha">
                  <q-img
                    :src="`/images/icon_main/icon-gacha-pon-box-standard.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- /#endregion -->

                <!-- #region Label Gachapon -->
                <div class="absolute-center box-label-gachapon">
                  <q-img
                    :src="`/images/label_main/label-gacha-pon-standard.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- #endregion -->

                <!-- #region News Gachapon -->
                <div class="absolute-center box-gacha-news">
                  <q-img
                    src="/images/box_main/box-gacha-pon-news.png"
                    no-spinner
                    no-transition
                  >
                    <div class="fit no-padding transparent">
                      <div class="fit">
                        <div class="absolute-center full-width" style="top: 12%">
                          <div
                            class="text-12-mobile"
                            style="margin-top: 2%"
                            align="center"
                          >
                            ลุ้นของแต่งกาย <br />
                            และกุญแจ Limited-Time
                          </div>
                        </div>

                        <div class="absolute-bottom" align="center">
                          <q-img
                            width="80%"
                            :src="showGachaStandardDetail.banner"
                            no-spinner=""
                            no-transition=""
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <!-- #endregion -->

                <!-- #region Progress bar gachapon -->
                <div class="absolute-center box-progress-bar-gachapon" align="center">
                  <div class="text-12-mobile">
                    <span>
                      {{
                        `การันตีกุญแจ Limited เมื่อสุ่มครบ ${showGachaStandardDetail.maxGuaranteePoint} ครั้ง`
                      }}
                    </span>
                  </div>
                  <div class="relative-position" style="width: 80%; margin: 2.5% 0%">
                    <div class="box-count-bar-gachapon relative-position">
                      <div
                        class="box-background-bar-progress-gachapon absolute-top-left"
                        :style="`width: ${
                          (showGachaStandardDetail.guaranteePoint /
                            showGachaStandardDetail.maxGuaranteePoint) *
                          100
                        }%`"
                      >
                        <div class="relative-position fit" style="overflow: hidden">
                          <div
                            class="background-bar-progress-gachapon"
                            :class="
                              showGachaStandardDetail.guaranteePoint >=
                              showGachaStandardDetail.maxGuaranteePoint
                                ? 'progress-active-green'
                                : ''
                            "
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center text-count-bar-gachapon text-16-mobile font-mali-b"
                      :class="
                        showGachaStandardDetail.guaranteePoint >=
                        showGachaStandardDetail.maxGuaranteePoint
                          ? 'text-active-bar'
                          : ''
                      "
                    >
                      {{
                        `${showGachaStandardDetail.guaranteePoint}/${showGachaStandardDetail.maxGuaranteePoint}`
                      }}
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Button Open Gachapon -->
                <div class="absolute-center box-button-gacha-open">
                  <q-img
                    src="/images/button_main/button-gacha-pon-open.png"
                    no-spinner
                    no-transition
                    class="button-active-main"
                    :class="
                      isDisableButtonTutorialFirstTime
                        ? 'disable'
                        : selectCurrentGachaBoxMobile != 2
                        ? 'disable'
                        : ''
                    "
                    @click="
                      selectCurrentGachaBoxMobile != 2
                        ? null
                        : funcSelectGachaBox(showGachaStandardDetail)
                    "
                  >
                    <div class="fit no-padding transparent">
                      <div class="relative-position fit row" style="padding: 0% 7%">
                        <div class="col"></div>
                        <div
                          class="col-1 relative-position self-center"
                          style="min-width: fit-content; padding-left: 7px"
                          align="left"
                        >
                          <div
                            class="text-number-of-key-and-coin text-24-mobile font-fredoka"
                          >
                            {{ funcFormatNumber(showGachaStandardDetail.price) }}
                          </div>

                          <q-img
                            class="icon-coin-button-gacha-open mobile absolute-center"
                            v-if="showGachaStandardDetail.name == 'standard'"
                            src="/images/icon_main/icon-coin.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <!-- #endregion -->

                <!-- #region Information -->
                <div
                  class="absolute-top-right button-active-main icon-information-mobile"
                  style="top: 2%; right: 4%"
                >
                  <q-img
                    src="/images/icon_main/icon-information.png"
                    no-spinner
                    no-transition
                    @click="funcSelectTypeOfInformation(showGachaStandardDetail.name)"
                  ></q-img>
                </div>
                <!-- #endregion -->
              </div>
            </q-img>

            <!-- #region Alert No enough -->
            <div
              class="absolute-bottom box-alert-no-enough-main"
              v-if="selectGachaBox?.type == 'standard' && isNoEnough"
            >
              <div
                class="relative-position fit animate__animated animation-duration-0-5s"
                :class="isNoEnough ? 'animate__fadeInDown' : 'animate__fadeOut'"
              >
                <div class="box-alert-no-enough row justify-center items-center">
                  <div class="col-1 self-center alert-no-enough-icon">
                    <q-img
                      src="/images/icon_main/icon-coin.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="self-center font-mali-m text-20-mobile">
                    <div>{{ `จำนวนเงินไม่เพียงพอ` }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Premium box -->
        <div
          class="absolute-center box-container-mobile"
          :class="[
            isShowDialogTutorialFirstTime
              ? funcShowBoxTutorial('premium')
              : selectCurrentGachaBoxMobile == 1
              ? 'z-max'
              : '',
          ]"
          v-touch-swipe.mouse="funcHandleSwiper"
        >
          <div
            class="relative-position animate__animated"
            :class="
              selectCurrentGachaBoxMobile == 0 || selectCurrentGachaBoxMobile == null
                ? 'animation-page-out-right'
                : currentStepPage == 'right'
                ? selectCurrentGachaBoxMobile == 1
                  ? 'animation-page-in-right'
                  : 'animation-page-out-left'
                : currentStepPage == 'left'
                ? selectCurrentGachaBoxMobile == 1
                  ? 'animation-page-in-left'
                  : 'animation-page-out-left'
                : ''
            "
          >
            <q-img
              :src="`/images/box_main/box-gacha-pon-premium.png`"
              no-spinner
              no-transition
            >
              <div class="fit transparent no-padding">
                <!-- #region Icon Box Gachapon -->
                <div class="absolute-center box-icon-gacha">
                  <q-img
                    :src="`/images/icon_main/icon-gacha-pon-box-premium.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- /#endregion -->

                <!-- #region Label Gachapon -->
                <div class="absolute-center box-label-gachapon">
                  <q-img
                    :src="`/images/label_main/label-gacha-pon-premium.png`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- #endregion -->

                <!-- #region News Gachapon -->
                <div class="absolute-center box-gacha-news">
                  <q-img
                    src="/images/box_main/box-gacha-pon-news.png"
                    no-spinner
                    no-transition
                  >
                    <div class="fit no-padding transparent">
                      <div class="relative-position fit box-content-news">
                        <div class="fit">
                          <div class="row justify-center">
                            <div class="col-1 self-center icon-time">
                              <q-img
                                src="/images/icon_main/icon-time.png"
                                no-spinner=""
                                no-transition=""
                              ></q-img>
                            </div>
                            <div class="self-center text-14-mobile" style="margin: 0% 3%">
                              {{ showGachaPremiumDetail.remaining }}
                            </div>
                            <div
                              class="col-12 text-rate-up-news text-10-mobile"
                              align="center"
                            >
                              เพิ่มอัตราการได้รับ !
                            </div>
                          </div>
                          <div class="full-width">
                            <div
                              class="row justify-center items-center full-width animate__animated animation-duration-0-5s"
                              :class="
                                isAnimationBoxNewsGachaSlide
                                  ? 'animation-show-slide-left'
                                  : 'aniamtion-out-slide-left'
                              "
                            >
                              <div
                                class="col-1 box-show-item-limited news"
                                v-for="(
                                  itemShowPremiumLimited, indexShowPremiumLimited
                                ) in showGachaPremiumDetail.limitedList[
                                  currentIndexBoxNewsGacha
                                ]"
                                :key="indexShowPremiumLimited"
                              >
                                <q-img
                                  src="/images/button_main/button-item-limited-blank.png"
                                  no-spinner=""
                                  no-transition=""
                                >
                                  <div class="fit no-padding transparent">
                                    <div
                                      class="absolute-center"
                                      style="
                                        top: 48%;
                                        width: 75%;
                                        border-radius: 0.5rem;
                                        overflow: hidden;
                                      "
                                    >
                                      <q-img
                                        width="100%"
                                        :src="`${pathStorage}${itemShowPremiumLimited.itemName}.png`"
                                        no-spinner
                                        no-transition
                                      ></q-img>
                                    </div>
                                  </div>
                                </q-img>
                              </div>
                            </div>
                          </div>
                          <div class="absolute-bottom full-width" style="bottom: 10%">
                            <div class="col-12 self-end relative-position">
                              <div
                                class="row justify-center absolute-center full-width"
                                align="center"
                              >
                                <div
                                  class="col-1 button-icon-page news"
                                  v-for="(
                                    itemBoxNewsGacha, indexBoxNewsGacha
                                  ) in showGachaPremiumDetail.limitedList"
                                  :class="
                                    isDisableButtonTutorialFirstTime ? 'disable' : ''
                                  "
                                >
                                  <q-img
                                    @click="funcSelectNewGachaList(indexBoxNewsGacha)"
                                    :src="`/images/icon_main/icon-pagination-circle-page${
                                      indexBoxNewsGacha == currentIndexBoxNewsGacha
                                        ? '-current'
                                        : ''
                                    }.png`"
                                    no-spinner=""
                                    no-transition=""
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

                <!-- #region Progress bar gachapon -->
                <div class="absolute-center box-progress-bar-gachapon" align="center">
                  <div class="text-12-mobile">
                    <span>
                      {{
                        `การันตีชุด Limited เมื่อสุ่มครบ ${showGachaPremiumDetail.maxGuaranteePoint} ครั้ง`
                      }}
                    </span>
                  </div>
                  <div class="relative-position" style="width: 80%; margin: 2.5% 0%">
                    <div class="box-count-bar-gachapon relative-position">
                      <div
                        class="box-background-bar-progress-gachapon absolute-top-left"
                        :style="`width: ${
                          (showGachaPremiumDetail.guaranteePoint /
                            showGachaPremiumDetail.maxGuaranteePoint) *
                          100
                        }%`"
                      >
                        <div class="relative-position fit" style="overflow: hidden">
                          <div
                            class="background-bar-progress-gachapon"
                            :class="
                              showGachaPremiumDetail.guaranteePoint >=
                              showGachaPremiumDetail.maxGuaranteePoint
                                ? 'progress-active-green'
                                : ''
                            "
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="absolute-center text-count-bar-gachapon text-16-mobile font-mali-b"
                      :class="
                        showGachaPremiumDetail.guaranteePoint >=
                        showGachaPremiumDetail.maxGuaranteePoint
                          ? 'text-active-bar'
                          : ''
                      "
                    >
                      {{
                        `${showGachaPremiumDetail.guaranteePoint}/${showGachaPremiumDetail.maxGuaranteePoint}`
                      }}
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Button Open Gachapon -->
                <div class="absolute-center box-button-gacha-open">
                  <q-img
                    src="/images/button_main/button-gacha-pon-open.png"
                    no-spinner
                    no-transition
                    class="button-active-main"
                    :class="
                      isDisableButtonTutorialFirstTime
                        ? 'disable'
                        : selectCurrentGachaBoxMobile != 1
                        ? 'disable'
                        : ''
                    "
                    @click="
                      selectCurrentGachaBoxMobile != 1
                        ? null
                        : funcSelectGachaBox(showGachaPremiumDetail)
                    "
                  >
                    <div class="fit no-padding transparent">
                      <div class="relative-position fit row" style="padding: 0% 7%">
                        <div class="col"></div>
                        <div
                          class="col-1 relative-position self-center"
                          style="min-width: fit-content; padding-left: 7px"
                          align="left"
                        >
                          <div
                            class="text-number-of-key-and-coin text-24-mobile font-fredoka"
                          >
                            {{ funcFormatNumber(showGachaPremiumDetail.price) }}
                          </div>

                          <q-img
                            class="icon-key-button-gacha-open mobile absolute-center"
                            src="/images/icon_main/icon-gacha-pon-key.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <!-- #endregion -->

                <!-- #region Information -->
                <div
                  class="absolute-top-right button-active-main icon-information-mobile"
                  style="top: 2%; right: 4%"
                >
                  <q-img
                    src="/images/icon_main/icon-information.png"
                    no-spinner
                    no-transition
                    @click="funcSelectTypeOfInformation(showGachaPremiumDetail.name)"
                  ></q-img>
                </div>
                <!-- #endregion -->
              </div>
            </q-img>

            <!-- #region Alert No enough -->
            <div
              class="absolute-bottom box-alert-no-enough-main"
              v-if="selectGachaBox?.type == 'premium' && isNoEnough"
            >
              <div
                class="relative-position fit animate__animated animation-duration-0-5s"
                :class="isNoEnough ? 'animate__fadeInDown' : 'animate__fadeOut'"
              >
                <div class="box-alert-no-enough row justify-center items-center">
                  <div class="col-1 self-center alert-no-enough-icon">
                    <q-img
                      src="/images/icon_main/icon-gacha-pon-key.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="self-center font-mali-m text-20-mobile">
                    <div>
                      {{ `จำนวนกุญแจไม่เพียงพอ` }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Backdrop  -->
        <div
          class="absolute-full backdrop"
          v-if="!isShowGachaBox"
          style="transition: background-color 1s"
        ></div>
        <!-- #endregion -->

        <!-- #region Button Tutorial Open Gacha -->
        <div
          class="absolute-center box-container-mobile"
          :class="funcShowBoxTutorial('button-box-gacha')"
          v-if="isShowDialogTutorialFirstTime && currentTutorialData.isOpenBox"
        >
          <q-img src="/images/box_main/box-gacha-pon-empty.png" no-spinner no-transition>
            <div class="fit transparent no-padding">
              <div class="absolute-center box-button-gacha-open">
                <q-img
                  src="/images/button_main/button-gacha-pon-open.png"
                  no-spinner
                  no-transition
                  @click="funcGetGachaponBox()"
                >
                  <div class="fit no-padding transparent">
                    <div class="relative-position fit row" style="padding: 0% 7%">
                      <div class="col"></div>
                      <div
                        class="col-1 relative-position self-center"
                        style="min-width: fit-content; padding-left: 7px"
                        align="left"
                      >
                        <div
                          class="text-number-of-key-and-coin text-24-mobile font-fredoka"
                        >
                          {{ funcFormatNumber(currentBoxGachaData.price) }}
                        </div>

                        <!-- #region Icon key -->
                        <q-img
                          class="icon-key-button-gacha-open mobile absolute-center"
                          v-if="currentBoxGachaData.name == 'premium'"
                          src="/images/icon_main/icon-gacha-pon-key.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <!-- #endregion -->

                        <!-- #region Icon coin -->
                        <q-img
                          class="icon-coin-button-gacha-open mobile absolute-center"
                          v-if="currentBoxGachaData.name == 'standard'"
                          src="/images/icon_main/icon-coin.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <!-- #endregion -->
                      </div>
                    </div>
                  </div>
                </q-img>
              </div>
            </div>
          </q-img>

          <!-- #region Hand -->
          <div class="absolute-bottom-right" style="bottom: 60px; right: -20px">
            <div style="transform: rotateY(180deg); transform-origin: center">
              <q-img
                class="animation-hand-right"
                width="60px"
                src="/images/icon_main/icon-tutorial-hand-right.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Arrow Left & Right -->
        <!-- #region Arrow Left -->
        <div
          class="absolute-center box-container-mobile"
          style="top: 48%"
          v-if="selectCurrentGachaBoxMobile != 0 && selectCurrentGachaBoxMobile != null"
          :class="isShowDialogTutorialFirstTime ? '' : 'z-max'"
        >
          <q-img
            src="/images/icon_main/icon-gacha-pon-arrow-left.png"
            no-spinner
            no-transition
            @click="
              selectCurrentGachaBoxMobile == 0
                ? null
                : funcSelectPageGachaMobile('decrement', 'left')
            "
            class="absolute button-active-main icon-arrow-left"
          ></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Arrow Right -->
        <div
          class="absolute-center box-container-mobile"
          style="top: 48%"
          v-if="selectCurrentGachaBoxMobile != 2"
          :class="isShowDialogTutorialFirstTime ? '' : 'z-max'"
        >
          <div>
            <q-img
              src="/images/icon_main/icon-gacha-pon-arrow-right.png"
              no-spinner
              no-transition
              @click="
                selectCurrentGachaBoxMobile == 2
                  ? null
                  : funcSelectPageGachaMobile('increment', 'right')
              "
              class="absolute button-active-main icon-arrow-right"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->
        <!-- #endregion -->

        <!-- #region Backdrop Tutorial -->
        <div
          class="absolute-full backdrop"
          v-if="isShowDialogTutorialFirstTime && !isShowGachaBox"
          style="transition: background-color 1s"
        ></div>
        <!-- #endregion -->

        <!-- #region Tutorial Mobile -->
        <div
          class="fit absolute-center"
          :class="[
            currentTutorialData.isOpenBox ? '' : !isLastTutorialList ? 'z-max' : '',
            isLastTutorialList ? 'z-max backdrop' : '',
          ]"
          v-if="isShowDialogTutorialFirstTime"
        >
          <div
            class="relative-position fit animate__animated animation-duration-0-3s"
            :class="
              isShowGachaBox
                ? currentTutorialData.tutorialBarPosition.includes('bottom')
                  ? 'animate__fadeOutDown'
                  : 'animate__fadeOutUp'
                : currentTutorialData.tutorialBarPosition.includes('bottom')
                ? 'animate__fadeInUp'
                : 'animate__fadeInDown'
            "
          >
            <div :class="currentTutorialData.tutorialBarPosition">
              <div class="relative-position box-tutorial-main row">
                <!-- #region Winny Character  -->
                <div
                  class="col-1 relative-position"
                  style="width: 100px"
                  align="center"
                  v-if="!isLastTutorialList"
                >
                  <q-img
                    class="absolute-center"
                    style="width: 96px"
                    :style="
                      currentTutorialData.tutorialBarPosition.includes('bottom')
                        ? 'top: 20px'
                        : ''
                    "
                    src="/images/ai_character_main/winny-character-tutorial-mobile.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <!-- #endregion -->

                <!-- #region Content -->
                <div class="col" style="padding: 5px 5px 5px 10px; line-height: 1.7">
                  <div class="text-tutorial text-white font-mali-b" style="width: 100%">
                    <div class="f14" v-html="currentTutorialData.text"></div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Button -->
                <div class="col-12" align="right" v-if="currentTutorialData.isNextButton">
                  <div
                    style="width: 73px"
                    v-if="currentStepTutorial < tutorialFirstList.length - 1"
                  >
                    <q-img
                      class="cursor-pointer button-active-main"
                      src="/images/button_main/button-tutorial-next.png"
                      no-spinner
                      no-transition
                      @click="funcNextStepTutorial()"
                    ></q-img>
                  </div>

                  <div
                    style="width: 130px"
                    :style="currentTutorialData.positionButtonNext"
                    v-if="currentStepTutorial + 1 == tutorialFirstList.length"
                  >
                    <q-img
                      class="cursor-pointer button-active-main"
                      src="/images/button_main/button-tutorial-finish.png"
                      no-spinner
                      no-transition
                      @click="funcFinishTutorial()"
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
            </div>
          </div>

          <div
            class="absolute-center"
            v-if="isLastTutorialList"
            style="max-width: 420px; width: 100%; min-width: 360px"
          >
            <q-img
              src="/images/ai_character_main/winny-character-tutorial.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region Choose & Get Limited -->
      <div class="absolute-center fit z-max" v-if="isShowDialogChooseLimited">
        <div class="relative-position fit">
          <!-- #region Show Character -->
          <div
            class="box-gacha-choose-character-mobile relative-position animate__animated animation-duration-0-5s"
            :class="
              !isShowGachaBox && isShowDialogChooseLimited
                ? 'animate__fadeInLeft'
                : 'animate__fadeOutRight'
            "
          >
            <!-- #region Label Choose Item Limited -->
            <div class="absolute-center label-gacha-choose-limited-mobile">
              <q-img
                src="/images/label_main/label-gacha-pon-choose-limited.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->

            <div class="fit row justify-center items-center">
              <div style="width: 75%">
                <mock-character
                  :equipment="selectedLimitedItem"
                  :isGetCostume="true"
                ></mock-character>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Choose Item Box -->
          <div
            class="box-gacha-choose-item-menu-mobile relative-position animate__animated animation-duration-0-5s"
            :class="
              !isShowGachaBox && isShowDialogChooseLimited
                ? 'animate__fadeInRight'
                : 'animate__fadeOutLeft'
            "
          >
            <div
              class="row"
              style="
                max-width: 360px;
                width: 100%;
                height: 100%;
                margin: auto;
                padding: 8px 7px;
              "
              v-if="showLimitedRateUpDetail.rateUpCostumesPageList.length"
            >
              <div
                class="col-4"
                align="center"
                style="padding: 1%"
                v-for="(itemRateUpLimited, indexRateUpLimited) in showLimitedRateUpDetail
                  .rateUpCostumesPageList[currentCostumesPage - 1]"
                :key="indexRateUpLimited"
              >
                <div class="">
                  <q-img
                    class="button-active-main item-limited-mobile"
                    :src="`/images/button_main/button-shop-item${
                      selectedLimitedItem == null
                        ? ''
                        : selectedLimitedItem.itemName == itemRateUpLimited.itemName
                        ? '-selected'
                        : ''
                    }.png`"
                    :class="funcCheckItemInInventory(itemRateUpLimited) ? 'disable' : ''"
                    no-spinner
                    no-transition
                    @click="
                      funcCheckItemInInventory(itemRateUpLimited)
                        ? null
                        : (selectedLimitedItem = itemRateUpLimited)
                    "
                  >
                    <div class="fit no-padding transparent">
                      <div
                        class="absolute-center text-black fit full-width"
                        style="padding: 4% 0%"
                        align="center"
                      >
                        <q-img
                          width="90%"
                          src="/images/button_main/button-item-blank.png"
                          no-spinner
                          no-transition
                        >
                          <div class="fit no-padding transparent">
                            <div
                              class="absolute-center"
                              style="width: 70%; border-radius: 0.2rem; overflow: hidden"
                            >
                              <q-img
                                :src="`${pathStorage}${itemRateUpLimited.itemName}.png`"
                                no-spinner
                                no-transition
                                v-if="itemRateUpLimited.itemName != 'coin'"
                              ></q-img>
                              <q-img
                                src="/images/icon_main/icon-item-coin.png"
                                no-spinner
                                no-trasnsition
                                v-if="itemRateUpLimited.itemName == 'coin'"
                              >
                              </q-img>
                            </div>
                          </div>
                        </q-img>
                      </div>
                      <div
                        class="absolute-bottom"
                        style="width: 80%; bottom: 6px; left: 10px"
                        align="left"
                      >
                        <div
                          class="font-mali-r"
                          align="left"
                          style="
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            color: #4a261b;
                          "
                        >
                          <div v-if="itemRateUpLimited.itemName != 'coin'">
                            {{ `${itemRateUpLimited.itemNameTh}` }}
                          </div>
                          <div v-if="itemRateUpLimited.itemName == 'coin'">
                            {{ `เหรียญ ${itemRateUpLimited.amount}` }}
                          </div>
                        </div>
                      </div>

                      <div
                        class="fit absolute-center row justify-center items-center no-padding"
                        style="
                          border-radius: 0.5rem;
                          background-color: rgba(0, 0, 0, 0.8);
                        "
                        v-if="funcCheckItemInInventory(itemRateUpLimited)"
                      >
                        <div class="col-12">
                          <div style="width: 53.96%">
                            <q-img
                              src="/images/icon_main/icon-check-has-item.png"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                          <div class="col-12 text-check-has-item">
                            {{ `Already have it` }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>

              <div class="col-12" style="height: 120px"></div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Footer Choose Limited -->
          <div class="absolute-bottom full-width">
            <div
              class="box-footer-choose-mobile animate__animated animation-duration-0-5s animate__delay-1s"
              :class="
                !isShowGachaBox && isShowDialogChooseLimited
                  ? 'animate__fadeInUp'
                  : 'animate__fadeOutDown'
              "
              v-if="showLimitedRateUpDetail.rateUpCostumesPageList.length"
            >
              <div class="box-footer-pagination-mobile">
                <div class="row font-mali-b">
                  <div
                    class="box-choose-button-pagination-mobile row justify-center items-center"
                  >
                    <div
                      class="choose-button-text-pagination-mobile"
                      :class="currentCostumesPage == 1 ? 'disable' : ''"
                      @click="currentCostumesPage == 1 ? null : currentCostumesPage--"
                    >
                      {{ `<` }}
                    </div>
                  </div>
                  <div class="col row justify-center">
                    <div
                      class="col-1 relative-position box-choose-button-pagination-mobile row justify-center items-center"
                      v-for="i in showLimitedRateUpDetail.rateUpCostumesPageList.length"
                      align="center"
                      :class="
                        currentCostumesPage == i
                          ? ' selected '
                          : 'choose-button-text-pagination-mobile'
                      "
                      @click="currentCostumesPage = i"
                    >
                      <div>
                        {{ `${i}` }}
                      </div>
                    </div>
                  </div>
                  <div
                    class="box-choose-button-pagination-mobile row justify-center items-center"
                  >
                    <div
                      class="choose-button-text-pagination-mobile"
                      @click="
                        currentCostumesPage ==
                        showLimitedRateUpDetail.rateUpCostumesPageList.length
                          ? null
                          : currentCostumesPage++
                      "
                      :class="
                        currentCostumesPage ==
                        showLimitedRateUpDetail.rateUpCostumesPageList.length
                          ? 'disable'
                          : ''
                      "
                    >
                      {{ `>` }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative-position row justify-center">
                <div class="col-1 self-center button-active-main reset-mobile">
                  <q-img
                    src="/images/button_main/button-reset-equipment.png"
                    no-spinner
                    no-transition
                    @click="selectedLimitedItem = null"
                  ></q-img>
                </div>
                <div
                  class="col-1 self-center button-active-main button-choose-get-limited-mobile"
                  :class="selectedLimitedItem == null ? 'disable' : ''"
                >
                  <q-img
                    :src="`/images/button_main/button-gacha-choose-get-limited${
                      selectedLimitedItem == null ? '-disable' : ''
                    }.png`"
                    no-spinner
                    no-transition
                    @click="funcShowDialogConfirmGetRateUpLimited()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #region Header Button Back -->
        <div
          class="absolute-top-left button-active-main icon-back-mobile"
          style="top: 1%; left: 2%"
        >
          <div
            class="relative-position animate__animated"
            :class="
              !isShowGachaBox && isShowDialogChooseLimited
                ? 'animate__fadeInDown'
                : 'animate__fadeOutUp'
            "
          >
            <q-img
              src="/images/icon_main/icon-back.png"
              no-spinner
              no-transition
              @click="(isShowDialogChooseLimited = false), (selectedLimitedItem = null)"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Tutorial -->
  <dialog-tutorial
    :isDialogTutorial="isShowDialogTutorial"
    v-if="isShowDialogTutorial"
    @callback-closeDialog="isShowDialogTutorial = false"
  ></dialog-tutorial>
  <!-- #endregion -->

  <!-- #region Dialog Confirm Get Limited -->
  <q-dialog
    persistent=""
    v-model="isShowDialogConfirmGetLimited"
    maximized=""
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-confirm-container">
          <div class="fit dialog-confirm-sub-content">
            <div>
              <div
                class="col-12 self-center font-mali-b q-pa-md text-20-mobile"
                align="center"
              >
                {{ `แลกรางวัลพิเศษ` }}
              </div>
              <div class="col-12 self-center f16">
                <div class="dialog-confirm-content font-mali-m">
                  <div v-html="`ยืนยันใช้คะแนนสะสมทั้งหมด <br> แลกของรางวัลพิเศษ`"></div>
                </div>
              </div>
              <div class="col-12 q-pt-md q-pb-sm row justify-between self-center">
                <div>
                  <q-img
                    width="133px"
                    class="cursor-pointer"
                    src="/images/button_main/button-gacha-cancel-get-limited.png"
                    v-close-popup
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div>
                  <q-img
                    width="133px"
                    class="cursor-pointer"
                    src="/images/button_main/button-gacha-confirm-get-limited.png"
                    no-spinner
                    no-transition
                    @click="funcConfirmGetRateUpLimited()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Item Reward -->
  <q-dialog
    v-model="isShowDialogItemReward"
    maximized=""
    :seamless="showItemReward.isLimited"
    persistent
    class="z-max"
    style="background-color: rgba(0, 0, 0, 0.3)"
    transition-show="scale"
    transition-hide="fade"
  >
    <q-card class="transparent shadow-0" style="overflow: hidden">
      <q-card-section
        class="row fit justify-center items-center no-padding"
        style="margin: auto"
      >
        <div
          class="absolute-center row background-gacha-reward"
          align="center"
          style="max-width: 1600px; width: 100%; min-width: 1000px; height: 100vh"
          v-if="showItemReward != null"
        >
          <div class="absolute-center fit" v-if="!$q.platform.is.desktop">
            <div
              class="fit relative-position animation-background-light"
              style="opacity: 0"
            ></div>
          </div>

          <div class="col-12 self-center relative-position">
            <!-- #region text ever get item -->
            <div
              class="font-mali-b"
              :class="$q.platform.is.desktop ? 'text-reward' : 'text-reward-mobile'"
              v-if="!showItemReward.isNewReward"
            >
              เคยได้รับแล้ว
            </div>
            <!-- #endregion -->

            <!-- #region Item -->
            <div
              class="relative-position"
              :class="
                $q.platform.is.desktop ? 'box-item-reward' : 'box-item-reward-mobile'
              "
            >
              <div class="absolute-center box-light-reward">
                <q-img
                  class="animation-light-reward"
                  src="/images/gacha_main/gacha-light-reward.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <q-img
                :src="`/images/button_main/button-item${
                  showItemReward.item.grade == 'common'
                    ? ''
                    : `-${showItemReward.item.grade}`
                }-blank.png`"
                no-spinner
                no-transition
              >
                <div class="fit no-padding row justify-center items-center transparent">
                  <div
                    class="relative-position"
                    style="
                      width: 75%;
                      height: 70%;
                      overflow: hidden;
                      border-radius: 0.5rem;
                    "
                  >
                    <div class="absolute-center" style="width: 100%">
                      <q-img
                        :src="`${pathStorage}${showItemReward.item.itemName}.${showItemReward.item.itemExtension}`"
                        no-spinner=""
                        no-transition=""
                        v-if="
                          showItemReward.item.type != 'coin' &&
                          showItemReward.item.itemName != 'premiumKey'
                        "
                      ></q-img>
                      <q-img
                        v-if="showItemReward.item.type == 'coin'"
                        src="/images/icon_main/icon-item-coin.png"
                        no-spinner
                        no-transition
                      ></q-img>
                      <q-img
                        no-spinner=""
                        no-transition=""
                        src="/images/icon_main/icon-mystery-box-key.png"
                        v-if="showItemReward.item.itemName == 'premiumKey'"
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-img>

              <div
                :class="itemStar.absolute"
                :style="`top: ${itemStar.position.top}; left:${itemStar.position.left}; right:${itemStar.position.right}; width: ${itemStar.width}`"
                v-for="(itemStar, indexStar) in starRewardList"
                :key="indexStar"
              >
                <div
                  class="animation-star-reward"
                  :style="`animation-delay:0.${indexStar * 0.5}s`"
                >
                  <q-img
                    src="/images/gacha_main/gacha-star-reward.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Text -->
            <div
              align="center"
              class="text-white font-mali-b"
              :class="
                $q.platform.is.desktop ? 'text-reward-item' : 'text-reward-item-mobile'
              "
            >
              <div
                v-if="
                  showItemReward.item.type != 'coin' &&
                  showItemReward.item.itemName != 'premiumKey'
                "
              >
                {{ `ได้รับ  ${showItemReward.item.itemNameTh}` }}
                <div class="f12 font-mali-b q-mt-sm" v-if="showItemReward.isNewReward">
                  {{ `เช็คของรางวัลได้ที่หน้า Equipment` }}
                </div>
                <div
                  v-if="!showItemReward.isExchangeReward && !showItemReward.isNewReward"
                  class="f12 row justify-center font-mali-b q-mt-sm"
                  align="center"
                >
                  <div class="self-end">
                    {{ `รางวัลที่เคยได้รับจะเปลี่ยนเป็น ` }}
                  </div>
                  <div v-if="!showItemReward.isLimited" class="q-pl-xs q-mx-xs self-end">
                    <q-img
                      src="/images/icon_main/icon-coin.png"
                      no-spinner
                      no-transition
                      width="16px"
                    ></q-img>
                  </div>
                  <div class="self-end q-mx-xs">
                    <div v-if="showItemReward.isLimited">
                      {{ ` ${showItemReward.earnPoint} คะแนนสะสม` }}
                    </div>
                    <div v-else>
                      {{ ` ${showItemReward.compensation}` }}
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="showItemReward.item.type == 'coin'">
                {{
                  `ได้รับ  ${showItemReward.item.rarity.label} ${showItemReward.item.amount}`
                }}
              </div>
              <div v-if="showItemReward.item.itemName == 'premiumKey'">
                {{ `ได้รับ กุญแจกล่อง Premium` }}
              </div>
              <div v-if="showItemReward.isExchangeReward">
                <div
                  class="row justify-center fit f12 text-limited-seccess-point"
                  style="margin-top: 0.5%"
                >
                  {{ `คะแนนสะสมเต็มแล้ว กรุณาแลกของรางวัล` }}
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Button -->
            <div class="full-width">
              <div v-if="showItemReward.isExchangeReward">
                <q-img
                  src="/images/button_main/button-next-to-exchange-reward.png"
                  no-spinner
                  no-transition
                  class="button-active-main"
                  :class="
                    $q.platform.is.desktop
                      ? 'button-change-coin'
                      : 'button-change-coin-mobile'
                  "
                  @click="funcCloseItemReward()"
                >
                </q-img>
              </div>

              <div v-else>
                <q-img
                  src="/images/button_main/button-draw-again.png"
                  class="button-active-main"
                  :class="
                    $q.platform.is.desktop
                      ? 'button-draw-again'
                      : 'button-draw-again-mobile'
                  "
                  style="margin: 0% 0.3%"
                  @click="funcDrawAgain()"
                  no-spinner
                  no-transition
                  v-if="
                    !selectGachaBox?.isChooseLimited && !isShowDialogTutorialFirstTime
                  "
                ></q-img>
                <q-img
                  src="/images/button_main/button-gacha-ok.png"
                  class="button-active-main"
                  :class="$q.platform.is.desktop ? 'button-ok' : 'button-ok-mobile'"
                  no-spinner
                  no-transition
                  @click="funcCloseItemReward()"
                  style="margin: 0% 0.3%"
                ></q-img>

                <!-- <q-img
                  src="/images/button_main/button-gacha-change-coin.png"
                  class="button-active-main"
                  :class="
                    $q.platform.is.desktop
                      ? 'button-change-coin'
                      : 'button-change-coin-mobile'
                  "
                  no-spinner
                  no-transition
                  @click="funcCloseItemReward()"
                  v-if="!showItemReward.isNewReward"
                >
                  <div class="fit no-padding transparent">
                    <div
                      class="absolute-center font-mali-b"
                      style="width: 100%; top: 46%"
                    >
                      <div
                        class="row justify-center fit"
                        v-if="!showItemReward.isLimited"
                      >
                        <div class="col self-center" style="margin-top: 1%" align="right">
                          {{ `เปลี่ยนเป็น` }}
                        </div>
                        <q-space></q-space>
                        <div
                          class="self-center col-1"
                          style="width: 16.67%; margin: 0% 5%"
                        >
                          <q-img
                            src="/images/icon_main/icon-coin.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="self-center"
                          style="padding-right: 7%; margin-top: 1%"
                        >
                          {{ `${showItemReward.compensation}` }}
                        </div>
                      </div>

                      <div class="row justify-center fit" style="margin-top: 2.5%" v-else>
                        {{ `ได้รับ ${showItemReward.earnPoint} คะแนนสะสม` }}
                      </div>
                    </div>
                  </div>
                </q-img> -->
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Alert No enough -->
            <div class="relative-position">
              <div
                class="absolute-top"
                style="width: 100%; margin: 1.5% auto"
                v-if="isDrawAgainNoEnough"
              >
                <div
                  class="box-alert-no-enough-show-item-main row items-center justify-center animate__animated animation-duration-0-5s animate__fadeIn"
                >
                  <div class="col-12 self-center relative-position fit">
                    <div
                      class="box-alert-no-enough-show-item row justify-center items-center"
                    >
                      <div class="col-1 self-center alert-no-enough-icon">
                        <q-img
                          src="/images/icon_main/icon-gacha-pon-key.png"
                          no-spinner
                          no-transition
                          v-if="selectGachaBox?.type == 'premium'"
                        ></q-img>
                        <q-img
                          src="/images/icon_main/icon-coin.png"
                          no-spinner
                          no-transition
                          v-if="selectGachaBox?.type == 'standard'"
                        ></q-img>
                      </div>
                      <div class="self-center font-mali-m">
                        <div v-if="selectGachaBox?.type == 'premium'">
                          {{ `จำนวนกุญแจไม่เพียงพอ` }}
                        </div>
                        <div v-if="selectGachaBox?.type == 'standard'">
                          {{ `จำนวนเงินไม่เพียงพอ` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Information Rate up Limited -->
  <q-dialog
    v-model="isShowDialogInformationRateUpLimited"
    maximized=""
    persistent
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position">
          <div class="absolute-center box-dialog-container">
            <div class="relative-position fit">
              <!-- #region Box content -->
              <div class="box-dialog-body">
                <div class="box-dialog-content">
                  <!-- #region Menu -->
                  <div class="box-dialog-menu row">
                    <div
                      class="col-1 box-dialog-button-menu row justify-center items-center"
                      :class="selectedMenuInformation == 1 ? 'selected' : ''"
                      @click="funcSelectMenuInformation(1)"
                    >
                      <div class="font-mali-b">รายละเอียด</div>
                    </div>
                    <div
                      class="col-1 box-dialog-button-menu row justify-center items-center"
                      :class="selectedMenuInformation == 2 ? 'selected' : ''"
                      @click="funcSelectMenuInformation(2)"
                    >
                      <div
                        class="font-mali-b"
                        v-if="selectedTypeOfInformation == 'rate-up'"
                      >
                        ชุดที่แลกได้
                      </div>
                      <div class="font-mali-b" v-else>อัตราการได้รับ</div>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region Content -->
                  <div class="box-dialog-scroll-container">
                    <div class="box-dialog-scroll-content font-mali-r">
                      <!-- #region menu 1 -->
                      <div v-if="selectedMenuInformation == 1">
                        <div class="text-dialog-14-information">
                          <div v-html="showDetailInformation.informationDetails"></div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region menu 2 -->
                      <div class="" v-if="selectedMenuInformation == 2">
                        <!-- #region Choose Limited Rate-up -->
                        <div v-if="selectedTypeOfInformation == 'rate-up'">
                          <div>
                            <div class="font-mali-sb text-dialog-14-information">
                              <div>
                                {{ `• ชุด Limited` }}
                              </div>
                            </div>
                            <div>
                              <div
                                class="row box-item-information-container"
                                v-for="(
                                  itemLimiteRate, indexLimitedRate
                                ) in showLimitedRateUpDetail.exchangableCostumes"
                              >
                                <div class="col-1 button-item-information">
                                  <q-img
                                    :src="`/images/button_main/button-item${
                                      itemLimiteRate.grade != 'common'
                                        ? `-${itemLimiteRate.grade}`
                                        : ''
                                    }-blank.png`"
                                    no-spinner
                                    no-transition
                                  >
                                    <div
                                      class="fit no-padding row justify-center items-center transparent"
                                    >
                                      <div
                                        class="relative-position"
                                        style="
                                          width: 75%;
                                          height: 70%;
                                          overflow: hidden;
                                          border-radius: 0.5rem;
                                        "
                                      >
                                        <div class="absolute-center" style="width: 100%">
                                          <q-img
                                            :src="`${pathStorage}${itemLimiteRate.itemName}.${itemLimiteRate.itemExtension}`"
                                            no-spinner=""
                                            no-transition=""
                                            v-if="itemLimiteRate.itemName != 'coin'"
                                          ></q-img>
                                          <q-img
                                            v-else
                                            src="/images/icon_main/icon-item-coin.png"
                                            no-spinner
                                            no-transition
                                          ></q-img>
                                        </div>
                                      </div>
                                    </div>
                                  </q-img>
                                </div>
                                <div
                                  class="col self-center text-item-information"
                                  align="center"
                                >
                                  <div v-if="itemLimiteRate.itemName != 'coin'">
                                    {{ `${itemLimiteRate.itemNameTh}` }}
                                  </div>
                                  <div v-else>
                                    {{
                                      `${itemLimiteRate.name} ${itemLimiteRate.amount}`
                                    }}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <!-- Coin -->
                            <div class="font-mali-sb text-dialog-14-information">
                              <div>
                                {{ `• เหรียญ` }}
                              </div>

                              <div class="row box-item-information-container">
                                <div class="col-1 button-item-information">
                                  <q-img
                                    :src="`/images/button_main/button-item-blank.png`"
                                    no-spinner
                                    no-transition
                                  >
                                    <div
                                      class="fit no-padding row justify-center items-center transparent"
                                    >
                                      <div
                                        class="relative-position"
                                        style="
                                          width: 75%;
                                          height: 70%;
                                          overflow: hidden;
                                          border-radius: 0.5rem;
                                        "
                                      >
                                        <div class="absolute-center" style="width: 100%">
                                          <q-img
                                            src="/images/icon_main/icon-item-coin.png"
                                            no-spinner
                                            no-transition
                                          ></q-img>
                                        </div>
                                      </div>
                                    </div>
                                  </q-img>
                                </div>
                                <div
                                  class="col self-center text-item-information"
                                  align="center"
                                >
                                  <div>
                                    {{ `เหรียญ 300` }}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->

                        <!-- #region Choose Limited Not Rate-up -->
                        <div v-if="selectedTypeOfInformation != 'rate-up'">
                          <div
                            class="font-mali-sb text-dialog-16-information"
                            style="margin-bottom: 4%"
                          >
                            {{
                              `โอกาสได้รับจากกล่อง ${funcFormatStringUpperCase(
                                selectedTypeOfInformation
                              )}`
                            }}
                          </div>

                          <div
                            v-for="(
                              itemRateList, indexRateList
                            ) in showDetailInformation.rateDetail"
                          >
                            <div v-if="itemRateList.items.length">
                              <div class="font-mali-sb text-dialog-14-information">
                                <div>
                                  {{ `• ${itemRateList.rarity} ` }}
                                </div>
                              </div>
                              <div class="font-mali-r row">
                                <div class="q-pr-xs">
                                  <span class="text-dialog-12-information">{{
                                    `อัตราการได้รับ `
                                  }}</span>
                                  <span class="font-mali-sb text-dialog-16-information">{{
                                    ` ${funcFormatToFixed(itemRateList.itemRate, 4)}%`
                                  }}</span>
                                </div>

                                <div class="q-pr-xs">
                                  <span class="text-dialog-12-information">{{
                                    `รวมทั้งหมด `
                                  }}</span>
                                  <span class="font-mali-sb text-dialog-16-information">{{
                                    ` ${funcFormatToFixed(itemRateList.rate, 4)}%`
                                  }}</span>
                                </div>
                              </div>
                              <div
                                v-for="(
                                  itemRateDetail, indexRateDetail
                                ) in itemRateList.items"
                                :key="indexRateDetail"
                              >
                                <div class="row box-item-information-container">
                                  <div class="col-1 button-item-information">
                                    <q-img
                                      :src="`/images/button_main/button-item${
                                        itemRateDetail.grade == 'common'
                                          ? ''
                                          : `-${itemRateDetail.grade}`
                                      }-blank.png`"
                                      no-spinner
                                      no-transition
                                    >
                                      <div
                                        class="fit no-padding row justify-center items-center transparent"
                                      >
                                        <div
                                          class="relative-position"
                                          style="
                                            width: 75%;
                                            height: 70%;
                                            overflow: hidden;
                                            border-radius: 0.5rem;
                                          "
                                        >
                                          <div
                                            class="absolute-center"
                                            style="width: 100%"
                                            align="center"
                                          >
                                            <q-img
                                              :src="`${pathStorage}${itemRateDetail.itemName}.${itemRateDetail.itemExtension}`"
                                              no-spinner=""
                                              no-transition=""
                                              v-if="
                                                itemRateDetail.itemName != 'premiumKey' &&
                                                itemRateDetail.type != 'coin'
                                              "
                                            ></q-img>
                                            <q-img
                                              v-if="itemRateDetail.type == 'coin'"
                                              src="/images/icon_main/icon-item-coin.png"
                                              no-spinner
                                              no-transition
                                            ></q-img>
                                            <q-img
                                              no-spinner=""
                                              no-transition=""
                                              src="/images/icon_main/icon-gacha-pon-key.png"
                                              width="70%"
                                              v-if="
                                                itemRateDetail.itemName == 'premiumKey'
                                              "
                                            ></q-img>
                                          </div>
                                        </div>
                                      </div>
                                    </q-img>
                                  </div>
                                  <div
                                    class="col self-center text-item-information"
                                    align="center"
                                  >
                                    <div v-if="itemRateDetail.type == 'coin'">
                                      {{
                                        `${itemRateList.rarity} ${itemRateDetail.amount}`
                                      }}
                                    </div>
                                    <div
                                      v-else-if="itemRateDetail.itemName == 'premiumKey'"
                                    >
                                      {{ `กุญแจกล่อง Premium` }}
                                    </div>
                                    <div v-else>
                                      {{ `${itemRateDetail.itemNameTh}` }}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>
                      <!-- #endregion -->
                    </div>
                  </div>
                  <!-- #endregion -->
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Button Close -->
              <div class="absolute-top-right button-active-main close">
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-spinner
                  no-transition
                  @click="funcCloseDialogInformation()"
                  v-close-popup
                ></q-img>
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm open box -->
  <q-dialog maximized persistent v-model="isShowWarningDialog" class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-confirm-container">
          <div class="fit dialog-confirm-sub-content">
            <div>
              <div
                class="col-12 self-center font-mali-b q-pa-md text-20-mobile"
                align="center"
              >
                {{
                  `เปิดกล่อง ${
                    selectGachaBox?.type == "standard" ? "Standard" : "Premium"
                  }`
                }}
              </div>
              <div class="col-12 self-center f16">
                <div class="dialog-confirm-content font-mali-m">
                  <div
                    v-html="
                      `ใช้ ${selectGachaBox?.price} เหรียญในการเปิดกล่อง ยืนยันที่จะเปิด?`
                    "
                    v-if="selectGachaBox?.type == 'standard'"
                  ></div>
                  <div
                    v-html="
                      `ใช้ ${selectGachaBox?.price} กุญแจกล่อง Premium <br> ในการเปิดกล่อง ยืนยันที่จะเปิด?`
                    "
                    v-else
                  ></div>
                </div>
              </div>
              <div class="q-py-md row">
                <div class="col-1 q-mx-xs" style="width: 32px">
                  <q-img
                    class="cursor-pointer"
                    :src="`/images/button_main/button-checklist${
                      isSkipWarningDialog ? '' : '-blank'
                    }.png`"
                    @click="funcCheckConfirmOpenBox()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col q-mx-xs self-center font-mali-m">
                  ไม่แสดงผลอีกในวันนี้
                </div>
              </div>
              <div class="col-12 q-mb-sm row justify-between self-center">
                <div>
                  <q-img
                    width="133px"
                    class="cursor-pointer"
                    src="/images/button_main/button-gacha-cancel-get-limited.png"
                    v-close-popup
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div>
                  <q-img
                    width="133px"
                    class="cursor-pointer"
                    src="/images/button_main/button-gacha-confirm-get-limited.png"
                    no-spinner
                    no-transition
                    @click="funcGetGachaponBox()"
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <dialog-loading :isShowLoading="isLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script setup>
import dialogTutorial from "components/dialog_main/tutorial.vue";
import mockCharacter from "components/character_main/mock-character.vue";
import backgroundMain from "components/background_main/background-gacha.vue";
import tutorialList from "src/js/tutorial-gacha.js";
import dialogLoading from "components/dialog-loading.vue";

import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { useRoute, useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { useMysteryBoxStore } from "src/stores/mystery-box";
import { useInventoryStore } from "src/stores/inventory";

// #region ***** Initial Data *****
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const mysteryBoxStore = useMysteryBoxStore();
const studentStore = useStudentStore();
const inventoryStore = useInventoryStore();
const systemStore = useSystemStore();

const isAnimationStart = ref(false);
const isAnimationOpenGacha = ref(false);
const isLoading = ref(true);

const pathStorage = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/"
);

const selectCurrentGachaBoxMobile = ref(null);
const currentStepPage = ref("left");

// #endregion

// #region ***** Data *****

// Boolearn
const isOpenGacha = ref(false);
const isShowDialogItemReward = ref(false);
const isShowGachaBox = ref(false);
const isShowDialogChooseLimited = ref(false);
const isShowDialogConfirmGetLimited = ref(false);
const isShowWarningDialog = ref(false);

// Dialog
const isShowDialogInformationRateUpLimited = ref(false);
const isShowDialogTutorial = ref(false);

// #endregion ***** Data *****

// #region ***** Animation Star Reward *****
const starRewardList = ref([
  {
    absolute: "absolute-top-left",
    position: {
      top: "7%",
      left: "-7%",
    },
    width: "5%",
  },
  {
    absolute: "absolute-top-left",
    position: {
      top: "17%",
      left: "4%",
    },
    width: "10%",
  },
  {
    absolute: "absolute-top-left",
    position: {
      top: "30%",
      left: "-5%",
    },
    width: "7%",
  },
  {
    absolute: "absolute-top-right",
    position: {
      top: "-9%",
      right: "7%",
    },
    width: "13%",
  },
  {
    absolute: "absolute-top-right",
    position: {
      top: "10%",
      right: "-8%",
    },
    width: "10%",
  },
]);
// #endregion ***** Animation Star Reward *****

// #region ***** Function *****

// #region Get Mystery Box
// Data
const currentCostumesPage = ref(1);
const funcGetMysteryBox = async () => {
  try {
    const response = await mysteryBoxStore.getMysteryBoxData();

    if (response !== "success") {
      throw new Error("error");
    }

    return "success";
  } catch (e) {
    $router.replace("/lobby");
    return "error";
  }
};
// #endregion

// #region Select Gachapon type
const isNoEnough = ref(false);
const showItemReward = ref({
  isLimited: false,
});
let listenTimeoutNoEnough = null;

const selectGachaBox = ref(null);

const funcSelectGachaBox = async (item) => {
  selectGachaBox.value = item;
  isSkipWarningDialog.value = false;

  if (isShowDialogTutorialFirstTime.value) {
    await funcGetGachaponBox();
    return;
  }

  if (mysteryBoxStore.isShowPremiumWarningDialog && item.type == "premium") {
    isShowWarningDialog.value = true;
  } else if (mysteryBoxStore.isShowStandardWarningDialog && item.type == "standard") {
    isShowWarningDialog.value = true;
  } else {
    await funcGetGachaponBox();
  }
};

const funcGetGachaponBox = async () => {
  if (isDisableButtonTutorialFirstTime.value) return;

  let gachaType = selectGachaBox.value.type;
  let gachaId = selectGachaBox.value.id;

  try {
    isShowWarningDialog.value = false;

    if (isOpenGacha.value) return;

    if (listenTimeoutNoEnough) {
      isNoEnough.value = false;
      clearTimeout(listenTimeoutNoEnough);
      listenTimeoutNoEnough = null;
    }

    if (isShowDialogTutorialFirstTime.value) {
      if (!currentTutorialData.value.isOpenBox) {
        return;
      }

      if (gachaType == "standard") {
        showItemReward.value = {
          item: {
            itemName: "premiumKey",
            itemNameTh: "กุญแจกล่อง Premium",
            grade: "limited",
            type: "premiumKey",
            amount: 1,
            rarity: {
              label: "Limited",
            },
          },
          isNewReward: true,
          isLimited: true,
          isExchangeReward: false,
        };

        isShowGachaBox.value = true;

        setTimeout(() => {
          isAnimationOpenGacha.value = true;
        }, 3000);
        return;
      }
    } else {
      if (gachaType == "standard") {
        if (Number(studentStore.coin) < Number(showGachaStandardDetail.value.price)) {
          isNoEnough.value = true;
          listenTimeoutNoEnough = setTimeout(() => {
            clearTimeout(listenTimeoutNoEnough);
            listenTimeoutNoEnough = null;
            isNoEnough.value = false;
          }, 3000);
          return;
        }
      } else {
        if (
          Number(studentStore.premiumKey) < Number(showGachaPremiumDetail.value.price)
        ) {
          isNoEnough.value = true;
          listenTimeoutNoEnough = setTimeout(() => {
            clearTimeout(listenTimeoutNoEnough);
            listenTimeoutNoEnough = null;
            isNoEnough.value = false;
          }, 3000);
          return;
        }
      }
    }

    if (isSkipWarningDialog.value) {
      mysteryBoxStore.saveSkipWarningDialog(gachaType);
    }

    isShowGachaBox.value = true;
    isOpenGacha.value = true;

    const response = await mysteryBoxStore.funcRandomMysteryBox(gachaType, gachaId);

    if (response.message != "success") {
      throw new Error("error");
    }

    showItemReward.value = response;

    if (showItemReward.value.item.grade === "limited") {
      showItemReward.value.isLimited = true;
    } else {
      showItemReward.value.isLimited = false;
    }

    setTimeout(() => {
      isAnimationOpenGacha.value = true;
      isOpenGacha.value = false;
    }, 1000);
  } catch (e) {
    isAnimationOpenGacha.value = false;
    isShowGachaBox.value = false;
    isNoEnough.value = false;
    isOpenGacha.value = false;

    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      icon: "report_problem",
    });

    $router.replace("/lobby");
    return "error";
  }
};
// #endregion

// #region Check open box
const isSkipWarningDialog = ref(false);
const funcCheckConfirmOpenBox = () => {
  isSkipWarningDialog.value = !isSkipWarningDialog.value;
};
// #endregion

// #region Get Item Reward
const funcShowDialogItemReward = () => {
  isShowDialogItemReward.value = true;
};
// #endregion

// #region Close Item Reward
const funcCloseItemReward = async () => {
  const systemStore = useSystemStore();
  systemStore.stopSound();
  isShowDialogItemReward.value = false;
  isDrawAgainNoEnough.value = false;
  selectedLimitedItem.value = null;
  let listenST = setTimeout(() => {
    clearTimeout(listenST);

    isShowGachaBox.value = false;
    isAnimationOpenGacha.value = false;

    if (isShowDialogTutorialFirstTime.value) {
      funcNextStepTutorial();
    }

    if (showItemReward.value.isExchangeReward) {
      isShowDialogChooseLimited.value = true;
    }

    selectGachaBox.value = null;

    systemStore.playSoundBackground();
    funcStartAnimation();
  }, 50);
};
// #endregion

// #region Select Rate-up Limited
const currentPageLimited = ref(0);
const selectedLimitedItem = ref(null);
const funcSelectedRateUpLimited = (item) => {
  if (funcCheckItemInInventory(item)) return;
  selectedLimitedItem.value = item;
};
// #endregion

// #region Show Dialog Get Choose Rate up Limited
const funcShowDialogConfirmGetRateUpLimited = () => {
  if (selectedLimitedItem.value == null) return;
  isShowDialogConfirmGetLimited.value = true;
};
// #endregion

// #region Confirm Get Rate up Limited
const funcConfirmGetRateUpLimited = async () => {
  try {
    isShowDialogConfirmGetLimited.value = false;
    isShowDialogChooseLimited.value = false;
    selectGachaBox.value = {
      type: "premium",
      isChooseLimited: true,
    };

    if (selectedLimitedItem.value.grade == "limited") {
      showItemReward.value.isLimited = true;
    } else {
      showItemReward.value.isLimited = false;
    }

    isShowGachaBox.value = true;

    showItemReward.value.isNewReward = true;

    showItemReward.value.isExchangeReward = false;

    showItemReward.value.item = selectedLimitedItem.value;

    if (selectedLimitedItem.value.itemName == "coin") {
      const response = await mysteryBoxStore.exchangeCoin();

      if (response != "success") {
        throw new Error("error");
      }
    } else {
      const response = await mysteryBoxStore.exchangeLimitedItem(
        selectedLimitedItem.value
      );

      if (response != "success") {
        throw new Error("error");
      }
    }

    setTimeout(() => {
      isAnimationOpenGacha.value = true;
    }, 1000);
  } catch (e) {
    isShowDialogChooseLimited.value = true;
    selectedLimitedItem.value = null;
    isShowGachaBox.value = false;
    isAnimationOpenGacha.value = false;
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      icon: "report_problem",
    });
  }
};
// #endregion

// #region Check Item in Inventory
const funcCheckItemInInventory = (item) => {
  if (item.itemName == "coin") {
    return false;
  }

  if (inventoryStore.checkItemInInventory(item)) {
    return true;
  }

  return false;
};
// #endregion

// #region Selected Show Limited Outfit and Runing Animation
const isActiveAnimation = ref(false);
const funcSelectedShowLimited = (index) => {
  if (showLimitedRateUpDetail.value.rateUpList.length <= 1) return;

  if (isActiveAnimation.value) return;

  isActiveAnimation.value = true;

  isAnimationSlideLeft.value = false;
  isAnimationSlideRight.value = false;
  clearInterval(listenLimitedInterval);
  clearTimeout(listenLimiteTimeout);
  listenLimiteTimeout = setTimeout(() => {
    isAnimationSlideLeft.value = true;
    currentIndexLimited.value = index;
    clearTimeout(listenLimiteTimeout);
    funcRuningAnimationShowLimitedOutfit("auto");
    setTimeout(() => {
      isActiveAnimation.value = false;
    }, 500);
  }, 250);
};
// #endregion

// #region Runing Animation Show Rate-up Limited Outfit
const currentIndexLimited = ref(0);
const controllerAnimation = ref("auto");
const isAnimationSlideLeft = ref(true);
const isAnimationSlideRight = ref(true);

let listenLimiteTimeout = null;
let listenLimitedInterval = null;
const funcRuningAnimationShowLimitedOutfit = (controller) => {
  if (showLimitedRateUpDetail.value.rateUpList.length <= 1) return;

  controllerAnimation.value = controller;
  listenLimitedInterval = setInterval(() => {
    isAnimationSlideLeft.value = false;
    isAnimationSlideRight.value = false;

    if (
      currentIndexLimited.value >=
      showLimitedRateUpDetail.value.rateUpList.length - 1
    ) {
      listenLimiteTimeout = setTimeout(() => {
        currentIndexLimited.value = 0;

        if (controller == "auto") {
          isAnimationSlideLeft.value = true;
        } else {
          if (controller == "right") {
            isAnimationSlideLeft.value = true;
          } else {
            isAnimationSlideRight.value = true;
          }
        }

        clearTimeout(listenLimiteTimeout);
      }, 250);
    } else {
      listenLimiteTimeout = setTimeout(() => {
        currentIndexLimited.value += 1;
        if (controller == "auto") {
          isAnimationSlideLeft.value = true;
        } else {
          if (controller == "right") {
            isAnimationSlideLeft.value = true;
          } else {
            isAnimationSlideRight.value = true;
          }
        }
        clearTimeout(listenLimiteTimeout);
      }, 250);
    }
  }, 5000);
};
// #endregion

// #region Runing Animation Box News Gacha
let listenBoxGachaTimeout = null;
let listenBoxGachaInterval = null;
const isAnimationBoxNewsGachaSlide = ref(true);
const currentIndexBoxNewsGacha = ref(0);
const funcRuningAnimationBoxNewsGacha = () => {
  listenBoxGachaInterval = setInterval(() => {
    isAnimationBoxNewsGachaSlide.value = false;

    if (
      currentIndexBoxNewsGacha.value >=
      showGachaPremiumDetail.value.limitedList.length - 1
    ) {
      clearInterval(listenBoxGachaInterval);
      clearTimeout(listenBoxGachaTimeout);
      listenBoxGachaTimeout = setTimeout(() => {
        isAnimationBoxNewsGachaSlide.value = true;
        currentIndexBoxNewsGacha.value = 0;
        clearTimeout(listenBoxGachaTimeout);
        funcRuningAnimationBoxNewsGacha();
      }, 250);
    } else {
      listenBoxGachaTimeout = setTimeout(() => {
        isAnimationBoxNewsGachaSlide.value = true;
        currentIndexBoxNewsGacha.value += 1;
        clearTimeout(listenBoxGachaTimeout);
      }, 250);
    }
  }, 10000);
};
// #endregion

// #region Select News Gacha list
const funcSelectNewGachaList = (index) => {
  if (isShowDialogTutorialFirstTime.value) return;

  if (isActiveAnimation.value) return;

  isActiveAnimation.value = true;

  isAnimationBoxNewsGachaSlide.value = false;
  clearInterval(listenBoxGachaInterval);
  clearTimeout(listenBoxGachaTimeout);
  listenBoxGachaTimeout = setTimeout(() => {
    isAnimationBoxNewsGachaSlide.value = true;
    currentIndexBoxNewsGacha.value = index;
    clearTimeout(listenBoxGachaTimeout);
    funcRuningAnimationBoxNewsGacha();
    setTimeout(() => {
      isActiveAnimation.value = false;
    }, 500);
  }, 250);
};

// #region Format number
const funcFormatNumber = (value) => {
  let number = value;
  let numberFormat = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return numberFormat;
};
// #endregion

// #region Select Menu Information
let tempSelected = null;
const selectedTypeOfInformation = ref("rate-up");
const selectedMenuInformation = ref(1);
const funcSelectMenuInformation = (menu) => {
  selectedMenuInformation.value = menu;
};
// #endregion

// #region Select type of information
const funcSelectTypeOfInformation = (type) => {
  if (isShowDialogTutorialFirstTime.value) return;
  selectedTypeOfInformation.value = type;
  isShowDialogInformationRateUpLimited.value = true;
  selectedMenuInformation.value = 1;
};
// #endregion

// #region Close Dialog Information
const funcCloseDialogInformation = () => {
  isShowDialogInformationRateUpLimited.value = false;
};
// #endregion

// #region Format String Upper Case
const funcFormatStringUpperCase = (value) => {
  let string = value;
  let stringFormat = string.charAt(0).toUpperCase() + string.slice(1);
  return stringFormat;
};
// #endregion
// #endregion ***** Function *****

// #region Show Box Choose Limited
const funcShowBoxChooseLimited = () => {
  if (isShowGachaBox.value) return;
  isShowDialogChooseLimited.value = true;
};
// #endregion

// #region Select page Gacha Mobile
const funcSelectPageGachaMobile = (type, step) => {
  currentStepPage.value = step;

  if (selectCurrentGachaBoxMobile.value == null) selectCurrentGachaBoxMobile.value = 0;

  if (type == "increment") {
    selectCurrentGachaBoxMobile.value++;
  } else {
    selectCurrentGachaBoxMobile.value--;
  }
};
// #endregion

// #region Handle Swiper Gacha Box Mobile
const funcHandleSwiper = ({ evt, ...newInfo }) => {
  if (isShowDialogTutorialFirstTime.value) return;

  if (newInfo.direction == "up" || newInfo.direction == "down") return;

  if (selectCurrentGachaBoxMobile.value == null) selectCurrentGachaBoxMobile.value = 0;

  if (newInfo.direction == "left") {
    if (selectCurrentGachaBoxMobile.value == 2) return;
    selectCurrentGachaBoxMobile.value++;
    currentStepPage.value = "right";
  } else if (newInfo.direction == "right") {
    if (selectCurrentGachaBoxMobile.value == 0) return;
    selectCurrentGachaBoxMobile.value--;
    currentStepPage.value = "left";
  }
};

const funcHandleSwiperShowRateUp = ({ evt, ...newInfo }) => {
  if (isShowDialogTutorialFirstTime.value) return;

  if (newInfo.direction == "up" || newInfo.direction == "down") return;

  if (isActiveAnimation.value) return;

  isActiveAnimation.value = true;

  isAnimationSlideLeft.value = false;
  isAnimationSlideRight.value = false;

  clearInterval(listenLimitedInterval);
  clearTimeout(listenLimiteTimeout);

  if (newInfo.direction == "left") {
    listenLimiteTimeout = setTimeout(() => {
      isAnimationSlideLeft.value = true;
      if (
        currentIndexLimited.value ==
        showLimitedRateUpDetail.value.rateUpList.length - 1
      ) {
        currentIndexLimited.value = 0;
      } else {
        currentIndexLimited.value++;
      }
      clearTimeout(listenLimiteTimeout);
      funcRuningAnimationShowLimitedOutfit("right");
      setTimeout(() => {
        isActiveAnimation.value = false;
      }, 500);
    }, 250);
  } else {
    listenLimiteTimeout = setTimeout(() => {
      isAnimationSlideRight.value = true;
      if (currentIndexLimited.value == 0) {
        currentIndexLimited.value = showLimitedRateUpDetail.value.rateUpList.length - 1;
      } else {
        currentIndexLimited.value--;
      }
      clearTimeout(listenLimiteTimeout);
      funcRuningAnimationShowLimitedOutfit("left");
      setTimeout(() => {
        isActiveAnimation.value = false;
      }, 500);
    }, 250);
  }
};
// #endregion

// #region Format Student Coin
const funcFormatStudentCoin = (value) => {
  let number = value;

  if (value > 99999) {
    return `+99999`;
  } else {
    return number;
  }
};
// #endregion

// #region Back to lobby
const funcBackToLobby = () => {
  $router.push("/lobby");
};
// #endregion

// #region Section Tutorial
const tutorialFirstList = ref([]);
const isShowDialogTutorialFirstTime = ref(false);
const funcCheckFirstTime = () => {
  const mysteryBoxStore = useMysteryBoxStore();
  let checkFirstTime = mysteryBoxStore.isFirstTime;

  if (checkFirstTime) {
    if (!$q.platform.is.desktop) {
      tutorialFirstList.value = tutorialList.tutorialGachaMobile;
      selectCurrentGachaBoxMobile.value = 1;
    } else {
      tutorialFirstList.value = tutorialList.tutorialGacha;
    }

    currentStepTutorial.value = 0;

    isShowDialogTutorialFirstTime.value = true;
  } else {
    isShowDialogTutorialFirstTime.value = false;
  }

  funcStartAnimation();
  isLoading.value = false;
};

const funcShowBoxTutorial = (type) => {
  if (isShowDialogTutorialFirstTime.value) {
    if (type == "standard" && currentTutorialData.value.isShowStandardBox) {
      return "z-max";
    } else if (type == "premium" && currentTutorialData.value.isShowPremiumBox) {
      return "z-max";
    } else if (type == "rate-up" && currentTutorialData.value.isShowRateUpLimited) {
      return "z-max";
    } else if (type == "header-key" && currentTutorialData.value.isShowHeaderBarKey) {
      return "z-max";
    } else if (type == "header-coin" && currentTutorialData.value.isShowHeaderBarCoin) {
      return "z-max";
    } else if (
      type == "button-box-gacha" &&
      currentTutorialData.value.isShowStandardButton
    ) {
      return "z-max";
    } else if (
      type == "button-box-gacha" &&
      currentTutorialData.value.isShowPremiumButton
    ) {
      return "z-max";
    }
  }

  return "";
};

const isAnimationHand = ref(true);
const isAnimationHandClick = ref(false);
const currentStepTutorial = ref(0);
const funcNextStepTutorial = () => {
  isAnimationHand.value = false;
  isAnimationHandClick.value = false;

  currentStepTutorial.value++;

  if (
    currentTutorialData.value.isShowPremiumBox ||
    currentTutorialData.value.isShowPremiumButton
  ) {
    currentStepPage.value = "left";
    selectCurrentGachaBoxMobile.value = 1;
  } else if (
    currentTutorialData.value.isShowStandardBox ||
    currentTutorialData.value.isShowStandardButton
  ) {
    currentStepPage.value = "right";
    selectCurrentGachaBoxMobile.value = 2;
  } else if (currentTutorialData.value.isShowRateUpLimited) {
    currentStepPage.value = "left";
    selectCurrentGachaBoxMobile.value = 0;
  }

  let listenST = setTimeout(() => {
    clearTimeout(listenST);
    isAnimationHand.value = true;
    if (currentTutorialData.value.isOpenBox) {
      isAnimationHandClick.value = true;
    }
  }, 10);
};

const funcFinishTutorial = () => {
  studentStore.setStudentFirstTimeGacha = true;
  isShowDialogTutorialFirstTime.value = false;
  currentStepTutorial.value = 0;
};
// #endregion

// #region Set Start Animation
const funcStartAnimation = () => {
  funcClearIntervalAndTimeout();
  isAnimationStart.value = true;
  funcRuningAnimationShowLimitedOutfit("auto");
  funcRuningAnimationBoxNewsGacha();
};
// #endregion

// #region Clear Interval And Timeout
const funcClearIntervalAndTimeout = () => {
  isAnimationStart.value = false;
  clearInterval(listenLimitedInterval);
  clearTimeout(listenLimiteTimeout);
  clearInterval(listenBoxGachaInterval);
  clearTimeout(listenBoxGachaTimeout);
};
// #endregion

// #region Draw again
const isDrawAgainNoEnough = ref(false);
let listenDrawAgain = null;
const funcDrawAgain = () => {
  if (listenDrawAgain) {
    clearTimeout(listenDrawAgain);
  }

  if (selectGachaBox.value.type == "standard") {
    if (Number(studentStore.coin) < Number(showGachaStandardDetail.value.price)) {
      isDrawAgainNoEnough.value = true;
      return;
    }
  } else if (selectGachaBox.value.type == "premium") {
    if (Number(studentStore.premiumKey) < Number(showGachaPremiumDetail.value.price)) {
      isDrawAgainNoEnough.value = true;
      return;
    }
  }

  isShowDialogItemReward.value = false;
  isAnimationOpenGacha.value = false;

  selectGachaBox.value = {
    ...selectGachaBox.value,
    isDrawAgain: true,
  };

  listenDrawAgain = setTimeout(() => {
    funcGetGachaponBox();
    if (listenDrawAgain) {
      clearTimeout(listenDrawAgain);
    }
  }, 1000);
};
// #endregion

// #region Format To Fixed
const funcFormatToFixed = (val, position) => {
  let text = Number(val);

  let start = text.toString().split(".")[0];
  let end = text.toString().split(".")[1];

  if (start) {
    if (end) {
      text = parseFloat(text).toFixed(end.length >= position ? position : end.length);
    }
  }

  return text;
};
// #endregion

// #endregion ***** Function *****

// #region ***** Computed *****

// #region Selected Show Limited Outfit
const selectedShowLimited = computed(() => {
  let findLimitedRateUp =
    showLimitedRateUpDetail.value.rateUpList[currentIndexLimited.value];

  let setItemLayer = {};

  if (findLimitedRateUp.length) {
    for (let i = 0; i < findLimitedRateUp.length; i++) {
      let data = findLimitedRateUp[i];

      setItemLayer = {
        ...setItemLayer,
        [data.type]: {
          ...data,
        },
      };
    }
  }

  return setItemLayer;
});
// #endregion

// #region Show Detail Information
const showDetailInformation = computed(() => {
  let findInformation = null;
  let type = selectedTypeOfInformation.value;

  if (type == "rate-up") {
    findInformation = showLimitedRateUpDetail.value;
  } else if (type == "standard") {
    findInformation = showGachaStandardDetail.value;
  } else {
    findInformation = showGachaPremiumDetail.value;
  }

  return findInformation;
});
// #endregion

// #region Current Tutorial Data
const currentTutorialData = computed(() => {
  let currentTutorial = tutorialFirstList.value[currentStepTutorial.value];
  return currentTutorial;
});

const currentBoxGachaData = computed(() => {
  let currentGachaBox = null;

  if (selectCurrentGachaBoxMobile.value == 1) {
    currentGachaBox = showGachaPremiumDetail.value;
  } else if (selectCurrentGachaBoxMobile.value == 2) {
    currentGachaBox = showGachaStandardDetail.value;
  } else {
    currentGachaBox = null;
  }

  selectGachaBox.value = currentGachaBox;

  return currentGachaBox;
});
// #endregion

// #region Tutorial First Time Disable Button
const isDisableButtonTutorialFirstTime = computed(() => {
  let currentTutorial = tutorialFirstList.value[currentStepTutorial.value];

  if (isShowDialogTutorialFirstTime.value) {
    if (currentTutorial.isOpenBox) {
      return false;
    } else {
      if (currentTutorial.isDisableButton) {
        return true;
      } else {
        return false;
      }
    }
  }

  return false;
});

const isLastTutorialList = computed(() => {
  let currentTutorial = tutorialFirstList.value;

  if (currentTutorial.length == currentStepTutorial.value + 1) {
    return true;
  } else {
    return false;
  }
});
// #endregion

// #region Show Gacha Premium Detail
const showGachaPremiumDetail = computed(() => {
  let findGachaPremium = mysteryBoxStore.premiumData;

  if (findGachaPremium) {
    return findGachaPremium;
  }

  return null;
});
// #endregion

// #region Show Gacha Standard Detail
const showGachaStandardDetail = computed(() => {
  let findGachaStandard = mysteryBoxStore.standardData;

  if (findGachaStandard) {
    return findGachaStandard;
  }

  return null;
});
// #endregion

// #region Show Limited Rate Up Detail
const showLimitedRateUpDetail = computed(() => {
  let findLimitedRateUp = mysteryBoxStore.limitedRateData;

  if (findLimitedRateUp) {
    return findLimitedRateUp;
  }

  return null;
});
// #endregion

// #endregion ***** Computed *****

onMounted(async () => {
  const systemStore = useSystemStore();

  systemStore.setRouter("gachapon");

  if (!mysteryBoxStore.isOpenMysteryBox) {
    $router.replace("/lobby");
    return;
  }

  try {
    const response = await funcGetMysteryBox();

    if (response != "success") {
      throw new Error("error");
    }

    funcCheckFirstTime();
  } catch (e) {
    $router.replace("/lobby");
    $q.notify({
      message: "มีปัญหาการเชื่อมต่อระบบกาชากรุณาลองเข้ามาเล่นใหม่อีกครั้ง",
      position: "top",
    });
    isLoading.value = true;
  }
});

onBeforeUnmount(() => {
  funcClearIntervalAndTimeout();
});
</script>

<!-- #region ***** Style ***** -->
<style lang="scss" scoped>
.background-main {
  min-width: 1000px;
}

.background-container-desktop {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  background-image: url("/images/background_main/background-gacha-pon.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

// #region Section
.header-bar {
  width: 100%;
  height: 5%;
  top: 2.5%;
  left: 1.5%;
}

.header-bar-coin {
  width: 9.566%;
  top: 2.5%;
  left: 7.5%;
}

.header-bar-key {
  width: 7.503%;
  top: 2.5%;
  left: 18.9%;
}

.header-bar-information {
  width: 3%;
  top: 2.5%;
  left: 28%;
}

.header-bar-button-back {
  width: 2.913%;
  top: 2%;
  left: 1.5%;
}

.box-stardard-container {
  width: 18.75%;
  left: 85%;
  top: 52%;
}

.box-premium-container {
  width: 18.75%;
  left: 62%;
  top: 52%;
}

.box-rate-up-main {
  width: 42.125%;
  left: 27.8%;
  top: 49.7%;
}

.label-rate-up-main {
  width: 42.125%;
  margin-bottom: 2%;
}

.box-content-rate-up {
  padding: 2% 2.5%;
}

.text-rate-up-header {
  font-size: min(20px, max(12px, 1.25vw));
  line-height: 1.5;
}

// #endregion

// #region Button Main

.button-active-main {
  cursor: pointer;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
}

.button-active-main.active-color-limited {
  color: #fd444a;
}

.button-active-main:active {
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
  -moz-transform: scale(0.9);
}

.button-active-main.disable {
  cursor: default;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
}

// Button Size ohter
.button-active-main.icon-back {
  width: 2.913%;
  margin-right: 0.5%;
}

.button-active-main.icon-back-mobile {
  max-width: 50px;
  width: 10%;
  margin-right: 5%;
}

.button-active-main.icon-tutorial-infomation {
  width: 54.35%;
}

.button-active-main.close {
  width: 16.55%;
  top: -5%;
  right: -8%;
}
.button-icon-page {
  width: 3.035%;
  margin: 0% 1%;
  cursor: pointer;
}

.button-icon-page.disable {
  cursor: default;
}

.button-icon-page.news {
  width: 3.705%;
  margin: 0% 1.5%;
}

.button-icon-page.news.disable {
  cursor: default;
}

.button-active-main.reset {
  width: 11.067%;
  margin: 0% 2%;
}

.button-active-main.reset-mobile {
  max-width: 60px;
  width: 17%;
  margin: 0% 2%;
}

.button-active-main.button-choose-get-limited {
  width: 54.326%;
}

.button-active-main.button-choose-get-limited-mobile {
  max-width: 250px;
  width: 63.13%;
  margin: 1% 0%;
}

.button-active-main.item-limited {
  width: 99.31%;
}

.button-active-main.item-limited-mobile {
  max-width: 150px;
  width: 100%;
}

.button-active-main.get-button-mobile {
  min-width: 80px;
  width: 27.5862%;
  margin-left: 3%;
  margin-right: 1%;
}
.button-active-main.icon-arrow-left {
  width: 45px;
  bottom: 0;
  left: -24px;
}
.button-active-main.icon-arrow-right {
  width: 45px;
  bottom: 0;
  right: -24px;
}

.button-active-main.icon-information-mobile {
  width: 8%;
}
// #endregion

// #region Box main
.box-total-bar {
  position: relative;
  padding: 1.064%;
  border: 0.2rem solid #4a261b;
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.5);
  margin-left: 2.3%;
}

.box-total-bar.mobile {
  position: relative;
  max-width: 100px;
  width: 100%;
  border: 0px solid transparent;
  border-radius: 0px;
  background-color: transparent;
  margin-left: 15px;
}

.box-total-bar.mobile .coin-mobile {
  left: 0%;
  top: 65%;
  max-width: 45px;
  width: 50%;
}

.box-total-bar.coin {
  width: 9.387%;
  height: 0%;
}

.box-total-bar.key {
  width: 7.51%;
  height: 0%;
}

.box-total-bar.mobile .key-mobile {
  left: 6%;
  top: 65%;
  max-width: 45px;
  width: 40%;
}

.box-total-bar:not(.mobile):before {
  content: "";
  position: absolute;
  top: 7%;
  right: 3%;
  width: 12%;
  height: 36%;
  background-image: url("/images/icon_main/icon-bubble.png");
  background-repeat: no-repeat;
  background-size: contain;
}

.text-coin {
  font-size: min(24px, max(16px, 1.5vw));
  line-height: 0;
}

.text-coin.mobile {
  font-size: 16px;
  line-height: 0;
}

// #endregion

// #region Box Rate up Limited

.box-character,
.box-background-item-limited {
  width: 47%;
}

.box-show-item-limited {
  width: 33%;
}

.box-show-item-limited.news {
  width: 33%;
}

.box-footer-rate-up {
  width: 90%;
  height: 25%;
  padding: 2% 1%;
}

.text-footer-rate-up {
  font-size: min(16px, max(10px, 1vw));
}

.icon-information {
  width: 5.464%;
  margin: 0% 2%;
}

.box-button-get-limited {
  width: 21.73%;
}

.box-count-bar-limited-rate-up {
  position: relative;
  width: 90%;
  height: 5.4298%;
  padding: 2.81%;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 0.15rem solid #4a261b;
  overflow: hidden;
}

.box-count-bar-limited-rate-up::before {
  content: "";
  position: absolute;
  top: 10%;
  left: -11%;
  width: 15%;
  height: 60%;
  background-image: url("/images/icon_main/icon-bubble.png");
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotateY(200deg);
  z-index: 2;
}

.box-background-bar-progress-limited-rate-up {
  width: 100%;
  height: 100%;
  transition: width 0.5s ease-in-out;
  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
}

.background-bar-progress {
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  animation: barProgress 7s linear forwards infinite;
  -webkit-animation: barProgress 7s linear forwards infinite;
  -moz-animation: barProgress 7s linear forwards infinite;

  background-color: #33dada;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 20px,
    rgba(67, 255, 255, 1) 0px,
    rgba(67, 255, 255, 1) 37px
  );
}

.progress-active-green {
  background-color: #3ccc2f;
  background-image: repeating-linear-gradient(
    -55deg,
    transparent,
    transparent 20px,
    #4bff3b 0px,
    #4bff3b 37px
  );
  transition: background-color 0.5s ease-in-out;
}

.text-count-bar-limited-rate-up {
  top: 100%;
  color: #fff;
  font-size: min(24px, max(14px, 1.5vw));
  line-height: 0;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}
.text-active-orange {
  color: #ffbf19;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}
.text-active-red {
  color: #fd444a;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}
.text-count-bar-limited-rate-up-mobile {
  top: 100%;
  color: #fff;
  line-height: 0;
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}

.text-active-orange-mobile {
  color: #ffbf19;
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}
.text-active-red-mobile {
  color: #fd444a;
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}
// #endregion

// #region Box Premium & Standard
.box-button-infomation {
  width: 8%;
  top: 2%;
  right: 4%;
}
.box-icon-gacha {
  width: 76.67%;
  top: 17%;
}

.box-label-gachapon {
  width: 96.67%;
  top: 34.7%;
}

.box-gacha-news {
  width: 92%;
  top: 57.5%;
}

.box-button-gacha-open {
  width: 90.66666666%;
  top: 92%;
}

.icon-key-button-gacha-open {
  width: 13%;
}

.icon-key-button-gacha-open.mobile {
  width: 30px;
  left: -17px;
  top: 45%;
}

.icon-coin-button-gacha-open {
  width: 18%;
}

.icon-coin-button-gacha-open.mobile {
  width: 35px;
  left: -25px;
  top: 45%;
}

.text-number-of-key-and-coin {
  font-size: min(24px, max(14px, 1.4vw));
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px, rgb(0, 0, 0) 0px 0px 10px;
  letter-spacing: 2px;
}

.box-content-news {
  width: 98%;
  height: 100%;
  padding: 2%;
  margin: auto;
  color: #fff;
  font-size: min(14px, max(10px, 0.9vw));
  overflow: hidden;
}

.text-rate-up-news {
  font-size: min(10px, max(6px, 0.6vw));
  margin: 3% 0% 1% 0%;
}

.text-rate-up-news.standard {
  font-size: min(12px, max(8px, 0.7vw));
  margin: 2% 0% 2% 0%;
}

.icon-time {
  width: 9.34%;
}

.box-progress-bar-gachapon {
  width: 100%;
  top: 80.7%;
  font-size: min(12px, max(8px, 0.7vw));
  line-height: 1;
}

.box-count-bar-gachapon {
  position: relative;
  width: 78.024%;
  height: 5.4298%;
  padding: 2.81%;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 0.15rem solid #4a261b;
  overflow: hidden;
}

.box-count-bar-gachapon::before {
  content: "";
  position: absolute;
  top: 10%;
  left: -11%;
  width: 15%;
  height: 60%;
  background-image: url("/images/icon_main/icon-bubble.png");
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotateY(200deg);
  z-index: 2;
}

.box-background-bar-progress-gachapon {
  width: 100%;
  height: 100%;
  top: -0%;
  left: 0%;
  transition: width 0.5s ease-in-out;
  -webkit-transition: width 0.5s ease-in-out;
  -moz-transition: width 0.5s ease-in-out;
}

.background-bar-progress-gachapon {
  position: absolute;
  left: 0%;
  width: 100%;
  height: 100%;
  animation: barProgress 7s linear forwards infinite;
  -webkit-animation: barProgress 7s linear forwards infinite;
  -moz-animation: barProgress 7s linear forwards infinite;

  background-color: #33dada;
  background-image: repeating-linear-gradient(
    -60deg,
    transparent,
    transparent 10px,
    rgba(67, 255, 255, 1) 0px,
    rgba(67, 255, 255, 1) 20px
  );
}

.background-bar-progress-gachapon.progress-active-green {
  background-color: #3ccc2f;
  background-image: repeating-linear-gradient(
    -60deg,
    transparent,
    transparent 10px,
    #4bff3b 0px,
    #4bff3b 20px
  );
  transition: background-color 0.5s ease-in-out;
}

.text-count-bar-gachapon {
  top: 80%;
  color: #fff;
  font-size: min(16px, max(10px, 1vw));
  line-height: 0;
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}

.text-count-bar-gachapon.text-active-bar {
  color: #ffbf19 !important;
}

.box-alert-no-enough-main {
  width: 120%;
  left: -10%;
  bottom: 15.5%;
}

.box-alert-no-enough-show-item-main {
  max-width: 340px;
  width: 50%;
  min-width: 300px;
}

.box-alert-no-enough-show-item {
  padding: 2%;
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  border: 0.1rem solid #ffaa2e;
  font-size: clamp(14px, 1.25vw, 20px);
  color: #fff;
}

.box-alert-no-enough {
  padding: 2.45%;
  border-radius: 3rem;
  background-color: rgba(0, 0, 0, 0.7);
  border: 0.1rem solid #ffaa2e;
  font-size: clamp(14px, 1.25vw, 20px);
  color: #fff;
}

.alert-no-enough-icon {
  width: 8%;
  margin-right: 3%;
}
// #endregion

// #region Get Reward
.animation-background-light {
  background-image: url("/images/background_main/background-dialog-item-reward.png");
  background-position: center;
  background-size: cover;

  animation: backgroundLight 0.6s ease-in-out alternate-reverse infinite;
  -webkit-animation: backgroundLight 0.6s ease-in-out alternate-reverse infinite;
  -moz-animation: backgroundLight 0.6s ease-in-out alternate-reverse infinite;

  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;

  transform: rotateY(0deg) scale(0);
  -webkit-transform: rotateY(0deg) scale(0);
  -moz-transform: rotateY(0deg) scale(0);

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  opacity: 0;
  transition: transform 1s ease-in-out;
}

@keyframes backgroundLight {
  0% {
    opacity: 0.5;
    transform: rotateY(0deg) scale(1);
    -webkit-transform: rotateY(0deg) scale(1);
    -moz-transform: rotateY(0deg) scale(1);
  }
  to {
    opacity: 1;

    transform: rotateY(5deg) scale(1.05);
    -webkit-transform: rotateY(5deg) scale(1.05);
    -moz-transform: rotateY(5deg) scale(1.05);
  }
}
.box-item-reward {
  width: 10.953%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box-item-reward-mobile {
  width: 200px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}
.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}
.text-reward {
  font-size: min(30px, 1.85vw);
  color: #fff;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
  margin: 1% 0%;
}
.text-reward-mobile {
  font-size: 30px;
  color: #fff;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
  margin: 1% 0%;
}

.text-reward-item {
  font-size: clamp(14px, 1.25vw, 20px);
  margin: 1% 0%;
}

.text-reward-item-mobile {
  font-size: 20px;
  margin: 15px 0px;
}

.button-ok {
  width: 6.25%;
  min-width: 80px;
}

.button-ok-mobile {
  width: 100px;
}

.button-draw-again {
  width: 7.5%;
  min-width: 100px;
}

.button-draw-again-mobile {
  width: 120px;
}

.button-change-coin {
  color: #fff;
  width: 11.25%;
  min-width: 150px;
  font-size: clamp(12px, 1vw, 16px);
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.button-change-coin-mobile {
  color: #fff;
  width: 180px;
  font-size: 16px;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}
.box-light-reward {
  width: 165%;
}

.text-limited-seccess-point {
  color: #ffcf51;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.animation-light-reward {
  animation: lightReward 7s ease-in-out alternate-reverse infinite;
  -webkit-animation: lightReward 7s ease-in-out alternate-reverse infinite;
  -moz-animation: lightReward 7s ease-in-out alternate-reverse infinite;

  transform: scale(0.7) rotate(0deg);
  -webkit-transform: scale(0.7) rotate(0deg);
  -moz-transform: scale(0.7) rotate(0deg);
}

@keyframes lightReward {
  50% {
    transform: scale(0.9) rotate(360deg);
    -webkit-transform: scale(0.9) rotate(360deg);
    -moz-transform: scale(0.9) rotate(360deg);
  }
  to {
    transform: scale(0.7) rotate(-0deg);
    -webkit-transform: scale(0.7) rotate(-0deg);
    -moz-transform: scale(0.7) rotate(-0deg);
  }
}

.animation-star-reward {
  animation: starReward 0.7s ease-in-out alternate-reverse infinite;
  -webkit-animation: starReward 0.7s ease-in-out alternate-reverse infinite;
  -moz-animation: starReward 0.7s ease-in-out alternate-reverse infinite;

  transform: scale(0.7);
  -webkit-transform: scale(0.7);
  -moz-transform: scale(0.7);

  opacity: 0.3;
}

@keyframes starReward {
  to {
    transform: scale(1);
    -webkit-transform: scale(1);
    -moz-transform: scale(1);

    opacity: 1;
  }
}
// #endregion

// #region Dialog Information

.box-dialog-container {
  width: 320px;
  height: 540px;
  background-color: #f2c043;
  border-radius: 20px;
  border: 0.1rem solid #4a261b;
  padding: 10px;
  margin: auto;
}

.box-dialog-body {
  width: 100%;
  height: 100%;
  background-color: #ffedc4;
  border-radius: 10px;
  padding: 20px 10px 10px 10px;
  margin: auto;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
}

.box-dialog-content {
  width: 100%;
  height: 100%;
  color: #4a261b;
}

.box-dialog-menu {
  height: 7.177%;
}

.box-dialog-button-menu {
  width: 40%;
  background-color: #fff;
  font-size: 14px;
  border-radius: 12px 12px 0px 0px;
  cursor: pointer;
}

.box-dialog-button-menu.selected {
  background-color: #efd080;
}

.box-dialog-scroll-container {
  width: 100%;
  height: 92.823%;
  background-color: #efd080;
  border-radius: 0rem 12px 12px 12px;
  padding: 0% 1% 0% 1%;
  overflow: hidden;
}

.box-dialog-scroll-content {
  height: 100%;
  padding: 15px 5px 10px 7px;
  overflow: auto;
}

.box-dialog-scroll-content::-webkit-scrollbar {
  width: 0.4rem;
  height: 0px;
}

.box-dialog-scroll-content::-webkit-scrollbar-track {
  background: #efd080;
  border-radius: 0.5rem;
}

.box-dialog-scroll-content::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 0.5rem;
}

.box-item-information-container {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 3%;
  margin: 5% 0%;
}

.button-item-information {
  width: 26.465%;
}

.text-item-information {
  font-size: 14px;
  padding: 0px 5px 0px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text-dialog-14-information {
  font-size: 14px;
}

.text-dialog-12-information {
  font-size: 12px;
}

.text-dialog-16-information {
  font-size: 16px;
}

// #endregion

// #region Box Choose Limited
.box-choose-limited-container {
  width: 62.125%;
  margin: auto;
}

.label-gacha-choose-limited {
  width: 39.6984%;
  top: 0%;
}

.box-button-choose-limited {
  bottom: 7.5%;
}

.box-choose-pagination-container {
  max-width: 80%;
  width: 100%;
  min-width: fit-content;
  bottom: 8%;
  margin: auto;
}

.box-choose-button-pagination {
  background-color: #fff;
  border: 1px solid #e9e9e9;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.box-choose-button-pagination.selected {
  background: -webkit-linear-gradient(#cd65d0, #62208e);
  color: #fff;
  font-size: min(16px, 1vw);
}

.box-choose-button-pagination.disable {
  opacity: 0.3;
  cursor: default;
}

.box-choose-button-text-pagination {
  background: -webkit-linear-gradient(#cd65d0, #62208e);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: min(16px, 1vw);
}

.button-choose-item-limited-main {
  width: 33.33%;
  height: fit-content;
  padding: 1%;
  margin-top: 0.8%;
}

.text-choose-item-name {
  color: #4a261b;
  font-size: min(12px, 0.8vw);
  padding: 2% 3%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text-choose-item-name-mobile {
  color: #4a261b;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.text-check-has-item {
  color: #fff;
  font-size: min(14px, 0.9vw);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

// #endregion

// #region Box Tutorial
.box-tutorial-main {
  width: 100%;
  max-height: fit-content;
  min-height: 120px;
  height: 100%;
  background: linear-gradient(180deg, #76649a 0%, #464378 100%);
  padding: 10px;
  margin: auto;
}
// #endregion

// #region Other
.animation-duration-0-2s {
  animation-duration: 0.2s;
  -webkit-animation-duration: 0.2s;
  -moz-animation-duration: 0.2s;

  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
}

.animation-duration-0-3s {
  animation-duration: 0.3s;
  -webkit-animation-duration: 0.3s;
  -moz-animation-duration: 0.3s;

  animation-delay: 0.1s;
  -webkit-animation-delay: 0.1s;
  -moz-animation-delay: 0.1s;
}

.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;

  animation-delay: 0.3s;
  -webkit-animation-delay: 0.3s;
  -moz-animation-delay: 0.3s;
}

.animation-duration-1s {
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;

  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
  -moz-animation-delay: 0.5s;
}

// #endregion

// #region Animation Key Frames

@keyframes barProgress {
  to {
    width: 200%;
  }
}
.animation-page-in-left {
  animation: pageInLeft 0.3s ease-in-out forwards;
  -webkit-animation: pageInLeft 0.3s ease-in-out forwards;
  -moz-animation: pageInLeft 0.3s ease-in-out forwards;

  transform: translate(-95%, 0%) scale(0.8);
  -webkit-transform: translate(-95%, 0%) scale(0.8);
  -moz-transform: translate(-95%, 0%) scale(0.8);
}

@keyframes pageInLeft {
  to {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);
  }
}

.animation-page-in-right {
  animation: pageInRight 0.3s ease-in-out forwards;
  -webkit-animation: pageInRight 0.3s ease-in-out forwards;
  -moz-animation: pageInRight 0.3s ease-in-out forwards;

  transform: translate(95%, 0%) scale(0.8);
  -webkit-transform: translate(95%, 0%) scale(0.8);
  -moz-transform: translate(95%, 0%) scale(0.8);
}

@keyframes pageInRight {
  to {
    transform: translate(0%, 0%) scale(1);
    -webkit-transform: translate(0%, 0%) scale(1);
    -moz-transform: translate(0%, 0%) scale(1);
  }
}

.animation-page-out-left {
  animation: pageOutLeft 0.3s ease-in-out forwards;
  -webkit-animation: pageOutLeft 0.3s ease-in-out forwards;
  -moz-animation: pageOutLeft 0.3s ease-in-out forwards;

  transform: translate(0%, 0%) scale(1);
  -webkit-transform: translate(0%, 0%) scale(1);
  -moz-transform: translate(0%, 0%) scale(1);
}

@keyframes pageOutLeft {
  to {
    transform: translate(-95%, 0%) scale(0.8);
    -webkit-transform: translate(-95%, 0%) scale(0.8);
    -moz-transform: translate(-95%, 0%) scale(0.8);
  }
}
.animation-page-out-right {
  animation: pageOutRight 0.3s ease-in-out forwards;
  -webkit-animation: pageOutRight 0.3s ease-in-out forwards;
  -moz-animation: pageOutRight 0.3s ease-in-out forwards;

  transform: translate(0%, 0%) scale(1);
  -webkit-transform: translate(0%, 0%) scale(1);
  -moz-transform: translate(0%, 0%) scale(1);
}

@keyframes pageOutRight {
  to {
    transform: translate(95%, 0%) scale(0.8);
    -webkit-transform: translate(95%, 0%) scale(0.8);
    -moz-transform: translate(95%, 0%) scale(0.8);
  }
}

.animation-hand-right {
  animation: handRight 0.5s ease-in-out alternate-reverse infinite;
  -webkit-animation: handRight 0.5s ease-in-out alternate-reverse infinite;
  -moz-animation: handRight 0.5s ease-in-out alternate-reverse infinite;

  transform: translate(0px, 0px) rotate(0deg);
  -webkit-transform: translate(0px, 0px) rotate(0deg);
  -moz-transform: translate(0px, 0px) rotate(0deg);
  transform-origin: bottom left;
}

@keyframes handRight {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
    -webkit-transform: translate(0px, 0px) rotate(0deg);
    -moz-transform: translate(0px, 0px) rotate(0deg);
  }

  50% {
    transform: translate(5px, 0px) rotate(-7deg);
    -webkit-transform: translate(5px, 0px) rotate(-7deg);
    -moz-transform: translate(5px, 0px) rotate(-7deg);
  }

  100% {
    transform: translate(0px, 0px) rotate(0deg);
    -webkit-transform: translate(0px, 0px) rotate(0deg);
    -moz-transform: translate(0px, 0px) rotate(0deg);
  }
}

.animation-hand-left {
  animation: handLeft 0.5s ease-in-out alternate-reverse infinite;
  -webkit-animation: handLeft 0.5s ease-in-out alternate-reverse infinite;
  -moz-animation: handLeft 0.5s ease-in-out alternate-reverse infinite;

  transform: translate(0px, 0px) rotate(0deg);
  -webkit-transform: translate(0px, 0px) rotate(0deg);
  -moz-transform: translate(0px, 0px) rotate(0deg);
  transform-origin: bottom right;
}

@keyframes handLeft {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
    -webkit-transform: translate(0px, 0px) rotate(0deg);
    -moz-transform: translate(0px, 0px) rotate(0deg);
  }

  50% {
    transform: translate(-5px, 0px) rotate(7deg);
    -webkit-transform: translate(-5px, 0px) rotate(7deg);
    -moz-transform: translate(-5px, 0px) rotate(7deg);
  }

  100% {
    transform: translate(0px, 0px) rotate(0deg);
    -webkit-transform: translate(0px, 0px) rotate(0deg);
    -moz-transform: translate(0px, 0px) rotate(0deg);
  }
}

.animation-show-slide-left {
  animation: showSlideLeft 0.5s ease-in-out forwards;
  -webkit-animation: showSlideLeft 0.5s ease-in-out forwards;
  -moz-animation: showSlideLeft 0.5s ease-in-out forwards;

  transform: translate(-100%, 0%);
  -webkit-transform: translate(-100%, 0%);
  -moz-transform: translate(-100%, 0%);

  opacity: 0;
}

@keyframes showSlideLeft {
  0% {
    transform: translate(-100%, 0%);
    -webkit-transform: translate(-100%, 0%);
    -moz-transform: translate(-100%, 0%);
    opacity: 1;
  }
  to {
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);

    opacity: 1;
  }
}

.animation-show-slide-right {
  animation: showSlideRight 0.5s ease-in-out forwards;
  -webkit-animation: showSlideRight 0.5s ease-in-out forwards;
  -moz-animation: showSlideRight 0.5s ease-in-out forwards;

  transform: translate(100%, 0%);
  -webkit-transform: translate(100%, 0%);
  -moz-transform: translate(100%, 0%);

  opacity: 0;
}

@keyframes showSlideRight {
  0% {
    transform: translate(100%, 0%);
    -webkit-transform: translate(100%, 0%);
    -moz-transform: translate(100%, 0%);
    opacity: 1;
  }
  to {
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);

    opacity: 1;
  }
}

.aniamtion-out-slide-left {
  animation: outSlideLeft 0.5s ease-in-out forwards;
  -webkit-animation: outSlideLeft 0.5s ease-in-out forwards;
  -moz-animation: outSlideLeft 0.5s ease-in-out forwards;

  transform: translate(0%, 0%);
  -webkit-transform: translate(0%, 0%);
  -moz-transform: translate(0%, 0%);

  opacity: 1;
}

@keyframes outSlideLeft {
  0% {
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translate(-200%, 0%);
    -webkit-transform: translate(-200%, 0%);
    -moz-transform: translate(-200%, 0%);
    opacity: 0;
  }
}

.aniamtion-out-slide-right {
  animation: outSlideRight 0.5s ease-in-out forwards;
  -webkit-animation: outSlideRight 0.5s ease-in-out forwards;
  -moz-animation: outSlideRight 0.5s ease-in-out forwards;

  transform: translate(0%, 0%);
  -webkit-transform: translate(0%, 0%);
  -moz-transform: translate(0%, 0%);

  opacity: 1;
}

@keyframes outSlideRight {
  0% {
    transform: translate(0%, 0%);
    -webkit-transform: translate(0%, 0%);
    -moz-transform: translate(0%, 0%);
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    transform: translate(200%, 0%);
    -webkit-transform: translate(200%, 0%);
    -moz-transform: translate(200%, 0%);
    opacity: 0;
  }
}

// #endregion

// #region Text
.text-10-mobile {
  font-size: min(12px, max(10px, 3.1vw));
}

.text-12-mobile {
  font-size: min(14px, max(12px, 3.3vw));
}

.text-14-mobile {
  font-size: min(16px, max(14px, 3.5vw));
}

.text-16-mobile {
  font-size: min(18px, max(16px, 3.7vw));
}

.text-20-mobile {
  font-size: min(22px, max(20px, 3.9vw));
}

.text-24-mobile {
  font-size: min(26px, max(24px, 4.1vw));
}

.text-tutorial {
  font-size: min(26px, max(16px, 1.6vw));
}
// #endregion

// #region Dialog Confirm
.box-dialog-confirm-container {
  width: 320px;
  background-color: #f2c043;
  border: 4px solid #4a261b;
  border-radius: 20px;
  padding: 7px;
  color: #4a261b;
}

.dialog-confirm-sub-content {
  background-color: #f6f3d3;
  border-radius: 12px;
  padding: 7px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.3);
}

.dialog-confirm-text {
  color: #4a261b;
}

.dialog-confirm-content {
  background-color: #efd080;
  padding: 10px;
  border-radius: 5px;
}
// #endregion

// #region ********** Mobile **********
.background-container-mobile {
  background-image: url("/images/background_main/background-gacha-pon.png");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.box-header-main-mobile {
  width: 100%;
  // height: 50px;
  padding: 10px;
}

// #region Section one
.box-container-mobile {
  max-width: 350px;
  min-width: 290px;
  width: 80%;
  margin: auto;
}

.box-label-rate-up-main-mobile {
  max-width: 360px;
  min-width: 290px;
  width: 100%;
  margin: auto;
}

.box-rate-up-main-mobile {
  margin-top: 5%;
}

.box-count-bar-limited-rate-up-mobile {
  position: relative;
  width: 100%;
  height: 10%;
  padding: 5%;
  border-radius: 1.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 0.15rem solid #4a261b;
  overflow: hidden;
}

.box-count-bar-limited-rate-up-mobile::before {
  content: "";
  position: absolute;
  top: 10%;
  left: -10%;
  width: 15%;
  height: 60%;
  background-image: url("/images/icon_main/icon-bubble.png");
  background-repeat: no-repeat;
  background-size: contain;
  transform: rotateY(200deg);
  z-index: 2;
}
// #endregion

// #region Section Two
.box-gacha-choose-character-mobile {
  max-width: 500px;
  width: 100%;
  height: 55%;
  background-image: url("/images/background_main/background-gacha-pon-choose-mobile.png");
  background-position: 50% 45%;
  background-size: 230%;
  background-repeat: no-repeat;
  margin: auto;
}

.box-gacha-choose-item-menu-mobile {
  max-width: 500px;
  width: 100%;
  height: 45%;
  background-color: #fff5e7;
  overflow: auto;
  margin: auto;
}

.box-gacha-choose-item-menu-mobile::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.label-gacha-choose-limited-mobile {
  max-width: 200px;
  width: 60%;
  top: 7%;
}

.box-footer-choose-mobile {
  max-width: 500px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.4);
  margin: auto;
}

.box-footer-pagination-mobile {
  background-color: #fff;
  border: 1px solid #e9e9e9;
}

.box-choose-button-pagination-mobile {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  text-align: center;
}

.box-choose-button-pagination-mobile.selected {
  background: -webkit-linear-gradient(#cd65d0, #62208e);
  color: #fff;
  font-size: 16px;
}

.choose-button-text-pagination-mobile {
  background: -webkit-linear-gradient(#cd65d0, #62208e);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 16px;
  opacity: 1;
  cursor: pointer;
}

.choose-button-text-pagination-mobile.disable {
  opacity: 0.2;
  cursor: default;
}

// #endregion

// #endregion
</style>
<!-- #endregion ***** Style ***** -->
