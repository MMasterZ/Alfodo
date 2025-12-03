<template>
  <q-dialog v-model="isShowDialogPracticeComplete" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container relative-position">
          <div class="sub-dialog" align="center">
            <div class="f20 font-mali-b">
              {{ `ทำแบบฝึกหัดครบแล้ว` }}
            </div>
            <div class="q-mt-md">
              {{ `ได้ทำแบบฝึกหัดครบทุกจำนวนครั้ง` }}
            </div>
            <div>
              {{ `ตามที่กำหนดเรียบร้อยแล้ว` }}
            </div>

            <div class="box-total-count-container row justify-center font-mali-b">
              <div class="f12 self-center font-mali-sb">
                {{ `การบันทึกคะแนน : ` }}
              </div>
              <div
                class="f10 self-center box-num-of-count row justify-center items-center"
              >
                <span>เหลือ</span>
                <span class="q-px-xs text-red">
                  {{ ` ${0} ` }}
                </span>
                <span>ครั้ง</span>
              </div>
            </div>
          </div>

          <div class="absolute-bottom row justify-around q-px-md" style="bottom: -30px">
            <div class="">
              <q-img
                width="76px"
                class="button-active-main cursor-pointer"
                src="/images/button_main/button-back-to-practice-unit.webp"
                no-spinner
                no-transition
                @click="funcBackToPracticeUnit()"
              ></q-img>
            </div>
            <div class="">
              <q-img
                width="76px"
                :class="
                  practiceStore.practiceCurrentCounter >= 2 ? 'disable' : 'cursor-pointer'
                "
                :src="`/images/button_main/button-restart-practice${
                  practiceStore.practiceCurrentCounter >= 2 ? '-disable' : ''
                }.webp`"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="">
              <q-img
                width="76px"
                class="button-active-main"
                :class="
                  practiceStore.practiceCurrentCounter > 0 && practiceStore.nextPractice
                    ? 'cursor-pointer'
                    : 'disable'
                "
                :src="`/images/button_main/button-next-to-practice${
                  practiceStore.practiceCurrentCounter > 0 && practiceStore.nextPractice
                    ? ''
                    : '-disable'
                }.webp`"
                no-spinner
                no-transition
                @click="funcNextToPractice()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { usePracticeStore } from "src/stores/practice";
import { ref } from "vue";
import { useRouter } from "vue-router";

// Initial
const router = useRouter();

// Store
const practiceStore = usePracticeStore();

const isShowDialogPracticeComplete = ref(true);

const funcBackToPracticeUnit = () => {
  router.replace("/practice/unit");
};

const funcNextToPractice = () => {
  if (practiceStore.nextPractice && practiceStore.practiceCurrentCounter >= 0) {
    router.replace("/landing");
  }
};

const funcRestartPractice = () => {
  if (practiceStore.practiceCurrentCounter >= 2) {
    return;
  }

  isShowDialogPracticeComplete.value = false;
};
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  padding: 6px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4e2a02;

  & .sub-dialog {
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 40px 8px 55px 8px;

    & .box-total-count-container {
      margin-top: 16px;

      & .box-num-of-count {
        width: 76px;
        height: 24px;
        border-radius: 59.4px;
        border: 1.2px solid #512a08;
        background: var(--Primary, linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%));
        padding: 3.5px 0px 0.5px 0px;
        line-height: 0;
        color: #512a08;
        text-shadow: rgb(255, 255, 255) 1px 0px 0px,
          rgb(255, 255, 255) 0.540302px 0.841471px 0px,
          rgb(255, 255, 255) -0.416147px 0.909297px 0px,
          rgb(255, 255, 255) -0.989992px 0.14112px 0px,
          rgb(255, 255, 255) -0.653644px -0.756802px 0px,
          rgb(255, 255, 255) 0.283662px -0.958924px 0px,
          rgb(255, 255, 255) 0.96017px -0.279415px 0px;
        margin: 0px 8px;
      }
    }
  }
}
</style>
