<template>
  <div class="background-main">
    <div>
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div
      class="relative-position box-question q-pa-md f16 row justify-center items-center"
      align="left"
      v-if="!practiceData.isQuestionSound"
    >
      <span class="f16" v-html="practiceData.question"></span>
    </div>
    <div
      v-else
      v-ripple
      align="center"
      class="relative-position box-question-mobile q-pa-md f16 row justify-center items-center cursor-pointer"
      @click="
        practiceData.soundQuestionUrl
          ? $emit('callback-playsound', practiceData.soundQuestionUrl)
          : null
      "
    >
      <div style="font-size: 16px" class="text-white" v-if="!practiceData.isSendAnswer">
        <span> กดเพื่อฟังเสียงโจทย์ </span>
        <q-icon class="q-mx-md" name="fas fa-volume-up"></q-icon>
      </div>
      <div
        v-else
        style="font-size: 18px"
        class="transparent absolute-center full-width text-white"
      >
        <span>{{ practiceData.question }}</span>

        <!-- <q-icon class="q-mx-md" name="fas fa-volume-up"></q-icon> -->
      </div>
    </div>

    <div class="q-pa-md box-answer relative-position">
      <div
        v-for="(item, index) in practiceData.choices"
        :key="index"
        class="q-py-sm"
        align="center"
        @click="
          practiceData.isSendAnswer
            ? null
            : (practiceData.currentChoiceIndex = item.index),
            item.soundUrl ? $emit('callback-playsound', item.soundUrl) : ''
        "
      >
        <multiplechoice-btn
          :choices="item"
          :practiceData="practiceData"
          :isSound="item.soundUrl ? true : false"
          :index="index"
        ></multiplechoice-btn>
      </div>
    </div>
    <div class="q-pa-md" align="center">
      <q-img
        width="200px"
        :class="practiceData.currentChoiceIndex == null ? null : 'cursor-pointer'"
        @click="
          practiceData.currentChoiceIndex == null ? null : $emit('callback-sendanswer')
        "
        :src="`/images/send-answer-btn${
          practiceData.currentChoiceIndex == null ? '-noactive' : ''
        }.png`"
        v-if="!practiceData.isSendAnswer"
      ></q-img>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
export default {
  components: {
    headerBar,
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
.background-main {
  max-width: 1000px;
  min-width: 300px;
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url("/images/phonics/background-phonics-multiple-2.png");
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
  margin: auto;
}

.box-container {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
}

.box-question {
  max-width: 500px;
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  border: 5px solid #00637c;
  background-color: #fff;
  margin: auto;
}

.box-question-mobile {
  max-width: 500px;
  width: 100%;
  min-width: 320px;
  min-height: 100px;
  max-height: fit-content;
  background-color: #00637c;
  box-shadow: 0px 2px 1px 1px #004c5f;
  margin: auto;
}

.box-answer {
  max-width: 500px;
  width: 100%;
  margin: auto;
  z-index: 2;
}
</style>
