<template>
  <q-dialog persistent :model-value="modelValue">
    <q-card
      style="
        background-color: transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 450px;
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
          max-width: 360px;
          min-width: 328px;
          max-height: 634px;
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
            max-height: 614px;
            height: auto;
            overflow: hidden;
            padding: 24px 8px 8px 8px;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            border-radius: 12px;
            background: #ffedc4;
            color: #4a261b;
          "
        >
          <div class="font-mali-b f20">เกิดข้อผิดพลาด</div>

          <div
            style="
              overflow: auto;
              height: 100%;
              max-height: 450px;
              max-width: 324px;
              background: #efd080;
              border-radius: 8px;
              display: flex;
              padding: 16px 12px 12px 12px;
              flex-direction: column;
              align-items: center;
              gap: 26px;
              align-self: stretch;
              border-radius: 10px;
              background: #ffedc4;
            "
            class="custom-scroll custom-scroll-container font-mali-m f12"
          >
            <div class="full-width text-center">
              <img
                style="width: 80px; height: 80px; margin-bottom: 12px"
                src="/images/subscribe_payment/error_purchased.png"
                alt=""
              />

              <div class="font-mali-m f16">เกิดข้อผิดพลาด</div>
              <div class="font-mali-m f16">กรุณาลองใหม่อีกครั้ง</div>
            </div>
          </div>
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
                src="/images/subscribe_payment/confirm_purchase_btn.png"
                alt=""
              />

              <div class="f16 font-mali-b textShadow-btn absolute-center">ย้อนกลับ</div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["close-dialog"]);

const emitValue = (type) => {
  if (type === "back") {
    emit("close-dialog", false); // Close the dialog via v-model
  }
};
</script>

<style lang="scss" scoped>
.clickable {
  transition: transform 0.2s ease;
}

.clickable:active {
  transform: scale(0.95); /* Simulate the push effect by shrinking the button */
}

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
