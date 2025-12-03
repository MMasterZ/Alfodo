<template>
  <!-- #region Q-Page -->
  <q-page class="bg-white">
    <!-- #region header -->
    <q-header style="background-color: #3277c9">
      <q-toolbar>
        <div class="row fit">
          <div class="col">
            <q-btn round flat v-if="isStartPrePostTest && !isFinishPrePostTest">
              <q-img no-spinner no-transition src="/images/icon_main/icon-back.png" @click="funcOutOfPrePostTest()"
                class="cursor-pointer"></q-img>
            </q-btn>
          </div>
          <div class="self-center q-px-md">
            <div class="box-timer font-mali-b f24" v-if="!isFinishPrePostTest" align="center">
              {{ timer }}
            </div>
          </div>
          <div class="col self-center" align="right">
            <q-img v-if="
              $q.platform.is.mobile &&
              isStartPrePostTest &&
              !isFinishPrePostTest &&
              isCheckIsNotQuiz
            " width="60px" src="/images/prepost/button-send-answer-prepost-mobile.png" @click="funcCheckSendAnswer()"
              no-spinner="" no-transition=""></q-img>
          </div>
        </div>
      </q-toolbar>
    </q-header>
    <!-- #endregion -->

    <!-- #region Desktop -->
    <div v-if="$q.platform.is.desktop">
      <!-- #region หน้าแรก -->
      <div class="q-pa-md" v-if="!isStartPrePostTest && !isFinishPrePostTest">
        <div class="row justify-center q-mt-xl">
          <div class="box-start-container q-pa-md">
            <div class="sub-start-container relative-position q-pa-md q-px-xl">
              <!-- #region Header Pretest Posttest Midterm -->
              <div class="q-my-md font-mali-b" align="center" v-if="isCheckIsNotQuiz">
                <div class="f24">
                  <span v-if="routerName == 'pretest'">แบบทดสอบก่อนเรียน</span>
                  <span v-if="routerName == 'midterm'">แบบทดสอบกลางภาคเรียน</span>
                  <span v-if="routerName == 'posttest'">แบบทดสอบปลายภาคเรียน</span>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Header Quiz -->
              <div class="box-quiz-header absolute-top row justify-center items-center"
                style="left: 50%; top: 20px; transform: translateX(-50%)" v-else>
                <div>
                  <div class="text-header" align="center">
                    <span>Quiz</span>
                  </div>
                  <div class="text-sub-header">
                    <span v-if="routerName == 'quizPost'">แบบทดสอบก่อนสอบปลายภาคเรียน</span>
                    <span v-if="routerName == 'quizMid'">แบบทดสอบก่อนสอบกลางภาคเรียน</span>
                  </div>
                </div>
              </div>
              <div style="height: 115px" v-if="routerName == 'quizPost' || routerName == 'quizMid'"></div>
              <!-- #endregion -->
              <div class="q-pt-md font-mali-m f20">
                <div class="row">
                  <div class="col">
                    <span>จำนวนข้อสอบ</span>
                  </div>
                  <div>
                    <span>{{ `${questionList.length} ข้อ` }}</span>
                  </div>
                </div>
                <div class="row q-my-sm">
                  <div class="col">
                    <span>คะแนนเต็ม</span>
                  </div>
                  <div>
                    <span>{{ `${questionList.length} คะแนน` }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <span>เวลาในการสอบ</span>
                  </div>
                  <div>
                    <span>{{ `30 นาที` }}</span>
                  </div>
                </div>
                <q-separator class="q-my-lg bg-black"></q-separator>
                <div class="f14" align="left">
                  <div class="font-mali-b">
                    <span v-if="isCheckIsNotQuiz">ข้อบ่งชี้</span>
                    <span v-else>คำอธิบาย</span>
                  </div>
                  <!-- #region Condition Prepost -->
                  <div v-if="
                    routerName == 'pretest' ||
                    routerName == 'posttest' ||
                    routerName == 'midterm'
                  ">
                    <div class="row q-my-md">
                      <div class="col-1" style="width: 17px">1.</div>
                      <div class="col">
                        {{
                          `นักเรียนจะสามารถส่งข้อสอบได้ก็ต่อเมื่อทำข้อสอบครบทุกข้อ
                        และเหลือเวลาในการสอบ 20 นาที`
                        }}
                      </div>
                    </div>
                    <div class="row q-my-md">
                      <div class="col-1" style="width: 17px">2.</div>
                      <div class="col">
                        {{
                          `กรณีที่หมดเวลาสอบ และนักเรียนยังไม่ได้กดส่งข้อสอบ
                        ระบบจะทำการส่งข้อสอบให้อัตโนมัติ`
                        }}
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->
                  <!-- #region Condition Quiz -->
                  <div v-else>
                    <div class="row q-my-md">
                      <div class="col">
                        {{
                          `กรณีที่หมดเวลาสอบ ระบบจะทำการส่งข้อสอบให้อัตโนมัติ และคิดคะแนนรวมถึงข้อที่นักเรียนทำถึง`
                        }}
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->
                  <div class="q-pb-lg q-px-md q-pt-sm">
                    <!-- #region Reward Prepost -->
                    <div class="box-condition-giftbox f12 font-mali-m q-pa-xs"
                      v-if="routerName == 'posttest' || routerName == 'midterm'">
                      <div class="row relative-position">
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-1.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.4)} คะแนน` }}
                          </div>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-2.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.6)} คะแนน` }}
                          </div>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-3.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.8)} คะแนน` }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->
                    <!-- #region Reward Quiz -->
                    <div v-else class="q-mt-md">
                      <div class="row relative-position justify-center items-center">
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div class="row q-pa-sm q-pb-lg justify-center items-center col-12">
                          <div class="q-mx-sm relative-position">
                            <q-img width="45px" src="/images/prepost/icon-winner-coin.png" no-spinner=""
                              no-transition=""></q-img>
                            <span class="absolute-center text-coin-start font-mali-sb" style="top: 90%" align="center">
                              {{ `x${practiceStore.prePostReward.coin || 0}` }}
                            </span>
                          </div>
                          <div>
                            <span class="f16 font-mali-b">ต่อจำนวนข้อที่ถูก</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->
                  </div>

                  <div align="center" class="q-mt-md">
                    <div class="relative-position row justify-center" style="height: 17px">
                      <div align="left" v-if="!isShowButtonStart">
                        <div class="box-progress-start">
                          <div class="progress" v-if="isStartAnimationProgress"></div>
                        </div>
                      </div>

                      <div class="col-12 absolute-center" style="top: 0px" v-if="isShowButtonStart">
                        <span class="f14">ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</span>
                      </div>
                    </div>

                    <div class="relative-position">
                      <q-img width="280px" :src="`/images/prepost/button-start-prepost${isShowButtonStart ? '' : '-disable'
                        }.png`" :class="isShowButtonStart ? 'cursor-pointer' : ''" no-spinner="" no-transition=""
                        @click="isShowButtonStart ? funcStartPrePostTest() : null"></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าทำแบบทดสอบ -->
      <div class="q-pa-md animate__animated animate__fadeIn" v-if="isStartPrePostTest && !isFinishPrePostTest"
        align="center" style="animation-duration: 1s">
        <div class="row justify-center" align="center">
          <div class="q-pa-sm" :class="routerName == 'pretest' ||
              routerName == 'midterm' ||
              routerName == 'posttest'
              ? 'col-6'
              : 'col-7'
            ">
            <div class="box-question-container q-pa-md" align="left">
              <div class="row fit">
                <!-- #region Box Question and Instruction -->
                <div class="col-12">
                  <div class="row justify-between q-pa-xs">
                    <div class="col-auto">
                      <div
                        class="row justify-center items-center font-mali-sb box-question-number q-px-sm q-py-xs f16 text-white"
                        align="center">
                        {{ `Q${selectedQuestion + 1}/${questionList.length}` }}
                      </div>
                    </div>
                    <div class="relative-position button-pin-question f16 font-mali-sb" v-ripple
                      :class="questionList[selectedQuestion].isMark ? 'selected' : ''" @click="funcMarkQuestion()"
                      style="color: #2c2c2c" v-if="
                        routerName == 'pretest' ||
                        routerName == 'midterm' ||
                        routerName == 'posttest'
                      ">
                      <q-icon name="fas fa-thumbtack" style="transform: rotate(30deg)"></q-icon>
                      {{ `ไม่แน่ใจ` }}
                    </div>
                  </div>
                </div>
                <div class="col-12" style="margin-top: 20px; height: 300px; overflow: auto">
                  <!-- Instruction -->
                  <div class="q-px-xs bg-white" style="position: sticky; top: 0">
                    <div class="fomt-mali-m f20 text-question-underline">
                      <span v-html="questionList[selectedQuestion].instructionEng"></span>
                    </div>
                    <div class="font-mali-m f16 q-py-sm">
                      <span v-html="questionList[selectedQuestion].instructionTh"></span>
                    </div>
                  </div>

                  <!-- Question -->
                  <div class="q-pa-xs q-mt-md">
                    <div class="f20 font-mali-m" style="color: #2c2c2c">
                      <span v-html="`${questionList[selectedQuestion].question}`"></span>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region box Choice and Button Next and Pervious -->
                <div class="col-12 self-end">
                  <!-- Choices -->
                  <div class="q-pa-xs q-mb-lg">
                    <div class="relative-position box-choices-main row q-mt-md q-pa-xs cursor-pointer" v-for="(itemAnswer, indexAnswer) in questionList[selectedQuestion]
                      .choices" @click="
                          routerName == 'pretest' ||
                            routerName == 'midterm' ||
                            routerName == 'posttest'
                            ? funcSelectedAnswer(itemAnswer, indexAnswer)
                            : isSendAnswer
                              ? null
                              : funcSelectedAnswer(itemAnswer, indexAnswer)
                          " :class="routerName == 'pretest' ||
                          routerName == 'midterm' ||
                          routerName == 'posttest'
                          ? questionList[selectedQuestion].selectedAnswerIndex ===
                            indexAnswer
                            ? 'selected '
                            : ''
                          : questionList[selectedQuestion].selectedAnswerIndex ===
                            indexAnswer
                            ? showAnswerDetails.isCorrectAnswer
                              ? 'correct'
                              : 'incorrect'
                            : ''
                        " style="color: #2c2c2c">
                      <div class="relative-position self-center col-1 row q-px-sm width-fit" align="center">
                        <q-radio dense="" v-model="questionList[selectedQuestion].selectedAnswerIndex"
                          :val="indexAnswer" @update:model-value="
                            funcSelectedAnswer(itemAnswer, indexAnswer)
                            " v-if="
                            routerName == 'pretest' ||
                            routerName == 'midterm' ||
                            routerName == 'posttest'
                          " />
                      </div>
                      <div class="col">
                        <span class="q-px-sm font-mali-m relative-position f20" v-html="itemAnswer.choice">
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Button Next & Pervious -->
                  <div class="q-pa-xs row justify-between" v-if="
                    routerName == 'pretest' ||
                    routerName == 'midterm' ||
                    routerName == 'posttest'
                  " style="height: 60px">
                    <div>
                      <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-pervious-prepost.png"
                        @click="funcPerviousQuestion()" v-if="selectedQuestion > 0" no-spinner=""
                        no-transition=""></q-img>
                    </div>
                    <div>
                      <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-next-prepost.png"
                        @click="funcNextQuestion()" v-if="selectedQuestion != questionList.length - 1" no-spinner=""
                        no-transition=""></q-img>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
            </div>
          </div>

          <!-- #region Menu question list -->
          <div class="col-3 q-pa-sm" style="width: 320px" v-if="
            routerName == 'pretest' ||
            routerName == 'midterm' ||
            routerName == 'posttest'
          ">
            <div class="box-question-list q-pa-md text-white">
              <div class="row justify-center items-baseline fit">
                <div class="col-12">
                  <!-- Header -->
                  <div>
                    <div class="f20 font-mali-b" align="left">Questions</div>
                    <q-separator class="bg-white q-my-sm"></q-separator>
                  </div>

                  <div class="box-scroll-question-list">
                    <div class="row">
                      <div class="col-2 q-pa-xs" style="width: 20%" v-for="(item, indexQuestionList) in questionList"
                        :key="indexQuestionList">
                        <div
                          class="relative-position box-question-menu row justify-center items-center f16 font-mali-m cursor-pointer"
                          :class="[
                            selectedQuestion == indexQuestionList ? 'selected' : '',
                            item.isSelectedAnswer ? 'answered' : '',
                            item.isMark ? 'mark' : '',
                          ]" @click="selectedQuestion = indexQuestionList">
                          {{ `Q${indexQuestionList + 1}` }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="q-pa-xs" style="margin-top: 35px">
                    <q-separator class="bg-white"></q-separator>

                    <!-- Button Send Answer -->
                    <div class="q-py-md">
                      <q-img :src="`/images/prepost/button-send-answer-prepost${isShowButtonSendAnswer ? '' : '-disable'
                        }.png`" no-spinner="" no-transition=""
                        @click="isShowButtonSendAnswer ? funcSendAnswer() : null"
                        :class="isShowButtonSendAnswer ? 'cursor-pointer' : ''">
                        <div class="transparent fit">
                          <div class="absolute-center row font-mali-b fit justify-center text-send-answer-time f20"
                            style="top: 60%">
                            <div class="col-1 width-fit" v-if="!isShowButtonSendAnswer">
                              ส่งข้อสอบ
                            </div>
                            <div class="col-1" style="width: 70px" v-if="!isEnableSendAnswerButton">
                              {{ `${timerSendAnswer}` }}
                            </div>
                          </div>
                        </div>
                      </q-img>
                    </div>

                    <!-- Status Answer -->
                    <div class="f12">
                      <div class="row q-py-xs">
                        <div class="self-center q-pr-sm">
                          <div style="width: 16px; height: 16px; background-color: #fff"></div>
                        </div>
                        <div class="self-center">ยังไม่ได้ตอบ</div>
                      </div>
                      <div class="row q-py-xs">
                        <div class="self-center q-pr-sm">
                          <div style="width: 16px; height: 16px; background-color: #5ac149"></div>
                        </div>
                        <div class="self-center">ตอบแล้ว</div>
                      </div>
                      <div class="row q-py-xs">
                        <div class="self-center q-pr-sm">
                          <div style="width: 16px; height: 16px; background-color: #ff3a3a"></div>
                        </div>
                        <div class="self-center">ไม่แน่ใจ</div>
                      </div>
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

      <!-- #region หน้าสรุปผล -->
      <div class="q-pa-md animate__animated animate__fadeIn" v-if="isFinishPrePostTest">
        <!-- #region Post And Mid -->
        <div class="row justify-center q-mt-xl" v-if="routerName != 'quizMid' && routerName != 'quizPost'">
          <div class="box-finish-container q-pa-sm">
            <div class="sub-finish-container q-pa-md">
              <div class="fit row justify-center items-center">
                <div class="col-12 q-pt-xl">
                  <div align="center">
                    <span class="f32 font-mali-b"> คะแนนที่ทำได้ </span>
                    <div style="margin-top: -5px">
                      <span class="font-mali-b" style="font-size: 72px">
                        {{ `${sumScore}/${questionList.length}` }}
                      </span>
                    </div>
                    <div style="margin-top: -15px">
                      <span class="f24 font-mali-sb">คะแนน</span>
                    </div>
                  </div>
                </div>
                <div class="col-12 self-center q-pt-md" v-if="isShowRewardItem">
                  <div align="center" class="q-pt-xl q-pb-md">
                    <!-- <q-img
                      width="250px"
                      src="/images/prepost/reward-banner-prepost.png"
                    ></q-img> -->
                    <q-separator style="height: 1px; background-color: #3277c9"></q-separator>
                  </div>
                  <div class="q-pb-md" align="center">
                    <div class="relative-position">
                      <div class="relative-position row justify-center items-center">
                        <div class="col relative-position">
                          <q-img width="120px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.4)
                                ? 'open'
                                : 'close'
                              }-1.png`" no-spinner no-transition></q-img>
                          <div class="f16 font-mali-m">
                            {{ `${Math.round(questionList.length * 0.4)} คะแนน` }}
                          </div>
                        </div>
                        <div class="col relative-position">
                          <q-img width="120px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.6)
                                ? 'open'
                                : 'close'
                              }-2.png`" no-spinner no-transition></q-img>
                          <div class="f16 font-mali-m">
                            {{ `${Math.round(questionList.length * 0.6)} คะแนน` }}
                          </div>
                        </div>

                        <div class="col relative-position">
                          <q-img width="120px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.8)
                                ? 'open'
                                : 'close'
                              }-3.png`" no-spinner no-transition></q-img>
                          <div class="f16 font-mali-m">
                            {{ `${Math.round(questionList.length * 0.8)} คะแนน` }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 q-mt-md self-center" v-if="isShowRewardCoin">
                  <div align="center" class="q-pt-md q-pb-md relative-position">
                    <q-img width="250px" src="/images/prepost/reward-banner-prepost.png" no-spinner=""
                      no-transition=""></q-img>
                  </div>

                  <div class="q-pa-md relative-position" align="center">
                    <q-img width="200px" src="/images/prepost/light-prepost-backdrop-coin.png"
                      class="absolute-center animation-light" no-spinner="" no-transition=""></q-img>
                    <q-img width="100px" src="/images/prepost/icon-winner-coin.png" no-spinner=""
                      no-transition=""></q-img>
                    <div class="absolute-center" style="top: 85%">
                      <span class="text-coin-finish font-mali-b">
                        {{ sumAnimationCoin }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 self-end row justify-center items-end q-pb-sm" style="height: 100px" align="center">
                  <q-img v-if="isShowButtonBackToLobby" width="180px"
                    src="/images/prepost/button-prepost-back-to-lobby.png" @click="funcBackToLobby()"
                    class="cursor-pointer" v-close-popup no-spinner="" no-transition=""></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Quiz mid and Quiz Post -->
        <div v-if="routerName == 'quizMid' || routerName == 'quizPost'">
          <div class="box-finish-quiz-container q-pa-md">
            <div align="center" class="font-mali-b">
              <div class="f32"><span> คะแนนที่ทำได้ </span></div>
              <div class="f72">{{ `${sumScore}/${questionList.length}` }}</div>
              <div>
                <q-img width="280px" src="/images/prepost/prepost-box-finish-your-reward.png" no-spinner=""
                  no-transition="">
                  <div class="fit transparent row justify-center items-center no-padding">
                    <div class="col-12 row f22 q-pb-xs">
                      <div class="col-1" style="width: 20px"></div>
                      <div class="self-center">
                        <span class="text-your-reward">{{ `Your Reward : ` }}</span>
                      </div>
                      <q-space></q-space>
                      <div class="self-center" style="padding-right: 3px">
                        <span>
                          {{ `+${showSumCoin}` }}
                        </span>
                      </div>
                      <div class="self-center relative-position">
                        <q-img width="30px" style="margin-bottom: 3px" src="/images/prepost/icon-winner-coin.png"
                          no-spinner="" no-transition=""></q-img>
                      </div>
                      <div class="col-1" style="width: 13px"></div>
                    </div>
                  </div>
                </q-img>
              </div>
            </div>

            <div class="q-py-lg">
              <div class="box-answers-exercises q-pa-md">
                <div class="box-scroll-answer-details q-pr-md">
                  <div class="box-expansion shadow-1 relative-position"
                    v-for="(itemQuestion, indexQuestion) in questionList" :key="indexQuestion"
                    :class="indexQuestion + 1 == questionList.length ? '' : 'q-mb-sm'">
                    <div class="row relative-position cursor-pointer" style="width: 100%" v-ripple :style="expansionList.includes(indexQuestion)
                        ? 'min-height:50px;max-height:fit-content;'
                        : 'height: 50px'
                      " @click="funcSelectedExpansionList(indexQuestion)">
                      <div class="self-start q-py-sm q-mt-xs q-px-md" style="width: 50px">
                        <q-icon size="25px" name="far fa-check-circle" style="color: #58cc02"
                          v-if="itemQuestion.isCorrectAnswer"></q-icon>
                        <q-icon size="25px" name="far fa-times-circle" style="color: #ec0b1b" v-else></q-icon>
                      </div>
                      <div class="col self-start q-my-sm q-pa-xs f16 font-mali-r row">
                        <div class="col-1 width-fit">
                          {{ `${indexQuestion + 1}. ` }}
                        </div>
                        <div class="col q-px-sm">
                          <div :class="expansionList.includes(indexQuestion)
                              ? ''
                              : 'text-question-overflow'
                            ">
                            <span v-html="`${itemQuestion.question}`"></span>
                          </div>
                        </div>
                      </div>
                      <q-space> </q-space>
                      <div class="q-py-sm q-mt-xs self-start q-pa-sm">
                        <q-icon size="25px" style="color: #3277c9" name="fas fa-caret-up"
                          v-if="expansionList.includes(indexQuestion)"></q-icon>
                        <q-icon size="25px" style="color: #3277c9" name="fas fa-caret-down" v-else></q-icon>
                      </div>
                    </div>

                    <div class="box-answer-details f16" v-if="expansionList.includes(indexQuestion)">
                      <div class="row">
                        <div class="q-px-md" style="width: 50px"></div>
                        <div class="col q-pa-sm q-py-md">
                          <div class="">
                            <span v-html="itemQuestion.instructionEng"></span>
                          </div>
                          <div class="q-mb-md">
                            <span v-html="itemQuestion.instructionTh"></span>
                          </div>
                          <div class="q-my-lg">
                            <span v-html="itemQuestion.question"></span>
                          </div>

                          <div class="row font-mali-sb" v-if="!itemQuestion.isCorrectAnswer" style="color: #ec0b1b">
                            <div class="col-1" style="width: 150px">คำตอบของคุณ</div>
                            <div class="col">
                              <span v-html="` ${itemQuestion.selectedAnswer == null
                                  ? 'ไม่ได้ตอบข้อนี้'
                                  : itemQuestion.selectedAnswer
                                }`
                                "></span>
                            </div>
                          </div>

                          <div class="row q-py-sm font-mali-sb" style="color: #58cc02">
                            <div class="col-1" style="width: 150px">คำตอบที่ถูกต้อง</div>
                            <div class="col">
                              <span v-html="` ${itemQuestion.choices.find(
                                (x) => x.index == itemQuestion.correctAnswer
                              ).choice
                                }`
                                "></span>
                            </div>
                          </div>

                          <div class="row q-mt-md" v-if="itemQuestion.description">
                            <div class="col-1 font-mali-b" style="width: 150px">
                              <span style="text-decoration: underline">คำอธิบาย</span>
                            </div>
                            <div class="col-12 font-mali-r q-my-sm">
                              <span v-html="` ${itemQuestion.description}`"></span>
                            </div>
                          </div>
                        </div>
                        <div class="q-px-md" style="width: 50px"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div align="center" v-if="isShowButtonBackToLobby">
              <q-img width="180px" src="/images/prepost/button-prepost-back-to-lobby.png" @click="funcBackToLobby()"
                class="cursor-pointer" v-close-popup no-spinner="" no-transition=""></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="$q.platform.is.mobile">
      <!-- #region หน้าแรก -->
      <div class="q-pa-sm" v-if="!isStartPrePostTest && !isFinishPrePostTest">
        <div class="row justify-center q-mt-md">
          <div class="box-start-container mobile q-pa-sm">
            <div class="sub-start-container mobile q-pa-md q-px-lg">
              <div class="q-my-xs font-mali-b" align="center" v-if="isCheckIsNotQuiz">
                <div class="f20">
                  <span v-if="routerName == 'pretest'">แบบทดสอบก่อนเรียน</span>
                  <span v-if="routerName == 'midterm'">แบบทดสอบกลางภาคเรียน</span>
                  <span v-if="routerName == 'posttest'">แบบทดสอบปลายภาคเรียน</span>
                </div>
              </div>
              <!-- #region Header Quiz -->
              <div class="box-quiz-header mobile absolute-top row justify-center items-center"
                style="left: 50%; top: 50px; transform: translateX(-50%)" v-else>
                <div>
                  <div class="text-header mobile" align="center">
                    <span>Quiz</span>
                  </div>
                  <div class="text-sub-header mobile">
                    <span v-if="routerName == 'quizPost'">แบบทดสอบก่อนสอบปลายภาคเรียน</span>
                    <span v-if="routerName == 'quizMid'">แบบทดสอบก่อนสอบกลางภาคเรียน</span>
                  </div>
                </div>
              </div>
              <div style="height: 80px" v-if="!isCheckIsNotQuiz"></div>
              <!-- #endregion -->
              <div class="q-pt-md font-mali-m f16">
                <div class="row">
                  <div class="col">
                    <span>จำนวนข้อสอบ</span>
                  </div>
                  <div>
                    <span>{{ `${questionList.length} ข้อ` }}</span>
                  </div>
                </div>
                <div class="row q-my-sm">
                  <div class="col">
                    <span>คะแนนเต็ม</span>
                  </div>
                  <div>
                    <span>{{ `${questionList.length} คะแนน` }}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <span>เวลาในการสอบ</span>
                  </div>
                  <div>
                    <span>{{ `30 นาที` }}</span>
                  </div>
                </div>
                <q-separator class="q-my-md bg-black"></q-separator>
                <div class="f14" align="left">
                  <div class="font-mali-b">
                    <span v-if="isCheckIsNotQuiz">ข้อบ่งชี้</span>
                    <span v-else>คำอธิบาย</span>
                  </div>
                  <div v-if="isCheckIsNotQuiz">
                    <div class="row q-my-sm">
                      <div class="col-1" style="width: 17px">1.</div>
                      <div class="col">
                        {{
                          `นักเรียนจะสามารถส่งข้อสอบได้ก็ต่อเมื่อทำข้อสอบครบทุกข้อ
                        และเวลาในการสอบเหลือ 20 นาที`
                        }}
                      </div>
                    </div>
                    <div class="row q-my-sm">
                      <div class="col-1" style="width: 17px">2.</div>
                      <div class="col">
                        กรณีที่หมดเวลาสอบ และนักเรียนยังไม่ได้กดส่งข้อสอบ
                        ระบบจะทำการส่งข้อสอบให้อัตโนมัติ
                      </div>
                    </div>
                  </div>
                  <div v-else>
                    <div class="row q-my-md">
                      <div class="col">
                        {{
                          `กรณีที่หมดเวลาสอบ ระบบจะทำการส่งข้อสอบให้อัตโนมัติ และคิดคะแนนรวมถึงข้อที่นักเรียนทำถึง`
                        }}
                      </div>
                    </div>
                  </div>

                  <div class="q-pt-sm">
                    <div class="f12 font-mali-m" key="" :class="routerName == 'posttest' || routerName == 'midterm'
                        ? 'box-condition-giftbox'
                        : 'box-condition-giftbox-quiz'
                      ">
                      <div class="row relative-position" v-if="routerName == 'posttest' || routerName == 'midterm'">
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-1.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.4)} คะแนน` }}
                          </div>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-2.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.6)} คะแนน` }}
                          </div>
                        </div>
                        <div class="self-center col-4 relative-position" align="center">
                          <div class="absolute-center box-backdrop-circle"></div>
                          <q-img width="70px" :src="`/images/prepost/giftbox-prepost-close-3.png`" no-spinner=""
                            no-transition=""></q-img>
                          <div>
                            {{ `${Math.round(questionList.length * 0.8)} คะแนน` }}
                          </div>
                        </div>
                      </div>

                      <div class="row relative-position justify-center items-center q-pt-sm q-pb-xs" v-else>
                        <div class="col-12" align="center">
                          <span class="font-mali-b f14">รางวัลที่จะได้รับ</span>
                        </div>
                        <div class="row q-pa-sm justify-center items-center col-12">
                          <div class="q-mx-sm relative-position">
                            <q-img width="45px" src="/images/prepost/icon-winner-coin.png" no-spinner=""
                              no-transition=""></q-img>
                            <span class="absolute-center text-coin-start font-mali-sb" style="top: 85%" align="center">
                              {{ `x${practiceStore.prePostReward.coin || 0}` }}
                            </span>
                          </div>
                          <div>
                            <span class="f16 font-mali-b">ต่อจำนวนข้อที่ถูก</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="q-mt-lg q-mb-sm q-pt-md" align="center">
                    <div class="relative-position row justify-center" style="height: 17px">
                      <div align="left" v-if="!isShowButtonStart">
                        <div class="box-progress-start mobile">
                          <div class="progress" v-if="isStartAnimationProgress"></div>
                        </div>
                      </div>

                      <div class="col-12 absolute-center" style="top: 0px" v-if="isShowButtonStart">
                        <span class="f14">ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</span>
                      </div>
                    </div>
                    <div class="relative-position">
                      <q-img style="max-width: 280px; width: 100%" :src="`/images/prepost/button-start-prepost${isShowButtonStart ? '' : '-disable'
                        }.png`" :class="isShowButtonStart ? 'cursor-pointer' : ''" no-spinner="" no-transition=""
                        @click="isShowButtonStart ? funcStartPrePostTest() : null"></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าทำแบบฝึกหัด -->
      <div v-if="isStartPrePostTest && !isFinishPrePostTest">
        <!--  -->
        <div class="row justify-between q-pa-sm q-pt-md">
          <div>
            <div>
              <div class="row justify-center items-center font-mali-sb box-question-number q-py-xs f14 text-white"
                align="center">
                {{ `Q${selectedQuestion + 1}/${questionList.length}` }}
              </div>
            </div>
          </div>
          <div v-if="isCheckIsNotQuiz">
            <div>
              <div class="relative-position button-pin-question mobile f12 font-mali-sb" v-ripple
                :class="questionList[selectedQuestion].isMark ? 'selected' : ''" @click="
                  questionList[selectedQuestion].isMark = !questionList[selectedQuestion]
                    .isMark
                  ">
                <q-icon name="fas fa-thumbtack" style="transform: rotate(30deg); color: #2c2c2c"></q-icon>
                {{ `ไม่แน่ใจ` }}
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-md font-mali-m">
          <div class="f16 text-question-underline">
            <span v-html="questionList[selectedQuestion].instructionEng"></span>
          </div>
          <div class="f14 text-black q-mt-md">
            <span v-html="questionList[selectedQuestion].instructionTh"></span>
          </div>

          <div class="f16 text-black q-mt-lg q-pt-md" style="color: #2c2c2c">
            <span v-html="questionList[selectedQuestion].question"></span>
          </div>

          <div class="q-mt-md q-pt-lg">
            <div class="relative-position box-choices-main row q-mt-md q-pa-xs"
              v-for="(itemAnswer, indexAnswer) in questionList[selectedQuestion].choices" @click="
                isCheckIsNotQuiz
                  ? funcSelectedAnswer(itemAnswer, indexAnswer)
                  : isSendAnswer
                    ? null
                    : funcSelectedAnswer(itemAnswer, indexAnswer)
                " :class="isCheckIsNotQuiz
                  ? questionList[selectedQuestion].selectedAnswerIndex === indexAnswer
                    ? 'selected cursor-pointer'
                    : 'cursor-pointer'
                  : questionList[selectedQuestion].selectedAnswerIndex === indexAnswer
                    ? showAnswerDetails.isCorrectAnswer
                      ? 'correct'
                      : 'incorrect'
                    : ''
                " style="color: #2c2c2c">
              <div class="relative-position self-start col-1 row q-px-sm width-fit" align="center"
                style="color: #2c2c2c; padding-top: 5px" v-if="isCheckIsNotQuiz">
                <q-radio dense="" v-model="questionList[selectedQuestion].selectedAnswerIndex" :val="indexAnswer"
                  @update:model-value="funcSelectedAnswer(itemAnswer, indexAnswer)" />
              </div>
              <div class="col q-px-sm" :class="isCheckIsNotQuiz ? 'self-start' : 'self-center'">
                <span class="font-mali-m relative-position f16" v-html="itemAnswer.choice">
                </span>
              </div>
            </div>
          </div>
          <div style="height: 100px"></div>
        </div>

        <div class="fixed-bottom q-pa-md bg-white" v-if="isCheckIsNotQuiz">
          <div class="row justify-between" style="height: 50px">
            <div>
              <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-pervious-prepost.png"
                @click="funcPerviousQuestion()" v-if="selectedQuestion > 0" no-spinner="" no-transition=""></q-img>
            </div>
            <div>
              <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-next-prepost.png"
                @click="funcNextQuestion()" v-if="selectedQuestion != questionList.length - 1" no-spinner=""
                no-transition=""></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าสรุปผล -->
      <div class="q-pa-md animate__animated animate__fadeIn" v-if="isFinishPrePostTest">
        <!-- #region Post And Mid -->
        <div class="row justify-center q-mt-sm" v-if="routerName != 'quizMid' && routerName != 'quizPost'">
          <div class="box-finish-container q-pa-sm">
            <div class="sub-finish-container q-pa-sm">
              <div class="fit row justify-center items-center">
                <div class="col-12 q-mt-sm">
                  <div align="center">
                    <span class="f32 font-mali-b"> คะแนนที่ทำได้ </span>
                    <div style="margin-top: -5px">
                      <span class="font-mali-b" style="font-size: 72px">
                        {{ `${sumScore}/${questionList.length}` }}
                      </span>
                    </div>
                    <div style="margin-top: -15px">
                      <span class="f24 font-mali-sb">คะแนน</span>
                    </div>
                  </div>
                </div>
                <div class="col-12 q-mt-md self-center" v-if="isShowRewardItem">
                  <div align="center" class="q-pt-lg q-pb-md">
                    <q-separator style="height: 1px; background-color: #3277c9"></q-separator>
                  </div>
                  <div class="q-pa-sm q-pb-md" align="center">
                    <div class="relative-position row justify-center items-center">
                      <div class="col relative-position">
                        <q-img width="70px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.4)
                              ? 'open'
                              : 'close'
                            }-1.png`" no-spinner no-transition></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.4)} คะแนน` }}
                        </div>
                      </div>
                      <div class="col relative-position">
                        <q-img width="70px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.6)
                              ? 'open'
                              : 'close'
                            }-2.png`" no-spinner no-transition></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.6)} คะแนน` }}
                        </div>
                      </div>

                      <div class="col relative-position">
                        <q-img width="70px" class="animate__animated animate__fadeIn" style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${sumScore >= Math.round(questionList.length * 0.8)
                              ? 'open'
                              : 'close'
                            }-3.png`" no-spinner no-transition></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.8)} คะแนน` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 q-mt-md self-center" v-if="isShowRewardCoin">
                  <div align="center" class="q-pt-md q-pb-md relative-position">
                    <q-img width="200px" src="/images/prepost/reward-banner-prepost.png" no-spinner=""
                      no-transition=""></q-img>
                  </div>

                  <div class="q-pa-md relative-position" align="center">
                    <q-img width="150px" src="/images/prepost/light-prepost-backdrop-coin.png"
                      class="absolute-center animation-light" no-spinner="" no-transition=""></q-img>
                    <q-img width="70px" src="/images/prepost/icon-winner-coin.png" no-spinner=""
                      no-transition=""></q-img>
                    <div class="absolute-center" style="top: 80%">
                      <span class="text-coin-finish mobile font-mali-b">
                        {{ showSumCoin }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="col-12 self-end q-my-lg q-mt-xl" style="height: 50px" align="center">
                  <q-img v-if="isShowButtonBackToLobby" width="180px"
                    src="/images/prepost/button-prepost-back-to-lobby.png" @click="funcBackToLobby()"
                    class="cursor-pointer" v-close-popup no-spinner="" no-transition=""></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Quiz mid and Quiz Post -->
        <div v-if="routerName == 'quizMid' || routerName == 'quizPost'">
          <div class="box-finish-quiz-container mobile">
            <div align="center" class="font-mali-b q-pt-md">
              <div class="f28"><span> คะแนนที่ทำได้ </span></div>
              <div class="f60">{{ `${sumScore}/${questionList.length}` }}</div>
              <div>
                <q-img width="280px" src="/images/prepost/prepost-box-finish-your-reward.png" no-spinner=""
                  no-transition="">
                  <div class="fit transparent row justify-center items-center no-padding">
                    <div class="col-12 row f22 q-pb-xs">
                      <div class="col-1" style="width: 20px"></div>
                      <div class="self-center">
                        <span class="text-your-reward">{{ `Your Reward : ` }}</span>
                      </div>
                      <q-space></q-space>
                      <div class="self-center" style="padding-right: 3px">
                        <span>
                          {{ `+${showSumCoin}` }}
                        </span>
                      </div>
                      <div class="self-center relative-position">
                        <q-img width="30px" style="margin-bottom: 3px" src="/images/prepost/icon-winner-coin.png"
                          no-spinner="" no-transition=""></q-img>
                      </div>
                      <div class="col-1" style="width: 13px"></div>
                    </div>
                  </div>
                </q-img>
              </div>
            </div>

            <div class="q-py-lg">
              <div class="box-answers-exercises mobile">
                <div class="box-scroll-answer-details mobile q-pr-md">
                  <div class="box-expansion shadow-1 relative-position"
                    v-for="(itemQuestion, indexQuestion) in questionList" :key="indexQuestion"
                    :class="indexQuestion + 1 == questionList.length ? '' : 'q-mb-sm'"
                    style="min-height: 50px; max-height: fit-content">
                    <div class="row relative-position cursor-pointer" style="width: 100%" v-ripple :style="expansionList.includes(indexQuestion)
                        ? 'min-height:50px;max-height:fit-content;'
                        : 'height: 50px'
                      " @click="funcSelectedExpansionList(indexQuestion)">
                      <div class="self-start q-px-md q-py-sm q-mt-xs" style="width: 50px">
                        <q-icon size="25px" name="far fa-check-circle" style="color: #58cc02"
                          v-if="itemQuestion.isCorrectAnswer"></q-icon>
                        <q-icon size="25px" name="far fa-times-circle" style="color: #ec0b1b" v-else></q-icon>
                      </div>
                      <div class="col self-start q-mt-xs q-pa-sm f16 font-mali-r row" :class="expansionList.includes(indexQuestion)
                          ? ''
                          : 'text-question-overflow'
                        ">
                        <div class="col-01 width-fit">
                          {{ `${indexQuestion + 1}.` }}
                        </div>
                        <div class="col q-px-sm">
                          <div>
                            <span v-html="` ${itemQuestion.question}`"> </span>
                          </div>
                        </div>
                      </div>
                      <q-space> </q-space>
                      <div class="self-start q-pa-sm q-mt-xs">
                        <q-icon size="25px" style="color: #3277c9" name="fas fa-caret-up"
                          v-if="expansionList.includes(indexQuestion)"></q-icon>
                        <q-icon size="25px" style="color: #3277c9" name="fas fa-caret-down" v-else></q-icon>
                      </div>
                    </div>

                    <div class="box-answer-details f16" v-if="expansionList.includes(indexQuestion)">
                      <div class="q-pa-md">
                        <div class="">
                          <span v-html="itemQuestion.instructionEng"></span>
                        </div>
                        <div class="q-mb-md">
                          <span v-html="itemQuestion.instructionTh"></span>
                        </div>
                        <div class="q-my-lg">
                          <span v-html="itemQuestion.question"></span>
                        </div>

                        <div class="row font-mali-sb" v-if="!itemQuestion.isCorrectAnswer" style="color: #ec0b1b">
                          <div class="col-1" style="width: 130px">คำตอบของคุณ</div>
                          <div class="col">
                            <span v-html="` ${itemQuestion.selectedAnswer == null
                                ? 'ไม่ได้ตอบข้อนี้'
                                : itemQuestion.selectedAnswer
                              }`
                              "></span>
                          </div>
                        </div>

                        <div class="row q-my-sm font-mali-sb" style="color: #58cc02">
                          <div class="col-1" style="width: 130px">คำตอบที่ถูกต้อง</div>
                          <div class="col">
                            <span v-html="` ${itemQuestion.choices.find(
                              (x) => x.index == itemQuestion.correctAnswer
                            ).choice
                              }`
                              "></span>
                          </div>
                        </div>

                        <div class="row q-mt-md q-pt-sm" v-if="itemQuestion.description">
                          <div class="col-1 font-mali-b" style="width: 130px">
                            <span style="text-decoration: underline">คำอธิบาย</span>
                          </div>
                          <div class="col-12 q-my-sm font-mali-r">
                            <span v-html="` ${itemQuestion.description}`"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div align="center" v-if="isShowButtonBackToLobby">
              <q-img width="180px" src="/images/prepost/button-prepost-back-to-lobby.png" @click="funcBackToLobby()"
                class="cursor-pointer" v-close-popup no-spinner="" no-transition=""></q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>
  <!-- #endregion -->

  <!-- #region Start Dialog -->
  <q-dialog v-model="isShowDialogStartPrePost" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <q-img width="320px" src="/images/prepost/dialog-start-prepost.png" no-spinner no-transition>
            <div class="absolute-bottom transparent" style="bottom: 6%">
              <div class="row q-px-md">
                <div class="col" align="center">
                  <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-cancel-prepost.png"
                    @click="funcCancelStartPrePost()" no-transition="" no-spinner=""></q-img>
                </div>
                <div class="col" align="center">
                  <q-img width="100px" :class="countdownTime <= 0 ? 'cursor-pointer' : 'cursor-not-allowed'" :src="`/images/prepost/button-start-dialog${countdownTime <= 0 ? '' : '-countdown'
                    }-prepost.png`" @click="countdownTime <= 0 ? funcConfirmStartPrePostTest() : null" no-transition=""
                    no-spinner="">
                    <div class="transparent absolute-center" v-if="countdownTime > 0">
                      <div class="text-countdown-time font-mali-b f16">
                        {{ countdownTime }}
                      </div>
                    </div>
                  </q-img>
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region หน้าตรวจสอบข้อมูล -->
  <q-dialog v-model="isShowDialogQuestionList" persistent maximized>
    <q-card class="transparent shadow-0">
      <q-card-section class="row justify-center items-center fit no-padding">
        <div class="box-dialog-question-list q-pa-md relative-position">
          <div>
            <span class="font-mali-b f20">Question</span>
            <q-separator class="bg-white q-mt-sm"></q-separator>
          </div>
          <div class="q-my-md">
            <div class="box-scroll-question-list mobile q-mb-lg">
              <div class="row">
                <div class="col-2 q-pa-xs" style="width: 20%" v-for="(item, indexQuestionList) in questionList"
                  :key="indexQuestionList" v-close-popup>
                  <div
                    class="relative-position box-question-menu row justify-center items-center f16 font-mali-m cursor-pointer"
                    :class="[
                      selectedQuestion == indexQuestionList ? 'selected' : '',
                      item.isSelectedAnswer ? 'answered' : '',
                      item.isMark ? 'mark' : '',
                    ]" @click="selectedQuestion = indexQuestionList">
                    {{ `Q${indexQuestionList + 1}` }}
                  </div>
                </div>
              </div>
            </div>
            <q-separator class="bg-white"></q-separator>
          </div>
          <div>
            <q-img :src="`/images/prepost/button-send-answer-prepost${isShowButtonSendAnswer ? '' : '-disable'
              }.png`" no-spinner="" no-transition="" @click="isShowButtonSendAnswer ? funcSendAnswer() : null"
              :class="isShowButtonSendAnswer ? 'cursor-pointer' : ''">
              <div class="transparent fit">
                <div class="absolute-center row font-mali-b fit justify-center text-send-answer-time f20"
                  style="top: 65%">
                  <div class="col-1 width-fit q-px-sm" v-if="!isShowButtonSendAnswer">
                    ส่งข้อสอบ
                  </div>
                  <div class="col-1" style="width: 70px" v-if="!isEnableSendAnswerButton">
                    {{ `${timerSendAnswer}` }}
                  </div>
                </div>
              </div>
            </q-img>
          </div>
          <div class="f12 q-mt-md">
            <div class="row q-py-xs">
              <div class="self-center q-pr-sm">
                <div style="width: 16px; height: 16px; background-color: #fff"></div>
              </div>
              <div class="self-center">ยังไม่ได้ตอบ</div>
            </div>
            <div class="row q-py-xs">
              <div class="self-center q-pr-sm">
                <div style="width: 16px; height: 16px; background-color: #5ac149"></div>
              </div>
              <div class="self-center">ตอบแล้ว</div>
            </div>
            <div class="row q-py-xs">
              <div class="self-center q-pr-sm">
                <div style="width: 16px; height: 16px; background-color: #ff3a3a"></div>
              </div>
              <div class="self-center">ไม่แน่ใจ</div>
            </div>
          </div>
          <div class="absolute-top-right" style="top: -15px; right: -10px">
            <q-btn round flat v-close-popup>
              <q-img src="/images/icon_main/icon-close.png" no-spinner="" no-transition=""></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region หมดเวลา -->
  <q-dialog maximized v-model="isTimeout" persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <q-img width="320px" src="/images/prepost/dialog-timeout-prepost.png" no-spinner="" no-transition="">
            <div class="transparent relative-position fit">
              <div class="absolute-center" style="top: 83%">
                <q-img class="cursor-pointer" width="100px" src="/images/prepost/button-okay-prepost.png"
                  @click="funcFinishPrePostTest()" v-close-popup no-spinner="" no-transition=""></q-img>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region โชว์ของรางวัล -->
  <q-dialog maximized v-model="isShowGetGiftBox" persistent style="background-color: rgba(0, 0, 0, 0.7)">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div class="absolute-center" v-if="isAnimationGetGiftBox">
            <div class="absolute-center row items-center justify-center"
              style="width: 300px; top: -150px; height: fit-content" align="left">
              <div class="col-4 animate__animated animate__bounceIn q-pa-xs" style="animation-duration: 1s"
                :style="`animation-delay:0.${indexGiftBox}s`"
                v-for="(itemGiftBox, indexGiftBox) in giftBoxItemList[numberGiftBox - 1]" :key="indexGiftBox"
                align="center">
                <div class="box-item-gift">
                  <div class="relative-position fit row justify-center items-center">
                    <q-img width="80%" :src="`/images/prepost/icon-winner-coin.png`" v-if="itemGiftBox.type == 'coin'"
                      style="margin-top: -7px" no-spinner="" no-transition="">
                    </q-img>
                    <q-img width="100%" :src="`${pathStorage}/${itemGiftBox.name}.png`"
                      v-if="itemGiftBox.type == 'item'" no-spinner="" no-transition="">
                    </q-img>

                    <div v-if="itemGiftBox.type == 'coin'" class="absolute-bottom text-coin font-mali-b" align="center"
                      style="bottom: -5px">
                      {{ itemGiftBox.coin }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <q-img :src="`/images/prepost/giftbox-prepost-open-${numberGiftBox}.png`" width="150px"
              class="absolute-center" no-spinner="" no-transition=""></q-img>

            <div class="relative-position q-pa-md" style="width: 170px; margin-top: -80px">
              <div class="absolute-left animation-star-light" style="top: -20px; left: -5px; animation-delay: 0.5s">
                <q-img width="10px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                  no-transition=""></q-img>
              </div>
              <div class="absolute-left animation-star-light" style="top: -3px; left: -10px; animation-delay: 0.2s">
                <q-img width="7px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                  no-transition=""></q-img>
              </div>
              <div class="absolute-left animation-star-light">
                <q-img width="15px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                  no-transition=""></q-img>
              </div>
              <div class="absolute-right animation-star-light" style="top: -15px; right: -10px; animation-delay: 0.3s">
                <q-img width="15px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                  no-transition=""></q-img>
              </div>
              <div class="absolute-right animation-star-light" style="top: 0px; right: 0px; animation-delay: 0.1s">
                <q-img width="10px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                  no-transition=""></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region ออกจาก Pre Post -->
  <q-dialog v-model="isShowDialogOutOfPrePost" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="row fit justify-center items-center">
        <div class="relative-position">
          <q-img width="320px" :src="`/images/prepost/dialog-out-of-question-test.png`" no-spinner no-transition>
            <div class="absolute-bottom transparent" style="bottom: 8%">
              <div class="q-pa-md" style="color: #4a261b">
                <div class="font-mali-m f12 q-pb-xs">
                  พิมพ์ “Confirm” เพื่อยืนยันการออก
                </div>
                <div class="relative-position" style="
                    height: 32px;
                    background-color: #fff;
                    border: 1px solid #bdbdbd;
                    border-radius: 5px;
                  ">
                  <q-input dense borderless="" round input-class="q-pa-sm font-mali-m f16" class="absolute-center"
                    style="width: 100%" input-style="color: #4a261b" v-model="textConfirmOutOfPrePost"
                    @update:model-value="funcCheckTextOutOfPrePost"></q-input>
                </div>
              </div>
              <div class="row q-px-md">
                <div class="col" align="center">
                  <q-img width="100px" class="cursor-pointer" src="/images/prepost/button-cancel-prepost.png"
                    @click="funcCancelOutOfPrePost()" no-spinner="" no-transition=""></q-img>
                </div>
                <div class="col" align="center">
                  <q-img width="100px" :class="isShowButtonConfirmOutOfPrePost
                      ? `cursor-pointer`
                      : 'cursor-not-allowed'
                    " :src="`/images/prepost/button-yes${isShowButtonConfirmOutOfPrePost ? '' : '-disble'
                      }-prepost.png`" @click="
                      isShowButtonConfirmOutOfPrePost ? funcConfirmOutOfPrePost() : null
                      " no-spinner="" no-transition=""></q-img>
                </div>
              </div>
            </div>
          </q-img>
          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-btn round flat v-close-popup @click="funcCancelOutOfPrePost()">
              <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Show All Reward -->
  <q-dialog v-model="isShowAllReward" maximized persistent style="background-color: rgba(0, 0, 0, 0.7)">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <div v-if="isAnimationGetGiftBox">
            <div align="center">
              <q-img width="300px" src="/images/prepost/reward-banner-prepost.png" no-spinner=""
                no-transition=""></q-img>
            </div>
            <div class="relative-position" :style="$q.platform.is.mobile ? 'width: 280px;margin:auto;' : 'width: 500px'
              ">
              <div class="row items-center justify-center relative-position q-py-md" style="height: fit-content"
                align="left">
                <!-- showAllGiftBoxItem -->
                <div class="col-8 row" style="width: 54%">
                  <div class="animate__animated animate__bounceIn q-pa-xs" style="animation-duration: 1s" :style="[
                    `animation-delay:${indexAllGiftBox > 9
                      ? `1.${indexAllGiftBox == 10
                        ? '0'
                        : `${indexAllGiftBox.toString().split('')[1]}`
                      }`
                      : `0.${indexAllGiftBox}`
                    }s`,
                    $q.platform.is.mobile ? 'width: 33%;' : 'width:33.3%',
                  ]" v-for="(itemAllGiftBox, indexAllGiftBox) in showAllGiftBoxItem" :key="indexAllGiftBox"
                    align="center">
                    <div class="box-item-gift show-all" :class="$q.platform.is.mobile ? 'mobile' : ''">
                      <div class="relative-position fit row justify-center items-center">
                        <q-img width="65%" :src="`/images/prepost/icon-winner-coin.png`"
                          v-if="itemAllGiftBox.type == 'coin'" style="margin-top: -7px" no-spinner="" no-transition="">
                        </q-img>
                        <q-img width="100%" :src="`${pathStorage}/${itemAllGiftBox.name}.png`"
                          v-if="itemAllGiftBox.type == 'item'" no-spinner="" no-transition="">
                        </q-img>

                        <div v-if="itemAllGiftBox.type == 'coin'" class="absolute-bottom text-coin font-mali-b"
                          align="center" style="bottom: 5px; font-size: 20px">
                          {{ itemAllGiftBox.amount }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="relative-position" style="max-width: 250px; margin: 15px auto 0px auto" align="center">
                <div class="absolute-left animation-star-light" style="top: -20px; left: -5px; animation-delay: 0.5s">
                  <q-img width="10px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                    no-transition=""></q-img>
                </div>
                <div class="absolute-left animation-star-light" style="top: -3px; left: -10px; animation-delay: 0.2s">
                  <q-img width="7px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                    no-transition=""></q-img>
                </div>
                <div class="absolute-left animation-star-light">
                  <q-img width="15px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                    no-transition=""></q-img>
                </div>
                <div class="absolute-right animation-star-light"
                  style="top: -15px; right: -10px; animation-delay: 0.3s">
                  <q-img width="15px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                    no-transition=""></q-img>
                </div>
                <div class="absolute-right animation-star-light" style="top: 0px; right: 0px; animation-delay: 0.1s">
                  <q-img width="10px" src="/images/prepost/animation-star-prepost.png" no-spinner=""
                    no-transition=""></q-img>
                </div>
              </div>
            </div>
            <div style="margin-top: -30px" align="center">
              <q-img :src="`/images/prepost/giftbox-prepost-finish-show-open-${numberGiftBox}.png`" width="250px"
                no-spinner="" no-transition=""></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Show answer -->
  <q-dialog position="bottom" v-model="isShowDialogAnswer" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section style="padding: 0px 0px 0px 0px; overflow: hidden">
        <div class="relative-position" :align="$q.platform.is.desktop ? 'left' : 'center'">
          <div v-show="isShowDialogAnswer"
            class="relative-position animate__animated animate__fadeInUp animate__delay-1s"
            style="max-width: 420px; width: 100%; z-index: 1; animation-duration: 0.5s" :style="$q.platform.is.desktop
                ? 'left: 15%;margin-bottom: -120px;'
                : 'left: -15%;margin-bottom: -110px;'
              ">
            <div class="absolute-top-right animate__animated animate__fadeIn animate__delay-3s"
              style="animation-duration: 0.3s; right: -10%; top: 15%">
              <q-img :src="`/images/prepost/prepost-character-talk-${showAnswerDetails.isCorrectAnswer ? 'correct' : 'incorrect'
                }.png`" width="160px" no-spinner="" no-transition=""></q-img>
            </div>
            <div class="">
              <character :isPet="false"></character>
            </div>
          </div>
          <div class="box-answer row justify-center items-center q-pa-md z-max relative-position"
            :class="showAnswerDetails.isCorrectAnswer ? 'correct' : 'incorrect'">
            <div class="self-start q-pa-sm" :class="$q.platform.is.desktop ? 'col-6 f20 ' : 'col-12 f16'"
              align="center">
              <div class="row">
                <div class="col-1 self-start q-px-xs" style="width: 50px">
                  <q-icon size="30px" style="color: #ec0b1b" name="far fa-times-circle"
                    v-if="!showAnswerDetails.isCorrectAnswer"></q-icon>

                  <q-icon v-else size="30px" style="color: #58cc02" name="far fa-check-circle"></q-icon>
                </div>
                <div class="col self-end q-px-sm" align="left">
                  <!-- Incorrect -->
                  <div v-if="!showAnswerDetails.isCorrectAnswer">
                    <span class="font-mali-b" style="color: #e1120a" v-html="showAnswerDetails.answer"></span>
                    <span class="q-mx-xs font-mali-m" style="color: #3f3f3f">เป็นคำตอบที่</span>
                    <span class="q-mx-xs font-mali-b" style="color: #e1120a">ผิด</span>
                  </div>

                  <!-- Correct -->
                  <div v-if="showAnswerDetails.isCorrectAnswer">
                    <span class="font-mali-b" style="color: #52bf40">{{
                      `ถูกต้อง`
                      }}</span>
                  </div>
                  <div class="q-mt-sm">
                    <span class="font-mali-m" style="color: #3f3f3f">
                      คำตอบที่ถูกต้อง คือ
                    </span>

                    <span class="font-mali-b q-mx-sm" style="color: #52bf41"
                      v-html="showAnswerDetails.currentAnswer.choice">
                    </span>
                  </div>
                  <div class="q-mt-md" v-if="showAnswerDetails.description">
                    <span class="font-mali-b" style="color: #3f3f3f; text-decoration: underline">คำอธิบาย</span>
                    <div class="q-mt-xs font-mali-r">
                      <span class="relative-position" style="color: #3f3f3f"
                        v-html="showAnswerDetails.description"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 q-mt-md self-end q-pa-sm" align="center">
              <div>
                <q-img width="130px" class="cursor-pointer" src="/images/prepost/prepost-button-next.png"
                  @click="funcNextQuestion()" no-spinner="" no-transition=""
                  v-if="selectedQuestion < questionList.length - 1"></q-img>

                <q-img v-else width="130px" class="cursor-pointer" src="/images/prepost/prepost-button-finish.png"
                  no-spinner="" no-transition="" @click="funcSendAnswer()"></q-img>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script>
import character from "components/character_main/character.vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { usePracticeStore } from "src/stores/practice";
import practiceHooks from "src/hooks/practiceHooks";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";
export default {
  name: "prepost_main",
  components: {
    character,
  },
  setup() {
    // #region Initialize Data
    const $q = useQuasar();
    const $route = useRoute();
    const $router = useRouter();
    const pathStorage = ref(
      "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
    );
    // #endregion

    // #region Store Data
    const practiceStore = usePracticeStore();
    // #endregion

    const isStartPrePostTest = ref(false);
    const isShowDialogQuestionList = ref(false);
    const isFinishPrePostTest = ref(false);
    const isShowDialogOutOfPrePost = ref(false);
    const isShowDialogStartPrePost = ref(false);
    const isShowDialogAnswer = ref(false);
    const isSendAnswer = ref(false);

    const selectedQuestion = ref(0);
    const questionList = ref([]);
    const expansionList = ref([]);

    const funcSelectedExpansionList = (index) => {
      let find = expansionList.value.find((item) => item == index);

      if (find >= 0) {
        expansionList.value = expansionList.value.filter((item) => item != index);
      } else {
        expansionList.value.push(index);
      }
    };

    // #region Function
    const funcCountdownStart = async () => {
      const practiceStore = usePracticeStore();

      if (
        practiceStore.prePostStatus.isFinishPrePostTest ||
        practiceStore.prePostStatus.isTimeout
      ) {
        questionList.value = practiceStore.prePostArray;
        isFinishPrePostTest.value = true;

        isShowRewardCoin.value = practiceStore.prePostStatus.isGetRewardCoin;
        isShowRewardItem.value = practiceStore.prePostStatus.isGetRewardItem;

        // $q.loading.hide();
        // return;

        await funcGetRewardByScore();

        setTimeout(() => {
          getGiftBoxProgress();
        }, 1000);

        $q.loading.hide();
        return;
      }

      if (practiceStore.prePostStatus.isStartPrePostTest) {
        questionList.value = practiceStore.prePostArray;
        isStartPrePostTest.value = true;

        if (routerName.value == "quizMid" || routerName.value == "quizPost") {
          if (practiceStore.prePostStatus.isSendAnswer) {
            isSendAnswer.value = true;
            isShowDialogAnswer.value = true;
          }

          let findFinishQuestion = questionList.value.every((item) => item.isDone);

          if (findFinishQuestion) {
            funcSendAnswer();
            return;
          }

          selectedQuestion.value = practiceStore.prePostObject.currentQuestion;
        }

        if (practiceStore.prePostStatus.isTimeout) {
          isTimeout.value = true;
          return;
        }

        funcShowTime();

        $q.loading.hide();
        return;
      }

      await funcGetPrePostTest();
    };

    // Timer
    const isEnableSendAnswerButton = ref(false);
    const isTimeout = ref(false);
    const timer = ref("00:00");
    const timerSendAnswer = ref("00:00");
    let listenTimer = null;
    const funcShowTime = () => {
      const practiceStore = usePracticeStore();

      // let setTime = 30;
      // let setTimeSendAnswer = setTime / 2;

      // if (
      //   routerName.value == "pretest" ||
      //   routerName.value == "quizMid" ||
      //   routerName.value == "quizPost"
      // ) {
      //   setTime = 30;
      //   setTimeSendAnswer = setTime / 2;
      // }

      // setTime = setTime * 60;
      // setTimeSendAnswer = setTimeSendAnswer * 60;

      // if (practiceStore.prePostStatus.isStartPrePostTest) {
      //   setTime = practiceStore.prePostObject.timer;
      //   setTimeSendAnswer = practiceStore.prePostObject.timerSendAnswer;
      // } else {
      //   if (practiceStore.prePostObject.timer != "") {
      //     setTime = practiceStore.prePostObject.timer;
      //   }
      // }

      // if (setTimeSendAnswer > 0) {
      //   let setMinSendAnswer = Math.floor(setTimeSendAnswer / 60);
      //   let setSecSendAnswer = setTime % 60;
      //   let timeFormatSendAnswer = `00:00`;

      //   timerSendAnswer.value = timeFormatSendAnswer;

      //   listenTimerSendAnswer = setInterval(() => {
      //     setTimeSendAnswer--;
      //     setMinSendAnswer = Math.floor(setTimeSendAnswer / 60);
      //     setSecSendAnswer = setTimeSendAnswer % 60;

      //     timeFormatSendAnswer = `${
      //       setMinSendAnswer < 10 ? "0" + setMinSendAnswer : setMinSendAnswer
      //     }:${
      //       setSecSendAnswer < 10 ? "0" + setSecSendAnswer : setSecSendAnswer
      //     }`;

      //     timerSendAnswer.value = timeFormatSendAnswer;

      //     if (setMinSendAnswer == 0 && setSecSendAnswer == 0) {
      //       clearInterval(listenTimerSendAnswer);
      //       isEnableSendAnswerButton.value = true;
      //     }

      //     practiceStore.setPrePostTimerSendAnswer(setTimeSendAnswer);
      //   }, 1000);
      // } else {
      //   isEnableSendAnswerButton.value = true;
      // }

      // let setMin = Math.floor(setTime / 60);
      // let setSec = setTime % 60;
      // let timeFormat = `00:00`;

      // timer.value = timeFormat;

      let setTime = practiceStore.prePostObject.timer;

      listenTimer = setInterval(async () => {
        setTime--;
        let setMin = Math.floor(setTime / 60);
        let setSec = setTime % 60;
        let timeFormat = `${setMin < 10 ? "0" + setMin : setMin}:${setSec < 10 ? "0" + setSec : setSec
          }`;

        let setTimeSendAnswer = Math.floor(setTime - 1200);

        timer.value = timeFormat;

        if (setTimeSendAnswer > 0) {
          let setSendAnswerMin = Math.floor(setTimeSendAnswer / 60);
          let setSendAnswerSec = setTime % 60;
          let timSendAnswereFormat = `${setSendAnswerMin < 10 ? "0" + setSendAnswerMin : setSendAnswerMin
            }:${setSendAnswerSec < 10 ? "0" + setSendAnswerSec : setSendAnswerSec}`;

          timerSendAnswer.value = timSendAnswereFormat;
        } else {
          if (!isEnableSendAnswerButton.value) {
            isEnableSendAnswerButton.value = true;
          }
        }

        if (setMin == 0 && setSec == 0) {
          clearInterval(listenTimer);

          const practiceStore = usePracticeStore();

          $q.loading.show();

          await funcSavePrePostLog();

          await funcGetRewardByScore();

          $q.loading.hide();

          isTimeout.value = true;
          isShowDialogAnswer.value = false;
          practiceStore.setPrePostStatus({
            isStartPrePostTest: true,
            isFinishPrePostTest: true,
            isSendAnswer: false,
            isTimeout: true,
            isGetRewardCoin: isShowRewardCoin.value,
            isGetRewardItem: isShowRewardItem.value,
          });
        }

        practiceStore.setPrePostTimer(setTime);
        return timeFormat;
      }, 1000);
    };

    const isCountdownStart = ref(false);
    const funcStartPrePostTest = async () => {
      isStartPrePostTest.value = true;
      isShowDialogStartPrePost.value = false;

      funcShowTime();

      practiceStore.setPrePostStatus({
        isStartPrePostTest: true,
        isFinishPrePostTest: false,
        isTimeout: false,
      });

      // funcRunCountdown();
    };

    let listenCountdownTime;
    const countdownTime = ref(3);
    const funcRunCountdown = () => {
      listenCountdownTime = setInterval(() => {
        if (countdownTime.value <= 0) {
          if (listenCountdownTime) {
            clearInterval(listenCountdownTime);
          }
        } else {
          countdownTime.value--;
        }
      }, 1000);
    };

    const funcCancelStartPrePost = () => {
      countdownTime.value = 3;

      if (listenCountdownTime) {
        clearInterval(listenCountdownTime);
      }

      isShowDialogStartPrePost.value = false;
    };

    const funcConfirmStartPrePostTest = () => { };

    const funcMarkQuestion = () => {
      const practiceStore = usePracticeStore();

      questionList.value[selectedQuestion.value].isMark = !questionList.value[
        selectedQuestion.value
      ].isMark;

      practiceStore.setTestQuestionArray(questionList.value);
    };

    const funcSelectedAnswer = (answer, index) => {
      const practiceStore = usePracticeStore();

      if (routerName.value == "quizMid" || routerName.value == "quizPost") {
        if (isSendAnswer.value) {
          return;
        } else {
          practiceStore.setPrePostStatus({
            isSendAnswer: true,
          });
          isSendAnswer.value = true;
          isShowDialogAnswer.value = true;
        }
      }

      practiceStore.saveQuizByQuestion(
        questionList.value[selectedQuestion.value].questionId,
        answer.index,
        routerName.value
      );

      questionList.value[selectedQuestion.value].selectedAnswer = answer.choice;
      questionList.value[selectedQuestion.value].selectedAnswerIndex = index;
      questionList.value[selectedQuestion.value].isSelectedAnswer = true;

      if (answer.index == questionList.value[selectedQuestion.value].correctAnswer) {
        questionList.value[selectedQuestion.value].isCorrectAnswer = true;
      } else {
        questionList.value[selectedQuestion.value].isCorrectAnswer = false;
      }

      practiceStore.setTestQuestionArray(questionList.value);
    };

    const funcNextQuestion = () => {
      const practiceStore = usePracticeStore();

      if (selectedQuestion.value < questionList.value.length - 1) {
        if (routerName.value == "quizMid" || routerName.value == "quizPost") {
          isShowDialogAnswer.value = false;
          isSendAnswer.value = false;

          practiceStore.setPrePostStatus({
            isSendAnswer: false,
          });
        }

        selectedQuestion.value++;
        practiceStore.setPrePostCurrentQuestion(selectedQuestion.value);
        return;
      }

      // if (routerName.value == "quizMid" || routerName.value == "quizPost") {
      //   isShowDialogAnswer.value = false;
      //   funcSendAnswer();
      // }
    };

    const funcPerviousQuestion = () => {
      if (selectedQuestion.value > 0) {
        selectedQuestion.value--;
      }
    };

    const funcCheckSendAnswer = () => {
      isShowDialogQuestionList.value = true;
    };

    const funcSendAnswer = async () => {
      $q.loading.show();

      if (listenTimer) {
        clearInterval(listenTimer);
      }

      isShowDialogAnswer.value = false;

      await funcSavePrePostLog();

      await funcGetRewardByScore();

      $q.loading.hide();

      isFinishPrePostTest.value = true;

      if (routerName.value == "quizMid" || routerName == "quizPost") {
        isShowDialogAnswer.value = false;
      }

      setTimeout(() => {
        getGiftBoxProgress();
      }, 1000);
    };

    const isShowRewardItem = ref(false);
    const isShowRewardCoin = ref(false);
    const funcSavePrePostLog = async () => {
      const practiceStore = usePracticeStore();
      const studentStire = useStudentStore();

      try {
        if (listenTimer) {
          clearInterval(listenTimer);
        }

        if (
          routerName.value == "pretest" ||
          routerName.value == "quizMid" ||
          routerName.value == "quizPost"
        ) {
          isShowRewardCoin.value = true;
        } else {
          isShowRewardItem.value = true;
        }

        let score = questionList.value.filter((x) => x.isCorrectAnswer).length;

        let currentSendAnswer = questionList.value.filter((x) => x.isSelectedAnswer)
          .length;

        isShowDialogQuestionList.value = false;

        const POSTDATA = {
          studentId: studentStire.studentId,
          testType: routerName.value,
          score: score,
          schoolId: studentStire.schoolId,
          courseId: studentStire.courseId,
          currentQuestion: currentSendAnswer,
        };

        let response = await practiceHooks.saveprepostlog(POSTDATA);

        if (response == "error") {
          throw new Error("error");
        }

        practiceStore.setPrePostStatus({
          isStartPrePostTest: true,
          isFinishPrePostTest: true,
          isTimeout: isTimeout.value,
          isGetRewardCoin: isShowRewardCoin.value,
          isGetRewardItem: isShowRewardItem.value,
        });
      } catch (e) {
        $router.replace("lobby");
        $q.loading.hide();
      }
    };

    const funcFinishPrePostTest = async () => {
      isFinishPrePostTest.value = true;

      setTimeout(() => {
        getGiftBoxProgress();
      }, 1000);
    };

    const funcBackToLobby = () => {
      const practiceStore = usePracticeStore();

      $q.loading.show();

      if (listenTimer) {
        clearInterval(listenTimer);
      }

      if (isCheckIsNotQuiz.value) {
        practiceStore.clearPrePost();
      }

      setTimeout(() => {
        $router.replace("lobby");
        $q.loading.hide();
      }, 1000);
    };

    const funcOutOfPrePostTest = () => {
      isShowDialogOutOfPrePost.value = true;
    };

    const isShowButtonConfirmOutOfPrePost = ref(false);
    const textConfirmOutOfPrePost = ref("");
    const funcCheckTextOutOfPrePost = (text) => {
      if (text != "Confirm") {
        isShowButtonConfirmOutOfPrePost.value = false;
        return;
      }

      isShowButtonConfirmOutOfPrePost.value = true;
    };

    const funcCancelOutOfPrePost = () => {
      isShowDialogOutOfPrePost.value = false;
      textConfirmOutOfPrePost.value = "";
      isShowButtonConfirmOutOfPrePost.value = false;
    };

    const funcConfirmOutOfPrePost = async () => {
      const practiceStore = usePracticeStore();

      try {
        isShowDialogOutOfPrePost.value = false;

        // await funcSavePrePostLog();

        $q.loading.show();

        if (listenTimer) {
          clearInterval(listenTimer);
        }

        if (isCheckIsNotQuiz.value) {
          practiceStore.clearPrePost();
        }

        setTimeout(() => {
          $router.replace("lobby");
          $q.loading.hide();
        }, 1000);
      } catch (e) {
        isShowDialogOutOfPrePost.value = true;
        $q.loading.hide();
      }
    };

    let listenProgress = null;
    const isShowButtonStart = ref(false);
    const isStartAnimationProgress = ref(false);
    const funcGetPrePostTest = async () => {
      const practiceStore = usePracticeStore();

      $q.loading.show();

      let response = await practiceStore.getEncryptedTestQuestions(routerName.value);

      if (response.length) {
        questionList.value = response;

        let findFinishQuestion = questionList.value.every((item) => item.isDone);

        if (findFinishQuestion) {
          funcSendAnswer();
          return;
        }

        selectedQuestion.value = practiceStore.prePostObject.currentQuestion;

        $q.loading.hide();

        if (isContinueTest.value) {
          isShowButtonStart.value = true;
        } else {
          setTimeout(() => {
            let sec = 0;

            isStartAnimationProgress.value = true;
            listenProgress = setInterval(() => {
              if (sec >= 5) {
                clearInterval(listenProgress);
                isShowButtonStart.value = true;
              }
              sec++;
            }, 1000);
          }, 1000);
        }
      } else {
        $q.loading.hide();
      }
    };

    const funcGetPrePostReward = async () => {
      const practiceStore = usePracticeStore();

      $q.loading.show();

      try {
        await practiceStore.getTestReward(routerName.value);
      } catch (e) {
        $q.loading.hide();
      }
    };

    const funcGetRewardByScore = async () => {
      const practiceStore = usePracticeStore();
      let score = 0;

      showAllGiftBoxItem.value = [];

      giftBoxItemList.value = [[], [], []];

      score = questionList.value.filter((x) => x.isCorrectAnswer).length;

      if (practiceStore.prePostStatus.isGetRewardItem) {
        let giftPercentage1 = Math.round(questionList.value.length * 0.4);
        let giftPercentage2 = Math.round(questionList.value.length * 0.6);
        let giftPercentage3 = Math.round(questionList.value.length * 0.8);

        if (score >= giftPercentage1) {
          for (let i = 0; i < practiceStore.prePostReward.reward[0].reward.length; i++) {
            let data = practiceStore.prePostReward.reward[0].reward[i];

            if (data.type == "coin") {
              if (data.coin != 0) {
                giftBoxItemList.value[0].push(data);
              }
            } else {
              giftBoxItemList.value[0].push(data);
            }
          }
        }

        if (score >= giftPercentage2) {
          for (let i = 0; i < practiceStore.prePostReward.reward[1].reward.length; i++) {
            let data = practiceStore.prePostReward.reward[1].reward[i];

            if (data.type == "coin") {
              if (data.coin != 0) {
                giftBoxItemList.value[1].push(data);
              }
            } else {
              giftBoxItemList.value[1].push(data);
            }
          }
        }

        if (score >= giftPercentage3) {
          for (let i = 0; i < practiceStore.prePostReward.reward[2].reward.length; i++) {
            let data = practiceStore.prePostReward.reward[2].reward[i];

            if (data.type == "coin") {
              if (data.coin != 0) {
                giftBoxItemList.value[2].push(data);
              }
            } else {
              giftBoxItemList.value[2].push(data);
            }
          }
        }

        let setNewCoin = {
          amount: 0,
          name: "coin",
          type: "coin",
        };

        let setNewItemList = [];

        for (let i = 0; i < giftBoxItemList.value.length; i++) {
          let data = giftBoxItemList.value[i];

          for (let xx = 0; xx < data.length; xx++) {
            let data2 = data[xx];

            if (data2.type == "coin") {
              setNewCoin.amount += data2.coin;
            } else {
              setNewItemList.push(data2);
            }
          }
        }

        showAllGiftBoxItem.value = [...[setNewCoin], ...setNewItemList];
      }

      if (practiceStore.prePostStatus.isGetRewardCoin) {
        let sumCoin = Number(score) * Number(practiceStore.prePostReward.coin);

        let newData = {
          amount: sumCoin,
          name: "coin",
          type: "coin",
        };

        showAllGiftBoxItem.value.push(newData);
      }

      await practiceStore.saveTestReward(routerName.value, showAllGiftBoxItem.value);
    };

    const giftBoxItemList = ref([[], [], []]);
    const showAllGiftBoxItem = ref([]);
    const isAnimationGetGiftBox = ref(false);
    const isShowGetGiftBox = ref(false);
    const isShowButtonBackToLobby = ref(false);
    const numberGiftBox = ref(0);
    const progressScore = ref(0);
    const sumScore = ref(0);
    const sumAnimationCoin = ref(0);
    let getGiftBox1 = false;
    let getGiftBox2 = false;
    let getGiftBox3 = false;
    const isShowAllReward = ref(false);
    let setIntervalRunScoreAndCoin = null;
    const getGiftBoxProgress = () => {
      const practiceStore = usePracticeStore();

      let score = 0;

      isShowButtonBackToLobby.value = false;

      let giftPercentage1 = Math.round(questionList.value.length * 0.4);
      let giftPercentage2 = Math.round(questionList.value.length * 0.6);
      let giftPercentage3 = Math.round(questionList.value.length * 0.8);

      score = questionList.value.filter((x) => x.isCorrectAnswer).length;

      if (practiceStore.prePostStatus.isGetRewardItem) {
        if (!getGiftBox1) {
          if (score >= giftPercentage1) {
            getGiftBox1 = true;
            numberGiftBox.value = 1;

            isAnimationGetGiftBox.value = true;

            setIntervalRunScoreAndCoin = setInterval(() => {
              if (sumScore.value >= giftPercentage1) {
                sumScore.value = giftPercentage1;
                clearInterval(setIntervalRunScoreAndCoin);
                isShowGetGiftBox.value = true;
                setTimeout(() => {
                  isShowGetGiftBox.value = false;
                  setTimeout(() => {
                    getGiftBoxProgress();
                  }, 500);
                }, 1500);
              } else {
                sumScore.value++;
              }
            }, 50);

            return;
          }
        }

        if (!getGiftBox2) {
          if (score >= giftPercentage2) {
            getGiftBox2 = true;

            numberGiftBox.value = 2;

            setIntervalRunScoreAndCoin = setInterval(() => {
              if (sumScore.value >= giftPercentage2) {
                sumScore.value = giftPercentage2;
                clearInterval(setIntervalRunScoreAndCoin);
                isShowGetGiftBox.value = true;
                setTimeout(() => {
                  isShowGetGiftBox.value = false;
                  setTimeout(() => {
                    getGiftBoxProgress();
                  }, 500);
                }, 1500);
              } else {
                sumScore.value++;
              }
            }, 50);

            return;
          }
        }

        if (!getGiftBox3) {
          if (score >= giftPercentage3) {
            getGiftBox3 = true;
            numberGiftBox.value = 3;

            setIntervalRunScoreAndCoin = setInterval(() => {
              if (sumScore.value >= giftPercentage3) {
                sumScore.value = giftPercentage3;
                clearInterval(setIntervalRunScoreAndCoin);
                isShowGetGiftBox.value = true;
                setTimeout(() => {
                  isShowGetGiftBox.value = false;
                  setTimeout(() => {
                    getGiftBoxProgress();
                  }, 500);
                }, 1500);
              } else {
                sumScore.value++;
              }
            }, 50);

            return;
          }
        }
      }

      setIntervalRunScoreAndCoin = setInterval(() => {
        if (sumScore.value >= score) {
          sumScore.value = score;
          clearInterval(setIntervalRunScoreAndCoin);
          if (practiceStore.prePostStatus.isGetRewardItem) {
            if (getGiftBox1 || getGiftBox2 || getGiftBox3) {
              isShowAllReward.value = true;
              setTimeout(() => {
                isShowAllReward.value = false;
                setTimeout(() => {
                  isShowButtonBackToLobby.value = true;
                }, 500);
              }, 5000);
              return;
            }
          }

          isShowButtonBackToLobby.value = true;
        } else {
          sumScore.value++;
          sumAnimationCoin.value += Number(practiceStore.prePostReward.coin);
        }
      }, 50);
    };

    const isContinueTest = ref(false);
    const funcCheckPrePostTest = async () => {
      const practiceStore = usePracticeStore();

      $q.loading.show();

      let response = await practiceStore.checkTestingMode();

      console.log("*** response: ", response);

      if (response.isContinue) {
        isContinueTest.value = true;
      }

      if (response.testType != routerName.value || !response.isShowPopupPretest) {
        $q.loading.show();

        if (listenTimer) {
          clearInterval(listenTimer);
        }

        practiceStore.clearPrePost();

        setTimeout(() => {
          $router.replace("lobby");
          $q.loading.hide();
        }, 1000);
        return;
      }
    };
    // #endregion Function

    // #region Computed
    const showSumCoin = computed(() => {
      const practiceStore = usePracticeStore();

      let score = questionList.value.filter((x) => x.isCorrectAnswer).length;
      let sumCoin = score * practiceStore.prePostReward.coin;

      return sumCoin;
    });

    const isShowButtonSendAnswer = computed(() => {
      let isShow = false;

      let isSelectedAnswer = questionList.value.every((x) => x.isSelectedAnswer);

      if (isEnableSendAnswerButton.value && isSelectedAnswer) {
        isShow = true;
      }

      return isShow;
    });

    const showAnswerDetails = computed(() => {
      let find = questionList.value[selectedQuestion.value];

      let newData = {
        answer: "",
        currentAnswer: {
          choice: "",
          index: null,
        },
        description: "",
        isCorrectAnswer: false,
      };

      if (questionList.value.length) {
        newData.answer = find.selectedAnswer;
        newData.currentAnswer = find.choices.find((x) => x.index == find.correctAnswer);

        newData.description = find.description;

        newData.isCorrectAnswer = find.isCorrectAnswer;
      }

      return newData;
    });

    const isCheckIsNotQuiz = computed(() => {
      let isCheck = false;

      if (
        routerName.value == "pretest" ||
        routerName.value == "posttest" ||
        routerName.value == "midterm"
      ) {
        isCheck = true;
      }

      return isCheck;
    });
    // #endregion

    const routerName = ref("prepost");
    onMounted(async () => {
      const systemStore = useSystemStore();
      const practiceStore = usePracticeStore();

      systemStore.setRouter("exam");

      routerName.value = $route.name;

      if (routerName.value != practiceStore.prePostObject.type) {
        practiceStore.clearPrePost();
      }

      await funcCheckPrePostTest();
      await funcGetPrePostReward();

      funcCountdownStart();
    });

    onBeforeUnmount(() => {
      if (listenProgress) {
        clearInterval(listenProgress);
      }

      if (listenTimer) {
        clearInterval(listenTimer);
      }
    });

    return {
      // Store
      practiceStore,

      // Data
      routerName,
      pathStorage,
      selectedQuestion,
      questionList,
      progressScore,
      sumScore,
      giftBoxItemList,
      numberGiftBox,
      showAllGiftBoxItem,
      sumAnimationCoin,
      countdownTime,
      textConfirmOutOfPrePost,
      expansionList,

      // Function
      funcSelectedAnswer,
      funcNextQuestion,
      funcPerviousQuestion,
      funcStartPrePostTest,
      funcCheckSendAnswer,
      funcSendAnswer,
      funcMarkQuestion,
      funcFinishPrePostTest,
      funcBackToLobby,
      funcOutOfPrePostTest,
      getGiftBoxProgress,
      funcConfirmOutOfPrePost,
      funcConfirmStartPrePostTest,
      funcCancelStartPrePost,
      funcCheckTextOutOfPrePost,
      funcCancelOutOfPrePost,
      funcSelectedExpansionList,

      // Boolearn
      isStartPrePostTest,
      isShowButtonStart,
      isShowDialogQuestionList,
      isFinishPrePostTest,
      isTimeout,
      isAnimationGetGiftBox,
      isShowGetGiftBox,
      isShowButtonBackToLobby,
      isStartAnimationProgress,
      isShowDialogOutOfPrePost,
      isShowAllReward,
      isShowRewardCoin,
      isShowRewardItem,
      isShowDialogStartPrePost,
      isShowButtonConfirmOutOfPrePost,
      isEnableSendAnswerButton,
      isShowDialogAnswer,
      isSendAnswer,

      // Computed
      isShowButtonSendAnswer,
      showSumCoin,
      showAnswerDetails,
      isCheckIsNotQuiz,

      // Timer
      timerSendAnswer,
      timer,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-timer {
  width: 130px;
  background-color: #fff;
  border-radius: 50px;
  border: 2px solid #4a261b;
  color: #4a261b;
}

// #region หน้าแรก
.box-start-container,
.box-finish-container {
  width: 600px;
  max-height: 700px;
  min-height: fit-content;
  border: 5px solid #3277c9;
  box-shadow: 0px 7px 0px 0px #3277c9;
  border-radius: 20px;
  color: #2c2c2c;
}

.box-start-container.mobile {
  max-width: 500px;
  width: 100%;
  min-width: 320px;
  height: fit-content;
  border: 4px solid #3277c9;
  box-shadow: 0px 12px 0px 0px #3277c9;
  border-radius: 20px;
}

.sub-start-container,
.sub-finish-container {
  width: 100%;
  height: 100%;
  border: 5px dashed #3277c9;
  border-radius: 20px;
}

.sub-start-container.mobile {
  border: 3px dashed #3277c9;
  border-radius: 12px;
}

.box-quiz-header {
  width: 630px;
  height: 110px;
  background-color: #3277c9;
  border-radius: 10px;
  font-family: "mali-b";
  color: #fff;
}

.box-quiz-header.mobile {
  max-width: 550px;
  width: 100%;
  min-width: 300px;
  height: 85px;
  background-color: #3277c9;
  border-radius: 10px;
  font-family: "mali-b";
  color: #fff;
}

.box-quiz-header .text-header {
  font-size: 36px;
}

.box-quiz-header .text-header.mobile {
  font-size: 24px;
}

.box-quiz-header .text-sub-header {
  font-size: 24px;
}

.box-quiz-header .text-sub-header.mobile {
  font-size: 18px;
}

.box-condition-giftbox {
  max-width: 340px;
  width: 100%;
  min-width: fit-content;
  border: 3px solid #d6e8ff;
  border-radius: 15px;
  margin: auto;
}

.box-condition-giftbox-quiz {
  max-width: 280px;
  width: 100%;
  border: 3px solid #d6e8ff;
  border-radius: 15px;
  margin: auto;
}

.box-backdrop-circle {
  top: 42%;
  width: 65px;
  height: 65px;
  background-color: #d6e8ff;
  border-radius: 50%;
}

.box-progress-start {
  width: 280px;
  height: 7px;
  background-color: #fff;
  border: 1px solid #c7dded;
  border-radius: 20px;
}

.box-progress-start.mobile {
  min-width: 280px;
}

.box-progress-start .progress {
  height: 100%;
  border: 1px solid #c7dded;
  background-color: #3277c9;
  border-radius: 20px;
  animation: progressStart 6s linear forwards;
}

@keyframes progressStart {
  0% {
    width: 0%;
  }

  80% {
    width: 100%;
  }

  81% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

// #endregion

// #region หน้าทำแบบทดสอย
.box-question-container {
  min-height: 700px;
  height: 100%;
  max-height: fit-content;
  border: 1px solid #3277c9;
  border-radius: 5px;
}

.box-question-number {
  width: 70px;
  background-color: #3277c9;
  border-radius: 5px;
}

.button-pin-question {
  height: fit-content;
  background-color: #e7e7e7;
  border-radius: 50px;
  border: 1px solid #e7e7e7;
  padding: 5px 20px;
  color: #2c2c2c;
  cursor: pointer;
}

.button-pin-question.mobile {
  padding: 5px 10px;
}

.button-pin-question.selected {
  background-color: #ff3a3a;
  color: #fff;
}

.text-question-underline {
  color: #2c2c2c;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.box-choices-main {
  max-height: fit-content;
  min-height: 40px;
  border: 1px solid #2c2c2c96;
  border-radius: 2px;
}

.box-choices-main.selected {
  background-color: #dbf8ff;
}

.box-choices-main:hover {
  background-color: #cdedff;
}

.box-choices-main:active {
  background-color: #ffc42c;
}

.box-choices-main.active {
  background-color: #ffc42c;
}

.box-choices-main.correct {
  background-color: #d7ffb8;
}

.box-choices-main.incorrect {
  background-color: #ffdfe0;
}

.sub-icon-choices {
  width: 40px;
}

.box-question-list {
  background-color: #3277c9;
  border-radius: 5px;
  height: 700px;
}

.box-question-menu {
  height: 30px;
  background-color: #fff;
  color: #2c2c2c;
  border: 1px solid #fff;
  border-radius: 1px;
  overflow: hidden;
}

.box-question-menu.selected {
  border: 1px solid #000 !important;
}

.box-question-menu.mark::before {
  content: "";
  position: absolute;
  top: -10px;
  left: 80%;
  width: 20px;
  height: 20px;
  background-color: #ff3a3a;
  transform: rotate(45deg);
}

.box-question-menu.answered {
  background-color: #5ac149;
  border: 1px solid #5ac149;
}

.box-scroll-question-list {
  height: fit-content;
  overflow-y: scroll;
}

.box-scroll-question-list.mobile {
  max-height: 250px;
  overflow-y: scroll;
}

.box-scroll-question-list::-webkit-scrollbar {
  width: 5px;
}

.box-scroll-question-list::-webkit-scrollbar-track {
  background: transparent;
}

.box-scroll-question-list::-webkit-scrollbar-thumb {
  background: #f1f1f1;
}

.giftbox-progress-container {
  width: 100%;
  height: 20px;
  background-color: #1c4475;
  border-radius: 10px;
  border: 2px solid #e19134;
  margin: auto;
  overflow: hidden;
}

.giftbox-progress-container .progress {
  height: 100%;
  background: linear-gradient(180deg,
      #2ec0ff 0%,
      #55ccff 49.48%,
      rgba(46, 192, 255, 0.48) 100%);
  border-radius: 2px;
  transition: width 2s;
}

// #endregion

// #region Mobile
.box-dialog-question-list {
  width: 330px;
  background-color: #3277c9;
  border-radius: 5px;
  color: #fff;
}

.animation-pull-up-1 {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: animationPullUp1 1s linear forwards 1s;
  -webkit-animation: animationPullUp1 1s linear forwards 1s;
  -moz-animation: animationPullUp1 1s linear forwards 1s;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.animation-pull-up-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: animationPullUp2 1s linear forwards 1.5s;
  -webkit-animation: animationPullUp2 1s linear forwards 1.5s;
  -moz-animation: animationPullUp2 1s linear forwards 1.5s;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.animation-pull-up-3 {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: animationPullUp3 1.5s linear forwards 1s;
  -webkit-animation: animationPullUp3 1.5s linear forwards 1s;
  -moz-animation: animationPullUp3 1.5s linear forwards 1s;
  transform: translate(-50%, -50%) rotate(15deg) scale(0);
  opacity: 0;
}

.animation-pull-up-item-3 {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: animationPullUpItem3 1.5s linear forwards 1.5s;
  -webkit-animation: animationPullUpItem3 1.5s linear forwards 1.5s;
  -moz-animation: animationPullUpItem3 1.5s linear forwards 1.5s;
  transform: translate(-80%, -50%) rotate(-10deg) scale(0);
  opacity: 0;
}

@keyframes animationPullUp1 {
  0% {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    opacity: 0;
  }

  50% {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -130%);
    -webkit-transform: translate(-50%, -130%);
    opacity: 1;
  }
}

@keyframes animationPullUp2 {
  0% {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    opacity: 0;
  }

  50% {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    opacity: 0;
  }

  100% {
    transform: translate(-50%, -130%);
    -webkit-transform: translate(-50%, -130%);
    opacity: 1;
  }
}

@keyframes animationPullUp3 {
  0% {
    transform: translate(-150%, -50%) rotate(15deg) scale(0);
    -webkit-transform: translate(-150%, -50%) rotate(15deg) scale(0);
    opacity: 0;
  }

  50% {
    transform: translate(-150%, -50%) rotate(15deg) scale(0);
    -webkit-transform: translate(-150%, -50%) rotate(15deg) scale(0);
    opacity: 0;
  }

  100% {
    transform: translate(-150%, -130%) rotate(-15deg) scale(1);
    -webkit-transform: translate(-150%, -130%) rotate(-15deg) scale(1);
    opacity: 1;
  }
}

@keyframes animationPullUpItem3 {
  0% {
    transform: translate(-10%, -50%) rotate(-10deg) scale(0);
    -webkit-transform: translate(-10%, -50%) rotate(-10deg) scale(0);
    opacity: 0;
  }

  50% {
    transform: translate(-10%, -50%) rotate(-10deg) scale(0);
    -webkit-transform: translate(-10%, -50%) rotate(-10deg) scale(0);
    opacity: 0;
  }

  100% {
    transform: translate(-10%, -115%) rotate(15deg) scale(1);
    -webkit-transform: translate(-10%, -115%) rotate(15deg) scale(1);
    opacity: 1;
  }
}

.animation-star-light {
  animation: starLight 0.7s linear infinite;
  -webkit-animation: starLight 0.7s linear infinite;
  -moz-animation: starLight 0.7s linear infinite;
}

@keyframes starLight {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.box-item-gift {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 4px solid #764517;
  border-radius: 10px;
  overflow: hidden;
}

.box-item-gift.show-all {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 4px solid #764517;
  border-radius: 10px;
  overflow: hidden;
}

.box-item-gift.show-all.mobile {
  width: 80px;
  height: 80px;
  background-color: #fff;
  border: 2px solid #764517;
  border-radius: 10px;
  overflow: hidden;
}

.text-coin {
  font-size: 32px;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
  color: #fff;
}

.text-coin-start {
  color: #4a261b;
  font-size: 21px;
  text-shadow: rgb(255, 255, 255) 3px 0px 0px, rgb(255, 255, 255) 2.83487px 0.981584px 0px,
    rgb(255, 255, 255) 2.35766px 1.85511px 0px, rgb(255, 255, 255) 1.62091px 2.52441px 0px,
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

.text-coin-finish {
  font-size: 50px;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
  color: #fff;
}

.text-coin-finish.mobile {
  font-size: 32px;
}

.animation-light {
  animation: lightBackdrop 1s infinite;
  -webkit-animation: lightBackdrop 1s infinite;
  opacity: 1;
}

@keyframes lightBackdrop {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.text-countdown-time {
  color: #fff;
  text-shadow: rgb(162, 162, 162) 2px 0px 0px, rgb(162, 162, 162) 1.75517px 0.958851px 0px,
    rgb(162, 162, 162) 1.0806px 1.68294px 0px, rgb(162, 162, 162) 0.141474px 1.99499px 0px,
    rgb(162, 162, 162) -0.832294px 1.81859px 0px,
    rgb(162, 162, 162) -1.60229px 1.19694px 0px,
    rgb(162, 162, 162) -1.97998px 0.28224px 0px,
    rgb(162, 162, 162) -1.87291px -0.701566px 0px,
    rgb(162, 162, 162) -1.30729px -1.5136px 0px,
    rgb(162, 162, 162) -0.421592px -1.95506px 0px,
    rgb(162, 162, 162) 0.567324px -1.91785px 0px,
    rgb(162, 162, 162) 1.41734px -1.41108px 0px,
    rgb(162, 162, 162) 1.92034px -0.558831px 0px;
}

.text-send-answer-time {
  color: #fff;
  text-shadow: rgb(162, 162, 162) 2px 0px 0px, rgb(162, 162, 162) 1.75517px 0.958851px 0px,
    rgb(162, 162, 162) 1.0806px 1.68294px 0px, rgb(162, 162, 162) 0.141474px 1.99499px 0px,
    rgb(162, 162, 162) -0.832294px 1.81859px 0px,
    rgb(162, 162, 162) -1.60229px 1.19694px 0px,
    rgb(162, 162, 162) -1.97998px 0.28224px 0px,
    rgb(162, 162, 162) -1.87291px -0.701566px 0px,
    rgb(162, 162, 162) -1.30729px -1.5136px 0px,
    rgb(162, 162, 162) -0.421592px -1.95506px 0px,
    rgb(162, 162, 162) 0.567324px -1.91785px 0px,
    rgb(162, 162, 162) 1.41734px -1.41108px 0px,
    rgb(162, 162, 162) 1.92034px -0.558831px 0px;
}

// #endregion

// #region Container Quiz Dialog answer
.box-answer {
  min-height: 200px;
  max-height: fit-content;
  border-radius: 30px 30px 0px 0px;
  box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.1);
}

.box-answer.correct {
  background-color: #d7ffb8;
}

.box-answer.incorrect {
  background-color: #ffdfe0;
}

.box-finish-quiz-container {
  max-width: 1000px;
  width: 100%;
  border: 5px solid #3277c9;
  border-radius: 20px;
  margin: auto;
}

.box-finish-quiz-container.mobile {
  background-color: transparent;
  border: none;
}

.text-your-reward {
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px;
}

.box-answers-exercises {
  border-radius: 12px;
  background-color: #d3efff;
}

.box-answers-exercises.mobile {
  border-radius: none;
  background-color: transparent;
}

.box-scroll-answer-details {
  height: 400px;
  overflow: auto;
}

.box-scroll-answer-details.mobile {
  height: 300px;
  overflow: auto;
}

.box-scroll-answer-details::-webkit-scrollbar {
  width: 5px;
}

.box-scroll-answer-details::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 10px;
}

.box-scroll-answer-details.mobile::-webkit-scrollbar-track {
  background: #d3d3d3;
  border-radius: 10px;
}

.box-scroll-answer-details::-webkit-scrollbar-thumb {
  background: #3277c9;
  border-radius: 10px;
}

.box-expansion {
  width: 100%;
  border: 1px solid #d9e0e8;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}

.box-answer-details {
  width: 100%;
  border-top: 1px solid #d9e0e8;
}

.text-question-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  height: 30px;
}

// #endregion</style>
