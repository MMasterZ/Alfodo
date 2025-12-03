<template>
  <q-dialog
    v-model="systemStore.activeState.isShowDialogYourLevel"
    maximized
    persistent
    :seamless="isPlacementPage"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container" align="center">
          <div class="relative-position">
            <q-img
              width="350px"
              :src="`/images/dialog_main/${
                isPlacementPage ? 'dialog-placement-level' : 'dialog-recommand-level'
              }.png`"
              no-spinner
              no-transition
            ></q-img>
            <div class="absolute-center box-dialog-content">
              <div class="box-recommand-level font-mali-b f16" align="center">
                <div v-if="studentStore.placementTestLevel == ''">
                  <div class="title-recommand">ระดับที่แนะนำตามอายุ</div>
                  <div class="text-recommand">
                    {{ `${studentStore.levelForAge}` }}
                  </div>
                </div>

                <div v-else>
                  <div class="title-recommand">ระดับที่สอบวัดระดับได้</div>
                  <div class="text-recommand">
                    {{ `${studentStore.placementTestLevel}` }}
                  </div>
                  <div class="text-age-of-level row" align="left">
                    <div>
                      {{ `ระดับที่แนะนำตามอายุ:` }}
                    </div>
                    <div class="col" align="right">
                      {{ `${studentStore.levelForAge}` }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="box-button-content">
                <q-img
                  width="130px"
                  src="/images/button_main/button-table-of-content.png"
                  no-spinner
                  no-transition
                  class="cursor-pointer"
                  @click="isShowDialogTableOfContents = true"
                ></q-img>
              </div>

              <div class="row justify-center">
                <div
                  class="box-button-next-placement"
                  v-if="!isPlacementPage && studentStore.placementTestLevel == ''"
                >
                  <q-img
                    src="/images/button_main/button-next-placement.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    @click="funcNextToPlacement()"
                  ></q-img>
                </div>
                <div class="box-button-next-placement">
                  <q-img
                    src="/images/button_main/button-next-th.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    @click="funcNext()"
                  ></q-img>
                </div>
              </div>

              <div
                align="center"
                class="box-text-link f12 font-mali-m"
                v-if="!isPlacementPage"
              >
                <div class="cursor-pointer" v-close-popup>ตัดสินใจภายหลัง</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isShowDialogConfirmSkip" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="relative-position box-dialog-skip-container">
          <div class="sub-dialog-container">
            <div align="center" class="f20 font-mali-b">
              {{ `ข้ามการสอบวัดระดับ` }}
            </div>
            <div align="center" class="q-my-md">
              {{ `เมื่อข้ามการสอบแล้ว จะไม่สามารถ กลับมาสอบวัดระดับได้อีกครั้ง` }}
            </div>
            <div class="row justify-center">
              <div class="q-mx-xs">
                <q-img
                  width="120px"
                  src="/images/button_main/button-cancel-th.png"
                  no-spinner=""
                  no-transition
                  class="cursor-pointer"
                  @click="funcCancelSkip()"
                ></q-img>
              </div>
              <div class="q-mx-xs">
                <q-img
                  width="120px"
                  src="/images/button_main/button-confirm-short-th.png"
                  no-spinner=""
                  no-transition
                  class="cursor-pointer"
                  @click="funcConfirmSkip()"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <dialog-table-of-content
    v-if="isShowDialogTableOfContents"
    @callback-closeTableOfContent="isShowDialogTableOfContents = false"
  ></dialog-table-of-content>
</template>

<script setup>
import dialogTableOfContent from "src/components/dialog_main/dialog-table-of-content.vue";

import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Initial State
const router = useRouter();
const route = useRoute();

// Store
const studentStore = useStudentStore();
const systemStore = useSystemStore();

// Dialog
const isShowDialogConfirmSkip = ref(false);
const isShowDialogTableOfContents = ref(false);

const isPlacementPage = computed(() => {
  const systemStore = useSystemStore();

  if (systemStore.routerName == "placement") {
    return true;
  }

  return false;
});

const funcNext = () => {
  const systemStore = useSystemStore();

  if (isPlacementPage.value) {
    systemStore.systemData.activeState.isShowDialogYourLevel = false;
    systemStore.systemData.activeState.isShowDialogUnlockLevel = true;

    router.replace("/lobby");
  } else {
    isShowDialogConfirmSkip.value = true;
    systemStore.systemData.activeState.isShowDialogYourLevel = false;
  }
};

const funcNextToPlacement = () => {
  router.push("/placement");
  systemStore.systemData.activeState.isShowDialogYourLevel = false;
};

const funcCancelSkip = () => {
  isShowDialogConfirmSkip.value = false;
  systemStore.systemData.activeState.isShowDialogYourLevel = true;
};

const funcConfirmSkip = () => {
  isShowDialogConfirmSkip.value = false;
  studentStore.student.data.placementTestLevel = "";
  systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
};
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 360px;
}

.box-dialog-skip-container {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;
}

.sub-dialog-container {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 24px 12px 12px 12px;
  color: #4a261b;
}

.box-dialog-content {
  top: 56%;
  width: 100%;
  height: 75%;
  padding: 12px;
  color: #4a261b;
}

.box-recommand-level {
  width: 80%;
  height: 190px;
  padding: 12px;
  border-radius: 10px;
  border: 2px solid #c96814;
  background: #fff;
  line-height: 20;
  color: #4a261b;
}

.box-button-content {
  margin: 16px 0px;
}

.title-recommand {
  line-height: 1;
}

.text-recommand {
  font-size: 96px;
  line-height: 1.3;
}

.text-age-of-level {
  line-height: 1;
}

.box-button-next-placement {
  width: 120px;
  margin: 0px 4px;
}

.box-text-link {
  color: #0085ff;
  text-decoration-line: underline;
  margin: 16px 0px 12px;
}
</style>
