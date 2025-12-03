<template>
  <q-page
    class="row no-wrap"
    :class="isDesktop ? 'container-scroll' : 'container-scroll-mobile fit'"
    :skill="practiceStore.skill"
  >
    <q-resize-observer @resize="onResize" />

    <div class="fixed-top" v-if="isDesktop">
      <div
        :skill="practiceStore.skill"
        class="background-bar animation-bar-move-to-left"
      ></div>
    </div>

    <div class="background-practice-skill" :practiceType="practiceStore.practiceType">
      <header-bar
        :screenSize="screenControl"
        :practiceType="practiceStore.practiceType"
      ></header-bar>

      <div align="center">
        <div class="q-pa-md q-mt-md row" style="width: 1100px">
          <div class="col self-center">
            <div class="box-progress-bar" align="left">
              <div class="progress-bar" :style="`width:${progressBar}%`"></div>
              <q-img
                width="80px"
                class="absolute-center animation-airplane"
                :style="`left: ${progressBar}%`"
                src="/images/vocabulary_main/airplane.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>

      <!-- Flashcard Stage 0 -->
      <flashcard
        v-if="!isLoaded && stage == 'learning-flashcard'"
        :isLoaded="isLoaded"
        @callback-playsound="systemStore.playSound"
        @callback-learning="funcLearningPractice()"
        @callback-currentQuestion="funcSetCurrentQuestion"
      ></flashcard>

      <!-- Spelling Bee Stage 1 -->
      <spelling-1
        v-if="
          (!isLoaded && randomType == 1 && stage == 'learning-practice') ||
          (randomType == 1 && stage == 'practice')
        "
        @callback-playsound="systemStore.playSound"
      ></spelling-1>

      <!-- Spelling Bee Stage 2 -->
      <spelling-2
        v-if="
          (!isLoaded && randomType == 2 && stage == 'learning-practice') ||
          (randomType == 2 && stage == 'practice')
        "
      ></spelling-2>

      <!-- Matching Stage 3 -->
      <matching
        v-if="
          (!isLoaded && randomType == 3 && stage == 'learning-practice') ||
          (randomType == 3 && stage == 'practice')
        "
      ></matching>

      <!-- Multiple Choices Stage 4 -->
      <multiple-choices
        v-if="
          (!isLoaded && randomType == 4 && stage == 'learning-practice') ||
          (randomType == 4 && stage == 'practice')
        "
      ></multiple-choices>
    </div>

    <div class="fixed-bottom" v-if="isDesktop">
      <div
        :skill="practiceStore.skill"
        class="background-bar animation-bar-move-to-right"
      ></div>
    </div>

    <loading-dialog :isShowLoading="isLoaded"></loading-dialog>
  </q-page>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";

import loadingDialog from "components/dialog-loading.vue";
import headerBar from "components/practice_main/header_bar.vue";

import flashcard from "components/vocabulary_main/flashcard.vue";
import spelling1 from "components/vocabulary_main/spelling_bee_1.vue";
import spelling2 from "components/vocabulary_main/spelling_bee_2.vue";
import matching from "components/vocabulary_main/matching.vue";
import multipleChoices from "components/vocabulary_main/multiple_choices.vue";
import { usePracticeStore } from "src/stores/practice";
import { useSystemStore } from "src/stores/system";
export default {
  components: {
    headerBar,
    flashcard,
    spelling1,
    spelling2,
    matching,
    multipleChoices,
    loadingDialog,
  },
  setup() {
    // Initialize
    const $q = useQuasar();
    const practiceStore = usePracticeStore();
    const systemStore = useSystemStore();
    const route = useRoute();
    const router = useRouter();
    const isDesktop = ref($q.platform.is.desktop);

    const stage = ref("learning-flashcard");
    const randomType = ref(1);
    const currentQuestionIndex = ref(0);

    const tempAudio = ref(null);
    const funcPlaySound = (type, url) => {
      if (tempAudio.value) {
        tempAudio.value.pause();
      }

      let audio = new Audio(url);
      tempAudio.value = audio;

      tempAudio.value.currentTime = 0;
      tempAudio.value.volume = 1;

      if (type == "slow") tempAudio.value.playbackRate = 0.5;

      tempAudio.value.play();
    };

    const funcLearningPractice = () => {};

    const funcSetCurrentQuestion = (val) => {
      if (val < currentQuestionIndex.value) {
        return;
      }
      currentQuestionIndex.value = val;
    };

    const progressBar = computed(() => {
      let totalBar =
        (currentQuestionIndex.value /
          (practiceStore.data.length + practiceStore.practice.length - 1)) *
        100;

      return totalBar;
    });

    const isLoaded = ref(true);
    onMounted(async () => {
      if ($q.platform.is.desktop) {
        document
          .querySelector(".container-scroll")
          .addEventListener("load", eventScroll, true);
      }

      await practiceStore.getFlashcard();
      await practiceStore.getFlashcardLearningPractice();

      isLoaded.value = false;
    });

    // -------------------------------- Event Scroll Control-----------------------------------------
    const eventScroll = () => {
      const slider = document.querySelector(".container-scroll");
      let isDown = false;
      let startX;
      let startY;
      let scrollLeft;
      let scrollTop;

      // slider.scrollLeft = 800;
      // slider.scrollTop = 450;

      const mouseDownHandler = (e) => {
        isDown = true;

        startX = e.pageX - slider.offsetLeft;
        startY = e.pageY - slider.offsetTop;

        scrollLeft = slider.scrollLeft;
        scrollTop = slider.scrollTop;

        slider.addEventListener("mousemove", mouseMoveHandler);
        slider.addEventListener("mouseup", mouseUpHandler);
      };

      const mouseMoveHandler = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - startX) * 1; //scroll-fast
        const walkY = (y - startY) * 1; //scroll-fast
        slider.scrollLeft = scrollLeft - walkX;
        slider.scrollTop = scrollTop - walkY;
      };

      const mouseUpHandler = () => {
        isDown = false;

        slider.removeEventListener("mousemove", mouseMoveHandler);
        slider.removeEventListener("mouseup", mouseUpHandler);
      };

      const mouseLeave = () => {
        isDown = false;

        slider.removeEventListener("mousemove", mouseMoveHandler);
        slider.removeEventListener("mouseup", mouseUpHandler);
      };

      slider.addEventListener("mouseLeave", mouseLeave);
      slider.addEventListener("mousedown", mouseDownHandler);
    };
    // -------------------------------- Event Scroll Control-----------------------------------------

    const screenControl = ref({
      width: 0,
      height: 0,
    });

    const onResize = (size) => {
      screenControl.value = size;
    };

    return {
      // Store
      practiceStore,
      systemStore,

      // Data
      stage,
      screenControl,
      isDesktop,
      isLoaded,
      onResize,
      funcPlaySound,

      randomType,

      funcLearningPractice,
      funcSetCurrentQuestion,

      // Computed
      progressBar,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-bar {
  width: 200%;
  height: 50px;
}

.background-bar[skill="Vocabulary"] {
  background-image: url("/images/background_main/backdrop-vocabulary-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Reading"] {
  background-image: url("/images/background_main/backdrop-reading-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Writing"] {
  background-image: url("/images/background_main/backdrop-writing-bar.png");
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

.container-scroll {
  position: relative;
  width: 100%;
  height: 200px;
  user-select: none;
  cursor: pointer;
  box-sizing: inherit;
  overflow: auto;
}

.container-scroll[skill="PracticeList"] {
  background-image: url("/images/background_main/backdrop-practicelist.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Vocabulary"] {
  background-image: url("/images/background_main/backdrop-vocabulary.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Reading"] {
  background-image: url("/images/background_main/backdrop-reading.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Writing"] {
  background-image: url("/images/background_main/backdrop-writing.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.container-scroll-mobile {
  position: relative;
  overflow: hidden;
}

.container-scroll-mobile[skill="Vocabulary"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-vocabulary.png");
}
.container-scroll-mobile[skill="Grammar"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-grammar.png");
}

.container-scroll-mobile[skill="Reading"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-reading.png");
}

.container-scroll-mobile[skill="Writing"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-writing.png");
}

.container-scroll-mobile[skill="Phonics"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-phonics.png");
}

.container-scroll-mobile[skill="Listening"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-listening.png");
}

.background-practice-skill {
  position: relative;
  min-width: 1200px;
  width: 100%;
  max-width: 1600px;
  min-height: 900px;
  margin: auto;
  overflow: auto;
  cursor: grab;
  z-index: 1;
}

.background-practice-skill[practiceType="flashcard"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-flashcard.png");
  background-position: center;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.box-progress-bar {
  position: relative;
  width: 100%;
  background-color: rgba(200, 192, 192, 0.5);
  box-shadow: inset 0px 0px 10px 3px rgba(0, 0, 0, 0.4);
  border-radius: 40px;
  padding: 2px;
}

.progress-bar {
  background-color: #f4a814;
  height: 20px;
  border-radius: 50px;
  background-image: repeating-linear-gradient(
    40deg,
    transparent,
    transparent 7px,
    #f1c40f 0px,
    #f1c40f 20px
  );
  transition: width 1s;
}

.animation-airplane {
  transition: left 1s;
}
</style>
