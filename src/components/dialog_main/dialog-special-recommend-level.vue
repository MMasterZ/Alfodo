<template>
    <div class="relative-position fit animate__animated" :class="isShowDialogSpecialRecommendLevel ? 'animate__fadeIn' : 'animate__fadeOut'">
      <div class="absolute-center box-special-recommend-level-main" :class="{'mobile': isMobile}">
        <div class="relative-position fit">
          <div>
            <q-img src="/images/dialog_main/dialog-special-recommend-level.webp" no-spinner no-transition></q-img>
          </div>

          <div class="absolute-center box-header-special-recommend-level-light" :class="{'mobile': isMobile}">
            <q-img src="/images/box_main/box-header-special-recommend-level-light.webp" no-spinner no-transition></q-img>
          </div>
          <div class="absolute-center box-header-special-recommend-level" :class="{'mobile': isMobile}">
            <q-img src="/images/box_main/box-header-special-recommend-level.webp" no-spinner no-transition></q-img>
          </div>

          <div class="absolute-top box-body-special-recommend-level" :class="{'mobile': isMobile}">
            <div class="text-header-special-recomment-level font-mali-b" :class="{'mobile': isMobile}" align="center">
              ระดับที่แนะนำตามอายุ
            </div>

            <div class="box-show-age-of-special-recommend-level font-mali-b row justify-center items-center" :class="{'mobile': isMobile}">
              <div class="self-center">
                ระดับ
              </div>
              <div class="self-center text-age-of-special-recommend-level">
                {{ `${studentStore.levelForAge}` }}
              </div>
            </div>

            <div class="box-table-of-content cursor-pointer" :class="{'mobile': isMobile}">
              <q-img
                src="/images/button_main/button-table-of-content.webp"
                @click="isDialogShowTableOfContent = true"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div class="button-trial-placement-test cursor-pointer" :class="{'mobile': isMobile}" @click="funcGoToPlacementTest()">
              <q-img
                src="/images/button_main/button-trial-placement-test.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="button-choose-trial-level cursor-pointer" :class="{'mobile': isMobile}" @click="funcShowDialogSkipPlacement()">
              <q-img
                src="/images/button_main/button-choose-trial-level.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="text-close-special-recommend-level" :class="{'mobile': isMobile}" align="center" @click="funcCloseDialogSpecialRecommendLevel()">
              ตัดสินใจภายหลัง
            </div>

            <div class="box-footer-icon-special-recommend-level absolute-bottom-right" :class="{'mobile': isMobile}">
              <q-img src="/images/icon_main/icon-footer-special-recommend-level.webp" no-spinner no-transition></q-img>
            </div>
          </div>

        </div>

      </div>
    </div>

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

  <!-- #region Dialog Table of content -->
  <dialog-table-of-content
    v-if="isDialogShowTableOfContent"
    @callback-closeTableOfContent="isDialogShowTableOfContent = false"
  ></dialog-table-of-content>
  <!-- #endregion -->
</template>

<script setup>
import { useQuasar } from "quasar";
import dialogTableOfContent from "./dialog-table-of-content.vue";

import { useStudentStore } from "src/stores/student";
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";

const emits = defineEmits(["callback-closeDialog","callback-skipPlacementTest"]);

const $q = useQuasar()
const $router = useRouter();

const studentStore = useStudentStore();

const isShowDialogSpecialRecommendLevel = ref(true)
const isDialogShowTableOfContent = ref(false)
const isShowDialogSkipPlacement = ref(false)
const isMobile = ref($q.platform.is.mobile);

const funcShowDialogSkipPlacement = () => {
  isShowDialogSkipPlacement.value = true;
}

const funcGoToPlacementTest = () => {
  isShowDialogSpecialRecommendLevel.value = false;

  studentStore.student.data.isSevenDayTrial = true;

  $router.replace("/placement");
};

const funcSkipPlacementTest = async () => {
  $q.loading.show();

  await studentStore.skipPlacementTest();

  isShowDialogSkipPlacement.value = false;
  isShowDialogSpecialRecommendLevel.value = false;

  setTimeout(() => {
    emits("callback-skipPlacementTest");
    $q.loading.hide();
  }, 100);
};

const funcCloseDialogSpecialRecommendLevel = () => {
  isShowDialogSpecialRecommendLevel.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 200);
}

</script>

<style lang="scss" scoped>

.box-special-recommend-level-main{
  width:19.4141%;
  top:62.4856%;

  &.mobile{
    width:310px;
    top:57.5%;
  }

  & .box-header-special-recommend-level{
    width:166.12%;
    top:0%;
    margin:auto;
  }

  & .box-header-special-recommend-level-light{
    width:158.069%;
    top:-18%;
    margin:auto;
  }

  & .box-body-special-recommend-level{
    width:97%;
    height:95%;
    padding: clamp(50px,5cqw,80px) clamp(21.40px,2.14062cqw,34.25px) 0px;
    margin:auto;

    &.mobile{
      padding: 75px 34px 0px;
    }

    & .text-header-special-recomment-level{
      color: #FFF;
      font-size: clamp(12.5px,1.25cqw,20px);
      line-height: clamp(15px,1.5cqw,24px);
      text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px, rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px, rgb(74, 38, 27) -0.653644px -0.756802px 0px, rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;

      &.mobile{
        font-size:20px;
        line-height:24px;
      }
    }

    & .box-show-age-of-special-recommend-level{
      color:#4A261B;
      border-radius: clamp(6.25px,0.625cqw,10px);
      border: clamp(1.25px,0.125cqw,2px) solid #C96814;
      background: #FFF;
      padding: clamp(10px,1cqw,16px) clamp(7.5px,0.75cqw,12px) clamp(15px,1.5cqw,24px) clamp(7.5px,0.75cqw,12px);
      font-size: clamp(12.5px,1.25cqw,20px);
      line-height: clamp(15px,1.5cqw,24px);
      margin:clamp(10px,1cqw,16px) 0px;

      &.mobile{
        height:93px;
        border-radius: 10px;
        border-width: 2px;
        padding: 16px 12px 24px 12px;
        font-size:20px;
        line-height:24px;
        margin:16px 0px;
      }

      & .text-age-of-special-recommend-level{
        font-size:clamp(40px,4cqw,64px);
        line-height: clamp(31.25px,3.125cqw,50px);
        margin-left:clamp(10px,1cqw,16px);

        &.mobile{
          font-size:64px;
          line-height:50px;
          margin-left:16px;
        }
      }
    }

    & .box-table-of-content{
      width:56.265%;
      margin:clamp(10px,1cqw,16px) auto;

      &.mobile{
        width:131px;
        margin:16px auto;
      }
    }

    & .button-trial-placement-test{
      width:94.925%;
      margin: clamp(5px,0.5cqw,8px) auto;

      &.mobile{
        width:221px;
        margin:8px auto;
      }
    }

    & .button-choose-trial-level{
      width:94.925%;
      margin: clamp(5px,0.5cqw,8px) auto;

      &.mobile{
        width:221px;
        margin:8px auto;
      }
    }

    & .text-close-special-recommend-level{
      color:#fff;
      text-decoration: underline;
      font-size:clamp(7.5px,0.75cqw,12px);
      line-height:clamp(12.5px,1.25cqw,20px);
      margin-top:clamp(6.25px,0.625cqw,10px);
      cursor:pointer;

      &.mobile{
        font-size:12px;
        line-height:20px;
        margin-top:16px;
      }
    }

    & .box-footer-icon-special-recommend-level{
      width:43.48%;
      bottom:-7%;
      right:-17%;


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
