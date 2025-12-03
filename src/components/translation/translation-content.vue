<template>
  <div :class="{ 'box-translation': $q.platform.is.desktop }">
    <div>
      <!-- <div class="col-12">
        <div>
          <header-bar :practiceData="practiceData"></header-bar>
        </div>
      </div> -->
    </div>

    <div align="center" class="q-py-lg" v-if="$q.platform.is.desktop">
      <div class="relative-position box-title q-pa-sm text-white">
        <div>
          <!-- <span class="f20 text-bold" v-html="practiceData.nameEng"></span> -->
          <span class="f20 text-bold">
            {{ practiceData.nameEng }}
            <div class="q-py-xs">
              <span>{{ practiceData.nameTh }}</span>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="row justify-center">
      <!-- เนื้อเรื่องภาษาอังกฤษ -->
      <div
        :class="$q.platform.is.desktop ? 'col-12 q-py-md' : 'col-12'"
        class="relative-position self-start"
        align="center"
      >
        <div
          :class="$q.platform.is.desktop ? 'q-px-md' : ''"
          class="relative-position q-pb-lg"
        >
          <div
            class="q-py-md q-mt-sm"
            :class="
              $q.platform.is.desktop
                ? 'box-content-question'
                : 'box-content-question-mobile'
            "
          >
            <div class="q-pa-md" v-if="$q.platform.is.mobile">
              <span class="f20 text-bold">เนื้อเรื่อง</span>
            </div>
            <div align="left" class="q-px-md q-mt-lg">
              <div class="" v-for="(item, index) in contentOverAll">
                <span
                  :class="$q.platform.is.desktop ? 'f18' : 'f16'"
                  class="text-bold"
                  v-html="item.eng"
                ></span>
                <div class="q-pb-lg q-mt-xs">
                  <span
                    style="color: #005f80"
                    :class="$q.platform.is.desktop ? 'f18' : 'f16'"
                    v-html="item.th"
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 self-start q-py-หท">
        <div class="q-pa-md" align="center">
          <q-btn
            label="ออกจากแบบฝึกหัด"
            push
            @click="soundEffectFinish()"
            class="bg-amber"
            no-caps
            style="width: 200px"
          >
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerBar from "../../components/header-time-progress.vue";
import { playSoundEffect } from "src/router";
import { useQuasar } from "quasar";
export default {
  components: {
    headerBar,
  },
  props: {
    practiceData: {
      type: Object,
      default: () => {},
    },
    contentOverAll: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();

    const soundEffectFinish = () => {
      emit("callback-finishpractice");

      if (props.practiceData.star > 0) {
        playSoundEffect("pass", props.practiceData.isEnableSoundEffect);
      } else {
        playSoundEffect("fail", props.practiceData.isEnableSoundEffect);
      }
    };

    return { soundEffectFinish };
  },
};
</script>

<style lang="scss" scoped>
.box-title {
  width: 450px;
  background-image: url("/images/translation/label-title.png");
  background-size: cover;
  background-position: center;
  max-height: 500px;
  min-height: fit-content;
  border-radius: 10px;
  box-shadow: 5px 7px 0px 2px #542a0c;
}

.box-question {
  max-width: 800px;
  width: 100%;
  background-color: #7c451e;
  border-radius: 10px 10px 0px 0px;
  color: #fff;
}

.box-translation {
  height: calc(100vh - 120px);
  width: 100%;
  background-image: url("/images/translation/bg-translation.png");
  background-position: bottom right;
  background-size: cover;
  background-repeat: no-repeat;
}

.box-content-question {
  max-width: 1000px;
  width: 100%;
  background-color: #d5f3fc;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 3px solid#fff;
  z-index: 1;
  overflow-x: auto;
}

.box-content-question-mobile {
  max-width: 800px;
  width: 100%;
  background-color: #d5f3fc;
  background-size: cover;
  background-position: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 3px solid#fff;
  z-index: 1;
  overflow-x: auto;
}

.box-content-question[mode="pc"] {
  min-height: 50vh;
  max-height: fit-content;
  border-radius: 0px 0px 10px 10px;
}

.box-content-question[mode="mobile"] {
  height: fit-content;
  border: 2px solid#fff;
  border-radius: 0px;
}

/* width */
.box-content-question::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-content-question::-webkit-scrollbar-track {
  background: #eaa02c;
}

/* Handle */
.box-content-question::-webkit-scrollbar-thumb {
  background: #9f220c;
}

/* Handle on hover */
.box-content-question::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.box-content-answer[mode="pc"] {
  max-width: 800px;
  width: 100%;
  min-height: 50vh;
  max-height: fit-content;
  background-color: rgba(0, 95, 128, 0.4);
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
}

.box-content-answer[mode="mobile"] {
  max-width: 800px;
  width: 100%;
  height: fit-content;
  background-color: #3c9ebe;
  box-shadow: 0px 3px 5px rgba(33, 33, 33, 0.5);
  border: 3px solid #fff;
}

.box-content-answer[mode="pc"]::before {
  content: "";
  position: absolute;
  bottom: 13px;
  left: 3px;
  width: 7px;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-answer[mode="pc"]::after {
  content: "";
  position: absolute;
  bottom: 46px;
  left: 3px;
  width: 7px;
  height: 8px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-th[mode="pc"] {
  background-color: #99e2f6;
  border-bottom: 3px solid #fff;
  color: #005f80;
  // font-weight: bold;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
}

.box-content-th[mode="mobile"] {
  max-width: 800px;
  width: 100%;
  background-color: #3c9ebe;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  color: #fff;
  border-radius: 10px 10px 0px 0px;
}

.box-content-th[mode="pc"]::before {
  content: "";
  position: absolute;
  top: 3px;
  right: 3px;
  width: 7px;
  height: 30px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-th[mode="pc"]::after {
  content: "";
  position: absolute;
  top: 36px;
  right: 3px;
  width: 7px;
  height: 9px;
  background-color: #fff;
  border-radius: 10px;
}

.box-content-writing {
  border: 5px solid #a36112;
  border-radius: 0px 0px 7px 7px;
}

.btn-selected-answer {
  position: relative;
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: 2px dashed #ad7301;
}

.btn-has-answer {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: linear-gradient(180deg, #ffd058 0%, #ffbb0c 100%);
  box-shadow: 0px 3px 0px #d6af4a;
  border-radius: 7px;
  transition: 0.2s;
  transform: scale(1);
}

.btn-has-answer::before {
  content: "x";
  position: absolute;
  right: -5px;
  top: -5px;
  font-size: 10px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  background-color: #7c451e;
  color: white;
  border-radius: 50%;
  box-shadow: 0px 1px 7px rgba(85, 85, 85, 0.521);
}

.btn-has-answer:active {
  transition: 0.2s;
  transform: scale(0.9);
}

.btn-not-selected-answer {
  width: 100px;
  height: 35px;
  border-radius: 7px;
  border: 2px dashed #0082ba;
  background-color: #b9effe;
}

.btn-correct {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #58cc02;
  box-shadow: 0px 3px 0px #58a700;
  border-radius: 7px;
}

.btn-incorrect {
  min-width: 50px;
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #ff4b4b;
  box-shadow: 0px 3px 0px #ea2b2b;
  border-radius: 7px;
}

.box-content-main {
  max-width: 1000px;
  width: 100%;
  background-color: #eabd94;
  border-radius: 10px;
  box-shadow: 0 10px 0px #a07751;
}

.border-dash {
  border: 1px dashed;
}

.bg-disable {
  background-color: #ecdcbe;
}
</style>
