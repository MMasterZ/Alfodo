<template>
  <q-page
    class="background-main"
    :class="
      $q.platform.is.desktop ? 'row justify-center items-center' : 'mobile'
    "
  >
    <!-- #region Desktop -->
    <div
      class="box-speakup-container relative-position row justify-center items-center"
      v-if="$q.platform.is.desktop"
    >
      <speakup-background-main></speakup-background-main>

      <div
        class="row justify-center items-center absolute-center fit"
        v-if="!isShowDialogCheckMicrophone && !eventData.isLoading"
      >
        <div class="col-12">
          <div>
            <speakup-header-bar
              :eventData="eventData"
              @callback-showDialogLogAnswer="funcShowDialogLogAnswer()"
            ></speakup-header-bar>
          </div>
        </div>

        <div
          class="col-12 relative-position"
          style="width: 100%; height: calc(100% - 80px)"
          align="center"
        >
          <di
            class="col-12 row justify-center items-center fit"
            v-if="!eventData.isShowDialogItemshop"
          >
            <speakup-policy
              :eventData="eventData"
              v-if="eventData.stage == '0'"
            ></speakup-policy>

            <speakup-activity
              :eventData="eventData"
              v-if="eventData.stage == '1'"
            ></speakup-activity>

            <speakup-story-menu
              :eventData="eventData"
              v-if="eventData.stage == '2'"
            ></speakup-story-menu>

            <speakup-story-details
              :eventData="eventData"
              v-if="eventData.stage == '3'"
            ></speakup-story-details>

            <speakup-chapter-menu
              :eventData="eventData"
              v-if="eventData.stage == '4'"
            ></speakup-chapter-menu>

            <speakup-chapter-content
              :eventData="eventData"
              v-if="eventData.stage == '5'"
            ></speakup-chapter-content>

            <speakup-extra-chapter
              :eventData="eventData"
              v-if="eventData.stage == '6'"
            >
            </speakup-extra-chapter>
          </di>

          <speakup-shop
            :eventData="eventData"
            v-if="eventData.isShowDialogItemshop"
          ></speakup-shop>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-else class="box-speakup-container mobile relative-position">
      <div v-if="!isShowDialogCheckMicrophone && !eventData.isLoading">
        <div>
          <speakup-header-bar
            :eventData="eventData"
            @callback-showDialogLogAnswer="funcShowDialogLogAnswer()"
          ></speakup-header-bar>
        </div>

        <div class="q-pt-xl" align="center">
          <speakup-policy
            :eventData="eventData"
            v-if="eventData.stage == '0'"
          ></speakup-policy>

          <speakup-activity
            :eventData="eventData"
            v-if="eventData.stage == '1'"
          ></speakup-activity>

          <speakup-story-menu
            :eventData="eventData"
            v-if="eventData.stage == '2'"
          ></speakup-story-menu>

          <speakup-story-details
            :eventData="eventData"
            v-if="eventData.stage == '3'"
          ></speakup-story-details>

          <speakup-chapter-menu
            :eventData="eventData"
            v-if="eventData.stage == '4'"
          ></speakup-chapter-menu>

          <speakup-chapter-content
            :eventData="eventData"
            v-if="eventData.stage == '5'"
          ></speakup-chapter-content>

          <speakup-extra-chapter
            :eventData="eventData"
            v-if="eventData.stage == '6'"
          >
          </speakup-extra-chapter>
        </div>

        <speakup-shop
          :eventData="eventData"
          v-if="eventData.isShowDialogItemshop"
        ></speakup-shop>
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Check Microphone -->
  <q-dialog
    v-model="isShowDialogCheckMicrophone"
    persistent
    maximized
    class="z-max"
  >
    <q-card class="transparent shadow-0" v-if="!eventData.isLoading">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body" align="center">
                <div>
                  <q-img
                    width="70px"
                    src="/images/speakup_main/speakup-icon-alert-microphone.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>

                <div class="f16 font-prompt-m q-pt-md">
                  ไมโครโฟนไม่พร้อมใช้งาน
                  <div>กรุณาเชื่อมต่อและลองใหม่อีกครั้ง</div>
                </div>
              </div>

              <div class="box-dialog-footer row justify-center">
                <div class="q-mx-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-cancel.png"
                    no-spinner
                    no-transition
                    @click="funcBackToLobby()"
                  ></q-img>
                </div>
                <div class="q-mx-xs">
                  <q-img
                    class="button-speakup-main active"
                    src="/images/speakup_main/speakup-button-try-again.png"
                    no-spinner
                    no-transition
                    @click="funcCheckMicrophone()"
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

  <!-- #region Dialog User Answer Log -->
  <q-dialog
    v-model="eventData.isShowDialogUserAnswerLog"
    persistent
    maximized
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div
            class="absolute-top-left"
            style="top: -32px; left: 25px; z-index: 1"
          >
            <q-img
              width="125px"
              src="/images/speakup_main/speakup-label-log.png"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <!-- #region Content Log -->
          <div class="box-dialog-container">
            <div class="box-dialog-sub log">
              <div class="box-dialog-body" style="padding: 3px">
                <div class="dialog-body-scroll">
                  <div
                    class="row q-pa-sm"
                    v-for="(itemLog, indexLog) in eventData.userAnswerLog"
                    :key="indexLog"
                    v-show="itemLog.isSendAnswer"
                  >
                    <div class="col-1 self-center" style="width: 15px"></div>
                    <div
                      class="self-center font-prompt-r f14 col box-log-content"
                      :class="itemLog.isPlayAudio ? 'playing' : ''"
                    >
                      <div>
                        {{ `${itemLog.question}` }}
                      </div>
                      <div class="relative-position box-log-separate-border">
                        <div class="absolute-center" style="left: -20px">
                          <div style="width: 25px">
                            <q-img
                              :src="`/images/speakup_main/speakup-button-${
                                itemLog.isPlayAudio ? 'playing' : 'play'
                              }.png`"
                              class="button-speakup-main active"
                              no-spinner
                              no-transition
                              @click="
                                itemLog.isPlayAudio
                                  ? eventData.func.stopAudio(itemLog)
                                  : eventData.func.playAudioLog(
                                      itemLog,
                                      indexLog
                                    )
                              "
                              width="100%"
                            >
                              <div
                                class="transparent no-padding fit"
                                v-if="itemLog.isPlayAudio"
                              >
                                <button-wave-animation
                                  v-if="itemLog.isPlayAudio"
                                ></button-wave-animation>
                              </div>
                            </q-img>
                          </div>
                        </div>
                      </div>
                      <div>
                        {{ `${itemLog.meaning}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <div
            class="absolute-top-right"
            style="top: -23px; right: -23px; z-index: 1"
          >
            <q-img
              width="50px"
              src="/images/speakup_main/speakup-button-close.png"
              class="button-speakup-main active"
              no-spinner
              no-transition
              v-close-popup
              @click="eventData.func.stopAudio()"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Finish Log -->
  <q-dialog
    v-model="eventData.isShowDialogFinishLog"
    persistent
    maximized
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-header q-mb-sm" align="center">
                <div
                  class="font-fredoka f24 text-title"
                  :data-text="eventData.chapterData.name.toUpperCase()"
                >
                  {{ eventData.chapterData.name.toUpperCase() }}
                </div>
              </div>
              <div class="box-dialog-body" style="padding: 3px">
                <div class="dialog-body-scroll">
                  <div
                    class="row q-pa-sm"
                    v-for="(itemLog, indexLog) in eventData.userAnswerLog"
                    :key="indexLog"
                  >
                    <div class="col-1 self-center" style="width: 15px"></div>
                    <div
                      class="self-center font-prompt-r f14 col box-log-content"
                      :class="itemLog.isPlayAudio ? 'playing' : ''"
                    >
                      <div>
                        {{ `${itemLog.question}` }}
                      </div>
                      <div class="relative-position box-log-separate-border">
                        <div class="absolute-center" style="left: -20px">
                          <div style="width: 25px">
                            <q-img
                              :src="`/images/speakup_main/speakup-button-${
                                itemLog.isPlayAudio ? 'playing' : 'play'
                              }.png`"
                              class="button-speakup-main active"
                              no-spinner
                              no-transition
                              @click="
                                itemLog.isPlayAudio
                                  ? eventData.func.stopAudio()
                                  : eventData.func.playAudioLog(
                                      itemLog,
                                      indexLog
                                    )
                              "
                              width="100%"
                            >
                              <div
                                class="transparent no-padding fit"
                                v-if="itemLog.isPlayAudio"
                              >
                                <button-wave-animation
                                  v-if="itemLog.isPlayAudio"
                                ></button-wave-animation>
                              </div>
                            </q-img>
                          </div>
                        </div>
                      </div>
                      <div>
                        {{ `${itemLog.meaning}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="sub-dialog-footer row justify-center q-mt-sm">
                <div class="q-ma-xs" align="center">
                  <q-img
                    class="button-speakup-main size-200 active"
                    :src="`/images/speakup_main/speakup-button-${
                      !eventData.isPlayAllAudio ? 'play' : 'stop'
                    }-all.png`"
                    @click="
                      eventData.isPlayAllAudio
                        ? eventData.func.stopAllAudio()
                        : eventData.func.playAllAudio()
                    "
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="q-ma-xs" align="center">
                  <q-img
                    class="button-speakup-main size-200 active"
                    src="/images/speakup_main/speakup-button-next-finish.png"
                    no-spinner
                    no-transition
                    @click="eventData.func.nextToFinishChapter()"
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

  <!-- #region Dialog Finish Speakup -->
  <q-dialog
    v-model="eventData.isShowDialogFinishSpeakup"
    maximized
    persistent
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-finish-container">
            <div class="box-dialog-finish-sub">
              <!-- #region Body Content -->
              <div class="box-dialog-finish-content">
                <!-- #region Star Score -->
                <div class="q-pt-lg">
                  <div class="relative-position q-pa-xl">
                    <div
                      class="absolute-center"
                      :style="`top: ${
                        indexStar == 0 ? '65%' : itemStar.position.top
                      }; left: ${
                        indexStar == 2 ? '73%' : itemStar.position.left
                      }`"
                      v-for="(itemStar, indexStar) in starList"
                    >
                      <div
                        class="relative-position"
                        style="width: 60px; height: 60px"
                      >
                        <div class="absolute-center">
                          <q-img
                            width="60px"
                            :style="`transform: rotate(${itemStar.rotate})`"
                            src="/images/speakup_main/speakup-icon-finish-star-empty.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>

                        <div
                          class="absolute-center"
                          v-if="eventData.chapterData.score >= itemStar.score"
                        >
                          <div
                            class="animate__animated animate__bounceIn"
                            style="animation-duration: 1s"
                            :style="`animation-delay:0.${indexStar + 1 * 3}s`"
                          >
                            <q-img
                              width="60px"
                              :style="`transform: rotate(${itemStar.rotate})`"
                              src="/images/speakup_main/speakup-icon-finish-star.png"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Score -->
                <div class="q-py-md font-fredoka f16">
                  <div class="row q-py-sm">
                    <div class="">Accuracy</div>
                    <q-space />
                    <div class="col text-score relative-position" align="right">
                      {{ `${accuracyNumber}%` }}
                    </div>
                  </div>
                  <div class="row q-py-sm">
                    <div class="">
                      Best Accuracy
                      <span
                        class="relative-position text-new"
                        align="center"
                        v-if="eventData.isNewScore"
                        >NEW</span
                      >
                    </div>
                    <q-space />
                    <div class="col text-score relative-position" align="right">
                      {{ `${bestAccuracyNumber}%` }}
                    </div>
                  </div>
                  <div class="row q-py-sm">
                    <div class="col-1" style="width: 70%">
                      Get New Star Reward
                    </div>
                    <q-space />
                    <div class="col text-score row">
                      <div class="col-1 relative-position" style="width: 35px">
                        <div class="absolute-center">
                          <q-img
                            width="35px"
                            :src="`${eventStore.speakUp.data.monetaryImgUrl}`"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>
                      <div class="col" align="right">
                        {{ eventData.chapterData.coin }}
                      </div>
                    </div>
                  </div>
                  <div class="q-py-sm" style="height: 45px">
                    <div class="row" v-if="eventData.chapterData.star == 3">
                      <div class="col-1" style="width: 70%">Perfect reward</div>
                      <q-space />
                      <div class="col text-score row">
                        <div
                          class="col-1 relative-position"
                          style="width: 35px"
                        >
                          <div class="absolute-center">
                            <q-img
                              width="35px"
                              :src="`${eventStore.speakUp.data.monetaryImgUrl}`"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                        <div class="col" align="right">300</div>
                      </div>
                    </div>
                    <div align="center" class=""></div>
                  </div>
                </div>
                <div class="font-fredoka">
                  <div class="box-sum-score row">
                    <div
                      class="col-1 self-center relative-position"
                      style="width: 50px"
                    >
                      <div class="absolute-center">
                        <q-img
                          width="45px"
                          :src="`${eventStore.speakUp.data.monetaryImgUrl}`"
                          no-spinner
                          no-transition
                        >
                          <div
                            class="transparent absolute-center"
                            style="top: 70%"
                            v-if="eventData.chapterData.isSpecialChapter"
                          >
                            <div class="font-fredoka text-diamond">x3</div>
                          </div></q-img
                        >
                      </div>
                    </div>
                    <div
                      class="col self-center relative-position text-white f40"
                    >
                      <div
                        class="absolute-center"
                        style="width: 100%"
                        align="center"
                      >
                        <div>{{ summaryCoinNumber }}</div>
                      </div>
                    </div>
                    <div
                      class="col-1 self-center relative-position"
                      style="width: 50px"
                    ></div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <!-- #region Footer Content -->
              <div class="box-dialog-finish-footer">
                <div class="row justify-center">
                  <div class="q-mx-md">
                    <q-img
                      class="button-speakup-main active size-60"
                      src="/images/speakup_main/speakup-button-menu.png"
                      no-spinner
                      no-transition
                      @click="eventData.func.backToChapterMenu()"
                    ></q-img>
                  </div>
                  <div class="q-mx-md">
                    <q-img
                      class="button-speakup-main size-60"
                      :src="`/images/speakup_main/speakup-button-try-again-practice${
                        eventData.chapterData.star == 3 ? '-disable' : ''
                      }.png`"
                      :class="
                        eventData.chapterData.star == 3 ? 'disable' : 'active'
                      "
                      no-spinner
                      no-transition
                      @click="
                        eventData.chapterData.star == 3
                          ? null
                          : eventData.func.tryAgainPractice()
                      "
                    ></q-img>
                  </div>
                  <div class="q-mx-md" v-if="!eventData.isFinalPractice">
                    <q-img
                      class="button-speakup-main size-60"
                      :src="`/images/speakup_main/speakup-button-next-practice${
                        eventData.chapterData.currentStar == 0 ||
                        eventData.isFinalPractice
                          ? '-disable'
                          : ''
                      }.png`"
                      :class="
                        eventData.chapterData.currentStar == 0 ||
                        eventData.isFinalPractice
                          ? 'disable'
                          : 'active'
                      "
                      no-spinner
                      no-transition
                      @click="
                        eventData.chapterData.currentStar == 0 ||
                        eventData.isFinalPractice
                          ? null
                          : eventData.func.nextPractice()
                      "
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <div class="absolute-center" style="top: 0">
            <q-img
              width="254px"
              src="/images/speakup_main/speakup-label-finish-chapter.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region  -->
  <q-dialog v-model="isShowDialogErrorRecord" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="box-dialog-container">
            <div class="box-dialog-sub">
              <div class="box-dialog-body">
                <div align="center" class="q-pa-xs">
                  <q-img
                    width="70px"
                    src="/images/speakup_main/speakup-icon-error.png"
                    no-sprinner
                    no-transition
                  ></q-img>
                </div>

                <div align="center" class="font-prompt-m f16 q-my-sm">
                  ไม่ได้ยินที่คุณพูดเลย กรุณาลองใหม่
                  <br />
                  หรือตรวจสอบการเชื่อมต่อไมโครโฟน
                </div>
              </div>

              <div class="box-dialog-footer" align="center">
                <q-img
                  src="/images/speakup_main/speakup-button-try-again.png"
                  class="button-speakup-main active"
                  no-sprinner
                  no-transition
                  @click="isShowDialogErrorRecord = false"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <dialog-loading :isShowLoading="eventData.isLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script>
import speakupBackgroundMain from "components/speakup_main/speakup-background.vue";
import speakupHeaderBar from "components/speakup_main/speakup-header-bar.vue";
import speakupPolicy from "components/speakup_main/speakup-policy.vue";
import speakupActivity from "components/speakup_main/speakup-activity.vue";
import speakupStoryMenu from "src/components/speakup_main/speakup-story-menu.vue";
import speakupStoryDetails from "src/components/speakup_main/speakup-story-details.vue";
import speakupChapterMenu from "src/components/speakup_main/speakup-chapter-menu.vue";
import speakupChapterContent from "src/components/speakup_main/speakup-chapter-content.vue";
import speakupExtraChapter from "src/components/speakup_main/speakup-extra-chapter.vue";
import speakupShop from "src/components/speakup_main/speakup-shop.vue";
import buttonWaveAnimation from "components/speakup_main/speakup-button-wave-animation.vue";

import dialogLoading from "src/components/dialog-loading.vue";

import { computed, onMounted, ref } from "vue";
import { useEventStore } from "src/stores/event";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { st } from "src/router";
import axios from "axios";
import { useSystemStore } from "src/stores/system";

export default {
  components: {
    speakupBackgroundMain,
    speakupHeaderBar,
    speakupPolicy,
    speakupActivity,
    speakupStoryMenu,
    speakupStoryDetails,
    speakupChapterMenu,
    speakupChapterContent,
    speakupExtraChapter,
    speakupShop,
    buttonWaveAnimation,
    dialogLoading,
  },
  setup() {
    // Initial Data
    const $router = useRouter();
    const $route = useRoute();
    const $q = useQuasar();

    // Dialog
    const isShowDialogErrorRecord = ref(false);

    const starList = ref([
      {
        score: 70,
        position: {
          top: "65%",
          left: "26%",
        },
        rotate: "-15deg",
        isPass: false,
      },
      {
        score: 80,
        position: {
          top: "30%",
          left: "50%",
        },
        rotate: "0deg",
        isPass: false,
      },
      {
        score: 90,
        position: {
          top: "65%",
          left: "73%",
        },
        rotate: "15deg",
        isPass: false,
      },
    ]);

    // Stage
    // 0: Policy
    // 1: Activity
    // 2: Story Menu
    // 3: Story Details
    // 4: Chapter Menu
    // 5: Chapter Content
    // 6: Extra Chapter
    let tempAudio = null;
    let runPlayingAudioNumber = 0;
    const eventData = ref({
      name: "",
      stage: "0",
      eventId: "",
      eventCoin: 0,

      // Story Data
      storyId: "",
      storyList: [],
      storyData: null,

      // let Speak Up
      sentenceList: [],
      recordTimer: 0,
      counter: 0,
      audioUrl: "",
      isHasAudioFile: false,

      // Chapter Data
      // would you like to you to me order?
      chapterName: "",
      chapterId: null,
      currentQuestion: 0,
      chapterList: [],
      chapterData: null,
      userAnswerLog: [],
      tempUserAudio: "",
      tempQuestionAudio: "",

      // Extra Chapter
      audioBlobContest: "",
      audioUrlExtra: "",
      isHasAudioFileExtra: false,

      // #region Status
      isFinishStoryContent: false,
      isFinishPractice: false,
      isNewScore: false,
      isPlayAllAudio: false,
      isRecievedSpeakUpPosttestReward: false,
      isFinalPractice: false,
      isRecording: false,
      isLoading: true,
      // #endregion

      // #region Dialog
      isShowDialogUserAnswerLog: false,
      isShowDialogFinishLog: false,
      isShowDialogFinishSpeakup: false,
      isShowDialogItemshop: false,
      // #endregion

      // #region Temp Data
      // tempUserAudio:null,
      // #endregion

      // #region Computed
      com: {
        questionData: computed(() => {
          let findItem =
            eventData.value.chapterData.sentences[
              eventData.value.currentQuestion
            ];

          if (findItem) {
            return findItem;
          }
          return null;
        }),
      },
      // #endregion

      // #region Function
      func: {
        // #region Play Audio All
        playAllAudio() {
          // console.log(" Play All Audio ");

          if (tempAudio) {
            tempAudio.pause();
            tempAudio = null;
            eventData.value.userAnswerLog.map((item, index) => {
              item.isPlayAudio = false;
              return item;
            });
          }

          eventData.value.isPlayAllAudio = true;

          eventData.value.userAnswerLog[
            runPlayingAudioNumber
          ].isPlayAudio = true;

          tempAudio = new Audio(
            eventData.value.userAnswerLog[runPlayingAudioNumber].audioUrl
          );

          console.log("tempAudio: ", tempAudio);

          tempAudio.play();

          tempAudio.onended = () => {
            eventData.value.userAnswerLog[
              runPlayingAudioNumber
            ].isPlayAudio = false;
            tempAudio = null;

            if (
              runPlayingAudioNumber + 1 ==
              eventData.value.userAnswerLog.length
            ) {
              eventData.value.isPlayAllAudio = false;
              eventData.value.userAnswerLog.map((item, index) => {
                item.isPlayAudio = false;
                return item;
              });
              runPlayingAudioNumber = 0;
              return;
            }

            runPlayingAudioNumber++;
            eventData.value.func.playAllAudio();
          };

          tempAudio.onerror = () => {
            eventData.value.isPlayAllAudio = false;
            eventData.value.userAnswerLog.map((item, index) => {
              item.isPlayAudio = false;
              return item;
            });
            runPlayingAudioNumber = 0;
          };

          return;
        },
        // #endregion
        // #region Stop Audio All
        stopAllAudio() {
          console.log(" Stop All Audio ");

          if (tempAudio) {
            tempAudio.pause();
            tempAudio = null;
          }

          runPlayingAudioNumber = 0;
          eventData.value.isPlayAllAudio = false;
          eventData.value.userAnswerLog.map((item, index) => {
            item.isPlayAudio = false;
            return item;
          });
        },
        // #endregion
        // #region Play Audio Log
        playAudioLog(itemLog, itemIndex) {
          eventData.value.isPlayAllAudio = false;

          if (tempAudio) {
            tempAudio.pause();
            tempAudio = null;
            runPlayingAudioNumber = 0;
            eventData.value.userAnswerLog.map((item, index) => {
              if (itemIndex != index) {
                item.isPlayAudio = false;
              }
              return item;
            });
          }

          eventData.value.userAnswerLog[itemIndex].isPlayAudio = true;

          tempAudio = new Audio(itemLog.audioUrl);
          tempAudio.play();

          tempAudio.onended = () => {
            eventData.value.userAnswerLog[itemIndex].isPlayAudio = false;
            tempAudio = null;
          };
        },
        // #endregion
        // #region Stop Audio
        stopAudio() {
          console.log(" Stop Audio ");
          if (tempAudio) {
            tempAudio.pause();
            tempAudio = null;
            runPlayingAudioNumber = 0;
            eventData.value.userAnswerLog.map((item, index) => {
              item.isPlayAudio = false;
              return item;
            });

            return;
          }
        },
        // #endregion
        // #region Next Question
        async nextQuestion() {
          if (
            eventData.value.currentQuestion + 1 ==
            eventData.value.chapterData.sentences.length
          ) {
            await this.finishPractice();
            eventData.value.isShowDialogFinishLog = true;
            return;
          }

          eventData.value.currentQuestion++;
        },
        // #endregion
        // #region Next to finish chapter
        nextToFinishChapter() {
          if (tempAudio) {
            tempAudio.pause();
            tempAudio = null;
            runPlayingAudioNumber = 0;
            eventData.value.userAnswerLog.map((item, index) => {
              item.isPlayAudio = false;
              return item;
            });
            eventData.value.isPlayAllAudio = false;
          }

          runPlayingAudioNumber = 0;
          eventData.value.isShowDialogFinishLog = false;
          eventData.value.isShowDialogFinishSpeakup = true;
          setTimeout(() => {
            funcRunNumberAnimation();
          }, 500);
        },
        // #endregion
        // #region Add User Answer Logs
        addUserAnswerLogs() {
          eventData.value.userAnswerLog = [];
          let temp = [];
          for (
            let i = 0;
            i < eventData.value.chapterData.sentences.length;
            i++
          ) {
            let data = eventData.value.chapterData.sentences[i];

            let resetAnswerLogs = data.question.map((x) => {
              x.isCorrect = false;
              return x;
            });

            let newData = {
              audioUrl: null,
              answer: resetAnswerLogs,
              isSendAnswer: false,
              isPlayAudio: false,
              question: data.sentenceEn,
              meaning: data.sentenceTh,
            };

            temp.push(newData);
          }

          eventData.value.userAnswerLog = temp;
        },
        // #endregion
        // #region Finish Practice
        async finishPractice() {
          console.log(" Finish Practice ");

          const eventStore = useEventStore();

          $q.loading.show();

          if (eventData.value.tempUserAudio) {
            eventData.value.tempUserAudio.pause();
            eventData.value.tempUserAudio = null;
          }

          if (eventData.value.tempQuestionAudio) {
            eventData.value.tempQuestionAudio.pause();
            eventData.value.tempQuestionAudio = null;
          }

          let setDiamond = 0;

          let findNextPractice = eventData.value.chapterList.find(
            (x) =>
              x.star != 3 &&
              x.index != eventData.value.chapterData.index &&
              x.index > eventData.value.chapterData.index
          );

          if (
            eventData.value.chapterData.index + 1 ===
              eventData.value.chapterList.length ||
            !findNextPractice
          ) {
            eventData.value.isFinalPractice = true;
          } else {
            eventData.value.isFinalPractice = false;
          }

          // คำนวนเพชร ตามจำนวนดาวที่ได้
          // Star 1 = 10
          // Star 2 = 20
          // Star 3 = 30
          switch (eventData.value.chapterData.currentStar) {
            case 0:
              if (eventData.value.chapterData.star == 1) {
                setDiamond = 10;
              } else if (eventData.value.chapterData.star == 2) {
                setDiamond = 30;
              } else if (eventData.value.chapterData.star == 3) {
                setDiamond = 60;
              }
              break;
            case 1:
              if (eventData.value.chapterData.star == 2) {
                setDiamond = 20;
              } else if (eventData.value.chapterData.star == 3) {
                setDiamond = 50;
              }
              break;
            case 2:
              if (eventData.value.chapterData.star == 3) {
                setDiamond = 30;
              }
              break;
            default:
              break;
          }

          if (
            eventData.value.chapterData.star >
            eventData.value.chapterData.currentStar
          ) {
            eventData.value.chapterData.currentStar =
              eventData.value.chapterData.star;
          }

          if (
            eventData.value.chapterData.score >
            eventData.value.chapterData.highScore
          ) {
            eventData.value.chapterData.highScore =
              eventData.value.chapterData.score;
            eventData.value.isNewScore = true;
          } else {
            eventData.value.isNewScore = false;
          }

          eventData.value.chapterData.coin = setDiamond;

          if (eventData.value.chapterData.star === 3) {
            setDiamond += 300;
          }

          if (eventData.value.chapterData.isSpecialChapter) {
            setDiamond = setDiamond * 3;
          }

          eventData.value.eventCoin += setDiamond;

          if (eventData.value.chapterData.score > 0) {
            await eventStore.saveSpeakUpChapterLog(eventData.value);
          }

          $q.loading.hide();
        },
        // #endregion
        // #region Back to Chapter menu
        backToChapterMenu() {
          eventData.value.isShowDialogFinishSpeakup = false;
          eventData.value.isLoading = true;
          eventData.value.userAnswerLog = [];
          runPlayingAudioNumber = 0;
          setTimeout(() => {
            eventData.value.stage = "4";
            eventData.value.isLoading = false;
          }, 2000);
        },
        // #endregion
        // #region Try Again Practice
        tryAgainPractice() {
          eventData.value.isLoading = true;
          isShowDialogErrorRecord.value = false;
          eventData.value.isShowDialogFinishSpeakup = false;
          eventData.value.userAnswerLog = [];
          eventData.value.currentQuestion = 0;
          accuracyNumber.value = 0;
          bestAccuracyNumber.value = 0;
          summaryCoinNumber.value = 0;
          runPlayingAudioNumber = 0;

          eventData.value.chapterData.sentences.map((x) => {
            x.score = 0;
            x.question.map((y) => {
              y.isCorrect = false;
              return y;
            });
            return x;
          });

          eventData.value.chapterData.score = 0;

          if (eventData.value.chapterData.star == 3) {
            eventData.value.stage = "4";
            eventData.value.isLoading = false;
            return;
          }

          setTimeout(() => {
            eventData.value.func.addUserAnswerLogs();
            eventData.value.stage = "5";
            eventData.value.isLoading = false;
          }, 2000);
        },
        // #endregion
        // #region Next Practice
        nextPractice() {
          eventData.value.isLoading = true;

          let findNextPractice = eventData.value.chapterList.find(
            (x) =>
              x.star != 3 &&
              x.index != eventData.value.chapterData.index &&
              x.index > eventData.value.chapterData.index
          );

          eventData.value.chapterData.sentences.map((x) => {
            x.score = 0;
            x.question.map((y) => {
              y.isCorrect = false;
              return y;
            });
            return x;
          });

          isShowDialogErrorRecord.value = false;
          eventData.value.chapterData = findNextPractice;
          eventData.value.chapterId = findNextPractice.chapterId;
          eventData.value.isShowDialogFinishSpeakup = false;
          eventData.value.userAnswerLog = [];
          accuracyNumber.value = 0;
          bestAccuracyNumber.value = 0;
          summaryCoinNumber.value = 0;
          runPlayingAudioNumber = 0;

          setTimeout(() => {
            eventData.value.currentQuestion = 0;
            eventData.value.func.addUserAnswerLogs();
            eventData.value.stage = "5";
            eventData.value.isLoading = false;
          }, 1000);
        },
        // #endregion
        // #region Recording
        startRecording() {
          if ($q.platform.is.desktop) {
            funcMediaRecorderDesktop();
          } else if ($q.platform.is.ios) {
            funcMediaRecorderIOS();
          } else if ($q.platform.is.mobile) {
            funcMediaRecorderAndroid();
          }
        },
        stopRecording() {
          if ($q.platform.is.desktop) {
            funcOnStopRecorderDesktop();
          } else if ($q.platform.is.ios) {
            funcOnStopRecorderIOS();
          } else if ($q.platform.is.mobile) {
            funcOnStopRecorderAndroid();
          }
        },
        // #endregion
      },
      // #endregion
    });

    // #region ***** Function *****
    // Initial Data Media Recorder
    const resultTranscript = ref("");
    let listenerTimeout = null;
    let recognition;
    let mediaRecorder;
    let audioChunks = [];
    let audioStream;

    // #region recorder timer
    let listenerRecordTimeout;
    const funcRecordTimer = () => {
      if (listenerRecordTimeout) {
        clearInterval(listenerRecordTimeout);
      }

      let counterTime = 0;
      listenerRecordTimeout = setInterval(() => {
        counterTime++;
        eventData.value.recordTimer = counterTime * 1000;
      }, 1000);
    };
    // #endregion

    // #region Media Recorder Desktop
    const funcMediaRecorderDesktop = async () => {
      console.clear();

      const eventStore = useEventStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      eventData.value.recordTimer = 0;
      eventData.value.audioUrl = "";
      eventData.value.audioUrlExtra = "";
      eventData.value.isHasAudioFile = false;
      eventData.value.isHasAudioFileExtra = false;
      audioChunks = [];

      if (eventData.value.stage == "5") {
        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].isSendAnswer = false;

        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].answer.map((x) => (x.isCorrect = false));
      }

      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorder = new MediaRecorder(audioStream);

        if (eventData.value.stage == "5") {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

          recognition = new SpeechRecognition();

          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";
          recognition.maxAlternatives = 1;

          recognition.start();

          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            let getCompare = funcSimilarity(
              eventData.value.chapterData.sentences[
                eventData.value.currentQuestion
              ].sentenceEn,
              transcript
            );

            resultTranscript.value = getCompare;
          };

          recognition.onerror = (event) => {
            console.clear();
            funcEvaluate(-1);
            funcOnStopRecorderDesktop();
          };

          recognition.onend = () => {
            if (resultTranscript.value) {
              if (resultTranscript.value.resultCompare.length > 0) {
                funcCheckAnswer(resultTranscript.value.resultCompare);
              }
            } else {
              funcEvaluate(-1);
              funcOnStopRecorderDesktop();
            }
          };
        }

        mediaRecorder.start();

        eventData.value.isRecording = true;

        if (eventData.value.stage == "3" || eventData.value.stage == "6") {
          funcRecordTimer();
        }

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          $q.loading.show();

          if (audioChunks.length) {
            let audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

            eventData.value.audioBlob = audioBlob;

            let tempAudio = URL.createObjectURL(audioBlob);

            eventData.value.audioUrl = tempAudio;

            if (eventData.value.stage == "6") {
              eventData.value.audioBlobContest = audioBlob;
              eventData.value.audioUrlExtra = tempAudio;
              eventData.value.isHasAudioFileExtra = true;
            }

            if (eventData.value.stage == "3") {
              const responseURL = await st
                .child(
                  `/speakUp/pretest/${studentStore.courseId}-${eventStore.speakUp.data.speakUpId}`
                )
                .put(audioBlob);

              const getAudioURL = await responseURL.ref.getDownloadURL();

              await eventStore.saveSpeakUpPretestRecord(getAudioURL);
              eventData.value.eventCoin = courseStore.course.data.eventCoin;

              eventData.value.counter++;
              eventData.value.isHasAudioFile = true;
            }

            if (eventData.value.stage == "5") {
              eventData.value.userAnswerLog[
                eventData.value.currentQuestion
              ].audioUrl = tempAudio;

              eventData.value.tempUserAudio = new Audio(tempAudio);
              eventData.value.tempUserAudio.play();
            }

            $q.loading.hide();
          }
        };

        if (eventData.value.stage == "5") {
          funcStopRecorderTimeDesktop();
        }
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderDesktop();
      }
    };

    const funcStopRecorderTimeDesktop = () => {
      try {
        let setQuestionTimeOut =
          eventData.value.chapterData.sentences[eventData.value.currentQuestion]
            .timer;

        if (setQuestionTimeOut < 3000) {
          setQuestionTimeOut = 3000;
        } else if (setQuestionTimeOut > 10000) {
          setQuestionTimeOut = 10000;
        }

        listenerTimeout = setTimeout(() => {
          if (isShowDialogErrorRecord.value) {
            funcEvaluate(-1);
          } else {
            funcOnStopRecorderDesktop();
          }
        }, setQuestionTimeOut);
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderDesktop();
      }
    };

    const funcOnStopRecorderDesktop = () => {
      if (listenerRecordTimeout) {
        clearInterval(listenerRecordTimeout);
      }

      if (eventData.value.isRecording) {
        mediaRecorder.stop();
        audioStream.getTracks().forEach((track) => track.stop());
        if (eventData.value.stage == "5") {
          recognition.stop();
        }
        audioChunks = [];
        eventData.value.isRecording = false;
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Media Recorder Android
    const funcMediaRecorderAndroid = async () => {
      console.clear();

      const eventStore = useEventStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      eventData.value.recordTimer = 0;
      eventData.value.audioUrl = "";
      eventData.value.audioUrlExtra = "";
      eventData.value.isHasAudioFile = false;
      eventData.value.isHasAudioFileExtra = false;
      audioChunks = [];

      if (eventData.value.stage == "5") {
        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].isSendAnswer = false;

        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].answer.map((x) => (x.isCorrect = false));
      }

      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorder = new MediaRecorder(audioStream);

        eventData.value.isRecording = true;

        if (eventData.value.stage == "3" || eventData.value.stage == "6") {
          funcRecordTimer();
        }

        mediaRecorder.start();

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          try {
            if (audioChunks.length) {
              let audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

              eventData.value.audioBlob = audioBlob;

              let tempAudio = URL.createObjectURL(audioBlob);

              eventData.value.audioUrl = tempAudio;

              if (eventData.value.stage == "6") {
                eventData.value.audioBlobContest = audioBlob;
                eventData.value.audioUrlExtra = tempAudio;
                eventData.value.isHasAudioFileExtra = true;
              }

              if (eventData.value.stage == "3") {
                $q.loading.show();

                const responseURL = await st
                  .child(
                    `/speakUp/pretest/${studentStore.courseId}-${eventStore.speakUp.data.speakUpId}`
                  )
                  .put(audioBlob);

                const getAudioURL = await responseURL.ref.getDownloadURL();

                await eventStore.saveSpeakUpPretestRecord(getAudioURL);
                eventData.value.eventCoin = courseStore.course.data.eventCoin;

                eventData.value.counter++;
                eventData.value.isHasAudioFile = true;
                $q.loading.hide();
              }

              if (eventData.value.stage == "5") {
                var reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = async function () {
                  $q.loading.show();

                  var base64data = reader.result.split(",")[1];

                  const APIURL = `${process.env.NEWAPI}/stt-stt`;

                  const POSTDATA = {
                    fileBase64: base64data,
                  };

                  const response = await axios.post(APIURL, POSTDATA);

                  if (response.data != "Error") {
                    const transcript = response.data;
                    let getCompare = funcSimilarity(
                      eventData.value.chapterData.sentences[
                        eventData.value.currentQuestion
                      ].sentenceEn,
                      transcript
                    );

                    resultTranscript.value = getCompare;

                    if (resultTranscript.value) {
                      if (getCompare.resultCompare.length > 0) {
                        funcCheckAnswer(getCompare.resultCompare);
                      }
                    }

                    eventData.value.userAnswerLog[
                      eventData.value.currentQuestion
                    ].audioUrl = tempAudio;

                    eventData.value.tempUserAudio = new Audio(tempAudio);
                    eventData.value.tempUserAudio.play();
                    $q.loading.hide();
                  } else {
                    funcEvaluate(-1);
                    funcOnStopRecorderAndroid();
                  }
                };
              }
            }
          } catch (e) {
            funcEvaluate(-1);
            funcOnStopRecorderAndroid();
          }
        };

        if (eventData.value.stage == "5") {
          funcStopRecorderTimeAndroid();
        }
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderAndroid();
      }
    };

    const funcStopRecorderTimeAndroid = () => {
      try {
        let setQuestionTimeOut =
          eventData.value.chapterData.sentences[eventData.value.currentQuestion]
            .timer;

        if (setQuestionTimeOut < 3000) {
          setQuestionTimeOut = 3000;
        } else if (setQuestionTimeOut > 10000) {
          setQuestionTimeOut = 10000;
        }

        listenerTimeout = setTimeout(() => {
          if (listenerTimeout) {
            clearTimeout(listenerTimeout);
          }

          if (isShowDialogErrorRecord.value) {
            funcEvaluate(-1);
          } else {
            funcOnStopRecorderAndroid();
          }
        }, setQuestionTimeOut);
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderAndroid();
      }
    };

    const funcOnStopRecorderAndroid = () => {
      if (listenerRecordTimeout) {
        clearInterval(listenerRecordTimeout);
      }

      if (eventData.value.isRecording) {
        mediaRecorder.stop();
        audioStream.getTracks().forEach((track) => track.stop());
        audioChunks = [];
        eventData.value.isRecording = false;
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Media Recorder IOS
    const funcMediaRecorderIOS = async () => {
      const eventStore = useEventStore();
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      // #region Clear Data on record
      eventData.value.recordTimer = 0;
      eventData.value.audioUrl = "";
      eventData.value.audioUrlExtra = "";
      eventData.value.isHasAudioFile = false;
      eventData.value.isHasAudioFileExtra = false;
      audioChunks = [];

      // Stage 5
      if (eventData.value.stage == "5") {
        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].isSendAnswer = false;

        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].answer.map((x) => (x.isCorrect = false));
      }
      // #endregion

      try {
        // Media Device
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        // Media Recorder
        mediaRecorder = new MediaRecorder(audioStream);

        // #region Stage 5
        if (eventData.value.stage == "5") {
          const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

          recognition = new SpeechRecognition();

          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = "en-US";
          recognition.maxAlternatives = 1;
          recognition.interimResults = true;

          // Start Recognition
          recognition.start();

          // On Result
          recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            let getCompare = funcSimilarity(
              eventData.value.chapterData.sentences[
                eventData.value.currentQuestion
              ].sentenceEn,
              transcript
            );

            resultTranscript.value = getCompare;
          };

          // On End
          recognition.onend = (e) => {
            if (resultTranscript.value) {
              if (resultTranscript.value.resultCompare.length > 0) {
                funcCheckAnswer(resultTranscript.value.resultCompare);
              }
            } else {
              funcEvaluate(-1);
              funcOnStopRecorderIOS();
            }
          };

          // On Error
          recognition.onerror = (event) => {
            funcEvaluate(-1);
            funcOnStopRecorderIOS();
          };
        }
        // #endregion

        // Start Media Recorder
        mediaRecorder.start();

        eventData.value.isRecording = true;

        // #region Stage 3, 6 record timer
        if (eventData.value.stage == "3" || eventData.value.stage == "6") {
          funcRecordTimer();
        }
        // #endregion

        // On Data Available
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        // On Stop
        mediaRecorder.onstop = async () => {
          if (audioChunks.length) {
            let audioBlob = new Blob(audioChunks, { type: "audio/mp3" });

            eventData.value.audioBlob = audioBlob;

            let tempAudio = URL.createObjectURL(audioBlob);

            eventData.value.audioUrl = tempAudio;

            if (eventData.value.stage == "6") {
              eventData.value.audioBlobContest = audioBlob;
              eventData.value.audioUrlExtra = tempAudio;
              eventData.value.isHasAudioFileExtra = true;
            }

            if (eventData.value.stage == "3") {
              $q.loading.show();

              const responseURL = await st
                .child(
                  `/speakUp/pretest/${studentStore.courseId}-${eventStore.speakUp.data.speakUpId}`
                )
                .put(audioBlob);

              let getAudioURL = await responseURL.ref.getDownloadURL();

              await eventStore.saveSpeakUpPretestRecord(getAudioURL);

              eventData.value.eventCoin = courseStore.course.data.eventCoin;

              eventData.value.counter++;
              setTimeout(() => {
                eventData.value.isHasAudioFile = true;
                $q.loading.hide();
              }, 500);
            }

            if (eventData.value.stage == "5") {
              eventData.value.userAnswerLog[
                eventData.value.currentQuestion
              ].audioUrl = tempAudio;
            }
          }
        };

        if (eventData.value.stage == "5") {
          funcStopRecorderTimeIOS();
        }
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderIOS();
      }
    };

    const funcStopRecorderTimeIOS = () => {
      try {
        let setQuestionTimeOut =
          eventData.value.chapterData.sentences[eventData.value.currentQuestion]
            .timer;

        if (setQuestionTimeOut < 3000) {
          setQuestionTimeOut = 3000;
        } else if (setQuestionTimeOut > 10000) {
          setQuestionTimeOut = 10000;
        }

        listenerTimeout = setTimeout(() => {
          if (listenerTimeout) {
            clearTimeout(listenerTimeout);
          }

          if (isShowDialogErrorRecord.value) {
            funcEvaluate(-1);
          } else {
            funcOnStopRecorderIOS();
          }
        }, setQuestionTimeOut);
      } catch (e) {
        funcEvaluate(-1);
        funcOnStopRecorderIOS();
      }
    };

    const funcOnStopRecorderIOS = () => {
      if (listenerRecordTimeout) {
        clearInterval(listenerRecordTimeout);
      }

      if (eventData.value.isRecording) {
        mediaRecorder.stop();
        audioStream.getTracks().forEach((track) => track.stop());
        if (eventData.value.stage == "5") {
          recognition.stop();
        }
        audioChunks = [];
        eventData.value.isRecording = false;
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Check Answer
    let countAnswerIndex = 0;
    let countVoiceIndex = 0;
    const funcCheckAnswer = (voice) => {
      let voiceText = voice;

      if (
        eventData.value.userAnswerLog[eventData.value.currentQuestion].answer[
          countAnswerIndex
        ]
      ) {
        if (
          !eventData.value.userAnswerLog[eventData.value.currentQuestion]
            .answer[countAnswerIndex].ignore
        ) {
          if (
            eventData.value.userAnswerLog[
              eventData.value.currentQuestion
            ].answer[countAnswerIndex].text.localeCompare(
              voiceText[countVoiceIndex].heard,
              undefined,
              {
                sensitivity: "accent",
              }
            ) == 0
          ) {
            eventData.value.userAnswerLog[
              eventData.value.currentQuestion
            ].answer[countAnswerIndex].isCorrect = true;
          } else {
            eventData.value.userAnswerLog[
              eventData.value.currentQuestion
            ].answer[countAnswerIndex].isCorrect = false;
          }

          if (countVoiceIndex + 1 != voiceText.length) {
            countVoiceIndex++;
          } else {
            funcCompleteCheckAnswer();
            return;
          }
        } else {
        }
      } else {
        funcCompleteCheckAnswer();
        return;
      }

      countAnswerIndex++;
      funcCheckAnswer(voice);
    };
    // #endregion

    // #region Complete Check Answer
    const funcCompleteCheckAnswer = () => {
      let tempArr = [
        ...eventData.value.userAnswerLog[eventData.value.currentQuestion]
          .answer,
      ];

      tempArr = [...tempArr];

      let diff = Math.abs(
        resultTranscript.value.length -
          (tempArr.length - tempArr.filter((x) => x.ignore).length)
      );

      let differenceRule = 2;

      if (diff <= differenceRule) {
        let reverResultArray = [...tempArr];

        reverResultArray = reverResultArray.reverse();

        // Original Word
        let reverseResultWord = [
          ...eventData.value.userAnswerLog[eventData.value.currentQuestion]
            .answer,
        ];

        reverseResultWord = reverseResultWord.reverse();

        let reverseSpeakArray = resultTranscript.value
          .map((x) => x.heard)
          .filter((x) => x)
          .reverse();

        let counter = 0;
        for (let i = 0; i < reverseResultWord.length; i++) {
          if (reverseResultWord[i].ignore) {
            continue;
          }

          if (
            reverseResultWord[i].text.localeCompare(
              reverseSpeakArray[counter],
              undefined,
              { sensitivity: "accent" }
            ) === 0
          ) {
            reverResultArray[i].isCorrect = true;
          }

          counter++;
        }

        reverResultArray = reverResultArray.reverse();

        eventData.value.userAnswerLog[eventData.value.currentQuestion].answer =
          reverResultArray;
      }

      let score =
        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].answer.filter((x) => x.isCorrect).length /
        (eventData.value.chapterData.sentences[eventData.value.currentQuestion]
          .question.length -
          tempArr.filter((x) => x.ignore).length);

      // console.log({ score });

      funcEvaluate(score);
    };
    // #endregion

    // #region Evaluate
    const funcEvaluate = (calculatedScore) => {
      if (calculatedScore == -1) {
        if (listenerTimeout) {
          clearTimeout(listenerTimeout);
        }

        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].isSendAnswer = false;

        eventData.value.userAnswerLog[
          eventData.value.currentQuestion
        ].answer.map((x) => (x.isCorrect = false));

        if (eventData.value.tempUserAudio) {
          eventData.value.tempUserAudio.pause();
          eventData.value.tempUserAudio = null;
        }

        isShowDialogErrorRecord.value = true;

        $q.loading.hide();
        return;
      }

      if (
        !eventData.value.chapterData.sentences[eventData.value.currentQuestion]
          .score
      ) {
        eventData.value.chapterData.sentences[
          eventData.value.currentQuestion
        ].score = 0;
      }

      eventData.value.chapterData.sentences[
        eventData.value.currentQuestion
      ].score = calculatedScore;

      let totalScore = Math.round(
        (eventData.value.chapterData.sentences
          .map((x) => x.score || 0)
          .reduce((a, b) => a + b, 0) /
          eventData.value.chapterData.sentences.length) *
          100
      );

      let star =
        totalScore >= 90 ? 3 : totalScore >= 80 ? 2 : totalScore >= 70 ? 1 : 0;

      eventData.value.chapterData.star = star;

      eventData.value.chapterData.score = totalScore;

      console.log({ totalScore }, { star });

      eventData.value.userAnswerLog[
        eventData.value.currentQuestion
      ].isSendAnswer = true;

      countAnswerIndex = 0;
      countVoiceIndex = 0;
      resultTranscript.value = "";
    };
    // #endregion

    // #region Similarity
    const funcSimilarity = (original, transcript) => {
      // console.log("transcript: ", transcript);
      // console.log("original: ", original);
      var longer = original.replace(/’/g, "'");
      var shorter = transcript.replace(/’/g, "'");

      let originalForScore = longer;
      let transcriptForScore = shorter;

      if (original.length < transcript.length) {
        originalForScore = shorter;
        transcriptForScore = longer;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }

      let copyLonger = longer
        .replace(/\./g, "")
        .replace(/\!/g, "")
        .replace(/,/g, "");

      let copyShorter = shorter
        .replace(/\./g, "")
        .replace(/\!/g, "")
        .replace(/,/g, "");

      let originalSplit = copyLonger.split(" ");
      let transcriptSplit = copyShorter.split(" ");

      let resultCompare = [];

      for (let i = 0; i < transcriptSplit.length; i++) {
        let o = originalSplit[i] || "";
        let t = transcriptSplit[i] || "";
        let result = {
          heard: t,
          correctWord: o,
        };

        if (t.localeCompare(o, undefined, { sensitivity: "accent" }) == 0) {
          result.isCorrect = true;
        } else {
          result.isCorrect = false;
        }
        resultCompare.push(result);
      }

      let score =
        resultCompare.filter((x) => x.isCorrect).length / originalSplit.length;

      let compareScore = score;

      return { compareScore, resultCompare };
    };
    // #endregion

    // #region convert number to text
    const convertNumberToText = (num) => {
      const units = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      const teens = [
        "",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
      ];
      const tens = [
        "",
        "ten",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];

      const thousands = ["", "thousand", "million", "billion", "trillion"];

      function convertLessThanThousand(num) {
        if (num === 0) return "";
        else if (num < 10) return units[num];
        else if (num < 20) return teens[num - 10];
        else {
          const tenDigit = Math.floor(num / 10);
          const oneDigit = num % 10;
          return tens[tenDigit] + (oneDigit !== 0 ? " " + units[oneDigit] : "");
        }
      }

      function convert(num) {
        if (num === 0) return "zero";

        let result = "";
        for (let i = 0; num > 0; i++) {
          const threeDigits = num % 1000;
          if (threeDigits !== 0) {
            result =
              convertLessThanThousand(threeDigits) +
              " " +
              thousands[i] +
              " " +
              result;
          }
          num = Math.floor(num / 1000);
        }

        return result.trim();
      }

      return convert(num);
    };
    // #endregion

    // #region Back to lobby
    const funcBackToLobby = () => {
      $q.loading.show();
      setTimeout(() => {
        $router.push("/lobby");
        $q.loading.hide();
      }, 500);
    };
    // #endregion

    // #region Check Microphone
    const isShowDialogCheckMicrophone = ref(false);
    let listenPermissions;
    const funcCheckMicrophone = async () => {
      eventData.value.isLoading = true;

      listenPermissions = await navigator.permissions.query({
        name: "microphone",
      });

      if (listenPermissions.state === "granted") {
        isShowDialogCheckMicrophone.value = false;
      } else if (listenPermissions.state === "prompt") {
        isShowDialogCheckMicrophone.value = true;
        setTimeout(() => {
          eventData.value.isLoading = false;
        }, 500);
        return navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => track.stop());
            isShowDialogCheckMicrophone.value = false;
          })
          .catch((error) => {
            isShowDialogCheckMicrophone.value = true;
            console.error(error);
          });
      } else if (listenPermissions.state === "denied") {
        isShowDialogCheckMicrophone.value = true;
        setTimeout(() => {
          eventData.value.isLoading = false;
        }, 500);
      }

      listenPermissions.onchange = async function (e) {
        if (e.target.state == "denied") {
          isShowDialogCheckMicrophone.value = true;
          setTimeout(() => {
            eventData.value.isLoading = false;
          }, 500);
        } else if (e.target.state === "prompt") {
          isShowDialogCheckMicrophone.value = true;
          setTimeout(() => {
            eventData.value.isLoading = false;
          }, 500);
          return navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              stream.getTracks().forEach((track) => track.stop());
              isShowDialogCheckMicrophone.value = false;
            })
            .catch((error) => {
              isShowDialogCheckMicrophone.value = true;
              console.error(error);
            });
        }
      };

      setTimeout(() => {
        eventData.value.isLoading = false;
      }, 1000);
    };
    // #endregion

    // #region Runing Animation Coin
    const accuracyNumber = ref(0);
    const bestAccuracyNumber = ref(0);
    const summaryCoinNumber = ref(0);
    const funcRunNumberAnimation = () => {
      accuracyNumber.value = 0;
      bestAccuracyNumber.value = 0;
      summaryCoinNumber.value = 0;

      setTimeout(() => {
        if (eventData.value.chapterData.score != 0) {
          let listenAccuracyRunNumber = setInterval(() => {
            accuracyNumber.value++;
            if (accuracyNumber.value >= eventData.value.chapterData.score) {
              clearInterval(listenAccuracyRunNumber);
            }
          }, 10);
        }

        if (eventData.value.chapterData.highScore != 0) {
          let listenBestAccuracyRunNumber = setInterval(() => {
            bestAccuracyNumber.value++;
            if (
              bestAccuracyNumber.value >= eventData.value.chapterData.highScore
            ) {
              clearInterval(listenBestAccuracyRunNumber);
            }
          }, 10);
        }

        if (eventData.value.chapterData.coin != 0) {
          let setCoin = eventData.value.chapterData.coin;

          if (eventData.value.chapterData.star == "3") {
            setCoin += 300;
          }

          if (eventData.value.chapterData.isSpecialChapter) {
            setCoin = setCoin * 3;
          }

          setTimeout(() => {
            let listenCoinRunNumber = setInterval(() => {
              summaryCoinNumber.value++;
              if (summaryCoinNumber.value >= setCoin) {
                clearInterval(listenCoinRunNumber);
              }
            }, 5);
          }, 500);
        }
      }, 1000);
    };
    // #endregion

    // #region Get Reward
    const funcGetEventStore = async () => {
      const eventStore = useEventStore();
      const courseStore = useCourseStore();

      eventData.value.isLoading = true;
      const tempResponseCurrentStage =
        await eventStore.getCurrentSpeakUpStage();
      const tempReponseTopics = await eventStore.getSpeakUpTopics();
      await eventStore.getSpeakUpItemShop();
      await eventStore.getSpeakUpRewardSetting();
      await courseStore.getCourse();

      let findStoryData = tempReponseTopics.find(
        (item) => item.topicId == courseStore.course.data.selectedSpeakUpTopic
      );

      eventData.value = {
        ...eventData.value,
        ...eventStore.speakUp.data,
        stage: tempResponseCurrentStage || "0",
        eventCoin: courseStore.course.data.eventCoin || 0,
        storyList: tempReponseTopics,
        storyId: courseStore.courseData.selectedSpeakUpTopic || "-",
        storyData: findStoryData,
        isRecievedSpeakUpPosttestReward:
          courseStore.course.data.isRecievedSpeakUpPosttestReward || false,
      };
    };
    // #endregion

    // #region Show Dialog Log Answer
    const funcShowDialogLogAnswer = () => {
      if (eventData.value.tempUserAudio) {
        eventData.value.tempUserAudio.pause();
      }

      if (eventData.value.tempQuestionAudio) {
        eventData.value.tempQuestionAudio.pause();
      }

      eventData.value.isShowDialogUserAnswerLog = true;
    };
    // #endregion
    // #endregion ***** Function *****

    onMounted(async () => {
      console.clear();

      const systemStore = useSystemStore();

      systemStore.setRouter("speak-up");

      await funcGetEventStore();

      funcCheckMicrophone();
    });

    return {
      // Store
      eventStore: useEventStore(),

      // Data
      starList,
      eventData,

      // Animation Run Number
      accuracyNumber,
      bestAccuracyNumber,
      summaryCoinNumber,

      // Dialog
      isShowDialogCheckMicrophone,
      isShowDialogErrorRecord,

      // Function
      funcCheckMicrophone,
      funcBackToLobby,
      funcShowDialogLogAnswer,

      // Computed Stage
    };
  },
};
</script>

<style lang="scss" >
// #region Container Main
.background-main {
  min-width: 1400px;
  background-image: url("/images/speakup_main/speakup-backdrop.png");
  position: relative;
  box-sizing: inherit;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}

.background-main.mobile {
  min-width: 320px !important;
  background-image: url("/images/speakup_main/speakup-background-mobile.png");
  background-position: 50% 32%;
  background-size: cover;
}

.box-speakup-container {
  max-width: 1600px;
  width: 100%;
  min-width: 1400px;
  margin: auto;
}

.box-speakup-container.mobile {
  max-width: 100%;
  width: 100%;
  min-width: 360px;
  height: 100%;
  margin: auto;
}
// #endregion

// #region Box Content
.box-content-container {
  width: 320px;
  border: 3px solid #4b1e0a;
  border-radius: 10px;
  background-color: #7f4429;
  padding-bottom: 5px;
}

.box-content-sub {
  background-color: #ba6f4d;
  border-radius: 7px;
  padding: 7px;
}

.box-content-header {
  height: 33px;
}

.box-label-header {
  position: absolute;
  top: 0;
}

.box-content-body {
  color: #4b1e0a;
  background-color: #fff2e5;
  border-radius: 10px;
  padding: 5px;
}

.box-content-body.story-content {
  border-radius: 7px 7px 0px 0px;
}

.box-content-scroll {
  height: 450px;
  color: #4a261b;
  font-size: 14px;
  overflow-y: scroll;
  padding: 7px;
}

.box-content-scroll.activity {
  height: 270px !important;
}

.box-content-scroll.story-menu {
  height: fit-content !important;
}

.box-content-scroll.story-content {
  height: 350px !important;
}

.box-content-scroll::-webkit-scrollbar {
  width: 5px;
}

.box-content-scroll::-webkit-scrollbar-track {
  background: #fff2e5;
}

.box-content-scroll::-webkit-scrollbar-thumb {
  background: #eec894;
  border-radius: 2px;
}

.box-content-footer {
  padding-top: 10px;
  padding-bottom: 5px;
}

// #endregion

// #region Button Content
.button-speakup-main {
  width: 100px;
  cursor: default;
}

.button-speakup-main.size-300 {
  width: 300px !important;
}

.button-speakup-main.size-280 {
  width: 280px !important;
}

.button-speakup-main.size-270 {
  width: 270px !important;
}

.button-speakup-main.size-200 {
  width: 200px !important;
}

.button-speakup-main.size-180 {
  width: 180px;
}

.button-speakup-main.size-138 {
  width: 138px !important;
}

.button-speakup-main.size-70 {
  width: 70px !important;
}

.button-speakup-main.size-60 {
  width: 60px !important;
}

.button-speakup-main.size-48 {
  width: 48px !important;
}

.button-speakup-main.size-45 {
  width: 45px !important;
}

.button-speakup-main.size-40 {
  width: 40px !important;
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

.button-speakup-main.disable {
  cursor: not-allowed;
}
// #endregion

// #region Dialog
.box-dialog-container {
  width: 320px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 10px;
  padding-bottom: 5px;
}

.box-dialog-sub {
  width: 100%;
  background-color: #ba6f4d;
  border-radius: 7px;
  padding: 10px;
}

.box-dialog-header {
  height: 35px;
}

.box-dialog-body {
  color: #4a261b;
  background-color: #fff2e5;
  border-radius: 10px;
  padding: 10px;
}

.dialog-body-scroll {
  height: 420px;
  overflow: auto;
}

.dialog-body-scroll::-webkit-scrollbar {
  width: 6px;
}

.dialog-body-scroll::-webkit-scrollbar-track {
  background: #fff2e5;
}

.dialog-body-scroll::-webkit-scrollbar-thumb {
  background: #eec894;
  border-radius: 2px;
}

.dialog-body-scroll.shop {
  height: 340px !important;
}

.box-log-content {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 2px 3px 1px rgba(0, 0, 0, 0.3);
  padding: 10px 15px;
  color: #4a261b;
  transition: background-color 0.5s;
}

.box-log-content.playing {
  background-color: #ffe0b4 !important;
  transition: background-color 0.5s;
}

.box-log-separate-border {
  border: 1px dashed #4a261b;
  border-radius: 50px;
  margin: 10px 3px;
}

.box-dialog-footer {
  padding-top: 10px;
  padding-bottom: 5px;
}

.text-title {
  position: relative;
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px, rgb(75, 30, 10) 0px 3px 1px,
    rgb(75, 30, 10) 2px 3px 1px, rgb(75, 30, 10) -1px 3px 1px;
}

.box-dialog-finish-container {
  width: 320px;
  height: 100%;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 40px;
  padding-bottom: 10px;
}

.box-dialog-finish-sub {
  width: 100%;
  background-color: #ba6f4d;
  border-radius: 37px;
  padding: 10px;
}

.box-dialog-finish-content {
  background-color: #fff2e5;
  color: #4b1e0a;
  border-radius: 37px;
  padding: 15px;
}

.box-dialog-finish-footer {
  padding-top: 10px;
  padding-bottom: 5px;
}

.animation-star {
  animation: star 0.1s forwards alternate;
  transform: translateY(-100px);
  opacity: 0;
}

@keyframes star {
  from {
    transform: translateY(-100px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
}

.text-new {
  position: relative;
  color: #fff;
  background-color: #f44336;
  border-radius: 2px;
  padding: 0px 3px;
  text-align: center;
}
.text-score {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

.box-sum-score {
  position: relative;
  height: 50px;
  background-color: #7f4429;
  border: 2px solid #4a261b;
  border-radius: 25px;
  box-shadow: inset 0px 2px 3px 1px rgba(0, 0, 0, 0.3);
}

.text-diamond {
  position: relative;
  font-size: 12px;
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}
// #endregion
</style>
