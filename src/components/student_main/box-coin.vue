<template>
  <div class="absolute box-coin-main">
    <div class="relative-position fit">
      <q-img src="/images/winner_town_main/box-coin.webp" no-spinner no-transition></q-img>

      <div class="absolute-center box-total-coin font-mali-b" align="center">
        {{ `${funcFormatStudentCoin(studentStore.studentData.coin)}` }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStudentStore } from 'src/stores/student';

const studentStore = useStudentStore();

const funcFormatStudentCoin = (coin) => {
  return coin.toLocaleString();
}
</script>

<style lang="scss" scoped>
.box-coin-main{
  top:clamp(10px,1cqw,16px);
  left:clamp(291.25px,29.125cqw,466px);
  width:clamp(83.125px,8.3125cqw,133px);

  & .box-total-coin{
    width:55%;
    left:60%;
    color: #FFF;
    font-size: clamp(12.5px,1.25cqw,20px);
    line-height: normal;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    z-index:1;
  }
}
</style>
