<template>
  <!-- #region Unlock -->
  <q-dialog
    maximized
    v-model="systemStore.activeState.isShowDialogUnlockLevel"
    persistent
    class="z-max"
  >
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
              <span v-if="studentStore.studentType == 'online'">
                {{ `ปลดล็อก Winner English` }}
              </span>
              <span v-else>
                {{ `ทดลองเรียน Winner English` }}
              </span>
            </div>

            <div align="center" style="margin: 16px 0px">
              <span v-if="studentStore.studentType == 'online'">
                {{
                  `บทเรียนทั้ง 16 บทเรียนถูกปลดล็อกแล้ว !! กรุณาเลือกระดับเพื่อเข้าเรียน`
                }}
              </span>

              <span v-else>
                {{ `บทเรียนทดลองเรียนถูกปลดล็อกแล้ว !! กรุณาเลือกระดับเพื่อเข้าเรียน` }}
              </span>
            </div>

            <div>
              <div class="f12 font-mali-m">
                {{ `เลือกระดับที่ต้องการ` }}
              </div>
              <div
                class="box-selected-level row items-center"
                :class="isValidateSelectUnlockLevel ? 'error' : ''"
              >
                <div class="f14 col">
                  <span v-if="selectUnlockLevel == ''">
                    {{ `เลือกระดับที่ต้องการ` }}
                  </span>
                  <span class="text-black font-mali-m" v-else>
                    {{ `${selectUnlockLevel.label}` }}
                  </span>
                </div>
                <div
                  class="self-center"
                  style="width: 20px; margin-top: -3px"
                  align="right"
                >
                  <q-icon name="fas fa-caret-down" size="20px"></q-icon>
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
                @click="funcConfirmSelectLevel()"
              ></q-img>
            </div>

            <div class="" align="center">
              <div
                class="text-link f12 font-mali-m"
                @click="funcCloseDialogUnlockLevel()"
              >
                {{ `ตัดสินใจภายหลัง` }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Success -->
  <q-dialog maximized v-model="isShowDialogSuccessUnlockLevel" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position box-dialog-success-container">
          <q-img src="/images/dialog_main/dialog-success-first-unlock-level.png"> </q-img>

          <div class="absolute-top box-dialog-success-content">
            <div class="box-dialog-success-show-level font-mali-b">
              <div class="f16" align="center">ระดับ</div>
              <div class="text-success-level" align="center">
                {{ `${selectUnlockLevel.level}` }}
              </div>
            </div>
            <div class="col-12 text-dialog-content">
              <div align="center" style="margin: 16px 0px">
                <span class="f20 font-mali-b">
                  {{ `เป็นระดับที่คุณเลือก` }}
                </span>
              </div>
              <div align="center" style="margin: 16px 0px">
                <span class="f14 font-mali-r">
                  {{ `กด “เริ่มกันเลย” เข้าสู่ Winner English` }}
                </span>
              </div>

              <div align="center">
                <q-img
                  width="120px"
                  class="cursor-pointer"
                  src="/images/button_main/button-start-now.png"
                  @click="funcConfirmDialogSuccessUnlockLevel()"
                ></q-img>
              </div>
            </div>
          </div>
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
import { computed, ref, watch } from "vue";
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { usePracticeStore } from "src/stores/practice";
import dialogTableOfContent from "./dialog-table-of-content.vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["callback-close"]);

// Initialze data
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const isShowLoading = ref(false);
const isShowDialogTableOfContents = ref(false);

// Initialize store
const systemStore = useSystemStore();
const studentStore = useStudentStore();

// #region Dialog Status
const isShowDialogSuccessUnlockLevel = ref(false);
const isValidateSelectUnlockLevel = ref(false);
// #endregion

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

// #region Function
// const funcAddNewLevel = async () => {
//   if (selectUnlockLevel.value == "") {
//     isValidateSelectUnlockLevel.value = true;
//     return;
//   }

//   const courseStore = useCourseStore();
//   const systemStore = useSystemStore();

//   try {
//     isValidateSelectUnlockLevel.value = false;
//     isShowLoading.value = true;

//     let response = await courseStore.addCourse(selectUnlockLevel.value);

//     if (response == "success") {
//       setTimeout(() => {
//         systemStore.systemData.activeState.isShowDialogUnlockLevel = false;
//         systemStore.systemData.activeStatus.isHasUnlockLevel = false;
//         isShowDialogSuccessUnlockLevel.value = true;
//         systemStore.systemData.activeStatus.isShowButtonClose = true;
//         isShowLoading.value = false;
//       }, 1000);
//     }
//   } catch (e) {
//     // console.log(e);
//     systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
//     isShowLoading.value = false;
//   }
// };

// const diffInDays = ref("");
// const funcCheckUnlockLevel = async () => {
//   isShowLoading.value = true;
//   const studentStore = useStudentStore();
//   const systemStore = useSystemStore();

//   let response = await studentStore.checkUnlockLevel();

//   if (response.status == 200) {
//     diffInDays.value = response.data.diffInDays || 0;

//     if (response.data.message == "unlock") {
//       systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
//       systemStore.systemData.activeStatus.isHasUnlockLevel = true;
//     } else {
//       systemStore.systemData.activeState.isShowDialogUnlockLevel = false;
//       systemStore.systemData.activeStatus.isHasUnlockLevel = false;
//     }
//   } else {
//     systemStore.systemData.activeState.isShowDialogUnlockLevel = false;
//     systemStore.systemData.activeStatus.isHasUnlockLevel = false;
//   }

//   isShowLoading.value = false;
// };

const funcCloseDialogUnlockLevel = () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  systemStore.systemData.activeState.isShowDialogUnlockLevel = false;

  isValidateSelectUnlockLevel.value = false;
};

const funcConfirmDialogSuccessUnlockLevel = async () => {
  const courseStore = useCourseStore();
  const studentStore = useStudentStore();
  const practiceStore = usePracticeStore();

  if (courseStore.courseLevelOptions.length == 1) {
    isShowDialogSuccessUnlockLevel.value = false;
    return;
  }

  isShowLoading.value = true;

  try {
    // await courseStore.addCourse(selectUnlockLevel.value.level);

    let findCourseId = courseStore.courseLevelOptions.find(
      (x) => x.value == selectUnlockLevel.value.level
    );

    if (findCourseId) {
      practiceStore.setPracticelevel(selectUnlockLevel.value.level.toString());

      await studentStore.updateCurrentCourseId(findCourseId.id);

      selectUnlockLevel.value = "";

      isShowLoading.value = false;
    }
  } catch (e) {
    isShowDialogSuccessUnlockLevel.value = true;

    isShowLoading.value = false;
  }
};
// #endregion

// #region Select Unlock level
const funcSelectUnlockLevel = (item) => {
  selectUnlockLevel.value = item;

  isValidateSelectUnlockLevel.value = false;
};
// #endregion

// #region Confirm Select Level
const funcConfirmSelectLevel = async () => {
  console.clear();
  const courseStore = useCourseStore();
  const systemStore = useSystemStore();
  const practiceStore = usePracticeStore();

  if (selectUnlockLevel.value == "") {
    isValidateSelectUnlockLevel.value = true;
    return;
  }

  try {
    isValidateSelectUnlockLevel.value = false;
    systemStore.systemData.activeState.isShowDialogUnlockLevel = false;
    $q.loading.show({
      message: "กำลังปลดล็อกระดับ",
    });

    let response = await courseStore.addCourse(selectUnlockLevel.value.level);

    if (response == "success") {
      practiceStore.setPracticelevel(selectUnlockLevel.value.level);

      $q.loading.show({
        message: "กำลังโหลดข้อมูลแบบฝึกหัด",
      });

      await practiceStore.getPracticeListName();
      await practiceStore.getPracticeList();
      await practiceStore.getPracticeLog();
      await practiceStore.getUnitProgress();
      await practiceStore.checkFirstTimeShowDialogLessonAchievement();

      isShowDialogSuccessUnlockLevel.value = true;
    }

    $q.loading.hide();
  } catch (e) {
    // console.log(e);
    isShowLoading.value = false;
    $q.loading.hide();
    systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
  }
};
// #endregion

watch(
  () => {
    const systemStore = useSystemStore();
    return systemStore.systemData.activeState.isShowDialogUnlockLevel;
  },
  () => {
    const systemStore = useSystemStore();
    if (systemStore.systemData.activeState.isShowDialogUnlockLevel) {
      selectUnlockLevel.value = "";
    }
  }
);
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

.box-dialog-success-container {
  width: 350px;
}

.box-dialog-success-content {
  top: 20%;
  width: 85%;
  height: 73%;
  padding: 10px 15px;
  margin: auto;
}

.box-dialog-success-show-level {
  height: 160px;
  border-radius: 10px;
  border: 2px solid #c96814;
  background: #fff;
  padding: 12px;
  color: #4a261b;
}

.text-success-level {
  font-size: 96px;
  line-height: 1.2;
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
  background-color: #f8e2e2;
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
  margin: 16px 0px;
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
