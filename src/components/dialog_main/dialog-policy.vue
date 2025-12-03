<template>
  <!-- #region Dialog Policy -->
  <q-dialog v-model="isShowDialogPolicy" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container">
          <div class="sub-dialog-container">
            <!-- Header -->
            <div align="center" class="font-mali-b f20">
              {{ `ข้อตกลงการใช้บริการ` }}
            </div>

            <!-- Body -->
            <div class="box-dialog-content font-mali-m f14">
              <div>
                - มีการเปลี่ยนแปลงข้อตกลงการใช้ บริการของเรา ในการใช้งานบัญชี Winner
                English ถือว่าคุณยอมรับ
                <span
                  class="text-link cursor-pointer"
                  @click="funcShowDialogTerm('terms')"
                  >เงื่อนไขและข้อตกลงในการใช้บริการ</span
                >
                และ
                <span
                  class="text-link cursor-pointer"
                  @click="funcShowDialogTerm('policy')"
                  >นโยบายความเป็นส่วนตัว</span
                >
                ของเรา
              </div>

              <div style="margin: 8px 0px">
                - สำหรับบัญชีผู้เรียนอายุ ไม่ถึง 10 ปี เราอนุญาตให้ผู้ปกครอง สามารถสร้าง
                บัญชีให้ผู้เรียนใช้งานได้ และใน <br />การใช้งานบัญชีคุณยืนยันว่า
                <br />คุณในฐานะผู้ปกครองของผู้เรียน ถือว่ายอมรับ
                <span
                  class="text-link cursor-pointer"
                  @click="funcShowDialogTerm('terms')"
                  >เงื่อนไขและข้อตกลงในการใช้บริการ</span
                >
                และ
                <span
                  class="text-link cursor-pointer"
                  @click="funcShowDialogTerm('policy')"
                  >นโยบายความเป็นส่วนตัว</span
                >
                ของเรา
              </div>
              <div>
                - คุณสามารถขอถอนความยินยอมได้ ตลอดเวลา แต่เราขอสงวนสิทธิ์ในการ ใช้งานบัญชี
                Winner English ของคุณ
              </div>
            </div>

            <div align="center" class="box-button-next-step">
              <q-img
                src="/images/button_main/button-next-step.png"
                width="274px"
                no-spinner
                no-transition
                v-close-popup
                class="cursor-pointer"
                @click="funcNextToStudentDetails()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Student Details -->
  <q-dialog v-model="isShowDialogStudentDetails" maximized="" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container">
          <div class="sub-dialog-container">
            <!-- Header -->
            <div align="center" class="font-mali-b f20">
              {{ `ตรวจสอบข้อมูลผู้เรียน` }}
            </div>

            <div class="box-dialog-content font-mali-m f14">
              <div class="f16 font-mali-b row" align="left">
                <div class="icon-circle self-center"></div>
                <div>ชื่อ-สกุล</div>
              </div>
              <div class="row">
                <div style="width: 13px; margin-right: 8px"></div>
                <div class="col text-overflow f16">
                  {{ `${studentStore.studentFullName} ` }}
                </div>
              </div>
              <!-- #region `วัน/เดือน/ปีเกิด` -->
              <div class="f10 font-mali-b" style="margin-top: 16px">
                {{ `วัน/เดือน/ปีเกิด` }}
              </div>
              <div class="row">
                <!-- #region Day -->
                <div
                  class="col-1 box-input cursor-pointer no-margin relative-position"
                  style="width: 55px"
                  :class="isValidateDay ? 'input-validate' : ''"
                >
                  <div class="row">
                    <div class="col">
                      <div class="q-px-sm">
                        <span v-if="studentData.birthDate.day">
                          {{ `${studentData.birthDate.day || "วัน"}` }}
                        </span>
                        <span v-else style="color: #939393">วัน</span>
                      </div>
                    </div>
                    <div
                      class="col-1 self-center"
                      style="width: 25px; margin-top: -5px"
                      align="center"
                    >
                      <q-icon size="16px" name="fas fa-caret-down"></q-icon>
                    </div>
                  </div>
                  <q-menu fit style="height: 200px" auto-close>
                    <div class="bg-white">
                      <div
                        class="button-select"
                        :class="
                          studentData.birthDate.day == itemDay
                            ? 'button-select-active'
                            : ''
                        "
                        v-for="(itemDay, indexDay) in daysList"
                        :key="indexDay"
                        @click="funcSelectDay(itemDay)"
                      >
                        {{ `${itemDay}` }}
                      </div>
                    </div>
                  </q-menu>
                </div>
                <!-- #endregion -->

                <!-- #region Month -->
                <div
                  class="col cursor-pointer box-input relative-position"
                  style="margin: 0px 4px"
                  :class="isValidateMonth ? 'input-validate' : ''"
                >
                  <div class="row">
                    <div class="col q-px-sm">
                      <span v-if="showMonthName">
                        {{ `${showMonthName || "เดือน"}` }}
                      </span>
                      <span v-else style="color: #939393"> เดือน </span>
                    </div>
                    <div
                      class="col-1 self-center"
                      style="width: 25px; margin-top: -5px"
                      align="center"
                    >
                      <q-icon size="16px" name="fas fa-caret-down"></q-icon>
                    </div>
                  </div>
                  <q-menu fit style="height: 200px" auto-close>
                    <div class="bg-white">
                      <div
                        class="button-select"
                        :class="
                          studentData.birthDate.month == indexMonth + 1
                            ? 'button-select-active'
                            : ''
                        "
                        v-for="(itemMonth, indexMonth) in month_th"
                        :key="indexMonth"
                        @click="funcSelectMonth(itemMonth, indexMonth)"
                      >
                        {{ `${itemMonth}` }}
                      </div>
                    </div>
                  </q-menu>
                </div>
                <!-- #endregion -->

                <!-- #region Year -->
                <div
                  class="col-1 box-input cursor-pointer no-margin relative-position"
                  style="width: 70px"
                  :class="isValidateYear ? 'input-validate' : ''"
                >
                  <div class="row">
                    <div class="col q-px-sm">
                      <span v-if="studentData.birthDate.year">
                        {{ `${studentData.birthDate.year || "ปี"}` }}
                      </span>
                      <span v-else style="color: #939393">ปี</span>
                    </div>
                    <div
                      class="col-1 self-center"
                      style="width: 25px; margin-top: -5px"
                      align="center"
                    >
                      <q-icon size="16px" name="fas fa-caret-down"></q-icon>
                    </div>
                  </div>
                  <q-menu fit style="height: 200px" auto-close>
                    <div class="bg-white">
                      <div
                        class="button-select"
                        :class="
                          studentData.birthDate.year == itemYear
                            ? 'button-select-active'
                            : ''
                        "
                        v-for="(itemYear, indexYear) in yearList"
                        :key="indexYear"
                        @click="funcSelectYear(itemYear)"
                      >
                        {{ `${itemYear}` }}
                      </div>
                    </div>
                  </q-menu>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region Button -->
            <div class="box-button-confirm-profile">
              <q-img
                src="images/button_main/button-confirm.png"
                width="275px"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="funcConfirmStudentData()"
              ></q-img>
            </div>
            <div class="f12 font-mali-m" align="center" v-if="false">
              <div
                class="text-link width-fit"
                @click="isShowDialogSkipConfirm = true"
                v-close-popup
              >
                {{ `กรอกใหม่ภายหลัง` }}
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Success Confirm Data -->
  <q-dialog maximized v-model="isShowDialogSuccessConfirmData" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container">
          <div class="sub-dialog-container">
            <!-- Header -->
            <div align="center" class="font-mali-b f20">
              {{ `ตรวจสอบข้อมูลผู้เรียน` }}
            </div>

            <div class="box-dialog-content font-mali-m f14" align="center">
              <div class="f16 font-mali-b" align="center">
                {{ `คุณสามารถใช้งานต่อได้แล้ว` }}
              </div>

              <div class="icon-success">
                <div class="absolute-center">
                  <q-icon size="88px" name="fas fa-check"></q-icon>
                </div>
              </div>
            </div>

            <div class="box-button-success" align="center">
              <q-img
                width="120px"
                src="/images/button_main/button-confirm-short.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                v-close-popup
                @click="funcCloseDialogSuccessConfirmData()"
              >
              </q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Skip Confirm -->
  <q-dialog v-model="isShowDialogSkipConfirm" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container">
          <div class="sub-dialog-container">
            <!-- Header -->
            <div align="center" class="font-mali-b f20 row justify-center">
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
              <div class="self-center q-px-sm">{{ `กรอกใหม่ภายหลัง` }}</div>
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
            </div>

            <!-- Body -->
            <div class="box-dialog-content">
              <div class="f14 font-mali-m">
                คุณจะไม่สามารถเข้าเรียนที่ปุ่ม “Learn” และ “Play” ได้
                <br />หากคุณไม่กรอกข้อมูลผู้เรียนเพื่อ ยอมรับ
                <span class="font-mali-b">ข้อตกลงการใช้บริการ</span> ก่อน
              </div>
              <div class="f12 font-mali-m">
                * คุณสามารถกรอกย้อนหลังได้ที่โปรไฟล์ผู้ใช้
              </div>
            </div>

            <div class="box-button-skip-confirm" align="center">
              <q-img
                width="274px"
                src="/images/button_main/button-skip-confirm.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                v-close-popup
                @click="funcConfirmSkipStudentData()"
              ></q-img>
            </div>

            <div
              class="box-button-back-to-confirm-data"
              style="margin-top: 16px"
              align="center"
            >
              <q-img
                width="274px"
                src="/images/button_main/button-back-to-confirm-data.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                v-close-popup
                @click="isShowDialogStudentDetails = true"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Terms -->
  <dialog-terms
    :isShowDialogTerms="isShowDialogTerms"
    :type="typeOfTerm"
    @callback-closeDialog="isShowDialogTerms = false"
  ></dialog-terms>
  <!-- #endregion -->
</template>

<script setup>
import dialogTerms from "components/payments/terms-dialog.vue";

import { useQuasar } from "quasar";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";

import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// Props
const props = defineProps({
  isShowStudentDetails: Boolean,
});

// Emit
const emit = defineEmits(["callback-closeDialog"]);

// Store
const studentStore = useStudentStore();
// const courseStore =
const systemStore = useSystemStore();

// Initialize
const $q = useQuasar();
const router = useRouter();
const route = useRoute();

// Data
const month_th = ref([
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
]);

const studentData = ref({
  gender: "",
  province: "",
  phoneNumber: "",
  birthDate: {
    day: "",
    month: "",
    year: "",
  },
  level: "",
  courseData: null,
  history: [],
});

// Validate
const isValidateDay = ref(false);
const isValidateMonth = ref(false);
const isValidateYear = ref(false);

// Dialog
const isShowDialogPolicy = ref(false);
const isShowDialogStudentDetails = ref(false);
const isShowDialogSkipConfirm = ref(false);
const isShowDialogSuccessConfirmData = ref(false);
const isShowDialogTerms = ref(false);

// #region Select Month
const funcSelectMonth = (item, index) => {
  studentData.value.birthDate.month = index + 1;
  isValidateMonth.value = false;
};

const showMonthName = computed(() => {
  let findMonth = month_th.value[studentData.value.birthDate.month - 1];

  if (findMonth) {
    return findMonth;
  }

  return null;
});
// #endregion

// #region Select Day
const daysList = ref([]);
const funcSelectDay = (val) => {
  studentData.value.birthDate.day = val;
  isValidateDay.value = false;
};
// #endregion

// #region Select Year
const yearList = ref([]);
const funcSelectYear = (val) => {
  studentData.value.birthDate.year = val;
  isValidateYear.value = false;
};
// #endregion

// #region Next to student details
const funcNextToStudentDetails = () => {
  isShowDialogStudentDetails.value = true;
};
// #endregion

// #region Close Dialog Success Confirm Data
const funcCloseDialogSuccessConfirmData = () => {
  isShowDialogSuccessConfirmData.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
// #endregion

// #region Skip Confirm Data
const funcConfirmSkipStudentData = () => {
  isValidateDay.value = false;
  isValidateMonth.value = false;
  isValidateYear.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
// #endregion

// #region Confirm Student Data
const funcConfirmStudentData = async () => {
  const studentStore = useStudentStore();

  if (studentData.value.birthDate.day == "") {
    isValidateDay.value = true;
  }

  if (studentData.value.birthDate.month == "") {
    isValidateMonth.value = true;
  }

  if (studentData.value.birthDate.year == "") {
    isValidateYear.value = true;
  }

  if (
    studentData.value.birthDate.day != "" &&
    studentData.value.birthDate.month != "" &&
    studentData.value.birthDate.year != ""
  ) {
    $q.loading.show();

    let response = await studentStore.saveCharacterName(
      studentStore.characterName,
      studentStore.gender,
      studentStore.province,
      studentData.value.birthDate,
      studentStore.phoneNumber
    );

    if (response != "success") {
      throw new Error("Cannot save student data");
    }

    let response2 = await studentStore.agreePolicy();

    if (response2 != "success") {
      throw new Error("Cannot save agree policy");
    }

    isShowDialogStudentDetails.value = false;
    isShowDialogSuccessConfirmData.value = true;
    // systemStore.systemData.activeStatus.isSuccessSetupProfile = true;

    $q.loading.hide();
  } else {
    $q.notify({
      message: "กรุณากรอกข้อมูลให้ครบ",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
    $q.loading.hide();
    return;
  }
};
// #endregion

// #region Dialog Terms
const typeOfTerm = ref("");
const funcShowDialogTerm = (type) => {
  typeOfTerm.value = type;
  isShowDialogTerms.value = true;
};
// #endregion

// #region Set Student Data
const funcSetStudentData = async () => {
  const systemStore = useSystemStore();

  isShowDialogPolicy.value = false;

  let year = systemStore.datetime.year + 543;

  let setCurrentYear = year - 50;

  let startYear = setCurrentYear;
  for (let i = 0; i < 50; i++) {
    startYear++;
    if (startYear <= year) {
      yearList.value.push(startYear);
    }
  }

  yearList.value.sort((a, b) => b - a);

  let setDay = 0;
  for (let i = 1; i <= 31; i++) {
    setDay++;
    daysList.value.push(setDay);
  }

  studentData.value.characterName = studentStore.characterName || "";
  studentData.value.gender = studentStore.gender || "";
  studentData.value.province = studentStore.province || "";
  studentData.value.phoneNumber = studentStore.phoneNumber || "";

  studentData.value.history = studentStore.history;

  if (props.isShowStudentDetails) {
    isShowDialogStudentDetails.value = true;
    return;
  }

  isShowDialogPolicy.value = true;
};
// #endregion

onMounted(() => {
  funcSetStudentData();
});
</script>

<style lang="scss" scoped>
// #region Box

.box-dialog-container {
  width: 326px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
}

.sub-dialog-container {
  color: #4a261b;
  border-radius: 12px;
  background: #ffedc4;
  padding: 16px 12px 12px 12px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.box-dialog-content {
  width: 100%;
  max-height: 340px;
  height: 100%;
  border-radius: 10px;
  background: #efd080;
  padding: 12px;
  color: #4a261b;
  line-height: 28px;
  margin: 16px 0px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #4a261b;
    border-radius: 99px;
  }
}

.box-input {
  height: 30px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #fff;
  margin: 8px 0px 16px 0px;

  &.input-validate {
    border: 1px solid #cf2e2e;
    background: #f8e2e2;
  }
}

.box-button-next-step,
.box-button-skip-confirm,
.box-button-back-to-confirm-data,
.box-button-confirm-profile,
.box-button-success {
  height: 50px;
}

// #endregion

// #region Icon

.icon-success {
  position: relative;
  width: 140px;
  height: 140px;
  background-color: #a0ca0e;
  border: 3px solid #769606;
  border-radius: 50%;
  color: #fff;
  margin: 8px 0px 0px;
}

.icon-alert {
  width: 24px;
  color: #cf1111;
}

.icon-circle {
  width: 13px;
  height: 13px;
  background-color: #4a261b;
  border-radius: 50%;
  margin: 0px 8px 0px 0px;
}

// #endregion

// #region Text

.text-link {
  margin-top: 8px;
  color: #0085ff;
  text-decoration: underline;
  cursor: pointer;
}

// #endregion

// #region Button

.button-select {
  padding: 5px;
  cursor: pointer;
}

.button-select:hover {
  background-color: #4a261b;
  color: #fff;
}

.button-select-active {
  background-color: #4a261b;
  color: #fff;
}

// #endregion
</style>
