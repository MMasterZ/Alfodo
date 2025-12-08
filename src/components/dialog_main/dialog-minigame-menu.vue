<template>
  <div class="absolute-center fit row justify-center items-center z-max box-dialog-minigame-main">
    <div class="relative-position box-minigame-menu-container animate__animated" :class="{'animate__zoomIn': isAnimated,'animate__zoomOut': !isAnimated,'mobile': isMobile}">
      <q-img :src="`/images/minigame_main/box-minigame${isMobile ? '-mobile' : ''}.webp`" no-spinner no-transition></q-img>
      <div class="absolute-center fit">
        <div class="row box-header" :class="{'mobile': isMobile}">
          <div class="col-1 box-microchip self-center relative-position" :class="{'mobile': isMobile}">
            <q-img src="/images/minigame_main/box-microchip.webp" no-spinner no-transition></q-img>
            <div class="absolute-center text-ticket font-mali-b" align="center">{{ `${studentStore.studentData.gameTicket || 0}/5` }}</div>
          </div>
          <div class="col self-center box-title font-mali-b" align="center">
           <span>ทบทวน</span>
          </div>
          <div class="col-1 box-microchip self-center" :class="{'mobile': isMobile}"></div>
        </div>
        <div class="box-body row" :class="{'mobile': isMobile}">
          <div
            class="relative-position button-minigame"
            :class="{'mobile': isMobile}"
            v-for="(itemMiniGame, indexMiniGame) in minigameStore.get.miniGameList"
            :key="indexMiniGame"
          >
            <q-img
              :src="`/images/minigame_main/button-minigame${
                itemMiniGame.isComingSoon
                  ? '-coming'
                  : itemMiniGame.isUnlock
                  ? ''
                  : '-lock'
              }.webp?${funcRandomCatch()}`"
              :class="
                itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed'
              "
              @click="
                itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                  ? funcSelectedMiniGame(itemMiniGame.name)
                  : null
              "
              no-spinner
              no-transition
            >
              <div
                v-if="!itemMiniGame.isUnlock"
                class="fit row justify-center items-center transparent"
              >
                <div
                  class="absolute-center font-mali-b text-minigame-details"
                  align="center"
                >
                  <div v-html="itemMiniGame.details"></div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>

      <div class="absolute-top-right button-close" :class="{'mobile': isMobile}" @click="funcCloseDialog()">
        <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
      </div>
    </div>
  </div>

  <q-dialog v-model="isShowDialogMiniGanmeMenu" maximized persistent class="z-max" v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center q-pa-md">
        <!-- Desktop Mode -->
        <div class="relative-position" v-if="$q.platform.is.desktop">
          <div class="box-minigame-menu-container row">
            <div class="col-12 header row justify-center items-center" align="center">
              <div class="self-center col-3">
                <div class="box-show-mini-game-ticket row justify-center items-center">
                  <div class="col-1 relative-position">
                    <q-img
                      class="absolute-center"
                      width="73.56px"
                      src="/images/icon_main/icon-mini-game-ticket.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col self-center q-ml-sm">
                    <span class="text-number-ticket font-mali-b">{{
                      `${
                        studentStore.studentData.gameTicket > 5
                          ? 5
                          : studentStore.studentData.gameTicket || 0
                      }/5`
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col self-center">
                <span class="text-header font-mali-b">ทบทวน</span>
              </div>
              <div class="col-3"></div>
            </div>
            <div class="col-12 self-center body q-pa-lg" v-if="false">
              <div class="row">
                <div
                  class="col-4 q-pa-sm relative-position"
                  v-for="(itemMiniGame, indexMiniGame) in minigameStore.get.miniGameList"
                  :key="indexMiniGame"
                >
                  <q-img
                    :src="`/images/minigame_main/mini-game-${itemMiniGame.type}-banner${
                      itemMiniGame.isComingSoon
                        ? '-lock'
                        : itemMiniGame.isUnlock
                        ? ''
                        : '-lock'
                    }.png?${funcRandomCatch()}`"
                    :class="
                      itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                    "
                    @click="
                      itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                        ? funcSelectedMiniGame(itemMiniGame.name)
                        : null
                    "
                    no-spinner
                    no-transition
                  >
                    <div
                      v-if="!itemMiniGame.isUnlock"
                      class="fit row justify-center items-center transparent"
                    >
                      <div
                        class="absolute-center text-minigame-details"
                        align="center"
                        style="top: 40%"
                      >
                        <div v-html="itemMiniGame.details"></div>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
            <div class="col-12 footer"></div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-btn round flat @click="funcCloseDialog()">
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>

        <!-- Mobile Mode -->
        <div class="relative-position" v-if="$q.platform.is.mobile">
          <div class="box-minigame-menu-container mobile row">
            <div class="col-12 header mobile row">
              <div class="self-center col-3 q-px-sm">
                <div
                  class="box-show-mini-game-ticket mobile row justify-center items-center"
                >
                  <div class="col-5 relative-position">
                    <q-img
                      class="absolute-center"
                      width="49.15px"
                      src="/images/icon_main/icon-mini-game-ticket.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col self-center q-ml-sm">
                    <span class="text-number-ticket mobile font-mali-b">{{
                      `${
                        studentStore.studentData.gameTicket > 5
                          ? 5
                          : studentStore.studentData.gameTicket || 0
                      }/5`
                    }}</span>
                  </div>
                </div>
              </div>
              <div class="col self-center" align="center">
                <span class="text-header mobile font-mali-b">ทบทวน</span>
              </div>
              <div class="col-2"></div>
            </div>

            <div class="col-12 body mobile q-pa-xs">
              <div class="">
                <div class="row">
                  <div
                    class="col-12"
                    v-for="(itemMiniGame, indexMiniGame) in minigameStore.get
                      .miniGameList"
                    :key="indexMiniGame"
                  >
                    <q-img
                      :src="`/images/minigame_main/mini-game-${itemMiniGame.type}-banner${
                        itemMiniGame.isComingSoon
                          ? '-lock'
                          : itemMiniGame.isUnlock
                          ? ''
                          : '-lock'
                      }.png?${funcRandomCatch()}`"
                      :class="
                        itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                          ? 'cursor-pointer'
                          : 'cursor-not-allowed'
                      "
                      @click="
                        itemMiniGame.name != 'comingsoon' && itemMiniGame.isUnlock
                          ? funcSelectedMiniGame(itemMiniGame.name)
                          : null
                      "
                      no-spinner
                      no-transition
                    >
                      <div
                        v-if="!itemMiniGame.isUnlock"
                        class="fit row justify-center items-center transparent"
                      >
                        <div
                          class="absolute-center text-minigame-details"
                          align="center"
                          style="top: 40%"
                        >
                          <div v-html="itemMiniGame.details"></div>
                        </div>
                      </div>
                    </q-img>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 footer mobile"></div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-btn round flat @click="funcCloseDialog()">
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { useMiniGameStore } from "src/stores/minigame";
import { ref } from "vue";

// #region Initial Data

// Emit
const emit = defineEmits(["callback-closeDialog"]);

// Store
const studentStore = useStudentStore();
const minigameStore = useMiniGameStore();

// Router
const router = useRouter();
const route = useRoute();

// Quasar
const $q = useQuasar();
const isMobile = ref($q.platform.is.mobile);
const isAnimated = ref(true);
const isShowDialogMiniGanmeMenu = ref(true);
// #endregion

const funcSelectedMiniGame = (name) => {
  const miniGameStore = useMiniGameStore();
  $q.loading.show();
  miniGameStore.setMiniGameSelected(name);
  router.push(`/minigame/alienQuest`);
  $q.loading.hide();
};

const funcRandomCatch = () => {
  let randomCatch = Math.random().toString(36).substring(3);

  return randomCatch;
};

const funcCloseDialog = () => {
  isAnimated.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 250);
};
</script>

<style lang="scss" scoped>
// #region Container

.box-dialog-minigame-main {
  background-color: rgba(0, 0, 0, 0.5);
}

// Desktop
.box-minigame-menu-container {
  width: clamp(687.5px,68.75cqw,1100px);

  &.mobile{
    width: 340px;
  }

  & .box-header{
    height:clamp(40px,4cqw,64px);
    padding:0px clamp(26.25px,2.625cqw,42px);

    &.mobile{
      height:53px;
      padding:0px 16px;
    }

    & .box-microchip{
      width:clamp(96.25px,9.625cqw,154px);

      &.mobile{
        width:100px;
      }

      & .text-ticket{
        top:52.5%;
        left:63%;
        width:50%;
        color:#fff;
        font-size:clamp(15px,1.5cqw,24px);
        line-height: clamp(12.5px,1.25cqw,20px);

        &.mobile{
          font-size:16px;
          line-height: normal;
        }
      }
    }

    & .box-title{
      color:#fff;
      font-size:clamp(22.5px,2.25cqw,36px);
      line-height: normal;
      text-shadow: rgb(1, 77, 164) 3px 0px 0px, rgb(1, 77, 164) 2.83487px 0.981584px 0px, rgb(1, 77, 164) 2.35766px 1.85511px 0px, rgb(1, 77, 164) 1.62091px 2.52441px 0px, rgb(1, 77, 164) 0.705713px 2.91581px 0px, rgb(1, 77, 164) -0.287171px 2.98622px 0px, rgb(1, 77, 164) -1.24844px 2.72789px 0px, rgb(1, 77, 164) -2.07227px 2.16926px 0px, rgb(1, 77, 164) -2.66798px 1.37182px 0px, rgb(1, 77, 164) -2.96998px 0.42336px 0px, rgb(1, 77, 164) -2.94502px -0.571704px 0px, rgb(1, 77, 164) -2.59586px -1.50383px 0px, rgb(1, 77, 164) -1.96093px -2.27041px 0px, rgb(1, 77, 164) -1.11013px -2.78704px 0px, rgb(1, 77, 164) -0.137119px -2.99686px 0px, rgb(1, 77, 164) 0.850987px -2.87677px 0px, rgb(1, 77, 164) 1.74541px -2.43999px 0px, rgb(1, 77, 164) 2.44769px -1.73459px 0px, rgb(1, 77, 164) 2.88051px -0.838247px 0px;

      &.mobile{
        font-size:24px;
      }
    }
  }

  & .box-body{
    width:100%;
    height: clamp(281.25px,2.8125cqw,450px);
    min-height:fit-content;
    padding:0px clamp(15px,1.5cqw,24px);
    overflow:auto;

    &::-webkit-scrollbar{
      width: 0px;
      height:0px;
    }

    &.mobile{
      max-height:fit-content;
      height:473px;
      max-height: fit-content;
      min-height: auto;
    }

    & .button-minigame{
      width:clamp(202.5px,20.25cqw,324px);
      margin:0px clamp(7.5px,0.75cqw,12px);

      &.mobile{
        width:324px;
        margin:0px;
      }
    }
  }

  & .button-close{
    width:clamp(31.875px,3.1875cqw,51px);
    top:clamp(-15px,-0.9375cqw,-9.375px);
    right:clamp(-15px,-0.9375cqw,-9.375px);
    cursor:pointer;

    &.mobile{
      width:40px;
      right:-10px;
      top:-10px;
    }
  }
}

.text-minigame-details {
  top:45%;
  width: 100%;
  text-shadow: rgb(1, 77, 164) 3px 0px 0px, rgb(1, 77, 164) 2.83487px 0.981584px 0px, rgb(1, 77, 164) 2.35766px 1.85511px 0px, rgb(1, 77, 164) 1.62091px 2.52441px 0px, rgb(1, 77, 164) 0.705713px 2.91581px 0px, rgb(1, 77, 164) -0.287171px 2.98622px 0px, rgb(1, 77, 164) -1.24844px 2.72789px 0px, rgb(1, 77, 164) -2.07227px 2.16926px 0px, rgb(1, 77, 164) -2.66798px 1.37182px 0px, rgb(1, 77, 164) -2.96998px 0.42336px 0px, rgb(1, 77, 164) -2.94502px -0.571704px 0px, rgb(1, 77, 164) -2.59586px -1.50383px 0px, rgb(1, 77, 164) -1.96093px -2.27041px 0px, rgb(1, 77, 164) -1.11013px -2.78704px 0px, rgb(1, 77, 164) -0.137119px -2.99686px 0px, rgb(1, 77, 164) 0.850987px -2.87677px 0px, rgb(1, 77, 164) 1.74541px -2.43999px 0px, rgb(1, 77, 164) 2.44769px -1.73459px 0px, rgb(1, 77, 164) 2.88051px -0.838247px 0px;
  color: #fff;
  font-size: clamp(12.5px,1.25cqw,20px);
  line-height:normal;
}
</style>
