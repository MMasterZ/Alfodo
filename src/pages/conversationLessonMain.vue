<template>
  <q-page class="backdrop-listening row justify-center items-center">
    <!-- #region Desktop -->
    <div v-if="$q.platform.is.desktop" class="box-container-main relative-position">
      <!-- #region Background -->
      <background-main :background="`background-conversation`"></background-main>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar :practiceData="practiceData" :page="'conversation'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div
        class="box-practice-main absolute-top"
        v-if="!practiceData.isLoadPractice && !synchronizeStore.isSync"
      >
        <!-- #region Recommend  -->
        <div
          class="box-recommend-main relative-position animate__animated animate__fadeInDown animation-duration-1s animate__delay-1s"
        >
          <div class="box-recommend-text absolute-top-left">คำแนะนำ</div>
          <div class="font-mali-m">
            ดูวิดีโอ Conversation ให้จบ เพื่อเตรียมตัวทำแบบฝึกหัดต่อไป
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Title -->
        <div
          class="box-title-main animate__animated animate__fadeIn animation-duration-1s animate__delay-1s"
        >
          <div class="font-mali-b relative-position z-top" align="center">
            {{ `${practiceData.name}` }}
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Character Story -->
        <div
          class="box-character-story-main animate__animated animation-duration-1s animate__delay-1s"
          :class="
            {
              'animate__fadeOut' : isWatchVideo,
              'animate__zoomIn' : !isWatchVideo,
              'set-0' : characterList.length == 1,
              'set-1' : characterList.length == 2,
              'set-2' : characterList.length == 3,
              'set-3' : characterList.length >= 4,
            }
          "
          v-if="!synchronizeStore.isSync"
        >
          <div class="sub-character-story-main">
            <!-- #region Text Story -->
            <div align="center" class="font-mali-m box-text-story">
              ตัวละครในเนื้อเรื่อง
            </div>
            <!-- #endregion -->

            <!-- #region Character -->
            <div class="row justify-between">
              <div
                class="box-image-character relative-position z-top"
                :class="characterList.length > 1 ? 'col-1' : 'col text-center full-width'"
                v-for="(item, index) in characterList"
                :key="index"
              >
                <div class="">
                  <q-img :src="item.imageUrl"></q-img>
                </div>
                <div align="center" class="font-mali-m box-text-chatacter">
                  {{ `${item.name}` }}
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Watch -->
        <div
          class="button-active-main button-watch-vdo animate__animated animate__fadeIn"
          @click="funcWatchVideo()"
          v-if="!isWatchVideo && !synchronizeStore.isSync"
        >
          <div class="z-top relative-position font-mali-m" align="center">ดูวิดีโอ</div>
        </div>
        <!-- #endregion -->

        <!-- #region VDO -->
        <div
          class="box-video-main absolute-top"
          v-if="isWatchVideo && !synchronizeStore.isSync"
        >
          <div
            class="relative-position fit animate__animated animation-duration-0-5s animate__delay-2s"
            :class="isWatchVideo ? 'animate__zoomIn' : 'animate__fadeOutDown'"
          >
            <video
              :poster="videoConversation.imageUrl"
              controls
              controlsList="nodownload"
              style="width: 100%"
              :src="videoConversation.vdoUrl"
              preload="none"
              @ended="funcFinishWatchVideo(), systemStore.playVideo(false)"
              @play="systemStore.playVideo(true)"
              @pause="systemStore.playVideo(false)"
            ></video>
          </div>

          <div
            class="relative-position animate__animated animate__fadeInUp animation-duration-1s animate__delay-4s"
            v-if="false"
          >
            <div
              class="button-active-main button-finish"
              :class="isShowFinish ? '' : 'disable'"
              @click="isShowFinish ? funcFinishLesson() : null"
            >
              <div class="z-top relative-position font-mali-m" align="center">
                จบบทเรียน
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Control -->
      <div class="absolute-top box-teacher-control" v-if="synchronizeStore.isSync">
        <div
          class="relative-position animate__animated animate__zoomIn animation-duration-1s"
        >
          <div align="center" class="box-logo-main">
            <logo></logo>
          </div>
          <div class="" align="center">
            <div class="text-teacher-control font-mali-m text-white">
              กรุณาดูที่หน้าจอคุณครู
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="!$q.platform.is.desktop" class="box-container-main-mobile absolute-center">
      <!-- #region Header -->
      <header-bar :practiceData="practiceData" :page="'conversation'"></header-bar>
      <!-- #endregion -->

      <!-- #region Practice -->
      <div
        class="box-practice-main-mobile"
        v-if="!practiceData.isLoadPractice && !synchronizeStore.isSync"
      >
        <!-- #region Recommend  -->
        <div
          class="box-recommend-text-mobile animate__animated animate__fadeInDown animation-duration-1s animate__delay-1s"
        >
          คำแนะนำ
        </div>
        <div
          class="box-recommend-main-mobile relative-position animate__animated animate__fadeInDown animation-duration-1s animate__delay-1s"
        >
          <div class="font-mali-m">
            ดูวิดีโอ Conversation ให้จบ เพื่อเตรียมตัวทำแบบฝึกหัดต่อไป
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Title -->
        <div
          class="box-title-main-mobile animate__animated animate__fadeIn animation-duration-1s animate__delay-1s"
        >
          <div class="sub-title-main-mobile" align="center">
            {{ `${practiceData.name}` }}
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Character Story -->
        <div
          class="box-character-story-main-mobile animate__animated animate__zoomIn animation-duration-1s animate__delay-1s"
          v-if="!isWatchVideo"
        >
          <div class="sub-character-story-main-mobile">
            <div align="center" class="box-text-story-mobile font-mali-m">
              ตัวละครในเนื้อเรื่อง
            </div>
            <div
              class="box-image-character-mobile"
              v-for="(item, index) in characterList"
              :key="index"
            >
              <q-img :src="item.imageUrl" no-spinner no-transition></q-img>
              <div class="font-mali-m box-text-chatacter-mobile" align="center">
                {{ `${item.name}` }}
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Button Watch -->
        <div
          class="button-active-main button-watch-vdo-mobile animate__animated animate__fadeIn"
          @click="funcWatchVideo()"
          v-if="!isWatchVideo && !synchronizeStore.isSync"
        >
          <div class="z-top relative-position font-mali-m" align="center">ดูวิดีโอ</div>
        </div>
        <!-- #endregion -->

        <!-- #region Video -->
        <div
          class="box-video-main-mobile"
          v-if="isWatchVideo && !synchronizeStore.isSync"
        >
          <div
            class="relative-position fit animate__animated animation-duration-0-5s animate__delay-2s"
            :class="isWatchVideo ? 'animate__zoomIn' : 'animate__fadeOutDown'"
          >
            <video
              :poster="videoConversation.imageUrl"
              controls
              controlsList="nodownload"
              style="width: 100%"
              :src="videoConversation.vdoUrl"
              preload="none"
              @ended="funcFinishWatchVideo(), systemStore.playVideo(false)"
              @play="systemStore.playVideo(true)"
              @pause="systemStore.playVideo(false)"
            ></video>
          </div>

          <div
            class="relative-position animate__animated animate__fadeInUp animation-duration-1s animate__delay-4s"
            v-if="false"
          >
            <div
              class="button-active-main button-finish-mobile"
              :class="isShowFinish ? '' : 'disable'"
              @click="isShowFinish ? funcFinishLesson() : null"
            >
              <div class="z-top relative-position font-mali-m" align="center">
                จบบทเรียน
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Control -->
      <div
        class="box-teacher-control-mobile absolute-center"
        v-if="synchronizeStore.isSync"
      >
        <div
          class="relative-position animate__animated animate__zoomIn animation-duration-1s"
        >
          <div align="center" class="box-logo-main">
            <logo></logo>
          </div>
          <div class="" align="center">
            <div class="text-teacher-control font-mali-m text-white">
              กรุณาดูที่หน้าจอคุณครู
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Not Sync -->
    <div
      class="box-container-main"
      v-show="isLoadPractice && !synchronizeStore.isSync && practiceData.isLoadPractice"
    >
      <div v-if="nextStep == 0">
        <div align="center" class="q-pt-lg">
          <div :class="{ 'q-px-md': $q.platform.is.mobile }">
            <div class="box-content-name">
              <div class="box-name q-pa-xs">
                <span :class="$q.platform.is.desktop ? 'f24' : 'f16'">{{
                  practiceData.name
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center q-pb-xl relative-position" style="z-index: 2">
          <div
            class="col-3 col-xs-12 q-pa-sm q-pa-md"
            style="max-width: 350px; width: 100%"
            align="center"
            v-for="(item, index) in characterList"
          >
            <div class="box-character">
              <div class="box-character-bg q-py-md">
                <q-img
                  fit="cover"
                  width="100%"
                  :style="$q.platform.is.desktop ? 'height:190px;' : 'height:190px;'"
                  :src="item.imageUrl"
                ></q-img>
                <div
                  :class="$q.platform.is.desktop ? 'q-mt-lg' : 'q-mt-md'"
                  align="center"
                >
                  <span
                    v-html="item.name"
                    :class="$q.platform.is.desktop ? 'f36' : 'f16'"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div align="center" class="relative-position q-pb-md" style="z-index: 2">
          <q-img
            width="200px"
            class="cursor-pointer btn"
            src="/images/btn-watching-video.png"
            @click="nextStep = 1"
          ></q-img>
        </div>
      </div>

      <div class="relative-position" v-show="nextStep == 1" style="z-index: 2">
        <div align="center" :class="$q.platform.is.desktop ? 'q-pt-md' : ''">
          <video
            :poster="videoConversation.imageUrl"
            controls
            controlsList="nodownload"
            :style="
              $q.platform.is.desktop
                ? 'max-width: 1000px; width: 70%'
                : 'max-width: 1000px; width: 100%'
            "
            :src="videoConversation.vdoUrl"
            preload="none"
            @ended="(isShowFinish = true), systemStore.playVideo(false)"
            @play="systemStore.playVideo(true)"
            @pause="systemStore.playVideo(false)"
          ></video>
        </div>

        <div
          align="center"
          class="relative-position q-pt-xl q-pb-md q-mt-lg"
          style="z-index: 2"
          v-if="isShowFinish"
        >
          <q-img
            class="relative-position cursor-pointer"
            style="width: 200px; z-index: 2"
            src="/images/btn-finish-lesson.png"
            @click="funcFinishLesson()"
          ></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Sync -->
    <!-- <div
      class="absolute-center"
      v-if="synchronizeStore.isSync && practiceData.isLoadPractice"
    >
      <div align="center">
        <logo></logo>
      </div>
      <div class="" align="center">
        <span class="f26 text-white">กรุณาดูที่หน้าจอคุณครู</span>
      </div>
    </div> -->
    <!-- #endregion -->
  </q-page>

  <q-dialog v-model="isShowDialogFinishWatchVideo" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="row fit justify-center items-center no-padding">
        <div class="row justify-center items-center full-width">
          <div class="button-restart-watch-video" @click="funcRestartLesson()">
            <q-img src="/images/button_main/button-restart-video.webp" no-spinner no-transition></q-img>
          </div>
          <div class="button-finish-watch-video" @click="funcFinishLesson()">
            <q-img src="/images/button_main/button-finish-video.webp" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- <finish-dialog-lesson
    :lessonData="lessonData"
    :isShowDialogFinishLesson="isShowDialogFinishLesson"
    @callbackCloseDialog="isShowDialogFinishLesson = false"
    @callback-restart="funcRestartLesson()"
    v-if="isShowDialogFinishLesson"
  ></finish-dialog-lesson> -->

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
import dialogFinishLesson from "../components/dialog_main/dialog-finish-lesson.vue";

import headerBar from "../components/practice_main/header-bar-new.vue";
import backgroundMain from "../components/background_main/background-main.vue";

import { ref, onMounted, reactive, onBeforeUnmount, watch, defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { analyticsLogEvent, apiURL, auth, db } from "src/router";
import axios from "axios";
import { useQuasar } from "quasar";
import loading from "../components/dialog-loading.vue";
import logo from "../components/logo-login.vue";
import practiceHooks from "../hooks/practiceHooks";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";

const CancelToken = axios.CancelToken;
let tokenAPI;

const components = defineComponent({
  headerBar,
  backgroundMain,

  loading,
  logo,
});

const props = defineProps({
  isSynchronize: {
    type: Boolean,
    default: false,
  },
});

// Store
const systemStore = useSystemStore();
const practiceStore = usePracticeStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();

// Initial Route
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Initial Data
const isShowFinish = ref(false);
const nextStep = ref(0);
const videoConversation = ref({});
const practiceData = reactive({
  totalQuestion: 0,
  currentQuestion: 0,
  question: "",
  choices: [],
  correctAnswer: 0,
  extraSound: [],
  name: "",
  skill: "Listening & Speaking",
  isLoadPractice: true,
  isFirstTimeReward: false,
});

// Boolearn
const isShowDialogFinishWatchVideo = ref(false)
const isShowLoading = ref(true);
const isWatchVideo = ref(false);

// #region Function

// #region Load Practice
const isLoadPractice = ref(false);
const speakerList = ref([]);
const characterList = ref([]);
const funcLoadLesson = async () => {
  isLoadPractice.value = false;

  practiceData.isLoadPractice = true;

  practiceData.isFirstTimeReward = practiceStore.currentPracticeData.isFirstTimeReward;

  try {
    let tempPractice = [];

    // เก็บ practice list id จาก router
    let practiceListId = route.params.practiceListId;

    // ดึงข้อมูล practice list
    let getData = await practiceHooks.practiceListInfo(practiceListId);

    // เก็บจำนวนข้อของแบบฝึกหัดตามที่เลือกไว้ใน backend
    practiceData.totalQuestion = getData.numOfPractice;

    let getSpeaker = await db.collection("speakerList").get();

    let tempSpeaker = [];

    getSpeaker.forEach((doc) => {
      let newData = {
        id: doc.id,
        ...doc.data(),
      };

      tempSpeaker.push(newData);
    });

    speakerList.value = tempSpeaker;

    try {
      let getPracticeName = await db
        .collection("practiceListName")
        .where("level", "==", getData.level)
        .where("unit", "==", getData.unit)
        .where("skill", "==", "Listening & Speaking")
        .get();

      practiceData.name = getPracticeName.docs[0].data().nameEng;
    } catch (error) {
      // console.log(`${error} : Get Load Practice List Name`);
    }

    // Get Api
    const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

    const postData = {
      practiceListId: practiceListId,
      requestURL: window.location.hash,
    };

    if (tokenAPI != undefined) tokenAPI();

    const response = await axios.post(apiURL, postData, {
      cancelToken: new CancelToken(function executor(c) {
        tokenAPI = c;
      }),
    });

    getData = await db
      .collection("practiceData")
      .doc("server")
      .collection("practice")
      .doc(response.data[0].id)
      .collection("sentence")
      .get();

    let tempCharacter = [];

    getData.forEach((res) => {
      let findCharacter = speakerList.value.filter((x) => x.id == res.data().speakerName);

      if (findCharacter.length) {
        let name = findCharacter[0].speakerName;
        let url = findCharacter[0].imageUrl;

        let newData = {
          ...res.data(),
          speakerName: name,
          speakerUrl: url,
        };

        tempCharacter.push(newData);
      }
    });

    let getCharacterName = [...new Set(tempCharacter.map((x) => x.speakerName))];

    let characters = [];

    getCharacterName.forEach((res) => {
      let getImageUrl = tempCharacter.filter((x) => x.speakerName == res)[0].speakerUrl;

      let newData = {
        name: res,
        imageUrl: getImageUrl,
      };

      characters.push(newData);
    });

    characterList.value = [...characters];

    // เก็บข้อมูลที่ได้จาก axios
    tempPractice = response.data;

    // copy แบบฝึกหัด
    // let setPracticeList = tempPractice;

    // เก็บข้อมูลคำศัพท์เสริม
    // practiceData.extraSound = extraSound;

    // สุ่มคำตอบของแต่ละข้อ
    // setPracticeList = setPracticeList.map((x, index) => {
    //   let choices = x.choices.sort(() => Math.random() - 0.5);
    //   x.choices = choices;
    //   return x;
    // });

    // สุ่มแบบฝึกหัด
    // setPracticeList = setPracticeList.sort((a, b) => a.order - b.order);

    // สุ่มแบบฝึกหัด
    // setPracticeList = setPracticeList.sort(() => Math.random() - 0.5);

    // ตัดจำนวนแบบฝึกหัดให้เท่ากับจำนวน TotalQuestion
    // setPracticeList = setPracticeList.slice(0, practiceData.totalQuestion);

    // เก็บข้อมูลแบบฝึกหัดทั้งหมด
    videoConversation.value = tempPractice[0];

    // เลือกแบบฝึกหัดเมื่อโหลดครั้งแรก
    // funcSelectedQuestion(true);

    isLoadPractice.value = true;
    isShowLoading.value = false;

    practiceData.isLoadPractice = false;
  } catch (error) {
    // console.log(`${error} : Function Load Practice`);
    isLoadPractice.value = true;
  }
};
// #endregion

// #region Finish Lesson
const isShowDialogFinishLesson = ref(false);
const lessonData = ref({
  isFinishAll: true,
});
const funcFinishLesson = async () => {
  isShowLoading.value = true;

  await savePracticeLog();

  isLoadPractice.value = true;
  isShowLoading.value = false;
  isShowDialogFinishLesson.value = true;

  // router.replace("/practice/unit");
};
// #endregion

// #region Save PracticeLog
const savePracticeLog = async () => {
  const practiceLogData = {
    practiceListId: route.params.practiceListId,
    score: 0,
    star: 0,
    coin: 0,
    ...practiceData,
  };

  await practiceStore.savePracticeLog(practiceLogData, $q.platform.is);

  isShowLoading.value = false;
};
// #endregion

// #region Watch Video
const funcWatchVideo = () => {
  isWatchVideo.value = true;
};
// #endregion

// #region Restart Lesson
const funcRestartLesson = () => {
  isShowFinish.value = false;
  isWatchVideo.value = false;
  isShowDialogFinishLesson.value = false;
  isShowDialogFinishWatchVideo.value = false
};
// #endregion

// #region Finish Watch Video
const funcFinishWatchVideo = () => {
  isShowDialogFinishWatchVideo.value = true;
}
// #endregion

// #endregion

let authListen;
const isSync = ref(false);
onMounted(() => {
  isShowLoading.value = true;

  systemStore.setRouter("conversationlesson");

  authListen = firebase.auth().onAuthStateChanged(async function (user) {
    if (user) {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/conversationLesson");
      }

      if ($q.sessionStorage.has("isSync")) {
        isSync.value = $q.sessionStorage.getItem("isSync");
      }

      if (!isSync.value) {
        funcLoadLesson();
      } else {
        if (synchronizeStore.isSync) {
          practiceData.isFirstTimeReward =
            practiceStore.currentPracticeData.isFirstTimeReward;

          await savePracticeLog();
        }

        isShowLoading.value = false;
      }
    } else {
      // User is signed out.
      router.replace("/");
    }
  });
});

onBeforeUnmount(() => {
  if (tokenAPI != undefined) tokenAPI();

  systemStore.playVideo(false);
});
</script>

<style lang="scss" scoped>
// #region Box
.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  overflow: hidden;
}

.box-container-main.mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100vh;
}

.box-container-main-mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 320px;
  height: 100%;
  background-image: url("/images/background_main/background-conversation.png");
  background-size: cover;
  background-position: 50% 100%;
  background-repeat: no-repeat;
  overflow-y: auto;
}

.backdrop-listening {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.box-practice-main {
  top: 12.2%;
  width: 100%;
}

.box-practice-main-mobile {
  max-width: 600px;
  width: 95%;
  min-width: 320px;
  margin: 10px auto;
  font-size: 14px;
}

.box-recommend-main {
  width: 58.75%;
  padding: 0.375% 0.5%;
  margin: auto;
  background-color: #ffffff;
  border: 0.1rem solid #8a1818;
  border-radius: 0rem 1rem 1rem 1rem;
  color: #000;
  font-size: clamp(10px, 1vw, 16px);
}

.box-recommend-main-mobile {
  border-radius: 0px 16px 16px 16px;
  border: 1px solid #8a1818;
  background: #fff;
  padding: 8px;
}

.box-recommend-text {
  top: -85%;
  left: -0.15%;
  width: fit-content;
  background-color: #d21919;
  border: 0.1rem solid #8a1818;
  border-radius: 0.5rem 0.5rem 0rem 0rem;
  padding: 0.214% 0.762%;
  color: #fff;
}

.box-recommend-text-mobile {
  width: 85px;
  border-radius: 8px 8px 0px 0px;
  background: #d21919;
  color: #fff;
  padding: 4px 8px;
  text-align: center;
}

.box-title-main {
  position: relative;
  width: fit-content;
  margin: 1.3% auto;
  background-color: #ba6f40;
  border: 0.17rem solid #4a261b;
  border-radius: 1rem;
  padding: 1% 3%;
  color: #fff;
  font-size: clamp(16px, 1.5vw, 24px);
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-title-main::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);

  width: 97%;
  height: 85%;
  background-color: #804a28;
  border-radius: 0.4rem;
}

.box-title-main-mobile {
  margin: 15px 0px;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #ba6f40;
  padding: 8px;
}

.sub-title-main-mobile {
  padding: 8px 24px;
  border-radius: 8px;
  background: #804a28;
  color: #fff;
  text-align: center;
  font-size: 16px;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-character-story-main {
  position: relative;
  margin: 1% auto;
  font-size: clamp(16px, 1.5vw, 24px);
  background-color: #f2c043;
  padding: 0.5%;
  border-radius: 1rem;
  border: 0.17rem solid #4a261b;
  color: #4a261b;
}

.box-character-story-main.set-0 {
  width: 17%;
}

.box-character-story-main.set-1 {
  width: 34.75%;
}

.box-character-story-main.set-2 {
  width: 51.125%;
}

.box-character-story-main.set-3 {
  width: 67.5%;
}

.sub-character-story-main {
  background-color: #f6f3d3;
  border-radius: 0.5rem;
  padding: 5% 1.7% 1.7%;
}

.box-text-story {
  padding: 0% 0% 1.2% 0%;
  color: #4a261b;
}

.box-text-story-mobile {
  padding: 8px 0px;
  color: #4a261b;
  font-size: 20px;
}

.box-image-character {
  width: 60%;
  max-width: 246px;
  background-color: #fff;
  padding: 1% 1% 0% 1%;
  margin: 0%;
  border-radius: 0.3rem;
}

.box-text-chatacter {
  width: 100%;
  padding: 3% 0%;
}

.box-text-chatacter-mobile {
  padding: 8px 0px 0px 0px;
  color: #4a261b;
  font-size: 16px;
}

.box-image-character-mobile {
  border-radius: 8px;
  background: #fff;
  padding: 8px;
  margin: 8px 0px 0px 0px;
}

.box-character-story-main-mobile {
  max-width: 320px;
  width: 85%;
  min-width: 280px;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #f2c043;
  padding: 8px;
  margin: auto;
}

.sub-character-story-main-mobile {
  border-radius: 8px;
  background: #f6f3d3;
  padding: 16px;
}

.box-video-main {
  top: 33%;
  width: 58.75%;
  margin: auto;
}

.box-video-main-mobile {
  max-width: 600px;
  width: 90%;
  min-width: 340px;
  margin: auto;
}

.box-teacher-control {
  top: 35%;
}

.box-teacher-control-mobile {
  width: 100%;
}

.box-logo-main {
  max-width: 1600px;
  width: 50%;
  padding: 1% 0%;
  margin: auto;
}
// #endregion

// #region Button
.button-active-main {
  position: relative;
  color: #4a261b;
  background-color: #db8200;
  border-radius: 0.5rem;
  border: 0.1rem solid #4a261b;
  padding: 0.532%;
  margin: 1.5% 0%;
  cursor: pointer;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;
}

.button-active-main.disable {
  background-color: #9b9b9b;
  border: 0.1rem solid #4a261b;
  border-radius: 0.5rem;
  cursor: default;
}

.button-active-main.disable::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 90%;
  background-color: #bababa;
  border-radius: 0.5rem;
}

.button-active-main:not(.disable):active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;
}

.button-active-main:not(.disable)::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 94%;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 0.4rem 0.4rem 0.5rem 0.5rem;
}

.button-active-main:not(.mobile)::after {
  content: "";
  position: absolute;
  top: 11%;
  left: 0.5%;
  width: 3.5%;
  padding: 0.65%;
  background-color: #fff;
  border-radius: 0.4rem 0.4rem 0px 0px;
  opacity: 0.5;
  transform: rotate(-35deg);
}

.button-watch-vdo {
  width: 12.5%;
  margin: 2% auto;
  font-size: clamp(10px, 1vw, 16px);
}

.button-watch-vdo-mobile,
.button-finish-mobile {
  width: 200px;
  height: 40px;
  font-size: 16px;
  line-height: 2;
  margin: 24px auto;
}

.button-finish {
  width: 21.277%;
  margin: 2.7% auto 2% auto;
  font-size: clamp(10px, 1vw, 16px);
}

.button-finish-watch-video {
  width:clamp(116.25px,11.625vw,186px);
  margin:0px clamp(5.625px,0.5625vw,9px);
  cursor: pointer;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;

  &:active{
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);

    transition: transform 0.05s;
    -webkit-transition: -webkit-transform 0.05s;
    -moz-transition: -moz-transform 0.05s;
  }
}

.button-restart-watch-video{
  width:clamp(33.75px,3.375vw,54px);
  margin:0px clamp(5.625px,0.5625vw,9px);
  cursor: pointer;
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.05s;
  -webkit-transition: -webkit-transform 0.05s;
  -moz-transition: -moz-transform 0.05s;

  &:active{
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);

    transition: transform 0.05s;
    -webkit-transition: -webkit-transform 0.05s;
    -moz-transition: -moz-transform 0.05s;
  }
}
// #endregion

// #region Text
.text-teacher-control {
  margin: 2% 2%;
  font-size: 24px;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}
// #endregion

// #region Animation
.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}

.animation-duration-1s {
  animation-duration: 1s;
  -webkit-animation-duration: 1s;
  -moz-animation-duration: 1s;
}
// #endregion

// #region Old

.bg-conversationlesson {
  background-image: url("/images/conversation/background-conversation-2.png");
  background-size: cover;
  background-position: center bottom;
  background-repeat: no-repeat;
  background-color: #0479b9;
}

.background-wrap {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1;
}

/* KEYFRAMES */

@-webkit-keyframes animateBubble {
  0% {
    margin-top: 1000px;
  }
  100% {
    margin-top: -100%;
  }
}

@-moz-keyframes animateBubble {
  0% {
    margin-top: 1000px;
  }
  100% {
    margin-top: -100%;
  }
}

@keyframes animateBubble {
  0% {
    margin-top: 1000px;
  }
  100% {
    margin-top: -100%;
  }
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

.x1 {
  -webkit-animation: animateBubble 25s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: animateBubble 25s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;

  left: -5%;
  top: 70%;

  -webkit-transform: scale(0.6);
  -moz-transform: scale(0.6);
  transform: scale(0.6);
}

.x2 {
  -webkit-animation: animateBubble 20s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: animateBubble 20s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  animation: animateBubble 20s linear infinite, sideWays 4s ease-in-out infinite alternate;

  left: 5%;
  top: 80%;

  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  transform: scale(0.4);
}

.x3 {
  -webkit-animation: animateBubble 28s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: animateBubble 28s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  animation: animateBubble 28s linear infinite, sideWays 2s ease-in-out infinite alternate;

  left: 10%;
  top: 40%;

  -webkit-transform: scale(0.7);
  -moz-transform: scale(0.7);
  transform: scale(0.7);
}

.x4 {
  -webkit-animation: animateBubble 22s linear infinite,
    sideWays 3s ease-in-out infinite alternate;
  -moz-animation: animateBubble 22s linear infinite,
    sideWays 3s ease-in-out infinite alternate;
  animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;

  left: 20%;
  top: 0;

  -webkit-transform: scale(0.3);
  -moz-transform: scale(0.3);
  transform: scale(0.3);
}

.x5 {
  -webkit-animation: animateBubble 29s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: animateBubble 29s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;

  left: 30%;
  top: 50%;

  -webkit-transform: scale(0.5);
  -moz-transform: scale(0.5);
  transform: scale(0.5);
}

.x6 {
  -webkit-animation: animateBubble 21s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: animateBubble 21s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;

  left: 50%;
  top: 0;

  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  transform: scale(0.8);
}

.x7 {
  -webkit-animation: animateBubble 20s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: animateBubble 20s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  animation: animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate;

  left: 65%;
  top: 70%;

  -webkit-transform: scale(0.4);
  -moz-transform: scale(0.4);
  transform: scale(0.4);
}

.x8 {
  -webkit-animation: animateBubble 22s linear infinite,
    sideWays 3s ease-in-out infinite alternate;
  -moz-animation: animateBubble 22s linear infinite,
    sideWays 3s ease-in-out infinite alternate;
  animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;

  left: 80%;
  top: 10%;

  -webkit-transform: scale(0.3);
  -moz-transform: scale(0.3);
  transform: scale(0.3);
}

.x9 {
  -webkit-animation: animateBubble 29s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  -moz-animation: animateBubble 29s linear infinite,
    sideWays 4s ease-in-out infinite alternate;
  animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;

  left: 90%;
  top: 50%;

  -webkit-transform: scale(0.6);
  -moz-transform: scale(0.6);
  transform: scale(0.6);
}

.x10 {
  -webkit-animation: animateBubble 26s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  -moz-animation: animateBubble 26s linear infinite,
    sideWays 2s ease-in-out infinite alternate;
  animation: animateBubble 26s linear infinite, sideWays 2s ease-in-out infinite alternate;

  left: 80%;
  top: 80%;

  -webkit-transform: scale(0.3);
  -moz-transform: scale(0.3);
  transform: scale(0.3);
}

/* OBJECTS */

.bubble {
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;

  -webkit-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
    inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
  -moz-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
    inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2),
    inset 0px 10px 30px 5px rgba(255, 255, 255, 1);

  height: 100px;
  position: absolute;
  width: 100px;
}

.bubble:after {
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 70%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(255, 255, 255, 0.5)),
    color-stop(70%, rgba(255, 255, 255, 0))
  ); /* Chrome,Safari4+ */
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 70%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 70%
  ); /* Opera 12+ */
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 70%
  ); /* IE10+ */
  background: radial-gradient(
    ellipse at center,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0) 70%
  ); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */

  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;

  -webkit-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
  -moz-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);

  content: "";
  height: 80px;
  left: 10px;
  position: absolute;
  width: 80px;
}

.box-content-name {
  max-width: 700px;
  width: 100%;
  border: 15px solid rgba(228, 244, 255, 0.2);
  border-radius: 40px;
}

.box-name {
  background-color: #a3e6f9;
  border-radius: 30px;
}

.box-character {
  border: 13px solid rgba(228, 244, 255, 0.2);
  border-radius: 20px;
}

.box-character-bg {
  background-color: #a3e6f9;
  border-radius: 10px;
}
// #endregion
</style>
