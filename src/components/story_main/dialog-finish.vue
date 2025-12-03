<template>
  <q-dialog persistent maximized v-model="isShowDialogFinish">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog">
          <div
            class="relative-position"
            align="center"
            style="margin-bottom: -50px; z-index: 2"
          >
            <q-img
              width="250px"
              src="/images/label_main/label-chapter-clear-event.png"
            ></q-img>
          </div>
          <q-img src="/images/dialog_main/dialog-box-finish-event.png">
            <div class="transparent fit row justify-center">
              <div class="col-12 row justify-center box-content">
                <!-- Star -->
                <div class="col-12 relative-position" style="height: 42%">
                  <div
                    class="absolute"
                    style="left: 20%; bottom: 5%; transform: rotate(45deg)"
                  >
                    <q-img
                      width="60px"
                      no-spinner
                      :src="`/images/icon_main/icon-finish-star-event${
                        storyData.star > 0 ? '' : '-default'
                      }.png`"
                    ></q-img>
                  </div>
                  <div
                    class="absolute"
                    style="
                      left: 50%;
                      bottom: 30%;
                      transform: rotate(0deg) translate(-50%, -0%);
                    "
                  >
                    <q-img
                      no-spinner
                      width="60px"
                      :src="`/images/icon_main/icon-finish-star-event${
                        storyData.star > 1 ? '' : '-default'
                      }.png`"
                    ></q-img>
                  </div>
                  <div
                    class="absolute"
                    style="right: 20%; bottom: 5%; transform: rotate(-45deg)"
                  >
                    <q-img
                      width="60px"
                      no-spinner
                      :src="`/images/icon_main/icon-finish-star-event${
                        storyData.star > 2 ? '' : '-default'
                      }.png`"
                    ></q-img>
                  </div>
                </div>

                <!-- Details -->
                <div
                  class="col-12 row items-center f16 font-fredoka f20 q-px-md"
                  style="height: 34%"
                >
                  <div class="col-12 row">
                    <div class="col q-px-sm">
                      <span class="f16"> Accuracy </span>
                    </div>
                    <div
                      class="col-1 self-center row"
                      style="width: 90px"
                      align="right"
                    >
                      <div class="col-1" align="left" style="width: 35px"></div>
                      <div class="self-center col q-px-xs" align="left">
                        <span class="text-coin">66% </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 row">
                    <div class="col q-px-sm">
                      <span class="f16"> Reward</span>
                    </div>
                    <div
                      class="col-1 self-center row"
                      style="width: 90px"
                      align="left"
                    >
                      <div class="col-1" align="left" style="width: 35px">
                        <q-img
                          src="/images/icon_main/icon-test-diamond-event.png"
                        ></q-img>
                      </div>
                      <div class="self-center col q-px-xs" align="left">
                        <span class="text-coin">60</span>
                      </div>
                    </div>
                  </div>
                  <div class="col-12 row">
                    <div class="col q-px-sm">
                      <span class="f16"> First time reward </span>
                    </div>
                    <div
                      class="col-1 self-center row"
                      style="width: 90px"
                      align="left"
                    >
                      <div class="col-1" align="left" style="width: 35px">
                        <q-img
                          src="/images/icon_main/icon-test-diamond-event.png"
                        ></q-img>
                      </div>

                      <div class="self-center col q-px-xs" align="left">
                        <span class="text-coin">300</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Total Coin -->
                <div
                  class="col-12 row justify-center items-center q-px-md"
                  style="height: 24%"
                >
                  <div class="col-12 box-total-coin self-center row q-px-sm">
                    <div class="col-1 self-center" style="width: 50px">
                      <q-img
                        src="/images/icon_main/icon-test-diamond-event.png"
                      ></q-img>
                    </div>
                    <div class="col self-center font-fredoka" align="center">
                      <span
                        class="text-white"
                        style="font-size: 40px; line-height: 1.3"
                        >360</span
                      >
                    </div>
                    <div class="col-1" style="width: 50px"></div>
                  </div>
                </div>
              </div>

              <!-- Footer Button -->
              <div
                class="col-10 self-end row justify-center box-button"
                align="center"
              >
                <div class="col-4 self-center">
                  <q-img
                    class="cursor-pointer"
                    style="width: 60px"
                    src="/images/button_main/button-back-menu-event.png"
                    @click="storyData.func.resetStory()"
                  ></q-img>
                </div>
                <div class="col-4 self-center">
                  <q-img
                    class="cursor-pointer"
                    style="width: 60px"
                    src="/images/button_main/button-restart-event.png"
                  ></q-img>
                </div>
                <div class="col-4 self-center">
                  <q-img
                    class="cursor-pointer"
                    style="width: 60px"
                    src="/images/button_main/button-next-practice-event.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    isShowDialogFinish: {
      type: Boolean,
      deefault: false,
    },
    storyData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.box-dialog {
  width: 320px;
}

.button {
  width: 90%;
  height: 100%;
  background-color: #707070;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}

.box-content {
  height: 81%;
  background-color: #fff2e5;
  color: #4b1e0a;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

.box-button {
  height: 17%;
}

.box-total-coin {
  background-color: #7f4429;
  border: 2px solid #4a261b;
  border-radius: 30px;
  box-shadow: inset 0px 2px 3px 1px rgba(0, 0, 0, 0.2);
}

.text-coin {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px,
    rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px,
    rgb(0, 0, 0) -0.832294px 1.81859px 0px,
    rgb(0, 0, 0) -1.60229px 1.19694px 0px, rgb(0, 0, 0) -1.97998px 0.28224px 0px,
    rgb(0, 0, 0) -1.87291px -0.701566px 0px,
    rgb(0, 0, 0) -1.30729px -1.5136px 0px,
    rgb(0, 0, 0) -0.421592px -1.95506px 0px,
    rgb(0, 0, 0) 0.567324px -1.91785px 0px,
    rgb(0, 0, 0) 1.41734px -1.41108px 0px,
    rgb(0, 0, 0) 1.92034px -0.558831px 0px;
}
</style>
