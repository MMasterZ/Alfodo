<template>
  <q-page class="background-certificate-container">
    <div class="box-paper relative-position q-py-md" v-for="i in 5" :key="i">
      <div class="row">
        <div class="col" align="center"></div>
        <div></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useSystemStore } from "src/stores/system";
import { onMounted } from "vue";

const systemStore = useSystemStore();

onMounted(() => {
  const timeData = systemStore.datetime;

  console.log(timeData);
});
</script>

<style lang="scss" scoped>
.background-certificate-container {
  background-color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

.box-paper {
  width: 210mm;
  height: 297mm;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 16px;
  margin: 16px auto;
}

@media print {
  * {
    padding: 0px;
  }

  @page {
    margin: 0;
    size: A4;
    width: 210mm;
    height: 297mm;
  }

  .box-paper {
    width: 210mm;
    height: 297mm;
    border: none;
    margin: auto;
  }
}

.font-name {
  color: #dc3e44;
}

.font-date {
  color: #153f67;
  font-size: 23px;
}

.font-level {
  color: #153f67;
  font-size: 32px;
}
</style>
