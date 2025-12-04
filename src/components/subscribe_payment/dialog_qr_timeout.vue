<template>
  <q-dialog :model-value="isOpenDialog" persistent>
    <q-card
      style="
        background-color: transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 330px;
        min-width: 328px;
        width: 100%;
        max-height: 90vh;
        position: relative;
        padding: 16px;
        overflow: hidden;
      "
    >
      <div
        style="
          display: flex;
          max-width: 320px;
          min-width: 320px;
          max-height: 174px;
          width: 100%;
          height: auto;
          padding: 8px;
          flex-direction: column;
          align-items: flex-start;
          flex: 1 0 0;
          align-self: stretch;
          border-radius: 16px;
          border: 2px solid #4a261b;
          background: #f2c043;
        "
      >
        <div
          style="
            display: flex;
            max-height: 154px;
            height: auto;
            overflow: hidden;
            padding: 24px 8px 8px 8px;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            border-radius: 12px;
            background: #ffedc4;
          "
        >
          <div class="font-mali-b f20">QR หมดอายุ</div>
          <div class="font-mali-m f14">กรุณาสร้าง QR รับเงินใหม่อีกครั้ง</div>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: flex-start;
              gap: 8px;
              align-self: stretch;
            "
          >
            <div
              class="relative-position clickable cursor-pointer"
              @click="emitValue('back')"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/cancel_purchase_btn.png"
                alt=""
              />
              <div class="f16 font-mali-b textShadow-btn absolute-center">ย้อนกลับ</div>
            </div>
            <div
              class="relative-position clickable cursor-pointer"
              @click="emitValue('confirm')"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/confirm_purchase_btn.png"
                alt=""
              />

              <div class="f16 font-mali-b textShadow-btn absolute-center">ยืนยัน</div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";

const props = defineProps({
  isOpenDialog: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-dialog", "generate-new"]);

const emitValue = (type) => {
  if (type == "back") {
    emit("close-dialog", false);
  } else {
    emit("generate-new", true);
  }
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.textShadow-btn {
  color: white;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}
</style>
