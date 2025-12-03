<template>
  <q-dialog maximized persistent v-model="isDialogShowPurchased">
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
        position: relative;
        padding: 16px;
      "
    >
      <div
        style="
          display: flex;
          max-width: 360px;
          min-width: 328px;
          width: 100%;
          padding: 8px;
          border-radius: 16px;
          border: 2px solid #4a261b;
          background: #f2c043;
        "
      >
        <div
          style="
            padding: 16px 8px 8px 8px;
            align-items: center;
            gap: 8px;
            align-self: stretch;
            border-radius: 12px;
            background: #ffedc4;
            color: #4a261b;
            width: 100%;
          "
        >
          <div class="font-mali-b f20 q-pb-md" align="center">
            {{ isCompletePurchased ? "ชำระเงินเสร็จสิ้น" : "ข้อมูลการชำระเงิน" }}
          </div>

          <!-- #region Body Qr-code -->
          <div
            v-if="paymentBy === 'qr' && !isShowCreditCard"
            style="
              display: flex;
              padding: 14px 16px;
              flex-direction: column;
              align-items: center;
              gap: 12px;
              align-self: stretch;
              max-width: 324px;
              background: #efd080;
              border-radius: 8px;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
                align-self: stretch;
              "
            >
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  align-self: stretch;
                "
              >
                <div class="font-mali-b f14">ยอดชำระเงินทั้งหมด</div>
                <div class="font-mali-b f16">{{ `฿ ${formatPrice(amount)}` }}</div>
              </div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  align-self: stretch;
                "
                class="fint-mali-sb f14"
              >
                <div>ชำระภายใน</div>
                <div>
                  {{
                    `${currentDate.day}/${currentDate.month + 1}/${
                      currentDate.year
                    } | ${formatExpireDateQrCode()}`
                  }}
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                width: 180px;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
              "
            >
              <img :src="qrcodeImage" alt="" />
            </div>
            <div class="font-mali-b f12">
              <span class="font-mali-m">ชื่อบัญชี :</span> WINNERENGLISH
            </div>
            <div class="font-mali-sb f14">{{ `Reference No. ${referenceNo}` }}</div>
            <div style="display: flex; align-items: center; gap: 10px">
              <img
                style="width: 13px; height: 13px"
                src="/images/subscribe_payment/icon _download.png"
                alt=""
                class="clickable cursor-pointer"
              />
              <div
                style="text-decoration: underline"
                class="f14 font-mali-sb"
                @click="funcDownloadImage()"
              >
                บันทึกภาพ
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Body Credit Card -->
          <div
            v-if="paymentBy !== 'qr' && !isShowCreditCard"
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
              background: #efd080;
            "
            class="custom-scroll custom-scroll-container font-mali-m f12"
          >
            <div
              style="
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                gap: 8px;
                align-self: stretch;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: flex-start;
                  gap: 4px;
                  flex: 1 0 0;
                "
              >
                <div class="q-pl-xs">ข้อมูลบัตรเครดิต/เดบิต</div>
                <div
                  style="height: 32px; background-color: #ffffff"
                  class="full-width"
                  :class="validateCardNumber ? 'validate-error' : 'validate-none'"
                >
                  <q-input
                    dense
                    v-model="creditcardData.cardNumber"
                    borderless
                    placeholder="กรอกรหัสบัตร"
                    input-style=" width:100%; max-width:300px; height:30px; padding-left:10px;padding-right:10px;border-radius:10px;"
                    mask="#### #### #### ####"
                    @update:modelValue="
                      () => {
                        creditcardData.cardNumber.length >= 19
                          ? (validateCardNumber = false)
                          : null;
                      }
                    "
                  />
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: flex-end;
                gap: 8px;
                align-self: stretch;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: flex-start;
                  gap: 4px;
                  flex: 1 0 0;
                "
              >
                <div class="q-pl-xs">valid thru</div>
                <div
                  style="height: 32px; background-color: #ffffff"
                  class="full-width"
                  :class="validateCardExpiry ? 'validate-error' : 'validate-none'"
                >
                  <q-input
                    dense
                    v-model="creditcardData.validThru"
                    borderless
                    placeholder="ดด/ปป"
                    input-style="background-color:#ffffff; width:100%; max-width:146px; height:30px; border-radius:10px; padding-left:10px;padding-right:10px"
                    mask="##/##"
                    @update:modelValue="
                      () => {
                        creditcardData.validThru.length > 4
                          ? (validateCardExpiry = false)
                          : null;
                      }
                    "
                  />
                </div>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: flex-start;
                  gap: 4px;
                  flex: 1 0 0;
                "
              >
                <div class="q-pl-xs">CVV/CVC</div>
                <div
                  style="height: 32px; background-color: #ffffff"
                  class="full-width"
                  :class="validateCardCvv ? 'validate-error' : 'validate-none'"
                >
                  <q-input
                    dense
                    v-model="creditcardData.cvv"
                    borderless
                    input-style="background-color:#ffffff; width:100%; max-width:146px; height:30px; border-radius:10px;padding-left:10px;padding-right:30px;position:relative"
                    @update:modelValue="
                      () => {
                        creditcardData.cvv.length >= 3 ? (validateCardCvv = false) : null;
                      }
                    "
                    mask="###"
                  >
                    <div style="right: 10px; top: 4px; position: absolute">
                      <q-img
                        src="/images/subscribe_payment/icon_Question_Circle.png"
                        style="width: 14px; height: 14px; cursor: pointer"
                      />
                    </div>
                  </q-input>
                </div>
              </div>
            </div>
            <div
              style="
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
                gap: 8px;
                align-self: stretch;
                padding-bottom: 16px;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: flex-end;
                  align-items: flex-start;
                  gap: 4px;
                  flex: 1 0 0;
                "
              >
                <div class="q-pl-xs">ชื่อเจ้าของบัตร</div>
                <div
                  style="height: 32px; background-color: #ffffff"
                  class="full-width"
                  :class="validateCardOwner ? 'validate-error' : 'validate-none'"
                >
                  <q-input
                    dense
                    v-model="creditcardData.cardOwner"
                    borderless
                    placeholder="กรอกชื่อเจ้าของบัตร"
                    input-style="background-color:#ffffff; width:100%; max-width:300px; height:30px; border-radius:10px;padding-left:10px;padding-right:10px"
                    @update:modelValue="
                      () => {
                        creditcardData.cardOwner.length > 0
                          ? (validateCardOwner = false)
                          : null;
                      }
                    "
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="isShowCreditCard"
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
            :style="{ background: isPurchaseding ? '#ffedc4' : '#efd080' }"
            class="custom-scroll custom-scroll-container font-mali-m f12"
          >
            <div
              v-if="!isPurchaseding && !isCompletePurchased"
              class="full-width text-center"
            >
              <div
                align="center"
                class="relative-position"
                style="width: 250px; height: 140px; margin: auto"
              >
                <q-img src="/images/box_main/box-master-card.webp" alt=""></q-img>
                <div
                  class="absolute-center fit row items-end q-pa-md f12 font-mali-m text-white"
                >
                  <div>
                    <div class="f10 text-grey-7" align="left">Card number</div>
                    <div align="left">
                      {{ funcFormatCreditCard(creditcardData.cardNumber) }}
                    </div>
                  </div>
                  <div class="row justify-between items-center full-width">
                    <div>
                      <div class="f10 text-grey-7" align="left">Cardholder name</div>
                      <div align="left">
                        {{ creditcardData.cardOwner }}
                      </div>
                    </div>
                    <div>
                      <div class="f10 text-grey-7" align="right">valid thru.</div>
                      <div align="right">
                        {{ creditcardData.validThru }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="font-mali-b f14 row items-center justify-between"
                style="margin-top: 12px"
              >
                <div>ยอดชำระเงินทั้งหมด</div>
                <div>{{ `฿ ${formatPrice(amount)}` }}</div>
              </div>
            </div>
            <div
              v-if="isPurchaseding && !isCompletePurchased"
              class="full-width text-center"
            >
              <q-spinner
                size="3em"
                style="width: 80px; height: 80px; color: #a0ca0e; margin-bottom: 12px"
              />
              <div class="font-mali-m f16">
                <div>รอดำเนินการชำระเงิน...</div>
              </div>
            </div>
            <div
              v-if="isCompletePurchased && isPurchaseding"
              class="full-width text-center"
            >
              <img
                style="width: 80px; height: 80px; margin-bottom: 12px"
                src="/images/subscribe_payment/completed_purchased.png"
                alt=""
              />

              <div class="font-mali-m f16">ขอบคุณที่เลือกเรียนกับ</div>
              <div class="font-mali-m f16">Winner English</div>
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
                  margin-top: 16px;
                "
              >
                <img
                  style="width: 13px; height: 13px"
                  src="/images/subscribe_payment/icon _download.png"
                  alt=""
                  class="clickable cursor-pointer"
                />
                <div style="text-decoration: underline" class="f14 font-mali-sb">
                  บันทึกใบเสร็จ
                </div>
              </div>
            </div>
            <!-- <div v-if="isError" class="full-width text-center">
              <img
                style="width: 80px; height: 80px; margin-bottom: 12px"
                src="/images/subscribe_payment/error_purchased.png"
                alt=""
              />

              <div class="font-mali-m f16">เกิดข้อผิดพลาด</div>
              <div class="font-mali-m f16">กรุณาลองใหม่อีกครั้ง</div>
            </div> -->
          </div>
          <!-- #endregion -->

          <!-- <div class="font-mali-m f14" style="color: #4a261b" id="countdown"></div> -->
          <!-- #region แสดงผลหมดอายุ/แจ้งเตือน -->
          <div
            style="
              width: 100%;
              padding: 16px;
              border-radius: 10px;
              background: #efd080;
              color: #4a261b;
            "
            align="center"
            class="q-mt-sm"
          >
            <span class="font-mali-m">{{ "ระยะเวลาคงเหลือ " }} </span>
            <span class="font-mali-b f14" id="countdown"></span>
          </div>

          <div align="center" class="f14 font-mali-m q-my-sm" style="color: #ff2c2c">
            กรุณาอย่าปิดหน้านี้หลังชำระเงิน <br />
            ระบบจะใช้เวลาตรวจสอบภายใน 1–2 นาที
          </div>
          <!-- #endregion -->

          <!-- #region Footer -->
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
              v-if="isPurchaseding && !isCompletePurchased"
              class="relative-position clickable cursor-pointer"
              @click="cancelPurchased()"
            >
              <img
                style="width: 100%; max-width: 166px; height: 43px"
                src="/images/subscribe_payment/blank_removeCourse_btn.png"
                alt=""
              />
              <div
                class="f14 font-mali-b full-width text-center textShadow-btn absolute-center"
              >
                ยกเลิกการชำระเงิน
              </div>
            </div>
            <div
              v-if="!isPurchaseding"
              class="relative-position clickable cursor-pointer"
              @click="emitValue('back')"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/cancel_purchase_btn.png"
                alt=""
              />
              <div class="f14 font-mali-b textShadow-btn absolute-center">ย้อนกลับ</div>
            </div>
            <div
              v-if="paymentBy !== 'qr' && !isPurchaseding"
              class="relative-position clickable cursor-pointer"
              @click="confirmCredirCard()"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/confirm_purchase_btn.png"
                alt=""
              />

              <div class="f16 font-mali-b textShadow-btn absolute-center">ยืนยัน</div>
            </div>
            <div
              v-if="isCompletePurchased"
              class="relative-position clickable cursor-pointer"
              @click="emitValue('complete')"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/confirm_purchase_btn.png"
                alt=""
              />

              <div class="f14 font-mali-b textShadow-btn absolute-center">เริ่มเรียน</div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
    </q-card>
  </q-dialog>

  <q-dialog v-model="isCancelPurchased" persistent>
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
            gap: 16px;
            align-self: stretch;
            border-radius: 12px;
            background: #ffedc4;
          "
        >
          <div class="font-mali-b f20" style="line-height: 24px">ยกเลิกการชำระเงิน</div>
          <div class="font-mali-m f14" style="line-height: 18px">
            ยืนยันยกเลิกการชำระเงินรายการนี้
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
              @click="isCancelPurchased = false"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/cancel_purchase_btn.png"
                alt=""
              />
              <div class="f14 font-mali-b textShadow-btn absolute-center">ย้อนกลับ</div>
            </div>
            <div
              class="relative-position clickable cursor-pointer"
              @click="emitValue('back')"
            >
              <img
                style="width: 100%; max-width: 142px; height: 48px"
                src="/images/subscribe_payment/confirm_purchase_btn.png"
                alt=""
              />

              <div class="f14 font-mali-b textShadow-btn absolute-center">ยืนยัน</div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>

  <!-- #region Dialog Iframe Payment -->
  <q-dialog maximized v-model="isShowDialogIframePayment" class="z-max" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="bg-white relative-position" style="width: 400px; height: 600px">
          <iframe
            :src="linkPayment"
            frameborder="0"
            style="width: 100%; height: 100%"
          ></iframe>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <q-dialog maximized v-model="isShowDialogPaymentInProgress" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="
            width: 360px;
            padding: 10px;
            border-radius: 16px;
            border: 2px solid #4a261b;
            background: #f2c043;
          "
        >
          <div
            style="
              border-radius: 8px;
              background: #ffedc4;
              padding: 24px 8px 8px 8px;
              color: #4a261b;
            "
            align="center"
          >
            <div class="font-mali-b f24">ข้อมูลการชำระเงิน</div>
            <div style="margin: 16px 0px">
              <q-spinner color="light-green-7" size="100px" />
            </div>
            <div class="font-mali-m f16">รอดำเนินการชำระเงิน...</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog maximized v-model="isShowDialogErrorPayment" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="
            width: 320px;
            padding: 10px;
            border-radius: 16px;
            border: 2px solid #4a261b;
            background: #f2c043;
          "
        >
          <div
            style="
              padding: 32px 8px 16px 8px;
              border-radius: 8px;
              background: #ffedc4;
              color: #4a261b;
            "
            align="center"
          >
            <div class="font-mali-b f20">เกิดข้อผิดพลาด</div>
            <div style="margin: 16px 0px">
              <q-img
                width="80px"
                src="/images/subscribe_payment/error_purchased.png"
                no-spinner
                no-transition
                style="margin: 8px 0px"
              ></q-img>
            </div>
            <div class="font-mali-m f16">
              เกิดข้อผิดพลาด <br />
              กรุณาลองใหม่อีกครั้ง
            </div>
            <div style="margin-top: 16px">
              <q-img
                style="margin-top: 8px"
                width="120px"
                class="cursor-pointer"
                src="/images/subscribe_payment/button-back.webp"
                no-spinner
                no-transition
                v-close-popup
                @click="funcBackToPayment()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import axios from "axios";
import { useQuasar } from "quasar";
import { db } from "src/router";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const $q = useQuasar();

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  paymentBy: {
    type: String,
    default: "",
  },
  amount: {
    type: String,
    default: "",
  },
  courseList: {
    type: Array,
    default: () => [],
  },
  coupons: {
    type: Array,
    default: () => [],
  },
  isError: {
    type: Boolean,
    default: false,
  },
});

let cancelToken = axios.CancelToken;
let source = null;

const isDialogShowPurchased = ref(true);
const isShowDialogPaymentInProgress = ref(false);
const isShowDialogErrorPayment = ref(false);

const emit = defineEmits(["close-dialog", "timeout", "cancel-purchased", "complete"]);

const emitValue = (type) => {
  if (type === "back") {
    isPurchaseding.value = false;
    isCancelPurchased.value = false;
    isShowCreditCard.value = false;
    isCompletePurchased.value = false;
    emit("close-dialog", false); // Close the dialog via v-model
  }
  if (type === "complete") {
    isPurchaseding.value = false;
    isCancelPurchased.value = false;
    isShowCreditCard.value = false;
    isCompletePurchased.value = false;
    emit("complete", false); // Close the dialog via v-model
  }
};

const funcBackToPayment = () => {
  funcResetCreditCardData();

  isDialogShowPurchased.value = true;
  // isShowCreditCard.value = false;
};

const validateCardNumber = ref(false);
const validateCardExpiry = ref(false);
const validateCardCvv = ref(false);
const validateCardOwner = ref(false);

const creditcardData = ref({
  cardNumber: "",
  validThru: "",
  cvv: "",
  cardOwner: "",
});

const isShowCreditCard = ref(false);
const isPurchaseding = ref(false);
const isCompletePurchased = ref(false);

const confirmCredirCard = () => {
  if (creditcardData.value.cardNumber.length != 19) {
    validateCardNumber.value = true;
  }

  if (creditcardData.value.validThru.length < 5) {
    validateCardExpiry.value = true;
  }

  if (creditcardData.value.cvv.length != 3) {
    validateCardCvv.value = true;
  }

  if (creditcardData.value.cardOwner.length == "") {
    validateCardOwner.value = true;
  }

  if (
    validateCardNumber.value ||
    validateCardExpiry.value ||
    validateCardCvv.value ||
    validateCardOwner.value
  ) {
    return;
  }

  validateCardNumber.value = false;
  validateCardExpiry.value = false;
  validateCardCvv.value = false;
  validateCardOwner.value = false;

  if (isShowCreditCard.value) {
    funcChargeByToken();
    return;
  }

  funcPaymentMethodCreditCard();

  // if (isShowCreditCard.value == false) {
  //   isShowCreditCard.value = true;
  // } else {
  //   isCancelPurchased.value = false;
  //   isPurchaseding.value = true;

  //   setTimeout(() => {
  //     isCompletePurchased.value = true;
  //   }, 3000);
  // }
};

let creditCardToken = ref("");
const funcPaymentMethodCreditCard = async () => {
  $q.loading.show();

  let tokenParameters = {
    name: creditcardData.value.cardOwner,
    number: creditcardData.value.cardNumber.replace(/\s/g, ""),
    expiration_month: creditcardData.value.validThru.split("/")[0],
    expiration_year: creditcardData.value.validThru.split("/")[1],
    security_code: creditcardData.value.cvv,
  };

  Omise.setPublicKey(process.env.OMISE_PUBLIC_KEY);

  await Omise.createToken("card", tokenParameters, function (statusCode, response) {
    // console.log("statusCode: ", statusCode);
    // console.log("response: ", response);

    if (statusCode != 200) {
      funcError(response);
      $q.loading.hide();
      // isShowLoading.value = false;
      isShowCreditCard.value = false;
      return;
    }

    creditCardToken.value = response.id;
    // console.log("response.id: ", response.id);

    isShowCreditCard.value = true;
    // isShowLoading.value = false;
    $q.loading.hide();
  });
};

const isShowDialogIframePayment = ref(false);
const linkPayment = ref("");
const funcChargeByToken = async () => {
  const studentStore = useStudentStore();

  isDialogShowPurchased.value = false;

  isShowDialogPaymentInProgress.value = true;

  try {
    let APIURL = `${process.env.NEWAPI}/payment-chargeByToken`;

    let POSTDATA = {
      tokenId: creditCardToken.value,
      amount: props.amount * 100,
      studentId: studentStore.studentId,
      // package: packageData.value.type,
    };

    let response = await axios.post(APIURL, POSTDATA);

    if (response.data.message != "success") {
      throw new Error("error");
    }

    linkPayment.value = response.data.charge.authorize_uri;

    chargeId.value = response.data.charge.id;

    isShowDialogPaymentInProgress.value = false;

    isShowCreditCard.value = false;

    // window.open(linkPayment.value, "_blank");

    isShowDialogIframePayment.value = true;

    funcResetCreditCardData();
    funcListenPaymentMethod();
  } catch (e) {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    isShowDialogPaymentInProgress.value = false;

    isDialogShowPurchased.value = true;
  }
};

const funcResetCreditCardData = () => {
  creditcardData.value = {
    cardNumber: "",
    cardOwner: "",
    validThru: "",
    cvv: "",
  };
  // isHasCreditCard.value = false;
};

const isCancelPurchased = ref(false);
const cancelPurchased = () => {
  isCancelPurchased.value = true;
  isCompletePurchased.value = false;
};

const countdown = ref(10); // เวลาที่นับถอยหลังเริ่มต้น (10 วินาที)
const isCounting = ref(false); // เพื่อปิดการใช้งานปุ่มระหว่างการนับถอยหลัง
let timer = null; // ตัวแปรเก็บ ID ของ interval

// เริ่มต้นการนับถอยหลัง
const startCountdown = () => {
  if (isCounting.value) return;
  isCounting.value = true;
  countdown.value = 10;

  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(timer);
      isCounting.value = false;
      emit("timeout");
    }
  }, 1000);
};

// หยุดการนับถอยหลังเมื่อ dialog ปิด
const stopCountdown = () => {
  clearInterval(timer);
  isCounting.value = false;
};

const funcFormatCreditCard = (card) => {
  let text = card.replace(/\s/g, "");

  text = `${text.slice(0, 4)}********${text.slice(-4)}`;

  return text;
};

const funcDownloadImage = () => {
  const imageUrl = qrcodeImage.value; // URL ของรูปภาพที่ต้องการดาวน์โหลด

  const link = document.createElement("a");

  link.href = imageUrl;
  link.download = imageUrl.split("/").pop(); // ชื่อไฟล์จะถูกตั้งตามชื่อของไฟล์จาก URL
  link.click();
};

const qrcodeImage = ref("");
const chargeId = ref("");
const referenceNo = ref("");
let minutes = null;
let seconds = null;
const currentDate = ref("");
const funcPaymentMethodQrcode = async () => {
  // console.clear();
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();

  currentDate.value = systemStore.datetime;

  isDialogShowPurchased.value = false;

  source = cancelToken.source();

  $q.loading.show();

  try {
    let APIURL = `${process.env.NEWAPI}/payment-createSource`;

    let POSTDATA = {
      amount: props.amount * 100,
    };

    let response = await axios.post(APIURL, POSTDATA);

    let message = response.data.message;

    if (message != "success") {
      throw response.data.error;
    }

    POSTDATA = {
      sourceId: response.data.source.id,
      amount: response.data.source.amount,
      package: "",
      studentId: studentStore.studentId,
      courseList: props.courseList,
      paymentBy: props.paymentBy,
      coupons: props.coupons,
    };

    APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/payment-charge`;

    response = await axios.post(APIURL, POSTDATA, {
      cancelToken: source.token,
    });

    message = response.data.message;

    if (message == "error") {
      throw response.data.error;
    }

    isDialogShowPurchased.value = true;

    qrcodeImage.value = response.data.source.scannable_code.image.download_uri;
    referenceNo.value = response.data.source.provider_references.reference_number_1;
    chargeId.value = response.data.id;

    // minutes = 0;
    minutes = response.data.minutes;
    // console.log("minutes: ", minutes);
    // minutes = 0;
    // seconds = 5;
    seconds = response.data.seconds;
    // console.log("seconds: ", seconds);
    // seconds = 10;

    $q.loading.hide();

    setTimeout(() => {
      funcTimeoutPayment();
    }, 300);
    1;

    funcListenPaymentMethod();
  } catch (e) {
    console.log("error: ", e);

    if (listenPayment != null) {
      listenPayment();
      listenPayment = null;
    }

    if (interval != null) {
      clearInterval(interval);
      interval = null;
    }

    funcError(e);

    $q.loading.hide();
  }
};

let listenPayment = null;
const funcListenPaymentMethod = async () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  try {
    listenPayment = await db
      .collection("charge")
      .where("chargeId", "==", chargeId.value)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach(async (doc) => {
          let data = doc.data();
          if (data.body.data.status == "successful") {
            $q.loading.show();

            studentStore.getStudentData();

            funcClearSnapshotAndIntervalTime();

            setTimeout(() => {
              $q.loading.hide();
              emit("finish");
            }, 500);
          } else {
            if (props.paymentBy === "qr") {
              funcTimeoutPayment();
            }

            // emit("error");
          }
        });
      });
  } catch (e) {
    funcClearSnapshotAndIntervalTime();
  }
};

const funcSavePackageCodeUses = async () => {
  const studentStore = useStudentStore();
  db.collection("packageCodeLog").add({
    // packageCode: currentCode.value,
    studentId: studentStore.studentId,
    // isCodeForNewUser: isCodeForNewUser.value,
    // discountForCouponCode: discountForCouponCode.value,
    createdAt: ts,
  });
};

const funcClearSnapshotAndIntervalTime = () => {
  if (listenPayment != null) {
    listenPayment();
    listenPayment = null;
    // console.log("Clear Success Listen");
  }

  if (interval != null) {
    clearInterval(interval);
    interval = null;
    // console.log("Clear Success Interval");
  }
};

let interval = null;
const funcTimeoutPayment = () => {
  if (interval != null) {
    return;
  }

  const countdown = document.getElementById("countdown");
  countdown.innerHTML = ` ${minutes}:${seconds}`;

  let remainingSeconds = minutes * 60 + seconds;

  interval = setInterval(() => {
    let minutesDisplay = Math.floor(remainingSeconds / 60);
    let secondsDisplay = remainingSeconds % 60;

    secondsDisplay = secondsDisplay < 10 ? "0" + secondsDisplay : secondsDisplay;

    minutesDisplay = minutesDisplay < 10 ? "0" + minutesDisplay : minutesDisplay;

    countdown.innerHTML = ` ${minutesDisplay}:${secondsDisplay}`;
    remainingSeconds--;

    if (remainingSeconds < 0) {
      countdown.innerHTML = " 00:00";
      if (source) {
        source.cancel("cancel");
      }
      // isShowDialogPaymentMethodQrCode.value = false;
      // isShowDialogExpiredQrCode.value = true;
      funcClearSnapshotAndIntervalTime();
      emit("timeout");
    }
  }, 1000);

  // isShowLoading.value = false;
  $q.loading.hide();
};

const formatExpireDateQrCode = () => {
  let expireDate = "00:00 น.";

  let hours = 0;
  let minutes = 0;

  hours = currentDate.value.hours;
  minutes = currentDate.value.minutes;

  if (currentDate.value + 15 >= 60) {
    minutes = 0;
    hours += 1;
  } else {
    minutes += 15;
  }

  hours = hours < 9 ? "0" + hours : hours >= 24 ? "00" : hours;
  minutes = minutes < 9 ? "0" + minutes : minutes;

  expireDate = `${hours}:${minutes} น.`;

  return expireDate;
};

const formatPrice = (price) => {
  let total = price;
  return total.toLocaleString();
};

const funcError = (error) => {
  let errorCode = error.code;

  // console.log("errorCode: ", errorCode);

  switch (errorCode) {
    case "backend_error":
      break;
    case "bad_request":
      break;
    case "brand_not_supported":
      break;
    case "documents_locked":
      break;
    case "expired_charge":
      validateCardExpiry.value = true;
      break;
    case "failed_capture":
      break;
    case "failed_expire":
      validateCardExpiry.value = true;
      break;
    case "failed_fraud_check":
      break;
    case "failed_multi_currency":
      break;
    case "failed_refund":
      break;
    case "failed_reverse":
      break;
    case "failed_void":
      break;
    case "feature_not_supported":
      break;
    case "invalid_amount":
      break;
    case "invalid_bank_account":
      break;
    case "invalid_card":
      validateCardNumber.value = true;
      break;
    case "invalid_card_token":
      break;
    case "invalid_charge":
      break;
    case "invalid_dispute":
      break;
    case "invalid_domain":
      break;
    case "invalid_file_type":
      break;
    case "invalid_link":
      break;
    case "invalid_recipient":
      break;
    case "invalid_token":
      break;
    case "invalid_transfer":
      break;
    case "missing_card":
      validateCardNumber.value = true;
      break;
    case "missing_file":
      break;
    case "used_token":
      break;
    case "authentication_failure":
      break;
    case "key_expired_error":
      break;
    case "locked_account_error":
      break;
    case "not_authorized":
      break;
    case "not_found":
      validateCardNumber.value = true;
      break;
    case "serializer_not_found":
      break;
    case "service_not_found":
      break;
    case "failed_deletion":
      break;
    case "invalid_filter":
      break;
    case "invalid_page":
      break;
    case "invalid_per_page":
      break;
    case "invalid_scope":
      break;
    case "too_many_requests":
      break;
    case "internal_error":
      break;
    case "search_unavailable":
      break;
    default:
      break;
  }
};

// ใช้ watch เพื่อตรวจสอบสถานะของ dialog
// watch(
//   () => props.modelValue,
//   async (newVal) => {
//     if (newVal && props.paymentBy === "qr") {
//       await nextTick(); // Wait for the DOM to render

//       funcPaymentMethodQrcode();

//       // startCountdown(); // Start countdown when dialog opens
//     } else {
//       stopCountdown(); // Stop countdown when dialog closes
//     }
//   }
// );

onMounted(() => {
  isCompletePurchased.value = false;
  qrcodeImage.value = "";
  chargeId.value = "";
  minutes = null;
  seconds = null;
  interval = null;

  validateCardNumber.value = false;
  validateCardExpiry.value = false;
  validateCardCvv.value = false;
  validateCardOwner.value = false;

  creditcardData.value = {
    cardNumber: "",
    validThru: "",
    cvv: "",
    cardOwner: "",
  };

  if (props.paymentBy === "qr") {
    funcPaymentMethodQrcode();
  }
});

onUnmounted(() => {
  stopCountdown(); // ทำความสะอาด timer เมื่อคอมโพเนนต์ถูกทำลาย
});
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

.validate-none {
  border: 1px solid #4a261b;
  border-radius: 10px;
}

.validate-error {
  border: 1px solid #ff0000;
  border-radius: 10px;
}
</style>
