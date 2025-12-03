<template>
  <div class="relative-position fit animate__animated" :class="isShowDialogChooseTrialCardLevel ? 'animate__fadeIn' : 'animate__fadeOut'" v-if="!isShowLoading">
    <div class="absolute box-choose-trial-level" :class="{'mobile': isMobile}">
      <div class="relative-position row">
        <div class="box-close-choose-trial-level mobile" v-if="isMobile"></div>
        <div class="col">
          <div align=center class="font-mali-b text-choose-trial-level-header" :class="{'mobile': isMobile}">
            {{`ทดลอง${isMobile ? '' : 'เรียน'}ฟรี 7 วัน`}}
          </div>
          <div align=center class="font-mail-b text-choose-trial-level-sub" :class="{'mobile': isMobile}">
            โปรดเลือกแพคเกจ
          </div>
        </div>
        <div class="box-close-choose-trial-level mobile" v-if="isMobile" @click=funcCloseDialogChooseTrialLevel()>
          <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner ></q-img>
        </div>
      </div>
      <div class="box-choose-trial-level-content" :class="{'mobile': isMobile}">
        <div class="fit row" v-if="cardLevelList.length > 0">
          <div class="box-card-trial-level-main" :class="{'mobile': isMobile}" v-for="(item,index) in cardLevelList" :key="index">
            <div class="card-trial-content"  :class="{'mobile': isMobile,'active':selectedCardLevel?.level == item.level}" @click="funcSelectCardLevel(item)">
              <div class="card-trial-level-header relative-position font-fredoka-sb" :class="{'mobile': isMobile}">
                <div align="center">{{ `Level ${item.level}` }}</div>
                <div class="absolute-top-right card-trial-level-info" :class="{'mobile': isMobile}">
                  <q-img src="/images/icon_main/icon-info.webp" no-spinner no-transition></q-img>
                </div>
              </div>
              <div class="card-trial-level-body" :class="{'mobile': isMobile}">
                <div class="card-level" align="center">
                  <q-img :src="`${item.img}`" no-spinner no-transition></q-img>
                </div>
                <div class="text-card-level font-mali-m" :class="{'mobile': isMobile}">
                  {{`${item.detail}`}}
                </div>
                <div class="box-recommend-level row justify-center items-center font-mali-m" align="center" :class="{'mobile': isMobile,'isHaveRecommendLevel': studentStore.levelForAge == item.level.toString() || studentStore.placementTestLevel == item.level.toString()}" >
                  <span v-if="studentStore.levelForAge == studentStore.placementTestLevel">
                    {{ `“ระดับตามอายุและที่ทดสอบได้”` }}
                  </span>
                  <span v-else>
                    <span v-if="studentStore.levelForAge == item.level.toString()">{{ `“ระดับแนะนำตามอายุ”` }}</span>
                    <span v-else-if="studentStore.placementTestLevel == item.level.toString()">{{ `“ระดับที่ทดสอบได้”` }}</span>
                    <span v-else>{{ `“ระดับที่แนะนำ”` }}</span>
                  </span>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fit row justify-center items-center" v-else>
          <div class="box-text-no-data font-mali-b">
            {{ `ยังไม่มีข้อมูล` }}
          </div>
        </div>
      </div>
      <div class="box-choose-trial-level-footer" :class="{'mobile': isMobile}" @click="funcConfirmChooseTrialLevel()">
        <q-img :src="`/images/button_main/button-confirm-choose-trial-level${isMobile ? '-mobile' : ''}.webp`" no-transition no-spinner ></q-img>
      </div>
    </div>
    <div class="absolute-top-right box-close-choose-trial-level" v-if="!isMobile" @click=funcCloseDialogChooseTrialLevel()>
      <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner ></q-img>
    </div>
  </div>

  <dialog-loading :isShowLoading="isShowLoading"></dialog-loading>
</template>

<script setup>

import dialogLoading from "src/components/dialog-loading.vue"

import axios from 'axios';
import { useQuasar } from 'quasar';
import { useCourseStore } from 'src/stores/course';
import { useStudentStore } from 'src/stores/student';
import { useSystemStore } from 'src/stores/system';
import { ref, onMounted } from 'vue';

const emits = defineEmits(["callback-closeDialog","callback-chooseTrialLevel"]);

const $q = useQuasar()

const studentStore = useStudentStore();
const courseStore = useCourseStore();
const systemStore = useSystemStore();

// Boolean
const isMobile = ref($q.platform.is.mobile);
const isShowDialogChooseTrialCardLevel = ref(true);
const isShowLoading = ref(true);

// Data
const selectedCardLevel = ref(null);
const cardLevelList = ref([]);

// #region Selected Card Level
const funcSelectCardLevel = (data) => {
  selectedCardLevel.value = data
}
// #endregion

// #region Close Dialog Choose Trial Level
const funcCloseDialogChooseTrialLevel = () => {
  isShowDialogChooseTrialCardLevel.value = false;

  setTimeout(() => {
    emits("callback-closeDialog");
  }, 50);
}
// #endregion

// #region Confirm Choose Trial Level
const funcConfirmChooseTrialLevel = async () => {

  try{

    if(selectedCardLevel.value == null){
      throw "no-choose"
    }

    isShowLoading.value = true;

    let level = selectedCardLevel.value.level;

    const response = await courseStore.addTrialLearning(level);

    if(response != 'success'){
      throw "error"
    }

    emits("callback-chooseTrialLevel",selectedCardLevel.value);

  }catch(e){
    if(e == 'no-choose'){
      $q.notify({
        message: `กรุณาเลือกเลเวล`,
        color: `negative`,
        icon: `warning`,
        position:"top",
      });
    }

    if(e == 'error'){
      $q.notify({
        message: e,
        color: `negative`,
        icon: `warning`,
        position:"top",
      });
    }

    isShowLoading.value = false;
    
    console.log(e);
  }

}
// #endregion

// #region Load Card Level
const funcLoadCardLevel = async () => {

  try {
    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/OMS-getCardLevel`;

    const response = await axios.get(APIURL);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    let temp = [];

    response.data.data.forEach((res, index) => {

      let newData = {
        level:res.level,
        detail:res.detail,
        img: `/images/subscribe_payment/courseLv${res.level}.png`,
      };

      temp.push(newData);
    });

    isShowLoading.value = false;

    cardLevelList.value = temp;
  } catch (e) {
    cardLevelList.value = []
    console.log(e);
    alert(e);
  }
};
// #endregion

onMounted(() => {
  funcLoadCardLevel()
})

</script>

<style lang="scss" scoped>

.box-choose-trial-level{
  width:63.8125%;
  height:97.2222%;
  top:2.29777%;
  left:17.5325%;
  border-radius: clamp(12.5px,1.25cqw,20px);
  border: clamp(1.875px,0.1875cqw,3px) solid #4A261B;
  background: #F2C043;
  box-shadow: 0 0 clamp(2.5px,0.25cqw,4px) 0 rgba(0, 0, 0, 0.25);
  padding: clamp(8.125px,0.8125cqw,13px);

  &.mobile{
    max-width: 480px;
    width:100%;
    min-width:360px;
    height:600px;
    top:50%;
    left:50%;
    border-radius: 20px;
    border: 3px solid #4A261B;
    background: #F2C043;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
    padding: 8px 5px 14px;

    transform:translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    -o-transform: translate(-50%,-50%);
  }

  & .text-choose-trial-level-header{
    color:#fff;
    font-size:clamp(20px,2cqw,32px);
    text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px, rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px, rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px, rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px, rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px, rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px, rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px, rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px, rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px, rgb(74, 38, 27) 2.88051px -0.838247px 0px;

    &.mobile{
      font-size: 20px;
    }
  }

  & .text-choose-trial-level-sub{
    color:#fff;
    font-size:clamp(12.5px,1.25cqw,20px);
    text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px, rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px, rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px, rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px, rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px, rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px, rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px, rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px, rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px, rgb(74, 38, 27) 2.88051px -0.838247px 0px;
    margin-top:clamp(-4.375px,0.4375cqw,-7px);

    &.mobile{
      font-size: 12px;
      margin-top:-3px;
    }
  }

  & .box-choose-trial-level-content{
    width:100%;
    height:83%;
    border-radius: clamp(6.25px,0.625cqw,10px);
    background: #F6F3D3;
    box-shadow: 0 0 clamp(2.5px,0.25cqw,4px) 0 rgba(0, 0, 0, 0.25);
    margin:clamp(6.25px,0.625cqw,10px) 0px;
    padding: clamp(10px,1cqw,16px);
    overflow: auto;

    &.mobile{
      height:100%;
      height:460px;
      border-radius: 10px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
      margin:10px 0px;
      padding: 16px 0px;
    }

    & .box-card-trial-level-main{
      width:25%;
      padding: clamp(1.875px,0.1875cqw,3px);
      cursor:pointer;

      &.mobile{
        width: 50%;
        // padding: 4px;
      }

      & .card-trial-content{
        width:100%;
        border: clamp(1.875px,0.1875cqw,3px) solid transparent;
        border-radius: clamp(10px,1cqw,16px);
        padding: clamp(1.875px,0.1875cqw,3px);

        &:hover,&.active{
          border: clamp(1.875px,0.1875cqw,3px) solid #6DBE00;
          background: #91EA00;
        }

        &.mobile{
          border-radius: 16px;
          padding: 3px;
          border: 3px solid transparent;

          &:hover,&.active{
            border: 3px solid #6DBE00;
            background: #91EA00;
          }
        }

      & .card-trial-level-header{
        color: #FFF;
        background: #4A261B;
        font-size:clamp(15px,1.5cqw,24px);
        line-height: clamp(15px,1.5cqw,24px);
        padding: clamp(7.5px,0.75cqw,12px) clamp(10px,1cqw,16px) clamp(5px,0.5cqw,8px) clamp(20px,2cqw,32px);
        border-radius: clamp(10px,1cqw,16px) clamp(10px,1cqw,16px) 0px 0px;

        &.mobile{
          font-size:16px;
          line-height:20px;
          padding: 8px 24px 6px 24px;
          border-radius:12px 12px 0px 0px;
        }
      }

      & .card-trial-level-info{
        width:7.045%;
        right:7.045%;
        top:50%;
        cursor:pointer;

        transform:translateY(-50%) scale(1);
        -webkit-transform:translateY(-50%) scale(1);
        -moz-transform:translateY(-50%) scale(1);
        -ms-transform:translateY(-50%) scale(1);
        -o-transform:translateY(-50%) scale(1);

        &:active{
          transform:translateY(-50%) scale(0.95);
          -webkit-transform:translateY(-50%) scale(0.95);
          -moz-transform:translateY(-50%) scale(0.95);
          -ms-transform:translateY(-50%) scale(0.95);
          -o-transform:translateY(-50%) scale(0.95);
        }

        &.mobile{
          width:16px;
          right:8px;
          top:45%;
        }
      }

      & .card-trial-level-body{
        padding: clamp(7.5px,0.75cqw,12px) clamp(10px,1cqw,16px) clamp(10px,1cqw,16px);
        border-radius: 0px 0px clamp(10px,1cqw,16px) clamp(10px,1cqw,16px);
        background-color:#fff;

        &.mobile{
          border-radius:0px 0px 12px 12px;
          padding: 8px;
        }

        & .card-level{
          width:97.25%;
          text-align:center;
          padding: 0 clamp(15px,1.5cqw,24px);
          margin:auto;

          &.mobile{
            width:140px;
            padding:0px;

          }
        }

        & .text-card-level{
          font-size:clamp(7.5px,0.75cqw,12px);
          margin-top:clamp(2.5px,0.25cqw,4px);
          color:#4A261B;
          text-align:center;

          &.mobile{
            font-size:10px;
            margin-top:4px;
          }
        }

        & .box-recommend-level{
          height:40%;
          color:#fff;
          border-radius: clamp(5px,0.5cqw,8px);
          background: #fff;
          padding: clamp(2.5px,0.25cqw,4px) clamp(5px,0.5cqw,8px);
          font-size:clamp(7.5px,0.75cqw,12px);
          line-height: clamp(15px,1.5cqw,24px);
          margin-top:clamp(5px,0.5cqw,8px);
          white-space: nowrap;

          &.isHaveRecommendLevel{
            background: #0085FF;
          }

          &.mobile{
            border-radius: 6px;
            padding:4px 8px;
            font-size:9px;
            line-height:16px;
            margin-top:8px;
          }
        }

      }

      }

    }

    & .box-text-no-data{
      color:#4A261B;
      font-size:clamp(15px,1.5cqw,24px);
    }
  }

  & .box-choose-trial-level-footer{
    width:100%;
    cursor:pointer;

    &.mobile{
      width:345px;
      margin:auto;
    }
  }
}

.box-close-choose-trial-level{
  width:2.9375%;
  top:0.51666%;
  left:79.5537%;
  cursor:pointer;

  &.mobile{
    width:48px;
    top:0%;
    right:0%;
  }
}
</style>
