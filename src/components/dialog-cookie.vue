<template>
  <q-dialog maximized seamless position="bottom" v-model="dialogModel">
    <q-card class="transparent shadow-0">
      <q-card-section class="no-padding">
        <div
          class="q-pa-md text-white f12"
          style="background-color: rgba(33, 33, 33, 0.8)"
        >
          <span> การใช้คุกกี้ของ Winner English </span>
          <br />
          <br />
          <span
            v-html="
              `Winner English
            มีความประสงค์จะใช้คุกกี้ที่มีความจำเป็นอย่างยิ่งต่อการทำงานและมีส่วนเกี่ยวข้องกับเว็บไซต์
            เพื่อให้เกิดการทำงานที่ถูกต้องและสามารถปรับปรุงเว็บไซต์ได้ <br> ทั้งนี้
            จะไม่ใช้คุกกี้ทางเลือกจนกว่าท่านจะอนุญาตให้เปิดใช้งานคุกกี้ดังกล่าว
            ท่านสามารถศึกษารายละเอียดของการใช้คุกกี้ได้จาก`
            "
          >
          </span>
          <a
            href="https://www.winner-english.com/#/cookies"
            target="__blank"
            class="cursor-pointer text-blue"
          >
            นโยบายการใช้คุกกี้
          </a>

          <div align="right" class="q-pt-md">
            <q-btn
              label="ไม่ยอมรับ"
              class="q-mx-sm border-radius-inherit"
              @click="funcAcceptCookie('no')"
              v-close-popup
              flat
            ></q-btn>
            <q-btn
              label="ยอมรับ"
              class="bg-white text-black"
              @click="funcAcceptCookie('yes')"
              v-close-popup
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, computed } from "vue";
export default {
  props: {
    isShowDialogCookie: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:isShowDialogCookie'],
  setup(props, { emit }) {
    const dialogModel = computed({
      get: () => props.isShowDialogCookie,
      set: (val) => emit('update:isShowDialogCookie', val)
    })
    const funcAcceptCookie = (accept) => {
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + 15552000 * 1000;
      now.setTime(expireTime);
      if (accept == "yes") {
        document.cookie = `Allowed_Cookies=yes;expires=${now.toUTCString()}`;
      } else {
        document.cookie = `Allowed_Cookies=no`;
      }
    };

    return {
      // Function
      funcAcceptCookie,
      dialogModel
    };
  },
};
</script>

<style lang="scss" scoped></style>
