<template>
  <q-page class="fit row justify-center items-center box-backdrop-extra-world" :class="{'mobile': isMobile}">
    <div class="box-extra-world-main relative-position" :class="{'mobile': isMobile}">
      <!-- #region Background -->
      <background-main-new :background="'background-extra-world.webp'" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Animation Star -->
      <div class="absolute-center fit" v-if="false">
        <div class="relative-position fit" :class="{'animation-star':!isMobile}">
          <q-img src="/images/background_main/background-extra-world-star.webp" no-spinner no-transition></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-bar></header-bar>
      <!-- #endregion -->

      <!-- #region Desktop -->
      <div v-if="!isMobile">
        <!-- #region Island -->
        <div class="absolute box-island-world-main">
          <div v-for="(item, index) in showIsland" :key="index" :class="`absolute box-island-world-item ${item.name}`,{'lock': index > 0}" :style="`animation-delay:0.${Math.floor(Math.random() * 10)}s`">
            <div class="relative fit" @click="handleGoTo(item)">
              <q-img :src="`/images/extra_world_main/island-world-${index + 1}.webp`" no-spinner no-transition v-if="!item.isLock" :class="{'world-1':index == 0}"></q-img>

              <q-img :src="`/images/extra_world_main/island-world-${index + 1}-coming.webp`" no-spinner no-transition :class="{'world-2': index == 1,'world-3': index == 2}" v-if="item.isLock && index < 3"></q-img>

              <q-img :src="`/images/extra_world_main/island-world-lock.webp`" no-spinner no-transition v-if="item.isLock && index > 2" style="width:clamp(158.125px,15.8125cqw,253px)"></q-img>

              <div class="absolute-bottom box-label-island" v-if="!item.isLock && item.isShowLabel">
                <div class="relative-position">
                  <q-img :src="`/images/extra_world_main/label-island${funcSuccessIsland(item) == 3 ? '-success' : ''}.webp`" no-spinner no-transition></q-img>

                  <div class="absolute-top number-of-learning row justify-center items-center">
                    <div class="font-fredoka">
                      {{ `${funcSuccessIsland(item)}/3` }}
                    </div>
                  </div>
                  <div class="absolute-bottom text-name-island row justify-center items-center">
                    <div class="font-fredoka">
                      {{ `Essay` }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region button back -->
        <div class="absolute-bottom-right box-button-back" @click="handleBack()">
          <q-img src="/images/extra_world_main/button-back.webp" no-spinner no-transition></q-img>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #endregion -->

      <!-- #region Mobile -->
      <div class="absolute box-island-world-main mobile" v-if="isMobile">
        <div class="relative-position">
          <!-- #region Island -->
          <q-tab-panels
            v-model="tabIsland"
            animated
            transition-prev="scale"
            transition-next="scale"
            class="transparent no-padding"
            swipeable
            infinite
          >
            <q-tab-panel :name="index" v-for="(item,index) in showIsland" :key="index">
              <div class="box-island-world-item mobile">
                <div class="relative fit" @click="handleGoTo(item)">

                  <q-img :src="`/images/extra_world_main/island-world-${index + 1}.webp`" no-spinner no-transition v-if="!item.isLock"></q-img>

                  <q-img :src="`/images/extra_world_main/island-world-${index + 1}-lock.webp`" no-spinner no-transition v-if="item.isLock && index < 3"></q-img>

                  <q-img :src="`/images/extra_world_main/island-world-lock.webp`" no-spinner no-transition v-if="item.isLock && index > 2"></q-img>

                  <div class="absolute-bottom box-label-island mobile" v-if="!item.isLock">
                    <div class="relative-position">
                      <q-img :src="`/images/extra_world_main/label-island${funcSuccessIsland(item) == 3 ? '-success' : ''}.webp`" no-spinner no-transition></q-img>

                      <div class="absolute-top number-of-learning mobile row justify-center items-center">
                        <div class="font-fredoka">
                          {{ `${funcSuccessIsland(item)}/3` }}
                        </div>
                      </div>
                      <div class="absolute-bottom text-name-island mobile row justify-center items-center">
                        <div class="font-fredoka">
                          {{ `Essay` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
          <!-- #endregion -->

          <!-- #region Button back -->
          <div class="absolute-bottom-right box-button-back mobile" @click="handleBack()">
            <q-img src="/images/extra_world_main/button-back-mobile.webp" no-spinner no-transition></q-img>
          </div>
          <!-- #endregion -->

          <!-- #region Pagination -->
          <div class="absolute box-pagination-main">
            <div class="relative-psotion fit" align="center">
              <div class="absolute-center line"></div>
              <div class="relative-position row fit justify-between items-center" align="center">
                <div v-for="(item,index) in islandList" :key="index" :class="`box-pagination-item button`">
                <div class="relative-position">
                  <q-img :src="`/images/extra_world_main/button-extra-pagination${index >= 1 && index <= 6 ? '-lock' : ''}${index == tabIsland ? '-selected' : ''}.webp`" no-spinner no-transition></q-img>
                <div class="absolute-center text font-mali-b">
                  {{ item.shortName }}
                </div>
                </div>
              </div>
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
import headerBar from 'src/components/extra_world_main/header-bar.vue';
import backgroundMainNew from 'src/components/background_main/background-main-new.vue';
import { useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useEssayStore } from 'src/stores/essay';

const essayStore = useEssayStore();

const $q = useQuasar();
const $router = useRouter()

const isMobile = ref($q.platform.is.mobile);
const tabIsland = ref(0);
const islandList = ref([
  {
    name:"island-world-1",
    shortName:"Es",
    type:"essay",
    isLock:true,
    isShowLabel:false,
  },
  {
    name:"island-world-2",
    shortName:"",
    type:"",
    isLock:true,
    isShowLabel:false,
  },
  {
    name:"island-world-3",
    shortName:"",
    type:"",
    isLock:true,
    isShowLabel:false,
  },
  {
    name:"island-world-4",
    shortName:"",
    type:"",
    isLock:true,
    isShowLabel:false,
  },
  {
    name:"island-world-5",
    shortName:"",
    type:"",
    isLock:true,
    isShowLabel:false,
  },
  {
    name:"island-world-6",
    shortName:"",
    type:"",
    isLock:true,
    isShowLabel:false,
  }
])

const handleGoTo = (item) => {
  if(item.isLock) return;

  if(item.type == "essay"){
    $router.replace("/essay/world");
  }
  if(item.type == "singalong"){
    $router.replace("/singalong");
  }
}

const handleBack = () => {
  $router.push('/practice/list');
}

const showIsland = computed(() => {
  let temp = islandList.value
  temp.forEach(res => {
    if(res.type == 'essay'){
      if(essayStore.isEnable){
        res.isLock = false;
        res.isShowLabel = true;
      }
    }else if(res.type == 'singalong'){
      res.isLock = false;
    }
  })
  return temp;
})

const funcGetLessonLog = async () => {
  try{

    $q.loading.show();

    await essayStore.getEssayLessonLog();

    console.log("*** getEssayLessonLog");

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

const funcSuccessIsland = (item) => {

  let temp_success = 0

  if(item.type == 'essay'){
    if(essayStore.essaySuccess.lesson2Count > 0) temp_success++
    if(essayStore.essaySuccess.lessonCountPractice >= 5) temp_success++
    if(essayStore.essaySuccess.essayCount > 0) temp_success++
  }

  return temp_success

}

onMounted(async () => {
  await funcGetLessonLog();
})

</script>

<style lang="scss" scoped>
.box-backdrop-extra-world{
  width:100%;
  background:url('/images/background_main/backdrop-extra-world.webp');
  background-size:cover;
  background-position:center;
  background-repeat:no-repeat;

  &.mobile{
    background:url('/images/background_main/background-extra-world.webp');
    background-size:cover;
    background-position:center;
  }
}

.box-extra-world-main{
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

  & .box-island-world-main{
    top:clamp(51.25px,5.125cqw,82px);
    left:50%;
    transform: translate(-50%,0%);
    width:clamp(900px,90cqw,1440px);
    height:clamp(460px,46cqw,736px);
    margin:auto;

    &.mobile{
      top:50%;
      width:360px;
      height:fit-content;
      transform:translate(-50%,-50%);
    }

    & .box-island-world-item{
      width:clamp(225px,22.5cqw,360px);
      animation: island-world-item 1.5s ease-in-out infinite alternate;
      -webkit-animation: island-world-item 1.5s ease-in-out infinite alternate;
      -moz-animation: island-world-item 1.5s ease-in-out infinite alternate;
      transform: translate(0,0) scale(1);
      -webkit-transform: translate(0,0) scale(1);
      -moz-transform: translate(0,0) scale(1);
      cursor:pointer;

      &.mobile{
        width:280px;
        height:280px;
        margin:auto;
      }

      @keyframes island-world-item{
        0%{
          transform: translate(0,0) scale(1);
          -webkit-transform: translate(0,0) scale(1);
          -moz-transform: translate(0,0) scale(1);
        }
        100%{
          transform: translate(0,2%) scale(1);
          -webkit-transform: translate(0,2%) scale(1);
          -moz-transform: translate(0,2%) scale(1);
        }
      }

      &:hover{
          animation-play-state: paused;
          -webkit-animation-play-state: paused;
          -moz-animation-play-state: paused;
        }

      &.island-world-1{
        width:403px;
        top:0px;
        left:110px;
      }

      &.island-world-2{
        width:379px;
        top:clamp(118.75px,11.875cqw,190px);
        left:485px;
      }

      &.island-world-3{
        width:306px;
        bottom:0;
        left:0;
      }

      &.island-world-4{
        top:0;
        left:clamp(450px,45cqw,720px);
      }

      &.island-world-5{
        top:clamp(118.75px,11.875cqw,190px);
        right:0;
      }

      &.island-world-6{
        bottom:0;
        left:clamp(450px,45cqw,720px);
      }

      &.lock{
        width:clamp(158.125px,15.8125cqw,253px);
        cursor:default;
      }

      & .box-label-island{
        top:40%;
        left:50%;
        transform:translate(-50%,0%);
        width:clamp(181.25px,18.125cqw,290px);
        height:fit-content;

        &.mobile{
          width:280px;
          top:57%;
          transform:translate(-50%,-50%);
        }

        & .number-of-learning{
          top:9%;
          left:51%;
          transform:translate(-50%,0%);
          width:clamp(40.625px,4.0625cqw,65px);
          font-size:clamp(11.25px,1.125cqw,18px);
          line-height:clamp(12.5px,1.25cqw,20px);
          color:#fff;
          text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;

          &.mobile{
            top:13%;
            font-size:18px;
            transform: translate(-50%,0%);
          }
        }

        & .text-name-island{
          bottom:28%;
          left:50%;
          transform:translate(-50%,0%);
          width:clamp(156.25px,15.625cqw,250px);
          font-size:clamp(18.75px,1.875cqw,30px);
          color:#fff;
          text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px, #000 0px 4px 0px,#000 -2px 4px 0px;
          line-height:clamp(10px,1cqw,16px);

          &.mobile{
            bottom:35%;
            font-size:30px;
          }
        }
      }
    }

  }

  & .box-pagination-main{
    bottom:-80px;
    width:300px;
    height:50px;
    left:50%;
    transform:translate(-50%,0%);
    margin:auto;

    & .line{
      width:280px;
      height: 9.315px;
      border-radius: 4.658px;
      border: 2px solid #4A261B;
      background: #764323;
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.25) inset;
    }

    & .button{
      width:42px;
      height:42px;

      & .text{
        font-size:22px;
        line-height:16px;
        color:#fff;
        text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px, rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px, rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px, rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px, rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px, rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px, rgb(74, 38, 27) 1.92034px -0.558831px 0px;
      }
    }
  }

  & .box-button-back{
    width:clamp(104.375px,10.4375cqw,167px);
    cursor:pointer;

    &.mobile{
      bottom:-25px;
      width:97px;
    }

    &:active{
      transform:scale(0.95);
      -webkit-transform:scale(0.95);
      -moz-transform:scale(0.95);
      -ms-transform:scale(0.95);
      -o-transform:scale(0.95);
    }
  }
}


.animation-star{
  animation: animationStar 1500s linear infinite;
  -webkit-animation: animationStar 1500s linear infinite;
  -moz-animation: animationStar 1500s linear infinite;
}

@keyframes animationStar{
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}

</style>
