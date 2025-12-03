<template>
  <!-- #region Dialog Package Code -->
  <q-dialog
    maximized
    v-model="isShowDialogPackageCode"
    persistent
    :seamless="isSeamless"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
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
                <div
                  align="left"
                  v-if="
                    $route.name != 'placement-main' &&
                    $route.name != 'register-main'
                  "
                >
                  <span class="f12 font-mali-m">
                    โค้ด Gift Card (redeem code)
                  </span>
                </div>
                <div>
                  <div
                    class="q-mt-md"
                    v-if="
                      $route.name == 'placement-main' ||
                      $route.name == 'register-main'
                    "
                  ></div>
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
                <div class="col q-pr-xs" align="center">
                  <q-img
                    class="cursor-pointer"
                    width="100%"
                    src="images/button_main/button-previous.png"
                    @click="funcBackToPackageMenu()"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
                <div class="col q-pl-xs">
                  <q-img
                    class="cursor-pointer"
                    width="100%"
                    src="images/button_main/button-confirm-short.png"
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
            @click="funcCloseDialog()"
          >
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
            ></q-img>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Package Details -->
  <q-dialog
    maximized
    v-model="isShowDialogPackageDetail"
    persistent
    :seamless="isSeamless"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container relative-position">
          <div class="box-dialog-sub">
            <div class="q-py-md" align="center">
              <span class="font-mali-b f20">{{
                `${
                  selectedPackageCodeList == "paid"
                    ? "รับแพ็กเกจจากโค้ด"
                    : "รับแพ็กเกจทดลองเรียน"
                }`
              }}</span>
            </div>

            <div class="box-dialog-details">
              <div align="center">
                <span class="f16 font-mali-b">รายการที่จะได้รับ</span>
              </div>
              <div class="q-mt-sm">
                <div>
                  <span class="f16 font-mali-b">{{
                    `Package : ${
                      selectedPackageCodeList == "paid"
                        ? packageData.package
                        : "Demo"
                    }`
                  }}</span>
                </div>
              </div>
              <div
                class="row q-mt-sm f12 font-mali-m"
                v-if="selectedPackageCodeList == 'paid'"
              >
                <div class="col">
                  <span class="">ราคาแพ็กเกจ</span>
                </div>
                <div class="col" align="right">
                  {{ `฿ ${packageData.price}` }}
                </div>
              </div>
            </div>
            <div class="q-mt-lg row justify-between" align="center">
              <div class="col q-pr-xs">
                <q-img
                  width="100%"
                  class="cursor-pointer"
                  src="/images/button_main/button-previous.png"
                  @click="funcBackToPackageCodeDialog()"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="col q-pl-xs">
                <q-img
                  width="100%"
                  class="cursor-pointer"
                  src="/images/button_main/button-confirm-package.png"
                  @click="funcConfirmPackageCode()"
                  no-spinner
                  no-transition
                ></q-img>
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
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container relative-position">
          <div class="box-dialog-sub q-py-sm text-content">
            <div align="center" class="q-py-md">
              <span class="title-dialog font-mali-b f20"
                >ช่องทางการได้รับโค้ด</span
              >
            </div>
            <div class="box-dialog-details font-mali-m">
              <div class="q-px-sm">
                <span class="f12">ช่องทางการได้รับโค้ดแพ็กเกจ</span>
              </div>

              <div class="q-my-sm" align="center">
                <div>
                  <q-img
                    class="cursor-pointer"
                    width="100%"
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
                    width="100%"
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
                width="100%"
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
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog First Menu by Placement  -->
  <q-dialog
    maximized
    v-model="isShowDialogFirstMenu"
    persistent
    :seamless="isSeamless"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container first-menu relative-position">
          <div class="box-dialog-sub first-menu">
            <div class="q-py-sm" align="center">
              <span class="font-mali-b f18">เลือกทดลองเรียน/รับแพ็กเกจ</span>
            </div>

            <div class="q-pa-xs">
              <div class="q-my-xs">
                <q-img
                  class="cursor-pointer button-focus"
                  src="/images/payments_main/payment-banner-demo-mobile.png"
                  @click="funcSelectedPackage('demo')"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <div class="q-my-xs">
                <q-img
                  class="cursor-pointer button-focus"
                  src="/images/payments_main/payment-banner-redeem-mobile.png"
                  @click="funcSelectedPackage('paid')"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>

          <!-- Button Close Dialog -->
          <q-btn
            class="absolute-top-right"
            v-if="isShowBtnClose"
            round
            flat
            style="top: -15px; right: -15px"
            @click="funcCloseDialog()"
          >
            <q-img
              src="/images/icon_main/icon-close.png"
              no-spinner
              no-transition
            ></q-img>
          </q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <dialog-loading :isShowLoading="isShowLoading"></dialog-loading>
</template>

<script>
import dialogLoading from "components/dialog-loading.vue";
import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import { useRoute } from "vue-router";
import { useStudentStore } from "src/stores/student";
export default {
  props: {
    isSeamless: {
      type: Boolean,
      default: false,
    },
    isMaximized: {
      type: Boolean,
      default: true,
    },
    isPaymentMethod: {
      type: Boolean,
      default: false,
    },
    isShowBtnClose: {
      type: Boolean,
      default: true,
    },
    isHasSelected: {
      type: Boolean,
      default: false,
    },
    isRegister: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    dialogLoading,
  },
  setup(props, { emit }) {
    // Initialze variable
    const $q = useQuasar();
    const $route = useRoute();
    const isShowLoading = ref(false);

    const isShowDialogPackageCode = ref(false);
    const isShowDialogPackageDetail = ref(false);
    const isShowDialogFirstMenu = ref(false);

    const packageData = ref({
      package: "",
      price: 0,
      codeId: "",
    });

    const selectedPackageCodeList = ref("paid");
    const packageCode = ref("");

    const isValidatePackageCode = ref(false);

    const funcCheckPackageCode = async () => {
      try {
        if (packageCode.value == "") {
          isValidatePackageCode.value = true;
          return;
        }

        isShowLoading.value = true;
        isShowDialogPackageCode.value = false;
        isValidatePackageCode.value = false;
        const studentStore = useStudentStore();
        const studentId = studentStore.studentId;



        let APIURL = `${process.env.NEWAPI}/odysseyRegister-checkRedeemCode`;

        let params = {
          code: packageCode.value,
          type: selectedPackageCodeList.value,
          studentId: studentId,
        };

        let response = await axios.get(APIURL, { params: params });

        if (response.data == "code is used") {
          $q.notify({
            message: "โค้ดนี้ถูกใช้ไปแล้ว",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        } else if (response.data == "code not found") {
          $q.notify({
            message: "รหัสโค้ดไม่ถูกต้อง",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        } else if (response.data == "code not match type") {
          $q.notify({
            message: "โค้ดไม่ตรงกับประเภท",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        } else if (response.data == "code is expired") {
          $q.notify({
            message: "โค้ดหมดอายุแล้ว",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        } else if (response.data == "Duplicate Demo Code") {
          $q.notify({
            message: "มีการใช้งานแพ็กเกจทดลองเรียนแล้ว",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        }else if (response.data == "Already paid cannot use demo code"){
          $q.notify({
            message: "มีแพ็กเกจอยู่แล้ว ไม่สามารถใช้โค้ดทดลองเรียนได้",
            color: "negative",
            position: "top",
            timeout: 2000,
          });
          isValidatePackageCode.value = true;
          isShowDialogPackageCode.value = true;
          isShowLoading.value = false;
          return;
        }

        packageData.value = response.data;

        isShowLoading.value = false;
        isValidatePackageCode.value = false;
        isShowDialogPackageDetail.value = true;
        isShowLoading.value = false;
      } catch (e) {
        isShowDialogPackageCode.value = true;
        isShowLoading.value = false;
        isValidatePackageCode.value = false;
        // console.log(e);
      }
    };

    const funcBackToPackageMenu = () => {
      isShowDialogPackageCode.value = false;
      if ($route.name != "lobby-main") {
        isShowDialogFirstMenu.value = true;
        return;
      }
      console.log("x");

      emit("callback-backToPackageMenu", true);
    };

    const funcBackToPackageCodeDialog = () => {
      packageCode.value = "";
      isShowDialogPackageDetail.value = false;
      if (selectedPackageCodeList.value == "paid") {
        isShowDialogPackageCode.value = true;
      } else {
        isShowDialogFirstMenu.value = true;
      }
    };

    const funcConfirmPackageCode = async () => {
      try {
        isShowLoading.value = true;
        isShowDialogPackageDetail.value = false;

        const studentStore = useStudentStore();

        let APIURL;
        let type;
        let stage = "";

        if (selectedPackageCodeList.value == "demo") {
          APIURL = `${process.env.NEWAPI}/odysseyRegister-useDemoCode`;
        } else {
          APIURL = `${process.env.NEWAPI}/odysseyRegister-usePaidCode`;
        }

        if ($route.name == "register-main" || $route.name == "placement-main") {
          stage = "show-select-level";
        } else {
          stage = "finish-selected-level";
        }

        let POSTDATA = {
          codeId: packageData.value.codeId,
          studentId: studentStore.studentId,
          stage: stage,
          statusComplete: {
            ...studentStore.studentData.statusComplete,
            isUsePackageCodeComplete: true,
          },
        };

        let response = await axios.post(APIURL, POSTDATA);

        type = response.data.type;

        if (response.data == "error") {
          throw new Error("error");
        }
        type = response.data.type;

        studentStore.setExpireDate({ ...response.data, type: type });

        isShowLoading.value = false;
        emit("callback-usePackageCodeComplete");
      } catch (e) {
        // console.log(e);
        isShowDialogPackageDetail.value = true;
        isShowLoading.value = false;
      }
    };

    const funcCloseDialog = () => {
      emit("callback-closeDialog");
    };

    const funcOpenFacebook = () => {
      window.open("https://www.facebook.com/WinnerEng", "_blank");
    };

    const funcOpenLine = () => {
      window.open("https://line.me/R/ti/p/@290hllal", "_blank");
    };

    const isShowDialogHowToGetCode = ref(false);
    const funcShowDialogHowToGetCode = () => {
      isShowDialogPackageCode.value = false;
      isShowDialogHowToGetCode.value = true;
    };

    const funcBackToDialogPackageCode = () => {
      // isUseGiftCardPackage.value = false;
      isShowDialogPackageDetail.value = false;
      isShowDialogHowToGetCode.value = false;
      isShowDialogPackageCode.value = true;
    };

    const funcSelectedPackage = (type) => {
      selectedPackageCodeList.value = type;
      isShowDialogFirstMenu.value = false;
      if (type == "paid") {
        isShowDialogPackageCode.value = true;
      } else {
        packageData.value.codeId = "tTXsyZCOrP50uUlY0sil";
        isShowDialogPackageDetail.value = true;
        // funcConfirmPackageCode();
      }
    };

    onMounted(() => {
      if ($route.name == "register-main" || $route.name == "placement-main") {
        isShowDialogFirstMenu.value = true;
      } else {
        isShowDialogFirstMenu.value = false;
        isShowDialogPackageCode.value = true;
      }
    });

    return {
      // Data
      packageData,
      packageCode,
      selectedPackageCodeList,

      // Function
      funcCheckPackageCode,
      funcConfirmPackageCode,
      funcBackToPackageMenu,
      funcCloseDialog,
      funcBackToPackageCodeDialog,
      funcShowDialogHowToGetCode,
      funcBackToDialogPackageCode,
      funcOpenFacebook,
      funcOpenLine,
      funcSelectedPackage,

      // Boolean
      isShowLoading,
      isShowDialogPackageCode,
      isShowDialogPackageDetail,
      isShowDialogHowToGetCode,
      isShowDialogFirstMenu,

      // Validate
      isValidatePackageCode,
    };
  },
};
</script>

<style lang="scss" scoped>
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

.box-payment-card {
  min-width: fit-content;
  max-width: 270px;
  width: 100%;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #4a261b;
  overflow: hidden;
}

.box-payment-card .payment-header {
  height: 60px;
  background-color: #ffc01c;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px,
    rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px,
    rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px,
    rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px,
    rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px,
    rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px,
    rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px,
    rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px,
    rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px,
    rgb(74, 38, 27) 2.44769px -1.73459px 0px,
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
  max-width: 250px;
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

.box-input-register.disabled {
  border: 1px solid #553329;
  background-color: rgba(255, 255, 255, 0.5);
  color: #939393;
}

.box-input-register-error {
  border: 1px solid #f00;
}

.title-dialog {
  color: #4a261b;
}

.text-content {
  color: #4e1617;
}

.button-focus {
  transition: 0.3s;
}
.button-focus:hover {
  transform: scale(0.95);
  transition: 0.5s;
}
// #region register form
</style>
