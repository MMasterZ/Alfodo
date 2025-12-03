<template>
  <div
    class="relative-position animate__animated box-level-reward-container relative-position animate__delay-1s animation-duration-0-5s"
    :class="isShowDialogLevelReward ? 'animate__fadeIn' : 'animate__fadeOut'"
  >
    <div
      class="sub-level-reward-container relative-position"
      :class="$q.platform.is.desktop ? '' : 'mobile'"
    >
      <!-- #region ป้ายเลเวล -->
      <div>
        <q-img
          src="/images/label_main/label-level-reward.webp"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region ไอคอนเลเวล/exp -->
      <div
        class="box-show-student-level"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
        align="center"
      >
        <!-- #region เลเวล -->
        <div
          class="relative-position box-level-tier"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
        >
          <q-img
            :src="`/images/box_main/box-rank-level-${studentStore.studentData.tier}.webp`"
            no-spinner
            no-transition
          ></q-img>

          <div
            class="absolute-center box-text-level font-fredoka"
            :class="$q.platform.is.desktop ? '' : 'mobile'"
          >
            {{ `${studentStore.studentData.level}` }}
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region EXP -->
        <div class="box-profile-progress" :class="$q.platform.is.desktop ? '' : 'mobile'">
          <div class="relative-position box-xp-progress">
            <q-img
              src="/images/box_main/box-xp-progress.webp"
              no-spinner
              no-transition
            ></q-img>
            <div
              class="absolute-center"
              style="top: 0; width: 100%; left: -89%; transition: transform 0.2s"
              :style="`transform: translateX(${comProgressLevel}%)`"
            >
              <q-img
                src="/images/box_main/box-xp-animation-progress.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>

          <div
            class="absolute-top box-icon-xp"
            :class="$q.platform.is.desktop ? '' : 'mobile'"
          >
            <q-img src="/images/icon_main/icon-xp.webp" no-spinner no-transition></q-img>
          </div>

          <div
            class="font-prompt-b xp-number"
            :class="$q.platform.is.desktop ? '' : 'mobile'"
            align="center"
          >
            {{
              `${funcSetToken(studentStore.studentData.exp)}/${funcSetToken(
                studentStore.studentData.nextEXP
              )}`
            }}
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region รางวัลสำหรับแต่ละเลเวล -->
      <div
        class="box-level-content relative-position"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
      >
        <div class="box-level-content-scroll">
          <div
            v-for="(item, index) in showLevelRewardList[currentPage - 1]"
            :key="indexWord"
          >
            <!-- #region หัวข้อของเลเวล -->
            <div class="row" id="level-reward-header" v-if="index % 10 == 0">
              <div
                class="col-1 self-center box-icon-level"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div class="relative-position">
                  <q-img
                    :src="`/images/box_main/box-rank-level-${item.type}.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                  <div
                    class="absolute-center box-text-level item font-fredoka"
                    :class="$q.platform.is.desktop ? '' : 'mobile'"
                  >
                    {{ `${item.level}` }}
                  </div>
                </div>
              </div>
              <div
                class="col self-center box-item-list-header"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div
                  class="box-pixel-text row justify-center items-center"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                >
                  <div
                    v-for="(itemWord, indexWord) in funcShowPixelText(
                      !item.isLock ? 'promoted' : 'lock'
                    )"
                    class="row"
                    :class="isStartAnimationHeader ? 'animation-pixel-text' : ''"
                    :style="`animation-delay:${indexWord * 0.1}s`"
                  >
                    <div class="self-center" style="margin: 0px 1.5px">
                      <div
                        v-for="(itemSetWord, indexSetWord) in itemWord"
                        :key="indexSetWord"
                        class="row justify-center items-center"
                      >
                        <div
                          class="col-1 self-center pixel-block"
                          v-for="(itemSetWordColor, indexSetWordColor) in itemSetWord"
                          :key="indexSetWordColor"
                          :class="[
                            $q.platform.is.desktop ? '' : 'mobile',
                            itemSetWordColor == 1
                              ? !item.isLock
                                ? 'color-green'
                                : 'color-red'
                              : '',
                          ]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region รายละเอียดรางวัลแต่ละเลเวล -->
            <div :id="`level-reward-${item.level}`" class="row">
              <div
                class="col-1 self-center box-icon-level"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div class="relative-position" align="center">
                  <q-img
                    :src="`/images/box_main/box-level-reward${
                      item.isLock ? '-disable' : ''
                    }.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                  <div
                    class="absolute-center box-text-reward-level item font-fredoka"
                    :class="[
                      $q.platform.is.desktop ? '' : 'mobile',
                      item.isLock ? 'disable' : '',
                    ]"
                  >
                    {{ `${item.level}` }}
                  </div>
                </div>
              </div>

              <div
                class="col self-center box-item-list-detail"
                :class="$q.platform.is.desktop ? '' : 'mobile'"
              >
                <div
                  class="box-item-reward row relative-position"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                >
                  <!-- #region ข้อมูลของไอเท็ม -->
                  <div
                    class="col-1 item-reward relative-position"
                    :class="$q.platform.is.desktop ? '' : 'mobile'"
                    v-for="(itemReward, indexReward) in item.items"
                    :key="indexReward"
                    @click="isFirstTutorial ? null : funcShowItemInfo(itemReward)"
                  >
                    <div>
                      <q-img
                        :src="`/images/button_main/button-item${
                          itemReward.grade == 'common' ? '' : '-limited'
                        }-blank.png`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div class="absolute-center" style="width: 80%">
                      <div v-if="itemReward.type == 'key' || itemReward.type == 'coin'">
                        <q-img
                          src="/images/icon_main/icon-premium-key.png"
                          no-spinner
                          no-transition
                          v-if="itemReward.type == 'key'"
                        ></q-img>
                        <q-img
                          src="/images/icon_main/icon-winner-coin.png"
                          no-spinner
                          no-transition
                          v-if="itemReward.type == 'coin'"
                        ></q-img>
                      </div>

                      <div v-else>
                        <q-img
                          :src="`${pathUrl}/${itemReward.itemName}.png`"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>

                    <div
                      class="absolute-bottom total-amount font-mali-b row justify-center items-center"
                      align="center"
                      :class="$q.platform.is.desktop ? '' : 'mobile'"
                      v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                    >
                      {{ itemReward.amount }}
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region สถานะ ล็อค/รับของรางวัลแล้ว -->
                  <div
                    class="absolute-center row justify-center items-center fit"
                    v-if="item.isLock || item.isClaimed"
                  >
                    <div class="absolute-center fit" style="opacity: 1">
                      <q-img
                        src="/images/box_main/box-black-mirror.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div
                      class="box-lock-item relative-position animate__animated animate__bounceIn"
                      :class="$q.platform.is.desktop ? '' : 'mobile'"
                    >
                      <div
                        class="box-pixel-text row justify-center items-center"
                        :class="$q.platform.is.desktop ? '' : 'mobile'"
                      >
                        <div
                          v-for="(itemWord, indexWord) in funcShowPixelText(
                            item.isLock ? 'lock' : 'claimed'
                          )"
                          :key="indexWord"
                        >
                          <div class="self-center" style="margin: 0px 1.5px">
                            <div
                              v-for="(itemSetWord, indexSetWord) in itemWord"
                              :key="indexSetWord"
                              class="row justify-center items-center"
                            >
                              <div
                                class="col-1 self-center pixel-block block"
                                v-for="(
                                  itemSetWordColor, indexSetWordColor
                                ) in itemSetWord"
                                :key="indexSetWordColor"
                                :class="[
                                  $q.platform.is.desktop ? '' : 'mobile',
                                  itemSetWordColor == 1
                                    ? item.isLock
                                      ? 'color-red'
                                      : 'color-blue'
                                    : '',
                                ]"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ตัวแสดงผลหน้า หรือ Pagination -->
      <div
        class="box-pagination-container font-mali-b row"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
        align="center"
      >
        <div
          class="col button-pagination row justify-center items-center self-center"
          :class="[
            $q.platform.is.desktop ? '' : 'mobile',
            currentPage == 1 ? 'not-active' : '',
          ]"
          @click="
            isFirstTutorial
              ? null
              : currentPage == 1
              ? null
              : funcSelectPage(currentPage - 1)
          "
        >
          <div v-if="currentPage > 1">
            {{ `<` }}
          </div>
        </div>
        <div
          class="col button-pagination row justify-center items-center self-center"
          v-for="(pagination, indexPagination) in showPagination"
          :key="indexPagination"
          :class="[
            $q.platform.is.desktop ? '' : 'mobile',
            currentPage == pagination ? 'active' : '',
          ]"
          @click="isFirstTutorial ? null : funcSelectPage(pagination)"
        >
          <div
            v-if="
              (showPagination[showPagination.length - 1] > 8 &&
                currentPage > 3 &&
                indexPagination == 1) ||
              (showPagination[showPagination.length - 1] > 8 &&
                currentPage < showPagination[showPagination.length - 1] - 3 &&
                indexPagination == 5)
            "
          >
            {{ `...` }}
          </div>
          <div v-else style="line-height: clamp(10px, 1vw, 16px)">
            {{ `${pagination}` }}
          </div>
        </div>
        <div
          class="col button-pagination row justify-center items-center self-center"
          @click="
            isFirstTutorial
              ? null
              : currentPage == rankLevelMax
              ? null
              : funcSelectPage(currentPage + 1)
          "
          :class="[
            $q.platform.is.desktop ? '' : 'mobile',
            currentPage == rankLevelMax ? 'not-active' : '',
          ]"
        >
          <div v-if="currentPage != rankLevelMax">
            {{ `>` }}
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มรับรางวัลทั้งหมด -->
      <div
        align="center"
        class="box-button-claim-all"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
      >
        <q-img
          :src="`/images/button_main/button-claim-all-level-reward${
            studentStore.isHasLevelReward ? '' : '-disable'
          }.webp`"
          no-spinner
          no-transition
          class="button-active-main"
          :class="studentStore.isHasLevelReward ? 'active' : 'disable'"
          @click="studentStore.isHasLevelReward ? funcClaimALlReward() : null"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มปิด -->
      <div
        class="absolute-top-right box-button-close"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
        v-if="!isFirstTutorial"
      >
        <q-img
          src="/images/icon_main/icon-close.png"
          class="cursor-pointer"
          no-spinner
          no-transition
          @click="funcCloseDialog()"
        ></q-img>
      </div>
      <!-- #endregion -->
    </div>
  </div>

  <!-- #region Dialog Level Reward -->
  <q-dialog v-model="isShowDialogLevelReward" maximized persistent v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main relative-position">
          <!-- <q-img
            src="/images/box_main/box-show-level-reward.webp"
            no-spinner
            no-transition
          >
          </q-img> -->

          <div class="relative-position box-level-reward-container fixed">
            <div class="sub-level-reward-container relative-position fixed">
              <!-- #region ป้ายเลเวล -->
              <div>
                <q-img
                  src="/images/label_main/label-level-reward.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region ไอคอนเลเวล/exp -->
              <div class="box-show-student-level fixed" align="center">
                <!-- #region เลเวล -->
                <div class="relative-position box-level-tier dialog">
                  <q-img
                    src="/images/box_main/box-rank-level-iron-1.webp"
                    no-spinner
                    no-transition
                  ></q-img>

                  <div class="absolute-center box-text-level font-fredoka fixed">
                    {{ `${studentStore.studentData.level}` }}
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region EXP -->
                <div class="box-profile-progress fixed">
                  <div class="relative-position box-xp-progress fixed">
                    <q-img
                      src="/images/box_main/box-xp-progress.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                    <div
                      class="absolute-center"
                      style="top: 0; width: 100%; left: -89%; transition: transform 0.2s"
                      :style="`transform: translateX(${comProgressLevel}%)`"
                    >
                      <q-img
                        src="/images/box_main/box-xp-animation-progress.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                  <div class="absolute-top box-icon-xp">
                    <q-img
                      src="/images/icon_main/icon-xp.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>

                  <div class="font-prompt-b xp-number q-mt-xs" align="center">
                    {{
                      `${funcSetToken(studentStore.studentData.exp)}/${funcSetToken(
                        studentStore.studentData.nextEXP
                      )}`
                    }}
                  </div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <!-- #region รางวัลสำหรับแต่ละเลเวล -->
              <div class="box-level-content relative-position">
                <div class="box-level-content-scroll">
                  <div
                    v-for="(item, index) in showLevelRewardList[currentPage - 1]"
                    :key="indexWord"
                  >
                    <!-- #region หัวข้อของเลเวล -->
                    <div class="row" id="level-reward-header" v-if="index % 10 == 0">
                      <div class="col-1 self-center box-icon-level">
                        <div class="relative-position">
                          <q-img
                            :src="`/images/box_main/box-rank-level-${item.type}.webp`"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div class="absolute-center box-text-level item font-fredoka">
                            {{ `${item.level}` }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col self-center"
                        style="padding: clamp(2.5px, 0.25vw, 4px)"
                      >
                        <div class="box-pixel-text row justify-center items-center">
                          <div
                            v-for="(itemWord, indexWord) in funcShowPixelText(
                              !item.isLock ? 'promoted' : 'lock'
                            )"
                            class="row"
                            :class="isStartAnimationHeader ? 'animation-pixel-text' : ''"
                            :style="`animation-delay:${indexWord * 0.1}s`"
                          >
                            <div class="self-center" style="margin: 0px 1.5px">
                              <div
                                v-for="(itemSetWord, indexSetWord) in itemWord"
                                :key="indexSetWord"
                                class="row justify-center items-center"
                              >
                                <div
                                  class="col-1 self-center pixel-block"
                                  v-for="(
                                    itemSetWordColor, indexSetWordColor
                                  ) in itemSetWord"
                                  :key="indexSetWordColor"
                                  :class="
                                    itemSetWordColor == 1
                                      ? !item.isLock
                                        ? 'color-green'
                                        : 'color-red'
                                      : ''
                                  "
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region รายละเอียดรางวัลแต่ละเลเวล -->
                    <div :id="`level-reward-${item.level}`" class="row">
                      <div class="col-1 self-center box-icon-level">
                        <div class="relative-position" align="center">
                          <q-img
                            :src="`/images/box_main/box-level-reward${
                              item.isLock ? '-disable' : ''
                            }.webp`"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div
                            class="absolute-center box-text-reward-level item font-fredoka"
                            :class="item.isLock ? 'disable' : ''"
                          >
                            {{ `${item.level}` }}
                          </div>
                        </div>
                      </div>

                      <div
                        class="col self-center"
                        style="
                          padding: clamp(1.25px, 0.125vw, 2px) clamp(2.5px, 0.25vw, 4px);
                        "
                      >
                        <div class="box-item-reward row relative-position">
                          <!-- #region ข้อมูลของไอเท็ม -->
                          <div
                            class="col-1 item-reward relative-position"
                            v-for="(itemReward, indexReward) in item.items"
                            :key="indexReward"
                            @click="isFirstTutorial ? null : funcShowItemInfo(itemReward)"
                          >
                            <div>
                              <q-img
                                :src="`/images/button_main/button-item${
                                  itemReward.grade == 'common' ? '' : '-limited'
                                }-blank.png`"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>

                            <div class="absolute-center" style="width: 80%">
                              <div
                                v-if="
                                  itemReward.type == 'key' || itemReward.type == 'coin'
                                "
                              >
                                <q-img
                                  src="/images/icon_main/icon-premium-key.png"
                                  no-spinner
                                  no-transition
                                  v-if="itemReward.type == 'key'"
                                ></q-img>
                                <q-img
                                  src="/images/icon_main/icon-winner-coin.png"
                                  no-spinner
                                  no-transition
                                  v-if="itemReward.type == 'coin'"
                                ></q-img>
                              </div>

                              <div v-else>
                                <q-img
                                  :src="`${pathUrl}/${itemReward.itemName}.png`"
                                  no-spinner
                                  no-transition
                                ></q-img>
                              </div>
                            </div>

                            <div
                              class="absolute-bottom total-amount font-mali-b row justify-center items-center"
                              align="center"
                              v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                            >
                              {{ itemReward.amount }}
                            </div>
                          </div>
                          <!-- #endregion -->

                          <!-- #region สถานะ ล็อค/รับของรางวัลแล้ว -->
                          <div
                            class="absolute-center row justify-center items-center fit"
                            v-if="item.isLock || item.isClaimed"
                          >
                            <div class="absolute-center fit" style="opacity: 1">
                              <q-img
                                src="/images/box_main/box-black-mirror.webp"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>

                            <div
                              class="box-lock-item relative-position animate__animated animate__bounceIn"
                            >
                              <div class="box-pixel-text row justify-center items-center">
                                <div
                                  v-for="(itemWord, indexWord) in funcShowPixelText(
                                    item.isLock ? 'lock' : 'claimed'
                                  )"
                                  :key="indexWord"
                                >
                                  <div class="self-center" style="margin: 0px 1.5px">
                                    <div
                                      v-for="(itemSetWord, indexSetWord) in itemWord"
                                      :key="indexSetWord"
                                      class="row justify-center items-center"
                                    >
                                      <div
                                        class="col-1 self-center pixel-block"
                                        style="width: 2.42px; height: 2.42px"
                                        v-for="(
                                          itemSetWordColor, indexSetWordColor
                                        ) in itemSetWord"
                                        :key="indexSetWordColor"
                                        :class="
                                          itemSetWordColor == 1
                                            ? item.isLock
                                              ? 'color-red'
                                              : 'color-blue'
                                            : ''
                                        "
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- #endregion -->
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ตัวแสดงผลหน้า หรือ Pagination -->
              <div class="box-pagination-container font-mali-b row" align="center">
                <div
                  class="col button-pagination row justify-center items-center self-center"
                  @click="
                    isFirstTutorial
                      ? null
                      : currentPage == 1
                      ? null
                      : funcSelectPage(currentPage - 1)
                  "
                  :class="currentPage == 1 ? 'not-active' : ''"
                >
                  <div v-if="currentPage > 1">
                    {{ `<` }}
                  </div>
                </div>
                <div
                  class="col button-pagination row justify-center items-center self-center"
                  v-for="(pagination, indexPagination) in showPagination"
                  :key="indexPagination"
                  :class="currentPage == pagination ? 'active' : ''"
                  @click="isFirstTutorial ? null : funcSelectPage(pagination)"
                >
                  <div
                    v-if="
                      (showPagination[showPagination.length - 1] > 8 &&
                        currentPage > 3 &&
                        indexPagination == 1) ||
                      (showPagination[showPagination.length - 1] > 8 &&
                        currentPage < showPagination[showPagination.length - 1] - 3 &&
                        indexPagination == 5)
                    "
                  >
                    {{ `...` }}
                  </div>
                  <div v-else style="line-height: clamp(10px, 1vw, 16px)">
                    {{ `${pagination}` }}
                  </div>
                </div>
                <div
                  class="col button-pagination row justify-center items-center self-center"
                  @click="
                    isFirstTutorial
                      ? null
                      : currentPage == rankLevelMax
                      ? null
                      : funcSelectPage(currentPage + 1)
                  "
                  :class="currentPage == rankLevelMax ? 'not-active' : ''"
                >
                  <div v-if="currentPage != rankLevelMax">
                    {{ `>` }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มรับรางวัลทั้งหมด -->
              <div align="center" class="box-button-claim-all">
                <q-img
                  :src="`/images/button_main/button-claim-all-level-reward${
                    studentStore.isHasLevelReward ? '' : '-disable'
                  }.webp`"
                  no-spinner
                  no-transition
                  class="button-active-main"
                  :class="studentStore.isHasLevelReward ? 'active' : 'disable'"
                  @click="studentStore.isHasLevelReward ? funcClaimALlReward() : null"
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มปิด -->
              <div class="absolute-top-right box-button-close">
                <q-img
                  src="/images/icon_main/icon-close.png"
                  class="cursor-pointer"
                  no-spinner
                  no-transition
                  @click="funcCloseDialog()"
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

  <!-- #region get reward -->
  <q-dialog
    v-model="isShowDialogGetReward"
    persistent
    maximized
    style="background-color: rgba(0, 0, 0, 0.75)"
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section
        class="fit row justify-center items-center no-padding"
        style="overflow: hidden"
      >
        <div class="box-dialog-get-reward">
          <dialog-reward
            :rewardList="showItemReward"
            @callback-closeDialog="funcCloseDialogGetReward()"
          ></dialog-reward>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog item info -->
  <dialog-item-info
    v-if="isShowDialogItemInfo"
    :itemData="selectedReward"
    @callback-closeDialog="funcCloseDialogItemInfo()"
  ></dialog-item-info>
  <!-- #endregion -->
</template>

<script setup>
import PXT from "src/js/pixel-text.js";

import dialogItemInfo from "components/dialog_main/dialog-item-info.vue";
import dialogReward from "components/dialog_main/dialog-reward.vue";

import { useInventoryStore } from "src/stores/inventory";
import { useStudentStore } from "src/stores/student";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Store
const studentStore = useStudentStore();
const inventoryStore = useInventoryStore();

// emits
const emits = defineEmits(["callback-closeDialog", "callback-claimAllReward"]);

// props
const props = defineProps({
  isFirstTutorial: {
    type: Boolean,
    default: false,
  },
});

// Data
const rankLevelMax = ref(12);
const arrayPXT = ref(PXT);
const currentPage = ref(1);
const pathUrl = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
);
const selectedReward = ref(null);
const showItemReward = ref(null);
const itemRewardList = ref([]);

// Boolean
const isStartAnimationHeader = ref(false);

// Dialog
const isShowDialogLevelReward = ref(true);
const isShowDialogItemInfo = ref(false);
const isShowDialogGetReward = ref(false);

// #region **** Function ****

// #region Select page
const funcSelectPage = (page) => {
  currentPage.value = page;

  let findCurrentLevelRewardPage = showLevelRewardList.value[page - 1].find(
    (x) => x.level == currentLevelByScroll.value
  );

  isStartAnimationHeader.value = false;

  if (findCurrentLevelRewardPage) {
    funcScrollIntoView();
  } else {
    if (listenScroll) {
      clearTimeout(listenScroll);
      listenScroll = null;
    }

    listenScroll = setTimeout(() => {
      let element = document.getElementById(`level-reward-header`);

      element.scrollIntoView({
        behavior: "instant",
        block: "start",
      });

      isStartAnimationHeader.value = true;
    }, 300);
  }
};
// #endregion

// #region Claim All Reward
const funcClaimALlReward = async () => {
  if (props.isFirstTutorial) {
    isShowDialogLevelReward.value = false;

    setTimeout(() => {
      studentStore.setClaimLevelReward();

      emits("callback-claimAllReward");
    }, 1000);

    return;
  }

  showItemReward.value = [];

  let tempLevelReward = JSON.stringify(studentStore.levelRewardList);

  tempLevelReward = JSON.parse(tempLevelReward);

  tempLevelReward = [...tempLevelReward];

  let findReward = tempLevelReward.filter(
    (x) => x.isClaimed == false && x.isLock == false
  );

  if (findReward.length) {
    findReward = findReward.map((x) => x.items).flat();

    let temp = [];

    let listOfDuplicate = [];

    findReward.forEach((res) => {
      res.isDuplicate = false;

      if (res.type == "coin") {
        let findCoin = temp.find((x) => x.type == "coin");

        if (findCoin) {
          findCoin.amount += Number(res.amount);
        } else {
          temp = [...temp, res];
        }
      } else if (res.type == "key") {
        let findKey = temp.find((x) => x.type == "key");

        if (findKey) {
          findKey.amount += Number(res.amount);
        } else {
          temp = [...temp, res];
        }
      } else {
        let findItemToInventory = inventoryStore.list.find(
          (x) => x.itemName == res.itemName
        );

        let amount = {
          type: "coin",
          value: "0",
        };

        res.amount = amount;

        if (findItemToInventory) {
          res.isDuplicate = true;
        } else {
          let findDuplicate = listOfDuplicate.find((x) => x == res.itemName);

          if (findDuplicate) {
            res.isDuplicate = true;
          } else {
            listOfDuplicate.push(res.itemName);
          }
        }

        temp = [...temp, res];
      }
    });

    temp.sort((a, b) => {
      const order = [
        "key",
        "coin",
        "limited pet",
        "limited other",
        "limited head",
        "limited body",
        "limited footer",
        "common pet",
        "common other",
        "common head",
        "common body",
        "common footer",
      ];

      const funcGetOrder = (item) => {
        if (item.type == "key" || item.type == "coin") return order.indexOf(item.type);
        else if (item.grade) return order.indexOf(`${item.grade} ${item.type}`);
      };

      let orderA = funcGetOrder(a);
      let orderB = funcGetOrder(b);

      return orderA - orderB;
    });

    showItemReward.value = temp;

    $q.loading.show();

    await studentStore.setClaimLevelReward();

    isShowDialogGetReward.value = true;

    $q.loading.hide();

    emits("callback-claimAllReward");
  }

  return;
};
// #endregion

// #region Show Pixel Text
const funcShowPixelText = (text) => {
  let setArrayText = text.split("");

  let setArrayPXT = [];

  setArrayText.forEach((itemText) => {
    let findText = arrayPXT.value[itemText];

    if (!findText) {
      findText = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ];
    }

    setArrayPXT.push(findText);
  });

  return setArrayPXT;
};
// #endregion

// #region Show Item info
const funcShowItemInfo = (item) => {
  selectedReward.value = item;

  isShowDialogItemInfo.value = true;
};
// #endregion

// #region Close Dialog
const funcCloseDialog = () => {
  isShowDialogLevelReward.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 500);
};
// #endregion

// #region Close Dialog Get Reward
const funcCloseDialogGetReward = () => {
  isShowDialogGetReward.value = false;
  showItemReward.value = null;
};
// #endregion

// #region Close Dialog Item Info
const funcCloseDialogItemInfo = () => {
  isShowDialogItemInfo.value = false;
  selectedReward.value = null;
};
// #endregion

// #region Set current token
const funcSetToken = (val) => {
  let total = val;

  return `${Number(total).toLocaleString()}`;
};
// #endregion

// #region Scorll into view
let listenScroll = null;
const funcScrollIntoView = () => {
  if (listenScroll) {
    clearTimeout(listenScroll);
    listenScroll = null;
  }

  listenScroll = setTimeout(() => {
    // let element = document.getElementById(`level-reward-${currentLevelByScroll.value}`);

    // if (element) {
    //   element.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });

    //   // element.scrollIntoView({
    //   //   behavior: "smooth",
    //   // });
    // }

    isStartAnimationHeader.value = true;
  }, 300);
};
// #endregion

// #endregion **** Function ****

// #region **** Computed ****

// #region Progress Level
const comProgressLevel = computed(() => {
  let progress = 0;

  progress = (
    (studentStore.studentData.exp / studentStore.studentData.nextEXP) *
    89
  ).toFixed(2);

  return progress;
});
// #endregion

// #region Show Level Reward List
const showLevelRewardList = computed(() => {
  let temp = [];

  if (studentStore.levelRewardList.length) {
    let min = 0;
    let max = 40;
    let splitItem = studentStore.levelRewardList.length / 40;

    for (let i = 0; i < splitItem; i++) {
      let item = studentStore.levelRewardList.slice(min, max);

      min = max;
      max += 40;

      temp.push(item);
    }
  }

  return temp;
});
// #endregion

// #region Show Pagination
const showPagination = computed(() => {
  let maxLength = 7;

  let tempNumber = [];
  for (let i = 1; i <= maxLength; i++) {
    let setPage = i;
    let totalPage = rankLevelMax.value;
    let currentSelectedPage = currentPage.value;

    let hlefPage = Math.ceil(maxLength / 2);

    if (currentSelectedPage > hlefPage && currentSelectedPage < totalPage - 3) {
      let setAddNumber = Math.floor(currentSelectedPage - hlefPage);

      if (currentSelectedPage > hlefPage) {
        setPage = i + setAddNumber;
      }
    } else {
      if (currentSelectedPage <= hlefPage) {
        setPage = i;
      }

      if (currentSelectedPage >= totalPage - 3) {
        setPage = i + (totalPage - maxLength);
      }
    }

    if (i == 1) {
      setPage = 1;
    }

    if (i == maxLength) {
      setPage = totalPage;
    }

    tempNumber.push(setPage);
  }

  return tempNumber;
});
// #endregion

// #region Current Level By Scroll
const currentLevelByScroll = computed(() => {
  let level = 0;

  if (studentStore.levelRewardList.length) {
    let findReward = studentStore.levelRewardList.find(
      (x) => !x.isLock && x.isClaimed == false
    );

    if (findReward) {
      level = findReward.level;
    }
  }

  return level;
});
// #endregion

// #endregion **** Computed ****

onMounted(() => {
  if (!props.isFirstTutorial) {
    setTimeout(() => {
      funcScrollIntoView();
    }, 300);
  }
});
</script>

<style lang="scss" scoped>
// #region Box

.box-dialog-get-reward {
  max-width: 340px;
  height: 600px;
}

.box-dialog-main {
  width: 340px;
  height: 600px;
}

.box-level-reward-container {
  width: 100%;
  height: 100%;
  padding: clamp(3.75px, 0.375cqw, 6px);
  border-radius: clamp(10px, 1cqw, 16px);
  border: clamp(1.25px, 0.125cqw, 2px) solid #000;
  background: #252525;
  margin: auto;

  &.dialog {
    width: 100%;
    height: 100%;
    padding: 6px;
    border-radius: 16px;
    border: 2px solid #000;
    background: #252525;
    margin: auto;
  }

  & .sub-level-reward-container {
    height: 100%;
    border-radius: clamp(5px, 0.5cqw, 8px);
    background: #404040;
    padding: clamp(5px, 0.5cqw, 8px);

    &.mobile {
      height: 100%;
      border-radius: 8px;
      background: #404040;
      padding: 8px;
    }

    &.dialog {
      height: 100%;
      border-radius: 8px;
      background: #404040;
      padding: 8px;
    }

    & .box-button-close {
      width: 13.2352%;
      top: -2.5%;
      right: -6%;

      &.mobile {
        width: 45px;
        top: -2.5%;
        right: -6%;
      }

      &.dialog {
        width: 45px;
        top: -2.5%;
        right: -6%;
      }
    }
  }
}

.box-show-student-level {
  width: 100%;
  // height: 100%;
  padding: clamp(10px, 1cqw, 16px) clamp(5px, 0.5cqw, 8px);
  margin: clamp(5px, 0.5cqw, 8px) 0px;
  border-radius: clamp(5px, 0.5cqw, 8px);
  background: rgba(0, 0, 0, 0.3);

  &.mobile {
    padding: 16px 8px;
    margin: 8px 0px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);
  }

  & .box-level-tier {
    width: 36.053%;

    &.mobile {
      width: 100px;
    }
  }
}

.box-profile-progress {
  width: 95%;
  margin-top: clamp(5px, 0.5cqw, 8px);
  position: relative;

  &.mobile {
    width: 100%;
    margin-top: 8px;
    position: relative;
  }

  & .box-xp-progress {
    width: 100%;
    height: 100%;
    border-radius: 99px;
    // border: 2px solid #000;
    // background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    line-height: 0px;
  }

  & .box-icon-xp {
    top: -20%;
    left: -0.4%;
    width: 18%;
  }
}

.xp-number {
  color: #fff;
  text-shadow: rgb(19, 19, 19) 2px 0px 0px, rgb(19, 19, 19) 1.75517px 0.958851px 0px,
    rgb(19, 19, 19) 1.0806px 1.68294px 0px, rgb(19, 19, 19) 0.141474px 1.99499px 0px,
    rgb(19, 19, 19) -0.832294px 1.81859px 0px, rgb(19, 19, 19) -1.60229px 1.19694px 0px,
    rgb(19, 19, 19) -1.97998px 0.28224px 0px, rgb(19, 19, 19) -1.87291px -0.701566px 0px,
    rgb(19, 19, 19) -1.30729px -1.5136px 0px, rgb(19, 19, 19) -0.421592px -1.95506px 0px,
    rgb(19, 19, 19) 0.567324px -1.91785px 0px, rgb(19, 19, 19) 1.41734px -1.41108px 0px,
    rgb(19, 19, 19) 1.92034px -0.558831px 0px;
  font-size: clamp(7.5px, 0.75cqw, 12px);
  margin-top: clamp(5px, 0.5cqw, 8px);

  &.mobile {
    font-size: 12px;
    margin-top: 8px;
  }
}

.box-level-content {
  height: 45%;
  border-radius: clamp(5px, 0.5cqw, 8px);
  background: rgba(0, 0, 0, 0.3);
  padding: clamp(2.5px, 0.25cqw, 4px) clamp(2.5px, 0.25cqw, 4px) 0px;

  &.mobile {
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 4px 0px;
  }

  & .box-level-content-scroll {
    height: 100%;
    overflow: auto;

    & .box-item-list-header {
      padding: clamp(2.5px, 0.25cqw, 4px);

      &.mobile {
        padding: 4px;
      }
    }

    & .box-item-list-detail {
      padding: clamp(1.25px, 0.125cqw, 2px) clamp(2.5px, 0.25cqw, 4px);

      &.mobile {
        padding: 2px 4px;
      }
    }

    &::-webkit-scrollbar {
      width: clamp(2.5px, 0.25cqw, 4px);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: #aaa;
    }
  }
}

.box-icon-level {
  width: clamp(37.5px, 3.75cqw, 60px);

  &.mobile {
    width: 60px;
  }
}

.box-item-reward {
  width: 100%;
  height: 100%;
  padding: clamp(2.5px, 0.25cqw, 4px);
  border-radius: clamp(5px, 0.5cqw, 8px);
  background: rgba(0, 0, 0, 0.3);

  &.mobile {
    padding: 4px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.3);
  }

  & .item-reward {
    width: clamp(32.5px, 3.25cqw, 52px);
    cursor: pointer;

    &.mobile {
      width: 52px;
    }

    & .total-amount {
      bottom: clamp(5px, 0.5cqw, 8px);
      width: clamp(25px, 2.5cqw, 40px);
      height: clamp(10.625px, 1.0625cqw, 17px);
      border-radius: clamp(16.875px, 1.60875cqw, 25.74px);
      background: rgba(0, 0, 0, 0.1);
      margin: auto;
      line-height: clamp(10px, 1cqw, 16px);
      color: #fff;
      text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
        rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
        rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
        rgb(0, 0, 0) 0.96017px -0.279415px 0px;
      font-size: clamp(8.75px, 0.875cqw, 14px);

      &.mobile {
        bottom: 8px;
        width: 40px;
        height: 17px;
        font-size: 14px;
        line-height: 16px;
        border-radius: 25.74px;
      }
    }
  }
}

.box-pixel-text {
  padding: clamp(2.5px, 0.25cqw, 4px);
  border-radius: clamp(2.5px, 0.25cqw, 4px);
  background: #202020;
  line-height: 0;

  &.mobile {
    padding: 4px;
    border-radius: 4px;
    background: #202020;
  }

  & .pixel-block {
    width: clamp(2.5px, 0.25cqw, 4px);
    height: clamp(2.5px, 0.25cqw, 4px);
    margin: clamp(0.3125px, 0.03125cqw, 0.5px);
    background-color: #202020;

    &.mobile {
      width: 4px;
      height: 4px;
      margin: 0.5px;

      &.block {
        width: 2.42px;
        height: 2.42px;
      }
    }

    &.color-green {
      background-color: #74ff52;
    }

    &.color-red {
      background-color: #ff0000;
    }

    &.color-blue {
      background-color: #4be0ff;
    }
  }
}

.box-pagination-container {
  height: clamp(20px, 2cqw, 32px);
  margin: clamp(5px, 0.5cqw, 8px) 0px;
  color: #4be0ff;
  font-size: clamp(10px, 1cqw, 16px);

  &.mobile {
    height: 32px;
    margin: 8px 0px;
    color: #4be0ff;
    font-size: 16px;
  }

  & .button-pagination {
    width: 100%;
    height: 100%;
    border-radius: clamp(2.5px, 0.25cqw, 4px);

    &.mobile {
      border-radius: 4px;

      &.active {
        background: #4be0ff;
        color: #202020;
        cursor: pointer;

        &:hover {
          border-radius: 4px;
          background: linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.5) 0%,
              rgba(255, 255, 255, 0.5) 100%
            ),
            #4be0ff;
        }
      }
    }

    &:not(.mobile).active {
      background: #4be0ff;
      color: #202020;
      cursor: pointer;

      &:hover {
        border-radius: clamp(2.5px, 0.25cqw, 4px);
        background: linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.5) 100%
          ),
          #4be0ff;
      }
    }

    &:not(.not-active, .active):hover {
      border-radius: clamp(2.5px, 0.25cqw, 4px);
      background: rgba(75, 224, 255, 0.3);
      cursor: pointer;
    }
  }
}

.box-button-claim-all {
  width: clamp(103.75px, 10.375cqw, 166px);
  margin: auto;

  &.mobile {
    width: 166px;
  }
}

.box-lock-item {
  width: clamp(90px, 9cqw, 144px);

  &.mobile {
    width: 144px;
  }
}
// #endregion

// #region Button
.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
  cursor: pointer;

  &.active:active {
    transform: scale(0.99);
    -webkit-transform: scale(0.99);
    -moz-transform: scale(0.99);
  }

  &.hover:hover {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);

    transform-origin: center;
    -webkit-transform-origin: center;

    transition: 0.1s;
    -webkit-transition: 0.1s;
  }

  &.disable {
    cursor: default;
  }
}
// #endregion

// #region Text
.box-text-level {
  width: 100%;
  top: 50%;
  font-size: clamp(18.75px, 1.875cqw, 30px);
  color: #fff;
  text-shadow: rgb(43, 43, 43) 3px 0px 0px, rgb(43, 43, 43) 2.83487px 0.981584px 0px,
    rgb(43, 43, 43) 2.35766px 1.85511px 0px, rgb(43, 43, 43) 1.62091px 2.52441px 0px,
    rgb(43, 43, 43) 0.705713px 2.91581px 0px, rgb(43, 43, 43) -0.287171px 2.98622px 0px,
    rgb(43, 43, 43) -1.24844px 2.72789px 0px, rgb(43, 43, 43) -2.07227px 2.16926px 0px,
    rgb(43, 43, 43) -2.66798px 1.37182px 0px, rgb(43, 43, 43) -2.96998px 0.42336px 0px,
    rgb(43, 43, 43) -2.94502px -0.571704px 0px, rgb(43, 43, 43) -2.59586px -1.50383px 0px,
    rgb(43, 43, 43) -1.96093px -2.27041px 0px, rgb(43, 43, 43) -1.11013px -2.78704px 0px,
    rgb(43, 43, 43) -0.137119px -2.99686px 0px, rgb(43, 43, 43) 0.850987px -2.87677px 0px,
    rgb(43, 43, 43) 1.74541px -2.43999px 0px, rgb(43, 43, 43) 2.44769px -1.73459px 0px,
    rgb(43, 43, 43) 2.88051px -0.838247px 0px;
  text-align: center;

  &.mobile {
    font-size: 30px;
  }

  &.item {
    font-size: clamp(11.25px, 1.125cqw, 18px);

    &.mobile {
      font-size: 18px;
    }
  }
}

.box-text-reward-level {
  color: #4be0ff;
  text-shadow: rgb(0, 76, 84) 2px 0px 0px, rgb(0, 76, 84) 1.75517px 0.958851px 0px,
    rgb(0, 76, 84) 1.0806px 1.68294px 0px, rgb(0, 76, 84) 0.141474px 1.99499px 0px,
    rgb(0, 76, 84) -0.832294px 1.81859px 0px, rgb(0, 76, 84) -1.60229px 1.19694px 0px,
    rgb(0, 76, 84) -1.97998px 0.28224px 0px, rgb(0, 76, 84) -1.87291px -0.701566px 0px,
    rgb(0, 76, 84) -1.30729px -1.5136px 0px, rgb(0, 76, 84) -0.421592px -1.95506px 0px,
    rgb(0, 76, 84) 0.567324px -1.91785px 0px, rgb(0, 76, 84) 1.41734px -1.41108px 0px,
    rgb(0, 76, 84) 1.92034px -0.558831px 0px;
  font-size: clamp(11.25px, 1.125cqw, 18px);

  &.mobile {
    font-size: 18px;
  }

  &.disable {
    color: #c1c1c1;
    text-shadow: rgb(34, 34, 34) 3px 0px 0px, rgb(34, 34, 34) 2.83487px 0.981584px 0px,
      rgb(34, 34, 34) 2.35766px 1.85511px 0px, rgb(34, 34, 34) 1.62091px 2.52441px 0px,
      rgb(34, 34, 34) 0.705713px 2.91581px 0px, rgb(34, 34, 34) -0.287171px 2.98622px 0px,
      rgb(34, 34, 34) -1.24844px 2.72789px 0px, rgb(34, 34, 34) -2.07227px 2.16926px 0px,
      rgb(34, 34, 34) -2.66798px 1.37182px 0px, rgb(34, 34, 34) -2.96998px 0.42336px 0px,
      rgb(34, 34, 34) -2.94502px -0.571704px 0px,
      rgb(34, 34, 34) -2.59586px -1.50383px 0px, rgb(34, 34, 34) -1.96093px -2.27041px 0px,
      rgb(34, 34, 34) -1.11013px -2.78704px 0px,
      rgb(34, 34, 34) -0.137119px -2.99686px 0px,
      rgb(34, 34, 34) 0.850987px -2.87677px 0px, rgb(34, 34, 34) 1.74541px -2.43999px 0px,
      rgb(34, 34, 34) 2.44769px -1.73459px 0px, rgb(34, 34, 34) 2.88051px -0.838247px 0px;
  }
}
// #endregion

// #region Animation
.animation-pixel-text {
  animation: pixelText 4s ease-in-out infinite;
  opacity: 0;

  @keyframes pixelText {
    30% {
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
// #endregion
</style>
