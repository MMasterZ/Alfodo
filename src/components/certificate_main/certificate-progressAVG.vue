<template>
  <div class="row background-certificate q-py-xl">
    <div class="paper relative-position q-py-md">
      <q-img
        :id="`certificate-odyssey-${type}`"
        no-spinner
        no-transition
        :src="`/images/certificate_main/certificate-odyssey-${type}.png`"
        class="no-padding"
      >
        <div class="fit relative-position transparent">
          <div
            align="center"
            class="relative-position row no-wrap justify-center items-center"
            style="width: 80%; top: 33%; height: 70px; margin: auto"
          >
            <span class="font-mali-b font-name">
              <span v-if="type == 'th'" class="f36">
                {{ studentData.nameCertTh }}
              </span>
              <span
                v-else
                :class="studentData.nameCertEn.length > 30 ? 'f26' : 'f36'"
              >
                {{ studentData.nameCertEn }}
              </span>
            </span>
          </div>

          <div
            class="relative-position row justify-center"
            style="width: 900px; top: 40%; margin: auto"
          >
            <div class="self-center q-py-sm q-px-xs" align="center">
              <div class="font-mali-m font-level">
                {{
                  `${type == "th" ? "ระดับ" : "Level"} ${
                    studentData.courseLevel
                  } (${studentData.levelText})`
                }}
              </div>
            </div>
          </div>

          <div
            class="relative-position row"
            style="width: 900px; top: 48%; margin: auto"
          >
            <div class="col"></div>
            <div
              class="col-4 self-center q-py-sm q-px-xs"
              style="width: 285px"
              align="center"
            >
              <div class="font-mali-m font-date">
                {{
                  `${type == "th" ? currentDateTime.th : currentDateTime.en}`
                }}
              </div>
            </div>
          </div>
        </div>
      </q-img>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { onMounted, ref } from "vue";
import { useStudentStore } from "src/stores/student";
import { useCourseStore } from "src/stores/course";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
export default {
  setup(props) {
    const route = useRoute();
    const $q = useQuasar();
    const type = ref(route.params.type);
    let levelList = [
      {
        maxLevel: 4,
        text: "Basic",
      },
      {
        maxLevel: 8,
        text: "Intermediate",
      },
      {
        maxLevel: 12,
        text: "Advanced",
      },
    ];

    let months_en = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let months_th = [
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

    const studentName = ref("มาเรีย แคทรีน่า ");
    const studentNameEn = ref("Maria catrina");

    const funcSave = () => {
      let element = document.getElementById(
        `certificate-odyssey-${type.value}`
      );

      html2canvas(element).then(function (canvas) {
        const image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        const a = document.createElement("a");

        a.setAttribute("download", `certificate-${type.value}.png`);

        a.setAttribute("href", image);

        a.click();
        canvas.remove();
      });
    };

    const currentDateTime = ref({});
    const studentData = ref({});
    const funcSetStudent = async () => {
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      studentData.value = studentStore.studentData;

      let findLevelOptions = levelList.find((x) => {
        if (courseStore.courseLevel <= x.maxLevel) {
          return x;
        }
      });

      studentData.value.levelText = findLevelOptions.text;
      studentData.value.courseLevel = courseStore.courseLevel;

      let date = courseStore.courseData.reachProgressDate;

      let d = date.day;
      let m_th = months_th[date.month];
      let m_en = months_en[date.month];

      let y = date.year + 543;

      currentDateTime.value.th = `${d} ${m_th} ${y}`;
      currentDateTime.value.en = `${d} ${m_en} ${y}`;
    };

    onMounted(async () => {
      funcSetStudent();

      setTimeout(() => {
        funcSave();
        setTimeout(() => {
          window.close();
        }, 2000);
      }, 1000);
    });

    return {
      studentName,
      studentNameEn,
      studentData,
      currentDateTime,

      type,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-certificate {
  height: 100%;
  background-image: url("/images/background_main/background-certificate.png");
  background-size: contain;
  overflow: hidden;
}

.paper {
  min-width: 297mm;
  margin: auto;
  overflow: hidden;
}

@page {
  size: landscape;
  margin: 0;
}

@media print {
  .paper {
    width: initial;
    height: 200mm;
    background: transparent;
  }
}

.font-name {
  color: #dc3e44;
}

.font-date {
  color: #153f67;
  font-size: 23px;
}

.font-level {
  color: #153f67;
  font-size: 32px;
}
</style>
