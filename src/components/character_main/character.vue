<template>
  <svg
    width="420"
    height="380"
    viewBox="0 0 420 380"
    style="width: 100%; height: 100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <!-- Back -->
      <g>
        <!-- สัตว์เลี้ยง -->
        <outfit
          v-if="showPetItem.itemName != '' && isPet && showPetItem.isFront"
          :itemData="showPetItem"
          :itemLayer="'front'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- เครื่องประดับ -->
        <g v-if="showAccessoriesItem.itemName != '' && showAccessoriesItem.isBack">
          <outfit
            :itemData="showAccessoriesItem"
            :itemLayer="'back'"
            :isAnimation="isAnimation"
          ></outfit>
        </g>

        <!-- หมวก -->
        <outfit
          v-if="showHeaderItem.isBack && showHeaderItem.itemName != ''"
          :itemData="showHeaderItem"
          :itemLayer="'back'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- กางเกง -->
        <outfit
          v-if="showFooterItem.isBack && showFooterItem.itemName != ''"
          :itemData="showFooterItem"
          :itemLayer="'back'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- เสื้อ -->
        <outfit
          v-if="showBodyItem.isBack && showBodyItem.itemName != ''"
          :itemData="showBodyItem"
          :itemLayer="'back'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- <g v-for="(itemBack, indexBack) in showBackItem" :key="indexBack">
          <outfit
            :itemData="itemBack"
            :itemLayer="'back'"
            :isAnimation="isAnimation"
          ></outfit>
        </g> -->
      </g>

      <!-- Skeleton -->
      <skeleton
        :isAnimation="isAnimation"
        :isCreateCharacter="isCreateCharacter"
        :isShop="isShop"
        :bodyColor="showSkeletonColor"
        :setId="setId"
      ></skeleton>

      <!-- Fornt -->
      <g>
        <!-- กางเกง -->
        <outfit
          v-if="showFooterItem.isFront && showFooterItem.itemName != ''"
          :itemData="showFooterItem"
          :itemLayer="'front'"
          :isAnimation="isAnimation"
        ></outfit>

        <!--เสื้อ -->
        <outfit
          v-if="showBodyItem.isFront && showBodyItem.itemName != ''"
          :itemData="showBodyItem"
          :itemLayer="'front'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- หมวก -->
        <outfit
          v-if="showHeaderItem.isFront && showHeaderItem.itemName != ''"
          :itemData="showHeaderItem"
          :itemLayer="'front'"
          :isAnimation="isAnimation"
        ></outfit>

        <!-- เครื่องประดับ -->
        <g v-if="showAccessoriesItem.itemName != '' && showAccessoriesItem.isFront">
          <outfit
            :itemData="showAccessoriesItem"
            :itemLayer="'front'"
            :isAnimation="isAnimation"
          ></outfit>
        </g>

        <!-- <g v-for="(itemFront, indexFront) in showFrontItem" :key="indexFront">
          <outfit
            :itemData="itemFront"
            :itemLayer="'front'"
            :isAnimation="isAnimation"
          ></outfit>
        </g> -->
      </g>
    </g>
    <style-equipment></style-equipment>
  </svg>
</template>

<script>
import styleEquipment from "./style_equipment.vue";
import skeleton from "./skeleton.vue";
import outfit from "./outfit.vue";
import pet from "./pet.vue";
import accessories from "./accessories.vue";
import { useStudentStore } from "src/stores/student";
import { computed } from "vue";
import { useInventoryStore } from "src/stores/inventory";
export default {
  props: {
    isAnimation: {
      type: Boolean,
      default: true,
    },
    isPet: {
      type: Boolean,
      default: true,
    },
    isRanking: {
      type: Boolean,
      default: false,
    },
    isCreateCharacter: {
      type: Boolean,
      default: false,
    },
    isEquipment: {
      type: Boolean,
      default: false,
    },
    isShop: {
      type: Boolean,
      default: false,
    },
    isBuddy: {
      type: Boolean,
      default: false,
    },
    equipment: {
      type: Object,
      default: () => {},
    },
    setId: {
      type: String,
      default: "",
    },
  },
  components: {
    styleEquipment,
    skeleton,
    pet,
    accessories,

    //
    outfit,
  },

  setup(props) {
    const studentStore = useStudentStore();
    const inventoryStore = useInventoryStore();

    let setData = {
      isFront: false,
      isBack: false,
      itemName: "",
      duration: 0,
      FPS: 0,
    };

    // #region Front order
    // const showFrontItem = computed(() => {
    //   let temp = [];

    //   let customOrder = ["footer", "body", "head", "other"];

    //   for (let i = 0; i < customOrder.length; i++) {
    //     let key = customOrder[i];

    //     if (
    //       props.isRanking ||
    //       props.isCreateCharacter ||
    //       props.isEquipment ||
    //       props.isShop ||
    //       props.isBuddy
    //     ) {
    //       if (props.equipment[key].isFront) {
    //         temp.push({
    //           type: key,
    //           ...props.equipment[key],
    //         });
    //       }
    //     } else {
    //       temp.push({
    //         type: key,
    //         ...studentStore.characterData[key],
    //       });
    //     }
    //   }

    //   temp.sort((a, b) => customOrder.indexOf(a.type) - customOrder.indexOf(b.type));

    //   console.log(temp);

    //   return temp;
    // });
    // #endregion

    // #region Back order
    // const showBackItem = computed(() => {
    //   let temp = [];

    //   let customOrder = ["pet", "other", "head", "footer", "body"];

    //   for (let i = 0; i < customOrder.length; i++) {
    //     let key = customOrder[i];

    //     if (
    //       props.isRanking ||
    //       props.isCreateCharacter ||
    //       props.isEquipment ||
    //       props.isShop ||
    //       props.isBuddy
    //     ) {
    //       if (props.equipment[key].isBack) {
    //         temp.push({
    //           type: key,
    //           ...props.equipment[key],
    //         });
    //       }
    //     } else {
    //       temp.push({
    //         type: key,
    //         ...studentStore.characterData[key],
    //       });
    //     }
    //   }

    //   temp.sort((a, b) => customOrder.indexOf(a.type) - customOrder.indexOf(b.type));

    //   return temp;
    // });
    // #endregion

    // Header Item
    const showHeaderItem = computed(() => {
      if (
        props.isRanking ||
        props.isCreateCharacter ||
        props.isEquipment ||
        props.isShop ||
        props.isBuddy
      ) {
        return props.equipment.head || setData;
      }

      return studentStore.characterData.head;
    });

    // Footer Item
    const showFooterItem = computed(() => {
      if (
        props.isRanking ||
        props.isCreateCharacter ||
        props.isEquipment ||
        props.isShop ||
        props.isBuddy
      ) {
        return props.equipment.footer || setData;
      }

      return studentStore.characterData.footer;
    });

    // Body Item
    const showBodyItem = computed(() => {
      if (
        props.isRanking ||
        props.isCreateCharacter ||
        props.isEquipment ||
        props.isShop ||
        props.isBuddy
      ) {
        return props.equipment.body || setData;
      }

      return studentStore.characterData.body;
    });

    // Pet
    const showPetItem = computed(() => {
      if (
        props.isRanking ||
        props.isCreateCharacter ||
        props.isEquipment ||
        props.isShop ||
        props.isBuddy
      ) {
        return props.equipment.pet || setData;
      }

      return studentStore.characterData.pet;
    });

    // Accessories
    const showAccessoriesItem = computed(() => {
      if (
        props.isRanking ||
        props.isCreateCharacter ||
        props.isEquipment ||
        props.isShop ||
        props.isBuddy
      ) {
        return props.equipment.other || setData;
      }

      return studentStore.characterData.other;
    });

    // Body Color
    const showSkeletonColor = computed(() => {
      let setColor = "";

      if (props.isRanking || props.isCreateCharacter || props.isShop || props.isBuddy) {
        if (props.equipment.color) {
          setColor = props.equipment.color;
        }
      } else {
        setColor = studentStore.characterData.color || "";
      }

      return setColor;
    });

    return {
      // showFrontItem,
      // showBackItem,

      showHeaderItem,
      showFooterItem,
      showBodyItem,
      showPetItem,
      showAccessoriesItem,
      showSkeletonColor,
    };
  },
};
</script>

<style scoped></style>
