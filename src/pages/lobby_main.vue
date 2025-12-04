<template>
  <q-page class="row justify-center items-center backdrop-lobby">
    <!-- #region Desktop -->
    <div
      class="box-container-main relative-position"
      v-if="$q.platform.is.desktop && isLoaded"
    >
      <background-main :background="`background-lobby-default`"></background-main>

      <!-- #region Backdrop -->
      <div
        class="absolute-center box-backdrop-main layer-1 animate__animated animate__fadeIn"
        v-show="isShowBackDrop"
      ></div>
      <!-- #endregion -->

      <!-- #region รวมปุ่ม Header ทั้งหมด -->

      <!-- #region เลเวลของตัวละคร -->
      <div
        class="absolute-top-left box-tier-user"
        :class="
          isShowDialogTutorialFirstTime
            ? tutorialData.showContentType == 'show-profile' ||
              tutorialData.showContentType == 'show-level'
              ? 'layer-1'
              : ''
            : ''
        "
        :style="`width:${SWI(120)}%`"
      >
        <div class="relative-position">
          <q-img
            :src="`/images/box_main/box-rank-level-${studentStore.studentData.tier}.webp`"
            no-spinner
            no-transition
          ></q-img>

          <div
            class="absolute-center fit row justify-center items-center box-text-level text-shadow-level font-fredoka"
          >
            {{
              `${
                studentStore.studentData.level > 480
                  ? "MAX"
                  : studentStore.studentData.level
              }`
            }}
          </div>

          <div
            class="absolute-center fit row justify-center items-center box-text-level font-fredoka"
            :class="studentStore.studentData.level >= 401 ? 'high-level' : 'normal-level'"
          >
            {{
              `${
                studentStore.studentData.level > 480
                  ? "MAX"
                  : studentStore.studentData.level
              }`
            }}
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region โปรไพล์ -->
      <div
        class="absolute-top-left box-profile-container"
        :style="`width:${SWI(316)}%`"
        :class="
          isShowDialogTutorialFirstTime
            ? tutorialData.showContentType == 'show-profile' ||
              tutorialData.showContentType == 'show-profile-level-reward'
              ? 'layer-top'
              : ''
            : isShowBackDrop
            ? ''
            : 'layer-1'
        "
      >
        <!-- #region โปรไพล์ -->
        <div class="relative-position box-profile-header">
          <q-img
            src="/images/box_main/box-profile-container.webp"
            no-spinner
            no-transition
          ></q-img>
          <div class="absolute-center row justify-center fit profile-header-content">
            <div class="col profile-name relative-position font-mali-m">
              {{ `${studentStore.characterName}` }}
            </div>
            <div class="col-1 button-icon-profile">
              <q-img
                class="button-active-main"
                :class="[
                  {
                    'no-pointer-events': comIsDiableTutorial,
                  },
                ]"
                :src="`/images/button_main/button-icon-profile.webp`"
                no-spinner
                no-transition
                @click="funcGoTo('profile')"
              ></q-img>
            </div>
            <div class="col-12 self-end row box-profile-progress">
              <div class="col relative-position box-xp-progress">
                <div class="relative-position box-overflow">
                  <q-img
                    src="/images/box_main/box-xp-progress.webp"
                    no-spinner
                    no-transition
                  ></q-img>

                  <div
                    class="absolute-top box-progress-animation-bar"
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

                <div
                  class="absolute-bottom-right self-center font-prompt-b xp-number"
                  align="right"
                >
                  {{
                    `${funcSetToken(studentStore.studentData.exp)}/${funcSetToken(
                      studentStore.studentData.nextEXP
                    )}`
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region รายละเอียดของปุ่มรับรางวัล -->
        <div class="relative-position box-profile-expand-content">
          <div :class="isOpenProfile ? 'expand-on' : 'expand-off'">
            <q-img
              src="/images/box_main/box-profile-content.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div
            class="absolute-center fit profile-content row justify-center"
            align="center"
          >
            <div class="col-12 box-pixel-container relative-position">
              <q-img
                src="/images/box_main/box-pixel-get-reward-blank.webp"
                no-spinner
                no-transition
              ></q-img>

              <div class="absolute-center fit">
                <div
                  class="relative-position animate__animated"
                  :class="
                    isOpenProfile
                      ? 'animate__delay-1s animate__fadeInLeft'
                      : 'animate__fadeOutRight'
                  "
                >
                  <div class="relative-position animation-pixel-flash">
                    <q-img
                      :src="`/images/box_main/box-pixel-get-reward-${
                        studentStore.isHasLevelReward ? 'true' : 'false'
                      }.webp`"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 self-end relative-position button-level-reward">
              <q-img
                class="button-active-main"
                :class="[
                  {
                    'no-pointer-events': comIsDiableTutorial,
                    disable: synchronizeStore.isSync,
                  },
                ]"
                :src="`/images/button_main/button-level-reward${
                  synchronizeStore.isSync ? '-disable' : ''
                }.webp`"
                @click="funcGoTo('level-reward')"
                no-transition
                no-spinner
              ></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มเปิดโปรไพล์รับของรางวัล -->
        <div
          class="relative-position box-profile-expand"
          :class="[
            {
              disable: comIsDiableTutorial,
            },
          ]"
          @click="funcOpenProfile()"
        >
          <q-img
            :src="`/images/box_main/box-profile-expand-bar${
              studentStore.isHasLevelReward ? '-level-up' : ''
            }.webp`"
            no-spinner
            no-transition
          ></q-img>

          <div class="absolute-center icon-expand">
            <div
              class="relative-position"
              :class="isOpenProfile ? 'icon-on' : 'icon-off'"
            >
              <q-img
                :src="`/images/button_main/button-profile-expand${
                  studentStore.isHasLevelReward ? '-level-up' : ''
                }.webp`"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มอินโฟเมชั่น -->
      <div
        class="absolute-top-left box-button-info"
        :class="
          isShowDialogTutorialFirstTime && tutorialData.showContentType == 'show-info'
            ? 'layer-top'
            : ''
        "
        :style="`width:${SWI(20)}%`"
      >
        <div
          class="relative-position"
          @click="comIsDiableTutorial ? null : funcGoTo('tutorial')"
        >
          <q-img
            src="/images/icon_main/icon-info.webp"
            no-spinner
            no-transition
            class="button-active-main"
            :class="comIsDiableTutorial ? 'disable' : ''"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มซับซับสไคร้ -->
      <div
        class="absolute-top-left box-button-subscribe-main"
        :style="`width:${SWI(173)}%`"
        v-if="studentStore.studentType != 'school'"
      >
        <div class="relative-position box-button-subscribe">
          <q-img
            class="button-active-main"
            src="/images/button_main/button-subscribe.webp"
            no-spinner
            no-transition
            @click="funcGoTo('subscribe')"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มทดลองเรียนฟรี -->
      <div
        class="absolute-top-left box-button-seven-day-trial-main"
        :style="`width:${SWI(180)}%`"
        v-if="studentStore.studentType != 'school' && courseStore.courseLevel == '0' && !courseStore?.isTrial"
      >
        <div class="relative-position box-button-seven-day-trial">
          <q-img
            class="button-active-main"
            src="/images/button_main/button-seven-day-trial.webp"
            no-spinner
            no-transition
            @click="funcGoTo('open-seven-day-trial')"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงเวลาที่ทดลองเรียนฟรี -->
      <div
        class="absolute-top-left box-remaining-time-main"
        :style="`width:${SWI(216)}%`"
        v-if="studentStore.studentType != 'school' && courseStore.courseLevel != '0' && courseStore?.isTrial && courseStore.trialExpireData.remainingTime > 0"
      >
        <div class="relative-position fit">
          <q-img
            src="/images/box_main/box-remaining-time.webp"
            no-spinner
            no-transition
          ></q-img>

          <div class="absolute box-text-remaining-time font-mali-m">
            <!-- v-if="studentStore.distanceInDays > 0" -->
            <span>
              {{ `Trial Time remaining ${courseStore.trialExpireData.remainingTime} Days` }}
            </span>
            <!-- <span v-if="studentStore.distanceInDays == 0">
              {{ `Expire today` }}
            </span> -->
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มข่าว -->
      <div
        class="absolute-top-right box-button-news"
        :class="isShowButtonHeader ? 'layer-1' : ''"
        :style="`width:${SWI(52)}%`"
      >
        <div
          class="relative-position button-active-main"
          :class="isShowButtonHeader ? 'disable' : ''"
          @click="isShowButtonHeader ? null : funcGoTo('mailbox')"
        >
          <q-img
            :src="`/images/button_main/button-mail-news.webp`"
            no-spinner
            no-transition
          ></q-img>

          <div
            class="absolute-top-right box-icon-notification"
            v-if="
              newsStore.mailboxList.length &&
              !newsStore.isReadAll &&
              !isShowDialogTutorialFirstTime
            "
          >
            <div class="relative-position animate__animated">
              <q-img
                src="/images/icon_main/icon-notification.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มตั้งค่า -->
      <div
        class="absolute-top-right box-button-setting"
        :class="isShowButtonHeader ? 'layer-1' : ''"
        :style="`width:${SWI(52)}%`"
      >
        <div
          class="relative-position"
          @click="isShowButtonHeader ? null : funcGoTo('setting')"
        >
          <q-img
            class="button-active-main"
            :class="isShowButtonHeader ? 'disable' : ''"
            src="/images/button_main/button-setting.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มออกจากระบบ -->
      <div
        class="absolute-top-right box-button-logout"
        :class="isShowButtonHeader ? 'layer-1' : ''"
        :style="`width:${SWI(52)}%`"
      >
        <div
          class="relative-position"
          @click="isShowButtonHeader ? null : funcGoTo('logout')"
        >
          <q-img
            class="button-active-main"
            :class="isShowButtonHeader ? 'disable' : ''"
            src="/images/button_main/button-logout.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region ตัวละคร -->
      <div class="absolute-bottom-right box-character-main" :style="`width:${SWI(640)}%`">
        <character-main :setId="'student-main'"></character-main>
      </div>
      <!-- #endregion -->

      <!-- #region ตัวละครบัดดี้ -->
      <div
        class="absolute-bottom-left box-character-buddy-main buddy"
        :style="`width:${SWI(640)}%;`"
        v-if="schoolStore.isEnableBuddy && studentStore.studentType == 'school'"
      >
      <div class="relative-position">
        <div class="absolute-bottom" style="bottom:clamp(-75px,-4.6875cqw,-46.875px);width:clamp(300px,30cqw,480px);margin:auto;">
          <q-img src="/images/box_main/box-base-character.webp" no-spinner no-transition></q-img>
        </div>
        <div
          class="relative-position"
          style="width:clamp(175px,17.5cqw,280px); margin: auto"
          v-if="!buddyStore.isBuddy"
        >
          <q-img
            src="/images/box_main/box-character-buddy.webp"
            no-spinner
            no-transition>
          </q-img>
          </div>
          <div class="relative-position" align="center" v-if="buddyStore.isBuddy">

            <character-main
              :isBuddy="true"
              :equipment="buddyStore.character"
              :setId="'buddy-main'"
              v-if="buddyStore.isCreateCharacter"
            ></character-main>

            <div v-if="!buddyStore.isCreateCharacter">
              <character-none></character-none>
              <div class="absolute-center box-character-none font-mali-m" align="center">
                ผู้ใช้งานนี้ยังไม่ได้สร้างตัวละคร
              </div>
            </div>

            <div class="absolute-bottom row box-buddy-details-container">
              <div class="col-1 self-center relative-position box-buddy-level">
                <q-img
                  :src="`/images/box_main/box-rank-level-${buddyStore.buddy.data.tier}.webp`"
                  no-spinner
                  no-transition
                ></q-img>

                <div class="absolute-center box-text-level font-fredoka">
                  {{ `${buddyStore.buddy.data.level}` }}
                </div>
              </div>
              <div class="col-1 self-center box-buddy-container relative-position">
                <q-img
                  src="/images/box_main/box-buddy-name.webp"
                  no-spinner
                  no-transition
                ></q-img>

                <div class="absolute-center fit box-buddy-name-main row">
                  <div class="col box-buddy-name">
                    <div class="box-buddy-name-text" align="left">
                      <span v-if="buddyStore.isCreateCharacter">
                        {{ `${buddyStore.character.name}` }}
                      </span>
                      <span v-if="!buddyStore.isCreateCharacter">
                        {{ `${buddyStore.name}` }}
                      </span>
                    </div>
                  </div>

                  <div class="col-1 box-button-unpair" @click="funcGoTo('buddy')">
                    <q-img
                      class="button-active-main"
                      src="/images/button_main/button-buddy-unpair.webp"
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

      <!-- #region ปุ่มบัดดี้ -->
      <div
        class="absolute-top-left box-button-buddy-main"
        :style="`width:${SWI(100)}%`"
        :class="tutorialData.showContentType == 'show-buddy-mode' ? 'layer-top' : ''"
        v-if="
          schoolStore.isEnableBuddy &&
          studentStore.studentType == 'school' &&
          !buddyStore.isBuddy
        "
      >
        <div class="relative-position">
          <div
            class="button-buddy-mode"
            :class="activeType == 'button-buddy' ? 'layer-1' : ''"
            @click="comIsDiableTutorial ? null : funcGoTo('buddy')"
          >
            <q-img
              class="button-active-main"
              :class="comIsDiableTutorial ? 'disable' : ''"
              src="/images/button_main/button-buddy-mode.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Footer -->

      <!-- #region ปุ่มเมนู -->
      <div
        class="absolute-bottom-left box-button-menu"
        :class="isShowButtonMenu ? 'layer-top' : ''"
        :style="`width:${SWI(100)}%`"
      >
        <div class="relative-position">
          <div
            :class="
              !isStartAnimation
                ? ''
                : isOpenMenu
                ? 'animation-open-menu'
                : 'animation-close-menu'
            "
          >
            <q-img
              class="button-active-main"
              :class="comIsDiableTutorial ? 'disable' : ''"
              :src="`/images/button_main/button-menu-${
                isChangeMenu ? 'open' : 'close'
              }.webp`"
              no-spinner
              no-transition
              @click="funcOpenMenu()"
            ></q-img>
          </div>

          <div
            class="absolute-top-right box-icon-notification"
            v-if="inventoryStore.isNewItem"
          >
            <div class="relative-position">
              <q-img
                src="/images/icon_main/icon-notification.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าเมนู -->
      <div
        class="absolute-bottom-left box-menu-container"
        :class="isShowMenu ? 'layer-top' : ''"
        :style="`width:${SWI(516)}%`"
        v-if="isStartAnimation"
      >
        <div
          class="relative-position animate__animated"
          :class="isOpenMenu ? 'animate__bounceInLeft' : 'animate__bounceOutLeft'"
          style="animation-duration: 0.3s"
        >
          <q-img src="/images/box_main/box-menu.webp" no-spinner no-transition></q-img>

          <!-- #region เหรียญ/กุจแจ -->
          <div class="absolute-top box-menu-header row justify-between">
            <div class="col-1 box-token-main relative-position">
              <div class="absolute-top-left icon-coin">
                <q-img
                  src="/images/box_main/box-cubic.webp"
                  no-transition
                  no-spinner
                ></q-img>
              </div>

              <div class="absolute-top-left box-token-number font-mali-b" align="center">
                {{ funcSetToken(studentStore.coin) }}
              </div>
            </div>
            <div class="col-1 box-token-main relative-position">
              <div class="absolute-top-left icon-key">
                <q-img
                  src="/images/box_main/box-crystal.webp"
                  no-transition
                  no-spinner
                ></q-img>
              </div>

              <div class="absolute-top-left box-token-number font-mali-b" align="center">
                {{ funcSetToken(studentStore.premiumKey) }}
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region เมนู -->
          <div class="absolute-top box-menu-content">
            <div
              class="row items-center"
              style="padding-bottom: clamp(15px, 1.5cqw, 24px)"
              v-for="i in 2"
            >
              <div
                class="col-4 box-button-menu-main"
                align="center"
                v-for="(itemMenu, indexMenu) in menuList[i - 1]"
                :key="indexMenu"
              >
                <div
                  class="button-menu-content relative-position"
                  @click="
                    synchronizeStore.isSync || comIsDiableTutorial
                      ? null
                      : funcGoTo(itemMenu.name)
                  "
                >
                  <div
                    class="button-active-main"
                    :class="
                      synchronizeStore.isSync || comIsDiableTutorial ? 'disable' : 'hover'
                    "
                  >
                    <q-img
                      :src="`/images/button_main/${
                        synchronizeStore.isSync ? itemMenu.imageLock : itemMenu.image
                      }`"
                      no-spinner
                      no-transition
                    ></q-img>

                    <div
                      class="absolute-bottom-right box-icon-notification"
                      v-if="itemMenu.name == 'equipment' && inventoryStore.isNewItem"
                    >
                      <div class="relative-position animate__animated">
                        <q-img
                          src="/images/icon_main/icon-notification.webp"
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
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มอีเว้นท์ -->
      <div
        class="absolute-bottom-right box-button-event"
        :style="`width:${SWI(150)}%`"
        :class="tutorialData.showContentType == 'show-button-learn' ? 'layer-top' : ''"
        v-if="eventStore.isHasEvent"
      >
        <div
          @click="funcGoTo('event')"
          :class="
            synchronizeStore.isSync || comIsDiableTutorial
              ? 'no-pointer-events'
              : 'cursor-pointer '
          "
        >
          <svg
            width="150"
            height="109"
            viewBox="0 0 150 109"
            style="width: 100%; height: 100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <image
                v-if="!synchronizeStore.isSync"
                href="images/button_main/button-event.png"
                :x="`-${positionX}px`"
                :y="`-${positionY}px`"
              ></image>
              <image v-else href="/images/button_main/button-event-disable.png"></image>
            </g>
          </svg>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มเกม -->
      <div
        class="absolute-bottom-right box-button-game"
        :style="`width:${SWI(93.33)}%`"
        :class="tutorialData.showContentType == 'show-button-learn' ? 'layer-top' : ''"
      >
        <div
          :class="
            synchronizeStore.isSync || comIsDiableTutorial ? '' : 'animation-button'
          "
          class=""
          @click="funcGoTo('play')"
        >
          <q-img
            class="button-active-main"
            :class="{
              'no-pointer-events': comIsDiableTutorial,
              disable: synchronizeStore.isSync,
            }"
            :src="`/images/button_main/button-play-game${
              synchronizeStore.isSync ? '-disable' : ''
            }.png`"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มเรียน -->
      <div
        class="absolute-bottom-right box-button-learn"
        :style="`width:${SWI(150)}%`"
        :class="tutorialData.showContentType == 'show-button-learn' ? 'layer-top' : ''"
      >
        <div
          :class="
            comIsDiableTutorial ? '' : 'animation-button'
          "
          @click="funcGoTo('learn')"
        >
          <q-img
            class="button-active-main"
            :class="{
              'no-pointer-events': comIsDiableTutorial,
            }"
            :src="`/images/button_main/button-learn.webp`"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Wintown -->
      <div
        class="absolute box-wintown-main"
        :class="isShowWinnyChat ? 'show' : ''"
        @click="funcGoTo('wintown')"
        v-if="false"
      >
        <wintown-icon></wintown-icon>
      </div>
      <!-- #endregion -->

      <!-- #region Winny -->
      <div
        class="absolute box-winny-main"
        :class="isShowWinnyChat ? 'show' : ''"
        @click="funcGoTo('winny')"
      >
        <div class="relative-position">
          <div class="absolute-left box-talk-ai row items-center" v-if="isShowAiTalk">
            <div class="font-mali-b">สวัสดีครับ</div>
          </div>
          <winny-icon></winny-icon>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Winny Chat -->
      <div
        class="absolute-bottom-left box-winny-chat-main"
        :class="isShowWinnyChat ? 'show' : ''"
        v-if="isShowAnimationWinnyChat"
      >
        <div
          class="fit relative-position animate__animated"
          :class="isShowWinnyChat ? '' : 'animate__bounceOutDown'"
        >
          <winny-chat
            :isShowWinnyChat="isShowWinnyChat"
            @callback-closeDialog="isShowWinnyChat = false"
            v-if="isShowWinnyChat"
          ></winny-chat>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region แจ้งเตือนการถูกควบคุม -->
      <div
        class="absolute-bottom box-alert-control-container"
        v-if="isStartControlAnimation"
      >
        <div
          class="relative-position fit animate__animated"
          :class="synchronizeStore.isSync ? 'animate__backInUp' : 'animate__backOutDown'"
          style="animation-duration: 0.7s"
        >
          <div
            class="box-alert-control relative-position animate__animated animate__pulse animate__infinite"
            style="animation-duration: 1s"
          >
            <div class="sub-alert-control font-mali-sb" align="center">
              กำลังอยู่ในโหมดคุณครูควบคุม...
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region Dialog รวมแสดงผลเลเวลอัพ -->

      <!-- #region แสดงผล เลเวลอัพ -->
      <div
        class="absolute-center box-dialog-level-up-container"
        :class="isShowDialogLevelUp ? 'layer-top' : ''"
        v-if="isShowDialogLevelUp"
      >
        <dialog-level-up
          @callback-closeDialog="funcCloseDialogLevelUp()"
          @callback-claimAllReward="funcClaimAllReward()"
          @callback-levelUp="isOpenProfile = true"
        ></dialog-level-up>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Level reward -->
      <div
        class="absolute-center box-dialog-level-reward-container"
        :class="isShowDialogLevelReward ? 'layer-top' : ''"
        v-if="isShowDialogLevelReward"
      >
        <dialog-level-reward
          @callback-closeDialog="isShowDialogLevelReward = false"
          @callback-claimAllReward="isOpenProfile = false"
        ></dialog-level-reward>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงผลข้อมูลโปรไฟล์ -->
      <div
        class="absolute-center box-dialog-profile-container"
        :class="isShowDialogProfile && !isShowDialogTutorialFirstTime ? 'layer-top' : ''"
        v-if="isShowDialogProfile"
      >
        <dialog-profile
          :isTutorial="isShowDialogTutorialFirstTime"
          @callback-closeDialog="isShowDialogProfile = false"
          @callback-showDialogAgreement="funcShowDialogAgreement()"
        ></dialog-profile>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <div
        class="absolute-center box-backdrop-main"
        v-if="isShowDialogTutorialFirstTime"
      ></div>

      <!-- #region แสดงผลการสอนหน้า Lobby -->
      <tutorial-lobby
        v-if="isShowDialogTutorialFirstTime"
        @callback-showContentType="funcShowTutorialContentType"
        @callback-finishTutorial="funcCloseDialogTutorial()"
        :isNextTutorial="isNextTutorial"
      ></tutorial-lobby>
      <!-- #endregion -->

      <!-- #region Dialog รวมแสดงผลการทดลองเรียนฟรี -->

      <!-- #region ทดลองเรียนฟรี -->
      <div class="absolute-center box-dialog-seven-day-trial-container" v-if="isShowDialogSevenDayTrial">
        <dialog-seven-day-trial @callback-goTo="funcGoTo"></dialog-seven-day-trial>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงระดับที่แนะนำ -->
      <div class="absolute-center box-dialog-special-recommend-level-container" v-if="isShowDialogSpecialRecommendLevel">
        <dialog-special-recommend-level @callback-closeDialog="funcCloseDialogSpecialRecommendLevel()" @callback-skipPlacementTest="funcSkipPlacementTest()"></dialog-special-recommend-level>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงระดับที่ทดสอบได้ -->
      <div class="absolute-center box-dialog-special-your-level-container" v-if="isShowDialogSpecialYourLevel">
        <dialog-special-your-level @callback-closeDialog="funcCloseDialogSpecialYourLevel()" @callback-chooseTrialLevel="funcShowDialogChooseTrialLevel()"></dialog-special-your-level>
      </div>
      <!-- #endregion -->

      <!-- #region เลือกเลเวลทดลองเรียน -->
      <div class="absolute-center box-choose-trial-level-container" v-if="isShowDialogChooseTrialCardLevel">
        <dialog-choose-trial-card-level @callback-closeDialog="funcCloseDialogChooseTrialCardLevel()" @callback-chooseTrialLevel="funcShowDialogUnlockLevel"></dialog-choose-trial-card-level>
      </div>
      <!-- #endregion -->

      <!-- #region อนิเมชั่นปลดล็อกเลเวล -->
      <div class="absolute-center box-unlock-level-container" v-if="isShowDialogUnlockLevel">
        <dialog-animation-unlock-level :cardLevelData="cardLevelData" @callback-finish="funcCloseDialogUnlock()"></dialog-animation-unlock-level>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region Dialog Welcome to wintown -->
      <div class="absolute-center box-backdrop-main row justify-center items-center z-max" v-if="isShowDialogWelcomeToWintown">
        <dialog-wintown-popup @callback-closeDialog="funcCloseDialogWelcomeToWintown()"></dialog-wintown-popup>
      </div>
      <!-- #endregion -->

    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div
      class="col-12 relative-position box-container-main mobile row items-center"
      style="
        background-image: url('/images/background_main/background-lobby-default.webp');
      "
      v-if="!$q.platform.is.desktop && isLoaded"
    >

      <div
        class="fit absolute-center box-backdrop-main layer-5"
        v-show="isShowBackDrop"
      ></div>

      <!-- #region Header -->
      <div class="col-12 self-start row">
        <!-- #region เลเวลของตัวละคร -->
        <div
          class="col-1 box-tier-user mobile relative-position"
          :class="
            isShowDialogTutorialFirstTime
              ? tutorialData.showContentType == 'show-profile' ||
                tutorialData.showContentType == 'show-level'
                ? 'layer-top'
                : ''
              : ''
          "
        >
          <div class="relative-position">
            <q-img
              :src="`/images/box_main/box-rank-level-${studentStore.studentData.tier}.webp`"
              no-spinner
              no-transition
            ></q-img>

            <div
              class="absolute-center fit row justify-center items-center box-text-level font-fredoka f20"
            >
              {{
                `${
                  studentStore.studentData.level > 480
                    ? "MAX"
                    : studentStore.studentData.level
                }`
              }}
            </div>

            <div
              class="absolute-center fit row justify-center items-center box-text-level font-fredoka f20"
              :class="
                studentStore.studentData.level >= 401 ? 'high-level' : 'normal-level'
              "
            >
              {{
                `${
                  studentStore.studentData.level > 480
                    ? "MAX"
                    : studentStore.studentData.level
                }`
              }}
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region โปรไพล์ -->
        <div
          class="col-1 box-profile-container mobile relative-position"
          :class="
            isShowDialogTutorialFirstTime
              ? tutorialData.showContentType == 'show-profile' ||
                tutorialData.showContentType == 'show-profile-level-reward'
                ? 'layer-top'
                : ''
              : 'layer-top'
          "
        >
          <div class="relative-position box-profile-header mobile">
            <q-img
              src="/images/box_main/box-profile-container-mobile.webp"
              no-spinner
              no-transition
            ></q-img>

            <div
              class="absolute-center row justify-center fit profile-header-content mobile"
            >
              <div class="col-1 profile-name mobile relative-position font-mali-m f12">
                {{ `${studentStore.characterName}` }}
              </div>
              <div class="col-1 button-icon-profile mobile">
                <q-img
                  class="button-active-main"
                  :class="synchronizeStore.isSync ? 'disable' : ''"
                  :src="`/images/button_main/button-icon-profile${
                    synchronizeStore.isSync ? '-disable' : ''
                  }.webp`"
                  no-spinner
                  no-transition
                  @click="funcGoTo('profile')"
                ></q-img>
              </div>
              <div class="col-12 self-end row box-profile-progress mobile">
                <div class="col-1 relative-position box-xp-progress mobile">
                  <div class="relative-position box-overflow">
                    <q-img
                      src="/images/box_main/box-xp-progress.webp"
                      no-spinner
                      no-transition
                    ></q-img>

                    <div
                      class="absolute-top box-progress-animation-bar"
                      :style="`transform: translateX(${comProgressLevel}%)`"
                    >
                      <q-img
                        src="/images/box_main/box-xp-animation-progress.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                  <div class="absolute-top box-icon-xp mobile">
                    <q-img
                      src="/images/icon_main/icon-xp.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>

                  <div
                    class="absolute-bottom-right font-prompt-b xp-number mobile"
                    align="center"
                  >
                    {{
                      `${funcSetToken(studentStore.studentData.exp)}/${funcSetToken(
                        studentStore.studentData.nextEXP
                      )}`
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="absolute-top box-profile-expand-container"
            :class="isOpenProfile ? 'layer-top' : ''"
          >
            <!-- #region รายละเอียดของปุ่มรับรางวัล -->
            <div class="relative-position box-profile-expand-content mobile">
              <div :class="isOpenProfile ? 'expand-on' : 'expand-off'">
                <q-img
                  src="/images/box_main/box-profile-content.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

              <div
                class="absolute-center fit profile-content mobile row justify-center"
                align="center"
              >
                <div class="col-12 box-pixel-container mobile relative-position">
                  <q-img
                    src="/images/box_main/box-pixel-get-reward-blank.webp"
                    no-spinner
                    no-transition
                  ></q-img>

                  <div class="absolute-center fit">
                    <div
                      class="relative-position animate__animated"
                      :class="
                        isOpenProfile
                          ? 'animate__delay-1s animate__fadeInLeft'
                          : 'animate__fadeOutRight'
                      "
                    >
                      <div class="relative-position animation-pixel-flash">
                        <q-img
                          :src="`/images/box_main/box-pixel-get-reward-${
                            studentStore.isHasLevelReward ? 'true' : 'false'
                          }.webp`"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-1 self-end relative-position button-level-reward mobile">
                  <q-img
                    class="button-active-main"
                    :class="synchronizeStore.isSync ? 'disable' : ''"
                    :src="`/images/button_main/button-level-reward${
                      synchronizeStore.isSync ? '-disable' : ''
                    }.webp`"
                    @click="funcGoTo('level-reward')"
                    no-transition
                    no-spinner
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region ปุ่มเปิดโปรไพล์รับของรางวัล -->
            <div
              class="relative-position box-profile-expand mobile"
              @click="funcOpenProfile()"
            >
              <q-img
                :src="`/images/box_main/box-profile-expand-bar${
                  studentStore.isHasLevelReward ? '-level-up' : ''
                }-mobile.webp`"
                no-spinner
                no-transition
              ></q-img>

              <div class="absolute-center icon-expand mobile">
                <div
                  class="relative-position"
                  :class="isOpenProfile ? 'icon-on' : 'icon-off'"
                >
                  <q-img
                    :src="`/images/button_main/button-profile-expand${
                      studentStore.isHasLevelReward ? '-level-up' : ''
                    }.webp`"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มอินโฟเมชั่น -->
        <div
          class="box-button-info mobile"
          :class="
            isShowDialogTutorialFirstTime
              ? tutorialData.showContentType == 'show-info'
                ? 'layer-top'
                : ''
              : ''
          "
        >
          <div class="relative-position" @click="funcGoTo('tutorial')">
            <q-img
              src="/images/icon_main/icon-info.webp"
              no-spinner
              no-transition
              class="button-active-main"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <q-space></q-space>

        <!-- #region ปุ่มเมนู -->
        <div
          class="box-button-menu mobile"
          :class="
            isShowDialogTutorialFirstTime
              ? tutorialData.showContentType == 'show-button-menu'
                ? 'layer-top'
                : ''
              : ''
          "
        >
          <div class="relative-position">
            <div
              :class="
                !isStartAnimation
                  ? ''
                  : isOpenMenu
                  ? 'animation-open-menu'
                  : 'animation-close-menu'
              "
              class="relative-position"
            >
              <q-img
                class="button-active-main"
                :src="`/images/button_main/button-menu-${
                  isChangeMenu ? 'open' : 'close'
                }.webp`"
                no-spinner
                no-transition
                @click="funcOpenMenu()"
              ></q-img>
            </div>

            <div
              class="absolute-top-right box-icon-notification mobile"
              v-if="inventoryStore.isNewItem || !newsStore.isReadAll"
            >
              <div class="relative-position">
                <q-img
                  src="/images/icon_main/icon-notification.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region หน้าเมนู -->
        <div
          class="absolute-top-right box-menu-container-mobile"
          :class="
            isShowDialogTutorialFirstTime
              ? tutorialData.showContentType == 'show-button-menu'
                ? 'layer-top'
                : 'layer-1'
              : isShowMenu
              ? 'layer-7'
              : 'layer-7'
          "
          v-if="isStartAnimation"
        >
          <div
            class="relative-position animate__animated"
            :class="isOpenMenu ? 'animate__fadeInRight' : 'animate__fadeOutRight'"
            style="animation-duration: 0.3s"
          >
            <q-img
              src="/images/box_main/box-menu-mobile.webp"
              no-spinner
              no-transition
            ></q-img>

            <!-- #region เหรียญ/กุจแจ -->
            <div class="absolute-top box-menu-header-mobile row justify-center">
              <div class="col-1 box-token-main-mobile relative-position">
                <q-img
                  src="/images/box_main/box-cubic.webp"
                  no-spinner
                  no-transition
                ></q-img>

                <div
                  class="absolute-top-left box-token-number-mobile font-mali-b"
                  align="center"
                >
                  {{ funcSetToken(studentStore.coin) }}
                </div>
              </div>
              <div class="col-1 box-token-main-mobile relative-position">
                <q-img
                  src="/images/box_main/box-crystal.webp"
                  no-spinner
                  no-transition
                ></q-img>

                <div
                  class="absolute-top-left box-token-number-mobile font-mali-b"
                  align="center"
                >
                  {{ funcSetToken(studentStore.premiumKey || 0) }}
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region เมนู -->
            <div class="absolute-top box-menu-content-mobile justify-center">
              <div class="row justify-end">
                <!-- #region ปุ่มข่าว -->
                <div class="box-button-news mobile">
                  <div
                    class="relative-position button-active-main"
                    :class="synchronizeStore.isSync ? 'disable' : ''"
                    @click="funcGoTo('mailbox')"
                  >
                    <q-img
                      :src="`/images/button_main/button-mail-news.webp`"
                      no-spinner
                      no-transition
                    ></q-img>

                    <div
                      class="absolute-top-right box-icon-notification mobile"
                      v-if="newsStore.mailboxList.length && !newsStore.isReadAll"
                    >
                      <div class="relative-position animate__animated">
                        <q-img
                          src="/images/icon_main/icon-notification.webp"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region ปุ่มตั้งค่า -->
                <div class="box-button-setting mobile">
                  <div class="relative-position" @click="funcGoTo('setting')">
                    <q-img
                      class="cursor-pointer button-active-main"
                      src="/images/button_main/button-setting.webp"
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region ปุ่มออกจากระบบ -->
                <div class="box-button-logout mobile">
                  <div class="relative-position" @click="funcGoTo('logout')">
                    <q-img
                      class="button-active-main"
                      src="/images/button_main/button-logout.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->
              </div>

              <div class="row q-mt-lg">
                <div
                  class="col-3 box-button-menu-main-mobile"
                  v-for="(itemMenu, indexMenu) in menuListMobile"
                  :key="indexMenu"
                  align="center"
                >
                  <div
                    class="button-menu-content-mobile relative-position"
                    @click="funcGoTo(itemMenu.name)"
                  >
                    <div
                      class="button-active-main"
                      :class="synchronizeStore.isSync ? 'disable' : 'hover'"
                    >
                      <q-img
                        :src="`/images/button_main/${
                          synchronizeStore.isSync ? itemMenu.imageLock : itemMenu.image
                        }`"
                        no-spinner
                        no-transition
                      ></q-img>

                      <div
                        class="absolute-bottom-right box-icon-notification-mobile"
                        v-if="itemMenu.name == 'equipment' && inventoryStore.isNewItem"
                      >
                        <div class="relative-position animate__animated">
                          <q-img
                            src="/images/icon_main/icon-notification.webp"
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
        </div>
        <!-- #endregion -->

        <!-- #region Winny -->
        <div class="absolute-top-right box-winny-main-mobile" @click="funcGoTo('winny')">
          <winny-icon></winny-icon>
        </div>
        <!-- #endregion -->

        <!-- #region Wintown -->
        <div
          class="absolute box-wintown-main-mobile"
          @click="funcGoTo('wintown')"
          v-if="false"
        >
          <wintown-icon></wintown-icon>
        </div>
        <!-- #endregion -->

        <!-- #region Winny Chat -->
        <winny-chat
          v-if="isShowWinnyChat"
          @callback-closeDialog="isShowWinnyChat = false"
        ></winny-chat>
        <!-- #endregion -->

        <!-- #region ปุ่มซับซับสไคร้ -->
        <div
          class="absolute-top box-button-subscribe-main mobile"
          v-if="studentStore.studentType != 'school'"
        >
          <div class="relative-position box-button-subscribe mobile">
            <q-img
              class="button-active-main"
              src="/images/button_main/button-subscribe-mobile.webp"
              no-spinner
              no-transition
              @click="funcGoTo('subscribe')"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มทดลองเรียนฟรี-->
        <div
          class="absolute-top box-button-seven-day-trial-main mobile"
          v-if="studentStore.studentType != 'school' && courseStore.courseLevel == '0' && !courseStore?.isTrial"
        >
          <div class="relative-position box-button-seven-day-trial mobile">
            <q-img
              class="button-active-main"
              src="/images/button_main/button-seven-day-trial-mobile.webp"
              no-spinner
              no-transition
              @click="funcGoTo('open-seven-day-trial')"
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region แสดงเวลาหมดอายุทดลองเรียนฟรี -->
          <div
            class="absolute-top box-remaining-time-main mobile"
            v-if="studentStore.studentType != 'school' && courseStore.courseLevel != '0' && courseStore?.isTrial && courseStore.trialExpireData.remainingTime > 0"
          >
            <div class="relative-position fit">
              <q-img
                src="/images/box_main/box-remaining-time.webp"
                no-spinner
                no-transition
              ></q-img>

              <div class="absolute-center box-text-remaining-time mobile font-mali-m">
                <span>
                  {{ `Trial Time  remaining ${courseStore.trialExpireData.remainingTime} Days` }}
                </span>
              </div>
            </div>
          </div>
        <!-- #endregion -->

        <!-- #region ปุ่มบัดดี้ -->
        <div
          class="absolute-top box-character-buddy-main mobile"
          v-if="
            (!isShowDialogTutorialFirstTime &&
              schoolStore.isEnableBuddy &&
              studentStore.studentType == 'school' &&
              !buddyStore.isBuddy) ||
            (isShowDialogTutorialFirstTime &&
              tutorialData.showContentType != 'show-unpair-buddy-mode')
          "
        >
          <div class="relative-position" @click="funcGoTo('buddy')">
            <q-img
              class="button-active-main"
              src="/images/button_main/button-buddy-mode-mobile.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region รายละเอียดบัดดี้ -->
        <div
          class="absolute-top box-buddy-details-container-mobile row index-1"
          v-if="
            schoolStore.isEnableBuddy &&
            studentStore.studentType == 'school' &&
            buddyStore.isBuddy
          "
        >
          <div class="col-1 self-center box-buddy-level mobile relative-position">
            <q-img
              :src="`/images/box_main/box-rank-level-${buddyStore.buddy.data.tier}.webp`"
              no-spinner
              no-transition
            ></q-img>

            <div
              class="absolute-center fit row justify-center items-center box-text-level mobile font-fredoka"
            >
              {{ `${buddyStore.buddy.data.level}` }}
            </div>
          </div>
          <div class="col-1 self-center box-buddy-container mobile">
            <div class="relative-position">
              <q-img
                src="/images/box_main/box-buddy-name-mobile.webp"
                no-spinner
                no-transition
              ></q-img>

              <div class="absolute-center fit box-buddy-name-main mobile row">
                <div class="col box-buddy-name mobile">
                  <div class="box-buddy-name-text mobile" align="left">
                    <span v-if="buddyStore.isCreateCharacter">
                      {{ `${buddyStore.character.name}` }}
                    </span>
                    <span v-if="!buddyStore.isCreateCharacter">
                      {{ `${buddyStore.name}` }}
                    </span>
                  </div>
                </div>

                <div
                  class="col-1 self-end box-button-unpair mobile"
                  @click="funcGoTo('buddy')"
                >
                  <q-img
                    class="button-active-main"
                    src="/images/button_main/button-buddy-unpair-mobile.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region ตัวละคร -->
      <div
        class="absolute-bottom box-character-main mobile"
        align="center"
      >
        <div style="width: 100%">
          <character-main :setId="'student-main'"></character-main>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Footer -->
      <div
        class="absolute-bottom self-end row justify-center box-button-footer"
        :class="tutorialData.showContentType == 'box-button-footer' ? 'layer-top' : ''"
      >
        <!-- #region แจ้งเตือนการถูกควบคุม -->
        <div class="col-12" align="center" v-if="isStartControlAnimation">
          <div
            class="box-alert-control-container mobile animate__animated"
            style="animation-duration: 0.5s"
            :class="synchronizeStore.isSync ? 'animate__bounceIn' : 'animate__bounceOut'"
          >
            <div class="box-alert-control mobile relative-position animate__animated">
              <div class="sub-alert-control mobile font-mali-sb" align="center">
                กำลังอยู่ในโหมดคุณครูควบคุม...
              </div>
            </div>
          </div>
        </div>

        <!-- #region ปุ่มเกม -->
        <div class="self-end box-button-game mobile">
          <div
            :class="
              isShowDialogTutorialFirstTime || synchronizeStore.isSync
                ? ''
                : 'animation-button'
            "
            @click="funcGoTo('play')"
          >
            <q-img
              class="button-active-main"
              :class="synchronizeStore.isSync ? 'disable' : ''"
              :src="`/images/button_main/button-play-game${
                synchronizeStore.isSync ? '-disable' : ''
              }.png`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มเรียน -->
        <div class="self-end box-button-learn mobile">
          <div
            :class="
              isShowDialogTutorialFirstTime || synchronizeStore.isSync
                ? ''
                : 'animation-button'
            "
            @click="funcGoTo('learn')"
          >
            <q-img
              class="button-active-main"
              :class="synchronizeStore.isSync ? 'disable' : ''"
              :src="`/images/button_main/button-learn.webp`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มอีเว้นท์ -->
        <!-- v-if="studentStore.studentType == 'school' && eventStore.eventList.length > 0" -->
        <div class="self-end box-button-event mobile">
          <div
            :class="
              isShowDialogTutorialFirstTime || synchronizeStore.isSync
                ? ''
                : 'animation-button'
            "
            v-if="eventStore.isHasEvent"
          >
            <svg
              width="150"
              height="109"
              viewBox="0 0 150 109"
              style="width: 100%; height: 100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                @click="funcGoTo('event')"
                :class="
                  synchronizeStore.isSync ? 'cursor-not-allowed ' : 'cursor-pointer '
                "
              >
                <image
                  v-if="!synchronizeStore.isSync"
                  href="images/button_main/button-event.png"
                  :x="`-${positionX}px`"
                  :y="`-${positionY}px`"
                ></image>
                <image v-else href="/images/button_main/button-event-disable.png"></image>
              </g>
            </svg>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Dialog รวมแสดงผลเลเวลอัพ -->

      <!-- #region แสดงเลเวลอัพ -->
      <div
        class="absolute-center box-dialog-level-up-container mobile"
        :class="isShowDialogLevelUp ? 'layer-top' : ''"
        v-if="isShowDialogLevelUp"
      >
        <dialog-level-up
          @callback-closeDialog="funcCloseDialogLevelUp()"
          @callback-claimAllReward="funcClaimAllReward()"
        ></dialog-level-up>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงข้อมูลเลเวลของรางวัล -->
      <div
        class="absolute-center box-dialog-level-reward-container mobile"
        :class="isShowDialogLevelReward ? 'layer-top' : ''"
        v-if="isShowDialogLevelReward"
      >
        <dialog-level-reward
          @callback-closeDialog="isShowDialogLevelReward = false"
          @callback-claimAllReward="isOpenProfile = false"
        ></dialog-level-reward>
      </div>
      <!-- #endregion -->

      <!-- #region แสดงข้อมูลโปรไฟล์ -->
      <div
        class="absolute-center box-dialog-profile-container mobile"
        :class="isShowDialogProfile && !isShowDialogTutorialFirstTime ? 'layer-top' : ''"
        v-if="isShowDialogProfile"
      >
        <dialog-profile
          :isTutorial="isShowDialogTutorialFirstTime"
          @callback-closeDialog="isShowDialogProfile = false"
          @callback-showDialogAgreement="funcShowDialogAgreement()"
        ></dialog-profile>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <div
        class="absolute-center box-backdrop-main layer-1"
        v-if="isShowDialogTutorialFirstTime"
      ></div>

      <!-- #region แสดงผลการสอนหน้า Lobby -->
      <tutorial-lobby
        v-if="isShowDialogTutorialFirstTime"
        @callback-showContentType="funcShowTutorialContentType"
        @callback-finishTutorial="funcCloseDialogTutorial()"
        :isNextTutorial="isNextTutorial"
      ></tutorial-lobby>
      <!-- #endregion -->

      <!-- #region Dialog รวมแสดงผลการทดลองเรียนฟรี -->

      <!-- #region Dialog ทดลองเรียนฟรี -->
      <div class="absolute-center box-dialog-seven-day-trial-container mobile" v-if="isShowDialogSevenDayTrial">
        <dialog-seven-day-trial @callback-goTo="funcGoTo"></dialog-seven-day-trial>
      </div>
      <!-- #endregion -->

       <!-- #region Dialog แสดงระดับที่แนะนำ -->
       <div class="absolute-center box-dialog-special-recommend-level-container" v-if="isShowDialogSpecialRecommendLevel">
        <dialog-special-recommend-level @callback-closeDialog="funcCloseDialogSpecialRecommendLevel()" @callback-skipPlacementTest="funcSkipPlacementTest()"></dialog-special-recommend-level>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog แสดงระดับที่ทดสอบได้ -->
      <div class="absolute-center box-dialog-special-your-level-container" v-if="isShowDialogSpecialYourLevel">
        <dialog-special-your-level @callback-closeDialog="funcCloseDialogSpecialYourLevel()" @callback-chooseTrialLevel="funcShowDialogChooseTrialLevel()"></dialog-special-your-level>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog เลือกเลเวลทดลองเรียน -->
      <div class="absolute-center box-choose-trial-level-container mobile" v-if="isShowDialogChooseTrialCardLevel">
        <dialog-choose-trial-card-level @callback-closeDialog="funcCloseDialogChooseTrialCardLevel()" @callback-chooseTrialLevel="funcShowDialogUnlockLevel"></dialog-choose-trial-card-level>
      </div>
      <!-- #endregion -->

      <!-- #region อนิเมชั่นปลดล็อกเลเวล -->
      <div class="absolute-center box-unlock-level-container mobile" v-if="isShowDialogUnlockLevel">
        <dialog-animation-unlock-level :cardLevelData="cardLevelData" @callback-finish="funcCloseDialogUnlock()"></dialog-animation-unlock-level>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Profile -->
  <!-- <dialog-profile
    :isDialogProfile="isShowDialogProfile"
    v-if="isShowDialogProfile && !$q.platform.is.desktop"
    @callback-closeDialog="isShowDialogProfile = false"
    @callback-showDialogAgreement="funcShowDialogAgreement()"
  ></dialog-profile> -->
  <!-- #endregion -->

  <!-- #region Dialog Tutorial -->
  <dialog-tutorial
    v-if="isShowDialogTutorial"
    :isDialogTutorial="isShowDialogTutorial"
    @callback-closeDialog="funcCloseDialogTutorial()"
    :pageName="'lobby'"
  ></dialog-tutorial>
  <!-- #endregion -->

  <!-- #region Dialog Policy -->
  <dialog-policy
    v-if="isShowDialogPolicy"
    @callback-closeDialog="funcCloseDialogPolicy()"
  >
  </dialog-policy>
  <!-- #endregion -->

  <!-- #region Dialog Buddy -->
  <dialog-buddy-login
    @callback-closeDialog="isShowDialogBuddyLogin = false"
    @callback-openDialog="isShowDialogBuddyLogin = true"
    @callback-logout="buddyStore.logout()"
    v-if="isShowDialogBuddyLogin"
  ></dialog-buddy-login>
  <!-- #endregion -->

  <!-- #region Dialog Ranking -->
  <ranking-dialog
    v-if="isShowDialogRanking"
    @callback-closeDialog="isShowDialogRanking = false"
  ></ranking-dialog>
  <!-- #endregion -->

  <!-- #region Dialog event -->
  <dialog-event
    v-if="isShowDialogEvent"
    @callback-closeDialog="isShowDialogEvent = false"
  ></dialog-event>
  <!-- #endregion -->

  <!-- #region Dialog Minigame menu -->
  <dialog-minigame-menu
    v-if="isShowDialogMiniGanmeMenu"
    @callback-closeDialog="isShowDialogMiniGanmeMenu = false"
  ></dialog-minigame-menu>
  <!-- #endregion -->

  <!-- #region Dialog mailbox -->
  <dialog-mailbox
    v-if="isShowDialogMailbox"
    @callback-closeDialog="isShowDialogMailbox = false"
  ></dialog-mailbox>
  <!-- #endregion -->

  <!-- #region Dialog Setting -->
  <dialog-setting
    v-if="isShowDialogSetting"
    @callback-closeDialog="isShowDialogSetting = false"
  ></dialog-setting>
  <!-- #endregion -->

  <!-- #region Dialog News -->
  <dialog-news
    v-if="isShowDialogNews"
    @callback-closeDialog="funcCloseDialogNews()"
  ></dialog-news>
  <!-- #endregion -->

  <!-- #region Dialog recommend level -->
  <dialog-recommend-level
    v-if="isShowDialogRecommendLevel"
    @close-dialog="funcCloseDialogRecommendLevel()"
  ></dialog-recommend-level>
  <!-- #endregion -->

  <!-- #region Dialog Your level 2 -->
  <dialog-your-level-2
    v-if="isShowDialogYourLevel"
    @close-dialog="isShowDialogYourLevel = false"
  ></dialog-your-level-2>
  <!-- #endregion -->

  <!-- #region Dialog Get Started -->
  <q-dialog v-model="isShowDialogGetStarted" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-get-started-container relative-position">
          <div class="sub" align="center">
            <div class="font-mali-b f20">มาเริ่มเรียนรู้กันเถอะ!</div>
            <div class="q-my-md fomt-mali-m f14">
              ยังไม่สามารถใช้งานส่วนนี้ได้ <br />
              เพราะยังไม่มีระดับการเรียน
            </div>
            <div class="fomt-mali-m f14">
              เลือกระดับที่ต้องการ แล้วมาสนุก <br />
              กับการเรียนภาษาอังกฤษไปด้วยกัน!
            </div>
            <div style="margin: 27px 0 16px">
              <q-img
                class="cursor-pointer"
                src="images/button_main/button-go-to-package.webp"
                no-spinner
                no-transition
                @click="funcGoTo('subscribe')"
              ></q-img>
            </div>
            <div
              class="f12 font-mali-m relative-position"
              style="text-decoration: underline; color: #0085ff; z-index: 1"
              v-close-popup
            >
              <span class="cursor-pointer">ตัดสินใจภายหลัง</span>
            </div>
          </div>

          <div class="absolute-center" style="width: 125.83%; top: 0%">
            <q-img
              src="images/label_main/label-header-get-started.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div class="absolute-center" style="width: 109.605%; top: 95%">
            <q-img
              src="images/label_main/label-footer-get-started.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Logout -->
  <dialog-logout
    :isDialogLogOut="isShowDialogLogout"
    v-if="isShowDialogLogout"
    @callback-closeDialog="isShowDialogLogout = false"
    @callback-logout="funcLogout()"
  ></dialog-logout>
  <!-- #endregion -->

  <!-- #region Loading -->
  <dialog-loading v-if="systemStore.isShowLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script setup>
// import winChat from "components/dialog_main/win-chat.vue";
import winnyIcon from "src/components/ai_character_main/winny-icon.vue";
import wintownIcon from "src/components/winner_town_main/wintown-icon.vue";
import winnyChat from "src/components/ai_character_main/winny-chat.vue";
// import headerBar from "components/lobby_main/header-bar.vue";
// import footerBar from "components/lobby_main/footer-bar.vue";
import backgroundMain from "../components/background_main/background-main.vue";
import characterMain from "components/character_main/character.vue";
import characterNone from "components/character_main/character-none.vue";

// Dialog
import dialogWintownPopup from "src/components/winner_town_main/dialog-wintown-popup.vue";
import rankingDialog from "components/dialog_main/ranking-dialog.vue";
import dialogMailbox from "components/dialog_main/dialog-mailbox.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";
import dialogSetting from "components/dialog_main/setting-dialog.vue";
import dialogLogout from "components/dialog_main/logout-dialog.vue";
import dialogBuddyLogin from "components/dialog_main/dialog-buddy-login.vue";
import dialogProfile from "components/dialog_main/profile-dialog.vue";
import dialogPolicy from "components/dialog_main/dialog-policy.vue";
import dialogLevelReward from "components/dialog_main/dialog-level-reward.vue";
import dialogNews from "components/dialog_main/news-dialog.vue";
import dialogMinigameMenu from "components/dialog_main/dialog-minigame-menu.vue";
import dialogLevelUp from "components/dialog_main/dialog-level-up.vue";
import dialogEvent from "components/dialog_main/dialog-event.vue";
import dialogRecommendLevel from "components/dialog_main/dialog-recommend-level.vue";
import dialogYourLevel2 from "src/components/dialog_main/dialog-your-level-2.vue";
import dialogSpecialRecommendLevel from "src/components/dialog_main/dialog-special-recommend-level.vue";
import dialogSpecialYourLevel from "src/components/dialog_main/dialog-special-your-level.vue";
import dialogChooseTrialCardLevel from "src/components/dialog_main/dialog-choose-trial-card-level.vue";
import dialogSevenDayTrial from "src/components/dialog_main/dialog-seven-day-trial.vue";
import dialogAnimationUnlockLevel from "src/components/dialog_main/dialog-animation-unlock-level.vue";

// Tutorial
import tutorialLobby from "src/components/tutorial_main/tutorial-lobby.vue";

// Dialog Loading
import dialogLoading from "components/dialog-loading.vue";

// import backgroundMain from "src/components/lobby_main/background-main.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { usePracticeStore } from "src/stores/practice";
import { useEventStore } from "src/stores/event";
import { useMysteryBoxStore } from "src/stores/mystery-box";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useSchoolStore } from "src/stores/school";
import { useCourseStore } from "src/stores/course";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useNewsStore } from "src/stores/news";
import { useBuddyStore } from "src/stores/buddy";
import { useMiniGameStore } from "src/stores/minigame";
import { logout, setWidthImage as SWI } from "src/router";
import { useInventoryStore } from "src/stores/inventory";
import levelExp from "src/js/level-exp.js";

// Store
const studentStore = useStudentStore();
const systemStore = useSystemStore();
const schoolStore = useSchoolStore();
const courseStore = useCourseStore();
const synchronizeStore = useSynchronizeStore();
const newsStore = useNewsStore();
const practiceStore = usePracticeStore();
const buddyStore = useBuddyStore();
const miniGameStore = useMiniGameStore();
const mysteryBoxStore = useMysteryBoxStore();
const eventStore = useEventStore();
const inventoryStore = useInventoryStore();

// Initialize
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  isLoaded: {
    type: Boolean,
    default: false,
  },
});

// data
const isShowAiTalk = ref(false);
const activeType = ref("");
const progressPercentage = ref(0);
const examId = ref("");
const menuList = ref([
  [
    {
      image: "button-ranking.webp",
      imageLock: "button-ranking-disable.webp",
      name: "ranking",
      style: "bottom:3%;left:3.5%",
    },
    {
      image: "button-equipment.webp",
      imageLock: "button-equipment-disable.webp",
      name: "equipment",
      style: "bottom:3%;left:11.8%",
    },
    {
      image: "button-mystery-box.webp",
      imageLock: "button-mystery-box-disable.webp",
      name: "mystery-box",
      style: "bottom:3%;left:28.7%",
    },
  ],
  [
    {
      image: "button-shop.webp",
      imageLock: "button-shop-disable.webp",
      name: "shop",
      style: "bottom:3%;left:20.2%",
    },

  ],
]);
const menuListMobile = ref([
  {
    image: "button-ranking.webp",
    imageLock: "button-ranking-disable.webp",
    name: "ranking",
    style: "bottom:3%;left:3.5%",
  },
  {
    image: "button-equipment.webp",
    imageLock: "button-equipment-disable.webp",
    name: "equipment",
    style: "bottom:3%;left:11.8%",
  },
  {
    image: "button-shop.webp",
    imageLock: "button-shop-disable.webp",
    name: "shop",
    style: "bottom:3%;left:20.2%",
  },
  {
    image: "button-mystery-box.webp",
    imageLock: "button-mystery-box-disable.webp",
    name: "mystery-box",
    style: "bottom:3%;left:28.7%",
  },
]);
const selectedCardLevel = ref(null)
const cardLevelData = ref(null)

// Boolearn
const isShowDialogPolicy = ref(false);
const isShowDialogNews = ref(false);
const isShowDialogTutorial = ref(false);
const isShowDialogEvent = ref(false);
const isShowDialogRanking = ref(false);
const isShowDialogMailbox = ref(false);
const isShowDialogSetting = ref(false);
const isShowDialogLogout = ref(false);
const isShowDialogBuddyLogin = ref(false);
const isShowDialogProfile = ref(false);
const isShowDialogMiniGanmeMenu = ref(false);
const isShowDialogLevelReward = ref(false);
const isShowDialogLevelUp = ref(false);
const isShowDialogTutorialFirstTime = ref(false);
const isShowDialogRecommendLevel = ref(false);
const isShowDialogYourLevel = ref(false);
const isShowDialogGetStarted = ref(false);
const isShowWinnyChat = ref(false);
const isShowAnimationWinnyChat = ref(false);
const isStartControlAnimation = ref(false);
const isShowDialogSevenDayTrial = ref(false);
const isShowDialogChooseTrialCardLevel = ref(false);
const isShowDialogSpecialRecommendLevel = ref(false);
const isShowDialogSpecialYourLevel = ref(false);
const isShowDialogUnlockLevel = ref(false);
const isShowDialogWelcomeToWintown = ref(false);
const isHaveCourse = ref(false);

// #region Go to page
const funcGoTo = (type) => {
  if (synchronizeStore.isSync || comIsDiableTutorial.value) return;

  if (isOpenMenu.value) funcOpenMenu();

  if (isShowDialogTutorialFirstTime.value) {
    if (!tutorialData.value.isActive) return;
  }

  $q.loading.show();

  if (type == "ranking") isShowDialogRanking.value = true;
  else if (type == "equipment") router.push("/equipment");
  else if (type == "shop") router.push("/shop");
  else if (type == "mystery-box") router.push("/gachapon");
  else if (type == "mailbox") isShowDialogMailbox.value = true;
  else if (type == "setting") isShowDialogSetting.value = true;
  else if (type == "logout") isShowDialogLogout.value = true;
  else if (type == "buddy") isShowDialogBuddyLogin.value = true;
  else if (type == "tutorial") isShowDialogTutorial.value = true;
  else if (type == "profile") isShowDialogProfile.value = true;
  else if (type == "level-reward") isShowDialogLevelReward.value = true;
  else if (type == "open-seven-day-trial") {
    isShowDialogSevenDayTrial.value = true;
  }
  else if (type == "try-it-now") {

    isShowDialogSevenDayTrial.value = false;

    if (courseStore.courseLevel == 0) {
      if (!studentStore.isSkipPlacementTest) {
        if (studentStore.placementTestLevel != "") {
          isShowDialogChooseTrialCardLevel.value = true;
        } else {
          isShowDialogSpecialRecommendLevel.value = true;
        }
      } else {
        isShowDialogChooseTrialCardLevel.value = true;
      }
    }
  }else if(type == 'close-try-it-now')
  {
    isShowDialogSevenDayTrial.value = false;
    funcCheckDialogNewsAndPolicy();
  }
  // เงื่อนไขเฉพาะของนักเรียน Online
  else {

    if (studentStore.studentType != "school") {
      if(!courseStore?.isTrial){
        // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
        if (!studentStore.isAgreePolicy) {
          isShowDialogPolicy.value = true;
          $q.loading.hide();
          return;
        } else {
          // ยังไม่เคยเลือกระดับ
          if (courseStore.courseLevel == 0) {
            if (!studentStore.isSkipPlacementTest) {
              if (studentStore.placementTestLevel != "") {
                if (type == "play" || type == "learn" || type == "event") {
                  isShowDialogYourLevel.value = true;
                } else if (type == "winny") {
                  isShowDialogGetStarted.value = true;
                } else {
                  router.push("/subscribepackage");
                }
              } else {
                isShowDialogRecommendLevel.value = true;
              }
            } else {
              if (type == "winny") {
                isShowDialogGetStarted.value = true;
              } else {
                router.push("/subscribepackage");
              }
            }

            $q.loading.hide();
            return;
          }

          // เคยเลือกระดับแล้ว
          else {
            // แพ็คเกจที่ใช้งานอยู่หมดอายุ

            if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
              courseStore.isShowDialogLevelExpired = false;

              setTimeout(() => {
                courseStore.isShowDialogLevelExpired = true;
                $q.loading.hide();
              }, 50);

              return;
            }
          }
        }
      }
    }

    if (type == "play") {
      isShowDialogMiniGanmeMenu.value = true;
    } else if (type == "learn") {
      practiceStore.setPracticeSkill("Vocabulary");
      router.push("/practice/list");
    } else if (type == "event") {
      isShowDialogEvent.value = true;
    } else if (type == "subscribe") {
      router.push("subscribepackage");
    } else if (type == "winny") {
      isShowAnimationWinnyChat.value = true;
      isShowWinnyChat.value = !isShowWinnyChat.value;
    } else if (type == "wintown"){
      router.push("/wintown");
    }
  }

  $q.loading.hide();
};
// #endregion

// #region Open menu
const isOpenMenu = ref(false);
const isChangeMenu = ref(false);
const isStartAnimation = ref(false);
const funcOpenMenu = () => {
  if (isShowDialogTutorialFirstTime.value) {
    if (isOpenMenu.value) {
      return;
    }
    isNextTutorial.value = true;
  }

  isOpenMenu.value = !isOpenMenu.value;
  isStartAnimation.value = true;

  setTimeout(() => {
    isChangeMenu.value = !isChangeMenu.value;
    isNextTutorial.value = false;
    if (!isOpenMenu.value) {
      isStartAnimation.value = false;
    }
  }, 150);
};
// #endregion

// #region Open Profile
const isOpenProfile = ref(false);
const isLevelUp = ref(false);
const funcOpenProfile = () => {
  if (isShowDialogTutorialFirstTime.value && comIsDiableTutorial.value) {
    return;
  }

  isOpenProfile.value = !isOpenProfile.value;
};
// #endregion

// #region Set current token
const funcSetToken = (val) => {
  let total = val;

  total = total > 100000 ? 99999 : total;

  return `${Number(total).toLocaleString()}`;
};
// #endregion

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

const funcCheckPopupWelcomeToWintown = () => {

  // จะโชว์ popup แค่ครั้งเดียวต่อ session (เช่น รีเฟรชหรือปิดเปิด browser ใหม่จะนับ session ใหม่)
  const studentId = studentStore.studentId;

  const cookie_name = `odc_wintown_popup_${studentId}`;
  const loginKey = studentStore.studentData.loginKey || "";

  // ตั้งวันหมดอายุเป็น 15 กุมภาพันธ์ 2569 (2026) - ถัดไปอีก 1 เดือนจาก 15 มกราคม 2569
  // ใช้ timestamp จากระบบแทนเวลาท้องถิ่น
  // ใช้ systemStore.datetime.timestamp ถ้ามีค่า (timestamp จากระบบ)
  // ถ้าไม่มีให้ fallback ไปใช้ Date.now()
  const now = systemStore.datetime?.timestamp || Date.now();
  const currentDate = new Date(now);

  // สร้างวันที่ 15 กุมภาพันธ์ 2026 (2569)
  const expireDate = new Date(2026, 1, 15, 0, 0, 0, 0); // เดือน 1 = กุมภาพันธ์ (0-based)

  // ถ้าวันที่ปัจจุบันยังไม่ถึง 15 มกราคม 2026 ให้ใช้ 15 กุมภาพันธ์ 2026
  // ถ้าเลย 15 มกราคม 2026 แล้ว ให้ใช้ 15 กุมภาพันธ์ 2026
  const d = expireDate;

  if(!getCookie(cookie_name)){
    document.cookie = `${cookie_name}=${loginKey};expires=${d.toUTCString()};path=/`;
    isShowDialogWelcomeToWintown.value = true;
  }else{
    if(getCookie(cookie_name) != "false"){
      if(getCookie(cookie_name) != loginKey){
        document.cookie = `${cookie_name}=${loginKey};expires=${d.toUTCString()};path=/`;
        isShowDialogWelcomeToWintown.value = true;
        return;
      }
    }
  }

}

// #region Logout
const funcLogout = async () => {
  $q.loading.show();
  await logout();
  $q.loading.hide();
};
// #endregion

// #region Close Dialog Tutorial
const funcCloseDialogTutorial = () => {
  isShowDialogTutorial.value = false;
  isShowDialogTutorialFirstTime.value = false;

  funcCheckDialogNewsAndPolicy();
};
// #endregion

// #region Event Sprite animation
const positionX = ref(0);
const positionY = ref(0);
const randomString = ref(Math.random().toString(36).substring(3));
let setIntervalAnimation;
let setTimeoutAnimtion;
const funcStartAnimation = () => {
  funcStopAnimation();

  let frameRate = 1000 / 12 || 0;
  let duration = 1.5 * 1000 || 0;

  let image = new Image();

  image.src = `/images/button_main/button-event.png?${randomString.value}`;

  image.onload = () => {
    const frameCount = Math.floor(image.width / 150);
    if (frameCount <= 1 || (duration == 0 && frameRate == 0)) {
      funcStopAnimation();
      return;
    }

    let setWidthImage = image.width;

    let tempWidth = 0;

    tempWidth = image.width;
    tempWidth = tempWidth.toString();
    tempWidth = tempWidth[tempWidth.length - 1];
    if (tempWidth == "1") {
      setWidthImage = setWidthImage.toString();
      setWidthImage = Number(setWidthImage.substring(0, setWidthImage.length - 1) + 0);
    }

    setTimeoutAnimtion = setTimeout(() => {
      setIntervalAnimation = setInterval(() => {
        if (positionX.value >= setWidthImage - 150) {
          positionX.value = 0;
          if (duration > 0) {
            funcStartAnimation();
          }
        } else {
          positionX.value += 150;
        }
      }, frameRate);
    }, duration);
  };
};

const funcStopAnimation = () => {
  if (setIntervalAnimation || setTimeoutAnimtion) {
    positionX.value = 0;
    positionY.value = 0;

    clearTimeout(setTimeoutAnimtion);
    clearInterval(setIntervalAnimation);

    setTimeoutAnimtion = null;
    setIntervalAnimation = null;
  }
};
// #endregion

// #region Select Mini Game
const funcSelectedMiniGame = (name) => {
  const miniGameStore = useMiniGameStore();

  $q.loading.show();

  miniGameStore.setMiniGameSelected(name);

  router.push(`/minigame/${name}`);
  $q.loading.hide();
};
// #endregion

// #region Close Dialog News
const funcCloseDialogNews = () => {
  isShowDialogNews.value = false;

  funcCheckDialogNewsAndPolicy();
};

// #endregion

// #region Close Dialog Level up
const funcCloseDialogLevelUp = () => {
  isShowDialogLevelUp.value = false;
};
// #endregion

// #region Claim All Reward
const funcClaimAllReward = () => {
  isShowDialogLevelUp.value = false;

  if (studentStore.isHasLevelReward) {
    isShowDialogLevelReward.value = true;
  }
};
// #endregion

// #region Show Tutorial Content Type
const tutorialData = ref("");
const isShowButtonHeader = ref(false);
const isShowButtonMenu = ref(false);
const isShowMenu = ref(false);
const isNextTutorial = ref(false);

const funcShowTutorialContentType = (data) => {
  tutorialData.value = data;

  isShowButtonHeader.value = false;
  isShowButtonMenu.value = false;
  isShowDialogProfile.value = false;
  isShowMenu.value = false;
  isOpenProfile.value = false;
  isOpenMenu.value = false;
  isChangeMenu.value = false;

  if (data.showContentType == "show-profile-detail") {
    funcGoTo("profile");
  } else if (data.showContentType == "button-header") {
    isShowButtonHeader.value = true;
  } else if (data.showContentType == "menu") {
    isShowButtonMenu.value = true;
    isOpenMenu.value = false;

    if (isStartAnimation.value) {
      isStartAnimation.value = true;

      setTimeout(() => {
        isChangeMenu.value = false;
        isNextTutorial.value = false;
      }, 150);
    }
  } else if (data.showContentType == "show-menu") {
    isShowButtonMenu.value = true;
    isShowMenu.value = true;

    if (isStartAnimation.value) {
      isStartAnimation.value = true;

      isOpenMenu.value = true;

      setTimeout(() => {
        isChangeMenu.value = true;
      }, 150);
    }
  } else if (data.showContentType == "show-button-learn") {
    isOpenMenu.value = false;
  } else if (data.showContentType == "show-profile-level-reward") {
    isOpenProfile.value = true;
  } else if (data.showContentType == "show-claim-reward") {
    isOpenProfile.value = true;
  } else if (
    data.showContentType == "show-button-menu" ||
    data.showContentType == "show-button-detail-header" ||
    data.showContentType == "show-button-detail-body"
  ) {
    isShowButtonMenu.value = true;
    isShowMenu.value = true;

    if (!isStartAnimation.value) {
      isStartAnimation.value = true;
    }

    if (isStartAnimation.value) {
      isStartAnimation.value = true;

      isOpenMenu.value = true;

      setTimeout(() => {
        isChangeMenu.value = true;
      }, 150);
    }
  }
};
// #endregion

// #region Check Level up
const funcCheckLevelUp = () => {
  if (!studentStore.isFirstTimeTutorialLobby) {
    if (studentStore.studentData.pendingEXP > 0) {
      setTimeout(() => {
        isShowDialogLevelUp.value = true;
      }, 500);
    }
  }
};
// #endregion

// #region Check Dialog News & Policy
const funcCheckDialogNewsAndPolicy = () => {

  if (!synchronizeStore.isSync) {

    let findTutorial = studentStore.checkTutorial("lobby-v2");

    if (findTutorial) {
      isShowDialogTutorialFirstTime.value = true;
      systemStore.isShowLoading = false;
      return;
    }

    if(studentStore.studentData.isShowDialogNews) {
      isShowDialogNews.value = true;
      studentStore.setNews()
      systemStore.isShowLoading = false;
      return
    }

    if (studentStore.studentType === "online") {
      if (!studentStore.isAgreePolicy) {
        isShowDialogPolicy.value = true;
        systemStore.isShowLoading = false;
        return;
      }

      isShowDialogPolicy.value = false;
    }

    if(courseStore.courseLevel == "0"){
      if(studentStore.placementTestLevel == "" && !studentStore.studentData.isSkipPlacementTest){
        if(!studentStore.student.data?.isSevenDayTrial){
          studentStore.student.data.isSevenDayTrial = false
        }
        funcSetPopupToday();
      }else{
        if(studentStore.studentData?.isSevenDayTrial){
          if(studentStore.studentData.isPlacement){
            isShowDialogSpecialYourLevel.value = true;
          }
        }else{
          funcSetPopupToday()
        }
      }
    }else{
      if(courseStore?.isTrial){
        // ใช้ cookie เพื่อจำวันและ studentId โดยหมดอายุเที่ยงคืน
        funcSetPopupToday()
      }
    }

    if(isShowDialogSevenDayTrial.value) return

    funcCheckPopupWelcomeToWintown();

  }

  funcCheckLevelUp();
}
// #endregion

// #region Close Dialog Recommend Level
const funcCloseDialogRecommendLevel = () => {
  isShowDialogRecommendLevel.value = false
}
// #endregion

// #region Show Dialog Special Recommend Level
const funcShowDialogSpecialRecommendLevel = () => {
  isShowDialogSevenDayTrial.value = false;

  setTimeout(() => {
    isShowDialogSpecialRecommendLevel.value = true;
  }, 50);

}
// #endregion

// #region Close Dialog Special Recommend Level
const funcCloseDialogSpecialRecommendLevel = () => {
  isShowDialogSpecialRecommendLevel.value = false;
}
// #endregion

// #region Close Dialog Special Your Level
const funcCloseDialogSpecialYourLevel = () => {
  isShowDialogSpecialYourLevel.value = false
}
// #endregion

// #region Choose Trial level
const funcShowDialogChooseTrialLevel = () => {
  isShowDialogSpecialYourLevel.value = false;
  isShowDialogChooseTrialCardLevel.value = true;
}
// #endregion

// #region Show Dialog Unlock Level
const funcShowDialogUnlockLevel = async (data) => {

  await studentStore.getStudentData();
  await courseStore.getCourse();
  await courseStore.getAllCourse();

  systemStore.setParameter({
    level: data.level,
  });

  practiceStore.setPracticeUnit("1");
  practiceStore.setPracticelevel(data.level);
  await studentStore.updateCurrentCourseId(studentStore.courseId);
  practiceStore.practiceUpdateByLevel();
  await practiceStore.getPracticeLog();

  isShowDialogChooseTrialCardLevel.value = false;
  isShowDialogUnlockLevel.value = true;

  cardLevelData.value = data;

  isHaveCourse.value = true;

}
// #endregion

// #region Skip Placement Test
const funcSkipPlacementTest = () => {
  isShowDialogSpecialRecommendLevel.value = false

  setTimeout(() => {
    isShowDialogChooseTrialCardLevel.value = true;
  },50)
}
// #endregion

// #region Close Dialog Choose Trial Level
const funcCloseDialogChooseTrialCardLevel = () => {
  isShowDialogChooseTrialCardLevel.value = false
}
// #endregion

// #region Close Dialog Unlock
const funcCloseDialogUnlock = () => {
  isShowDialogUnlockLevel.value = false
}
// #endregion

// #region Set Seven day trial Popup Today
const funcSetPopupToday = () => {
  // จะโชว์ popup แค่ครั้งเดียวต่อ session (เช่น รีเฟรชหรือปิดเปิด browser ใหม่จะนับ session ใหม่)
  const studentId = studentStore.studentId;
  const loginKey = studentStore.studentData.loginKey || "";
  const sessionKey = `odc_7d_pop_up${studentId}`;

  // อ่าน loginKey ที่เคยเก็บไว้ใน sessionStorage
  const getOD_PTD_LOGIN = sessionStorage.getItem(sessionKey);

  if (getOD_PTD_LOGIN !== loginKey) {
    // ถ้ายังไม่เคย loginKey นี้ใน session นี้ ให้ set sessionStorage และแสดง dialog
    sessionStorage.setItem(sessionKey, loginKey);
    isShowDialogSevenDayTrial.value = true;
  }
}
// #endregion

// #region Close Dialog Policy
const funcCloseDialogPolicy = () => {
  isShowDialogPolicy.value = false
  funcCheckDialogNewsAndPolicy();
}
// #endregion

const funcCloseDialogWelcomeToWintown = () => {
  isShowDialogWelcomeToWintown.value = false;
  funcCheckDialogNewsAndPolicy();
}

// #region ***** Computed *****

// #region Show Backdrop
const isShowBackDrop = computed(() => {
  let show = false;

  if (
    isShowWinnyChat.value ||
    isShowDialogLevelUp.value ||
    isShowDialogLevelReward.value ||
    (isShowDialogProfile.value && !isShowDialogTutorialFirstTime.value)
  ) {
    show = true;
  }

  return show;
});
// #endregion

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

// #region Is Disable Tutorial
const comIsDiableTutorial = computed(() => {
  let isCheck = false;

  if (isShowDialogTutorialFirstTime.value) {
    if (
      isOpenMenu.value ||
      isShowMenu.value ||
      tutorialData.value.showContentType == "show-button-learn" ||
      tutorialData.value.showContentType == "show-profile" ||
      tutorialData.value.showContentType == "show-profile-level-reward" ||
      tutorialData.value.showContentType == "show-buddy-mode" ||
      tutorialData.value.showContentType == "show-info"
    ) {
      isCheck = true;
    }
  }

  return isCheck;
});
// #endregion

// #endregion

// #region ***** Watch *****
watch(
  () => synchronizeStore.isSync,
  (val) => {
    isStartControlAnimation.value = true;

    if (!val) {
      let findTutorial = studentStore.checkTutorial("lobby-v2");

      if (findTutorial) {
        isShowDialogTutorialFirstTime.value = true;
        return;
      }

      funcCheckLevelUp();
    }
  }
);

// #endregion

onMounted(async () => {
  if (systemStore.isLogin) {
    systemStore.setRouter("lobby");

    systemStore.isShowLoading = true;

    if (route.params.payment == "chargeComplete") {
      // Show complete payment dialog
    }

    await courseStore.getAllCourse();
    courseStore.getCourse();

    studentStore.getCoin();

    // studentStore.getLevel();

    funcStartAnimation();

    // funcCheckExam();
    miniGameStore.checkMiniGameUnlock();

    mysteryBoxStore.checkMysteryBoxStatusOpen();
    await eventStore.getEventAll();
    // await funcCheckPrePostTest();
    // await funcCheckQuestionnaire();

    if (studentStore.studentType == "demo") {
      // emits("callback-isShowPackageMenu", true);
    }

    if (studentStore.isHasLevelReward) {
      isOpenProfile.value = true;
    }

    funcCheckDialogNewsAndPolicy();

    systemStore.isShowLoading = false;
  }
});
</script>

<style lang="scss" scoped>

// #region Box Main

.backdrop-lobby {
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.box-container-main {
  max-width: 1600px;
  width: calc(100vh * 16 / 9);
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  container-type: inline-size;
  overflow: hidden;

  &.mobile {
    max-width: 1600px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    min-height: 100%;
    max-height: 100%;
    background-size: cover;
    background-position: 50% 50%;
    padding: 8px;
    overflow: hidden;
  }
}

.box-backdrop-main {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  &.layer-1 {
    z-index: 1;
  }

  &.layer-2 {
    z-index: 2;
  }

  &.layer-3 {
    z-index: 3;
  }

  &.layer-4 {
    z-index: 4;
  }

  &.layer-5 {
    z-index: 5;
  }
}

.box-lobby-main {
  width: 100%;
  min-width: 1200px;
  box-sizing: content-box;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: contain;
  background-position: center;
  //   background-repeat: no-repeat;
}

.box-lobby-main-mobile {
  width: 100%;
  min-width: 300px;
  max-width: 1600px;
  box-sizing: content-box;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: contain;
  background-position: center;
  overflow: hidden;
  margin: auto;
  //   background-repeat: no-repeat;
}

.box-backdrop-tutorial-main {
  width: 100%;
  height: 100%;
}

.box-lobby-content {
  max-width: 1600px;
  min-width: 1200px;
  width: 100%;
  margin: auto;
}

.btn-prepost {
  background-image: url("/images/prepost-start.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.btn-prepost:hover {
  background-image: url("/images/prepost-start-h.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.box-profile-bar {
  width: 22.4925%;
  top: 2.5%;
  left: 1%;
}

.box-name-and-progress {
  width: 68%;
  height: 65%;
  top: 21%;
  left: 30%;
}

.box-progress-level {
  width: 90%;
  border-radius: 3rem;
  border: 0.2rem solid #000;
  background: rgba(0, 0, 0, 0.5);
  margin-top: 2%;
  overflow: hidden;
  padding: 1.7%;
}

.progress-level {
  position: absolute;
  height: 100%;
  top: 0%;
  left: 0%;
  background-color: #166ca6;
  border-radius: 10rem;

  transition: width 0.1s;
  -webkit-transition: width 0.1s;
  -moz-transition: width 0.1s;

  overflow: hidden;
}

.progress-level-line {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0%;
  left: 0%;
  background-color: #18a0fb;
}

.progress-level-line::before {
  content: "";
  position: absolute;
  top: 20%;
  left: 0;
  width: 100%;
  padding: 1%;
  border-radius: 3rem;
  background-color: rgba(255, 255, 255, 0.3);
}

.box-button-information {
  width: 1.25%;
  top: 4.5%;
  left: 24.5%;
}

.box-coin-bar {
  width: 9.9375%;
  top: 4.2%;
  left: 28%;
}

.box-text-coin {
  width: 55%;
  top: 10%;
  left: 40%;
  font-size: clamp(14px, 1.5cqw, 24px);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.box-ticket-bar {
  width: 10.348125%;
  top: 4.2%;
  left: 39.5%;
}

.box-text-ticket {
  width: 55%;
  top: 15%;
  left: 40%;
  font-size: clamp(14px, 1.5cqw, 24px);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}

.box-tooltip {
  width: fit-content;
  background-color: #4a261b;
  border-radius: 20px;
  padding: 3%;
  white-space: nowrap;
}

.box-countdown-timer {
  width: 95%;
  border-radius: 12.5px;
  border: 0.17rem solid #4a261b;
  background: #fff;
  font-size: clamp(8px, 0.7cqw, 12px);
  padding: 1% 2%;
  margin-bottom: 3%;
}

.box-button-news {
  top: 1.7777%;
  right: 9%;

  &.layer-1 {
    z-index: 1;
  }

  &.mobile {
    width: 40px;
    margin: 0px 4px;
  }

  & .box-icon-notification {
    width: 34.3%;
    top: -5%;
    right: -3%;
  }
}

.box-button-setting {
  top: 1.7777%;
  right: 5%;

  &.layer-1 {
    z-index: 1;
  }

  &.mobile {
    width: 40px;
    margin: 0px 4px;
  }
}

.box-button-logout {
  top: 1.7777%;
  right: 1%;

  &.layer-1 {
    z-index: 1;
  }

  &.mobile {
    width: 40px;
    margin: 0px 4px;
  }
}

.box-tier-user {
  top: 1.7777%;
  left: 1%;

  &.layer-1 {
    z-index: 1;
  }

  &.mobile {
    top: 0;
    left: 0;
    width: 72px;

    &.layer-top {
      z-index: 3;
    }
  }

  & .box-text-level {
    width: 20%;
    top: 50%;
    color: #fff;

    // left: 6.1%;
    font-size: clamp(22px, 2.25cqw, 36px);
    line-height: 0;
    text-align: center;

    &.mobile {
      font-size: 17px;
    }

    &.text-shadow-level {
      color: transparent;
      // font-size: clamp(31.25px, 3.125vw, 50px);
      text-shadow: rgb(43, 43, 43) 3px 0px 0px, rgb(43, 43, 43) 2.83487px 0.981584px 0px,
        rgb(43, 43, 43) 2.35766px 1.85511px 0px, rgb(43, 43, 43) 1.62091px 2.52441px 0px,
        rgb(43, 43, 43) 0.705713px 2.91581px 0px,
        rgb(43, 43, 43) -0.287171px 2.98622px 0px,
        rgb(43, 43, 43) -1.24844px 2.72789px 0px, rgb(43, 43, 43) -2.07227px 2.16926px 0px,
        rgb(43, 43, 43) -2.66798px 1.37182px 0px, rgb(43, 43, 43) -2.96998px 0.42336px 0px,
        rgb(43, 43, 43) -2.94502px -0.571704px 0px,
        rgb(43, 43, 43) -2.59586px -1.50383px 0px,
        rgb(43, 43, 43) -1.96093px -2.27041px 0px,
        rgb(43, 43, 43) -1.11013px -2.78704px 0px,
        rgb(43, 43, 43) -0.137119px -2.99686px 0px,
        rgb(43, 43, 43) 0.850987px -2.87677px 0px,
        rgb(43, 43, 43) 1.74541px -2.43999px 0px, rgb(43, 43, 43) 2.44769px -1.73459px 0px,
        rgb(43, 43, 43) 2.88051px -0.838247px 0px;
      letter-spacing: 0px;
    }

    &.normal-level {
      text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
        rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
        rgb(74, 38, 27) 0.705713px 2.91581px 0px,
        rgb(74, 38, 27) -0.287171px 2.98622px 0px,
        rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
        rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
        rgb(74, 38, 27) -2.94502px -0.571704px 0px,
        rgb(74, 38, 27) -2.59586px -1.50383px 0px,
        rgb(74, 38, 27) -1.96093px -2.27041px 0px,
        rgb(74, 38, 27) -1.11013px -2.78704px 0px,
        rgb(74, 38, 27) -0.137119px -2.99686px 0px,
        rgb(74, 38, 27) 0.850987px -2.87677px 0px,
        rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
        rgb(74, 38, 27) 2.88051px -0.838247px 0px;
    }

    &.high-level {
      // color: transparent;
      background: linear-gradient(
        180deg,
        #ffc42c 45%,
        #fff 30%,
        #ffc42c 55%,
        #ff7a00 100%
      );
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.box-buddy-level {
  width: 14.532%;

  &.mobile {
    width: 60px;
  }

  & .box-text-level {
    width: 20%;
    top: 50%;
    // left: 6.1%;
    font-size: clamp(17px, 1.6875cqw, 27px);
    color: #fff;
    line-height: 0;
    text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
      rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
      rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
      rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
      rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
      rgb(74, 38, 27) -2.94502px -0.571704px 0px,
      rgb(74, 38, 27) -2.59586px -1.50383px 0px, rgb(74, 38, 27) -1.96093px -2.27041px 0px,
      rgb(74, 38, 27) -1.11013px -2.78704px 0px,
      rgb(74, 38, 27) -0.137119px -2.99686px 0px,
      rgb(74, 38, 27) 0.850987px -2.87677px 0px, rgb(74, 38, 27) 1.74541px -2.43999px 0px,
      rgb(74, 38, 27) 2.44769px -1.73459px 0px, rgb(74, 38, 27) 2.88051px -0.838247px 0px;
    text-align: center;
  }
}

.box-buddy-container {
  width: 55%;

  &.mobile {
    width: 204px;
  }

  & .box-buddy-name-main {
    padding: 10% 2.275% 2.275%;

    &.mobile {
      padding: 21px 4px 4px;
    }

    & .box-buddy-name {
      // width: 100%;
      height: 100%;
      padding: 1.195%;
      border-radius: 4px;
      background: #404040;
      box-shadow: 0px 0px 2.4px 0px rgba(0, 0, 0, 0.25) inset;
      margin-right: 1.195%;

      &.mobile {
        padding: 4px;
        margin-right: 4px;
      }

      & .box-buddy-name-text {
        width: 100%;
        height: 100%;
        border-radius: 59.4px;
        padding: 1% 4% 1.656%;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
        font-size: clamp(10px, 1cqw, 16px);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

        &.mobile {
          padding: 4px 8px;
        }
      }
    }

    & .box-button-unpair {
      width: 24.405%;

      &.mobile {
        width: 62px;
      }
    }
  }
}

.box-character-main {
  bottom: 18.6%;
  right: 5%;

  &.mobile {
    bottom:25%;
    width: calc(90vh * 9 / 16);
    min-width: 360px;
    margin: 0px auto 0px auto;
    left:50%;
    transform:translateX(-50%);
  }
}

.box-button-buddy-main {
  top: 50%;
  left: 25.6393%;

  &.layer-top {
    z-index: 5;
  }
}

.box-character-buddy-main {
  bottom: 18.6%;
  left: 22%;
  height: fit-content;
  z-index: 0;

  &.layer-top {
    z-index: 5;
  }

  &.mobile {
    top: 84px;
    left: 8px;
    width: 150px;
  }

  &.buddy {
    // width: 39%;
    // zxczxx
    bottom: 17.7%;
    left: 8.66%;
  }

  & .button-buddy-mode {
    width: 100%;

    &.layer-1 {
      z-index: 1;
    }

    &.active {
      z-index: 1;
    }
  }

  & .box-character-none {
    top: 63%;
    display: inline-flex;
    padding: clamp(8.75px, 0.875cqw, 14px) clamp(13.75px, 1.375cqw, 22px);
    justify-content: center;
    align-items: center;
    border-radius: 9999px;
    border: clamp(1.25px, 0.125cqw, 2px) solid #000;
    background: #404040;
    color: #fff;
  }
}

.box-buddy-details-container {
  width: 100%;
  left: 16.186%;
  bottom: -7.5%;
  margin: auto;
}

.box-buddy-details-container-mobile {
  top: 84px;
  left: 8px;
  width: 100%;
  height: fit-content;
}

.box-footer-menu-main {
  width: 100%;
  bottom: 10%;
  border: 1px solid #f00;
}

.box-button-learn {
  width: 9.375%;
  right: 3.1181%;
  bottom: 4%;

  &.layer-top {
    z-index: 3;
  }

  &.mobile {
    width: 130px;
    margin: 0px 5px;
  }
}

.box-button-game {
  // width: 5.8125%;
  right: 13.9931%;
  bottom: 4%;

  &.layer-top {
    z-index: 3;
  }

  &.mobile {
    width: 80px;
    // margin: 0px 10px;
    margin-right: 5px;

    &.layer-top {
      z-index: 3;
    }
  }
}

.box-button-event {
  right: 21.3262%;
  bottom: 4%;

  &.layer-top {
    z-index: 3;
  }

  &.mobile {
    width: 80px;
    // margin: 0px 10px;

    &.layer-top {
      z-index: 3;
    }
  }
}

.box-button-menu {
  left: 1.5%;
  bottom: 2.6%;

  &.layer-top {
    z-index: 3;
  }

  &.mobile {
    width: 48px;
    margin-left: 6px;
  }

  & .box-icon-notification {
    width: 28%;
    top: 3%;
    right: -2.5%;

    &.mobile {
      width: 16px !important;
      top: -4px;
      right: -0px;
    }
  }
}

.box-wintown-main{
  width:clamp(62.5px,6.25cqw,100px);
  bottom:clamp(181.25px,18.125cqw,290px);
  left:clamp(15.625px,1.5625cqw,25px);
}

.box-winny-main {
  width: 6.25%;
  bottom: 17%;
  left: 1.5%;
  // z-index: 1;

  &.layer-1 {
    z-index: 1;
  }

  &.show {
    z-index: 6;
  }

  & .box-talk-ai{
    width:fit-content;
    top:50%;
    left:50%;
    height:90%;
    transform: translate(0%,-50%);
    padding: clamp(6.25px,0.625cqw,10px) 20px clamp(6.25px,0.625cqw,10px) clamp(40.625px,4.0625cqw,65px);
    border-radius: clamp(6.25px,0.625cqw,10px);
    border: clamp(1.875px,0.1875cqw,3px) solid #FFE6AC;
    background: #D4F3FF;
    font-size:clamp(16.25px,1.625cqw,26px);
    line-height: 0px;
    white-space: nowrap;
    color:#014DA4;
  }
}

.box-winny-main-mobile {
  width: 56px;
  top: 84px;
  right: 8px !important;
  // z-index: 1;

  &.show {
    z-index: 2;
  }
}

.box-wintown-main-mobile {
  width: 56px;
  top: 155px;
  right: 8px !important;
  // z-index: 1;

  &.show {
    z-index: 2;
  }
}

.box-winny-chat-main {
  top: 30.2222%;
  left: 9.0625%;
  width: 25%;
  height: 53.3333%;
  z-index: 0;

  &.show {
    z-index: 2;
  }
}

.box-menu-container {
  left: 9.25%;
  bottom: 2.6666%;
  line-height: 0;

  &.layer-top {
    z-index: 3;
  }

  & .box-menu-header {
    height: 13%;
    padding: 3.005% 16.087%;

    & .box-token-main {
      width: 45.715%;

      & .icon-coin {
        width: 175px;
      }

      & .icon-key {
        width: 175px;
      }

      & .box-token-number {
        width: 50%;
        top: 55%;
        left: 37%;
        margin-left: 5%;
        color: #fff;
        font-size: clamp(15px, 1.5cqw, 24px);

        &.mobile {
          width: 80px;
        }
      }
    }
  }

  & .box-menu-content {
    top: 13%;
    height: 81%;
    padding: 4.652%;
    line-height: 0;

    & .box-button-menu-main {
      width: 33.33%;
      // margin: 0% 4.652%;

      & .button-menu-content {
        width: 89.76%;

        &.space-icon {
          margin: 10% 0%;
        }

        & .box-icon-notification {
          width: 21.06%;
          bottom: 24%;
          right: -2.5%;
        }
      }
    }
  }
}

.box-menu-container-mobile {
  position: absolute;
  top: 65px;
  right: 8px !important;
  width: 280px;
  height: fit-content;
  z-index: 1;

  &.layer-top {
    z-index: 5;
  }

  &.layer-7 {
    z-index: 7;
  }

  &.layer-1 {
    z-index: 1;
  }

  & .box-menu-header-mobile {
    height: 13%;
    padding: 10px 0px;

    & .box-token-main-mobile {
      width: 90px;
      margin:0px 10px;

      & .icon-coin-mobile {
        width: 35%;
      }

      & .icon-key-mobile {
        width: 35%;
      }

      & .box-token-number-mobile {
        width: 50px;
        top: 6px;
        margin-left: 30px;
        color: #fff;
        font-size: 12px;
      }
    }
  }

  & .box-menu-content-mobile {
    top: 13%;
    height: 80%;
    padding: 16px;
    line-height: 0;

    & .box-button-menu-main-mobile {
      width: 33.33%;

      & .button-menu-content-mobile {
        width: 72px;
        margin-bottom: 16px;

        & .box-icon-notification-mobile {
          width: 16px;
          bottom: 14px;
          right: -2px;
        }
      }
    }
  }
}

.box-profile-container {
  top: 1.7777%;
  left: 9%;
  padding-bottom: 0.5%;
  overflow: hidden;
  line-height: 0;

  &.layer-1 {
    z-index: 1;
  }

  &.layer-top {
    z-index: 2;
  }

  &.mobile {
    left: 0%;
    top: 0%;
    width: 190px;
    padding-bottom: 11px;
    margin: 0px 4px;
    overflow: visible;
  }

  & .box-profile-expand-container {
    width: 190px;
    top: 56px;
    z-index: 1px;
    line-height: 0;

    &.layer-1 {
      z-index: 1;
    }

    &.layer-top {
      z-index: 2;
    }
  }
}

.box-button-info {
  top: 1.7777%;
  left: 29.25%;

  &.layer-top {
    z-index: 5;
  }

  &.mobile {
    width: 20px;
  }
}

.box-button-subscribe-main {
  top: clamp(37.5px,3.75cqw,60px);
  left: clamp(321.875px,32.1875cqw,515px);

  &.mobile {
    top: 84px;
    left: 8px;
    width: 144px;
  }

  & .box-button-subscribe {
    width: 100%;

    &.mobile {
      width: 130px;
    }
  }
}

.box-remaining-time-main {
  top: 1.7777%;
  left: clamp(312.5px,31.25cqw,500px);

  &.mobile {
    width:185px;
    top: 125px;
    left: 8px;
  }

  & .box-text-remaining-time {
    width:80%;
    top: 66%;
    left: 8%;
    transform:translateY(-50%);
    font-size: clamp(7.5px, 0.75cqw, 12px);
    color: #4a261b;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.mobile {
      font-size: 10px !important;
    }
  }
}

.box-button-seven-day-trial-main{
  top: 1.7777%;
  left: 43.8125%;

  &.mobile{
    top: 130px;
    left: 8px;
    width: 144px;
  }
}

.box-profile-header {
  line-height: 0;

  &.layer-1 {
    z-index: 1;
  }

  & .profile-header-content {
    height: 100%;
    padding: clamp(10px,1cqw,16px) clamp(10px,1cqw,16px) clamp(12.5px,1.25cqw,20px);
    line-height: 0;

    &.mobile {
      padding: 8px;
      line-height: 16px;
    }

    & .profile-name {
      height: 60%;
      border-radius: 99px;
      background: rgba(0, 0, 0, 0.3);
      padding: clamp(7.5px, 0.75cqw, 12px) clamp(10px, 1cqw, 16px) clamp(5px, 0.5cqw, 8px);
      color: #fff;
      font-size: clamp(10px, 1cqw, 16px);
      line-height: clamp(10px, 1cqw, 16px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &.mobile {
        width: 144px;
        height: 24px;
      }
    }

    & .button-icon-profile {
      width: 12.68%;
      margin-left: 2.82%;

      &.mobile {
        width: 24px;
      }
    }

    & .box-profile-progress {
      width: 100%;
      margin-top: 1.41%;

      &.mobile {
        margin-top: 0px;
      }

      & .box-xp-progress {
        &.mobile {
          width: 100%;
        }

        & .box-overflow {
          width: 100%;
          height: 100%;
          overflow: hidden;

          &.mobile {
            height: fit-content;
          }

          & .box-progress-animation-bar {
            width: 100%;
            left: -89%;
            transition: transform 0.2s;
          }
        }

        & .box-icon-xp {
          top: -45%;
          left: -0.55%;
          width: 17.48%;

          &.mobile {
            top: 0%;
            left: -0.5%;
            width: 29.059px;
          }
        }
      }

      & .xp-number {
        right: 3%;
        width: 12.68%;
        color: #fff;
        text-shadow: rgb(19, 19, 19) 2px 0px 0px, rgb(19, 19, 19) 1.75517px 0.958851px 0px,
          rgb(19, 19, 19) 1.0806px 1.68294px 0px, rgb(19, 19, 19) 0.141474px 1.99499px 0px,
          rgb(19, 19, 19) -0.832294px 1.81859px 0px,
          rgb(19, 19, 19) -1.60229px 1.19694px 0px,
          rgb(19, 19, 19) -1.97998px 0.28224px 0px,
          rgb(19, 19, 19) -1.87291px -0.701566px 0px,
          rgb(19, 19, 19) -1.30729px -1.5136px 0px,
          rgb(19, 19, 19) -0.421592px -1.95506px 0px,
          rgb(19, 19, 19) 0.567324px -1.91785px 0px,
          rgb(19, 19, 19) 1.41734px -1.41108px 0px,
          rgb(19, 19, 19) 1.92034px -0.558831px 0px;
        font-size: clamp(6.25px, 0.625cqw, 10px);
        line-height: 0;
        direction: rtl;

        &.mobile {
          bottom: 3px;
          width: 24px;
          font-size: 6px;
          margin-left: 4px;
        }
      }
    }
  }
}

.box-profile-expand-content {
  width: 100%;
  overflow: hidden;
  line-height: 0;

  &.mobile {
    margin-top: 0px;
  }

  & .expand-on {
    margin-top: 0%;
    transition: margin-top ease-in-out 0.35s;
  }

  & .expand-off {
    margin-top: -25.2%;
    transition: margin-top ease-in-out 0.43s;
  }

  & .button-level-reward {
    width: 58.455%;
    margin-top: 1.41%;

    &.mobile {
      width: 110px;
      margin-top: 2px;
    }
  }

  .profile-content {
    padding: 1.27% 5.065% 2.535% 5.065%;

    &.mobile {
      padding: 2px 8px 4px;
    }

    & .box-pixel-container {
      width: 77.47%;
      overflow: hidden;

      &.mobile {
        width: 144px;
      }
    }
  }
}

.box-profile-expand {
  padding:0px;
  margin-top:clamp(-3px,-0.1875px,-1.875px);
  line-height: 0;
  cursor: pointer;

  &.disable {
    cursor: default;
  }

  &.mobile {
    width: 190px;
    margin-top: 0px;
  }

  & .icon-expand {
    top: 70%;
    width: 7.595%;

    &.mobile {
      width: 16px;
    }

    & .icon-on {
      transform: rotate(180deg);
      transform-origin: center;

      -webkit-transform: rotate(180deg);
      -webkit-transform-origin: center;

      transition: transform 0.4s ease-in-out;
      -webkit-transition: transform 0.4s ease-in-out;
    }

    & .icon-off {
      transform: rotate(0deg);
      transform-origin: center;

      -webkit-transform: rotate(0deg);
      -webkit-transform-origin: center;

      transition: transform 0.4s ease-in-out;
      -webkit-transition: transform 0.4s ease-in-out;
    }
  }
}

.box-button-footer {
  bottom: 24px;
  width: 100%;

  &.layer-top {
    z-index: 2;
  }
}

.box-alert-control-container {
  bottom: 2.7%;
  left: 50%;
  width: 24.625%;

  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -moz-transform: translateX(-50%);

  &.mobile {
    width: 280px;

    transform: translateX(0%);
    -webkit-transform: translateX(0%);
    -moz-transform: translateX(0%);
  }
}

.box-alert-control {
  width: 100%;
  padding: clamp(5px, 0.5cqw, 8px);
  border-radius: clamp(7.5px, 0.75cqw, 12px);
  border: clamp(1.25px, 0.125cqw, 2px) solid #4a261b;
  background: #ffc42c;
  color: #4a261b;
  box-sizing: border-box;
  margin: auto;

  &.mobile {
    padding: 6px;
    border-radius: 12px;
    border: 2px solid #4a261b;
    margin-bottom: 9px;
  }

  & .sub-alert-control {
    padding: clamp(12.5px, 1.25cqw, 20px) clamp(20px, 2cqw, 32px);
    border-radius: clamp(5px, 0.5cqw, 8px);
    background: #ffedc4;
    font-size: clamp(10.25px, 1.125cqw, 18px);
    line-height: clamp(10.25px, 1.125cqw, 18px);

    &.mobile {
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
    }
  }
}

.index-1 {
  z-index: 1;
}

.index-2 {
  z-index: 2;
}

.box-dialog-level-up-container {
  width: 21.25%;
  height: 37.778%;

  &.layer-top {
    z-index: 5;
  }

  &.mobile {
    width: 340px;
    height: fit-content;
  }
}

.box-dialog-level-reward-container {
  width: 21.25%;
  height: 66.6666%;
  z-index: 1;

  &.layer-top {
    z-index: 5;
  }

  &.mobile {
    width: 320px;
    height: 600px;
  }
}

.box-dialog-profile-container {
  width: 62.5%;
  height: 66.66666%;

  &.layer-top {
    z-index: 5;
  }

  &.mobile {
    width: 340px;
    height: fit-content;
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

  &.hover:not(.disable):hover {
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

.button-active-main:not(.button-disable, .disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}

.button-disable {
  cursor: default;
}

.button-delete {
  width: fit-content;
  padding: 4px 16px;
  border-radius: 10px;
  border: 1px solid #ff2c2c;
}

.button-item-menu {
  width: 7.8125%;
}

.button-learn-animation {
  animation: moveButton 0.8s ease-in alternate infinite;
  -webkit-animation: moveButton 0.8s ease-in alternate infinite;
  -moz-animation: moveButton 0.8s ease-in alternate infinite;

  transform: translateY(0%);
  -webkit-transform: translateY(0%);
  -moz-transform: translateY(0%);
}

.button-learn-animation:hover,
.animation-stop {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

@keyframes moveButton {
  90% {
    transform: translateY(-5%);
    -webkit-transform: translateY(-5%);
  }
  to {
    transform: translateY(-5%);
    -webkit-transform: translateY(-5%);
  }
}

.button-subcribe {
  width: 10.8125%;
  top: 4.2%;
  left: 52%;
}
// #endregion

// #region Icon
.icon-news-alert {
  width: 35%;
  top: -9%;
  right: -0%;
}
// #endregion

// #region Dialog Profile
// .box-dialog-profile-container {
//   width: 1000px;
//   min-width: 1000px;
//   background-color: #f2c043;
//   border: 3px solid #4a261b;
//   border-radius: 15px;
//   padding: 7px;
//   color: #4a261b;
//   margin: auto;
// }

// .box-dialog-profile-container-mobile {
//   min-width: 300px;
//   width: 100%;
//   max-width: 320px;
//   height: 500px;
//   background-color: #f2c043;
//   border: 3px solid #4a261b;
//   border-radius: 15px;
//   padding: 7px;
//   color: #4a261b;
//   margin: auto;
// }

.box-dialog-profile-content {
  background-color: #f6f3d3;
  padding: 35px 25px;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
}

.box-character-profile {
  width: 270px;
  height: 450px;
  background-size: cover;
  background-position: 95% 0%;
  border-radius: 10px;
  background-image: url("/images/background_main/background-lobby-default.png");
}

.box-profile-content {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  overflow: hidden;
}

.box-profile-content-mobile {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  overflow: hidden;
}

.button-menu-mobile {
  position: relative;
  width: 130px;
  padding: 10px 5px;
  color: #4a261b;
  text-align: center;
  font-family: mali-b;
  border: 1px solid #4a261b;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px -10px 10px 1px rgba(55, 55, 55, 0.2);
}

.button-menu-mobile.active {
  background-color: #f6f3d3;
  border: 1px solid #f6f3d3;
}

.button-menu {
  position: relative;
  width: 160px;
  padding: 15px 0px;
  color: #4a261b;
  border-radius: 15px 15px 0px 0px;
  cursor: pointer;
  border: 1px solid #4a261b;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.button-menu::after,
.button-menu-mobile::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 93%;
  background-color: #f5cd69;
  z-index: 1;
  border-radius: 30px 15px 0px 0px;
}

.button-menu::before,
.button-menu-mobile::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fae6b4;
  z-index: 1;
  border-radius: 10px 10px 0px 0px;
}

.button-menu.active::after,
.button-menu-mobile.active::after {
  content: " ";
  background-color: transparent;
}

.button-menu.active::before,
.button-menu-mobile.active::before {
  content: " ";
  background-color: transparent;
}

.button-menu:hover {
  background-color: transparent;
  transition: 0.1s;
}

.button-menu.active {
  background-color: #f6f3d3;
  background-image: linear-gradient(#f6f3d3, #f6f3d3);
  border: 1px solid #f6f3d3;
}

.profile-text-level {
  color: #fff;
  font-size: 36px;
  font-family: fredoka;
  text-shadow: rgb(74, 38, 27) 4px 0px 0px, rgb(74, 38, 27) 3.87565px 0.989616px 0px,
    rgb(74, 38, 27) 3.51033px 1.9177px 0px, rgb(74, 38, 27) 2.92676px 2.72656px 0px,
    rgb(74, 38, 27) 2.16121px 3.36588px 0px, rgb(74, 38, 27) 1.26129px 3.79594px 0px,
    rgb(74, 38, 27) 0.282949px 3.98998px 0px, rgb(74, 38, 27) -0.712984px 3.93594px 0px,
    rgb(74, 38, 27) -1.66459px 3.63719px 0px, rgb(74, 38, 27) -2.51269px 3.11229px 0px,
    rgb(74, 38, 27) -3.20457px 2.39389px 0px, rgb(74, 38, 27) -3.69721px 1.52664px 0px,
    rgb(74, 38, 27) -3.95997px 0.56448px 0px, rgb(74, 38, 27) -3.97652px -0.432781px 0px,
    rgb(74, 38, 27) -3.74583px -1.40313px 0px, rgb(74, 38, 27) -3.28224px -2.28625px 0px,
    rgb(74, 38, 27) -2.61457px -3.02721px 0px, rgb(74, 38, 27) -1.78435px -3.57996px 0px,
    rgb(74, 38, 27) -0.843183px -3.91012px 0px, rgb(74, 38, 27) 0.150409px -3.99717px 0px,
    rgb(74, 38, 27) 1.13465px -3.8357px 0px, rgb(74, 38, 27) 2.04834px -3.43574px 0px,
    rgb(74, 38, 27) 2.83468px -2.82216px 0px, rgb(74, 38, 27) 3.44477px -2.03312px 0px,
    rgb(74, 38, 27) 3.84068px -1.11766px 0px, rgb(74, 38, 27) 3.9978px -0.132717px 0px;
}

.box-profile-name {
  background-color: #4a261b;
  border: 2px solid #4a261b;
}

.header-text,
.sub-text {
  position: relative;
  padding-left: 15px;
}

.header-text,
.sub-text-mobile {
  position: relative;
  padding-left: 0px;
}

.header-text::after {
  content: " ";
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 12.9px;
  height: 12.9px;
  border-radius: 50%;
  background-color: #4a261b;
}

.options-menu-list {
  border-radius: 5px;
  background-color: transparent;
  color: #4a261b;
  font-weight: bold;
  padding: 5px;
  margin: 3px 0px;
}

.options-menu-list:hover {
  background-color: #4a261b;
  color: #fff;
}

.box-practice-content {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
}

.progress {
  position: relative;
  width: 70%;

  // background-color: #eee7d5;
  border-radius: 20px;
}

.progress-success {
  background-image: linear-gradient(#7ac11a 30%, #629919, #3c5e11);
}
.progress-warning {
  background-image: linear-gradient(#ffa800 30%, #ffc34f, #cb8e19);
}
.progress-failed {
  background-image: linear-gradient(#ed3c24 30%, #f86e5b, #be2914);
}

.box-progress-score {
  position: relative;
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-top-color: transparent;
  border-radius: 0px 0px 10px 10px;
  padding: 5px 3px 10px 7px;
}

.box-progress-score-scroll {
  height: 331px;
  overflow: auto;
}

.box-help-content {
  height: 144px;
  overflow: auto;
}

.box-progress-score-scroll::-webkit-scrollbar,
.box-help-content::-webkit-scrollbar {
  width: 10px;
}

.box-progress-score-scroll::-webkit-scrollbar-thumb,
.box-help-content::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 20px;
}

.box-progress-score-scroll::-webkit-scrollbar-track,
.box-help-content::-webkit-scrollbar-track {
  background-color: transparent;
}

.button-progress-menu {
  position: relative;
  background-color: #4a261b;
  color: #fff;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid #4a261b;
  padding: 5px 0px;
  overflow: hidden;
  cursor: pointer;
}

.button-progress-menu::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 90%;
  left: 0;
  bottom: 0;
  background-color: #4a261b;
  border-radius: 15px 20px 0px 0px;
  z-index: 1;
}

.button-progress-menu::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
}

.button-progress-menu:hover {
  position: relative;
  background-color: transparent;
  color: #fff;
}

.button-progress-menu.active {
  position: relative;
  background-color: #efd080;
  color: #4a261b;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid #4a261b;
  border-bottom-color: #efd080;
}

.button-progress-menu.active::after {
  content: "";
  background-color: transparent;
}

.button-progress-menu.active::before {
  content: "";
  content: "";
  background-color: transparent;
}

.box-scroll-progress-mobile {
  height: 400px;
  padding-right: 5px;
  overflow-y: auto;
}

.box-scroll-progress-mobile::-webkit-scrollbar {
  width: 10px;
}

.box-scroll-progress-mobile::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 20px;
}

.box-scroll-progress-mobile::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 0px;
}

.active-menu {
  background-color: #4a261b;
  color: #fff;
}

.text-title-download {
  color: #4a261b;
}

.box-dialog-selected {
  width: 80px;
  height: 30px;
  background-color: #fff;
  border-radius: 7.5px;
  border: 1px solid #4a261b;
  cursor: pointer;
  color: #4a261b !important;
  font-family: "mali-m";
}

.item-select:hover {
  background-color: #d9d9d9;
  cursor: pointer;
}

.item-select.selected {
  background-color: #d9d9d9;
  color: #4a261b;
}

.button-delete-student {
  width: 100px;
  color: #ff2c2c;
  border: 1px solid #ff2c2c;
  border-radius: 10px;
  padding: 4px 0px;
  align-items: center;
  margin: 16px auto;
  font-size: 12px;
  cursor: pointer;
}

.button-delete-student-disable {
  border: 1px solid #a2a2a2;
  color: #a2a2a2;
  cursor: default;
}

.box-dialog-notify-delete-user {
  width: 324px;
  padding: 10px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
}

.sub-dialog-notify-delete-user {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
}

.dialog-notify-delete-content {
  height: 300px;
  border-radius: 10px;
  background: #efd080;
  padding: 12px;
  overflow: auto;
  margin: 16px 0px;
}

.dialog-notify-delete-content::-webkit-scrollbar {
  width: 10px;
}

.dialog-notify-delete-content::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background: #4a261b;
  border: 3px solid #efd080;
}

.dialog-notify-delete-content::-webkit-scrollbar-track {
  border-radius: 99px;
  border: 2px solid #efd080;
}

.dialog-notify-text-content {
  line-height: 28px;
  margin: 8px 0px;
}

.icon-alert {
  width: 24px;
  color: #cf1111;
}

.box-button-confirm {
  margin-top: 16px;
}

.box-input {
  height: 30px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #fff;
  margin: 8px 0px 0px;
}

.box-input.input-validate {
  border: 1px solid #cf2e2e;
  background: #f8e2e2;
}

.box-button-not-now {
  margin-top: 16px;
}

.box-button-delete-user {
  margin-top: 16px;
}

.text-validate {
  color: #c10015;
}

.box-dialog-container-2 {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
}

.sub-dialog-container-2 {
  padding: 16px 12px 12px 12px;
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
}

.box-dialog-content-2 {
  border-radius: 10px;
  background: #efd080;
  padding: 16px 12px 12px 12px;
  margin: 16px 0px;
}
// #endregion

// #region Dialog History
.box-dialog-history-container {
  width: 320px;
  padding: 10px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
}

.box-dialog-history-container .box-dialog-history-sub {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
}

.box-dialog-history-container .box-dialog-history-sub .box-dialog-history-details {
  background-color: #efd080;
  border-radius: 10px;
  text-align: left;
}

.box-dialog-history-container
  .box-dialog-history-sub
  .box-dialog-history-details
  .box-dialog-history-content-scroller {
  padding-left: 5px;
  height: 300px;
  overflow-y: auto;
}

.box-dialog-history-content-scroller::-webkit-scrollbar {
  width: 6px;
}

.box-dialog-history-content-scroller::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 2px;
}

// #endregion

// #region Dialog Get Started
.box-get-started-container {
  width: 310px;
  padding: 6px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  & .sub {
    padding: 55px 16px 24px 16px;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    color: #512a08;
  }
}
// #endregion

// #region Mini game
.box-minigame-menu-container {
  max-width: 950px;
  min-width: 1000px;
  width: 100%;
  height: 573.35px;
  background-color: #f6f3d3;
  border-radius: 30px;
  border: 3px solid #4a261b;
  overflow: hidden;
}

.box-minigame-menu-container-mobile {
  max-width: 400px;
  width: 100%;
  min-width: 300px;
  max-height: 90vh;
  min-height: 50vh;
  border-radius: 15px;
  background-color: #f6f3d3;
  border: 3px solid #4a261b;
  overflow: hidden;
}

.box-sub-minigame-header {
  position: relative;
  height: 10%;
  background-color: #f2c043;
  box-shadow: inset 0px 10px 0px 0px #fbdd94;
  border-radius: 25px 25px 0px 0px;
}

.box-sub-minigame-header-mobile {
  height: 50px;
  background-color: #f2c043;
  box-shadow: inset 0px 5px 0px 0px #fbdd94;
  border-radius: 10px 10px 0px 0px;
  border-bottom: 3px solid #4a261b;
}

.box-show-mini-game-ticket {
  width: 152px;
  height: 40px;
  border: 3px solid #4a261b;
  border-radius: 33px;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-show-mini-game-ticket-mobile {
  width: 100px;
  height: 26px;
  border: 2px solid #4a261b;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
}

.text-number-ticket,
.text-number-ticket-mobile {
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  line-height: 1;
}

.text-number-ticket-mobile {
  font-size: 16px;
}

.text-header-minigame,
.text-header-minigame-mobile {
  font-size: 36px;
  color: #fff;
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px, 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.text-header-minigame-mobile {
  font-size: 24px;
}

.box-minigame-menu-body {
  height: 80%;
  border-top-color: #4a261b;
  border-top-width: 3px;
  border-top-style: solid;

  border-bottom-color: #4a261b;
  border-bottom-width: 3px;
  border-bottom-style: solid;
}

.box-minigame-menu-body-mobile {
  height: 80%;
  overflow: auto;
}

.box-minigame-menu-footer {
  height: 10%;
  background-color: #f2c043;
  box-shadow: inset 0px -10px 0px 0px #9a771f;
  border-radius: 0px 0px 25px 25px;
}

.box-minigame-menu-footer-mobile {
  height: 50px;
  background-color: #f2c043;
  box-shadow: inset 0px -5px 0px 0px #9a771f;
  border-radius: 0px 0px 10px 10px;
  border-top: 3px solid #4a261b;
}

.text-minigame-details {
  width: 100%;
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px;
  color: #fff;
  font-size: 20px;
}
// #endregion

// #region Animation

.animation-button {
  animation: buttonAnimation 0.8s ease-in alternate infinite;
  transform: translateY(0%);

  -webkit-animation: buttonAnimation 0.8s ease-in alternate infinite;
  -webkit-transform: translateY(0%);

  &:hover {
    animation-play-state: paused;
    -webkit-animation-play-state: paused;
  }

  @keyframes buttonAnimation {
    90% {
      transform: translateY(-5%);
      -webkit-transform: translateY(-5%);
    }
    to {
      transform: translateY(-5%);
      -webkit-transform: translateY(-5%);
    }
  }
}

.animation-open-menu {
  animation: openMenu 0.4s ease-in-out forwards;
  transform: rotate(0deg);
  transform-origin: center;

  -webkit-animation: openMenu 0.4s ease-in-out forwards;
  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: center;

  @keyframes openMenu {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
}

.animation-close-menu {
  animation: closeMenu 0.4s ease-in-out forwards;
  transform: rotate(0deg);
  transform-origin: center;

  -webkit-animation: closeMenu 0.4s ease-in-out forwards;
  -webkit-transform: rotate(0deg);
  -webkit-transform-origin: center;

  @keyframes closeMenu {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }
}

.animation-pixel-flash {
  animation: pixelFlash 0.5s ease-in-out infinite;
  -webkit-animation: pixelFlash 0.5s ease-in-out infinite;

  @keyframes pixelFlash {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
}

// #endregion

// #region Dialog Popup Seven Day Trial
.box-dialog-seven-day-trial-container{
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:1000;

  &.mobile{
    width:100%;
  }
}
// #endregion

// #region Dialog Special recommend level & Special Your level
.box-dialog-special-recommend-level-container,.box-dialog-special-your-level-container{
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:1000;

  &.mobile{
    width:100%;
  }
}
// #endregion

// #region Choose trial level container
.box-choose-trial-level-container{
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:1000;

  &.mobile{
    width:100%;
  }
}
// #endregion

// #region Unlock level container
.box-unlock-level-container{
  width:100%;
  height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index:1000;

  &.mobile{
    width:100%;
  }
}
// #endregion
</style>
