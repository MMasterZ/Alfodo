<template>
  <div
    class="animate__animated animate__fadeIn"
    style="width: 100%; color: #4a261b"
    :class="systemStore.platform.desktop ? 'q-mt-md' : 'q-mt-sm q-px-sm'"
    align="left"
  >
    <div
      class="font-mali-sb"
      :style="systemStore.platform.mobile ? '' : 'margin-bottom: 1%'"
      v-for="(item, index) in radioList"
      :key="index"
    >
      <q-radio
        name="radio"
        keep-color
        class="text-radio-button"
        :class="systemStore.platform.mobile ? 'mobile' : ''"
        color="brown-8"
        v-model="questionnaireData.selected"
        :val="item.value"
        :label="item.label"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    questionnaireData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const radioList = ref([
      {
        label: "Vocabulary (คำศัพท์)",
        value: "vocabulary",
      },
      {
        label: "Grammar (ไวยากรณ์)",
        value: "grammar",
      },
      {
        label: "Reading (การอ่าน)",
        value: "reading",
      },
      {
        label: "Writing (การเขียน)",
        value: "writing",
      },
      {
        label: "Phonics (การออกเสียง)",
        value: "phonics",
      },
      {
        label: "Listening & Speaking (การฟังและการพูด)",
        value: "listening&speaking",
      },
    ]);

    return {
      systemStore: useSystemStore(),
      radioList,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-radio-button {
  font-size: max(18px, min(24px, 1.8vw));
}

.text-radio-button.mobile {
  font-size: 14px !important;
}

.radio-color {
  background-color: #4a261b;
}
</style>
