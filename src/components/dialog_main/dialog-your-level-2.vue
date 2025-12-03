<template>
  <q-dialog v-model="isShowDialogYourLevel" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-recommend-container relative-position">
          <div class="sub" align="center">
            <div class="font-mali-b f20">ระดับที่สอบวัดระดับได้</div>

            <div style="width: 100%; padding: 0px 8px">
              <div class="box-show-level font-mali-b">
                <div class="f20">ระดับ</div>
                <div class="" style="line-height: 80px">
                  {{ studentStore.placementTestLevel }}
                </div>
                <div class="f14 font-mali-m" style="margin-top: 12px">
                  {{ `( ระดับที่แนะนำตามอายุ : ${studentStore.levelForAge} )` }}
                </div>
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

            <div style="width: 100%; z-index: 1" class="relative-position" align="center">
              <div style="width: 142px">
                <q-img
                  class="cursor-pointer"
                  src="/images/button_main/button-choose-package.webp"
                  no-spinner
                  no-transition
                  @click="funcNextToPackage()"
                ></q-img>
              </div>
            </div>

            <div class="relative-position q-mb-sm" style="z-index: 1; line-height: 5px">
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
              src="/images/label_main/label-header-your-level.webp"
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
import dialogTableOfContent from "./dialog-table-of-content.vue";
import dialogMaintenance from "./dialog-maintenance.vue";

import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { ref } from "vue";
import { useRouter } from "vue-router";

const $router = useRouter();

const emits = defineEmits(["close-dialog"]);

const studentStore = useStudentStore();
const courseStore = useCourseStore();

const isShowDialogYourLevel = ref(true);
const isDialogShowTableOfContent = ref(false);
const isShowDialogMaintenance = ref(false);

const funcNextToPackage = () => {
  isShowDialogYourLevel.value = false;

  setTimeout(() => {
    // isShowDialogMaintenance.value = true;
    $router.push("/subscribepackage");
  }, 50);
};

const funcCloseDialog = () => {
  isShowDialogYourLevel.value = false;
  isShowDialogMaintenance.value = false;

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
    padding: 72px 16px 16px 16px;
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
      padding: 16px 12px;
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
</style>
