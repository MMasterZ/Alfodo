<template>
  <div class="adventureLanding">
    <div class="absolute-center" style="width: 100%; height: 500px">
      <div style="height: 50px"></div>

      <!-- เมฆ -->
      <!-- pc -->
      <div class="desktop-only" style="height: 100px">
        <transition appear enter-active-class="animated1  animate__fadeInRight">
          <q-img
            class="absolute cloud1"
            style="width: 100px"
            src="/images/school/cloud1.png"
          />
        </transition>
        <transition appear enter-active-class="animated2  animate__fadeInRight">
          <q-img
            class="absolute cloud2"
            style="width: 100px"
            src="/images/school/cloud3.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__fadeInRight">
          <q-img
            class="absolute cloud3"
            style="width: 95px"
            src="/images/school/cloud2.png"
          />
        </transition>
        <transition appear enter-active-class="animated4  animate__fadeInRight">
          <q-img
            class="absolute cloud4"
            style="width: 62px"
            src="/images/school/cloud4.png"
          />
        </transition>
      </div>
      <!-- mobile -->
      <div class="mobile-only relative-position" style="height: 100px">
        <transition appear enter-active-class="animated2  animate__fadeInRight">
          <q-img
            class="absolute"
            style="width: 100px; right: 0px"
            src="/images/school/cloud3.png"
          />
        </transition>
        <transition appear enter-active-class="animated3  animate__fadeInRight">
          <q-img
            class="absolute"
            style="width: 62px; bottom: 0px; left: 10%"
            src="/images/school/cloud2.png"
          />
        </transition>
      </div>
    </div>
    <div class="absolute-center">
      <div>
        <div class="text-center z-top">
          <!-- โหลด  -->
          <!-- โลโก้ -->
          <transition appear enter-active-class="animatedLogo animate__bounceIn">
            <logo-login></logo-login>
          </transition>
          <!-- <div style="height: 40px"></div> -->
          <div>
            <!-- ช่องโหลด -->
            <div style="width: 320px" class="q-mt-md">
              <div
                style="
                  background-color: #ffaa2e;
                  height: 20px;
                  border-radius: 50px;
                  padding: 2px;
                "
              >
                <div
                  class="fit relative-position"
                  style="background-color: #d38a14; border-radius: 50px; padding: 2px"
                >
                  <div
                    class="full-height loading-bar"
                    :style="`width:${progressLoading}%`"
                    style="height: 10px"
                  ></div>
                  <div class="absolute-center">
                    {{ `${progressLoading.toFixed(0)}%` }}
                  </div>
                </div>
              </div>
            </div>
            <div class="q-py-sm appendMovingDots f16 animate">
              {{ loadingType }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import logoLogin from "../components/logo-login.vue";
import { useNewsStore } from "src/stores/news";
import { useCourseStore } from "src/stores/course";
import { usePracticeStore } from "src/stores/practice.js";
import { useInventoryStore } from "src/stores/inventory.js";
import { useSystemStore } from "src/stores/system.js";
import { useStudentStore } from "src/stores/student.js";
import { useItemShopStore } from "src/stores/item-shop.js";
import { auth } from "src/router";
import { useEventStore } from "src/stores/event";

export default {
  components: {
    logoLogin,
  },
  setup(props) {
    // ********************** Quasar **********************
    const $q = useQuasar();
    const newsStore = useNewsStore();
    const courseStore = useCourseStore();
    const itemshopStore = useItemShopStore();
    const inventoryStore = useInventoryStore();
    const studentStore = useStudentStore();
    const practiceStore = usePracticeStore();
    const systemStore = useSystemStore();
    // const eventStore = useEventStore();

    // ********************** Router **********************
    const router = useRouter();

    // ********************** Show Loading **********************

    let setLoadingData = 12;
    const successData = ref(0);
    const progressLoading = computed(() => {
      let progress = (successData.value / setLoadingData) * 100;

      return progress;
    });

    const loadingType = ref("");
    // ********************** Check Login **********************

    let authListen;
    onMounted(async () => {
      if (systemStore.isLogin) {
        authListen = auth.onAuthStateChanged(async (user) => {
          if (user) {
            // Student
            loadingType.value = "กำลังโหลด...";
            await studentStore.getStudentData();
            successData.value++;

            const promises = [
              studentStore.checkEventReward(),
              studentStore.getStudentCouponCode(),
              inventoryStore.getInventory(),
              studentStore.getTutorial(),
              studentStore.getStudentLevelReward(),
              courseStore.getCourse(),
              courseStore.getAllCourse(),
              newsStore.getNews(),
              itemshopStore.getItemShop(),
              systemStore.getServerTime(),
            ];

            // Function to wrap a promise and track progress
            function trackProgress(promise) {
              return promise.finally(() => {
                successData.value++;
              });
            }

            // Wrap each promise to track progress
            const trackedPromises = promises.map(trackProgress);

            await Promise.all(trackedPromises);

            practiceStore.setPracticelevel(courseStore.courseLevel);

            if (courseStore.courseLevel !== "0") {
              // pertest and posttest
              await Promise.all([
                newsStore.getMailbox(),
                practiceStore.getPracticeList(),
                practiceStore.getPracticeListName(),
                practiceStore.getPracticeLog(),
                practiceStore.getUnitProgress(),
                practiceStore.checkFirstTimeShowDialogLessonAchievement(),
                studentStore.getPrepostLog(),
              ]);

              successData.value++;

              loadingType.value = "กำลังเข้าสู่ระบบ";
            } else {
              successData.value = 12;
            }

            // // Event
            // loadingType.value = "โหลดข้อมูลกิจกรรม";
            // await eventStore.getEventAll();
            // successData.value++;

            // loadingType.value = "โหลดข้อมูลเสร็จสิ้น";

            // return;

            // setTimeout(() => {
            //   if (studentStore.isHasCharacter) {
            //     loadingType.value = "กำลังเข้าสู่ระบบ";
            //   } else {
            //     loadingType.value = "ไปหน้าสร้างตัวละคร";
            //   }
            // }, 700);

            // setTimeout(() => {
            if (studentStore.isHasCharacter) {
              // หากมี ตัวละครแล้ว ไปที่ Lobby เลย
              router.replace("/lobby");
            } else {
              // หากยังไม่มีตัวละคร ไปสร้างตัวละคร
              router.push("/create/character");
            }
            // }, 1200);
          } else {
            if (authListen) authListen();
            // router.replace("/");
          }
        });
      } else {
        router.replace("/");
      }
    });

    onBeforeUnmount(() => {
      // console.log("Clear Student Store");
      systemStore.disposeStore();
      // console.log(" ");

      if (authListen) authListen();
    });

    return {
      progressLoading,
      loadingType,
    };
  },
};
</script>

<style lang="scss" scoped>
.loading-bar {
  background: rgb(204, 36, 36);
  background: linear-gradient(180deg, rgba(204, 36, 36, 1) 0%, rgba(255, 84, 84, 1) 100%);
  border-radius: 50px;
  transition: width 1s;
}
.cloud1 {
  left: 18%;
}
.cloud2 {
  top: 5%;
  left: 60%;
}
.cloud3 {
  left: 32%;
  bottom: 60%;
}
.cloud4 {
  left: 80%;
  bottom: 65%;
}
.animatedLogo {
  animation-duration: 1s;
}
.animated1 {
  animation-duration: 4.5s;
}
.animated2 {
  animation-duration: 4s;
}
.animated3 {
  animation-duration: 3.5s;
}
.animated4 {
  animation-duration: 3s;
}
.appendMovingDots:after {
  content: " .";
  animation: dots 2s steps(1, end) infinite;
}
@keyframes dots {
  0%,
  12.5% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    text-shadow: 0.5em 0;
  }
  50% {
    text-shadow: 0.5em 0, 1em 0;
  }
}
</style>
