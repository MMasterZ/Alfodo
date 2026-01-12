<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="relative-position box-essay-main" :class="{'mobile': isMobile}">
      <!-- #region Background -->
      <background-main-new :background="'background-essay-1.webp'" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-main :settingHeader="settingHeader"></header-main>
      <!-- #endregion -->

      <!-- #region Writing -->
      <read-and-essay @callback-finish="handleCallbackFinish"></read-and-essay>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import backgroundMainNew from "src/components/background_main/background-main-new.vue";
import readAndEssay from "src/components/essay_main/read-and-essay.vue";
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
const isShowDialogAnswer = ref(false);

// State Data
const isSuccess = ref(false);

// Function
const handleCallbackFinish = async () => {

  isShowDialogAnswer.value = true;

  $q.loading.show();

  await essayStore.saveLesson2Log(currentServerTime.value);

  // await essayStore.getEssayLessonLog();
  $router.replace(`/essay/world`);

  setTimeout(() => {
    $q.loading.hide();
  }, 250);
  return;
};

const currentServerTime = ref(null);
const getEssayLessonPractice = async () => {

  try{

    let getServerTime = await systemStore.getServerTime();

    if(getServerTime.message != 'success'){
      throw new Error('error get time');
    }

    currentServerTime.value = getServerTime.data.timestamp;

  }catch(e){
    $q.loading.hide();
    $q.notify({
      message: 'Error get essay lesson activity',
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
