<template>
  <q-page>
    <div
      style="
        width: 100vw;
        background-image: url('/images/subscribe_payment/subscribepayment_bg.png');
        background-position: 100% 0%;
        background-size: cover;
        background-repeat: no-repeat;
        margin: 0;
        padding: 0;
      "
    >
      <subscribe-header :isScrolled="isScrolled"></subscribe-header>

      <div
        class="container"
        :class="`${bucket.length ? 'purchased' : ''}  `"
        align="center"
      >
        <div class="custom-button-click"></div>
        <div class="sub-content">
          <!-- #region banner poster -->
          <div
            :class="gridContainerClass"
            class="grid-container relative-position"
            style="overflow: hidden; border-radius: 16px"
          >
            <div
              class="full-width full-height relative-position"
              style="overflow: hidden; border-radius: clamp(4px, 0.75vw, 12px)"
            >
              <q-tab-panels
                swipeable
                infinite
                class="transparent relative-position shadow-0"
                v-model="selectedBanner"
                animated
                v-touch-swipe.mouse="handleSwipe"
                style="overflow: hidden"
              >
                <q-tab-panel
                  class="no-padding fit"
                  :name="index"
                  v-for="(item, index) in bannerList"
                  :key="index"
                  style="overflow: hidden; border-radius: clamp(4px, 0.75vw, 12px)"
                >
                  <div
                    align="center"
                    class="relative-position fit"
                    style="overflow: hidden; border-radius: 4px"
                  >
                    <a
                      :href="item.link"
                      class="cursor-pointer"
                      target="__blank"
                      v-if="item.link"
                    >
                      <q-img :src="item.img" no-spinner no-transition></q-img>
                    </a>
                    <q-img v-else :src="item.img" no-spinner no-transition></q-img>
                  </div>
                </q-tab-panel>
              </q-tab-panels>

              <div
                class="absolute-bottom row justify-center"
                style="bottom: 1%; border-radius: 16px"
              >
                <div
                  class="button-banner-circle"
                  :class="selectedBanner == index ? 'select' : ''"
                  v-for="(item, index) in bannerList"
                  @click="selectedBanner = index"
                ></div>
              </div>
            </div>

            <div
              v-if="gridContainerClass"
              style="
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                gap: 8px;
                flex: 1 0 0;
                align-self: stretch;
                container-type: size;
              "
            >
              <div
                style="
                  display: flex;
                  padding: 8px 16px;
                  justify-content: center;
                  align-items: center;
                  gap: 16px;
                  align-self: stretch;
                  border-radius: 12px;
                  background: #4a261b;
                  font-weight: 700;
                  font-style: normal;
                  text-align: center;
                  line-height: 24px;
                "
                class="f16 text-white font-mali-b"
              >
                คูปอง / โค้ดส่วนลด
              </div>
              <q-scroll-area
                class="relative-position"
                style="width: 100%; max-height: 312px; height: 100%"
              >
                <div v-if="couponCodeList.length">
                  <div
                    v-for="(item, indexCouponCode) in couponCodeList"
                    :key="indexCouponCode"
                    :class="indexCouponCode != 0 ? 'q-my-sm' : ''"
                  >
                    <div
                      style="
                        display: flex;
                        padding: 10px;
                        justify-content: center;
                        align-items: center;
                        gap: 8px;
                        align-self: stretch;
                        border-radius: 12px;
                        background: #fff;
                        width: 100%;
                        height: 112px;
                      "
                      class=""
                    >
                      <div
                        style="
                          display: flex;
                          align-items: center;
                          gap: 8px;
                          flex: 1 0 0;
                          max-width: 324px;
                          width: 100%;
                        "
                      >
                        <div
                          style="
                            display: flex;
                            width: 92px;
                            height: 92px;
                            padding: 8px;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: -2px;
                            border-radius: 8px;
                          "
                          :style="`${
                            item.type === 'percent'
                              ? 'background: #c9193b;'
                              : item.type === 'baht'
                              ? 'background: #0B62D4;'
                              : 'background:#0BAA53;'
                          }`"
                        >
                          <div v-if="item.type != 'demo'">
                            <div>
                              <span class="font-mali-b f16 text-white">ส่วนลด</span>
                            </div>
                            <div>
                              <span class="font-mali-b f24 text-white">
                                <span v-if="item.type === 'baht'">{{
                                  `฿${item.discount}`
                                }}</span>
                                <span v-if="item.type === 'percent'">
                                  {{ `${item.discount}%` }}
                                </span>
                              </span>
                            </div>
                          </div>

                          <div v-else>
                            <span class="font-mali-b f16 text-white">ทดลอง</span>
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
                            height: 100%;
                            color: #4a261b;
                          "
                          class="font-mali-m f12"
                        >
                          <div
                            class="text-left full-width"
                            style="color: #4a261b; padding: 1px 0px"
                          >
                            <div>
                              ใส่โค้ด
                              <span class="font-mali-b f16">{{ item.code }}</span>
                            </div>
                          </div>
                          <div align="left">
                            <div style="padding: 1px 0px">
                              <div v-if="item.type == 'percent'">
                                ลด<span class="font-mali-b f14">{{
                                  ` ${item.discount}`
                                }}</span
                                >%
                              </div>

                              <div v-else>
                                ลดเพิ่ม
                                <span class="font-mali-b f14">{{
                                  ` ${item.discount}`
                                }}</span>
                                บาท
                              </div>
                            </div>
                            <div style="padding: 1px 0px">
                              เมื่อซื้อขั้นต่ำ
                              <span class="font-mali-b f14">{{ item.minPrice }}</span>
                              บาท
                            </div>
                          </div>

                          <div
                            class="self-end row justify-between full-width"
                            style="padding: 1px 0px"
                          >
                            <div style="color: #727e96">
                              {{
                                `${item.startDate.shortYear} - ${item.endDate.shortYear}`
                              }}
                            </div>
                            <div
                              @click="openDialogConditionCode(item, 'system')"
                              class="font-mali-b clickable cursor-pointer"
                              style="color: #0085ff"
                            >
                              <u>เงื่อนไข</u>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                          align-items: flex-end;
                          align-self: stretch;
                        "
                      >
                        <div
                          v-if="item.isNewCode"
                          style="
                            display: flex;
                            width: 48px;
                            height: 20px;
                            padding: 4px 16px;
                            justify-content: center;
                            align-items: center;
                            gap: 10px;
                            border-radius: 4px;
                            background: #158bf8;
                          "
                          class="font-fredoka f12 text-white"
                        >
                          NEW
                        </div>
                        <div
                          @click="item.isKeepCode ? null : funcKeepCouponCode(item)"
                          class="clickable"
                          :class="item.isKeepCode ? '' : 'cursor-pointer'"
                          style="
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            align-items: flex-start;
                            flex: 1 0 0;
                          "
                        >
                          <div style="width: 96px; height: 40px">
                            <img
                              v-if="!item.isKeepCode"
                              src="/images/subscribe_payment/keepCodeBtn-defual.png"
                              style="
                                object-fit: cover;
                                image-rendering: optimizeQuality;
                                image-rendering: optimizeSpeed;
                              "
                            />
                            <img
                              v-else
                              src="/images/subscribe_payment/keepCodeBtn-keep.png"
                              style="
                                object-fit: cover;
                                image-rendering: optimizeQuality;
                                image-rendering: optimizeSpeed;
                              "
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-else
                  class="absolute-center f16 font-mali-m text-white full-width"
                  style="line-height: 1.7"
                >
                  <div>ขณะนี้ยังไม่มีคูปองหรือโค้ดส่วนลดให้เก็บ</div>
                  <div>โปรดติดตามโปรโมชั่นใหม่ได้เร็วๆ นี้</div>
                </div>
              </q-scroll-area>
            </div>
          </div>

          <div
            class="q-mt-sm"
            v-if="!gridContainerClass"
            style="
              display: flex;
              padding: 8px;
              flex-direction: column;
              justify-content: center;
              align-items: flex-start;
              gap: 2px;
              align-self: stretch;
              border-radius: 16px;
              border: 4px solid #5b3018;
              background: #3a1604;
              width: 100%;
              min-width: 344px;
              max-height: 276px;
              height: 100%;
            "
          >
            <div
              style="
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                align-self: stretch;
              "
            >
              <div
                style="
                  display: flex;
                  padding: 8px 16px;
                  justify-content: center;
                  align-items: center;
                  align-self: stretch;
                  border-radius: 12px;
                  background: #4a261b;
                "
                class="text-white"
              >
                คูปอง/โค้ดส่วนลด
              </div>
            </div>

            <q-scroll-area
              style="width: 100%; height: 220px; position: relative"
              :horizontal-thumb-style="{
                background: 'transparent',
                height: '0px',
                opacity: 0,
              }"
              :visible="true"
              class="relative-position"
            >
              <div
                style="
                  display: flex;
                  gap: 8px;
                  align-items: flex-start;
                  position: relative;
                "
                v-if="couponCodeList.length"
              >
                <div
                  v-for="(item, indexCouponCode) in couponCodeList"
                  :key="indexCouponCode"
                  style="
                    display: flex;
                    align-self: stretch;
                    border-radius: 12px;
                    position: relative;
                  "
                >
                  <div
                    style="
                      display: flex;
                      width: 144px;
                      height: 212px;
                      flex-direction: column;
                      align-items: flex-start;
                      border-radius: 12px;
                      position: relative;
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
                        border-radius: 12px;
                        background: #fff;
                        margin-top: 6px;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          align-items: flex-end;
                          gap: 5px;
                          flex: 1 0 0;
                          align-self: stretch;
                        "
                      >
                        <div
                          style="
                            display: flex;
                            height: 64px;
                            padding: 4px;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: 4px;
                            align-self: stretch;
                            border-radius: 8px 8px 0px 0px;
                            line-height: 16px;
                          "
                          :style="`${
                            item.type === 'percent'
                              ? 'background: #c9193b;'
                              : 'background: #0B62D4;'
                          }`"
                        >
                          <span class="font-mali-b f16 text-white">ส่วนลด</span>
                          <span class="font-mali-b f24 text-white"
                            ><span v-if="item.type == 'baht'">&#3647;</span
                            >{{ item.discount
                            }}<span v-if="item.type == 'percent'">%</span></span
                          >
                        </div>
                        <div
                          style="
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            align-items: center;
                            gap: 2px;
                            align-self: stretch;
                            line-height: 15px;
                          "
                          class="font-mali-m f10"
                        >
                          <div class="font-mali-m f12">{{ item.code }}</div>
                          <div>
                            ลด
                            <span class="font-mali-b f12"
                              >{{ item.discount
                              }}<span v-if="item.type != 'baht'">%</span></span
                            >
                            <span v-if="item.type != 'baht'"> สูงสุด </span>
                            <span v-if="item.type != 'baht'" class="font-mali-b f12">{{
                              item.maxPrice
                            }}</span>
                            บาท
                          </div>
                          <div>
                            เมื่อซื้อขั้นต่ำ
                            <span class="font-mali-b f12">{{ item.minPrice }}</span>
                            บาท
                          </div>
                          <div style="color: #727e96; font-size: 11px">
                            {{ item.date }}
                          </div>
                          <div
                            @click="openDialogConditionCode(item, 'system')"
                            class="font-mali-b clickable cursor-pointer"
                            style="color: #0085ff; margin-bottom: 0; padding-bottom: 0"
                          >
                            <u>เงื่อนไข</u>
                          </div>
                        </div>
                      </div>
                      <div
                        @click="item.isKeepCode ? null : funcKeepCouponCode(item)"
                        class="relative-position clickable cursor-pointer"
                        style="
                          display: flex;
                          padding: 2px 6px 6px 6px;
                          flex-direction: column;
                          align-items: flex-start;
                          align-self: stretch;
                          z-index: 5;
                        "
                      >
                        <img
                          v-if="!item.isKeepCode"
                          style="width: 132px; height: 40px"
                          src="/images/subscribe_payment/blank_keppCode_smallSize.png"
                          alt=""
                        />
                        <img
                          v-else
                          style="width: 132px; height: 40px"
                          src="/images/subscribe_payment/blank_keppCode_disable_smallSize.png"
                          alt=""
                        />
                        <div class="absolute-center">
                          <div
                            class="f14 font-mali-b"
                            :class="item.isKeepCode ? 'label-disable' : 'textShadow-btn'"
                          >
                            เก็บ
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      v-if="item.isNewCode"
                      style="
                        display: flex;
                        width: 48px;
                        height: 20px;
                        padding: 4px 16px;
                        justify-content: center;
                        align-items: center;
                        gap: 10px;
                        position: absolute;
                        right: 8px;
                        top: 0px;
                        border-radius: 4px;
                        background: #158bf8;
                        color: #fff;
                      "
                    >
                      NEW
                    </div>
                  </div>
                </div>
              </div>

              <div
                v-else
                class="absolute-center f16 font-mali-m text-white full-width"
                style="line-height: 1.7"
              >
                <div>ขณะนี้ยังไม่มีคูปองหรือโค้ดส่วนลดให้เก็บ</div>
                <div>โปรดติดตามโปรโมชั่นใหม่ได้เร็วๆ นี้</div>
              </div>
            </q-scroll-area>
          </div>

          <!-- #endregion -->
        </div>

        <div class="sub-content">
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
              align-self: stretch;
            "
          >
            <div
              class="relative-position"
              style="
                display: flex;
                height: 40px;
                justify-content: center;
                align-items: flex-end;
                gap: 16px;
                align-self: stretch;
              "
            >
              <div
                class="f24 font-mali-b fit absolute textShadow"
                style="font-weight: 700"
              >
                แพ็กเกจการเรียน
              </div>
            </div>
            <div
              style="display: flex; align-items: center; gap: 12px; align-self: stretch"
              :style="`${
                !isShowFullPackage
                  ? 'justify-content: center; padding:0px'
                  : '  padding: 0px 16px;'
              }`"
            >
              <div v-if="isShowFullPackage" class="text-white f16 font-mali-b">
                แพ็กเกจการเรียน :
              </div>
              <q-btn
                @click="filterCourse('all')"
                class="font-mali-sb"
                style="font-size: clamp(9.8px, 0.834vw, 16px)"
                label="ทั้งหมด"
                :class="
                  activePackage == 'all' ? 'btn-package-active' : 'btn-pakage-none-active'
                "
                unelevated
              />
              <q-btn
                @click="filterCourse('not-buy')"
                class="font-mali-sb"
                style="font-size: clamp(9.8px, 0.834vw, 16px)"
                label="ยังไม่ได้ซื้อ"
                :class="
                  activePackage == 'not-buy'
                    ? 'btn-package-active'
                    : 'btn-pakage-none-active'
                "
                unelevated
              />

              <q-btn
                @click="filterCourse('expire')"
                class="font-mali-sb none-padding"
                style="font-size: clamp(9.8px, 0.834vw, 16px)"
                label="หมดอายุ"
                :class="
                  activePackage == 'expire'
                    ? 'btn-package-active'
                    : 'btn-pakage-none-active'
                "
                unelevated
              />
              <q-btn
                @click="filterCourse('active')"
                class="font-mali-sb"
                style="font-size: clamp(9.8px, 0.834vw, 16px)"
                label="กำลังใช้งาน"
                :class="
                  activePackage == 'active'
                    ? 'btn-package-active'
                    : 'btn-pakage-none-active'
                "
                unelevated
              />
            </div>
          </div>
        </div>

        <!-- this pointer to card builder -->
        <card-course-builder
          :courseData="showCourseInFilterList"
          @addBucket="getBucketData"
          @openDialogCourseInfo="openDialogCourseInfo"
          :isClearBucket="isClearBucket"
          @callback-liveOnline="isShowDialogLiveOnline = true"
        ></card-course-builder>
      </div>

      <div
        @click="openDialogPurchase()"
        class="fixed-bottom relative-position clickable cursor-pointer"
        style="display: flex; align-items: center; justify-content: center; bottom: 20px"
      >
        <div
          v-if="bucket.length"
          class="relative-position sub-content"
          style="display: flex; align-items: center; justify-content: center; width: 100%"
        >
          <img
            src="/images/subscribe_payment/purchase_btn.png"
            alt="Purchase Button"
            style="
              width: 100%;
              height: 100%;
              max-height: 72px;
              min-height: 64px;
              max-width: 1440px;
            "
          />
          <div
            class="row justify-between items-center absolute"
            style="
              padding-left: 32px;
              padding-right: 40px;
              max-width: 1440px;
              width: 100%;
              font-size: clamp(14px, 1.25vw, 24px);
            "
          >
            <div class="row items-center">
              <div style="margin-top: 5px">
                <img src="/images/subscribe_payment/purchase_icon.png" alt="" />
              </div>
              <div class="font-mali-b textShadow q-mx-lg">
                {{ bucket.length }}
              </div>
              <div class="font-mali-b textShadow">รายการ</div>
            </div>
            <div class="textShadow font-mali-b">
              <span>{{ funcFormatPrice(totalPrice) }}</span> บาท
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Dialog รายละเอียดคอร์ส -->
    <dialog-course-infos
      v-if="isDialogCourseInfo"
      :level="levelOnDialogCourseInfo"
      @close-dialog="isDialogCourseInfo = false"
    />

    <!-- Dialog เงื่อนไขการใช้งาน คูปอง -->
    <dialog-condition-code
      v-model="isDialogConditionCode"
      :data="getDataCodeCondition"
      :state="stateOnDialogConditionCode"
      @close-dialog="isDialogConditionCode = false"
      @callback-keepCode="funcKeepCouponCode"
    ></dialog-condition-code>

    <!-- Dialog ซื้อคอร์ส -->
    <dialog-purchased
      v-if="isDialogPurchase"
      :isDialogPurchase="isDialogPurchase"
      :bucketData="bucket"
      :summaryPrice="totalPrice"
      :usingCodeList="keepCodeList"
      @close-dialog="isDialogPurchase = false"
      @onCondition="openDialogConditionCode"
      @onPurchased="openDialogMakePayment"
      @getCode="funcGetDemoCode"
    ></dialog-purchased>

    <!-- Dialog การชำระเงิน -->
    <dialog-make-purchased
      v-if="isDialogMakePayment"
      :paymentBy="purchasedBy"
      :amount="amountPrice"
      :courseList="bucket"
      :coupons="useCouponCodes"
      @close-dialog="openDialogPurchase"
      @complete="isDialogMakePayment = false"
      @timeout="openDialogQrTimeout"
      @finish="funcFinishPurchased()"
      @error="funcErrorPurchased()"
    ></dialog-make-purchased>

    <!-- Dialog QR หมดเวลา -->
    <dialog-qr-timeout
      v-model="isDialogQrTimeout"
      @close-dialog="openDialogPurchase"
      @generate-new="funcGenerateNew()"
    ></dialog-qr-timeout>

    <!-- Dialog การซื้อผิดพลาด -->
    <dialog-error-purchased
      v-model="isErrorPurchased"
      @close-dialog="isErrorPurchased = false"
    ></dialog-error-purchased>
  </q-page>

  <!-- Dialog Success Purchased -->
  <q-dialog v-model="isDialogShowSuccessPurchased" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-success-purchased font-mali-b row justify-center items-center">
          <div class="sub" align="center">
            <div class="f20 font-mali-b">ชำระเงินเสร็จสิ้น</div>

            <div style="width: 100px; margin: 24px 0px">
              <q-img
                src="/images/icon_main/icon-successful.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div class="f16 font-mali-m">
              ขอบคุณที่เลือกเรียนกับ
              <div>Winner English</div>
            </div>

            <div
              style="margin: 16px 0px"
              class="row f14 font-mali-m cursor-pointer"
              v-if="false"
            >
              <div style="margin-right: 10px">
                <img
                  style="width: 13px; height: 13px"
                  src="/images/subscribe_payment/icon _download.png"
                  alt=""
                  class="clickable cursor-pointer"
                />
              </div>
              <div style="text-decoration: underline">บันทึกใบเสร็จ</div>
            </div>

            <div style="width: 120px; margin-top: 8px">
              <q-img
                class="cursor-pointer"
                src="/images/button_main/button-start-learning.webp"
                v-close-popup
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Dialog Error Purchased -->
  <q-dialog v-model="isDialogShowErrorPurchased" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-success-purchased font-mali-b row justify-center items-center">
          <div class="sub" align="center">
            <div class="f20 font-mali-b">เกิดข้อผิดพลาด</div>

            <div style="width: 100px; margin: 24px 0px">
              <q-img
                src="/images/icon_main/icon-error-purchased.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>

            <div class="f16 font-mali-m">
              เกิดข้อผิดพลาด
              <div>กรุณาลองใหม่อีกครั้ง</div>
            </div>

            <div style="width: 120px; margin-top: 24px">
              <q-img
                class="cursor-pointer"
                src="/images/button_main/button-error-purchased.webp"
                v-close-popup
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, nextTick, watch } from "vue";
import dialogCourseInfos from "components/subscribe_payment/dialog_course_infos.vue";
import dialogConditionCode from "components/subscribe_payment/dialog_condition_code.vue";
import dialogPurchased from "components/subscribe_payment/dialog_purchased.vue";
import dialogMakePurchased from "components/subscribe_payment/dialog_make_purchased.vue";
import dialogQrTimeout from "components/subscribe_payment/dialog_qr_timeout.vue";
import dialogErrorPurchased from "components/subscribe_payment/dialog_error_purchased.vue";
import subscribeHeader from "components/subscribe_payment/header.vue";
import cardCourseBuilder from "components/subscribe_payment/card_course_builder.vue";
import { useCourseStore } from "src/stores/course";
import { usePracticeStore } from "src/stores/practice";
import { useQuasar } from "quasar";
import axios from "axios";
import { useSystemStore } from "src/stores/system";
import { useStudentStore } from "src/stores/student";
import { useCounterStore } from "src/stores/counter";
import { useRoute, useRouter } from "vue-router";

const month_th_mini = [
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

const studentStore = useStudentStore();
const courseStore = useCourseStore();

const $q = useQuasar();
const $router = useRouter();

const currentDate = ref(null);

// คูปองโค้ด
const couponCodeList = ref([]);

// ข้อมูลคอร์ส
const courseCardData = ref([]);
const selectedBanner = ref(0);
const bannerData = ref({});
const bannerList = ref([
  {
    poster: "/images/subscribe_payment/poster_main.png",
  },
]);

const isClearBucket = ref(false);

// จัดเรียงคอร์ส
const slideBanner = ref(1); // สไลด์แบนเนอร์
const activePackage = ref("all"); // แพ็กเกจที่เลือก
const showCourseInFilterList = ref([]); // รายการคอร์สที่แสดง
const filterCourse = (selectedPackage) => {
  activePackage.value = selectedPackage;

  if (activePackage.value === "all") {
    showCourseInFilterList.value = courseCardData.value;
  } else if (activePackage.value === "not-buy") {
    showCourseInFilterList.value = courseCardData.value.filter(
      (course) => !course.isHaveCourse
    );
  } else if (activePackage.value === "expire") {
    showCourseInFilterList.value = courseCardData.value.filter(
      (course) => course.isExpireCourse && course.isHaveCourse
    );
  } else if (activePackage.value === "active") {
    showCourseInFilterList.value = courseCardData.value.filter(
      (course) => course.isHaveCourse && !course.isExpireCourse
    );
  }
};

// เลือกคอร์สใส่ตะกร้า
const bucket = ref([]); // ตะกร้าสินค้า
const totalPrice = ref(""); // ราคารวม
const getBucketData = (item) => {
  isClearBucket.value = false;

  bucket.value = item.bucket.value;
  totalPrice.value = item.totalPrice.value;
};

// เปิด Dialog แสดงรายละเอียดคอร์ส
const isDialogCourseInfo = ref(false);
const levelOnDialogCourseInfo = ref(1); // level คอร์สที่เลือก
const openDialogCourseInfo = (level) => {
  isDialogCourseInfo.value = true;
  levelOnDialogCourseInfo.value = level;
};

// เปิด Dialog แสดงเงื่อนไขการใช้โค้ด
const isDialogConditionCode = ref(false);
const getDataCodeCondition = ref({}); // ข้อมูลโค้ดที่เลือก
const stateOnDialogConditionCode = ref(""); // เช็คสถานะ เก็บ หรือ ใช้โค้ด
const openDialogConditionCode = (codeData, state) => {
  isDialogConditionCode.value = true;
  getDataCodeCondition.value = codeData;
  stateOnDialogConditionCode.value = state;
};

// เก็บโค้ดจาก Dialog แสดงเงื่อนไขการใช้โค้ด
const keepCodeList = ref([]); // รายการโค้ดที่เก็บไว้
const updatedUserCodeLess = (data) => {
  keepCodeList.value.push(data);
};

// เปิด Dialog การซื้อคอร์ส
const isDialogPurchase = ref(false);
const isErrorPurchased = ref(false);
const openDialogPurchase = () => {
  const handleDialogError = false;
  if (handleDialogError == true) {
    isErrorPurchased.value = true;
    return;
  }
  isDialogPurchase.value = true;
  isDialogMakePayment.value = false;
  isDialogQrTimeout.value = false;
};

const funcGenerateNew = () => {
  $q.loading.show();

  isDialogQrTimeout.value = false;
  isDialogPurchase.value = true;
  isDialogMakePayment.value = false;

  setTimeout(() => {
    isDialogPurchase.value = false;

    isDialogMakePayment.value = true;

    $q.loading.hide();
  }, 500);
};

// เปิด Dialog แสดงผลการซื้อสำเร็จ
const isDialogShowSuccessPurchased = ref(false);
const funcFinishPurchased = async () => {
  isDialogQrTimeout.value = false;
  isDialogPurchase.value = false;
  isDialogMakePayment.value = false;

  bucket.value = [];

  isClearBucket.value = true;

  $q.loading.show();

  await courseStore.getAllCourse();

  if (courseStore.courseLevel == 0 || courseStore.courseLevel == "0") {
    let courseData = courseStore.list[0];

    await funcSetCourseLevel(courseData);
  }

  courseCardData.value.forEach((res) => {
    res.isSeletedCourse = false;
  });

  keepCodeList.value.forEach((res) => {
    let findCode = useCouponCodes.value.find((x) => x.code == res.code);
    if (findCode) {
      res.isUseCode = true;
    }
  });

  studentStore.removeCouponCode(useCouponCodes.value);

  await funcLoadCardLevel();
  await studentStore.getStudentData();

  filterCourse("all");

  setTimeout(() => {
    $q.loading.hide();
    isDialogShowSuccessPurchased.value = true;
  }, 500);
};

// เปิด Dialog แสดงผลการซื้อผิดพลาด
const isDialogShowErrorPurchased = ref(false);
const funcErrorPurchased = () => {
  isDialogQrTimeout.value = false;
  isDialogPurchase.value = false;
  isDialogMakePayment.value = false;

  isDialogShowErrorPurchased.value = true;
};

// เปิด Dialog การชำระเงิน
const isDialogMakePayment = ref(false);
const amountPrice = ref(""); // ราคาที่ต้องชำระ
const purchasedBy = ref(""); // ช่องทางการชำระเงิน
const useCouponCodes = ref([]); // คูปองที่ใช้
const openDialogMakePayment = (item) => {
  isDialogPurchase.value = false;
  isDialogMakePayment.value = true;
  amountPrice.value = item.price;
  purchasedBy.value = item.payment;
  useCouponCodes.value = item.coupons;
};

// เปิด Dialog แจ้งเตือน QR Code หมดเวลา
const isDialogQrTimeout = ref(false);
const openDialogQrTimeout = () => {
  isDialogQrTimeout.value = true;
};

// ตรวจสอบการสไครล์ และอัพเดทการเลื่อนหน้า
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const funcFormatPrice = (price) => {
  let text = Number(price);

  return text.toLocaleString();
};

// แสดงผล poster และ grid ของคอร์ส
const gridContainerClass = ref("");
const isShowFullPackage = ref(true);
const updateGridLayout = () => {
  if (window.innerWidth > 1023) {
    gridContainerClass.value = "wide-layout";
  } else {
    gridContainerClass.value = "";
  }

  if (window.innerWidth > 719) {
    isShowFullPackage.value = true;
  } else {
    isShowFullPackage.value = false;
  }
};

// จัดเรียงคูปองโค้ด
const sortCodeList = () => {
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

  couponCodeList.value.sort((a, b) => {
    const order = ["percent", "baht"];

    const getTypeOrder = (item) => {
      return order.indexOf(item.type);
    };

    const aIndex = getTypeOrder(a);
    const bIndex = getTypeOrder(b);

    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;

    return aIndex - bIndex || b.discount - a.discount;
  });
};

const funcLoadCouponCode = async () => {
  // console.clear();

  const studentStore = useStudentStore();

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getCouponCode`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let tempCouponCode = [];
    let tempKeepCouponCode = [];

    response.data.data.forEach((res) => {
      let newData = {
        ...res,
        isKeepCode: false,
      };

      let findCoupon = studentStore.couponCodeList.find((x) => x.id == res.id);

      if (findCoupon) {
        newData.isKeepCode = true;
      }

      tempCouponCode.push(newData);
    });

    for (let i = 0; i < studentStore.couponCodeList.length; i++) {
      let keepCode = studentStore.couponCodeList[i];
      let newData = {
        ...keepCode,
      };
      let findCoupon = tempCouponCode.find((x) => x.id == keepCode.id);
      if (findCoupon) {
        newData = {
          ...findCoupon,
          ...keepCode,
        };

        tempKeepCouponCode.push(newData);
      }
    }

    keepCodeList.value = tempKeepCouponCode;

    couponCodeList.value = tempCouponCode;
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const funcLoadCardLevel = async () => {
  const courseStore = useCourseStore();
  const systemStore = useSystemStore();

  function calculateRemainingTime(expireDate) {
    const endDate = new Date(expireDate._seconds * 1000);

    // สร้างอ็อบเจ็กต์ Date สำหรับวันที่ปัจจุบัน
    const currentDate = new Date(systemStore.datetime.timestamp);

    // คำนวณความแตกต่างระหว่างวันที่สิ้นสุดและวันที่ปัจจุบัน (ในหน่วยมิลลิวินาที)
    const timeDifference = endDate.getTime() - currentDate.getTime();

    // แปลงความแตกต่างจากมิลลิวินาทีเป็นวัน
    const remainingDays = Math.ceil(timeDifference / (1000 * 3600 * 24));

    // คำนวณส่วนต่างแบบละเอียด
    let years = endDate.getFullYear() - currentDate.getFullYear();
    let months = endDate.getMonth() - currentDate.getMonth();
    let days = endDate.getDate() - currentDate.getDate();
    let hours = endDate.getHours() - currentDate.getHours();
    let minutes = endDate.getMinutes() - currentDate.getMinutes();

    // ปรับค่าหากติดลบ
    if (minutes < 0) {
      minutes += 60;
      hours -= 1;
    }
    if (hours < 0) {
      hours += 24;
      days -= 1;
    }
    if (days < 0) {
      let prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonth.getDate();
      months -= 1;
    }
    if (months < 0) {
      months += 12;
      years -= 1;
    }

    let result = "เวลาคงเหลือ ";

    if (years > 0) {
      result += `${years} ปี `;
      if (months > 0) result += `${months} เดือน`;
    } else if (months > 0) {
      result += `${months} เดือน `;
      if (days > 0) result += `${days} วัน`;
    } else if (days > 0) {
      result += `${days} วัน `;
      if (hours > 0) result += `${hours} ชั่วโมง `;
      // if (minutes > 0) result += `${minutes} นาที`;
    } else if (hours > 0) {
      result += `${hours} ชั่วโมง `;
      if (minutes > 0) result += `${minutes} นาที`;
    } else if (minutes > 0) {
      result += `${minutes} นาที`;
    } else {
      result = "หมดเวลา";
    }

    if (years < 0 || months < 0 || days < 0 || hours < 0 || minutes < 0) {
      result = "หมดเวลา";
    }

    return {
      expireDate: result,
      remainingDays: remainingDays,
    };
  }

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getCardLevel`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let temp = [];

    response.data.data.forEach((res, index) => {
      let newData = {
        ...res,
        img: `/images/subscribe_payment/courseLv${res.level}.png`,
        isExpireCourse: true,
        isHaveCourse: false,
        isSeletedCourse: false,
        progress: 0,
        courseId: "",
        expireDate: 0,
        remainingTime: "",
        remainingDays: 0,
      };

      let findCourse = courseStore.list.find((x) => x.level == res.level);

      if (findCourse) {
        let remainingTime = 0;

        newData.isHaveCourse = true;
        newData.progress = findCourse.progressAVG;
        newData.courseId = findCourse.courseId;

        if (findCourse.expireDate) {
          newData.setExpireDate = {
            ...findCourse.expireDate,
            fullDate: `${findCourse.expireDate.year} ปี ${
              month_th_mini[findCourse.expireDate.month]
            } `,
          };

          remainingTime = calculateRemainingTime(findCourse.expireDate);

          if (remainingTime.remainingDays > 0) {
            newData.isExpireCourse = false;
          }
        }

        newData.remainingTime = remainingTime.expireDate;
        newData.remainingDays = remainingTime.remainingDays;
      }

      temp.push(newData);
    });

    courseCardData.value = temp;
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const funcLoadBanner = async () => {
  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getBanner`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let temp = [];

    response.data.data.forEach((res) => {
      let newData = {
        ...res,
      };

      temp.push(newData);
    });

    bannerList.value = temp;
  } catch (e) {
    console.log(e);
    alert(e);
  }
};

const funcKeepCouponCode = async (data) => {
  const studentStore = useStudentStore();

  $q.loading.show();

  const POSTDATA = {
    uid: studentStore.studentId,
    coupon: data,
  };

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-keepCouponCode`;

    const response = await axios.post(APIURL, POSTDATA);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    if (data.isKeepCode == false) {
      data.isKeepCode = true;
    }

    keepCodeList.value.push(data);

    studentStore.addCouponCode(data);

    $q.loading.hide();
  } catch (e) {
    console.log(e);
    alert(e);
    setTimeout(() => {
      $q.loading.hide();
    }, 500);
  }
};

// const funcAddCourse = async () => {
//   $q.loading.show();

//   const studentStore = useStudentStore();
//   const courseStore = useCourseStore();

//   const POSTDATA = {
//     studentId: studentStore.studentId,
//     courseList: bucket.value,
//     paymentBy: purchasedBy.value,
//     coupons: useCouponCodes.value,
//   };

//   try {
//     const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-addCourse`;

//     const response = await axios.post(APIURL, POSTDATA);

//     if (response.data.message != "success") {
//       throw new Error(response.data.message);
//     }

//     bucket.value = [];

//     isClearBucket.value = true;

//     await courseStore.getAllCourse();

//     if (courseStore.courseLevel == 0 || !courseStore.courseLevel) {
//       let courseData = courseStore.list[0];

//       await funcSetCourseLevel(courseData);
//     }

//     courseCardData.value.forEach((res) => {
//       res.isSeletedCourse = false;
//     });

//     keepCodeList.value.forEach((res) => {
//       let findCode = useCouponCodes.value.find((x) => x.code == res.code);
//       if (findCode) {
//         res.isUseCode = true;
//       }
//     });

//     studentStore.removeCouponCode(useCouponCodes.value);

//     await funcLoadCardLevel();
//     await studentStore.getStudentData();

//     filterCourse("all");
//   } catch (e) {
//     console.log(e);
//     alert(e);
//     setTimeout(() => {
//       $q.loading.hide();
//     }, 500);
//   }
// };

const funcSetCourseLevel = async (course) => {
  const systemStore = useSystemStore();
  const practiceStore = usePracticeStore();

  systemStore.setParameter({
    level: course.level,
  });

  // practiceStore.setLockPracticeData(item);
  practiceStore.setPracticeUnit("1");
  practiceStore.setPracticelevel(course.level);
  await studentStore.updateCurrentCourseId(course.courseId);
  practiceStore.practiceUpdateByLevel();
  await practiceStore.getPracticeLog();
  // practiceStore.clearPracticeComplete();
};

let tempSetTimeOut = null;
const handleSwipe = (e) => {
  funcClearTimer();

  if (e.direction == "left" || e.direction == "right") {
    if (!$q.platform.is.desktop) {
      if (e.direction == "left") {
        if (selectedBanner.value == bannerList.value.length - 1) {
          selectedBanner.value = 0;
        } else {
          selectedBanner.value++;
        }
      } else {
        if (selectedBanner.value == 0) {
          selectedBanner.value++;
        } else {
          selectedBanner.value--;
        }
      }
    }

    bannerData.value = bannerList.value[selectedBanner.value];

    tempSetTimeOut = setTimeout(() => {
      funcDialogRuning();
    }, 10000);
  }
};

let timer = null;
const funcDialogRuning = () => {
  funcClearTimer();

  bannerData.value = bannerList.value[selectedBanner.value];

  timer = setInterval(() => {
    if (selectedBanner.value + 1 == bannerList.value.length) {
      selectedBanner.value = 0;
    } else {
      selectedBanner.value++;
    }

    bannerData.value = bannerList.value[selectedBanner.value];
  }, 5000);
};

const funcClearTimer = () => {
  if (tempSetTimeOut) clearTimeout(tempSetTimeOut);
  if (timer) clearInterval(timer);
};

onMounted(async () => {
  window.addEventListener("scroll", handleScroll);
  updateGridLayout();
  window.addEventListener("resize", updateGridLayout);
  document.documentElement.style.overflowX = "hidden";

  // $router.replace("/lobby");

  $q.loading.show();

  await funcLoadCouponCode();
  await funcLoadCardLevel();
  await funcLoadBanner();

  filterCourse("all");

  sortCodeList();

  funcDialogRuning();

  setTimeout(() => {
    $q.loading.hide();
  }, 500);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", updateGridLayout);
});
</script>

<style lang="scss" scoped>
/* Add the push effect animation */
.clickable {
  transition: transform 0.2s ease;
}

.clickable:active {
  transform: scale(0.95); /* Simulate the push effect by shrinking the button */
}

.background-lobby {
  width: 100vw;
  height: 100vh;
  background-image: url("/images/background_main/background-lobby-default.png");
  background-position: 60% 0%;
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
}

.container {
  display: flex;
  padding: 16px 0px 24px 0px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
}

.container.purchased {
  padding: 16px 0px 96px 0px; /* Bottom padding stays */
}

.sub-content {
  width: 100%;
  max-width: 1440px;
  margin-bottom: 0;
  padding-bottom: 0;

  @media screen and (max-width: 1440px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media screen and (max-width: 720px) {
    padding-left: 16px;
    padding-right: 16px;
  }

  @media screen and (max-width: 480px) {
    padding-left: 8px;
    padding-right: 8px;
  }
}

.textShadow {
  color: white;
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

.btn-package-active {
  color: white;
  border-radius: 10px;
  background: #4a261b;
  height: 40px;
}

.btn-pakage-none-active {
  color: white;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.25);
  height: 40px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-image: url("/images/your-background-image.png"); /* Replace with your image */
  background-size: cover; /* Makes the background cover the full area */
  background-position: center; /* Centers the background image */
  background-repeat: no-repeat; /* Prevents repeating */
  z-index: -1; /* Places the background behind other content */
}

ol {
  list-style-type: decimal; /* Keep numbers */
  list-style-position: outside; /* Numbers stay outside the content */
  margin: 0; /* Remove margins */
  padding-left: 20px;
}

// to custom placeHolder with code input-------------------
input::placeholder {
  font-size: 12px; /* Set your desired font size */
}

/* Webkit Scrollbar */
.custom-scroll-container::-webkit-scrollbar {
  width: 0px; /* Scrollbar width */
  background-color: transparent; /* Transparent track */
}

.custom-scroll-container::-webkit-scrollbar {
  display: none; /* ซ่อน Scrollbar */
}

/* สำหรับ Firefox */
.custom-scroll-container {
  scrollbar-width: none; /* ซ่อน Scrollbar */
  -ms-overflow-style: none; /* สำหรับ IE */
  scrollbar-color: transparent transparent; /* For Firefox */
}

/* Scrollbar Thumb */
.custom-scroll-container::-webkit-scrollbar-thumb {
  background-color: #4a261b; /* Scroll thumb color */
  border-radius: 8px; /* Adds rounded corners */
  border: 2px solid #efd080; /* Matches container background */
}

/* Scrollbar Thumb Hover */
.custom-scroll-container::-webkit-scrollbar-thumb:hover {
  background-color: #734a2b; /* Darker color on hover */
}

/* Scrollbar Track */
.custom-scroll-container::-webkit-scrollbar-track {
  background-color: transparent; /* Transparent track */
  border-radius: 8px; /* Rounded corners for track */
}

/* Hide Scrollbar Buttons */
.custom-scroll-container::-webkit-scrollbar-button {
  display: none; /* Removes arrows */
}

.content {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  gap: 4px; /* Add a gap of 4px between items */
}

.item {
  padding: 8px 16px;
  background-color: #fff;
  text-align: center;
  white-space: nowrap; /* Prevent text wrapping */
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* Single column layout */
  grid-template-rows: auto; /* Stacks rows */
  padding: clamp(8px, 0.5vw, 8px);
  height: clamp(100px, 22vw, 370px);
  min-width: 344px;
  width: 100%;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: clamp(12px, 1.4vw, 24px);
  border: 4px solid #5b3018;
  background: #3a1604;

  @media screen and (max-width: 1023px) {
    margin: auto;
    // max-height: 144px;
    // max-height: 386px;
    height: 37.8cqw;
  }
}

/* Grid Layout for Larger Screens (Image 2) */
.grid-container.wide-layout {
  grid-template-columns: 1fr 448px;
  grid-template-rows: auto; /* Single row */
  // max-height: 384px;
  // height: 26.7cqw;
}

@media screen and (max-width: 1024px) {
  .container {
    align-items: start;
  }
}

.box-success-purchased {
  display: flex;
  width: 320px;
  max-width: 320px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #f2c043;

  & .sub {
    display: flex;
    padding: 32px 8px 16px 8px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: #ffedc4;
    color: #4a261b;
  }
}

.box-error-purchased {
  display: flex;
  width: 320px;
  max-width: 320px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #f2c043;

  & .sub {
    display: flex;
    padding: 32px 8px 16px 8px;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: #ffedc4;
  }
}

.button-banner-circle {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 12px 4px;
  background: #3a1604;
  opacity: 0.5;

  &.select {
    background: #3a1604;
    opacity: 1;
  }
}
</style>
