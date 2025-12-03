<template>
  <div class="row relative-position bg-container-main">
    <div class="col-12 box-content-main">
      <div
        style="height: 50px; margin-top: -101px"
        class="relative-position bg-black"
      ></div>
      <div class="relative-position">
        <div class="absolute-top" style="top: 50px">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <theme-animation
          :isCorrectAnswer="practiceData.isCorrectAnswer"
          :isSendAnswer="practiceData.isSendAnswer"
        ></theme-animation>
      </div>
    </div>
    <div class="col-12" align="center">
      <div class="box-question q-pa-lg">
        <span style="font-size: 20px" v-html="practiceData.question"></span>
      </div>
    </div>
    <div class="col-12 relative-position row items-center justify-center">
      <div class="col-8 row">
        <div
          class="col-4 q-pa-lg"
          v-for="(item, index) in practiceData.choices"
          :key="index"
          @click="
            practiceData.isSendAnswer
              ? null
              : (practiceData.currentChoiceIndex = item.index),
              item.soundUrl ? $emit('callback-playsound', item.soundUrl) : null
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
    </div>

    <div class="col-12 self-end q-pa-md" align="center">
      <q-img
        width="200px"
        @click="
          practiceData.currentChoiceIndex == null
            ? null
            : $emit('callback-sendanswer')
        "
        :class="
          practiceData.currentChoiceIndex == null
            ? 'no-pointer-events'
            : 'cursor-pointer'
        "
        :src="`/images/send-answer-btn${
          practiceData.isSendanswer
            ? ''
            : practiceData.currentChoiceIndex != null
            ? ''
            : '-noactive'
        }.png`"
      ></q-img>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import themeAnimation from "../conversation/theme-animation.vue";
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
  emits: ["callback-sendanswer", "callback-playsound"],
};
</script>

<style lang="scss" scoped>
.bg-container-main {
  // background-image: url("/images/conversation/bg-content-conversation.png");
  background-size: contain;
  background-color: #667ea2ab;
}

.box-content-main {
  width: 100%;
}

.box-question {
  max-width: 600px;
  width: 100%;
  border: 5px solid #20375c;
  border-radius: 7px;
  background-color: #fff;
}
</style>
