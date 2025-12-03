<template>
  <div class="absolute box-level-main" :class="{'mobile':isMobile}">
    <div class="relative-position fit ">
      <q-img
        :src="`/images/box_main/box-rank-level-${studentStore.studentData.tier}.webp`"
        no-spinner
        no-transition
      ></q-img>

      <div class="absolute-center text-level font-fredoka" :class="{'mobile':isMobile}">
        {{
          `${
            studentStore.studentData.level > 480
              ? "MAX"
              : studentStore.studentData.level
          }`
        }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useStudentStore } from 'src/stores/student';

const $q = useQuasar();

const isMobile = ref($q.platform.is.mobile);

const studentStore = useStudentStore();
</script>

<style lang="scss" scoped>
.box-level-main{
  top:0px;
  left:0px;
  width:clamp(75px,7.5cqw,120px);

  &.mobile{
    width:80px;
  }

  & .text-level{
    color:#fff;
    font-size: clamp(22.5px,2.25cqw,36px);
    line-height: clamp(12.5px,1.25cqw,20px);
    text-shadow: rgb(43, 43, 43) 3px 0px 0px, rgb(43, 43, 43) 2.83487px 0.981584px 0px, rgb(43, 43, 43) 2.35766px 1.85511px 0px, rgb(43, 43, 43) 1.62091px 2.52441px 0px, rgb(43, 43, 43) 0.705713px 2.91581px 0px, rgb(43, 43, 43) -0.287171px 2.98622px 0px, rgb(43, 43, 43) -1.24844px 2.72789px 0px, rgb(43, 43, 43) -2.07227px 2.16926px 0px, rgb(43, 43, 43) -2.66798px 1.37182px 0px, rgb(43, 43, 43) -2.96998px 0.42336px 0px, rgb(43, 43, 43) -2.94502px -0.571704px 0px, rgb(43, 43, 43) -2.59586px -1.50383px 0px, rgb(43, 43, 43) -1.96093px -2.27041px 0px, rgb(43, 43, 43) -1.11013px -2.78704px 0px, rgb(43, 43, 43) -0.137119px -2.99686px 0px, rgb(43, 43, 43) 0.850987px -2.87677px 0px, rgb(43, 43, 43) 1.74541px -2.43999px 0px, rgb(43, 43, 43) 2.44769px -1.73459px 0px, rgb(43, 43, 43) 2.88051px -0.838247px 0px;

    &.mobile{
      font-size:20px;
      line-height:0;
    }
  }
}
</style>
