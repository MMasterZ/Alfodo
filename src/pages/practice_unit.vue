<template>
  <q-page
    :class="
      isDesktop
        ? 'container-scroll row justify-center items-center'
        : 'container-scroll-mobile'
    "
    :skill="practiceStore.skill"
  >
    <div v-if="$q.platform.is.desktop">
      <div class="fixed-top">
        <div
          :skill="practiceStore.skill"
          :class="isDesktop ? 'background-bar' : 'background-bar-mobile'"
        ></div>
      </div>

      <div class="fixed-bottom">
        <div
          :skill="practiceStore.skill"
          :class="isDesktop ? 'background-bar' : 'background-bar-mobile'"
        ></div>
      </div>
    </div>

    <!-- #region Desktop -->
    <div
      class="relative-position background-container-desktop"
      v-if="$q.platform.is.desktop"
    >
      <!-- #region Background main -->
      <background-main :background="setBackground"></background-main>
      <!-- #endregion -->

      <!-- #region Header -->
      <div class="row absolute-top box-header-main">
        <!-- #region Button Back -->
        <div class="col-1 button-active-main button-back">
          <q-img
            src="/images/icon_main/icon-back.png"
            no-transition
            no-spinner
            @click="$router.replace('/practice/list')"
          ></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Title -->
        <div class="col-1 self-center text-title-header">
          <span>
            {{
              `${
                practiceStore.skill[0].toUpperCase() + practiceStore.skill.slice(1)
              } : Unit ${practiceStore.unit}`
            }}
          </span>
        </div>
        <!-- #endregion -->

        <!-- #region Button Information -->
        <div class="col-1 self-center button-active-main button-info">
          <q-img
            src="/images/icon_main/icon-info.png"
            @click="funcShowTutorial()"
            no-transition
            no-spinner
          ></q-img>
        </div>
        <!-- #endregion -->

        <q-space></q-space>

        <!-- #region Button Setting -->
        <div class="col-1 button-active-main button-setting">
          <q-img
            @click="isShowDialogSetting = true"
            src="/images/icon_main/icon-setting.png"
            no-transition
            no-spinner
          ></q-img>
        </div>
        <!-- #endregion -->

        <!-- #region Button Back To Home -->
        <div class="col-1 button-active-main button-home">
          <q-img
            @click="$router.replace('/lobby')"
            src="/images/icon_main/icon-home.png"
            no-transition
            no-spinner
          ></q-img>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #region ชื่อยูนิต -->
      <div class="absolute-top-left button-select-level-and-unit">
        <div class="relative-position">
          <div class="text-unit-content">
            <span class="font-mali-m"> {{ showUnitName }}</span>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มเลือกยูนิต -->
      <div class="absolute-top-left box-button-unit">
        <div>
          <div>
            <q-img
              src="/images/button_main/button-select-level-and-unit.png"
              no-spinner
              no-transition
              @click="funcScrollToUnit()"
            >
              <div class="fit no-padding transparent">
                <!-- #region Show Current Unit -->
                <div
                  class="absolute-center row justify-center items-center"
                  style="width: 90%; padding: 0% 3%; color: #4a261b"
                >
                  <div class="col self-center text-unit font-mali-m">
                    {{ `บทที่ ${practiceStore.unit}` }}
                  </div>
                  <div class="col-1 box-icon-arrow-down">
                    <q-img
                      src="/images/icon_main/icon-select-unit-arrow-down.png"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
            </q-img>

            <!-- #region Menu Unit -->
            <q-menu
              fit
              transition-show="jump-down"
              transition-hide="jump-up"
              class="relative-position"
              style="border-radius: 5px; border: 2px solid #4a261b"
            >
              <div
                class="box-menu-select-level-and-unit-container"
                style="height: fit-content; max-height: 200px"
              >
                <q-list>
                  <div
                    style="padding: 2% 1%"
                    v-for="(itemUnit, indexUnit) in practiceStore.unitOptions"
                    :key="indexUnit"
                    :id="`unit-${itemUnit.value}`"
                  >
                    <div
                      clickable
                      v-close-popup
                      class="box-item-menu cursor-pointer row"
                      align="center"
                      :class="
                        itemUnit.isSuccess
                          ? unitSelected == itemUnit.value
                            ? 'success active-menu'
                            : 'success'
                          : unitSelected == itemUnit.value
                          ? 'active-menu'
                          : 'not-active'
                      "
                      @click="funcSelectUnit(itemUnit)"
                    >
                      <div class="self-center col" align="left">
                        <span>{{ itemUnit.label }}</span>
                      </div>
                      <div
                        class="col-1 self-center"
                        align="center"
                        style="width: 13.89%; margin-top: -3%"
                        v-if="
                          studentStore.studentType == 'demo' &&
                          itemUnit.value > studentStore.studentDemoUnit
                        "
                      >
                        <q-img
                          src="/images/icon_main/icon-lock.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>

                      <div
                        class="col-1 self-center"
                        align="center"
                        style="width: 27.78%; margin-top: -3%"
                        v-if="itemUnit.isSuccess"
                      >
                        <q-img
                          src="/images/icon_main/icon-success-unit.png"
                          no-spinner
                          no-transition
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </q-list>
              </div>
            </q-menu>
            <!-- #endregion -->
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #endregion -->

      <!-- #region Practice Icon -->
      <div
        v-for="(item, index) in practiceStore.listBySkill"
        class="absolute row"
        :style="`left:${item.position.y}%;top:${item.position.x}%;width:${
          (item.size / 1600) * 100
        }%;z-index:${selectHover == index ? 1 : 0}`"
        :class="
          item.isDisable || (!item.isLesson && item.counter >= 2)
            ? 'cursor-not-allowed'
            : 'cursor-pointer'
        "
      >
        <div class="col-12 self-end fit animation-hover">
          <!-- #region Button Icon -->
          <div
            class="relative-position item"
            :class="[
              {
                'animation-show-icon': isStartAnimation,
                'animation-hide-icon': !isStartAnimation,
                'cursor-pointer': item.isDisable || (!item.isLesson && item.counter >= 2),
              },
            ]"
            :style="`animation-delay:${index * 0.05}s`"
            @click="
              item.isDisable || (!item.isLesson && item.counter >= 2)
                ? null
                : funcGotoPractice(item)
            "
            @mouseenter="selectHover = index"
            @mouseleave="selectHover = null"
          >
            <div
              :class="
                item.isDisable || (!item.isLesson && item.counter >= 2)
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              "
            >
              <!-- #region ฐานแบบฝึกหัด -->
              <div>
                <q-img
                  :src="`/images/box_main/box-icon-button-learn${
                    item.isDisable || practiceStore.isCheckLockPractice
                      ? '-lock'
                      : item.isLearn
                      ? '-pass'
                      : ''
                  }.webp`"
                  no-transition
                  no-spinner
                ></q-img>
              </div>
              <!-- #endregion -->

              <!-- #region ไอคอนโรลเพลย์ -->
              <div
                class="absolute-center"
                style="width: 57.3%; top: 46%; margin: auto"
                v-if="item.isRoleplay"
                align="center"
              >
                <div
                  class="relative-position animate__animated animate__heartBeat animation-duration-0-5s"
                >
                  <q-img
                    src="/images/icon_main/icon-role-play.webp"
                    no-spinner
                    no-transition
                  ></q-img>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ดาว -->
              <div
                class="absolute-top box-star-main"
                :class="i == 1 ? 'left' : i == 2 ? 'center' : 'right'"
                align="center"
                v-for="i in 3"
              >
                <div
                  class="relative-position animate__animated animate__fadeIn"
                  :style="`animation-delay:${index * 0.1}s`"
                  v-if="!item.isLesson"
                >
                  <div class="relative-position animate__animated animate__fadeIn">
                    <q-img
                      :src="`/images/box_main/box-icon-practice-star-${
                        i == 1 ? 'left' : i == 2 ? 'center' : 'right'
                      }-blank.webp`"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="absolute-center fit" v-if="item.star >= i">
                    <div
                      class="relative-position animation-star"
                      :class="i == 1 ? 'left' : i == 2 ? 'center' : 'right'"
                      :style="`animation-delay:${i * 0.1}s`"
                    >
                      <q-img
                        :src="`/images/box_main/box-icon-practice-star-${
                          i == 1 ? 'left' : i == 2 ? 'center' : 'right'
                        }.webp`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region ลำดับแบบฝึกหัด -->
              <div
                class="absolute-bottom box-icon-learn-number"
                align="center"
                v-if="!item.isRoleplay"
              >
                <div class="relative-position fit">
                  <div
                    class="f144 font-mali-b text-icon-learn"
                    :style="`font-size: ${item.fontSize}`"
                  >
                    {{ `${index + 1}` }}
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>

            <!-- #region Icon First time -->
            <div
              class="absolute-bottom-right box-badge-first-time"
              v-if="
                (item.practiceType == 'flashcard' && item.isFirstTimeReward) ||
                (!item.isLesson && item.isFirstTimeReward)
              "
              :class="
                item.isDisable || (!item.isLesson && item.counter >= 2)
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              "
            >
              <q-img
                src="/images/icon_main/icon-badge-first-time-xp.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->

            <!-- #region Tooltip -->
            <div class="absolute-center box-tooltip-main" v-if="selectHover == index">
              <div class="sub-tooltip" align="center">
                <div class="row justify-center items-center">
                  <div class="col-1 font-mali-b text-header-tooltip">
                    {{ `${funcChangeNameSkill(item.practiceType)}` }}
                  </div>
                  <div class="box-tooltip-counter font-mali-b" v-if="!item.isLesson">
                    <span>เหลือ</span>
                    <span
                      class="relative-position text-counter"
                      :class="item.counter >= 2 ? 'text-finish' : ''"
                      >{{
                        ` ${
                          item.counter >= 2 ? 0 : item.counter == 0 ? "2" : item.counter
                        } `
                      }}</span
                    >
                    <span>ครั้ง</span>
                  </div>
                </div>
                <div class="text-tooltip-validate">
                  <div
                    v-if="studentStore.studentType == 'online' && !item.isLesson"
                    style="margin: 2.659%"
                  >
                    {{ `(รีเซ็ทจำนวนครั้งทุกวัน)` }}
                  </div>

                  <div v-else style="margin: 2.659% 0%">
                    <div v-html="item.textValidate"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region ปุ่มถัดไป/ปุ่มย้อนกลับ -->
      <!-- ปุ่มย้อนกลับ -->
      <div class="absolute-top-left button-main button-back">
        <q-img
          @click="funcNextAndBackSkill(backPractice)"
          class="cursor-pointer"
          :src="`/images/icon_main/icon-left-skill-${backPractice.nameImage}.png`"
          no-transition
          no-spinner
        ></q-img>
      </div>

      <!-- ปุ่มถัดไป -->
      <div class="absolute-top-right button-main button-next">
        <div>
          <q-img
            @click="funcNextAndBackSkill(nextPractice)"
            class="cursor-pointer"
            :src="`/images/icon_main/icon-right-skill-${nextPractice.nameImage}.png`"
            no-transition
            no-spinner
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="box-menu-list-mobile row" v-if="!$q.platform.is.desktop">
      <!-- #region Header bar -->
      <div class="col-12 box-header-main-mobile">
        <div class="row">
          <div class="col-1 box-button-back">
            <q-img
              src="/images/icon_main/icon-back.png"
              no-transition
              no-spinner
              @click="funcBackToPracticeSkill()"
            ></q-img>
          </div>
          <div class="self-center q-mx-sm">
            <span class="text-skill-unit f24 font-fredoka">
              {{ `${practiceStore.skill[0].toUpperCase()} : Unit ${practiceStore.unit}` }}
            </span>
          </div>
          <div class="self-start q-mt-xs">
            <q-img
              class="cursor-pointer"
              width="16px"
              src="/images/icon_main/icon-info.png"
              @click="funcShowTutorial()"
            ></q-img>
          </div>

          <q-space />

          <div class="col-1 box-button-setting q-mx-sm">
            <q-img
              @click="isShowDialogSetting = true"
              src="/images/icon_main/icon-setting.png"
              no-transition
              no-spinner
            ></q-img>
          </div>
          <div class="col-1 box-button-home">
            <q-img
              @click="$router.replace('/lobby')"
              src="/images/icon_main/icon-home.png"
              no-transition
              no-spinner
            ></q-img>
          </div>
        </div>

        <div class="box-button-unit-mobile">
          <div class="sub-button-unit-mobile f16 row justify-between items-center">
            <div class="self-center font-mali-m">
              {{ `บทที่ ${practiceStore.unit}` }}
            </div>
            <div align="right">
              <q-icon size="16px" name="fas fa-caret-down"></q-icon>
            </div>
          </div>

          <!-- #region Menu Unit -->
          <q-menu
            fit
            transition-show="jump-down"
            transition-hide="jump-up"
            class="relative-position"
            style="border-radius: 5px; border: 2px solid #4a261b"
          >
            <div
              class="box-menu-select-level-and-unit-container mobile"
              style="height: fit-content; max-height: 200px"
            >
              <q-list>
                <div class="q-pa-xs">
                  <div
                    clickable
                    v-close-popup
                    class="box-item-menu cursor-pointer row"
                    v-for="(itemUnit, indexUnit) in practiceStore.unitOptions"
                    align="center"
                    :class="
                      itemUnit.isSuccess
                        ? unitSelected == itemUnit.value
                          ? 'success active-menu'
                          : 'success'
                        : unitSelected == itemUnit.value
                        ? 'active-menu'
                        : 'not-active'
                    "
                    :key="indexUnit"
                    @click="funcSelectUnit(itemUnit)"
                  >
                    <div class="self-center col" align="left">
                      <span>{{ itemUnit.label }}</span>
                    </div>
                    <div
                      class="col-1 self-center"
                      align="center"
                      style="width: 13.89%; margin-top: -3%"
                      v-if="
                        studentStore.studentType == 'demo' &&
                        itemUnit.value > studentStore.studentDemoUnit
                      "
                    >
                      <q-img
                        src="/images/icon_main/icon-lock.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>

                    <div
                      class="col-1 self-center"
                      align="center"
                      style="width: 27.78%; margin-top: -3%"
                      v-if="itemUnit.isSuccess"
                    >
                      <q-img
                        src="/images/icon_main/icon-success-unit.png"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-list>
            </div>
          </q-menu>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region รายการแบบฝึคกหัด -->
      <div
        class="col-12 self-start box-body-main-mobile relative-position"
        id="scroll-practice"
        @scroll="funcScrollPracticeList"
      >
        <div class="relative-position box-item-learn">
          <div
            class="relative-position"
            v-for="(item, index) in practiceStore.listBySkill"
            @click="
              item.isDisable || (!item.isLesson && item.counter >= 2)
                ? null
                : funcGotoPractice(item)
            "
          >
            <!-- #region กล่องแบบฝึกหัด -->
            <q-img
              :src="`/images/box_main/box-icon-button-learn${
                item.isDisable || practiceStore.isCheckLockPractice
                  ? '-lock'
                  : item.isLearn
                  ? '-pass'
                  : ''
              }-mobile.webp`"
              no-transition
              no-spinner
            ></q-img>
            <!-- #endregion -->

            <!-- #region ลำดับแบบฝึกหัด -->
            <div
              class="absolute-top box-number-practice"
              :class="`${
                item.isDisable || practiceStore.isCheckLockPractice
                  ? 'lock'
                  : item.isLearn
                  ? 'pass'
                  : ''
              }`"
              align="center"
            >
              <div class="font-mali-b">
                <div v-if="!item.isRoleplay">
                  {{ index + 1 }}
                </div>

                <!-- #region ไอคอนโรลเพลย์ -->
                <div
                  v-if="item.isRoleplay"
                  style="margin-left: -13px; margin-top: 3px"
                  align="center"
                >
                  <div
                    class="relative-position animate__animated animate__heartBeat animation-duration-0-5s"
                  >
                    <q-img
                      width="70px"
                      src="/images/icon_main/icon-role-play.webp"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                </div>
                <!-- #endregion -->
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region ชื่อแบบฝึกหัด -->
            <div class="absolute-top box-name-practice font-fredoka f16">
              {{ `${funcChangeNameSkill(item.practiceType)} ` }}
            </div>
            <!-- #endregion -->

            <!-- #region จำนวนครั้งในการทำ -->
            <div
              class="absolute-bottom f10 box-num-of-practice row justify-center items-center font-mali-b"
              align="center"
              v-if="!item.isLesson"
            >
              <span>เหลือ</span>
              <span class="q-mx-xs" :class="item.counter == 2 ? 'text-finish' : ''">
                {{
                  ` ${item.counter == 2 ? 0 : item.counter == 0 ? "2" : item.counter} `
                }}
              </span>
              <span>ครั้ง</span>
            </div>
            <!-- #endregion -->

            <!-- #region ดาว -->
            <div class="absolute-top box-star-container-mobile">
              <div
                class="absolute-top box-star-main mobile"
                :class="i == 1 ? 'left' : i == 2 ? 'center' : 'right'"
                align="center"
                v-for="i in 3"
              >
                <div class="relative-position" v-if="!item.isLesson">
                  <div class="relative-position">
                    <q-img
                      :src="`/images/box_main/box-icon-practice-star-${
                        i == 1 ? 'left' : i == 2 ? 'center' : 'right'
                      }-blank.webp`"
                      no-spinner
                      no-transition
                    ></q-img>
                  </div>
                  <div class="absolute-center fit" v-if="item.star >= i">
                    <div
                      class="relative-position animation-star"
                      :class="i == 1 ? 'left' : i == 2 ? 'center' : 'right'"
                      :style="`animation-delay:${i * 0.05}s`"
                    >
                      <q-img
                        :src="`/images/box_main/box-icon-practice-star-${
                          i == 1 ? 'left' : i == 2 ? 'center' : 'right'
                        }.webp`"
                        no-spinner
                        no-transition
                      ></q-img>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region ไอตอนเฟิร์สไทม์ -->
            <div
              class="absolute-bottom-right box-badge-first-time mobile"
              v-if="
                (item.practiceType == 'flashcard' && item.isFirstTimeReward) ||
                (!item.isLesson && item.isFirstTimeReward)
              "
              :class="
                item.isDisable || (!item.isLesson && item.counter >= 2)
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer'
              "
            >
              <q-img
                src="/images/icon_main/icon-badge-first-time-xp.webp"
                no-spinner
                no-transition
              ></q-img>
            </div>
            <!-- #endregion -->

            <!-- #region tooltip -->
            <q-tooltip
              anchor="center middle"
              self="bottom middle"
              transition-show="scale"
              transition-hide="scale"
              class="transparent no-padding absolute"
              style="width: 300px"
            >
              <div class="box-tooltip-main mobile">
                <div class="sub-tooltip mobile" align="center">
                  <div class="row justify-center items-center">
                    <div class="col-1 font-mali-b text-header-tooltip mobile">
                      {{ `${funcChangeNameSkill(item.practiceType)}` }}
                    </div>
                    <div
                      class="box-tooltip-counter mobile font-mali-b"
                      v-if="!item.isLesson"
                    >
                      <span>เหลือ</span>
                      <span class="relative-position text-counter mobile">{{
                        ` ${
                          item.counter == 2 ? 0 : item.counter == 0 ? "2" : item.counter
                        } `
                      }}</span>
                      <span>ครั้ง</span>
                    </div>
                  </div>
                  <div class="text-tooltip-validate mobile">
                    <div
                      v-if="studentStore.studentType == 'online' && !item.isLesson"
                      style="margin: 6px 0px 4px"
                    >
                      {{ `(รีเซ็ทจำนวนครั้งทุกวัน)` }}
                    </div>

                    <div v-else style="margin: 6px 0px 4px">
                      <div v-html="item.textValidate"></div>
                    </div>
                  </div>
                </div>
              </div>
            </q-tooltip>
            <!-- #endregion -->
          </div>
        </div>

        <!-- #region Scroll Bar Fake -->
        <div
          class="absolute-top-right box-scroll-fake"
          id="scroll-practice-fake"
          v-show="isPracticeUnitHasScroll"
        ></div>
        <!-- #endregion -->
      </div>
      <!-- #endregion -->

      <q-sapce />

      <!-- #region ปุ่มซ้ายและขวา -->
      <div class="box-footer-main-mobile self-end row">
        <div class="self-start" style="width: 100px">
          <q-img
            @click="funcNextAndBackSkill(backPractice)"
            class="cursor-pointer"
            :src="`/images/button_main/button-arrow-left-skill-${backPractice.nameImage}.webp`"
            no-transition
            no-spinner
          ></q-img>
        </div>
        <q-space></q-space>
        <div class="self-start" style="width: 100px">
          <q-img
            @click="funcNextAndBackSkill(nextPractice)"
            class="cursor-pointer"
            :src="`/images/button_main/button-arrow-right-skill-${nextPractice.nameImage}.webp`"
            no-transition
            no-spinner
          ></q-img>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Lock Skill -->
  <q-dialog
    maximized
    persistent
    v-model="practiceStore.isCheckLockPractice"
    v-if="!isDesktop"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit no-padding">
        <div class="absolute-center">
          <div class="box-lock-content relative-position">
            <div class="box-lock-content-sub q-py-md f20 font-mali-b" align="center">
              <div
                class="q-mt-md"
                v-html="practiceStore.currentSkillIsland.textValidate"
              ></div>
            </div>

            <div class="absolute-center" style="top: -7px; width: 250px">
              <q-img
                :src="`/images/practice_list/label-${
                  practiceStore.currentSkillIsland.nameImage
                }${practiceStore.isCheckLockPractice ? '-lock' : ''}.png`"
                no-transition
                no-spinner
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Setting -->
  <dialog-setting
    @callback-closeDialog="isShowDialogSetting = false"
    :isDialogSetting="isShowDialogSetting"
  ></dialog-setting>
  <!-- #endregion -->

  <!-- #region Dialog Review -->
  <q-dialog v-model="isShowDialogReview" persistent maximized class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-main">
          <div class="sub-dialog-main">
            <div class="title-review font-mali-b" align="center">
              ทบทวนกันอีกรอบก่อนไหม?
            </div>
            <div class="box-content-review font-mali-m" align="center">
              <div>แบบฝึกหัดนี้เกี่ยวข้องกับ</div>
              <div>วิดีโอ Conversation ที่แล้ว</div>
              <div>ต้องการกลับไปทบทวนเนื้อหา</div>
              <div>อีกครั้งกันก่อนไหม?</div>
            </div>
            <div class="button-active-main button-review-again" @click="funcNextReview()">
              <div class="row relative-position fit z-top q-pb-xs">
                <div
                  class="col-3 q-pr-md f24 self-center"
                  align="right"
                  style="width: 70px"
                >
                  <q-icon name="fas fa-video"></q-icon>
                </div>
                <div class="col self-center font-mali-m">ทบทวนอีกครั้ง ก็ดีนะ</div>
              </div>
            </div>

            <div class="button-active-main button-go-practice" @click="funcNotReview()">
              <div
                class="row justify-center items-center relative-position fit z-top q-pb-xs"
              >
                <div class="q-pr-md f24 self-center" align="right" style="width: ">
                  <q-icon name="fas fa-play"></q-icon>
                </div>
                <div class="self-center font-mali-m">ฉันพร้อมลุยแล้ว</div>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Tutorial -->
  <dialog-tutorial
    v-if="isShowDialogTutorial"
    :isDialogTutorial="isShowDialogTutorial"
    :systemStore="systemStore"
    @callback-closeDialog="funcCloseTutorial()"
    :pageName="`practice-unit`"
  ></dialog-tutorial>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <dialog-loading :isShowLoading="isShgowDialogLoading"></dialog-loading>
  <!-- #endregion -->
</template>

<script setup>
import backgroundMain from "src/components/background_main/background-main.vue";
import learningIcon from "../components/practice_list_unit/learning_unit_icon.vue";
import learningList from "../components/practice_list_unit/learning_unit_list.vue";
import headerBar from "../components/practice_list_unit/header-bar.vue";
import nextAndBack from "../components/practice_list_unit/next_and_back_button.vue";
import dialogTutorial from "../components/dialog_main/tutorial.vue";

import dialogLoading from "src/components/dialog-loading.vue";

import dialogLearningSwipe from "src/components/dialog_main/dialog-learning-swipe.vue";

import dialogSetting from "src/components/dialog_main/setting-dialog.vue";

import { ref, onMounted, onBeforeUnmount, computed, defineComponent } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useSystemStore } from "src/stores/system";

import { funcChangeNameSkill } from "../router";
import { useSynchronizeStore } from "src/stores/synchronize";
import { useCourseStore } from "src/stores/course";

const components = defineComponent({
  learningIcon,
  learningList,
  headerBar,
  nextAndBack,
  backgroundMain,
  dialogLearningSwipe,
  dialogLoading,
  dialogSetting,
  dialogTutorial,
});

// initialize
const $q = useQuasar();
const route = useRoute();
const router = useRouter();

// Store
const courseStore = useCourseStore();
const practiceStore = usePracticeStore();
const systemStore = useSystemStore();
const studentStore = useStudentStore();
const synchronizeStore = useSynchronizeStore();

// Data
const isDesktop = ref($q.platform.is.desktop);
const selectHover = ref(null);
const currentStar = ref(0);
const totalStarReward = ref(0);
const isFirstTutorial = ref(false);
const isStartAnimation = ref(false);

// Boolean
// const isShowDialogSwipe = ref(false);
const isShgowDialogLoading = ref(false);
const isShowDialogSetting = ref(false);
const isShowDialogReview = ref(false);
const isShowDialogTutorial = ref(false);
const isShowDialogLevelExpired = ref(false);

// const funcCloseLearningSwipe = () => {
//   systemStore.funcSetLearningSwipe();
//   isShowDialogSwipe.value = false;
// };

// #region Function

// #region Select Unit
const unitSelected = ref("1");
const funcSelectUnit = (unit) => {
  if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
    courseStore.isShowDialogLevelExpired = false;

    setTimeout(() => {
      courseStore.isShowDialogLevelExpired = true;
    }, 50);

    return;
  }

  isShgowDialogLoading.value = true;
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();
  const practiceStore = usePracticeStore();

  if (studentStore.studentType == "demo" && unit > studentStore.studentDemoUnit) {
    systemStore.systemData.activeState.isShowDialogPackageMenu = true;
    isShgowDialogLoading.value = false;
    return;
  }

  unitSelected.value = unit.value;
  unitSelected.value.toString();

  practiceStore.setPracticeUnit(unitSelected.value.toString());

  setTimeout(() => {
    isShgowDialogLoading.value = false;
  }, 500);

  funcStartAnimation();
};
// #endregion

// #region Scroll to Unit
const funcScrollToUnit = () => {
  setTimeout(() => {
    let el = document.getElementById(`unit-${unitSelected.value}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 25);
};
// #endregion

// #region Next and Back Skill
const funcNextAndBackSkill = (data) => {
  const practiceStore = usePracticeStore();
  const systemStore = useSystemStore();

  practiceStore.setPracticeSkill(data.name);
  // systemStore.setRouter(data.name);

  systemStore.playSoundBackground();

  funcStartAnimation();
};
// #endregion

// #region Go To Practice
const reviewData = ref(null);
const funcGotoPractice = (data) => {
  if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
    courseStore.isShowDialogLevelExpired = false;

    setTimeout(() => {
      courseStore.isShowDialogLevelExpired = true;
    }, 50);

    return;
  }

  if (data.skill == "Listening & Speaking") {
    if (data.practiceType == "multiplechoices(answersound)") {
      let fincConversation = practiceStore.listBySkill.find(
        (x) => x.practiceType == "conversationlesson"
      );

      if (fincConversation) {
        let findLog = practiceStore.log.find(
          (x) => x.practiceListId == fincConversation.id
        );

        if (findLog) {
          let getDate = funcConvertDateTime(findLog);

          if (getDate.hours > 0 || getDate.minutes >= 10) {
            isShowDialogReview.value = true;
            reviewData.value = data;
            return;
          }
        }
      }
    }
  }

  if (data.isDisable) return;

  practiceStore.setPracticeData(data);
  let path = systemStore.callbackPathRouterPractice(data);

  router.replace(path);
};
// #endregion

// #region Convert Date Time
const funcConvertDateTime = (date) => {
  // Create two Date objects

  let timeMilisecond = 0;

  let currentDate = new Date();

  if (date.isLocal) {
    if (date.lastTimestamp == null) {
      timeMilisecond = date.firstTimestamp;
    } else {
      timeMilisecond = date.lastTimestamp;
    }
  } else {
    timeMilisecond = date.lastTimestamp || date.firstTimestamp;
  }

  timeMilisecond = timeMilisecond._seconds * 1000;

  let newDate = new Date(timeMilisecond);

  if (date.isLocal) newDate = `${newDate.toUTCString()}+0700`;

  newDate = new Date(newDate);

  let differenceMs = Math.abs(currentDate - newDate);

  let dayDiff = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
  let hoursDiff = Math.floor(differenceMs / (1000 * 60 * 60));
  let minutesDiff = Math.floor((differenceMs % (1000 * 60 * 60)) / (1000 * 60));
  let secondsDiff = Math.floor((differenceMs % (1000 * 60)) / 1000);

  return {
    day: dayDiff || 0,
    hours: hoursDiff || 0,
    minutes: minutesDiff || 0,
    seconds: secondsDiff || 0,
  };
};
// #endregion

// #region Not Review
const funcNotReview = () => {
  isShowDialogReview.value = false;

  practiceStore.setPracticeData(reviewData.value);
  let path = systemStore.callbackPathRouterPractice(reviewData.value);

  router.replace(path);
};
// #endregion

// #region Next Review
const funcNextReview = () => {
  isShowDialogReview.value = false;

  let findConversation = practiceStore.listBySkill.find(
    (x) => x.practiceType == "conversationlesson"
  );

  practiceStore.setPracticeData(findConversation);
  let path = systemStore.callbackPathRouterPractice(findConversation);

  router.replace(path);
};
// #endregion

// #region Close Tutorial
const funcCloseTutorial = () => {
  isShowDialogTutorial.value = false;
};
// #endregion

// #region Show Tutorial
const funcShowTutorial = () => {
  isShowDialogTutorial.value = true;
};
// #endregion

// #region Back To Practice Skill
const funcBackToPracticeSkill = () => {
  router.replace("/practice/list");
};
// #endregion

// #region Scroll Practice List
const funcScrollPracticeList = (e) => {
  let scroll = document.getElementById("scroll-practice-fake");

  scroll.style.top = "0px";

  if (e.target.scrollTop > 5) {
    scroll.style.top = `${e.target.scrollTop - 5}px`;
    scroll.scrollTop = e.target.scrollTop;
  } else {
    scroll.style.top = `${e.target.scrollTop + 5}px`;
    scroll.scrollTop = e.target.scrollTop;
  }
};
// #endregion

// #region Start Animation
const isPracticeUnitHasScroll = ref(false);
const funcStartAnimation = () => {
  isStartAnimation.value = false;

  setTimeout(() => {
    isStartAnimation.value = true;

    if (!$q.platform.is.desktop) {
      let scrollPractice = document.getElementById("scroll-practice");

      let boxFakeScroll = document.getElementById("scroll-practice-fake");

      let boxDiv = document.getElementById("box-div-fake-scroll");

      if (boxDiv) {
        boxDiv.style.height = `0px`;
      }

      scrollPractice.scrollTop = 0;

      if (scrollPractice.scrollHeight - 5 > scrollPractice.clientHeight + 5) {
        isPracticeUnitHasScroll.value = true;

        if (!boxDiv) {
          boxDiv = document.createElement("div");
          boxDiv.id = "box-div-fake-scroll";
          boxDiv.style.height = `${scrollPractice.scrollHeight}px`;
          boxFakeScroll.appendChild(boxDiv);
        } else {
          boxDiv.style.height = `${scrollPractice.scrollHeight}px`;
        }
      } else {
        isPracticeUnitHasScroll.value = false;

        boxDiv.style.height = `0px`;
      }
    }
  }, 50);
};
// #endregion

// #region Computed

// #region Set Background
const setBackground = computed(() => {
  const practiceStore = usePracticeStore();

  let tempBackground = `background-${practiceStore.currentSkillIsland.nameImage}`;

  return tempBackground;
});
// #endregion

// #region Show Unit Name
const showUnitName = computed(() => {
  const practiceStore = usePracticeStore();

  let name = "";

  let findUnitName = practiceStore.listName[practiceStore.skill].filter(
    (x) => x.unit == practiceStore.unit
  );

  if (findUnitName.length) {
    name = findUnitName[0].nameEng;
  }

  return name;
});
// #endregion

// #region Next Practice
const nextPractice = computed(() => {
  const practiceStore = usePracticeStore();

  let findIndex = practiceStore.skillIsland
    .map((x) => x.name)
    .indexOf(practiceStore.skill);

  let nextWorld = "";
  if (findIndex + 1 === practiceStore.skillIsland.length) {
    nextWorld = practiceStore.skillIsland[0];
  } else {
    nextWorld = practiceStore.skillIsland[findIndex + 1];
  }

  return nextWorld;
});
// #endregion

// #region Back Practice
const backPractice = computed(() => {
  const practiceStore = usePracticeStore();

  let findIndex = practiceStore.skillIsland
    .map((x) => x.name)
    .indexOf(practiceStore.skill);

  let backWorld = "";
  if (findIndex === 0) {
    backWorld = practiceStore.skillIsland[practiceStore.skillIsland.length - 1];
  } else {
    backWorld = practiceStore.skillIsland[findIndex - 1];
  }

  return backWorld;
});
// #endregion

// #endregion

onMounted(async () => {
  const systemStore = useSystemStore();

  systemStore.setRouter("practice-unit");

  unitSelected.value = practiceStore.unit;

  let isCheckTutorial = systemStore.checkFirstTutorial("practice-unit");

  if (!synchronizeStore.isSync) {
    if (isCheckTutorial) {
      isShowDialogTutorial.value = true;
    }
  }

  funcStartAnimation();
});

onBeforeUnmount(() => {
  // document.removeEventListener("load", eventScroll);
});
</script>

<style lang="scss" scoped>
// #region Background main
.background-container-desktop {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  // background-image: url("/images/background_main/background-gacha-pon.png");
  // background-size: cover;
  // background-position: center;
  overflow: hidden;
  margin: auto;
}
// #endregion

// #region Box
.background-practice-mobile {
  width: 100%;
  min-width: 360px;
  background-image: url("/images/background_main/background-practice-list-2.png");
  background-size: cover;
  background-position: 30% 0%;
  background-origin: border-box;
}

.background-practice {
  width: 100%;
  min-width: 1000px;
  position: relative;
  background-image: url("/images/background_main/backdrop-lobby.png");
  background-size: cover;
  background-position: center;
}

.box-header-main {
  width: 100%;
  padding: 0.7%;
}

.box-dialog-main {
  width: 322px;
  padding: 8px;
  background-color: #f2c043;
  border: 2px solid #4a261b;
  border-radius: 16px;
}

.box-dialog-main .sub-dialog-main {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #f6f3d3;
  padding: 16px;
}

.sub-dialog-main .title-review {
  color: #4a261b;
  font-size: 20px;
}

.sub-dialog-main .box-content-review {
  border-radius: 8px;
  padding: 12px 0px;
  background: #efd080;
  margin: 16px 0px;
  font-size: 16px;
}

.box-badge-first-time {
  right: 1%;
  bottom: 0%;
  width: 55%;

  &.mobile {
    width: 84px;
    right: 6px;
    bottom: 10px;
  }
}

.box-tooltip-main {
  top: 0%;
  max-width: 360px;
  width: 250%;
  padding: 3.75%;
  border-radius: clamp(7.5px, 0.75vw, 12px);
  border: clamp(2.5px, 0.25vw, 4px) solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px clamp(2.5px, 0.25vw, 4px) 0px rgba(0, 0, 0, 0.25);
  cursor: default;

  &.mobile {
    max-width: 300px;
    width: 100%;
    border-radius: 12px;
    border: 4px solid #4a261b;
    padding: 6px;
    background: #f1bf43;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  }

  & .sub-tooltip {
    width: 100%;
    height: 100%;
    border-radius: clamp(7.5px, 0.75vw, 12px);
    padding: clamp(7.5px, 0.75vw, 12px) clamp(3.75px, 0.375vw, 6px)
      clamp(1.25px, 0.125vw, 2px);
    background: #ffedc4;
    box-shadow: 0px 0px clamp(2.5px, 0.25vw, 4px) 0px rgba(0, 0, 0, 0.25);
    color: #4a261b;

    &.mobile {
      border-radius: 12px;
      padding: 12px 8px 6px;
      background: #ffedc4;
      box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    }

    & .text-header-tooltip {
      width: fit-content;
      font-size: clamp(12.5px, 1.25vw, 20px);

      &.mobile {
        font-size: 16px;
      }
    }

    & .box-tooltip-counter {
      padding: clamp(3.125px, 0.3125vw, 5px) clamp(6.875px, 0.6875vw, 11px)
        clamp(3.125px, 0.3125vw, 5px) clamp(6.875px, 0.6875vw, 11px);
      border-radius: clamp(46.406px, 4.6406vw, 74.25px);
      border: clamp(1px, 0.625vw, 1.5px) solid #512a08;
      background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
      color: #512a08;
      text-align: center;
      text-shadow: rgb(255, 255, 255) 1px 0px 0px,
        rgb(255, 255, 255) 0.540302px 0.841471px 0px,
        rgb(255, 255, 255) -0.416147px 0.909297px 0px,
        rgb(255, 255, 255) -0.989992px 0.14112px 0px,
        rgb(255, 255, 255) -0.653644px -0.756802px 0px,
        rgb(255, 255, 255) 0.283662px -0.958924px 0px,
        rgb(255, 255, 255) 0.96017px -0.279415px 0px;
      font-size: clamp(7.5px, 0.75vw, 12px);
      margin-left: 5.358%;
      line-height: 18px;

      &.mobile {
        max-width: fit-content;
        width: fit-content;
        height: 24px;
        font-size: 10px;
        margin-left: 12px;
        border-radius: 59.4px;
        border: 1.2px solid #512a08;
        padding: 3.5px 8px 0.5px 8px;
      }

      & .text-counter {
        position: relative;
        margin: 0px clamp(0.95px, 0.095vw, 1.52px);

        &.text-finish {
          color: #f00;
        }

        &.mobile {
          margin: 0 0px;
        }
      }
    }

    & .text-tooltip-validate {
      font-size: clamp(10px, 1vw, 16px);

      &.mobile {
        font-size: 12px;
      }
    }
  }
}

.box-header-main-mobile {
  width: 100%;
  height: 21%;
  padding: 12px 8px;

  & .box-button-back {
    width: 35px;
  }

  & .box-button-setting {
    width: 35px;
  }

  & .box-button-home {
    width: 35px;
  }
}

.box-body-main-mobile {
  width: 100%;
  max-width: 1600px;
  min-width: 360px;
  padding: 8px 0px;
  height: 69%;
  margin: auto;
  overflow: auto;

  & .box-item-learn {
    max-width: 360px;
    margin: auto;
  }

  &::-webkit-scrollbar {
    width: 0px;
  }

  // &::-webkit-scrollbar-track {
  //   // background: #efd080;
  //   // border-radius: 0px 20px 20px 0px;
  // }

  &::-webkit-scrollbar-thumb {
    background-color: #4a261b;
    // border: 3px solid #efd080;
    // border-radius: 20px;
  }

  & .box-scroll-fake {
    top: 5px;
    right: 4px;
    width: 11px;
    height: 100%;
    border-radius: 10px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      // border: 1px solid #4a261b;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      border: 1px solid #4a261b;
      background: #ffce4e;
    }
  }

  & .box-name-practice {
    width: 65%;
    top: 35%;
    left: 28%;
    color: #fff;
    padding: 8px 16px;
    text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
      rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
      rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
      rgb(0, 0, 0) 0.96017px -0.279415px 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .box-num-of-practice {
    bottom: 10px;
    left: 29px;
    width: fit-content;
    height: 24px;
    padding: 4px 7px 1px 7px;
    color: #512a08;
    border-radius: 74.25px;
    border: 1.5px solid #512a08;
    background: var(--Primary, linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%));
    text-shadow: rgb(255, 255, 255) 1px 0px 0px,
      rgb(255, 255, 255) 0.540302px 0.841471px 0px,
      rgb(255, 255, 255) -0.416147px 0.909297px 0px,
      rgb(255, 255, 255) -0.989992px 0.14112px 0px,
      rgb(255, 255, 255) -0.653644px -0.756802px 0px,
      rgb(255, 255, 255) 0.283662px -0.958924px 0px,
      rgb(255, 255, 255) 0.96017px -0.279415px 0px;

    & .text-finish {
      color: #f00;
    }
  }

  & .box-number-practice {
    width: 70px;
    top: 20%;
    left: 30px;
    font-size: 48px;
    color: #fff;
    text-shadow: rgb(0, 31, 78) 4px 0px 0px, rgb(0, 31, 78) 3.87565px 0.989616px 0px,
      rgb(0, 31, 78) 3.51033px 1.9177px 0px, rgb(0, 31, 78) 2.92676px 2.72656px 0px,
      rgb(0, 31, 78) 2.16121px 3.36588px 0px, rgb(0, 31, 78) 1.26129px 3.79594px 0px,
      rgb(0, 31, 78) 0.282949px 3.98998px 0px, rgb(0, 31, 78) -0.712984px 3.93594px 0px,
      rgb(0, 31, 78) -1.66459px 3.63719px 0px, rgb(0, 31, 78) -2.51269px 3.11229px 0px,
      rgb(0, 31, 78) -3.20457px 2.39389px 0px, rgb(0, 31, 78) -3.69721px 1.52664px 0px,
      rgb(0, 31, 78) -3.95997px 0.56448px 0px, rgb(0, 31, 78) -3.97652px -0.432781px 0px,
      rgb(0, 31, 78) -3.74583px -1.40313px 0px, rgb(0, 31, 78) -3.28224px -2.28625px 0px,
      rgb(0, 31, 78) -2.61457px -3.02721px 0px, rgb(0, 31, 78) -1.78435px -3.57996px 0px,
      rgb(0, 31, 78) -0.843183px -3.91012px 0px, rgb(0, 31, 78) 0.150409px -3.99717px 0px,
      rgb(0, 31, 78) 1.13465px -3.8357px 0px, rgb(0, 31, 78) 2.04834px -3.43574px 0px,
      rgb(0, 31, 78) 2.83468px -2.82216px 0px, rgb(0, 31, 78) 3.44477px -2.03312px 0px,
      rgb(0, 31, 78) 3.84068px -1.11766px 0px, rgb(0, 31, 78) 3.9978px -0.132717px 0px;

    &.lock {
      text-shadow: rgb(32, 46, 48) 4px 0px 0px, rgb(32, 46, 48) 3.87565px 0.989616px 0px,
        rgb(32, 46, 48) 3.51033px 1.9177px 0px, rgb(32, 46, 48) 2.92676px 2.72656px 0px,
        rgb(32, 46, 48) 2.16121px 3.36588px 0px, rgb(32, 46, 48) 1.26129px 3.79594px 0px,
        rgb(32, 46, 48) 0.282949px 3.98998px 0px,
        rgb(32, 46, 48) -0.712984px 3.93594px 0px,
        rgb(32, 46, 48) -1.66459px 3.63719px 0px, rgb(32, 46, 48) -2.51269px 3.11229px 0px,
        rgb(32, 46, 48) -3.20457px 2.39389px 0px, rgb(32, 46, 48) -3.69721px 1.52664px 0px,
        rgb(32, 46, 48) -3.95997px 0.56448px 0px,
        rgb(32, 46, 48) -3.97652px -0.432781px 0px,
        rgb(32, 46, 48) -3.74583px -1.40313px 0px,
        rgb(32, 46, 48) -3.28224px -2.28625px 0px,
        rgb(32, 46, 48) -2.61457px -3.02721px 0px,
        rgb(32, 46, 48) -1.78435px -3.57996px 0px,
        rgb(32, 46, 48) -0.843183px -3.91012px 0px,
        rgb(32, 46, 48) 0.150409px -3.99717px 0px, rgb(32, 46, 48) 1.13465px -3.8357px 0px,
        rgb(32, 46, 48) 2.04834px -3.43574px 0px, rgb(32, 46, 48) 2.83468px -2.82216px 0px,
        rgb(32, 46, 48) 3.44477px -2.03312px 0px, rgb(32, 46, 48) 3.84068px -1.11766px 0px,
        rgb(32, 46, 48) 3.9978px -0.132717px 0px;
    }

    &.pass {
      text-shadow: rgb(30, 61, 0) 4px 0px 0px, rgb(30, 61, 0) 3.87565px 0.989616px 0px,
        rgb(30, 61, 0) 3.51033px 1.9177px 0px, rgb(30, 61, 0) 2.92676px 2.72656px 0px,
        rgb(30, 61, 0) 2.16121px 3.36588px 0px, rgb(30, 61, 0) 1.26129px 3.79594px 0px,
        rgb(30, 61, 0) 0.282949px 3.98998px 0px, rgb(30, 61, 0) -0.712984px 3.93594px 0px,
        rgb(30, 61, 0) -1.66459px 3.63719px 0px, rgb(30, 61, 0) -2.51269px 3.11229px 0px,
        rgb(30, 61, 0) -3.20457px 2.39389px 0px, rgb(30, 61, 0) -3.69721px 1.52664px 0px,
        rgb(30, 61, 0) -3.95997px 0.56448px 0px, rgb(30, 61, 0) -3.97652px -0.432781px 0px,
        rgb(30, 61, 0) -3.74583px -1.40313px 0px, rgb(30, 61, 0) -3.28224px -2.28625px 0px,
        rgb(30, 61, 0) -2.61457px -3.02721px 0px, rgb(30, 61, 0) -1.78435px -3.57996px 0px,
        rgb(30, 61, 0) -0.843183px -3.91012px 0px,
        rgb(30, 61, 0) 0.150409px -3.99717px 0px, rgb(30, 61, 0) 1.13465px -3.8357px 0px,
        rgb(30, 61, 0) 2.04834px -3.43574px 0px, rgb(30, 61, 0) 2.83468px -2.82216px 0px,
        rgb(30, 61, 0) 3.44477px -2.03312px 0px, rgb(30, 61, 0) 3.84068px -1.11766px 0px,
        rgb(30, 61, 0) 3.9978px -0.132717px 0px;
    }
  }
}

.box-button-unit-mobile {
  width: 100px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  padding-bottom: 4px;
  margin-top: 23px;

  & .sub-button-unit-mobile {
    width: 100%;
    height: 100%;
    padding: 0px 6px 0px 10px;
    border-radius: 9px;
    background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  }
}

.box-footer-main-mobile {
  width: 100%;
  height: 10%;
  padding: 8px 8px;
}
// #endregion

// #region Button Main

.button-active-main {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
  cursor: pointer;
}

.button-active-main:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
}

.button-active-main.button-back {
  width: 3.17%;
}

.button-active-main.button-info {
  width: 1.268%;
}

.button-active-main.button-setting {
  width: 3.17%;
  margin: 0% 0.7%;
}

.button-active-main.button-home {
  width: 3.17%;
}

.button-main {
  cursor: pointer;
  border: 0px solid transparent;
  transform: scale(1);
}

.button-main:active {
  transform: scale(0.95);
}

.button-main.button-back {
  top: 40%;
  left: 0;
  width: 10.9375%;

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-back:hover,
.button-next:hover {
  transform: scale(1.1);
  transition: 0.2s;

  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);

  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-main.button-next {
  top: 40%;
  right: 0;
  width: 10.9375%;

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;
}

.button-active-main.button-review-again {
  width: 270px;
  height: 50px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #69199c;
  font-size: 16px;
  color: #fff;
  line-height: 0;
}

.button-review-again::before,
.button-go-practice::before {
  content: "";
  position: absolute;
  top: 10%;
  left: 1.3%;
  width: 5%;
  max-width: 14.47px;
  height: 10%;
  max-height: 5.57px;
  transform: rotate(-34.053deg);
  flex-shrink: 0;
  background-color: #fff;
  opacity: 0.5;
  border-radius: 1rem 1rem 0rem 0rem;
  z-index: 1;
}

.button-review-again::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 92%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ba46f3 0%, #a532ea 100%);
}

.button-active-main.button-go-practice {
  width: 270px;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background: #db8200;
  font-size: 16px;
  color: #4a261b;
  line-height: 0;
}

.button-go-practice::after {
  content: "";
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 100%;
  height: 92%;
  border-radius: 9px;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
}

// #endregion

// #region Icon Learn Number
.item {
  transform: scale(1);
}

.item:has(.cursor-pointer):hover {
  transform: scale(1.1);
  transition: 0.2s;

  -webkit-transform: scale(1.1);
  -webkit-transition: 0.2s;
}

.text-color {
  color: #4a261b;
}

.box-star-container-mobile {
  top: 0px;
  left: 15px;
  width: 108.167px;
}

.box-star-main {
  position: absolute;
  width: 33.64%;

  &.mobile {
    // width: 100%;

    &.left {
      top: 9px;
      left: 5px;
    }

    &.center {
      top: 1px;
      left: 50%;
      transform: translateX(-50%);
    }

    &.right {
      top: 9px;
      left: 103px;
      transform: translateX(-100%);
    }
  }

  &.left {
    top: 7%;
    left: 5%;
  }

  &.center {
    left: 50%;
    transform: translateX(-50%);
  }

  &.right {
    top: 7%;
    left: 95%;
    transform: translateX(-100%);
  }
}

.box-icon-learn-number {
  bottom: 55%;
  left: 50%;
  transform: translate(-50%, 0%);
  line-height: 0;
}

.text-icon-learn {
  color: #fff;
  text-shadow: rgb(0, 31, 78) 5px 0px 0px, rgb(0, 31, 78) 4.90033px 0.993347px 0px,
    rgb(0, 31, 78) 4.60531px 1.94709px 0px, rgb(0, 31, 78) 4.12668px 2.82321px 0px,
    rgb(0, 31, 78) 3.48353px 3.58678px 0px, rgb(0, 31, 78) 2.70151px 4.20736px 0px,
    rgb(0, 31, 78) 1.81179px 4.6602px 0px, rgb(0, 31, 78) 0.849836px 4.92725px 0px,
    rgb(0, 31, 78) -0.145998px 4.99787px 0px, rgb(0, 31, 78) -1.13601px 4.86924px 0px,
    rgb(0, 31, 78) -2.08073px 4.54649px 0px, rgb(0, 31, 78) -2.94251px 4.04248px 0px,
    rgb(0, 31, 78) -3.68697px 3.37732px 0px, rgb(0, 31, 78) -4.28444px 2.57751px 0px,
    rgb(0, 31, 78) -4.71111px 1.67494px 0px, rgb(0, 31, 78) -4.94996px 0.7056px 0px,
    rgb(0, 31, 78) -4.99147px -0.291871px 0px, rgb(0, 31, 78) -4.83399px -1.27771px 0px,
    rgb(0, 31, 78) -4.48379px -2.2126px 0px, rgb(0, 31, 78) -3.95484px -3.05929px 0px,
    rgb(0, 31, 78) -3.26822px -3.78401px 0px, rgb(0, 31, 78) -2.4513px -4.35788px 0px,
    rgb(0, 31, 78) -1.53666px -4.75801px 0px, rgb(0, 31, 78) -0.560763px -4.96845px 0px,
    rgb(0, 31, 78) 0.437495px -4.98082px 0px, rgb(0, 31, 78) 1.41831px -4.79462px 0px,
    rgb(0, 31, 78) 2.34258px -4.41727px 0px, rgb(0, 31, 78) 3.17346px -3.86382px 0px,
    rgb(0, 31, 78) 3.87783px -3.15633px 0px, rgb(0, 31, 78) 4.4276px -2.32301px 0px,
    rgb(0, 31, 78) 4.80085px -1.39708px 0px, rgb(0, 31, 78) 4.98271px -0.415447px 0px;
}

// #endregion

// #region Header
.text-title-header {
  width: fit-content;
  font-size: clamp(26px, 2.5vw, 40px);
  color: #fff;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px,
    rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px,
    rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px,
    rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px,
    rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px,
    rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px,
    rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px,
    rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px,
    rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px,
    rgb(0, 0, 0) 2.88051px -0.838247px 0px;
  font-family: fredoka;
  line-height: 1;
  white-space: nowrap;
  margin: 0% 0.5%;
}

.text-unit {
  color: #4a261b;
  font-size: clamp(10px, 1vw, 16px);
}

.text-unit-content {
  font-size: clamp(14px, 1.4vw, 24px);
  color: #fff;
  white-space: nowrap;
  padding-left: 3%;
}

.box-button-unit {
  width: 6.25%;
  top: 10%;
  left: 3%;
  cursor: pointer;
}

.button-select-level-and-unit {
  top: 9.2%;
  left: 1%;
  min-width: 10%;
  max-width: fit-content;
  padding: 0.7% 2% 0.7% 8.5%;
  border-radius: 2.7rem;
  background-color: rgba(0, 0, 0, 0.5);
  border: 3px solid #4a261b;
}

.button-select-level-and-unit::after {
  content: " ";
  position: absolute;
  top: 10px;
  left: 7px;
  background-color: #fff;
  width: 3%;
  height: 10%;
  transform: rotate(-48deg);
  opacity: 1;
  border-radius: 50px 50px 10px 10px;
}

.box-icon-arrow-down {
  width: 17.87%;
  margin-top: -6%;
}

.box-menu-select-level-and-unit-container {
  width: 100%;
  min-width: 100px;
  height: 200px;
  border-radius: 5px;
  border: 0.15rem solid #4a261b;
  background-color: #f6f3d3;
  font-size: clamp(10px, 1vw, 14px);
  font-family: Mali-M;
  padding: 2%;
  overflow: auto;

  &.mobile {
    font-size: 14px;
  }
}

.box-item-menu {
  padding: 9% 5%;
  margin: 1.5% 0%;
  transition: 0.1s;
  border-radius: 4px;
  color: #4a261b;
}

.box-item-menu.not-active:hover {
  position: relative;
  background-color: #f6f3d3;
  color: #4a261b;
}

.box-item-menu.not-active:hover::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.box-item-menu.success {
  background-color: #85dd5c;
  color: #4a261b;
}

.box-item-menu.success:hover {
  background-color: #c1ecad;
  color: #4a261b;
}

.box-item-menu.success.active-menu {
  background-color: #247200;
  color: #fff;
}

.box-item-menu.active-menu {
  background-color: #4a261b;
  color: #fff;
}

// #endregion

// #region Text
.text-skill-unit {
  color: #fff;
  text-shadow: rgb(0, 0, 0) 3px 0px 0px, rgb(0, 0, 0) 2.83487px 0.981584px 0px,
    rgb(0, 0, 0) 2.35766px 1.85511px 0px, rgb(0, 0, 0) 1.62091px 2.52441px 0px,
    rgb(0, 0, 0) 0.705713px 2.91581px 0px, rgb(0, 0, 0) -0.287171px 2.98622px 0px,
    rgb(0, 0, 0) -1.24844px 2.72789px 0px, rgb(0, 0, 0) -2.07227px 2.16926px 0px,
    rgb(0, 0, 0) -2.66798px 1.37182px 0px, rgb(0, 0, 0) -2.96998px 0.42336px 0px,
    rgb(0, 0, 0) -2.94502px -0.571704px 0px, rgb(0, 0, 0) -2.59586px -1.50383px 0px,
    rgb(0, 0, 0) -1.96093px -2.27041px 0px, rgb(0, 0, 0) -1.11013px -2.78704px 0px,
    rgb(0, 0, 0) -0.137119px -2.99686px 0px, rgb(0, 0, 0) 0.850987px -2.87677px 0px,
    rgb(0, 0, 0) 1.74541px -2.43999px 0px, rgb(0, 0, 0) 2.44769px -1.73459px 0px,
    rgb(0, 0, 0) 2.88051px -0.838247px 0px;
}
// #endregion

// #region Old Css
.background-bar {
  width: 200%;
  height: 50px;
  z-index: 1;
}

.box-menu-list-mobile {
  position: relative;
  max-width: 1000px;
  width: 100%;
  height: 100vh;
  margin: auto;
}

.background-bar[skill="Vocabulary"] {
  background-image: url("/images/background_main/backdrop-vocabulary-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Reading"] {
  background-image: url("/images/background_main/backdrop-reading-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Writing"] {
  background-image: url("/images/background_main/backdrop-writing-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.background-bar[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.container-scroll {
  position: relative;
  width: 100%;
  height: 200px;
  user-select: none;
  // cursor: pointer;
  box-sizing: inherit;
  overflow: auto;
}

.container-scroll[skill="Vocabulary"] {
  background-image: url("/images/background_main/backdrop-vocabulary.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Reading"] {
  background-image: url("/images/background_main/backdrop-reading.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Writing"] {
  background-image: url("/images/background_main/backdrop-writing.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics.png");
  background-repeat: no-repeat;
  background-size: cover;
}
.container-scroll[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening.png");
  background-repeat: no-repeat;
  background-size: cover;
}

.container-scroll-mobile {
  position: relative;
  height: calc(100vh - 100px);
  background-size: cover;
  overflow: hidden;
}

.container-scroll-mobile[skill="Vocabulary"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-vocabulary.png");
}
.container-scroll-mobile[skill="Grammar"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-grammar.png");
}

.container-scroll-mobile[skill="Reading"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-reading.png");
}

.container-scroll-mobile[skill="Writing"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-writing.png");
}

.container-scroll-mobile[skill="Phonics"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-phonics.png");
}

.container-scroll-mobile[skill="Listening"] {
  background-repeat: no-repeat;
  background-image: url("/images/background_main/background-listening.png");
}

.container-main-skill {
  position: relative;
  min-width: 1000px;
  width: 100%;
  max-width: 1600px;
  margin: auto;
  overflow: auto;
  // cursor: grab;
  z-index: 1;
}

.container-main-skill[skill="Vocabulary"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-vocabulary.png");
}
.container-main-skill[skill="Grammar"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-grammar.png");
}
.container-main-skill[skill="Reading"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-reading.png");
}
.container-main-skill[skill="Writing"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-writing.png");
}
.container-main-skill[skill="Phonics"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-phonics.png");
}
.container-main-skill[skill="Listening"] {
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("/images/background_main/background-listening.png");
}

.background-bar-mobile {
  position: relative;
  background-size: contain;
  background-position: left;
  background-origin: content-box;
  width: 4800px;
  height: 50px;
}

.background-bar-mobile[skill="Vocabulary"] {
  background-image: url("/images/background_main/backdrop-vocabulary-bar.png");
}
.background-bar-mobile[skill="Grammar"] {
  background-image: url("/images/background_main/backdrop-grammar-bar.png");
}
.background-bar-mobile[skill="Reading"] {
  background-image: url("/images/background_main/backdrop-reading-bar.png");
}
.background-bar-mobile[skill="Writing"] {
  background-image: url("/images/background_main/backdrop-writing-bar.png");
}
.background-bar-mobile[skill="Phonics"] {
  background-image: url("/images/background_main/backdrop-phonics-bar.png");
}
.background-bar-mobile[skill="Listening"] {
  background-image: url("/images/background_main/backdrop-listening-bar.png");
}

.container-main-skill:active {
  // cursor: grabbing;
  cursor: -webkit-grabbing;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.box-lock-content {
  min-width: 320px;
  background-color: #f2c043;
  border: 2px solid #4a261b;
  border-radius: 16px;
  padding: 7px;
}

.box-lock-content-sub {
  background-color: #f6f3d3;
  padding: 15px;
  border-radius: 8px;
  color: #4a261b;
}

// #endregion

// #region Animation
.animation-show-icon {
  animation: showIcon 0.3s forwards;
  -webkit-animation: showIcon 0.3s forwards;
  -moz-animation: showIcon 0.3s forwards;

  transform: scale(0);
  -webkit-transform: scale(0);
  -moz-transform: scale(0);
  transform-origin: center;
  -webkit-transform-origin: center;
  -moz-transform-origin: center;

  @keyframes showIcon {
    0% {
      transform: scale(0);
      -webkit-transform: scale(0);
      -moz-transform: scale(0);
    }
    10% {
      transform: scale(1.1);
      -webkit-transform: scale(1.1);
      -moz-transform: scale(1.1);
    }
    50% {
      transform: scale(0.7);
      -webkit-transform: scale(0.7);
      -moz-transform: scale(0.7);
    }
    100% {
      transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
}

.animation-hide-icon {
  transform: scale(0);
  transform-origin: center;
  transition: 0.1s;
}

.animation-star {
  animation: showStar 0.3s ease-in forwards;
  transform: scale(0);
  transform-origin: center;

  @keyframes showStar {
    0% {
      transform: scale(0);
    }
    10% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(0.7);
    }
    100% {
      transform: scale(1);
    }
  }
}

.animation-hover {
  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);

  transition: 0.2s;
  -webkit-transition: 0.2s;
  -moz-transition: 0.2s;

  &:hover {
    transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -moz-transform: scale(0.95);
  }
}
// #endregion
</style>
