<template>
  <div class="row relative-position">
    <!-- Col แบบฝึกหัด -->
    <div class="col relative-position">
      <div style="width: 100%">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>

      <div class="q-pa-md">
        <theme-animation
          class="relative-position"
          style="z-index: 2"
          :isSendAnswer="practiceData.isSendAnswer"
          :isCorrectAnswer="practiceData.isCorrectAnswer"
        ></theme-animation>
      </div>

      <div align="center" class="relative-position q-py-md">
        <div class="q-pa-md box-content-main">
          <div
            class="box-question row justify-center items-center q-pa-lg font-content"
            align="left"
          >
            <span v-html="practiceData.question"></span>
          </div>
          <!-- Choices -->
          <div class="q-py-md row">
            <div
              @click="$emit('callback-sendanswer', item)"
              class="col-6 q-pa-sm"
              align="center"
              v-for="(item, index) in practiceData.choices"
              :key="index"
              style="font-size: 20px"
            >
              <multiplechoice-btn
                :isCorrectAnswer="practiceData.isCorrectAnswer"
                :choices="item"
                :index="practiceData.currentChoiceIndex"
                :practiceData="practiceData"
              ></multiplechoice-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Col ศัพท์เสริม -->
    <!-- <q-page-sticky position="right" :offset="[0, 0]"> -->
    <div class="col-4 box-header-extravocab">
      <div class="header-extravocab q-pa-sm">
        <div
          class="fit flex flex-center q-py-md"
          align="center"
          style="border: 2px dashed #8837cf"
        >
          <span class="f18">คำศัพท์เสริม</span>
        </div>
      </div>
      <div class="box-content-extravocab">
        <div v-for="(item, index) in practiceData.extraVocab" :key="index">
          <div class="relative-position q-py-xs q-px-md f16 q-py-sm row">
            <div class="col">
              <span>
                <span v-html="item.vocab"></span>
                <span
                  class="relative-position q-mx-xs"
                  v-if="item.partOfSpeech.partOfSpeech != 'ไม่ระบุ'"
                  >{{ `(${item.partOfSpeech.partOfSpeech})` }}</span
                >
              </span>
              <br />
              <div class="q-mt-xs" v-html="item.meaning"></div>
            </div>
            <!-- <div class="self-center">
              <q-btn flat>
                <q-icon name="fas fa-volume-up"></q-icon>
              </q-btn>
            </div> -->
          </div>
          <hr class="no-padding no-margin" />
        </div>
      </div>
    </div>
    <!-- </q-page-sticky> -->
  </div>
</template>

<script>
import headerBar from "../header-time-progress.vue";
import themeAnimation from "./theme-animation.vue";
import boxAnswer from "./box-answer.vue";
import { ref } from "vue";
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
export default {
  components: {
    boxAnswer,
    themeAnimation,
    headerBar,
    multiplechoiceBtn,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },

  emits: ["callback-sendanswer"],
};
</script>

<style lang="scss" scoped>
.box-container-description {
  max-width: 1000px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.bg-content-main {
  background-color: #ffdba3;
}

.box-content-main {
  position: relative;
  max-width: 1000px;
  z-index: 2;
}

.box-question {
  margin-top: -5px;
  border: 4px solid #d14e29;
  background-color: #fff7eb;
  border-radius: 10px;
}

.box-header-extravocab {
  position: sticky;
  top: 50px;
  width: 25%;
  background-color: #7e3cb7;
  z-index: 2;
  color: #fff;
}

.header-extravocab {
  position: relative;
  background-color: #4d1380;
  color: #fff;
  height: 80px;
  font-size: 16px;
}

.box-content-extravocab {
  height: calc(100vh - 140px);
  overflow-y: auto;
}

// Scrollbar
/* width */
.box-content-extravocab::-webkit-scrollbar {
  width: 6px;
}

/* Track */
.box-content-extravocab::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-extravocab::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-extravocab::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.font-content {
  font-size: 20px;
}
.bg-choices-img {
  background-image: url("/images/multiplevocab/new-bg.png");
}
.bg-repeat-img {
  background-image: url("/images/multiplevocab/bg-repeat.png");
}

.bg-btn {
  background-image: linear-gradient(#ffd057, #ffa601);
  box-shadow: 0px 3px 3px 0px #db8200;
  border-radius: 10px;
}

.circle-1 {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}

.circle-2 {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  box-shadow: 1px 1px 1px;
}

.btn-choice:hover {
  transition: 0.2s;
  transform: scale(0.97);
}
</style>
