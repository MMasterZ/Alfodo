<template>
  <div
    class="row"
    :class="
      isDesktop
        ? screenSize.width < 1600
          ? 'fixed-top'
          : ''
        : 'box-header-ber-mobile row'
    "
  >
    <div
      class="col width-fit row self-start z-top"
      :class="isDesktop ? ' q-py-sm q-px-md' : 'col q-pl-sm q-py-sm '"
    >
      <div
        class="col-1 self-center relative-position"
        style="width: fit-content"
        :style="!isDesktop ? '' : ''"
      >
        <q-btn @click="$router.replace('/practice/list')" round push flat size="16px">
          <q-img src="/images/icon_main/icon-back.png" no-transition no-spinner></q-img>
        </q-btn>

        <!-- <div
          v-if="!isDesktop"
          align="left"
          :style="
            screenSize.width < 600
              ? 'left: 125px; width: 130px'
              : 'left: 210px; width: 300px;'
          "
        >
          <span class="text-shadow-white f24" v-if="screenSize.width < 600">
            {{ `${practiceStore.skill[0].toUpperCase()} : Unit ${practiceStore.unit}` }}
          </span>
          <span class="text-shadow-white f24" v-else>
            {{
              `${
                practiceStore.skill[0].toUpperCase() + practiceStore.skill.slice(1)
              } : Unit ${practiceStore.unit}`
            }}
          </span>
        </div> -->
      </div>
      <div class="col-1 width-fit self-center relative-position row q-px-sm">
        <span class="text-shadow-white f38" v-if="isDesktop">
          {{
            `${
              practiceStore.skill[0].toUpperCase() + practiceStore.skill.slice(1)
            } : Unit ${practiceStore.unit}`
          }}
        </span>
        <span class="text-shadow-white f24" v-else>
          {{ `${practiceStore.skill[0].toUpperCase()} : Unit ${practiceStore.unit}` }}
        </span>
      </div>
      <div class="col-1 width-fit self-center">
        <div class="">
          <q-img
            class="cursor-pointer"
            width="20px"
            src="/images/icon_main/icon-info.png"
            @click="funcShowTutorial()"
          ></q-img>
        </div>
      </div>

      <!-- Desktop -->
      <div class="col-12 q-mt-sm z-top" v-if="isDesktop">
        <div class="box-unit relative-position row">
          <q-btn
            class="button-main default button-main-radius bubble-selected q-py-sm"
            style="width: 100px"
            padding="10px 0px"
            push
            no-caps
          >
            <span class="q-pl-sm text-bold text-color">
              {{ `Unit ${practiceStore.unit}` }}
            </span>
            <q-space></q-space>
            <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>

            <q-menu
              fit
              transition-show="jump-down"
              transition-hide="jump-up"
              class="relative-position"
              style="border-radius: 5px; border: 2px solid #4a261b"
            >
              <q-list class="box-selected" style="height: fit-content; max-height: 200px">
                <div class="q-pa-xs">
                  <div
                    clickable
                    v-close-popup
                    class="options-menu-list q-pa-xs cursor-pointer row"
                    v-for="i in 16"
                    align="center"
                    :class="{ 'active-menu': practiceStore.unit == i }"
                    @click="funcSelectedUnit(i)"
                  >
                    <div class="self-center col" align="left">
                      <span>Unit {{ i }}</span>
                    </div>
                    <div
                      class="col-1 self-center width-fit"
                      align="center"
                      v-if="
                        studentStore.studentType == 'demo' &&
                        i > studentStore.studentDemoUnit
                      "
                    >
                      <q-img width="12px" src="/images/icon_main/icon-lock.png"></q-img>
                    </div>
                  </div>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
          <div class="self-center">
            <span class="q-ml-md text-shadow-white f24"> {{ showUnitName }}</span>
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="col-12 q-mt-md" v-if="!isDesktop">
        <div class="col-1" style="width: fit-content">
          <q-btn
            class="button-main default button-main-radius bubble-selected q-py-sm z-top"
            :style="isDesktop ? 'width: 100px' : 'width:90px;'"
            padding="10px 0px"
            push
            no-caps
          >
            <span class="q-pl-sm text-black text-bold">
              {{ `Unit ${practiceStore.unit}` }}
            </span>
            <q-space></q-space>
            <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>

            <q-menu
              transition-show="jump-down"
              transition-hide="jump-up"
              class="relative-position z-top"
              style="border-radius: 5px; border: 2px solid #4a261b"
            >
              <q-list class="box-selected" style="height: fit-content; max-height: 200px">
                <div class="q-pa-xs">
                  <div
                    clickable
                    v-close-popup
                    class="options-menu-list q-pa-xs cursor-pointer row"
                    v-for="i in 16"
                    align="center"
                    :class="{ 'active-menu': practiceStore.unit == i }"
                    @click="funcSelectedUnit(i)"
                  >
                    <div class="self-center col" align="left">
                      <span>Unit {{ i }}</span>
                    </div>
                    <div
                      class="col-1 self-center width-fit"
                      align="center"
                      v-if="studentStore.studentType == 'demo' && i > 1"
                    >
                      <q-img width="12px" src="/images/icon_main/icon-lock.png"></q-img>
                    </div>
                  </div>
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </div>
    <q-space></q-space>
    <div
      align="right"
      class="z-top"
      :class="isDesktop ? 'q-pa-md' : 'col-1 q-pa-sm '"
      style="width: fit-content"
    >
      <div class="self-center" align="right">
        <q-btn round push flat :class="isDesktop ? 'q-mx-md' : 'q-mx-sm'" size="16px">
          <q-img
            @click="isShowDialogSetting = true"
            src="/images/icon_main/icon-setting.png"
            no-transition
            no-spinner
          ></q-img>
        </q-btn>
        <q-btn round push flat size="16px">
          <q-img
            @click="$router.replace('/lobby')"
            src="/images/icon_main/icon-home.png"
            no-transition
            no-spinner
          ></q-img>
        </q-btn>
      </div>
      <!-- Reward -->
      <!-- <div style="margin-top: 20px" align="right" v-if="!isDesktop">
        <div class="row box-star-reward">
          <div class="self-center q-px-xs">
            <q-img
              src="/images/icon_main/icon-star.png"
              no-transition
              no-spinner
              width="25px"
            ></q-img>
          </div>
          <div class="self-center text-shadow-white q-px-xs row">
            <div class="self-center q-pr-xs">
              <span class="f16">reward : </span>
            </div>
            <div class="self-center q-pl-xs">
              <span class="f20 text-bold">{{
                `${currentStar} / ${totalStarReward}`
              }}</span>
            </div>
          </div>
        </div>
      </div> -->
    </div>

    <dialog-setting
      @callback-closeDialog="isShowDialogSetting = false"
      :isDialogSetting="isShowDialogSetting"
    ></dialog-setting>

    <dialog-tutorial
      v-if="showDialogTutorial"
      :isDialogTutorial="showDialogTutorial"
      :systemStore="systemStore"
      @callback-closeDialog="funcCloseDialog()"
    ></dialog-tutorial>
  </div>
</template>

<script>
import dialogSetting from "../dialog_main/setting-dialog.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";

import { useQuasar } from "quasar";
import { ref, computed } from "vue";
import { usePracticeStore } from "src/stores/practice";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    screenSize: {
      type: Object,
      default: () => {},
    },
    currentStar: {
      type: Number,
      default: 0,
    },

    totalStarReward: {
      type: Number,
      default: 0,
    },
    isFirstTutorial: {
      default: false,
    },

    // Store
    systemStore: {
      default: () => {},
    },
  },
  components: {
    dialogSetting,
    dialogTutorial,
  },
  emits: ["callback-tutorial", "callback-closeTutorial", "callback-loading"],
  setup(props, { emit }) {
    // #region initialize Data
    const $q = useQuasar();
    const practiceStore = usePracticeStore();
    const studentStore = useStudentStore();
    const courseStore = useCourseStore();
    const isDesktop = $q.platform.is.desktop;
    const isShowDialogSetting = ref(false);
    const isShowDialogTutorial = ref(false);
    // #endregion

    const showDialogTutorial = computed(() => {
      if (props.isFirstTutorial) return true;
      if (isShowDialogTutorial.value) return true;
      return false;
    });

    const funcCloseDialog = () => {
      isShowDialogTutorial.value = false;
      emit("callback-closeTutorial");
    };

    const showUnitName = computed(() => {
      let name = "";

      let findUnitName = practiceStore.listName[practiceStore.skill].filter(
        (x) => x.unit == practiceStore.unit
      );

      if (findUnitName.length) {
        name = findUnitName[0].nameEng;
      }

      return name;
    });

    const funcSelectedUnit = (unit) => {
      $q.loading.show();
      const systemStore = useSystemStore();
      const studentStore = useStudentStore();
      const practiceStore = usePracticeStore();

      emit("callback-loading", true);

      if (studentStore.studentType == "demo" && unit > studentStore.studentDemoUnit) {
        systemStore.systemData.activeState.isShowDialogPackageMenu = true;
        $q.loading.hide();
        return;
      }

      practiceStore.setPracticeUnit(unit.toString());

      setTimeout(() => {
        $q.loading.hide();
      }, 500);
    };

    const funcShowTutorial = () => {
      console.log("x");
      // isShowDialogTutorial.value = true;

      emit("callback-tutorial", true);
    };

    return {
      practiceStore,
      courseStore,
      studentStore,

      // Check Platform
      isDesktop,

      funcSelectedUnit,
      funcShowTutorial,
      funcCloseDialog,
      showDialogTutorial,

      showUnitName,

      // Dialog
      isShowDialogSetting,
      isShowDialogTutorial,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-header-ber-mobile {
  max-width: 1200px;
  width: 100%;
  // margin: auto;
}

.text-shadow-white {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px,
    rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px,
    rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px,
    rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px,
    rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px,
    rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px,
    rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px,
    rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px,
    rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px,
    rgb(0, 0, 0) 2.88051px -0.838247px 0px;

  font-family: fredoka;
}

.box-unit {
  width: fit-content;
  padding: 10px 30px;
  border-radius: 50px;
  border: 3px solid #4a261b;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-unit::after {
  content: " ";
  position: absolute;
  top: 10px;
  left: 7px;
  background-color: #fff;
  width: 17px;
  height: 7px;
  transform: rotate(-48deg);
  opacity: 1;
  border-radius: 50px 50px 10px 10px;
}

.box-star-reward {
  position: relative;
  width: fit-content;
  padding: 3px 10px;
  border-radius: 50px;
  border: 3px solid #4a261b;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-star-reward::after {
  content: " ";
  position: absolute;
  top: 5px;
  left: 3px;
  background-color: #fff;
  width: 13px;
  height: 5px;
  transform: rotate(-48deg);
  opacity: 1;
  border-radius: 50px 50px 10px 10px;
}

.options-menu-list {
  border-radius: 5px;
  background-color: transparent;
  color: #4a261b;
  font-weight: bold;
  padding: 5px;
  margin: 3px 0px;
}

.options-menu-list:hover {
  background-color: #4a261b;
  color: #fff;
}

.active-menu {
  background-color: #4a261b;
  color: #fff;
}

.box-selected {
  width: 100px;
  max-height: 200px;
  min-height: fit-content;
  background-color: #f6f3d3;
  overflow-y: auto;
}

/* width */
.box-selected::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-selected::-webkit-scrollbar-track {
  background: #f6f3d3;
}

/* Handle */
.box-selected::-webkit-scrollbar-thumb {
  background: #4a261b;
  border: 2px solid #f6f3d3;
  border-radius: 10px;
}

.text-color {
  color: #4a261b;
  font-size: 16px !important;
}
</style>
