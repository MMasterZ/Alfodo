<template>
  <div class="">
    <div
      class="box-question"
      :type="systemStore.platform.desktop ? 'desktop' : 'mobile'"
    >
      <div align="center" class="q-pb-xs">
        <span
          class="text-header"
          :type="systemStore.platform.desktop ? 'desktop' : 'mobile'"
          >Question</span
        >
      </div>
      <div
        class="box-content"
        :type="systemStore.platform.desktop ? 'desktop' : 'mobile'"
      >
        <div class="row fit" align="left">
          <span
            v-for="(item, index) in storyData.question.question"
            :class="item.isNewLine ? 'col-12 ' : 'width-fit'"
            :style="item.isNewLine ? 'height:10px;' : ''"
          >
            <div v-if="item.isAnswer" align="center" class="answer font-mali-m">
              <span class="text-correct" v-if="item.isCorrectAnswer">{{
                item.text
              }}</span>
            </div>
            <div v-html="item.text" v-else></div>
          </span>
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
      systemStore,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-question {
  position: relative;
  background-color: #ba6f4d;
  border: 2px solid #4b1e0a;
  padding: 0.5%;
  border-radius: 10px;
  margin: auto;
  z-index: 3;
}

.box-question[type="desktop"] {
  width: 40%;
}

.box-question[type="mobile"] {
  width: 90%;
}

.text-header {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
}

.text-header[type="desktop"] {
  font-size: clamp(50%, 1.5vw, 20px);
}
.text-header[type="mobile"] {
  font-size: clamp(50%, 5vw, 16px);
}

.box-content {
  font-size: clamp(5%, 5vw, 14px);
  background-color: #fff2e5;
  border-radius: 5px;
  padding: 2% 3%;
}

.box-content[type="desktop"] {
  font-size: clamp(50%, 1.5vw, 18px);
}
.box-content[type="mobile"] {
  font-size: clamp(50%, 5vw, 16px);
}

.answer {
  max-width: fit-content;
  min-width: 50px;
  height: 25px;
  border-bottom: 1px solid #c0a275;
  margin: 0px 5px;
}

.text-correct {
  color: #48cd5e;
}
</style>
