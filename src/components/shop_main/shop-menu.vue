<template></template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  itemshop: Object,
  headerMenu: Array,
  selectItemType: {
    type: String,
    default: "pet",
  },
  equipment: Object,
});

const emit = defineEmits([
  "callback-selectedMenu",
  "callback-changeColor",
  "callback-selectedItem",
]);

// #region ------- Initial -------
const currentSelectedItem = ref({
  itemName: "",
});
// #endregion

// #region ------- Data -------
const selectedMenu = ref("skin");
const randomString = ref(Math.random().toString(36).substring(7));
// #endregion ------- Data -------

// #region ------- Function -------

// #region select menu
const selectMenuType = ref("pet");
const funcSelectMenu = (menu) => {
  currentItemPage.value = 1;

  let setMenu = menu;

  if (menu == "more") {
    selectMenuType.value = "pet";
    setMenu = "pet";
  }

  if (menu == "pet" || menu == "other") {
    selectMenuType.value = menu;
    setMenu = menu;
    selectedMenu.value = "more";
  } else {
    selectedMenu.value = menu;
    emit("callback-selectedMenu", menu);
  }

  let findSelected = itemSelected.value.find((x) => x.type == setMenu);

  if (findSelected) {
    currentItemPage.value = findSelected.currentPage;
  }
};
// #endregion

// #region select item
const itemSelected = ref([]);
const funcSelectItem = (item) => {
  let findSelected = itemSelected.value.find((x) => x.itemName == item.itemName);

  if (findSelected) {
    return;
  }

  findSelected = itemSelected.value.find((x) => x.type == item.type);

  if (!findSelected) {
    itemSelected.value.push({ currentPage: currentItemPage.value, ...item });
  } else {
    itemSelected.value = itemSelected.value.filter((x) => x.type != item.type);
    itemSelected.value.push({ currentPage: currentItemPage.value, ...item });
  }

  emit("callback-selectedItem", itemSelected.value);
};
// #endregion

// #endregion ------- Function -------

// #region ------- Computed -------

// #region Show item list
const currentItemPage = ref(1);
const showItemList = computed(() => {
  let menu = selectedMenu.value;

  if (selectedMenu.value == "more") {
    menu = selectMenuType.value;
  }

  let temp = props.itemshop[menu].list;

  if (temp.length) {
    temp = temp;
  }

  return temp || [];
});
// #endregion

// #endregion
</script>

<style lang="scss" scoped></style>
