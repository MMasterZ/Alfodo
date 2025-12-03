<template>
  <div class="row">
    <div class="bg-phonics-multi relative-position col">
      <div class="absolute-top">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <div class="row">
        <div class="col-12 bg-animation">
          <theme-animation
            style="margin-bottom: -5px"
            :choicesLength="practiceData.choices.length"
            :isSendAnswer="practiceData.isSendAnswer"
            :currentAnswer="practiceData.currentChoiceIndex"
            :isCorrectAnswer="practiceData.isCorrectAnswer"
          ></theme-animation>
        </div>
      </div>

      <div class="row justify-center box-content-choice q-py-md">
        <div class="">
          <div class="q-pt-lg q-pb-md" align="center">
            <div
              class="box-content-question row bg-white q-px-md q-py-sm"
              align="center"
              v-if="!practiceData.isQuestionSound"
            >
              <div class="col self-center" align="center">
                <span style="font-size: 18px" v-html="practiceData.question"></span>
              </div>
            </div>
            <div v-else>
              <q-img
                :class="!practiceData.isSendAnswer ? 'cursor-pointer' : ''"
                style="max-width: 460px; width: 100%"
                src="/images/phonics/question-sound-btn.png"
                @click="
                  !practiceData.isSendAnswer
                    ? $emit('callback-playsound', practiceData.soundQuestionUrl)
                    : null
                "
              >
                <div
                  v-if="!practiceData.isSendAnswer"
                  style="font-size: 18px; top: 45%"
                  class="transparent absolute-center full-width"
                >
                  <span> กดเพื่อฟังเสียงโจทย์</span>
                  <q-icon class="q-mx-md" name="fas fa-volume-up"></q-icon>
                </div>

                <div
                  v-else
                  style="font-size: 18px; top: 45%"
                  class="transparent absolute-center full-width"
                >
                  <span>{{ practiceData.question }}</span>

                  <!-- <q-icon class="q-mx-md" name="fas fa-volume-up"></q-icon> -->
                </div>
              </q-img>
            </div>
          </div>

          <div class="row" style="width: 800px">
            <div
              class="self-center q-pa-sm q-mt-sm"
              :class="item.soundUrl ? 'col-4' : 'col-6'"
              align="center"
              v-for="(item, index) in practiceData.choices"
              :key="index"
              @click="
                practiceData.isSendAnswer
                  ? null
                  : ((practiceData.currentChoiceIndex = item.index),
                    item.soundUrl ? $emit('callback-playsound', item.soundUrl) : '')
              "
            >
              <multiplechoice-btn
                :choices="item"
                :practiceData="practiceData"
                :isSound="item.soundUrl ? true : false"
              ></multiplechoice-btn>
            </div>
          </div>

          <div class="q-pa-md q-mt-md" align="center" v-if="!practiceData.isSendAnswer">
            <q-img
              width="200px"
              :class="practiceData.currentChoiceIndex == null ? null : 'cursor-pointer'"
              @click="
                practiceData.currentChoiceIndex == null
                  ? null
                  : $emit('callback-sendanswer')
              "
              :src="`/images/send-answer-btn${
                practiceData.currentChoiceIndex == null ? '-noactive' : ''
              }.png`"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3 box-help">
      <div
        class="box-help-header q-pa-lg text-white"
        style="font-size: 20px"
        align="center"
      >
        เทียบเสียง
      </div>
      <div class="box-help-scroll">
        <div
          class="row justify-around q-py-sm q-px-md"
          style="border-bottom: 1px solid #c4c4c4; font-size: 14px"
          v-for="(item, index) in practiceData.extraSound"
          :key="index"
        >
          <div class="col-1 q-pl-md" style="width: 70px" align="left">
            <span>{{ item.vocab }}</span>
          </div>
          <div class="col" style="width: 150px" align="left">
            <span
              v-if="
                item.vocab == 'A' ||
                item.vocab == 'E' ||
                item.vocab == 'I' ||
                item.vocab == 'O' ||
                item.vocab == 'U'
              "
              >เทียบได้กับสระ</span
            >
            <span v-else>เทียบได้กับอักษร</span>
          </div>
          <div class="col-4 q-pl-sm" style="width: 80px" align="left">
            <span>{{ item.alphabets }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import themeAnimation from "../phonicsmultiple/theme-animation.vue";
import { ref } from "vue";
export default {
  components: {
    headerBar,
    themeAnimation,
    multiplechoiceBtn,
  },
  props: {
    practiceData: {
      type: Object,
      defulat: () => {},
    },
  },
  emits: ["callback-playsound", "callback-sendanswer"],
};
</script>

<style lang="scss" scoped>
.bg-phonics-multi {
  background-color: #2b3652;
  background-image: url("/images/phonics/bg-content-phonics.png");
  background-position: bottom;
  background-size: contain;
}

.bg-animation {
  background-image: url("/images/phonics/bg-phonicsmulti.png");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
}

.box-content-choice {
  min-height: 45vh;
  max-height: fit-content;
  // background-color: #ffd5b7;
}

.box-content-question {
  max-width: 600px;
  width: 95%;
  min-height: 80px;
  max-height: fit-content;
  border-radius: 7px;
  border: 5px solid #014270;
}

.box-help {
  width: 22%;
  background-color: #fff0da;
}

.box-help-header {
  height: 80px;
  background-color: #014270;
}

.box-help-scroll {
  height: calc(100vh - 130px);
  overflow: auto;
}

/* width */
.box-help-scroll::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.box-help-scroll::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-help-scroll::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-help-scroll::-webkit-scrollbar-thumb:hover {
  background: #861d0a;
}
</style>
