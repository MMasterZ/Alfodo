<template>
  <q-page
    class="bg-profile"
    :class="
      $q.platform.is.desktop ? 'row justify-center items-center q-pa-md' : ''
    "
  >
    <!-- Desktop -->
    <div
      class="col-6 box-profile-main row"
      v-if="isLoaded && $q.platform.is.desktop"
    >
      <div class="col-5 box-character row">
        <div class="col-12 q-py-lg" align="center">
          <q-img
            fit="cover"
            class="cursor-pointer"
            style="max-width: 90px; width: 100%; font-size: 100%; z-index: 2"
            src="/images/lobby/box-level.png"
          >
            <div class="transparent absolute-center" style="top: 53%">
              <span class="text-grey-9 f32">{{ studentData.level }}</span>
            </div>
          </q-img>
        </div>
        <div class="self-end q-py-md">
          <character :equipment="equipment" :bodycolor="bodyColor"></character>
        </div>
      </div>
      <div class="col q-pl-md relative-position">
        <!-- Close Button -->
        <div class="absolute-right">
          <q-btn
            flat
            round
            dense
            class="text-amber"
            @click="$router.replace('/lobby')"
          >
            <q-icon name="fas fa-times-circle" size="lg"></q-icon>
          </q-btn>
        </div>
        <!--  -->
        <div class="row">
          <div
            class="col-3 relative-position"
            style="width: 150px"
            align="center"
          >
            <div
              class="icon-brown row justify-center items-center"
              :class="
                tabSelected !== 'profile' ? 'icon-brown-selected' : 'icon-brown'
              "
            >
              <q-img
                style="z-index: 2"
                width="30px"
                src="/images/icon-profile.png"
              ></q-img>
            </div>
            <div
              @click="tabSelected = 'profile'"
              v-ripple
              class="relative-position q-pa-md cursor-pointer"
              :class="
                tabSelected !== 'profile' ? 'btn-brown-selected' : 'btn-brown'
              "
            >
              <span class="f14">ข้อมูลผู้เล่น</span>
            </div>
          </div>
          <div
            class="col-3 relative-position"
            style="width: 150px"
            align="center"
          >
            <div
              class="row justify-center items-center"
              :class="
                tabSelected !== 'practice'
                  ? 'icon-brown-selected'
                  : 'icon-brown'
              "
            >
              <q-img
                style="z-index: 2"
                width="30px"
                src="/images/icon-graph.png"
              ></q-img>
            </div>
            <div
              @click="tabSelected = 'practice'"
              v-ripple
              class="relative-position q-pa-md cursor-pointer"
              :class="
                tabSelected !== 'practice' ? 'btn-brown-selected' : 'btn-brown'
              "
            >
              <span class="f14">สถิติแบบฝึกหัด</span>
            </div>
          </div>
        </div>
        <div class="box-profile-container q-pa-md">
          <q-tab-panels
            style="background-color: #894403"
            v-model="tabSelected"
            animated
          >
            <q-tab-panel name="profile" class="bg-profile-content no-padding">
              <div>
                <div class="q-py-xs q-px-md box-change-name row">
                  <div class="col self-center text-overflow">
                    <span class="f18">
                      {{ characterData.name }}
                    </span>
                  </div>
                  <div class="col-2" align="right">
                    <q-btn flat round @click="isDialogChangeName = true">
                      <q-icon name="fas fa-edit" size="24px"></q-icon>
                    </q-btn>
                  </div>
                </div>
                <div class="q-px-sm q-py-sm">
                  <div class="q-pa-sm f12 box-profile-details">
                    <div class="row text-amber">
                      <div class="col-1 self-start" style="width: 15px">
                        <li class="f16"></li>
                      </div>
                      <div class="col f16">
                        <span>ชื่อ-สกุล</span>
                        <p class="text-white">{{ studentData.name }}</p>
                      </div>
                    </div>

                    <div class="row text-amber">
                      <div class="col-1 self-start" style="width: 15px">
                        <li class="f16"></li>
                      </div>
                      <div class="col f16">
                        <span>โรงเรียน</span>
                        <p class="text-white">{{ studentData.schoolName }}</p>
                      </div>
                    </div>

                    <div class="row text-amber">
                      <div class="col-1 self-start" style="width: 15px">
                        <li class="f16"></li>
                      </div>
                      <div class="col f16">
                        <span>เบอร์โทรศัพท์</span>
                        <p class="text-white">
                          {{ studentData.tel ? studentData.tel : "-" }}
                        </p>
                      </div>
                    </div>

                    <div class="row text-amber">
                      <div class="col-1 self-start" style="width: 15px">
                        <li class="f16"></li>
                      </div>
                      <div class="col f16">
                        <span>อีเมล์</span>
                        <p class="text-white">
                          {{ studentData.email ? studentData.email : "-" }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <q-tab-panel name="practice" class="no-padding">
              <div class="row justify-end">
                <div class="col-2" align="right" style="width: 120px">
                  <q-select
                    :options="levelList"
                    dense
                    outlined
                    bg-color="amber"
                    class="fit"
                    v-model="selectCourse"
                    emit-value
                    map-options
                    @update:model-value="funcGetScore()"
                  ></q-select>
                </div>
              </div>
              <div class="row q-mt-md">
                <div class="col">
                  <div class="box-practice-white q-pa-sm row">
                    <div class="col-4" style="width: 85px" align="center">
                      <q-circular-progress
                        show-value
                        font-size="28px"
                        class="text-red fit"
                        :value="studentScore.progressAVG"
                        :thickness="0.05"
                        color="teal"
                        track-color="grey-3"
                      >
                        <span class="text-black"
                          >{{ studentScore.progressAVG }}%</span
                        >
                      </q-circular-progress>
                    </div>
                    <div class="col self-center" align="center">
                      <span class="text-bold">ความก้าวหน้าเฉลี่ย</span>
                    </div>
                  </div>
                  <div
                    class="relative-position box-practice-white q-pa-sm q-mt-sm f12"
                  >
                    <div>
                      <span class="f12 text-bold">คะแนนเฉลี่ย</span>
                    </div>
                    <div class="row" style="overflow: hidden">
                      <div class="col-11 q-pr-md" style="width: 90%">
                        <div
                          class="relative-position line-progress"
                          :class="`${
                            studentScore.totalAVGScore <= 30
                              ? 'bg-red'
                              : studentScore.totalAVGScore <= 60
                              ? 'bg-amber'
                              : 'bg-teal'
                          }`"
                          :style="`width:${studentScore.totalAVGScore}%`"
                        >
                          <span
                            class="absolute-right"
                            style="top: -5px; right: -45px; width: 40px"
                            >{{ `${studentScore.totalAVGScore}%` }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="box-practice-white q-pa-sm q-mt-sm box-refs">
                    <div class="q-pb-sm">
                      <span class="f12 text-bold">คำแนะนำ (คะแนน)</span>
                    </div>
                    <div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[0].skill == 'คำศัพท์' &&
                          studentScore.newScoreAVG[0].score < 60
                        "
                      >
                        <span class="text-bold">คำศัพท์</span> -
                        ฝึกสะกดคำและทบทวนคำศัพท์ที่เรียนมา
                        เพื่อช่วยให้จดจำคำศัพท์ได้ดีขึ้น
                      </div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[1].skill == 'ไวยากรณ์' &&
                          studentScore.newScoreAVG[1].score < 60
                        "
                      >
                        <span class="text-bold">ไวยากรณ์</span> -
                        ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ
                      </div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[2].skill == 'การอ่าน' &&
                          studentScore.newScoreAVG[2].score < 60
                        "
                      >
                        <span class="text-bold">การอ่าน</span> -
                        ฝึกอ่านจับประเด็นสำคัญและทบทวนคำศัพท์ด้วย
                        จะช่วยให้เข้าใจเนื้อเรื่องมากยิ่งขึ้น
                      </div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[3].skill == 'การเขียน' &&
                          studentScore.newScoreAVG[3].score < 60
                        "
                      >
                        <span class="text-bold">การเขียน</span> -
                        ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ์
                      </div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[4].skill == 'การออกเสียง' &&
                          studentScore.newScoreAVG[4].score < 60
                        "
                      >
                        <span class="text-bold">การออกเสียง</span> -
                        ตั้งใจฟังและออกเสียงตามซ้ำๆจนเกิดความคุ้นเคย
                        จะช่วยให้รับรู้เสียงที่ได้ยินง่ายขึ้น
                      </div>
                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG[5].skill ==
                            'การฟังและการพูด' &&
                          studentScore.newScoreAVG[5].score < 60
                        "
                      >
                        <span class="text-bold">ฟังและพูด</span> -
                        จับใจความสำคัญของบทสนทนาที่เกิดขึ้น
                        รวมถึงฝึกการสนทนาบ่อยๆ
                      </div>

                      <div
                        class="q-mb-sm f12"
                        v-if="
                          studentScore.newScoreAVG.every((x) => x.score > 59)
                        "
                      >
                        <span class="text-bold"
                          >ทบทวนบทเรียนและหมั่นทำแบบฝึกหัดอยู่สม่ำเสมอเพื่อรักษาผลการเรียนที่ดีไว้</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-1" style="width: 10px"></div>
                <div class="col box-practice-white">
                  <div class="row">
                    <div class="col-6">
                      <q-btn
                        :class="
                          selectTypePractice == 'scoreAllSkill'
                            ? 'bg-amber'
                            : ''
                        "
                        class="fit"
                        style="border-radius: 10px 0px 0px 0px"
                        label="ความก้าวหน้า"
                        @click="selectTypePractice = 'scoreAllSkill'"
                      ></q-btn>
                    </div>
                    <div class="col-6">
                      <q-btn
                        :class="
                          selectTypePractice == 'scoreAllPractice'
                            ? 'bg-amber'
                            : ''
                        "
                        class="fit"
                        style="border-radius: 0px 10px 0px 0px"
                        label="คะแนน"
                        @click="selectTypePractice = 'scoreAllPractice'"
                      ></q-btn>
                    </div>
                  </div>
                  <div class="q-px-md q-py-sm">
                    <q-tab-panels v-model="selectTypePractice" animated>
                      <q-tab-panel name="scoreAllSkill" class="no-padding f12">
                        <div
                          style="margin-top: 3px"
                          v-for="(item, index) in studentScore.newSkillProgress"
                        >
                          <div>
                            {{ item.skill }}
                          </div>
                          <div class="row" style="overflow: hidden">
                            <div class="col-11 q-pr-md" style="width: 90%">
                              <div
                                class="relative-position line-progress"
                                :class="`${
                                  item.score <= 30
                                    ? 'bg-red'
                                    : item.score <= 60
                                    ? 'bg-amber'
                                    : 'bg-teal'
                                }`"
                                :style="`width:${item.score}%`"
                              >
                                <span
                                  class="absolute-right"
                                  style="top: -5px; right: -45px; width: 40px"
                                  >{{ `${item.score}%` }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                      <q-tab-panel
                        name="scoreAllPractice"
                        class="no-padding f12"
                      >
                        <div
                          style="margin-top: 3px"
                          v-for="(item, index) in studentScore.newScoreAVG"
                        >
                          <div>
                            {{ item.skill }}
                          </div>
                          <div class="row" style="overflow: hidden">
                            <div class="col-11 q-pr-md" style="width: 90%">
                              <div
                                class="relative-position line-progress"
                                :class="`${
                                  item.score <= 30
                                    ? 'bg-red'
                                    : item.score <= 60
                                    ? 'bg-amber'
                                    : 'bg-teal'
                                }`"
                                :style="`width:${item.score}%`"
                              >
                                <span
                                  class="absolute-right"
                                  style="top: -5px; right: -45px; width: 40px"
                                  >{{ `${item.score}%` }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div align="center" v-if="isLoaded && $q.platform.is.mobile">
      <div class="q-pa-md relative-position">
        <div align="center">
          <q-img
            style="max-width: 200px; width: 80%"
            src="/images/label-profile.png"
          ></q-img>
        </div>
      </div>
      <div class="row box-menu-mobile" align="left">
        <div
          class="col-3 relative-position"
          style="max-width: 120px; width: 100%"
          align="center"
        >
          <div
            class="icon-brown row justify-center items-center"
            :class="
              tabSelected !== 'profile' ? 'icon-brown-selected' : 'icon-brown'
            "
          >
            <q-img
              style="z-index: 2"
              width="30px"
              src="/images/icon-profile.png"
            ></q-img>
          </div>
          <div
            @click="tabSelected = 'profile'"
            v-ripple
            class="relative-position q-py-md cursor-pointer"
            :class="
              tabSelected !== 'profile' ? 'btn-brown-selected' : 'btn-brown'
            "
          >
            <span class="f14">ข้อมูลผู้เล่น</span>
          </div>
        </div>
        <div
          class="col-3 relative-position"
          style="max-width: 120px; width: 100%"
          align="center"
        >
          <div
            class="row justify-center items-center"
            :class="
              tabSelected !== 'practice' ? 'icon-brown-selected' : 'icon-brown'
            "
          >
            <q-img
              style="z-index: 2"
              width="30px"
              src="/images/icon-graph.png"
            ></q-img>
          </div>
          <div
            @click="tabSelected = 'practice'"
            v-ripple
            class="relative-position q-py-md cursor-pointer"
            :class="
              tabSelected !== 'practice' ? 'btn-brown-selected' : 'btn-brown'
            "
          >
            <span class="f14">สถิติแบบฝึกหัด</span>
          </div>
        </div>
        <div align="right" class="col self-end q-px-xs">
          <div style="height: 50px; border-radius: 10px 10px 0px 0px" class="">
            <q-btn
              round
              dense
              push
              style="color: #512a08"
              @click="$router.replace('/lobby')"
            >
              <q-icon name="fas fa-times-circle" size="lg"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>

      <div class="box-profile-mobile q-pa-md">
        <q-tab-panels
          style="background-color: #894403"
          v-model="tabSelected"
          animated
        >
          <q-tab-panel name="profile" class="bg-profile-content no-padding">
            <div class="q-py-xs q-px-md box-change-name row full-width">
              <div class="col self-center text-overflow" align="left">
                <span class="f18">
                  {{ characterData.name }}
                </span>
              </div>
              <div class="col-2" align="right">
                <q-btn flat round @click="isDialogChangeName = true">
                  <q-icon name="fas fa-edit" size="24px"></q-icon>
                </q-btn>
              </div>
            </div>
            <div class="">
              <div
                class="q-px-md q-pt-md q-pb-sm f12 box-profile-details"
                style="border-radius: 10px"
                align="left"
              >
                <div class="row text-amber">
                  <div class="col-1 self-start" style="width: 15px">
                    <li class="relative-position f16" style="top: -3px"></li>
                  </div>
                  <div class="col f16">
                    <span>ชื่อ-สกุล</span>
                    <p class="text-white">{{ studentData.name }}</p>
                  </div>
                </div>

                <div class="row text-amber">
                  <div class="col-1 self-start" style="width: 15px">
                    <li class="relative-position f16" style="top: -3px"></li>
                  </div>
                  <div class="col f16">
                    <span>โรงเรียน</span>
                    <p class="text-white">{{ studentData.schoolName }}</p>
                  </div>
                </div>

                <div class="row text-amber">
                  <div class="col-1 self-start" style="width: 15px">
                    <li class="relative-position f16" style="top: -3px"></li>
                  </div>
                  <div class="col f16">
                    <span>เบอร์โทรศัพท์</span>
                    <p class="text-white">
                      {{ studentData.tel ? studentData.tel : "-" }}
                    </p>
                  </div>
                </div>

                <div class="row text-amber">
                  <div class="col-1 self-start" style="width: 15px">
                    <li class="relative-position f16" style="top: -3px"></li>
                  </div>
                  <div class="col f16">
                    <span>อีเมล์</span>
                    <p class="text-white">
                      {{ studentData.email ? studentData.email : "-" }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
          <q-tab-panel name="practice" class="no-padding">
            <div class="row justify-end">
              <div class="col-2" align="right" style="width: 120px">
                <q-select
                  :options="levelList"
                  dense
                  outlined
                  bg-color="amber"
                  class="fit"
                  v-model="selectCourse"
                  emit-value
                  map-options
                  @update:model-value="funcGetScore()"
                ></q-select>
              </div>
            </div>
            <div class="row q-mt-sm">
              <div class="col-12">
                <div class="box-practice-white q-pa-sm row">
                  <div class="col-4 f16" style="width: 85px" align="left">
                    <q-circular-progress
                      show-value
                      font-size="28px"
                      class="text-red fit"
                      :value="studentScore.progressAVG"
                      :thickness="0.05"
                      color="teal"
                      track-color="grey-3"
                    >
                      <span class="text-black"
                        >{{ studentScore.progressAVG }}%</span
                      >
                    </q-circular-progress>
                  </div>
                  <div class="col self-center f16" align="center">
                    <span class="text-bold">ความก้าวหน้าเฉลี่ย</span>
                  </div>
                </div>
                <div
                  class="relative-position box-practice-white q-pa-sm q-mt-sm f16"
                >
                  <div>
                    <span>คะแนนเฉลี่ย</span>
                  </div>
                  <div class="row" style="overflow: hidden">
                    <div class="col-11 q-pr-md" style="width: 90%" align="left">
                      <div
                        class="relative-position line-progress f14"
                        :class="`${
                          studentScore.totalAVGScore <= 30
                            ? 'bg-red'
                            : studentScore.totalAVGScore <= 60
                            ? 'bg-amber'
                            : 'bg-teal'
                        }`"
                        :style="`width:${studentScore.totalAVGScore}%`"
                      >
                        <span
                          class="absolute-right"
                          style="top: -5px; right: -45px; width: 40px"
                          >{{ `${studentScore.totalAVGScore}%` }}</span
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 q-mt-sm">
                <div class="box-practice-white">
                  <div class="row f16">
                    <div class="col-6">
                      <q-btn
                        :class="
                          selectTypePractice == 'scoreAllSkill'
                            ? 'bg-amber'
                            : ''
                        "
                        class="fit"
                        style="border-radius: 10px 0px 0px 0px"
                        label="ความก้าวหน้า"
                        @click="selectTypePractice = 'scoreAllSkill'"
                      ></q-btn>
                    </div>
                    <div class="col-6">
                      <q-btn
                        :class="
                          selectTypePractice == 'scoreAllPractice'
                            ? 'bg-amber'
                            : ''
                        "
                        class="fit"
                        style="border-radius: 0px 10px 0px 0px"
                        label="คะแนน"
                        @click="selectTypePractice = 'scoreAllPractice'"
                      ></q-btn>
                    </div>
                  </div>
                  <div class="q-pa-md">
                    <q-tab-panels v-model="selectTypePractice" animated>
                      <q-tab-panel name="scoreAllSkill" class="no-padding f16">
                        <div
                          style="margin-top: 5px"
                          v-for="(item, index) in studentScore.newSkillProgress"
                          align="left"
                        >
                          <div>
                            {{ item.skill }}
                          </div>
                          <div class="row" style="overflow: hidden">
                            <div class="col-11 q-pr-md" style="width: 90%">
                              <div
                                class="relative-position line-progress"
                                :class="`${
                                  item.score <= 30
                                    ? 'bg-red'
                                    : item.score <= 60
                                    ? 'bg-amber'
                                    : 'bg-teal'
                                }`"
                                :style="`width:${item.score}%`"
                              >
                                <span
                                  class="absolute-right"
                                  style="top: -5px; right: -45px; width: 40px"
                                  >{{ `${item.score}%` }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                      <q-tab-panel
                        name="scoreAllPractice"
                        class="no-padding f12"
                      >
                        <div
                          style="margin-top: 5px"
                          v-for="(item, index) in studentScore.newScoreAVG"
                          align="left"
                        >
                          <div>
                            {{ item.skill }}
                          </div>
                          <div class="row" style="overflow: hidden">
                            <div class="col-11 q-pr-md" style="width: 90%">
                              <div
                                class="relative-position line-progress"
                                :class="`${
                                  item.score <= 30
                                    ? 'bg-red'
                                    : item.score <= 60
                                    ? 'bg-amber'
                                    : 'bg-teal'
                                }`"
                                :style="`width:${item.score}%`"
                              >
                                <span
                                  class="absolute-right"
                                  style="top: -5px; right: -45px; width: 40px"
                                  >{{ `${item.score}%` }}</span
                                >
                              </div>
                            </div>
                          </div>
                        </div>
                      </q-tab-panel>
                    </q-tab-panels>
                  </div>
                </div>
                <div class="box-practice-white q-pa-sm q-mt-sm" align="left">
                  <div class="q-pb-sm">
                    <span class="f16 text-bold">คำแนะนำ (คะแนน)</span>
                  </div>
                  <div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[0].skill == 'คำศัพท์' &&
                        studentScore.newScoreAVG[0].score < 60
                      "
                    >
                      <span class="text-bold">คำศัพท์</span> -
                      ฝึกสะกดคำและทบทวนคำศัพท์ที่เรียนมา
                      เพื่อช่วยให้จดจำคำศัพท์ได้ดีขึ้น
                    </div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[1].skill == 'ไวยากรณ์' &&
                        studentScore.newScoreAVG[1].score < 60
                      "
                    >
                      <span class="text-bold">ไวยากรณ์</span> -
                      ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ
                    </div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[2].skill == 'การอ่าน' &&
                        studentScore.newScoreAVG[2].score < 60
                      "
                    >
                      <span class="text-bold">การอ่าน</span> -
                      ฝึกอ่านจับประเด็นสำคัญและทบทวนคำศัพท์ด้วย
                      จะช่วยให้เข้าใจเนื้อเรื่องมากยิ่งขึ้น
                    </div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[3].skill == 'การเขียน' &&
                        studentScore.newScoreAVG[3].score < 60
                      "
                    >
                      <span class="text-bold">การเขียน</span> -
                      ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ์
                    </div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[4].skill == 'การออกเสียง' &&
                        studentScore.newScoreAVG[4].score < 60
                      "
                    >
                      <span class="text-bold">การออกเสียง</span> -
                      ตั้งใจฟังและออกเสียงตามซ้ำๆจนเกิดความคุ้นเคย
                      จะช่วยให้รับรู้เสียงที่ได้ยินง่ายขึ้น
                    </div>
                    <div
                      class="q-mb-sm f14"
                      v-if="
                        studentScore.newScoreAVG[5].skill ==
                          'การฟังและการพูด' &&
                        studentScore.newScoreAVG[5].score < 60
                      "
                    >
                      <span class="text-bold">ฟังและพูด</span> -
                      จับใจความสำคัญของบทสนทนาที่เกิดขึ้น รวมถึงฝึกการสนทนาบ่อยๆ
                    </div>

                    <div
                      class="q-mb-sm f14"
                      v-if="studentScore.newScoreAVG.every((x) => x.score > 59)"
                    >
                      <span class="text-bold"
                        >ทบทวนบทเรียนและหมั่นทำแบบฝึกหัดอยู่สม่ำเสมอเพื่อรักษาผลการเรียนที่ดีไว้</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

    <q-dialog maximized v-model="isDialogChangeName">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center items-center">
          <div class="col-12" align="center">
            <div
              style="
                max-width: 400px;
                width: 90%;
                background-color: #b1654b;
                border-radius: 10px;
                border: 2px solid #b1654b;
              "
            >
              <!-- <div class="q-pa-sm text-white" align="left">
                <span>ข้อมูลผู้เล่น</span>
              </div> -->
              <div
                class="q-pa-md"
                style="
                  background-color: #e6914e;
                  border-radius: 10px;
                  box-shadow: 0px 3px 0px 2px #792527;
                "
              >
                <div align="left">
                  <span> ชื่อตัวละคร </span>
                </div>
                <div class="q-mt-xs">
                  <q-input
                    outlined
                    dense
                    bg-color="white"
                    class="rounded-borders"
                    v-model="characterName"
                    :rules="[(val) => !!val, checkName]"
                    maxlength="20"
                    ref="currentname"
                  ></q-input>
                  <div class="q-pt-md q-mt-sm" align="center">
                    <q-btn
                      push
                      label="ยกเลิก"
                      dense
                      class="q-mx-xs q-px-lg bg-white"
                      v-close-popup
                    ></q-btn>
                    <q-btn
                      push
                      label="บันทึก"
                      dense
                      class="q-mx-xs q-px-lg bg-amber"
                      @click="funcChangeName()"
                    ></q-btn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <tutorial
      type=""
      :isShowTutorial="isShowTutorial"
      v-if="isLoaded"
      skill=""
    ></tutorial>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import character from "../components/character.vue";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { useQuasar } from "quasar";
import { analyticsLogEvent, auth, db } from "src/router";
import { useRoute, useRouter } from "vue-router";
import studentHooks from "../hooks/gameHooks";
import loading from "../components/dialog-loading.vue";
import tutorial from "../components/tutorial.vue";
import updateHooks from "../hooks/updateHooks";
import wordrude from "src/js/wordrude.js";
export default {
  components: {
    character,
    loading,
    tutorial,
  },
  setup(props) {
    // Intital Data
    const $q = useQuasar();
    const route = useRoute();
    const router = useRouter();
    const userId = ref("");
    const isShowLoading = ref(false);

    //
    const isLoaded = ref(false);
    const tabSelected = ref("profile");
    const selectTypePractice = ref("scoreAllSkill");

    const isDialogChangeName = ref(false);

    // Set Equipment Character
    const equipment = reactive({
      head: "",
      body: "",
      footer: "",
      pet: "",
      other: "",
    });

    // Set Color Character
    const bodyColor = ref("#FFB690");

    // Character Data
    const characterData = ref({});
    const studentData = ref({});

    const checkName = () => {
      let dataName = characterName.value;

      let regex = /\s/g;
      let found = dataName.match(regex);

      let findWordRude;

      for (let i = 0; i < wordrude.list.length; i++) {
        let pattern = new RegExp(wordrude.list[i], "gi");
        findWordRude = characterName.value.match(pattern);

        if (findWordRude != null) {
          break;
        }
      }

      if (found != null || findWordRude != null) {
        return false || "ชื่อนี้ไม่เหมาะสม";
      }
    };

    const funcGetCharacterData = async (userId) => {
      try {
        let response = await studentHooks.studentInfomation(userId);

        characterData.value = response.character;
        studentData.value = response;
        characterName.value = response.character.name;

        equipment.head = response.character.head || "";
        equipment.body = response.character.body || "";
        equipment.footer = response.character.footer || "";
        equipment.pet = response.character.pet || "";
        equipment.other = response.character.other || "";
        bodyColor.value = response.character.color;
      } catch (error) {
        router.replace("/");
      }
    };

    const levelList = ref([]);
    const selectCourse = ref("");
    const funcGetCourse = async (userId) => {
      let response = await studentHooks.getallcourse(userId);

      let tempCourse = response;

      tempCourse = tempCourse.sort((a, b) => a.level - b.level);

      tempCourse = tempCourse.map((x) => {
        return { label: "ระดับ " + x.level, value: x.courseId };
      });

      levelList.value = tempCourse;
      selectCourse.value = tempCourse[0].value;
    };

    // Func : Get Score
    const studentScore = ref({});
    const funcGetScore = async () => {
      let courseId = selectCourse.value;

      let response = await studentHooks.courseInfomation(courseId);

      let tempScore = response;

      let newScoreProgress = [
        {
          skill: "คำศัพท์",
          score: tempScore.skillProgress.vocabulary || 0,
        },
        {
          skill: "ไวยากรณ์",
          score: tempScore.skillProgress.grammar || 0,
        },
        {
          skill: "การอ่าน",
          score: tempScore.skillProgress.reading || 0,
        },
        {
          skill: "การเขียน",
          score: tempScore.skillProgress.writing || 0,
        },
        {
          skill: "การออกเสียง",
          score: tempScore.skillProgress.phonics || 0,
        },
        {
          skill: "การฟังและการพูด",
          score: tempScore.skillProgress.listening || 0,
        },
      ];

      tempScore.newSkillProgress = newScoreProgress || 0;

      let newScoreAVG = [
        {
          skill: "คำศัพท์",
          score: tempScore.scoreAVG.vocabulary || 0,
        },
        {
          skill: "ไวยากรณ์",
          score: tempScore.scoreAVG.grammar || 0,
        },
        {
          skill: "การอ่าน",
          score: tempScore.scoreAVG.reading || 0,
        },
        {
          skill: "การเขียน",
          score: tempScore.scoreAVG.writing || 0,
        },
        {
          skill: "การออกเสียง",
          score: tempScore.scoreAVG.phonics || 0,
        },
        {
          skill: "การฟังและการพูด",
          score: tempScore.scoreAVG.listening || 0,
        },
      ];

      tempScore.newScoreAVG = newScoreAVG || 0;

      tempScore.totalAVGScore = tempScore.totalAVGScore || 0;

      tempScore.progressAVG = tempScore.progressAVG || 0;

      studentScore.value = tempScore || 0;
    };

    const characterName = ref("");

    const currentname = ref("");
    const funcChangeName = async () => {
      if (!currentname.value.validate()) {
        return;
      }

      characterData.value.name = characterName.value;

      try {
        let response = await updateHooks.updatecharacter(
          userId.value,
          characterData.value
        );

        if (response == "success") {
          isDialogChangeName.value = false;
        } else {
          isDialogChangeName.value = false;
        }
      } catch (error) {
        // console.log(`${error} : Hooks Update Character`);
        isDialogChangeName.value = false;
      }
    };

    const isShowTutorial = ref(false);

    const funcLoadTutorial = async (uid) => {
      let getData = await studentHooks.studentInfomation(uid);

      if (getData.tutorial) {
        let findTutorial = getData.tutorial.filter(
          (x) => x.routeName == route.name && x.practiceType == ""
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
      authListen = auth.onAuthStateChanged(async function (user) {
        if (user) {
          userId.value = user.uid;

          if (analyticsLogEvent != null) {
            analyticsLogEvent("/profile");
          }

          await funcLoadTutorial();
          await funcGetCharacterData(user.uid);
          await funcGetCourse(user.uid);
          await funcGetScore();

          isShowLoading.value = false;
          isLoaded.value = true;
        } else {
          // User is signed out.
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
      funcChangeName,
      funcGetScore,

      // Boolean
      isShowTutorial,
      isLoaded,
      isDialogChangeName,
      isShowLoading,

      // Tab
      tabSelected,
      selectTypePractice,

      // Character
      levelList,
      selectCourse,
      studentData,
      characterData,
      characterName,
      bodyColor,
      equipment,
      studentScore,

      // Refs
      currentname,

      // Function
      checkName,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-profile {
  background-image: url("/images/bg-profile.png");
  background-size: contain;
  background-position: center;
}

.box-profile-main {
  max-width: 1000px;
  width: 100%;
  background-color: #3c2724;
  border: 15px solid#3C2724;
  border-radius: 20px;
}

// Box Show Character
.box-character {
  width: 320px;
  background-image: url("/images/bg-profile-character.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 20px;
}

// Selected Profile Detail
.box-profile-container {
  background-color: #894403;
  border-radius: 0px 20px 20px 20px;
}

// Detail Character
.box-change-name {
  background-color: #b26656;
  color: white;
}

.box-refs {
  height: 123px;
  overflow-y: auto;
}

.bg-profile-content {
  width: 100%;
  background-color: #3c2724;
  border-radius: 0px 0px 20px 20px;
}

.box-profile-details {
  height: 284px;
  background-color: #3c2724;
  overflow-y: auto;
}

.box-refs::-webkit-scrollbar,
.box-profile-details::-webkit-scrollbar {
  width: 10px;
  background-color: #3c2724;
}

.box-refs::-webkit-scrollbar-track,
.box-profile-details::-webkit-scrollbar-track {
  background-color: #fff;
  border-radius: 20px;
  border: 2px solid #3c2724;
}

.box-refs::-webkit-scrollbar-thumb,
.box-profile-details::-webkit-scrollbar-thumb {
  background-color: #ffbd14;
  border-radius: 20px;
}

// Button
.btn-brown {
  background-color: #894403;
  color: #fff;
  border-radius: 10px 10px 0px 0px;
}

.btn-brown-selected {
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  color: #000;
  font-weight: bold;
  border-radius: 10px 10px 0px 0px;
}

.icon-brown {
  position: relative;
  background-color: #894403;
  width: 40px;
  height: 40px;
  margin: 0px auto -20px auto;
  border-radius: 50%;
}

.icon-brown-selected {
  position: relative;
  background: linear-gradient(180deg, #ffd66a 0%, #ffbd14 100%);
  width: 40px;
  height: 40px;
  margin: 0px auto -20px auto;
  border-radius: 50%;
}

// Box Practice Details
.box-practice-white {
  background-color: #fff;
  border-radius: 10px;
}

.line-progress {
  position: relative;
  display: inline-block;
  padding: 5px 5px;
  margin-right: 5px;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Mobile
.box-profile-mobile {
  max-width: 500px;
  background-color: #894403;
  width: 100%;
}

.box-menu-mobile {
  max-width: 500px;
  width: 100%;
}
</style>
