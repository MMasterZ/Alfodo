<template>
  <div class="">
    <div>
      <header-bar :practiceData="practiceData"></header-bar>
      <div align="center">
        <div class="box-content-question row q-px-sm" align="center">
          <div class="col self-center" align="center">
            <span style="font-size: 18px" v-html="practiceData.question"></span>
          </div>
        </div>
      </div>
      <div class="q-my-md q-pa-sm">
        <div
          v-for="(item, index) in practiceData.choices"
          :key="index"
          class="q-pa-sm cursor-pointer"
          align="center"
          @click="
            practiceData.isSendAnswer
              ? null
              : ((practiceData.currentChoiceIndex = item.index),
                item.soundUrl
                  ? $emit('callback-playsound', item.soundUrl)
                  : null)
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
    <div class="q-pa-md q-mt-lg" align="center">
      <q-img
        width="200px"
        :class="
          practiceData.currentChoiceIndex == null
            ? 'no-pointer-events'
            : 'cursor-pointer'
        "
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
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
    multiplechoiceBtn,
  },
  emits: ["callback-sendanswer", "callback-playsound"],
};
</script>

<style lang="scss" scoped>
.box-container {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
}

.box-content-question {
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  border: 5px solid #a36112;
  background-color: #fff0da;
}
</style>
