<template>
  <q-page class="box-backdrop-main fit row justify-center items-center" :class="{'mobile': isMobile}">
    <div class="box-essay-main relative-position" :class="{'mobile': isMobile}">
      <!-- #region Background -->
      <background-main-new :background="'background-essay-1.webp'" v-if="!isMobile"></background-main-new>
      <!-- #endregion -->

      <!-- #region Header -->
      <header-main :settingHeader="settingHeader"></header-main>
      <!-- #endregion -->

      <!-- #region Box Card Essay -->

        <!-- #region Desktop -->
        <div class="absolute-center box-card-essay-main" v-if="!isMobile">
          <div class="relative-position fit">
            <div class="box-card-essay-scroll" id="box-card-essay-scroll" ref="boxCardEssayScroll">
              <div class="box-card-item relative-position " @click="funcSelectCard(item,index)" v-for="(item,index) in show_card" :class="{'disable': item.isLock}">
                <q-img :src="`/images/essay_main/box-card-essay-${index + 1}.webp`" no-spinner no-transition></q-img>

                <div class="absolute-top-right box-icon-lock" v-if="item.isLock">
                  <q-img src="/images/essay_main/icon-card-lock.webp" no-spinner no-transition></q-img>
                </div>

                <div class="absolute-top-right box-label-success" v-if="item.isPassed">
                  <q-img src="/images/essay_main/label-essay-lesson-success.webp" no-spinner no-transition></q-img>
                </div>
              </div>
            </div>

            <div class="absolute button-arrow left" @click="scrollCards('left')" v-if="!isAtLeft">
              <q-img src="/images/essay_main/button-lesson-arrow-left.webp" no-spinner no-transition></q-img>
            </div>
            <div class="absolute button-arrow right" @click="scrollCards('right')" v-if="!isAtRight">
              <q-img src="/images/essay_main/button-lesson-arrow-right.webp" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Mobile -->
        <div class="absolute-center fit" v-else>

          <div class="relative-position fit" id="box-card-essay-mobile-scroll">
            <!-- แสดงการ์ด 3 ใบ: ซ้าย, กลาง, ขวา -->
            <div
              class="absolute-top box-card-essay-mobile"
              v-for="(item,index) in visibleCards"
              :key="`card-${item.originalIndex}`"
              :class="{
                'disable': item.isLock,
                'active': item.position === 'center',
                'left': item.position === 'left',
                'right': item.position === 'right'
              }"
              @click="funcSelectCard(item,index)"
            >
              <div class="relative-position fit">
                <q-img :src="`/images/essay_main/box-card-essay-${item.originalIndex+1}.webp`" no-spinner no-transition></q-img>

                <div class="absolute-top-right box-icon-lock mobile" v-if="item.isLock">
                  <q-img src="/images/essay_main/icon-card-lock.webp" no-spinner no-transition></q-img>
                </div>

                <div class="absolute-top-right box-label-success" v-if="item.isPassed">
                  <q-img src="/images/essay_main/label-essay-lesson-success.webp" no-spinner no-transition></q-img>
                </div>
              </div>
            </div>
            <!-- Carousel indicators -->
            <div class="absolute-bottom box-button-carousel-main row justify-center">
              <div
                class="button-carousel"
                :class="{'active': selectCardLesson == indexCarousel}"
                v-for="(item,indexCarousel) in show_card_mobile"
                :key="indexCarousel"
                @click="selectCardLesson = indexCarousel"
              >
              </div>
            </div>

            <div class="absolute button-arrow left" @click="selectCardLesson == 0 ? selectCardLesson = show_card_mobile.length - 1 : selectCardLesson--" >
              <q-img src="/images/essay_main/button-lesson-arrow-left.webp" no-spinner no-transition></q-img>
            </div>
            <div class="absolute button-arrow right" @click="selectCardLesson == show_card_mobile.length - 1 ? selectCardLesson = 0 : selectCardLesson++" >
              <q-img src="/images/essay_main/button-lesson-arrow-right.webp" no-spinner no-transition></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region Text Choose the lesson -->
      <div class="absolute-bottom box-text-choose-lesson" align="center" v-if="!isMobile">
        <div class="text-choose-lesson eng font-fredoka" data-text="Choose the lesson you want to learn :)">
          {{ `Choose the lesson you want to learn :)` }}
        </div>
        <div class="text-choose-lesson th font-mali-b" data-text="เลือกบทเรียนที่ต้องการเรียนรู้">
          {{ `เลือกบทเรียนที่ต้องการเรียนรู้` }}
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Tutorial -->
      <essay-lesson-tutorial v-if="isShowTutorial" :lessonIndex="selectedLessonIndex"></essay-lesson-tutorial>
      <!-- #endregion -->
    </div>
  </q-page>
</template>

<script setup>
import essayLessonTutorial from "src/components/essay_main/essay-lesson-tutorial.vue";
import backgroundMainNew from "src/components/background_main/background-main-new.vue";
import headerMain from "src/components/essay_main/header-bar.vue";
import { useEssayStore } from "src/stores/essay";
import { useSystemStore } from "src/stores/system";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";
import { useStudentStore } from "src/stores/student";

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const isMobile = ref($q.platform.is.mobile);

const systemStore = useSystemStore();
const studentStore = useStudentStore()
const essayStore = useEssayStore();

const settingHeader = ref({
  title:"Lesson",
})
const selectCardLesson = ref(0);
const boxCardEssayScroll = ref(null);
const cardList = ref([
]);
const isAtLeft = ref(true);
const isAtRight = ref(false);

const isShowTutorial = ref(false);
const selectedLessonIndex = ref(null)
const funcSelectCard = async (data,index) => {

  if(data.isLock) return

  if(isMobile.value && data.position != "center") return

  essayStore.setEssayName(data.name);

  selectedLessonIndex.value = index;

  isShowTutorial.value = true;
}

const show_card = computed(() => {

  let temp = [...essayStore.lessonList]

  return temp

})

const show_card_mobile = computed(() => {

  let temp = [...essayStore.lessonList]

  return temp
})

// Computed property สำหรับการ์ดที่แสดง (3 ใบ: ซ้าย, กลาง, ขวา)
const visibleCards = computed(() => {
  const cards = show_card_mobile.value;
  const currentIndex = selectCardLesson.value;
  const visibleCards = [];

  // การ์ดซ้าย
  if (currentIndex > 0) {
    visibleCards.push({
      ...cards[currentIndex - 1],
      originalIndex: currentIndex - 1,
      position: 'left'
    });
  } else if (cards.length > 1) {
    // ถ้าเป็นการ์ดแรก ให้แสดงการ์ดสุดท้ายทางซ้าย
    visibleCards.push({
      ...cards[cards.length - 1],
      originalIndex: cards.length - 1,
      position: 'left'
    });
  }

  // การ์ดกลาง (ปัจจุบัน)
  visibleCards.push({
    ...cards[currentIndex],
    originalIndex: currentIndex,
    position: 'center'
  });

  // การ์ดขวา
  if (currentIndex < cards.length - 1) {
    visibleCards.push({
      ...cards[currentIndex + 1],
      originalIndex: currentIndex + 1,
      position: 'right'
    });
  } else if (cards.length > 1) {
    // ถ้าเป็นการ์ดสุดท้าย ให้แสดงการ์ดแรกทางขวา
    visibleCards.push({
      ...cards[0],
      originalIndex: 0,
      position: 'right'
    });
  }

  return visibleCards;
});

// Functions สำหรับการเลื่อนการ์ด
const nextCard = () => {
  if (selectCardLesson.value < show_card_mobile.value.length - 1) {
    selectCardLesson.value++;
  } else {
    selectCardLesson.value = 0; // วนกลับไปการ์ดแรก
  }
};

const checkScrollPosition = () => {
  const el = boxCardEssayScroll.value;
  if (!el) return;

  const scrollLeft = el.scrollLeft;
  const scrollWidth = el.scrollWidth;
  const clientWidth = el.clientWidth;

  // ตรวจสอบว่าอยู่ซ้ายสุดหรือไม่ (มี tolerance เล็กน้อยเพื่อจัดการกับ floating point errors)
  isAtLeft.value = scrollLeft <= 1;

  // ตรวจสอบว่าอยู่ขวาสุดหรือไม่
  isAtRight.value = scrollLeft + clientWidth >= scrollWidth - 1;
};

const scrollCards = (direction) => {
  const el = boxCardEssayScroll.value;
  if (!el) return;
  const scrollAmount = el.clientWidth * 0.6;
  const left = direction === 'left' ? -scrollAmount : scrollAmount;
  el.scrollBy({ left, behavior: 'smooth' });

  // ตรวจสอบตำแหน่งหลังจาก scroll (ใช้ setTimeout เพื่อรอให้ scroll เสร็จ)
  setTimeout(() => {
    checkScrollPosition();
  }, 100);
};

const previousCard = () => {
  if (selectCardLesson.value > 0) {
    selectCardLesson.value--;
  } else {
    selectCardLesson.value = show_card_mobile.value.length - 1; // วนไปการ์ดสุดท้าย
  }
};


let listeners = null
onMounted(() => {

  systemStore.setRouter("essay_lesson");

  essayStore.setEssayName("lesson");

  let isDown = false;
  let startX;
  let scrollLeft;

  if(!isMobile.value){
    // ฟังก์ชัน Grabping สำหรับเลื่อนเมนู Card ซ้ายขวา (Drag to scroll)
    let el = document.getElementById('box-card-essay-scroll');

    if (el) {
      // ตรวจสอบตำแหน่งเริ่มต้น
      checkScrollPosition();

      // เพิ่ม event listener สำหรับ scroll event
      el.addEventListener('scroll', checkScrollPosition);

      // #region Mouse events
      el.addEventListener('mousedown', (e) => {
        isDown = true;
        el.classList.add('active');
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      });
      el.addEventListener('mouseleave', () => {
        isDown = false;
        el.classList.remove('active');
      });
      el.addEventListener('mouseup', () => {
        isDown = false;
        el.classList.remove('active');
        checkScrollPosition();
      });
      el.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 1.5; // scroll-fast
        el.scrollLeft = scrollLeft - walk;
        checkScrollPosition();
      });
      // #endregion
    }
  }

  if(isMobile.value){
      let el = document.getElementById("box-card-essay-mobile-scroll");

        // Touchstart: detect left/right swipe direction
        let touchStartX = 0;
        let touchEndX = 0;

        el.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches.length > 0) {
            touchStartX = e.touches[0].clientX;
          }
        });

        el.addEventListener('touchend', (e) => {
          if (e.changedTouches && e.changedTouches.length > 0) {
            touchEndX = e.changedTouches[0].clientX;
            const diffX = touchEndX - touchStartX;

            if (Math.abs(diffX) > 50) { // threshold for swipe
              if (diffX < 0) {
                // Swiped left (next card)
                nextCard();
              } else {
                // Swiped right (previous card)
                previousCard();
              }
            }
          }
        });
    }

})

onBeforeUnmount(() => {
  if(!isMobile.value){
    const el = document.getElementById('box-card-essay-scroll');
    if (el) {
      el.removeEventListener('scroll', checkScrollPosition);
    }
  }
})

</script>

<style lang="scss" scoped>
/* #region Box main */

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

.box-essay-main{
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
}

.box-card-essay-main{
  width:100%;
  height:62.8888%;

  & .box-card-essay-scroll{
    display: flex;
    align-content: center;
    align-items: center;
    width:100%;
    height:100%;
    padding:0px clamp(41.875px,4.1875cqw,67px) 0px;
    overflow-x:auto;
    gap: clamp(6.25px, 0.625cqw, 10px);

    &:active{
      cursor:grabbing;
    }

    &::-webkit-scrollbar{
      width:0px;
      height:0px;
    }

    & .box-card-item{
      width: clamp(221.875px, 22.1875cqw, 355px);
      flex-shrink: 0;
      cursor:pointer;

      &:active{
        cursor:grabbing;
      }

      &.disable{
        cursor:default;

        &:active{
          cursor:grabbing;
        }

        &::before{
          content: '';
          position: absolute;
          top:0px;
          left:0px;
          width:100%;
          height:100%;
          background-color: rgba(21, 21, 21, 0.5);
          border-radius: clamp(12.5px,1.25cqw,20px);
          z-index:1;
        }
      }
    }
  }

  & .button-arrow{
    width:clamp(66.875px,6.6875cqw,107px);
    top:50%;
    transform:translateY(-50%);
    cursor:pointer;

    &.left{
      left:clamp(10px,1cqw,16px);
    }

    &.right{
      right:clamp(10px,1cqw,16px);
    }
  }

}

.box-text-choose-lesson{
  bottom:clamp(27.5px,2.75cqw,44px);

  & .text-choose-lesson{
    position: relative;
    color:#000;
    text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;

    &.eng{
      font-size:clamp(25px,2.5cqw,40px);
      line-height:clamp(25px,2.5cqw,40px);
    }

    &.th{
      font-size:clamp(17.5px,1.75cqw,28px);
      line-height:clamp(17.5px,1.75cqw,28px);
      margin-top:clamp(18.75px,1.875cqw,30px);
    }

    &::before{
      content:attr(data-text);
      position:absolute;
      top:38%;
      left:50%;
      width:100%;
      height:100%;
      transform: translate(-50%,-50%);
      color:#fff;
      text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
    }
  }
}

.box-card-essay-mobile{
  top:20%;
  width:250px;
  left:50%;
  transform:translate(-50%,0%);
  transition: all 0.3s ease-in-out;
  z-index: 1;

  &.disable{
    cursor:default;

    &:active{
      cursor:grabbing;
    }

    &::before{
      content: '';
      position: absolute;
      top:0px;
      left:0px;
      width:100%;
      height:100%;
      background-color: rgba(21, 21, 21, 0.5);
      border-radius: clamp(12.5px,1.25cqw,20px);
      z-index:1;
    }
  }

  // การ์ดกลาง (ปัจจุบัน)
  &.active{
    left:50%;
    transform:translate(-50%,0%) scale(1);
    z-index: 3;
    opacity: 1;
  }

  // การ์ดซ้าย
  &.left{
    left:calc(50% - 255px);
    transform:translate(-50%,0%) scale(0.8);
    z-index: 2;
    // opacity: 0.7;
  }

  // การ์ดขวา
  &.right{
    left:calc(50% + 255px);
    transform:translate(-50%,0%) scale(0.8);
    z-index: 2;
    // opacity: 0.7;
  }

  // Hover effects
  &:hover{
    opacity: 0.9;
  }

  &.active:hover{
    opacity: 1;
  }
}

.button-arrow{
  width:70px;
  top:48%;
  transform:translateY(-50%);
  cursor:pointer;
  z-index:3;

  &.left{
    left:clamp(10px,1cqw,16px);
  }

  &.right{
    right:clamp(10px,1cqw,16px);
  }
}

.box-button-carousel-main{
  bottom:40px;

  & .button-carousel{
    width:20px;
    height:20px;
    background-color:#CDCACB;
    border-radius: 50%;
    margin:8px;
    border:2px solid #613c37;
    cursor:pointer;
    transition: all 0.2s ease-in-out;

    &.active{
      background-color:#f2c043;
    }

    &:hover{
      background-color:#f2c043;
    }
  }
}

// Navigation buttons
.box-nav-button{
  top:50%;
  transform:translateY(-50%);
  width:50px;
  height:50px;
  cursor:pointer;
  z-index: 10;
  transition: all 0.2s ease-in-out;

  &:hover{
    transform:translateY(-50%) scale(1.1);
  }

  &:active{
    transform:translateY(-50%) scale(0.95);
  }
}

/* #endregion */

// #region Box Label
.box-label-success{
  top:clamp(-15px, -0.9375cqw, -9.375px);
  right:clamp(6.25px,0.625cqw,10px);
  width:clamp(55.625px,5.5625cqw,89px);

  &.mobile{
    width:80px;
  }
}

.box-icon-lock{
  width:clamp(58.125px,5.8125cqw,93px);
  top:-5%;
  right:2%;
  transform:rotate(0deg);
  z-index:2;

  &.mobile{
    width:70px;
  }
}
// #endregion

</style>
