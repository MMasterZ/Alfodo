<template>
  <div>
    <q-dialog
      v-model="isShowPaymentDialog"
      persistent
      @hide="$emit('closeDialog')"
    >
      <q-card style="max-width: 1000px; width: 100%">
        <q-toolbar class="bg-amber">
          <q-btn @click="backStep()" flat icon="fas fa-arrow-left"></q-btn>
          <q-space></q-space>
          <q-toolbar-title class="text-center"> ซื้อคอร์ส </q-toolbar-title>
          <q-space></q-space>
          <u>ประวัติการซื้อ</u>
        </q-toolbar>
        <template v-if="paymentStep == 'selectCourse'">
          <q-card-section style="background-color: #f2f3f5">
            <div style="max-width: 450px; width: 100%; margin: auto" class="">
              <q-input
                style="font-size: 24px; padding: 8px"
                prefix="฿"
                outlined
                v-model="balance"
              >
                <template v-slot:append>
                  <q-btn
                    style="background-color: #ffca40"
                    icon="fas fa-plus"
                    label="เติมเงิน"
                    @click="paymentStep = 'TopUp'"
                  ></q-btn>
                </template>
              </q-input>
            </div>
          </q-card-section>
          <q-card-section class="bg-white">
            <div style="max-width: 450px; width: 100%; margin: auto" class="">
              <div>
                <div class="row justify-between q-pb-xs">
                  <div class="col">เลือกระดับการเรียน</div>
                  <div class="col text-right">
                    <u class="text-blue">ดูเนื้อหา</u>
                  </div>
                </div>
                <q-select
                  :options="levelOptions"
                  outlined
                  dense
                  v-model="selectedLevel"
                ></q-select>
              </div>
            </div>
          </q-card-section>

          <div class="q-px-lg q-py-md">
            <div
              class="border-dashed"
              style="width: 80%; height: 1px; margin: auto"
            ></div>
          </div>

          <q-card-section>
            <div style="max-width: 450px; width: 100%; margin: auto" class="">
              <div class="q-pb-xs">เลือกคอร์สเรียน</div>

              <div class="row">
                <div class="col-6" v-for="(course, index) in courseOptions">
                  <q-card
                    class="flex cursor-pointer card-hover"
                    style="width: 90%; margin: auto; border-radius: 10px"
                    @click="chooseCourse(course, index)"
                    :class="{ 'active-card-border': index == activeCardIndex }"
                  >
                    <div
                      style="height: 160px; width: 100%"
                      class="flex flex-center"
                    >
                      <div class="text-center" style="width: 100%">
                        <div
                          class="f14 text-right relative-position"
                          style="
                            padding-right: 50px;
                            bottom: -20px;
                            text-decoration: line-through;
                            text-decoration-color: red;
                          "
                        >
                          ฿{{ course.discountFrom }}
                        </div>
                        <div style="font-size: 48px" class="text-weight-bolder">
                          ฿{{ course.price }}
                        </div>
                        <div
                          style="
                            border-radius: 20px;
                            background-color: #e7e7e7;
                            width: 130px;
                            margin: auto;
                          "
                          class="text-weight-bold"
                        >
                          ประหยัด {{ course.save }}
                        </div>
                      </div>
                    </div>
                    <div
                      class="flex flex-center text-weight-bold"
                      style="font-size: 32px; width: 100%; height: 80px"
                      :class="{
                        'active-card-color': index == activeCardIndex,
                        'inactive-card-color': index != activeCardIndex,
                      }"
                    >
                      {{ course.unit }}
                    </div>
                  </q-card>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- Next btn choose course -->
          <q-card-actions align="center" class="q-pb-xl q-pt-lg">
            <q-btn
              label="ต่อไป"
              color="amber"
              text-color="black"
              style="max-width: 320px; width: 100%; margin: auto"
              @click="paymentStep = 'confirm course'"
            ></q-btn>
          </q-card-actions>
        </template>

        <template v-if="paymentStep == 'TopUp'">
          <div class="q-pa-md">
            <div
              class="q-px-md"
              style="
                border: 1px solid #bdbdbd;
                border-radius: 5px;
                max-width: 450px;
                width: 100%;
                margin: auto;
              "
            >
              <q-card-section>
                <div style="width: 100%">
                  <div>เลือกวิธีการเติมเงิน</div>

                  <div class="row q-pt-sm">
                    <!-- Credit Card -->
                    <div class="col-4">
                      <div
                        style=""
                        class="row items-center justify-center card-hover"
                        @click="choosePaymentMethod('Credit Card')"
                        :class="{
                          'active-payment-method':
                            paymentMethod == 'Credit Card',
                          'inactive-payment-method':
                            paymentMethod != 'Credit Card',
                        }"
                      >
                        <div
                          class="col-12 text-center"
                          style="padding: 15px 0px"
                        >
                          <q-icon
                            style="font-size: 27px"
                            name="fas fa-credit-card"
                          ></q-icon>
                        </div>

                        <div
                          class="col-12 text-center f16 q-pb-md text-weight-bold"
                        >
                          Credit Card
                        </div>
                      </div>
                    </div>
                    <!-- QR Code -->
                    <div class="col-4 q-px-xs">
                      <div
                        style=""
                        class="row items-center justify-center card-hover"
                        @click="choosePaymentMethod('QR Code')"
                        :class="{
                          'active-payment-method': paymentMethod == 'QR Code',
                          'inactive-payment-method': paymentMethod != 'QR Code',
                        }"
                      >
                        <div
                          class="col-12 text-center"
                          style="padding: 15px 0px"
                        >
                          <q-icon
                            style="font-size: 27px"
                            name="fas fa-qrcode"
                          ></q-icon>
                        </div>

                        <div
                          class="col-12 text-center f16 q-pb-md text-weight-bold"
                        >
                          QR Code
                        </div>
                      </div>
                    </div>
                    <!-- Redeem Code -->
                    <div class="col-4">
                      <div
                        style=""
                        class="row items-center justify-center card-hover"
                        @click="choosePaymentMethod('Redeem Code')"
                        :class="{
                          'active-payment-method':
                            paymentMethod == 'Redeem Code',
                          'inactive-payment-method':
                            paymentMethod != 'Redeem Code',
                        }"
                      >
                        <div
                          class="col-12 text-center"
                          style="padding: 15px 0px"
                        >
                          <q-icon
                            style="font-size: 27px"
                            name="fas fa-gift"
                          ></q-icon>
                        </div>

                        <div
                          class="col-12 text-center f16 q-pb-md text-weight-bold q-px-xs"
                        >
                          Redeem Code
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-separator></q-separator>

              <!-- QR CODE SECTION -->
              <q-card-section v-if="paymentMethod == 'QR Code'">
                <div
                  style="max-width: 450px; width: 100%; margin: auto"
                  v-if="!isCompleteCharge"
                >
                  <div>Amount</div>
                  <q-input
                    outlined
                    v-model.number="qrAmount"
                    dense
                    bg-color="grey-2"
                  >
                  </q-input>

                  <div class="text-center">
                    <q-img
                      v-if="qrUrl"
                      :src="qrUrl"
                      style="width: 300px"
                    ></q-img>
                  </div>
                </div>
                <div v-else>
                  <div class="" style="font-size: 40px">ชำระเงินสำเร็จ</div>
                </div>
              </q-card-section>
              <q-card-actions align="center" v-if="paymentMethod == 'QR Code'">
                <q-btn
                  label="ต่อไป"
                  color="amber"
                  text-color="black"
                  style="max-width: 320px; width: 100%; margin: auto"
                  @click="generateQrPayment()"
                ></q-btn>
              </q-card-actions>

              <!-- Credit Card Section -->
              <q-card-section v-if="paymentMethod == 'Credit Card'">
                <div style="max-width: 450px; width: 100%; margin: auto">
                  <div class="q-gutter-sm">
                    <!-- Amount -->
                    <div>
                      <div>Amount</div>
                      <q-input
                        dense
                        bg-color="grey-2"
                        outlined
                        v-model="creditAmount"
                      >
                      </q-input>
                    </div>
                    <!-- Card Number -->
                    <div>
                      <div>Card number</div>
                      <q-input
                        dense
                        bg-color="grey-2"
                        outlined
                        v-model="cardNumber"
                      >
                      </q-input>
                    </div>
                    <!-- Name on card -->
                    <div>
                      <div>Name on card</div>
                      <q-input
                        dense
                        bg-color="grey-2"
                        outlined
                        v-model="cardName"
                      >
                      </q-input>
                    </div>
                    <!-- Expire date // Security Code -->

                    <div class="row">
                      <div class="col-4">
                        <div>Expire date</div>
                        <q-input
                          dense
                          bg-color="grey-2"
                          outlined
                          v-model="expirationMonth_year"
                          mask="##/##"
                          placeholder="mm/yy"
                        >
                        </q-input>
                      </div>
                      <div class="col-4 offset-1">
                        <div>Security code</div>
                        <q-input
                          dense
                          bg-color="grey-2"
                          outlined
                          v-model="securityCode"
                          mask="###"
                        >
                          <template v-slot:append>
                            <q-icon
                              size="xs"
                              color="grey"
                              name="fas fa-question-circle"
                            ></q-icon>
                          </template>
                        </q-input>
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <!-- Redeem code -->
              <q-card-section v-if="paymentMethod == 'Redeem Code'">
                <div style="max-width: 450px; width: 100%; margin: auto">
                  <div>
                    <div>Code</div>
                    <div class="row items-center">
                      <div class="col">
                        <q-input
                          dense
                          bg-color="grey-2"
                          outlined
                          v-model="redeemCodeText"
                          @update:modelValue="checkGiftCode()"
                          debounce="1000"
                        >
                        </q-input>
                      </div>
                      <!-- <div style="width: 120px" align="right" class="q-pl-md">
                        <q-btn
                          label="Redeem"
                          text-color="black"
                          color="amber"
                          @click="redeemCode()"
                        ></q-btn>
                      </div> -->
                    </div>

                    <div class="row q-pt-md f16">
                      <div class="col">Redeem Code Value</div>
                      <div class="">฿{{ giftCodeValueDisplay }}</div>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </div>
          </div>

          <!--  Credit Card Button -->
          <q-card-actions align="center" v-if="paymentMethod == 'Credit Card'">
            <q-btn
              label="ยืนยัน"
              color="amber"
              text-color="black"
              style="max-width: 320px; width: 100%; margin: auto"
              @click="createCreditCardToken()"
            ></q-btn>
          </q-card-actions>

          <q-card-actions v-if="paymentMethod == 'Redeem Code'">
            <q-btn
              label="ยืนยัน"
              color="amber"
              text-color="black"
              style="max-width: 320px; width: 100%; margin: auto"
              @click="redeemCode()"
            ></q-btn>
          </q-card-actions>
        </template>

        <template v-if="paymentStep == 'confirm course'">
          <q-card-section>
            <div class="q-pa-md">
              <div
                style="
                  border: 1px solid #bdbdbd;
                  border-radius: 5px;
                  max-width: 450px;
                  width: 100%;
                  margin: auto;
                  padding: 20px;
                "
              >
                <div class="text-center f16 text-weight-bold">
                  รายการคำสั่งซื้อ
                </div>
                <div class="row" style="margin-top: 20px">
                  <div class="col text-left">คอร์สเรียนภาษาอังกฤษ</div>
                  <div class="col text-right">
                    {{ selectedLevel }} {{ selectedCourse.unit }}
                  </div>
                </div>

                <div class="row" style="margin-top: 20px">
                  <div class="col text-left">ราคาคอร์ส</div>
                  <div class="col text-right">฿ {{ selectedCourse.price }}</div>
                </div>

                <div class="q-pt-md">
                  <div
                    class="border-dashed"
                    style="width: 100%; height: 1px; margin: auto"
                  ></div>
                </div>

                <div class="row" style="margin-top: 20px">
                  <div class="col text-left">คอร์สเรียนภาษาอังกฤษ</div>
                  <div class="col text-right">฿ {{ selectedCourse.price }}</div>
                </div>

                <div class="row" style="margin-top: 20px">
                  <div class="col text-left">ส่วนลด</div>
                  <div class="col text-right">-</div>
                </div>

                <div class="q-pt-md">
                  <div
                    class="border-dashed"
                    style="width: 100%; height: 1px; margin: auto"
                  ></div>
                </div>

                <div class="row f20 text-weight-bold" style="margin-top: 20px">
                  <div class="col text-left">ยอดชำระเงินทั้งหมด</div>
                  <div class="col text-right">฿ {{ selectedCourse.price }}</div>
                </div>

                <div class="row f14">
                  <div class="col text-left">ราคารวมภาษีมูลค่าเพิ่มแล้ว</div>
                </div>
              </div>
            </div>
          </q-card-section>

          <!-- ปุ่นยืนยันการซื้อคอร์ส แบบเลือกคอร์ส -->
          <q-card-actions align="center" style="padding-bottom: 35px">
            <q-btn
              label="ยืนยันการซื้อ"
              color="amber"
              text-color="black"
              style="max-width: 320px; width: 100%; margin: auto"
              @click="confirmBuyCourse()"
            ></q-btn>
          </q-card-actions>
        </template>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { axios } from "src/boot/axios";
import { auth, db } from "src/router";
import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";

export default {
  props: ["isShowPaymentDialog"],
  emits: ["closeDialog"],
  setup() {
    const paymentStep = ref("confirm course");
    const $q = useQuasar();
    const balance = ref(0);
    const selectedLevel = ref("ระดับที่ 7");
    const levelOptions = ref(["ระดับที่ 7", "ระดับที่ 8"]);
    const courseOptions = ref([
      {
        price: 350,
        discountFrom: 600,
        save: "35%",
        unit: "บทที่ 1-4",
      },
      {
        price: 1200,
        discountFrom: 2400,
        save: "50%",
        unit: "บทที่ 1-16",
      },
    ]);
    const activeCardIndex = ref(null);
    const selectedCourse = ref("");
    const chooseCourse = (course, index) => {
      // console.log(course);
      activeCardIndex.value = index;
      selectedCourse.value = course;
    };

    const paymentMethod = ref("Redeem Code");
    const qrAmount = ref(0);
    const choosePaymentMethod = (method) => {
      paymentMethod.value = method;
    };

    const generateQrPayment = async () => {
      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/payment-createSource";

      const source = await axios.post(url, {
        amount: qrAmount.value * 100,
      });

      const sourceId = source.data.id;

      charge(sourceId, source.data.amount);
    };

    const qrUrl = ref("");

    let chargeId = ref("");
    const charge = async (sourceId, amount) => {
      // console.log("amount: ", amount);
      // console.log("sourceId: ", sourceId);

      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/payment-charge";
      const charge = await axios.post(url, {
        sourceId: sourceId,
        amount: amount,
      });

      qrUrl.value = charge.data.source.scannable_code.image.download_uri;
      chargeId.value = charge.data.id;

      listenPayment();
    };

    // Credit Card
    const creditAmount = ref(0);
    const cardNumber = ref("4242424242424242");
    const cardName = ref("John Doe");
    const expirationMonth_year = ref("12/22");
    const securityCode = ref(123);

    const createCreditCardToken = async () => {
      $q.loading.show();
      const month = expirationMonth_year.value.split("/")[0];
      const year = expirationMonth_year.value.split("/")[1];

      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/payment-createToken";
      const token = await axios.post(url, {
        name: cardName.value,
        number: cardNumber.value,
        expiration_month: month,
        expiration_year: year,
        security_code: securityCode.value,
      });
      const tokenId = token.data.id;
      $q.loading.hide();

      chargeByToken(tokenId);
    };

    const chargeByToken = async (tokenId) => {
      $q.loading.show();
      const chargeUrl =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/payment-chargeByToken";
      const $studentStore = useStudentStore();

      const response = await axios.post(chargeUrl, {
        amount: creditAmount.value * 100,
        tokenId: tokenId,
        studentId: $studentStore.studentId,
      });

      const authorizeUri = response.data.authorize_uri;

      window.open(authorizeUri, "_self");

      $q.loading.hide();
    };

    // Update Cash From QR Payment
    const updateStudentCash = async () => {
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;
      auth.currentUser.getIdToken().then((idToken) => {
        const url =
          "http://localhost:5000/winnerenglish2-e0f1b/us-central1/student-updateStudentCash";

        const postData = {
          studentId: studentId,
          cash: qrAmount.value,
          token: idToken,
        };

        axios.post(url, postData).then((response) => {
          // เติมเงินสำเร็จ
          // Code Here
        });
      });
    };

    // Listen payment in QR payment method
    let unsubscribe;
    const isCompleteCharge = ref(false);
    const listenPayment = () => {
      unsubscribe = db
        .collection("charge")
        .where("chargeId", "==", chargeId.value)
        .onSnapshot((doc) => {
          doc.forEach((element) => {
            if (element.data().body.key == "charge.complete") {
              updateStudentCash();
              isCompleteCharge.value = true;
              unsubscribe();
            }
          });
        });
    };

    const redeemCodeText = ref("");
    const redeemCode = async () => {
      auth.currentUser.getIdToken().then(async (idToken) => {
        $q.loading.show();
        const $studentStore = useStudentStore();
        const studentId = $studentStore.studentId;
        const url =
          "http://localhost:5000/winnerenglish2-e0f1b/us-central1/giftCode-redeem";
        const postData = {
          giftCode: redeemCodeText.value,
          studentId: studentId,
          token: idToken,
        };

        const response = await axios.post(url, postData);

        $q.loading.hide();
      });
    };

    const giftCodeValueDisplay = ref(0);
    const checkGiftCode = async () => {
      $q.loading.show();
      if (redeemCodeText.value.length == 20) {
        // console.log("checking");
        const url =
          "http://localhost:5000/winnerenglish2-e0f1b/us-central1/giftCode-check?giftCode=" +
          redeemCodeText.value;
        const response = await axios.get(url);
        $q.loading.hide();

        giftCodeValueDisplay.value = response.data;
      } else {
        $q.loading.hide();
        giftCodeValueDisplay.value = "code invalide";
        console.error("gift code length not correct");
      }
    };

    const loadCurrentCash = async () => {
      const $studentStore = useStudentStore();
      const studentId = $studentStore.studentId;

      const url =
        "http://localhost:5000/winnerenglish2-e0f1b/us-central1/student-loadCash";
      const postData = {
        studentId: studentId,
      };
      const response = await axios.post(url, postData);
      balance.value = response.data;
    };

    const backStep = () => {
      if (paymentStep.value == "TopUp") {
        paymentStep.value = "selectCourse";
      } else if (paymentStep.value == "confirm course") {
        paymentStep.value = "selectCourse";
      }
    };

    const confirmBuyCourse = async () => {
      // console.log("confirmBuyCourse: ");
      // console.log(selectedCourse.value);

      auth.currentUser.getIdToken().then(async (idToken) => {
        const url =
          "http://localhost:5000/winnerenglish2-e0f1b/us-central1/course-buyCourse";
        const postData = {
          price: selectedCourse.value.price,
          selectedLevel: selectedLevel.value,
          unit: selectedCourse.value.unit,
          token: idToken,
        };
        const response = await axios.post(url, postData);
      });
    };

    onMounted(() => {
      loadCurrentCash();
    });

    return {
      backStep,
      isCompleteCharge,
      balance,
      selectedLevel,
      levelOptions,
      courseOptions,
      activeCardIndex,
      selectedCourse,
      paymentStep,
      paymentMethod,
      choosePaymentMethod,
      qrAmount,
      chooseCourse,
      generateQrPayment,
      qrUrl,
      // Credit Card Info
      createCreditCardToken,
      creditAmount,
      cardNumber,
      cardName,
      securityCode,
      expirationMonth_year,
      // Redeem
      redeemCode,
      redeemCodeText,
      checkGiftCode,
      giftCodeValueDisplay,

      // Buy course by select course
      confirmBuyCourse,
    };
  },
};
</script>

<style lang="scss" scoped>
.border-dashed {
  background-image: linear-gradient(
    to right,
    rgb(179, 174, 174) 60%,
    rgba(189, 189, 189, 0) 0%
  );
  background-position: top;
  background-size: 20px 1px;
  background-repeat: repeat-x;
}
.active-card-border {
  border: 3px solid #ffcf51;
}

.active-card-color {
  background-color: #ffcf51;
}

.inactive-card-color {
  background-color: #e7e7e7;
}
.card-hover:hover {
  transform: scale(0.95);
  cursor: pointer;
}

.active-payment-method {
  border: 1px solid #ffca40;
  border-radius: 5px;
  color: #ffca40;
}
.inactive-payment-method {
  border: 1px solid #bdbdbd;
  border-radius: 5px;
}
</style>
