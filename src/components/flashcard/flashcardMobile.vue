<template>
  <div class="box-container-main">
    <!-- Self Learning -->
    <div v-if="!isSynchronize">
      <div
        @click="!isShowDialog ? openDialog(item, index) : null"
        v-ripple
        class="relative-position row cursor-pointer border-rainbow-bottom"
        style="z-index: 2"
        v-for="(item, index) in vocabDataList"
        :key="index"
      >
        <div class="col-3" style="width: 100px">
          <q-img :src="item.imageSentenceUrl"></q-img>
        </div>
        <div class="col self-center q-px-md text-white">
          <span style="font-size: 24px"> {{ item.vocab }} </span>
          <div class="q-mt-sm f16">
            <span>{{ item.meaning }}</span>
          </div>
        </div>
        <div class="col-1 self-center">
          <q-icon
            name="fas fa-chevron-right"
            class="text-grey-5"
            size="24px"
          ></q-icon>
        </div>
      </div>
      <div class="relative-position q-pa-md" align="center">
        <q-img--
          @click="$router.replace('/practice/unit')"
          class="cursor-pointer relative-position"
          style="width: 200px; z-index: 2"
          src="/images/flashcard/btn-back.png"
        ></q-img-->
      </div>
    </div>

    <!-- Synchronize -->
    <div v-else class="relative-position" style="z-index: 2">
      <div class="row q-pa-md justify-center" v-if="vocabDataList.length">
        <div class="col-12" align="center">
          <q-img
            style="max-width: 400px; width: 100%"
            contain
            :src="vocabDataList[0].imageSentenceUrl"
          ></q-img>
        </div>
        <div
          class="col-12 f18 text-white border-rainbow q-mt-lg q-py-md"
          align="center"
        >
          <span class="f36" v-html="vocabDataList[0].vocab"> </span>
          <span class="q-mx-sm"
            >( {{ vocabDataList[0].partOfSpeech.partOfSpeech }} )</span
          >
          <br />
          <div class="q-my-md">
            <span v-html="vocabDataList[0].readingWord"></span>
          </div>
          <div>
            <span v-html="vocabDataList[0].meaning"></span>
          </div>
        </div>
      </div>

      <div style="height: calc(100vh - 50px)" v-else>
        <div class="absolute-center full-width" align="center">
          <logo></logo>
          <div>
            <span class="f16 text-white"
              ><q-spinner-dots color="primary" size="2em" />
              รอคุณครูเลือกการ์ดสักครู่
              <q-spinner-dots color="primary" size="2em"
            /></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog For Self Learning -->
    <q-dialog
      maximized
      v-model="showDialog"
      transition-show="slide-left"
      transition-hide="slide-right"
    >
      <q-card class="shadow-0 bg-dialog text-white">
        <q-card-section class="no-padding">
          <div class="box-dialog q-pa-md" style="font-size: 14px">
            <div class="row">
              <div class="col self-center">
                <span
                  ><span style="font-size: 22px; line-height: 0">
                    {{ vocabDataList[currentFlashcardIndex].vocab }}
                  </span>
                  <span
                    class="relative-position q-mx-sm"
                    style="font-size: 12px"
                    >({{
                      vocabDataList[currentFlashcardIndex].partOfSpeech
                        .partOfSpeech
                    }})</span
                  ></span
                >
              </div>
              <div style="width: 100px" align="right">
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
            </div>
            <div class="q-mt-sm">
              <span
                v-html="vocabDataList[currentFlashcardIndex].readingWord"
              ></span>
            </div>
            <div class="q-mt-md">
              <span v-html="vocabDataList[currentFlashcardIndex].meaning">
              </span>
            </div>
            <div align="center" class="q-pa-md q-my-md">
              <div
                class=""
                style="
                  max-width: 350px;
                  width: 50%;
                  border: 2px solid #752123;
                  background-color: #752123;
                "
              >
                <q-img
                  :src="vocabDataList[currentFlashcardIndex].imageSentenceUrl"
                ></q-img>
              </div>
            </div>
            <div class="q-mt-md row q-py-sm">
              <div class="col">
                <span v-html="vocabDataList[currentFlashcardIndex].sentenceEng">
                </span>
              </div>
              <div class="col-2" align="right" style="width: 70px">
                <q-img
                  :class="
                    !vocabDataList[currentFlashcardIndex].soundSentenceUrl
                      ? 'invisible'
                      : null
                  "
                  @click="
                    $emit(
                      'playSound',
                      vocabDataList[currentFlashcardIndex].soundSentenceUrl
                    )
                  "
                  style="width: 50px"
                  src="images/flashcard/sound.png"
                  class="cursor-pointer sound-btn-flashcard"
                ></q-img>
              </div>
            </div>
            <div class="q-my-md">
              <span v-html="vocabDataList[currentFlashcardIndex].sentenceTh">
              </span>
            </div>

            <div v-if="vocabDataList[currentFlashcardIndex].extraVocab.length">
              <hr />
              <div class="row">
                <div
                  class="col-12 q-mt-xs"
                  v-for="(item, index) in vocabDataList[currentFlashcardIndex]
                    .extraVocab"
                  v-html="
                    `${item.vocab} (${item.partOfSpeech.partOfSpeech}) ${item.meaning}`
                  "
                ></div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import logo from "../logo-login.vue";
export default {
  props: ["vocabDataList", "isShowDialogFlashcard", "isSynchronize"],
  components: {
    logo,
  },
  setup(props, { emit }) {
    const currentFlashcardIndex = ref(0);

    const showDialog = computed(() => {
      if (props.isShowDialogFlashcard) {
        return true;
      } else {
        isShowDialog.value = false;
        return false;
      }
    });

    // Dialog Flashcard
    const isShowDialog = ref(props.isShowDialogFlashcard);
    const tempAudio = ref("");
    const openDialog = (val, index) => {
      isShowDialog.value = true;
      currentFlashcardIndex.value = index;

      emit("playSound", val.soundVocabUrl);
      emit("showDialogFlashcard");
    };

    return {
      isShowDialog,
      showDialog,
      openDialog,
      currentFlashcardIndex,
      // showFlashcardDetails,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-dialog {
  margin-top: 50px;
}

.bg-dialog {
  background-color: #0e1233;
}

.border-rainbow-bottom {
  background-color: transparent;
  border-bottom: double 2px transparent;
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

.border-rainbow {
  max-width: 400px;
  width: 100%;
  background-color: #000;
  border: double 2px transparent;
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
