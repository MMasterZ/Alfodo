<template>
  <div>
    <flashcard-desktop
      :flashcard="flashcardData"
      :syncData="syncData"
      v-if="systemStore.platform.desktop"
      @callback-next="funcNextFlashcard()"
      @callback-back="funcBackFlashcard()"
    ></flashcard-desktop>
    <!-- <flashcard-mobile v-if="systemStore.platform.mobile"></flashcard-mobile> -->
    <div class="q-pa-md text-amber f36">
      {{ flashcardData }}
    </div>
  </div>
</template>

<script>
import flashcardDesktop from "components/vocabulary_main/flashcard-desktop.vue";
import flashcardMobile from "components/vocabulary_main/flashcard-mobile.vue";
import { useSystemStore } from "src/stores/system";
import { reactive, ref } from "@vue/reactivity";
import { computed, onMounted } from "@vue/runtime-core";
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
  },

  components: {
    flashcardDesktop,
    flashcardMobile,
  },

  setup(props) {
    // Props Data :
    const practiceData = ref(props.practiceData);

    // Store
    const systemStore = useSystemStore();

    const flashcardData = reactive({
      vocab: computed(
        () => practiceData.value.tempLearning[currentLearningIndex.value].vocab
      ),
      meaning: computed(
        () =>
          practiceData.value.tempLearning[currentLearningIndex.value].meaning
      ),
      sentenceEng: computed(() => {
        let newSentence =
          practiceData.value.tempLearning[currentLearningIndex.value]
            .sentenceEng;

        let tempExtra =
          practiceData.value.tempLearning[currentLearningIndex.value]
            .extraVocab;

        let tempSentence = [];

        if (
          practiceData.value.tempLearning[currentLearningIndex.value].extraVocab
            .length
        ) {
          for (let i = 0; i < tempExtra.length; i++) {
            let regex = new RegExp(`\\b${tempExtra[i].vocab}\\b`, "gm");

            newSentence = newSentence.replace(
              regex,
              `<span class="veoxctarba">${tempExtra[i].vocab}</span>`
            );
          }
        }

        let regex = new RegExp(/<s*span class=\"veoxctarba\">(.*?)<s*\/span>/);

        let tempSplit = newSentence
          .split(regex)
          .filter((x) => x != "" && x != " " && x != undefined);

        if (tempSplit.length) {
          for (let i = 0; i < tempSplit.length; i++) {
            let removeTag = tempSplit[i]
              .replace(/<s*span class="veoxctarba">/, " ")
              .replace(/<s*\/span>/, " ");

            let newData = {
              text: "",
              meaning: "",
              isExtra: false,
            };

            let findExtra = tempExtra.filter((x) => x.vocab == removeTag);

            if (findExtra.length) {
              newData.meaning =
                findExtra[0].meaning +
                `${
                  findExtra[0].partOfSpeech.partOfSpeech == "ไม่ระบุ"
                    ? ""
                    : " (" + findExtra[0].partOfSpeech.partOfSpeech + ") "
                }`;
              newData.isExtra = true;
              newData.text = ` ${removeTag}`;
            } else {
              newData.text = tempSplit[i];
            }

            tempSentence.push(newData);
          }
        }

        return tempSentence;
      }),
      sentenceTh: "",
    });

    const currentLearningIndex = ref(0);
    const isHoverCurrentIndex = ref(null);

    const convertSentence = computed(() => {
      let newSentence =
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .sentenceEng;

      let tempExtra =
        practiceData.value.tempLearning[practiceData.value.currentLearningIndex]
          .extraVocab;
      let tempSentence = [];

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

      let regex = new RegExp(/<s*span class=\"veoxctarba\">(.*?)<s*\/span>/);

      let tempSplit = newSentence
        .split(regex)
        .filter((x) => x != "" && x != " " && x != undefined);

      if (tempSplit.length) {
        for (let i = 0; i < tempSplit.length; i++) {
          let removeTag = tempSplit[i]
            .replace(/<s*span class="veoxctarba">/, " ")
            .replace(/<s*\/span>/, " ");

          let newData = {
            text: "",
            meaning: "",
            isExtra: false,
          };

          let findExtra = tempExtra.filter((x) => x.vocab == removeTag);

          if (findExtra.length) {
            newData.meaning =
              findExtra[0].meaning +
              `${
                findExtra[0].partOfSpeech.partOfSpeech == "ไม่ระบุ"
                  ? ""
                  : " (" + findExtra[0].partOfSpeech.partOfSpeech + ") "
              }`;
            newData.isExtra = true;
            newData.text = ` ${removeTag}`;
          } else {
            newData.text = tempSplit[i];
          }

          tempSentence.push(newData);
        }
      }

      return tempSentence;
    });

    const funcNextFlashcard = () => {
      if (
        currentLearningIndex.value + 1 !=
        practiceData.value.tempLearning.length
      ) {
        if (
          currentLearningIndex.value >= practiceData.value.currentLearningIndex
        ) {
          practiceData.value.currentLearningIndex++;
        }

        currentLearningIndex.value++;
      } else {
        practiceData.value.isFinishFlashcard = true;
        return;
      }

      systemStore.playSound(
        practiceData.value.tempLearning[currentLearningIndex.value]
          .tagAudioVocabUrl
      );
    };

    const funcBackFlashcard = () => {
      if (currentLearningIndex.value == 0) return;
      else currentLearningIndex.value--;

      systemStore.playSound(
        practiceData.value.tempLearning[currentLearningIndex.value]
          .tagAudioVocabUrl
      );
    };

    const funcResetFlashcard = () => {
      practiceData.value.isFinishFlashcard = false;
      practiceData.value.currentLearningIndex = 0;
      currentLearningIndex.value = 0;
      isLastFlashcard = false;
    };

    let isLastFlashcard = false;
    const swipeMove = (e) => {
      if (isLastFlashcard) {
        practiceData.value.isFinishFlashcard = true;
      }

      if (
        practiceData.value.currentLearningIndex + 1 ==
        practiceData.value.tempLearning.length
      ) {
        isLastFlashcard = true;
      }
    };

    const controlFlashcardIndex = computed(() => {
      if (props.syncData.isSync) {
        if (props.syncData.lesson.isFinish) {
          props.practiceData.isFinishLearning = true;
        }

        if (props.syncData.lesson.currentLessonIndex) {
          props.practiceData.currentLearningIndex =
            props.syncData.lesson.currentLessonIndex;

          systemStore.playSound(
            practiceData.value.tempLearning[
              props.syncData.lesson.currentLessonIndex
            ].tagAudioVocabUrl
          );
        }
        return props.syncData.lesson.currentLessonIndex;
      } else return currentLearningIndex.value;
    });

    const controlFlashcardFinish = computed(() => {
      if (props.syncData.isSync) {
        return props.syncData.lesson.isFinish;
      } else return practiceData.value.isFinishFlashcard;
    });

    const controlStartPractice = computed(() => {
      if (props.syncData.isSync) {
        return props.syncData.lesson.isStartReview;
      } else return practiceData.value.isDirection;
    });

    onMounted(() => {
      if (props.syncData.isSync && props.syncData.lesson.isStartReview) return;

      systemStore.playSound(
        practiceData.value.tempLearning[controlFlashcardIndex.value]
          .tagAudioVocabUrl
      );
    });

    return {
      // Store
      systemStore,

      // Data
      flashcardData,
      currentLearningIndex,

      // Function
      funcNextFlashcard,
      funcBackFlashcard,
      funcResetFlashcard,
      swipeMove,

      // Computed
      convertSentence,

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
</style>
