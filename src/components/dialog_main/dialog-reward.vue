<template>
  <div
    class="animate__animated box-dialog-get-reward relative-position animate__delay-1s animation-duration-0-5s"
    :class="isShowDialogReward ? 'animate__fadeIn' : 'animate__fadeOut'"
  >
    <div class="relative-position fit" align="center" data-cy="box-get-reward">
      <!-- style="height: 210px" -->
      <div
        class="box-show-item-container row justify-center items-center relative-position"
        :class="$q.platform.is.desktop ? '' : 'mobile'"
      >
        <!-- #region อนิเมชั่นหมุน (ตรงกลาง) -->
        <div class="absolute-center full-width">
          <q-img
            class="aniamtion-rotate relative-position"
            src="/images/box_main/box-get-reward-animation.webp"
            no-spinner
            no-transition
            data-cy="box-get-reward-animation"
          ></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region แสดงผลได้ระบไอเท็ม -->
        <div
          v-if="isShowAnimationItem"
          class="row justify-center items-center relative-position"
          :style="[
            showItemReward[currentRewardPage].length === 5 ? 'width:100%;' : 'width:70%;',
          ]"
        >
          <!-- #region ไอเท็ม -->
          <div
            v-for="(itemReward, indexReward) in showItemReward[currentRewardPage]"
            class="box-image-reward relative-position animate__animated animate__flipInY animation-duration-1s"
            :key="indexReward"
            data-cy="box-image-reward"
            :style="[{ animationDelay: `${(indexReward + 1) * 0.2}s` }]"
            :class="[
              showItemReward[currentRewardPage].length === 1 ? 'length-1' : '',
              showItemReward[currentRewardPage].length === 5 ? 'length-5' : '',
            ]"
          >
            <div
              class="relative-position image-reward"
              :class="$q.platform.is.desktop ? '' : 'mobile'"
            >
              <q-img
                :src="`/images/button_main/button-item-${
                  itemReward.grade == 'common' ? '' : 'limited-'
                }blank.png`"
                no-spinner
                no-transition
                v-if="itemReward.type != 'coin' && itemReward.type != 'key'"
              >
              </q-img>

              <q-img
                :src="`/images/button_main/button-item-${
                  itemReward.type == 'coin' ? '' : 'limited-'
                }blank.png`"
                no-spinner
                no-transition
                v-else
              >
              </q-img>

              <div class="absolute-center fit row justify-center items-center">
                <div
                  class="col-12 box-coin-and-key"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                  v-if="itemReward.type == 'coin' || itemReward.type == 'key'"
                >
                  <q-img
                    width="75%"
                    src="/images/icon_main/icon-coin-winner.png"
                    v-if="itemReward.type == 'coin'"
                    no-spinner
                    no-transition
                  ></q-img>

                  <q-img
                    width="75%"
                    src="/images/icon_main/icon-premium-key.png"
                    v-if="itemReward.type == 'key'"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>

                <div
                  class="col-12 box-item"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                  v-else
                  align="center"
                >
                  <q-img
                    :src="`${pathStore}/${itemReward.itemName}.png`"
                    no-spinner
                    no-transition
                    width="95%"
                  ></q-img>
                </div>

                <div
                  class="absolute-bottom box-amount-reward"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                  v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                  align="center"
                >
                  <div class="font-mali-b">
                    {{ funcFormatNumber(itemReward.amount) }}
                  </div>
                </div>

                <div
                  class="absolute-bottom box-have-reward font-mali-b"
                  :class="$q.platform.is.desktop ? '' : 'mobile'"
                  v-if="itemReward.isDuplicate"
                  align="center"
                >
                  <div>เคยได้รับแล้ว</div>
                  <div
                    class="box-amount-have-reward row justify-center items-center"
                    :class="$q.platform.is.desktop ? '' : 'mobile'"
                  >
                    <div
                      class="self-center relative-position box-button-amout-reward"
                      :class="$q.platform.is.desktop ? '' : 'mobile'"
                    >
                      <q-img
                        :src="`/images/button_main/button-item-${
                          itemReward.grade == 'common' ? '' : 'limited-'
                        }blank.png`"
                        no-spinner
                        no-transition
                      >
                      </q-img>

                      <div class="absolute-center fit row justify-center items-center">
                        <q-img
                          width="60%"
                          src="/images/icon_main/icon-coin-winner.png"
                          v-if="itemReward.grade == 'common'"
                          no-spinner
                          no-transition
                        ></q-img>

                        <q-img
                          width="60%"
                          src="/images/icon_main/icon-premium-key.png"
                          v-if="itemReward.grade == 'limited'"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                    <div
                      class="self-center text-shadow-none text-plus-rotate"
                      :class="$q.platform.is.desktop ? '' : 'mobile'"
                    ></div>
                    <div class="self-center">
                      {{ funcFormatNumber(itemReward.amount.value) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region อนิเมชั่นดาว (ด้านซ้าย) -->
          <div
            class="absolute-top-left icon-bring-reward-left"
            :class="[$q.platform.is.desktop ? '' : 'mobile', funcSetClassLength()]"
          >
            <!-- {{ funcSetClassLength }} -->
            <q-img
              class="animation-bring"
              src="/images/icon_main/icon-get-reward-left-animation.webp"
              no-spinner
              no-transition
              data-cy="image-left-animation"
            ></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region อนิเมชั่นดาว (ด้านขวา) -->
          <div
            class="absolute-top-right icon-bring-reward-right"
            :class="[$q.platform.is.desktop ? '' : 'mobile', funcSetClassLength()]"
          >
            <q-img
              class="animation-bring"
              style="animation-delay: 0.5s"
              src="/images/icon_main/icon-get-reward-right-animation.webp"
              no-spinner
              no-transition
              data-cy="image-right-animation"
            ></q-img>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->
      </div>

      <div class="box-text-footer" :class="$q.platform.is.desktop ? '' : 'mobile'">
        <div
          class="font-mali-b text-footer"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
        >
          ได้รับรางวัลเรียบร้อยแล้ว
        </div>
        <div
          class="font-mali-b text-footer-sub"
          :class="$q.platform.is.desktop ? '' : 'mobile'"
        >
          สำหรับ Costumes เช็คของรางวัลได้ที่หน้า Equipment
        </div>
      </div>
      <div class="button-main button-ok" :class="$q.platform.is.desktop ? '' : 'mobile'">
        <q-img
          src="/images/button_main/button-ok.webp"
          no-spinner
          no-transition
          @click="funcClosePopup()"
          data-cy="button-ok"
        ></q-img>
      </div>
    </div>
  </div>

  <q-dialog
    v-model="isShowDialogReward"
    persistent
    maximized
    style="background-color: rgba(0, 0, 0, 0.75)"
    class="z-max"
    v-if="false"
  >
    <q-card class="transparent shadow-0">
      <q-card-section
        class="fit row justify-center items-center no-padding"
        style="overflow: hidden"
      >
        <div
          class="box-dialog-get-reward relative-position"
          align="center"
          data-cy="box-get-reward"
        >
          <div>
            <div
              class="row justify-center items-center relative-position"
              style="height: 210px"
            >
              <!-- #region อนิเมชั่นหมุน (ตรงกลาง) -->
              <div class="absolute-center full-width">
                <q-img
                  class="aniamtion-rotate relative-position"
                  src="/images/box_main/box-get-reward-animation.webp"
                  no-spinner
                  no-transition
                  data-cy="box-get-reward-animation"
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region แสดงผลได้ระบไอเท็ม -->
              <div
                v-if="isShowAnimationItem"
                class="row justify-center items-center relative-position"
                :style="[
                  showItemReward[currentRewardPage].length === 5
                    ? 'width:100%;'
                    : 'width:60%;',
                ]"
              >
                <!-- #region ไอเท็ม -->
                <div
                  v-for="(itemReward, indexReward) in showItemReward[currentRewardPage]"
                  class="box-image-reward relative-position animate__animated animate__flipInY animation-duration-1s"
                  :key="indexReward"
                  data-cy="box-image-reward"
                  :style="[{ animationDelay: `${(indexReward + 1) * 0.2}s` }]"
                  :class="[
                    showItemReward[currentRewardPage].length === 1 ? 'length-1' : '',
                    showItemReward[currentRewardPage].length === 5 ? 'length-5' : '',
                  ]"
                >
                  <div class="relative-position image-reward">
                    <q-img
                      :src="`/images/button_main/button-item-${
                        itemReward.grade == 'common' ? '' : 'limited-'
                      }blank.png`"
                      no-spinner
                      no-transition
                      v-if="itemReward.type != 'coin' && itemReward.type != 'key'"
                    >
                    </q-img>

                    <q-img
                      :src="`/images/button_main/button-item-${
                        itemReward.type == 'coin' ? '' : 'limited-'
                      }blank.png`"
                      no-spinner
                      no-transition
                      v-else
                    >
                    </q-img>

                    <div class="absolute-center fit row justify-center items-center">
                      <div
                        class="col-12 q-pa-xs"
                        v-if="itemReward.type == 'coin' || itemReward.type == 'key'"
                      >
                        <q-img
                          width="75%"
                          src="/images/icon_main/icon-coin-winner.png"
                          v-if="itemReward.type == 'coin'"
                          no-spinner
                          no-transition
                        ></q-img>

                        <q-img
                          width="75%"
                          src="/images/icon_main/icon-premium-key.png"
                          v-if="itemReward.type == 'key'"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                      <div
                        class="col-12"
                        style="width: 80%; border-radius: 8px; overflow: hidden"
                        v-else
                        align="center"
                      >
                        <q-img
                          :src="`${pathStore}/${itemReward.itemName}.png`"
                          no-spinner
                          no-transition
                          width="95%"
                        ></q-img>
                      </div>

                      <div
                        class="absolute-bottom box-amount-reward f24"
                        v-if="itemReward.type == 'key' || itemReward.type == 'coin'"
                        align="center"
                      >
                        <div class="font-mali-b">
                          {{ funcFormatNumber(itemReward.amount) }}
                        </div>
                      </div>

                      <div
                        class="absolute-bottom box-have-reward f12 font-mali-b"
                        v-if="itemReward.isDuplicate"
                        align="center"
                      >
                        <div>เคยได้รับแล้ว</div>
                        <div
                          class="box-amount-have-reward row justify-center items-center"
                        >
                          <div class="self-center relative-position">
                            <q-img
                              width="17px"
                              :src="`/images/button_main/button-item-${
                                itemReward.grade == 'common' ? '' : 'limited-'
                              }blank.png`"
                              no-spinner
                              no-transition
                            >
                            </q-img>

                            <div
                              class="absolute-center fit row justify-center items-center"
                            >
                              <q-img
                                width="60%"
                                src="/images/icon_main/icon-coin-winner.png"
                                v-if="itemReward.grade == 'common'"
                                no-spinner
                                no-transition
                              ></q-img>

                              <q-img
                                width="60%"
                                src="/images/icon_main/icon-premium-key.png"
                                v-if="itemReward.grade == 'limited'"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>
                          </div>
                          <div
                            class="self-center text-shadow-none text-plus-rotate"
                          ></div>
                          <div class="self-center">
                            {{ funcFormatNumber(itemReward.amount.value) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region อนิเมชั่นดาว (ด้านซ้าย) -->
                <div
                  class="absolute-top-left icon-bring-reward-left"
                  :class="funcSetClassLength()"
                >
                  <!-- {{ funcSetClassLength }} -->
                  <q-img
                    width="41.72px"
                    class="animation-bring"
                    src="/images/icon_main/icon-get-reward-left-animation.webp"
                    no-spinner
                    no-transition
                    data-cy="image-left-animation"
                  ></q-img>
                </div>
                <!-- #endregion -->

                <!-- #region อนิเมชั่นดาว (ด้านขวา) -->
                <div
                  class="absolute-top-right icon-bring-reward-right"
                  :class="funcSetClassLength()"
                >
                  <q-img
                    width="55.72px"
                    class="animation-bring"
                    style="animation-delay: 0.5s"
                    src="/images/icon_main/icon-get-reward-right-animation.webp"
                    no-spinner
                    no-transition
                    data-cy="image-right-animation"
                  ></q-img>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>
          </div>
          <div class="q-mt-md q-mb-lg">
            <div class="font-mali-b f20">ได้รับรางวัลเรียบร้อยแล้ว</div>
            <div class="font-mali-b f12 q-mt-sm">
              สำหรับ Costumes เช็คของรางวัลได้ที่หน้า Equipment
            </div>
          </div>
          <div class="button-main button-ok">
            <q-img
              src="/images/button_main/button-ok.webp"
              no-spinner
              no-transition
              @click="funcClosePopup()"
              data-cy="button-ok"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  rewardList: {
    type: Array,
    default: [],
  },
  isMultiReward: {
    type: Boolean,
    default: false,
  },
  isFirstTutorial: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["callback-closeDialog"]);

// Data
const pathStore = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
);
const isShowDialogReward = ref(true);

// #region animation show reward
const showItemReward = ref([]);
const rewardPage = ref(0);
const currentRewardPage = ref(0);
const isShowAnimationItem = ref(false);
const funcShowRewardAnimation = () => {
  if (props.rewardList.length) {
    rewardPage.value = Math.ceil(props.rewardList.length / 5);

    let min = 0;
    let max = 5;

    for (let i = 0; i < rewardPage.value; i++) {
      let temp = props.rewardList.slice(min, max);

      showItemReward.value.push(temp);

      min = max;
      max += 5;
    }
  }

  setTimeout(() => {
    isShowAnimationItem.value = true;
  }, 500);
};

let listenShowAnimationItem = null;
const funcClosePopup = () => {
  if (listenShowAnimationItem) {
    clearTimeout(listenShowAnimationItem);
    listenShowAnimationItem = null;
  }

  isShowAnimationItem.value = false;
  if (rewardPage.value > 1) {
    if (rewardPage.value == currentRewardPage.value + 1) {
      isShowDialogReward.value = false;
      showItemReward.value = [];
      currentRewardPage.value = 0;
      rewardPage.value = 0;

      setTimeout(() => {
        emits("callback-closeDialog");
      }, 500);
    } else {
      currentRewardPage.value++;
    }

    listenShowAnimationItem = setTimeout(() => {
      isShowAnimationItem.value = true;
      clearTimeout(listenShowAnimationItem);
      listenShowAnimationItem = null;
    }, 150);

    return;
  }

  isShowDialogReward.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 500);
};

const funcSetClassLength = () => {
  if (showItemReward.value[currentRewardPage.value].length == 1) {
    return "length-1";
  } else if (showItemReward.value[currentRewardPage.value].length == 2) {
    return "length-2";
  } else if (showItemReward.value[currentRewardPage.value].length == 3) {
    return "length-3";
  } else if (showItemReward.value[currentRewardPage.value].length == 4) {
    return "length-4";
  } else {
    return "length-5";
  }
};

// #region format number
const funcFormatNumber = (number) => {
  let amount = Number(number);

  return amount.toLocaleString();
};
// #endregion

onMounted(() => {
  funcShowRewardAnimation();
});
// #endregion
</script>

<style lang="scss" scoped>
.box-dialog-get-reward {
  width: 100%;
  height: 100%;
  color: #fff;

  & .box-show-item-container {
    height: 60%;

    &.mobile {
      height: 200px;
    }
  }
}

.box-image-reward {
  width: 50%;

  // &.mobile {
  //   width: 100px;
  // }

  &.length-5 {
    width: 30%;
  }

  &.length-1 {
    width: 100%;
  }
}

.image-reward {
  width: clamp(62.5px, 6.25cqw, 100px);

  &.mobile {
    width: 100px;
  }

  & .box-item {
    width: 80%;
    border-radius: clamp(5px, 0.5cqw, 8px);
    overflow: hidden;

    &.mobile {
      border-radius: 8px;
    }
  }

  & .box-coin-and-key {
    padding: clamp(2.5px, 0.25cqw, 4px);

    &.mobile {
      padding: 4px;
    }
  }
}

.box-amount-reward {
  bottom: clamp(10px, 1cqw, 16px);
  width: 75%;
  border-radius: clamp(30.9375px, 3.09375cqw, 49.5px);
  color: #fff;
  background: rgba(0, 0, 0, 0.1);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  margin: auto;
  line-height: clamp(15px, 1.5cqw, 24px);
  font-size: clamp(15px, 1.5cqw, 24px);

  &.mobile {
    bottom: 16px;
    border-radius: 49.5px;
    font-size: 20px;
    line-height: 24px;
  }
}

.box-have-reward {
  bottom: clamp(9.375px, 0.9375cqw, 15px);
  width: 100%;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
  margin: auto;
  font-size: clamp(7.5px, 0.75cqw, 12px);

  &.mobile {
    bottom: 15px;
    font-size: 12px;
  }
}

.box-amount-have-reward {
  bottom: clamp(10px, 1cqw, 16px);
  width: clamp(45.625px, 4.5625cqw, 73px);
  height: clamp(12.5px, 1.25cqw, 20px);
  border-radius: clamp(30.9375px, 3.09375cqw, 49.5px);
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  line-height: 0px;
  margin-top: clamp(2.5px, 0.25cqw, 4px);

  &.mobile {
    bottom: 16px;
    width: 73px;
    height: 20px;
    border-radius: 49.5px;
    margin-top: 4px;
  }

  & .box-button-amout-reward {
    width: clamp(10.625px, 1.0625cqw, 17px);

    &.mobile {
      width: 17px;
    }
  }
}

.text-plus-rotate {
  display: inline-block;
  width: 1em;
  height: 1em;
  --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z'/%3E%3Cpath fill='%23000' d='M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-4H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4z'/%3E%3C/g%3E%3C/svg%3E");
  background-color: currentColor;
  -webkit-mask-image: var(--svg);
  mask-image: var(--svg);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;

  transform-origin: center;
  transform: rotate(-45deg);

  margin: 0px clamp(1.25px, 0.125cqw, 2px);

  &.mobile {
    margin: 0px 2px;
  }
}

.text-shadow-none {
  text-shadow: none;
}

.box-text-footer {
  margin: clamp(10px, 1cqw, 16px) 0px clamp(15px, 1.5cqw, 24px);

  &.mobile {
    margin: 16px 0px 24px;
  }

  & .text-footer {
    font-size: clamp(12.5px, 1.25cqw, 20px);

    &.mobile {
      font-size: 20px;
    }
  }

  & .text-footer-sub {
    margin-top: clamp(5px, 0.5cqw, 8px);
    font-size: clamp(7.5px, 0.75cqw, 12px);

    &.mobile {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}

.button-main {
  cursor: pointer;
  border: 0px solid transparent;

  // ok
  &.button-ok {
    width: clamp(62.5px, 6.25cqw, 100px);

    &.mobile {
      width: 100px;
    }
  }
}

// #region Icon
.icon-bring-reward-left {
  width: clamp(26.075px, 2.6075cqw, 41.72px);
  top: 45%;
  left: clamp(10.625px, 1.0625cqw, 17px);

  &.mobile {
    width: 41.72px;
  }

  &.length-1 {
    top: 45%;
    left: clamp(10.625px, 1.0625cqw, 17px);

    &.mobile {
      top: 45%;
      left: 17px;
    }
  }

  &.length-2 {
    top: 45%;
    left: -35px;
  }

  &.length-3 {
    top: 45%;
    left: -70px;
  }

  &.length-4 {
    top: 45%;
    left: -60px;
  }

  &.length-5 {
    top: 45%;
    left: 0px;
  }
}

.icon-bring-reward-right {
  width: clamp(34.825px, 3.4825cqw, 55.72px);
  top: 0%;
  right: 15px;

  &.mobile {
    width: 55.72px;
  }

  &.length-1 {
    top: 2px;
    right: 22px;
  }

  &.length-2 {
    top: 2px;
    right: -35px;
  }

  &.length-3 {
    top: 55px;
    right: -70px;
  }

  &.length-4 {
    top: 55px;
    right: -70px;
  }

  &.length-5 {
    top: 55px;
    right: 0px;
  }
}

// #endregion

// #region Animation

.aniamtion-rotate {
  animation: AnimateRotate 7s linear infinite;
  -webkit-animation: AnimateRotate 7s linear infinite;
  -moz-animation: AnimateRotate 7s linear infinite;
  -o-animation: AnimateRotate 7s linear infinite;

  transform-origin: center;

  transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
}

@keyframes AnimateRotate {
  to {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -o-transform: rotate(360deg);
  }
}

.animation-bring {
  animation: bring 1s linear infinite;
  -webkit-animation: bring 1s linear infinite;
  -moz-animation: bring 1s linear infinite;
  -o-animation: bring 1s linear infinite;

  opacity: 1;
}

@keyframes bring {
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
// #endregion
</style>
