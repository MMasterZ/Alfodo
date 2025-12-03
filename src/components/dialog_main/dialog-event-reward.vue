<template>
  <q-dialog v-model="isShowDialogEventReward" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container relative-position">
          <div class="box-dialog-sub">
            <div class="box-dialog-header font-mali-b" align="center">
              {{ `ของรางวัลพิเศษ` }}
            </div>
            <div class="box-dialog-content" align="center">
              <div class="box-reward-name font-mali-b f14" align="center">
                {{ `Winner Coin 500 เหรียญ` }}
              </div>
              <div class="box-reward-image relative-position" align="center">
                <q-img
                  :src="`/images/box_main/box-special-reward-blank.png`"
                  no-spinner
                  no-transition
                ></q-img>

                <div class="absolute-center box-item-image">
                  <q-img
                    src="images/icon_main/icon-winner-coin-extra.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>

                <div
                  class="absolute-bottom box-reward-number row justify-center items-center f48 font-mali-b"
                >
                  <div class="text-reward-number">
                    {{ `500` }}
                  </div>
                </div>
              </div>
              <!-- <div
                align="center"
                class="font-mali-b box-reward-footer f12"
                v-if="itemShow.type != 'coin' && itemShow.type != 'key'"
              >
                {{ `เช็คของรางวัลได้ที่หน้า Equipment` }}
              </div> -->
            </div>

            <div align="center">
              <q-img
                width="274px"
                class="button-main-active"
                src="/images/button_main/button-get-reward.png"
                no-spinner
                no-transition
                @click="funcGetReward()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { onMounted, ref } from "vue";

// Emit
const emits = defineEmits(["callback-closeDialog"]);

const isShowDialogEventReward = ref(false);
const funcGetReward = () => {
  isShowDialogEventReward.value = false;

  const studentStore = useStudentStore();

  studentStore.setReceivedReward();

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 500);
};

onMounted(() => {
  const systemStore = useSystemStore();

  if (sessionStorage.getItem("isReceivedReward") === "true") {
    emits("callback-closeDialog");
    return;
  }

  isShowDialogEventReward.value = true;
  sessionStorage.setItem("isReceivedReward", "true");
  systemStore.systemData.activeStatus.isShowDialogEventReward = false;
});
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 318px;
  padding: 0.375rem;
  border-radius: 0.75rem;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-dialog-sub {
  border-radius: 0.375rem;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 0.75rem 0.75rem 0.75rem 0.75rem;
  color: #4a261b;
}

.box-dialog-header {
  font-size: 1.25rem;
}

.box-dialog-content {
  border-radius: 0.625rem;
  background: #efd080;
  padding: 0.75rem;
  margin: 16px auto;
}

.box-dialog-content .box-reward-name {
  width: 15.625rem;
  line-height: 1.286;
  border-radius: 62.4375rem;
  background: rgba(255, 255, 255, 0.5);
  padding: 0.5rem;
}

.box-dialog-content .box-reward-image {
  width: 200px;
  height: 200px;
  margin: 1rem 0rem 0rem 0rem;
}

.box-item-image {
  top: 48%;
  width: 75%;
  height: 75%;
  border-radius: 30px;
  overflow: hidden;
}

.box-dialog-content .box-reward-number {
  bottom: 29px;
  width: 160px;
  height: 50px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.1);
  margin: auto;
}

.box-dialog-content .box-reward-footer {
  font-size: 0.75rem;
  line-height: 1.75rem;
  margin: 1rem 0rem 0rem 0rem;
}

.text-reward-number {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px,
    rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px,
    rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px,
    rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px,
    rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px,
    rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px,
    rgb(0, 0, 0) 1.92034px -0.558831px 0px;
  line-height: 0;
}

.button-main-active {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;

  cursor: pointer;
}

.button-main-active:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
}
</style>
