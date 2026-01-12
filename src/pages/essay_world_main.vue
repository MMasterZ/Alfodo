<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="box-essay-world-main relative-position" :class="{'mobile': isMobile}">
      <background-main-new :background="`background-essay-world.webp`" v-if="!isMobile"></background-main-new>

      <header-bar :settingHeader="settingHeader"></header-bar>

      <!-- #region Desktop -->
      <div class="absolute box-practice-item" :class="item.class" :style="`width:${resizeItem(item.width)}`" v-for="(item,index) in show_practice_list" :key="index" @click="goToPractice(item)" @mouseover="handleMouseOver(index)" @mouseleave="handleMouseLeave()" v-if="!isMobile">
        <div class="relative-position fit">
          <q-img :src="`/images/icon_main/icon-button-learn${item.isLock ? '-lock' : item.isSuccess ? '-pass' : ''}.png`" no-spinner no-transition></q-img>
          <div class="absolute text-of-number font-mali-b">
            {{ index + 1 }}
          </div>

          <div class="brx absolute-top box-tooltip-main font-mali-m" align="center" v-if="isShowTooltip && currentIndexTooltip == index">
            <span>{{ `${item.name} ` }}</span>
            <span v-if="index == 0">{{ ` ${essayStore.essaySuccess.lessonCountPractice}/5`  }}</span>
          </div>

          <!-- #region เฉพาะแบบฝึกหัด -->
          <div class="absolute label-best-score" v-if="!item.isLesson">
            <div class="relative-position fit">
              <q-img :src="`/images/essay_main/label-best-score${item.isSuccess ? '' : '-empty'}.webp`" no-spinner no-transition></q-img>
              <div class="absolute text-best-score font-mali-b">
                {{ `${item.score}%` }}
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="absolute box-practice-main mobile" v-if="isMobile">

        <div class="relative-position fit row">
          <div class="col-12 box-practice-item mobile">
            <div class="q-pa-lg"></div>
            <div class="relative-position" v-for="(item,index) in show_practice_list" @click="goToPractice(item)">
              <q-img :src="`/images/essay_main/button-practice${item.isLock ? '-disable' : item.isSuccess ? '-success' : ''}-mobile.webp`" no-spinner no-transition></q-img>
              <div class="absolute text-of-number font-mali-b mobile">
                {{ index + 1 }}
              </div>
              <div class="absolute text-name mobile  font-fredoka">
                {{ item.name }}
              </div>

              <div class="absolute label-best-score mobile" v-if="!item.isLesson">
                <div class="relative-position fit">
                  <q-img :src="`/images/essay_main/label-best-score${item.isSuccess ? '' : '-empty'}-mobile.webp`" no-spinner no-transition></q-img>
                  <div class="absolute text-best-score mobile font-mali-b">
                    {{ `${item.score}%` }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- #region Next Feature -->
          <div class="box-footer-main self-end col-12 row justify-between" v-if="false">
            <div class="relative-position button-next-skill">
              <q-img src="/images/button_main/button-next-skill-left.webp" no-spinner no-transition></q-img>
              <div class="absolute text-skill left font-mali-b">
                P
              </div>
            </div>
            <div class="relative-position button-next-skill">
              <q-img src="/images/button_main/button-next-skill-right.webp" no-spinner no-transition></q-img>
              <div class="absolute text-skill right font-mali-b">
                P
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import headerBar from 'src/components/essay_main/header-bar.vue';
import backgroundMainNew from 'src/components/background_main/background-main-new.vue';
import { onMounted, ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useEssayStore } from 'src/stores/essay';
import { useRouter } from 'vue-router';

const essayStore = useEssayStore();

const $q = useQuasar();
const $router = useRouter();
const isMobile = ref($q.platform.is.mobile);

const currentIndexTooltip = ref(null)
const isShowTooltip = ref(false);

const settingHeader = ref({
  title:"Essay",
  isSetting:true,
  isHome:true
})

const goToPractice = (item) => {

  if(item.isLock) return;

  $q.loading.show();

  let page = "/essay/lesson";

  if(item.name == "Lesson Essay"){
    page = "/essay/lesson";
  }else if(item.name == "Activity Essay"){
    essayStore.setEssayName("readAndEssay");
    page = "/essay/activity";
  }else if(item.name == "Practice Essay"){

    essayStore.setCurrentPracticeListId(item.id);
    essayStore.setEssayName("essayPractice");
    page = "/essay/practice";
  }

  setTimeout(() => {
    $router.replace(page);
    $q.loading.hide();
  }, 500);
}

const resizeItem = (width) => {

  let maxWidth = width;
  let calCQW = width / 16;
  let minWidth = calCQW * 10;

  return `clamp(${minWidth}px,${calCQW}cqw,${maxWidth}px);`
}

const show_practice_list = computed(() => {
  console.clear();

  let temp = []

  for (let i = 0; i < 2; i++) {

    let name_list = ['Lesson Essay','Activity Essay'];

    let newData = {
      id:"",
      name:name_list[i],
      class:`learn-${i + 1}`,
      width: 277,
      isLesson:true,
      isSuccess:false,
      isLock:true,
      isShowTooltip:false,
      score:0,
    }

    if(i == 0){
      newData.isLock = false;
      newData.isSuccess = essayStore.lessonSuccess;
    }

    if(i == 1){
      if(essayStore.essaySuccess.lesson2Count > 0){
        newData.isSuccess = true;
      }

    }

    if(i > 0){
      newData.width = 233;
      if(temp[i - 1].isSuccess){
        newData.isLock = false;
      }
    }

    if(i == 2){
      newData.isLesson = false;
    }

    temp.push(newData);

  }

  let temp_practice_list = [...essayStore.practiceList];

  temp_practice_list.forEach((item,index) => {

    console.log("*** item",item);

    let newData = {
      id:item.essayId,
      name:"Practice Essay",
      class:`learn-${temp.length + (index + 1)}`,
      width: 233,
      isLesson:false,
      isSuccess:false,
      isLock:true,
      isShowTooltip:false,
      score:0,
    }

    newData.score = item.bestScore;
    newData.isSuccess = item.topics.filter(x => x.isFinishEssay).length ? true : false

    if(temp[1 + index].isSuccess){
      newData.isLock = false;
    }

    temp.push(newData);
  })

  console.log("*** temp",temp);

  return temp

})

const handleMouseOver = (index) => {
  currentIndexTooltip.value = index
  isShowTooltip.value = true
}

const handleMouseLeave = () => {
  currentIndexTooltip.value = null
  isShowTooltip.value = false
}

const funcGetPracticeData = async () => {
  try{

    $q.loading.show();

    await essayStore.getEssayPractice();

    $q.loading.hide();

  }catch(e){
    $q.notify({
      message: "เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง",
      color: "red",
      icon: "error",
      position:"top"
    });
    setTimeout(() => {
      $q.loading.hide();
      $router.replace('/practice/list');
    }, 250);
    return;
  }
}

onMounted(async () => {
  essayStore.setEssayName("essay_world");

  await funcGetPracticeData();

  console.log("*** Get Practice Module");

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
    background-image:url("/images/background_main/background-essay-world.webp");
    background-size: cover;
    background-position:50% 0%;
  }
}

.box-essay-world-main{
  max-width:1600px;
  width:calc(100vh * 16 / 9);
  min-width:1000px;
  overflow:hidden;
  container-type:inline-size;

  &.mobile{
    max-width:1000px;
    width:100%;
    min-width:360px;
    height:100vh;
  }

  & .box-practice-main{

    &.mobile{
      width:360px;
      height:calc(100% - 60px);
      top:60px;
      left:50%;
      transform:translate(-50%,0%);
      overflow-y: auto;
    }

    & .box-footer-main{
      width:100%;
      padding:16px 8px;
      // background-color: #000;

      & .button-next-skill{
        width:102px;

        & .text-skill{
          top:50%;

          font-size:28px;
          color:#fff;
          text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px, rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px, rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px, rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px, rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px, rgb(74, 38, 27) 1.92034px -0.558831px 0px;
          transform:translate(-50%,-50%);

          &.left{
            left:75%;
          }

          &.right{
            left:25%;
          }
        }
      }
    }
  }

  & .box-practice-item{
    color:#fff;
    text-shadow: rgb(0, 31, 78) 6px 0px 0px, rgb(0, 31, 78) 5.91686px 0.995377px 0px, rgb(0, 31, 78) 5.66974px 1.96317px 0px, rgb(0, 31, 78) 5.2655px 2.87655px 0px, rgb(0, 31, 78) 4.71532px 3.71022px 0px, rgb(0, 31, 78) 4.03447px 4.44106px 0px, rgb(0, 31, 78) 3.24181px 5.04883px 0px, rgb(0, 31, 78) 2.35931px 5.51667px 0px, rgb(0, 31, 78) 1.41143px 5.83163px 0px, rgb(0, 31, 78) 0.424423px 5.98497px 0px, rgb(0, 31, 78) -0.574341px 5.97245px 0px, rgb(0, 31, 78) -1.55719px 5.79441px 0px, rgb(0, 31, 78) -2.49688px 5.45578px 0px, rgb(0, 31, 78) -3.36738px 4.96596px 0px, rgb(0, 31, 78) -4.14455px 4.33852px 0px, rgb(0, 31, 78) -4.80686px 3.59083px 0px, rgb(0, 31, 78) -5.33596px 2.74364px 0px, rgb(0, 31, 78) -5.71718px 1.8204px 0px, rgb(0, 31, 78) -5.93995px 0.84672px 0px, rgb(0, 31, 78) -5.99811px -0.150428px 0px, rgb(0, 31, 78) -5.89004px -1.14341px 0px, rgb(0, 31, 78) -5.61874px -2.1047px 0px, rgb(0, 31, 78) -5.19172px -3.00766px 0px, rgb(0, 31, 78) -4.62082px -3.82727px 0px, rgb(0, 31, 78) -3.92186px -4.54081px 0px, rgb(0, 31, 78) -3.11421px -5.12852px 0px, rgb(0, 31, 78) -2.22026px -5.57409px 0px, rgb(0, 31, 78) -1.26477px -5.86518px 0px, rgb(0, 31, 78) -0.274238px -5.99373px 0px, rgb(0, 31, 78) 0.723898px -5.95617px 0px, rgb(0, 31, 78) 1.70197px -5.75355px 0px, rgb(0, 31, 78) 2.63288px -5.39147px 0px, rgb(0, 31, 78) 3.49082px -4.87998px 0px, rgb(0, 31, 78) 4.25202px -4.23324px 0px, rgb(0, 31, 78) 4.89538px -3.46919px 0px, rgb(0, 31, 78) 5.40307px -2.60899px 0px, rgb(0, 31, 78) 5.76102px -1.67649px 0px, rgb(0, 31, 78) 5.95932px -0.697531px 0px;
    cursor:pointer;


    &.learn-1{
      top:clamp(310.84375px,31.084375cqw,497.35px);
      left:clamp(82.98125px,8.298125cqw,132.77px);
    }

    &.learn-2{
      top:clamp(375px,37.5cqw,600px);
      left:clamp(396.875px,39.6875cqw,635px);
    }

    &.learn-3{
      top:clamp(431.25px,43.125cqw,690px);
      left:clamp(692.5px,69.25cqw,1108px);
    }

    & .text-of-number{
      top:0%;
      left:50%;
      transform:translate(-50%,-50%);
      font-size:clamp(106.25px,10.625cqw,170px);
      line-height:normal;

      &.mobile{
        top:49%;
        left:19%;
        font-size:48px !important;
        line-height:normal !important;
        text-shadow: rgb(0, 31, 78) 4px 0px 0px, rgb(0, 31, 78) 3.87565px 0.989616px 0px, rgb(0, 31, 78) 3.51033px 1.9177px 0px, rgb(0, 31, 78) 2.92676px 2.72656px 0px, rgb(0, 31, 78) 2.16121px 3.36588px 0px, rgb(0, 31, 78) 1.26129px 3.79594px 0px, rgb(0, 31, 78) 0.282949px 3.98998px 0px, rgb(0, 31, 78) -0.712984px 3.93594px 0px, rgb(0, 31, 78) -1.66459px 3.63719px 0px, rgb(0, 31, 78) -2.51269px 3.11229px 0px, rgb(0, 31, 78) -3.20457px 2.39389px 0px, rgb(0, 31, 78) -3.69721px 1.52664px 0px, rgb(0, 31, 78) -3.95997px 0.56448px 0px, rgb(0, 31, 78) -3.97652px -0.432781px 0px, rgb(0, 31, 78) -3.74583px -1.40313px 0px, rgb(0, 31, 78) -3.28224px -2.28625px 0px, rgb(0, 31, 78) -2.61457px -3.02721px 0px, rgb(0, 31, 78) -1.78435px -3.57996px 0px, rgb(0, 31, 78) -0.843183px -3.91012px 0px, rgb(0, 31, 78) 0.150409px -3.99717px 0px, rgb(0, 31, 78) 1.13465px -3.8357px 0px, rgb(0, 31, 78) 2.04834px -3.43574px 0px, rgb(0, 31, 78) 2.83468px -2.82216px 0px, rgb(0, 31, 78) 3.44477px -2.03312px 0px, rgb(0, 31, 78) 3.84068px -1.11766px 0px, rgb(0, 31, 78) 3.9978px -0.132717px 0px;
      }
    }

    & .text-name{
      top:51%;
      left:57%;
      width:50%;
      font-size:16px;
      text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
      transform:translate(-50%,-50%);
    }

    & .label-best-score{
      top:-72%;
      left:50%;
      width:clamp(75px,7.5cqw,120px);
      transform:translate(-50%,0%);

      &.mobile{
        top:0;
        left:35px;
        width:65px;
        transform:translate(0%,0%);
      }

      & .text-best-score{
          top:65%;
          left:50%;
          transform:translate(-50%,-50%);
          font-size:clamp(20px,2cqw,32px);
          line-height: clamp(12.5px,1.25cqw,20px);
          color:#512A08;
          text-shadow: rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 1.75517px 0.958851px 0px, rgb(255, 255, 255) 1.0806px 1.68294px 0px, rgb(255, 255, 255) 0.141474px 1.99499px 0px, rgb(255, 255, 255) -0.832294px 1.81859px 0px, rgb(255, 255, 255) -1.60229px 1.19694px 0px, rgb(255, 255, 255) -1.97998px 0.28224px 0px, rgb(255, 255, 255) -1.87291px -0.701566px 0px, rgb(255, 255, 255) -1.30729px -1.5136px 0px, rgb(255, 255, 255) -0.421592px -1.95506px 0px, rgb(255, 255, 255) 0.567324px -1.91785px 0px, rgb(255, 255, 255) 1.41734px -1.41108px 0px, rgb(255, 255, 255) 1.92034px -0.558831px 0px;

          &.mobile{
            top:65%;
            left:52%;
            font-size:16px;
            line-height: 20px;
          }
        }
    }
  }

  & .box-tooltip-main{
    top:clamp(-155px,-9.6875cqw,-96.875px);
    left:50%;
    transform:translate(-50%,0%);
    width:clamp(187.5px,18.75cqw,300px);
    border-radius: clamp(10px,1cqw,16px);
    border: clamp(3.125px,0.3125cqw,5px) solid #F2C043;
    background: #FFEDC4;
    box-shadow:0px 0px 0px clamp(1.25px,0.125cqw,2px) #4A261B;
    padding: clamp(10px,1cqw,16px);
    font-size: clamp(12.5px,1.25cqw,20px);
    line-height: clamp(12.5px,1.25cqw,20px);
    text-shadow: none;
    color:#4C281D;
  }
}

</style>
