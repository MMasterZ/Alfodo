<template>
  <div>
    <div class="q-mb-sm">
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div class="q-px-md">
      <div class="box-question" style="font-size: 20px" align="center">
        <div
          class="bg-question row justify-center items-center q-pa-md"
          align="left"
        >
          <span v-html="practiceData.question"></span>
        </div>
      </div>
    </div>
    <div class="q-pa-md" align="center">
      <div
        v-for="(item, index) in practiceData.choices"
        :key="index"
        class="q-pa-sm"
        style="max-width: 500px; width: 100%"
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
      default: () => {},
    },
  },
  emits: ["callback-sendanswer"],
};
</script>

<style lang="scss" scoped>
.box-question {
  max-width: 600px;
  width: 100%;
  border: 7px solid rgba(228, 244, 255, 0.2);
  border-radius: 30px;
  margin: auto;
}

.bg-question {
  background-color: #a3e6f9;
  border-radius: 25px;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}
</style>
