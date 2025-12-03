<template>
  <div class="row bg-content">
    <div class="col self-start row">
      <!-- อนิเมชั่น   -->
      <div class="col-12 relative-position" style="margin-top: -48px">
        <div class="absolute full-width" style="top: 51px">
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
        <theme-animation
          :isSendAnswer="practiceData.isSendAnswer"
          :isCorrectAnswer="practiceData.isCorrectAnswer"
        ></theme-animation>
      </div>

      <!-- คำตอบ -->
      <div class="col-12 q-mt-md" align="center">
        <div class="box-content-choices">
          <!-- คำถาม -->
          <div class="q-pa-sm">
            <div class="col-12 box-question row">
              <div class="col self-center q-pa-md" align="center">
                <span
                  class="f20"
                  v-html="practiceData.question"
                  v-if="practiceData.question"
                >
                </span>
                <span class="f20" v-html="practiceData.instructionEng" v-else> </span>
              </div>
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
          </div>

          <div class="row">
            <div
              v-for="(item, index) in practiceData.choices"
              :key="index"
              class="q-mt-sm col-6 q-pa-sm"
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
              ></multiplechoice-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- คำศัพท์เสริม -->
    <div class="col-4 box-extravocab">
      <div
        class="box-header-extravocab relative-position q-pa-sm"
        style="background-color: #593000; color: #ffffff"
        align="center"
      >
        <div style="border: 3px dashed #945f20; height: 100%">
          <span class="absolute-center f18"> คำศัพท์เสริม </span>
        </div>
      </div>
      <div class="box-content-extravocab q-py-sm">
        <div v-if="practiceData.extraVocab.length">
          <div v-for="(item, index) in practiceData.extraVocab">
            <div v-ripple class="relative-position q-px-md q-py-xs cursor-pointer row">
              <div class="col">
                <span class="f16">
                  {{ item.vocab + " (" + item.partOfSpeech.partOfSpeech + ")" }}
                  <br />
                  {{ item.meaning }}
                </span>
              </div>
              <div class="col-1 self-center" style="width: 50px" align="center">
                <q-icon size="22px" name="fas fa-volume-up"></q-icon>
              </div>
            </div>
            <hr style="border: 1px solid #ffc177" />
          </div>
        </div>
        <div v-else align="center" class="q-pa-md text-bold">
          <span>ไม่มีคำศัพท์เสริม</span>
          <br />
          <span>สำหรับแบบฝึกหัดนี้</span>
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
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import themeAnimation from "./themeAnimation.vue";
import { ref } from "vue";
export default {
  components: {
    headerBar,
    themeAnimation,
    multiplechoiceBtn,
  },
  props: {
    practiceData: {
      default: () => {},
    },
  },
  emits: ["callback-showdialoghelp", "callback-sendanswer"],

  setup(props) {
    const isShowDialogImage = ref(false);

    return { isShowDialogImage };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  border: 5px solid #d14e29;
  background-color: #fff;
  border-radius: 10px;
}

.bg-content {
  background-image: url("/images/grammar/bg-grammarmultiple-content.png");
  background-position: bottom;
  background-size: contain;
}

.box-content-choices {
  max-width: 1000px;
  width: 100%;
}

.box-extravocab {
  position: sticky;
  top: 100px;
  width: 25%;
  background-color: #ffe5c6;
}

.box-header-extravocab {
  height: 80px;
}

.box-content-extravocab {
  height: calc(100vh - 130px);
  overflow: auto;
  color: #593000;
}

/* width */
.box-content-extravocab::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-content-extravocab::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-extravocab::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-extravocab::-webkit-scrollbar-thumb:hover {
  background: #bd280e;
}

.box-description {
  max-width: 1000px;
  width: 95%;
  border-radius: 10px;
  overflow: hidden;
  background-color: #fff;
}

.box-dialog-image {
  max-width: 800px;
  width: 100%;
}
</style>
