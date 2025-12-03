<template>
  <div
    style="
      align-items: center;
      align-content: center;
      justify-content: center;
      justify-items: center;
      align-self: stretch;
      border-top: 8px solid #5b3018;
      border-bottom: 8px solid #5b3018;
      background: #3a1604;
      flex-direction: column;
    "
    class="padding-content-card"
  >
    <!-- #region start card content -->
    <div class="wrapper-container">
      <div
        v-for="(item, index) in courseData"
        :key="index"
        :class="{
          'item-tester': !item.isSeletedCourse,
          'item-tester-selected': item.isSeletedCourse,
        }"
      >
        <div style="border-radius: 12px; overflow: hidden" class="full-width full-height">
          <div
            style="background: #4a261b"
            class="text-white font-fredoka level-course-padding"
          >
            <div class="full-width relative-position row justify-between">
              <div></div>
              <div>Level {{ item.level }}</div>
              <div
                class="clickable cursor-pointer fit-content"
                @click="openDialogCourseInfo(item.level)"
                align="right"
              >
                <img
                  src="/images/subscribe_payment/courseLv_Noti.png"
                  style="
                    object-fit: cover;
                    image-rendering: optimizeQuality;
                    image-rendering: optimizeSpeed;
                  "
                />
              </div>
            </div>
          </div>

          <div
            style="background-color: #fff"
            class="row full-width padding-inside-course-card"
          >
            <!-- #region Header -->
            <div class="col-12 self-start" style="padding: 0px clamp(15px, 1.5vw, 24px)">
              <q-img :src="item.img" no-spinner no-transition></q-img>
            </div>
            <!-- #endregion -->

            <!-- #region Body -->
            <div class="row self-start col-12 body-course-card-padding">
              <!-- #region Detail -->
              <div
                class="col-12 self-start font-mali-m age-course-card age-course-card-padding"
              >
                {{ item.detail }}
              </div>
              <!-- #endregion -->

              <!-- #region Recommend & Level of Age -->
              <div
                class="col-12 self-start"
                v-if="
                  (!item.isHaveCourse && studentStore.levelForAge == item.level) ||
                  (!item.isHaveCourse && studentStore.placementTestLevel == item.level)
                "
              >
                <div
                  style="
                    width: 100%;
                    display: flex;
                    height: clamp(25px, 2vw, 32px);
                    padding: clamp(2.5px, 0.25vw, 4px) 0px;
                    justify-content: center;
                    align-items: center;
                    align-self: stretch;
                    border-radius: 8px;
                    background: #0085ff;
                    color: #fff;
                    margin: clamp(3px, 0.375vw, 6px) auto;
                    font-size: clamp(10px, 0.75vw, 12px);
                  "
                  class="font-mali-i f12"
                >
                  <div
                    v-if="
                      studentStore.levelForAge == item.level &&
                      studentStore.placementTestLevel == item.level
                    "
                  >
                    <span>{{ `“ระดับตามอายุและที่ทดสอบได้”` }}</span>
                  </div>
                  <div v-else>
                    <span v-if="studentStore.levelForAge == item.level">
                      {{ `“ระดับแนะนำตามอายุ”` }}
                    </span>
                    <span v-else-if="studentStore.placementTestLevel == item.level">
                      {{ `“ระดับที่ทดสอบได้”` }}
                    </span>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Progress -->
              <div
                style="
                  display: flex;
                  padding: 8px 0px;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  align-self: stretch;
                  height: 21px;
                  width: 100%;
                  margin: 0px auto;
                "
                class="col-12 self-start"
                v-if="item.isHaveCourse"
              >
                <div
                  style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;
                    align-self: stretch;
                  "
                >
                  <div
                    style="
                      width: 100%;
                      max-height: 8px;
                      height: 100%;
                      background-color: #4a261b;
                      border-radius: 99px;
                      position: relative;
                      padding-left: 5px;
                      max-width: 143px;
                    "
                  >
                    <q-linear-progress
                      dark
                      stripe
                      rounded
                      size="6px"
                      :value="item.progress / 100"
                      color="secondary"
                      style="width: 98%; border-radius: 99px"
                      class="absolute-center"
                    />
                  </div>

                  <div
                    class="font-mali-b f14"
                    style="color: #4a261b; width: 25px; text-align: right"
                  >
                    {{ item.progress }}%
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Price -->
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  flex: 1 0 0;
                  align-self: stretch;
                  margin-bottom: clamp(6px, 0.625vw, 10px);
                "
                class=""
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: flex-start;
                  "
                >
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      align-self: stretch;
                      color: #4a261b;
                      line-height: 25px;
                    "
                    class="font-mali-b price-course-card"
                  >
                    {{ `${funcFormatPrice(item.totalPrice)} บาท` }}
                  </div>

                  <div
                    v-if="item.discount > 0"
                    class="row justify-center items-center full-width"
                  >
                    <div
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                      "
                    >
                      <div
                        class="font-mali-sb price-course-card2"
                        style="color: #a6a6a6; text-decoration: line-through"
                      >
                        {{ `${funcFormatPrice(item.price)}` }}
                      </div>
                    </div>
                    <div
                      style="
                        display: flex;
                        padding: 1px 4px 3px 4px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 4px;
                        background: #f60000;
                        color: #fff;
                        margin-left: 4px;
                      "
                      class="font-mali-b price-course-card2"
                    >
                      {{ `-${item.discount}%` }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Expire -->
              <div
                style="
                  max-height: 15px;
                  max-width: 233px;
                  padding-left: 0px;
                  padding-right: 0px;
                  text-wrap: nowrap;
                "
                class="col-12"
                v-if="item.isHaveCourse"
              >
                <div
                  v-if="item.isHaveCourse"
                  :style="textExpireColor(item)"
                  class="font-mali-m full-width f14 expriceDate-fontsize"
                >
                  <div v-if="item.remainingTime">
                    {{ item.remainingTime }}
                  </div>
                  <div v-else>{{ item.remainingTime }}</div>
                </div>
                <div v-else style="color: #fff">1</div>
              </div>

              <div v-if="!item.isHaveCourse" style="height: 24px"></div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->

            <!-- #region Footer -->
            <div
              class="relative-position col-12 self-end"
              style="height: 17%; padding: 0px clamp(10px, 1vw, 16px)"
            >
              <!-- #region Button -->
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  gap: clamp(6.25px, 0.625vw, 10px);
                  position: relative;
                  max-width: 190px;
                  min-width: 140px;
                  width: 100%;
                "
                :class="buttonClass(item)"
                @click="handleButtonClick(item)"
              >
                <img
                  :src="getButtonImage(item)"
                  style="
                    image-rendering: optimizeQuality;
                    image-rendering: optimizeSpeed;
                    width: 100%;
                  "
                />
                <div
                  class="transparent absolute-center font-mali-b full-width"
                  style="font-size: clamp(11px, 0.875vw, 14px)"
                  :style="changeTextColorOnButton(item)"
                >
                  {{ buttonText(item) }}
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #endregion -->
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion end card content -->

    <div
      class="sub-content text-white text-left f16 font-mali-m"
      style="margin-top: 16px; line-height: 26px"
    >
      <div
        style="width: 100%; height: 235px"
        class="font-mali-m f16 row justify-center items-center"
        v-if="courseData.length === 0"
      >
        ไม่พบแพ็กเกจการเรียนที่ตรงกัน ลองเปลี่ยนตัวเลือกเพื่อดูแพ็กเกจอื่นๆ
      </div>
      <div style="margin-bottom: 4px"><u>หมายเหตุ</u></div>
      <ol>
        <li>
          ช่วงอายุนี้เน้นเพียงการเทียบเคียงตามหลักสูตรกระทรวงศึกษาธิการกับเนื้อหาในระดับชั้นประถมศึกษา
        </li>
        <li>
          อายุการใช้งานในการเรียนจะขึ้นอยู่กับจำนวนระดับการเรียน(Level)ในการซื้อต่อครั้ง
          ได้แก่ 1 ระดับ (อายุการใช้งาน 6 เดือน), 2 ระดับ (อายุการใช้งาน 1 ปี), 3 ระดับ
          (อายุการใช้งาน 1 ปี 6 เดือน) และ ตั้งแต่ 4 ระดับขึ้นไป (อายุการใช้งาน 2 ปี)
        </li>
        <li>
          สามารถขอเปลื่ยน Level ได้ภายใน 15 วัน และต้องมีการเรียนในระบบไม่เกิน 10%
          ของทั้งหมด และหรือ เข้าเรียนและทำแบบฝึกหัดไม่เกิน 3 Units/16 Units (Progress)
        </li>
        <!-- <li>
          แถมฟรี! สอนสดออนไลน์ ทุกวันเสาร์ 16 สัปดาห์
          <span
            class="cursor-pointer text-light-blue-7"
            style="text-decoration: underline"
            @click="funcShowDialogLiveOnline()"
            >(อ่านรายละเอียดเพิ่มเติม)</span
          >
        </li> -->
      </ol>
    </div>
  </div>

  <q-dialog v-model="isShowDialogLiveOnline" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-main relative-position">
          <q-img
            src="/images/subscribe_payment/banner-live-online.webp"
            no-spinner
            no-transition
          ></q-img>

          <div class="absolute-top-right box-button-close">
            <q-img
              class="cursor-pointer"
              src="/images/subscribe_payment/close_dialog.png"
              no-spinner
              no-transition
              v-close-popup
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useCourseStore } from "src/stores/course";
import { useStudentStore } from "src/stores/student";
import { computed, ref, watch } from "vue";

const props = defineProps({
  courseData: {
    type: Array,
    default: [],
  },
  isClearBucket: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["addBucket", "openDialogCourseInfo"]);

const emitValue = () => {
  emit("addBucket", { bucket: bucket, totalPrice: totalPrice }); // Emit a plain object to prevent Vue Proxy issues
};

const studentStore = useStudentStore();
const courseStore = useCourseStore();

const openDialogCourseInfo = (level) => {
  emit("openDialogCourseInfo", level);
};

const bucket = ref([]);
const totalPrice = computed(() => {
  const total = bucket.value.reduce((sum, course) => {
    return sum + course.totalPrice;
  }, 0);
  return total;
});

const selectCourseToBucket = (course) => {
  if (bucket.value.includes(course)) {
    bucket.value = bucket.value.filter((item) => item !== course);
    course.isSeletedCourse = false;
  } else {
    bucket.value.push(course);
    course.isSeletedCourse = true;
  }

  bucket.value.sort((a, b) => a.level - b.level);

  emitValue();
};

const formatRemainingTime = (day) => {
  if (day === 0) {
    return "หมดอายุ";
  } else if (day < 30) {
    const hours = Math.round((day % 1) * 24); // convert decimal to hours
    const days = Math.floor(day);
    return `${days} วัน ${hours} ชั่วโมง`;
  } else {
    const years = Math.floor(day / 365);
    const months = Math.floor((day % 365) / 30);
    if (months === 0) {
      return `${years} ปี`;
    } else {
      return `${years} ปี ${months} เดือน`;
    }
  }
};

const funcFormatPrice = (val) => {
  let total = val;

  return total.toLocaleString();
};

// #region Button
const getButtonImage = computed(() => (item) => {
  if (item.isSeletedCourse) {
    return "/images/subscribe_payment/blank_removeCourse_btn.png";
  }

  if (item.isHaveCourse) {
    return item.remainingDays <= 545
      ? "/images/subscribe_payment/blank_re_expirecourse_btn.png"
      : "/images/subscribe_payment/blank_keepCodeBtn-keep.png";
  }
  return item.isSeletedCourse
    ? "/images/subscribe_payment/blank_removeCourse_btn.png"
    : "/images/subscribe_payment/blank_select_course_btn.png";
});

const textExpireColor = computed(() => (item) => {
  return item.remainingDays <= 7 ? "color: #f60000" : "color: #0094FF";
});

const changeTextColorOnButton = computed(() => (item) => {
  if (item.isHaveCourse) {
    return item.remainingDays <= 545 ? "color: #ffffff" : "color: #a6a6a6";
  }
  return "color: #ffffff";
});

const buttonText = computed(() => (item) => {
  if (item.isSeletedCourse) {
    return "นำออก";
  }

  if (item.isHaveCourse) {
    return item.remainingDays <= 545 ? "ต่ออายุการใช้งาน" : "ต่ออายุการใช้งาน";
  }
  return item.isSeletedCourse ? "นำออก" : "เลือก";
});

const buttonClass = computed(() => (item) => {
  return item.remainingDays <= 545 ? "clickable cursor-pointer" : "";
});

const handleButtonClick = (item) => {
  if (item.remainingDays <= 545) {
    selectCourseToBucket(item);
  }
};
// #endregion

const isShowDialogLiveOnline = ref(false);
const funcShowDialogLiveOnline = () => {
  isShowDialogLiveOnline.value = true;
};

watch(
  () => props.isClearBucket,
  (newValue) => {
    if (newValue) {
      bucket.value = [];
    }
  }
);
</script>

<style lang="scss" scoped>
.box-dialog-main {
  width: 75%;
  border-radius: 16px;
  border: 2px solid #4a261b;
  background: #f2c043;
  padding: 8px;
}

.box-button-close {
  top: -1%;
  right: -1%;
  width: 3.5%;
}

.clickable {
  transition: transform 0.2s ease;
}

.clickable:active {
  transform: scale(0.95);
  /* Simulate the push effect by shrinking the button */
}

.padding-content-card {
  padding: clamp(15px, 1.5vw, 24px);
}

.padding-inside-course-card {
  padding: clamp(7.5px, 0.75vw, 12px) 0px clamp(7.5px, 0.75vw, 12px) 0px;
}

.age-course-card {
  font-size: clamp(7.5px, 0.75vw, 12px);
}

.age-course-card-padding {
  // padding: 4px 16px 0px 16px;
  padding: 2px 4px 0;
}

.body-course-card-padding {
  height: clamp(120px, 8.4375vw, 135px);
  padding: 0px clamp(10px, 1vw, 16px);
}

.level-course-padding {
  padding: clamp(7.5px, 0.75vw, 12px) clamp(10px, 1vw, 16px) clamp(5px, 0.5vw, 16px)
    clamp(20px, 2vw, 32px);
  font-size: clamp(15px, 1.5vw, 24px);
}

.price-course-card {
  font-size: clamp(15px, 1.5vw, 24px);
}

.price-course-card2 {
  font-size: clamp(7.5px, 0.75vw, 12px);
}

.date-coure-card {
  font-size: clamp(8.75px, 0.875vw, 14px);
}

.expriceDate-fontsize {
  font-size: clamp(8.75px, 0.875vw, 14px);
}

.sub-content {
  width: 100%;
  max-width: 1488px;
  padding-left: clamp(15px, 1.5vw, 24px);
  padding-right: clamp(15px, 1.5vw, 24px);
  margin-bottom: 0;
  padding-bottom: 0;
}

.wrapper-container {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(164px, 233.33px)
  ); //  ปรับขนาดคอลัมน์ระหว่าง 164px ถึง 233.33px /

  width: 100%;
  max-width: 1440px; // จำกัดความกว้างสูงสุด /
  gap: clamp(5px, 0.5vw, 8px);
  margin: 0 auto; // จัดกึ่งกลาง /
  // justify-content: center; // จัดให้แถวที่มีพื้นที่เหลืออยู่กึ่งกลาง /

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(4, minmax(164px, 233.33px));
  }

  // @media screen and (max-width: 880px) {
  //   padding: 12px;
  //   grid-template-columns: repeat(3, minmax(164px, 233.33px));
  //   background-color: green;
  // }

  @media screen and (max-width: 720px) {
    grid-template-columns: repeat(3, minmax(164px, 233.33px));
  }

  @media screen and (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(164px, 233.33px));
  }
}

.item-tester {
  // max-height: 374px;
  // min-height: 307px;
  border-radius: clamp(10px, 1vw, 16px);
  border: 3px solid #3a1604;
  background: #3a1604;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: clamp(1.8px, 0.18vw, 3px);

  @media screen and (max-width: 1024px) {
    .expriceDate-fontsize {
      font-size: clamp(10px, 1.174vw, 12px);
    }
  }

  @media screen and (max-width: 720px) {
    padding: 4px;
    border: 2px;
  }
}

.item-tester-selected {
  // max-height: 374px;
  // min-height: 307px;
  border-radius: 16px;
  border: 3px solid #6dbe00;
  background: #91ea00;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;

  @media screen and (max-width: 1024px) {
    .expriceDate-fontsize {
      font-size: clamp(10px, 1.174vw, 12px);
    }
  }

  @media screen and (max-width: 720px) {
    padding: 4px;
    border: 2px;
  }
}

@media screen and (max-width: 1024px) {
  .container {
    align-items: start;
  }

  .padding-content-card {
    padding: clamp(10px, 1vw, 16px);
  }

  .padding-inside-course-card {
    padding: clamp(5px, 0.5vw, 8px) 0px clamp(5px, 0.5vw, 8px) 0px;
  }
}

@media screen and (max-width: 1023px) {
  .age-course-card {
    font-size: 10px;
  }

  .level-course-padding {
    padding: clamp(5px, 0.5vw, 8px) clamp(5px, 0.5vw, 8px) 6px 24px;
    font-size: clamp(10px, 1vw, 16px);
  }
}

@media screen and (max-width: 720px) {
  .padding-content-card {
    padding: clamp(10px, 1.174vw, 12px);
  }

  .body-course-card-padding {
    padding: 0px clamp(5px, 0.5vw, 8px);
  }

  .price-course-card {
    font-size: 16px;
  }

  .price-course-card2 {
    font-size: 10px;
  }

  .date-coure-card {
    font-size: 10px;
  }
}

@media screen and (max-width: 480px) {
  .padding-content-card {
    padding: 12px;
  }
}

@media screen and (max-width: 360px) {
  .padding-content-card {
    padding: 12px;
  }
}
</style>
