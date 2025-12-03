<template>
  <q-page class="row justify-center items-center background-landing">
    <div class="col-1 width-fit self-center" align="center">
      <logo-winner></logo-winner>

      <div align="center" class="q-pa-md">
        <div class="text-white q-pa-md tips-background">
          <span class="f20">{{ `Tips: ${tips}` }}</span>
        </div>
      </div>
      <!-- <div align="center" class="f30 text-white text-bold">
        <span>Loading</span>
        <span class="animation-dots" style="animation-delay: 0s">.</span>
        <span class="animation-dots" style="animation-delay: 0.15s">.</span>
        <span class="animation-dots" style="animation-delay: 0.3s">.</span>
      </div> -->
    </div>
  </q-page>
</template>

<script>
import logoWinner from "components/logo-login.vue";

import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    logoWinner,
  },
  props: {
    systemStore: {
      default: () => {},
    },
    practiceStore: {
      default: () => {},
    },
  },
  setup(props) {
    const router = useRouter();

    const tips = computed(() => {
      let temp = [
        "หมั่นทำแบบฝึกหัดกันนะ เพื่อสะสมความรู้และสะสมเหรียญ",
        "หมั่นทำแบบฝึกหัดทบทวนความรู้กันนะ ยิ่งทำเยอะยิ่งได้เหรียญเยอะ",
        "แต่ละบทเรียนสามารถเข้ามาทำได้สูงสุดบทเรียนล่ะ 50 เหรียญต่อวัน",
        "ขยันทำทุกแบบฝึกหัดทุกวันจะมีเหรียญซื้อชุดใหม่ไปขิงเพื่อนได้ทุกวัน",
        "ขยันทำทุกแบบฝึกหัดทุกวันจะมีเหรียญซื้อชุดใหม่ๆได้ทุกวัน",
        "ยิ่งเรียนเยอะ ยิ่งได้ดาวเยอะ",
        "ยิ่งมีดาวเยอะ ยิ่งมีโอกาสเป็นที่ 1",
        "ดูคำแนะนำการฝึกฝน ได้ที่หน้าโปรไฟล์",
        "อ่านจดหมายเพื่อรับสารข่าวใหม่ๆ",
        "จะมีชุด collection ใหม่ๆในเทศกาลต่างๆ สะสมเหรียญรอได้เลย",
        "ขยันทำแบบฝึกหัดสะสมดาวเยอะๆเพื่อไต่อันดับ",
        "ฝึกการออกเสียงได้ที่เมืองใต้น้ำ",
        "แบบฝึกหัดเลือกตอบ สามารถนำเมาส์ชี้คำในโจทย์จะมีคำแปลให้ด้วยนะ",
        "ทำแบบฝึกหัดซ้ำ ระบบจะเลือกคะแนนที่ดีที่สุด",
      ];

      temp = temp[Math.floor(Math.random() * temp.length)];

      return temp;
    });

    onMounted(() => {
      if (props.practiceStore.nextPractice != null) {
        let path = props.systemStore.callbackPathRouterPractice(
          props.practiceStore.nextPractice
        );
        props.practiceStore.setPracticeData(props.practiceStore.nextPractice);

        setTimeout(() => {
          router.replace(path);
        }, 2000);
      } else {
        setTimeout(() => {
          router.replace("/practice/unit");
        }, 2000);
      }
    });

    return { tips };
  },
};
</script>

<style lang="scss" scoped>
.background-landing {
  background-image: url("/images/background_main/background-practice-list-2.png");
}

.tips-background {
  background-color: #ba8d54;
  border-radius: 5px;
  // box-shadow: 0px 0px 7px 2px rgba(128, 128, 128, 0.5);
}

.animation-dots {
  animation: fadeDots 0.5s linear infinite;
}

@keyframes fadeDots {
  to {
    opacity: 0;
  }
}
</style>
