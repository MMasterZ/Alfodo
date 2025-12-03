<template>
  <q-dialog
    maximized
    v-model="practiceData.isSendAnswer"
    position="bottom"
    seamless
    no-esc-dismiss
    transition-show="slide-up"
    transition-hide="slide-down"
    class="z-max"
    v-if="practiceData.isSendAnswer && !practiceData.isFinishPractice"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="no-padding">
        <div class="relative-position" align="left">
          <div
            class="relative-position"
            :style="$q.platform.is.desktop ? 'left:5%;top: 80px' : 'top: 60px'"
            style="width: 300px"
          >
            <q-img width="180px" :src="soundAndMonster" />
          </div>
        </div>

        <div
          align="center"
          class="row justify-center shadow-5"
          :class="practiceData.isCorrectAnswer ? 'bg-correct' : 'bg-incorrect'"
          :style="
            $q.platform.is.desktop
              ? 'min-height: 160px;max-height: fit-content;width: 100%;min-width: fit-content;'
              : 'margin-top:25px;padding:45px 15px 20px 15px;'
          "
        >
          <div
            class="row"
            :class="$q.platform.is.desktop ? 'q-px-lg q-pb-lg q-pt-md' : ''"
            :style="
              $q.platform.is.desktop
                ? 'max-width: 1600px; width: 100%; min-width: 1000px'
                : ''
            "
          >
            <!-- คั้นไว้เฉยๆ -->
            <div class="col-2" style="width: 250px" v-if="$q.platform.is.desktop"></div>

            <!-- #region Icon ถูก-ผิด -->
            <div
              :class="$q.platform.is.desktop ? 'col-1 self-start ' : 'col-1'"
              style="width: fit-content"
            >
              <q-icon
                :size="$q.platform.is.desktop ? '80px' : '3em'"
                color="green"
                style="color: #58cc02"
                v-if="practiceData.isCorrectAnswer"
                name="far fa-check-circle"
              ></q-icon>
              <q-icon
                :size="$q.platform.is.desktop ? '80px' : '3em'"
                style="color: #ec0b1b"
                v-else
                name="far fa-times-circle"
              ></q-icon>
            </div>
            <!-- #endregion -->

            <div
              class="q-px-md col self-start"
              :style="practiceData.isCorrectAnswer ? 'color:#58CC02' : 'color:#EC0B1B;'"
              align="left"
            >
              <div class="q-px-sm" style="width: 100%">
                <!-- #region Phonics Only -->
                <div v-if="practiceStore.skill == 'Phonics'" class="f18 text-bold">
                  <div class="f24 text-bold">
                    <div v-if="practiceData.isCorrectAnswer">Correct</div>
                    <div v-else>Incorrect</div>
                  </div>

                  <div
                    v-if="practiceStore.practiceType == 'multiplechoices(questionsound)'"
                  >
                    <div class="q-mt-sm">
                      {{ `เสียงโจทย์คือ` }}
                      <span class="text-question" v-html="practiceData.question"></span>
                    </div>
                    <div class="q-mt-sm">
                      <span
                        class="text-question"
                        v-html="practiceData.currentAnswer"
                      ></span>
                      {{ `เป็นคำตอบที่ถูกต้อง` }}
                    </div>
                  </div>

                  <div v-else class="q-mt-sm">
                    <div v-if="!practiceData.isCorrectAnswer">
                      <span
                        class="f18 text-bold"
                        v-html="practiceData.currentChoice"
                      ></span>
                      <span class="q-ml-md f16 text-bold">เป็นคำตอบที่ผิด</span>
                    </div>
                    <div class="q-mt-sm">
                      <span
                        class="text-bold f16 q-mr-md"
                        v-if="!practiceData.isCorrectAnswer"
                        >คำตอบที่ถูกต้อง คือ</span
                      >
                      <span
                        class="f18 text-bold text-secondary"
                        v-html="practiceData.currentAnswer"
                      ></span>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <div v-else>
                  <!-- #region Role play Only-->
                  <div
                    class="font-mali-b f18"
                    v-if="practiceStore.practiceType == 'roleplay'"
                  >
                    <div>
                      <div
                        class="f24 font-mali-b"
                        v-html="practiceData.currentChoice"
                      ></div>
                      <div
                        class="q-mt-sm"
                        :class="practiceData.currentChoice == '' ? 'q-mt-md' : ''"
                        style="color: #2aa89a"
                      >
                        <span v-html="practiceData.currentAnswer"></span>
                      </div>
                      <div class="q-mt-sm">
                        <span v-html="practiceData.displayHtml"></span>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region Other Practice -->
                  <div v-else>
                    <!-- กรณีตอบผิด : ใช้กับทุกแบบฝึกหัด -->
                    <div
                      class="q-my-xs"
                      v-if="!practiceData.isCorrectAnswer && practiceData.currentChoice"
                    >
                      <span
                        class="f18 text-bold"
                        v-html="practiceData.currentChoice"
                      ></span>
                      <span class="q-ml-sm f16 text-bold">เป็นคำตอบที่ผิด</span>
                    </div>

                    <!-- <span
                      class="q-ml-md f18 text-bold"
                      v-if="
                        !practiceData.isEnableNext &&
                        !practiceData.isFinishPractice &&
                        practiceData.currentChoice
                      "
                      v-html="practiceData.currentChoice"
                    ></span> -->
                    <!-- <div
                      :style="practiceData.currentChoice == '' ? 'margin-top:10px' : ''"
                    >
                      <span
                        class="q-ml-md f18 text-bold"
                        v-if="
                          !practiceData.isEnableNext && !practiceData.isFinishPractice
                        "
                        v-html="practiceData.currentChoice"
                      ></span>
                      <div>
                        <span
                          class="q-ml-md f16 text-bold"
                          v-if="
                            !practiceData.isEnableNext && !practiceData.isFinishPractice
                          "
                          v-html="practiceData.currentAnswer"
                        ></span>
                      </div>
                    </div> -->

                    <!-- กรณีตอบถูก : ใช้กับทุกแบบฝักหัด-->
                    <div class="q-my-sm">
                      <span class="text-bold f24" v-if="practiceData.isCorrectAnswer">
                        Correct</span
                      >
                      <span
                        class="text-bold f18 q-mr-sm"
                        v-if="!practiceData.isCorrectAnswer"
                        >คำตอบที่ถูกต้อง คือ</span
                      >
                      <br v-if="practiceData.isCorrectAnswer" />
                      <span
                        class="f18 text-bold"
                        :style="
                          !practiceData.isCorrectAnswer
                            ? 'color: #58cc02'
                            : 'color:#2DA0D2;'
                        "
                        v-html="practiceData.currentAnswer"
                      ></span>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <!-- #region คำอธิบาย -->
                  <div
                    class="f16 q-my-sm font-mali-r"
                    v-if="practiceData.description.length"
                  >
                    <span
                      :style="
                        practiceData.isCorrectAnswer ? 'color: #2DA0D2' : 'color:#EC0B1B;'
                      "
                      v-html="practiceData.description"
                    >
                    </span>
                  </div>
                  <!-- #endregion -->

                  <!-- #region อ้างอิง -->
                  <div
                    :style="
                      practiceData.isCorrectAnswer ? 'color: #1a8a80' : 'color:#EC0B1B;'
                    "
                    class="q-mt-sm f16 font-mali-r"
                    v-if="practiceData.refs.length"
                  >
                    <div v-for="(item, index) in practiceData.refs">
                      <span>{{ `อ้างอิง#${index + 1} : ${item}` }}</span>
                    </div>
                  </div>
                  <!-- #endregion -->
                </div>
              </div>
            </div>

            <q-space v-if="$q.platform.is.desktop"></q-space>

            <!-- #region Button Next And Finish -->
            <div
              :class="$q.platform.is.desktop ? 'self-end' : 'col-12 q-pt-lg'"
              :style="$q.platform.is.desktop ? 'width: fit-content' : 'width:100%'"
              :align="$q.platform.is.desktop ? 'left' : 'center'"
            >
              <!-- #region แบบฝึกหัด Grammar Action -->
              <div v-if="systemStore.routerName == 'grammaraction'">
                <div v-if="!synchronizeStore.isSync">
                  <q-img
                    src="/images/button_main/button-next-question.png"
                    no-spinner
                    no-transition
                    width="160px"
                    @click="$emit('callback-nextquestion')"
                    class="cursor-pointer"
                    v-if="practiceData.currentQuestion + 1 != practiceData.totalQuestion"
                  ></q-img>

                  <q-img
                    src="/images/button_main/button-finish-practice.png"
                    no-spinner
                    no-transition
                    width="160px"
                    @click="funcFinishPracticeDialog()"
                    class="cursor-pointer"
                    v-if="
                      practiceData.currentQuestion + 1 == practiceData.totalQuestion &&
                      !practiceData.isFinishPractice
                    "
                  ></q-img>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region แบบฝึกหัด Translation -->
              <div
                v-else-if="
                  systemStore.routerName == 'translation' ||
                  systemStore.routerName == 'readingmultiple'
                "
              >
                <q-img
                  src="/images/button_main/button-next-question.png"
                  no-spinner
                  no-transition
                  width="160px"
                  @click="$emit('callback-nextquestion')"
                  class="cursor-pointer"
                  v-if="!practiceData.isShowBtnContent"
                ></q-img>

                <q-img
                  src="/images/button_main/button-next-question.png"
                  no-spinner
                  no-transition
                  width="160px"
                  @click="$emit('callback-showcontent')"
                  class="cursor-pointer"
                  v-if="practiceData.isShowBtnContent"
                  v-close-popup
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region แบบฝึกหัด Role play -->
              <div v-else-if="systemStore.routerName == 'roleplay'">
                <q-img
                  src="/images/button_main/button-try-again-practice.png"
                  no-spinner
                  no-transition
                  width="160px"
                  @click="$emit('callback-re-record')"
                  v-close-popup
                  class="cursor-pointer"
                  v-if="
                    !practiceData.isEnableNext &&
                    !practiceData.isFinishRolePlay &&
                    practiceData.isSendAnswer
                  "
                ></q-img>

                <q-img
                  src="/images/button_main/button-next-question.png"
                  no-spinner
                  no-transition
                  width="160px"
                  @click="$emit('callback-nextquestion')"
                  class="cursor-pointer"
                  v-if="
                    practiceData.isEnableNext &&
                    !practiceData.isFinishRolePlay &&
                    practiceData.isSendAnswer
                  "
                ></q-img>

                <q-img
                  v-if="practiceData.isFinishRolePlay && practiceData.isSendAnswer"
                  src="/images/button_main/button-finish-practice.png"
                  width="160px"
                  @click="$emit('callback-finishPractice')"
                  class="cursor-pointer"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region แบบฝึกหัดอื่นๆ -->
              <div v-else>
                <q-img
                  v-if="practiceData.currentQuestion + 1 != practiceData.totalQuestion"
                  src="/images/button_main/button-next-question.png"
                  width="160px"
                  @click="$emit('callback-nextquestion')"
                  class="cursor-pointer"
                  no-spinner
                  no-transition
                ></q-img>

                <q-img
                  v-if="
                    practiceData.currentQuestion + 1 == practiceData.totalQuestion &&
                    !practiceData.isFinishPractice
                  "
                  src="/images/button_main/button-finish-practice.png"
                  width="160px"
                  @click="funcFinishPracticeDialog()"
                  class="cursor-pointer"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <!-- <finish-practice-dialog
    @callback-restart="$emit('callback-restart'), (isShowDialogFinish = false)"
    v-if="practiceData.isFinishPractice"
    :isDialogFinish="practiceData.isFinishPractice"
    :practiceData="practiceData"
    :syncData="synchronizeStore.syncData"
    :practiceStore="practiceStore"
  ></finish-practice-dialog> -->

  <dialog-finish-practice
    :practiceData="practiceData"
    v-if="practiceData.isFinishPractice && !practiceData.isLoadPractice"
    @callback-restart="practiceData.func.restartPractice()"
  ></dialog-finish-practice>
</template>

<script setup>
// New
import dialogFinishPractice from "../components/dialog_main/dialog-finish-practice.vue";

import finishPracticeDialog from "../components/dialog_main/finish-practice-dialog.vue";
// import finishPracticeDialog from "../components/finishPracticeDialog.vue";
import { ref, computed, watch, defineComponent } from "vue";
import { usePracticeStore } from "src/stores/practice";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useSystemStore } from "src/stores/system";

const components = defineComponent({
  finishPracticeDialog,
  // dialogFinishPractice,
});

const props = defineProps({
  practiceData: {
    type: Object,
    required: true,
  },
});

// Store
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const synchronizeStore = useSynchronizeStore();

const isShowDialogFinish = ref(false);

const soundAndMonster = computed(() => {
  let randomMonster = Math.ceil(Math.random() * 1);
  let skill = props.practiceData.skill[0].toLowerCase();

  let imagefile;

  if (props.practiceData.isCorrectAnswer) {
    imagefile = skill + "c" + randomMonster;
    systemStore.playEffectCorrect();
  } else {
    imagefile = skill + "in" + randomMonster;
    systemStore.playEffectIncorrect();
  }

  let showMonster = "";

  if (props.practiceData.isSendAnswer) {
    showMonster = `/images/monsters/${skill}/${imagefile}.gif`;
  }

  return showMonster;
});

const funcFinishPracticeDialog = async () => {
  if (props.practiceData.star > 0) {
    systemStore.playEffectPass();
  } else {
    systemStore.playEffectFail();
  }

  isShowDialogFinish.value = true;
  props.practiceData.isFinishPractice = true;
};

watch(
  () => synchronizeStore.syncData,
  async () => {
    if (synchronizeStore.syncData.isShowSummaryPractice) {
      if (!props.practiceData.isFinishPractice) {
        funcFinishPracticeDialog();
      }
    }
  }
);
</script>

<style lang="scss" scoped>
.bg-correct {
  background-color: #d7ffb8;
}

.bg-incorrect {
  background-color: #ffdfe0;
}

.btn-correct {
  background-color: #58a700;
}

.btn-incorrect {
  background-color: #ff4b4b;
}

.btn-default {
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
}

.text-question {
  color: #2da0d2;
}
</style>
