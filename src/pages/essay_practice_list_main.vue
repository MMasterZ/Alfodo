<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="box-essay-main relative-position" :class="{'mobile': isMobile}">

      <!-- #region Background  -->
      <background-main-new :background="'background-essay-3.webp'" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar :settingHeader="settingHeader"></header-bar>
      <!-- #endregion -->

      <!-- #region Desktop -->
      <div v-if="!isMobile && !isLoaded">
        <!-- #region Practice Content -->
        <div class="absolute box-practice-main">
          <div class="relative-position fit">
            <q-img :src="`/images/essay_main/box-writing-practice.webp`" no-spinner no-transition></q-img>
          </div>

          <div class="absolute box-practice-list-main">
            <div class="item-list row justify-between" v-for="(item,index) in practiceList" :key="index" @click="goToPracticeWriting(item)">
              <div class="col self-center title font-mali-m">
                <div>
                  {{ `${item.topicNameEn}` }}
                </div>
                <div>
                  {{ `${item.topicNameTh}` }}
                </div>
              </div>
              <div class="self-center box-icon-pin row justify-center items-center" align="center" v-if="item.isFinishFeedback">
                <q-img src="/images/essay_main/icon-pin.webp" no-spinner no-transition></q-img>
              </div>
              <div class="self-center box-score row justify-center items-center" align="center" v-if="item.isFinishEssay">
                <div class="font-mali-m">{{ `HIGH SCORE :` }}</div>
                <div class="font-mali-b">{{ `${item.score}%` }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Reward practice -->
        <div class="absolute box-reward-practice-main">
          <div class="relative-position fit">
            <q-img src="/images/essay_main/box-reward-writing-practice.webp" no-spinner no-transition></q-img>

            <div class="absolute-center fit row justify-between items-center ">
              <!-- #region Show hight score -->
              <div class="box-reward-hight-score font-mali-b">
                <div align="center">
                  REWARDS
                </div>
                <div class="show-hight-score relative-position">
                  <q-img src="/images/essay_main/box-best-score.webp" no-spinner no-transition></q-img>
                  <div class="absolute-center text-hight-score font-mali-b" :score="`${essayStore.practiceListData.bestScore}%`">
                    {{ `${essayStore.practiceListData.bestScore}%` }}
                  </div>
                </div>
                <div align="center">HIGH SCORE</div>
              </div>
              <!-- #endregion -->

              <!-- #region Reward item list -->
              <div class="relative-position box-reward-item-list row justify-center items-end">

                <!-- #region Reward item -->
                <div class="absolute box-reward-list-main row justify-around">
                  <div class="reward-item" :class="{'cursor-pointer':!item.isReceived && essayStore.isGetReward}" v-for="(item,index) in rewardList" :key="index" @click="funcReceiveReward()">
                    <div class="relative-position fit animate__animated" :class="{'animate__bounceIn animate-item':essayStore.progressScore >= ((item.percentage - 45) / 50 * 100) && !item.isReceived}" :style="`animation-delay:0.${index}s`" v-if="item.reward">
                      <q-img :src="`/images/button_main/button-item${item.reward.type == 'key' ? '-limited' : item.reward.grade == 'limited' ? '-limited' : item.reward.grade == 'rare' ? '-rare' : ''}-blank.png`" no-spinner no-transition></q-img>
                      <div class="absolute-center item" v-if="item.reward.type != 'coin' && item.reward.type != 'key'">
                        <q-img :src="`${pathItem}${item.reward.itemName}.png`" no-spinner no-transition></q-img>
                      </div>
                      <div class="absolute-center item" v-else>
                       <div class="fit relative-position">
                          <q-img :src="`/images/icon_main/${item.reward.type == 'coin' ? 'icon-coin-winner' : 'icon-gacha-pon-key'}.png`" no-spinner no-transition></q-img>
                        </div>
                      </div>

                      <div class="absolute box-total-amount font-mali-b" align="center">
                        {{ item.reward.amount }}
                      </div>

                      <div class="absolute-center item-grade row justify-center items-center" v-if="item.isReceived">
                        <q-icon name="far fa-check-circle"></q-icon>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Progress Score -->
                <div class="absolute box-progress-score-main row justify-around">
                  <div class="progress-score" v-for="(item,index) in rewardList" :key="index">
                      <div class="relative-position fit">
                      <q-img :src="`/images/essay_main/box-progress-score${essayStore.progressScore >= ((item.percentage - 45) / 50 * 100) ? '-success' : ''}.webp`" no-spinner no-transition>
                      </q-img>
                      <div class="absolute-center text-score font-mali-b" :score="`${item.percentage}%`">
                        {{ `${item.percentage}%` }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Progress Bar -->
                <div class="box-progress-bar">
                  <div class="progress-bar" :style="`width:${essayStore.progressScore}%`"></div>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="absolute-center fit" v-if="isMobile && !isLoaded">
        <!-- #region Practice Content -->
        <div class="relative-position box-practice-mobile-main">
          <q-img src="/images/essay_main/box-writing-practice-mobile.webp" no-spinner no-transition></q-img>

          <div class="absolute box-practice-list">
            <div class="relative-position practice-list" v-for="(item,index) in practiceList" :key="index" @click="goToPracticeWriting(item)">
              <div class="fit row">
                <div class="self-start col-12 font-mali-m">
                    <div>
                    {{ `${item.topicNameEn}` }}
                  </div>
                  <div>
                    {{ `${item.topicNameTh}` }}
                  </div>
                </div>
                <div class="col-12 row">
                  <div class="box-hight-score row justify-center items-center" v-if="item.isFinishEssay">
                    <div class="font-mali-m">
                      HIGHT SCORE :
                    </div>
                    <div class="font-mali-b">
                      {{ `${item.score}%` }}
                    </div>
                  </div>
                  <q-space></q-space>
                  <div class="self-center box-icon-pin" v-if="item.isFinishFeedback">
                    <q-img src="/images/essay_main/icon-pin.webp" no-spinner no-transition></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Reward -->
        <div class="box-reward-mobile-main">
          <div class="box-reward-hight-score">
            <div class="row">
              <div class="self-center text-reward font-mali-b">
                REWARD
              </div>
              <q-space></q-space>
              <div class="self-center text-hight-score font-mali-b">
                HIGH SCORE
              </div>
              <div class="relative-position self-center box-hight-score">
                <q-img src="/images/essay_main/box-hight-score-mobile.webp" no-spinner no-transition></q-img>
                <div class="absolute-center text-score font-mali-b" :score="`${essayStore.practiceListData.bestScore}%`">
                  {{ `${essayStore.practiceListData.bestScore}%` }}
                </div>
              </div>
            </div>
            <div class="relative-position box-reward-item-list row justify-center items-end">

              <div class="absolute box-reward-item row justify-around">
                <div class="reward-item" v-for="(item,index) in rewardList" :key="index">
                  <div class="relative-position fit animate__animated" :class="{'animate__bounceIn animate-item':essayStore.progressScore >= ((item.percentage - 45) / 50 * 100) && !item.isReceived}" :style="`animation-delay:0.${index}s`" @click="funcReceiveReward()">
                    <q-img :src="`/images/button_main/button-item${item.reward.type == 'key' ? '-limited' : item.reward.grade == 'limited' ? '-limited' : item.reward.grade == 'rare' ? '-rare' : ''}-blank.png`" no-spinner no-transition></q-img>
                    <div class="absolute-center item mobile" v-if="item.reward.type != 'coin' && item.reward.type != 'key'">
                      <q-img :src="`${pathItem}${item.reward.itemName}.png`" no-spinner no-transition></q-img>
                    </div>

                    <div class="absolute-center item mobile" v-else>
                      <div class="fit relative-position">
                        <q-img :src="`/images/icon_main/${item.reward.type == 'coin' ? 'icon-coin-winner' : 'icon-gacha-pon-key'}.png`" no-spinner no-transition></q-img>
                      </div>
                    </div>

                    <div class="absolute box-total-amount mobile font-mali-b" align="center">
                      {{ item.reward.amount }}
                    </div>

                    <div class="absolute-center item-grade row justify-center items-center" v-if="item.isReceived">
                     <q-img src="/images/essay_main/icon-check-item.webp" style="width:23px" no-spinner  no-transition></q-img>
                    </div>
                  </div>
                </div>
              </div>

              <div class="absolute box-reward-progress row justify-around">
                <div class="relative-position reward-progress" v-for="(item,index) in rewardList" :key="index">
                  <q-img :src="`/images/essay_main/box-reward-progress${essayStore.progressScore >= ((item.percentage - 45) / 50 * 100) ? '-success' : ''}-mobile.webp`" no-spinner no-transition></q-img>
                  <div class="absolute-center text-score font-mali-b" :score="`${item.percentage}%`">
                    {{ `${item.percentage}%` }}
                  </div>
                </div>
              </div>

              <div class="progress-bar">
                <div class="progress" :style="`width:${essayStore.progressScore}%`"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Restart -->
      <div class="fit dialog-backdrop-main row justify-center items-center" v-if="isShowDialogRestart" :class="{'fixed-center':isMobile,'absolute-center':!isMobile}">
        <div class="relative-position box-dialog-restart-main animate__animated" :class="{'animate__zoomIn':isShowAnimation, 'animate__zoomOut':!isShowAnimation, 'mobile':isMobile}">
          <div class="font-mali-b text-title-dialog" align="center" :class="{'mobile':isMobile}">
            เริ่มทำแบบฝึกหัดใหม่
          </div>
          <div class="box-sub-content font-mali-m" :class="{'mobile':isMobile}">
            ความคืบหน้าและคำตอบเดิมของคุณจะถูกรีเซ็ตทั้งหมด แต่ไม่ต้องห่วง คะแนนสูงสุดจะยังถูกบันทึกไว้

          </div>
          <div class="box-footer-main row justify-between" :class="{'mobile':isMobile}">
            <div class="button-main" :class="{'mobile':isMobile}" @click="funcRestartPractice()">
              <q-img src="/images/essay_main/button-confirm-restart-practice.webp" no-spinner no-transition></q-img>
            </div>
            <div class="button-main" :class="{'mobile':isMobile}" @click="funcCloseDialog()">
              <q-img src="/images/essay_main/button-cancel-restart-practice.webp" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Restart 2 -->
      <div class="fit dialog-backdrop-main row justify-center items-center" v-if="isShowDialogRestart2" :class="{'fixed-center':isMobile,'absolute-center':!isMobile}">
        <div class="relative-position box-dialog-restart-main animate__animated" :class="{'animate__zoomIn':isShowAnimation, 'animate__zoomOut':!isShowAnimation, 'mobile':isMobile}">
          <div class="font-mali-b text-title-dialog" align="center" :class="{'mobile':isMobile}">
            เริ่มทำแบบฝึกหัดใหม่
          </div>

          <div class="box-sub-content font-mali-m" :class="{'mobile':isMobile}">
            คุณเคยเริ่มทำแบบฝึกหัดนี้ไปแล้ว หากเริ่มทำใหม่ <br/> ความคืบหน้าปัจจุบันและคำตอบเดิมของคุณจะถูกรีเซ็ตทั้งหมด
          </div>

          <div class="box-footer-main row justify-between" :class="{'mobile':isMobile}">
            <div class="button-main" :class="{'mobile':isMobile}" @click="funcRestartPractice()">
              <q-img src="/images/essay_main/button-restart-practice.webp" no-spinner no-transition></q-img>
            </div>
            <div class="button-main" :class="{'mobile':isMobile}" @click="funcContinuePractice()">
              <q-img src="/images/essay_main/button-continue.webp" no-spinner no-transition></q-img>
            </div>
          </div>

          <div class="absolute-top-right button-close" :class="{'mobile':isMobile}" @click="funcCloseDialog()">
            <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Show Get Reward -->
      <dialog-get-reward v-if="isShowDialogGetReward" @callback-closeDialog="isShowDialogGetReward = false" :itemList="showRewardList"></dialog-get-reward>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import headerBar from 'src/components/essay_main/header-bar.vue';
import backgroundMainNew from 'src/components/background_main/background-main-new.vue';
import dialogGetReward from 'src/components/dialog_main/dialog-get-reward.vue';
import { useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useEssayStore } from 'src/stores/essay';
import { useRouter } from 'vue-router';
import { db } from 'src/router';
import { useInventoryStore } from 'src/stores/inventory';

const pathItem = ref(`https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory/`)

const essayStore = useEssayStore();
const inventoryStore = useInventoryStore();

const $q = useQuasar();
const $router = useRouter();

const isMobile = ref($q.platform.is.mobile);
const isLoaded = ref(true);
const isShowDialogRestart = ref(false);
const isShowDialogRestart2 = ref(false);
const isShowDialogGetReward = ref(false)
const isShowAnimation = ref(true)
const practiceList = ref([])
const rewardList = ref(null)

const settingHeader = ref({
  title:"Writing Practice",
})

const currentPracticeId = ref(null);

const goToPracticeWriting = (item) => {

  essayStore.setCurrentTopicId(item.topicId);

  currentPracticeId.value = item.topicId;

  if(item.isFinishFeedback){
    isShowDialogRestart2.value = true;
    return;
  } else if(item.isFinishEssay){
    isShowDialogRestart.value = true;
    return;
  }else{
    essayStore.clearWritingData();
  }

  $router.replace("/essay/writing");
}

const funcCloseDialog = () => {
  isShowAnimation.value = false;
  setTimeout(() => {
    isShowDialogRestart.value = false;
    isShowDialogRestart2.value = false
    isShowAnimation.value = true;
    currentPracticeId.value = null;
  }, 250);
}

const funcRestartPractice = async () => {

  $q.loading.show();

  await essayStore.backupEssayFeedbackLog();

  setTimeout(async () => {
    await essayStore.getEssayPractice();
    $q.loading.hide();
    $router.replace("/essay/writing");
  }, 500);
}

const funcContinuePractice = () => {
  $router.replace("/essay/writing");
}

const showRewardList = ref([])
const funcReceiveReward = async () => {

  try{
    if(!essayStore.isGetReward) return;

    $q.loading.show();

    let response = await essayStore.receiveReward(rewardList.value);

    if(response.message != 'success') throw new Error(response.message);

    if(response.showRewardData.length){
      let temp_item = response.showRewardData.filter(x => x.reward.type != 'key' && x.reward.type != 'coin');

      temp_item = temp_item.map(x => x.reward);

      if(temp_item.length){
        await inventoryStore.setInventory(temp_item);
      }

      setTimeout(() => {
        essayStore.setReceiveRewardData(response.currentRewardList);
        rewardList.value = response.currentRewardList;
        showRewardList.value = response.showRewardData;
        isShowDialogGetReward.value = true;
        $q.loading.hide();
      }, 500);
    }
  }catch(e){
    console.log("*** e",e);
    $q.notify({
      message: "เกิดข้อผิดพลาดของระบบ กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      timeout: 2500,
      position: "top",
      icon: "error",
    });
    $q.loading.hide();
  }
}

onMounted(async () => {
  essayStore.setEssayName("essayPractice");

  essayStore.setCurrentPracticeListId(essayStore.practiceListId);

  practiceList.value = essayStore.practiceListData.topics;
  rewardList.value = essayStore.practiceListData.rewardList;

  isLoaded.value = false;

  // essayStore.clearWritingData();

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

.dialog-backdrop-main{
  width:100%;
  height:100%;
  background:rgba(0,0,0,.5);
  z-index:1;

  & .button-close{
    top:clamp(-25px,-1.5625cqw,-15.625px);
    right:clamp(-25px,-1.5625cqw,-15.625px);
    width:clamp(25px,2.5cqw,40px);
    cursor:pointer;

    &.mobile{
      top:-25px;
      right:-25px;
      width:40px;
    }
  }
}

// #region Desktop
.box-practice-main{
  top:clamp(60.625px,6.0625cqw,97px);
  left:50%;
  transform:translate(-50%,0%);
  width:clamp(617.5px,61.75cqw,988px);

  & .box-practice-list-main{
    top:clamp(65.625px,6.5625cqw,105px);
    left:50%;
    transform:translate(-50%,0%);
    width:clamp(531.25px,53.125cqw,850px);

    & .item-list{
      width:100%;
      height:clamp(42.5px,4.25cqw,68px);
      padding:clamp(3.125px,0.3125cqw,5px) clamp(10.625px,1.0625cqw,17px) clamp(8.125px,0.8125cqw,13px) clamp(17.5px,1.75cqw,28px);
      border-radius: clamp(10px,1cqw,16px);
      border: clamp(1.25px,0.125cqw,2px) solid #4A261B;
      background: #FFF;
      box-shadow: 0 clamp(-3px,-0.1875cqw,-1.875px) 0 0 #FFC42C inset;
      margin-bottom:clamp(5px,0.5cqw,8px);
      cursor:pointer;

      & .title{
        color: #4A261B;
        font-size:clamp(10px,1cqw,16px);
        line-height: clamp(12.5px,1.25cqw,20px);

        & :nth-child(1){
          margin-bottom:clamp(2.5px,0.25cqw,4px);
        }
      }

      & .box-icon-pin{
        width:clamp(33.125px,3.3125cqw,53px);
        margin:0px clamp(5px,0.5cqw,8px);

        & :deep(img){
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: -moz-crisp-edges;
          image-rendering: optimize-contrast;
        }
      }

      & .box-score{
        width:clamp(117.5px,11.75cqw,188px);
        height:clamp(22.5px,2.25cqw,36px);
        border-radius: clamp(5px,0.5cqw,8px);
        border: clamp(1.25px,0.125cqw,2px) solid #DB8200;
        background: #FFC42C;
        text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;

        & :nth-child(1){
          font-size:clamp(10px,1cqw,16px);
        }

        & :nth-child(2){
          font-size:clamp(12.5px,1.25cqw,20px);
          margin-left:clamp(5px,0.5cqw,8px);
        }
      }
    }
  }
}

.box-reward-practice-main{
  bottom:clamp(43.75px,4.375cqw,70px);
  left:50%;
  transform:translate(-50%,0%);
  width:clamp(617.5px,61.75cqw,988px);

  &.mobile{
    width:988px;
  }

  & .box-reward-hight-score{
    margin-left:clamp(37.5px,3.75cqw,60px);

    & :nth-child(1),& :nth-child(3){
      font-size:clamp(12.5px,1.25cqw,20px);
      color:#4A261B;
      text-shadow: rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 1.75517px 0.958851px 0px, rgb(255, 255, 255) 1.0806px 1.68294px 0px, rgb(255, 255, 255) 0.141474px 1.99499px 0px, rgb(255, 255, 255) -0.832294px 1.81859px 0px, rgb(255, 255, 255) -1.60229px 1.19694px 0px, rgb(255, 255, 255) -1.97998px 0.28224px 0px, rgb(255, 255, 255) -1.87291px -0.701566px 0px, rgb(255, 255, 255) -1.30729px -1.5136px 0px, rgb(255, 255, 255) -0.421592px -1.95506px 0px, rgb(255, 255, 255) 0.567324px -1.91785px 0px, rgb(255, 255, 255) 1.41734px -1.41108px 0px, rgb(255, 255, 255) 1.92034px -0.558831px 0px;
    }

    & .show-hight-score{
      width:clamp(82.5px,8.25cqw,132px);
      margin:clamp(3.75px,0.375cqw,6px) 0px;

      & .text-hight-score{
        color:#4A261B;
        font-size: clamp(20px,2cqw,32px);
        text-shadow: rgb(74, 38, 27) 4px 0px 0px, rgb(74, 38, 27) 3.87565px 0.989616px 0px, rgb(74, 38, 27) 3.51033px 1.9177px 0px, rgb(74, 38, 27) 2.92676px 2.72656px 0px, rgb(74, 38, 27) 2.16121px 3.36588px 0px, rgb(74, 38, 27) 1.26129px 3.79594px 0px, rgb(74, 38, 27) 0.282949px 3.98998px 0px, rgb(74, 38, 27) -0.712984px 3.93594px 0px, rgb(74, 38, 27) -1.66459px 3.63719px 0px, rgb(74, 38, 27) -2.51269px 3.11229px 0px, rgb(74, 38, 27) -3.20457px 2.39389px 0px, rgb(74, 38, 27) -3.69721px 1.52664px 0px, rgb(74, 38, 27) -3.95997px 0.56448px 0px, rgb(74, 38, 27) -3.97652px -0.432781px 0px, rgb(74, 38, 27) -3.74583px -1.40313px 0px, rgb(74, 38, 27) -3.28224px -2.28625px 0px, rgb(74, 38, 27) -2.61457px -3.02721px 0px, rgb(74, 38, 27) -1.78435px -3.57996px 0px, rgb(74, 38, 27) -0.843183px -3.91012px 0px, rgb(74, 38, 27) 0.150409px -3.99717px 0px, rgb(74, 38, 27) 1.13465px -3.8357px 0px, rgb(74, 38, 27) 2.04834px -3.43574px 0px, rgb(74, 38, 27) 2.83468px -2.82216px 0px, rgb(74, 38, 27) 3.44477px -2.03312px 0px, rgb(74, 38, 27) 3.84068px -1.11766px 0px, rgb(74, 38, 27) 3.9978px -0.132717px 0px;

        &::before{
          content:attr(score);
          position:absolute;
          top:45%;
          left:45%;
          transform:translate(-50%,-50%);
          font-size: clamp(20px,2cqw,32px);
          color:#4A261B;
          text-shadow: rgb(255, 255, 255) 4px 0px 0px, rgb(255, 255, 255) 3.87565px 0.989616px 0px, rgb(255, 255, 255) 3.51033px 1.9177px 0px, rgb(255, 255, 255) 2.92676px 2.72656px 0px, rgb(255, 255, 255) 2.16121px 3.36588px 0px, rgb(255, 255, 255) 1.26129px 3.79594px 0px, rgb(255, 255, 255) 0.282949px 3.98998px 0px, rgb(255, 255, 255) -0.712984px 3.93594px 0px, rgb(255, 255, 255) -1.66459px 3.63719px 0px, rgb(255, 255, 255) -2.51269px 3.11229px 0px, rgb(255, 255, 255) -3.20457px 2.39389px 0px, rgb(255, 255, 255) -3.69721px 1.52664px 0px, rgb(255, 255, 255) -3.95997px 0.56448px 0px, rgb(255, 255, 255) -3.97652px -0.432781px 0px, rgb(255, 255, 255) -3.74583px -1.40313px 0px, rgb(255, 255, 255) -3.28224px -2.28625px 0px, rgb(255, 255, 255) -2.61457px -3.02721px 0px, rgb(255, 255, 255) -1.78435px -3.57996px 0px, rgb(255, 255, 255) -0.843183px -3.91012px 0px, rgb(255, 255, 255) 0.150409px -3.99717px 0px, rgb(255, 255, 255) 1.13465px -3.8357px 0px, rgb(255, 255, 255) 2.04834px -3.43574px 0px, rgb(255, 255, 255) 2.83468px -2.82216px 0px, rgb(255, 255, 255) 3.44477px -2.03312px 0px, rgb(255, 255, 255) 3.84068px -1.11766px 0px, rgb(255, 255, 255) 3.9978px -0.132717px 0px;
        }
      }
    }
  }

  & .box-reward-item-list{
    width:clamp(447.5px,44.75cqw,716px);
    height: clamp(89.375px,8.9375cqw,143px);
    border-radius: clamp(10px,1cqw,16px);
    background: #F6F3D3;
    margin-right:clamp(15px,1.5cqw,24px);
    padding:0px clamp(4.375px,0.4375cqw,7px) clamp(16.25px,1.625cqw,26px);

    & .box-reward-list-main{
      width:100%;
      top:35%;
      left:50%;
      transform:translate(-50%,-50%);

      & .reward-item{
        width:clamp(43.75px,4.375cqw,70px);

        & .animate-item{
          animation-duration:1s;
          animation-direction: alternate;
          animation-iteration-count: infinite;
        }

        & .item{
          width:clamp(40.625px,4.0625cqw,65px);
          border-radius: clamp(6.25px,0.625cqw,10px);
          overflow: hidden;
          padding:clamp(6.125px,0.6125cqw,10px);
        }

        & .box-total-amount{
          bottom:clamp(7.5px,0.75cqw,12px);
          left:50%;
          transform:translate(-50%,0%);
          width:75%;
          border-radius: clamp(31.25px,3.125cqw,50px);
          background: rgba(0, 0, 0, 0.10);
          text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
          font-size: clamp(8.125px,0.8125cqw,13px);
          color:#fff;
          line-height: normal;
        }

        & .item-grade{
          width:95%;
          height:95%;
          font-size:clamp(31.25px,3.125cqw,50px);
          color:#9EFF00;
          background-color:rgba(0,0,0,.25);
          border-radius: clamp(6.25px,0.625cqw,10px);
        }
      }
    }

    & .box-progress-score-main{
      width:100%;
      top:77%;
      left:50%;
      transform:translate(-50%,-50%);

      & .progress-score{
        width:clamp(51.875px,5.1875cqw,83px);

        & .text-score{
          left:55%;
          font-size:clamp(12.5px,1.25cqw,20px);
          text-shadow: 1px 1px 0 #4A261B;

          &::before{
            content:attr(score);
            position:absolute;
            top:45%;
            left:45%;
            transform:translate(-50%,-50%);
            color:#fff;
            text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px, rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px, rgb(74, 38, 27) -0.653644px -0.756802px 0px, rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
          }
        }

      }

    }

    & .box-progress-bar{
      width:100%;
      height:clamp(7.5px,0.75cqw,12px);
      border-radius: 30px;
      border: 1px solid #4A261B;
      background: #FFF;
      padding:clamp(1.25px,0.125cqw,2px) clamp(2.5px,0.25cqw,4px);

      & .progress-bar{
        width:80%;
        height:100%;
        border-radius: 30px;
        background: #91EA00;
      }
    }
  }
}
// #endregion

// #region Mobile
.box-practice-mobile-main{
  width:336px;
  margin:60px auto 0px;

  & .box-practice-list{
    top:80px;
    width:100%;
    padding:0px 16px;

    & .practice-list{
      width: 300px;
      height: 76px;
      border-radius: 16px;
      border: 1px solid #4A261B;
      margin:16px 0px;
      border-radius: 16px;
      background: #FFF;
      box-shadow: 0 -3px 0 0 #FFC42C inset;
      padding:5px 12px 16px;
      color: #4A261B;
      font-size: 12px;
      line-height: 20px;
      letter-spacing: -0.24px;

      & .box-hight-score{
        right:10px;
        width: fit-content;
        height: 20px;
        border-radius: 8px;
        border: 1px solid #DB8200;
        background: #FFC42C;
        padding: 0px 6px;
        text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
        margin:3px 0px 0px;



        & :nth-child(1){
          font-size:9px;
          line-height:16px;
        }

        & :nth-child(2){
          font-size:11px;
          line-height:16px;
          margin-left:5px;
          color: #4A261B;

        }
      }

      & .box-icon-pin{
        width:25px;

        & :deep(img){
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: -moz-crisp-edges;
          image-rendering: optimize-contrast;
        }
      }
    }

  }


}

.box-reward-mobile-main{
  width:336px;
  margin:auto;
  padding:8px 0px;

  & .box-reward-hight-score{
    width:100%;
    border-radius: 16px;
    border: 2px solid #4A261B;
    background: #FFC42C;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25);
    padding:13px 12px 10px;
    text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;

    & .text-reward{
      color: #4A261B;
      font-size: 14px;
      line-height: 16px;
    }

    & .text-hight-score{
      color: #4A261B;
      font-size: 14px;
      line-height: 16px;
    }

    & .box-hight-score{
      width:47px;
      margin-left:4px;

      & .text-score{
        top:53%;
        left:50%;
        font-size: 12px;
        color: #4A261B;
        text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px, rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px, rgb(74, 38, 27) -0.653644px -0.756802px 0px, rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
        line-height: 16px;

        &:before{
          content:attr(score);
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          color: #4A261B;
          font-size: 14px;
          line-height: 16px;
          text-shadow: rgb(255, 255, 255) 1px 0px 0px, rgb(255, 255, 255) 0.540302px 0.841471px 0px, rgb(255, 255, 255) -0.416147px 0.909297px 0px, rgb(255, 255, 255) -0.989992px 0.14112px 0px, rgb(255, 255, 255) -0.653644px -0.756802px 0px, rgb(255, 255, 255) 0.283662px -0.958924px 0px, rgb(255, 255, 255) 0.96017px -0.279415px 0px;
        }
      }
    }

    & .box-reward-item-list{
      height: 85px;
      border-radius: 12px;
      background: #F6F3D3;
      padding:10px 10px 12px;
      margin:10px auto 0px;

      & .box-reward-item{
        top:7px;
        width:90%;

        & .reward-item{
          width: 40px;
          cursor:pointer;

          & .animate-item{
            animation-duration:1s;
            animation-direction: alternate;
            animation-iteration-count: infinite;
          }

          & .item{
            width:25px;
          }

          & .box-total-amount{
            bottom:5px;
            left:50%;
            transform:translate(-50%,0%);
            width:85%;
            border-radius: 50px;
            background: rgba(0, 0, 0, 0.10);
            text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
            font-size: 10px;
            color:#fff;
          }

          & .item-grade{
            width:95%;
            height:95%;
            color:#9EFF00;
            background-color:rgba(0,0,0,.25);
            border-radius: 5px;
          }
        }
      }

      & .box-reward-progress{
        bottom:7px;
        width:90%;

        & .reward-progress{
          width:43px;
          font-size:12px;
        }

      }


      & .progress-bar{
        width:100%;
        height: 12px;
        border-radius: 30px;
        border: 1px solid #4A261B;
        background: #FFF;
        padding:2px;

        & .progress{
          width:50%;
          height:100%;
          border-radius: 30px;
          background: #91EA00;
        }
      }
    }
  }
}
// #endregion

// #region Dialog Restart
.box-dialog-restart-main{
  width: clamp(200px,20cqw,320px);
  padding:0px clamp(6.25px,0.625cqw,10px);
  border-radius: clamp(12.5px,1.25cqw,20px);
  border: clamp(5px,0.5cqw,8px) solid #F2C043;
  box-shadow: 0 0 0px clamp(1.875px,0.1875cqw,3px) #4A261B;
  background: #F6F3D3;
  font-size: clamp(12.5px,1.25cqw,20px);
  line-height: clamp(12.5px,1.25cqw,20px);
  color: #4A261B;

  &.mobile{
    width: 320px;
    padding:0px 10px;
    border-radius: 20px;
    border: 8px solid #F2C043;
    box-shadow: 0 0 0px 3px #4A261B;
    background: #F6F3D3;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 20px;
  }

  & .text-title-dialog{
    margin:clamp(15.625px,1.5625cqw,25px) 0px;

    &.mobile{
      margin:25px 0px;
    }
  }

  & .box-sub-content{
    border-radius: clamp(3.125px,0.3125cqw,5px);
    background: #EFD080;
    padding:clamp(5px,0.5cqw,8px);
    margin:clamp(11.25px,1.125cqw,18px) 0px;
    color: #4A261B;
    font-size: clamp(10px,1cqw,16px);
    line-height: clamp(18.75px,1.875cqw,30px);

    &.mobile{
      border-radius: 5px;
      padding:10px;
      margin:18px 0px;
      font-size: 16px;
      line-height: 30px;
    }
  }

  & .box-footer-main{
    margin:clamp(11.25px,1.125cqw,18px) 0px;

    &.mobile{
      margin:18px 0px;
    }

    & .button-main{
      width:clamp(83.125px,8.3125cqw,133px);
      border:0px solid transparent;
      cursor:pointer;

      &.mobile{
        width:133px;
      }
    }
  }
}
// #endregion

</style>
