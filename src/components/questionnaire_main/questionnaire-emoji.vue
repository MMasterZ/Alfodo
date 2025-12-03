<template>
  <div
    class="animate__animated animate__fadeIn"
    :class="systemStore.platform.desktop ? 'q-my-xl' : 'q-my-md'"
  >
    <!-- #region Desktop -->
    <div
      class="row justify-around items-center"
      v-if="systemStore.platform.desktop"
    >
      <div
        class="col satisfaction-box relative-position row justify-center items-center"
        v-for="(item, index) in questionnaireData.choices"
        :key="index"
        @click="questionnaireData.selected = index"
        :class="questionnaireData.selected == index ? 'selected' : ''"
      >
        <div class="col-1" style="width: 130px">
          <div>
            <q-img no-spinner no-transition :src="`${item.img}`"></q-img>
            <div
              align="center"
              class="font-mali-m f16 text-satisfaction"
              style="padding-top: 10%"
            >
              {{ `${item.label}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Mobile -->
    <div v-if="systemStore.platform.mobile" class="q-px-md" align="left">
      <div
        v-for="(item, index) in questionnaireData.choices"
        :key="index"
        @click="questionnaireData.selected = index"
        :class="questionnaireData.selected == index ? 'selected' : ''"
        class="satisfaction-box mobile"
      >
        <div class="row" align="left">
          <div class="self-center col-1" style="width: 50px">
            <q-img
              no-spinner
              no-transition
              width=""
              :src="`${item.img}`"
            ></q-img>
          </div>
          <div class="font-mali-m f14 self-center q-px-md">
            {{ `${item.label}` }}
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
  </div>
</template>

<script>
import { ref } from "vue";
import { useSystemStore } from "src/stores/system";
export default {
  props: {
    questionnaireData: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    return {
      systemStore: useSystemStore(),
    };
  },
};
</script>

<style lang="scss" scoped>
// #region Desktop
.satisfaction-box {
  max-width: 200px;
  width: 100%;
  height: 220px;
  background-color: #f5f5f5;
  border-radius: 10px;
  margin: 1%;
  border: 3px solid transparent;
  color: #4a261b;
  cursor: pointer;
}

.satisfaction-box.selected {
  border: 3px solid #1989ff;
  background-color: #c7efff;
}
.text-satisfaction {
  font-size: 16px;
}
// #endregion

// #region Mobile
.satisfaction-box.mobile {
  max-width: 300px;
  width: 100%;
  height: fit-content;
  background-color: #f5f5f5;
  border-radius: 5px;
  margin: 10px 0px;
  border: 1px solid transparent;
  cursor: pointer;
}

.satisfaction-box.mobile.selected {
  border: 1px solid #1989ff;
  background-color: #c7efff;
}
// #endregion
</style>
