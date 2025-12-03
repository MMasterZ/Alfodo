<template>
  <q-dialog maximized v-model="isShowDialogMaintenance" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="brx box-dialog-main">
          <div class="sub-dialog" align="center">
            <div class="f20 font-mali-b">ปิดปรับปรุงระบบชั่วคราว</div>
            <div class="content-dialog">
              <div class="font-mali-b f14">
                เพื่อเพิ่มประสิทธิภาพ Winner English ขออภัยในความไม่สะดวก
              </div>
              <div align="center" class="q-mt-sm">
                <q-img
                  width="187.1px"
                  src="/images/icon_main/icon-maintenance.webp"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
            <div align="center">
              <q-img
                class="button-active-main"
                width="120px"
                src="/images/button_main/button-acknowledge.webp"
                no-spinner
                no-transition
                @click="funcCloseDialogMaintenance()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["callback-closeDialogMaintenance"]);

const isShowDialogMaintenance = ref(true);

const funcCloseDialogMaintenance = () => {
  isShowDialogMaintenance.value = false;

  setTimeout(() => {
    emit("callback-closeDialogMaintenance");
  }, 500);
};
</script>

<style lang="scss" scoped>
.box-dialog-main {
  width: 318px;
  border-radius: 12px;
  padding: 6px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
  box-sizing: border-box;

  & .sub-dialog {
    width: 100%;
    height: 100%;
    border-radius: 12px;
    padding: 16px 12px 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

    & .content-dialog {
      border-radius: 10px;
      padding: 12px 12px 32px 12px;
      background: #efd080;
      margin: 16px 0px;
    }
  }
}

.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: transform 0.2s;
  -webkit-transition: transform 0.2s;
  -moz-transition: transform 0.2s;

  cursor: pointer;

  &:active {
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    -moz-transform: scale(0.9);
  }
}
</style>
