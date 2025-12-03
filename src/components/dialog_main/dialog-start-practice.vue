<template>
  <q-dialog v-model="isShowDialogPrepareReview" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main relative-position">
          <q-img
            :src="`/images/box_main/box-dialog-prepare-review${
              studentStore.studentData.gameTicket >= 5 ? '-show-ticket' : ''
            }.webp`"
            no-spinner
            no-transition
            v-if="
              practiceStore.practiceData.isLesson ||
              practiceStore.practiceType == 'flashcard'
            "
          ></q-img>

          <q-img
            :src="`/images/box_main/box-dialog-direction-${
              synchronizeStore.isSync ? 'control' : 'default'
            }${studentStore.studentData.gameTicket >= 5 ? '-full-ticket' : ''}.webp`"
            no-spinner
            no-transition
            v-if="
              !practiceStore.practiceData.isLesson &&
              practiceStore.practiceType != 'flashcard'
            "
          ></q-img>

          <div class="absolute-top box-icon-prepare">
            <q-img
              src="/images/icon_main/icon-dialog-speaker.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div class="absolute-top box-dialog-content">
            <!-- #region ข้อความ ตั้งใจทำแบบฝึกหัดนะ/เตรียมทบทวนบทเรียน -->
            <div align="center" class="font-mali-b f16">
              <span
                v-if="
                  practiceStore.currentPracticeData.isLesson &&
                  practiceStore.practiceType == 'flashcard'
                "
              >
                เตรียมทบทวนบทเรียน
              </span>
              <span
                v-if="
                  practiceStore.currentPracticeData.isLesson &&
                  practiceStore.practiceType != 'flashcard'
                "
              >
                เตรียมเข้าสู่บทเรียน
              </span>
              <div align="center" v-if="!practiceStore.currentPracticeData.isLesson">
                <div>ตั้งใจทำแบบฝึกหัดนะ</div>
                <div class="f14 font-mali-r q-mt-sm">
                  {{ `แบบฝึกหัดนี้จะมีการเก็บคะแนน` }}
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region เลเวล/ยูนิต/รายละเอียดข้อความต่างๆ -->
            <div class="box-content" align="center">
              <div class="f16 font-mali-b box-text-name">
                {{ `${funcChangeNameSkill(practiceStore.practiceType)}` }}
              </div>
              <div class="box-level-unit relative-position">
                <q-img
                  src="/images/box_main/box-prepare-level-unit.webp"
                  no-spinner
                  no-transition
                ></q-img>
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
              <div class="f14 font-mali-sb" style="line-height: 24px">
                <div v-if="practiceStore.practiceData.isLesson">
                  {{ `ตั้งใจเรียนนะ` }}
                </div>
                <div v-else>
                  {{ `ตั้งใจสำหรับการทำครั้งแรกดีๆ` }}
                </div>
              </div>
              <div class="font-mali-sb q-mt-xs" style="line-height: 24px">
                <div v-if="practiceStore.practiceData.isLesson">
                  {{ `เรียนจบครั้งแรก มีรางวัลให้ด้วย` }}
                </div>
                <div v-else class="row justify-center">
                  <div class="self-center">Bonus</div>
                  <div class="self-center box-text-xp">
                    <q-img
                      src="/images/icon_main/icon-text-xp.webp"
                      no-spinner
                      no-transition
                      width="38.4px"
                    ></q-img>
                  </div>
                  <div class="self-center">มีแค่ครั้งเดียวนะ</div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region แสดงผลตั๋วเล่นเกมเกินกำหนด -->
            <div
              class="box-show-condition-ticket row justify-center"
              v-if="studentStore.studentData.gameTicket >= 5"
              :style="`margin-bottom: ${!synchronizeStore.isSync ? '20px' : '16px'}`"
            >
              <div class="self-center" style="margin-right: 12px">
                <q-img
                  width="32px"
                  src="/images/icon_main/icon-game-ticket.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="f10 font-mali-sb" align="center">
                Play Ticket ถึงจำนวนจำกัดแล้ว <br />
                ไม่สามารถสะสมเพิ่มได้อีก
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region การบันทึกคะแนน -->
            <div
              class="box-times-left row justify-center"
              v-if="
                !synchronizeStore.isSync &&
                !practiceStore.practiceData.isLesson &&
                practiceStore.practiceType != 'flashcard'
              "
            >
              <div class="f12 font-mali-b self-center">
                {{ `การบันทึกคะแนน :` }}
              </div>
              <div
                class="box-count-number row justify-center items-center f10 font-mali-b"
              >
                <div>
                  {{ `เหลือ` }}
                </div>
                <div class="relative-position" style="margin: 0px 4px">
                  {{
                    ` ${
                      practiceStore.practiceCurrentCounter == 2
                        ? 0
                        : practiceStore.practiceCurrentCounter == 0
                        ? "2"
                        : practiceStore.practiceCurrentCounter
                    } `
                  }}
                </div>
                <div>
                  {{ `ครั้ง` }}
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <div align="center" :class="!synchronizeStore.isSync ? 'q-mt-sm' : 'q-mt-md'">
              <q-img
                width="144px"
                class="button-active-main"
                src="/images/button_main/button-ok-long.webp"
                no-spinner
                no-transition
                @click="funcCloseDialog()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { funcChangeNameSkill } from "src/router";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";
import { ref } from "vue";

// Emit
const emit = defineEmits(["callback-closeDialog"]);

const props = defineProps({
  practiceName: {
    type: String,
    default: "",
  },
  practiceData: {
    type: Object,
    default: {},
  },
});

// Store
const studentStore = useStudentStore();
const practiceStore = usePracticeStore();
const synchronizeStore = useSynchronizeStore();

const isShowDialogPrepareReview = ref(true);

// Function
const funcCloseDialog = () => {
  isShowDialogPrepareReview.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 150);
};
</script>

<style lang="scss" scoped>
.box-dialog-main {
  max-width: 280px;
  width: 100%;
  color: #4e2a02;

  & .box-icon-prepare {
    width: 126.935px;
    top: 1px;
    left: 20%;
    margin: auto;
  }

  & .box-dialog-content {
    width: 244px;
    top: 119px;
    margin: auto;

    & .box-content {
      width: 100%;
      height: 149px;
      margin: 8px 0px 16px;
      padding: 8px 8px 12px;
      flex-direction: column;
      border-radius: 12px;
      background: #efd080;

      & .box-text-xp {
        margin: 0px 4px;
      }

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

      & .box-level-unit {
        color: #fff;
        width: 182px;
        margin: 6px 0px 14px;
        text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
          rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
          rgb(74, 38, 27) -0.832294px 1.81859px 0px,
          rgb(74, 38, 27) -1.60229px 1.19694px 0px,
          rgb(74, 38, 27) -1.97998px 0.28224px 0px,
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
    }

    & .box-show-condition-ticket {
      color: #ff2c2c;
      margin: -2px 0px 20px;
    }

    & .box-times-left {
      margin: -8px 0px 0px;

      & .box-count-number {
        width: 76px;
        height: 24px;
        padding: 3.5px 6px 0.5px 6px;
        border-radius: 59.4px;
        border: 1.2px solid #512a08;
        background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
        line-height: 0;
        margin-left: 8px;
        text-shadow: rgb(255, 255, 255) 1px 0px 0px,
          rgb(255, 255, 255) 0.540302px 0.841471px 0px,
          rgb(255, 255, 255) -0.416147px 0.909297px 0px,
          rgb(255, 255, 255) -0.989992px 0.14112px 0px,
          rgb(255, 255, 255) -0.653644px -0.756802px 0px,
          rgb(255, 255, 255) 0.283662px -0.958924px 0px,
          rgb(255, 255, 255) 0.96017px -0.279415px 0px;
        color: #512a08;

        & .text-finish {
          color: #ff0000;
        }
      }
    }
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
// #endregion
</style>
