<template>
  <div>
    <q-header :class="$route.name == 'flashcard' ? 'z-top' : ''">
      <q-toolbar class="bg-appbar">
        <div class="row header-container">
          <div class="col-6">
            <q-btn
              icon="fas fa-home"
              v-if="!isShowDialogFlashcard && isShowHome"
              class="shadow-2 btn-header q-mr-md btn-width-mobile"
              @click="$router.replace('/lobby')"
            ></q-btn>
            <q-btn
              icon="fas fa-arrow-left"
              v-if="
                $q.platform.is.mobile &&
                isShowDialogFlashcard &&
                $route.name == 'flashcard'
              "
              class="shadow-2 btn-header btn-width-mobile q-mr-sm"
              @click="$emit('callback-closedialogflashcard', false)"
            ></q-btn>
            <q-btn
              icon="fas fa-pause"
              v-if="isShowPause && !isShowDialogFlashcard"
              class="shadow-2 btn-header q-mr-md btn-width-mobile"
              @click="isShowSetting = true"
            ></q-btn>
          </div>

          <div align="right" class="col-6" v-if="isLoadPractice">
            <q-btn
              v-if="isHasInstruction"
              @click="isShowStartPractice = true"
              icon="fas fa-info-circle"
              class="shadow-2 btn-header"
              :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
              :label="!$q.platform.is.mobile ? 'คำสั่ง' : ''"
            ></q-btn>
            <q-btn
              v-if="isHasHelp"
              @click="$emit('callback-showdialoghelp')"
              icon="fas fa-lightbulb"
              class="shadow-2 btn-header q-ml-md"
              :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
              :label="!$q.platform.is.mobile ? 'ตัวช่วย' : ''"
            ></q-btn>
            <q-btn
              v-if="isHasContent"
              @click="$emit('callback-showcontent')"
              icon="fas fa-book"
              class="shadow-2 btn-header q-ml-md"
              :class="{ 'btn-width-mobile': $q.platform.is.mobile }"
              :label="!$q.platform.is.mobile ? 'เนื้อเรื่อง' : ''"
            ></q-btn>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- Dialog Setting -->
    <q-dialog maximized="" v-model="isShowSetting" persistent="" class="z-max">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit">
          <div class="absolute-center">
            <q-img width="300px" src="/images/dialog-setting.png">
              <div class="absolute-center transparent fit">
                <div class="q-mt-lg q-pt-sm q-px-md row">
                  <div class="q-px-md">
                    <q-icon
                      size="29px"
                      class="btn-header-color q-mr-md"
                      name="fas fa-volume-up"
                    ></q-icon
                    ><span class="text-black">เสียงประกอบ</span>
                  </div>
                  <q-space></q-space>
                  <div class="q-pr-sm">
                    <q-toggle
                      @update:modelValue="(val) => funcSoundEffect(val)"
                      v-model="systemStore.systemData.isEnableSoundEffect"
                      :color="systemStore.isEnableSoundEffect ? 'green' : 'grey'"
                      keep-color
                    />
                  </div>
                </div>
                <div class="q-mt-sm q-px-md row">
                  <div class="q-px-md">
                    <q-icon
                      size="29px"
                      class="btn-header-color q-mr-md"
                      name="fas fa-music"
                    ></q-icon
                    ><span class="text-black">เพลง</span>
                  </div>
                  <q-space></q-space>
                  <div class="q-px-sm">
                    <q-toggle
                      v-model="systemStore.systemData.isEnableSoundBackground"
                      :color="systemStore.isEnableSoundBackground ? 'green' : 'grey'"
                      keep-color
                      @update:modelValue="(val) => funcSoundBackground(val)"
                    />
                  </div>
                </div>
                <div class="q-mt-lg q-pa-xs" align="center">
                  <q-img
                    class="cursor-pointer"
                    v-close-popup
                    src="/images/btn-continue.png"
                    width="210px"
                    alt=""
                  />
                </div>

                <div class="q-pa-xs q-mt-xs" align="center">
                  <q-img
                    class="cursor-pointer"
                    src="/images/btn-out-practice.png"
                    width="210px"
                    @click="$router.replace('/practice/unit')"
                  />
                </div>
              </div>
            </q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Start practice -->

    <q-dialog
      maximized
      v-model="isShowStartPractice"
      persistent
      v-if="isLoadPractice && $route.name != 'flashcard' && $route.name != 'practicemain'"
      transition-show="slide-down"
      transition-hide="slide-up"
      style="animation-duration: 1s"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center">
          <div
            class="self-center"
            :class="
              $q.platform.is.desktop ? 'box-instruction-pc' : 'box-instruction-mobile'
            "
          >
            <div class="full-width relative-position">
              <div class="relative-position">
                <div style="margin: -35px auto 0px auto" align="center">
                  <q-img
                    style="width: 110%; margin-left: -5%"
                    :src="`/images/label-instruction-${
                      $q.platform.is.desktop ? 'pc' : 'mobile'
                    }.png`"
                  >
                    <div
                      class="full-width row text-header-practice transparent fit"
                      align="center"
                    >
                      <div class="col-12 self-center q-pb-sm" align="center">
                        <span :class="$q.platform.is.desktop ? 'f28' : 'f24'">
                          คำสั่ง
                        </span>
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
              <div
                class="col-12 q-pa-xs row justify-center q-mt-md"
                align="left"
                :class="$q.platform.is.desktop ? 'f20' : 'f16'"
              >
                <div class="q-px-md">
                  <span>{{ instructionData.eng }}</span>
                  <br />
                  <div class="q-mt-sm">{{ instructionData.th }}</div>
                </div>
              </div>
              <div class="col-12 q-py-lg self-end" align="center">
                <div v-close-popup class="btn-start cursor-pointer"></div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
export default {
  props: {
    isSynchronize: {
      type: Boolean,
      default: false,
    },
    isShowHome: {
      type: Boolean,
      default: false,
    },
    isShowPause: {
      type: Boolean,
      default: false,
    },
    isShowDialogFlashcard: {
      type: Boolean,
      default: false,
    },
    isHasInstruction: {
      type: Boolean,
      default: false,
    },
    isHasHelp: {
      type: Boolean,
      default: false,
    },

    isHasContent: {
      type: Boolean,
      default: false,
    },

    instructionData: {
      type: Object,
      default: () => {},
    },
    isLoadPractice: {
      type: Boolean,
      default: false,
    },
    systemStore: {
      default: () => {},
    },
  },
  emits: [
    "callback-showdialoghelp",
    "callback-showcontent",
    "callback-closedialogflashcard",
    "toggleEffect",
  ],
  setup(props, { emit }) {
    // Set Router
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const finishBtn = () => {
      router.replace("/practice/unit");
    };

    // TODO : Setting
    const isShowSetting = ref(false);
    const isShowStartPractice = ref(false);

    // Initial Data

    const funcSoundBackground = (val) => {
      props.systemStore.funcEnableSoundBackground(val);
    };

    const funcSoundEffect = (val) => {
      props.systemStore.funcEnableSoundEffect(val);
    };

    onMounted(() => {
      if (props.isHasInstruction) {
        isShowStartPractice.value = true;
      }
    });

    return {
      // Boolean
      isShowStartPractice,
      isShowSetting,

      // Function
      finishBtn,
      funcSoundBackground,
      funcSoundEffect,
    };
  },
};
</script>

<style lang="scss" scoped>
.header-container {
  max-width: 1600px;
  width: 100%;
  margin: auto;
}

.btn-header {
  border: 1px solid#FFC52E;
  background-color: #6d4300;
  border-radius: 10px;
  color: #ffc52e;
}

.btn-width-mobile {
  width: 40px;
}

.box-header-practice-pc {
  background-color: transparent;
  width: 70%;
  padding: 10px;
  margin: 5px auto;
}

.box-header-practice-mobile {
  background-color: transparent;
  width: 70%;
  margin: 5px auto;
  padding: 7px;
}

.box-content-instruction-mobile {
  width: 100%;
  height: 95%;
}

.btn-start {
  background-image: url("/images/btn-start.png");
  background-repeat: no-repeat;
  background-size: contain;
  width: 200px;
  height: 40px;
}

.text-header-practice {
  padding: 0px;
  margin: 0px;
  color: #683200;
  font-weight: bold;
}

.btn-header-color {
  color: #a36112;
}

.bg-appbar {
  background-color: #9f220c;
}

.box-instruction-pc {
  max-width: 650px;
  width: 100%;
  min-height: 200px;
  max-height: fit-content;
  background-color: #fff0da;
  border: 5px solid#A36112;
  border-radius: 10px;
}

.box-instruction-mobile {
  max-width: 400px;
  width: 100%;
  min-height: 200px;
  max-height: fit-content;
  background-color: #fff0da;
  border: 5px solid#A36112;
  border-radius: 10px;
}

.dialog-move-in {
  animation: moveIn 2s linear forwards;
  transform: translate(100%, -100%);
  opacity: 0;
}

@keyframes moveIn {
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}

.dialog-move-out {
  animation: moveOut 2s linear forwards;
}

@keyframes moveOut {
  to {
    opacity: 0;
    transform: translate(100%, -100%);
  }
}
</style>
