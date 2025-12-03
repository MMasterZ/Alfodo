<template>
  <q-page align="center" style="max-width: 1280px; margin: auto">
    <div class="q-pa-md">
      <div
        style="height: 100px; z-index: 20"
        class="bg-white rounded-borders q-px-md row items-center shadow-2 relative-position"
      >
        <div class="col-12 row items-center">
          <div class="col-10 row items-center">
            <div
              class="q-pb-md col-12 text-weight-bold"
              align="left"
              style="font-size: 18px"
            >
              {{ examInfo.title }}


            </div>
            <div class="col-4 text-weight-bolder" align="left">
              ชื่อ {{ studentInfo.name }}
            </div>
            <div class="col-3 text-weight-bolder">
              เลขที่ {{ courseInfo.studentNo }}
            </div>
            <div class="col-3 text-weight-bolder">
              ชั้น {{ courseInfo.class }}/{{ courseInfo.room }}
            </div>
          </div>
          <div class="col-2">
            <q-btn
              icon="far fa-clock"
              style="font-size: 20px;"
              :label="timerLabel"
              class="text-weight-bold no-pointer-events"
              :color="isCloseToTimeout ? 'amber-10' : 'amber'"
              text-color="black"
              :class="
                isCloseToTimeout
                  ? 'animate__animated animate__flash animate__infinite animateDuration'
                  : ''
              "
            ></q-btn>
          </div>
        </div>
      </div>

      <div
        class="bg-white relative-position q-px-md"
        style="z-index: 10; top: -3px"
        :style="`height:${scrollHeight}px`"
      >
        <div class="q-pt-md row">
          <!-- ข้อสอบ -->
          <div class="col-10">
            <q-scroll-area :style="`height: ${scrollHeight - 50}px`">
              <div
                align="left"
                v-for="(item, index) in examData"
                :key="index"
                :name="`question${index + 1}`"
                :id="`question${index + 1}`"
                class="q-px-sm"
                :class="{
                  'bg-navigator-active ': activeNavigator == index + 1,
                }"
              >
                <div class="">
                  <div>
                    <!-- คำอธิบาย ENG -->
                    <div class="text-weight-bold">
                      {{ item.instructionEng }}
                    </div>
                    <!-- คำอธิบาย TH -->
                    <div class="text-weight-bold">{{ item.instructionTh }}</div>
                  </div>
                  <div>
                    <div class="row q-mt-md">
                      <!-- ช้อ -->
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
                      <div align="right" class="q-pr-md">{{ index + 1 }}.</div>

                      <!-- คำถาม -->
                      <div
                        class="col"
                        v-html="displayQuestion(item.question)"
                      ></div>
                    </div>
                    <!-- CHOICE -->
                    <div class="row items-center q-mt-md">
                      <div
                        v-for="(choice, index2) in item.choices"
                        :key="index2"
                        class="row no-wrap col-6 items-center"
                      >
                        <div class="q-pl-sm" style="width: 40px">
                          <q-radio
                            v-model="examData[index].userAnswer"
                            :val="index2 + 1"
                            @update:model-value="$emit('updateScore', examData)"
                          />
                        </div>
                        <div class="row">
                          <div class="q-pl-xs">
                            {{ index2 + 1 }}) {{ choice.choice }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- เส้นแบ่งข้อ -->
                  <div class="q-py-md">
                    <q-separator
                      v-if="index + 1 - examData.length"
                      style="height: 4px; width: 100%; margin-left: -16px"
                    ></q-separator>
                  </div>
                </div>
              </div>
            </q-scroll-area>
          </div>

          <!-- ตรวจทานข้อสอบ -->
          <div class="col-2 relative-position">
            <div class="font-16 text-weight-bold">ตรวจทานข้อสอบ</div>
            <q-scroll-area style="height: 500px">
              <div class="row q-px-xs q-pb-sm q-px-sm">
                <div
                  class="col-4 q-pa-xs q-pb-sm"
                  v-for="(item, index) in examData"
                  :key="index"
                  @click="scrollToElement(index + 1)"
                >
                  <div
                    class="exam-choices"
                    :class="
                      examData[index].userAnswer == '' ? 'not-active' : 'active'
                    "
                    :style="
                      examData[index].userAnswer == ''
                        ? 'background: rgb(250,250,250);background: linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(176,176,176,1) 100%);'
                        : ''
                    "
                  >
                    {{ index + 1 }}
                  </div>
                </div>

                <div class="col-12" align="center">
                  <div class="row">
                    <div
                      class="col-sm-12 col-lg-6 row no-wrap justify-start q-pt-md"
                      align="center"
                    >
                      <div
                        style="
                          width: 30px;
                          height: 20px;
                          border: 1px solid;
                          border-radius: 5px;
                        "
                        class="not-active"
                      ></div>
                      <div class="q-pl-sm">ยังไม่ทำ</div>
                    </div>

                    <div
                      class="col-sm-12 col-lg-6 row no-wrap justify-start q-pt-md"
                      align="center"
                    >
                      <div
                        style="
                          width: 30px;
                          height: 20px;
                          border: 1px solid;
                          border-radius: 5px;
                        "
                        class="active"
                      ></div>
                      <div class="q-pl-sm">ทำแล้ว</div>
                    </div>
                  </div>
                </div>
              </div>
            </q-scroll-area>

            <div class="absolute-bottom">
              <q-img
                src="/images/exam-send.png"
                class="cursor-pointer hover-send-btn"
                style="width: 140px"
                @click="$emit('sendAnswer', examData)"
              ></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { scroll } from "quasar";
import { useStudentStore } from "src/stores/student";
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
  emits: ["sendAnswer", "updateScore"],
  setup(props) {
    const currentChoice = ref(1);
    const progressBar = computed(() => {
      let bar = props.examData.filter((x) => x.userAnswer != "");
      currentChoice.value = bar.length;
      bar = (bar.length / props.examData.length) * 100;
      return bar;
    });

    const activeNavigator = ref(null);

    const scrollToElement = (index) => {
      let el = document.getElementById(`question${index}`);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 1000;
      setVerticalScrollPosition(target, offset, duration);
      activeNavigator.value = index;
    };

    const countdownClock = () => {
      setInterval(() => {}, 1000);
    };

    const getStudentData = () => {
      const $studentStore = useStudentStore();
    };

    const displayQuestion = (question) => {
      let result = question.replace(/<[^>]*>/g, "");
      return result;
    };

    const scrollHeight = ref(0);
    onMounted(() => {
      scrollHeight.value = window.innerHeight - 150;
    });
    return {
      displayQuestion,
      currentChoice,
      progressBar,
      scrollToElement,
      activeNavigator,
      scrollHeight,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-navigator-active {
  animation: blinkblink 2s linear;
}

@keyframes blinkblink {
  0% {
    background-color: antiquewhite;
  }
  25% {
    background-color: white;
  }
  50% {
    background-color: antiquewhite;
  }
  100% {
    background-color: white;
  }
}
.bg-pre {
  background-image: url("/images/bg-exam.png");
  height: 100vh;
  background-position: center;
  background-attachment: fixed;
}
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

.exam-choices {
  border-radius: 5px;
  padding: 2px 3px;
  border: 1px solid;
  cursor: pointer;
}

.not-active {
  background-color: #c4c4c4;
}

.active {
  background-color: #a7ffeb;
}

.hover-send-btn:hover {
  cursor: pointer;
  transform: scale(1.05);
}
.animateDuration {
  animation-duration: 2s;
}
</style>
