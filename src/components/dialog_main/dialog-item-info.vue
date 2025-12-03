<template>
  <div class="absolute-center fit box-backdrop-main row justify-center items-center z-max">
    <div
      class="box-show-reward-detail relative-position animate__animated"
      :class="{'animate__zoomIn':isShowDialogItemInfo,'animate__zoomOut':!isShowDialogItemInfo,'mobile':isMobile}"
      data-cy="box-item-reward-info"
    >
      <q-img
        :src="`/images/box_main/box-reward-info${
          !isMobile ? '' : '-mobile'
        }.webp`"
        no-spinner
        no-transition
      ></q-img>

      <div class="absolute-center box-reward-iamge" :class="{'mobile':isMobile}">
        <q-img
          class="animation-bring"
          src="/images/box_main/box-item-info-bring-animation.png"
          no-spinner
          no-transition
        ></q-img>
      </div>

      <div class="absolute-center box-reward-iamge" :class="{'mobile':isMobile}">
        <div class="relative-position fit">
          <q-img
            :src="`/images/button_main/button-item-${
              itemData.grade == 'common' ? '' : 'limited-'
            }blank.png`"
            no-spinner
            no-transition
            v-if="itemData.type != 'coin' && itemData.type != 'key'"
          >
          </q-img>

          <q-img
            :src="`/images/button_main/button-item-${
              itemData.type == 'coin' ? '' : 'limited-'
            }blank.png`"
            no-spinner
            no-transition
            v-else
          >
          </q-img>

          <div class="absolute-center fit row justify-center items-center">
            <div
              class="col-12 q-pa-xs"
              align="center"
              v-if="itemData.type == 'coin' || itemData.type == 'key'"
            >
              <q-img
                src="/images/icon_main/icon-coin-winner.png"
                v-if="itemData.type == 'coin'"
                width="75%"
                no-spinner
                no-transition
                data-cy="item-image-info"
              ></q-img>

              <q-img
                src="/images/icon_main/icon-premium-key.png"
                v-if="itemData.type == 'key'"
                width="75%"
                no-spinner
                no-transition
                data-cy="item-image-info"
              ></q-img>
            </div>
            <div
              class="col-12"
              style="width: 100%; border-radius: 8px; overflow: hidden"
              v-else
              align="center"
            >
              <q-img
                :src="`${pathStore}/${itemData.itemName}.png`"
                no-spinner
                no-transition
                width="70%"
                data-cy="item-image-info"
              ></q-img>
            </div>
            <div
              class="absolute-bottom"
              v-if="itemData.type == 'key' || itemData.type == 'coin'"
            ></div>
          </div>
        </div>
      </div>

      <div class="absolute-center box-text-info row" :class="{'mobile':isMobile}">
        <div
          class="self-center text-reward-info font-mali-b"
          align="center"
          :class="{'mobile':isMobile}"

        >
          <div class="text-title-reward" data-cy="item-name-info" :class="{'mobile':isMobile}">
            <div v-if="itemData.type == 'coin'">
              {{ `Winner Coin ${funcFormatNumber(itemData.amount)} เหรียญ` }}
            </div>
            <div v-else-if="itemData.type == 'key'">
              {{ `กุญแจกล่อง Premium ${funcFormatNumber(itemData.amount)} ดอก` }}
            </div>
            <div v-else>
              {{ itemData.itemNameTh }}
            </div>
          </div>
          <div
            class="text-detail-reward"
            v-if="itemData.type != 'coin' && itemData.type != 'key'"
            data-cy="item-detail-info"
            :class="{'mobile':isMobile}"
          >
            {{
              itemData.grade == "common"
                ? "Costume ระดับทั่วไป"
                : "Costume ระดับพิเศษ"
            }}
          </div>
          <div class="text-detail-reward" :class="{'mobile':isMobile}" v-else>
            <div v-if="itemData.type == 'coin'" data-cy="item-detail-info">
              {{ `มีอยู่ : ${funcFormatNumber(studentStore.coin)}` }}
            </div>
            <div v-if="itemData.type == 'key'" data-cy="item-detail-info">
              {{ `มีอยู่ : ${funcFormatNumber(studentStore.premiumKey)}` }}
            </div>
          </div>
        </div>
      </div>

      <div class="absolute-center box-button-ok-long" :class="{'mobile':isMobile}">
        <q-img
          class="button-main"
          src="/images/button_main/button-ok-long.webp"
          no-spinner
          no-transition
          @click="funcCloseDialog()"
          data-cy="button-ok-info"
        ></q-img>
      </div>
    </div>
  </div>

  <!-- #region Old -->
  <q-dialog v-model="isShowDialogItemInfo" maximized persistent class="z-max" v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="box-show-reward-detail relative-position"
          data-cy="box-item-reward-info"
        >
          <q-img
            :src="`/images/box_main/box-reward-info${
              $q.platform.is.desktop ? '' : '-mobile'
            }.webp`"
            no-spinner
            no-transition
          ></q-img>

          <div class="absolute-center box-reward-iamge" style="width: 127px">
            <q-img
              class="animation-bring"
              src="/images/box_main/box-item-info-bring-animation.png"
              no-spinner
              no-transition
            ></q-img>
          </div>

          <div class="absolute-center box-reward-iamge">
            <div class="relative-position fit">
              <q-img
                :src="`/images/button_main/button-item-${
                  itemData.grade == 'common' ? '' : 'limited-'
                }blank.png`"
                no-spinner
                no-transition
                v-if="itemData.type != 'coin' && itemData.type != 'key'"
              >
              </q-img>

              <q-img
                :src="`/images/button_main/button-item-${
                  itemData.type == 'coin' ? '' : 'limited-'
                }blank.png`"
                no-spinner
                no-transition
                v-else
              >
              </q-img>

              <div class="absolute-center fit row justify-center items-center">
                <div
                  class="col-12 q-pa-xs"
                  align="center"
                  v-if="itemData.type == 'coin' || itemData.type == 'key'"
                >
                  <q-img
                    src="/images/icon_main/icon-coin-winner.png"
                    v-if="itemData.type == 'coin'"
                    width="75%"
                    no-spinner
                    no-transition
                    data-cy="item-image-info"
                  ></q-img>

                  <q-img
                    src="/images/icon_main/icon-premium-key.png"
                    v-if="itemData.type == 'key'"
                    width="75%"
                    no-spinner
                    no-transition
                    data-cy="item-image-info"
                  ></q-img>
                </div>
                <div
                  class="col-12"
                  style="width: 100%; border-radius: 8px; overflow: hidden"
                  v-else
                  align="center"
                >
                  <q-img
                    :src="`${pathStore}/${itemData.itemName}.png`"
                    no-spinner
                    no-transition
                    width="70%"
                    data-cy="item-image-info"
                  ></q-img>
                </div>
                <div
                  class="absolute-bottom"
                  v-if="itemData.type == 'key' || itemData.type == 'coin'"
                ></div>
              </div>
            </div>
          </div>

          <div class="absolute-center box-text-info row">
            <div
              class="self-center text-reward-info font-mali-b"
              align="center"
              :class="textRewardInfo"
            >
              <div data-cy="item-name-info">
                <div v-if="itemData.type == 'coin'">
                  {{ `Winner Coin ${funcFormatNumber(itemData.amount)} เหรียญ` }}
                </div>
                <div v-else-if="itemData.type == 'key'">
                  {{ `กุญแจกล่อง Premium ${funcFormatNumber(itemData.amount)} ดอก` }}
                </div>
                <div v-else>
                  {{ itemData.itemNameTh }}
                </div>
              </div>
              <div
                class="f12"
                v-if="itemData.type != 'coin' && itemData.type != 'key'"
                data-cy="item-detail-info"
              >
                {{
                  itemData.grade == "common"
                    ? "Costume ระดับทั่วไป"
                    : "Costume ระดับพิเศษ"
                }}
              </div>
              <div class="f12" v-else>
                <div v-if="itemData.type == 'coin'" data-cy="item-detail-info">
                  {{ `มีอยู่ : ${funcFormatNumber(studentStore.coin)}` }}
                </div>
                <div v-if="itemData.type == 'key'" data-cy="item-detail-info">
                  {{ `มีอยู่ : ${funcFormatNumber(studentStore.premiumKey)}` }}
                </div>
              </div>
            </div>
          </div>

          <div class="absolute-center box-button-ok-long">
            <q-img
              class="button-main"
              src="/images/button_main/button-ok-long.webp"
              no-spinner
              no-transition
              @click="funcCloseDialog()"
              data-cy="button-ok-info"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script setup>
import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { computed, ref } from "vue";

const props = defineProps({
  itemData: {
    type: Object,
    default: () => {},
  },
});

const $q = useQuasar();

const emit = defineEmits(["callback-closeDialog"]);

const studentStore = useStudentStore();

const isMobile = ref($q.platform.is.mobile)

const isShowDialogItemInfo = ref(true);

const pathStore = ref(
  "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
);

const funcCloseDialog = () => {
  isShowDialogItemInfo.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 250);
};
const funcFormatNumber = (number) => {
  let amount = Number(number);

  return amount.toLocaleString();
};
</script>

<style lang="scss" scoped>

.box-backdrop-main{
  background-color:rgba(0,0,0,.5);

  // ใน Mobile ให้ backdrop ไม่บล็อกการเลื่อนของ background
  @media (max-width: 1023px) {
    pointer-events: none;
    touch-action: none;

    // แต่ให้ dialog box ยังสามารถคลิกได้
    > * {
      pointer-events: auto;
      touch-action: auto;
    }
  }
}

.box-show-reward-detail {
  width: clamp(315px,31.5cqw,504px);

  &.mobile{
    width: 504px;
  }
}

.box-reward-iamge {
  top: 25%;
  width: clamp(60px,6cqw,96px);

  &.mobile{
    width:80px;
  }

}

.box-text-info {
  top: 58.5%;
  width: 79%;
  height: 25%;

  &.mobile{
    width: 100%;
  }
}

.text-reward-info {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
  line-height: clamp(16.25px,1.625cqw,26px);
  margin: auto;

  & .text-title-reward{
    font-size:clamp(10px,1cqw,16px);

    &.mobile{
      font-size:14px;
      line-height:24px;
    }
  }

  & .text-detail-reward{
    font-size:clamp(8px,0.8cqw,12px);

    &.mobile{
      font-size:10px;
      line-height:20px;
    }
  }

}

.button-main {
  cursor: pointer;
  border: 0px solid transparent;
}

.box-button-ok-long {
  top: 83%;
  width: clamp(90px,9cqw,144px);

  &.mobile{
    width:144px;
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
</style>
