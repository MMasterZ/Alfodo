<template>
  <div class="bg-reading-action">
    <div>
      <header-bar
        :practiceData="practiceData"
        :setFontSize="fontSize"
        @callback-resize="(val) => (fontSize = val)"
      ></header-bar>
    </div>
    <div class="box-content q-pa-md shadow-1">
      <div align="center">
        <span class="f20" v-html="practiceData.titleEng"> </span>
      </div>
      <div class="q-py-md">
        <span :style="`font-size:${fontSize}px;`" v-html="highLightText"></span>
      </div>
    </div>

    <div class="box-answer q-pa-md shadow-1">
      <div>
        <div class="box-question q-py-md shadow-1" align="center">
          <span class="f20" v-html="practiceData.question"></span>
        </div>
        <div class="row q-mt-md">
          <div
            class="col-6"
            :class="index == 0 || index == 2 ? 'q-pr-md' : 'q-pl-md'"
            v-for="(item, index) in practiceData.choices"
          >
            <div
              v-ripple
              class="relative-position btn-action"
              @click="
                practiceData.isSendAnswer
                  ? null
                  : (practiceData.currentChoiceIndex = item.index),
                  $emit('callback-sendanswer')
              "
            >
              <q-img
                width="35px"
                src="/images/btn-icon-circle.png"
                v-if="index == 0"
              ></q-img>
              <q-img
                width="35px"
                src="/images/btn-icon-square.png"
                v-if="index == 1"
              ></q-img>
              <q-img
                width="35px"
                src="/images/btn-icon-triangle.png"
                v-if="index == 2"
              ></q-img>
              <q-img
                width="35px"
                src="/images/btn-icon-star.png"
                v-if="index == 3"
              ></q-img>
              <span class="relative-position q-mx-md f16">{{ item.choice }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../header-time-progress.vue";
import { ref, computed } from "vue";
export default {
  components: {
    headerBar,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const fontSize = ref(16);

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
      fontSize,
      highLightText,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-reading-action {
  background-image: url("/images/reading/bg-reading-action.png");
  background-size: contain;
  background-position: bottom;
  background-repeat: no-repeat;
  background-color: #aef0ff;
  overflow: auto;
}

.box-content {
  max-width: 1000px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin: auto;
}

.box-answer {
  max-width: 1000px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  margin: 15px auto;
}

.box-question {
  border: 2px solid #a36112;
  background-color: #fff;
  border-radius: 7px;
}

.btn-action {
  position: relative;
  background: linear-gradient(180deg, #ffd056 0%, #ffbc11 100%);
  padding: 15px;
  margin: 10px auto;
  box-shadow: 0px 3px 1px 0px rgba(223, 137, 1);
  border-radius: 10px;
  cursor: pointer;
}

.btn-action:hover {
  background: linear-gradient(180deg, #4adbfe 0%, #3dcaf6 100%);
  box-shadow: 0px 3px 1px 0px #0082ba;
}

.btn-action::before {
  content: "";
  position: absolute;
  right: 10px;
  top: 5px;
  background-color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.btn-action::after {
  content: "";
  position: absolute;
  right: 13px;
  top: 20px;
  background-color: #fff;
  width: 5px;
  height: 5px;
  border-radius: 50%;
}
</style>
