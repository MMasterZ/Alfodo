<template>
  <div class="row">
    <!-- #region Desktop -->
    <div class="col-6" v-if="isDesktop" style="width: 350px">
      <q-img
        class="cursor-pointer"
        @click="$emit('callback-dialogProfile')"
        src="/images/icon_main/icon-profile-bar.png"
        no-spinner
        no-transition
      >
        <div class="fit no-padding transparent row">
          <div class="col-1 self-center q-pt-sm" style="width: 110px" align="center">
            <span class="text-level-pc">
              {{ studentStore.studentLevel }}
            </span>
          </div>
          <div class="self-center q-pt-sm q-mt-xs q-px-xs col row relative-position">
            <div class="col-1 self-center width-fit">
              <q-img
                width="30px"
                src="/images/icon_main/icon-user.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="col self-end q-px-xs text-overflow q-pt-xs-sm">
              <span class="relative-position f16">
                {{ `${studentStore.characterName} ` }}
              </span>
            </div>
            <div class="col-1 self-end width-fit">
              <q-img
                width="30px"
                src="/images/icon_main/icon-click-profile.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <div class="col-12 q-pt-xs">
              <div class="box-progress-bar">
                <div
                  class="progress"
                  :style="`width:${studentStore.progressLevel}%`"
                ></div>
              </div>
            </div>

            <div
              v-if="courseStore.course.profileNotiStatus"
              class="absolute-top-right bg-red animate__animated animate__delay-2s animate__flash"
              style="
                width: 10px;
                height: 10px;
                top: -5px;
                right: -0px;
                border-radius: 50%;
                animation-duration: 1s;
              "
            ></div>
          </div>
        </div>
      </q-img>
    </div>

    <div class="q-pa-sm q-mt-sm" align="center" v-if="isDesktop">
      <q-btn round dense flat size="8px" @click="$emit('callback-dialogTutorial')">
        <q-img src="/images/icon_main/icon-info.png" no-spinner no-transition></q-img>
      </q-btn>
    </div>

    <div class="col-1 self-center q-mx-md width-fit" v-if="isDesktop">
      <div
        class="row relative-position cursor-pointer"
        style="
          width: 150px;
          height: 40px;
          border-radius: 33px;
          background-color: rgba(0, 0, 0, 0.5);
          border: 3px solid #4a261b;
        "
      >
        <div class="col-2 relative-position">
          <q-img
            width="60.88px"
            class="absolute-center"
            style="top: 55%"
            src="/images/icon_main/icon-coin-winner.png"
            no-spinner
            no-transition
          >
          </q-img>
        </div>
        <div class="col row justify-center items-center" align="center">
          <span class="text-number-header f24 font-mali-b">{{
            studentStore.coin <= 99999 ? studentStore.coin : "+99999"
          }}</span>
        </div>

        <q-tooltip class="transparent">
          <div style="background-color: #4a261b; border-radius: 20px; padding: 5px">
            {{ `ได้รับจากการทำแบบฝึดหัดถูกต้อง` }}
          </div>
        </q-tooltip>
      </div>
    </div>

    <div class="col-1 self-center q-mx-lg width-fit" v-if="isDesktop">
      <div
        class="row relative-position cursor-pointer"
        style="
          width: 150px;
          height: 40px;
          border-radius: 33px;
          background-color: rgba(0, 0, 0, 0.5);
          border: 3px solid #4a261b;
        "
      >
        <div class="col-2 relative-position">
          <q-img
            width="73.56px"
            class="absolute-center"
            style="top: 55%"
            src="/images/icon_main/icon-mini-game-ticket.png"
            no-spinner
            no-transition
          >
          </q-img>
        </div>
        <div class="col row justify-center items-center" align="center">
          <span class="text-number-header f24 font-mali-b">{{
            `${
              studentStore.studentData.gameTicket > 5
                ? "5"
                : studentStore.studentData.gameTicket || 0
            }/5`
          }}</span>
        </div>

        <q-tooltip class="transparent">
          <div style="background-color: #4a261b; border-radius: 20px; padding: 5px">
            {{ `ได้รับจากการทำแบบฝึกหัด สะสมได้สูงสุด 5 ตั๋ว` }}
          </div>
        </q-tooltip>
      </div>
    </div>

    <div
      class="col-1 self-center q-mx-md width-fit"
      align="center"
      v-if="isDesktop && studentStore.studentType != 'school'"
    >
      <!-- <div class="box-countdown-timer relative-position f12 font-mali-m q-mb-xs" v-if="
        studentStore.distanceInDays >= 0 &&
        studentStore.distanceInDays <= 3 &&
        studentStore.expireDate != ''
      ">
        <span v-if="studentStore.distanceInDays > 0">
          {{ `Time remaining ${studentStore.distanceInDays} Days` }}
        </span>
        <span v-if="studentStore.distanceInDays == 0">
          {{ `Expire today` }}
        </span>
        <q-img class="absolute-top-right" width="30px" style="top: -10px; right: -10px"
          src="/images/icon_main/icon-timer.png" no-spinner no-transition></q-img>
      </div> -->
      <q-img
        width="173px"
        class="cursor-pointer"
        src="/images/button_main/button-subscribe.png"
        @click="funcShowSubscribePackage()"
      ></q-img>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="col-12 q-px-sm" v-if="!isDesktop">
      <div class="relative-position" style="width: 260px">
        <q-img
          @click="$emit('callback-dialogProfile')"
          class="cursor-pointer"
          height="100%"
          src="/images/icon_main/icon-profile-bar.png"
          no-spinner
          no-transition
        >
          <div class="fit transparent row no-padding">
            <div
              class="col-2 self-center relative-position"
              align="center"
              style="width: 85px"
            >
              <div align="center" class="q-mt-sm">
                <span class="text-level">{{ studentStore.studentLevel }} </span>
              </div>
            </div>
            <div class="col self-center row q-pa-xs">
              <div class="col-1 self-center width-fit">
                <q-img
                  width="17px"
                  src="/images/icon_main/icon-user.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="col self-end q-px-xs text-overflow q-pt-xs">
                <span class="relative-position">
                  {{ `${studentStore.characterName} ` }}
                </span>
              </div>
              <div class="col-1 self-end width-fit">
                <q-img
                  width="15px"
                  src="/images/icon_main/icon-click-profile.png"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="col-12">
                <div class="box-progress-bar">
                  <div
                    class="progress"
                    mode-mobile="true"
                    :style="`width:${studentStore.progressLevel}%`"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </q-img>

        <div class="absolute-top-right" style="right: -25px; top: 10px" align="center">
          <q-btn round dense flat size="8px" @click="$emit('callback-dialogTutorial')">
            <q-img src="/images/icon_main/icon-info.png" no-spinner no-transition></q-img>
          </q-btn>
        </div>
      </div>

      <div class="row q-my-md q-pl-sm">
        <div class="q-mr-md">
          <div
            class="row relative-position"
            style="
              width: 100px;
              height: 26px;
              border-radius: 33px;
              background-color: rgba(0, 0, 0, 0.5);
              border: 3px solid #4a261b;
            "
          >
            <div class="col-2 relative-position">
              <q-img
                width="40px"
                class="absolute-center"
                style="top: 55%"
                src="/images/icon_main/icon-coin-winner.png"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
            <div class="col row justify-center items-center" align="center">
              <span class="text-number-header f16 font-mali-b">{{
                studentStore.coin <= 99999 ? studentStore.coin : "+99999"
              }}</span>
            </div>

            <q-tooltip class="transparent">
              <div style="background-color: #4a261b; border-radius: 20px; padding: 5px">
                {{ `ได้รับจากการทำแบบฝึดหัดถูกต้อง` }}
              </div>
            </q-tooltip>
          </div>
        </div>

        <div class="">
          <div
            class="row relative-position"
            style="
              width: 100px;
              height: 26px;
              border-radius: 33px;
              background-color: rgba(0, 0, 0, 0.5);
              border: 3px solid #4a261b;
            "
          >
            <div class="col-2 relative-position">
              <q-img
                width="49px"
                class="absolute-center"
                style="top: 55%"
                src="/images/icon_main/icon-mini-game-ticket.png"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
            <div class="col row justify-center items-center" align="center">
              <span class="text-number-header f16 font-mali-b">{{
                `${
                  studentStore.studentData.gameTicket > 5
                    ? "5"
                    : studentStore.studentData.gameTicket || 0
                }/5`
              }}</span>
            </div>

            <q-tooltip class="transparent">
              <div style="background-color: #4a261b; border-radius: 20px; padding: 5px">
                {{ `ได้รับจากการทำแบบฝึกหัด สะสมได้สูงสุด 5 ตั๋ว` }}
              </div>
            </q-tooltip>
          </div>
        </div>
      </div>
    </div>

    <div
      class="col-1 q-px-sm self-center q-mt-xs width-fit"
      v-if="!isDesktop && studentStore.studentType != 'school'"
    >
      <!-- <div
        class="box-countdown-timer mobile relative-position f10 font-mali-m q-mb-xs"
        align="center"
        v-if="
          studentStore.distanceInDays >= 0 &&
          studentStore.distanceInDays <= 3 &&
          studentStore.expireDate != ''
        "
      >
        <span v-if="studentStore.distanceInDays > 0">
          {{ `Time remaining ${studentStore.distanceInDays} Days` }}
        </span>
        <span v-if="studentStore.distanceInDays == 0">
          {{ `Expire today` }}
        </span>
        <q-img
          class="absolute-top-right"
          width="30px"
          style="top: -10px; right: -10px"
          src="/images/icon_main/icon-timer.png"
          no-spinner
          no-transition
        ></q-img>
      </div> -->
      <q-img
        width="150px"
        class="cursor-pointer"
        src="/images/button_main/button-subscribe.png"
        @click="funcShowSubscribePackage()"
        no-spinner
        no-transition
      ></q-img>
    </div>
    <!-- #endregion -->
  </div>

  <dialog-recommend-level
    v-if="isShowDialogRecommendLevel"
    @close-dialog="isShowDialogRecommendLevel = false"
  ></dialog-recommend-level>

  <dialog-your-level-2
    v-if="isShowDialogYourLevel"
    @close-dialoog="isShowDialogYourLevel = false"
  ></dialog-your-level-2>

  <dialog-maintenance
    v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="isShowDialogMaintenance = false"
  ></dialog-maintenance>
</template>

<script>
import dialogRecommendLevel from "../dialog_main/dialog-recommend-level.vue";
import dialogYourLevel2 from "../dialog_main/dialog-your-level-2.vue";
import dialogMaintenance from "../dialog_main/dialog-maintenance.vue";
import { onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useCourseStore } from "src/stores/course";

export default {
  props: {
    courseStore: {
      default: () => {},
    },
    studentStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
  },
  components: {
    dialogRecommendLevel,
    dialogYourLevel2,
    dialogMaintenance,
  },
  setup(props) {
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);

    const studentStore = useStudentStore();
    const courseStore = useCourseStore();
    const $router = useRouter();

    const isShowDialogRecommendLevel = ref(false);
    const isShowDialogYourLevel = ref(false);
    const isShowDialogMaintenance = ref(false);

    const funcShowSubscribePackage = () => {
      // const systemStore = useSystemStore();
      // systemStore.systemData.activeState.isShowDialogPackageMenu = true;

      if (courseStore.courseLevel == 0) {
        if (!studentStore.isSkipPlacementTest) {
          if (studentStore.placementTestLevel == "") {
            isShowDialogRecommendLevel.value = true;
            return;
          }
        }
      }

      // isShowDialogMaintenance.value = true;
      $router.push({ name: "subscribepackage" });
    };

    // #region
    let listenCoinAnimation = null;
    const showCoinAnimation = ref(0);

    const funcSetCurrentCoin = () => {
      if (studentStore.eventRewardObject.isEncrypted) {
        showCoinAnimation.value = studentStore.coin - studentStore.eventReward.coin;
      } else {
        showCoinAnimation.value = studentStore.coin;
      }
    };

    watch(
      () => studentStore.eventRewardObject.isStartAnimationSetCoin,
      (value) => {
        if (value) {
          listenCoinAnimation = setInterval(() => {
            if (showCoinAnimation.value < studentStore.coin) {
              showCoinAnimation.value += 50;
            } else {
              showCoinAnimation.value = studentStore.coin;
              clearInterval(listenCoinAnimation);
            }

            return showCoinAnimation.value;
          }, 30);
        }
      }
    );

    watch(
      () => studentStore.coin,
      (value) => {
        funcSetCurrentCoin();
      }
    );

    onMounted(() => {
      funcSetCurrentCoin();
    });

    return {
      isShowDialogYourLevel,
      isShowDialogRecommendLevel,
      isShowDialogMaintenance,

      showCoinAnimation,

      // Boolean
      isDesktop,

      // Function
      funcShowSubscribePackage,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-level-pc {
  color: #fff;
  font-size: 36px;
  font-family: fredoka;
  text-shadow: rgb(74, 38, 27) 4px 0px 0px, rgb(74, 38, 27) 3.87565px 0.989616px 0px,
    rgb(74, 38, 27) 3.51033px 1.9177px 0px, rgb(74, 38, 27) 2.92676px 2.72656px 0px,
    rgb(74, 38, 27) 2.16121px 3.36588px 0px, rgb(74, 38, 27) 1.26129px 3.79594px 0px,
    rgb(74, 38, 27) 0.282949px 3.98998px 0px, rgb(74, 38, 27) -0.712984px 3.93594px 0px,
    rgb(74, 38, 27) -1.66459px 3.63719px 0px, rgb(74, 38, 27) -2.51269px 3.11229px 0px,
    rgb(74, 38, 27) -3.20457px 2.39389px 0px, rgb(74, 38, 27) -3.69721px 1.52664px 0px,
    rgb(74, 38, 27) -3.95997px 0.56448px 0px, rgb(74, 38, 27) -3.97652px -0.432781px 0px,
    rgb(74, 38, 27) -3.74583px -1.40313px 0px, rgb(74, 38, 27) -3.28224px -2.28625px 0px,
    rgb(74, 38, 27) -2.61457px -3.02721px 0px, rgb(74, 38, 27) -1.78435px -3.57996px 0px,
    rgb(74, 38, 27) -0.843183px -3.91012px 0px, rgb(74, 38, 27) 0.150409px -3.99717px 0px,
    rgb(74, 38, 27) 1.13465px -3.8357px 0px, rgb(74, 38, 27) 2.04834px -3.43574px 0px,
    rgb(74, 38, 27) 2.83468px -2.82216px 0px, rgb(74, 38, 27) 3.44477px -2.03312px 0px,
    rgb(74, 38, 27) 3.84068px -1.11766px 0px, rgb(74, 38, 27) 3.9978px -0.132717px 0px;
}

.text-level {
  color: #fff;
  font-size: 26px;
  font-family: fredoka;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.box-progress-bar {
  width: 93%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid#000;
  border-radius: 33px;
}

.progress {
  background-image: linear-gradient(to bottom, #18a0fb 30%, #166ca6);
  height: 7px;
  border-radius: 33px;
  transition: width 0.2s;
  -webkit-transition: width 0.2s;
}

.progress[mode-mobile="true"] {
  background-image: linear-gradient(to bottom, #18a0fb 30%, #166ca6);
  height: 20px;
  max-height: 0.3vw;
  min-height: 4px;
  border-radius: 33px;
  transition: width 0.2s;
  -webkit-transition: width 0.2s;
}

.box-countdown-timer {
  width: 170px;
  background-color: #fff;
  border-radius: 13px;
  border: 1px solid #4a261b;
}

.box-countdown-timer.mobile {
  width: 150px;
  background-color: #fff;
  border-radius: 13px;
  border: 1px solid #4a261b;
}

.text-number-header {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
}
</style>
