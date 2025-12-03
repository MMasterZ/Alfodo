<template>
  <div v-if="!isFinish">
    <div v-if="!isStart" class="absolute-center">
      <q-select
        label="ระดับชั้น"
        v-model="classroom"
        :options="['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6']"
      ></q-select>
      <div class="q-pt-md">
        <q-btn
          label="start placement test"
          @click="startPlacementTest()"
        ></q-btn>
      </div>
    </div>

    <!-- Placement test -->
    <div v-else class="absolute-center">
      <!-- <q-btn label="back" no-caps flat size="sm" @click="isStart = false" icon="fas fa-chevron-left"></q-btn> -->
      <div>Testing at Level {{ resultLevel }} - {{ resultLevel + 1 }}</div>
      <div>
        ข้อที่ {{ currentQuestion + 1 }})
        <span
          v-html="placementTestDisplay[currentQuestion].instructionEng"
        ></span>
      </div>

      <div
        v-html="placementTestDisplay[currentQuestion].question"
        class="text-center q-pt-lg"
        style="font-size: 20px"
      ></div>

      <!-- Choices -->
      <div class="q-pt-lg q-gutter-md">
        <div
          v-for="(choice, index) in placementTestDisplay[currentQuestion]
            .choices"
          class=""
        >
          <q-btn class="fit" no-caps @click="answer(index)">
            <span v-html="choice"></span>
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-h1">
    finish at {{ resultLevel }}
    <q-btn label="restart" @click="restartPlacementTest()"> </q-btn>
  </div>
</template>

<script>
import axios from "axios";
import { useQuasar } from "quasar";
import { ref, onMounted } from "vue";

export default {
  setup() {
    const placementData = ref([]);
    const isStart = ref(false);
    const currentQuestion = ref(0);
    const classroom = ref("ป.1");
    const $q = useQuasar();
    const placementTestDisplay = ref([]);
    const score = ref(0); // คะแนนแต่ละชุด
    const resultLevel = ref(1); //ผลลลัพธ์
    const vocabNumber = 6; //จำนวนข้อสอบ vocab ต่อชุด
    const grammarNumber = 6; //จำนวนข้อสอบ grammar ต่อชุด
    const criteria = 0.75; // คะแนนเกณฑ์ผ่าน

    const getPlacementTest = async () => {
      $q.loading.show();
      const url = process.env.NEWAPI + "placement-getPlacementNewPlacementTest";
      const res = await axios.get(url);
      placementData.value = res.data;
      $q.loading.hide();
    };
    const restartPlacementTest = () => {
      currentQuestion.value = 0;
      score.value = 0;
      isFinish.value = false;
      startPlacementTest();
    };
    const startPlacementTest = () => {
      let start = "1";
      let end = "2";
      if (
        classroom.value == "ป.1" ||
        classroom.value == "ป.2" ||
        classroom.value == "ป.3"
      ) {
        resultLevel.value = 1;
        start = "1";
        end = "2";
      } else {
        resultLevel.value = 3;
        start = "3";
        end = "4";
      }

      const filterQuestion = placementData.value.filter(
        (x) => x.level == start || x.level == end
      );
      const filterVocab = filterQuestion.filter((x) => x.skill == "Vocabulary");
      const filterGrammar = filterQuestion.filter((x) => x.skill == "Grammar");
      // get just 6 vocab
      const vocab = filterVocab.slice(0, vocabNumber);
      // get just 6 grammar
      const grammar = filterGrammar.slice(0, grammarNumber);
      // Merge 2 array
      const mergeArray = [...vocab, ...grammar];

      placementTestDisplay.value = mergeArray;

      isStart.value = true;
    };

    const answer = (index) => {
      if (
        index == placementTestDisplay.value[currentQuestion.value].correctIndex
      ) {
        score.value++;
      }
      checkScore();
    };

    const checkScore = () => {
      console.log("check score");
      let scoreAvg = score.value / placementTestDisplay.value.length;
      console.log("scoreAvg: ", scoreAvg);
      if (scoreAvg >= criteria) {
        getNextPlacementTest();
      } else {
        nextQuestion();
      }
    };

    const nextQuestion = () => {
      console.log("next");
      if (currentQuestion.value < placementTestDisplay.value.length - 1) {
        currentQuestion.value++;
      } else {
        checkFinalScore();
      }
    };
    const isFinish = ref(false);
    const checkFinalScore = () => {
      console.log("check final");
      let scoreAvg = score.value / placementTestDisplay.value.length;
      if (scoreAvg >= criteria) {
        getNextPlacementTest();
      } else {
        console.log("finish at" + resultLevel.value);
        isStart.value = false;
        isFinish.value = true;
      }
    };

    const getNextPlacementTest = () => {
      console.log("get new");
      score.value = 0;
      currentQuestion.value = 0;
      resultLevel.value += 2;

      const start = resultLevel.value.toString();
      const end = (resultLevel.value + 1).toString();

      const filterQuestion = placementData.value.filter(
        (x) => x.level == start || x.level == end
      );

      const filterVocab = filterQuestion.filter((x) => x.skill == "Vocabulary");
      const filterGrammar = filterQuestion.filter((x) => x.skill == "Grammar");
      const vocab = filterVocab.slice(0, vocabNumber);
      const grammar = filterGrammar.slice(0, grammarNumber);
      const mergeArray = [...vocab, ...grammar];
      placementTestDisplay.value = mergeArray;
    };

    onMounted(() => {
      getPlacementTest();
    });

    return {
      placementData,
      isStart,
      startPlacementTest,
      currentQuestion,
      answer,
      placementTestDisplay,
      score,
      resultLevel,
      isFinish,
      restartPlacementTest,
      classroom,
    };
  },
};
</script>

<style lang="scss" scoped></style>
