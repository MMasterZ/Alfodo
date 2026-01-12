<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="box-essay-main relative-position" :class="{'mobile': isMobile}">

      <!-- #region Background -->
      <background-main-new :background="show_background" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar :settingHeader="showSettingHeader" @callback-click="funcCallback"></header-bar>
      <!-- #endregion -->

      <!-- #region Writing Practice 1 -->
      <practice-1 @callback-finish="funcCallbackFinishPractice" v-if="isShowWritingPractice1" :isShowHelp="isShowHelp" :isTutorial="isShowDialogTutorial" @callback-closeTutorial="funcCloseTutorial" @callback-closeDialog="funcCloseDialog()"></practice-1>
      <!-- #endregion -->

      <!-- #region Writing Practice 2 -->
      <practice-2 @callback-finish="funcCallbackFinishPractice" v-if="isShowWritingPractice2" :isUsefulWords="isShowDialogUsefulWords" :isViewDraft="isShowDialogViewDraft" @callback-closeDialog="funcCloseDialog()" :isDirection="isShowDialogDirection" :userAnswer="userAnswer" :isTutorial="isShowDialogTutorial" @callback-closeTutorial="funcCloseTutorial"></practice-2>
      <!-- #endregion -->

      <!-- #region Writing Practice 3 -->
      <practice-3 @callback-finish="funcCallbackFinishPractice" v-if="isShowWritingPractice3" :isViewDraft="isShowDialogViewDraft" @callback-closeDialog="funcCloseDialog()" :isDirection="isShowDialogDirection" :userAnswer="userAnswer"></practice-3>
      <!-- #endregion -->

      <!-- #region Finish Practice -->
      <finish-practice
        v-if="isShowFinishPractice"
        @callback-try-again="funcCallbackTryAgain"
        @callback-complete="funcCallbackComplete"
      ></finish-practice>
      <!-- #endregion -->

    </div>
  </q-page>
</template>

<script setup>
import headerBar from 'src/components/essay_main/header-bar.vue';
import backgroundMainNew from 'src/components/background_main/background-main-new.vue';
import practice1 from 'src/components/essay_main/practice-1.vue';
import practice2 from 'src/components/essay_main/practice-2.vue';
import practice3 from 'src/components/essay_main/practice-3.vue';
import finishPractice from 'src/components/essay_main/finish-practice.vue';
import { useQuasar } from 'quasar';
import { computed, onMounted, reactive, ref,watch } from 'vue';
import { useRouter } from 'vue-router';
import { useEssayStore } from 'src/stores/essay';
import { useStudentStore } from 'src/stores/student';

const $q = useQuasar();
const $router = useRouter();

const essayStore = useEssayStore();

const isMobile = ref($q.platform.is.mobile);
const isShowWritingPractice1 = ref(false);
const isShowWritingPractice2 = ref(false);
const isShowWritingPractice3 = ref(false);
const isShowFinishPractice = ref(false);

const isShowHelp = ref(false);
const isShowDialogTutorial = ref(false);
const isShowDialogUsefulWords = ref(false);
const isShowDialogHelp = ref(false);
const isShowDialogDirection = ref(true);
const isShowDialogNote = ref(false);
const isShowDialogViewDraft = ref(false);
const isShowDialogOutOfPractice = ref(false);

const funcCallback = (type) => {

  if(type == "useful") {
    if(isShowWritingPractice1.value) {
      isShowHelp.value = !isShowHelp.value;
    }else{
      isShowDialogUsefulWords.value = !isShowDialogUsefulWords.value;
    }
  }

  if(type == 'help'){
    isShowDialogHelp.value = true;
  }

  if(type == 'direction'){
    isShowDialogDirection.value = true;
  }

  if(type == 'note'){
    isShowDialogNote.value = true;
  }

  if(type == 'info'){
    isShowDialogTutorial.value = true;
  }

  if(type == 'view-draft'){
    isShowDialogViewDraft.value = true;
  }
};

const userAnswer = ref(null);
const funcCallbackFinishPractice = (type,data) => {

  userAnswer.value = data;

  essayStore.setWritingData(data,type);

  checkTutorial();

  if(type == 'practice-1'){
    isShowWritingPractice1.value = false;
    isShowWritingPractice2.value = true;
  } else if(type == 'practice-2'){
    isShowWritingPractice2.value = false;
    isShowWritingPractice3.value = true;
  } else if(type == 'practice-3'){
    isShowWritingPractice3.value = false;
    isShowFinishPractice.value = true;
  }

}

const show_background = computed(() => {
  let image = 'background-essay-1.webp'
  if(isShowWritingPractice2.value) {
    image = 'background-essay-2.webp'
  }else if(isShowWritingPractice3.value || isShowFinishPractice.value){
    image = 'background-essay-3.webp'
  }

  return image;

});

const funcCloseDialog = () => {
  isShowHelp.value = false;
  isShowDialogUsefulWords.value = false;
  isShowDialogHelp.value = false;
  isShowDialogDirection.value = false;
  isShowDialogNote.value = false;
  isShowDialogViewDraft.value = false
}

const funcCallbackTryAgain = () => {
  isShowFinishPractice.value = false;

  isShowWritingPractice3.value = true;
}

const funcCallbackComplete = () => {
  $router.replace("/essay/practice");
}

const checkTutorial = () => {
  try {

    if(essayStore.practiceListData.bestScore > 0) return

    const studentStore = useStudentStore();
    const tutorialCookieName = `tutorial_viewed_${studentStore.student.uid}`;

    // ใช้ window.document.cookie แทน $q.cookies
    const hasViewedTutorial = document.cookie.includes(`${tutorialCookieName}=true`);

    if (!hasViewedTutorial) {
      isShowDialogTutorial.value = true;
    } else {
      isShowDialogTutorial.value = false;
    }
  } catch (error) {
    console.error('Error checking tutorial cookie:', error);
    // ถ้าเกิด error ให้แสดง tutorial
    isShowDialogTutorial.value = true;
  }
}

const funcCloseTutorial = () => {
  // บันทึก cookie เมื่อปิด tutorial
  // ปิด tutorial dialog
  isShowDialogTutorial.value = false;
}

const showSettingHeader = computed(() => {

  let settingHeader = {
    title:"",
    isUsefulWords: false,
    isDirection: false,
    isHelp: false,
    isNote:false,
    isMenuHelp:false,
    isViewDraft:false,
  }

  let title = "Writing Practice";
  let isUsefulWords = false
  let isDirection = false
  let isHelp = false
  let isNote = false
  let isMenuHelp = false
  let isInfo = false
  let isViewDraft = false

  if(isShowWritingPractice1.value){
    isUsefulWords = true
    isDirection = false
    isInfo = true
  }else if(isShowWritingPractice2.value){
    isUsefulWords = true
    isDirection = true
    isViewDraft = true
    isInfo = true

    if(isMobile.value){
      isMenuHelp = true;
      isViewDraft = false
    }

  } else if(isShowWritingPractice3.value){
    title = "Essay Writing"
    isDirection = true
    isViewDraft = true
  } else{
    title = "Essay Writing"
  }

  settingHeader = {
    title:title,
    isUsefulWords: isUsefulWords,
    isDirection: isDirection,
    isHelp: isHelp,
    isNote: isNote,
    isMenuHelp:isMenuHelp,
    isInfo:isInfo,
    isViewDraft:isViewDraft,
  }

  return settingHeader;
})

onMounted(() => {
  essayStore.setEssayName("essayWriting");

  essayStore.setCurrentTopicId(essayStore.practiceId);

  if(essayStore.practiceData.isFinishFeedback){
    isShowWritingPractice3.value = true;
  }else{
    if(essayStore.writingData){
      if(essayStore.writingData.practice3){
        isShowFinishPractice.value = true;
        userAnswer.value = essayStore.writingData.practice3
      }else if(essayStore.writingData.practice2){
        isShowWritingPractice3.value = true;
        userAnswer.value = essayStore.writingData.practice2
      }else if(essayStore.writingData.practice1){
        isShowWritingPractice2.value = true;
        userAnswer.value = essayStore.writingData.practice1
      }
    }else{
      isShowWritingPractice1.value = true;
    }
  }

  checkTutorial();

})
</script>

<style lang="scss" scoped>
.box-backdrop-main{
  background-image:url("/images/background_main/backdrop-essay-world.webp");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &.mobile{
    background-image:url("/images/background_main/background-essay-3.webp");
  }
}

.box-essay-main{
  max-width:1600px;
  width:calc(100vh * 16 / 9);
  min-width:1000px;
  container-type: inline-size;
  overflow:hidden;

  &.mobile{
    max-width: 1000px;
    width: 100%;
    min-width: 360px;
    height: 100vh;
    overflow:auto;
  }
}
</style>
