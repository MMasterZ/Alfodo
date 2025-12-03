<template>
  <q-page
    class=""
    style="overflow: auto"
    :class="$route.params.type == 'pretest' ? 'bg-pretest' : 'bg-posttest'"
  >
    <div class="absolute-right">
      <div class="q-pa-md">
        <q-img
          @click="openDialogExitTest()"
          class="cursor-pointer"
          src="images/prepost/close-test.png"
          style="width: 40px"
        ></q-img>
      </div>
    </div>

    <!-- Desktop -->
    <div class="box-container-main row desktop-only">
      <div class="col-12 self-center q-pa-md" align="center">
        <div class="relative-position">
          <!-- Frame Image Depends on test type -->
          <div
            class="relative-position"
            style="width: 90%; margin: auto; max-width: 1200px"
          >
            <!-- Frame -->
            <div class="relative-position">
              <div
                class="absolute transparent"
                style="z-index: 1; top: 170px; width: 10%; left: -50px"
                v-show="!prepostData.isFinishPrepost"
              >
                <q-img
                  :src="
                    $route.params.type == 'pretest'
                      ? 'images/prepost/pretest-no.png'
                      : 'images/prepost/posttest-no.png'
                  "
                >
                  <div
                    class="absolute no-padding row items-center justify-center transparent fit"
                  >
                    <span
                      class="text-weight-bolder"
                      :style="
                        $route.params.type == 'pretest'
                          ? 'color:#004061'
                          : 'color:#1E3D00'
                      "
                    >
                      <span v-show="isStart" style="font-size: clamp(20px, 2.2vw, 44px)">
                        {{
                          `${prepostData.currentQuestion + 1}/${
                            prepostData.totalQuestion
                          }`
                        }}
                      </span>
                      <span v-show="!isStart" style="font-size: clamp(20px, 2.2vw, 44px)">
                        __/__
                      </span>
                    </span>
                  </div>
                </q-img>
              </div>
              <q-img
                :src="
                  $route.params.type == 'pretest'
                    ? 'images/prepost/frame.png'
                    : 'images/prepost/frame-posttest.png'
                "
                class="relative-position"
                style="max-width: 1200px; top: 60px"
                v-show="!prepostData.isFinishPrepost"
              >
                <div class="absolute-center bg-transparent" v-show="!isStart">
                  <span
                    style="font-size: 24px"
                    class="text-bold"
                    :class="$route.params.type == 'pretest' ? 'text-black' : 'text-black'"
                  >
                    คุณมีเวลา 40 นาทีในการทำ<br />
                    <div class="q-my-sm">ถ้าพร้อมแล้วกด “START” เพื่อทำกันได้เลย</div>
                    <div class="q-pt-xl">
                      <q-img
                        @click="funcStart()"
                        class="cursor-pointer btn-start"
                        style="max-width: 250px"
                        src="images/prepost/start-btn.png"
                      ></q-img>
                    </div>
                  </span>
                </div>

                <!-- flag-toggle -->
                <div
                  class="transparent"
                  style="z-index: 1; top: 20px; right: 50px"
                  v-show="isStart && !prepostData.isFinishPrepost"
                >
                  <q-img
                    no-spinner
                    no-transition
                    v-show="prepostData.instructionLang == 'EN'"
                    src="images/prepost/flag-toggle.png"
                    style="width: 100px"
                    class="cursor-pointer"
                    @click="prepostData.instructionLang = 'TH'"
                  ></q-img>

                  <q-img
                    no-spinner
                    no-transition
                    v-show="prepostData.instructionLang == 'TH'"
                    src="images/prepost/flag-toggle-th.png"
                    style="width: 100px"
                    class="cursor-pointer"
                    @click="prepostData.instructionLang = 'EN'"
                  ></q-img>
                </div>

                <!-- Question Section -->
                <div
                  v-show="isStart && !prepostData.isFinishPrepost"
                  style="
                    width: 94.5%;
                    margin: auto;
                    position: relative;
                    top: 4.5%;
                    border-radius: 30px 30px 0px 0px;
                    height: 55%;
                  "
                  :style="
                    $route.params.type == 'pretest'
                      ? 'background-color: #3e42ad;'
                      : 'background-color: #074414;'
                  "
                >
                  <q-scroll-area
                    style="width: 100%; margin: auto; position: relative; height: 100%"
                    class="q-py-md"
                    :bar-style="{
                      right: '4px',
                      borderRadius: '5px',
                      background: 'white',
                      width: '10px',
                      opacity: 1,
                    }"
                    :thumb-style="{
                      right: '4px',
                      borderRadius: '5px',
                      background: 'red',
                      width: '10px',
                      opacity: 1,
                    }"
                    id="scrollArea"
                    :visible="true"
                  >
                    <div
                      class="q-pb-md q-px-lg flex flex-center"
                      style="
                        width: 100%;

                        font-size: clamp(1rem, 2.2vw, 1.5rem);
                      "
                    >
                      <!-- Instruction -->
                      <div
                        v-show="prepostData.instructionLang == 'EN'"
                        class="q-my-xs q-pt-md"
                        align="left"
                        style="text-decoration: underline"
                        v-html="prepostData.instructionEng"
                      ></div>

                      <div
                        v-show="prepostData.instructionLang == 'TH'"
                        class="q-my-xs q-pt-md"
                        align="left"
                        style="text-decoration: underline"
                        v-html="prepostData.instructionTh"
                      ></div>
                      <!-- Question -->
                      <div
                        v-html="prepostData.question"
                        align="left"
                        class="q-pt-md q-pl-lg"
                        style="width: 100%"
                      ></div>
                    </div>
                  </q-scroll-area>
                </div>
                <!-- Answer Section -->

                <div
                  v-show="isStart && !prepostData.isFinishPrepost"
                  class=""
                  style="
                    width: 94.5%;
                    height: 35%;
                    margin: auto;
                    position: relative;
                    top: 20px;
                    background-color: white;
                    border-radius: 0px 0px 30px 30px;
                  "
                >
                  <div class="row absolute-center q-pt-md" style="width: 95%">
                    <div
                      class="col-6 q-pa-md relative-position"
                      v-for="(item, index) in prepostData.choices"
                      :key="index"
                      @click="funcSendAnswer(item.index)"
                      v-ripple
                    >
                      <q-img
                        src="images/prepost/btn-choice.png"
                        class="cursor-pointer btn-start"
                      >
                        <div
                          class="absolute-center transparent text-black"
                          style="width: 100%"
                        >
                          <span
                            style="font-size: clamp(0.9rem, 2.2vw, 1rem)"
                            v-html="item.choice"
                          >
                          </span></div
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
          <q-btn @click="funcSendAnswer(0)"></q-btn>
          <div class="absolute-top">
            <!-- Label -->
            <q-img
              :src="`/images/prepost/${$route.params.type}-label.png`"
              style="max-width: 500px"
              v-show="!prepostData.isFinishPrepost"
            >
              <div class="absolute-right bg-transparent">
                <div
                  class="text-black relative-position row items-center justify-center font-CursedTimerULiL"
                  style="font-size: 50px; top: 5px"
                  :style="
                    $route.params.type == 'pretest'
                      ? 'width: 180px; height: 73px;'
                      : 'width: 170px; height: 70px;'
                  "
                  align="center"
                >
                  <span v-if="isStart">
                    {{ countDownTimer }}
                  </span>
                  <span v-else>__:__</span>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>

      <!-- Finish Prepost -->
      <div
        class="col-12 self-center q-pa-md"
        align="center"
        v-if="prepostData.isFinishPrepost"
      >
        <q-img
          src="/images/prepost/your-score-pretest.png"
          style="width: 350px; z-index: 1"
        ></q-img>
        <div
          class="relative-position"
          style="top: -50px; width: 310px; height: 405px; border-radius: 20px"
          :style="
            $route.params.type == 'pretest'
              ? 'background-color: #00679a;border: 2px solid #00679a;'
              : 'background-color: #1E3D00;border: 2px solid #1E3D00;'
          "
        >
          <div
            style="width: 300px; height: 395px; border-radius: 20px"
            :style="
              $route.params.type == 'pretest'
                ? 'background-color:#ACEDFF'
                : 'background-color:#6CAE2D'
            "
            class="relative-position"
          >
            <div
              class="relative-position row items-center justify-center bg-white"
              style="width: 260px; height: 170px; border-radius: 20px; top: 60px"
              :style="
                $route.params.type == 'pretest'
                  ? 'border: 3px solid #00679a;'
                  : 'border: 3px solid #1E3D00;'
              "
            >
              <!-- กล่องคะแนน -->
              <div class="col-12">
                <div
                  style="font-size: 90px; color: #004061; top: -20px"
                  class="text-weight-bold relative-position"
                >
                  {{ prepostData.correct }}
                </div>
                <div
                  style="font-size: 36px; top: -50px; color: #004061"
                  class="relative-position text-weight-bold"
                >
                  คะแนน
                </div>
                <div
                  style="font-size: 16px; color: #004061; top: -55px"
                  class="text-weight-bold relative-position"
                >
                  (คะแนนเต็ม {{ prepostData.totalQuestion }} คะแนน )
                </div>
              </div>

              <!--  -->

              <div
                class="f20 text-weight-bold relative-position"
                style="color: #004061; top: -30px"
              >
                จบแบบทดสอบ
                <span v-if="$route.params.type == 'pretest'"> ก่อนเรียน </span>
                <span v-else> หลังเรียน </span>
              </div>

              <div
                class="f16 q-pt-sm relative-position"
                style="color: #004061; top: -30px"
              >
                กด “CLOSE” เพื่อกลับหน้าล็อบบี้
              </div>

              <div class="relative-position" style="top: -10px">
                <q-img
                  @click="$router.push('/lobby')"
                  style="width: 158px"
                  class="btn-start cursor-pointer"
                  src="/images/prepost/close-dialog.png"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dialog หมดเวลา -->
      <q-dialog maximized v-model="isTimeOut" persistent>
        <q-card class="shadow-0 transparent">
          <q-card-section class="row justify-center items-center fit bg-dialog-dark">
            <div class="col-12" align="center">
              <q-img
                class="animate__animated animate__shakeY animate__infinite"
                src="/images/prepost/timeout-clock.png"
                style="width: 250px; animation-duration: 1.5s"
              >
              </q-img>
              <div
                class="transparent text-weight-bold text-white relative-position"
                style="font-size: 32px; width: 100%; top: -15px"
                align="center"
              >
                หมดเวลา!!!
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>

    <!-- Mobile -->

    <div
      v-show="!prepostData.isFinishPrepost"
      class="q-pa-md mobile-only"
      style="
        min-width: 330px;
        max-width: 700px;
        width: 100%;
        margin: auto;
        margin-top: 60px;
      "
    >
      <div style="border-radius: 10px" class="relative-position">
        <!-- Header Bar -->
        <div
          class="row"
          style="
            border-radius: 10px 10px 0px 0px;

            height: 50px;
          "
          :style="
            $route.params.type == 'pretest'
              ? 'background-color: #ac43ff;border: 2px solid #3a0058;'
              : 'background-color: #FE3897;border: 2px solid #1E3D00;'
          "
        >
          <div class="col relative-position" style="padding-left: 25px">
            <q-img
              class="no-padding"
              :src="
                $route.params.type == 'pretest'
                  ? 'images/prepost/pretest-text.png'
                  : 'images/prepost/posttest-text.png'
              "
              style="width: 178px"
            ></q-img>
          </div>

          <div class="self-center q-pr-sm" style="width: 100px">
            <div
              class="bg-white text-center f24 font-CursedTimerULiL"
              style="border-radius: 10px"
            >
              <span class="relative-position" style="top: 2px">
                {{ countDownTimer }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="q-pb-xs"
          style="border-radius: 0px 0px 10px 10px; border: 2px solid #3a0058"
          :style="
            $route.params.type == 'pretest'
              ? 'background-color: #3a0058;'
              : 'background-color: #2B5700;'
          "
        >
          <!-- Question Number , Flag Toggle -->
          <div
            class="row fit q-pa-md"
            v-show="isStart"
            :style="
              $route.params.type == 'pretest'
                ? 'background-color: #3E42AD;'
                : 'background-color: #6CAE2D;'
            "
          >
            <div class="col">
              <q-img
                src="images/prepost/question-no-mobile.png"
                style="width: 55px"
                class="no-padding"
              >
                <span
                  class="absolute-center text-weight-bold text-center transparent text-black"
                  style="font-size: 16px; width: 100%"
                >
                  {{ prepostData.currentQuestion + 1 }}/{{ prepostData.totalQuestion }}
                </span>
              </q-img>
            </div>
            <div class="" style="width: 75px">
              <div
                style="z-index: 1; right: 30px; top: 30px"
                v-show="isStart && !prepostData.isFinishPrepost"
              >
                <q-img
                  no-spinner
                  no-transition
                  v-show="prepostData.instructionLang == 'EN'"
                  src="images/prepost/flag-toggle.png"
                  style="width: 75px"
                  class="cursor-pointer"
                  @click="prepostData.instructionLang = 'TH'"
                ></q-img>

                <q-img
                  no-spinner
                  no-transition
                  v-show="prepostData.instructionLang == 'TH'"
                  src="images/prepost/flag-toggle-TH.png"
                  style="width: 75px"
                  class="cursor-pointer"
                  @click="prepostData.instructionLang = 'EN'"
                ></q-img>
              </div>
            </div>
          </div>
          <div
            class="q-pa-sm text-white row items-center"
            style="border-radius: 0px 0px 10px 10px"
            :style="
              $route.params.type == 'pretest'
                ? 'background-color: #3E42AD;'
                : 'background-color: #6CAE2D;'
            "
          >
            <!-- Start -->
            <div
              class="text-white bg-transparent row items-center fit justify-center"
              v-show="!isStart"
            >
              <div
                style="font-size: 20px; width: 100%"
                class="text-bold text-center q-pa-md fit"
              >
                คุณมีเวลา 40 นาทีในการทำ<br />
                <div class="q-my-sm">ถ้าพร้อมแล้วกด “START” <br />เพื่อทำกันได้เลย</div>
              </div>
            </div>

            <!-- Question & Instruction -->
            <div
              v-show="isStart && !prepostData.isFinishPrepost"
              style="width: 100%; margin: auto"
              class="q-pb-md"
            >
              <div style="width: 100%" class="f16 q-px-sm">
                <!-- Instruction -->
                <div
                  v-show="prepostData.instructionLang == 'EN'"
                  class="q-my-xs"
                  align="left"
                  style="text-decoration: underline"
                  v-html="prepostData.instructionEng"
                ></div>

                <div
                  v-show="prepostData.instructionLang == 'TH'"
                  class="q-my-xs"
                  align="left"
                  style="text-decoration: underline"
                  v-html="prepostData.instructionTh"
                ></div>
                <!-- Question -->

                <div
                  v-html="prepostData.question + ''"
                  align="left"
                  class="q-pt-md"
                  style="width: 100%"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Answer Section -->
        <div
          v-show="isStart && !prepostData.isFinishPrepost"
          style="margin: auto; position: relative; border-radius: 0px 0px 30px 30px"
        >
          <div class="row justify-center q-pt-sm" style="width: 100%">
            <div
              class="col-12 q-pa-xs relative-position text-center"
              v-for="(item, index) in prepostData.choices"
              :key="index"
              @click="funcSendAnswer(item.index)"
              v-ripple
            >
              <q-img src="images/prepost/btn-choice.png">
                <div class="absolute-center transparent text-black" style="width: 100%">
                  <span class="f16" v-html="item.choice"> </span></div
              ></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Finish Page Mobile -->

    <div class="mobile-only">
      <div
        class="absolute-center q-pa-md"
        align="center"
        v-if="prepostData.isFinishPrepost"
      >
        <q-img
          :src="
            $route.params.type == 'pretest'
              ? '/images/prepost/your-score-pretest.png'
              : '/images/prepost/your-score-posttest.png'
          "
          style="width: 350px; z-index: 1"
        ></q-img>
        <div
          class="relative-position"
          style="top: -50px; width: 310px; height: 405px; border-radius: 20px"
          :style="
            $route.params.type == 'pretest'
              ? 'background-color: #00679a;border: 2px solid #00679a;'
              : 'background-color: #1E3D00;border: 2px solid #1E3D00;'
          "
        >
          <div
            style="width: 300px; height: 395px; border-radius: 20px"
            :style="
              $route.params.type == 'pretest'
                ? 'background-color:#ACEDFF'
                : 'background-color:#6CAE2D'
            "
            class="relative-position"
          >
            <div
              class="relative-position row items-center justify-center bg-white"
              style="width: 260px; height: 170px; border-radius: 20px; top: 60px"
              :style="
                $route.params.type == 'pretest'
                  ? 'border: 3px solid #00679a;'
                  : 'border: 3px solid #1E3D00;'
              "
            >
              <!-- กล่องคะแนน -->
              <div class="col-12">
                <div
                  style="font-size: 90px; color: #004061; top: -20px"
                  class="text-weight-bold relative-position"
                >
                  {{ prepostData.correct }}
                </div>
                <div
                  style="font-size: 36px; top: -50px; color: #004061"
                  class="relative-position text-weight-bold"
                >
                  คะแนน
                </div>
                <div
                  style="font-size: 16px; color: #004061; top: -55px"
                  class="text-weight-bold relative-position"
                >
                  (คะแนนเต็ม {{ prepostData.totalQuestion }} คะแนน )
                </div>
              </div>

              <!--  -->

              <div
                class="f20 text-weight-bold relative-position"
                style="color: #004061; top: -30px"
              >
                <span v-if="$route.params.type == 'pretest'"> จบแบบทดสอบ </span>
                <span v-else> ก่อนเรียน </span>
              </div>
              <div
                class="f16 q-pt-sm relative-position"
                style="color: #004061; top: -30px"
              >
                กด “CLOSE” เพื่อกลับหน้าล็อบบี้
              </div>

              <div class="relative-position" style="top: -10px">
                <q-img
                  @click="$router.push('/lobby')"
                  style="width: 158px"
                  class="btn-start cursor-pointer"
                  src="/images/prepost/close-dialog.png"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- start btn mobile -->
    <div class="mobile-only text-center absolute-bottom q-pb-md" v-show="!isStart">
      <div class="q-pt-xl">
        <q-img
          @click="funcStart()"
          class="cursor-pointer btn-start"
          style="max-width: 160px"
          src="images/prepost/start-btn.png"
        ></q-img>
      </div>
    </div>

    <!-- Dialog กดออกจากทดสอบ -->
    <q-dialog v-model="isShowDialogExit" persistent>
      <div
        class="q-pb-xs"
        style="background-color: #eebd42; border-radius: 15px; border: 3px solid #4a261b"
      >
        <q-card
          style="
            border-radius: 0px 0px 15px 15px;
            box-shadow: 2px;
            background-color: #f6f3d3;
          "
          class="no-shadow"
        >
          <q-card-section>
            <div align="center">
              <q-img style="width: 105px" src="images/prepost/warning-sign.png"></q-img>
            </div>
            <div class="f20 text-weight-bold" align="center">ออกจากแบบทดสอบ</div>
            <div class="f16 q-pt-sm" align="center">
              หากคุณออกจากแบบทดสอบตอนนี้<br />
              ระบบจะไม่บันทึกคะแนนให้
            </div>
          </q-card-section>
          <q-card-action align="center">
            <div align="center" class="q-gutter-md q-pb-md">
              <q-img
                style="width: 100px; border-radius: 10px"
                class="btn-start cursor-pointer"
                v-ripple
                src="/images/prepost/exit-test.png"
                v-close-popup
              ></q-img>
              <q-img
                style="width: 100px; border-radius: 10px"
                class="btn-start cursor-pointer"
                v-ripple
                src="/images/prepost/continue-test.png"
                @click="$router.push('/lobby')"
              ></q-img>
            </div>
          </q-card-action>
        </q-card>
      </div>
    </q-dialog>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { ref, computed, reactive, onMounted, onBeforeUnmount } from "vue";
import getPractice from "../hooks/practiceHooks.js";
import studentHooks from "../hooks/gameHooks.js";
import { useStudentStore } from "../stores/student";
import { db } from "src/router";
import { useSchoolStore } from "src/stores/school.js";
import { useSystemStore } from "src/stores/system.js";
export default {
  setup(props) {
    // Initial Data
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const isTimeOut = ref(false);
    const $studentStore = useStudentStore();
    const $systemStore = useSystemStore();

    // Func : load Pre post Practice
    const prepostList = ref([]);
    const prepostData = reactive({
      instructionEng: "",
      instructionTh: "",
      totalQuestion: 0,
      currentQuestion: 0,
      question: "",
      choices: [],
      correctAnswer: null,
      correct: 0,
      min: 0,
      sec: 0,
      isFinishPrepost: false,
      score: 0,
      level: "",
      unit: "",
      studentId: "",
      courseId: "",
      school: "",
      instructionLang: "EN",
    });

    const funcLoadPrepost = async () => {
      try {
        // let uid = $q.sessionStorage.getItem("uid");

        let uid = $studentStore.studentId;

        let getStudent = await studentHooks.studentInfomation(uid);

        let getCourse = await studentHooks.courseInfomation(getStudent.currentCourseId);

        let level = getCourse.level;

        prepostData.level = level;
        prepostData.studentId = uid;
        prepostData.schoolId = getStudent.schoolId;
        prepostData.courseId = getStudent.currentCourseId;

        let type = route.params.type;
        let response = await getPractice.practice(level).prepost(type);

        if (response) {
          let temp = response;

          temp.forEach(async (res) => {
            if (res.choices != undefined) {
              let newChoice = funcRandom(res.choices);

              res.choices = newChoice;
            }
          });

          temp.sort(() => Math.floor(Math.random() - 0.5));

          prepostList.value = temp;

          prepostData.totalQuestion = temp.length;
          prepostData.question = temp[0].question;
          prepostData.choices = temp[0].choices;
          prepostData.correctAnswer = temp[0].correctAnswer;
          prepostData.instructionEng = temp[0].instructionEng;
          prepostData.instructionTh = temp[0].instructionTh;
        }
      } catch (error) {
        // console.log(`${error} : function Load Prepost`);
      }
    };
    const summaryScore = ref("");
    // Func : Send Answer
    const funcSendAnswer = async (index) => {
      $q.loading.show();

      if (index == prepostData.correctAnswer) {
        prepostData.correct++;
      }

      if (prepostData.currentQuestion + 1 == prepostData.totalQuestion) {
        await funcFinishPrepost();
        return;
      } else {
        prepostData.currentQuestion++;
      }

      prepostData.totalQuestion = prepostList.value.length;
      prepostData.question = prepostList.value[prepostData.currentQuestion].question;

      prepostData.choices = prepostList.value[prepostData.currentQuestion].choices;

      prepostData.correctAnswer =
        prepostList.value[prepostData.currentQuestion].correctAnswer;
      prepostData.instructionEng =
        prepostList.value[prepostData.currentQuestion].instructionEng;
      prepostData.instructionTh =
        prepostList.value[prepostData.currentQuestion].instructionTh;

      summaryScore.value = `${prepostData.correct} / ${prepostList.value.length}`;

      $q.loading.hide();
    };

    // Func : Random Array (Parameter Of Array)
    const funcRandom = (data) => {
      const shuffle = (array) => {
        var currentIndex = array.length,
          temporaryValue,
          randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      };

      let currentData = [...data];
      let sortData = shuffle([...data]);
      let checkDulpicate = sortData.every((item, index) => {
        return currentData[index].index == item.index;
      });

      if (checkDulpicate) {
        let newRandom = shuffle(currentData);
        return newRandom;
      } else {
        return sortData;
      }
    };

    // Func : Finish Prepost
    const funcFinishPrepost = async () => {
      // console.log("finish");
      let setData = {
        schoolId: prepostData.schoolId,
        studentId: prepostData.studentId,
        courseId: prepostData.courseId,
        score: Number(
          ((prepostData.correct / prepostData.totalQuestion) * 100).toFixed(2)
        ),
        testType: route.params.type,
      };

      let response = await getPractice
        .practice(prepostData.level)
        .saveprepostlog(setData);

      if (response == "success") {
        prepostData.score = setData.score;
        prepostData.isFinishPrepost = true;
        $q.sessionStorage.remove("examTime");
        clearInterval(tempCountDown);
      }

      $q.loading.hide();
    };

    // Func: Time
    let tempCountDown;
    const funcCountDown = () => {
      tempCountDown = setInterval(async () => {
        if ($q.sessionStorage.has("examTime")) {
          prepostData.min = $q.sessionStorage.getItem("examTime").min;
          prepostData.sec = $q.sessionStorage.getItem("examTime").sec;
        } else {
          prepostData.min = 40;
          prepostData.sec = 60;
        }

        if (prepostData.min == 40) {
          prepostData.min--;
          prepostData.sec--;
        } else {
          if (prepostData.sec == 0 && prepostData.min == 0) {
            isTimeOut.value = true;
            prepostData.isFinishPrepost = true;
            setTimeout(async () => {
              isTimeOut.value = false;
              await funcFinishPrepost();
            }, 3000);

            $q.sessionStorage.set("examTime", { min: 0, sec: 0 });
            clearInterval(tempCountDown);
          } else {
            if (prepostData.sec == 0) {
              prepostData.min--;
              prepostData.sec = 60;
            } else {
              prepostData.sec--;
            }
          }
        }

        $q.sessionStorage.set("examTime", {
          min: prepostData.min,
          sec: prepostData.sec,
        });
      }, 1000);
    };

    // Show Time
    const countDownTimer = computed(() => {
      let min = prepostData.min;
      min = min == 60 ? "00" : min < 10 ? "0" + min : min;

      let sec = prepostData.sec;
      sec = sec == 60 ? "00" : sec < 10 ? "0" + sec : sec;

      return `${min}:${sec}`;
    });

    // Func : Click Start
    const isStart = ref(false);

    const funcStart = async () => {
      $q.loading.show();

      await funcLoadPrepost();

      // await funcLoadPrepostLog();

      isStart.value = true;

      await funcCountDown();

      $q.loading.hide();
    };

    // Func : Load prepost log
    const funcLoadPrepostLog = async () => {
      $q.loading.show();

      let testType = route.params.type;

      let response = await getPractice
        .practice(prepostData.level)
        .checkprepostlog(prepostData.courseId);

      if (response.length) {
        let checkUsePrePost = response.includes(testType);
        if (checkUsePrePost) {
          $q.sessionStorage.remove("examTime");
          router.replace("/lobby");
        }
      }
    };

    const checkPrePostTestStatus = () => {
      const schoolStore = useSchoolStore();
      const studentStore = useStudentStore();

      if (!schoolStore.isPosttest && !schoolStore.isPretest) {
        $q.notify({
          message: "ขณะนี้ยังไม่ถึงเวลาสอบ",
          color: "red",
          position: "top",
        });
        return router.push("/lobby");
      }

      if (studentStore.isPretest || studentStore.isPosttest) {
        $q.notify({
          message: "ขณะนี้ยังไม่ถึงเวลาสอบ",
          color: "red",
          position: "top",
        });
        return router.push("/lobby");
      }
    };

    const isShowDialogExit = ref(false);
    const openDialogExitTest = () => {
      isShowDialogExit.value = true;
    };

    onMounted(() => {
      $systemStore.setRouter("prepost");
      checkPrePostTestStatus();
    });

    onBeforeUnmount(() => {
      $q.sessionStorage.remove("examTime");
      clearInterval(tempCountDown);
    });

    return {
      // Use Data
      prepostData,
      openDialogExitTest,
      summaryScore,

      // Boolean Status
      isStart,
      isTimeOut,
      isShowDialogExit,

      // Computed
      countDownTimer,

      // Function
      funcStart,
      funcSendAnswer,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-dialog-dark {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
.bg-pretest {
  width: 100%;
  background-image: url("/images/prepost/pretest-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0f1426;
}

.bg-posttest {
  width: 100%;
  background-image: url("/images/prepost/posttest-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #0f1426;
}

.box-time {
  width: 90px;
  background-color: #b1654b;
  border: 4px solid #f8a58d;
  border-radius: 15px;
  padding: 2px 0px 2px 20px;
  color: #fff;
}

.box-question-number {
  width: 55px;
  color: #e57373;
  font-weight: bold;
  font-size: 18px;
}

.box-question-number-mobile {
  width: fit-content !important;
  background-color: #b1654b;
  border: 4px solid #f8a58d;
  color: #fff !important;
  font-size: 16px;
  border-radius: 15px;
  padding: 5px 15px;
}

.box-question-progress {
  background-color: #f8a58d;
  border: 4px solid #b1654b;
  border-radius: 20px;
  padding: 4px;
  height: 32px;
}

.box-progress-bar {
  height: 100%;
  background-color: #64a74a;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 1px #437430;
}

.box-instruction {
  background-image: url("/images/prepost/bg-instruction.png");
  background-size: cover;
  background-position: center;
  padding: 15px 0px;
  border-radius: 10px;
}

.box-question-answer {
  background-color: #792527;
  border-radius: 5px;
}

.box-answer {
  background: linear-gradient(180deg, #f3bc36 48.44%, #eda318 88.02%);
  border: 1px solid #512a08;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0px 2px 1px #502906;
}

.box-answer-hover:hover {
  background: #6cd4f3;
}

.text-finish {
  text-shadow: 2px 2px 1px #b1654b;
}

.box-timeout {
  position: relative;
  max-width: 340px;
  height: 400px;
  background-image: url("/images/prepost/bg-timeout.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.btn-start:hover {
  transform: scale(0.95);
}
</style>
