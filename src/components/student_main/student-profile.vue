<template>
  <div class="absolute box-student-profile-main" :class="{'mobile':isMobile}">

    <!-- #region Student Details -->
    <div class="relative-position fit box-details-main">
      <q-img
        src="/images/box_main/box-profile-container.webp"
        no-spinner
        no-transition
        class="no-padding no-margin"
      ></q-img>

      <div class="absolute-center fit box-details-content">
        <div class="row">
          <div class="col box-name font-mali-m">
            {{ `${studentStore.characterName}`  }}
          </div>
          <div class="col-1 box-button-profile" @click="funcOpen('profile')">
            <q-img
              :src="`/images/button_main/button-icon-profile.webp`"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
        <div class="relative-position">
          <div class="box-progress-main relative-position">
            <div class="box-progress-bar" :style="`width:${comProgressLevel}%`">
            </div>
          </div>

          <div class="absolute text-exp font-prompt-b">
            {{ `${funcSetToken(studentStore.student.data.exp)}/${funcSetToken(
              studentStore.student.data.nextEXP
            )}` }}
          </div>

          <div class="absolute box-icon-xp">
            <q-img
              src="/images/icon_main/icon-xp.webp"
              no-spinner
              no-transition
            ></q-img>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Expand Content -->
    <div class="relative-position box-expand-content" :class="isOpenProfile ? 'open' : 'close'">
      <q-img
        src="/images/box_main/box-profile-content.webp"
        no-spinner
        no-transition
      ></q-img>

      <div
        class="absolute-center fit profile-content row justify-center"
        align="center"
      >
        <div class="col-12 box-pixel-container relative-position">
          <q-img
            src="/images/box_main/box-pixel-get-reward-blank.webp"
            no-spinner
            no-transition
          ></q-img>

          <div class="absolute-center fit">
            <div
              class="relative-position animate__animated"
              :class="
                isOpenProfile
                  ? 'animate__delay-1s animate__fadeInLeft'
                  : 'animate__fadeOutRight'
              "
            >
              <div class="relative-position animation-pixel-flash">
                <q-img
                  :src="`/images/box_main/box-pixel-get-reward-${
                    studentStore.isHasLevelReward ? 'true' : 'false'
                  }.webp`"
                  no-spinner
                  no-transition
                ></q-img>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 relative-position button-level-reward" @click="funcOpen('level-reward')">
          <q-img
            class="button-active-main"
            :src="`/images/button_main/button-level-reward.webp`"
            no-transition
            no-spinner
          ></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Footer -->
    <div class="relative-position box-expand-bar-main">
      <q-img
        :src="`/images/box_main/box-profile-expand-bar.webp`"
        no-spinner
        no-transition
      ></q-img>

      <div class="absolute-center">
        <div
          class="relative-position icon-expand"
          :class="isOpenProfile ? 'open' : 'close'"
          @click="funcOpen('expand')"
        >
          <q-img
            :src="`/images/button_main/button-profile-expand.webp`"
            no-spinner
            no-transition
          ></q-img>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>

  <!-- #region แสดงผลข้อมูลโปรไฟล์ -->
  <div
    class="absolute-center fit box-backdrop-main z-max row justify-center items-center"
    v-if="isShowDialogProfile"
  >
    <div class="relative-position box-profile-main" :class="{'mobile':isMobile}">
      <dialog-profile
        :isTutorial="false"
        @callback-closeDialog="isShowDialogProfile = false"
      ></dialog-profile>
    </div>
  </div>
  <!-- #endregion -->

   <!-- #region Dialog Level reward -->
  <div class="absolute-center fit box-backdrop-main z-max row justify-center items-center" v-if="isShowDialogLevelReward">
    <div
      class="relative-position box-dialog-level-reward-main" :class="{'mobile':isMobile}"
    >
      <dialog-level-reward
        @callback-closeDialog="isShowDialogLevelReward = false"
        @callback-claimAllReward="isOpenProfile = false"
      ></dialog-level-reward>
    </div>
  </div>
  <!-- #endregion -->
</template>

<script setup>
import dialogProfile from "components/dialog_main/profile-dialog.vue";
import dialogLevelReward from "components/dialog_main/dialog-level-reward.vue";
import { useQuasar } from 'quasar';
import { useStudentStore } from 'src/stores/student';
import { computed, ref } from 'vue';

const $q = useQuasar();

const isMobile = ref($q.platform.is.mobile);

const studentStore = useStudentStore();

const isOpenProfile = ref(false);
const isShowDialogProfile = ref(false);
const isShowDialogLevelReward = ref(false);

const funcOpen = (type) => {

  if(type === 'expand'){
    isOpenProfile.value = !isOpenProfile.value;
  }else if(type == "level-reward"){
    isShowDialogLevelReward.value = true;
  }else if(type == 'profile'){
    isShowDialogProfile.value = true;
  }

}

// #region Set current token
const funcSetToken = (val) => {
  let total = val;

  total = total > 100000 ? 99999 : total;

  return `${Number(total).toLocaleString()}`;
};
// #endregion

const comProgressLevel = computed(() => {
  let progress = 0;

  progress = (
    (studentStore.studentData.exp / studentStore.studentData.nextEXP) *
    100
  ).toFixed(2);

  return progress;
});
</script>

<style lang="scss" scoped>

.box-backdrop-main{
  background: rgba(0, 0, 0, 0.30);
}

.box-profile-main{
  width:clamp(625px,62.5cqw,1000px);
  height: clamp(375px,37.5cqw,600px);

  &.mobile{
    width: 340px;
    height: fit-content;
  }
}

.box-dialog-level-reward-main{
  width: clamp(212.5px,21.25cqw,340px);
  height: clamp(375px,37.5cqw,600px);

  &.mobile {
    width: 320px;
    height: 600px;
  }
}

.box-student-profile-main{
  top:clamp(10px,1cqw,16px);
  left:clamp(80px,8cqw,128px);
  width:clamp(197.5px,19.75cqw,316px);

  &.mobile{
    top:7px;
    left:75px;
    // width:150px;
  }

  & .box-details-main{
    width:100%;
    height:100%;
    overflow:hidden;
    z-index:1;

    & .box-details-content{
      padding:clamp(10px,1cqw,16px);

      & .box-name{
        width:100%;
        border-radius: 99px;
        background: rgba(0, 0, 0, 0.30);
        padding: clamp(5px,0.5cqw,8px) clamp(10px,1cqw,16px);
        color: #FFF;
        font-size: clamp(10px,1cqw,16px);
        line-height: clamp(12.5px,1.25cqw,20px);
        overflow:hidden;
        white-space:nowrap;
        text-overflow:ellipsis;
        margin:0px 0px clamp(7.5px,0.75cqw,12px);
      }

      & .box-button-profile{
        width:clamp(22.5px,2.25cqw,36px);
        cursor:pointer;
        margin:0px 0px clamp(7.5px,0.75cqw,12px) clamp(3.75px,0.375cqw,6px);

        &:active{
          transform:scale(0.95);
        }
      }

      & .box-progress-main{
        height:clamp(7.5px,0.75cqw,12px);
        border-radius: 99px;
        border: clamp(1.25px,0.125cqw,2px) solid #000;
        background: rgba(0, 0, 0, 0.50);

        & .box-progress-bar{
          width:50%;
          height:100%;
          border-radius: 99px;
          background: rgba(22, 108, 166, 1);
          border-top: clamp(1.25px,0.125cqw,2px) solid rgba(24, 160, 251, 1);
          box-shadow: 0px clamp(1.25px,0.125cqw,2px) 0px 0px rgba(255, 255, 255, 0.5) inset;
        }
      }

      & .text-exp{
        bottom:clamp(-5px,-0.3125cqw,-3.125px);
        right:clamp(3.125px,0.3125cqw,5px);
        color: #FFF;
        font-size: clamp(6.25px,0.625cqw,10px);
        line-height: normal;
        text-shadow: rgb(19, 19, 19) 2px 0px 0px, rgb(19, 19, 19) 1.75517px 0.958851px 0px, rgb(19, 19, 19) 1.0806px 1.68294px 0px, rgb(19, 19, 19) 0.141474px 1.99499px 0px, rgb(19, 19, 19) -0.832294px 1.81859px 0px, rgb(19, 19, 19) -1.60229px 1.19694px 0px, rgb(19, 19, 19) -1.97998px 0.28224px 0px, rgb(19, 19, 19) -1.87291px -0.701566px 0px, rgb(19, 19, 19) -1.30729px -1.5136px 0px, rgb(19, 19, 19) -0.421592px -1.95506px 0px, rgb(19, 19, 19) 0.567324px -1.91785px 0px, rgb(19, 19, 19) 1.41734px -1.41108px 0px, rgb(19, 19, 19) 1.92034px -0.558831px 0px;
      }

      & .box-icon-xp{
        top:clamp(-5px,-0.3125cqw,-3.125px);
        left:clamp(-2px,-0.125cqw,-1.25px);
        width:clamp(31.25px,3.125cqw,50px);
        line-height:0;
      }
    }
  }

  & .box-expand-content{
    width:100%;
    height:100%;
    overflow:hidden;
    transition:0.4s ease-in-out;

    &.open{
      margin-top:0%;
    }

    &.close{
      margin-top:clamp(-80px,-5cqw,-50px);
    }

    & .profile-content {
      width:100%;
      padding:clamp(2.5px,0.25cqw,4px) clamp(10px,1cqw,16px) 0px;

      & .box-pixel-container {
        width: clamp(150px,15cqw,240px);
        line-height:0;
        overflow: hidden;
      }

      & .button-level-reward {
        width: clamp(103.75px,10.375cqw,166px);
        line-height:0;
        cursor:pointer;
      }
    }
  }

  & .box-expand-bar-main{
    margin-top:clamp(-2px,-0.125cqw,-1.25px);
    line-height:0px;

    & .icon-expand{
      width:clamp(15px,1.5cqw,24px);
      margin:clamp(5px,0.5cqw,8px) auto 0px;
      transform-origin: center;
      transition:transform 0.4s ease-in-out;
      cursor:pointer;

      &.open{
        transform: rotate(180deg);
      }

      &.close{
        transform: rotate(0deg);
      }
    }

  }
}
</style>
