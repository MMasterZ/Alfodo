<template>
  <div class="fit">
    <!-- #region Desktop -->
    <div v-if="isDesktop" class="fit"></div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="row absolute-center fit" v-if="$q.platform.is.mobile"></div>
    <!-- #endregion -->
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";

export default {
  setup(props) {
    // Initialize Router
    // const $store = useStore();
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);
    const practiceStore = usePracticeStore();
    const router = useRouter();

    const worldList = ref([
      {
        name: "Vocabulary",
        nameImage: "vocabulary",
        position: `top: 6%; left: 9%;`,
      },
      {
        name: "Grammar",
        nameImage: "grammar",
        position: `top: 9%; left: 40.3%;`,
      },
      {
        name: "Reading",
        nameImage: "reading",
        position: `top: 9.3%; left: 70.5%;`,
      },
      {
        name: "Writing",
        nameImage: "writing",
        position: `top: 52%; left: 7.8%;`,
      },
      {
        name: "Phonics",
        nameImage: "phonics",
        position: `top: 50%; left: 39.3%;`,
      },
      {
        name: "Listening",
        nameImage: "listening",
        position: `top: 52.5%; left: 70.5%;`,
      },
    ]);

    const nextPractice = computed(() => {
      let findIndex = worldList.value.map((x) => x.name).indexOf(practiceStore.skill);

      let nextWorld = "";
      if (findIndex + 1 === worldList.value.length) {
        nextWorld = worldList.value[0].name;
      } else {
        nextWorld = worldList.value[findIndex + 1].name;
      }

      return nextWorld;
    });

    const backPractice = computed(() => {
      let findIndex = worldList.value.map((x) => x.name).indexOf(practiceStore.skill);

      let backWorld = "";
      if (findIndex === 0) {
        backWorld = worldList.value[worldList.value.length - 1].name;
      } else {
        backWorld = worldList.value[findIndex - 1].name;
      }

      return backWorld;
    });

    const funcShowTotalLearningPractice = (skill) => {
      const studentStore = useStudentStore();
      let setSkill = skill == "Listening" ? "Listening & Speaking" : skill;

      let findPracticeInSkill = practiceStore.list.filter(
        (x) => x.unit == practiceStore.unit && x.skill == setSkill
      );

      let total = 0;

      for (let i = 0; i < findPracticeInSkill.length; i++) {
        let practice = findPracticeInSkill[i];
        let findPracticeInLog = practiceStore.log.find(
          (x) => x.practiceListId == practice.id
        );

        if (findPracticeInLog) {
          if (
            findPracticeInLog.practiceType == "flashcard" ||
            findPracticeInLog.practiceType == "grammarlesson" ||
            findPracticeInLog.practiceType == "phonicslesson" ||
            findPracticeInLog.practiceType == "languagetips" ||
            findPracticeInLog.practiceType == "conversationlesson"
          ) {
            total++;
          } else {
            if (studentStore.studentType == "online") {
              if (findPracticeInLog.star != 0) {
                total++;
              }
            } else {
              if (findPracticeInLog.counter != 0) {
                total++;
              }
            }
          }
        }
      }

      return total;
    };

    const funcShowTotalPractice = (skill) => {
      let setSkill = skill == "Listening" ? "Listening & Speaking" : skill;

      let total = practiceStore.list.filter(
        (x) => x.unit == practiceStore.unit && x.skill == setSkill
      ).length;

      return total || 0;
    };

    const funcChangeWorld = (name) => {
      const practiceStore = usePracticeStore();
      practiceStore.setPracticeSkill(name);
      practiceSkill.value = name;
    };

    return {
      practiceStore,
      practiceSkill,
      worldList,

      nextPractice,
      backPractice,

      isDesktop,

      // Function
      funcGotoSkill,
      funcShowTotalPractice,
      funcShowTotalLearningPractice,
      funcChangeWorld,
      handleSwipe,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-menu-main-mobile {
  position: relative;
  max-width: 1000px;
  width: 100%;
  overflow: auto;
  margin: auto;
}

.box-total-practice {
  top: -45%;
  width: fit-content;
  margin: auto;
  border: 2px solid #804208;
  border-radius: 21.27px;
  background-color: #00b2ff;
  text-shadow: rgb(0, 0, 0) 2px 0px 0px, rgb(0, 0, 0) 1.75517px 0.958851px 0px,
    rgb(0, 0, 0) 1.0806px 1.68294px 0px, rgb(0, 0, 0) 0.141474px 1.99499px 0px,
    rgb(0, 0, 0) -0.832294px 1.81859px 0px, rgb(0, 0, 0) -1.60229px 1.19694px 0px,
    rgb(0, 0, 0) -1.97998px 0.28224px 0px, rgb(0, 0, 0) -1.87291px -0.701566px 0px,
    rgb(0, 0, 0) -1.30729px -1.5136px 0px, rgb(0, 0, 0) -0.421592px -1.95506px 0px,
    rgb(0, 0, 0) 0.567324px -1.91785px 0px, rgb(0, 0, 0) 1.41734px -1.41108px 0px,
    rgb(0, 0, 0) 1.92034px -0.558831px 0px;
  z-index: 2;
  font-size: clamp(12px, 1.125vw, 18px);
  padding: 1% 10%;
  text-align: center;
}

.box-total-practice.mobile {
  font-size: 18px;
}

.box-total-practice::after {
  content: " ";
  position: absolute;
  top: 5px;
  left: 3px;
  width: fit-content;
  background-color: #fff;
  transform: rotate(-45deg);
  border-radius: 15px 15px 5px 5px;
  opacity: 0.5;
  padding: 1% 10%;
}

.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}
</style>
