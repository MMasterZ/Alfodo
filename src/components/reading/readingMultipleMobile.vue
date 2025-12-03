<template>
  <div class="background-main">
    <div class="bg-white" style="position: sticky; top: 50px; z-index: 2">
      <div class="relative-position bg-white box-header">
        <header-bar
          :practiceData="practiceData"
          :setFontSize="fontSize"
          @callback-resize="(val) => (fontSize = val)"
        ></header-bar>
      </div>
    </div>

    <div class="box-content q-mb-md">
      <div class="relative-position q-py-sm" align="center">
        <q-img src="/images/reading/title-board.png" style="width: 95%; max-width: 400px">
          <div align="center" class="absolute-center transparent" style="width: 100%">
            <span class="f16">{{ practiceData.titleEng }} </span>
          </div>
        </q-img>
      </div>

      <div align="center" class="q-mt-md">
        <q-img style="max-width: 650px; width: 90%" :src="practiceData.imageURL"></q-img>
      </div>
      <div class="q-py-md q-px-sm box-sound" style="max-width: 400px; width: 90%">
        <audio
          :src="practiceData.soundURL"
          controls
          controlsList="nodownload"
          @play="$emit('callback-playsound', true)"
          @pause="$emit('callback-playsound', false)"
        ></audio>
      </div>
      <div class="q-mt-sm q-pa-md" align="left" v-if="practiceData.isSendAnswer">
        <span :style="`font-size:${fontSize}px;`">
          <span v-html="highLightText"></span>
        </span>
      </div>
      <div class="q-mt-sm q-pa-md" align="left" v-else>
        <span
          :style="`font-size:${fontSize}px;`"
          v-for="(item, index) in practiceData.ReadingExtraContent"
        >
          <span
            v-html="item.text"
            :class="
              item.answer == ','
                ? 'text-black '
                : item.isExtra
                ? 'text-blue-5 cursor-pointer'
                : 'text-black '
            "
            @mouseenter="(isShowTooltip = true), (currentIndexTooltip = index)"
            @mouseleave="(isShowTooltip = false), (currentIndexTooltip = null)"
          ></span>
          <q-tooltip
            anchor="top middle"
            self="bottom middle"
            :offset="[0, 0]"
            class="transparent"
            v-if="item.isExtra && currentIndexTooltip == index"
            v-model="isShowTooltip"
            transition-show="rotate"
            transition-hide="rotate"
          >
            <div
              class="q-pa-xs q-px-md"
              style="background-color: #0082ba; border-radius: 50px"
            >
              <span class="f16" v-html="item.meaning"> </span>
            </div>
          </q-tooltip>
        </span>
      </div>

      <div
        class="q-pa-sm q-pb-md box-content-text"
        :style="`font-size:${fontSize}px;`"
        v-if="practiceData.isShowContent"
      >
        <div align="center" class="q-pb-md">
          <span v-html="practiceData.titleTh"></span>
        </div>
        <div align="left">
          <span v-html="practiceData.contentTh"></span>
        </div>
      </div>
    </div>

    <div
      class="relative-position box-question q-pa-md f16 row justify-center items-center"
      v-if="!practiceData.isShowContent"
    >
      <span class="f16" v-html="practiceData.question"></span>
    </div>
    <div class="box-answer q-pa-sm">
      <div v-if="!practiceData.isShowContent">
        <div
          class="q-pa-sm cursor-pointer"
          v-for="(item, index) in practiceData.choices"
          @mouseenter="
            practiceData.isSendAnswer
              ? null
              : (practiceData.currentChoiceIndex = item.index)
          "
          @mouseleave="
            practiceData.isSendAnswer ? null : (practiceData.currentChoiceIndex = null)
          "
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
            :index="index"
          ></multiplechoice-btn>
        </div>
      </div>

      <div
        class="q-my-md relative-position"
        align="center"
        v-if="practiceData.isShowContent"
      >
        <div>
          <q-img
            class="cursor-pointer"
            width="200px"
            src="/images/finish-btn.png"
            @click="$emit('callback-finishpractice')"
          ></q-img>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    headerBar,
    multiplechoiceBtn,
  },
  setup(props) {
    const fontSize = ref(14);

    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const currentIndexTooltip = ref(null);
    const isShowTooltip = ref(false);

    // Highlight Text In Content
    const highLightText = computed(() => {
      let content = props.practiceData.contentEng;
      if (props.practiceData.isSendAnswer) {
        let highLight = props.practiceData.refs;

        highLight.forEach((element) => {
          content = content.replace(
            element,
            `<span style='background-color:rgba(255,170,46,0.3)'>${element}</span>`
          );
        });
        return content;
      } else {
        return content;
      }
    });

    return {
      isShowTooltip,
      fontSize,
      currentIndexTooltip,
      highLightText,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-main {
  max-width: 1000px;
  min-width: 300px;
  width: 100%;
  background-image: url("/images/reading/background-reading-multiple-2.png");
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  margin: auto;
}

.box-header {
  position: sticky;
  top: 50px;
}

.box-question {
  max-width: 500px;
  width: 100%;
  min-height: 100px;
  max-height: fit-content;
  background-color: #fff;
  box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.2);
  margin: auto;
  z-index: 2;
}

.box-answer {
  max-width: 500px;
  width: 100%;
  margin: auto;
}

.box-content {
  background-color: #fffcf6;
}

.box-content-text {
  max-width: 800px;
  width: 100%;
  margin: auto;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

audio {
  width: 100%;
  outline: none;
  height: 25px;
}

.box-sound {
  max-width: 320px;
  width: 100%;
  margin: auto;
}
</style>
