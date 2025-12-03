<template>
  <q-page class="box-container-backdrop-main row justify-center items-center" :class="{'loading':isShowDialogLoading}">

    <div class="box-container-main relative-position" :class="{'mobile':isMobile}">

      <svg
        width="1600"
        height="900"
        viewBox="0 0 1600 900"
        style="width: 100%; height: 100%; margin-bottom: -5px"
        xmlns="http://www.w3.org/2000/svg"
        v-if="!isMobile"
      >
      </svg>

      <!-- #region Win town -->
      <div
        class="scrollable-background-container"
        ref="scrollContainer"
        v-if="!isShowDialogLoading"
        :class="{ 'dragging': isDragging }"
        id="scrollable-background-container"
        @pointerdown="handlePointerDown"
        @pointermove="handlePointerMove"
        @pointerup="handlePointerUp"
        @pointerleave="handlePointerUp"
        @pointercancel="handlePointerUp"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @wheel="handleWheel"
      >
        <div
          class="zoomed-background-wrapper"
          ref="backgroundWrapper"
          :class="{'mobile':isMobile}"
          :style="{ transform: `translate(${translateX}px, ${translateY}px) scale(${isMobile ? scale : 1})`}"
        >
          <winner-town class="animation-fade-in zoomed-background" :class="{'mobile':isMobile}" @callback-handleNpc="funcHandleNpc"></winner-town>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button -->
      <div v-if="!isShowDialogLoading" class="animation-fade-in" :class="{'mobile':isMobile}">
        <div class="button-lobby" :class="{'fixed-bottom-right mobile':isMobile,'absolute':!isMobile}" @click="funcHandleButton('lobby')">
          <q-img src="/images/winner_town_main/button-lobby.webp" no-spinner no-transition></q-img>
        </div>

        <div class="absolute-top-right box-button-header-main" :class="{'row justify-end':!isMobile,'mobile':isMobile}">
          <div class="button-shop" :class="{'mobile':isMobile}" @click="funcHandleButton('shop')" v-if="false">
            <q-img src="/images/winner_town_main/button-shop.webp" no-spinner no-transition></q-img>
          </div>

          <div class="button-quest" :class="{'mobile':isMobile}" @click="funcHandleButton('quest')" v-if="false">
            <q-img src="/images/winner_town_main/button-quest.webp" no-spinner no-transition></q-img>
          </div>

          <div class="button-guide" :class="{'mobile':isMobile}" @click="funcHandleButton('guide')" v-if="!isMobile">
            <q-img src="/images/winner_town_main/button-guide.webp" no-spinner no-transition></q-img>
          </div>

          <div class="button-mail" :class="{'mobile':isMobile}" @click="funcHandleButton('mailbox')" >
            <q-img src="/images/winner_town_main/button-mail.webp" no-spinner no-transition></q-img>
          </div>

          <div class="button-setting" :class="{'mobile':isMobile}" @click="funcHandleButton('setting')" >
            <q-img src="/images/winner_town_main/button-setting.webp" no-spinner no-transition></q-img>
          </div>
        </div>

        <!-- #region Level -->
        <box-level></box-level>
        <!-- #endregion -->

        <!-- #region Student Profile -->
        <student-profile></student-profile>
        <!-- #endregion -->

        <!-- #region Box coin -->
        <box-coin v-if="!isMobile"></box-coin>
        <!-- #endregion -->

        <!-- #region Zoom Controls for Mobile -->
        <div v-if="isMobile && false" class="absolute box-zoom-controls">
          <div class="button-zoom-in" @click="funcZoomIn">
            <q-icon name="zoom_in" size="24px" color="white"></q-icon>
          </div>
          <div class="button-zoom-out" @click="funcZoomOut">
            <q-icon name="zoom_out" size="24px" color="white"></q-icon>
          </div>
          <div class="text-zoom-level">{{ scale }}x</div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Speaking -->
      <div class="absolute-center fit z-max box-speak-container-main" v-if="isShowSpeaking">
        <div class="relative-position fit animate__animated" :class="{'animate__fadeIn':isAnimation,'animate__fadeOut':!isAnimation}">

          <!-- #region Speaking -->
          <div class="relative-position fit">
            <div class="absolute-bottom box-footer-main" :class="{'mobile':isMobile}">
              <q-img src="/images/winner_town_main/box-footer-speak.webp" no-spinner no-transition></q-img>
            </div>

            <div class="absolute-bottom box-content-speak-main" :class="{'mobile':isMobile}">
              <!-- #region ข้อมูลการแชท และ ตัวละคร -->
              <div class="relative-poosition">
                <div class="absolute box-character-main npc" :class="{'mobile':isMobile}">
                  <q-img :src="`/images/winner_town_main/${selectedNpc.name}.webp`" no-spinner no-transition></q-img>
                </div>

                <div class="absolute box-character-main student" :class="{'mobile':isMobile}">
                  <character :isAnimation="false" :isPet="false"></character>
                </div>

                <div class="box-speak-main relative-position" :class="{'mobile':isMobile}">
                  <div class="relative-position box-speak-content" :class="{'mobile':isMobile}" ref="speakContentRef">
                    <div v-for="(item,index) in speakingList" :key="index">
                      <div class="column" :class="{'items-end':item.role == 'user'}" >
                        <div
                          class="box-speak-item relative-position"
                          :class="{
                            'mobile':isMobile,
                          }"
                          :align="item.role == 'user' ? 'right' : 'left'"
                        >
                          <div class="box-speak-text text-speak-content" :class="{'student': item.role == 'user'}" v-html="`${item.isTranslate ? item.thaiTranslation : item.content}`"></div>

                          <!-- #region ปุ่ม แปลภาษา, เล่นเสียง, ข้อมูล -->
                          <div class="row justify-end">
                            <div class="box-button-speak row" :class="{'mobile':isMobile,'student':item.role == 'user'}">
                              <div class="button-translate " :class="{'mobile':isMobile}" v-if="item.role != 'user'" @click="funcTranslateSpeaking(index)">
                                <q-img src="/images/winner_town_main/button-translate.webp" no-spinner no-transition></q-img>
                              </div>
                              <div class="button-info " :class="{'mobile':isMobile}" v-if="item.role == 'user'" @click="funcShowInfoSpeaking(index)">
                                <q-img src="/images/winner_town_main/button-info.webp" no-spinner no-transition></q-img>
                              </div>
                              <div class="button-sound " :class="{'mobile':isMobile}">
                                <q-img src="/images/winner_town_main/button-sound.webp" no-spinner no-transition></q-img>
                              </div>
                            </div>
                          </div>
                          <!-- #endregion -->
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="absolute box-name npc font-mali-b" :class="{'mobile':isMobile}">
                    {{ `${selectedNpc.name}` }}
                  </div>

                  <div class="absolute box-name student font-mali-b" :class="{'mobile':isMobile}">
                    {{ `${studentStore.characterName}` }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ตัวกรองข้อความ -->
              <div class="box-speak-input row" :class="{'mobile':isMobile}">
                <div class="col">
                  <div class="box-input" :class="{'mobile row items-center':isMobile,'validate':showHintSpeaking > 80}">
                    <q-input :readonly="isSendAnswer" v-model="inputSpeaking" placeholder="Ready to chat? Just type or talk!" dense borderless input-class="no-padding no-margin" :input-style="`height:fit-content;color:${showHintSpeaking > 0 && showHintSpeaking < 80 ? '#000' : showHintSpeaking > 80 ? '#f00' : '#B57500'}`"  class="box-input" :class="{'font-mali-m':isMobile,'font-mali-r':!isMobile,'validate':showHintSpeaking > 80}" lang="en" @keyup.enter="funcSendSpeaking()" @click="funcShowDialogInput()" @keydown="funcPreventNonEnglish" @input="funcFilterNonEnglishOnMobile" @paste="funcHandlePaste"></q-input>
                  </div>
                  <div class="text-hint" :class="{'mobile font-mali-m':isMobile,'font-mali-r':!isMobile,'validate':showHintSpeaking > 80}" align="right">
                    {{ `${showHintSpeaking}/80` }}
                  </div>
                </div>
                <q-space></q-space>
                <div class="col-1 self-center button-record" v-if="!isMobile" @click="funcHandleRecordButton">
                  <q-img :src="`/images/winner_town_main/button-record${isRecording ? '' : microphonePermissionState !== 'granted' && microphonePermissionState !== 'unknown' && microphonePermissionState !== 'denied' ? '-disable' : ''}.webp`" no-spinner no-transition></q-img>
                </div>
                <div class="col-1 self-center button-send" :class="{'mobile':isMobile}" @click="funcSendSpeaking()">
                  <q-img :src="`/images/winner_town_main/button-send${showHintSpeaking > 80 ? '-disable' : showHintSpeaking > 0 ? '' : '-disable'}.webp`" no-spinner no-transition></q-img>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <div class="absolute-top-right button-close-speak" :class="{'mobile':isMobile}" @click="funcCloseSpeaking()">
              <q-img src="/images/winner_town_main/button-close-speak.webp" no-spinner no-transition></q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Info Speaking -->
          <div class="fit box-backdrop-speaking-main row justify-center items-center"  :class="{'mobile fixed-center':isMobile,'absolute-center':!isMobile}" v-if="isShowInfoSpeaking">
            <div class="box-speaking-info relative-position animate__animated" :class="{'mobile':isMobile,'animate__zoomIn':isAnimation,'animate__zoomOut':!isAnimation}">
              <div class="row justify-center no-wrap">
                <div class="self-center col-1 icon-bulb" :class="{'mobile':isMobile}">
                  <q-img src="/images/winner_town_main/icon-bulb.webp" no-spinner no-transition></q-img>
                </div>
                <div class="self-center text-title-info font-mali-b" :class="{'mobile':isMobile}">
                  Smart Writing Assistant: Fix & Explain
                </div>
              </div>

              <div class="box-content-info" :class="{'mobile':isMobile}">
                <div class="box-content-info-item" :class="{'mobile':isMobile}">
                  <div class="text-header" :class="{'mobile':isMobile}">
                    Your message
                  </div>
                  <div class="text-content font-mali-m" :class="{'mobile':isMobile}">
                   {{ `${showContentInfoSpeaking.content}` }}
                  </div>
                </div>

                <div class="box-separator"></div>

                <div class="box-content-info-item" :class="{'mobile':isMobile}">
                  <div class="text-header" :class="{'mobile':isMobile}">
                    Corrected message
                  </div>
                  <div class="text-content font-mali-m" :class="{'mobile':isMobile}">
                    <span v-html="showContentInfoSpeaking.feedback"></span>
                  </div>
                </div>

              </div>

              <div class="absolute-top-right button-close-info" :class="{'mobile':isMobile}" @click="funcCloseInfoSpeaking()">
                <q-img src="/images/winner_town_main/button-close-info.webp" no-spinner no-transition></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Alert Speaking end -->
          <div class="absolute-center fit box-alert-backdrop-speaking-main row justify-center items-center" v-if="isShowAlertSpeakingEnd">

            <div class="box-speaking-end absolute-center" v-if="!isMobile">
              <q-img src="/images/winner_town_main/backdrop-speaking-end.webp" no-spinner no-transition></q-img>
            </div>

            <div class="absolute-center box-alert-speaking-end" :class="{'mobile':isMobile}">
              <div class="relative-position fit">
                <q-img :src="`/images/winner_town_main/box-alert-speaking-end${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>

                <div class="absolute-bottom button-close-alert-speaking" :class="{'mobile':isMobile}" @click="funcCloseSpeaking()">
                  <q-img :src="`/images/winner_town_main/button-infomed${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Dialog Input -->
          <div class="fixed-center box-backdrop-main row" @click="isShowDialogInput = false" v-if="isShowDialogInput">
            <div class="absolute-bottom box-speak-input row dialog" :class="{'mobile':isMobile}" :style="dialogInputInlineStyle">
              <div class="col">
                <!-- :input-style="{'color:#f00;':showHintSpeaking > 80,}" -->
                <div class="box-input" :class="{'mobile row items-center':isMobile,'validate':showHintSpeaking > 80}">
                  <q-input v-model="inputSpeaking" placeholder="Ready to chat? Just type or talk!" dense borderless input-class="no-padding no-margin" :input-style="`height:fit-content;color:${showHintSpeaking > 0 && showHintSpeaking < 80 ? '#000' : showHintSpeaking > 80 ? '#f00' : '#B57500'}`"  class="box-input" :class="{'font-mali-m':isMobile,'font-mali-r':!isMobile,'validate':showHintSpeaking > 80}" lang="en" @click="funcShowDialogInput()" @keydown="funcPreventNonEnglish" @input="funcFilterNonEnglishOnMobile" @paste="funcHandlePaste"></q-input>
                </div>
                <div class="text-hint" :class="{'mobile font-mali-m':isMobile,'font-mali-r':!isMobile,'validate':showHintSpeaking > 80}" align="right">
                  {{ `${showHintSpeaking}/80` }}
                </div>
              </div>
              <q-space></q-space>
              <div class="col-1 self-center button-send" :class="{'mobile':isMobile}">
                <q-img :src="`/images/winner_town_main/button-send${showHintSpeaking > 80 ? '-disable' : showHintSpeaking > 0 ? '' : '-disable'}.webp`" no-spinner no-transition></q-img>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Tutorial Talk -->

      <!-- #region Desktop -->
      <div class="absolute-center fit box-overlay-background" :class="{'tutorial':isTutorial}" v-if="isTalk && !isMobile || isTutorial && !isMobile">
        <div class="relative-position box-talk-container-main animate__animated" :class="{'animate__fadeIn':isAnimation,'animate__fadeOut':!isAnimation}">
          <q-img src="/images/winner_town_main/box-talk-container.webp" class="animate__animated animate__fadeIn" v-if="isTalk" no-spinner no-transition></q-img>
          <div class="absolute box-talk-main" v-if="isTalk">
            <div class="relative-position fit">
              <q-img src="/images/winner_town_main/box-talk.webp" no-spinner no-transition></q-img>

              <div class="absolute box-content-talk-main">
                <div class="text-talk font-mali-b" v-html="`${showContentTutorial.text}`">
                </div>
                <!-- <div v-if="showContentTutorial.isInput">
                  <div class="box-input-main">
                    <q-input
                      placeholder="โปรดระบุชื่อ"
                      input-class="fit font-mali-m no-padding no-margin"
                      input-style="color: #4A261B;"
                      class="no-padding no-margin"
                      v-model="nickname"
                      style="width:100%;height:100%;font-size:24px;padding:0px;margin:0px;"
                      borderless
                      :error="!!nicknameError"
                      :error-message="nicknameError"
                    ></q-input>
                  </div>
                </div> -->
              </div>
            </div>
          </div>

          <div class="absolute box-tutorial-main" v-if="isTutorial">
            <q-img :src="showContentTutorial.desktop" no-spinner no-transition></q-img>
          </div>

          <div class="absolute box-button-next-talk" @click="funcNextTalk()" v-if="!isShowStartButton">
            <q-img :src="`/images/winner_town_main/button-next-talk.webp`" fit="" no-spinner no-transition></q-img>
          </div>

          <div class="absolute box-button-start-town" @click="funcStartTown()" v-if="isShowStartButton">
            <q-img :src="`/images/winner_town_main/button-start.webp`" fit="" no-spinner no-transition></q-img>
          </div>

          <div class="absolute box-character-main" v-if="isTalk && !isMobile">
            <q-img src="/images/winner_town_main/character-main.webp" no-spinner no-transition></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="fixed-center fit box-overlay-background" v-if="isTalk && isMobile || isTutorial && isMobile">
        <div class="relative-position box-talk-container-main mobile animate__animated" :class="{'animate__fadeIn':isAnimation,'animate__fadeOut':!isAnimation}">
          <q-img class="absolute-center" style="width:100%;height:100vh;" :src="`/images/winner_town_main/box-talk-container-mobile.webp`" no-spinner no-transition v-if="!isTutorial"></q-img>
          <div class="relative-position box-talk-mobile" v-if="isTalk">
            <!-- เพิ่มตัวละคร box talk mobile -->
            <div class="absolute-bottom-right" style="bottom:-80px;right:-65px;width:420px;">
              <div class="relative-position">
                <q-img src="/images/winner_town_main/box-talk-mobile.webp" no-spinner no-transition style="width:100%;height:auto;"></q-img>

                <div class="absolute box-talk-content-mobile">
                  <div class="text-talk font-mali-b" v-html="`${showContentTutorial.text}`">
                  </div>
                  <!-- <div v-if="showContentTutorial.isInput">
                    <div class="box-input-main">
                      <q-input
                        placeholder="โปรดระบุชื่อ"
                        input-class="fit font-mali-m no-padding no-margin"
                        input-style="color: #4A261B;"
                        class="no-padding no-margin"
                        v-model="nickname"
                        style="width:100%;height:100%;font-size:24px;padding:0px;margin:0px;"
                        borderless
                        :error="!!nicknameError"
                        :error-message="nicknameError"
                      ></q-input>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>

            <!-- สร้างปุ่มถัดไป -->
            <div class="absolute-bottom-left" style="left:50px;bottom:30px;display:flex;justify-content:center;">
              <div class="box-button-next-talk" @click="funcNextTalk()" style="position:unset;width:158px;">
                <q-img :src="`/images/winner_town_main/button-next-talk.webp`" no-spinner no-transition></q-img>
              </div>
            </div>
          </div>

          <div class="absolute-center fit box-backdrop-main" style="background:rgba(0,0,0,.2)" v-if="isTutorial">
            <div class="relative-position box-tutorial-mobile" >
              <q-img :src="showContentTutorial.mobile" no-spinner no-transition></q-img>

              <div class="absolute box-button-next-tutorial" @click="funcNextTalk()" style="bottom:20px;left:50%;transform:translateX(-50%);width:158px;" v-if="!isShowStartButton">
                <q-img :src="`/images/winner_town_main/button-next-talk.webp`" no-spinner no-transition></q-img>
              </div>

              <div class="absolute box-button-start-town" style="bottom:20px;left:50%;transform:translateX(-50%);width:158px;" @click="funcStartTown()" v-if="isShowStartButton">
                <q-img :src="`/images/winner_town_main/button-start.webp`" fit="" no-spinner no-transition></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region Guide Dialog -->
      <div class="absolute-center fit z-max box-guide-main row justify-center items-center" v-if="isShowGuideDialog">
        <div class="relative-position box-content-guide-main animate__animated" :class="{'animate__zoomIn':isAnimation,'animate__zoomOut':!isAnimation,'mobile':isMobile}">
          <q-img :src="`/images/winner_town_main/box-guide-modal${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>
          <div class="absolute-bottom box-guide-buttons" :class="{'mobile':isMobile,'row justify-center':!isMobile}">
            <div class="button-cancel-guide" :class="{'mobile':isMobile}" @click="funcCloseGuideDialog()">
              <q-img :src="`/images/winner_town_main/button-cancel-guide${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>
            </div>
            <div class="button-informed-guide" :class="{'mobile':isMobile}" @click="funcGuideInformed()">
              <q-img :src="`/images/winner_town_main/button-infomed${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Cloud Animation -->
      <cloud-animation v-if="!isShowDialogLoading && isOpeningTown" @callback-finish="isShowWinnerTown = true"></cloud-animation>
      <!-- #endregion -->

      <!-- #region Winner Loading -->
      <winner-loading :progress="progressLoading" v-if="isShowDialogLoading">
      </winner-loading>
      <!-- #endregion -->

      <!-- #region Dialog Setting -->
      <dialog-setting v-if="isShowDialogSetting" @callback-closeDialog="isShowDialogSetting = false"></dialog-setting>
      <!-- #endregion -->

      <!-- #region Dialog Out of Wintown -->
      <dialog-out-of-wintown v-if="isShowDialogOutOfWintown" @callback-closeDialog="isShowDialogOutOfWintown = false"></dialog-out-of-wintown>
      <!-- #endregion -->

      <!-- #region Alert Allow Microphone -->
      <alert-allow-microphone v-if="isShowAlertAllowMicrophone" @callback-closeDialog="isShowAlertAllowMicrophone = false"></alert-allow-microphone>
      <!-- #endregion -->

      <!-- #region Dialog Mailbox -->
      <dialog-mailbox v-if="isShowDialogMailbox" @callback-closeDialog="isShowDialogMailbox = false"></dialog-mailbox>
      <!-- #endregion -->

      <!-- #region Loading -->
      <loading v-if="isLoading" :text="loadingText"></loading>
      <!-- #endregion -->

      <!-- #region Dialog alert -->
      <div class="absolute-top box-dialog-alert-main z-max" v-if="isShowDialogAlert">
        <div class="relative-position box-alert animate__animated " :class="{'animate__fadeInDown':isAlertAnimation,'animate__fadeOutUp':!isAlertAnimation}">
          <div v-html="`เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง`"></div>
        </div>
      </div>
      <!-- #endregion -->
    </div>

  </q-page>
</template>

<script setup>
import character from "src/components/character_main/character.vue";
import boxCoin from "src/components/student_main/box-coin.vue";
import boxLevel from "src/components/student_main/box-level.vue";
import studentProfile from "src/components/student_main/student-profile.vue";
import dialogSetting from "src/components/dialog_main/dialog-setting-new.vue";
import dialogOutOfWintown from "src/components/winner_town_main/dialog-out-of-wintown.vue";
import dialogMailbox from "src/components/dialog_main/dialog-mailbox.vue";
import alertAllowMicrophone from "src/components/winner_town_main/alert-allow-microphone.vue";
import winnerTown from 'src/components/winner_town_main/winner-town-map.vue';
import cloudAnimation from 'src/components/winner_town_main/cloud-animation.vue';
import WinnerLoading from 'components/winner_town_main/winner-loading.vue';
import loading from 'components/winner_town_main/loading.vue';
import { ref, onMounted, nextTick, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import wordRude from 'src/js/wordrude.js';
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import axios from "axios";
import { useSchoolStore } from "src/stores/school";

const $q = useQuasar();
const $router = useRouter();

const studentStore = useStudentStore();
const systemStore = useSystemStore();
const schoolStore = useSchoolStore();

const path = ref(`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/tutorial/wintown`)

const isMobile = ref($q.platform.is.mobile);
const isOpeningTown = ref(true);
const isShowWinnerTown = ref(false);
const isShowDialogSetting = ref(false);
const isShowDialogOutOfWintown = ref(false);
const isShowAlertAllowMicrophone = ref(false);
const microphonePermissionState = ref('unknown');
const isRecording = ref(false);
const loadingText = ref('โปรดรอสักครู่...');
let mediaRecorder = null;
let audioStream = null;
let audioChunks = [];
let audioContext = null;
let analyserNode = null;
let silenceTimer = null;
let lastSoundTime = null;
const SILENCE_THRESHOLD = 30; // ระดับเสียงต่ำสุด (0-255)
const SILENCE_DURATION = 3000; // ระยะเวลาเงียบ (3 วินาที)
const isShowDialogMailbox = ref(false);
const isShowSpeaking = ref(false);
const isShowAlertSpeakingEnd = ref(false);
const isShowDialogInput = ref(false)
const isShowInfoSpeaking = ref(false);
const isShowGuideDialog = ref(false);
const isLoading = ref(false)
const isAnimation = ref(true);
const isShowDialogAlert = ref(false);
const isAlertAnimation = ref(true);
const nickname = ref("")
const nicknameError = ref('');
const inputSpeaking = ref("");
const dialogInputBottomOffset = ref(0);
const currentIndexTalk = ref(0);
const isSendAnswer = ref(false);
const progressLoading = ref(0);
const talkList = ref([
  {
    id:1,
    text:'สวัสดี!<br> ฉันคือนายกเทศมนตรีของเมืองนี้',
    isInput:false,
    isShowNickname:false,
    answer:"",
  },
  {
    id:2,
    text:'ฉันชื่อ “เคน” แต่เรียกฉันว่า <br> “ลุงเคน”  ก็ได้ ยังไงก็ยินดีต้อนรับ <br> สู่เมือง WinTown นะ ',
    isInput:false,
    isShowNickname:false,
    answer:"",
  },
  // {
  //   id:2,
  //   text:'ว่าแต่เธอชื่ออะไรหรอ?',
  //   isInput:true,
  //   isShowNickname:false,
  //   answer:"",
  // },
  {
    id:3,
    text:`ยินดีที่ได้รู้จักนะ “${studentStore.characterName}”`,
    isInput:false,
    isShowNickname:true,
    answer:"",
  },
  {
    id:4,
    text:'เมืองนี้คือดินแดนแห่งการเรียนรู้ <br> และผจญภัย มาช่วยกันทำให้ที่นี่ <br> น่าอยู่และสนุกนะ!',
    isInput:false,
    isShowNickname:false,
    answer:"",
  },
  {
    id:5,
    text:'เอาหละ! <br> ฉันจะมาอธิบายการใช้งานเบื้องต้นนะ',
    isInput:false,
    isShowNickname:false,
    answer:"",
  }

])

const dialogInputInlineStyle = computed(() => {
  if (!isMobile.value) {
    return {};
  }

  const baseBottom = 24;
  return {
    bottom: `${baseBottom + dialogInputBottomOffset.value}px`
  };
});

let visualViewportRef = null;

const handleVisualViewportChange = () => {
  if (!isMobile.value || !isShowDialogInput.value) {
    dialogInputBottomOffset.value = 0;
    return;
  }

  const viewport = window.visualViewport;
  if (!viewport) {
    dialogInputBottomOffset.value = 0;
    return;
  }

  const keyboardHeight = window.innerHeight - (viewport.height + viewport.offsetTop);
  dialogInputBottomOffset.value = keyboardHeight > 0 ? keyboardHeight : 0;
};

watch(isShowDialogInput, (isVisible) => {
  if (!isVisible) {
    dialogInputBottomOffset.value = 0;
    return;
  }

  nextTick(() => {
    handleVisualViewportChange();
  });
});

const currentIndexTutorial = ref(0);
const tutorialList = ref([
  {
    id:1,
    desktop:`${path.value}/desktop/tutorial-win-town-1.webp`,
    mobile:`${path.value}/mobile/tutorial-win-town-1-mobile.webp`
  },
  {
    id:2,
    desktop:`${path.value}/desktop/tutorial-win-town-2.webp`,
    mobile:`${path.value}/mobile/tutorial-win-town-2-mobile.webp`
  },
  {
    id:3,
    desktop:`${path.value}/desktop/tutorial-win-town-3.webp`,
    mobile:`${path.value}/mobile/tutorial-win-town-3-mobile.webp`
  },
  {
    id:4,
    desktop:`${path.value}/desktop/tutorial-win-town-4.webp`,
    mobile:`${path.value}/mobile/tutorial-win-town-4-mobile.webp`
  }
])
const isTalk = ref(false);
const isTutorial = ref(false);
const isShowStartButton = ref(false)
const isShowDialogLoading = ref(true);
const hoveredBuilding = ref(null);
const scrollContainer = ref(null);
const backgroundWrapper = ref(null);
const speakContentRef = ref(null);

const speakingList = ref([])

// Drag to scroll functionality
const isDragging = ref(false);
const activePointerId = ref(null);
const startX = ref(0);
const startY = ref(0);
const translateX = ref(0);
const translateY = ref(0);
const initialTranslateX = ref(0);
const initialTranslateY = ref(0);
const minTranslateX = ref(0);
const maxTranslateX = ref(0);
const minTranslateY = ref(0);
const maxTranslateY = ref(0);

// Zoom functionality for Mobile
const scale = ref(1);
const zoomLevels = [1, 0.7]; // Zoom in: 1x, Zoom out: 0.7x
const initialDistance = ref(0);
const initialScale = ref(1);
const touches = ref([]);

const selectedNpc = ref(null);
let progressInterval = null;
let initialProgressInterval = null;

const startProgressLoading = () => {
  // Reset progress
  progressLoading.value = 0;

  // Clear any existing interval
  if (progressInterval) {
    clearInterval(progressInterval);
  }

  // Simulate progress loading
  progressInterval = setInterval(() => {
    if (progressLoading.value < 90) {
      // Gradually increase progress, slower as it approaches 90%
      const increment = progressLoading.value < 50 ? 5 : progressLoading.value < 80 ? 3 : 1;
      progressLoading.value = Math.min(progressLoading.value + increment, 90);
    }
  }, 100);
};

const stopProgressLoading = (complete = true) => {
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  if (complete) {
    // Complete to 100%
    progressLoading.value = 100;
    // Reset after a short delay
    setTimeout(() => {
      progressLoading.value = 0;
    }, 300);
  } else {
    // Reset on error
    progressLoading.value = 0;
  }
};

const funcHandleNpc = async (npcData) => {

  selectedNpc.value = npcData

  console.log("*** selectedNpc.value",selectedNpc.value);

  if(npcData.name == 'traveller'){

    if(!npcData.ssid){

      isLoading.value = true;

      let response = await funcChatbot();

      if(response.message != 'success'){
        isShowDialogLoading.value = false;
        isShowDialogAlert.value = true;

        setTimeout(() => {
          isAlertAnimation.value = false;

          setTimeout(() => {
            isAlertAnimation.value = true;
            isShowDialogAlert.value = false;
          }, 500);
        }, 1500);
        return;
      }

      isLoading.value = false;

    }else{
      speakingList.value = npcData.data;
    }

    // isShowDialogLoading.value = false;

    // await funcAnimationOpening();

    isShowSpeaking.value = true;

    if(npcData.turnCount >= npcData.maxTurns){
      isShowAlertSpeakingEnd.value = true;
      return;
    }

    scrollToBottomSpeaking();

  }
}

const scrollToBottomSpeaking = () => {
  nextTick(() => {
    if (speakContentRef.value) {
      speakContentRef.value.scrollTop = speakContentRef.value.scrollHeight;
    }
  });
}

const funcSendSpeaking = async () => {

  if(inputSpeaking.value == '' || showHintSpeaking.value > 80) return;

  if(isSendAnswer.value) return;

  isSendAnswer.value = true;

  let temp_data = {
    content:inputSpeaking.value,
    feedback:null,
    thaiTranslation: '',
    role:"user",
    isTranslate:false,
    isSound:false,
  }

  speakingList.value.push(temp_data);

  if(selectedNpc.value.turnCount >= selectedNpc.value.maxTurns){
    isShowAlertSpeakingEnd.value = true;
    return;
  }

  isLoading.value = true;

  let response = await funcChatbot();

  if(response.message != 'success'){
    isShowDialogAlert.value = true;

    setTimeout(() => {
      isShowDialogAlert.value = false;
      isAlertAnimation.value = false;

      setTimeout(() => {
        isAlertAnimation.value = true;
      }, 250);
    }, 1500);

    isLoading.value = false;
    isSendAnswer.value = false;
    return;
  }

  inputSpeaking.value = '';

  isLoading.value = false;

  isSendAnswer.value = false;

  scrollToBottomSpeaking();

}

const setCookieData = () => {
  if (!selectedNpc.value) {
    console.warn('setCookieData: selectedNpc.value is null');
    return;
  }

  const d = new Date();
  // ตั้งวันหมดอายุเป็นเที่ยงคืนของวันนี้ (midnight tonight)
  d.setHours(24, 0, 0, 0);

  let storage_key = `odc_wt_npc_${selectedNpc.value.name}_${studentStore.studentId}`;

  let set_data = {
    ...selectedNpc.value,
    expiresAt: d.getTime() // เก็บวันหมดอายุไว้ในข้อมูล
  }

  let encrypt_data = systemStore.encryptJSON(set_data);

  try {
    // ใช้ localStorage แทน cookie เพื่อให้เก็บข้อมูลได้มากขึ้น
    localStorage.setItem(storage_key, encrypt_data);

    const dataSize = new Blob([encrypt_data]).size;
    console.log(`✅ LocalStorage set successfully: ${storage_key} (${dataSize} bytes, ${(dataSize / 1024).toFixed(2)} KB)`);
  } catch (error) {
    // ถ้า localStorage เต็ม ให้ลองลบข้อมูลเก่าที่หมดอายุแล้ว
    if (error.name === 'QuotaExceededError') {
      console.warn('⚠️ LocalStorage quota exceeded. Attempting to clean expired data...');

      // ลบข้อมูลที่หมดอายุแล้ว โดยใช้ timestamp จากระบบแทนเวลาท้องถิ่น
      // ใช้ systemStore.datetime.timestamp ถ้ามีค่า (timestamp จากระบบ)
      // ถ้าไม่มีให้ fallback ไปใช้ Date.now()
      const now = systemStore.datetime?.timestamp || Date.now();
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('odc_wt_npc_')) {
          try {
            const value = localStorage.getItem(key);
            if (value) {
              const decrypted = systemStore.decryptJSON(value);
              if (decrypted.expiresAt && decrypted.expiresAt < now) {
                localStorage.removeItem(key);
                console.log(`🗑️ Removed expired data: ${key}`);
              }
            }
          } catch (e) {
            // ถ้า decrypt ไม่ได้ อาจเป็นข้อมูลเก่า ให้ลบทิ้ง
            localStorage.removeItem(key);
          }
        }
      }

      // ลอง set อีกครั้ง
      try {
        localStorage.setItem(storage_key, encrypt_data);
        const dataSize = new Blob([encrypt_data]).size;
        console.log(`✅ LocalStorage set successfully after cleanup: ${storage_key} (${dataSize} bytes)`);
      } catch (retryError) {
        console.error(`❌ Failed to set localStorage: ${storage_key}. Storage may be full.`);
        console.error(`   Error:`, retryError);
      }
    } else {
      console.error(`❌ Failed to set localStorage: ${storage_key}`);
      console.error(`   Error:`, error);
    }
  }
}

const funcChatbot = async () => {
  try{

    const API_URL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/chat-wintownChatbot`

    const POST_DATA = {
      studentId:studentStore.studentId,
    }

    if(!selectedNpc.value.ssid){
      POST_DATA.npcParams = {
        province:schoolStore.school.data.province,
      }
      POST_DATA.npcType = selectedNpc.value.name;
    }else{
      POST_DATA.sessionId = selectedNpc.value.ssid;
      POST_DATA.userMessage = inputSpeaking.value;
    }

    // Update progress to 50% when API call starts
    if (progressInterval && progressLoading.value < 50) {
      progressLoading.value = 50;
    }

    const response = await axios.post(API_URL,POST_DATA);

    // Update progress to 95% when response received
    if (progressInterval && progressLoading.value < 95) {
      progressLoading.value = 95;
    }

    if(response.status == 200){
      if(response.data?.error){
        isShowAlertSpeakingEnd.value = true;
        return {
          message:"success",
        };
      }
    }

    selectedNpc.value.turnCount = response.data.turnCount;
    selectedNpc.value.maxTurns = response.data.maxTurns;
    selectedNpc.value.isCompleted = response.data.isCompleted;

    selectedNpc.value.ssid = response.data.sessionId;

    if(!speakingList.value.length){
      if(response.data.messages.length){
        speakingList.value = response.data.messages.map(x => {
          return {
            content:x.content,
            feedback:null,
            thaiTranslation: x.thaiTranslation || '',
            role:"assistant",
            isTranslate:false,
            isSound:false,
          }
        });
      }
    }else{
      let temp_data = {
        content:response.data.message,
        feedback:null,
        thaiTranslation: response.data.thaiTranslation || '',
        role:"assistant",
        isTranslate:false,
        isSound:false,
      }
      if(speakingList.value.length > 0){
        speakingList.value[speakingList.value.length - 1].feedback = response.data.feedback;
      }
      speakingList.value.push(temp_data);
    }

    selectedNpc.value.data = speakingList.value

    setCookieData();

    return {
      data:response.data.data,
      message:"success"
    }

  }catch(e){
    isShowDialogAlert.value = true;
    isAlertAnimation.value = true;

    setTimeout(() => {
      isAlertAnimation.value = false;

      setTimeout(() => {
        isAlertAnimation.value = true;
        isShowDialogAlert.value = false;
      }, 5000);
    }, 1500);

    isLoading.value = false;

    return {
      data:null,
      message:"error"
    }
  }
}


// #region Profanity check
const normalizeProfanityText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s`~!@#$%^&*()_\-+=\[\]{}\\|;:'",.<>/?]/g, '');
};

const profanityList = wordRude?.list
  ?.map((item) => normalizeProfanityText(item))
  ?.filter((item) => item);

const allowedNicknamePattern = /^[\u0E00-\u0E7Fa-zA-Z0-9]+$/;

const containsDisallowedCharacters = (value) => {
  if (!value) return false;
  return !allowedNicknamePattern.test(value);
};

const containsProfanity = (value) => {
  if (!value) return false;
  const normalized = normalizeProfanityText(value);
  if (!Array.isArray(profanityList) || profanityList.length === 0) return false;
  return profanityList.some((word) => normalized.includes(word));
};

watch(nickname, (value) => {
  if (!value) {
    nicknameError.value = '';
    return;
  }

  if (containsDisallowedCharacters(value)) {
    nicknameError.value = 'ห้ามใช้เว้นวรรคหรืออักษรพิเศษ';
    return;
  }

  nicknameError.value = containsProfanity(value)
    ? 'โปรดตั้งชื่อใหม่เพื่อหลีกเลี่ยงคำไม่เหมาะสม'
    : '';
});

watch(inputSpeaking, (value) => {
  if (!value) return;

  // Allow only English letters, numbers, spaces, and common punctuation
  const englishPattern = /[^a-zA-Z0-9\s.,!?'"()-]/g;
  const filteredValue = value.replace(englishPattern, '');

  if (value !== filteredValue) {
    inputSpeaking.value = filteredValue;
  }
});
// #endregion

// #region Microphone permissions
const updateMicrophonePermissionState = (state) => {
  microphonePermissionState.value = state;
  isShowAlertAllowMicrophone.value = state !== 'granted';
};

const stopStreamTracks = (stream) => {
  if (!stream) return;
  stream.getTracks().forEach((track) => track.stop());
};

const requestMicrophoneAccess = async () => {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    return false;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stopStreamTracks(stream);
    updateMicrophonePermissionState('granted');
    return true;
  } catch (error) {
    console.warn('Microphone access denied', error);
    updateMicrophonePermissionState('denied');
    return false;
  }
};

let microphonePermissionHandle = null;

const checkMicrophonePermission = async () => {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    // Device does not support media devices API, skip the alert altogether.
    isShowAlertAllowMicrophone.value = false;
    microphonePermissionState.value = 'unsupported';
    return;
  }

  if (navigator.permissions?.query) {
    try {
      const status = await navigator.permissions.query({ name: 'microphone' });
      microphonePermissionHandle = status;
      updateMicrophonePermissionState(status.state);
      status.onchange = () => updateMicrophonePermissionState(status.state);

      // ไม่เรียก requestMicrophoneAccess() ทันทีเมื่อเป็น 'prompt'
      // ให้ผู้ใช้คลิกปุ่ม record ก่อน แล้วค่อยขอสิทธิ์
      return;
    } catch (error) {
      console.warn('Unable to query microphone permission', error);
    }
  }

  // ถ้าไม่สามารถ query permission ได้ ให้ตั้งเป็น 'unknown'
  microphonePermissionState.value = 'unknown';
};

// ฟังก์ชันสำหรับตรวจสอบระดับเสียง
const checkAudioLevel = () => {
  if (!analyserNode || !isRecording.value) {
    return;
  }

  const dataArray = new Uint8Array(analyserNode.frequencyBinCount);
  analyserNode.getByteFrequencyData(dataArray);

  // คำนวณค่าเฉลี่ยของระดับเสียง
  const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;

  // ถ้ามีเสียง (เกิน threshold)
  if (average > SILENCE_THRESHOLD) {
    lastSoundTime = Date.now();
    // Reset timer
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      silenceTimer = null;
    }
  } else {
    // ถ้าไม่มีเสียง
    if (lastSoundTime === null) {
      lastSoundTime = Date.now();
    }

    const silenceDuration = Date.now() - lastSoundTime;

    // ถ้าเงียบเกินเวลาที่กำหนด
    if (silenceDuration >= SILENCE_DURATION) {
      console.log('Auto stop recording: No sound detected for', SILENCE_DURATION, 'ms');
      stopRecording();
      return;
    }

    // ตั้ง timer สำหรับ auto stop
    if (!silenceTimer) {
      const remainingTime = SILENCE_DURATION - silenceDuration;
      silenceTimer = setTimeout(() => {
        if (isRecording.value) {
          console.log('Auto stop recording: Silence timeout');
          stopRecording();
        }
      }, remainingTime);
    }
  }

  // เรียกตัวเองอีกครั้ง (ตรวจสอบทุก 100ms)
  if (isRecording.value) {
    setTimeout(checkAudioLevel, 100);
  }
};

// ฟังก์ชันสำหรับเริ่ม recording
const startRecording = async () => {
  try {
    if (!window.MediaRecorder) {
      console.error('MediaRecorder is not supported');
      return;
    }

    // ขอสิทธิ์ไมค์
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // สร้าง AudioContext และ AnalyserNode สำหรับตรวจสอบระดับเสียง
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyserNode = audioContext.createAnalyser();
    analyserNode.fftSize = 256;
    analyserNode.smoothingTimeConstant = 0.8;

    const source = audioContext.createMediaStreamSource(audioStream);
    source.connect(analyserNode);

    // สร้าง MediaRecorder
    mediaRecorder = new MediaRecorder(audioStream);
    audioChunks = [];

    // เก็บข้อมูล audio chunks
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    // เมื่อหยุด recording
    mediaRecorder.onstop = async () => {
      try {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        console.log('Recording stopped. Audio URL:', audioUrl);

        // แปลงเสียงเป็นข้อความ
        await convertAudioToText(audioBlob);

        // Cleanup
        if (silenceTimer) {
          clearTimeout(silenceTimer);
          silenceTimer = null;
        }
        lastSoundTime = null;

        // ปิด AudioContext
        if (audioContext) {
          audioContext.close();
          audioContext = null;
        }
        analyserNode = null;

        // ปิด stream
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
          audioStream = null;
        }
      } catch (error) {
        console.error('Error processing recording:', error);
      }
    };

    // เริ่ม recording
    mediaRecorder.start();
    isRecording.value = true;
    isLoading.value = true; // แสดง loading เมื่อเริ่ม recording
    loadingText.value = 'กำลังอัดเสียง...'; // เปลี่ยนข้อความ loading
    inputSpeaking.value = ''; // เคลียร์ input เมื่อเริ่ม recording
    lastSoundTime = Date.now();

    // เริ่มตรวจสอบระดับเสียง
    checkAudioLevel();

    console.log('Recording started');
  } catch (error) {
    console.error('Error starting recording:', error);
    isRecording.value = false;
    isLoading.value = false; // ซ่อน loading เมื่อเกิด error
    loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      audioStream = null;
    }
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    analyserNode = null;
  }
};

// ฟังก์ชันสำหรับตรวจสอบว่ามีตัวอักษรไทยหรือไม่
const hasThaiCharacters = (text) => {
  if (!text) return false;
  // ตรวจสอบตัวอักษรไทย (Unicode range: \u0E00-\u0E7F)
  const thaiPattern = /[\u0E00-\u0E7F]/;
  return thaiPattern.test(text);
};

// ฟังก์ชันสำหรับแปลภาษาไทยเป็นภาษาอังกฤษ
const translateThaiToEnglish = async (thaiText) => {
  try {
    // ใช้ Google Translate API หรือ translation API
    // สำหรับตอนนี้ใช้ Google Translate API (free tier)
    const APIURL = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=th&tl=en&dt=t&q=${encodeURIComponent(thaiText)}`;

    const response = await axios.get(APIURL);

    if (response.data && response.data[0] && response.data[0][0]) {
      // Google Translate API response format: [[["translated text", "original text", ...], ...], ...]
      const translatedText = response.data[0].map(item => item[0]).join('');
      return translatedText;
    }

    return thaiText; // ถ้าแปลไม่ได้ ให้คืนค่าเดิม
  } catch (error) {
    console.error('Error translating Thai to English:', error);
    return thaiText; // ถ้าเกิด error ให้คืนค่าเดิม
  }
};

// ฟังก์ชันสำหรับแปลงเสียงเป็นข้อความ
const convertAudioToText = async (audioBlob) => {
  try {
    // เปลี่ยนข้อความ loading เป็น "กำลังประมวลผล"
    loadingText.value = 'กำลังประมวลผล...';

    // ใช้ API endpoint สำหรับ Speech-to-Text
    const reader = new FileReader();

    reader.onloadend = async () => {
      try {
        const base64data = reader.result.split(',')[1];

        // ใช้ API endpoint จากโค้ดอื่นๆ
        const APIURL = `${process.env.NEWAPI || 'https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net'}/stt-stt`;

        const POSTDATA = {
          fileBase64: base64data
        };

        isLoading.value = true;
        const response = await axios.post(APIURL, POSTDATA);
        isLoading.value = false;

        if (response.data && response.data !== 'Error' && response.data.message !== 'error') {
          // แสดงผลลัพธ์ในช่อง input
          // response.data อาจเป็น string โดยตรง (ตาม event_story.vue) หรือ object
          let transcript = '';

          if (typeof response.data === 'string') {
            transcript = response.data;
          } else if (typeof response.data === 'object') {
            transcript = response.data.transcript || response.data.text || response.data.result || '';
          }

          if (transcript && transcript.trim()) {
            // ถ้าเป็น mobile และมีตัวอักษรไทย ให้แปลงเป็นภาษาอังกฤษ
            if (isMobile.value && hasThaiCharacters(transcript)) {
              loadingText.value = 'กำลังแปลภาษา...';
              isLoading.value = true;

              const translatedText = await translateThaiToEnglish(transcript.trim());

              isLoading.value = false;
              loadingText.value = 'โปรดรอสักครู่...';

              // ใช้ข้อความที่แปลแล้ว
              transcript = translatedText;

              console.log('Thai text translated to English:', translatedText);
            }

            // เพิ่มข้อความใหม่ต่อท้ายข้อความเดิม (ถ้ามี)
            if (inputSpeaking.value) {
              inputSpeaking.value = inputSpeaking.value.trim() + ' ' + transcript.trim();
            } else {
              inputSpeaking.value = transcript.trim();
            }

            console.log('Speech-to-text result:', transcript);
          } else {
            console.warn('No transcript received from API');
            isLoading.value = false; // ซ่อน loading เมื่อไม่มี transcript
            loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
          }
        } else {
          console.error('Speech-to-text API error:', response.data);
          isLoading.value = false; // ซ่อน loading เมื่อ API error
          loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
        }
      } catch (error) {
        isLoading.value = false;
        loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
        console.error('Error calling speech-to-text API:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Error reading audio file:', error);
      isLoading.value = false;
      loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
    };

    // อ่านไฟล์เป็น base64
    reader.readAsDataURL(audioBlob);
  } catch (error) {
    console.error('Error converting audio to text:', error);
    isLoading.value = false;
    loadingText.value = 'โปรดรอสักครู่...'; // รีเซ็ตข้อความ loading
  }
};

// ฟังก์ชันสำหรับหยุด recording
const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    isRecording.value = false;

    // Cleanup silence detection
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      silenceTimer = null;
    }
    lastSoundTime = null;

    console.log('Recording stopped');
  }
};

const funcHandleRecordButton = async () => {
  // ถ้ากำลัง recording อยู่ ให้หยุด
  if (isRecording.value) {
    stopRecording();
    return;
  }

  // เช็คสถานะปัจจุบันก่อน
  await checkMicrophonePermission();

  // ถ้าสถานะเป็น 'prompt' หรือ 'unknown' ให้ขอสิทธิ์
  if (microphonePermissionState.value === 'prompt' || microphonePermissionState.value === 'unknown') {
    const granted = await requestMicrophoneAccess();
    if (!granted) {
      return; // ถ้าไม่ได้รับสิทธิ์ ไม่ต้องทำอะไรต่อ
    }
  } else if (microphonePermissionState.value === 'denied') {
    // ถ้าถูกปฏิเสธแล้ว แสดง alert
    isShowAlertAllowMicrophone.value = true;
    return;
  }

  // ถ้าได้รับสิทธิ์แล้ว (granted) ให้เริ่ม recording
  if (microphonePermissionState.value === 'granted') {
    await startRecording();
  }
};
// #endregion

const funcGuideInformed = () => {
  isAnimation.value = false;

  setTimeout(() => {
    isShowGuideDialog.value = false;
    isAnimation.value = true;
    isTutorial.value = true;
  }, 250);
}

const selectedIndexInfoSpeaking = ref(null)
const funcShowInfoSpeaking = (index) => {
  isAnimation.value = true;

  selectedIndexInfoSpeaking.value = index

  setTimeout(() => {
    isShowInfoSpeaking.value = true;
  }, 250);
}

const funcCloseInfoSpeaking = () => {
  isAnimation.value = false;

  setTimeout(() => {
    isShowInfoSpeaking.value = false;
    isAnimation.value = true;
  }, 250);
}

const showContentInfoSpeaking = computed(() => {
  return speakingList.value[selectedIndexInfoSpeaking.value];
})

const funcCloseSpeaking = async () => {
  // หยุด recording ถ้ากำลัง recording อยู่
  if (isRecording.value) {
    stopRecording();
  }

  selectedNpc.value = null;

  isShowSpeaking.value = false;
}

const funcNextTalk = () => {

  if(isTalk.value){
    if(currentIndexTalk.value == talkList.value.length - 1){
      isTalk.value = false;
      isTutorial.value = true;

      isAnimation.value = false

      setTimeout(() => {
        isAnimation.value = true;
      }, 500);

      return;
    }

    // if(currentIndexTalk.value == 2){
    //   if(nickname.value == ''){
    //     nicknameError.value = 'โปรดระบุชื่อก่อนดำเนินการต่อ';
    //     return;
    //   }

    //   if(containsDisallowedCharacters(nickname.value)){
    //     nicknameError.value = 'ห้ามใช้เว้นวรรคหรืออักษรพิเศษ';
    //     return;
    //   }

    //   if(containsProfanity(nickname.value)){
    //     nicknameError.value = 'โปรดตั้งชื่อใหม่เพื่อหลีกเลี่ยงคำไม่เหมาะสม';
    //     return;
    //   }
    // }

    currentIndexTalk.value++
  }else{

    currentIndexTutorial.value++

    if(currentIndexTutorial.value == 3){
      isShowStartButton.value = true;
    }
  }

}

const funcTranslateSpeaking = (index) => {
  console.log("*** index",index);
  speakingList.value[index].isTranslate = !speakingList.value[index].isTranslate;
}

const funcShowDialogInput = () => {
  if(isMobile.value){
    isShowDialogInput.value = true;
  }
}

const funcPreventNonEnglish = (event) => {
  // Allow: English letters, numbers, spaces, and common punctuation
  const allowedKeys = /^[a-zA-Z0-9\s.,!?'"()-]$/;

  // Allow special keys (Backspace, Delete, Tab, Enter, Arrow keys, etc.)
  const specialKeys = [
    'Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight',
    'ArrowUp', 'ArrowDown', 'Home', 'End', 'Escape'
  ];

  // Allow Ctrl/Cmd combinations (Ctrl+A, Ctrl+C, Ctrl+V, etc.)
  if (event.ctrlKey || event.metaKey) {
    return true;
  }

  // Check if it's a special key
  if (specialKeys.includes(event.key)) {
    return true;
  }

  // Check if the character is allowed
  if (!allowedKeys.test(event.key)) {
    event.preventDefault();
    return false;
  }

  return true;
}

// Function to filter non-English characters on mobile (using input event)
const funcFilterNonEnglishOnMobile = (event) => {
  if (!isMobile.value) return;

  const englishPattern = /[^a-zA-Z0-9\s.,!?'"()-]/g;
  const currentValue = inputSpeaking.value || '';

  // Filter out non-English characters
  const filteredValue = currentValue.replace(englishPattern, '');

  // If value changed, update it
  if (filteredValue !== currentValue) {
    inputSpeaking.value = filteredValue;

    // Try to maintain cursor position
    const inputElement = event.target.querySelector('input') || event.target;
    if (inputElement && inputElement.tagName === 'INPUT') {
      const cursorPos = Math.min(inputElement.selectionStart || 0, filteredValue.length);
      nextTick(() => {
        inputElement.setSelectionRange(cursorPos, cursorPos);
      });
    }
  }
}

const funcHandlePaste = (event) => {
  event.preventDefault();
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  // Filter only English characters
  const englishPattern = /[^a-zA-Z0-9\s.,!?'"()-]/g;
  const filteredPaste = paste.replace(englishPattern, '');

  // Find the actual input element (Quasar wraps it)
  const inputElement = event.target.querySelector('input') || event.target;

  if (inputElement && inputElement.tagName === 'INPUT') {
    // Insert filtered text at cursor position
    const currentValue = inputSpeaking.value;
    const selectionStart = inputElement.selectionStart || currentValue.length;
    const selectionEnd = inputElement.selectionEnd || currentValue.length;

    const newValue = currentValue.substring(0, selectionStart) + filteredPaste + currentValue.substring(selectionEnd);
    inputSpeaking.value = newValue;

    // Set cursor position after pasted text
    nextTick(() => {
      const newCursorPos = selectionStart + filteredPaste.length;
      inputElement.setSelectionRange(newCursorPos, newCursorPos);
    });
  } else {
    // Fallback: just append filtered text
    inputSpeaking.value = (inputSpeaking.value || '') + filteredPaste;
  }
}

const funcCloseGuideDialog = () => {
  isAnimation.value = false;

  setTimeout(() => {
    isShowGuideDialog.value = false;
    isAnimation.value = true;
  }, 250);
}

const funcAnimationOpening = async () => {

  let settingTime = 2300;

  if(isMobile.value) settingTime = 50;

  isOpeningTown.value = false;

  await new Promise(resolve => setTimeout( () => {
    isOpeningTown.value = true;
    setTimeout(resolve, settingTime)
  },50));

}

const funcStartTown = () => {

  currentIndexTutorial.value = 0;
  currentIndexTalk.value = 0;
  isShowStartButton.value = false;
  isTalk.value = false;
  isTutorial.value = false;

  setTutorialData();
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const updateBounds = () => {
  const container = scrollContainer.value;
  const wrapper = backgroundWrapper.value;
  if (!container || !wrapper) return;

  if (isMobile.value) {
    // Mobile: ใช้ getBoundingClientRect() เพื่อให้ได้ขนาดจริงที่เห็นบนหน้าจอ
    const containerRect = container.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();

    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;
    // Account for scale when calculating bounds
    const baseWidth = wrapper.offsetWidth || wrapper.clientWidth;
    const baseHeight = wrapper.offsetHeight || wrapper.clientHeight;
    const scaledWidth = baseWidth * scale.value;
    const scaledHeight = baseHeight * scale.value;

    if (scaledWidth > containerWidth) {
      maxTranslateX.value = 0;
      minTranslateX.value = containerWidth - scaledWidth;
    } else {
      maxTranslateX.value = (containerWidth - scaledWidth) / 2;
      minTranslateX.value = (containerWidth - scaledWidth) / 2;
    }

    if (scaledHeight > containerHeight) {
      maxTranslateY.value = 0;
      minTranslateY.value = containerHeight - scaledHeight;
    } else {
      maxTranslateY.value = (containerHeight - scaledHeight) / 2;
      minTranslateY.value = (containerHeight - scaledHeight) / 2;
    }
  } else {
    // Desktop: ใช้ offsetWidth/offsetHeight
    maxTranslateX.value = 0;
    minTranslateX.value = container.clientWidth - wrapper.offsetWidth;
    maxTranslateY.value = 0;
    minTranslateY.value = container.clientHeight - wrapper.offsetHeight;
  }

  // ตรวจสอบว่าตำแหน่งปัจจุบันอยู่ใน bounds หรือไม่
  translateX.value = clamp(translateX.value, minTranslateX.value, maxTranslateX.value);
  translateY.value = clamp(translateY.value, minTranslateY.value, maxTranslateY.value);
};

const applyTranslation = (deltaX, deltaY) => {
  translateX.value = clamp(initialTranslateX.value + deltaX, minTranslateX.value, maxTranslateX.value);
  translateY.value = clamp(initialTranslateY.value + deltaY, minTranslateY.value, maxTranslateY.value);
};

const centerBackground = () => {
  const container = scrollContainer.value;
  const wrapper = backgroundWrapper.value;
  if (!container || !wrapper) return;

  if (isMobile.value) {
    // Mobile: รอให้ wrapper render เสร็จก่อน
    nextTick(() => {
      requestAnimationFrame(() => {
        updateBounds();

        const containerRect = container.getBoundingClientRect();
        // Account for scale when centering
        const baseWidth = wrapper.offsetWidth || wrapper.clientWidth;
        const baseHeight = wrapper.offsetHeight || wrapper.clientHeight;
        const scaledWidth = baseWidth * scale.value;
        const scaledHeight = baseHeight * scale.value;

        const centeredX = (containerRect.width - scaledWidth - 300) / 2;
        const centeredY = (containerRect.height - scaledHeight) / 2;

        translateX.value = clamp(centeredX, minTranslateX.value, maxTranslateX.value);
        translateY.value = clamp(centeredY, minTranslateY.value, maxTranslateY.value);
      });
    });
  } else {
    // Desktop
    updateBounds();
    const centeredX = (container.clientWidth - wrapper.offsetWidth) / 2;
    const centeredY = (container.clientHeight - wrapper.offsetHeight) / 2;

    translateX.value = clamp(centeredX, minTranslateX.value, maxTranslateX.value);
    translateY.value = clamp(centeredY, minTranslateY.value, maxTranslateY.value);
  }
};

const handleResize = () => {
  nextTick(() => {
    centerBackground();
  });
};

const endDrag = () => {
  isDragging.value = false;
  activePointerId.value = null;
};

const handlePointerDown = (e) => {
  if (!scrollContainer.value) return;
  // Prevent drag on interactive elements
  if (e.target.closest('button, a, [role="button"]')) return;

  // อัพเดท bounds ก่อนเริ่ม drag (ใช้ nextTick สำหรับ Mobile เพื่อให้แน่ใจว่า render เสร็จ)
  if (isMobile.value) {
    nextTick(() => {
      updateBounds();
    });
  } else {
    updateBounds();
  }

  isDragging.value = true;
  activePointerId.value = e.pointerId;

  const rect = scrollContainer.value.getBoundingClientRect();
  startX.value = e.clientX - rect.left;
  startY.value = e.clientY - rect.top;
  initialTranslateX.value = translateX.value;
  initialTranslateY.value = translateY.value;

  scrollContainer.value.setPointerCapture(e.pointerId);
  e.preventDefault();
};

const handlePointerMove = (e) => {
  if (!isDragging.value || !scrollContainer.value) return;
  if (activePointerId.value !== e.pointerId) return;

  const rect = scrollContainer.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  // ใช้ multiplier ที่แตกต่างกันสำหรับ Desktop และ Mobile
  // Mobile: ใช้ 1.0 เพื่อให้การเลื่อนสมูทและตรงกับนิ้ว
  // Desktop: ใช้ 1.5 เพื่อให้การเลื่อนเร็วขึ้น
  const multiplier = isMobile.value ? 1.0 : 1.5;
  const deltaX = (x - startX.value) * multiplier;
  const deltaY = (y - startY.value) * multiplier;

  applyTranslation(deltaX, deltaY);
};

const handlePointerUp = (e) => {
  if (!scrollContainer.value) {
    endDrag();
    return;
  }
  if (activePointerId.value === e.pointerId) {
    scrollContainer.value.releasePointerCapture(e.pointerId);
    endDrag();
  }
};

// Zoom functions for Mobile
const funcZoomIn = () => {
  if (!isMobile.value) return;
  setScale(1); // Zoom in to 1x
};

const funcZoomOut = () => {
  if (!isMobile.value) return;
  setScale(0.7); // Zoom out to 0.7x
};

const setScale = (newScale) => {
  scale.value = newScale;

  // Zoom at center without moving the map
  // Keep translateX and translateY unchanged
  const container = scrollContainer.value;
  const wrapper = backgroundWrapper.value;
  if (!container || !wrapper) return;

  // Recalculate bounds after scale change
  nextTick(() => {
    updateBounds();

    // Keep current translate position (map doesn't move)
    translateX.value = clamp(translateX.value, minTranslateX.value, maxTranslateX.value);
    translateY.value = clamp(translateY.value, minTranslateY.value, maxTranslateY.value);
  });
};

const getDistance = (touch1, touch2) => {
  const dx = touch2.clientX - touch1.clientX;
  const dy = touch2.clientY - touch1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

const handleTouchStart = (e) => {
  if (!isMobile.value || !scrollContainer.value) return;

  touches.value = Array.from(e.touches);

  if (touches.value.length === 2) {
    // Start pinch zoom
    e.preventDefault();
    initialDistance.value = getDistance(touches.value[0], touches.value[1]);
    initialScale.value = scale.value;
    isDragging.value = false; // Disable drag during pinch
  } else if (touches.value.length === 1) {
    // Single touch - allow normal drag
    const touch = touches.value[0];
    const rect = scrollContainer.value.getBoundingClientRect();
    startX.value = touch.clientX - rect.left;
    startY.value = touch.clientY - rect.top;
    initialTranslateX.value = translateX.value;
    initialTranslateY.value = translateY.value;
  }
};

const handleTouchMove = (e) => {
  if (!isMobile.value || !scrollContainer.value) return;

  touches.value = Array.from(e.touches);

  if (touches.value.length === 2) {
    // Pinch zoom - snap to nearest level
    e.preventDefault();
    const currentDistance = getDistance(touches.value[0], touches.value[1]);
    const scaleChange = currentDistance / initialDistance.value;
    const calculatedScale = initialScale.value * scaleChange;

    // Snap to nearest zoom level
    const snappedScale = zoomLevels.reduce((prev, curr) => {
      return Math.abs(curr - calculatedScale) < Math.abs(prev - calculatedScale) ? curr : prev;
    });

    scale.value = snappedScale;

    // Recalculate bounds
    const container = scrollContainer.value;
    const wrapper = backgroundWrapper.value;
    if (container && wrapper) {
      nextTick(() => {
        updateBounds();
        translateX.value = clamp(translateX.value, minTranslateX.value, maxTranslateX.value);
        translateY.value = clamp(translateY.value, minTranslateY.value, maxTranslateY.value);
      });
    }
  } else if (touches.value.length === 1 && !isDragging.value) {
    // Single touch drag
    const touch = touches.value[0];
    const rect = scrollContainer.value.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const multiplier = 1.0;
    const deltaX = (x - startX.value) * multiplier;
    const deltaY = (y - startY.value) * multiplier;

    applyTranslation(deltaX, deltaY);
  }
};

const handleTouchEnd = (e) => {
  if (!isMobile.value) return;

  touches.value = Array.from(e.touches);

  if (touches.value.length < 2) {
    initialDistance.value = 0;
  }

  if (touches.value.length === 0) {
    endDrag();
  }
};

const handleWheel = (e) => {
  // Zoom with mouse wheel - toggle between levels
  if (!isMobile.value) return;

  e.preventDefault();
  const currentIndex = zoomLevels.indexOf(scale.value);
  if (e.deltaY > 0 && currentIndex < zoomLevels.length - 1) {
    // Zoom out
    setScale(zoomLevels[currentIndex + 1]);
  } else if (e.deltaY < 0 && currentIndex > 0) {
    // Zoom in
    setScale(zoomLevels[currentIndex - 1]);
  }
};

const funcHandleButton = (type) => {

  if(type == 'setting'){
    isShowDialogSetting.value = true;
  }else if(type == 'lobby'){
    isShowDialogOutOfWintown.value = true;
  }else if(type == 'mailbox'){
    isShowDialogMailbox.value = true;
  }else if(type == 'guide'){
    isShowGuideDialog.value = true;
    centerBackground();
  }

  setTimeout(() => {
    isAnimation.value = true;
  }, 250);

}

// ฟังก์ชันสำหรับอ่าน cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  return null;
}

// ฟังก์ชันสำหรับอ่านข้อมูลจาก cookie (สำหรับ tutorial)
const getCookieData = (name) => {
  try {
    const cookieValue = getCookie(name);
    if (cookieValue) {
      // ถ้าเป็น "true" ธรรมดา (ไม่ใช่ encrypted) ให้ return object
      if (cookieValue === 'true') {
        return { value: true };
      }
      // ถ้าเป็น encrypted data ให้ decrypt
      try {
        const decrypt_data = systemStore.decryptJSON(cookieValue);
        return decrypt_data;
      } catch (error) {
        // ถ้า decrypt ไม่ได้ อาจเป็นข้อมูลเก่า ให้ return null
        return null;
      }
    }
  } catch (error) {
    console.error('Error reading from cookie:', error);
  }
  return null;
}

// ฟังก์ชันสำหรับเก็บข้อมูล tutorial ลง cookie
const setTutorialData = () => {
  // ใช้ timestamp จากระบบแทนเวลาท้องถิ่น
  // ใช้ systemStore.datetime.timestamp ถ้ามีค่า (timestamp จากระบบ)
  // ถ้าไม่มีให้ fallback ไปใช้ Date.now()
  const now = systemStore.datetime?.timestamp || Date.now();
  const d = new Date(now);

  // ตั้งวันหมดอายุเป็น 1 วันจากนี้ (เที่ยงคืนของวันถัดไป)
  d.setDate(d.getDate() + 1);
  d.setHours(0, 0, 0, 0);

  let cookie_name = `odc_wt_tutorial_${studentStore.studentId}`;

  // Set cookie พร้อมวันหมดอายุ
  document.cookie = `${cookie_name}=true;expires=${d.toUTCString()};path=/;SameSite=Lax`;

  console.log(`✅ Tutorial data saved to cookie: ${cookie_name}`);
}

// ฟังก์ชันสำหรับเช็คว่าควรแสดง tutorial หรือไม่
// return true = ไม่ต้องแสดง tutorial (เคยเห็นแล้ว)
// return false = แสดง tutorial (ยังไม่เคยเห็น)
const funcCheckTutorial = async () => {
  let cookie_name = `odc_wt_tutorial_${studentStore.studentId}`;

  // เช็คข้อมูลใน cookie ก่อน
  let get_cookie_data = getCookieData(cookie_name);
  if (get_cookie_data && get_cookie_data.value === true) {
    // ถ้ามีข้อมูลใน cookie และยังไม่หมดอายุ (cookie จะหมดอายุอัตโนมัติ) ให้ return true (ไม่ต้องแสดง tutorial)
    return true;
  }

  // ถ้ายังไม่มีข้อมูลหรือหมดอายุแล้ว ให้เรียก API เพื่อเช็ค
  // เริ่ม progress loading (เฉพาะเมื่อต้องเรียก API)
  startProgressLoading();

  try {
    const API_URL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/wintown-checkTutorial?studentId=${studentStore.studentId}`;

    // Update progress to 50% when API call starts
    if (progressInterval && progressLoading.value < 50) {
      progressLoading.value = 50;
    }

    const response = await axios.get(API_URL);

    // Update progress to 95% when response received
    if (progressInterval && progressLoading.value < 95) {
      progressLoading.value = 95;
    }

    console.log('*** Tutorial check response:', response);

    if (response.status == 200) {
      // เก็บข้อมูลลง cookie ว่าได้เช็คแล้ว (value = true, หมดอายุ 1 วัน)

      if(!response.data.isShowWinTownTutorial){
        // setTutorialData();
        // หยุด progress loading เมื่อสำเร็จ
        // stopProgressLoading(true);
        // ถ้า API บอกว่าเคยเข้าใช้งานแล้ว (hasSeenTutorial = true) ให้ return true (ไม่แสดง tutorial)
        // ถ้ายังไม่เคยเข้าใช้งาน (hasSeenTutorial = false หรือ undefined) ให้ return false (แสดง tutorial)
        return false; // แสดง tutorial (ครั้งแรก)
      }else{
        return true; // ไม่ต้องแสดง tutorial
      }

    }
    // else {
    //   // หยุด progress loading เมื่อ API error
    //   // stopProgressLoading(false);
    //   // ถ้า API error หรือ success = false ให้ถือว่าเป็นครั้งแรก (แสดง tutorial)
    //   return false;
    // }
  } catch (error) {
    console.error('Error checking tutorial status:', error);
    // หยุด progress loading เมื่อเกิด error
    // stopProgressLoading(false);
    // ถ้า API error ให้ถือว่าเป็นครั้งแรก (แสดง tutorial)
    return false;
  }
}


// #region Computed
const showHintSpeaking = computed(() => {
  return inputSpeaking.value.length;
});

const showContentTutorial = computed(() => {

  if(isTalk.value){
    return talkList.value[currentIndexTalk.value];
  }else{
    return tutorialList.value[currentIndexTutorial.value];
  }

});

const isDisableButtonNext = computed(() => {

  let disable = false;

  if(currentIndexTalk.value == 2){
    if(nickname.value == '' || nicknameError.value !== '') disable = true;
  }

  return disable;

})

// #endregion

onMounted(async () => {

  let setTime = 4500

  if(isMobile.value){
    setTime = 1000
  }

  // Start progress loading for initial page load
  progressLoading.value = 0;
  const loadingDuration = 1500; // 1.5 seconds
  const progressSteps = 100;
  const stepInterval = loadingDuration / progressSteps;
  let currentProgress = 0;

  // Clear any existing initial progress interval
  if (initialProgressInterval) {
    clearInterval(initialProgressInterval);
  }

  initialProgressInterval = setInterval(() => {
    currentProgress += 1;
    progressLoading.value = Math.min(currentProgress, 100);

    if (currentProgress >= 100) {
      clearInterval(initialProgressInterval);
      initialProgressInterval = null;
    }
  }, stepInterval);

  // เช็คว่าควรแสดง tutorial หรือไม่ (จะใช้ progress loading จริงถ้าต้องเรียก API)
  const hasSeenTutorial = await funcCheckTutorial();

  // รอให้ progress loading เสร็จ (ถ้ามี) แล้วค่อยซ่อน loading dialog
  // ถ้าไม่มี progressInterval แสดงว่าไม่ได้เรียก API (มี cookie อยู่แล้ว) ให้ใช้ initial progress
  if (progressInterval) {
    // รอให้ progress loading เสร็จ (จะซ่อนใน stopProgressLoading)
    // แต่ต้องซ่อน dialog loading ด้วย
    setTimeout(() => {
      isShowDialogLoading.value = false;
      // Center the position after loading is hidden and DOM is updated
      nextTick(() => {
        setTimeout(() => {
          centerBackground();
        }, 100);
      });
    }, 300);
  } else {
    // ถ้าไม่มี progressInterval แสดงว่าไม่ได้เรียก API (มี cookie อยู่แล้ว)
    // ใช้ initial progress loading แทน
    // Hide loading after a delay
    setTimeout(() => {
      // Ensure progress is at 100% before hiding
      progressLoading.value = 100;

      // Small delay to show 100% before hiding
      setTimeout(() => {
        isShowDialogLoading.value = false;
        progressLoading.value = 0; // Reset for next use

        // Center the position after loading is hidden and DOM is updated
        nextTick(() => {
          // Wait a bit more to ensure elements are fully rendered
          setTimeout(() => {
            centerBackground();
          }, 100);
        });
      }, 200);
    }, loadingDuration);
  }

  window.addEventListener('resize', handleResize);
  visualViewportRef = window.visualViewport || null;

  if (visualViewportRef) {
    visualViewportRef.addEventListener('resize', handleVisualViewportChange);
    visualViewportRef.addEventListener('scroll', handleVisualViewportChange);
  }

  // ถ้าเคยเห็น tutorial แล้ว ให้ข้าม talk และ tutorial
  // ถ้ายังไม่เคยเห็น ให้แสดง talk และ tutorial
  if (hasSeenTutorial) {
    // ไม่ต้องแสดง tutorial/talk
    isTalk.value = false;
    isTutorial.value = false;
  } else {
    // แสดง talk และ tutorial
    setTimeout(() => {
      isTalk.value = true;
    }, setTime);
  }
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);

  if (microphonePermissionHandle) {
    microphonePermissionHandle.onchange = null;
    microphonePermissionHandle = null;
  }

  if (visualViewportRef) {
    visualViewportRef.removeEventListener('resize', handleVisualViewportChange);
    visualViewportRef.removeEventListener('scroll', handleVisualViewportChange);
    visualViewportRef = null;
  }

  // หยุด recording และ cleanup ถ้ากำลัง recording อยู่
  if (isRecording.value) {
    stopRecording();
  }

  // Cleanup silence detection
  if (silenceTimer) {
    clearTimeout(silenceTimer);
    silenceTimer = null;
  }
  lastSoundTime = null;

  // Cleanup AudioContext
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  analyserNode = null;

  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }

  // Clean up progress intervals
  if (progressInterval) {
    clearInterval(progressInterval);
    progressInterval = null;
  }

  if (initialProgressInterval) {
    clearInterval(initialProgressInterval);
    initialProgressInterval = null;
  }
});

</script>

<style lang="scss" scoped>
// #region Container
.box-container-backdrop-main{
  width:100%;
  height:100%;
  overflow:hidden;
  background-image: url('/images/background_main/backdrop-winner-town.webp');
  background-size: contain;
  // background-repeat: no-repeat;
  background-position: center;

  &.loading{
    background-image: url('/images/background_main/backdrop-winner-town.webp');
  }
}

.box-backdrop-main{
  width:100%;
  height:100vh;
  // height:100%;
  background: rgba(0, 0, 0, 0.50);
  z-index:10;
  overflow:hidden;
}

// #region Content
.box-container-main{
  max-width: 1600px;
  width: calc(100vh * 16 / 9);
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  container-type: inline-size;
  background:transparent;
  overflow: hidden;

  &.mobile{
    max-width:100vw;
    width:100vw;
    min-width:360px;
    height: 100vh;
    min-height: 100vh;
    // ตั้ง min-height เพื่อรองรับ wrapper ที่มีขนาด 1600px
    // แต่ให้ container มี height เต็มหน้าจอเพื่อให้ wrapper ไม่หดตาม
  }
}

// #endregion

.box-dialog-input-main{
  max-width:600px;
  width:100%;
  min-width: 344px;
  height: 80px;
  padding: 16px 24px;
  border-radius: 9999px;
  border: 5px solid #EEB15A;
  background: #FFF;
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
  margin: 0px auto;

  &.mobile{
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    max-width:600px;
    width:97%;
    min-width: 344px;
    z-index: 20;
  }
}

.box-speak-container-main{
  background: rgba(255, 255, 255, 0.50);
  backdrop-filter: blur(5px);

  &.mobile{
    width:100%;
  }

  & .box-content-speak-main{
    width:100%;
    bottom:clamp(30px,3cqw,48px);
    padding:0px clamp(5px,0.5cqw,8px);

    &.mobile{
      min-width:334px;
      width:100%;
      max-width:600px;
      bottom:24px;
      margin:auto;
    }

    & .box-character-main{

      &.npc{
        top:clamp(-355px,-22.1875cqw,-221.875px);
        left:clamp(162.5px,16.25cqw,260px);
        width:clamp(312.5px,31.25cqw,500px);

        &.mobile{
          top:-130px;
          left:-0px;
          width:200px;
        }
      }

      &.student{
        top:clamp(-285px,-17.8125cqw,-178.125px);
        right:clamp(162.5px,16.25cqw,260px);
        width:clamp(262.5px,26.25cqw,420px);

        &.mobile{
          top:-130px;
          width:200px;
          right:-30px;
        }
      }
    }

    & .box-speak-main{
      width: clamp(625px,62.5cqw,1000px);
      height:clamp(178.125px,17.8125cqw,285px);
      border-radius: clamp(93.75px,9.375cqw,150px);
      border: clamp(3.125px,0.3125cqw,5px) solid #EEB15A;
      background: #FFF1D7;
      box-shadow: 0 clamp(2.5px,0.25cqw,4px) clamp(2.5px,0.25cqw,4px) 0 rgba(0, 0, 0, 0.25);
      margin:auto;

      &.mobile{
        min-width:334px;
        width:100%;
        max-width:600px;
        height:260px;
        border-radius: 35px;
        border: 5px solid #EEB15A;
        background: #FFF1D7;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
      }

      & .box-speak-content{
        width:clamp(481.25px,48.125cqw,770px);
        height:100%;
        padding: clamp(10px,1cqw,16px) clamp(10px,1cqw,16px);
        font-size: clamp(12.5px,1.25cqw,20px);
        color:#000;
        margin-left: clamp(53.125px,5.3125cqw,85px);
        overflow:auto;

        &.mobile{
          width:100%;
          margin-left:0;
          padding:16px 24px;
          font-size:14px;
        }

        &::-webkit-scrollbar{
          width: 0px;
          height: 0px;
        }

        & .box-speak-item{
          max-width:60%;
          width:fit-content;
          line-height: normal;
          margin:clamp(7.5px,0.75cqw,12px) 0px 0px;
          padding:clamp(5px,0.5cqw,8px);
          color:#000;
          word-break: break-word;
          overflow-wrap: break-word;
          white-space: normal;

          &.mobile{
            min-width:20%;
            max-width:100%;
            padding:8px;
            margin:24px 0px;
          }

          & .box-speak-text{
            width:fit-content;
            word-break: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            padding:clamp(6.25px,0.625cqw,10px);
            direction: ltr;

            &.student{
              border-radius: clamp(10px,1cqw,16px);
              background: #EEB15A;
              // margin:clamp(15px,1.5cqw,24px) 0px;
              direction: ltr;

              &.mobile{
                border-radius: 8px;
                margin:24px 0px;
              }
            }
          }

          & .box-button-speak{
            min-width:clamp(43.75px,4.375cqw,70px);
            width:fit-content;
            direction: ltr;
            justify-content: flex-end;

            &.mobile{
              width:70px;
            }

            &.student{
              margin-right:clamp(-15px,-0.9375cqw,-9.375px);

              &.mobile{
                margin-right:-10px;
              }
            }

            & .button-translate{
              width:clamp(18.75px,1.875cqw,30px);
              margin:0px 1px;
              cursor:pointer;

              &.mobile{
                width:30px;
              }
            }

            & .button-info{
              width:clamp(18.75px,1.875cqw,30px);
              margin:0px 1px;
              cursor:pointer;

              &.mobile{
                width:30px;
              }
            }

            & .button-sound{
              width:clamp(18.75px,1.875cqw,30px);
              margin:0px 1px;
              cursor:pointer;

              &.mobile{
                width:30px;
              }
            }
          }
        }

      }

      & .box-name{
        top:clamp(-22px,-1.375cqw,-13.75px);
        max-width:clamp(131.25px,13.125cqw,210px);
        border-radius: 9999px;
        border: clamp(3.125px,0.3125cqw,5px) solid #FFF;
        color: #FFF;
        font-size: clamp(15px,1.5cqw,24px);
        line-height: clamp(12.5px,1.25cqw,20px);
        text-align:center;

        &.mobile{
          max-width:135px;
          width:100%;
          min-width:90px;
          font-size:14px;
          line-height:14px;
          border-width: 2px;
        }

        &.npc{
          left:clamp(93.75px,9.375cqw,150px);
          background: #F8B946;
          box-shadow: 0 clamp(2.5px,0.25cqw,4px) clamp(2.5px,0.25cqw,4px) 0 rgba(0, 0, 0, 0.25);
          padding: clamp(5px,0.5cqw,8px) clamp(10px,1cqw,16px);

          &.mobile{
            left:-10px;
            padding:8px 10px;
          }
        }

        &.student{
          right:clamp(93.75px,9.375cqw,150px);
          background: #FF6A00;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          padding: clamp(5px,0.5cqw,8px) clamp(8.75px,0.875cqw,14px);

          &.mobile{
            right:-10px;
            padding:8px 10px;
          }

        }
      }
    }
  }

  & .box-footer-main{
    width:100%;

    &.mobile{
      width:100%;
      min-width:868px;
      height:150px;
      margin:auto;
    }
  }

  & .button-close-speak{
    width:clamp(30px,3cqw,48px);
    top:clamp(25px,2.5cqw,40px);
    right:clamp(18.75px,1.875cqw,30px);
    cursor:pointer;
  }

  & .box-backdrop-speaking-main{
    background: rgba(255, 255, 255, 0.50);
    backdrop-filter: blur(5px);
    overflow:auto;

    &::-webkit-scrollbar{
      width:0px;
      height:0px;
    }

    &.mobile{
      padding:16px;
    }

    & .box-speaking-info{
      width:clamp(443.75px,44.375cqw,710px);
      border-radius: clamp(22.5px,2.25cqw,36px);
      border: clamp(5px,0.5cqw,8px) solid #37170D;
      background: #FFF1D7;
      padding: clamp(15px,1.5cqw,24px) clamp(22.5px,2.25cqw,36px) 32px clamp(22.5px,2.25cqw,36px);
      box-shadow: 0px 0px 0px clamp(7.5px,0.75cqw,12px) #775246;

      &.mobile{
        max-width: 600px;
        width:100%;
        min-width:334px;
        border: 8px solid #37170D;
        border-radius: 44px;
        padding:16px;
        box-shadow: 0px 0px 0px 8px #775246;
      }

      & .icon-bulb{
        width:clamp(14.375px,1.4375cqw,23px);
        margin:0px clamp(6.25px,0.625cqw,10px);

        &.mobile{
          width:23px;
          margin:0px 10px;
        }
      }

      & .text-title-info{
        color: #441B00;
        font-size: clamp(15px,1.5cqw,24px);
        line-height: normal;
        margin:0px clamp(6.25px,0.625cqw,10px);

        &.mobile{
          width:fit-content;
          margin:0px 0px 0px 10px;
          font-size:20px;
          line-height:normal;
        }
      }

      & .box-content-info{
        width:100%;
        border-radius: clamp(18.125px,1.8125cqw,29px);
        background: #FFF;
        padding: clamp(15px,1.5cqw,24px) clamp(17.5px,1.75cqw,28px);
        margin-top: clamp(30px,3cqw,48px);
        color: #000;
        font-size: clamp(12.5px,1.25cqw,20px);
        line-height: normal;

        &.mobile{
          border-radius: 29px;
          padding:24px;
          margin-top:48px;
          font-size:16px;
          line-height:normal;
        }

        & .box-content-info-item{

          & .text-header{
            color: #848484;
            font-size: clamp(10px,1cqw,16px);

            &.mobile{
              font-size:16px;
            }
          }

          & .text-content{
            color: #000;
            font-size: clamp(12.5px,1.25cqw,20px);
            line-height: normal;
            margin-top:clamp(10px,1cqw,16px);

             &.mobile{
                font-size:16px;
                margin-top:16px;
              }
          }

        }

        & .box-separator{
          width:100%;
          height:1px;
          background: #DCDCEB;
          margin:clamp(15px,1.5cqw,24px) 0px;
        }

      }

      & .button-close-info{
        top:clamp(-30px,-1.875cqw,-18.75px);
        right:clamp(-30px,-1.875cqw,-18.75px);
        width: clamp(36.875px,3.6875cqw,59px);
        cursor:pointer;

        &.mobile{
          width:45px;
          right:-20px;
          top:-20px;
        }
      }
    }
  }

  & .box-alert-backdrop-speaking-main{
    background-color:rgba(0,0,0,.5);

    & .box-speaking-end{
      width:clamp(1177.5px,117.75cqw,1884px);
    }

    & .box-alert-speaking-end{
      width:clamp(373.125px,37.3125cqw,597px);

      &.mobile{
        width:334px;
      }

      & .button-close-alert-speaking{
        bottom:clamp(28.125px,2.8125cqw,45px);
        left:50%;
        transform:translate(-50%,0%);
        width:clamp(81.25px,8.125cqw,130px);
        cursor: pointer;

        &.mobile{
          width:129px;
        }
      }
    }
  }

}

.box-speak-input{
  width: clamp(500px,50cqw,800px);
  padding: clamp(6.25px,0.625cqw,10px) clamp(24.375px,2.4375cqw,39px);
  border-radius: 9999px;
  border: clamp(3.125px,0.3125cqw,5px) solid #EEB15A;
  background: #FFF;
  box-shadow: 0 clamp(2.5px,0.25cqw,4px) clamp(2.5px,0.25cqw,4px) 0 rgba(0, 0, 0, 0.25);
  margin:clamp(5px,0.5cqw,8px) auto 0px;
  color: #B57500;
  font-size: clamp(6.25px,0.625cqw,10px);
  line-height: normal;

  &.mobile{
    min-width:334px;
    width:100%;
    max-width:600px;
    padding:10px 12px;

    &.dialog{
      width:98%;
    }
  }

  & .box-input{
    width:100%;
    height:clamp(21.875px,2.1875cqw,35px);
    color:#B57500;
    font-size:clamp(12.5px,1.25cqw,20px);
    padding-right:clamp(5px,0.5cqw,8px);

    &.mobile{
      height:40px;
      padding-left:16px;
      padding-right:20px;
      font-size:14px;
    }

    &.validate{
      color:#FF0000;
    }
  }

  & .text-hint{
    font-size:clamp(6.25px,0.625cqw,10px);
    padding-right:clamp(10px,1cqw,16px);

    &.mobile{
      font-size:10px;
      padding-right:20px;
    }

    &.validate{
      color:#FF0000;
    }
  }

  & .button-record{
    width:clamp(25.625px,2.5625cqw,41px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;
  }

  & .button-send{
    width:clamp(30px,3cqw,48px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:48px;
      margin:0px 0px;
    }
  }
}

.box-guide-main{
  background-color:rgba(0,0,0,.5);

  & .box-content-guide-main{
    width:clamp(373.125px,37.3125cqw,597px);

    &.mobile{
      width:344px;
    }

    & .box-guide-buttons{
      bottom:clamp(25px,2.5cqw,40px);
      left:50%;
      width:100%;
      transform:translate(-50%,0%);

      &.mobile{
        bottom:20px;
      }

      & .button-cancel-guide{
        width:clamp(59.375px,5.9375cqw,95px);
        margin:0px clamp(7.5px,0.75cqw,12px);
        cursor: pointer;

        &.mobile{
          width:129px;
          margin:auto;
        }
      }

      & .button-informed-guide{
        width:clamp(81.25px,8.125cqw,130px);
        margin:0px clamp(7.5px,0.75cqw,12px);
        cursor: pointer;

        &.mobile{
          width:129px;
          margin:24px auto 0px;
        }
      }
    }


  }
}

.box-overlay-background{
  background-color:rgba(0,0,0,.5);
  background-blend-mode: overlay;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  z-index:99;

  & .box-talk-container-main{
    width:100%;
    height:100%;

    &.mobile{
      width:100%;
      height:100vh;
      // background:url('/images/background_main/backdrop-winner-town.webp');
      // background-size:cover;
      // background-repeat: no-repeat;
      // background-position: center center;


      & .box-talk-content-mobile{
        top:70px;
        left:27px;
        width:70%;
        height:30%;
        padding:16px;

        & .text-talk {
          color: #FFF;
          font-size: 20px;
          line-height: 30px; /* 150% */
          text-shadow: rgb(94, 50, 32) 3px 0px 0px, rgb(94, 50, 32) 2.83487px 0.981584px 0px, rgb(94, 50, 32) 2.35766px 1.85511px 0px, rgb(94, 50, 32) 1.62091px 2.52441px 0px, rgb(94, 50, 32) 0.705713px 2.91581px 0px, rgb(94, 50, 32) -0.287171px 2.98622px 0px, rgb(94, 50, 32) -1.24844px 2.72789px 0px, rgb(94, 50, 32) -2.07227px 2.16926px 0px, rgb(94, 50, 32) -2.66798px 1.37182px 0px, rgb(94, 50, 32) -2.96998px 0.42336px 0px, rgb(94, 50, 32) -2.94502px -0.571704px 0px, rgb(94, 50, 32) -2.59586px -1.50383px 0px, rgb(94, 50, 32) -1.96093px -2.27041px 0px, rgb(94, 50, 32) -1.11013px -2.78704px 0px, rgb(94, 50, 32) -0.137119px -2.99686px 0px, rgb(94, 50, 32) 0.850987px -2.87677px 0px, rgb(94, 50, 32) 1.74541px -2.43999px 0px, rgb(94, 50, 32) 2.44769px -1.73459px 0px, rgb(94, 50, 32) 2.88051px -0.838247px 0px;
        }

        & .box-input-main{
          width:100%;
          border-radius: clamp(10px,1cqw,16px);
          border: clamp(1.25px,0.125cqw,2px) solid #472C14;
          background: #FFF;
          margin:clamp(10px,1cqw,16px) 0px;
          padding:0px clamp(10px,1cqw,16px);

        }
      }
    }
  }

  &.tutorial{
    background:transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
  }

  & .box-talk-main{
    top:clamp(306.25px,30.625cqw,490px);
    left:clamp(180px,18cqw,288px);
    width:clamp(518.75px,51.875cqw,830px);

    & .box-content-talk-main{
      top:47%;
      left:clamp(56.25px,5.625cqw,90px);
      width:80%;
      transform:translate(0,-50%);

      & .text-talk{
        color: #FFF;
        font-size: clamp(22.5px,2.25cqw,36px);
        text-shadow: rgb(94, 50, 32) 3px 0px 0px, rgb(94, 50, 32) 2.83487px 0.981584px 0px, rgb(94, 50, 32) 2.35766px 1.85511px 0px, rgb(94, 50, 32) 1.62091px 2.52441px 0px, rgb(94, 50, 32) 0.705713px 2.91581px 0px, rgb(94, 50, 32) -0.287171px 2.98622px 0px, rgb(94, 50, 32) -1.24844px 2.72789px 0px, rgb(94, 50, 32) -2.07227px 2.16926px 0px, rgb(94, 50, 32) -2.66798px 1.37182px 0px, rgb(94, 50, 32) -2.96998px 0.42336px 0px, rgb(94, 50, 32) -2.94502px -0.571704px 0px, rgb(94, 50, 32) -2.59586px -1.50383px 0px, rgb(94, 50, 32) -1.96093px -2.27041px 0px, rgb(94, 50, 32) -1.11013px -2.78704px 0px, rgb(94, 50, 32) -0.137119px -2.99686px 0px, rgb(94, 50, 32) 0.850987px -2.87677px 0px, rgb(94, 50, 32) 1.74541px -2.43999px 0px, rgb(94, 50, 32) 2.44769px -1.73459px 0px, rgb(94, 50, 32) 2.88051px -0.838247px 0px;
      }

      & .box-input-main{
        width:50%;
        border-radius: clamp(10px,1cqw,16px);
        border: clamp(1.25px,0.125cqw,2px) solid #472C14;
        background: #FFF;
        margin:clamp(10px,1cqw,16px) 0px;
        padding:0px clamp(10px,1cqw,16px);

      }
    }
  }

  & .box-tutorial-main{
    width:100%;
    height:100%;
  }

  & .box-button-next-talk{
    bottom:clamp(54.375px,5.4375cqw,87px);
    left:clamp(570px,57cqw,912px);
    width:clamp(98.75px,9.875cqw,158px);
    cursor:pointer;

    &.disable{
      cursor:default;
    }
  }

  & .box-button-start-town{
    bottom:clamp(54.375px,5.4375cqw,87px);
    left:clamp(570px,57cqw,912px);
    width:clamp(98.75px,9.875cqw,158px);
    cursor:pointer;
  }

  & .box-character-main{
    bottom:clamp(-115px,-7.1875cqw,-71.875px);
    right:0;
    width:clamp(308.125px,30.8125cqw,493px);
  }

  & .box-talk-mobile{
    width:100%;
    max-width:360px;
    height:100vh;
    margin:auto;
  }

  & .box-tutorial-mobile{
    width: 100%;
    max-width:360px;
    height: 100vh;
    margin:auto;
  }
}

.scrollable-background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;

  &.dragging {
    cursor: grabbing;
  }

  &:active {
    cursor: grabbing;
  }

  // สำหรับ Mobile ให้แน่ใจว่าสามารถเลื่อนได้
  @media (max-width: 1023px) {
    touch-action: none;
    -webkit-overflow-scrolling: touch;
    -webkit-tap-highlight-color: transparent;
  }
}

// Enhanced grabbing for id selector
#scrollable-background-container {
  pointer-events: auto;

  &.dragging {
    cursor: grabbing !important;

    * {
      cursor: grabbing !important;
    }
  }

  // Ensure all child elements can be grabbed
  > * {
    pointer-events: auto;
  }
}

.zoomed-background-wrapper {
  width: 200%;
  height: 200%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  will-change: transform;

  &.mobile{
    // ใช้ fixed size เพื่อให้ wrapper ไม่หดตามหน้าจอ
    width: 100%;
    height: 1600px;
    min-width: 2000px;
    min-height: 1600px;
    max-width: 900px;
    max-height: 1600px;
    margin:auto;
    will-change: transform;
  }
}

.zoomed-background {
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transform-origin: center center;
  display: block;
  position: relative;

  :deep(.fit) {
    width: 100%;
    height: 100%;
  }
}
// #endregion

// #region Button
.button-lobby{
  bottom:clamp(15px,1.5cqw,24px);
  right:clamp(15px,1.5cqw,24px);
  width: clamp(62.5px,6.25cqw,100px);
  cursor:pointer;

  &.mobile{
    width:58px;
    bottom:10px;
    right:10px;
  }
}

.box-button-header-main{
  width:fit-content;
  top:clamp(15px,1.5cqw,24px);
  right:clamp(12.5px,1.25cqw,20px);

  &.mobile{
    top:10px;
    right:16px;
  }

  & .button-mail{
    width:clamp(52.5px,5.25cqw,84px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:54px;
      margin:0px 0px 4px;
    }
  }

  .button-setting{
    width:clamp(52.5px,5.25cqw,84px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:54px;
      margin:4px 0px;
    }
  }

  .button-guide{
    width:clamp(52.5px,5.25cqw,84px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:54px;
      margin:4px 0px;
    }
  }

  .button-quest{
    width:clamp(52.5px,5.25cqw,84px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:54px;
      margin:4px 0px;
    }
  }

  .button-shop{
    width:clamp(52.5px,5.25cqw,84px);
    margin:0px clamp(2.5px,0.25cqw,4px);
    cursor:pointer;

    &.mobile{
      width:54px;
      margin:4px 0px;
    }
  }
}


// #endregioon


// #region Animation
.animation-fade-in{
  animation: fadeIn 1s ease-in 2.2s forwards;
  opacity: 0;

  &.mobile{
    animation: fadeIn 1s ease-in 0s forwards;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
// #endregion

// #region Zoom Controls
.box-zoom-controls{
  bottom:80px;
  right:10px;
  z-index:100;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:8px;

  & .button-zoom-in,
  & .button-zoom-out{
    width:44px;
    height:44px;
    border-radius:50%;
    background:rgba(0,0,0,0.6);
    backdrop-filter:blur(4px);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    box-shadow:0 2px 8px rgba(0,0,0,0.3);
    transition:all 0.2s ease;

    &:active{
      transform:scale(0.95);
      background:rgba(0,0,0,0.8);
    }
  }

  & .text-zoom-level{
    font-size:12px;
    color:white;
    background:rgba(0,0,0,0.6);
    backdrop-filter:blur(4px);
    padding:4px 8px;
    border-radius:12px;
    font-weight:bold;
    min-width:32px;
    text-align:center;
  }
}
// #endregion

.box-dialog-alert-main{
  width:100%;
  padding:16px;

  & .box-alert{
    width:fit-content;
    padding:clamp(6.25px,0.625cqw,10px) clamp(10px,1cqw,16px);
    margin:auto;
    font-size:clamp(10px,1cqw,16px);
    background-color: #fa1919;
    border-radius: clamp(6.25px,0.625cqw,10px);
    color:#fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,0.5);
  }
}
</style>
