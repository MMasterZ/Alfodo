<template>
  <!-- #region Dialog Level Expired -->
  <q-dialog v-model="isShowDialogLevelExpired" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position box-dialog-main">
          <div class="sub-dialog" align="center">
            <div class="f20 font-mali-b">ระดับการเรียนหมดอายุ</div>
            <div class="q-mt-md f14 font-mali-r">
              ระดับการเรียนนี้ได้หมดอายุแล้ว <br />
              สามารถเรียนต่อโดยการต่ออายุ <br />
              ได้ที่หน้าแพ็กเกจการเรียน <br />
            </div>
            <div
              class="row justify-center relative-position"
              style="margin-top: 24px; margin-bottom: 8px; z-index: 1"
              v-if="courseStore.isAllCourseExpired"
            >
              <div class="col-1 q-mr-xs" style="width: 124px">
                <q-img
                  class="cursor-pointer"
                  src="/images/subscribe_payment/button-back-to-lobby.webp"
                  no-spinner
                  no-transition
                  @click="funcCloseDialog()"
                ></q-img>
              </div>

              <div class="col-1 q-ml-xs" style="width: 124px">
                <q-img
                  class="cursor-pointer"
                  src="/images/subscribe_payment/button-go-to-package.webp"
                  no-spinner
                  no-transition
                  @click="funcGotoPackage()"
                ></q-img>
              </div>
            </div>

            <div class="relative-position" style="margin-top: 24px; z-index: 2" v-else>
              <div>
                <q-img
                  class="cursor-pointer"
                  src="/images/subscribe_payment/button-go-to-package-long.webp"
                  no-spinner
                  no-transition
                  @click="funcGotoPackage()"
                ></q-img>
              </div>
              <div class="q-mt-sm">
                <q-img
                  class="cursor-pointer"
                  src="/images/subscribe_payment/button-go-to-choose-level.webp"
                  no-spinner
                  no-transition
                  @click="funcShowDialogChooseLevel()"
                ></q-img>
              </div>
              <div class="text-underline f12 font-mali-m q-mt-md">
                <span class="cursor-pointer" @click="funcCloseDialog()"
                  >กลับหน้าหลัก</span
                >
              </div>
            </div>
          </div>

          <div class="absolute-center box-label-header">
            <q-img
              src="/images/subscribe_payment/box-header-level-expired.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
          <div class="absolute-center box-label-footer">
            <q-img
              src="/images/subscribe_payment/box-footer-level-expired.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Choose Level -->
  <q-dialog v-model="isShowDialogChooseLevel" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main">
          <div class="sub-dialog choose-level" align="center">
            <div class="f20 font-mali-b">เลือกระดับการเรียน</div>
            <div class="q-my-lg">
              <div class="box-select-main cursor-pointer">
                <div class="row">
                  <div class="col f14 font-mali-m" align="left">
                    <span style="color: #a6a6a6" v-if="!selectedLevel">เลือก</span>
                    <span class="font-mali-b" v-else>
                      {{ `${selectedLevel.label}` }}</span
                    >
                  </div>
                  <div>
                    <q-icon name="fas fa-caret-down"></q-icon>
                  </div>
                </div>

                <q-menu
                  fit
                  anchor="bottom left"
                  class="shadow-0 transparent"
                  self="top left"
                  :offset="[0, 8]"
                  auto-close
                >
                  <div style="width: 100%">
                    <div class="box-menu-main font-mali-b f14">
                      <div class="box-menu-scroll">
                        <div
                          class="row box-select cursor-pointer"
                          v-for="(item, index) in comCourseLevelOptions"
                          :key="index"
                          @click="selectedLevel = item"
                        >
                          <div>
                            {{ `${item.label}` }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-menu>
              </div>
            </div>
            <div>
              <q-img
                class="cursor-pointer"
                width="128px"
                src="/images/subscribe_payment/button-confirm.webp"
                no-spinner
                no-transition
                @click="funcConfirmLevel()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { useCourseStore } from "src/stores/course";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { computed, ref } from "vue";

const $q = useQuasar();

// Emits
const emits = defineEmits(["callback-closeDialog", "callback-gotoPackage"]);

// Store
const studentStore = useStudentStore();
const practiceStore = usePracticeStore();
const courseStore = useCourseStore();
const systemStore = useSystemStore();

// Data
const selectedLevel = ref(null);

// Dialog
const isShowDialogLevelExpired = ref(true);
const isShowDialogChooseLevel = ref(false);

// Function
const funcShowDialogChooseLevel = () => {
  isShowDialogLevelExpired.value = false;

  setTimeout(() => {
    isShowDialogChooseLevel.value = true;
  }, 50);
};

const funcGotoPackage = () => {
  isShowDialogLevelExpired.value = false;

  emits("callback-gotoPackage");
};

const funcConfirmLevel = async () => {
  $q.loading.show();

  isShowDialogChooseLevel.value = false;
  -systemStore.setParameter({
    level: selectedLevel.value.level,
  });

  practiceStore.setLockPracticeData(selectedLevel.value.level);

  practiceStore.setPracticeUnit("1");

  try {
    practiceStore.setPracticelevel(selectedLevel.value.level.toString());

    await studentStore.updateCurrentCourseId(selectedLevel.value.id);

    practiceStore.practiceUpdateByLevel();

    await practiceStore.getPracticeLog();

    practiceStore.clearPracticeComplete();

    emits("callback-closeDialog");

    $q.loading.hide();
  } catch (e) {
    console.log(e);
    isShowDialogChooseLevel.value = true;
  }
};

const funcCloseDialog = () => {
  isShowDialogLevelExpired.value = false;
  emits("callback-closeDialog");
};

// Computed
const comCourseLevelOptions = computed(() => {
  let temp = [];

  if (courseStore.list.length) {
    temp = courseStore.list
      .map((res) => {
        return {
          level: res.level,
          id: res.courseId,
          expireDate: res.expireDate,
          label: `Level ${res.level}`,
        };
      })
      .filter((res) => {
        let e_date = new Date(`${res.expireDate._seconds * 1000}`);

        let e_timestamp = e_date.getTime();

        return systemStore.datetime.timestamp < e_timestamp;
      });
  }

  return temp;
});
</script>

<style lang="scss" scoped>
.box-dialog-main {
  width: 310px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;

  & .sub-dialog {
    padding: 80px 16px 16px 16px;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    color: #512a08;

    & .text-underline {
      color: #0085ff;
      text-decoration: underline;
    }

    &.choose-level {
      padding: 32px 24px 24px 24px;

      & .box-select-main {
        padding: 8px 16px;
        border-radius: 10px;
        border: 1px solid #4a261b;
        background: #fff;
      }
    }
  }

  & .box-label-header {
    width: 380px;
    top: 25px;
  }

  & .box-label-footer {
    width: 330px;
    top: 93%;
  }
}

.box-menu-main {
  width: 100%;
  border-radius: 10px;
  padding: 6px;
  border: 1px solid #4a261b;
  background: #fff;
  color: #4a261b;

  & .box-menu-scroll {
    height: 200px;
    padding-right: 6px;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #4a261b;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background-color: #fff;
      border-radius: 10px;
    }
  }

  & .box-select {
    padding: 8px 12px 8px;
    border-radius: 6px;

    &:hover {
      background: #4a261b;
      color: #fff;
    }
  }
}
</style>
