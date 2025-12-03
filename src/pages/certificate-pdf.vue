<template>
  <q-resize-observer @resize="onResize" />
  <div class="background-certificate-container row justify-center items-center">
    <!-- #region Certificate Presented -->

    <div class="col-12" style="height: 100px" v-if="screenSize.width < 1123"></div>
    <div>
      <div class="paper relative-position">
        <div
          class="q-pa-sm q-py-lg z-max"
          :class="screenSize.width < 1123 ? 'fixed-top' : ''"
          style="max-width: 297mm; width: 100%; margin: auto"
          align="right"
        >
          <div class="col-12">
            <q-img
              width="174px"
              class="cursor-pointer"
              src="/images/certificate_main/certificate-button-download.png"
              @click="funcSave()"
            ></q-img>
          </div>
        </div>
        <q-img
          :id="`certificate-odyssey-${language}`"
          no-spinner
          no-transition
          :src="`/images/certificate_main/certificate-presented-${language}.png`"
          class="no-padding"
        >
          <div class="fit relative-position transparent">
            <div
              align="center"
              class="relative-position row no-wrap justify-center items-center"
              style="width: 80%; top: 33%; height: 70px; margin: auto"
            >
              <span class="font-mali-b font-name">
                <span v-if="language == 'th'" class="f36">
                  {{ studentData.nameCertTh }}
                </span>
                <span v-else :class="studentData.nameCertEn.length > 30 ? 'f26' : 'f36'">
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
                    `${language == "th" ? "ระดับ" : "Level"} ${
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
                    `${language == "th" ? currentDateTime.th : currentDateTime.en || "-"}`
                  }}
                </div>
              </div>
            </div>
          </div>
        </q-img>
      </div>
    </div>

    <!-- #endregion -->
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { onMounted, ref, watch } from "vue";
import { useStudentStore } from "src/stores/student";
import { useCourseStore } from "src/stores/course";
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
export default {
  setup(props) {
    const route = useRoute();
    const $q = useQuasar();
    const type = ref(route.params.type);
    const language = ref(route.params.language);

    const level = ref("");
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

    const studentName = ref("");
    const studentNameEn = ref("");

    const funcSave = () => {
      const studentStore = useStudentStore();

      let element = document.getElementById(`certificate-odyssey-${language.value}`);

      html2canvas(element).then(async function (canvas) {
        // await canvas.toBlob(async function (blob) {
        //   let createNameCertificate = `${studentStore.studentId}-${type.value}-${language.value}.png`;

        //   await st.child(`/certificate/${createNameCertificate}`).put(blob);
        // });

        const image = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");

        const a = document.createElement("a");

        a.setAttribute("download", `${type.value}-${language.value}.png`);
        a.setAttribute("href", image);
        a.click();

        canvas.remove();

        // setTimeout(() => {
        //   // window.close();
        // }, 500);
      });
    };

    const currentDateTime = ref({});
    const studentData = ref({});
    const funcSetStudent = async () => {
      const studentStore = useStudentStore();
      const courseStore = useCourseStore();

      studentData.value = studentStore.studentData;

      let findCourse = courseStore.list.find((x) => x.courseId == route.params.courseId);

      let findLevelOptions = levelList.find((x) => {
        if (Number(findCourse.level) <= x.maxLevel) {
          return x;
        }
      });

      studentData.value.levelText = findLevelOptions.text;
      studentData.value.courseLevel = findCourse.level;

      if (findCourse.reachProgressDate != "-") {
        let date = findCourse.reachProgressDate;

        let d = date.day;
        let m_th = months_th[date.month - 1];
        let m_en = months_en[date.month - 1];

        let y = date.year + 543;

        currentDateTime.value.th = `${d} ${m_th} ${y}`;
        currentDateTime.value.en = `${d} ${m_en} ${y}`;
      } else {
        currentDateTime.value.th = `-`;
        currentDateTime.value.en = `-`;
      }
    };

    const screenSize = ref({
      width: 0,
      height: 0,
    });

    const onResize = (size) => {
      screenSize.value = size;
    };

    watch(
      () => route.params,
      () => {
        if (route.params.language != language) {
          language.value = route.params.language;
          funcSetStudent();
        }
      }
    );

    onMounted(async () => {
      funcSetStudent();

      // setTimeout(() => {
      //   // funcSave();
      // }, 1000);
    });

    return {
      screenSize,
      studentName,
      studentNameEn,
      studentData,
      currentDateTime,

      language,

      funcSave,
      onResize,
    };
  },
};
</script>

<style lang="scss" scoped>
.background-certificate-container {
  min-width: 297mm;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-image: url("/images/background_main/background-download-certificate.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

.paper {
  width: 297mm;
  margin: auto;
}

@page {
  size: landscape;
  margin: 0;
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
