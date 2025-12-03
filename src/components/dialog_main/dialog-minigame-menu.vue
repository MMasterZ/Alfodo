<template>
  <q-dialog v-model="isShowDialogMiniGanmeMenu" maximized persistent class="z-max">
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
            <div class="col-12 self-center body q-pa-lg">
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

const isShowDialogMiniGanmeMenu = ref(true);
// #endregion

const funcSelectedMiniGame = (name) => {
  const miniGameStore = useMiniGameStore();
  $q.loading.show();
  miniGameStore.setMiniGameSelected(name);
  router.push(`/minigame/${name}`);
  $q.loading.hide();
};

const funcRandomCatch = () => {
  let randomCatch = Math.random().toString(36).substring(3);

  return randomCatch;
};

const funcCloseDialog = () => {
  isShowDialogMiniGanmeMenu.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
</script>

<style lang="scss" scoped>
// #region Container
// Desktop
.box-minigame-menu-container {
  max-width: 1100px;
  min-width: 1100px;
  width: 100%;
  height: 573.35px;
  background-color: #f6f3d3;
  border-radius: 30px;
  border: 3px solid #4a261b;
  overflow: hidden;
}

// Mobile
.box-minigame-menu-container.mobile {
  max-width: 400px;
  width: 100%;
  min-width: 300px;
  max-height: 90vh;
  min-height: 50vh;
  border-radius: 15px;
}
// #endregion

// #region Header
.box-minigame-menu-container .header {
  position: relative;
  height: 11%;
  background-color: #f2c043;
  box-shadow: inset 0px 10px 0px 0px #fbdd94;
  border-radius: 25px 25px 0px 0px;
}

.box-minigame-menu-container .header.mobile {
  height: 7%;
  box-shadow: inset 0px 5px 0px 0px #fbdd94;
  border-radius: 10px 10px 0px 0px;
}

.box-show-mini-game-ticket {
  width: 152px;
  height: 40px;
  border: 3px solid #4a261b;
  border-radius: 33px;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-show-mini-game-ticket.mobile {
  width: 100px;
  height: 26px;
  border: 2px solid #4a261b;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
}

.text-number-ticket {
  font-size: 24px;
  color: #fff;
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  line-height: 1;
}

.text-number-ticket.mobile {
  font-size: 16px;
}

.text-header {
  font-size: 36px;
  color: #fff;
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px, 0px 4px 4px rgba(0, 0, 0, 0.5);
}

.text-header.mobile {
  font-size: 24px;
}
// #endregion

.box-minigame-menu-container .body {
  height: 78%;
  border-top-color: #4a261b;
  border-top-width: 3px;
  border-top-style: solid;

  border-bottom-color: #4a261b;
  border-bottom-width: 3px;
  border-bottom-style: solid;
}

.box-minigame-menu-container .body.mobile {
  height: 86%;
  overflow: auto;
}

.box-minigame-menu-container .footer {
  height: 11%;
  background-color: #f2c043;
  box-shadow: inset 0px -10px 0px 0px #9a771f;
  border-radius: 0px 0px 25px 25px;
}

.box-minigame-menu-container .footer.mobile {
  height: 7%;
  box-shadow: inset 0px -5px 0px 0px #9a771f;
  border-radius: 0px 0px 10px 10px;
}

.text-minigame-details {
  width: 100%;
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px;
  color: #fff;
  font-size: 20px;
}
</style>
