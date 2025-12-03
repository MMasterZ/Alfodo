<template>
  <div class="row bg-reading">
    <div class="col-12 relative-position" align="center">
      <div class="relative-position" style="position: sticky; top: 50px; z-index: 2">
        <div class="relative-position">
          <header-bar
            :practiceData="practiceData"
            :setFontSize="fontSize"
            @callback-resize="(val) => (fontSize = val)"
            class="relative-position"
          ></header-bar>
        </div>
      </div>

      <div class="relative-position" align="center" style="margin-top: -55px; z-index: 1">
        <q-img
          src="/images/reading/title-board.png"
          style="width: 100%; max-width: 500px"
        >
          <div align="center" class="absolute-center transparent" style="width: 100%">
            <span class="f24">{{ practiceData.titleEng }} </span>
          </div>
        </q-img>
      </div>

      <div class="box-content relative-position q-my-md">
        <div class="bg-white q-pa-md" style="width: 100%; border-radius: 5px">
          <div align="center">
            <q-img
              style="max-width: 650px; width: 100%"
              :src="practiceData.imageURL"
            ></q-img>
          </div>
          <div class="q-pa-md">
            <audio
              :src="practiceData.soundURL"
              controls
              controlsList="nodownload"
              @play="$emit('callback-playsound', true)"
              @pause="$emit('callback-playsound', false)"
              style="width: 650px"
            ></audio>
          </div>
          <div class="q-mt-sm" align="left" v-if="practiceData.isSendAnswer">
            <span :style="`font-size:${fontSize}px;`">
              <span v-html="highLightText"></span>
            </span>
          </div>
          <div class="q-mt-sm" align="left" v-else>
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
            class="q-pt-md"
            :style="`font-size:${fontSize}px;`"
            v-if="practiceData.isShowContent"
          >
            <div algin="center">
              <span v-html="practiceData.titleTh"></span>
            </div>
            <div class="q-mt-md" align="left">
              <span v-html="practiceData.contentTh"></span>
            </div>
          </div>
        </div>

        <div class="q-my-md relative-position" v-if="!practiceData.isShowContent">
          <div class="box-question q-pa-md">
            <span class="f20" v-html="practiceData.question"></span>
          </div>

          <div class="q-mt-md box-content-main row">
            <div
              class="col-6 q-pa-sm cursor-pointer"
              v-for="(item, index) in practiceData.choices"
              @mouseenter="
                practiceData.isSendAnswer
                  ? null
                  : (practiceData.currentChoiceIndex = item.index)
              "
              @mouseleave="
                practiceData.isSendAnswer
                  ? null
                  : (practiceData.currentChoiceIndex = null)
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
              ></multiplechoice-btn>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="q-my-md relative-position" v-if="practiceData.isShowContent">
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
  </div>
</template>

<script>
import multiplechoiceBtn from "../../components/button/multipleChoicesBtn.vue";
import headerBar from "../header-time-progress.vue";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default {
  components: {
    headerBar,
    multiplechoiceBtn,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["callback-finishpractice", "callback-sendanswer", "callback-playsound"],
  setup(props) {
    const fontSize = ref(16);

    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const isShowTooltip = ref(false);
    const currentIndexTooltip = ref(null);

    // Highlight Text In Content
    const highLightText = computed(() => {
      let content = props.practiceData.contentEng;
      if (props.practiceData.isSendAnswer) {
        let highLight = props.practiceData.refs;

        for (let i = 0; i < highLight.length; i++) {
          content = content
            .replace(/&nbsp;/g, " ")
            .replace(
              highLight[i],
              `<span style='background-color:rgba(255,170,46,0.3)'>${highLight[i]}</span>`
            );
        }

        return content;
      } else {
        return content;
      }
    });

    return {
      fontSize,
      highLightText,
      isShowTooltip,
      currentIndexTooltip,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-reading {
  background-image: url("/images/reading/background-reading-multiple-2.png");
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  background-color: #ad4919;
}

.box-question {
  max-width: 1000px;
  width: 90%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 7px 1px rgba(0, 0, 0, 0.2);
}

.box-container-content {
  max-width: 1000px;
  width: 100%;
}

.box-content-main {
  max-width: 1000px;
  width: 90%;
}

.box-container-reading {
  max-width: 1000px;
}

.box-content {
  max-width: 1000px;
  width: 100%;
  border: 7px solid #cbb6e3;
  border-radius: 7px;
  background-color: #cbb6e3;
}

.bg-button {
  background-color: #6d4300;
  border: 1px solid#FFC630;
  color: #ffc630;
}

audio {
  outline: none;
  height: 25px;
}

.text-underline {
  text-decoration: underline;
}
</style>
