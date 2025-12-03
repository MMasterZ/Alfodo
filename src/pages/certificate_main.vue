<template>
  <q-page
    class="row justify-center items-center"
    :class="$q.platform.is.desktop ? 'background-main' : 'background-main-mobile'"
  >
    <!-- #region Desktop -->
    <div class="relative-position box-container-main" v-if="$q.platform.is.desktop">
      <background-main></background-main>

      <!-- #region Button Back -->
      <div class="absolute-top-left" style="width: 2.91%; margin: 1.3% 2.3%">
        <q-img
          class="cursor-pointer"
          src="/images/icon_main/icon-back.png"
          no-spinner
          no-transition
          @click="funcBackToLobby()"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Certificate List -->
      <div
        class="absolute-center animate__animated animate__fadeIn"
        style="width: 70.7%; animation-duration: 1s"
        v-if="!isLoading"
      >
        <!-- #region Certificate List -->
        <div class="row relative-position justify-between">
          <div
            class="col-4 box-image-certificate relative-position"
            v-for="(itemCertificate, indexCertificate) in certificateListPerPage"
            :key="indexCertificate"
          >
            <q-img
              src="/images/certificate_main/certificate-picture-frame.png"
              no-spinner
              no-transition
            >
              <div class="no-padding transparent" style="width: 98.1%; height: 97.5%">
                <div class="absolute-center" style="width: 82.4%">
                  <!-- #region เปิด -->
                  <div v-if="itemCertificate.isOpen">
                    <!-- #region หมดเวลา -->
                    <div v-if="itemCertificate.isOutOfTime">
                      <q-img
                        src="/images/certificate_main/certificate-not-pass.png"
                        no-spinner
                        no-transition
                      >
                        <div
                          class="absolute-center no-padding transparent text-"
                          style="width: 100%; font-size: min(24px, 1.5vw); color: #484848"
                          algin="center"
                        >
                          <div class="font-mali-b" align="center">
                            <div>{{ `เกียรติบัตร` }}</div>
                            <div>{{ `Level ${itemCertificate.level}` }}</div>
                            <div style="font-size: min(16px, 1vw)">
                              {{ `(หมดเขตการรับ)` }}
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ยังไม่หมดเวลา -->
                    <div v-else>
                      <!-- #region ไม่ผ่านเงื่อนไข -->
                      <div v-if="!itemCertificate.isPass">
                        <q-img
                          src="/images/certificate_main/certificate-condition.png"
                          no-spinner
                          no-transition
                        >
                          <div
                            class="absolute-center no-padding transparent text-not-pass"
                          >
                            <div class="font-mali-b" align="center">
                              <div>{{ `เกียรติบัตร` }}</div>
                              <div>{{ `Level ${itemCertificate.level}` }}</div>
                            </div>
                          </div>
                          <div
                            class="absolute-bottom no-padding transparent"
                            align="center"
                            style="width: 100%; bottom: 15%"
                          >
                            <q-img
                              style="width: 36.7%"
                              class="cursor-pointer"
                              src="/images/certificate_main/certificate-button-condition.png"
                              @click="funcSelectedCertificate(itemCertificate)"
                              no-spinner
                              no-transition
                            ></q-img>
                          </div>
                        </q-img>
                      </div>
                      <!-- #endregion -->

                      <!-- #region ผ่านเงื่อนไข -->
                      <div v-else>
                        <q-img
                          width="100%"
                          :src="`/images/certificate_main/${itemCertificate.type}-en.png`"
                          no-spinner
                          no-transition
                          class="cursor-pointer"
                          @click="funcSelectedCertificate(itemCertificate)"
                        >
                          <div
                            align="center"
                            class="transparent absolute-center no-padding"
                            style="width: 80%; top: 38%"
                          >
                            <div class="font-mali-b font-name">
                              {{ `${itemCertificate.nameEng}` }}
                            </div>
                          </div>
                          <div
                            class="transparent absolute-center no-padding"
                            style="width: 100%; top: 54%"
                            align="center"
                          >
                            <div class="font-mali-m font-level">
                              {{
                                `Level ${itemCertificate.level} (${itemCertificate.textLevel})`
                              }}
                            </div>
                          </div>
                          <div
                            class="absolute-bottom-right transparent no-padding"
                            style="
                              width: 25%;
                              min-width: fit-content;
                              bottom: 29%;
                              right: 10%;
                            "
                            align="center"
                          >
                            <div class="font-mali-m font-date">
                              {{ `${itemCertificate.currentDateTime}` }}
                            </div>
                          </div>
                        </q-img>
                      </div>
                      <!-- #endregion -->
                    </div>
                    <!-- #endregion -->
                  </div>
                  <!-- #endregion -->

                  <!-- #region ไม่เปิด -->
                  <div v-else>
                    <q-img
                      src="/images/certificate_main/certificate-coming-soon.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <!-- #endregion -->
                </div>
              </div>
            </q-img>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Certificate Pagination -->
        <div style="margin-top: 9%; margin-bottom: 3.5%" align="center">
          <div class="row justify-center">
            <div class="col-1 certificate-box-page-number">
              <q-img
                src="/images/certificate_main/certificate-box-number.png"
                @click="currentPage == 1 ? null : currentPage--"
                :class="currentPage == 1 ? 'overlay' : 'cursor-pointer'"
                no-spinner
                no-transition
              >
                <div class="font-mali-b fit transparent no-padding">
                  <div class="row justify-center items-center certificate-page-number">
                    <div class="absolute-center">
                      {{ `<` }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
            <div
              class="col-1 certificate-box-page-number"
              v-for="i in pagination"
              :key="i"
            >
              <q-img
                src="/images/certificate_main/certificate-box-number.png"
                @click="currentPage = i"
                class="cursor-pointer"
                no-spinner
                no-transition
              >
                <div class="font-mali-b fit transparent no-padding">
                  <div
                    class="row justify-center items-center certificate-page-number"
                    :class="currentPage == i ? 'selected' : ''"
                  >
                    <div class="absolute-center">
                      {{ i }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
            <div class="col-1 certificate-box-page-number">
              <q-img
                src="/images/certificate_main/certificate-box-number.png"
                @click="currentPage >= pagination ? null : currentPage++"
                :class="currentPage >= pagination ? 'overlay' : 'cursor-pointer'"
                no-spinner
                no-transition
              >
                <div class="font-mali-b fit transparent no-padding">
                  <div class="row justify-center items-center certificate-page-number">
                    <div class="absolute-center">
                      {{ `>` }}
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-container-main-mobile absolute-center" v-if="!$q.platform.is.desktop">
      <!-- #region Button Back -->
      <div class="q-pa-sm">
        <q-img
          width="45px"
          no-spinner
          no-transition
          src="/images/icon_main/icon-back.png"
          @click="funcBackToLobby()"
        ></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Certificate List -->
      <div class="q-pa-md" align="center" v-if="!isLoading">
        <div
          v-for="(itemCertificate, indexCertificate) in certificateListPerPage"
          :key="indexCertificate"
          style="width: 320px"
          class="q-my-xs q-mb-md"
        >
          <q-img
            src="/images/certificate_main/certificate-picture-frame.png"
            no-spinner
            no-transition
          >
            <div class="no-padding transparent" style="width: 98%; height: 97.3%">
              <div class="absolute-center" style="width: 82.4%">
                <!-- #region เปิด -->
                <div v-if="itemCertificate.isOpen">
                  <!-- #region หมดเวลา -->
                  <div v-if="itemCertificate.isOutOfTime">
                    <q-img
                      src="/images/certificate_main/certificate-not-pass.png"
                      no-spinner
                      no-transition
                      class="animate__animated animate__fadeIn"
                    >
                      <div
                        class="absolute-center no-padding transparent"
                        style="width: 100%; font-size: min(24px, 5.5vw); color: #484848"
                        algin="center"
                      >
                        <div class="font-mali-b" align="center">
                          <div>{{ `เกียรติบัตร` }}</div>
                          <div>{{ `Level ${itemCertificate.level}` }}</div>
                          <div style="font-size: min(16px, 3.65vw)">
                            {{ `(หมดเขตการรับ)` }}
                          </div>
                        </div>
                      </div>
                    </q-img>
                  </div>
                  <!-- #endregion -->

                  <!-- #region ยังไม่หมดเวลา -->
                  <div v-else>
                    <!-- #region ไม่ผ่านเงื่อนไข -->
                    <div v-if="!itemCertificate.isPass">
                      <q-img
                        src="/images/certificate_main/certificate-condition.png"
                        no-spinner
                        no-transition
                        class="animate__animated animate__fadeIn"
                      >
                        <div
                          class="absolute-center no-padding transparent"
                          style="width: 100%; top: 35%; font-size: 24px; color: #4a261b"
                        >
                          <div class="font-mali-b" align="center">
                            <div>{{ `เกียรติบัตร` }}</div>
                            <div>{{ `Level ${itemCertificate.level}` }}</div>
                          </div>
                        </div>
                        <div
                          class="absolute-bottom no-padding transparent"
                          align="center"
                          style="bottom: 15%"
                        >
                          <q-img
                            style="width: 37.03%"
                            class="cursor-pointer"
                            src="/images/certificate_main/certificate-button-condition.png"
                            @click="funcSelectedCertificate(itemCertificate)"
                            no-spinner
                            no-transition
                          ></q-img>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ผ่านเงื่อนไข -->
                    <div v-else>
                      <q-img
                        width="100%"
                        :src="`/images/certificate_main/${itemCertificate.type}-en.png`"
                        no-spinner
                        no-transition
                        class="cursor-pointer"
                        @click="funcSelectedCertificate(itemCertificate)"
                      >
                        <div class="no-padding fit transparent">
                          <div
                            align="center"
                            class="transparent absolute-center no-padding"
                            style="width: 80%; top: 38%"
                          >
                            <div class="font-mali-b font-name-mobile">
                              {{ `${itemCertificate.nameEng}` }}
                            </div>
                          </div>
                          <div
                            class="transparent absolute-center no-padding"
                            style="width: 100%; top: 54%"
                            align="center"
                          >
                            <div class="font-mali-m font-level-mobile">
                              {{
                                `Level ${itemCertificate.level} (${itemCertificate.textLevel})`
                              }}
                            </div>
                          </div>
                          <div
                            class="absolute-bottom-right transparent no-padding"
                            style="
                              width: 25%;
                              min-width: fit-content;
                              bottom: 29%;
                              right: 10%;
                            "
                            align="center"
                          >
                            <div class="font-mali-m font-date-mobile">
                              {{ `${itemCertificate.currentDateTime}` }}
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>
                    <!-- #endregion -->
                  </div>
                  <!-- #endregion -->
                </div>
                <!-- #endregion -->

                <!-- #region ไม่เปิด -->
                <div v-else>
                  <q-img
                    src="/images/certificate_main/certificate-coming-soon.png"
                    no-spinner
                    no-transition
                    class="animate__animated animate__fadeIn"
                  ></q-img>
                </div>
                <!-- #endregion -->
              </div>
            </div>
          </q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Pagination -->
      <div align="center" class="q-pa-md" v-if="!isLoading">
        <div class="row justify-center width-fit shadow-2">
          <div class="certificate-box-page-number-mobile">
            <q-img
              src="/images/certificate_main/certificate-box-number.png"
              :class="currentPage == 1 ? 'overlay' : 'cursor-pointer'"
              @click="currentPage == 1 ? null : currentPage--"
              no-spinner
              no-transition
            >
              <div class="font-mali-b fit transparent no-padding">
                <div
                  class="row justify-center items-center certificate-page-number-mobile"
                >
                  <div class="absolute-center">
                    {{ `<` }}
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <div
            class="certificate-box-page-number-mobile"
            v-for="i in pagination"
            :key="i"
          >
            <q-img
              src="/images/certificate_main/certificate-box-number.png"
              class="cursor-pointer"
              no-spinner
              no-transition
            >
              <div class="font-mali-b fit transparent no-padding">
                <div
                  class="row justify-center items-center certificate-page-number-mobile"
                  :class="currentPage == i ? 'selected' : ''"
                >
                  <div class="absolute-center">
                    {{ i }}
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <div class="certificate-box-page-number-mobile">
            <q-img
              src="/images/certificate_main/certificate-box-number.png"
              :class="currentPage >= pagination ? 'overlay' : 'cursor-pointer'"
              @click="currentPage >= pagination ? null : currentPage++"
              no-spinner
              no-transition
            >
              <div class="font-mali-b fit transparent no-padding">
                <div
                  class="row justify-center items-center certificate-page-number-mobile"
                >
                  <div class="absolute-center">
                    {{ `>` }}
                  </div>
                </div>
              </div>
            </q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Certificate Condition -->
  <q-dialog maximized v-model="isShowDialogAlertCertificateCondition" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="certificate-dialog-alert-condition">
          <div class="content" align="center">
            <div class="q-py-lg">
              <div class="font-mali-b f20">
                {{ alertMessage.title }}
              </div>
              <div class="f14 q-mt-md font-mali-r">
                {{ alertMessage.text }}
              </div>
            </div>
            <div class="q-pa-md">
              <q-img
                width="160px"
                src="/images/button_main/button-close.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                v-close-popup
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Certificate Confirm Download -->
  <q-dialog v-model="isShowDialogConfirmDownloadCertificate" maximized persistent>
    <q-card class="shadow-0 transparent">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img width="300px" src="/images/box_main/box-dialog-default.png">
            <div class="fit transparent row">
              <div class="self-center f20 font-mali-b q-px-lg" align="center">
                <span class="text-title-download"
                  >ต้องการดาว์นโหลด เกียรติบัตรใช่ไหม</span
                >
              </div>
              <div class="col-12 row q-px-md">
                <div class="col-12">
                  <q-img
                    @click="funcGenerateCertificate('th')"
                    class="cursor-pointer"
                    src="/images/button_main/button-thai-version.png"
                  ></q-img>
                </div>
                <div class="col-12">
                  <q-img
                    @click="funcGenerateCertificate('en')"
                    class="cursor-pointer"
                    src="/images/button_main/button-eng-version.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
          <div class="absolute-top-right" style="top: -10px; right: -10px">
            <q-btn round flat v-close-popup>
              <q-img
                width="45px"
                src="/images/icon_main/icon-close.png"
                @click="funcCloseConfirmDownloadCertificate()"
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Set Certificate Name -->
  <q-dialog v-model="isShowDialogCertificateSetName" persistent seamless>
    <q-card class="shadow-0 transparent">
      <q-card-section class="fit row no-padding">
        <div>
          <q-img width="320px" src="/images/box_main/box-change-name-in-certificate.png">
            <div class="fit transparent text-dialog-certificate">
              <div class="row fit q-px-md">
                <div class="col-12 self-center q-pb-sm q-pt-md" align="center">
                  <span class="f20 font-mali-b"> เกียรติบัตร </span>
                  <div class="f12 font-mali-m q-my-sm">
                    กรุณาตรวจสอบ ชื่อ-นามสกุล ให้ถูกต้อง<br />
                    เมื่อทำการยืนยันแล้ว จะไม่สามารถแก้ไข้ได้
                  </div>
                </div>

                <div class="col-12">
                  <span class="f12 font-mali-m">ชื่อ-นามสกุล (ภาษาไทย)*</span>
                  <q-input
                    class="q-px-sm"
                    :class="isErrorTh ? 'input-error' : 'input-default'"
                    borderless
                    label-color="dark"
                    dense
                    hide-bottom-space
                    :rules="[(val) => funcCheckInputName(val, 'th')]"
                    v-model="studentData.nameTh"
                  ></q-input>
                </div>
                <div class="col-12">
                  <span class="f12 font-mali-m">Name-Surname (ภาษาอังกฤษ)*</span>
                  <q-input
                    class="q-px-sm"
                    :class="isErrorEng ? 'input-error' : 'input-default'"
                    borderless
                    label-color="dark"
                    dense
                    hide-bottom-space
                    :rules="[(val) => funcCheckInputName(val, 'eng')]"
                    v-model="studentData.nameEng"
                  ></q-input>
                </div>
                <div
                  class="col-12 self-end q-px-xs q-pt-xs q-pb-sm"
                  align="center"
                  style="height: 65px"
                >
                  <q-img
                    no-spinner
                    no-transition
                    @click="isErrorAll ? null : funcSaveCertificateName()"
                    width="150px"
                    :class="isErrorAll ? '' : 'cursor-pointer'"
                    :src="`/images/button_main/button-submit${
                      isErrorAll ? '-disable' : ''
                    }.png`"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import backgroundMain from "components/certificate_main/background-main.vue";

import wordrude from "src/js/wordrude";

import { computed, onMounted, ref } from "vue";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { useCourseStore } from "src/stores/course";
export default {
  components: {
    backgroundMain,
  },
  setup(props) {
    // Initail
    const $route = useRoute();
    const $router = useRouter();
    const $q = useQuasar();

    // Data
    const badWordList = ref(wordrude.list);
    const studentData = ref({
      nameTh: "",
      nameEng: "",
    });
    const selectedCertificate = ref(null);
    const certificateList = ref();
    const currentPage = ref(1);
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

    // Boolearn
    const isLoading = ref(true);
    const isShowDialogCertificateSetName = ref(false);
    const isShowDialogAlertCertificateCondition = ref(false);
    const isShowDialogConfirmDownloadCertificate = ref(false);

    // #region Function

    // #region func Check Certificate Name
    const isErrorTh = ref(false);
    const isErrorEng = ref(true);
    const funcCheckInputName = (val, type) => {
      if (val == "") {
        if (type == "th") isErrorTh.value = true;
        else isErrorEng.value = true;
      } else {
        if (val.length < 3) {
          if (type == "th") isErrorTh.value = true;
          else isErrorEng.value = true;
        } else {
          let isBadWord = false;
          badWordList.value = badWordList.value.filter((x) => x != " ");
          for (let i = 0; i < badWordList.value.length; i++) {
            let findBadWord = val.match(badWordList.value[i]);

            if (findBadWord) {
              isBadWord = true;
              break;
            }
          }

          if (isBadWord) {
            if (type == "th") isErrorTh.value = true;
            else isErrorEng.value = true;
          } else {
            if (type == "th") isErrorTh.value = false;
            else isErrorEng.value = false;
          }
        }
      }

      return type == "th" ? !isErrorTh.value : !isErrorEng.value;
    };
    // #endregion

    // #region Save certificate name
    const funcSaveCertificateName = async () => {
      const studentStore = useStudentStore();

      try {
        isShowDialogCertificateSetName.value = false;
        $q.loading.show();
        await studentStore.updateStudentName(studentData.value);
        await funcGetCourseList();
      } catch (e) {
        $q.loading.hide();
        isShowDialogCertificateSetName.value = true;
      }
    };
    // #endregion

    // #region Get Certificate List
    let tempCertificateList = [];
    const funcGetCourseList = () => {
      const courseStore = useCourseStore();
      const studentStore = useStudentStore();

      $q.loading.show();

      try {
        courseStore.list.forEach((res, index) => {
          let isOutOfTime = false;
          let nameTh = "";
          let nameEng = "";
          let currentDateTime = "-";
          let textLevel = "-";
          let isPass = false;

          if (res.progressAVG >= 80) {
            isPass = true;

            textLevel = levelList.find((x) => {
              if (Number(res.level) <= x.maxLevel) {
                return x;
              }
            });

            if (studentStore.studentData.isUpdateCertName) {
              nameTh = studentStore.studentData.nameCertTh;
              nameEng = studentStore.studentData.nameCertEn;
            }

            if (res.reachProgressDate != "-") {
              let date = res.reachProgressDate;

              let d = date.day;
              let m_en = months_en[date.month - 1];
              let y = date.year + 543;
              currentDateTime = `${d} ${m_en} ${y}`;
            }
          }

          if (studentStore.studentType == "school") {
            if (!isPass) {
              if (index + 1 != courseStore.list.length) {
                isOutOfTime = true;
              }
            }
          }

          let newData = {
            ...res,
            isOutOfTime: isOutOfTime,
            isPass: isPass,
            isOpen: true,
            type: "certificate-presented",
            alertMessage: {
              title: "พยายามอีกหน่อยนะ",
              text: "ทำแบบฝึกหัดเพิ่มเพื่อรับเกียรติบัตร",
            },
            textLevel: textLevel.text,
            nameTh: nameTh,
            nameEng: nameEng,
            currentDateTime: currentDateTime,
          };

          tempCertificateList.push(newData);
        });

        certificateList.value = tempCertificateList;
        isLoading.value = false;
        $q.loading.hide();
      } catch (e) {
        console.log(e);
        $q.loading.hide();
      }
    };
    // #endregion

    // #region Selected Certificate
    const funcSelectedCertificate = (data) => {
      selectedCertificate.value = data;
      if (data.isPass) {
        isShowDialogConfirmDownloadCertificate.value = true;
        return;
      }

      isShowDialogAlertCertificateCondition.value = true;
    };
    // #endregion

    // #region Back To Lobby
    const funcBackToLobby = () => {
      $router.replace("/lobby");
    };
    // #endregion

    // #region Close Dialog Certificate Download
    const funcCloseConfirmDownloadCertificate = () => {
      isShowDialogConfirmDownloadCertificate.value = false;
    };
    // #endregion

    // #region Generate Certificate
    const funcGenerateCertificate = async (language) => {
      window.open(
        `${window.location.origin}/#/download/certificate/${selectedCertificate.value.type}/${language}/${selectedCertificate.value.courseId}`,
        "__blank"
        // "resizable=no, width=5, height=5"
      );

      isShowDialogConfirmDownloadCertificate.value = false;
    };
    // #endregion

    // #region Set Certificate Name
    const funcSetCertificateName = () => {
      isShowDialogCertificateSetName.value = false;
      funcGetCourseList();
    };
    // #endregion
    // #endregion

    // #region Computed
    const pagination = ref(0);
    const certificateListPerPage = computed(() => {
      const systemStore = useSystemStore();

      tempCertificateList = [...certificateList.value];

      let maxTotalPerPage = 6;
      let totalPage = 0;

      if (!$q.platform.is.desktop) {
        maxTotalPerPage = 2;
      }

      if (tempCertificateList.length) {
        totalPage = Math.ceil(tempCertificateList.length / maxTotalPerPage);

        let totalList = tempCertificateList.length;
        let totalListPerPage = maxTotalPerPage * totalPage;

        let findEmpty = totalListPerPage - totalList;

        if (findEmpty > 0) {
          for (let i = 0; i < findEmpty; i++) {
            tempCertificateList.push({
              id: totalList + i + 1,
              name: "",
              isOpen: false,
            });
          }
        }
      } else {
        totalPage = 1;

        for (let i = 0; i < maxTotalPerPage; i++) {
          tempCertificateList.push({
            id: i + 1,
            name: "",
            isOpen: false,
          });
        }
      }

      let start = (currentPage.value - 1) * maxTotalPerPage;
      let end = start + maxTotalPerPage;

      pagination.value = totalPage;

      return tempCertificateList.slice(start, end);
    });

    const alertMessage = computed(() => {
      let find = selectedCertificate.value.alertMessage;

      if (find) {
        return find;
      } else {
        return {
          title: "",
          text: "",
        };
      }
    });

    const isErrorAll = computed(() => {
      if (isErrorTh.value || isErrorEng.value) return true;
      else return false;
    });
    // #endregion

    onMounted(() => {
      const studentStore = useStudentStore();

      if (!studentStore.studentData.isUpdateCertName) {
        studentData.value.nameTh = studentStore.studentFullName;
        isShowDialogCertificateSetName.value = true;
        return;
      }

      funcGetCourseList();
    });

    return {
      // Store
      studentStore: useStudentStore(),
      systemStore: useSystemStore(),

      // Data
      studentData,
      certificateListPerPage,
      currentPage,

      // Boolearn
      isShowDialogAlertCertificateCondition,
      isShowDialogCertificateSetName,
      isShowDialogConfirmDownloadCertificate,
      isLoading,
      isErrorTh,
      isErrorEng,

      // Function
      funcSelectedCertificate,
      funcBackToLobby,
      funcCloseConfirmDownloadCertificate,
      funcGenerateCertificate,
      funcSetCertificateName,
      funcSaveCertificateName,
      funcCheckInputName,

      // Computed
      alertMessage,
      pagination,
      isErrorAll,
    };
  },
};
</script>

<style lang="scss" scoped>
// #region Other
.overlay {
  background-blend-mode: overlay;
  cursor: not-allowed;
}

.text-title-download {
  color: #4a261b;
}

.text-dialog-certificate {
  color: #4a261b;
}
// #endregion

// #region Desktop
.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
  overflow: hidden;
}

.background-main {
  width: 100%;
  min-width: 360px;
  background-image: url("/images/background_main/backdrop-certificate.png");
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
}

.box-image-certificate {
  width: 29.8%;
  margin-bottom: 2.5%;
}

.certificate-box-page-number {
  width: 3.979%;
}

.certificate-page-number {
  width: 100%;
  height: 100%;
  color: #884924;
  border: 1px solid #e9e9e9;
  font-size: clamp(14px, 1.25vw, 20px);
}

.certificate-page-number.selected {
  color: #fff;
  background-color: #884924;
}

.certificate-dialog-alert-condition {
  width: 320px;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 20px;
  padding: 7px;
}

.certificate-dialog-alert-condition .content {
  background-color: #ffedc4;
  border-radius: 11px;
  padding: 15px;
}

.font-name {
  color: #dc3e44;
  font-size: clamp(7.5px, 0.75vw, 12px);
}

.font-level {
  font-size: clamp(5px, 0.5vw, 8px);
  color: #153f67;
}

.font-date {
  color: #153f67;
  font-size: clamp(3px, 0.4vw, 6px);
}

.text-not-pass {
  width: 100%;
  top: 35%;
  font-size: clamp(16px, 1.5vw, 24px);
  color: #4a261b;
}
// #endregion

// #region Mobile

.box-container-main-mobile {
  max-width: 1000px;
  min-width: 320px;
  width: 100%;
  height: 100%;
}

.background-main-mobile {
  width: 100%;
  min-width: 360px;
  background-image: url("/images/background_main/background-certificate.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.certificate-container-main.mobile {
  max-width: 600px;
  width: 100%;
}

.certificate-box-page-number-mobile {
  max-width: 45px;
  width: 3.979%;
  min-width: 35px;
}

.certificate-page-number-mobile {
  width: 100%;
  height: 100%;
  color: #884924;
  border: 1px solid #e9e9e9;
  font-size: 14px;
}

.certificate-page-number.mobile.selected {
  color: #fff;
  background-color: #884924;
}

.font-name-mobile {
  color: #dc3e44;
  font-size: 12px;
}

.font-level-mobile {
  font-size: 8px;
  color: #153f67;
}

.font-date-mobile {
  color: #153f67;
  font-size: 6px;
}
// #endregion
</style>
