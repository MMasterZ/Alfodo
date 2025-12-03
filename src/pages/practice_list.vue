<template>
  <q-page :class="$q.platform.is.desktop
      ? 'background-practice-list'
      : 'background-practice-list-mobile'
    " class="row justify-center items-center">
    <!-- #region animation bar -->
    <div>
      <div class="fixed-top">
        <div
          :class="$q.platform.is.desktop ? 'background-bar' : 'background-bar-mobile'"></div>
      </div>

      <div class="fixed-bottom">
        <div
          :class="$q.platform.is.desktop ? 'background-bar' : 'background-bar-mobile'"></div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Desktop -->
    <div class="relative-position background-container-desktop" style="overflow: hidden" v-if="$q.platform.is.desktop">
      <!-- #region Background main -->
      <background-main></background-main>
      <!-- #endregion -->

      <!-- #region Skill Island -->
      <div class="absolute" :style="`width:23.75%;${item.position}`" v-for="(item, index) in practiceStore.skillIsland">
        <div class="relative-position animate__animated animate__zoomIn animation-duration-0-5s"
          :style="`animation-delay:0.${(index + 1) * 10}s`">
          <q-img class="box-button-active" @click="funcGotoSkill(item)" :src="`/images/practice_list/island-${item.nameImage}${item.isLock ? '-lock' : ''
            }.png`" no-spinner no-transition :class="item.isLock ? 'cursor-inherit' : ''">
            <div class="no-padding fit transparent no-padding">
              <div class="absolute-center label-skill-island">
                <q-img :src="`/images/practice_list/label-${item.nameImage}${practiceStore.currentTotalLearningPracticeBySkillAndUnit[item.name]
                    .total ==
                    practiceStore.currentTotalAllPracticeBySkillAndUnit[item.name].total
                    ? '-pass'
                    : ''
                  }.png`" class="relative-position" style="z-index: 2" no-spinner no-transition v-if="!item.isLock">
                  <div class="fit transparent no-padding">
                    <div class="absolute-center font-fredoka text-total-learning-practice" push>
                      <div class="animate__animated animate__bounceIn animation-duration-0-5s">
                        {{
                          `${practiceStore.currentTotalLearningPracticeBySkillAndUnit[
                            item.name
                          ].total
                          }/${practiceStore.currentTotalAllPracticeBySkillAndUnit[item.name]
                            .total
                          }`
                        }}
                      </div>
                    </div>
                  </div>
                </q-img>
                <q-img v-else :src="`/images/practice_list/label-${item.nameImage}${item.isLock ? '-lock' : ''
                  }.png`" no-spinner no-transition></q-img>
              </div>

              <div class="absolute-center label-skill-island-content" v-if="item.isLock">
                <div class="font-mali-b" v-html="item.textValidate"></div>
              </div>
            </div>
          </q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Header bar -->

      <!-- #region Button Home -->
      <div class="absolute-top-left box-button-home">
        <div class="relative-position animate__animated animate__fadeInLeft animation-duration-0-5s">
          <q-img class="button-active-main" src="/images/icon_main/home-button.png" no-spinner no-transition
            @click="funcGoToHome()"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Box Select Level And Unit -->
      <div class="absolute-top-right" style="
          margin-top: 1%;
          margin-right: 5.5%;
          min-width: 246px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transition: width 0.1s;
        " :style="`${isExpandBoxPractice ? 'width: 432px;' : 'width: 22.5%; height:160px;'
          }`">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s" style="
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            height: 160px;
          ">
          <!-- หัวข้อ: เลือกบทเรียน -->
          <div style="
              display: flex;
              padding: 14px 8px 6px 8px;
              justify-content: center;
              align-items: center;
              align-self: stretch;
              border-radius: 12px 12px 0px 0px;
              background: #4a261b;
              color: #ffffff;
            " class="font-mali-m f16">
            เลือกบทเรียน
          </div>

          <!-- Body -->
          <div style="
              display: flex;
              padding: 0px 8px 8px 8px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 4px;
              align-self: stretch;
              border-radius: 0px 0px 12px 12px;
              border-right: 2px solid #4a261b;
              border-bottom: 2px solid #4a261b;
              border-left: 2px solid #4a261b;
              background: #984510;
            ">
            <div style="
                display: flex;
                padding-top: 8px;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
                align-self: stretch;
              ">
              <!-- content -->
              <div style="display: flex; align-items: center; gap: 4px; align-self: stretch">
                <div style="display: flex; align-items: center; gap: 4px; flex: 1 0 0">
                  <!-- circle -->
                  <div style="
                      position: relative;
                      display: flex;
                      padding: 1px;
                      justify-content: center;
                      align-items: center;
                      width: 15.39%;
                    ">
                    <!-- style="width: 100%; height: 100%; max-width: 48px; max-height: 48px" -->

                    <q-circular-progress :value="practiceStore.currentProgressThisLevel.progress" :thickness="0.3984"
                      track-color="white" class="circleColor absolute-center">
                    </q-circular-progress>
                    <div style="display: flex; align-items: center; line-height: 24px"
                      class="font-mali-b label-progress-circle absolute-center">
                      <div style="font-size: clamp(12px, 0.2vw, 16px)">
                        {{ practiceStore.currentProgressThisLevel.progress }}
                      </div>
                      <div style="margin-left: 3px; font-size: clamp(8px, 1vw, 12px)">
                        %
                      </div>
                    </div>

                    <q-tooltip class="bg-transparent" :offset="[89, -69]" style="height: 48px; color: #4a261b">
                      <div style="
                          display: inline-flex;
                          padding: 4px 8px;
                          justify-content: center;
                          align-items: center;
                          border-radius: 999px;
                          background: #ffedc4;
                        ">
                        <div style="padding: 4px 8px" class="font-mali-sb f10">
                          ความก้าวหน้าระดับ Level {{ levelSelected }}
                        </div>
                        <div class="absolute" style="bottom: 0px">
                          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11"
                            fill="none">
                            <path
                              d="M7.36603 10.5C6.98112 11.1667 6.01887 11.1667 5.63397 10.5L0.437822 1.5C0.0529222 0.833331 0.534048 -1.22094e-06 1.30385 -1.15364e-06L11.6962 -2.4512e-07C12.466 -1.77822e-07 12.9471 0.833333 12.5622 1.5L7.36603 10.5Z"
                              fill="#FFEDC4" />
                          </svg>
                        </div>
                      </div>
                    </q-tooltip>
                  </div>

                  <!-- level & unit -->
                  <div class="row items-center justify-between full-width">
                    <!-- Level Selected -->
                    <div :class="`${studentStore.studentType == 'school' ? 'cursor-inherit' : ''
                      } ${isExpandBoxPractice
                        ? 'button-select-level-and-unit-expanded'
                        : 'button-select-level-and-unit'
                      }`" style="margin-left: 4px">
                      <div class="relative-position">
                        <div style="
                            display: flex;
                            min-height: 32px;
                            max-height: 40px;
                            height: 2.44cqw;
                            padding: 8px 12px;
                            justify-content: space-between;
                            align-items: center;
                            align-self: stretch;
                            border-radius: 10px;
                            border: 1px solid #4a261b;
                            background: #fff;
                          "></div>

                        <!-- #region Show Current Level -->
                        <div class="absolute-center row justify-center items-center"
                          style="width: 100%; padding: 0 12px">
                          <div class="col self-center font-mali-sb" style="font-size: clamp(12px, 0.88cqw, 14px)">
                            {{ `${subLevelText} ${levelSelected}` }}
                          </div>
                          <div class="self-center" v-if="studentStore.studentType != 'school'">
                            <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                          </div>
                        </div>
                        <!-- #endregion -->

                        <!-- #region Menu Level -->
                        <q-menu transition-show="jump-down" transition-hide="jump-up"
                          class="relative-position z-max transparent" :offset="[0, 7]" fit
                          v-if="studentStore.studentType != 'school'">
                          <div style="
                              height: fit-content;
                              height: 200px;
                              background: #ffffff;
                              border: 1px solid #4a216b;
                              border-radius: 10px;
                            " class="white-box-list-padding">
                            <q-scroll-area :visible="true" :vertical-thumb-style="{
                              width: '6px',
                              background: '#4a261b',
                              opacity: '1',
                            }" class="full-width full-height">
                              <div clickable v-close-popup
                                class="cursor-pointer row items-center justify-between item-list-level box-item-menu relative-position"
                                :style="{
                                  marginBottom:
                                    indexLevel === practiceStore.levelOptions.length - 1
                                      ? '0px'
                                      : '6px',
                                }" v-for="(
itemLevel, indexLevel
                                ) in courseStore.levelOptions" align="center" :class="itemLevel.isSuccess
                                    ? levelSelected == itemLevel.value
                                      ? 'success active-menu'
                                      : 'success'
                                    : levelSelected == itemLevel.value
                                      ? 'active-menu'
                                      : 'not-active'
                                  " :key="indexLevel" @click="funcSelectLevel(itemLevel)">
                                <div class="self-center font-mali-sb" align="left"
                                  style="font-size: clamp(12px, 0.88cqw, 14px)">
                                  <span> {{ `${subLevelText} ${itemLevel.value}` }}</span>
                                </div>
                                <!-- v-if="itemLevel.isLock" -->
                                <div v-if="itemLevel.isLock" class="self-center"
                                  :class="isExpandBoxPractice ? 'absolute-right' : ''" align="center" :style="{
                                    width: isExpandBoxPractice ? '15px' : '16.26%',
                                    right: isExpandBoxPractice ? '8px' : '',
                                  }">
                                  <q-img src="/images/icon_main/icon-lock-bigger.png" no-spinner no-transition></q-img>
                                </div>
                                <!-- v-if="itemLevel.isSuccess" -->
                                <!-- width: 27.1 -->
                                <div v-if="itemLevel.isSuccess" class="self-center"
                                  :class="isExpandBoxPractice ? 'absolute-right' : ''" align="center" :style="{
                                    width: isExpandBoxPractice ? '15px' : '22%',
                                    marginTop: isExpandBoxPractice ? '' : '-3%',
                                    right: isExpandBoxPractice ? '8px' : '',
                                  }">
                                  <q-img src="/images/icon_main/icon-success-unit.png" no-spinner no-transition></q-img>
                                </div>
                              </div>
                            </q-scroll-area>
                          </div>
                        </q-menu>

                        <!-- v-if="systemStore.activeStatus.isHasUnlockLevel" -->
                        <div v-if="systemStore.activeStatus.isHasUnlockLevel" class="absolute-top-right"
                          :class="!isExpandBoxPractice ? 'box-icon-alert-circle' : ''" :style="`${isExpandBoxPractice
                              ? 'width:5.198%; top: -25%; right: -1%;'
                              : ''
                            }`">
                          <q-img src="/images/icon_main/icon-alert-circle.png" no-spinner no-transition></q-img>
                        </div>
                      </div>
                    </div>

                    <!-- Unit Selected -->
                    <div v-if="!isExpandBoxPractice" class="button-select-level-and-unit">
                      <div class="relative-position">
                        <div style="
                            display: flex;
                            min-height: 32px;
                            max-height: 40px;
                            height: 2.44cqw;
                            padding: 8px 12px;
                            justify-content: space-between;
                            align-items: center;
                            align-self: stretch;
                            border-radius: 10px;
                            border: 1px solid #4a261b;
                            background: #fff;
                          "></div>

                        <!-- #region Show Current Unit -->

                        <div class="absolute-center row justify-center items-center"
                          style="width: 100%; padding: 0 12px">
                          <div class="col self-center font-mali-sb" style="font-size: clamp(12px, 0.88cqw, 14px)">
                            {{ `Unit ${unitSelected}` }}
                          </div>

                          <div class="self-center">
                            <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                          </div>
                        </div>
                        <!-- #endregion -->

                        <!-- #region Menu Unit -->
                        <q-menu transition-show="jump-down" transition-hide="jump-up"
                          class="relative-position z-max transparent" :offset="[0, 7]" fit>
                          <div style="
                              height: fit-content;
                              height: 200px;
                              background: #ffffff;
                              border: 1px solid #4a216b;
                              border-radius: 10px;
                            " class="white-box-list-padding">
                            <q-scroll-area :visible="true" :vertical-thumb-style="{
                              width: '6px',
                              background: '#4a261b',
                              opacity: '1',
                            }" class="full-width full-height">
                              <div clickable v-close-popup
                                class="cursor-pointer row items-center box-item-menu item-list-level" :class="{
                                  'success active-menu':
                                    itemUnit.isSuccess && unitSelected == itemUnit.value,
                                  success: itemUnit.isSuccess,
                                  'active-menu': unitSelected == itemUnit.value,
                                  'not-active':
                                    !itemUnit.isSuccess && unitSelected != itemUnit.value,
                                }" :key="indexUnit" v-for="(itemUnit, indexUnit) in practiceStore.unitOptions"
                                @click="funcSelectUnit(itemUnit)" align="center" :style="{
                                  marginBottom:
                                    indexUnit === practiceStore.unitOptions.length - 1
                                      ? '0px'
                                      : '6px',
                                }">
                                <div class="self-center col font-mali-sb" style="font-size: clamp(12px, 0.88cqw, 14px)"
                                  align="left">
                                  <span>{{ itemUnit.label }}</span>
                                </div>
                                <!-- <div
                                  v-if="itemUnit.isLock"
                                  class="self-center"
                                  :class="isExpandBoxPractice ? 'absolute-right' : ''"
                                  align="center"
                                  :style="{
                                    width: isExpandBoxPractice ? '15px' : '16.26%',
                                    right: isExpandBoxPractice ? '8px' : '',
                                  }"
                                >
                                  <q-img
                                    src="/images/icon_main/icon-lock-bigger.png"
                                    no-spinner
                                    no-transition
                                  ></q-img>
                                </div> -->
                                <div v-if="itemUnit.isSuccess" class="col-1 self-center" align="center"
                                  style="width: 27.78%; margin-top: -3%">
                                  <q-img src="/images/icon_main/icon-success-unit.png" no-spinner no-transition></q-img>
                                </div>
                                <!-- <div
                                  v-if="systemStore.activeStatus.isHasUnlockLevel"
                                  class="absolute-top-right"
                                  :class="
                                    !isExpandBoxPractice ? 'box-icon-alert-circle' : ''
                                  "
                                  :style="`${
                                    isExpandBoxPractice
                                      ? 'width:5.198%; top: -25%; right: -1%;'
                                      : ''
                                  }`"
                                >
                                  <q-img
                                    src="/images/icon_main/icon-alert-circle.png"
                                    no-spinner
                                    no-transition
                                  ></q-img>
                                </div> -->
                              </div>
                            </q-scroll-area>
                          </div>
                        </q-menu>
                        <!-- #endregion -->
                      </div>
                    </div>
                  </div>
                </div>

                <!-- เนื้อหาของ -->
                <div :class="isExpandBoxPractice ? 'box-button-book-expanded' : 'box-button-book'
                  ">
                  <div class="relative-position">
                    <q-img src="/images/button_main/button-practice-book.png" no-spinner no-transition
                      @click="isShowDialogBookOfContent = true" class="button-active-main"></q-img>
                  </div>
                </div>
              </div>

              <!-- Progress bar -->
              <div v-if="!isExpandBoxPractice" class="row full-width">
                <div class="col self-center">
                  <div class="box-practice-progress-buy-unit" :style="`${isExpandBoxPractice ? 'margin-top: 0%;' : 'margin-top: 2%;'
                    }`">
                    <div class="progress-bar" :class="practiceStore.currentProgressByUnit >= 100 ? 'success' : ''"
                      :style="`width:${practiceStore.currentProgressByUnit}%`"></div>
                  </div>
                </div>
                <div class="col-1 self-center text-white font-mali-sb f16" style="width: 20%; max-width: 58px"
                  align="right">
                  {{ `${practiceStore.currentProgressByUnit}%` }}
                </div>
                <q-tooltip class="bg-transparent" :offset="[89, 1]" style="height: 48px; color: #4a261b">
                  <div style="
                      display: inline-flex;
                      padding: 4px 8px;
                      justify-content: center;
                      align-items: center;
                      border-radius: 999px;
                      background: #ffedc4;
                    ">
                    <div style="padding: 4px 8px" class="font-mali-sb f10">
                      ความก้าวหน้าบทเรียน Unit {{ unitSelected }}
                    </div>
                    <div class="absolute" style="top: 0px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path
                          d="M6.13398 0.499999C6.51888 -0.166667 7.48112 -0.166667 7.86603 0.5L13.0622 9.5C13.4471 10.1667 12.966 11 12.1962 11L1.80385 11C1.03405 11 0.552922 10.1667 0.937822 9.5L6.13398 0.499999Z"
                          fill="#FFEDC4" />
                      </svg>
                    </div>
                  </div>
                </q-tooltip>
              </div>

              <!-- รายละเอียดเมื่อกดดูเพิ่มเติม -->
              <div v-if="isExpandBoxPractice" style="
                  margin-top: 6px;
                  display: grid;
                  align-items: center;
                  justify-content: center;
                  gap: 2px;
                  width: 100%;
                  height: 100%;
                  overflow-y: auto;
                  grid-template-columns: repeat(4, 1fr);
                " class="max-height-scrollIn-practice-unit">
                <div @click="funcSelectUnit(item), (isExpandBoxPractice = false)"
                  v-for="(item, index) in practiceStore.unitOptions" :key="index" class="cursor-pointer box-button-unit"
                  :class="unitSelected == index + 1 ? 'selected' : ''">
                  <div :style="unitSelected == index + 1
                      ? 'background: #ffffff; border: 1px solid #DB8200;'
                      : 'background: #ffc42c;  border: 1px solid #db8200;'
                    " style="
                      display: flex;
                      padding: 6px 6px 4px 6px;
                      flex-direction: column;
                      align-items: flex-start;
                      gap: 2px;
                      align-self: stretch;
                      border-radius: 8px;
                    " :class="unitSelected == index + 1 ? 'selected' : ''">
                    <div style="
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        align-self: stretch;
                        justify-content: center;
                      ">
                      <div style="
                          width: 100%;
                          height: 58px;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          border-radius: 4px;
                          background: #4a261b;
                        " class="font-fredoka text-white f16">
                        Unit<span style="margin-left: 8px">{{ item.value }}</span>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; align-self: stretch">
                      <div class="col-12 row full-width">
                        <div class="col self-center">
                          <div class="box-practice-progress-buy-unit" style="height: 8px">
                            <div class="progress-bar" :class="practiceStore.currentProgressThisLevel.unitProgressList[
                                index
                              ] >= 100
                                ? 'success'
                                : ''
                              " :style="`width:${practiceStore.currentProgressThisLevel.unitProgressList[index]}%`">
                            </div>
                          </div>
                        </div>
                        <div class="self-center font-mali-b f12" style="width: 36px" align="right">
                          {{
                            `${practiceStore.currentProgressThisLevel.unitProgressList[index]}%`
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- expanded Button -->
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                align-self: stretch;
              " class="cursor-pointer clickable">
              <q-img class="relative-position" style="width: 100%; height: 100%" :style="`${isExpandBoxPractice
                  ? 'max-height: 30px; margin-top: 4px;'
                  : 'max-height: 24px'
                }`" src="/images/icon_main/expand-level-unit-button.png" no-spinner no-transition
                @click="expandedPracticeUnit()">
                <q-icon :name="isExpandBoxPractice ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                  style="width: 12px; height: 8px; color: #4a261b" class="absolute-center"></q-icon>
              </q-img>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Setting -->
      <div class="absolute-top-right box-button-setting">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s">
          <q-img class="button-active-main" src="/images/icon_main/icon-setting.png" no-spinner no-transition
            @click="isShowDialogSetting = true"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Button Information -->
      <div class="absolute-top-right box-button-information">
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s">
          <q-img src="/images/icon_main/icon-info.png" style="
              width: 100%;
              height: 100%;
              cursor: pointer;
              transition: 0.1s;
              max-width: 36px;
              max-height: 36px;
              min-width: 30px;
              min-height: 30px;
            " no-spinner no-transition @click="isShowDialogTutorial = true"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Practice Details Island -->
      <div class="absolute-center fit row justify-center items-center backdrop z-max"
        v-if="isShowDialogSkillContentByUnit">
        <div class="self-center col-12 box-background-island-main relative-position">
          <!-- #region Label header -->
          <div class="box-label-practice-header">
            <div
              class="relative-position animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-2s">
              <q-img src="/images/label_main/label-practice-header.png" no-spinner no-transition>
                <div class="transparent fit no-padding">
                  <div class="absolute-center text-label-header">
                    <div class="font-fredoka" align="center">
                      {{ `Level ` }}
                      <span class="text-label-yellow">{{
                        `${practiceStore.level} `
                      }}</span>
                      {{ `Unit` }}
                      <span class="text-label-yellow">{{ `${practiceStore.unit}` }}</span>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Image Island -->
          <div class="relative-position animate__animated animate__fadeIn animation-duration-0-5s animate__delay-1s">
            <q-img src="/images/background_main/background-island-details.png" no-spinner no-transition></q-img>

            <div class="absolute box-skill-details-main" v-for="(itemSkillIsland, indexSkillIsland) in skillDataList"
              :key="indexSkillIsland" :style="itemSkillIsland.position">
              <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
                :style="`animation-delay:1.${(indexSkillIsland + 1) * 10}s`">
                <div class="relative-position">
                  <!-- #region Skill Island -->
                  <div class="box-skill-details-container" :id="`skill-island-${itemSkillIsland.skill}`">
                    <div class="text-skill-header font-fredoka" align="center">
                      {{ `${indexSkillIsland + 1}. ${itemSkillIsland.name}` }}
                    </div>
                    <div class="box-skill-content row">
                      <div class="col-1" style="width: 18.49%">
                        <q-img :src="`/images/practice_list/island-${itemSkillIsland.skill}.png`" no-spinner
                          no-transition></q-img>
                      </div>
                      <div class="col font-mali-r text-skill-content" style="padding: 0% 8% 0% 2%">
                        <div>
                          {{
                            `${practiceStore.currentUnitData[itemSkillIsland.skill].nameEng
                            }`
                          }}
                        </div>
                        <div style="margin-top: 3%">
                          {{
                            `${practiceStore.currentUnitData[itemSkillIsland.skill].nameTh
                            }`
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion -->

                  <div style="width: 35.295%" :class="itemSkillIsland.lineAbsolute"
                    :style="itemSkillIsland.linePosition">
                    <q-img :src="`/images/icon_main/icon-line-skill-content-${itemSkillIsland.skill}.png`" no-spinner
                      no-transition></q-img>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- #endregion -->

          <!-- #region Button Close -->
          <div class="absolute-top-right box-button-close">
            <div
              class="relative-position animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img src="/images/icon_main/icon-close.png" no-spinner no-transition class="button-active-main close"
                @click="funcCloseDialogSkillContent()"></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Book Of Content -->
      <div class="absolute-center fit row justify-center items-center backdrop z-max" v-if="isShowDialogBookOfContent">
        <div
          class="self-center col-12 box-book-of-content relative-position animate__animated animate__slideInUp animation-duration-0-5s">
          <!-- #region Book -->

          <div class="relative-position">
            <q-img src="/images/box_main/box-book-of-content.png" no-spinner no-transition></q-img>

            <div class="absolute-center box-practice-skill-container">
              <div
                class="relative-position box-button-select-skill animate__animated animate__fadeIn animation-duration-0-5s animate__delay-2s">
                <q-img src="/images/button_main/button-select-practice-skill.png" no-spinner no-transition></q-img>

                <!-- #region Show Current Skill -->
                <div class="absolute-center row justify-center items-center" style="width: 90%; padding: 0% 3%">
                  <div class="col self-center font-mali-m">
                    {{ `${skillSelected.label}` }}
                  </div>
                  <div class="col-1 box-icon-arrow-down only-skill">
                    <q-img src="/images/icon_main/icon-select-unit-arrow-down.png" no-spinner no-transition></q-img>
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Menu Skill -->
                <q-menu transition-show="jump-down" transition-hide="jump-up"
                  class="relative-position z-max transparent" fit>
                  <div class="box-menu-select-level-and-unit-container" style="height: fit-content; max-height: 200px">
                    <q-list>
                      <div clickable v-close-popup class="box-item-menu cursor-pointer row"
                        v-for="(item, index) in skillOptions" align="left" :class="{
                          'active-menu': skillSelected.value == item.value,
                          'not-active': skillSelected.value != item.value,
                        }" @click="skillSelected = item">
                        <div class="self-center col" align="left">
                          <span>{{ item.label }}</span>
                        </div>
                      </div>
                    </q-list>
                  </div>
                </q-menu>
                <!-- #endregion -->
              </div>

              <!-- #region Content by skill -->
              <div
                class="box-practice-skill-content-container relative-position animate__animated animate__fadeIn animation-duration-0-5s animate__delay-2s">
                <div class="box-practice-skill-content-scroll">
                  <div class="fit">
                    <div class="row" v-for="(item, index) in practiceStore.listName[skillSelected.value]">
                      <div class="col-1" style="width: 10%; margin-right: 1%; padding: 1% 0%">
                        <div class="font-mali-m">
                          {{ `บทที่ ${item.unit}:` }}
                        </div>
                      </div>
                      <div class="col" style="padding: 1%">
                        <span>
                          {{ item.nameEng }}
                        </span>
                        <br />
                        <span>
                          {{ item.nameTh }}
                        </span>
                      </div>
                      <div class="col-12 q-my-xs" v-if="index + 1 != 16" style="border: 1px dashed #d8c5a4"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <!-- #endregion -->

          <!-- #region Button Close -->
          <div class="absolute-top-right box-button-close only-book-of-content">
            <div
              class="relative-position animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img class="button-active-main" src="/images/icon_main/icon-close.png" no-transition no-spinner
                @click="isShowDialogBookOfContent = false"></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region change level Box -->
      <div class="absolute-bottom-right" style="
          display: inline-flex;
          padding: 16px;
          flex-direction: column;
          align-items: flex-start;
        " v-if="
          studentStore.studentType != 'school' &&
          showChangeLevelList.length > 0 &&
          !courseStore.courseData.isLockChangeLevel
        ">
        <div style="
            display: flex;
            width: 416px;
            padding: 8px;
            justify-content: flex-end;
            align-items: center;
            gap: 8px;
            border-radius: 12px;
            border: 1px solid #97a3ba;
            background: #fff;
          ">
          <div style="
              display: flex;
              padding-top: 4px;
              flex-direction: column;
              align-items: flex-end;
              gap: 4px;
            ">
            <div class="font-mali-sb f10" style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                color: #4a261b;
              ">
              เปลี่ยนได้ใน 15 วัน และเรียนไม่เกิน 10% ในระดับนี้
            </div>
            <div class="font-mali-m f12" style="
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                gap: 8px;
                align-self: stretch;
              ">
              <div style="color: #0085ff">{{ `${showCountownTime}` }}</div>
              <div style="color: #4a261b">|</div>
              <div :style="`${practiceStore.currentProgressThisLevel.progress < 10
                  ? 'color: #0085ff'
                  : 'color: #FF2C2C'
                }`">
                Progress : {{ practiceStore.currentProgressThisLevel.progress }}%
              </div>
            </div>
          </div>
          <div style="height: 40px; width: 121px" class="relative-position" :class="practiceStore.currentProgressThisLevel.progress < 10 ? 'cursor-pointer' : ''
            " @click="
              practiceStore.currentProgressThisLevel.progress < 10
                ? funcOpenDialogChangelevel()
                : null
              ">
            <q-img :src="`/images/button_main/${practiceStore.currentProgressThisLevel.progress < 10
                ? 'button-change-level'
                : 'button-change-level-disable'
              }.png`" no-spinner no-transition></q-img>
            <div :class="practiceStore.currentProgressThisLevel.progress < 10
                ? 'label-progress-circle'
                : 'label-disable-changelevel'
              " class="absolute-center full-width text-center">
              ขอเปลี่ยนระดับ
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div class="absolute-center box-skill-container mobile" v-else>
      <!-- #region Skill Island -->
      <div class="absolute-center fit row">
        <div class="row col-12 relative-position">
          <div class="col-12 self-start relative-position"
            style="max-width: 800px; width: 100%; height: fit-content; margin: auto" align="center">
            <q-tab-panels v-model="practiceSkill" animated swipeable class="no-padding transparent"
              transition-prev="scale" transition-next="scale">
              <q-tab-panel class="q-pa-sm" :name="item.name" v-for="(item, index) in practiceStore.skillIsland">
                <div class="relative-position" style="max-width: 500px; width: 97%">
                  <img style="max-width: 450px; width: 100%; min-width: 320px" :src="`/images/practice_list/island-${item.nameImage}${item.isLock ? '-lock' : ''
                    }.png`" no-spinner no-transition />

                  <div class="no-padding fit transparent no-padding">
                    <div class="absolute-center label-skill-island mobile">
                      <q-img :src="`/images/practice_list/label-${item.nameImage}${practiceStore.currentTotalLearningPracticeBySkillAndUnit[
                          item.name
                        ].total ==
                          practiceStore.currentTotalAllPracticeBySkillAndUnit[item.name]
                            .total
                          ? '-pass'
                          : ''
                        }.png`" class="relative-position" no-spinner no-transition v-if="!item.isLock">
                        <div class="fit transparent no-padding" style="z-index: 0">
                          <div class="absolute-center text-total-learning-practice mobile">
                            <div class="font-fredoka text-white">
                              {{
                                `${practiceStore
                                  .currentTotalLearningPracticeBySkillAndUnit[item.name]
                                  .total
                                }/${practiceStore.currentTotalAllPracticeBySkillAndUnit[
                                  item.name
                                ].total
                                }`
                              }}
                            </div>
                          </div>
                        </div>
                      </q-img>

                      <q-img :src="`/images/practice_list/label-${item.nameImage}${item.isLock ? '-lock' : ''
                        }.png`" no-spinner no-transition v-else></q-img>
                    </div>

                    <div class="absolute-center label-skill-island-content mobile" v-if="item.isLock">
                      <div class="font-mali-b" v-html="item.textValidate"></div>
                    </div>
                  </div>
                </div>
              </q-tab-panel>
            </q-tab-panels>

            <div class="absolute-center fit relative-position">
              <q-tab-panels infinite v-model="practiceSkill" animated class="no-padding transparent fit"
                transition-prev="scale" transition-next="scale" swipeable v-touch-swipe.mouse.left.right="handleSwipe">
                <q-tab-panel @click="funcGotoSkill(item)" class="q-pa-sm" :name="item.name"
                  v-for="(item, index) in practiceStore.skillIsland">
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>

        <div class="absolute-bottom" style="width: 100%; bottom: 15%">
          <div class="q-pa-xs" align="center">
            <div class="row justify-between relative-position self-center" style="max-width: 350px; width: 80%">
              <div class="col-12 absolute-center">
                <div class="line-skill"></div>
              </div>

              <div class="col-1 relative-position button-icon-skill-island"
                v-for="(item, index) in practiceStore.skillIsland">
                <q-img v-if="practiceSkill == item.name" no-spinner no-transition fit="contain" class="absolute-center"
                  :src="`/images/icon_main/arrow-current-skill.png`"
                  style="width: 18px; height: 18px; top: -35px; z-index: 1"></q-img>
                <div @click="practiceSkill = item.name" class="relative-position">
                  <div v-if="practiceSkill == item.name" style="
                      width: 42px;
                      height: 42px;
                      border-radius: 50%;
                      background: white;
                    " class="absolute-center"></div>
                  <q-img no-spinner no-transition class="absolute-center" :src="`/images/icon_main/new-icon-skill-${item.nameImage}${item.isLock
                      ? '-lock'
                      : practiceStore.currentTotalLearningPracticeBySkillAndUnit[
                        item.name
                      ].total ==
                        practiceStore.currentTotalAllPracticeBySkillAndUnit[item.name]
                          .total
                        ? '-pass'
                        : ''
                    }.png`"></q-img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Header -->

      <!-- #region Button Home -->
      <div class="absolute-top-left box-button-home mobile">
        <div class="relative-position animate__animated animate__fadeInLeft animation-duration-0-5s">
          <q-img class="button-active-main" src="/images/icon_main/home-button.png" no-spinner no-transition
            @click="funcGoToHome()"></q-img>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Box Practice level and unit -->
      <div class="absolute-top-right" style="
          display: flex;
          width: 305px;
          padding: 8px;
          justify-content: flex-end;
          align-items: flex-start;
          gap: 8px;
        ">
        <!-- #region xxx -->
        <div class="relative-position animate__animated animate__fadeInRight animation-duration-0-5s" style="
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            align-self: stretch;
            height: 160px;
            width: 246px;
          ">
          <!-- header -->
          <div style="
              display: flex;
              padding: 14px 8px 6px 8px;
              justify-content: center;
              align-items: center;
              align-self: stretch;
              border-radius: 12px 12px 0px 0px;
              background: #4a261b;
              color: #ffffff;
            " class="font-mali-m f16">
            เลือกบทเรียน
          </div>
          <!-- Body -->
          <div style="
              display: flex;
              padding: 0px 8px 8px 8px;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 4px;
              align-self: stretch;
              border-radius: 0px 0px 12px 12px;
              border-left: 2px solid #4a261b;
              border-right: 2px solid #4a261b;
              border-bottom: 2px solid #4a261b;
              background: #984510;
              box-sizing: border-box;
            ">
            <div style="
                display: flex;
                padding-top: 8px;
                flex-direction: column;
                align-items: flex-end;
                gap: 4px;
                align-self: stretch;
              ">
              <div class="full-width row justify-between items-cetner">
                <div style="
                    position: relative;
                    display: flex;
                    padding: 1px;
                    justify-content: center;
                    align-items: center;
                    width: 36px;
                    height: 36px;
                  ">
                  <!-- style="width: 100%; height: 100%; max-width: 48px; max-height: 48px" -->

                  <q-circular-progress :value="practiceStore.currentProgressThisLevel.progress" :thickness="0.3984"
                    track-color="white" class="circleColor absolute-center">
                  </q-circular-progress>
                  <div style="display: flex; align-items: center; line-height: 24px"
                    class="font-mali-b label-progress-circle absolute-center">
                    <div style="font-size: clamp(12px, 0.2vw, 16px)">
                      {{ practiceStore.currentProgressThisLevel.progress }}
                    </div>
                    <div style="margin-left: 3px; font-size: clamp(8px, 1vw, 12px)">
                      %
                    </div>
                  </div>

                  <!-- :offset="[89, -69]" -->
                  <q-tooltip anchor="top middle" self="bottom middle" :offset="[0, 0]" class="bg-transparent z-max"
                    style="height: 48px; color: #4a261b">
                    <div style="
                        display: inline-flex;
                        padding: 4px 8px;
                        justify-content: center;
                        align-items: center;
                        border-radius: 999px;
                        background: #ffedc4;
                      ">
                      <div style="padding: 4px 8px" class="font-mali-sb f10">
                        ความก้าวหน้าระดับ Level {{ levelSelected }}
                      </div>
                      <div class="absolute" style="bottom: 0px">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                          <path
                            d="M7.36603 10.5C6.98112 11.1667 6.01887 11.1667 5.63397 10.5L0.437822 1.5C0.0529222 0.833331 0.534048 -1.22094e-06 1.30385 -1.15364e-06L11.6962 -2.4512e-07C12.466 -1.77822e-07 12.9471 0.833333 12.5622 1.5L7.36603 10.5Z"
                            fill="#FFEDC4" />
                        </svg>
                      </div>
                    </div>
                  </q-tooltip>
                </div>
                <div class="row items-center" :class="isExpandBoxPractice ? 'justify-center' : 'justify-between'"
                  style="width: 150px">
                  <div :class="`${studentStore.studentType == 'school' ? 'cursor-inherit' : ''
                    } `" :style="`${isExpandBoxPractice ? 'width: 141px' : 'width: 73px'}`">
                    <div class="relative-position">
                      <div style="
                          display: flex;
                          height: 32px;
                          padding: 8px 12px;
                          justify-content: space-between;
                          align-items: center;
                          align-self: stretch;
                          border-radius: 10px;
                          border: 1px solid #4a261b;
                          background: #fff;
                        "></div>

                      <!-- #region Show Current Level -->
                      <div class="absolute-center row justify-center items-center" style="width: 100%; padding: 0 12px">
                        <div class="col self-center font-mali-sb" style="font-size: 12px">
                          {{ `${isExpandBoxPractice ? "Level" : "Lv"} ${levelSelected}` }}
                        </div>
                        <div class="self-center" v-if="studentStore.studentType != 'school'">
                          <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                        </div>
                      </div>
                      <!-- #endregion -->

                      <!-- #region Menu Level -->
                      <q-menu transition-show="jump-down" transition-hide="jump-up"
                        class="relative-position z-max transparent" :offset="[0, 7]" fit>
                        <div style="
                            height: fit-content;
                            height: 200px;
                            background: #ffffff;
                            border: 1px solid #4a216b;
                            border-radius: 10px;
                            padding: 4px;
                          ">
                          <q-scroll-area :visible="true" :vertical-thumb-style="{
                            width: '4px',
                            background: '#4a261b',
                            opacity: '1',
                          }" :vertical-bar-style="{
                              width: '8px',
                            }" class="full-width full-height">
                            <div clickable v-close-popup
                              class="cursor-pointer row items-center justify-between item-list-level mobile box-item-menu relative-position"
                              :style="{
                                marginBottom:
                                  indexLevel === practiceStore.levelOptions.length - 1
                                    ? '0px'
                                    : '6px',
                              }" v-for="(itemLevel, indexLevel) in courseStore.levelOptions" align="center" :class="itemLevel.isSuccess
                                  ? levelSelected == itemLevel.value
                                    ? 'success active-menu'
                                    : 'success'
                                  : levelSelected == itemLevel.value
                                    ? 'active-menu'
                                    : 'not-active'
                                " :key="indexLevel" @click="funcSelectLevel(itemLevel)">
                              <div class="self-center font-mali-sb" align="left" style="font-size: 12px">
                                <span>
                                  {{
                                    `${isExpandBoxPractice ? "Level" : "Lv"} ${itemLevel.value
                                    }`
                                  }}</span>
                              </div>
                              <!-- v-if="itemLevel.isLock" -->
                              <div v-if="itemLevel.isLock" class="self-center"
                                :class="isExpandBoxPractice ? 'absolute-right' : ''" align="center" :style="{
                                  width: '12px',
                                  right: isExpandBoxPractice ? '8px' : '',
                                }">
                                <q-img src="/images/icon_main/icon-lock-bigger.png" no-spinner no-transition></q-img>
                              </div>
                              <!-- v-if="itemLevel.isLock" -->
                              <div v-if="false" class="self-center" :class="isExpandBoxPractice ? 'absolute-right' : ''"
                                align="center" :style="{
                                  width: '12px',
                                  right: isExpandBoxPractice ? '8px' : '',
                                }">
                                <q-img src="/images/icon_main/icon-alert-circle.png" no-spinner no-transition></q-img>
                              </div>
                              <!-- v-if="itemLevel.isSuccess" -->
                              <!-- width: 27.1 -->
                              <div v-if="itemLevel.isSuccess" class="self-center"
                                :class="isExpandBoxPractice ? 'absolute-right' : ''" align="center" :style="{
                                  width: isExpandBoxPractice ? '15px' : '22%',
                                  marginTop: isExpandBoxPractice ? '' : '-3%',
                                  right: isExpandBoxPractice ? '8px' : '',
                                }">
                                <q-img src="/images/icon_main/icon-success-unit.png" no-spinner no-transition></q-img>
                              </div>
                            </div>
                          </q-scroll-area>
                        </div>
                      </q-menu>

                      <!-- v-if="systemStore.activeStatus.isHasUnlockLevel" -->
                      <!-- :style="`${
                          isExpandBoxPractice
                            ? 'width:5.198%; top: -25%; right: -1%;'
                            : ''
                        }`" -->
                      <div v-if="systemStore.activeStatus.isHasUnlockLevel" class="absolute-top-right"
                        :class="!isExpandBoxPractice ? 'box-icon-alert-circle' : ''" style="width: 16px" :style="{
                          top: isExpandBoxPractice ? '-28%' : '',
                          right: isExpandBoxPractice ? '-3%' : 'right: -4px',
                        }">
                        <q-img src="/images/icon_main/icon-alert-circle.png" no-spinner no-transition></q-img>
                      </div>
                    </div>
                  </div>
                  <div style="width: 73px">
                    <div v-if="!isExpandBoxPractice">
                      <div class="relative-position">
                        <div style="
                            display: flex;
                            height: 32px;
                            padding: 8px 8px;
                            justify-content: space-between;
                            justify-items: center;
                            align-items: center;
                            align-self: stretch;
                            border-radius: 10px;
                            border: 1px solid #4a261b;
                            background: #fff;
                          ">
                          <div class="self-center font-mali-sb" style="font-size: 12px; line-height: 0px">
                            {{ `Unit ${unitSelected}` }}
                          </div>

                          <div class="self-center">
                            <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                          </div>
                        </div>

                        <!-- #region Menu Unit -->
                        <q-menu transition-show="jump-down" transition-hide="jump-up"
                          class="relative-position z-max transparent" :offset="[0, 7]" fit>
                          <div style="
                              height: fit-content;
                              height: 200px;
                              background: #ffffff;
                              border: 1px solid #4a216b;
                              border-radius: 10px;
                              padding: 4px;
                            ">
                            <q-scroll-area :visible="true" :vertical-thumb-style="{
                              width: '4px',
                              background: '#4a261b',
                              opacity: '1',
                            }" class="full-width full-height">
                              <div clickable v-close-popup
                                class="cursor-pointer row items-center box-item-menu item-list-level mobile" :class="{
                                  'success active-menu':
                                    itemUnit.isSuccess && unitSelected == itemUnit.value,
                                  success: itemUnit.isSuccess,
                                  'active-menu': unitSelected == itemUnit.value,
                                  'not-active':
                                    !itemUnit.isSuccess && unitSelected != itemUnit.value,
                                }" :key="indexUnit" v-for="(itemUnit, indexUnit) in practiceStore.unitOptions"
                                @click="funcSelectUnit(itemUnit)" align="center" :style="{
                                  marginBottom:
                                    indexUnit === practiceStore.unitOptions.length - 1
                                      ? '0px'
                                      : '6px',
                                }">
                                <div class="self-center col font-mali-sb" style="font-size: 12px" align="left">
                                  <span>{{ itemUnit.label }}</span>
                                </div>
                                <div v-if="itemUnit.isSuccess" class="col-1 self-center" align="center"
                                  style="width: 27.78%; margin-top: -3%">
                                  <q-img src="/images/icon_main/icon-success-unit.png" no-spinner no-transition></q-img>
                                </div>
                              </div>
                            </q-scroll-area>
                          </div>
                        </q-menu>
                        <!-- #endregion -->
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width: 36px; height: 36px">
                  <div class="relative-position">
                    <q-img src="/images/button_main/button-practice-book.png" no-spinner no-transition
                      @click="isShowDialogListOfContent = true" class="button-active-main"></q-img>
                  </div>
                </div>
              </div>

              <!-- Progress bar -->
              <div v-if="!isExpandBoxPractice" class="row full-width">
                <div class="col self-center">
                  <div class="box-practice-progress-buy-unit" :style="`${isExpandBoxPractice ? 'margin-top: 0%;' : 'margin-top: 2%;'
                    }`">
                    <div class="progress-bar" :class="practiceStore.currentProgressByUnit >= 100 ? 'success' : ''"
                      :style="`width:${practiceStore.currentProgressByUnit}%`"></div>
                  </div>
                </div>
                <div class="col-1 self-center text-white font-mali-sb f16" style="width: 20%; max-width: 58px"
                  align="right">
                  {{ `${practiceStore.currentProgressByUnit}%` }}
                </div>
                <!-- :offset="[89, 1]" -->
                <q-tooltip class="bg-transparent" anchor="bottom middle" self="center middle"
                  style="height: 48px; color: #4a261b">
                  <div style="
                      display: inline-flex;
                      padding: 4px 8px;
                      justify-content: center;
                      align-items: center;
                      border-radius: 999px;
                      background: #ffedc4;
                    ">
                    <div style="padding: 4px 8px" class="font-mali-sb f10">
                      ความก้าวหน้าบทเรียน Unit {{ unitSelected }}
                    </div>
                    <div class="absolute" style="top: 0px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
                        <path
                          d="M6.13398 0.499999C6.51888 -0.166667 7.48112 -0.166667 7.86603 0.5L13.0622 9.5C13.4471 10.1667 12.966 11 12.1962 11L1.80385 11C1.03405 11 0.552922 10.1667 0.937822 9.5L6.13398 0.499999Z"
                          fill="#FFEDC4" />
                      </svg>
                    </div>
                  </div>
                </q-tooltip>
              </div>
              <div style="display: flex; align-items: center; gap: 4px; align-self: stretch">
                <div v-if="isExpandBoxPractice" style="
                    margin-top: 6px;
                    display: grid;
                    align-items: center;
                    justify-content: center;
                    justify-items: center;
                    gap: 4px;
                    width: 237px;
                    padding: 0px 12px;
                    height: 100%;
                    overflow-y: auto;
                    grid-template-columns: repeat(2, 1fr);
                  " class="max-height-scrollIn-practice-unit mobile">
                  <div @click="funcSelectUnit(item), (isExpandBoxPractice = false)"
                    v-for="(item, index) in practiceStore.unitOptions" :key="index" style="
                      display: flex;
                      width: 100px;
                      padding: 2px;
                      flex-direction: column;
                      align-items: center;
                      gap: 4px;
                      flex-shrink: 0;
                      border-radius: 10px;
                      background: #ffc42c;
                    " :style="unitSelected == index + 1
                        ? 'background: #ffc42c;'
                        : 'background: #984510;'
                      ">
                    <div style="
                        display: flex;
                        padding: 6px 6px 4px 6px;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 2px;
                        align-self: stretch;
                        border-radius: 8px;
                      " :style="unitSelected == index + 1
                          ? 'background: #ffffff; border: 1px solid #DB8200;'
                          : 'background: #ffc42c;  border: 1px solid #db8200;'
                        ">
                      <div style="
                          display: flex;
                          flex-direction: column;
                          align-items: flex-start;
                          align-self: stretch;
                          justify-content: center;
                        ">
                        <div style="
                            width: 100%;
                            height: 58px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 4px;
                            background: #4a261b;
                          " class="font-fredoka text-white f16">
                          Unit<span style="margin-left: 8px">{{ item.value }}</span>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; align-self: stretch">
                        <div class="col-12 row full-width">
                          <div class="col self-center">
                            <div class="box-practice-progress-buy-unit" style="height: 8px">
                              <div class="progress-bar" :class="practiceStore.currentProgressThisLevel.unitProgressList[
                                  index
                                ] >= 100
                                  ? 'success'
                                  : ''
                                " :style="`width:${practiceStore.currentProgressThisLevel.unitProgressList[index]}%`">
                              </div>
                            </div>
                          </div>
                          <div class="self-center font-mali-b f12" style="width: 36px" align="right">
                            {{
                              `${practiceStore.currentProgressThisLevel.unitProgressList[index]}%`
                            }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- expanded Button -->
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                align-self: stretch;
              " class="cursor-pointer clickable">
              <q-img class="relative-position" style="width: 100%" :style="`${isExpandBoxPractice
                  ? 'max-height: 30px; margin-top: 4px;'
                  : 'height: 24px;'
                }`" src="/images/button_main/button-expanded-mobile.png" no-spinner no-transition
                @click="expandedPracticeUnit()">
                <q-icon :name="isExpandBoxPractice ? 'fas fa-caret-up' : 'fas fa-caret-down'"
                  style="width: 12px; height: 8px; color: #4a261b" class="absolute-center"></q-icon>
              </q-img>
            </div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region Box Setting -->
        <div style="display: flex; flex-direction: column; align-items: center; gap: 11.74px">
          <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
            <q-img width="35px" src="/images/icon_main/icon-setting.png" no-spinner no-transition
              @click="isShowDialogSetting = true"></q-img>
          </div>

          <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
            <q-img width="20px" src="/images/icon_main/icon-info.png" @click="isShowDialogTutorial = true" no-spinner
              no-transition></q-img>
          </div>
        </div>
        <!-- #endregion -->
      </div>

      <!-- #endregion -->

      <!-- #region change level Box -->
      <div class="absolute-bottom-right" style="
          display: flex;
          width: 360px;
          padding: 8px;
          flex-direction: column;
          align-items: flex-start;
        " v-if="
          studentStore.studentType != 'school' &&
          showChangeLevelList.length > 0 &&
          !courseStore.courseData.isLockChangeLevel
        ">
        <div style="
            display: flex;
            padding: 4px;
            justify-content: flex-end;
            align-items: center;
            gap: 6px;
            align-self: stretch;
            border-radius: 12px;
            border: 1px solid #97a3ba;
            background: #fff;
          ">
          <div style="
              display: flex;
              padding-top: 4px;
              flex-direction: column;
              align-items: flex-end;
            ">
            <div class="font-mali-sb" style="
                display: flex;
                justify-content: flex-end;
                align-items: center;
                color: #4a261b;
                font-size: 8px;
              ">
              เปลี่ยนได้ใน 15 วัน และเรียนไม่เกิน 10% ในระดับนี้
            </div>
            <div class="font-mali-m f10" style="
                display: flex;
                justify-content: flex-end;
                align-items: flex-start;
                gap: 4px;
                align-self: stretch;
              ">
              <div style="color: #0085ff">เวลาเหลือ : 6 วัน 23 ชั่วโมง</div>
              <div style="color: #4a261b">|</div>
              <div :style="`${practiceStore.currentProgressThisLevel.progress < 10
                  ? 'color: #0085ff'
                  : 'color: #FF2C2C'
                }`">
                Progress : {{ practiceStore.currentProgressThisLevel.progress }}%
              </div>
            </div>
          </div>
          <div style="height: 36px; width: 107px" class="relative-position" :class="practiceStore.currentProgressThisLevel.progress < 10 ? 'cursor-pointer' : ''
            " @click="
              practiceStore.currentProgressThisLevel.progress < 10
                ? funcOpenDialogChangelevel()
                : null
              ">
            <q-img :src="`/images/button_main/${practiceStore.currentProgressThisLevel.progress < 10
                ? 'button-change-level'
                : 'button-change-level-disable'
              }.png`" no-spinner no-transition></q-img>
            <div :class="practiceStore.currentProgressThisLevel.progress < 10
                ? 'label-progress-circle'
                : 'label-disable-changelevel'
              " class="absolute-center full-width text-center font-mali-b f10">
              ขอเปลี่ยนระดับ
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region Dialog Island Skill Mobile Mode -->
      <q-dialog maximized persistent class="z-max" v-model="isShowDialogSkillContentByUnit">
        <q-card class="transparent shadow-0">
          <q-card-section class="fit row justify-center items-center no-padding">
            <div class="relative-position" style="width: 340px">
              <div class="q-py-md" align="right">
                <q-img width="48px" class="button-active-main" src="/images/icon_main/icon-close.png" no-spinner
                  no-transition @click="isShowDialogSkillContentByUnit = false"></q-img>
              </div>
              <div align="center" class="relative-position">
                <q-img width="340px" src="/images/background_main/background-island-details-mobile.png" no-spinner
                  no-transition></q-img>

                <div class="absolute-top box-island-scroll mobile">
                  <!-- #region Skill Island -->
                  <div class="fit q-pa-xs">
                    <div class="box-skill-details-main mobile q-mb-md"
                      v-for="(itemSkillIsland, indexSkillIsland) in skillDataList" :key="indexSkillIsland"
                      :style="itemSkillIsland.position">
                      <div class="relative-position">
                        <div class="relative-position">
                          <div class="box-skill-details-container" :id="`skill-island-${itemSkillIsland.skill}`">
                            <div class="text-skill-header font-fredoka" align="center">
                              <div class="f20">
                                {{ `${indexSkillIsland + 1}. ${itemSkillIsland.name}` }}
                              </div>
                            </div>
                            <div class="box-skill-content row">
                              <div class="col-1" style="width: 60px">
                                <q-img :src="`/images/practice_list/island-${itemSkillIsland.skill}.png`" no-spinner
                                  no-transition></q-img>
                              </div>
                              <div class="col font-mali-r text-skill-content" style="padding: 5px 7px" align="left">
                                <div class="f12">
                                  {{
                                    `${practiceStore.currentUnitData[itemSkillIsland.skill]
                                      .nameEng
                                    }`
                                  }}
                                </div>
                                <div class="f12 q-mt-xs">
                                  {{
                                    `${practiceStore.currentUnitData[itemSkillIsland.skill]
                                      .nameTh
                                    }`
                                  }}
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

                <!-- #region Label Header -->
                <div class="absolute-center" style="width: 300px; top: 17px">
                  <q-img src="/images/label_main/label-practice-header.png" no-spinner no-transition>
                    <div class="transparent fit no-padding">
                      <div class="absolute-center text-label-header">
                        <div class="font-fredoka f30" align="center">
                          {{ `Level ` }}
                          <span class="text-label-yellow">{{
                            `${practiceStore.level} `
                          }}</span>
                          {{ `Unit` }}
                          <span class="text-label-yellow">{{
                            `${practiceStore.unit}`
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </q-img>
                </div>
                <!-- #endregion -->
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- #endregion -->

      <!-- #region Dialog List Of Content Mobile Mode -->
      <q-dialog maximized v-model="isShowDialogListOfContent" class="z-max shadow-0">
        <q-card class="transparent shadow-0 no-padding">
          <q-card-section class="fit row justify-center items-center no-padding">
            <div class="relative-position text-color" style="max-width: 320px; width: 90%; margin: auto">
              <q-img src="/images/practice_list/the-book-of-content-mobile.png" no-transition no-spinner>
                <div class="fit transparent">
                  <div class="" align="center">
                    <q-btn class="button-main default bubble-selected button-main-radius q-py-sm" style="width: 200px"
                      padding="10px 0px" push>
                      <span class="q-px-md text-color f16 text-bold">
                        {{ skillSelected.label }}
                      </span>
                      <q-space></q-space>
                      <q-icon class="q-mx-sm" size="16px" name="fas fa-caret-down"></q-icon>

                      <q-menu fit transition-show="jump-down" transition-hide="jump-up" class="relative-position z-max"
                        style="border-radius: 5px; border: 2px solid #4a261b">
                        <q-list class="box-selected" style="height: fit-content; max-height: 200px">
                          <div class="q-pa-sm">
                            <div clickable v-close-popup class="box-item-menu q-pa-sm cursor-pointer"
                              v-for="(item, index) in skillOptions" align="left" :class="{
                                'active-menu': skillSelected.value == item.value,
                                'not-active': skillSelected.value != item.value,
                              }" @click="skillSelected = item">
                              <span>{{ item.label }}</span>
                            </div>
                          </div>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </div>

                  <div class="">
                    <div class="q-py-md q-px-xs">
                      <div class="box-list-of-content-mobile text-color">
                        <div class="row" v-for="(item, index) in practiceStore.listName[
                          skillSelected.value
                        ]">
                          <div class="col-1 q-pa-sm" style="width: fit-content">
                            <span>{{ `บทที่ ${item.unit}:` }}</span>
                          </div>
                          <div class="col q-pa-sm">
                            <span>
                              {{ item.nameEng }}
                            </span>
                            <br />
                            <span>
                              {{ item.nameTh }}
                            </span>
                          </div>
                          <div class="col-12 q-my-xs" v-if="index + 1 != 16" style="border: 0.5px dashed #d8c5a4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </q-img>
              <div class="absolute-top-right" style="top: -10px; right: -5px" align="center">
                <q-btn round flat push size="16px" v-close-popup>
                  <q-img src="/images/icon_main/icon-close.png" no-transition no-spinner></q-img>
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- #endregion -->
    </div>
    <!-- #endregion -->
  </q-page>

  <!-- #region Dialog Learning swipe -->
  <!-- <dialog-learning-swipe
        v-if="isShowDialogLearningSwipe && $q.platform.is.desktop"
        :isDialoglearningSwipe="isShowDialogLearningSwipe"
        @callback-dialogSwipe="funcCloseLearningSwipe()"
      ></dialog-learning-swipe> -->

  <!-- <q-dialog maximized v-model="isShowDialogLearningSwipe" persistent>
    <q-card
      class="transparent shadow-0"
      style="overflow: hidden"
      @click="funcCloseDialogLearning()"
    >
      <q-card-section class="fit row justify-center items-center">
        <div class="absolute-center" align="center">
          <div class="swipe-hand" id="swipe-hand-id"></div>
          <div class="q-pa-md text-white" align="center">
            คุณสามารถเลื่อนหน้าจอไปเกาะอื่นๆได้
          </div>
          <div class="q-pa-md text-white" align="center">แตะเพื่อนปิด</div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog> -->
  <!-- #endregion -->

  <!-- #region Dialog First time show progress all level -->
  <q-dialog maximized persistent v-model="isShowDialogProgressAllLevel">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s">
          <div class="box-practice-complete-unit-body fit">
            <div class="row" style="width: 100%">
              <div class="col-12 self-start" style="margin-top: 50px">
                <!-- Text: ความคืบหน้าแบบฝึกหัด -->
                <div class="f20 font-mali-b" align="center">
                  <div>
                    {{ `ความคืบหน้าแบบฝึกหัด` }}
                  </div>
                </div>

                <!-- Text: ทำแบบฝึกหัดกันต่อ เพิ่มความก้าวหน้า เพื่อรับรางวัลกันเถอะ! -->
                <div class="font-mali-r f14 q-my-sm" align="center">
                  <div>ทำแบบฝึกหัดกันต่อ เพิ่มความก้าวหน้า</div>
                  <div class="q-mt-sm">เพื่อรับรางวัลกันเถอะ!</div>
                </div>

                <!-- #region Level List -->
                <div class="q-mt-md box-progress-scroll" :class="practiceStore.practiceCompleteList.length == 1 ? '' : 'show-all'
                  " id="first-time-scroll-progress">
                  <div v-for="(
itemCourseData, indexCourseData
                    ) in practiceStore.practiceCompleteList" :key="indexCourseData" class="relative-position">
                    <div class="box-progress-details relative-position"
                      :class="practiceStore.practiceCompleteList.length == 1 ? '' : ''" align="center">
                      <div class="font-fredoka f20 text-level-complete">
                        <span class="text-white">{{ `Level ` }}</span>
                        <span>{{ `${itemCourseData.level}` }}</span>
                      </div>
                      <div class="font-mali-b q-my-xs">
                        <div v-if="itemCourseData.rewardStep == 0">
                          {{ `ยังไม่มีความคืบหน้า พยายามเข้านะ!` }}
                        </div>
                        <div v-else>
                          {{ `ทำสำเร็จไปแล้ว ${itemCourseData.rewardStep} บทเรียน` }}
                        </div>
                      </div>

                      <div class="font-mali-m f10 q-mt-sm q-pt-xs q-pb-sm" align="center">
                        <!-- Text: ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ Level -->
                        <div>
                          {{ `ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ ` }}
                          <span class="font-mali-b">Level</span>
                          <span>
                            {{ ` ${itemCourseData.level}` }}
                          </span>
                        </div>

                        <!-- #region Progress Bar -->
                        <div class="q-px-xs">
                          <div class="relative-position">
                            <div class="progress-complete-unit-main relative-position">
                              <div class="progress-complete-line" :style="`width:${itemCourseData.progressAnimation}%;`"
                                :class="itemCourseData.progressAnimation >= 100 ? 'success' : ''
                                  "></div>
                            </div>

                            <!-- #region Icon reward -->
                            <div v-for="(itemReward, indexReward) in 16" class="absolute-bottom box-mark-current-reward"
                              :style="`left:${((indexReward + 1) / 16) * 100 + 0.2}%`" :class="indexReward + 1 == 8
                                  ? 'mark-center'
                                  : indexReward + 1 == 16
                                    ? 'mark-end'
                                    : ''
                                ">
                              <!-- Premium Key -->
                              <div class="absolute-center" style="top: 15px" v-if="itemReward == 8 || itemReward == 16">
                                <div :class="itemCourseData.progressAnimation >
                                    itemCourseData.progressComplete
                                    ? itemCourseData.numOfReceivedReward > indexReward
                                      ? ''
                                      : itemCourseData.progressAnimation >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-premium-key${itemCourseData.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" no-spinner no-transition :class="itemCourseData.progressAnimation >
                                        itemCourseData.progressComplete
                                        ? itemCourseData.numOfReceivedReward > indexReward
                                          ? ''
                                          : itemCourseData.progressAnimation >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      "></q-img>
                                </div>
                              </div>

                              <!-- Coin Extra -->
                              <div class="absolute-center" style="top: 12px"
                                v-else-if="itemReward == 4 || itemReward == 12">
                                <div :class="itemCourseData.progressAnimation >
                                    itemCourseData.progressComplete
                                    ? itemCourseData.numOfReceivedReward > indexReward
                                      ? ''
                                      : itemCourseData.progressAnimation >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-winner-coin-extra${itemCourseData.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" no-spinner no-transition :class="itemCourseData.progressAnimation >
                                        itemCourseData.progressComplete
                                        ? itemCourseData.numOfReceivedReward > indexReward
                                          ? ''
                                          : itemCourseData.progressAnimation >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      "></q-img>
                                </div>
                              </div>

                              <!-- Coin -->
                              <div class="absolute-center" style="top: 12px" v-else>
                                <div :class="itemCourseData.progressAnimation >
                                    itemCourseData.progressComplete
                                    ? itemCourseData.numOfReceivedReward > indexReward
                                      ? ''
                                      : funcAnimationProgressBar(
                                        itemCourseData.numOfReceivedReward,
                                        itemCourseData.rewardStep
                                      ) >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-winner-coin${itemCourseData.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" :class="itemCourseData.progressAnimation >
                                        itemCourseData.progressComplete
                                        ? itemCourseData.numOfReceivedReward > indexReward
                                          ? ''
                                          : funcAnimationProgressBar(
                                            itemCourseData.numOfReceivedReward,
                                            itemCourseData.rewardStep
                                          ) >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      " no-spinner no-transition></q-img>
                                </div>
                              </div>
                            </div>
                            <!-- #endregion -->
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <div
                        class="absolute-center fit row justify-center items-center backdrop animate__animated animation-duration-0-5s"
                        :class="itemCourseData.isLoaded ? 'animate__fadeOut' : 'animate__fadeIn'
                          ">
                        <div class="font-fredoka text-white">Loading...</div>
                      </div>
                    </div>

                    <div class="box-line-sparator absolute-bottom" v-if="
                      indexCourseData + 1 != practiceStore.practiceCompleteList.length
                    "></div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>

              <!-- #region Button -->
              <div class="col-12 self-end row justify-center items-center" style="height: 65px" lign="center">
                <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
                  style="width: 100%; animation-delay: 1s" align="center">
                  <q-img width="274px" height="50px" :src="`/images/button_main/button-ready-start-learning${practiceStore.isLoadedPracticeCompleteReward ? '' : '-disable'
                    }.png`" no-spinner no-transition class="cursor-pointer" @click="
                      practiceStore.isLoadedPracticeCompleteReward
                        ? funcCheckHasReward()
                        : null
                      " :class="practiceStore.isLoadedPracticeCompleteReward
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed'
                      "></q-img>

                  <!-- <q-img
                    width="274px"
                    src="/images/button_main/button-next-step.png"
                    no-spinner
                    no-transition
                    class="cursor-pointer button-active-main"
                    @click="funcSumTotalReward()"
                    v-if="
                      studentStore.studentType == 'school' &&
                      practiceStore.currentProgressByLevel.reward.length > 1
                    "
                  ></q-img> -->
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <!-- #region Label -->
          <div class="absolute-center box-label-practice-complete-unit">
            <div class="animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img width="150px" src="/images/label_main/label-practice-complete-unit.png" no-spinner
                no-transition></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Get Reward all -->
  <q-dialog maximized persistent v-model="isShowDialogGetRewardAll">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s">
          <div class="box-practice-complete-unit-body fit">
            <div class="row" style="width: 100%">
              <div class="col-12 self-start" style="margin-top: 50px">
                <!-- Text: ความคืบหน้าแบบฝึกหัด -->
                <div class="f20 font-mali-b" align="center">
                  <div>
                    {{ `ความคืบหน้าแบบฝึกหัด` }}
                  </div>
                </div>

                <!-- Text: ทำแบบฝึกหัดกันต่อ เพิ่มความก้าวหน้า เพื่อรับรางวัลกันเถอะ! -->
                <div class="font-mali-r f14 q-my-sm" align="center">
                  <div>ทำแบบฝึกหัดกันต่อ เพิ่มความก้าวหน้า</div>
                  <div class="q-mt-sm">เพื่อรับรางวัลกันเถอะ!</div>
                </div>

                <!-- #region Level List -->
                <div class="q-mt-md box-progress-scroll">
                  <div v-for="(itemRewardAll, indexRewardAll) in showRewardListAll" :key="indexRewardAll"
                    class="relative-position">
                    <div class="box-progress-details relative-position" :class="showRewardListAll.length == 1 ? '' : ''"
                      align="center">
                      <div class="font-fredoka f20 text-level-complete">
                        <span class="text-white">{{ `Level ` }}</span>
                        <span>{{ `${itemRewardAll.level}` }}</span>
                      </div>
                      <div class="font-mali-b q-my-xs">
                        <div v-if="itemRewardAll.rewardStep == 0">
                          {{ `ยังไม่มีความคืบหน้า พยายามเข้านะ!` }}
                        </div>
                        <div v-else>
                          {{ `ทำสำเร็จไปแล้ว ${itemRewardAll.rewardStep} บทเรียน` }}
                        </div>
                      </div>

                      <div class="font-mali-m f10 q-mt-sm q-pt-xs q-pb-sm" align="center">
                        <!-- Text: ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ Level -->
                        <div>
                          {{ `ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ ` }}
                          <span class="font-mali-b">Level</span>
                          <span>
                            {{ ` ${itemRewardAll.level}` }}
                          </span>
                        </div>

                        <!-- #region Progress Bar -->
                        <div class="q-px-xs">
                          <div class="relative-position">
                            <div class="progress-complete-unit-main relative-position">
                              <div class="progress-complete-line" :style="`width:${itemRewardAll.progressAnimation}%;`"
                                :class="itemRewardAll.progressAnimation >= 100 ? 'success' : ''
                                  "></div>
                            </div>

                            <!-- #region Icon reward -->
                            <div v-for="(itemReward, indexReward) in 16" class="absolute-bottom box-mark-current-reward"
                              :style="`left:${((indexReward + 1) / 16) * 100 + 0.2}%`" :class="indexReward + 1 == 8
                                  ? 'mark-center'
                                  : indexReward + 1 == 16
                                    ? 'mark-end'
                                    : ''
                                ">
                              <!-- Premium Key -->
                              <div class="absolute-center" style="top: 15px" v-if="itemReward == 8 || itemReward == 16">
                                <div :class="itemRewardAll.progressAnimation >
                                    itemRewardAll.progressComplete
                                    ? itemRewardAll.numOfReceivedReward > indexReward
                                      ? ''
                                      : funcAnimationProgressBar(
                                        itemRewardAll.numOfReceivedReward,
                                        itemRewardAll.rewardStep
                                      ) >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-premium-key${itemRewardAll.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" no-spinner no-transition :class="itemRewardAll.progressAnimation >
                                        itemRewardAll.progressComplete
                                        ? itemRewardAll.numOfReceivedReward > indexReward
                                          ? ''
                                          : funcAnimationProgressBar(
                                            itemRewardAll.numOfReceivedReward,
                                            itemRewardAll.rewardStep
                                          ) >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      "></q-img>
                                </div>
                              </div>

                              <!-- Coin Extra -->
                              <div class="absolute-center" style="top: 12px"
                                v-else-if="itemReward == 4 || itemReward == 12">
                                <div :class="itemRewardAll.progressAnimation >
                                    itemRewardAll.progressComplete
                                    ? itemRewardAll.numOfReceivedReward > indexReward
                                      ? ''
                                      : funcAnimationProgressBar(
                                        itemRewardAll.numOfReceivedReward,
                                        itemRewardAll.rewardStep
                                      ) >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-winner-coin-extra${itemRewardAll.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" no-spinner no-transition :class="itemRewardAll.progressAnimation >
                                        itemRewardAll.progressComplete
                                        ? itemRewardAll.numOfReceivedReward > indexReward
                                          ? ''
                                          : funcAnimationProgressBar(
                                            itemRewardAll.numOfReceivedReward,
                                            itemRewardAll.rewardStep
                                          ) >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      "></q-img>
                                </div>
                              </div>

                              <!-- Coin -->
                              <div class="absolute-center" style="top: 12px" v-else>
                                <div :class="itemRewardAll.progressAnimation >
                                    itemRewardAll.progressComplete
                                    ? itemRewardAll.numOfReceivedReward > indexReward
                                      ? ''
                                      : funcAnimationProgressBar(
                                        itemRewardAll.numOfReceivedReward,
                                        itemRewardAll.rewardStep
                                      ) >=
                                        ((indexReward + 1) / 16) * 100
                                        ? 'animation-icon-bright-reward'
                                        : ''
                                    : ''
                                  ">
                                  <q-img width="15px" :src="`/images/icon_main/icon-winner-coin${itemRewardAll.numOfReceivedReward > indexReward
                                      ? '-received'
                                      : ''
                                    }.png`" :class="itemRewardAll.progressAnimation >
                                        itemRewardAll.progressComplete
                                        ? itemRewardAll.numOfReceivedReward > indexReward
                                          ? ''
                                          : funcAnimationProgressBar(
                                            itemRewardAll.numOfReceivedReward,
                                            itemRewardAll.rewardStep
                                          ) >=
                                            ((indexReward + 1) / 16) * 100
                                            ? 'animation-icon-reward'
                                            : ''
                                        : ''
                                      " no-spinner no-transition></q-img>
                                </div>
                              </div>
                            </div>
                            <!-- #endregion -->
                          </div>
                        </div>
                        <!-- #endregion -->
                      </div>

                      <div
                        class="absolute-center fit row justify-center items-center backdrop animate__animated animation-duration-0-5s"
                        :class="itemRewardAll.isLoaded ? 'animate__fadeOut' : 'animate__fadeIn'
                          ">
                        <div class="font-fredoka text-white">Loading...</div>
                      </div>
                    </div>

                    <div class="box-line-sparator absolute-bottom"
                      v-if="indexRewardAll + 1 != showRewardListAll.length"></div>
                  </div>
                </div>
                <!-- #endregion -->
              </div>

              <!-- #region Button -->
              <div class="col-12 self-end q-mt-sm q-mb-sm" align="center">
                <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
                  style="width:100%;animation-delay: 0.5s">
                  <q-img width="274px" src="/images/button_main/button-next-step.png" no-spinner no-transition
                    class="cursor-pointer button-active-main" @click="funcSumTotalReward()"></q-img>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <!-- #region Label -->
          <div class="absolute-center box-label-practice-complete-unit">
            <div class="animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img width="150px" src="/images/label_main/label-practice-complete-unit.png" no-spinner
                no-transition></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Get Reward -->
  <q-dialog maximized persistent v-model="isShowDialogGetReward">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s">
          <div class="box-practice-complete-unit-body fit">
            <div style="margin-top: 50px">
              <!-- Text: รางวัลสำเร็จแบบฝึกหัด -->
              <div class="f20 font-mali-b" align="center">
                <div>
                  {{ `รางวัลสำเร็จแบบฝึกหัด` }}
                </div>
              </div>

              <!-- Text: รวมรางวัลทั้งหมดที่ได้รับ -->
              <div class="font-mali-r f14 q-my-sm" align="center">
                <div>รวมรางวัลทั้งหมดที่ได้รับ</div>
              </div>
            </div>

            <!-- #region Your reward -->
            <div align="center" class="q-mt-xs">
              <!-- Label Reward -->
              <div class="relative-position">
                <q-img width="200px" src="/images/label_main/label-your-reward.png" no-spinner no-transition></q-img>
              </div>

              <div class="q-my-md q-pb-sm q-pt-sm relative-position row justify-center items-center" align="center"
                style="width: 70%">
                <div class="col row justify-center items-center self-center relative-position"
                  v-for="(itemReward, indexReward) in showRewardList">
                  <!-- Animation Light -->
                  <div class="absolute-center">
                    <q-img :src="`/images/icon_main/icon-animation-${itemReward.type == 'coin' ? 'coin' : 'premium-key'
                      }-reward.png`" width="150px" no-spinner no-transition class="animation-reward"></q-img>
                  </div>

                  <!-- Reward Coin Extra -->
                  <div class="relative-position">
                    <q-img width="80px" :src="`/images/icon_main/${itemReward.type == 'coin'
                        ? 'icon-winner-coin-extra'
                        : 'icon-premium-key'
                      }.png`" no-spinner no-trasnsition></q-img>

                    <div class="absolute-bottom f32 font-mali-b text-number-reward" style="bottom: -10px">
                      {{ itemReward.value }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- #endregion -->

            <!-- #region Button -->
            <div class="col-12 self-end q-mt-sm q-mb-sm" align="center">
              <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
                style="width:100%;animation-delay: 0.5s">
                <q-img width="274px" src="/images/button_main/button-get-reward.png" no-spinner no-transition
                  class="cursor-pointer button-active-main" @click="funcGetReward()"></q-img>
              </div>
            </div>
            <!-- #endregion -->
          </div>

          <!-- #region Label -->
          <div class="absolute-center box-label-practice-complete-unit">
            <div class="animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img width="150px" src="/images/label_main/label-practice-complete-unit.png" no-spinner
                no-transition></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Complete Unit -->
  <q-dialog maximized persistent v-model="isShowDialogCompleteUnit">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s">
          <div class="box-practice-complete-unit-body fit">
            <div class="col-12 self-start" style="margin-top: 50px">
              <!-- Text: สำเร็จ {{ current unit }} บทเรียนแล้ว -->
              <div class="f20 font-mali-b" align="center">
                <div>
                  {{ `สำเร็จ ${currentProgressReward.rewardStep} บทเรียนแล้ว` }}
                </div>
              </div>

              <!-- Text: ยินดีด้วย รับรางวัลสำหรับทำแบบฝึกหัด -->
              <div class="f14 q-my-sm font-mali-r" align="center">
                <div>ยินดีด้วย รับรางวัลสำหรับทำแบบฝึกหัด</div>
                <div>
                  <span class="font-mali-b">{{
                    `Level ${currentProgressReward.level} Unit ${currentProgressReward.unit || 0
                    }`
                  }}</span>
                  ครบทั้งหมด
                </div>
              </div>

              <!-- #region Progress -->
              <div class="font-mali-m f10 q-mt-sm q-pt-xs q-pb-sm" align="center">
                <!-- Text: ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ Level -->
                <div>
                  {{ `ความคืบหน้าของรางวัลทำแบบฝึกหัดเสร็จ` }}
                  <span class="font-mali-b">
                    {{ `Level ${currentProgressReward.level}` }}
                  </span>
                </div>

                <!-- Progress Bar -->
                <div class="q-px-xs">
                  <div class="relative-position">
                    <div class="progress-complete-unit-main relative-position">
                      <div class="progress-complete-line" :style="`width:${currentProgressReward.progressAnimation}%;`"
                        :class="currentProgressReward.progressAnimation >= 100 ? 'success' : ''
                          "></div>
                    </div>

                    <!-- #region Icon reward -->
                    <div v-for="(itemReward, indexReward) in 16" class="absolute-bottom box-mark-current-reward"
                      :style="`left:${((indexReward + 1) / 16) * 100 + 0.3}%`" :class="indexReward + 1 == 8
                          ? 'mark-center'
                          : indexReward + 1 == 16
                            ? 'mark-end'
                            : ''
                        ">
                      <div class="absolute-center" style="top: 12px"></div>

                      <!-- Premium Key -->
                      <div class="absolute-center" style="top: 14px" v-if="itemReward == 8 || itemReward == 16">
                        <div :class="currentProgressReward.progressAnimation >
                            currentProgressReward.progressComplete
                            ? currentProgressReward.numOfReceivedReward > indexReward
                              ? ''
                              : currentProgressReward.progressAnimation >=
                                ((indexReward + 1) / 16) * 100
                                ? 'animation-icon-bright-reward'
                                : ''
                            : ''
                          ">
                          <q-img width="15px" :src="`/images/icon_main/icon-premium-key${currentProgressReward.numOfReceivedReward > indexReward
                              ? '-received'
                              : ''
                            }.png`" :class="currentProgressReward.progressAnimation >
                                currentProgressReward.progressComplete
                                ? currentProgressReward.numOfReceivedReward > indexReward
                                  ? ''
                                  : currentProgressReward.progressAnimation >=
                                    ((indexReward + 1) / 16) * 100
                                    ? 'animation-icon-reward'
                                    : ''
                                : ''
                              " no-spinner no-transition></q-img>
                        </div>
                      </div>

                      <!-- Coin Extra -->
                      <div class="absolute-center" style="top: 12px" v-else-if="itemReward == 4 || itemReward == 12">
                        <div :class="currentProgressReward.progressAnimation >
                            currentProgressReward.progressComplete
                            ? currentProgressReward.numOfReceivedReward > indexReward
                              ? ''
                              : currentProgressReward.progressAnimation >=
                                ((indexReward + 1) / 16) * 100
                                ? 'animation-icon-bright-reward'
                                : ''
                            : ''
                          ">
                          <q-img width="15px" :src="`/images/icon_main/icon-winner-coin-extra${currentProgressReward.numOfReceivedReward > indexReward
                              ? '-received'
                              : ''
                            }.png`" :class="currentProgressReward.progressAnimation >
                                currentProgressReward.progressComplete
                                ? currentProgressReward.numOfReceivedReward > indexReward
                                  ? ''
                                  : currentProgressReward.progressAnimation >=
                                    ((indexReward + 1) / 16) * 100
                                    ? 'animation-icon-reward'
                                    : ''
                                : ''
                              " no-spinner no-transition></q-img>
                        </div>
                      </div>

                      <!-- Coin -->
                      <div class="absolute-center" style="top: 12px" v-else>
                        <div :class="currentProgressReward.progressAnimation >
                            currentProgressReward.progressComplete
                            ? currentProgressReward.numOfReceivedReward > indexReward
                              ? ''
                              : currentProgressReward.progressAnimation >=
                                ((indexReward + 1) / 16) * 100
                                ? 'animation-icon-bright-reward'
                                : ''
                            : ''
                          ">
                          <q-img width="15px" :src="`/images/icon_main/icon-winner-coin${currentProgressReward.numOfReceivedReward > indexReward
                              ? '-received'
                              : ''
                            }.png`" :class="currentProgressReward.progressAnimation >
                                currentProgressReward.progressComplete
                                ? currentProgressReward.numOfReceivedReward > indexReward
                                  ? ''
                                  : currentProgressReward.progressAnimation >=
                                    ((indexReward + 1) / 16) * 100
                                    ? 'animation-icon-reward'
                                    : ''
                                : ''
                              " no-spinner no-transition></q-img>
                        </div>
                      </div>
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Your reward -->
              <div align="center" class="q-mt-lg">
                <!-- Label Reward -->
                <div class="relative-position">
                  <q-img width="200px" src="/images/label_main/label-your-reward.png" no-spinner no-transition></q-img>
                </div>

                <div class="q-my-md q-mt-lg q-pb-lg relative-position">
                  <div class="relative-position" align="center">
                    <!-- Animation Light -->
                    <div class="absolute-center">
                      <q-img :src="`/images/icon_main/icon-animation-${currentProgressReward.reward[0].type == 'coin'
                          ? 'coin'
                          : 'premium-key'
                        }-reward.png`" width="150px" no-spinner no-transition class="animation-reward"></q-img>
                    </div>

                    <div class="relative-position">
                      <q-img width="100px" src="/images/icon_main/icon-premium-key.png" no-spinner no-trasnsition
                        v-if="currentProgressReward.reward[0].type == 'key'"></q-img>

                      <q-img width="100px" src="/images/icon_main/icon-winner-coin.png" no-spinner no-trasnsition
                        v-else></q-img>

                      <div class="absolute-bottom f40 font-mali-b text-number-reward" style="bottom: -20px">
                        {{ `${currentProgressReward.reward[0].value}` }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- #endregion -->

              <!-- #region Button -->
              <div class="q-py-sm" align="center">
                <div class="relative-position animate__animated animate__bounceIn animation-duration-0-5s"
                  style="width:100%;animation-delay: 0.5s">
                  <q-img width="274px" src="/images/button_main/button-get-reward.png" no-spinner no-transition
                    class="cursor-pointer button-active-main" @click="funcGetReward()"></q-img>
                </div>
              </div>
              <!-- #endregion -->
            </div>
          </div>

          <!-- #region Label -->
          <div class="absolute-center box-label-practice-complete-unit">
            <div class="animate__animated animate__bounceIn animation-duration-0-5s animate__delay-2s">
              <q-img width="150px" src="/images/label_main/label-practice-complete-unit.png" no-spinner
                no-transition></q-img>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog change level -->
  <q-dialog maximized persistent v-model="isShowDialogChangeLevel">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s"
          style="width: 360px; border-radius: 12px; padding: 10px">
          <div class="fit" style="
              width: 100%;
              height: 100%;
              background-color: #ffedc4;
              border-radius: 12px;
              padding: 32px 20px 24px 20px;
              box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
              color: #512a08;
            ">
            <!-- Text: คุณต้องการเปลี่ยน Level หรือไม่ -->
            <div class="f20 font-mali-b text-center">
              <div>
                {{ `เปลี่ยนระดับการเรียน` }}
              </div>
            </div>

            <div style="margin-top: 16px">
              <div class="row items-center justify-center">
                <div class="row justify-center items-center" style="
                    width: 120px;
                    height: 40px;
                    padding: 8px 16px;
                    background: #ffffff;
                    border: 1px solid #4a216b;
                    border-radius: 10px;
                  ">
                  <div class="col self-center font-mali-sb" style="font-size: 12px">
                    {{ `Level ${currentLevelSelected}` }}
                  </div>
                  <div class="self-center" v-if="studentStore.studentType != 'school' && false">
                    <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                  </div>
                  <q-menu transition-show="jump-down" transition-hide="jump-up"
                    class="relative-position z-max transparent" :offset="[0, 7]" fit v-if="false">
                    <div style="
                        height: fit-content;
                        height: 200px;
                        background: #ffffff;
                        border: 1px solid #4a216b;
                        border-radius: 10px;
                        padding: 4px;
                      ">
                      <q-scroll-area :visible="true" :vertical-thumb-style="{
                        width: '4px',
                        background: '#4a261b',
                        opacity: '1',
                      }" :vertical-bar-style="{
                          width: '8px',
                        }" class="full-width full-height">
                        <div clickable v-close-popup
                          class="cursor-pointer row items-center justify-between item-list-level mobile box-item-menu relative-position"
                          :style="{
                            marginBottom:
                              indexLevel === showCurrentLevelList.length - 1
                                ? '0px'
                                : '6px',
                          }" v-for="(itemLevel, indexLevel) in showCurrentLevelList" align="center" :class="itemLevel.progressAVG >= 100
                              ? currentLevelSelected == itemLevel.level
                                ? 'success active-menu'
                                : 'success'
                              : currentLevelSelected == itemLevel.level
                                ? 'active-menu'
                                : 'not-active'
                            " :key="indexLevel" @click="funcGetCurrentLeveltoChange(itemLevel)">
                          <div class="self-center font-mali-sb" align="left" style="font-size: 12px">
                            <span> {{ `Level ${itemLevel.level}` }}</span>
                          </div>
                        </div>
                      </q-scroll-area>
                    </div>
                  </q-menu>
                </div>

                <div style="width: 40px; margin-left: 8px; margin-right: 4px">
                  <q-img src="/images/icon_main/change-level-icon.png" no-spinner no-transition></q-img>
                </div>

                <div class="row justify-center items-center cursor-pointer" style="
                    width: 120px;
                    height: 40px;
                    padding: 8px 16px;
                    background: #ffffff;
                    border: 1px solid #4a216b;
                    border-radius: 10px;
                  ">
                  <div v-if="changeLevelSelected" class="col self-center font-mali-sb" style="font-size: 12px">
                    {{ `Level ${changeLevelSelected}` }}
                  </div>
                  <div v-else class="col self-center font-mali-sb" style="font-size: 12px; color: #a6a6a6">
                    {{ `เลือก` }}
                  </div>
                  <div class="self-center" v-if="studentStore.studentType != 'school'">
                    <q-icon name="fas fa-caret-down" style="width: 10px; height: 8px"></q-icon>
                  </div>
                  <q-menu transition-show="jump-down" transition-hide="jump-up"
                    class="relative-position z-max transparent" :offset="[0, 7]" fit>
                    <div style="
                        height: fit-content;
                        height: 200px;
                        background: #ffffff;
                        border: 1px solid #4a216b;
                        border-radius: 10px;
                        padding: 4px;
                      ">
                      <q-scroll-area :visible="true" :vertical-thumb-style="{
                        width: '4px',
                        background: '#4a261b',
                        opacity: '1',
                      }" :vertical-bar-style="{
                          width: '8px',
                        }" class="full-width full-height">
                        <div clickable v-close-popup
                          class="cursor-pointer row items-center justify-between item-list-level mobile box-item-menu relative-position"
                          :style="{
                            marginBottom:
                              indexLevel === practiceStore.levelOptions.length - 1
                                ? '0px'
                                : '6px',
                          }" v-for="(itemLevel, indexLevel) in showChangeLevelList" align="center" :class="itemLevel.isSuccess
                              ? changeLevelSelected == itemLevel.value
                                ? 'success active-menu'
                                : 'success'
                              : changeLevelSelected == itemLevel.value
                                ? 'active-menu'
                                : 'not-active'
                            " :key="indexLevel" @click="funcGetChangeLevel(itemLevel)">
                          <div class="self-center font-mali-sb" align="left" style="font-size: 12px">
                            <span> {{ `Level ${itemLevel.value}` }}</span>
                          </div>
                        </div>
                      </q-scroll-area>
                    </div>
                  </q-menu>
                </div>
              </div>
              <!-- Text: การเปลี่ยน Level จะทำให้ความคืบหน้าที่ทำไว้หายไป -->
              <div class="f14 q-mt-sm font-mali-r" align="center">
                <div>เลือกเปลี่ยนได้เฉพาะระดับการเรียน <br />ที่ยังไม่เคยมีเท่านั้น</div>
              </div>
            </div>

            <!-- #region Button -->
            <div class="row items-center justify-center" style="margin-top: 16px">
              <div class="relative-position cursor-pointer" style="margin-right: 4px"
                @click="funcCloseDialogChangelevel()">
                <q-img style="height: 40px; width: 126px" src="/images/button_main/button-cancel-changelevel.png"
                  no-spinner no-transition></q-img>
                <div class="absolute-center full-width text-center label-cancel-changelevel">
                  ยกเลิก
                </div>
              </div>
              <div class="relative-position cursor-pointer" style="margin-left: 4px" @click="
                changeLevelSelected ? (isShowDialogConfirmChangeLevel = true) : null
                ">
                <q-img style="height: 40px; width: 126px" :src="`/images/button_main/${changeLevelSelected
                    ? 'button-confirm-changelevel'
                    : 'button-disable-changelevel'
                  }.png`" no-spinner no-transition></q-img>
                <div class="absolute-center full-width text-center" :class="changeLevelSelected
                    ? 'label-cancel-changelevel'
                    : 'label-disable-changelevel'
                  ">
                  ยืนยัน
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion-->

  <!-- #region Dialog Level Locked -->
  <q-dialog v-model="isShowDialogLevelLocked" persistent maximized class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-level-locked relative-position">
          <div class="box-sub-level-locked row justify-center items-center" align="center">
            <div class="col-12">
              <div class="text-level-locked font-mali-b f20">
                {{ `ระดับ ${practiceStore.practiceLockData.value} ถูกล็อกอยู่` }}
              </div>
              <div class="q-mt-md font-mali-r f14" align="center">
                ปลดล็อกได้โดยการซื้อระดับการเรียน <br />
                ในหน้าแพ็กเกจการเรียน
              </div>
              <div class="q-mt-lg row justify-between f14 text-white" style="width: 100%">
                <div class="col">
                  <div class="button-previous relative-position cursor-pointer font-mali-b"
                    @click="isShowDialogLevelLocked = false" v-close-popup>
                    <div class="sub">ย้อนกลับ</div>
                  </div>
                </div>
                <div class="col">
                  <div class="button-go-to-package cursor-pointer font-mali-b" @click="funcGoToPackage()">
                    <div class="sub">ไปหน้าแพ็กเกจ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute-center" style="top: 25px; width: 120%; margin: auto">
            <q-img src="/images/box_main/box-level-locked-header.webp" no-spinner no-transition></q-img>
          </div>
          <div class="absolute-center" style="top: 93%; width: 110%; margin: auto">
            <q-img src="/images/box_main/box-level-locked-footer.webp" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Confirm change level -->
  <q-dialog maximized persistent v-model="isShowDialogConfirmChangeLevel">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div
          class="relative-position box-practice-complete-unit-main animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s"
          style="width: 320px; border-radius: 16px; padding: 8px">
          <div class="fit" style="
              width: 100%;
              height: 100%;
              background-color: #ffedc4;
              border-radius: 12px;
              padding: 24px 8px 8px 8px;
              box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
              color: #512a08;
            ">
            <!-- Text: คุณต้องการเปลี่ยน Level หรือไม่ -->
            <div class="f20 font-mali-b text-center">
              <div>
                {{ `เปลี่ยนระดับการเรียน ` }}
              </div>
            </div>

            <div style="margin-top: 16px">
              <!-- Text: การเปลี่ยน Level จะทำให้ความคืบหน้าที่ทำไว้หายไป -->
              <div class="f14 q-mt-sm font-mali-sb" align="center">
                <div>ยืนยันเปลี่ยนระดับการเรียน</div>
                <div>
                  จาก
                  <span class="font-mali-b f16" style="color: #ff2c2c">Level {{ currentLevelSelected }}</span>
                  เป็น
                  <span class="font-mali-b f16" style="color: #0085ff">Level {{ changeLevelSelected }}</span>
                </div>
                <div class="font-mali-m f12 q-mt-xs">
                  {{ `(สามารถเปลี่ยนระดับได้เพียงครั้งเดียวเท่านั้น)` }}
                </div>
              </div>
            </div>

            <!-- #region Button -->
            <div class="row items-center justify-center" style="margin-top: 16px">
              <div class="relative-position cursor-pointer" style="margin-right: 4px"
                @click="isShowDialogConfirmChangeLevel = false">
                <q-img style="width: 136px" src="/images/button_main/button-cancel-changelevel.png" no-spinner
                  no-transition></q-img>
                <div class="absolute-center full-width text-center label-cancel-changelevel">
                  ยกเลิก
                </div>
              </div>
              <div class="relative-position cursor-pointer" style="margin-left: 4px" @click="funcComfirmChangeLevel()">
                <q-img style="width: 136px" :src="`/images/button_main/${changeLevelSelected
                    ? 'button-confirm-changelevel'
                    : 'button-disable-changelevel'
                  }.png`" no-spinner no-transition></q-img>
                <div class="absolute-center full-width text-center" :class="changeLevelSelected
                    ? 'label-cancel-changelevel'
                    : 'label-disable-changelevel'
                  ">
                  ยืนยัน
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Success unlock level -->
  <q-dialog maximized persistent v-model="isShowDialogSuccessUnlockLevel">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding relative-position">
        <div
          class="relative-position animate__animated animation-duration-0-5s animate__flipInY animate__delay-1s main-box-dialog-unlock-level-success">
          <div class="absolute-center" style="top: 0">
            <q-img class="top-frame-success-unlock-level" src="/images/box_main/top-frame-success-unlock-level.png"
              no-spinner no-transition></q-img>
          </div>

          <div class="inside-box-dialog-unlock-level-success">
            <!-- Text: คุณต้องการเปลี่ยน Level หรือไม่ -->
            <div class="f20 font-mali-b text-center">
              <div>
                {{ `ปลดล็อกระดับการเรียน` }}
              </div>
            </div>

            <div class="text-center box-show-level-unlock">
              <div class="font-mali-b text-inside-box-level-unlock">ระดับ</div>
              <div class="font-mali-b number-inside-box-level-unlock">
                {{ changeLevelSelected }}
              </div>
            </div>

            <div style="margin-top: 21px">
              {{ `ระดับ ${changeLevelSelected} พร้อมสำหรับเริ่มเรียนแล้ว!` }}
            </div>

            <!-- #region Button -->
            <div class="row items-center justify-center" style="margin-top: 16px">
              <div class="relative-position cursor-pointer" style="margin-right: 4px" @click="funcApceptUnlockLevel()">
                <q-img class="button-ok-unlock-level" src="/images/button_main/button-ok-unlock-level.png" no-spinner
                  no-transition></q-img>
                <div class="absolute-center full-width text-center label-cancel-changelevel">
                  ตกลง
                </div>
              </div>
            </div>
            <!-- #endregion -->
          </div>
          <div class="absolute" style="bottom: -12px; left: -14px">
            <q-img class="bottom-frame-success-unlock-level"
              src="/images/box_main/bottom-frame-success-unlock-level.png" no-spinner no-transition></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Setting -->
  <dialog-setting @callback-closeDialog="isShowDialogSetting = false"
    :isDialogSetting="isShowDialogSetting"></dialog-setting>
  <!-- #endregion -->

  <!-- #region Dialog Tutorial -->
  <dialog-tutorial v-if="isShowDialogTutorial" :isDialogTutorial="isShowDialogTutorial" :systemStore="systemStore"
    @callback-closeDialog="funcCloseTutorial()" :pageName="`practice-list`"></dialog-tutorial>
  <!-- #endregion -->

  <!-- #region Dialog Loading -->
  <dialog-loading :isShowLoading="isShowLoading"></dialog-loading>
  <!-- #endregion -->

  <!-- #region Dialog Unlock level -->
  <!-- <dialog-unlock-level
    v-if="isShowDialogUnlockLevel"
    @callback-closeDialog="isShowDialogUnlockLevel = false"
    @callback-unlockLevel="funcUnlockLevel()"
  ></dialog-unlock-level> -->
  <!-- #endregion -->

  <dialog-maintenance v-if="isShowDialogMaintenance"
    @callback-closeDialogMaintenance="isShowDialogMaintenance = false"></dialog-maintenance>
</template>

<script setup>
import backgroundMain from "../components/background_main/background-practice-skill.vue";
import dialogLoading from "../components/dialog-loading.vue";
import dialogLearningSwipe from "../components/dialog_main/dialog-learning-swipe.vue";
import dialogTutorial from "../components/dialog_main/tutorial.vue";
import dialogSetting from "../components/dialog_main/setting-dialog.vue";
import dialogUnlockLevel from "../components/dialog_main/dialog-unlock-level-2.vue";

import dialogMaintenance from "../components/dialog_main/dialog-maintenance.vue";

import { ref, onMounted, onBeforeUnmount, defineComponent, computed, watch } from "vue";
import { useSystemStore } from "src/stores/system";
import { usePracticeStore } from "src/stores/practice";
import { useStudentStore } from "src/stores/student";
import { useCourseStore } from "src/stores/course";
import { useSynchronizeStore } from "src/stores/synchronize";

import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import router from "src/router";

const components = defineComponent({
  backgroundMain,
  dialogLoading,
  dialogLearningSwipe,
  dialogTutorial,
  dialogSetting,
  dialogUnlockLevel,
  dialogMaintenance,
});

// #region Initialize Store

const systemStore = useSystemStore();
const studentStore = useStudentStore();
const courseStore = useCourseStore();
const practiceStore = usePracticeStore();
const synchronizeStore = useSynchronizeStore();

// #endregion

// #region new delected box practice----------

const isShowDialogChangeLevel = ref(false);
const isShowDialogConfirmChangeLevel = ref(false);
const isShowDialogSuccessUnlockLevel = ref(false);
const currentLevelSelected = ref(practiceStore.level);
const changeLevelSelected = ref(null);

const funcGetCurrentLeveltoChange = (item) => {
  currentLevelSelected.value = item.level;
};

const funcGetChangeLevel = (item) => {
  changeLevelSelected.value = item.value;
};

const isExpandBoxPractice = ref(false);
const expandedPracticeUnit = () => {
  isExpandBoxPractice.value = !isExpandBoxPractice.value;
};

const subLevelText = ref("Level");
const changeScreenSize = () => {
  if (window.innerWidth <= 1366) {
    if (isExpandBoxPractice.value) {
      subLevelText.value = "Level";
    } else {
      subLevelText.value = "Lv";
    }
  } else {
    subLevelText.value = "Level";
  }
};

const funcOpenDialogChangelevel = () => {
  isShowDialogChangeLevel.value = true;
  currentLevelSelected.value = levelSelected.value;
};

const funcCloseDialogChangelevel = () => {
  isShowDialogChangeLevel.value = false;
  changeLevelSelected.value = null;
  currentLevelSelected.value = practiceStore.level;
};

const funcComfirmChangeLevel = async () => {
  isShowDialogChangeLevel.value = false;
  isShowDialogConfirmChangeLevel.value = false;

  $q.loading.show();

  await courseStore.changeLevel(changeLevelSelected.value);

  await courseStore.getAllCourse();

  let findCourse = courseStore.list.find(
    (item) => item.level == changeLevelSelected.value
  );

  if (findCourse) {
    currentLevelSelected.value = practiceStore.level;

    systemStore.setParameter({
      level: findCourse.level,
    });

    practiceStore.setLockPracticeData(findCourse.level);

    levelSelected.value = findCourse.level;

    practiceStore.setPracticeUnit("1");
    unitSelected.value = "1";

    practiceStore.setPracticelevel(findCourse.level.toString());

    await studentStore.updateCurrentCourseId(findCourse.courseId);

    practiceStore.practiceUpdateByLevel();

    await practiceStore.getPracticeLog();

    practiceStore.clearPracticeComplete();

    isShowDialogSuccessUnlockLevel.value = true;
  }

  $q.loading.hide();
};

const funcApceptUnlockLevel = () => {
  changeLevelSelected.value = null;
  isShowDialogSuccessUnlockLevel.value = false;

  isShowDialogSkillContentByUnit.value = true;
};

watch(isExpandBoxPractice, () => {
  if (isExpandBoxPractice.value) {
    subLevelText.value = "Level";
  } else {
    subLevelText.value = "Lv";
  }
});

//#endregion new delected box practice----------

// #region Initialize Data

const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();

const levelSelected = ref(practiceStore.level);
const unitSelected = ref("1");
const isShowDialogLearningSwipe = ref(false);
const isShowLoading = ref(false);
const practiceSkill = ref(practiceStore.skill);
const isShowDialogLevelExpired = ref(false);

const showCompleteUnit = ref({});
const showCompleteUnitList = ref([]);

const currentProgressReward = ref({});

const isShowDialogMaintenance = ref(false);

const windowSize = ref({
  width: 1200,
  height: 0,
});

const skillDataList = ref([
  {
    skill: "vocabulary",
    name: "Vocabulary",
    position: {
      top: "-2.2%",
      left: "-3%",
    },
    linePosition: {
      top: "95%",
      left: "52%",
    },
    lineAbsolute: "absolute",
  },
  {
    skill: "grammar",
    name: "Grammar",
    position: {
      top: "-2.2%",
      left: "33%",
    },
    linePosition: {
      top: "95%",
      left: "30%",
    },
    lineAbsolute: "absolute",
  },
  {
    skill: "writing",
    name: "Writing",
    position: {
      top: "-2.2%",
      left: "69%",
    },
    linePosition: {
      top: "95%",
      left: "16%",
    },
    lineAbsolute: "absolute",
  },

  // Bottom
  {
    skill: "reading",
    name: "Reading",

    position: {
      top: "79%",
      left: "-3%",
    },
    linePosition: {
      top: "-83%",
      left: "51%",
    },
    lineAbsolute: "absolute-top",
  },
  {
    skill: "phonics",
    name: "Phonics",
    position: {
      top: "79%",
      left: "33%",
    },
    linePosition: {
      bottom: "95%",
      left: "33%",
    },
    lineAbsolute: "absolute-bottom",
  },
  {
    skill: "listening",
    name: "Listening & Speaking",
    position: {
      top: "79%",
      left: "69%",
    },
    linePosition: {
      top: "-83%",
      left: "17%",
    },
    lineAbsolute: "absolute-top",
  },
]);

const skillSelected = ref({
  label: "คำศัพท์",
  value: "Vocabulary",
});

const skillOptions = ref([
  {
    label: "คำศัพท์",
    value: "Vocabulary",
  },
  {
    label: "ไวยากรณ์",
    value: "Grammar",
  },
  {
    label: "การเขียน",
    value: "Writing",
  },
  {
    label: "การอ่าน",
    value: "Reading",
  },
  {
    label: "การออกเสียง",
    value: "Phonics",
  },
  {
    label: "การฟังและการพูด",
    value: "Listening",
  },
]);

// Dialog
const isShowDialogProgressAllLevel = ref(false);
const isShowDialogGetReward = ref(false);
const isShowDialogCompleteUnit = ref(false);
const isShowDialogSkillContentByUnit = ref(false);
const isShowDialogBookOfContent = ref(false);
const isShowDialogTutorial = ref(false);
const isShowDialogSetting = ref(false);
const isShowDialogListOfContent = ref(false);
const isShowDialogUnlockLevel = ref(false);
const isShowDialogLevelLocked = ref(false);

// #endregion

// #region Select Level
const funcSelectLevel = async (item) => {
  if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
    courseStore.isShowDialogLevelExpired = false;

    setTimeout(() => {
      courseStore.isShowDialogLevelExpired = true;
    }, 50);

    return;
  }

  isExpandBoxPractice.value = false;

  systemStore.setParameter({
    level: item.value,
  });

  practiceStore.setLockPracticeData(item);

  if (item.value == levelSelected.value) {
    isShowDialogUnlockLevel.value = false;
    return;
  }

  if (item.isLock) {
    practiceStore.setLockPracticeData(item);

    if (studentStore.studentType == "demo") {
      // systemStore.activeState.isShowDialogPackageMenu = true;
      return;
    }

    isShowDialogLevelLocked.value = true;

    // if (systemStore.activeStatus.isHasUnlockLevel) {
    //   isShowDialogUnlockLevel.value = true;
    // } else {
    //   isShowDialogUnlockLevel.value = true;
    // }
    return;
  }

  isShowLoading.value = true;

  levelSelected.value = item.value;
  levelSelected.value.toString();

  isShowDialogUnlockLevel.value = false;

  practiceStore.setPracticeUnit("1");
  unitSelected.value = "1";

  practiceStore.setPracticelevel(levelSelected.value.toString());

  await studentStore.updateCurrentCourseId(item.id);

  practiceStore.practiceUpdateByLevel();

  await practiceStore.getPracticeLog();

  practiceStore.clearPracticeComplete();

  isShowLoading.value = false;
  isShowDialogSkillContentByUnit.value = true;
};
// #endregion

// #region Scroll to level
const funcScrollToLevel = () => {
  if (studentStore.studentType == "online") {
    setTimeout(() => {
      let el = document.getElementById(`level-${levelSelected.value}`);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 25);
  }
};
// #endregion

// #region Select Unit
const funcSelectUnit = (item) => {
  if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
    courseStore.isShowDialogLevelExpired = false;

    setTimeout(() => {
      courseStore.isShowDialogLevelExpired = true;
    }, 50);

    return;
  }

  isExpandBoxPractice.value = false;

  const systemStore = useSystemStore();
  const studentStore = useStudentStore();
  const practiceStore = usePracticeStore();

  if (isShowDialogSkillContentByUnit.value) return;

  if (studentStore.studentType == "demo" && item.value > studentStore.studentDemoUnit) {
    systemStore.activeState.isShowDialogPackageMenu = true;
    return;
  }

  unitSelected.value = item.value;
  unitSelected.value.toString();

  practiceStore.setPracticeUnit(unitSelected.value.toString());
  practiceStore.setPracticeSkill("Vocabulary");

  isShowDialogSkillContentByUnit.value = true;
};
// #endregion

// #region Scroll to unit
const funcScrollToUnit = () => {
  setTimeout(() => {
    let el = document.getElementById(`unit-${unitSelected.value}`);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 25);
};
// #endregion

// #region Close Dialog Skill content
const funcCloseDialogSkillContent = () => {
  isShowDialogSkillContentByUnit.value = false;
};
// #endregion

// #region Close Tutorial
const funcCloseTutorial = () => {
  isShowDialogTutorial.value = false;
};
// #endregion

// #region Scroll Control
const eventScroll = () => {
  const slider = document.querySelector(".background-practice-list");
  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let scrollTop;

  const mouseDownHandler = (e) => {
    isDown = true;

    startX = e.pageX - slider.offsetLeft;
    startY = e.pageY - slider.offsetTop;

    scrollLeft = slider.scrollLeft;
    scrollTop = slider.scrollTop;

    slider.addEventListener("mousemove", mouseMoveHandler);
    slider.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - startX) * 1; //scroll-fast
    const walkY = (y - startY) * 1; //scroll-fast
    slider.scrollLeft = scrollLeft - walkX;
    slider.scrollTop = scrollTop - walkY;
  };

  const mouseUpHandler = () => {
    isDown = false;

    slider.removeEventListener("mousemove", mouseMoveHandler);
    slider.removeEventListener("mouseup", mouseUpHandler);
  };

  const mouseLeave = () => {
    isDown = false;

    slider.removeEventListener("mousemove", mouseMoveHandler);
    slider.removeEventListener("mouseup", mouseUpHandler);
  };

  slider.addEventListener("mouseLeave", mouseLeave);
  slider.addEventListener("mousedown", mouseDownHandler);
};
// #endregion

// #region Back to Lobby
const funcGoToHome = () => {
  $router.replace("/lobby");
};
// #endregion

// #region Test Animation
const funcCloseDialogCompleteUnit = () => {
  // practiceStore.practiceCompleteData.isShowDialogPracticeComplete = false;
};
// #endregion

// #region handle Swipe
const handleSwipe = (e) => {
  const practiceStore = usePracticeStore();
  practiceStore.setPracticeSkill(practiceSkill.value);
};
// #endregion

// #region Go to skill
const funcGotoSkill = (data) => {
  if (courseStore.isCurrentCourseExpired || courseStore.isAllCourseExpired) {
    courseStore.isShowDialogLevelExpired = false;

    setTimeout(() => {
      courseStore.isShowDialogLevelExpired = true;
    }, 50);

    return;
  }

  if (data.isLock) return;
  practiceStore.setPracticeSkill(data.name);
  $router.replace("/practice/unit");
};
// #endregion

// #region Close Unlock Level
const funcUnlockLevel = async () => {
  const courseStore = useCourseStore();

  isShowLoading.value = true;

  levelSelected.value = practiceStore.level;
  levelSelected.value.toString();

  isShowDialogUnlockLevel.value = false;

  practiceStore.setPracticeUnit("1");
  unitSelected.value = "1";

  practiceStore.setPracticelevel(levelSelected.value.toString());

  await studentStore.updateCurrentCourseId(studentStore.courseId);

  practiceStore.practiceUpdateByLevel();

  await practiceStore.getPracticeLog();

  practiceStore.clearPracticeComplete();

  isShowLoading.value = false;
  isShowDialogSkillContentByUnit.value = true;
};
// #endregion

// #region Resize
let listenTimeAnimation = null;
const isShowDialogLearningSwipeFirst = ref(false);
const onResize = (size) => {
  if (listenTimeAnimation) {
    clearTimeout(listenTimeAnimation);
  }

  windowSize.value = size;
  if (size.width < 1000) {
    if (!isShowDialogLearningSwipeFirst.value) {
      isShowDialogLearningSwipe.value = true;
      listenTimeAnimation = setTimeout(() => {
        animationSwipeHand();
      }, 500);
    }

    isShowDialogLearningSwipeFirst.value = true;
  } else {
    isShowDialogLearningSwipe.value = false;
    if (setTimeSwipeHand) clearInterval(setTimeSwipeHand);
  }
};

let setTimeSwipeHand = null;
const animationSwipeHand = () => {
  let el = document.getElementById("swipe-hand-id");

  if (setTimeSwipeHand) clearInterval(setTimeSwipeHand);

  let currentPosition = 0;
  setTimeSwipeHand = setInterval(() => {
    el.style.backgroundPosition = `-${currentPosition}px 0px`;

    if (currentPosition >= 1200) {
      currentPosition = 0;
    } else {
      currentPosition += 151;
    }
  }, 300);
};
// #endregion

// #region Close Dialog Learning Swipe
const funcCloseDialogLearning = () => {
  if (setTimeSwipeHand) clearInterval(setTimeSwipeHand);
  isShowDialogLearningSwipe.value = false;
};
// #endregion

// #region get reward
const funcGetReward = async () => {
  try {
    isShowLoading.value = true;
    isShowDialogGetReward.value = false;
    isShowDialogCompleteUnit.value = false;

    let response = null;

    let findReward = practiceStore.practiceCompleteList.filter(
      (x) => x.reward.length > 0
    );

    if (findReward.length == 0) {
      response = await practiceStore.getCurrentRewardComplete(findReward[0].courseId);
    } else {
      response = await practiceStore.getRewardAllComplete(findReward);
    }

    if (response != "success") {
      throw new Error("error");
    }

    isShowLoading.value = false;
  } catch (e) {
    // ในกรณีที่มากกว่า 1 รางวัล
    if (practiceStore.currentProgressByLevel.reward.length > 1) {
      isShowDialogProgressAllLevel.value = true;
    }
    // ในกรณีที่มี 1 รางวัล
    else {
      isShowDialogCompleteUnit.value = true;
    }

    isShowLoading.value = false;

    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
    });
  }
};
// #endregion

// #region get unit progress
const funcCheckUnitProgress = async () => {
  const courseStore = useCourseStore();
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  try {
    if (!practiceStore.isFirstLoadingLessonAchievement) {
      isShowLoading.value = true;

      let responseUnitProgress = await practiceStore.checkUnitProgress(
        studentStore.courseId
      );

      if (responseUnitProgress != "success") {
        throw new Error("error");
      }

      funcCheckHasReward();

      isShowLoading.value = false;

      return;
    }

    // Student Type Online
    if (studentStore.studentType != "school") {
      let responseUnitProgress = await practiceStore.checkUnitProgress(
        studentStore.courseId
      );

      if (responseUnitProgress != "success") {
        throw new Error("error");
      }

      if (practiceStore.isShowDialogPracticeComplete) {
        isShowDialogProgressAllLevel.value = true;
      }

      isShowLoading.value = false;

      responseUnitProgress = await practiceStore.getUnitProgressForStudentOnline();

      if (responseUnitProgress != "success") {
        throw new Error("error");
      }
    }

    // Student Type School
    else {
      let responseUnitProgress = await practiceStore.checkUnitProgress(
        studentStore.courseId
      );

      if (responseUnitProgress != "success") {
        throw new Error("error");
      }

      showRewardListAll.value = practiceStore.practiceCompleteList;

      if (practiceStore.isShowDialogPracticeComplete) {
        isShowDialogProgressAllLevel.value = true;
      }

      isShowLoading.value = false;
    }
  } catch (e) {
    $router.replace("/lobby");
    return e;
  }
};
// #endregion

// #region get current course unit progress
const funcGetCurrentCourseUnitProgress = async () => {
  try {
    isShowLoading.value = true;

    let responseUnitProgress = await practiceStore.checkUnitProgress(
      studentStore.courseId
    );

    if (responseUnitProgress != "success") {
      throw new Error("error");
    }

    return "success";
  } catch (e) {
    return "error";
  }
};

// #endregion

// #region Animation Progress
const funcAnimationProgressBar = (min, max) => {
  let sum = 0;

  if (min == max) {
    sum = (min / 16) * 100;
  } else {
    sum = (max / 16) * 100;
  }

  return sum;
};
// #endregion

// #region aniamtion progress bar
let listenAnimation = null;
const funcForAniamtionBar = () => {
  clearTimeout(listenAnimation);

  showRewardListAll.value.map((x) => {
    x.progressAnimation = x.progressComplete;
    return x;
  });

  listenAnimation = setTimeout(() => {
    showRewardListAll.value.map((x) => {
      x.progressAnimation = funcAnimationProgressBar(x.numOfReceivedReward, x.rewardStep);

      return x;
    });

    clearTimeout(listenAnimation);
  }, 1500);
};
// #endregion

// #region Check Reward
const isShowDialogGetRewardAll = ref(false);
const showRewardListAll = ref([]);
const funcCheckHasReward = () => {
  isShowDialogProgressAllLevel.value = false;
  isShowDialogGetRewardAll.value = false;
  isShowDialogCompleteUnit.value = false;

  showRewardListAll.value = [];

  let tempReward = practiceStore.practiceCompleteList.filter((x) => x.reward.length);

  if (practiceStore.isHaveReward) {
    showRewardListAll.value = tempReward;

    if (tempReward.length == 1) {
      if (tempReward[0].reward.length == 1) {
        currentProgressReward.value = tempReward[0];

        currentProgressReward.value.progressAnimation =
          currentProgressReward.value.progressComplete;

        setTimeout(() => {
          currentProgressReward.value.progressAnimation = funcAnimationProgressBar(
            currentProgressReward.value.numOfReceivedReward,
            currentProgressReward.value.rewardStep
          );
        }, 1500);

        isShowDialogCompleteUnit.value = true;
      } else {
        isShowDialogGetRewardAll.value = true;
      }
    } else {
      isShowDialogGetRewardAll.value = true;
    }

    funcForAniamtionBar();
  } else {
    practiceStore.clearPracticeComplete();
  }
};
// #endregion

// #region Go to package
const funcGoToPackage = () => {
  // isShowDialogMaintenance.value = true;
  $router.replace("/subscribepackage");
};
// #endregion

// #region Sum Total Reward
const funcSumTotalReward = () => {
  isShowDialogGetRewardAll.value = false;
  isShowDialogProgressAllLevel.value = false;
  isShowDialogGetReward.value = true;
};
// #endregion

watch(
  () => practiceStore.isLoadedPracticeCompleteReward,
  (value) => {
    // box-progress-scroll scroll this class to bottom
    if (value) {
      const scrollArea = document.querySelector(".box-progress-scroll");

      if (scrollArea) {
        const maxScrollTop = scrollArea.scrollHeight - scrollArea.clientHeight; // Maximum scrollable position
        const duration = 2000; // Total animation duration in milliseconds
        const startScroll = scrollArea.scrollTop;
        const distance = maxScrollTop - startScroll;
        const startTime = performance.now();

        function animateScroll(timestamp) {
          const elapsed = timestamp - startTime; // Time elapsed since the start
          const progress = Math.min(elapsed / duration, 1); // Ensure progress doesn't exceed 1
          const ease = 1 - Math.pow(1 - progress, 3); // Cubic easing for smooth effect
          const scrollPosition = startScroll + distance * ease; // Calculate eased scroll position

          scrollArea.scrollTo(0, scrollPosition);

          if (progress < 1) {
            requestAnimationFrame(animateScroll); // Continue the animation
          }
        }

        requestAnimationFrame(animateScroll); // Start the animation
      }
    }
  }
);

// #region ***** Computed *****

// #region Show Reward List
const showRewardList = computed(() => {
  let temp = [];

  let totalCoinReward = 0;
  let totalKeyReward = 0;

  for (let i = 0; i < showRewardListAll.value.length; i++) {
    let resPracticeCompleteList = showRewardListAll.value[i];

    for (let ii = 0; ii < resPracticeCompleteList.reward.length; ii++) {
      let resReward = resPracticeCompleteList.reward[ii];

      if (resReward.type == "coin") {
        totalCoinReward += resReward.value;
      }

      if (resReward.type == "key") {
        totalKeyReward += resReward.value;
      }
    }
  }

  if (totalCoinReward > 0) {
    temp.push({
      type: "coin",
      value: totalCoinReward,
    });
  }

  if (totalKeyReward > 0) {
    temp.push({
      type: "key",
      value: totalKeyReward,
    });
  }

  return temp;
});
// #endregion

// #region Show Change Level
const showChangeLevelList = computed(() => {
  let temp = [];

  let currentCourseLevel = courseStore.list;

  for (let i = 1; i <= 12; i++) {
    let level = i.toString();
    let course = currentCourseLevel.find((x) => x.level == level);

    if (!course) {
      temp.push({
        value: i,
        label: `Level ${i}`,
      });
    }
  }

  return temp;
});
// #endregion

// #region Show Current level
const showCurrentLevelList = computed(() => {
  let temp = [];

  let currentCourseLevel = courseStore.list;

  temp = currentCourseLevel.filter((x) => x.progressAVG < 20);

  return temp;
});
// #endregion

// #region Countdown time for change level
const showCountownTime = computed(() => {
  const courseStore = useCourseStore();

  let temp = "";

  if (!courseStore.courseData.isExpired) {
    temp = courseStore.courseData.textChangeLevel;
  }

  return temp;
});
// #endregion

// #endregion ***** Computed *****

onMounted(async () => {
  systemStore.setRouter("practice-list");

  unitSelected.value = practiceStore.unit;

  isShowLoading.value = true;

  let isCheckTutorial = systemStore.checkFirstTutorial("practice-list");

  if (!synchronizeStore.isSync) {
    if (isCheckTutorial) {
      isShowDialogTutorial.value = true;
    }

    await funcCheckUnitProgress();
  }

  isShowLoading.value = false;

  window.addEventListener("resize", changeScreenSize);

  if ($q.platform.is.mobile) {
    if (isExpandBoxPractice.value) {
      subLevelText.value = "Level";
    } else {
      subLevelText.value = "Lv";
    }
  }
});
onBeforeUnmount(() => {
  // document.removeEventListener("load", eventScroll);
  window.removeEventListener("resize", changeScreenSize);
});
</script>

<style lang="scss" scoped>
// #region Background main

.background-practice-list-mobile {
  width: 100%;
  min-width: 360px;
  background-image: url("/images/background_main/background-practice-list-2.png");
  background-size: cover;
  background-position: 30% 0%;
  background-origin: border-box;
}

.background-practice-list {
  width: 100%;
  min-width: 1000px;
  position: relative;
  background-image: url("/images/background_main/backdrop-practicelist.png");
  background-size: cover;
  background-position: center;
}

.box-menu-list {
  min-width: 1600px;
  width: 100%;
  max-width: 1600px;
  height: 900px;
  background-image: url("/images/background_main/background-practice-list.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: auto;
  cursor: grab;
}

.box-menu-list-mobile {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: auto;
}

.box-menu-list:active {
  cursor: grabbing;
}

::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.box-container-main {
  width: 100%;
  min-width: 1000px;
}

// #endregion

// #region Container
.box-skill-container.mobile {
  max-width: 1000px;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.box-line-bar-top {
  top: 0px;
  width: 1600px;
  height: 15px;
}

.box-line-bar-bottom {
  bottom: 30px;
  width: 1600px;
  height: 15px;
}

.box-cursor-grap {
  cursor: grab;
}

// #endregion

// #region Animation

.animation-duration-0-5s {
  animation-duration: 0.5s;
  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
}

.animation-bar-left {
  position: absolute;
  left: 0%;
  animation: animationLineBar 60s ease-in-out infinite alternate;
  transform: translate(0%, 0);
}

.animation-bar-right {
  position: absolute;
  right: 0%;
  animation: animationLineBar 60s ease-in-out infinite alternate-reverse;
  transform: translate(0%, 0);
}

@keyframes animationLineBar {
  100% {
    transform: translate(-20%, 0);
  }
}

.line-skill {
  width: 95%;
  height: 13px;
  background-color: #764323;
  border: 3px solid #4a261b;
  border-radius: 5px;
}

.animation-icon-reward {
  animation: animationIconReward 1.3s infinite 1s;
  -webkit-animation: animationIconReward 1.3s infinite 1s;
  -moz-animation: animationIconReward 1.3s infinite 1s;

  border-radius: 50%;
}

@keyframes animationIconReward {
  0% {
    // box-shadow: 0 0 rgba(#ffd620, 1);
    // background-color: #ffd620;
    transform: rotateY(0deg);
  }

  100% {
    // box-shadow: 0 0 10px 8px transparent;
    // background-color: transparent;
    // border-width: 2px;
    transform: rotateY(360deg);
    -webkit-transform: rotateY(360deg);
    -moz-transform: rotateY(360deg);
  }
}

.animation-icon-bright-reward {
  animation: animationIconBrightReward 1s infinite 1s;
  -webkit-animation: animationIconBrightReward 1s infinite 1s;
  -moz-animation: animationIconBrightReward 1s infinite 1s;

  border-radius: 50%;
}

@keyframes animationIconBrightReward {
  0% {
    box-shadow: 0 0 rgba(#ffd620, 1);
    background-color: #ffd620;
  }

  100% {
    box-shadow: 0 0 10px 8px transparent;
    background-color: transparent;
    border-width: 2px;
  }
}

// #endregion

// #region Button main

.button-active-main {
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: 0.1s;
  max-height: 45px;
  max-width: 44px;
  min-width: 36px;
  min-height: 36px;
}

.button-active-main:active {
  transform: scale(0.9);
}

.button-active-main.close {
  width: 100%;
}

.button-icon-skill-island {
  width: 36px;
  height: 100%;
  cursor: pointer;
  transition: 0.1s;
  margin-top: 0px;
}

.button-icon-skill-island.active {
  transform: scale(1.3);
}

// #endregion

// #region Header bar

.box-button-home {
  width: 4.375%;
  margin: 1%;
}

.box-button-home.mobile {
  width: 100%;
  width: 64px;
  height: 64px;
  margin: 0%;
  // top: 3px;
  // left: 2px;
  padding: 8px;
}

.box-practice-level-and-unit {
  width: 22.5%;

  margin-top: 1%;
  margin-right: 5.5%;
  min-width: 237px;

  @media screen and (max-width: 1280px) {
    font-size: 12px;
  }
}

.box-practice-level-and-unit-expanded {
  width: 452px;
  margin-top: 1%;
  margin-right: 5.5%;
  min-width: 237px;
}

.max-height-practice-level-and-unit-box {
  max-height: 160px;
  height: 100%;
}

.max-height-practice-level-and-unit-box-expanded {
  max-height: 572px;
  height: 100%;

  @media screen and (max-width: 1280px) {
    max-height: 485px;
  }

  @media screen and (max-width: 1024px) {
    max-height: 430px;
  }
}

.max-height-scrollIn-practice-unit {
  max-height: 384px;
  height: 100%;

  @media screen and (max-width: 1280px) {
    max-height: 300px;
  }

  @media screen and (max-width: 1024px) {
    max-height: 245px;
  }
}

.max-height-scrollIn-practice-unit.mobile {
  max-height: 428px;
  height: 100%;
}

.box-practice-level-and-unit.mobile {
  max-width: 246px;
  width: 60%;
  min-width: 246px;
  top: 15px;
  right: 45px;
}

.box-select-practice-header {
  height: 25.93%;
  background-color: #ffe5a1;
  color: #4a261b;
  border-radius: 15px 15px 0px 0px;
  border: 0.15rem solid #4a261b;
  font-size: clamp(10px, 1vw, 16px);
}

.box-select-practice-level-and-unit {
  height: 74.07%;
  // height: 80.556%;
  color: #4a261b;
  border-radius: 0px 0px 15px 15px;
  border: 0.15rem solid #4a261b;
  border-top-color: transparent;
  padding: 2% 4.5%;
  font-size: clamp(10px, 1vw, 16px);
}

.box-menu-select-level-and-unit-container {
  width: 100%;
  min-width: 100px;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #4a261b;
  background-color: #ffffff;
  font-size: clamp(10px, 1vw, 14px);
  font-family: Mali-M;
  padding: 2%;
  overflow: auto;
}

.box-menu-select-level-and-unit-container::-webkit-scrollbar {
  width: 10px;
  height: 0px;
}

.box-menu-select-level-and-unit-container::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  border: 2px solid #ffffff;
  border-radius: 10px;
}

.box-menu-select-level-and-unit-container::-webkit-scrollbar-track {
  background-color: #ffffff;
  border-radius: 10px;
}

.box-icon-arrow-down {
  width: 17.87%;
  margin-top: -6%;
}

.white-box-list-padding {
  padding: 6px;

  @media screen and (max-width: 1366px) {
    padding: 4px;
  }
}

.item-list-level {
  padding: clamp(3.75px, 0.375cqw, 6px);
  height: 32px;
  border-radius: 8px;
  margin-right: 12px;
  line-height: 0px;
}

.item-list-level.mobile {
  padding: 2px 4px 2px 6px;
  height: 32px;
  border-radius: 8px;
  margin-right: 6px;
  line-height: 0px;
}

.box-item-menu {
  transition: 0.1s;
  border-radius: 8px;
  color: #4a261b;
}

.box-item-menu.not-active:hover {
  position: relative;
  background-color: #d9d9d9;
  color: #4a261b;
}

.box-item-menu.not-active:hover::before {
  content: "";
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  // background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
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

.box-icon-alert-circle {
  width: 13.45%;
  top: -24%;
  right: -4%;
}

.button-select-level-and-unit {
  width: 47.771%;
  cursor: pointer;
}

.button-select-level-and-unit.mobile {
  width: 100%;
  cursor: pointer;
}

.button-select-level-and-unit-expanded {
  width: 98.46%;
  cursor: pointer;
}

.box-button-book {
  width: 13.02%;
}

.box-button-book-expanded {
  width: 10.378%;
}

.box-practice-progress-buy-unit {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2%;
  background-color: #4a261b;
  border: 0.15rem solid #4a261b;
  box-shadow: inset 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  overflow: hidden;
}

.progress-bar {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  background-color: #33dada;
  background-image: repeating-linear-gradient(-55deg,
      transparent,
      transparent 6px,
      rgba(67, 255, 255, 1) 0px,
      rgba(67, 255, 255, 1) 12px);
}

.progress-bar.success {
  background-color: #4bff3b;
  background-image: repeating-linear-gradient(-50deg,
      transparent,
      transparent 8px,
      #3ccc2f 0px,
      #3ccc2f 16px);
}

.box-button-setting {
  width: 2.875%;
  margin-top: 1%;
  margin-right: 1.6%;
}

.box-button-setting.mobile {
  top: 3px;
  right: 0px;
}

.box-button-information {
  width: 1.875%;
  // width: 0.9%;
  margin-top: 5%;
  margin-right: 2.3%;
}

.box-button-information.mobile {
  top: 45px;
  right: -2px;
}

// #endregion

// #region Box Skill Island

.label-skill-island {
  width: 69.212%;
}

.label-skill-island.mobile {
  top: 50%;
  max-width: 320px;
  width: 67%;
  min-width: 200px;
  z-index: 2;
}

.label-skill-island-content {
  top: 73%;
  width: 100%;
  text-align: center;
  color: #fff;
  font-size: clamp(14px, 1.25vw, 20px);
  text-shadow: rgb(81, 42, 8) 3px 0px 0px, rgb(81, 42, 8) 2.83487px 0.981584px 0px,
    rgb(81, 42, 8) 2.35766px 1.85511px 0px, rgb(81, 42, 8) 1.62091px 2.52441px 0px,
    rgb(81, 42, 8) 0.705713px 2.91581px 0px, rgb(81, 42, 8) -0.287171px 2.98622px 0px,
    rgb(81, 42, 8) -1.24844px 2.72789px 0px, rgb(81, 42, 8) -2.07227px 2.16926px 0px,
    rgb(81, 42, 8) -2.66798px 1.37182px 0px, rgb(81, 42, 8) -2.96998px 0.42336px 0px,
    rgb(81, 42, 8) -2.94502px -0.571704px 0px, rgb(81, 42, 8) -2.59586px -1.50383px 0px,
    rgb(81, 42, 8) -1.96093px -2.27041px 0px, rgb(81, 42, 8) -1.11013px -2.78704px 0px,
    rgb(81, 42, 8) -0.137119px -2.99686px 0px, rgb(81, 42, 8) 0.850987px -2.87677px 0px,
    rgb(81, 42, 8) 1.74541px -2.43999px 0px, rgb(81, 42, 8) 2.44769px -1.73459px 0px,
    rgb(81, 42, 8) 2.88051px -0.838247px 0px;
}

.label-skill-island-content.mobile {
  font-size: 20px;
}

.text-total-learning-practice {
  top: 27%;
  left: 51%;
  font-size: clamp(12px, 1.125vw, 18px);
  text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
    rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
    rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px,
    rgb(0, 0, 0) 0.96017px -0.279415px 0px;
  color: #fff;
}

.text-total-learning-practice.mobile {
  top: 27.5%;
  left: 51%;
  font-size: 18px;
}

.box-button-active {
  cursor: pointer;

  transform: scale(1);
  transition: 0.5s;

  -webkit-transform: scale(1);
  -webkit-transition: 0.5s;

  z-index: 2;
}

.box-button-active:not(.cursor-inherit):hover {
  transform: scale(1.1);
  transition: 0.5s;

  -webkit-transform: scale(1.1);
  -webkit-transition: 0.5s;
}

// #endregion

// #region Dialog Practice Island

.box-label-practice-header {
  width: 40%;
  margin: 0.5% auto 1.5% auto;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.box-background-island-main {
  width: 62.5%;
}

.box-background-island-main.mobile {
  max-width: 340px;
  width: 100%;
}

.box-island-scroll.mobile {
  top: 70px;
  width: 95%;
  height: 80%;
  margin: auto;
  overflow: scroll;
}

.box-island-scroll.mobile::-webkit-scrollbar {
  width: 10px;
  height: 0px;
}

.box-island-scroll.mobile::-webkit-scrollbar-thumb {
  background-color: #4e2a02;
  border-radius: 10px;
}

.box-island-scroll.mobile::-webkit-scrollbar-track {
  background-color: #ffa746;
  border: 2px solid #f6ce99;
  border-radius: 10px;
}

.box-button-close {
  width: 6%;
  margin: 0.5% auto;
}

.box-button-close.only-book-of-content {
  width: 6.732%;
  top: -3.5%;
  right: -4.5%;
}

.text-label-header {
  top: 43%;
  width: 80%;
  height: 65%;
  color: #fff;
  text-shadow: rgb(74, 38, 27) 3px 0px 0px, rgb(74, 38, 27) 2.83487px 0.981584px 0px,
    rgb(74, 38, 27) 2.35766px 1.85511px 0px, rgb(74, 38, 27) 1.62091px 2.52441px 0px,
    rgb(74, 38, 27) 0.705713px 2.91581px 0px, rgb(74, 38, 27) -0.287171px 2.98622px 0px,
    rgb(74, 38, 27) -1.24844px 2.72789px 0px, rgb(74, 38, 27) -2.07227px 2.16926px 0px,
    rgb(74, 38, 27) -2.66798px 1.37182px 0px, rgb(74, 38, 27) -2.96998px 0.42336px 0px,
    rgb(74, 38, 27) -2.94502px -0.571704px 0px, rgb(74, 38, 27) -2.59586px -1.50383px 0px,
    rgb(74, 38, 27) -1.96093px -2.27041px 0px, rgb(74, 38, 27) -1.11013px -2.78704px 0px,
    rgb(74, 38, 27) -0.137119px -2.99686px 0px, rgb(74, 38, 27) 0.850987px -2.87677px 0px,
    rgb(74, 38, 27) 1.74541px -2.43999px 0px, rgb(74, 38, 27) 2.44769px -1.73459px 0px,
    rgb(74, 38, 27) 2.88051px -0.838247px 0px, rgb(74, 38, 27) 0px 4px 0px,
    rgb(74, 38, 27) 2px 4px 0px, rgb(74, 38, 27) -2px 4px 0px;
  font-size: clamp(24px, 2.5vw, 40px);
}

.text-label-yellow {
  color: #ffbf19;
}

.box-skill-details-main {
  width: 34%;
}

.box-skill-details-main.mobile {
  max-width: 300px;
  width: 100%;
}

.box-skill-details-container {
  width: 100%;
  background-color: #984510;
  border: 2px solid #984510;
  border-radius: 1.5rem;
  overflow: hidden;
}

.box-skill-details-container .text-skill-header {
  color: #fff;
  font-size: clamp(16px, 1.5vw, 20px);
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
  padding: 1%;
}

.box-skill-details-container .box-skill-content {
  background-color: #f9eed7;
  padding: 2%;
  border-radius: 0px 0px 1.5rem 1.5rem;
}

.text-skill-content {
  font-size: clamp(8px, 0.75vw, 12px);
}

.line-mark-vocabulary {
  top: 0%;
  left: 50%;
  width: 1%;
  height: 100%;
  background-color: #fff;
  z-index: 1;
}

.line-mark-vocabulary-right {
  bottom: -117%;
  left: 50%;
  width: 35%;
  height: 1%;
  background-color: #fff;
  z-index: 1;
}

// #endregion

// #region Dialog Book Of Content
.box-book-of-content {
  width: 65%;
  color: #4a261b;
  font-size: clamp(10px, 1vw, 16px);
}

.box-practice-skill-container {
  top: 39%;
  width: 77%;
  height: 60%;
}

.box-button-select-skill {
  width: 22.4796%;
  cursor: pointer;
}

.box-icon-arrow-down.only-skill {
  width: 9.92%;
}

.box-practice-skill-content-container {
  width: 100%;
  height: 100%;
  background-color: #f9edd7;
  border-radius: 15px;
  padding: 3% 4% 3% 2%;
  overflow: hidden;
  margin-top: 2%;
}

.box-practice-skill-content-scroll {
  overflow-y: scroll;
  padding: 0% 2%;
  width: 100%;
  height: 100%;
}

.box-practice-skill-content-scroll::-webkit-scrollbar {
  width: 0.9rem;
  height: 0px;
}

.box-practice-skill-content-scroll::-webkit-scrollbar-thumb {
  background-color: #4e2a02;
  border-radius: 10px;
}

.box-practice-skill-content-scroll::-webkit-scrollbar-track {
  background-color: #ffa746;
  border: 0.25rem solid #f9edd7;
  border-radius: 10px;
}

// Mobile
.box-list-of-content {
  border-radius: 20px;
  height: calc(100vw - 650px);
  max-height: calc(400px);
  min-height: calc(250px);
  overflow-y: auto;
}

/* width */
.box-list-of-content::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-list-of-content::-webkit-scrollbar-track {
  background: #ffa746;
  border: 0.8mm solid #f6f3d3;
  border-radius: 10px;
}

/* Handle */
.box-list-of-content::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 10px;
}

.box-list-of-content-mobile {
  border-radius: 20px;
  height: calc(100vw - 50px);
  max-height: calc(320px);
  min-height: calc(250px);
  overflow-y: auto;
}

/* width */
.box-list-of-content-mobile::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.box-list-of-content-mobile::-webkit-scrollbar-track {
  background: #ffa746;
  border: 0.8mm solid #f6f3d3;
  border-radius: 10px;
}

/* Handle */
.box-list-of-content-mobile::-webkit-scrollbar-thumb {
  background: #4a261b;
  border-radius: 10px;
}

.text-color {
  color: #4a261b;
  font-size: 16px !important;
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

// #endregion

// #region Dialog Complete Unit
.box-practice-complete-unit-main {
  width: 334px;
  background-color: #f1bf43;
  border: 4px solid #4a261b;
  border-radius: 10px;
  padding: 7px;
}

.box-practice-complete-unit-main .box-practice-complete-unit-body {
  width: 100%;
  height: 100%;
  background-color: #ffedc4;
  border-radius: 12px;
  padding: 5px 10px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  color: #512a08;
}

.box-label-practice-complete-unit {
  top: 1px;
}

.box-progress-scroll {
  height: 130px;
  border-radius: 12px;
  background-color: #efd080;
}

.box-progress-scroll.show-all {
  max-height: 274px;
  height: 100%;
  max-height: 270px;
  min-height: 270px;
  overflow-y: scroll;
}

.box-progress-scroll::-webkit-scrollbar {
  width: 6px;
  height: 0px;
}

.box-progress-scroll::-webkit-scrollbar-thumb {
  background-color: #512a08;
  border-radius: 10px;
}

.box-progress-scroll::-webkit-scrollbar-track {
  background-color: transparent;
  border-radius: 10px;
}

.box-progress-details {
  width: 100%;
  height: 100%;
  padding: 4px 2px 20px 2px;
  background-color: #efd080;
  border-radius: 12px;
}

.box-progress-details.start {
  border-bottom: 2px solid #ac7d05;
  border-radius: 12px 12px 0px 0px;
}

.box-progress-details.center {
  border-top: 2px solid #ffedc4;
  border-bottom: 2px solid #ac7d05;
  border-radius: 0px;
}

.box-line-sparator {
  width: 200%;
  height: 2px;
  border-top: 2px solid #ac7d05;
  border-bottom: 2px solid #ffedc4;
}

.box-progress-details.end {
  border-top: 2px solid #ffedc4;
  border-radius: 0px 0px 12px 12px;
}

.text-level-complete {
  color: #ffcf51;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px, rgb(74, 38, 27) 0px 2px 0px,
    rgb(74, 38, 27) 0px 3px 0px, rgb(74, 38, 27) 1px 2px 0px, rgb(74, 38, 27) -1px 2px 0px,
    rgb(74, 38, 27) 0px 3px 0px, rgb(74, 38, 27) 1px 3px 0px, rgb(74, 38, 27) -1px 3px 0px,
    rgb(74, 38, 27) 0px 4px 0px, rgb(74, 38, 27) 1px 4px 0px, rgb(74, 38, 27) -1px 4px 0px,
    rgb(74, 38, 27) 0px 5px 0px, rgb(74, 38, 27) -2px 4px 0px, rgb(74, 38, 27) 2px 4px 0px,
    rgb(74, 38, 27) 1px 5px 0px, rgb(74, 38, 27) -1px 5px 0px;
}

.progress-complete-unit-main {
  position: relative;
  width: 100%;
  height: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
  border: 2px solid #4a261b;
  border-radius: 8px;
}

.progress-complete-line {
  position: absolute;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 0%;
  background-color: #33dada;
  background-image: repeating-linear-gradient(-55deg,
      transparent,
      transparent 6px,
      rgba(67, 255, 255, 1) 0px,
      rgba(67, 255, 255, 1) 12px);

  transition: width 0.7s linear;
}

.progress-complete-unit-main .progress-complete-line.success {
  background-color: #4bff3b;
  background-image: repeating-linear-gradient(-50deg,
      transparent,
      transparent 8px,
      #3ccc2f 0px,
      #3ccc2f 16px);
  transition: width 0.2s linear;
}

.box-mark-current-reward {
  bottom: -10%;
  width: 2px;
  height: 4px;
  background-color: #4a261b;
  border: 1px solid #4a261b;
  border-radius: 99px;
}

.box-mark-current-reward.mark-center {
  bottom: -10%;
  height: 7px;
}

.box-mark-current-reward.mark-end {
  left: 99% !important;
  height: 7px;
  background-color: transparent;
  border: 1px solid transparent;
}

.animation-reward {
  animation: lightReward 1s infinite alternate;
  -webkit-animation: lightReward 1s infinite alternate;
  -moz-animation: lightReward 1s infinite alternate;

  opacity: 0;
}

@keyframes lightReward {
  0% {
    opacity: 0.5;
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.text-number-reward {
  bottom: -25px;
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

// #endregion

// #region Dialog Learning swipe
.swipe-hand {
  width: 150px;
  height: 121px;
  background-image: url("/sprite/hand-swipe.png");
  background-repeat: no-repeat;
}

// #endregion

.circleColor {
  color: #33dada;
  padding: 1px;
  border-radius: 50%;
  background-color: #4a261b;
  width: 100%;
  /* Default size */
  max-width: 48px;
  min-width: 36px;
  height: auto;

  @media screen and (max-width: 1440px) {
    width: 90%;
  }

  @media screen and (max-width: 1366px) {
    width: 85.37%;
  }

  @media screen and (max-width: 1280px) {
    width: 70%;
  }
}

.label-progress-circle {
  color: white;
  text-shadow: rgb(74, 38, 27) 1px 0px 0px, rgb(74, 38, 27) 0.540302px 0.841471px 0px,
    rgb(74, 38, 27) -0.416147px 0.909297px 0px, rgb(74, 38, 27) -0.989992px 0.14112px 0px,
    rgb(74, 38, 27) -0.653644px -0.756802px 0px,
    rgb(74, 38, 27) 0.283662px -0.958924px 0px, rgb(74, 38, 27) 0.96017px -0.279415px 0px;
}

.label-disable-changelevel {
  color: #ffffff;
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

.label-cancel-changelevel {
  color: #ffffff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.rounded-triangle-mask {
  width: 16px;
  height: 16px;
  background-color: #247200;
  /* Match your fill color */
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  border-radius: 1px;
  /* Adjust for rounded corners */
}

.main-box-dialog-unlock-level-success {
  display: flex;
  width: 308px;
  height: 440px;
  padding: 6px;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 480px) {
    width: 280px;
    height: 400px;
  }
}

.inside-box-dialog-unlock-level-success {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 88px 16px 24px 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  @media screen and (max-width: 480px) {
    padding: 74px 14.55px 21.82px 14.55px;
  }
}

.top-frame-success-unlock-level {
  height: 97px;
  width: 379px;

  @media screen and (max-width: 480px) {
    height: 88px;
    width: 345px;
  }
}

.bottom-frame-success-unlock-level {
  height: 61px;
  width: 330px;

  @media screen and (max-width: 480px) {
    height: 56px;
    width: 302px;
  }
}

.box-show-level-unlock {
  margin-top: 22px;
  width: 232px;
  width: 100%;
  height: 144px;
  padding: 14px 10px 21px 10px;
  border-radius: 10px;
  border: 2px solid #c96814;
  background: #fff;

  @media screen and (max-width: 480px) {
    height: 132px;
    width: 211px;
  }
}

.text-inside-box-level-unlock {
  font-size: 20px;
  line-height: 24px;

  @media screen and (max-width: 480px) {
    font-size: 18px;
    line-height: 21px;
  }
}

.number-inside-box-level-unlock {
  font-size: 96px;
  line-height: 80px;

  @media screen and (max-width: 480px) {
    font-size: 87px;
    line-height: 72px;
  }
}

.button-ok-unlock-level {
  height: 48px;
  width: 120px;

  @media screen and (max-width: 480px) {
    height: 43.64px;
    width: 109px;
  }
}

.background-bar {
  width: 200%;
  height: 50px;
  background-image: url("/images/background_main/background-practice-list-bar.png");
  background-size: contain;
  background-position: left;
  background-origin: border-box;
}

.box-menu-list-mobile {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: auto;
}

.background-container-desktop {
  max-width: 1600px;
  width: 100%;
  min-width: 1000px;
  overflow: hidden;
  margin: auto;
}

.box-button-unit {
  display: flex;
  padding: 2px;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border-radius: 10px;
  border: 1px solid transparent;
  background: transparent;
  transition: background-color 0.05s, border 0.05s;

  &.selected {
    background-color: #ffcd47;
  }

  &:not(.selected):hover {
    border: 1px solid #fff;
    background-color: #fff;
  }
}

.box-dialog-level-locked {
  display: flex;
  width: 308px;
  height: 284px;
  padding: 6px;
  align-items: flex-start;
  gap: 12px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background-color: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);

  & .box-sub-level-locked {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 80px 16px 24px 16px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    flex: 1 0 0;
    border-radius: 12px;
    background: #ffedc4;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    color: #512a08;

    & .button-previous {
      display: flex;
      width: 120px;
      height: 48px;
      padding: 1px 1px 4px 1px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex: 1 0 0;
      border-radius: 10px;
      border: 1px solid #4a261b;
      background: #69199c;
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 3px;
        width: 10.696px;
        height: 4.032px;
        transform: rotate(-34.628deg);
        font-size: 24px;
        background: linear-gradient(0deg, #fff 0%, #fff 100%),
          linear-gradient(0deg, #b4dbf5 0%, #b4dbf5 100%), #b4dbf5;
        opacity: 0.5;
        border-radius: 10px 10px 0px 0px;
      }

      & .sub {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        flex: 1 0 0;
        align-self: stretch;
        border-radius: 9px;
        background: linear-gradient(180deg, #bd49f4 0%, #9f2de7 100%);
        text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
          rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
          rgb(0, 0, 0) -0.653644px -0.756802px 0px,
          rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
      }
    }

    & .button-go-to-package {
      display: flex;
      width: 120px;
      height: 48px;
      padding: 1px 1px 4px 1px;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      flex: 1 0 0;
      border-radius: 10px;
      border: 1px solid #4a261b;
      background: #db8200;
      position: relative;
      z-index: 1;

      &::before {
        content: "";
        position: absolute;
        left: 2px;
        top: 3px;
        width: 10.696px;
        height: 4.032px;
        transform: rotate(-34.628deg);
        font-size: 24px;
        background: linear-gradient(0deg, #fff 0%, #fff 100%),
          linear-gradient(0deg, #b4dbf5 0%, #b4dbf5 100%), #b4dbf5;
        opacity: 0.5;
        border-radius: 10px 10px 0px 0px;
      }

      & .sub {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
        flex: 1 0 0;
        align-self: stretch;
        border-radius: 9px;
        background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
        color: #fff;
        text-shadow: rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px,
          rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px,
          rgb(0, 0, 0) -0.653644px -0.756802px 0px,
          rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px;
      }
    }
  }
}
</style>
