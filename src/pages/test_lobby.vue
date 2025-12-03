<template>
  <q-page class="row lobby-container justify-center items-center">
    <div align="center">
      <div class="relative-position">
        <background></background>
        <!-- Top -->
        <!-- Left -->
        <div class="absolute" style="width: 27.5%; top: 2%; left: 1%">
          <q-img src="/images/icon_main/icon-profile-bar.png">
            <div class="no-padding row transparent" style="width: 99.5%; height: 100%">
              <div
                class="col-3 self-center relative-position"
                style="width: 32%; height: 100%"
                align="center"
              >
                <div class="absolute-center" style="top: 55%">
                  <span class="font-fredoka text-level" style="font-size: 3vw"
                    >55566</span
                  >
                </div>
              </div>
              <div class="col"></div>
            </div>
          </q-img>
        </div>

        <div class="absolute-center" style="width: 50%; height: 50%"></div>

        <!-- Right -->
        <div class="absolute cursor-pointer" style="width: 3%; right: 1.7%; top: 2%">
          <q-img src="/images/icon_main/icon-logout.png"></q-img>
        </div>
        <div class="absolute cursor-pointer" style="width: 3%; right: 5.5%; top: 2%">
          <q-img src="/images/icon_main/icon-setting.png"></q-img>
        </div>
        <div class="absolute cursor-pointer" style="width: 3%; right: 9.3%; top: 2%">
          <q-img src="/images/icon_main/icon-news.png"></q-img>
        </div>

        <div class="absolute" style="width: 35%; right: 10%; top: 23%">
          <character :isAnimation="true"></character>
        </div>

        <!-- Bottom -->
        <!-- Left -->
        <div class="absolute" style="width: 8%; bottom: 5%; left: 3%">
          <q-img src="/images/button_main/button-ranking.gif"></q-img>
        </div>
        <div class="absolute" style="width: 8%; bottom: 5%; left: 12%">
          <q-img src="/images/button_main/button-mission.gif"></q-img>
        </div>
        <div class="absolute" style="width: 8%; bottom: 5%; left: 21%">
          <q-img src="/images/button_main/button-achievement.gif"></q-img>
        </div>
        <div class="absolute" style="width: 8%; bottom: 5%; left: 30%">
          <q-img src="/images/button_main/button-equipment.gif"></q-img>
        </div>
        <div class="absolute" style="width: 8%; bottom: 5%; left: 39%">
          <q-img src="/images/button_main/button-shop.gif"></q-img>
        </div>
        <!-- Right -->
        <div class="absolute cursor-pointer" style="width: 9.5%; bottom: 3%; right: 3%">
          <q-img
            class="animation-button-start"
            src="/images/button_main/button-learn.png"
          ></q-img>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import headerBar from "components/lobby_main/header-bar.vue";
import footerBar from "components/lobby_main/footer-bar.vue";
import background from "src/components/test_lobby/background.vue";
import character from "components/character_main/character.vue";
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import { axios } from "src/boot/axios";
import { useQuasar } from "quasar";

export default {
  components: {
    headerBar,
    footerBar,
    background,
    character,
  },
  props: {
    // Store
    studentStore: {
      type: Object,
      default: () => {},
    },
    systemStore: {
      default: () => {},
    },
    schoolStore: {
      default: () => {},
    },
    courseStore: {
      default: () => {},
    },
    synchronizeStore: {
      default: () => {},
    },
    newsStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
    buddyStore: {
      default: () => {},
    },
  },
  setup(props) {
    const $q = useQuasar();
    const router = useRouter();
    const isShowPopupPretest = ref(false);

    const lobbyData = reactive({
      func: {
        goto(name) {
          if (name == "ranking") {
          } else if (name == "equiptment") router.push("/equipment");
          else if (name == "shop") router.push("/shop");
        },
      },
    });

    const funcGoto = () => {
      router.replace("/prepost/pretest/");
    };

    const funcRouteToExam = () => {
      router.replace("/exam/test/" + examId.value.examId);
    };

    const examId = ref("");
    const isShowPopupExam = ref(false);
    const isShowPopupCancelExam = ref(false);

    const funcCheckExam = async () => {
      const url = `${process.env.NEWAPI_ASIA}/eExam-checkExamOpen`;
      const postData = {
        studentId: props.studentStore.studentId,
        class: props.courseStore.class,
        schoolId: props.studentStore.schoolId,
      };

      const response = await axios.post(url, postData);

      if (response.data != "exam not found") {
        let examList = [];
        response.data.forEach((element) => {
          let startDate = element.startDate;
          let endDate = element.endDate;
          let currentDate = new Date().getTime();

          // let currentDate = element.currentTime;
          if (currentDate >= startDate && currentDate <= endDate) {
            if (element.roomSelected.includes(props.courseStore.room)) {
              let examId = element.examId;
              let timeoutSec =
                Number(element.timeBalance.min) * 60 + Number(element.timeBalance.sec);
              examList.push({
                examId: examId,
                title: element.title,
                startTime: element.startTime,
                endTime: element.endTime,
                timeoutSec: timeoutSec,
              });
            }
          }
        });

        if (examList.length) {
          examId.value = examList[0];
          isShowPopupExam.value = true;
          timeout = setTimeout(() => {
            isShowPopupExam.value = false;
            isShowPopupCancelExam.value = false;
            clearTimeout(timeout);
          }, examList[0].timeoutSec * 1000);
        }
      }
    };

    const funcLogoutExam = () => {
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
          router.replace("/");
        })
        .catch(function (error) {
          // An error happened.
        });
    };

    const funcCloseExamDialog = () => {
      isShowPopupExam.value = false;
      isShowPopupCancelExam.value = true;
    };

    onMounted(() => {
      if (props.systemStore.isLogin) {
        props.systemStore.setRouter("lobby");

        funcCheckExam();

        props.studentStore.getCoin();
        props.studentStore.getLevel();
        props.courseStore.getAllCourse();

        // courseStore.$patch((state) => {
        //   state.courseList.isUpdate = true;
        //   state.course.isUpdate = true;
        // });

        if (
          (props.schoolStore.isPretest && !props.studentStore.isPretest) ||
          (props.schoolStore.isPosttest && !props.studentStore.isPosttest)
        )
          isShowPopupPretest.value = true;
      }
    });

    return {
      // Data
      lobbyData,
      examId,

      isShowPopupPretest,

      isShowPopupExam,
      isShowPopupCancelExam,

      //
      funcGoto,
      funcRouteToExam,
      funcLogoutExam,
      funcCloseExamDialog,
    };
  },
};
</script>

<style lang="scss" scoped>
.lobby-container {
  box-sizing: content-box;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-color: #fff;
  background-size: contain;
  background-position: center;
}

.animation-button-start {
  animation: buttonStart 1s linear infinite alternate-reverse;
}

@keyframes buttonStart {
  to {
    transform: translateY(-20px);
  }
}

.text-level {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}

.bg {
  background-image: url("/images/background_main/backdrop-lobby.png");
  max-width: 1600px;
  max-height: 900px;
  width: 100%;
  height: 100%;
}
</style>
