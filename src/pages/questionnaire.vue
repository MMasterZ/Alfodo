<template>
  <q-page
    class="questionnaire-background row"
    :class="systemStore.platform.mobile ? 'mobile' : ''"
  >
    <!-- #region Desktop -->
    <div class="col-12" v-if="!isLoading && systemStore.platform.desktop">
      <div
        class="fit animate__animated animate__zoomInUp"
        style="animation-duration: 0.5s"
        v-if="!isShowDialogFinish"
      >
        <!-- #region Button Close -->
        <div
          class="q-pa-sm animate__animated animate__fadeIn animate__delay-2s"
          align="right"
          v-if="!isShowDialogFinish"
        >
          <q-btn round dense push>
            <q-img
              style="width: 48px"
              no-spinner
              no-transition
              src="/images/icon_main/icon-close.png"
              class="cursor-pointer"
              @click="funcBackToLobby()"
            ></q-img>
          </q-btn>
        </div>
        <!-- #endregion -->

        <!-- #region Container Content -->
        <div class="questionnaire-container" align="center">
          <div class="questionnaire-box-content">
            <div class="questionnaire-box-content-sub">
              <!-- #region Header -->
              <div class="questionnaire-content-header row justify-center items-center">
                <div class="self-center">
                  <div class="font-mali-b f40 text-content-header" align="center">
                    แบบสอบถามความพึงพอใจ
                  </div>
                  <div class="font-mali-m f20 text-content-header-sub" align="center">
                    น้องๆ คิดว่าการผจญภัยในครั้งนี้ เป็นอย่างไร มาร่วมให้คะแนนกันเถอะ
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Content -->
              <div class="questionnaire-content-forms row justify-center items-center">
                <!-- #region Title And Forms -->
                <div class="col-12 font-mali-sb self-start" align="left">
                  <!-- #region Title -->
                  <div class="row text-content-title">
                    <div class="" style="width: 45px" align="left">
                      {{ `${currentIndex + 1}. ` }}
                    </div>
                    <div class="col">
                      <div class="">
                        {{ `${questionnaireData.question}` }}
                      </div>
                      <div class="text-condition" v-if="questionnaireData.isMultiAnswer">
                        {{
                          `**เลือกได้${
                            questionnaireData.numOfAnswer == 0
                              ? "หลายคำตอบ"
                              : ` ${questionnaireData.numOfAnswer} คำตอบ`
                          }**`
                        }}
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region Forms -->
                  <div class="row" style="width: 100%">
                    <div style="width: 45px"></div>
                    <div class="col">
                      <!-- Satisfaction -->
                      <questionnaire-emoji
                        v-if="questionnaireData.type == 'emoji'"
                        :questionnaireData="questionnaireData"
                      ></questionnaire-emoji>

                      <!-- Check box -->
                      <questionnaire-multiple-choices
                        v-if="questionnaireData.type == 'multipleChoices'"
                        :questionnaireData="questionnaireData"
                      ></questionnaire-multiple-choices>

                      <!-- Radio button -->
                      <questionnaire-radio-button
                        v-if="questionnaireData.type == 'radioButton'"
                        :questionnaireData="questionnaireData"
                      ></questionnaire-radio-button>

                      <!-- Textarea -->
                      <div
                        class="q-mt-lg animate__animated animate__fadeIn"
                        v-if="
                          questionnaireData.isShowTextArea ||
                          questionnaireData.type == 'openEnded'
                        "
                      >
                        <div class="f20 font-mali-m" style="color: #4a261b">
                          จำเป็นต้องใส่ความคิดเห็น**
                        </div>
                        <div
                          class="questionnaire-textarea q-px-md"
                          :class="isValidateTextArea ? 'validate' : ''"
                        >
                          <q-input
                            type="textarea"
                            dense
                            borderless
                            input-class=" q-py-sm f20 font-mali-r "
                            placeholder="อธิบายเพิ่มเติม"
                            maxlength="100"
                            :input-style="
                              isValidateTextArea
                                ? 'line-height:1.5;color:#FF2F2F;'
                                : questionnaireData.description.length > 0
                                ? 'line-height:1.5;color:#4A261B;'
                                : `line-height:1.5;color:#BDB67A !important;`
                            "
                            v-model="questionnaireData.description"
                            :rules="[(val) => funcCheckValidate(val)]"
                            ref="inputTextarea"
                          ></q-input>
                        </div>
                        <div
                          align="right"
                          :style="isValidateTextArea ? 'color:#FF2F2F;' : ''"
                        >
                          {{ `(${questionnaireData.description.length}/100)` }}
                        </div>
                      </div>
                    </div>
                    <div style="width: 45px"></div>
                  </div>
                  <!-- #endregion -->
                </div>
                <!-- #endregion -->

                <!-- #region Button Next And Previous -->
                <div class="col-12 row self-end" style="height: 100px">
                  <div class="col-1" style="width: 45px"></div>
                  <!-- Previous button -->
                  <div class="col-1 self-end" style="width: 160px">
                    <q-img
                      v-show="currentIndex > 0"
                      no-spinner
                      no-transition
                      src="/images/questionnaire/questionnaire-button-previous.png"
                      @click="currentIndex > 0 ? currentIndex-- : null"
                      class="cursor-pointer"
                    ></q-img>
                  </div>
                  <q-space></q-space>
                  <!-- Next button And Finish button -->
                  <div class="col-1 self-end" style="width: 160px">
                    <q-img
                      no-spinner
                      no-transition
                      :src="`/images/questionnaire/questionnaire-button-next${
                        isNextStep ? '' : '-disable'
                      }.png`"
                      @click="isNextStep ? funcNextStep() : null"
                      :class="isNextStep ? 'cursor-pointer' : 'cursor-not-allowed'"
                      v-if="!isCheckLastQuestionnaire"
                    ></q-img>
                    <q-img
                      no-spinner
                      no-transition
                      src="/images/questionnaire/questionnaire-button-send-forms.png"
                      @click="funcNextStep()"
                      class="cursor-pointer"
                      v-if="isNextStep && isCheckLastQuestionnaire"
                    ></q-img>
                  </div>
                  <div class="col-1" style="width: 45px"></div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="!isLoading && systemStore.platform.mobile" class="col-12">
      <div class="animate__animated animate__fadeIn fit" v-if="!isShowDialogFinish">
        <div class="questionnaire-container mobile" align="center">
          <div class="questionnaire-box-content mobile">
            <!-- #region Header -->
            <div class="questionnaire-content-header mobile" align="left">
              <div align="right" class="q-pa-xs">
                <q-btn round dense push flat>
                  <q-img
                    style="width: 30px"
                    no-spinner
                    no-transition
                    src="/images/icon_main/icon-close.png"
                    class="cursor-pointer"
                    @click="funcBackToLobby()"
                  ></q-img>
                </q-btn>
              </div>
              <div class="q-px-md q-pb-md">
                <div class="f20 font-mali-b">แบบสอบถามความพึงพอใจ</div>
                <div class="f14 font-mali-m">
                  น้องๆ คิดว่าการผจญภัยในครั้งนี้ เป็นอย่างไร มาร่วมให้คะแนนกันเถอะ
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Content -->
            <div class="questionnaire-content-forms mobile">
              <!-- #region Title -->
              <div class="row text-content-title mobile font-mali-sb">
                <div class="q-pr-xs" style="width: fit-content" align="left">
                  {{ `${currentIndex + 1}. ` }}
                </div>
                <div class="col" align="left">
                  <div class="">
                    {{ `${questionnaireData.question}` }}
                  </div>
                  <div
                    class="text-condition mobile"
                    v-if="questionnaireData.isMultiAnswer"
                  >
                    {{
                      `**เลือก${
                        questionnaireData.numOfAnswer == 0
                          ? "ได้หลายคำตอบ"
                          : ` ${questionnaireData.numOfAnswer} คำตอบ`
                      }**`
                    }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Forms -->
              <div class="">
                <div>
                  <!-- Satisfaction -->
                  <questionnaire-emoji
                    v-if="questionnaireData.type == 'emoji'"
                    :questionnaireData="questionnaireData"
                  ></questionnaire-emoji>

                  <!-- Check box -->
                  <questionnaire-multiple-choices
                    v-if="questionnaireData.type == 'multipleChoices'"
                    :questionnaireData="questionnaireData"
                  ></questionnaire-multiple-choices>

                  <!-- Radio button -->
                  <questionnaire-radio-button
                    v-if="questionnaireData.type == 'radioButton'"
                    :questionnaireData="questionnaireData"
                  ></questionnaire-radio-button>

                  <!-- Textarea -->
                  <div
                    class="q-mt-md animate__animated animate__fadeIn q-px-md"
                    v-if="questionnaireData.isShowTextArea"
                    align="left"
                  >
                    <div class="f14 font-mali-m" style="color: #4a261b">
                      จำเป็นต้องใส่ความคิดเห็น**
                    </div>
                    <div
                      class="questionnaire-textarea mobile"
                      :class="isValidateTextArea ? 'validate' : ''"
                    >
                      <q-input
                        type="textarea"
                        dense
                        input-class="q-pa-sm f14"
                        borderless
                        placeholder="อธิบายเพิ่มเติม"
                        maxlength="100"
                        :input-style="
                          isValidateTextArea
                            ? 'line-height:1.3;color:#FF2F2F;'
                            : questionnaireData.description.length > 0
                            ? 'line-height:1.3;color:#4A261B;'
                            : `line-height:1.3;color:#BDB67A !important;`
                        "
                        v-model="questionnaireData.description"
                        :rules="[(val) => funcCheckValidate(val)]"
                        ref="inputTextarea"
                      ></q-input>
                    </div>
                    <div
                      align="right"
                      style="max-width: 500px; width: 100%"
                      :style="isValidateTextArea ? 'color:#FF2F2F;' : ''"
                    >
                      {{ `(${questionnaireData.description.length}/100)` }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->

            <!-- #region Button Next And Previous -->
            <div class="questionnaire-footer-button mobile fixed-bottom row">
              <!-- Previous button -->
              <div class="col-1 self-center" style="width: 100px">
                <q-img
                  v-show="currentIndex > 0"
                  no-spinner
                  no-transition
                  src="/images/questionnaire/questionnaire-button-previous.png"
                  @click="currentIndex > 0 ? currentIndex-- : null"
                  class="cursor-pointer"
                ></q-img>
              </div>
              <q-space></q-space>
              <!-- Next button And Finish button -->
              <div class="col-1 self-center" style="width: 100px">
                <q-img
                  no-spinner
                  no-transition
                  :src="`/images/questionnaire/questionnaire-button-next${
                    isNextStep ? '' : '-disable'
                  }.png`"
                  @click="isNextStep ? funcNextStep() : null"
                  :class="isNextStep ? 'cursor-pointer' : ''"
                  v-if="!isCheckLastQuestionnaire"
                ></q-img>
                <q-img
                  no-spinner
                  no-transition
                  src="/images/questionnaire/questionnaire-button-send-forms.png"
                  @click="isNextStep ? funcNextStep() : null"
                  :class="isNextStep ? 'cursor-pointer' : ''"
                  v-else
                ></q-img>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Finish -->
  <q-dialog seamless v-model="isShowDialogFinish" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div style="max-width: 320px; width: 100%">
          <q-img
            src="/images/questionnaire/questionnaire-dialog-finish.png"
            no-spinner
            no-transition
          >
            <div class="absolute-center transparent no-padding" style="top: 25%">
              <div class="relative-position">
                <q-img width="90px" src="/images/icon_main/icon-coin.png"> </q-img>
                <div
                  class="absolute-bottom"
                  style="bottom: -17%; left: 23%"
                  align="center"
                >
                  <span
                    class="text-coin f40 font-mali-sb"
                    :data-text="`x${practiceStore.questionnaireData.coinReward}`"
                    >{{ `x${practiceStore.questionnaireData.coinReward}` }}</span
                  >
                </div>
              </div>
            </div>
            <div class="absolute-bottom transparent" style="bottom: 3%" align="center">
              <q-img
                width="50%"
                class="cursor-pointer"
                @click="funcBackToLobby()"
                src="/images/questionnaire/questionnaire-button-close.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- <dialog-loading :isShowLoading="isLoading"></dialog-loading> -->
</template>

<script>
import dialogLoading from "components/dialog-loading.vue";
import backgroundMain from "components/questionnaire_main/background_main.vue";
import questionnaireEmoji from "src/components/questionnaire_main/questionnaire-emoji.vue";
import questionnaireMultipleChoices from "src/components/questionnaire_main/questionnaire-multipleChoices.vue";
import questionnaireRadioButton from "src/components/questionnaire_main/questionnaire-radio-button.vue";
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePracticeStore } from "src/stores/practice";
import { useQuasar } from "quasar";
export default {
  components: {
    backgroundMain,
    questionnaireEmoji,
    questionnaireMultipleChoices,
    questionnaireRadioButton,
    dialogLoading,
  },
  props: {
    systemStore: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    // #region Initail Data
    const $router = useRouter();
    const $route = useRoute();
    const $q = useQuasar();
    // #endregion

    // #region Data
    const currentIndex = ref(0);
    const questionnaireList = ref([
      {
        type: "satisfaction",
        title: "ฉันชื่นชอบการเรียนภาษาอังกฤษด้วย Winner English",
        isCondition: false,
        isDescription: false,
        selected: null,
      },
      {
        type: "checkbox",
        title: "ทักษะการเรียนสามอันดับที่ฉันชื่นชอบที่สุดใน Winner English",
        condition: "**เลือก 3 ทักษะ**",
        isCondition: true,
        isDescription: false,
        selected: [],
        description: "",
      },
      {
        type: "radioButton",
        title:
          "ทักษะการเรียนใน Winner English ที่ฉันอยากให้ปรับปรุงมากที่สุดคืออะไร เพราะเหตุใด",
        condition: "",
        isCondition: false,
        isDescription: true,
        selected: [],
        description: "",
      },
      {
        type: "suggestion",
        title: "ข้อเสนอแนะ (ไม่บังคับ)",
        condition: "",
        isCondition: false,
        isDescription: true,
        selected: [],
        description: "",
      },
    ]);
    const isShowDialogFinish = ref(false);
    const isValidateTextArea = ref(false);
    // #endregion Data

    // #region ----- Function -----

    // #region Next Step
    const funcNextStep = async () => {
      const practiceStore = usePracticeStore();

      if (currentIndex.value == questionnaireList.value.length - 1) {
        $q.loading.show();
        await practiceStore.saveQuestionnaireLog(questionnaireData.value);
        await practiceStore.saveQuestionnaireSetLog();
        $q.loading.hide();
        isShowDialogFinish.value = true;
      } else {
        practiceStore.saveQuestionnaireLog(questionnaireData.value);

        currentIndex.value++;

        if (questionnaireData.value.isShowTextArea) {
          setTimeout(() => {
            inputTextarea.value.resetValidation();
            isValidateTextArea.value = false;
          }, 10);
        }
      }
    };
    // #endregion

    // #region Get Data
    const isLoading = ref(true);
    const funcGetQuestionnaire = async () => {
      const practiceStore = usePracticeStore();

      let response = await practiceStore.getQuestionnaire();

      if (response) {
        questionnaireList.value = response;
        isLoading.value = false;
      }
    };
    // #endregion

    // #region Back To Lobby
    const funcBackToLobby = () => {
      $router.replace("/lobby");
    };
    // #endregion

    // #region Check Validate
    const inputTextarea = ref(null);
    const funcCheckValidate = (val) => {
      let isCheck = true;

      if (val) {
        isCheck = true;
        isValidateTextArea.value = false;
      } else {
        isValidateTextArea.value = true;
        isCheck = false;
      }

      return isCheck || "";
    };
    // #endregion

    // #endregion ----- Function -----

    // #region ----- Computed -----
    // #region Questionnaire Data
    const questionnaireData = computed(() => {
      let isCheckQuestionnaire = questionnaireList.value.length ? true : false;
      let findData = {};
      if (isCheckQuestionnaire) {
        findData = questionnaireList.value[currentIndex.value];
      }

      return findData;
    });
    // #endregion

    // #region placeholder Textarea
    const placeholderText = computed(() => {
      let placeholder = "";

      let type = questionnaireData.value.type;
      if (type == "checkbox" || type == "radioButton") {
        placeholder = "กรุณาใส่เหตุผล";
      } else if (type == "suggestion") {
        placeholder = "ใส่ข้อความ...";
      }

      return placeholder;
    });
    // #endregion

    // #region Is Check Next Button
    const isNextStep = computed(() => {
      let isCheck = false;

      let type = questionnaireData.value.type;
      let data = questionnaireData.value;

      if (type == "emoji") {
        isCheck = data.selected != null ? true : false;
      } else if (type == "multipleChoices") {
        let numOfAnswer = data.numOfAnswer;
        let numOfSelected = data.selected.length;

        if (!data.isMultiAnswer) {
          if (numOfSelected && isCheckDescriptionPass.value) {
            isCheck = true;
          }
        } else {
          if (numOfAnswer == 0) {
            if (numOfSelected > 0) {
              isCheck = true;
            }
          } else if (numOfAnswer > 0) {
            if (numOfSelected >= numOfAnswer && isCheckDescriptionPass.value) {
              isCheck = true;
            }
          }
        }
      }

      return isCheck;
    });
    // #endregion

    // #region Is Check Description Pass
    const isCheckDescriptionPass = computed(() => {
      let isCheck = false;

      let data = questionnaireData.value;

      if (data.type == "multipleChoices") {
        if (data.isShowTextArea) {
          if (data.description.length > 0) {
            isCheck = true;
          }
        } else {
          isCheck = true;
        }
      }

      return isCheck;
    });
    // #endregion

    // #region is Check last Questionnaire
    const isCheckLastQuestionnaire = computed(() => {
      let isCheck = false;

      if (currentIndex.value == questionnaireList.value.length - 1) {
        isCheck = true;
      }

      return isCheck;
    });
    // #endregion

    // #endregion ----- Computed -----

    onMounted(async () => {
      const practiceStore = usePracticeStore();

      if (practiceStore.questionStatus.isFinish) {
        funcBackToLobby();
        return;
      }

      $q.loading.show();
      await funcGetQuestionnaire();
      $q.loading.hide();
    });

    return {
      // Store
      practiceStore: usePracticeStore(),

      // Data
      currentIndex,

      // Boolearn
      isValidateTextArea,
      isShowDialogFinish,
      isLoading,

      // Function
      funcNextStep,
      funcBackToLobby,
      funcCheckValidate,

      // Validation
      inputTextarea,

      // Computed
      questionnaireData,
      placeholderText,
      isNextStep,
      isCheckLastQuestionnaire,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-coin {
  color: #4a261b;
  // text-shadow: 03px 0px 3px #000;
  text-shadow: rgba(0, 0, 0, 0.1) 5px 0px 5px, rgba(0, 0, 0, 0.1) 4.90033px 0.993347px 5px,
    rgba(0, 0, 0, 0.1) 4.60531px 1.94709px 5px, rgba(0, 0, 0, 0.1) 4.12668px 2.82321px 5px,
    rgba(0, 0, 0, 0.1) 3.48353px 3.58678px 5px, rgba(0, 0, 0, 0.1) 2.70151px 4.20736px 5px,
    rgba(0, 0, 0, 0.1) 1.81179px 4.6602px 5px, rgba(0, 0, 0, 0.1) 0.849836px 4.92725px 5px,
    rgba(0, 0, 0, 0.1) -0.145998px 4.99787px 5px,
    rgba(0, 0, 0, 0.1) -1.13601px 4.86924px 5px,
    rgba(0, 0, 0, 0.1) -2.08073px 4.54649px 5px,
    rgba(0, 0, 0, 0.1) -2.94251px 4.04248px 5px,
    rgba(0, 0, 0, 0.1) -3.68697px 3.37732px 5px,
    rgba(0, 0, 0, 0.1) -4.28444px 2.57751px 5px,
    rgba(0, 0, 0, 0.1) -4.71111px 1.67494px 5px,
    rgba(0, 0, 0, 0.1) -4.94996px 0.7056px 5px,
    rgba(0, 0, 0, 0.1) -4.99147px -0.291871px 5px,
    rgba(0, 0, 0, 0.1) -4.83399px -1.27771px 5px,
    rgba(0, 0, 0, 0.1) -4.48379px -2.2126px 5px,
    rgba(0, 0, 0, 0.1) -3.95484px -3.05929px 5px,
    rgba(0, 0, 0, 0.1) -3.26822px -3.78401px 5px,
    rgba(0, 0, 0, 0.1) -2.4513px -4.35788px 5px,
    rgba(0, 0, 0, 0.1) -1.53666px -4.75801px 5px,
    rgba(0, 0, 0, 0.1) -0.560763px -4.96845px 5px,
    rgba(0, 0, 0, 0.1) 0.437495px -4.98082px 5px,
    rgba(0, 0, 0, 0.1) 1.41831px -4.79462px 5px,
    rgba(0, 0, 0, 0.1) 2.34258px -4.41727px 5px,
    rgba(0, 0, 0, 0.1) 3.17346px -3.86382px 5px,
    rgba(0, 0, 0, 0.1) 3.87783px -3.15633px 5px,
    rgba(0, 0, 0, 0.1) 4.4276px -2.32301px 5px,
    rgba(0, 0, 0, 0.1) 4.80085px -1.39708px 5px,
    rgba(0, 0, 0, 0.1) 4.98271px -0.415447px 0px;
}

.text-coin::after {
  content: attr(data-text);
  position: absolute;
  top: 0%;
  left: 0%;
  text-shadow: rgb(255, 255, 255) 5px 0px 0px, rgb(255, 255, 255) 4.90033px 0.993347px 0px,
    rgb(255, 255, 255) 4.60531px 1.94709px 0px, rgb(255, 255, 255) 4.12668px 2.82321px 0px,
    rgb(255, 255, 255) 3.48353px 3.58678px 0px, rgb(255, 255, 255) 2.70151px 4.20736px 0px,
    rgb(255, 255, 255) 1.81179px 4.6602px 0px, rgb(255, 255, 255) 0.849836px 4.92725px 0px,
    rgb(255, 255, 255) -0.145998px 4.99787px 0px,
    rgb(255, 255, 255) -1.13601px 4.86924px 0px,
    rgb(255, 255, 255) -2.08073px 4.54649px 0px,
    rgb(255, 255, 255) -2.94251px 4.04248px 0px,
    rgb(255, 255, 255) -3.68697px 3.37732px 0px,
    rgb(255, 255, 255) -4.28444px 2.57751px 0px,
    rgb(255, 255, 255) -4.71111px 1.67494px 0px,
    rgb(255, 255, 255) -4.94996px 0.7056px 0px,
    rgb(255, 255, 255) -4.99147px -0.291871px 0px,
    rgb(255, 255, 255) -4.83399px -1.27771px 0px,
    rgb(255, 255, 255) -4.48379px -2.2126px 0px,
    rgb(255, 255, 255) -3.95484px -3.05929px 0px,
    rgb(255, 255, 255) -3.26822px -3.78401px 0px,
    rgb(255, 255, 255) -2.4513px -4.35788px 0px,
    rgb(255, 255, 255) -1.53666px -4.75801px 0px,
    rgb(255, 255, 255) -0.560763px -4.96845px 0px,
    rgb(255, 255, 255) 0.437495px -4.98082px 0px,
    rgb(255, 255, 255) 1.41831px -4.79462px 0px,
    rgb(255, 255, 255) 2.34258px -4.41727px 0px,
    rgb(255, 255, 255) 3.17346px -3.86382px 0px,
    rgb(255, 255, 255) 3.87783px -3.15633px 0px,
    rgb(255, 255, 255) 4.4276px -2.32301px 0px,
    rgb(255, 255, 255) 4.80085px -1.39708px 0px,
    rgb(255, 255, 255) 4.98271px -0.415447px 0px;
}

// #region Desktop Mode
.questionnaire-background {
  min-width: 1000px;
  background-image: url("/images/questionnaire/questionnaire-background.png");
  background-size: cover;
  background-position: center;
}

.questionnaire-container {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  padding: 1%;
  margin: auto;
}

.questionnaire-box-content {
  max-width: 1200px;
  width: 100%;
  min-height: 800px;
  height: 100%;
  max-height: fit-content;
  background-color: #e3e3e3;
  border-radius: 30px;
  border: 4px solid #d4751c;
  overflow: hidden;
}

.questionnaire-box-content-sub {
  width: 100%;
  height: 99%;
  min-height: 800px;
  height: 100%;
  max-height: fit-content;
  background-color: #fff;
  border-radius: 0px 0px 30px 30px;
}

.questionnaire-content-header {
  width: 100%;
  height: 130px;
  background-color: #1989ff;
  color: #fff;
}

.text-content-header {
  font-size: 40px;
}

.text-content-header-sub {
  font-size: 20px;
}

.questionnaire-content-forms {
  min-height: calc(800px - 130px);
  height: 100%;
  max-height: fit-content;
  padding: 5% 5% 3% 5%;
}

.text-content-title {
  color: #4a261b;
  font-size: 32px;
}

.text-condition {
  font-size: max(16px, min(20px, 1.5vw));
  color: #ff5050;
}

.questionnaire-textarea {
  width: 100%;
  height: 150px;
  border: 2px solid #4a261b;
  background-color: #fffce1;
  border-radius: 10px;
  overflow: hidden;
}

.text-detail {
  line-height: 2;
}

.questionnaire-textarea.validate {
  border: 2px solid #ff2f2f;
}

// #endregion

// #region Mobile Mode

.questionnaire-background.mobile {
  min-width: 300px;
  // background-color: #fff !important;
  // background-image: none !important;
}

.questionnaire-container.mobile {
  max-width: 100%;
  width: 100%;
  min-width: 300px;
  height: 100%;
  padding: 0%;
  background-color: #fff;
  margin: auto;
}

.questionnaire-box-content.mobile {
  max-width: 100%;
  width: 100%;
  min-height: fit-content;
  height: 100%;
  background-color: transparent !important;
  border-radius: 0px !important;
  border: 0px solid transparent !important;
  overflow: hidden;
}

.questionnaire-content-header.mobile {
  height: fit-content !important;
}

.questionnaire-content-forms.mobile {
  min-height: fit-content !important;
  padding: 10px 5px 60px 5px !important;
}

.text-content-title.mobile {
  font-size: 16px;
}

.text-condition.mobile {
  font-size: 14px !important;
}

.questionnaire-textarea.mobile {
  max-width: 500px;
  width: 100%;
  height: 150px;
  border: 1px solid #4a261b;
  background-color: #fffce1;
  border-radius: 5px;
  overflow: hidden;
}

.questionnaire-textarea.mobile.validate {
  border: 2px solid #ff2f2f;
}
.questionnaire-footer-button.mobile {
  height: 50px;
  background-color: #fff;
  padding: 0px 10px;
  box-shadow: 0px -1px 2px 0px rgba(0, 0, 0, 0.2);
}
// #endregion
</style>
