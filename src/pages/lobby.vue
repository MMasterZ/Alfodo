<template>
  <q-page
    class="relative-position"
    :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'"
  >
    <!-- :style="mode ? 'background-color:#694532' : 'background-color:#1E263B'" -->
    <!-- Platform Device -->
    <lobby-pc
      :characterData="studentStore.characterData"
      :mode="mode"
      :isNewNotification="ComReadNewsAll"
      :isSynchronize="isSynchronize"
      :studentInfo="studentInfo"
      :expireDate="expireDate"
      @callback-dialog="callbackFunction"
      v-if="$q.platform.is.desktop && studentStore.isHasCharacter"
    ></lobby-pc>

    <lobby-mobile
      :characterData="studentStore.characterData"
      :mode="mode"
      :isNewNotification="ComReadNewsAll"
      :isSynchronize="isSynchronize"
      :studentInfo="studentInfo"
      :expireDate="expireDate"
      @callback-dialog="callbackFunction"
      v-if="$q.platform.is.mobile && studentStore.isHasCharacter"
    ></lobby-mobile>

    <!-- dialog questionnaire -->
    <q-dialog persistent v-model="isShowPopupQuestionnaire" data-cy="dialog-question">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 22px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                อย่าลืม! ทำแบบสอบถาม
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าทำแบบสอบถาม
                <br class="" />
                <div class="q-my-sm">
                  ได้ตั้งแต่วันนี้จนถึงวันที่
                  {{ schoolData.endDateQuestionnaire }}
                </div>
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                v-close-popup
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
                v-if="!isQuestionnaireStartOnly"
              ></div>
              <!-- ปุ่มตกลง -->
              <div
                @click="funcGoto('questionnaire')"
                class="cursor-pointer btn-exam z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog exam -->
    <q-dialog persistent v-model="isShowPopupExam" data-cy="dialog-exam">
      <q-card flat class="bg-transparent" style="width: 320px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px; color: #512a08"
                align="center"
                class="text-weight-bold relative-position q-px-md"
              >
                สอบเก็บคะแนน
              </div>

              <div
                class="font-16 relative-position q-px-md q-pt-sm"
                style="color: #512a08"
                align="center"
              >
                เข้าสอบได้ตั้งแต่
                <div>เวลา {{ examId.startTime }} - {{ examId.endTime }} น.</div>
              </div>

              <div class="text-red font-14 q-px-md q-pt-xs" align="center ">
                หากไม่เข้าสอบในช่วงเวลาที่กำหนด<br />
                จะถือว่าขาดสอบ
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom"
              align="center"
            >
              <div class="row justify-evenly">
                <q-img
                  v-ripple
                  class="cursor-pointer"
                  src="/images/cancelExam.png"
                  style="width: 120px"
                  @click="closeExamDialog()"
                ></q-img>
                <q-img
                  v-ripple
                  class="cursor-pointer"
                  src="/images/startExam.png"
                  @click="funcGoto('exam')"
                  v-close-popup
                  style="width: 120px"
                ></q-img>
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog cancel exam -->
    <q-dialog persistent v-model="isShowPopupCancelExam" data-cy="dialog-exam">
      <q-card flat class="bg-transparent" style="width: 320px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 24px; color: #512a08"
                align="center"
                class="text-weight-bold relative-position q-px-md"
              >
                ฉันยังไม่พร้อม
              </div>

              <div
                class="font-16 relative-position q-px-md q-pt-sm"
                style="color: #512a08"
                align="center"
              >
                คุณจำเป็นต้องสอบตามเวลาที่ กำหนดภายในวันนี้เท่านั้น
                ต้องการออกจากระบบหรือไม่ ?
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom"
              align="center"
            >
              <div class="row justify-evenly">
                <q-img
                  v-ripple
                  class="cursor-pointer"
                  src="/images/logoutExam.png"
                  style="width: 120px"
                  @click="logoutExam()"
                ></q-img>
                <q-img
                  v-ripple
                  class="cursor-pointer"
                  src="/images/startExam.png"
                  @click="funcGoto('exam')"
                  v-close-popup
                  style="width: 120px"
                ></q-img>
              </div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog pretest -->
    <q-dialog persistent v-model="isShowPopupPretest" data-cy="dialog-pretest">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 22px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                ก่อนเริ่มเรียน
              </div>
              <div
                align="center"
                style="font-size: 14px"
                class="text-dark relative-position q-px-md q-mt-md"
              >
                คุณต้องทำการทดสอบสักเล็กน้อย
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มยกเลิก -->
              <!-- <div
                @click="isShowPopupPretest = false"
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
              ></div> -->
              <!-- ปุ่มตกลง -->
              <div
                @click="funcGoto('pretest')"
                class="cursor-pointer btn-prepost z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog posttest -->
    <q-dialog persistent v-model="isShowPopupPosttest" data-cy="dialog-posttest">
      <q-card flat class="bg-transparent" style="width: 320px; height: 370px">
        <q-card-section class="bg-transparent text-dark no-padding">
          <!-- รูปพื้นหลัง Error -->
          <q-img src="/images/warning.png" class="fit">
            <div class="absolute-center bg-transparent full-width">
              <div
                style="font-size: 22px"
                align="center"
                class="text-weight-bold text-dark relative-position q-px-md"
              >
                อย่าลืม! สอบหลังเรียน
              </div>
              <div align="center" class="text-dark relative-position q-px-md q-mt-md">
                คุณสามารถเข้าสอบหลังเรียน

                <br class="" />
                <div class="q-my-sm">
                  ได้ตั้งแต่วันนี้จนถึงวันที่ {{ schoolData.endDatePosttest }}
                </div>
              </div>
            </div>
            <div
              style="width: 100%; bottom: 30px; z-index: 1000"
              class="bg-transparent absolute-bottom row justify-center"
              align="center"
            >
              <!-- ปุ่มตกลง -->
              <div
                v-close-popup
                class="cursor-pointer btn-close z-top col-6"
                style="width: 120px"
                v-if="!isPosttestStartOnly"
              ></div>
              <!-- ปุ่มตกลง -->
              <div
                @click="funcGoto('posttest')"
                class="cursor-pointer btn-exam z-top col-6"
                style="width: 120px"
              ></div>
            </div>
          </q-img>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog Notification -->
    <q-dialog
      maximized
      v-model="isShowNotification"
      no-esc-dismiss
      data-cy="dialog-notification"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-container-news relative-position">
            <div class="icon-dialog-nofi q-px-md q-pt-md">
              <q-img
                class="q-mb-md"
                width="70px"
                src="/images/lobby/icon-notification.png"
              ></q-img>
            </div>
            <div class="q-mt-md q-pt-lg q-px-sm">
              <q-tab-panels
                v-model="tabNotification"
                animated
                class="transparent no-padding"
              >
                <q-tab-panel name="notificationList" class="transparent no-padding">
                  <div class="box-notification-list">
                    <div
                      class="q-mb-md relative-position"
                      v-for="(item, index) in newsList"
                      v-if="newsList.length"
                    >
                      <div
                        class="box-noti-content cursor-pointer relative-position"
                        @click="funcReadNews(item, index)"
                      >
                        <div>
                          <span v-html="item.titleTh"></span>
                        </div>
                        <div class="text-overflow q-mt-xs">
                          <span v-html="item.detailTh"></span>
                        </div>
                      </div>
                      <div
                        v-if="funcCheckReadNews(item.newsId)"
                        class="absolute-top-right new-news"
                      >
                        New
                      </div>
                    </div>

                    <div v-else class="q-py-md" align="center">
                      <span class="f20">- ไม่มีข่าวสารใหม่ -</span>
                    </div>
                  </div>
                </q-tab-panel>
                <q-tab-panel
                  :name="index"
                  v-for="(item, index) in newsList"
                  class="transparent"
                >
                  <div class="relative-position box-notification-details" align="center">
                    <div class="absolute" style="top: -15px; left: -15px; z-index: 2">
                      <q-img
                        @click="tabNotification = 'notificationList'"
                        class="cursor-pointer btn-active"
                        width="40px"
                        src="/images/btn-back-list.png"
                      ></q-img>
                    </div>
                    <div
                      class="box-detail-noti row justify-center items-center q-pa-sm q-py-md"
                    >
                      <div class="col-12 box-details-scroll q-pr-xs q-pl-sm">
                        <div class="q-py-sm">
                          <span class="f18 text-bold" v-html="item.titleTh"></span>
                        </div>

                        <div v-if="item.poster" align="center">
                          <q-img :src="item.poster" width="650px" height="350px"></q-img>
                        </div>

                        <div align="left" class="q-pa-md">
                          <span class="f14" v-html="item.detailTh"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>

            <div align="center" class="q-pb-md">
              <q-btn
                style="width: 200px; border-radius: 7px"
                class="bg-amber"
                push
                v-close-popup
                @click="tabNotification = 'notificationList'"
                >ปิด</q-btn
              >
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog Setting -->
    <q-dialog maximized v-model="isShowSetting" no-esc-dismiss data-cy="dialog-setting">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-container-setting">
            <div class="relative-position">
              <div class="icon-dialog-setting q-px-md q-pt-md q-mb-md">
                <q-img
                  class="q-mb-sm"
                  width="70px"
                  src="/images/lobby/icon-setting.png"
                ></q-img>
              </div>
              <div class="q-pt-xl q-pb-md q-px-sm">
                <div class="row">
                  <div class="col-md-6 col-xs-12 q-py-md q-px-xs self-center">
                    <div class="q-px-lg">
                      <div class="box-content-setting">
                        <div
                          class="q-px-md q-py-sm row"
                          style="border-bottom: 1px solid #e28701"
                        >
                          <div class="col self-center">
                            <q-icon
                              size="25px"
                              class="icon-setting q-mr-md q-ml-sm"
                              name="fas fa-volume-up"
                            ></q-icon>
                            <span class="text-bold f16">เสียงประกอบ</span>
                          </div>
                          <div class="col-3 self-center" align="center">
                            <q-toggle
                              v-model="isSoundEffect"
                              :color="isSoundEffect ? 'green' : 'grey'"
                              keep-color
                              @click="funcPlayEffect()"
                            />
                          </div>
                        </div>
                        <div class="q-px-md q-py-sm row">
                          <div class="col self-center">
                            <q-icon
                              size="25px"
                              class="icon-setting q-mr-md q-ml-sm"
                              name="fas fa-music"
                            ></q-icon>
                            <span class="text-bold f16">เพลง</span>
                          </div>
                          <div class="col-3 self-center" align="center">
                            <q-toggle
                              v-model="isSoundBackground"
                              :color="isSoundBackground ? 'green' : 'grey'"
                              keep-color
                              :disable="isSynchronize"
                              @click="funcPlayBackground()"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="col-md-6 col-xs-12 self-center q-py-md q-px-md text-bold"
                    align="center"
                    :style="
                      $q.platform.is.desktop
                        ? 'border-left: 1px dashed #e28701'
                        : 'border-top: 1px dashed #e28701;'
                    "
                  >
                    <span class="f16">ติดต่อทีมงาน</span>
                    <div class="q-py-md">
                      <div class="row q-mt-sm" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon size="25px" class="fas fa-phone-alt q-mr-sm"></q-icon>
                        </div>
                        <div class="col f16">
                          <span>โทรศัพท์</span>
                          <p>02-252-2489</p>
                        </div>
                      </div>
                      <div class="row" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon
                            size="30px"
                            class="fab fa-line q-mr-sm text-green"
                          ></q-icon>
                        </div>
                        <div class="col f16">
                          <span>Line</span>
                          <p>@winner_qa</p>
                        </div>
                      </div>
                      <div class="row" align="left">
                        <div class="col-2" style="width: 40px">
                          <q-icon
                            size="30px"
                            class="fab fa-facebook-square q-mr-sm text-blue"
                          ></q-icon>
                        </div>
                        <div class="col f16">
                          <span>Facebook</span>
                          <p>www.facebook.com/WinnerEng</p>
                        </div>
                      </div>
                      <div class="row absolute-bottom-right q-pa-xs" align="left">
                        <div class="col f14">
                          <span>Version 1.0.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div align="center" class="q-pb-lg">
                <q-btn
                  style="width: 200px; border-radius: 7px"
                  class="bg-amber"
                  push
                  v-close-popup
                  @click="tabNotification = 'notificationList'"
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog Ranking -->
    <q-dialog
      maximized
      v-model="isShowRanking"
      v-if="isRanking"
      no-esc-dismiss
      data-cy="dialog-ranking"
    >
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-container-ranking">
            <div class="relative-position">
              <div class="icon-dialog q-px-md q-pt-sm q-mb-md">
                <q-img
                  class="q-mb-md"
                  width="290px"
                  src="/images/lobby/logo-ranking.png"
                ></q-img>
              </div>
              <div class="q-px-sm q-pt-sm" align="center">
                <div class="q-pl-md q-pr-md">
                  <div class="q-mt-md">
                    <div class="q-mt-md q-px-md row" v-if="studentInfo.type == 'school'">
                      <div
                        class="relative-position col-4 q-pa-sm"
                        :class="
                          rankingSelected == 'school'
                            ? 'button-ranking-selected'
                            : 'button-ranking-no-selected'
                        "
                        @click="rankingSelected = 'school'"
                        v-ripple
                        align="center"
                      >
                        <span class="absolute-center full-width">โรงเรียน</span>
                      </div>
                      <div
                        class="relative-position col-4 q-pa-sm q-mx-sm"
                        :class="
                          rankingSelected == 'classroom'
                            ? 'button-ranking-selected'
                            : 'button-ranking-no-selected'
                        "
                        @click="rankingSelected = 'classroom'"
                        v-ripple
                        align="center"
                      >
                        <span class="absolute-center full-width">ชั้นเรียน</span>
                      </div>
                    </div>
                  </div>
                  <div class="row q-pr-sm box-ranking-list" style="">
                    <div
                      class="col-12 q-py-xs"
                      style="background-color: #f1d280"
                      v-if="selectedRankingList.length"
                    >
                      <div class="q-py-xs" v-for="i in 3">
                        <div
                          v-if="selectedRankingList.length >= i"
                          class="q-pa-xs row shadow-1 q-py-sm"
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
                            <div class="text-overflow" style="width: 160px">
                              {{
                                `${
                                  selectedRankingList[i - 1].characterName == ""
                                    ? "-"
                                    : selectedRankingList[i - 1].characterName
                                }`
                              }}
                            </div>
                            <div class="row q-mt-xs" style="font-size: 12px">
                              <div class="text-overflow" style="width: 140px">
                                {{ `${selectedRankingList[i - 1].name}` }}
                              </div>
                              <div class="q-px-xs">
                                {{
                                  ` ${selectedRankingList[i - 1].class}/${
                                    selectedRankingList[i - 1].room
                                  }`
                                }}
                              </div>
                            </div>
                          </div>
                          <div class="col-1" style="width: fit-content">
                            <q-icon name="fas fa-star" class="text-amber"></q-icon>
                          </div>
                          <div
                            class="col-2 self-star text-white q-pr-sm"
                            style="width: 40px; padding-top: 1px"
                            align="right"
                          >
                            <span class="text-ranking-star">
                              {{ selectedRankingList[i - 1].star }}
                            </span>
                          </div>

                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            <div>
                              <div>
                                {{
                                  `${
                                    selectedRankingList[i - 1].characterName == ""
                                      ? "-"
                                      : selectedRankingList[i - 1].characterName
                                  }`
                                }}
                              </div>
                              <div>
                                {{ `${selectedRankingList[i - 1].name}` }}
                              </div>
                              <div>
                                {{
                                  ` ${selectedRankingList[i - 1].class}/${
                                    selectedRankingList[i - 1].room
                                  }`
                                }}
                              </div>
                            </div>
                          </q-tooltip>
                        </div>
                      </div>
                      <div v-for="(item, index) in selectedRankingList" :key="index">
                        <div
                          v-if="index >= 3"
                          class="fit q-pa-xs q-py-sm row q-mb-sm q-mt-xs"
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
                            <div class="text-overflow" style="width: 160px">
                              {{
                                `${item.characterName == "" ? "-" : item.characterName}`
                              }}
                            </div>
                            <div class="row q-mt-xs" style="font-size: 12px">
                              <div class="text-overflow" style="width: 140px">
                                {{ `${item.name}` }}
                              </div>
                              <div class="q-px-xs">
                                {{ ` ${item.class}/${item.room}` }}
                              </div>
                            </div>
                          </div>
                          <div class="col-1" style="width: fit-content">
                            <q-icon name="fas fa-star" class="text-amber"></q-icon>
                          </div>
                          <div
                            class="col-2 self-star text-white q-pr-sm"
                            style="width: 40px; padding-top: 1px"
                            align="right"
                          >
                            <span class="text-ranking-star">
                              {{ item.star }}
                            </span>
                          </div>

                          <q-tooltip
                            anchor="top middle"
                            self="bottom middle"
                            :offset="[10, 10]"
                          >
                            <div>
                              <div>
                                {{
                                  `${item.characterName == "" ? "-" : item.characterName}`
                                }}
                              </div>
                              <div>
                                {{ `${item.name}` }}
                              </div>
                              <div>
                                {{ ` ${item.class}/${item.room}` }}
                              </div>
                            </div>
                          </q-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row q-mt-md justify-center q-px-md">
                  <div
                    class="col-12 row q-py-sm"
                    style="
                      border-radius: 5px;
                      background-color: #f1d280;
                      border: 2px dashed #a46100;
                    "
                    align="left"
                  >
                    <div
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
                          :src="`/images/lobby/ranking-${
                            rankingSelected == 'school'
                              ? ranking.current.position
                              : ranking.rankingInClass
                          }.png`"
                        ></q-img>
                      </span>
                      <span class="absolute-center text-border f18" v-else>
                        {{
                          rankingSelected == "school"
                            ? ranking.current.position
                            : ranking.rankingInClass
                        }}
                      </span>
                    </div>
                    <div class="col self-center q-px-md">
                      <div class="text-bold" style="color: #653d03">
                        <div class="text-overflow" style="width: 160px">
                          {{
                            `${
                              ranking.current.characterName == ""
                                ? "-"
                                : ranking.current.characterName
                            }`
                          }}
                        </div>
                        <div class="row q-mt-xs" style="font-size: 12px">
                          <div class="text-overflow" style="width: 150px">
                            {{ `${ranking.current.name}` }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-1" style="width: fit-content">
                      <q-icon name="fas fa-star" style="color: #653d03"></q-icon>
                    </div>
                    <div
                      class="col-2 self-star q-pr-sm"
                      style="width: 40px; padding-top: 1px; color: #653d03"
                      align="right"
                    >
                      <span class="text-ranking-star">
                        {{ ranking.current.star }}
                      </span>
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
                  @click="tabNotification = 'notificationList'"
                  >ปิด</q-btn
                >
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- dialog News -->
    <q-dialog maximized v-model="isShowNews" no-esc-dismiss>
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="box-container-news relative-position">
            <div class="icon-dialog-nofi q-px-md q-pt-md">
              <q-img
                class="q-mb-md"
                width="70px"
                src="/images/lobby/icon-notification.png"
              ></q-img>
            </div>
            <div class="q-mt-md q-pt-lg q-px-sm row relative-position">
              <div
                class="col-1 self-center"
                v-if="$q.platform.is.desktop"
                style="width: 40px"
              >
                <q-btn
                  dense
                  flat
                  round
                  :disable="currentBannerIndex == 0"
                  @click="
                    currentBannerIndex--,
                      funcReadNews(newsList[currentBannerIndex].id, currentBannerIndex)
                  "
                  v-if="currentBannerIndex != 0 && newsList.length"
                >
                  <q-icon class="text-warning" name="fas fa-chevron-left"></q-icon>
                </q-btn>
              </div>

              <div
                id="boxNews"
                class="col relative-position box-news-content q-my-sm"
                v-touch-swipe.mouse="funcTouchSwipe"
              >
                <div v-if="!isLoadingNews">
                  <div v-if="newsList.length">
                    <q-tab-panels
                      animated
                      class="transparent"
                      :class="{ 'q-pa-md': $q.platform.is.desktop }"
                      v-model="currentBannerIndex"
                    >
                      <q-tab-panel
                        class="no-padding"
                        v-for="(item, index) in newsList"
                        :name="index"
                      >
                        <div
                          class="q-pb-xs q-pa-sm"
                          v-if="item.poster == '' && item.posterMobile == ''"
                          align="center"
                        >
                          <span class="f20 text-news-title" v-html="item.titleTh"></span>
                        </div>
                        <div
                          style="
                            max-width: 650px;
                            width: 100%;
                            overflow: hidden;
                            margin: auto;
                          "
                          align="center"
                          v-if="item.poster && $q.platform.is.desktop"
                        >
                          <q-img
                            @click="item.isLink ? toLink(item.link) : null"
                            :class="item.isLink ? 'cursor-pointer' : ''"
                            :src="`${item.poster}?${Math.random()
                              .toString(36)
                              .substr(3)}`"
                            style="width: 100%"
                            fit="contain"
                            spinner-color="white"
                          ></q-img>
                        </div>

                        <div
                          style="
                            max-width: 650px;
                            width: 100%;
                            height: fit-content;
                            overflow: hidden;
                            margin: 0px auto 0px auto;
                          "
                          align="center"
                          v-if="item.posterMobile && $q.platform.is.mobile"
                        >
                          <q-img
                            @click="item.isLink ? toLink(item.link) : null"
                            :class="item.isLink ? 'cursor-pointer' : ''"
                            :src="`${item.posterMobile}?${Math.random()
                              .toString(36)
                              .substr(3)}`"
                            style="width: 100%; height: fit-content"
                            fit="contain"
                            spinner-color="white"
                          ></q-img>
                        </div>

                        <div class="q-pa-md q-mt-md">
                          <span v-html="item.detailTh" class=""></span>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                  <div v-else class="absolute-center">
                    <span class="f16">ไม่มีจดหมาย</span>
                  </div>
                </div>
                <div v-else class="absolute-center">
                  <q-spinner-pie color="orange" size="100px" />
                </div>
              </div>

              <div
                class="col-1 self-center"
                v-if="$q.platform.is.desktop"
                style="width: 40px"
                align="right"
              >
                <q-btn
                  dense
                  flat
                  round
                  @click="
                    currentBannerIndex++,
                      funcReadNews(newsList[currentBannerIndex].id, currentBannerIndex)
                  "
                  :disable="currentBannerIndex + 1 == newsList.length"
                  v-if="currentBannerIndex + 1 != newsList.length && newsList.length"
                >
                  <q-icon class="text-warning" name="fas fa-chevron-right"></q-icon>
                </q-btn>
              </div>
            </div>
            <!-- <div :class="{ 'q-px-xl': $q.platform.is.desktop }" v-if="isNewsTypePopup">
              <q-checkbox
                label="ไม่ต้องแสดงอีก"
                size="sm"
                color="warning"
                v-model="isDontShowAgain"
                @click="funcDonShowAgain()"
              ></q-checkbox>
            </div> -->
            <div class="row justify-center">
              <div
                class="col-1 self-center q-pb-sm"
                v-if="$q.platform.is.mobile"
                align="center"
                style="width: 40px"
              >
                <q-btn
                  dense
                  flat
                  round
                  :disable="currentBannerIndex == 0"
                  @click="
                    currentBannerIndex--,
                      funcReadNews(newsList[currentBannerIndex].id, currentBannerIndex)
                  "
                  v-if="currentBannerIndex != 0 && newsList.length"
                >
                  <q-icon class="text-warning" name="fas fa-chevron-left"></q-icon>
                </q-btn>
              </div>
              <div class="q-mx-lg">
                <div align="center" class="q-pb-md q-mt-sm">
                  <q-btn
                    style="width: 200px; border-radius: 7px"
                    class="bg-amber"
                    push
                    v-close-popup
                    @click="
                      (tabNotification = 'notificationList'),
                        $q.sessionStorage.set('dontShowAgain', true)
                    "
                    >ปิด</q-btn
                  >
                </div>
              </div>
              <div
                class="col-1 self-center q-pb-sm"
                v-if="$q.platform.is.mobile"
                align="center"
                style="width: 40px"
              >
                <q-btn
                  dense
                  flat
                  round
                  @click="
                    currentBannerIndex++,
                      funcReadNews(newsList[currentBannerIndex].id, currentBannerIndex)
                  "
                  :disable="currentBannerIndex + 1 == newsList.length"
                  v-if="currentBannerIndex + 1 != newsList.length && newsList.length"
                >
                  <q-icon class="text-warning" name="fas fa-chevron-right"></q-icon>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog Signout -->
    <dialog-sign-out
      :isShowSignoutDialog="isShowSignoutDialog"
      @callback-closedialog="isShowSignoutDialog = false"
      @callback-signout="funcSignout()"
    ></dialog-sign-out>

    <!-- Tutorial -->
    <tutorial
      type=""
      :isShowTutorial="isShowTutorial"
      v-if="isLoaded"
      skill=""
    ></tutorial>

    <!-- Loading -->
    <loading :isShowLoading="isShowLoading"></loading>

    <!-- Mini Game or review -->
    <mini-game
      :isShowDialogReviewMenu="isShowDialogReviewMenu"
      @callback-closedialog="isShowDialogReviewMenu = false"
      v-if="isShowDialogReviewMenu"
      :miniGameTypeList="miniGameTypeList"
      :studentInfo="studentInfo"
    ></mini-game>
  </q-page>
</template>

<script>
import lobbyPc from "../components/lobby/lobbyPc.vue";
import lobbyMobile from "../components/lobby/lobbyMobile.vue";
import character from "components/character";
import { useQuasar } from "quasar";
import { ref, onMounted, reactive, onBeforeUnmount, watch, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { analyticsLogEvent, db, playSoundBackground, playSoundEffect } from "src/router";
import months from "../hooks/month.js";
import dialogSignOut from "../components/dialog-signout.vue";
import tutorial from "../components/tutorial.vue";
import loading from "../components/dialog-loading.vue";
import miniGame from "../components/minigame/minigame-menu.vue";
import studentHooks from "../hooks/gameHooks";
import getHooks from "../hooks/getHooks";
import updateHooks from "src/hooks/updateHooks";
import { axios } from "src/boot/axios";
import addHooks from "src/hooks/addHooks";
import { useStudentStore } from "src/stores/student";
export default {
  components: {
    lobbyPc,
    lobbyMobile,
    character,
    dialogSignOut,
    loading,
    tutorial,
    miniGame,
  },
  props: {
    isSynchronize: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["callback-purchase", "callback-signout"],
  setup(props, { emit }) {
    // Initial Data
    const $q = useQuasar();
    const studentStore = useStudentStore();

    // OLD
    const platPc = $q.platform.is.desktop;
    const isLoaded = ref(false);
    const isShowSignoutDialog = ref(false);
    const route = useRoute();
    const isShowLoading = ref(false);
    const rankingSelected = ref("school");
    const isShowDialogReviewMenu = ref(false);

    // Set Equipment Character
    const equipment = reactive({
      head: "",
      body: "",
      footer: "",
      pet: "",
    });

    // Set Color Character
    const color = ref("#FFB690");

    const mode = ref(null);
    const activeMenu = ref(null);
    const isNewNotify = ref(false);
    const isShowPopupPretest = ref(false);
    const isShowPopupPosttest = ref(false);
    const isShowPopupExam = ref(false);
    const isShowPopupQuestionnaire = ref(false);
    const isShowCharacter = ref(false);

    // Router
    const router = useRouter();

    // Character Data
    const studentInfo = ref({});

    var getStudentInfo;

    const expireDate = ref(null);
    const getStudentInfoData = async (uid) => {
      getStudentInfo = await studentHooks.studentInfomation(uid);
    };

    const funcShowCharacter = async () => {
      equipment.head = studentInfo.value.character.head;
      equipment.body = studentInfo.value.character.body;
      equipment.footer = studentInfo.value.character.footer;
      equipment.pet = studentInfo.value.character.pet;
      equipment.other = studentInfo.value.character.other;
      color.value = studentInfo.value.character.color;

      if (studentInfo.value.type == "demo" || studentInfo.value.type == "online") {
        expireDate.value = await getHooks.checkexpiredate(studentInfo.value.expireDate);
      }
    };

    const schoolData = ref({});
    const isPosttestStartOnly = ref(false);
    const isQuestionnaireStartOnly = ref(false);
    const funcShowSchool = async (schoolId) => {
      try {
        // let isSync = $q.sessionStorage.getItem("isSync");
        schoolData.value = $store.state.studentStore.schoolInfo.data;

        let getPrepostlog = $store.state.practiceStore.prePostLog.list;

        // Show Questionnaire
        // if (response.questionnaireStatus) {
        //   let getQuestionnaire = await getPractice
        //     .practice(studentInfo.value.level)
        //     .checkquestionnaire(response.questionnaireSet, uid.value);

        //   if (getQuestionnaire != "done") {
        //     isShowPopupQuestionnaire.value = true;

        //     let getDate = await funcDiffDay(response.endDateQuestionnaire);

        //     if (getDate.diffDay < 7) {
        //       isQuestionnaireStartOnly.value = true;
        //     }

        //     schoolData.value.endDateQuestionnaire = getDate.endDate;
        //   }
        // }

        if (schoolData.value.pretestStatus || schoolData.value.posttestStatus) {
          if (schoolData.value.pretestStatus) {
            if (getPrepostlog.length) {
              let checkPretest = getPrepostlog.includes("pretest");

              if (!checkPretest) {
                isShowPopupPretest.value = true;
              }
            }
          }

          if (schoolData.value.posttestStatus) {
            if (getPrepostlog.length) {
              let checkPosttest = getPrepostlog.includes("posttest");

              if (!checkPosttest) {
                isShowPopupPosttest.value = true;

                let getDate = await funcDiffDay(schoolData.value.endDatePosttest);

                if (getDate.diffDay < 7) {
                  isPosttestStartOnly.value = true;
                }

                schoolData.value.endDatePosttest = getDate.endDate;
              }
            }
          }
        }
      } catch (error) {
        // console.log(`${error} : Error Function Get School`);
      }
    };

    const funcDiffDay = (endTime) => {
      let newDate = endTime.split("/");
      let day = newDate[0] < 10 ? "0" + newDate[0] : newDate[0];
      let month = months.th_mini[Number(newDate[1]) - 1];
      let year = Number(newDate[2]) + 543;
      let cDate = `${day} ${month} ${year}`;

      newDate = `${newDate[1]}/${newDate[0]}/${newDate[2]}`;

      newDate = new Date(newDate).getTime();

      let diffDays = newDate - new Date().getTime();

      diffDays = diffDays / 1000 / 60 / 60 / 24;

      diffDays = parseInt(diffDays);

      return { diffDay: diffDays, endDate: cDate };
    };

    const funcGoto = (type) => {
      if (type == "questionnaire") {
        router.replace("/questionnaire");
      } else if (type == "pretest") {
        router.replace("/prepost/pretest/");
      } else if (type == "posttest") {
        router.replace("/prepost/posttest/");
      } else if (type == "exam") {
        playSoundBackground(route.name, false);
        router.replace("/exam/test/" + examId.value.examId);
      }
    };

    // Dialog Show
    const tabNotification = ref("notificationList");
    const isShowNotification = ref(false);
    const isShowNews = ref(false);
    const isDontShowAgain = ref(false);
    const isActiveNotification = ref(null);

    const isShowSetting = ref(false);
    const isSoundEffect = ref(true);
    const isSoundBackground = ref(true);
    const isShowProFile = ref(false);
    const isShowRanking = ref(false);
    const isNewsTypePopup = ref(false);
    const callbackFunction = async (type) => {
      if (type == "notification") {
        isShowNews.value = true;
        currentBannerIndex.value = 0;
        isNewsTypePopup.value = false;
      } else if (type == "setting") {
        isShowSetting.value = true;
      } else if (type == "ranking") {
        funcLoadRanking();
      } else if (type == "reviewmenu") {
        // await funcLoadPracticeLog();
        // await funcLoadPracticeListBySkill();
        // await funcLoadMiniGameUnlock();

        isShowLoading.value = true;

        // await funcLoadPracticeLog();
        // await funcLoadPracticeListByLevel();
        await funcCheckStudentUnlockMinigames();

        isShowDialogReviewMenu.value = true;
        isShowLoading.value = false;
      } else if (type == "profile") {
        if (!props.isSynchronize) {
          router.replace("/profile");
        }
      } else if (type == "purchase") {
        emit("callback-purchase");
      } else {
        isShowSignoutDialog.value = true;
      }
    };

    const miniGameTypeList = ref([]);
    const funcLoadMinigamesType = async () => {
      let response = await getHooks.getminigamestype();

      miniGameTypeList.value = response;
    };

    let practiceList = [];
    const funcLoadPracticeListByLevel = async () => {
      let response = await getHooks.getpracticelistbylevel(studentInfo.value.level);

      practiceList = response;
    };

    let practiceLog = [];
    const funcLoadPracticeLog = async () => {
      let response = await getHooks.getpracticelogbycourseid(studentInfo.value.courseId);

      practiceLog = response;
    };

    const funcCheckStudentUnlockMinigames = async () => {
      let setData = {
        minigamesType: miniGameTypeList.value,
        practiceList: practiceList,
        practiceLog: practiceLog,
      };

      let response = await getHooks.getminigamesunlockbypracticedata(
        studentInfo.value.uid,
        studentInfo.value.courseId,
        studentInfo.value.level
      );

      studentInfo.value.minigames = response;
    };

    // const funcLoadMiniGameUnlock = async () => {
    //   ;

    //   isShowLoading.value = true;

    //   let uid = $q.sessionStorage.getItem("uid");

    //   let response = await getHooks.getminigamesunlockbypracticedata(
    //     uid,
    //     studentInfo.value.courseId,
    //     studentInfo.value.level
    //   );

    //   miniGameTypeList.value = response;
    //   isShowDialogReviewMenu.value = true;
    //   isShowLoading.value = false;
    // };

    const newsList = ref([]);
    const newsLogList = ref([]);
    const newsBannerList = ref([]);
    const currentBannerIndex = ref(0);
    const isLoadingNews = ref(true);
    const funcLoadNews = async () => {
      let store = $store.state.newsStore;

      if (store.news.size) {
        let temp = store.news.list;

        if ($store.state.studentStore.studentInfo.data.type == "school") {
          temp = temp.filter((x) => x.isStudent);
        } else {
          temp = temp.filter((x) => x.isStudentOnline);
        }

        if (temp.length) {
          let getPosterData = temp.filter((x) => x.poster || x.poster != undefined);

          if (getPosterData.length) {
            newsBannerList.value = getPosterData;
          } else {
            newsBannerList.value = [];
          }

          if (store.newsLog.size) {
            let tempLog = [];
            temp.forEach((res) => {
              let isReadNews = store.newsLog.list.filter((x) => x == res.id);

              if (isReadNews.length) tempLog.push(isReadNews[0]);
            });

            newsLogList.value = tempLog;
          }

          newsList.value = temp;

          funcReadNews(temp[0].id, 0);

          isShowNews.value = true;
          isNewsTypePopup.value = true;
          isLoadingNews.value = false;
        }
      }
    };

    const isNewNotifcation = computed(() => {
      let isNew = false;

      let getNotiData = newsList.value.filter((x) => x.isNew);

      if (getNotiData.length) {
        isNew = true;
      }

      return isNew;
    });

    // Func : Read News+
    const funcReadNews = async (id, index) => {
      tabNotification.value = index;

      let newsId = id;

      let isHasNewsLog = newsLogList.value.filter((x) => x == newsId);

      if (isHasNewsLog.length == 0) {
        $store.commit("newsStore/setUpdateNewsLog", newsId);
      }

      if ($store.state.newsStore.newsLog.isUpdate) {
        let response = await addHooks.addNewsLog(
          newsId,
          $store.state.studentStore.studentInfo.UID
        );

        if (response != "error") $store.commit("newsStore/setUpdateNewsLogSuccess");
      }

      newsLogList.value = $store.state.newsStore.newsLog.list;
    };

    // Func : Check Read News
    const funcCheckReadNews = (id) => {
      let findNews = newsLogList.value.filter((x) => x === id);

      if (findNews.length) {
        return false;
      } else {
        return true;
      }
    };

    // Com : Check Read News All
    const ComReadNewsAll = computed(() => {
      let tempNews = newsList.value;

      let forReadAll = tempNews.every((x) => {
        return newsLogList.value.filter((xx) => xx == x.newsId).length;
      });

      if (forReadAll) {
        return false;
      } else {
        return true;
      }
    });

    const funcSignout = async () => {
      let uid = $q.sessionStorage.getItem("uid");

      emit("callback-signout");

      await db.collection("student").doc(uid).update({
        onlineStatus: "offline",
      });

      firebase
        .auth()
        .signOut()
        .then(function () {
          if (authListen != null) {
            authListen();
          }

          $q.sessionStorage.clear();
          router.replace("/");
        })
        .catch(function (error) {
          // An error happened.
        });
    };

    // Func : Set Time Local
    const funcSetModeDayAndNight = () => {
      let date = new Date().getMinutes();

      let round = date / 5;

      round = Math.floor(round);

      round = round % 2;

      if (round == 0) {
        mode.value = true;
      } else {
        mode.value = false;
      }
    };

    watch(
      () => props.isSynchronize,
      async () => {
        if (props.isSynchronize) {
          playSoundBackground(route.name, false);
        } else {
          if ($q.sessionStorage.has("isEnableSoundBackground")) {
            playSoundEffect(
              route.name,
              $q.sessionStorage.getItem("isEnableSoundBackground")
            );
          }
        }
        await funcShowSchool(studentInfo.value.schoolId);
      }
    );

    // Func : Ranking
    const ranking = ref({});
    const isRanking = ref(false);
    const funcLoadRanking = async () => {
      isRanking.value = false;
      isShowRanking.value = true;
      isShowLoading.value = true;
      let studentId = $store.state.studentStore.studentInfo.UID;
      let schoolId = studentInfo.value.schoolId;

      let response = await studentHooks.ranking(studentId, schoolId);

      ranking.value = response;
      isShowLoading.value = false;

      if (ranking.value.studentList.length > 0) isRanking.value = true;
    };

    const selectedRankingList = computed(() => {
      let temp = [];

      if (rankingSelected.value == "school") {
        temp = ranking.value.studentList;
      } else {
        temp = ranking.value.classFiltered;
      }

      return temp;
    });

    const funcPlayEffect = () => {
      $q.sessionStorage.set("isEnableSoundEffect", isSoundEffect.value);
    };

    const funcPlayBackground = () => {
      $q.sessionStorage.set("isEnableSoundBackground", isSoundBackground.value);
      if (!isSync) {
        playSoundBackground(route.name, isSoundBackground.value);
      } else {
        playSoundBackground(route.name, false);
      }
    };

    const isShowTutorial = ref(false);

    const funcShowTutorial = async (uid) => {
      if (studentInfo.value.tutorial) {
        let findTutorial = studentInfo.value.tutorial.filter(
          (x) => x.routeName == route.name && x.practiceType == ""
        );

        if (!findTutorial.length) {
          isShowTutorial.value = true;
        }
      } else {
        isShowTutorial.value = true;
      }
    };

    const examId = ref("");
    let interval;
    let timeout;
    const funcCheckExam = async () => {
      const url = `${process.env.API}/checkExamOpen`;
      const postData = {
        studentId: studentInfo.value.uid,
        class: studentInfo.value.class,
        schoolId: studentInfo.value.schoolId,
      };

      const response = await axios.post(url, postData);

      if (response.data != "exam not found") {
        interval = setInterval(() => {
          let examList = [];
          response.data.forEach((element) => {
            let startDate = element.startDate;
            let endDate = element.endDate;
            let currentDate = new Date().getTime();
            // let currentDate = element.currentTime;
            if (currentDate >= startDate && currentDate <= endDate) {
              if (element.roomSelected.includes(studentInfo.value.room)) {
                let examId = element.examId;
                let timeoutSec =
                  Number(element.timeBalance.min) * 60 + Number(element.timeBalance.sec);
                examList.push({
                  examId: examId,
                  title: element.title,
                  startTime: element.startTime,
                  endTime: element.endTime,
                  timeoutSec: timeoutSec,
                });
              }
            }
          });

          if (examList.length) {
            examId.value = examList[0];
            isShowPopupExam.value = true;
            clearInterval(interval);
            timeout = setTimeout(() => {
              isShowPopupExam.value = false;
              isShowPopupCancelExam.value = false;
              clearTimeout(setTimeout);
            }, examList[0].timeoutSec * 1000);
          }
        }, 1000);
      }
    };
    const isShowPopupCancelExam = ref(false);
    const closeExamDialog = () => {
      isShowPopupExam.value = false;
      isShowPopupCancelExam.value = true;
    };

    var authListen;
    let isSync;

    const logoutExam = () => {
      firebase
        .auth()
        .signOut()
        .then(function () {
          // Sign-out successful.
          router.replace("/");
        })
        .catch(function (error) {
          // An error happened.
        });
    };

    const toLink = (link) => {
      window.open(link, "__blank");
    };

    const funcDonShowAgain = () => {
      $q.sessionStorage.set("dontShowAgain", isDontShowAgain.value);
    };

    onMounted(() => {
      isShowLoading.value = true;

      window.onbeforeunload = function (event) {
        var message = "?";
        if (typeof event == "undefined") {
          event = window.event;
        }
        if (event) {
          event.returnValue = message;
        }
        return message;
      };

      // console.log(studentStore.characterData);

      setTimeout(() => {
        isShowLoading.value = false;
      }, 500);

      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          if ($q.sessionStorage.has("isSync")) {
            isSync = $q.sessionStorage.getItem("isSync");
          }

          if (analyticsLogEvent != null) {
            // analyticsLogEvent("/lobby");
          }

          // if (!isSync) {
          //   if ($q.sessionStorage.has("isEnableSoundBackground")) {
          //     isSoundBackground.value = $q.sessionStorage.getItem(
          //       "isEnableSoundBackground"
          //     );

          //     playSoundBackground(route.name, isSoundBackground.value);
          //   } else {
          //     $q.sessionStorage.set("isEnableSoundBackground", true);
          //     playSoundBackground(route.name, true);
          //   }
          // } else {
          //   isSoundBackground.value = false;
          // }

          // if ($q.sessionStorage.has("isEnableSoundEffect")) {
          //   isSoundEffect.value = $q.sessionStorage.getItem("isEnableSoundEffect");
          // } else {
          //   $q.sessionStorage.set("isEnableSoundEffect", true);
          // }

          // await getStudentInfoData(user.uid);

          // let store = $store;

          // if (store.state.studentStore.studentInfo.isLoaded)
          //   studentInfo.value = store.state.studentStore.studentInfo.data;

          // funcShowTutorial();
          // funcShowCharacter();
          // funcShowSchool();

          // if (!store.state.systemStore.isNewsDontShowAgain) {
          //   funcLoadNews();
          //   store.commit("systemStore/setNewsDontShowAgain", true);
          // }

          // funcSetModeDayAndNight();

          // isShowCharacter.value = true;
          // isLoaded.value = true;

          // setTimeout(() => {
          //   isShowLoading.value = false;
          // }, 500);

          return;

          await funcCheckExam();
          await funcLoadMinigamesType();
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    onBeforeUnmount(() => {
      clearInterval(interval);
      if (authListen != null) {
        authListen();
      }
    });

    const funcTouchSwipe = (e) => {
      if ($q.platform.is.mobile) {
        if (e.direction == "right") {
          if (currentBannerIndex.value != 0) {
            currentBannerIndex.value--;
          }
        } else if (e.direction == "left") {
          if (currentBannerIndex.value + 1 != newsList.value.length) {
            currentBannerIndex.value++;
          }
        }

        funcReadNews(
          newsList.value[currentBannerIndex.value].id,
          currentBannerIndex.value
        );
      }
    };

    return {
      // NEW
      studentStore,

      // OLD
      funcTouchSwipe,
      // platform
      platPc,

      // Data
      miniGameTypeList,
      expireDate,
      studentInfo,
      schoolData,
      isPosttestStartOnly,
      isQuestionnaireStartOnly,
      ranking,
      rankingSelected,
      mode,
      activeMenu,
      examId,
      isShowNews,
      isDontShowAgain,

      // equipment
      isShowCharacter,
      equipment,
      color,
      newsBannerList,
      newsList,
      currentBannerIndex,

      callbackFunction,
      tabNotification,

      // Boolean
      isShowNotification,
      isShowSetting,
      isShowRanking,
      isSoundEffect,
      isSoundBackground,
      isActiveNotification,
      isShowSignoutDialog,
      isShowLoading,
      isShowDialogReviewMenu,
      isNewNotifcation,
      isNewNotify,
      isShowPopupPretest,
      isShowPopupPosttest,
      isShowPopupExam,
      isShowPopupQuestionnaire,
      isShowProFile,
      isRanking,
      isShowTutorial,
      isLoaded,
      isShowPopupCancelExam,
      isNewsTypePopup,
      isLoadingNews,

      // Function
      funcGoto,
      funcReadNews,
      funcCheckReadNews,
      funcSignout,
      funcLoadRanking,
      funcPlayEffect,
      funcPlayBackground,
      closeExamDialog,
      logoutExam,
      toLink,
      funcDonShowAgain,

      // Computed
      ComReadNewsAll,
      selectedRankingList,
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-close {
  background-image: url("/images/close-btn-m.png");
  width: 100%;
  height: 35px;
  background-size: cover;
}

.btn-close:hover {
  background-image: url("/images/close-btn-mh.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}

.btn-prepost {
  background-image: url("/images/prepost-start.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.btn-prepost:hover {
  background-image: url("/images/prepost-start-h.png");
  width: 70%;
  height: 35px;
  background-size: cover;
}

.box-container-notification {
  max-width: 350px;
  width: 100%;
}

.box-container-news {
  max-width: 800px;
  width: 100%;
}

.box-container-ranking {
  max-width: 400px;
  width: 100%;
}

.box-container-setting {
  max-width: 700px;
  min-width: 340px;
}

.box-container-notification,
.box-container-setting,
.box-container-ranking,
.box-container-news {
  background-color: #f6f3d3;
  border-radius: 10px;
}

.box-news-content {
  height: 450px;
  background-color: #f1d280;
  border-radius: 10px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* width */
.box-news-content::-webkit-scrollbar {
  width: 7px;
}

/* Track */
.box-news-content::-webkit-scrollbar-track {
  background: #fc9301;
}

/* Handle */
.box-news-content::-webkit-scrollbar-thumb {
  background: #a46100;
}

/* Handle on hover */
.box-news-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.icon-dialog {
  position: absolute;
  top: -89px;
  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 50%;
}

.icon-dialog-nofi {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 50%;
  background-color: #f6f3d3;
}

.icon-dialog-setting {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, 0%);
  border-radius: 50%;
  background-color: #f6f3d3;
}

.box-notification-list {
  padding: 7px 13px;
}

.box-notification-list,
.box-notification-details {
  height: 450px;
}

.button-ranking-selected {
  width: 100px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #fff7db;
  text-shadow: rgb(171, 92, 26) 1px 0px 0px, rgb(171, 92, 26) 1.75517px 0.958851px 0px,
    rgb(171, 92, 26) 1.0806px 1.68294px 0px, rgb(171, 92, 26) 0.141474px 1.99499px 0px,
    rgb(171, 92, 26) -0.832294px 1.81859px 0px, rgb(171, 92, 26) -1.60229px 1.19694px 0px,
    rgb(171, 92, 26) -1.97998px 0.28224px 0px, rgb(171, 92, 26) -1.87291px -0.701566px 0px,
    rgb(171, 92, 26) -1.30729px -1.5136px 0px, rgb(171, 92, 26) -0.421592px -1.95506px 0px,
    rgb(171, 92, 26) 0.567324px -1.91785px 0px, rgb(171, 92, 26) 1.41734px -1.41108px 0px,
    rgb(171, 92, 26) 1.92034px -0.558831px 0px;
  background-color: #f1d280;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: -5px;
  cursor: pointer;
  z-index: 1;
}

.button-ranking-no-selected {
  width: 100px;
  height: 40px;
  font-size: 14px;
  font-weight: bold;
  color: #e48943;
  text-shadow: rgb(135, 79, 1) 2px 0px 0px, rgb(135, 79, 1) 1.75517px 0.958851px 0px,
    rgb(135, 79, 1) 1.0806px 1.68294px 0px, rgb(135, 79, 1) 0.141474px 1.99499px 0px,
    rgb(135, 79, 1) -0.832294px 1.81859px 0px, rgb(135, 79, 1) -1.60229px 1.19694px 0px,
    rgb(135, 79, 1) -1.97998px 0.28224px 0px, rgb(135, 79, 1) -1.87291px -0.701566px 0px,
    rgb(135, 79, 1) -1.30729px -1.5136px 0px, rgb(135, 79, 1) -0.421592px -1.95506px 0px,
    rgb(135, 79, 1) 0.567324px -1.91785px 0px, rgb(135, 79, 1) 1.41734px -1.41108px 0px,
    rgb(135, 79, 1) 1.92034px -0.558831px 0px;
  background-color: #bb8334;
  border-radius: 10px 10px 0px 0px;
  margin-bottom: -5px;
  cursor: pointer;
  z-index: 1;
}

.box-ranking-list {
  position: relative;
  height: 350px;
  z-index: 2;
  background-color: #f1d280;
  border: 5px solid#f1d280;
  border-radius: 7px;
}

.box-notification-list,
.box-ranking-list {
  overflow-y: auto;
}

/* width */
.box-details-scroll::-webkit-scrollbar,
.box-notification-list::-webkit-scrollbar,
.box-ranking-list::-webkit-scrollbar {
  width: 7px;
  height: 7px;
}

/* Track */
.box-details-scroll::-webkit-scrollbar-track,
.box-notification-list::-webkit-scrollbar-track,
.box-ranking-list::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 20px;
}

/* Handle */
.box-details-scroll::-webkit-scrollbar-thumb,
.box-notification-list::-webkit-scrollbar-thumb,
.box-ranking-list::-webkit-scrollbar-thumb {
  background: #f7a006;
  border-radius: 20px;
}

/* Handle on hover */
.box-details-scroll::-webkit-scrollbar-thumb:hover,
.box-notification-list::-webkit-scrollbar-thumb:hover,
.box-ranking-list::-webkit-scrollbar-thumb:hover {
  background: #a46100;
}

.box-content-setting {
  background-color: #f1d280;
  border: 1px solid #a46100;
  border-radius: 10px;
}

.icon-setting {
  color: #a36112;
}

.btn-active {
  transition: 0.1s;
  transform: scale(1);
}

.btn-active:active {
  transition: 0.1s;
  transform: scale(0.9);
}

.text-border {
  color: #653d03;
  font-weight: bold;
  text-shadow: rgb(255, 255, 255) 1px 0px 0px,
    rgb(255, 255, 255) 0.540302px 0.841471px 0px,
    rgb(255, 255, 255) -0.416147px 0.909297px 0px,
    rgb(255, 255, 255) -0.989992px 0.14112px 0px,
    rgb(255, 255, 255) -0.653644px -0.756802px 0px,
    rgb(255, 255, 255) 0.283662px -0.958924px 0px,
    rgb(255, 255, 255) 0.96017px -0.279415px 0px;
}

.box-noti-content {
  position: relative;
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  padding: 10px 10px 15px 10px;
  border-radius: 10px;
  box-shadow: 0px 4px 0px #e28701, 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
  height: 80px;
  overflow: hidden;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.box-detail-noti {
  height: 100%;
  background-color: #f1d280;
  border-radius: 10px;
}

.box-details-scroll {
  height: 400px;
  overflow-y: auto;
}

// Profile
.box-profile {
  max-width: 600px;
  width: 100%;
  background-color: #3c2724;
  border-radius: 10px;
  border: 10px solid#3c2724;
}

.new-news {
  animation: moveNews 1s ease-out infinite alternate;
  top: 3px;
  right: -10px;
  background-color: #f00;
  padding: 0px 5px;
  border-radius: 3px;
  font-size: 12px;
  color: #fff;
}

@keyframes moveNews {
  from {
    transform: rotate(45deg) scale(1);
  }
  to {
    transform: rotate(45deg) scale(0.9);
  }
}

.text-ranking-star {
  direction: rtl;
}

.text-news-title {
  color: #fff;
  text-shadow: rgb(81, 42, 8) 2px 0px 0px, rgb(81, 42, 8) 1.75517px 0.958851px 0px,
    rgb(81, 42, 8) 1.0806px 1.68294px 0px, rgb(81, 42, 8) 0.141474px 1.99499px 0px,
    rgb(81, 42, 8) -0.832294px 1.81859px 0px, rgb(81, 42, 8) -1.60229px 1.19694px 0px,
    rgb(81, 42, 8) -1.97998px 0.28224px 0px, rgb(81, 42, 8) -1.87291px -0.701566px 0px,
    rgb(81, 42, 8) -1.30729px -1.5136px 0px, rgb(81, 42, 8) -0.421592px -1.95506px 0px,
    rgb(81, 42, 8) 0.567324px -1.91785px 0px, rgb(81, 42, 8) 1.41734px -1.41108px 0px,
    rgb(81, 42, 8) 1.92034px -0.558831px 0px;
}
</style>
