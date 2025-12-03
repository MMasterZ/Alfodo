<template>
  <q-dialog v-model="isShowDialogPurchase" persistent>
    <q-card
      style="
        background-color: transparent;
        box-shadow: none;
        display: flex;
        align-items: center;
        justify-content: center;
        max-width: 752px;
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
          max-height: 727px;
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
            max-height: 707px;
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
          <div class="font-mali-b f18">รายละเอียดคำสั่งซื้อ</div>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: flex-start;
              gap: 4px;
              align-self: stretch;
              position: relative;
              overflow: auto;
              height: 100%;
              max-height: 587px;
              max-width: 324px;
              background: #efd080;
              border-radius: 8px;
              padding: 8px 8px 12px 8px;
            "
            class="custom-scroll-container"
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                flex: 1 0 0;
                align-self: stretch;
              "
            >
              <div class="full-width">
                <div
                  style="
                    display: flex;
                    padding: 0px 16px 4px 16px;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    align-self: stretch;
                  "
                >
                  <div class="row justify-between full-width font-mali-m f12">
                    <div>แพ็กเกจการเรียน</div>
                    <div>ราคา</div>
                  </div>
                  <div
                    v-for="(item, index) in bucketData"
                    :key="index"
                    class="row justify-between full-width font-mali-sb f14"
                  >
                    <div>{{ `Level ${item.level}` }}</div>
                    <div>{{ `฿${formatPrice(item.totalPrice)}` }}</div>
                  </div>
                </div>
                <div class="full-width q-my-sm">
                  <div style="height: 2px; width: 100%; background-color: #ac7d05"></div>
                  <div style="height: 2px; width: 100%; background-color: #ffedc4"></div>
                </div>
              </div>
              <div class="full-width">
                <div
                  style="
                    display: flex;
                    padding: 0px 16px 4px 16px;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    align-self: stretch;
                  "
                >
                  <div class="row justify-between full-width font-mali-m f14 q-mb-xs">
                    <div>ยอดรวม</div>
                    <div>{{ `฿${formatPrice(summaryPrice)}` }}</div>
                  </div>
                  <div class="row justify-between full-width font-mali-sb f14">
                    <div>อายุการใช้งาน</div>
                    <div>{{ calcBuyingDate() }}</div>
                  </div>
                </div>
                <div class="full-width q-my-sm">
                  <div style="height: 2px; width: 100%; background-color: #ac7d05"></div>
                  <div style="height: 2px; width: 100%; background-color: #ffedc4"></div>
                </div>
              </div>
              <div
                style="
                  display: flex;
                  padding: 0px 16px 4px 16px;
                  flex-direction: column;
                  align-items: start;
                  gap: 4px;
                  align-self: stretch;
                  border-radius: 10px;
                  position: relative;
                "
              >
                <div class="cont-mali-m f12">โค้ดส่วนลด</div>
                <div
                  class="row items-center"
                  style="width: 100%; max-width: 308px; margin-bottom: 8px"
                >
                  <div
                    style="
                      background-color: #ffffff;
                      width: 100%;
                      height: 32px;
                      border: 1px solid #4a261b;
                      border-radius: 10px;
                      padding: 0px 8px;
                    "
                    class="relative-position row items-center justify-between"
                  >
                    <input
                      v-if="showUserSeletedCode == ''"
                      type="text"
                      class="full-height"
                      style="
                        border-radius: 10px;
                        border: none;
                        border-block: none;
                        outline: none;
                        width: 90%;
                      "
                      placeholder="เลือก/ใส่โค้ดส่วนลด"
                      v-model="showLessCode"
                      @update:model-value="funcGetDemoCode(showLessCode)"
                      debounce="500"
                    />
                    <input
                      v-else
                      type="text"
                      class="full-height"
                      style="
                        border-radius: 10px;
                        border: none;
                        border-block: none;
                        outline: none;
                        width: 90%;
                      "
                      placeholder="เลือก/ใส่โค้ดส่วนลด"
                      v-model="showUserSeletedCode"
                    />
                    <img
                      @click="showLessCode = ''"
                      v-if="showLessCode != '' && filteredCodes.length == 0"
                      src="/images/subscribe_payment/removed_lessCode.png"
                      alt=""
                    />
                    <q-icon
                      v-else
                      :name="isDropDownCode ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                      class="clickable cursor-pointer"
                      @click="openDropdownCode()"
                    />
                  </div>
                  <!-- <div
                    style="
                      max-width: 64px;
                      width: auto;
                      height: 32px;
                      margin-left: -1px;
                      margin-top: -1.1px;
                    "
                    class="clickable cursor-pointer relative-position"
                  >
                    <img src="/images/subscribe_payment/half_code_btn.png" alt="" />
                    <div
                      class="absolute-center font-mali-b f12 full-width text-center textShadow-btn"
                    >
                      ใช้โค้ด
                    </div>
                  </div> -->
                </div>
                <div
                  v-if="isDropDownCode"
                  style="
                    display: flex;
                    max-width: 100%;
                    width: 88.5%;
                    height: 214px;
                    padding: 8px;
                    align-items: flex-start;
                    gap: 4px;
                    border-radius: 10px;
                    border: 1px solid #4a261b;
                    background: #fff;
                    position: absolute;
                    top: 58px;
                    z-index: 2;
                  "
                >
                  <q-scroll-area
                    :visible="true"
                    :vertical-thumb-style="{
                      borderRadius: '99px',
                      background: '#4A261B',
                      opacity: '1',
                      width: '4px',
                      height: '44px',
                    }"
                    class="full-width full-height"
                    style="padding-right: 8px; overflow-y: auto"
                    ref="scrollArea"
                    v-if="!isFindingCode"
                  >
                    <div
                      v-if="filteredCodes.length === 0"
                      class="font-mali-m absolute-center"
                      style="
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        width: 100%;
                        font-size: 12px;
                        color: #4a261b;
                      "
                    >
                      โค้ดส่วนลดไม่ถูกต้องหรือหมดอายุแล้ว
                    </div>
                    <div
                      v-else
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                        flex: 1 0 0;
                        align-self: stretch;
                        margin-bottom: 6px;
                      "
                      :style="`color: ${NormalTextCodeColor(item)};`"
                      v-for="(item, index) in filteredCodes"
                      :key="index"
                    >
                      <div
                        style="
                          display: flex;
                          padding-bottom: 4px;
                          flex-direction: column;
                          align-items: flex-start;
                          align-self: stretch;
                          border-radius: 8px;
                          border: 1px solid #97a3ba;
                          background: #ced6e5;
                          position: relative;
                        "
                      >
                        <div
                          style="
                            display: flex;
                            padding: 4px 6px;
                            justify-content: center;
                            align-items: center;
                            gap: 10px;
                            position: absolute;
                            right: 4px;
                            top: 4px;
                            border-radius: 4px;
                            background: #c9193b;
                          "
                          :style="`background: ${backgroundBarCodetype(item)};`"
                          class="font-mali-b heightlight-text-code-size text-white"
                        >
                          {{
                            item.type == "baht"
                              ? "คูปองเงินสด"
                              : item.type == "demo"
                              ? "ทดลองเรียน"
                              : "โค้ดโปรโมชั่น"
                          }}
                        </div>
                        <div
                          style="
                            display: flex;
                            padding: 6px 12px 4px 12px;
                            align-items: center;
                            gap: 12px;
                            align-self: stretch;
                            border-radius: 8px;
                            background: #fff;
                          "
                        >
                          <div
                            style="
                              display: flex;
                              width: 24px;
                              height: 24px;
                              align-items: center;
                              border-radius: 999px;
                            "
                          >
                            <div
                              style="
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                flex: 1 0 0;
                                align-self: stretch;
                                border-radius: 4px;
                              "
                              @click.stop="item.isDisableCode ? null : useLessCode(item)"
                              class="custom-checkbox"
                              :class="{
                                checked: item.isUseCode,
                                'cursor-pointer': !item.isDisableCode,
                              }"
                            >
                              <img
                                v-show="item.isUseCode"
                                src="/images/subscribe_payment/check_code_icon.png"
                              />
                            </div>
                          </div>
                          <div
                            style="
                              display: flex;
                              flex-direction: column;
                              align-items: flex-start;
                              gap: 2px;
                              flex: 1 0 0;
                            "
                          >
                            <div
                              style="
                                display: flex;
                                padding-top: 4px;
                                flex-direction: column;
                                justify-content: center;
                                align-items: flex-start;
                                align-self: stretch;
                              "
                              class="font-mali-sb f10"
                            >
                              {{ `[${item.code}]` }}
                              <div
                                style="
                                  display: flex;
                                  flex-direction: column;
                                  align-items: flex-start;
                                  align-self: stretch;
                                  line-height: 20px;
                                "
                              >
                                <div v-if="item.type == 'baht'">
                                  ลด
                                  <span class="font-mali-b f12">{{
                                    funcFormatPrice(item.discount)
                                  }}</span>
                                  บาท
                                </div>
                                <div v-if="item.type == 'percent'">
                                  ลด
                                  <span class="font-mali-b f12"
                                    >{{ funcFormatPrice(item.discount) }}%</span
                                  >
                                </div>
                                <div v-if="item.type != 'demo'">
                                  เมื่อซื้อขั้นต่ำ
                                  <span class="font-mali-b f14">{{
                                    funcFormatPrice(item.minPrice)
                                  }}</span>
                                  บาท
                                </div>
                                <div v-else class="font-mali-m f10">
                                  <div>
                                    {{ `ทดลองเรียน 1 เดือน` }}
                                  </div>
                                  <div class="f10">
                                    ในราคา
                                    <span class="f14 font-mali-b">{{
                                      ` ${funcFormatPrice(item.price)} `
                                    }}</span>
                                    บาท
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="row items-center justify-between full-width">
                              <div
                                style="
                                  display: flex;
                                  align-items: flex-end;
                                  gap: 4px;
                                  align-self: stretch;
                                "
                                class="font-mali-sb f10"
                                :style="`color: ${endDateCodeColor(item)};`"
                              >
                                ใช้ได้ถึง {{ item.endDate.fullYear }}
                              </div>
                              <div
                                @click="openDialogConditionCode(item)"
                                class="font-mali-b f12 clickable cursor-pointer"
                                style="text-decoration: underline"
                                :style="`color: #0085ff;`"
                              >
                                เงื่อนไข
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-scroll-area>
                  <div v-if="isFindingCode">
                    <q-inner-loading
                      :showing="true"
                      label-class="brown-9"
                      label-style="font-size: 1.1em"
                    />
                  </div>
                </div>

                <div
                  class="row justify-between full-width font-mali-r f12"
                  style="margin-bottom: 8px"
                  v-if="sumDiscountPercent > 0"
                >
                  <div>ส่วนลดจากโค้ด</div>
                  <div>{{ `-฿${formatPrice(sumDiscountPercent)}` }}</div>
                </div>
                <div
                  class="row justify-between full-width font-mali-r f12"
                  style="margin-bottom: 8px"
                  v-if="sumDiscountBaht > 0"
                >
                  <div>ส่วนลดเพิ่มเติม</div>
                  <div>{{ `-฿${formatPrice(sumDiscountBaht)}` }}</div>
                </div>
                <div class="row justify-between full-width font-mali-b f14">
                  <div>ยอดชำระเงินทั้งหมด</div>
                  <div>{{ `฿${formatPrice(showSumTotalPrice)}` }}</div>
                </div>
                <div class="row full-width font-mali-m f10">
                  <div>ราคารวมภาษีมูลค่าเพิ่มแล้ว</div>
                </div>
              </div>
              <div class="full-width q-my-sm">
                <div style="height: 2px; width: 100%; background-color: #ac7d05"></div>
                <div style="height: 2px; width: 100%; background-color: #ffedc4"></div>
              </div>
              <div
                style="
                  display: flex;
                  padding: 0px 16px;
                  flex-direction: column;
                  align-items: flex-start;
                  align-self: stretch;
                  position: relative;
                  gap: 8px;
                  z-index: 0;
                  width: 100%;
                  max-width: 308px;
                "
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                    flex: 1 0 0;
                  "
                >
                  วิธีการชำระเงิน
                </div>
                <div
                  style="
                    display: flex;
                    padding: 8px 12px;
                    justify-content: space-between;
                    align-items: center;
                    border-radius: 10px;
                    border: 1px solid #4a261b;
                    background: #fff;
                    position: relative;
                    max-width: 100%;
                    width: 100%;
                  "
                >
                  <div style="display: flex; align-items: center; gap: 8px">
                    <div v-if="selectedPayment == null"></div>
                    <div v-else style="display: flex; align-items: center; gap: 8px">
                      <div style="width: 20px; height: 20px">
                        <img :src="selectedPayment.img" alt="" />
                      </div>
                      <div class="font-mali-m f12">
                        {{ selectedPayment.type }}
                      </div>
                    </div>
                  </div>
                  <q-icon
                    :name="isDropDownPayment ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                    class="clickable cursor-pointer"
                    @click="openDropdownPayment()"
                  />
                </div>
                <div
                  v-if="isDropDownPayment"
                  style="
                    display: flex;
                    max-width: 100%;
                    width: 88.5%;
                    height: 84px;
                    align-items: flex-start;
                    flex-direction: column;
                    border-radius: 10px;
                    border: 1px solid #4a261b;
                    background: #fff;
                    position: absolute;
                    top: 71px;
                    z-index: 2;
                    overflow: hidden;
                  "
                >
                  <q-scroll-area class="full-width full-height" ref="scrollPayment">
                    <div
                      style="
                        display: flex;
                        padding: 10px 12px;
                        align-items: center;
                        gap: 10px;
                        align-self: stretch;
                      "
                      :style="`
                          ${
                            item.isSelectPayment
                              ? 'background: #D9D9D9;'
                              : 'background: #ffffff;'
                          }`"
                      v-for="(item, index) in paymentSolutionList"
                      :key="index"
                      @click="selectPayment(item)"
                      :ref="(el) => (paymentRefs[index] = el)"
                    >
                      <img :src="item.img" />
                      <div class="font-mali-m f12">{{ item.type }}</div>
                    </div>
                  </q-scroll-area>
                </div>
              </div>
              <div class="full-width q-my-sm">
                <div style="height: 2px; width: 100%; background-color: #ac7d05"></div>
                <div style="height: 2px; width: 100%; background-color: #ffedc4"></div>
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  padding: 8px 24px 12px 24px;
                  justify-content: center;
                  align-items: flex-start;
                  align-self: stretch;
                  line-height: 150%;
                "
                class="font-mali-m f10 full-width"
              >
                <div>โดยการคลิก “ยืนยัน” ฉันได้อ่านและยอมรับ</div>
                <div>เงื่อนไขการให้บริการ Winner English และ</div>
                <div
                  class="cursor-pointer"
                  style="color: #0094ff; text-decoration-line: underline"
                  @click="isShowDialogTermsAndPolicy = true"
                >
                  นโยบายการคืนเงิน/คืนสินค้า Winner English
                </div>
              </div>
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
                src="/images/subscribe_payment/cancel_purchase_btn.png"
                alt=""
              />
              <div class="f16 font-mali-b textShadow-btn absolute-center">ย้อนกลับ</div>
            </div>
            <!-- emitValue('confirm') -->
            <div
              class="relative-position clickable cursor-pointer"
              @click="funcConfirmPayment()"
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

  <q-dialog v-model="isShowDialogConfirmPayment" maximized persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="
            width: 320px;
            border-radius: 16px;
            border: 2px solid #4a261b;
            background: #f2c043;
            padding: 10px;
          "
        >
          <div
            style="
              padding: 24px 8px 8px 8px;
              border-radius: 8px;
              background: #ffedc4;
              color: #4a261b;
            "
            align="center"
          >
            <div class="font-mali-b f20">ยืนยันคำสั่งซื้อ</div>

            <div
              style="
                margin: 16px 0px;
                padding: 12px 16px;
                border-radius: 8px;
                background: #efd080;
              "
              class="font-mali-m f14"
            >
              <div class="row justify-between q-mb-sm font-mali-b f14">
                <div>แพ็กเกจการเรียน</div>
                <div class="" align="right">
                  {{ `${bucketData.length} ระดับ` }}
                </div>
              </div>

              <div class="row justify-between q-mb-sm">
                <div>ยอดรวม</div>
                <div class="font-mali-m" align="right">
                  {{ `฿${formatPrice(summaryPrice)}.00` }}
                </div>
              </div>

              <div
                style="
                  height: 4px;
                  border-top: 2px solid #ac7d05;
                  background-color: #ffedc4;
                  margin: 8px 0px;
                "
              ></div>

              <div class="row justify-between q-mb-sm">
                <div>ส่วนลดจากโค้ด</div>
                <div class="font-mali-m" align="right">
                  {{ `-฿${formatPrice(sumDiscountPercent)}.00` }}
                </div>
              </div>
              <div class="row justify-between q-mb-sm">
                <div>ส่วนลดเพิ่มเติม</div>
                <div class="font-mali-m" align="right">
                  {{ `-฿${formatPrice(sumDiscountBaht)}.00` }}
                </div>
              </div>
              <div class="row justify-between q-mt-sm font-mali-b">
                <div>ยอดชำระเงินทั้งหมด</div>
                <div align="right">
                  {{ `฿${formatPrice(showSumTotalPrice)}.00` }}
                </div>
              </div>
            </div>

            <div class="row justify-between">
              <div>
                <q-img
                  width="138px"
                  src="/images/subscribe_payment/button-cancel-confirm-payment.webp"
                  no-spinner
                  no-transition
                  class="cursor-pointer"
                  @click="funcCancelPayment()"
                ></q-img>
              </div>
              <div>
                <q-img
                  width="138px"
                  src="/images/subscribe_payment/button-confirm-payment.webp"
                  no-spinner
                  no-transition
                  class="cursor-pointer"
                  @click="emitValue('confirm')"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <dialog-condition-code
    v-model="isDialogConditionCode"
    :data="getDataCodeCondition"
    :state="'user'"
    @useCode="useLessCode"
    @close-dialog="isDialogConditionCode = false"
  ></dialog-condition-code>

  <!-- #region Dialog Terms -->
  <dialog-terms
    :isShowDialogTerms="isShowDialogTermsAndPolicy"
    :type="'refund'"
    @callback-backToPayment="isShowDialogTermsAndPolicy = false"
    :isPayment="true"
  ></dialog-terms>
  <!-- #endregion -->
</template>

<script setup>
import dialogTerms from "components/payments/terms-dialog.vue";
import dialogConditionCode from "components/subscribe_payment/dialog_condition_code.vue";

import { computed, nextTick, onMounted, ref, watch } from "vue";
import axios from "axios";
import { useCourseStore } from "src/stores/course";

const props = defineProps({
  bucketData: {
    type: Array,
    default: [],
  },
  summaryPrice: {
    type: String,
    default: "",
  },
  usingCodeList: {
    type: Array,
    default: [],
  },
  isDialogPurchase: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close-dialog", "onPurchased", "onCondition"]);

const emitValue = (type, item) => {
  // ปิด Dialog
  if (type == "back") {
    emit("close-dialog", false);
    isDropDownCode.value = false;
    isDropDownPayment.value = false;
    showLessCode.value = "";
    showUserSeletedCode.value = "";
    userCodeList.value = userCodeList.value.map((item) => {
      item.isUseCode = false;
      return item;
    });
    userCodeList.value = userCodeList.value.filter((item) => item.type != "demo");
    sortUserCodeList();
  }
  // เปิด Dialog ของเงื่อนไขการใช้โค้ด
  else if (type == "onCondition") {
    emit("onCondition", item);
  }
  // ยืนยันการซื้อ
  else {
    totalPaymentAmount.value = showSumTotalPrice.value;

    let findCoupon = userCodeList.value.filter((val) => val.isUseCode);

    let tempData = {
      payment: selectedPayment.value.payBy,
      price: totalPaymentAmount.value,
      coupons: findCoupon,
    };

    emit("onPurchased", tempData);
  }
};

const funcConfirmPayment = () => {
  isShowDialogPurchase.value = false;
  isShowDialogConfirmPayment.value = true;
};

const funcCancelPayment = () => {
  isShowDialogConfirmPayment.value = false;
  isShowDialogPurchase.value = true;
};

// รายการช่องทางการชำระเงิน
const paymentSolutionList = ref([
  {
    type: "THAI QR PromptPay",
    payBy: "qr",
    img: "/images/subscribe_payment/icon-qrcode.png",
    isSelectPayment: false,
  },
  // {
  //   type: "Credit Card",
  //   payBy: "credit",
  //   img: "/images/subscribe_payment/icon-creditCard.png",
  //   isSelectPayment: false,
  // },
  // {
  //   type: "Credit Card",
  //   img: "/images/subscribe_payment/icon-creditCard.png",
  //   isSelectPayment: false,
  // },
  // {
  //   type: "Credit Card",
  //   img: "/images/subscribe_payment/icon-creditCard.png",
  //   isSelectPayment: false,
  // },
]);

// คูปองส่วนลดจากระบบ admin
const systemCode = ref([
  // {
  //   code: "USERTEST11",
  //   less: "",
  //   maxPrice: "",
  //   minPrice: "",
  //   date: "1 ม.ค. 2025 - 30 ม.ค. 2025",
  //   isNewCode: true,
  //   iskeepCode: true,
  //   isDisableCode: false,
  //   isUseCode: false,
  //   detail: "ทดลองเรียน 1 เดือน",
  //   useCase: ["ซื้อได้ 1 Level เท่านั้น"],
  //   type: "demo",
  //   condition: ["ทดลองเรียน 1 เดือน", "ในราคา 199 บาท"],
  // },
]);

const isShowDialogPurchase = ref(false);
const isShowDialogTermsAndPolicy = ref(false);
const isShowDialogConfirmPayment = ref(false);

const userCodeList = ref([]); //คูปองส่วนลดที่ user เก็บไว้
const totalPaymentAmount = ref("3,240"); // ยอดชำระเงินทั้งหมด

// เปิด dialog ของเงื่อนไขการใช้งานโค้ด
const isDialogConditionCode = ref(false);
const getDataCodeCondition = ref({}); // ข้อมูลโค้ดที่เลือก
const openDialogConditionCode = (item) => {
  isDialogConditionCode.value = true;
  getDataCodeCondition.value = item;
};

// แสดงผลจำนวนวันที่ซื้อคอร์ส
const calcBuyingDate = () => {
  const findBuacketLength = props.bucketData.length;
  if (findBuacketLength == 1) {
    const useSpecialCode = userCodeList.value
      .filter((val) => val.type === "demo")
      .some((val) => val.isUseCode);

    if (useSpecialCode) {
      return "1 เดือน";
    }
    return "6 เดือน";
  } else if (findBuacketLength == 2) {
    return "1 ปี";
  } else if (findBuacketLength == 3) {
    return "1 ปี 6 เดือน";
  } else if (findBuacketLength >= 4) {
    return "2 ปี";
  }
};

const funcFormatPrice = (price) => {
  let text = Number(price);

  return text.toLocaleString();
};

const sumDiscountTotal = ref(0);
const sumDiscountBaht = ref(0);
const sumDiscountPercent = ref(0);
const showSumTotalPrice = computed(() => {
  let sumTotalPrice = 0;

  let minPrice = 0;
  let discountTotal = 0;

  sumDiscountTotal.value = 0;
  sumDiscountBaht.value = 0;
  sumDiscountPercent.value = 0;

  // Discount from user code
  const selectedCodes = userCodeList.value.filter((val) => val.isUseCode);

  // Calculate total price
  sumTotalPrice = props.summaryPrice;

  selectedCodes.forEach((code) => {
    minPrice = code.minPrice;
    minPrice = Number(minPrice);

    if (code.type === "baht") {
      if (minPrice <= props.summaryPrice) {
        let discount = code.discount;

        sumTotalPrice -= discount;

        discountTotal += discount;
        sumDiscountBaht.value = discount;
      }
    }

    if (code.type === "percent") {
      if (minPrice <= props.summaryPrice) {
        let discount = (code.discount / 100) * props.summaryPrice;

        sumTotalPrice -= discount;

        discountTotal += discount;
        sumDiscountPercent.value = discount;
      }
    }

    if (code.type === "demo") {
      sumTotalPrice = code.price;

      sumDiscountPercent.value = props.summaryPrice - code.price;
    }
  });

  sumDiscountTotal.value = discountTotal;

  return sumTotalPrice;
});

// แสดงสีบาร์ตามประเภทของโค้ด
const backgroundBarCodetype = (item) => {
  const selectedCodes = userCodeList.value.filter((val) => val.isUseCode);

  // ❌ If the item is disabled, always show it as gray
  if (item.isDisableCode) {
    return "#CED6E5"; // ❌ Disabled color
  }

  // ✅ If "demo" is selected, disable all other codes
  if (selectedCodes.some((code) => code.type === "demo")) {
    return item.isUseCode ? "#0BAA53" : "#CED6E5"; // ✅ "demo" stays green, others disabled
  }

  // ✅ If nothing is selected, return default colors
  if (selectedCodes.length === 0) {
    return item.type === "baht"
      ? "#0B62D4" // ✅ Blue for "baht"
      : item.type === "percent"
      ? "#c9193b" // ✅ Red for "percent"
      : item.type === "demo"
      ? "#0BAA53" // ✅ Green for "demo"
      : "#CED6E5"; // Default gray
  }

  // ❌ If "baht" is selected first → Disable another "baht" & "demo", but keep "percent" enabled
  if (selectedCodes.length === 1 && selectedCodes[0].type === "baht") {
    return item.type === "baht"
      ? item.isUseCode
        ? "#0B62D4" // ✅ Keep checked "baht"
        : "#CED6E5" // ❌ Disable another "baht"
      : item.type === "demo"
      ? "#CED6E5" // ❌ Disable "demo"
      : "#c9193b"; // ✅ Keep "percent" enabled
  }

  // ❌ If "percent" is selected first → Disable another "percent" & "demo", but keep "baht" enabled
  if (selectedCodes.length === 1 && selectedCodes[0].type === "percent") {
    return item.type === "percent"
      ? item.isUseCode
        ? "#c9193b" // ✅ Keep checked "percent"
        : "#CED6E5" // ❌ Disable another "percent"
      : item.type === "demo"
      ? "#CED6E5" // ❌ Disable "demo"
      : "#0B62D4"; // ✅ Keep "baht" enabled
  }

  // ❌ If "demo" is selected alone → Keep it green, disable everything else
  if (selectedCodes.length === 1 && selectedCodes[0].type === "demo") {
    return item.isUseCode
      ? "#0BAA53" // ✅ Green for "demo"
      : "#CED6E5"; // ❌ Disable others
  }

  // ❌ If "baht" & "percent" are selected together → Disable everything else
  if (selectedCodes.length === 2) {
    return item.isUseCode
      ? item.type === "baht"
        ? "#0B62D4" // ✅ Keep "baht" (blue)
        : item.type === "percent"
        ? "#c9193b" // ✅ Keep "percent" (red)
        : "#0BAA53" // ✅ Keep "demo" (green)
      : "#CED6E5"; // ❌ Disable everything else
  }

  return "#CED6E5"; // Default gray for other cases
};

//แสดงสีวันสิ้นสุดการใช้งานตามประเภทของโค้ด
const endDateCodeColor = (item) => {
  const selectedCodes = userCodeList.value.filter((val) => val.isUseCode);
  const hasBath = selectedCodes.some((code) => code.type === "baht");
  const hasPercent = selectedCodes.some((code) => code.type === "percent");
  const hasSpecial = selectedCodes.some((code) => code.type === "demo");

  // ❌ If the item is disabled, return disabled color immediately
  if (item.isDisableCode) return "#CED6E5";

  // ❌ If "demo" is selected, disable all other codes
  if (hasSpecial) return item.isUseCode ? "#727e96" : "#CED6E5";

  // ✅ Default color if nothing is selected
  if (selectedCodes.length === 0) return "#727e96";

  // ❌ If "baht" is selected → Disable another "baht" & "demo"
  if (hasBath && !hasPercent) {
    if (item.type === "baht" && !item.isUseCode) return "#CED6E5"; // Disable another "baht"
    if (item.type === "demo") return "#CED6E5"; // Disable "demo"
    return "#727e96"; // Enable "percent"
  }

  // ❌ If "percent" is selected → Disable another "percent" & "demo"
  if (hasPercent && !hasBath) {
    if (item.type === "percent" && !item.isUseCode) return "#CED6E5"; // Disable another "percent"
    if (item.type === "demo") return "#CED6E5"; // Disable "demo"
    return "#727e96"; // Enable "baht"
  }

  // ❌ If both "baht" & "percent" are selected → Disable everything else
  if (hasBath && hasPercent) return item.isUseCode ? "#727e96" : "#CED6E5";

  return "#CED6E5"; // Default gray for other cases
};

//แสดงสีข้อความของโค้ด
const NormalTextCodeColor = (item) => {
  const selectedCodes = userCodeList.value.filter((val) => val.isUseCode);
  const hasBath = selectedCodes.some((code) => code.type === "baht");
  const hasPercent = selectedCodes.some((code) => code.type === "percent");
  const hasSpecial = selectedCodes.some((code) => code.type === "demo");

  // ❌ If the item is disabled, return disabled color immediately
  if (item.isDisableCode) return "#97A3BA";

  // ❌ If "demo" is selected, disable all other codes
  if (hasSpecial) return item.isUseCode ? "#4a261b" : "#97A3BA";

  // ✅ If nothing is selected, return default color
  if (selectedCodes.length === 0) return "#4a261b";

  // ❌ If "baht" is selected → Disable another "baht" & "demo"
  if (hasBath && !hasPercent) {
    if (item.type === "baht" && !item.isUseCode) return "#97A3BA"; // Disable another "baht"
    if (item.type === "demo") return "#97A3BA"; // Disable "demo"
    return "#4a261b"; // Enable "percent"
  }

  // ❌ If "percent" is selected → Disable another "percent" & "demo"
  if (hasPercent && !hasBath) {
    if (item.type === "percent" && !item.isUseCode) return "#97A3BA"; // Disable another "percent"
    if (item.type === "demo") return "#97A3BA"; // Disable "demo"
    return "#4a261b"; // Enable "baht"
  }

  // ❌ If both "baht" & "percent" are selected → Disable everything else
  if (hasBath && hasPercent) return item.isUseCode ? "#4a261b" : "#97A3BA";

  return "#97A3BA"; // Default gray for other cases
};

// เปิด dropdown ของโค้ดส่วนลด
const isDropDownCode = ref(false);
const openDropdownCode = () => {
  isDropDownCode.value = !isDropDownCode.value;
  updateDisableStatus();
  if (isDropDownCode.value) {
    scrollToSelected(); // Scroll to the selected code when dropdown is opened
  }
};

// เปิด dropdown ของช่องทางการชำระเงิน
const isDropDownPayment = ref(false);
const openDropdownPayment = () => {
  isDropDownPayment.value = !isDropDownPayment.value;
  if (isDropDownPayment.value) {
    scrollToSelectedPayment(); // Scroll to the selected payment when dropdown is opened
  }
};

// เลือกใช้โค้ดส่วนลด
const scrollArea = ref(null); // สำหรับ scroll ของโค้ดส่วนลด
const showLessCode = ref(""); // โค้ดส่วนลดที่ user พิมพ์
const showUserSeletedCode = ref(""); // โค้ดส่วนลดที่ user เลือก
const useLessCode = (codeData) => {
  if (codeData.isDisableCode) {
    return;
  }

  const selectedCodes = userCodeList.value.filter((item) => item.isUseCode);

  const demoSelected = selectedCodes.filter((item) => item.type === "demo").length;
  if (codeData.type === "demo" && demoSelected >= 1 && !codeData.isUseCode) {
    return;
  }

  const bathSelected = selectedCodes.filter((item) => item.type === "baht").length;
  if (codeData.type === "baht" && bathSelected >= 1 && !codeData.isUseCode) {
    return;
  }

  const percentSelected = selectedCodes.filter((item) => item.type === "percent").length;
  if (codeData.type === "percent" && percentSelected >= 1 && !codeData.isUseCode) {
    return;
  }

  if (codeData.type === "demo" && (bathSelected >= 1 || percentSelected >= 1)) {
    return;
  }

  if (selectedCodes.length >= 2 && !codeData.isUseCode) {
    return;
  }

  // ✅ Toggle selection
  codeData.isUseCode = !codeData.isUseCode;

  updateDisableStatus();

  if (codeData.isUseCode) {
    // ✅ Move checked code to the top
    const index = userCodeList.value.findIndex((item) => item.code === codeData.code);
    if (index !== -1) {
      const newList = userCodeList.value.filter((item) => item.code !== codeData.code);

      if (selectedCodes.length === 1) {
        newList.splice(1, 0, codeData);
      } else {
        newList.unshift(codeData);
      }

      userCodeList.value = [];
      nextTick(() => {
        userCodeList.value = newList;
      });
    }
    // showLessCode.value = "";
    // isDropDownCode.value = false;
  } else {
    if (codeData.type === "demo") {
      const newList = userCodeList.value.filter((item) => item.code != codeData.code);
      newList.push(codeData);

      userCodeList.value = [];
      nextTick(() => {
        userCodeList.value = newList;
      });
      // sortUserCodeList();
    } else {
      // ✅ If only one code remains checked, keep it at the top
      const remainingChecked = userCodeList.value.filter((item) => item.isUseCode);

      if (remainingChecked.length === 1) {
        const lastCheckedCode = remainingChecked[0];

        // Move last checked code to the top
        const newList = userCodeList.value.filter(
          (item) => item.code !== lastCheckedCode.code
        );

        newList.unshift(lastCheckedCode);

        userCodeList.value = [];
        nextTick(() => {
          userCodeList.value = newList;
        });

        // sortUserCodeList();
      } else {
        // ✅ If all are unchecked, revert to sorting
        const lastcode = userCodeList.value[userCodeList.value.length - 1];

        if (lastcode.type == "demo") {
          const newList = userCodeList.value.filter(
            (item) => item.code !== lastcode.code
          );
          newList.push(lastcode);

          userCodeList.value = [];
          nextTick(() => {
            userCodeList.value = newList;
          });
          // sortUserCodeList();
        } else {
          // sortUserCodeList();
        }
      }
    }
  }
  sortUserCodeList();
  scrollToSelected();
};

// อัพเดดสถานะการใช้งานของโค้ดส่วนลด
const updateDisableStatus = () => {
  let selectedCodes = userCodeList.value.filter((item) => item.isUseCode);

  const hasBath = selectedCodes.some((item) => item.type === "baht");
  const hasPercent = selectedCodes.some((item) => item.type === "percent");
  const hasSpecial = selectedCodes.some((item) => item.type === "demo");

  userCodeList.value.forEach((item) => {
    // Reset `isDisableCode` first
    item.isDisableCode = false;

    if (props.summaryPrice < item.minPrice) {
      item.isDisableCode = true;
    }

    // ❌ **Rule 1: If "bucketData" has more than 1 item, disable "demo"**
    if (hasSpecial && item.type === "demo" && !item.isUseCode) {
      item.isDisableCode = true;
    }

    // ❌ **Rule 2: If "baht" is selected, disable other "baht" codes**
    if (hasBath && item.type === "baht" && !item.isUseCode) {
      item.isDisableCode = true;
    }

    // ❌ **Rule 3: If "percent" is selected, disable other "percent" codes**
    if (hasPercent && item.type === "percent" && !item.isUseCode) {
      item.isDisableCode = true;
    }

    // ❌ **Rule 4: If "baht" & "percent" are both selected, disable everything else**
    if (hasBath && hasPercent) {
      if (item.type !== "baht" && item.type !== "percent") {
        item.isDisableCode = true;
      }
    }

    // ❌ **Rule 5: If "demo" is selected, disable all other codes**
    if (hasSpecial) {
      if (item.type === "baht" || item.type === "percent") {
        item.isDisableCode = true;
      }
    }
  });
};

// ค้นหาโค้ดส่วนลด
const validateCodes = () => {
  if (!showLessCode.value.trim()) return; // Exit if empty

  isDropDownCode.value = true;

  const codes = showLessCode.value
    .toUpperCase()
    .split("/")
    .map((code) => code.trim())
    .filter((code) => code); // Remove empty strings

  // Get selected codes
  const selectedCodes = userCodeList.value.filter((item) => item.isUseCode);

  const isBathSelected = selectedCodes.some((item) => item.type === "baht");
  const isPercentSelected = selectedCodes.some((item) => item.type === "percent");
  const isBucketMoreThanOne = props.bucketData.length > 1; // ✅ Check bucket length

  // ✅ Check for a system code match
  const systemCodeMatch = systemCode.value.find(
    (sys) => sys.code.toUpperCase() === codes[0]
  );

  if (systemCodeMatch) {
    const existingSystemCode = userCodeList.value.find(
      (item) => item.code === systemCodeMatch.code
    );

    if (!existingSystemCode) {
      userCodeList.value.push({
        ...systemCodeMatch,
        isUseCode: false, // ❌ User must check manually
        type: "demo",
        isDisableCode: isBathSelected || isPercentSelected || isBucketMoreThanOne,
      });
    } else {
      existingSystemCode.isDisableCode =
        isBathSelected || isPercentSelected || isBucketMoreThanOne;
    }

    // showLessCode.value = ""; // ✅ Clear only when a valid system code is found
    updateDisableStatus();
    return;
  }

  // ✅ Check for a valid normal discount code
  const matchedCode = userCodeList.value.find(
    (item) => item.code.toUpperCase() === codes[0]
  );

  if (matchedCode) {
    matchedCode.isUseCode = false; // ❌ User must check manually
    // showLessCode.value = ""; // ✅ Clear only when a valid code is found
  }

  updateDisableStatus();
};

//แสดงโค้ดส่วนลดใน dropdown
const filteredCodes = computed(() => {
  let temp = [];

  temp = userCodeList.value.filter((item) => {
    let newData = {
      ...item,
    };

    if (props.summaryPrice > item.minPrice) {
      newData.isDisableCode = true;
    }

    if (newData.code) {
      newData.code.toLowerCase().includes(showLessCode.value.toLowerCase());
    }

    return newData;
  });

  let tempUse = temp.filter((item) => {
    if (item.type != "demo") {
      return item.minPrice <= props.summaryPrice;
    }
  });

  tempUse.sort((a, b) => {
    let sortList = ["percent", "baht", "demo"];
    return sortList.indexOf(a.type) - sortList.indexOf(b.type);
  });

  let tempNotUse = temp.filter((item) => item.minPrice > props.summaryPrice);

  tempNotUse.sort((a, b) => {
    let sortList = ["percent", "baht", "demo"];
    return sortList.indexOf(a.type) - sortList.indexOf(b.type) || b.discount - a.discount;
  });

  let tempDemoCode = temp.filter((item) => item.type == "demo");

  temp = [...tempUse, ...tempDemoCode, ...tempNotUse];

  return temp;
});

// เลื่อน scroll โค้ดส่วนลดไปตำแหน่งบนสุด
const scrollToSelected = () => {
  nextTick(() => {
    if (scrollArea.value) {
      // Scroll the q-scroll-area to the very top (0 position)
      scrollArea.value.setScrollPosition("vertical", 0, 300); // Smooth scroll to top (300ms)
    }
  });
};

// เลือกช่องทางการชำระเงิน
const selectedPayment = ref(null); // ช่องทางการชำระเงินที่เลือก
const selectPayment = (selectedItem) => {
  paymentSolutionList.value.forEach((item) => {
    // Set isSelectPayment to true only for the selected item, and false for others
    item.isSelectPayment = item === selectedItem;
  });

  selectedPayment.value = selectedItem;
  isDropDownPayment.value = false;
};

// เลื่อน scroll ช่องทางการชำระเงินไปตำแหน่งที่เลือก
const paymentRefs = ref([]); // อ้างอิง element ของแต่ละช่องทางการชำระเงิน
const scrollPayment = ref(null); // สำหรับ scroll ของช่องทางการชำระเงิน
const scrollToSelectedPayment = () => {
  nextTick(() => {
    const selectedIndex = paymentSolutionList.value.findIndex(
      (item) => item.isSelectPayment
    );
    if (selectedIndex !== -1 && paymentRefs.value[selectedIndex]) {
      const selectedElement = paymentRefs.value[selectedIndex];
      const scrollAreaElement = scrollPayment.value.$el.querySelector(
        ".q-scrollarea__content"
      );

      // Calculate the offset relative to the scroll area content
      const offsetTop = selectedElement.offsetTop - scrollAreaElement.offsetTop;

      // Scroll the q-scroll-area to the desired position
      scrollPayment.value.setScrollPosition("vertical", offsetTop, 300); // 300ms smooth scroll
    }
  });
};

// จัดเรียงโค้ดส่วนลด
const sortUserCodeList = () => {
  const monthMap = {
    "ม.ค.": "01",
    "ก.พ.": "02",
    "มี.ค.": "03",
    "เม.ย.": "04",
    "พ.ค.": "05",
    "มิ.ย.": "06",
    "ก.ค.": "07",
    "ส.ค.": "08",
    "ก.ย.": "09",
    "ต.ค.": "10",
    "พ.ย.": "11",
    "ธ.ค.": "12",
  };

  const extractDate = (dateStr) => {
    if (!dateStr) return new Date(0); // Handle missing date (set to the earliest possible date)

    const parts = dateStr.split(" ");
    if (parts.length !== 3) return new Date(0); // Handle incorrect formats

    const [day, monthText, yearText] = parts;
    const month = monthMap[monthText] || "01"; // Default to January if not found
    const year = `20${yearText.slice(-2)}`; // Convert "25" to "2025"

    return new Date(`${year}-${month}-${day.padStart(2, "0")}`);
  };

  userCodeList.value.sort((a, b) => {
    const startDateA = extractDate(a.dueDate.split("-")[0]);
    const startDateB = extractDate(b.dueDate.split("-")[0]);
    const endDateA = extractDate(a.dueDate.split("-")[1]);
    const endDateB = extractDate(b.dueDate.split("-")[1]);

    // 1️⃣ Sort by start date (earliest first)
    if (startDateA - startDateB !== 0) return startDateA - startDateB;

    // 2️⃣ If start dates are the same, sort by end date (earliest first)
    if (endDateA - endDateB !== 0) return endDateA - endDateB;

    // 3️⃣ If dates are the same, sort by discount amount (highest first)
    return parseFloat(b.discount) - parseFloat(a.discount);
  });
};

const formatPrice = (price) => {
  let total = price;

  return total.toLocaleString();
};

const isFindingCode = ref(false);
const funcGetDemoCode = async (code) => {
  const courseStore = useCourseStore();

  if (courseStore.list.length > 0 || props.bucketData.length > 1) {
    return;
  }

  isFindingCode.value = true;

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getDemoCode?code=${code}`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let temp = response.data.data;

    temp.map((x) => {
      x.isNewCode = true;
      x.iskeepCode = true;
      x.isUseCode = false;
      x.isDisableCode = false;
      return x;
    });

    let findDemoCode = userCodeList.value.find((item) => item.code === temp[0].code);

    if (!findDemoCode) {
      userCodeList.value.push(...temp);
    }

    updateDisableStatus();

    isFindingCode.value = false;
  } catch (e) {
    isFindingCode.value = false;
    // console.log(e);
  }
};

onMounted(() => {
  selectedPayment.value = paymentSolutionList.value[0];
  paymentSolutionList.value[0].isSelectPayment = true;
  userCodeList.value = [...props.usingCodeList];

  userCodeList.value = userCodeList.value.filter((item) => !item.isUseCode);

  sortUserCodeList(); // ✅ Sort the list on mount

  userCodeList.value.forEach((item) => {
    item.isUseCode = false;
  });

  isShowDialogPurchase.value = props.isDialogPurchase; // ✅ Show the purchase dialog on mount
});

// ตรวจสอบการเปลี่ยนแปลงของโค้ดส่วนลด
// watch(props.usingCodeList, (newValue) => {
//   if (newValue && newValue.length > 0) {
//     userCodeList.value = [...newValue]; // Clone new values
//     sortUserCodeList(); // ✅ Sort again when new codes arrive
//   }
// });

// ตรวจสอบการเปลี่ยนแปลงของโค้ดส่วนลดที่ user พิมพ์
watch(showLessCode, (newValue) => {
  showLessCode.value = newValue.toUpperCase(); // Convert input to uppercase
  validateCodes(); // Validate the input field dynamically
});

// เคลียร์โค้ดส่วนลดที่ user เลือก เมื่อ dropdown ถูกเปิด
watch(isDropDownCode, (newValue) => {
  if (newValue) {
    showUserSeletedCode.value = "";
  } else {
    showUserSeletedCode.value = userCodeList.value
      .filter((item) => item.isUseCode)
      .map((item) => `${item.code}`) // Wrap each code in square brackets
      .join(""); // Join without spaces
  }
});
</script>

<style lang="scss" scoped>
.clickable {
  transition: transform 0.2s ease;
}

.clickable:active {
  transform: scale(0.95); /* Simulate the push effect by shrinking the button */
}
// to custom checkBox animation with DropDown Code-------------------
.custom-checkbox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: 1px solid #97a3ba;
  border-radius: 4px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.custom-checkbox.checked {
  background-color: #51b43d;
  border-color: #51b43d;
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

.heightlight-text-code-size {
  font-size: 10px;

  @media screen and (max-width: 480px) {
    font-size: 8px;
  }
}

.custom-scroll-container {
  overflow: overlay;
}

/* Custom Scrollbar Style */
.custom-scroll-container ::-webkit-scrollbar {
  width: 3px; /* Width of the scrollbar */
}

.custom-scroll-container ::-webkit-scrollbar-track {
  background: transparent; /* Hide the track */
}

.custom-scroll-container ::-webkit-scrollbar-thumb {
  background-color: #4a261b; /* Thumb color */
  border-radius: 8px; /* Rounded thumb */
}

.custom-scroll-container ::-webkit-scrollbar-thumb:hover {
  background-color: #6c3928; /* Thumb color on hover */
}

/* For Firefox */
.custom-scroll-container {
  scrollbar-width: none; /* Make the scrollbar thin */
  // scrollbar-color: #4a261b transparent; /* Thumb color and transparent track */
  -ms-overflow-style: none; /* สำหรับ IE */
  scrollbar-color: transparent transparent; /* For Firefox */
}
</style>
