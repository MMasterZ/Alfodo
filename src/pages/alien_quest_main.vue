<template>
  <q-page
    class="backdrop-main"
    :class="systemStore.platform.desktop ? 'row justify-center items-center' : ''"
  >
    <!-- #region Desktop Mode -->
    <div class="relative-position background-main" v-if="systemStore.platform.desktop">
      <background-main
        :isStartGame="isStartGame"
        style="margin-bottom: -5px"
      ></background-main>

      <!-- #region Home Menu -->
      <div class="absolute-center fit " v-if="!isStartGame">

        <div class="relative-position fit row justify-center items-center">

          <div class="absolute-bottom-right box-props-character">
              <q-img src="/images/minigame_main/props-character-alien.webp" no-spinner no-transition></q-img>
          </div>

          <div class="col-12" align="center">
            <div style="margin-top: 4.4%">
              <q-img
                style="width:clamp(282.5px,28.25cqw,452px)"
                src="/images/minigame_main/alien-quest-logo.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div style="margin-top: clamp(10px,1cqw,16px)" align="center">
              <div style="width:clamp(96.25px,9.625cqw,154px)" class="relative-position">
                <q-img
                  src="/images/minigame_main/box-microchip.webp"
                  no-transition
                  no-spinner
                ></q-img>
                <div class="absolute-center text-number-of-ticket font-mali-b" style="width: 50%">
                  {{
                    `${
                      studentStore.studentData.gameTicket > 5
                        ? "5"
                        : studentStore.studentData.gameTicket || 0
                    }/5`
                  }}
                </div>
              </div>
            </div>

            <div align="center" style="margin-top: 15px">
              <div class="relative-position" style="width:clamp(200px,20cqw,320px)">
                <div
                  class="absolute-top-right row "
                  style="right: -20%; opacity: 0"
                  :class="isShowUseTicket ? 'animation-use-ticket' : ''"
                >
                  <div class="relative-position text-use-ticket row">
                    <div class="font-mali-b">
                      {{ `-1` }}
                    </div>
                    <div class="col-1" style="width: clamp(36.25px,3.625cqw,58px);margin:0px clamp(5px,0.5cqw,8px)">
                      <q-img
                        src="/images/minigame_main/icon-microchip.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                </div>
                <div  class="button-start">
                  <q-img
                    :class="isOnClickStartButton ? 'cursor-not-allowed' : 'cursor-pointer'"
                    src="/images/minigame_main/button-start.webp"
                    @click="isOnClickStartButton ? null : funcOnClickButton('start')"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>

            <div class="row justify-center" style="margin-top: 2%" align="center">
              <div class="cursor-pointer relative-position button" style="width:clamp(56.25px,5.625cqw,90px);margin: auto 0.5%">
                <q-img
                  src="/images/minigame_main/button-ranking.webp"
                  @click="funcOnClickButton('ranking')"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

              <div class="cursor-pointer relative-position button" style="width:clamp(56.25px,5.625cqw,90px);margin: auto 0.5%">
                <q-img
                  src="/images/minigame_main/button-how-to-play.webp"
                  @click="funcOnClickButton(`howToPlay`)"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

              <div class="cursor-pointer relative-position button" style="width:clamp(56.25px,5.625cqw,90px);margin: auto 0.5%">
                <q-img
                  src="/images/minigame_main/button-setting.webp"
                  @click="isShowDialogSetting = true"
                  no-spinner
                  no-transition
                ></q-img>
              </div>

            </div>
          </div>

          <div class="col-12 absolute-top-left z-top" style="width: 3.5%; margin: 0.7%">
            <q-img
              class="cursor-pointer button"
              src="/images/icon_main/icon-back.png"
              @click="funcOutOfPiggyCoin()"
            ></q-img>
          </div>
        </div>

      </div>
      <!-- #endregion -->

      <!-- #region Start Game -->
      <div class="absolute-center fit" v-if="isStartGame">
        <!-- Header Bar Timer And Score -->
        <div class="row" style="padding: 1.6% 1%">
          <div
            class="col-1 self-center"
            style="width: 2.9%; margin-left: 0.6%; margin-right: 2.2%"
          >
            <q-img
              width="100%"
              class="cursor-pointer button"
              src="/images/minigame_main/button-pause.webp"
              no-spinner=""
              no-transition=""
              @click="isShowDialogSetting = true"
            ></q-img>
          </div>
          <div
            class="col-1 self-center row relative-position"
            style="width: 36.69%; margin: 0% 2%"
          >
            <div class="col-1 self-center relative-position" style="width: 100%">
              <div class="box-progress-time-main">
                <div
                  id="timer-bar"
                  class="progress-time"
                  :style="`animation-duration: ${practiceData.time}s;`"
                  :class="[isStartAnimation ? 'animation-bar' : '', `${colorTime} `]"
                ></div>
              </div>

              <div class="absolute-center" style="width: 10%; left: 0">
                <q-img
                  width="100%"
                  src="/images/piggy_coin_main/piggy-coin-alarm-clock.png"
                  no-spinner=""
                  no-transition=""
                  :class="isShowAnimationAlarm ? 'animation-alarm' : ''"
                ></q-img>
              </div>
            </div>
          </div>
          <q-space></q-space>
          <div class="col-1 self-end" style="width: clamp(120px,12cqw,192px); margin: 0% 1%">
            <q-img
              src="/images/minigame_main/box-total-score.webp"
              no-spinner
              no-transition
            >
              <div
                class="transparent absolute-center row justify-center items-center no-padding"
                style="width: 100%; height: fit-content"
              >
                <div class="text-total-score font-mali-b " align="center">
                  <span>
                    {{ `Score : ${practiceData.score}` }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
          <div
            class="col-1 self-end relative-position"
            style="width: clamp(96.25px,9.625cqw,154px);margin: 0% 1%"
          >
            <q-img
              src="/images/minigame_main/box-total-alien.webp"
              no-spinner
              no-transition
            >
              <div
                class="transparent absolute-center row justify-center items-center no-padding"
                style="width: 100%; height: fit-content"
              >
                <div
                  class="text-total-pig font-mali-b"
                  align="left"
                >
                  <span>
                    {{ `x ${practiceData.totalPig}` }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
        <div v-if="isShowAnimationAddPiggy" style="padding: 0.7% 1%">
          <div class="row animation-add-piggy">
            <q-space></q-space>
            <div class="col-1" style="width:clamp(67.5px,6.75cqw,108px)">
              <q-img
                width="100%"
                :src="`/images/minigame_main/alien-head-${showPiggyTypeColor}.webp`"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
            <div class="self-center" style="margin: 0% 1% 0% 1%">
              <span class="text-add-pig font-mali-b">+1</span>
            </div>
          </div>
        </div>

        <!-- Show Alien Purple, green, gold -->
        <div
          class="absolute-center"
          style="top: 99%; transform: translate(-50%, -100%); width: 100%; height: 75%"
        >
          <div class="fit relative-position">
            <div
              class="absolute"
              :style="`width:6.25%;${piggy.style};z-index:${
                indexPiggy + 1
              };transform:rotateY(${piggy.LR}deg);`"
              v-for="(piggy, indexPiggy) in piggyList"
              :key="indexPiggy"
              :id="`pig-${indexPiggy + 1}`"
            >
              <q-img
                class="absolute-center"
                :src="`/images/minigame_main/alien-${piggy.type}.webp`"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
          </div>
        </div>

        <!-- Box Question And Choice -->
        <div class="absolute-bottom" align="center" style="padding: 2% 0%">
          <div class="" style="width: clamp(375px,37.5cqw,600px)" align="center">
            <q-img
              src="/images/minigame_main/box-question.webp"
              no-spinner=""
              no-transition=""
            >
              <div
                class="transparent absolute-center row justify-center items-center"
                style="width: 100%; height: fit-content"
              >
                <div
                  class="text-question relative-position row justify-center font-mali-sb"
                  align="left"
                  style="padding-top: 1%"
                  :style="
                    practiceData.question.length >= 40
                      ? 'font-size: min(28px, 1.3vw);'
                      : 'font-size: min(32px, 2vw);'
                  "
                >
                  <div class="self-center">
                    {{ `${practiceData.question}` }}
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <div
            class="row justify-center"
            style="margin-top: 2%; width: 100%"
            align="center"
          >
            <div
              class="col-1 button-answer-active"
              style="margin: 0% 1%; width: clamp(183.125px,18.3125cqw,293px)"
              v-for="(itemAnswer, indexAnswer) in practiceData.answers"
              :key="indexAnswer"
              @click="practiceData.isSendAnswer ? null : funcCheckAnswer(indexAnswer)"
              :id="indexAnswer == 0 ? 'answer-left' : 'answer-right'"
            >
              <q-img
                width="100%"
                class="cursor-pointer"
                src="/images/minigame_main/button-answer.webp"
                no-spinner=""
                no-transition=""
              >
                <div
                  class="transparent absolute-center row justify-center items-center"
                  style="width: 100%; height: fit-content"
                >
                  <div class="text-choice font-mali-m">
                    {{ itemAnswer.answer }}
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile Mode -->
    <div
      class="relative-position background-main mobile"
      :class="!isStartGame ? 'home' : 'game'"
      v-if="!systemStore.platform.desktop"
    >
      <!-- #region Home Menu -->
      <div
        class="absolute-center fit row justify-center items-center"
        v-if="!isStartGame"
      >
        <div class="col-12" align="center">
          <div class="q-my-md">
            <q-img
              style="width:356px;"
              src="/images/minigame_main/alien-quest-logo.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div align="center" class="q-my-md">
            <div style="width:154px;" class="relative-position">
              <q-img
                src="/images/minigame_main/box-microchip.webp"
                no-transition
                no-spinner
              ></q-img>
              <div class="absolute-center text-number-of-ticket font-mali-b" :class="{'mobile':isMobile}">
                {{
                  `${
                    studentStore.studentData.gameTicket > 5
                      ? "5"
                      : studentStore.studentData.gameTicket || 0
                  }/5`
                }}
              </div>
            </div>
          </div>

          <div class="q-my-md" align="center">
            <div class="relative-position" style="width: 226px">
              <div
                class="absolute-top-right row"
                style="opacity: 0"
                :class="isShowUseTicket ? 'animation-use-ticket-finish' : ''"
              >
                <div class="relative-position row">
                  <div class="font-mali-b text-use-ticket mobile">
                    {{ `-1` }}
                  </div>
                  <div class="col-1 q-mx-xs" style="width:40px;">
                    <q-img
                      src="/images/minigame_main/icon-microchip.webp"
                    ></q-img>
                  </div>
                </div>
              </div>

              <div class="button-start" :class="{'mobile':isMobile}">
                <q-img
                  :class="isOnClickStartButton ? 'cursor-not-allowed' : 'cursor-pointer'"
                  :src="`/images/minigame_main/button-start.webp`"
                  @click="isOnClickStartButton ? null : funcOnClickButton('start')"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
          <div class="row justify-center q-my-lg" align="center">
            <div class="cursor-pointer relative-position button q-mx-sm" style="width:60px;">
              <q-img
                src="/images/minigame_main/button-ranking.webp"
                @click="funcOnClickButton('ranking')"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="cursor-pointer relative-position button q-mx-sm" style="width:60px;">
              <q-img
                src="/images/minigame_main/button-how-to-play.webp"
                @click="funcOnClickButton(`howToPlay`)"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="cursor-pointer relative-position button q-mx-sm" style="width:60px;">
              <q-img
                src="/images/minigame_main/button-setting.webp"
                @click="funcOnClickButton('setting')"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>

        <div
          class="absolute-top-left q-ma-md"
          :style="$q.platform.is.ios ? '' : ''"
          style="width: 56px;"
        >
          <q-img
            class="cursor-pointer button"
            src="/images/icon_main/icon-back.png"
            @click="funcOutOfPiggyCoin()"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Start Game -->
      <div class="absolute-center fit" v-if="isStartGame">
        <!-- Header Bar Timer And Score -->
        <div class="row q-pa-sm">
          <div
            class="col-1 self-center q-mr-xs"
            style="width:34px;"
          >
            <q-img
              width="100%"
              class="cursor-pointer button"
              src="/images/icon_main/icon-setting.png"
              no-spinner=""
              no-transition=""
              @click="isShowDialogSetting = true"
            ></q-img>
          </div>
          <div
            class="col-1 self-center q-ml-sm row relative-position"
            style="width: 180px;"
          >
            <div class="col-1 self-center" style="width: 100%">
              <div class="box-progress-time-main mobile">
                <div
                  id="timer-bar"
                  class="progress-time mobile"
                  :style="`animation-duration: ${practiceData.time}s;`"
                  :class="[isStartAnimation ? 'animation-bar' : '', colorTime]"
                ></div>
              </div>

              <div class="absolute-center" style="width: 30px;left:5px;">
                <q-img
                  width="100%"
                  src="/images/piggy_coin_main/piggy-coin-alarm-clock.png"
                  no-spinner=""
                  no-transition=""
                  :class="isShowAnimationAlarm ? 'animation-alarm' : ''"
                ></q-img>
              </div>
            </div>
          </div>
          <q-space></q-space>
          <div class="col-1 self-center" style="width: 110px;">
            <q-img
              src="/images/minigame_main/box-total-score.webp"
              no-spinner
              no-transition
            >
              <div
                class="transparent absolute-center row justify-center items-center no-padding"
                style="width: 100%; height: fit-content"
              >
                <div class="text-total-score mobile font-mali-b" align="center" style="width: 80%">
                  <span>
                    {{ `Score : ${practiceData.score}` }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
        </div>

        <div align="right" class="q-mr-sm">
          <div class="relative-position" style="width: 90px;">
            <q-img
              src="/images/minigame_main/box-total-alien.webp"
              no-spinner
              no-transition
            >
              <div
                class="transparent absolute-center row justify-center items-center no-padding"
                style="width: 100%; height: fit-content"
              >
                <div
                  class="text-total-pig mobile font-mali-b"
                  style="width: 50%;margin-top:3px;"
                  align="left"
                >
                  <span>
                    {{ `x ${practiceData.totalPig}` }}
                  </span>
                </div>
              </div>
            </q-img>
          </div>
        </div>

        <!-- animation-add-align -->
        <div class="" v-if="isShowAnimationAddPiggy" style="padding: 5% 1%">
          <div class="row animation-add-piggy">
            <q-space></q-space>
            <div class="col-1" style="width: 36px;">
              <q-img
                width="100%"
                :src="`/images/minigame_main/alien-head-${showPiggyTypeColor}.webp`"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
            <div class="self-center" style="margin: 0% 1% 0% 1%">
              <div class="text-add-pig mobile">
                <span class="font-mali-b">+1</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Show Alien pink, green, gold -->
        <div
          class="absolute-center"
          style="top: 100%; transform: translate(-50%, -100%); width: 100%; height: 65%"
        >
          <div class="fit relative-position">
            <div
              class="absolute"
              :style="`width:14.04%;${piggy.style};z-index:${
                indexPiggy + 1
              };transform:rotateY(${piggy.LR}deg);`"
              v-for="(piggy, indexPiggy) in piggyList"
              :key="indexPiggy"
              :id="`pig-${indexPiggy + 1}`"
            >
              <!-- animation-pig -->
              <q-img
                class="absolute-center"
                :src="`/images/minigame_main/alien-${piggy.type}.webp`"
                no-spinner=""
                no-transition=""
              ></q-img>

              <!-- animation-shadow -->
              <q-img
                class="absolute-center"
                src="/images/piggy_coin_main/piggy-coin-pig-shadow.png"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
          </div>
        </div>

        <!-- Box Question And Choice -->
        <div class="absolute-bottom q-py-md" align="center">
          <div class="relative-position " style="width:328px;" align="center">
            <q-img
              src="/images/minigame_main/box-question-mobile.webp"
              no-spinner
              no-transition
            >
            </q-img>
            <div
              class="transparent absolute-center row justify-center items-center no-padding"
              style="top:45%;width: 100%; height: fit-content"
            >
              <div
                class="text-question mobile row justify-center font-mali-sb"
                align="left"
              >
                {{ `${practiceData.question}` }}
              </div>
            </div>
          </div>
          <div
            class="row justify-around q-mt-md"
            style=" width: 100%"
            align="center"
          >
            <div
              class="col-12"
              style="width:164px;"
              v-for="(itemAnswer, indexAnswer) in practiceData.answers"
              :key="indexAnswer"
              @click="practiceData.isSendAnswer ? null : funcCheckAnswer(indexAnswer)"
            >
              <q-img
                width="100%"
                class="cursor-pointer button-answer-active"
                src="/images/minigame_main/button-answer-mobile.webp"
                no-spinner=""
                no-transition=""
              >
                <div
                  class="transparent absolute-center row justify-center items-center"
                  style="width: 100%; height: fit-content"
                >
                  <div class="text-choice mobile font-mali-m">
                    {{ `${itemAnswer.answer}` }}
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog How To Play -->
  <q-dialog v-model="isShowDialogHowToPlay" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img
            width="300px"
            src="/images/piggy_coin_main/piggy-coin-dialog.png"
            no-spinner
            no-transition
          >
            <div class="fit row justify-center items-center transparent">
              <div class="col-12 self-start" style="height: 10%"></div>
              <div class="col-12 self-center" style="height: 70%">
                <q-img
                  :src="`/images/piggy_coin_main/piggy-coin-image-how-to-play-${howToPlayNumberCard}.png`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="col-12 self-end row q-pa-sm" style="height: 20%">
                <div class="col-1 self-center" style="width: 40px">
                  <q-img
                    @click="howToPlayNumberCard--"
                    width="39px"
                    class="cursor-pointer"
                    src="/images/piggy_coin_main/piggy-coin-button-previous.png"
                    v-if="howToPlayNumberCard != 1"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col self-center" align="center">
                  <span class="text-stroke-2 f16 font-mali-sb"
                    >{{ ` หน้าที่ ${howToPlayNumberCard}` }}
                  </span>
                </div>
                <div class="col-1 self-center" style="width: 40px">
                  <q-img
                    @click="howToPlayNumberCard++"
                    width="39px"
                    class="cursor-pointer"
                    src="/images/piggy_coin_main/piggy-coin-button-next.png"
                    v-if="howToPlayNumberCard != 4"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>

          <div class="absolute-top" style="top: -35px" align="center">
            <div>
              <q-img
                width="205px"
                src="/images/piggy_coin_main/piggy-coin-how-to-play-logo.png"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px" align="center">
            <div>
              <q-btn round flat v-close-popup>
                <q-img
                  width="50px"
                  src="/images/icon_main/icon-close.png"
                  no-spinner
                  no-transition
                >
                </q-img>
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Game Over -->
  <q-dialog v-model="isShowDialogGameOver" persistent maximized>

    <!-- #region Desktop -->
    <q-card
      class="transparent shadow-0 row justify-center items-center"
      v-if="systemStore.platform.desktop"
    >
      <q-card-section
        class="fit row justify-center items-center no-padding"
        style="max-width: 1600px; width: 100%; margin: auto"
      >
        <div class="fit">
          <div class="absolute-center" style="width: clamp(562.5px,56.25cqw,900px)">
            <div class="relative-position fit">
              <!-- #region Background -->
              <q-img
                src="/images/minigame_main/box-minigame-alien-quest-game-over.webp"
                no-spinner
                no-transition
              ></q-img>
              <!-- #endregion -->

              <!-- #region Details -->
              <div class="absolute-center fit">
                <div
                  class="absolute-center fit row justify-center items-center"
                  style="padding-top: 5%"
                >
                  <!-- Detail Left -->
                  <div class="col-1 self-center box-show-detail-game-over row">
                    <div class="col-12 self-start">
                      <div class="header font-mali-b">
                        <span>{{ `จำนวนหมู : ${practiceData.totalPig}` }}</span>
                      </div>
                    </div>
                    <div class="col-12 self-start">
                      <div class="row justify-center">
                        <div class="col-1" style="width:clamp(31.25px,3.125cqw,50px);margin:clamp(1.875px,0.1875cqw,3px) clamp(10px,1cqw,16px);">
                          <q-img
                            src="/images/minigame_main/alien-head-purple.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="f24 font-mali-b self-center text-game-over-pig"
                          style="margin: 0px clamp(10px,1cqw,16px)"
                        >
                          {{ `X ${practiceData.redPig}` }}
                        </div>
                      </div>
                      <div class="row justify-center">
                        <div class="col-1" style="width:clamp(31.25px,3.125cqw,50px);margin:clamp(1.875px,0.1875cqw,3px) clamp(10px,1cqw,16px);">
                          <q-img
                            src="/images/minigame_main/alien-head-green.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="f24 font-mali-b self-center text-game-over-pig"
                          style="margin: 0px clamp(10px,1cqw,16px)"
                        >
                          {{ `X ${practiceData.bluePig}` }}
                        </div>
                      </div>
                      <div class="row justify-center">
                        <div class="col-1" style="width:clamp(31.25px,3.125cqw,50px);margin:clamp(1.875px,0.1875cqw,3px) clamp(10px,1cqw,16px);">
                          <q-img
                            src="/images/minigame_main/alien-head-white.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div
                          class="f24 font-mali-b self-center text-game-over-pig"
                          style="margin: 0px clamp(10px,1cqw,16px)"
                        >
                          {{ `X ${practiceData.goldPig}` }}
                        </div>
                      </div>
                    </div>
                    <div class="col-12 self-end">
                      <div class="box-game-over-total-coin row">
                        <div class="col-1 self-center" style="width:clamp(31.25px,3.125cqw,50px);margin-bottom:clamp(-5px,-0.3125cqw,-3.125px);">
                          <q-img
                            width="100%"
                            src="/images/minigame_main/icon-cubic.webp"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                        <div class="col self-center row justify-center" align="center">
                          <div
                            class="col-1 width-fit self-center"
                            align="right"
                            style="
                              font-size: clamp(22.5px,2.25cqw,36px);
                              line-height:normal;
                              padding: 0px clamp(10px,1cqw,16px);
                            "
                          >
                            <div class="relative-position font-mali-b">
                              {{ `${runSummaryCoin}` }}

                              <div
                                class="absolute-top-right font-mali-b text-add-coin"
                                :class="
                                  isRunAnimationSummaryCoin ? 'animation-text-add' : ''
                                "
                                style="line-height: 1; opacity: 0"
                                v-if="practiceData.totalCoin > 0"
                              >
                                {{ `+${practiceData.totalCoin}` }}
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-1 width-fit font-mali-b self-center relative-position"
                            style="
                              width: 40%;
                              font-size: clamp(12.5px,1.25cqw,20px);
                              line-height: normal;
                              padding: clamp(3.125px,0.3125cqw,5px) clamp(10px,1cqw,16px) 0px;
                            "
                            align="right"
                          >
                            <div>
                              {{ `/300` }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12 text-game-over-quota relative-position"
                      align="center"
                      style="padding: clamp(6.25px,0.625cqw,10px) 0px"
                    >
                      <div
                        class="absolute-center full-width font-mali-m"
                        style="line-height: 1"
                        v-if="dailyCoin >= 300"
                      >
                        ได้รับเหรียญถึงจำนวนจำกัดต่อวันแล้ว
                      </div>
                    </div>
                  </div>

                  <!-- Detail Center -->
                  <div
                    class="col-1 self-center box-show-detail-game-over row"
                    align="center"
                  >
                    <div class="col-12 self-start" style="height: 25%">
                      <div style="width: 81%" align="center">
                        <q-img
                          src="/images/minigame_main/label-alien-quest-score.webp"
                          no-spinner
                          no-transition
                        >
                        </q-img>
                      </div>
                      <div
                        class="col-12 font-mali-b text-detail-game-over"
                      >
                        <div
                          class="relative-position width-fit"
                          v-if="practiceData.score >= rankingCurrentData.score"
                        >
                          {{ `Best score` }}
                        </div>
                      </div>
                    </div>

                    <div class="col-12 self-center row items-center" style="height: 50%">
                      <div class="col-12 text-detail-score-game-over font-mali-b">
                        {{ `${runSummaryScore}` }}
                      </div>
                    </div>

                    <div class="col-12 self-end" style="height: 25%">
                      <div>
                        <div
                          class="font-mali-b"
                          style="font-size: clamp(12.5px,1.25cqw,20px); color: #014DA4"
                        >
                          {{ `คะแนนสูงสุดที่ทำได้ ` }}
                        </div>
                        <div class="row justify-center">
                          <div class="col-1 self-center" style="width:clamp(18.75px,1.875cqw,30px);margin:0px clamp(6.25px,0.625cqw,10px);">
                            <q-img
                              src="/images/piggy_coin_main/piggy-coin-finish-icon-trophy.png"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                          <div
                            class="self-center font-mali-b"
                            style="
                              font-size: clamp(22.5px,2.25cqw,36px);
                              color: #014DA4;
                              margin: 0% 10px;
                            "
                          >
                            {{ rankingCurrentData.score }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Detail Right -->
                  <div class="col-1 self-center box-show-detail-game-over">
                    <div>
                      <div class="header font-mali-b">
                        <span>Ranking</span>
                      </div>
                    </div>

                    <div style="margin-top:clamp(5px,0.5cqw,8px);padding: 0px clamp(3.125px,0.3125cqw,5px) 0px clamp(10px,1cqw,16px); height: 85%">
                      <div class="box-game-over-ranking-scroll">
                        <div
                          v-for="(
                            rankingDataFinish, indexRankingFinish
                          ) in rankingDataList"
                          :key="indexRankingFinish"
                          align="center"
                        >
                          <div style="width: 90%">
                            <div class="col-12 relative-position box-character-header-main">
                              <div class="absolute-center" style="width:clamp(37.5px,3.75cqw,60px);left:clamp(9.375px,0.9375cqw,15px);">
                                <div class="relative-position fit">
                                  <q-img src="/images/minigame_main/box-character-head.webp" no-spinner no-transition></q-img>
                                  <div
                                    class="absolute-center"
                                    style="
                                      width:80%;
                                      height:80%;
                                      overflow: hidden;
                                      border-radius: 50%;
                                    "
                                  >
                                    <div class="absolute-center">
                                      <character-header
                                        style="margin-bottom: clamp(3.125px,0.3125cqw,5px)"
                                        :isAnimation="false"
                                        :equipment="rankingDataFinish.characterInfo"
                                        :isRanking="true"
                                        :setId="`piggy-coin-ranking-finish-${indexRankingFinish}`"
                                      ></character-header>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="row fit">
                                <div
                                  class="col-1 self-center relative-position "
                                  style="width:clamp(25px,2.5cqw,40px);"
                                >
                                </div>
                                <div
                                  class="col self-center relative-position font-mali-b"
                                  align="left"
                                >
                                  <div
                                    class="text-name-overflow text-name"
                                    style="font-size:clamp(7.5px,0.75cqw,12px);line-height:clamp(6.25px,0.625cqw,10px);color: #1E467B"
                                  >
                                    <div>
                                      {{ `${rankingDataFinish.characterInfo.name}` }}
                                    </div>
                                  </div>
                                  <div
                                    class="row"
                                    style="width: 100%;margin-top:clamp(2.5px,0.25cqw,4px);"
                                  >
                                    <div
                                      class="col-1 relative-position self-center"
                                      style="
                                        width:clamp(8.75px,0.875cqw,14px);
                                        height: fit-content;
                                        margin: 0px clamp(3.1px,0.31cqw,5px) 0px 0px;
                                      "
                                    >
                                      <q-img
                                        class="absolute-center"
                                        src="/images/piggy_coin_main/piggy-coin-finish-icon-trophy.png"
                                        no-spinner
                                        no-transition
                                      ></q-img>
                                    </div>
                                    <div
                                      style="font-size:clamp(10px,1cqw,16px);line-height:clamp(10px,1cqw,16px); margin: 0px clamp(3.1px,0.31cqw,5px)"
                                    >
                                      <div class="text-star">
                                        {{ `${rankingDataFinish.score}` }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  class="col-1 self-center relative-position"
                                  align="center"
                                  style="width: 25%"
                                >
                                  <q-img
                                    class="absolute-center"
                                    width="95%"
                                    style="margin-top: 18%; left:65%"
                                    :src="`/images/icon_main/icon-ranking-number-${
                                      indexRankingFinish + 1
                                    }.png`"
                                    v-if="indexRankingFinish + 1 <= 3"
                                    no-spinner
                                    no-transition
                                  ></q-img>

                                  <q-img
                                    width="60%"
                                    src="/images/minigame_main/box-number-ranking.webp"
                                    style="left:27%;"
                                    no-spinner
                                    no-transition
                                    v-else
                                  >
                                    <div class="transparent absolute-center">
                                      <div
                                        style="font-size:clamp(10px,1cqw,16px); line-height: 0"
                                      >
                                        <span>
                                          {{ indexRankingFinish + 1 }}
                                        </span>
                                      </div>
                                    </div>
                                  </q-img>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div style="height: 5%"></div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Logo Game over -->
              <div class="absolute-center" style="width:clamp(250px,25cqw,400px); top: clamp(-30px,-1.875cqw,-18.75px)">
                <q-img
                  src="/images/minigame_main/logo-alien-quest-game-over.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region Button Menu -->
              <div
                class="absolute-bottom row justify-center items-center"
                style="bottom: clamp(-60px,-3.75cqw,-37.5px)"
              >
                <div class="col-1 relative-position" style="width: clamp(67.5px,6.75cqw,108px); margin: 0% clamp(6.25px,0.625cqw,10px)">
                  <div
                    class="absolute-top-right row"
                    style="width: 80%; right: -20%; opacity: 0"
                    :class="isShowUseTicket ? 'animation-use-ticket-finish' : ''"
                  >
                    <div
                      class="relative-position"
                      style="font-size: min(48px, 3vw); color: #4a261b; width: 100%"
                    >
                      <div
                        class="absolute-center font-mali-b"
                        style="left: -40%; top: 55%"
                      >
                        {{ `-1` }}
                      </div>
                      <q-img
                        width="100%"
                        src="/images/minigame_main/icon-microchip.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>

                  <div class="">
                    <q-img
                      :src="`/images/minigame_main/button-restart.webp`"
                      no-spinner
                      no-transition
                      class="cursor-pointer button"
                      @click="funcOnClickButton(`restart`)"
                    ></q-img>
                  </div>
                </div>
                <div class="col-1" style="width: clamp(67.5px,6.75cqw,108px); margin: 0% clamp(6.25px,0.625cqw,10px)">
                  <q-img
                    src="/images/minigame_main/button-menu.webp"
                    no-spinner
                    no-transition
                    class="cursor-pointer button"
                    @click="funcOnClickButton(`menu`)"
                  ></q-img>
                </div>
                <!-- <div class="col-1" style="width: 11.11%; margin: 0% 2%">
                  <q-img
                    src="/images/piggy_coin_main/piggy-coin-finish-button-share.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer button"
                    @click="funcOnClickButton(`share`)"
                  ></q-img>
                </div> -->
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <q-card class="transparent shadow-0" v-if="systemStore.platform.mobile">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img
            width="306px"
            src="/images/minigame_main/box-minigame-alien-quest-game-over-mobile.webp"
            no-spinner
            no-transition
          >
            <div class="fit row justify-center items-center transparent">
              <div class="col-12 self-start" style="height: 13%"></div>
              <div class="col-12 self-center q-px-sm" style="height: 75%">
                <div
                  class="row justify-center items-center box-show-detail-game-over mobile"
                >
                  <div class="col-12 self-start">
                    <q-img
                      src="/images/minigame_main/label-alien-quest-score-mobile.webp"
                      no-spinner
                      no-transition
                    >
                    </q-img>
                  </div>
                  <div class="col-12 self-center font-mali-b" align="center">
                    <div
                      class="relative-position width-fit f24"
                      style="color: #014DA4"
                      v-if="practiceData.score >= rankingCurrentData.score"
                    >
                      {{ `Best score` }}
                    </div>
                    <div class="text-detail-score-game-over" style="font-size: 64px">
                      {{ `${runSummaryScore}` }}
                    </div>
                  </div>
                </div>
                <div class="" style="margin: 10px 0px">
                  <div
                    class="box-total-pig-score-mobile row justify-center items-center f20"
                    align="center"
                  >
                    {{ `จำนวนหมู : ${practiceData.totalPig}` }}
                  </div>
                </div>
                <div class="" style="margin: 10px 0px">
                  <div
                    class="box-game-over-total-coin row"
                    style="width: 100%; height: 50px"
                  >
                    <div class="col-1 self-center width-fit">
                      <q-img
                        width="40px"
                        src="/images/minigame_main/icon-cubic.webp"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div
                      class="col self-center row justify-center"
                      style="padding-bottom: 3px; font-size: 36px"
                      align="center"
                    >
                      <div
                        class="col-1 width-fit self-center"
                        align="right"
                        style="line-height: 0.5; padding: 0px 3px"
                      >
                        <div class="relative-position font-mali-b">
                          {{ `${runSummaryCoin}` }}

                          <div
                            class="absolute-top-right font-mali-b text-add-coin"
                            :class="isRunAnimationSummaryCoin ? 'animation-text-add' : ''"
                            style="line-height: 1; opacity: 0; font-size: 24px"
                            v-if="practiceData.totalCoin > 0"
                          >
                            {{ `+${practiceData.totalCoin}` }}
                          </div>
                        </div>
                      </div>
                      <div
                        class="col-1 width-fit font-mali-b self-center relative-position"
                        style="
                          width: 40%;
                          font-size: 20px;
                          padding: 0px 3px;
                          line-height: 0.5;
                          padding-top: 8px;
                        "
                        align="right"
                      >
                        <div>
                          {{ `/300` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="text-game-over-quota mobile"
                  style="margin-top: -1px"
                  align="center"
                >
                  <span class="font-mali-m" v-if="dailyCoin >= 300"
                    >ได้รับเหรียญถึงจำนวนจำกัดต่อวันแล้ว</span
                  >
                </div>
              </div>
              <div class="col-12 self-end" style="height: 12%"></div>
            </div>
          </q-img>

          <div class="absolute-top" style="top: -100px" align="center">
            <div>
              <q-img
                width="270px"
                src="/images/minigame_main/logo-alien-quest-game-over.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>

          <!-- #region Button Menu -->
          <div
            class="absolute-bottom row justify-center items-center"
            style="bottom: -25px"
          >
            <div class="col-1 relative-position" style="width: 70px; margin: 0% 2%">
              <div
                class="absolute-top-right row"
                style="width: 40%; right: -20%; opacity: 0"
                :class="isShowUseTicket ? 'animation-use-ticket-finish' : ''"
              >
                <div
                  class="relative-position"
                >
                  <div class="absolute-center text-use-ticket mobile font-mali-b" style="left: -40%; top: 55%">
                    {{ `-1` }}
                  </div>
                  <q-img
                    width="35px"
                    src="/images/minigame_main/icon-microchip.webp"
                  ></q-img>
                </div>
              </div>
              <div class="cursor-pointer button" @click="funcOnClickButton(`restart`)">
                <q-img
                  :src="`/images/minigame_main/button-restart.webp`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
            <div class="col-1" style="width: 70px; margin: 0% 2%">
              <q-img
                src="/images/minigame_main/button-menu.webp"
                no-spinner
                no-transition
                class="cursor-pointer button"
                @click="funcOnClickButton(`menu`)"
              ></q-img>
            </div>
            <!-- <div class="col-1" style="width: 70px; margin: 0% 2%">
              <q-img
                src="/images/piggy_coin_main/piggy-coin-finish-button-share.png"
                no-spinner
                no-transition
                class="cursor-pointer button"
                @click="funcOnClickButton(`share`)"
              ></q-img>
            </div> -->
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
    <!-- #endregion -->
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Ranking -->
  <q-dialog v-model="isShowDialogRanking" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="absolute-center" style="width: 300px">
          <q-img
            width="300px"
            src="/images/minigame_main/dialog-minigame-ranking.webp"
            no-spinner=""
            no-transition=""
          >
            <div class="absolute-center transparent fit row no-padding">
              <div class="col-12 row justify-center relative-position" style="height: 100%">
                <div class="col-12 relative-position" style="height: 17%">
                  <div class="absolute-bottom row" style="left: 10%; bottom: -1%">
                    <div
                      class="col-1 width-fit"
                      v-if="studentStore.studentType != 'online'"
                    >
                      <q-img
                        width="70px"
                        class="cursor-pointer"
                        :src="`/images/piggy_coin_main/piggy-coin-button-school${
                          rankingSelected == 'school' ? '-selected' : ''
                        }.png`"
                        @click="rankingSelected = 'school'"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="col-1 width-fit">
                      <q-img
                        width="70px"
                        class="cursor-pointer"
                        :src="`/images/piggy_coin_main/piggy-coin-button-global${
                          rankingSelected == 'global' ? '-selected' : ''
                        }.png`"
                        @click="rankingSelected = 'global'"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>

                <div class="col-12 self-center box-ranking-scroller" style="height: 58%">
                  <div
                    class="row justify-center"
                    :style="indexRankingDialog + 1 > 1 ? 'margin-top: 1%' : ''"
                    v-for="(rankingDataDialog, indexRankingDialog) in rankingDataList"
                    :key="indexRankingDialog"
                    align="center"
                    @mouseover="showTooltipIndex = indexRankingDialog"
                    @mouseleave="showTooltipIndex = null"
                  >
                    <div class="col-12 row relative-position" style="width: 100%">
                      <div class="col-12 relative-position fit cursor-pointer">
                        <q-img
                          src="/images/piggy_coin_main/piggy-coin-ranking-box-character.png"
                          no-spinner
                          no-transition
                        ></q-img>
                        <div class="absolute-center row fit">
                          <div
                            class="col-1 self-center relative-position"
                            style="width: 62px; height: 62px; margin-left: 3px"
                          >
                            <div
                              class="relative-position"
                              style="
                                width: 100%;
                                height: 100%;
                                overflow: hidden;
                                border-radius: 50%;
                                background-color: #fff;
                              "
                            >
                              <div class="absolute-center">
                                <character-header
                                  style="margin-bottom: 5px"
                                  :isAnimation="false"
                                  :equipment="rankingDataDialog.characterInfo"
                                  :isRanking="true"
                                  :setId="`piggy-coin-ranking-${indexRankingDialog}`"
                                ></character-header>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col self-center relative-position font-mali-b"
                            align="left"
                            style="height: 70%; margin-left: 7px"
                          >
                            <div class="absolute-top-left text-name-overflow text-name">
                              <div style="font-size: 12px; color: #804208">
                                {{ `${rankingDataDialog.characterInfo.name}` }}
                              </div>
                            </div>
                            <div
                              class="absolute-bottom-left row"
                              style="width: 100%; margin: 3% 0%"
                            >
                              <div
                                class="col-1 relative-position self-center"
                                style="width: 15%; height: fit-content; margin: 0% 3%"
                              >
                                <q-img
                                  class="absolute-center"
                                  src="/images/piggy_coin_main/piggy-coin-finish-icon-trophy.png"
                                  no-spinner
                                  no-transition
                                ></q-img>
                              </div>
                              <div
                                class="self-end"
                                style="font-size: 16px; margin: 0% 3%"
                              >
                                <div class="text-star">
                                  {{ `${rankingDataDialog.score}` }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            class="col-1 self-center relative-position"
                            align="center"
                            style="width: 25%"
                          >
                            <q-img
                              class="absolute-center"
                              width="80%"
                              style="margin-top: 10%; left: 48%"
                              :src="`/images/icon_main/icon-ranking-number-${
                                indexRankingDialog + 1
                              }.png`"
                              v-if="indexRankingDialog + 1 <= 3"
                              no-spinner
                              no-transition
                            ></q-img>

                            <q-img
                              width="50%"
                              src="/images/piggy_coin_main/piggy-coin-box-number-ranking.png"
                              no-spinner
                              no-transition
                              v-else
                            >
                              <div class="transparent absolute-center">
                                <div style="font-size: 16px; line-height: 0">
                                  <span>
                                    {{ indexRankingDialog + 1 }}
                                  </span>
                                </div>
                              </div>
                            </q-img>
                          </div>
                        </div>
                      </div>

                      <dialog-character
                        :rankingType="rankingSelected"
                        :characterData="rankingDataDialog"
                        :index="indexRankingDialog + 1"
                        v-if="systemStore.platform.desktop"
                      ></dialog-character>
                    </div>
                  </div>
                </div>

                <div
                  class="col-12 self-end box-current-student-ranking row justify-center items-center"
                  style="height: 20%"
                >
                  <div
                    class="col-1 self-center relative-position"
                    style="width: 25%; height: 80%; padding: 1.3%; margin-left: 0.5%"
                  >
                    <div
                      class="relative-position"
                      style="
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        border-radius: 50%;
                        background-color: #fff;
                      "
                    >
                      <div class="absolute-center">
                        <character-header
                          style="margin-bottom: 5px"
                          :isAnimation="false"
                          :setId="`current-student-${studentStore.studentId}`"
                        ></character-header>
                      </div>
                    </div>
                  </div>
                  <div class="col self-center relative-position fit">
                    <div
                      class="text-name-overflow absolute-top-left"
                      style="top: 20%; font-size: 12px; color: #804208"
                    >
                      <span class="font-mali-b">{{ `${rankingCurrentData.name} ` }}</span>
                    </div>

                    <div
                      class="absolute-bottom-left row"
                      style="bottom: 20%; width: 100%; margin: 2% 0%"
                    >
                      <div
                        class="col-1 relative-position self-center"
                        style="width: 15%; height: fit-content; margin: 0% 3%"
                      >
                        <q-img
                          class="absolute-center"
                          src="/images/piggy_coin_main/piggy-coin-finish-icon-trophy.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                      <div class="self-end" style="font-size: 16px; margin: 0% 3%">
                        <div class="text-star font-mali-b">
                          {{ `${rankingCurrentData.score}` }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-1 self-center relative-position"
                    align="center"
                    style="width: 25%"
                  >
                    <q-img
                      class="absolute-center"
                      width="60%"
                      style="margin-top: 5%; left: 48%"
                      :src="`/images/icon_main/icon-ranking-number-${rankingCurrentData.ranking}.png`"
                      v-if="rankingCurrentData.ranking <= 3"
                      no-spinner
                      no-transition
                    ></q-img>

                    <q-img
                      width="50%"
                      src="/images/minigame_main/box-number-ranking.webp"
                      no-spinner
                      no-transition
                      v-else
                    >
                      <div class="transparent absolute-center">
                        <div style="font-size: 16px; line-height: 0">
                          <span>
                            {{ rankingCurrentData.ranking }}
                          </span>
                        </div>
                      </div>
                    </q-img>
                  </div>
                </div>

                <div class="col-12" style="height: 3%">
                </div>
              </div>
            </div>
          </q-img>

          <div class="absolute-center" style="width: 307px; top: -30px">
            <q-img
              src="/images/minigame_main/header-top-ranking.webp"
              no-spinner=""
              no-transition=""
            ></q-img>
          </div>

          <div
            class="absolute-top-right"
            style="width: 16%; top: -14%; right: -6%"
            align="center"
          >
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner=""
              no-transition=""
              class="cursor-pointer"
              v-close-popup
            >
            </q-img>
          </div>

          <div class="absolute-center" style="top:98.4%;width:97px;">
            <q-img src="/images/minigame_main/icon-base-ranking.webp" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog no ticket -->
  <q-dialog v-model="isShowDialogNoTicket" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="absolute-center" style="width: 300px">
          <q-img src="/images/piggy_coin_main/piggy-coin-dialog-no-ticket.png">
            <div class="fit row transparent">
              <div
                class="col-12 row justify-center items-center box-content-no-ticket"
                style="height: 75%"
              >
                <div class="col-12 self-center" align="center">
                  <div class="relative-position width-fit" align="center">
                    <q-img
                      width="100px"
                      src="/images/icon_main/icon-mini-game-ticket.png"
                    ></q-img>
                    <div
                      class="absolute-bottom-right font-fredoka text-no-ticket"
                      style="bottom: -20px; right: -20px"
                    >
                      {{ `x0` }}
                    </div>
                  </div>
                  <div class="font-mali-b q-mt-lg" style="color: #4a261b" align="center">
                    <div class="f20">ตั๋วไม่พอ</div>
                    <div class="f16">ทำแบบฝึกหัดเพื่อเก็บตั๋ว</div>
                  </div>
                </div>
              </div>
              <div class="col-12 self-end row" style="height: 20%">
                <div class="col-1 width-fit">
                  <q-img
                    width="80px"
                    src="/images/piggy_coin_main/piggy-coin-button-close-no-ticket.png"
                    v-close-popup
                    @click="isOnClickStartButton = false"
                    class="cursor-pointer button-active"
                  ></q-img>
                </div>
                <div class="col" align="right">
                  <q-img
                    width="180px"
                    src="/images/piggy_coin_main/piggy-coin-button-go-to-practice.png"
                    @click="funcOnClickButton('goToPractice')"
                    class="cursor-pointer button-active"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialoig Share -->
  <q-dialog v-model="isShowDialogShare" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center"> </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Setting -->
  <dialog-setting
    v-if="isShowDialogSetting"
    @callback-closeDialog="isShowDialogSetting = false"
    @callback-outOfMiniGame="funcOutOfPiggyCoin()"
    :isStartMiniGame="isStartGame"
  ></dialog-setting>
  <!-- #endregion -->

  <!-- #region Loading -->
  <dialog-loading v-if="isShowLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script setup>
// Character
import characterHeader from "src/components/character_main/character-header-icon.vue";
import backgroundMain from "src/components/piggy_coin_main/background-main.vue";
import dialogSetting from "src/components/dialog_main/setting-dialog.vue";
import dialogLoading from "src/components/dialog-loading.vue";
import dialogCharacter from "src/components/dialog_main/dialog-character.vue";

import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "vue";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useRoute, useRouter } from "vue-router";
import { useMiniGameStore } from "src/stores/minigame";
import { useQuasar } from "quasar";

const components = defineComponent({
  characterHeader,
  backgroundMain,
  dialogSetting,
  dialogLoading,
  dialogCharacter,
});

// #region Initialize

// Route And Router
const router = useRouter();
const route = useRoute();

// Store
const studentStore = useStudentStore();
const systemStore = useSystemStore();

// Quasar
const $q = useQuasar();

const positionX = ref(0);
const positionY = ref(0);
const getPosition = (event) => {
  positionX.value = (event.offsetX / 400) * 100;
  positionY.value = (event.offsetY / 400) * 100;
};

const showTooltipIndex = ref(null);

// Data
const isMobile = ref($q.platform.is.mobile);
const isDesktop = ref($q.platform.is.desktop);
const howToPlayNumberCard = ref(1);
const practiceData = reactive({
  score: 0,
  time: 10,
  coin: 0,
  totalCoin: 0,
  totalPig: 0,
  redPig: 0,
  bluePig: 0,
  goldPig: 0,
  isSendAnswer: false,
});

// - Boolearn
const isStartGame = ref(false);
const isShowDialogHowToPlay = ref(false);
const isShowDialogRanking = ref(false);
const isShowDialogSetting = ref(false);
const isShowDialogShare = ref(false);
const isShowLoading = ref(false);

// On Active Button
const isOnClickStartButton = ref(false);
const isShowUseTicket = ref(false);
const funcOnClickButton = async (type) => {
  isOnClickStartButton.value = false;
  isShowDialogHowToPlay.value = false;
  isShowDialogRanking.value = false;
  isShowDialogSetting.value = false;

  isShowUseTicket.value = false;

  if (type == "start") {
    isOnClickStartButton.value = true;
    await funcStartGame();
  } else if (type == "restart") {
    isOnClickStartButton.value = true;
    await funcStartGame();
  } else if (type == "menu") {
    isShowDialogGameOver.value = false;
    isStartGame.value = false;
  } else if (type == "share") {
  } else if (type == "howToPlay") {
    isShowDialogHowToPlay.value = true;
    howToPlayNumberCard.value = 1;
  } else if (type == "ranking") {
    await funcGetPiggyCoinRanking();
  } else if (type == "setting") {
    isShowDialogSetting.value = true;
  } else if (type == "goToPractice") {
    router.replace("/practice/list");
  }
};

// #endregion

// #region ***** Function *****

// #region Start Game
const isShowDialogNoTicket = ref(false);
let fakeAnswerList = [];
let questionList = [];
let flashcardNotLearning = [];
const funcStartGame = async () => {
  const studentStore = useStudentStore();
  const miniGameStore = useMiniGameStore();

  try {
    if (studentStore.studentData.gameTicket <= 0) {
      setTimeout(() => {
        isShowDialogNoTicket.value = true;
        isShowLoading.value = false;
      }, 500);
      return;
    }

    isShowLoading.value = true;

    let response = await miniGameStore.useTicketMiniGame();

    if (response.message == "Success") {
      if (timerInterval) {
        clearInterval(timerInterval);
      }

      isShowUseTicket.value = true;

      studentStore.getStudentData();

      // Time
      colorTime.value = "green";
      progressTime.value = 100;
      isStartAnimation.value = false;
      isShowAnimationAlarm.value = false;
      runSummaryScore.value = 0;

      practiceData.score = 0;
      practiceData.coin = 0;
      practiceData.totalCoin = 0;
      practiceData.totalPig = 0;
      practiceData.redPig = 0;
      practiceData.bluePig = 0;
      practiceData.goldPig = 0;

      totalPig = 0;
      questionList = [];
      fakeAnswerList = [];

      isShowAnimationAddPiggy.value = false;
      isRunAnimationSummaryCoin.value = false;
      isStopRunSummaryScore.value = false;

      piggyList.value = [];

      let tempQuestion = await miniGameStore.getPiggyCoinQuestion();

      if (tempQuestion.message == "Success") {
        flashcardNotLearning = tempQuestion.notLearnFlashcardList;

        fakeAnswerList = tempQuestion.data;

        let tempPracticeLog = await funcSetFlashcardData(tempQuestion.data);

        questionList = funcShuffle(tempPracticeLog);

        practiceData.question = questionList[0].question;
        practiceData.answers = questionList[0].answers;
        practiceData.correctAnswer = questionList[0].correctAnswer;

        practiceData.isSendAnswer = false;

        isStartGame.value = true;
        practiceData.time = 10;
        isShowDialogGameOver.value = false;

        setTimeout(() => {
          funcShowTime();
          isShowLoading.value = false;
          isShowUseTicket.value = false;
          isOnClickStartButton.value = false;
        }, 500);

        return;
      } else {
        isShowLoading.value = false;
        isShowUseTicket.value = false;
        isOnClickStartButton.value = false;
        throw new Error(
          `Error : Get Piggy Coin Question <br> Description : ${tempQuestion.description}`
        );
      }
    } else {
      isShowLoading.value = false;
      isShowUseTicket.value = false;
      isOnClickStartButton.value = false;
      isShowDialogNoTicket.value = true;
      throw new Error(
        `Error : Use Ticket Mini Game <br> Description : ${response.message}`
      );
    }
  } catch (e) {
    isShowLoading.value = false;
    isShowUseTicket.value = false;
    isOnClickStartButton.value = false;
    // $q.notify({
    //   color: "negative",
    //   message: `${e.message}`,
    //   position: "top",
    //   timeout: 2000,
    //   html: true,
    // });
    return e;
  }
};
// #endregion

// #region Show Time
let timePassed = 0;
let timeLeft = practiceData.time;
let timerInterval = null;
const progressTime = ref(100);
const colorTime = ref("green");
const isShowAnimationAlarm = ref(false);
const isStartAnimation = ref(false);
const isShowDialogGameOver = ref(false);
const funcShowTime = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timeLeft = practiceData.time;
  timePassed = 0;
  isStartAnimation.value = false;
  isShowAnimationAlarm.value = false;
  colorTime.value = "green";

  // if (timeLeft <= 0) {
  //   isShowLoading.value = true;
  //   practiceData.isSendAnswer = true;
  //   isStartAnimation.value = false;
  //   colorTime.value = "";
  //   funcGameOver();
  //   return;
  // }

  if (practiceData.score != 0) {
    if (practiceData.time <= 1.5) {
      if (practiceData.score > 50) {
        practiceData.time = 0.7;
      } else {
        practiceData.time = 1;
      }
    } else {
      practiceData.time = Number(
        practiceData.time - (10 / 100) * practiceData.time.toFixed(0)
      );
    }
  }

  let setIntervalTime = 1000;
  if (practiceData.time == 0.7) {
    setIntervalTime = practiceData.time * 1000;
  }

  practiceData.isSendAnswer = false;

  timerInterval = setInterval(() => {
    if (timeLeft <= 0) {
      isShowLoading.value = true;
      clearInterval(timerInterval);
      practiceData.isSendAnswer = false;
      isStartAnimation.value = false;
      colorTime.value = "";
      isShowDialogSetting.value = false;
      funcGameOver();
      return;
    } else {
      isStartAnimation.value = true;
      timePassed = timePassed += 1;
      timeLeft = practiceData.time - timePassed;

      let time = timeLeft % 60;

      time = (time / practiceData.time) * 100;

      if (time <= 5) {
        isShowAnimationAlarm.value = true;
      } else if (time <= 40) {
        colorTime.value = "red";
      } else if (time <= 70) {
        colorTime.value = "orange";
      } else {
        isShowAnimationAlarm.value = false;
        colorTime.value = "green";
      }
    }
  }, setIntervalTime);
};
// #endregion

// #region Add Piggy
const piggyList = ref([]);
const isShowAnimationAddPiggy = ref(false);
const funcAddPiggy = () => {
  isShowAnimationAddPiggy.value = false;

  let newData = {
    top: 0,
    left: 0,
    isMove: false,
    LR: "left",
    movePositionTop: 0,
    movePositionLeft: 0,
    style: "top:0%;left:0%;",
    type: "purple",
  };

  let randomPositionTop = Math.floor(Math.random() * 84) + 1;
  let randomPositionLeft = Math.floor(Math.random() * 84) + 1;

  let randomHorizontal = Math.floor(Math.random() * 9) + 1;

  if (randomHorizontal % 2 == 0) {
    newData.LR = "0";
  } else {
    newData.LR = "180";
  }

  if (
    (randomPositionTop >= 30 &&
      randomPositionTop <= 80 &&
      randomPositionLeft >= 70 &&
      randomPositionLeft <= 100) ||
    (randomPositionTop >= 50 &&
      randomPositionTop <= 100 &&
      randomPositionLeft >= 25 &&
      randomPositionLeft <= 70)
  ) {
    funcAddPiggy();
    return;
    // return newData;
  }

  newData.top = randomPositionTop;
  newData.left = randomPositionLeft;

  newData.style = `top: ${newData.top}%; left: ${newData.left}%;`;

  let findPinkPig = piggyList.value.filter((x) => x.type == "purple");

  let findBluePig = piggyList.value.filter((x) => x.type == "green");

  if (findPinkPig.length == 2) {
    newData.type = "green";
    let removeRedPig = piggyList.value.filter((x) => x.type != "purple");
    piggyList.value = removeRedPig;
  }

  if (findBluePig.length == 3) {
    newData.type = "white";

    let removeBluePig = piggyList.value.filter((x) => x.type != "green");
    piggyList.value = removeBluePig;
  }

  setTimeout(() => {
    isShowAnimationAddPiggy.value = true;
    piggyList.value.push(newData);
  }, 100);
};
// #endregion

// #region Set Flashcard Data
let totalPig = 0;
const funcSetFlashcardData = async (array) => {
  let tempPracticeLog = [];
  let tempFlashcardData = [];

  if (array.length) {
    tempFlashcardData = array.slice();

    tempFlashcardData = funcShuffle(tempFlashcardData);

    tempFlashcardData.forEach((res, index) => {
      let randomQuestionIndex = Math.floor(Math.random() * 8);

      // คู่ = ภาษาอังกฤษ , คี่ = ภาษาไทย
      let newQuestion = {
        question: randomQuestionIndex % 2 == 0 ? res.vocab : res.meaning,
        correctAnswer: randomQuestionIndex % 2 == 0 ? res.meaning : res.vocab,
      };

      let fakeAnswer = fakeAnswerList.filter((x) =>
        randomQuestionIndex % 2 == 0 ? res.vocab != x.vocab : res.meaning != x.meaning
      );

      fakeAnswer = funcShuffle(fakeAnswer);

      let newAnswer = [
        {
          answer: randomQuestionIndex % 2 == 0 ? res.meaning : res.vocab,
        },
      ];

      newAnswer.push({
        answer:
          randomQuestionIndex % 2 == 0 ? fakeAnswer[0].meaning : fakeAnswer[0].vocab,
      });

      newAnswer = funcShuffle(newAnswer);

      let newData = {
        ...newQuestion,
        answers: newAnswer,
        count: res.count || 0,
        index: index,
        isLearn: res.isLearn,
        vocab: res.vocab,
        meaning: res.meaning,
      };

      tempPracticeLog.push(newData);
    });
  }

  return tempPracticeLog;
};
// #endregion

// #region Check Answer
const funcCheckAnswer = (index) => {
  practiceData.isSendAnswer = true;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  if (practiceData.correctAnswer == practiceData.answers[index].answer) {
    // console.log("Correct");
    // ตอบถูก
    funcNextQuestion();
  } else {
    // console.log("Incorrect");
    // ตอบผิด
    // practiceData.isSendAnswer = false;
    funcGameOver();
  }
};
// #endregion

// #region Next Question
const showPiggyTypeColor = ref("");
const funcNextQuestion = async () => {
  const systemStore = useSystemStore();

  practiceData.score++;
  questionList[0].count++;

  if (practiceData.score != 0) {
    if (practiceData.score % 40 == 0) {
      practiceData.goldPig++;
      showPiggyTypeColor.value = "white";
      systemStore.playEffectPig();
      funcAddPiggy();
    } else if (practiceData.score % 12 == 0) {
      practiceData.bluePig++;
      showPiggyTypeColor.value = "green";
      systemStore.playEffectPig();
      funcAddPiggy();
    } else if (practiceData.score % 4 == 0) {
      practiceData.redPig++;
      showPiggyTypeColor.value = "purple";
      systemStore.playEffectPig();
      funcAddPiggy();
    } else {
      systemStore.playEffectCorrect();
    }
  }

  totalPig = practiceData.redPig + practiceData.bluePig + practiceData.goldPig;

  practiceData.totalPig = totalPig;

  if (questionList[0].count >= 2) {
    let findDeleteQuestion = questionList.splice(0, 1);

    fakeAnswerList.push(...findDeleteQuestion);
  } else {
    let fincCurrentQuestion = questionList.splice(0, 1);

    fincCurrentQuestion = await funcSetFlashcardData(fincCurrentQuestion);

    let findQuestionAllSendAnswer = questionList.every((x) => x.count == 1);

    if (findQuestionAllSendAnswer) {
      questionList = await funcSetFlashcardData(questionList);
    }

    questionList.push(...fincCurrentQuestion);

    fakeAnswerList.push(...fincCurrentQuestion);
  }

  let findIsNotLearning = questionList.every((x) => !x.isLearn);

  let tempPracticeLog = [];

  if (flashcardNotLearning.length) {
    tempPracticeLog = await funcSetFlashcardData(flashcardNotLearning);

    if (!findIsNotLearning) {
      if (practiceData.score % 20 == 0) {
        questionList = await funcSetFlashcardData(questionList);

        questionList.unshift(tempPracticeLog[0]);

        let findFakeAnswer = tempPracticeLog.splice(0, 1);

        fakeAnswerList.push(...findFakeAnswer);
      }
    }

    flashcardNotLearning = tempPracticeLog;
  } else {
    tempPracticeLog = questionList;
  }

  if (questionList.length == 0) {
    if (tempPracticeLog.length == 0) {
      funcGameOver();
      return;
    }

    questionList.push(...tempPracticeLog);

    tempPracticeLog.splice(0, questionList.length);
  }

  practiceData.question = questionList[0].question;
  practiceData.answers = questionList[0].answers;
  practiceData.correctAnswer = questionList[0].correctAnswer;

  funcShowTime();
};
// #endregion

// #region Shuffle
const funcShuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  for (let i = 0; i < array.length; i++) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
// #endregion

// #region Game Over
const rankingFinishData = ref([]);
const dailyCoin = ref(0);
const isFirstTime = ref(true);
const funcGameOver = async () => {
  const systemStore = useSystemStore();
  const miniGameStore = useMiniGameStore();

  isStartAnimation.value = false;

  colorTime.value = "#fff";

  isShowLoading.value = true;

  practiceData.totalCoin += practiceData.redPig;
  practiceData.totalCoin += practiceData.bluePig * 5;
  practiceData.totalCoin += practiceData.goldPig * 10;

  try {
    let response = await miniGameStore.savePiggyCoinScore(practiceData);

    if (response.message == "Success") {
      dailyCoin.value = response.dailyCoin || 0;

      try {
        response = await miniGameStore.getRankingInSummaryPage();

        if (response.message == "Success") {
          rankingFinishData.value = response;

          systemStore.playEffectPass();

          isShowDialogGameOver.value = true;

          funcRunSummaryScore();
          funcRunSummaryCoin();

          isShowLoading.value = false;
        } else {
          isShowLoading.value = false;
          throw new Error(
            `Get Ranking In Summary Page <br> Description: ${response.description}`
          );
        }
      } catch (e) {
        isShowLoading.value = false;
        isShowDialogGameOver.value = false;
        // $q.notify({
        //   color: "negative",
        //   message: e,
        //   position: "top",
        //   timeout: 2000,
        //   html: true,
        // });
      }
    } else {
      isShowLoading.value = false;
      throw new Error(`Save Piggy Coin Score <br> Description: ${response.description}`);
    }
  } catch (e) {
    isShowLoading.value = false;
    isShowDialogGameOver.value = true;
    // $q.notify({
    //   color: "negative",
    //   message: e,
    //   position: "top",
    //   timeout: 2000,
    //   html: true,
    // });
  }
};
// #endregion

// #region Run Summary Score
const runSummaryScore = ref(0);
const isStopRunSummaryScore = ref(false);
const funcRunSummaryScore = () => {
  let tempScore = Number(practiceData.score);

  runSummaryScore.value = 0;

  if (tempScore == 0) {
    return;
  }

  setTimeout(() => {
    let listenRunScore = setInterval(() => {
      if (runSummaryScore.value >= Number(tempScore)) {
        if (listenRunScore) {
          clearInterval(listenRunScore);
        }

        runSummaryScore.value = Number(tempScore);

        setTimeout(() => {
          isRunAnimationSummaryCoin.value = true;
        }, 500);
        setTimeout(() => {
          isStopRunSummaryScore.value = true;
        }, 1700);
      } else {
        if (runSummaryScore.value > 99) {
          runSummaryScore.value += 5;
        } else if (runSummaryScore.value > 9) {
          runSummaryScore.value += 2;
        } else {
          runSummaryScore.value++;
        }
      }
    }, 10);
  }, 1000);
};
// #endregion

// #region Run Summary Coin
const runSummaryCoin = ref(0);
const isRunAnimationSummaryCoin = ref(false);
const funcRunSummaryCoin = () => {
  let tempCoin = Number(dailyCoin.value);

  if (tempCoin >= 300) {
    runSummaryCoin.value = 300;
    return;
  }

  runSummaryCoin.value = Number(dailyCoin.value) - Number(practiceData.totalCoin);

  let listenRunCoin = setInterval(() => {
    if (isStopRunSummaryScore.value) {
      if (runSummaryCoin.value >= Number(tempCoin) || tempCoin >= 300) {
        if (listenRunCoin) {
          clearInterval(listenRunCoin);
        }

        if (runSummaryCoin.value >= 300) {
          runSummaryCoin.value = 300;
        } else {
          runSummaryCoin.value = Number(tempCoin);
        }
      } else {
        if (runSummaryCoin.value > 9) {
          runSummaryCoin.value += 2;
        } else {
          runSummaryCoin.value++;
        }
      }
    }
  }, 10);
};
// #endregion

// #region Get Piggy Coin Ranking
const tempRankingDataList = ref([]);
const rankingSelected = ref("school");
const funcGetPiggyCoinRanking = async () => {
  const miniGameStore = useMiniGameStore();

  isShowLoading.value = true;

  try {
    const response = await miniGameStore.getPiggyCoinRanking();

    if (response.message != "success") {
      throw new Error(`error`);
    }

    tempRankingDataList.value = response.data;

    isShowLoading.value = false;
    isShowDialogRanking.value = true;
  } catch (e) {
    isShowLoading.value = false;
    isShowDialogRanking.value = false;
    $q.notify({
      message: "error get ranking",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
};
// #endregion

// #region Keydown Event
const funcKeyDown = (event) => {
  if (!isStartGame.value || isShowDialogGameOver.value || isShowLoading.value) return;

  if (event.key == "ArrowLeft" || event.keyCode == "37") {
    let element = document.getElementById("answer-left");

    if (element) {
      element.click();
      element.classList.add("active");

      let listenClass = setTimeout(() => {
        clearTimeout(listenClass);
        element.classList.remove("active");
      }, 100);
    }
  }

  if (event.key == "ArrowRight" || event.keyCode == "39") {
    let element = document.getElementById("answer-right");

    if (element) {
      element.click();
      element.classList.add("active");

      let listenClass = setTimeout(() => {
        clearTimeout(listenClass);
        element.classList.remove("active");
      }, 100);
    }
  }
};
// #endregion

// #region Out Of Piggycion
const funcOutOfPiggyCoin = () => {
  isShowLoading.value = true;

  if (timerInterval) {
    clearInterval(timerInterval);
  }

  if (isStartGame.value) {
    funcGameOver();
    isShowDialogSetting.value = false;
  } else {
    router.replace("/lobby");
  }
};
// #endregion

// #endregion

// #region ***** Computed *****

// #region ranking Data List
const rankingDataList = computed(() => {
  let temp = [];

  if (isShowDialogGameOver.value) {
    temp = rankingFinishData.value.rankingList;
  } else {
    if (rankingSelected.value == "school") {
      temp = tempRankingDataList.value.schoolRanking.rankingList;
    } else {
      temp = tempRankingDataList.value.globalRanking.rankingList;
    }
  }

  if (temp.length) {
    temp.forEach((res, index) => {
      res.character = res.characterInfo;
      res.isHasCharacter = true;
    });
  }

  return temp;
});
// #endregion

// #region ranking Current Data
const rankingCurrentData = computed(() => {
  const studentStore = useStudentStore();

  let tempData = {
    name: studentStore.characterName,
    score: 0,
    ranking: 0,
  };

  if (isShowDialogGameOver.value) {
    tempData.ranking = rankingFinishData.value.currentGlobalPosition;

    tempData.score = rankingFinishData.value.highestScore;
  } else {
    if (rankingSelected.value == "school") {
      tempData.ranking = tempRankingDataList.value.schoolRanking.schoolPosition || "-";
    } else {
      tempData.ranking = tempRankingDataList.value.globalRanking.globalPosition || "-";
    }

    tempData.score = tempRankingDataList.value.highestScore;
  }

  return tempData;
});
// #endregion

// #endregion

onMounted(async () => {
  const systemStore = useSystemStore();
  const miniGameStore = useMiniGameStore();
  const studentStore = useStudentStore();

  if (
    !miniGameStore.get.miniGameDetail ||
    !miniGameStore.get.miniGameDetail.isUnlock ||
    studentStore.studentType == "demo"
  ) {
    isShowLoading.value = true;
    setTimeout(() => {
      isShowLoading.value = false;
      router.replace("/lobby");
      return;
    }, 1000);
  }

  if (studentStore.studentType == "online") {
    rankingSelected.value = "global";
  }

  window.addEventListener("keydown", funcKeyDown);

  systemStore.setRouter("piggy-coin");
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", funcKeyDown);
});
</script>

<style lang="scss" scoped>
.backdrop-main {
  background-image: url("/images/background_main/backdrop-alien-quest.webp");
  background-size: contain;
  font-size: 16px;
}

.background-main {
  max-width: 1600px;
  width:calc(100vh * 16 / 9);
  min-width:1000px;
  overflow: hidden;
  container-type: inline-size;

  &.mobile{
    max-width: 100%;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    margin: auto;

    &.home{
      background-image: url("/images/background_main/background-alien-quest.webp");
      background-size: cover;
      background-repeat: no-repeat;
    }

    &.game{
      background-image: url("/images/background_main/background-alien-quest-start.webp");
      background-size: 1600px;
      background-repeat: no-repeat;
      background-position: 27.5% 0%;
    }
  }
}

.text-number-of-ticket {
  left:60%;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  color: #fff;
  font-size: clamp(15px,1.5cqw,24px);
  line-height: 1;

  &.mobile{
    font-size:24px;
  }
}

.text-use-ticket{
  color: #fff;
  font-size:clamp(30px,3cqw,48px);
  text-shadow: rgb(1, 77, 164) 2px 0px 0px, rgb(1, 77, 164) 1.75517px 0.958851px 0px, rgb(1, 77, 164) 1.0806px 1.68294px 0px, rgb(1, 77, 164) 0.141474px 1.99499px 0px, rgb(1, 77, 164) -0.832294px 1.81859px 0px, rgb(1, 77, 164) -1.60229px 1.19694px 0px, rgb(1, 77, 164) -1.97998px 0.28224px 0px, rgb(1, 77, 164) -1.87291px -0.701566px 0px, rgb(1, 77, 164) -1.30729px -1.5136px 0px, rgb(1, 77, 164) -0.421592px -1.95506px 0px, rgb(1, 77, 164) 0.567324px -1.91785px 0px, rgb(1, 77, 164) 1.41734px -1.41108px 0px, rgb(1, 77, 164) 1.92034px -0.558831px 0px;

  &.mobile{
    font-size:24px;
  }
}

.button-start {
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 55px;
    transform: scale(1.1);
    transition: 0.5s;
  }

  &:active {
    transform: scale(0.9);
    transition: 0.2s;
  }
}

.animation-use-ticket {
  animation: useTicket 1s forwards 0.1s;
  right: -20%;
  opacity: 0;
}

@keyframes useTicket {
  100% {
    top: -60%;
    opacity: 1;
  }
}

.animation-use-ticket-finish {
  animation: useTicketFinish 1s forwards 0.1s;
  right: -20%;
  opacity: 0;
}

@keyframes useTicketFinish {
  100% {
    top: -55%;
    opacity: 1;
  }
}

.button {
  transition: transform 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    transform: scale(1.1);
    transition: 0.5s;
  }

  &:active {
    transform: scale(0.9);
    transition: 0.2s;
  }
}

.text-stroke-2 {
  color: #fff;
  text-shadow: rgb(81, 42, 8) 2px 0px 0px, rgb(81, 42, 8) 1.75517px 0.958851px 0px,
    rgb(81, 42, 8) 1.0806px 1.68294px 0px, rgb(81, 42, 8) 0.141474px 1.99499px 0px,
    rgb(81, 42, 8) -0.832294px 1.81859px 0px, rgb(81, 42, 8) -1.60229px 1.19694px 0px,
    rgb(81, 42, 8) -1.97998px 0.28224px 0px, rgb(81, 42, 8) -1.87291px -0.701566px 0px,
    rgb(81, 42, 8) -1.30729px -1.5136px 0px, rgb(81, 42, 8) -0.421592px -1.95506px 0px,
    rgb(81, 42, 8) 0.567324px -1.91785px 0px, rgb(81, 42, 8) 1.41734px -1.41108px 0px,
    rgb(81, 42, 8) 1.92034px -0.558831px 0px;
}

// #region Ranking
.box-ranking-scroller {
  width: 92%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 2%;
  scrollbar-width: none;
  background-image: url("/images/minigame_main/backdrop-ranking.webp");
  // background-color: #ffdfa4;
  background-blend-mode: soft-light;
  background-size: cover;
  border-radius: 15px 15px 0px 0px;
}

.box-ranking-scroller::-webkit-scrollbar {
  display: none;
}

.box-current-student-ranking {
  width: 92%;
  background-color: #D4F3FF;
  border-radius: 0px 0px 20px 20px;
  box-shadow: 0px -3px 3px 1px rgba(0, 0, 0, 0.1);
  padding: 0% 2%;
}

.text-number-ranking {
  width: 30px;
  height: 30px;
  background-color: #ffa016;
  color: #fff3bf;
  border-radius: 50%;
}

.text-name {
  color: #804208;
}

.text-cup {
  color: #ffa016;
}

.text-ranking-score {
  color: #ffa800;
  text-shadow: rgb(128, 66, 8) 1px 0px 0px, rgb(128, 66, 8) 0.540302px 0.841471px 0px,
    rgb(128, 66, 8) -0.416147px 0.909297px 0px, rgb(128, 66, 8) -0.989992px 0.14112px 0px,
    rgb(128, 66, 8) -0.653644px -0.756802px 0px,
    rgb(128, 66, 8) 0.283662px -0.958924px 0px, rgb(128, 66, 8) 0.96017px -0.279415px 0px;
}

.text-name-overflow {
  color: #804208;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Box Character

.box-ranking-header-character-back-drop {
  left: 36px;
  width: 77px;
  height: 77px;
  overflow: hidden;
  border-radius: 50%;
  border: 3px solid#804208;
  border-right-color: transparent;
  z-index: 1;
}

.icon-header-character-all {
  top: 100%;
}

.box-character-name {
  border: 3px solid #804208;
  width: 80%;
  height: 80%;
  border-radius: 20px;
  background-color: #ffdfa4;
  margin: auto;
}

.box-show-ranking-user {
  background-color: #faeba9;
  box-shadow: -3px 0px 10px 1px rgba(55, 55, 55, 0.3);
}

.box-show-character {
  width: 65px;
  height: 65px;
  background-color: #ffffff;
  overflow: hidden;
  border-radius: 50%;
}

.icon-header-character {
  width: 150px;
  top: -7px;
  left: 50%;
  transform: translateX(-50%);
}

.text-star {
  color: #fff;
  text-shadow: rgb(1, 77, 164) 1px 0px 0px, rgb(1, 77, 164) 0.540302px 0.841471px 0px, rgb(1, 77, 164) -0.416147px 0.909297px 0px, rgb(1, 77, 164) -0.989992px 0.14112px 0px, rgb(1, 77, 164) -0.653644px -0.756802px 0px, rgb(1, 77, 164) 0.283662px -0.958924px 0px, rgb(1, 77, 164) 0.96017px -0.279415px 0px;
}

.box-ranking-number {
  width: 60px;
}
// #endregion

// #region Start Piggy coin

.box-progress-time-main {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
  border: 0.7mm solid #4a261b;
}

.box-progress-time-main.mobile {
  border: 1px solid #4a261b;
}

.box-progress-time-main .progress-time {
  height: 100%;
  border-radius: 15px;
  padding: 2.5%;
}

.box-progress-time-main .progress-time.green {
  background-color: #1fd7ff;
}

.box-progress-time-main .progress-time.orange {
  background-color: #ec8e00;
  transition: 1s;
}

.box-progress-time-main .progress-time.red {
  background-color: #cd2500;
  transition: 1s;
}

.animation-alarm {
  animation: alarmAnimtion 0.1s infinite alternate-reverse;
}

@keyframes alarmAnimtion {
  0% {
    transform: rotate(3deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}

.animation-bar {
  animation-name: colorBar;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  width: 100%;
}

@keyframes colorBar {
  0% {
    width: 100%;
  }
  100% {
    width: 0%;
  }
}

.stop-animation-bar {
  animation-play-state: paused;
}

.animation-pig {
  animation: pigAnimtion 5s infinite;
}

@keyframes pigAnimtion {
  0% {
    transform: translateY(0px);
  }
  70% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

.animation-shadow {
  animation: shadowAnimtion 5s infinite;
  transform-origin: bottom;
}

@keyframes shadowAnimtion {
  0% {
    transform: scale(1);
  }
  70% {
    transform: scale(1);
  }
  80% {
    transform: scale(0.7);
  }
  100% {
    transform: scale(1);
  }
}

.animation-add-piggy {
  animation: addPiggyAnimtion 2s forwards;
}

@keyframes addPiggyAnimtion {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  5% {
    transform: translateX(100%);
    opacity: 1;
  }
  25% {
    transform: translateX(0%);
    opacity: 1;
  }
  90% {
    transform: translateX(0%);
    opacity: 1;
  }
  100% {
    transform: translateX(0%);
    opacity: 0;
  }
}

.text-question {
  text-shadow: rgb(106, 70, 26) 2px 0px 0px, rgb(106, 70, 26) 1.75517px 0.958851px 0px,
    rgb(106, 70, 26) 1.0806px 1.68294px 0px, rgb(106, 70, 26) 0.141474px 1.99499px 0px,
    rgb(106, 70, 26) -0.832294px 1.81859px 0px, rgb(106, 70, 26) -1.60229px 1.19694px 0px,
    rgb(106, 70, 26) -1.97998px 0.28224px 0px, rgb(106, 70, 26) -1.87291px -0.701566px 0px,
    rgb(106, 70, 26) -1.30729px -1.5136px 0px, rgb(106, 70, 26) -0.421592px -1.95506px 0px,
    rgb(106, 70, 26) 0.567324px -1.91785px 0px, rgb(106, 70, 26) 1.41734px -1.41108px 0px,
    rgb(106, 70, 26) 1.92034px -0.558831px 0px;
  color: #fff;
  padding-bottom: 1%;

  &.mobile{
    color:#fff;
    font-size:24px;
    text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
    line-height:normal;
    padding-bottom:0px;
  }
}
.text-choice {
  color:#fff;
  font-size: clamp(15px,1.5cqw,24px);
  padding-bottom: 0.3%;
  text-shadow: rgb(1, 77, 164) 2px 0px 0px, rgb(1, 77, 164) 1.75517px 0.958851px 0px, rgb(1, 77, 164) 1.0806px 1.68294px 0px, rgb(1, 77, 164) 0.141474px 1.99499px 0px, rgb(1, 77, 164) -0.832294px 1.81859px 0px, rgb(1, 77, 164) -1.60229px 1.19694px 0px, rgb(1, 77, 164) -1.97998px 0.28224px 0px, rgb(1, 77, 164) -1.87291px -0.701566px 0px, rgb(1, 77, 164) -1.30729px -1.5136px 0px, rgb(1, 77, 164) -0.421592px -1.95506px 0px, rgb(1, 77, 164) 0.567324px -1.91785px 0px, rgb(1, 77, 164) 1.41734px -1.41108px 0px, rgb(1, 77, 164) 1.92034px -0.558831px 0px;

  &.mobile{
    font-size:16px;
    line-height:normal;
    padding-bottom:0px;
  }
}

.text-total-score {
  text-shadow: rgb(1, 77, 164) 2px 0px 0px, rgb(1, 77, 164) 1.75517px 0.958851px 0px, rgb(1, 77, 164) 1.0806px 1.68294px 0px, rgb(1, 77, 164) 0.141474px 1.99499px 0px, rgb(1, 77, 164) -0.832294px 1.81859px 0px, rgb(1, 77, 164) -1.60229px 1.19694px 0px, rgb(1, 77, 164) -1.97998px 0.28224px 0px, rgb(1, 77, 164) -1.87291px -0.701566px 0px, rgb(1, 77, 164) -1.30729px -1.5136px 0px, rgb(1, 77, 164) -0.421592px -1.95506px 0px, rgb(1, 77, 164) 0.567324px -1.91785px 0px, rgb(1, 77, 164) 1.41734px -1.41108px 0px, rgb(1, 77, 164) 1.92034px -0.558831px 0px;
  color: #fff;
  font-size: clamp(13.75px,1.375cqw,22px);
  line-height:0;
  margin-top:clamp(-3px,-0.1875cqw,-1.875px);

   &.mobile{
    font-size:12px;
    text-shadow: rgb(1, 77, 164) 1px 0px 0px, rgb(1, 77, 164) 0.540302px 0.841471px 0px, rgb(1, 77, 164) -0.416147px 0.909297px 0px, rgb(1, 77, 164) -0.989992px 0.14112px 0px, rgb(1, 77, 164) -0.653644px -0.756802px 0px, rgb(1, 77, 164) 0.283662px -0.958924px 0px, rgb(1, 77, 164) 0.96017px -0.279415px 0px;
  }
}

.text-total-pig{
  width:45%;
  text-shadow: rgb(1, 77, 164) 2px 0px 0px, rgb(1, 77, 164) 1.75517px 0.958851px 0px, rgb(1, 77, 164) 1.0806px 1.68294px 0px, rgb(1, 77, 164) 0.141474px 1.99499px 0px, rgb(1, 77, 164) -0.832294px 1.81859px 0px, rgb(1, 77, 164) -1.60229px 1.19694px 0px, rgb(1, 77, 164) -1.97998px 0.28224px 0px, rgb(1, 77, 164) -1.87291px -0.701566px 0px, rgb(1, 77, 164) -1.30729px -1.5136px 0px, rgb(1, 77, 164) -0.421592px -1.95506px 0px, rgb(1, 77, 164) 0.567324px -1.91785px 0px, rgb(1, 77, 164) 1.41734px -1.41108px 0px, rgb(1, 77, 164) 1.92034px -0.558831px 0px;
  color: #fff;
  font-size: clamp(13.75px,1.375cqw,22px);
  line-height:0;
  margin-left:35px;
  margin-top:clamp(6.25px,0.625cqw,10px);
  white-space: nowrap;

  &.mobile{
    font-size:12px;
    text-shadow: rgb(1, 77, 164) 1px 0px 0px, rgb(1, 77, 164) 0.540302px 0.841471px 0px, rgb(1, 77, 164) -0.416147px 0.909297px 0px, rgb(1, 77, 164) -0.989992px 0.14112px 0px, rgb(1, 77, 164) -0.653644px -0.756802px 0px, rgb(1, 77, 164) 0.283662px -0.958924px 0px, rgb(1, 77, 164) 0.96017px -0.279415px 0px;
  }
}

.text-add-pig {
  text-shadow: rgb(255, 255, 255) 5px 0px 0px, rgb(255, 255, 255) 4.90033px 0.993347px 0px,
    rgb(255, 255, 255) 4.60531px 1.94709px 0px, rgb(255, 255, 255) 4.12668px 2.82321px 0px,
    rgb(255, 255, 255) 3.48353px 3.58678px 0px, rgb(255, 255, 255) 2.70151px 4.20736px 0px,
    rgb(255, 255, 255) 1.81179px 4.6602px 0px, rgb(255, 255, 255) 0.849836px 4.92725px 0px,
    rgb(255, 255, 255) -0.145998px 4.99787px 0px,
    rgb(255, 255, 255) -1.13601px 4.86924px 0px,
    rgb(255, 255, 255) -2.08073px 4.54649px 0px,
    rgb(255, 255, 255) -2.94251px 4.04248px 0px,
    rgb(255, 255, 255) -3.68697px 3.37732px 0px,
    rgb(255, 255, 255) -4.28444px 2.57751px 0px,
    rgb(255, 255, 255) -4.71111px 1.67494px 0px,
    rgb(255, 255, 255) -4.94996px 0.7056px 0px,
    rgb(255, 255, 255) -4.99147px -0.291871px 0px,
    rgb(255, 255, 255) -4.83399px -1.27771px 0px,
    rgb(255, 255, 255) -4.48379px -2.2126px 0px,
    rgb(255, 255, 255) -3.95484px -3.05929px 0px,
    rgb(255, 255, 255) -3.26822px -3.78401px 0px,
    rgb(255, 255, 255) -2.4513px -4.35788px 0px,
    rgb(255, 255, 255) -1.53666px -4.75801px 0px,
    rgb(255, 255, 255) -0.560763px -4.96845px 0px,
    rgb(255, 255, 255) 0.437495px -4.98082px 0px,
    rgb(255, 255, 255) 1.41831px -4.79462px 0px,
    rgb(255, 255, 255) 2.34258px -4.41727px 0px,
    rgb(255, 255, 255) 3.17346px -3.86382px 0px,
    rgb(255, 255, 255) 3.87783px -3.15633px 0px,
    rgb(255, 255, 255) 4.4276px -2.32301px 0px,
    rgb(255, 255, 255) 4.80085px -1.39708px 0px,
    rgb(255, 255, 255) 4.98271px -0.415447px 0px;
  color: #04b700;
  font-size: min(72px, 3.5vw);
}

.text-add-pig.mobile {
  font-size: min(72px, 8vw);
}
// #endregion

// #region Game Over
.box-show-detail-game-over {
  width: 30%;
  height: 72.6%;
  padding: 2% 0%;
  margin: 0.8%;
  background-color: #D4F3FF;
  border-radius: 7%;
  box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.25);
}

.box-show-detail-game-over.mobile {
  width: 100%;
  height: 180px;
  padding: 10px 20px;
  margin: auto;
  background-color: #D4F3FF;
  border-radius: 7%;
  box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.25);
}

.box-show-detail-game-over .header {
  width: clamp(137.5px,13.75cqw,220px);
  max-height:50px;
  height:clamp(31.25px,3.125cqw,50px);
  background-color: #1E467B;
  padding: clamp(8.125px,0.8125cqw,13px) clamp(15px,1.5cqw,24px);
  border-radius: clamp(18.785px,1.875cqw,30px);
  margin: auto;
  color: #D4F3FF;
  text-align: center;
  font-size: clamp(11.25px,1.125cqw,18px);
}

.text-game-over-pig {
  color: #014DA4;
  font-size: clamp(15px,1.5cqw,24px);
}

.box-game-over-total-coin {
  width:clamp(140px,14cqw,224px);
  background-color: #1E467B;
  color: #D4F3FF;
  border: 2px solid #4a261b;
  border-radius: clamp(15.625px,1.5625cqw,25px);
  padding: clamp(2.5px,0.25cqw,4px) clamp(3.125px,0.3125cqw,5px);
  margin: auto;
  box-shadow: inset 0px 1px 3px 0px rgba(0, 0, 0, 0.4);
  line-height: 0.1;
}

.text-game-over-quota {
  font-size: clamp(7.5px,0.75cqw,12px);
  color: #ec1515;

  &.mobile{
    font-size: 12px;
    color: #fff;
  }
}

.text-detail-game-over {
  color: #014DA4;
  font-size:clamp(15px,1.5cqw,24px);
  margin-top:clamp(10px,1cqw,16px);
}

.text-detail-score-game-over {
  color: #014DA4;
  text-shadow: rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px,
    rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px,
    rgb(255, 255, 255) 0.705713px 2.91581px 0px,
    rgb(255, 255, 255) -0.287171px 2.98622px 0px,
    rgb(255, 255, 255) -1.24844px 2.72789px 0px,
    rgb(255, 255, 255) -2.07227px 2.16926px 0px,
    rgb(255, 255, 255) -2.66798px 1.37182px 0px,
    rgb(255, 255, 255) -2.96998px 0.42336px 0px,
    rgb(255, 255, 255) -2.94502px -0.571704px 0px,
    rgb(255, 255, 255) -2.59586px -1.50383px 0px,
    rgb(255, 255, 255) -1.96093px -2.27041px 0px,
    rgb(255, 255, 255) -1.11013px -2.78704px 0px,
    rgb(255, 255, 255) -0.137119px -2.99686px 0px,
    rgb(255, 255, 255) 0.850987px -2.87677px 0px,
    rgb(255, 255, 255) 1.74541px -2.43999px 0px,
    rgb(255, 255, 255) 2.44769px -1.73459px 0px,
    rgb(255, 255, 255) 2.88051px -0.838247px 0px;
  font-size: clamp(62.5px,6.25cqw,100px);
  line-height: 1;
}

.box-game-over-ranking-scroll {
  height: 100%;
  margin-right: 2%;
  overflow-y: scroll;
}

.box-game-over-ranking-scroll::-webkit-scrollbar {
  width: clamp(6.25px,0.625cqw,10px);
}
.box-game-over-ranking-scroll::-webkit-scrollbar-track {
  background: #79DFFF;
  border: 1px solid #014DA4;
  border-radius: 8px;
}

.box-game-over-ranking-scroll::-webkit-scrollbar-thumb {
  background: #014DA4;
  border: 1px solid #014DA4;
  border-radius: 8px;
}

.box-character-header-main{
  max-height:45px;
  height:clamp(28.125px,2.8125cqw,45px);
  border-radius: clamp(9.375px,0.9375cqw,15px);
  border: clamp(1.875px,0.1875cqw,3px) solid #1E467B;
  background: #79DFFF;
  padding: 0px clamp(5px,0.5cqw,8px);
  margin:clamp(10px,1cqw,16px) 0px clamp(12.5px,1.25cqw,20px);
}

.box-ranking-character-game-over {
  width: 80%;
  padding: 1% 0%;
  background-color: #ffdfa4;
  border-radius: 15px;
  border: 3px solid #804208;
}

.box-total-pig-score-mobile {
  height: 35px;
  background-color: #1E467B;
  border-radius: 17px;
  color:#D4F3FF;
  font-size:16px;
}

// #endregion

// #region Box Content no ticket

.box-content-no-ticket {
  background-color: #ffe5c9;
  border-radius: 10px;
}

.text-no-ticket {
  font-size: 48px;
  color: #4a261b;
  text-shadow: rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px,
    rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px,
    rgb(255, 255, 255) 0.705713px 2.91581px 0px,
    rgb(255, 255, 255) -0.287171px 2.98622px 0px,
    rgb(255, 255, 255) -1.24844px 2.72789px 0px,
    rgb(255, 255, 255) -2.07227px 2.16926px 0px,
    rgb(255, 255, 255) -2.66798px 1.37182px 0px,
    rgb(255, 255, 255) -2.96998px 0.42336px 0px,
    rgb(255, 255, 255) -2.94502px -0.571704px 0px,
    rgb(255, 255, 255) -2.59586px -1.50383px 0px,
    rgb(255, 255, 255) -1.96093px -2.27041px 0px,
    rgb(255, 255, 255) -1.11013px -2.78704px 0px,
    rgb(255, 255, 255) -0.137119px -2.99686px 0px,
    rgb(255, 255, 255) 0.850987px -2.87677px 0px,
    rgb(255, 255, 255) 1.74541px -2.43999px 0px,
    rgb(255, 255, 255) 2.44769px -1.73459px 0px,
    rgb(255, 255, 255) 2.88051px -0.838247px 0px;
}

.button-active {
  transition: transform 0.2s ease-in-out;
}

.button-active:hover {
  transform: scale(0.95);
}

.button-answer-active {
  transition: transform 0.1s;
}

.button-answer-active.active {
  transform: scale(0.95);
}

.button-answer-active:active {
  transform: scale(0.95);
}

.text-add-coin {
  text-shadow: rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 1.75517px 0.958851px 0px,
    rgb(255, 255, 255) 1.0806px 1.68294px 0px, rgb(255, 255, 255) 0.141474px 1.99499px 0px,
    rgb(255, 255, 255) -0.832294px 1.81859px 0px,
    rgb(255, 255, 255) -1.60229px 1.19694px 0px,
    rgb(255, 255, 255) -1.97998px 0.28224px 0px,
    rgb(255, 255, 255) -1.87291px -0.701566px 0px,
    rgb(255, 255, 255) -1.30729px -1.5136px 0px,
    rgb(255, 255, 255) -0.421592px -1.95506px 0px,
    rgb(255, 255, 255) 0.567324px -1.91785px 0px,
    rgb(255, 255, 255) 1.41734px -1.41108px 0px,
    rgb(255, 255, 255) 1.92034px -0.558831px 0px;
  color: #04b700;
  font-size: min(24px, 1.3vw);
}

.animation-text-add {
  animation: textAddCoin 1.5s forwards;
  opacity: 0;
}

@keyframes textAddCoin {
  75% {
    top: -190%;
    opacity: 1;
  }
  100% {
    top: -190%;
    opacity: 0;
  }
}
// #endregion

.box-props-character{
  width:clamp(400px,40cqw,640px);
}
</style>
