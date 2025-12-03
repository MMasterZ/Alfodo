<template>
  <div>
    <q-dialog maximized v-model="isShowDialogLogout" persistent class="z-max">
      <q-card class="transparent shadow-0">
        <q-card-section class="fit row justify-center">
          <div class="self-center box-logout-main q-pa-sm relative-position">
            <div class="box-logout-content row items-center justify-center">
              <div class="q-py-md q-mt-sm">
                <span class="f20 text-bold font-mali-b"> ออกจากระบบ </span>
              </div>
              <div class="col-12 q-pa-sm">
                <div>
                  <q-btn class="fit bg-button-cancel" @click="funcCloseDialog()" push>
                    ยกเลิก
                  </q-btn>
                </div>
                <div class="q-py-md">
                  <q-btn class="fit bg-button-confirm" @click="funcLogout()" push>
                    ตกลง
                  </q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { auth } from "src/router";
import { useBuddyStore } from "src/stores/buddy";
import { useStudentStore } from "src/stores/student";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const emit = defineEmits(["callback-closeDialog", "callback-logout"]);

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const isShowDialogLogout = ref(true);

const funcCloseDialog = () => {
  isShowDialogLogout.value = false;

  setTimeout(() => {
    emit("callback-closeDialog");
  }, 500);
};

const funcLogout = () => {
  const studentStore = useStudentStore();
  const buddyStore = useBuddyStore();

  $q.loading.show({
    message: "กำลังออกจากระบบ...",
  });

  if (buddyStore.isBuddy) {
    buddyStore.logout();
  }

  studentStore.logout();

  auth.signOut();

  router.push("/");
  $q.loading.hide();

  // emit("callback-logout");
};

const closeDialog = () => {
  emit("callback-closeDialog");
};
</script>

<style lang="scss" scoped>
.box-logout-main {
  width: 320px;
  height: 250px;
  border: 3px solid #4a261b;
  background-color: #f2c043;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.5);
  border-radius: 20px;
}

.box-logout-content {
  height: 100%;
  background-color: #f6f3d3;
  border-radius: 20px;
  color: #4a261b;
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
}

.bg-button-cancel {
  color: #fff;
  background: linear-gradient(180deg, #ba46f3 0%, #a532ea 100%);
  border-radius: 9px;
  padding: 10px;
  border: 1px solid #4a261b;
}

.bg-button-confirm {
  color: #4a261b;
  background: linear-gradient(180deg, #ffcf51 0%, #ffbf19 100%);
  border-radius: 9px;
  padding: 10px;
  border: 1px solid #4a261b;
}
</style>
