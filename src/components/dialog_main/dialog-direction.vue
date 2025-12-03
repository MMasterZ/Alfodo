<template>
  <q-dialog v-model="isShowDialogDirection" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container relative-position">
          <div class="box-sub-dialog" align="center">
            <div class="f16 font-mali-b box-text-name" align="center">
              {{ `${funcChangeNameSkill(practiceStore.practiceType)}` }}
            </div>
            <div class="box-level-unit relative-position" align="center">
              <q-img src="/images/box_main/box-prepare-level-unit.webp" no-spinner no-transition></q-img>
              <div class="absolute-center full-width f12 row justify-center">
                <div class="col self-cecnter font-fredoka" align="right">
                  <span class="relative-position">{{ ` Level ` }}</span>
                  <span class="relative-position text-level" style="margin-left: 2px">{{
                    ` ${practiceStore.level} `
                  }}</span>
                </div>
                <div class="q-mx-sm self-cecnter">
                  {{ ` - ` }}
                </div>
                <div class="col self-cecnter font-mali-b" align="left">
                  <span class="relative-position">{{ ` บทที่ ` }}</span>
                  <span class="relative-position" style="margin-left: 2px">{{
                    ` ${practiceStore.unit} `
                  }}</span>
                </div>
              </div>
            </div>

            <div class="box-content-dialog f14 font-mali-sb" align="left">
              <div>
                {{ `${practiceStore.direction.eng}` }}
              </div>
              <div class="box-separator"></div>
              <div>
                {{ `${practiceStore.direction.th}` }}
              </div>
            </div>

            <div class="box-button-start">
              <q-img class="button-active-main" width="144px" src="/images/button_main/button-start-practice.webp"
                no-spinner no-transition @click="funcCloseDialog()"></q-img>
            </div>
          </div>

          <div class="absolute-top box-label-direction-back">
            <q-img src="/images/label_main/label-direction-back.webp" no-spinner no-transition></q-img>
          </div>

          <div class="absolute-top box-label-direction " style="width:110%;margin:auto">
            <q-img src="/images/label_main/label-direction-front.webp" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { usePracticeStore } from "src/stores/practice";

import { funcChangeNameSkill } from "src/router";
import { ref } from "vue";

// Emit
const emit = defineEmits(["callback-closeDialog"]);

// Store
const practiceStore = usePracticeStore();

const isShowDialogDirection = ref(true);

const funcCloseDialog = () => {
  isShowDialogDirection.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 280px;
  padding: 6px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4e2a02;

  & .box-sub-dialog {
    width: 100%;
    height: 100%;
    padding: 44px 8px 16px 8px;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

    // Text Name Practice
    & .box-text-name {
      text-shadow: rgb(255, 255, 255) 2px 0px 0px,
        rgb(255, 255, 255) 1.75517px 0.958851px 0px,
        rgb(255, 255, 255) 1.0806px 1.68294px 0px,
        rgb(255, 255, 255) 0.141474px 1.99499px 0px,
        rgb(255, 255, 255) -0.832294px 1.81859px 0px,
        rgb(255, 255, 255) -1.60229px 1.19694px 0px,
        rgb(255, 255, 255) -1.97998px 0.28224px 0px,
        rgb(255, 255, 255) -1.87291px -0.701566px 0px,
        rgb(255, 255, 255) -1.30729px -1.5136px 0px,
        rgb(255, 255, 255) -0.421592px -1.95506px 0px,
        rgb(255, 255, 255) 0.567324px -1.91785px 0px,
        rgb(255, 255, 255) 1.41734px -1.41108px 0px,
        rgb(255, 255, 255) 1.92034px -0.558831px 0px, #fff 0px 3px 0px;
    }

    // Text Level & Unit
    & .box-level-unit {
      color: #fff;
      width: 173px;
      margin: 8px 0px 16px;
      text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
        rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
        rgb(74, 38, 27) -0.832294px 1.81859px 0px,
        rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px,
        rgb(74, 38, 27) -1.87291px -0.701566px 0px,
        rgb(74, 38, 27) -1.30729px -1.5136px 0px,
        rgb(74, 38, 27) -0.421592px -1.95506px 0px,
        rgb(74, 38, 27) 0.567324px -1.91785px 0px,
        rgb(74, 38, 27) 1.41734px -1.41108px 0px,
        rgb(74, 38, 27) 1.92034px -0.558831px 0px;

      & .text-level {
        color: #ffbf19;
      }
    }

    & .box-content-dialog {
      width: 100%;
      padding: 16px 8px;
      border-radius: 12px;
      background: #efd080;
      margin: 12px 0px 16px;

      & .box-separator {
        width: 100%;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.2);
        margin: 8px auto;
      }
    }
  }

  // Label
  & .box-label-direction {
    top: -20px;
    width: 352px;
    left: 50%;
    transform: translateX(-50%);

  }

  & .box-label-direction-back {
    top: -20px;
    width: 352px;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }
}

// #region Button
.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  cursor: pointer;

  &:active {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
  }
}

// #endregions</style>
