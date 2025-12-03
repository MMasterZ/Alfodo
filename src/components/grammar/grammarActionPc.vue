<template>
  <div class="box-grammar">
    <div align="center">
      <div class="box-animation relative-position">
        <div class="full-width">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <div class="box-aniamtion-size relative-position q-pa-md">
          <animation-action :practiceData="practiceData"></animation-action>
        </div>
      </div>

      <div class="box-content-main q-pa-xl" align="center">
        <div
          class="box-question row justify-center items-center q-pa-md"
          align="left"
          v-if="!isWaiting"
        >
          <div class="self-center">
            <span class="f22" v-html="practiceData.question" v-if="practiceData.question">
            </span>
            <span class="f20" v-html="practiceData.instructionEng" v-else> </span>
          </div>
          <q-space></q-space>
          <div
            class="col-1 self-center q-pa-md"
            align="right"
            style="width: fit-content"
            v-if="practiceData.isImage"
          >
            <q-btn
              push
              class="bg-brown text-white"
              label="ดูภาพโจทย์"
              @click="isShowDialogImage = true"
            >
            </q-btn>
          </div>
        </div>

        <!--  Box Choice -->
        <div class="q-mt-md" align="center" v-if="!isWaiting">
          <div class="row">
            <div
              class="col-6 relative-position q-pa-sm"
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

    <q-dialog v-model="isShowDialogImage">
      <q-card class="box-dialog-image">
        <q-card-section class="bg-deep-purple-10 q-pa-sm">
          <div class="row">
            <div class="col-1" style="width: 50px"></div>
            <div class="col self-center" align="center">
              <span class="text-amber f16">ภาพโจทย์</span>
            </div>
            <div class="col-1" style="width: 50px" align="right">
              <q-btn dense round flat>
                <q-icon
                  name="fas fa-times"
                  size="25px"
                  class="text-amber"
                  v-close-popup
                ></q-icon>
              </q-btn>
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
              <q-img width="300px" height="300px" :src="practiceData.imageUrl"></q-img>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesActionBtn.vue";
import waiting from "../waiting.vue";
import animationAction from "../grammar/grammarActionAnimation.vue";
import headerBar from "../header-time-progress.vue";
import { ref } from "vue";
export default {
  components: {
    waiting,
    animationAction,
    multiplechoiceBtn,
    headerBar,
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
.box-animation {
  background-image: url("/images/background_main/banner-grammar-action.png");
  background-size: cover;
  background-position: top;
}

.box-grammar {
  background-image: url("/images/grammar/bg-grammarmultiple-content.png");
  background-color: #b2dfff;
  background-size: contain;
  background-position: bottom;
}

.box-aniamtion-size {
  max-width: 1000px;
  width: 100%;
}

.box-question {
  border: 5px solid #a36112;
  background-color: #fff;
  border-radius: 10px;
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
}
</style>
