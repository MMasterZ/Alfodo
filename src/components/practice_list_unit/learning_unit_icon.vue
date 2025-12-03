<template>
  <div>
    <div
      v-for="(item, index) in practiceList"
      class="absolute"
      :style="`left:${item.position.y}px;top:${item.position.x}px;transform: translate(-50%, -50%);transform-origin:center;`"
      :class="
        item.isDisable || (!item.isLesson && item.counter >= 2)
          ? 'cursor-not-allowed'
          : 'cursor-pointer'
      "
    >
      <div
        class="relative-position row item"
        :class="
          item.isDisable || (!item.isLesson && item.counter >= 2)
            ? null
            : 'cursor-pointer'
        "
        @click="
          item.isDisable || (!item.isLesson && item.counter >= 2)
            ? null
            : funcSelectedUnitSkill(item)
        "
        :style="`height: ${item.size + 40}px`"
      >
        <!-- #region Tooltip -->
        <q-tooltip
          anchor="top middle"
          self="top middle"
          transition-show="scale"
          transition-hide="scale"
          class="transparent no-padding"
          style="top: -50px"
        >
          <div class="relative-position">
            <q-img
              style="width: 364px"
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
                <div class="f20 q-mt-xs">
                  {{
                    `${funcChangeNameSkill(item.practiceType)} ${
                      item.isLesson ? "" : `(${item.counter >= 2 ? 2 : item.counter}/2)`
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

        <div
          :class="
            item.isDisable || (!item.isLesson && item.counter >= 2)
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          "
          class="self-end relative-position"
          style="width: fit-content"
        >
          <div>
            <q-img
              :width="`${item.size}px`"
              :src="`/images/icon_main/icon-button-learn${
                item.isDisable || practiceStore.isCheckLockPractice
                  ? '-lock'
                  : item.isLearn
                  ? '-pass'
                  : ''
              }.png`"
              no-transition
              no-spinner
            ></q-img>
          </div>

          <div
            class="absolute-bottom"
            style="bottom: -13%; width: 78%; margin: auto"
            v-if="!item.isLesson"
          >
            <div class="relative-position animate__animated animate__fadeIn">
              <q-img
                :src="`/images/icon_main/icon-practice-star-${item.star}.png`"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>

          <div class="absolute-center box-icon-learn-number" v-if="!item.isRoleplay">
            <div
              class="f144 font-mali-b text-icon-learn"
              :style="`font-size: clamp(${funcSetFontSize(100, item.size)}px,
              15vw,
              ${funcSetFontSize(140, item.size)}px`"
            >
              {{ `${index + 1}` }}
            </div>
          </div>

          <div
            class="absolute-center"
            style="width: 65%; top: -3%"
            v-if="item.isRoleplay"
          >
            <div
              class="relative-position animate__animated animate__heartBeat animation-duration-0-5s"
            >
              <q-img
                src="/images/icon_main/icon-role-play.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "src/stores/student";
import { funcChangeNameSkill } from "../../router";
import { usePracticeStore } from "src/stores/practice";
export default {
  props: {
    practiceList: {
      type: Array,
      default: () => [],
    },
    systemStore: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const funcSelectedUnitSkill = (items) => {
      emit("callback-active", items);
    };

    // Computed
    const funcSetFontSize = (font, size) => {
      let setSize = size > 200 ? 200 : size;

      let sumSize = (setSize / font) * 100 || 0;

      sumSize = sumSize > font ? font : sumSize;

      return sumSize.toFixed(0);
    };

    return {
      studentStore: useStudentStore(),
      practiceStore: usePracticeStore(),

      // Function
      funcChangeNameSkill,
      funcSelectedUnitSkill,
      funcSetFontSize,
    };
  },
};
</script>

<style lang="scss" scoped></style>
