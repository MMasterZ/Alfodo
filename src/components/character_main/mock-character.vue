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
        <outfit
          v-if="showPetItem.itemName != '' && showPetItem.isFront"
          :itemData="showPetItem"
          :itemLayer="'front'"
          :isAnimation="true"
        ></outfit>
        <g>
          <outfit
            v-if="showAccessoriesItem.itemName != '' && showAccessoriesItem.isBack"
            :itemData="showAccessoriesItem"
            :itemLayer="'back'"
            :isAnimation="true"
          ></outfit>
        </g>
        <outfit
          v-if="showHeaderItem.itemName != '' && showHeaderItem.isBack"
          :itemData="showHeaderItem"
          :itemLayer="'back'"
          :isAnimation="true"
        ></outfit>
        <outfit
          v-if="showFooterItem.itemName != '' && showFooterItem.isBack"
          :itemData="showFooterItem"
          :itemLayer="'back'"
          :isAnimation="true"
        ></outfit>
        <outfit
          v-if="showBodyItem.itemName != '' && showBodyItem.isBack"
          :itemData="showBodyItem"
          :itemLayer="'back'"
          :isAnimation="true"
        ></outfit>
      </g>

      <!-- Skeleton -->
      <skeleton
        :isAnimation="true"
        :isCreateCharacter="true"
        :isShop="true"
        :bodyColor="'#FFBB95'"
      ></skeleton>

      <!-- Fornt -->
      <g>
        <outfit
          v-if="showFooterItem.itemName != '' && showFooterItem.isFront"
          :itemData="showFooterItem"
          :itemLayer="'front'"
          :isAnimation="true"
        ></outfit>
        <outfit
          v-if="showBodyItem.itemName != '' && showBodyItem.isFront"
          :itemData="showBodyItem"
          :itemLayer="'front'"
          :isAnimation="true"
        ></outfit>
        <outfit
          v-if="showHeaderItem.itemName != '' && showHeaderItem.isFront"
          :itemData="showHeaderItem"
          :itemLayer="'front'"
          :isAnimation="true"
        ></outfit>
        <g>
          <outfit
            v-if="showAccessoriesItem.itemName != '' && showAccessoriesItem.isFront"
            :itemData="showAccessoriesItem"
            :itemLayer="'front'"
            :isAnimation="true"
          ></outfit>
        </g>
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
import { computed } from "vue";
import { useStudentStore } from "src/stores/student";
export default {
  props: {
    equipment: {
      type: Object,
      default: () => {},
    },
    isGetCostume: {
      type: Boolean,
      default: false,
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

    let setData = {
      isFront: false,
      isBack: false,
      itemName: "",
      duration: 0,
      FPS: 0,
    };

    // Header Item
    const showHeaderItem = computed(() => {
      if (props.isGetCostume) {
        if (props.equipment == null) return studentStore.characterData.head;
        else {
          if (props.equipment.type == "head")
            return props.equipment || studentStore.characterData.head;
          else return studentStore.characterData.head;
        }
      }
      return props.equipment.head || setData;
    });

    // Footer Item
    const showFooterItem = computed(() => {
      if (props.isGetCostume) {
        if (props.equipment == null) return studentStore.characterData.footer;
        else {
          if (props.equipment.type == "footer")
            return props.equipment || studentStore.characterData.footer;
          else return studentStore.characterData.footer;
        }
      }
      return props.equipment.footer || setData;
    });

    // Body Item
    const showBodyItem = computed(() => {
      if (props.isGetCostume) {
        if (props.equipment == null) return studentStore.characterData.body;
        else {
          if (props.equipment.type == "body")
            return props.equipment || studentStore.characterData.body;
          else return studentStore.characterData.body;
        }
      }
      return props.equipment.body || setData;
    });

    // Pet
    const showPetItem = computed(() => {
      if (props.isGetCostume) {
        if (props.equipment == null) return studentStore.characterData.pet;
        else {
          if (props.equipment.type == "pet")
            return props.equipment || studentStore.characterData.pet;
          else return studentStore.characterData.pet;
        }
      }
      return props.equipment.pet || setData;
    });

    // Accessories
    const showAccessoriesItem = computed(() => {
      if (props.isGetCostume) {
        if (props.equipment == null) return studentStore.characterData.other;
        else {
          if (props.equipment.type == "other")
            return props.equipment || studentStore.characterData.other;
          else return studentStore.characterData.other;
        }
      }
      return props.equipment.other || setData;
    });

    return {
      // Computed
      showHeaderItem,
      showFooterItem,
      showBodyItem,
      showPetItem,
      showAccessoriesItem,
    };
  },
};
</script>

<style scoped></style>
