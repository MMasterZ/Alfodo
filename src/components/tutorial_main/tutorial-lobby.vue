<template>
  <!-- #region โชว์เลเวลอัพ -->
  <div
    class="absolute-center box-dialog-level-up-container"
    :class="$q.platform.is.desktop ? '' : 'mobile row justify-center items-center'"
    v-if="isShowDialogLevelUp"
  >
    <dialog-level-up
      @callback-levelUp="funcLevelUp()"
      @callback-claimAllReward="funcClaimAllReward()"
      :isFirstTutorial="true"
    ></dialog-level-up>
  </div>
  <!-- #endregion -->

  <!-- #region โชว์เลเวลของรางวัล -->
  <div
    class="absolute-center box-dialog-level-reward"
    :class="$q.platform.is.desktop ? '' : 'mobile row justify-center items-center'"
    v-if="isShowDialogLevelReward"
  >
    <dialog-level-reward
      @callback-claimAllReward="funcGetClaimAllReward()"
      :isFirstTutorial="true"
    ></dialog-level-reward>
  </div>
  <!-- #endregion -->

  <!-- #region โชว์รับของรางวัล -->
  <div
    class="absolute-center box-dialog-get-reward"
    :class="$q.platform.is.desktop ? '' : 'mobile row justify-center items-center'"
    v-if="isShowDialogGetReward"
  >
    <dialog-get-reward
      @callback-closeDialog="funcCloseGetReward()"
      :rewardList="[
        {
          type: 'coin',
          amount: 20,
        },
      ]"
      :isFirstTutorial="true"
    ></dialog-get-reward>
  </div>
  <!-- #endregion -->

  <!-- #region Desktop -->

  <!-- #region ข้อมูลโปรไพล์ -->
  <div
    class="absolute-center box-profile-container"
    v-if="tutorialData.showContentType == 'show-profile-detail' && $q.platform.is.desktop"
  >
    <div
      class="absolute box-button-profile-menu animate__animated animate__fadeIn"
      align="center"
    >
      <div class="font-mali-b">สถิติแบบฝึกหัด</div>
    </div>

    <div class="absolute box-button-certificate animate__animated animate__fadeIn">
      <q-img
        :src="`/images/button_main/button-certificate.png`"
        no-transition
        no-spinner
      ></q-img>
    </div>

    <div
      class="absolute box-progress-average animate__animated animate__fadeIn"
      v-if="courseStore.courseData"
    >
      <div class="progress-average row">
        <div>
          <!-- <div class="average-animation"></div> -->
          <q-circular-progress
            show-value
            :value="Number(courseStore.courseData.progressAVG)"
            :thickness="0.05"
            color="green"
            track-color="grey-3"
            size="clamp(68.75px,6.875cqw,110px)"
          >
            <span class="text-average font-mali-sb">
              {{ displayNumber(courseStore.courseData.progressAVG) }}%
            </span>
          </q-circular-progress>
        </div>
        <div class="col self-center font-mali-b" align="center">ความก้าวหน้าเฉลี่ย</div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region โชว์ระดับของเลเวล -->
  <div
    class="absolute-center box-show-tier-container"
    v-if="tutorialData.showContentType == 'show-level' && $q.platform.is.desktop"
  >
    <div class="relative-position animate__animated animate__bounceIn">
      <div class="row justify-center">
        <div class="col-2" v-for="i in 12">
          <div class="box-button-tier" :class="i > 6 ? 'space-top' : ''">
            <q-img
              :src="`/images/box_main/box-rank-level-${tierList[i - 1].name}-4.webp`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region บัดดี้โหมด -->
  <div
    class="absolute-center box-dialog-buddy-container"
    v-if="tutorialData.showContentType == 'show-buddy-mode' && $q.platform.is.desktop"
  >
    <q-img
      src="/images/tutorial_main/lobby/tutorial-lobby-dialog-buddy-login.webp"
      no-spinner
      no-transition
    >
    </q-img>
  </div>
  <!-- #endregion -->

  <!-- #region Unpair บัดดี้ -->
  <div
    class="absolute-center box-dialog-unpair-buddy-container"
    v-if="
      tutorialData.showContentType == 'show-unpair-buddy-mode' && $q.platform.is.desktop
    "
  >
    <q-img
      src="/images/tutorial_main/lobby/tutorial-lobby-buddy-unpair.webp"
      no-spinner
      no-transition
    ></q-img>
  </div>
  <!-- #endregion -->

  <!-- #region ปุ่มสคริป -->
  <div
    class="box-button-skip"
    :class="`absolute-top-${tutorialData.positionButtonSkip}`"
    v-if="tutorialData.isButtonSkip && $q.platform.is.desktop"
  >
    <div
      class="relative-position animate__animated animate__slideInRight animation-duration-0-3s"
    >
      <q-img
        src="/images/button_main/button-tutorial-skip.webp"
        no-spinner
        no-transition
        class="button-active-main"
        @click="funcSetStepTutorial('skip')"
      ></q-img>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region อนิเมชั่นมือ/กล่องแสดงรายละเอียด -->
  <div v-if="$q.platform.is.desktop">
    <div
      v-for="(itemContent, indexContent) in tutorialData.infomationContentList"
      :key="indexContent"
      class="z-max"
    >
      <div
        class="box-infomation-hand z-max"
        :style="itemContent.handPosition"
        v-if="isShowAnimationContent && itemContent.isShowHand"
      >
        <div class="relative-position">
          <div
            class="relative-position"
            :class="itemContent.isAnimtionHand ? 'animation-hand' : ''"
          >
            <q-img :src="itemContent.handImage" no-spinner no-transition></q-img>
          </div>
        </div>
      </div>

      <div
        class="box-infomation-container z-max"
        :style="itemContent.position"
        v-if="isShowAnimationContent && itemContent.isShowContent"
      >
        <div class="relative-position">
          <div class="box-infomation-content font-mali-b">
            <div class="relative-position">
              {{ itemContent.content }}
            </div>
          </div>

          <div class="relative-position">
            <q-img
              src="/images/icon_main/icon-tutorial-professor-winny.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region แสดงผลการสอน -->
  <div
    class="absolute-bottom box-background-container"
    v-show="isShowDialogTutorial && $q.platform.is.desktop"
  >
    <div
      class="relative-position box-background-content animate__animated"
      :class="
        isFadeOutCharacter
          ? `${tutorialData.animationCharacterFadeOut}`
          : `${tutorialData.animationCharacterFadeIn}`
      "
      :style="[
        isFadeOutCharacter
          ? `animation-delay:0.5s`
          : isStartAnimationBlockTutorial
          ? ''
          : 'animation-duration:0s',
      ]"
    >
      <q-img
        :src="`/images/box_main/${tutorialData.imageBackground}`"
        no-spinner
        no-transition
        :style="!tutorialData.isBackground ? 'opacity:0' : ''"
      ></q-img>

      <!-- #region ตัวละคร -->
      <div
        class="box-tutorial-proofessor-main"
        :class="`${tutorialData.positionCharacter}`"
      >
        <q-img :src="`${tutorialImageProfessor}`" no-spinner no-transition></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region เนื้อหา -->
      <div
        class="box-tutorial-main absolute-center fit row"
        :class="[
          {
            'show-icon-menu': tutorialData.showContentType == 'menu',
            'show-menu-left': tutorialData.showContentType == 'show-menu',
            'show-button-learn': tutorialData.showContentType == 'show-button-learn',
            'character-right': tutorialData.positionCharacter == 'right',
            'character-left': tutorialData.positionCharacter == 'left',
          },
        ]"
      >
        <div class="self-start box-button-back">
          <q-img
            src="/images/button_main/button-tutorial-back.webp"
            no-spinner
            no-transition
            class="button-active-main"
            :class="isActive ? 'disable' : ''"
            v-if="tutorialData.isButtonBack"
            @click="funcSetStepTutorial('back')"
          ></q-img>
        </div>
        <div
          class="col content-tutorial font-mali-b"
          :class="`self-${tutorialData.textAlign}`"
          v-html="tutorialContent"
        ></div>
        <div class="self-end box-button-finish" v-if="tutorialData.isButtonFinish">
          <q-img
            src="/images/button_main/button-tutorial-finish.webp"
            class="button-active-main"
            :class="isActive ? 'disable' : ''"
            no-spinner
            no-transition
            @click="funcSetStepTutorial('finish')"
          ></q-img>
        </div>
        <div class="self-end box-button-next" v-if="!tutorialData.isButtonFinish">
          <q-img
            src="/images/button_main/button-tutorial-next.webp"
            no-spinner
            no-transition
            class="button-active-main"
            :class="isActive ? 'disable' : ''"
            v-if="tutorialData.isButtonNext"
            @click="funcSetStepTutorial('next')"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->

  <!-- #endregion -->

  <!-- #region Mobile -->

  <!-- #region ข้อมูลโปรไฟล์ -->
  <div
    class="absolute-center box-profile-container mobile"
    v-if="
      tutorialData.showContentType == 'show-profile-detail' && !$q.platform.is.desktop
    "
  >
    <div class="relative-position fit">
      <!-- #region ปุ่มสถิติแบบฝึกหัด -->
      <div
        class="absolute box-profile-menu-mobile row justify-center items-center"
        align="center"
      >
        <div class="font-mali-b">สถิติแบบฝึกหัด</div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มใบรับรอง -->
      <div class="absolute box-button-cretificate-mobile">
        <q-img
          :src="`/images/button_main/button-certificate.png`"
          no-transition
          no-spinner
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region ความก้าวหน้าเฉลี่ย -->
      <div
        class="absolute box-progress-average mobile animate__animated animate__fadeIn"
        v-if="courseStore.courseData"
      >
        <div class="progress-average mobile row">
          <div>
            <!-- <div class="average-animation"></div> -->
            <q-circular-progress
              show-value
              :value="Number(courseStore.courseData.progressAVG)"
              :thickness="0.05"
              color="green"
              track-color="grey-3"
              size="80px"
            >
              <span class="text-average mobile font-mali-sb">
                {{ displayNumber(courseStore.courseData.progressAVG) }}%
              </span>
            </q-circular-progress>
          </div>
          <div class="col f16 self-center font-mali-b" align="center">
            ความก้าวหน้าเฉลี่ย
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region รายะเอียด ปุ่มจดหมาย/ปุ่มตั้งค่า/ปุ่มออกจากระบบ และอื่นๆ -->
  <div
    class="absolute-top-right box-menu-container mobile"
    v-if="
      (tutorialData.showContentType == 'show-button-detail-header' &&
        !$q.platform.is.desktop) ||
      (tutorialData.showContentType == 'show-button-detail-body' &&
        !$q.platform.is.desktop)
    "
  >
    <div
      class="relative-position fit"
      v-if="tutorialData.showContentType == 'show-button-detail-header'"
    >
      <div class="absolute box-button-mail">
        <q-img :src="`/images/icon_main/icon-news.webp`" no-spinner no-transition></q-img>
      </div>

      <div class="absolute box-button-setting">
        <q-img src="/images/icon_main/icon-setting.png" no-spinner no-transition></q-img>
      </div>

      <div class="absolute box-button-logout">
        <q-img src="/images/icon_main/icon-logout.png" no-spinner no-transition></q-img>
      </div>
    </div>

    <div
      class="relative-position fit"
      v-if="tutorialData.showContentType == 'show-button-detail-body'"
    >
      <div
        class="absolute box-button-menu"
        v-for="(itemMenu, indexMenu) in menuList"
        :key="indexMenu"
        :style="itemMenu.style"
      >
        <q-img
          :src="`/images/button_main/${itemMenu.image}`"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region โชว์ระดับของเลเวล  -->
  <div
    class="absolute-top box-show-tier-container mobile row justify-center items-center"
    v-if="tutorialData.showContentType == 'show-level' && !$q.platform.is.desktop"
  >
    <div class="relative-position animate__animated animate__bounceIn">
      <div class="row justify-center">
        <div class="col-4" v-for="i in 12">
          <div class="box-button-tier mobile">
            <q-img
              :src="`/images/box_main/box-rank-level-${tierList[i - 1].name}-4.webp`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region ปุ่มบัดดี้โหมด -->
  <div
    class="absolute-top box-button-buddy-container mobile"
    v-if="tutorialData.showContentType == 'show-buddy-mode' && !$q.platform.is.desktop"
  ></div>
  <!-- #endregion -->

  <!-- #region ล็อคอินบัดดี้โหมด -->
  <div
    class="absolute-top box-dialog-buddy-container mobile"
    v-if="tutorialData.showContentType == 'show-buddy-mode' && !$q.platform.is.desktop"
  >
    <div class="fit">
      <div class="box-buddy-button absolute-top">
        <q-img
          src="/images/button_main/button-buddy-mode-mobile.webp"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <div class="box-buddy-login absolute-top row justify-center items-center">
        <div class="fit relative-position">
          <q-img
            src="/images/tutorial_main/lobby/tutorial-lobby-dialog-buddy-login.webp"
            no-spinner
            no-transition
          >
          </q-img>

          <div class="absolute-bottom-right icon-hand">
            <div
              class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
            >
              <q-img src="/images/icon_main/icon-tutorial-hand.webp"></q-img>
            </div>
          </div>

          <div class="absolute-bottom-right content-text mobile">
            <div
              class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
            >
              <div class="font-mali-b">เริ่มจับคู่</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region Unpair บัดดี้ -->
  <div
    class="absolute-top box-dialog-unpair-buddy-container mobile"
    v-if="
      tutorialData.showContentType == 'show-unpair-buddy-mode' && !$q.platform.is.desktop
    "
  >
    <q-img
      src="/images/tutorial_main/lobby/tutorial-lobby-buddy-unpair-mobile.webp"
      no-spinner
      no-transition
    ></q-img>
  </div>
  <!-- #endregion -->

  <!-- #region ปุ่มกดรับรางวัลของเมื่อเลเวลอัพ -->
  <div
    class="absolute-center box-button-level-up-container-mobile z-max"
    v-if="
      tutorialData.showContentType == 'show-level-up-success' && !$q.platform.is.desktop
    "
  >
    <div class="relative-position fit animate__animated animate__fadeIn">
      <div class="absolute-bottom button-level-up" @click="funcClaimAllReward()">
        <q-img
          src="/images/button_main/button-claim-all-level-reward.webp"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region ปุ่มกดรับของรางวัล -->
  <div
    class="absolute-center box-button-dialog-level-reward-mobile z-max"
    v-if="
      tutorialData.showContentType == 'show-dialog-level-reward' &&
      !$q.platform.is.desktop
    "
  >
    <div class="relative-position fit animate__animated animate__fadeIn">
      <div class="absolute-bottom button-claim-all" @click="funcGetClaimAllReward()">
        <q-img
          src="/images/button_main/button-claim-all-level-reward.webp"
          no-spinner
          no-transition
        ></q-img>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region ปุ่มกดรับรางวัล -->
  <div
    class="absolute-center box-dialog-get-reward mobile z-max"
    v-if="tutorialData.showContentType == 'show-get-reward' && !$q.platform.is.desktop"
  >
    <div class="relative-position fit">
      <div class="absolute-bottom button-ok" @click="funcCloseGetReward()">
        <q-img src="/images/button_main/button-ok.webp" no-spinner no-transition></q-img>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region อนิเมชั่นมือ/กล่องแสดงรายละเอียด -->
  <div
    v-if="!$q.platform.is.desktop"
    class="absolute-center box-infomation-main mobile"
    :class="funcDisplayPositionHand()"
  >
    <div class="relative-position fit">
      <div
        v-for="(itemContent, indexContent) in tutorialData.infomationContentList"
        :key="indexContent"
        class="z-max"
      >
        <div
          class="box-infomation-hand mobile"
          :style="itemContent.handPosition"
          v-if="isShowAnimationContent && itemContent.isShowHand"
        >
          <div
            class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
          >
            <div
              class="relative-position"
              :class="itemContent.isAnimtionHand ? 'animation-hand' : ''"
            >
              <q-img :src="itemContent.handImage" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>

        <div
          class="box-infomation-container mobile z-max"
          :style="itemContent.position"
          v-if="isShowAnimationContent && itemContent.isShowContent"
        >
          <div
            class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
          >
            <div class="box-infomation-content mobile font-mali-b">
              <div class="relative-position">
                <div v-html="itemContent.content"></div>
              </div>
            </div>

            <!-- <div class="relative-position">
              <q-img
                src="/images/icon_main/icon-tutorial-professor-winny.webp"
                no-spinner
                no-transition
              ></q-img>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region แสดงผลการสอน -->
  <div
    class="box-background-container mobile z-max"
    v-show="isShowDialogTutorial && !$q.platform.is.desktop"
    :class="`absolute-${tutorialData.tutorialBarPosition} ${
      tutorialData.showContentType == 'box-button-footer'
        ? 'animation-show-button-footer'
        : ''
    }`"
    :style="`height:${tutorialData.tutorialBackgroundHeight};opacity:${
      !tutorialData.isBackground ? '0' : '1'
    }`"
  >
    <div class="relative-position box-background-content">
      <!-- #region ปุ่มสคริป -->
      <div
        class="box-button-skip mobile absolute-top-left"
        v-if="tutorialData.isButtonSkip"
      >
        <div
          class="relative-position animate__animated animate__slideInRight animation-duration-0-3s"
        >
          <q-img
            src="/images/button_main/button-tutorial-skip.webp"
            no-spinner
            no-transition
            class="button-active-main"
            @click="funcSetStepTutorial('skip')"
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ตัวละคร -->
      <div
        class="box-tutorial-proofessor-main mobile"
        :class="`${tutorialData.positionCharacter}`"
      >
        <q-img
          :src="`images/icon_main/icon-tutorial-professor-winny.webp`"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มย้อนกลับ/เนื้อหา/ปุ่มถัดไป -->
      <div class="box-tutorial-main mobile row">
        <!-- ปุ่มย้อนกลับ -->
        <div class="box-button-back-mobile" v-if="tutorialData.isButtonBack">
          <q-img
            class="button-active-main"
            @click="funcSetStepTutorial('back')"
            src="/images/button_main/button-tutorial-back-mobile.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>

        <!-- เนื้อหาการสอน -->
        <div class="col content-tutorial font-mali-b mobile">
          <div class="text-white" v-html="tutorialContent"></div>
        </div>

        <!-- ปุ่มถัดไป -->

        <div class="box-button-next-mobile self-end">
          <q-img
            v-if="tutorialData.isButtonNext"
            class="button-active-main"
            @click="funcSetStepTutorial(tutorialData.isButtonFinish ? 'finish' : 'next')"
            src="/images/button_main/button-tutorial-next-mobile.webp"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->

  <!-- #endregion -->
</template>

<script setup>
import dialogLevelUp from "components/dialog_main/dialog-level-up.vue";
import dialogLevelReward from "components/dialog_main/dialog-level-reward.vue";
import dialogGetReward from "components/dialog_main/dialog-reward.vue";

import { useStudentStore } from "src/stores/student";
import listOfTutorial from "src/js/tutorial-lobby.js";

import { computed, onMounted, ref, watch } from "vue";
import { useCourseStore } from "src/stores/course";
import { useSchoolStore } from "src/stores/school";
import { useSystemStore } from "src/stores/system";
import { useSynchronizeStore } from "src/stores/synchronize";

import { useQuasar } from "quasar";

// Emits
const emits = defineEmits(["callback-showContentType", "callback-finishTutorial"]);

const props = defineProps({
  isNextTutorial: {
    type: Boolean,
    default: false,
  },
});

const $q = useQuasar();

const schoolStore = useSchoolStore();
const studentStore = useStudentStore();
const courseStore = useCourseStore();
const systemStore = useSystemStore();
const synchronizeStore = useSynchronizeStore();

const currentTutorialIndex = ref(0);

const isActive = ref(false);
const isShowDialogTutorial = ref(false);
const isShowDialogLevelUp = ref(false);
const isShowAnimationContent = ref(false);
const isShowDialogLevelReward = ref(false);
const isShowDialogGetReward = ref(false);
const isFadeOutCharacter = ref(false);
const isStartAnimationBlockTutorial = ref(false);

// #region Menu List
const menuList = ref([
  {
    image: "button-ranking.gif",
    imageLock: "button-ranking-disable.gif",
    name: "ranking",
    style: "top:130px;left:8%",
  },
  {
    image: "button-equipment.gif",
    imageLock: "button-equipment-disable.gif",
    name: "equipment",
    style: "top:130px;left:37%",
  },
  {
    image: "button-shop.gif",
    imageLock: "button-shop-disable.gif",
    name: "shop",
    style: "top:130px;left:67%",
  },
  {
    image: "button-mystery-box.gif",
    imageLock: "button-mystery-box-disable.gif",
    name: "mystery-box",
    style: "top:205px;left:8%",
  },
]);
// #endregion

// #region Tier List
const tierList = ref([
  {
    name: "iron",
  },
  {
    name: "bronze",
  },
  {
    name: "silver",
  },
  {
    name: "gold",
  },
  {
    name: "emerald",
  },
  {
    name: "platinum",
  },
  {
    name: "crimson",
  },
  {
    name: "amethyst",
  },
  {
    name: "master",
  },
  {
    name: "grand-master",
  },
  {
    name: "legendary",
  },
  {
    name: "chosen-one",
  },
]);
// #endregion

// #region Tutorial List
const tutorialList = ref([]);
// #endregion

// #region Function

// #region Set Step Tutorial
let listeners = null;
const funcSetStepTutorial = (type) => {
  // console.clear();
  // console.log("type: ", type);

  let timeOut = 0;

  if (tutorialData.value) {
    if ($q.platform.is.desktop) {
      timeOut = tutorialData.value.delay;
    } else {
      timeOut = tutorialData.value.delayMobile;
    }
  }

  if (isActive.value) {
    return;
  }

  isActive.value = true;

  isShowAnimationContent.value = false;
  isFadeOutCharacter.value = false;

  if (type == "first") {
    isActive.value = false;
  } else {
    if (currentTutorialIndex.value == 0 || currentTutorialIndex.value == 15) {
      isFadeOutCharacter.value = true;
      isStartAnimationBlockTutorial.value = true;
    }
  }

  if (tutorialData.value.index > 1) {
    isStartAnimationBlockTutorial.value = false;
  }

  listeners = setTimeout(() => {
    if (listeners) {
      clearTimeout(listeners);
    }

    if (type == "first") {
      isActive.value = false;
    } else if (type === "next") {
      currentTutorialIndex.value++;

      if (tutorialData.value.showContentType == "show-level-up") {
        // console.log("แสดงเลเวลอัพ");

        if (studentStore.studentData.level != 0) {
          if (studentStore.isHasLevelReward) {
            // console.log("แสดงผลเลเวลไม่เท่ากับ 0 และยังไม่ได้รับรางวัลเลเวล");
            currentTutorialIndex.value = 11;
          } else if (!studentStore.isHasLevelReward) {
            // console.log("แสดงผลเลเวลไม่เท่ากับ 0 และได้รับรางวัลเลเวลแล้ว");
            if (studentStore.studentType == "online") {
              // console.log("แสดงผลของนักเรียนออนไลน์");
              currentTutorialIndex.value = 15;
            } else {
              // console.log("แสดงผลของนักเรียนโรงเรียน");
              currentTutorialIndex.value = 13;
            }
          }
        }
      }

      if (tutorialData.value.showContentType == "show-buddy-mode") {
        if (schoolStore.isEnableBuddy) {
          currentTutorialIndex.value = 13;
        } else {
          currentTutorialIndex.value = 15;
        }
      }
    } else if (type === "back") {
      // console.log("แสดงผลกดปุ่มกลับ");
      currentTutorialIndex.value--;
    } else if (type == "skip") {
      // console.log("แสดงผลกดปุ่มข้าม");
      if (tutorialData.value.skipTo == "level-mode") {
        // console.log("แสดงผลข้ามไปที่สอนเลเวล");
        currentTutorialIndex.value = 7;
      } else if (tutorialData.value.skipTo == "finish-mode") {
        // console.log("แสดงผลข้ามไปที่สอนจบการสอน");

        currentTutorialIndex.value = 15;
      }
    } else {
      setTimeout(() => {
        isShowDialogTutorial.value = false;
        currentTutorialIndex.value = 0;

        emits("callback-finishTutorial");
      }, tutorialData.value.delay);
      return;
    }

    if (tutorialData.value.index == 16) {
      // console.log("Finish");
      systemStore.saveTutorial("lobby-v2");
    }

    if (tutorialData.value.showContentType == "show-level-reward") {
      if (studentStore.isHasLevelReward) {
        isShowDialogLevelReward.value = true;
      }
    } else if (tutorialData.value.showContentType == "show-get-reward") {
      // console.log("แสดงผลให้รับรางวัล");
      isShowDialogGetReward.value = true;
    } else if (tutorialData.value.showContentType == "show-level-up") {
      // console.log("แสดงผลให้ Exp เลเวลอัพ");
      setTimeout(() => {
        isShowDialogLevelUp.value = true;
      }, 500);
    }

    emits("callback-showContentType", tutorialData.value);

    isActive.value = false;
    isFadeOutCharacter.value = false;
    isShowAnimationContent.value = true;
  }, timeOut);
};
// #endregion

// #region Level Up
let listenersLevelUp = null;
const funcLevelUp = () => {
  if (listenersLevelUp) clearTimeout(listenersLevelUp);

  listenersLevelUp = setTimeout(() => {
    if (listenersLevelUp) clearTimeout(listenersLevelUp);
    funcSetStepTutorial("next");
  }, 1500);
};
// #endregion

// #region Claim Reward
const funcClaimAllReward = () => {
  isShowDialogLevelUp.value = false;
  isShowDialogLevelReward.value = true;
  funcSetStepTutorial("next");
};
// #endregion

// #region Get Reward
const funcGetClaimAllReward = () => {
  isShowDialogLevelReward.value = false;

  if (!$q.platform.is.desktop) {
    studentStore.setClaimLevelReward();
  }

  funcSetStepTutorial("next");
};
// #endregion

// #region Close Get Reward
const funcCloseGetReward = () => {
  isShowDialogGetReward.value = false;
  funcSetStepTutorial("next");
};
// #endregio

// #endregion

// #region Display Progress Number
const displayNumber = (progress) => {
  if (progress) {
    if (Number(progress > 100)) {
      return "100";
    } else {
      return Math.round(Number(progress)).toFixed(0) || 0;
    }
  } else {
    return 0;
  }
};
// #endregion

// #region Display Position Hand
const funcDisplayPositionHand = () => {
  let temp = "fit";

  if (tutorialData.value.showContentType == "box-button-footer") {
    temp = "box-button-footer";
  } else if (tutorialData.value.showContentType == "show-level-up-success") {
    temp = "box-level-up-success";
  } else if (tutorialData.value.showContentType == "show-profile-detail") {
    temp = "box-profile-container";
  } else if (tutorialData.value.showContentType == "show-dialog-level-reward") {
    temp = "box-button-dialog-level-reward-mobile";
  }

  return temp;
};
// #endregion

// #region Computed

// #region Tutorial Data
const tutorialData = computed(() => {
  let temp = [];

  if ($q.platform.is.desktop) {
    tutorialList.value = listOfTutorial.desktop;
  } else {
    tutorialList.value = listOfTutorial.mobile;
  }

  if (tutorialList.value.length > 0) {
    temp = tutorialList.value[currentTutorialIndex.value];
  }

  return temp;
});
// #endregion

// #region Tutorial Content
const tutorialContent = computed(() => {
  let text = "";

  let findSpan = "";

  findSpan = tutorialList.value[currentTutorialIndex.value].tutorialContent.replace(
    /<span>(.*?)<\/span>/g,
    (match, p1) => {
      return `<span style="color:#F7B90D;">${p1}</span>`;
    }
  );

  if (findSpan) {
    text = findSpan;
  }

  return text;
});
// #endregion

// #region Tutorial Image Professor
const tutorialImageProfessor = computed(() => {
  let image = tutorialList.value[currentTutorialIndex.value].imageCharacterIdle;

  if (tutorialData.value.isAction && isActive.value) {
    image = tutorialList.value[currentTutorialIndex.value].imageCharacterAction;
  }

  return image;
});
// #endregion

// #endregion

// #region Watch
watch(
  () => props.isNextTutorial,
  (val) => {
    if (val) {
      funcSetStepTutorial("next");
    }
  }
);

watch(
  () => synchronizeStore.isSync,
  (val) => {
    if (val) {
      console.log("isSync", val);
      isShowDialogTutorial.value = false;
      currentTutorialIndex.value = 0;

      emits("callback-finishTutorial");
    }
  }
);
// #endregion

onMounted(() => {
  setTimeout(() => {
    if (studentStore.studentData.level != 0) {
      if (studentStore.isHasLevelReward) {
        currentTutorialIndex.value = 11;
        isShowDialogLevelReward.value = true;
      } else {
        if (schoolStore.isEnableBuddy) {
          currentTutorialIndex.value = 13;
        } else {
          // console.log("Finish");
          systemStore.saveTutorial("lobby-v2");

          currentTutorialIndex.value = 15;
        }
      }
    } else {
      // studentStore.clearStudentProgress();
      currentTutorialIndex.value = 0;
    }

    funcSetStepTutorial("first");

    isShowDialogTutorial.value = true;
  }, 300);
});
</script>

<style lang="scss" scoped>
// #region Box

// #region background Container
.box-background-container {
  z-index: 2;

  &.mobile {
    width: 100%;
    background: linear-gradient(180deg, #76649a 0%, #464378 100%);
    z-index: 3;

    &.animation-show-button-footer {
      animation: showButtonFooter 0.1s linear forwards;
      -webkit-animation: showButtonFooter 0.1s linear forwards;
      -moz-animation: showButtonFooter 0.1s linear forwards;

      bottom: 0;

      @keyframes showButtonFooter {
        0% {
          bottom: 0;
        }
        100% {
          bottom: 270px;
        }
      }
    }
  }

  & .box-background-content {
    width: 100%;
    height: 100%;
    animation-duration: 0.5s;

    & .box-tutorial-proofessor-main {
      position: absolute;
      width: clamp(337.5px, 33.75cqw, 540px);
      z-index: 0;

      &.mobile {
        width: 100px;

        &.top-right {
          top: -50px;
          right: 15px;
        }

        &.bottom-right {
          bottom: -50px;
          right: 15px;
        }
      }

      &.left {
        bottom: -53%;
        left: -5%;
      }

      &.right {
        bottom: -53%;
        right: -7.5%;
      }
    }
  }
}
// #endregion

// #region Infomation Hand

.box-infomation-main {
  z-index: 5;
}

.box-infomation-hand {
  position: absolute;
  width: clamp(75px, 7.5cqw, 120px);
  z-index: 2;

  &.mobile {
    width: 55px;
  }

  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;
}
// #endregion

// #region Infomation
.box-infomation-container {
  position: absolute;
  width: 6.25%;

  &.mobile {
    width: fit-content;
  }

  & .box-infomation-content {
    position: absolute;
    top: 50%;
    left: 25%;
    width: fit-content;
    border-radius: clamp(6.25px, 0.625cqw, 10px);
    border: clamp(1.875px, 0.1875cqw, 3px) solid #e6ae6d;
    background: #fff5e7;
    padding: clamp(4.375px, 0.4375cqw, 7px) clamp(10.625px, 1.0625cqw, 17px)
      clamp(4.375px, 0.4375cqw, 7px) clamp(54.375px, 5.4375cqw, 87px);
    white-space: nowrap;
    font-size: clamp(16.25px, 1.625cqw, 26px);
    color: #5e2b0c;
    line-height: clamp(43.75px, 4.375cqw, 70px);

    transform: translate(0%, -50%);
    -webkit-transform: translate(0%, -50%);
    -moz-transform: translate(0%, -50%);

    transform-origin: left;
    -webkit-transform-origin: left;
    -moz-transform-origin: left;

    &.mobile {
      padding: 10px;
      font-size: 14px;
      line-height: 24px;
      border-radius: 10px;
      border: 2px solid #e6ae6d;
      background: #fff5e7;
    }
  }
}
// #endregion

// #region Tutorial
.box-tutorial-main {
  width: 100%;
  padding: clamp(15px, 1.5cqw, 24px);

  &.mobile {
    width: 100%;
    height: 100% !important;
    padding: 16px !important;
  }

  & .box-button-finish {
    width: clamp(141.875px, 14.1875cqw, 227px);
  }

  & .box-button-next {
    width: clamp(96.875px, 9.6875cqw, 155px);
  }

  & .box-button-back {
    width: clamp(37.5px, 3.75cqw, 60px);
  }

  & .content-tutorial {
    font-size: clamp(16.25px, 1.625cqw, 26px);
    color: #fff;
    padding: clamp(5px, 0.5cqw, 8px) clamp(15px, 1.5cqw, 24px) 0px;
    line-height: clamp(30px, 3cqw, 48px);

    &.mobile {
      font-size: 14px !important;
      padding: 0px 12px !important;
      line-height: 24px !important;
    }
  }

  &.show-button-learn {
    padding-right: 34.5%;
  }

  &.show-icon-menu {
    padding-left: 25%;
  }

  &.show-menu-left {
    padding-left: 43%;
  }

  &.character-left {
    padding-left: 20%;
  }

  &.character-right {
    padding-right: 18.75%;
  }

  &.bottom {
    bottom: 0%;
    z-index: 999;
  }

  & .box-button-back-mobile {
    width: 34px;
  }

  & .box-button-next-mobile {
    width: 86px;
  }
}
// #endregion

// #region show tier container
.box-show-tier-container {
  width: clamp(550px, 55cqw, 880px);

  &.mobile {
    top: 80px;
    width: 250px;
    height: calc(100vh - 350px);
    margin: auto;
    z-index: 3;
  }

  & .box-button-tier {
    width: clamp(75px, 7.5cqw, 120px);

    &.mobile {
      width: 60px;
      margin: 8px;
    }

    &.space-top {
      margin-top: clamp(20px, 2cqw, 32px);
    }
  }
}
// #endregion

// #region Button Level Up
.box-button-level-up-container-mobile {
  top: 37%;
  width: 340px;
  height: 350px;
  transform: translate(-50%, -50%);
  z-index: 3;

  & .button-level-up {
    bottom: 23px;
    width: 166px;
    margin: auto;
  }
}
// #endregion

// #region Button Dialog Level Reward
.box-button-dialog-level-reward-mobile {
  width: 340px;
  height: 600px;

  & .button-claim-all {
    bottom: 14px;
    width: 166px;
    margin: auto;
  }
}
// #endregion

// #region Skip
.box-button-skip {
  width: clamp(85px, 8.5cqw, 136px);
  margin: clamp(15px, 1.5cqw, 24px);
  z-index: 5;

  &.mobile {
    width: 81px;
    top: -63px;
    margin: 12px;
  }

  &.left {
    left: 0%;
  }

  &.right {
    right: 0%;
  }
}
// #endregion

// #region Dialog buddy mode
.box-dialog-buddy-container {
  width: 21.25%;

  &.mobile {
    top: 0px;
    width: 100%;
    height: calc(100vh - 320px);
    z-index: 3;
    margin: auto;

    & .box-buddy-button {
      top: 84px;
      left: 8px;
      width: 150px;
    }

    & .box-buddy-login {
      top: 150px;
      width: 320px;
      margin: auto;

      & .icon-hand {
        bottom: 59px;
        right: 67px;
        width: 55px;
        transform: rotate(-15deg);
      }

      & .content-text {
        position: absolute;
        bottom: 59px;
        right: 1px;
        width: fit-content;
        border-radius: clamp(6.25px, 0.625cqw, 10px);
        border: clamp(1.875px, 0.1875cqw, 3px) solid #e6ae6d;
        background: #fff5e7;
        padding: clamp(4.375px, 0.4375cqw, 7px) clamp(10.625px, 1.0625cqw, 17px)
          clamp(4.375px, 0.4375cqw, 7px) clamp(54.375px, 5.4375cqw, 87px);
        white-space: nowrap;
        font-size: clamp(16.25px, 1.625cqw, 26px);
        color: #5e2b0c;
        line-height: clamp(43.75px, 4.375cqw, 70px);

        transform: translate(0%, -50%);
        -webkit-transform: translate(0%, -50%);
        -moz-transform: translate(0%, -50%);

        transform-origin: left;
        -webkit-transform-origin: left;
        -moz-transform-origin: left;

        &.mobile {
          height: fit-content;
          padding: 10px;
          font-size: 14px;
          line-height: 24px;
          border-radius: 10px;
          border: 2px solid #e6ae6d;
          background: #fff5e7;
        }
      }
    }
  }
}
// #endregion

// #region Dialog buddy mode.
.box-button-buddy-container {
  &.mobile {
    top: 84px;
    left: 8px;
    width: 150px;
    z-index: 3;
  }
}
// #endreion

// #region Dialog unpair buddy
.box-dialog-unpair-buddy-container {
  width: 28.375%;
  top: 70%;
  left: 30%;

  &.mobile {
    top: 84px;
    left: 8px;
    width: 274px;
    z-index: 3;
  }
}
// #endregion

// #region Dialog Level Up
.box-dialog-level-up-container {
  width: 21.25%;
  height: 37.778%;

  &.mobile {
    top: 37%;
    width: 340px;
    height: 350px;
    transform: translate(-50%, -50%);
    z-index: 3;
  }

  &.layer-5 {
    z-index: 5;
  }
}
// #endregion

// #region Dialog Level Reward
.box-dialog-level-reward {
  width: 21.25%;
  height: 66.6666%;
  z-index: 3;

  &.mobile {
    width: 340px;
    height: 600px;
  }
}
// #endregion

// #region Dialog Get Reward
.box-dialog-get-reward {
  width: 21.25%;
  height: 48%;
  z-index: 3;

  &.mobile {
    width: 340px;
    height: 346px;

    & .button-ok {
      width: 100px;
      margin: auto;
    }
  }
}
// #endregion

// #region Dialog Profile Tutorial
.box-profile-container {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;

  &.mobile {
    width: 320px;
    min-width: 320px;
    height: 508px;

    & .box-profile-menu-mobile {
      top: 11px;
      left: 140px;
      width: 130px;
      height: 44px;
      color: #4a261b;
      font-size: 16px;
      line-height: 20px;
      border-radius: 11px 11px 0px 0px;
      background: #f6f3d3;
      border: 2px solid #f6f3d3;
    }

    & .box-button-cretificate-mobile {
      top: 64px;
      left: 25px;
      width: 135px;
    }
  }

  & .box-button-profile-menu {
    top: 17.8%;
    left: 29.45%;
    width: 10%;
    border-radius: clamp(6.875px, 0.6875cqw, 11px) clamp(6.875px, 0.6875cqw, 11px) 0px 0px;
    color: #4a261b;
    border: clamp(0.625px, 0.0625cqw, 1px) solid #f6f3d3;
    background-color: #f6f3d3;
    padding: clamp(8.75px, 0.875cqw, 14px) 0px;
    font-size: clamp(12.5px, 1.25cqw, 20px);
    cursor: default;
  }

  & .box-button-certificate {
    top: 29.5%;
    left: 62.4%;
    width: 8.5%;
  }

  & .box-progress-average {
    top: 36%;
    left: 40.55%;
    width: 20.1%;
    color: #4a261b;

    &.mobile {
      top: 120px;
      left: 18px;
      width: 273px;
      color: #4a261b;
    }

    & .progress-average {
      height: 29.535%;
      border-radius: clamp(6.875px, 0.6875cqw, 11px);
      border: clamp(1.2px, 0.125cqw, 2px) solid #4a261b;
      background: #efd080;
      color: #4a261b;
      font-size: clamp(12.5px, 1.25cqw, 20px);
      padding: clamp(5px, 0.5cqw, 8px) clamp(6.25px, 0.625cqw, 10px);

      &.mobile {
        height: 98px;
        border-radius: 11px;
        border: 2px solid #4a261b;
        background: #efd080;
        color: #4a261b;
        padding: 8px 10px;
      }

      & .text-average {
        font-size: clamp(22.5px, 2.25cqw, 36px);

        &.mobile {
          font-size: 24px;
        }
      }
    }
  }
}
// #endregion

// #region Dialog Menu Container
.box-menu-container {
  &.mobile {
    top: 65px;
    right: 8px;
    width: 280px;
    height: 372px;
    z-index: 2;

    & .box-button-mail {
      top: 17.1%;
      right: 41.5%;
      width: 40px;
      height: 40px;
    }

    & .box-button-setting {
      top: 17.1%;
      right: 24.2%;
      width: 40px;
      height: 40px;
    }

    & .box-button-logout {
      top: 17.2%;
      right: 7%;
      width: 40px;
      height: 40px;
    }

    & .box-button-menu {
      width: 71px;
    }
  }
}
// #endregion

// #region Box Button Footer
.box-button-footer {
  width: 360px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
}
// #endregion

// #region
.box-level-up-success {
  top: 37%;
  width: 340px;
  height: 350px;
  transform: translate(-50%, -50%);
  z-index: 3;
}
// #endregion

// #region Button
.button-active-main {
  position: relative;
  cursor: pointer;
  transition: 0.1s;
  z-index: 1;

  &:not(.disable):active {
    transform: scale(0.95);
  }

  &.disable {
    cursor: not-allowed;
  }
}
// #endregion

// #region Animation

.animation-hand {
  animation: handShake 0.7s linear infinite;
  -webkit-animation: handShake 0.7s linear infinite;
  -moz-animation: handShake 0.7s linear infinite;

  transform-origin: bottom right;

  @keyframes handShake {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(5deg);
    }
    50% {
      transform: rotate(0deg);
    }
    75% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
}

// #endregion
</style>
