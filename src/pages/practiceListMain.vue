<template>
  <q-page
    :style="mode ? 'background-color:#694532;' : 'background-color:#1E263B'"
    :class="{ 'bg-practice-img-mobile': $q.platform.is.mobile }"
  >
    <app-bar
      :isShowHome="true"
      :systemStore="systemStore"
      :isLoadPractice="isLoad"
    ></app-bar>

    <!-- DESKTOP Will Show BACKGROUND IMAGE -->
    <div
      class="box-container-main row relative-position"
      v-if="$q.platform.is.desktop && isLoad"
      style="overflow: hidden"
    >
      <!-- <theme-day class="absolute-top fit" v-if="mode"></theme-day>
      <theme-night class="absolute-top fit" v-else> </theme-night> -->

      <!-- <theme-new-year-day v-if="mode" class="absolute-top fit"></theme-new-year-day>
      <theme-new-year-night v-else class="absolute-top fit"></theme-new-year-night> -->

      <theme-valentine-day
        v-if="mode"
        class="absolute-top fit"
      ></theme-valentine-day>
      <theme-valentine-night
        v-else
        class="absolute-top fit"
      ></theme-valentine-night>
      <div
        class="col-12 self-center q-pa-md brt"
        style="z-index: 2"
        align="center"
        v-if="isLoad"
      >
        <div
          class="relative-position animate__animated animate__fadeIn"
          style="animation-duration: 1s"
        >
          <div
            class=" bg-practice-img-pc"
            style="
              margin: auto;
              border-radius: 40px;
              border: 10px solid #f68a14;
              background-color: #fff1d6;
              overflow: hidden;
            "
          >
            <div class="row q-py-md" style="width: 100%; margin: auto">
              <div class="col-6 row" align="left">
                <!-- Level Dropdown -->
                <div
                  class="self-center q-pl-md"
                  style="width: 130px"
                  v-if="
                    studentData.type == 'online' || studentData.type == 'demo'
                  "
                >
                  <q-select
                    outlined
                    dense
                    borderless
                    v-model="levelSelected"
                    :options="levelOptions"
                    bg-color="amber"
                    @update:model-value="funcSelectedLevel()"
                  ></q-select>
                </div>
                <!-- unit Dropdown -->
                <div class="q-pl-md col self-center">
                  <div style="max-width: 250px; width: 100%">
                    <q-select
                      borderless
                      outlined
                      dense
                      bg-color="white"
                      v-model="unitSelected"
                      :options="unitOptions"
                      @update:model-value="funcSelectedUnit()"
                    >
                    </q-select>
                  </div>
                </div>
              </div>
              <div class="col-6 self-center q-px-sm" align="right">
                <!-- unit Dropdown -->
                <div class="self-center" style="width: 130px" align="right">
                  <q-btn
                    class="bg-purple-8 rounded-borders"
                    dense
                    style="border-radius: 10px"
                    @click="isShowContents = true"
                  >
                    <div style="padding: 3px 10px">
                      <q-icon
                        name="fas fa-book"
                        class="q-mr-sm text-white"
                      ></q-icon>
                      <span class="relative-position text-white f16 q-pt-md"
                        >สารบัญ</span
                      >
                    </div>
                  </q-btn>
                </div>
              </div>
            </div>
            <div class="line"></div>
            <div align="left" class="row box-practice-list">
              <div class="col-6 q-py-md q-px-lg">
                <!-- Vocabulary -->
                <div class="q-mt-sm">
                  <div class="text-weight-bold text-brown">คำศัพท์</div>
                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Vocabulary").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in vocabPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          v-if="item.practiceType != 'flashcard'"
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <div v-if="item.practiceType == 'flashcard'">
                          <q-btn
                            class="no-pointer-events"
                            dense
                            :class="
                              showLessonPractice(item) ? 'bg-green' : 'bg-icon'
                            "
                            size="9px"
                            round
                          >
                            <q-icon
                              name="fas fa-flag"
                              size="14px"
                              :class="
                                showLessonPractice(item)
                                  ? 'text-white'
                                  : 'text-icon'
                              "
                              class=""
                            ></q-icon>
                          </q-btn>
                        </div>
                        <div v-else>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-pt-md">
                  <hr style="border-top: 3px dashed #eeae5c" />
                </div>

                <!-- Grammar -->
                <div>
                  <div class="text-weight-bold text-brown">ไวยากรณ์</div>
                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Grammar").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in grammarPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          v-if="item.practiceType != 'grammarlesson'"
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <div v-if="item.practiceType == 'grammarlesson'">
                          <q-btn
                            class="no-pointer-events"
                            dense
                            :class="
                              showLessonPractice(item) ? 'bg-green' : 'bg-icon'
                            "
                            size="9px"
                            round
                          >
                            <q-icon
                              name="fas fa-flag"
                              size="14px"
                              :class="
                                showLessonPractice(item)
                                  ? 'text-white'
                                  : 'text-icon'
                              "
                              class=""
                            ></q-icon>
                          </q-btn>
                        </div>
                        <div v-else>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-pt-md">
                  <hr style="border-top: 3px dashed #eeae5c" />
                </div>

                <!-- Reading -->
                <div>
                  <div class="text-weight-bold text-brown">การอ่าน</div>
                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Reading").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in readingPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <!-- <div v-if="item.practiceType == 'grammarlesson'">
                      <q-btn
                        class="no-pointer-events"
                        dense
                        :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                        size="9px"
                        round
                      >
                        <q-icon
                          name="fas fa-flag"
                          size="14px"
                        :class="showLessonPractice(item) ? 'text-white' : 'text-icon'"
                          class=""
                        ></q-icon>
                      </q-btn>
                    </div> -->
                        <div>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-6 q-py-md q-px-lg">
                <!-- Writing -->
                <div class="q-mt-sm">
                  <div class="text-weight-bold text-brown">การเขียน</div>
                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Writing").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in writingPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          v-if="item.practiceType != 'phonicslesson'"
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <div v-if="item.practiceType == 'phonicslesson'">
                          <q-btn
                            class="no-pointer-events"
                            dense
                            :class="
                              showLessonPractice(item) ? 'bg-green' : 'bg-icon'
                            "
                            size="9px"
                            round
                          >
                            <q-icon
                              name="fas fa-flag"
                              size="14px"
                              :class="
                                showLessonPractice(item)
                                  ? 'text-white'
                                  : 'text-icon'
                              "
                              class=""
                            ></q-icon>
                          </q-btn>
                        </div>
                        <div v-else>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-pt-md">
                  <hr style="border-top: 3px dashed #eeae5c" />
                </div>

                <!-- Phonics -->
                <div>
                  <div class="text-weight-bold text-brown">การออกเสียง</div>
                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Phonics").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in phonicsPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          v-if="item.practiceType != 'phonicslesson'"
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <div v-if="item.practiceType == 'phonicslesson'">
                          <q-btn
                            class="no-pointer-events"
                            dense
                            :class="
                              showLessonPractice(item) ? 'bg-green' : 'bg-icon'
                            "
                            size="9px"
                            round
                          >
                            <q-icon
                              name="fas fa-flag"
                              size="14px"
                              :class="
                                showLessonPractice(item)
                                  ? 'text-white'
                                  : 'text-icon'
                              "
                              class=""
                            ></q-icon>
                          </q-btn>
                        </div>
                        <div v-else>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="q-pt-md">
                  <hr style="border-top: 3px dashed #eeae5c" />
                </div>

                <!-- Listening & Speaking -->
                <div>
                  <div class="text-weight-bold text-brown">การฟังและการพูด</div>

                  <div style="color: #a95d00" class="text-weight-bolder">
                    ({{ showPracticeName("Listening & Speaking").nameEng }})
                  </div>
                  <div class="row">
                    <div
                      v-for="(item, index) in listeningPracticeList"
                      :key="index"
                      class="practice-btn q-mx-md q-my-sm"
                      :orderNumber="index + 1"
                      @click="
                        showCountPractice(item) == 2
                          ? (isShowLearningDone = true)
                          : funcGotoPractice(item, index + 1)
                      "
                    >
                      <q-img style="width: 60px" :src="showPracticeIcon(item)">
                        <div
                          v-if="
                            item.practiceType != 'languagetips' &&
                            item.practiceType != 'conversationlesson'
                          "
                          class="absolute-bottom transparent"
                          style="height: 23px; padding: 0px; font-size: 12px"
                          align="center"
                        >
                          <span class="no-padding"
                            >({{ showCountPractice(item) }}/2)</span
                          >
                        </div>
                      </q-img>
                      <div align="center" style="padding-top: 1px">
                        <div
                          v-if="
                            item.practiceType == 'languagetips' ||
                            item.practiceType == 'conversationlesson'
                          "
                        >
                          <q-btn
                            class="no-pointer-events"
                            dense
                            :class="
                              showLessonPractice(item) ? 'bg-green' : 'bg-icon'
                            "
                            size="9px"
                            round
                          >
                            <q-icon
                              name="fas fa-flag"
                              size="14px"
                              :class="
                                showLessonPractice(item)
                                  ? 'text-white'
                                  : 'text-icon'
                              "
                              class=""
                            ></q-icon>
                          </q-btn>
                        </div>
                        <div v-else>
                          <q-icon
                            name="fas fa-star"
                            size="14px"
                            style="margin: 0px 2px"
                            v-for="i in 3"
                            :class="
                              showStarPractice(item) >= i
                                ? 'text-star'
                                : 'text-brown-9'
                            "
                          ></q-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ************************************** Mobile ************************************** -->
    <div
      class="mobile-only q-pa-md animate__animated animate__bounceInDown"
      style="animation-duration: 2s"
      v-if="$q.platform.is.mobile && isLoad"
    >
      <div class="row" style="max-width: 400px; margin: auto">
        <!-- Level Dropdown -->
        <div
          class="col-1"
          style="width: 100px"
          v-if="studentData.type == 'online' || studentData.type == 'demo'"
        >
          <q-select
            outlined
            dense
            borderless
            v-model="levelSelected"
            :options="levelOptions"
            bg-color="amber"
            @update:model-value="funcSelectedLevel()"
          >
            <template v-slot:selected-item="scope">
              <span class="text-no-wrap">{{ scope.opt.label }}</span>
            </template></q-select
          >
        </div>
        <!-- unit Dropdown -->
        <div class="q-pl-md col">
          <q-select
            style="width: 100%; border: 1px solid #4e1617; border-radius: 5px"
            borderless
            outlined
            dense
            bg-color="white"
            v-model="unitSelected"
            :options="unitOptions"
            @update:model-value="funcSelectedUnit()"
          >
            <template v-slot:selected-item="scope">
              <span class="text-no-wrap">{{ scope.opt.label }}</span>
            </template>
          </q-select>
        </div>
        <div class="col-1 q-pl-md" style="width: 60px">
          <q-btn
            push
            class="bg-purple-8 fit text-white"
            icon="fas fa-book"
            dense
            round
            @click="isShowContents = true"
          >
          </q-btn>
        </div>
      </div>

      <!-- Vocabulary List -->
      <div class="q-pt-lg">
        <div class="text-weight-bold text-brown">คำศัพท์</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Vocabulary").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in vocabPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                v-if="item.practiceType != 'flashcard'"
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <div v-if="item.practiceType == 'flashcard'">
                <q-btn
                  class="no-pointer-events"
                  dense
                  :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                  size="9px"
                  round
                >
                  <q-icon
                    name="fas fa-flag"
                    size="14px"
                    :class="
                      showLessonPractice(item) ? 'text-white' : 'text-icon'
                    "
                    class=""
                  ></q-icon>
                </q-btn>
              </div>
              <div v-else>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- Grammar List -->
      <div>
        <div class="text-weight-bold text-brown">ไวยากรณ์</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Grammar").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in grammarPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                v-if="item.practiceType != 'grammarlesson'"
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <div v-if="item.practiceType == 'grammarlesson'">
                <q-btn
                  class="no-pointer-events"
                  dense
                  :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                  size="9px"
                  round
                >
                  <q-icon
                    name="fas fa-flag"
                    size="14px"
                    :class="
                      showLessonPractice(item) ? 'text-white' : 'text-icon'
                    "
                    class=""
                  ></q-icon>
                </q-btn>
              </div>
              <div v-else>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- Reading List -->
      <div>
        <div class="text-weight-bold text-brown">การอ่าน</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Reading").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in readingPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <!-- <div v-if="item.practiceType == 'grammarlesson'">
                      <q-btn
                        class="no-pointer-events"
                        dense
                        :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                        size="9px"
                        round
                      >
                        <q-icon
                          name="fas fa-flag"
                          size="14px"
                        :class="showLessonPractice(item) ? 'text-white' : 'text-icon'"
                          class=""
                        ></q-icon>
                      </q-btn>
                    </div> -->
              <div>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Writing" List -->
      <div>
        <div class="text-weight-bold text-brown">การเขียน</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Writing").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in writingPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                v-if="item.practiceType != 'phonicslesson'"
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <div v-if="item.practiceType == 'phonicslesson'">
                <q-btn
                  class="no-pointer-events"
                  dense
                  :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                  size="9px"
                  round
                >
                  <q-icon
                    name="fas fa-flag"
                    size="14px"
                    :class="
                      showLessonPractice(item) ? 'text-white' : 'text-icon'
                    "
                    class=""
                  ></q-icon>
                </q-btn>
              </div>
              <div v-else>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Phonics" List -->
      <div>
        <div class="text-weight-bold text-brown">การออกเสียง</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Phonics").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in phonicsPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                v-if="item.practiceType != 'phonicslesson'"
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <div v-if="item.practiceType == 'phonicslesson'">
                <q-btn
                  class="no-pointer-events"
                  dense
                  :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                  size="9px"
                  round
                >
                  <q-icon
                    name="fas fa-flag"
                    size="14px"
                    :class="
                      showLessonPractice(item) ? 'text-white' : 'text-icon'
                    "
                    class=""
                  ></q-icon>
                </q-btn>
              </div>
              <div v-else>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>

      <!-- "Listening" List -->
      <div>
        <div class="text-weight-bold text-brown">การพูดและการฟัง</div>
        <div style="color: #a95d00" class="text-weight-bolder">
          ({{ showPracticeName("Listening & Speaking").nameEng }})
        </div>
        <div class="row">
          <div
            v-for="(item, index) in listeningPracticeList"
            :key="index"
            class="practice-btn q-mx-md q-my-sm"
            :orderNumber="index + 1"
            @click="
              showCountPractice(item) == 2
                ? (isShowLearningDone = true)
                : funcGotoPractice(item, index + 1)
            "
          >
            <q-img style="width: 60px" :src="showPracticeIcon(item)">
              <div
                v-if="
                  item.practiceType != 'languagetips' &&
                  item.practiceType != 'conversationlesson'
                "
                class="absolute-bottom transparent"
                style="height: 23px; padding: 0px; font-size: 12px"
                align="center"
              >
                <span class="no-padding"
                  >({{ showCountPractice(item) }}/2)</span
                >
              </div>
            </q-img>
            <div align="center" style="padding-top: 1px">
              <div
                v-if="
                  item.practiceType == 'languagetips' ||
                  item.practiceType == 'conversationlesson'
                "
              >
                <q-btn
                  class="no-pointer-events"
                  dense
                  :class="showLessonPractice(item) ? 'bg-green' : 'bg-icon'"
                  size="9px"
                  round
                >
                  <q-icon
                    name="fas fa-flag"
                    size="14px"
                    :class="
                      showLessonPractice(item) ? 'text-white' : 'text-icon'
                    "
                  ></q-icon>
                </q-btn>
              </div>
              <div v-else>
                <q-icon
                  name="fas fa-star"
                  size="14px"
                  style="margin: 0px 2px"
                  v-for="i in 3"
                  :class="
                    showStarPractice(item) >= i ? 'text-star' : 'text-brown-9'
                  "
                ></q-icon>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="q-py-md">
        <!-- <q-separator /> -->
        <hr style="border-top: 3px dashed #eeae5c" />
      </div>
    </div>

    <q-dialog maximized v-model="isShowContents">
      <q-card class="transparent shadow-0" v-if="isLoad">
        <q-card-section class="fit row justify-center items-center">
          <!-- Desktop -->
          <div
            class="relative-position box-table-contents q-pa-md"
            v-if="$q.platform.is.desktop"
          >
            <div class="row">
              <div class="col-6 q-pa-md" align="center">
                <q-select
                  v-model="selectSkill"
                  :options="skillOptions"
                  emit-value
                  map-options
                  dense
                  outlined
                  borderless
                  class="bg-white"
                  input-class="text-bold"
                  style="width: 70%"
                ></q-select>
              </div>
              <div class="col self-center q-px-md" align="right">
                <q-btn
                  v-close-popup
                  flat
                  size="25px"
                  class="text-red"
                  dense
                  round
                >
                  <q-icon name="fas fa-times-circle"></q-icon>
                </q-btn>
              </div>
            </div>
            <div class="line"></div>
            <div class="box-contents">
              <div class="row">
                <div class="col-6">
                  <div
                    class="col-12 row items-start"
                    v-for="(item, index) in contentsLeft"
                  >
                    <div class="col-12 self-start q-px-lg">
                      <div
                        class="row q-px-sm"
                        :style="
                          index == 0 ? '' : 'border-top: 1px dashed #eeae5c'
                        "
                      >
                        <div
                          class="q-pa-xs q-py-sm row"
                          style="font-size: 15px"
                        >
                          <div class="self-start">
                            <div class="text-bold">บทที่ {{ index + 1 }}:</div>
                          </div>
                          <div class="col q-px-md self-start">
                            {{ item.nameEng }}
                            <br />
                            {{ item.nameTh }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-6">
                  <div
                    class="col-12 row items-start"
                    v-for="(item, index) in contentsRight"
                  >
                    <div class="col-12 self-start q-px-lg">
                      <div
                        class="row q-px-sm"
                        :style="
                          index == 0 ? '' : 'border-top: 1px dashed #eeae5c'
                        "
                      >
                        <div
                          class="q-pa-xs q-py-sm row"
                          style="font-size: 15px"
                        >
                          <div class="self-start">
                            <div class="text-bold">บทที่ {{ index + 9 }}:</div>
                          </div>
                          <div class="col q-px-md self-start">
                            {{ item.nameEng }}
                            <br />
                            {{ item.nameTh }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile -->
          <div v-else>
            <div class="full-width">
              <div class="box-table-content-mobile q-pa-md" align="center">
                <div align="center">
                  <q-select
                    v-model="selectSkill"
                    :options="skillOptions"
                    emit-value
                    map-options
                    dense
                    outlined
                    class="bg-white"
                    input-class="text-bold "
                    style="width: 100%"
                  ></q-select>
                </div>
                <div class="box-content-mobile q-mt-md">
                  <div
                    v-for="(item, index) in practiceName.filter(
                      (x) => x.skill == selectSkill
                    )"
                    class="q-pr-sm"
                  >
                    <div
                      class="row q-px-sm"
                      :style="
                        index == 0 ? '' : 'border-top: 1px dashed #eeae5c'
                      "
                    >
                      <div class="q-pa-xs q-py-sm row" style="font-size: 14px">
                        <div class="self-start">
                          <div class="text-bold">บทที่ {{ index + 1 }}:</div>
                        </div>
                        <div class="col q-px-md self-start" align="left">
                          {{ item.nameEng }}
                          <br />
                          {{ item.nameTh }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="q-pa-md" align="center">
                <q-btn
                  v-close-popup
                  push
                  size="25px"
                  class="bg-red text-white"
                  dense
                  round
                >
                  <q-icon name="fas fa-times"></q-icon>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="isDialogPurchas">
      <q-card class="transparent shadow-0">
        <q-card-section class="row justify-center items-center">
          <div>
            <q-img width="300px" src="/images/dialog-box.png"></q-img>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <learning-done
      :isShowLearningDone="isShowLearningDone"
      @callback-closedialog="isShowLearningDone = false"
    ></learning-done>

    <tutorial
      :type="
        studentData.type == 'demo' || studentData.type == 'online'
          ? 'online'
          : 'school'
      "
      :isShowTutorial="isShowTutorial"
      v-if="isLoad"
      skill=""
    ></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import themeDay from "../components/lobby/themeDay.vue";
import themeNight from "../components/lobby/themeNight.vue";
import themeNewYearNight from "../components/lobby/theme-new-year-night.vue";
import themeNewYearDay from "../components/lobby/theme-new-year-day.vue";
import themeValentineDay from "../components/lobby/theme-valentine-2022-day.vue";
import themeValentineNight from "../components/lobby/theme-valentine-2022-night.vue";
import appBar from "../components/app-bar.vue";
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import studentHooks from "../hooks/gameHooks";
import practiceHooks from "../hooks/practiceHooks";
import learningDone from "../components/dialog-learning-done.vue";
import { analyticsLogEvent, auth } from "src/router";
import loading from "../components/dialog-loading.vue";
import tutorial from "../components/tutorial.vue";
import updateHooks from "../hooks/updateHooks";
export default {
  components: {
    themeDay,
    themeNight,
    appBar,
    learningDone,
    loading,
    tutorial,
    themeNewYearNight,
    themeNewYearDay,
    themeValentineDay,
    themeValentineNight,
  },
  props: {
    systemStore: {
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const isShowLoading = ref(false);

    // Dialog Learning
    const isShowLearningDone = ref(false);

    // background mode
    const mode = ref(false);
    // Router
    const router = useRouter();
    const route = useRoute();

    // Quasar
    const $q = useQuasar();

    // Level Selected
    const levelOptions = ref([]);
    const levelSelected = ref("");

    // unit Selected
    const unitOptions = ref([]);
    const unitSelected = ref("");

    // Load Practice
    const practiceLog = ref([]);
    const practiceList = ref([]);
    const practiceName = ref([]);
    const isLoad = ref(false);

    const vocabPracticeList = ref([]);
    const grammarPracticeList = ref([]);
    const readingPracticeList = ref([]);
    const writingPracticeList = ref([]);
    const phonicsPracticeList = ref([]);
    const listeningPracticeList = ref([]);

    const filterPracticeList = () => {
      // Vocab Practice List
      vocabPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Vocabulary" && x.unit == unitSelected.value.value
      );
      vocabPracticeList.value.sort((a, b) => a.order - b.order);

      // Grammar Practice List
      grammarPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Grammar" && x.unit == unitSelected.value.value
      );
      grammarPracticeList.value.sort((a, b) => a.order - b.order);

      // Reading Practice List
      readingPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Reading" && x.unit == unitSelected.value.value
      );
      readingPracticeList.value.sort((a, b) => a.order - b.order);

      // Writing Practice List
      writingPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Writing" && x.unit == unitSelected.value.value
      );
      writingPracticeList.value.sort((a, b) => a.order - b.order);

      // Phonics Practice List
      phonicsPracticeList.value = practiceList.value.filter(
        (x) => x.skill == "Phonics" && x.unit == unitSelected.value.value
      );
      phonicsPracticeList.value.sort((a, b) => a.order - b.order);

      // Listening Practice List
      listeningPracticeList.value = practiceList.value.filter(
        (x) =>
          x.skill == "Listening & Speaking" &&
          x.unit == unitSelected.value.value
      );
      listeningPracticeList.value.sort((a, b) => a.order - b.order);
    };

    const funcSelectedLevel = async () => {
      $q.sessionStorage.set("currentLevel", levelSelected.value);
      let uid = auth.currentUser.uid;

      updateHooks.updateactivecourse(uid, levelSelected.value.courseId);

      funcLoadSetUnit();
      funcLoadPracticeList();
    };

    const funcSelectedUnit = async () => {
      $q.sessionStorage.set("currentUnit", unitSelected.value);
      funcLoadPracticeList();
    };

    const funcLoadPracticeList = async () => {
      // let isHasSession = $q.sessionStorage.has("PDL");

      // if (isHasSession) {
      //   practiceList.value = $q.sessionStorage.getItem("PDL");
      //   practiceLog.value = $q.sessionStorage.getItem("PL");
      //   practiceName.value = $q.sessionStorage.getItem("PLN");

      //   filterPracticeList();

      //   return;
      // }

      try {
        let tempPractice = [];

        // Get Practice List
        tempPractice = await practiceHooks
          .practice(levelSelected.value.value)
          .practiceList();

        tempPractice.sort(
          (a, b) =>
            Number(a.level) - Number(b.level) ||
            Number(a.unit) - Number(b.unit) ||
            Number(a.order) - Number(b.order)
        );

        practiceList.value = tempPractice;

        filterPracticeList();

        // Get Practice Name
        let tempListName = [];

        tempListName = await practiceHooks
          .practice(levelSelected.value.value)
          .practiceName();

        tempListName = tempListName.sort(
          (a, b) => Number(a.unit) - Number(b.unit)
        );

        practiceName.value = tempListName;

        // Get PracticeLog
        practiceLog.value = await practiceHooks
          .practice(levelSelected.value.value)
          .log();

        $q.sessionStorage.set("PL", practiceLog.value);
        $q.sessionStorage.set("PDL", tempPractice);
        $q.sessionStorage.set("PLN", tempListName);

        // if ($q.platform.is.desktop) {
        //   activeUnit.value = 1;
        //   showPracticeList(activeUnit.value);
        // }
      } catch (error) {
        console.error(error);
      }
    };

    // Level List
    // Get Course
    const funcGetCourse = async (uid) => {
      try {
        let course;

        if (studentData.value.type == "tutor") {
          studentData.value.type = "school";
        }

        // นักเรียนประเภท Online And Demo
        if (studentData.value.type != "school") {
          course = await studentHooks.getallcourse(uid);

          course.forEach(async (res) => {
            levelOptions.value.push({
              label: "ระดับ " + res.level,
              value: res.level,
              unit: res.unit,
              courseId: res.courseId,
            });
          });
          levelOptions.value.sort((a, b) => Number(a.value) - Number(b.value));
          // levelOptions.value = levelOptions.value.filter((x) => x.value != "0");
        }

        // นักเรียนประเภท School
        else {
          course = await studentHooks.courseInfomation(
            studentData.value.currentCourseId
          );

          levelOptions.value = [
            {
              label: "ระดับ " + course.level,
              value: course.level,
              unit: course.unit || 16,
              courseId: studentData.value.currentCourseId,
            },
          ];
        }

        levelSelected.value = levelOptions.value[0];

        if ($q.sessionStorage.has("currentLevel")) {
          levelSelected.value = $q.sessionStorage.getItem("currentLevel");
        } else {
          levelSelected.value = levelOptions.value[0];
        }

        funcLoadSetUnit();
      } catch (error) {
        console.error(error);
      }
    };

    const funcLoadSetUnit = () => {
      let totalUnit = Number(levelSelected.value.unit);

      let tempUnit = [];

      for (let unit = 0; unit < totalUnit; unit++) {
        tempUnit.push({
          label: "บทที่ " + (unit + 1),
          value: unit + 1,
        });
      }

      unitOptions.value = tempUnit;

      if ($q.sessionStorage.has("currentUnit")) {
        unitSelected.value = $q.sessionStorage.getItem("currentUnit");
      } else {
        unitSelected.value = tempUnit[0];
      }
    };

    // โชว์สถานะที่ทำแล้วของ บทเรียน
    const showLessonPractice = (item) => {
      let findLesson = practiceLog.value.filter(
        (x) => x.practiceListId == item.practiceListId
      );

      let hasLesson = false;

      if (findLesson.length) {
        hasLesson = true;
      }

      return hasLesson;
    };

    // โชว์จำนวนดาวที่ทำจากแบบฝึกหัด
    const showStarPractice = (item) => {
      let findStar = practiceLog.value.filter(
        (x) => x.practiceListId == item.practiceListId
      );

      let star = 0;

      if (findStar.length) {
        star = findStar[0].star;
      }

      return star;
    };

    const showCountPractice = (item) => {
      let findPractice = practiceLog.value.filter(
        (x) => x.practiceListId == item.practiceListId
      );

      let count = 0;

      if (
        item.practiceType == "flashcard" ||
        item.practiceType == "grammarlesson" ||
        item.practiceType == "phonicslesson" ||
        item.practiceType == "languagetips" ||
        item.practiceType == "conversationlesson"
      ) {
        count = 0;
      } else {
        if (findPractice.length) {
          count = findPractice[0].counter;
        }
      }

      return count;
    };

    const showPracticeIcon = (item) => {
      let type = item.practiceType;

      let star = 0;

      let findPractice = practiceLog.value.filter(
        (x) => x.practiceListId == item.practiceListId
      );

      let defaultPactice = "default";

      if (findPractice.length) {
        defaultPactice = "success";
      }

      let nameImage;
      if (
        type == "flashcard" ||
        type == "grammarlesson" ||
        type == "phonicslesson" ||
        type == "languagetips" ||
        type == "conversationlesson"
      ) {
        nameImage = `/images/practicelist/teaching-btn-${defaultPactice}.png`;
      } else if (type == "matching") {
        nameImage = `/images/practicelist/matching-btn-${defaultPactice}.png`;
      } else if (type.includes("multi")) {
        nameImage = `/images/practicelist/multiple-btn-${defaultPactice}.png`;
      } else if (type == "clozetest" || type == "translation") {
        nameImage = `/images/practicelist/writing-btn-${defaultPactice}.png`;
      } else if (type == "spellingbee") {
        nameImage = `/images/practicelist/spelling-btn-${defaultPactice}.png`;
      } else if (type == "grammaraction") {
        nameImage = `/images/practicelist/action-btn-${defaultPactice}.png`;
      } else if (type == "roleplay") {
        // audio record and evaluation
        nameImage = `/images/practicelist/speaking-btn-${defaultPactice}.png`;
      } else {
        // audio record and evaluation
        nameImage = `/images/practicelist/action-btn-${defaultPactice}.png`;
      }
      let random = Math.random();

      return `${nameImage}`;
    };

    const showPracticeName = (skill) => {
      let res = practiceName.value.filter(
        (x) => x.skill == skill && x.unit == unitSelected.value.value.toString()
      );

      return res.length ? res[0] : { nameEng: "" };
    };

    const funcGotoPractice = (data) => {
      let routerName = "";

      if (data.practiceType == "flashcard") {
        routerName = "/flashcard/";
      } else if (data.practiceType == "matching") {
        routerName = "/matching/";
      } else if (data.practiceType.includes("multiplechoices")) {
        if (data.skill == "Vocabulary") {
          routerName = "/multiplevocab/";
        } else if (data.skill == "Grammar") {
          routerName = "/grammarmultiple/";
        } else if (data.skill == "Phonics") {
          routerName = "/phonicsMultiple/";
        } else if (data.skill == "Reading") {
          routerName = "/readingmultiple/";
        } else if (data.skill == "Listening & Speaking") {
          if (data.practiceType == "multiplechoices(answersound)") {
            routerName = "/conversationmultiple/";
          } else {
            routerName = "/languagetipmultiple/";
          }
        }
      } else if (data.practiceType == "spellingbee") {
        routerName = "/spellingbee/";
      } else if (
        data.practiceType == "grammarlesson" ||
        data.practiceType == "phonicslesson" ||
        data.practiceType == "languagetips"
      ) {
        routerName = "/vdoLesson/";
      } else if (data.practiceType == "grammaraction") {
        routerName = "/grammarAction/";
      } else if (data.practiceType == "translation") {
        routerName = "/translation/";
      } else if (data.practiceType == "clozetest") {
        routerName = "/clozeTest/";
      } else if (data.practiceType == "conversationlesson") {
        routerName = "/conversationLesson/";
      } else if (data.practiceType == "roleplay") {
        routerName = "/roleplay/";
      }

      router.replace(routerName + data.practiceListId);
    };

    // Contents Dialog
    const isShowContents = ref(false);
    const selectSkill = ref("Vocabulary");
    const skillOptions = ref([
      { label: "คำศัพท์", value: "Vocabulary" },
      { label: "ไวยากรณ์", value: "Grammar" },
      { label: "การอ่าน", value: "Reading" },
      { label: "การเขียน", value: "Writing" },
      { label: "การออกเสียง", value: "Phonics" },
      { label: "การฟังและการพูด", value: "Listening & Speaking" },
    ]);

    const contentsLeft = computed(() => {
      let temp = practiceName.value.filter((x) => x.skill == selectSkill.value);
      return temp.splice(0, 8);
    });

    const contentsRight = computed(() => {
      let temp = practiceName.value.filter((x) => x.skill == selectSkill.value);
      return temp.splice(8);
    });

    // Func : Set Time Local

    const loadCurrentTime = () => {
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

    const isShowTutorial = ref(false);
    const studentData = ref({});
    const funcLoadTutorial = async (uid) => {
      let getData = await studentHooks.studentInfomation(uid);

      studentData.value = getData;

      let setType = "school";

      if (getData.type == "demo" || getData.type == "online") {
        setType = "online";
      }

      // studentData.value.currentType = setType;

      if (getData.tutorial) {
        let findTutorial = getData.tutorial.filter(
          (x) => x.routeName == route.name && x.practiceType == setType
        );

        if (!findTutorial.length) {
          isShowTutorial.value = true;
        }
      } else {
        isShowTutorial.value = true;
      }
    };

    var authListen;
    onMounted(() => {
      isShowLoading.value = true;

      props.systemStore.setRouter("PracticeListMain");

      if (analyticsLogEvent != null) {
        analyticsLogEvent("/practice/list");
      }

      authListen = firebase.auth().onAuthStateChanged(async function (user) {
        if (user) {
          // User is signed in.
          await funcLoadTutorial();
          await funcGetCourse(user.uid);
          funcLoadPracticeList();
          loadCurrentTime();
          isLoad.value = true;
          isShowLoading.value = false;
        } else {
          // User is signed out.
          router.replace("/");
        }
      });
    });

    const isDialogPurchas = ref(false);

    onBeforeUnmount(() => {
      if (authListen) {
        authListen();
      }
    });

    return {
      isShowTutorial,
      isShowLoading,
      studentData,
      mode,
      levelOptions,
      levelSelected,
      unitOptions,
      unitSelected,
      practiceList,
      practiceName,
      practiceLog,
      vocabPracticeList,
      grammarPracticeList,
      readingPracticeList,
      writingPracticeList,
      phonicsPracticeList,
      listeningPracticeList,
      funcSelectedLevel,
      funcSelectedUnit,
      showPracticeIcon,
      showStarPractice,
      showLessonPractice,
      showCountPractice,
      funcGotoPractice,
      isLoad,
      showPracticeName,
      isShowContents,
      skillOptions,
      selectSkill,
      contentsLeft,
      contentsRight,
      isShowLearningDone,
      isDialogPurchas,
    };
  },
};
</script>

<style lang="scss" scoped>
.level-select-color {
  background-image: linear-gradient(#ffcb54, #f2a81e);
}

.bg-practice-img-pc {
  max-width: 1200px;
  width: 100%;
  background-image: url("/images/practicelist/bg-practice.png");
  background-repeat: repeat-x;
  background-size: cover;
  background-position: center;
}

.box-practice-list {
  max-height: 80vh;
  min-height: fit-content;
  overflow: auto;
}

/* width */
.box-practice-list::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-practice-list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.box-practice-list::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.box-practice-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.bg-practice-img-mobile {
  background-image: url("/images/practicelist/bg-practice.png");
  background-repeat: repeat-x;
  background-size: cover;
  background-position: center;
}

.practice-btn {
  position: relative;
  padding: 5px 5px 5px 5px;
  background-color: #9e5700;
  transition: 0.2s;
  box-shadow: 0px 3px 0px 0px #663902;
  border-radius: 0px 10px 10px 10px;
}

.practice-btn::before {
  content: attr(orderNumber);
  position: absolute;
  width: 23px;
  height: 23px;
  padding-left: 5px;
  background-color: #9e5700;
  border-radius: 5px 0px 5px 5px;
  border: 1px solid #9e5700;
  color: #fff;
  text-align: left;
  left: -15px;
  top: 0px;
  font-size: 14px;
}

.practice-btn:hover {
  transform: scale(0.95);
  transition: 0.2s;
  cursor: pointer;
}

.box-progress-practice {
  position: relative;
  width: 82%;
  height: 20px;
  border-radius: 20px;
  background-color: #fff;
  border: 2px solid #7b6060;
}

.box-progress-practice::before {
  content: attr(totalSum);
  position: absolute;
  top: -4px;
  right: -45px;
  font-weight: bold;
}

.line-progress {
  height: 100%;
  background-color: #e57373;
  border-radius: 20px;
}

.box-table-contents {
  max-width: 1200px;
  width: 100%;
  border-radius: 40px;
  border: 10px solid #f68a14;
  background-color: #fff1d6;
  overflow: hidden;
  overflow: hidden;
}

.box-table-content-mobile {
  max-width: 600px;
  width: 100%;
  background-color: #fff1d6;
  border: 10px solid#F68A15;
  border-radius: 20px;
  margin: auto;
}

.box-content-mobile {
  max-height: 60vh;
  min-height: 50vh;
  overflow: auto;
}

/* width */
.box-content-mobile::-webkit-scrollbar {
  width: 13px;
}

/* Track */
.box-content-mobile::-webkit-scrollbar-track {
  background: #c18a65;
  border: 3px solid #fff1d6;
  border-radius: 20px;
}

/* Handle */
.box-content-mobile::-webkit-scrollbar-thumb {
  background: #593815;
  border-radius: 20px;
}

/* Handle on hover */
.box-content-mobile::-webkit-scrollbar-thumb:hover {
  background: #593815;
}

.line {
  position: absolute;
  top: 0px;
  left: 50%;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
}

.box-list-number {
  position: relative;
  width: 30px;
  height: 30px;
  background-color: #7fd3c9;
  border: 5px solid;
  border-top-color: #62b8ae;
  border-right-color: #3d887f;
  border-bottom-color: #215751;
  border-left-color: #306d66;
}

.box-contents {
  width: 100%;
  max-height: 700px;
  min-height: fit-content;
  overflow: auto;
}

.bg-icon {
  background-color: #553815;
}
.text-icon {
  color: #9e5700;
}

.text-star {
  color: #ffc630;
  text-shadow: 0px 1px 3px #7a5b0a;
}
</style>
