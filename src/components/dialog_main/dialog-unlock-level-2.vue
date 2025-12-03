<template>
  <!-- #region Unlock -->
  <q-dialog maximized v-model="isShowDialogUnlockLevel" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position box-dialog-container">
          <q-img
            src="/images/dialog_main/dialog-unlock-level.png"
            no-spinner
            no-transition
          >
          </q-img>

          <div class="absolute-top box-dialog-content f14 font-mali-r">
            <div align="center" class="font-mali-b f20">
              {{ `ปลดล็อกระดับใหม่` }}
            </div>

            <div align="center" style="margin: 16px 0px; line-height: 2.5">
              {{ `ยินดีด้วย คุณผ่านเกณฑ์ของระดับนี้แล้ว คุณสามารถเลือกระดับใหม่ได้แล้ว` }}
            </div>

            <div>
              <div class="box-selected-level row items-center">
                <div class="row fit">
                  <div class="col self-center f14">
                    <span v-if="selectUnlockLevel == ''">
                      {{ `เลือกระดับที่ต้องการ` }}
                    </span>
                    <span class="text-black font-mali-m" v-else>
                      {{ `${selectUnlockLevel.label}` }}
                    </span>
                  </div>
                  <div class="col-1" style="width: 15px" align="center">
                    <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>
                  </div>
                </div>
                <q-menu
                  transition-show="jump-down"
                  class="z-max"
                  style="height: 200px"
                  fit
                  auto-close
                >
                  <div
                    class="box-item f12"
                    :class="[
                      selectUnlockLevel.level == itemLevel.level ? 'box-item-active' : '',
                    ]"
                    v-for="(itemLevel, indexLevel) in unlockLevelList"
                    :key="indexLevel"
                    @click="funcSelectUnlockLevel(itemLevel)"
                  >
                    <span>{{ `${itemLevel.label}` }}</span>
                  </div>
                </q-menu>
              </div>
              <div class="f10 font-mali-m">
                {{ `*เมื่อเลือกระดับแล้ว จะไม่สามารถเปลี่ยนได้ในภายหลัง` }}
              </div>
            </div>

            <div class="box-button-content" align="center">
              <q-img
                width="130px"
                src="/images/button_main/button-table-of-content.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="isShowDialogTableOfContents = true"
              ></q-img>
            </div>

            <div class="box-button-confirm" align="center">
              <q-img
                width="275px"
                src="/images/button_main/button-confirm.png"
                no-spinner=""
                no-transition=""
                class="cursor-pointer"
                @click="funcAddNewLevel()"
              ></q-img>
            </div>
          </div>

          <div class="absolute-top-right" style="top: 30px; right: -10px">
            <q-btn round flat @click="funcCloseDialogUnlockLevel()">
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Lock-->
  <q-dialog maximized v-model="isShowDialogLockLevel" auto-close>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img width="320px" src="/images/dialog_main/dialog-lock-level.png">
            <div class="fit row transparent">
              <div class="col-12" style="height: 30%"></div>
              <div class="col-12 text-dialog-content" style="height: 70%">
                <div class="q-mt-xs" align="center">
                  <span class="f20 font-mali-b">
                    {{
                      `ระดับ ${practiceStore.practiceLockData.value} ถูกล็อกไว้อยู่`
                    }}</span
                  >
                </div>
                <div class="q-ma-md" align="center">
                  <span class="f14 font-mali-r"> คุณยังไม่ผ่านเงื่อนไขการปลดล็อก </span>
                </div>

                <div class="font-mali-m f14 q-mt-lg q-pt-md" align="center">
                  <div class="box-lock-level-content q-mt-md">
                    <span>
                      {{ `เวลาที่ใช้งาน : ${diffInDays || 0}/30 (วัน)` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Success -->
  <q-dialog maximized v-model="isShowDialogSuccessUnlockLevel" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img width="320px" src="/images/dialog_main/dialog-success-unlock-level.png">
            <div class="fit row transparent">
              <div class="col-12" style="height: 30%"></div>
              <div class="col-12 text-dialog-content" style="height: 70%">
                <div align="center" class="q-pa-md">
                  <span class="f20 font-mali-b">
                    {{ `เปิดระดับ ${selectUnlockLevel.level}` }}
                  </span>
                </div>
                <div class="q-pb-sm" align="center">
                  <span class="f14 font-mali-r">
                    {{ `คุณสามารถเริ่มเรียนระดับที่ ${selectUnlockLevel.level} ได้แล้ว` }}
                  </span>
                </div>

                <div class="q-pa-sm q-mt-md" align="center">
                  <q-img
                    width="250px"
                    class="cursor-pointer"
                    src="/images/button_main/button-ok-long-th.png"
                    @click="funcConfirmDialogSuccessUnlockLevel()"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <dialog-loading :isShowLoading="isShowLoading"></dialog-loading>

  <dialog-table-of-content
    v-if="isShowDialogTableOfContents"
    @callback-closeTableOfContent="isShowDialogTableOfContents = false"
  ></dialog-table-of-content>
</template>

<script setup>
import dialogLoading from "components/dialog-loading.vue";
import { useSystemStore } from "src/stores/system";
import { computed, onMounted, ref, watch } from "vue";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { usePracticeStore } from "src/stores/practice";
import dialogTableOfContent from "./dialog-table-of-content.vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits([
  "callback-closeDialog",
  "callback-close",
  "callback-unlockLevel",
]);

// Intitialize Store
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const courseStore = useCourseStore();
const studentStore = useStudentStore();

// Initialze data
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const isShowLoading = ref(false);
const isShowDialogTableOfContents = ref(false);

// Dialog Status
const isShowDialogSuccessUnlockLevel = ref(false);
const isShowDialogUnlockLevel = ref(false);
const isShowDialogLockLevel = ref(false);

// #region Computed
const selectUnlockLevel = ref("");
const unlockLevelList = computed(() => {
  let temp = [];

  const courseStore = useCourseStore();
  const studentStore = useStudentStore();

  for (let i = 0; i < 12; i++) {
    let newData = {
      level: (i + 1).toString(),
      label: `ระดับ ${i + 1}`,
    };

    if (studentStore.studentData.isSelectedLevel) {
      let findCourseLevel = courseStore.courseLevelOptions.find(
        (x) => x.value == newData.level
      );

      if (findCourseLevel) {
        continue;
      }
    }

    if (
      studentStore.placementTestLevel == studentStore.levelForAge &&
      studentStore.placementTestLevel == newData.level
    ) {
      newData.label = `ระดับ ${newData.level} - แนะนำ`;
    } else {
      if (studentStore.placementTestLevel == newData.level) {
        newData.label = `ระดับ ${newData.level} - ตามระดับที่สอบได้`;
      } else if (studentStore.levelForAge == newData.level) {
        newData.label = `ระดับ ${newData.level} - ระดับที่แนะนำตามอายุ`;
      }
    }

    temp.push(newData);
  }

  return temp;
});
// #endregion

// #region Add new level
const isValidateSelectUnlockLevel = ref(false);
const funcAddNewLevel = async () => {
  if (selectUnlockLevel.value == "") {
    isValidateSelectUnlockLevel.value = true;
    return;
  }

  const courseStore = useCourseStore();
  const systemStore = useSystemStore();

  try {
    isValidateSelectUnlockLevel.value = false;
    isShowDialogUnlockLevel.value = false;
    isShowLoading.value = true;

    let response = await courseStore.addCourse(selectUnlockLevel.value.level);

    if (response == "success") {
      let findCourseId = courseStore.courseLevelOptions.find(
        (x) => x.value == selectUnlockLevel.value.level
      );

      if (findCourseId) {
        practiceStore.setPracticelevel(selectUnlockLevel.value.level.toString());

        await studentStore.updateCurrentCourseId(findCourseId.id);

        practiceStore.practiceUpdateByLevel();

        systemStore.systemData.activeStatus.isHasUnlockLevel = false;

        isShowDialogSuccessUnlockLevel.value = true;

        isShowLoading.value = false;
      }
    }
  } catch (e) {
    // console.log(e);
    isShowDialogUnlockLevel.value = true;
    isShowLoading.value = false;
  }
};
// #endregion

// #region Check Unlock Level
const diffInDays = ref("");
const funcCheckUnlockLevel = async () => {
  isShowLoading.value = true;
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  try {
    let response = await studentStore.checkUnlockLevel();

    if (response.status != 200) {
      throw new Error(response.data.message);
    }

    // diffInDays.value = 50;
    diffInDays.value = response.data.diffInDays || 0;

    if (response.data.message == "unlock") {
      selectUnlockLevel.value = {
        level: practiceStore.practiceLockData.value,
        label: `ระดับ ${practiceStore.practiceLockData.value}`,
      };
      isShowDialogUnlockLevel.value = true;
      systemStore.systemData.activeStatus.isHasUnlockLevel = true;
    } else {
      isShowDialogLockLevel.value = true;
      systemStore.systemData.activeStatus.isHasUnlockLevel = false;
    }

    isShowLoading.value = false;
  } catch (e) {
    isShowDialogUnlockLevel.value = false;
    systemStore.systemData.activeStatus.isHasUnlockLevel = false;
    console.log(e);
  }
};
// #endregion

// #region Close dialog unlock level
const funcCloseDialogUnlockLevel = () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  isShowDialogUnlockLevel.value = false;
  isShowDialogLockLevel.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
// #endregion

// #region Confirm dialog success unlock level
const funcConfirmDialogSuccessUnlockLevel = async () => {
  isShowDialogSuccessUnlockLevel.value = false;

  selectUnlockLevel.value = "";

  setTimeout(() => {
    emit("callback-unlockLevel");
  }, 500);
};
// #endregion

// #region Select Unlock level
const funcSelectUnlockLevel = (item) => {
  selectUnlockLevel.value = item;
};
// #endregion

watch(
  () => isShowDialogLockLevel.value,
  (val) => {
    if (!val) {
      emit("callback-closeDialog");
    }
  }
);

onMounted(() => {
  const studentStore = useStudentStore();
  const courseStore = useCourseStore();

  if (studentStore.studentType != "school") {
    if (studentStore.studentData.isSelectedLevel) {
      if (courseStore.courseLevelOptions.length != 12) {
        funcCheckUnlockLevel();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 330px;
}

.box-dialog-content {
  top: 22%;
  width: 90%;
  height: 78%;
  color: #512a08;
  padding: 12px;
  margin: auto;
}

.box-selected-level {
  width: 100%;
  height: 30px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background-color: #fff;
  color: #939393;
  cursor: pointer;
  margin: 4px auto;
  padding: 0px 10px;
}

.box-selected-level.error {
  border: 1px solid #f00;
}

.box-item {
  cursor: pointer;
  padding: 7px;
  color: #000;
}

.box-item:hover {
  background-color: #ddd;
  color: #000;
}

.box-item-active {
  background-color: #ddd;
  color: #000;
}

.box-button-content {
  margin: 16px 0px;
}

.box-button-confirm {
  margin: 30px 0px;
}

.text-link {
  width: fit-content;
  color: #0094ff;
  cursor: pointer;
  text-decoration: underline;
}

.text-dialog-content {
  color: #4a261b;
}

.box-lock-level-content {
  width: fit-content;
  background-color: #512a08;
  border-radius: 20px;
  padding: 10px;
  color: #fff;
}
</style>
