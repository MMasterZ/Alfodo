<template>
  <div class="relative-position fit animate__animated" :class="{'animate__fadeIn': isShowDialogSevenDayTrial,'animate__fadeOut':!isShowDialogSevenDayTrial, 'row justify-center items-center':isMobile}">
    <div class="relative-position box-popup-seven-day-trial-try-it-now" :class="{'mobile self-center':isMobile}">
      <q-img src="/images/dialog_main/dialog-popup-seven-day-trial.webp" no-spinner
    no-transition></q-img>

      <div class="absolute box-button-seven-day-trial-try-it-now-main" :class="{'mobile':isMobile}">

        <!-- #region แสดงปุ่มลองเลย -->
        <div class="relative-position fit" @click="funcGoTo('try-it-now')" v-if="!courseStore.isTrial && !courseStore.trialExpireData.isExpired">
          <q-img src="/images/button_main/button-seven-day-trial-try-it-now.webp" no-spinner
          no-transition >
          </q-img>

          <div class="absolute-top-left font-mali-b box-text-seven-day-try-it-now" :class="{'mobile':isMobile}">
            <div class="text-seven-day-try-it-now" :class="{'mobile':isMobile}">
              ลองเลย
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region แสดงผลปุ่มใกล้หมดเวลาทดลอง -->
        <div class="relative-position fit" @click="funcGoTo('close-try-it-now')"  v-if="courseStore.isTrial && !courseStore.trialExpireData.isExpired">
          <q-img src="/images/button_main/button-seven-day-trial-customized.webp" no-spinner
          no-transition >
          </q-img>

          <div class="absolute-center box-seven-day-trial-customized-header font-mali-b" :class="{'mobile':isMobile}">
            <div align="center">
              {{ `ทดลองเรียนสิ้นสุดในอีก` }}
            </div>
          </div>

          <div class="absolute-center box-seven-day-trial-remaining-time font-mali-b row justify-center items-center" align="center" :class="{'mobile':isMobile}">
            <div class="self-center box-icon-remaining-time" :class="{'mobile':isMobile}">
              <q-img src="/images/icon_main/icon-clock.png"></q-img>
            </div>
            <div class="self-center text-remaining-time" :class="{'mobile':isMobile}">
              {{ `${courseStore.trialExpireData.remainingTime} วัน` }}
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region แสดงผลปุ่มหมดเวลาทดลอง -->
        <div class="relative-position box-seven-day-trial-expired" @click="funcGoTo('subscribe')" v-if="courseStore.isTrial && courseStore.trialExpireData.isExpired">
          <q-img src="/images/button_main/button-seven-day-trial-expired.webp" no-spinner
          no-transition >
          </q-img>
        </div>
        <!-- #endregion -->
      </div>

      <div class="absolute-top box-button-seven-day-close" :class="{'mobile':isMobile}"     @click="funcGoTo('close-try-it-now')" v-if="!courseStore.isTrial || courseStore.trialExpireData.isExpired">
        <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner ></q-img>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { useCourseStore } from 'src/stores/course';
import { ref } from 'vue';

const $q = useQuasar()
const courseStore = useCourseStore()

const emits = defineEmits(["callback-goTo"]);

const isMobile = ref($q.platform.is.mobile);
const isShowDialogSevenDayTrial = ref(true);

const funcGoTo = (type) => {
  isShowDialogSevenDayTrial.value = true;

  setTimeout(() => {
    emits("callback-goTo",type);
  }, 50);
}
</script>

<style lang="scss" scoped>


.box-popup-seven-day-trial-try-it-now{
  width: 53%;
  top:9.7222%;
  left:50%;
  transform: translateX(-50%);

  &.mobile{
    // max-width:600px;
    width: 419px;
    // width:80%;
    top:0%;
    left:0%;
    transform: none;
  }
}

.box-button-seven-day-trial-try-it-now-main{
  width: 31.486%;
  top:84%;
  left:48.5%;
  cursor:pointer;
  transition: transform 0.05s ease-in-out;
  -webkit-transition: transform 0.05s ease-in-out;
  -moz-transition: transform 0.05s ease-in-out;
  -ms-transition: transform 0.05s ease-in-out;
  -o-transition: transform 0.05s ease-in-out;

  transform: translateX(-50%) scale(1);
  -webkit-transform: translateX(-50%) scale(1);
  -moz-transform: translateX(-50%) scale(1);
  -ms-transform: translateX(-50%) scale(1);
  -o-transform: translateX(-50%) scale(1);

  &.mobile{
    width:32%;
    top:85%;
  }

  &:hover:not(.mobile){
    transform: translateX(-50%) scale(1.05);
    -webkit-transform: translateX(-50%) scale(1.05);
    -moz-transform: translateX(-50%) scale(1.05);
    -ms-transform: translateX(-50%) scale(1.05);
    -o-transform: translateX(-50%) scale(1.05);
    transition: transform 0.05s ease-in-out;
    -webkit-transition: transform 0.05s ease-in-out;
    -moz-transition: transform 0.05s ease-in-out;
  }

  &:active:not(.mobile){
    transform: translateX(-50%) scale(0.95);
    -webkit-transform: translateX(-50%) scale(0.95);
    -moz-transform: translateX(-50%) scale(0.95);
    -ms-transform: translateX(-50%) scale(0.95);
    -o-transform: translateX(-50%) scale(0.95);
    transition: transform 0.05s ease-in-out;
    -webkit-transition: transform 0.05s ease-in-out;
    -moz-transition: transform 0.05s ease-in-out;
  }

  & .box-seven-day-trial-expired{
    width:104%;
    top:70%;
    left:49.5%;
    transform:translate(-50% ,-12%);

  }

  & .box-seven-day-trial-customized-header{
    width:100%;
    font-size:clamp(7.031px,0.7031cqw,11.25px);
    color:#fff;
    text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px, rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px, rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px, rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px, rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px, rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px, rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px, rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px, rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px, rgb(74, 38, 27) 2.88051px -0.838247px 0px;
    top:27%;

    &.mobile{
      font-size:6px;
      text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px, rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px, rgb(74, 38, 27) -0.653644px -0.756802px 0px, rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
    }
  }

  & .box-seven-day-trial-remaining-time{
    width:100%;
    top:59%;

    & .text-remaining-time{
      font-size:clamp(15.31px,1.531cqw,24.5px);
      color:#fff;
      text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px, rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px, rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px, rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px, rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px, rgb(74, 38, 27) 1.92034px -0.558831px 0px;

      &.mobile{
        font-size:12px;
        text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px, rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px, rgb(74, 38, 27) -0.653644px -0.756802px 0px, rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
      }

    }

    & .box-icon-remaining-time{
      width:7.855%;
      transform:rotate(15deg);
      margin-right:clamp(7.5px,0.75cqw,12px);
      margin-bottom:clamp(2.5px,0.25cqw,4px);

      &.mobile{
        max-width:15px;
        width:15px;
        min-width:15px;
        margin-right:12px;
        margin-bottom:4px;
      }
    }

  }

  & .box-text-seven-day-try-it-now{
    top:-7%;
    left:-3.5%;

    &.mobile{
      top:-10%;
      left:-7%;
    }

    & .text-seven-day-try-it-now{
      font-size:clamp(15px,1.5cqw,24px);
      color:#fff;
      text-shadow: rgb(255, 247, 222) 4px 0px 0px, rgb(255, 247, 222) 3.87565px 0.989616px 0px, rgb(255, 247, 222) 3.51033px 1.9177px 0px, rgb(255, 247, 222) 2.92676px 2.72656px 0px, rgb(255, 247, 222) 2.16121px 3.36588px 0px, rgb(255, 247, 222) 1.26129px 3.79594px 0px, rgb(255, 247, 222) 0.282949px 3.98998px 0px, rgb(255, 247, 222) -0.712984px 3.93594px 0px, rgb(255, 247, 222) -1.66459px 3.63719px 0px, rgb(255, 247, 222) -2.51269px 3.11229px 0px, rgb(255, 247, 222) -3.20457px 2.39389px 0px, rgb(255, 247, 222) -3.69721px 1.52664px 0px, rgb(255, 247, 222) -3.95997px 0.56448px 0px, rgb(255, 247, 222) -3.97652px -0.432781px 0px, rgb(255, 247, 222) -3.74583px -1.40313px 0px, rgb(255, 247, 222) -3.28224px -2.28625px 0px, rgb(255, 247, 222) -2.61457px -3.02721px 0px, rgb(255, 247, 222) -1.78435px -3.57996px 0px, rgb(255, 247, 222) -0.843183px -3.91012px 0px, rgb(255, 247, 222) 0.150409px -3.99717px 0px, rgb(255, 247, 222) 1.13465px -3.8357px 0px, rgb(255, 247, 222) 2.04834px -3.43574px 0px, rgb(255, 247, 222) 2.83468px -2.82216px 0px, rgb(255, 247, 222) 3.44477px -2.03312px 0px, rgb(255, 247, 222) 3.84068px -1.11766px 0px, rgb(255, 247, 222) 3.9978px -0.132717px 0px;
      transform:rotate(-18deg);
      z-index:3;

      &::after{
        content:"ลองเลย";
        position:absolute;
        width:100%;
        top:-7%;
        left:0%;

        text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px, rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px, rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px, rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px, rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px, rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px, rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px, rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px, rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px, rgb(74, 38, 27) 2.88051px -0.838247px 0px;
          z-index:1;
      }
    }

    & .text-seven-day-try-it-now.mobile{
        font-size:clamp(12px,2vw,16px);
        text-shadow: rgb(255, 247, 222) 1px 0px 0px, rgb(255, 247, 222) 0.540302px 0.841471px 0px, rgb(255, 247, 222) -0.416147px 0.909297px 0px, rgb(255, 247, 222) -0.989992px 0.14112px 0px, rgb(255, 247, 222) -0.653644px -0.756802px 0px, rgb(255, 247, 222) 0.283662px -0.958924px 0px, rgb(255, 247, 222) 0.96017px -0.279415px 0px;
      transform:rotate(-18deg);

        &::after{
          content:"ลองเลย";
          position:absolute;
          width:100%;
          top:-0%;
          left:0%;
          text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px, rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px, rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px, rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px, rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px, rgb(74, 38, 27) 1.92034px -0.558831px 0px;
        }
      }

  }

}

.box-button-seven-day-close{
  width: 4.128%;
  top: 23%;
  left: 73.2%;
  cursor:pointer;

  &.mobile{
    width:6%;
    min-width:30px;
    top:20%;
    left:72%;
  }

  &:active:not(.mobile){
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
    -ms-transform: scale(0.95);
    -o-transform: scale(0.95);
  }
}
</style>
