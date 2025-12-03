<template>
  <q-page
    :class="{
      'backdrop-languagetip': practiceStore.practiceType == 'languagetips',
      'backdrop-grammarlesson': practiceStore.practiceType == 'grammarlesson',
      'backdrop-phonicslesson': practiceStore.practiceType == 'phonicslesson',
    }"
    class="row justify-center items-center"
  >
    <!-- #region Animation Bar Skill -->
    <div class="fixed-top">
      <div
        :skill="practiceStore.skill"
        :class="isDesktop ? 'background-bar' : 'background-bar-mobile'"
      ></div>
    </div>

    <div class="fixed-bottom">
      <div
        :skill="practiceStore.skill"
        :class="isDesktop ? 'background-bar' : 'background-bar-mobile'"
      ></div>
    </div>
    <!-- #endregion -->

    <!-- #region Desktop -->
    <div class="box-container-main relative-position" v-if="$q.platform.is.desktop">
      <!-- Background -->
      <background-main :background="setBackground"></background-main>

      <!-- #region Content -->
      <div
        v-if="!practiceData.isLoadPractice && !synchronizeStore.isSync"
        class="absolute-top box-practice-main-mobile"
      >
        <!-- #region Lesson List -->
        <div class="absolute-top box-lesson-list">
          <q-img
            src="/images/label_main/label-topic-lesson.png"
            no-spinner
            no-transition
          ></q-img>
          <div
            class="box-lesson-scroll"
            :class="practiceType == 'grammarlesson' ? 'backdrop' : ''"
            align="center"
          >
            <div
              v-for="(item, index) in lessonList"
              :key="index"
              class="button-active-main button-lesson relative-position"
              :class="
                activeLessonList == index
                  ? 'selected'
                  : funcCheckHasPassedLesson(index)
                  ? 'success'
                  : ''
              "
              @click="clickLessonList(index, item)"
            >
              <div
                class="sub-content"
                :class="
                  activeLessonList == index
                    ? 'selected'
                    : funcCheckHasPassedLesson(index)
                    ? 'success'
                    : ''
                "
              >
                <div class="row fit" align="left">
                  <div class="col self-center">
                    <span class="font-mali-m">{{ item.name }}</span>
                  </div>

                  <div class="col-1 self-center icon-lesson-check" align="center">
                    <q-img
                      :src="`/images/icon_main/icon-lesson-check-${
                        activeLessonList == index
                          ? 'white'
                          : funcCheckHasPassedLesson(index)
                          ? 'green'
                          : 'white'
                      }.png`"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>

              <div class="absolute-top-right icon-recommend" v-if="item.isNewData">
                <q-img
                  src="/images/label_main/label-lesson-recommend.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Video And Sound Content -->
        <div class="absolute-top box-video-content">
          <div class="box-direction font-mali-r">
            {{ `คำแนะนำ` }}
          </div>
          <div class="box-direction-recommend">
            <!-- Type : Grammar lesson -->
            <div class="row" v-if="practiceStore.practiceType == 'grammarlesson'">
              <div class="self-center">
                {{ `ดูวิดีโอ ` }}
              </div>
              <div class="col-1 self-center box-recommend font-mali-r">
                {{ `Recommend` }}
              </div>
              <div class="self-center" style="margin-left: 12%">
                {{ `ทั้งหมด เพื่อเข้าสู่เนื้อหาต่อไป` }}
              </div>
            </div>

            <!-- Type : Other -->
            <div v-else class="font-mali-r">
              <div>
                {{ `เรียนเนื้อหา ${showRecommend} เพื่อเตรียมตัวทำแบบฝึกหัดต่อไป` }}
              </div>
            </div>
          </div>

          <!-- #region Video And Sound -->
          <div class="box-video-container">
            <!-- #region Photo And Sound -->
            <div
              class="relative-position"
              v-if="lessonList[activeLessonList].soundUrl != ''"
            >
              <div
                align="center"
                class="text-h6 text-white q-pa-md box-label-title"
                :class="$q.platform.is.desktop ? 'q-mb-md' : ''"
                :data-type="practiceType"
                v-if="isSynchronize"
              >
                {{ lessonList[activeLessonList].label }}
              </div>

              <q-img
                class="relative-position"
                :src="lessonList[activeLessonList].imageUrl"
                fit="contain"
                style="z-index: 2"
                no-transition
                no-spinner
              >
                <div class="absolute-bottom-left bg-transparent" v-if="!isSynchronize">
                  <q-btn
                    push
                    round
                    icon="fas fa-volume-up"
                    v-if="practiceSkill != 'Grammar' && $q.platform.is.desktop"
                    :class="
                      isAudioPaying ? 'bg-green text-white ' : 'volume-btn text-black'
                    "
                    size="lg"
                    @click="playAudio()"
                  >
                  </q-btn>
                </div>
              </q-img>

              <div
                align="center"
                class="q-pa-lg"
                v-if="
                  practiceSkill != 'Grammar' &&
                  $q.platform.is.mobile &&
                  lessonList[activeLessonList].soundUrl
                "
              >
                <q-btn
                  style="z-index: 2"
                  push
                  round
                  icon="fas fa-volume-up"
                  :class="
                    isAudioPaying ? 'bg-green text-white ' : 'volume-btn text-black'
                  "
                  size="20px"
                  @click="playAudio()"
                >
                </q-btn>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Video -->
            <div v-if="lessonList[activeLessonList].vdoUrl != ''">
              <video
                v-if="practiceStore.practiceType == 'grammarlesson'"
                :poster="lessonList[activeLessonList].imageUrl"
                controls
                controlsList="nodownload"
                :src="
                  'https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/grammar/vdoGrammar/vdo/' +
                  lessonList[activeLessonList].id +
                  '.mp4'
                "
                preload="none"
                class="relative-position"
                style="width: 100%; z-index: 2"
                @play="systemStore.playVideo(true)"
                @pause="systemStore.playVideo(false)"
                :id="lessonList[activeLessonList].id"
              ></video>

              <video
                v-else
                :poster="lessonList[activeLessonList].imageUrl"
                controls
                controlsList="nodownload"
                :src="lessonList[activeLessonList].vdoUrl"
                preload="none"
                class="relative-position"
                style="width: 100%; z-index: 2"
                @play="systemStore.playVideo(true)"
                @pause="systemStore.playVideo(false)"
                :id="lessonList[activeLessonList].id"
              ></video>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- Button Finish -->
          <div
            class="button-active-main button-finish"
            :class="isCheckLearningFinish ? '' : 'disable'"
            @click="isCheckLearningFinish ? funcFinishLesson() : null"
            align="center"
          >
            <div class="z-top width-fit relative-position font-mali-m">
              {{ `จบบทเรียน` }}
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-setting="funcShowDialogSetting()"
        @callback-tutorial="funcShowDialogTutorial()"
        :page="pageName"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Winny -->
      <div
        class="absolute-top-right box-winny-conatiner"
        v-if="systemStore.routerName == 'grammarlesson'"
      >
        <winny-icon @click="funcOpenChat()"></winny-icon>
      </div>
      <!-- #endregion -->

      <!-- #region Winny Chat -->
      <div
        class="absolute-bottom-right box-winny-chat-main"
        :class="isShowWinnyChat ? 'show' : ''"
        v-if="isShowAnimationWinnyChat"
      >
        <div class="fit relative-position">
          <winny-chat
            :isShowWinnyChat="isShowWinnyChat"
            @callback-closeDialog="isShowWinnyChat = false"
            v-if="isShowWinnyChat"
          ></winny-chat>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Control Mode -->
      <div
        class="absolute-top box-control-main"
        v-if="synchronizeStore.isSync && !practiceData.isLoadPractice"
      >
        <div class="box-header-control" align="center">
          <div class="sub-control font-mali-m f16">
            {{ `${lessonList[syncData.lesson.currentLessonIndex].label}` }}
          </div>
        </div>
        <div class="box-lesson-control">
          <q-img
            class="relative-position"
            :src="lessonList[syncData.lesson.currentLessonIndex].imageUrl"
            fit="contain"
            style="z-index: 2"
            no-transition
            no-spinner
          >
          </q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div
      class="box-container-main-mobile absolute-center"
      :skill="practiceStore.skill"
      v-if="!$q.platform.is.desktop"
    >
      <!-- #region Header -->
      <header-bar
        :practiceData="practiceData"
        @callback-setting="funcShowDialogSetting()"
        @callback-tutorial="funcShowDialogTutorial()"
        :page="pageName"
      ></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div
        v-if="!practiceData.isLoadPractice && !synchronizeStore.isSync"
        style="max-width: 600px; width: 100%; margin: auto"
      >
        <!-- #region Header Recommend -->
        <div class="q-pa-sm">
          <div class="box-direction font-mali-r mobile">
            {{ `คำแนะนำ` }}
          </div>

          <div class="box-direction-recommend mobile">
            <!-- #region Type : Grammar lesson -->
            <div
              class="relative-position"
              v-if="practiceStore.practiceType == 'grammarlesson'"
            >
              <div class="col-1 width-fit self-center">
                <div
                  v-html="
                    `ดูวิดีโอ &nbsp;&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ทั้งหมด เพื่อเข้าสู่เนื้อหาต่อไป`
                  "
                ></div>
              </div>
              <div class="absolute-top font-mali-r box-recommend mobile">
                {{ `Recommend` }}
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Type : Other -->
            <div v-else class="font-mali-r">
              <div>
                {{ `เรียนเนื้อหา ${showRecommend} เพื่อเตรียมตัวทำแบบฝึกหัดต่อไป` }}
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Select Lesson List -->
        <div class="q-pa-sm">
          <!-- #region Show Selected Lesson -->
          <div class="box-select-lesson-list">
            <div class="row font-mali-r" @click="isShowDialogMenuLessonList = true">
              <div
                class="col-1 box-select-label-overflow"
                :style="selectedLess.isNewData ? '' : 'max-width:90%'"
              >
                {{ `${selectedLess.label}` }}
              </div>
              <div
                class="col-1 self-center box-icon-recommend"
                v-if="selectedLess.isNewData"
              >
                {{ `Recommend` }}
              </div>
              <q-space></q-space>
              <div class="col-1" style="width: 30px" align="center">
                <q-icon name="fas fa-caret-down"></q-icon>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Video And Sound Content -->
          <div class="q-py-md">
            <!-- #region Sound Content -->
            <div v-if="lessonList[activeLessonList].soundUrl != ''">
              <q-img
                class="relative-position"
                :src="lessonList[activeLessonList].imageUrl"
                fit="contain"
                style="z-index: 2"
                no-transition
                no-spinner
              >
                <div
                  class="absolute-bottom-left transparent no-padding"
                  v-if="!isSynchronize"
                >
                  <div class="q-pa-sm">
                    <q-btn
                      push
                      round
                      icon="fas fa-volume-up"
                      :class="
                        isAudioPaying ? 'bg-green text-white ' : 'volume-btn text-black'
                      "
                      size="sm"
                      @click="playAudio()"
                    >
                    </q-btn>
                  </div>
                </div>
              </q-img>
              <div class="q-mt-md q-pb-xl" align="center">
                <div
                  class="button-active-main button-play-sound-again"
                  @click="playAudio()"
                >
                  <div
                    class="row fit justify-center items-center z-top relative-position"
                  >
                    <div class="q-pr-sm">
                      <q-icon name="fas fa-volume-up" class="f20"></q-icon>
                    </div>
                    <div class="font-mali-m f16">ฟังอีกครั้ง</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Video -->
            <div v-if="lessonList[activeLessonList].vdoUrl != ''">
              <video
                :poster="lessonList[activeLessonList].imageUrl"
                controls
                controlsList="nodownload"
                :src="lessonList[activeLessonList].vdoUrl"
                preload="none"
                class="relative-position"
                style="width: 100%; z-index: 2"
                @play="systemStore.playVideo(true)"
                @pause="systemStore.playVideo(false)"
                :id="lessonList[activeLessonList].id"
              ></video>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region Button Finish, Next and Pervious -->
        <div class="q-px-sm row">
          <div
            class="col-1 self-center button-active-main button-caret-mobile row justify-center items-center relative-position"
            :class="currentLessonIndex != 0 ? '' : 'disable'"
          >
            <div class="self-center z-top icon-arrow left">
              <q-icon
                name="fas fa-caret-left"
                @click="
                  currentLessonIndex == 0 ? null : funcNextAndPerviousLesson('pervious')
                "
              >
              </q-icon>
            </div>
          </div>
          <div
            class="col-1 button-active-main button-finish mobile"
            :class="isCheckLearningFinish ? '' : 'disable'"
            @click="isCheckLearningFinish ? funcFinishLesson() : null"
          >
            <div class="z-top relative-position font-mali-m">
              {{ `จบบทเรียน` }}
            </div>
          </div>

          <div
            class="col-1 self-center button-active-main button-caret-mobile row justify-center items-center relative-position"
            :class="currentLessonIndex + 1 == lessonList.length ? 'disable' : ''"
          >
            <div class="self-center z-top icon-arrow right">
              <q-icon
                name="fas fa-caret-right"
                @click="
                  currentLessonIndex + 1 == lessonList.length
                    ? null
                    : funcNextAndPerviousLesson('next')
                "
              >
              </q-icon>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Winny -->
      <div
        class="absolute-bottom-right z-max box-winny-conatiner-mobile"
        v-if="systemStore.routerName == 'grammarlesson'"
      >
        <winny-icon @click="funcOpenChat()"></winny-icon>
      </div>
      <!-- #endregion -->

      <!-- #region Winny Chat -->
      <winny-chat
        v-if="isShowWinnyChat"
        @callback-closeDialog="isShowWinnyChat = false"
      ></winny-chat>
      <!-- #endregion -->

      <!-- #region Control Mode -->
      <div
        class="box-control-main mobile"
        v-if="synchronizeStore.isSync && !practiceData.isLoadPractice"
      >
        <div class="box-header-control mobile" align="center">
          <div class="sub-control mobile font-mali-m">
            {{ `${lessonList[syncData.lesson.currentLessonIndex].label}` }}
          </div>
        </div>
        <div class="box-lesson-control">
          <q-img
            class="relative-position"
            :src="lessonList[syncData.lesson.currentLessonIndex].imageUrl"
            fit="contain"
            style="z-index: 2"
            no-transition
            no-spinner
          >
          </q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Menu Losson List Mobile Mode -->
  <q-dialog v-model="isShowDialogMenuLessonList" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="absolute-center full-width q-pa-sm">
          <div class="box-menu-select-lesson">
            <div
              v-for="(itemLessonList, indexLessonList) in lessonList"
              :key="indexLessonList"
              @click="clickLessonList(indexLessonList, itemLessonList)"
            >
              <div
                class="button-menu-select-lesson row"
                :class="
                  activeLessonList == indexLessonList
                    ? 'selected'
                    : funcCheckHasPassedLesson(indexLessonList)
                    ? 'success'
                    : ''
                "
              >
                <div
                  class="box-select-label-overflow"
                  :style="itemLessonList.isNewData ? '' : 'max-width:90%'"
                >
                  {{ ` ${itemLessonList.label}` }}
                </div>
                <div
                  class="col-1 self-center box-icon-recommend"
                  v-if="itemLessonList.isNewData"
                >
                  {{ `Recommend` }}
                </div>
                <q-space></q-space>
                <div class="col-1 self-center icon-lesson-check mobile" align="center">
                  <q-img
                    :src="`/images/icon_main/icon-lesson-check-${
                      activeLessonList == indexLessonList
                        ? 'white'
                        : funcCheckHasPassedLesson(indexLessonList)
                        ? 'green'
                        : 'white'
                    }.png`"
                    no-spinner
                    no-transition
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

  <!-- #region Dialog Finish Lesson -->
  <dialog-finish-lesson
    v-if="isShowDialogFinishLesson"
    :practiceData="practiceData"
    @callback-closeDialog="isShowDialogFinishLesson = false"
    @callback-restart="funcRestartLesson()"
  ></dialog-finish-lesson>
  <!-- #endregion -->

  <loading :isShowLoading="isShowLoading"></loading>
</template>

<script setup>
// New
import dialogFinishLesson from "../components/dialog_main/dialog-finish-lesson.vue";

import winnyIcon from "../components/ai_character_main/winny-icon.vue";
import winnyChat from "src/components/ai_character_main/winny-chat.vue";
// import dialogFinishPractice from "src/components/dialog_main/dialog-finish-practice.vue";

import headerBar from "src/components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";

// import winChat from "../components/dialog_main/win-chat.vue";

import loading from "../components/dialog-loading.vue";
import aiCharacter from "../components/ai_character_main/ai-character.vue";

import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  defineComponent,
  reactive,
} from "vue";
import { analyticsLogEvent, db } from "src/router";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
import { useCourseStore } from "src/stores/course";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";

const CancelToken = axios.CancelToken;
let tokenAPI;

// Component
const component = defineComponent({
  headerBar,

  loading,
  // winChat,
  backgroundMain,
  aiCharacter,

  // New
  // dialogFinishPractice,
  winnyIcon,
  winnyChat,
});

// Props
const props = defineProps({
  isSynchronize: {
    type: Boolean,
    default: false,
  },
  syncData: {
    type: Object,
    default: () => {},
  },
});

// Initialize
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Store
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();

// Data
const practiceType = ref("");
const selectedLess = ref("");
const studentId = ref("");
const practiceData = reactive({
  isLoadPractice: true,
  isShowDialogStartPractice: false,
  isFirstTimeReward: false,
  isFinishAll: false,
});

// Boolean
const isCloseUI = ref(true);
const isShowLoading = ref(true);
const isShowDialogMenuLessonList = ref(false);
const isShowWinnyChat = ref(false);

// scroll style
const thumbStyle = {
  right: "4px",
  borderRadius: "5px",
  backgroundColor: "#9f220c",
  width: "5px",
  opacity: 0.75,
};

const barStyle = {
  right: "2px",
  borderRadius: "9px",
  backgroundColor: "#9f220c",
  width: "9px",
  opacity: 0.2,
};

// #region Function
const lessonList = ref([]);

// lesson List ปัจจุบันที่เลือกอยู่
const activeLessonList = ref(0);

// เก็บค่า List ที่เคยกดไปแล้ว
const passedlessonList = ref([]);

// เพิ่มตัวแปรสำหรับจัดการ cleanup
const currentAudio = ref(null);
const currentVideo = ref(null);

// กด lesson List
let listenVdo = null;
const clickLessonList = (index, data) => {
  // Cleanup ก่อน
  cleanupCurrentMedia();

  if (listenVdo) {
    clearTimeout(listenVdo);
    listenVdo = null;
  }

  activeLessonList.value = index;

  let item = lessonList.value[activeLessonList.value];

  if (!item) return; // เพิ่ม null check

  isAudioPaying.value = false;

  if (item.vdoUrl) {
    listenVdo = setTimeout(() => {
      let el = document.getElementById(item.id);
      if (el) {
        currentVideo.value = el;
        el.play().catch(err => console.log('Video play error:', err));
      }
      clearTimeout(listenVdo);
      listenVdo = null;
    }, 500);
  }

  if (item.soundUrl) {
    try {
      currentAudio.value = item.soundUrl;
      item.soundUrl.play();
      typeSelect.value = "slide";
    } catch (err) {
      console.log('Audio play error:', err);
    }
  } else {
    typeSelect.value = "vdo";
  }

  let findPassedLesson = passedlessonList.value.find(
    (x) => x.index == activeLessonList.value
  );

  if (!findPassedLesson) {
    passedlessonList.value.push({ index: activeLessonList.value, ...item });
  }

  selectedLess.value = data;
  currentLessonIndex.value = index;
  isShowDialogMenuLessonList.value = false;
};

// เพิ่มฟังก์ชัน cleanup
const cleanupCurrentMedia = () => {
  // Pause และ cleanup video
  if (currentVideo.value) {
    try {
      currentVideo.value.pause();
      currentVideo.value = null;
    } catch (err) {
      console.log('Video cleanup error:', err);
    }
  }

  // Pause และ cleanup audio
  if (currentAudio.value) {
    try {
      currentAudio.value.pause();
      currentAudio.value = null;
    } catch (err) {
      console.log('Audio cleanup error:', err);
    }
  }
};

//
const funcCheckHasPassedLesson = (index) => {
  return passedlessonList.value.map((x) => x.index).includes(index);
};

// #region Load Lesson
const isLoadPractice = ref(false);
const funcLoadLesson = async () => {
  try {
    isShowLoading.value = true;

    practiceData.isLoadPractice = true;

    practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

    const url = `${process.env.NEWAPI}/practice-getPracticeData`;
    const postData = {
      practiceListId: route.params.practiceListId,
      requestURL: window.location.hash,
    };

    if (tokenAPI != undefined) tokenAPI();

    const response = await axios.post(url, postData, {
      cancelToken: new CancelToken(function executor(c) {
        tokenAPI = c;
      }),
    });

    response.data.forEach((res) => {
      if (res.soundUrl) {
        res.soundUrl = new Audio(res.soundUrl);
      }
    });

    let sortData = response.data.sort((a, b) => a.order - b.order);

    sortData = sortData.map((x, index) => {
      let newData = { label: x.name, value: index, ...x };

      return newData;
    });

    lessonList.value = sortData;

    selectedLess.value = lessonList.value[0];

    if (synchronizeStore.isSync) {
      practiceData.isFinishAll = true;

      const practiceLogData = {
        practiceListId: route.params.practiceListId,
        score: 0,
        star: 0,
        coin: 0,
        ...practiceData,
      };

      await practiceStore.savePracticeLog(practiceLogData, $q.platform.is);
    }

    activeLessonList.value = Number(lessonList.value[0].value);
    passedlessonList.value.push({ ...lessonList.value[0], index: 0 });

    isLoadPractice.value = true;
    isShowLoading.value = false;
    practiceData.isLoadPractice = false;
  } catch (error) {
    // console.log(error);
  }
};
// #endregion

// Type select between video and slide
const typeSelect = ref("vdo");

const isShowRadioSelect = ref(false);
const practiceSkill = ref("");

// Check Practice Skill
const funcLoadSkill = async () => {
  isLoadPractice.value = false;
  isShowLoading.value = true;

  let response = await db
    .collection("practiceList")
    .doc(route.params.practiceListId)
    .get();

  practiceSkill.value = response.data().skill;
  practiceType.value = response.data().practiceType;

  if (response.data().skill != "Grammar") {
    isShowRadioSelect.value = true;
  }
};

// Play Audio
const isAudioPaying = ref(false);
const playAudio = () => {
  try {
    const currentLesson = lessonList.value[activeLessonList.value];
    if (currentLesson && currentLesson.soundUrl) {
      systemStore.playSound(currentLesson.soundUrl);
    }
  } catch (err) {
    console.log('Play audio error:', err);
  }
};

// Save PracticeLog ตอนเข้ามาที่ Flashcard

const isShowDialogFinishLesson = ref(false);
const funcFinishLesson = async () => {
  isShowLoading.value = true;

  // Cleanup media ก่อน
  cleanupCurrentMedia();

  const practiceLogData = {
    practiceListId: route.params.practiceListId,
    score: 0,
    star: 0,
    coin: 0,
    ...practiceData,
  };

  let element = document.getElementById(lessonList.value[activeLessonList.value]?.id);

  if (element) {
    try {
      element.pause();
    } catch (err) {
      console.log('Element pause error:', err);
    }
  }

  let findLessonRecommend = lessonList.value.filter((x) => x.isNewData);

  let findLearningRecommend = passedlessonList.value.filter((x) => x.isNewData);

  if (findLessonRecommend.length == findLearningRecommend.length) {
    practiceData.isFinishAll = true;
  } else {
    practiceData.isFinishAll = false;
  }

  try {
    await practiceStore.savePracticeLog(practiceLogData, $q.platform.is);
  } catch (err) {
    console.log('Save practice log error:', err);
  }

  isShowLoading.value = false;
  isShowDialogFinishLesson.value = true;

  // $router.replace('/practice/unit')
};

const funcFinishLessonModeSync = async () => {
  const practiceLogData = {
    practiceListId: route.params.practiceListId,
    score: 0,
    star: 0,
    coin: 0,
    ...practiceData,
  };

  await practiceStore.savePracticeLog(practiceLogData, $q.platform.is);
};

// #region Button Next And Pervious
const currentLessonIndex = ref(0);
const funcNextAndPerviousLesson = (type) => {
  if (type == "next") {
    if (currentLessonIndex.value == lessonList.value.length - 1) return;
    currentLessonIndex.value++;
  } else {
    if (currentLessonIndex.value == 0) return;
    currentLessonIndex.value--;
  }

  let findLessonData = lessonList.value[currentLessonIndex.value];

  clickLessonList(currentLessonIndex.value, findLessonData);
};
// #endregion

// #region Show Dialog Setting
const funcShowDialogSetting = () => {
  cleanupCurrentMedia();

  let element = document.getElementById(lessonList.value[activeLessonList.value]?.id);

  if (element) {
    try {
      element.pause();
    } catch (err) {
      console.log('Element pause error:', err);
    }
  }
};
// #endregion

// #region Show Dialog Tutorial
const funcShowDialogTutorial = () => {
  cleanupCurrentMedia();

  let element = document.getElementById(lessonList.value[activeLessonList.value]?.id);

  if (element) {
    try {
      element.pause();
    } catch (err) {
      console.log('Element pause error:', err);
    }
  }
};
// #endregion

// #region Restart
const funcRestartLesson = () => {
  practiceData.isLoadPractice = true;
  isShowDialogFinishLesson.value = false;

  activeLessonList.value = 0;
  passedlessonList.value = [];
  lessonList.value = [];

  funcLoadLesson();
};
// #endregion

// #region Open Chat
const isShowAnimationWinnyChat = ref(false);
const funcOpenChat = () => {
  isShowAnimationWinnyChat.value = true;
  isShowWinnyChat.value = !isShowWinnyChat.value;
};
// #endregion

// #endregion

// #region Computed

// #region Check Learning Finish
const isCheckLearningFinish = computed(() => {
  let findLessonRecommend = lessonList.value.filter((x) => x.isNewData);
  let findLearningRecommend = passedlessonList.value.filter((x) => x.isNewData);

  return findLearningRecommend.length >= findLessonRecommend.length;
});
// #endregion

// #region Set Recommend
const showRecommend = computed(() => {
  let text = "Phonics";

  if (practiceStore.practiceType == "languagetips") {
    text = "Language tips";
  }

  return text;
});
// #endregion

// #region Set Background
const setBackground = computed(() => {
  let background = "";

  if (practiceStore.practiceType == "grammarlesson") {
    background = "background-grammar-lesson";
  } else if (practiceStore.practiceType == "phonicslesson") {
    background = "background-phonics-lesson";
  } else if (practiceStore.practiceType == "languagetips") {
    background = "background-languagetips";
  }

  return background;
});
// #endregion

// #endregion

const setVH = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

let authListen;
let currentClass = "";
const isSync = ref(false);
const isEnableAnimationScroll = ref(true);
const isShowAiCharacter = ref(false);
const pageName = ref("");
onMounted(async () => {
  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      window.addEventListener("resize", setVH);
      window.addEventListener("load", setVH);

      studentId.value = user.uid;
      // User is signed in.

      if ($q.sessionStorage.has("isSync")) {
        isSync.value = $q.sessionStorage.getItem("isSync");
      }

      const courseStore = useCourseStore();
      currentClass = courseStore.course.data.class;

      // await funcLoadSkill();

      if (practiceStore.practiceType == "grammarlesson") {
        systemStore.setRouter("grammarlesson");
        pageName.value = "grammarlesson";
      } else if (practiceStore.practiceType == "phonicslesson") {
        systemStore.setRouter("phonicslesson");
        pageName.value = "phonicslesson";
      } else if (practiceStore.practiceType == "languagetips") {
        systemStore.setRouter("languagetips");
        pageName.value = "languagetips";
      }

      if (analyticsLogEvent != null) {
        analyticsLogEvent("/vdoLesson/" + practiceType);
      }

      // if (isSync.value) {
      //   funcFinishLessonModeSync();
      // }

      await funcLoadLesson();
      isShowAiCharacter.value = true;
    } else {
      // User is signed out.
      router.replace("/");
    }
  });
});

onBeforeUnmount(() => {
  // Cleanup ทั้งหมด
  cleanupCurrentMedia();

  systemStore.playVideo(false);

  if (authListen) {
    authListen();
  }

  if (tokenAPI != undefined) {
    try {
      tokenAPI();
    } catch (err) {
      console.log('Token cleanup error:', err);
    }
  }

  // Clear timeout
  if (listenVdo) {
    clearTimeout(listenVdo);
    listenVdo = null;
  }
});
</script>

<style lang="scss" scoped>
// #region Container
.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  overflow: hidden;
}

.box-container-main-mobile {
  max-width: 1000px;
  min-width: 320px;
  width: 100%;
  height: 100%;
}

.box-control-main {
  width: 60%;
  top: 16.4444%;
  left: 20%;
  height: 100%;

  &.mobile {
    max-width: 650px;
    width: 100%;
    min-width: 360px;
    margin: 16px auto;
  }

  & .box-header-control {
    max-width: 960px;
    width: 100%;
    min-width: 360px;

    border-radius: 10px;
    border: 1px solid #4a261b;
    background: #cacaca;
    padding-bottom: 4px;

    // &.mobile {
    //   // border-radius: 5px;
    //   // padding-bottom: 2px;
    // }

    & .sub-control {
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 9px;
      font-size: 16px;
      background: #fff;
      color: #4a261b;

      &.mobile {
        font-size: 12px;
        // border-radius: 0px 0px 9px 9px;
      }
    }
  }

  & .box-lesson-control {
    margin: 1.668% 0%;
  }
}

.box-test-background {
  background-image: url("/images/background_main/background-grammar-lesson.png");
  background-size: cover;
  background-position: 90% 100%;
  background-repeat: no-repeat;
}

.box-container-main-mobile[skill="Grammar"] {
  background-image: url("/images/background_main/background-grammar-lesson.png");
  background-size: cover;
  background-position: 90% 100%;
  background-repeat: no-repeat;
}

.box-container-main-mobile[skill="Phonics"] {
  background-image: url("/images/background_main/background-phonics-lesson.png");
  background-size: cover;
  background-position: 8% 80%;
  background-repeat: no-repeat;
}

.box-container-main-mobile[skill="Listening"] {
  background-image: url("/images/background_main/background-languagetips.png");
  background-size: cover;
  background-position: 50% 70%;
  background-repeat: no-repeat;
}

.background-bar {
  width: 200%;
  height: 50px;
}

.background-bar[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar-mobile {
  position: relative;
  background-size: contain;
  background-position: left;
  background-origin: content-box;
  width: 4800px;
  height: 50px;
}

.background-bar-mobile[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar-bar.png");
}

.background-bar-mobile[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics-bar.png");
}

.background-bar-mobile[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening-bar.png");
}

.backdrop-languagetip {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.backdrop-grammarlesson {
  background-image: url("/images/background_main/backdrop-grammar.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.backdrop-phonicslesson {
  background-image: url("/images/background_main/backdrop-phonics.png");
  background-repeat: no-repeat;
  background-size: cover;
}

// #endregion

// #region Box Content

.box-lesson-list {
  max-width: 376px;
  width: 23.5%;
  height: 100%;
  top: 8.7%;
  left: 3.5%;
}

.box-lesson-scroll {
  height: calc(100% - 16.3%);
  border: 0.1rem solid #006cac;
  border-radius: 0rem 0rem 0.5rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: auto;
  padding: 2%;
}

.box-lesson-scroll.backdrop {
  background-color: rgba(0, 108, 172, 0.5) !important;
}

.box-video-content {
  width: 58.75%;
  top: 8.7%;
  left: 28.5%;
}

.box-video-container {
  margin: 3% 0%;
}

.box-practice-main-mobile {
  top: 0%;
  height: 100%;
}

.box-direction {
  width: fit-content;
  background-color: #d21919;
  border: 0.1rem solid #8a1818;
  padding: 0.161% 0.76%;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  color: #fff;
  font-size: clamp(10px, 1vw, 16px);
}

.box-direction.mobile {
  width: 80px;
  border-radius: 8px 8px 0px 0px;
  font-size: 14px;
  border: 1px solid #d21919;
  padding: 2px 3px;
  text-align: center;
}

.box-direction-recommend {
  background-color: #fff;
  border: 0.1rem solid #8a1818;
  padding: 2.022% 0.77%;
  border-radius: 0rem 1rem 1rem 1rem;
  font-size: clamp(10px, 1vw, 16px);
  line-height: 0;
}

.box-direction-recommend.mobile {
  border-radius: 0px 16px 16px 16px;
  line-height: 1.8;
  font-size: 14px;
  padding: 7px;
  border: 1px solid #8a1818;
}

.box-recommend {
  position: absolute;
  left: 6.5%;
  width: fit-content;
  background-color: #ffaa2e;
  border-radius: 0.2rem;
  padding: 1.084% 0.912%;
  color: #000000;
  font-size: clamp(8px, 0.75vw, 12px);
  margin: 0% 1%;
}

.box-recommend.mobile {
  left: 50px;
  top: 3px;
  border-radius: 3.2px;
  font-size: 9.6px;
  margin: auto 2px;
  padding: 1px 6px;
}

.box-select-lesson-list {
  // max-width: 340px;
  width: 100%;
  background-color: #fff;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

.box-select-label-overflow {
  width: fit-content;
  max-width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.box-icon-recommend {
  width: 70px;
  font-size: 9.6px;
  background-color: #ffaa2e;
  border-radius: 3.2px;
  padding: 1px 6px;
  margin: 0px 7px;
  text-align: center;
}

.box-menu-select-lesson {
  max-width: 360px;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  overflow: hidden;
  margin: auto;
}
// #endregion

// #region Winny
.box-winny-conatiner {
  width: 5.875%;
  top: 86.2222%;
  left: 92.5%;
  z-index: 1;
}

.box-winny-chat-main {
  width: 25%;
  height: 53.3333%;
  margin: clamp(15px, 1.5vw, 24px);
  z-index: 0;

  &.show {
    z-index: 6;
  }
}

.box-winny-conatiner-mobile {
  max-width: 90px;
  width: 20%;
  min-width: 60px;
  bottom: 16px;
  right: 16px;
}
// #endregion

// #region Icon
.icon-recommend {
  max-width: 87px;
  width: 28.04%;
  right: -13px;
  top: -12px;
  margin: 0% 1%;
}

.icon-lesson-check {
  max-width: 30px;
  width: 10.743%;
}

.icon-lesson-check.mobile {
  max-width: 20px;
  margin-top: -2px;
}
// #endregion

// #region Button

.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;

  cursor: pointer;
}

.button-active-main.disable {
  transform: scale(1);
  cursor: not-allowed;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-active-main.button-lesson {
  width: 87%;
  background-color: #cacaca;
  border: 0.1rem solid #4a261b;
  border-radius: 0.7rem;
  padding-bottom: 1%;
  margin: 5% 0%;
}

.button-active-main.selected {
  background-color: #2daac7 !important;
}

.button-active-main.success {
  background-color: #8ec960 !important;
  border: 0.1rem solid #58cc02 !important;
}

.button-lesson::before {
  content: "";
  position: absolute;
  top: 10%;
  left: 1.3%;
  width: 5%;
  max-width: 14.47px;
  height: 10%;
  max-height: 5.57px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 1rem 1rem 0rem 0rem;
}

.button-lesson .sub-content {
  background-color: #fff;
  padding: 2.864% 5%;
  border-radius: 0.7rem;
  color: #4a261b;
  font-size: clamp(10px, 1vw, 16px);
}

.sub-content.selected {
  background-color: #48dbfc !important;
}

.sub-content.success {
  background-color: #d7ffb8 !important;
  color: #2da0d2 !important;
}

.button-active-main.button-finish {
  position: relative;
  width: 21.277%;
  background-color: #db8200;
  border: 0.1rem solid #4a261b;
  border-radius: 0.6rem;
  padding: 0.745% 0%;
  margin: 2% auto;
  font-size: clamp(11px, 1vw, 16px);
  color: #4a261b;
}

.button-active-main.button-finish.disable {
  background-color: #9b9b9b;
  color: #ffffff;
}

.button-finish:not(.disable)::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 90%;
  border-radius: 0.6rem;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-finish.disable::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 90%;
  border-radius: 0.6rem;
  background-color: #bababa;
}

.button-active-main.button-finish::before {
  content: "";
  position: absolute;
  top: 10%;
  left: 1.3%;
  width: 5%;
  max-width: 14.47px;
  height: 10%;
  max-height: 5.57px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 1rem 1rem 0rem 0rem;
  z-index: 1;
}

.button-finish.mobile {
  max-width: 200px;
  width: 100%;
  height: 40px;
  margin: auto;
  padding: 5px;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
}

.button-active-main.button-next,
.button-active-main.button-pervious {
  max-width: 40px;
  width: 100%;
}

.button-menu-select-lesson {
  padding: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: #fff;
  border-bottom: 1px solid #000;
}

.button-menu-select-lesson.selected {
  background-color: #48dbfc;
}

.button-menu-select-lesson.success {
  background-color: #d7ffb8;
  color: #2da0d2;
}

.button-active-main.button-caret-mobile {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  color: #4a261b;
  font-size: 30px;
  padding: 0px 5px;
}

.button-active-main.button-caret-mobile.disable {
  background: #9b9b9b;
  color: #fff;
}

.button-caret-mobile:not(.disable)::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-caret-mobile.disable::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background-color: #bababa;
}

.button-play-sound-again {
  width: 160px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  line-height: 0;
  color: #4a261b;
}

.button-play-sound-again::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 95%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

.button-play-sound-again::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 2px;
  width: 15px;
  height: 5px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 20px 20px 7px 7px;
  z-index: 1;
}

.icon-arrow.left {
  line-height: 0;
  margin-top: -2px;
  margin-left: -4px;
}

.icon-arrow.right {
  line-height: 0;
  margin-top: -2px;
  margin-left: 4px;
}

// #endregion

// #region Old Css

.volume-btn {
  background-image: linear-gradient(#ffd158, #ffbb0c);
}

@-webkit-keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@-moz-keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

@keyframes sideWays {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 50px;
  }
}

/* ANIMATIONS */

.box-content-list[data-type="languagetips"] {
  background-color: rgba(61, 190, 199, 0.2);
  width: 400px;
  z-index: 2;
}

.box-content-list[data-type="grammarlesson"] {
  background-color: rgba(0, 106, 183, 0.6);
  background-position: center;
  background-size: contain;
  width: 400px;
  z-index: 2;
}

.box-content-list[data-type="phonicslesson"] {
  background-color: rgba(0, 0, 0, 0.2);
  width: 400px;
  z-index: 2;
}

.btn-lesson[data-type="languagetips"] {
  position: relative;
  border-radius: 20px;
  border: 10px solid rgba(228, 244, 255, 0.2);
  margin-bottom: 15px;
  z-index: 2;
}

.btn-lesson[data-type="grammarlesson"] {
  position: relative;
  max-width: 600px;
  width: 100%;
  // border-radius: 20px;
  border: 10px solid rgba(228, 244, 255, 0);
  z-index: 2;
}

.btn-lesson[data-type="phonicslesson"] {
  position: relative;
  border-radius: 5px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  z-index: 2;
}

.btn-lesson[data-type="languagetips"]::after {
  content: "";
  position: absolute;
  top: -5px;
  right: 20px;
  width: 15px;
  height: 2px;
  background-color: #fff;
  border-radius: 30%;
  z-index: 2;
}

.btn-lesson[data-type="languagetips"]::before {
  content: "";
  position: absolute;
  top: -5px;
  right: 12px;
  width: 5px;
  height: 2px;
  background-color: #fff;
  border-radius: 30%;
  z-index: 2;
}

.box-label-title[data-type="grammarlesson"] {
  background-color: rgba(0, 106, 183, 0.6);
  color: #fff;
}

.box-label-title[data-type="phonicslesson"] {
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}

.box-label-title[data-type="languagetips"] {
  background-color: rgba(61, 190, 199, 0.6);
  color: #fff;
}

.btn-active[data-type="languagetips"] {
  background-color: #0075b7;
  color: #fff !important;
}

.btn-active[data-type="phonicslesson"] {
  background-color: #48dbfc;
  color: #000 !important;
  padding: 15px;
}

.btn-active[data-type="grammarlesson"] {
  background-color: #48dbfc;
  color: #000 !important;
}

.btn-active-mobile {
  background-color: #fff;
  color: #000 !important;
}

.btn-active[data-type="grammarlesson"] {
  padding: 15px 10px;
}

.btn-noactive[data-type="languagetips"] {
  background-color: #fff;
  color: #000;
}

.btn-noactive[data-type="grammarlesson"] {
  background-color: #fff;
  color: #000;
  padding: 15px 10px;
}

.btn-noactive[data-type="phonicslesson"] {
  background-color: #fff;
  color: #000 !important;
  padding: 15px;
}

.box-content {
  max-width: 1000px;
  width: 100%;
  margin: auto;
}

.box-content-image {
  max-width: 700px;
  width: 100%;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
// #endregion
</style>
