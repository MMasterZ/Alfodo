<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header :class="type == 'pretest' ? 'bg-primary ' : 'bg-positive'">
      <q-toolbar style="max-width:850px;width100%;margin:auto">
        <div class="text-white absolute-left row items-center">
          หัวข้อการสอบที่ครูตั้ง
        </div>
        <q-space></q-space>
      </q-toolbar>
    </q-header> -->
    <q-page-container class="bg">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const type = ref("pretest");
    return { type };
  },
};
</script>
<style lang="css">
.bg {
  background-image: url("/images/bg-exam.png");
  background-position: center;
  background-attachment: fixed;
}
</style>
