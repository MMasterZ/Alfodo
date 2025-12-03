<template>
  <div
    :class="isDesktop ? 'box-equipment-scroll' : 'box-equipment-scroll-mobile'"
  >
    <div
      class="row justify-center relative-position"
      :class="
        index == 'head' || index == 'pet'
          ? 'q-pt-sm q-mt-xs'
          : index == 'footer'
          ? 'q-pb-sm'
          : ''
      "
      v-for="(outfit, index) in outfitSet"
    >
      <div class="col-1 self-center" styte="width:50px;" v-if="isDesktop">
        <q-img
          width="50px"
          @click="
            outfit.scroll.left == 0 ? null : funcScrollLeft(outfit.id, index)
          "
          :class="
            outfit.scroll.left == 0 ? 'cursor-not-allowed' : 'cursor-pointer'
          "
          :src="`/images/icon_main/icon-equipment-arrow-left${
            outfit.scroll.left == 0 ? '-disable' : ''
          }.png`"
          no-spinner
          no-transition
        ></q-img>
      </div>
      <div
        class="row no-wrap"
        :class="isDesktop ? 'col box-item-main' : 'box-item-main-mobile'"
        :id="`${outfit.id}`"
      >
        <div
          class="col-1 button-item q-mx-xs"
          :class="outfit.selected == item.itemName ? 'selected' : ''"
          v-for="(item, indexName) in outfit.list"
          v-show="outfit.list.length > 0"
          @click="
            item.itemName == outfit.selected
              ? null
              : funcSelectedOutfit(item, index)
          "
        >
          <div
            class="sub"
            v-if="
              indexName == 0 && (item.type == 'pet' || item.type == 'other')
            "
          >
            <div class="image relative-position">
              <q-img
                class="absolute-center"
                width="90%"
                style="border-radius: 10px"
                :src="`/images/icon_main/icon-no-image.png`"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>

          <div class="sub" v-else>
            <div class="image relative-position">
              <q-img
                class="absolute-center"
                width="90%"
                style="border-radius: 10px"
                :src="`${PATH}/${item.itemName}.png`"
                no-spinner
                no-transition
              >
              </q-img>
            </div>
          </div>
        </div>

        <div
          class="col-1 q-mx-xs button-item not-selected"
          v-show="outfit.list.length == 0"
        >
          <div class="sub">
            <div class="image relative-position">
              <q-img
                class="absolute-center"
                width="90%"
                style="border-radius: 10px"
                :src="`/images/icon_main/icon-no-image.png`"
                no-spinner
                no-transition
              ></q-img>
            </div>
          </div>
        </div>
      </div>

      <div class="col-1 self-center" styte="width:50px;" v-if="isDesktop">
        <q-img
          @click="
            outfit.scroll.maxLeft == outfit.scroll.left
              ? null
              : funcScrollRight(outfit.id, index)
          "
          :class="
            outfit.scroll.maxLeft == outfit.scroll.left
              ? 'cursor-not-allowed'
              : 'cursor-pointer'
          "
          :src="`/images/icon_main/icon-equipment-arrow-right${
            outfit.scroll.maxLeft == outfit.scroll.left ? '-disable' : ''
          }.png`"
          no-spinner
          no-transition
          width="50px"
        ></q-img>
      </div>
      <div
        class="col-12 full-width"
        v-if="index != 'footer' && index != 'accessory'"
      >
        <q-img
          no-spinner
          no-transition
          height="15px"
          fit="contain"
          src="/images/other_main/space-dashed.png"
        ></q-img>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
export default {
  props: {
    outfitSet: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const isDesktop = ref($q.platform.is.desktop);

    const PATH = ref(
      "https://storage.googleapis.com/winnerenglish2-e0f1b.appspot.com/newInventory"
    );

    const outfit = ref(props.outfitSet);

    const funcScrollLeft = (id, type) => {
      let scrollMenu = document.getElementById(id);

      outfit.value[type].scroll.left -= 500;

      scrollMenu.scroll({
        left: outfit.value[type].scroll.left,
        behavior: "smooth",
      });

      if (outfit.value[type].scroll.left <= 0) {
        outfit.value[type].scroll.left = 0;
      }
    };

    const funcScrollRight = (id, type) => {
      let scrollMenu = document.getElementById(id);

      outfit.value[type].scroll.left += 500;

      scrollMenu.scroll({
        left: outfit.value[type].scroll.left,
        behavior: "smooth",
      });

      if (outfit.value[type].scroll.left >= outfit.value[type].scroll.maxLeft) {
        outfit.value[type].scroll.left = outfit.value[type].scroll.maxLeft;
      }
    };

    const funcSelectedOutfit = (item, type) => {
      emit("callback-setEquipment", item, type);
    };

    onMounted(() => {
      for (const key in outfit.value) {
        let el = document.getElementById(outfit.value[key].id);
        outfit.value[key].scroll.left = 0;
        outfit.value[key].scroll.maxLeft = el.scrollWidth - el.offsetWidth;
      }
    });

    return {
      PATH,

      // Boolean
      isDesktop,

      // Function
      funcScrollLeft,
      funcScrollRight,

      funcSelectedOutfit,
    };
  },
};
</script>

<style lang="scss" scoped>
.box-equipment-scroll {
  position: relative;
  width: 100%;
  height: 85%;
  overflow: auto;
  z-index: 1;
}

.box-equipment-scroll-mobile {
  position: relative;
  width: 100%;
  height: calc(100vh - 415px);
  background-color: #f6d588;
  overflow: auto;
  z-index: 1;
}

.box-equipment-scroll::-webkit-scrollbar,
.box-equipment-scroll-mobile::-webkit-scrollbar {
  width: 0px;
}

.space-dashed {
  border: 1px dashed #e17100;
}

.box-item-main {
  width: 700px;
  overflow-x: auto;
}

.box-item-main-mobile {
  width: 100vw;
  min-width: 300px;
  overflow-x: auto;
}

.box-item-main::-webkit-scrollbar,
.box-item-main-mobile::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}

.button-item {
  position: relative;
  width: 100px;
  height: 100px;
  border: 6px solid transparent;
  border-radius: 10px;
  cursor: pointer;
}

.button-item.not-selected {
  cursor: not-allowed;
}

.button-item.selected {
  border: 6px solid #9f4d00;
}

.button-item .sub {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border: 2px solid #a1aec7;
  background-color: #d2dae9;
  border-radius: 10px;
}

.button-item .sub .image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  height: 85%;
  border: 7px solid #fafcff;
  background-color: #fff;
  box-shadow: inset 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>