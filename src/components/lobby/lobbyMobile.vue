<template>
  <div class="row" :class="mode ? 'bg-lobby-day' : 'bg-lobby-night'">
    <div class="col-12 self-start row">
      <div class="col-7 self-start row q-px-xs q-pt-sm">
        <div class="col-12">
          <q-img
            fit="contain"
            style="max-width: 100px; width: 35%; font-size: 100%; z-index: 2"
            src="/images/lobby/box-level.png"
            @click="$emit('callback-dialog', 'profile')"
          >
            <div class="transparent absolute-center" style="top: 53%">
              <span class="text-grey-9" style="font-size: 20px">{{
                characterData.level
              }}</span>
            </div>
          </q-img>
          <q-img
            fit="contain"
            style="max-width: 230px; width: 70%; margin-left: -25px"
            src="/images/lobby/box-name.png"
          >
            <div
              class="transparent full-width absolute-center no-padding"
              style="top: 40%"
            >
              <div style="padding-left: 30px" class="q-px-xs">
                <div class="q-pt-xs relative-position q-pr-sm">
                  <div
                    class="f14"
                    style="
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ characterData.name }}
                  </div>
                </div>
                <div class="q-pr-md q-pb-xs">
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
        </div>
        <!-- <div class="col-12 self-center" align="left">
          <q-img
            fit="contain"
            style="width: 130px"
            src="/images/lobby/heart-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ 5 }}</span>
              </div>
            </div>
          </q-img>
        </div> -->

        <div class="col-12 self-center q-mt-sm">
          <q-img
            fit="contain"
            style="width: 130px"
            src="/images/lobby/coin-bar.png"
          >
            <div class="transparent fit relative-position no-padding">
              <div class="absolute-center" style="top: 40%; left: 65%">
                <span class="f16">{{ characterData.coin }}</span>
              </div>
            </div>
          </q-img>
        </div>

        <div
          class="col-12 self-center q-ml-md q q-mt-sm"
          v-if="studentInfo.type == 'demo' || studentInfo.type == 'online'"
        >
          <div
            v-if="expireDate <= 8"
            class="q-pa-xs bg-white f12 relative-position"
            align="center"
            style="
              width: fit-content;
              border-radius: 20px;
              margin-bottom: 2px;
              font-size: 10px;
              padding: 3px 10px;
            "
          >
            <span v-if="studentInfo.type == 'demo'"
              >เหลือเวลาทดลองเรียน {{ expireDate }} วัน</span
            >
            <span v-else> คอร์สเรียนเหลือเวลา {{ expireDate }} วัน</span>
            <q-img
              class="absolute-top-right animation-alert-clock"
              width="40px"
              style="top: -12px; right: -23px"
              src="/images/img-clock-demo.png"
            ></q-img>
          </div>
          <q-btn
            class="bg-amber q-mb-md"
            push
            dense
            rounded
            padding="5px 13px"
            @click="$emit('callback-dialog', 'purchase')"
          >
            <q-icon
              class="q-mx-xs text-brown-9"
              name="fas fa-shopping-cart"
            ></q-icon>
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

      <div align="right" class="relative-position q-pt-md col-5 row">
        <q-page-sticky
          expand
          position="top-right"
          style="max-width: 250px; width: 45%; z-index: 2"
        >
          <div class="row justify-end fit q-pr-sm q-pt-xs" align="right">
            <div class="col self-center" align="right">
              <q-img
                style="width: 90%"
                fit="contain"
                @click="$emit('callback-dialog', 'notification')"
                class="q-mt-md cursor-pointer btn-active"
                src="/images/lobby/noti-btn.png"
                v-if="!isNewNotification"
              >
              </q-img>
              <q-img
                style="width: 90%"
                v-else
                @click="$emit('callback-dialog', 'notification')"
                class="q-mt-md cursor-pointer btn-active"
                src="/images/lobby/noti-have-btn.png"
              >
              </q-img>
            </div>

            <div class="col self-center" align="right">
              <q-img
                style="width: 90%"
                @click="$emit('callback-dialog', 'setting')"
                class="q-mt-md cursor-pointer btn-active"
                src="/images/lobby/setting-btn.png"
              ></q-img>
            </div>
            <div class="col self-center" align="right">
              <q-img
                style="width: 90%"
                @click="$emit('callback-dialog', 'signout')"
                class="q-mt-md cursor-pointer btn-active"
                src="/images/lobby/logout-btn.png"
              ></q-img>
            </div>
          </div>

          <div class="row justify-end fit" align="right">
            <div class="col-12">
              <q-img
                @click="$emit('callback-dialog', 'ranking')"
                fit="contain"
                width="90px"
                class="cursor-pointer btn-active"
                src="/images/lobby/ranking-btn.png"
              ></q-img>
            </div>
            <!-- <div>
            <q-img
              width="90px"
              fit="contain"
              class="cursor-pointer btn-active"
              src="/images/lobby/mission-btn.png"
            ></q-img>
          </div> -->
            <!-- <div>
            <q-img
              width="90px"
              fit="contain"
              class="cursor-pointer btn-active"
              src="/images/lobby/achievement-btn.png"
            ></q-img>
          </div> -->
            <div class="col-12">
              <q-img
                @click="
                  isSynchronize || expireDate == 'expired'
                    ? null
                    : $router.replace('/equipment')
                "
                width="90px"
                fit="contain"
                class="cursor-pointer btn-active"
                src="/images/lobby/equipment-btn.png"
                :class="
                  isSynchronize || expireDate == 'expired' ? 'disabled' : ''
                "
              ></q-img>
            </div>
            <div class="col-12">
              <q-img
                @click="
                  isSynchronize || expireDate == 'expired'
                    ? null
                    : $router.replace('/shop')
                "
                width="90px"
                fit="contain"
                class="cursor-pointer btn-active"
                src="/images/lobby/shop-btn.png"
                :class="
                  isSynchronize || expireDate == 'expired' ? 'disabled' : ''
                "
              ></q-img>
            </div>
          </div>
        </q-page-sticky>
      </div>
    </div>

    <div
      class="col-12 self-end relative-position"
      style="max-width: 700px; width: 100%; margin: auto"
    >
      <div class="q-pa-sm" align="center">
        <character
          :equipment="equipment"
          :bodycolor="bodycolor"
          style="z-index: 1"
        ></character>
      </div>
    </div>

    <div class="col-12 self-end">
      <div class="row justify-center" align="center">
        <!-- <div
          class="col self-end q-my-lg"
          align="center"
          v-if="studentInfo.type == 'school'"
        >
          <q-img
            style="width: 130px"
            fit="contain"
            src="/images/lobby/review-btn.png"
            class="btn-active cursor-pointer btn-menu"
            @click="
              isSynchronize || expireDate == 'expired'
                ? null
                : $emit('callback-dialog', 'reviewmenu')
            "
          ></q-img>
        </div> -->
        <div class="col self-end q-my-lg" align="center">
          <q-img
            style="width: 130px; animation-duration: 5s"
            fit="contain"
            class="
              btn-active
              cursor-pointer
              btn-menu
              animate__animated animate__infinite animate__shakeY
            "
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
    </div>
  </div>
</template>

<script>
import character from "components/character.vue";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    character,
  },
  props: {
    mode: {
      type: Boolean,
      default: true,
    },
    characterData: {
      type: Object,
      default: () => {},
    },
    equipment: {
      type: Object,
      default: () => {},
    },
    bodycolor: {
      type: String,
      default: "",
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
  emits: ["callback-dialog"],
  setup(props) {
    // Initial Data
    const $q = useQuasar();

    const activeMenu = ref(null);
    const isNews = ref(true);

    return { activeMenu, isNews };
  },
};
</script>

<style lang="scss" scoped>
.bg-lobby-day {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
  background-image: url("/images/lobby/bg-lobby-day-mobile.jpg");
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}

.bg-lobby-night {
  min-height: calc(100vh - 50px);
  max-height: fit-content;
  background-image: url("/images/lobby/bg-lobby-night-mobile.jpg");
  background-position: bottom;
  background-size: cover;
  background-repeat: no-repeat;
}

.hover-menu {
  transition: 0.3s;
  transform: translateY(-10px);
}

.menu-icon {
  transition: 0.3s;
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

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
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
