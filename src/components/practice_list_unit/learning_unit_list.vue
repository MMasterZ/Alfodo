<template>
  <div class="box-learning-skill">
    <div class="box-content-list q-mt-sm">
      <div v-for="(item, index) in practiceList" class="row justify-center">
        <div
          class="col-6 relative-position self-start"
          style="max-width: 360px; width: 100%; min-width: 320px"
          :class="
            item.isDisable || (!item.isLesson && item.counter >= 2)
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          "
          @click="
            item.isDisable || (!item.isLesson && item.counter >= 2)
              ? null
              : funcSelectedUnitSkill(item)
          "
        >
          <div class="relative-position" :style="'height: 85px'">
            <div class="relative-position">
              <q-img
                :src="`/images/box_main/box-icon-button-learn-${
                  item.isDisable ? 'lock-' : item.isLearn ? 'pass-' : ''
                }mobile.webp`"
                no-transition
                no-spinner
              ></q-img>

              <div
                class="absolute-center row transparent no-padding"
                style="top: 47%; width: 100%"
              >
                <div
                  class="col-1 self-center"
                  style="width: 70px; padding-left: 25px"
                  align="left"
                >
                  <span class="text-number-stoke font-mali-b">{{ index + 1 }}</span>
                </div>
                <div class="col self-center relative-position" align="center">
                  <span class="text-skill-stoke">
                    {{
                      `${funcChangeNameSkill(item.practiceType)} ${
                        item.isLesson ? "" : `(${item.counter >= 2 ? 2 : item.counter}/2)`
                      }`
                    }}
                  </span>
                </div>
                <div class="col-1 self-center" style="width: 60px" align="center">
                  <q-img
                    v-if="item.isRoleplay"
                    src="/images/icon_main/icon-role-play.png"
                    width="54px"
                    no-spinner
                    no-transition
                    style="margin-right: -5px; margin-top: -2px"
                  ></q-img>
                </div>
              </div>

              <div
                class="absolute-bottom"
                align="center"
                style="bottom: -15px"
                v-if="!item.isLesson"
              >
                <q-img
                  :src="`/images/box_main/box-learn-practice-star-${item.star}-mobile.png`"
                  width="117.6px"
                  no-transition
                  no-spinner
                ></q-img>
              </div>

              <!-- #region Tooltip -->
              <q-tooltip
                anchor="bottom middle"
                self="bottom middle"
                transition-show="scale"
                transition-hide="scale"
                class="transparent no-padding shadow-0"
                v-if="item.textValidate != ''"
                style="width: 360px; height: 200px"
                auto-close
              >
                <div class="absolute-bottom" style="bottom: 25px">
                  <q-img
                    style="width: 360px"
                    :src="`/images/practice_skill/label-practice${
                      item.textValidate != '' ? '-validate' : ''
                    }.png`"
                    no-transition
                    no-spinner
                  >
                    <div
                      class="absolute-center font-mali-m full-width transparent text-color no-padding"
                      style="top: 37%"
                      align="center"
                    >
                      <div class="f20">
                        {{
                          `${funcChangeNameSkill(item.practiceType)} ${
                            item.isLesson
                              ? ""
                              : `(${item.counter >= 2 ? 2 : item.counter}/2)`
                          }`
                        }}
                      </div>
                      <div
                        class="f12"
                        v-if="studentStore.studentType == 'online' && !item.isLesson"
                      >
                        {{ `(รีเซ็ทจำนวนครั้งทุกวัน)` }}
                      </div>

                      <div v-else class="f14 q-mt-xs">
                        <div v-html="item.textValidate"></div>
                      </div>
                    </div>
                  </q-img>
                </div>
              </q-tooltip>
              <!-- #endregion -->
            </div>
          </div>
        </div>
        <div class="col-12 q-py-xl" v-if="index + 1 == practiceList.length"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "src/stores/student";
import { funcChangeNameSkill } from "../../router";
export default {
  props: {
    practiceList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const funcSelectedUnitSkill = (items) => {
      emit("callback-active", items);
    };

    return {
      studentStore: useStudentStore(),

      // Function
      funcChangeNameSkill,
      funcSelectedUnitSkill,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-learning-skill {
  max-width: 1200px;
  width: 100%;
  margin: auto;
}

.box-content-list {
  height: calc(100vh - 195px);
  overflow: auto;
}

::-webkit-scrollbar {
  width: 12px;
  height: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #ffce4e;
  border: 2px solid #4a261b;
  border-radius: 6px;
}

.text-number-stoke {
  line-height: 0.7;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  font-size: clamp(22px, 1.7vw, 30px);
}

.text-skill-stoke {
  font-family: fredoka;
  color: #fff;
  line-height: 1.6;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  font-size: clamp(16px, 1.7vw, 22px);
}

.text-color {
  color: #4a261b;
}
</style>
