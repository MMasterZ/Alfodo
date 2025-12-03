<template>
  <div>
    <q-resize-observer @resize="onResize" />

    <!-- Desktop & PC -->
    <div class="row justify-between q-pa-md" v-if="isDesktop">
      <!-- Profile Left Bar -->
      <div class="col row relative-position">
        <profile-bar
          :courseStore="courseStore"
          :practiceStore="practiceStore"
          :studentStore="studentStore"
          @callback-dialogProfile="isShowDialogProfile = true"
          @callback-dialogTutorial="isShowDialogTutorial = true"
        ></profile-bar>

        <!-- #region Button Buddy Login -->
        <div
          class="col-12"
          v-if="studentStore.studentType == 'school' && schoolStore.isEnableBuddy"
        >
          <div class="col-12 q-pa-md" v-if="!buddyStore.buddy.isBuddy">
            <q-img
              no-spinner
              no-transition
              class="cursor-pointer"
              style="width: 13%"
              src="/images/button_main/button-buddy.png"
              @click="isShowDialogBuddyLogin = true"
            ></q-img>
          </div>
          <div class="col-12 q-pa-md" v-else>
            <q-img
              no-spinner
              no-transition
              style="min-width: 300px; width: 28%"
              src="/images/box_main/box-name-buddy.png"
            >
              <div
                class="transparent no-margin no-padding"
                style="height: 90%; width: 99%; border-radius: 15px; overflow: hidden"
              >
                <div class="fit row">
                  <div class="col-1 relative-position" style="width: 25%">
                    <div class="absolute-center row justify-center items-center fit">
                      <div
                        class="relative-position bg-white"
                        style="
                          width: 55px;
                          height: 55px;
                          border-radius: 50%;
                          overflow: hidden;
                        "
                      >
                        <div
                          style="width: 130px; top: 100%"
                          class="absolute-center"
                          v-if="buddyStore.isCreateCharacter"
                        >
                          <character
                            :setId="'BuddyId'"
                            :equipment="buddyStore.character"
                            :isBuddy="true"
                            :isPet="false"
                          ></character>
                        </div>
                        <div v-else class="absolute-center fit">
                          <q-img
                            width="100%"
                            src="/images/icon_main/icon-character.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col row q-py-sm" align="left">
                    <div
                      class="self-center"
                      style="
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      "
                    >
                      <div class="f12">Buddy Name</div>
                      <div
                        class="f16"
                        style="
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                      >
                        {{ `${buddyStore.name} ${buddyStore.surname}` }}
                      </div>
                    </div>
                  </div>
                  <div class="col row self-center justify-center items-center">
                    <q-img
                      class="cursor-pointer"
                      style="width: 90%"
                      @click="isShowDialogBuddyLogin = true"
                      src="/images/button_main/button-unpair.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- Button Right Bar -->
      <div class="col-3 row justify-end self-start z-max" align="right">
        <q-btn
          class="q-mx-xs z-max"
          round
          flat
          size="16px"
          v-for="(item, index) in rightBarList"
          @click="item.func()"
        >
          <div
            class="notify-news"
            v-if="item.name == 'news' && !newsStore.isReadAll"
          ></div>
          <q-img class="cursor-pointer" :src="item.img" no-spinner no-transition>
            <q-tooltip class="transparent" :offset="[0, 0]">
              {{ item.name }}
            </q-tooltip>
          </q-img>
        </q-btn>
      </div>
    </div>

    <!-- Mobile -->
    <div v-if="!isDesktop" class="row">
      <div class="col q-pa-xs">
        <profile-bar
          :courseStore="courseStore"
          :practiceStore="practiceStore"
          :studentStore="studentStore"
          @callback-dialogProfile="isShowDialogProfile = true"
          @callback-dialogTutorial="isShowDialogTutorial = true"
        ></profile-bar>
        <div>
          <!-- Button Buddy Login -->
          <div
            class="col-12"
            v-if="studentStore.studentType == 'school' && schoolStore.isEnableBuddy"
          >
            <div class="col-12 q-px-sm" v-if="!buddyStore.buddy.isBuddy">
              <q-img
                no-spinner
                no-transition
                class="cursor-pointer"
                style="width: 150px"
                src="/images/button_main/button-buddy.png"
                @click="isShowDialogBuddyLogin = true"
              ></q-img>
            </div>

            <div class="col-12 q-py-md q-px-xs" v-else>
              <q-img
                no-spinner
                no-transition
                style="min-width: 180px; max-width: 210px; width: 70%"
                src="/images/box_main/box-name-buddy.png"
              >
                <div
                  class="transparent no-margin no-padding"
                  style="height: 90%; width: 99%; border-radius: 15px; overflow: hidden"
                >
                  <div class="fit row">
                    <div
                      class="col-1 self-center q-pb-sm relative-position"
                      style="width: 25%"
                    >
                      <div class="row justify-center items-center fit q-pa-xs">
                        <div
                          class="relative-position bg-white"
                          style="
                            width: 35px;
                            height: 35px;
                            border-radius: 50%;
                            overflow: hidden;
                          "
                        >
                          <div
                            style="width: 100px; top: 100%"
                            class="absolute-center"
                            v-if="buddyStore.isCreateCharacter"
                          >
                            <character
                              :setId="'BuddyId'"
                              :equipment="buddyStore.character"
                              :isBuddy="true"
                              :isPet="false"
                            ></character>
                          </div>
                          <div v-else class="absolute-center fit">
                            <q-img
                              width="100%"
                              src="/images/icon_main/icon-character.png"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col row items-center q-py-sm q-px-xs" align="left">
                      <div
                        class="self-center"
                        style="
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                        "
                      >
                        <div
                          style="
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            font-size: 8px;
                          "
                        >
                          Buddy Name
                        </div>
                        <div
                          class="f12"
                          style="
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            margin-bottom: 5px;
                          "
                        >
                          {{ `${buddyStore.name} ${buddyStore.surname}` }}
                        </div>
                      </div>
                    </div>
                    <div class="col row self-center justify-center items-center q-pr-xs">
                      <q-img
                        class="cursor-pointer"
                        style="width: 100%; margin-bottom: 7px"
                        @click="isShowDialogBuddyLogin = true"
                        src="/images/button_main/button-unpair.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </div>

      <div class="q-pr-sm q-py-md">
        <q-btn @click="isShowDialogMenu = true" size="13px" round>
          <q-img src="/images/icon_main/icon-menu.png" no-spinner no-transition></q-img>
          <div
            class="notify-news"
            v-if="
              (!isShowDialogMenu && !newsStore.isReadAll) ||
              (!isShowDialogMenu && inventoryStore.isNewItem) ||
              (!isShowDialogMenu && itemShopStore.isNewItem)
            "
            style="top: 0px; right: 0px"
          ></div>
        </q-btn>
      </div>
    </div>

    <!-- #region Menu -->
    <q-dialog
      maximized
      v-model="isShowDialogMenu"
      transition-show="fadeIn"
      transition-hide="fadeOut"
      seamless
      auto-close
      class="z-max"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit no-padding">
          <div class="fit relative-position q-px-lg">
            <div class="absolute-top-right q-pa-sm q-py-md">
              <q-btn @click="funcCloseMiniMenu()" size="13px" round>
                <q-img
                  :class="
                    isAnimationMiniMenu ? 'icon-menu-close' : 'icon-menu-close-reverse'
                  "
                  src="/images/icon_main/icon-menu-close.png"
                  no-spinner
                  no-transition
                >
                </q-img>
              </q-btn>
            </div>
            <div class="absolute-top-right q-pa-sm box-show-menu">
              <div align="right">
                <q-btn
                  class="q-mx-xs"
                  no-caps
                  size="13px"
                  round
                  v-for="(item, index) in rightBarList"
                  @click="item.func()"
                  flat
                >
                  <div
                    class="notify-news"
                    v-if="item.name == 'news' && !newsStore.isReadAll"
                    style="top: 0px; right: 0px"
                  ></div>
                  <q-img no-spinner no-transition :src="item.img"> </q-img>
                </q-btn>
              </div>
              <div class="fit q-mt-md row">
                <div class="col-4" v-for="(item, index) in menuList">
                  <q-img
                    style="width: 100%"
                    @click="
                      synchronizeStore.isSync ||
                      (studentStore.studentType == 'demo' && item == 'ranking') ||
                      (item == 'mystery-box' && !mysteryBoxStore.isOpenMysteryBox)
                        ? null
                        : funcGoto(item)
                    "
                    class="button-active icon-menu q-mx-xs"
                    mode-mobile="true"
                    :src="`/images/button_main/button-${item}${
                      synchronizeStore.isSync ||
                      (studentStore.studentType == 'demo' && item == 'ranking') ||
                      (item == 'mystery-box' && !mysteryBoxStore.isOpenMysteryBox)
                        ? '-disable'
                        : ''
                    }.gif`"
                    no-spinner
                    no-transition
                  >
                    <div class="fit transparent no-padding">
                      <div
                        class="absolute-center"
                        style="width: 12%; top: 63%; left: 88%"
                        v-if="
                          (item == 'equipment' && inventoryStore.isNewItem) ||
                          (item == 'shop' && itemShopStore.isNewItem)
                        "
                      >
                        <q-img
                          src="/images/icon_main/icon-item-alert-circle-red.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- #endregion -->

    <setting-dialog
      :isDialogSetting="isShowDialogSetting"
      v-if="isShowDialogSetting"
      @callback-closeDialog="isShowDialogSetting = false"
    ></setting-dialog>

    <profile-dialog
      :isDialogProfile="isShowDialogProfile"
      v-if="isShowDialogProfile"
      @callback-closeDialog="isShowDialogProfile = false"
      @callback-showDialogAgreement="funcShowDialogAgreement()"
      :studentStore="studentStore"
      :practiceStore="practiceStore"
      :courseStore="courseStore"
      :schoolStore="schoolStore"
    ></profile-dialog>

    <buddy-login-dialog
      :isDialogBuddyLogin="isShowDialogBuddyLogin"
      @callback-closeDialog="isShowDialogBuddyLogin = false"
      @callback-openDialog="isShowDialogBuddyLogin = true"
      :systemStore="systemStore"
      :buddyStore="buddyStore"
      :studentStore="studentStore"
      @callback-logout="buddyStore.logout()"
    ></buddy-login-dialog>

    <news-dialog
      :isDialogNews="isShowDialogNews"
      v-if="isShowDialogNews"
      @callback-closeDialog="funcCloseDialogNews()"
    ></news-dialog>

    <!-- <time-out-dialog
      :isDialogNews="isShowDialogTimeOut"
      v-if="isShowDialogTimeOut"
      @callback-closeDialog="isShowDialogTimeOut = false"
    ></time-out-dialog> -->

    <logout-dialog
      :isDialogLogOut="isShowDialogLogout"
      v-if="isShowDialogLogout"
      @callback-closeDialog="isShowDialogLogout = false"
      @callback-logout="funcLogout()"
    ></logout-dialog>

    <!-- Dialog Tutorial -->
    <dialog-tutorial
      v-if="isShowDialogTutorial"
      :isDialogTutorial="isShowDialogTutorial"
      :systemStore="systemStore"
      @callback-closeDialog="funcCloseDialogTutorial()"
      :pageName="'lobby'"
    ></dialog-tutorial>

    <loading-dialog :isShowLoading="isLoading"></loading-dialog>

    <!-- <payment-dialog
      @closeDialog="isShowDialogPayment = false"
      :isShowPaymentDialog="isShowDialogPayment"
    ></payment-dialog> -->

    <ranking-dialog
      :studentStore="studentStore"
      v-if="isShowDialogRanking"
      :isDialogRanking="isShowDialogRanking"
      @callback-closeDialog="isShowDialogRanking = false"
    ></ranking-dialog>

    <dialog-mailbox
      v-if="isShowDialogMailbox"
      @callback-closeDialog="isShowDialogMailbox = false"
    ></dialog-mailbox>
  </div>
</template>

<script setup>
import profileBar from "./profile-bar.vue";
import settingDialog from "src/components/dialog_main/setting-dialog.vue";
import profileDialog from "components/dialog_main/profile-dialog.vue";
import newsDialog from "components/dialog_main/news-dialog.vue";
import timeOutDialog from "src/components/dialog_main/time-out.vue";
import logoutDialog from "components/dialog_main/logout-dialog.vue";
import dialogTutorial from "components/dialog_main/tutorial.vue";
import buddyLoginDialog from "components/dialog_main/dialog-buddy-login.vue";
import loadingDialog from "components/dialog-loading.vue";
import character from "components/character_main/character.vue";
import rankingDialog from "components/dialog_main/ranking-dialog.vue";
import dialogMailbox from "components/dialog_main/dialog-mailbox.vue";

import { computed, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { logout } from "src/router";
import { useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { useInventoryStore } from "src/stores/inventory";
import { useMysteryBoxStore } from "src/stores/mystery-box";
import { useStudentStore } from "src/stores/student";
import { useSynchronizeStore } from "src/stores/synchronize";

const isShowDialogMailbox = ref(false);

const systemStore = useSystemStore();

const rightBarList = ref([
  {
    name: "news",
    img: "/images/icon_main/icon-news.png",
    tooltip: "News",
    func: () => (isShowDialogMailbox.value = true),
  },
  {
    name: "setting",
    img: "/images/icon_main/icon-setting.png",
    tooltip: "Setting",
    func: () => (isShowDialogSetting.value = true),
  },
  {
    name: "logout",
    img: "/images/icon_main/icon-logout.png",
    tooltip: "Logout",
    func: () => (isShowDialogLogout.value = true),
  },
]);

const menuList = ref([
  "ranking",
  // "mission",
  // "achievements",
  "equipment",
  "shop",
  "mystery-box",
]);

const funcGoto = async (type) => {
  if (type == "ranking") isShowDialogRanking.value = true;
  else if (type == "equipment") $router.push("/equipment");
  else if (type == "shop") $router.push("/shop");
  else if (type == "mystery-box") $router.push("/gachapon");
};

const isShowDialogSetting = ref(false);
const isShowDialogProfile = ref(false);
const isShowDialogNews = ref(false);
const isShowDialogMenu = ref(false);
const isShowDialogTimeOut = ref(false);
const isShowDialogLogout = ref(false);
const isShowDialogBuddyLogin = ref(false);
const isShowDialogTutorial = ref(false);

const showDialogTutorial = computed(() => {
  if (props.isFirstTutorial) return true;
  if (isShowDialogTutorial.value) return true;
  return false;
});

const windowSize = ref({});

const onResize = (size) => {
  windowSize.value = size;
};

const isShowDialogPayment = ref(false);
const openPaymentDialog = () => {
  isShowDialogPayment.value = true;
};

const isAnimationMiniMenu = ref(true);
const funcCloseMiniMenu = () => {
  isAnimationMiniMenu.value = false;
  setTimeout(() => {
    isShowDialogMenu.value = false;
    isAnimationMiniMenu.value = true;
  }, 100);
};

const paynow = (amount) => {
  OmiseCard.configureButton("#checkout-button", {
    amount: amount * 100, // หน่วยสตางค์
    currency: "THB",
    buttonLabel: `Pay ${amount} Bath`,
    frameLabel: "Winner English",
  });
  OmiseCard.attach();
};

const isLoading = ref(false);
const funcLogout = async () => {
  isLoading.value = true;
  await logout();
  isLoading.value = false;
};

const funcCloseDialogTutorial = () => {
  isShowDialogTutorial.value = false;
  emit("callback-closeTutorial");
};

// watch(
//   () => props.isWatchShowDialogNews,
//   (value) => {
//     if (value) {
//       if (systemStore.activeStatus.isAutoShowDialogNews) {
//         isShowDialogNews.value = true;
//         systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
//       }
//     }
//   }
// );

//   if (systemStore.activeStatus.isShowDialogEventReward) {
//     emit("callback-showDialogEventReward");
//   }
// };

//       if (studentStore.studentType == "school") {
//         if (studentStore.studentData.isShowNewsPopup) {
//           isShowDialogNews.value = true;
//           // systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
//         }
//       } else {
//         if (studentStore.isAgreePolicy) {
//           if (studentStore.studentData.isShowNewsPopup) {
//             isShowDialogNews.value = true;
//             // systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
//           }
//         }
//       }

watch(
  () => props.isWatchShowDialogNews,
  (value) => {
    if (value) {
      if (systemStore.activeStatus.isAutoShowDialogNews) {
        isShowDialogNews.value = true;
        systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
      }
    }
  }
);

onMounted(() => {
  const synchronizeStore = useSynchronizeStore();
  const studentStore = useStudentStore();

  if (systemStore.activeStatus.isAutoShowDialogNews == false) {
    sessionStorage.setItem("isReceivedReward", "true");

    // // Dialog
    // isShowDialogSetting,
    // isShowDialogProfile,
    // isShowDialogNews,
    // isShowDialogMenu,
    // isShowDialogTimeOut,
    // isShowDialogLogout,
    // isShowDialogBuddyLogin,
    // isShowDialogTutorial,
    // isShowDialogPayment,
    // isShowDialogMailbox,
  }

  if (studentStore.studentType == "school") {
    if (systemStore.activeStatus.isAutoShowDialogNews) {
      isShowDialogNews.value = true;
      systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
    }
  } else {
    if (studentStore.isAgreePolicy) {
      if (systemStore.activeStatus.isAutoShowDialogNews) {
        isShowDialogNews.value = true;
        systemStore.systemData.activeStatus.isAutoShowDialogNews = false;
      }
    }
  }

  let isCheckTutorial = systemStore.checkFirstTutorial("lobby");

  if (!synchronizeStore.isSync) {
    if (isCheckTutorial) {
      isShowDialogTutorial.value = true;
    }
  }
});
</script>

<style lang="scss" scoped>
.box-profile-main {
  position: relative;
}

.notify-news {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background-color: #f00;
  border-radius: 50%;
  border: 1px solid #fff;
  z-index: 1;
}

.icon-menu-close {
  animation: floatingCloseMenu 0.3s ease-out forwards;
  transform: rotate(45deg);
  opacity: 1;

  -webkit-animation: floatingCloseMenu 0.3s ease-out forwards;
  -webkit-transform: rotate(45deg);
}

@keyframes floatingCloseMenu {
  to {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    opacity: 1;
  }
}

.icon-menu-close-reverse {
  animation: floatingCloseMenuReverse 0.1s ease-out forwards;
  transform: rotate(0deg);
  opacity: 1;

  -webkit-animation: floatingCloseMenuReverse 0.1s ease-out forwards;
  -webkit-transform: rotate(0deg);
}

@keyframes floatingCloseMenuReverse {
  to {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    opacity: 0;
  }
}

.animation-floating-button-1 {
  position: absolute;
  animation: floatingButton1 0.1s ease-out forwards;
  -webkit-animation: floatingButton1 0.1s ease-out forwards;
  top: 16px;
  right: 9px;
}

@keyframes floatingButton1 {
  to {
    right: 65px;
  }
}

.animation-floating-button-1-reverse {
  position: absolute;
  animation: floatingButton1Reverse 0.1s ease-out forwards;
  -webkit-animation: floatingButton1Reverse 0.1s ease-out forwards;
  top: 16px;
  right: 65px;
}

@keyframes floatingButton1Reverse {
  to {
    right: 9px;
    opacity: 0;
  }
}

.animation-floating-button-2 {
  position: absolute;
  animation: floatingButton2 0.2s ease-out forwards;
  -webkit-animation: floatingButton2 0.2s ease-out forwards;
  top: 17px;
  right: 9px;
}

@keyframes floatingButton2 {
  to {
    right: 55px;
    top: 63px;
  }
}

.animation-floating-button-2-reverse {
  position: absolute;
  animation: floatingButton2Reverse 0.1s ease-out forwards;
  -webkit-animation: floatingButton2Reverse 0.1s ease-out forwards;
  top: 61px;
  right: 55px;
}

@keyframes floatingButton2Reverse {
  to {
    right: 9px;
    top: 16px;
    opacity: 0;
  }
}

.animation-floating-button-3 {
  position: absolute;
  animation: floatingButton3 0.3s ease-out forwards;
  -webkit-animation: floatingButton3 0.3s ease-out forwards;
  top: 16px;
  right: 9px;
}

@keyframes floatingButton3 {
  to {
    top: 74px;
  }
}

.animation-floating-button-3-reverse {
  position: absolute;
  animation: floatingButton3Reverse 0.1s ease-out forwards;
  -webkit-animation: floatingButton3Reverse 0.1s ease-out forwards;
  top: 74px;
  right: 9px;
}

@keyframes floatingButton3Reverse {
  to {
    top: 16px;
    opacity: 0;
  }
}

.animation-text-sub-fadeIn-1 {
  animation: showText 0.3s linear forwards 0.3s;
  left: -25px;
  opacity: 0;
}

.animation-text-sub-fadeIn-2 {
  animation: showText 0.3s linear forwards 0.3s;
  opacity: 0;
  left: -32px;
}

.animation-text-sub-fadeIn-3 {
  animation: showText 0.3s linear forwards 0.3s;
  opacity: 0;
  top: 55px;
}

@keyframes showText {
  to {
    opacity: 1;
  }
}

.box-show-menu {
  top: 65px;
  right: 15px;
  width: 95%;
  max-width: 400px;
  background-color: rgba(0, 0, 0, 0.6);
  border: 3px solid #4a261b;
  border-radius: 10px;
}
</style>
