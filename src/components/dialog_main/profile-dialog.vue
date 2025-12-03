<template>
  <!-- #region Dialog Profile -->
  <div
    class="absolute-center box-dialog-profile-container"
    v-if="isShowDialogProfile && !isMobile"
  >
    <div
      class="relative-position box-dialog-profile animate__animated animation-duration-0-5s"
      :class="isShowAnimationDialogProfile ? 'animate__fadeIn' : 'animate__bounceOut'"
    >
      <!-- #region เมนู -->
      <div class="box-menu-profile row">
        <!-- #region ปุ่ม "ข้อมูลผู้เล่น" -->
        <div
          class="box-button-menu font-mali-b relative-position"
          :class="selectedMenu == 'profile' ? 'selected' : ''"
          align="center"
          @click="selectedMenu = 'profile'"
        >
          <div class="sub-button-menu" v-if="selectedMenu != 'profile'"></div>
          <div class="relative-position">
            {{ `ข้อมูลผู้เล่น` }}
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่ม "สถิติแบบฝึกหัด" -->
        <div
          class="box-button-menu font-mali-b"
          :class="
            courseStore.courseLevel == 0
              ? 'disabled'
              : selectedMenu == 'practice'
              ? 'selected'
              : ''
          "
          align="center"
          @click="courseStore.courseLevel == 0 ? null : (selectedMenu = 'practice')"
        >
          <div class="sub-button-menu" v-if="selectedMenu != 'practice'"></div>
          <div class="relative-position">
            {{ `สถิติแบบฝึกหัด` }}
          </div>

          <div
            class="absolute-top-right icon-noti animate__animated animate__delay-2s animate__flash"
            v-if="courseStore.course.profileNotiStatus"
          ></div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <!-- #region ข้อมูลส่วนตัว/สถิติแบบฝึกหัด -->
      <div class="sub-dialog-profile row justify-between">
        <!-- #region ตัวละคร/เลเวล -->
        <div class="box-profile-character relative-position">
          <!-- #region เลเวล -->
          <div class="absolute-center box-level-student">
            <div class="relative-position">
              <q-img
                :src="`/images/box_main/box-rank-level-${studentStore.studentData.tier}.webp`"
                no-spinner
                no-transition
              ></q-img>

              <div
                class="absolute-center fit row justify-center items-center box-text-level text-shadow-level font-fredoka"
              >
                {{
                  `${
                    studentStore.studentData.level > 480
                      ? "MAX"
                      : studentStore.studentData.level
                  }`
                }}
              </div>

              <div
                class="absolute-center fit row justify-center items-center box-text-level font-fredoka"
                :class="
                  studentStore.studentData.level >= 401 ? 'high-level' : 'normal-level'
                "
              >
                {{
                  `${
                    studentStore.studentData.level > 480
                      ? "MAX"
                      : studentStore.studentData.level
                  }`
                }}
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- ตัวละคร -->
          <character-main
            :setId="`profile`"
            :isAnimation="true"
            :isPet="false"
            class="self-end absolute"
            style="width: 135%; left: -17.5%; bottom: -5%"
          ></character-main>
        </div>
        <!-- #endregion -->

        <!-- #region ข้อมูลส่วนตัว -->
        <div class="box-profile-details" v-if="selectedMenu == 'profile'">
          <!-- #region ชื่อตัวละคร/ปุ่มแก้ไข -->
          <div class="header-profile-details row">
            <!-- ชื่อตัวละคร -->
            <div class="self-center font-mali-b" v-if="!isChangeName">
              {{ `${studentStore.characterName}` }}
            </div>

            <!-- #region กล่องเปลื่ยนนชื่อตัวละคร -->
            <div
              class="box-input-main change-name relative-position"
              :class="isValidateName ? 'validate' : ''"
              v-if="isChangeName"
            >
              <input
                class="outline font-mali-b"
                v-model.trim="inputName"
                @input="checkCharacterName"
                maxlength="20"
                placeholder="กรุณาระบุชื่อตัวละคร"
              />

              <div v-if="isValidateName" class="absolute-top-right icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
            </div>

            <q-space />
            <!-- #region ปุ่มยกเลิก -->
            <div
              class="button-cancel-profile"
              v-if="isChangeName"
              @click="funcResetformData()"
            >
              <q-img
                src="/images/icon_main/icon-cancel.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->

            <!-- #region ปุ่มบันทึก -->
            <div
              class="button-save-profile"
              v-if="isChangeName"
              @click="funcSaveStudentData()"
            >
              <q-img
                src="/images/icon_main/icon-confirm.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->

            <!-- #region ปุ่มแก้ไข -->
            <div
              class="button-edit-profile"
              v-if="!isChangeName"
              @click="funcEditProfile()"
            >
              <q-img
                src="/images/button_main/button-edit-profile.png"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- #region รายละเอียด -->
          <div class="content-profile-details">
            <!-- ชื่อ-นามสกุล -->
            <div class="row box-student-details font-mali-b">
              <div class="self-center icon-circle"></div>
              <div class="self-center text-header-details">ชื่อ-สกุล</div>
              <div class="col-12 font-mali-m box-content-details">
                {{ `${studentStore.studentFullName}` }}
              </div>
            </div>

            <!-- โรงเรียน -->
            <div
              class="row box-student-details font-mali-b"
              v-if="studentStore.studentType == 'school'"
            >
              <div class="self-center icon-circle"></div>
              <div class="self-center text-header-details">โรงเรียน</div>
              <div class="col-12 font-mali-m box-content-details">
                {{ `${schoolStore.schoolName}` }}
              </div>
            </div>

            <div v-if="studentStore.studentType != 'school'">
              <!-- เพศ/วันเกิด -->
              <div class="row">
                <!-- เพศ -->
                <div class="self-start row box-student-details space font-mali-b">
                  <div class="self-center icon-circle"></div>
                  <div class="self-center text-header-details">เพศ</div>
                  <div class="col-12 font-mali-m box-content-details relative-position">
                    <div v-if="!isChangeName">
                      {{ `${studentStore.gender || "-"}` }}
                    </div>
                    <div v-else>
                      <div class="button-selected">
                        <div class="text-select" v-if="selectedGender">
                          {{ `${selectedGender}` }}
                        </div>
                        <div class="text-hint" v-else>กรุณาระบุเพศ</div>
                        <div class="absolute-top-right icon-arrow">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>

                        <q-menu auto-close fit class="z-max">
                          <div
                            class="item-select q-pa-xs"
                            v-for="(item, index) in genderList"
                            :key="index"
                            @click="selectedGender = item"
                            :class="{
                              selected: selectedGender == item,
                            }"
                          >
                            <span class="f14">{{ item }}</span>
                          </div>
                        </q-menu>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- วันเกิด -->
                <div class="self-start row box-student-details font-mali-b col">
                  <div class="self-center icon-circle"></div>
                  <div class="self-center text-header-details">วันเกิด</div>
                  <div class="col-12 font-mali-m box-content-details">
                    <div v-if="!isChangeName">
                      {{ `${studentStore.birthDate || "-"}` }}
                    </div>
                    <div v-else class="row">
                      <div class="button-selected day">
                        <div class="text-select" v-if="selectDay">
                          {{ `${selectDay}` }}
                        </div>
                        <div class="text-hint" v-else>วัน</div>
                        <div class="absolute-top-right icon-arrow">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>

                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in dayList"
                              :key="index"
                              @click="selectDay = item"
                              :class="{
                                selected: selectDay == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                      <div class="button-selected month">
                        <div class="text-select" v-if="showMonthName">
                          {{ `${showMonthName}` }}
                        </div>
                        <div class="text-hint" v-else>เดือน</div>
                        <div class="absolute-top-right icon-arrow">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>

                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(itemMonth, indexMonth) in monthList"
                              :key="indexMonth"
                              @click="funcSelectMonth(itemMonth, indexMonth)"
                              :class="selectMonth - 1 == indexMonth ? 'selected' : ''"
                            >
                              <span class="f14">{{ `${itemMonth}` }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                      <div class="button-selected year">
                        <div class="text-select" v-if="selectYear">
                          {{ `${selectYear}` }}
                        </div>
                        <div class="text-hint" v-else>ปี</div>
                        <div class="absolute-top-right icon-arrow">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>
                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in yearList"
                              :key="index"
                              @click="selectYear = item"
                              :class="{
                                selected: selectYear == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- อีเมล -->
              <div class="row box-student-details font-mali-b">
                <div class="self-center icon-circle"></div>
                <div class="self-center text-header-details">อีเมล</div>
                <div class="col-12 font-mali-m box-content-details">
                  {{ `${studentStore.email || "-"}` }}
                </div>
              </div>

              <!-- เบอร์โทรศัพท์/จังหวัด -->
              <div class="row">
                <!-- เบอร์โทรศัพท์ -->
                <div class="self-start row box-student-details font-mali-b space">
                  <div class="self-center icon-circle"></div>
                  <div class="self-center text-header-details">เบอร์โทรศัพท์</div>
                  <div class="col-12 font-mali-m box-content-details">
                    <div>
                      {{ `${studentStore.phoneNumber || "-"}` }}
                    </div>
                  </div>
                </div>

                <!-- จังหวัด -->
                <div class="self-start row box-student-details font-mali-b col">
                  <div class="self-center icon-circle"></div>
                  <div class="self-center text-header-details">จังหวัด</div>
                  <div class="col-12 font-mali-m box-content-details">
                    <div v-if="!isChangeName">
                      {{ `${studentStore.province || "-"}` }}
                    </div>
                    <div v-else>
                      <div class="button-selected province">
                        <div class="text-select" v-if="selectedProvince">
                          {{ `${selectedProvince}` }}
                        </div>
                        <div class="text-hint" v-else>กรุณาระบุจังหวัด</div>
                        <div class="absolute-top-right icon-arrow">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>

                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in provinceList"
                              :key="index"
                              @click="selectedProvince = item"
                              :class="{
                                selected: selectedProvince == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- สถานะสมาชิก/ปุ่มประวัติการทำรายการ -->
              <div align="right" class="relative-position">
                <!-- สถานะสมาชิก -->
                <div
                  class="self-start row box-student-details font-mali-b col"
                  v-if="false"
                >
                  <div class="self-center icon-circle"></div>
                  <div class="self-center text-header-details">
                    <div class="">สถานะสมาชิก Winner Member</div>
                  </div>
                  <div class="col-12 font-mali-m box-content-details" align="left" v-if="courseStore.courseLevel != '0'">
                    <div align="left">
                      <!-- studentStore.expireDateFormat -->
                      <span v-if="courseStore.isTrial">{{ `ทดลองเรียน` }}</span>
                      <span v-else>{{ `xxx` }}</span>
                    </div>
                  </div>
                </div>

                <!-- ปุ่มประวัติการทำรายการ -->
                <div class="button-history-payment">
                  <q-img
                    :src="`/images/button_main/button-history-payment${
                      isChangeName ? '-disable' : ''
                    }.png`"
                    @click="isChangeName ? null : funcShowDialogHistoryPayment()"
                    :class="isChangeName ? '' : 'cursor-pointer'"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>

              <!-- ปุ่มลบบัญชี -->
              <div class="box-student-details font-mali-b">
                <div
                  class="button-delete-student font-mali-m f12"
                  align="center"
                  :class="isChangeName ? 'disable' : ''"
                  @click="isChangeName ? null : funcShowDialogDeleteUser()"
                >
                  ลบบัญชีผู้ใช้
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->
        </div>
        <!-- #endregion -->

        <!-- #region สถิติแบบฝึกหัด -->
        <div class="box-practice-details" v-if="selectedMenu == 'practice'">
          <!-- #region ปุ่มใบรับรอง/ปุ่มเลือกเลเวล -->
          <div align="right" class="row justify-end">
            <!-- #region ปุ่มใบรับรอง -->
            <div class="button-certificate">
              <q-img
                @click="funcShowCertificate()"
                no-spinner
                no-transition
                :src="`/images/button_main/button-certificate.png`"
              >
                <!-- <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                  v-if="courseData.progressAVG < 80"
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <span
                    >เกีรยติบัตร ต้องมีผลความก้าวหน้า 80% ขึ้นไป</span
                  >
                </q-tooltip> -->
              </q-img>
            </div>
            <!-- #endregion -->

            <!-- #region ปุ่มเลือกเลเวล -->
            <div class="button-course-level relative-position" align="left">
              <div class="text-course-level font-mali-m">
                {{ `ระดับที่ ${selectedLevel}` }}
              </div>

              <div class="absolute-top-right icon-arrow">
                <q-icon name="fas fa-caret-down"></q-icon>
              </div>

              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                class="relative-position z-max"
                fit
                style="border-radius: 5px; border: 2px solid #4a261b"
              >
                <q-list
                  class="box-selected"
                  style="height: fit-content; max-height: 200px"
                >
                  <!-- class="q-pa-sm" -->
                  <div style="padding: clamp(3.75px, 0.375vw, 6px)">
                    <div
                      clickable
                      v-close-popup
                      class="options-menu-list"
                      v-for="(item, index) in courseStore.courseLevelOptions"
                      align="center"
                      :class="selectedLevel == item.value ? 'active-menu' : ''"
                      @click="
                        funcCheckProgressScoreAndSkill(selectedProgressTab, item.value)
                      "
                    >
                      <span> {{ `ระดับ ${item.value}` }}</span>
                    </div>
                  </div>
                </q-list>
              </q-menu>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->

          <!-- #region รายละเอียดความคืบหน้า -->
          <div class="box-practice-progress-details row">
            <!-- #region ความก้าวหน้าเฉลี่ย/คะแนนเฉลี่ย/คำแนะนำ -->
            <div class="box-progress-left">
              <!-- #region ความก้าวหน้าเฉลี่ย -->
              <div class="progress-average row">
                <div>
                  <!-- <div class="average-animation"></div> -->
                  <q-circular-progress
                    show-value
                    :value="Number(courseData.progressAVG)"
                    :thickness="0.05"
                    color="green"
                    track-color="grey-3"
                    size="clamp(68.75px,6.875cqw,110px)"
                  >
                    <span class="text-average font-mali-sb">
                      {{ displayNumber(courseData.progressAVG) }}%
                    </span>
                  </q-circular-progress>
                </div>
                <div class="col self-center font-mali-b" align="center">
                  ความก้าวหน้าเฉลี่ย
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region คะแนนเฉลี่ย -->
              <div class="progress-average score">
                <div class="font-mali-b">คะแนนเฉลี่ย</div>
                <div class="relative-position row">
                  <div
                    class="progress relative-position row no-wrap"
                    :style="`width:${
                      courseData.totalAVGScore < 5
                        ? 5
                        : (courseData.totalAVGScore / 100) * 90
                    }%`"
                  >
                    <div
                      class="progress-bar absolute-top-left"
                      :class="
                        courseData.totalAVGScore < 30
                          ? 'progress-failed'
                          : courseData.totalAVGScore < 60
                          ? 'progress-warning'
                          : 'progress-success'
                      "
                    ></div>
                  </div>
                  <div class="self-center text-average-score font-mali-m" align="left">
                    {{ `${displayNumber(courseData.totalAVGScore)}%` }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region คำแนะนำ -->
              <div class="progress-average recommend">
                <div class="font-mali-b">คำแนะนำ</div>
                <div
                  class="font-mali-m text-recommend"
                  v-for="(item, index) in progressHelpData[selectedProgressTab]"
                  v-if="!isSuccessProgress"
                >
                  <div v-if="item.isHelp">
                    {{ item.text }}
                  </div>
                </div>
                <div v-else class="font-mali-m text-recommend">
                  <span v-if="selectedProgressTab == 'score'"
                    >คะแนนเยอะขนาดนี้ ปังไม่ไหวเลย</span
                  >
                  <span v-else>แบบฝึกหัดเยอะขนาดไหนก็ไม่หวั่น</span>
                </div>
              </div>
              <!-- #endregion -->
            </div>
            <!-- #endregion -->

            <div class="box-progress-right">
              <!-- #region ปุ่ม ความก้าวหน้า/คะแนน -->
              <div class="row font-mali-b">
                <!-- ความก้าวหน้า -->
                <div
                  class="button-skill-menu"
                  :class="selectedProgressTab == 'progress' ? 'active' : ''"
                  @click="
                    funcCheckProgressScoreAndSkill(
                      'progress',
                      selectedLevel || courseStore.courseLevel
                    )
                  "
                  align="center"
                >
                  <div class="text-menu">
                    {{ `ความก้าวหน้า` }}
                  </div>
                </div>

                <!-- คะแนน -->
                <div
                  class="button-skill-menu"
                  :class="selectedProgressTab == 'score' ? 'active' : ''"
                  @click="
                    funcCheckProgressScoreAndSkill(
                      'score',
                      selectedLevel || courseStore.courseLevel
                    )
                  "
                  align="center"
                >
                  <div class="text-menu">
                    {{ `คะแนน` }}
                  </div>
                </div>
              </div>
              <div class="progress-skill">
                <div v-for="(item, index) in progressHelpData[selectedProgressTab]">
                  <div class="text-skill-header">
                    <span class="font-mali-b">
                      {{ item.skill }}
                    </span>
                  </div>
                  <div class="relative-position row">
                    <div
                      class="self-center progress relative-position row no-wrap"
                      :style="`width:${item.score < 5 ? 5 : (item.score / 100) * 80}%`"
                    >
                      <div
                        class="progress-bar absolute-top-left"
                        :class="
                          item.score < 30
                            ? 'progress-failed'
                            : item.score < 60
                            ? 'progress-warning'
                            : 'progress-success'
                        "
                      ></div>
                    </div>
                    <div class="text-average-score font-mali-m" align="left">
                      {{ `${displayNumber(item.score)}%` }}
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
      <!-- #endregion -->

      <!-- #region ปุ่มปิดโปรไพล์ -->
      <div
        class="absolute-top-right box-button-close"
        :class="isTutorial ? 'disable' : ''"
        @click="isTutorial ? null : funcCloseDialog()"
      >
        <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner></q-img>
      </div>
      <!-- #endregion -->
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region Mobile -->
  <div
    class="relative-position dialog-container-mobile"
    v-if="isShowDialogProfile && isMobile"
  >
    <!-- #region เมนู -->
    <div class="box-button-container row">
      <div
        class="button-menu-mobile relative-position"
        :class="[
          courseStore.courseLevel == 0 && item.name == 'practice' ? 'disabled' : '',
          selectedMenu == item.name ? 'active' : '',
          isChangeName ? 'cursor-not-allowed' : 'cursor-pointer',
        ]"
        v-for="(item, index) in menuList"
        @click="isChangeName ? null : item.func(item.name)"
      >
        <span class="relative-position font-mali-b f16" style="z-index: 2">{{
          item.label
        }}</span>

          <div
            class="absolute-top-right icon-noti animate__animated animate__delay-2s animate__flash"
            v-if="courseStore.course.profileNotiStatus && selectedMenu === 'practice'"
          ></div>
      </div>
    </div>
    <!-- #endregion -->

    <div class="box-dialog-content-mobile">
      <!-- #region ข้อมูลตัวละคร -->
      <div v-if="selectedMenu == 'profile'" class="q-pa-sm">
        <div class="box-profile-content-mobile">
          <div class="profile-name">
            <div
              class="row justify-between q-px-xs"
              v-if="!isChangeName"
              style="height: 48px"
            >
              <!-- #region แสดงผลชื่อเล่น -->
              <div class="col self-center text-white f16 font-mali-b">
                <div class="row items-center text-overflow" style="height: 42px">
                  <span>
                    {{ studentStore.characterName }}
                  </span>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มแก้ไข -->
              <div class="col-1 self-center width-fit">
                <q-btn size="11px" round flat @click="editNameButton.func()">
                  <q-img :src="editNameButton.imgMobile" no-spinner no-transition></q-img>
                </q-btn>
              </div>
              <!-- #endregion -->
            </div>

            <div
              class="row items-center q-px-xs"
              style="height: 48px"
              v-if="isChangeName"
            >
              <!-- #region Input ชื่อเล่น -->
              <div class="col">
                <div
                  class="col row q-mr-sm relative-position"
                  style="height: 34px; border-radius: 10px"
                  :style="
                    inputName.length == 0
                      ? 'border-radius: 10px;border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                      : 'background-color:#FFF;border: 1px solid #4A261B;'
                  "
                >
                  <div style="height: 35px" class="relative-position">
                    <q-input
                      style="width: 100%; height: 35px"
                      borderless
                      dense
                      input-style="padding:0px 7px;height:35px;"
                      v-model.trim="inputName"
                      reactive-rules
                      :rules="[checkCharacterName]"
                      hide-bottom-space
                      maxlength="20"
                      placeholder="กรุณาระบุชื่อตัวละคร"
                      no-error-icon
                    >
                      <template v-slot:append v-if="inputName.length == 0">
                        <div class="f14" style="padding-right: 10px; padding-bottom: 9px">
                          <q-icon
                            size="20px"
                            class="text-validate"
                            name="fas fa-exclamation-circle"
                          ></q-icon>
                        </div>
                      </template>
                    </q-input>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ปุ่มบันทึก/ปุ่มยกเลิก -->
              <div class="col-1 self-center width-fit">
                <q-btn
                  class="q-mx-xs"
                  size="11px"
                  round
                  flat
                  @click="isChangeName = false"
                >
                  <q-img
                    no-spinner
                    no-transition
                    src="/images/icon_main/icon-cancel.png"
                  ></q-img>
                </q-btn>

                <q-btn size="11px" round flat @click="funcSaveStudentData()">
                  <q-img
                    no-spinner
                    no-transition
                    src="/images/icon_main/icon-confirm.png"
                  ></q-img>
                </q-btn>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <div style="padding: 2px">
            <div class="f14 box-dialog-content-scorll f14" style="padding-left: 10px">
              <!-- #region ชื่อ-นามสกุล -->
              <div class="q-my-sm q-mt-md">
                <div class="header-text">
                  <div class="q-pl-md font-mali-b">ชื่อ-สกุล</div>
                </div>
                <div class="sub-text font-mali-m">
                  {{ studentStore.studentFullName }}
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region โรงเรียน -->
              <div class="q-my-sm f14" v-if="studentStore.studentType == 'school'">
                <div class="header-text">
                  <div class="q-pl-md font-mali-b">โรงเรียน</div>
                </div>
                <div class="sub-text font-mali-m">
                  {{ schoolStore.schoolName }}
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ข้อมูลเฉพาะนักเรียนออนไลน์ -->
              <div v-if="studentStore.studentType != 'school'">
                <!-- #region เพศ -->
                <div class="q-my-md f14">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">เพศ</div>
                  </div>
                  <div class="sub-text f14 font-mali-m" v-if="!isChangeName">
                    <div style="height: 30px; padding-top: 3px">
                      {{ studentStore.gender || "-" }}
                    </div>
                  </div>
                  <div class="sub-text-mobile f14 font-mali-m" v-if="isChangeName">
                    <div class="box-dialog-selected" style="width: 80%; padding: 5px">
                      <div class="row f14 justify-between">
                        <div class="col">
                          <span v-if="selectedGender">
                            {{ `${selectedGender}` }}
                          </span>
                          <span v-else style="color: #939393"> กรุณาระบุเพศ </span>
                        </div>
                        <div class="col-1 self-center width-fit" align="right">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>
                      </div>
                      <q-menu auto-close fit class="z-max">
                        <q-list class="no-padding">
                          <div
                            class="item-select q-pa-xs"
                            v-for="(item, index) in genderList"
                            :key="index"
                            @click="selectedGender = item"
                            :class="{
                              selected: selectedGender == item,
                            }"
                          >
                            <span class="f14">{{ item }}</span>
                          </div>
                        </q-list>
                      </q-menu>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region วัน/เดือน/ปีเกิด -->
                <div class="q-my-md">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">วันเกิด</div>
                  </div>
                  <div
                    class="sub-text font-mali-m"
                    v-if="!isChangeName || studentStore.birthDate != '-'"
                  >
                    <div style="height: 30px">
                      {{ `${studentStore.birthDate || "-"}` }}
                    </div>
                  </div>
                  <div class="sub-text-mobile font-mali-m" v-else>
                    <div class="f12 row" style="width: 100%; height: 30px">
                      <!-- #region Select Day -->
                      <div class="box-dialog-selected q-pa-xs" style="width: 55px">
                        <div class="row f14 justify-between">
                          <div class="col">
                            <span v-if="selectDay">
                              {{ `${selectDay}` }}
                            </span>
                            <span v-else style="color: #939393"> วัน </span>
                          </div>
                          <div class="col-1 self-center width-fit" align="right">
                            <q-icon name="fas fa-caret-down"></q-icon>
                          </div>
                        </div>
                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in dayList"
                              :key="index"
                              @click="selectDay = item"
                              :class="{
                                selected: selectDay == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                      <!-- #endregion -->

                      <!-- #region Select Month -->
                      <div
                        class="box-dialog-selected q-pa-xs"
                        style="width: 100px; margin: 0px 4px"
                      >
                        <div class="row f14 justify-between">
                          <div class="col">
                            <span v-if="selectMonth">
                              {{ `${selectMonth}` }}
                            </span>
                            <span v-else style="color: #939393"> เดือน </span>
                          </div>
                          <div class="col-1 self-center width-fit" align="right">
                            <q-icon name="fas fa-caret-down"></q-icon>
                          </div>
                        </div>
                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in monthList"
                              :key="index"
                              @click="selectMonth = item"
                              :class="{
                                selected: selectMonth == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                      <!-- #endregion -->

                      <!-- #region Select Year -->
                      <div class="box-dialog-selected q-pa-xs" style="width: 70px">
                        <div class="row f14 justify-between">
                          <div class="col">
                            <span v-if="selectYear">
                              {{ `${selectYear}` }}
                            </span>
                            <span v-else style="color: #939393"> ปี </span>
                          </div>
                          <div class="col-1 self-center width-fit" align="right">
                            <q-icon name="fas fa-caret-down"></q-icon>
                          </div>
                        </div>
                        <q-menu auto-close fit style="height: 200px" class="z-max">
                          <q-list class="no-padding">
                            <div
                              class="q-pa-xs item-select"
                              v-for="(item, index) in yearList"
                              :key="index"
                              @click="selectYear = item"
                              :class="{
                                selected: selectYear == item,
                              }"
                            >
                              <span class="f14">{{ item }}</span>
                            </div>
                          </q-list>
                        </q-menu>
                      </div>
                      <!-- #endregion -->
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region อีเมล -->
                <div class="q-my-md">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">อีเมล</div>
                  </div>
                  <div class="sub-text font-mali-m">
                    {{ studentStore.email || "-" }}
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region เบอร์โทรศัพท์ -->
                <div class="q-my-md f14">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">เบอร์โทรศัพท์</div>
                  </div>
                  <div class="sub-text font-mali-m" v-if="!isChangeName">
                    <div style="height: 30px; padding-top: 3px">
                      {{ showPhoneNumber }}
                    </div>
                  </div>
                  <div class="sub-text-mobile f14 font-mali-m" v-if="isChangeName">
                    <div
                      class="box-dialog-selected"
                      style="width: 80%; padding: 5px"
                      :style="
                        !isValidatePhoneNumber
                          ? 'border: 1px solid #4a261b;background-color: #FFF;'
                          : 'border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                      "
                    >
                      <q-input
                        style="margin-top: -5px"
                        dense
                        borderless
                        class="f14"
                        placeholder="ระบุเบอร์โทรศัพท์"
                        v-model="inputPhoneNumber"
                        :input-style="
                          isValidatePhoneNumber
                            ? 'font-size:14px;padding-bottom: 15px'
                            : 'padding-bottom: 17px;color:#4a261b'
                        "
                        mask="##########"
                        @update:model-value="funcFormatPhoneNumber"
                      >
                        <template v-slot:append v-if="isValidatePhoneNumber">
                          <div class="f14" style="padding-bottom: 15px">
                            <q-icon
                              size="16px"
                              class="text-validate"
                              name="fas fa-exclamation-circle"
                            ></q-icon>
                          </div>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region จังหวัด -->
                <div class="q-my-md f14">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">จังหวัด</div>
                  </div>
                  <div class="sub-text font-mali-m" v-if="!isChangeName">
                    <div style="height: 30px; padding-top: 3px">
                      {{ studentStore.province || "-" }}
                    </div>
                  </div>
                  <div class="sub-text-mobile font-mali-m" v-if="isChangeName">
                    <div class="box-dialog-selected f12" style="width: 80%; padding: 5px">
                      <div class="row f14 justify-between">
                        <div class="col">
                          <span v-if="selectedProvince">
                            {{ `${selectedProvince}` }}
                          </span>
                          <span v-else style="color: #939393"> กรุณาเลือกจังหวัด </span>
                        </div>
                        <div class="col-1 self-center width-fit" align="right">
                          <q-icon name="fas fa-caret-down"></q-icon>
                        </div>
                      </div>
                      <q-menu auto-close fit style="height: 200px" class="z-max">
                        <q-list class="no-padding">
                          <div
                            class="q-pa-xs item-select"
                            v-for="(item, index) in provinceList"
                            :key="index"
                            @click="selectedProvince = item"
                            :class="{
                              selected: selectedProvince == item,
                            }"
                          >
                            <span class="f14">{{ item }}</span>
                          </div>
                        </q-list>
                      </q-menu>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region สถานะ -->
                <div class="q-mt-md" v-if="false">
                  <div class="header-text">
                    <div class="q-pl-md font-mali-b">สถานะ Winner Member</div>
                  </div>

                  <div
                    class="sub-text f14 font-mali-m relative-position row q-mt-sm"
                    :style="studentStore.history.length != 0 ? 'margin-left: -10px' : ''"
                  >
                    <div v-if="studentStore.history.length == 0">
                      {{ `ยังไม่มีการสมัครการใช้งาน` }}
                    </div>
                    <div v-else>
                      <div
                        class="row"
                        v-if="studentStore.distanceInDays >= 0"
                        style="line-height: 1"
                      >
                        <div class="q-mr-sm self-center">
                          <q-img
                            src="/images/icon_main/icon-check-data-size-16.png"
                            width="14px"
                          ></q-img>
                        </div>
                        <div class="self-end">
                          {{ `ใช้ได้จนถึง: ${studentStore.expireDateFormat}` }}
                        </div>
                      </div>
                      <div v-else class="row" style="line-height: 1">
                        <div class="q-mr-sm self-center">
                          <q-img
                            src="/images/icon_main/icon-alert-data-size-16.png"
                            width="14px"
                          ></q-img>
                        </div>
                        <div class="self-end">
                          {{ `หมดอายุสมาชิก Winner Member` }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region ปุ่มประวัติการทำรายการ -->
                <div class="q-px-md q-my-md" align="center">
                  <div>
                    <q-img
                      width="135px"
                      :src="`/images/button_main/button-history-payment${
                        isChangeName ? '-disable' : ''
                      }.png`"
                      @click="isChangeName ? null : funcShowDialogHistoryPayment()"
                      :class="isChangeName ? '' : 'cursor-pointer'"
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region ปุ่มลบข้อมูลบัญชี -->
                <div
                  class="font-mali-m f12"
                  align="center"
                  style="width: fit-content;color: #ff2c2c;border: 1px solid #ff2c2c;border-radius: 16px;padding: 4px 16px;align-items: center;font-size: 12px;margin:16px auto 12px;"
                  :class="
                    isChangeName
                      ? 'cursor-not-allowed button-delete-student-disable'
                      : ' cursor-pointer'
                  "
                  @click="isChangeName ? null : funcShowDialogDeleteUser()"
                >
                  ลบบัญชีผู้ใช้
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <div v-if="selectedMenu == 'practice'">
        <!-- #region ปุ่ม level/ปุ่ม Certificate -->
        <div class="q-py-sm row justify-center" style="height: 56px">
          <div class="q-mx-xs">
            <q-img
              @click="funcShowCertificate()"
              no-spinner
              no-transition
              class="cursor-pointer"
              :src="`/images/button_main/button-certificate.png`"
              width="135px"
            >
            </q-img>
          </div>

          <div class="q-mx-sm">
            <q-btn
              class="button-main default button-main-radius bubble-selected q-py-sm z-top f16"
              style="width: 120px; height: 50px"
              padding="10px 0px"
              push
              no-caps
            >
              <span class="q-pl-sm text-black text-bold">
                {{ `Level ${selectedLevel}` }}
              </span>
              <q-space></q-space>
              <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>

              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                class="relative-position z-max"
                fit
                style="border-radius: 5px; border: 2px solid #4a261b"
              >
                <q-list
                  class="box-selected"
                  style="height: fit-content; max-height: 200px"
                >
                  <div class="q-pa-sm" align="left">
                    <div
                      clickable
                      v-close-popup
                      class="options-menu-list q-pa-xs cursor-pointer"
                      v-for="(item, index) in courseStore.courseLevelOptions"
                      :class="{
                        'active-menu': selectedLevel == item.value,
                      }"
                      @click="
                        funcCheckProgressScoreAndSkill(selectedProgressTab, item.value)
                      "
                    >
                      <span>Level {{ item.value }}</span>
                    </div>
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region  -->
        <div class="q-py-sm q-pl-sm q-pr-xs">
          <div class="box-scroll-progress-mobile">
            <div class="q-mb-sm">
              <div class="box-practice-content row">
                <div>
                  <q-circular-progress
                    show-value
                    :value="Number(courseData.progressAVG)"
                    size="75px"
                    :thickness="0.05"
                    color="green"
                    track-color="grey-3"
                  >
                    <span class="f24 font-mali-m">
                      {{ displayNumber(courseData.progressAVG) }}%
                    </span>
                  </q-circular-progress>
                </div>
                <div class="col self-center" align="center">
                  <span class="f16 font-mali-b">ความก้าวหน้าเฉลี่ย</span>
                </div>
              </div>
            </div>
            <div class="q-my-sm">
              <div class="box-practice-content">
                <div>
                  <span class="f16 font-mali-b"> คะแนนเฉลี่ย </span>
                </div>
                <div class="row q-pt-sm q-pb-xs">
                  <div class="self-center progress-mobile relative-position no-wrap" :style="`width:${courseData.totalAVGScore}%`">
                    <div
                      class="absolute-top progress-bar-mobile"
                      :class="
                        courseData.totalAVGScore < 30
                          ? 'failed'
                          : courseData.totalAVGScore < 60
                          ? 'warning'
                          : 'success'
                      "
                      :style="`width:${courseData.totalAVGScore}%`"
                    ></div>

                    <div
                      class="absolute-top-right"
                      align="left"
                      style="top:50%;right:7px;"
                    >
                      <span class="absolute-center f12" style="top: -1px"
                        >{{ courseData.totalAVGScore }}%</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-my-sm">
              <div class="row">
                <div
                  class="col button-progress-menu"
                  align="center"
                  :class="selectedProgressTab == 'progress' ? 'active' : ''"
                  @click="
                    funcCheckProgressScoreAndSkill(
                      'progress',
                      selectedLevel || courseStore.courseLevel
                    )
                  "
                >
                  <span class="font-mali-m f16 relative-position" style="z-index: 2"
                    >ความก้าวหน้า</span
                  >
                </div>
                <div
                  class="col button-progress-menu"
                  align="center"
                  :class="selectedProgressTab == 'score' ? 'active' : ''"
                  @click="
                    funcCheckProgressScoreAndSkill(
                      'score',
                      selectedLevel || courseStore.courseLevel
                    )
                  "
                >
                  <span class="font-mali-m f16 relative-position" style="z-index: 2">
                    คะแนน
                  </span>
                </div>
              </div>
              <div class="box-progress-score">
                <div class="q-pa-xs">
                  <div v-for="(item, index) in progressHelpData[selectedProgressTab]">
                    <div class="q-mt-sm">
                      <span class="f14 font-mali-b">
                        {{ item.skill }}
                      </span>
                    </div>
                    <div class="row">
                      <div class="self-start progress-mobile relative-position q-mt-sm row no-wrap " :style="`min-width:5px;width:${item.score}%;`"> 
                        <div
                          class="relative-position progress-bar-mobile"
                          :class="
                            item.score < 30
                              ? 'failed'
                              : item.score < 60
                              ? 'warning'
                              : 'success'
                          "
                          :style="`min-width:5px;width:${item.score}%;margin-right:15px;`"
                        ></div>
                        <div
                          class="self-center q-pl-sm relative-position q-mr-sm"
                          align="left"
                        >
                          <span class="absolute-center f12"  style="top: -1px">
                            {{
                              item.score > 100 ? 100 : displayNumber(item.score) || 0
                            }}%</span
                          >
                        </div>
                      </div>
                      <div class="col-1 self-center q-pt-xs q-px-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="q-mt-sm">
              <div class="box-practice-content">
                <div>
                  <span class="f16 font-mali-b">
                    คำแนะนำ
                    <span v-if="selectedProgressTab == 'score'"> (คะแนน) </span>
                    <span v-else>(ความก้าวหน้า)</span>
                  </span>

                  <div class="">
                    <div
                      class="q-pt-sm q-pl-xs"
                      v-for="(item, index) in progressHelpData[selectedProgressTab]"
                      v-if="!isSuccessProgress"
                    >
                      <div class="q-pt-sm q-pl-xs" v-if="item.isHelp">
                        <span class="f14">
                          {{ item.text }}
                        </span>
                      </div>
                    </div>
                    <div v-else class="q-py-md q-px-sm f16">
                      <span v-if="selectedProgressTab == 'score'"
                        >คะแนนเยอะขนาดนี้ ปังไม่ไหวเลย</span
                      >
                      <span v-else>แบบฝึกหัดเยอะขนาดไหนก็ไม่หวั่น</span>
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

    <!-- #region ปุ่มปิด -->
    <div
      @click="isChangeName || isShowDialogHistoryPayment ? null : closeButton.func()"
      class="absolute-top-right"
      style="right: -15px; top: -15px"
    >
      <q-btn round flat :class="isChangeName ? 'cursor-not-allowed' : ''">
        <q-img
          width="45px"
          :src="isChangeName ? closeButton.imgDisable : closeButton.img"
          no-spinner
          no-transition
        ></q-img>
      </q-btn>
    </div>
    <!-- #endregion -->
  </div>
  <!-- #endregion -->

  <!-- #region รายการการซื้อแพ็คเกจ -->
  <div
    class="absolute-center box-dialog-history-container z-max"
    :class="{'mobile':isMobile}"
    v-if="isShowDialogHistoryPayment"
  >
    <div
      class="relative-position box-dialog-history animate__animated animation-duration-0-5s"
      :class="{
        'mobile': isMobile,
        'animate__bounceIn': isShowAnimationDialogHistoryPayment,
        'animate__bounceOut': !isShowAnimationDialogHistoryPayment,
      }"
    >
      <div class="sub-dialog-history" :class="{'mobile':isMobile}">
        <!-- #region หัวข้อ -->
        <div class="text-header-history font-mali-b" align="center" :class="{'mobile':isMobile}">
          <span>ประวัติการทำรายการ</span>
        </div>
        <!-- #endregion -->

        <!-- #region ปุ่มประวัติการทำรายการ -->
        <div class="font-mali-sb row box-history-menu" :class="{'mobile':isMobile}">
          <div
            @click="historySelected = 'payment'"
            class="cursor-pointer button-history-menu"
            :class="{
              'active': historySelected == 'payment',
              'mobile': isMobile
            }"
          >
            การชำระเงิน
          </div>
          <div
            @click="historySelected = 'practice'"
            class="cursor-pointer button-history-menu"
            :class="{
              'active': historySelected == 'practice',
              'mobile': isMobile
            }"
            v-if="false"
          >
            ปลดล็อกบทเรียน
          </div>
        </div>
        <!-- #endregion -->

        <div class="box-history-details relative-position" :class="{'mobile':isMobile}">
          <!-- #region ปุ่มเรียง -->
          <div
            class="box-sort-history font-mali-m"
            :class="{'mobile':isMobile}"
            v-if="comShowHistoryData.length > 0"
          >
            <div class="text-sort-history" :class="{'mobile':isMobile}">เรียงตาม</div>
            <div class="relative-position box-dropdown-sort-history font-mali-m row cursor-pointer" :class="{'mobile':isMobile}" @click="openDropdownSortHistory()">
              <div>
                {{ showSortSelectedBy == "last" ? "ล่าสุด" : "เก่าสุด" }}
              </div>
              <div class="icon-dropdown-sort-history" :class="{'mobile':isMobile}">
                <q-icon
                :name="
                  isDropdownSortHistory
                    ? 'fas fa-caret-up'
                    : 'fas fa-caret-down'
                " />
              </div>

              <div
              v-if="isDropdownSortHistory"
              class="absolute font-mali-m box-dropdown-history-menu"
              :class="{'mobile':isMobile}"
            >
              <div
                @click="showSortSelectedBy = 'last'"
                :class="{'active':showSortSelectedBy == 'last','mobile':isMobile}"
                class="text-select-menu"
              >
                ล่าสุด
              </div>
              <div
                @click="showSortSelectedBy = 'olded'"
                class="text-select-menu"
                :class="{'active':showSortSelectedBy == 'olded','mobile':isMobile}"
              >
                เก่าสุด
              </div>
            </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region ประวัติการทำรายการ -->
          <div class="box-history-scroll relative-position" :class="{'mobile':isMobile}">
            <!-- #region ประวัติการทำรายการว่าง -->
            <div
              class="absolute-center full-width text-none-list"
              align="center"
              :class="{'mobile':isMobile}"
              v-if="studentStore.history.length == 0"
            >
              <div class="fit font-mali-m">ยังไม่มีประวัติการทำรายการ</div>
            </div>
            <!-- #endregion -->

            <!-- #region ประวัติการทำรายการ -->
            <div v-else class="box-history-list" :class="{'mobile':isMobile}">
              <div
                class="font-mali-m"
                v-for="(item, index) in comShowHistoryData"
                :key="index"
              >
                <div class="text-history-date" :class="{'mobile':isMobile}">
                  <span>{{ `${item.date}` }}</span>
                </div>
                <div class="box-history-course" :class="{'mobile':isMobile}">
                  <div
                    class="row font-mali-b justify-between box-course-list"
                    :class="{'mobile':isMobile}"
                    v-for="(itemCourse, courseIndex) in item.courseList"
                      :key="courseIndex"
                  >
                    <div
                      class="row items-center justify-between full-width"
                    >
                      <div>{{ `Level ${itemCourse.level}` }}</div>
                      <div>
                        <span v-if="item.paymentBy == 'trial'">{{`ทดลอง`}}</span>
                        <span v-else>{{`฿${funcFormatPrice(itemCourse.totalPrice)}`}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="row items-center justify-between full-width box-code-price font-mali-b" :class="{'mobile':isMobile}">
                    <div>
                      {{`โค้ดส่วนลด`}}
                    </div>
                    <div >
                      <span v-if="item.totalDiscount != 0">
                        {{`-฿${funcFormatPrice(item.totalDiscount)}`}}
                      </span>
                      <span v-else>{{`฿0`}}</span>
                    </div>
                  </div>
                  <div class="row items-center justify-between full-width box-total-price font-mali-b" :class="{'mobile':isMobile}">
                    <div>
                      {{`รวมคำสั่งซื้อ`}}
                    </div>
                    <div class="text-total-price" :class="{'mobile':isMobile}">
                      <span v-if="item.totalPrice != 0">
                        {{`฿${funcFormatPrice(item.totalPrice)}`}}
                      </span>
                      <span v-else>{{`฿0`}}</span>
                    </div>
                  </div>
                </div>
                <div class="text-history-payment" :class="{'mobile':isMobile}">
                  <span v-if="item.paymentBy != 'trial'">{{ `ชำระผ่าน ${item.paymentBy}` }}</span>
                </div>
                <div class="box-separator" :class="{'mobile':isMobile}">
                  <q-separator/>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->
        </div>
      </div>

      <div class="absolute-top-right button-icon-close" :class="{'mobile':isMobile}" @click="funcCloseDialogHistoryPayment()">
        <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner></q-img>
      </div>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region Desktop -->
  <q-dialog v-model="isShowDialogProfile" maximized persistent v-if="false">
    <q-card class="transparent shadow-0 font-mali-m">
      <q-card-section class="row fit items-center no-padding">
        <div class="col-12 dialog-container relative-position">
          <div class="row">
            <!-- #region ปุ่มหัวข้อ -->
            <div
              class="col-1 row f20 font-mali-b text-center relative-position"
              style="width: fit-content"
            >
              <div
                v-for="(item, index) in menuList"
                class="button-menu"
                :class="[
                  selectedMenu == item.name ? 'active' : '',
                  isChangeName ? 'cursor-not-allowed' : 'cursor-pointer',
                ]"
                @click="isChangeName ? null : item.func(item.name)"
              >
                <span class="relative-position" style="z-index: 2">
                  {{ item.label }}
                </span>
              </div>
              <div
                v-if="courseStore.course.profileNotiStatus"
                class="absolute-top-right bg-red animate__animated animate__delay-2s animate__flash"
                style="
                  width: 10px;
                  height: 10px;
                  top: -0px;
                  right: -0px;
                  border-radius: 50%;
                  animation-duration: 1s;
                  z-index: 2;
                "
              ></div>
            </div>
            <!-- #endregion -->

            <div class="col-12 box-profile-main row relative-position">
              <!-- #region เมนูด้านซ้าย -->
              <div
                class="col-3 row box-character-profile relative-position"
                style="
                  background-image: url(/images/background_main/background-lobby-default.png);
                "
              >
                <q-img
                  width="120px"
                  class="absolute-center"
                  style="top: 7%"
                  src="/images/box_main/box-tier-unrank.webp"
                  no-spinner
                  no-transition
                >
                  <div class="absolute-center transparent" style="top: 57%">
                    <div>
                      <span class="text-level">{{ studentStore.studentLevel }}</span>
                    </div>
                  </div>
                </q-img>
                <character-main
                  :setId="`profile`"
                  :isAnimation="true"
                  :isPet="false"
                  class="self-end absolute"
                  style="width: 135%; left: -17.5%; bottom: -5%"
                ></character-main>
              </div>
              <!-- #endregion -->

              <div class="col-1" style="width: 30px"></div>

              <!-- #region เมนูด้านขวา -->
              <div class="col">
                <!-- #region ข้อมูลผู้เล่น -->
                <div class="box-profile-content" v-if="selectedMenu == 'profile'">
                  <!-- #region ชื่อเล่น/ปุ่มแก้ไขข้อมูล  -->
                  <div class="profile-name row items-center">
                    <!-- #region ชื่อเล่น -->
                    <div v-show="!isChangeName" class="col row">
                      <div class="self-center q-px-sm text-white f20 font-mali-b">
                        <span>
                          {{ studentStore.characterName }}
                        </span>
                      </div>
                      <q-space></q-space>
                      <div class="col-1 q-px-xs width-fit self-center">
                        <q-img
                          width="110px"
                          class="cursor-pointer"
                          @click="editNameButton.func()"
                          :src="editNameButton.img"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ปุ่มแก้ไขข้อมูล -->
                    <div v-show="isChangeName" class="col row items-center" align="right">
                      <div class="col q-px-sm" align="left">
                        <div
                          class="self-center row q-mr-sm relative-position"
                          style="width: 250px; height: 34px; border-radius: 10px"
                          :style="
                            inputName.length == 0
                              ? 'border-radius: 10px;border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                              : 'background-color:#FFF;border: 1px solid #4A261B;'
                          "
                        >
                          <div style="height: 35px" class="relative-position">
                            <q-input
                              style="width: 250px; height: 35px"
                              input-style="padding:0px 7px;height:35px;"
                              borderless
                              dense
                              v-model.trim="inputName"
                              reactive-rules
                              :rules="[checkCharacterName]"
                              hide-bottom-space
                              maxlength="20"
                              placeholder="กรุณาระบุชื่อตัวละคร"
                              no-error-icon
                            >
                              <template v-slot:append v-if="inputName.length == 0">
                                <div
                                  class="f14"
                                  style="padding-right: 10px; padding-bottom: 9px"
                                >
                                  <q-icon
                                    size="20px"
                                    class="text-validate"
                                    name="fas fa-exclamation-circle"
                                  ></q-icon>
                                </div>
                              </template>
                            </q-input>

                            <div class="absolute-center" style="left: 100%">
                              <q-icon></q-icon>
                            </div>
                          </div>
                        </div>
                      </div>

                      <q-space></q-space>

                      <div class="self-center col-1 width-fit q-px-xs">
                        <q-btn round flat>
                          <q-img
                            width="40px"
                            class="cursor-pointer"
                            @click="funcResetformData()"
                            src="/images/icon_main/icon-cancel.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                        <q-btn type="submit" round flat @click="funcSaveStudentData()">
                          <q-img
                            width="40px"
                            class="cursor-pointer"
                            src="/images/icon_main/icon-confirm.png"
                            no-spinner
                            no-transition
                          ></q-img>
                        </q-btn>
                      </div>
                    </div>
                    <!-- #endregion -->
                  </div>
                  <!-- #endregion -->

                  <div
                    class="f16"
                    style="height: 398px; padding: 10px 24px 0px"
                    align="left"
                  >
                    <!-- #region ชื่อ-นามสกุล -->
                    <div style="margin: 16px 0px" class="">
                      <div class="header-text">
                        <div class="q-pl-md font-mali-b">ชื่อ-สกุล</div>
                      </div>
                      <div class="sub-text font-mali-m">
                        {{ studentStore.studentFullName }}
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region โรงเรียน -->
                    <div
                      style="margin: 16px 0px"
                      class=""
                      v-if="studentStore.studentType == 'school'"
                    >
                      <div class="header-text">
                        <div class="q-pl-md font-mali-b">โรงเรียน</div>
                      </div>
                      <div class="sub-text font-mali-m">
                        {{ schoolStore.schoolName }}
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ข้อมูลเฉพาะเด็กออนไลน์  -->
                    <div v-if="studentStore.studentType != 'school'">
                      <div style="margin: 16px 0px" class="row">
                        <!-- #region เพศ -->
                        <div class="col-4">
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">เพศ</div>
                          </div>
                          <div class="sub-text font-mali-m">
                            <div style="height: 30px" v-if="!isChangeName">
                              {{ studentStore.gender || "-" }}
                            </div>
                            <div
                              class="box-dialog-selected f12"
                              style="width: 90%; height: 30px; padding: 4px 5px"
                              v-if="isChangeName"
                            >
                              <div class="row justify-between">
                                <div class="col f14">
                                  <span v-if="selectedGender">
                                    {{ `${selectedGender}` }}
                                  </span>
                                  <span v-else style="color: #939393">
                                    กรุณาระบุเพศ
                                  </span>
                                </div>
                                <div class="col-1 self-center width-fit" align="right">
                                  <q-icon size="20px" name="fas fa-caret-down"></q-icon>
                                </div>
                              </div>
                              <q-menu auto-close fit class="z-max">
                                <!-- <q-list class="no-padding"> -->
                                <div
                                  class="item-select q-pa-xs"
                                  v-for="(item, index) in genderList"
                                  :key="index"
                                  @click="selectedGender = item"
                                  :class="{
                                    selected: selectedGender == item,
                                  }"
                                >
                                  <span class="f14">{{ item }}</span>
                                </div>
                                <!-- </q-list> -->
                              </q-menu>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->

                        <!-- #region วัน/เดือน/ปีเกิด -->
                        <div class="col">
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">วันเกิด</div>
                          </div>
                          <div class="sub-text font-mali-m">
                            <div
                              style="height: 30px"
                              v-if="!isChangeName || studentStore.birthDate != '-'"
                            >
                              {{ `${studentStore.birthDate || "-"}` }}
                            </div>
                            <div
                              class="f12 row"
                              style="width: 100%; height: 30px"
                              v-if="isChangeName && studentStore.birthDate == '-'"
                            >
                              <!-- #region Select Day -->
                              <div
                                class="box-dialog-selected"
                                style="width: 57px; padding: 4px 5px"
                              >
                                <div class="row justify-between">
                                  <div class="col f14">
                                    <span v-if="selectDay">
                                      {{ `${selectDay}` }}
                                    </span>
                                    <span v-else style="color: #939393"> วัน </span>
                                  </div>
                                  <div class="col-1 self-center width-fit" align="right">
                                    <q-icon size="20px" name="fas fa-caret-down"></q-icon>
                                  </div>
                                </div>
                                <q-menu
                                  auto-close
                                  fit
                                  style="height: 200px"
                                  class="z-max"
                                >
                                  <q-list class="no-padding">
                                    <div
                                      class="q-pa-xs item-select"
                                      v-for="(item, index) in dayList"
                                      :key="index"
                                      @click="selectDay = item"
                                      :class="{
                                        selected: selectDay == item,
                                      }"
                                    >
                                      <span class="f14">{{ item }}</span>
                                    </div>
                                  </q-list>
                                </q-menu>
                              </div>
                              <!-- #endregion -->

                              <!-- #region Select Month -->
                              <div
                                class="box-dialog-selected"
                                style="width: 117px; margin: 0px 4px; padding: 4px 5px"
                              >
                                <div class="row justify-between">
                                  <div class="col f14">
                                    <span v-if="showMonthName">
                                      {{ `${showMonthName || "เดือน"}` }}
                                    </span>
                                    <span v-else style="color: #939393"> เดือน </span>
                                  </div>
                                  <div class="col-1 self-center width-fit" align="right">
                                    <q-icon size="20px" name="fas fa-caret-down"></q-icon>
                                  </div>
                                </div>
                                <q-menu
                                  auto-close
                                  fit
                                  style="height: 200px"
                                  class="z-max"
                                >
                                  <q-list class="no-padding">
                                    <div
                                      class="q-pa-xs item-select"
                                      v-for="(itemMonth, indexMonth) in monthList"
                                      :key="indexMonth"
                                      @click="funcSelectMonth(itemMonth, indexMonth)"
                                      :class="
                                        selectMonth - 1 == indexMonth ? 'selected' : ''
                                      "
                                    >
                                      <span class="f14">{{ `${itemMonth}` }}</span>
                                    </div>
                                  </q-list>
                                </q-menu>
                              </div>
                              <!-- #endregion -->

                              <!-- #region Select Year -->
                              <div
                                class="box-dialog-selected"
                                style="width: 71px; padding: 4px 5px"
                              >
                                <div class="row justify-between">
                                  <div class="col f14">
                                    <span v-if="selectYear">
                                      {{ `${selectYear}` }}
                                    </span>
                                    <span v-else style="color: #939393"> ปี </span>
                                  </div>
                                  <div class="col-1 self-center width-fit" align="right">
                                    <q-icon size="20px" name="fas fa-caret-down"></q-icon>
                                  </div>
                                </div>
                                <q-menu
                                  auto-close
                                  fit
                                  style="height: 200px"
                                  class="z-max"
                                >
                                  <q-list class="no-padding">
                                    <div
                                      class="q-pa-xs item-select"
                                      v-for="(item, index) in yearList"
                                      :key="index"
                                      @click="selectYear = item"
                                      :class="{
                                        selected: selectYear == item,
                                      }"
                                    >
                                      <span class="f14">{{ item }}</span>
                                    </div>
                                  </q-list>
                                </q-menu>
                              </div>
                              <!-- #endregion -->
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <div style="margin: 16px 0px" class="">
                        <!-- #region อีเมล์ -->
                        <div>
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">อีเมล</div>
                          </div>
                          <div class="sub-text font-mali-m">
                            {{ studentStore.email || "-" }}
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <div style="margin: 16px 0px" class="row">
                        <!-- #region เบอร์โทร -->
                        <div class="col-4">
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">เบอร์โทรศัพท์</div>
                          </div>
                          <div class="sub-text font-mali-m">
                            <div style="height: 30px" v-if="!isChangeName">
                              {{ showPhoneNumber }}
                            </div>
                            <div
                              class="box-dialog-selected"
                              style="width: 90%; height: 30px; padding: 0px 5px"
                              :style="
                                !isValidatePhoneNumber
                                  ? 'border: 1px solid #4a261b;background-color: #FFF;'
                                  : 'border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                              "
                              v-if="isChangeName"
                            >
                              <q-input
                                dense
                                borderless
                                class="f14"
                                placeholder="ระบุเบอร์โทรศัพท์"
                                v-model="inputPhoneNumber"
                                :input-style="
                                  isValidatePhoneNumber
                                    ? 'font-size:14px;padding-bottom: 15px'
                                    : 'padding-bottom: 17px;color:#4a261b'
                                "
                                mask="##########"
                                @update:model-value="funcFormatPhoneNumber"
                                no-error-icon
                              >
                                <template v-slot:append v-if="isValidatePhoneNumber">
                                  <div class="f14" style="padding-bottom: 15px">
                                    <q-icon
                                      size="16px"
                                      class="text-validate"
                                      name="fas fa-exclamation-circle"
                                    ></q-icon>
                                  </div>
                                </template>
                              </q-input>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->

                        <!-- #region จังหวัด -->
                        <div class="col-4">
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">จังหวัด</div>
                          </div>
                          <div class="sub-text font-mali-m">
                            <div style="height: 30px" v-if="!isChangeName">
                              {{ studentStore.province || "-" }}
                            </div>
                            <div
                              class="box-dialog-selected f12"
                              style="width: 100%; height: 30px; padding: 4px 5px"
                              v-if="isChangeName"
                            >
                              <div class="row justify-between">
                                <div class="col f14">
                                  <span v-if="selectedProvince">
                                    {{ `${selectedProvince}` }}
                                  </span>
                                  <span v-else style="color: #939393">
                                    กรุณาเลือกจังหวัด
                                  </span>
                                </div>
                                <div class="col-1 self-center width-fit" align="right">
                                  <q-icon name="fas fa-caret-down" size="20px"></q-icon>
                                </div>
                              </div>
                              <q-menu auto-close fit style="height: 200px" class="z-max">
                                <q-list class="no-padding">
                                  <div
                                    class="q-pa-xs item-select"
                                    v-for="(item, index) in provinceList"
                                    :key="index"
                                    @click="selectedProvince = item"
                                    :class="{
                                      selected: selectedProvince == item,
                                    }"
                                  >
                                    <span class="f14">{{ item }}</span>
                                  </div>
                                </q-list>
                              </q-menu>
                            </div>
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <div style="margin: 16px 0px" class="row">
                        <!-- #region สถานะ -->
                        <div class="col">
                          <div class="header-text">
                            <div class="q-pl-md font-mali-b">
                              สถานะสมาชิก Winner Member
                            </div>
                          </div>

                          <div
                            class="sub-text f16 font-mali-m relative-position row"
                            style="margin-top: 6px"
                            :style="
                              studentStore.history.length != 0 ? 'margin-left: -10px' : ''
                            "
                          >
                            <div v-if="studentStore.history.length == 0">
                              {{ `ยังไม่มีการสมัครการใช้งาน` }}
                            </div>
                            <div v-else>
                              <div
                                class="row"
                                v-if="studentStore.distanceInDays >= 0"
                                style="line-height: 1"
                              >
                                <div class="q-mr-sm self-start">
                                  <q-img
                                    src="/images/icon_main/icon-check-data-size-16.png"
                                    width="16px"
                                  ></q-img>
                                </div>
                                <div class="self-end">
                                  {{ `ใช้ได้จนถึง: ${studentStore.expireDateFormat}` }}
                                </div>
                              </div>
                              <div v-else class="row" style="line-height: 1">
                                <div class="q-mr-sm self-start">
                                  <q-img
                                    src="/images/icon_main/icon-alert-data-size-16.png"
                                    width="16px"
                                  ></q-img>
                                </div>
                                <div class="self-end">
                                  {{ `หมดอายุสมาชิก Winner Member` }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-1 width-fit self-start" align="right">
                          <q-img
                            width="135px"
                            :src="`/images/button_main/button-history-payment${
                              isChangeName ? '-disable' : ''
                            }.png`"
                            @click="
                              isChangeName ? null : (isShowDialogHistoryPayment = true)
                            "
                            :class="isChangeName ? '' : 'cursor-pointer'"
                            no-spinner=""
                            no-transition=""
                          ></q-img>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <!-- #region ปุ่มลบตัวละคร -->
                      <div
                        class="button-delete-student font-mali-m f12"
                        align="center"
                        :class="isChangeName ? 'button-delete-student-disable' : ''"
                        @click="isChangeName ? null : funcShowDialogDeleteUser()"
                      >
                        ลบบัญชีผู้ใช้
                      </div>
                      <!-- #endregion -->
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region ข้อมูลสถิติแบบฝึกหัด -->
                <div v-else class="row">
                  <div class="col-12" style="height: 56px" align="right">
                    <q-img
                      @click="funcShowCertificate()"
                      no-spinner
                      no-transition
                      class="q-mx-sm cursor-pointer"
                      :src="`/images/button_main/button-certificate.png`"
                      width="135px"
                    >
                      <!-- <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          v-if="courseData.progressAVG < 80"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <span
                            >เกีรยติบัตร ต้องมีผลความก้าวหน้า 80% ขึ้นไป</span
                          >
                        </q-tooltip> -->
                    </q-img>
                    <q-btn
                      class="button-main default button-main-radius bubble-selected q-py-sm z-top"
                      style="width: 100px; height: 50px"
                      padding="10px 0px"
                      push
                      no-caps
                    >
                      <span class="q-pl-sm text-black text-bold">
                        {{ `Level ${selectedLevel}` }}
                      </span>
                      <q-space></q-space>
                      <q-icon
                        class="q-mr-xs"
                        size="16px"
                        name="fas fa-caret-down"
                      ></q-icon>

                      <q-menu
                        transition-show="jump-down"
                        transition-hide="jump-up"
                        class="relative-position z-max"
                        fit
                        style="border-radius: 5px; border: 2px solid #4a261b"
                      >
                        <q-list
                          class="box-selected"
                          style="height: fit-content; max-height: 200px"
                        >
                          <div class="q-pa-sm">
                            <div
                              clickable
                              v-close-popup
                              class="options-menu-list q-pa-xs cursor-pointer"
                              v-for="(item, index) in courseStore.courseLevelOptions"
                              align="center"
                              :class="{
                                'active-menu': selectedLevel == item.value,
                              }"
                              @click="
                                funcCheckProgressScoreAndSkill(
                                  selectedProgressTab,
                                  item.value
                                )
                              "
                            >
                              <span>Level {{ item.value }}</span>
                            </div>
                          </div>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>

                  <div class="col-12 row f14 font-mali-m box-progress-main">
                    <div class="col-7" style="width: 55%">
                      <div class="box-practice-content row">
                        <div>
                          <q-circular-progress
                            show-value
                            :value="Number(courseData.progressAVG)"
                            size="110px"
                            :thickness="0.05"
                            color="green"
                            track-color="grey-3"
                          >
                            <span class="f34 font-mali-m">
                              {{ displayNumber(courseData.progressAVG) }}%
                            </span>
                          </q-circular-progress>
                        </div>
                        <div class="col self-center" align="center">
                          <span class="f20 font-mali-b">ความก้าวหน้าเฉลี่ย</span>
                        </div>
                      </div>

                      <div class="box-practice-content q-mt-sm">
                        <div>
                          <span class="f20 font-mali-b"> คะแนนเฉลี่ย </span>
                        </div>
                        <div class="row q-pt-sm q-pb-xs">
                          <div class="self-center progress relative-position row no-wrap">
                            <div
                              class="progress-bar"
                              :class="
                                courseData.totalAVGScore < 30
                                  ? 'progress-failed'
                                  : courseData.totalAVGScore < 60
                                  ? 'progress-warning'
                                  : 'progress-success'
                              "
                              :style="`width:${courseData.totalAVGScore}%`"
                            ></div>

                            <div
                              class="self-center q-pl-sm relative-position q-ml-md"
                              align="left"
                            >
                              <span class="absolute-center" style="top: -1px"
                                >{{ displayNumber(courseData.totalAVGScore) }}%</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="box-practice-content q-mt-sm">
                        <div class="box-help-content">
                          <span class="f20 font-mali-b">
                            คำแนะนำ
                            <span v-if="selectedProgressTab == 'score'"> (คะแนน) </span>
                            <span v-else> (ความก้าวหน้า) </span>
                          </span>

                          <div class="">
                            <div
                              class=""
                              v-for="(item, index) in progressHelpData[
                                selectedProgressTab
                              ]"
                              v-if="!isSuccessProgress"
                            >
                              <div class="q-pt-sm q-pl-xs" v-if="item.isHelp">
                                <span class="f14">
                                  {{ item.text }}
                                </span>
                              </div>
                            </div>
                            <div v-else class="q-py-md q-px-sm f16">
                              <span v-if="selectedProgressTab == 'score'"
                                >คะแนนเยอะขนาดนี้ ปังไม่ไหวเลย</span
                              >
                              <span v-else>แบบฝึกหัดเยอะขนาดไหนก็ไม่หวั่น</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="col-1" style="width: 10px"></div>

                    <div class="col">
                      <div class="full-height">
                        <div class="row">
                          <div
                            class="col button-progress-menu"
                            align="center"
                            :class="selectedProgressTab == 'progress' ? 'active' : ''"
                            @click="
                              funcCheckProgressScoreAndSkill(
                                'progress',
                                selectedLevel || courseStore.courseLevel
                              )
                            "
                          >
                            <span
                              class="font-mali-b f20 relative-position"
                              style="z-index: 2"
                              >ความก้าวหน้า</span
                            >
                          </div>
                          <div
                            class="col button-progress-menu"
                            align="center"
                            :class="selectedProgressTab == 'score' ? 'active' : ''"
                            @click="
                              funcCheckProgressScoreAndSkill(
                                'score',
                                selectedLevel || courseStore.courseLevel
                              )
                            "
                          >
                            <span
                              class="font-mali-b f20 relative-position"
                              style="z-index: 2"
                            >
                              คะแนน
                            </span>
                          </div>
                        </div>
                        <div class="box-progress-score">
                          <div class="q-pa-xs box-progress-score-scroll">
                            <div
                              v-for="(item, index) in progressHelpData[
                                selectedProgressTab
                              ]"
                            >
                              <div class="q-mt-sm">
                                <span class="f16 font-mali-b">
                                  {{ item.skill }}
                                </span>
                              </div>
                              <div class="row">
                                <div class="self-start progress q-mt-sm row no-wrap">
                                  <div
                                    class="progress-bar"
                                    :class="
                                      item.score < 30
                                        ? 'progress-failed'
                                        : item.score < 60
                                        ? 'progress-warning'
                                        : 'progress-success'
                                    "
                                    :style="`min-width:5px;width:${item.score}%`"
                                  ></div>
                                  <div
                                    class="self-center q-pl-sm relative-position q-ml-md"
                                    align="left"
                                  >
                                    <span class="absolute-center" style="top: -1px"
                                      >{{
                                        item.score > 100
                                          ? 100
                                          : displayNumber(item.score) || 0
                                      }}%</span
                                    >
                                  </div>
                                </div>
                                <div class="col-1 self-center q-pt-xs q-px-sm"></div>
                              </div>
                            </div>
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
          </div>

          <!-- #region ปุ่มปิดโปรไพล์ -->
          <div
            @click="isChangeName ? null : closeButton.func()"
            class="absolute-top-right"
            style="right: -15px; top: -15px"
          >
            <q-btn round flat :class="isChangeName ? 'cursor-not-allowed' : ''">
              <q-img
                width="45px"
                :src="isChangeName ? closeButton.imgDisable : closeButton.img"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Mobile -->
  <q-dialog
    v-model="isShowDialogProfile"
    maximized
    persistent
    class="z-max"
    v-if="!$q.platform.is.desktop && false"
  >
    <q-card class="transparent shadow-0 font-mali-m">
      <q-card-section class="fit row items-center">
        <div class="dialog-container-mobile relative-position">
          <!-- #region เมนู -->
          <div class="box-button-container row">
            <div
              class="button-menu-mobile"
              :class="[
                selectedMenu == item.name ? 'active' : '',
                isChangeName ? 'cursor-not-allowed' : 'cursor-pointer',
              ]"
              v-for="(item, index) in menuList"
              @click="isChangeName ? null : item.func(item.name)"
            >
              <span class="relative-position font-mali-b f16" style="z-index: 2">{{
                item.label
              }}</span>
            </div>
          </div>
          <!-- #endregion -->

          <div class="box-dialog-content-mobile">
            <!-- #region ข้อมูลตัวละคร -->
            <div v-if="selectedMenu == 'profile'" class="q-pa-sm">
              <div class="box-profile-content-mobile">
                <div class="profile-name">
                  <div
                    class="row justify-between q-px-xs"
                    v-if="!isChangeName"
                    style="height: 48px"
                  >
                    <!-- #region แสดงผลชื่อเล่น -->
                    <div class="col self-center text-white f16 font-mali-b">
                      <div class="row items-center text-overflow" style="height: 42px">
                        <span>
                          {{ studentStore.characterName }}
                        </span>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ปุ่มแก้ไข -->
                    <div class="col-1 self-center width-fit">
                      <q-btn size="11px" round flat @click="editNameButton.func()">
                        <q-img
                          :src="editNameButton.imgMobile"
                          no-spinner
                          no-transition
                        ></q-img>
                      </q-btn>
                    </div>
                    <!-- #endregion -->
                  </div>

                  <div
                    class="row items-center q-px-xs"
                    style="height: 48px"
                    v-if="isChangeName"
                  >
                    <!-- #region Input ชื่อเล่น -->
                    <div class="col">
                      <div
                        class="col row q-mr-sm relative-position"
                        style="height: 34px; border-radius: 10px"
                        :style="
                          inputName.length == 0
                            ? 'border-radius: 10px;border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                            : 'background-color:#FFF;border: 1px solid #4A261B;'
                        "
                      >
                        <div style="height: 35px" class="relative-position">
                          <q-input
                            style="width: 100%; height: 35px"
                            borderless
                            dense
                            input-style="padding:0px 7px;height:35px;"
                            v-model.trim="inputName"
                            reactive-rules
                            :rules="[checkCharacterName]"
                            hide-bottom-space
                            maxlength="20"
                            placeholder="กรุณาระบุชื่อตัวละคร"
                            no-error-icon
                          >
                            <template v-slot:append v-if="inputName.length == 0">
                              <div
                                class="f14"
                                style="padding-right: 10px; padding-bottom: 9px"
                              >
                                <q-icon
                                  size="20px"
                                  class="text-validate"
                                  name="fas fa-exclamation-circle"
                                ></q-icon>
                              </div>
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ปุ่มบันทึก/ปุ่มยกเลิก -->
                    <div class="col-1 self-center width-fit">
                      <q-btn
                        class="q-mx-xs"
                        size="11px"
                        round
                        flat
                        @click="isChangeName = false"
                      >
                        <q-img
                          no-spinner
                          no-transition
                          src="/images/icon_main/icon-cancel.png"
                        ></q-img>
                      </q-btn>

                      <q-btn size="11px" round flat @click="funcSaveStudentData()">
                        <q-img
                          no-spinner
                          no-transition
                          src="/images/icon_main/icon-confirm.png"
                        ></q-img>
                      </q-btn>
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>

                <div style="padding: 2px">
                  <div
                    class="f14 box-dialog-content-scorll f14"
                    style="padding-left: 10px"
                  >
                    <!-- #region ชื่อ-นามสกุล -->
                    <div class="q-my-sm q-mt-md">
                      <div class="header-text">
                        <div class="q-pl-md font-mali-b">ชื่อ-สกุล</div>
                      </div>
                      <div class="sub-text font-mali-m">
                        {{ studentStore.studentFullName }}
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region โรงเรียน -->
                    <div class="q-my-sm f14" v-if="studentStore.studentType == 'school'">
                      <div class="header-text">
                        <div class="q-pl-md font-mali-b">โรงเรียน</div>
                      </div>
                      <div class="sub-text font-mali-m">
                        {{ schoolStore.schoolName }}
                      </div>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ข้อมูลเฉพาะนักเรียนออนไลน์ -->
                    <div v-if="studentStore.studentType != 'school'">
                      <!-- #region เพศ -->
                      <div class="q-my-md f14">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">เพศ</div>
                        </div>
                        <div class="sub-text f14 font-mali-m" v-if="!isChangeName">
                          <div style="height: 30px; padding-top: 3px">
                            {{ studentStore.gender || "-" }}
                          </div>
                        </div>
                        <div class="sub-text-mobile f14 font-mali-m" v-if="isChangeName">
                          <div
                            class="box-dialog-selected"
                            style="width: 80%; padding: 5px"
                          >
                            <div class="row f14 justify-between">
                              <div class="col">
                                <span v-if="selectedGender">
                                  {{ `${selectedGender}` }}
                                </span>
                                <span v-else style="color: #939393"> กรุณาระบุเพศ </span>
                              </div>
                              <div class="col-1 self-center width-fit" align="right">
                                <q-icon name="fas fa-caret-down"></q-icon>
                              </div>
                            </div>
                            <q-menu auto-close fit class="z-max">
                              <q-list class="no-padding">
                                <div
                                  class="item-select q-pa-xs"
                                  v-for="(item, index) in genderList"
                                  :key="index"
                                  @click="selectedGender = item"
                                  :class="{
                                    selected: selectedGender == item,
                                  }"
                                >
                                  <span class="f14">{{ item }}</span>
                                </div>
                              </q-list>
                            </q-menu>
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region วัน/เดือน/ปีเกิด -->
                      <div class="q-my-md">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">วันเกิด</div>
                        </div>
                        <div
                          class="sub-text font-mali-m"
                          v-if="!isChangeName || studentStore.birthDate != '-'"
                        >
                          <div style="height: 30px">
                            {{ `${studentStore.birthDate || "-"}` }}
                          </div>
                        </div>
                        <div class="sub-text-mobile font-mali-m" v-else>
                          <div class="f12 row" style="width: 100%; height: 30px">
                            <!-- #region Select Day -->
                            <div class="box-dialog-selected q-pa-xs" style="width: 55px">
                              <div class="row f14 justify-between">
                                <div class="col">
                                  <span v-if="selectDay">
                                    {{ `${selectDay}` }}
                                  </span>
                                  <span v-else style="color: #939393"> วัน </span>
                                </div>
                                <div class="col-1 self-center width-fit" align="right">
                                  <q-icon name="fas fa-caret-down"></q-icon>
                                </div>
                              </div>
                              <q-menu auto-close fit style="height: 200px" class="z-max">
                                <q-list class="no-padding">
                                  <div
                                    class="q-pa-xs item-select"
                                    v-for="(item, index) in dayList"
                                    :key="index"
                                    @click="selectDay = item"
                                    :class="{
                                      selected: selectDay == item,
                                    }"
                                  >
                                    <span class="f14">{{ item }}</span>
                                  </div>
                                </q-list>
                              </q-menu>
                            </div>
                            <!-- #endregion -->

                            <!-- #region Select Month -->
                            <div
                              class="box-dialog-selected q-pa-xs"
                              style="width: 100px; margin: 0px 4px"
                            >
                              <div class="row f14 justify-between">
                                <div class="col">
                                  <span v-if="selectMonth">
                                    {{ `${selectMonth}` }}
                                  </span>
                                  <span v-else style="color: #939393"> เดือน </span>
                                </div>
                                <div class="col-1 self-center width-fit" align="right">
                                  <q-icon name="fas fa-caret-down"></q-icon>
                                </div>
                              </div>
                              <q-menu auto-close fit style="height: 200px" class="z-max">
                                <q-list class="no-padding">
                                  <div
                                    class="q-pa-xs item-select"
                                    v-for="(item, index) in monthList"
                                    :key="index"
                                    @click="selectMonth = item"
                                    :class="{
                                      selected: selectMonth == item,
                                    }"
                                  >
                                    <span class="f14">{{ item }}</span>
                                  </div>
                                </q-list>
                              </q-menu>
                            </div>
                            <!-- #endregion -->

                            <!-- #region Select Year -->
                            <div class="box-dialog-selected q-pa-xs" style="width: 70px">
                              <div class="row f14 justify-between">
                                <div class="col">
                                  <span v-if="selectYear">
                                    {{ `${selectYear}` }}
                                  </span>
                                  <span v-else style="color: #939393"> ปี </span>
                                </div>
                                <div class="col-1 self-center width-fit" align="right">
                                  <q-icon name="fas fa-caret-down"></q-icon>
                                </div>
                              </div>
                              <q-menu auto-close fit style="height: 200px" class="z-max">
                                <q-list class="no-padding">
                                  <div
                                    class="q-pa-xs item-select"
                                    v-for="(item, index) in yearList"
                                    :key="index"
                                    @click="selectYear = item"
                                    :class="{
                                      selected: selectYear == item,
                                    }"
                                  >
                                    <span class="f14">{{ item }}</span>
                                  </div>
                                </q-list>
                              </q-menu>
                            </div>
                            <!-- #endregion -->
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region อีเมล -->
                      <div class="q-my-md">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">อีเมล</div>
                        </div>
                        <div class="sub-text font-mali-m">
                          {{ studentStore.email || "-" }}
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region เบอร์โทรศัพท์ -->
                      <div class="q-my-md f14">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">เบอร์โทรศัพท์</div>
                        </div>
                        <div class="sub-text font-mali-m" v-if="!isChangeName">
                          <div style="height: 30px; padding-top: 3px">
                            {{ showPhoneNumber }}
                          </div>
                        </div>
                        <div class="sub-text-mobile f14 font-mali-m" v-if="isChangeName">
                          <div
                            class="box-dialog-selected"
                            style="width: 80%; padding: 5px"
                            :style="
                              !isValidatePhoneNumber
                                ? 'border: 1px solid #4a261b;background-color: #FFF;'
                                : 'border: 1px solid #CF2E2E;background-color: #F8E2E2;'
                            "
                          >
                            <q-input
                              style="margin-top: -5px"
                              dense
                              borderless
                              class="f14"
                              placeholder="ระบุเบอร์โทรศัพท์"
                              v-model="inputPhoneNumber"
                              :input-style="
                                isValidatePhoneNumber
                                  ? 'font-size:14px;padding-bottom: 15px'
                                  : 'padding-bottom: 17px;color:#4a261b'
                              "
                              mask="##########"
                              @update:model-value="funcFormatPhoneNumber"
                            >
                              <template v-slot:append v-if="isValidatePhoneNumber">
                                <div class="f14" style="padding-bottom: 15px">
                                  <q-icon
                                    size="16px"
                                    class="text-validate"
                                    name="fas fa-exclamation-circle"
                                  ></q-icon>
                                </div>
                              </template>
                            </q-input>
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region จังหวัด -->
                      <div class="q-my-md f14">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">จังหวัด</div>
                        </div>
                        <div class="sub-text font-mali-m" v-if="!isChangeName">
                          <div style="height: 30px; padding-top: 3px">
                            {{ studentStore.province || "-" }}
                          </div>
                        </div>
                        <div class="sub-text-mobile font-mali-m" v-if="isChangeName">
                          <div
                            class="box-dialog-selected f12"
                            style="width: 80%; padding: 5px"
                          >
                            <div class="row f14 justify-between">
                              <div class="col">
                                <span v-if="selectedProvince">
                                  {{ `${selectedProvince}` }}
                                </span>
                                <span v-else style="color: #939393">
                                  กรุณาเลือกจังหวัด
                                </span>
                              </div>
                              <div class="col-1 self-center width-fit" align="right">
                                <q-icon name="fas fa-caret-down"></q-icon>
                              </div>
                            </div>
                            <q-menu auto-close fit style="height: 200px" class="z-max">
                              <q-list class="no-padding">
                                <div
                                  class="q-pa-xs item-select"
                                  v-for="(item, index) in provinceList"
                                  :key="index"
                                  @click="selectedProvince = item"
                                  :class="{
                                    selected: selectedProvince == item,
                                  }"
                                >
                                  <span class="f14">{{ item }}</span>
                                </div>
                              </q-list>
                            </q-menu>
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region สถานะ -->
                      <div class="q-mt-md">
                        <div class="header-text">
                          <div class="q-pl-md font-mali-b">สถานะ Winner Member</div>
                        </div>

                        <div
                          class="sub-text f14 font-mali-m relative-position row q-mt-sm"
                          :style="
                            studentStore.history.length != 0 ? 'margin-left: -10px' : ''
                          "
                        >
                          <div v-if="studentStore.history.length == 0">
                            {{ `ยังไม่มีการสมัครการใช้งาน` }}
                          </div>
                          <div v-else>
                            <div
                              class="row"
                              v-if="studentStore.distanceInDays >= 0"
                              style="line-height: 1"
                            >
                              <div class="q-mr-sm self-center">
                                <q-img
                                  src="/images/icon_main/icon-check-data-size-16.png"
                                  width="14px"
                                ></q-img>
                              </div>
                              <div class="self-end">
                                {{ `ใช้ได้จนถึง: ${studentStore.expireDateFormat}` }}
                              </div>
                            </div>
                            <div v-else class="row" style="line-height: 1">
                              <div class="q-mr-sm self-center">
                                <q-img
                                  src="/images/icon_main/icon-alert-data-size-16.png"
                                  width="14px"
                                ></q-img>
                              </div>
                              <div class="self-end">
                                {{ `หมดอายุสมาชิก Winner Member` }}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region ปุ่มประวัติการทำรายการ -->
                      <div class="q-px-md q-my-md">
                        <div>
                          <q-img
                            width="135px"
                            :src="`/images/button_main/button-history-payment${
                              isChangeName ? '-disable' : ''
                            }.png`"
                            @click="
                              isChangeName ? null : (isShowDialogHistoryPayment = true)
                            "
                            :class="isChangeName ? '' : 'cursor-pointer'"
                          ></q-img>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region ปุ่มลบข้อมูลบัญชี -->
                      <div
                        class="button-delete-student font-mali-m f12"
                        align="center"
                        :class="
                          isChangeName
                            ? 'cursor-not-allowed button-delete-student-disable'
                            : ' cursor-pointer'
                        "
                        @click="isChangeName ? null : funcShowDialogDeleteUser()"
                      >
                        ลบบัญชีผู้ใช้
                      </div>
                      <!-- #endregion -->
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <div v-if="selectedMenu == 'practice'">
              <!-- #region ปุ่ม level/ปุ่ม Certificate -->
              <div class="q-py-sm row justify-center" style="height: 56px">
                <div class="q-mx-xs">
                  <q-img
                    @click="funcShowCertificate()"
                    no-spinner
                    no-transition
                    class="cursor-pointer"
                    :src="`/images/button_main/button-certificate.png`"
                    width="135px"
                  >
                  </q-img>
                </div>

                <div class="q-mx-sm">
                  <q-btn
                    class="button-main default button-main-radius bubble-selected q-py-sm z-top f16"
                    style="width: 120px; height: 50px"
                    padding="10px 0px"
                    push
                    no-caps
                  >
                    <span class="q-pl-sm text-black text-bold">
                      {{ `Level ${selectedLevel}` }}
                    </span>
                    <q-space></q-space>
                    <q-icon class="q-mr-xs" size="16px" name="fas fa-caret-down"></q-icon>

                    <q-menu
                      transition-show="jump-down"
                      transition-hide="jump-up"
                      class="relative-position z-max"
                      fit
                      style="border-radius: 5px; border: 2px solid #4a261b"
                    >
                      <q-list
                        class="box-selected"
                        style="height: fit-content; max-height: 200px"
                      >
                        <div class="q-pa-sm" align="left">
                          <div
                            clickable
                            v-close-popup
                            class="options-menu-list q-pa-xs cursor-pointer"
                            v-for="(item, index) in courseStore.courseLevelOptions"
                            :class="{
                              'active-menu': selectedLevel == item.value,
                            }"
                            @click="
                              funcCheckProgressScoreAndSkill(
                                selectedProgressTab,
                                item.value
                              )
                            "
                          >
                            <span>Level {{ item.value }}</span>
                          </div>
                        </div>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region  -->
              <div class="q-py-sm q-pl-sm q-pr-xs">
                <div class="box-scroll-progress-mobile">
                  <div class="q-mb-sm">
                    <div class="box-practice-content row">
                      <div>
                        <q-circular-progress
                          show-value
                          :value="Number(courseData.progressAVG)"
                          size="75px"
                          :thickness="0.05"
                          color="green"
                          track-color="grey-3"
                        >
                          <span class="f24 font-mali-m">
                            {{ displayNumber(courseData.progressAVG) }}%
                          </span>
                        </q-circular-progress>
                      </div>
                      <div class="col self-center" align="center">
                        <span class="f16 font-mali-b">ความก้าวหน้าเฉลี่ย</span>
                      </div>
                    </div>
                  </div>
                  <div class="q-my-sm">
                    <div class="box-practice-content">
                      <div>
                        <span class="f16 font-mali-b"> คะแนนเฉลี่ย </span>
                      </div>
                      <div class="row q-pt-sm q-pb-xs">
                        <div class="self-center progress relative-position row no-wrap">
                          <div
                            class="progress-bar"
                            :class="
                              courseData.totalAVGScore < 30
                                ? 'progress-failed'
                                : courseData.totalAVGScore < 60
                                ? 'progress-warning'
                                : 'progress-success'
                            "
                            :style="`width:${courseData.totalAVGScore}%`"
                          ></div>

                          <div
                            class="self-center q-pl-sm relative-position q-ml-md"
                            align="left"
                          >
                            <span class="absolute-center f12" style="top: -1px"
                              >{{ courseData.totalAVGScore }}%</span
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-my-sm">
                    <div class="row">
                      <div
                        class="col button-progress-menu"
                        align="center"
                        :class="selectedProgressTab == 'progress' ? 'active' : ''"
                        @click="
                          funcCheckProgressScoreAndSkill(
                            'progress',
                            selectedLevel || courseStore.courseLevel
                          )
                        "
                      >
                        <span class="font-mali-m f16 relative-position" style="z-index: 2"
                          >ความก้าวหน้า</span
                        >
                      </div>
                      <div
                        class="col button-progress-menu"
                        align="center"
                        :class="selectedProgressTab == 'score' ? 'active' : ''"
                        @click="
                          funcCheckProgressScoreAndSkill(
                            'score',
                            selectedLevel || courseStore.courseLevel
                          )
                        "
                      >
                        <span
                          class="font-mali-m f16 relative-position"
                          style="z-index: 2"
                        >
                          คะแนน
                        </span>
                      </div>
                    </div>
                    <div class="box-progress-score">
                      <div class="q-pa-xs">
                        <div
                          v-for="(item, index) in progressHelpData[selectedProgressTab]"
                        >
                          <div class="q-mt-sm">
                            <span class="f14 font-mali-b">
                              {{ item.skill }}
                            </span>
                          </div>
                          <div class="row">
                            <div class="self-start progress q-mt-sm row no-wrap">
                              <div
                                class="progress-bar"
                                :class="
                                  item.score < 30
                                    ? 'progress-failed'
                                    : item.score < 60
                                    ? 'progress-warning'
                                    : 'progress-success'
                                "
                                :style="`min-width:5px;width:${item.score}%`"
                              ></div>
                              <div
                                class="self-center q-pl-sm relative-position q-ml-md"
                                align="left"
                              >
                                <span class="absolute-center f12" style="top: -1px">
                                  {{
                                    item.score > 100
                                      ? 100
                                      : displayNumber(item.score) || 0
                                  }}%</span
                                >
                              </div>
                            </div>
                            <div class="col-1 self-center q-pt-xs q-px-sm"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-mt-sm">
                    <div class="box-practice-content">
                      <div>
                        <span class="f16 font-mali-b">
                          คำแนะนำ
                          <span v-if="selectedProgressTab == 'score'"> (คะแนน) </span>
                          <span v-else>(ความก้าวหน้า)</span>
                        </span>

                        <div class="">
                          <div
                            class="q-pt-sm q-pl-xs"
                            v-for="(item, index) in progressHelpData[selectedProgressTab]"
                            v-if="!isSuccessProgress"
                          >
                            <div class="q-pt-sm q-pl-xs" v-if="item.isHelp">
                              <span class="f14">
                                {{ item.text }}
                              </span>
                            </div>
                          </div>
                          <div v-else class="q-py-md q-px-sm f16">
                            <span v-if="selectedProgressTab == 'score'"
                              >คะแนนเยอะขนาดนี้ ปังไม่ไหวเลย</span
                            >
                            <span v-else>แบบฝึกหัดเยอะขนาดไหนก็ไม่หวั่น</span>
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

          <!-- #region ปุ่มปิด -->
          <div
            @click="isChangeName ? null : closeButton.func()"
            class="absolute-top-right"
            style="right: -15px; top: -15px"
          >
            <q-btn round flat :class="isChangeName ? 'cursor-not-allowed' : ''">
              <q-img
                width="45px"
                :src="isChangeName ? closeButton.imgDisable : closeButton.img"
                no-spinner
                no-transition
              ></q-img>
            </q-btn>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog History Payment -->
  <q-dialog maximized v-model="isShowDialogHistoryPayment" persistent class="z-max" v-if="false">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container relative-position">
          <div class="box-dialog-sub">
            <div class="text-title-dialog f20 font-mali-b" align="center">
              <span>ประวัติการทำรายการ</span>
            </div>
            <div class="font-mali-sb f14 row" style="margin-top: 12px">
              <div
                @click="historySelected = 'payment'"
                class="cursor-pointer"
                style="
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;

                  padding: 12px;
                  width: fit-content;
                "
                :style="
                  historySelected == 'payment'
                    ? 'background-color: #efd080'
                    : 'background-color: #ffffff'
                "
              >
                การชำระเงิน
              </div>
              <div
                @click="historySelected = 'practice'"
                class="cursor-pointer"
                style="
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  padding: 12px;
                  width: fit-content;
                "
                :style="
                  historySelected == 'practice'
                    ? 'background-color: #efd080'
                    : 'background-color:#ffffff'
                "
                v-if="false"
              >
                ปลดล็อกบทเรียน
              </div>
            </div>
            <div class="box-dialog-details">
              <div style="">
                <!-- <div
                  class="q-pa-xs q-px-sm font-mali-m"
                  align="right"
                  v-if="studentStore.history.length"
                >
                  <span class="f10 q-mx-xs">เรียงตาม (วันที่)</span>
                  <span class="cursor-pointer" @click="funcSortHistory()">
                    <q-icon
                      size="12px"
                      name="fas fa-long-arrow-alt-down"
                      v-if="studentStore.student.isSortHistory"
                    ></q-icon>
                    <q-icon size="12px" name="fas fa-long-arrow-alt-up" v-else></q-icon>
                  </span>
                </div> -->
                <div class="box-dialog-content-scroller relative-position">
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      flex: 1 0 0;
                      align-self: stretch;
                    "
                    class="full-width full-height"
                  >
                    <!-- History payment -->
                    <div
                      v-if="historySelected == 'payment'"
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        flex: 1 0 0;
                        align-self: stretch;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          padding: 8px 12px 4px 12px;
                          flex-direction: column;
                          align-items: flex-start;
                          gap: 4px;
                          align-self: stretch;
                          border-radius: 0px 10px 10px 10px;
                        "
                        v-if="comShowHistoryData.length > 0"
                      >
                        <div
                          style="
                            display: flex;
                            width: 80px;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 4px;
                            position: relative;
                          "
                        >
                          <div>เรียงตาม</div>
                          <div
                            style="
                              display: flex;
                              padding: 8px 12px;
                              justify-content: space-between;
                              align-items: center;
                              align-self: stretch;
                              border-radius: 10px;
                              border: 1px solid #4a261b;
                              background: #fff;
                            "
                            class="font-mali-m f12"
                          >
                            <div>
                              {{ showSortSelectedBy == "last" ? "ล่าสุด" : "เก่าสุด" }}
                            </div>
                            <q-icon
                              :name="
                                isDropdownSortHistory
                                  ? 'fas fa-caret-up'
                                  : 'fas fa-caret-down'
                              "
                              class="clickable cursor-pointer"
                              @click="openDropdownSortHistory()"
                            />
                          </div>
                          <div
                            v-if="isDropdownSortHistory"
                            style="
                              display: flex;
                              width: 80px;
                              flex-direction: column;
                              align-items: flex-start;
                              position: absolute;
                              top: 67px;
                              border-radius: 10px;
                              border: 1px solid #4a261b;
                              background: #fff;
                              overflow: hidden;
                              z-index: 2;
                            "
                            class="font-mali-m f12"
                          >
                            <div
                              @click="showSortSelectedBy = 'last'"
                              style="
                                display: flex;
                                padding: 10px 12px;
                                align-items: center;
                                gap: 10px;
                                align-self: stretch;
                              "
                              :style="`${
                                showSortSelectedBy == 'last'
                                  ? 'background: #d9d9d9'
                                  : 'background: #ffffff'
                              }`"
                            >
                              ล่าสุด
                            </div>
                            <div
                              @click="showSortSelectedBy = 'olded'"
                              style="
                                display: flex;
                                padding: 10px 12px;
                                align-items: center;
                                gap: 10px;
                                align-self: stretch;
                              "
                              :style="`${
                                showSortSelectedBy == 'olded'
                                  ? 'background: #d9d9d9'
                                  : 'background: #ffffff'
                              }`"
                            >
                              เก่าสุด
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          display: flex;
                          padding: 8px 0px;
                          justify-content: space-between;
                          align-items: flex-start;
                          flex: 1 0 0;
                          align-self: stretch;
                          width: 100%;
                          height: 100%;
                        "
                      >
                        <q-scroll-area
                          :visible="true"
                          :vertical-thumb-style="thumbHistoryPaymentStyle"
                          style="
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 12px;
                            flex: 1 0 0;
                            align-self: stretch;
                          "
                          ref="scrollHistory"
                        >
                          <div
                            style="
                              display: flex;
                              padding: 0px 16px;
                              flex-direction: column;
                              align-items: flex-start;
                              gap: 8px;
                              align-self: stretch;
                            "
                            class="font-mali-sb f14"
                            v-for="(item, index) in comShowHistoryData"
                            :key="index"
                          >
                            <div class="font-mali-m f12" style="color: #5e5e5e">
                              {{ item.date }}
                            </div>
                            <div
                              v-for="(itemCourse, courseIndex) in item.courseList"
                              :key="courseIndex"
                              class="row items-center justify-between full-width"
                            >
                              <div>{{ `Level ${itemCourse.level}` }}</div>
                              <div>{{ `฿${itemCourse.totalPrice}` }}</div>
                            </div>
                            <div
                              v-if="
                                item.totalDiscount != '' && item.totalDiscount != null
                              "
                              class="row items-center justify-between full-width"
                            >
                              <div>โค้ดส่วนลด</div>
                              <div>-฿{{ item.totalDiscount }}</div>
                            </div>
                            <div class="row items-center justify-between full-width">
                              <div>รวมคำสั่งซื้อ</div>
                              <div class="font-mali-b f16">฿{{ item.totalPrice }}</div>
                            </div>
                            <div
                              :style="`${
                                index == comShowHistoryData.length - 1
                                  ? 'margin-bottom: 8px'
                                  : ''
                              }`"
                              class="row items-center justify-between full-width font-mali-m f12"
                            >
                              <div>ชำระผ่าน</div>
                              <div>
                                {{
                                  item.paymentBy == "QR-code" ? "QR Code" : "Credit Card"
                                }}
                              </div>
                            </div>
                            <div
                              v-if="index != comShowHistoryData.length - 1"
                              style="
                                height: 2px;
                                align-self: stretch;
                                background: #caa954;
                                margin-bottom: 12px;
                              "
                            ></div>
                          </div>
                        </q-scroll-area>

                        <div
                          class="absolute-center full-width f14 font-mali-b"
                          style="color: #4a261b"
                          align="center"
                          v-if="comShowHistoryData.length == 0"
                        >
                          ยังไม่มีประวัติการทำรายการ
                        </div>
                      </div>
                    </div>

                    <!-- practice Unlock -->
                    <div
                      v-else
                      style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        flex: 1 0 0;
                        align-self: stretch;
                      "
                    >
                      <div
                        style="
                          display: flex;
                          padding: 8px 12px 4px 12px;
                          flex-direction: column;
                          align-items: flex-start;
                          gap: 4px;
                          align-self: stretch;
                          border-radius: 0px 10px 10px 10px;
                        "
                        v-if="comShowCourseData.length > 0"
                      >
                        <div
                          style="
                            display: flex;
                            width: 80px;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 4px;
                            position: relative;
                          "
                        >
                          <div>เรียงตาม</div>
                          <div
                            style="
                              display: flex;
                              padding: 8px 12px;
                              justify-content: space-between;
                              align-items: center;
                              align-self: stretch;
                              border-radius: 10px;
                              border: 1px solid #4a261b;
                              background: #fff;
                            "
                            class="font-mali-m f12"
                          >
                            <div>
                              {{ showSortSelectedBy == "last" ? "ล่าสุด" : "เก่าสุด" }}
                            </div>
                            <q-icon
                              :name="
                                isDropdownSortHistory
                                  ? 'fas fa-caret-up'
                                  : 'fas fa-caret-down'
                              "
                              class="clickable cursor-pointer"
                              @click="openDropdownSortHistory()"
                            />
                          </div>
                          <div
                            v-if="isDropdownSortHistory"
                            style="
                              display: flex;
                              width: 80px;
                              flex-direction: column;
                              align-items: flex-start;
                              position: absolute;
                              top: 67px;
                              border-radius: 10px;
                              border: 1px solid #4a261b;
                              background: #fff;
                              overflow: hidden;
                              z-index: 2;
                            "
                            class="font-mali-m f12"
                          >
                            <div
                              @click="showSortSelectedBy = 'last'"
                              style="
                                display: flex;
                                padding: 10px 12px;
                                align-items: center;
                                gap: 10px;
                                align-self: stretch;
                              "
                              :style="`${
                                showSortSelectedBy == 'last'
                                  ? 'background: #d9d9d9'
                                  : 'background: #ffffff'
                              }`"
                            >
                              ล่าสุด
                            </div>
                            <div
                              @click="showSortSelectedBy = 'olded'"
                              style="
                                display: flex;
                                padding: 10px 12px;
                                align-items: center;
                                gap: 10px;
                                align-self: stretch;
                              "
                              :style="`${
                                showSortSelectedBy == 'olded'
                                  ? 'background: #d9d9d9'
                                  : 'background: #ffffff'
                              }`"
                            >
                              เก่าสุด
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          display: flex;
                          padding: 8px 0px;
                          justify-content: space-between;
                          align-items: flex-start;
                          flex: 1 0 0;
                          align-self: stretch;
                          width: 100%;
                          height: 100%;
                        "
                      >
                        <q-scroll-area
                          :visible="true"
                          :vertical-thumb-style="thumbHistoryPaymentStyle"
                          style="
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 12px;
                            flex: 1 0 0;
                            align-self: stretch;
                          "
                          ref="scrollHistory"
                        >
                          <div
                            style="
                              display: flex;
                              padding: 0px 16px;
                              flex-direction: column;
                              align-items: flex-start;
                              gap: 8px;
                              align-self: stretch;
                            "
                            class="font-mali-sb f14"
                            v-for="(item, index) in comShowCourseData"
                            :key="index"
                          >
                            <div class="row items-center justify-between full-width">
                              <div class="font-mali-b f16">Level {{ item.level }}</div>
                              <div class="row items-center">
                                <div
                                  style="
                                    width: 10px;
                                    height: 10px;
                                    border-radius: 99px;
                                    margin-right: 8px;
                                  "
                                  :style="`${
                                    !item.isExpired
                                      ? '  background: #b5df24; border: 1px solid #7da000;'
                                      : 'background: #FF2C2C; border: 1px solid #CF1111;'
                                  }`"
                                ></div>
                                <div class="font-mali-b f12">
                                  {{ !item.isExpired ? "กำลังใช้งาน" : "หมดอายุแล้ว" }}
                                </div>
                              </div>
                            </div>
                            <div
                              class="row items-center justify-between full-width font-mali-m f10"
                            >
                              <div>วันที่ทำรายการ</div>
                              <div>อายุการใช้งาน</div>
                            </div>
                            <div
                              v-for="(levelData, packageIndex) in item.dateBuyingLog"
                              :key="packageIndex"
                              class="row items-center justify-between full-width"
                            >
                              <div class="font-mali-m f12">{{ levelData.date }}</div>
                              <div class="font-mali-b f12">
                                {{ levelData.textExtend }}
                              </div>
                            </div>

                            <div
                              class="row items-center justify-between full-width"
                              :style="`${
                                index == comShowCourseData.length - 1
                                  ? 'margin-bottom: 8px'
                                  : ''
                              }`"
                            >
                              <div class="font-mali-m f12">วันหมดอายุ</div>
                              <div class="font-mali-sb f14">
                                {{ item.expireDateFull }}
                              </div>
                            </div>
                            <div
                              v-if="index != comShowCourseData.length - 1"
                              style="
                                height: 2px;
                                align-self: stretch;
                                background: #caa954;
                                margin-bottom: 12px;
                              "
                            ></div>
                          </div>
                        </q-scroll-area>

                        <div
                          class="absolute-center full-width f14 font-mali-b"
                          style="color: #4a261b"
                          align="center"
                          v-if="comShowCourseData.length == 0"
                        >
                          ยังไม่มีประวัติการทำรายการ
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- <div
                    class="absolute-center full-width"
                    align="center"
                    v-if="!studentStore.history.length"
                  >
                    <div class="fit f20 font-mali-m">ยังไม่มีประวัติการทำรายการ</div>
                    <div style="margin-top: 16px">
                      <q-img
                        width="173px"
                        class="cursor-pointer"
                        src="/images/button_main/button-subscribe.png"
                        @click="funcShowSubscribePackage()"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div> -->

                  <!-- <div v-else>
                    <div
                      class="font-mali-m"
                      v-for="(item, index) in studentStore.history"
                      :key="index"
                    >
                      <div class="f12" style="color: #5e5e5e">
                        <span>{{ `${item.date}` }}</span>
                      </div>
                      <div class="row font-mali-b justify-between">
                        <div class="self-center f16">
                          {{ `แพ็กเกจ ${item.package}` }}
                        </div>
                        <div class="self-center f20">
                          {{ `฿${funcFormatPrice(item.amount)}` }}
                        </div>
                      </div>
                      <div class="q-mb-xs f10">
                        {{ `ผ่าน ${item.paymentType}` }}
                      </div>
                      <div class="q-mt-sm">
                        <q-separator
                          style="height: 2px; background-color: #caa954"
                        ></q-separator>
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-btn round flat v-close-popup>
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Certificate -->
  <!-- <certificate-dialog
    :isDialogCertificate="isShowDialogCertificate"
    :studentStore="studentStore"
    @callback-closeDialog="funcCloseCertificate()"
    v-if="false"
  ></certificate-dialog> -->
  <!-- #endregion -->

  <!-- #region Dialog Confirm Download Certificate -->
  <q-dialog
    v-model="isShowConfirmDownloadCert"
    maximized
    persistent
    class="z-max"
    v-if="false"
  >
    <q-card class="shadow-0 transparent">
      <q-card-section class="fit row justify-center items-center">
        <div class="relative-position">
          <q-img width="300px" src="/images/box_main/box-dialog-default.png">
            <div class="fit transparent row">
              <div class="self-center f20 font-mali-b q-px-lg" align="center">
                <span class="text-title-download"
                  >ต้องการดาว์นโหลด เกียรติบัตรใช่ไหม</span
                >
              </div>
              <div class="col-12 row q-px-md">
                <div class="col-12">
                  <q-img
                    @click="generateReport('th')"
                    class="cursor-pointer"
                    src="/images/button_main/button-thai-version.png"
                  ></q-img>
                </div>
                <div class="col-12">
                  <q-img
                    @click="generateReport('en')"
                    class="cursor-pointer"
                    src="/images/button_main/button-eng-version.png"
                  ></q-img>
                </div>
              </div>
            </div>
          </q-img>
          <div class="absolute-top-right" style="top: -10px; right: -10px">
            <q-btn round flat v-close-popup>
              <q-img
                width="45px"
                src="/images/icon_main/icon-close.png"
                @click="funcCloseCertificate()"
              ></q-img>
            </q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Notify Delete Detail -->
  <q-dialog v-model="isShowDialogNotifyDeleteDetail" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-notify-delete-user relative-position">
          <div class="sub-dialog-notify-delete-user">
            <div class="row justify-center font-mali-b f20">
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
              <div class="self-center q-px-sm">{{ `ลบบัญชีผู้ใช้` }}</div>
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
            </div>

            <div class="dialog-notify-delete-content">
              <div class="font-mali-b f14" align="center">
                {{ `คุณกำลังดำเนินการลบบัญชีผู้ใช้` }}
              </div>
              <div class="dialog-notify-text-content font-mali-m" align="left">
                <div>
                  ข้อกำหนดและเงื่อนไขการลบบัญชีผู้ใช้ บน Winner English ภายใต้บริษัท
                  Edutech Innovation Company Limited โดยคุณยอมรับว่าคุณได้อ่าน
                  เข้าใจและตกลง ตามข้อกำหนดและ เงื่อนไขเหล่านี้
                </div>
                <div style="margin: 8px 0px">
                  - บัญชีผู้ใช้บริการจะถูกลบออกจาก ระบบโดยถาวร รวมไปถึงข้อมูลส่วน
                  บุคคลและเนื้อหาผลิตภัณฑ์ต่างๆ ที่ผู้ใช้ บริการได้ทำการซื้อไว้บน Winner
                  English ก็จะถูกลบออกไปด้วยเช่นกัน
                </div>
                <div style="margin: 8px 0px">
                  - ทางบริษัทขอสงวนสิทธิ์ในการเรียก คืนบัญชีผู้ใช้บริการ หากบัญชีของผู้ใช้
                  บริการถูกลบออกจากระบบแล้วจะไม่ สามารถกู้คืนข้อมูลทั้งบัญชีผู้ใช้บริการ
                  และข้อมูลส่วนบุคคลกลับมาได้
                </div>
              </div>
            </div>

            <div class="f12 font-mali-m row">
              <div class="self-center">
                <q-checkbox
                  v-model="isAgreeDeleteUser"
                  color="brown-9"
                  true-value="yes"
                  false-value="no"
                  dense
                />
              </div>
              <div class="col font-mali-m" style="line-height: 24px; margin-left: 8px">
                ข้าพเจ้าได้อ่าน เข้าใจ และตกลงตาม <br />
                ข้อกำหนดและเงื่อนไขต่างๆ เรียบร้อยแล้ว
              </div>
            </div>

            <div class="box-button-confirm">
              <q-img
                @click="
                  isAgreeDeleteUser == 'no' ? null : funcShowDialogConfirmDeleteUser()
                "
                :src="`/images/button_main/button-confirm${
                  isAgreeDeleteUser == 'yes' ? '' : '-disable'
                }.png`"
                :class="isAgreeDeleteUser == 'yes' ? 'cursor-pointer' : ''"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
          </div>

          <div class="absolute-top-right" style="top: -15px; right: -15px">
            <q-img
              width="45px"
              src="/images/icon_main/icon-close.png"
              no-transition=""
              no-spinner
              class="button-main-active cursor-pointer"
              @click="funcCloseDialogNotifyDeleteDetail()"
            ></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm Delete user -->
  <q-dialog v-model="isShowDialogConfirmDelete" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container-2">
          <div class="sub-dialog-container-2">
            <div class="row justify-center font-mali-b f20">
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
              <div class="self-center q-px-sm">{{ `ยืนยันลบบัญชีผู้ใช้` }}</div>
              <div class="self-center icon-alert">
                <q-icon name="fas fa-exclamation-triangle"></q-icon>
              </div>
            </div>
            <div class="box-dialog-content-2">
              <div align="center" class="font-mali-b f16">
                พิมพ์ <span style="color: #ec001c">ลบบัญชีผู้ใช้</span> เพื่อยืนยัน
              </div>
              <!-- :class="isValidateTextConfirm ? 'input-validate' : ''" -->
              <div class="box-input cursor-pointer relative-position">
                <div class="q-px-sm">
                  <q-input
                    dense
                    borderless
                    input-style="height:28px;"
                    placeholder="พิมพ์ “ลบบัญชีผู้ใช้”"
                    v-model="inputTextConfirm"
                    @change="funcValidateTextConfirm"
                  ></q-input>
                </div>
              </div>
            </div>

            <div class="box-button-delete-user">
              <q-img
                :src="`/images/button_main/button-delete-user-permanent${
                  inputTextConfirm == 'ลบบัญชีผู้ใช้' && !isValidateTextConfirm
                    ? ''
                    : '-disable'
                }.png`"
                no-spinner
                no-transition
                @click="
                  inputTextConfirm == 'ลบบัญชีผู้ใช้' && !isValidateTextConfirm
                    ? funcConfirmDeleteUser()
                    : null
                "
                :class="
                  inputTextConfirm == 'ลบบัญชีผู้ใช้' && !isValidateTextConfirm
                    ? 'cursor-pointer'
                    : ''
                "
              ></q-img>
            </div>

            <div class="box-button-not-now">
              <q-img
                src="/images/button_main/button-not-now.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                @click="closeButton.func()"
                v-close-popup
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Maintenance  -->
  <dialog-maintenance
    v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="isShowDialogMaintenance = false"
  ></dialog-maintenance>
  <!-- #endregion -->
</template>

<script setup>
import characterMain from "components/character_main/character.vue";
// import certificateDialog from "components/dialog_main/ceritificate-pdf.vue";
import dialogMaintenance from "components/dialog_main/dialog-maintenance.vue";

import { computed, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import wordrude from "src/js/wordrude";
import province from "src/js/province.js";
import { useStudentStore } from "src/stores/student";
import { useRoute, useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { useCourseStore } from "src/stores/course";
import { useSchoolStore } from "src/stores/school";
import { usePracticeStore } from "src/stores/practice";

const emit = defineEmits(["callback-closeDialog", "callback-showDialogAgreement"]);

const props = defineProps({
  isTutorial: {
    type: Boolean,
    default: false,
  },
});

const studentStore = useStudentStore();
const courseStore = useCourseStore();
const schoolStore = useSchoolStore();
const practiceStore = usePracticeStore();

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const isMobile = ref($q.platform.is.mobile);
const isShowDialogProfile = ref(true);
const isShowAnimationDialogProfile = ref(true);

const isShowDialogHistoryPayment = ref(false);
const isShowAnimationDialogHistoryPayment = ref(false);

const isSortHistoryPayment = ref(false);
const isShowDialogMaintenance = ref(false);

const historySelected = ref("payment");
const messageError = ref("");
const inputName = ref("");
const selectedMenu = ref("profile");
const selectedProgressTab = ref("progress");
const selectedLevel = ref("");
const isDesktop = ref(true);
const isChangeName = ref(false);
const selectedGender = ref("");
const genderList = ref(["ไม่ระบุ", "ชาย", "หญิง"]);
const selectedProvince = ref("");
const provinceList = ref(province.list);

const menuList = ref([
  {
    name: "profile",
    label: "ข้อมูลผู้เล่น",
    func: (val) => {
      selectedMenu.value = val
    },
  },
  {
    name: "practice",
    label: "สถิติแบบฝึกหัด",
    func: (val) => {

      if(courseStore.courseLevel == '0' || courseStore.courseLevel == 0) return

      selectedMenu.value = val
      return

      const systemStore = useSystemStore();

      // ถ้าเป็นนักเรียนออนไลน์
      if (studentStore.studentType == "online") {
        // ยังไม่ยอมรับเงื่อนไขนโยบายความเป็นส่วนตัว
        // if (!studentStore.isAgreePolicy) {
        //   emit("callback-showDialogAgreement");
        //   return;
        // }

        // ยังไม่เคยเลือกระดับ
        if (!studentStore.studentData.isSelectedLevel) {
          // ยังไม่เคยซื้อแพ็คเกจ
          if (studentStore.history.length == 0) {
            // systemStore.systemData.activeState.isShowDialogPackageMenu = true;
            isShowDialogMaintenance.value = true;

            // emit("callback-closeDialog");
            return;
          }

          // เคยซื้อแพ็คเกจแล้ว
          if (studentStore.history.length > 0) {
            // แพ็คเกจที่ใช้งานอยู่หมดอายุ
            if (studentStore.distanceInDays < 0) {
              // systemStore.systemData.activeState.isShowDialogPackageMenu = true;
              isShowDialogMaintenance.value = true;

              // emit("callback-closeDialog");
              return;
            }

            // แพ็คเกจที่ใช้งานอยู่ยังไม่หมดอายุ
            if (studentStore.distanceInDays >= 0) {
              // ยังไม่เคยทำ placement test
              if (studentStore.placementTestLevel == "") {
                systemStore.systemData.activeState.isShowDialogYourLevel = true;
                emit("callback-closeDialog");
                return;
              } else {
                systemStore.systemData.activeState.isShowDialogUnlockLevel = true;
                emit("callback-closeDialog");
                return;
              }
            }
          }
        }

        // เคยเลือกระดับแล้ว
        // else {
        //   // แพ็คเกจที่ใช้งานอยู่หมดอายุ
        //   if (studentStore.distanceInDays < 0) {
        //     systemStore.systemData.activeState.isShowDialogPackageMenu = true;
        //     emit("callback-closeDialog");
        //     return;
        //   }
        // }
      }

      selectedMenu.value = val;

      if (courseStore.course.profileNotiStatus) {
        courseStore.updateProfileNotiStatus(false);
      }
    },
  },
]);

const editNameButton = ref({
  img: "/images/button_main/button-edit-profile.png",
  imgMobile: "/images/icon_main/icon-edit.png",
  func: () => {
    inputName.value = studentStore.characterName;
    isChangeName.value = true;
    isValidatePhoneNumber.value = false;

    if (studentStore.phoneNumber) {
      inputPhoneNumber.value = studentStore.phoneNumber;
    } else {
      inputPhoneNumber.value = "";
    }

    if (studentStore.province) {
      selectedProvince.value = studentStore.province;
    } else {
      selectedProvince.value = "";
    }

    if (studentStore.gender) {
      selectedGender.value = studentStore.gender;
    } else {
      selectedGender.value = "";
    }
  },
});

const closeButton = ref({
  img: "/images/icon_main/icon-close.png",
  imgDisable: "/images/icon_main/icon-close-disable.png",
  func: () => {
    isShowDialogProfile.value = false;

    setTimeout(() => {
      emit("callback-closeDialog");
    }, 500);
  },
});

const funcCloseDialog = () => {
  isShowAnimationDialogProfile.value = false;

  setTimeout(() => {
    isShowDialogProfile.value = false;
    emit("callback-closeDialog");
  }, 500);
};

const funcEditProfile = () => {
  inputName.value = studentStore.characterName;
  isChangeName.value = true;
  isValidatePhoneNumber.value = false;

  if (studentStore.phoneNumber) {
    inputPhoneNumber.value = studentStore.phoneNumber;
  } else {
    inputPhoneNumber.value = "";
  }

  if (studentStore.province) {
    selectedProvince.value = studentStore.province;
  } else {
    selectedProvince.value = "";
  }

  if (studentStore.gender) {
    selectedGender.value = studentStore.gender;
  } else {
    selectedGender.value = "";
  }
};

const funcShowDialogHistoryPayment = () => {
  // console.log("*** xxx");
  isShowDialogHistoryPayment.value = true;
  isShowAnimationDialogHistoryPayment.value = true;
};

const funcCloseDialogHistoryPayment = () => {
  isShowAnimationDialogHistoryPayment.value = false;

  setTimeout(() => {
    isShowDialogHistoryPayment.value = false;
  }, 500);
};

// #region Check progress score and skill
const isSuccessProgress = ref(false);
const progressHelpData = ref("");
const courseData = ref(null);
const funcCheckProgressScoreAndSkill = (type, level) => {
  selectedProgressTab.value = type;

  let tempShowText = {
    progress: {
      vocabulary: {
        text:
          "คำศัพท์ - ท่องคำศัพท์เพิ่มวันละนิดช่วยให้เรียนรู้และจดจำคำศัพท์ได้ดีขึ้นนะ",
        isHelp: false,
        score: 0,
        index: 0,
      },
      grammar: {
        text:
          "ไวยากรณ์ - ฝึกทำแบบฝึกหัดไวยากรณ์ช่วยให้จำโครงสร้างและวิธีการใช้ในประโยคได้เพิ่มขึ้น",
        isHelp: false,
        score: 0,
        index: 1,
      },
      reading: {
        text:
          "การอ่าน - มาอ่านกันเถอะ ช่วยเพิ่มคลังคำศัพท์ แถมเข้าใจประโยคได้มากขึ้นด้วย",
        isHelp: false,
        score: 0,
        index: 2,
      },
      writing: {
        text:
          "การเขียน - การเขียนไม่ยากอย่างที่คิด ฝึกทำบ่อยๆ ทำความเข้าใจคำศัพท์ กับโครงสร้างประโยคแล้วยังได้เหรียญทองเยอะเลยนะ",
        isHelp: false,
        score: 0,
        index: 3,
      },
      phonics: {
        text:
          "การออกเสียง - ฝึกออกเสียง(หน่อยสิ~ ) ช่วยให้พูดและฟังภาษาอังกฤษได้ชัดขึ้นนะ",
        isHelp: false,
        score: 0,
        index: 4,
      },
      listening: {
        text:
          "การฟังและพูด - ฝึกสนทนาผ่านการฟังและพูด ออกเสียงเป๊ะแบบเจ้าของภาษาด้วยแบบฝึกหัดการอัดเสียง",
        isHelp: false,
        score: 0,
        index: 5,
      },
    },
    score: {
      vocabulary: {
        text:
          "คำศัพท์ - ฝึกสะกดคำและทบทวนคำศัพท์ที่เรียนมา เพื่อช่วยให้จดจำคำศัพท์ได้ดีขึ้น",
        isHelp: false,
        score: 0,
        index: 0,
      },
      grammar: {
        text: "ไวยากรณ์ - ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ",
        isHelp: false,
        score: 0,
        index: 1,
      },
      reading: {
        text:
          "การอ่าน - ฝึกอ่านจับประเด็นสำคัญและทบทวนคำศัพท์ด้วย จะช่วยให้เข้าใจเนื้อเรื่องมากยิ่งขึ้น",
        isHelp: false,
        score: 0,
        index: 2,
      },
      writing: {
        text: "แต่งประโยค - ทบทวนโครงสร้างของประโยคและลักษณะการใช้งานในแต่ละสถานการณ",
        isHelp: false,
        score: 0,
        index: 3,
      },
      phonics: {
        text:
          "การออกเสียง - ตั้งใจฟังและออกเสียงตามซ้ำๆจนเกิดความคุ้นเคย จะช่วยให้รับรู้เสียงที่ได้ยินง่ายขึ้น",
        isHelp: false,
        score: 0,
        index: 4,
      },
      listening: {
        text: "ฟังและพูด - จับใจความสำคัญของบทสนทนาที่เกิดขึ้น รวมถึงฝึกการสนทนาบ่อยๆ",
        isHelp: false,
        score: 0,
        index: 5,
      },
    },
  };

  if (selectedLevel.value == "") {
    selectedLevel.value = courseStore.courseLevel;
  } else {
    selectedLevel.value = level;
  }

  courseData.value = courseStore.courseList.data.find(
    (x) => x.level == selectedLevel.value
  );

  let tempData = {
    progress: [],
    score: [],
  };

  let tempProgress = {
    vocabulary: 0,
    grammar: 0,
    reading: 0,
    writing: 0,
    phonics: 0,
    listening: 0,
  };

  if (type == "progress") {
    tempProgress = courseData.value.skillProgress;
  } else {
    tempProgress = courseData.value.scoreAVG;
  }

  for (const key in tempProgress) {
    if (Number(tempProgress[key]) < 60 && key == "vocabulary") {
      tempShowText[type][key].isHelp = true;
    } else if (Number(tempProgress[key]) < 60 && key == "grammar") {
      tempShowText[type][key].isHelp = true;
    } else if (Number(tempProgress[key]) < 60 && key == "reading") {
      tempShowText[type][key].isHelp = true;
    } else if (Number(tempProgress[key]) < 60 && key == "writing") {
      tempShowText[type][key].isHelp = true;
    } else if (Number(tempProgress[key]) < 60 && key == "phonics") {
      tempShowText[type][key].isHelp = true;
    } else if (Number(tempProgress[key]) < 60 && key == "listening") {
      tempShowText[type][key].isHelp = true;
    }

    tempShowText[type][key].score = Number(tempProgress[key]);

    tempData[type].push({
      ...tempShowText[type][key],
      skill: key,
    });
  }

  tempData[type].sort((a, b) => a.index - b.index);

  progressHelpData.value = tempData;

  isSuccessProgress.value = tempData[type].every((x) => !x.isHelp);
};
// #endregion

// #region Display Progress Number
const displayNumber = (progress) => {
  if (progress) {
    if (Number(progress > 100)) {
      return "100";
    } else {
      return Math.round(Number(progress)).toFixed(0) || 0;
    }
  } else {
    return 0;
  }
};
// #endregion

// #region Check Character Name
const listOfBadWord = ref(wordrude.list);
const isValidateName = ref(false);
const checkCharacterName = () => {
  console.clear();

  if (inputName.value == "" || inputName.value.length < 3) return false;

  let isBadWord = false;

  for (let i = 0; i < listOfBadWord.value.length; i++) {
    let findBadWord = inputName.value.match(listOfBadWord.value[i]);

    if (findBadWord) {
      isBadWord = true;
      break;
    }
  }

  isValidateName.value = isBadWord;
};
// #endregion

// #region Show Certificate
const isShowDialogCertificate = ref(false);
const isShowConfirmDownloadCert = ref(false);
const funcShowCertificate = () => {
  // if (!props.studentStore.student.data.isUpdateCertName) {
  //   isShowDialogCertificate.value = true;
  // } else {
  //   isShowConfirmDownloadCert.value = true;
  // }

  isShowDialogProfile.value = false;

  router.push("/certificate");
};
// #endregion

// #region Generate Report
const generateReport = (type) => {
  window.open(
    `${window.location.origin}/#/certificate/${type}`,
    "__blank",
    "width=5,height=5"
  );

  isShowConfirmDownloadCert.value = false;
  isShowDialogProfile.value = true;
};
// #endregion

// #region Format Price
const funcFormatPrice = (price) => {
  console.clear()
  console.log(price)
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
// #endregion

// #region Sort History Payment
const funcSortHistory = () => {
  const studentStore = useStudentStore();

  studentStore.student.isSortHistory = !studentStore.student.isSortHistory;
};
// #endregion

// #region Close Dialog Certificate
const funcCloseCertificate = () => {
  isShowDialogCertificate.value = false;
  isShowConfirmDownloadCert.value = false;
  isShowDialogProfile.value = true;
};
// #endregion

// #region Birth Date
const dayList = ref([]);
const selectDay = ref("");

const monthList = ref([
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
]);
const selectMonth = ref("");

const yearList = ref([]);
const selectYear = ref("");

const funcSelectMonth = (item, index) => {
  selectMonth.value = index + 1;
};

const showMonthName = computed(() => {
  let findMonth = monthList.value[selectMonth.value - 1];

  if (findMonth) {
    return findMonth;
  }

  return null;
});

const funcSetDataBirthDate = async () => {
  $q.loading.show();
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  let response = await systemStore.getServerTime();

  if (response.message != "success") {
    throw new Error("Cannot get server time");
  }

  let year = response.data.year + 543;

  let setCurrentYear = year - 100;

  let startYear = setCurrentYear;
  for (let i = 0; i < 100; i++) {
    startYear++;
    if (startYear <= year) {
      yearList.value.push(startYear);
    }
  }

  for (let i = 1; i <= 31; i++) {
    dayList.value.push(i);
  }

  if (studentStore.birthDate != "-") {
    selectDay.value = studentStore.studentData.birthDate.day;
    selectMonth.value = studentStore.studentData.birthDate.month;
    selectYear.value = studentStore.studentData.birthDate.year;
  }

  $q.loading.hide();
};
// #endregion

// #region Save Student Data
let setErrorTime = null;
const funcSaveStudentData = async () => {
  const studentStore = useStudentStore();

  if (setErrorTime) {
    clearTimeout(setErrorTime);
  }

  if (inputName.value == "") {
    $q.notify({
      message: "กรุณาระบุชื่อตัวละคร",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
    return;
  }

  if (isValidatePhoneNumber.value) {
    if (inputPhoneNumber.value.length >= 1 && inputPhoneNumber.value.length < 10) {
      $q.notify({
        message: "กรุณาใส่เบอร์โทรศัพท์ให้ครบ 10 หลัก",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
      return;
    }

    $q.notify({
      message: "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
    return;
  }

  $q.loading.show({
    message: "กำลังบันทึกข้อมูล",
  });

  let birthDate = {
    day: "",
    month: "",
    year: "",
  };

  if (selectDay.value || selectMonth.value || selectYear.value) {
    birthDate.day = selectDay.value;
    birthDate.month = selectMonth.value;
    birthDate.year = selectYear.value;
  }

  try {
    const response = await studentStore.saveCharacterName(
      inputName.value,
      selectedGender.value,
      selectedProvince.value,
      birthDate,
      inputPhoneNumber.value
    );

    if (response != "success") {
      throw new Error("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }

    $q.loading.show({
      message: "บันทึกข้อมูลสำเร็จ",
    });

    setTimeout(() => {
      $q.loading.hide();

      isChangeName.value = false;
      inputName.value = "";
    }, 1500);
  } catch (e) {
    $q.loading.hide();

    setErrorTime = setTimeout(() => {
      $q.notify({
        message: e.message,
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }, 1000);
  }
};
// #endregion

// #region Reset Form Data
const funcResetformData = () => {
  const studentStore = useStudentStore();

  if (studentStore.birthDate == "-") {
    selectDay.value = "";
    selectMonth.value = "";
    selectYear.value = "";
  }

  isChangeName.value = false;
};
// #endregion

// #region Dialog Delete User
const isShowDialogNotifyDeleteDetail = ref(false);
const isAgreeDeleteUser = ref("no");
const funcShowDialogDeleteUser = () => {
  isShowDialogProfile.value = false;

  isShowDialogNotifyDeleteDetail.value = true;
};
// #endregion

// #region Dialog Confirm Delete User
const isShowDialogConfirmDelete = ref(false);
const funcShowDialogConfirmDeleteUser = () => {
  isShowDialogNotifyDeleteDetail.value = false;
  isShowDialogConfirmDelete.value = true;
};
// #endregion

// #region Validate Text Confirm
const isValidateTextConfirm = ref(false);
const inputTextConfirm = ref("");
const funcValidateTextConfirm = (val) => {
  if (val != "ลบบัญชีผู้ใช้" || val == "") {
    isValidateTextConfirm.value = true;
  } else {
    isValidateTextConfirm.value = false;
  }
};
// #endregion

// #region Confirm Delete User
const funcConfirmDeleteUser = async () => {
  const studentStore = useStudentStore();

  if (inputTextConfirm.value == "ลบบัญชีผู้ใช้") {
    try {
      $q.loading.show({
        message: "กำลังลบบัญชีผู้ใช้",
      });

      isShowDialogConfirmDelete.value = false;

      const response = await studentStore.deleteAccount();

      if (response != "success") {
        throw new Error("เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้");
      }

      $q.sessionStorage.set("isDeleteUser", true);

      $q.loading.hide();

      router.push("/");
    } catch (e) {
      $q.loading.hide();

      $q.notify({
        message: "เกิดข้อผิดพลาดในการลบบัญชีผู้ใช้",
        color: "negative",
        position: "top",
        timeout: 2000,
      });
    }
  } else {
    isValidateTextConfirm.value = true;
  }
};
// #endregion

// #region Format Phone Number
const inputPhoneNumber = ref("");
const isValidatePhoneNumber = ref(false);
const funcFormatPhoneNumber = (val) => {
  const phoneNumberRegex = /(^[0]{1}[1-9]{1}[0-9]{8}$)/;

  if (val.length == 0) {
    isValidatePhoneNumber.value = false;
    return;
  }

  const isValid = phoneNumberRegex.test(val);

  if (val.length >= 1 && val.length < 10) {
    isValidatePhoneNumber.value = true;
    return;
  }

  if (!isValid) {
    isValidatePhoneNumber.value = true;
    return;
  }

  isValidatePhoneNumber.value = false;
};
// #endregion

// #region Show phone number
const showPhoneNumber = computed(() => {
  if (studentStore.phoneNumber) {
    let phoneNumber = `${studentStore.phoneNumber.slice(
      0,
      3
    )}-${studentStore.phoneNumber.slice(3, 6)}-${studentStore.phoneNumber.slice(6, 10)}`;

    return phoneNumber;
  } else {
    return "-";
  }
});
// #endregion

// #region Show Subcribe Package
const funcShowSubscribePackage = () => {
  const systemStore = useSystemStore();
  // systemStore.systemData.activeState.isShowDialogPackageMenu = true;
  // isShowDialogMaintenance.value = true;

  isShowDialogHistoryPayment.value = false;
  emit("callback-closeDialog");
};
// #endregion

// #region Close Dialog Notify Delete Detail
const funcCloseDialogNotifyDeleteDetail = () => {
  isShowDialogNotifyDeleteDetail.value = false;
  emit("callback-closeDialog");
};
// #endregion

const isDropdownSortHistory = ref(false);
const openDropdownSortHistory = () => {
  isDropdownSortHistory.value = !isDropdownSortHistory.value;
};

const thumbHistoryPaymentStyle = ref({
  width: "6px",
  height: "44px",
  background: "#4A261B",
  borderRadius: "99px",
  margin: "0px 4px 0px 0px",
  opacity: 1,
});

// #region Computed
const showSortSelectedBy = ref("last");
const comShowHistoryData = computed(() => {
  let tempData = [];

  if (studentStore.history.length > 0) {
    tempData = studentStore.history;

    tempData.sort((a, b) => {
      if (showSortSelectedBy.value == "last") {
        return new Date(b.purchaseDate) - new Date(a.purchaseDate);
      } else {
        return new Date(a.purchaseDate) - new Date(b.purchaseDate);
      }
    });
  }

  return tempData;
});

const comShowCourseData = computed(() => {
  let tempData = [];

  if (courseStore.list.length > 0) {
    tempData = courseStore.list;

    tempData = tempData.filter((x) => x.level != "0");

    let tempHistory = studentStore.history;

    tempHistory = tempHistory.map((x) => {
      return {
        courseList: x.courseList,
        startDate: x.date,
        extends: x.extends,
        purchaseDate: x.purchaseDate,
      };
    });

    tempData = tempData.map((res) => {
      let newData = {
        dateBuyingLog: [],
        ...res,
      };

      for (let i = 0; i < tempHistory.length; i++) {
        let history = tempHistory[i];

        let findHistory = history.courseList.find((x) => x.level == res.level);

        if (findHistory) {
          let sumExtends = 0;

          if (history.extends == 24) {
            sumExtends = `+ 2 ปี`;
          } else if (history.extends == 18) {
            sumExtends = `+ 1 ปี 6 เดือน`;
          } else if (history.extends == 12) {
            sumExtends = `+ 1 ปี`;
          } else {
            sumExtends = `+ 6 เดือน`;
          }

          newData.dateBuyingLog.push({
            date: history.startDate,
            textExtend: sumExtends,
            purchaseDate: history.purchaseDate,
          });
        }

        newData.dateBuyingLog.sort((a, b) => {
          if (showSortSelectedBy.value == "last") {
            return new Date(b.purchaseDate) - new Date(a.purchaseDate);
          } else {
            return new Date(a.purchaseDate) - new Date(b.purchaseDate);
          }
        });
      }

      return newData;
    });
  }

  return tempData;
});

// #endregion

onMounted(async () => {
  if ($q.platform.is.desktop) {
    isDesktop.value = true;
  } else {
    isDesktop.value = false;
  }

  selectedLevel.value = "";
  funcCheckProgressScoreAndSkill("progress", courseStore.courseLevel);

  if (props.isTutorial) {
    selectedMenu.value = "practice";
  } else {
    await funcSetDataBirthDate();
  }
});
</script>

<style lang="scss" scoped>
// #region Box

.box-dialog-profile-container {
  width: 100%;
  height: 100%;
  // z-index: 1;

  & .box-dialog-profile {
    width: 100%;
    height: 100%;
    padding: clamp(5px, 0.5cqw, 8px);
    border-radius: clamp(12.5px, 1.25cqw, 20px);
    border: clamp(1.875px, 0.1875cqw, 3px) solid #4a261b;
    background: #f2c043;
    box-shadow: 0px 0px clamp(2.5px, 0.25cqw, 4px) 0px rgba(0, 0, 0, 0.25);

    & .box-menu-profile {
      width: 100%;

      & .box-button-menu {
        position: relative;
        width: 16.36%;
        border-radius: clamp(6.875px, 0.6875cqw, 11px) clamp(6.875px, 0.6875cqw, 11px) 0px
          0px;
        background-color: #f6f3d3;
        border: clamp(0.625px, 0.0625cqw, 1px) solid #4a261b;
        color: #4a261b;
        padding: clamp(8.75px, 0.875cqw, 14px) 0px;
        font-size: clamp(12.5px, 1.25cqw, 20px);
        cursor: pointer;

        &.disabled {
          cursor: not-allowed;
        }

        & .icon-noti {
          top: -1%;
          right: -1%;
          background-color: #ff2c2c;
          border-radius: 50%;
          color: #fff;
          padding: clamp(3.75px, 0.375cqw, 6px);
        }

        &.selected {
          color: #4a261b;
          border: clamp(0.625px, 0.0625cqw, 1px) solid #f6f3d3;
          background-color: #f6f3d3;
        }

        & .sub-button-menu {
          position: absolute;
          width: 100%;
          height: 95%;
          bottom: 0%;
          left: 0%;
          background-color: #efd080;
          border-radius: 30% clamp(6.25px, 0.625cqw, 10px) 0px 0px;
        }
      }
    }

    & .sub-dialog-profile {
      width: 100%;
      height: 90%;
      padding: clamp(18.125px, 1.8125cqw, 29px) clamp(20px, 2cqw, 32px)
        clamp(21.875px, 2.1875cqw, 35px);
      border-radius: 0px clamp(6.875px, 0.6875cqw, 11px) clamp(6.875px, 0.6875cqw, 11px)
        clamp(6.875px, 0.6875cqw, 11px);
      background: #f6f3d3;
      box-shadow: 0px 0px clamp(2.5px, 0.25cqw, 4px) 0px rgba(0, 0, 0, 0.25);

      & .box-profile-character {
        position: relative;
        width: 30%;
        background-size: cover;
        background-position: 95% 0%;
        border-radius: clamp(6.25px, 0.625cqw, 10px);
        background-image: url("/images/background_main/background-lobby-default.png");
        // overflow: hidden;

        & .box-level-student {
          width: 43.768%;
          top: 7%;
          font-size: clamp(22.5px, 2.25cqw, 36px);
          color: #fff;

          &.mobile {
            font-size: 17px;
          }

          & .text-shadow-level {
            color: transparent;
            // font-size: clamp(31.25px, 3.125vw, 50px);
            text-shadow: #2b2b2b 3px 0px 0px, #2b2b2b 2.83487px 0.981584px 0px,
              #2b2b2b 2.35766px 1.85511px 0px, #2b2b2b 1.62091px 2.52441px 0px,
              #2b2b2b 0.705713px 2.91581px 0px, #2b2b2b -0.287171px 2.98622px 0px,
              #2b2b2b -1.24844px 2.72789px 0px, #2b2b2b -2.07227px 2.16926px 0px,
              #2b2b2b -2.66798px 1.37182px 0px, #2b2b2b -2.96998px 0.42336px 0px,
              #2b2b2b -2.94502px -0.571704px 0px, #2b2b2b -2.59586px -1.50383px 0px,
              #2b2b2b -1.96093px -2.27041px 0px, #2b2b2b -1.11013px -2.78704px 0px,
              #2b2b2b -0.137119px -2.99686px 0px, #2b2b2b 0.850987px -2.87677px 0px,
              #2b2b2b 1.74541px -2.43999px 0px, #2b2b2b 2.44769px -1.73459px 0px,
              #2b2b2b 2.88051px -0.838247px 0px;
            letter-spacing: 0px;
          }

          & .normal-level {
            text-shadow: #2b2b2b 3px 0px 0px, #2b2b2b 2.83487px 0.981584px 0px,
              #2b2b2b 2.35766px 1.85511px 0px, #2b2b2b 1.62091px 2.52441px 0px,
              #2b2b2b 0.705713px 2.91581px 0px, #2b2b2b -0.287171px 2.98622px 0px,
              #2b2b2b -1.24844px 2.72789px 0px, #2b2b2b -2.07227px 2.16926px 0px,
              #2b2b2b -2.66798px 1.37182px 0px, #2b2b2b -2.96998px 0.42336px 0px,
              #2b2b2b -2.94502px -0.571704px 0px, #2b2b2b -2.59586px -1.50383px 0px,
              #2b2b2b -1.96093px -2.27041px 0px, #2b2b2b -1.11013px -2.78704px 0px,
              #2b2b2b -0.137119px -2.99686px 0px, #2b2b2b 0.850987px -2.87677px 0px,
              #2b2b2b 1.74541px -2.43999px 0px, #2b2b2b 2.44769px -1.73459px 0px,
              #2b2b2b 2.88051px -0.838247px 0px;
          }

          & .high-level {
            // color: transparent;
            background: linear-gradient(
              180deg,
              #ffc42c 45%,
              #fff 30%,
              #ffc42c 55%,
              #ff7a00 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }

      & .box-profile-details {
        width: 66.4988%;
        height: 100%;
        border-radius: clamp(6.25px, 0.625cqw, 10px);
        background: #efd080;
        box-shadow: 0px 0px clamp(2.5px, 0.25cqw, 4px) 0px rgba(0, 0, 0, 0.25);
        margin-left: 3.5012%;
        border: clamp(1.25px, 0.125cqw, 2px) solid #4a261b;
        overflow: hidden;

        & .header-profile-details {
          max-height: 50px;
          background: #4a261b;
          padding: clamp(5px, 0.5cqw, 8px) clamp(10px, 1cqw, 16px);
          font-size: clamp(12.5px, 1.25cqw, 20px);
          border-bottom: clamp(1.25px, 0.125cqw, 2px) solid #4a261b;
          color: #fff;

          & .box-input-main {
            width: 50%;
            max-height: 35px;
            background-color: #fff;
            border-radius: clamp(6.25px, 0.625cqw, 10px);
            border: 1px solid #4a261b;
            overflow: hidden;
            padding: 0px clamp(5px, 0.5cqw, 8px);
            color: #000;

            &.validate {
              border: 1px solid #ff2c2c;
            }

            & .outline {
              width: 85%;
              background-color: transparent;
              border: 0px solid;
              outline: none;
              margin: clamp(1.875px, 0.1875cqw, 3px) 0px 0px 0px;
              font-size: clamp(12.5px, 1.25cqw, 20px);
              overflow: hidden;
            }

            & .icon-alert {
              top: 0%;
              right: 3%;
              // color: #ff2c2c;
            }

            & .text-input {
              padding: 0px;
            }

            &.change-name {
              width: 50%;
            }
          }

          & .button-cancel-profile {
            width: 6.123%;
            cursor: pointer;
          }

          & .button-save-profile {
            width: 6.123%;
            margin-left: clamp(10px, 1cqw, 16px);
            cursor: pointer;
          }

          & .button-edit-profile {
            width: 19.24%;
            cursor: pointer;

            &.disable {
              cursor: default;
            }
          }
        }

        & .content-profile-details {
          width: 100%;
          height: 89%;
          padding: 0px clamp(15px, 1.5cqw, 24px);
          font-size: clamp(10px, 1cqw, 16px);
          color: #4a261b;

          & .box-student-details {
            margin-top: clamp(7.5px, 0.75cqw, 12px);

            &.space {
              width: 40%;
            }

            & .icon-circle {
              padding: clamp(3.75px, 0.375cqw, 6px);
              border-radius: 50%;
              background-color: #4a261b;
              line-height: 0;
            }

            & .text-header-details {
              margin-left: clamp(5px, 0.5cqw, 8px);
            }

            & .box-content-details {
              padding-left: clamp(12.5px, 1.25cqw, 20px);
              margin-top: clamp(1.25px, 0.125cqw, 2px);
              line-height: clamp(18.125px, 1.8125cqw,29px);
            }

            & .button-delete-student {
              width: fit-content;
              color: #ff2c2c;
              border: clamp(0.625px, 0.0625cqw, 1px) solid #ff2c2c;
              border-radius: clamp(6.25px, 0.625cqw, 10px);
              padding: clamp(2.5px, 0.25cqw, 4px) clamp(10px, 1cqw, 16px);
              align-items: center;
              font-size: clamp(7.5px, 0.75cqw, 12px);
              cursor: pointer;
              margin: auto;

              &.disable {
                border: clamp(0.625px, 0.0625cqw, 1px) solid #a2a2a2;
                color: #a2a2a2;
                cursor: default;
              }
            }

            & .input-main {
              width: 70%;
              max-height: 30px;
              background-color: #fff;
              border-radius: clamp(6.25px, 0.625cqw, 10px);
              border: 1px solid #4a261b;
              overflow: hidden;
              padding: 0px clamp(5px, 0.5cqw, 8px);
              font-size: clamp(8.75px, 0.875cqw, 14px);
              margin-top: clamp(1.25px, 0.125cqw, 2px);
              color: #000;
            }

            & .button-selected {
              position: relative;
              max-height: 30px;
              width: 70%;
              border-radius: clamp(6.25px, 0.625cqw, 10px);
              border: 1px solid #4a261b;
              background: #fff;
              padding: clamp(2.5px, 0.25cqw, 4px) clamp(6.875px, 0.6875cqw, 11px)
                clamp(3.125px, 0.3125cqw, 5px);
              margin-top: clamp(1.25px, 0.125cqw, 2px);
              font-size: clamp(8.75px, 0.875cqw, 14px);
              cursor: pointer;

              &.day {
                width: 20%;
              }

              &.month {
                width: 35%;
                margin-left: clamp(5px, 0.5cqw, 8px);
                margin-right: clamp(5px, 0.5cqw, 8px);
              }

              &.year {
                width: 25%;
              }

              &.province {
                width: 50%;
              }

              & .text-select {
                color: #4a261b;
                margin-top: -2px;
                line-height: clamp(15px, 1.5cqw, 24px);
              }

              & .text-hint {
                color: #939393;
                margin-top: -2px;
                line-height: clamp(15px, 1.5cqw, 24px);
              }

              & .icon-arrow {
                top: -5%;
                right: 5%;
              }
            }
          }

          & .button-history-payment {
            max-width:135px;
            width: 24.2897%;
            margin-top: clamp(10px, 1cqw, 16px);
          }
        }
      }

      & .box-practice-details {
        width: 66.4988%;
        height: 100%;
        padding-top: clamp(10px, 1cqw, 16px);

        & .button-certificate {
          width: 22.212%;
          margin-right: clamp(5px, 0.5cqw, 8px);
          cursor: pointer;
        }

        & .button-course-level {
          width: 19%;
          border-radius: clamp(7.5px, 0.75cqw, 10px);
          border: 2px solid #4a261b;
          background: #db8200;
          padding: clamp(5px, 0.5cqw, 8px);
          cursor: pointer;
          color: #4a261b;

          &::after {
            content: "";
            position: absolute;
            top: 10%;
            left: 3%;
            width: 10%;
            padding: clamp(1.25px, 0.125cqw, 2px);
            background-color: #fff;
            border-radius: clamp(12.5px, 1.25cqw, 20px);
            transform: rotate(-15deg) skewX(-15deg);
            z-index: 0;
          }

          &::before {
            content: "";
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 95%;
            border-radius: 8px;
            background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
            z-index: 0;
          }

          & .text-course-level {
            position: relative;
            color: #4a261b;
            margin-top: clamp(1.25px, 0.125cqw, 2px);
            font-size: clamp(10px, 1cqw, 16px);
            z-index: 1;
          }

          & .icon-arrow {
            top: 15%;
            right: 5%;
            font-size: clamp(10px, 1cqw, 16px);
            color: #4a261b;
            z-index: 1;
          }
        }

        & .box-practice-progress-details {
          width: 100%;
          height: 100%;
          margin-top: clamp(5px, 0.5cqw, 8px);

          & .box-progress-left {
            width: 52.65%;
            height: 100%;
            margin-right: 1.317%;

            & .progress-average {
              height: 29.535%;
              border-radius: clamp(6.875px, 0.6875cqw, 11px);
              border: clamp(1.2px, 0.125cqw, 2px) solid #4a261b;
              background: #efd080;
              color: #4a261b;
              font-size: clamp(12.5px, 1.25cqw, 20px);
              padding: clamp(5px, 0.5cqw, 8px) clamp(6.25px, 0.625cqw, 10px);

              & .text-average {
                font-size: clamp(22.5px, 2.25cqw, 36px);
              }

              &.score {
                height: 18.175%;
                margin-top: clamp(5px, 0.5cqw, 8px);

                & .text-average-score {
                  font-size: clamp(8.75px, 0.875cqw, 14px);
                  margin-bottom: clamp(1.25px, 0.125cqw, 2px);
                  margin-left: clamp(5px, 0.5cqw, 8px);
                }

                & .progress {
                  position: relative;
                  border-radius: clamp(12.5px, 1.25cqw, 20px);
                  padding: clamp(3.125px, 0.3125cqw, 5px) 0px;
                  margin: clamp(6.25px, 0.625cqw, 10px) 0px;
                }

                & .progress-bar {
                  width: 100%;
                  height: 100%;
                  border-radius: clamp(12.5px, 1.25cqw, 20px);
                }

                & .progress-success {
                  background-image: linear-gradient(#7ac11a 15%, #629919, #3c5e11);
                }
                & .progress-warning {
                  background-image: linear-gradient(#ffa800 15%, #ffc34f, #cb8e19);
                }
                & .progress-failed {
                  background-image: linear-gradient(#ed3c24 15%, #f86e5b, #be2914);
                }
              }

              &.recommend {
                height: 35.215%;
                margin-top: clamp(5px, 0.5cqw, 8px);
                overflow: auto;

                & .text-recommend {
                  font-size: clamp(10px, 1cqw, 16px);
                  margin-top: clamp(5px, 0.5cqw, 8px);
                  line-height: clamp(16.25px, 1.625cqw, 26px);
                }

                &::-webkit-scrollbar {
                  width: clamp(3.125px, 0.3125cqw, 5px);
                }

                &::-webkit-scrollbar-thumb {
                  background-color: #4a261b;
                  border-radius: clamp(12.5px, 1.25cqw, 20px);
                }

                &::-webkit-scrollbar-track {
                  background-color: transparent;
                }
              }
            }
          }

          & .box-progress-right {
            width: 46.033%;
            height: 100%;

            & .button-skill-menu {
              position: relative;
              width: 50%;
              border-radius: 11px 11px 0px 0px;
              border: clamp(2px) solid #4a261b;
              background: rgba(50, 50, 50, 0.5);
              padding: clamp(7.5px, 0.75cqw, 12px) 0px;
              color: #ffffff;
              font-size: clamp(12.5px, 1.25cqw, 20px);
              cursor: pointer;

              &:not(.active)::before {
                content: "";
                position: absolute;
                bottom: 0%;
                left: 0%;
                width: 100%;
                height: 95%;
                background-color: #4a261b;
                border-radius: clamp(10px, 1cqw, 16px) 25% 0px 0px;
                z-index: 0;
              }

              & .text-menu {
                position: relative;
                z-index: 1;
              }

              &.active {
                background: #efd080;
                border: 2px solid #4a261b;
                border-bottom: transparent;
                color: #4a261b;
              }
            }

            & .progress-skill {
              height: 73.5%;
              border-radius: 0px 0px clamp(6.875px, 0.6875cqw, 11px)
                clamp(6.875px, 0.6875cqw, 11px);
              border: clamp(1.2px, 0.125cqw, 2px) solid #4a261b;
              border-top: transparent;
              background: #efd080;
              color: #4a261b;
              font-size: clamp(10px, 1cqw, 16px);
              padding: clamp(7.5px, 0.75cqw, 12px);

              & .text-skill-header {
                margin-bottom: clamp(2.5px, 0.25cqw, 4px);
              }

              & .text-average-score {
                font-size: clamp(8.75px, 0.875cqw, 14px);
                // margin-bottom: 5px;
                margin-left: clamp(5px, 0.5cqw, 8px);
              }

              & .progress {
                height: 10%;
                position: relative;
                border-radius: clamp(12.5px, 1.25cqw, 20px);
                padding: clamp(3.125px, 0.3125cqw, 5px) 0px;
                // margin: clamp(3.125px, 0.3125vw, 5px) 0px;
              }

              & .progress-bar {
                width: 100%;
                height: 100%;
                border-radius: clamp(12.5px, 1.25cqw, 20px);
              }

              & .progress-success {
                background-image: linear-gradient(#7ac11a 15%, #629919, #3c5e11);
              }
              & .progress-warning {
                background-image: linear-gradient(#ffa800 15%, #ffc34f, #cb8e19);
              }
              & .progress-failed {
                background-image: linear-gradient(#ed3c24 15%, #f86e5b, #be2914);
              }
            }
          }
        }
      }
    }

    & .box-button-close {
      top: -3%;
      right: -1.5%;
      width: 4.7%;
      cursor: pointer;
      z-index: 5;

      &.disable {
        cursor: default;
      }
    }
  }
}

.progress-mobile{
  height: 10px;
  position: relative;
  border-radius: 20px;
  // padding: 5px 0px;

  & .progress-bar-mobile {
      width: 100%;
      height: 100%;
      border-radius: 20px;

      &.success {
        background-image: linear-gradient(#7ac11a 15%, #629919, #3c5e11);
      }
      &.warning {
        background-image: linear-gradient(#ffa800 15%, #ffc34f, #cb8e19);
      }
      &.failed {
        background-image: linear-gradient(#ed3c24 15%, #f86e5b, #be2914);
      }

    }


}

.box-dialog-history-container {
  width: 34%;
  height: 82.003%;
  z-index: 1;

  &.mobile{
    width:320px;
    height:540px;
  }

  & .box-dialog-history {
    width: 100%;
    height: 100%;
    border-radius: clamp(6.25px, 0.625cqw, 10px);
    padding: clamp(5px, 0.5cqw, 8px);
    border: clamp(1.25px, 0.125cqw, 2px) solid #4a261b;
    background: #f2c043;
    box-shadow: 0px 0px clamp(2.5px, 0.25cqw, 4px) 0px rgba(0, 0, 0, 0.25);

    &.mobile{
      border-radius:10px;
      padding:8px;
      border:2px solid #4a261b;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    }

    & .sub-dialog-history {
      width: 100%;
      height: 100%;
      border-radius: clamp(6.25px, 0.625cqw, 10px);
      background: #ffedc4;
      box-shadow: 0px 0px clamp(2.5px, 0.25cqw, 4px) 0px rgba(0, 0, 0, 0.25);
      padding:clamp(15px,1.5cqw,24px) clamp(7.5px, 0.75cqw, 12px) clamp(7.5px, 0.75cqw, 12px);
      color: #4a261b;

      &.mobile{
        border-radius: 10px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
        padding:24px 12px 12px;
      }

      & .text-header-history {
        font-size: clamp(12.5px, 1.25cqw, 20px);
        margin: 0px 0px clamp(7.5px, 0.75cqw, 12px);

        &.mobile{
          font-size:20px;
          margin: 0px 0px 12px;
        }
      }

      & .box-history-menu{
        margin-top:clamp(7.5px, 0.75cqw, 12px);
        font-size: clamp(8.75px,0.875cqw,14px);

        &.mobile{
          margin-top:12px;
          font-size:14px;
        }

        & .button-history-menu{
          border-radius: clamp(6.25px, 0.625cqw, 10px) clamp(6.25px, 0.625cqw, 10px) 0px 0px;
          padding: clamp(7.5px, 0.75cqw, 12px);
          width: fit-content;
          background-color:#fff;

          &.mobile{
            border-radius: 10px 10px 0px 0px;
            padding: 12px;
          }

          &.active{
            background-color: #efd080;
          }
        }
      }

      & .box-history-details {
        width: 100%;
        height: 80%;
        border-radius: 0px clamp(6.25px, 0.625cqw, 10px) clamp(6.25px, 0.625cqw, 10px) clamp(6.25px, 0.625cqw, 10px);
        background: #efd080;

        &.mobile{
          border-radius: 0px 10px 10px 10px;
        }

        & .box-sort-history {
          padding: clamp(5px,0.5cqw,8px) clamp(7.5px,0.75cqw,12px) clamp(2.5px, 0.25cqw, 4px) clamp(7.5px,0.75cqw,12px);

          &.mobile{
            padding: 8px 12px 4px 12px;
          }

          & .box-dropdown-sort-history{
            width:29.415%;
            padding: clamp(5px,0.5cqw,8px) clamp(7.5px, 0.75cqw, 12px);
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
            border-radius: clamp(6.25px,0.625cqw,10px);
            border: clamp(0.625px,0.0625cqw,1px) solid #4a261b;
            background: #fff;
            font-size: clamp(7.5px, 0.75cqw, 12px);
            margin:clamp(2.5px,0.25cqw,4px);

            &.mobile{
              width:80px;
              padding:8px 12px;
              border-radius:10px;
              border:1px solid #4a261b;
              font-size:12px;
              margin:4px;
            }

            & .icon-dropdown-sort-history{
              font-size:clamp(10px,1cqw,16px);
              line-height:0;

              &.mobile{
                font-size:16px;
              }
            }
          }

          & .box-dropdown-history-menu{
            width:100%;
            top: 105%;
            left: 0%;
            border-radius: clamp(6.25px,0.625cqw,10px);
            border: clamp(0.625px,0.0625cqw,1px) solid #4a261b;
            background: #fff;
            overflow: hidden;
            z-index: 2;
            font-size: clamp(7.5px, 0.75cqw, 12px);

            &.mobile{
              border-radius: 10px;
              border: 1px solid #4a261b;
              font-size:12px;
            }

            & .text-select-menu{
              padding: clamp(5px,0.5cqw,8px) clamp(7.5px, 0.75cqw, 12px);
              background: #ffffff;

              &.mobile{
                padding:8px 12px;
              }

              &:hover{
                background: #d9d9d9;
              }

              &.active{
                background: #d9d9d9;
              }
            }
          }

          & .text-sort-history{
            font-size: clamp(7.5px, 0.75cqw, 12px);
            margin: 0px clamp(2.5px, 0.125cqw, 4px);

            &.mobile{
              font-size:12px;
              margin:4px;
            }
          }

          & .icon-sort-history{
            font-size:clamp(7.5px,0.75cqw,12px);

            &.mobile{
              font-size:12px;
            }
          }
        }

        & .box-history-scroll {
          height: 78%;
          font-size: clamp(7.5px, 0.75cqw, 12px);
          padding:clamp(5px,0.5cqw,8px) clamp(10px,1cqw,16px);
          overflow: auto;

          &.mobile{
            font-size:12px;
            padding:8px 16px;
          }

          & .box-history-list{

            & .text-history-date{
              color:#5e5e5e;
            }

            & .box-history-course{
              font-size: clamp(8.75px, 0.875cqw, 14px);

              &.mobile{
                font-size:14px;
              }

              & .box-course-list{
                margin: clamp(2.5px,0.25cqw,4px) 0px;

                &.mobile{
                  margin:4px 0px;
                }
              }

              & .text-history-payment{
                font-size: clamp(6.25px, 0.625cqw, 10px);
                margin-bottom: clamp(2.5px, 0.25cqw, 4px);

                &.mobile{
                  font-size:10px;
                  margin-bottom:4px;
                }
              }

              & .box-code-price{
                margin:clamp(5px,0.5cqw,8px) 0px;

                &.mobile{
                  margin:8px 0px;
                }
              }

              & .box-total-price{
                margin:clamp(5px,0.5cqw,8px) 0px;

                &.mobile{
                  margin:8px 0px;
                }

                & .text-total-price{
                  font-size:clamp(10px,1cqw,16px);

                  &.mobile{
                    font-size:16px;
                  }
                }
              }

            }

            & .box-separator{
                margin-top: clamp(5px, 0.5cqw, 8px);
                height: clamp(1.25px, 0.125cqw, 2px);
                background-color: #caa954;

                &.mobile{
                  margin-top:8px;
                  height:2px;
                }
              }
          }

          & .text-none-list {
            font-size: clamp(8.75px, 0.875cqw, 14px);

            &.mobile{
              font-size:14px;
            }
          }

          &::-webkit-scrollbar {
            width:6px;

            &:not(.mobile){
              width: clamp(3.75px, 0.375cqw, 6px);
            }

          }

          &::-webkit-scrollbar-thumb {
            background-color: #4a261b;
            border-radius: 10px;

            &:not(.mobile){
              border-radius: clamp(6.25px, 0.625cqw, 10px);
            }
          }

          &::-webkit-scrollbar-track {
            background-color: transparent;
          }
        }
      }
    }

    & .button-icon-close {
      width: 12.5%;
      top: -3%;
      right:-4%;
      cursor:pointer;

      &.mobile{
        width:45px;
        top:-5px;
        right:-15px;
      }
    }
  }
}

.box-dialog-container {
  width: 340px;
}

.box-dialog-container .box-dialog-sub {
  background: #ffedc4;
  box-shadow: 0px 0px 3.419px 0px rgba(0, 0, 0, 0.25);
  padding: 12px;
  color: #4a261b;
}

.box-dialog-container .box-dialog-sub .box-dialog-details {
  background-color: #efd080;
  text-align: left;
}

.box-dialog-container .box-dialog-sub .box-dialog-details .box-dialog-content-scroller {
  padding: 0px 12px;
  height: 400px;
  overflow-y: auto;
}

.box-dialog-content-scroller::-webkit-scrollbar {
  width: 6px;
}

.box-dialog-content-scroller::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 2px;
}
// #endregion

.dialog-container {
  width: 1000px;
  min-width: 1000px;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 15px;
  padding: 7px;
  color: #4a261b;
  margin: auto;
}

.dialog-container-mobile {
  width: 320px;
  min-width: 320px;
  height: 508px;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 15px;
  padding: 7px;
  color: #4a261b;
  margin: auto;
}

.box-dialog-content-scorll {
  overflow-y: auto;
  height: 370px;
}

.box-dialog-content-scorll::-webkit-scrollbar {
  width: 4px;
}

.box-dialog-content-scorll::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 10px;
}

.box-dialog-content-scorll::-webkit-scrollbar-track {
  background-color: transparent;
}

.box-dialog-content-mobile {
  background-color: #f6f3d3;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0px 5px 10px 1px rgba(55, 55, 55, 0.2);
}

.button-main-active {
  transform: scale(1);
  -webkit-trasnform: scale(1);
  -moz-transform: scale(1);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-menu-mobile {
  position: relative;
  width: 130px;
  padding: 10px 5px;
  color: #4a261b;
  text-align: center;
  font-family: mali-b;
  border: 1px solid #4a261b;
  border-radius: 10px 10px 0px 0px;
  box-shadow: 0px -10px 10px 1px rgba(55, 55, 55, 0.2);
}

.button-menu-mobile.active {
  background-color: #f6f3d3;
  border: 1px solid #f6f3d3;
}

.button-menu {
  position: relative;
  width: 160px;
  padding: 15px 0px;
  color: #4a261b;
  border-radius: 15px 15px 0px 0px;
  cursor: pointer;
  border: 1px solid #4a261b;
  box-shadow: 0px -2px 3px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.button-menu::after,
.button-menu-mobile::after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 93%;
  background-color: #f5cd69;
  z-index: 1;
  border-radius: 30px 15px 0px 0px;
}

.button-menu::before,
.button-menu-mobile::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fae6b4;
  z-index: 1;
  border-radius: 10px 10px 0px 0px;
}

.button-menu.active::after,
.button-menu-mobile.active::after {
  content: " ";
  background-color: transparent;
}

.button-menu.active::before,
.button-menu-mobile.active::before {
  content: " ";
  background-color: transparent;
}

.button-menu:hover {
  background-color: transparent;
  transition: 0.1s;
}

.button-menu.active {
  background-color: #f6f3d3;
  background-image: linear-gradient(#f6f3d3, #f6f3d3);
  border: 1px solid #f6f3d3;
}

.box-profile-main {
  background-color: #f6f3d3;
  padding: 35px 25px;
  border-radius: 0px 10px 10px 10px;
  box-shadow: 0px 3px 3px 0px rgba(0, 0, 0, 0.2);
}

.box-profile-content {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  overflow: hidden;
}

.box-profile-content-mobile {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  overflow: hidden;
}

.box-character-profile {
  width: 270px;
  background-size: cover;
  background-position: 95% 0%;
  border-radius: 10px;
}

.profile-name {
  height: 48px;
  background-color: #4a261b;
}

.text-level {
  color: #fff;
  font-size: 36px;
  font-family: fredoka;
  text-shadow: rgb(74, 38, 27) 4px 0px 0px, rgb(74, 38, 27) 3.87565px 0.989616px 0px,
    rgb(74, 38, 27) 3.51033px 1.9177px 0px, rgb(74, 38, 27) 2.92676px 2.72656px 0px,
    rgb(74, 38, 27) 2.16121px 3.36588px 0px, rgb(74, 38, 27) 1.26129px 3.79594px 0px,
    rgb(74, 38, 27) 0.282949px 3.98998px 0px, rgb(74, 38, 27) -0.712984px 3.93594px 0px,
    rgb(74, 38, 27) -1.66459px 3.63719px 0px, rgb(74, 38, 27) -2.51269px 3.11229px 0px,
    rgb(74, 38, 27) -3.20457px 2.39389px 0px, rgb(74, 38, 27) -3.69721px 1.52664px 0px,
    rgb(74, 38, 27) -3.95997px 0.56448px 0px, rgb(74, 38, 27) -3.97652px -0.432781px 0px,
    rgb(74, 38, 27) -3.74583px -1.40313px 0px, rgb(74, 38, 27) -3.28224px -2.28625px 0px,
    rgb(74, 38, 27) -2.61457px -3.02721px 0px, rgb(74, 38, 27) -1.78435px -3.57996px 0px,
    rgb(74, 38, 27) -0.843183px -3.91012px 0px, rgb(74, 38, 27) 0.150409px -3.99717px 0px,
    rgb(74, 38, 27) 1.13465px -3.8357px 0px, rgb(74, 38, 27) 2.04834px -3.43574px 0px,
    rgb(74, 38, 27) 2.83468px -2.82216px 0px, rgb(74, 38, 27) 3.44477px -2.03312px 0px,
    rgb(74, 38, 27) 3.84068px -1.11766px 0px, rgb(74, 38, 27) 3.9978px -0.132717px 0px;
}

.header-text,
.sub-text {
  position: relative;
  padding-left: 15px;
}

.header-text,
.sub-text-mobile {
  position: relative;
  padding-left: 0px;
}

.header-text::after {
  content: " ";
  position: absolute;
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  width: 12.9px;
  height: 12.9px;
  border-radius: 50%;
  background-color: #4a261b;
}

.options-menu-list {
  border-radius: clamp(3.125px, 0.3125vw, 5px);
  background-color: transparent;
  color: #4a261b;
  font-weight: bold;
  padding: clamp(2.5px, 0.25vw, 4px);
  margin: clamp(1.875px, 0.1875vw, 3px) 0px;
  cursor: pointer;
}

.options-menu-list:hover {
  background-color: #4a261b;
  color: #fff;
}

.box-progress-main {
  height: 394px;
}

.box-practice-content {
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-radius: 10px;
  padding: 10px;
  overflow-y: auto;
}

.box-progress-score {
  position: relative;
  background-color: #efd080;
  border: 2px solid #4a261b;
  border-top-color: transparent;
  border-radius: 0px 0px 10px 10px;
  padding: 5px 3px 10px 7px;
}

.box-progress-score-scroll {
  height: 331px;
  overflow: auto;
}

.button-progress-menu {
  position: relative;
  background-color: #4a261b;
  color: #fff;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid #4a261b;
  padding: 5px 0px;
  overflow: hidden;
  cursor: pointer;
}

.button-progress-menu::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 90%;
  left: 0;
  bottom: 0;
  background-color: #4a261b;
  border-radius: 15px 20px 0px 0px;
  z-index: 1;
}

.button-progress-menu::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.473);
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
}

.button-progress-menu:hover {
  position: relative;
  background-color: transparent;
  color: #fff;
}

.button-progress-menu.active {
  position: relative;
  background-color: #efd080;
  color: #4a261b;
  border-radius: 10px 10px 0px 0px;
  border: 2px solid #4a261b;
  border-bottom-color: #efd080;
}

.button-progress-menu.active::after {
  content: "";
  background-color: transparent;
}

.button-progress-menu.active::before {
  content: "";
  content: "";
  background-color: transparent;
}

.box-scroll-progress-mobile {
  height: 370px;
  padding-right: 5px;
  overflow-y: auto;
}

.box-scroll-progress-mobile::-webkit-scrollbar {
  width: 10px;
}

.box-scroll-progress-mobile::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 20px;
}

.box-scroll-progress-mobile::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 0px;
}

.active-menu {
  background-color: #4a261b;
  color: #fff;
}

.text-title-download {
  color: #4a261b;
}

.box-dialog-container {
  width: 340px;
  border-radius: 10px;
  padding: 6px;
  border: 2.564px solid #4a261b;
  background: #f2c043;
  box-shadow: 0px 0px 3.419px 0px rgba(0, 0, 0, 0.25);
}

.box-dialog-container .box-dialog-sub {
  border-radius: 10px;
  background: #ffedc4;
  box-shadow: 0px 0px 3.419px 0px rgba(0, 0, 0, 0.25);
  padding: 12px;
  color: #4a261b;
}

.box-dialog-container .box-dialog-sub .box-dialog-details {
  background-color: #efd080;
  border-radius: 0px 0px 10px 10px;
  text-align: left;
}

.box-dialog-container .box-dialog-sub .box-dialog-details .box-dialog-content-scroller {
  padding: 0px 12px;
  height: 400px;
  overflow-y: auto;
}

.box-dialog-content-scroller::-webkit-scrollbar {
  width: 6px;
}

.box-dialog-content-scroller::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border-radius: 2px;
}

.box-dialog-selected {
  width: 80px;
  height: 30px;
  background-color: #fff;
  border-radius: 7.5px;
  border: 1px solid #4a261b;
  cursor: pointer;
  color: #4a261b !important;
  font-family: "mali-m";
}

.item-select:hover {
  background-color: #d9d9d9;
  cursor: pointer;
}

.item-select.selected {
  background-color: #d9d9d9;
  color: #4a261b;
}

// .button-delete-student {
//   width: 100px;
//   color: #ff2c2c;
//   border: 1px solid #ff2c2c;
//   border-radius: 10px;
//   padding: 4px 0px;
//   align-items: center;
//   margin: 16px auto;
//   font-size: 12px;
//   cursor: pointer;
// }

// .button-delete-student-disable {
//   border: 1px solid #a2a2a2;
//   color: #a2a2a2;
//   cursor: default;
// }

.box-dialog-notify-delete-user {
  width: 324px;
  padding: 10px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
}

.sub-dialog-notify-delete-user {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
}

.dialog-notify-delete-content {
  height: 300px;
  border-radius: 10px;
  background: #efd080;
  padding: 12px;
  overflow: auto;
  margin: 16px 0px;
}

.dialog-notify-delete-content::-webkit-scrollbar {
  width: 10px;
}

.dialog-notify-delete-content::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background: #4a261b;
  border: 3px solid #efd080;
}

.dialog-notify-delete-content::-webkit-scrollbar-track {
  border-radius: 99px;
  border: 2px solid #efd080;
}

.dialog-notify-text-content {
  line-height: 28px;
  margin: 8px 0px;
}

.icon-alert {
  width: 24px;
  color: #cf1111;
}

.box-button-confirm {
  margin-top: 16px;
}

.box-dialog-container-2 {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
}

.sub-dialog-container-2 {
  padding: 16px 12px 12px 12px;
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  color: #4a261b;
}

.box-dialog-content-2 {
  border-radius: 10px;
  background: #efd080;
  padding: 16px 12px 12px 12px;
  margin: 16px 0px;
}

.box-input {
  height: 30px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #fff;
  margin: 8px 0px 0px;
}

.box-input.input-validate {
  border: 1px solid #cf2e2e;
  background: #f8e2e2;
}

.box-button-not-now {
  margin-top: 16px;
}

.box-button-delete-user {
  margin-top: 16px;
}

.text-validate {
  color: #c10015;
}

.box-dialog-message {
  width: fit-content;
  border-radius: 10px;
  background: #a61a1a;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 10px;
  color: #fff;
}
</style>
