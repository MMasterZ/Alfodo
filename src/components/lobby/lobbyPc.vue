<template>
  <div class="row relative-position box-container-main">
    <!-- Theme Default -->
    <!-- <theme-day class="absolute-top fit" v-if="mode"></theme-day>
    <theme-night class="absolute-top fit" v-else> </theme-night> -->

    <!-- Theme New Year 2564 -->
    <!-- <theme-new-year-day v-if="mode" class="absolute-top fit"></theme-new-year-day>
    <theme-new-year-night v-else class="absolute-top fit"></theme-new-year-night> -->

    <!-- Theme Valentine 2022 -->
    <theme-valentine-day class="absolute-top fit" v-if="mode"></theme-valentine-day>
    <theme-valentine-night class="absolute-top fit" v-else></theme-valentine-night>

    <div class="col-12 self-start row q-pl-lg" style="z-index: 2">
      <div class="col self-start row q-px-xs q-pt-md">
        <q-img
          fit="cover"
          :class="isSynchronize ? '' : 'cursor-pointer'"
          style="max-width: 100px; width: 100%; font-size: 100%; z-index: 2"
          src="/images/lobby/box-level.png"
          @click="$emit('callback-dialog', 'profile')"
        >
          <div class="transparent absolute-center" style="top: 53%">
            <span class="text-grey-9 f32">{{ characterData.level }}</span>
          </div>
        </q-img>
        <q-img
          fit="contain"
          style="max-width: 220px; width: 100%; margin-left: -25px"
          src="/images/lobby/box-name.png"
        >
          <div class="transparent full-width absolute-center no-padding" style="top: 45%">
            <div style="padding-left: 30px" class="q-px-xs">
              <div class="relative-position q-pr-sm">
                <div
                  class="f16"
                  style="
                    margin-bottom: -3px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ characterData.name }}
                </div>
              </div>
              <div class="q-pr-md q-py-sm">
                <div class="exp-bar relative-position">
                  <div
                    class="bg-primary full-height"
                    :style="`width:${characterData.levelProgressBar * 100}%`"
                    style="margin-left: -5px; border-radius: 20px"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </q-img>

        <!-- <div class="self-center q-ml-lg" align="left">
          <q-img
            fit="contain"
            style="width: 150px"
            src="/images/lobby/heart-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 5 }}</span>
              </div>
            </div>
          </q-img>
        </div> -->

        <div class="self-center q-ml-md">
          <q-img fit="contain" style="width: 150px" src="/images/lobby/coin-bar.png">
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ characterData.coin }}</span>
              </div>
            </div>
          </q-img>
        </div>
        <div
          class="self-center q-ml-md"
          v-if="studentInfo.type == 'demo' || studentInfo.type == 'online'"
        >
          <div
            v-if="expireDate <= 8"
            class="q-pa-xs bg-white f12 relative-position"
            align="center"
            style="border-radius: 20px; margin-bottom: 2px; font-size: 10px"
          >
            <span v-if="studentInfo.type == 'demo'"
              >เหลือเวลาทดลองเรียน {{ expireDate }} วัน</span
            >
            <span v-else> คอร์สเรียนเหลือเวลา {{ expireDate }} วัน</span>
            <q-img
              class="absolute-top-right animation-alert-clock"
              width="40px"
              style="top: -12px; right: -17px"
              src="/images/img-clock-demo.png"
            ></q-img>
          </div>
          <q-btn
            class="bg-amber q-mb-md"
            push
            rounded
            @click="$emit('callback-dialog', 'purchase')"
          >
            <q-icon class="q-mx-xs text-brown-9" name="fas fa-shopping-cart"></q-icon>
            <span class="q-mx-xs text-brown-9">ซื้อคอร์สเรียน</span>
          </q-btn>
          <!-- <q-img
            fit="contain"
            style="width: 150px"
            src="/images/lobby/coin-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ characterData.coin }}</span>
              </div>
            </div>
          </q-img> -->
        </div>
      </div>

      <div align="right" class="col-3 q-pa-lg">
        <q-img
          @click="$emit('callback-dialog', 'notification')"
          style="width: 60px"
          class="cursor-pointer btn-active"
          src="/images/lobby/noti-btn.png"
          v-if="!isNewNotification"
        >
        </q-img>
        <q-img
          v-else
          @click="$emit('callback-dialog', 'notification')"
          style="width: 60px"
          class="cursor-pointer btn-active"
          src="/images/lobby/noti-have-btn.png"
        ></q-img>
        <q-img
          @click="$emit('callback-dialog', 'setting')"
          style="width: 60px"
          class="cursor-pointer btn-active q-mx-xs"
          src="/images/lobby/setting-btn.png"
        ></q-img>
        <q-img
          @click="$emit('callback-dialog', 'signout')"
          style="width: 60px"
          class="cursor-pointer btn-active"
          src="/images/lobby/logout-btn.png"
        ></q-img>
      </div>
    </div>

    <div class="col-12 self-center row justify-center" style="z-index: 2">
      <div class="col-5"></div>
      <div class="col-5 q-pa-sm" align="center">
        <character :character="characterData" style="z-index: 1"></character>
      </div>
    </div>

    <div
      class="relative-position col-12 self-end row"
      style="position: sticky; bottom: 10px; z-index: 2"
    >
      <!-- <q-page-sticky position="bottom-left" :offset="[18, 18]"> -->
      <div class="col row self-end q-px-md" style="">
        <q-img
          @click="$emit('callback-dialog', 'ranking')"
          fit="contain"
          width="120px"
          class="cursor-pointer q-mx-xs btn-menu"
          src="/images/lobby/ranking-btn.png"
        ></q-img>
        <!-- <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'mission' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'mission'"
          @mouseleave="activeMenu = null"
          src="/images/lobby/mission-btn.png"
        ></q-img> -->
        <!-- <q-img
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs"
          :class="activeMenu == 'achievement' ? 'hover-menu' : 'menu-icon'"
          @mouseenter="activeMenu = 'achievement'"
          @mouseleave="activeMenu = null"
          src="/images/lobby/achievement-btn.png"
        ></q-img> -->
        <q-img
          @click="
            isSynchronize || expireDate == 'expired'
              ? null
              : $router.replace('/equipment')
          "
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs btn-menu"
          src="/images/lobby/equipment-btn.png"
          :class="isSynchronize || expireDate == 'expired' ? 'disabled' : ''"
        ></q-img>
        <q-img
          @click="
            isSynchronize || expireDate == 'expired' ? null : $router.replace('/shop')
          "
          width="120px"
          fit="contain"
          class="cursor-pointer q-mx-xs btn-menu"
          src="/images/lobby/shop-btn.png"
          :class="isSynchronize || expireDate == 'expired' ? 'disabled' : ''"
        ></q-img>
      </div>
      <!-- </q-page-sticky> -->

      <q-space></q-space>
      <!-- <q-page-sticky position="bottom-right" :offset="[18, 18]"> -->
      <div class="row justify-center" align="center">
        <!-- <div class="self-end col" v-if="studentInfo.type == 'school'">
          <q-img
            style="width: 130px"
            fit="contain"
            class="cursor-pointer btn-menu"
            @mouseenter="activeMenu = 'boss'"
            @mouseleave="activeMenu = null"
            src="/images/lobby/review-btn.png"
            @click="
              isSynchronize || expireDate == 'expired'
                ? null
                : $emit('callback-dialog', 'reviewmenu')
            "
            :class="isSynchronize || expireDate == 'expired' ? 'disabled' : ''"
          ></q-img>
        </div> -->
        <div class="self-end col q-mx-md">
          <q-img
            style="width: 130px; animation-duration: 5s"
            fit="contain"
            class="cursor-pointer btn-menu animate__animated animate__infinite animate__shakeY"
            src="/images/lobby/leaning-btn.png"
            @click="
              isSynchronize || expireDate == 'expired'
                ? null
                : $router.replace('/practice/list')
            "
            :class="isSynchronize || expireDate == 'expired' ? 'disabled' : ''"
          ></q-img>
        </div>
      </div>
      <!-- </q-page-sticky> -->
    </div>
  </div>
</template>

<script>
import themeDay from "./themeDay.vue";
import themeNight from "./themeNight.vue";
import themeNewYearNight from "./theme-new-year-night.vue";
import themeNewYearDay from "./theme-new-year-day.vue";
import themeValentineNight from "./theme-valentine-2022-night.vue";
import themeValentineDay from "./theme-valentine-2022-day.vue";
import character from "../character_main/character.vue";
import { ref } from "vue";
export default {
  components: {
    themeDay,
    themeNight,
    themeNewYearNight,
    themeNewYearDay,
    character,
    themeValentineNight,
    themeValentineDay,
  },
  emits: ["callback-dialog"],
  props: {
    mode: {
      type: Boolean,
      default: true,
    },
    characterData: {
      type: Object,
      default: () => {},
    },
    isSynchronize: {
      type: Boolean,
      default: false,
    },
    isNewNotification: {
      type: Boolean,
      default: false,
    },
    studentInfo: {
      type: Object,
      default: () => {},
    },
    expireDate: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    // Initial Data

    const activeMenu = ref(null);

    return { activeMenu };
  },
};
</script>

<style lang="scss" scoped>
.btn-menu {
  transition: 0.3s;
  transform: translateY(0px);
}

.btn-menu:hover {
  transition: 0.3s;
  transform: translateY(-10px);
  animation-play-state: paused;
}

.btn-menu:active {
  transition: 0.1s;
  transform: scale(0.95);
}

.box-container-level {
  width: 85px;
  min-height: 85px;
  background-color: #fff;
  border: 5px solid#FFC42E;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 5px 7px rgba(65, 65, 65, 0.7);
  z-index: 2;
}

.level-bar {
  width: 110px;
  background-color: #ffc42e;
  top: 60%;
}

.exp-bar {
  background-color: #fff;
  border-radius: 70px;
  height: 6px;
  overflow: hidden;
}

.btn-active {
  transition: 0.1s;
  transform: scale(1);
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.95);
}

.animation-alert-clock {
  animation: alertClock 1.43s linear infinite;
}

@keyframes alertClock {
  0% {
    transform: scale(0.85) rotate(0deg);
  }
  25% {
    transform: scale(1) rotate(0deg);
  }
  30% {
    transform: scale(1) rotate(0deg);
  }
  40%,
  50%,
  60% {
    transform: scale(1) rotate(10deg);
  }
  45%,
  55% {
    transform: scale(1) rotate(-10deg);
  }
  75% {
    transform: scale(1) rotate(0deg);
  }
  80% {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(0.85) rotate(0deg);
  }
}
</style>
