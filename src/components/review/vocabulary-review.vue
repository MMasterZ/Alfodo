<template>
  <q-page style="background-color: #aef0ff">
    <div
      class="relative-position row justify-center items-center"
      :class="
        !isStartReview
          ? $q.platform.is.desktop
            ? 'bg-review-pc'
            : 'bg-review-mobile'
          : ''
      "
    >
      <div class="absolute-top-left q-pa-md" v-if="!isStartReview">
        <q-btn round push @click="$router.replace('/lobby')">
          <q-img width="100%" src="/images/btn-back-list.png"></q-img>
        </q-btn>
      </div>

      <div class="col-12" align="center" v-if="!isStartReview">
        <div>
          <div
            clas
            :class="
              $q.platform.is.desktop ? 'q-pb-xl q-mb-xl q-pt-md' : 'q-pt-md'
            "
          >
            <div>
              <span
                class="text-title-stroke text-white"
                :style="
                  $q.platform.is.desktop ? 'font-size: 70px' : 'font-size: 45px'
                "
              >
                พิกกี้
              </span>
            </div>
            <div>
              <span
                class="text-title-stroke text-amber-4"
                :style="
                  $q.platform.is.desktop ? 'font-size: 90px' : 'font-size: 55px'
                "
                >คอยน์</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="col-12" v-if="!isStartReview">
        <div
          align="center"
          :class="$q.platform.is.desktop ? 'q-my-xl q-py-xl' : ' self-end'"
        >
          <div>
            <q-btn
              rounded
              :style="$q.platform.is.desktop ? 'width:250px;' : 'width:200px'"
              style="border-radius: 50px"
              padding="5"
              class="bg-white"
              dense
              push
              @click="funcStartLearning()"
            >
              <q-img
                width="100%"
                src="/images/review/btn-start-vocabulary-review.png"
              ></q-img>
            </q-btn>
          </div>

          <div
            :class="
              $q.platform.is.desktop ? 'q-pa-md q-mb-xl q-mt-sm' : 'q-mt-md'
            "
            align="center"
            class=""
          >
            <q-btn round padding="0" flat @click="isDialogRanking = true">
              <q-img
                :width="$q.platform.is.desktop ? '60px' : '50px'"
                src="/images/review/btn-vocabulary-review-ranking.png"
              ></q-img>
            </q-btn>
            <q-btn
              round
              padding="0"
              flat
              class="q-mx-md"
              @click="isDialogHelp = true"
            >
              <q-img
                :width="$q.platform.is.desktop ? '60px' : '50px'"
                src="/images/review/btn-vocabulary-review-info.png"
              ></q-img>
            </q-btn>
            <q-btn round padding="0" flat @click="isDialogSetting = true">
              <q-img
                :width="$q.platform.is.desktop ? '60px' : '50px'"
                src="/images/review/btn-vocabulary-review-setting.png"
              ></q-img>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="col-12" v-if="isStartReview">
        <pig-game-pc
          v-if="$q.platform.is.desktop"
          :practiceData="practiceData"
          @callback-finish="funcSumTotalCoin()"
          @callback-nextquestion="funcSumTotalScore()"
          @callback-dialogsetting="isDialogSetting = true"
          @callback-dialogpigscore="isDialogPigScore = true"
        ></pig-game-pc>
        <pig-game-mobile
          v-if="$q.platform.is.mobile"
          :practiceData="practiceData"
          @callback-finish="funcSumTotalCoin()"
          @callback-nextquestion="funcSumTotalScore()"
          @callback-dialogsetting="isDialogSetting = true"
          @callback-dialogpigscore="isDialogPigScore = true"
        ></pig-game-mobile>
      </div>
    </div>

    <!-- Dialog ----- Start -->
    <!-- Dialog Setting -->
    <q-dialog maximized v-model="isDialogSetting">
      <q-card class="shadow-0 transparent">
        <q-card-section class="fit row justify-center items-center">
          <div class="relative-position box-dialog q-pa-md">
            <div class="absolute-top-right" style="top: -15px; right: -15px">
              <q-btn round push class="bg-red" size="18px" dense v-close-popup>
                <q-icon
                  name="fas fa-times"
                  size="26px"
                  class="text-white"
                ></q-icon>
              </q-btn>
            </div>
            <div
              class="box-dialog-content q-pa-md row justify-center items-center"
            >
              <div class="col-12 row">
                <div class="col-12 row">
                  <div class="col self-center row text-brown-8">
                    <q-icon name="fas fa-volume-up" size="27px"></q-icon>
                    <span class="self-center q-ml-md f18">เสียงประกอบ</span>
                  </div>
                  <div class="self-center" align="right">
                    <q-toggle
                      v-model="isSoundEffect"
                      :color="isSoundEffect ? 'green' : 'grey'"
                      keep-color
                      @click="funcPlayEffect()"
                    />
                  </div>
                </div>
                <div class="col-12 row">
                  <div class="col self-center row text-brown-8">
                    <q-icon name="fas fa-music" size="27px"></q-icon>
                    <span class="self-center q-ml-md f18">เพลง</span>
                  </div>
                  <div class="self-center" align="right">
                    <q-toggle
                      v-model="isSoundBackground"
                      :color="isSoundBackground ? 'green' : 'grey'"
                      keep-color
                      @click="funcPlayBackground()"
                    />
                  </div>
                </div>
                <div class="col-12 q-pt-lg">
                  <div align="center">
                    <q-btn
                      style="width: 200px"
                      label="กลับหน้าหลัก"
                      class="bg-amber f16"
                      @click="$router.replace('/lobby')"
                      push
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Finish -->
    <q-dialog maximized v-model="practiceData.isFinishReview" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center q-pa-md">
          <div class="" style="max-width: 350px; width: 100%">
            <div class="relative-position">
              <animation-star-top
                style="padding-bottom: 60px"
              ></animation-star-top>
            </div>
            <div class="relative-position box-dialog-finish q-pa-md">
              <div
                align="center"
                class="absolute-top q-pa-sm"
                style="top: -135px"
              >
                <q-img
                  fit="contain"
                  src="/images/review/label-finish-review.png"
                ></q-img>
              </div>
              <div class="q-mt-lg">
                <div align="center">
                  <span
                    :class="$q.platform.is.desktop ? 'f26' : 'f22'"
                    class="text-stoke-brown text-bold text-white"
                    >คะแนน</span
                  >
                </div>
                <div align="center" class="q-pa-sm">
                  <span
                    class="text-stoke-white text-bold text-brown-8"
                    :style="
                      $q.platform.is.desktop
                        ? 'font-size: 64px'
                        : 'font-size: 40px'
                    "
                    >{{ practiceData.score }}</span
                  >
                </div>

                <div
                  align="center"
                  class="q-pa-sm"
                  v-if="practiceData.oldScore > 0"
                >
                  <div class="f16 text-white text-bold text-stoke-brown-small">
                    คะแนนสูงสุดที่ทำได้
                  </div>
                  <div
                    class="relative-position q-my-sm f24 text-white text-bold text-stoke-brown-small"
                  >
                    0
                  </div>
                </div>

                <div
                  class="row box-finish-sumary"
                  :class="
                    $q.platform.is.desktop ? 'q-pa-md' : 'q-px-md q-py-xs'
                  "
                >
                  <div class="self-center">
                    <q-img
                      src="/images/coin.png"
                      :width="$q.platform.is.desktop ? '50px' : '40px'"
                    ></q-img>
                  </div>
                  <div class="col relative-position self-center" align="right">
                    <span
                      class="text-white text-bold"
                      :style="
                        $q.platform.is.desktop
                          ? 'font-size: 46px'
                          : 'font-size: 36px'
                      "
                      >{{ practiceData.totalCoin }}</span
                    >
                    <span
                      v-if="practiceData.redPig > 0"
                      :style="
                        practiceData.goldPig > 0
                          ? 'animation-delay:7s;'
                          : practiceData.bluePig > 0
                          ? 'animation-delay:4s;'
                          : practiceData.redPig > 0
                          ? 'animation-delay:2.5s;'
                          : ''
                      "
                      class="absolute text-stoke-white-small text-green text-bold q-mx-sm animation-add-points"
                      style="
                        top: 50%;
                        transform: translate(0%, -50%);
                        font-size: 30px;
                      "
                    >
                      <span class="">{{ `+${practiceData.coin}` }}</span>
                    </span>
                    <div
                      class="absolute-top-right animation-pig"
                      style="animation-delay: 0.5s"
                      v-if="practiceData.redPig > 0"
                    >
                      <q-img
                        src="/images/review/pig-red.png"
                        width="60px"
                        fit="contain"
                      ></q-img>
                      <span
                        class="absolute-bottom-left text-stoke-white-small text-brown-8 text-bold"
                        style="bottom: -10px; left: 18px; font-size: 30px"
                      >
                        {{ `x${practiceData.redPig}` }}
                      </span>
                    </div>

                    <!-- Blue Pig Total Coin -->
                    <div
                      class="absolute-top-right animation-pig"
                      style="animation-delay: 2.5s"
                      v-if="practiceData.bluePig > 0"
                    >
                      <q-img
                        src="/images/review/pig-blue.png"
                        width="60px"
                        fit="contain"
                      ></q-img>
                      <span
                        class="absolute-bottom-left text-stoke-white-small text-brown-8 text-bold"
                        style="bottom: -10px; left: 18px; font-size: 30px"
                      >
                        {{ `x${practiceData.bluePig}` }}
                      </span>
                    </div>

                    <!-- Gold Pig Total Coin -->
                    <div
                      class="absolute-top-right animation-pig"
                      style="animation-delay: 4.7s"
                      v-if="practiceData.goldPig > 0"
                    >
                      <q-img
                        src="/images/review/pig-gold.png"
                        width="60px"
                        fit="contain"
                      ></q-img>
                      <span
                        class="absolute-bottom-left text-stoke-white-small text-brown-8 text-bold"
                        style="bottom: -10px; left: 18px; font-size: 30px"
                      >
                        {{ `x${practiceData.goldPig}` }}
                      </span>
                    </div>
                  </div>
                  <div class="col-1 self-center" style="width: 50px"></div>
                </div>

                <div
                  class="relative-position"
                  :class="$q.platform.is.desktop ? 'q-py-lg' : 'q-py-md'"
                >
                  <div
                    class="row justify-around absolute-bottom"
                    style="bottom: -60px"
                    align="center"
                  >
                    <q-btn
                      :size="$q.platform.is.desktop ? '30px' : '25px'"
                      round
                      class="bg-white"
                      push
                      @click="funcStartLearning()"
                    >
                      <q-img
                        :width="$q.platform.is.desktop ? '80px' : '60px'"
                        src="/images/review/btn-restart-review.png"
                      ></q-img>
                    </q-btn>
                    <q-btn
                      :size="$q.platform.is.desktop ? '30px' : '25px'"
                      round
                      class="bg-white"
                      push
                      @click="$router.replace('/lobby')"
                    >
                      <q-img
                        :width="$q.platform.is.desktop ? '80px' : '60px'"
                        src="/images/review/btn-back-to-home.png"
                      ></q-img>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <animation-star-bottom></animation-star-bottom>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Pig Score -->
    <q-dialog maximized v-model="isDialogPigScore" persistent>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center q-pa-md">
          <div class="relative-position box-dialog-show-pig q-pa-md">
            <div class="absolute-top-right" style="top: -12px; right: -12px">
              <q-btn round class="bg-red text-white" push v-close-popup>
                <q-icon name="fas fa-times"></q-icon>
              </q-btn>
            </div>
            <div class="box-dialog-sohw-pig-content q-pa-md">
              <div
                class="q-pa-md"
                style="background-color: #a36532; border-radius: 50px"
                align="center"
              >
                <span class="f26 text-stoke">{{
                  `จำนวนหมู : ${practiceData.totalPig}`
                }}</span>
              </div>
              <div class="q-pa-md text-stoke">
                <div class="q-py-sm row">
                  <div class="col">
                    <q-img
                      width="70px"
                      src="/images/review/pig-red.png"
                    ></q-img>
                  </div>
                  <div class="col self-center" align="right">
                    <span class="f26">{{
                      `มี ${practiceData.redPig} ตัว`
                    }}</span>
                  </div>
                </div>
                <div class="q-py-sm row">
                  <div class="col">
                    <q-img
                      width="70px"
                      src="/images/review/pig-blue.png"
                    ></q-img>
                  </div>
                  <div class="col self-center" align="right">
                    <span class="f26">{{
                      `มี ${practiceData.bluePig} ตัว`
                    }}</span>
                  </div>
                </div>
                <div class="q-py-sm row">
                  <div class="col">
                    <q-img
                      width="70px"
                      src="/images/review/pig-gold.png"
                    ></q-img>
                  </div>
                  <div class="col self-center" align="right">
                    <span class="f26">{{
                      `มี ${practiceData.goldPig} ตัว`
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Ranking -->
    <q-dialog
      maximized
      v-model="isDialogRanking"
      no-esc-dismiss
      data-cy="dialog-ranking"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center q-pa-md">
          <div class="relative-position box-container-ranking">
            <div class="relative-position">
              <div class="icon-dialog q-px-md q-pt-sm q-mb-md">
                <q-img
                  class="q-mb-md"
                  width="300px"
                  src="images/review/logo-ranking-review-pig.png"
                ></q-img>
              </div>
              <div class="q-px-sm q-pt-md" align="center">
                <div class="q-pl-md q-pr-md">
                  <div
                    class="row q-pr-sm box-ranking-list"
                    style="
                      background-color: #f1d280;
                      border: 5px solid#f1d280;
                      border-radius: 7px;
                    "
                  >
                    <div
                      class="col-12 q-py-xs"
                      style="background-color: #f1d280"
                    >
                      <div class="q-py-xs" v-for="i in 3">
                        <div
                          class="q-pa-xs row shadow-1"
                          style="border-radius: 5px; background-color: #c55bff"
                          align="left"
                        >
                          <div
                            class="relative-position"
                            style="width: 40px; height: 40px"
                            align="center"
                          >
                            <span class="absolute-center text-border f18">
                              <q-img
                                width="45px"
                                :src="`/images/lobby/ranking-${i}.png`"
                              ></q-img>
                            </span>
                          </div>
                          <div class="col self-center q-px-sm text-white">
                            {{ `Name Surname` }}
                          </div>
                          <div
                            class="col-2 self-center text-white"
                            align="center"
                            style="width: 60px"
                          >
                            {{ `150` }}
                          </div>
                        </div>
                      </div>
                      <div v-for="(item, index) in 20" :key="index">
                        <div
                          v-if="index >= 3"
                          class="fit q-pa-xs row q-mb-sm q-mt-xs"
                          style="border-radius: 5px; background-color: #e28701"
                          align="left"
                        >
                          <div
                            class="relative-position"
                            style="width: 40px; height: 40px"
                            align="center"
                          >
                            <span class="absolute-center text-border f18">
                              {{ index + 1 }}
                            </span>
                          </div>
                          <div class="col self-center q-px-sm text-white">
                            {{ "xxx" }}
                          </div>
                          <div
                            class="col-2 self-center text-white"
                            align="center"
                            style="width: 60px"
                          >
                            {{ 0 }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row q-mt-md justify-center q-px-md">
                  <div
                    class="col-12 row"
                    style="
                      border-radius: 5px;
                      background-color: #f1d280;
                      border: 2px dashed #a46100;
                    "
                    align="left"
                  >
                    <!-- <div
                      class="relative-position"
                      style="width: 50px; height: 40px"
                      align="center"
                    >
                      <span
                        class="absolute-center text-border f18"
                        v-if="
                          rankingSelected == 'school'
                            ? ranking.current.position >= 1 &&
                              ranking.current.position <= 3
                            : ranking.rankingInClass >= 1 && ranking.rankingInClass <= 3
                        "
                      >
                        <q-img
                          width="40px"
                          :src="
                            `/images/lobby/ranking-${
                              rankingSelected == 'school'
                                ? ranking.current.position
                                : ranking.rankingInClass
                            }.png`
                          "
                        ></q-img>
                      </span>
                      <span class="absolute-center text-border f18" v-else>
                        {{
                          rankingSelected == "school"
                            ? ranking.current.position
                            : ranking.rankingInClass
                        }}
                      </span>
                    </div> -->

                    <div class="col self-center q-pa-sm">
                      <span class="text-bold" style="color: #653d03">{{
                        studentInfo.character.name
                      }}</span>
                    </div>
                    <div
                      class="col-2 self-center text-bold"
                      align="center"
                      style="width: 50px; color: #653d03"
                    >
                      0
                      <!-- {{ ranking.current.star }} -->
                    </div>
                  </div>
                </div>
              </div>

              <div align="center" class="q-pa-md">
                <q-btn
                  style="width: 100%; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Help -->
    <q-dialog maximized v-model="isDialogHelp">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center q-pa-md">
          <div class="relative-position box-dialog q-pa-md">
            <div class="absolute-top-right" style="top: -15px; right: -15px">
              <q-btn round class="bg-red text-white" v-close-popup
                ><q-icon name="fas fa-times"></q-icon
              ></q-btn>
            </div>
            <div class="box-header-help q-pa-sm" align="center">
              <span class="text-white f20">วิธีเล่น</span>
            </div>
            <div class="q-mt-sm" style="min-height: 200px">
              <q-img
                :src="`/images/review/review-vocab-help-${nextHelp}.png`"
              ></q-img>
            </div>
            <div class="row q-mt-sm">
              <div class="col-1" style="width: 50px" align="left">
                <q-img
                  class="cursor-pointer"
                  @click="nextHelp == 1 ? null : nextHelp--"
                  src="/images/review/arrow-help-left.png"
                  width="30px"
                ></q-img>
              </div>
              <div class="col self-center" align="center">
                <span class="f20 text-white">
                  {{ `หน้าที่ ${nextHelp}` }}
                </span>
              </div>
              <div class="col-1" style="width: 50px" align="right">
                <q-img
                  class="cursor-pointer"
                  @click="nextHelp == 3 ? null : nextHelp++"
                  src="/images/review/arrow-help-right.png"
                  width="30px"
                ></q-img>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!-- Dialog ----- End -->

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import practiceHooks from "../../hooks/practiceHooks";
import studentHooks from "../../hooks/gameHooks";
import pigGamePc from "../minigame/pig-game-pc";
import pigGameMobile from "../minigame/pig-game-mobile";
import loading from "../dialog-loading.vue";
import animationStarTop from "../finishPractice/animation-star-top.vue";
import animationStarBottom from "../finishPractice/animation-star-bottom.vue";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { auth, playSoundBackground } from "src/router";
import axios from "axios";
import { useQuasar } from "quasar";
export default {
  components: {
    pigGamePc,
    pigGameMobile,
    loading,

    // Finish Star
    animationStarTop,
    animationStarBottom,
  },
  setup(props) {
    // Intital Data
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const isStartReview = ref(false);
    const isShowLoading = ref(false);
    const isDialogSetting = ref(false);
    const isDialogPigScore = ref(false);
    const isDialogRanking = ref(false);
    const isDialogHelp = ref(false);
    const isSoundEffect = ref(false);
    const isSoundBackground = ref(false);
    const nextStep = ref(1);
    const nextHelp = ref(1);

    const rankingList = ref([]);

    let getStudentInfo;
    const studentInfo = ref("");
    const getStudentInfoData = async (uid) => {
      isShowLoading.value = true;

      getStudentInfo = await studentHooks.studentInfomation(uid);

      let getCourse = await studentHooks.courseInfomation(
        getStudentInfo.currentCourseId
      );

      getStudentInfo.courseLevel = getCourse.level;

      studentInfo.value = getStudentInfo;

      isShowLoading.value = false;
    };

    let tempPracticeList = [];
    let tempPracticeLog = [];

    const questionList = ref([]);
    const currentQuestion = ref(0);
    const practiceData = ref({
      question: "",
      answers: [],
      correctAnswer: "",
      count: 0,
      oldScore: 0,
      score: 0,
      coin: 0,
      totalCoin: 0,
      totalPig: 0,
      redPig: 0,
      bluePig: 0,
      goldPig: 0,
      time: 60,
      isFinishReview: false,
      isSendAnswer: false,
    });

    let answerList = [];
    let countFlashcard = 0;
    const funcLoadPractice = async () => {
      tempPracticeList = await practiceHooks
        .practice(getStudentInfo.level)
        .practiceList();

      // Get Practice List
      tempPracticeLog = await practiceHooks
        .practice(getStudentInfo.courseLevel)
        .log();

      let getPracticeInType = tempPracticeLog.filter(
        (x) => x.practiceType == route.params.type
      );

      countFlashcard = getPracticeInType.length;

      let tempPracticeData = [];

      for (let i = 0; i < getPracticeInType.length; i++) {
        let apiUrl = `${process.env.NEWAPI_ASIA}/practice-getPracticeData`;
        let postData = {
          practiceListId: getPracticeInType[i].practiceListId,
          requestURL: window.location.hash,
        };
        let response = await axios.post(apiUrl, postData);

        tempPracticeData.push(...response.data);
      }

      tempPracticeData.sort((a, b) => Math.random() - 0.5);

      answerList = tempPracticeData.map((x) => {
        return { vocab: x.vocab, meaning: x.meaning };
      });

      tempPracticeData = tempPracticeData.map((x, index) => {
        return {
          vocab: x.vocab,
          meaning: x.meaning,
          correctAnswer: null,
          answers: [],
          count: 0,
          index: index,
        };
      });

      questionList.value = tempPracticeData;

      practiceData.value.score = 0;
      practiceData.value.coin = 0;
      practiceData.value.totalCoin = 0;
      practiceData.value.totalPig = 0;
      practiceData.value.redPig = 0;
      practiceData.value.bluePig = 0;
      practiceData.value.goldPig = 0;
      practiceData.value.time = 30;
      practiceData.value.isFinishReview = false;
      practiceData.value.isSendAnswer = false;

      totalPig = 0;

      funcNextQuestion();
    };

    const funcSumTotalScore = () => {
      practiceData.value.score += 1;

      questionList.value.forEach((res) => {
        if (res.index == currentQuestion.value) {
          res.count++;
        }
      });

      let checkEveryCount = questionList.value.every((x) => x.count == 2);

      if (checkEveryCount) {
        practiceData.value.isFinishReview = true;
        return;
      }

      setTimeout(() => {
        funcNextQuestion();
      }, 500);
    };

    let totalPig = 0;
    const funcNextQuestion = () => {
      practiceData.value.isSendAnswer = false;

      let tempQuestion = questionList.value.filter((x) => x.count < 2);
      let setMode = 1;

      if (practiceData.value.score >= 6) {
        setMode = Math.floor(Math.random() * 2 + 1);
      }

      let setQuestionIndex = tempQuestion.map((x) => x.index);

      let randomQuestion =
        setQuestionIndex[Math.floor(Math.random() * setQuestionIndex.length)];

      currentQuestion.value = randomQuestion;

      tempQuestion = tempQuestion.filter((x) => x.index == randomQuestion);

      if (tempQuestion.length) {
        let newAnswer = [
          {
            answer:
              setMode % 2 == 1
                ? tempQuestion[0].vocab
                : tempQuestion[0].meaning,
            text:
              setMode % 2 == 1
                ? tempQuestion[0].meaning
                : tempQuestion[0].vocab,
            isAnswer: true,
          },
        ];

        let tempAnswer = [...answerList];

        let findIndex = [];
        if (setMode % 2 == 1) {
          findIndex = tempAnswer
            .map((x) => x.meaning)
            .indexOf(tempQuestion[0].meaning);
        } else {
          findIndex = tempAnswer
            .map((x) => x.vocab)
            .indexOf(tempQuestion[0].vocab);
        }

        tempAnswer.splice(findIndex, 1);

        tempAnswer.sort(() => Math.random() - 0.5);

        newAnswer.push({
          answer:
            setMode % 2 == 1 ? tempAnswer[0].vocab : tempAnswer[0].meaning,
          text: setMode % 2 == 1 ? tempAnswer[0].meaning : tempAnswer[0].vocab,
          isAnswer: false,
        });

        newAnswer.sort(() => Math.random() - 0.5);

        if (practiceData.value.score != 0) {
          if (practiceData.value.score % 20 == 0) {
            practiceData.value.goldPig++;
          } else if (practiceData.value.score % 6 == 0) {
            practiceData.value.bluePig++;
          } else if (practiceData.value.score % 2 == 0) {
            practiceData.value.redPig++;
          }
        }

        practiceData.value.question =
          setMode % 2 == 1 ? tempQuestion[0].vocab : tempQuestion[0].meaning;
        practiceData.value.answers = newAnswer;
        practiceData.value.count = tempQuestion[0].count;

        totalPig =
          practiceData.value.redPig +
          practiceData.value.bluePig +
          practiceData.value.goldPig;

        practiceData.value.totalPig = totalPig;

        if (practiceData.value.score != 0) {
          if (practiceData.value.time <= 3) {
            return;
          } else {
            if (practiceData.value.score % 5 == 0) {
              practiceData.value.time -= 3;
            }
          }
        }
      }
    };

    const funcStartLearning = async () => {
      isShowLoading.value = true;

      await funcLoadPractice();

      isStartReview.value = true;
      isShowLoading.value = false;
    };

    const funcPlayEffect = () => {
      $q.sessionStorage.set("isEnableSoundEffect", isSoundEffect.value);
    };

    const funcPlayBackground = () => {
      $q.sessionStorage.set("isEnableSoundBackground", isSoundBackground.value);
      playSoundBackground(route.name, isSoundBackground.value);
    };

    let setTimeCoin;
    const funcSumTotalCoin = () => {
      practiceData.value.isFinishReview = true;
      practiceData.value.time = 0;
      practiceData.value.coin = 0;

      if (practiceData.value.score == 0) {
        return;
      }

      let totalSum = 0;
      let sumRedPigCoin = 0;
      let sumBluePigCoin = 0;
      let sumGoldPigCoin = 0;

      if (practiceData.value.redPig > 0) {
        sumRedPigCoin = practiceData.value.redPig;

        let loopTime = 7;

        if (sumRedPigCoin >= 1000) {
          loopTime = 1;
        } else if (sumRedPigCoin >= 100) {
          loopTime = 3;
        }

        setTimeout(() => {
          setTimeCoin = setInterval(() => {
            practiceData.value.coin++;
            totalSum++;
            if (totalSum === sumRedPigCoin) {
              totalSum = 0;
              clearInterval(setTimeCoin);
            }
          }, loopTime);
        }, 2000);
      }

      if (practiceData.value.bluePig > 0) {
        sumBluePigCoin = practiceData.value.bluePig * 10;

        let loopTime = 7;

        if (sumBluePigCoin >= 1000) {
          loopTime = 1;
        } else if (sumBluePigCoin >= 100) {
          loopTime = 3;
        }

        setTimeout(() => {
          setTimeCoin = setInterval(() => {
            practiceData.value.coin++;
            totalSum++;
            if (totalSum === sumBluePigCoin) {
              totalSum = 0;
              clearInterval(setTimeCoin);
            }
          }, loopTime);
        }, 3500);
      }

      if (practiceData.value.goldPig > 0) {
        sumGoldPigCoin = practiceData.value.goldPig * 15;

        let loopTime = 7;

        if (sumGoldPigCoin >= 1000) {
          loopTime = 1;
        } else if (sumGoldPigCoin >= 100) {
          loopTime = 3;
        }

        setTimeout(() => {
          setTimeCoin = setInterval(() => {
            practiceData.value.coin++;
            totalSum++;
            if (totalSum === sumGoldPigCoin) {
              totalSum = 0;
              clearInterval(setTimeCoin);
            }
          }, loopTime);
        }, 5300);
      }

      if (practiceData.value.redPig > 0) {
        let setTimeOverAll = 0;

        if (practiceData.value.goldPig > 0) {
          setTimeOverAll = 7500;
        } else if (practiceData.value.bluePig > 0) {
          setTimeOverAll = 4300;
        } else if (practiceData.value.redPig > 0) {
          setTimeOverAll = 2800;
        }

        setTimeout(() => {
          practiceData.value.totalCoin = practiceData.value.coin;
        }, setTimeOverAll);
      }
    };

    let authListen;
    onMounted(() => {
      authListen = auth.onAuthStateChanged(async function (user) {
        if (user) {
          if ($q.sessionStorage.has("isEnableSoundBackground")) {
            isSoundBackground.value = $q.sessionStorage.getItem(
              "isEnableSoundBackground"
            );
            playSoundBackground(route.name, isSoundBackground.value);
          } else {
            $q.sessionStorage.set("isEnableSoundBackground", true);
            playSoundBackground(route.name, true);
          }

          if ($q.sessionStorage.has("isEnableSoundEffect")) {
            isSoundEffect.value = $q.sessionStorage.getItem(
              "isEnableSoundEffect"
            );
          } else {
            $q.sessionStorage.set("isEnableSoundEffect", true);
          }

          await getStudentInfoData(user.uid);
        } else {
          router.replace("/");
        }
      });
    });

    onBeforeUnmount(() => {
      if (authListen) {
        authListen();
      }
    });

    return {
      // Data
      nextStep,
      nextHelp,
      studentInfo,
      practiceData,
      rankingList,

      // Boolean
      isSoundEffect,
      isSoundBackground,
      isStartReview,
      isShowLoading,
      isDialogSetting,
      isDialogPigScore,
      isDialogRanking,
      isDialogHelp,

      // Function
      funcStartLearning,
      funcSumTotalScore,
      funcPlayEffect,
      funcPlayBackground,
      funcSumTotalCoin,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-review-pc {
  max-width: 1600px;
  width: 100%;
  height: 100vh;
  background-image: url("/images/review/bg-vocabulary-review.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: auto;
}

.bg-review-mobile {
  max-width: 1000px;
  width: 100%;
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/review/bg-vocabulary-review-mobile.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
  margin: auto;
}

.text-title-stroke {
  font-weight: bold;
  text-shadow: rgb(81, 42, 8) 11px 0px 0px,
    rgb(81, 42, 8) 10.9546px 0.998623px 0px,
    rgb(81, 42, 8) 10.8187px 1.989px 0px, rgb(81, 42, 8) 10.5934px 2.96295px 0px,
    rgb(81, 42, 8) 10.2807px 3.91243px 0px,
    rgb(81, 42, 8) 9.88307px 4.82959px 0px,
    rgb(81, 42, 8) 9.40381px 5.70687px 0px,
    rgb(81, 42, 8) 8.84688px 6.53702px 0px,
    rgb(81, 42, 8) 8.21689px 7.31318px 0px,
    rgb(81, 42, 8) 7.51904px 8.02895px 0px, rgb(81, 42, 8) 6.7591px 8.6784px 0px,
    rgb(81, 42, 8) 5.94333px 9.25618px 0px,
    rgb(81, 42, 8) 5.07847px 9.75752px 0px,
    rgb(81, 42, 8) 4.17167px 10.1783px 0px,
    rgb(81, 42, 8) 3.23042px 10.515px 0px, rgb(81, 42, 8) 2.2625px 10.7648px 0px,
    rgb(81, 42, 8) 1.27588px 10.9258px 0px,
    rgb(81, 42, 8) 0.27873px 10.9965px 0px,
    rgb(81, 42, 8) -0.720724px 10.9764px 0px,
    rgb(81, 42, 8) -1.71422px 10.8656px 0px,
    rgb(81, 42, 8) -2.69357px 10.6651px 0px,
    rgb(81, 42, 8) -3.65067px 10.3765px 0px,
    rgb(81, 42, 8) -4.57762px 10.0023px 0px,
    rgb(81, 42, 8) -5.46676px 9.54539px 0px,
    rgb(81, 42, 8) -6.31075px 9.00968px 0px,
    rgb(81, 42, 8) -7.10263px 8.39956px 0px,
    rgb(81, 42, 8) -7.83584px 7.72008px 0px,
    rgb(81, 42, 8) -8.50434px 6.97683px 0px,
    rgb(81, 42, 8) -9.10261px 6.17596px 0px,
    rgb(81, 42, 8) -9.6257px 5.32409px 0px,
    rgb(81, 42, 8) -10.0693px 4.42824px 0px,
    rgb(81, 42, 8) -10.4297px 3.49583px 0px,
    rgb(81, 42, 8) -10.704px 2.53454px 0px,
    rgb(81, 42, 8) -10.8899px 1.55232px 0px,
    rgb(81, 42, 8) -10.9859px 0.557281px 0px,
    rgb(81, 42, 8) -10.9911px -0.442362px 0px,
    rgb(81, 42, 8) -10.9056px -1.43835px 0px,
    rgb(81, 42, 8) -10.7299px -2.42246px 0px,
    rgb(81, 42, 8) -10.4657px -3.38656px 0px,
    rgb(81, 42, 8) -10.1151px -4.3227px 0px,
    rgb(81, 42, 8) -9.68085px -5.22313px 0px,
    rgb(81, 42, 8) -9.1667px -6.08043px 0px,
    rgb(81, 42, 8) -8.57684px -6.88751px 0px,
    rgb(81, 42, 8) -7.91615px -7.63771px 0px,
    rgb(81, 42, 8) -7.19008px -8.32483px 0px,
    rgb(81, 42, 8) -6.40463px -8.94319px 0px,
    rgb(81, 42, 8) -5.56628px -9.4877px 0px,
    rgb(81, 42, 8) -4.68197px -9.95385px 0px,
    rgb(81, 42, 8) -3.75898px -10.3378px 0px,
    rgb(81, 42, 8) -2.80496px -10.6364px 0px,
    rgb(81, 42, 8) -1.82776px -10.8471px 0px,
    rgb(81, 42, 8) -0.835473px -10.9682px 0px,
    rgb(81, 42, 8) 0.163715px -10.9988px 0px,
    rgb(81, 42, 8) 1.16155px -10.9385px 0px,
    rgb(81, 42, 8) 2.1498px -10.7879px 0px,
    rgb(81, 42, 8) 3.12028px -10.5482px 0px,
    rgb(81, 42, 8) 4.065px -10.2213px 0px,
    rgb(81, 42, 8) 4.97615px -9.81009px 0px,
    rgb(81, 42, 8) 5.8462px -9.31783px 0px,
    rgb(81, 42, 8) 6.66797px -8.74861px 0px,
    rgb(81, 42, 8) 7.43467px -8.10714px 0px,
    rgb(81, 42, 8) 8.13996px -7.39871px 0px,
    rgb(81, 42, 8) 8.77804px -6.62918px 0px,
    rgb(81, 42, 8) 9.34361px -5.80491px 0px,
    rgb(81, 42, 8) 9.83202px -4.93268px 0px,
    rgb(81, 42, 8) 10.2392px -4.01973px 0px,
    rgb(81, 42, 8) 10.5619px -3.07357px 0px,
    rgb(81, 42, 8) 10.7973px -2.10203px 0px,
    rgb(81, 42, 8) 10.9435px -1.11313px 0px,
    rgb(81, 42, 8) 10.9994px -0.115036px 0px;
}

.box-dialog {
  width: 300px;
  background-image: url("/images/minigames/box-answer-piggames.png");
  background-position: top;
  background-size: contain;
  border-radius: 35px;
}

.box-dialog-content {
  background-color: #f6f3d3;
  border-radius: 35px;
  height: 250px;
}

.box-dialog-finish {
  max-width: 300px;
  width: 100%;
  background-image: url("/images/minigames/box-answer-piggames.png");
  background-position: top;
  background-size: contain;
  border-radius: 35px;
  box-shadow: 0px 10px 0px #a36532;
  margin: auto;
}

.box-dialog-header-finish {
  width: 90%;
  background: linear-gradient(180deg, #eba560 0%, #fcc572 53.44%, #eba560 100%);
  border: 5px solid#833705;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  margin: auto;
}

.box-dialog-show-pig {
  width: 300px;
  background-image: url("/images/minigames/box-answer-piggames.png");
  background-position: top;
  background-size: contain;
  border-radius: 35px;
}

.box-dialog-sohw-pig-content {
  background-color: #f6f3d3;
  border-radius: 30px;
}

.text-stoke-white {
  text-shadow: rgb(255, 255, 255) 6px 0px 0px,
    rgb(255, 255, 255) 5.91686px 0.995377px 0px,
    rgb(255, 255, 255) 5.66974px 1.96317px 0px,
    rgb(255, 255, 255) 5.2655px 2.87655px 0px,
    rgb(255, 255, 255) 4.71532px 3.71022px 0px,
    rgb(255, 255, 255) 4.03447px 4.44106px 0px,
    rgb(255, 255, 255) 3.24181px 5.04883px 0px,
    rgb(255, 255, 255) 2.35931px 5.51667px 0px,
    rgb(255, 255, 255) 1.41143px 5.83163px 0px,
    rgb(255, 255, 255) 0.424423px 5.98497px 0px,
    rgb(255, 255, 255) -0.574341px 5.97245px 0px,
    rgb(255, 255, 255) -1.55719px 5.79441px 0px,
    rgb(255, 255, 255) -2.49688px 5.45578px 0px,
    rgb(255, 255, 255) -3.36738px 4.96596px 0px,
    rgb(255, 255, 255) -4.14455px 4.33852px 0px,
    rgb(255, 255, 255) -4.80686px 3.59083px 0px,
    rgb(255, 255, 255) -5.33596px 2.74364px 0px,
    rgb(255, 255, 255) -5.71718px 1.8204px 0px,
    rgb(255, 255, 255) -5.93995px 0.84672px 0px,
    rgb(255, 255, 255) -5.99811px -0.150428px 0px,
    rgb(255, 255, 255) -5.89004px -1.14341px 0px,
    rgb(255, 255, 255) -5.61874px -2.1047px 0px,
    rgb(255, 255, 255) -5.19172px -3.00766px 0px,
    rgb(255, 255, 255) -4.62082px -3.82727px 0px,
    rgb(255, 255, 255) -3.92186px -4.54081px 0px,
    rgb(255, 255, 255) -3.11421px -5.12852px 0px,
    rgb(255, 255, 255) -2.22026px -5.57409px 0px,
    rgb(255, 255, 255) -1.26477px -5.86518px 0px,
    rgb(255, 255, 255) -0.274238px -5.99373px 0px,
    rgb(255, 255, 255) 0.723898px -5.95617px 0px,
    rgb(255, 255, 255) 1.70197px -5.75355px 0px,
    rgb(255, 255, 255) 2.63288px -5.39147px 0px,
    rgb(255, 255, 255) 3.49082px -4.87998px 0px,
    rgb(255, 255, 255) 4.25202px -4.23324px 0px,
    rgb(255, 255, 255) 4.89538px -3.46919px 0px,
    rgb(255, 255, 255) 5.40307px -2.60899px 0px,
    rgb(255, 255, 255) 5.76102px -1.67649px 0px,
    rgb(255, 255, 255) 5.95932px -0.697531px 0px;
}

.text-stoke-brown {
  text-shadow: rgb(106, 70, 26) 6px 0px 0px,
    rgb(106, 70, 26) 5.91686px 0.995377px 0px,
    rgb(106, 70, 26) 5.66974px 1.96317px 0px,
    rgb(106, 70, 26) 5.2655px 2.87655px 0px,
    rgb(106, 70, 26) 4.71532px 3.71022px 0px,
    rgb(106, 70, 26) 4.03447px 4.44106px 0px,
    rgb(106, 70, 26) 3.24181px 5.04883px 0px,
    rgb(106, 70, 26) 2.35931px 5.51667px 0px,
    rgb(106, 70, 26) 1.41143px 5.83163px 0px,
    rgb(106, 70, 26) 0.424423px 5.98497px 0px,
    rgb(106, 70, 26) -0.574341px 5.97245px 0px,
    rgb(106, 70, 26) -1.55719px 5.79441px 0px,
    rgb(106, 70, 26) -2.49688px 5.45578px 0px,
    rgb(106, 70, 26) -3.36738px 4.96596px 0px,
    rgb(106, 70, 26) -4.14455px 4.33852px 0px,
    rgb(106, 70, 26) -4.80686px 3.59083px 0px,
    rgb(106, 70, 26) -5.33596px 2.74364px 0px,
    rgb(106, 70, 26) -5.71718px 1.8204px 0px,
    rgb(106, 70, 26) -5.93995px 0.84672px 0px,
    rgb(106, 70, 26) -5.99811px -0.150428px 0px,
    rgb(106, 70, 26) -5.89004px -1.14341px 0px,
    rgb(106, 70, 26) -5.61874px -2.1047px 0px,
    rgb(106, 70, 26) -5.19172px -3.00766px 0px,
    rgb(106, 70, 26) -4.62082px -3.82727px 0px,
    rgb(106, 70, 26) -3.92186px -4.54081px 0px,
    rgb(106, 70, 26) -3.11421px -5.12852px 0px,
    rgb(106, 70, 26) -2.22026px -5.57409px 0px,
    rgb(106, 70, 26) -1.26477px -5.86518px 0px,
    rgb(106, 70, 26) -0.274238px -5.99373px 0px,
    rgb(106, 70, 26) 0.723898px -5.95617px 0px,
    rgb(106, 70, 26) 1.70197px -5.75355px 0px,
    rgb(106, 70, 26) 2.63288px -5.39147px 0px,
    rgb(106, 70, 26) 3.49082px -4.87998px 0px,
    rgb(106, 70, 26) 4.25202px -4.23324px 0px,
    rgb(106, 70, 26) 4.89538px -3.46919px 0px,
    rgb(106, 70, 26) 5.40307px -2.60899px 0px,
    rgb(106, 70, 26) 5.76102px -1.67649px 0px,
    rgb(106, 70, 26) 5.95932px -0.697531px 0px;
}

.text-stoke-brown-small {
  text-shadow: rgb(106, 70, 26) 3px 0px 0px,
    rgb(106, 70, 26) 2.83487px 0.981584px 0px,
    rgb(106, 70, 26) 2.35766px 1.85511px 0px,
    rgb(106, 70, 26) 1.62091px 2.52441px 0px,
    rgb(106, 70, 26) 0.705713px 2.91581px 0px,
    rgb(106, 70, 26) -0.287171px 2.98622px 0px,
    rgb(106, 70, 26) -1.24844px 2.72789px 0px,
    rgb(106, 70, 26) -2.07227px 2.16926px 0px,
    rgb(106, 70, 26) -2.66798px 1.37182px 0px,
    rgb(106, 70, 26) -2.96998px 0.42336px 0px,
    rgb(106, 70, 26) -2.94502px -0.571704px 0px,
    rgb(106, 70, 26) -2.59586px -1.50383px 0px,
    rgb(106, 70, 26) -1.96093px -2.27041px 0px,
    rgb(106, 70, 26) -1.11013px -2.78704px 0px,
    rgb(106, 70, 26) -0.137119px -2.99686px 0px,
    rgb(106, 70, 26) 0.850987px -2.87677px 0px,
    rgb(106, 70, 26) 1.74541px -2.43999px 0px,
    rgb(106, 70, 26) 2.44769px -1.73459px 0px,
    rgb(106, 70, 26) 2.88051px -0.838247px 0px;
}

.text-stoke-white-small {
  text-shadow: rgb(255, 255, 255) 3px 0px 0px,
    rgb(255, 255, 255) 2.83487px 0.981584px 0px,
    rgb(255, 255, 255) 2.35766px 1.85511px 0px,
    rgb(255, 255, 255) 1.62091px 2.52441px 0px,
    rgb(255, 255, 255) 0.705713px 2.91581px 0px,
    rgb(255, 255, 255) -0.287171px 2.98622px 0px,
    rgb(255, 255, 255) -1.24844px 2.72789px 0px,
    rgb(255, 255, 255) -2.07227px 2.16926px 0px,
    rgb(255, 255, 255) -2.66798px 1.37182px 0px,
    rgb(255, 255, 255) -2.96998px 0.42336px 0px,
    rgb(255, 255, 255) -2.94502px -0.571704px 0px,
    rgb(255, 255, 255) -2.59586px -1.50383px 0px,
    rgb(255, 255, 255) -1.96093px -2.27041px 0px,
    rgb(255, 255, 255) -1.11013px -2.78704px 0px,
    rgb(255, 255, 255) -0.137119px -2.99686px 0px,
    rgb(255, 255, 255) 0.850987px -2.87677px 0px,
    rgb(255, 255, 255) 1.74541px -2.43999px 0px,
    rgb(255, 255, 255) 2.44769px -1.73459px 0px,
    rgb(255, 255, 255) 2.88051px -0.838247px 0px;
}

.box-finish-sumary {
  background: #a36532;
  box-shadow: inset 0px 5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 29.5px;
}

.animation-add-points {
  animation: addPoints 0.5s linear forwards;
  transform: translate(0px, -50%);
}

@keyframes addPoints {
  to {
    opacity: 0;
    transform: translate(-40px, -50%);
  }
}

.animation-pig {
  top: -45px;
  right: -50px;
  animation: fadeOutPig 2s linear forwards;
  opacity: 0;
}

@keyframes fadeOutPig {
  30% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.text-stoke {
  color: #fff;
  text-shadow: rgb(106, 70, 26) 2px 0px 0px,
    rgb(106, 70, 26) 1.75517px 0.958851px 0px,
    rgb(106, 70, 26) 1.0806px 1.68294px 0px,
    rgb(106, 70, 26) 0.141474px 1.99499px 0px,
    rgb(106, 70, 26) -0.832294px 1.81859px 0px,
    rgb(106, 70, 26) -1.60229px 1.19694px 0px,
    rgb(106, 70, 26) -1.97998px 0.28224px 0px,
    rgb(106, 70, 26) -1.87291px -0.701566px 0px,
    rgb(106, 70, 26) -1.30729px -1.5136px 0px,
    rgb(106, 70, 26) -0.421592px -1.95506px 0px,
    rgb(106, 70, 26) 0.567324px -1.91785px 0px,
    rgb(106, 70, 26) 1.41734px -1.41108px 0px,
    rgb(106, 70, 26) 1.92034px -0.558831px 0px;
}

.box-container-ranking {
  max-width: 350px;
  width: 100%;
}

.box-container-ranking {
  background-color: #f6f3d3;
  border-radius: 10px;
}

.box-ranking-list {
  position: relative;
  max-height: 450px;
  min-height: 300px;
  overflow-y: scroll;
  z-index: 2;
}

/* width */
.box-ranking-list::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-ranking-list::-webkit-scrollbar-track {
  background: #cab16d;
  border-radius: 50px;
  box-shadow: 0px 0px 1px #a46100;
}

/* Handle */
.box-ranking-list::-webkit-scrollbar-thumb {
  background: #a46100;
  border-radius: 50px;
}

/* Handle on hover */
.box-ranking-list::-webkit-scrollbar-thumb:hover {
  background: #a46100;
}

.icon-dialog {
  position: absolute;
  top: -113px;
  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 50%;
  z-index: 2;
}

.bg-review-vocab {
  width: 100%;
  height: 100vh;
}

.bg-review-tutorial-1 {
  background-image: url("/images/review/bg-review-vocab-pc-1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.bg-review-tutorial-2 {
  background-image: url("/images/review/bg-review-vocab-pc-2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-review-tutorial-3 {
  background-image: url("/images/review/bg-review-vocab-pc-3.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-review-tutorial-4 {
  background-image: url("/images/review/bg-review-vocab-pc-4.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-review-tutorial-5 {
  background-image: url("/images/review/bg-review-vocab-pc-5.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.bg-review-tutorial-mobile-1 {
  background-image: url("/images/review/bg-review-vocab-mobile-1.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.bg-review-tutorial-mobile-2 {
  background-image: url("/images/review/bg-review-vocab-mobile-2.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.bg-review-tutorial-mobile-3 {
  background-image: url("/images/review/bg-review-vocab-mobile-3.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.bg-review-tutorial-mobile-4 {
  background-image: url("/images/review/bg-review-vocab-mobile-4.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.bg-review-tutorial-mobile-5 {
  background-image: url("/images/review/bg-review-vocab-mobile-5.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.box-content {
  max-width: 1200px;
  width: 100%;
  background-color: #fff;
  border: 3px solid#F1D280;
  border-radius: 10px;
  padding: 10px;
}

.box-header-help {
  background-color: #a36532;
  border-radius: 30px;
}
</style>
