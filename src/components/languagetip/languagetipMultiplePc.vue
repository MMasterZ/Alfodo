<template>
  <div class="row">
    <div class="col-12 relative-position self-start" align="center">
      <div class="absolute full-width">
        <header-bar :practiceData="practiceData"></header-bar>
      </div>
      <theme-animation
        :isCorrectAnswer="practiceData.isCorrectAnswer"
        :isSendAnswer="practiceData.isSendAnswer"
      ></theme-animation>
    </div>
    <div class="col-12" align="center">
      <div
        class="box-question row justify-center items-center q-pa-md f20"
        align="left"
      >
        <span v-html="practiceData.question"></span>
      </div>
      <div class="row box-choice q-my-md">
        <div
          class="q-mt-sm col-6 q-pa-sm"
          v-for="(item, index) in practiceData.choices"
          :key="index"
          @click="
            practiceData.isSendAnswer
              ? null
              : (practiceData.currentChoiceIndex = item.index),
              $emit('callback-sendanswer', { data: item, index: index })
          "
        >
          <multiplechoice-btn
            :choices="item"
            :practiceData="practiceData"
            :index="index"
          ></multiplechoice-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import themeAnimation from "./theme-animation.vue";
export default {
  components: {
    headerBar,
    themeAnimation,
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
.box-question {
  max-width: 1000px;
  width: 95%;
  border: 5px solid #a36112;
  background-color: #fff;
}

.box-choice {
  max-width: 1000px;
  width: 95%;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
