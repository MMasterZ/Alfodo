<template>
  <q-dialog maximized v-model="isShowDialog" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-finish relative-position">
          <div class="box-sub-dialog-finish">
            <div class="box-finish-details q-pa-md row justify-center">
              <div class="col-12 q-py-sm"></div>
              <div class="col-12 relative-position" style="height: 110px">
                <!-- Star 1 -->
                <q-img
                  class="absolute-bottom-left star1"
                  :src="`/images/icon_main/icon-event-star-backdrop.png`"
                ></q-img>
                <q-img
                  class="absolute-bottom-left star1"
                  :class="eventData.star < 1 ? 'animation-fade-star ' : ''"
                  :src="`/images/icon_main/icon-event-star.png`"
                ></q-img>

                <!-- Star 2 -->
                <q-img
                  class="absolute-center star2"
                  :src="`/images/icon_main/icon-event-star-backdrop.png`"
                ></q-img>
                <q-img
                  class="absolute-center star2"
                  :class="eventData.star < 2 ? 'animation-fade-star ' : ''"
                  :src="`/images/icon_main/icon-event-star.png`"
                ></q-img>

                <!-- Star 3 -->
                <q-img
                  class="absolute-bottom-right star3"
                  :src="`/images/icon_main/icon-event-star-backdrop.png`"
                ></q-img>
                <q-img
                  class="absolute-bottom-right star3"
                  :class="eventData.star < 3 ? 'animation-fade-star ' : ''"
                  :src="`/images/icon_main/icon-event-star.png`"
                ></q-img>
              </div>
              <div class="col-12 q-mt-sm row font-fredoka f16">
                <div class="col-12 self-center row q-pb-sm">
                  <div class="self-center">Accuracy</div>
                  <q-space></q-space>
                  <div
                    class="col-1 self-center"
                    align="left"
                    style="width: 50px"
                  >
                    <span class="text-details f20">{{
                      `${eventData.score}%`
                    }}</span>
                  </div>
                </div>
                <div class="col-12 self-center row">
                  <div class="self-center">Reward</div>
                  <q-space></q-space>
                  <div class="self-center row">
                    <div class="self-center q-pb-sm q-px-sm">
                      <q-img
                        width="30px"
                        src="/images/icon_main/icon-event-diamond.png"
                      ></q-img>
                    </div>
                    <div
                      class="col-1 self-center"
                      align="left"
                      style="width: 50px"
                    >
                      <span class="text-details f20">{{ 0 }}</span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 self-center row"
                  v-if="!eventData.com.isPassedPractice && eventData.star > 0"
                >
                  <div class="self-center">First Time Reward</div>
                  <q-space></q-space>
                  <div class="self-center row">
                    <div class="self-center q-pb-sm q-px-sm">
                      <q-img
                        width="30px"
                        src="/images/icon_main/icon-event-diamond.png"
                      ></q-img>
                    </div>
                    <div
                      class="col-1 self-center"
                      align="left"
                      style="width: 50px"
                    >
                      <span class="text-details f20">{{ 300 }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 self-end" align="center">
                <div class="box-score-bonus row">
                  <div
                    class="col-1 relative-position"
                    align="left"
                    style="width: 70px"
                  >
                    <q-img
                      class="absolute-center"
                      width="40px"
                      style="left: 25px"
                      src="/images/icon_main/icon-event-diamond.png"
                    ></q-img>
                  </div>
                  <div class="col q-px-sm" align="left">
                    <span class="font-fredoka f40 text-white">
                      {{ `${0}` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-pa-md row justify-center">
              <div class="col-1 width-fit q-mx-sm q-px-xs" align="center">
                <q-btn round flat @click="eventData.func.backToMenu()">
                  <q-img
                    width="60px"
                    src="/images/icon_main/icon-event-menu.png"
                  ></q-img>
                </q-btn>
              </div>
              <div class="col-1 width-fit q-mx-sm q-px-xs" align="center">
                <q-btn round flat @click="eventData.func.restartPractice()">
                  <q-img
                    width="60px"
                    src="/images/icon_main/icon-event-restart.png"
                  ></q-img>
                </q-btn>
              </div>
              <div
                class="col-1 width-fit q-mx-sm q-px-xs"
                align="center"
                v-if="
                  (!eventData.com.isPassedPractice && eventData.star > 0) ||
                  eventData.com.isPassedPractice
                "
              >
                <q-btn round flat @click="eventData.func.nextPractice()">
                  <q-img
                    width="60px"
                    src="/images/icon_main/icon-event-next-practice.png"
                  ></q-img>
                </q-btn>
              </div>
            </div>
          </div>

          <div class="absolute-center" style="top: 15px">
            <q-img
              width="250px"
              src="/images/label_main/label-event-story-finish-practice.png"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isShowDialog: {
      type: Boolean,
      default: false,
    },
    eventData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {},
};
</script>

<style lang="scss" scoped>
.box-dialog-finish {
  width: 320px;
  height: 470px;
  background-color: #7f4429;
  border: 3px solid #4b1e0a;
  border-radius: 40px;
  padding-bottom: 5px;
}

.box-dialog-finish .box-sub-dialog-finish {
  width: 100%;
  height: 100%;
  background-color: #ba6f4d;
  border-radius: 40px;
  padding: 15px;
}

.box-finish-details {
  height: 82%;
  background-color: #fff2e5;
  border-radius: 20px;
  color: #4b1e0a;
}

.box-score-bonus {
  width: 95%;
  background-color: #7f4429;
  border: 2px solid #4a261b;
  border-radius: 25px;
  font-size: 40px;
  line-height: 1.2;
  box-shadow: inset 0 0 3px #4a261b;
}

.text-details {
  color: #fff;
  text-shadow: rgb(75, 30, 10) 2px 0px 0px,
    rgb(75, 30, 10) 1.75517px 0.958851px 0px,
    rgb(75, 30, 10) 1.0806px 1.68294px 0px,
    rgb(75, 30, 10) 0.141474px 1.99499px 0px,
    rgb(75, 30, 10) -0.832294px 1.81859px 0px,
    rgb(75, 30, 10) -1.60229px 1.19694px 0px,
    rgb(75, 30, 10) -1.97998px 0.28224px 0px,
    rgb(75, 30, 10) -1.87291px -0.701566px 0px,
    rgb(75, 30, 10) -1.30729px -1.5136px 0px,
    rgb(75, 30, 10) -0.421592px -1.95506px 0px,
    rgb(75, 30, 10) 0.567324px -1.91785px 0px,
    rgb(75, 30, 10) 1.41734px -1.41108px 0px,
    rgb(75, 30, 10) 1.92034px -0.558831px 0px;
  line-height: 1;
}

.animation-fade-star {
  animation: fade 0.7s linear forwards;
}

@keyframes fade {
  to {
    opacity: 0;
  }
}

.star1 {
  width: 59px;
  left: 43px;
  transform: rotate(45deg);
  animation-delay: 1.5s;
}

.star2 {
  width: 59px;
  top: 35%;
  animation-delay: 1s;
}
.star3 {
  width: 59px;
  right: 43px;
  transform: rotate(-45deg);
  animation-delay: 0.5s;
}
</style>
