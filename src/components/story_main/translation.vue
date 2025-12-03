<template>
  <div>
    <div>
      <span>{{ storyData.question.hint }}</span>
    </div>
    <div class="">
      <div class="row">
        <div
          class="button-answer"
          :class="systemStore.platform.desktop ? 'desktop' : 'mobile'"
          align="center"
          v-for="(item, index) in storyData.question.choices"
          @click="
            item.isSendAnswer
              ? null
              : storyData.func.checkAnswerTranslation(item.text, index)
          "
          :type="item.isSendAnswer ? 'correct' : 'default'"
        >
          <!--  -->
          <div>
            <span v-html="item.text"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    storyData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props) {
    const systemStore = useSystemStore();

    return {
      // Store,
      systemStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.mobile {
  margin-right: 2%;
  margin-top: 2%;
  padding: 1%;
  font-size: clamp(5%, 5vw, 16px);
}

.desktop {
  margin-right: 1%;
  margin-top: 1%;
  padding: 0.5% 1.5%;
  font-size: clamp(5%, 1vw, 20px);
}

.button-answer {
  max-width: fit-content;
  min-width: 50px;
  width: 100%;
  border-radius: 5px;
}

.button-answer[type="default"] {
  color: #4b1e0a;
  background-color: #fff;
  border: 1px solid #4b1e0a;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}

.button-answer[type="correct"] {
  color: #4b1d0a3a;
  background-color: #fff;
  border: 1px solid #4b1d0a3a;
  box-shadow: 0px 2px 1px 0px #b9b9b979;
  cursor: not-allowed;
}
</style>
