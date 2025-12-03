<template>
  <q-dialog maximized v-model="isShowDialogBuddyLogin" persistent>
    <q-card class="transparent shadow-0 fit">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div>
          <div
            class="col-12 justify-center"
            align="center"
            v-if="!buddyStore.buddy.isBuddy"
          >
            <div class="relative-position" style="width: 330px">
              <q-img no-spinner no-transition src="/images/box_main/box-buddy-dialog.png">
                <div class="fit transparent">
                  <div class="fit q-pa-md">
                    <div class="q-mt-lg q-px-sm">
                      <q-input
                        style="height: 40px"
                        autofocus
                        dense
                        class="userPwd q-px-sm"
                        borderless
                        label-color="dark"
                        v-model.trim="username"
                        placeholder="รหัสผู้ใช้งาน"
                        maxlength="20"
                        :rules="[(val) => !!val, (val) => val != studentStore.username]"
                        hide-bottom-space
                      ></q-input>
                    </div>
                    <div class="q-mt-sm q-px-sm">
                      <q-input
                        @keyup.enter="funcLogin(true)"
                        style="height: 40px"
                        dense
                        borderless
                        label-color="dark"
                        class="userPwd q-px-sm"
                        v-model.trim="password"
                        placeholder="รหัสผ่าน"
                        :type="isPwd ? 'password' : 'text'"
                        maxlength="20"
                      >
                        <template v-slot:append>
                          <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer text-black"
                            @click="isPwd = !isPwd"
                            data-cy="togglePassword"
                          />
                        </template>
                      </q-input>
                    </div>
                    <div class="q-mb-md q-px-sm" align="left">
                      <span class="f12" style="color: #4a261b"
                        >**สำหรับผู้ที่ต้องการเข้าสู่ระบบร่วมกัน</span
                      >
                    </div>
                    <div class="q-px-sm q-mt-sm">
                      <q-img
                        no-spinner
                        no-transition
                        class="cursor-pointer"
                        src="/images/button_main/button-pair.png"
                        @click="funcLogin(true)"
                      ></q-img>
                    </div>
                  </div>
                </div>
              </q-img>
              <div class="absolute-center" style="top: 5%; width: 70%">
                <q-img
                  no-spinner
                  no-transition
                  src="/images/icon_main/icon-header-buddy.png"
                ></q-img>
              </div>
              <div class="absolute-top-right" style="width: 14%; right: -3%; top: -3%">
                <q-img
                  no-spinner
                  no-transition
                  class="cursor-pointer"
                  @click="funcClose()"
                  src="/images/icon_main/icon-close.png"
                ></q-img>
              </div>
            </div>
          </div>

          <div class="col-12 justify-center" align="center" v-else>
            <div class="relative-position" style="width: 330px">
              <q-img no-spinner no-transition src="/images/box_main/box-buddy-dialog.png">
                <div class="fit transparent">
                  <div class="fit q-pa-md row">
                    <div class="self-center col-12" align="center">
                      <span class="f20 font-mali-b" style="color: #4a261b"
                        >ยกเลิกคู่หู</span
                      >
                    </div>

                    <div class="self-end col-12">
                      <div>
                        <q-img
                          no-spinner
                          no-transition
                          class="cursor-pointer"
                          @click="funcClose()"
                          src="/images/button_main/button-buddy-cancle.png"
                        ></q-img>
                      </div>
                      <div class="q-pt-md">
                        <q-img
                          no-spinner
                          no-transition
                          class="cursor-pointer"
                          @click="funcLogout()"
                          src="/images/button_main/button-buddy-logout.png"
                        ></q-img>
                      </div>
                    </div>
                  </div>
                </div>
              </q-img>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog maximized v-model="isShowDialogCheckOnlineStatus" persistent>
    <q-card class="transparent shadow-0 fit">
      <q-card-section class="fit row justify-center items-center no-padding">
        <div class="row justify-center items-center" style="width: 320px; height: 300px">
          <q-img src="/images/box_main/box-dialog-default.png">
            <!-- <q-btn label="ยกเลิก" v-close-popup></q-btn> -->
            <div class="transparent row fit">
              <div
                class="col-12 self-center row justify-center"
                align="center"
                style="height: 73%"
              >
                <div class="col-12 q-mt-md">
                  <span class="font-mali-b f20" style="color: #4a261b"> แจ้งเตือน</span>
                </div>
                <div class="col-12">
                  <span style="color: #4a261b" class="font-mali-b f14">
                    บัญชีนี้มีการใช้งานบนอุปกรณ์อื่น
                    <br />
                    ต้องการเข้าสู่ระบบบนอุปกรณ์นี้หรือไม่
                  </span>
                </div>
                <div align="center" class="col-12 self-end q-pb-sm">
                  <span class="font-mali-b" style="color: #4a261b; font-size: 9px">
                    หมายเหตุ : บัญชีไม่สามารถเข้าใช้งานพร้อมกัน 2 เครื่องได้
                    <br />
                    เมื่อเชื่อมต่อบัญชีจะถูกใช้งานบนอุปกรณ์นี้
                  </span>
                </div>
              </div>
              <div class="self-end col-12" style="height: 27%" align="center">
                <q-img
                  width="100px"
                  class="q-mx-sm cursor-pointer"
                  src="/images/button_main/button-no-buddy.png"
                  v-close-popup
                  @click="funcClose()"
                ></q-img>
                <q-img
                  width="100px"
                  class="q-mx-sm cursor-pointer"
                  src="/images/button_main/button-yes-buddy.png"
                  @click="funcLogin(false)"
                ></q-img>
              </div>
            </div>
            <!-- <q-btn label="ตกลง" @click="funcLogin(false)"></q-btn> -->
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <loading :isShowLoading="isLoading"></loading>
</template>

<script setup>
import loading from "components/dialog-loading.vue";

import { ref } from "@vue/reactivity";
import { useQuasar } from "quasar";
import { useBuddyStore } from "src/stores/buddy";
import { useStudentStore } from "src/stores/student";

const buddyStore = useBuddyStore();
const studentStore = useStudentStore();

const emit = defineEmits(["callback-closeDialog"]);

const $q = useQuasar();
const isPwd = ref(true);
const username = ref("");
const password = ref("");

const isLoading = ref(false);
const isShowDialogBuddyLogin = ref(true);
const isShowDialogCheckOnlineStatus = ref(false);

const funcLogin = async (status) => {
  if (!username.value || !password.value) {
    $q.notify({
      message: "รหัสผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
      color: "red",
      position: "top",
    });
    return;
  }

  if (username.value == studentStore.username) {
    $q.notify({
      message: "คุณกำลังเข้ารหัสผู้ใช้นี้อยู่",
      color: "red",
      position: "top",
    });

    return;
  }

  isLoading.value = true;
  isShowDialogCheckOnlineStatus.value = false;
  isShowDialogBuddyLogin.value = false;

  let response = await buddyStore.login(username.value, password.value, status);

  if (response == "online") {
    isShowDialogCheckOnlineStatus.value = true;
    isLoading.value = false;
    return;
  } else {
    if (response == "User not found" || response == "No course found") {
      $q.notify({
        message: "ไม่พบรหัสผู้ใช้งานในระบบ",
        color: "red",
        position: "top",
      });
      isLoading.value = false;
      isShowDialogBuddyLogin.value = true;
      return;
    }

    await buddyStore.getCharacterInfo();

    setTimeout(() => {
      emit("callback-closeDialog");
    }, 500);

    username.value = "";
    password.value = "";
    isLoading.value = false;
  }
};

const funcLogout = async () => {
  isLoading.value = true;

  isShowDialogBuddyLogin.value = false;
  isShowDialogCheckOnlineStatus.value = false;

  await buddyStore.logout();

  username.value = "";
  password.value = "";

  isLoading.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};

const funcClose = () => {
  username.value = "";
  password.value = "";

  isShowDialogCheckOnlineStatus.value = false;

  isShowDialogBuddyLogin.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};
</script>

<style lang="scss" scoped></style>
