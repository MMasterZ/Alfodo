<template>
  <div class="absolute-center fit row justify-center items-center">
    <div class="relative-position">

      <!-- #region Logo -->
      <div class="box-logo-head" :class="{'mobile':isMobile}">
        <q-img src="/images/winner_town_main/logo-head.webp"></q-img>
      </div>
      <!-- #endregion -->

      <!-- #region Text -->
      <div class="box-loading-text row justify-center" align="center" :class="{'mobile':isMobile}">
        <div class="text-loading font-mali-r" :class="{'mobile':isMobile}" :style="{ animationDelay: `${index * 0.1}s` }" v-for="(text,index) in textLoading" :key="index">{{ text }}</div>
      </div>
      <!-- #endregion -->

      <!-- #region Progress Bar -->
      <div class="box-loading-progress-bar" :class="{'mobile':isMobile}">
        <div class="progress-bar" :style="`width: ${props.progress}%`"></div>
      </div>
<!-- #endregion -->


    </div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const props = defineProps({
  progress:{
    type:Number,
    default:0
  }
})

const $q = useQuasar();

const textLoading = ref('Loading . . .');

const isMobile = ref($q.platform.is.mobile);
</script>

<style lang="scss" scoped>
.box-logo-head{
  width:clamp(48.125px,4.8125cqw,77px);
  margin:auto;

  &.mobile{
    width:77px;
  }
}

.box-loading-text{
  margin:clamp(15px,1.5cqw,24px) auto;

  &.mobile{
    margin:12px auto;
  }

  .text-loading{
    position: relative;
    font-size: clamp(25px,2.5cqw,40px);
    line-height: normal;
    color:#fff;
    text-shadow: rgb(200, 107, 0) 4px 0px 0px, rgb(200, 107, 0) 3.87565px 0.989616px 0px, rgb(200, 107, 0) 3.51033px 1.9177px 0px, rgb(200, 107, 0) 2.92676px 2.72656px 0px, rgb(200, 107, 0) 2.16121px 3.36588px 0px, rgb(200, 107, 0) 1.26129px 3.79594px 0px, rgb(200, 107, 0) 0.282949px 3.98998px 0px, rgb(200, 107, 0) -0.712984px 3.93594px 0px, rgb(200, 107, 0) -1.66459px 3.63719px 0px, rgb(200, 107, 0) -2.51269px 3.11229px 0px, rgb(200, 107, 0) -3.20457px 2.39389px 0px, rgb(200, 107, 0) -3.69721px 1.52664px 0px, rgb(200, 107, 0) -3.95997px 0.56448px 0px, rgb(200, 107, 0) -3.97652px -0.432781px 0px, rgb(200, 107, 0) -3.74583px -1.40313px 0px, rgb(200, 107, 0) -3.28224px -2.28625px 0px, rgb(200, 107, 0) -2.61457px -3.02721px 0px, rgb(200, 107, 0) -1.78435px -3.57996px 0px, rgb(200, 107, 0) -0.843183px -3.91012px 0px, rgb(200, 107, 0) 0.150409px -3.99717px 0px, rgb(200, 107, 0) 1.13465px -3.8357px 0px, rgb(200, 107, 0) 2.04834px -3.43574px 0px, rgb(200, 107, 0) 2.83468px -2.82216px 0px, rgb(200, 107, 0) 3.44477px -2.03312px 0px, rgb(200, 107, 0) 3.84068px -1.11766px 0px, rgb(200, 107, 0) 3.9978px -0.132717px 0px;
    animation: textLoading 1s linear infinite;
    margin:0px clamp(1.25px,0.125cqw,2px);

    &.mobile{
      font-size:24px;
      margin:8px 2px;
      text-shadow: rgb(200, 107, 0) 2px 0px 0px, rgb(200, 107, 0) 1.75517px 0.958851px 0px, rgb(200, 107, 0) 1.0806px 1.68294px 0px, rgb(200, 107, 0) 0.141474px 1.99499px 0px, rgb(200, 107, 0) -0.832294px 1.81859px 0px, rgb(200, 107, 0) -1.60229px 1.19694px 0px, rgb(200, 107, 0) -1.97998px 0.28224px 0px, rgb(200, 107, 0) -1.87291px -0.701566px 0px, rgb(200, 107, 0) -1.30729px -1.5136px 0px, rgb(200, 107, 0) -0.421592px -1.95506px 0px, rgb(200, 107, 0) 0.567324px -1.91785px 0px, rgb(200, 107, 0) 1.41734px -1.41108px 0px, rgb(200, 107, 0) 1.92034px -0.558831px 0px;
    }

    @keyframes textLoading {
      0%{
        transform: translateY(0);
      }
      50%{
        transform: translateY(clamp(-5px,-0.3125cqw,-3.125px));
      }
      100%{
        transform: translateY(0);
      }
    }
  }
}



.box-loading-progress-bar{
  width:clamp(187.5px,18.75cqw,300px);
  height:clamp(10px,1cqw,16px);
  background-color:#fff;
  border:clamp(1.875px,0.1875cqw,3px) solid #c86b00;
  border-radius:999px;

  &.mobile{
    width:240px;
    height:16px;
    border-width:4px;
  }

  & .progress-bar{
    width:0%;
    height:100%;
    background-color:#88330F;
    border-radius:999px;
  }
}

</style>
