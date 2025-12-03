<template>
  <!-- #region Background -->
  <div class="register-background row justify-center items-center">
    <!-- #region Items background -->
    <div class="box-container-main relative-position">
      <background-main :background="`background-register`"></background-main>

      <div class="absolute-top-left" style="width: 10%; top: 15%; left: -1.2%">
        <div class="relative-position">
          <q-img no-spinner no-transition class="absolute"
            :src="`/images/placement_main/diamond-shadow.png?${tempCacheImage}`"></q-img>
          <q-img no-spinner no-transition :src="`/images/placement_main/diamond.gif?${tempCacheImage}`"></q-img>
        </div>
      </div>

      <div class="absolute-bottom-right" style="width: 17.5%; bottom: 8.7%; right: 2%">
        <div class="relative-position">
          <q-img no-spinner no-transition class="absolute"
            :src="`/images/placement_main/compass-shadow.png?${tempCacheImage}`"></q-img>
          <q-img no-spinner no-transition :src="`/images/placement_main/compass.gif?${tempCacheImage}`"></q-img>
        </div>
      </div>

      <div class="absolute-bottom-left" style="width: 31%; bottom: -9.3%; left: -8.8%">
        <q-img no-spinner no-transition :src="`/images/placement_main/placement-item-3.png?${tempCacheImage}`"></q-img>
      </div>

      <div class="absolute-top-right" style="width: 27.5%; top: 8%; right: -5.3%">
        <q-img no-spinner no-transition :src="`/images/placement_main/placement-item-1.png?${tempCacheImage}`"></q-img>
      </div>

      <div class="absolute-bottom-left" style="width: 19%; bottom: -2.6%; left: 15.7%">
        <q-img no-spinner no-transition :src="`/images/placement_main/placement-item-2.png?${tempCacheImage}`"></q-img>
      </div>
    </div>
    <!-- #endregion Items background -->
  </div>
  <!-- #endregion -->

  <!-- #region Dialog Select Create Account -->
  <q-dialog v-model="isShowDialogSelectAccount" maximized persistent seamless>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container-2">
          <div class="sub-dialog-container-2">
            <div align="center" class="font-mali-b f20">สร้างบัญชี</div>

            <div class="box-dialog-content-2">
              <div class="box-button-image-create-account">
                <q-img @click="isShowDialogDetailYounger = true" class="button-active-main"
                  @mouseover="refButtonCreateLessAccount = 'hover'" @mouseleave="refButtonCreateLessAccount = null"
                  :src="`/images/box_main/box-button-create-account-less-10-year-old${refButtonCreateLessAccount != null
                    ? `-${refButtonCreateLessAccount}`
                    : ''
                    }.png`" no-spinner no-transition></q-img>
              </div>
              <div class="box-button-image-create-account" style="margin-top: 8px">
                <q-img @click="funcNextRegisterForm('older')" class="button-active-main" @mouseover="
                  refButtonCreateOverAccount == 'active'
                    ? 'active'
                    : (refButtonCreateOverAccount = 'hover')
                  " @mouseleave="refButtonCreateOverAccount = null" :src="`/images/box_main/box-button-create-account-over-10-year-old${refButtonCreateOverAccount != null
                    ? `-${refButtonCreateOverAccount}`
                    : ''
                    }.png`" no-spinner no-transition></q-img>
              </div>

              <div class="font-mali-m f10" style="margin-top: 16px; line-height: 16px">
                ในการสร้างบัญชีคุณยืนยันว่าคุณอายุ 10 ปีขึ้นไป หรือ
                คุณในฐานะผู้ปกครองของผู้เรียน คุณยอมรับ
                <div>
                  <span @click="funcShowDialogTermsAndPolicy('terms')"
                    class="text-link cursor-pointer">เงื่อนไขการใช้บริการ</span>
                  และ
                  <span @click="funcShowDialogTermsAndPolicy('policy')"
                    class="text-link cursor-pointer">นโยบายความเป็นส่วนตัว</span>
                </div>
              </div>
            </div>
            <div class="f12 font-mali-m" align="center">
              มีบัญชีอยู่แล้ว
              <span class="text-link cursor-pointer" @click="$router.replace('/')">ลงชื่อเข้าใช้</span>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Show Condition Terms for less 10 year old -->
  <q-dialog v-model="isShowDialogDetailYounger" maximized persistent>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container-2 relative-position">
          <div class="sub-dialog-container-2">
            <div align="center" class="font-mali-b f20">สร้างบัญชี</div>
            <div class="box-dialog-content-2" align="center">
              <div class="box-hint-header font-mali-b f14" align="center">
                <div>
                  สำหรับผู้เรียนอายุไม่ถึง
                  <span class="relative-position q-mx-xs text-stroke f20">10</span> ปี
                </div>
              </div>

              <div class="box-image-less-year-old">
                <q-img src="/images/box_main/box-image-less-year-old.png" no-spinner no-transition></q-img>
              </div>

              <div class="box-condition-create-account font-mali-m f14" align="left">
                ในการสร้างบัญชีสำหรับผู้เรียนอายุ <br />ไม่ถึง 10 ปี เราอนุญาตให้ผู้ปกครอง
                สามารถสร้างบัญชีให้ผู้เรียนได้ <br />
                และในการสร้างบัญชีคุณยืนยันว่า <br />
                คุณในฐานะผู้ปกครองของผู้เรียน <br />
                คุณยอมรับ
                <span class="text-link cursor-pointer"
                  @click="funcShowDialogTermsAndPolicy('terms')">เงื่อนไขการใช้บริการ</span>
                และ
                <span class="text-link cursor-pointer"
                  @click="funcShowDialogTermsAndPolicy('policy')">นโยบายความเป็นส่วนตัว</span>
                ของเรา
              </div>
            </div>

            <div class="box-button-continue">
              <q-img class="button-active-main" src="/images/button_main/button-continue.png" no-spinner no-transition
                @click="funcNextRegisterForm('younger')"></q-img>
            </div>
          </div>

          <div class="absolute-top-right box-button-close">
            <q-img class="button-active-main" src="/images/icon_main/icon-close.png" no-spinner no-transition
              v-close-popup></q-img>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Register Form -->
  <q-dialog maximized v-model="isShowDialogRegisterForm" persistent seamless>
    <q-card class="transparent shadow-0" id="register-form">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container-2" :class="$q.platform.is.desktop ? 'box-dialog-create-2' : ''">
          <div class="sub-dialog-container-2 relative-position">
            <div align="center" class="font-mali-b f20">สร้างบัญชี</div>
            <!-- #region Box Input User data -->
            <!-- v-if="isHideObject" -->
            <div :class="$q.platform.is.desktop
              ? 'row font-mali-m justify-center'
              : 'box-dialog-content-scroll'
              " class="relative-position" align="center" id="box-register-form" @scroll="funcScrollRegisterForm">
              <!-- #region Create Step 1 -->
              <div class="box-dialog-content-2" :helf="$q.platform.is.desktop ? 'right' : 'bottom'">
                <div class="font-mali-b f16" align="center">บัญชีผู้ใช้งาน</div>

                <!-- #region Username -->
                <div class="q-mt-sm">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" v-model="registerFormData.username"
                    maxlength="20" placeholder="ชื่อผู้ใช้งาน" :input-style="registerFormData.username.length == 0
                      ? 'font-size:14px;padding-bottom: 15px'
                      : 'padding-bottom: 17px;'
                      " :class="{
                        'bg-white': !isValidateUsername,
                        'validate-error': isValidateUsername,
                      }" @update:model-value="
                        funcFormatUsername()
                          ? (isValidateUsername = false)
                          : (isValidateUsername = true)
                        " ref="inputRefUsername" @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append>
                      <div class="f14" style="padding-bottom: 12px"
                        v-if="!isValidateUsername || registerFormData.username.length > 0">
                        <span>{{ `(${registerFormData.username.length}/20)` }}</span>
                      </div>

                      <div v-else class="f14" style="padding-bottom: 15px">
                        <q-icon size="16px" class="text-validate" name="fas fa-exclamation-circle"></q-icon>
                      </div>
                    </template>
                  </q-input>
                  <div style="margin-top: 4px; font-size: 10px; color: #4a261b" class="font-mali-m" align="left">
                    สำหรับใช้เข้าสู่ระบบ 6-20 ตัวอักษร (a-z,0-9)
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Password -->
                <div class="margin-y-16">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" placeholder="รหัสผ่าน"
                    v-model="registerFormData.password" :input-style="registerFormData.password.length == 0
                      ? 'font-size:14px;padding-bottom: 15px;'
                      : 'padding-bottom: 18px;'
                      " :type="!isShowPassword ? 'password' : 'text'" :class="{
                        'bg-white': !isValidatePassword,
                        'validate-error': isValidatePassword,
                      }" maxlength="16" @update:model-value="
                        funcFormatPassword(registerFormData.password)
                          ? (isValidatePassword = false)
                          : (isValidatePassword = true)
                        " ref="inputRefPassword" @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append>
                      <div style="padding-bottom: 18px">
                        <q-icon size="16px" class="text-validate q-mx-xs" name="fas fa-exclamation-circle"
                          v-if="isValidatePassword"></q-icon>
                        <q-icon :name="!isShowPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                          style="color: #4a261b; font-size: 20px" @click="isShowPassword = !isShowPassword"
                          data-cy="togglePassword" />
                      </div>
                    </template>
                  </q-input>

                  <div style="margin-top: 4px; font-size: 10px" class="font-mali-m" align="left">
                    รหัสผ่านประกอบด้วย 8-16 ตัวอักษร
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Confirm Password -->
                <div class="margin-y-16">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                    v-model="registerFormData.confirmPassword" :type="!isShowConfirmPassword ? 'password' : 'text'"
                    :input-style="registerFormData.confirmPassword.length == 0
                      ? 'font-size:14px;padding-bottom: 15px;'
                      : 'padding-bottom: 18px;'
                      " :class="registerFormData.confirmPassword.length > 0
                        ? 'bg-white'
                        : {
                          'bg-white': !isValidateConfirmPassword,
                          'validate-error': isValidateConfirmPassword,
                        }
                        " @update:model-value="
                          funcFormatPassword(registerFormData.confirmPassword)
                            ? (isValidateConfirmPassword = false)
                            : (isValidateConfirmPassword = true)
                          " maxlength="16" ref="inputRefConfirmPassword"
                    @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append>
                      <div style="padding-bottom: 18px">
                        <q-icon size="16px" class="text-validate q-mx-xs" name="fas fa-exclamation-circle"
                          v-if="isValidateConfirmPassword"></q-icon>
                        <q-icon size="16px" class="text-validate q-mx-xs" name="fas fa-exclamation-circle" v-if="
                          registerFormData.confirmPassword.length < 0 &&
                          isValidateConfirmPassword
                        "></q-icon>
                        <q-icon :name="!isShowConfirmPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                          style="color: #4a261b; font-size: 20px"
                          @click="isShowConfirmPassword = !isShowConfirmPassword" data-cy="togglePassword" />
                      </div>
                    </template>
                  </q-input>
                </div>
                <!-- #endregion -->

                <!-- #region Email -->
                <div class="margin-y-16">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" placeholder="อีเมล"
                    v-model="registerFormData.email" :input-style="registerFormData.email.length == 0
                      ? 'font-size:14px;padding-bottom: 15px'
                      : 'padding-bottom: 17px;'
                      " :class="{
                        'bg-white': !isValidateEmail,
                        'validate-error': isValidateEmail,
                      }" @update:model-value="
                        funcFormatEmail()
                          ? (isValidateEmail = false)
                          : (isValidateEmail = true)
                        " ref="inputRefEmail" @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append v-if="isValidateEmail">
                      <div class="f14" style="padding-bottom: 15px">
                        <q-icon size="16px" class="text-validate" name="fas fa-exclamation-circle"></q-icon>
                      </div>
                    </template>
                  </q-input>
                </div>
                <!-- #endregion -->

                <!-- #region Phone -->
                <div class="">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" placeholder="เบอร์โทรศัพท์"
                    v-model="registerFormData.phoneNumber" :input-style="registerFormData.phoneNumber.length == 0
                      ? 'font-size:14px;padding-bottom: 15px'
                      : 'padding-bottom: 17px;'
                      " mask="###-###-####" @update:model-value="
                        funcFormatPhoneNumber() || registerFormData.phoneNumber.length == 0
                          ? (isValidatePhoneNumber = false)
                          : (isValidatePhoneNumber = true)
                        " @keyup.enter="funcCheckValidateRegisterForm()">
                    <!-- <template v-slot:append v-if="isValidatePhoneNumber">
                      <div class="f14" style="padding-bottom: 15px">
                        <q-icon
                          size="16px"
                          class="text-validate"
                          name="fas fa-exclamation-circle"
                        ></q-icon>
                      </div>
                    </template> -->
                  </q-input>
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <!-- #region Create Step 2 -->
              <div class="box-dialog-content-2" :helf="$q.platform.is.desktop ? 'left' : 'top'">
                <div class="font-mali-b f16" align="center">ข้อมูลของผู้เรียน</div>

                <!-- #region Name -->
                <div class="q-mt-sm">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" v-model="registerFormData.name"
                    maxlength="20" placeholder="ชื่อจริง" input-style="padding-bottom: 15px" :class="{
                      'bg-white': !isValidateName,
                      'validate-error': isValidateName,
                    }" @update:model-value="
                      registerFormData.name != ''
                        ? (isValidateName = false)
                        : (isValidateName = true)
                      " ref="inputRefName" @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append>
                      <div v-if="isValidateName" class="f14" style="padding-bottom: 15px">
                        <q-icon size="16px" class="text-validate" name="fas fa-exclamation-circle"></q-icon>
                      </div>
                    </template>
                  </q-input>
                </div>
                <!-- #endregion -->

                <!-- #region surname -->
                <div class="margin-y-16">
                  <div class="box-input-register box-skeleton" v-if="isShowDialogLoading"></div>
                  <q-input v-else dense borderless class="f14 box-input-register" v-model="registerFormData.surname"
                    maxlength="20" placeholder="นามสกุล" input-style="padding-bottom: 15px" :class="{
                      'bg-white': !isValidateSurname,
                      'validate-error': isValidateSurname,
                    }" @update:model-value="
                      registerFormData.surname != ''
                        ? (isValidateSurname = false)
                        : (isValidateSurname = true)
                      " ref="inputRefSurname" @keyup.enter="funcCheckValidateRegisterForm()">
                    <template v-slot:append>
                      <div v-if="isValidateSurname" class="f14" style="padding-bottom: 15px">
                        <q-icon size="16px" class="text-validate" name="fas fa-exclamation-circle"></q-icon>
                      </div>
                    </template>
                  </q-input>
                </div>
                <!-- #endregion -->

                <!-- #region Date -->
                <div class="margin-y-16" style="width: 250px">
                  <div class="font-mali-m f10" align="left">
                    {{
                      `วัน/เดือน/ปีเกิด (ผู้เรียน${selectCreateAccount == "younger"
                        ? "อายุไม่ถึง 10 ปี"
                        : "อายุ 10 ปีขึ้นไป"
                      })`
                    }}
                  </div>
                  <div class="row justify-between q-mt-xs">
                    <!-- #region วัน -->
                    <div
                      class="col-3 box-input-register relative-position row cursor-pointer box-input-select box-skeleton"
                      style="width: 55px" v-if="isShowDialogLoading"></div>
                    <div v-else class="col-3 box-input-register relative-position row cursor-pointer box-input-select"
                      style="width: 55px" :class="isValidateDay ? 'validate-error' : ''">
                      <div class="col self-center" align="left">
                        <div :class="registerFormData.birthDate.day == null
                          ? 'text-hint-input'
                          : ''
                          ">
                          {{ `${registerFormData.birthDate.day || "วัน"}` }}
                        </div>
                      </div>
                      <div class="self-center" style="width: 20px" align="right">
                        <q-icon name="fas fa-caret-down" size="20px"></q-icon>
                      </div>
                      <q-menu fit style="height: 200px" auto-close>
                        <div class="box-select-item" v-for="i in 31" :key="i" @click="funcSelectDay(i)"
                          :active="registerFormData.birthDate.day == i ? 'true' : 'false'">
                          {{ `${i}` }}
                        </div>
                      </q-menu>
                    </div>
                    <!-- #endregion -->

                    <!-- #region เดือน -->
                    <div
                      class="col-3 q-mx-xs box-input-register relative-position row cursor-pointer box-input-select box-skeleton"
                      style="width: 100px" v-if="isShowDialogLoading"></div>
                    <div class="col-3 q-mx-xs box-input-register relative-position row cursor-pointer box-input-select"
                      style="width: 100px" v-else :class="isValidateMonth ? 'validate-error' : ''">
                      <div class="col self-center" align="left">
                        <div :class="registerFormData.birthDate.month == null
                          ? 'text-hint-input'
                          : ''
                          ">
                          {{ `${showSelectMonth || "เดือน"}` }}
                        </div>
                      </div>
                      <div class="self-center" style="width: 20px" align="right">
                        <q-icon name="fas fa-caret-down" size="20px"></q-icon>
                      </div>
                      <q-menu fit style="height: 200px" auto-close>
                        <div class="box-select-item" v-for="(itemMonth, indexMonth) in monthOptions" :key="indexMonth"
                          :active="registerFormData.birthDate.month - 1 == indexMonth
                            ? 'true'
                            : 'false'
                            " @click="funcSelectMonth(itemMonth, indexMonth)">
                          {{ `${itemMonth}` }}
                        </div>
                      </q-menu>
                    </div>
                    <!-- #endregion -->

                    <!-- #region ปี -->
                    <div
                      class="col-3 box-input-register relative-position row cursor-pointer box-input-select box-skeleton"
                      style="width: 70px" v-if="isShowDialogLoading"></div>
                    <div class="col-3 box-input-register relative-position row cursor-pointer box-input-select"
                      style="width: 70px" :class="isValidateYear ? 'validate-error' : ''" v-else>
                      <div class="col self-center" align="left">
                        <div :class="registerFormData.birthDate.year == null
                          ? 'text-hint-input'
                          : ''
                          ">
                          {{ `${registerFormData.birthDate.year || "ปี"}` }}
                        </div>
                      </div>
                      <div class="self-center" style="width: 20px" align="right">
                        <q-icon name="fas fa-caret-down" size="20px"></q-icon>
                      </div>
                      <q-menu fit style="height: 200px" auto-close>
                        <div class="box-select-item" v-for="(itemYear, indexYear) in yearOptions" :key="indexYear"
                          @click="funcSelectYear(itemYear)" :active="registerFormData.birthDate.year == itemYear ? 'true' : 'false'
                            ">
                          {{ `${itemYear}` }}
                        </div>
                      </q-menu>
                    </div>
                    <!-- #endregion -->
                  </div>
                </div>
                <!-- #endregion -->

                <!-- #region Terms and policy -->
                <div v-if="isShowDialogLoading" class="box-skeleton" style="height: 20px"></div>
                <div class="margin-y-16 font-mali-m f10" align="left" v-else>
                  เมื่อกด “ยืนยันสร้างบัญชี” ถือว่าคุณยินยอมตาม <br />
                  <span class="text-link cursor-pointer"
                    @click="funcShowDialogTermsAndPolicy('terms')">เงื่อนไขการใช้บริการ</span>
                  <span class="q-ml-xs text-link cursor-pointer"
                    @click="funcShowDialogTermsAndPolicy('policy')">นโยบายความเป็นส่วนตัว</span>
                  และ
                  <br />
                  <span class="text-link cursor-pointer"
                    @click="funcShowDialogTermsAndPolicy('cookie')">นโยบายคุกกี้</span>
                  ของเรา
                </div>
                <!-- #endregion -->
              </div>
              <!-- #endregion -->

              <div class="absolute-top-right box-dialog-content-scroll-absolute" id="box-fake-scroll-register-form">
              </div>
            </div>

            <!-- #endregion -->

            <!-- #region Button Create Account -->
            <div>
              <div align="center">
                <div class="box-skeleton" style="width: 274px; height: 50px" v-if="isShowDialogLoading"></div>
                <q-img v-else width="274px" height="50px" class="button-active-main"
                  src="/images/button_main/button-confirm-create-account.png" @click="funcCreateAccount()" no-spinner
                  no-transition />
              </div>

              <div v-if="isShowDialogLoading" class="q-mt-sm font-mali-m box-skeleton" style="height: 20px"></div>
              <div class="f12 q-mt-sm font-mali-m" style="height: 20px" align="center" v-else>
                มีบัญชีอยู่แล้ว
                <span class="text-link cursor-pointer" @click="$router.replace('/')">ลงชื่อเข้าใช้</span>
              </div>
            </div>
            <!-- #endregion -->
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Success Create account -->
  <q-dialog v-model="isShowDialogSuccessCreateAccount" maximized persistent seamless>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container-2">
          <div class="sub-dialog-container-2">
            <div align="center" class="font-mali-b f20">สร้างบัญชีสำเร็จ</div>
            <div class="box-dialog-content-2 f16 font-mali-b" align="center">
              <div class="">คุณสามารถเริ่มใช้งานได้แล้ว</div>
              <div class="box-success-icon row justify-center items-center">
                <q-icon name="fas fa-check" size="70px"></q-icon>
              </div>
              <div>ชื่อผู้ใช้งาน:</div>
              <div class="font-mali-m">
                {{ `${registerFormData.username}` }}
              </div>
            </div>
            <div align="center">
              <q-img width="120px" height="50px" class="cursor-pointer button-active-main"
                src="/images/button_main/button-confirm-short-th.png" no-spinner no-transition v-close-popup
                @click="funcNextToYourKnowUs()"></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Your know us -->
  <q-dialog v-model="isShowDialogYourKnowUs" maximized persistent seamless>
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="box-dialog-container-2">
          <div class="sub-dialog-container-2">
            <div align="center" class="font-mali-b f20">รู้จักเราผ่านทางไหนกันนะ?</div>
            <div class="box-dialog-content-2 f16 font-mali-b" align="left">
              <div :class="index > 0 && index < listOfYourKnowUs.length - 1 ? 'q-my-md' : ''"
                v-for="(item, index) in listOfYourKnowUs" :key="index">
                <q-checkbox class="f12" color="brown-9" dense v-model="item.value" :label="item.name" />
              </div>
              <div class="q-mt-sm box-input-textarea" :data="!listOfYourKnowUs[listOfYourKnowUs.length - 1].value ? 'readonly' : ''
                ">
                <q-input type="textarea" borderless autogrow input-class="no-padding font-mali-m" :input-style="yourKnowUsDetail == '' ? 'color:#939393' : 'color:#4a261b'
                  " dense :readonly="!listOfYourKnowUs[listOfYourKnowUs.length - 1].value"
                  placeholder="รู้จักเราจาก..." v-model="yourKnowUsDetail">
                </q-input>
              </div>
            </div>
            <div align="center">
              <q-img width="120px" height="50px" src="/images/button_main/button-next-th.png"
                class="cursor-pointer button-active-main" no-spinner no-transition
                @click="funcSaveYourKnowUs()"></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Terms And Policy -->
  <dialog-terms :isShowDialogTerms="isShowDialogTermsAndPolicy" :type="termsType"
    @callback-backToPayment="isShowDialogTermsAndPolicy = false" :isPayment="false" :isRegister="true"></dialog-terms>
  <!-- #endregion -->

  <!-- #region Dialog Table of contents -->
  <dialog-table-of-content v-if="isShowDialogTableOfContent"
    @callback-closeTableOfContent="isShowDialogTableOfContent = false"></dialog-table-of-content>
  <!-- #endregion -->

  <!-- #region Box student name -->
  <div class="fixed-top-left" :class="$q.platform.is.desktop
    ? 'box-student-name-container'
    : 'box-student-name-container-mobile'
    " v-if="isShowDialogYourKnowUs">
    <div
      class="relative-position animate__animated animate__fadeInLeft animation-duration-0-5s animate__delay-2s row items-center"
      :class="$q.platform.is.desktop ? 'box-student-name' : 'box-student-name-mobile'">
      <span class="self-center font-mali-m text-student-name">
        {{ `Username: ${studentStore.username}` }}
      </span>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region Button Logout -->
  <div class="fixed-top-right z-max" :class="$q.platform.is.desktop ? 'box-button-logout' : 'box-button-logout-mobile'"
    v-if="isShowDialogYourKnowUs">
    <div class="relative-position animate__animated animate__fadeInDown animation-duration-0-5s animate__delay-2s">
      <q-img src="/images/icon_main/icon-logout.png" class="cursor-pointer button-active-main" no-spinner no-transition
        @click="isShowDialogLogout = true"></q-img>
    </div>
  </div>
  <!-- #endregion -->

  <!-- #region Logout -->
  <logout-dialog v-if="isShowDialogLogout" @callback-closeDialog="isShowDialogLogout = false"></logout-dialog>
  <!-- #endregion -->
</template>

<script setup>
import backgroundMain from "components/background_main/background-main.vue";
import logoutDialog from "components/dialog_main/logout-dialog.vue";
import dialogTerms from "components/payments/terms-dialog.vue";
import dialogTableOfContent from "components/dialog_main/dialog-table-of-content.vue";

import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSystemStore } from "src/stores/system";
import { useQuasar } from "quasar";
import axios from "axios";
import { useStudentStore } from "src/stores/student";
import { auth, logout } from "src/router";

const $route = useRoute();

// Initialze store
const studentStore = useStudentStore();
const systemStore = useSystemStore();

// Initialze API
const controller = axios.CancelToken;
let source = null;

// Initialze data
const $q = useQuasar();
const router = useRouter();
const route = useRoute();
const tempCacheImage = Math.random().toString(36).slice(2);

// Data
const registerFormData = ref({
  name: "",
  surname: "",
  birthDate: {
    day: null,
    month: null,
    year: null,
  },
  username: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
});

const termsType = ref("");
const stepType = ref("");
const yourKnowUsDetail = ref("");
const selectCreateAccount = ref("");
const refButtonCreateLessAccount = ref(null);
const refButtonCreateOverAccount = ref(null);
const monthOptions = ref([
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
const yearOptions = ref([]);

const listOfYourKnowUs = ref([
  { index: 0, name: "โรงเรียน", value: false },
  { index: 1, name: "Google", value: false },
  { index: 2, name: "Facebook", value: false },
  { index: 3, name: "Line Official", value: false },
  { index: 4, name: "ช่องทางอื่นๆ (โปรดระบุ อธิบาย)", value: false },
]);

const isHideObject = ref(false);

// Validate
const isValidateUsername = ref(false);
const isValidateEmail = ref(false);
const isValidatePhoneNumber = ref(false);
const isValidatePassword = ref(false);
const isValidateConfirmPassword = ref(false);
const isValidateAgree = ref(false);
const isValidateName = ref(false);
const isValidateSurname = ref(false);
const isValidateDay = ref(false);
const isValidateMonth = ref(false);
const isValidateYear = ref(false);

// Show/Hide
const isShowPassword = ref(false);
const isShowConfirmPassword = ref(false);
const isShowDialogTableOfContent = ref(false);

// Ref Input
const inputRefUsername = ref(null);
const inputRefPassword = ref(null);
const inputRefConfirmPassword = ref(null);
const inputRefEmail = ref(null);
const inputRefName = ref(null);
const inputRefSurname = ref(null);

// Dialog
const isShowDialogSelectAccount = ref(false);
const isShowDialogDetailYounger = ref(false);
const isShowDialogRegisterForm = ref(false);
const isShowDialogTermsAndPolicy = ref(false);
const isShowDialogSuccessCreateAccount = ref(false);
const isShowDialogYourKnowUs = ref(false);
const isShowDialogLoading = ref(false);
const isShowDialogLogout = ref(false);

// #region Show dialog Terms and Policy
const funcShowDialogTermsAndPolicy = (type, page) => {
  isShowDialogTermsAndPolicy.value = true;
  termsType.value = type;
  stepType.value = page;
};
// #endregion

// #region Next register form
const funcNextRegisterForm = async (type) => {
  const systemStore = useSystemStore();

  try {
    selectCreateAccount.value = type;

    isShowDialogSelectAccount.value = false;
    isShowDialogDetailYounger.value = false;

    isShowDialogLoading.value = true;

    isShowDialogRegisterForm.value = true;

    let responseDate = await systemStore.getServerTime();

    if (responseDate.message != "success") {
      throw new Error("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
    }

    if (!$q.platform.is.desktop) {
      let registerBox = document.getElementById("box-register-form");
      let boxFakeScroll = document.getElementById("box-fake-scroll-register-form");

      const boxDiv = document.createElement("div");
      boxDiv.style.height = `${registerBox.scrollHeight}px`;
      boxFakeScroll.appendChild(boxDiv);
    }

    if (type == "younger") {
      let year = responseDate.data.year + 543;

      for (let i = 0; i < 11; i++) {
        yearOptions.value.push(year - i);
      }
    } else {
      let year = responseDate.data.year + 533;

      for (let i = 0; i < 61; i++) {
        yearOptions.value.push(year - i);
      }
    }

    setTimeout(() => {
      isShowDialogLoading.value = false;
    }, 500);
  } catch (e) {
    if (type == "younger") {
      isShowDialogDetailYounger.value = true;
      isShowDialogSelectAccount.value = true;
    } else {
      isShowDialogSelectAccount.value = true;
    }

    isShowDialogLoading.value = false;

    $q.notify({
      color: "negative",
      message: e,
      position: "top",
      timeout: 2000,
    });
  }
};
// #endregion

// #region Select Day
const funcSelectDay = (item) => {
  registerFormData.value.birthDate.day = item;
  isValidateDay.value = false;
};
// #endregion

// #region Select Month
const funcSelectMonth = (item, index) => {
  registerFormData.value.birthDate.month = index + 1;
  isValidateMonth.value = false;
};
// #endregion

// #region Select Year
const funcSelectYear = (item) => {
  registerFormData.value.birthDate.year = item;
  isValidateYear.value = false;
};
// #endregion

// #region Show Select Month
const showSelectMonth = computed(() => {
  return monthOptions.value[registerFormData.value.birthDate.month - 1];
});
// #endregion

// #region Create Account
const funcCreateAccount = async () => {
  const systemStore = useSystemStore();
  const studentStore = useStudentStore();

  try {
    if (
      registerFormData.value.username == "" &&
      registerFormData.value.password.length == 0 &&
      registerFormData.value.confirmPassword.length == 0 &&
      registerFormData.value.email == "" &&
      registerFormData.value.birthDate.day == null &&
      registerFormData.value.birthDate.month == null &&
      registerFormData.value.birthDate.year == null
    ) {
      isValidateUsername.value = true;
      isValidatePassword.value = true;
      isValidateConfirmPassword.value = true;
      isValidateEmail.value = true;
      isValidateAgree.value = true;
      isValidateDay.value = true;
      isValidateMonth.value = true;
      isValidateYear.value = true;
      isValidateName.value = true;
      isValidateSurname.value = true;
      throw new Error("กรุณากรอกข้อมูลให้ครบ");
    }

    if (!funcFormatUsername()) {
      isValidateUsername.value = true;
      inputRefUsername.value.focus();
      throw new Error("รูปแบบชื่อผู้ใช้งานไม่ถูกต้อง");
    }

    if (registerFormData.value.password.length < 8) {
      isValidatePassword.value = true;
      inputRefPassword.value.focus();
      throw new Error("รหัสผ่านต้องมีจำนวน 8-16 ตัวอักษร");
    }

    if (
      registerFormData.value.confirmPassword != registerFormData.value.password ||
      registerFormData.value.confirmPassword.length < 8
    ) {
      isValidateConfirmPassword.value = true;
      inputRefConfirmPassword.value.focus();
      throw new Error("กรุณายืนยันรหัสผ่านให้ตรงกัน");
    }

    if (registerFormData.value.email == "" || !funcFormatEmail()) {
      isValidateEmail.value = true;
      inputRefEmail.value.focus();
      throw new Error("รูปแบบอีเมลไม่ถูกต้อง");
    }

    if (registerFormData.value.name == "") {
      isValidateName.value = true;
      inputRefName.value.focus();
      throw new Error("กรุณากรอกชื่อ");
    }

    if (registerFormData.value.surname == "") {
      isValidateSurname.value = true;
      inputRefSurname.value.focus();
      throw new Error("กรุณากรอกนามสกุล");
    }

    isValidateConfirmPassword.value = false;

    if (registerFormData.value.birthDate.day == null) {
      isValidateDay.value = true;
      throw new Error("กรุณาเลือกวันเกิด");
    }

    if (registerFormData.value.birthDate.month == null) {
      isValidateMonth.value = true;
      throw new Error("กรุณาเลือกเดือนเกิด");
    }

    if (registerFormData.value.birthDate.year == null) {
      isValidateYear.value = true;
      throw new Error("กรุณาเลือกปีเกิด");
    }

    $q.loading.show({
      message: "กำลังสร้างบัญชี...",
    });

    source = controller.source();

    try {

      const APIURL_REGISTER = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/registerV3-createAccountV2`;

      const POSTDATA_REGISTER = {
        username: registerFormData.value.username.toLowerCase(),
        password: registerFormData.value.password,
        email: registerFormData.value.email,
        phoneNumber: registerFormData.value.phoneNumber,
        name: registerFormData.value.name,
        surname: registerFormData.value.surname,
        birthDate: registerFormData.value.birthDate,
        influencerId: $route.params.influencerId,
        platform: $route.params.platform,
      };

      const response_register = await axios.post(APIURL_REGISTER, POSTDATA_REGISTER);

      if (response_register.data == "Limit email") {
        isValidateEmail.value = true;
        throw new Error("อีเมลนี้ถูกใช้ครบ 3 ครั้งแล้ว กรุณาเลือกอีเมลใหม่");
      } else if (response_register.data == "Username already exists") {
        isValidateUsername.value = true;
        throw new Error("ชื่อผู้ใช้งานซ้ำ หรือมีอยู่แล้วในระบบ");
      } else if (response_register.data.message == "Success") {
        isShowDialogRegisterForm.value = false;

        $q.loading.show({
          message: "กำลังเข้าสู่ระบบ...",
        });

        let getStudent = await systemStore.login(
          registerFormData.value.username,
          registerFormData.value.password
        );

        if (getStudent != "success") {
          throw new Error("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
        }

        let getToken = await systemStore.loginAuth();

        systemStore.saveLoginLog(response_register.data.studentId);

        auth.signInWithCustomToken(getToken).then(() => {
          systemStore.setLogin();

          isShowDialogSuccessCreateAccount.value = true;
        });
      } else {
        throw new Error("เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้งภายหลัง");
      }

      $q.loading.hide();
    } catch (e) {
      $q.loading.hide();
      throw new Error(e.message);
    }
    $q.loading.hide();
  } catch (e) {
    isShowDialogRegisterForm.value = true;
    $q.loading.hide();
    $q.notify({
      message: e.message,
      color: "negative",
      position: "top",
      timeout: 1000,
      html: true,
    });
    return;
  }
};
// #endregion

// #region Save your know us
const funcSaveYourKnowUs = async () => {
  const studentStore = useStudentStore();
  const systemStore = useSystemStore();
  try {
    $q.loading.show({
      message: "กำลังบันทึกข้อมูล...",
    });

    let tempAnswer = listOfYourKnowUs.value.filter((x) => x.value);

    if (tempAnswer.length) {
      let findIndex4 = tempAnswer.find((x) => x.index == 4);

      if (findIndex4) {
        tempAnswer = tempAnswer.filter((x) => x.index != 4);
        tempAnswer = tempAnswer.map((x) => x.name);

        if (yourKnowUsDetail.value) {
          tempAnswer.push(yourKnowUsDetail.value);
        }
      } else {
        tempAnswer = tempAnswer.map((x) => x.name);
      }
    }

    const APIURL = `${process.env.NEWAPI}/registerV3-registerStep2`;

    const POSTDATA = {
      studentId: studentStore.student.data.studentId,
      answer: tempAnswer,
    };

    const response = await axios.post(APIURL, POSTDATA);

    if (response.data.message != "success") {
      throw new Error(response.data.message);
    }

    isShowDialogYourKnowUs.value = false;

    $q.loading.hide();
    router.replace("/splash/");
  } catch (e) {
    isShowDialogYourKnowUs.value = true;
    $q.loading.hide();
    $q.notify({
      message: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      color: "negative",
      position: "top",
      timeout: 2000,
    });
  }
};
// #endregion

// #region Format Email
const funcFormatEmail = () => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const isValid = emailRegex.test(registerFormData.value.email);

  if (isValid) {
    return true;
  }

  return false;
};
// #endregion

// #region Format Phone Number
const funcFormatPhoneNumber = () => {
  const phoneNumberRegex = /(^[0-9]{10}$)|(^\+[0]{2}\s+[0-9]{2}[0-9]{8}$)|(^[0]{1}[0-9]{2}-[0-9]{3}-[0-9]{4}$)/;

  const isValid = phoneNumberRegex.test(registerFormData.value.phoneNumber);

  if (registerFormData.value.phoneNumber == "000-000-0000") return false;

  if (isValid) {
    return true;
  }

  return false;
};
// #endregion

// #region Format username
const funcFormatUsername = () => {
  const usernameRegex = /^[A-Za-z0-9]+$/;

  const isValid = usernameRegex.test(registerFormData.value.username);

  if (isValid && registerFormData.value.username.length >= 6) {
    return true;
  }

  return false;
};
// #endregion

// #region Format password
const funcFormatPassword = (password) => {
  const passwordRegex = /^([a-zA-Z0-9]{8,16})+$/;

  const isValid = passwordRegex.test(password);

  if (isValid) {
    return true;
  }

  return false;
};
// #endregion

// #region Next to your know us
const funcNextToYourKnowUs = () => {
  isShowDialogSuccessCreateAccount.value = false;
  isShowDialogYourKnowUs.value = true;
};
// #endregion

// #region Scroll Register Form
const funcScrollRegisterForm = (e) => {
  let scroll = document.getElementById("box-fake-scroll-register-form");

  if (e.target.scrollTop > 5) {
    scroll.style.top = `${e.target.scrollTop - 5}px`;
    scroll.scrollTop = e.target.scrollTop;
  } else {
    scroll.style.top = `${e.target.scrollTop + 5}px`;
    scroll.scrollTop = e.target.scrollTop;
  }
};
// #endregion

const funcSaveVisit = async e => {

  try{

    let getVisit = sessionStorage.getItem('VISIT_ODS')

    if(getVisit){
      return
    }

    const APIURL = `https://asia-southeast1-winnerenglish2-e0f1b.cloudfunctions.net/registerV3-visit`

    const body = {
      influencerId: $route.params.influencerId || '',
      platform: $route.params.platform || '',
    }

    const response = await axios.post(APIURL, body);

    if(response.data.message != 'success'){
      throw response.data.message
    }

    sessionStorage.setItem('VISIT_ODS', 'true')

  }catch(e){
    $q.notify({
      message: e,
      color: "negative",
      position: "top",
      timeout: 1000,
      html: true,
    });
  }

}

let authListen;
onMounted(async () => {
  systemStore.setRouter("placement");
  const studentStore = useStudentStore();

  funcSaveVisit()

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

  if (systemStore.isLogin) {
    authListen = auth.onAuthStateChanged(async function (user) {
      if (user) {
        if (!studentStore.isFinishRegister) {
          isShowDialogYourKnowUs.value = true;
        }

        if (authListen) {
          authListen();
        }

        $q.loading.hide();
      } else {
        auth.signOut();
        isShowDialogSelectAccount.value = true;
        $q.loading.hide();
      }
    });
  } else {
    isShowDialogSelectAccount.value = true;
  }
});

onBeforeUnmount(() => {
  if (source) {
    source.cancel("cancel");
  }

  if (authListen != undefined) authListen();
  systemStore.disposeStore();
});
</script>

<style lang="scss" scoped>
// #region ***** Old Style *****
.register-background {
  width: 100%;
  height: 100vh;
  background-image: url("/images/background_main/background-placement.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  overflow: hidden;
}

.register-background.mobile {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}

.box-student-detail {
  position: relative;
  max-width: 300px;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #fff;
  border-radius: 50px;
  padding: 5px;
  color: #fff;
  z-index: 3;
}

.placement-container {
  margin: auto;
}

.placement-container.desktop {
  max-width: 1152px;
  width: 100%;
}

.placement-container.mobile {
  max-width: 600px;
  width: 100%;
}

.placement-box {
  height: 100%;
  background-image: url("/images/placement_main/placement-item-4.png");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.placement-box.mobile {
  width: 1600px;
  position: fixed;
  top: 50%;
  transform: translate(0, -50%);
}

.placement-box.desktop {
  max-width: 1152px;
  width: 100%;
}

.box-placement-test-mobile {
  max-width: 1000px;
  width: 100%;
  min-width: 360px;
}

.box-placement-mobile-sub {
  width: 100%;
  height: 350px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid #4a261b;
  border-radius: 10px;
  overflow: hidden;
}

.box-placement-header {
  background-color: #984510;
  // height: 70px;
  padding: 5px;
  border-bottom: #4a261b 2px solid;
}

.box-placement-body {
  padding: 10px 5px 5px 10px;
  height: calc(100% - 70px);
  overflow-y: scroll;
}

.box-placement-body::-webkit-scrollbar {
  width: 5px;
}

.box-placement-body::-webkit-scrollbar-track {
  background: transparent;
}

.box-placement-body::-webkit-scrollbar-thumb {
  background: #4a261b;
}

.placement-box-timeout {
  width: 52%;
  // background-color: #984510;
  // border-bottom: 8px solid #652a06;
  border-radius: 20px;
  // box-shadow: 0px 0px 0px 5px #4a261b;
}

.box-timeout {
  width: 180px;
  height: 80px;
  background-color: #fff;
  border-radius: 12px;
  font-size: 50px;
}

.box-timeout-mobile {
  width: 100px;
  height: 35px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 50px;
}

.box-content-placement {
  width: 90%;
  height: 80%;
}

.placement-content-backdrop {
  width: 90%;
  height: 85%;
  background-color: rgba(0, 0, 0, 0.5);
}

.box-placement-question {
  height: 100%;
  color: #fff;
  padding: 0% 0.7%;
}

.box-placement-question-scroll {
  height: 78%;
  font-family: mali-m;
  overflow: auto;
  z-index: 1;
  padding: 1% 3%;
}

// .box-placement-question-scroll::-webkit-scrollbar {
//   width: 5px;
// }

// .box-placement-question-scroll::-webkit-scrollbar-track {
//   background: transparent;
// }

// .box-placement-question-scroll::-webkit-scrollbar-thumb {
//   background: #4a261b;
// }

.box-placement-question.backdrop {
  background-color: rgba(0, 0, 0, 0.3);
}

.text-choice,
.text-dialog,
.text-finish,
.text-level {
  color: #4a261b;
}

.animation-clock-timeout {
  animation: timeout 0.1s linear alternate infinite;
  transform: rotate(-5deg);
  transform-origin: bottom;
  transform-box: fill-box;

  -webkit-animation: timeout 0.1s linear alternate infinite;
  -webkit-transform: rotate(-5deg);
}

@keyframes timeout {
  to {
    transform: rotate(5deg);

    -webkit-transform: rotate(5deg);
  }
}

.box-select-class-container {
  width: 100%;
  height: 100%;
  background-color: #efd080;
  border-radius: 4px;
}

.title-select-class {
  color: #4a261b;
}

.box-dialog-container {
  width: 320px;
  height: fit-content;
  background-color: #f2c043;
  border: 3px solid #4a261b;
  border-radius: 20px;
  padding: 8px;
}

.box-dialog-container .box-dialog-sub {
  background-color: #ffedc4;
  border-radius: 11px;
  color: #4e1617;
}

.title-dialog {
  color: #4a261b;
}

// #endregion

// #region ***** register form *****
.box-dialog-details {
  background-color: #efd080;
  border-radius: 10px;
  padding: 10px;
}

.box-skeleton {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 20px;
  background-color: rgb(255, 237, 196) !important;
  border-color: transparent !important;
  overflow: hidden;
  cursor: default !important;
}

.box-skeleton::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -70%;
  width: 70%;
  height: 100%;
  background: linear-gradient(90deg,
      rgba(255, 237, 196, 1) 0%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 237, 196, 1) 100%);
  transform: translateY(-50%);

  animation: skeleton 2s infinite linear;
}

@keyframes skeleton {
  to {
    left: 170%;
  }
}

.box-input-register {
  position: relative;
  width: 250px;
  height: 30px;
  border: 1px solid #4a261b;
  background-color: #fff;
  border-radius: 10px;
  padding: 0 5px 0px 10px;
}

.text-details {
  color: #0085ff;
  text-decoration: underline;
}

.validate-error {
  border: 1px solid #c10017 !important;
  background-color: #f8e2e2;
}

.text-validate {
  color: #c10015;
}

.text-content {
  color: #4a261b;
}

.box-content-details {
  height: 210px;
  background-color: #fff;
  border: 3px solid #c96814;
  color: #4a261b;
  border-radius: 20px;
}

.animation-cursor {
  height: 20px;
  animation: cursorAnimtion 1s linear infinite;
  border-right: 1px solid #000;
  opacity: 0;
}

@keyframes cursorAnimtion {
  50% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.box-email-otp {
  width: 40px;
  height: 40px;
  border: 1px solid #4a261b;
  border-radius: 10px;
  background-color: #fff;
}

.box-email-otp .selected {
  width: 1px;
  height: 60%;
  background-color: #000;
  animation: cursorAnimtion 1s linear infinite;
  opacity: 0;
}

.box-you-know-us-textarea {
  width: 100%;
  height: 180px;
  border: 1px solid #939393;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
}

.box-you-know-textarea-disable {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
}

.box-placement-main {
  max-width: 1150px;
  width: 100%;
}

.animation-duration-1s {
  animation-duration: 0.1s;
}

// #endregion

// #region Register Flow v2

.box-container-main {
  max-width: 1600px;
  width: 100%;
  min-width: 1600px;
  min-height: fit-content;
  max-height: fit-content;
  margin: auto;
}

.box-dialog-content-scroll-absolute {
  top: 5px;
  right: 2px;
  width: 10px;
  height: 100%;
  // margin: 16px 0px;
  // background-color: red;
  border-radius: 10px;
  overflow-y: scroll;
}

.box-dialog-content-scroll-absolute::-webkit-scrollbar {
  width: 4px;
}

.box-dialog-content-scroll-absolute::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0px 20px 20px 0px;
}

.box-dialog-content-scroll-absolute::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  // border: 2px solid #efd080;
  border-radius: 50px;
}

.box-dialog-content-scroll {
  height: 360px;
  margin: 16px 0px;
  // background-color: #efd080;
  border-radius: 10px;
  overflow-y: auto;
}

.box-dialog-content-scroll::-webkit-scrollbar {
  width: 0px;
}

// .box-dialog-content-scroll::-webkit-scrollbar-track {
//   // background: #efd080;
//   // border-radius: 0px 20px 20px 0px;
// }

.box-dialog-content-scroll::-webkit-scrollbar-thumb {
  background-color: #4a261b;
  // border: 3px solid #efd080;
  // border-radius: 20px;
}

.box-student-name-container {
  max-width: 300px;
  width: 18.75%;
  min-width: 200px;
  margin: 1%;
}

.box-student-name-container-mobile {
  max-width: 300px;
  width: 18.75%;
  min-width: 200px;
  margin: 10px;
}

.box-student-name {
  width: 100%;
  height: 100%;
  max-height: 60px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 5% 7%;
  color: #fff;
  line-height: 1.5;
  font-size: clamp(11px, 1vw, 16px);
}

.box-student-name-mobile {
  width: 230px;
  height: 40px;
  font-size: 12px;
  border-radius: 999px;
  border: 2px solid #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  color: #fff;
}

.box-button-logout {
  width: 2.45%;
  min-width: 35px;
  margin: 1%;
}

.box-button-logout-mobile {
  width: 40px;
  margin: 10px;
}

// #region New Box
.box-dialog-container-2 {
  width: 320px;
  height: fit-content;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;
}

.sub-dialog-container-2 {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
  color: #4a261b;
}

.box-dialog-content-2 {
  border-radius: 10px;
  background: #efd080;
  padding: 12px;
  margin: 16px 0px;
}

.box-dialog-content-2[helf="right"] {
  border-radius: 10px 0px 0px 10px;
  border-right: 2px solid #ac7d05;
}

.box-dialog-content-2[helf="left"] {
  border-radius: 0px 10px 10px 0px;
  margin-left: 2px;
}

.box-dialog-content-2[helf="top"] {
  border-radius: 0px 0px 0px 0px;
  margin-top: 2px;
  margin-bottom: 0px;
}

.box-dialog-content-2[helf="bottom"] {
  border-radius: 0px 0px 0px 0px;
  border-bottom: 2px solid #ac7d05;
  box-shadow: 0px 5px 4px 0px #ffedc4;
  margin: 0px 0px 3px;
}

.box-dialog-create-2 {
  // width: 100%;
  // min-width: 320px;
  width: 600px;
}

.box-button-image-create-account {
  width: 250px;
}

.box-button-close {
  top: -15px;
  right: -15px;
  width: 50px;
}

.box-hint-header {
  width: 250px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.5);
  line-height: 1.3;
}

.box-image-less-year-old {
  width: 250px;
  height: 140px;
  margin: 16px 0px;
}

.box-condition-create-account {
  width: 250px;

  color: #4a261b;
  line-height: 28px;
}

.box-button-continue {
  height: 50px;
}

.box-input-select {
  height: 30px;
  padding: 5px 5px 5px 7px;
  line-height: 0;
}

.box-select-item {
  color: #4a261b;
  background-color: #fff;
  padding: 5px;
  cursor: pointer;
}

.box-select-item:hover,
.box-select-item[active="true"] {
  background-color: #4a261b;
  color: #fff;
}

.box-success-icon {
  position: relative;
  width: 140px;
  height: 140px;
  border: 3px solid #769606;
  background-color: #a0ca0e;
  border-radius: 50%;
  color: #fff;
  margin: 8px 0px;
}

.box-input-textarea {
  width: 100%;
  height: 100px;
  border: 1px solid #939393;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
  padding: 10px;
  color: #4a261b;
}

.box-input-textarea[data="readonly"] {
  border-radius: 10px;
  border: 1px solid #939393;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), #fff;
}

// #endregion

// #region New Button
.button-active-main {
  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
  -o-transition: 0.1s;

  transform: scale(1);
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -o-transform: scale(1);

  cursor: pointer;
}

.button-active-main:active {
  transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
  -o-transform: scale(0.95);

  transition: 0.1s;
  -webkit-transition: 0.1s;
  -moz-transition: 0.1s;
  -o-transition: 0.1s;
}

// #endregion

// #region Text
.text-link {
  color: #0085ff;
  text-decoration-line: underline;
}

.text-student-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.text-stroke {
  color: #fff;
  text-shadow: rgb(74, 38, 27) 2px 0px 0px, rgb(74, 38, 27) 1.75517px 0.958851px 0px,
    rgb(74, 38, 27) 1.0806px 1.68294px 0px, rgb(74, 38, 27) 0.141474px 1.99499px 0px,
    rgb(74, 38, 27) -0.832294px 1.81859px 0px, rgb(74, 38, 27) -1.60229px 1.19694px 0px,
    rgb(74, 38, 27) -1.97998px 0.28224px 0px, rgb(74, 38, 27) -1.87291px -0.701566px 0px,
    rgb(74, 38, 27) -1.30729px -1.5136px 0px, rgb(74, 38, 27) -0.421592px -1.95506px 0px,
    rgb(74, 38, 27) 0.567324px -1.91785px 0px, rgb(74, 38, 27) 1.41734px -1.41108px 0px,
    rgb(74, 38, 27) 1.92034px -0.558831px 0px;
}

.text-hint-input {
  color: #939393;
  // line-height: 1;
}

// #endregion

// Margin
.margin-y-16 {
  margin-top: 16px;
  margin-bottom: 16px;
}

// #endregion</style>
