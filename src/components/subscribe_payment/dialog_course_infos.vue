<template>
  <q-dialog v-model="isDialogCourseInfo" persistent>
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
          max-width: 732px;
          min-width: 328px;
          max-height: 748px;
          width: 100%;
          height: 100%;
          padding: 8px;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
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
            padding: 12px;
            flex-direction: column;
            align-items: flex-start;
            flex: 1 0 0;
            align-self: stretch;
            border-radius: 12px;
            background: #ffedc4;
          "
        >
          <div
            style="
              display: flex;
              padding: 8px;
              justify-content: center;
              align-items: center;
              gap: 10px;
              align-self: stretch;
              color: #4a261b;
            "
            class="font-mali-sb f16"
          >
            เนื้อหา : Level {{ level }}
          </div>
          <div style="display: flex; align-self: stretch; padding: 0 12px">
            <q-scroll-area
              :visible="true"
              :horizontal-thumb-style="horizontalBarStyle"
              class="horizontal-scroll-area"
              :style="{ width: '100%', height: '37px' }"
            >
              <div class="content">
                <div
                  v-for="(item, index) in courseLevelDetail"
                  :key="index"
                  style="
                    display: flex;
                    padding: 8px 16px;
                    justify-content: center;
                    align-items: center;
                    gap: 16px;
                    background: #ffffff;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    color: #4a261b;
                  "
                  :style="`${
                    item.skill == tabCourseInfo ? 'background: #efd080;' : '#ffffff;'
                  }`"
                  class="font-mali-sb f14 cursor-pointer item"
                  @click="tabCourseInfo = item.skill"
                >
                  {{ item.text }}
                </div>
              </div>
            </q-scroll-area>
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: flex-start;
              gap: 10px;
              align-self: stretch;
              position: relative;
              height: 100%;
              width: 100%;
              max-height: 752px;
              max-width: 676px;
              background: #efd080;
              border-radius: 8px;
              padding: 16px 16px 16px 24px;
              color: #4a261b;
            "
          >
            <q-scroll-area
              :visible="true"
              :vertical-thumb-style="{
                right: '4px',
                borderRadius: '7.5px',
                background: '#4A261B',
                width: '6px',
                opacity: 1,
              }"
              class="full-width full-height"
            >
              <div
                v-for="(item, index) in courseLevelDetail"
                :key="index"
                class="q-px-md"
              >
                <div
                  v-if="item.skill === tabCourseInfo"
                  v-for="(course, indexCours) in item.practice"
                  :key="indexCours"
                >
                  <div class="row">
                    <div style="width: 64px; margin-right: 24px">
                      บทที่ {{ course.unit }} :
                    </div>
                    <div class="col">
                      <div>{{ course.engName }}</div>
                      <div>
                        {{ course.thaiName }}
                      </div>
                    </div>
                  </div>
                  <hr
                    style="
                      border: none;
                      border-top: 1px dashed #ac7d05;
                      margin-top: 16px;
                      margin-bottom: 16px;
                    "
                  />
                </div>
              </div>
            </q-scroll-area>
          </div>
        </div>
        <div
          class="absolute-right clickable cursor-pointer"
          style="top: 0px; right: 0px"
          @click="emitValue()"
        >
          <img src="/images/subscribe_payment/close_dialog.png" alt="" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import learning_unit_iconVue from "../practice_list_unit/learning_unit_icon.vue";
import axios from "axios";
import { useQuasar } from "quasar";

const props = defineProps({
  courseLevelDetail: {
    type: Array,
    default: [],
  },
  level: {
    type: Number,
    default: 1,
  },
});

const $q = useQuasar();

const emit = defineEmits(["close-dialog"]);

const emitValue = () => {
  emit("close-dialog", false);
};

const horizontalBarStyle = ref({
  background: "black", // Same color as the thumb
  width: "50px", // Track width
  opacity: "0.5",
  display: "none",
});

const isDialogCourseInfo = ref(true);

const tabCourseInfo = ref("Vocabulary");

const courseLevelDetail = ref([]);

const funcLoadPracticeListName = async () => {
  $q.loading.show();

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getPracticeListNameByLevel?level=${props.level}`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let temp = [
      {
        skill: "",
        text: "",
        practice: [],
      },
      {
        skill: "",
        text: "",
        practice: [],
      },
      {
        skill: "",
        text: "",
        practice: [],
      },
      {
        skill: "",
        text: "",
        practice: [],
      },
      {
        skill: "",
        text: "",
        practice: [],
      },
      {
        skill: "",
        text: "",
        practice: [],
      },
    ];

    response.data.data.forEach((item) => {
      let indexSkill = 0;

      switch (item.skill) {
        case "Vocabulary":
          indexSkill = 0;
          break;
        case "Grammar":
          indexSkill = 1;
          break;
        case "Writing":
          indexSkill = 2;
          break;
        case "Reading":
          indexSkill = 3;
          break;
        case "Phonics":
          indexSkill = 4;
          break;
        case "Listening & Speaking":
          indexSkill = 5;
          break;
        default:
          indexSkill = 6;
          break;
      }

      temp[indexSkill].skill = item.skill;
      temp[indexSkill].text = item.skillTh;

      temp[indexSkill].practice.push({
        level: item.level,
        unit: item.unit,
        engName: item.nameEng,
        thaiName: item.nameTh,
      });
    });

    courseLevelDetail.value = temp;

    setTimeout(() => {
      $q.loading.hide();
    }, 100);
  } catch (e) {
    console.log(e);
    setTimeout(() => {
      $q.loading.hide();
    }, 100);
    alert()(e);
  }
};

onMounted(() => {
  funcLoadPracticeListName();
});
</script>

<style lang="scss" scoped>
.clickable {
  transition: transform 0.2s ease;
}

.clickable:active {
  transform: scale(0.95); /* Simulate the push effect by shrinking the button */
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

.horizontal-scroll-area {
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  scrollbar-width: none;
}

.horizontal-scroll-area::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;
}

/* สำหรับ Firefox */
.custom-scroll-container {
  scrollbar-width: none; /* ซ่อน Scrollbar */
  -ms-overflow-style: none; /* สำหรับ IE */
  scrollbar-color: #4a261b transparent; /* For Firefox */
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
</style>
