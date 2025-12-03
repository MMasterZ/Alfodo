<template>
  <q-dialog v-model="isDialogCertificate" seamless class="z-max">
    <q-card class="transparent shadow-0">
      <q-card-section class="fit row justify-center items-center">
        <div>
          <q-img
            width="320px"
            src="/images/box_main/box-change-name-in-certificate.png"
          >
            <div class="fit transparent text-dialog-certificate">
              <div class="row fit q-px-md">
                <div class="col-12 self-center q-pb-sm q-pt-md" align="center">
                  <span class="f20 font-mali-b"> เกียรติบัตร </span>
                  <div class="f12 font-mali-m q-my-sm">
                    กรุณาตรวจสอบ ชื่อ-นามสกุล ให้ถูกต้อง<br />
                    เมื่อทำการยืนยันแล้ว จะไม่สามารถแก้ไข้ได้
                  </div>
                </div>

                <div class="col-12">
                  <span class="f12 font-mali-m">ชื่อ-นามสกุล (ภาษาไทย)*</span>
                  <q-input
                    class="q-px-sm"
                    :class="isErrorTh ? 'input-error' : 'input-default'"
                    borderless
                    label-color="dark"
                    dense
                    hide-bottom-space
                    :rules="[(val) => checkInputName(val, 'th')]"
                    v-model="studentData.nameTh"
                  ></q-input>
                </div>
                <div class="col-12">
                  <span class="f12 font-mali-m"
                    >Name-Surname (ภาษาอังกฤษ)*</span
                  >
                  <q-input
                    class="q-px-sm"
                    :class="isErrorEng ? 'input-error' : 'input-default'"
                    borderless
                    label-color="dark"
                    dense
                    hide-bottom-space
                    :rules="[(val) => checkInputName(val, 'eng')]"
                    v-model="studentData.nameEng"
                  ></q-input>
                </div>
                <div
                  class="col-12 self-end q-px-xs q-pt-xs q-pb-sm"
                  align="center"
                  style="height: 65px"
                >
                  <q-img
                    no-spinner
                    no-transition
                    @click="isErrorAll ? null : submit()"
                    width="150px"
                    :class="isErrorAll ? '' : 'cursor-pointer'"
                    :src="`/images/button_main/button-submit${
                      isErrorAll ? '-disable' : ''
                    }.png`"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </q-img>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <loading-dialog :isShowLoading="isLoading"></loading-dialog>
</template>

<script>
import { ref, computed } from "@vue/reactivity";
import wordrude from "src/js/wordrude";
import loadingDialog from "components/dialog-loading.vue";
export default {
  props: {
    isDialogCertificate: {
      type: Boolean,
      default: true,
    },
    studentStore: {
      default: () => {},
    },
  },
  emits: ["callback-success"],
  components: {
    loadingDialog,
  },
  setup(props, { emit }) {
    const isSuccessName = ref(false);

    const studentData = ref({
      nameTh: props.studentStore.studentFullName,
      nameEng: "",
    });

    const badWordList = ref(wordrude.list);

    const isErrorTh = ref(false);
    const isErrorEng = ref(true);
    const checkInputName = (val, type) => {
      if (val == "") {
        if (type == "th") isErrorTh.value = true;
        else isErrorEng.value = true;
      } else {
        if (val.length < 3) {
          if (type == "th") isErrorTh.value = true;
          else isErrorEng.value = true;
        } else {
          let isBadWord = false;
          badWordList.value = badWordList.value.filter((x) => x != " ");
          for (let i = 0; i < badWordList.value.length; i++) {
            let findBadWord = val.match(badWordList.value[i]);

            if (findBadWord) {
              isBadWord = true;
              break;
            }
          }

          if (isBadWord) {
            if (type == "th") isErrorTh.value = true;
            else isErrorEng.value = true;
          } else {
            if (type == "th") isErrorTh.value = false;
            else isErrorEng.value = false;
          }
        }
      }

      return type == "th" ? !isErrorTh.value : !isErrorEng.value;
    };

    const isErrorAll = computed(() => {
      if (isErrorTh.value || isErrorEng.value) return true;
      else return false;
    });

    const isLoading = ref(false);
    const submit = async () => {
      isLoading.value = true;
      await props.studentStore.updateStudentName(studentData.value);
      isLoading.value = false;

      emit("callback-success");
    };

    return {
      // Data
      studentData,

      isSuccessName,

      // Boolean
      isErrorEng,
      isErrorTh,
      isErrorAll,
      isLoading,

      // Function
      checkInputName,
      submit,
    };
  },
};
</script>

<style lang="scss" scoped>
.text-dialog-certificate {
  color: #4a261b;
}
</style>
