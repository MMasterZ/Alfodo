<template>
  <div class="bg-exam">
    <div align="center" :class="$q.platform.is.desktop ? 'absolute-center' : ''">
      <q-card
        :style="$q.platform.is.desktop ? '' : 'margin-top:132px'"
        style="width: 320px; border-radius: 10px"
      >
        <q-card-section class="bg-primary text-white">
          <div class="f24" style="font-weight: bold">หัวข้อการสอบที่ครูตั้ง</div>
        </q-card-section>

        <div class="f16 q-pt-lg q-pb-md">
          <div>คุณมีเวลา 40 นาทีในการทำข้อสอบ</div>
          <div>ถ้าพร้อมแล้วกด “เริ่ม” เพื่อทำได้เลย</div>
        </div>
        <div style class="q-py-lg">
          <div @click="goto()" class="btn-start"></div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goto() {
      this.$router.replace("/exam/test");
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-exam {
  background-image: url("/images/bg-exam.png");
  height: 100vh;
}
</style>
