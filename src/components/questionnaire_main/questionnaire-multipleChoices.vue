<template>
  <!-- #region Desktop -->
  <div
    class="animate__animated animate__fadeIn"
    style="color: #4a261b"
    :class="systemStore.platform.desktop ? 'q-mt-md' : 'q-mt-sm q-px-sm'"
  >
    <div
      class="font-mali-sb"
      :style="systemStore.platform.mobile ? '' : 'margin-bottom: 1%'"
      v-for="(item, index) in questionnaireData.choices"
      :key="index"
      align="left"
    >
      <q-checkbox
        v-model="questionnaireData.selected"
        class="text-checkbox"
        :class="systemStore.platform.mobile ? 'mobile' : ''"
        color="brown-8"
        keep-color
        :label="item"
        :val="item"
        :disable="funcIsDisable(item)"
        v-if="questionnaireData.isMultiAnswer"
      ></q-checkbox>

      <q-radio
        name="radio"
        keep-color
        class="text-checkbox"
        :class="systemStore.platform.mobile ? 'mobile' : ''"
        color="brown-8"
        v-model="questionnaireData.selected"
        :val="item"
        :label="item"
        v-if="!questionnaireData.isMultiAnswer"
      />
    </div>
  </div>
  <!-- #endregion -->
</template>

<script>
import { computed, ref } from "vue";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    questionnaireData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const funcIsDisable = (item) => {
      let isCheck = true;

      let questionData = props.questionnaireData;
      let numOfSelected = questionData.selected.length;
      let numOfAnswer = questionData.numOfAnswer;

      if (questionData.isMultiAnswer) {
        if (questionData.numOfAnswer == 0) {
          isCheck = false;
        } else {
          if (
            numOfSelected < numOfAnswer ||
            questionData.selected.includes(item)
          ) {
            isCheck = false;
          }
        }
      }

      return isCheck;
    };

    return {
      systemStore: useSystemStore(),

      funcIsDisable,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-checkbox {
  font-size: max(18px, min(24px, 1.8vw));
}

.text-checkbox.mobile {
  font-size: 14px !important;
}
</style>
