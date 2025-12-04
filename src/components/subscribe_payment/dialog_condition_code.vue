<template>
  <q-dialog :model-value="isDialogConditionCode" persistent>
    <q-card
      style="
        background-color: transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 440px;
        min-width: 360px;
        width: 100%;
        height: 100%;
        max-height: 90vh;
        position: relative;
        padding: 16px;
        overflow: hidden;
      "
    >
      <div
        style="
          display: flex;
          max-width: 400px;
          min-width: 328px;
          max-height: 700px;
          width: 100%;
          height: 100%;
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
            background-color: #4a261b;
            display: flex;
            padding: 12px 16px;
            justify-content: center;
            align-items: center;
            align-self: stretch;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            color: #fff;
          "
          class="font-mali-sb f16"
        >
          รายละเอียดโค้ด
        </div>
        <div
          style="
            display: flex;
            padding: 16px;
            flex-direction: column;
            align-items: center;
            flex: 1 0 0;
            align-self: stretch;
            background-color: #ffffff;
            border-bottom-right-radius: 12px;
            border-bottom-left-radius: 12px;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              flex: 1 0 0;
              align-self: stretch;
            "
          >
            <div
              style="
                display: flex;
                padding: 8px;
                justify-content: center;
                align-items: center;
                gap: 4px;
                align-self: stretch;
                border-radius: 10px;
                border: 1px solid #97a3ba;
              "
            >
              <div
                style="
                  display: flex;
                  align-items: center;
                  gap: 8px;
                  flex: 1 0 0;
                  max-width: 348px;
                  width: 100%;
                "
              >
                <div
                  style="
                    display: flex;
                    width: 82px;
                    height: 82px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    border-radius: 8px;
                  "
                  :style="`${
                    data.type === 'percent'
                      ? 'background: #c9193b;'
                      : data.type === 'baht'
                      ? 'background: #0B62D4;'
                      : 'background: #0BAA53;'
                  }`"
                >
                  <div align="center">
                    <div v-if="data.type != 'demo'">
                      <span class="font-mali-b f16 text-white">ส่วนลด</span>
                    </div>
                    <div v-else>
                      <span class="font-mali-b f16 text-white">ทดลอง</span>
                    </div>
                    <div>
                      <span class="font-mali-b f24 text-white">
                        <span v-if="data.type === 'baht'">{{ `฿${data.discount}` }}</span>
                        <span v-if="data.type === 'percent'">
                          {{ `${data.discount}%` }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  style="
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: flex-start;
                    flex: 1 0 0;
                  "
                >
                  <div class="row font-mali-m f12" style="color: #4a261b">
                    <div class="col-12" style="padding: 1px 0px">
                      โค้ด
                      <span class="font-mali-b f14">{{ data.code }}</span>
                    </div>
                    <div
                      class="col-12"
                      style="padding-bottom: 3px"
                      v-if="data.type != 'demo'"
                    >
                      ลดเพิ่ม
                      <span class="font-mali-b f14">{{ data.discount }}</span>
                      <span v-if="data.type != 'baht'"> สูงสุด </span>
                      <span v-if="data.type == 'percent'" class="font-mali-b f14">{{
                        data.maxPrice
                      }}</span>
                      บาท
                    </div>
                    <div class="col-12" v-else>
                      <span class="font-mali-m"
                        >ทดลองเรียน <span class="font-mali-b f14">1</span> เดือน</span
                      >
                    </div>
                    <div
                      class="col-12"
                      style="padding: 1px 0px"
                      v-if="data.type != 'demo'"
                    >
                      เมื่อซื้อขั้นต่ำ
                      <span class="font-mali-b f14">{{ data.minPrice }}</span>
                      บาท
                    </div>
                    <div v-else>
                      <span>ในราคา</span>
                      <span class="font-mali-b f14">{{ ` ${data.price} ` }}</span>
                      <span>บาท</span>
                    </div>
                    <div class="col-12" style="color: #727e96; padding: 1px 0px">
                      <span>{{
                        `${data.startDate.fullYear} - ${data.endDate.fullYear}`
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="full-width full-height font-mali-m f12"
              style="color: #4a261b; line-height: 24px"
            >
              <q-scroll-area
                :visible="true"
                :vertical-thumb-style="{
                  borderRadius: '99px',
                  background: '#4A261B',
                  opacity: '1',
                  width: '6px',
                  height: '100px',
                }"
                class="full-width full-height"
              >
                <div class="q-pr-md">
                  <div>
                    <div class="font-mali-sb f14"><u>ประเภทโค้ด</u></div>
                    <div>
                      {{
                        `${
                          data.type == "baht"
                            ? "คูปองเงินสด"
                            : data.type == "percent"
                            ? "โค้ดโปรโมชั่น"
                            : "ทดลองเรียน"
                        }`
                      }}
                      | {{ data.code }}
                    </div>
                  </div>

                  <div class="q-my-sm">
                    <div class="font-mali-sb f14">
                      <u>ระยะเวลาที่ใช้ได้</u>
                    </div>
                    <div>
                      {{
                        `${data.startDate.fullYear}, ${data.startTime} น. - ${data.endDate.fullYear}, ${data.endTime} น.`
                      }}
                    </div>
                  </div>

                  <div class="">
                    <div class="font-mali-sb f14"><u>การใช้งาน</u></div>

                    <div v-if="data.type !== 'demo'">
                      <div style="padding: 1px 0px"></div>
                      <div style="padding: 1px 0px"></div>
                    </div>
                    <div style="padding: 1px 0px" v-if="data.type === 'demo'">
                      <div style="padding: 1px 0px">
                        {{ `${data.detail}` }}
                      </div>
                    </div>
                    <div v-else>
                      <div v-if="data.type == 'baht'">
                        ได้รับส่วนลด {{ data.discount }}
                        <span>บาท</span>
                        <span v-if="data.type != 'baht'">
                          สูงสุด {{ data.maxPrice }} บาท</span
                        >
                      </div>
                      <div v-if="data.type == 'percent'">
                        ได้รับส่วนลด {{ data.discount }}<span>%</span> สูงสุด
                        {{ data.maxPrice }} บาท
                      </div>
                      <div>เมื่อซื้อขั้นต่ำ {{ data.minPrice }} บาท</div>
                    </div>
                  </div>

                  <div class="q-mt-sm">
                    <div class="font-mali-sb f14" style="margin-bottom: 5px">
                      <u>เงื่อนไขการใช้งาน</u>
                    </div>
                    <div v-for="(item, index) in data.conditions" :key="index">
                      <div class="row items-top" style="margin-bottom: -2px">
                        <div style="margin-right: 6px">
                          {{ `•  ` }}
                        </div>
                        <div>
                          {{ ` ${item}` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-scroll-area>
            </div>
            <div
              @click="
                state == 'system'
                  ? data.isKeepCode
                    ? null
                    : funcKeepCode()
                  : !data.isDisableCode && !data.isUseCode
                  ? emitValue('useCode')
                  : null
              "
              class="relative-position"
              :class="{
                clickable: data.isKeepCode,
                'cursor-pointer': !data.isDisableCode,
              }"
            >
              <img
                style="max-width: 348px; width: 100%; max-height: 44px; height: 100%"
                :src="`/images/subscribe_payment/${
                  state == 'system'
                    ? data.isKeepCode
                      ? 'blank_keepCodeBtn_long_disable_btn'
                      : 'blank_keepCodeBtn_long_btn'
                    : data.isDisableCode || data.isUseCode
                    ? 'blank_keepCodeBtn_long_disable_btn'
                    : 'blank_keepCodeBtn_long_btn'
                }.png`"
                alt=""
              />

              <div class="absolute-center">
                <div
                  class="f14 font-mali-b textShadow"
                  :class="
                    state == 'system'
                      ? data.isKeepCode
                        ? 'label-disable'
                        : 'textShadow-btn'
                      : data.isDisableCode || data.isUseCode
                      ? 'label-disable'
                      : 'textShadow-btn'
                  "
                >
                  {{ `${state == "system" ? "เก็บ" : "ใช้โค้ดส่วนลด"}` }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute clickable cursor-pointer"
          style="top: 0px; right: 0px"
          @click="emitValue('close')"
        >
          <img src="/images/subscribe_payment/close_dialog.png" alt="" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  isDialogConditionCode: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object,
    default: {},
  },
  level: {
    type: Number,
    default: 1,
  },
  state: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close-dialog", "keepCode", "useCode", "callback-keepCode"]);

const emitValue = (type) => {
  if (type == "close") {
    emit("close-dialog", false);
  } else {
    emit("useCode", props.data);
    emit("close-dialog", false);
  }
};

const funcKeepCode = () => {
  emit("callback-keepCode", props.data);
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

.label-disable {
  color: #ffffff;
  text-shadow: rgb(162, 162, 162) 2px 0px 0px, rgb(162, 162, 162) 1.75517px 0.958851px 0px,
    rgb(162, 162, 162) 1.0806px 1.68294px 0px, rgb(162, 162, 162) 0.141474px 1.99499px 0px,
    rgb(162, 162, 162) -0.832294px 1.81859px 0px,
    rgb(162, 162, 162) -1.60229px 1.19694px 0px,
    rgb(162, 162, 162) -1.97998px 0.28224px 0px,
    rgb(162, 162, 162) -1.87291px -0.701566px 0px,
    rgb(162, 162, 162) -1.30729px -1.5136px 0px,
    rgb(162, 162, 162) -0.421592px -1.95506px 0px,
    rgb(162, 162, 162) 0.567324px -1.91785px 0px,
    rgb(162, 162, 162) 1.41734px -1.41108px 0px,
    rgb(162, 162, 162) 1.92034px -0.558831px 0px;
}
</style>
