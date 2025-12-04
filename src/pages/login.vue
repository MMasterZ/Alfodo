<template>
  <div class="bg-original row justify-center items-center">
    <div class="col-12 self-center q-pa-md z-top">
      <div class="" align="center">
        <transition
          appear
          enter-active-class="animated animate__bounceInDown"
          leave-active-class="animated animate__flipOutY"
        >
          <div class="container-login relative-position">
            <div align="center">
              <!-- <logo-login></logo-login> -->
              <q-img src="/images/logo-alfodo.webp" width="183px"></q-img>
            </div>
            <div class="q-mt-lg relative-position">
              <!-- box-adventure -->

              <div class="box-login-container relative-position">
                <q-img src="/images/box_main/box-login.webp" no-spinner no-transition></q-img>
                <div class="box-login-sub absolute-center fit row">
                  <div class=" col-12">
                    <div class="box-input-main relative-position">
                      <div class="absolute-center fit" style="top:32%;">
                        <q-input
                          @keyup.enter="toAdventure()"
                          autofocus
                          dense
                          borderless
                          class="no-margin q-px-sm"
                          label-color="dark"
                          v-model.trim="username"
                          input-class="no-padding no-margin"
                          data-cy="username"
                          ref="usernameRef"
                          placeholder="รหัสผู้ใช้งาน"
                        />
                      </div>
                    </div>
                    <div class="q-mt-md">
                      <div class="box-input-main relative-position">
                        <div class="absolute-center fit" style="top:32%;">
                          <q-input
                            @keyup.enter="toAdventure()"
                            dense
                            borderless
                            class="no-margin q-px-sm"
                            label-color="dark"
                            input-class="no-padding no-margin"
                            v-model.trim="password"
                            :type="isPwd ? 'password' : 'text'"
                            data-cy="password"
                            ref="passwordRef"
                            placeholder="รหัสผ่าน"

                          >
                            <template v-slot:append>
                              <q-icon
                                :name="isPwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer "
                                @click="isPwd = !isPwd"
                                data-cy="togglePassword"
                                style="font-size:20px;color:#512A08;margin-top:-1px;"
                              />
                            </template>
                          </q-input>
                        </div>
                      </div>
                    </div>
                    <!-- ปุ่มเข้าสู่ระบบ -->
                    <div class="q-mt-md">
                      <q-img
                        class="cursor-pointer"
                        style="max-width: 250px; width: 100%"
                        @click="toAdventure()"
                        src="/images/button_main/button-login.webp"
                      ></q-img>
                    </div>
                  </div>

                  <div class="col-12 self-end box-login-detail footer  font-mali-m">
                    <div data-cy="forgotPassword">
                      ลืมรหัสผู้ใช้งานหรือรหัสผ่าน
                      <br>
                      กรุณาติดต่อครูผู้สอน
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="absolute-bottom-right q-py-sm q-px-sm">
      <span class="text-white">{{ `v.${version}` }}</span>
    </div>
  </div>

  <!-- #region Dialog Error -->
  <q-dialog persistent v-model="isShowErrorDialog" data-cy="errorDialog">
    <q-card flat class="bg-transparent" style="width: 320px; height: 312px">
      <q-card-section class="bg-transparent text-dark no-padding">
        <!-- รูปพื้นหลัง Error -->
        <q-img src="/images/box_main/box-forget-password.png" class="fit">
          <div class="absolute-center bg-transparent full-width">
            <div
              align="center"
              class="font-16 text-weight-bold text-dark relative-position q-px-md"
            >
              ไม่สามารถเข้าสู่ระบบได้
            </div>
            <div align="center" class="text-dark relative-position q-px-md q-mt-md">
              รหัสผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง
              <br />กรุณาลองใหม่อีกครั้ง
            </div>
          </div>
          <div
            style="width: 100%; bottom: 30px; z-index: 1000"
            class="bg-transparent absolute-bottom"
            align="center"
          >
            <!-- ปุ่มตกลง -->
            <div @click="confirm()" class="cursor-pointer btn-Alert z-top">
              <span class="text-dark absolute-center cursor-pointer">ตกลง</span>
            </div>
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Install app -->
  <q-dialog
    v-model="showAppInstallationPrompt"
    position="bottom"
    persistent
    seamless
    class="z-top"
  >
    <q-card class="no-padding">
      <q-card-section class="row items-center no-wrap no-padding">
        <q-banner class="bg-primary text-white">
          <!-- <q-icon name="fas fa-user"></q-icon> -->

          <q-img style="width: 50px" src="images/logo-login.png"></q-img>
          Install Winner English?
          <template v-slot:action>
            <q-btn flat color="white" label="Yes" @click="installApp()" />
            <q-btn
              flat
              color="white"
              label="Later"
              @click="showAppInstallationPrompt = false"
            />
          </template>
        </q-banner>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Forget password -->
  <q-dialog v-model="isDialogForgetPassword" maximized class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center relative-position">
        <q-img src="/images/box_main/box-forget-password.png" width="320px">
          <div
            class="fit transparent row justify-center no-padding relative-position"
            align="center"
          >
            <div class="col-12 q-pa-md q-mt-md" align="center">
              <div class="q-px-md" style="height: 45px">
                <q-input
                  dense
                  outlined
                  borderless
                  bg-color="white"
                  :rules="[(val) => validateEmail(val)]"
                  ref="emailRef"
                  v-model.trim="email"
                  hide-bottom-space
                  placeholder="ระบุอีเมล์ที่ลงทะเบียนไว้"
                ></q-input>
              </div>
              <div class="q-px-md q-pt-sm">
                <q-img
                  class="cursor-pointer"
                  @click="funcForgotPassword()"
                  src="/images/button_main/button-confirm.png"
                ></q-img>
              </div>
            </div>
            <div
              class="col-12 self-end font-mali-b"
              style="height: 100px; color: #512a08"
              align="center"
            >
              <div>หรือติดต่อ</div>
              <div>
                <a target="__blank" href="https://www.facebook.com/WinnerEng">
                  facebook : WinnerEng
                </a>
              </div>
              <div class="q-pt-xs">(สำหรับโรงเรียน กรุณาติดต่อครูผู้สอน)</div>
            </div>
          </div>
          <div class="absolute-top-right transparent" style="right: -15px; top: -15px">
            <q-btn flat @click="isDialogForgetPassword = false" round>
              <q-img src="/images/icon_main/icon-close.png"></q-img>
            </q-btn>
          </div>
        </q-img>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->

  <!-- #region Dialog Cookie -->
  <dialog-cookie :isShowDialogCookie="isDialogCookies" class="z-max"></dialog-cookie>
  <!-- #endregion -->

  <!-- #region Dialog Delete user success -->
  <q-dialog
    v-model="isShowDialogDeleteUserSuccess"
    maximized=""
    persistent=""
    class="z-max"
  >
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div class="box-dialog-container">
          <div class="box-sub-dialog">
            <div align="center" class="f20 font-mali-b">ลบบัญชีผู้ใช้สำเร็จ</div>
            <div class="box-content-dialog">
              <div align="center" class="f16 font-mali-b">บัญชีผู้ใช้ของคุณถูกลบแล้ว</div>

              <div class="box-circle row justify-center items-center">
                <q-icon name="fas fa-check" size="80px" class="text-white"> </q-icon>
              </div>

              <div class="f16 font-mali-m" style="line-height: 26px" align="center">
                ขอบคุณที่เลือก Winner English หวังว่าเราจะพบกันอีกครั้ง
                <br />ในโอกาสหน้า
              </div>
            </div>

            <div align="center">
              <q-img
                width="120px"
                src="/images/button_main/button-confirm-short.png"
                no-spinner
                no-transition
                class="cursor-pointer"
                v-close-popup
                @click="funcConfirmDeleteUser()"
              ></q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!-- #endregion -->
</template>

<script setup>
import axios from "axios";
import { auth, checkCookies, db } from "src/router";
import logoLogin from "../components/logo-login.vue";
import dialogCookie from "../components/dialog-cookie.vue";
import getHooks from "src/hooks/getHooks";
import { useStudentStore } from "../stores/student";
import { useSchoolStore } from "src/stores/school";
import { useSystemStore } from "src/stores/system";
import p_json from "/package.json";
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

var deferredPrompt;
var currentDate;

// Components
const components = defineComponent({
  dialogCookie,
  logoLogin,
});

// Initial
const $q = useQuasar();
const $router = useRouter();

// Store
const studentStore = useStudentStore();
const systemStore = useSystemStore();
const schoolStore = useSchoolStore();

// Data
const email = ref("");
const username = ref("");
const password = ref("");

// Boolearn
const isPwd = ref(true);
const isShowErrorDialog = ref(false);
const showAppInstallationPrompt = ref(false);
const isDialogForgetPassword = ref(false);
const isDialogCookies = ref(false);
const isShowDialogDeleteUserSuccess = ref(false);

// Version
const version = p_json.version;

// #region Function

// #region To Adventure

const usernameRef = ref(null);
const passwordRef = ref(null);
let studentListen;
const snapStudent = () => {
  studentListen = db
    .collection("student")
    .doc(studentStore.studentId)
    .onSnapshot((res) => {
      let data = res.data();

      let loginKey = window.sessionStorage.getItem("loginKey");

      if (loginKey != data.loginKey) {
        $q.notify({
          message: "มีการเข้าใช้งานจากอุปกรณ์อื่น",
          position: "top",
          color: "red",
        });
        auth.signOut();
        $router.push("/");
        if (studentListen) studentListen();
        return;
      }
    });
};

const toAdventure = async () => {
  systemStore.resetStore();

  $q.sessionStorage.remove("loginKey");

  try {
    if (username.value == "" || password.value == "") {
      if (username.value == "") {
        usernameRef.value.focus();
        return;
      }

      if (password.value == "") {
        passwordRef.value.focus();
        return;
      }
    }

    $q.loading.show({
      message: "กำลังเชื่อมต่อกับฐานข้อมูล...",
    });

    let getStudent = await systemStore.login(username.value, password.value);

    if (getStudent == "success") {
      let getToken = await systemStore.loginAuth();

      systemStore.saveLoginLog(studentStore.studentId);

      let typeStudent = "school";

      if (studentStore.studentType == "online") {
        typeStudent = "online";
      }

      if (
        studentStore.studentType == "online" ||
        studentStore.studentType == "demo" ||
        studentStore.studentType == "tutor"
      ) {
        let currentDate = await systemStore.getServerTime();

        let startDate = new Date(studentStore.studentData.startDate).getTime();

        if (startDate > currentDate.data.timestamp) {
          $q.notify({
            icon: "fas fa-exclamation-triangle",
            message: `บัญชีนี้ยังไม่เปิดใช้งาน กรุณาติดต่อทีมงาน v${version}`,
            position: "top",
            timeout: 3000,
          });
          $q.loading.hide();

          return;
        }
      }

      $q.localStorage.set("onlineStatusInOdyssey", typeStudent);

      let getSchool = await schoolStore.getSchool(
        studentStore.schoolId,
        studentStore.courseId
      );

      if (getSchool == "success") {
        auth
          .signInWithCustomToken(getToken)
          .then(() => {
            systemStore.setLogin();

            snapStudent();

            if (studentStore.studentType == "online") {
              if (!studentStore.isFinishRegister) {
                $router.push("/register/");
                return;
              }
            } else {
              if (!studentStore.studentData.isPlacement) {
                window.open(
                  `https://we2-placement-new.web.app/#/login/${studentStore.studentId}`,
                  "__self"
                );

                return;
              }
            }

            $router.push("/splash/");
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      } else {
        systemStore.resetStore();

        if (getSchool == "School not found") {
          $q.notify({
            message: `ไม่พบรหัสผู้ใช้งานในระบบ v${version}`,
            color: "red",
            position: "top",
          });

          $q.loading.hide();
          return;
        } else if (getSchool == "School is not active") {
          $q.notify({
            message: `โรงเรียนยังไม่ได้เปิดใช้งาน v${version}`,
            color: "red",
            position: "top",
            timeout: 3000,
          });
        }

        $q.notify({
          message: `ขออภัยขณะนี้โรงเรียนได้ปิดทำการอยู่ กรุณาติดต่อทีมงาน v${version}`,
          position: "top",
          color: "red",
        });

        $q.loading.hide();
        return;
      }

      setTimeout(() => {
        $q.loading.hide();
      }, 500);
    } else {
      if (getStudent == "User not found") {
        // console.log("error : User not found");
        $q.notify({
          message: `ไม่พบรหัสผู้ใช้งานในระบบ v${version}`,
          color: "red",
          position: "top",
          timeout: 3000,
        });
        $q.loading.hide();
        return;
      } else if (getStudent == "School is not active") {
        $q.notify({
          message: `โรงเรียนยังไม่ได้เปิดใช้งาน v${version}`,
          color: "red",
          position: "top",
          timeout: 3000,
        });
        $q.loading.hide();
        return;
      } else {
        $q.notify({
          message: `ยังไม่มีการลงทะเบียนในภาคเรียนปัจจุบัน v${version}`,
          color: "red",
          position: "top",
          timeout: 3000,
        });
        $q.loading.hide();
        return;
      }
    }
  } catch (error) {
    alert(error);
  }
};
// #endregion

// #region Comfirm
const confirm = () => {
  isShowErrorDialog.value = false;
};
// #endregion

// #region Install App
const installApp = async () => {
  showAppInstallationPrompt.value = false;
  // Show the install prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;
  // Optionally, send analytics event with outcome of user choice
  // console.log(`User response to the install prompt: ${outcome}`);
  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null;
};
// #endregion

// #region Validate Email
const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
// #endregion

// #region Forgot Password
const emailRef = ref(null);
const funcForgotPassword = async () => {
  emailRef.value.validate();

  if (emailRef.value.hasError) {
    return;
  }

  $q.loading.show();

  let apiURL = `${process.env.NEWAPI}/auth-forgotPassword`;

  let response = await axios.post(apiURL, { email: email.value });

  if (response.data != "error") {
    $q.notify({
      message: "ส่งอีเมล์เรียบร้อยแล้ว",
      position: "top",
      type: "positive",
      timeout: 1000,
    });
  } else {
    $q.notify({
      message: "ไม่มีอีเมล์นี้ในระบบ",
      position: "top",
      type: "negative",
      timeout: 1000,
    });
  }

  isDialogForgetPassword.value = false;

  $q.loading.hide();
};
// #endregion

// #region Get Server Time
const getServerTime = async () => {
  currentDate = await getHooks.getservertime();
  currentDate = new Date(currentDate).getTime();
};
// #endregion

// #region Next To Register
const funcNextToRegister = () => {
  $router.push("/register/");
};
// #endregion

// #region Confirm Delete User
const funcConfirmDeleteUser = () => {
  isShowDialogDeleteUserSuccess.value = false;
  $q.sessionStorage.remove("isDeleteUser");
};
// #endregion

// #endregion

let authListen;
onMounted(() => {
  auth.signOut();

  $q.sessionStorage.remove("isReceivedReward");

  // this.getServerTime();

  let hasCookies = checkCookies();

  if (hasCookies == "hasCookies") {
    isDialogCookies.value = false;
  } else {
    isDialogCookies.value = true;
  }

  if ($q.sessionStorage.has("isDeleteUser")) {
    isShowDialogDeleteUserSuccess.value = true;
    $q.sessionStorage.remove("isDeleteUser");
  }

  if ($q.sessionStorage.has("isReceivedReward")) {
    $q.sessionStorage.remove("isReceivedReward");
  }

  // if ($q.localStorage.has("onlineStatusInOdyssey")) {
  //   let type = $q.localStorage.getItem("onlineStatusInOdyssey");
  //   if (type == "online") {
  //     $q.loading.show();

  //     authListen = auth.onAuthStateChanged(async function (user) {
  //       if (user) {
  //         systemStore.setLogin();
  //         $router.replace("/splash/" + studentStore.studentId);

  //         if (authListen) {
  //           authListen();
  //         }

  //         $q.loading.hide();
  //       } else {
  //         auth.signOut();
  //         // User is signed out.
  //         $q.loading.hide();
  //       }
  //     });

  //     $q.loading.hide();
  //   }
  // }

  setTimeout(() => {
    if ($q.platform.is.desktop) systemStore.setPlatform("desktop");
    else systemStore.setPlatform("mobile");
  }, 500);

  systemStore.resetStore();
  systemStore.getSystem("Login");

  window.addEventListener("beforeinstallprompt", (e) => {
    // console.log("running");
    e.preventDefault();
    deferredPrompt = e;
    showAppInstallationPrompt.value = true;
  });
});

onBeforeUnmount(() => {
  systemStore.disposeStore();
  if (studentListen) studentListen();
});
</script>

<style lang="scss" scoped>
.box-dialog-container {
  width: 320px;
  border-radius: 12px;
  border: 4px solid #4a261b;
  background: #f1bf43;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px;
  color: #4a261b;
}

.box-sub-dialog {
  border-radius: 12px;
  background: #ffedc4;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px 12px 12px 12px;
}

.box-content-dialog {
  padding: 12px;
  margin: 16px 0px;
  border-radius: 10px;
  background: #efd080;
}

.box-circle {
  width: 140px;
  height: 140px;
  margin: 8px auto;
  border: 3px solid #769606;
  background-color: #a0ca0e;
  border-radius: 50%;
}

//ปุ่ม login เมื่อเอาเม้าส์ชี้
.btn-login:hover {
  background-image: url("/images/btn-login-hover.png");
  background-size: contain;
  background-repeat: no-repeat;
  min-width: 250px;
}

//ปุ่ม login
.btn-login {
  background-image: url("/images/btn-login.png");
  background-size: contain;
  background-repeat: no-repeat;
  min-width: 250px;
}
// ปุ่มตกลง
.btn-Alert {
  background-image: url("/images/btn-main.png");
  width: 200px;
  height: 35px;
  position: relative;
  background-size: cover;
}
//ปุ่มตกลง hover
.btn-Alert:hover {
  background-image: url("/images/btn-main-hover.png");
  width: 200px;
  height: 35px;
  background-size: cover;
  cursor: pointer;
  transform: scale(0.99);
}
// active ปุ่มเข้าสู่ระบบ
.btn-login:active {
  transform: scale(0.95);
}
// active ปุ่มตกลง
.btn-Alert:active {
  transform: scale(0.95);
}

//กำหนดเวลา animation
.animated {
  animation-duration: 1.5s;
}

.bg-pc {
  background-color: #ffb0f3;
}

.box-forget-main {
  width: 360px;
  background-color: #e6914e;
  border-radius: 20px;
}

.bg-christmas {
  width: 100%;
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/background_main/background-login-christmas-2024.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: auto;
}

.bg-original {
  width: 100%;
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/background_main/background-login.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
  margin: auto;
}

.bg-velentine {
  width: 100%;
  min-height: 100vh;
  max-height: fit-content;
  background-image: url("/images/background_main/Background-login-valentine-2023.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: auto;
}

.box-login-container {
  width: 320px;
  // border: 3px solid #4a261b;
  // border-radius: 20px;
  // background-color: #f2c043;
  // padding: 7px;
}

.box-login-sub {
  width: 100%;
  padding:36px 36px 30px;
  // border-radius: 10px;
  // background-color: #f6f3d3;
  // padding: 7px;
  // box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
}

.box-login-detail {
  // width: 100%;
  // border-radius: 5px;
  // background-color: #efd080;
  // padding: 15px;
}

.box-input-main{
  width:250px;
  height:30px;
  background-color:#fff;
  border-radius: 10px;
  border:1px solid #512A08;
}

.box-login-detail.footer {
  border-radius: 0px 0px 5px 5px;
  color:#512A08;
  font-size:14px;
}
</style>
