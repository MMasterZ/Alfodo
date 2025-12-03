<template>
  <q-page :class="`bg-flashcard`">
    <div id="midground"></div>
    <div id="foreground"></div>
    <div class="col-12 self-start">
      <app-bar
        :systemStore="systemStore"
        :isShowDialogFlashcard="isShowDialogFlashcard"
        :isShowPause="isSynchronize ? false : true"
        :isSynchronize="isSynchronize"
        @callback-closedialogflashcard="isShowDialogFlashcard = false"
        :isLoadPractice="isLoadPractice"
        @toggleEffect="funcToggleEffect"
      ></app-bar>
    </div>

    <!-- <div class="absolute-center" v-if="!isLoadPractice">
      <q-spinner-facebook color="light-blue" size="100px" />
    </div> -->

    <flashcard-pc
      :vocabDataList="vocabDataList"
      @playSound="(val) => playSound(val)"
      v-if="$q.platform.is.desktop && isLoadPractice"
      :isSynchronize="isSynchronize"
    ></flashcard-pc>

    <flashcard-mobile
      :vocabDataList="vocabDataList"
      v-if="$q.platform.is.mobile && isLoadPractice"
      @playSound="(val) => playSound(val)"
      :isShowDialogFlashcard="isShowDialogFlashcard"
      @showDialogFlashcard="isShowDialogFlashcard = true"
      :isSynchronize="isSynchronize"
    ></flashcard-mobile>

    <tutorial
      type=""
      :isShowTutorial="isShowTutorial"
      v-if="isLoadPractice"
      skill="Vocabulary"
    ></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import flashcardPc from "../components/flashcard/flashcardPc.vue";
import flashcardMobile from "../components/flashcard/flashcardMobile.vue";
import { onMounted, ref, onBeforeUnmount, computed, reactive } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import appBar from "../components/app-bar.vue";
import {
  analyticsLogEvent,
  apiURL,
  auth,
  db,
  playSoundBackground,
} from "src/router";
import studentHooks from "../hooks/gameHooks";
import tutorial from "../components/tutorial.vue";
import loading from "../components/dialog-loading.vue"

const CancelToken = axios.CancelToken;
let tokenAPI;

export default {
  components: {
    flashcardPc,
    flashcardMobile,
    appBar,
    tutorial,
    loading,
  },
  props: {
    isSynchronize: {
      type: Boolean,
      default: false,
    },
    syncData: {
      type: Object,
      default: () => {},
    },
    // Store
    systemStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
    studentStore: {
      default: () => {},
    },
    synchronizeStore: {
      default: () => {},
    },
  },
  setup(props) {
    // Initial
    const $q = useQuasar();

    // Router
    const router = useRouter();
    const route = useRoute();
    const isShowLoading = ref(false);

    const flashcardList = ref([]);
    const isLoadPractice = ref(false);

    // โหลดข้อมูล Flashcard
    const funcLoadFlashcard = async () => {
      const apiURL = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;

      const postData = {
        practiceListId: route.params.practiceListId,
        requestURL: window.location.hash,
      };

      let tempVocab = [];

      if (tokenAPI != undefined) tokenAPI();

      const response = await axios.post(apiURL, postData, {
        cancelToken: new CancelToken(function executor(c) {
          tokenAPI = c;
        }),
      });

      tempVocab = response.data;

      let draftVocab = [];

      tempVocab.forEach((res) => {
        let newSoundVocab = new Audio(res.soundVocabUrl);
        let soundSpellUrl = new Audio(res.soundSpellUrl);
        let soundSentenceUrl = new Audio(res.soundSentenceUrl);

        let newData = {
          extraVocab: [],
          ...res,
          soundVocabUrl: newSoundVocab,
          soundSpellUrl: soundSpellUrl,
          soundSentenceUrl: soundSentenceUrl,
        };

        newSoundVocab = "";
        soundSpellUrl = "";
        soundSentenceUrl = "";

        draftVocab.push(newData);
      });

      draftVocab = draftVocab.sort((a, b) =>
        a.vocab.toLowerCase() > b.vocab.toLowerCase() ? 1 : -1
      );

      flashcardList.value = draftVocab;

      await savePracticeLog();

      isLoadPractice.value = true;
      isShowLoading.value = false;
    };

    //closeDialog
    const closeDialog = () => {};

    // Play sound
    const tempAudio = ref("");

    const playSound = (url) => {
      props.systemStore.playSound(url);
    };

    // Close Flashcard Dialog
    const isShowDialogFlashcard = ref(false);
    const closeDialogFlashcard = () => {
      isShowDialogFlashcard.value = false;
    };

    // Save PracticeLog ตอนเข้ามาที่ Flashcard
    const savePracticeLog = async () => {
      const practiceLogData = {
        practiceListId: route.params.practiceListId,
        score: 0,
        star: 0,
        coin: 0,
      };

      await props.practiceStore.savePracticeLog(
        practiceLogData,
        $q.platform.is
      );
    };

    // ส่งข้อมูลเข้าไปที่ Component Vocab
    const vocabDataList = computed(() => {
      isLoadPractice.value = false;

      let temp = [];

      if (props.syncData.mode == "control") {
        temp = flashcardList.value.filter(
          (x) => x.id == props.syncData.lesson.currentLessonId
        );

        isShowDialogFlashcard.value = false;
      } else {
        temp = flashcardList.value;
      }

      isLoadPractice.value = true;

      return temp;
    });

    // Func : Load Tutorial

    const isShowTutorial = ref(false);

    const funcLoadTutorial = async (uid) => {
      let getData = await studentHooks.studentInfomation(uid);

      if (getData.tutorial) {
        let findTutorial = getData.tutorial.filter(
          (x) => x.routeName == route.name && x.practiceType == ""
        );

        if (!findTutorial.length) {
          isShowTutorial.value = true;
        }
      } else {
        isShowTutorial.value = true;
      }
    };

    const practiceData = reactive({
      isEnableSoundEffect: false,
    });

    const funcToggleEffect = (val) => {
      practiceData.isEnableSoundEffect = val.val;
    };

    let authListen;
    // เรียกใช้งาน Function
    const isSync = ref(false);
    onMounted(async () => {
      isShowLoading.value = true;

      props.systemStore.setRouter("Vocabulary");

      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        // User is signed in.
        if (user) {
          if (analyticsLogEvent != null) {
            analyticsLogEvent("/flashcard");
          }

          if ($q.sessionStorage.has("isSync")) {
            isSync.value = $q.sessionStorage.getItem("isSync");
          }

          // if (!isSync.value) {
          //   await funcLoadTutorial();;
          // }

          funcLoadFlashcard();
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    // Unmount Synchronize
    onBeforeUnmount(() => {
      if (authListen) {
        authListen();
      }

      if (tokenAPI != undefined) tokenAPI();

      flashcardList.value.forEach((res) => {
        res.soundVocabUrl = null;
        res.soundSpellUrl = null;
        res.soundSentenceUrl = null;
      });
    });

    return {
      isSync,
      isShowLoading,
      practiceData,
      isShowTutorial,
      flashcardList,
      isLoadPractice,
      vocabDataList,
      playSound,
      isShowDialogFlashcard,
      closeDialogFlashcard,
      tempAudio,
      closeDialog,
      funcToggleEffect,
    };
  },
};
</script>

<style lang="scss" scoped>
@keyframes STAR-MOVE {
  to {
    left: -10000px;
    top: -2000px;
  }
}

#midground {
  background: url(/images/spellingbee/midground-star.png) repeat 0%
    0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  animation-name: STAR-MOVE;
  animation-duration: 500s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 500s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

#foreground {
  background: url(/images/spellingbee/foreground-star.png) repeat 0%
    0%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;

  animation-name: STAR-MOVE;
  animation-duration: 300s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name: STAR-MOVE;
  -webkit-animation-duration: 300s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}
.bg-flashcard {
  // background-image: url("/images/flashcard/flashcard-theme-1.png");
  background-size: cover;
  background-position: center;
  background-color: #252a52;
}
</style>
