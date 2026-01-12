<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="relative-position box-essay-main" :class="{'mobile': isMobile}">
      <!-- #region Background -->
      <background-main-new :background="'background-essay-1.webp'" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-main :settingHeader="settingHeader"></header-main>
      <!-- #endregion -->

      <!-- #region Drag and Drop -->
      <drag-and-drop
        v-if="isShowDragAndDrop"
        :isShowButtonFinish="isShowButtonFinish"
        @callback-finish="handleCallbackFinish"
      ></drag-and-drop>
      <!-- #endregion -->

      <!-- #region Choose the best answer -->
      <choose-the-best-answer
        v-if="isShowChooseTheBestAnswer"
        :isShowButtonFinish="isShowButtonFinish"
        @callback-finish="handleCallbackFinish"
      ></choose-the-best-answer>
      <!-- #endregion -->

      <!-- #region Match choice -->
      <match-choice
        v-if="isShowMatchChoice"
        :isShowButtonFinish="isShowButtonFinish"
        @callback-finish="handleCallbackFinish"
      ></match-choice>
      <!-- #endregion -->

      <!-- #region Jigsaw -->
      <jigsaw v-if="isShowJigsaw" :isShowButtonFinish="isShowButtonFinish" @callback-finish="handleCallbackFinish"></jigsaw>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import backgroundMainNew from "src/components/background_main/background-main-new.vue";
import dragAndDrop from "src/components/essay_main/drag-and-drop.vue";
import chooseTheBestAnswer from "src/components/essay_main/choose-the-best-answer.vue";
import matchChoice from "src/components/essay_main/match-choice.vue";
import jigsaw from "src/components/essay_main/jigsaw.vue";
import headerMain from "src/components/essay_main/header-bar.vue";
import { useEssayStore } from "src/stores/essay";
import { useSystemStore } from "src/stores/system";
import { useRouter } from "vue-router";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const $router = useRouter()

const systemStore = useSystemStore();
const essayStore = useEssayStore();

const isMobile = ref($q.platform.is.mobile);
const currentStep = ref(1);
const settingHeader = ref({
  title:"Activity",
})

// State Show Components
const isShowDragAndDrop = ref(false);
const isShowChooseTheBestAnswer = ref(false);
const isShowMatchChoice = ref(false);
const isShowJigsaw = ref(false);
const isShowDialogAnswer = ref(false);
const isShowButtonFinish = ref(false);

// State Data
const isSuccess = ref(false);

// Function
const handleCallbackFinish = async () => {

  isShowDialogAnswer.value = true;
  isShowDragAndDrop.value = false;
  isShowChooseTheBestAnswer.value = false;
  isShowMatchChoice.value = false;
  isShowJigsaw.value = false;

  isShowButtonFinish.value = false;

  let page = essayStore.essayName

  let set_step = (currentStep.value + 1)

  if(page == "lesson_1"){
    if(set_step == 2){
      isShowChooseTheBestAnswer.value = true;
    }else if(set_step == 3){
      isShowMatchChoice.value = true;
      isShowButtonFinish.value = true
    }else{

      $q.loading.show();

      await essayStore.saveLessonPracticeLog(currentServerTime.value);
      $router.replace(`/essay/lesson`);

      setTimeout(() => {
        $q.loading.hide();
      }, 250);
      return;
    }
  }else{

    $q.loading.show();

    await essayStore.saveLessonPracticeLog(currentServerTime.value);
    $router.replace(`/essay/lesson`);

    setTimeout(() => {
      $q.loading.hide();
    }, 250);
    return;
  }

  currentStep.value++
};

const currentServerTime = ref(null);
const getEssayLessonPractice = async () => {

  try{

    let page = essayStore.essayName

    if(page == "lesson_1"){
      isShowDragAndDrop.value = true;
    }else {

      isShowButtonFinish.value = true;

      if(page == "lesson_2"){
      isShowChooseTheBestAnswer.value = true
      }else if(page == "lesson_3"){
        isShowMatchChoice.value = true
      }else if(page == "lesson_4"){
        isShowJigsaw.value = true
      }else if(page == "lesson_5"){
        isShowChooseTheBestAnswer.value = true
      }
    }

    let getServerTime = await systemStore.getServerTime();

    if(getServerTime.message != 'success'){
      throw new Error('error get time');
    }

    currentServerTime.value = getServerTime.data.timestamp;

  }catch(e){
    $q.loading.hide();
    $q.notify({
      message: 'Error get essay lesson practice',
      color: 'red',
      icon: 'error',
    });
  }

}

onMounted(async () => {

  $q.loading.hide();

  systemStore.setRouter("essay-lesson-practice");

  getEssayLessonPractice();

})

</script>

<style lang="scss" scoped>
.box-backdrop-main{
  width:100%;
  height:100%;
  background-image: url("/images/background_main/backdrop-essay-world.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &.mobile{
    background-image:url("/images/background_main/background-essay-3.webp");
    background-size: auto;
    background-position:22% -0%;
  }
}

.box-essay-main {
  max-width: 1600px;
  width: calc(100vh * 16 / 9);
  min-width: 1000px;
  overflow: hidden;
  container-type: inline-size;

  &.mobile{
    max-width: 1000px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
  }

  // --cqw: 1vw;
  @supports not (container-type: inline-size) {
    width: 100vw;
    max-width: 100vw;
    // --cqw: 1cqw;
  }
}
</style>
