<template>
  <div style="background-color: white">
    <div class="row brx" style="width: 900px" v-for="(item, index) in fwef" :key="index">
      <div class="col- brx">
        <div></div>
      </div>
      <div class="col brx" style="word-break: break-all">{{ item.data }}</div>
    </div>
  </div>
  <div class="bg-white full-width full-height q-mt-xl">
    <div
      style="
        display: flex;
        padding: 0px 16px;
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
        align-self: stretch;
      "
      class="brx"
      v-for="(item, index) in historyPurchasedData"
      :key="index"
    >
      <div>{{ item }}</div>
      <div v-for="(x, packageIndex) in item.packageLevel" :key="packageIndex">
        {{ x.level }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const fwef = ref([
  { name: "w", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  {
    name: "10580",
    data:
      "we6f59809484095049804980498498049fw8ef40w9e84109u8k41v6b8094h8mfgh1m98gh4m01we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5",
  },
  { name: "wwef", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "wbbdvbfb", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "ouoyouuw", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "nnnw", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "wcxxc", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  {
    name: "bbcw",
    data:
      "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5wegw9t80w t7w90 8t7w49 t8w49w0 8y498u4098to74y7908o40",
  },
  { name: "w", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "w", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "w", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
  { name: "w", data: "we6f51we6f51we6f51w6ef51w6ef51w6ef5w1ef6w5ef1w6e5f1we6f5" },
]);

const historyPurchasedData = ref([
  {
    date: "12 มี.ค. 2023 | 14:54",
    packageLevel: [
      {
        level: 1,
        price: 540,
      },
      {
        level: 2,
        price: 540,
      },
      {
        level: 3,
        price: 540,
      },
    ],
    lessPrice: 500,
    totalPrice: 1120,
    paymentBy: "cradit",
  },
  {
    date: "15 มี.ค. 2023 | 14:54",
    packageLevel: [
      {
        level: 1,
        price: 540,
      },
      {
        level: 2,
        price: 540,
      },
      {
        level: 5,
        price: 540,
      },
      {
        level: 6,
        price: 540,
      },
      {
        level: 8,
        price: 540,
      },
    ],
    lessPrice: 1000,
    totalPrice: 1700,
    paymentBy: "cradit",
  },
  {
    date: "20 มี.ค. 2023 | 14:54",
    packageLevel: [
      {
        level: 10,
        price: 540,
      },
    ],
    lessPrice: 0,
    totalPrice: 540,
    paymentBy: "qr",
  },
  {
    date: "29 มี.ค. 2023 | 14:54",
    packageLevel: [
      {
        level: 1,
        price: 540,
      },
      {
        level: 2,
        price: 540,
      },
      {
        level: 3,
        price: 540,
      },
      {
        level: 4,
        price: 540,
      },
      {
        level: 5,
        price: 540,
      },
      {
        level: 6,
        price: 540,
      },
      {
        level: 7,
        price: 540,
      },
      {
        level: 8,
        price: 540,
      },
      {
        level: 9,
        price: 540,
      },
      {
        level: 10,
        price: 540,
      },
      {
        level: 11,
        price: 540,
      },
      {
        level: 12,
        price: 540,
      },
    ],
    lessPrice: 1200,
    totalPrice: 5280,
    paymentBy: "cradit",
  },
]);
</script>

<style lang="scss" scoped></style>
