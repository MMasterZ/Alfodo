<template>
  <q-dialog v-model="isShowDialogrecommendLevel" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-recommend-container relative-position">
          <div class="sub" align="center">
            <div class="font-mali-b f20">ระดับที่แนะนำตามอายุ</div>

            <div style="width: 100%; padding: 0px 8px">
              <div class="box-show-level font-mali-b">
                <div class="f20">ระดับ</div>
                <div style="line-height: 80px">{{ `${studentStore.levelForAge}` }}</div>
              </div>
            </div>

            <div style="width: 130px">
              <q-img
                class="cursor-pointer"
                src="/images/button_main/button-table-of-content.png"
                @click="isDialogShowTableOfContent = true"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div class="row justify-between" style="width: 100%">
              <div style="width: 124px">
                <q-img
                  class="cursor-pointer"
                  src="/images/button_main/button-placement-test.webp"
                  no-spinner
                  no-transition
                  @click="funcGoToPlacementTest()"
                ></q-img>
              </div>
              <div style="width: 124px">
                <q-img
                  class="cursor-pointer"
                  src="/images/button_main/button-choose-package.webp"
                  no-spinner
                  no-transition
                  @click="funcNextToPackage()"
                ></q-img>
              </div>
            </div>

            <div class="relative-position" style="z-index: 1">
              <span
                class="f12 font-mali-m cursor-pointer"
                style="text-decoration: underline; color: #0085ff"
                @click="funcCloseDialog()"
                >ตัดสินใจภายหลัง</span
              >
            </div>
          </div>

          <div class="absolute-center" style="top: 30px; width: 380px">
            <q-img
              width="100%"
              src="/images/label_main/label-header-recommend-level.webp"
              no-transition
              no-spinner
            ></q-img>
          </div>
          <div class="absolute-center" style="top: 95.3%; width: 330px">
            <q-img
              width="100%"
              src="/images/box_main/box-footer-recommend-level.webp"
              no-transition
              no-spinner
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isShowDialogSkipPlacement" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position box-dialog-skip">
          <div class="sub" align="center">
            <div class="font-mali-b f20" style="line-height: normal">
              ข้ามการสอบวัดระดับ
            </div>
            <div class="q-my-sm">
              <div>เมื่อข้ามการสอบแล้ว</div>
              <div>จะไม่สามารถกลับมาสอบวัดระดับได้อีก</div>
            </div>

            <div class="row justify-between" style="width: 100%">
              <div class="col-1 box-button-main" v-close-popup>
                <q-img
                  src="/images/button_main/button-cancel-skip-placement.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="col-1 box-button-main" @click="funcSkipPlacementTest()">
                <q-img
                  src="/images/button_main/button-confirm-skip-placement.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <dialog-table-of-content
    v-if="isDialogShowTableOfContent"
    @callback-closeTableOfContent="isDialogShowTableOfContent = false"
  ></dialog-table-of-content>

  <dialog-maintenance
    v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="funcCloseDialog()"
  ></dialog-maintenance>
</template>

<script setup>
import { useQuasar } from "quasar";
import dialogTableOfContent from "./dialog-table-of-content.vue";
import dialogMaintenance from "./dialog-maintenance.vue";

import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { ref } from "vue";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();

const emits = defineEmits(["close-dialog"]);

const studentStore = useStudentStore();
const courseStore = useCourseStore();

const isShowDialogrecommendLevel = ref(true);
const isShowDialogSkipPlacement = ref(false);
const isDialogShowTableOfContent = ref(false);
const isShowDialogMaintenance = ref(false);

const funcGoToPlacementTest = () => {
  isShowDialogrecommendLevel.value = false;

  $router.push("/placement");
};

const funcNextToPackage = () => {
  isShowDialogSkipPlacement.value = true;
};

const funcSkipPlacementTest = async () => {
  $q.loading.show();

  await studentStore.skipPlacementTest();

  isShowDialogSkipPlacement.value = false;
  isShowDialogrecommendLevel.value = false;

  setTimeout(() => {
    // isShowDialogMaintenance.value = true;
    $router.push("/subscribepackage");
    $q.loading.hide();
  }, 100);
};

const funcCloseDialog = () => {
  isShowDialogrecommendLevel.value = false;

  setTimeout(() => {
    emits("close-dialog");
  }, 250);
};
</script>

<style lang="scss" scoped>
.box-recommend-container {
  display: flex;
  width: 308px;
  padding: 8px;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  & .sub {
    display: flex;
    padding: 72px 14px 16px 14px;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    color: #512a08;

    & .box-show-level {
      display: flex;
      padding: 16px 12px 24px 12px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-self: stretch;
      border-radius: 10px;
      border: 2px solid #c96814;
      background: #fff;
      font-size: 96px;
    }
  }
}

.box-dialog-skip {
  display: flex;
  width: 318px;
  padding: 6px;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  & .sub {
    display: flex;
    padding: 24px 12px 12px 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    flex: 1 0 0;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    color: #4a261b;
  }
}

.box-button-main {
  width: 130px;
  height: 48px;
  padding: 1px 1px 4px 1px;
  cursor: pointer;
}
</style>
