<template>
  <div>
    <div class="row box-container-main">
      <div class="col-12">
        <div class="self-start relative-position q-pt-lg" align="center">
          <div>
            <q-img
              style="max-width: 400px; width: 50%; z-index: 2"
              src="/images/flashcard/logo-flashcard.png"
            ></q-img>
          </div>
        </div>
      </div>
      <div class="col-12 self-start">
        <!-- Self Learning -->
        <div class="box-container-flashcard q-pa-md" v-if="!isSynchronize">
          <div class="row q-pa-lg">
            <div
              class="col-lg-3 col-md-4 col-xs-12 q-pa-sm"
              align="center"
              v-for="(item, index) in vocabDataList"
              :key="index"
            >
              <div
                class="relative-position cursor-pointer"
                v-ripple
                style="border-radius: 10px; overflow: hidden"
                @click="
                  openFlashcardDetails(item, index),
                    $emit('playSound', item.soundVocabUrl)
                "
              >
                <div class="border-rainbow relative-position q-py-lg">
                  <div class="text-white">
                    <div align="center">
                      <div class="text-bold f32">
                        <span>{{ item.vocab }}</span>
                      </div>
                      <div class="q-mt-sm f16">
                        <span>{{ item.meaning }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Synchronize -->
        <div v-else align="center">
          <div
            class="relative-position box-dialog-details shadow-1"
            :style="`border-color:#752123;z-index:2`"
            v-if="vocabDataList.length"
          >
            <div class="row q-pa-xl">
              <div class="col-4 q-pa-md q-py-lg" style="width: 300px">
                <q-img contain :src="vocabDataList[0].imageSentenceUrl"></q-img>
              </div>
              <div class="col self-center">
                <span style="font-size: 20px">{{
                  vocabDataList[0].vocab
                }}</span>
                <span style="font-size: 16px" class="q-ml-xs"
                  >(<span v-html="vocabDataList[0].partOfSpeech.partOfSpeech">
                  </span
                  >)</span
                >
                <br />
                <div style="height: 10px"></div>
                <span
                  style="font-size: 16px"
                  v-html="vocabDataList[0].readingWord"
                >
                </span>
                <br />
                <div style="height: 10px"></div>
                <span style="font-size: 16px" v-html="vocabDataList[0].meaning">
                </span>
              </div>
            </div>
          </div>
          <div v-else align="center">
            <logo></logo>
            <div>
              <span class="f26 text-white"
                ><q-spinner-dots color="primary" size="2em" />
                รอคุณครูเลือกการ์ดสักครู่
                <q-spinner-dots color="primary" size="2em"
              /></span>
            </div>
          </div>
        </div>

        <!-- Self Learning -->
        <div
          class="relative-position q-pb-md"
          align="center"
          v-if="!isSynchronize"
        >
          <q-img
            @click="$router.replace('/practice/unit')"
            class="cursor-pointer"
            style="max-width: 200px; width: 15%; margin: auto; z-index: 2"
            src="/images/flashcard/btn-back.png"
          ></q-img>
        </div>
      </div>
      <div class="col-12"></div>
    </div>

    <!-- Dialog For Self Learning -->
    <q-dialog maximized v-model="isShowDetails">
      <q-card class="transparent shadow-0" v-if="!isSynchronize">
        <q-card-section class="fit">
          <div class="absolute-center box-dialog-details">
            <div class="row">
              <div class="col-3 q-pa-sm" style="width: 300px">
                <q-img
                  fit="cover"
                  style="width: 250px; height: 250px"
                  :src="vocabDataList[currentFlashcardIndex].imageSentenceUrl"
                ></q-img>
              </div>
              <div class="col row q-pr-md q-py-lg" style="font-size: 16px">
                <div class="col-3 q-px-sm" align="right" style="width: 120px">
                  <q-img
                    :class="
                      !vocabDataList[currentFlashcardIndex].soundVocabUrl
                        ? 'invisible'
                        : null
                    "
                    style="width: 50px"
                    src="images/flashcard/sound.png"
                    class="cursor-pointer sound-btn-flashcard"
                    @click="
                      $emit(
                        'playSound',
                        vocabDataList[currentFlashcardIndex].soundVocabUrl
                      )
                    "
                  ></q-img>
                  <q-img
                    :class="
                      !vocabDataList[currentFlashcardIndex].soundSpellUrl
                        ? 'invisible'
                        : null
                    "
                    style="width: 50px"
                    src="images/flashcard/sound-spell.png"
                    class="cursor-pointer sound-btn-flashcard"
                    @click="
                      $emit(
                        'playSound',
                        vocabDataList[currentFlashcardIndex].soundSpellUrl
                      )
                    "
                  ></q-img>
                </div>
                <div class="col q-pr-xl q-pa-sm">
                  <div class="q-px-sm">
                    <span
                      ><span style="font-size: 32px; line-height: 0"
                        >{{
                          `${vocabDataList[currentFlashcardIndex].vocab} (${vocabDataList[currentFlashcardIndex].partOfSpeech.partOfSpeech})`
                        }}
                      </span>
                    </span>
                  </div>
                  <div class="q-mt-xs q-px-sm">
                    <span
                      v-html="vocabDataList[currentFlashcardIndex].readingWord"
                    ></span>
                  </div>
                  <div class="q-mt-xs q-px-sm">
                    <span
                      v-html="vocabDataList[currentFlashcardIndex].meaning"
                    ></span>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row q-my-lg">
                    <div
                      class="col-3 q-px-sm"
                      align="right"
                      style="width: 120px"
                    >
                      <q-img
                        :class="
                          !vocabDataList[currentFlashcardIndex].soundSentenceUrl
                            ? 'invisible'
                            : null
                        "
                        @click="
                          $emit(
                            'playSound',
                            vocabDataList[currentFlashcardIndex]
                              .soundSentenceUrl
                          )
                        "
                        style="width: 50px"
                        src="images/flashcard/sound.png"
                        class="cursor-pointer sound-btn-flashcard"
                      ></q-img>
                    </div>
                    <div class="col q-pr-xl q-pa-xs">
                      <div class="q-px-sm">
                        <span
                          v-html="
                            vocabDataList[currentFlashcardIndex].sentenceEng ||
                            '-'
                          "
                        >
                        </span>
                      </div>
                      <div class="q-mt-xs q-px-sm">
                        <span
                          v-html="
                            vocabDataList[currentFlashcardIndex].sentenceTh ||
                            '-'
                          "
                        >
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    v-if="
                      vocabDataList[currentFlashcardIndex].extraVocab.length
                    "
                  >
                    <hr />
                    <div class="row q-px-md">
                      <div
                        class="col-6 q-mt-xs"
                        v-for="(item, index) in vocabDataList[
                          currentFlashcardIndex
                        ].extraVocab"
                        v-html="
                          `${item.vocab} (${item.partOfSpeech.partOfSpeech}) ${item.meaning}`
                        "
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 q-pa-md" align="center">
                <q-img
                  v-close-popup
                  class="cursor-pointer"
                  style="max-width: 200px; z-index: 2"
                  src="/images/close-help-btn-pc.png"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute } from "vue-router";
import { playSoundBackground } from "src/router";
import logo from "../logo-login.vue";
export default {
  props: {
    isSynchronize: {
      type: Boolean,
      default: false,
    },
    vocabDataList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    logo,
  },
  emits: ["playSound", "closeDialog"],

  setup(props) {
    // Initial
    const $q = useQuasar();
    const route = useRoute();

    // Data
    const currentFlashcardIndex = ref(0);
    const isShowDetails = ref(false);

    const tempAudio = ref(null);
    // open flashcard details card
    const openFlashcardDetails = (val, index) => {
      isShowDetails.value = true;
      currentFlashcardIndex.value = index;

      // if ($q.sessionStorage.has("isEnableSoundBackground")) {
      //   if ($q.sessionStorage.getItem("isEnableSoundBackground")) {
      //     playSoundBackground(route.name, false);
      //   }
      // }

      // if (tempAudio.value) {
      //   tempAudio.value.pause();
      // }

      // tempAudio.value = val.soundVocabUrl;
      // tempAudio.value.volume = 0.5;
      // tempAudio.value.play();

      // tempAudio.value.onended = () => {
      //   if ($q.sessionStorage.has("isEnableSoundBackground")) {
      //     if ($q.sessionStorage.getItem("isEnableSoundBackground")) {
      //       playSoundBackground(route.name, true);
      //     }
      //   }
      // };
    };

    return {
      currentFlashcardIndex: currentFlashcardIndex,
      isShowDetails: isShowDetails,
      openFlashcardDetails: openFlashcardDetails,
      tempAudio,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-header-flashcard {
  padding-top: 25px;
}

.box-dialog-details {
  max-width: 900px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  border-width: 5px;
  border-style: solid;
  border-color: #ffffff;
  box-sizing: border-box;
}

.sound-btn-flashcard:hover {
  transform: scale(0.95);
}

.border-rainbow {
  background-color: #000;
  border: double 5px transparent;
  border-image: linear-gradient(
    to right,
    #82fcfe 20%,
    #fe73f5 50%,
    #fe88e7 50%,
    #fefc80 100%
  );
  border-image-slice: 20;
  z-index: 2;
}
</style>
