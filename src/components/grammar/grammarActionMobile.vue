<template>
  <div class="background-main">
    <div align="center">
      <div>
        <header-bar :practiceData="practiceData"></header-bar>
      </div>

      <div class="q-mt-sm" align="left">
        <div class="box-question" v-if="!isWaiting">
          <div class="q-pa-md">
            <span class="f20" v-html="practiceData.question"></span>
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

        <!--  Box Choice -->
        <div
          align="center"
          v-if="!isWaiting"
          style="max-width: 500px; width: 100%; margin: auto"
        >
          <div class="row q-pa-sm">
            <div
              class="col-12 relative-position q-pa-sm"
              v-for="(item, index) in practiceData.choices"
              @mouseenter="
                practiceData.isSendAnswer
                  ? null
                  : (practiceData.currentChoiceIndex = item.index)
              "
              @mouseleave="
                practiceData.isSendAnswer
                  ? null
                  : (practiceData.currentChoiceIndex = null)
              "
              @click="
                practiceData.isSendAnswer
                  ? null
                  : practiceData.currentStep == 2 || !practiceData.isSynchronize
                  ? ((practiceData.currentChoiceIndex = item.index),
                    $emit('callback-sendanswer', item))
                  : null
              "
            >
              <multiplechoice-btn
                :choices="item"
                :isDisable="
                  (practiceData.currentStep == 0 && practiceData.isSynchronize) ||
                  (practiceData.currentStep == 1 && practiceData.isSynchronize) ||
                  (practiceData.currentStep == 3 && practiceData.isSynchronize)
                    ? true
                    : false
                "
                :index="index"
                :isSynchronize="practiceData.isSynchronize"
                :practiceData="practiceData"
              ></multiplechoice-btn>
            </div>
          </div>
        </div>

        <!--  Box Waiting -->
        <div class="q-mt-md" v-if="practiceData.isSynchronize && isWaiting">
          <div class="box-waiting" align="center">
            <div class="waiting-size">
              <waiting></waiting>
              <div class="q-pb-lg">
                <span class="f24" style="color: #662707">รอเพื่อนก่อนนะ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog maximized v-model="isShowDialogImage">
      <q-card class="transparent shadow-0 q-pa-md row justify-center items-center">
        <div class="box-dialog-image">
          <q-card-section class="bg-deep-purple-10 q-pa-sm">
            <div class="row">
              <div class="col self-center" align="center">
                <span class="text-amber f16">ภาพโจทย์</span>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="bg-amber-1">
            <div class="box-question q-pa-md row justify-center" align="left">
              <span
                class="f20"
                v-html="practiceData.question"
                v-if="practiceData.question"
              >
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
        </div>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesActionBtn.vue";
import headerBar from "../header-time-progress.vue";
import waiting from "../waiting.vue";
import { ref } from "vue";
export default {
  components: {
    waiting,
    headerBar,
    multiplechoiceBtn,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    isWaiting: {
      type: Boolean,
      default: false,
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

.box-animation {
  background-image: url("/images/grammar/bg-grammar-action.png");
  background-size: cover;
  background-position: top;
}
.box-aniamtion-size {
  max-width: 1000px;
  width: 100%;
}

.box-question {
  max-width: 600px;
  width: 100%;
  border: 3px solid #a36112;
  background-color: #fff0da;
  padding-bottom: 30px;
  margin: auto;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  margin: auto;
}

.box-waiting {
  border: 5px solid #d14e29;
  background-color: #fff7eb;
  border-radius: 10px;
}

.waiting-size {
  max-width: 320px;
  width: 100%;
}

.box-waiting {
  border: 5px solid #d14e29;
  background-color: #fff7eb;
  border-radius: 10px;
}

.box-dialog-image {
  max-width: 800px;
  width: 100%;
  border-radius: 10px;
}
</style>
