<template>
  <q-page :class="isLoading ? 'flex flex-center' : ''">
    <div v-if="isLoading" align="center">
      <q-spinner-facebook thickness="1" color="primary" size="6em" />
    </div>
    <div v-else>
      <div v-if="!isWelcome" class="absolute-center" align="center">
        <q-card
          :style="$q.platform.is.desktop ? '' : 'margin-top:132px'"
          style="
            width: 320px;
            border-radius: 10px;
            background-color: #f6f3d3;
            border: 3px solid #a36112;
          "
          class="q-pa-md relative-position"
        >
          <div
            style="
              width: 15px;
              height: 15px;
              background-color: #a36112;
              border-radius: 50%;
              left: 8px;
              top: 8px;
            "
            class="absolute"
          ></div>

          <div
            style="
              width: 15px;
              height: 15px;
              background-color: #a36112;
              border-radius: 50%;
              right: 8px;
              top: 8px;
            "
            class="absolute"
          ></div>

          <div
            style="
              width: 15px;
              height: 15px;
              background-color: #a36112;
              border-radius: 50%;
              bottom: 8px;
              left: 8px;
            "
            class="absolute"
          ></div>

          <div
            style="
              width: 15px;
              height: 15px;
              background-color: #a36112;
              border-radius: 50%;
              bottom: 8px;
              right: 8px;
            "
            class="absolute"
          ></div>

          <div class="f16 q-pt-sm q-pb-md">
            <div class="text-weight-bold" style="font-size: 18px">
              {{ examInfo.title }}
            </div>
            <div class="row q-px-md q-pt-md">
              <div class="col-7" align="left">จำนวนข้อสอบ</div>
              <div class="col-5" align="right">{{ data.length }} ข้อ</div>
              <div class="col-7 q-pt-sm" align="left">เหลือเวลาสอบ</div>
              <div class="col-5 q-pt-sm" align="right">
                <q-icon name="far fa-clock" class="relative-position" style="bottom:2px"></q-icon>
                {{ timerLabel }}
              </div>
            </div>
            <div class="q-pt-md">ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</div>
          </div>
          <div style class="q-py-lg">
            <div class="btn-start" @click="startExam()"></div>
          </div>
        </q-card>
      </div>

      <div v-else>
        <exam-pc
          class="desktop-only q-py-sm"
          :examData="data"
          :examInfo="examInfo"
          :studentInfo="studentInfo"
          :courseInfo="courseInfo"
          :timerLabel="timerLabel"
          @sendAnswer="checkAnswer"
          @updateScore="updateScore"
          :isCloseToTimeout="isCloseToTimeout"
        ></exam-pc>
        <exam-mobile
          class="mobile-only"
          :examData="data"
          :examInfo="examInfo"
          :studentInfo="studentInfo"
          :courseInfo="courseInfo"
          :timerLabel="timerLabel"
          @sendAnswer="checkAnswer"
          @updateScore="updateScore"
          :isCloseToTimeout="isCloseToTimeout"
        ></exam-mobile>
      </div>
    </div>

    <!-- ----------------------DIALOG--------------------------------- -->
    <q-dialog v-model="isDialogConfirm">
      <q-card
        :style="$q.platform.is.desktop ? '' : 'margin-top:132px'"
        style="
          width: 320px;
          border-radius: 10px;
          background-color: #f6f3d3;
          border: 3px solid #a36112;
        "
        class="q-pa-md relative-position"
      >
        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            left: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            right: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            left: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            right: 8px;
          "
          class="absolute"
        ></div>

        <div class="f16 q-pt-sm q-pb-md">
          <div class="text-weight-bold" style="font-size: 20px" align="center">
            แจ้งเตือน
          </div>
          <div align="center" class="q-pt-md">
            <span class="font-16">คุณยังไม่ได้ทำข้อสอบข้อที่</span>

            <div class="font-16" style="width: 100%; max-width: 300px">
              {{ notFinishQuestion }}
            </div>
          </div>
        </div>

        <q-card-actions align="center">
          <q-btn
            style="
              background-color: #58c16f;
              letter-spacing: 1.5px;
              border: 1px solid #176c31;
              border-radius: 10px;
              background: linear-gradient(180deg, #ffd25e 0%, #ffba08 100%);
              width: 45%;
            "
            label="ปิด"
            text-color="black"
            class="text-weight-bold shadow-3 relative-position"
            v-close-popup
            push
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
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowConfirmSendExam">
      <q-card
        :style="$q.platform.is.desktop ? '' : 'margin-top:132px'"
        style="
          width: 320px;
          border-radius: 10px;
          background-color: #f6f3d3;
          border: 3px solid #a36112;
        "
        class="q-pa-md relative-position"
      >
        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            left: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            right: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            left: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            right: 8px;
          "
          class="absolute"
        ></div>

        <div class="f16 q-pt-sm q-pb-md">
          <div class="text-weight-bold" style="font-size: 20px" align="center">
            ยืนยันการส่งข้อสอบ
          </div>
        </div>

        <q-card-actions align="center" class="row justify-evenly">
          <q-img
            class="cursor-pointer relative-position"
            v-ripple
            src="/images/cancel-exam.png"
            style="width: 120px"
            v-close-popup
          ></q-img>
          <q-img
            class="cursor-pointer relative-position"
            v-ripple
            src="/images/send-exam.png"
            style="width: 120px"
            @click="saveScore()"
          ></q-img>
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isShowTimeoutDialog">
      <q-card
        :style="$q.platform.is.desktop ? '' : 'margin-top:132px'"
        style="
          width: 320px;
          border-radius: 10px;
          background-color: #f6f3d3;
          border: 3px solid #a36112;
        "
        class="q-pa-md relative-position"
      >
        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            left: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            right: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            left: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            right: 8px;
          "
          class="absolute"
        ></div>

        <div class="f16 q-pt-sm q-pb-md">
          <div align="center">
            <q-img src="/images/examClock.png" style="width: 75px"></q-img>
          </div>
          <div class="text-weight-bold" style="font-size: 20px" align="center">
            หมดเวลาทำข้อสอบ
          </div>
          <div align="center" class="q-pt-sm">
            ระบบได้ทำการส่งข้อสอบให้<br />โดยอัตโนมัติแล้ว
          </div>
        </div>

        <q-card-actions align="center">
          <q-btn
            style="
              background-color: #58c16f;
              letter-spacing: 1.5px;
              border: 1px solid #176c31;
              border-radius: 10px;
              background: linear-gradient(180deg, #ffd25e 0%, #ffba08 100%);
              width: 180px;
            "
            label="กลับสู่ล็อบบี้"
            text-color="black"
            class="text-weight-bold shadow-3 relative-position"
            @click="$router.replace('/lobby')"
            v-close-popup
            push
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
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import examPc from "../../components/examPc.vue";
import examMobile from "../../components/examMobile.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { axios } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { db } from "src/router";
import { useStudentStore } from "src/stores/student";
export default {
  components: { examPc, examMobile },
  setup() {
    const isLoading = ref(true);
    const isDialogConfirm = ref(false);
    const data = ref();
    const notFinishQuestion = ref("");
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const examId = route.params.examId;
    const isWelcome = ref(false);

    // Check Finish Exam
    const checkAnswer = (val) => {
      let noAnswer = val.filter((x) => x.userAnswer == "");

      if (noAnswer.length) {
        // ข้อที่ยังไม่ได้ทำ
        let questionNumberThatNotFinish = [];
        noAnswer.forEach((element, index) => {
          questionNumberThatNotFinish.push(element.no);
        });
        isDialogConfirm.value = true;
        let showNotFinishQuestion = questionNumberThatNotFinish.slice(
          0,
          questionNumberThatNotFinish.length - 1
        );

        showNotFinishQuestion = showNotFinishQuestion.join(", ");

        if (showNotFinishQuestion.length >= 1) {
          notFinishQuestion.value = `${showNotFinishQuestion} และ ${
            questionNumberThatNotFinish[questionNumberThatNotFinish.length - 1]
          }`;
        } else {
          notFinishQuestion.value = questionNumberThatNotFinish[0];
        }
      } else {
        // กรณีทำครบทุกข้อ
        isShowConfirmSendExam.value = true;
      }
    };

    const studentInfo = ref("");
    const getStudentInfo = async () => {
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      const url = `${process.env.API}/getStudentInfo?studentId=${studentId}`;

      const response = await axios.get(url);
      studentInfo.value = response.data;
      const currentCourseId = response.data.currentCourseId;
      getCourseInfo(currentCourseId);
    };
    const courseInfo = ref("");
    const getCourseInfo = async (courseId) => {
      const url = `${process.env.API}/getCourseInfo?courseId=${courseId}`;
      const response = await axios.get(url);
      courseInfo.value = response.data;
    };

    const examInfo = ref("");
    const getExamQuestion = async () => {
      const shuffle = (array) => {
        var currentIndex = array.length,
          randomIndex;

        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }
        return array;
      };

      const url = `${process.env.NEWAPI_ASIA}/eExam-getExamV2?examId=${examId}`;

      const response = await axios.get(url);

      examInfo.value = response.data.examInfo;

      examInfo.value.totalTime = response.data.timeBalance;
      const randomQuestion = shuffle(response.data.question);
      randomQuestion.map(
        (x, index) => ((x.userAnswer = ""), (x.no = index + 1))
      );
      data.value = randomQuestion;
      isLoading.value = false;
      startCountdown();
    };

    const timerLabel = ref("00:00:00"); //HH:MM:SS
    const isCloseToTimeout = ref(false);
    let interval;
    const isShowTimeoutDialog = ref(false);
    const startCountdown = () => {
      clearInterval(interval);
      // let hasCountdownTime = $q.localStorage.has("countdownTime");

      let min = Number(examInfo.value.totalTime.min);
      let second = Number(examInfo.value.totalTime.sec);
      let hour = Number(examInfo.value.totalTime.hour);

      if (min < 0) {
        isShowTimeoutDialog.value = true;
        saveScore();
        clearInterval(interval);
        timerLabel.value = `00:00:00`;
      } else {
        interval = setInterval(() => {
          // count down timer in HH:MM:SS format

          if (second == 0) {
            if (min == 0) {
              if (hour == 0) {
                isShowTimeoutDialog.value = true;
                saveScore();
                clearInterval(interval);
                timerLabel.value = `00:00:00`;
              } else {
                hour--;
                min = 59;
                second = 59;
              }
            } else {
              min--;
              second = 59;
            }
          } else {
            second--;
          }

          if (min <= 5 && hour == 0) {
            isCloseToTimeout.value = true;
          } else {
            isCloseToTimeout.value = false;
          }

          timerLabel.value = `${hour < 10 ? "0" + hour : hour}:${
            min < 10 ? "0" + min : min
          }:${second < 10 ? "0" + second : second}`;

          // $q.localStorage.set("countdownTime", timerLabel.value);
        }, 1000);
      }
    };

    let score = 0;
    let totalCorrect = 0;
    const updateScore = (val) => {
      let findCorrectQuestion = val.filter(
        (x) => x.userAnswer == x.correctAnswer
      );
      totalCorrect = findCorrectQuestion.length;
      score = (findCorrectQuestion.length / val.length) * 100;
      score = score;
    };

    const saveScore = async () => {
      $q.loading.show();
      const url = `${process.env.API}/saveExamScore`;
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      const postData = {
        studentId: studentId,
        score: Math.round(score) || 0,
        class: courseInfo.value.class,
        room: courseInfo.value.room,
        examId: examId,
        totalQuestion: data.value.length,
        totalCorrect: totalCorrect || 0,
      };
      const response = await axios.post(url, postData);

      $q.localStorage.remove("countdownTime");
      $q.loading.hide();

      router.replace({
        name: "finishExam",
        params: {
          name: studentInfo.value.name,
          score: Math.round(score) || 0,
          totalQuestion: data.value.length,
          totalCorrect: totalCorrect || 0,
        },
      });
    };

    const startExam = () => {
      isWelcome.value = true;
    };

    const checkPermission = () => {
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      db.collection("examLog")
        .where("studentId", "==", studentId)
        .where("examId", "==", examId)
        .get()
        .then((doc) => {
          if (doc.size) {
            router.replace("/lobby");
          }
        });
    };

    const isShowConfirmSendExam = ref(false);

    onMounted(async () => {
      checkPermission();
      await getStudentInfo();
      getExamQuestion();
    });

    onBeforeUnmount(() => {
      clearInterval(interval);
    });
    return {
      isDialogConfirm,
      data,
      isLoading,
      checkAnswer,
      updateScore,
      startExam,
      saveScore,
      notFinishQuestion,
      studentInfo,
      courseInfo,
      examInfo,
      timerLabel,
      isCloseToTimeout,
      isWelcome,
      isShowConfirmSendExam,
      isShowTimeoutDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-close-popup {
  width: 120px;
  height: 35px;
  background-image: url("/images/exam-close-popup.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.btn-close-popup:hover {
  width: 120px;
  height: 35px;
  background-image: url("/images/exam-close-popup-h.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.btn-send-answer {
  width: 120px;
  height: 35px;
  // background-image: url("/images/exam-send-answer.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.btn-send-answer:hover {
  width: 120px;
  height: 35px;
  // background-image: url("/images/exam-send-answer-h.png");
  background-size: cover;
  background-repeat: no-repeat;
}

//ปุ่ม login
.btn-start {
  background-image: url("/images/btn-start-nh.png");
  width: 200px;
  height: 35px;
  background-size: cover;
}
.btn-start:hover {
  background-image: url("/images/btn-start-h.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}
</style>
