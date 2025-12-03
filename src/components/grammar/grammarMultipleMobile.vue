<template>
  <div class="background-main">
    <div>
      <header-bar :practiceData="practiceData"></header-bar>
    </div>
    <div
      class="relative-position box-question q-pa-md f16 row justify-center items-center"
      style="font-size: 16px"
      align="center"
    >
      <div class="q-pa-sm" align="left">
        <span v-html="practiceData.question"></span>
      </div>
      <div
        class="col-12 self-center q-px-md q-mt-md"
        align="center"
        v-if="practiceData.isImage"
      >
        <q-btn
          push
          class="bg-brown-8 text-white"
          label="ดูภาพโจทย์"
          @click="isShowDialogImage = true"
          style="width: 160px"
        >
        </q-btn>
      </div>
    </div>

    <div class="q-pa-md box-answer relative-position">
      <div
        v-for="(item, index) in practiceData.choices"
        class="q-pa-sm"
        :key="index"
        @click="
          practiceData.isSendAnswer
            ? null
            : (practiceData.currentChoiceIndex = item.index),
            $emit('callback-sendanswer')
        "
      >
        <multiplechoice-btn
          :choices="item"
          :practiceData="practiceData"
          :index="index"
        ></multiplechoice-btn>
      </div>
    </div>

    <q-dialog v-model="isShowDialogImage">
      <q-card class="box-dialog-image">
        <q-card-section class="bg-deep-purple-10 q-pa-sm">
          <div class="row">
            <div class="col self-center" align="center">
              <span class="text-amber f16">ภาพโจทย์</span>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="bg-amber-1">
          <div class="box-question q-pa-md" align="center">
            <span class="f20" v-html="practiceData.question" v-if="practiceData.question">
            </span>
            <span class="f20" v-html="practiceData.instructionEng" v-else> </span>
          </div>

          <div class="q-py-lg">
            <div
              class="q-pa-lg"
              style="border: 3px dashed #ffc279; border-radius: 5px"
              align="center"
            >
              <q-img
                style="max-width: 300px; width: 100%"
                :src="practiceData.imageUrl"
              ></q-img>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="no-padding">
          <q-btn
            class="fit bg-amber border-radius-inherit"
            label="ปิด"
            v-close-popup
          ></q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
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

  setup(props) {
    const isShowDialogImage = ref(false);

    return { isShowDialogImage };
  },
};
</script>

<style lang="scss" scoped>
.background-main {
  max-width: 1000px;
  min-width: 300px;
  width: 100%;
  height: calc(100vh - 50px);
  background-image: url("/images/grammar/background-grammar-multiple-2.png");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
}

.box-question {
  max-width: 500px;
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  border: 4px solid #a36112;
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

.box-dialog-image {
  max-width: 800px;
  width: 100%;
}
</style>
