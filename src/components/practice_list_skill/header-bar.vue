<template>
  <div>
    <div
      class="row box-header-bar z-max"
      :class="
        isDesktop
          ? screenSize.width < 1600
            ? 'q-pa-md fixed-top'
            : 'q-pa-md absolute'
          : 'q-px-sm q-py-md fixed-top'
      "
    >
      <div class="col-1 width-fit">
        <!-- <q-btn
          flat
          round
          push
          :size="isDesktop ? '22px' : '14px'"
          @click="$router.replace('/lobby')"
        >
          <q-img src="/images/icon_main/icon-home.png" no-transition no-spinner></q-img>
        </q-btn> -->
      </div>
      <q-space></q-space>
      <div class="col-1 width-fit">
        <div
          class="row items-center justify-center"
          :class="
            isDesktop ? 'box-header-bar-selected' : 'box-header-bar-selected-mobile'
          "
        >
          <div class="col-12 q-pa-xs box-title-header" align="center">
            <span class="font-mali-b f16">เลือกบทเรียน</span>
          </div>
          <div class="col-12 width-fit row q-py-xs">
            <div class="self-start">
              <q-btn
                class="button-main default button-main-radius bubble-selected q-py-sm relative-position"
                :style="isDesktop ? 'width: 100px' : 'width:95px;'"
                padding="10px 0px"
                push
                :ripple="studentStore.studentType != 'school'"
                no-caps
              >
                <span class="q-pl-sm text-color f16 text-bold text-overflow">
                  {{ `Level ${levelSelected}` }}
                </span>
                <q-space></q-space>
                <q-icon
                  v-if="studentStore.studentType != 'school'"
                  class="q-mr-xs"
                  size="16px"
                  name="fas fa-caret-down"
                ></q-icon>

                <q-menu
                  v-if="studentStore.studentType != 'school'"
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  class="relative-position z-max"
                  style="border-radius: 5px; border: 2px solid #4a261b"
                >
                  <q-list
                    class="box-selected"
                    style="height: fit-content; max-height: 200px"
                  >
                    <div class="q-pa-xs">
                      <div
                        clickable
                        v-close-popup
                        class="options-menu-list q-pa-xs cursor-pointer row"
                        v-for="(item, index) in levelOptions"
                        align="center"
                        :class="{ 'active-menu': levelSelected == item.level }"
                        @click="funcSelectedLevel(item)"
                      >
                        <div class="self-center col" align="left">
                          <span>Level {{ item.level }}</span>
                        </div>
                        <div
                          class="col-1 self-center width-fit"
                          align="center"
                          v-if="item.lock"
                        >
                          <q-img
                            width="12px"
                            src="/images/icon_main/icon-lock.png"
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </q-list>
                </q-menu>

                <div
                  class="absolute-top-right"
                  style="top: -7px; right: -7px"
                  v-if="systemStore.activeStatus.isHasUnlockLevel"
                >
                  <div class="box-alert-circle"></div>
                </div>
              </q-btn>
            </div>
            <div :class="isDesktop ? 'q-mx-sm' : 'q-mx-xs'" class="self-start">
              <q-btn
                class="button-main default button-main-radius bubble-selected q-py-sm"
                :style="isDesktop ? 'width: 100px' : 'width:95px;'"
                padding="10px 0px"
                push
                no-caps
              >
                <span class="q-pl-sm text-color f16 text-bold">
                  {{ `Unit ${unitSelected}` }}
                </span>
                <q-space></q-space>
                <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>

                <q-menu
                  fit
                  transition-show="jump-down"
                  transition-hide="jump-up"
                  class="relative-position z-max"
                  style="border-radius: 5px; border: 2px solid #4a261b"
                >
                  <q-list
                    class="box-selected"
                    style="height: fit-content; max-height: 200px"
                  >
                    <div class="q-pa-xs">
                      <div
                        clickable
                        v-close-popup
                        class="options-menu-list q-pa-xs cursor-pointer row"
                        v-for="i in 16"
                        align="center"
                        :class="unitSelected == i ? 'active-menu' : ''"
                        @click="funcSelectedUnit(i)"
                      >
                        <div class="col self-center" align="left">
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
                          <q-img
                            width="12px"
                            src="/images/icon_main/icon-lock.png"
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <div :class="isDesktop ? 'q-mr-xs' : ''" class="self-center">
              <div>
                <q-btn
                  push
                  round
                  flat
                  :size="isDesktop ? '16px' : '14px'"
                  @click="isShowDialogListOfContent = true"
                >
                  <q-img
                    src="/images/icon_main/icon-book.png"
                    no-transition
                    no-spinner
                  ></q-img>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-space v-if="!isDesktop"></q-space>

      <div class="col-1 width-fit" :class="isDesktop ? 'q-pl-md' : 'q-pl-xs'">
        <div class="">
          <q-btn push round flat :size="isDesktop ? '18px' : '14px'">
            <q-img
              @click="isShowDialogSetting = true"
              src="/images/icon_main/icon-setting.png"
              no-transition
              no-spinner
            ></q-img>
          </q-btn>
        </div>
        <div class="q-pa-sm" align="center">
          <q-btn round dense flat size="12px" @click="isShowDialogTutorial = true">
            <q-img src="/images/icon_main/icon-info.png"></q-img>
          </q-btn>
        </div>
      </div>
    </div>

    <!-- Dialog List Of Content -->
    <q-dialog maximized v-model="isShowDialogListOfContent" class="z-max shadow-0">
      <q-card class="transparent shadow-0 no-padding">
        <!-- Desktop -->
        <q-card-section class="fit row justify-center items-center" v-if="isDesktop">
          <div
            class="relative-position text-color"
            style="max-width: 1000px; width: 90%; margin: auto"
          >
            <q-img src="/images/practice_list/the-book-of-content.png">
              <div class="absolute-center transparent" style="width: 80%; top: 43%">
                <div class="row">
                  <div>
                    <q-btn
                      class="button-main default bubble-selected button-main-radius q-py-sm"
                      style="width: 200px"
                      padding="10px 0px"
                      push
                    >
                      <span class="q-px-md text-color f16 text-bold">
                        {{ skillSelected.label }}
                      </span>
                      <q-space></q-space>
                      <q-icon
                        class="q-mx-sm"
                        size="16px"
                        name="fas fa-caret-down"
                      ></q-icon>

                      <q-menu
                        fit
                        transition-show="jump-down"
                        transition-hide="jump-up"
                        class="relative-position z-max"
                        style="border-radius: 5px; border: 2px solid #4a261b"
                      >
                        <q-list
                          class="box-selected"
                          style="height: fit-content; max-height: 200px"
                        >
                          <div class="q-pa-sm">
                            <div
                              clickable
                              v-close-popup
                              class="options-menu-list q-pa-sm cursor-pointer"
                              v-for="(item, index) in skillOptions"
                              align="left"
                              :class="{
                                'active-menu': skillSelected.value == item.value,
                              }"
                              @click="skillSelected = item"
                            >
                              <div>{{ item.label }}</div>
                            </div>
                          </div>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>
                  <div class="col-12 q-mt-md">
                    <div
                      class="q-px-md q-py-sm"
                      style="
                        background-color: rgba(234, 209, 161, 30%);
                        border-radius: 20px;
                      "
                    >
                      <div class="box-list-of-content q-pa-md text-color">
                        <div
                          class="row"
                          v-for="(item, index) in practiceStore.listName[
                            skillSelected.value
                          ]"
                        >
                          <div class="col-1 q-pa-sm" style="width: 80px">
                            <span>{{ `บทที่ ${item.unit}:` }}</span>
                          </div>
                          <div class="col q-pa-sm">
                            <span>
                              {{ item.nameEng }}
                            </span>
                            <br />
                            <span>
                              {{ item.nameTh }}
                            </span>
                          </div>
                          <div
                            class="col-12 q-my-xs"
                            v-if="index + 1 != 16"
                            style="border: 1px dashed #d8c5a4"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-img>
            <div class="absolute-top-right" style="right: -50px">
              <q-btn round push flat size="20px" v-close-popup>
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-transition
                  no-spinner
                ></q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>

        <!-- Mobile -->
        <q-card-section
          class="fit row justify-center items-center no-padding"
          v-if="!isDesktop"
        >
          <div
            class="relative-position text-color"
            style="max-width: 320px; width: 90%; margin: auto"
          >
            <q-img
              src="/images/practice_list/the-book-of-content-mobile.png"
              no-transition
              no-spinner
            >
              <div class="fit transparent">
                <div class="" align="center">
                  <q-btn
                    class="button-main default bubble-selected button-main-radius q-py-sm"
                    style="width: 200px"
                    padding="10px 0px"
                    push
                  >
                    <span class="q-px-md text-color f16 text-bold">
                      {{ skillSelected.label }}
                    </span>
                    <q-space></q-space>
                    <q-icon class="q-mx-sm" size="16px" name="fas fa-caret-down"></q-icon>

                    <q-menu
                      fit
                      transition-show="jump-down"
                      transition-hide="jump-up"
                      class="relative-position z-max"
                      style="border-radius: 5px; border: 2px solid #4a261b"
                    >
                      <q-list
                        class="box-selected"
                        style="height: fit-content; max-height: 200px"
                      >
                        <div class="q-pa-sm">
                          <div
                            clickable
                            v-close-popup
                            class="options-menu-list q-pa-sm cursor-pointer"
                            v-for="(item, index) in skillOptions"
                            align="left"
                            :class="{
                              'active-menu': skillSelected.value == item.value,
                            }"
                            @click="skillSelected = item"
                          >
                            <span>{{ item.label }}</span>
                          </div>
                        </div>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>

                <div class="">
                  <div class="q-py-md q-px-xs">
                    <div class="box-list-of-content-mobile text-color">
                      <div
                        class="row"
                        v-for="(item, index) in practiceStore.listName[
                          skillSelected.value
                        ]"
                      >
                        <div class="col-1 q-pa-sm" style="width: fit-content">
                          <span>{{ `บทที่ ${item.unit}:` }}</span>
                        </div>
                        <div class="col q-pa-sm">
                          <span>
                            {{ item.nameEng }}
                          </span>
                          <br />
                          <span>
                            {{ item.nameTh }}
                          </span>
                        </div>
                        <div
                          class="col-12 q-my-xs"
                          v-if="index + 1 != 16"
                          style="border: 0.5px dashed #d8c5a4"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-img>
            <div
              class="absolute-top-right"
              style="top: -10px; right: -5px"
              align="center"
            >
              <q-btn round flat push size="16px" v-close-popup>
                <q-img
                  src="/images/icon_main/icon-close.png"
                  no-transition
                  no-spinner
                ></q-img>
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Setting -->
    <dialog-setting
      @callback-closeDialog="isShowDialogSetting = false"
      :isDialogSetting="isShowDialogSetting"
    ></dialog-setting>

    <!-- Dialog Tutorial -->
    <dialog-tutorial
      v-if="showDialogTutorial"
      :isDialogTutorial="showDialogTutorial"
      :systemStore="systemStore"
      @callback-closeDialog="funcCloseDialog()"
    ></dialog-tutorial>
  </div>
</template>

<script setup>
import dialogSetting from "../dialog_main/setting-dialog.vue";
import dialogTutorial from "../dialog_main/tutorial.vue";
import { computed, defineComponent, ref, watch } from "vue";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";

const components = defineComponent({
  dialogSetting,
  dialogTutorial,
});

const props = defineProps({
  isFirstTutorial: {
    default: false,
  },
  // Screen
  screenSize: {
    default: () => {},
  },
});

const emit = defineEmits(["callback-loading", "callback-closeTutorial"]);

// Initialize Store
const courseStore = useCourseStore();
const studentStore = useStudentStore();
const systemStore = useSystemStore();
const practiceStore = usePracticeStore();

// Initialize data
const isDesktop = ref(systemStore.platform.desktop);
const isShowDialogSetting = ref(false);
const isShowDialogTutorial = ref(false);

const showDialogTutorial = computed(() => {
  if (props.isFirstTutorial) return true;
  if (isShowDialogTutorial.value) return true;
  return false;
});

const funcCloseDialog = () => {
  isShowDialogTutorial.value = false;
  emit("callback-closeTutorial");
};

const skillSelected = ref({
  label: "คำศัพท์",
  value: "Vocabulary",
});

const skillOptions = ref([
  {
    label: "คำศัพท์",
    value: "Vocabulary",
  },
  {
    label: "ไวยากรณ์",
    value: "Grammar",
  },
  {
    label: "การอ่าน",
    value: "Reading",
  },
  {
    label: "การเขียน",
    value: "Writing",
  },
  {
    label: "การออกเสียง",
    value: "Phonics",
  },
  {
    label: "การฟังและการพูด",
    value: "Listening",
  },
]);

const levelSelected = ref(practiceStore.level);
const unitSelected = ref(practiceStore.unit);

const isShowDialogListOfContent = ref(false);

const funcSelectedUnit = (i) => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();
  const practiceStore = usePracticeStore();

  emit("callback-loading", true);
  systemStore.systemData.activeState.isShowDialogLoading = true;

  if (studentStore.studentType == "demo" && i > studentStore.studentDemoUnit) {
    systemStore.systemData.activeState.isShowDialogPackageMenu = true;
    emit("callback-loading", false);
    systemStore.systemData.activeState.isShowDialogLoading = false;
    return;
  }

  unitSelected.value = i;
  unitSelected.value.toString();

  practiceStore.setPracticeUnit(unitSelected.value.toString());

  setTimeout(() => {
    emit("callback-loading", false);
    systemStore.systemData.activeState.isShowDialogLoading = false;
  }, 1000);
};

let maxLevel = 12;
const levelOptions = computed(() => {
  let temp = [];

  for (let i = 0; i < maxLevel; i++) {
    let level = (i + 1).toString();
    let findLevelInCourse = courseStore.courseLevelOptions.find((x) => x.value === level);

    let newData = {
      level: level,
      lock: true,
      id: "",
    };

    if (findLevelInCourse) {
      newData.lock = false;
      newData.id = findLevelInCourse.id;
    }

    temp.push(newData);
  }

  return temp;
});

const funcSelectedLevel = async (item) => {
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();
  const practiceStore = usePracticeStore();

  systemStore.setParameter({
    level: item.level,
  });

  if (item.level == levelSelected.value) {
    systemStore.systemData.activeState.isShowDialogLockLevel = false;
    return;
  }

  if (item.lock) {
    practiceStore.setLockPracticeData(item);

    if (studentStore.studentType == "demo") {
      systemStore.systemData.activeState.isShowDialogPackageMenu = true;
      emit("callback-loading", false);
      return;
    }

    if (systemStore.activeStatus.isHasUnlockLevel) {
      systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
    } else {
      systemStore.systemData.activeState.isShowDialogLockLevel = true;
    }

    setTimeout(() => {
      emit("callback-loading", false);
    }, 100);
    return;
  }

  emit("callback-loading", true);

  levelSelected.value = item.level;
  levelSelected.value.toString();

  systemStore.systemData.activeState.isShowDialogLockLevel = false;

  practiceStore.setPracticeUnit("1");
  unitSelected.value = "1";

  await practiceStore.setPracticelevel(levelSelected.value.toString());

  await studentStore.updateCurrentCourseId(item.id);

  await practiceStore.practiceUpdateByLevel();

  await practiceStore.getPracticeLog();

  setTimeout(() => {
    emit("callback-loading", false);
  }, 500);
};

watch(
  () => practiceStore.level,
  () => {
    levelSelected.value = practiceStore.level;
  }
);

// export default {
//   components: {
//     dialogSetting,
//     dialogTutorial,
//   },
//   props: {
//     isFirstTutorial: {
//       default: false,
//     },
//     // Screen
//     screenSize: {
//       default: () => {},
//     },
//   },
//   setup(props, { emit }) {
//     // Initialize Store

//     return {
//       // initialize
//       isDesktop,

//       skillSelected,
//       skillOptions,
//       levelSelected,
//       unitSelected,

//       // Boolean

//       // Dialog
//       isShowDialogListOfContent,
//       isShowDialogSetting,
//       isShowDialogTutorial,

//       // Function
//       funcSelectedUnit,
//       funcSelectedLevel,
//       funcCloseDialog,

//       // Computed
//       showDialogTutorial,
//       levelOptions,
//     };
//   },
// };
</script>

<style lang="scss" scoped>
.box-header-bar {
  width: 100%;
}

.box-title-header {
  background-color: #ffe5a1;
  color: #4a261b;
  border-radius: 15px 15px 0px 0px;
}

.box-header-bar-selected {
  max-width: 285px;
  min-width: fit-content;
  background-color: #984510;
  border: 2px solid #4a261b;
  border-radius: 15px;
}

.box-header-bar-selected-mobile {
  max-width: 250px;
  min-width: fit-content;
  background-color: #984510;
  border: 2px solid #4a261b;
  border-radius: 15px;
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

.options-menu-list-demo {
  border-radius: 5px;
  background-color: transparent;
  color: #4a261b;
  font-weight: bold;
  padding: 5px;
  margin: 3px 0px;
}

.active-menu {
  background-color: #4a261b;
  color: #fff;
}

.box-list-of-content {
  border-radius: 20px;
  height: calc(100vw - 650px);
  max-height: calc(400px);
  min-height: calc(250px);
  overflow-y: auto;
}

/* width */
.box-list-of-content::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-list-of-content::-webkit-scrollbar-track {
  background: #ffa746;
  border: 0.8mm solid #f6f3d3;
  border-radius: 10px;
}

/* Handle */
.box-list-of-content::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 10px;
}

.box-list-of-content-mobile {
  border-radius: 20px;
  height: calc(100vw - 50px);
  max-height: calc(320px);
  min-height: calc(250px);
  overflow-y: auto;
}

/* width */
.box-list-of-content-mobile::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-list-of-content-mobile::-webkit-scrollbar-track {
  background: #ffa746;
  border: 0.8mm solid #f6f3d3;
  border-radius: 10px;
}

/* Handle */
.box-list-of-content-mobile::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 10px;
}

.text-color {
  color: #4a261b;
  font-size: 16px !important;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// #region Dialog Unlock Level
.box-alert-circle {
  width: 17px;
  height: 17px;
  border: 1px solid #fff;
  border-radius: 50%;
  background-color: #f60000;
}
// #endregion
</style>
