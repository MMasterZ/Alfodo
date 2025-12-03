<template>
  <!-- #region Dialog เลือกแพ็กเกจเมนู -->
  <q-dialog maximized v-model="isShowDialogPackageMenu" persistent no-shake class="z-max">
    <q-card class="transparent shadow-0" id="box-package-menu">
      <q-card-section class="fit row justify-center items-center no-padding">
        <!-- #region Desktop -->
        <div
          class="relative-position row justify-center items-center"
          align="center"
          style="
            container-type: inline-size;
            box-sizing: border-box;
            max-width: 1600px;
            width: 100%;
            min-width: 100px;
            min-height: 900px;
            max-height: fit-content;
          "
          v-if="$q.platform.is.desktop"
        >
          <div class="box-new-payment-container relative-position">
            <div class="sub-new-payment" align="center">
              <div class="font-mali-b f20">
                <span>เลือกสมัคร/ต่ออายุแพ็กเกจ</span>
              </div>
              <div style="padding: 16px 0px" class="font-mali-m f14" align="center">
                <span>
                  *ทดสอบวัดระดับภาษา (Placement Test) สำหรับผู้สมัครเรียนครั้งแรก*
                </span>
              </div>

              <div class="content-new-payment">
                <div class="row justify-center items-center">
                  <!-- <div class="col relative-position">
                    <q-img
                      src="/images/box_main/box-package.png"
                      no-transition=""
                      no-spinner
                      width="320px"
                    ></q-img>
                    <div class="absolute-bottom" style="bottom: 16px">
                      <q-img
                        width="120px"
                        class="cursor-pointer"
                        src="/images/button_main/button-choose.png"
                        @click="
                          funcSelectedPackage({
                            packageTitle: '12 months',
                            discountPrice: 1290,
                            type: '12months',
                          })
                        "
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div> -->
                  <div class="col relative-position">
                    <q-img
                      src="/images/payments_main/payment-package-1-month.webp"
                      no-transition=""
                      no-spinner
                      width="320px"
                    ></q-img>
                    <div class="absolute-bottom" style="bottom: 25px">
                      <q-img
                        width="120px"
                        class="cursor-pointer"
                        src="/images/button_main/button-choose.png"
                        @click="
                          funcSelectedPackage({
                            packageTitle: '1 month',
                            discountPrice: 290,
                            type: '1month',
                          })
                        "
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div>

                  <!-- #region Redeem Code -->
                  <!-- <div class="col relative-position">
                    <q-img
                      src="/images/box_main/box-redeem.png"
                      no-transition=""
                      no-spinner
                      width="320px"
                    ></q-img>

                    <div class="absolute-bottom" style="bottom: 16px">
                      <q-img
                        width="120px"
                        class="cursor-pointer"
                        src="/images/button_main/button-choose.png"
                        @click="
                          funcSelectedPackage({
                            packageTitle: 'แพ็กเกจ Redeem',
                            discountPrice: 0,
                            type: 'package-redeem-code',
                          })
                        "
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div> -->
                  <!-- #endregion -->
                </div>

                <div class="row justify-center" align="center" style="padding-top: 17px">
                  <span
                    class="text-link f14 font-mali-sb cursor-pointer"
                    @click="funcShowDialogTermsAndPolicy('terms')"
                    >เงื่อนไขและข้อตกลงในการใช้บริการ</span
                  >
                  <q-separator
                    vertical
                    class="q-mx-md"
                    style="background-color: #0085ff"
                  ></q-separator>
                  <span
                    class="text-link f14 font-mali-sb cursor-pointer"
                    @click="funcShowDialogTermsAndPolicy('policy')"
                    >นโยบายความเป็นส่วนตัว</span
                  >
                </div>
              </div>
            </div>

            <q-btn
              flat
              class="absolute-top-right"
              round
              style="top: -15px; right: -15px"
              @click="funcCloseAllDialog()"
            >
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Mobile -->
        <div
          v-if="!$q.platform.is.desktop"
          class="box-new-payment-container-mobile relative-position"
        >
          <div class="sub-new-payment-mobile relative-position" align="center">
            <div class="f20 font-mali-b">แพ็กเกจการเรียน</div>
            <div class="font-mali-m f12" style="margin: 8px 0px; line-height: 20px">
              *ทดสอบวัดระดับภาษา (Placement Test)<br />
              สำหรับผู้สมัครเรียนครั้งแรก*
            </div>

            <div
              class="content-new-payment-mobile relative-position"
              align="center"
              v-touch-swipe="funcHandleSwipe"
            >
              <!-- #region แพ็คเกจชั่วคร่าว -->
              <div class="box-package-content" v-if="selectedCarouselPackage == 0">
                <div class="relative-position fit animate__animated animate__fadeIn">
                  <q-img
                    src="/images/payments_main/payment-package-1-month.webp"
                    fit="contain"
                    no-spinner
                    no-transition
                  ></q-img>
                  <div class="absolute-bottom" style="bottom: 20px">
                    <q-img
                      width="95px"
                      class="cursor-pointer"
                      src="/images/button_main/button-choose.png"
                      @click="
                        funcSelectedPackage({
                          packageTitle: '1 month',
                          discountPrice: 290,
                          type: '1month',
                        })
                      "
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Package 12 month -->
              <div
                class="absolute-center box-package-content"
                v-if="selectedCarouselPackage == 0 && false"
              >
                <div class="relative-position fit animate__animated animate__fadeIn">
                  <q-img
                    width="289px"
                    src="/images/box_main/box-package-mobile.webp"
                    fit="contain"
                    no-spinner
                    no-transition
                    class="absolute-top"
                  ></q-img>
                  <div class="absolute-bottom" style="bottom: 16px">
                    <q-img
                      width="120px"
                      class="cursor-pointer"
                      src="/images/button_main/button-choose.png"
                      @click="
                        funcSelectedPackage({
                          packageTitle: '12 months',
                          discountPrice: 1290,
                          type: '12months',
                        })
                      "
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
              <!-- #region Redeem Code -->
              <div
                class="absolute-center box-package-content"
                v-if="selectedCarouselPackage == 1 && false"
              >
                <div class="relative-position fit animate__animated animate__fadeIn">
                  <q-img
                    width="289px"
                    src="/images/box_main/box-redeem-mobile.webp"
                    fit="contain"
                    no-spinner
                    no-transition
                    class="absolute-top"
                  ></q-img>
                  <div class="absolute-bottom" style="bottom: 16px">
                    <q-img
                      width="120px"
                      class="cursor-pointer"
                      src="/images/button_main/button-choose.png"
                      @click="
                        funcSelectedPackage({
                          packageTitle: 'แพ็กเกจ Redeem',
                          discountPrice: 0,
                          type: 'package-redeem-code',
                        })
                      "
                      no-transition
                      no-spinner
                    ></q-img>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region Carousel -->
            <div class="box-carousel-main row justify-center" align="center" v-if="false">
              <div
                class="button-circle-carousel"
                :class="selectedCarouselPackage == 0 ? 'active' : ''"
                @click="selectedCarouselPackage = 0"
              ></div>
              <div
                class="button-circle-carousel"
                :class="selectedCarouselPackage == 1 ? 'active' : ''"
                @click="selectedCarouselPackage = 1"
              ></div>
            </div>
            <!-- #endregion -->

            <div
              align="center"
              class="text-link f12 font-mali-sb"
              style="line-height: 20px; margin-top: 12px"
            >
              <div class="cursor-pointer" @click="funcShowDialogTermsAndPolicy('terms')">
                ข้อกำหนดการใช้บริการ
              </div>
              <div
                class="cursor-pointer"
                style="margin-top: 4px"
                @click="funcShowDialogTermsAndPolicy('policy')"
              >
                นโยบายความเป็นส่วนตัว
              </div>
            </div>
          </div>

          <!-- Button Close Dialog -->
          <q-btn
            flat
            class="absolute-top-right"
            round
            style="top: -15px; right: -15px"
            @click="funcCloseAllDialog()"
          >
            <q-img src="/images/icon_main/icon-close.png"></q-img>
          </q-btn>
        </div>
        <!-- #endregion -->
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Payment Details -->
  <q-dialog
    maximized
    v-model="isShowDialogPayment"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-payment-method">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="center"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div class="box-payment-container relative-position" style="width: 320px">
            <div class="box-payment-sub" align="left">
              <div align="center">
                <span class="font-mali-b f20">ยืนยันการชำระเงิน</span>
              </div>
              <div class="box-payment-details payment-details-header">
                <div class="font-mali-m">
                  <div align="center">
                    <span class="font-mali-b f16"> รายการคำสั่งซื้อ </span>
                  </div>
                  <div class="q-mt-md">
                    <div>
                      <span class="f16 font-mali-m">{{ packageData.name }}</span>
                    </div>
                  </div>
                  <div class="row q-mt-xs f12 font-mali-m">
                    <div class="col">
                      <span class="">ราคาแพ็กเกจ</span>
                    </div>
                    <div class="col" align="right">
                      {{ `฿ ${funcFormatPrice(packageData.price)}` }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="box-payment-details payment-details-body font-mali-m">
                <div class="q-py-xs">
                  <div>
                    <span class="font-mali-m f12"> คูปองส่วนลด </span>
                  </div>
                  <div class="q-mt-xs row full-width">
                    <div
                      class="col self-center q-pr-sm"
                      style="width: 100%; height: 40px"
                    >
                      <div v-if="!isHasCouponCode">
                        <q-input
                          dense
                          borderless
                          class="f14 box-input-register"
                          v-model="couponCode"
                          placeholder="ระบุคูปองส่วนลด (ถ้ามี)"
                          :input-style="
                            couponCode.length == 0
                              ? 'font-size:12px;padding-bottom: 19px'
                              : 'font-size:12px;padding-bottom: 19px;'
                          "
                        >
                          <template v-slot:append>
                            <div style="padding-bottom: 17px" v-if="couponCode.length">
                              <q-icon
                                class="cursor-pointer"
                                size="14px"
                                color="red"
                                name="fas fa-times-circle"
                                @click="(couponCode = ''), (discountForCouponCode = 0)"
                              />
                            </div>
                          </template>
                        </q-input>
                      </div>

                      <div
                        class="row f12 q-pa-xs"
                        style="height: 40px"
                        v-if="isHasCouponCode"
                      >
                        {{ couponCode }}
                      </div>
                    </div>

                    <div class="col-1 width-fit" align="right">
                      <q-img
                        width="60px"
                        class="cursor-pointer"
                        src="/images/button_main/button-set-code.png"
                        @click="funcCheckCouponCode()"
                        no-transition
                        no-spinner
                        v-if="!isHasCouponCode"
                      ></q-img>
                      <q-img
                        v-if="isHasCouponCode"
                        width="60px"
                        class="cursor-pointer"
                        src="/images/button_main/button-edit-code.png"
                        @click="funcResetCouponCode()"
                        no-transition
                        no-spinner
                      ></q-img>
                    </div>
                  </div>
                  <div class="row f12 q-mt-sm font-mali-m">
                    <div class="col">
                      <span class="">ราคาแพ็กเกจ</span>
                    </div>
                    <div class="col" align="right">
                      {{ `฿ ${funcFormatPrice(packageData.price)}` }}
                    </div>
                  </div>
                  <div class="row q-mt-xs f12 font-mali-m">
                    <div class="col">
                      <span>ส่วนลดจากคูปอง</span>
                    </div>
                    <div class="col-1" style="width: fit-content" align="right">
                      {{
                        `${discountForCouponCode ? "฿ " + discountForCouponCode : "-"}`
                      }}
                    </div>
                  </div>
                  <div class="row q-mt-md f14 font-mali-b">
                    <div class="col self-center">
                      <span class="">ยอดชำระเงินทั้งหมด</span>
                    </div>
                    <div
                      class="col-1 f16 self-center"
                      style="width: fit-content"
                      align="right"
                    >
                      {{ `฿ ${funcFormatPrice(sumTotalPrice)}` }}
                    </div>
                  </div>
                  <div class="q-mb-sm">
                    <span class="font-mali-m f10"> ราคารวมภาษีมูลค่าเพิ่มแล้ว </span>
                  </div>
                </div>
              </div>

              <div class="box-payment-details payment-details-footer">
                <div class="q-px-xs q-mt-xs font-mali-m f10">
                  <div>
                    โดยการคลิก “ยืนยัน” ฉันได้อ่านและยอมรับ
                    <br />
                    เงื่อนไขการให้บริการ Winner English และ
                  </div>
                  <div
                    class="text-link cursor-pointer"
                    style="color: #0094ff"
                    @click="funcShowDialogTermsAndPolicy('refund')"
                  >
                    นโยบายการคืนเงิน/คืนสินค้า Winner English
                  </div>
                </div>
              </div>

              <div class="q-mt-md q-mb-lg">
                <div>
                  <span class="f12 font-mali-m">วิธีการชำระเงิน</span>
                </div>
                <div
                  class="q-mt-sm box-input-register relative-position"
                  style="padding: 0px"
                >
                  <div class="fit q-px-sm">
                    <div class="row cursor-pointer fit">
                      <div class="self-center" style="width: 20px">
                        <q-img
                          :src="`/images/icon_main/${showPaymentMethodDetails.icon}.png`"
                          width="20px"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                      <div
                        class="self-center f12 font-mali-m q-mx-sm"
                        style="color: #4a261b"
                      >
                        {{ showPaymentMethodDetails.label }}
                      </div>
                      <q-space></q-space>
                      <div class="self-center width-fit">
                        <div style="margin-top: -2px">
                          <q-icon size="15px" name="fas fa-caret-down"></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                  <q-menu
                    square
                    fit
                    auto-close
                    class="shadow-1 z-max"
                    :offset="[0, -0]"
                    style="height: fit-content"
                  >
                    <q-list class="font-mali-m f12">
                      <q-item
                        clickable
                        v-ripple
                        v-for="(itemMethod, indexMethod) in paymentMethodOptions"
                        :key="indexMethod"
                        @click="selectePaymentMethod = itemMethod.value"
                      >
                        <q-item-section>
                          <div class="row full-width">
                            <div class="self-center" style="width: 20px">
                              <q-img
                                :src="`/images/icon_main/${itemMethod.icon}.png`"
                                width="20px"
                                no-spinner
                                no-transition
                              ></q-img>
                            </div>
                            <div
                              class="self-center f12 font-mali-m q-mx-sm"
                              style="color: #4a261b"
                            >
                              {{ itemMethod.label }}
                            </div>
                          </div>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </div>
              </div>

              <div class="q-mt-md q-py-xs row">
                <div class="col" align="center">
                  <q-img
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-previous.png"
                    @click="funcBackToPackage()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col" align="center">
                  <q-img
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-confirm-short-th.png"
                    @click="funcSelectedPaymentMethod()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>

            <!-- Button Close Dialog -->
            <q-btn
              v-if="isShowBtnClose"
              class="absolute-top-right"
              round
              style="top: -15px; right: -15px"
              @click="funcCloseAllDialog()"
            >
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Payment Qr-code -->
  <q-dialog maximized v-model="isShowDialogPaymentMethodQrCode" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-payment-container relative-position">
          <div class="box-payment-sub">
            <div class="q-my-sm" align="center">
              <span class="font-mali-b f20">ข้อมูลการชำระเงิน</span>
            </div>

            <div
              class="box-payment-details"
              style="padding: 10px; border-radius: 10px"
              align="center"
            >
              <div style="width: 180px">
                <img id="winner-qrcode" :src="qrcodeImage" alt="" />
              </div>
              <div class="q-mt-sm" align="center">
                <div align="center" class="col-12 q-mb-md f12">
                  <span class="font-mali-m"> {{ `ชื่อบัญชี : ` }} </span>
                  <span class="font-mali-b">WINNERENGLISH</span>
                </div>
                <!-- <div class="row width-fit cursor-pointer justify-center">
                  <div class="self-center q-px-sm">
                    <q-icon size="15px" name="fas fa-download"></q-icon>
                  </div>
                  <div
                    class="self-end q-pt-xs font-mali-b f14"
                    @click="funcSaveQrCodeImage()"
                  >
                    <u>บันทึกภาพ</u>
                  </div>
                </div> -->
                <div class="row q-pa-xs q-mt-md justify-between">
                  <div class="self-center">
                    <span class="font-mali-b f14"> ยอดชำระเงินทั้งหมด </span>
                  </div>
                  <div class="self-center font-mali-b f16">
                    {{ `฿ ${funcFormatPrice(sumTotalPrice)}` }}
                  </div>
                </div>
              </div>
            </div>
            <div class="q-mt-md" align="center">
              <span class="font-mali-m f14"
                >ชำระภายในเวลา : <span id="countdown"></span> น.</span
              >
            </div>
            <div class="q-mt-md q-mb-xs" align="center">
              <q-img
                width="120px"
                src="/images/button_main/button-cancel-th.png"
                class="cursor-pointer"
                @click="funcCancelQrcode()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Expired QR Code -->
  <q-dialog maximized v-model="isShowDialogExpiredQrCode" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-payment-container relative-position" style="width: 290px">
          <div class="box-payment-sub" align="center">
            <div class="f20 font-mali-b q-py-xs q-mt-md">
              <span>QR หมดอายุ</span>
            </div>
            <div class="q-pa-sm q-pb-md">
              <span class="f14 font-mali-m">กรุณาสร้าง QR รับเงินใหม่อีกครั้ง</span>
            </div>
            <div class="row justify-between q-pb-sm q-px-xs">
              <div class="col" align="left">
                <q-img
                  width="120px"
                  class="cursor-pointer"
                  @click="funcCancelQrcode()"
                  src="/images/button_main/button-cancel-th.png"
                ></q-img>
              </div>
              <div class="col" align="right">
                <q-img
                  width="120px"
                  class="cursor-pointer"
                  src="/images/button_main/button-confirm-short-th.png"
                  @click="funcCreateQrcode()"
                ></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Payment Credit card -->
  <q-dialog
    maximized
    v-model="isShowDialogPaymentMethodCreditCard"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-payment-method-credit-card">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="center"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div class="box-payment-container relative-position" align="left">
            <div class="box-payment-sub">
              <div align="center">
                <span class="font-mali-b f20">ข้อมูลการชำระเงิน</span>
              </div>

              <!-- Form Credit Card -->
              <div
                class="box-payment-details font-mali-m"
                v-if="!isHasCreditCard"
                style="margin-top: 16px"
              >
                <div>
                  <span class="f12">ข้อมูลบัตรเครดิต</span>
                </div>
                <div class="q-mt-xs" style="height: 60px">
                  <q-input
                    dense
                    borderless
                    class="f14 box-input-register"
                    v-model="creditcardData.number"
                    placeholder="กรอกรหัสบัตร"
                    input-style="font-size:12px;padding-bottom: 19px;"
                    :class="{
                      'box-input-register-error': isValidateCreditCardNumber,
                    }"
                    @update:model-value="isValidateCreditCardNumber = false"
                    mask="#### #### #### ####"
                  >
                  </q-input>

                  <div
                    v-if="isValidateCreditCardNumber"
                    class="animate__animated animate__fadeInDown"
                  >
                    <div class="q-ml-xs" style="margin-top: -10px">
                      <span style="font-size: 9px" class="text-red"
                        >กรุณากรอกหมายเลขบัตรให้ถูกต้อง</span
                      >
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col q-pr-xs">
                    <div class="">
                      <span class="f12">valid thru</span>
                    </div>
                    <div class="q-mt-xs" style="height: 55px">
                      <q-input
                        dense
                        borderless
                        class="f14 box-input-register"
                        v-model="creditcardData.expiry"
                        placeholder="ดด/ปป"
                        :input-style="
                          creditcardData.expiry.length == 0
                            ? 'font-size:12px;padding-bottom: 19px'
                            : 'font-size:12px;padding-bottom: 19px;'
                        "
                        :class="{
                          'box-input-register-error': isValidateCreditCardExpiry,
                        }"
                        @update:model-value="isValidateCreditCardExpiry = false"
                        mask="##/##"
                      >
                      </q-input>

                      <div
                        v-if="isValidateCreditCardExpiry"
                        class="animate__animated animate__fadeInDown"
                      >
                        <div class="q-ml-xs" style="margin-top: -10px">
                          <span style="font-size: 9px" class="text-red"
                            >กรุณากรอกวันหมดอายุ</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col q-pl-xs">
                    <div class="">
                      <span class="f12">CVV</span>
                    </div>
                    <div class="q-mt-xs" style="height: 55px">
                      <q-input
                        dense
                        borderless
                        class="f14 box-input-register"
                        v-model="creditcardData.securityCode"
                        placeholder=""
                        :input-style="
                          creditcardData.securityCode.length == 0
                            ? 'font-size:12px;padding-bottom: 19px'
                            : 'font-size:12px;padding-bottom: 19px;'
                        "
                        :class="{
                          'box-input-register-error': isValidateCreditCardSecurityCode,
                        }"
                        @update:model-value="isValidateCreditCardSecurityCode = false"
                        mask="###"
                        type="password"
                        :error="isValidateCreditCardSecurityCode"
                        no-error-icon
                      >
                        <template v-slot:append>
                          <div
                            class="relative-position"
                            style="margin-top: -17px; margin-right: -5px"
                          >
                            <q-btn round size="5px" flat>
                              <q-icon
                                size="15px"
                                style="color: #646464"
                                name="far fa-question-circle"
                                class="cursor-pointer"
                              >
                                <q-menu
                                  class="z-max transparent shadow-0"
                                  :offset="[165, 0]"
                                >
                                  <div>
                                    <q-img
                                      width="180px"
                                      src="/images/dialog_main/dialog-cvv-cvc-info.png"
                                      no-spinner
                                      no-transition
                                    ></q-img>
                                  </div>
                                </q-menu>
                              </q-icon>
                            </q-btn>
                          </div>
                        </template>
                      </q-input>

                      <div
                        v-if="isValidateCreditCardSecurityCode"
                        class="animate__animated animate__fadeInDown"
                      >
                        <div class="q-ml-xs" style="margin-top: -10px">
                          <span style="font-size: 9px" class="text-red"
                            >กรุณากรอกรหัส CVV</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-mt-xs">
                  <span class="f12">ชื่อเจ้าของบัตร</span>
                </div>

                <div class="q-mt-xs" style="height: 50px">
                  <q-input
                    dense
                    borderless
                    class="f14 box-input-register"
                    v-model="creditcardData.name"
                    placeholder="กรอกชื่อเจ้าของบัตร"
                    :input-style="
                      creditcardData.name.length == 0
                        ? 'font-size:12px;padding-bottom: 19px'
                        : 'font-size:12px;padding-bottom: 19px;'
                    "
                    :class="{
                      'box-input-register-error': isValidateCreditCardName,
                    }"
                    @update:model-value="isValidateCreditCardName = false"
                  >
                  </q-input>

                  <div
                    v-if="isValidateCreditCardName"
                    class="animate__animated animate__fadeInDown"
                  >
                    <div class="q-ml-xs" style="margin-top: -10px">
                      <span style="font-size: 9px" class="text-red"
                        >กรุณากรอกชื่อผู้ถือบัตร</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Show Credit Card -->
              <div class="box-payment-details" v-else align="left">
                <div>
                  <q-img
                    src="/images/box_main/box-master-credit-card.png"
                    no-spinner
                    no-transition
                  >
                    <div class="fit no-padding transparent">
                      <div class="q-mt-md q-pa-sm">
                        <div class="f12" style="font-size: 10px; color: #707070">
                          Card number
                        </div>
                        <div class="f12">
                          {{ funcFormatCreditCardNumber(creditcardData.number) }}
                        </div>
                      </div>
                      <div class="absolute-bottom row q-pa-sm q-pb-md">
                        <div class="col">
                          <div class="f12" style="font-size: 10px; color: #707070">
                            Cardholder name
                          </div>
                          <div class="f12">{{ creditcardData.name }}</div>
                        </div>
                        <div class="col-1" style="width: fit-content" align="right">
                          <div class="f12" style="font-size: 10px; color: #707070">
                            valid thru.
                          </div>
                          <div class="f12">{{ creditcardData.expiry }}</div>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>

                <div>
                  <div class="row q-mt-md q-mb-sm f14 font-mali-m">
                    <div class="col self-center">
                      <span class="font-mali-b">ยอดชำระเงินทั้งหมด</span>
                    </div>
                    <div
                      class="col-1 f16 self-center font-mali-b"
                      style="width: fit-content"
                      align="right"
                    >
                      {{ `฿ ${funcFormatPrice(sumTotalPrice)}` }}
                    </div>
                  </div>
                </div>
              </div>

              <div class="row q-mt-md">
                <div align="center" class="col q-pr-xs">
                  <q-img
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-previous.png"
                    @click="funcBackToPaymentMethod()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div align="center" class="col q-pl-xs">
                  <q-img
                    v-if="!isHasCreditCard"
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-next-th.png"
                    @click="funcCheckCreditCard()"
                    no-spinner
                    no-transition
                  ></q-img>

                  <q-img
                    v-if="isHasCreditCard"
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-confirm-short-th.png"
                    @click="funcChargeByToken()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>

            <!-- Button Close Dialog -->
            <q-btn
              v-if="isShowBtnClose"
              class="absolute-top-right"
              round
              flat
              style="top: -15px; right: -15px"
              @click="funcCloseAllDialog()"
            >
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Payment Other -->
  <q-dialog
    maximized
    v-model="isShowDialogPaymentMethodOther"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-payment-method-other">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="center"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div class="relative-position">
            <div class="box-payment-container relative-position" style="width: 320px">
              <div class="box-payment-sub" style="padding: 10px !important" align="left">
                <div class="q-my-sm q-mt-md q-pb-xs row justify-center" align="center">
                  <div class="self-center">
                    <span class="font-mali-b f20">ข้อมูลการชำระเงิน</span>
                  </div>
                </div>

                <div class="box-payment-details payment-details-header font-mali-m">
                  <div align="center" class="font-mali-b f16 q-mt-xs">
                    โอนเงินที่บัญชี
                  </div>
                  <div class="row q-mt-md">
                    <div class="col-2 width-fit self-center q-px-xs" align="left">
                      <q-img
                        width="48px"
                        src="/images/icon_main/icon-name-bank-scb.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                    <div class="col self-center f12 q-pl-xs relative-position">
                      <div class="q-my-xs font-mali-b f12">ธนาคารไทยพาณิชย์</div>
                      <div class="font-mali-m">
                        บริษัท เอ็ดดูเทค อินโนเวชั่น จำกัด
                        <div class="q-my-xs row relative-position">
                          <div class="">
                            เลขที่บัญชี:
                            <span class="font-mali-b">173-2-49795-1</span>
                          </div>
                          <div class="q-px-sm self-end">
                            <q-icon
                              name="fas fa-copy"
                              class="cursor-pointer"
                              @click="funcCopyToClipboard('1732497951')"
                              size="17px"
                              style="margin-top: -5px"
                            ></q-icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row font-mali-b q-px-xs q-mt-md">
                    <div class="col self-center f14">ยอดชำระเงินทั้งหมด</div>
                    <div class="col-auto self-center f16">
                      {{ `฿ ${funcFormatPrice(sumTotalPrice)}` }}
                    </div>
                  </div>
                  <div class="font-mali-m q-my-xs q-mb-sm f10">
                    {{ `*กรุณาบันทึกเลขที่บัญชีเพื่อโอนชำระเงินได้ถูกต้อง` }}
                  </div>
                  <div class="font-mali-m f10" align="center">
                    <q-img
                      width="130px"
                      src="/images/button_main/button-how-to-payment.png"
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      @click="funcShowDialogHowToPayment()"
                    ></q-img>
                  </div>
                </div>
                <div
                  class="box-payment-details payment-details-footer font-mali-m"
                  align="center"
                >
                  <div align="center" class="font-mali-b f16 q-py-xs">
                    ช่องทางการแจ้งชำระ
                  </div>

                  <div class="q-mt-md" align="center">
                    <q-img
                      width="250px"
                      src="/images/button_main/button-contact-facebook.png"
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      @click="funcOpenFacebook()"
                    ></q-img>
                  </div>
                  <div class="q-mt-md q-pb-sm" align="center">
                    <q-img
                      width="250px"
                      src="/images/button_main/button-contact-line.png"
                      no-spinner
                      no-transition
                      class="cursor-pointer"
                      @click="funcOpenLine()"
                    ></q-img>
                  </div>
                </div>

                <div class="q-mt-md row" align="center">
                  <div align="center" class="col">
                    <q-img
                      width="100%"
                      src="/images/button_main/button-back-to-package-detail-th.png"
                      class="cursor-pointer"
                      @click="funcCloseDialogOther()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog How to Payment -->
  <q-dialog maximized v-model="isShowDialogHowToPayment" persistent class="z-max">
    <q-card class="transparent shadow-0" style="">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-payment-container relative-position" style="width: 320px">
          <div class="box-payment-sub" style="padding: 10px; background-color: #ffedc4">
            <div class="q-py-md row justify-center" align="center">
              <span class="font-mali-b f18"> วิธีการแจ้งชำระ</span>
            </div>

            <div class="box-payment-details" style="padding: 1px 5px">
              <div class="font-mali-m f14">
                <ul style="list-style-type: decimal; padding-left: 25px">
                  <li style="line-height: 2">
                    ถ่ายรูปหรือบันทึกภาพสลิปไว้เป็น <br />หลักฐาน
                    เมื่อทำการโอนเงินชำระเงิน <br />ค่าแพ็กเกจ เพื่อส่งหลักฐานยืนยัน
                    <br />กับแอดมิน
                  </li>
                  <li style="line-height: 2">
                    ส่งภาพหลักฐานการชำระเงินให้กับ <br />แอดมินทาง Facebook: Winner
                    English เรียนภาษาอังกฤษออนไลน์ หรือทาง <br />LINE Official:
                    @winnerenglish <br />โดยแจ้งชื่อ username และเวลาที่ทำ
                    <br />การชำระเงินค่าแพ็กเกจการเรียน
                  </li>
                  <li style="line-height: 2">
                    รอแอดมินตรวจสอบและดำเนินการยืนยันยอดชำระภายใน 48 ชม.
                  </li>
                  <li style="line-height: 2">
                    เข้าใช้งานโปรแกรม Winner English <br />
                    ได้ทันทีภายหลังแอดมินตรวจสอบและ <br />ยืนยันเสร็จสิ้น
                  </li>
                </ul>
              </div>
            </div>
            <div class="q-mt-md" align="center">
              <q-img
                width="120px"
                class="cursor-pointer"
                src="/images/button_main/button-confirm-short-th.png"
                v-close-popup
              ></q-img>
            </div>
          </div>

          <!-- Button Close Dialog -->
          <!-- <q-btn
            v-if="isShowBtnClose"
            class="absolute-top-right"
            round
            flat
            style="top: -15px; right: -15px"
            @click="funcCloseAllDialog()"
          >
            <q-img src="/images/icon_main/icon-close.png"></q-img>
          </q-btn> -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Payment Success -->

  <!-- #region Dialog Payment Realtime -->
  <q-dialog maximized v-model="isShowDialogPaymentSuccess" persistent class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-payment-container relative-position">
          <div class="box-payment-sub">
            <div class="q-pb-md row justify-center" align="center">
              <q-icon
                class="self-center q-mx-sm"
                name="fas fa-shopping-cart"
                size="15px"
              ></q-icon>
              <span
                class="font-mali-b f20"
                v-if="selectedPackage == 'paid' || selectedPackage == 'demo'"
              >
                รับแพ็กเกจเรียบร้อย</span
              >
              <span class="font-mali-b f20" v-if="selectedPackage == 'payment'">
                ชำระเงินเสร็จสิ้น</span
              >
            </div>

            <div class="box-payment-details">
              <div align="center">
                <span class="f16 font-mali-b">ขอบคุณที่เลือก Winner English</span>
              </div>
              <div class="q-my-lg" align="center">
                <div
                  style="
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 3px solid #769606;
                    background-color: #a0ca0e;
                  "
                  class="relative-position"
                >
                  <q-icon
                    style="color: #fff"
                    name="fas fa-check"
                    size="80px"
                    class="absolute-center"
                  ></q-icon>
                </div>
              </div>
              <div class="q-my-md" align="center">
                <div>
                  <span class="f16 font-mali-m">{{
                    `ใช้ได้จนถึง: ${funcFormatExpireDate()}`
                  }}</span>
                </div>
              </div>
            </div>
            <div class="q-mt-md q-pt-sm q-mb-xs" align="center">
              <q-img
                width="120px"
                class="cursor-pointer"
                src="/images/button_main/button-finish-payment-th.png"
                @click="funcSuccessPayment()"
              ></q-img>
            </div>
          </div>

          <!-- Button Close Dialog -->
          <!-- <q-btn
            v-if="isShowBtnClose"
            class="absolute-top-right"
            round
            flat
            style="top: -15px; right: -15px"
            @click="funcCloseAllDialog()"
          >
            <q-img src="/images/icon_main/icon-close.png"></q-img>
          </q-btn> -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Payment Bank Transfer -->
  <q-dialog
    maximized
    v-model="isShowDialogWaitForConfirmPayment"
    persistent
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-payment-container relative-position" style="width: 340px">
          <div class="box-payment-sub">
            <div class="q-py-md row justify-center" align="center">
              <q-icon
                class="self-center q-mx-sm"
                name="fas fa-shopping-cart"
                size="30px"
              ></q-icon>
              <div class="self-center q-px-sm">
                <span class="font-mali-b f20"> ซื้อคอร์ส</span>
              </div>
            </div>

            <div class="box-payment-details">
              <div align="center">
                <span class="f16 font-mali-sb">แจ้งชำระเงินเสร็จสิ้น</span>
              </div>
              <div class="q-my-lg" align="center">
                <div
                  style="
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    border: 3px solid #769606;
                    background-color: #a0ca0e;
                  "
                  class="relative-position"
                >
                  <q-icon
                    style="color: #fff"
                    name="fas fa-check"
                    size="80px"
                    class="absolute-center"
                  ></q-icon>
                </div>
              </div>
              <div class="q-my-md" align="center">
                <div>
                  <span
                    class="f16 font-mali-m"
                    v-html="
                      `ทีมงานจะแจ้งผลการตรวจสอบ<br />
                    การชำระเงินของคุณ ภายในเร็วๆ นี้`
                    "
                  ></span>
                </div>
              </div>
              <div class="q-mt-md q-mb-sm" align="center">
                <div>
                  <span
                    class="f16 font-mali-b"
                    v-html="`ขอบคุณที่เลือก Winner English`"
                  ></span>
                </div>
              </div>
            </div>
            <div class="q-mt-md" align="center">
              <q-img
                width="147px"
                class="cursor-pointer"
                src="/images/button_main/button-logout-long.png"
                @click="funcLogout()"
              ></q-img>
            </div>
          </div>

          <!-- Button Close Dialog -->
          <!-- <q-btn
            v-if="isShowBtnClose"
            class="absolute-top-right"
            round
            flat
            style="top: -15px; right: -15px"
            @click="funcCloseAllDialog()"
          >
            <q-img src="/images/icon_main/icon-close.png"></q-img>
          </q-btn> -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #endregion -->

  <!-- #region Dialog Package Code -->
  <q-dialog
    maximized
    v-model="isShowDialogPackageCode"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-package-code">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="center"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div
            class="box-dialog-container relative-position"
            :style="$q.platform.is.mobile ? 'max-width:320px;width: 100%' : ''"
          >
            <div class="box-dialog-sub">
              <div class="q-py-md" align="center">
                <span class="font-mali-b f20">รับแพ็กเกจจากโค้ด</span>
              </div>

              <div class="box-dialog-details font-mali-m" align="center">
                <div class="box-dialog-image" align="center">
                  <q-img
                    width="100%"
                    src="/images/bg-gift-card.png"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="q-mb-md">
                  <div align="left">
                    <span class="f12 font-mali-m"> โค้ด Gift Card (redeem code) </span>
                  </div>
                  <div>
                    <q-input
                      dense
                      borderless
                      class="f14 box-input-register"
                      v-model="packageCode"
                      placeholder="กรอกโค้ดรับแพ็กเกจ"
                      :input-style="
                        packageCode.length == 0
                          ? 'font-size:14px;padding-bottom: 16px'
                          : 'padding-bottom: 17px;'
                      "
                      :class="{
                        'box-input-register-error': isValidatePackageCode,
                      }"
                    >
                    </q-input>
                  </div>
                </div>
                <div class="q-mt-md" align="center">
                  <span
                    class="text-link f12 cursor-pointer"
                    @click="funcShowDialogHowToGetCode()"
                    >ช่องทางการได้รับโค้ด</span
                  >
                </div>
                <div class="q-mt-lg row justify-between">
                  <div class="col" align="left">
                    <q-img
                      class="cursor-pointer"
                      width="120px"
                      src="images/button_main/button-previous.png"
                      @click="funcBackToPackageMenu()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="col" align="right">
                    <q-img
                      class="cursor-pointer"
                      width="120px"
                      src="images/button_main/button-confirm-short-th.png"
                      @click="funcCheckPackageCode()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <!-- <div class="q-mt-lg" align="center" v-if="!isPaymentMethod">
                <q-img
                  class="cursor-pointer"
                  width="100%"
                  src="images/button_main/button-confirm-long.png"
                  @click="funcCheckPackageCode()"
                ></q-img>
              </div> -->
              </div>
            </div>

            <!-- Button Close Dialog -->
            <q-btn
              class="absolute-top-right"
              v-if="isShowBtnClose"
              round
              flat
              style="top: -15px; right: -15px"
              @click="funcCloseAllDialog()"
            >
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Package Code Details -->
  <q-dialog
    maximized
    v-model="isShowDialogPackageDetail"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-package-details">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="left"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div class="box-dialog-container relative-position" style="width: 300px">
            <div class="box-dialog-sub">
              <div class="q-py-md" align="center">
                <span class="font-mali-b f20">
                  <span v-if="selectedPackage == 'paid'">รับแพ็กเกจจากโค้ด</span>
                  <span v-if="selectedPackage == 'demo'">รับสิทธิ์ทดลองเรียน</span>
                </span>
              </div>

              <div class="box-dialog-details">
                <div align="center">
                  <span class="f16 font-mali-b">รายการที่จะได้รับ </span>
                </div>
                <div class="q-mt-sm">
                  <div class="f16 font-mali-m">
                    <span v-if="selectedPackage == 'demo'">
                      {{ `แพ็กเกจทดลองเรียนฟรี 3 วัน` }}
                    </span>
                    <span class="" v-else>{{ `แพ็กเกจ ${packageData.package} ` }}</span>

                    <span v-if="packageData.package == 'demo'">
                      {{ packageData.demoDays }} วัน
                    </span>
                  </div>
                </div>
                <div class="row q-mt-sm f12 font-mali-m" v-if="selectedPackage == 'paid'">
                  <div class="col">
                    <span class="">ราคาแพ็กเกจ</span>
                  </div>
                  <div class="col" align="right">
                    {{ `฿ ${packageData.price}` }}
                  </div>
                </div>
              </div>
              <div class="q-mt-lg row justify-between" align="center">
                <div class="col" align="left">
                  <q-img
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-previous.png"
                    @click="funcBackToPackageDialog()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col" align="right">
                  <q-img
                    width="120px"
                    class="cursor-pointer"
                    src="/images/button_main/button-confirm-package-th.png"
                    @click="funcConfirmPackageCode()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog How to get code  -->
  <q-dialog
    maximized
    v-model="isShowDialogHowToGetCode"
    persistent
    :seamless="isSeamless"
    class="z-max"
  >
    <q-card class="transparent shadow-0" id="box-how-to-get-code">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          style="height: 85px"
          class="col-12"
          v-if="!$q.platform.is.desktop && $route.name == 'register-main'"
        ></div>
        <div
          class="relative-position full-width row justify-center items-center q-py-md"
          align="center"
          style="min-height: calc(100% - 85px); max-height: fit-content"
        >
          <div class="box-dialog-container relative-position">
            <div class="box-dialog-sub q-py-sm text-content">
              <div align="center" class="q-py-md">
                <span class="title-dialog font-mali-b f20">ช่องทางการได้รับโค้ด</span>
              </div>
              <div class="box-dialog-details font-mali-m">
                <div class="q-px-sm">
                  <span class="f12">ช่องทางการได้รับโค้ดแพ็กเกจ</span>
                </div>

                <div class="q-my-sm" align="center">
                  <div>
                    <q-img
                      class="cursor-pointer"
                      width="250px"
                      src="/images/button_main/button-contact-facebook.png"
                      @click="funcOpenFacebook()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <div class="q-my-sm" align="center ">
                  <div>
                    <q-img
                      class="cursor-pointer"
                      width="250px"
                      src="/images/button_main/button-contact-line.png"
                      @click="funcOpenLine()"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>

                <div class="relative-position q-my-md q-px-md">
                  <q-separator style="height: 2px"></q-separator>
                  <div
                    style="
                      width: 45px;
                      height: 20px;
                      background-color: #efd080;
                      border-radius: 20px;
                    "
                    class="absolute-center row justify-center items-center"
                  >
                    <span class="f12"> หรือ </span>
                  </div>
                </div>

                <div class="q-my-sm q-px-sm">
                  <span class="f12">ผ่านตัวแทนจำหน่าย</span>
                </div>
                <div class="q-my-sm q-px-sm">
                  <q-img
                    width="50px"
                    src="/images/icon_main/icon-se-ed.png"
                    no-spinner
                    no-transition
                  ></q-img>
                  <!-- <q-img
                  width="50px"
                  class="q-mx-md"
                  src="/images/icon_main/icon-eleven.png"
                ></q-img> -->
                </div>
              </div>

              <div class="q-mt-lg q-pb-xs" align="center">
                <q-img
                  class="cursor-pointer"
                  width="274px"
                  src="/images/button_main/button-back-to-gift-code.png"
                  @click="funcBackToDialogPackageCode()"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>

            <!-- Button Close Dialog -->
            <q-btn
              class="absolute-top-right"
              round
              style="top: -15px; right: -15px"
              flat
              @click="funcBackToDialogPackageCode()"
            >
              <q-img
                src="/images/icon_main/icon-close.png"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Terms -->
  <dialog-terms
    :isShowDialogTerms="isShowDialogTermsAndPolicy"
    :type="termsType"
    @callback-backToPayment="
      (isShowDialogTermsAndPolicy = false), (isBackToPackage = false)
    "
    :isPayment="true"
    :isPackage="isBackToPackage"
  ></dialog-terms>
  <!-- #endregion -->

  <!-- #region Dialog Iframe Payment -->
  <q-dialog maximized v-model="isShowDialogIframePayment" class="z-max">
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

  <!-- #region Dialog Loading -->
  <dialog-loading :isShowLoading="isShowLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script setup>
import dialogTerms from "components/payments/terms-dialog.vue";
import dialogLoading from "src/components/dialog-loading.vue";
import { useQuasar } from "quasar";
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
import { db, ts, logout } from "src/router";
import { useStudentStore } from "src/stores/student";
import { useRoute, useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";

const props = defineProps({
  isSeamless: {
    type: Boolean,
    default: false,
  },
  isMaximized: {
    type: Boolean,
    default: true,
  },
  isShowBtnClose: {
    type: Boolean,
    default: false,
  },
  isRegister: {
    type: Boolean,
    default: false,
  },
  isPlacement: {
    type: Boolean,
    default: false,
  },
  isMax: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "callback-closeDialog",
  "callbackFinishPackageCode",
  "callbackFinishPayment",
  "callbackShowAndHideBoxName",
]);

// #region Initial Variable
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const isShowLoading = ref(false);
const isShowDialogPackageMenu = ref(false);
const isShowDialogPaymentSuccess = ref(false);
const isShowDialogPackageCode = ref(false);
const isBackToPackage = ref(false);
const packageData = ref({
  name: "",
  price: 0,
});

const selectedCarouselPackage = ref(0);

let month_th = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

let months_th_mini = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const isExpired = computed(() => {
  const studentStore = useStudentStore();

  if (studentStore.distanceInDays < 0) {
    return true;
  } else {
    return false;
  }
});

// #endregion

// #region Other Function And Computed
const isShowDialogTermsAndPolicy = ref(false);
const termsType = ref("");
const funcShowDialogTermsAndPolicy = (type) => {
  isShowDialogTermsAndPolicy.value = true;
  termsType.value = type;
};

const sumTotalPrice = computed(() => {
  let price = packageData.value.price;
  let discount = discountForCouponCode.value;

  let sum = price - discount;

  return sum;
});

const funcCloseAllDialog = () => {
  funcClearSnapshotAndIntervalTime();
  funcResetCouponCode();
  funcResetCreditCardData();
  funcResetPackageData();

  isShowDialogPackageCode.value = false;
  isShowDialogPayment.value = false;
  isShowDialogPaymentSuccess.value = false;
  isShowDialogPaymentMethodQrCode.value = false;
  isShowDialogPaymentMethodCreditCard.value = false;
  isShowDialogPaymentMethodOther.value = false;
  isShowDialogPackageMenu.value = false;
  isShowDialogPackageCode.value = false;
  isShowDialogPackageDetail.value = false;
  isShowDialogHowToGetCode.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};

const funcBackToPackageMenu = () => {
  isShowDialogPackageCode.value = false;
  isShowDialogPackageMenu.value = true;
};

const funcSuccessPayment = async () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  isShowLoading.value = true;
  isShowDialogPaymentSuccess.value = false;

  if (!studentStore.studentData.isSelectedLevel) {
    if (studentStore.placementTestLevel == "") {
      systemStore.systemData.activeState.isShowDialogYourLevel = true;
    }
  }

  emit("callback-closeDialog");
  isShowLoading.value = false;

  return;

  if (route.name != "placement-main" && route.name != "register-main") {
    const studentStore = useStudentStore();
    const systemStore = useSystemStore();

    setTimeout(() => {
      if (!studentStore.studentData.isSelectedLevel) {
        systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
        systemStore.systemData.activeStatus.isHasSelectLevel = true;
        systemStore.systemData.activeStatus.isShowButtonClose = true;
      }
      emit("callback-closeDialog");
      isShowLoading.value = false;
    }, 500);
  } else {
    emit("callback-closeDialog");
    isShowLoading.value = false;
  }
};
// #endregion

// #region Function Reset Data
const funcResetPackageData = () => {
  packageData.value = {
    name: "",
    price: 0,
    discount: 0,
    couponCode: "",
  };
};

// #endregion

// #region Function Format Data
const funcFormatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const funcFormatCreditCardNumber = (number) => {
  let newNumber = number.replace(/\s/g, "");

  let front = newNumber.substring(0, 4);
  let back = newNumber.substring(newNumber.length - 4, newNumber.length);

  return `${front}*******${back}`;
};

const funcFormatExpireDate = () => {
  const studentStore = useStudentStore();

  if (studentStore.expireDate == null || studentStore.expireDate == "") {
    return "-";
  }

  let newDate = studentStore.expireDate.split("/");

  let day = newDate[2];
  let month = months_th_mini[newDate[1] - 1];
  let year = newDate[0];

  return `${day} ${month} ${year}`;
};
// #endregion

// #region Dialog redeem package
const packageCode = ref("");
const selectedPackage = ref("paid");
const isValidatePackageCode = ref(false);
const funcCheckPackageCode = async () => {
  const studentStore = useStudentStore();
  // isShowDialogPackageCode.value = false;
  // isShowDialogPackageDetail.value = true;
  // return;

  try {
    if (packageCode.value == "") {
      isValidatePackageCode.value = true;
      throw new Error("กรุณากรอกโค้ดรับแพ็กเกจ");
    }

    isShowLoading.value = true;
    isShowDialogPackageCode.value = false;
    isValidatePackageCode.value = false;

    const studentId = studentStore.studentId;

    let APIURL = `${process.env.NEWAPI}/odysseyRegister-checkRedeemCode`;

    let params = {
      code: packageCode.value,
      type: selectedPackage.value,
      studentId: studentId,
    };

    let response = await axios.get(APIURL, { params: params });

    if (response.data == "code is used") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("โค้ดนี้ถูกใช้ไปแล้ว");
    } else if (response.data == "code not found") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("รหัสโค้ดไม่ถูกต้อง");
    } else if (response.data == "code not match type") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("โค้ดไม่ตรงกับประเภท");
    } else if (response.data == "code is expired") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("โค้ดหมดอายุแล้ว");
    } else if (response.data == "Duplicate Demo Code") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("มีการใช้งานแพ็กเกจทดลองเรียนแล้ว");
    } else if (response.data == "Already paid cannot use demo code") {
      isValidatePackageCode.value = true;
      isShowDialogPackageCode.value = true;
      isShowLoading.value = false;
      throw new Error("มีแพ็กเกจอยู่แล้ว ไม่สามารถใช้โค้ดทดลองเรียนได้");
    }

    packageData.value = response.data;

    isShowLoading.value = false;
    isValidatePackageCode.value = false;
    isShowDialogPackageDetail.value = true;
    isShowLoading.value = false;
  } catch (e) {
    isShowDialogPackageCode.value = true;
    isShowLoading.value = false;

    $q.notify({
      message: e.message,
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
};

const funcConfirmPackageCode = async () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  isShowLoading.value = true;
  isShowDialogPackageDetail.value = false;

  // isShowDialogPackageDetail.value = true

  let APIURL = null;
  let type = null;
  let studentData = studentStore.studentData;

  if (selectedPackage.value == "demo") {
    APIURL = `${process.env.NEWAPI}/odysseyRegister-useDemoCode`;
    // studentData.statusComplete.isUseDemoCodeComplete = true;
  } else {
    APIURL = `${process.env.NEWAPI}/odysseyRegister-usePaidCode`;

    // studentData.statusComplete.isUsePackageCodeComplete = true;
  }

  let POSTDATA = {
    codeId: packageData.value.codeId,
    studentId: studentStore.studentId,
    stage: "student-form",
  };

  try {
    let response = await axios.post(APIURL, POSTDATA);

    type = response.data.type;

    if (response.data.message != "success") {
      throw new Error("error");
    }
    type = response.data.type;

    studentStore.setExpireDate({ ...response.data, type: type });

    studentStore.getStudentData();

    isShowLoading.value = false;

    isShowDialogPaymentSuccess.value = true;
    systemStore.setRegisterData({ stage: "student-form" });
    emit("callbackFinishPackageCode", selectedPackage.value);
  } catch (e) {
    // console.log(e);
    isShowDialogPackageDetail.value = true;
    isShowLoading.value = false;
  }
};

const funcBackToPackageDialog = () => {
  packageCode.value = "";
  isShowDialogPackageDetail.value = false;

  if (selectedPackage.value == "demo") {
    if (isMobileMode.value) {
    } else {
      isShowDialogPackageMenu.value = true;
    }
  } else {
    isShowDialogPackageCode.value = true;
  }
};

const isShowDialogPackageDetail = ref(false);
const isShowDialogHowToGetCode = ref(false);
const funcShowDialogHowToGetCode = () => {
  isShowDialogPackageCode.value = false;
  isShowDialogHowToGetCode.value = true;
};

const funcOpenFacebook = () => {
  window.open("https://www.facebook.com/WinnerEng", "_blank");
};

const funcOpenLine = () => {
  window.open("https://line.me/R/ti/p/@290hllal", "_blank");
};

const funcBackToDialogPackageCode = () => {
  isShowDialogPackageDetail.value = false;
  isShowDialogHowToGetCode.value = false;
  isShowDialogPackageCode.value = true;
};
// #endregion

// #region Dialog Package

const isMobileMode = ref(false);
const funcSelectedPackage = (data) => {
  // reset discount
  discountForCouponCode.value = 0;
  currentCode.value = "";
  isCodeForNewUser.value = false;
  currentCodeType.value = "";
  couponCode.value = "";
  isShowDialogPackageMenu.value = false;

  packageData.value.name = data.packageTitle;
  packageData.value.price = data.discountPrice;
  packageData.value.type = data.type;

  if (data.type == "package-demo") {
    packageData.value.codeId = "tTXsyZCOrP50uUlY0sil";
    selectedPackage.value = "demo";
    isShowDialogPackageDetail.value = true;
  } else if (data.type == "package-redeem-code") {
    selectedPackage.value = "paid";
    isShowDialogPackageCode.value = true;
  } else if (data.type == "package-menu") {
    isShowDialogPackageMenu.value = true;
  } else {
    selectedPackage.value = "payment";
    isShowDialogPayment.value = true;
  }
};

// #endregion

// #region Dialog Payment
const isShowDialogPayment = ref(false);

// Set Coupon Code
const couponCode = ref("");

// Set Payment Method
const selectePaymentMethod = ref("qrcode");
const paymentMethodOptions = ref([
  {
    label: "THAI QR PromptPay",
    value: "qrcode",
    icon: "icon-qrcode",
  },
  {
    label: "Credit/Debit Card",
    value: "creditcard",
    icon: "icon-credit-card",
  },
  {
    label: "Other",
    value: "other",
    icon: "icon-bank-transfer",
  },
]);

const showPaymentMethodDetails = computed(() => {
  let paymentMethod = paymentMethodOptions.value.find(
    (item) => item.value == selectePaymentMethod.value
  );

  if (paymentMethod) {
    return paymentMethod;
  }

  return "";
});

const discountForCouponCode = ref(0);

const currentCode = ref("");
const currentCodeType = ref("");
const isCodeForNewUser = ref(false);
// Function Check Coupon Code
const isHasCouponCode = ref(false);
const funcCheckCouponCode = async () => {
  const studentStore = useStudentStore();
  const studentId = studentStore.studentId;
  $q.loading.show();

  try {
    if (couponCode.value == "") throw new Error("กรุณากรอกรหัสคูปอง");

    const APIURL = `${process.env.NEWAPI}/redeemCode-checkPackageCode`;

    const POSTDATA = {
      studentId: studentId,
      code: couponCode.value.toUpperCase(),
      package: packageData.value.type,
    };

    const response = await axios.post(APIURL, POSTDATA);

    if (response.data == "code not exists") {
      discountForCouponCode.value = 0;
      throw new Error("รหัสคูปองไม่ถูกต้อง");
    } else if (response.data == "code is used") {
      discountForCouponCode.value = 0;
      throw new Error("รหัสคูปองถูกใช้งานแล้ว");
    } else if (response.data == "code not longer valid") {
      discountForCouponCode.value = 0;
      throw new Error("รหัสคูปองหมดอายุแล้ว");
    } else {
      currentCode.value = couponCode.value.toUpperCase();

      currentCodeType.value = response.data.type;
      let packageDiscount = response.data.findPackage;
      isCodeForNewUser.value = response.data.isNewUser;

      if (packageDiscount.discount === 0) {
        $q.notify({
          color: "negative",
          message: "รหัสคูปองนี้ไม่สามารถใช้งานได้",
          position: "top",
          timeout: 1500,
        });
      }

      if (packageDiscount.unit == "%") {
        let discount = (packageData.value.price * packageDiscount.discount) / 100;
        discountForCouponCode.value = discount;
      } else {
        let discount = packageDiscount.discount;
        discountForCouponCode.value = discount;
      }
    }
    $q.loading.hide();
  } catch (e) {
    $q.notify({
      color: "negative",
      message: e.message,
      position: "top",
      timeout: 1500,
    });

    $q.loading.hide();
  }

  return;

  try {
    if (couponCode.value == couponKey) {
      isHasCouponCode.value = true;
      discountForCouponCode.value = 0;
      return;
    }

    isHasCouponCode.value = false;
  } catch (e) {
    funcResetCouponCode();
  }
};

// Function Selected Payment Method
const funcSelectedPaymentMethod = () => {
  isShowDialogPayment.value = false;

  if (selectePaymentMethod.value == "qrcode") {
    funcPaymentMethodQrcode();
  } else if (selectePaymentMethod.value == "creditcard") {
    isShowDialogPaymentMethodCreditCard.value = true;
  } else if (selectePaymentMethod.value == "other") {
    isShowDialogPaymentMethodOther.value = true;
  }
};

// Function Reset Coupon Code
const funcResetCouponCode = () => {
  couponCode.value = "";
  discountForCouponCode.value = 0;
  isHasCouponCode.value = false;
};

// Function Back to Package Dialog
const funcBackToPackage = () => {
  isShowDialogPayment.value = false;
  isShowDialogPackageMenu.value = true;
  funcResetCouponCode();
  funcResetPackageData();
};
// #endregion

// #region Dialog Payment Method Credit card
const isShowDialogPaymentMethodCreditCard = ref(false);

const creditcardData = ref({
  number: "",
  name: "",
  expiry: "",
  securityCode: "",
});

const isValidateCreditCardNumber = ref(false);
const isValidateCreditCardName = ref(false);
const isValidateCreditCardExpiry = ref(false);
const isValidateCreditCardSecurityCode = ref(false);
const isHasCreditCard = ref(false);
const funcCheckCreditCard = () => {
  if (creditcardData.value.number == "" || creditcardData.value.number.length != 19) {
    isValidateCreditCardNumber.value = true;
  }

  if (creditcardData.value.name == "") {
    isValidateCreditCardName.value = true;
  }

  if (creditcardData.value.expiry.length != 5) {
    isValidateCreditCardExpiry.value = true;
  }

  if (creditcardData.value.securityCode.length != 3) {
    isValidateCreditCardSecurityCode.value = true;
  }

  if (
    isValidateCreditCardNumber.value ||
    isValidateCreditCardName.value ||
    isValidateCreditCardExpiry.value ||
    isValidateCreditCardSecurityCode.value
  ) {
    return;
  }

  isValidateCreditCardNumber.value = false;
  isValidateCreditCardName.value = false;
  isValidateCreditCardExpiry.value = false;
  isValidateCreditCardSecurityCode.value = false;

  funcPaymentMethodCreditCard();
};

let creditCardToken = ref("");
const funcPaymentMethodCreditCard = async () => {
  // isHasCreditCard.value = true;
  // return;
  isShowLoading.value = true;
  let tokenParameters = {
    name: creditcardData.value.name,
    number: creditcardData.value.number,
    expiration_month: creditcardData.value.expiry.split("/")[0],
    expiration_year: creditcardData.value.expiry.split("/")[1],
    security_code: creditcardData.value.securityCode,
  };

  Omise.setPublicKey(process.env.OMISE_PUBLIC_KEY);

  await Omise.createToken("card", tokenParameters, function (statusCode, response) {
    // console.log("statusCode: ", statusCode);
    // console.log("response: ", response);

    if (statusCode != 200) {
      funcError(response);
      isShowLoading.value = false;
      isHasCreditCard.value = false;
      return;
    }

    creditCardToken.value = response.id;
    // console.log("response.id: ", response.id);

    isHasCreditCard.value = true;
    isShowLoading.value = false;
  });
};

const isShowDialogIframePayment = ref(false);
const linkPayment = ref("");
const funcChargeByToken = async () => {
  // isShowDialogPaymentMethodCreditCard.value = false;
  // isShowDialogPaymentSuccess.value = true;
  // return;/

  isShowDialogPaymentMethodCreditCard.value = false;
  isShowLoading.value = true;

  const studentStore = useStudentStore();

  try {
    let APIURL = `${process.env.NEWAPI}/payment-chargeByToken`;

    let POSTDATA = {
      tokenId: creditCardToken.value,
      amount: sumTotalPrice.value * 100,
      studentId: studentStore.studentId,
      package: packageData.value.type,
    };

    let response = await axios.post(APIURL, POSTDATA);

    if (response.data.message != "success") {
      throw new Error("error");
    }

    linkPayment.value = response.data.charge.authorize_uri;
    window.open(linkPayment.value, "_blank");
    isShowDialogIframePayment.value = true;

    chargeId.value = response.data.charge.id;
    isShowLoading.value = false;
    funcResetCreditCardData();
    funcListenPaymentMethod();
  } catch (e) {
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });

    isShowDialogPaymentMethodCreditCard.value = true;
    isShowLoading.value = false;
  }
};

// Function Payment Credit card for back to payment method
const funcBackToPaymentMethod = () => {
  if (isHasCreditCard.value) {
    isHasCreditCard.value = false;
    return;
  }

  funcResetCreditCardData();

  isShowDialogPaymentMethodCreditCard.value = false;
  isShowDialogPayment.value = true;
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
      isValidateCreditCardExpiry.value = true;
      break;
    case "failed_capture":
      break;
    case "failed_expire":
      isValidateCreditCardExpiry.value = true;
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
      isValidateCreditCardNumber.value = true;
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
      isValidateCreditCardNumber.value = true;
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
      isValidateCreditCardNumber.value = true;
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

const funcResetCreditCardData = () => {
  creditcardData.value = {
    number: "",
    name: "",
    expiry: "",
    securityCode: "",
  };
  isHasCreditCard.value = false;
};

// #endregion

// #region Dialog Payment Method Other

const funcCopyToClipboard = (value) => {
  // can use this
  navigator.clipboard.writeText(value);
};

const funcChooseFiles = () => {
  let el = document.getElementById("inputRefFiles");
  el.click();
};

const imageFile = ref("");
const funcUploadFiles = (file) => {
  imageFile.value = file.target.files[0];
};

const funcRemoveImageFile = () => {
  imageFile.value = "";
};

const funcCloseDialogOther = () => {
  isShowDialogPaymentMethodOther.value = false;
  isShowDialogPayment.value = true;
};

const isShowDialogWaitForConfirmPayment = ref(false);
const funcSendPaymentFormImage = () => {
  isShowDialogPaymentMethodOther.value = false;
  isShowDialogWaitForConfirmPayment.value = true;
};

const isShowDialogHowToPayment = ref(false);
const funcShowDialogHowToPayment = () => {
  isShowDialogHowToPayment.value = true;
};

const funcLogout = () => {
  isShowDialogWaitForConfirmPayment.value = false;
  router.push("/");
};
// #endregion

// #region Dialog Payment Method QR Code
const isShowDialogPaymentMethodQrCode = ref(false);
const isShowDialogExpiredQrCode = ref(false);
const qrcodeImage = ref("");
const chargeId = ref("");
let minutes = 0;
let seconds = 10;

const funcPaymentMethodQrcode = async () => {
  const studentStore = useStudentStore();

  isShowLoading.value = true;
  isShowDialogPayment.value = false;

  // isShowDialogPaymentSuccess.value = true;
  // isShowLoading.value = false;
  // return;

  try {
    let APIURL = `${process.env.NEWAPI}/payment-createSource`;

    let POSTDATA = {
      amount: sumTotalPrice.value * 100,
    };

    let response = await axios.post(APIURL, POSTDATA);

    let message = response.data.message;

    if (message == "error") {
      throw response.data.error;
    }

    POSTDATA = {
      sourceId: response.data.source.id,
      amount: response.data.source.amount,
      studentId: studentStore.studentId,
      package: packageData.value.type,
    };

    APIURL = `${process.env.NEWAPI}/payment-charge`;

    response = await axios.post(APIURL, POSTDATA);

    message = response.data.message;

    if (message == "error") {
      throw response.data.error;
    }

    qrcodeImage.value = response.data.source.scannable_code.image.download_uri;

    chargeId.value = response.data.id;
    minutes = response.data.minutes;
    seconds = response.data.seconds;

    isShowDialogPaymentMethodQrCode.value = true;

    isShowLoading.value = false;

    setTimeout(() => {
      funcTimeoutPayment();
    }, 300);

    funcListenPaymentMethod();
  } catch (e) {
    if (listenPayment != null) {
      listenPayment();
      listenPayment = null;
    }

    if (interval != null) {
      clearInterval(interval);
      interval = null;
    }

    funcError(e);
    isShowLoading.value = false;
    isShowDialogPayment.value = true;
  }
};

const funcCancelQrcode = () => {
  isShowDialogPaymentMethodQrCode.value = false;
  isShowDialogExpiredQrCode.value = false;
  funcClearSnapshotAndIntervalTime();
  isShowDialogPackageMenu.value = true;
};

const funcCreateQrcode = () => {
  isShowDialogExpiredQrCode.value = false;
  isShowDialogPayment.value = true;
  funcClearSnapshotAndIntervalTime();
};

const funcHandleSwipe = (event) => {
  if (event.direction == "left") {
    if (selectedCarouselPackage.value == 0) {
      selectedCarouselPackage.value = 1;
    } else {
      selectedCarouselPackage.value = 0;
    }
  } else if (event.direction == "right") {
    if (selectedCarouselPackage.value == 0) {
      selectedCarouselPackage.value = 1;
    } else {
      selectedCarouselPackage.value = 0;
    }
  }
};

const funcSaveQrCodeImage = () => {
  // var svgElement = document.getElementById("winner-qrcode");

  // const serializer = new XMLSerializer();

  // const svgString = serializer.serializeToString(svgElement);
  // // console.log("svgElement: ", svgElement.width);

  // const img = new Image();

  // img.src = "data:image/svg+xml," + encodeURIComponent(svgString);

  // img  onload
  // img.onload = function () {
  //   const canvas = document.createElement("canvas");
  //   canvas.width = svgElement.width;
  //   canvas.height = svgElement.height;
  //   const ctx = canvas.getContext("2d");

  //   ctx.drawImage(img, 0, 0);

  //   const dataURL = canvas.toDataURL();
  //   console.log("dataURL: ", dataURL);

  //   // Set the href of the download link and display it.
  //   var downloadLink = document.createElement("a");
  //   downloadLink.target = "_blank";
  //   downloadLink.href = dataURL;
  //   // downloadLink.style.display = "block";

  //   // Optionally, you can automatically trigger the download by simulating a click on the download link.
  //   downloadLink.download = "qrcode.png";
  //   downloadLink.click();
  // };

  // html2canvas(img).then(function (canvas) {
  //   const image = canvas
  //     .toDataURL("image/png")
  //     .replace("image/png", "image/octet-stream");

  //   const a = document.createElement("a");

  //   a.setAttribute("download", `qrcode.png`);
  //   a.setAttribute("href", image);

  //   a.click();
  //   canvas.remove();
  // });

  // const canvas = document.createElement("canvas");
  // canvas.width = svgElement.width;
  // canvas.height = svgElement.height;
  // const ctx = canvas.getContext("2d");

  // console.log("img: ", img);

  // // ctx.drawImage(img, 0, 0);

  // const dataURL = canvas.toDataURL();
  // console.log("dataURL: ", dataURL);

  // // Set the href of the download link and display it.
  // var downloadLink = document.createElement("a");
  // downloadLink.target = "_blank";
  // downloadLink.href = dataURL;
  // // downloadLink.style.display = "block";

  // // Optionally, you can automatically trigger the download by simulating a click on the download link.
  // downloadLink.download = "qrcode.png";
  // downloadLink.click();

  // img.onload = function () {

  //   // Convert the canvas to a data URL (PNG by default).

  // };

  var link = document.createElement("a");
  link.target = "_blank";
  link.href = qrcodeImage.value;
  // link.href = qrcode.toDataURL(); // Convert canvas to data URL.
  link.download = "qrcode.png"; // Set the image file name.
  link.click(); // Trigger the download.
};

// #endregion

// #region Function Listening Payment Method
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

const funcSavePackageCodeUses = async () => {
  const studentStore = useStudentStore();
  db.collection("packageCodeLog").add({
    packageCode: currentCode.value,
    studentId: studentStore.studentId,
    isCodeForNewUser: isCodeForNewUser.value,
    discountForCouponCode: discountForCouponCode.value,
    createdAt: ts,
  });
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
            if (currentCode.value != "") {
              funcSavePackageCodeUses();
            }
            isShowLoading.value = true;

            studentStore.student.isUpdateStudentData = true;

            studentStore.getStudentData();

            isShowDialogPaymentSuccess.value = true;
            isShowDialogPaymentMethodQrCode.value = false;
            isShowDialogIframePayment.value = false;
            linkPayment.value = "";
            isShowLoading.value = false;
            systemStore.setRegisterData({ stage: "student-form" });
            funcClearSnapshotAndIntervalTime();
            emit("callbackFinishPayment");
          } else {
            if (selectePaymentMethod.value == "qrcode") {
              funcTimeoutPayment();
            }
          }
        });
      });
  } catch (e) {
    funcClearSnapshotAndIntervalTime();
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
      countdown.innerHTML = "00:00";
      isShowDialogPaymentMethodQrCode.value = false;
      isShowDialogExpiredQrCode.value = true;
      funcClearSnapshotAndIntervalTime();
    }
  }, 1000);

  isShowLoading.value = false;
};

// #region Dialog Payment Method Other
const isShowDialogPaymentMethodOther = ref(false);

// const func
// #endregion
// #endregion

//  #region Test Download Image
// const funcSaveQrCodeImage = async () => {
//   const svgElement = document.getElementById("winner-qrcode");
//   let blob = new Blob([svgElement], { type: "image/svg+xml" });
//   console.log("blob: ", blob);

//   let createBlob = window.URL.createObjectURL(blob);
//   console.log("createBlob: ", createBlob);

//   let img = new Image();
//   img.src = createBlob;

//   html2canvas(svgElement, {
//     allowTaint: true,
//     useCORS: true,
//   }).then((canvas) => {
//     console.log("canvas: ", canvas);
//     download(canvas);
//   });
// };

// const download = function (canvas) {
//   const link = document.createElement("a");
//   link.download = "qrcode.png";
//   link.href = canvas.toDataURL();
//   link.click();
// };
// #endregion

// #region Computed
// const currentDialog = computed(() => {
//   emit("callbackShowAndHideBoxName", false, true);
//   let currentSelected = "";
//   if (isShowDialogPackageMenu.value) {
//     currentSelected = "box-package-menu";
//   } else if (isShowDialogPayment.value) {
//     currentSelected = "box-payment-method";
//   } else if (isShowDialogPaymentMethodQrCode.value) {
//     currentSelected = "box-payment-method-qrcode";
//   } else if (isShowDialogPaymentMethodCreditCard.value) {
//     currentSelected = "box-payment-method-credit-card";
//   } else if (isShowDialogPackageCode.value) {
//   } else if (isShowDialogPaymentMethodOther.value) {
//     currentSelected = "box-payment-method-other";
//   } else if (isShowDialogPackageCode.value) {
//     currentSelected = "box-package-code";
//   } else if (isShowDialogPackageDetail.value) {
//     currentSelected = "box-package-detail";
//   }
//   return currentSelected;
// });
// #endregion

onMounted(() => {
  isValidateCreditCardNumber.value = false;
  isValidateCreditCardName.value = false;
  isValidateCreditCardExpiry.value = false;
  isValidateCreditCardSecurityCode.value = false;

  isShowDialogPackageMenu.value = true;

  // addEventListener()
});

onBeforeUnmount(() => {
  if (listenPayment != null) {
    listenPayment();
    listenPayment = null;
  }

  if (interval != null) {
    clearInterval(interval);
    interval = null;
  }
});
</script>

<style lang="scss" scoped>
// #region New
.box-new-payment-container {
  max-width: 780px;
  width: 100%;
  min-width: 716px;
  // height: 654px;
  color: #4a261b;
  padding: 6px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-new-payment-container-mobile {
  width: 300px;
  border-radius: 12px;
  padding: 6px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.sub-new-payment {
  color: #4a261b;
  border-radius: 12px;
  background: #ffedc4;
  padding: 19px 12px 12px 12px;
}

.sub-new-payment-mobile {
  color: #4a261b;
  border-radius: 12px;
  background: #ffedc4;
  padding: 20px 12px 12px;
}

.content-new-payment {
  padding: 16px 12px;
  border-radius: 0.625rem;
  background: #efd080;
  // margin: auto;
}

.content-new-payment-mobile {
  width: 100%;
  height: 100%;
  // height: 405px;
}

.button-circle-carousel {
  width: 16px;
  height: 16px;
  background-color: #c4c4c4;
  border-radius: 50%;
  margin: 0px 8px;
  cursor: pointer;
}

.button-circle-carousel.active {
  background-color: #4687fa;
}

.box-carousel-main {
  width: 100%;
  margin: 8px 0px;
}

.box-package-content {
  width: 100%;
  border-radius: 10px;
  background: #efd080;
  padding: 8px;
  // width: 240px;
  // height: 405px;
}
// #endregion

// #region Payment
.box-payment-container {
  width: 300px;
  border-radius: 20px;
  color: #4a261b;
  padding: 6px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-payment-container.box-package {
  min-width: 300px;
  width: 100%;
}

.box-payment-container .box-payment-sub {
  padding: 24px 12px 12px 12px;
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-payment-container .box-payment-sub .box-payment-details {
  width: 100%;
  color: #4e1617;
  background-color: #efd080;
  border-radius: 10px;
  padding: 12px;
}

.box-payment-container .box-payment-sub .box-payment-details.payment-details-header {
  border-bottom: 3px solid #ac7d05;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: 3px;
  margin-top: 16px;
  padding-bottom: 16px;
}

.box-payment-container .box-payment-sub .box-payment-details.payment-details-body {
  border-bottom: 3px solid #ac7d05;
  border-radius: 0px;
  margin-bottom: 3px;
}

.box-payment-container .box-payment-sub .box-payment-details.payment-details-footer {
  border-radius: 0px 0px 10px 10px;
}

.box-payment-container .box-payment-sub .box-payment-details .box-payment-image {
  width: 100%;
  height: 100px;
  // border-radius: 10px;
  // background-color: #fff;
}

.box-payment-card {
  width: 268px;
  height: 450px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #4a261b;
  overflow: hidden;
}

.box-payment-card .payment-header {
  height: 60px;
  background-color: #ffc01c;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
  color: #fff;
  border-bottom: 1px solid #4a261b;
}

.box-payment-content {
  max-height: fit-content;
  height: 380px;
  color: #4e1617;
}

.text-link {
  color: #0085ff;
  text-decoration: underline;
}

.box-discount::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #f00;
  transform: rotate(-5deg);
}

.box-input-register {
  position: relative;
  width: 100%;
  height: 30px;
  border: 1px solid #4a261b;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
  padding: 0 10px;
}

.box-input-register-error {
  border: 1px solid #f00;
}

// #region Dialog Redeem Code
.box-dialog-container {
  width: 320px;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 20px;
  color: #4a261b;
  padding: 10px;
}

.box-dialog-container.first-menu {
  width: 300px !important;
}

.box-dialog-container.box-package {
  width: 900px !important;
}

.box-dialog-container .box-dialog-sub {
  background-color: #f6f3d3;
  border-radius: 10px;
  padding: 10px;
}

.box-dialog-container .box-dialog-sub.first-menu {
  padding: 5px;
}

.box-dialog-container .box-dialog-sub .box-dialog-details {
  background-color: #efd080;
  border-radius: 10px 10px 10px 10px;
  padding: 10px;
}

.box-dialog-container .box-dialog-sub .box-dialog-details .box-dialog-image {
  max-width: 174px;
  width: 100%;
  padding: 2.5px;
  // border-radius: 10px;
  // background-color: #fff;
}

.animation-price {
  animation: animationPrice 1s linear alternate-reverse infinite 0.5s;
}

@keyframes animationPrice {
  from {
    transform: scale(1.25);
  }
}

.animation-icon-1 {
  animation: animationIcon1 1s linear alternate-reverse infinite 0.5s;
}

@keyframes animationIcon1 {
  from {
    transform: scale(1.1);
  }
}

.animation-icon-2 {
  animation: animationIcon2 1s linear alternate-reverse infinite 1.5s;
}

@keyframes animationIcon2 {
  from {
    transform: scale(1.1);
  }
}

// #endregion

// #region Dialog Payment Other
.text-image-file-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
}
//

// #endregion
</style>
