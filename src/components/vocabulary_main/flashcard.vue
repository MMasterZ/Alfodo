<template>
  <div class="q-mt-md">
    <!-- Desktop -->
    <div
      class="row justify-center"
      v-if="systemStore.platform.desktop && !controlFlashcardFinish"
    >
      <div
        class="col-12 q-mt-md relative-position box-practice-container"
        align="center"
      >
        <q-img
          :src="`/images/box_main/box-card-flashcard.png`"
          no-spinner
          no-transition
          v-touch-swipe.mouse="swipeMove"
        >
          <div class="transparent fit no-padding">
            <q-tab-panels
              v-model="controlFlashcardIndex"
              animated
              transition-prev="slide-right"
              transition-next="slide-left"
              class="no-padding transparent"
              style="width: 95%; height: 100%"
            >
              <q-tab-panel
                :name="index"
                v-for="(item, index) in practiceData.tempLearning"
              >
                <div class="row items-center" style="height: 100%; width: 100%">
                  <div class="row col-12 self-center">
                    <div
                      class="q-px-md row box-flashcard-image col-1 self-center"
                    >
                      <q-img
                        class="self-center"
                        style="border-radius: 10px"
                        :src="item.imageUrl"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div
                      class="
                        font-mali-b
                        col
                        self-start
                        box-scroll-bar-content
                        q-px-md
                      "
                      align="center"
                    >
                      <div align="center">
                        <span
                          class="f36"
                          v-html="
                            `${item.vocab} ${
                              item.partOfSpeech.partOfSpeech == 'ไม่ระบุ'
                                ? ''
                                : `(${item.partOfSpeech.partOfSpeech})`
                            }`
                          "
                        >
                        </span>
                        <br />
                        <div class="q-pt-sm">
                          <span
                            class="relative-position f26"
                            v-html="item.pronounce"
                          ></span>
                        </div>

                        <div class="q-pt-sm">
                          <span
                            class="relative-position f26"
                            v-html="item.meaning"
                          ></span>
                        </div>
                      </div>
                      <div class="q-pa-sm q-pt-md">
                        <q-btn
                          round
                          flat
                          @click="systemStore.playSound(item.tagAudioVocabUrl)"
                        >
                          <q-img
                            width="47px"
                            src="/images/icon_main/icon-sound-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          flat
                          class="q-mx-sm"
                          @click="
                            systemStore.playSlowSound(item.tagAudioVocabUrl)
                          "
                        >
                          <q-img
                            width="47px"
                            src="/images/icon_main/icon-slow-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          flat
                          @click="
                            systemStore.playSlowSound(item.tagAudioSpellUrl)
                          "
                        >
                          <q-img
                            width="47px"
                            src="/images/icon_main/icon-spell-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                      </div>
                      <div class="q-mt-md f20">
                        <span
                          class="text-weight-medium font-mali-m"
                          v-for="(item, index) in convertSentenceEn"
                          @click="
                            item.isMobileOpenTooltip
                              ? (item.isMobileOpenTooltip = false)
                              : (item.isMobileOpenTooltip = true)
                          "
                          @mouseleave="item.isMobileOpenTooltip = false"
                        >
                          <span
                            v-if="item.isExtra"
                            class="text-extra cursor-pointer"
                          >
                            <span v-html="item.text"></span>
                            <q-tooltip
                              v-if="item.isExtra"
                              class="transparent"
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[0, 0]"
                            >
                              <div class="f16 box-tooltip">
                                {{ item.meaning }}
                              </div>
                            </q-tooltip>
                          </span>

                          <span
                            :class="
                              item.isVocab ? 'text-bg-vocab q-mx-xs ' : ''
                            "
                            v-if="!item.isExtra"
                          >
                            <span v-html="item.text"></span>
                          </span>
                        </span>
                      </div>

                      <div class="q-mt-md q-pb-md f20">
                        <span
                          v-for="(item, index) in convertSentenceTh"
                          class="text-weight-medium font-mali-m"
                          :class="item.isMeaning ? 'text-bg-meaning' : ''"
                          v-html="item.text"
                        >
                        </span>
                      </div>

                      <div
                        class="q-pa-sm"
                        :class="systemStore.platform.desktop ? '' : 'col-12'"
                      >
                        <q-btn
                          round
                          @click="
                            systemStore.playSound(item.tagAudioSentenceUrl)
                          "
                        >
                          <q-img
                            width="47px"
                            src="/images/icon_main/icon-sound-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          class="q-mx-sm"
                          @click="
                            systemStore.playSlowSound(item.tagAudioSentenceUrl)
                          "
                        >
                          <q-img
                            width="47px"
                            src="/images/icon_main/icon-slow-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </q-img>
        <div class="absolute-center" style="top: 5px">
          <q-img
            width="170px"
            src="/images/box_main/box-flashcard-question-total.png"
          >
            <div class="fit transparent no-padding row justify-center">
              <div class="self-center text-total-question q-pt-xs f24">
                {{
                  `คำที่ ${practiceData.currentLearningIndex + 1}/${
                    practiceData.tempLearning.length
                  }`
                }}
              </div>
            </div>
          </q-img>
        </div>
      </div>

      <div
        class="col-12 q-pa-md"
        align="center"
        style="width: 1000px"
        v-if="!syncData.isSync"
      >
        <q-img
          class="q-mx-lg"
          :class="
            controlFlashcardIndex == 0
              ? 'cursor-not-allowed'
              : 'button-active cursor-pointer'
          "
          width="160px"
          :src="`/images/button_main/button-back${
            controlFlashcardIndex == 0 ? '-disable' : ''
          }.png`"
          @click="funcBackFlashcard()"
          no-spinner
          no-transition
        ></q-img>
        <q-img
          class="q-mx-lg button-active cursor-pointer"
          width="160px"
          :src="`/images/button_main/button-next.png`"
          @click="funcNextFlashcard()"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>

    <!-- Mobile -->
    <div
      v-if="systemStore.platform.mobile && !controlFlashcardFinish"
      class="row justify-center relative-position q-py-lg"
    >
      <div
        class="
          col-12
          q-mt-md
          relative-position
          box-practice-container-mobile
          q-pt-lg
        "
        align="center"
      >
        <q-img
          :src="`/images/box_main/box-card-flashcard-mobile.png`"
          no-spinner
          no-transition
        >
          <div class="transparent fit no-padding">
            <q-tab-panels
              v-model="controlFlashcardIndex"
              animated
              transition-prev="slide-right"
              transition-next="slide-left"
              class="no-padding transparent absolute-center"
              style="width: 85%; height: 90%; top: 49%"
            >
              <q-tab-panel
                :name="index"
                v-for="(item, index) in practiceData.tempLearning"
                class="q-px-xs q-pb-sm"
              >
                <div style="width: 100%; height: 100%">
                  <div class="box-scroll-bar-content-mobile">
                    <div class="q-px-md row box-flashcard-image-mobile">
                      <q-img
                        class="self-center"
                        style="border-radius: 10px"
                        :src="item.imageUrl"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div
                      class="
                        font-mali-b
                        row
                        items-center
                        justify-center
                        q-pb-md
                      "
                      align="center"
                    >
                      <div class="col-12" align="center">
                        <!-- Vocabulary -->
                        <span
                          class="text-vocab"
                          v-html="
                            `${item.vocab} ${
                              item.partOfSpeech.partOfSpeech == 'ไม่ระบุ'
                                ? ''
                                : '(' + item.partOfSpeech.partOfSpeech + ')'
                            }`
                          "
                        >
                        </span>
                        <br />
                        <!-- Pronounce : คำอ่าน -->
                        <div class="q-pt-sm">
                          <span
                            class="relative-position text-meaning"
                            v-html="item.pronounce"
                          ></span>
                        </div>

                        <!-- Meaning : คำแปล -->
                        <div class="q-pt-sm">
                          <span
                            class="relative-position text-meaning"
                            v-html="item.meaning"
                          ></span>
                        </div>
                      </div>
                      <div class="q-py-md col-12">
                        <q-btn
                          round
                          flat
                          @click="systemStore.playSound(item.tagAudioVocabUrl)"
                        >
                          <q-img
                            width="40px"
                            src="/images/icon_main/icon-sound-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          flat
                          class="q-mx-sm"
                          @click="
                            systemStore.playSlowSound(item.tagAudioVocabUrl)
                          "
                        >
                          <q-img
                            width="40px"
                            src="/images/icon_main/icon-slow-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          flat
                          @click="
                            systemStore.playSlowSound(item.tagAudioSpellUrl)
                          "
                        >
                          <q-img
                            width="40px"
                            src="/images/icon_main/icon-spell-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                      </div>
                      <div class="text-sentence col-12">
                        <span
                          class="text-weight-medium font-mali-m"
                          v-for="(item, index) in convertSentenceEn"
                          @click="
                            item.isMobileOpenTooltip
                              ? (item.isMobileOpenTooltip = false)
                              : (item.isMobileOpenTooltip = true)
                          "
                          @mouseleave="item.isMobileOpenTooltip = false"
                        >
                          <span
                            v-if="item.isExtra"
                            class="text-extra cursor-pointer"
                          >
                            <span v-html="item.text"></span>

                            <q-tooltip
                              v-if="item.isExtra"
                              v-model="item.isMobileOpenTooltip"
                              :no-parent-event="true"
                              class="transparent"
                              anchor="top middle"
                              self="bottom middle"
                              :offset="[0, 0]"
                            >
                              <div class="f16 box-tooltip">
                                <span class="text-no-wrap">
                                  {{ item.meaning }}
                                </span>
                              </div>
                            </q-tooltip>
                          </span>

                          <span
                            :class="
                              item.isVocab ? 'text-bg-vocab q-mx-xs ' : ''
                            "
                            v-if="!item.isExtra"
                          >
                            <span v-html="item.text"></span>
                          </span>
                        </span>

                        <div class="q-mt-md text-sentence">
                          <span
                            v-for="(item, index) in convertSentenceTh"
                            class="text-weight-medium font-mali-m"
                            :class="item.isMeaning ? 'text-bg-meaning' : ''"
                            v-html="item.text"
                          >
                          </span>
                        </div>
                      </div>

                      <div class="q-pa-sm col-12">
                        <q-btn
                          round
                          @click="
                            systemStore.playSound(item.tagAudioSentenceUrl)
                          "
                        >
                          <q-img
                            width="40px"
                            src="/images/icon_main/icon-sound-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn
                          round
                          class="q-mx-sm"
                          @click="
                            systemStore.playSlowSound(item.tagAudioSentenceUrl)
                          "
                        >
                          <q-img
                            width="40px"
                            src="/images/icon_main/icon-slow-audio.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </div>
        </q-img>
        <div class="absolute-center" style="top: 20px">
          <q-img
            width="100px"
            src="/images/box_main/box-flashcard-question-total.png"
          >
            <div class="fit transparent no-padding row justify-center">
              <div class="self-center text-total-question q-pt-xs f14">
                {{
                  `คำที่ ${practiceData.currentLearningIndex + 1}/${
                    practiceData.tempLearning.length
                  }`
                }}
              </div>
            </div>
          </q-img>
        </div>

        <div
          class="absolute-center"
          style="left: 5%; width: 15%"
          v-if="!syncData.isSync"
        >
          <div
            v-if="practiceData.currentLearningIndex != 0"
            @click="funcBackFlashcard()"
            style="
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              padding: 15%;
              cursor: pointer;
            "
          >
            <q-img
              no-transition
              no-spinner
              src="/images/icon_main/icon-arrow-flashcard-left.png"
            ></q-img>
          </div>
        </div>
        <div
          class="absolute-center"
          style="left: 95%; width: 15%"
          v-if="!syncData.isSync"
        >
          <div
            @click="funcNextFlashcard()"
            style="
              background-color: rgba(255, 255, 255, 0.2);
              border-radius: 50%;
              padding: 15%;
              cursor: pointer;
            "
          >
            <q-img
              no-transition
              no-spinner
              src="/images/icon_main/icon-arrow-flashcard-right.png"
            ></q-img>
          </div>
        </div>
      </div>
    </div>

    <!-- Finish -->
    <div
      class="q-pa-md"
      style="margin-top: 30px"
      v-show="controlFlashcardFinish && !controlStartPractice"
    >
      <!-- Desktop -->
      <div v-if="systemStore.platform.desktop">
        <div
          :class="
            systemStore.platform.desktop ? '' : 'box-finish-container-mobile'
          "
          class="q-px-md box-finish-container q-pa-sm"
        >
          <div
            class="q-py-lg relative-position full-width"
            style="height: 50px"
          >
            <q-img
              class="absolute-center"
              style="top: 10px; max-width: 500px; min-width: 360px; width: 100%"
              src="/images/vocabulary_main/label-finish-vocabulary.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="q-pa-md" align="center">
            <span
              class="text-new-vocab font-mali-r"
              style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3)"
            >
              {{
                `คุณได้เรียนรู้คำศัพท์ใหม่ ${practiceData.tempLearning.length} คำ`
              }}
            </span>
          </div>
          <div class="row box-finish-main">
            <div
              class="row f24 font-mali-m full-width q-pa-xs"
              style="position: sticky; top: 0; background-color: #f8ac08"
            >
              <div class="col-6 self-end q-pt-xs" align="center">
                <div class="q-mb-xs">คำศัพท์</div>
              </div>
              <div class="col-6 self-end q-px-xs q-pt-xs" align="left">
                <div class="q-mb-xs">คำแปล</div>
              </div>
            </div>

            <div class="row relative-position full-width">
              <!-- <div class="col-12" align="right" style="height: 5%">
                <div
                  class="bg-white"
                  align="center"
                  style="width: 15px; height: 100%"
                >
                  <q-img
                    width="10px"
                    src="/images/icon_main/icon-arrow-up.png"
                  ></q-img>
                </div>
              </div> -->

              <!--  -->
              <div
                class="col-12 self-center relative-position box-finish-content"
                align="center"
              >
                <div
                  class="row f20 font-mali-m"
                  v-if="
                    systemStore.platform.desktop &&
                    practiceData.tempLearning.length > 0
                  "
                >
                  <div
                    class="col-12 row"
                    v-for="(item, index) in practiceData.tempLearning"
                  >
                    <div class="col-6 self-start q-pa-sm q-pl-xl" align="left">
                      <span>{{ `${item.vocab}` }}</span>
                      <span class="q-mx-md">
                        {{ ` (${item.partOfSpeech.partOfSpeech})` }}
                      </span>
                    </div>

                    <div class="col-6 self-start q-pa-sm" align="left">
                      <span>
                        {{ item.meaning }}
                      </span>
                    </div>

                    <div
                      v-if="index + 1 != practiceData.tempLearning.length"
                      class="col-12 q-my-xs"
                      style="border: 1px dashed rgba(74, 38, 24, 0.2)"
                    ></div>
                  </div>
                </div>
                <div
                  class="row text-finish-content font-mali-m"
                  v-for="(item, index) in practiceData.tempLearning"
                  v-if="systemStore.platform.mobile"
                >
                  <div class="col-12">
                    <div class="self-start q-px-md q-py-sm" align="center">
                      <span>{{
                        `${item.vocab} (${item.partOfSpeech.partOfSpeech})`
                      }}</span>
                    </div>
                    <div class="self-start q-px-md q-pb-sm" align="center">
                      {{ item.meaning }}
                    </div>
                  </div>

                  <div
                    v-if="index + 1 != practiceData.tempLearning.length"
                    class="col-12"
                    style="border: 1px dashed rgba(74, 38, 27, 0.2)"
                  ></div>
                </div>
              </div>
              <!-- <div
                class="col-12"
                align="right"
                style="height: 5%"
                v-if="systemStore.platform.desktop"
              >
                <div
                  class="bg-white"
                  align="center"
                  style="width: 15px; height: 100%"
                >
                  <q-img
                    width="10px"
                    src="/images/icon_main/icon-arrow-down.png"
                  ></q-img>
                </div>
              </div> -->
            </div>
          </div>

          <div class="q-mt-md q-pt-sm" align="center" v-if="!syncData.isSync">
            <q-img
              style="max-width: 160px; min-width: 130px; width: 40%"
              @click="funcResetFlashcard()"
              class="cursor-pointer button-active q-mr-sm"
              src="/images/button_main/button-back.png"
              no-spinner
              no-transition
            ></q-img>
            <q-img
              style="max-width: 160px; min-width: 130px; width: 40%"
              @click="
                $emit('callback-startPractice'),
                  (practiceData.isPractice = true)
              "
              class="cursor-pointer button-active q-ml-sm"
              src="/images/button_main/button-next.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div v-else class="q-mt-xl">
        <div class="q-px-md box-finish-container-mobile">
          <div class="q-pb-xl relative-position full-width">
            <q-img
              class="absolute-center"
              style="top: 10px; max-width: 500px; min-width: 360px; width: 100%"
              src="/images/vocabulary_main/label-finish-vocabulary.png"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="q-pa-md" align="center">
            <span
              class="text-new-vocab font-mali-r"
              style="text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3)"
            >
              {{
                `คุณได้เรียนรู้คำศัพท์ใหม่ ${practiceData.tempLearning.length} คำ`
              }}
            </span>
          </div>

          <div class="row box-finish-main-mobile">
            <div class="row relative-position full-width">
              <div
                class="col-12 relative-position box-finish-content-mobile"
                align="center"
              >
                <div
                  class="row f20 font-mali-m"
                  v-if="systemStore.platform.desktop"
                >
                  <div
                    class="col-12 row"
                    v-for="(item, index) in practiceData.tempLearning"
                  >
                    <div class="col-6 self-start q-pa-sm q-pl-xl" align="left">
                      <span>{{ `${item.vocab}` }}</span>
                      <span class="q-mx-md">
                        {{ ` (${item.partOfSpeech.partOfSpeech})` }}
                      </span>
                    </div>

                    <div class="col-6 self-start q-pa-sm" align="left">
                      <span>
                        {{ item.meaning }}
                      </span>
                    </div>

                    <div
                      v-if="index + 1 != practiceData.tempLearning.length"
                      class="col-12 q-my-xs"
                      style="border: 1px dashed rgba(74, 38, 24, 0.2)"
                    ></div>
                  </div>
                </div>
                <div
                  class="row text-finish-content font-mali-m"
                  v-for="(item, index) in practiceData.tempLearning"
                  v-if="systemStore.platform.mobile"
                >
                  <div class="col-12">
                    <div class="self-start q-px-md q-py-sm" align="center">
                      <span>{{
                        `${item.vocab} (${item.partOfSpeech.partOfSpeech})`
                      }}</span>
                    </div>
                    <div class="self-start q-px-md q-pb-sm" align="center">
                      {{ item.meaning }}
                    </div>
                  </div>

                  <div
                    v-if="index + 1 != practiceData.tempLearning.length"
                    class="col-12"
                    style="border: 1px dashed rgba(74, 38, 27, 0.2)"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div
            class="q-mt-sm q-pt-sm q-pb-sm row"
            align="center"
            v-if="!syncData.isSync"
          >
            <div class="col">
              <q-img
                style="max-width: 160px; min-width: 130px; width: 40%"
                @click="funcResetFlashcard()"
                class="cursor-pointer button-active q-mr-sm"
                src="/images/button_main/button-back.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="col">
              <q-img
                style="max-width: 160px; min-width: 130px; width: 40%"
                @click="
                  $emit('callback-startPractice'),
                    (practiceData.isPractice = true)
                "
                class="cursor-pointer button-active q-ml-sm"
                src="/images/button_main/button-next.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";

export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    syncData: {
      type: Object,
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
  },
  setup(props) {
    // Initialize
    const $q = useQuasar();

    // Props Data :
    const practiceData = ref(props.practiceData);

    // Store

    const isHoverCurrentIndex = ref(null);

    const tempSentence = ref([]);
    const convertSentenceEn = computed(() => {
      tempSentence.value = [];
      let newSentence =
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .sentenceEng;

      let tempExtra =
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .extraVocab;

      if (
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .extraVocab.length
      ) {
        for (let i = 0; i < tempExtra.length; i++) {
          let regex = new RegExp(`\\b${tempExtra[i].vocab}\\b`, "gm");

          newSentence = newSentence.replace(
            regex,
            `<span class="veoxctarba">${tempExtra[i].vocab}</span>`
          );
        }
      }

      let regex = new RegExp(
        /(?:<s*strong>(.*?)<s*\/strong>)|(?:<s*b>(.*?)<s*\/b>)|(?:<s*span class="veoxctarba">(.*?)<s*\/span>)/gi
      );

      let tempSplit = newSentence
        .split(regex)
        .filter((x) => x != "" && x != " " && x != undefined);

      if (tempSplit.length) {
        for (let i = 0; i < tempSplit.length; i++) {
          let removeTag = tempSplit[i];

          let findMatchTagU = removeTag.match(/(<s*u>(.*?)<s*\/u>)/g) || [];

          if (findMatchTagU.length) {
            findMatchTagU = findMatchTagU[0];
          }

          let newData = {
            text: "",
            meaning: "",
            isExtra: false,
            isVocab: false,
            isMobileOpenTooltip: false,
            isOperator: false,
          };

          if (findMatchTagU.length) {
            newData.isVocab = true;
          }

          if (tempSplit[i] == ".") {
            newData.isOperator = true;
          }

          let findExtra = tempExtra.filter((x) => x.vocab == removeTag);

          if (findExtra.length) {
            newData.meaning =
              findExtra[0].meaning +
              `${
                findExtra[0].partOfSpeech.partOfSpeech == "ไม่ระบุ"
                  ? ""
                  : ` (${findExtra[0].partOfSpeech.partOfSpeech})`
              }`;
            newData.isExtra = true;
            newData.isMobileOpenTooltip = false;
            newData.text = ` ${removeTag}`;
          } else {
            removeTag = removeTag.replace(/<s*u>/g, "").replace(/<s*\/u>/g, "");
            newData.text = removeTag;
          }

          tempSentence.value.push(newData);
        }
      }

      return tempSentence.value;
    });

    const convertSentenceTh = computed(() => {
      let sentenceTh =
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .sentenceTh;

      let reg = new RegExp(/<s*u>(.*?)<s*\/u>/gi);

      let findTag = sentenceTh.match(reg) || [];

      let tempTag = sentenceTh.split(reg) || [];

      let tempSentence = [];

      for (let i = 0; i < tempTag.length; i++) {
        let newData = {
          text: tempTag[i],
          isMeaning: false,
        };

        if (findTag.length) {
          for (let ii = 0; ii < findTag.length; ii++) {
            let removeTag = findTag[ii]

              .replace(/<s*u>/g, "")
              .replace(/<s*\/u>/g, "");

            if (removeTag == tempTag[i]) {
              newData.isMeaning = true;
            }
          }
        }

        tempSentence.push(newData);
      }

      return tempSentence;
    });

    const funcNextFlashcard = () => {
      if (
        practiceData.value.currentLearningIndex + 1 !=
        practiceData.value.tempLearning.length
      ) {
        practiceData.value.currentLearningIndex++;
      } else {
        practiceData.value.isFinishFlashcard = true;
        return;
      }

      props.systemStore.playSound(
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .tagAudioVocabUrl
      );
    };

    const funcBackFlashcard = () => {
      if (practiceData.value.currentLearningIndex == 0) return;
      else practiceData.value.currentLearningIndex--;

      props.systemStore.playSound(
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .tagAudioVocabUrl
      );
    };

    const funcResetFlashcard = () => {
      practiceData.value.isFinishFlashcard = false;
      practiceData.value.currentLearningIndex = 0;
    };

    const swipeMove = (e) => {
      if (props.syncData.isSync) {
        return;
      }

      if (
        practiceData.value.currentLearningIndex + 1 ==
        practiceData.value.tempLearning.length
      ) {
        practiceData.value.isFinishFlashcard = true;
        return;
      }

      if (e.direction == "left") {
        if (
          practiceData.value.currentLearningIndex !=
          practiceData.value.tempLearning.length
        ) {
          practiceData.value.currentLearningIndex++;
        }
      }

      if (e.direction == "right") {
        if (practiceData.value.currentLearningIndex != 0) {
          practiceData.value.currentLearningIndex--;
        }
      }

      props.systemStore.playSound(
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .tagAudioVocabUrl
      );
    };

    const controlFlashcardIndex = computed(() => {
      if (props.syncData.isSync) {
        if (props.syncData.lesson.isFinish) {
          props.practiceData.isFinishLearning = true;
        }

        if (props.syncData.lesson.currentLessonIndex >= 0) {
          props.practiceData.currentLearningIndex =
            props.syncData.lesson.currentLessonIndex;

          props.systemStore.playSound(
            practiceData.value.tempLearning[
              props.syncData.lesson.currentLessonIndex
            ].tagAudioVocabUrl
          );
        }
        return props.syncData.lesson.currentLessonIndex;
      } else return practiceData.value.currentLearningIndex;
    });

    const controlFlashcardFinish = computed(() => {
      if (props.syncData.isSync) {
        return props.syncData.lesson.isFinish;
      } else return practiceData.value.isFinishFlashcard;
    });

    const controlStartPractice = computed(() => {
      if (props.syncData.isSync) {
        return props.syncData.lesson.isStartReview;
      } else {
        if (!practiceData.value.isPractice) {
          return false;
        } else {
          return true;
        }
      }
    });

    onMounted(() => {
      if (props.syncData.isSync) {
        if (
          props.syncData.lesson.isStartReview ||
          props.syncData.lesson.isFinish
        ) {
          return;
        }
      } else {
        props.systemStore.playSound(
          practiceData.value.tempLearning[controlFlashcardIndex.value]
            .tagAudioVocabUrl
        );
      }
    });

    return {
      // Function
      funcNextFlashcard,
      funcBackFlashcard,
      funcResetFlashcard,
      swipeMove,

      // Computed
      convertSentenceEn,
      convertSentenceTh,

      // Boolean
      isHoverCurrentIndex,

      // Control Mode
      controlFlashcardIndex,
      controlFlashcardFinish,
      controlStartPractice,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-practice-container {
  max-width: 1100px;
  margin: auto;
}

.box-practice-container-mobile {
  max-width: 500px;
  min-width: 300px;
  margin: auto;
}

.box-flashcard-image {
  max-width: 320px;
  width: 100%;
  height: 320px;
  border: 10px solid #1fd7df;
  border-radius: 20px;
  background-color: #fff;
}

.box-flashcard-image-mobile {
  max-width: 250px;
  min-width: 150px;
}

// First Flashcard Stage
.box-scroll-bar-content {
  height: 100%;
  overflow-y: auto;
}

.box-scroll-bar-content::-webkit-scrollbar {
  width: 15px;
}

.box-scroll-bar-content::-webkit-scrollbar-thumb {
  background-color: #20dae3;
  border-radius: 8px;
  border: 2px solid #4a261b;
}

.box-scroll-bar-content::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 2px solid #4a261b;
}

.box-scroll-bar-content-mobile {
  height: 100%;
  overflow-y: auto;
}

.box-scroll-bar-content-mobile::-webkit-scrollbar {
  width: 7px;
}

.box-scroll-bar-content-mobile::-webkit-scrollbar-thumb {
  background-color: #20dae3;
  border-radius: 8px;
  border: 2px solid #4a261b;
}

.box-scroll-bar-content-mobile::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  border: 2px solid #4a261b;
}

.text-extra {
  color: #20d4df;
}

.box-tooltip {
  background-color: #20d4df;
  border-radius: 20px;
  color: #011440;
  font-weight: bold;
  padding: 5px 7px;
}

.box-progress-bar {
  position: relative;
  width: 100%;
  background-color: rgba(200, 192, 192, 0.5);
  box-shadow: inset 0px 0px 10px 3px rgba(0, 0, 0, 0.4);
  border-radius: 40px;
  padding: 2px;
}

.progress-bar {
  background-color: #f4a814;
  height: 20px;
  border-radius: 50px;
  background-image: repeating-linear-gradient(
    40deg,
    transparent,
    transparent 7px,
    #f1c40f 0px,
    #f1c40f 20px
  );
  transition: width 1s;
}

.animation-airplane {
  transition: left 1s;
}

.box-current-question {
  min-width: fit-conntent;
  max-width: 50px;
  background-color: #fec527;
  border-radius: 30px;
  padding: 5px;
  box-shadow: 0px 1px 1px 1px #f4a814;
}

// Finish Flashcard Stage
.box-finish-container {
  position: relative;
  max-width: 800px;
  min-width: 300px;
  background-color: #fff4d4;
  border: 10px solid #f9bf0d;
  border-radius: 20px;
  box-shadow: 0px 0px 0px 3px #744213;
  margin: auto;
}

.box-finish-container-mobile {
  position: relative;
  max-width: 600px;
  min-width: 320px;
  height: fit-content;
  background-color: #fff4d4;
  border: 10px solid #f9bf0d;
  border-radius: 20px;
  box-shadow: 0px 0px 0px 3px #744213;
  margin: auto;
}

.box-finish-main {
  width: 100%;
  background-color: #f3e0c2;
  border-radius: 20px;
  box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  margin: auto;
  overflow: hidden;
}

.box-finish-main-mobile {
  width: 100%;
  height: 350px;
  background-color: #f3e0c2;
  border-radius: 20px;
  box-shadow: inset 0px 0px 5px 2px rgba(0, 0, 0, 0.2);
  margin: auto;
  overflow: auto;
}

.box-finish-content {
  height: 100%;
  overflow-y: auto;
}

.box-finish-content::-webkit-scrollbar {
  width: 15px;
  background-color: #fff;
  padding: 20px 0px;
}

.box-finish-content::-webkit-scrollbar-thumb {
  background-color: #f8ac08;
  border: 3px solid #fff;
  border-radius: 50px;
  // box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
}

.box-finish-content::-webkit-scrollbar-track {
  border-radius: 8px;
}

.box-finish-content-mobile {
  width: 100%;
  overflow-y: auto;
}

.box-finish-content-mobile::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
  padding: 20px 0px;
}

.box-finish-content-mobile::-webkit-scrollbar-thumb {
  background-color: #f8ac08;
  border: 2px solid #fff;
  border-radius: 50px;
  // box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.3);
}

.text-vocab {
  font-size: clamp(24px, 7.5vw, 36px);
}

.text-meaning {
  font-size: clamp(20px, 5.5vw, 26px);
}

.text-sentence {
  font-size: clamp(16px, 5vw, 20px);
}

.text-new-vocab {
  font-size: clamp(16px, 4vw, 24px);
}
.text-finish-content {
  font-size: clamp(14px, 3vw, 20px);
}

.text-total-question {
  color: #031740;
  font-family: mali-b;
}

.text-bg-vocab,
.text-bg-meaning {
  background-color: rgba(32, 218, 227, 0.5);
  padding: 0px 0px;
  text-decoration: none;
}
</style>
