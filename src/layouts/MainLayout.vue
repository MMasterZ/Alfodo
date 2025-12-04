<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container :class="$q.platform.is.desktop && $route.name != 'subscribepackage'
      ? 'background-main'
      : ''
      ">
      <router-view :isSynchronize="synchronizeStore.isSynchronize" :syncData="synchronizeStore.syncData"
        :practiceStore="practiceStore" :studentStore="studentStore" :newsStore="newsStore" :schoolStore="schoolStore"
        :systemStore="systemStore" :inventoryStore="inventoryStore" :itemshopStore="itemshopStore"
        :synchronizeStore="synchronizeStore" :courseStore="courseStore" :buddyStore="buddyStore"
        :miniGameStore="miniGameStore" :isLoaded="isShowLoading" />
    </q-page-container>
  </q-layout>

  <!-- #region Dialog Payment -->
  <!-- <dialog-payment
    v-if="systemStore.activeState.isShowDialogPackageMenu"
    @callback-closeDialog="funcCloseDialogPackage()"
  ></dialog-payment> -->
  <!-- #endregion -->

  <!-- #region Dialog Your Level -->
  <dialog-your-level></dialog-your-level>
  <!-- #endregion -->

  <!-- #region Dialog Unlock Level -->
  <!-- <dialog-unlock-level></dialog-unlock-level> -->
  <!-- #endregion -->

  <!-- #region Dialog pretest -->
  <q-dialog persistent v-model="isShowDialogPrePost" data-cy="dialog-pretest" class="z-max">
    <q-card flat class="bg-transparent" style="width: 320px">
      <q-card-section class="bg-transparent no-padding">
        <q-img src="/images/prepost/box-dialog-testing-mode.png" class="fit">
          <div class="absolute-center transparent full-width no-padding"
            style="height: 40%; top: 53.5%; color: #512a08">
            <div align="center" class="font-mali-b row justify-center items-center items-center f20 relative-position"
              style="height: 70px">
              <div class="col-12" v-if="!isContinueTest">
                <div v-if="testType == 'quizPost' || testType == 'quizMid'">ทดสอบ</div>
                <span v-if="testType == 'pretest'">ทดสอบก่อนเรียน</span>
                <span v-if="testType == 'midterm'">สอบกลางภาคเรียน</span>
                <span v-if="testType == 'posttest'">สอบปลายภาคเรียน</span>
                <span v-if="testType == 'quizPost'">ก่อนสอบปลายภาคเรียน</span>
                <span v-if="testType == 'quizMid'">ก่อนสอบกลางภาคเรียน</span>
              </div>
              <div v-else>
                <span>ยังทำข้อสอบไม่เสร็จ</span>
              </div>
            </div>
            <div align="center" class="f14 font-mali-r q-py-sm row justify-center items-center relative-position">
              <div v-if="
                testType == 'pretest' || testType == 'quizMid' || testType == 'quizPost'
              ">
                มาตั้งใจสอบเพื่อรับเหรียญเพิ่มกันเถอะ !
              </div>
              <div v-else>มาตั้งใจสอบเพื่อรับรางวัลพิเศษกันเถอะ !</div>
            </div>
          </div>
          <div style="width: 100%; bottom: 15px; z-index: 1000"
            class="bg-transparent absolute-bottom row justify-center" align="center">
            <div v-if="!isContinueTest">
              <q-img @click="funcGotoPrePost()" width="160px" class="cursor-pointer"
                src="/images/prepost/button-start-test.png" no-spinner no-transition></q-img>
            </div>
            <div v-else>
              <q-img @click="funcGotoPrePost()" width="160px" class="cursor-pointer"
                src="/images/prepost/button-continue-test.webp" no-spinner no-transition></q-img>
            </div>
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Questionnaire -->
  <q-dialog v-model="isShowDialogQuestionnaire" maximized persistent class="z-max" v-if="!isShowDialogExam && !isShowDialogPrePost">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center no-padding items-center">
        <div class="relative-position">
          <q-img width="320px" src="/images/questionnaire/questionnaire-dialog.png" no-spinner no-transition>
            <div class="absolute-center transparent full-width no-padding"
              style="height: 40%; top: 55%; color: #512a08">
              <div align="center"
                class="font-mali-b q-mt-sm row justify-center items-center items-center f20 relative-position"
                style="height: 50px">
                <div class="col-12">
                  <div>แบบสอบถาม</div>
                </div>
              </div>
              <div align="center" class="f14 font-mali-r row justify-center items-center relative-position">
                <div>ขอความร่วมมือทำแบบสอบถาม</div>
                <div class="q-my-sm">เพื่อรับเหรียญเพิ่มกันเถอะ !</div>
              </div>
            </div>
            <div class="absolute-bottom transparent no-padding" style="bottom: 30px" align="center">
              <q-img width="180px" class="cursor-pointer" src="/images/questionnaire/questionnaire-button-dialog.png"
                @click="funcGoToQuestionnaire()" no-spinner no-transition></q-img>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog exam -->
  <q-dialog persistent v-model="isShowDialogExam" class="z-max" data-cy="dialog-exam">
    <div class="relative-position shadow-0" style="width: 320px; overflow: hidden">
      <div class="text-center" style="position: relative">
        <q-img src="images/speaker_exam.png" class="relative-position" style="width: 194px; top: 58.5px"></q-img>
      </div>

      <div style="
          border: 5px solid #4a261b;
          background-color: #f2c043;
          border-radius: 20px;
          padding: 7px;
        ">
        <div class="fit" style="border-radius: 20px">
          <div style="background-color: #ffedc4; border-radius: 12px" class="q-py-lg">
            <div style="font-size: 18px; color: #512a08" class="q-pa-sm q-pt-md text-weight-bold text-center">
              <div v-if="examData">
                {{ examData.title }}
              </div>
            </div>

            <div align="center" class="f14 font-mali-r q-pb-md">
              <div>มาตั้งใจสอบกันเถอะ !</div>
            </div>

            <div style="width: 100%; bottom: 15px; z-index: 1000" class="bg-transparent row justify-center"
              align="center">
              <q-img @click="funcRouteToExam()" v-close-popup width="160px" class="cursor-pointer"
                src="/images/prepost/button-start-test.png"></q-img>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </q-card-section>
      </q-card> -->
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog cancel exam -->
  <q-dialog persistent v-model="isShowDialogCancelExam" class="z-max" data-cy="dialog-exam">
    <q-card flat class="bg-transparent" style="width: 320px">
      <q-card-section class="bg-transparent text-dark no-padding">
        <!-- รูปพื้นหลัง Error -->
        <q-img src="/images/warning.png" class="fit">
          <div class="absolute-center bg-transparent full-width">
            <div style="font-size: 24px; color: #512a08" align="center"
              class="text-weight-bold relative-position q-px-md">
              ฉันยังไม่พร้อม
            </div>

            <div class="font-16 relative-position q-px-md q-pt-sm" style="color: #512a08" align="center">
              คุณจำเป็นต้องสอบตามเวลาที่ กำหนดภายในวันนี้เท่านั้น ต้องการออกจากระบบหรือไม่
              ?
            </div>
          </div>
          <div style="width: 100%; bottom: 30px; z-index: 1000" class="bg-transparent absolute-bottom" align="center">
            <div class="row justify-evenly">
              <q-img v-ripple class="cursor-pointer" src="/images/logoutExam.png" style="width: 120px"
                @click="funcLogoutExam()"></q-img>

              <q-img v-ripple class="cursor-pointer" src="/images/startExam.png" @click="funcRouteToExam()"
                v-close-popup style="width: 120px"></q-img>
            </div>
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Your level 2 -->
  <dialog-your-level-2 v-if="isShowDialogYourLevel" @close-dialog="isShowDialogYourLevel = false"></dialog-your-level-2>
  <!-- #endregion -->

  <!-- #region Dialog Level expired -->
  <dialog-level-expired v-if="courseStore.isShowDialogLevelExpired && studentStore.studentType != 'school' && false"
    @callback-closeDialog="funcCloseDialogLevelExpired()"
    @callback-gotoPackage="funcGotoPackage()"></dialog-level-expired>
  <!-- #endregion -->

  <!-- #region Event Reward -->
  <!-- <eventReward></eventReward> -->

  <!-- #region Dialog Disconnect -->
  <diaconnect-dialog :isDialogDisconnect="isShowDialogDisconnect" class="z-max"></diaconnect-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Maintenance -->
  <dialog-maintenance v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="isShowDialogMaintenance = false"></dialog-maintenance>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <!-- <loading-dialog v-if="systemStore.activeState.isShowDialogLoading"></loading-dialog> -->
  <!-- #endregion -->
</template>

<script setup>
// Componnent
import dialogLevelExpired from "components/dialog_main/dialog-level-expired.vue";
import dialogQuestionnaire from "components/dialog_main/dialog-questionnaire.vue";
import dialogPayment from "components/dialog_main/dialog-payment.vue";
import dialogYourLevel from "components/dialog_main/dialog-your-level.vue";
import disconnectDialog from "components/dialog_main/disconnect-dialog.vue";
import dialogUnlockLevel from "components/dialog_main/dialog-unlock-level.vue";
import dialogMaintenance from "components/dialog_main/dialog-maintenance.vue";
import dialogYourLevel2 from "components/dialog_main/dialog-your-level-2.vue";

import loadingDialog from "components/dialog-loading.vue";
import { useQuasar } from "quasar";
import { auth, db } from "src/router";

// Store
import { useCourseStore } from "src/stores/course";
import { useInventoryStore } from "src/stores/inventory";
import { useItemShopStore } from "src/stores/item-shop";
import { useNewsStore } from "src/stores/news";
import { usePracticeStore } from "src/stores/practice";
import { useSchoolStore } from "src/stores/school";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useBuddyStore } from "src/stores/buddy";
import { useEventStore } from "src/stores/event";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMiniGameStore } from "src/stores/minigame";
import Stats from "https://cdnjs.cloudflare.com/ajax/libs/stats.js/17/Stats.js";

// Initailize Data
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

// Safe router navigation function
const safeRouterNavigate = (method, path) => {
  try {
    if (!$router) {
      console.log('Router not available');
      return;
    }

    // Check if path is valid
    if (!path || typeof path !== 'string' || path.trim() === '') {
      console.log('Invalid path for navigation:', path);
      return;
    }

    // Check if component is still mounted
    if (typeof window !== 'undefined' && !document.body) {
      console.log('Document body not available');
      return;
    }

    // Check if component is still mounted
    if (isComponentMounted && !isComponentMounted.value) {
      console.log('Component is unmounted, skipping navigation');
      return;
    }

    if (method === 'push') {
      $router.push(path);
    } else if (method === 'replace') {
      $router.replace(path);
    } else if (method === 'go') {
      $router.go(path);
    }
  } catch (err) {
    console.log(`Router ${method} error for path ${path}:`, err);
  }
};

// Store
const practiceStore = usePracticeStore();
const studentStore = useStudentStore();
const schoolStore = useSchoolStore();
const newsStore = useNewsStore();
const courseStore = useCourseStore();
const systemStore = useSystemStore();
const itemshopStore = useItemShopStore();
const inventoryStore = useInventoryStore();
const synchronizeStore = useSynchronizeStore();
const buddyStore = useBuddyStore();
const eventStore = useEventStore();
const miniGameStore = useMiniGameStore();

// Dialog
const isShowDialogDisconnect = ref(false);
const isShowDialogUnlockLevel = ref(false);
const isShowDialogPackageMenu = ref(false);
const isShowDialogPrePost = ref(false);
const isShowDialogQuestionnaire = ref(false);
const isShowDialogExam = ref(false);
const isShowDialogCancelExam = ref(false);
const isShowRouterView = ref(false);
const isShowDialogMaintenance = ref(false);
const isShowDialogYourLevel = ref(false);
const isShowLoading = ref(false);

// #region ***** Function *****

// #region Check Exam
const examData = ref(null);
let examTimeout = null;
const funcCheckExam = async () => {
  if (examTimeout) {
    clearTimeout(examTimeout);
  }

  const response = await practiceStore.checkExam();

  if (response.length == 0) {
    return;
  }

  if (response.length) {
    examData.value = response[0];
    isShowDialogExam.value = true;
    examTimeout = setTimeout(() => {
      isShowDialogExam.value = false;
      isShowDialogCancelExam.value = false;
      clearTimeout(examTimeout);
    }, response[0].timeoutSec * 1000);
  }
};
// #endregion

// #region Logout Exam
const funcLogoutExam = () => {
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      try {
        $router.replace("/");
      } catch (err) {
        console.log('funcLogoutExam router error:', err);
      }
    })
    .catch(function (error) {
      // An error happened.
    });
};
// #endregion

// #region Close Exam Dialog
const funcCloseExamDialog = () => {
  isShowDialogExam.value = false;
  isShowDialogCancelExam.value = true;
};
// #endregion

// #region Check Pre Post Test
const testEndDate = ref("");
const testType = ref("");
const isContinueTest = ref(false);
const funcCheckPrePostTest = async () => {
  let response = await practiceStore.checkTestingMode();

  if (response.isContinue) {
    isContinueTest.value = true;
  }

  testType.value = response.testType;

  testEndDate.value = response.testEndDate;

  isShowDialogPrePost.value = response.isShowPopupPretest;
};
// #endregion

// #region Check Questionnaire
const funcCheckQuestionnaire = async () => {
  const courseStore = useCourseStore();

  const response = await practiceStore.checkQuestionnaire();

  if (response.length) {
    let findIsOpen = response.find((x) => {
      return x.isOpen;
    });

    if (findIsOpen) {
      practiceStore.questionnaireObject.status.isFinish = false;

      if (courseStore.highProgressList.length > 0) {
        isShowDialogQuestionnaire.value = true;
      }
    }
  }
};
// #endregion

// #region go to questionnaire
const funcGoToQuestionnaire = () => {
  isShowDialogQuestionnaire.value = false;
  try {
    const path = "/questionnaire";
    if (path && typeof path === 'string' && path.trim() !== '') {
      $router.push(path);
    }
  } catch (err) {
    console.log('funcGoToQuestionnaire router error:', err);
  }
};
// #endregion

// #region Go to Pre/Post Test
const funcGotoPrePost = () => {
  isShowDialogPrePost.value = false;

  setTimeout(() => {
    try {
      const path = `/${testType.value.toLocaleLowerCase()}`;
      if (path && typeof path === 'string' && path.trim() !== '' && testType.value) {
        $router.replace(path);
      } else {
        console.log('Invalid testType for navigation:', testType.value);
      }
    } catch (err) {
      console.log('funcGotoPrePost router error:', err);
    }
  }, 500);
};
// #endregion

// #region Route to Exam
const funcRouteToExam = () => {
  try {
    const path = "/exam/test/" + (examData.value?.examId || '');
    if (path && typeof path === 'string' && path.trim() !== '' && examData.value?.examId) {
      $router.replace(path);
    } else {
      console.log('Invalid examData for navigation:', examData.value);
    }
  } catch (err) {
    console.log('funcRouteToExam router error:', err);
  }
};
// #endregion

// #region Snap Student
let studentListen;
const isOfflineStatus = ref(false);
const snapStudent = () => {
  studentListen = db
    .collection("student")
    .doc(studentStore.studentId)
    .onSnapshot((res) => {
      let data = res.data();
      let loginKey = window.sessionStorage.getItem("loginKey");

      if (loginKey != data.loginKey) {
        $q.notify({
          message: "มีการเข้าใช้งานจากอุปกรณ์อื่น",
          position: "top",
          color: "red",
        });
        auth.signOut();
        try {
          const path = "/";
          if (path && typeof path === 'string' && path.trim() !== '') {
            $router.push(path);
          }
        } catch (err) {
          console.log('snapStudent router error:', err);
        }
        if (studentListen) studentListen();
        return;
      }
    });
};
// #endregion

// #region Snap Buddy
let buddyListen;
const snapBuddy = () => {
  buddyListen = db
    .collection("student")
    .doc(buddyStore.studentId)
    .onSnapshot((res) => {
      let data = res.data();
      if (data.loginKey != buddyStore.buddy.data.loginKey) {
        $q.notify({
          message: "ตัวละครบัดดี้มีการเข้าใช้งานจากอุปกรณ์อื่น",
          position: "top",
          color: "red",
        });
        try {
          if (buddyListen) {
            try {
              buddyListen();
            } catch (err) {
              console.log('Buddy listener cleanup error:', err);
            }
          }
          buddyStore.$reset();
          buddyListen = null;
        } catch (err) {
          console.log('Buddy cleanup error:', err);
        }

      }
    });
};
// #endregion

// #region Syncronize
let synchronizeListen;
const synchronize = () => {
  synchronizeListen = db
    .collection("synchronize")
    .where("class", "==", courseStore.class)
    .where("room", "==", courseStore.room)
    .where("term", "==", courseStore.term)
    .where("year", "==", courseStore.year)
    .where("schoolId", "==", studentStore.schoolId)
    // .doc(synchornizeKey)
    .onSnapshot((res) => {

      // console.clear();

      // console.log(res);

      if (systemStore.routerName == "create-character") return;

      // console.log(res.size);

      if (res.size) {
        console.log("มีข้อมูลจากระบบ");
        let tempRes = [];
        res.docs.forEach((element) => {
          tempRes.push(element.data());
        });

        tempRes.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);

        let data = tempRes[0];

        console.log(data)

        synchronizeStore.setSynchronizeData(data);

        let newSkill = data.skill === "Listening & Speaking" ? "Listening" : data.skill;

        newSkill = newSkill || "Vocabulary";

        if (data.mode == "control") {
          $q.sessionStorage.set("isSync", true);

          synchronizeStore.isSynchronize = true;
          let path = "/";

          practiceStore.setPracticeSkill(newSkill);

          if (data.page == "lobby") {
            path = "/lobby";
          } else {
            practiceStore.setPracticeData(data);

            path = systemStore.callbackPathRouterPractice(data);
          }

          try {
            // Check if path is valid before navigation
            if (!path || typeof path !== 'string' || path.trim() === '') {
              console.log('Invalid path for navigation:', path);
              return;
            }

            // Check if router is ready
            if (!$router || !$router.currentRoute) {
              console.log('Router not ready for navigation');
              return;
            }

            // Check if component is still mounted
            if (typeof window !== 'undefined' && !document.body) {
              console.log('Document body not available');
              return;
            }

            // Check if component is still mounted
            if (!isComponentMounted.value) {
              console.log('Component is unmounted, skipping navigation');
              return;
            }

            $router.replace(path);
          } catch (err) {
            console.log('Router replace error:', err);
            // Fallback navigation
            try {
              if (path && typeof path === 'string' && path.trim() !== '' && $router && $router.currentRoute) {
                $router.push(path);
              }
            } catch (pushErr) {
              console.log('Router push fallback error:', pushErr);
            }
          }
        } else {
          $q.sessionStorage.set("isSync", false);
          synchronizeStore.isSynchronize = false;
        }
      } else {
        // console.log("ไม่ได้รับข้อมูลจากระบบ");
        $q.sessionStorage.set("isSync", false);
        synchronizeStore.isSynchronize = false;
      }
    });
};
// #endregion

// #region Close Dialog Package
const funcCloseDialogPackage = () => {
  systemStore.systemData.activeState.isShowDialogPackageMenu = false;
};
// #endregion

const funcUserBlur = () => {
  const synchronizeStore = useSynchronizeStore();

  if (synchronizeStore.isSync) {
    const courseStore = useCourseStore();
    courseStore.updateFocusStatus("Blur");
  }
};

const funcUserFocus = () => {
  const synchronizeStore = useSynchronizeStore();

  if (synchronizeStore.isSync) {
    const courseStore = useCourseStore();
    courseStore.updateFocusStatus("Focus");
  }
};

// #region Set user as active
let inactiveTimeout;
let isActive = true;
function setActive() {
  if (!isActive) {
    isActive = true;
    // console.log("User is active.");

    // Save active status to Firestore
    saveActiveStatus(true);
  }

  // Clear the inactive timeout and set a new one
  clearTimeout(inactiveTimeout);
  inactiveTimeout = setTimeout(setInactive, 30000); // Set a timeout of 5 seconds of inactivity
}
// #endregion

// #region Set user as inactive
function setInactive() {
  if (isActive) {
    isActive = false;
    // console.log("User is inactive.");

    // Save active status to Firestore
    saveActiveStatus(false);
  }
}
// #endregion

// #region Save active status
function saveActiveStatus(status) {
  const synchronizeStore = useSynchronizeStore();
  let activeStatus = status ? "Focus" : "Blur";
  // console.log("activeStatus: ", activeStatus);
  if (synchronizeStore.isSync) {
    const courseStore = useCourseStore();
    courseStore.updateFocusStatus(activeStatus);
  }
}
// #endregion

const funcGotoPackage = () => {
  // isShowDialogMaintenance.value = true;
  try {
    $router.push("/subscribepackage");
  } catch (err) {
    console.log('funcGotoPackage router error:', err);
  }
};

const funcCloseDialogLevelExpired = () => {
  courseStore.isShowDialogLevelExpired = false;
  try {
    $router.replace("/lobby");
  } catch (err) {
    console.log('funcCloseDialogLevelExpired router error:', err);
  }
};

// #endregion

// #region ***** Computed *****

const isLoaded = computed(() => {
  if (practiceStore.isLoading && systemStore.routerName == "Practice Skill") {
    return true;
  }

  if (isOfflineStatus.value) return true;

  return false;
});

// #endregion

watch(
  () => systemStore.routerName,
  async (newValue) => {
    if (newValue == "lobby") {
      await funcCheckPrePostTest();
    }
  }
);

// #region ***** Mounted *****
let authListen;
let setTimeoutToken;
let isComponentMounted = ref(true);

// let eventStoreListen;
onMounted(async () => {
  isComponentMounted.value = true;
  authListen = auth.onAuthStateChanged(async (user) => {
    if (user) {
      // const stat = new Stats();

      $q.loading.show();

      await systemStore.setToken();
      await systemStore.getServerTime();
      await courseStore.getAllCourse();

      setTimeout(async () => {
        await studentStore.getStudentData();
        await studentStore.getTutorial();
      }, 500);

      if (courseStore.courseLevel == 0 || courseStore.courseLevel == "0") {
        await courseStore.setCourseLevel();
      }

      isShowLoading.value = true;

      $q.loading.hide();

      let startTime = null;
      let lastFrameTime = null;

      function updateTime(timestamp) {
        if (!startTime) {
          startTime = timestamp;
          lastFrameTime = timestamp;
        }

        const elapsed = timestamp - lastFrameTime;

        if (elapsed >= 1000) {
          // โค้ดที่ต้องการรันทุก 1 วินาที
          // console.log("รันทุก 1 วินาที (requestAnimationFrame)");
          lastFrameTime = timestamp;

          systemStore.setDatetime(1000);
        }

        if (elapsed >= 300000) {
          systemStore.setToken();
        }

        requestAnimationFrame(updateTime);
      }

      updateTime();

      setTimeout(() => {
        if ($q.platform.is.desktop) systemStore.setPlatform("desktop");
        else systemStore.setPlatform("mobile");
      }, 100);

      try {
        window.addEventListener("offline", function (e) {
          try {
            systemStore.setStatus("offline");

            setTimeout(() => {
              isShowDialogDisconnect.value = true;
            }, 1000);
          } catch (err) {
            console.log('Offline event handler error:', err);
          }
        });

        window.addEventListener("online", function (e) {
          try {
            systemStore.setStatus("online");
            setTimeout(() => {
              isShowDialogDisconnect.value = false;
            }, 1000);
          } catch (err) {
            console.log('Online event handler error:', err);
          }
        });
      } catch (err) {
        console.log('Window event listener setup error:', err);
      }

      try {
        window.onbeforeunload = function (event) {
          try {
            var message = "?";
            if (typeof event == "undefined") {
              event = window.event;
            }
            if (event) {
              event.returnValue = message;
            }
            return message;
          } catch (err) {
            console.log('onbeforeunload handler error:', err);
            return null;
          }
        };
      } catch (err) {
        console.log('onbeforeunload setup error:', err);
      }

      // Add event listeners for user interactions
      try {
        document.addEventListener("mousemove", setActive);
        document.addEventListener("keydown", setActive);
        document.addEventListener("scroll", setActive);
      } catch (err) {
        console.log('Event listener setup error:', err);
      }

      if (
        practiceStore.prePostObject.type != "quizMid" &&
        practiceStore.prePostObject.type != "quizPost"
      ) {
        practiceStore.clearPrePost();
      } else {
        if (
          practiceStore.prePostStatus.isTimeout ||
          practiceStore.prePostStatus.isFinishPrePostTest
        ) {
          practiceStore.clearPrePost();
        }
      }

      if(studentStore.studentType === 'school'){
        funcCheckExam();
        await funcCheckPrePostTest();
      }

      funcCheckQuestionnaire();

      let studentStoreListen;
      let practiceStoreListen;
      let systemStoreListen;
      let itemshopStoreListen;
      let inventoryStoreListen;
      let courseStoreListen;
      let buddyStoreListen;
      let miniGameStoreListen;

      if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
        courseStore.isShowDialogLevelExpired = true;
      }

      studentStoreListen = studentStore.$subscribe(async (mutations, state) => {
        // if (!systemStore.systemData.activeState.isShowDialogUnlockLevel) {
        //   if (state.student.data.type == "online") {
        //     if (state.student.data.distanceInDays > 0) {
        //       // if (!state.student.data.isSelectedLevel) {
        //       // systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
        //       return;
        //       // }
        //     }
        //   }
        // }
      });

      buddyStoreListen = buddyStore.$subscribe((mutations, state) => {
        try {
          if (state.buddy.isBuddy) {
            if (buddyListen) return;
            snapBuddy();
          } else {
            try {
              if (buddyListen) buddyListen();
              buddyListen = null;
            } catch (err) {
              console.log('Buddy listener cleanup in subscribe error:', err);
              buddyListen = null;
            }
          }
        } catch (err) {
          console.log('Buddy store subscribe error:', err);
        }
      }, {
        immediate: true,
      });

      practiceStoreListen = practiceStore.$subscribe(
        async (mutations, state) => {
          // systemStore.systemData.activeState.isShowDialogLoading = true;

          // #region Practice List Update
          if (state.practiceList.isUpdate) {
            await practiceStore.getPracticeList();
          }
          // #endregion

          // #region Practice List Name Update
          if (state.practiceListName.isUpdate) {
            await practiceStore.getPracticeListName();
          }
          // #endregion

          // #region Practice Log Update
          if (state.practiceLog.isUpdate) {
            if (
              systemStore.routerName == "lobby" ||
              systemStore.routerName == "Practice Skill"
            ) {
              practiceStore.getUnitProgress();
              courseStore.getAllCourse();

              practiceStore.setPracticeLogUpdate(false);
            }
          }
          // #endregion

          // systemStore.systemData.activeState.isShowDialogLoading = false;
        },
        {
          immediate: true,
        }
      );

      itemshopStoreListen = itemshopStore.$subscribe(async (mutations, state) => { });

      courseStoreListen = courseStore.$subscribe(async (mutations, state) => { });

      inventoryStoreListen = inventoryStore.$subscribe((mutations, state) => {
        if (state.inventory.isUpdate) {
          inventoryStore.getInventory();
        }
      });

      systemStoreListen = systemStore.$subscribe(
        async (mutations, state) => {
          if (systemStore.routerName == "lobby") {
            // console.log("*** A1");
            // if (!studentStore.studentData.isSelectedLevel) {
            // console.log("*** A2");
            if (courseStore.courseLevel == 0) {
              // console.log("*** A3");
              if (!studentStore.isSkipPlacementTest) {
                // console.log("*** A4");
                if (studentStore.studentData.isPlacement) {
                  console.log("*** A5");
                  if(!studentStore.studentData.isSevenDayTrial){
                    isShowDialogYourLevel.value = true;
                  }
                  setTimeout(() => {
                    studentStore.student.data.isPlacement = false;
                  }, 1000);
                }
                return;
              }
            }
          }

          if (
            systemStore.routerName != "lobby" &&
            systemStore.routerName != "Shop" &&
            systemStore.routerName != "Equipment" &&
            systemStore.routerName != "gachapon" &&
            systemStore.routerName != "placement"
          ) {
            // ถ้าเป็นนักเรียนออนไลน์
            if (studentStore.studentType != "school") {
              // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
              if (!studentStore.isAgreePolicy) {
                try {
                  const path = "/lobby";
                  if (path && typeof path === 'string' && path.trim() !== '') {
                    $router.push(path);
                  }
                } catch (err) {
                  console.log('Policy agreement router error:', err);
                }
                return;
              }

              // ยังไม่เคยเลือกระดับ
              // if (!studentStore.studentData.isSelectedLevel) {
              // console.log("*** A1");
              if (courseStore.courseLevel == 0) {
                // console.log("*** A2");
                try {
                  const path = "/lobby";
                  if (path && typeof path === 'string' && path.trim() !== '') {
                    $router.replace(path);
                  }
                } catch (err) {
                  console.log('Course level router error:', err);
                }
                // isShowDialogMaintenance.value = true;
                return;
              }
              // }

              // เคยเลือกระดับแล้ว
              else {
                // แพ็คเกจที่ใช้งานอยู่หมดอายุ
                // if (studentStore.distanceInDays < 0) {
                // $router.push("/subscribepackage");
                // systemStore.systemData.activeState.isShowDialogPackageMenu = true;
                // isShowDialogMaintenance.value = true;
                // $router.replace("/lobby");
                // return;
                // }
              }
            }
          }
        },
        {
          immediate: true,
        }
      );

      miniGameStoreListen = miniGameStore.$subscribe((mutations, state) => { }, {});

      const synchornizeKey = `${courseStore.class}-${courseStore.room}-${courseStore.term}-${courseStore.year}-${studentStore.schoolId}`;


      if(studentStore.studentType === 'school'){
        synchronize();
      }

      snapStudent();
    } else {
      console.log("*** error");
      isOfflineStatus.value = true;

      try {
        if (synchronizeListen) {
          try {
            synchronizeListen();
          } catch (err) {
            console.log('Synchronize listener cleanup error:', err);
          }
        }
        if (studentListen) {
          try {
            studentListen();
          } catch (err) {
            console.log('Student listener cleanup error:', err);
          }
        }
        if (buddyListen) {
          try {
            buddyListen();
          } catch (err) {
            console.log('Buddy listener cleanup error:', err);
          }
        }
        if (authListen) {
          try {
            authListen();
          } catch (err) {
            console.log('Auth listener cleanup error:', err);
          }
        }
      } catch (err) {
        console.log('Firebase listeners cleanup error:', err);
      }

      isOfflineStatus.value = false;

      try {
        const path = "/";
        if (path && typeof path === 'string' && path.trim() !== '') {
          $router.replace(path);
        }
      } catch (err) {
        console.log('Auth state change router error:', err);
      }
    }
  });

  // #region ***** Before Unmount *****
  onBeforeUnmount(() => {
    isComponentMounted.value = false;
    try {
      // Cleanup Firebase listeners
      if (synchronizeListen) {
        try {
          synchronizeListen();
        } catch (err) {
          console.log('Synchronize listener cleanup error:', err);
        }
      }
      if (studentListen) {
        try {
          studentListen();
        } catch (err) {
          console.log('Student listener cleanup error:', err);
        }
      }
      if (buddyListen) {
        try {
          buddyListen();
        } catch (err) {
          console.log('Buddy listener cleanup error:', err);
        }
      }
      if (authListen) {
        try {
          authListen();
        } catch (err) {
          console.log('Auth listener cleanup error:', err);
        }
      }

      // Cleanup timeouts
      if (setTimeoutToken != null) {
        try {
          clearTimeout(setTimeoutToken);
        } catch (err) {
          console.log('setTimeoutToken cleanup error:', err);
        }
      }
      if (examTimeout) {
        try {
          clearTimeout(examTimeout);
        } catch (err) {
          console.log('examTimeout cleanup error:', err);
        }
      }
      if (inactiveTimeout) {
        try {
          clearTimeout(inactiveTimeout);
        } catch (err) {
          console.log('inactiveTimeout cleanup error:', err);
        }
      }

      // Remove event listeners safely
      try {
        document.removeEventListener("mousemove", setActive);
        document.removeEventListener("keydown", setActive);
        document.removeEventListener("scroll", setActive);
      } catch (err) {
        console.log('Event listener cleanup error:', err);
      }

      // Cleanup window event listeners
      try {
        window.removeEventListener("offline", function() {});
        window.removeEventListener("online", function() {});
      } catch (err) {
        console.log('Window event listener cleanup error:', err);
      }

      // Dispose store
      try {
        systemStore.disposeStore();
      } catch (err) {
        console.log('Store disposal error:', err);
      }

    } catch (err) {
      console.log('MainLayout onBeforeUnmount error:', err);
    }
  });
  // #endregion
});
</script>

<style>
.background-main {
  min-width: 1000px;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
