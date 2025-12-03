<template>
  <q-page align="center">
    <q-dialog v-model="isShowReCheckExamDialog">
      <q-card style="max-width: 350px; width: 100%; margin: auto">
        <q-toolbar class="no-padding">
          <q-space></q-space>
          <q-btn v-close-popup icon="fas fa-times" flat></q-btn>
        </q-toolbar>
        <q-card-section class="no-padding relative-position">
          <div align="center" class="font-16 q-px-md text-weight-bold q-pb-sm">
            ตรวจทานข้อสอบ
          </div>
          <q-scroll-area style="height: 300px">
            <div class="row q-px-xs q-pb-sm q-px-sm">
              <div
                class="col-4 q-pa-xs q-pb-sm"
                v-for="(item, index) in examData"
                :key="index"
                @click="scrollToElement(index + 1)"
              >
                <div
                  align="center"
                  class="exam-choices"
                  :class="
                    examData[index].userAnswer == '' ? 'not-active' : 'active'
                  "
                  style="font-size: 16px"
                >
                  {{ index + 1 }}
                </div>
              </div>
            </div>
          </q-scroll-area>
        </q-card-section>
        <q-card-section class="no-padding">
          <div class="row justify-evenly shadow-10">
            <div class="row no-wrap justify-start q-py-sm" align="center">
              <div
                style="
                  width: 30px;
                  height: 20px;
                  border: 1px solid #c1c1c1;
                  border-radius: 5px;
                "
                class="not-active"
              ></div>
              <div class="q-pl-sm">ยังไม่ทำ</div>
            </div>

            <div
              class="q-pl-sm row no-wrap justify-start q-py-sm"
              align="center"
            >
              <div
                style="
                  width: 30px;
                  height: 20px;
                  border: 1px solid #c1c1c1;
                  border-radius: 5px;
                "
                class="active"
              ></div>
              <div class="q-pl-sm">ทำแล้ว</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- MENU-BAR -->
    <div class="row" style="z-index: 500; position: sticky; top: 0px">
      <div class="bg-white q-px-md q-pt-xs shadow-3" style="width: 100%">
        <div class="q-py-sm" align="left">
          <div class="text-weight-bold">
            {{ examInfo.title }}
          </div>

          <div class="q-pt-sm">
            <div class="row">
              <div align="left" class="">ชื่อ {{ studentInfo.name }}</div>

              <div class="offset-1">เลขที่ {{ courseInfo.studentNo }}</div>

              <div class="offset-1">
                ชั้น {{ courseInfo.class }}/{{ courseInfo.room }}
              </div>
            </div>
          </div>

          <div class="row q-py-sm">
            <div class="col-6" align="center">
              <q-btn

                style="width: 90%; font-size: 18px; border-radius: 10px"
                :color="isCloseToTimeout ? 'amber-10' : 'amber'"
                text-color="black"
                :label="timerLabel"
                icon="far fa-clock"
                class="text-weight-bold shadow-3 no-pointer-events"
                :class="
                  isCloseToTimeout
                    ? 'animate__animated animate__flash animate__infinite animateDuration'
                    : ''
                "
              ></q-btn>
            </div>
            <div class="col-6" align="center">
              <q-btn
                style="
                  width: 90%;
                  font-size: 18px;
                  background-color: #58c16f;
                  letter-spacing: 1.5px;
                  border: 1px solid #176c31;
                  border-radius: 10px;
                "
                label="ส่งข้อสอบ"
                text-color="white"
                class="text-weight-bold shadow-3 relative-position"
                @click="$emit('sendAnswer', examData)"
              >
                <div
                  style="
                    height: 12px;
                    width: 12px;
                    border-radius: 50%;
                    background-color: white;
                    top: 8px;
                    left: 13px;
                  "
                  class="absolute"
                ></div>
                <div
                  style="
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                    background-color: white;
                    top: 20px;
                    left: 8px;
                  "
                  class="absolute"
                ></div>
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EXAM -->
    <div align="left" class="bg-white shadow-5">
      <div v-for="(item, index) in examData" :key="index">
        <div class="q-pa-md" :id="`question${index + 1}`">
          <div>
            <!-- คำอธิบาย ENG -->
            <div class="text-weight-bold">{{ item.instructionEng }}</div>
            <!-- คำอธิบาย TH -->
            <div class="text-weight-bold">{{ item.instructionTh }}</div>
          </div>
          <div>
            <div class="row q-mt-md">
              <!-- รูปภาพ *หากมี -->
              <div
                align="center"
                class="col-12 q-pt-sm q-pb-md"
                v-if="item.isImage"
              >
                <q-img
                  :src="item.imageUrl"
                  style="max-width: 250px; width: 100%"
                ></q-img>
              </div>
              <!-- ช้อ -->
              <div align="right" class="q-pr-md">{{ index + 1 }}.</div>

              <!-- คำถาม -->
              <div class="col" v-html="displayQuestion(item.question)"></div>
            </div>
            <!-- CHOICE -->
            <div class="row items-center q-mt-md">
              <div
                v-for="(choice, index2) in item.choices"
                :key="index2"
                class="row col-12 items-center"
              >
                <div class="q-ml-md">
                  <q-radio
                    @update:model-value="$emit('updateScore', examData)"
                    v-model="examData[index].userAnswer"
                    :val="index2 + 1"
                  />
                </div>
                <div class="row q-ml-md">
                  {{ index2 + 1 }} )
                  <div class="q-ml-xs">{{ choice.choice }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- เส้นแบ่งข้อ -->
        <q-separator
          v-if="index + 1 != examData.length"
          class="q-mb-md full-width"
          style="height: 4px; margin-left: -16px"
        ></q-separator>
      </div>
    </div>

    <div align="center" style="z-index: 500; position: sticky; bottom: 0px">
      <q-btn
        text-color="black"
        style="width: 100%; font-size: 18px"
        label="ตรวจทานข้อสอบ"
        color="amber"
        @click="isShowReCheckExamDialog = true"
      ></q-btn>
    </div>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import { scroll } from "quasar";
const { getScrollTarget, setVerticalScrollPosition } = scroll;
export default {
  props: [
    "examData",
    "studentInfo",
    "courseInfo",
    "examInfo",
    "timerLabel",
    "isCloseToTimeout",
  ],
  emits: ["updateScore", "sendAnswer"],
  setup(props) {
    const currentChoice = ref(1);

    const progressBar = computed(() => {
      let bar = props.examData.filter((x) => x.userAnswer != "");
      currentChoice.value = bar.length;
      bar = (bar.length / props.examData.length) * 100;
      return bar;
    });

    const isShowReCheckExamDialog = ref(false);

    const activeNavigator = ref(null);

    const scrollToElement = (index) => {
      let el = document.getElementById(`question${index}`);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      // console.log(offset);
      const duration = 1000;
      setVerticalScrollPosition(target, offset, duration);
      activeNavigator.value = index;
    };

    const displayQuestion = (question) => {
      let result = question.replace(/<[^>]*>/g, "");
      return result;
    };

    return {
      displayQuestion,
      currentChoice,
      progressBar,
      isShowReCheckExamDialog,
      activeNavigator,
      scrollToElement,
    };
  },
};
</script>

<style lang="scss" scoped>
//เก็บมุม - Dialog
.radius {
  border-radius: 10px;
}
//สี PROGRESS-BAR ยังไม่ได้ทำข้อสอบ
.colorPercent {
  background-color: #e3f2fd;
  border-radius: 10px;
}
//สีเส้นขอบ PROGRESS-BAR
.borderPercent {
  border: 2px solid #792527;
  border-radius: 10px;
}
//สี PROGRESS-BAR ทำข้อสอบแล้ว
.percent {
  background-color: #64b5f6;
  border-radius: 10px;
}

.not-active {
  background-color: white;
  color: #c1c1c1;
}

.active {
  background-color: #a7ffeb;
}

.exam-choices {
  border-radius: 5px;
  padding: 2px 3px;
  border: 1px solid #c1c1c1;
  cursor: pointer;
}
.animateDuration {
  animation-duration: 2s;
}
</style>
