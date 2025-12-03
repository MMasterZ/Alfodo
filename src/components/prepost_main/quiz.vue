<template>
  <div class="brx">
    <!-- #region Desktop -->
    <div v-if="$q.platform.is.desktop">
      <!-- #region หน้าแรก -->
      <div class="q-pa-md" v-if="!isStartPrePostTest && !isFinishPrePostTest">
        <div class="row justify-center q-mt-xl">
          <div class="box-start-container q-pa-md">
            <div class="sub-start-container relative-position q-pa-md q-px-xl">
              <!-- #region Header Pretest Posttest Midterm -->
              <div class="q-my-md font-mali-b" align="center">
                <div class="f24">
                  <span v-if="routerName == 'pretest'">แบบทดสอบก่อนเรียน</span>
                  <span v-if="routerName == 'midterm'"
                    >แบบทดสอบกลางภาคเรียน</span
                  >
                  <span v-if="routerName == 'posttest'"
                    >แบบทดสอบปลายภาคเรียน</span
                  >
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Quiz -->
              <div
                class="box-quiz-header absolute-top row justify-center items-center"
                style="left: 50%; top: 20px; transform: translateX(-50%)"
              >
                <div>
                  <div class="text-header" align="center">
                    <span>Quiz</span>
                  </div>
                  <div class="text-sub-header">
                    <span v-if="routerName == 'quizPost'"
                      >แบบทดสอบก่อนสอบปลายภาคเรียน</span
                    >
                    <span v-if="routerName == 'quizMid'"
                      >แบบทดสอบก่อนสอบกลางภาคเรียน</span
                    >
                  </div>
                </div>
              </div>
              <div
                style="height: 120px"
                v-if="routerName == 'quizPost' || routerName == 'quizMid'"
              ></div>
              <!-- #endregion -->
              <div class="q-pt-md font-mali-m f20">
                <div class="row">
                  <div class="col">
                    <span>จำนวนข้อสอบ</span>
                  </div>
                  <div class="">
                    <span>{{ `${questionList.length} ข้อ` }}</span>
                  </div>
                </div>
                <div class="row q-mt-sm">
                  <div class="col">
                    <span>เวลาในการสอบ</span>
                  </div>
                  <div class="">
                    <span>{{
                      `${routerName == "pretest" ? "30" : "20"} นาที`
                    }}</span>
                  </div>
                </div>
                <q-separator class="q-my-lg bg-black"></q-separator>
                <div class="f14" align="left">
                  <div>
                    <span class="font-mali-b">ข้อบ่งชี้</span>
                  </div>
                  <div class="row q-my-md">
                    <div class="col-1" style="width: 17px">1.</div>
                    <div class="col">
                      {{
                        `นักเรียนจะสามารถส่งข้อสอบได้ก็ต่อเมื่อทำข้อสอบครบทุกข้อ
                      และเหลือเวลาในการสอบ ${
                        routerName == "pretest" ? "15" : "10"
                      } นาที`
                      }}
                    </div>
                  </div>
                  <div class="row q-my-md">
                    <div class="col-1" style="width: 17px">2.</div>
                    <div class="col">
                      กรณีที่หมดเวลาสอบ และนักเรียนยังไม่ได้กดส่งข้อสอบ
                      ระบบจะทำการส่งข้อสอบให้อัตโนมัติ
                    </div>
                  </div>
                  <div class="q-pb-lg q-px-md q-pt-sm">
                    <div class="box-condition-giftbox f12 font-mali-m q-pa-xs">
                      <div
                        class="row relative-position"
                        v-if="
                          routerName == 'posttest' || routerName == 'midterm'
                        "
                      >
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-1.png`"
                          ></q-img>
                          <div class="">
                            {{
                              `${Math.round(questionList.length * 0.4)} คะแนน`
                            }}
                          </div>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-2.png`"
                          ></q-img>
                          <div>
                            {{
                              `${Math.round(questionList.length * 0.6)} คะแนน`
                            }}
                          </div>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-3.png`"
                          ></q-img>
                          <div>
                            {{
                              `${Math.round(questionList.length * 0.8)} คะแนน`
                            }}
                          </div>
                        </div>
                      </div>

                      <div
                        class="row relative-position justify-center items-center"
                        v-else
                      >
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div
                          class="row q-pa-sm q-pb-lg justify-center items-center col-12"
                        >
                          <div class="q-mx-sm relative-position">
                            <q-img
                              width="45px"
                              src="/images/prepost/icon-winner-coin.png"
                            ></q-img>
                            <span
                              class="absolute-center text-coin-start"
                              style="top: 100%"
                              align="center"
                            >
                              {{ practiceStore.prePostReward.coin }}
                            </span>
                          </div>
                          <div>
                            <span class="f16 font-mali-b"
                              >x ต่อจำนวนข้อที่ถูก</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div align="center" class="q-mt-md">
                    <div
                      class="relative-position row justify-center"
                      style="height: 17px"
                    >
                      <div align="left" v-if="!isShowButtonStart">
                        <div class="box-progress-start">
                          <div
                            class="progress"
                            v-if="isStartAnimationProgress"
                          ></div>
                        </div>
                      </div>

                      <div
                        class="col-12 absolute-center"
                        style="top: 0px"
                        v-if="isShowButtonStart"
                      >
                        <span class="f14"
                          >ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</span
                        >
                      </div>
                    </div>

                    <div class="relative-position">
                      <q-img
                        width="280px"
                        :src="`/images/prepost/button-start-prepost${
                          isShowButtonStart ? '' : '-disable'
                        }.png`"
                        :class="isShowButtonStart ? 'cursor-pointer' : ''"
                        no-spinner=""
                        no-transition=""
                        @click="
                          isShowButtonStart ? funcStartPrePostTest() : null
                        "
                      ></q-img>
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
      <div
        class="q-pa-md animate__animated animate__fadeIn"
        v-if="isStartPrePostTest && !isFinishPrePostTest"
        align="center"
        style="animation-duration: 1s"
      >
        <div class="row justify-center" align="center">
          <div class="col-6 q-pa-sm">
            <div class="box-question-container q-pa-md" align="left">
              <div class="row fit">
                <div class="col-12">
                  <div class="row justify-between q-pa-xs">
                    <div class="col-auto">
                      <div
                        class="row justify-center items-center font-mali-sb box-question-number q-px-sm q-py-xs f16 text-white"
                        align="center"
                      >
                        {{ `Q${selectedQuestion + 1}/${questionList.length}` }}
                      </div>
                    </div>
                    <div
                      class="relative-position button-pin-question f16 font-mali-sb"
                      v-ripple
                      :class="
                        questionList[selectedQuestion].isMark ? 'selected' : ''
                      "
                      @click="funcMarkQuestion()"
                      style="color: #2c2c2c"
                    >
                      <q-icon
                        name="fas fa-thumbtack"
                        style="transform: rotate(30deg)"
                      ></q-icon>
                      {{ `ไม่แน่ใจ` }}
                    </div>
                  </div>

                  <!-- Instruction -->
                  <div class="q-px-xs" style="margin-top: 20px">
                    <div class="fomt-mali-m f20 text-question-underline">
                      <span
                        v-html="questionList[selectedQuestion].instructionEng"
                      ></span>
                    </div>
                    <div class="font-mali-m f16 q-py-sm">
                      <span
                        v-html="questionList[selectedQuestion].instructionTh"
                      ></span>
                    </div>
                  </div>

                  <!-- Question -->
                  <div
                    class="q-pa-xs q-mt-md"
                    style="height: 200px; overflow: auto"
                  >
                    <div class="f20 font-mali-m" style="color: #2c2c2c">
                      <span
                        v-html="`${questionList[selectedQuestion].question}`"
                      ></span>
                    </div>
                  </div>
                </div>

                <div class="col-12 self-end">
                  <!-- Choices -->
                  <div class="q-pa-xs q-mb-lg">
                    <div
                      class="relative-position box-choices-main row q-mt-md q-pa-xs cursor-pointer"
                      v-for="(itemAnswer, indexAnswer) in questionList[
                        selectedQuestion
                      ].choices"
                      @click="funcSelectedAnswer(itemAnswer, indexAnswer)"
                      :class="
                        questionList[selectedQuestion].selectedAnswerIndex ===
                        indexAnswer
                          ? 'selected'
                          : ''
                      "
                      style="color: #2c2c2c"
                    >
                      <div
                        class="relative-position self-center col-1 row q-px-sm width-fit"
                        align="center"
                      >
                        <q-radio
                          dense=""
                          v-model="
                            questionList[selectedQuestion].selectedAnswerIndex
                          "
                          :val="indexAnswer"
                          @update:model-value="
                            funcSelectedAnswer(itemAnswer, indexAnswer)
                          "
                        />
                      </div>
                      <div class="col">
                        <span
                          class="q-px-sm font-mali-m relative-position f20"
                          v-html="itemAnswer.choice"
                        >
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Button Next & Pervious -->
                  <div class="q-pa-xs row justify-between" style="height: 60px">
                    <div>
                      <q-img
                        width="100px"
                        class="cursor-pointer"
                        src="/images/prepost/button-pervious-prepost.png"
                        @click="funcPerviousQuestion()"
                        v-if="selectedQuestion > 0"
                        no-spinner=""
                        no-transition=""
                      ></q-img>
                    </div>
                    <div>
                      <q-img
                        width="100px"
                        class="cursor-pointer"
                        src="/images/prepost/button-next-prepost.png"
                        @click="funcNextQuestion()"
                        v-if="selectedQuestion != questionList.length - 1"
                        no-spinner=""
                        no-transition=""
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-3 q-pa-sm" style="width: 320px">
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
                      <div
                        class="col-2 q-pa-xs"
                        style="width: 20%"
                        v-for="(item, indexQuestionList) in questionList"
                        :key="indexQuestionList"
                      >
                        <div
                          class="relative-position box-question-menu row justify-center items-center f16 font-mali-m cursor-pointer"
                          :class="[
                            selectedQuestion == indexQuestionList
                              ? 'selected'
                              : '',
                            item.isSelectedAnswer ? 'answered' : '',
                            item.isMark ? 'mark' : '',
                          ]"
                          @click="selectedQuestion = indexQuestionList"
                        >
                          {{ `Q${indexQuestionList + 1}` }}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="q-pa-xs" style="margin-top: 35px">
                    <q-separator class="bg-white"></q-separator>

                    <!-- Button Send Answer -->
                    <div class="q-py-md">
                      <q-img
                        :src="`/images/prepost/button-send-answer-prepost${
                          isShowButtonSendAnswer ? '' : '-disable'
                        }.png`"
                        no-spinner=""
                        no-transition=""
                        @click="
                          isShowButtonSendAnswer ? funcSendAnswer() : null
                        "
                        :class="isShowButtonSendAnswer ? 'cursor-pointer' : ''"
                      >
                        <div class="transparent fit">
                          <div
                            class="absolute-center row font-mali-b fit justify-center text-send-answer-time f20"
                            style="top: 60%"
                          >
                            <div
                              class="col-1 width-fit"
                              v-if="!isShowButtonSendAnswer"
                            >
                              ส่งข้อสอบ
                            </div>
                            <div
                              class="col-1"
                              style="width: 70px"
                              v-if="!isEnableSendAnswerButton"
                            >
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
                          <div
                            style="
                              width: 16px;
                              height: 16px;
                              background-color: #fff;
                            "
                          ></div>
                        </div>
                        <div class="self-center">ยังไม่ได้ตอบ</div>
                      </div>
                      <div class="row q-py-xs">
                        <div class="self-center q-pr-sm">
                          <div
                            style="
                              width: 16px;
                              height: 16px;
                              background-color: #5ac149;
                            "
                          ></div>
                        </div>
                        <div class="self-center">ตอบแล้ว</div>
                      </div>
                      <div class="row q-py-xs">
                        <div class="self-center q-pr-sm">
                          <div
                            style="
                              width: 16px;
                              height: 16px;
                              background-color: #ff3a3a;
                            "
                          ></div>
                        </div>
                        <div class="self-center">ไม่แน่ใจ</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าสรุปผล -->
      <div
        class="q-pa-md animate__animated animate__fadeIn"
        v-if="isFinishPrePostTest"
      >
        <div class="row justify-center q-mt-xl">
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
                    <q-separator
                      style="height: 1px; background-color: #3277c9"
                    ></q-separator>
                  </div>
                  <div class="q-pb-md" align="center">
                    <div class="relative-position">
                      <div
                        class="relative-position row justify-center items-center"
                      >
                        <div class="col relative-position">
                          <q-img
                            width="120px"
                            class="animate__animated animate__fadeIn"
                            style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${
                              sumScore >= Math.round(questionList.length * 0.4)
                                ? 'open'
                                : 'close'
                            }-1.png`"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div class="f16 font-mali-m">
                            {{
                              `${Math.round(questionList.length * 0.4)} คะแนน`
                            }}
                          </div>
                        </div>
                        <div class="col relative-position">
                          <q-img
                            width="120px"
                            class="animate__animated animate__fadeIn"
                            style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${
                              sumScore >= Math.round(questionList.length * 0.6)
                                ? 'open'
                                : 'close'
                            }-2.png`"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div class="f16 font-mali-m">
                            {{
                              `${Math.round(questionList.length * 0.6)} คะแนน`
                            }}
                          </div>
                        </div>

                        <div class="col relative-position">
                          <q-img
                            width="120px"
                            class="animate__animated animate__fadeIn"
                            style="animation-duration: 1s"
                            :src="`/images/prepost/giftbox-prepost-${
                              sumScore >= Math.round(questionList.length * 0.8)
                                ? 'open'
                                : 'close'
                            }-3.png`"
                            no-spinner
                            no-transition
                          ></q-img>
                          <div class="f16 font-mali-m">
                            {{
                              `${Math.round(questionList.length * 0.8)} คะแนน`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 q-mt-md self-center" v-if="isShowRewardCoin">
                  <div align="center" class="q-pt-md q-pb-md relative-position">
                    <q-img
                      width="250px"
                      src="/images/prepost/reward-banner-prepost.png"
                    ></q-img>
                  </div>

                  <div class="q-pa-md relative-position" align="center">
                    <q-img
                      width="200px"
                      src="/images/prepost/light-prepost-backdrop-coin.png"
                      class="absolute-center animation-light"
                    ></q-img>
                    <q-img
                      width="100px"
                      src="/images/prepost/icon-winner-coin.png"
                    ></q-img>
                    <div class="absolute-center" style="top: 85%">
                      <span class="text-coin-finish font-mali-b">
                        {{ sumAnimationCoin }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 self-end row justify-center items-end q-pb-sm"
                  style="height: 100px"
                  align="center"
                >
                  <q-img
                    v-if="isShowButtonBackToLobby"
                    width="180px"
                    src="/images/prepost/button-prepost-back-to-lobby.png"
                    @click="funcBackToLobby()"
                    class="cursor-pointer"
                    v-close-popup
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <div class="q-my-xs font-mali-b" align="center">
                <div class="f20">
                  <span v-if="routerName == 'pretest'">แบบทดสอบก่อนเรียน</span>
                  <span v-if="routerName == 'midterm'"
                    >แบบทดสอบกลางภาคเรียน</span
                  >
                  <span v-if="routerName == 'posttest'"
                    >แบบทดสอบปลายภาคเรียน</span
                  >
                  <span v-if="routerName == 'quizPost'"
                    >แบบทดสอบก่อนสอบปลายภาคเรียน</span
                  >
                  <span v-if="routerName == 'quizMid'"
                    >แบบทดสอบก่อนสอบกลางภาคเรียน</span
                  >
                </div>
              </div>
              <div class="q-pt-md font-mali-m f16">
                <div class="row">
                  <div class="col">
                    <span>จำนวนข้อสอบ </span>
                  </div>
                  <div class="">
                    <span>{{ `${questionList.length} ข้อ` }}</span>
                  </div>
                </div>
                <div class="row q-mt-sm">
                  <div class="col">
                    <span>เวลาในการสอบ</span>
                  </div>
                  <div class="">
                    <span>{{
                      `${routerName == "pretest" ? "30" : "20"} นาที`
                    }}</span>
                  </div>
                </div>
                <q-separator class="q-my-md bg-black"></q-separator>
                <div class="f14" align="left">
                  <div>
                    <span class="font-mali-b">ข้อบ่งชี้</span>
                  </div>
                  <div class="row q-my-sm">
                    <div class="col-1" style="width: 17px">1.</div>
                    <div class="col">
                      {{
                        `นักเรียนจะสามารถส่งข้อสอบได้ก็ต่อเมื่อทำข้อสอบครบทุกข้อ
                      และเวลาในการสอบเหลือ ${
                        routerName == "pretest" ? "15" : "10"
                      } นาที`
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

                  <div class="q-pt-sm">
                    <div class="box-condition-giftbox f12 font-mali-m q-pa-xs">
                      <div
                        class="row relative-position"
                        v-if="
                          routerName == 'posttest' || routerName == 'midterm'
                        "
                      >
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-1.png`"
                          ></q-img>
                          <div class="">
                            {{
                              `${Math.round(questionList.length * 0.4)} คะแนน`
                            }}
                          </div>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-2.png`"
                          ></q-img>
                          <div>
                            {{
                              `${Math.round(questionList.length * 0.6)} คะแนน`
                            }}
                          </div>
                        </div>
                        <div
                          class="self-center col-4 relative-position"
                          align="center"
                        >
                          <div
                            class="absolute-center box-backdrop-circle"
                          ></div>
                          <q-img
                            width="70px"
                            :src="`/images/prepost/giftbox-prepost-close-3.png`"
                          ></q-img>
                          <div>
                            {{
                              `${Math.round(questionList.length * 0.8)} คะแนน`
                            }}
                          </div>
                        </div>
                      </div>

                      <div
                        class="row relative-position justify-center items-center"
                        v-else
                      >
                        <div class="col-12" align="center">
                          <span class="font-mali-b">รางวัลที่จะได้รับ</span>
                        </div>
                        <div
                          class="row q-pa-sm q-pb-md justify-center items-center col-12"
                        >
                          <div class="q-mx-sm relative-position">
                            <q-img
                              width="45px"
                              src="/images/prepost/icon-winner-coin.png"
                            ></q-img>
                            <span
                              class="absolute-center text-coin-start"
                              style="top: 100%"
                              align="center"
                            >
                              {{ practiceStore.prePostReward.coin }}
                            </span>
                          </div>
                          <div>
                            <span class="f16 font-mali-b"
                              >x ต่อจำนวนข้อที่ถูก</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="q-mt-md q-mb-sm q-pt-md" align="center">
                    <div
                      class="relative-position row justify-center"
                      style="height: 17px"
                    >
                      <div align="left" v-if="!isShowButtonStart">
                        <div class="box-progress-start mobile">
                          <div class="progress"></div>
                        </div>
                      </div>

                      <div
                        class="col-12 absolute-center"
                        style="top: 0px"
                        v-if="isShowButtonStart"
                      >
                        <span class="f14"
                          >ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</span
                        >
                      </div>
                    </div>
                    <div class="relative-position">
                      <q-img
                        style="width: 100%"
                        :src="`/images/prepost/button-start-prepost${
                          isShowButtonStart ? '' : '-disable'
                        }.png`"
                        :class="isShowButtonStart ? 'cursor-pointer' : ''"
                        no-spinner=""
                        no-transition=""
                        @click="
                          isShowButtonStart ? funcStartPrePostTest() : null
                        "
                      ></q-img>
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
              <div
                class="row justify-center items-center font-mali-sb box-question-number q-py-xs f14 text-white"
                align="center"
              >
                {{ `Q${selectedQuestion + 1}/${questionList.length}` }}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div
                class="relative-position button-pin-question mobile f12 font-mali-sb"
                v-ripple
                :class="questionList[selectedQuestion].isMark ? 'selected' : ''"
                @click="
                  questionList[selectedQuestion].isMark =
                    !questionList[selectedQuestion].isMark
                "
              >
                <q-icon
                  name="fas fa-thumbtack"
                  style="transform: rotate(30deg); color: #2c2c2c"
                ></q-icon>
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
            <div
              class="relative-position box-choices-main row q-mt-md q-pa-xs cursor-pointer"
              v-for="(itemAnswer, indexAnswer) in questionList[selectedQuestion]
                .choices"
              @click="funcSelectedAnswer(itemAnswer, indexAnswer)"
              :class="
                questionList[selectedQuestion].selectedAnswerIndex ===
                indexAnswer
                  ? 'selected'
                  : ''
              "
              style="color: #2c2c2c"
            >
              <div
                class="relative-position self-start col-1 row q-px-sm width-fit"
                align="center"
                style="color: #2c2c2c; padding-top: 5px"
              >
                <q-radio
                  dense=""
                  v-model="questionList[selectedQuestion].selectedAnswerIndex"
                  :val="indexAnswer"
                  @update:model-value="
                    funcSelectedAnswer(itemAnswer, indexAnswer)
                  "
                />
              </div>
              <div class="col self-start q-px-sm">
                <span
                  class="font-mali-m relative-position f16"
                  v-html="itemAnswer.choice"
                >
                </span>
              </div>
            </div>
          </div>
          <div style="height: 100px"></div>
        </div>

        <div class="fixed-bottom q-pa-md bg-white">
          <div class="row justify-between" style="height: 50px">
            <div>
              <q-img
                width="100px"
                class="cursor-pointer"
                src="/images/prepost/button-pervious-prepost.png"
                @click="funcPerviousQuestion()"
                v-if="selectedQuestion > 0"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
            <div>
              <q-img
                width="100px"
                class="cursor-pointer"
                src="/images/prepost/button-next-prepost.png"
                @click="funcNextQuestion()"
                v-if="selectedQuestion != questionList.length - 1"
                no-spinner=""
                no-transition=""
              ></q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region หน้าสรุปผล -->
      <div
        class="q-pa-md animate__animated animate__fadeIn"
        v-if="isFinishPrePostTest"
      >
        <div class="row justify-center q-mt-sm">
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
                    <q-separator
                      style="height: 1px; background-color: #3277c9"
                    ></q-separator>
                  </div>
                  <div class="q-pa-sm q-pb-md" align="center">
                    <div
                      class="relative-position row justify-center items-center"
                    >
                      <div class="col relative-position">
                        <q-img
                          width="70px"
                          class="animate__animated animate__fadeIn"
                          style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${
                            sumScore >= Math.round(questionList.length * 0.4)
                              ? 'open'
                              : 'close'
                          }-1.png`"
                          no-spinner
                          no-transition
                        ></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.4)} คะแนน` }}
                        </div>
                      </div>
                      <div class="col relative-position">
                        <q-img
                          width="70px"
                          class="animate__animated animate__fadeIn"
                          style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${
                            sumScore >= Math.round(questionList.length * 0.6)
                              ? 'open'
                              : 'close'
                          }-2.png`"
                          no-spinner
                          no-transition
                        ></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.6)} คะแนน` }}
                        </div>
                      </div>

                      <div class="col relative-position">
                        <q-img
                          width="70px"
                          class="animate__animated animate__fadeIn"
                          style="animation-duration: 1s"
                          :src="`/images/prepost/giftbox-prepost-${
                            sumScore >= Math.round(questionList.length * 0.8)
                              ? 'open'
                              : 'close'
                          }-3.png`"
                          no-spinner
                          no-transition
                        ></q-img>
                        <div class="f12 font-mali-m">
                          {{ `${Math.round(questionList.length * 0.8)} คะแนน` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-12 q-mt-md self-center" v-if="isShowRewardCoin">
                  <div align="center" class="q-pt-md q-pb-md relative-position">
                    <q-img
                      width="200px"
                      src="/images/prepost/reward-banner-prepost.png"
                    ></q-img>
                  </div>

                  <div class="q-pa-md relative-position" align="center">
                    <q-img
                      width="150px"
                      src="/images/prepost/light-prepost-backdrop-coin.png"
                      class="absolute-center animation-light"
                    ></q-img>
                    <q-img
                      width="70px"
                      src="/images/prepost/icon-winner-coin.png"
                    ></q-img>
                    <div class="absolute-center" style="top: 80%">
                      <span class="text-coin-finish mobile font-mali-b">
                        {{ showSumCoin }}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="col-12 self-end q-my-lg q-mt-xl"
                  style="height: 50px"
                  align="center"
                >
                  <q-img
                    v-if="isShowButtonBackToLobby"
                    width="180px"
                    src="/images/prepost/button-prepost-back-to-lobby.png"
                    @click="funcBackToLobby()"
                    class="cursor-pointer"
                    v-close-popup
                  ></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>
