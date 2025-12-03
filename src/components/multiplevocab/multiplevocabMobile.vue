<template>
  <div>
    <div>
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div
      class="relative-position box-question q-pa-md f16 row justify-center items-center"
    >
      <div class="q-pa-sm" align="left">
        <span v-html="practiceData.question"></span>
      </div>
    </div>

    <div class="relative-position box-answer q-pa-md">
      <div
        @click="
          practiceData.isSendAnswer
            ? null
            : (practiceData.currentChoiceIndex = item.index),
            $emit('callback-sendanswer', item)
        "
        :class="practiceData.isSendAnswer ? '' : 'btn-choice'"
        class="q-pa-sm relative-position"
        align="center"
        v-for="(item, index) in practiceData.choices"
        :key="index"
        style="z-index: 2"
      >
        <multiplechoice-btn
          :practiceData="practiceData"
          :choices="item"
        ></multiplechoice-btn>
      </div>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import { ref } from "vue";
export default {
  components: {
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

.box-header-description {
  width: 90%;
  overflow: hidden;
}

.box-container-mobile {
  min-width: 360px;
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.box-header-main {
  width: calc(100% - 25%);
}

.box-question {
  max-width: 500px;
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  border: 4px solid #d14e29;
  background-color: #fff0da;
  margin: auto;
  z-index: 2;
}

.box-answer {
  max-width: 500px;
  width: 100%;
  margin: auto;
  z-index: 2;
}

.btn-choices {
  max-width: 300px;
  width: 100%;
}

.font-content {
  font-size: 16px;
}

.bg-btn {
  background-image: linear-gradient(#ffd057, #ffa601);
  box-shadow: 0px 3px 3px 0px #db8200;
  border-radius: 10px;
  transition: 0.1s;
}

.bg-btn:active {
  transition: 0.1s;
  transform: scale(0.97);
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
</style>
