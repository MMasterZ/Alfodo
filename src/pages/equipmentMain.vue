<template>
  <q-page class="bg-main">
    <equipment-pc
      v-if="$q.platform.is.desktop && isLoaded"
      :characterData="characterData"
      :inventoryList="inventoryList"
      :propsList="propsList"
      @callback-selecteditem="funcSelecteditem"
    ></equipment-pc>

    <equipment-mobile
      v-if="$q.platform.is.mobile && isLoaded"
      :characterData="characterData"
      :inventoryList="inventoryList"
      :propsList="propsList"
      @callback-selecteditem="funcSelecteditem"
    ></equipment-mobile>

    <loading :isShowLoading="isShowLoading"></loading>
  </q-page>
</template>

<script>
import equipmentPc from "../components/equipment/equipmentPc_new.vue";
import equipmentMobile from "../components/equipment/equipmentMobile.vue";
import loading from "../components/dialog-loading.vue";
import studentHooks from "../hooks/gameHooks";
import updateHooks from "../hooks/updateHooks";
import getHooks from "../hooks/getHooks";
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { analyticsLogEvent, db } from "src/router";
export default {
  components: {
    loading,
    equipmentPc,
    equipmentMobile,
  },
  setup(props) {
    // Initial Data
    const $q = useQuasar();
    const uid = ref("");
    const characterData = ref({});
    const isShowLoading = ref(true);
    const isLoaded = ref(false);

    // Func : Selected Item
    const funcSelecteditem = async (item, type) => {
      if (type == "head") {
        if (characterData.value.head == item.itemName) {
          return;
        }
        characterData.value.head = item.itemName;
      } else if (type == "body") {
        if (characterData.value.body == item.itemName) {
          return;
        }
        characterData.value.body = item.itemName;
      } else if (type == "footer") {
        if (characterData.value.footer == item.itemName) {
          return;
        }
        characterData.value.footer = item.itemName;
      } else if (type == "pet") {
        if (characterData.value.pet == item.itemName) {
          characterData.value.pet = "";
        } else {
          characterData.value.pet = item.itemName;
        }
      } else if (type == "other") {
        if (characterData.value.other == item.itemName) {
          characterData.value.other = "";
        } else {
          characterData.value.other = item.itemName;
        }
      }

      await updateHooks.updatecharacter(uid.value, characterData.value);
    };

    // Func : load student info
    const loadStudentInfo = async () => {
      isShowLoading.value = true;
      isLoaded.value = false;

      uid.value = $q.sessionStorage.getItem("uid");

      try {
        let getData = await studentHooks.studentInfomation(uid.value);

        characterData.value = getData.character;
      } catch (error) {
        // console.log(`%c ${error} : Function Load Student Info`, "color: #E7C402");
      }
    };

    // Func : Load Inventory
    const inventoryList = ref({});
    const propsList = ref({});
    const loadInventory = async () => {
      try {
        let getData = await getHooks.getinventory(uid.value);

        inventoryList.value.head = getData["head"];
        inventoryList.value.body = getData["body"];
        inventoryList.value.footer = getData["footer"];

        propsList.value.pet = getData["pet"];
        propsList.value.other = getData["other"];

        isShowLoading.value = false;

        isLoaded.value = true;
      } catch (error) {
        // console.log(`%c ${error} : Function Load Inventory`, "color:#E7C402");
      }
    };

    onMounted(async () => {
      if (analyticsLogEvent != null) {
        analyticsLogEvent("/equipment");
      }

      await loadStudentInfo();
      await loadInventory();
    });

    return {
      // Inventory List
      inventoryList,
      propsList,

      // Character Data
      characterData,

      // Boolearn
      isLoaded,
      isShowLoading,

      // Function
      funcSelecteditem,
    };
  },
};
</script>

<style lang="scss" scoped>
.bg-main {
  background-color: #f3dbaa;
}
</style>
