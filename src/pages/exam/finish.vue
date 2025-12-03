<template>
  <q-page>
    <q-card
      class="absolute-center"
      style="width: 320px; border-radius: 10px"
      align="center"
    >
      <q-card
        style="
          width: 320px;
          border-radius: 10px;
          background-color: #f6f3d3;
          border: 3px solid #a36112;
        "
        class="q-pa-md relative-position"
      >
        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            left: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            right: 8px;
            top: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            left: 8px;
          "
          class="absolute"
        ></div>

        <div
          style="
            width: 15px;
            height: 15px;
            background-color: #a36112;
            border-radius: 50%;
            bottom: 8px;
            right: 8px;
          "
          class="absolute"
        ></div>

        <div class="f16 q-pt-sm q-pb-md">
          <div class="text-weight-bold" style="font-size: 20px" align="center">
            จบการสอบ
          </div>
          <div align="center" class="q-pt-md">คะแนนที่ทำได้</div>
          <div class="text-center q-pt-sm">
            <span class="text-weight-bold" style="font-size: 24px">
              {{ $route.params.totalCorrect || 0 }}/{{
                $route.params.totalQuestion
              }}</span
            >
            คะแนน
          </div>
        </div>

        <q-card-actions align="center">
          <q-btn
            style="
              background-color: #58c16f;
              letter-spacing: 1.5px;
              border: 1px solid #176c31;
              border-radius: 10px;
              background: linear-gradient(180deg, #ffd25e 0%, #ffba08 100%);
              width: 180px;
            "
            label="กลับสู่ล็อบบี้"
            text-color="black"
            class="text-weight-bold shadow-3 relative-position"
            @click="$router.replace('/lobby')"
            v-close-popup
            push
          >
            <div
              style="
                height: 12px;
                width: 12px;
                border-radius: 50%;
                background-color: white;
                top: 8px;
                left: 13px;
              "
              class="absolute"
            ></div>
            <div
              style="
                height: 8px;
                width: 8px;
                border-radius: 50%;
                background-color: white;
                top: 20px;
                left: 8px;
              "
              class="absolute"
            ></div>
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      window.close();
    },
  },
  mounted() {
    if (!this.$route.params.totalCorrect) {
      this.$router.replace("/lobby");
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-close:hover {
  // background-image: url("/images/btn-close-h.png");
  transform: scale(0.99);
  background-size: cover;
  cursor: pointer;
}
//ปุ่ม login
.btn-close {
  // background-image: url("/images/btn-close.png");
  width: 200px;
  height: 35px;
  background-size: cover;
}
</style>
